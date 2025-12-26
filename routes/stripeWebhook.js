// routes/stripeWebhook.js
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// ⚠️ ATENÇÃO: Certifica-te de que substituíste 'SUA_CHAVE_SECRETA_STRIPE' 
// pela tua chave SK_TEST real (começa com sk_test_...)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 

/**
 * Rota para receber notificações automáticas do Stripe.
 */
router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    
    // ✅ O TEU SEGREDO DO WEBHOOK (Copiado do teu terminal)
    const endpointSecret = 'whsec_f01ede13862e961ae09f986ef6e5a5eba784abca7fad253a1cf622e3d8ed8f8a'; 
    
    let event;

    try {
        // Valida se o evento realmente veio do Stripe
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error(`❌ Erro de verificação de Webhook: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    const { db } = req;
    const subscription = event.data.object;
    
    // Recuperamos o ID do estabelecimento que guardamos nos metadados durante o registo
    const establishmentId = subscription.metadata?.establishmentId; 

    // Se for um evento que não tem metadados (ex: alguns logs de sistema), ignoramos com sucesso
    if (!establishmentId) {
        return res.status(200).json({ received: true });
    }

    try {
        const establishmentRef = db.collection('establishments').doc(establishmentId);

        switch (event.type) {
            case 'customer.subscription.created':
            case 'customer.subscription.updated':
            case 'customer.subscription.deleted':
                
                const statusStripe = subscription.status;
                // Converte o timestamp do Stripe (segundos) para Date
                const expiryDate = new Date(subscription.current_period_end * 1000); 
                
                let systemStatus = 'active';

                // Mapeamento de status para o teu sistema
                if (['active', 'trialing', 'past_due'].includes(statusStripe)) {
                    systemStatus = 'active';
                } else {
                    systemStatus = 'inactive';
                }

                // Atualiza o Firestore com as informações mais recentes da assinatura
                await establishmentRef.update({
                    'status': systemStatus,
                    'subscription.statusStripe': statusStripe,
                    'subscription.expiryDate': admin.firestore.Timestamp.fromDate(expiryDate),
                    'subscription.stripeSubscriptionId': subscription.id,
                    'subscription.lastWebhookUpdate': admin.firestore.FieldValue.serverTimestamp()
                });

                console.log(`✅ Webhook: Estabelecimento [${establishmentId}] sincronizado. Status: ${statusStripe}`);
                break;
                
            case 'invoice.payment_failed':
                console.log(`⚠️ Webhook: Falha no pagamento para o estabelecimento: ${establishmentId}`);
                // Aqui entraria a lógica de envio de e-mail de falha
                break;
                
            default:
                console.log(`ℹ️ Evento Webhook ignorado: ${event.type}`);
        }

        res.status(200).json({ received: true });
    } catch (error) {
        console.error("Erro ao processar Webhook no Firestore:", error);
        res.status(500).json({ error: 'Erro interno.' });
    }
});

module.exports = router;