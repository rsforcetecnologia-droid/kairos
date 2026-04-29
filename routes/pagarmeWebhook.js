// routes/pagarmeWebhook.js (Ouvinte de Eventos do Gateway)

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// 🚀 IMPORTANTE: O Webhook não usa verifyToken, pois a chamada vem do servidor do Pagar.me.
// A segurança baseia-se na origem da chamada (ou na assinatura do header, opcionalmente).

router.post('/', async (req, res) => {
    const db = admin.firestore(); // Usa a instância admin global
    const event = req.body;

    console.log(`[WEBHOOK PAGAR.ME] Evento recebido: ${event.type}`);

    try {
        switch (event.type) {
            case 'subscription.canceled':
                await handleSubscriptionCanceled(db, event.data);
                break;
            case 'invoice.paid':
                await handleInvoicePaid(db, event.data);
                break;
            case 'invoice.payment_failed':
            case 'charge.payment_failed':
                await handleInvoicePaymentFailed(db, event.data);
                break;
            default:
                console.log(`[WEBHOOK PAGAR.ME] Evento ignorado ou não processado: ${event.type}`);
        }

        // O Pagar.me exige sempre um status 200 OK rápido para saber que recebemos a notificação
        res.status(200).send('OK');
    } catch (error) {
        console.error(`[WEBHOOK PAGAR.ME] Erro Crítico ao processar evento:`, error);
        res.status(500).send('Erro interno do servidor');
    }
});

// --- FUNÇÕES DE PROCESSAMENTO ---

async function handleSubscriptionCanceled(db, subscriptionData) {
    const subId = subscriptionData.id;
    
    // 1. TENTA ACHAR NOS CLIENTES DO SALÃO
    const clientQuery = await db.collection('client_subscriptions').where('gatewaySubscriptionId', '==', subId).get();
    
    if (!clientQuery.empty) {
        const doc = clientQuery.docs[0];
        await doc.ref.update({
            status: 'canceled',
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        return console.log(`[WEBHOOK] Assinatura VIP do cliente cancelada.`);
    }

    // 2. TENTA ACHAR NOS ESTABELECIMENTOS (O SEU SAAS)
    const saasQuery = await db.collection('establishments').where('saasSubscription.pagarmeSubscriptionId', '==', subId).get();

    if (!saasQuery.empty) {
        const doc = saasQuery.docs[0];
        await doc.ref.update({
            status: 'suspended', // 🚀 Bloqueia acesso ao sistema
            'saasSubscription.status': 'canceled',
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        return console.log(`[WEBHOOK SAAS] Assinatura do salão ${doc.id} cancelada. Acesso suspenso.`);
    }
}

async function handleInvoicePaid(db, invoiceData) {
    const subId = invoiceData.subscription_id || (invoiceData.subscription ? invoiceData.subscription.id : null);
    if (!subId) return;

    // 1. TENTA ACHAR NOS CLIENTES DO SALÃO
    const clientQuery = await db.collection('client_subscriptions').where('gatewaySubscriptionId', '==', subId).get();
    
    if (!clientQuery.empty) {
        const doc = clientQuery.docs[0];
        const subRecord = doc.data();

        // Extrai a nova data de vencimento do ciclo
        const currentCycleEnd = invoiceData.subscription?.current_cycle?.end_at 
            ? new Date(invoiceData.subscription.current_cycle.end_at) 
            : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        await doc.ref.update({
            status: 'active',
            usageCurrentMonth: 0, // Zera usos do mês
            currentPeriodEnd: admin.firestore.Timestamp.fromDate(currentCycleEnd),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        // Lança no financeiro do salão
        const amount = (invoiceData.amount || 0) / 100; 
        const paidDate = new Date().toISOString().split('T')[0];

        await db.collection('financial_receivables').add({
            establishmentId: subRecord.establishmentId,
            description: `Renovação de Clube VIP: ${subRecord.planName} (${subRecord.clientName})`,
            amount: amount,
            dueDate: paidDate,
            paymentDate: paidDate,
            status: 'paid',
            origin: 'subscription_auto',
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            paymentDetails: {
                method: invoiceData.payment_method || 'credit_card',
                invoiceId: invoiceData.id
            }
        });

        return console.log(`[WEBHOOK] Assinatura de cliente renovada (Fatura gerada R$ ${amount}).`);
    }

    // 2. TENTA ACHAR NOS ESTABELECIMENTOS (O SEU SAAS)
    const saasQuery = await db.collection('establishments').where('saasSubscription.pagarmeSubscriptionId', '==', subId).get();

    if (!saasQuery.empty) {
        const doc = saasQuery.docs[0];
        await doc.ref.update({
            status: 'active', // 🚀 Libera acesso ao sistema (caso estivesse suspenso)
            'saasSubscription.status': 'active',
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        return console.log(`[WEBHOOK SAAS] Fatura paga pelo salão ${doc.id}. Acesso mantido/restaurado.`);
    }
}

async function handleInvoicePaymentFailed(db, invoiceData) {
    const subId = invoiceData.subscription_id || (invoiceData.subscription ? invoiceData.subscription.id : null);
    if (!subId) return;

    // 1. TENTA ACHAR NOS CLIENTES DO SALÃO
    const clientQuery = await db.collection('client_subscriptions').where('gatewaySubscriptionId', '==', subId).get();
    
    if (!clientQuery.empty) {
        const doc = clientQuery.docs[0];
        await doc.ref.update({
            status: 'past_due',
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        return console.log(`[WEBHOOK] Assinatura do cliente marcada como Atrasada.`);
    }

    // 2. TENTA ACHAR NOS ESTABELECIMENTOS (O SEU SAAS)
    const saasQuery = await db.collection('establishments').where('saasSubscription.pagarmeSubscriptionId', '==', subId).get();

    if (!saasQuery.empty) {
        const doc = saasQuery.docs[0];
        await doc.ref.update({
            status: 'suspended', // 🚀 Suspende acesso ao sistema (inadimplência)
            'saasSubscription.status': 'past_due',
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        return console.log(`[WEBHOOK SAAS] FALHA no pagamento. Salão ${doc.id} bloqueado por inadimplência.`);
    }
}

module.exports = router;