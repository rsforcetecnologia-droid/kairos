const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// ⚠️ CORREÇÃO: Sem aspas para ler a variável do .env corretamente
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 

/**
 * Rota para receber notificações automáticas do Stripe.
 */
router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    
    // ✅ O TEU SEGREDO DO WEBHOOK
    // Se estiver em produção, considere colocar isso no .env como process.env.STRIPE_WEBHOOK_SECRET
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
    const object = event.data.object;
    
    // Tenta pegar o establishmentId dos metadados (pode vir da subscription ou da invoice)
    let establishmentId = object.metadata?.establishmentId;

    // Se for um evento de Invoice, o establishmentId pode não estar na raiz, mas sim na subscription associada
    // Faremos uma busca segura se necessário, mas para simplificar, confiamos que o subscription tenha os metadados.
    
    // Se não achou o ID diretamente, vamos tentar buscar pela subscription se tivermos o ID dela
    if (!establishmentId && object.subscription && typeof object.subscription === 'string') {
        try {
            const sub = await stripe.subscriptions.retrieve(object.subscription);
            establishmentId = sub.metadata?.establishmentId;
        } catch (e) {
            console.log('Erro ao buscar assinatura para recuperar ID:', e.message);
        }
    }

    if (!establishmentId) {
        // Ignora eventos que não pertencem a um estabelecimento (ex: logs internos do Stripe)
        return res.status(200).json({ received: true });
    }

    try {
        const establishmentRef = db.collection('establishments').doc(establishmentId);

        switch (event.type) {
            
            // ✅ CASO 1: PAGAMENTO REALIZADO COM SUCESSO (Renovação ou Fim do Trial)
            case 'invoice.payment_succeeded':
                const invoice = object;
                if (invoice.subscription) {
                    // Busca a assinatura atualizada para garantir a nova data de fim
                    const updatedSub = await stripe.subscriptions.retrieve(invoice.subscription);
                    const newExpiryDate = new Date(updatedSub.current_period_end * 1000);

                    await establishmentRef.update({
                        'status': 'active', // Garante que está ativo
                        'subscription.statusStripe': updatedSub.status,
                        'subscription.expiryDate': admin.firestore.Timestamp.fromDate(newExpiryDate),
                        'subscription.lastPaymentDate': admin.firestore.FieldValue.serverTimestamp(),
                        'subscription.isTrial': false // <-- IMPORTANTE: Remove a flag de teste pois pagou
                    });
                    console.log(`💰 Pagamento confirmado para [${establishmentId}]. Renovado até: ${newExpiryDate.toISOString()}`);
                }
                break;

            // ✅ CASO 2: MUDANÇA DE STATUS (Cancelou, Pausou, Entrou em Trial)
            case 'customer.subscription.created':
            case 'customer.subscription.updated':
                const subscription = object;
                const statusStripe = subscription.status;
                const expiryDate = new Date(subscription.current_period_end * 1000); 
                
                let systemStatus = 'inactive';

                // Mapeia status do Stripe para o sistema
                // 'trialing' = Ativo (Período de Teste)
                // 'active'   = Ativo (Pago)
                // 'past_due' = Ativo (Damos uma chance antes de bloquear)
                if (['active', 'trialing', 'past_due'].includes(statusStripe)) {
                    systemStatus = 'active';
                }

                await establishmentRef.update({
                    'status': systemStatus,
                    'subscription.statusStripe': statusStripe,
                    'subscription.expiryDate': admin.firestore.Timestamp.fromDate(expiryDate),
                    'subscription.stripeSubscriptionId': subscription.id,
                    'subscription.lastWebhookUpdate': admin.firestore.FieldValue.serverTimestamp()
                });

                console.log(`🔄 Assinatura atualizada [${establishmentId}]. Status: ${statusStripe}`);
                break;
            
            // ✅ CASO 3: ASSINATURA DELETADA (Cancelamento definitivo)
            case 'customer.subscription.deleted':
                await establishmentRef.update({
                    'status': 'inactive',
                    'subscription.statusStripe': 'canceled',
                    'subscription.isTrial': false
                });
                console.log(`❌ Assinatura cancelada para [${establishmentId}]`);
                break;

            case 'invoice.payment_failed':
                console.log(`⚠️ Falha no pagamento para: ${establishmentId}. O Stripe tentará novamente.`);
                // Opcional: Enviar e-mail avisando o cliente
                break;
                
            default:
                console.log(`ℹ️ Evento ignorado: ${event.type}`);
        }

        res.status(200).json({ received: true });
    } catch (error) {
        console.error("Erro ao processar Webhook no Firestore:", error);
        res.status(500).json({ error: 'Erro interno.' });
    }
});

module.exports = router;