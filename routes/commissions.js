// routes/commissions.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, hasAccess } = require('../middlewares/auth');

// Aplica segurança em todas as rotas
router.use(verifyToken, hasAccess);

// --- ROTA DE ESTATÍSTICAS (Dashboard: Faturamento vs Comissões) ---
router.get('/stats', async (req, res) => {
    const { establishmentId } = req.user;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Datas obrigatórias.' });
    }

    try {
        const { db } = req;
        const start = new Date(startDate);
        const end = new Date(endDate + "T23:59:59");
        const startTs = start.getTime();
        const endTs = end.getTime();

        // 1. Total Faturado (Vendas)
        // Usamos filtragem em memória para evitar o erro 500 por falta de índice composto
        const salesQuery = db.collection('sales').where('establishmentId', '==', establishmentId);
        const salesSnap = await salesQuery.get();
        let totalRevenue = 0;

        salesSnap.forEach(doc => {
            const data = doc.data();
            if (data.transaction && data.transaction.paidAt) {
                const saleDate = data.transaction.paidAt.toDate().getTime();
                if (saleDate >= startTs && saleDate <= endTs) {
                    // Tenta pegar o total pronto, senão soma itens
                    if (typeof data.total === 'number') {
                        totalRevenue += data.total;
                    } else if (data.items && Array.isArray(data.items)) {
                        const sumItems = data.items.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
                        totalRevenue += sumItems;
                    }
                }
            }
        });

        // 2. Total Pago em Comissões (Relatórios Gerados)
        const reportsQuery = db.collection('commission_reports').where('establishmentId', '==', establishmentId);
        const reportsSnap = await reportsQuery.get();
        let totalCommissionsPaid = 0;
        
        reportsSnap.forEach(doc => {
            const data = doc.data();
            if (data.createdAt) {
                const reportDate = data.createdAt.toDate().getTime();
                if (reportDate >= startTs && reportDate <= endTs) {
                    // Usa o valor final (ajustado) ou o original calculado
                    const val = data.summary.finalValue !== undefined ? data.summary.finalValue : data.summary.totalCommission;
                    totalCommissionsPaid += Number(val);
                }
            }
        });

        res.status(200).json({
            totalRevenue,
            totalCommissionsPaid
        });

    } catch (error) {
        console.error("Erro stats:", error);
        res.status(500).json({ message: 'Erro ao calcular estatísticas.' });
    }
});

// --- ROTA DE CÁLCULO (Otimizada: Varredura Total) ---
router.post('/calculate', async (req, res) => {
    const { establishmentId } = req.user;
    const { professionalIds, startDate, endDate, calculationTypes } = req.body;

    if (!startDate || !endDate || !calculationTypes) return res.status(400).json({ message: 'Dados incompletos.' });

    try {
        const { db } = req;
        const start = new Date(startDate);
        const end = new Date(endDate + "T23:59:59");

        // 1. Carregar Profissionais (Mapa para acesso rápido e checagem de elegibilidade)
        const profsSnapshot = await db.collection('professionals')
            .where('establishmentId', '==', establishmentId).get();
        
        const professionalsMap = new Map();
        profsSnapshot.forEach(doc => {
            const data = doc.data();
            // Verifica se o profissional recebe comissão
            if (data.receivesCommission === true || data.commissionActive === true) {
                professionalsMap.set(doc.id, { id: doc.id, ...data });
            }
        });

        if (professionalsMap.size === 0) return res.status(200).json([]);

        // 2. Carregar Catálogo (Serviços/Produtos/Pacotes) para evitar queries em loop
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

        // 3. Carregar Vendas (Filtragem em Memória para segurança contra erros de índice)
        const salesQuery = db.collection('sales').where('establishmentId', '==', establishmentId);
        const salesSnapshot = await salesQuery.get();
        
        if (salesSnapshot.empty) return res.status(200).json([]);

        const resultsMap = new Map();
        const startTs = start.getTime();
        const endTs = end.getTime();

        salesSnapshot.forEach(saleDoc => {
            const saleData = saleDoc.data();
            
            // Filtro de Data da Venda
            if (!saleData.transaction || !saleData.transaction.paidAt) return;
            const saleDate = saleData.transaction.paidAt.toDate().getTime();
            if (saleDate < startTs || saleDate > endTs) return;

            const items = saleData.items || [];

            items.forEach(item => {
                if (!item.id) return;
                
                // Identifica dono do item (prioridade para o item, fallback para a venda)
                const ownerId = item.professionalId || saleData.professionalId;
                const profData = professionalsMap.get(ownerId);
                
                if (!profData) return;
                
                // Filtro de seleção do usuário
                if (professionalIds && !professionalIds.includes('all') && !professionalIds.includes(ownerId)) return;

                let commissionRate = 0;
                let isCommissionable = false;
                const price = parseFloat(item.price || 0);
                const type = item.type || 'service';

                // Lógica de Taxas (Hierarquia: Personalizada > Geral)
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
                    profResult.items.push({
                        date: saleData.transaction.paidAt.toDate(),
                        client: saleData.clientName || 'Cliente Balcão',
                        item: item.name || 'Item',
                        value: price,
                        commissionRate: commissionRate,
                        commissionValue: itemCommission,
                        type: type
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
        console.error("Erro cálculo:", error);
        res.status(500).json({ message: 'Erro interno ao processar comissões.' });
    }
});

// --- ROTA DE SALVAR (ATUALIZADA COM INTEGRAÇÃO PADRÃO) ---
router.post('/save', async (req, res) => {
    const { establishmentId } = req.user;
    const { professionalId, professionalName, period, reportData } = req.body;

    if (!professionalId || !period || !reportData) return res.status(400).json({ message: 'Dados insuficientes.' });

    try {
        const { db } = req;
        const finalValue = reportData.summary.finalValue !== undefined ? reportData.summary.finalValue : reportData.summary.totalCommission;

        // 1. Prepara e Salva o Relatório de Comissão
        const report = {
            establishmentId, 
            professionalId, 
            professionalName, 
            period,
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
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };

        const docRef = await db.collection('commission_reports').add(report);

        // 2. INTEGRAÇÃO FINANCEIRA INTELIGENTE (Contas a Pagar)
        if (finalValue > 0) {
            // A) Busca configurações do estabelecimento (Natureza e C.Custo padrão)
            const estabDoc = await db.collection('establishments').doc(establishmentId).get();
            // Previne erro se o documento ou o campo não existirem
            const config = estabDoc.exists ? (estabDoc.data().commissionConfig || {}) : {};
            
            const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
            
            // B) Cria o lançamento financeiro usando os padrões
            const payableEntry = {
                establishmentId,
                description: `Comissão - ${professionalName} - Ref: ${period}`,
                amount: Number(finalValue.toFixed(2)),
                dueDate: today, // Vence hoje (pode ser alterado depois no financeiro)
                naturezaId: config.defaultNatureId || null, // Usa o padrão ou null
                centroDeCustoId: config.defaultCostCenterId || null, // Usa o padrão ou null
                notes: `Gerado automaticamente via Módulo de Comissões. Relatório ID: ${docRef.id}`,
                status: 'pending', // Pendente de pagamento
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            };

            await db.collection('financial_payables').add(payableEntry);
        }

        res.status(201).json({ message: 'Salvo com sucesso e integrado ao financeiro!', id: docRef.id });
    } catch (error) {
        console.error("Erro salvar:", error);
        res.status(500).json({ message: 'Erro ao salvar relatório.' });
    }
});

// --- ROTA DE HISTÓRICO (Filtragem em Memória) ---
router.get('/history', async (req, res) => {
    const { establishmentId } = req.user;
    const { professionalId, startDate, endDate } = req.query;

    try {
        const { db } = req;
        let query = db.collection('commission_reports').where('establishmentId', '==', establishmentId);
        
        if (professionalId && professionalId !== 'all') {
            query = query.where('professionalId', '==', professionalId);
        }

        const snapshot = await query.get();
        let history = [];
        
        let startTs = null, endTs = null;
        if (startDate && endDate) {
            startTs = new Date(startDate).getTime();
            endTs = new Date(endDate + "T23:59:59").getTime();
        }

        snapshot.forEach(doc => {
            const data = doc.data();
            // Filtro de Data em memória
            if (startTs && endTs) {
                if (!data.createdAt) return;
                const reportDate = data.createdAt.toDate().getTime();
                if (reportDate < startTs || reportDate > endTs) return;
            }

            history.push({
                id: doc.id,
                ...data,
                createdAt: data.createdAt && typeof data.createdAt.toDate === 'function' 
                    ? data.createdAt.toDate().toISOString() 
                    : new Date().toISOString()
            });
        });

        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.status(200).json(history);

    } catch (error) {
        console.error("Erro histórico:", error);
        res.status(500).json({ message: 'Erro ao buscar histórico.' });
    }
});

// --- ROTA DE EXCLUSÃO (JSON 200) ---
router.delete('/report/:reportId', async (req, res) => {
    const { establishmentId } = req.user;
    const { reportId } = req.params;

    if (!reportId) return res.status(400).json({ message: 'ID obrigatório.' });

    try {
        const { db } = req;
        const reportRef = db.collection('commission_reports').doc(reportId);
        const reportDoc = await reportRef.get();

        if (!reportDoc.exists) return res.status(404).json({ message: 'Relatório não encontrado.' });
        if (String(reportDoc.data().establishmentId) !== String(establishmentId)) return res.status(403).json({ message: 'Acesso negado.' });

        await reportRef.delete();
        // Retorna JSON 200 para evitar erro de parse no frontend
        res.status(200).json({ message: 'Relatório excluído com sucesso.' });

    } catch (error) {
        console.error("Erro excluir:", error);
        res.status(500).json({ message: 'Erro interno ao excluir.' });
    }
});

module.exports = router;