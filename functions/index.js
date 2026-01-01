const {onDocumentCreated, onDocumentUpdated} = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");

admin.initializeApp();

/**
 * Busca tokens de notificação dos utilizadores do estabelecimento.
 * Mantém a lógica original para suportar arrays ou tokens únicos.
 * @param {string} establishmentId O ID do estabelecimento.
 * @return {Promise<Array<string>>} Lista de tokens únicos.
 */
async function getEstablishmentTokens(establishmentId) {
  if (!establishmentId) return [];

  const usersRef = admin.firestore().collection("users");
  const snapshotUsers = await usersRef
      .where("establishmentId", "==", establishmentId)
      .get();

  if (snapshotUsers.empty) {
    console.log(`Nenhum utilizador encontrado para: ${establishmentId}`);
    return [];
  }

  const tokens = [];
  snapshotUsers.forEach((doc) => {
    const userData = doc.data();
    // Suporte para estrutura antiga (fcmToken) e nova (fcmTokens array)
    if (userData.fcmTokens && Array.isArray(userData.fcmTokens)) {
      tokens.push(...userData.fcmTokens);
    } else if (userData.fcmToken) {
      tokens.push(userData.fcmToken);
    }
  });

  const uniqueTokens = [...new Set(tokens)];
  console.log(`Encontrados ${uniqueTokens.length} tokens para envio.`);
  return uniqueTokens;
}

// --- Configurações de Alta Prioridade para PWA/Android ---

const androidConfig = {
  priority: "high",
  ttl: 3600 * 24, // Tenta entregar durante 24h se o telemóvel estiver desligado
};

const webpushConfig = {
  headers: {
    "Urgency": "high", // Crítico para garantir que o Android acorda o SW
  },
  fcmOptions: {
    link: "/app.html",
  }
};

/**
 * Função: Notificação de Novo Agendamento
 * Gatilho: Criação de documento em 'appointments/{id}'
 */
exports.sendNewAppointmentNotification = onDocumentCreated(
    "appointments/{appointmentId}",
    async (event) => {
      const snapshot = event.data;
      if (!snapshot) return;

      const appointment = snapshot.data();
      if (!appointment.establishmentId) return;

      const tokens = await getEstablishmentTokens(appointment.establishmentId);
      if (tokens.length === 0) return;

      const clientName = appointment.clientName || "Cliente";
      const serviceName = appointment.serviceName || "serviço";

      // MUDANÇA IMPORTANTE: Usamos apenas 'data' (sem 'notification')
      // Isto delega a exibição visual exclusivamente para o Service Worker
      const message = {
        data: {
          type: "new_appointment",
          title: "Novo Agendamento! 📅",
          body: `${clientName} agendou ${serviceName} às ${appointment.time}.`,
          url: "/app.html"
        },
        android: androidConfig,
        webpush: webpushConfig,
        tokens: tokens, // Envia para todos os tokens encontrados
      };

      try {
        const response = await admin.messaging().sendEachForMulticast(message);
        console.log(`Sucesso: ${response.successCount}, Falhas: ${response.failureCount}`);
        
        if (response.failureCount > 0) {
           console.log("Alguns tokens falharam (provavelmente inválidos ou antigos).");
           // Aqui poderias adicionar lógica para limpar tokens inválidos do Firestore se necessário
        }
      } catch (error) {
        console.error("Erro fatal ao enviar notificação de novo agendamento:", error);
      }
    });

/**
 * Função: Notificação de Cancelamento
 * Gatilho: Atualização de documento em 'appointments/{id}'
 */
exports.sendCancellationNotification = onDocumentUpdated(
    "appointments/{appointmentId}",
    async (event) => {
      const before = event.data.before.data();
      const after = event.data.after.data();

      // Verifica se o status mudou para cancelado
      const isCancelled = (after.status === "cancelled" ||
          after.status === "cancelado") &&
          (before.status !== "cancelled" && before.status !== "cancelado");

      if (!isCancelled) return;

      const tokens = await getEstablishmentTokens(after.establishmentId);
      if (tokens.length === 0) return;

      const clientName = after.clientName || "Cliente";

      const message = {
        data: {
          type: "cancellation",
          title: "Agendamento Cancelado ❌",
          body: `${clientName} cancelou o agendamento das ${after.time}.`,
          url: "/app.html"
        },
        android: androidConfig,
        webpush: webpushConfig,
        tokens: tokens,
      };

      try {
        const response = await admin.messaging().sendEachForMulticast(message);
        console.log(`Notificação de cancelamento enviada. Sucesso: ${response.successCount}`);
      } catch (error) {
        console.error("Erro fatal ao enviar notificação de cancelamento:", error);
      }
    });