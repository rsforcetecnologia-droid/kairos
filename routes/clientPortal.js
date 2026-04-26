// routes/clientPortal.js (Portal do Cliente B2C - Autenticado + Público)

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// =======================================================================
// 🛠️ FUNÇÕES AUXILIARES E DE INFRAESTRUTURA
// =======================================================================

/**
 * Limpa a string de telefone mantendo apenas números.
 * @param {string} phone 
 * @returns {string}
 */
function cleanPhone(phone) {
    if (!phone) return '';
    return String(phone).replace(/\D/g, ''); 
}

/**
 * Envia Notificação Push via FCM para os dispositivos do estabelecimento.
 */
async function sendPushNotificationToEstablishment(db, establishmentId, title, body) {
    try {
        const usersSnapshot = await db.collection('users')
            .where('establishmentId', '==', establishmentId)
            .get();

        const tokens = usersSnapshot.docs
            .map(doc => doc.data().fcmToken)
            .filter(token => !!token);

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

// =======================================================================
// 🛡️ MIDDLEWARE DE AUTENTICAÇÃO DO CLIENTE FINAL (FIREBASE AUTH / GOOGLE)
// =======================================================================
/**
 * Verifica o JWT enviado pelo frontend (Google Sign-In ou Email/Senha).
 */
const verifyClientToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acesso negado. Token de segurança ausente.' });
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.clientUser = decodedToken; // { email, name, picture, uid, ... }
        next();
    } catch (error) {
        console.error('[AUTH CLIENTE] Token inválido ou expirado:', error.message);
        return res.status(401).json({ message: 'Sessão expirada ou token inválido. Faça login novamente.' });
    }
};

// =======================================================================
// 🔓 ROTAS PÚBLICAS (Acesso Rápido - Sem Login)
// =======================================================================

/**
 * GET /appointments/:establishmentId
 * Listar agendamentos de um cliente por telemóvel (Bug Fix Aplicado)
 */
router.get('/appointments/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    const { phone } = req.query;

    if (!phone) {
        return res.status(400).json({ message: 'O número de telemóvel é obrigatório.' });
    }

    try {
        const { db } = req;
        
        // BUG FIX: O sistema gravava com máscara e buscava sem máscara.
        // Vamos buscar primeiro com a string exata (com máscara).
        let snapshot = await db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('clientPhone', '==', phone) 
            .orderBy('startTime', 'desc')
            .get();

        // Fallback para dados legados: Se não achou, tenta buscar sem máscara.
        if (snapshot.empty) {
            const cleanPhoneSearch = cleanPhone(phone);
            snapshot = await db.collection('appointments')
                .where('establishmentId', '==', establishmentId)
                .where('clientPhone', '==', cleanPhoneSearch) 
                .orderBy('startTime', 'desc')
                .get();
        }

        if (snapshot.empty) {
            return res.status(200).json([]);
        }

        // Otimização: Busca os profissionais em paralelo
        const professionalsSnapshot = await db.collection('professionals')
            .where('establishmentId', '==', establishmentId)
            .get();
        
        const professionalsMap = new Map(professionalsSnapshot.docs.map(doc => [doc.id, {
            name: doc.data().name,
            photo: doc.data().photo || null
        }]));

        const appointments = snapshot.docs.map(doc => {
            const data = doc.data();
            const serviceName = (data.services && Array.isArray(data.services))
                ? data.services.map(s => s.name).join(', ')
                : (data.serviceName || 'Serviço não especificado');
            
            const professionalInfo = professionalsMap.get(data.professionalId) || { name: data.professionalName || 'Indefinido', photo: null };
                
            return {
                id: doc.id,
                startTime: data.startTime.toDate().toISOString(),
                serviceName: serviceName,
                clientName: data.clientName, 
                professionalName: professionalInfo.name,
                professionalPhoto: professionalInfo.photo,
                status: data.status,
                hasRewards: data.hasRewards || false,
                redeemedReward: data.redeemedReward || null
            };
        });

        res.status(200).json(appointments);

    } catch (error) {
        console.error("[ClientPortal] Erro ao buscar agendamentos do cliente:", error);
        res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
    }
});

/**
 * POST /appointments/:appointmentId/cancel
 * Cancelar um agendamento público (Validação por telefone)
 */
router.post('/appointments/:appointmentId/cancel', async (req, res) => {
    const { appointmentId } = req.params;
    const { phone, establishmentId } = req.body;

    if (!phone || !establishmentId) {
        return res.status(400).json({ message: 'O telemóvel e ID do estabelecimento são obrigatórios.' });
    }

    try {
        const { db } = req;
        const appointmentRef = db.collection('appointments').doc(appointmentId);
        
        const establishmentDocGlobal = await db.collection('establishments').doc(establishmentId).get();
        const timezone = establishmentDocGlobal.exists ? (establishmentDocGlobal.data().timezone || 'America/Sao_Paulo') : 'America/Sao_Paulo';

        let notificationTitle = "";
        let notificationBody = "";

        await db.runTransaction(async (transaction) => {
            const appointmentDoc = await transaction.get(appointmentRef);
            if (!appointmentDoc.exists) throw new Error("Agendamento não encontrado.");
            
            const appointmentData = appointmentDoc.data();

            // Validação de segurança robusta comparando apenas dígitos numéricos
            if (appointmentData.establishmentId !== establishmentId || cleanPhone(appointmentData.clientPhone) !== cleanPhone(phone)) {
                throw new Error("Você não tem permissão para cancelar este agendamento.");
            }

            if (appointmentData.status === 'completed' || appointmentData.status === 'cancelled') {
                 throw new Error("Este agendamento já foi finalizado ou cancelado.");
            }
            
            // Reembolsa o uso do plano VIP, se aplicável
            if (appointmentData.coveredByPlan && appointmentData.subscriptionId) {
                const subRef = db.collection('client_subscriptions').doc(appointmentData.subscriptionId);
                transaction.update(subRef, { usageCurrentMonth: admin.firestore.FieldValue.increment(-1) });
            }

            // Reembolsa pontos de fidelidade
            if (appointmentData.redeemedReward && appointmentData.redeemedReward.points > 0) {
                const clientQuery = db.collection('clients')
                    .where('establishmentId', '==', establishmentId)
                    .where('phone', '==', appointmentData.clientPhone) 
                    .limit(1);
                
                const clientSnapshot = await transaction.get(clientQuery);
                
                if (!clientSnapshot.empty) {
                    const clientRef = clientSnapshot.docs[0].ref;
                    transaction.update(clientRef, { loyaltyPoints: admin.firestore.FieldValue.increment(appointmentData.redeemedReward.points) });
                    
                    transaction.set(clientRef.collection('loyaltyHistory').doc(), {
                        type: 'refund',
                        points: appointmentData.redeemedReward.points,
                        reward: appointmentData.redeemedReward.reward,
                        reason: 'Cancelamento pelo Cliente',
                        timestamp: admin.firestore.FieldValue.serverTimestamp()
                    });
                }
            }

            transaction.update(appointmentRef, { status: 'cancelled', updatedAt: admin.firestore.FieldValue.serverTimestamp() });

            // Gera notificação in-app
            const timeString = appointmentData.startTime.toDate().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: timezone });
            const dateString = appointmentData.startTime.toDate().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', timeZone: timezone });

            notificationMessage = `${appointmentData.clientName} cancelou o agendamento de ${dateString} às ${timeString}`;
            notificationTitle = "Agendamento Cancelado";
            notificationBody = notificationMessage;

            const notificationRef = db.collection('establishments').doc(establishmentId).collection('notifications').doc();
            transaction.set(notificationRef, {
                title: notificationTitle,
                message: notificationMessage,
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
                read: false,
                type: 'cancellation',
                relatedId: appointmentId
            });
        });

        sendPushNotificationToEstablishment(db, establishmentId, notificationTitle, notificationBody)
            .catch(err => console.error("Falha silenciosa no push:", err));

        res.status(200).json({ message: 'Agendamento cancelado com sucesso.' });

    } catch (error) {
        console.error("[ClientPortal] Erro ao cancelar agendamento:", error);
        const statusCode = error.message.includes('permissão') || error.message.includes('finalizado') ? 400 : 500;
        res.status(statusCode).json({ message: error.message || 'Ocorreu um erro no servidor.' });
    }
});

// =======================================================================
// 🔒 ROTAS PROTEGIDAS (Exigem Login/Autenticação)
// =======================================================================

/**
 * GET /me
 * Busca o perfil unificado do cliente autenticado
 */
router.get('/me', verifyClientToken, async (req, res) => {
    const { uid } = req.clientUser;
    const { db } = req;

    try {
        // Usamos o UID do Firebase Auth como ID principal do documento na coleção `clients`
        const clientRef = db.collection('clients').doc(uid);
        const clientDoc = await clientRef.get();

        if (clientDoc.exists) {
            return res.status(200).json(clientDoc.data());
        }

        res.status(200).json(null); // Retorna sucesso (200), mas diz que o perfil é nulo
    } catch (error) {
        console.error("[PORTAL CLIENTE] Erro ao buscar perfil:", error);
        res.status(500).json({ message: 'Erro interno de servidor.' });
    }
});

/**
 * POST /profile
 * Cria ou Atualiza o perfil do cliente com os dados exigidos para assinatura (CPF, DOB)
 */
router.post('/profile', verifyClientToken, async (req, res) => {
    const { uid, email } = req.clientUser;
    const { db } = req;
    const { name, phone, document, birthDate, establishmentId } = req.body;

    if (!name || !phone || !document || !birthDate) {
        return res.status(400).json({ message: 'Dados incompletos. Nome, Telefone, CPF e Data de Nascimento são obrigatórios.' });
    }

    try {
        const clientRef = db.collection('clients').doc(uid);
        const cleanDoc = document.replace(/\D/g, ''); // Sanitiza o CPF

        const payload = {
            uid,
            email,
            name,
            phone,
            document: cleanDoc,
            birthDate,
            establishmentId: establishmentId || null, // Opcional no cadastro global, mas útil
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        };

        const clientDoc = await clientRef.get();
        if (!clientDoc.exists) {
            payload.createdAt = admin.firestore.FieldValue.serverTimestamp();
            payload.loyaltyPoints = 0;
            payload.totalDebt = 0;
        }

        await clientRef.set(payload, { merge: true });

        res.status(200).json({ message: 'Perfil salvo com sucesso!', data: payload });
    } catch (error) {
        console.error("[PORTAL CLIENTE] Erro ao salvar perfil:", error);
        res.status(500).json({ message: 'Erro ao processar dados do perfil.' });
    }
});

/**
 * GET /my-subscriptions/:establishmentId
 * Lista assinaturas do cliente autenticado
 */
router.get('/my-subscriptions/:establishmentId', verifyClientToken, async (req, res) => {
    const { establishmentId } = req.params;
    const { uid } = req.clientUser; 
    const { db } = req;

    try {
        // Agora buscamos as assinaturas vinculadas ao UID autenticado
        const snapshot = await db.collection('client_subscriptions')
            .where('establishmentId', '==', establishmentId)
            .where('clientAuthId', '==', uid) // Garantindo segurança via JWT
            .get();

        const subs = snapshot.docs.map(doc => {
            const subData = doc.data();
            return {
                id: doc.id,
                ...subData,
                currentPeriodEnd: subData.currentPeriodEnd?.toDate().toISOString(),
                currentPeriodStart: subData.currentPeriodStart?.toDate().toISOString(),
                createdAt: subData.createdAt?.toDate().toISOString(),
            };
        }).sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

        res.status(200).json(subs);
    } catch (error) {
        console.error("[PORTAL CLIENTE] Erro ao buscar assinaturas:", error);
        res.status(500).json({ message: 'Erro ao processar as assinaturas.' });
    }
});

module.exports = router;