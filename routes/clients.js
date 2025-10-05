//routes/clients.js
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Listar clientes
router.get('/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    try {
        const { db } = req;
        const [appointmentsSnapshot, clientsSnapshot] = await Promise.all([
            db.collection('appointments').where('establishmentId', '==', establishmentId).get(),
            db.collection('clients').where('establishmentId', '==', establishmentId).get()
        ]);
        const loyaltyPointsMap = new Map();
        clientsSnapshot.forEach(doc => {
            loyaltyPointsMap.set(doc.id, doc.data().loyaltyPoints || 0);
        });
        const clientsMap = new Map();
        appointmentsSnapshot.docs.forEach(doc => {
            const data = doc.data();
            const clientIdentifier = `${data.clientName.trim()}-${data.clientPhone.trim()}`;
            const appointmentDate = data.startTime.toDate();
            if (clientsMap.has(clientIdentifier)) {
                const client = clientsMap.get(clientIdentifier);
                client.visitCount++;
                if (appointmentDate > client.lastVisit) client.lastVisit = appointmentDate;
            } else {
                clientsMap.set(clientIdentifier, {
                    name: data.clientName, phone: data.clientPhone,
                    visitCount: 1, lastVisit: appointmentDate,
                    loyaltyPoints: loyaltyPointsMap.get(clientIdentifier) || 0
                });
            }
        });
        res.status(200).json(Array.from(clientsMap.values()));
    } catch (error) {
        console.error("Erro ao listar clientes:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Obter detalhes de um cliente
router.get('/details/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    const { clientName, clientPhone } = req.query;
    if (!clientName || !clientPhone) {
        return res.status(400).json({ message: 'Nome e telefone do cliente são obrigatórios.' });
    }
    try {
        const { db } = req;
        const clientIdentifier = `${clientName.trim()}-${clientPhone.trim()}`;
        const clientDoc = await db.collection('clients').doc(clientIdentifier).get();
        if (!clientDoc.exists) return res.status(200).json({ loyaltyPoints: 0 });
        res.status(200).json(clientDoc.data());
    } catch (error) {
        console.error("Erro ao buscar detalhes do cliente:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Obter histórico de agendamentos de um cliente
router.get('/history/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    const { clientName, clientPhone } = req.query;
    if (!clientName || !clientPhone) {
        return res.status(400).json({ message: 'Nome e telefone do cliente são obrigatórios.' });
    }
    try {
        const { db } = req;
        const snapshot = await db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('clientName', '==', clientName)
            .where('clientPhone', '==', clientPhone)
            .get();
        if (snapshot.empty) return res.status(200).json([]);
        let history = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        history.sort((a, b) => b.startTime.toMillis() - a.startTime.toMillis());
        const fullHistory = history.map(appt => ({
            date: appt.startTime.toDate().toLocaleDateString('pt-BR'),
            serviceName: appt.services.map(s => s.name).join(', ')
        }));
        res.status(200).json(fullHistory);
    } catch (error) {
        console.error("Erro ao buscar histórico do cliente:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Obter histórico de pontos de fidelidade
router.get('/loyalty-history/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    const { clientName, clientPhone } = req.query;
    if (!clientName || !clientPhone) {
        return res.status(400).json({ message: 'Nome e telefone do cliente são obrigatórios.' });
    }
    try {
        const { db } = req;
        const clientIdentifier = `${clientName.trim()}-${clientPhone.trim()}`;
        const historySnapshot = await db.collection('clients').doc(clientIdentifier)
            .collection('loyaltyHistory').orderBy('timestamp', 'desc').get();
        if (historySnapshot.empty) return res.status(200).json([]);
        const history = historySnapshot.docs.map(doc => {
            const data = doc.data();
            return { ...data, timestamp: data.timestamp.toDate().toLocaleDateString('pt-BR') };
        });
        res.status(200).json(history);
    } catch (error) {
        console.error("Erro ao buscar histórico de fidelidade:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Resgatar prêmio de fidelidade
router.post('/redeem', async (req, res) => {
    const { establishmentId, clientName, clientPhone, rewardData } = req.body;
    if (!establishmentId || !clientName || !clientPhone || !rewardData) {
        return res.status(400).json({ message: 'Dados insuficientes para resgatar prémio.' });
    }
    try {
        const { db } = req;
        const clientIdentifier = `${clientName.trim()}-${clientPhone.trim()}`;
        const clientRef = db.collection('clients').doc(clientIdentifier);
        await db.runTransaction(async (transaction) => {
            const clientDoc = await transaction.get(clientRef);
            if (!clientDoc.exists) throw new Error("Cliente não encontrado no programa de fidelidade.");
            const currentPoints = clientDoc.data().loyaltyPoints || 0;
            if (currentPoints < rewardData.points) throw new Error("Pontos insuficientes para resgatar este prémio.");
            transaction.update(clientRef, { loyaltyPoints: admin.firestore.FieldValue.increment(-rewardData.points) });
            const historyRef = clientRef.collection('loyaltyHistory').doc();
            transaction.set(historyRef, {
                type: 'redeem',
                points: -rewardData.points,
                reward: rewardData.reward,
                timestamp: admin.firestore.FieldValue.serverTimestamp()
            });
        });
        res.status(200).json({ message: 'Prémio resgatado com sucesso!' });
    } catch (error) {
        console.error("Erro ao resgatar prémio:", error);
        res.status(500).json({ message: error.message || 'Ocorreu um erro no servidor.' });
    }
});

// ROTA ADICIONADA: Criar um novo cliente (a partir do modal de agendamento)
router.post('/', async (req, res) => {
    const { establishmentId, name, phone, email, dobDay, dobMonth, notes } = req.body;
    if (!establishmentId || !name || !phone) {
        return res.status(400).json({ message: 'Estabelecimento, nome e telefone são obrigatórios.' });
    }

    try {
        const { db } = req;
        // O identificador único do cliente é uma combinação de nome e telefone
        const clientIdentifier = `${name.trim()}-${phone.trim()}`;
        const clientRef = db.collection('clients').doc(clientIdentifier);

        const clientDoc = await clientRef.get();
        if (clientDoc.exists) {
            // Opcional: pode-se atualizar os dados se o cliente já existir
            // ou retornar um erro/aviso. Por agora, vamos apenas confirmar que existe.
            return res.status(200).json({ message: 'Cliente já existente.', id: clientDoc.id });
        }

        const newClientData = {
            establishmentId,
            name,
            phone,
            email: email || null,
            dob: (dobDay && dobMonth) ? `${dobDay}/${dobMonth}` : null,
            notes: notes || null,
            loyaltyPoints: 0, // Pontos de fidelidade começam em zero
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };

        await clientRef.set(newClientData);

        res.status(201).json({ message: 'Cliente criado com sucesso!', id: clientRef.id, ...newClientData });

    } catch (error) {
        console.error("Erro ao criar cliente:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao criar o cliente.' });
    }
});


// ✅ ESSA LINHA RESOLVE O ERRO
module.exports = router;

