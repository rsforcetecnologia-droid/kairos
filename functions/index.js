/**
 * functions/index.js
 * Backend V4: Notificações + Sistema de Fidelidade (Pontos e Resgates).
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
        // Tenta buscar na coleção de profissionais primeiro
        const docRef = db.collection('professionals').doc(professionalId);
        const docSnap = await docRef.get();
        if (docSnap.exists) {
            return docSnap.data().name || 'Profissional';
        } 
        
        // Fallback: Tenta buscar na coleção users
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

    if (snapshotUsers.empty) return [];

    const tokens = [];
    
    snapshotUsers.forEach((doc) => {
        const userData = doc.data();
        const userProfId = userData.professionalId; // ID do profissional deste user
        
        // Verifica se o campo é explicitamente true
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

    return [...new Set(tokens)];
}

// --- LÓGICA CENTRAL DE FIDELIDADE ---
// Calcula e aplica pontos (ganhos e gastos) na conta do cliente
async function processLoyaltyTransaction(establishmentId, clientId, items, totalAmount, sourceId, sourceType) {
    if (!establishmentId || !clientId) return;

    try {
        // 1. Verificar Configurações do Estabelecimento
        const estabRef = db.collection('establishments').doc(establishmentId);
        const estabSnap = await estabRef.get();
        
        if (!estabSnap.exists) return;
        const config = estabSnap.data().loyaltyProgram;

        // Se não tiver config ou estiver desativado, ignora
        if (!config || !config.enabled) return;

        const pointsFactor = config.pointsFactor || 1; // Padrão: 1 real = 1 ponto

        // 2. Calcular Pontos a Descontar (Resgates) e a Somar (Compras)
        let pointsToDeduct = 0;
        
        // Percorre itens para achar prémios
        if (items && Array.isArray(items)) {
            items.forEach(item => {
                // O frontend envia flag isReward: true e pointsCost
                if (item.isReward && item.pointsCost > 0) {
                    const qty = item.quantity || 1;
                    pointsToDeduct += (item.pointsCost * qty);
                }
            });
        }

        // Calcula pontos ganhos sobre o valor pago
        // (Nota: Itens resgatados têm preço 0, então não geram pontos, o que é correto)
        const pointsToAdd = Math.floor((totalAmount || 0) * pointsFactor);

        if (pointsToDeduct === 0 && pointsToAdd === 0) return; // Nada a fazer

        console.log(`[Fidelidade] Processando Cliente ${clientId}: -${pointsToDeduct} (Gasto) / +${pointsToAdd} (Ganho)`);

        // 3. Atualizar Saldo do Cliente (Transação Atômica)
        // Nota: Assumimos que os clientes estão na coleção raiz 'clients'
        const clientRef = db.collection('clients').doc(clientId);

        await db.runTransaction(async (t) => {
            const clientDoc = await t.get(clientRef);
            if (!clientDoc.exists) {
                console.warn(`[Fidelidade] Cliente ${clientId} não encontrado.`);
                return;
            }

            const currentPoints = clientDoc.data().loyaltyPoints || 0;
            const newBalance = currentPoints - pointsToDeduct + pointsToAdd;

            // Se o saldo ficar negativo (erro de sincronia), zeramos ou permitimos (depende da regra, aqui zeramos)
            const finalBalance = newBalance < 0 ? 0 : newBalance;

            // Atualiza o saldo principal
            t.update(clientRef, { loyaltyPoints: finalBalance });

            // Cria o registro no histórico (Subcoleção 'loyaltyHistory')
            const historyRef = clientRef.collection('loyaltyHistory').doc();
            t.set(historyRef, {
                date: new Date().toISOString(),
                type: pointsToDeduct > 0 ? 'redeem_and_earn' : 'earn',
                pointsEarned: pointsToAdd,
                pointsSpent: pointsToDeduct,
                balanceBefore: currentPoints,
                balanceAfter: finalBalance,
                sourceId: sourceId,
                sourceType: sourceType, // 'sale' ou 'appointment'
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
// SEÇÃO 2: NOTIFICAÇÕES (Gatilhos Existentes)
// ============================================================================

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
            await admin.messaging().sendEachForMulticast(message);
        } catch (error) {
            console.error("Erro envio novo agendamento:", error);
        }
    });

/**
 * Notificação de Cancelamento
 * + LÓGICA DE FIDELIDADE (Ao completar agendamento)
 */
exports.sendCancellationNotification = onDocumentUpdated(
    "appointments/{appointmentId}",
    async (event) => {
        const before = event.data.before.data();
        const after = event.data.after.data();
        const appointmentId = event.params.appointmentId;

        // --- A. Lógica de Cancelamento (Notificação) ---
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

        // --- B. Lógica de Fidelidade (Ao Completar/Pagar) ---
        // Se mudou para 'completed' (finalizado/pago)
        if (after.status === 'completed' && before.status !== 'completed') {
            // Junta serviços e produtos extras numa lista única para processar
            const allItems = [
                ...(after.services || []),
                ...(after.comandaItems || []),
                ...(after.items || [])
            ];

            await processLoyaltyTransaction(
                after.establishmentId,
                after.clientId, // Importante: O agendamento DEVE ter clientId
                allItems,
                after.totalAmount || 0,
                appointmentId,
                'appointment'
            );
        }
    });

// ============================================================================
// SEÇÃO 3: NOVOS GATILHOS DE VENDAS
// ============================================================================

/**
 * Processar Fidelidade em Vendas Avulsas (Sales)
 * Acionado quando um documento é criado na coleção 'sales'
 */
exports.handleNewSaleLoyalty = onDocumentCreated(
    "sales/{saleId}",
    async (event) => {
        const snapshot = event.data;
        if (!snapshot) return;

        const sale = snapshot.data();
        const saleId = event.params.saleId;

        if (!sale.establishmentId || !sale.clientId) {
            // Vendas sem cliente identificado não geram pontos
            return;
        }

        await processLoyaltyTransaction(
            sale.establishmentId,
            sale.clientId,
            sale.items || [], // Lista de itens vendidos
            sale.totalAmount || 0,
            saleId,
            'sale'
        );
    }
);