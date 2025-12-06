// routes/analytics.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// --- FUNÇÃO AUXILIAR DE ERRO (PADRÃO OTIMIZADO) ---
function handleFirestoreError(res, error, context) {
    console.error(`----------- ERRO NO BACKEND (${context}) -----------`);
    console.error(error);
    
    // Extrai o link de criação de índice
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

// Helper para converter data UTC do banco para o fuso do estabelecimento
function getDateInTimezone(dateObj, timezone) {
    if (!dateObj) return new Date();
    // Converte para string no fuso local e recria o objeto Date
    const localString = dateObj.toLocaleString("en-US", { timeZone: timezone });
    return new Date(localString);
}

// =======================================================================
// 📊 ROTAS DE ANALYTICS
// =======================================================================

// 1. DASHBOARD PRINCIPAL
router.get('/:establishmentId', async (req, res) => {
    // console.log(`[ANALYTICS] Geral: ${req.params.establishmentId}`); // Log opcional
    const { establishmentId } = req.params;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'As datas de início e fim são obrigatórias.' });
    }

    try {
        const { db } = req;
        
        // 1. Busca Timezone (Leitura leve)
        const establishmentDoc = await db.collection('establishments').doc(establishmentId).get();
        const timezone = establishmentDoc.exists ? (establishmentDoc.data().timezone || 'America/Sao_Paulo') : 'America/Sao_Paulo';

        const start = admin.firestore.Timestamp.fromDate(new Date(startDate));
        const end = admin.firestore.Timestamp.fromDate(new Date(endDate + "T23:59:59"));

        // 2. Buscas Otimizadas (.select)
        // Trazemos apenas campos essenciais para contagem e soma
        const [apptSnap, salesSnap] = await Promise.all([
            db.collection('appointments')
                .where('establishmentId', '==', establishmentId)
                .where('startTime', '>=', start)
                .where('startTime', '<=', end)
                .where('status', '==', 'completed')
                .select('startTime', 'transaction', 'totalAmount', 'services', 'comandaItems') // <--- OTIMIZAÇÃO
                .get(),
            db.collection('sales')
                .where('establishmentId', '==', establishmentId)
                .where('startTime', '>=', start)
                .where('startTime', '<=', end)
                .select('startTime', 'transaction', 'totalAmount', 'items') // <--- OTIMIZAÇÃO
                .get()
        ]);
        
        let totalRevenue = 0;
        const itemCount = {};
        const transactionsByMonth = {};
        const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

        const processTransaction = (doc, type) => {
            const data = doc.data();
            if (!data.startTime) return; 
            
            // Conversão de Fuso
            const transactionTimeUtc = data.startTime.toDate();
            const transactionTimeLocal = getDateInTimezone(transactionTimeUtc, timezone);

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
router.get('/:establishmentId/monthly-details', async (req, res) => {
    const { establishmentId } = req.params;
    const { year, month } = req.query;

    if (!year || !month) return res.status(400).json({ message: 'Ano e mês obrigatórios.' });

    try {
        const { db } = req;
        
        const establishmentDoc = await db.collection('establishments').doc(establishmentId).get();
        const timezone = establishmentDoc.exists ? (establishmentDoc.data().timezone || 'America/Sao_Paulo') : 'America/Sao_Paulo';

        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, parseInt(month) + 1, 0, 23, 59, 59);
        const startTs = admin.firestore.Timestamp.fromDate(startDate);
        const endTs = admin.firestore.Timestamp.fromDate(endDate);

        // Otimização: Select fields
        const [apptSnap, salesSnap, profSnap] = await Promise.all([
            db.collection('appointments')
                .where('establishmentId', '==', establishmentId)
                .where('status', '==', 'completed')
                .where('startTime', '>=', startTs)
                .where('startTime', '<=', endTs)
                .select('startTime', 'transaction', 'totalAmount', 'services', 'comandaItems', 'professionalId', 'professionalName') 
                .get(),
            db.collection('sales')
                .where('establishmentId', '==', establishmentId)
                .where('startTime', '>=', startTs)
                .where('startTime', '<=', endTs)
                .select('startTime', 'transaction', 'totalAmount', 'items', 'professionalId', 'professionalName')
                .get(),
            db.collection('professionals')
                .where('establishmentId', '==', establishmentId)
                .select('name') // Só precisamos do nome
                .get()
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
router.get('/:establishmentId/daily-details', async (req, res) => {
    const { establishmentId } = req.params;
    const { year, month, day, professionalId: filterProfessionalId } = req.query; 

    if (!year || !month || !day) return res.status(400).json({ message: 'Data completa obrigatória.' });

    try {
        const { db } = req;
        const startDate = new Date(year, month, day);
        const endDate = new Date(year, month, day, 23, 59, 59);
        const startTs = admin.firestore.Timestamp.fromDate(startDate);
        const endTs = admin.firestore.Timestamp.fromDate(endDate);

        // Queries base
        let apptQuery = db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('status', '==', 'completed')
            .where('startTime', '>=', startTs)
            .where('startTime', '<=', endTs)
            .select('startTime', 'clientName', 'professionalName', 'professionalId', 'services', 'comandaItems', 'transaction.totalAmount', 'cashierSessionId');
            
        let salesQuery = db.collection('sales')
            .where('establishmentId', '==', establishmentId)
            .where('startTime', '>=', startTs)
            .where('startTime', '<=', endTs)
            .select('startTime', 'clientName', 'professionalName', 'professionalId', 'items', 'totalAmount', 'cashierSessionId');
            
        if (filterProfessionalId && filterProfessionalId !== 'all') {
            apptQuery = apptQuery.where('professionalId', '==', filterProfessionalId);
            salesQuery = salesQuery.where('professionalId', '==', filterProfessionalId);
        }

        const [apptSnap, salesSnap, profSnap, sessionSnap] = await Promise.all([
            apptQuery.get(),
            salesQuery.get(),
            db.collection('professionals').where('establishmentId', '==', establishmentId).select('name').get(),
            // Sessões de caixa apenas do dia (se possível filtrar) ou todas do estab.
            // Para garantir, pegamos todas pois o volume é baixo, mas limitando campos.
            db.collection('cashierSessions').where('establishmentId', '==', establishmentId).select('openedByName', 'closedByName').get()
        ]);

        const professionalsMap = new Map(profSnap.docs.map(doc => [doc.id, doc.data().name]));
        const cashierSessionMap = new Map(sessionSnap.docs.map(doc => [doc.id, doc.data().openedByName || doc.data().closedByName || 'N/A']));
        
        let allTransactions = [];
        let totalRevenue = 0;

        const processItem = (doc, type) => {
            const data = doc.data();
            const value = Number(type === 'appointment' ? data.transaction?.totalAmount : data.totalAmount) || 0;
            totalRevenue += value;
            
            const professionalName = data.professionalName || professionalsMap.get(data.professionalId) || 'N/A';
            const items = type === 'appointment' 
                ? [...(data.services || []), ...(data.comandaItems || [])] 
                : (data.items || []);

            allTransactions.push({
                date: data.startTime.toDate(),
                client: data.clientName || 'Cliente',
                professionalName,
                items: items.map(i => i.name).join(', '),
                value,
                type: type === 'appointment' ? 'Agendamento' : 'Venda Avulsa',
                responsavelCaixa: cashierSessionMap.get(data.cashierSessionId) || 'Não definido'
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
router.get('/:establishmentId/professional-details', async (req, res) => {
    const { establishmentId } = req.params;
    const { year, month, professionalId } = req.query;

    if (!year || !month || !professionalId) return res.status(400).json({ message: 'Parâmetros insuficientes.' });

    try {
        const { db } = req;
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, parseInt(month) + 1, 0, 23, 59, 59);
        const startTs = admin.firestore.Timestamp.fromDate(startDate);
        const endTs = admin.firestore.Timestamp.fromDate(endDate);

        // Otimização: .select
        const [apptSnap, salesSnap] = await Promise.all([
             db.collection('appointments')
                 .where('establishmentId', '==', establishmentId)
                 .where('status', '==', 'completed')
                 .where('professionalId', '==', professionalId)
                 .where('startTime', '>=', startTs)
                 .where('startTime', '<=', endTs)
                 .select('startTime', 'clientName', 'services', 'comandaItems', 'transaction.totalAmount')
                 .get(),
             db.collection('sales')
                 .where('establishmentId', '==', establishmentId)
                 .where('professionalId', '==', professionalId)
                 .where('startTime', '>=', startTs)
                 .where('startTime', '<=', endTs)
                 .select('startTime', 'clientName', 'items', 'totalAmount')
                 .get()
        ]);
        
        let allTransactions = [];
        let totalRevenue = 0;

        const processItem = (doc, type) => {
            const data = doc.data();
            const value = Number(type === 'appointment' ? data.transaction?.totalAmount : data.totalAmount) || 0;
            totalRevenue += value;
            
            const items = type === 'appointment' 
                ? [...(data.services || []), ...(data.comandaItems || [])] 
                : (data.items || []);

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