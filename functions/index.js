/**
 * functions/index.js
 * Backend Kairós: Versão Completa com Evolution API via Ngrok
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
// SEÇÃO 1: AJUDANTES (Helpers Robustos)
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

// Busca o nome do profissional em 'professionals' ou 'users'
async function getProfessionalName(professionalId) {
    if (!professionalId) return 'Profissional';
    try {
        const docSnap = await db.collection('professionals').doc(professionalId).get();
        if (docSnap.exists) return docSnap.data().name || 'Profissional';
        
        const userSnap = await db.collection('users').doc(professionalId).get();
        if(userSnap.exists) return userSnap.data().name || 'Profissional';
        
        return 'Profissional';
    } catch (e) {
        return 'Profissional';
    }
}

// Lógica complexa de tokens e permissões que você tinha no código maior
async function getTargetTokens(establishmentId, appointmentProfessionalId) {
    if (!establishmentId) return [];
    const snapshotUsers = await db.collection("users").where("establishmentId", "==", establishmentId).get();
    if (snapshotUsers.empty) return [];

    const tokens = [];
    snapshotUsers.forEach((doc) => {
        const userData = doc.data();
        // Verifica se o usuário tem permissão para ver todos ou se é o próprio profissional do agendamento
        const canViewAll = (userData.permissions?.['agenda-section']?.view_all_prof === true) || 
                          !userData.permissions || 
                          userData.view_all_prof === true; 
        
        if (canViewAll || userData.professionalId === appointmentProfessionalId) {
            if (userData.fcmTokens && Array.isArray(userData.fcmTokens)) {
                tokens.push(...userData.fcmTokens);
            } else if (userData.fcmToken) {
                tokens.push(userData.fcmToken);
            }
        }
    });
    return [...new Set(tokens)];
}

// ============================================================================
// SEÇÃO 2: MOTOR DE ENVIO (Evolution API)
// ============================================================================

async function sendWhatsAppMessage(toPhone, messageText) {
    if (!toPhone) return;
    
    // Limpa o número: deixa só dígitos
    let cleanPhone = toPhone.replace(/\D/g, '');
    
    // Garante o DDI 55 (Brasil) se o número for curto
    if (cleanPhone.length <= 11) cleanPhone = '55' + cleanPhone;

    try {
        await axios.post(
            `${EVOLUTION_API_URL}/message/sendText/${INSTANCE_NAME}`,
            {
                "number": cleanPhone,
                "text": messageText
            },
            {
                headers: { 
                    'apikey': EVOLUTION_API_KEY, 
                    'Content-Type': 'application/json' 
                }
            }
        );
        console.log(`✅ Tentativa de envio para ${cleanPhone} processada.`);
    } catch (error) {
        // Isso vai mostrar no console do Firebase o motivo real se falhar
        console.error(`❌ Erro detalhado na Evolution API:`, error.response?.data || error.message);
    }
}

// ============================================================================
// SEÇÃO 3: GATILHOS DO FIRESTORE (Notificações)
// ============================================================================

exports.sendNewAppointmentNotification = onDocumentCreated(
    "appointments/{appointmentId}",
    async (event) => {
        const appointment = event.data?.data();
        if (!appointment || !appointment.establishmentId) return;

        const clientName = appointment.clientName || "Cliente";
        const clientPhone = appointment.clientPhone;
        const serviceName = appointment.serviceName || (appointment.services && appointment.services[0]?.name) || "Serviço";
        const professionalName = await getProfessionalName(appointment.professionalId);
        const dateString = formatDate(appointment.startTime || appointment.time);

        // 1. Enviar WhatsApp para o Cliente
        if (clientPhone) {
            const zapMessage = `Olá ${clientName}! 👋\n\nO seu agendamento no Kairós foi confirmado! 🎉\n\n📅 *Data:* ${dateString}\n💇‍♂️ *Serviço:* ${serviceName}\n👤 *Profissional:* ${professionalName}\n\nEsperamos por si!`;
            await sendWhatsAppMessage(clientPhone, zapMessage);
        }

        // 2. Enviar Push Notification para a Equipe (Layout Completo)
        const tokens = await getTargetTokens(appointment.establishmentId, appointment.professionalId);
        if (tokens.length > 0) {
            const title = "📅 Novo Agendamento!";
            const body = `${clientName} agendou "${serviceName}" para ${dateString} com ${professionalName}.`;
            const message = {
                notification: { title, body },
                data: { 
                    type: "new_appointment", 
                    appointmentId: event.params.appointmentId,
                    url: "/app.html" 
                },
                android: { 
                    priority: "high", 
                    notification: { 
                        channelId: 'default', 
                        icon: 'ic_stat_notification', 
                        color: '#4f46e5' 
                    } 
                },
                tokens: tokens,
            };
            try { await admin.messaging().sendEachForMulticast(message); } catch (e) { console.error(e); }
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

        if (isCancelled) {
            const clientName = after.clientName || "Cliente";
            const dateString = formatDate(after.startTime || after.time);

            if (after.clientPhone) {
                const msg = `Olá ${clientName}. ❌ O seu agendamento para o dia ${dateString} foi CANCELADO.\n\nPara remarcar, envie-nos uma mensagem!`;
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
        
        console.log(`📩 Nova mensagem de ${phoneNumber}: ${textBody}`);

        if (textBody?.toLowerCase() === 'oi' || textBody?.toLowerCase() === 'olá') {
            await sendWhatsAppMessage(phoneNumber, "Olá! O sistema Kairós está online. Como posso ajudar? 😎");
        }
    }
    res.sendStatus(200);
});

exports.whatsapp = onRequest(whatsappApp);