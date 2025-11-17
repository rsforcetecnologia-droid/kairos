// routes/appointments.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, hasAccess, isOwner } = require('../middlewares/auth');

// --- (MODIFICADO) FUNÇÃO AUXILIAR PARA VERIFICAR PRÊMIOS ---
/**
 * Verifica se um cliente tem pontos suficientes para resgatar PELO MENOS UM prêmio.
 * @param {object} db - Instância do Firestore.
 * @param {string} clientName - Nome do cliente.
 * @param {string} clientPhone - Telefone do cliente.
 * @param {string} establishmentId - ID do estabelecimento.
 * @returns {boolean} - True se o cliente tiver prêmios resgatáveis, false caso contrário.
 */
async function checkClientRewards(db, clientName, clientPhone, establishmentId) {
    if (!clientName || !clientPhone || !establishmentId) {
        return false;
    }
    
    try {
        const clientQuery = await db.collection('clients')
            .where('establishmentId', '==', establishmentId)
            .where('phone', '==', clientPhone)
            .limit(1)
            .get();

        const establishmentRef = db.collection('establishments').doc(establishmentId);
        const establishmentDoc = await establishmentRef.get();

        if (clientQuery.empty || !establishmentDoc.exists) {
            return false;
        }
        
        const clientDoc = clientQuery.docs[0];
        const establishmentData = establishmentDoc.data(); // Pega os dados do estabelecimento

        // ####################################################################
        // ### INÍCIO DA MODIFICAÇÃO (Verificar Módulo de Fidelidade) ###
        // ####################################################################

        // 1. Verifica se o módulo 'loyalty-section' está ATIVO no plano
        const loyaltyModuleEnabled = establishmentData.modules?.['loyalty-section'] === true;
        
        // 2. Verifica se o programa está habilitado NAS CONFIGURAÇÕES
        const loyaltyProgram = establishmentData.loyaltyProgram;

        // Se o módulo não foi comprado OU não está habilitado nas configs, bloqueia.
        if (!loyaltyModuleEnabled || !loyaltyProgram || !loyaltyProgram.enabled || !loyaltyProgram.tiers || loyaltyProgram.tiers.length === 0) {
            return false;
        }

        // ####################################################################
        // ### FIM DA MODIFICAÇÃO ###
        // ####################################################################

        const loyaltyPoints = clientDoc.data().loyaltyPoints || 0;
        if (loyaltyPoints === 0) {
            return false; // Otimização: se não tem pontos, não pode resgatar.
        }

        const minPointsToRedeem = Math.min(...loyaltyProgram.tiers.map(r => r.points));

        if (minPointsToRedeem === Infinity) {
            return false; // Nenhum prêmio cadastrado corretamente
        }

        // O cliente tem prêmios se seus pontos forem >= ao prêmio mais barato
        return loyaltyPoints >= minPointsToRedeem;

    } catch (error) {
        console.error(`Erro ao verificar prêmios de fidelidade para ${clientName}:`, error);
        return false;
    }
}


// Criar novo agendamento (Rota Pública)
router.post('/', async (req, res) => {
    const { db } = req;
    const { establishmentId, services, professionalId, clientName, clientPhone, startTime, redeemedReward } = req.body;
    if (!establishmentId || !services || services.length === 0 || !professionalId || !clientName || !clientPhone || !startTime) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    try {
        const professionalDoc = await db.collection('professionals').doc(professionalId).get();
        if (!professionalDoc.exists) {
            throw new Error('Profissional selecionado é inválido.');
        }
        const professionalName = professionalDoc.data().name;

        const serviceDocs = await Promise.all(services.map(s => db.collection('services').doc(s.id).get()));
        let totalDuration = 0;
        const servicesDetails = [];

        for (const doc of serviceDocs) {
            if (!doc.exists) {
                return res.status(404).json({ message: `Serviço com ID ${doc.id} não encontrado.` });
            }
            const serviceData = doc.data();
            if (serviceData.establishmentId !== establishmentId) {
                throw new Error(`Serviço inválido (${serviceData.name}) não pertence a este estabelecimento.`);
            }
            totalDuration += (serviceData.duration || 0) + (serviceData.bufferTime || 0);
            servicesDetails.push({ id: doc.id, name: serviceData.name, price: serviceData.price, duration: serviceData.duration, bufferTime: serviceData.bufferTime || 0, photo: serviceData.photo || null });
        }

        const startDate = new Date(startTime);
        const endDate = new Date(startDate.getTime() + totalDuration * 60000);
        const newAppointmentRef = db.collection('appointments').doc();

        const hasRewards = await checkClientRewards(db, clientName, clientPhone, establishmentId);

        await db.runTransaction(async (transaction) => {
            
            // --- LEITURA 1: CLIENTE ---
            const clientQuery = db.collection('clients')
                .where('establishmentId', '==', establishmentId)
                .where('phone', '==', clientPhone)
                .limit(1);
            const existingClientSnapshot = await transaction.get(clientQuery);
            let clientRef;
            let clientDocForReward = null; 

            if (existingClientSnapshot.empty) {
                clientRef = db.collection('clients').doc();
            } else {
                clientRef = existingClientSnapshot.docs[0].ref;
                clientDocForReward = existingClientSnapshot.docs[0]; 
            }

            // --- LEITURA 2: CONFLITOS DE HORÁRIO ---
            const appointmentsRef = db.collection('appointments');
            const conflictQuery = appointmentsRef.where('professionalId', '==', professionalId).where('startTime', '<', endDate);
            const potentialConflicts = await transaction.get(conflictQuery);

            // ####################################################################
            // ### INÍCIO DA MODIFICAÇÃO (Verificar Módulo de Fidelidade) ###
            // ####################################################################
            
            // --- LEITURA 3: ESTABELECIMENTO (Para verificar módulo de fidelidade) ---
            let establishmentDoc = null;
            if (redeemedReward && redeemedReward.points > 0) {
                establishmentDoc = await transaction.get(db.collection('establishments').doc(establishmentId));
            }
            // ####################################################################
            // ### FIM DA MODIFICAÇÃO ###
            // ####################################################################

            // --- FIM DE TODAS AS LEITURAS ---

            // --- INÍCIO DAS ESCRITAS ---

            const actualConflicts = potentialConflicts.docs.filter(doc => doc.data().endTime.toDate() > startDate);
            if (actualConflicts.length > 0) throw new Error('O horário selecionado já não está mais disponível. Por favor, escolha outro.');

            // ESCRITA 1: Cliente
            if (existingClientSnapshot.empty) {
                const newClientData = {
                    establishmentId: establishmentId,
                    name: clientName,
                    phone: clientPhone,
                    email: null,
                    dob: null,
                    notes: 'Cliente registado via Agendamento Online',
                    loyaltyPoints: 0,
                    createdAt: admin.firestore.FieldValue.serverTimestamp()
                };
                transaction.set(clientRef, newClientData);
            } else {
                const clientData = existingClientSnapshot.docs[0].data();
                if (clientData.name !== clientName) {
                    transaction.update(clientRef, { name: clientName });
                }
            }
            
            // ESCRITA 2: Agendamento
            let newAppointment = {
                establishmentId,
                services: servicesDetails,
                professionalId,
                professionalName,
                clientName,
                clientPhone,
                startTime: admin.firestore.Timestamp.fromDate(startDate),
                endTime: admin.firestore.Timestamp.fromDate(endDate),
                status: 'confirmed',
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                hasRewards: hasRewards
            };

            // ####################################################################
            // ### INÍCIO DA MODIFICAÇÃO (Verificar Módulo de Fidelidade) ###
            // ####################################################################

            // ESCRITA 3 e 4: Lógica de Recompensa (Se houver)
            if (redeemedReward && redeemedReward.points > 0) {
                // Verifica se o módulo está ativo antes de permitir o resgate
                if (!establishmentDoc || establishmentDoc.data().modules?.['loyalty-section'] !== true) {
                    throw new Error("O programa de fidelidade não está ativo para este estabelecimento.");
                }

                if (!clientDocForReward) throw new Error("Cliente novo não pode resgatar pontos no primeiro agendamento.");
                
                const currentPoints = clientDocForReward.data().loyaltyPoints || 0;
                if (currentPoints < redeemedReward.points) throw new Error("Pontos insuficientes para resgatar este prémio.");
                
                // ESCRITA 3: Atualiza pontos do cliente
                transaction.update(clientRef, { loyaltyPoints: admin.firestore.FieldValue.increment(-redeemedReward.points) });
                
                // ESCRITA 4: Cria histórico de recompensa
                const historyRef = clientRef.collection('loyaltyHistory').doc();
                transaction.set(historyRef, {
                    type: 'redeem',
                    points: -redeemedReward.points,
                    reward: redeemedReward.reward,
                    timestamp: admin.firestore.FieldValue.serverTimestamp()
                });
                newAppointment.redeemedReward = redeemedReward;
                
                const newPoints = currentPoints - redeemedReward.points;
                newAppointment.hasRewards = newPoints > 0; // Atualiza o 'hasRewards'
            }
            
            // ####################################################################
            // ### FIM DA MODIFICAÇÃO ###
            // ####################################################################
            
            // ESCRITA 5: Cria o Agendamento
            transaction.set(newAppointmentRef, newAppointment);

            // ESCRITA 6: Cria a Notificação
            const notificationRef = db.collection('establishments').doc(establishmentId).collection('notifications').doc();
            const notificationMessage = `${clientName} agendou ${servicesDetails.map(s => s.name).join(', ')} para as ${startDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
            transaction.set(notificationRef, {
                title: "Novo Agendamento!",
                message: notificationMessage,
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
                read: false,
                type: 'new_appointment',
                relatedId: newAppointmentRef.id
            });
            
        });
        res.status(201).json({ message: 'Agendamento criado com sucesso!' });
    } catch (error) {
        console.error("Erro na transação de agendamento:", error);
        res.status(500).json({ message: error.message || 'Ocorreu um erro no servidor.' });
    }
});

// Listar agendamentos por período (Rota Privada)
router.get('/:establishmentId', verifyToken, hasAccess, async (req, res) => {
    try {
        const { establishmentId } = req.params;
        const { startDate, endDate } = req.query; 
        const professionalIdFromFilter = req.query.professionalId; 

        if (!startDate || !endDate) return res.status(400).json({ message: 'startDate e endDate são obrigatórios.' });
        const { db } = req;
        const start = new Date(startDate);
        const end = new Date(endDate);

        const { role, professionalId: userProfessionalId, permissions } = req.user;
        const canViewAll = permissions === null || permissions['agenda-section']?.view_all_prof === true;

        let appointmentsQuery = db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('startTime', '>=', start)
            .where('startTime', '<=', end)
            .where('status', 'in', ['confirmed', 'awaiting_payment', 'completed']);

        if (role === 'employee' && !canViewAll) {
            if (userProfessionalId) {
                appointmentsQuery = appointmentsQuery.where('professionalId', '==', userProfessionalId);
            } else {
                return res.status(200).json([]);
            }
        } else {
            if (professionalIdFromFilter && professionalIdFromFilter !== 'all') { 
                appointmentsQuery = appointmentsQuery.where('professionalId', '==', professionalIdFromFilter);
            }
        }

        const [appointmentsSnapshot, professionalsSnapshot] = await Promise.all([
            appointmentsQuery.get(),
            db.collection('professionals').where('establishmentId', '==', establishmentId).get()
        ]);

        if (appointmentsSnapshot.empty) return res.status(200).json([]);

        const professionalsMap = new Map(professionalsSnapshot.docs.map(doc => [doc.id, doc.data().name]));

        const clientRewardsCache = new Map();

        const enrichedAppointments = await Promise.all(appointmentsSnapshot.docs.map(async (doc) => {
            const appointment = { id: doc.id, ...doc.data() };
            let serviceName = (appointment.services && Array.isArray(appointment.services)) ? appointment.services.map(s => s.name).join(', ') : appointment.serviceName || 'N/A';
            
            const clientIdentifier = `${appointment.clientName.trim()}-${appointment.clientPhone.trim()}`;
            let hasRewards = false;

            if (appointment.hasRewards !== undefined) {
                hasRewards = appointment.hasRewards;
            } else {
                if (clientRewardsCache.has(clientIdentifier)) {
                    hasRewards = clientRewardsCache.get(clientIdentifier);
                } else {
                    hasRewards = await checkClientRewards(db, appointment.clientName, appointment.clientPhone, establishmentId);
                    clientRewardsCache.set(clientIdentifier, hasRewards);
                }
            }

            return {
                ...appointment,
                startTime: appointment.startTime.toDate(),
                endTime: appointment.endTime.toDate(),
                serviceName: serviceName,
                professionalName: professionalsMap.get(appointment.professionalId) || 'Profissional não encontrado',
                hasRewards: hasRewards 
            };
        }));

        res.status(200).json(enrichedAppointments);
    } catch (error) {
        console.error("Erro ao listar agendamentos:", error);
        if (error.message && error.message.includes('requires an index')) {
            const detailedMessage = "O Firestore precisa de um índice para esta busca. Verifique o log do seu servidor (npm start) para encontrar um link para criar o índice automaticamente.";
            return res.status(500).json({ message: detailedMessage });
        }
        res.status(500).json({ message: "Ocorreu um erro no servidor ao tentar listar os agendamentos." });
    }
});


// Rota para buscar histórico de agendamentos cancelados
router.get('/cancelled/:establishmentId', verifyToken, hasAccess, async (req, res) => {
    const { establishmentId } = req.params;
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Datas de início e fim são obrigatórias.' });
    }
    try {
        const { db } = req;
        const start = new Date(startDate);
        const end = new Date(endDate + "T23:59:59");
        const snapshot = await db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('status', '==', 'cancelled')
            .where('startTime', '>=', start)
            .where('startTime', '<=', end)
            .orderBy('startTime', 'desc')
            .get();
        if (snapshot.empty) return res.status(200).json([]);
        const cancelledAppointments = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                clientName: data.clientName,
                serviceName: (data.services || []).map(s => s.name).join(', '),
                professionalName: data.professionalName || 'N/A',
                date: data.startTime.toDate().toISOString(),
            };
        });
        res.status(200).json(cancelledAppointments);
    } catch (error) {
        console.error("Erro ao buscar agendamentos cancelados:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Deletar agendamento (Rota Privada)
router.delete('/:appointmentId', verifyToken, hasAccess, async (req, res) => {
    const { appointmentId } = req.params;
    const { db } = req;
    try {
        if (!appointmentId) return res.status(400).json({ message: 'O ID do agendamento é obrigatório.' });
        const appointmentRef = db.collection('appointments').doc(appointmentId);
        await db.runTransaction(async (transaction) => {
            const appointmentDoc = await transaction.get(appointmentRef);
            if (!appointmentDoc.exists) throw new Error("Agendamento não encontrado.");
            const comandaItems = appointmentDoc.data().comandaItems || [];
            const productsToRestock = comandaItems.filter(item => item.type === 'product');
            if (productsToRestock.length > 0) {
                const productUpdates = productsToRestock.reduce((acc, item) => { acc[item.itemId] = (acc[item.itemId] || 0) + 1; return acc; }, {});
                for (const [productId, quantity] of Object.entries(productUpdates)) {
                    const productRef = db.collection('products').doc(productId);
                    transaction.update(productRef, { currentStock: admin.firestore.FieldValue.increment(quantity) });
                }
            }
            transaction.delete(appointmentRef);
        });
        res.status(200).json({ message: 'Agendamento excluído e stock devolvido com sucesso.' });
    } catch (error) {
        console.error("Erro ao excluir agendamento:", error);
        res.status(500).json({ message: error.message || 'Ocorreu um erro no servidor.' });
    }
});

// Atualizar agendamento (Rota Privada)
router.put('/:appointmentId', verifyToken, hasAccess, async (req, res) => {
    const { db } = req;
    const { appointmentId } = req.params;
    const { services, professionalId, clientName, clientPhone, startTime, redeemedReward } = req.body;
    try {
        const professionalDoc = await db.collection('professionals').doc(professionalId).get();
        if (!professionalDoc.exists) {
            throw new Error('Profissional selecionado é inválido.');
        }
        const professionalName = professionalDoc.data().name;

        const serviceDocs = await Promise.all(services.map(s => db.collection('services').doc(s.id).get()));
        let totalDuration = 0;
        const servicesDetails = serviceDocs.map(doc => {
            if (!doc.exists) throw new Error(`Serviço com ID ${doc.id} não encontrado.`);
            const serviceData = doc.data();
            totalDuration += (serviceData.duration || 0) + (serviceData.bufferTime || 0);
            return { id: doc.id, name: serviceData.name, price: serviceData.price, duration: serviceData.duration, bufferTime: serviceData.bufferTime || 0, photo: serviceData.photo || null };
        });
        const startDate = new Date(startTime);
        const endDate = new Date(startDate.getTime() + totalDuration * 60000);

        await db.runTransaction(async (transaction) => {
            
            // --- LEITURA 1: Agendamento Antigo ---
            const appointmentRef = db.collection('appointments').doc(appointmentId);
            const appointmentDoc = await transaction.get(appointmentRef);
            if (!appointmentDoc.exists) throw new Error("Agendamento não encontrado.");
            const oldAppointmentData = appointmentDoc.data();
            
            // --- LEITURA 2: Conflitos de Horário ---
            const conflictQuery = db.collection('appointments').where('professionalId', '==', professionalId).where('startTime', '<', endDate);
            const potentialConflicts = await transaction.get(conflictQuery);

            // --- LEITURA 3: Cliente (para recompensas e atualização de nome) ---
            const establishmentId = oldAppointmentData.establishmentId;
            const clientQuery = db.collection('clients')
                .where('establishmentId', '==', establishmentId)
                .where('phone', '==', clientPhone)
                .limit(1);
            const existingClientSnapshot = await transaction.get(clientQuery);
            const clientRef = existingClientSnapshot.empty ? null : existingClientSnapshot.docs[0].ref;
            
            let clientDoc = null;
            if (clientRef) {
                clientDoc = await transaction.get(clientRef); // LEITURA 4 (se o cliente existe)
            }
            
            // --- LEITURA 5: Regras de Fidelidade (se necessário) ---
            let establishmentDoc = null;
            // (MODIFICADO) Lê o estabelecimento para verificar o módulo
            if ((redeemedReward && !oldAppointmentData.redeemedReward) || (oldAppointmentData.redeemedReward && !redeemedReward)) {
                establishmentDoc = await transaction.get(db.collection('establishments').doc(establishmentId)); // LEITURA 5
            }
            
            // --- FIM DE TODAS AS LEITURAS ---
            
            let hasRewards = await checkClientRewards(db, clientName, clientPhone, establishmentId);

            const actualConflicts = potentialConflicts.docs.filter(doc => doc.id !== appointmentId && doc.data().endTime.toDate() > startDate);
            if (actualConflicts.length > 0) throw new Error('O horário selecionado já não está mais disponível.');
            
            // --- INÍCIO DAS ESCRITAS ---
            
            // ESCRITA 1: Atualização de nome do cliente
            // (CORREÇÃO: Removido '()' de .exists para sintaxe v9)
            if (clientRef && clientDoc.exists && clientDoc.data().name !== clientName) { 
                transaction.update(clientRef, { name: clientName });
            }

            const updatedData = {
                clientName, clientPhone, professionalId, professionalName,
                startTime: admin.firestore.Timestamp.fromDate(startDate),
                endTime: admin.firestore.Timestamp.fromDate(endDate),
                services: servicesDetails,
                redeemedReward: redeemedReward || null,
                hasRewards: hasRewards
            };

            // ESCRITA 2 e 3: Lógica de Recompensa
            // ####################################################################
            // ### INÍCIO DA MODIFICAÇÃO (Verificar Módulo de Fidelidade) ###
            // ####################################################################
            
            // Verifica se o módulo está ativo ANTES de processar o resgate/devolução
            const loyaltyModuleEnabled = establishmentDoc?.data().modules?.['loyalty-section'] === true;

            if (redeemedReward && !oldAppointmentData.redeemedReward) {
                if (!loyaltyModuleEnabled) throw new Error("O programa de fidelidade não está ativo.");
                // (CORREÇÃO: Removido '()' de .exists para sintaxe v9)
                if (!clientRef || !clientDoc.exists) throw new Error("Cliente não encontrado para resgate de pontos.");
                
                const currentPoints = clientDoc.data().loyaltyPoints || 0;
                if (currentPoints < redeemedReward.points) throw new Error("Pontos insuficientes para resgatar este prémio.");
                
                transaction.update(clientRef, { loyaltyPoints: admin.firestore.FieldValue.increment(-redeemedReward.points) }); // ESCRITA 2
                
                const historyRef = clientRef.collection('loyaltyHistory').doc();
                transaction.set(historyRef, { // ESCRITA 3
                    type: 'redeem',
                    points: -redeemedReward.points,
                    reward: redeemedReward.reward,
                    timestamp: admin.firestore.FieldValue.serverTimestamp()
                });

                const newPoints = currentPoints - redeemedReward.points;
                const loyaltyProgram = establishmentDoc.data().loyaltyProgram;
                const minPointsToRedeem = Math.min(...(loyaltyProgram?.tiers || []).map(r => r.points));
                updatedData.hasRewards = (minPointsToRedeem !== Infinity) && (newPoints >= minPointsToRedeem);

            } else if (oldAppointmentData.redeemedReward && !redeemedReward) {
                // Só executa se o doc do estabelecimento foi lido (ou seja, se establishmentDoc não é null)
                if (establishmentDoc && !loyaltyModuleEnabled) throw new Error("O programa de fidelidade não está ativo.");
                if (clientRef) {
                    const oldRewardPoints = oldAppointmentData.redeemedReward.points;
                    transaction.update(clientRef, { loyaltyPoints: admin.firestore.FieldValue.increment(oldRewardPoints) }); // ESCRITA 2 (alternativa)
                }
                updatedData.hasRewards = true;
            }
            // ####################################################################
            // ### FIM DA MODIFICAÇÃO ###
            // ####################################################################
            
            // ESCRITA 4: Atualiza o Agendamento
            transaction.update(appointmentRef, updatedData);
        });
        res.status(200).json({ message: 'Agendamento atualizado com sucesso.' });
    } catch (error) {
        console.error("Erro ao atualizar agendamento:", error);
        res.status(500).json({ message: error.message || 'Ocorreu um erro no servidor.' });
    }
});

// Adicionar/atualizar itens na comanda (Rota Privada)
router.post('/:appointmentId/comanda', verifyToken, hasAccess, async (req, res) => {
    const { appointmentId } = req.params;
    const { items: newItems } = req.body;
    const { db } = req;
    if (!Array.isArray(newItems)) return res.status(400).json({ message: 'O corpo da requisição deve conter um array de "items".' });
    const appointmentRef = db.collection('appointments').doc(appointmentId);
    try {
        await db.runTransaction(async (transaction) => {
            const appointmentDoc = await transaction.get(appointmentRef);
            if (!appointmentDoc.exists) throw new Error("Agendamento não encontrado.");
            const oldItems = appointmentDoc.data().comandaItems || [];
            
            // (LÓGICA DE ESTOQUE CORRIGIDA - anterior estava incompleta)
            const oldProductCounts = oldItems.filter(i => i.type === 'product').reduce((acc, item) => { acc[item.itemId] = (acc[item.itemId] || 0) + (item.quantity || 1); return acc; }, {});
            const newProductCounts = newItems.filter(i => i.type === 'product').reduce((acc, item) => { acc[item.itemId] = (acc[item.itemId] || 0) + (item.quantity || 1); return acc; }, {});
            
            const allProductIds = new Set([...Object.keys(oldProductCounts), ...Object.keys(newProductCounts)]);

            for (const productId of allProductIds) {
                const oldQty = oldProductCounts[productId] || 0;
                const newQty = newProductCounts[productId] || 0;
                const change = newQty - oldQty; // Diferença na quantidade

                if (change !== 0) {
                    const productRef = db.collection('products').doc(productId);
                    const productDoc = await transaction.get(productRef);
                    if (!productDoc.exists) throw new Error(`Produto com ID ${productId} não encontrado.`);
                    
                    const newStock = (productDoc.data().currentStock || 0) - change; // Subtrai a diferença
                    if (newStock < 0) throw new Error(`Stock insuficiente para o produto ${productDoc.data().name}.`);
                    
                    transaction.update(productRef, { currentStock: newStock });
                }
            }
            transaction.update(appointmentRef, { comandaItems: newItems });
        });
        res.status(200).json({ message: 'Comanda atualizada e stock ajustado com sucesso.' });
    } catch (error) {
        console.error("Erro ao atualizar comanda e stock:", error);
        res.status(500).json({ message: error.message || 'Ocorreu um erro no servidor.' });
    }
});

// ####################################################################
// ### INÍCIO DA INTEGRAÇÃO FINANCEIRA ###
// ####################################################################

// Checkout do agendamento (Rota Privada) - COM INTEGRAÇÃO FINANCEIRA AUTOMÁTICA
router.post('/:appointmentId/checkout', verifyToken, hasAccess, async (req, res) => {
    const { appointmentId } = req.params;
    const { payments, totalAmount, cashierSessionId, items } = req.body;
    const { db } = req;
    const { uid, establishmentId } = req.user;

    if (!payments || !Array.isArray(payments) || payments.length === 0 || totalAmount === undefined || !items) {
        return res.status(400).json({ message: 'A lista de pagamentos, o valor total e os itens são obrigatórios.' });
    }

    try {
        const appointmentRef = db.collection('appointments').doc(appointmentId);
        const saleRef = db.collection('sales').doc();
        const paidAtTimestamp = admin.firestore.FieldValue.serverTimestamp(); 

        await db.runTransaction(async (transaction) => {
            const appointmentDoc = await transaction.get(appointmentRef);
            if (!appointmentDoc.exists) throw new Error("Agendamento não encontrado.");

            const appointmentData = appointmentDoc.data();
            const establishmentDoc = await transaction.get(db.collection('establishments').doc(establishmentId));
            if (!establishmentDoc.exists) throw new Error("Estabelecimento não encontrado."); // (Adicionada verificação)
            
            const establishmentData = establishmentDoc.data(); // (NOVO) Pega os dados
            
            // Pega as configurações padrão de finanças do estabelecimento
            const financialIntegration = establishmentData?.financialIntegration || {};
            const { defaultNaturezaId, defaultCentroDeCustoId } = financialIntegration;


            const originalServiceIDs = new Set( (appointmentData.services || []).map(s => s.id) );

            const comandaItemsPayload = items.filter(item => {
                if (item.type === 'product' || item.type === 'package') return true;
                if (item.type === 'service') {
                    return !originalServiceIDs.has(item.id);
                }
                return false;
            });

            // 1. Atualizar Agendamento (Status e Transação)
            transaction.update(appointmentRef, {
                status: 'completed',
                cashierSessionId: cashierSessionId || null,
                comandaItems: comandaItemsPayload,
                transaction: {
                    payments: payments,
                    totalAmount: Number(totalAmount),
                    paidAt: paidAtTimestamp,
                    saleId: saleRef.id
                }
            });

            // 2. Criar Registro de Venda (Sales)
            const saleData = {
                type: 'appointment', appointmentId, establishmentId,
                items: items,
                totalAmount: Number(totalAmount),
                clientName: appointmentData.clientName, clientPhone: appointmentData.clientPhone,
                professionalId: appointmentData.professionalId,
                professionalName: appointmentData.professionalName,
                createdBy: uid,
                createdAt: paidAtTimestamp,
                cashierSessionId: cashierSessionId || null,
                transaction: {
                    paidAt: paidAtTimestamp,
                    payments: payments,
                    totalAmount: Number(totalAmount)
                }
            };
            transaction.set(saleRef, saleData);

            // 3. INTEGRAÇÃO FINANCEIRA
            const paidDate = new Date().toISOString().split('T')[0];
            
            payments.forEach(payment => {
                const installmentCount = payment.installments && payment.installments > 1 ? payment.installments : 1;
                const paymentMethod = payment.method.toLowerCase();
                const clientName = appointmentData.clientName || 'Cliente';

                // --- LÓGICA PARA "FIADO" (CREDIÁRIO) ---
                if (paymentMethod === 'crediario') {
                    const installmentValue = parseFloat((payment.value / installmentCount).toFixed(2));
                    let totalButLast = installmentValue * (installmentCount - 1);

                    for (let i = 1; i <= installmentCount; i++) {
                        const currentInstallmentValue = (i === installmentCount) ? payment.value - totalButLast : installmentValue;
                        const dueDate = new Date(); 
                        dueDate.setMonth(dueDate.getMonth() + (i - 1)); 
                        const dueDateString = dueDate.toISOString().split('T')[0];
                        
                        const description = `Venda (Agendamento): ${clientName} (Parcela ${i}/${installmentCount} - Fiado)`;
                        const financialRef = db.collection('financial_receivables').doc();
                        
                        transaction.set(financialRef, {
                            establishmentId,
                            description,
                            amount: currentInstallmentValue,
                            dueDate: dueDateString,
                            paymentDate: null,
                            status: 'pending', 
                            transactionId: saleRef.id,
                            createdAt: paidAtTimestamp,
                            naturezaId: defaultNaturezaId || null,
                            centroDeCustoId: defaultCentroDeCustoId || null,
                        });
                    }
                    return; 
                }

                // --- LÓGICA PARA OUTROS PAGAMENTOS (PIX, DINHEIRO, CRÉDITO, DÉBITO) ---
                
                let notes = '';
                if (paymentMethod === 'credito' && installmentCount > 1) {
                    notes = `Parcelado em ${installmentCount}x no cartão de crédito (loja recebe à vista)`;
                } else {
                    notes = `Pagamento à vista em ${payment.method}`;
                }

                const financialRef = db.collection('financial_receivables').doc();
                transaction.set(financialRef, {
                    establishmentId,
                    description: `Venda (Agendamento): ${clientName} (${payment.method})`,
                    amount: payment.value,
                    dueDate: paidDate, 
                    paymentDate: paidDate, 
                    status: 'paid', 
                    transactionId: saleRef.id,
                    createdAt: paidAtTimestamp,
                    naturezaId: defaultNaturezaId || null,
                    centroDeCustoId: defaultCentroDeCustoId || null,
                    notes: notes,
                    paymentDetails: {
                        method: payment.method,
                        installments: installmentCount
                    }
                });
            });

            // 4. Fidelidade
            // ####################################################################
            // ### INÍCIO DA MODIFICAÇÃO (Verificar Módulo de Fidelidade) ###
            // ####################################################################
            
            // Verifica se o módulo 'loyalty-section' está ATIVO no plano do estabelecimento
            const loyaltyModuleEnabled = establishmentData.modules?.['loyalty-section'] === true;

            if (loyaltyModuleEnabled && establishmentDoc.exists) { 
                const loyaltyProgram = establishmentData.loyaltyProgram;
                
                if (loyaltyProgram && loyaltyProgram.enabled && loyaltyProgram.pointsPerCurrency > 0) {
                    const pointsEarned = Math.floor(totalAmount / loyaltyProgram.pointsPerCurrency);
                    
                    if (pointsEarned > 0) {
                        const clientQuery = db.collection('clients')
                            .where('establishmentId', '==', establishmentId)
                            .where('phone', '==', appointmentData.clientPhone)
                            .limit(1);
                        
                        const clientSnapshot = await transaction.get(clientQuery);
                        
                        if (!clientSnapshot.empty) {
                             const clientRef = clientSnapshot.docs[0].ref;
                             transaction.update(clientRef, { loyaltyPoints: admin.firestore.FieldValue.increment(pointsEarned) });
                             
                             const historyRef = clientRef.collection('loyaltyHistory').doc();
                             transaction.set(historyRef, {
                                type: 'earn', points: pointsEarned, appointmentId, amountSpent: totalAmount,
                                timestamp: paidAtTimestamp
                             });
                        }
                    }
                }
            }
            // ####################################################################
            // ### FIM DA MODIFICAÇÃO ###
            // ####################################################################
        });
        res.status(200).json({ message: 'Checkout realizado, venda registada e financeiro lançado com sucesso.' });
    } catch (error) {
        console.error("Erro ao realizar checkout:", error);
        res.status(500).json({ message: error.message || 'Ocorreu um erro no servidor.' });
    }
});
// ####################################################################
// ### FIM DA INTEGRAÇÃO FINANCEIRA ###
// ####################################################################


// ####################################################################
// ### ROTA DE REABRIR (CORRIGIDA PARA O ERRO DE LEITURA/ESCRITA) ###
// ####################################################################
router.post('/:appointmentId/reopen', verifyToken, hasAccess, async (req, res) => {
    const { appointmentId } = req.params;
    const { db } = req;
    const appointmentRef = db.collection('appointments').doc(appointmentId);

    try {
        await db.runTransaction(async (transaction) => {
            // --- TODAS AS LEITURAS DEVEM VIR PRIMEIRO ---

            // LEITURA 1: Obter o agendamento
            const appointmentDoc = await transaction.get(appointmentRef);
            if (!appointmentDoc.exists) {
                throw new Error("Agendamento não encontrado.");
            }
            const appointmentData = appointmentDoc.data();
            const saleId = appointmentData.transaction?.saleId;
            const establishmentId = appointmentData.establishmentId;

            // LEITURA 2: Obter lançamentos financeiros (se houver saleId)
            let financialSnapshot = null;
            if (saleId) {
                const financialQuery = db.collection('financial_receivables').where('transactionId', '==', saleId);
                financialSnapshot = await transaction.get(financialQuery);
            }

            // LEITURA 3: Obter o cliente (se houver recompensa para devolver)
            let clientSnapshot = null;
            if (appointmentData.redeemedReward && appointmentData.redeemedReward.points > 0) {
                const clientQuery = db.collection('clients')
                    .where('establishmentId', '==', establishmentId)
                    .where('phone', '==', appointmentData.clientPhone)
                    .limit(1);
                clientSnapshot = await transaction.get(clientQuery);
            }

            // LEITURA 4: Obter dados do estabelecimento (para verificar status de fidelidade)
            const establishmentRef = db.collection('establishments').doc(establishmentId);
            const establishmentDoc = await transaction.get(establishmentRef);
            
            // LEITURA 5: Obter dados do cliente (para verificar status de fidelidade)
            let clientDocForCheck = null;
            if (clientSnapshot && !clientSnapshot.empty) {
                clientDocForCheck = clientSnapshot.docs[0];
            } else {
                 const clientQuery = db.collection('clients')
                    .where('establishmentId', '==', establishmentId)
                    .where('phone', '==', appointmentData.clientPhone)
                    .limit(1);
                const tempSnapshot = await transaction.get(clientQuery);
                if (!tempSnapshot.empty) {
                    clientDocForCheck = tempSnapshot.docs[0];
                }
            }

            // --- FIM DE TODAS AS LEITURAS. INÍCIO DAS ESCRITAS ---

            // Lógica de 'hasRewards'
            let hasRewards = false;
            const loyaltyProgram = establishmentDoc.exists ? establishmentDoc.data().loyaltyProgram : null;
            if (clientDocForCheck && loyaltyProgram && loyaltyProgram.enabled && loyaltyProgram.tiers) {
                const currentPoints = (clientDocForCheck.data().loyaltyPoints || 0);
                const pointsAfterRefund = currentPoints + (appointmentData.redeemedReward?.points || 0);
                const minPointsToRedeem = Math.min(...(loyaltyProgram.tiers || []).map(r => r.points));
                
                if (minPointsToRedeem !== Infinity) {
                    hasRewards = pointsAfterRefund >= minPointsToRedeem;
                }
            }

            // ESCRITA 1: Apagar lançamentos financeiros
            if (financialSnapshot) {
                financialSnapshot.docs.forEach(doc => transaction.delete(doc.ref));
            }

            // ESCRITA 2: Apagar a venda
            if (saleId) {
                const saleRef = db.collection('sales').doc(saleId);
                transaction.delete(saleRef);
            }
            
            // ESCRITA 3: Devolver pontos de fidelidade
            if (clientSnapshot && !clientSnapshot.empty) {
                const clientRef = clientSnapshot.docs[0].ref;
                transaction.update(clientRef, { 
                    loyaltyPoints: admin.firestore.FieldValue.increment(appointmentData.redeemedReward.points) 
                });
            }

            // ESCRITA 4: Atualizar o agendamento
            // (CORREÇÃO: Corrigido o erro de digitação de 'section' para 'transaction')
            transaction.update(appointmentRef, { 
                status: 'confirmed',
                transaction: admin.firestore.FieldValue.delete(),
                redeemedReward: admin.firestore.FieldValue.delete(),
                cashierSessionId: admin.firestore.FieldValue.delete(),
                hasRewards: hasRewards // Atualiza o status de recompensa
            });
        });

        // Transação concluída
        res.status(200).json({ message: 'Comanda reaberta com sucesso. Venda e lançamentos financeiros associados foram removidos.' });

    } catch (error) {
        console.error("Erro ao reabrir comanda:", error);
        res.status(500).json({ message: error.message || 'Ocorreu um erro no servidor.' });
    }
});


// Mover para aguardando pagamento (Rota Privada)
router.post('/:appointmentId/awaiting-payment', verifyToken, hasAccess, async (req, res) => {
    const { appointmentId } = req.params;
    try {
        const { db } = req;
        const appointmentRef = db.collection('appointments').doc(appointmentId);
        const doc = await appointmentRef.get();
        if (!doc.exists) return res.status(404).json({ message: 'Agendamento não encontrado.' });
        await appointmentRef.update({ status: 'awaiting_payment' });
        res.status(200).json({ message: 'Comanda movida para aguardando pagamento.' });
    } catch (error) {
        console.error("Erro ao mover comanda:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// ✅ NOVA ROTA: Atualizar apenas o status do agendamento (usado para check-in)
router.patch('/:appointmentId/status', verifyToken, hasAccess, async (req, res) => {
    const { appointmentId } = req.params;
    const { status } = req.body; 

    if (!status) {
        return res.status(400).json({ message: 'O novo status é obrigatório.' });
    }

    try {
        const { db } = req;
        const appointmentRef = db.collection('appointments').doc(appointmentId);
        const doc = await appointmentRef.get();

        if (!doc.exists || doc.data().establishmentId !== req.user.establishmentId) {
            return res.status(403).json({ message: 'Acesso negado ou agendamento não encontrado.' });
        }

        // Atualiza apenas o campo 'status'
        await appointmentRef.update({ status: status });

        res.status(200).json({ message: `Status do agendamento ${appointmentId} atualizado para ${status}.` });
    } catch (error) {
        console.error("Erro ao atualizar status do agendamento:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao atualizar o status.' });
    }
});


// Limpar todos os agendamentos (Rota Privada - Owner)
router.post('/clear-all/:establishmentId', verifyToken, isOwner, async (req, res) => {
    const { establishmentId } = req.params;
    try {
        const { db } = req;
        const snapshot = await db.collection('appointments').where('establishmentId', '==', establishmentId).get();
        if (snapshot.empty) return res.status(200).json({ message: 'Nenhum agendamento para limpar.' });
        const batch = db.batch();
        snapshot.docs.forEach(doc => { batch.delete(doc.ref); });
        await batch.commit();
        res.status(200).json({ message: `${snapshot.size} agendamentos foram apagados com sucesso.` });
    } catch (error) {
        console.error("Erro ao limpar agendamentos:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao limpar os agendamentos.' });
    }
});

// Rota para limpar apenas agendamentos inválidos (sem data)
router.post('/cleanup-invalid', verifyToken, isOwner, async (req, res) => {
    const { establishmentId } = req.user;
    const { db } = req;

    try {
        const snapshot = await db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .get();

        if (snapshot.empty) {
            return res.status(200).json({ message: 'Nenhum agendamento encontrado para verificar.', deletedCount: 0 });
        }

        const batch = db.batch();
        let deletedCount = 0;

        snapshot.docs.forEach(doc => {
            const data = doc.data();
            if (!data.startTime || !(data.startTime instanceof admin.firestore.Timestamp)) {
                batch.delete(doc.ref);
                deletedCount++;
            }
        });

        if (deletedCount > 0) {
            await batch.commit();
        }

        res.status(200).json({ message: `Limpeza concluída. ${deletedCount} agendamentos inválidos foram apagados.`, deletedCount });

    } catch (error) {
        console.error("Erro ao limpar agendamentos inválidos:", error);
        if (error.message && error.message.includes('requires an index')) {
            const detailedMessage = "O Firestore precisa de um índice para esta busca. Verifique o log do seu servidor (npm start) para encontrar um link para criar o índice automaticamente.";
            return res.status(500).json({ message: detailedMessage });
        }
        res.status(500).json({ message: 'Ocorreu um erro no servidor durante a limpeza.' });
    }
});

module.exports = router;