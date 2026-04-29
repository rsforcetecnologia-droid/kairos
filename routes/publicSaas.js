// routes/publicSaas.js (Rotas Públicas para a Landing Page do Kairos)

const express = require('express');
const router = express.Router();

// =======================================================================
// 🚀 ROTA: GET /api/public/saas/plans
// OBJETIVO: Listar os planos SaaS ATIVOS para a página de Preços
// =======================================================================
router.get('/plans', async (req, res) => {
    // A db é injetada pelo middleware addFirebaseInstances no index.js
    const { db } = req; 
    
    try {
        // Traz apenas os planos do SaaS (isolados) que estão Ativos para venda
        const snapshot = await db.collection('saas_plans')
                                 .where('active', '==', true)
                                 .get();
        
        const plans = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                price: data.price,
                features: data.features || [],
                maxEstablishments: data.maxEstablishments || 1,
                maxUsers: data.maxUsers || 1,
                maxProfessionals: data.maxProfessionals || 1
                // NOTA DE SEGURANÇA: Não enviamos o pagarmePlanId para o frontend público!
            };
        });

        // Ordenar os planos do mais barato para o mais caro (ideal para páginas de preço)
        plans.sort((a, b) => a.price - b.price);

        res.status(200).json(plans);

    } catch (error) {
        console.error("Erro ao buscar planos públicos do SaaS:", error);
        res.status(500).json({ message: "Erro interno ao carregar os planos disponíveis." });
    }
});

module.exports = router;