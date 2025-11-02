// routes/financial.js
// (MODIFICADO: 'createEntry' cria 2 lançamentos se 'isRecurring' for 'true')
// (MODIFICADO: Adicionados logs de depuração em 'createEntry')

const express = require('express');
const router = express.Router();
const { addMonths, format, startOfMonth, endOfMonth, parseISO, isBefore, addWeeks, addDays } = require('date-fns');

// --- ROTAS (Naturezas e Centros de Custo) ---
// (Sem alterações)
const setupHierarchyRoutes = (collectionName) => {
    const hierarchyRouter = express.Router();
    
    // GET /
    hierarchyRouter.get('/', async (req, res) => {
        try {
            const { db } = req; 
            const { establishmentId } = req.user;
            const collectionRef = db.collection(collectionName);
            
            const snapshot = await collectionRef.where('establishmentId', '==', establishmentId).orderBy('name').get();
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            res.status(200).json(items);
        } catch (error) {
            console.error(`Erro ao buscar ${collectionName}:`, error);
            res.status(500).json({ message: 'Erro ao buscar dados.' });
        }
    });

    // POST /
    hierarchyRouter.post('/', async (req, res) => {
        try {
            const { db } = req; 
            const { establishmentId } = req.user;
            const { name, parentId } = req.body;
            if (!name) {
                return res.status(400).json({ message: 'O nome é obrigatório.' });
            }
            const newItem = {
                name,
                parentId: parentId || null,
                establishmentId,
                createdAt: new Date()
            };
            const docRef = await db.collection(collectionName).add(newItem);
            res.status(201).json({ id: docRef.id, ...newItem });
        } catch (error) {
            console.error(`Erro ao criar ${collectionName}:`, error);
            res.status(500).json({ message: 'Erro ao criar item.' });
        }
    });

    // DELETE /:id
    hierarchyRouter.delete('/:id', async (req, res) => {
         try {
            const { db } = req; 
            const { establishmentId } = req.user;
            const { id } = req.params;
            const collectionRef = db.collection(collectionName);
            
            const docRef = collectionRef.doc(id);
            const doc = await docRef.get();

            if (!doc.exists || doc.data().establishmentId !== establishmentId) {
                return res.status(403).json({ message: 'Acesso negado ou item não encontrado.' });
            }

            const batch = db.batch();
            const childrenSnapshot = await collectionRef.where('establishmentId', '==', establishmentId).where('parentId', '==', id).get();
            childrenSnapshot.forEach(childDoc => {
                batch.delete(childDoc.ref);
            });
            
            batch.delete(docRef); 
            await batch.commit();
            
            res.status(200).json({ message: 'Item e sub-itens excluídos com sucesso.' });
        } catch (error) {
            console.error(`Erro ao excluir ${collectionName}:`, error);
            res.status(500).json({ message: 'Erro ao excluir item.' });
        }
    });

    return hierarchyRouter;
};

router.use('/natures', setupHierarchyRoutes('financialNatures'));
router.use('/cost-centers', setupHierarchyRoutes('financialCostCenters'));


// --- CONTAS A PAGAR / RECEBER ---

// ==================================================================
// === AQUI ESTÁ A LÓGICA ALTERADA (createEntry) ===
// ==================================================================
const createEntry = async (req, res, collectionName) => {
    try {
        const { db } = req; 
        const { establishmentId } = req.user;
        const data = req.body;

        // --- LOG DE DEBUG PARA O TESTE ---
        console.log("\n[createEntry] DADOS RECEBIDOS DO FRONTEND:", JSON.stringify(data, null, 2));

        data.establishmentId = establishmentId;
        data.createdAt = new Date();

        if (!data.description || !data.amount || !data.dueDate) {
            return res.status(400).json({ message: 'Descrição, Valor e Data de Vencimento são obrigatórios.' });
        }
        
        const collectionRef = db.collection(collectionName);
        const batch = db.batch();

        const installments = data.installments ? parseInt(data.installments, 10) : 1;
        const isRecurring = data.isRecurring === true;
        
        // --- LOG DE DEBUG PARA O TESTE ---
        console.log("[createEntry] A flag 'isRecurring' foi lida como:", isRecurring);
        
        const totalAmount = parseFloat(data.amount);

        // --- 1. LANÇAMENTO FIXO (RECORRENTE) ---
        if (isRecurring) {
            
            console.log("[createEntry] SUCESSO: 'isRecurring' é true. A criar dois lançamentos.");
            
            // Este é o ID que vai ligar todos os lançamentos recorrentes
            const groupId = collectionRef.doc().id; 

            // --- LANÇAMENTO 1 (MÊS ATUAL) ---
            const newDocRef = collectionRef.doc(groupId); // Usamos o ID do grupo como ID do primeiro doc
            const entryData = {
                ...data,
                amount: totalAmount, 
                isRecurring: true, 
                recurringFrequency: 'monthly',
                recurringGroupId: groupId, // Define o ID do grupo
                installments: 1, 
            };
            
            // Se o utilizador não marcou como 'pago' na criação, força 'pendente'
            if (entryData.status !== 'paid') {
                 entryData.status = 'pending';
                 entryData.paymentDate = null;
            }
            
            batch.set(newDocRef, entryData);
            
            // --- LANÇAMENTO 2 (MÊS DA FRENTE) ---
            // (Esta é a nova lógica do teu teste)
            const nextDueDate = addMonths(parseISO(entryData.dueDate), 1);
            const nextEntryData = {
                ...entryData, // Copia dados (descrição, valor, naturezaId...)
                dueDate: format(nextDueDate, 'yyyy-MM-dd'),
                status: 'pending',     // O próximo é sempre pendente
                paymentDate: null,
                createdAt: new Date(),
                recurringGroupId: groupId, // Mesmo ID de grupo
            };
            delete nextEntryData.id;
            delete nextEntryData.installmentInfo;
            
            const nextDocRef = collectionRef.doc();
            batch.set(nextDocRef, nextEntryData);
            
            
        // --- 2. LANÇAMENTO PARCELADO ---
        } else if (installments > 1) {
            console.log("[createEntry] AVISO: 'isRecurring' é false. A criar lançamento parcelado.");
            const installmentAmount = (totalAmount / installments);
            const originalDueDate = parseISO(data.dueDate);
            const frequency = data.frequency || 'monthly';
            const groupId = collectionRef.doc().id; 

            for (let i = 0; i < installments; i++) {
                let nextDueDate;
                if (frequency === 'weekly') {
                    nextDueDate = addWeeks(originalDueDate, i);
                } else if (frequency === 'daily') {
                    nextDueDate = addDays(originalDueDate, i);
                } else {
                    nextDueDate = addMonths(originalDueDate, i); 
                }

                const newDocRef = collectionRef.doc();
                const installmentData = {
                    ...data,
                    amount: installmentAmount,
                    dueDate: format(nextDueDate, 'yyyy-MM-dd'),
                    description: `${data.description} (${i + 1}/${installments})`,
                    installmentInfo: {
                        current: i + 1,
                        total: installments,
                        groupId: groupId
                    },
                    installments: 1, 
                    isRecurring: false,
                };
                
                if (i === 0 && data.status === 'paid') {
                    installmentData.status = 'paid';
                    installmentData.paymentDate = data.paymentDate;
                } else {
                    installmentData.status = 'pending';
                    installmentData.paymentDate = null;
                }
                
                batch.set(newDocRef, installmentData);
            }
            
        // --- 3. LANÇAMENTO SIMPLES ---
        } else {
            console.log("[createEntry] AVISO: 'isRecurring' é false. A criar um lançamento simples.");
            const newDocRef = collectionRef.doc();
            batch.set(newDocRef, { ...data, amount: totalAmount, installments: 1, isRecurring: false });
        }

        await batch.commit();
        res.status(201).json({ message: 'Lançamento(s) criado(s) com sucesso!' });
        
    } catch (error) {
        console.error(`Erro ao criar ${collectionName}:`, error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
};

// (getEntries, updateEntry, deleteEntry sem alterações)
const getEntries = async (req, res, collectionName) => {
    try {
        const { db } = req; 
        const { establishmentId } = req.user;
        const { startDate, endDate, natureId, costCenterId } = req.query;
        
        const collectionRef = db.collection(collectionName);
        
        let query = collectionRef.where('establishmentId', '==', establishmentId);
        let previousBalanceQuery = collectionRef.where('establishmentId', '==', establishmentId);

        if (startDate) {
            query = query.where('dueDate', '>=', startDate);
            previousBalanceQuery = previousBalanceQuery.where('paymentDate', '<', startDate);
        }
        if (endDate) {
            query = query.where('dueDate', '<=', endDate);
        }
        if (natureId && natureId !== 'all') {
            query = query.where('naturezaId', '==', natureId);
        }
        if (costCenterId && costCenterId !== 'all') {
            query = query.where('centroDeCustoId', '==', costCenterId);
        }

        const snapshot = await query.orderBy('dueDate', 'asc').get();
        const entries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const prevBalanceSnapshot = await previousBalanceQuery.where('status', '==', 'paid').get();
        let previousBalance = 0;
        prevBalanceSnapshot.forEach(doc => {
            previousBalance += doc.data().amount;
        });

        res.status(200).json({ entries, previousBalance });

    } catch (error) {
        console.error(`Erro ao buscar ${collectionName}:`, error);
        res.status(500).json({ message: 'Erro ao buscar dados.' });
    }
};
const updateEntry = async (req, res, collectionName) => {
    try {
        const { db } = req; 
        const { id } = req.params;
        const { establishmentId } = req.user;
        const data = req.body;

        const docRef = db.collection(collectionName).doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Lançamento não encontrado.' });
        }
        if (doc.data().establishmentId !== establishmentId) {
            return res.status(403).json({ message: 'Acesso negado.' });
        }
        
        delete data.isRecurring;
        delete data.recurringGroupId;
        delete data.installmentInfo;
        if (doc.data().recurringGroupId || doc.data().installmentInfo) {
            delete data.amount;
        }

        await docRef.update(data);
        res.status(200).json({ message: 'Lançamento atualizado com sucesso.' });
    } catch (error) {
        console.error(`Erro ao atualizar ${collectionName}:`, error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
};
const deleteEntry = async (req, res, collectionName) => {
    try {
        const { db } = req; 
        const { id } = req.params;
        const { establishmentId } = req.user;

        const docRef = db.collection(collectionName).doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Lançamento não encontrado.' });
        }
        if (doc.data().establishmentId !== establishmentId) {
            return res.status(403).json({ message: 'Acesso negado.' });
        }
        
        const data = doc.data();
        const batch = db.batch();
        
        const recurringGroupId = data.recurringGroupId || (data.isRecurring ? data.id : null);

        if (recurringGroupId) {
            const futureEntriesQuery = await db.collection(collectionName)
                .where('establishmentId', '==', establishmentId)
                .where('recurringGroupId', '==', recurringGroupId)
                .where('status', '==', 'pending')
                .get();

            futureEntriesQuery.forEach(futureDoc => {
                batch.delete(futureDoc.ref);
            });
            
            if (data.status === 'paid') {
                 batch.delete(docRef);
            }
            
        } else {
            batch.delete(docRef);
        }
        
        await batch.commit();
        res.status(200).json({ message: 'Lançamento(s) e recorrência(s) futura(s) excluído(s).' });

    } catch (error) {
        console.error(`Erro ao excluir ${collectionName}:`, error);
        res.status(500).json({ message: 'Erro ao excluir item.' });
    }
};

// (markAsPaid modificado para a lógica original de duplicação APÓS o pagamento)
const markAsPaid = async (req, res, collectionName) => {
     try {
        const { db } = req; 
        const { id } = req.params;
        const { establishmentId } = req.user;
        const { status, paymentDate } = req.body;

        if (status !== 'paid' || !paymentDate) {
            return res.status(400).json({ message: 'Status inválido ou data de pagamento em falta.' });
        }

        const docRef = db.collection(collectionName).doc(id);
        
        await db.runTransaction(async (transaction) => {
            const collectionRef = db.collection(collectionName);
            const doc = await transaction.get(docRef);
            
            if (!doc.exists || doc.data().establishmentId !== establishmentId) {
                throw new Error('Acesso negado ou lançamento não encontrado.');
            }

            const entryData = doc.data();
            
            if (entryData.status === 'paid') {
                return; // Já foi pago, não faz nada
            }

            // 1. Atualiza o documento atual para "pago"
            transaction.update(docRef, {
                status: 'paid',
                paymentDate: paymentDate
            });
            
            // 2. LÓGICA DE RECORRÊNCIA (Apenas se 'isRecurring' ou 'recurringGroupId' estiverem presentes)
            const recurringGroupId = entryData.recurringGroupId || (entryData.isRecurring ? doc.id : null);

            if (recurringGroupId) {
                
                const nextDueDate = addMonths(parseISO(entryData.dueDate), 1); 
                
                const newEntryData = {
                    ...entryData,
                    dueDate: format(nextDueDate, 'yyyy-MM-dd'),
                    status: 'pending',
                    paymentDate: null,
                    createdAt: new Date(),
                    isRecurring: true, 
                    recurringGroupId: recurringGroupId,
                };
                
                delete newEntryData.id; 
                delete newEntryData.installmentInfo; 

                const newDocRef = collectionRef.doc();
                transaction.set(newDocRef, newEntryData);
            }
        });
        
        res.status(200).json({ message: 'Status atualizado e próximo lançamento (se recorrente) criado.' });
        
    } catch (error) {
        console.error(`Erro ao marcar como pago ${collectionName}:`, error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
};

// --- ROTAS PRINCIPAIS ---
// (Sem alterações)
router.post('/payables', (req, res) => createEntry(req, res, 'financialPayables'));
router.get('/payables', (req, res) => getEntries(req, res, 'financialPayables'));
router.put('/payables/:id', (req, res) => updateEntry(req, res, 'financialPayables'));
router.delete('/payables/:id', (req, res) => deleteEntry(req, res, 'financialPayables'));
router.patch('/payables/:id/status', (req, res) => markAsPaid(req, res, 'financialPayables'));

router.post('/receivables', (req, res) => createEntry(req, res, 'financialReceivables'));
router.get('/receivables', (req, res) => getEntries(req, res, 'financialReceivables'));
router.put('/receivables/:id', (req, res) => updateEntry(req, res, 'financialReceivables'));
router.delete('/receivables/:id', (req, res) => deleteEntry(req, res, 'financialReceivables'));
router.patch('/receivables/:id/status', (req, res) => markAsPaid(req, res, 'financialReceivables'));


// --- ROTAS DE RELATÓRIOS ---
// (Sem alterações)
router.get('/today-summary', async (req, res) => {
    try {
        const { db } = req; 
        const { establishmentId } = req.user;
        const today = format(new Date(), 'yyyy-MM-dd');
        
        const payablesQuery = db.collection('financialPayables')
            .where('establishmentId', '==', establishmentId)
            .where('dueDate', '==', today)
            .where('status', '==', 'pending')
            .get();
            
        const receivablesQuery = db.collection('financialReceivables')
            .where('establishmentId', '==', establishmentId)
            .where('dueDate', '==', today)
            .where('status', '==', 'pending')
            .get();

        const [payablesSnapshot, receivablesSnapshot] = await Promise.all([payablesQuery, receivablesQuery]);
        
        const totalPayables = payablesSnapshot.docs.reduce((sum, doc) => sum + doc.data().amount, 0);
        const totalReceivables = receivablesSnapshot.docs.reduce((sum, doc) => sum + doc.data().amount, 0);
        
        res.status(200).json({ totalPayables, totalReceivables });
    } catch (error) {
        console.error('Erro ao buscar resumo do dia:', error);
        res.status(500).json({ message: 'Erro ao buscar resumo.' });
    }
});

router.get('/cash-flow', async (req, res) => {
     try {
        const { db } = req; 
        const { establishmentId } = req.user;
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'Datas de início e fim são obrigatórias.' });
        }
            
        const queryPaidEntriesFixed = (collectionName) => db.collection(collectionName)
            .where('establishmentId', '==', establishmentId)
            .where('status', '==', 'paid')
            .where('paymentDate', '>=', startDate)
            .where('paymentDate', '<=', endDate)
            .get();

        const [payablesSnapshot, receivablesSnapshot] = await Promise.all([
            queryPaidEntriesFixed('financialPayables'),
            queryPaidEntriesFixed('financialReceivables')
        ]);

        const entriesByDate = {};

        const processSnapshot = (snapshot, type) => {
            snapshot.forEach(doc => {
                const data = doc.data();
                const date = data.paymentDate;
                if (!entriesByDate[date]) {
                    entriesByDate[date] = { date, receivables: 0, payables: 0 };
                }
                entriesByDate[date][type] += data.amount;
            });
        };

        processSnapshot(receivablesSnapshot, 'receivables');
        processSnapshot(payablesSnapshot, 'payables');
        
        const sortedEntries = Object.values(entriesByDate).sort((a, b) => new Date(a.date) - new Date(b.date));

        let accumulatedBalance = 0; 
        const labels = [];
        const receivablesData = [];
        const payablesData = [];
        const balanceData = [];

        sortedEntries.forEach(entry => {
            labels.push(format(parseISO(entry.date), 'dd/MM'));
            receivablesData.push(entry.receivables);
            payablesData.push(entry.payables);
            accumulatedBalance += (entry.receivables - entry.payables);
            balanceData.push(accumulatedBalance);
        });

        res.status(200).json({
            labels,
            receivablesData,
            payablesData,
            balanceData 
        });

    } catch (error) {
        console.error('Erro ao buscar dados do fluxo de caixa:', error);
        res.status(500).json({ message: 'Erro ao buscar dados do gráfico.' });
    }
});


module.exports = router;