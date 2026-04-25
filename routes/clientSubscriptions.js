// routes/clientSubscriptions.js (Gestão B2C de Assinaturas pelo CRM/Admin da Unidade)

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const axios = require('axios');
const { verifyToken, hasAccess } = require('../middlewares/auth');

// Configuração da API Pagar.me
const PAGARME_API = axios.create({
    baseURL: 'https://api.pagar.me/core/v5',
    headers: {
        'Authorization': `Basic ${Buffer.from(process.env.PAGARME_SECRET_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/json'
    }
});

// Middleware: Apenas donos e funcionários da unidade podem aceder
router.use(verifyToken, hasAccess);

/**
 * ROTA: GET /api/client-subscriptions/client/:phone
 * OBJETIVO: Listar as assinaturas de um cliente na sua Ficha de CRM
 */
router.get('/client/:phone', async (req, res) => {
    const { phone } = req.params;
    const { db } = req;
    
    // Pega as lojas que o funcionário atual pode visualizar
    const accessibleEsts = req.user.accessibleEstablishments || [];
    const validEstIds = new Set([
        req.user.establishmentId, 
        ...accessibleEsts.map(e => typeof e === 'string' ? e : e.id)
    ]);

    try {
        const snapshot = await db.collection('client_subscriptions')
            .where('clientId', '==', phone)
            .get();

        // Filtra em memória para garantir que o utilizador só vê as assinaturas das suas lojas
        const subs = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(sub => validEstIds.has(sub.establishmentId));

        res.status(200).json(subs);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar assinaturas do cliente." });
    }
});

/**
 * ROTA: POST /api/client-subscriptions/cancel/:subId
 * OBJETIVO: Cancelar manualmente a assinatura a pedido do cliente no Balcão
 */
router.post('/cancel/:subId', async (req, res) => {
    const { subId } = req.params;
    const { db } = req;

    try {
        const subRef = db.collection('client_subscriptions').doc(subId);
        const subDoc = await subRef.get();
        
        if (!subDoc.exists) throw new Error("Assinatura não encontrada no sistema.");

        const subData = subDoc.data();
        const gatewayId = subData.gatewaySubscriptionId;

        // 1. Cancela a cobrança futura diretamente no Pagar.me
        if (gatewayId) {
            try {
                await PAGARME_API.delete(`/subscriptions/${gatewayId}`);
                console.log(`[API] Assinatura ${gatewayId} cancelada no Pagar.me com sucesso.`);
            } catch (pagarmeErr) {
                console.error("[API] Erro ao cancelar no Pagar.me:", pagarmeErr.response?.data || pagarmeErr.message);
                throw new Error("Erro ao comunicar o cancelamento à operadora de cartão.");
            }
        }

        // 2. Atualiza o status local para impedir agendamentos grátis
        await subRef.update({
            status: 'canceled',
            canceledAt: admin.firestore.FieldValue.serverTimestamp()
        });

        res.status(200).json({ message: 'Assinatura cancelada com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;