/**
 * functions/index.js
 * Backend Kairós: Versão Completa (Push + WhatsApp) com Formato Evolution API v1.8.2 🚀
 */

const { onDocumentCreated, onDocumentUpdated } = require("firebase-functions/v2/firestore");
const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const express = require('express');
const axios = require('axios');

admin.initializeApp();
const db = admin.firestore();

// ============================================================================
// CONFIGURAÇÕES DO SERVIDOR DE WHATSAPP (Evolution API)
// ============================================================================
const EVOLUTION_API_URL = "https://resupinate-dismally-lilyanna.ngrok-free.dev"; 
const EVOLUTION_API_KEY = "kairos_senha_segura";
const INSTANCE_NAME = "kairos_teste"; 

// ============================================================================
// SEÇÃO 1: AJUDANTES (Helpers)
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
    } catch (e) {
        return 'Profissional';
    }
}

async function getTargetTokens(establishmentId, appointmentProfessionalId) {
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

// ============================================================================
// SEÇÃO 2: MOTOR DE ENVIO (Evolution API v1.8.2)
// ============================================================================

async function sendWhatsAppMessage(toPhone, messageText) {
    console.log(`[WHATSAPP] Preparando envio para: ${toPhone}`);
    if (!toPhone) {
        console.log("[WHATSAPP] ❌ Falha: Número de telefone ausente.");
        return;
    }
    
    // Remove parênteses, traços e espaços (+55 16 99176-2287 vira 5516991762287)
    let cleanPhone = toPhone.replace(/\D/g, '');
    
    // Validação Inteligente do DDI: Se não começar com 55, nós colocamos.
    if (!cleanPhone.startsWith('55')) {
        cleanPhone = '55' + cleanPhone;
    }

    // Formato ESTRITO exigido pela Evolution API v1.8.2 para evitar Erro 400
    const payload = {
        "number": cleanPhone,
        "options": {
            "delay": 1200,
            "presence": "composing"
        },
        "textMessage": {
            "text": messageText
        }
    };

    try {
        console.log(`[WHATSAPP] Disparando requisição para Evolution API (${cleanPhone})...`);
        const response = await axios.post(
            `${EVOLUTION_API_URL}/message/sendText/${INSTANCE_NAME}`,
            payload,
            {
                headers: { 
                    'apikey': EVOLUTION_API_KEY, 
                    'Content-Type': 'application/json' 
                }
            }
        );
        console.log(`[WHATSAPP] ✅ SUCESSO! Mensagem enviada para ${cleanPhone}. Resposta:`, response.status);
    } catch (error) {
        // JSON.stringify usado aqui para revelar o erro dentro do array caso falhe novamente
        console.error(`[WHATSAPP] ❌ ERRO NA EVOLUTION API:`, JSON.stringify(error.response?.data || error.message));
    }
}

// ============================================================================
// SEÇÃO 3: GATILHOS DO FIRESTORE (Notificações)
// ============================================================================

exports.sendNewAppointmentNotification = onDocumentCreated(
    "appointments/{appointmentId}",
    async (event) => {
        console.log(`[GATILHO CRIADO] 🚀 NOVO AGENDAMENTO DETECTADO! ID: ${event.params.appointmentId}`);
        
        const appointment = event.data?.data();
        if (!appointment) {
            console.log("[GATILHO CRIADO] ❌ Dados do agendamento estão vazios. Abortando.");
            return;
        }

        console.log(`[GATILHO CRIADO] 📋 Dados capturados:`, JSON.stringify(appointment));

        if (!appointment.establishmentId) {
            console.log("[GATILHO CRIADO] ⚠️ Falta establishmentId no documento. Abortando notificação.");
            return;
        }

        const clientName = appointment.clientName || "Cliente";
        const clientPhone = appointment.clientPhone;
        const serviceName = appointment.serviceName || (appointment.services && appointment.services[0]?.name) || "Serviço";
        const professionalName = await getProfessionalName(appointment.professionalId);
        const dateString = formatDate(appointment.startTime || appointment.time);

        console.log(`[GATILHO CRIADO] 🎯 Processando cliente: ${clientName}, Telefone: ${clientPhone}`);

        // 1. Enviar WhatsApp para o Cliente
        if (clientPhone) {
            const zapMessage = `Olá ${clientName}! 👋\n\nO seu agendamento no Kairós foi confirmado! 🎉\n\n📅 *Data:* ${dateString}\n💇‍♂️ *Serviço:* ${serviceName}\n👤 *Profissional:* ${professionalName}\n\nEsperamos por si!`;
            console.log("[GATILHO CRIADO] Chamando função sendWhatsAppMessage...");
            await sendWhatsAppMessage(clientPhone, zapMessage);
        } else {
            console.log("[GATILHO CRIADO] ⚠️ Cliente não tem telefone registado. Não enviaremos WhatsApp.");
        }

        // 2. Notificação Push para a Equipa
        const tokens = await getTargetTokens(appointment.establishmentId, appointment.professionalId);
        if (tokens.length > 0) {
            console.log(`[GATILHO CRIADO] Enviando Push Notification para ${tokens.length} dispositivo(s).`);
            const message = {
                notification: { title: "📅 Novo Agendamento!", body: `${clientName} agendou para ${dateString}.` },
                tokens: tokens,
            };
            try { 
                await admin.messaging().sendEachForMulticast(message); 
                console.log("[GATILHO CRIADO] ✅ Push enviado com sucesso.");
            } catch (e) { 
                console.error("[GATILHO CRIADO] ❌ Erro ao enviar Push:", e); 
            }
        }
    }
);

exports.sendCancellationNotification = onDocumentUpdated(
    "appointments/{appointmentId}",
    async (event) => {
        console.log(`[GATILHO UPDATE] 🔄 AGENDAMENTO ATUALIZADO: ${event.params.appointmentId}`);
        const before = event.data.before.data();
        const after = event.data.after.data();

        const isCancelled = (after.status === "cancelled" || after.status === "cancelado") &&
                            (before.status !== "cancelled" && before.status !== "cancelado");

        if (isCancelled) {
            console.log(`[GATILHO UPDATE] 🚫 Cancelamento detectado para o cliente: ${after.clientName}`);
            const dateString = formatDate(after.startTime || after.time);

            if (after.clientPhone) {
                const msg = `Olá ${after.clientName || 'Cliente'}. ❌ O seu agendamento para o dia ${dateString} foi CANCELADO.\n\nPara remarcar, acesse o nosso link!`;
                await sendWhatsAppMessage(after.clientPhone, msg);
            }
        }
    }
);

// ============================================================================
// SEÇÃO 4: RECEBENDO MENSAGENS (Webhook)
// ============================================================================

const whatsappApp = express();
whatsappApp.use(express.json());

whatsappApp.post('/webhook', async (req, res) => {
    const body = req.body;
    if (body.event === "messages.upsert") {
        const msgData = body.data;
        if (msgData.key.fromMe) return res.sendStatus(200);

        const phoneNumber = msgData.key.remoteJid.split('@')[0];
        const textBody = msgData.message?.conversation || msgData.message?.extendedTextMessage?.text;
        
        console.log(`[WEBHOOK] 📩 Nova mensagem de ${phoneNumber}: ${textBody}`);

        if (textBody?.toLowerCase() === 'oi' || textBody?.toLowerCase() === 'olá') {
            await sendWhatsAppMessage(phoneNumber, "Olá! O sistema Kairós está online. Como posso ajudar? 😎");
        }
    }
    res.sendStatus(200);
});

exports.whatsapp = onRequest(whatsappApp);