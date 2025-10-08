//routes/clients.js
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Listar clientes
router.get('/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    try {
        const { db } = req;
        const snapshot = await db.collection('clients')
            .where('establishmentId', '==', establishmentId)
            // .orderBy('name') // REMOVIDO: Esta linha causava o erro de índice.
            .get();

        if (snapshot.empty) {
            return res.status(200).json([]);
        }
        const clientsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // ADICIONADO: Ordena a lista de clientes por nome no servidor.
        clientsList.sort((a, b) => a.name.localeCompare(b.name));

        res.status(200).json(clientsList);
    } catch (error) {
        console.error("Erro ao listar clientes:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Criar um novo cliente
router.post('/', async (req, res) => {
    const { establishmentId, name, phone, email, dob, notes } = req.body;
    if (!establishmentId || !name || !phone) {
        return res.status(400).json({ message: 'Estabelecimento, nome e telefone são obrigatórios.' });
    }

    try {
        const { db } = req;
        
        // Verifica se já existe um cliente com o mesmo telefone
        const existingClientQuery = await db.collection('clients')
            .where('establishmentId', '==', establishmentId)
            .where('phone', '==', phone)
            .limit(1)
            .get();

        if (!existingClientQuery.empty) {
            return res.status(409).json({ message: 'Já existe um cliente com este número de telefone.' });
        }

        const newClientData = {
            establishmentId,
            name,
            phone,
            email: email || null,
            dob: dob || null,
            notes: notes || null,
            loyaltyPoints: 0,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };

        const docRef = await db.collection('clients').add(newClientData);
        res.status(201).json({ message: 'Cliente criado com sucesso!', id: docRef.id, ...newClientData });

    } catch (error) {
        console.error("Erro ao criar cliente:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao criar o cliente.' });
    }
});

// Atualizar um cliente
router.put('/:clientId', async (req, res) => {
    const { clientId } = req.params;
    const clientData = req.body;
     try {
        const { db } = req;
        const clientRef = db.collection('clients').doc(clientId);
        await clientRef.update(clientData);
        res.status(200).json({ message: 'Cliente atualizado com sucesso.' });
    } catch (error) {
        console.error("Erro ao atualizar cliente:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Apagar um cliente
router.delete('/:clientId', async (req, res) => {
    const { clientId } = req.params;
    try {
        const { db } = req;
        const clientRef = db.collection('clients').doc(clientId);
        
        // Opcional: apagar subcoleções como 'loyaltyHistory'
        const subcollectionRef = clientRef.collection('loyaltyHistory');
        const subcollectionSnapshot = await subcollectionRef.get();
        const batch = db.batch();
        subcollectionSnapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();

        await clientRef.delete();
        res.status(200).json({ message: 'Cliente e seu histórico de fidelidade foram excluídos.' });
    } catch (error) {
        console.error("Erro ao apagar cliente:", error);
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
            // .orderBy('startTime', 'desc') // LINHA REMOVIDA PARA RESOLVER O ERRO DE ÍNDICE COMPOSTO
            .get();
        if (snapshot.empty) return res.status(200).json([]);
        const history = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                // Garantir que a data é uma string ISO para o frontend ordenar e filtrar
                date: data.startTime.toDate().toISOString(), 
                serviceName: (data.services || []).map(s => s.name).join(', ')
            };
        });
        res.status(200).json(history);
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
        // Precisamos encontrar o ID do cliente primeiro
        const clientQuery = await db.collection('clients')
            .where('establishmentId', '==', establishmentId)
            .where('phone', '==', clientPhone)
            .limit(1).get();
        
        if (clientQuery.empty) return res.status(200).json([]);

        const clientId = clientQuery.docs[0].id;
        const historySnapshot = await db.collection('clients').doc(clientId)
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
        const clientQuery = await db.collection('clients')
            .where('establishmentId', '==', establishmentId)
            .where('phone', '==', clientPhone)
            .limit(1).get();
        
        if (clientQuery.empty) throw new Error("Cliente não encontrado.");

        const clientRef = clientQuery.docs[0].ref;

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

module.exports = router;