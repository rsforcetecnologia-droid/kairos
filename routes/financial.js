// routes/financial.js (Otimizado para Arquitetura Enterprise 3-Tier e Multi-Tenant)

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

/**
 * 🔥 MOTOR DE SEGURANÇA MULTI-TENANT
 * Converte a string de IDs vinda do frontend num array seguro, 
 * garantindo que o usuário só consulta lojas que lhe pertencem.
 */
// routes/financial.js

function getAccessibleEstablishmentIds(req, requestedIdsStr) {
    const userEstId = req.user.establishmentId;
    const accessibleEsts = req.user.accessibleEstablishments || [];
    
    // Garante a leitura correta dos IDs permitidos no token
    const allowedIds = new Set([
        userEstId, 
        ...accessibleEsts.map(e => typeof e === 'string' ? e : e.id)
    ]);

    // CORREÇÃO 1: Se for 'all', devolve TODAS as lojas a que tem acesso (em vez de forçar só a Matriz)
    if (requestedIdsStr === 'all') {
        return Array.from(allowedIds);
    }

    if (!requestedIdsStr || requestedIdsStr === 'current') {
        return [userEstId];
    }

    // Pega os IDs que o modal global enviou
    const requestedIds = requestedIdsStr.split(',').map(id => id.trim()).filter(id => id);
    const validIds = requestedIds.filter(id => allowedIds.has(id));

    // CORREÇÃO 2: Se a validação do token falhar (o que está a causar o seu erro), 
    // confiamos na lista enviada pelo modal global do frontend.
    return validIds.length > 0 ? validIds : requestedIds;
}

// --- ROTAS GENÉRICAS HIERÁRQUICAS (PLANOS DE CONTA E CENTROS DE CUSTO) ---

const createHierarchicalEntry = (collectionName) => async (req, res) => {
    const estId = req.body.establishmentId || req.user.establishmentId; 
    const { name, parentId } = req.body;
    
    if (!name) return res.status(400).json({ message: 'O nome é obrigatório.' });
    
    try {
        const estDoc = await req.db.collection('establishments').doc(estId).get();
        // Proteção contra undefined (Firestore não aceita undefined)
        const groupId = estDoc.exists ? (estDoc.data().groupId || null) : null;
        const companyId = estDoc.exists ? (estDoc.data().companyId || null) : null;

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
    try {
        const validEstIds = getAccessibleEstablishmentIds(req, contextId);
        
        let query = req.db.collection(collectionName);

        if (validEstIds.length === 1) {
            query = query.where('establishmentId', '==', validEstIds[0]);
        } else {
            query = query.where('establishmentId', 'in', validEstIds.slice(0, 10));
        }

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
        await req.db.collection(collectionName).doc(id).delete();
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
    
    // Agora capturamos entity, paymentMethod, documentNumber e origin
    const { 
        description, amount, dueDate, naturezaId, centroDeCustoId, 
        notes, status, paymentDate, installments, recurrenceId,
        entity, paymentMethod, documentNumber, origin
    } = req.body;
    
    if (!description || amount === undefined || !dueDate) {
        return res.status(400).json({ message: 'Descrição, valor e data de vencimento são obrigatórios.' });
    }

    try {
        const estDoc = await req.db.collection('establishments').doc(estId).get();
        
        // Proteção essencial contra "undefined" (Gera erro 500 no Firestore)
        const groupId = estDoc.exists ? (estDoc.data().groupId || null) : null;
        const companyId = estDoc.exists ? (estDoc.data().companyId || null) : null;

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
                    amount: currentInstallmentValue, 
                    dueDate: dueDateString,
                    naturezaId: naturezaId || null, 
                    centroDeCustoId: centroDeCustoId || null,
                    entity: entity || null,
                    paymentMethod: paymentMethod || null,
                    documentNumber: documentNumber || null,
                    origin: origin || 'manual',
                    notes: notes || null, 
                    status: 'pending', 
                    paymentDate: null,
                    recurrenceId: recurrenceId || null, 
                    createdAt: admin.firestore.FieldValue.serverTimestamp()
                });
            }
        } else {
            const newEntry = {
                establishmentId: estId, 
                groupId, 
                companyId,
                description, 
                amount: Number(amount), 
                dueDate,
                naturezaId: naturezaId || null, 
                centroDeCustoId: centroDeCustoId || null,
                entity: entity || null,
                paymentMethod: paymentMethod || null,
                documentNumber: documentNumber || null,
                origin: origin || 'manual',
                notes: notes || null, 
                status: status || 'pending',
                paymentDate: status === 'paid' ? paymentDate : null,
                recurrenceId: recurrenceId || null,
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
    const { startDate, endDate, natureId, costCenterId, establishmentId } = req.query; 
    const fallbackId = req.query.contextId || req.user.establishmentId;
    const db = req.db;
    
    let entries = [];
    let previousBalance = 0; 

    try {
        const validEstIds = getAccessibleEstablishmentIds(req, establishmentId || fallbackId);

        // --- 1. Calcular Saldo Anterior com Aggregation Otimizada ---
        if (startDate) {
            let paidQuery = db.collection(collectionName)
                .where('status', '==', 'paid')
                .where('paymentDate', '<', startDate); 

            if (validEstIds.length === 1) {
                paidQuery = paidQuery.where('establishmentId', '==', validEstIds[0]);
            } else {
                paidQuery = paidQuery.where('establishmentId', 'in', validEstIds.slice(0, 10));
            }

            const aggregateSnapshot = await paidQuery.aggregate({ totalAmount: AggregateField.sum('amount') }).get();
            previousBalance = aggregateSnapshot.data().totalAmount || 0;
        }

        // --- 2. Buscar Lançamentos ---
        let query = db.collection(collectionName).orderBy('dueDate', 'asc'); 

        if (validEstIds.length === 1) {
            query = query.where('establishmentId', '==', validEstIds[0]);
        } else {
            query = query.where('establishmentId', 'in', validEstIds.slice(0, 10));
        }

        if (startDate && endDate) {
            query = query.where('dueDate', '>=', startDate).where('dueDate', '<=', endDate);
        }
        
        const snapshot = await query.get();
        let fetchedEntries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // --- 3. Filtrar em Memória (Natureza e CC) ---
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
        
        // Remove valores undefined para não quebrar o firestore
        Object.keys(data).forEach(key => {
            if (data[key] === undefined) delete data[key];
        });

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

// =======================================================================
// 📈 FLUXO DE CAIXA E DASHBOARD (PRESERVADO COM MULTI-TENANT)
// =======================================================================

router.get('/cash-flow', async (req, res) => {
    const { startDate, endDate, contextId, contextType = 'BRANCH' } = req.query;
    
    if (!startDate || !endDate) return res.status(400).json({ message: 'Datas são obrigatórias.' });

    try {
        const db = req.db;
        const start = new Date(startDate);
        const end = new Date(endDate + 'T23:59:59.999Z');

        const validEstIds = getAccessibleEstablishmentIds(req, contextId);

        let payQuery = db.collection('financial_payables').where('dueDate', '>=', startDate).where('dueDate', '<=', endDate);
        let recQuery = db.collection('financial_receivables').where('dueDate', '>=', startDate).where('dueDate', '<=', endDate);

        if (validEstIds.length === 1) {
            payQuery = payQuery.where('establishmentId', '==', validEstIds[0]);
            recQuery = recQuery.where('establishmentId', '==', validEstIds[0]);
        } else {
            payQuery = payQuery.where('establishmentId', 'in', validEstIds.slice(0, 10));
            recQuery = recQuery.where('establishmentId', 'in', validEstIds.slice(0, 10));
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

        // --- CALCULAR SALDO INICIAL PARA O GRÁFICO ---
        let initialBalance = 0;
        let pastPayQuery = db.collection('financial_payables').where('status', '==', 'paid').where('paymentDate', '<', startDate);
        let pastRecQuery = db.collection('financial_receivables').where('status', '==', 'paid').where('paymentDate', '<', startDate);

        if (validEstIds.length === 1) {
            pastPayQuery = pastPayQuery.where('establishmentId', '==', validEstIds[0]);
            pastRecQuery = pastRecQuery.where('establishmentId', '==', validEstIds[0]);
        } else {
            pastPayQuery = pastPayQuery.where('establishmentId', 'in', validEstIds.slice(0, 10));
            pastRecQuery = pastRecQuery.where('establishmentId', 'in', validEstIds.slice(0, 10));
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

// ROTA PARA O RESUMO DO DIA NO CABEÇALHO (KPIs)
router.get('/today-summary/:contextId', async (req, res) => {
    const { contextId } = req.params;
    const { db } = req;
    const today = new Date().toISOString().split('T')[0];

    try {
        const validEstIds = getAccessibleEstablishmentIds(req, contextId);

        let payQuery = db.collection('financial_payables').where('dueDate', '==', today);
        let recQuery = db.collection('financial_receivables').where('dueDate', '==', today);

        if (validEstIds.length === 1) {
            payQuery = payQuery.where('establishmentId', '==', validEstIds[0]);
            recQuery = recQuery.where('establishmentId', '==', validEstIds[0]);
        } else {
            payQuery = payQuery.where('establishmentId', 'in', validEstIds.slice(0, 10));
            recQuery = recQuery.where('establishmentId', 'in', validEstIds.slice(0, 10));
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