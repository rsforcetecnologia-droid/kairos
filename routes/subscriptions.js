const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// --- Middleware para verificar se é Super Admin (reutilizado) ---
const { verifyToken, isSuperAdmin } = require('../middlewares/auth');

// Aplica o middleware de autenticação em todas as rotas
router.use(verifyToken, isSuperAdmin);

// Rota para criar um novo plano de assinatura
router.post('/plans', async (req, res) => {
    const { name, price, maxProfessionals, maxUsers, allowedModules } = req.body;
    if (!name || price === undefined || maxProfessionals === undefined || maxUsers === undefined || !allowedModules) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios para criar um plano.' });
    }
    try {
        const { db } = req;
        const newPlan = {
            name,
            price: Number(price),
            maxProfessionals: Number(maxProfessionals),
            maxUsers: Number(maxUsers),
            allowedModules,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };
        const docRef = await db.collection('subscriptionPlans').add(newPlan);
        res.status(201).json({ message: 'Plano criado com sucesso!', id: docRef.id, data: newPlan });
    } catch (error) {
        console.error("Erro ao criar plano de assinatura:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Rota para obter todos os planos de assinatura
router.get('/plans', async (req, res) => {
    try {
        const { db } = req;
        const snapshot = await db.collection('subscriptionPlans').orderBy('name').get();
        const plansList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(plansList);
    } catch (error) {
        console.error("Erro ao listar planos de assinatura:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Rota para atualizar um plano de assinatura
router.put('/plans/:planId', async (req, res) => {
    const { planId } = req.params;
    const { name, price, maxProfessionals, maxUsers, allowedModules } = req.body;
    if (!name || price === undefined || maxProfessionals === undefined || maxUsers === undefined || !allowedModules) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios para atualizar um plano.' });
    }
    try {
        const { db } = req;
        const updatedData = {
            name,
            price: Number(price),
            maxProfessionals: Number(maxProfessionals),
            maxUsers: Number(maxUsers),
            allowedModules
        };
        await db.collection('subscriptionPlans').doc(planId).update(updatedData);
        res.status(200).json({ message: 'Plano atualizado com sucesso!' });
    } catch (error) {
        console.error("Erro ao atualizar plano de assinatura:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Rota para apagar um plano de assinatura
router.delete('/plans/:planId', async (req, res) => {
    const { planId } = req.params;
    try {
        const { db } = req;
        await db.collection('subscriptionPlans').doc(planId).delete();
        res.status(200).json({ message: 'Plano apagado com sucesso!' });
    } catch (error) {
        console.error("Erro ao apagar plano de assinatura:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Rota para atribuir um plano a um estabelecimento
router.patch('/assign/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    const { planId, expiryDate } = req.body;
    if (!planId || !expiryDate) {
        return res.status(400).json({ message: 'ID do plano e data de expiração são obrigatórios.' });
    }
    try {
        const { db } = req;
        const establishmentRef = db.collection('establishments').doc(establishmentId);
        await establishmentRef.update({
            subscription: {
                planId,
                expiryDate: admin.firestore.Timestamp.fromDate(new Date(expiryDate))
            }
        });
        res.status(200).json({ message: 'Plano de assinatura atribuído com sucesso!' });
    } catch (error) {
        console.error("Erro ao atribuir plano:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

module.exports = router;
