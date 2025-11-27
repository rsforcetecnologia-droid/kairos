// routes/clientPortal.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// --- FUNÇÃO AUXILIAR: ENVIAR PUSH NOTIFICATION (Copiada para garantir independência) ---
async function sendPushNotificationToEstablishment(db, establishmentId, title, body) {
    try {
        const usersSnapshot = await db.collection('users')
            .where('establishmentId', '==', establishmentId)
            .get();

        const tokens = [];
        usersSnapshot.forEach(doc => {
            const data = doc.data();
            if (data.fcmToken) {
                tokens.push(data.fcmToken);
            }
        });

        if (tokens.length === 0) return;

        const message = {
            notification: { title, body },
            tokens: tokens
        };

        const response = await admin.messaging().sendEachForMulticast(message);
        if (response.failureCount > 0) {
            console.warn(`[ClientPortal] Push: ${response.successCount} ok, ${response.failureCount} falhas.`);
        }
    } catch (error) {
        console.error("[ClientPortal] Erro ao enviar Push:", error);
    }
}

// ROTA PÚBLICA: Listar agendamentos de um cliente por telemóvel
router.get('/appointments/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    const { phone } = req.query;

    if (!phone) {
        return res.status(400).json({ message: 'O número de telemóvel é obrigatório.' });
    }

    try {
        const { db } = req;
        const snapshot = await db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('clientPhone', '==', phone)
            .orderBy('startTime', 'desc')
            .get();

        if (snapshot.empty) {
            return res.status(200).json([]);
        }

        const professionalsSnapshot = await db.collection('professionals').where('establishmentId', '==', establishmentId).get();
        
        const professionalsMap = new Map(professionalsSnapshot.docs.map(doc => [doc.id, {
            name: doc.data().name,
            photo: doc.data().photo || null
        }]));

        const appointments = snapshot.docs.map(doc => {
            const data = doc.data();
            const serviceName = (data.services && Array.isArray(data.services))
                ? data.services.map(s => s.name).join(', ')
                : 'Serviço não especificado';
            
            const professionalInfo = professionalsMap.get(data.professionalId) || { name: 'Indefinido', photo: null };
                
            return {
                id: doc.id,
                startTime: data.startTime.toDate().toISOString(),
                serviceName: serviceName,
                clientName: data.clientName, 
                professionalName: professionalInfo.name,
                professionalPhoto: professionalInfo.photo,
                status: data.status
            };
        });

        res.status(200).json(appointments);

    } catch (error) {
        console.error("Erro ao buscar agendamentos do cliente:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// ROTA PÚBLICA: Cancelar um agendamento
router.post('/appointments/:appointmentId/cancel', async (req, res) => {
    const { appointmentId } = req.params;
    const { phone, establishmentId } = req.body;

    if (!phone || !establishmentId) {
        return res.status(400).json({ message: 'O telemóvel e ID do estabelecimento são obrigatórios para cancelar.' });
    }

    try {
        const { db } = req;
        const appointmentRef = db.collection('appointments').doc(appointmentId);
        
        // 1. Busca o Timezone do Estabelecimento para a notificação correta
        const establishmentDocGlobal = await db.collection('establishments').doc(establishmentId).get();
        const establishmentDataGlobal = establishmentDocGlobal.exists ? establishmentDocGlobal.data() : {};
        const timezone = establishmentDataGlobal.timezone || 'America/Sao_Paulo';

        let notificationTitle = "";
        let notificationBody = "";

        await db.runTransaction(async (transaction) => {
            const appointmentDoc = await transaction.get(appointmentRef);
            if (!appointmentDoc.exists) {
                throw new Error("Agendamento não encontrado.");
            }
            
            const appointmentData = appointmentDoc.data();

            if (appointmentData.establishmentId !== establishmentId || appointmentData.clientPhone !== phone) {
                throw new Error("Você não tem permissão para cancelar este agendamento.");
            }
            if (appointmentData.status === 'completed' || appointmentData.status === 'cancelled') {
                 throw new Error("Este agendamento já foi finalizado ou cancelado e não pode ser modificado.");
            }
            
            transaction.update(appointmentRef, { status: 'cancelled' });

            const notificationRef = db.collection('establishments').doc(establishmentId).collection('notifications').doc();
            
            // --- FORMATAÇÃO CORRIGIDA COM TIMEZONE ---
            const timeString = appointmentData.startTime.toDate().toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit',
                timeZone: timezone 
            });
            const dateString = appointmentData.startTime.toDate().toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                timeZone: timezone
            });

            const notificationMessage = `${appointmentData.clientName} cancelou o agendamento de ${dateString} às ${timeString}`;
            
            notificationTitle = "Agendamento Cancelado";
            notificationBody = notificationMessage;

            transaction.set(notificationRef, {
                title: notificationTitle,
                message: notificationMessage,
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
                read: false,
                type: 'cancellation',
                relatedId: appointmentId
            });
        });

        // --- ENVIA PUSH NOTIFICATION ---
        sendPushNotificationToEstablishment(db, establishmentId, notificationTitle, notificationBody)
            .catch(err => console.error("Falha silenciosa no push de cancelamento:", err));

        res.status(200).json({ message: 'Agendamento cancelado com sucesso.' });

    } catch (error) {
        console.error("Erro ao cancelar agendamento:", error);
        res.status(500).json({ message: error.message || 'Ocorreu um erro no servidor.' });
    }
});

module.exports = router;