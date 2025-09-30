const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, hasAccess } = require('../middlewares/auth');

// Middleware para garantir que apenas utilizadores autorizados tenham acesso
router.use(verifyToken, hasAccess);

// --- FUNÇÃO AUXILIAR PARA TRATAR ERROS DE ÍNDICE ---
function handleFirestoreError(res, error, context) {
    console.error(`Erro em ${context}:`, error);
    if (error.message && error.message.includes('requires an index')) {
        const detailedMessage = `O Firestore precisa de um índice para a busca de ${context}. Verifique o log do seu servidor (consola do Replit) para encontrar um link para criar o índice automaticamente. A mensagem de erro no log irá guiá-lo.`;
        return res.status(500).json({ message: detailedMessage });
    }
    res.status(500).json({ message: `Ocorreu um erro no servidor ao processar ${context}.` });
}

// --- ROTAS GENÉRICAS PARA ESTRUTURAS HIERÁRQUICAS (NATUREZAS E CENTROS DE CUSTO) ---

const createHierarchicalEntry = (collectionName) => async (req, res) => {
    const { establishmentId } = req.user;
    const { name, parentId } = req.body;
    if (!name) return res.status(400).json({ message: 'O nome é obrigatório.' });
    try {
        const newEntry = { establishmentId, name, parentId: parentId || null, createdAt: admin.firestore.FieldValue.serverTimestamp() };
        const docRef = await req.db.collection(collectionName).add(newEntry);
        res.status(201).json({ message: 'Item criado com sucesso!', id: docRef.id, ...newEntry });
    } catch (error) {
        handleFirestoreError(res, error, collectionName);
    }
};

const getHierarchicalEntries = (collectionName) => async (req, res) => {
    const { establishmentId } = req.user;
    try {
        const snapshot = await req.db.collection(collectionName)
            .where('establishmentId', '==', establishmentId)
            .orderBy('name')
            .get();
        const entries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(entries);
    } catch (error) {
        handleFirestoreError(res, error, collectionName);
    }
};

const deleteHierarchicalEntry = (collectionName) => async (req, res) => {
    const { id } = req.params;
    const { establishmentId } = req.user;
    try {
        const docRef = req.db.collection(collectionName).doc(id);
        const doc = await docRef.get();
        if (!doc.exists || doc.data().establishmentId !== establishmentId) {
            return res.status(403).json({ message: 'Acesso negado ou item não encontrado.' });
        }
        await docRef.delete();
        res.status(200).json({ message: 'Item excluído com sucesso.' });
    } catch (error) {
        handleFirestoreError(res, error, collectionName);
    }
};


// --- ROTAS ESPECÍFICAS ---
router.post('/natures', createHierarchicalEntry('financial_natures'));
router.get('/natures', getHierarchicalEntries('financial_natures'));
router.delete('/natures/:id', deleteHierarchicalEntry('financial_natures'));

router.post('/cost-centers', createHierarchicalEntry('financial_cost_centers'));
router.get('/cost-centers', getHierarchicalEntries('financial_cost_centers'));
router.delete('/cost-centers/:id', deleteHierarchicalEntry('financial_cost_centers'));


// --- ROTAS PARA LANÇAMENTOS FINANCEIROS ---

const createEntry = (collectionName) => async (req, res) => {
    const { establishmentId } = req.user;
    const { description, amount, dueDate, naturezaId, centroDeCustoId, notes, status, paymentDate, installments } = req.body;
    if (!description || amount === undefined || !dueDate) {
        return res.status(400).json({ message: 'Descrição, valor e data de vencimento são obrigatórios.' });
    }

    try {
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
                
                const installmentDescription = `${description} (Parcela ${i}/${installmentCount})`;
                const docRef = req.db.collection(collectionName).doc();

                batch.set(docRef, {
                    establishmentId,
                    description: installmentDescription,
                    amount: currentInstallmentValue,
                    dueDate: dueDateString,
                    naturezaId: naturezaId || null,
                    centroDeCustoId: centroDeCustoId || null,
                    notes: notes || null,
                    status: 'pending', // Parcelamentos são sempre pendentes
                    paymentDate: null,
                    createdAt: admin.firestore.FieldValue.serverTimestamp()
                });
            }
        } else {
            // Lançamento único
            const newEntry = {
                establishmentId,
                description,
                amount: Number(amount),
                dueDate,
                naturezaId: naturezaId || null,
                centroDeCustoId: centroDeCustoId || null,
                notes: notes || null,
                status: status || 'pending',
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

// ATUALIZADO: Lógica de filtro que busca todos os lançamentos do período e filtra em memória (para Natureza/C.Custo)
const getEntries = (collectionName) => async (req, res) => {
    const { establishmentId } = req.user;
    // Captura os filtros de data, natureza e centro de custo
    const { startDate, endDate, natureId, costCenterId } = req.query; 
    const db = req.db;
    
    let entries = [];
    let previousBalance = 0; 

    try {
        // --- 1. Calcular Saldo Anterior (Apenas Lançamentos PAGOS/REALIZADOS antes do startDate) ---
        if (startDate) {
            // Filtra pela data de pagamento anterior ao início do período
            const paidQuery = db.collection(collectionName)
                .where('establishmentId', '==', establishmentId)
                .where('status', '==', 'paid')
                .where('paymentDate', '<', startDate); 

            const paidSnapshot = await paidQuery.get();
            
            paidSnapshot.docs.forEach(doc => {
                const amount = doc.data().amount || 0;
                previousBalance += amount;
            });
        }

        // --- 2. Buscar Lançamentos DENTRO do Período Filtrado (Previstos e Realizados) ---
        // A consulta do Firestore é feita APENAS por data para evitar erros de índice/documentos nulos
        let query = db.collection(collectionName)
            .where('establishmentId', '==', establishmentId)
            .orderBy('dueDate', 'asc'); 

        // Filtro Principal de Data (Vencimento)
        if (startDate && endDate) {
            query = query
                .where('dueDate', '>=', startDate)
                .where('dueDate', '<=', endDate);
        }
        
        const snapshot = await query.get();
        let fetchedEntries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // --- 3. Filtrar em Memória por Natureza e Centro de Custo (para lidar com valores null/ausentes) ---
        entries = fetchedEntries.filter(entry => {
            let passNature = true;
            let passCostCenter = true;

            // Aplica filtro de Natureza se um ID específico foi selecionado
            if (natureId && natureId !== 'all') {
                // Passa se a natureza for exatamente a selecionada
                passNature = entry.naturezaId === natureId;
            }

            // Aplica filtro de Centro de Custo se um ID específico foi selecionado
            if (costCenterId && costCenterId !== 'all') {
                // Passa se o centro de custo for exatamente o selecionado
                passCostCenter = entry.centroDeCustoId === costCenterId;
            }

            return passNature && passCostCenter;
        });
        
        // Retorna a lista de lançamentos filtrados e o saldo anterior
        res.status(200).json({ entries, previousBalance });
    } catch (error) {
        handleFirestoreError(res, error, 'lançamentos com filtro de data');
    }
};

const updateEntry = (collectionName) => async (req, res) => {
    const { id } = req.params;
    const { establishmentId } = req.user;
    const data = req.body;
    try {
        const docRef = req.db.collection(collectionName).doc(id);
        const doc = await docRef.get();
        if (!doc.exists || doc.data().establishmentId !== establishmentId) {
            return res.status(403).json({ message: 'Acesso negado ou lançamento não encontrado.' });
        }
        await docRef.update({ ...data, amount: Number(data.amount) });
        res.status(200).json({ message: 'Lançamento atualizado com sucesso.' });
    } catch (error) {
        handleFirestoreError(res, error, 'lançamentos');
    }
};

const deleteEntry = (collectionName) => async (req, res) => {
    const { id } = req.params;
    const { establishmentId } = req.user;
    try {
        const docRef = req.db.collection(collectionName).doc(id);
        const doc = await docRef.get();
        if (!doc.exists || doc.data().establishmentId !== establishmentId) {
            return res.status(403).json({ message: 'Acesso negado ou lançamento não encontrado.' });
        }
        await docRef.delete();
        res.status(200).json({ message: 'Lançamento excluído com sucesso.' });
    } catch (error) {
        handleFirestoreError(res, error, 'lançamentos');
    }
};

const markAsPaid = (collectionName) => async (req, res) => {
    const { id } = req.params;
    const { establishmentId } = req.user;
    const { paymentDate } = req.body;
    if (!paymentDate) {
        return res.status(400).json({ message: 'A data de pagamento é obrigatória.' });
    }
    try {
        const docRef = req.db.collection(collectionName).doc(id);
        const doc = await docRef.get();
        if (!doc.exists || doc.data().establishmentId !== establishmentId) {
            return res.status(403).json({ message: 'Acesso negado ou lançamento não encontrado.' });
        }
        await docRef.update({ status: 'paid', paymentDate });
        res.status(200).json({ message: 'Lançamento marcado como pago.' });
    } catch (error) {
        handleFirestoreError(res, error, 'lançamentos');
    }
};

// --- ROTAS PARA CONTAS A RECEBER (RECEIVABLES) ---
router.post('/receivables', createEntry('financial_receivables'));
router.get('/receivables', getEntries('financial_receivables'));
router.put('/receivables/:id', updateEntry('financial_receivables'));
router.delete('/receivables/:id', deleteEntry('financial_receivables'));
router.patch('/receivables/:id/status', markAsPaid('financial_receivables'));

// --- ROTAS PARA CONTAS A PAGAR (PAYABLES) ---
router.post('/payables', createEntry('financial_payables'));
router.get('/payables', getEntries('financial_payables'));
router.put('/payables/:id', updateEntry('financial_payables'));
router.delete('/payables/:id', deleteEntry('financial_payables'));
router.patch('/payables/:id/status', markAsPaid('financial_payables'));

// --- Rota para Fluxo de Caixa (Dashboard) ---
router.get('/cash-flow', async (req, res) => {
    const { establishmentId } = req.user;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'startDate e endDate são obrigatórios para o fluxo de caixa.' });
    }

    try {
        const db = req.db;
        const start = new Date(startDate);
        const end = new Date(endDate + 'T23:59:59.999Z');

        // AQUI ESTÁ O BUG DE ÍNDICE MENCIONADO NOS COMENTÁRIOS, QUE O FIREBASE PRECISA.
        const [payablesSnapshot, receivablesSnapshot] = await Promise.all([
            db.collection('financial_payables')
                .where('establishmentId', '==', establishmentId)
                .where('dueDate', '>=', startDate)
                .where('dueDate', '<=', endDate)
                .orderBy('dueDate', 'asc')
                .get(),
            db.collection('financial_receivables')
                .where('establishmentId', '==', establishmentId)
                .where('dueDate', '>=', startDate)
                .where('dueDate', '<=', endDate)
                .orderBy('dueDate', 'asc')
                .get(),
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

        // --- CALCULAR SALDO INICIAL ANTES DO PERÍODO ---
        let initialBalance = 0;

        // Query para pagamentos realizados ANTES da data de início do gráfico
        const previousPayablesSnapshot = await db.collection('financial_payables')
            .where('establishmentId', '==', establishmentId)
            .where('status', '==', 'paid')
            .where('paymentDate', '<', startDate)
            .get();
            
        // Query para recebíveis realizados ANTES da data de início do gráfico
        const previousReceivablesSnapshot = await db.collection('financial_receivables')
            .where('establishmentId', '==', establishmentId)
            .where('status', '==', 'paid')
            .where('paymentDate', '<', startDate)
            .get();
        
        previousPayablesSnapshot.docs.forEach(doc => { initialBalance -= doc.data().amount; });
        previousReceivablesSnapshot.docs.forEach(doc => { initialBalance += doc.data().amount; });
        // --- FIM CALCULAR SALDO INICIAL ---

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

        // Distribui os lançamentos pela data de vencimento (ou pagamento se pago)
        financialData.forEach(entry => {
            const dateKey = entry.status === 'paid' && entry.paymentDate ? entry.paymentDate : entry.date; 
            if (dailySummary[dateKey]) {
                if (entry.type === 'receivable') {
                    dailySummary[dateKey].receivables += entry.amount;
                } else {
                    dailySummary[dateKey].payables += entry.amount;
                }
            }
        });

        const chartData = {
            labels: [],
            receivables: [],
            payables: [],
            expectedBalance: [],
            initialBalance: initialBalance
        };

        dates.forEach(dateString => {
            chartData.labels.push(new Date(dateString).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })); // Formato DD/MM
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
router.get('/today-summary', async (req, res) => {
    const { establishmentId } = req.user;
    const { db } = req;
    const today = new Date().toISOString().split('T')[0];

    try {
        // CORREÇÃO: Busca todos com vencimento hoje e filtra o status na aplicação
        const payablesQuery = await db.collection('financial_payables')
            .where('establishmentId', '==', establishmentId)
            .where('dueDate', '==', today)
            .get();

        const receivablesQuery = await db.collection('financial_receivables')
            .where('establishmentId', '==', establishmentId)
            .where('dueDate', '==', today)
            .get();

        const [payablesSnapshot, receivablesSnapshot] = await Promise.all([payablesQuery, receivablesQuery]);

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