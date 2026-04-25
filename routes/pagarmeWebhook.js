// routes/pagarmeWebhook.js (Ouvinte de Eventos do Gateway)

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// 🚀 IMPORTANTE: O Webhook não usa verifyToken, pois a chamada vem do servidor do Pagar.me.
// A segurança baseia-se na origem da chamada (ou na assinatura do header, opcionalmente).

router.post('/', async (req, res) => {
    const { db } = req;
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
    
    // Procura no Firestore qual a assinatura que tem este ID do Gateway
    const subQuery = await db.collection('client_subscriptions').where('gatewaySubscriptionId', '==', subId).get();
    
    if (!subQuery.empty) {
        const doc = subQuery.docs[0];
        await doc.ref.update({
            status: 'canceled',
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log(`[WEBHOOK] Assinatura ${subId} cancelada com sucesso no Firestore.`);
    }
}

async function handleInvoicePaid(db, invoiceData) {
    // Na V5, o invoice traz o objeto subscription embutido
    const subId = invoiceData.subscription_id || (invoiceData.subscription ? invoiceData.subscription.id : null);
    if (!subId) return;

    const subQuery = await db.collection('client_subscriptions').where('gatewaySubscriptionId', '==', subId).get();
    
    if (!subQuery.empty) {
        const doc = subQuery.docs[0];
        const subRecord = doc.data();

        // Extrai a nova data de vencimento do ciclo (Se não existir, joga 1 mês para a frente)
        const currentCycleEnd = invoiceData.subscription?.current_cycle?.end_at 
            ? new Date(invoiceData.subscription.current_cycle.end_at) 
            : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        // 1. RENOVAÇÃO DO PLANO: Ativa a assinatura e ZERA os usos do mês!
        await doc.ref.update({
            status: 'active',
            usageCurrentMonth: 0, // 🚀 Devolve os limites de serviço ao cliente
            currentPeriodEnd: admin.firestore.Timestamp.fromDate(currentCycleEnd),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        // 2. INTEGRAÇÃO FINANCEIRA: Lança o dinheiro no caixa do estabelecimento
        const amount = (invoiceData.amount || 0) / 100; // Pagar.me envia em centavos
        const paidDate = new Date().toISOString().split('T')[0];

        await db.collection('financial_receivables').add({
            establishmentId: subRecord.establishmentId,
            description: `Renovação de Clube VIP: ${subRecord.planName} (${subRecord.clientName})`,
            amount: amount,
            dueDate: paidDate,
            paymentDate: paidDate,
            status: 'paid', // O dinheiro já foi pago
            origin: 'subscription_auto',
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            paymentDetails: {
                method: invoiceData.payment_method || 'credit_card',
                invoiceId: invoiceData.id
            }
        });

        console.log(`[WEBHOOK] Assinatura renovada para ${subRecord.clientName}. Usos zerados e Fatura (R$ ${amount}) gerada.`);
    }
}

async function handleInvoicePaymentFailed(db, invoiceData) {
    const subId = invoiceData.subscription_id || (invoiceData.subscription ? invoiceData.subscription.id : null);
    if (!subId) return;

    const subQuery = await db.collection('client_subscriptions').where('gatewaySubscriptionId', '==', subId).get();
    
    if (!subQuery.empty) {
        const doc = subQuery.docs[0];
        await doc.ref.update({
            status: 'past_due', // 🚀 Bloqueia os benefícios na agenda e no PDV
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log(`[WEBHOOK] Assinatura ${subId} marcada como Atrasada (Inadimplente).`);
    }
}

module.exports = router;