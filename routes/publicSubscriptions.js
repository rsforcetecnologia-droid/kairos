// routes/publicSubscriptions.js

const express = require('express');
const router = express.Router();
const axios = require('axios'); 

// Autenticação Basic Auth para Pagar.me (Mantido para uso futuro se necessário)
const pagarmeAuth = Buffer.from(`${process.env.PAGARME_SECRET_KEY || ''}:`).toString('base64');
const pagarmeApi = axios.create({
    baseURL: 'https://api.pagar.me/core/v5',
    headers: {
        'Authorization': `Basic ${pagarmeAuth}`,
        'Content-Type': 'application/json'
    }
});

// 🔄 ROTA CORRIGIDA: Lista os planos públicos no Site / Landing Page
router.get('/plans', async (req, res) => {
    try {
        const { db } = req;
        // Aponta para 'saas_plans' e traz apenas os planos ativos
        const snapshot = await db.collection('saas_plans')
            .where('active', '==', true)
            .get();
        
        const publicPlans = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                description: data.description || '',
                pagarmePlanId: data.pagarmePlanId || null, 
                price: data.price || 0,
                maxProfessionals: data.maxProfessionals || 999,
                maxUsers: data.maxUsers || 999,
                features: data.features || []
            };
        });

        // Ordena os planos por preço (do mais barato ao mais caro) em memória
        publicPlans.sort((a, b) => a.price - b.price);

        res.status(200).json(publicPlans);
    } catch (error) {
        console.error("Erro ao listar planos:", error);
        res.status(500).json({ message: 'Erro ao buscar planos.' });
    }
});

/**
 * Cria uma assinatura no Pagar.me (Mantida intacta)
 */
router.post('/create-subscription', async (req, res) => {
    const { pagarmePlanId, cardToken, customerData, establishmentId } = req.body;

    if (!pagarmePlanId || !cardToken || !establishmentId || !customerData) {
        return res.status(400).json({ error: 'Dados incompletos (PlanId, CardToken, Customer, EstablishmentId).' });
    }

    try {
        const subscriptionPayload = {
            plan_id: pagarmePlanId,
            payment_method: 'credit_card',
            card_token: cardToken,
            customer: {
                name: customerData.name,
                email: customerData.email,
                document: customerData.document, 
                type: customerData.document.length > 11 ? 'company' : 'individual',
                phones: {
                    mobile_phone: {
                        country_code: '55',
                        area_code: customerData.areaCode, 
                        number: customerData.phone 
                    }
                }
            },
            metadata: {
                establishmentId: establishmentId 
            }
        };

        const response = await pagarmeApi.post('/subscriptions', subscriptionPayload);
        
        const newSubscription = response.data;

        res.json({ 
            success: true, 
            subscriptionId: newSubscription.id,
            status: newSubscription.status 
        });

    } catch (error) {
        console.error("Erro ao criar assinatura Pagar.me:", error.response?.data || error.message);
        res.status(500).json({ 
            error: 'Erro ao processar pagamento.', 
            details: error.response?.data?.message || error.message 
        });
    }
});

module.exports = router;