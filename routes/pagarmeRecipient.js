const express = require('express');
const router = express.Router();
const axios = require('axios');
const admin = require('firebase-admin');
const { verifyToken, isOwner } = require('../middlewares/auth');

// Configuração da API Pagar.me
const PAGARME_API = axios.create({
    baseURL: 'https://api.pagar.me/core/v5',
    headers: {
        'Authorization': `Basic ${Buffer.from(process.env.PAGARME_SECRET_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/json'
    }
});

/**
 * ROTA: POST /api/pagarme/onboarding
 * OBJETIVO: Criar o "Recebedor" (Subconta) do estabelecimento para permitir Split de Pagamento.
 */
router.post('/onboarding', verifyToken, isOwner, async (req, res) => {
    const { db } = req;
    const { establishmentId } = req.user;
    const { 
        name, 
        email, 
        document, 
        type, // 'individual' ou 'company'
        bankAccount // { bank, branch_number, account_number, account_check_digit, holder_name, holder_document, holder_type }
    } = req.body;

    if (!name || !document || !bankAccount) {
        return res.status(400).json({ message: "Dados obrigatórios em falta para o onboarding." });
    }

    try {
        // 1. Verificar se o estabelecimento já possui um Recipient ID
        const estRef = db.collection('establishments').doc(establishmentId);
        const estDoc = await estRef.get();
        
        if (estDoc.exists && estDoc.data().pagarmeRecipientId) {
            return res.status(400).json({ 
                message: "Este estabelecimento já possui uma conta de recebedor configurada.",
                recipientId: estDoc.data().pagarmeRecipientId 
            });
        }

        // 2. Formatar o payload para o Pagar.me (Marketplace Recipient)
        const recipientPayload = {
            name,
            email,
            document,
            type,
            default_bank_account: {
                holder_name: bankAccount.holder_name,
                holder_type: bankAccount.holder_type,
                holder_document: bankAccount.holder_document,
                bank: bankAccount.bank,
                branch_number: bankAccount.branch_number,
                account_number: bankAccount.account_number,
                account_check_digit: bankAccount.account_check_digit,
                type: 'checking' // ou 'savings'
            },
            transfer_settings: {
                transfer_enabled: true,
                transfer_interval: 'Daily', // Repasse diário automático
                transfer_day: 0
            },
            automatic_anticipation_settings: {
                enabled: false // Antecipação desativada por padrão por segurança
            }
        };

        // 3. Chamar API do Pagar.me
        console.log(`[PAGARME] Criando recebedor para o Estabelecimento: ${establishmentId}`);
        const response = await PAGARME_API.post('/recipients', recipientPayload);
        const recipientId = response.data.id;

        // 4. Salvar o ID do Recebedor no documento do estabelecimento no Firestore
        await estRef.update({
            pagarmeRecipientId: recipientId,
            pagarmeStatus: 'active',
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        res.status(201).json({
            message: "Conta de recebedor criada com sucesso!",
            recipientId: recipientId
        });

    } catch (error) {
        const errorData = error.response ? error.response.data : error.message;
        console.error("Erro no Onboarding Pagar.me:", JSON.stringify(errorData, null, 2));
        res.status(500).json({ 
            message: "Erro ao processar onboarding no Pagar.me.", 
            details: errorData 
        });
    }
});

/**
 * ROTA: GET /api/pagarme/recipient
 * OBJETIVO: Consultar o status do recebedor
 */
router.get('/recipient', verifyToken, isOwner, async (req, res) => {
    const { db } = req;
    const { establishmentId } = req.user;

    try {
        const estDoc = await db.collection('establishments').doc(establishmentId).get();
        const recipientId = estDoc.data()?.pagarmeRecipientId;

        if (!recipientId) {
            return res.status(404).json({ message: "Recebedor não configurado." });
        }

        const response = await PAGARME_API.get(`/recipients/${recipientId}`);
        res.status(200).json(response.data);

    } catch (error) {
        res.status(500).json({ message: "Erro ao consultar recebedor." });
    }
});

module.exports = router;