const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// ROTA ÚNICA E DEFINITIVA PARA RELATÓRIO DE VENDAS
router.get('/sales/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    const { startDate, endDate, cashierSessionId } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Datas de início e fim são obrigatórias.' });
    }

    try {
        const { db } = req;
        const start = new Date(startDate);
        const end = new Date(endDate + "T23:59:59");
        
        // NOVO: Obter professionalId do token (adicionado pelo middleware)
        const { professionalId: loggedInProfessionalId } = req.user;

        // Converte as datas para Timestamps do Firestore para as queries
        const startTimestamp = admin.firestore.Timestamp.fromDate(start);
        const endTimestamp = admin.firestore.Timestamp.fromDate(end);

        // Queries base
        let appointmentsQuery = db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('status', '==', 'completed')
            .where('transaction.paidAt', '>=', startTimestamp)
            .where('transaction.paidAt', '<=', endTimestamp);
        
        let salesQuery = db.collection('sales')
            .where('establishmentId', '==', establishmentId)
            .where('transaction.paidAt', '>=', startTimestamp)
            .where('transaction.paidAt', '<=', endTimestamp);

        // NOVO: Aplicar filtro se for um profissional logado
        if (loggedInProfessionalId) {
            appointmentsQuery = appointmentsQuery.where('professionalId', '==', loggedInProfessionalId);
            salesQuery = salesQuery.where('professionalId', '==', loggedInProfessionalId);
        }

        // Busca todas as sessões de caixa para mapear os nomes dos responsáveis
        const cashierSessionsQuery = db.collection('cashierSessions')
            .where('establishmentId', '==', establishmentId);


        const [appointmentsSnapshot, salesSnapshot, cashierSessionsSnapshot] = await Promise.all([
            appointmentsQuery.get(),
            salesQuery.get(),
            cashierSessionsQuery.get()
        ]);

        // Cria um mapa de ID da sessão -> Nome do responsável
        const cashierSessionMap = new Map();
        cashierSessionsSnapshot.forEach(doc => {
            const data = doc.data();
            cashierSessionMap.set(doc.id, data.openedByName || data.closedByName || 'N/A');
        });


        let allTransactions = [];
        let paymentMethodTotals = {};
        let totalRevenue = 0;

        const processTransaction = (doc) => {
            const data = doc.data();
            const transactionData = data.transaction;
            if (!transactionData) return;

            // Filtro de caixa (aplicado aqui para flexibilidade)
            if (cashierSessionId && cashierSessionId !== 'all' && data.cashierSessionId !== cashierSessionId) {
                return;
            }
            
            totalRevenue += transactionData.totalAmount;
            
            (transactionData.payments || []).forEach(p => {
                paymentMethodTotals[p.method] = (paymentMethodTotals[p.method] || 0) + p.value;
            });
            
            allTransactions.push({
                date: transactionData.paidAt.toDate(),
                client: data.clientName,
                items: (data.items || data.services || []).map(i => i.name).join(', '),
                total: transactionData.totalAmount,
                type: data.type === 'walk-in' ? 'Venda Avulsa' : 'Agendamento',
                responsavelCaixa: cashierSessionMap.get(data.cashierSessionId) || 'Não definido',
                payments: transactionData.payments // Adiciona os detalhes do pagamento
            });
        };
        
        appointmentsSnapshot.forEach(processTransaction);
        // Filtra as vendas avulsas para não duplicar as que vêm de agendamentos
        salesSnapshot.docs.filter(doc => doc.data().type === 'walk-in').forEach(processTransaction);
        
        allTransactions.sort((a, b) => a.date - b.date);

        res.status(200).json({
            summary: {
                totalRevenue,
                totalTransactions: allTransactions.length,
                averageTicket: allTransactions.length > 0 ? totalRevenue / allTransactions.length : 0,
                paymentMethodTotals
            },
            transactions: allTransactions
        });

    } catch (error) {
        console.error("Erro ao gerar relatório de vendas:", error);
        if (error.message && error.message.includes('requires an index')) {
             return res.status(500).json({ message: "O Firestore precisa de um índice. Verifique o log do servidor para o link de criação." });
        }
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao gerar o relatório.' });
    }
});

// Rota de relatório de jornada de trabalho (Mantida, já filtra por professionalId)
router.get('/work-journal/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    const { professionalId, startDate, endDate } = req.query;

    if (!professionalId || !startDate || !endDate) {
        return res.status(400).json({ message: 'ID do profissional, data de início e data de fim são obrigatórios.' });
    }

    try {
        const { db } = req;
        const start = new Date(`${startDate}T00:00:00`);
        const end = new Date(`${endDate}T23:59:59`);

        const appointmentsSnapshot = await db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('professionalId', '==', professionalId)
            .where('startTime', '>=', start)
            .where('startTime', '<=', end)
            .orderBy('startTime', 'asc')
            .get();

        let totalRevenue = 0;
        let totalServices = 0;

        const completedAppointments = appointmentsSnapshot.docs.filter(doc => doc.data().status === 'completed');

        const appointments = completedAppointments.map(doc => {
            const data = doc.data();
            const value = data.transaction ? data.transaction.totalAmount : 0;
            totalRevenue += value;
            totalServices += data.services ? data.services.length : 1;

            return {
                date: data.startTime.toDate(),
                client: data.clientName,
                services: data.services ? data.services.map(s => s.name).join(', ') : 'N/A',
                value: value
            };
        });

        res.status(200).json({
            appointments,
            summary: {
                totalRevenue,
                totalServices
            }
        });

    } catch (error) {
        console.error("Erro ao gerar relatório de jornada:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao gerar o relatório.' });
    }
});

// NOVA ROTA: Relatório de Comissões
router.get('/commissions/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    const { year, month, professionalId } = req.query;

    if (!year || !month) {
        return res.status(400).json({ message: 'Ano e mês são obrigatórios.' });
    }

    try {
        const { db } = req;
        let query = db.collection('commission_reports')
            .where('establishmentId', '==', establishmentId)
            .where('year', '==', year)
            .where('month', '==', month);
        
        if (professionalId && professionalId !== 'all') {
            query = query.where('professionalId', '==', professionalId);
        }

        const snapshot = await query.get();
        const reports = snapshot.docs.map(doc => doc.data());
        
        res.status(200).json(reports);

    } catch(error) {
        console.error("Erro ao gerar relatório de comissões:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});


module.exports = router;