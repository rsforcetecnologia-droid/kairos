const {onDocumentCreated, onDocumentUpdated} =
    require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");

admin.initializeApp();

/**
 * Busca tokens de notificação dos usuários do estabelecimento.
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
    console.log(`Nenhum usuário encontrado para: ${establishmentId}`);
    return [];
  }

  const tokens = [];
  snapshotUsers.forEach((doc) => {
    const userData = doc.data();
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

// Configuração de "Alerta Máximo"
const androidConfig = {
  priority: "high",
  notification: {
    channelId: "kairos_appointments",
    priority: "max",
    defaultSound: true,
    defaultVibrateTimings: true,
    visibility: "public",
  },
};

const webpushConfig = {
  headers: {
    "Urgency": "high", // Importante para acordar o Android
  },
  fcmOptions: {
    link: "/app.html",
  },
  notification: {
    icon: "https://kairos-agenda-us.web.app/assets/icon.png",
    badge: "https://kairos-agenda-us.web.app/assets/icon.png",
    requireInteraction: true, // A notificação fica na tela até o usuário clicar
    vibrate: [200, 100, 200, 100, 200], // Padrão de vibração
  },
};

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

      const message = {
        notification: {
          title: "Novo Agendamento! 📅",
          body: `${clientName} agendou ${serviceName} às ${appointment.time}.`,
        },
        android: androidConfig, // Configuração nativa Android
        webpush: webpushConfig, // Configuração PWA
        tokens: tokens,
      };

      try {
        const response = await admin.messaging().sendEachForMulticast(message);
        console.log(`Sucesso: ${response.successCount}, Falhas: ${response.failureCount}`);
        
        // Remove tokens inválidos se houver falhas
        if (response.failureCount > 0) {
           // Lógica de limpeza pode ser adicionada futuramente
           console.log("Alguns tokens falharam (provavelmente antigos).");
        }
      } catch (error) {
        console.error("Erro fatal ao enviar notificação:", error);
      }
    });

exports.sendCancellationNotification = onDocumentUpdated(
    "appointments/{appointmentId}",
    async (event) => {
      const before = event.data.before.data();
      const after = event.data.after.data();

      const isCancelled = (after.status === "cancelled" ||
          after.status === "cancelado") &&
          (before.status !== "cancelled" && before.status !== "cancelado");

      if (!isCancelled) return;

      const tokens = await getEstablishmentTokens(after.establishmentId);
      if (tokens.length === 0) return;

      const clientName = after.clientName || "Cliente";

      const message = {
        notification: {
          title: "Agendamento Cancelado ❌",
          body: `${clientName} cancelou o agendamento das ${after.time}.`,
        },
        android: androidConfig,
        webpush: webpushConfig,
        tokens: tokens,
      };

      try {
        const response = await admin.messaging().sendEachForMulticast(message);
        console.log(`Cancelamento enviado. Sucesso: ${response.successCount}`);
      } catch (error) {
        console.error("Erro fatal ao enviar notificação:", error);
      }
    });