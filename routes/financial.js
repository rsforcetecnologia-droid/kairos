// routes/financial.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, hasAccess } = require('../middlewares/auth');

// Middleware para garantir que apenas usuários autorizados tenham acesso
router.use(verifyToken, hasAccess);

// --- Contas a Pagar ---
router.post('/receivables', async (req, res) => {
    const { establishmentId } = req.user;
    const { description, amount, dueDate } = req.body;
    if (!description || !amount || !dueDate) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios: descrição, valor e data de vencimento.' });
    }
    try {
        const newReceivable = {
            establishmentId,
            description,
            amount: Number(amount),
            dueDate: admin.firestore.Timestamp.fromDate(new Date(dueDate)),
            status: 'pending',
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };
        const docRef = await req.db.collection('financial_receivables').add(newReceivable);
        res.status(201).json({ message: 'Conta a receber criada com sucesso.', id: docRef.id });
    } catch (error) {
        console.error("Erro ao criar conta a receber:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

router.get('/receivables', async (req, res) => {
    const { establishmentId } = req.user;
    try {
        const snapshot = await req.db.collection('financial_receivables')
            .where('establishmentId', '==', establishmentId)
            .orderBy('dueDate', 'asc')
            .get();
        const receivables = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(receivables);
    } catch (error) {
        console.error("Erro ao listar contas a receber:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// --- Contas a Receber ---
router.post('/payables', async (req, res) => {
    const { establishmentId } = req.user;
    const { description, amount, dueDate } = req.body;
    if (!description || !amount || !dueDate) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios: descrição, valor e data de vencimento.' });
    }
    try {
        const newPayable = {
            establishmentId,
            description,
            amount: Number(amount),
            dueDate: admin.firestore.Timestamp.fromDate(new Date(dueDate)),
            status: 'pending',
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };
        const docRef = await req.db.collection('financial_payables').add(newPayable);
        res.status(201).json({ message: 'Conta a pagar criada com sucesso.', id: docRef.id });
    } catch (error) {
        console.error("Erro ao criar conta a pagar:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

router.get('/payables', async (req, res) => {
    const { establishmentId } = req.user;
    try {
        const snapshot = await req.db.collection('financial_payables')
            .where('establishmentId', '==', establishmentId)
            .orderBy('dueDate', 'asc')
            .get();
        const payables = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(payables);
    } catch (error) {
        console.error("Erro ao listar contas a pagar:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

module.exports = router;