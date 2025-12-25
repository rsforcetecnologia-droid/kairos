// routes/publicSubscriptions.js
const express = require('express');
const router = express.Router();
// Certifica-te de configurar a chave no .env ou hardcoded para testes (não recomendado para produção)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'SUA_CHAVE_SECRETA_STRIPE'); 

/**
 * Rota pública para obter todos os planos de assinatura.
 */
router.get('/plans', async (req, res) => {
    try {
        const { db } = req;
        const snapshot = await db.collection('subscriptionPlans').orderBy('maxProfessionals').get();
        
        const publicPlans = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                description: data.description || '',
                // stripePriceId é crucial para o frontend saber o que cobrar
                stripePriceId: data.stripePriceId, 
                prices: data.prices, // Sugestão: Ter um objeto com { monthly: 'price_x', yearly: 'price_y' }
                maxProfessionals: data.maxProfessionals,
                maxUsers: data.maxUsers,
            };
        });

        res.status(200).json(publicPlans);
    } catch (error) {
        console.error("Erro ao listar planos:", error);
        res.status(500).json({ message: 'Erro ao buscar planos.' });
    }
});

/**
 * Rota para criar a Sessão de Checkout do Stripe
 * Recebe: { priceId: 'price_...', establishmentId: 'ID_DO_FIREBASE' }
 */
router.post('/create-checkout-session', async (req, res) => {
    const { priceId, establishmentId } = req.body;

    if (!priceId || !establishmentId) {
        return res.status(400).json({ error: 'PriceId e EstablishmentId são obrigatórios.' });
    }

    try {
        // Cria a sessão de checkout
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            // Metadados são CRUCIAIS para o Webhook saber quem pagou
            metadata: {
                establishmentId: establishmentId
            },
            // URLs para onde o utilizador volta após o pagamento
            success_url: `https://seusite.com/app.html?session_id={CHECKOUT_SESSION_ID}&payment=success`,
            cancel_url: `https://seusite.com/login.html?payment=canceled`,
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Erro ao criar sessão Stripe:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;