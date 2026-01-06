/**
 * functions/index.js
 * Backend V4: Notificações + Sistema de Fidelidade (Pontos e Resgates).
 * VERSÃO LIMPA (SEM LOGS DE DIAGNÓSTICO VERBOSOS)
 */

const { onDocumentCreated, onDocumentUpdated } = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

// ============================================================================
// SEÇÃO 1: AJUDANTES (Helpers)
// ============================================================================

// --- Formatação de Data e Hora ---
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

// --- Buscar Nome do Profissional ---
async function getProfessionalName(professionalId) {
    if (!professionalId) return 'Profissional';
    try {
        const docRef = db.collection('professionals').doc(professionalId);
        const docSnap = await docRef.get();
        if (docSnap.exists) {
            return docSnap.data().name || 'Profissional';
        } 
        
        const userRef = db.collection('users').doc(professionalId);
        const userSnap = await userRef.get();
        if(userSnap.exists) return userSnap.data().name || 'Profissional';
        
        return 'Profissional';
    } catch (e) {
        console.error("Erro ao buscar nome do profissional:", e);
        return 'Profissional';
    }
}

// --- Busca tokens de notificação FILTRADOS (LIMPO) ---
async function getTargetTokens(establishmentId, appointmentProfessionalId) {
    if (!establishmentId) return [];

    const usersRef = db.collection("users");
    const snapshotUsers = await usersRef
        .where("establishmentId", "==", establishmentId)
        .get();

    if (snapshotUsers.empty) {
        return [];
    }

    const tokens = [];
    
    snapshotUsers.forEach((doc) => {
        const userData = doc.data();
        const userProfId = userData.professionalId;
        const permissions = userData.permissions;

        // Verifica a permissão dentro da estrutura correta 'agenda-section'
        const canViewAll = 
            (permissions && permissions['agenda-section'] && permissions['agenda-section'].view_all_prof === true) || 
            (permissions === null || permissions === undefined) || 
            (userData.view_all_prof === true || userData.view_all_prof === "true"); 

        let shouldReceive = false;

        // Regra 1: Dono/Gerente (vê tudo)
        if (canViewAll) {
            shouldReceive = true;
        } 
        // Regra 2: Profissional específico do agendamento
        else if (userProfId && userProfId === appointmentProfessionalId) {
            shouldReceive = true;
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
    return uniqueTokens;
}

// --- LÓGICA CENTRAL DE FIDELIDADE ---
async function processLoyaltyTransaction(establishmentId, clientId, items, totalAmount, sourceId, sourceType) {
    if (!establishmentId || !clientId) return;

    try {
        const estabRef = db.collection('establishments').doc(establishmentId);
        const estabSnap = await estabRef.get();
        
        if (!estabSnap.exists) return;
        const config = estabSnap.data().loyaltyProgram;

        if (!config || !config.enabled) return;

        const pointsFactor = config.pointsFactor || 1;

        let pointsToDeduct = 0;
        
        if (items && Array.isArray(items)) {
            items.forEach(item => {
                if (item.isReward && item.pointsCost > 0) {
                    const qty = item.quantity || 1;
                    pointsToDeduct += (item.pointsCost * qty);
                }
            });
        }

        const pointsToAdd = Math.floor((totalAmount || 0) * pointsFactor);

        if (pointsToDeduct === 0 && pointsToAdd === 0) return;

        // Mantive este log pois é útil para auditoria financeira/pontos, mas pode remover se quiser
        console.log(`[Fidelidade] Processando Cliente ${clientId}: -${pointsToDeduct} (Gasto) / +${pointsToAdd} (Ganho)`);

        const clientRef = db.collection('clients').doc(clientId);

        await db.runTransaction(async (t) => {
            const clientDoc = await t.get(clientRef);
            if (!clientDoc.exists) {
                console.warn(`[Fidelidade] Cliente ${clientId} não encontrado.`);
                return;
            }

            const currentPoints = clientDoc.data().loyaltyPoints || 0;
            const newBalance = currentPoints - pointsToDeduct + pointsToAdd;
            const finalBalance = newBalance < 0 ? 0 : newBalance;

            t.update(clientRef, { loyaltyPoints: finalBalance });

            const historyRef = clientRef.collection('loyaltyHistory').doc();
            t.set(historyRef, {
                date: new Date().toISOString(),
                type: pointsToDeduct > 0 ? 'redeem_and_earn' : 'earn',
                pointsEarned: pointsToAdd,
                pointsSpent: pointsToDeduct,
                balanceBefore: currentPoints,
                balanceAfter: finalBalance,
                sourceId: sourceId,
                sourceType: sourceType,
                description: pointsToDeduct > 0 
                    ? `Resgate de prémio (-${pointsToDeduct}) e Acúmulo (+${pointsToAdd})` 
                    : `Acúmulo de compra (+${pointsToAdd})`
            });
        });

    } catch (error) {
        console.error("[Fidelidade] Erro crítico ao processar pontos:", error);
    }
}

const webpushConfig = {
    headers: { "Urgency": "high" },
    fcmOptions: { link: "/app.html" }
};

// ============================================================================
// SEÇÃO 2: NOTIFICAÇÕES (Gatilhos)
// ============================================================================

/**
 * Notificação de Novo Agendamento (LIMPO)
 */
exports.sendNewAppointmentNotification = onDocumentCreated(
    "appointments/{appointmentId}",
    async (event) => {
        const appointmentId = event.params.appointmentId;
        const snapshot = event.data;
        
        if (!snapshot) return;

        const appointment = snapshot.data();
        
        if (!appointment.establishmentId) {
            console.error(">>> [ERRO] Agendamento sem establishmentId: ", appointmentId);
            return;
        }

        const tokens = await getTargetTokens(appointment.establishmentId, appointment.professionalId);
        
        if (tokens.length === 0) return;

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
                url: "/app.html",
                appointmentId: appointmentId
            },
            android: {
                priority: "high",
                ttl: 3600 * 24, // 24 horas
                notification: {
                    channelId: 'default',
                    icon: 'ic_stat_notification', 
                    color: '#4f46e5',
                    defaultSound: true,
                    visibility: 'public',
                    priority: 'high'
                }
            },
            webpush: webpushConfig,
            tokens: tokens,
        };

        try {
            const response = await admin.messaging().sendEachForMulticast(message);
            
            if (response.failureCount > 0) {
                const errors = response.responses
                    .map((res, idx) => res.error ? `Token ${idx}: ${res.error.code} - ${res.error.message}` : null)
                    .filter(e => e);
                console.error(">>> [ERRO DETALHADO DO FCM]:", JSON.stringify(errors));
            }
        } catch (error) {
            console.error(">>> [ERRO CRÍTICO] Falha no envio:", error);
        }
    }
);

/**
 * Notificação de Cancelamento
 */
exports.sendCancellationNotification = onDocumentUpdated(
    "appointments/{appointmentId}",
    async (event) => {
        const before = event.data.before.data();
        const after = event.data.after.data();
        const appointmentId = event.params.appointmentId;

        // --- A. Lógica de Cancelamento ---
        const isCancelled = (after.status === "cancelled" || after.status === "cancelado") &&
                            (before.status !== "cancelled" && before.status !== "cancelado");

        if (isCancelled) {
            const tokens = await getTargetTokens(after.establishmentId, after.professionalId);
            if (tokens.length > 0) {
                const clientName = after.clientName || "Cliente";
                const serviceName = after.serviceName || (after.services && after.services[0]?.name) || "Serviço";
                const professionalName = await getProfessionalName(after.professionalId);
                const dateString = formatDate(after.startTime || after.time);

                const title = "❌ Agendamento Cancelado";
                const body = `${clientName} cancelou "${serviceName}" de ${dateString} com ${professionalName}.`;

                const message = {
                    notification: { title, body },
                    data: { type: "cancellation", title, body, url: "/app.html" },
                    android: {
                        priority: "high",
                        notification: {
                            channelId: 'default',
                            icon: 'ic_stat_notification',
                            color: '#dc2626',
                            defaultSound: true
                        }
                    },
                    webpush: webpushConfig,
                    tokens: tokens,
                };
                await admin.messaging().sendEachForMulticast(message).catch(e => console.error(e));
            }
        }

        // --- B. Lógica de Fidelidade (Ao Completar) ---
        if (after.status === 'completed' && before.status !== 'completed') {
            const allItems = [
                ...(after.services || []),
                ...(after.comandaItems || []),
                ...(after.items || [])
            ];

            await processLoyaltyTransaction(
                after.establishmentId,
                after.clientId,
                allItems,
                after.totalAmount || 0,
                appointmentId,
                'appointment'
            );
        }
    }
);

// ============================================================================
// SEÇÃO 3: NOVOS GATILHOS DE VENDAS
// ============================================================================

exports.handleNewSaleLoyalty = onDocumentCreated(
    "sales/{saleId}",
    async (event) => {
        const snapshot = event.data;
        if (!snapshot) return;

        const sale = snapshot.data();
        const saleId = event.params.saleId;

        if (!sale.establishmentId || !sale.clientId) return;

        await processLoyaltyTransaction(
            sale.establishmentId,
            sale.clientId,
            sale.items || [],
            sale.totalAmount || 0,
            saleId,
            'sale'
        );
    }
);