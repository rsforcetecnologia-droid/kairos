// routes/publicSubscriptions.js
const express = require('express');
const router = express.Router();

/**
 * Rota pública para obter todos os planos de assinatura.
 * Não requer autenticação (verifyToken).
 */
router.get('/plans', async (req, res) => {
    try {
        const { db } = req;
        
        // Busca todos os planos e os ordena por preço (ou por nome, como preferir).
        const snapshot = await db.collection('subscriptionPlans').orderBy('price').get();
        const plansList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Filtra para retornar apenas os dados necessários publicamente
        const publicPlans = plansList.map(plan => ({
            id: plan.id,
            name: plan.name,
            price: plan.price,
            maxProfessionals: plan.maxProfessionals,
            maxUsers: plan.maxUsers,
            allowedModules: plan.allowedModules,
        }));

        res.status(200).json(publicPlans);
    } catch (error) {
        console.error("Erro ao listar planos de assinatura públicos:", error);
        // Retorna uma mensagem genérica para o público
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao buscar os planos.' });
    }
});

module.exports = router;