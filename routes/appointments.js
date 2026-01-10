// routes/appointments.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, hasAccess, isOwner } = require('../middlewares/auth');

// =======================================================================
// 🛠️ FUNÇÕES AUXILIARES
// =======================================================================

// --- CORREÇÃO: Helper para limpar ID (garante formato numérico) ---
function cleanId(id) {
    if (!id) return '';
    return String(id).replace(/\D/g, '');
}

function handleFirestoreError(res, error, context) {
    console.error(`Erro em ${context}:`, error);
    const linkMatch = error.message ? error.message.match(/https:\/\/console\.firebase\.google\.com[^\s]*/) : null;
    const indexLink = linkMatch ? linkMatch[0] : null;

    if (error.message && error.message.includes('requires an index')) {
        return res.status(500).json({ 
            message: `O Firestore precisa de um índice para ${context}.`,
            createIndexUrl: indexLink || "Link não encontrado automaticamente. Verifique os logs."
        });
    }
    res.status(500).json({ message: `Erro ao processar ${context}: ${error.message}` });
}

async function checkClientRewards(db, clientName, clientPhone, establishmentId) {
    if (!clientName || !clientPhone || !establishmentId) return false;
    try {
        // CORREÇÃO: Busca pelo ID direto (mais performático e seguro)
        const safeId = cleanId(clientPhone);
        const clientDoc = await db.collection('clients').doc(safeId).get();
        const establishmentDoc = await db.collection('establishments').doc(establishmentId).get();

        if (!clientDoc.exists || !establishmentDoc.exists) return false;
        
        const clientData = clientDoc.data();
        // Segurança: verifica se o cliente pertence mesmo a este estabelecimento
        if (clientData.establishmentId !== establishmentId) return false;

        const establishmentData = establishmentDoc.data(); 
        const loyaltyProgram = establishmentData.loyaltyProgram;
        
        if (!establishmentData.modules?.['loyalty-section'] || !loyaltyProgram?.enabled || !loyaltyProgram.tiers?.length) {
            return false;
        }

        const points = clientData.loyaltyPoints || 0;
        if (points === 0) return false; 

        const minPoints = Math.min(...loyaltyProgram.tiers.map(r => r.points));
        return (minPoints !== Infinity) && (points >= minPoints);

    } catch (error) {
        console.error("Erro checkClientRewards:", error);
        return false;
    }
}

async function sendPushNotificationToEstablishment(db, establishmentId, title, body) {
    if (!establishmentId) return; 

    try {
        const usersSnapshot = await db.collection('users')
            .where('establishmentId', '==', establishmentId)
            .get();

        const tokens = [];
        usersSnapshot.forEach(doc => {
            const data = doc.data();
            if (data.fcmToken && data.establishmentId === establishmentId) {
                tokens.push(data.fcmToken);
            }
        });

        if (tokens.length === 0) return;

        const message = { 
            notification: { title, body }, 
            tokens,
            data: {
                establishmentId: establishmentId, 
                type: 'appointment_update'
            }
        };
        
        await admin.messaging().sendEachForMulticast(message);
    } catch (error) {
        console.error("Erro Push:", error);
    }
}

// =======================================================================
// 🔓 ROTA PÚBLICA (SEM LOGIN NECESSÁRIO)
// =======================================================================

// 1. CRIAR AGENDAMENTO (Cliente Final)
router.post('/', async (req, res) => {
    const { db } = req;
    const { establishmentId, services, professionalId, clientName, clientPhone, startTime, redeemedReward } = req.body;
    
    if (!establishmentId || !services || !professionalId || !clientName || !clientPhone || !startTime) {
        return res.status(400).json({ message: 'Campos obrigatórios faltando.' });
    }

    try {
        const establishmentDocGlobal = await db.collection('establishments').doc(establishmentId).get();
        if (!establishmentDocGlobal.exists) throw new Error('Estabelecimento não encontrado.');
        
        const timezone = establishmentDocGlobal.data().timezone || 'America/Sao_Paulo';
        const professionalDoc = await db.collection('professionals').doc(professionalId).get();
        if (!professionalDoc.exists) throw new Error('Profissional inválido.');
        const professionalName = professionalDoc.data().name;

        // Validar Serviços
        let totalDuration = 0;
        let totalAmount = 0;
        const servicesDetails = [];
        for (const s of services) {
            const doc = await db.collection('services').doc(s.id).get();
            if (!doc.exists) continue; 
            const data = doc.data();
            totalDuration += (data.duration || 0) + (data.bufferTime || 0);
            totalAmount += (data.price || 0);
            servicesDetails.push({ 
                id: doc.id, name: data.name, price: data.price, 
                duration: data.duration, bufferTime: data.bufferTime || 0, photo: data.photo || null 
            });
        }

        const startDate = new Date(startTime);
        const endDate = new Date(startDate.getTime() + totalDuration * 60000);
        const newAppointmentRef = db.collection('appointments').doc();
        
        // CORREÇÃO: Garante ID seguro para buscar/criar cliente
        const safeClientId = cleanId(clientPhone);
        const hasRewards = await checkClientRewards(db, clientName, safeClientId, establishmentId);
        
        let notificationTitle = "", notificationBody = "";

        await db.runTransaction(async (transaction) => {
            // CORREÇÃO: Usa o ID direto em vez de query (evita duplicidade e garante padrão)
            const clientRef = db.collection('clients').doc(safeClientId);
            const clientDoc = await transaction.get(clientRef);
            
            // Verifica conflitos de agenda
            const conflictQuery = db.collection('appointments')
                .where('professionalId', '==', professionalId)
                .where('startTime', '<', admin.firestore.Timestamp.fromDate(endDate));
            
            const potentialConflicts = await transaction.get(conflictQuery);
            const actualConflicts = potentialConflicts.docs.filter(doc => 
                doc.data().endTime.toDate() > startDate && doc.data().status !== 'cancelled'
            );
            if (actualConflicts.length > 0) throw new Error('Horário indisponível.');

            // Cria ou Atualiza Cliente
            if (!clientDoc.exists) {
                // Cliente NOVO: Cria com ID igual ao telefone limpo
                transaction.set(clientRef, {
                    establishmentId, 
                    name: clientName, 
                    phone: clientPhone, // Mantém formatação original visual
                    id: safeClientId, // ID explícito
                    createdAt: admin.firestore.FieldValue.serverTimestamp(), 
                    loyaltyPoints: 0
                });
            } else {
                // Cliente EXISTE: Atualiza nome se mudou
                if (clientDoc.data().name !== clientName) {
                    transaction.update(clientRef, { name: clientName });
                }
            }
            
            let newAppointment = {
                establishmentId, services: servicesDetails, professionalId, professionalName,
                clientName, clientPhone, 
                startTime: admin.firestore.Timestamp.fromDate(startDate),
                endTime: admin.firestore.Timestamp.fromDate(endDate),
                status: 'confirmed', createdAt: admin.firestore.FieldValue.serverTimestamp(),
                hasRewards,
                totalAmount: totalAmount 
            };

            // Lógica de Resgate (se houver)
            if (redeemedReward && redeemedReward.points > 0) {
                if (!clientDoc.exists) throw new Error("Cliente novo não pode resgatar pontos.");
                const currentPoints = clientDoc.data().loyaltyPoints || 0;
                if (currentPoints < redeemedReward.points) throw new Error("Pontos insuficientes.");
                
                transaction.update(clientRef, { loyaltyPoints: admin.firestore.FieldValue.increment(-redeemedReward.points) });
                transaction.set(clientRef.collection('loyaltyHistory').doc(), {
                    type: 'redeem', points: -redeemedReward.points, reward: redeemedReward.reward, timestamp: admin.firestore.FieldValue.serverTimestamp()
                });
                newAppointment.redeemedReward = redeemedReward;
                newAppointment.hasRewards = (currentPoints - redeemedReward.points) > 0; 
            }
            
            transaction.set(newAppointmentRef, newAppointment);

            // Notificação Interna
            const dateString = startDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', timeZone: timezone });
            const timeString = startDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: timezone });
            const serviceNames = servicesDetails.map(s => s.name).join(', ');
            
            notificationTitle = "Novo Agendamento!";
            notificationBody = `${clientName} - ${dateString} às ${timeString}`;

            transaction.set(db.collection('establishments').doc(establishmentId).collection('notifications').doc(), {
                title: notificationTitle, message: `${clientName} agendou ${serviceNames} para ${dateString} ${timeString}`,
                timestamp: admin.firestore.FieldValue.serverTimestamp(), read: false, type: 'new_appointment', relatedId: newAppointmentRef.id
            });
        });

        sendPushNotificationToEstablishment(db, establishmentId, notificationTitle, notificationBody)
            .catch(e => console.error("Falha push:", e));

        res.status(201).json({ message: 'Agendamento criado!' });
    } catch (error) {
        handleFirestoreError(res, error, 'criar agendamento');
    }
});

// =======================================================================
// 🔒 ROTAS PRIVADAS (EXIGEM LOGIN)
// =======================================================================

router.use(verifyToken, hasAccess);

// 2. LISTAR AGENDAMENTOS
router.get('/:establishmentId', async (req, res) => {
    try {
        const { establishmentId } = req.params;
        const { startDate, endDate, professionalId } = req.query; 

        if (!startDate || !endDate) return res.status(400).json({ message: 'Período obrigatório.' });
        
        const { db } = req;
        const start = new Date(startDate);
        const end = new Date(endDate);

        const { role, professionalId: userProfessionalId, permissions } = req.user;
        const canViewAll = permissions === null || permissions['agenda-section']?.view_all_prof === true;

        let query = db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('startTime', '>=', start)
            .where('startTime', '<=', end)
            .where('status', 'in', ['confirmed', 'awaiting_payment', 'completed']);

        if (role === 'employee' && !canViewAll) {
            if (userProfessionalId) query = query.where('professionalId', '==', userProfessionalId);
            else return res.status(200).json([]);
        } else if (professionalId && professionalId !== 'all') { 
            query = query.where('professionalId', '==', professionalId);
        }

        const [appointmentsSnapshot, professionalsSnapshot] = await Promise.all([
            query.get(),
            db.collection('professionals').where('establishmentId', '==', establishmentId).get()
        ]);

        if (appointmentsSnapshot.empty) return res.status(200).json([]);

        const professionalsMap = new Map(professionalsSnapshot.docs.map(d => [d.id, d.data().name]));
        
        // Cache para evitar múltiplas chamadas ao banco para o mesmo cliente na mesma listagem
        const clientRewardsCache = new Map();

        const enrichedAppointments = await Promise.all(appointmentsSnapshot.docs.map(async (doc) => {
            const data = doc.data();
            const serviceName = (data.services || []).map(s => s.name).join(', ') || data.serviceName || 'N/A';
            
            let hasRewards = data.hasRewards;

            // Se não tiver info de rewards salva, verifica em cache ou busca
            if (hasRewards === undefined) {
                const identifier = `${data.clientPhone}`;
                if (clientRewardsCache.has(identifier)) {
                    hasRewards = clientRewardsCache.get(identifier);
                } else {
                    hasRewards = await checkClientRewards(db, data.clientName, data.clientPhone, establishmentId);
                    clientRewardsCache.set(identifier, hasRewards);
                }
            }

            return {
                id: doc.id, ...data,
                startTime: data.startTime.toDate(),
                endTime: data.endTime.toDate(),
                serviceName,
                professionalName: professionalsMap.get(data.professionalId) || 'Não encontrado',
                hasRewards
            };
        }));

        res.status(200).json(enrichedAppointments);
    } catch (error) {
        handleFirestoreError(res, error, 'listar agendamentos');
    }
});

// 3. HISTÓRICO CANCELADOS
router.get('/cancelled/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) return res.status(400).json({ message: 'Datas obrigatórias.' });
    try {
        const start = new Date(startDate);
        const end = new Date(endDate + "T23:59:59");
        const snapshot = await req.db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('status', '==', 'cancelled')
            .where('startTime', '>=', start)
            .where('startTime', '<=', end)
            .orderBy('startTime', 'desc').get();
            
        const list = snapshot.docs.map(doc => ({
            id: doc.id,
            clientName: doc.data().clientName,
            serviceName: (doc.data().services || []).map(s => s.name).join(', '),
            professionalName: doc.data().professionalName || 'N/A',
            date: doc.data().startTime.toDate().toISOString(),
        }));
        res.status(200).json(list);
    } catch (error) { handleFirestoreError(res, error, 'cancelados'); }
});

// 4. DELETAR AGENDAMENTO
router.delete('/:appointmentId', async (req, res) => {
    const { appointmentId } = req.params;
    const { db } = req;
    let notificationData = null;

    try {
        await db.runTransaction(async (transaction) => {
            const ref = db.collection('appointments').doc(appointmentId);
            const doc = await transaction.get(ref);
            if (!doc.exists) throw new Error("Não encontrado.");
            
            const data = doc.data();
            notificationData = {
                establishmentId: data.establishmentId,
                clientName: data.clientName || 'Cliente',
                date: data.startTime.toDate()
            };

            const items = data.comandaItems || [];
            const products = items.filter(i => i.type === 'product');
            for (const item of products) {
                if (item.itemId) {
                    const prodRef = db.collection('products').doc(item.itemId);
                    transaction.update(prodRef, { currentStock: admin.firestore.FieldValue.increment(item.quantity || 1) });
                }
            }
            transaction.delete(ref);
        });

        if (notificationData) {
            const dateStr = notificationData.date.toLocaleDateString('pt-BR');
            const timeStr = notificationData.date.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
            
            sendPushNotificationToEstablishment(
                db, 
                notificationData.establishmentId, 
                "Agendamento Excluído", 
                `${notificationData.clientName} - ${dateStr} às ${timeStr} foi removido.`
            ).catch(e => console.error("Erro push delete:", e));
        }

        res.status(200).json({ message: 'Excluído.' });
    } catch (error) { handleFirestoreError(res, error, 'excluir agendamento'); }
});

// 5. ATUALIZAR AGENDAMENTO
router.put('/:appointmentId', async (req, res) => {
    const { db } = req;
    const { appointmentId } = req.params;
    const { services, professionalId, clientName, clientPhone, startTime, redeemedReward } = req.body;
    try {
        const profDoc = await db.collection('professionals').doc(professionalId).get();
        if (!profDoc.exists) throw new Error('Profissional inválido.');
        
        let duration = 0;
        let totalAmount = 0; 
        const servicesDetails = [];
        for (const s of services) {
            const d = await db.collection('services').doc(s.id).get();
            if(d.exists) {
                duration += (d.data().duration||0) + (d.data().bufferTime||0);
                totalAmount += (d.data().price || 0); 
                servicesDetails.push({ id: d.id, name: d.data().name, price: d.data().price, duration: d.data().duration, bufferTime: d.data().bufferTime||0 });
            }
        }
        const start = new Date(startTime);
        const end = new Date(start.getTime() + duration * 60000);

        await db.runTransaction(async (transaction) => {
            const ref = db.collection('appointments').doc(appointmentId);
            const oldDoc = await transaction.get(ref);
            if (!oldDoc.exists) throw new Error("Não encontrado.");
            const oldData = oldDoc.data();

            const conflicts = await transaction.get(
                db.collection('appointments').where('professionalId', '==', professionalId).where('startTime', '<', admin.firestore.Timestamp.fromDate(end))
            );
            const hasConflict = conflicts.docs.some(d => d.id !== appointmentId && d.data().endTime.toDate() > start && d.data().status !== 'cancelled');
            if (hasConflict) throw new Error('Horário indisponível.');

            // CORREÇÃO: Busca cliente por ID limpo
            const safeClientId = cleanId(clientPhone);
            const clientRef = db.collection('clients').doc(safeClientId);
            const clientDoc = await transaction.get(clientRef);
            
            // Atualiza nome se necessário
            if (clientDoc.exists && clientDoc.data().name !== clientName) {
                transaction.update(clientRef, { name: clientName });
            }

            let hasRewards = await checkClientRewards(db, clientName, clientPhone, oldData.establishmentId);
            
            const updatePayload = {
                clientName, clientPhone, professionalId, professionalName: profDoc.data().name,
                startTime: admin.firestore.Timestamp.fromDate(start), endTime: admin.firestore.Timestamp.fromDate(end),
                services: servicesDetails, redeemedReward: redeemedReward || null, hasRewards,
                totalAmount: totalAmount 
            };

            // Lógica de Reembolso/Gasto de pontos ao editar
            if (redeemedReward && !oldData.redeemedReward) {
                if (clientDoc.exists) {
                    transaction.update(clientRef, { loyaltyPoints: admin.firestore.FieldValue.increment(-redeemedReward.points) });
                    transaction.set(clientRef.collection('loyaltyHistory').doc(), { type: 'redeem', points: -redeemedReward.points, reward: redeemedReward.reward, timestamp: admin.firestore.FieldValue.serverTimestamp() });
                }
            } else if (oldData.redeemedReward && !redeemedReward) {
                if (clientDoc.exists) transaction.update(clientRef, { loyaltyPoints: admin.firestore.FieldValue.increment(oldData.redeemedReward.points) });
            }

            transaction.update(ref, updatePayload);
        });
        res.status(200).json({ message: 'Atualizado.' });
    } catch (error) { handleFirestoreError(res, error, 'atualizar agendamento'); }
});

// 6. ATUALIZAR COMANDA
router.post('/:appointmentId/comanda', async (req, res) => {
    const { appointmentId } = req.params;
    const { items: newItems } = req.body;
    if (!Array.isArray(newItems)) return res.status(400).json({ message: 'Items inválidos.' });
    try {
        await req.db.runTransaction(async (t) => {
            const ref = req.db.collection('appointments').doc(appointmentId);
            const doc = await t.get(ref);
            if(!doc.exists) throw new Error("Não encontrado.");
            
            const oldItems = doc.data().comandaItems || [];
            const count = (list) => list.filter(i=>i.type==='product').reduce((acc,i)=>{ acc[i.itemId]=(acc[i.itemId]||0)+(i.quantity||1); return acc; }, {});
            const oldC = count(oldItems);
            const newC = count(newItems);
            
            const ids = new Set([...Object.keys(oldC), ...Object.keys(newC)]);
            for(const id of ids) {
                const change = (newC[id]||0) - (oldC[id]||0);
                if(change !== 0) {
                    const pRef = req.db.collection('products').doc(id);
                    t.update(pRef, { currentStock: admin.firestore.FieldValue.increment(-change) });
                }
            }
            
            t.update(ref, { comandaItems: newItems });
        });
        res.status(200).json({ message: 'Comanda atualizada.' });
    } catch (error) { handleFirestoreError(res, error, 'atualizar comanda'); }
});

// 7. CHECKOUT (CORRIGIDO - ORDEM DE LEITURA/ESCRITA)
router.post('/:appointmentId/checkout', async (req, res) => {
    const { appointmentId } = req.params;
    const { payments, totalAmount, cashierSessionId, items } = req.body;
    const { db } = req;
    const { uid, establishmentId } = req.user;

    if (!payments || !items) return res.status(400).json({ message: 'Dados incompletos.' });

    try {
        const appointmentRef = db.collection('appointments').doc(appointmentId);
        const saleRef = db.collection('sales').doc();
        const paidAtTimestamp = admin.firestore.FieldValue.serverTimestamp();

        // Leitura fora da transação (ok, pois não precisa de consistência atômica com a escrita)
        const establishmentDoc = await db.collection('establishments').doc(establishmentId).get();
        const establishmentData = establishmentDoc.data() || {};
        const timezone = establishmentData.timezone || 'America/Sao_Paulo';
        const paidDate = new Date(new Date().toLocaleString("en-US", { timeZone: timezone })).toISOString().split('T')[0];

        await db.runTransaction(async (transaction) => {
            // --- 1. LEITURAS (DEVEM VIR PRIMEIRO) ---
            const appointmentDoc = await transaction.get(appointmentRef);
            if (!appointmentDoc.exists) throw new Error("Agendamento não encontrado.");
            const apptData = appointmentDoc.data();

            // Prepara ID do Cliente para buscar
            const safeClientId = cleanId(apptData.clientPhone);
            let clientRef = null;
            let clientDoc = null;

            if (safeClientId) {
                clientRef = db.collection('clients').doc(safeClientId);
                clientDoc = await transaction.get(clientRef); // <--- CORREÇÃO: Leitura movida para cá
            }

            // --- 2. ESCRITAS (APÓS TODAS AS LEITURAS) ---

            // Atualiza Agendamento
            transaction.update(appointmentRef, {
                status: 'completed',
                cashierSessionId: cashierSessionId || null,
                comandaItems: items,
                totalAmount: Number(totalAmount), 
                transaction: { payments, totalAmount: Number(totalAmount), paidAt: paidAtTimestamp, saleId: saleRef.id }
            });

            // Cria Venda
            transaction.set(saleRef, {
                type: 'appointment', 
                appointmentId, 
                establishmentId, 
                items,
                totalAmount: Number(totalAmount), 
                clientName: apptData.clientName, 
                clientPhone: apptData.clientPhone,
                clientId: safeClientId, 
                professionalId: apptData.professionalId, 
                professionalName: apptData.professionalName,
                createdBy: uid, 
                createdAt: paidAtTimestamp, 
                cashierSessionId: cashierSessionId || null,
                transaction: { paidAt: paidAtTimestamp, payments, totalAmount: Number(totalAmount) }
            });

            // Atualiza Última Visita do Cliente (se existir)
            if (clientDoc && clientDoc.exists) {
                transaction.update(clientRef, { 
                    lastServiceDate: paidAtTimestamp,
                    lastVisit: paidAtTimestamp,
                    updatedAt: paidAtTimestamp
                });
            }

            // Financeiro
            const { defaultNaturezaId, defaultCentroDeCustoId } = establishmentData.financialIntegration || {};
            payments.forEach(payment => {
                const finRef = db.collection('financial_receivables').doc();
                transaction.set(finRef, {
                    establishmentId,
                    description: `Venda: ${apptData.clientName} (${payment.method})`,
                    amount: payment.value,
                    dueDate: paidDate,
                    status: 'paid', paymentDate: paidDate,
                    transactionId: saleRef.id, createdAt: paidAtTimestamp,
                    naturezaId: defaultNaturezaId || null, centroDeCustoId: defaultCentroDeCustoId || null
                });
            });
        });

        res.status(200).json({ message: 'Checkout realizado.' });
    } catch (error) { handleFirestoreError(res, error, 'checkout'); }
});

// 8. REABRIR COMANDA
router.post('/:appointmentId/reopen', async (req, res) => {
    const { appointmentId } = req.params;
    const { db } = req;
    try {
        await db.runTransaction(async (t) => {
            const ref = db.collection('appointments').doc(appointmentId);
            const doc = await t.get(ref);
            
            if(!doc.exists) throw new Error("Não encontrado.");
            const data = doc.data();
            const saleId = data.transaction?.saleId;

            let financialDocs = [];
            if (saleId) {
                const finsSnapshot = await t.get(db.collection('financial_receivables').where('transactionId', '==', saleId));
                financialDocs = finsSnapshot.docs;
            }

            // Deletar a venda reverte os pontos automaticamente?
            // NÃO. Para reverter pontos, precisaria de um gatilho de onDelete em 'sales'.
            // Por enquanto, apenas apaga o registro de venda.
            if (saleId) {
                t.delete(db.collection('sales').doc(saleId)); 
                financialDocs.forEach(f => t.delete(f.ref));  
            }
            
            t.update(ref, { 
                status: 'confirmed', 
                transaction: admin.firestore.FieldValue.delete(), 
                cashierSessionId: admin.firestore.FieldValue.delete(),
            });
        });
        res.status(200).json({ message: 'Reaberto.' });
    } catch (error) { handleFirestoreError(res, error, 'reabrir'); }
});

router.post('/:appointmentId/awaiting-payment', async (req, res) => {
    try { await req.db.collection('appointments').doc(req.params.appointmentId).update({ status: 'awaiting_payment' }); res.status(200).json({message:'ok'}); }
    catch(e){ handleFirestoreError(res, e, 'status'); }
});

// 9. ALTERAR STATUS
router.patch('/:appointmentId/status', async (req, res) => {
    try { 
        const { appointmentId } = req.params;
        const { status } = req.body;
        const ref = req.db.collection('appointments').doc(appointmentId);
        
        await ref.update({ status }); 

        if (status === 'cancelled') {
            const doc = await ref.get();
            const data = doc.data();
            if (data && data.establishmentId) {
                const dateStr = data.startTime.toDate().toLocaleDateString('pt-BR');
                const timeStr = data.startTime.toDate().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
                
                sendPushNotificationToEstablishment(
                    req.db,
                    data.establishmentId,
                    "Agendamento Cancelado",
                    `${data.clientName || 'Cliente'} cancelou o horário de ${dateStr} às ${timeStr}.`
                ).catch(e => console.error("Erro push cancelamento:", e));
                
                await req.db.collection('establishments').doc(data.establishmentId).collection('notifications').add({
                    title: "Cancelamento", 
                    message: `${data.clientName} cancelou o agendamento de ${dateStr} às ${timeStr}`,
                    timestamp: admin.firestore.FieldValue.serverTimestamp(), 
                    read: false, 
                    type: 'cancellation', 
                    relatedId: appointmentId
                });
            }
        }
        res.status(200).json({message:'ok'}); 
    }
    catch(e){ handleFirestoreError(res, e, 'status patch'); }
});

router.post('/cleanup-invalid', verifyToken, isOwner, async (req, res) => {
    res.status(200).json({ message: 'Limpeza não necessária na versão otimizada.' });
});

module.exports = router;