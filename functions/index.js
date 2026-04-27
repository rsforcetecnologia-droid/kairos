/**
 * functions/index.js
 * Backend Kairós SaaS: Notificações + Bot de Menus + QR Code + Motor de Cobrança (Assinaturas) 🚀
 */

const { onDocumentCreated, onDocumentUpdated } = require("firebase-functions/v2/firestore");
const { onRequest } = require("firebase-functions/v2/https");
const { onSchedule } = require("firebase-functions/v2/scheduler"); // 🚀 NOVO: Necessário para os Cron Jobs
const admin = require("firebase-admin");
const express = require('express');
const axios = require('axios');
const cors = require('cors')({ origin: true });

if (!admin.apps.length) {
    admin.initializeApp();
}
const db = admin.firestore();

// ============================================================================
// CONFIGURAÇÕES GERAIS DO SERVIDOR E WEBHOOK (ATUALIZADO PARA EASYPANEL)
// ============================================================================
const EVOLUTION_API_URL = "https://kinghost-evolution-api.tm5bar.easypanel.host"; 
const GLOBAL_API_KEY = "429683C4C977415CAAFCCE10F7D57E11";

// URL DE PRODUÇÃO DO SEU NÓ "WEBHOOK" LÁ DO N8N:
const N8N_WEBHOOK_URL = "https://kinghost-n8n.tm5bar.easypanel.host/webhook/kairos-whatsapp"; 

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
            "delay": 0, 
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
        console.error(`[WHATSAPP] Erro ao enviar mensagem:`, error.message);
    }
}

// ============================================================================
// 🚀 SEÇÃO 3: CRON JOBS - MOTOR DE COBRANÇA DE ASSINATURAS (NOVO)
// ============================================================================

/**
 * Roda todos os dias às 09:00 da manhã (Horário de São Paulo)
 * Verifica assinaturas em atraso e manda WhatsApp de cobrança.
 */
exports.dailySubscriptionCheck = onSchedule({
    schedule: "0 9 * * *", 
    timeZone: "America/Sao_Paulo",
    memory: "512MiB"
}, async (event) => {
    console.log("[CRON] Iniciando rotina diária de verificação de assinaturas...");
    
    try {
        // 1. Buscar todas as assinaturas marcadas como 'past_due' (Em atraso)
        const pastDueSnapshot = await db.collection('client_subscriptions')
            .where('status', '==', 'past_due')
            .get();

        if (pastDueSnapshot.empty) {
            console.log("[CRON] Nenhuma assinatura em atraso encontrada hoje.");
            return;
        }

        const now = new Date();
        const batch = db.batch();

        for (const doc of pastDueSnapshot.docs) {
            const sub = doc.data();
            
            // Verifica se já mandamos aviso nos últimos 3 dias para não ser spam
            if (sub.lastDunningNotice) {
                const lastNoticeDate = sub.lastDunningNotice.toDate();
                const diffTime = Math.abs(now - lastNoticeDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (diffDays <= 3) {
                    continue; // Pula este cliente, foi avisado recentemente
                }
            }

            // Buscar os dados da loja para saber qual o WhatsApp Bot a usar
            const shop = await getEstablishmentData(sub.establishmentId);
            if (!shop || !shop.whatsappInstance) continue;

            const clientPhone = sub.clientId; // O clientId no nosso sistema é o telefone
            const firstName = (sub.clientName || 'Cliente').split(' ')[0];
            const planName = sub.planName || 'Plano de Assinatura';

            // Mensagem elegante de cobrança
            const msg = `Olá ${firstName}! 💎\n\nIdentificámos um problema com o pagamento do seu *${planName}* na ${shop.name}.\n\nPara garantir que continua a aproveitar os seus benefícios exclusivos e descontos, por favor atualize o seu método de pagamento.\n\nQualquer dúvida, responda a esta mensagem para falar com a nossa equipa!`;

            // Envia o WhatsApp
            await sendWhatsAppMessage(clientPhone, msg, shop.whatsappInstance);
            console.log(`[CRON] Aviso de cobrança enviado para ${clientPhone} (${shop.name})`);

            // Regista que avisamos hoje
            batch.update(doc.ref, {
                lastDunningNotice: admin.firestore.FieldValue.serverTimestamp()
            });
        }

        await batch.commit();
        console.log("[CRON] Rotina de assinaturas concluída com sucesso.");

    } catch (error) {
        console.error("[CRON] Erro ao processar assinaturas:", error);
    }
});


// ============================================================================
// SEÇÃO 4: GATILHOS DO FIRESTORE (Notificações Automáticas da Agenda)
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
            // 🚀 Se for coberto por plano, altera a mensagem ligeiramente
            const vipText = appointment.coveredByPlan ? "\n💎 *Membro VIP:* Este serviço está coberto pelo seu clube!" : "";
            const zapMessage = `Olá ${clientName}! 👋\n\nO seu agendamento na *${shop.name || 'Barbearia'}* foi confirmado! 🎉\n\n📅 *Data:* ${dateString}\n💇‍♂️ *Serviço:* ${serviceName}\n👤 *Profissional:* ${professionalName}${vipText}\n\nEsperamos por você!`;
            
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
// SEÇÃO 5: API PARA O PAINEL DO CLIENTE E BOT ANTIGO
// ============================================================================
const whatsappApp = express();
whatsappApp.use(express.json());
whatsappApp.use(cors); 

whatsappApp.post('/webhook', async (req, res) => {
    res.sendStatus(200);
});

whatsappApp.post('/api/whatsapp/connect', async (req, res) => {
    const { establishmentId } = req.body;
    if (!establishmentId) return res.status(400).json({ error: "Falta o ID do estabelecimento." });

    const instanceName = `kairos_${establishmentId}`;
    const headers = { 'apikey': GLOBAL_API_KEY, 'Content-Type': 'application/json' };

    try {
        console.log(`[PAINEL] Iniciando conexão para: ${instanceName}`);
        let qrcodeBase64 = '';

        try {
            const createPayload = { instanceName: instanceName, qrcode: true, integration: "WHATSAPP-BAILEYS" };
            const createResponse = await axios.post(`${EVOLUTION_API_URL}/instance/create`, createPayload, { headers });
            qrcodeBase64 = createResponse.data?.qrcode?.base64 || createResponse.data?.base64 || createResponse.data?.qrcode;

            console.log(`[PAINEL] Instância criada. Configurando Webhook do n8n...`);
            await axios.post(`${EVOLUTION_API_URL}/webhook/set/${instanceName}`, {
                webhook: {
                    enabled: true,
                    url: N8N_WEBHOOK_URL,
                    byEvents: false,
                    base64: false,
                    events: ["MESSAGES_UPSERT", "CONNECTION_UPDATE"]
                }
            }, { headers });

        } catch (error) {
            const status = error.response?.status;
            const errorMsg = JSON.stringify(error.response?.data || error.message);
            if (status === 400 || status === 403 || errorMsg.includes('already exists')) {
                const connectResponse = await axios.get(`${EVOLUTION_API_URL}/instance/connect/${instanceName}`, { headers });
                qrcodeBase64 = connectResponse.data?.base64 || connectResponse.data?.qrcode;
            } else {
                throw error;
            }
        }

        res.json({ success: true, qrcode: qrcodeBase64, instanceName: instanceName });

    } catch (error) {
        res.status(500).json({ error: "Erro ao configurar WhatsApp na VPS." });
    }
});

whatsappApp.get('/api/whatsapp/status/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    const instanceName = `kairos_${establishmentId}`;
    const headers = { 'apikey': GLOBAL_API_KEY };

    try {
        const response = await axios.get(`${EVOLUTION_API_URL}/instance/connectionState/${instanceName}`, { headers });
        const state = response.data?.instance?.state; 

        if (state === 'open') {
            await db.collection('establishments').doc(establishmentId).update({ whatsappInstance: instanceName });
            return res.status(200).json({ connected: true, instanceName });
        } else {
            return res.status(200).json({ connected: false, state });
        }
    } catch (error) {
        return res.status(200).json({ connected: false, state: 'not_found' });
    }
});

whatsappApp.post('/api/whatsapp/disconnect', async (req, res) => {
    const { establishmentId } = req.body;
    if (!establishmentId) return res.status(400).json({ error: "ID ausente." });

    const instanceName = `kairos_${establishmentId}`;

    try {
        try { await axios.delete(`${EVOLUTION_API_URL}/instance/delete/${instanceName}`, { headers: { 'apikey': GLOBAL_API_KEY } }); } catch (e) {}
        await db.collection('establishments').doc(establishmentId).update({ whatsappInstance: admin.firestore.FieldValue.delete() });
        res.json({ success: true, message: "Desconectado com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: "Falha ao remover conexão." });
    }
});

exports.whatsapp = onRequest(whatsappApp);