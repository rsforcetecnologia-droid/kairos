// routes/financial.js (Otimizado para Arquitetura Enterprise 3-Tier)

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, hasAccess } = require('../middlewares/auth');
const { AggregateField } = require('firebase-admin/firestore'); 

router.use(verifyToken, hasAccess);

function handleFirestoreError(res, error, context) {
    console.error(`Erro em ${context}:`, error);
    const linkMatch = error.message ? error.message.match(/https:\/\/console\.firebase\.google\.com[^\s]*/) : null;
    const indexLink = linkMatch ? linkMatch[0] : null;

    if (error.message && error.message.includes('requires an index')) {
        return res.status(500).json({ 
            message: `O Firestore precisa de um índice para ${context}.`,
            createIndexUrl: indexLink || "Link não encontrado automaticamente. Verifique os logs."
        });
    }
    res.status(500).json({ message: `Ocorreu um erro no servidor ao processar ${context}.` });
}

// --- ROTAS GENÉRICAS HIERÁRQUICAS ---
const createHierarchicalEntry = (collectionName) => async (req, res) => {
    // Agora aceitamos que o frontend envie o establishmentId para onde a despesa/natureza vai ser criada
    const estId = req.body.establishmentId || req.user.establishmentId; 
    const { name, parentId } = req.body;
    
    if (!name) return res.status(400).json({ message: 'O nome é obrigatório.' });
    
    try {
        const estDoc = await req.db.collection('establishments').doc(estId).get();
        const groupId = estDoc.exists ? estDoc.data().groupId : null;
        const companyId = estDoc.exists ? estDoc.data().companyId : null;

        const newEntry = { 
            establishmentId: estId, 
            groupId, 
            companyId, 
            name, 
            parentId: parentId || null, 
            createdAt: admin.firestore.FieldValue.serverTimestamp() 
        };
        const docRef = await req.db.collection(collectionName).add(newEntry);
        res.status(201).json({ message: 'Item criado com sucesso!', id: docRef.id, ...newEntry });
    } catch (error) {
        handleFirestoreError(res, error, collectionName);
    }
};

const getHierarchicalEntries = (collectionName) => async (req, res) => {
    const { contextId } = req.params;
    const { contextType = 'BRANCH' } = req.query;

    try {
        let query = req.db.collection(collectionName);
        
        if (contextType === 'GROUP') query = query.where('groupId', '==', contextId);
        else if (contextType === 'COMPANY') query = query.where('companyId', '==', contextId);
        else query = query.where('establishmentId', '==', contextId);

        const snapshot = await query.orderBy('name').get();
        const entries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(entries);
    } catch (error) {
        handleFirestoreError(res, error, collectionName);
    }
};

const deleteHierarchicalEntry = (collectionName) => async (req, res) => {
    const { id } = req.params;
    try {
        const docRef = req.db.collection(collectionName).doc(id);
        // Na nova estrutura, o middleware garante o acesso, poderíamos adicionar validação extra se necessário
        await docRef.delete();
        res.status(200).json({ message: 'Item excluído com sucesso.' });
    } catch (error) {
        handleFirestoreError(res, error, collectionName);
    }
};

router.post('/natures', createHierarchicalEntry('financial_natures'));
router.get('/natures/:contextId', getHierarchicalEntries('financial_natures')); 
router.delete('/natures/:id', deleteHierarchicalEntry('financial_natures'));

router.post('/cost-centers', createHierarchicalEntry('financial_cost_centers'));
router.get('/cost-centers/:contextId', getHierarchicalEntries('financial_cost_centers')); 
router.delete('/cost-centers/:id', deleteHierarchicalEntry('financial_cost_centers'));


// --- ROTAS PARA LANÇAMENTOS FINANCEIROS MULTI-TENANT ---

const createEntry = (collectionName) => async (req, res) => {
    const estId = req.body.establishmentId || req.user.establishmentId;
    const { description, amount, dueDate, naturezaId, centroDeCustoId, notes, status, paymentDate, installments } = req.body;
    
    if (!description || amount === undefined || !dueDate) {
        return res.status(400).json({ message: 'Descrição, valor e data de vencimento são obrigatórios.' });
    }

    try {
        const estDoc = await req.db.collection('establishments').doc(estId).get();
        const groupId = estDoc.exists ? estDoc.data().groupId : null;
        const companyId = estDoc.exists ? estDoc.data().companyId : null;

        const batch = req.db.batch();
        const installmentCount = installments && installments > 1 ? installments : 1;

        if (installmentCount > 1) {
            const installmentValue = parseFloat((amount / installmentCount).toFixed(2));
            let totalButLast = installmentValue * (installmentCount - 1);

            for (let i = 1; i <= installmentCount; i++) {
                const currentInstallmentValue = (i === installmentCount) ? amount - totalButLast : installmentValue;
                const newDueDate = new Date(dueDate);
                newDueDate.setMonth(newDueDate.getMonth() + (i - 1));
                const dueDateString = newDueDate.toISOString().split('T')[0];
                
                const docRef = req.db.collection(collectionName).doc();
                batch.set(docRef, {
                    establishmentId: estId, groupId, companyId,
                    description: `${description} (Parcela ${i}/${installmentCount})`,
                    amount: currentInstallmentValue, dueDate: dueDateString,
                    naturezaId: naturezaId || null, centroDeCustoId: centroDeCustoId || null,
                    notes: notes || null, status: 'pending', paymentDate: null,
                    createdAt: admin.firestore.FieldValue.serverTimestamp()
                });
            }
        } else {
            const newEntry = {
                establishmentId: estId, groupId, companyId,
                description, amount: Number(amount), dueDate,
                naturezaId: naturezaId || null, centroDeCustoId: centroDeCustoId || null,
                notes: notes || null, status: status || 'pending',
                paymentDate: status === 'paid' ? paymentDate : null,
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            };
            const docRef = req.db.collection(collectionName).doc();
            batch.set(docRef, newEntry);
        }

        await batch.commit();
        res.status(201).json({ message: 'Lançamento(s) criado(s) com sucesso.' });
    } catch (error) {
        handleFirestoreError(res, error, 'lançamentos');
    }
};

const getEntries = (collectionName) => async (req, res) => {
    const { startDate, endDate, natureId, costCenterId } = req.query; 
    const contextId = req.query.contextId || req.user.establishmentId;
    const contextType = req.query.contextType || 'BRANCH';
    const db = req.db;
    
    let entries = [];
    let previousBalance = 0; 

    try {
        // --- 1. Calcular Saldo Anterior com Aggregation Otimizada ---
        if (startDate) {
            let paidQuery = db.collection(collectionName)
                .where('status', '==', 'paid')
                .where('paymentDate', '<', startDate); 

            if (contextType === 'GROUP') paidQuery = paidQuery.where('groupId', '==', contextId);
            else if (contextType === 'COMPANY') paidQuery = paidQuery.where('companyId', '==', contextId);
            else paidQuery = paidQuery.where('establishmentId', '==', contextId);

            const aggregateSnapshot = await paidQuery.aggregate({ totalAmount: AggregateField.sum('amount') }).get();
            previousBalance = aggregateSnapshot.data().totalAmount || 0;
        }

        // --- 2. Buscar Lançamentos ---
        let query = db.collection(collectionName).orderBy('dueDate', 'asc'); 

        if (contextType === 'GROUP') query = query.where('groupId', '==', contextId);
        else if (contextType === 'COMPANY') query = query.where('companyId', '==', contextId);
        else query = query.where('establishmentId', '==', contextId);

        if (startDate && endDate) {
            query = query.where('dueDate', '>=', startDate).where('dueDate', '<=', endDate);
        }
        
        const snapshot = await query.get();
        let fetchedEntries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // --- 3. Filtrar em Memória ---
        entries = fetchedEntries.filter(entry => {
            let passNature = true;
            let passCostCenter = true;
            if (natureId && natureId !== 'all') passNature = entry.naturezaId === natureId;
            if (costCenterId && costCenterId !== 'all') passCostCenter = entry.centroDeCustoId === costCenterId;
            return passNature && passCostCenter;
        });
        
        res.status(200).json({ entries, previousBalance });
    } catch (error) {
        handleFirestoreError(res, error, 'listar lançamentos multi-tenant');
    }
};

const updateEntry = (collectionName) => async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const docRef = req.db.collection(collectionName).doc(id);
        await docRef.update({ ...data, amount: Number(data.amount) });
        res.status(200).json({ message: 'Lançamento atualizado com sucesso.' });
    } catch (error) { handleFirestoreError(res, error, 'atualizar lançamentos'); }
};

const deleteEntry = (collectionName) => async (req, res) => {
    const { id } = req.params;
    try {
        await req.db.collection(collectionName).doc(id).delete();
        res.status(200).json({ message: 'Lançamento excluído com sucesso.' });
    } catch (error) { handleFirestoreError(res, error, 'deletar lançamentos'); }
};

const markAsPaid = (collectionName) => async (req, res) => {
    const { id } = req.params;
    const { paymentDate } = req.body;
    if (!paymentDate) return res.status(400).json({ message: 'A data de pagamento é obrigatória.' });
    try {
        await req.db.collection(collectionName).doc(id).update({ status: 'paid', paymentDate });
        res.status(200).json({ message: 'Lançamento marcado como pago.' });
    } catch (error) { handleFirestoreError(res, error, 'marcar pago'); }
};

router.post('/receivables', createEntry('financial_receivables'));
router.get('/receivables', getEntries('financial_receivables'));
router.put('/receivables/:id', updateEntry('financial_receivables'));
router.delete('/receivables/:id', deleteEntry('financial_receivables'));
router.patch('/receivables/:id/status', markAsPaid('financial_receivables'));

router.post('/payables', createEntry('financial_payables'));
router.get('/payables', getEntries('financial_payables'));
router.put('/payables/:id', updateEntry('financial_payables'));
router.delete('/payables/:id', deleteEntry('financial_payables'));
router.patch('/payables/:id/status', markAsPaid('financial_payables'));

// --- Rota para Fluxo de Caixa (Dashboard) ---
router.get('/cash-flow', async (req, res) => {
    const { startDate, endDate, contextId, contextType = 'BRANCH' } = req.query;
    const resolvedContextId = contextId || req.user.establishmentId;

    if (!startDate || !endDate) return res.status(400).json({ message: 'Datas são obrigatórias.' });

    try {
        const db = req.db;
        const start = new Date(startDate);
        const end = new Date(endDate + 'T23:59:59.999Z');

        let payQuery = db.collection('financial_payables').where('dueDate', '>=', startDate).where('dueDate', '<=', endDate);
        let recQuery = db.collection('financial_receivables').where('dueDate', '>=', startDate).where('dueDate', '<=', endDate);

        if (contextType === 'GROUP') {
            payQuery = payQuery.where('groupId', '==', resolvedContextId);
            recQuery = recQuery.where('groupId', '==', resolvedContextId);
        } else if (contextType === 'COMPANY') {
            payQuery = payQuery.where('companyId', '==', resolvedContextId);
            recQuery = recQuery.where('companyId', '==', resolvedContextId);
        } else {
            payQuery = payQuery.where('establishmentId', '==', resolvedContextId);
            recQuery = recQuery.where('establishmentId', '==', resolvedContextId);
        }

        const [payablesSnapshot, receivablesSnapshot] = await Promise.all([
            payQuery.orderBy('dueDate', 'asc').get(),
            recQuery.orderBy('dueDate', 'asc').get(),
        ]);

        const financialData = [];
        payablesSnapshot.docs.forEach(doc => {
            const data = doc.data();
            financialData.push({ type: 'payable', date: data.dueDate, amount: data.amount, status: data.status, paymentDate: data.paymentDate || null });
        });
        receivablesSnapshot.docs.forEach(doc => {
            const data = doc.data();
            financialData.push({ type: 'receivable', date: data.dueDate, amount: data.amount, status: data.status, paymentDate: data.paymentDate || null });
        });

        financialData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        // --- CALCULAR SALDO INICIAL ---
        let initialBalance = 0;
        let pastPayQuery = db.collection('financial_payables').where('status', '==', 'paid').where('paymentDate', '<', startDate);
        let pastRecQuery = db.collection('financial_receivables').where('status', '==', 'paid').where('paymentDate', '<', startDate);

        if (contextType === 'GROUP') {
            pastPayQuery = pastPayQuery.where('groupId', '==', resolvedContextId);
            pastRecQuery = pastRecQuery.where('groupId', '==', resolvedContextId);
        } else if (contextType === 'COMPANY') {
            pastPayQuery = pastPayQuery.where('companyId', '==', resolvedContextId);
            pastRecQuery = pastRecQuery.where('companyId', '==', resolvedContextId);
        } else {
            pastPayQuery = pastPayQuery.where('establishmentId', '==', resolvedContextId);
            pastRecQuery = pastRecQuery.where('establishmentId', '==', resolvedContextId);
        }

        const [payablesAgg, receivablesAgg] = await Promise.all([
            pastPayQuery.aggregate({ total: AggregateField.sum('amount') }).get(),
            pastRecQuery.aggregate({ total: AggregateField.sum('amount') }).get()
        ]);

        initialBalance = (receivablesAgg.data().total || 0) - (payablesAgg.data().total || 0);

        const dailySummary = {};
        let currentBalance = initialBalance;
        const dates = [];
        let currentDate = new Date(start);
        
        while (currentDate <= end) {
            const dateString = currentDate.toISOString().split('T')[0];
            dates.push(dateString);
            dailySummary[dateString] = { receivables: 0, payables: 0, expectedBalance: 0 };
            currentDate.setDate(currentDate.getDate() + 1);
        }

        financialData.forEach(entry => {
            const dateKey = entry.status === 'paid' && entry.paymentDate ? entry.paymentDate : entry.date; 
            if (dailySummary[dateKey]) {
                if (entry.type === 'receivable') dailySummary[dateKey].receivables += entry.amount;
                else dailySummary[dateKey].payables += entry.amount;
            }
        });

        const chartData = { labels: [], receivables: [], payables: [], expectedBalance: [], initialBalance };

        dates.forEach(dateString => {
            chartData.labels.push(new Date(dateString).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }));
            const summary = dailySummary[dateString] || { receivables: 0, payables: 0 };
            
            chartData.receivables.push(summary.receivables);
            chartData.payables.push(summary.payables);
            currentBalance += (summary.receivables - summary.payables);
            chartData.expectedBalance.push(currentBalance);
        });

        res.status(200).json(chartData);

    } catch (error) {
        handleFirestoreError(res, error, 'cash-flow calculation');
    }
});

// ROTA PARA O RESUMO DO DIA
router.get('/today-summary/:contextId', async (req, res) => {
    const { contextId } = req.params;
    const { contextType = 'BRANCH' } = req.query;
    const { db } = req;
    const today = new Date().toISOString().split('T')[0];

    try {
        let payQuery = db.collection('financial_payables').where('dueDate', '==', today);
        let recQuery = db.collection('financial_receivables').where('dueDate', '==', today);

        if (contextType === 'GROUP') {
            payQuery = payQuery.where('groupId', '==', contextId);
            recQuery = recQuery.where('groupId', '==', contextId);
        } else if (contextType === 'COMPANY') {
            payQuery = payQuery.where('companyId', '==', contextId);
            recQuery = recQuery.where('companyId', '==', contextId);
        } else {
            payQuery = payQuery.where('establishmentId', '==', contextId);
            recQuery = recQuery.where('establishmentId', '==', contextId);
        }

        const [payablesSnapshot, receivablesSnapshot] = await Promise.all([payQuery.get(), recQuery.get()]);

        const totalPayables = payablesSnapshot.docs
            .filter(doc => doc.data().status === 'pending')
            .reduce((sum, doc) => sum + doc.data().amount, 0);
            
        const totalReceivables = receivablesSnapshot.docs
            .filter(doc => doc.data().status === 'pending')
            .reduce((sum, doc) => sum + doc.data().amount, 0);

        res.status(200).json({ totalPayables, totalReceivables });
    } catch (error) {
        handleFirestoreError(res, error, 'today summary');
    }
});

module.exports = router;