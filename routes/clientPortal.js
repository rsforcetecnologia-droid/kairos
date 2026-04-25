// routes/clientPortal.js (Portal do Cliente B2C - Autenticado + Público)

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// =======================================================================
// 🛠️ FUNÇÕES AUXILIARES
// =======================================================================

// --- FUNÇÃO AUXILIAR: LIMPAR TELEFONE (Para comparação segura) ---
function cleanPhone(phone) {
    if (!phone) return '';
    return String(phone).replace(/\D/g, ''); // Remove tudo o que não for número
}

// --- FUNÇÃO AUXILIAR: ENVIAR PUSH NOTIFICATION ---
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

// =======================================================================
// 🛡️ MIDDLEWARE DE AUTENTICAÇÃO DO CLIENTE FINAL (GOOGLE SIGN-IN)
// =======================================================================
const verifyClientToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acesso negado. Token de segurança ausente.' });
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
        // O Firebase Admin SDK verifica se o token do Google Sign-In é válido e não expirou
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.clientUser = decodedToken; // Guarda os dados: { email, name, picture, uid, ... }
        next();
    } catch (error) {
        console.error('[AUTH CLIENTE] Token inválido ou expirado:', error.message);
        return res.status(401).json({ message: 'Sessão expirada ou token inválido. Faça login novamente.' });
    }
};

// =======================================================================
// 🔓 ROTAS PÚBLICAS (Acesso Rápido com Validação Simples de Telefone)
// =======================================================================

// ROTA PÚBLICA: Listar agendamentos de um cliente por telemóvel
router.get('/appointments/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    const { phone } = req.query;

    if (!phone) {
        return res.status(400).json({ message: 'O número de telemóvel é obrigatório.' });
    }

    try {
        const { db } = req;
        const cleanPhoneSearch = cleanPhone(phone);
        const snapshot = await db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('clientPhone', '==', cleanPhoneSearch) 
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
        
        // Busca o Timezone do Estabelecimento para a notificação correta
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

            // COMPARAÇÃO DE TELEFONE
            const dbPhoneClean = cleanPhone(appointmentData.clientPhone);
            const reqPhoneClean = cleanPhone(phone);

            if (appointmentData.establishmentId !== establishmentId || dbPhoneClean !== reqPhoneClean) {
                throw new Error("Você não tem permissão para cancelar este agendamento.");
            }

            if (appointmentData.status === 'completed' || appointmentData.status === 'cancelled') {
                 throw new Error("Este agendamento já foi finalizado ou cancelado e não pode ser modificado.");
            }
            
            // --- 🚀 LÓGICA DE ASSINATURA VIP (NOVO) ---
            // Se o cliente pagou este agendamento com um Clube VIP, devolvemos o "uso" ao plano dele
            if (appointmentData.coveredByPlan && appointmentData.subscriptionId) {
                const subRef = db.collection('client_subscriptions').doc(appointmentData.subscriptionId);
                transaction.update(subRef, {
                    usageCurrentMonth: admin.firestore.FieldValue.increment(-1)
                });
            }

            // --- LÓGICA DE DEVOLUÇÃO DE PONTOS DE FIDELIDADE (ORIGINAL MANTIDA) ---
            if (appointmentData.redeemedReward && appointmentData.redeemedReward.points > 0) {
                const clientQuery = db.collection('clients')
                    .where('establishmentId', '==', establishmentId)
                    .where('phone', '==', appointmentData.clientPhone) 
                    .limit(1);
                
                const clientSnapshot = await transaction.get(clientQuery);
                
                if (!clientSnapshot.empty) {
                    const clientRef = clientSnapshot.docs[0].ref;
                    transaction.update(clientRef, { 
                        loyaltyPoints: admin.firestore.FieldValue.increment(appointmentData.redeemedReward.points) 
                    });
                    
                    const historyRef = clientRef.collection('loyaltyHistory').doc();
                    transaction.set(historyRef, {
                        type: 'refund',
                        points: appointmentData.redeemedReward.points,
                        reward: appointmentData.redeemedReward.reward,
                        reason: 'Cancelamento pelo Cliente',
                        timestamp: admin.firestore.FieldValue.serverTimestamp()
                    });
                }
            }

            // --- ATUALIZAÇÃO DO STATUS ---
            transaction.update(appointmentRef, { status: 'cancelled', updatedAt: admin.firestore.FieldValue.serverTimestamp() });

            // Criação da Notificação
            const notificationRef = db.collection('establishments').doc(establishmentId).collection('notifications').doc();
            
            const timeString = appointmentData.startTime.toDate().toLocaleTimeString('pt-BR', { 
                hour: '2-digit', minute: '2-digit', timeZone: timezone 
            });
            const dateString = appointmentData.startTime.toDate().toLocaleDateString('pt-BR', {
                day: '2-digit', month: '2-digit', timeZone: timezone
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
        const statusCode = error.message.includes('permissão') || error.message.includes('finalizado') ? 400 : 500;
        res.status(statusCode).json({ message: error.message || 'Ocorreu um erro no servidor.' });
    }
});

// =======================================================================
// 🔒 ROTAS PROTEGIDAS (Exigem Autenticação via Google / JWT)
// =======================================================================

/**
 * ROTA: GET /api/client-portal/me
 * OBJETIVO: Verificar se a conta Google do cliente já tem um histórico/WhatsApp associado.
 */
router.get('/me', verifyClientToken, async (req, res) => {
    const { email } = req.clientUser;
    const { db } = req;

    try {
        const snapshot = await db.collection('clients')
            .where('email', '==', email)
            .limit(1)
            .get();

        if (!snapshot.empty) {
            const clientData = snapshot.docs[0].data();
            return res.status(200).json({ 
                phone: clientData.phone, 
                name: clientData.name 
            });
        }

        res.status(404).json({ message: 'Perfil Google não vinculado a um telefone no CRM.' });
    } catch (error) {
        console.error("[PORTAL CLIENTE] Erro ao buscar perfil:", error);
        res.status(500).json({ message: 'Erro interno de servidor.' });
    }
});

/**
 * ROTA: GET /api/client-portal/my-subscriptions/:establishmentId
 * OBJETIVO: Devolver as assinaturas ativas do cliente para exibição na Área Restrita
 */
router.get('/my-subscriptions/:establishmentId', verifyClientToken, async (req, res) => {
    const { establishmentId } = req.params;
    const { phone } = req.query; 
    const { db } = req;

    if (!phone) return res.status(400).json({ message: 'Telefone é obrigatório para consultar assinaturas.' });
    const cleanPhoneSearch = cleanPhone(phone);

    try {
        const snapshot = await db.collection('client_subscriptions')
            .where('establishmentId', '==', establishmentId)
            .where('clientId', '==', cleanPhoneSearch)
            .get();

        // Ordenação em memória para não exigir indexação manual no Firestore
        const subs = snapshot.docs.map(doc => {
            const subData = doc.data();
            return {
                id: doc.id,
                ...subData,
                currentPeriodEnd: subData.currentPeriodEnd && subData.currentPeriodEnd.toDate 
                    ? subData.currentPeriodEnd.toDate().toISOString() 
                    : subData.currentPeriodEnd,
                currentPeriodStart: subData.currentPeriodStart && subData.currentPeriodStart.toDate 
                    ? subData.currentPeriodStart.toDate().toISOString() 
                    : subData.currentPeriodStart,
                createdAt: subData.createdAt && subData.createdAt.toDate 
                    ? subData.createdAt.toDate().toISOString() 
                    : subData.createdAt,
            };
        }).sort((a, b) => {
            const dateA = new Date(a.createdAt || 0);
            const dateB = new Date(b.createdAt || 0);
            return dateB - dateA; // Decrescente
        });

        res.status(200).json(subs);
    } catch (error) {
        console.error("[PORTAL CLIENTE] Erro ao buscar assinaturas:", error);
        res.status(500).json({ message: 'Erro ao processar as assinaturas do cliente.' });
    }
});

module.exports = router;