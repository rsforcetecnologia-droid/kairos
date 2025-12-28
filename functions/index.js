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

  if (snapshotUsers.empty) return [];

  const tokens = [];
  snapshotUsers.forEach((doc) => {
    const userData = doc.data();
    if (userData.fcmTokens && Array.isArray(userData.fcmTokens)) {
      tokens.push(...userData.fcmTokens);
    }
    if (userData.fcmToken) {
      tokens.push(userData.fcmToken);
    }
  });

  return [...new Set(tokens)];
}

exports.sendNewAppointmentNotification = onDocumentCreated(
    "appointments/{appointmentId}",
    async (event) => {
      const snapshot = event.data;
      if (!snapshot) return;

      const appointment = snapshot.data();
      const tokens = await getEstablishmentTokens(appointment.establishmentId);

      if (tokens.length === 0) {
        console.log("Nenhum token para notificar criação.");
        return;
      }

      const message = {
        notification: {
          title: "Novo Agendamento! 📅",
          body: `${appointment.clientName} agendou ` +
              `${appointment.serviceName} às ${appointment.time}.`,
        },
        tokens: tokens,
      };

      try {
        await admin.messaging().sendMulticast(message);
        console.log("Notificação de criação enviada.");
      } catch (error) {
        console.error("Erro ao enviar criação:", error);
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

      if (tokens.length === 0) {
        console.log("Nenhum token para notificar cancelamento.");
        return;
      }

      const message = {
        notification: {
          title: "Agendamento Cancelado ❌",
          body: `${after.clientName} cancelou o agendamento ` +
              `das ${after.time}.`,
        },
        tokens: tokens,
      };

      try {
        await admin.messaging().sendMulticast(message);
        console.log("Notificação de cancelamento enviada.");
      } catch (error) {
        console.error("Erro ao enviar cancelamento:", error);
      }
    });
