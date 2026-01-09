/**
 * functions/index.js
 * Backend V4: Notificações + Sistema de Fidelidade (Pontos e Resgates).
 * VERSÃO CORRIGIDA E CENTRALIZADA
 */

const { onDocumentCreated, onDocumentUpdated } = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

// ============================================================================
// SEÇÃO 1: AJUDANTES (Helpers)
// ============================================================================

// --- CORREÇÃO: Função para limpar ID (deixar apenas números) ---
function cleanId(id) {
    if (!id) return '';
    return String(id).replace(/\D/g, '');
}

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

// --- Busca tokens de notificação FILTRADOS ---
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

// --- LÓGICA CENTRAL DE FIDELIDADE (ROBUSTA) ---
async function processLoyaltyTransaction(establishmentId, clientId, items, totalAmount, sourceId, sourceType) {
    if (!establishmentId) return;
    
    // CORREÇÃO: Garante que temos um ID válido (numérico)
    const safeClientId = cleanId(clientId);
    if (!safeClientId) {
        console.warn("[Fidelidade] Ignorado: ID do cliente inválido ou não fornecido.");
        return;
    }

    try {
        const estabRef = db.collection('establishments').doc(establishmentId);
        const estabSnap = await estabRef.get();
        
        if (!estabSnap.exists) return;
        const config = estabSnap.data().loyaltyProgram;

        if (!config || !config.enabled) return;

        const pointsFactor = config.pointsFactor || 1;
        
        // Cálculo de pontos a adicionar
        let pointsToAdd = 0;
        if (config.type === 'currency' && config.pointsPerCurrency > 0) {
             pointsToAdd = Math.floor((totalAmount || 0) / config.pointsPerCurrency);
        } else {
             // Fallback para fator multiplicador (padrão antigo ou visita)
             pointsToAdd = Math.floor((totalAmount || 0) * pointsFactor);
        }

        let pointsToDeduct = 0;
        if (items && Array.isArray(items)) {
            items.forEach(item => {
                if (item.isReward && item.pointsCost > 0) {
                    const qty = item.quantity || 1;
                    pointsToDeduct += (item.pointsCost * qty);
                }
            });
        }

        if (pointsToDeduct === 0 && pointsToAdd === 0) return;

        console.log(`[Fidelidade] Processando Cliente ${safeClientId}: -${pointsToDeduct} (Gasto) / +${pointsToAdd} (Ganho)`);

        // Usa o ID limpo para buscar o documento
        const clientRef = db.collection('clients').doc(safeClientId);

        await db.runTransaction(async (t) => {
            const clientDoc = await t.get(clientRef);
            if (!clientDoc.exists) {
                console.warn(`[Fidelidade] Cliente ${safeClientId} não encontrado no banco.`);
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
                    ? `Resgate e Acúmulo (+${pointsToAdd})` 
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
 * Notificação de Novo Agendamento
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
            await admin.messaging().sendEachForMulticast(message);
        } catch (error) {
            console.error(">>> [ERRO CRÍTICO] Falha no envio:", error);
        }
    }
);

/**
 * Notificação de Cancelamento (APENAS)
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

        // OBS: A lógica de fidelidade ao completar foi removida daqui para evitar conflito com o gatilho de Vendas.
    }
);

// ============================================================================
// SEÇÃO 3: GATILHO DE VENDAS (FONTE ÚNICA DE FIDELIDADE)
// ============================================================================

exports.handleNewSaleLoyalty = onDocumentCreated(
    "sales/{saleId}",
    async (event) => {
        const snapshot = event.data;
        if (!snapshot) return;

        const sale = snapshot.data();
        const saleId = event.params.saleId;

        if (!sale.establishmentId) return;

        // Tenta pegar o ID do cliente. Se não tiver, usa o telefone limpo como fallback.
        // A rota de checkout corrigida enviará 'clientId', mas mantemos o fallback por segurança.
        const clientIdToUse = sale.clientId || cleanId(sale.clientPhone);

        if (!clientIdToUse) {
            console.log(`[Fidelidade] Venda ${saleId} ignorada: Sem cliente vinculado.`);
            return;
        }

        await processLoyaltyTransaction(
            sale.establishmentId,
            clientIdToUse, // ID seguro e limpo
            sale.items || [],
            sale.totalAmount || 0,
            saleId,
            'sale'
        );
    }
);