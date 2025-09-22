const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Função auxiliar para tratar erros
function handleFirestoreError(res, error) {
    console.error("----------- ERRO NO BACKEND (ANALYTICS) -----------");
    console.error(error);
    if (error.message && error.message.includes('requires an index')) {
        return res.status(500).json({ message: "O Firestore precisa de um índice. Verifique o log do servidor para o link de criação." });
    }
    return res.status(500).json({ message: 'Ocorreu um erro no servidor ao gerar os relatórios.' });
}

// Rota para o dashboard principal de analytics
router.get('/:establishmentId', async (req, res) => {
    console.log(`[ANALYTICS] Recebida requisição para relatório geral para establishment: ${req.params.establishmentId}`);
    const { establishmentId } = req.params;
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'As datas de início e fim são obrigatórias.' });
    }

    try {
        const { db } = req;
        const start = admin.firestore.Timestamp.fromDate(new Date(startDate));
        const end = admin.firestore.Timestamp.fromDate(new Date(endDate + "T23:59:59"));

        const [appointmentsSnapshot, salesSnapshot] = await Promise.all([
            db.collection('appointments').where('establishmentId', '==', establishmentId).where('startTime', '>=', start).where('startTime', '<=', end).where('status', '==', 'completed').get(),
            db.collection('sales').where('establishmentId', '==', establishmentId).where('startTime', '>=', start).where('startTime', '<=', end).get()
        ]);
        
        let totalRevenue = 0;
        const itemCount = {};
        const transactionsByMonth = {};
        const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

        const processTransaction = (doc, type) => {
            const data = doc.data();
            if (!data.startTime || typeof data.startTime.toDate !== 'function') return;
            const transactionTime = data.startTime.toDate();
            const monthKey = `${transactionTime.getFullYear()}-${transactionTime.getMonth()}`;
            if (!transactionsByMonth[monthKey]) {
                const monthName = `${monthNames[transactionTime.getMonth()]}/${transactionTime.getFullYear().toString().slice(-2)}`;
                transactionsByMonth[monthKey] = { month: monthName, year: transactionTime.getFullYear(), monthIndex: transactionTime.getMonth(), count: 0, revenue: 0 };
            }
            transactionsByMonth[monthKey].count++;
            const revenue = data.transaction?.totalAmount || data.totalAmount || 0;
            transactionsByMonth[monthKey].revenue += revenue;
            totalRevenue += revenue;
            const items = type === 'appointment' ? [...(data.services || []), ...(data.comandaItems || [])] : data.items || [];
            items.forEach(item => {
                if(item.name) itemCount[item.name] = (itemCount[item.name] || 0) + 1;
            });
        };

        appointmentsSnapshot.docs.forEach(doc => processTransaction(doc, 'appointment'));
        salesSnapshot.docs.forEach(doc => processTransaction(doc, 'sale'));

        let mostPopularItem = 'N/A';
        let maxCount = 0;
        for (const itemName in itemCount) {
            if (itemCount[itemName] > maxCount) {
                maxCount = itemCount[itemName];
                mostPopularItem = itemName;
            }
        }
        const totalTransactions = appointmentsSnapshot.size + salesSnapshot.size;
        const sortedMonths = Object.values(transactionsByMonth).sort((a, b) => new Date(a.year, a.monthIndex) - new Date(b.year, b.monthIndex));

        res.status(200).json({
            kpis: { totalRevenue, totalTransactions, mostPopularItem },
            transactionsByMonth: sortedMonths
        });
    } catch (error) {
        handleFirestoreError(res, error);
    }
});

// Detalhes de um mês específico
router.get('/:establishmentId/monthly-details', async (req, res) => {
    console.log(`[ANALYTICS] Recebida requisição para detalhes mensais para establishment: ${req.params.establishmentId}`);
    const { establishmentId } = req.params;
    const { year, month } = req.query;

    if (!year || !month) {
        return res.status(400).json({ message: 'Ano e mês são obrigatórios.' });
    }

    try {
        const { db } = req;
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, parseInt(month) + 1, 0, 23, 59, 59);

        const [appointmentsSnapshot, salesSnapshot, professionalsSnapshot] = await Promise.all([
            db.collection('appointments').where('establishmentId', '==', establishmentId).where('status', '==', 'completed').where('startTime', '>=', startDate).where('startTime', '<=', endDate).get(),
            db.collection('sales').where('establishmentId', '==', establishmentId).where('startTime', '>=', startDate).where('startTime', '<=', endDate).get(),
            db.collection('professionals').where('establishmentId', '==', establishmentId).get()
        ]);
        
        let revenueByDay = {};
        let salesByProfessional = {};
        let itemsCount = {};
        const professionalsMap = new Map(professionalsSnapshot.docs.map(doc => [doc.id, { id: doc.id, name: doc.data().name }]));
        let revenueByTransactionType = { appointment: 0, sales: 0 };
        let totalSalesRevenue = 0; // Adicionando esta variável para rastrear a receita de vendas avulsas

        const processDoc = (doc, type) => {
            const data = doc.data();
            const date = data.startTime.toDate();
            const day = date.getDate();
            const revenue = data.transaction?.totalAmount || data.totalAmount || 0;
            
            revenueByDay[day] = (revenueByDay[day] || 0) + revenue;
            
            // Adiciona o valor à contagem por tipo
            if (type === 'appointment') {
                revenueByTransactionType.appointment += revenue;
            } else {
                revenueByTransactionType.sales += revenue;
            }

            const prof = professionalsMap.get(data.professionalId);
            const profName = data.professionalName || (prof ? prof.name : 'N/A');

            if (profName !== 'N/A') {
                if (!salesByProfessional[profName]) {
                    salesByProfessional[profName] = { count: 0, id: prof ? prof.id : null };
                }
                salesByProfessional[profName].count++;
            }

            const items = type === 'appointment' ? [...(data.services || []), ...(data.comandaItems || [])] : data.items || [];
            items.forEach(item => {
                if(item.name) itemsCount[item.name] = (itemsCount[item.name] || 0) + 1;
            });
        };

        appointmentsSnapshot.docs.forEach(doc => processDoc(doc, 'appointment'));
        salesSnapshot.docs.forEach(doc => processDoc(doc, 'sale'));

        const daysInMonth = new Date(year, parseInt(month) + 1, 0).getDate();
        const revenueByDayArray = Array.from({ length: daysInMonth }, (_, i) => ({ day: i + 1, revenue: revenueByDay[i + 1] || 0 }));
        
        const topItems = Object.entries(itemsCount).sort(([, a], [, b]) => b - a).slice(0, 5).map(([name, count]) => ({ name, count }));

        res.status(200).json({
            revenueByDay: revenueByDayArray,
            salesByProfessional: Object.entries(salesByProfessional).map(([name, data]) => ({ name, count: data.count, id: data.id })),
            topItems,
            revenueByTransactionType
        });
    } catch (error) {
        handleFirestoreError(res, error);
    }
});

// NOVO ENDPOINT: Detalhes de um dia específico
router.get('/:establishmentId/daily-details', async (req, res) => {
    const { establishmentId } = req.params;
    const { year, month, day, professionalId } = req.query;

    if (!year || !month || !day) {
        return res.status(400).json({ message: 'Ano, mês e dia são obrigatórios.' });
    }

    try {
        const { db } = req;
        const startDate = new Date(year, month, day);
        const endDate = new Date(year, month, day, 23, 59, 59);

        let appointmentsQuery = db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('status', '==', 'completed')
            .where('startTime', '>=', startDate)
            .where('startTime', '<=', endDate);
            
        let salesQuery = db.collection('sales')
            .where('establishmentId', '==', establishmentId)
            .where('startTime', '>=', startDate)
            .where('startTime', '<=', endDate);
            
        if (professionalId) {
            appointmentsQuery = appointmentsQuery.where('professionalId', '==', professionalId);
            salesQuery = salesQuery.where('professionalId', '==', professionalId);
        }

        const [appointmentsSnapshot, salesSnapshot] = await Promise.all([
            appointmentsQuery.get(),
            salesQuery.get()
        ]);
        
        let allTransactions = [];
        let totalRevenue = 0;

        appointmentsSnapshot.forEach(doc => {
            const data = doc.data();
            const value = data.transaction?.totalAmount || 0;
            totalRevenue += value;
            allTransactions.push({
                date: data.startTime.toDate(),
                client: data.clientName,
                items: [...(data.services || []), ...(data.comandaItems || [])].map(i => i.name).join(', '),
                value: value,
                type: 'Agendamento'
            });
        });
        
        salesSnapshot.forEach(doc => {
            const data = doc.data();
            const value = data.totalAmount || 0;
            totalRevenue += value;
            allTransactions.push({
                date: data.startTime.toDate(),
                client: data.clientName,
                items: data.items.map(i => i.name).join(', '),
                value: value,
                type: 'Venda Avulsa'
            });
        });
        
        allTransactions.sort((a, b) => a.date - b.date);
        
        res.status(200).json({
            transactions: allTransactions,
            summary: {
                totalRevenue,
                totalTransactions: allTransactions.length
            }
        });
    } catch (error) {
        handleFirestoreError(res, error);
    }
});

// Detalhes de um profissional específico em um mês
router.get('/:establishmentId/professional-details', async (req, res) => {
    console.log(`[ANALYTICS] Recebida requisição para detalhes do profissional: ${req.query.professionalId}`);
    const { establishmentId } = req.params;
    const { year, month, professionalId } = req.query;

    if (!year || !month || !professionalId) {
        return res.status(400).json({ message: 'Ano, mês e ID do profissional são obrigatórios.' });
    }
    try {
        const { db } = req;
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, parseInt(month) + 1, 0, 23, 59, 59);

        const [appointmentsSnapshot, salesSnapshot] = await Promise.all([
             db.collection('appointments').where('establishmentId', '==', establishmentId).where('status', '==', 'completed').where('professionalId', '==', professionalId).where('startTime', '>=', startDate).where('startTime', '<=', endDate).get(),
             db.collection('sales').where('establishmentId', '==', establishmentId).where('professionalId', '==', professionalId).where('startTime', '>=', startDate).where('startTime', '<=', endDate).get()
        ]);
        
        let allTransactions = [];
        let totalRevenue = 0;

        appointmentsSnapshot.forEach(doc => {
            const data = doc.data();
            const value = data.transaction?.totalAmount || 0;
            totalRevenue += value;
            allTransactions.push({
                date: data.startTime.toDate(),
                client: data.clientName,
                items: [...(data.services || []), ...(data.comandaItems || [])].map(i => i.name).join(', '),
                value: value,
                type: 'Agendamento'
            });
        });
        
        salesSnapshot.forEach(doc => {
            const data = doc.data();
            const value = data.totalAmount || 0;
            totalRevenue += value;
            allTransactions.push({
                date: data.startTime.toDate(),
                client: data.clientName,
                items: data.items.map(i => i.name).join(', '),
                value: value,
                type: 'Venda Avulsa'
            });
        });
        
        allTransactions.sort((a, b) => a.date - b.date);
        
        res.status(200).json({
            transactions: allTransactions,
            summary: {
                totalRevenue,
                totalTransactions: allTransactions.length
            }
        });
    } catch (error) {
        handleFirestoreError(res, error);
    }
});


module.exports = router;