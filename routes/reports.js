// routes/reports.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, hasAccess } = require('../middlewares/auth');

router.use(verifyToken, hasAccess);

// --- FUNÇÃO AUXILIAR DE ERRO ---
function handleFirestoreError(res, error, context) {
    console.error(`Erro em ${context}:`, error);

    const linkMatch = error.message ? error.message.match(/https:\/\/console\.firebase\.google\.com[^\s]*/) : null;
    const indexLink = linkMatch ? linkMatch[0] : null;

    if (error.code === 9 || (error.message && error.message.includes('requires an index'))) {
        return res.status(500).json({ 
            message: `O Firestore precisa de um índice para ${context}.`,
            createIndexUrl: indexLink || "Link não encontrado automaticamente. Verifique os logs.",
            technicalError: error.message 
        });
    }
    res.status(500).json({ message: `Erro ao processar ${context}.` });
}

// =======================================================================
// 🚀 ROTAS DE INDICADORES (DASHBOARD & DRE)
// =======================================================================

router.get('/indicators', async (req, res) => {
    const { establishmentId } = req.user;
    const { startDate, endDate, professionalId, costCenterId } = req.query;

    if (!startDate || !endDate) return res.status(400).json({ message: 'Período obrigatório.' });

    try {
        const { db } = req;
        
        // --- PREPARAÇÃO DE DATAS ---
        const start = new Date(startDate + 'T00:00:00'); 
        const end = new Date(endDate + 'T23:59:59.999');

        // --- QUERIES ---
        
        // A) VENDAS (PDV/Agenda) - Para Dashboard Operacional
        let salesQuery = db.collection('sales')
            .where('establishmentId', '==', establishmentId)
            .where('transaction.paidAt', '>=', start)
            .where('transaction.paidAt', '<=', end);
            
        // B) FINANCEIRO PAGAR - Fonte Real da DRE (Despesas)
        let expensesQuery = db.collection('financial_payables')
            .where('establishmentId', '==', establishmentId)
            .where('dueDate', '>=', startDate)
            .where('dueDate', '<=', endDate);

        // C) FINANCEIRO RECEBER - Fonte Real da DRE (Receitas)
        let receivablesQuery = db.collection('financial_receivables')
            .where('establishmentId', '==', establishmentId)
            .where('dueDate', '>=', startDate)
            .where('dueDate', '<=', endDate);

        // D) COMISSÕES - Para Dashboard Operacional
        let commissionsQuery = db.collection('commission_reports')
            .where('establishmentId', '==', establishmentId)
            .where('createdAt', '>=', start)
            .where('createdAt', '<=', end);

        // E) AGENDAMENTOS - Para Estatísticas
        let appointmentsQuery = db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('startTime', '>=', start)
            .where('startTime', '<=', end);

        // F) NATUREZAS - Para Nomes na DRE
        let naturesQuery = db.collection('financial_natures')
            .where('establishmentId', '==', establishmentId);

        // --- EXECUÇÃO PARALELA ---
        const [salesSnap, expensesSnap, receivablesSnap, commissionsSnap, appointmentsSnap, naturesSnap] = await Promise.all([
            salesQuery.get(),
            expensesQuery.get(),
            receivablesQuery.get(),
            commissionsQuery.get(),
            appointmentsQuery.get(),
            naturesQuery.get()
        ]);

        const naturesMap = {};
        naturesSnap.forEach(doc => { naturesMap[doc.id] = doc.data().name; });

        // --- PROCESSAMENTO ---
        const salesByDay = {}, salesByMonth = {}, salesByProduct = {}, salesByProfessional = {};
        const apptByDay = {}, apptByMonth = {}, apptStatus = { scheduled: 0, completed: 0, canceled: 0, missed: 0 };
        const expensesByCategory = {};
        
        // Estrutura da DRE (Baseada APENAS no Financeiro agora)
        const dreFinancial = { revenues: {}, expenses: {}, totalRevenues: 0, totalExpenses: 0 };

        let totalSalesRevenue = 0; // Operacional (Dashboard)
        let totalCommissions = 0;  // Operacional (Dashboard)
        let totalCompletedAppointments = 0; 
        let totalAppointmentsVolume = 0;    

        // A) PROCESSAR VENDAS (Apenas para Gráficos e Cards Superiores)
        salesSnap.forEach(doc => {
            const data = doc.data();
            if (!data.transaction || !data.transaction.paidAt) return;
            
            let docValue = 0;

            if (professionalId && professionalId !== 'all') {
                const belongsToProf = (data.items || []).some(i => i.professionalId === professionalId) || data.professionalId === professionalId;
                if (!belongsToProf) return;
            }

            if (data.items && Array.isArray(data.items)) {
                data.items.forEach(item => {
                    const val = Number(item.price) || 0;
                    docValue += val;
                    const prodName = item.name || 'Outros';
                    salesByProduct[prodName] = (salesByProduct[prodName] || 0) + val;
                    
                    const profName = item.professionalName || data.professionalName || 'Não Identificado';
                    salesByProfessional[profName] = (salesByProfessional[profName] || 0) + val;
                });
            } else {
                docValue = Number(data.total || data.transaction.totalAmount) || 0;
                const profName = data.professionalName || 'Não Identificado';
                salesByProfessional[profName] = (salesByProfessional[profName] || 0) + docValue;
            }

            if (docValue > 0) {
                totalSalesRevenue += docValue;
                const d = data.transaction.paidAt.toDate();
                const dKey = d.toLocaleDateString('pt-BR');
                const mKey = d.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
                salesByDay[dKey] = (salesByDay[dKey] || 0) + docValue;
                salesByMonth[mKey] = (salesByMonth[mKey] || 0) + docValue;
            }
        });

        // B) PROCESSAR FINANCEIRO (DRE REAL)
        const filterCostCenter = (docData) => {
            if (costCenterId && costCenterId !== 'all' && docData.centroDeCustoId !== costCenterId) return false;
            return true;
        };

        // Receitas Financeiras
        receivablesSnap.forEach(doc => {
            const data = doc.data();
            if (!filterCostCenter(data)) return;

            const val = Number(data.amount) || 0;
            const nature = data.naturezaId ? (naturesMap[data.naturezaId] || 'Natureza Excluída') : 'Outras Receitas';
            
            dreFinancial.revenues[nature] = (dreFinancial.revenues[nature] || 0) + val;
            dreFinancial.totalRevenues += val;
        });

        // Despesas Financeiras
        expensesSnap.forEach(doc => {
            const data = doc.data();
            if (!filterCostCenter(data)) return;

            const val = Number(data.amount) || 0;
            const nature = data.naturezaId ? (naturesMap[data.naturezaId] || 'Natureza Excluída') : 'Despesas Gerais';
            
            dreFinancial.expenses[nature] = (dreFinancial.expenses[nature] || 0) + val;
            dreFinancial.totalExpenses += val;
            
            const cat = data.category || 'Geral';
            expensesByCategory[cat] = (expensesByCategory[cat] || 0) + val;
        });

        // C) PROCESSAR COMISSÕES (Apenas para Dashboard Operacional)
        commissionsSnap.forEach(doc => {
            const data = doc.data();
            if (professionalId && professionalId !== 'all' && data.professionalId !== professionalId) return;
            const val = Number(data.summary?.finalValue ?? data.summary?.totalCommission ?? 0);
            totalCommissions += val;
        });

        // D) PROCESSAR AGENDAMENTOS
        appointmentsSnap.forEach(doc => {
            const data = doc.data();
            if (professionalId && professionalId !== 'all' && data.professionalId !== professionalId) return;

            totalAppointmentsVolume++;
            const status = data.status || 'scheduled';
            if (apptStatus[status] !== undefined) apptStatus[status]++;
            if (status === 'completed') totalCompletedAppointments++;

            let aDate;
            if (data.startTime && typeof data.startTime.toDate === 'function') {
                aDate = data.startTime.toDate();
            } else if (typeof data.date === 'string') {
                const parts = data.date.split('-'); 
                aDate = new Date(parts[0], parts[1]-1, parts[2]);
            }

            if (aDate) {
                const dKey = aDate.toLocaleDateString('pt-BR');
                const mKey = aDate.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
                apptByDay[dKey] = (apptByDay[dKey] || 0) + 1;
                apptByMonth[mKey] = (apptByMonth[mKey] || 0) + 1;
            }
        });

        // --- CONSOLIDAÇÃO FINAL DA DRE ---
        // REMOVIDO: A soma manual de 'totalSalesRevenue' e 'totalCommissions' na DRE.
        // A DRE agora reflete EXATAMENTE o que está nas coleções 'financial_receivables' e 'financial_payables'.

        const netResult = dreFinancial.totalRevenues - dreFinancial.totalExpenses;

        // RETORNO
        res.json({
            dreFinancial: { 
                ...dreFinancial, 
                netResult 
            },
            // O dreSimple mantém os dados operacionais para os Cards do topo
            dreSimple: { 
                grossRevenue: totalSalesRevenue, 
                variableCosts: totalCommissions, 
                netProfit: totalSalesRevenue - totalCommissions 
            },
            charts: {
                salesDaily: { labels: Object.keys(salesByDay), data: Object.values(salesByDay) },
                salesMonthly: { labels: Object.keys(salesByMonth), data: Object.values(salesByMonth) },
                products: { labels: Object.keys(salesByProduct).sort((a,b)=>salesByProduct[b]-salesByProduct[a]).slice(0,5), data: Object.values(salesByProduct).sort((a,b)=>b-a).slice(0,5) },
                professionals: { labels: Object.keys(salesByProfessional), data: Object.values(salesByProfessional) },
                appointmentsDaily: { labels: Object.keys(apptByDay), data: Object.values(apptByDay) },
                appointmentsMonthly: { labels: Object.keys(apptByMonth), data: Object.values(apptByMonth) },
                appointmentsStatus: apptStatus
            },
            expensesByCategory,
            totalAppointments: totalCompletedAppointments,
            totalAppointmentsVolume
        });

    } catch (error) {
        handleFirestoreError(res, error, 'indicadores');
    }
});

// 2. ROTA DETALHES DE AGENDAMENTO (Modal)
router.get('/appointments/list', async (req, res) => {
    const { establishmentId } = req.user;
    const { date, professionalId } = req.query; 
    
    if (!date) return res.status(400).json({ message: 'Data obrigatória.' });

    try {
        let query = req.db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('date', '==', date);

        if (professionalId && professionalId !== 'all') {
            query = query.where('professionalId', '==', professionalId);
        }

        const snap = await query.get();
        
        let list = [];
        if (!snap.empty) {
             list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        } else {
             const startOfDay = new Date(date + 'T00:00:00');
             const endOfDay = new Date(date + 'T23:59:59');
             
             let tsQuery = req.db.collection('appointments')
                .where('establishmentId', '==', establishmentId)
                .where('startTime', '>=', startOfDay)
                .where('startTime', '<=', endOfDay);
             
             if (professionalId && professionalId !== 'all') {
                tsQuery = tsQuery.where('professionalId', '==', professionalId);
             }
             const tsSnap = await tsQuery.get();
             list = tsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        }

        list.sort((a,b)=>(a.time||'').localeCompare(b.time||''));
            
        res.json(list);
    } catch(error) { 
        handleFirestoreError(res, error, 'lista de agendamentos');
    }
});

// =======================================================================
// 📦 ROTAS LEGADO (Mantidas para compatibilidade)
// =======================================================================

router.get('/sales/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    const { startDate, endDate, cashierSessionId } = req.query;

    if (!startDate || !endDate) return res.status(400).json({ message: 'Datas obrigatórias.' });

    try {
        const { db } = req;
        const start = new Date(startDate); start.setHours(0,0,0,0);
        const end = new Date(endDate); end.setHours(23,59,59,999);
        
        let appointmentsQuery = db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('status', '==', 'completed')
            .where('transaction.paidAt', '>=', start)
            .where('transaction.paidAt', '<=', end);
        
        let salesQuery = db.collection('sales')
            .where('establishmentId', '==', establishmentId)
            .where('transaction.paidAt', '>=', start)
            .where('transaction.paidAt', '<=', end);

        const { professionalId: loggedInProfessionalId } = req.user;
        if (loggedInProfessionalId) {
            appointmentsQuery = appointmentsQuery.where('professionalId', '==', loggedInProfessionalId);
            salesQuery = salesQuery.where('professionalId', '==', loggedInProfessionalId);
        }

        const cashierSessionsQuery = db.collection('cashierSessions').where('establishmentId', '==', establishmentId);

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

        let transactions = [], totalRevenue = 0, methods = {};
        const proc = (doc) => {
            const d = doc.data();
            if(!d.transaction) return;
            if(cashierSessionId && cashierSessionId !== 'all' && d.cashierSessionId !== cashierSessionId) return;
            totalRevenue += d.transaction.totalAmount;
            (d.transaction.payments||[]).forEach(p => methods[p.method] = (methods[p.method]||0)+p.value);
            transactions.push({
                date: d.transaction.paidAt.toDate(),
                client: d.clientName,
                items: (d.items||d.services||[]).map(i=>i.name).join(', '),
                total: d.transaction.totalAmount,
                type: d.type === 'walk-in' ? 'Venda Avulsa' : 'Agendamento',
                responsavelCaixa: cashierSessionMap.get(d.cashierSessionId) || 'N/A',
                payments: d.transaction.payments
            });
        };
        appointmentsSnapshot.forEach(proc);
        salesSnapshot.docs.filter(d=>d.data().type==='walk-in').forEach(proc);
        transactions.sort((a,b)=>a.date-b.date);

        res.json({ summary: { totalRevenue, totalTransactions: transactions.length, averageTicket: transactions.length?totalRevenue/transactions.length:0, paymentMethodTotals: methods }, transactions });
    } catch(error) { 
        handleFirestoreError(res, error, 'relatório de vendas');
    }
});

router.get('/work-journal/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params; 
    const { professionalId, startDate, endDate } = req.query;
    if (!professionalId || !startDate || !endDate) return res.status(400).json({ message: 'Dados insuficientes.' });

    try {
        const start = new Date(startDate); start.setHours(0,0,0,0);
        const end = new Date(endDate); end.setHours(23,59,59,999);
        const snap = await req.db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('professionalId', '==', professionalId)
            .where('startTime', '>=', start)
            .where('startTime', '<=', end)
            .orderBy('startTime', 'asc').get();

        let totalRevenue = 0, totalServices = 0;
        const completed = snap.docs.filter(d => d.data().status === 'completed');
        const appointments = completed.map(doc => {
            const d = doc.data();
            const val = d.transaction ? d.transaction.totalAmount : 0;
            totalRevenue += val;
            totalServices += d.services ? d.services.length : 1;
            return { date: d.startTime.toDate(), client: d.clientName, services: d.services ? d.services.map(s => s.name).join(', ') : 'N/A', value: val };
        });
        res.json({ appointments, summary: { totalRevenue, totalServices } });
    } catch(error){ 
        handleFirestoreError(res, error, 'work-journal');
    }
});

router.get('/commissions/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params; 
    const { year, month, professionalId } = req.query;
    if (!year || !month) return res.status(400).json({ message: 'Ano/Mês obrigatórios.' });
    try {
        let q = req.db.collection('commission_reports')
            .where('establishmentId', '==', establishmentId)
            .where('year', '==', Number(year))
            .where('month', '==', Number(month));
        if(professionalId && professionalId!=='all') q=q.where('professionalId','==',professionalId);
        const s = await q.get(); res.json(s.docs.map(d=>d.data()));
    } catch(error){ 
        handleFirestoreError(res, error, 'comissões');
    }
});

router.get('/summary', async (req, res) => {
    const { establishmentId } = req.user;
    try {
        const now = new Date();
        const start = new Date(now); start.setHours(0,0,0,0);
        const end = new Date(now); end.setHours(23,59,59,999);
        
        const [apptSnap, salesSnap] = await Promise.all([
            req.db.collection('appointments').where('establishmentId', '==', establishmentId).where('status', '==', 'confirmed')
                .where('startTime', '>=', start).where('startTime', '<=', end).get(),
            req.db.collection('sales').where('establishmentId', '==', establishmentId)
                .where('transaction.paidAt', '>=', start).where('transaction.paidAt', '<=', end).get()
        ]);

        let todayRevenue = 0;
        salesSnap.forEach(doc => todayRevenue += (doc.data().totalAmount || 0));
        res.json({ todayAppointments: apptSnap.size, todayRevenue });
    } catch(e){ 
        console.error("Erro KPI Summary:", e);
        res.json({ todayAppointments: 0, todayRevenue: 0 }); 
    }
});

module.exports = router;