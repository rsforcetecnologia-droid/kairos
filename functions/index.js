/**
 * functions/index.js
 * Backend Kairós SaaS: Notificações + Bot de Menus + QR Code + Motor de Cobrança + MENSAGENS AUTOMÁTICAS COMPLETAS 🚀
 */

const { onDocumentCreated, onDocumentUpdated } = require("firebase-functions/v2/firestore");
const { onRequest } = require("firebase-functions/v2/https");
const { onSchedule } = require("firebase-functions/v2/scheduler"); 
const admin = require("firebase-admin");
const express = require('express');
const axios = require('axios');
const cors = require('cors')({ origin: true });

if (!admin.apps.length) {
    admin.initializeApp();
}
const db = admin.firestore();

// ============================================================================
// CONFIGURAÇÕES GERAIS DO SERVIDOR E WEBHOOK
// ============================================================================
const EVOLUTION_API_URL = "https://kinghost-evolution-api.tm5bar.easypanel.host"; 
const GLOBAL_API_KEY = "429683C4C977415CAAFCCE10F7D57E11";
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
// SEÇÃO 2: MOTOR DE ENVIO DINÂMICO DE WHATSAPP
// ============================================================================

// ============================================================================
// SEÇÃO 2: MOTOR DE ENVIO DINÂMICO DE WHATSAPP
// ============================================================================

async function sendWhatsAppMessage(toPhone, messageText, instanceName) {
    if (!toPhone || !instanceName) return;
    
    let cleanPhone = toPhone.replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) cleanPhone = cleanPhone.substring(1);
    if (!cleanPhone.startsWith('55')) cleanPhone = '55' + cleanPhone;
    if (cleanPhone.startsWith('550')) cleanPhone = '55' + cleanPhone.substring(3);

    // CORREÇÃO: Formato exato e simplificado que a sua Evolution API exige
    const payload = {
        "number": cleanPhone,
        "text": messageText
    };

    try {
        await axios.post(
            `${EVOLUTION_API_URL}/message/sendText/${instanceName}`,
            payload,
            { headers: { 'apikey': GLOBAL_API_KEY, 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error(`[WHATSAPP] Erro ao enviar mensagem para ${cleanPhone}:`, error.message);
        if (error.response && error.response.data) {
            console.error(`Detalhes da Evolution API:`, JSON.stringify(error.response.data));
        }
    }
}

// ============================================================================
// 🚀 SEÇÃO 3: CRON JOBS - MOTOR DE AUTOMAÇÕES E MENSAGENS
// ============================================================================

/**
 * 3.1. COBRANÇA DE ASSINATURAS (Diário às 09:00)
 */
exports.dailySubscriptionCheck = onSchedule({
    schedule: "0 9 * * *", 
    timeZone: "America/Sao_Paulo",
    memory: "512MiB"
}, async (event) => {
    console.log("[CRON] Iniciando rotina diária de verificação de assinaturas...");
    try {
        const pastDueSnapshot = await db.collection('client_subscriptions').where('status', '==', 'past_due').get();
        if (pastDueSnapshot.empty) return;

        const now = new Date();
        const batch = db.batch();

        for (const doc of pastDueSnapshot.docs) {
            const sub = doc.data();
            if (sub.lastDunningNotice) {
                const lastNoticeDate = sub.lastDunningNotice.toDate();
                const diffTime = Math.abs(now - lastNoticeDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (diffDays <= 3) continue; 
            }

            const shop = await getEstablishmentData(sub.establishmentId);
            if (!shop || !shop.whatsappInstance) continue;

            const clientPhone = sub.clientId; 
            const firstName = (sub.clientName || 'Cliente').split(' ')[0];
            const msg = `Olá ${firstName}! 💎\n\nIdentificámos um problema com o pagamento do seu plano na ${shop.name}.\nPor favor atualize o seu método de pagamento para não perder os benefícios.`;

            await sendWhatsAppMessage(clientPhone, msg, shop.whatsappInstance);
            batch.update(doc.ref, { lastDunningNotice: admin.firestore.FieldValue.serverTimestamp() });
        }
        await batch.commit();
    } catch (error) {
        console.error("[CRON] Erro ao processar assinaturas:", error);
    }
});

/**
 * 3.2. LEMBRETE PRÉVIO DE AGENDAMENTO (A cada 15 min)
 */
exports.appointmentReminderCron = onSchedule({
    schedule: "*/15 * * * *", 
    timeZone: "America/Sao_Paulo",
    memory: "512MiB"
}, async (event) => {
    console.log("[CRON] Iniciando rotina de Lembretes de Agendamento...");
    try {
        const now = new Date();
        
        // 1. CORREÇÃO DE STATUS FINAL: Adicionado "aguardando_confirmacao" exato do banco
        const appointmentsSnap = await db.collection('appointments')
            .where('status', 'in', [
                'scheduled', 
                'agendado', 
                'pendente', 
                'confirmado', 
                'aguardando_confirmacao', // AQUI ESTÁ A CHAVE CORRETA!
                'aguardando confirmação', 
                'aguardando'
            ])
            .get();

        if (appointmentsSnap.empty) {
            console.log("[CRON] Nenhum agendamento encontrado com os status válidos.");
            return;
        }

        const batch = db.batch();
        let updatesCount = 0;
        const shopCache = {}; 

        for (const doc of appointmentsSnap.docs) {
            const appt = doc.data();
            if (appt.reminderSent) continue;

            // Lógica de Data e Hora
            let apptDate;
            if (appt.startTime && appt.startTime.toDate) {
                apptDate = appt.startTime.toDate(); 
            } else if (appt.date && appt.time) {
                apptDate = new Date(`${appt.date}T${appt.time}:00-03:00`); 
            } else {
                apptDate = new Date(appt.startTime || appt.date || appt.time);
            }

            if (!apptDate || isNaN(apptDate.getTime())) continue;

            const diffMs = apptDate.getTime() - now.getTime();
            const diffMinutes = Math.floor(diffMs / (1000 * 60));

            if (diffMinutes < 0 || diffMinutes > 1440) continue;

            const shopId = appt.establishmentId;
            if (!shopId) continue;
            if (!shopCache[shopId]) shopCache[shopId] = await getEstablishmentData(shopId);
            
            const shop = shopCache[shopId];
            if (!shop || !shop.whatsappInstance) continue;

            const autoConfig = shop.autoMessagesConfig || {};
            const reminderConfig = autoConfig.appointmentReminder || {};
            
            if (reminderConfig.active === false) continue;

            const minutesBefore = reminderConfig.minutesBefore || 60;

            if (diffMinutes <= minutesBefore) {
                const clientPhone = appt.clientPhone;
                if (!clientPhone) continue;

                const clientName = appt.clientName?.split(' ')[0] || "Cliente";
                const professionalName = await getProfessionalName(appt.professionalId);
                const horaFormatada = apptDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: shop.timezone || 'America/Sao_Paulo' });

                const template = reminderConfig.template || "Olá {{cliente}}! 👋 Passando para lembrar do seu horário hoje às {{hora}} com {{profissional}}.";
                const finalMessage = template
                    .replace(/\{\{cliente\}\}/g, clientName)
                    .replace(/\{\{hora\}\}/g, horaFormatada)
                    .replace(/\{\{profissional\}\}/g, professionalName);

                await sendWhatsAppMessage(clientPhone, finalMessage, shop.whatsappInstance);
                console.log(`[CRON] Lembrete disparado para: ${clientPhone} (Faltam ${diffMinutes} min)`);
                
                batch.update(doc.ref, { reminderSent: true });
                updatesCount++;
            }
        }
        
        if (updatesCount > 0) {
            await batch.commit();
            console.log(`[CRON] Sucesso! ${updatesCount} lembretes marcados como enviados.`);
        } else {
            console.log("[CRON] Nenhum agendamento dentro da janela de disparo (ex: faltando 60 min).");
        }
    } catch (error) {
        console.error("[CRON] Erro ao enviar lembretes:", error);
    }
});

/**
 * 🚀 3.3. NOVO: MENSAGENS DE RETENÇÃO (Aniversários e Inativos) - Diário às 08:00 AM
 */
exports.dailyRetentionMessagesCron = onSchedule({
    schedule: "0 8 * * *", 
    timeZone: "America/Sao_Paulo",
    memory: "512MiB"
}, async (event) => {
    console.log("[CRON] Iniciando rotina de Retenção (Aniversários e Inativos)...");
    
    try {
        const now = new Date();
        // Formatar mês e dia atual no formato "-MM-DD" para buscar aniversários
        const currentMonthDay = `-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        
        // 1. Obter todos os estabelecimentos que têm o WhatsApp conectado
        const shopsSnap = await db.collection('establishments').where('whatsappInstance', '!=', null).get();
        if (shopsSnap.empty) return;

        let messagesSentCount = 0;
        const batch = db.batch(); // Usado para atualizar a data da última mensagem enviada, evitando spam.

        for (const shopDoc of shopsSnap.docs) {
            const shop = shopDoc.data();
            const autoConfig = shop.autoMessagesConfig || {};
            
            const birthdayConfig = autoConfig.birthdayCongrats || {};
            const inactiveConfig = autoConfig.inactiveRecovery || {};

            // Se nenhum dos módulos de retenção estiver ativo nesta loja, pula.
            if (!birthdayConfig.active && !inactiveConfig.active) continue;

            // 2. Buscar todos os clientes desta loja
            // (Nota: Em bases gigantes, usamos paginação, mas para SaaS de lojas normais isto é seguro)
            const clientsSnap = await db.collection('clients').where('establishmentId', '==', shopDoc.id).get();
            
            for (const clientDoc of clientsSnap.docs) {
                const client = clientDoc.data();
                if (!client.phone) continue;

                const clientName = client.name?.split(' ')[0] || "Cliente";

                // --- A) VERIFICAÇÃO DE ANIVERSÁRIO ---
                if (birthdayConfig.active && client.birthDate) {
                    // Verifica se a data de nascimento termina com o mês-dia de hoje (ex: "1990-05-15" termina em "-05-15")
                    if (client.birthDate.includes(currentMonthDay)) {
                        
                        // Verifica se já enviamos parabéns este ano (para evitar duplicados se o cron falhar/repetir)
                        const currentYear = now.getFullYear();
                        if (client.lastBirthdayMessageYear !== currentYear) {
                            const template = birthdayConfig.template || "Parabéns {{cliente}}! 🎉 Feliz aniversário!";
                            const finalMsg = template.replace(/\{\{cliente\}\}/g, clientName);
                            
                            await sendWhatsAppMessage(client.phone, finalMsg, shop.whatsappInstance);
                            messagesSentCount++;
                            
                            // Regista o ano do último parabéns enviado
                            batch.update(clientDoc.ref, { lastBirthdayMessageYear: currentYear });
                        }
                    }
                }

                // --- B) VERIFICAÇÃO DE CLIENTES INATIVOS ---
                if (inactiveConfig.active && client.lastVisitDate) {
                    const lastVisit = client.lastVisitDate.toDate ? client.lastVisitDate.toDate() : new Date(client.lastVisitDate);
                    
                    if (!isNaN(lastVisit.getTime())) {
                        const targetDays = inactiveConfig.daysInactive || 30;
                        const diffTime = Math.abs(now - lastVisit);
                        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

                        // Se a diferença de dias for EXATAMENTE igual ao configurado (para mandar a mensagem apenas no dia exato do marco)
                        if (diffDays === targetDays) {
                            const template = inactiveConfig.template || "Olá {{cliente}}, já faz {{dias}} dias desde a sua última visita à {{unidade}}! Que tal agendar?";
                            const finalMsg = template
                                .replace(/\{\{cliente\}\}/g, clientName)
                                .replace(/\{\{dias\}\}/g, targetDays.toString())
                                .replace(/\{\{unidade\}\}/g, shop.name || 'nossa loja');
                            
                            await sendWhatsAppMessage(client.phone, finalMsg, shop.whatsappInstance);
                            messagesSentCount++;
                            
                            // Opcional: Atualizar algo no cliente para dizer que a mensagem de "inativo" foi enviada.
                            batch.update(clientDoc.ref, { inactiveMessageSent: true });
                        }
                    }
                }
            }
        }

        if (messagesSentCount > 0) {
            await batch.commit();
            console.log(`[CRON] Rotina de Retenção concluída! ${messagesSentCount} mensagens enviadas (Aniversários/Inativos).`);
        } else {
            console.log("[CRON] Rotina de Retenção concluída. Nenhum alvo encontrado hoje.");
        }

    } catch (error) {
        console.error("[CRON] Erro na rotina de retenção:", error);
    }
});


// ============================================================================
// SEÇÃO 4: GATILHOS DO FIRESTORE (Notificações Imediatas da Agenda)
// ============================================================================

exports.sendNewAppointmentNotification = onDocumentCreated(
    "appointments/{appointmentId}",
    async (event) => {
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

whatsappApp.post('/webhook', async (req, res) => { res.sendStatus(200); });

whatsappApp.post('/api/whatsapp/connect', async (req, res) => {
    const { establishmentId } = req.body;
    if (!establishmentId) return res.status(400).json({ error: "Falta o ID do estabelecimento." });

    const instanceName = `kairos_${establishmentId}`;
    const headers = { 'apikey': GLOBAL_API_KEY, 'Content-Type': 'application/json' };

    try {
        let qrcodeBase64 = '';
        try {
            const createPayload = { instanceName: instanceName, qrcode: true, integration: "WHATSAPP-BAILEYS" };
            const createResponse = await axios.post(`${EVOLUTION_API_URL}/instance/create`, createPayload, { headers });
            qrcodeBase64 = createResponse.data?.qrcode?.base64 || createResponse.data?.base64 || createResponse.data?.qrcode;

            await axios.post(`${EVOLUTION_API_URL}/webhook/set/${instanceName}`, {
                webhook: { enabled: true, url: N8N_WEBHOOK_URL, byEvents: false, base64: false, events: ["MESSAGES_UPSERT", "CONNECTION_UPDATE"] }
            }, { headers });
        } catch (error) {
            const status = error.response?.status;
            if (status === 400 || status === 403 || JSON.stringify(error.response?.data).includes('already exists')) {
                const connectResponse = await axios.get(`${EVOLUTION_API_URL}/instance/connect/${instanceName}`, { headers });
                qrcodeBase64 = connectResponse.data?.base64 || connectResponse.data?.qrcode;
            } else { throw error; }
        }
        res.json({ success: true, qrcode: qrcodeBase64, instanceName: instanceName });
    } catch (error) { res.status(500).json({ error: "Erro ao configurar WhatsApp na VPS." }); }
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
    } catch (error) { return res.status(200).json({ connected: false, state: 'not_found' }); }
});

whatsappApp.post('/api/whatsapp/disconnect', async (req, res) => {
    const { establishmentId } = req.body;
    if (!establishmentId) return res.status(400).json({ error: "ID ausente." });

    const instanceName = `kairos_${establishmentId}`;
    try {
        try { await axios.delete(`${EVOLUTION_API_URL}/instance/delete/${instanceName}`, { headers: { 'apikey': GLOBAL_API_KEY } }); } catch (e) {}
        await db.collection('establishments').doc(establishmentId).update({ whatsappInstance: admin.firestore.FieldValue.delete() });
        res.json({ success: true, message: "Desconectado com sucesso!" });
    } catch (error) { res.status(500).json({ error: "Falha ao remover conexão." }); }
});

exports.whatsapp = onRequest(whatsappApp);