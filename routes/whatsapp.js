// routes/whatsapp.js

const express = require('express');
const router = express.Router();
const axios = require('axios'); // Precisamos do axios para fazer a requisição à Meta

// As suas chaves de acesso da Meta
const WHATSAPP_TOKEN = "EAAXQuDXsT9YBRCzaGV47TNbGJm0X7lljhc14jsfz4gWqhH7o97yv3lMKQDHUkZAaxl73RAgD4GfOLVN2dTvCYOMrvO7re7LUkfbYgr7HDNvkqnEQNUzacgjpB4yBkCeNjUfbxhSZBwMQsJF7Df9dL5b2neJEexO9NIjk06H3BAgZA6flJBCWE5GpsjdUCWDd4kdfPA1VyHIG6ebIUxFK7kT54Tk7hdvfQI5SdhVkT8mdTZBRDZA28Dlnjdv4eZBrSz14px6OJZAgpRG8gclYSac5SZAQbaPhsZBkVMkoZD";
const PHONE_NUMBER_ID = "1042749625588268";

// Rota de Teste para o Primeiro Envio
router.post('/send-test', async (req, res) => {
    // O número de destino deve ser o que você autorizou lá no painel da Meta
    // Formato: 55 + DDD + Numero (ex: 5511999999999)
    const { to } = req.body;

    if (!to) {
        return res.status(400).json({ error: "O número de destino (to) é obrigatório." });
    }

    try {
        // Envia a mensagem usando a API oficial da Meta
        const response = await axios.post(
            `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                to: to,
                type: "template",
                template: {
                    name: "hello_world", // Template padrão gratuito da Meta para testes
                    language: { code: "en_US" }
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.status(200).json({ success: true, message: "Mensagem enviada com sucesso!", data: response.data });
    } catch (error) {
        console.error("Erro na API do WhatsApp:", error.response?.data || error.message);
        res.status(500).json({ success: false, error: error.response?.data || error.message });
    }
});

module.exports = router;