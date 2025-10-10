// routes/stripeWebhook.js
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// ⚠️ SUBSTITUA PELA SUA CHAVE SECRETA DA STRIPE ⚠️
// Requer a biblioteca 'stripe' instalada via npm.
const stripe = require('stripe')('SUA_CHAVE_SECRETA_STRIPE'); 

// Este endpoint precisa de um body parser 'raw' para que o Stripe possa verificar a assinatura do webhook
router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    // ⚠️ SUBSTITUA PELO SEU ENDPOINT SECRET DO STRIPE ⚠️
    const endpointSecret = 'SEU_ENDPOINT_SECRET_DO_STRIPE'; 
    let event;

    try {
        // 1. Constrói o evento Stripe para verificação de assinatura
        // Isso garante que o evento realmente veio do Stripe
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error(`❌ Erro de verificação de Webhook: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    const { db } = req;
    const subscription = event.data.object;
    
    // O ID do estabelecimento é recuperado dos metadados que enviamos na criação
    const establishmentId = subscription.metadata?.establishmentId; 

    // Ignora eventos que não têm o ID do estabelecimento atrelado
    if (!establishmentId) {
        return res.status(400).send('Webhook: establishmentId não encontrado nos metadados.');
    }

    try {
        const establishmentRef = db.collection('establishments').doc(establishmentId);

        switch (event.type) {
            case 'customer.subscription.created':
            case 'customer.subscription.updated':
            case 'customer.subscription.deleted':
                
                // Extrai o novo status e a data de expiração
                const statusStripe = subscription.status;
                const expiryDate = new Date(subscription.current_period_end * 1000); 
                
                let systemStatus = 'active';

                // Mapeamento do status Stripe para o status interno do seu sistema
                if (statusStripe === 'active') {
                    systemStatus = 'active';
                } else if (statusStripe === 'trialing') {
                    systemStatus = 'active';
                } else if (statusStripe === 'past_due' || statusStripe === 'unpaid') {
                    // Durante 'past_due' o acesso ainda é mantido (carência)
                    systemStatus = 'active'; 
                } else if (statusStripe === 'canceled' || statusStripe === 'incomplete_expired') {
                    systemStatus = 'inactive';
                }

                // 3. Atualiza o Firestore com os novos dados do Stripe
                await establishmentRef.update({
                    'status': systemStatus, // Ativa/inativa o acesso principal
                    'subscription.statusStripe': statusStripe,
                    'subscription.expiryDate': admin.firestore.Timestamp.fromDate(expiryDate),
                    'subscription.stripeSubscriptionId': subscription.id,
                    'subscription.lastUpdate': admin.firestore.FieldValue.serverTimestamp()
                });

                console.log(`✅ Assinatura ${establishmentId} atualizada. Status: ${statusStripe}.`);
                break;
                
            // O evento invoice.payment_failed é útil para fins de notificação do cliente
            case 'invoice.payment_failed':
                console.log(`⚠️ Falha no pagamento para ${establishmentId}. O acesso será mantido durante o período de carência.`);
                break;
                
            default:
                // Para outros eventos, apenas loga e ignora
                console.log(`Evento Stripe não tratado: ${event.type}`);
        }

        res.status(200).json({ received: true });
    } catch (error) {
        console.error("Erro ao processar evento Stripe no Firestore:", error);
        res.status(500).json({ error: 'Falha interna do servidor.' });
    }
});

module.exports = router;
