const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

/**
 * Rota para receber notificações (Postbacks) do Pagar.me V5
 */
router.post('/', async (req, res) => {
    try {
        const event = req.body; // O Pagar.me envia o evento no corpo
        const { type, data } = event;
        
        // Log para debug
        console.log(`🔔 Webhook Pagar.me recebido: ${type}`);

        if (!data) {
            return res.status(200).send('OK');
        }

        const { db } = req;
        
        // Tenta recuperar o establishmentId dos metadados
        // Nota: Ao criar a assinatura, você deve passar o establishmentId no metadata
        let establishmentId = data.metadata?.establishmentId;

        // Se for um evento de fatura (invoice), o metadata pode estar na assinatura relacionada
        if (!establishmentId && data.subscription) {
             // Lógica adicional de busca se necessário, mas idealmente garantimos o metadata na criação
             // Se o objeto 'subscription' vier completo, tentamos acessar
             if (data.subscription.metadata) {
                 establishmentId = data.subscription.metadata.establishmentId;
             }
        }

        if (!establishmentId) {
            console.log("⚠️ Webhook ignorado: establishmentId não encontrado nos metadados.");
            return res.status(200).send('OK');
        }

        const establishmentRef = db.collection('establishments').doc(establishmentId);

        switch (type) {
            // ✅ FATURA PAGA (Renovação ou Primeira Cobrança)
            case 'invoice.paid':
                const subscription = data.subscription;
                // Pagar.me envia datas em ISO string ou objetos, verifique a documentação da V5
                // Geralmente next_billing_cycle é a próxima cobrança
                let newExpiryDate = new Date();
                if (subscription && subscription.next_billing_cycle) {
                    newExpiryDate = new Date(subscription.next_billing_cycle);
                } else {
                    // Fallback: adiciona 30 dias se não vier data explícita
                    newExpiryDate.setDate(newExpiryDate.getDate() + 30);
                }

                await establishmentRef.update({
                    'status': 'active',
                    'subscription.statusPagarme': 'active',
                    'subscription.expiryDate': admin.firestore.Timestamp.fromDate(newExpiryDate),
                    'subscription.lastPaymentDate': admin.firestore.FieldValue.serverTimestamp(),
                    'subscription.isTrial': false
                });
                console.log(`💰 [Pagar.me] Pagamento confirmado para [${establishmentId}].`);
                break;

            // ✅ ASSINATURA CANCELADA
            case 'subscription.canceled':
                await establishmentRef.update({
                    'status': 'inactive',
                    'subscription.statusPagarme': 'canceled'
                });
                console.log(`❌ [Pagar.me] Assinatura cancelada para [${establishmentId}]`);
                break;

            // ✅ FALHA NO PAGAMENTO
            case 'invoice.payment_failed':
                console.log(`⚠️ [Pagar.me] Falha no pagamento para: ${establishmentId}`);
                // Opcional: Atualizar status para 'past_due' ou notificar cliente
                break;
        }

        res.status(200).send('OK');
    } catch (error) {
        console.error("Erro no Webhook Pagar.me:", error);
        res.status(500).send('Erro interno');
    }
});

module.exports = router;