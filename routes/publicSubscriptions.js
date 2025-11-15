// routes/publicSubscriptions.js
const express = require('express');
const router = express.Router();
// (REMOVIDO) Middlewares de admin não são necessários aqui.

/**
 * Rota pública para obter todos os planos de assinatura.
 * Não requer autenticação.
 */
router.get('/plans', async (req, res) => {
    try {
        const { db } = req;
        
        // Busca todos os planos e os ordena pelo 'maxProfessionals' (ou 'price', se preferir)
        // Usar 'maxProfessionals' é bom para garantir a ordem 'Essencial', 'Pro', 'Enterprise'
        const snapshot = await db.collection('subscriptionPlans').orderBy('maxProfessionals').get();
        const plansList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // ####################################################################
        // ### INÍCIO DA MODIFICAÇÃO (Segurança) ###
        // ####################################################################

        // Filtra para retornar apenas os dados necessários publicamente
        const publicPlans = plansList.map(plan => ({
            id: plan.id, // ID interno (ex: 'plano_pro')
            name: plan.name,
            description: plan.description || '', // (ADICIONADO)
            // price: plan.price, // (REMOVIDO - O preço vem do Stripe)
            stripePriceId: plan.stripePriceId, // (ADICIONADO) Essencial para o frontend
            maxProfessionals: plan.maxProfessionals,
            maxUsers: plan.maxUsers,
            // (REMOVIDO) Não expõe a estrutura interna de módulos
            // allowedModules: plan.allowedModules, 
        }));

        // ####################################################################
        // ### FIM DA MODIFICAÇÃO ###
        // ####################################################################

        res.status(200).json(publicPlans);
    } catch (error) {
        console.error("Erro ao listar planos de assinatura públicos:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao buscar os planos.' });
    }
});

module.exports = router;