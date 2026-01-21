const express = require('express');
const router = express.Router();
const axios = require('axios'); // Usaremos axios para chamar a API do Pagar.me

// Autenticação Basic Auth para Pagar.me (API Key + :)
const pagarmeAuth = Buffer.from(`${process.env.PAGARME_SECRET_KEY}:`).toString('base64');
const pagarmeApi = axios.create({
    baseURL: 'https://api.pagar.me/core/v5',
    headers: {
        'Authorization': `Basic ${pagarmeAuth}`,
        'Content-Type': 'application/json'
    }
});

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
                // IMPORTANTE: Você deve ter o 'pagarmePlanId' salvo no Firestore agora, não mais 'stripePriceId'
                pagarmePlanId: data.pagarmePlanId, 
                price: data.price,
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
 * Cria uma assinatura no Pagar.me
 * Recebe: { planId: 'plan_xyz...', cardToken: 'token_gerado_no_front', customer: { ... }, establishmentId: '...' }
 */
router.post('/create-subscription', async (req, res) => {
    const { pagarmePlanId, cardToken, customerData, establishmentId } = req.body;

    if (!pagarmePlanId || !cardToken || !establishmentId || !customerData) {
        return res.status(400).json({ error: 'Dados incompletos (PlanId, CardToken, Customer, EstablishmentId).' });
    }

    try {
        // 1. Cria a assinatura na API V5
        // Nota: O Pagar.me V5 permite criar Cliente e Assinatura numa chamada só ou separados.
        // Aqui faremos a assinatura direta passando os dados do cliente e cartão.
        
        const subscriptionPayload = {
            plan_id: pagarmePlanId,
            payment_method: 'credit_card',
            card_token: cardToken, // Token gerado no frontend
            customer: {
                name: customerData.name,
                email: customerData.email,
                document: customerData.document, // CPF/CNPJ (apenas números)
                type: customerData.document.length > 11 ? 'company' : 'individual',
                phones: {
                    mobile_phone: {
                        country_code: '55',
                        area_code: customerData.areaCode, // Ex: '11'
                        number: customerData.phone // Ex: '999999999'
                    }
                }
            },
            metadata: {
                establishmentId: establishmentId // CRUCIAL para o Webhook identificar
            }
        };

        const response = await pagarmeApi.post('/subscriptions', subscriptionPayload);
        
        const newSubscription = response.data;

        // Retorna sucesso para o frontend
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