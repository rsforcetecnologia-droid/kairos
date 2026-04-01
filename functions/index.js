/**
 * functions/index.js
 * Backend Kairós SaaS: Notificações + Bot de Menus + QR Code Generator 🚀
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
// CONFIGURAÇÕES GERAIS DO SERVIDOR (Apenas o endereço e a chave mestre)
// ============================================================================
const EVOLUTION_API_URL = "http://177.153.38.218:8080"; 
const GLOBAL_API_KEY = "kairos_senha_segura";

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

// Vai buscar os dados da loja pelo ID
async function getEstablishmentData(establishmentId) {
    if (!establishmentId) return null;
    const docSnap = await db.collection('establishments').doc(establishmentId).get();
    return docSnap.exists ? { id: docSnap.id, ...docSnap.data() } : null;
}

// Vai buscar os dados da loja pelo nome da Instância de WhatsApp
async function getEstablishmentByInstance(instanceName) {
    if (!instanceName) return null;
    const snapshot = await db.collection('establishments').where('whatsappInstance', '==', instanceName).limit(1).get();
    if (snapshot.empty) return null;
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}

// Função auxiliar: Busca agendamentos futuros do cliente pelo telefone
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
// SEÇÃO 2: MOTOR DE ENVIO DINÂMICO
// ============================================================================

async function sendWhatsAppMessage(toPhone, messageText, instanceName) {
    if (!toPhone || !instanceName) {
        console.log(`[WHATSAPP] ❌ Falha: Telefone ou Instância ausente. (Phone: ${toPhone}, Instância: ${instanceName})`);
        return;
    }
    
    let cleanPhone = toPhone.replace(/\D/g, '');
    if (!cleanPhone.startsWith('55')) cleanPhone = '55' + cleanPhone;

    const payload = {
        "number": cleanPhone,
        "options": { "delay": 1200, "presence": "composing" },
        "textMessage": { "text": messageText }
    };

    try {
        console.log(`[WHATSAPP] A enviar mensagem da loja [${instanceName}] para o cliente [${cleanPhone}]...`);
        await axios.post(
            `${EVOLUTION_API_URL}/message/sendText/${instanceName}`,
            payload,
            { headers: { 'apikey': GLOBAL_API_KEY, 'Content-Type': 'application/json' } }
        );
        console.log(`[WHATSAPP] ✅ SUCESSO!`);
    } catch (error) {
        console.error(`[WHATSAPP] ❌ ERRO:`, JSON.stringify(error.response?.data || error.message));
    }
}

// ============================================================================
// SEÇÃO 3: GATILHOS DO FIRESTORE (Notificações Automáticas)
// ============================================================================

exports.sendNewAppointmentNotification = onDocumentCreated(
    "appointments/{appointmentId}",
    async (event) => {
        const appointment = event.data?.data();
        if (!appointment || !appointment.establishmentId) return;

        const shop = await getEstablishmentData(appointment.establishmentId);
        if (!shop || !shop.whatsappInstance) {
            console.log(`[GATILHO] ⚠️ Barbearia (${appointment.establishmentId}) não tem WhatsApp configurado.`);
            return;
        }

        const clientName = appointment.clientName || "Cliente";
        const clientPhone = appointment.clientPhone;
        const serviceName = appointment.serviceName || "Serviço";
        const professionalName = await getProfessionalName(appointment.professionalId);
        const dateString = formatDate(appointment.startTime || appointment.time);

        if (clientPhone) {
            const zapMessage = `Olá ${clientName}! 👋\n\nO seu agendamento na *${shop.name || 'Barbearia'}* foi confirmado! 🎉\n\n📅 *Data:* ${dateString}\n💇‍♂️ *Serviço:* ${serviceName}\n👤 *Profissional:* ${professionalName}\n\nEsperamos por si!`;
            await sendWhatsAppMessage(clientPhone, zapMessage, shop.whatsappInstance);
        }

        const tokens = await getTargetTokens(appointment.establishmentId);
        if (tokens.length > 0) {
            const message = {
                notification: { title: "📅 Novo Agendamento!", body: `${clientName} agendou para ${dateString}.` },
                tokens: tokens,
            };
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
                const msg = `Olá ${after.clientName || 'Cliente'}. ❌ O seu agendamento na *${shop.name || 'Barbearia'}* para o dia ${dateString} foi CANCELADO.\n\nPara remarcar, aceda à nossa app!`;
                await sendWhatsAppMessage(after.clientPhone, msg, shop.whatsappInstance);
            }
        }
    }
);

// ============================================================================
// SEÇÃO 4: O BOT DE WHATSAPP (Fluxo Multiempresas com Menus)
// ============================================================================

const whatsappApp = express();
whatsappApp.use(express.json());
whatsappApp.use(cors); 

whatsappApp.post('/webhook', async (req, res) => {
    const { event, instance, data } = req.body;
    
    if (event !== "messages.upsert") return res.sendStatus(200);
    if (data.key.fromMe) return res.sendStatus(200);

    const customerPhone = data.key.remoteJid.split('@')[0];
    const textBody = data.message?.conversation || data.message?.extendedTextMessage?.text;
    if (!textBody) return res.sendStatus(200);

    console.log(`[BOT] Mensagem de ${customerPhone} na loja [${instance}]: ${textBody}`);

    const shop = await getEstablishmentByInstance(instance);
    if (!shop) return res.sendStatus(200);

    let baseUrl = "https://www.kairosagenda.com.br";
    const linkId = shop.urlId || shop.id;
    const bookingLink = `${baseUrl}/agendar?id=${linkId}`;

    // Documento da Sessão Único por loja + telefone
    const sessionRef = db.collection('sessions').doc(`${shop.id}_${customerPhone}`);
    const sessionSnap = await sessionRef.get();
    let session = sessionSnap.exists ? sessionSnap.data() : { status: 'IDLE' };

    if (textBody === '0') {
        session.status = 'IDLE';
    }

    // ESTADO: EM ATENDIMENTO HUMANO
    if (session.status === 'HUMAN') {
        if (textBody === '0') {
            session.status = 'IDLE';
            await sendWhatsAppMessage(customerPhone, "Você encerrou o atendimento humano e voltou ao assistente virtual. 🤖\n\nComo posso ajudar?\n1️⃣ Agendar\n2️⃣ Cancelar\n3️⃣ Remarcar\n4️⃣ Falar com Atendente", instance);
            await sessionRef.set(session);
        }
        return res.sendStatus(200);
    }

    // ESTADO: MENU PRINCIPAL
    if (session.status === 'IDLE') {
        const menu = `Olá! Sou o assistente virtual da *${shop.name}*. 💈\nComo posso te ajudar hoje?\n\n1️⃣ Fazer um Agendamento\n2️⃣ Cancelar um Agendamento\n3️⃣ Remarcar um Agendamento\n4️⃣ Falar com um Atendente`;
        await sendWhatsAppMessage(customerPhone, menu, instance);
        
        session.status = 'WAITING_MENU';
        await sessionRef.set(session);
        return res.sendStatus(200);
    }

    // ESTADO: AGUARDANDO OPÇÃO DO MENU
    if (session.status === 'WAITING_MENU') {
        if (textBody === '1') {
            await sendWhatsAppMessage(customerPhone, `Ótima escolha! Para escolher o seu serviço, profissional e horário com facilidade, acesse a nossa agenda online pelo link abaixo:\n\n🔗 ${bookingLink}\n\n(Se precisar voltar ao menu inicial, digite 0).`, instance);
            session.status = 'IDLE';
        } 
        else if (textBody === '2' || textBody === '3') {
            const action = textBody === '2' ? 'cancelar' : 'remarcar';
            const apps = await getClientAppointments(customerPhone, shop.id);
            
            if (apps.length === 0) {
                await sendWhatsAppMessage(customerPhone, `Não encontrei nenhum agendamento futuro no sistema para o seu número.\n\nPara fazer um novo agendamento, acesse:\n🔗 ${bookingLink}\n\n(Digite 0 para voltar ao menu).`, instance);
                session.status = 'IDLE';
            } else {
                let msg = `Encontrei os seguintes agendamentos no sistema. Qual deles você deseja ${action}?\n\n`;
                session.tempApps = {}; 
                
                apps.forEach((app, index) => {
                    const num = index + 1;
                    const dateStr = formatDate(app.date);
                    const profName = app.professionalName || "Profissional";
                    msg += `${num}️⃣ *${dateStr}* com ${profName}\n`;
                    session.tempApps[num] = app.id;
                });
                
                msg += `\n👉 Digite apenas o *número* correspondente (ou 0 para cancelar a operação).`;
                await sendWhatsAppMessage(customerPhone, msg, instance);
                session.status = textBody === '2' ? 'WAITING_CANCEL' : 'WAITING_RESCHEDULE';
            }
        }
        else if (textBody === '4') {
            await sendWhatsAppMessage(customerPhone, `Certo! Desliguei o robô e chamei um atendente. Por favor, aguarde um momento.\n\n(Para voltar a falar com o robô a qualquer momento, digite 0).`, instance);
            session.status = 'HUMAN';
        }
        else {
            await sendWhatsAppMessage(customerPhone, `Opção inválida. ❌\nPor favor, digite 1, 2, 3 ou 4.`, instance);
        }
        
        await sessionRef.set(session);
        return res.sendStatus(200);
    }

    // ESTADO: CANCELANDO OU REMARCANDO
    if (session.status === 'WAITING_CANCEL' || session.status === 'WAITING_RESCHEDULE') {
        const isReschedule = session.status === 'WAITING_RESCHEDULE';
        const appId = session.tempApps ? session.tempApps[textBody] : null;

        if (appId) {
            await sendWhatsAppMessage(customerPhone, `Processando a sua solicitação... Aguarde um instante ⏳`, instance);
            
            // Cancela no Firestore (Dispara a function de sendCancellationNotification automaticamente)
            await db.collection('appointments').doc(appId).update({ status: 'cancelled' });
            
            if (isReschedule) {
                await sendWhatsAppMessage(customerPhone, `Pronto! O horário anterior foi desmarcado. ✅\n\nAgora, clique no link abaixo para escolher o seu *novo* horário:\n\n🔗 ${bookingLink}\n\nAté logo! (Digite 0 para ver o menu novamente).`, instance);
            }
            
            session.status = 'IDLE';
            session.tempApps = null;
        } else {
            await sendWhatsAppMessage(customerPhone, `Número inválido. Digite o número correspondente ao agendamento ou 0 para voltar ao menu.`, instance);
        }
        
        await sessionRef.set(session);
        return res.sendStatus(200);
    }

    res.sendStatus(200);
});

// ============================================================================
// SEÇÃO 5: API PARA O PAINEL DO CLIENTE (Gerar QR Code Automático)
// ============================================================================

whatsappApp.post('/api/whatsapp/connect', async (req, res) => {
    const { establishmentId } = req.body;
    
    if (!establishmentId) {
        return res.status(400).json({ error: "Falta o ID do estabelecimento." });
    }

    const instanceName = `loja_${establishmentId}`;
    const instanceToken = `token_${establishmentId}`;

    try {
        console.log(`[PAINEL] Solicitando criação da instância: ${instanceName}`);
        
        try {
            await axios.post(`${EVOLUTION_API_URL}/instance/create`, {
                instanceName: instanceName,
                token: instanceToken,
                qrcode: true
            }, { 
                headers: { 'apikey': GLOBAL_API_KEY } 
            });
        } catch (createError) {
            const msg = createError.response?.data?.message || "";
            if (!msg.includes("already exists")) {
                throw createError;
            }
        }

        await db.collection('establishments').doc(establishmentId).update({
            whatsappInstance: instanceName,
            whatsappToken: instanceToken
        });

        const qrResponse = await axios.get(`${EVOLUTION_API_URL}/instance/connect/${instanceName}`, {
            headers: { 'apikey': GLOBAL_API_KEY }
        });

        const qrCodeBase64 = qrResponse.data?.base64 || qrResponse.data?.qrcode;
        
        if (!qrCodeBase64) {
            return res.json({ success: true, message: "O WhatsApp já está conectado!" });
        }

        res.json({ success: true, qrcode: qrCodeBase64 });

    } catch (error) {
        console.error(`[PAINEL] Erro ao gerar QR Code:`, error.message);
        res.status(500).json({ error: "Falha ao conectar com o servidor de WhatsApp." });
    }
});

exports.whatsapp = onRequest(whatsappApp);