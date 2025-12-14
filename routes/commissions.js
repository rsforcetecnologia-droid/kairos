// routes/commissions.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, hasAccess } = require('../middlewares/auth');
const { AggregateField } = require('firebase-admin/firestore'); 

router.use(verifyToken, hasAccess);

// --- FUNÇÃO AUXILIAR DE ERRO ---
function handleFirestoreError(res, error, context) {
    console.error(`Erro em ${context}:`, error);
    const linkMatch = error.message ? error.message.match(/https:\/\/console\.firebase\.google\.com[^\s]*/) : null;
    const indexLink = linkMatch ? linkMatch[0] : null;

    if (error.message && error.message.includes('requires an index')) {
        return res.status(500).json({ 
            message: `O Firestore precisa de um índice para ${context}.`,
            createIndexUrl: indexLink || "Link não encontrado automaticamente. Verifique os logs."
        });
    }
    res.status(500).json({ message: `Erro ao processar ${context}.` });
}

// =======================================================================
// 🚀 ROTAS
// =======================================================================

// 1. ESTATÍSTICAS
router.get('/stats', async (req, res) => {
    const { establishmentId } = req.user;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) return res.status(400).json({ message: 'Datas obrigatórias.' });

    try {
        const { db } = req;
        const start = new Date(startDate);
        const end = new Date(endDate + "T23:59:59");

        // A) Total Faturado
        const salesAgg = await db.collection('sales')
            .where('establishmentId', '==', establishmentId)
            .where('transaction.paidAt', '>=', start)
            .where('transaction.paidAt', '<=', end)
            .aggregate({ total: AggregateField.sum('transaction.totalAmount') })
            .get();

        const totalRevenue = salesAgg.data().total || 0;

        // B) Total Pago em Comissões
        const reportsQuery = await db.collection('commission_reports')
            .where('establishmentId', '==', establishmentId)
            .where('createdAt', '>=', start)
            .where('createdAt', '<=', end)
            .get();
            
        let totalCommissionsPaid = 0;
        reportsQuery.forEach(doc => {
            const data = doc.data();
            const val = data.summary.finalValue !== undefined ? data.summary.finalValue : data.summary.totalCommission;
            totalCommissionsPaid += Number(val || 0);
        });

        res.status(200).json({ totalRevenue, totalCommissionsPaid });

    } catch (error) {
        handleFirestoreError(res, error, 'estatísticas de comissão');
    }
});

// 2. CÁLCULO DE PREVISÃO
router.post('/calculate', async (req, res) => {
    const { establishmentId } = req.user;
    const { professionalIds, startDate, endDate, calculationTypes } = req.body;

    if (!startDate || !endDate || !calculationTypes) return res.status(400).json({ message: 'Dados incompletos.' });

    try {
        const { db } = req;
        const start = new Date(startDate);
        const end = new Date(endDate + "T23:59:59");

        // 1. Carregar Profissionais
        const profsSnapshot = await db.collection('professionals')
            .where('establishmentId', '==', establishmentId).get();
        
        const professionalsMap = new Map();
        profsSnapshot.forEach(doc => {
            const data = doc.data();
            if (data.receivesCommission === true || data.commissionActive === true) {
                professionalsMap.set(doc.id, { id: doc.id, ...data });
            }
        });

        if (professionalsMap.size === 0) return res.status(200).json([]);

        // 2. Carregar Catálogo
        const [servicesSnap, productsSnap, packagesSnap] = await Promise.all([
            calculationTypes.services ? db.collection('services').where('establishmentId', '==', establishmentId).get() : Promise.resolve({ docs: [] }),
            calculationTypes.products ? db.collection('products').where('establishmentId', '==', establishmentId).get() : Promise.resolve({ docs: [] }),
            calculationTypes.packages ? db.collection('servicePackages').where('establishmentId', '==', establishmentId).get() : Promise.resolve({ docs: [] })
        ]);

        const catalogMap = {
            service: new Map(servicesSnap.docs.map(d => [d.id, d.data()])),
            product: new Map(productsSnap.docs.map(d => [d.id, d.data()])),
            package: new Map(packagesSnap.docs.map(d => [d.id, d.data()]))
        };

        // 3. Carregar Vendas
        const salesQuery = db.collection('sales')
            .where('establishmentId', '==', establishmentId)
            .where('transaction.paidAt', '>=', start)
            .where('transaction.paidAt', '<=', end);
            
        const salesSnapshot = await salesQuery.get();
        
        if (salesSnapshot.empty) return res.status(200).json([]);

        const resultsMap = new Map();

        salesSnapshot.forEach(saleDoc => {
            const saleData = saleDoc.data();
            
            // Filtro em memória: ignora se já foi reportada.
            if (saleData.commissionReported === true) return;

            const items = saleData.items || [];
            const originalSaleId = saleDoc.id;

            items.forEach(item => {
                if (!item.id) return;
                
                const ownerId = item.professionalId || saleData.professionalId;
                const profData = professionalsMap.get(ownerId);
                
                if (!profData) return;
                
                if (professionalIds && !professionalIds.includes('all') && !professionalIds.includes(ownerId)) return;

                let commissionRate = 0;
                let isCommissionable = false;
                const price = parseFloat(item.price || 0);
                const type = item.type || 'service';

                if (type === 'service' && calculationTypes.services) {
                    const serviceData = catalogMap.service.get(item.id);
                    if (serviceData) {
                        if (serviceData.commissionType === 'custom' && serviceData.professionalCommissions?.[ownerId] !== undefined) {
                            commissionRate = parseFloat(serviceData.professionalCommissions[ownerId]);
                        } else {
                            commissionRate = parseFloat(serviceData.commissionRate || 0);
                        }
                        isCommissionable = true;
                    }
                } else if (type === 'product' && calculationTypes.products) {
                    const productData = catalogMap.product.get(item.id);
                    if (productData) {
                        commissionRate = parseFloat(productData.commissionRate || 0);
                        isCommissionable = true;
                    }
                } else if (type === 'package' && calculationTypes.packages) {
                    const packageData = catalogMap.package.get(item.id);
                    if (packageData) {
                        commissionRate = parseFloat(packageData.commissionRate || 0);
                        isCommissionable = true;
                    }
                }

                if (isCommissionable && commissionRate > 0) {
                    const itemCommission = price * (commissionRate / 100);
                    
                    if (!resultsMap.has(ownerId)) {
                        resultsMap.set(ownerId, {
                            professionalId: ownerId,
                            professionalName: profData.name,
                            summary: { totalCommissionableValue: 0, totalCommission: 0, totalItems: 0 },
                            items: []
                        });
                    }
                    
                    const profResult = resultsMap.get(ownerId);
                    profResult.summary.totalCommissionableValue += price;
                    profResult.summary.totalCommission += itemCommission;
                    profResult.summary.totalItems += 1;
                    
                    const saleDate = saleData.transaction && saleData.transaction.paidAt ? saleData.transaction.paidAt.toDate() : new Date();
                    
                    profResult.items.push({
                        date: saleDate,
                        client: saleData.clientName || 'Cliente Balcão',
                        item: item.name || 'Item',
                        value: price,
                        commissionRate: commissionRate,
                        commissionValue: itemCommission,
                        type: type,
                        originalSaleId: originalSaleId
                    });
                }
            });
        });

        const finalResults = Array.from(resultsMap.values()).map(res => {
            res.items.sort((a, b) => new Date(a.date) - new Date(b.date));
            return res;
        });

        res.status(200).json(finalResults);

    } catch (error) {
        handleFirestoreError(res, error, 'cálculo de comissões');
    }
});

// 3. SALVAR E INTEGRAR
router.post('/save', async (req, res) => {
    const { establishmentId } = req.user;
    const { professionalId, professionalName, period, reportData, processedSalesIds } = req.body; 

    if (!professionalId || !period || !reportData || !processedSalesIds) {
         return res.status(400).json({ message: 'Dados insuficientes.' });
    }

    try {
        const { db } = req;
        const finalValue = reportData.summary.finalValue !== undefined ? reportData.summary.finalValue : reportData.summary.totalCommission;
        const uniqueSalesIds = [...new Set(processedSalesIds)];

        // A) Salvar Relatório
        const report = {
            establishmentId, professionalId, professionalName, period,
            summary: {
                ...reportData.summary,
                finalValue: finalValue,
                extraDebit: reportData.summary.extraDebit || 0,
                extraCredit: reportData.summary.extraCredit || 0,
                notes: reportData.summary.notes || ''
            },
            items: reportData.items.map(i => ({
                ...i,
                date: i.date instanceof Date ? admin.firestore.Timestamp.fromDate(i.date) : (i.date ? new Date(i.date) : new Date())
            })),
            processedSalesIds: uniqueSalesIds, 
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };

        const docRef = await db.collection('commission_reports').add(report);

        // B) Marcação de Vendas - USANDO getAll PARA SEGURANÇA
        if (uniqueSalesIds.length > 0) {
            const batch = db.batch();
            
            // Verifica existência antes de atualizar para evitar crash se alguma venda foi deletada
            const salesRefs = uniqueSalesIds.map(id => db.collection('sales').doc(id));
            const salesDocs = await db.getAll(...salesRefs);
            
            salesDocs.forEach(doc => {
                if (doc.exists) {
                    batch.update(doc.ref, { commissionReported: true }); 
                }
            });
            
            // Só commita se houver documentos válidos
            if (salesDocs.some(d => d.exists)) {
                await batch.commit();
            }
        }
        
        // C) Integração Financeira
        if (finalValue > 0) {
            const estabDoc = await db.collection('establishments').doc(establishmentId).get();
            const config = estabDoc.exists ? (estabDoc.data().commissionConfig || {}) : {};
            const today = new Date().toISOString().split('T')[0];
            
            const payableEntry = {
                establishmentId,
                description: `Comissão - ${professionalName} - Ref: ${period}`,
                amount: Number(finalValue.toFixed(2)),
                dueDate: today,
                naturezaId: config.defaultNatureId || null,
                centroDeCustoId: config.defaultCostCenterId || null,
                notes: `Gerado automaticamente. Relatório ID: ${docRef.id}`,
                status: 'pending',
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            };

            await db.collection('financial_payables').add(payableEntry);
        }

        res.status(201).json({ message: 'Salvo com sucesso!', id: docRef.id });
    } catch (error) {
        handleFirestoreError(res, error, 'salvar relatório');
    }
});

// 4. HISTÓRICO
router.get('/history', async (req, res) => {
    const { establishmentId } = req.user;
    const { professionalId, startDate, endDate } = req.query;

    try {
        const { db } = req;
        let query = db.collection('commission_reports')
            .where('establishmentId', '==', establishmentId);
        
        if (professionalId && professionalId !== 'all') {
            query = query.where('professionalId', '==', professionalId);
        }
        
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate + "T23:59:59");
            query = query.where('createdAt', '>=', start).where('createdAt', '<=', end);
        }

        query = query.orderBy('createdAt', 'desc');
        const snapshot = await query.get();
        
        const history = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt && typeof data.createdAt.toDate === 'function' 
                    ? data.createdAt.toDate().toISOString() 
                    : new Date().toISOString()
            };
        });

        res.status(200).json(history);

    } catch (error) {
        handleFirestoreError(res, error, 'histórico');
    }
});

// 5. EXCLUSÃO COM REVERSÃO (BLINDADA CONTRA VENDAS APAGADAS)
router.delete('/report/:reportId', async (req, res) => {
    const { establishmentId } = req.user;
    const { reportId } = req.params;

    if (!reportId) return res.status(400).json({ message: 'ID obrigatório.' });

    try {
        const { db } = req;
        const reportRef = db.collection('commission_reports').doc(reportId);
        const reportDoc = await reportRef.get();

        if (!reportDoc.exists) return res.status(404).json({ message: 'Relatório não encontrado.' });
        const reportData = reportDoc.data();

        if (String(reportData.establishmentId) !== String(establishmentId)) return res.status(403).json({ message: 'Acesso negado.' });

        // --- LÓGICA DE REVERSÃO ---
        const salesIdsToRevert = reportData.processedSalesIds || [];
        
        if (salesIdsToRevert.length > 0) {
            const batch = db.batch();
            
            // 1. Busca todas as referências para verificar quais ainda existem
            const salesRefs = salesIdsToRevert.map(id => db.collection('sales').doc(id));
            const salesDocs = await db.getAll(...salesRefs);
            
            let updatesCount = 0;

            // 2. Itera sobre os resultados reais
            salesDocs.forEach(doc => {
                // Apenas adiciona ao batch se o documento da venda AINDA EXISTIR
                if (doc.exists) {
                    batch.update(doc.ref, { commissionReported: false });
                    updatesCount++;
                }
            });
            
            // 3. Executa o batch se houver atualizações válidas
            if (updatesCount > 0) {
                await batch.commit();
            }
        }

        await reportRef.delete();
        
        res.status(200).json({ message: 'Relatório excluído e vendas libertadas para novo cálculo.' });

    } catch (error) {
        handleFirestoreError(res, error, 'excluir relatório');
    }
});

module.exports = router;