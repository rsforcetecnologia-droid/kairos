const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, hasAccess } = require('../middlewares/auth');

// Aplica o middleware de autenticação em todas as rotas deste arquivo
router.use(verifyToken, hasAccess);

// Rota para CALCULAR a comissão (sem salvar)
router.post('/calculate', async (req, res) => {
    const { establishmentId } = req.user;
    const { professionalIds, startDate, endDate, calculationTypes } = req.body;

    if (!professionalIds || professionalIds.length === 0 || !startDate || !endDate || !calculationTypes) {
        return res.status(400).json({ message: 'Profissionais, período e tipos de cálculo são obrigatórios.' });
    }

    try {
        const { db } = req;
        const start = new Date(startDate);
        const end = new Date(endDate + "T23:59:59");
        let professionalsToProcess = [];
        const allProfessionals = await db.collection('professionals').where('establishmentId', '==', establishmentId).get();
        const allProfessionalsMap = new Map(allProfessionals.docs.map(doc => [doc.id, doc.data()]));

        if (professionalIds.includes('all')) {
            professionalsToProcess = allProfessionals.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } else {
            professionalsToProcess = professionalIds.map(id => ({ id, ...allProfessionalsMap.get(id) }));
        }

        const results = [];

        for (const prof of professionalsToProcess) {
            const salesQuery = db.collection('sales')
                .where('establishmentId', '==', establishmentId)
                .where('professionalId', '==', prof.id)
                .where('transaction.paidAt', '>=', start)
                .where('transaction.paidAt', '<=', end);

            const salesSnapshot = await salesQuery.get();
            if (salesSnapshot.empty) {
                continue; // Pula para o próximo profissional se não houver vendas
            }

            let totalCommissionableValue = 0;
            let totalCommission = 0;
            const commissionableItems = [];

            for (const saleDoc of salesSnapshot.docs) {
                const saleData = saleDoc.data();
                const items = saleData.items || [];

                for (const item of items) {
                    let commissionRate = 0;
                    const price = item.price || 0;
                    let isCommissionable = false;

                    // CORREÇÃO DE SEGURANÇA: Verifica se o item.id é válido antes de tentar consultar o Firestore
                    if (!item.id || typeof item.id !== 'string' || item.id.trim() === '') {
                        console.warn(`[COMMISSION_CALC] Item sem ID encontrado na venda ${saleDoc.id}. Pulando item: ${item.name}`);
                        continue; 
                    }

                    if (item.type === 'service' && calculationTypes.services) {
                        const serviceDoc = await db.collection('services').doc(item.id).get();
                        if (serviceDoc.exists) {
                            const serviceData = serviceDoc.data();
                            commissionRate = serviceData.commissionType === 'custom' && serviceData.professionalCommissions?.[prof.id] !== undefined
                                ? serviceData.professionalCommissions[prof.id]
                                : serviceData.commissionRate || 0;
                            isCommissionable = true;
                        }
                    } else if (item.type === 'product' && calculationTypes.products) {
                        const productDoc = await db.collection('products').doc(item.id).get();
                        if (productDoc.exists) {
                            commissionRate = productDoc.data().commissionRate || 0;
                            isCommissionable = true;
                        }
                    } else if (item.type === 'package' && calculationTypes.packages) {
                        const packageDoc = await db.collection('servicePackages').doc(item.id).get();
                        if (packageDoc.exists) {
                            commissionRate = packageDoc.data().commissionRate || 0;
                            isCommissionable = true;
                        }
                    }

                    if (isCommissionable) {
                        const itemCommission = price * (commissionRate / 100);
                        totalCommissionableValue += price;
                        totalCommission += itemCommission;

                        commissionableItems.push({
                            date: saleData.transaction.paidAt.toDate(),
                            client: saleData.clientName,
                            item: item.name,
                            value: price,
                            commissionRate: commissionRate,
                            commissionValue: itemCommission,
                            type: item.type
                        });
                    }
                }
            }
            
            if (commissionableItems.length > 0) {
                 results.push({
                    professionalId: prof.id,
                    professionalName: prof.name,
                    summary: { totalCommissionableValue, totalCommission, totalItems: commissionableItems.length },
                    items: commissionableItems.sort((a, b) => new Date(a.date) - new Date(b.date))
                });
            }
        }

        res.status(200).json(results);

    } catch (error) {
        console.error("Erro ao calcular comissão:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao calcular a comissão.' });
    }
});


router.post('/save', async (req, res) => {
    const { establishmentId } = req.user;
    const { professionalId, professionalName, period, reportData } = req.body;

    if (!professionalId || !period || !reportData) {
        return res.status(400).json({ message: 'Dados insuficientes para salvar o relatório.' });
    }

    try {
        const { db } = req;
        const report = {
            establishmentId, professionalId, professionalName,
            period,
            summary: reportData.summary,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };

        const docRef = await db.collection('commission_reports').add(report);
        res.status(201).json({ message: 'Relatório de comissão salvo com sucesso!', id: docRef.id });
    } catch (error) {
        console.error("Erro ao salvar relatório de comissão:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// ROTA CORRIGIDA: Obter histórico de todos os relatórios
router.get('/history', async (req, res) => {
    const { establishmentId } = req.user;
    try {
        const { db } = req;
        const snapshot = await db.collection('commission_reports')
            .where('establishmentId', '==', establishmentId)
            .get();

        if (snapshot.empty) {
            return res.status(200).json([]);
        }

        let history = snapshot.docs.map(doc => {
            const data = doc.data();
            return { 
                id: doc.id, 
                ...data,
                // CORREÇÃO DE DATA: Converte com segurança para string ISO
                createdAt: data.createdAt && typeof data.createdAt.toDate === 'function' ? data.createdAt.toDate().toISOString() : data.createdAt 
            };
        });

        // Ordena os resultados no servidor antes de enviar
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.status(200).json(history);
    } catch (error) {
        console.error("Erro ao buscar histórico de comissões:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});


module.exports = router;