const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, hasAccess } = require('../middlewares/auth');

// Aplica o middleware de autenticação em todas as rotas deste arquivo
router.use(verifyToken, hasAccess);

// Rota para CALCULAR a comissão (sem salvar)
router.post('/calculate', async (req, res) => {
    const { establishmentId } = req.user;
    const { professionalId, startDate, endDate, commissionRate, calculationType } = req.body;

    if (!professionalId || !startDate || !endDate || commissionRate === undefined || !calculationType) {
        return res.status(400).json({ message: 'Todos os parâmetros são obrigatórios.' });
    }

    try {
        const { db } = req;
        const start = new Date(startDate);
        const end = new Date(endDate + "T23:59:59");

        const appointmentsQuery = db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('professionalId', '==', professionalId)
            .where('status', '==', 'completed')
            .where('startTime', '>=', start)
            .where('startTime', '<=', end);

        const salesQuery = db.collection('sales')
            .where('establishmentId', '==', establishmentId)
            .where('professionalId', '==', professionalId)
            .where('startTime', '>=', start)
            .where('startTime', '<=', end);

        const [appointmentsSnapshot, salesSnapshot] = await Promise.all([
            appointmentsQuery.get(),
            salesQuery.get()
        ]);

        let totalCommissionableValue = 0;
        const commissionableItems = [];

        const processItems = (items, saleDate, clientName, saleType) => {
            (items || []).forEach(item => {
                let isCommissionable = false;
                if (calculationType === 'services_only' && item.type === 'service') {
                    isCommissionable = true;
                } else if (calculationType === 'products_only' && item.type === 'product') {
                    isCommissionable = true;
                } else if (calculationType === 'services_and_products') {
                    isCommissionable = true;
                }

                if (isCommissionable) {
                    const price = item.price || 0;
                    totalCommissionableValue += price;
                    commissionableItems.push({
                        date: saleDate,
                        client: clientName,
                        item: item.name,
                        value: price,
                        type: saleType
                    });
                }
            });
        };

        appointmentsSnapshot.forEach(doc => {
            const data = doc.data();
            const allItems = [...(data.services || []), ...(data.comandaItems || [])];
            processItems(allItems, data.startTime.toDate(), data.clientName, 'Agendamento');
        });

        salesSnapshot.forEach(doc => {
            const data = doc.data();
            processItems(data.items, data.startTime.toDate(), data.clientName, 'Venda Avulsa');
        });

        const totalCommission = totalCommissionableValue * (parseFloat(commissionRate) / 100);

        res.status(200).json({
            summary: {
                totalCommissionableValue,
                commissionRate: parseFloat(commissionRate),
                totalCommission
            },
            items: commissionableItems.sort((a, b) => new Date(a.date) - new Date(b.date))
        });

    } catch (error) {
        console.error("Erro ao calcular comissão:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao calcular a comissão.' });
    }
});

// ROTA NOVA: Salvar um relatório de comissão
router.post('/save', async (req, res) => {
    const { establishmentId } = req.user;
    const { professionalId, professionalName, month, year, reportData } = req.body;

    if (!professionalId || !month || !year || !reportData) {
        return res.status(400).json({ message: 'Dados insuficientes para salvar o relatório.' });
    }

    try {
        const { db } = req;
        const report = {
            establishmentId,
            professionalId,
            professionalName,
            month,
            year,
            ...reportData,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };

        const docRef = await db.collection('commission_reports').add(report);
        res.status(201).json({ message: 'Relatório de comissão salvo com sucesso!', id: docRef.id });
    } catch (error) {
        console.error("Erro ao salvar relatório de comissão:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// ROTA NOVA E CORRIGIDA: Obter histórico de relatórios de um profissional
router.get('/history/:professionalId', async (req, res) => {
    const { establishmentId } = req.user;
    const { professionalId } = req.params;

    try {
        const { db } = req;
        // MODIFICAÇÃO: Removido orderBy para evitar a necessidade de um índice composto complexo.
        // A ordenação será feita no servidor após buscar os dados.
        const snapshot = await db.collection('commission_reports')
            .where('establishmentId', '==', establishmentId)
            .where('professionalId', '==', professionalId)
            .get();

        if (snapshot.empty) {
            return res.status(200).json([]);
        }

        let history = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Ordenação em memória (workaround para a falta de índice)
        history.sort((a, b) => {
            if (b.year !== a.year) {
                return b.year - a.year;
            }
            return b.month - a.month;
        });

        res.status(200).json(history);
    } catch (error) {
        console.error("Erro ao buscar histórico de comissões:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

module.exports = router;