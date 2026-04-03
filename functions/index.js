/**
 * functions/index.js
 * Backend Kairós SaaS: Notificações + Bot de Menus + QR Code + Anti-Spam 🚀
 */

const { onDocumentCreated, onDocumentUpdated } = require("firebase-functions/v2/firestore");
const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const express = require('express');
const axios = require('axios');
const cors = require('cors')({ origin: true });

admin.initializeApp();
const db = admin.firestore();

// ============================================================================
// CONFIGURAÇÕES GERAIS DO SERVIDOR E WEBHOOK (ATUALIZADO PARA EASYPANEL)
// ============================================================================
const EVOLUTION_API_URL = "https://kinghost-evolution-api.tm5bar.easypanel.host"; 
const GLOBAL_API_KEY = "429683C4C977415CAAFCCE10F7D57E11";

// 🚨 ATENÇÃO: COLOQUE AQUI A URL DE PRODUÇÃO DO SEU NÓ "WEBHOOK" LÁ DO N8N:
const N8N_WEBHOOK_URL = "https://kinghost-n8n.tm5bar.easypanel.host/webhook-test/whatsapp"; 

// ============================================================================
// SEÇÃO 1: AJUDANTES (Helpers) E MULTITENANT
// ============================================================================

function formatDate(dateValue) {
    if (!dateValue) return 'Data indefinida';
    const date = dateValue.toDate ? dateValue.toDate() : new Date(dateValue);
    if (isNaN(date.getTime())) return 'Data inválida';
    return date.toLocaleString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo'
    });
}

async function getProfessionalName(professionalId) {
    if (!professionalId) return 'Profissional';
    try {
        const docSnap = await db.collection('professionals').doc(professionalId).get();
        if (docSnap.exists) return docSnap.data().name || 'Profissional';
        return 'Profissional';
    } catch (e) { return 'Profissional'; }
}

async function getTargetTokens(establishmentId) {
    if (!establishmentId) return [];
    const snapshotUsers = await db.collection("users").where("establishmentId", "==", establishmentId).get();
    const tokens = [];
    snapshotUsers.forEach((doc) => {
        const userData = doc.data();
        if (userData.fcmTokens && Array.isArray(userData.fcmTokens)) {
            tokens.push(...userData.fcmTokens);
        } else if (userData.fcmToken) {
            tokens.push(userData.fcmToken);
        }
    });
    return [...new Set(tokens)];
}

async function getEstablishmentData(establishmentId) {
    if (!establishmentId) return null;
    const docSnap = await db.collection('establishments').doc(establishmentId).get();
    return docSnap.exists ? { id: docSnap.id, ...docSnap.data() } : null;
}

async function getEstablishmentByInstance(instanceName) {
    if (!instanceName) return null;
    const snapshot = await db.collection('establishments').where('whatsappInstance', '==', instanceName).limit(1).get();
    if (snapshot.empty) return null;
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}

async function getClientAppointments(customerPhone, establishmentId) {
    const now = new Date();
    const snapshot = await db.collection('appointments')
        .where('establishmentId', '==', establishmentId)
        .where('status', 'in', ['pending', 'confirmed'])
        .get();

    const appointments = [];
    snapshot.forEach(doc => {
        const data = doc.data();
        const date = data.startTime ? data.startTime.toDate() : new Date(data.time);
        
        if (date > now && data.clientPhone) {
            let dbPhone = data.clientPhone.replace(/\D/g, '');
            if (!dbPhone.startsWith('55')) dbPhone = '55' + dbPhone;
            
            if (dbPhone === customerPhone) {
                appointments.push({ id: doc.id, ...data, date });
            }
        }
    });
    
    return appointments.sort((a, b) => a.date - b.date);
}

// ============================================================================
// SEÇÃO 2: MOTOR DE ENVIO DINÂMICO (LIMPEZA DE NÚMEROS)
// ============================================================================

async function sendWhatsAppMessage(toPhone, messageText, instanceName) {
    if (!toPhone || !instanceName) return;
    
    let cleanPhone = toPhone.replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) cleanPhone = cleanPhone.substring(1);
    if (!cleanPhone.startsWith('55')) cleanPhone = '55' + cleanPhone;
    if (cleanPhone.startsWith('550')) cleanPhone = '55' + cleanPhone.substring(3);

    const payload = {
        "number": cleanPhone,
        "options": { 
            "delay": 0, // Velocidade máxima
            "presence": "composing" 
        },
        "textMessage": { "text": messageText }
    };

    try {
        await axios.post(
            `${EVOLUTION_API_URL}/message/sendText/${instanceName}`,
            payload,
            { headers: { 'apikey': GLOBAL_API_KEY, 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error(`[WHATSAPP] Erro:`, error.message);
    }
}

// ============================================================================
// SEÇÃO 3: GATILHOS DO FIRESTORE (Notificações Automáticas)
// ============================================================================

exports.sendNewAppointmentNotification = onDocumentCreated(
    "appointments/{appointmentId}",
    async (event) => {
        console.log(`[GATILHO-CRIAR] ⚡ Novo agendamento disparado! ID: ${event.params.appointmentId}`);
        
        const appointment = event.data?.data();
        if (!appointment || !appointment.establishmentId) return;

        const shop = await getEstablishmentData(appointment.establishmentId);
        if (!shop || !shop.whatsappInstance) return;

        const clientName = appointment.clientName || "Cliente";
        const clientPhone = appointment.clientPhone;
        const serviceName = appointment.serviceName || (appointment.services && appointment.services[0]?.name) || "Serviço";
        const professionalName = await getProfessionalName(appointment.professionalId);
        const dateString = formatDate(appointment.startTime || appointment.time);

        if (clientPhone) {
            const zapMessage = `Olá ${clientName}! 👋\n\nO seu agendamento na *${shop.name || 'Barbearia'}* foi confirmado! 🎉\n\n📅 *Data:* ${dateString}\n💇‍♂️ *Serviço:* ${serviceName}\n👤 *Profissional:* ${professionalName}\n\nEsperamos por você!`;
            await sendWhatsAppMessage(clientPhone, zapMessage, shop.whatsappInstance);
        }

        const tokens = await getTargetTokens(appointment.establishmentId);
        if (tokens.length > 0) {
            const message = { notification: { title: "📅 Novo Agendamento!", body: `${clientName} agendou para ${dateString}.` }, tokens: tokens };
            try { await admin.messaging().sendEachForMulticast(message); } catch (e) { console.error("Erro Push:", e); }
        }
    }
);

exports.sendCancellationNotification = onDocumentUpdated(
    "appointments/{appointmentId}",
    async (event) => {
        const before = event.data.before.data();
        const after = event.data.after.data();

        const isCancelled = (after.status === "cancelled" || after.status === "cancelado") &&
                            (before.status !== "cancelled" && before.status !== "cancelado");

        if (isCancelled && after.establishmentId) {
            const shop = await getEstablishmentData(after.establishmentId);
            if (!shop || !shop.whatsappInstance) return;

            const dateString = formatDate(after.startTime || after.time);
            if (after.clientPhone) {
                const msg = `Olá ${after.clientName || 'Cliente'}. ❌ O seu agendamento na *${shop.name || 'Barbearia'}* para o dia ${dateString} foi CANCELADO.\n\nPara remarcar, acesse o nosso link!`;
                await sendWhatsAppMessage(after.clientPhone, msg, shop.whatsappInstance);
            }
        }
    }
);

// ============================================================================
// SEÇÃO 4: BOT ANTIGO DO KAIRÓS (Será substituído pelo n8n, mas mantido para segurança)
// ============================================================================
const whatsappApp = express();
whatsappApp.use(express.json());
whatsappApp.use(cors); 

whatsappApp.post('/webhook', async (req, res) => {
    // Como você vai usar o n8n, o tráfego de mensagens vai todo para lá.
    // Esta rota interna não será mais ativada pela Evolution, mas a mantemos aqui
    // caso você queira fazer regras internas no futuro.
    res.sendStatus(200);
});

// ============================================================================
// SEÇÃO 5: API PARA O PAINEL DO CLIENTE (Conectar e Desconectar) - Integração n8n
// ============================================================================

// 1. Rota para Gerar QR Code e Configurar Webhook no n8n
whatsappApp.post('/api/whatsapp/connect', async (req, res) => {
    const { establishmentId } = req.body;
    if (!establishmentId) return res.status(400).json({ error: "Falta o ID do estabelecimento." });

    const instanceName = `kairos_${establishmentId}`;
    const headers = { 'apikey': GLOBAL_API_KEY, 'Content-Type': 'application/json' };

    try {
        console.log(`[PAINEL] Iniciando conexão para: ${instanceName}`);
        let qrcodeBase64 = '';

        try {
            // 1. Tenta criar a instância (Evolution V2)
            const createPayload = {
                instanceName: instanceName,
                qrcode: true,
                integration: "WHATSAPP-BAILEYS"
            };
            
            const createResponse = await axios.post(`${EVOLUTION_API_URL}/instance/create`, createPayload, { headers });
            qrcodeBase64 = createResponse.data?.qrcode?.base64 || createResponse.data?.base64 || createResponse.data?.qrcode;

            console.log(`[PAINEL] Instância criada. Configurando Webhook do n8n...`);
            
            // 2. Seta o Webhook do n8n para esta nova instância
            await axios.post(`${EVOLUTION_API_URL}/webhook/set/${instanceName}`, {
                webhook: {
                    enabled: true,
                    url: N8N_WEBHOOK_URL,
                    byEvents: false, // Na V2 usa-byEvents
                    base64: false,
                    events: ["MESSAGES_UPSERT", "CONNECTION_UPDATE"]
                }
            }, { headers });

        } catch (error) {
            const status = error.response?.status;
            const errorMsg = JSON.stringify(error.response?.data || error.message);
            console.log(`[PAINEL] Retorno API Evolution: ${errorMsg}`);
            
            // Se a instância já existir, apenas puxa o QR Code novamente
            if (status === 400 || status === 403 || errorMsg.includes('already exists')) {
                console.log(`[PAINEL] Instância já existe. Buscando QR Code...`);
                const connectResponse = await axios.get(`${EVOLUTION_API_URL}/instance/connect/${instanceName}`, { headers });
                qrcodeBase64 = connectResponse.data?.base64 || connectResponse.data?.qrcode;
            } else {
                throw error;
            }
        }

        // Devolve o QR Code para a tela do usuário no Kairós
        res.json({ success: true, qrcode: qrcodeBase64, instanceName: instanceName });

    } catch (error) {
        console.error(`[PAINEL] ERRO NO CONNECT:`, error.response?.data || error.message);
        res.status(500).json({ error: "Erro ao configurar WhatsApp na VPS." });
    }
});

// 2. Rota de Polling: Verifica se o cliente já escaneou o QR Code
whatsappApp.get('/api/whatsapp/status/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    const instanceName = `kairos_${establishmentId}`;
    const headers = { 'apikey': GLOBAL_API_KEY };

    try {
        const response = await axios.get(`${EVOLUTION_API_URL}/instance/connectionState/${instanceName}`, { headers });
        const state = response.data?.instance?.state; 

        if (state === 'open') {
            // SUCESSO! O cliente escaneou o código. Salvamos isso no BD:
            await db.collection('establishments').doc(establishmentId).update({
                whatsappInstance: instanceName
            });
            return res.status(200).json({ connected: true, instanceName });
        } else {
            // Ainda está 'connecting' ou 'close'
            return res.status(200).json({ connected: false, state });
        }
    } catch (error) {
        return res.status(200).json({ connected: false, state: 'not_found' });
    }
});

// 3. Rota para Desconectar e Apagar Instância
whatsappApp.post('/api/whatsapp/disconnect', async (req, res) => {
    const { establishmentId } = req.body;
    if (!establishmentId) return res.status(400).json({ error: "ID ausente." });

    const instanceName = `kairos_${establishmentId}`;

    try {
        console.log(`[PAINEL] Solicitando desconexão da instância: ${instanceName}`);
        
        // Deleta a instância na Evolution API (VPS)
        try {
            await axios.delete(`${EVOLUTION_API_URL}/instance/delete/${instanceName}`, {
                headers: { 'apikey': GLOBAL_API_KEY }
            });
        } catch (e) {
            console.log("A instância já não existia na VPS.");
        }

        // Limpa os campos no Firebase
        await db.collection('establishments').doc(establishmentId).update({
            whatsappInstance: admin.firestore.FieldValue.delete()
        });

        res.json({ success: true, message: "Desconectado com sucesso!" });

    } catch (error) {
        console.error(`[PAINEL] Erro ao desconectar:`, error.message);
        res.status(500).json({ error: "Falha ao remover conexão." });
    }
});

exports.whatsapp = onRequest(whatsappApp);