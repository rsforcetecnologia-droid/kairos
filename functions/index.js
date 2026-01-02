/**
 * functions/index.js
 * Backend V3: Lógica baseada em 'view_all_prof' + Formatação de Data + Ícones Nativos.
 */

const { onDocumentCreated, onDocumentUpdated } = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");

admin.initializeApp();

// --- AJUDANTE: Formatação de Data e Hora ---
function formatDate(dateValue) {
    if (!dateValue) return 'Data indefinida';
    
    // Converte Timestamp do Firestore para Date nativo JS, se necessário
    const date = dateValue.toDate ? dateValue.toDate() : new Date(dateValue);
    
    if (isNaN(date.getTime())) return 'Data inválida';

    return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Sao_Paulo'
    });
}

// --- AJUDANTE: Buscar Nome do Profissional ---
async function getProfessionalName(professionalId) {
    if (!professionalId) return 'Profissional';
    try {
        // Tenta buscar na coleção de profissionais primeiro
        const docRef = admin.firestore().collection('professionals').doc(professionalId);
        const docSnap = await docRef.get();
        if (docSnap.exists) {
            return docSnap.data().name || 'Profissional';
        } 
        
        // Fallback: Tenta buscar na coleção users
        const userRef = admin.firestore().collection('users').doc(professionalId);
        const userSnap = await userRef.get();
        if(userSnap.exists) return userSnap.data().name || 'Profissional';
        
        return 'Profissional';
    } catch (e) {
        console.error("Erro ao buscar nome do profissional:", e);
        return 'Profissional';
    }
}

/**
 * Busca tokens de notificação FILTRADOS (Baseado em view_all_prof).
 * Regra:
 * - Se view_all_prof == true -> Recebe TUDO.
 * - Se não -> Recebe apenas se for o profissional do agendamento.
 */
async function getTargetTokens(establishmentId, appointmentProfessionalId) {
    if (!establishmentId) return [];

    const usersRef = admin.firestore().collection("users");
    const snapshotUsers = await usersRef
        .where("establishmentId", "==", establishmentId)
        .get();

    if (snapshotUsers.empty) {
        console.log(`[Aviso] Ninguém encontrado no estabelecimento ${establishmentId}`);
        return [];
    }

    const tokens = [];
    
    snapshotUsers.forEach((doc) => {
        const userData = doc.data();
        const userProfId = userData.professionalId; // ID do profissional deste user
        
        // --- NOVA LÓGICA AQUI ---
        // Verifica se o campo é explicitamente true (booleano ou string 'true')
        const canViewAll = userData.view_all_prof === true || userData.view_all_prof === "true";

        let shouldReceive = false;

        if (canViewAll) {
            // Regra 1: Tem permissão de ver tudo (Dono/Gerente)
            shouldReceive = true;
        } else {
            // Regra 2: É um profissional comum, só vê a sua agenda
            if (userProfId && userProfId === appointmentProfessionalId) {
                shouldReceive = true;
            }
        }

        if (shouldReceive) {
            if (userData.fcmTokens && Array.isArray(userData.fcmTokens)) {
                tokens.push(...userData.fcmTokens);
            } else if (userData.fcmToken) {
                tokens.push(userData.fcmToken);
            }
        }
    });

    const uniqueTokens = [...new Set(tokens)];
    console.log(`Encontrados ${uniqueTokens.length} tokens para envio.`);
    return uniqueTokens;
}

const webpushConfig = {
    headers: { "Urgency": "high" },
    fcmOptions: { link: "/app.html" }
};

/**
 * Notificação de Novo Agendamento
 */
exports.sendNewAppointmentNotification = onDocumentCreated(
    "appointments/{appointmentId}",
    async (event) => {
        const snapshot = event.data;
        if (!snapshot) return;

        const appointment = snapshot.data();
        if (!appointment.establishmentId) return;

        const tokens = await getTargetTokens(appointment.establishmentId, appointment.professionalId);
        
        if (tokens.length === 0) {
            console.log("Nenhum token elegível (ou view_all_prof=false para todos).");
            return;
        }

        const clientName = appointment.clientName || "Cliente";
        const serviceName = appointment.serviceName || (appointment.services && appointment.services[0]?.name) || "Serviço";
        const professionalName = await getProfessionalName(appointment.professionalId);
        const dateString = formatDate(appointment.startTime || appointment.time);

        const title = "📅 Novo Agendamento!";
        const body = `${clientName} agendou "${serviceName}" para ${dateString} com ${professionalName}.`;

        const message = {
            notification: { title, body },
            data: {
                type: "new_appointment",
                title,
                body,
                url: "/app.html"
            },
            android: {
                priority: "high",
                ttl: 3600 * 24,
                notification: {
                    channelId: 'default',
                    icon: 'ic_stat_notification',
                    color: '#4f46e5',
                    defaultSound: true,
                    visibility: 'public'
                }
            },
            webpush: webpushConfig,
            tokens: tokens,
        };

        try {
            const response = await admin.messaging().sendEachForMulticast(message);
            console.log(`[Novo] Sucesso: ${response.successCount}`);
        } catch (error) {
            console.error("Erro envio novo agendamento:", error);
        }
    });

/**
 * Notificação de Cancelamento
 */
exports.sendCancellationNotification = onDocumentUpdated(
    "appointments/{appointmentId}",
    async (event) => {
        const before = event.data.before.data();
        const after = event.data.after.data();

        const isCancelled = (after.status === "cancelled" || after.status === "cancelado") &&
                            (before.status !== "cancelled" && before.status !== "cancelado");

        if (!isCancelled) return;

        const tokens = await getTargetTokens(after.establishmentId, after.professionalId);
        if (tokens.length === 0) return;

        const clientName = after.clientName || "Cliente";
        const serviceName = after.serviceName || (after.services && after.services[0]?.name) || "Serviço";
        const professionalName = await getProfessionalName(after.professionalId);
        const dateString = formatDate(after.startTime || after.time);

        const title = "❌ Agendamento Cancelado";
        const body = `${clientName} cancelou "${serviceName}" de ${dateString} com ${professionalName}.`;

        const message = {
            notification: { title, body },
            data: {
                type: "cancellation",
                title,
                body,
                url: "/app.html"
            },
            android: {
                priority: "high",
                ttl: 3600 * 24,
                notification: {
                    channelId: 'default',
                    icon: 'ic_stat_notification',
                    color: '#dc2626',
                    defaultSound: true,
                    visibility: 'public'
                }
            },
            webpush: webpushConfig,
            tokens: tokens,
        };

        try {
            const response = await admin.messaging().sendEachForMulticast(message);
            console.log(`[Cancel] Sucesso: ${response.successCount}`);
        } catch (error) {
            console.error("Erro envio cancelamento:", error);
        }
    });