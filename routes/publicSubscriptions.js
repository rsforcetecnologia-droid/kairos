// routes/publicSubscriptions.js (Checkout Público e Integração Pagar.me V5)

const express = require('express');
const router = express.Router();
const axios = require('axios');
const admin = require('firebase-admin');

// Configuração da API Pagar.me V5
const PAGARME_API = axios.create({
    baseURL: 'https://api.pagar.me/core/v5',
    headers: {
        'Authorization': `Basic ${Buffer.from(process.env.PAGARME_SECRET_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/json'
    }
});

// Helper para limpar formatações de CPF/CNPJ e Telefone
function cleanStr(str) {
    if (!str) return '';
    return String(str).replace(/\D/g, '');
}

/**
 * ROTA: GET /api/public/subscriptions/plans/:establishmentId
 * OBJETIVO: Devolver os planos ativos de uma unidade para o Portal do Cliente
 */
router.get('/plans/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    const db = req.db || admin.firestore();

    try {
        const snapshot = await db.collection('plans')
            .where('establishmentId', '==', establishmentId)
            .where('active', '==', true)
            .get();

        if (snapshot.empty) {
            return res.status(200).json([]);
        }

        const plans = snapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            price: doc.data().price,
            billingCycle: doc.data().billingCycle,
            servicesIncluded: doc.data().servicesIncluded || [],
            usageLimit: doc.data().usageLimit || null
        }));

        res.status(200).json(plans);
    } catch (error) {
        console.error("Erro ao procurar planos públicos:", error);
        res.status(500).json({ message: "Erro ao carregar planos." });
    }
});

/**
 * ROTA: POST /api/public/subscriptions/checkout
 * OBJETIVO: Processar o pagamento e criar a assinatura com Split no Pagar.me
 */
router.post('/checkout', async (req, res) => {
    const db = req.db || admin.firestore();
    const { 
        establishmentId, 
        planId, 
        customer,  // { name, email, document, phone }
        card       // { number, holder_name, exp_month, exp_year, cvv } ou payment_method: 'pix'
    } = req.body;

    if (!establishmentId || !planId || !customer || !customer.document) {
        return res.status(400).json({ message: "Dados incompletos para o checkout." });
    }

    try {
        // 1. Validar Estabelecimento e Recebedor (Marketplace)
        const estDoc = await db.collection('establishments').doc(establishmentId).get();
        if (!estDoc.exists) throw new Error("Estabelecimento não encontrado.");
        
        const estData = estDoc.data();
        const recipientId = estData.pagarmeRecipientId;
        
        if (!recipientId) {
            throw new Error("Este estabelecimento ainda não aceita pagamentos online.");
        }

        // 2. Validar Plano
        const planDoc = await db.collection('plans').doc(planId).get();
        if (!planDoc.exists || !planDoc.data().active) {
            throw new Error("Plano indisponível ou inativo.");
        }
        const planData = planDoc.data();

        // Pagar.me trabalha com centavos (R$ 89,90 = 8990)
        const priceInCents = Math.round(planData.price * 100);

        // 3. Montar Regra de Split (100% para o Estabelecimento, que assume as taxas do Pagar.me)
        const splitRule = [
            {
                amount: priceInCents,
                recipient_id: recipientId,
                type: 'flat',
                options: {
                    charge_processing_fee: true, // O estabelecimento paga a taxa do cartão
                    charge_remainder_fee: true
                }
            }
        ];

        // 4. Montar Payload da Assinatura para o Pagar.me
        const cleanPhone = cleanStr(customer.phone);
        const subscriptionPayload = {
            payment_method: 'credit_card', // Pode ser expandido para PIX futuramente
            currency: 'BRL',
            interval: planData.billingCycle === 'yearly' ? 'year' : 'month',
            interval_count: 1,
            billing_type: 'exact_day',
            installments: 1,
            customer: {
                name: customer.name,
                email: customer.email,
                document: cleanStr(customer.document),
                type: cleanStr(customer.document).length === 14 ? 'company' : 'individual',
                phones: {
                    mobile_phone: {
                        country_code: '55',
                        area_code: cleanPhone.substring(0, 2),
                        number: cleanPhone.substring(2)
                    }
                }
            },
            card: {
                number: cleanStr(card.number),
                holder_name: card.holder_name,
                exp_month: parseInt(card.exp_month),
                exp_year: parseInt(card.exp_year),
                cvv: cleanStr(card.cvv)
            },
            items: [
                {
                    description: `Assinatura: ${planData.name}`,
                    quantity: 1,
                    pricing_scheme: {
                        scheme_type: "unit",
                        price: priceInCents
                    },
                    split: splitRule // 🚀 AQUI ACONTECE A DIVISÃO DO DINHEIRO!
                }
            ]
        };

        // 5. Enviar para a API do Pagar.me
        console.log(`[CHECKOUT] Processando assinatura para cliente ${customer.name}...`);
        const response = await PAGARME_API.post('/subscriptions', subscriptionPayload);
        const pagarmeSubscription = response.data;

        // 6. Registar o Cliente Final no Firestore (se não existir)
        const safeClientId = cleanPhone; // Usamos o telefone como ID global de cliente
        const clientRef = db.collection('clients').doc(safeClientId);
        const clientDoc = await clientRef.get();

        if (!clientDoc.exists) {
            await clientRef.set({
                id: safeClientId,
                name: customer.name,
                phone: safeClientId,
                email: customer.email,
                document: cleanStr(customer.document),
                establishmentId: establishmentId,
                groupId: estData.groupId || null,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                loyaltyPoints: 0
            });
        }

        // 7. Gravar a Assinatura no Firestore (Para o sistema controlar os usos)
        const newSubscription = {
            clientId: safeClientId,
            clientName: customer.name,
            planId: planId,
            planName: planData.name,
            establishmentId: establishmentId,
            gatewaySubscriptionId: pagarmeSubscription.id, // ID guardado para Webhooks futuros
            gatewayCustomerId: pagarmeSubscription.customer.id,
            status: pagarmeSubscription.status, // "active", "canceled", "past_due"
            currentPeriodStart: new Date(pagarmeSubscription.current_cycle.start_at),
            currentPeriodEnd: new Date(pagarmeSubscription.current_cycle.end_at),
            paymentMethod: 'credit_card',
            servicesIncluded: planData.servicesIncluded || [],
            usageLimit: planData.usageLimit || null,
            usageCurrentMonth: 0, // Inicia a zero usos
            price: planData.price,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };

        await db.collection('client_subscriptions').add(newSubscription);

        // 8. Resposta de Sucesso para o Frontend
        res.status(201).json({
            message: "Assinatura ativada com sucesso!",
            subscriptionId: pagarmeSubscription.id,
            status: pagarmeSubscription.status
        });

    } catch (error) {
        // Capturar erros específicos do Pagar.me (Ex: Cartão recusado, saldo insuficiente)
        const errorMessage = error.response?.data?.errors 
            ? error.response.data.errors[0]?.message 
            : (error.response?.data?.message || error.message);
            
        console.error("[ERRO NO CHECKOUT]:", JSON.stringify(error.response?.data || error.message));
        
        res.status(400).json({ 
            message: "Não foi possível concluir o pagamento.", 
            details: errorMessage 
        });
    }
});

module.exports = router;