// routes/reports.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, hasAccess } = require('../middlewares/auth');

router.use(verifyToken, hasAccess);

// --- FUNÇÃO AUXILIAR ---
function getDateInTimezone(dateObj, timezone) {
    const localString = dateObj.toLocaleString("en-US", { timeZone: timezone });
    return new Date(localString);
}

// =======================================================================
// 🚀 NOVAS ROTAS (DASHBOARD DE GESTÃO / DRE)
// =======================================================================

// 1. ROTA MESTRA DE INDICADORES
router.get('/indicators', async (req, res) => {
    const { establishmentId } = req.user;
    const { startDate, endDate, professionalId, costCenterId } = req.query;

    if (!startDate || !endDate) return res.status(400).json({ message: 'Período obrigatório.' });

    try {
        const { db } = req;
        // Configura datas para comparação de timestamp (UTC/Local)
        const start = new Date(startDate); start.setHours(0,0,0,0);
        const end = new Date(endDate); end.setHours(23,59,59,999);
        
        const startTs = start.getTime();
        const endTs = end.getTime();

        // Busca TUDO para evitar erros de índice composto e permitir filtragem flexível
        const [salesSnap, expensesSnap, receivablesSnap, naturesSnap, commissionsSnap, appointmentsSnap] = await Promise.all([
            db.collection('sales').where('establishmentId', '==', establishmentId).get(),
            db.collection('financial_payables').where('establishmentId', '==', establishmentId).get(),
            db.collection('financial_receivables').where('establishmentId', '==', establishmentId).get(),
            db.collection('financial_natures').where('establishmentId', '==', establishmentId).get(),
            db.collection('commission_reports').where('establishmentId', '==', establishmentId).get(),
            db.collection('appointments').where('establishmentId', '==', establishmentId).get()
        ]);

        // Mapear Naturezas (ID -> Nome)
        const naturesMap = {};
        naturesSnap.forEach(doc => { naturesMap[doc.id] = doc.data().name; });

        // --- PROCESSAMENTO ---

        // Estruturas de Agregação
        const salesByDay = {}, salesByMonth = {}, salesByProduct = {}, salesByProfessional = {};
        const apptByDay = {}, apptByMonth = {}, apptStatus = { scheduled: 0, completed: 0, canceled: 0, missed: 0 };
        const expensesByCategory = {};
        
        // DRE Financeiro (Baseado em Contas a Pagar/Receber - Aba DRE)
        const dreFinancial = { revenues: {}, expenses: {}, totalRevenues: 0, totalExpenses: 0 };

        // Totais para KPIs
        let totalRevenue = 0;
        let totalCommissions = 0;
        let totalCompletedAppointments = 0; // Apenas atendidos
        let totalAppointmentsVolume = 0;    // Volume geral (para gráfico)

        // A) VENDAS (Faturamento)
        salesSnap.forEach(doc => {
            const data = doc.data();
            if (!data.transaction || !data.transaction.paidAt) return;
            const d = data.transaction.paidAt.toDate();
            if (d.getTime() < startTs || d.getTime() > endTs) return;

            let docValue = 0;
            // Soma itens (se detalhado e houver filtro de profissional) ou total
            if (data.items && Array.isArray(data.items)) {
                data.items.forEach(item => {
                    const itemOwner = item.professionalId || data.professionalId;
                    if (professionalId && professionalId !== 'all' && itemOwner !== professionalId) return;
                    const val = Number(item.price) || 0;
                    docValue += val;
                    salesByProduct[item.name || 'Outros'] = (salesByProduct[item.name || 'Outros'] || 0) + val;
                    salesByProfessional[item.professionalName || 'Geral'] = (salesByProfessional[item.professionalName || 'Geral'] || 0) + val;
                });
            } else if (!professionalId || professionalId === 'all' || data.professionalId === professionalId) {
                docValue = Number(data.total || data.transaction.totalAmount) || 0;
            }

            if (docValue > 0) {
                totalRevenue += docValue;
                const dKey = d.toLocaleDateString('pt-BR');
                const mKey = d.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
                salesByDay[dKey] = (salesByDay[dKey] || 0) + docValue;
                salesByMonth[mKey] = (salesByMonth[mKey] || 0) + docValue;
            }
        });

        // B) FINANCEIRO (Para DRE Gerencial na Aba DRE)
        const filterFinancial = (doc) => {
            const data = doc.data();
            const dateStr = data.dueDate; 
            if(!dateStr || dateStr < startDate || dateStr > endDate) return false;
            if (costCenterId && costCenterId !== 'all' && data.centroDeCustoId !== costCenterId) return false;
            return true;
        };

        receivablesSnap.forEach(doc => {
            if (!filterFinancial(doc)) return;
            const val = Number(doc.data().amount) || 0;
            const nature = naturesMap[doc.data().naturezaId] || 'Receitas Diversas';
            dreFinancial.revenues[nature] = (dreFinancial.revenues[nature] || 0) + val;
            dreFinancial.totalRevenues += val;
        });

        expensesSnap.forEach(doc => {
            if (!filterFinancial(doc)) return;
            const val = Number(doc.data().amount) || 0;
            const nature = naturesMap[doc.data().naturezaId] || 'Despesas Gerais';
            dreFinancial.expenses[nature] = (dreFinancial.expenses[nature] || 0) + val;
            dreFinancial.totalExpenses += val;
            
            // Categoria para DRE Simples (se necessário)
            const cat = doc.data().category || 'Geral';
            expensesByCategory[cat] = (expensesByCategory[cat] || 0) + val;
        });

        // C) COMISSÕES (Para dedução do Lucro Estimado)
        commissionsSnap.forEach(doc => {
            const data = doc.data();
            if (!data.createdAt) return;
            const cDate = data.createdAt.toDate().getTime();
            if (cDate < startTs || cDate > endTs) return;
            if (professionalId && professionalId !== 'all' && data.professionalId !== professionalId) return;
            
            // Soma o valor pago
            totalCommissions += Number(data.summary.finalValue !== undefined ? data.summary.finalValue : data.summary.totalCommission);
        });

        // D) AGENDAMENTOS (Contagem)
        appointmentsSnap.forEach(doc => {
            const data = doc.data();
            let aDate;
            if (typeof data.date === 'string') { const [y, m, d] = data.date.split('-'); aDate = new Date(y, m-1, d); }
            else if (data.date?.toDate) { aDate = data.date.toDate(); }
            
            if (!aDate) return;
            if (aDate.getTime() < startTs || aDate.getTime() > endTs) return;
            if (professionalId && professionalId !== 'all' && data.professionalId !== professionalId) return;

            totalAppointmentsVolume++;
            
            const status = data.status || 'scheduled';
            if (apptStatus[status] !== undefined) apptStatus[status]++;
            
            // Para KPI de "Agendamentos Atendidos" e Ticket Médio
            if (status === 'completed') {
                totalCompletedAppointments++;
            }

            const dKey = aDate.toLocaleDateString('pt-BR');
            const mKey = aDate.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
            apptByDay[dKey] = (apptByDay[dKey] || 0) + 1;
            apptByMonth[mKey] = (apptByMonth[mKey] || 0) + 1;
        });

        // 3. RETORNO
        res.json({
            // DRE Completo (Aba DRE)
            dreFinancial: { 
                ...dreFinancial, 
                netResult: dreFinancial.totalRevenues - dreFinancial.totalExpenses 
            },
            
            // KPIs (Aba Financeiro) - Ajustado conforme pedido
            dreSimple: { 
                grossRevenue: totalRevenue, 
                variableCosts: totalCommissions, // Apenas Comissões
                // Lucro Estimado = Faturamento - Comissões (ignora despesas fixas aqui)
                netProfit: totalRevenue - totalCommissions 
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
            totalAppointments: totalCompletedAppointments, // KPI Principal: Apenas Atendidos
            totalAppointmentsVolume // KPI Secundário: Volume total (para gráficos de barra)
        });

    } catch (error) {
        console.error("Erro Indicators:", error);
        res.status(500).json({ message: 'Erro ao processar indicadores.' });
    }
});

// 2. ROTA DETALHES DE AGENDAMENTO (Modal)
router.get('/appointments/list', async (req, res) => {
    const { establishmentId } = req.user;
    const { date, professionalId } = req.query; 
    try {
        let query = req.db.collection('appointments').where('establishmentId', '==', establishmentId).where('date', '==', date);
        if (professionalId && professionalId !== 'all') query = query.where('professionalId', '==', professionalId);
        const snap = await query.get();
        // Mapeia e ordena por horário
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a,b)=>(a.time||'').localeCompare(b.time||''));
        res.json(list);
    } catch(e) { res.status(500).json({ message: 'Erro lista.' }); }
});

// =======================================================================
// 📦 ROTAS LEGADO (RESTAURADAS DO CÓDIGO ORIGINAL)
// =======================================================================

router.get('/sales/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    const { startDate, endDate, cashierSessionId } = req.query;

    if (!startDate || !endDate) return res.status(400).json({ message: 'Datas obrigatórias.' });

    try {
        const { db } = req;
        const start = admin.firestore.Timestamp.fromDate(new Date(startDate));
        const end = admin.firestore.Timestamp.fromDate(new Date(endDate + "T23:59:59"));
        const { professionalId: loggedInProfessionalId } = req.user;
        
        let appointmentsQuery = db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('status', '==', 'completed')
            .where('transaction.paidAt', '>=', start).where('transaction.paidAt', '<=', end);
        
        let salesQuery = db.collection('sales')
            .where('establishmentId', '==', establishmentId)
            .where('transaction.paidAt', '>=', start).where('transaction.paidAt', '<=', end);

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
    } catch(e) { res.status(500).json({ message: 'Erro vendas.' }); }
});

router.get('/work-journal/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params; 
    const { professionalId, startDate, endDate } = req.query;
    if (!professionalId || !startDate || !endDate) return res.status(400).json({ message: 'Dados insuficientes.' });

    try {
        const start = new Date(`${startDate}T00:00:00`);
        const end = new Date(`${endDate}T23:59:59`);
        const snap = await req.db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('professionalId', '==', professionalId)
            .where('startTime', '>=', start).where('startTime', '<=', end)
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
    } catch(e){ res.status(500).json({ message: 'Erro work-journal.' }); }
});

router.get('/commissions/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params; 
    const { year, month, professionalId } = req.query;
    if (!year || !month) return res.status(400).json({ message: 'Ano/Mês obrigatórios.' });
    try {
        let q = req.db.collection('commission_reports').where('establishmentId', '==', establishmentId).where('year', '==', year).where('month', '==', month);
        if(professionalId && professionalId!=='all') q=q.where('professionalId','==',professionalId);
        const s = await q.get(); res.json(s.docs.map(d=>d.data()));
    } catch(e){ res.status(500).json({ message: 'Erro comissões.' }); }
});

router.get('/summary', async (req, res) => {
    const { establishmentId } = req.user;
    try {
        const now = new Date();
        // Ajuste simples para evitar timezone complexo no resumo rápido
        const start = new Date(now.setHours(0,0,0,0));
        const end = new Date(now.setHours(23,59,59,999));
        
        // Tenta buscar pelo índice, se falhar pelo catch retorna zero
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