const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, hasAccess, isOwner } = require('../middlewares/auth');

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
            // VALIDAÇÃO DE SEGURANÇA ADICIONADA
            if (serviceData.establishmentId !== establishmentId) {
                throw new Error(`Serviço inválido (${serviceData.name}) não pertence a este estabelecimento.`);
            }
            totalDuration += (serviceData.duration || 0) + (serviceData.bufferTime || 0);
            servicesDetails.push({ id: doc.id, name: serviceData.name, price: serviceData.price, duration: serviceData.duration, bufferTime: serviceData.bufferTime || 0, photo: serviceData.photo || null });
        }

        const startDate = new Date(startTime);
        const endDate = new Date(startDate.getTime() + totalDuration * 60000);
        const newAppointmentRef = db.collection('appointments').doc();

        await db.runTransaction(async (transaction) => {
            const appointmentsRef = db.collection('appointments');
            const conflictQuery = appointmentsRef.where('professionalId', '==', professionalId).where('startTime', '<', endDate);
            const potentialConflicts = await transaction.get(conflictQuery);
            const actualConflicts = potentialConflicts.docs.filter(doc => doc.data().endTime.toDate() > startDate);
            if (actualConflicts.length > 0) throw new Error('O horário selecionado já não está mais disponível. Por favor, escolha outro.');
            
            let newAppointment = {
                establishmentId, 
                services: servicesDetails, 
                professionalId, 
                professionalName, // Campo adicionado para consistência
                clientName, 
                clientPhone,
                startTime: admin.firestore.Timestamp.fromDate(startDate),
                endTime: admin.firestore.Timestamp.fromDate(endDate),
                status: 'confirmed', 
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            };

            if (redeemedReward && redeemedReward.points > 0) {
                const clientIdentifier = `${clientName.trim()}-${clientPhone.trim()}`;
                const clientRef = db.collection('clients').doc(clientIdentifier);
                const clientDoc = await transaction.get(clientRef);
                if (!clientDoc.exists) throw new Error("Cliente não encontrado para resgate de pontos.");
                const currentPoints = clientDoc.data().loyaltyPoints || 0;
                if (currentPoints < redeemedReward.points) throw new Error("Pontos insuficientes para resgatar este prémio.");
                transaction.update(clientRef, { loyaltyPoints: admin.firestore.FieldValue.increment(-redeemedReward.points) });
                const historyRef = clientRef.collection('loyaltyHistory').doc();
                transaction.set(historyRef, {
                    type: 'redeem',
                    points: -redeemedReward.points,
                    reward: redeemedReward.reward,
                    timestamp: admin.firestore.FieldValue.serverTimestamp()
                });
                newAppointment.redeemedReward = redeemedReward;
            }
            transaction.set(newAppointmentRef, newAppointment);

            // NOVO: Criar notificação de novo agendamento
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
        const { startDate, endDate, professionalId } = req.query; // Adiciona professionalId
        if (!startDate || !endDate) return res.status(400).json({ message: 'startDate e endDate são obrigatórios.' });
        const { db } = req;
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        let appointmentsQuery = db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('startTime', '>=', start)
            .where('startTime', '<=', end)
            .where('status', 'in', ['confirmed', 'awaiting_payment', 'completed']);
            
        if (professionalId && professionalId !== 'all') { // Filtro por profissional
            appointmentsQuery = appointmentsQuery.where('professionalId', '==', professionalId);
        }
        
        const [appointmentsSnapshot, professionalsSnapshot] = await Promise.all([
            appointmentsQuery.get(),
            db.collection('professionals').where('establishmentId', '==', establishmentId).get()
        ]);
        
        if (appointmentsSnapshot.empty) return res.status(200).json([]);
        
        const professionalsMap = new Map(professionalsSnapshot.docs.map(doc => [doc.id, doc.data().name]));
        
        const enrichedAppointments = appointmentsSnapshot.docs.map(doc => {
            const appointment = { id: doc.id, ...doc.data() };
            let serviceName = (appointment.services && Array.isArray(appointment.services)) ? appointment.services.map(s => s.name).join(', ') : appointment.serviceName || 'N/A';
            return {
                ...appointment,
                startTime: appointment.startTime.toDate(),
                endTime: appointment.endTime.toDate(),
                serviceName: serviceName,
                professionalName: professionalsMap.get(appointment.professionalId) || 'Profissional não encontrado',
            };
        });
        
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
            const appointmentRef = db.collection('appointments').doc(appointmentId);
            const appointmentDoc = await transaction.get(appointmentRef);
            if (!appointmentDoc.exists) throw new Error("Agendamento não encontrado.");
            const oldAppointmentData = appointmentDoc.data();
            const conflictQuery = db.collection('appointments').where('professionalId', '==', professionalId).where('startTime', '<', endDate);
            const potentialConflicts = await transaction.get(conflictQuery);
            const actualConflicts = potentialConflicts.docs.filter(doc => doc.id !== appointmentId && doc.data().endTime.toDate() > startDate);
            if (actualConflicts.length > 0) throw new Error('O horário selecionado já não está mais disponível.');
            const updatedData = {
                clientName, clientPhone, professionalId, professionalName, // Incluído professionalName
                startTime: admin.firestore.Timestamp.fromDate(startDate),
                endTime: admin.firestore.Timestamp.fromDate(endDate),
                services: servicesDetails,
                redeemedReward: redeemedReward || null
            };
            if (redeemedReward && !oldAppointmentData.redeemedReward) {
                const clientIdentifier = `${clientName.trim()}-${clientPhone.trim()}`;
                const clientRef = db.collection('clients').doc(clientIdentifier);
                const clientDoc = await transaction.get(clientRef);
                if (!clientDoc.exists) throw new Error("Cliente não encontrado para resgate de pontos.");
                const currentPoints = clientDoc.data().loyaltyPoints || 0;
                if (currentPoints < redeemedReward.points) throw new Error("Pontos insuficientes para resgatar este prémio.");
                transaction.update(clientRef, { loyaltyPoints: admin.firestore.FieldValue.increment(-redeemedReward.points) });
                const historyRef = clientRef.collection('loyaltyHistory').doc();
                transaction.set(historyRef, {
                    type: 'redeem',
                    points: -redeemedReward.points,
                    reward: redeemedReward.reward,
                    timestamp: admin.firestore.FieldValue.serverTimestamp()
                });
            } else if (oldAppointmentData.redeemedReward && !redeemedReward) {
                 // Caso o prêmio seja removido, a reversão de pontos deve ocorrer aqui
                const clientIdentifier = `${clientName.trim()}-${clientPhone.trim()}`;
                const clientRef = db.collection('clients').doc(clientIdentifier);
                const oldRewardPoints = oldAppointmentData.redeemedReward.points;
                transaction.update(clientRef, { loyaltyPoints: admin.firestore.FieldValue.increment(oldRewardPoints) });
                // Note: O registro de resgate no histórico de fidelidade deve ser excluído ou marcado como revertido.
            }
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
            const oldProductCounts = oldItems.filter(i => i.type === 'product').reduce((acc, item) => { acc[item.itemId] = (acc[item.itemId] || 0) + 1; return acc; }, {});
            const newProductCounts = newItems.filter(i => i.type === 'product').reduce((acc, item) => { acc[item.itemId] = (acc[item.itemId] || 0) + 1; return acc; }, {});
            const allProductIds = new Set([...Object.keys(oldProductCounts), ...Object.keys(newProductCounts)]);
            for (const productId of allProductIds) {
                const change = (newProductCounts[productId] || 0) - (oldProductCounts[productId] || 0);
                if (change !== 0) {
                    const productRef = db.collection('products').doc(productId);
                    const productDoc = await transaction.get(productRef);
                    if (!productDoc.exists) throw new Error(`Produto com ID ${productId} não encontrado.`);
                    const newStock = (productDoc.data().currentStock || 0) - change;
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

// Checkout do agendamento (Rota Privada) - COM CORREÇÃO E INTEGRAÇÃO FINANCEIRA
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
        const paidAtTimestamp = admin.firestore.FieldValue.serverTimestamp(); // Garante o mesmo timestamp para todos

        await db.runTransaction(async (transaction) => {
            const appointmentDoc = await transaction.get(appointmentRef);
            if (!appointmentDoc.exists) throw new Error("Agendamento não encontrado.");
            
            const appointmentData = appointmentDoc.data();
            const establishmentDoc = await transaction.get(db.collection('establishments').doc(establishmentId));
            
            // --- Obtém as configurações financeiras padrão ---
            const financialIntegration = establishmentDoc.data()?.financialIntegration || {};
            const { defaultNaturezaId, defaultCentroDeCustoId } = financialIntegration;

            const originalServiceIDs = new Set( (appointmentData.services || []).map(s => s.id) );
            
            // CORREÇÃO: Inclui explicitamente 'product' e 'package' no payload de comandaItems.
            const comandaItemsPayload = items.filter(item => {
                // Inclui Produtos e Pacotes
                if (item.type === 'product' || item.type === 'package') return true; 
                // Inclui Serviços que não estavam no agendamento original
                if (item.type === 'service') {
                    return !originalServiceIDs.has(item.id);
                }
                return false;
            });

            // 1. Atualizar Agendamento (Status e Transação)
            transaction.update(appointmentRef, {
                status: 'completed',
                cashierSessionId: cashierSessionId || null,
                comandaItems: comandaItemsPayload, // Agora inclui pacotes
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

            // 3. INTEGRAÇÃO FINANCEIRA: Criar Contas a Receber (financial_receivables)
            payments.forEach(payment => {
                const installmentCount = payment.installments && payment.installments > 1 ? payment.installments : 1;
                const isInstallmentPayment = installmentCount > 1;

                // Se for um pagamento único e não for crediário, o status é 'paid'.
                if (!isInstallmentPayment && payment.method !== 'crediario') {
                    const financialRef = db.collection('financial_receivables').doc();
                    const paidDate = new Date().toISOString().split('T')[0];
                    transaction.set(financialRef, {
                        establishmentId,
                        description: `Venda Agendamento: ${appointmentData.clientName} (Método: ${payment.method})`,
                        amount: payment.value,
                        dueDate: paidDate,
                        paymentDate: paidDate,
                        status: 'paid',
                        transactionId: saleRef.id,
                        createdAt: paidAtTimestamp,
                        naturezaId: defaultNaturezaId || null,
                        centroDeCustoId: defaultCentroDeCustoId || null,
                    });
                    return; // continue
                }

                const installmentValue = parseFloat((payment.value / installmentCount).toFixed(2));
                let totalButLast = installmentValue * (installmentCount - 1);

                for (let i = 1; i <= installmentCount; i++) {
                    const currentInstallmentValue = (i === installmentCount) ? payment.value - totalButLast : installmentValue;
                    const dueDate = new Date();
                     if (i > 1) {
                        dueDate.setMonth(dueDate.getMonth() + (i - 1));
                    }
                    const dueDateString = dueDate.toISOString().split('T')[0];
                    
                    const description = `Venda Agendamento: ${appointmentData.clientName} (Parcela ${i}/${installmentCount} - ${payment.method})`;

                    const financialRef = db.collection('financial_receivables').doc();
                    
                    const status = 'pending';
                    const paymentDate = null;

                    transaction.set(financialRef, {
                        establishmentId,
                        description,
                        amount: currentInstallmentValue,
                        dueDate: dueDateString,
                        paymentDate: paymentDate,
                        status: status,
                        transactionId: saleRef.id,
                        createdAt: paidAtTimestamp,
                        naturezaId: defaultNaturezaId || null,
                        centroDeCustoId: defaultCentroDeCustoId || null,
                    });
                }
            });

            // 4. Fidelidade
            if (establishmentDoc.exists) {
                const loyaltyProgram = establishmentDoc.data().loyaltyProgram;
                if (loyaltyProgram && loyaltyProgram.enabled && loyaltyProgram.pointsPerCurrency > 0) {
                    const pointsEarned = Math.floor(totalAmount / loyaltyProgram.pointsPerCurrency);
                    if (pointsEarned > 0) {
                        const clientIdentifier = `${appointmentData.clientName.trim()}-${appointmentData.clientPhone.trim()}`;
                        const clientRef = db.collection('clients').doc(clientIdentifier);
                        transaction.set(clientRef, { name: appointmentData.clientName, phone: appointmentData.clientPhone, establishmentId, loyaltyPoints: admin.firestore.FieldValue.increment(pointsEarned) }, { merge: true });
                        const historyRef = clientRef.collection('loyaltyHistory').doc();
                        transaction.set(historyRef, {
                            type: 'earn', points: pointsEarned, appointmentId, amountSpent: totalAmount,
                            timestamp: paidAtTimestamp
                        });
                    }
                }
            }
        });
        res.status(200).json({ message: 'Checkout realizado e venda registada com sucesso.' });
    } catch (error) {
        console.error("Erro ao realizar checkout:", error);
        res.status(500).json({ message: error.message || 'Ocorreu um erro no servidor.' });
    }
});

// Reabrir comanda (Rota Privada)
router.post('/:appointmentId/reopen', verifyToken, hasAccess, async (req, res) => {
    const { appointmentId } = req.params;
    const { db } = req;
    
    const appointmentRef = db.collection('appointments').doc(appointmentId);
    
    // Lista para deletar do financeiro fora da transação principal, pois não é essencial
    const financialEntriesToDelete = [];

    try {
        await db.runTransaction(async (transaction) => {
            const appointmentDoc = await transaction.get(appointmentRef);
            if (!appointmentDoc.exists) {
                throw new Error("Agendamento não encontrado.");
            }

            const appointmentData = appointmentDoc.data();
            const saleId = appointmentData.transaction?.saleId;
            
            if (saleId) {
                const saleRef = db.collection('sales').doc(saleId);
                transaction.delete(saleRef);
                
                // Buscar IDs do financeiro para exclusão posterior
                const financialSnapshot = await db.collection('financial_receivables')
                    .where('transactionId', '==', saleId)
                    .get();
                financialSnapshot.forEach(doc => financialEntriesToDelete.push(doc.id));
            }

            // [LÓGICA ADICIONAL: DEVOLVER PONTOS DE RECOMPENSA RESGATADOS]
            if (appointmentData.redeemedReward && appointmentData.redeemedReward.points > 0) {
                const clientIdentifier = `${appointmentData.clientName.trim()}-${appointmentData.clientPhone.trim()}`;
                const clientRef = db.collection('clients').doc(clientIdentifier);
                transaction.update(clientRef, { loyaltyPoints: admin.firestore.FieldValue.increment(appointmentData.redeemedReward.points) });
                // Note: Não estamos revertendo o histórico de fidelidade para simplificar.
            }
            
            transaction.update(appointmentRef, {
                status: 'confirmed',
                transaction: admin.firestore.FieldValue.delete(),
                // Se a recompensa foi resgatada, remove a referência no agendamento
                redeemedReward: admin.firestore.FieldValue.delete() 
            });
        });
        
        // Deletar entradas financeiras (fora da transação para evitar bloqueios longos)
        const batchDeleteFinancial = db.batch();
        financialEntriesToDelete.forEach(id => {
            batchDeleteFinancial.delete(db.collection('financial_receivables').doc(id));
        });
        if (financialEntriesToDelete.length > 0) {
             await batchDeleteFinancial.commit();
        }

        res.status(200).json({ message: 'Comanda reaberta com sucesso e a venda associada foi removida.' });

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
    const { status } = req.body; // Status esperado: 'confirmed'
    
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