const express = require('express');
const router = express.Router();
const axios = require('axios');

// IMPORTANTE: Importe o seu módulo de banco de dados (ex: Firebase Admin)
// const db = require('../firebase-admin'); // Ajuste o caminho conforme seu projeto

// Configurações da sua Evolution API no Easypanel
const EVOLUTION_API_URL = "https://kinghost-evolution-api.tm5bar.easypanel.host";
const EVOLUTION_API_KEY = "429683C4C977415CAAFCCE10F7D57E11";

// Crie um workflow no n8n com o nó "Webhook" (POST), copie a URL de Teste/Produção e cole aqui:
const N8N_WEBHOOK_URL = "https://kinghost-n8n.tm5bar.easypanel.host/webhook/cf0f4c80-7c98-4c3f-876b-a0ffba5c4567"; 

// 1. Rota para Criar Instância, Configurar Webhook e Gerar QR Code
router.post('/connect', async (req, res) => {
    const { establishmentId } = req.body;

    if (!establishmentId) {
        return res.status(400).json({ error: "O ID do estabelecimento é obrigatório." });
    }

    const instanceName = `kairos_${establishmentId}`;

    try {
        // Passo 1: Criar a instância na Evolution API
        const createResponse = await axios.post(
            `${EVOLUTION_API_URL}/instance/create`,
            {
                instanceName: instanceName,
                qrcode: true, // Já solicita o retorno do QR Code
                integration: "WHATSAPP-BAILEYS"
            },
            {
                headers: {
                    'apikey': EVOLUTION_API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Passo 2: Configurar automaticamente o Webhook para o n8n
        await axios.post(
            `${EVOLUTION_API_URL}/webhook/set/${instanceName}`,
            {
                webhook: {
                    url: N8N_WEBHOOK_URL,
                    byEvents: false,
                    base64: false,
                    events: [
                        "MESSAGES_UPSERT",    // O n8n vai receber as mensagens
                        "CONNECTION_UPDATE"   // O n8n saberá se o cliente desconectou
                    ]
                }
            },
            {
                headers: { 'apikey': EVOLUTION_API_KEY }
            }
        );

        // Extrai o QR code em Base64 retornado pela Evolution
        const qrCodeBase64 = createResponse.data?.qrcode?.base64 || createResponse.data?.base64;

        res.status(200).json({
            success: true,
            instanceName: instanceName,
            qrcode: qrCodeBase64
        });

    } catch (error) {
        console.error("Erro na Evolution:", error.response?.data || error.message);
        
        // Se a instância já existir, vamos tentar resgatar o QR Code atual dela
        if (error.response?.data?.response?.message?.includes('already exists') || error.response?.data?.error?.includes('already exists')) {
             try {
                 const connectResponse = await axios.get(`${EVOLUTION_API_URL}/instance/connect/${instanceName}`, {
                     headers: { 'apikey': EVOLUTION_API_KEY }
                 });
                 return res.status(200).json({
                    success: true,
                    instanceName: instanceName,
                    qrcode: connectResponse.data?.base64
                 });
             } catch (connectErr) {
                 return res.status(500).json({ error: "Instância já existe, mas falhou ao gerar QR Code." });
             }
        }

        res.status(500).json({ success: false, error: "Falha ao criar instância no WhatsApp." });
    }
});

// 2. Rota para Verificar o Status da Conexão (O Frontend vai perguntar de 5 em 5s)
router.get('/status/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    const instanceName = `kairos_${establishmentId}`;

    try {
        const response = await axios.get(`${EVOLUTION_API_URL}/instance/connectionState/${instanceName}`, {
            headers: { 'apikey': EVOLUTION_API_KEY }
        });

        const state = response.data?.instance?.state; // Pode ser 'open', 'close', 'connecting'

        if (state === 'open') {
            // SUCESSO! AQUI VOCÊ ATUALIZA O SEU BANCO DE DADOS (Exemplo Firebase):
            // await db.collection('establishments').doc(establishmentId).update({ whatsappInstance: instanceName });

            return res.status(200).json({ connected: true, instanceName });
        } else {
            return res.status(200).json({ connected: false, state });
        }
    } catch (error) {
        return res.status(200).json({ connected: false, state: 'not_found' });
    }
});

// 3. Rota para Desconectar e Deletar a Instância
router.post('/disconnect', async (req, res) => {
    const { establishmentId } = req.body;
    const instanceName = `kairos_${establishmentId}`;

    try {
        // Deleta a instância na Evolution API (limpa o cache e a sessão)
        await axios.delete(`${EVOLUTION_API_URL}/instance/delete/${instanceName}`, {
            headers: { 'apikey': EVOLUTION_API_KEY }
        });

        // AQUI VOCÊ REMOVE A INSTÂNCIA DO SEU BANCO DE DADOS:
        // await db.collection('establishments').doc(establishmentId).update({ whatsappInstance: null });

        res.status(200).json({ success: true, message: "Instância deletada com sucesso." });
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ success: false, error: "Erro ao desconectar." });
    }
});

module.exports = router;