// routes/analytics.js (Otimizado para Arquitetura Enterprise 3-Tier)

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// --- FUNÇÃO AUXILIAR DE ERRO ---
function handleFirestoreError(res, error, context) {
    console.error(`----------- ERRO NO BACKEND (${context}) -----------`);
    console.error(error);
    
    const linkMatch = error.message ? error.message.match(/https:\/\/console\.firebase\.google\.com[^\s]*/) : null;
    const indexLink = linkMatch ? linkMatch[0] : null;

    if (error.message && error.message.includes('requires an index')) {
        return res.status(500).json({ 
            message: `O Firestore precisa de um índice para ${context}.`,
            createIndexUrl: indexLink || "Link não encontrado automaticamente. Verifique os logs."
        });
    }
    return res.status(500).json({ message: `Ocorreu um erro no servidor ao processar ${context}.` });
}

function getDateInTimezone(dateObj, timezone) {
    if (!dateObj) return new Date();
    const localString = dateObj.toLocaleString("en-US", { timeZone: timezone });
    return new Date(localString);
}

// =======================================================================
// 📊 ROTAS DE ANALYTICS MULTI-TENANT
// =======================================================================

// 1. DASHBOARD PRINCIPAL
router.get('/:contextId', async (req, res) => {
    const { contextId } = req.params;
    const { startDate, endDate, contextType = 'BRANCH' } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'As datas de início e fim são obrigatórias.' });
    }

    try {
        const { db } = req;
        
        let timezone = 'America/Sao_Paulo';
        if (contextType === 'BRANCH') {
            const establishmentDoc = await db.collection('establishments').doc(contextId).get();
            timezone = establishmentDoc.exists ? (establishmentDoc.data().timezone || 'America/Sao_Paulo') : 'America/Sao_Paulo';
        }

        const start = admin.firestore.Timestamp.fromDate(new Date(startDate));
        const end = admin.firestore.Timestamp.fromDate(new Date(endDate + "T23:59:59"));

        // Montagem Dinâmica da Query Baseada no Contexto
        let apptQuery = db.collection('appointments')
            .where('status', '==', 'completed')
            .where('startTime', '>=', start)
            .where('startTime', '<=', end);

        let salesQuery = db.collection('sales')
            .where('startTime', '>=', start)
            .where('startTime', '<=', end);

        if (contextType === 'GROUP') {
            apptQuery = apptQuery.where('groupId', '==', contextId);
            salesQuery = salesQuery.where('groupId', '==', contextId);
        } else if (contextType === 'COMPANY') {
            apptQuery = apptQuery.where('companyId', '==', contextId);
            salesQuery = salesQuery.where('companyId', '==', contextId);
        } else {
            apptQuery = apptQuery.where('establishmentId', '==', contextId);
            salesQuery = salesQuery.where('establishmentId', '==', contextId);
        }

        // Seleção de campos otimizada
        apptQuery = apptQuery.select('startTime', 'transaction', 'totalAmount', 'services', 'comandaItems');
        salesQuery = salesQuery.select('startTime', 'transaction', 'totalAmount', 'items');

        const [apptSnap, salesSnap] = await Promise.all([apptQuery.get(), salesQuery.get()]);
        
        let totalRevenue = 0;
        const itemCount = {};
        const transactionsByMonth = {};
        const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

        const processTransaction = (doc, type) => {
            const data = doc.data();
            if (!data.startTime) return; 
            
            const transactionTimeLocal = getDateInTimezone(data.startTime.toDate(), timezone);
            const monthKey = `${transactionTimeLocal.getFullYear()}-${transactionTimeLocal.getMonth()}`;
            
            if (!transactionsByMonth[monthKey]) {
                const monthName = `${monthNames[transactionTimeLocal.getMonth()]}/${transactionTimeLocal.getFullYear().toString().slice(-2)}`;
                transactionsByMonth[monthKey] = { month: monthName, year: transactionTimeLocal.getFullYear(), monthIndex: transactionTimeLocal.getMonth(), count: 0, revenue: 0 };
            }
            transactionsByMonth[monthKey].count++;
            
            const revenue = Number(data.transaction?.totalAmount || data.totalAmount || 0);
            transactionsByMonth[monthKey].revenue += revenue;
            totalRevenue += revenue;
            
            const items = type === 'appointment' ? [...(data.services || []), ...(data.comandaItems || [])] : data.items || [];
            items.forEach(item => {
                if(item.name) itemCount[item.name] = (itemCount[item.name] || 0) + 1;
            });
        };

        apptSnap.forEach(doc => processTransaction(doc, 'appointment'));
        salesSnap.forEach(doc => processTransaction(doc, 'sale'));

        let mostPopularItem = 'N/A';
        let maxCount = 0;
        for (const itemName in itemCount) {
            if (itemCount[itemName] > maxCount) {
                maxCount = itemCount[itemName];
                mostPopularItem = itemName;
            }
        }
        
        const sortedMonths = Object.values(transactionsByMonth).sort((a, b) => new Date(a.year, a.monthIndex) - new Date(b.year, b.monthIndex));

        res.status(200).json({
            kpis: { totalRevenue, totalTransactions: apptSnap.size + salesSnap.size, mostPopularItem },
            transactionsByMonth: sortedMonths
        });

    } catch (error) {
        handleFirestoreError(res, error, 'analytics geral');
    }
});

// 2. DETALHES MENSAIS
router.get('/:contextId/monthly-details', async (req, res) => {
    const { contextId } = req.params;
    const { year, month, contextType = 'BRANCH' } = req.query;

    if (!year || !month) return res.status(400).json({ message: 'Ano e mês obrigatórios.' });

    try {
        const { db } = req;
        
        let timezone = 'America/Sao_Paulo';
        if (contextType === 'BRANCH') {
            const establishmentDoc = await db.collection('establishments').doc(contextId).get();
            timezone = establishmentDoc.exists ? (establishmentDoc.data().timezone || 'America/Sao_Paulo') : 'America/Sao_Paulo';
        }

        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, parseInt(month) + 1, 0, 23, 59, 59);
        const startTs = admin.firestore.Timestamp.fromDate(startDate);
        const endTs = admin.firestore.Timestamp.fromDate(endDate);

        let apptQuery = db.collection('appointments').where('status', '==', 'completed').where('startTime', '>=', startTs).where('startTime', '<=', endTs);
        let salesQuery = db.collection('sales').where('startTime', '>=', startTs).where('startTime', '<=', endTs);
        let profQuery = db.collection('professionals');

        if (contextType === 'GROUP') {
            apptQuery = apptQuery.where('groupId', '==', contextId);
            salesQuery = salesQuery.where('groupId', '==', contextId);
            profQuery = profQuery.where('groupId', '==', contextId);
        } else if (contextType === 'COMPANY') {
            apptQuery = apptQuery.where('companyId', '==', contextId);
            salesQuery = salesQuery.where('companyId', '==', contextId);
            profQuery = profQuery.where('companyId', '==', contextId);
        } else {
            apptQuery = apptQuery.where('establishmentId', '==', contextId);
            salesQuery = salesQuery.where('establishmentId', '==', contextId);
            profQuery = profQuery.where('establishmentId', '==', contextId);
        }

        const [apptSnap, salesSnap, profSnap] = await Promise.all([
            apptQuery.select('startTime', 'transaction', 'totalAmount', 'services', 'comandaItems', 'professionalId', 'professionalName').get(),
            salesQuery.select('startTime', 'transaction', 'totalAmount', 'items', 'professionalId', 'professionalName').get(),
            profQuery.select('name').get()
        ]);
        
        let revenueByDay = {};
        let salesByProfessional = {};
        let itemsCount = {};
        const professionalsMap = new Map(profSnap.docs.map(doc => [doc.id, { id: doc.id, name: doc.data().name }]));
        let revenueByTransactionType = { appointment: 0, sales: 0 };
        
        const processDoc = (doc, type) => {
            const data = doc.data();
            const dateLocal = getDateInTimezone(data.startTime.toDate(), timezone);
            const day = dateLocal.getDate();
            
            const revenue = Number(data.transaction?.totalAmount || data.totalAmount || 0);
            revenueByDay[day] = (revenueByDay[day] || 0) + revenue;
            
            if (type === 'appointment') revenueByTransactionType.appointment += revenue;
            else revenueByTransactionType.sales += revenue;

            const prof = professionalsMap.get(data.professionalId);
            const profName = data.professionalName || (prof ? prof.name : 'N/A');

            if (profName !== 'N/A') {
                if (!salesByProfessional[profName]) salesByProfessional[profName] = { count: 0, id: prof ? prof.id : null };
                salesByProfessional[profName].count++;
            }

            const items = type === 'appointment' ? [...(data.services || []), ...(data.comandaItems || [])] : data.items || [];
            items.forEach(item => {
                if(item.name) itemsCount[item.name] = (itemsCount[item.name] || 0) + 1;
            });
        };

        apptSnap.forEach(doc => processDoc(doc, 'appointment'));
        salesSnap.forEach(doc => processDoc(doc, 'sale'));

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
        handleFirestoreError(res, error, 'detalhes mensais');
    }
});

// 3. DETALHES DIÁRIOS
router.get('/:contextId/daily-details', async (req, res) => {
    const { contextId } = req.params;
    const { year, month, day, professionalId: filterProfessionalId, contextType = 'BRANCH' } = req.query; 

    if (!year || !month || !day) return res.status(400).json({ message: 'Data completa obrigatória.' });

    try {
        const { db } = req;
        const startDate = new Date(year, month, day);
        const endDate = new Date(year, month, day, 23, 59, 59);
        const startTs = admin.firestore.Timestamp.fromDate(startDate);
        const endTs = admin.firestore.Timestamp.fromDate(endDate);

        let apptQuery = db.collection('appointments').where('status', '==', 'completed').where('startTime', '>=', startTs).where('startTime', '<=', endTs);
        let salesQuery = db.collection('sales').where('startTime', '>=', startTs).where('startTime', '<=', endTs);
        let profQuery = db.collection('professionals');

        if (contextType === 'GROUP') {
            apptQuery = apptQuery.where('groupId', '==', contextId);
            salesQuery = salesQuery.where('groupId', '==', contextId);
            profQuery = profQuery.where('groupId', '==', contextId);
        } else if (contextType === 'COMPANY') {
            apptQuery = apptQuery.where('companyId', '==', contextId);
            salesQuery = salesQuery.where('companyId', '==', contextId);
            profQuery = profQuery.where('companyId', '==', contextId);
        } else {
            apptQuery = apptQuery.where('establishmentId', '==', contextId);
            salesQuery = salesQuery.where('establishmentId', '==', contextId);
            profQuery = profQuery.where('establishmentId', '==', contextId);
        }
            
        if (filterProfessionalId && filterProfessionalId !== 'all') {
            apptQuery = apptQuery.where('professionalId', '==', filterProfessionalId);
            salesQuery = salesQuery.where('professionalId', '==', filterProfessionalId);
        }

        const [apptSnap, salesSnap, profSnap] = await Promise.all([
            apptQuery.select('startTime', 'clientName', 'professionalName', 'professionalId', 'services', 'comandaItems', 'transaction.totalAmount', 'cashierSessionId').get(),
            salesQuery.select('startTime', 'clientName', 'professionalName', 'professionalId', 'items', 'totalAmount', 'cashierSessionId').get(),
            profQuery.select('name').get()
        ]);

        const professionalsMap = new Map(profSnap.docs.map(doc => [doc.id, doc.data().name]));
        
        let allTransactions = [];
        let totalRevenue = 0;

        const processItem = (doc, type) => {
            const data = doc.data();
            const value = Number(type === 'appointment' ? data.transaction?.totalAmount : data.totalAmount) || 0;
            totalRevenue += value;
            
            const professionalName = data.professionalName || professionalsMap.get(data.professionalId) || 'N/A';
            const items = type === 'appointment' ? [...(data.services || []), ...(data.comandaItems || [])] : (data.items || []);

            allTransactions.push({
                date: data.startTime.toDate(),
                client: data.clientName || 'Cliente',
                professionalName,
                items: items.map(i => i.name).join(', '),
                value,
                type: type === 'appointment' ? 'Agendamento' : 'Venda Avulsa'
            });
        };

        apptSnap.forEach(doc => processItem(doc, 'appointment'));
        salesSnap.forEach(doc => processItem(doc, 'sale'));
        allTransactions.sort((a, b) => a.date - b.date);
        
        res.status(200).json({
            transactions: allTransactions,
            summary: { totalRevenue, totalTransactions: allTransactions.length }
        });

    } catch (error) {
        handleFirestoreError(res, error, 'detalhes diários');
    }
});

// 4. DETALHES POR PROFISSIONAL
router.get('/:contextId/professional-details', async (req, res) => {
    const { contextId } = req.params;
    const { year, month, professionalId, contextType = 'BRANCH' } = req.query;

    if (!year || !month || !professionalId) return res.status(400).json({ message: 'Parâmetros insuficientes.' });

    try {
        const { db } = req;
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, parseInt(month) + 1, 0, 23, 59, 59);
        const startTs = admin.firestore.Timestamp.fromDate(startDate);
        const endTs = admin.firestore.Timestamp.fromDate(endDate);

        let apptQuery = db.collection('appointments').where('status', '==', 'completed').where('professionalId', '==', professionalId).where('startTime', '>=', startTs).where('startTime', '<=', endTs);
        let salesQuery = db.collection('sales').where('professionalId', '==', professionalId).where('startTime', '>=', startTs).where('startTime', '<=', endTs);

        if (contextType === 'GROUP') {
            apptQuery = apptQuery.where('groupId', '==', contextId);
            salesQuery = salesQuery.where('groupId', '==', contextId);
        } else if (contextType === 'COMPANY') {
            apptQuery = apptQuery.where('companyId', '==', contextId);
            salesQuery = salesQuery.where('companyId', '==', contextId);
        } else {
            apptQuery = apptQuery.where('establishmentId', '==', contextId);
            salesQuery = salesQuery.where('establishmentId', '==', contextId);
        }

        const [apptSnap, salesSnap] = await Promise.all([
             apptQuery.select('startTime', 'clientName', 'services', 'comandaItems', 'transaction.totalAmount').get(),
             salesQuery.select('startTime', 'clientName', 'items', 'totalAmount').get()
        ]);
        
        let allTransactions = [];
        let totalRevenue = 0;

        const processItem = (doc, type) => {
            const data = doc.data();
            const value = Number(type === 'appointment' ? data.transaction?.totalAmount : data.totalAmount) || 0;
            totalRevenue += value;
            const items = type === 'appointment' ? [...(data.services || []), ...(data.comandaItems || [])] : (data.items || []);

            allTransactions.push({
                date: data.startTime.toDate(),
                client: data.clientName || 'Cliente',
                items: items.map(i => i.name).join(', '),
                value,
                type: type === 'appointment' ? 'Agendamento' : 'Venda Avulsa'
            });
        };

        apptSnap.forEach(doc => processItem(doc, 'appointment'));
        salesSnap.forEach(doc => processItem(doc, 'sale'));
        allTransactions.sort((a, b) => a.date - b.date);
        
        res.status(200).json({
            transactions: allTransactions,
            summary: { totalRevenue, totalTransactions: allTransactions.length }
        });

    } catch (error) {
        handleFirestoreError(res, error, 'detalhes do profissional');
    }
});

module.exports = router;