// routes/reports.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, hasAccess } = require('../middlewares/auth');

// --- FUNÇÃO AUXILIAR: DATA NO FUSO CORRETO ---
// Converte um objeto Date (UTC) para um objeto Date que representa o início do dia no fuso local
// Útil para extrair dia/mês/ano corretos para relatórios
function getDateInTimezone(dateObj, timezone) {
    // Cria uma string no fuso desejado: "11/27/2025, 10:00:00 PM"
    const localString = dateObj.toLocaleString("en-US", { timeZone: timezone });
    return new Date(localString);
}

// ROTA ÚNICA E DEFINITIVA PARA RELATÓRIO DE VENDAS
router.get('/sales/:establishmentId', verifyToken, hasAccess, async (req, res) => {
    const { establishmentId } = req.params;
    const { startDate, endDate, cashierSessionId } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Datas de início e fim são obrigatórias.' });
    }

    try {
        const { db } = req;
        const start = new Date(startDate);
        const end = new Date(endDate + "T23:59:59");
        
        const { professionalId: loggedInProfessionalId } = req.user;

        // BUSCA TIMEZONE (Para exibir datas corretas no front se necessário, ou lógica futura)
        // Nesta rota específica, retornamos a lista bruta e o front geralmente converte, 
        // mas é bom ter consistência se fizermos agrupamentos no futuro.
        const establishmentDoc = await db.collection('establishments').doc(establishmentId).get();
        const timezone = establishmentDoc.exists ? (establishmentDoc.data().timezone || 'America/Sao_Paulo') : 'America/Sao_Paulo';

        const startTimestamp = admin.firestore.Timestamp.fromDate(start);
        const endTimestamp = admin.firestore.Timestamp.fromDate(end);

        let appointmentsQuery = db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('status', '==', 'completed')
            .where('transaction.paidAt', '>=', startTimestamp)
            .where('transaction.paidAt', '<=', endTimestamp);
        
        let salesQuery = db.collection('sales')
            .where('establishmentId', '==', establishmentId)
            .where('transaction.paidAt', '>=', startTimestamp)
            .where('transaction.paidAt', '<=', endTimestamp);

        if (loggedInProfessionalId) {
            appointmentsQuery = appointmentsQuery.where('professionalId', '==', loggedInProfessionalId);
            salesQuery = salesQuery.where('professionalId', '==', loggedInProfessionalId);
        }

        const cashierSessionsQuery = db.collection('cashierSessions') 
            .where('establishmentId', '==', establishmentId);

        const [appointmentsSnapshot, salesSnapshot, cashierSessionsSnapshot] = await Promise.all([
            appointmentsQuery.get(),
            salesQuery.get(),
            cashierSessionsQuery.get()
        ]);

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

            if (cashierSessionId && cashierSessionId !== 'all' && data.cashierSessionId !== cashierSessionId) {
                return;
            }
            
            totalRevenue += transactionData.totalAmount;
            
            (transactionData.payments || []).forEach(p => {
                paymentMethodTotals[p.method] = (paymentMethodTotals[p.method] || 0) + p.value;
            });
            
            allTransactions.push({
                date: transactionData.paidAt.toDate(), // O front converte isso para local
                client: data.clientName,
                items: (data.items || data.services || []).map(i => i.name).join(', '),
                total: transactionData.totalAmount,
                type: data.type === 'walk-in' ? 'Venda Avulsa' : 'Agendamento',
                responsavelCaixa: cashierSessionMap.get(data.cashierSessionId) || 'Não definido',
                payments: transactionData.payments
            });
        };
        
        appointmentsSnapshot.forEach(processTransaction);
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

// Rota de relatório de jornada de trabalho
router.get('/work-journal/:establishmentId', verifyToken, hasAccess, async (req, res) => {
    // ... (Mantém a lógica original, o front ajusta a exibição das datas)
    // Se precisar de agrupamento, usar getDateInTimezone
    const { establishmentId } = req.params;
    const { professionalId, startDate, endDate } = req.query;

    if (!professionalId || !startDate || !endDate) {
        return res.status(400).json({ message: 'Dados insuficientes.' });
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

        res.status(200).json({ appointments, summary: { totalRevenue, totalServices } });

    } catch (error) {
        console.error("Erro no relatório de jornada:", error);
        res.status(500).json({ message: 'Erro no servidor.' });
    }
});

// NOVA ROTA: Relatório de Comissões
router.get('/commissions/:establishmentId', verifyToken, hasAccess, async (req, res) => {
    const { establishmentId } = req.params;
    const { year, month, professionalId } = req.query;

    if (!year || !month) return res.status(400).json({ message: 'Ano e mês são obrigatórios.' });

    try {
        const { db } = req;
        // Comissões já são salvas com mês/ano fixos no banco, então não sofrem tanto com timezone na leitura,
        // desde que a gravação (trigger) tenha usado a data correta.
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
        console.error("Erro comissões:", error);
        res.status(500).json({ message: 'Erro no servidor.' });
    }
});

// ROTA KPI DIÁRIO (CORRIGIDA COM TIMEZONE)
router.get('/summary', verifyToken, hasAccess, async (req, res) => {
    const { db } = req;
    const { establishmentId } = req.user;

    try {
        // 1. Busca Timezone
        const establishmentDoc = await db.collection('establishments').doc(establishmentId).get();
        const timezone = establishmentDoc.exists ? (establishmentDoc.data().timezone || 'America/Sao_Paulo') : 'America/Sao_Paulo';

        // 2. Calcula Inicio e Fim do dia no FUSO DO ESTABELECIMENTO
        // Cria string "YYYY-MM-DD" no fuso correto
        const now = new Date();
        const localDateString = now.toLocaleString("en-US", { timeZone: timezone });
        const localDate = new Date(localDateString);

        const startOfDay = new Date(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), 0, 0, 0, 0);
        // Precisamos ajustar o offset para que o Firestore entenda o momento absoluto correto
        // Uma forma robusta é criar a string ISO com o offset, mas para simplificar:
        // Vamos usar o offset calculado na rota availability se necessário, ou uma aproximação:
        // O mais seguro para KPIs simples é confiar que o 'paidDate' (string YYYY-MM-DD) salvo no checkout está correto (fizemos isso no appointments.js)
        
        // Alternativa via Timestamp (aproximada para "agora"):
        // Se quisermos ser precisos com Timestamp, teríamos que calcular o offset exato.
        // Vamos usar a lógica de string YYYY-MM-DD nas queries se possível, mas aqui usamos timestamp.
        // Ajuste simples: Recriar as datas usando o fuso.
        
        // Workaround funcional: Usar as datas geradas acima como se fossem UTC, mas aplicar o shift reverso? Não.
        // Melhor abordagem para KPI Rápido: Usar a data do servidor e aceitar pequena margem ou usar a lib 'date-fns-tz' se disponível.
        // Como não temos libs extras, vamos usar o cálculo manual de offset.
        
        const tzOffsetStr = now.toLocaleString('en-US', { timeZone: timezone, timeZoneName: 'longOffset' }).match(/GMT([+-]\d{2}:\d{2})/)?.[1] || '-03:00';
        const todayStr = now.toLocaleDateString('en-CA', { timeZone: timezone }); // YYYY-MM-DD
        
        const startTimestamp = admin.firestore.Timestamp.fromDate(new Date(`${todayStr}T00:00:00.000${tzOffsetStr}`));
        const endTimestamp = admin.firestore.Timestamp.fromDate(new Date(`${todayStr}T23:59:59.999${tzOffsetStr}`));

        const appointmentsQuery = db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('status', '==', 'confirmed')
            .where('startTime', '>=', startTimestamp)
            .where('startTime', '<=', endTimestamp);
        
        const salesQuery = db.collection('sales')
            .where('establishmentId', '==', establishmentId)
            .where('transaction.paidAt', '>=', startTimestamp)
            .where('transaction.paidAt', '<=', endTimestamp);

        const [appointmentsSnapshot, salesSnapshot] = await Promise.all([
            appointmentsQuery.get(),
            salesQuery.get()
        ]);

        let todayRevenue = 0;
        salesSnapshot.forEach(doc => { todayRevenue += doc.data().totalAmount || 0; });
        const todayAppointments = appointmentsSnapshot.size;

        res.status(200).json({ todayAppointments, todayRevenue });

    } catch (error) {
        console.error("Erro KPIs:", error);
        res.status(500).json({ message: "Erro ao buscar KPIs." });
    }
});

module.exports = router;