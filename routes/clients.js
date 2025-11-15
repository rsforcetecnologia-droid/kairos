//routes/clients.js
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// --- NOVA FUNÇÃO HELPER ---
/**
 * Busca a data do último serviço concluído para um cliente específico.
 * Baseado na estrutura de dados do seu arquivo original (busca por nome e telefone).
 */
const getLastService = async (db, establishmentId, clientName, clientPhone) => {
    try {
        const apptSnap = await db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('clientName', '==', clientName)
            .where('clientPhone', '==', clientPhone)
            .where('status', '==', 'completed') // Filtro da nova funcionalidade
            // .orderBy('startTime', 'desc') // Evitado para não causar erro de índice
            .get();

        if (apptSnap.empty) return null;

        // Ordena no servidor para achar o mais recente
        const appointments = apptSnap.docs.map(doc => doc.data());
        appointments.sort((a, b) => b.startTime.toDate() - a.startTime.toDate()); // Mais recente primeiro

        // Retorna o timestamp do Firestore
        return appointments[0].startTime; 
    } catch (error) {
        console.error("Erro ao buscar último serviço:", error);
        return null; // Retorna nulo se houver erro
    }
};

// --- NOVA FUNÇÃO HELPER ---
/**
 * Recebe a lista de documentos de clientes e anexa a data do último serviço a cada um.
 */
const attachLastService = async (db, establishmentId, clientDocs) => {
    // Mapeia cada documento para uma promessa que resolve com os dados do cliente + lastService
    const clientDataPromises = clientDocs.map(async (clientDoc) => {
        const client = clientDoc.data();
        client.id = clientDoc.id;
        
        // Busca o último serviço para este cliente
        client.lastService = await getLastService(db, establishmentId, client.name, client.phone); 
        
        return client;
    });
    
    // Espera todas as buscas terminarem
    return Promise.all(clientDataPromises);
};


// Listar clientes (MODIFICADA PARA INCLUIR 'lastService')
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

        // --- NOVA LÓGICA ---
        // Em vez de mapear direto, chama a função helper para anexar os dados
        const clientsList = await attachLastService(db, establishmentId, snapshot.docs);
        
        // ADICIONADO: Ordena a lista de clientes por nome no servidor.
        clientsList.sort((a, b) => a.name.localeCompare(b.name));

        res.status(200).json(clientsList);
    } catch (error) {
        console.error("Erro ao listar clientes:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Criar um novo cliente (Original)
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
            dob: dob || null, // data de nascimento
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

// ####################################################################
// ### INÍCIO DA MODIFICAÇÃO (Segurança do Add-on Fidelidade) ###
// ####################################################################

// Atualizar um cliente (MODIFICADO para segurança)
router.put('/:clientId', async (req, res) => {
    const { clientId } = req.params;
    const clientData = req.body; 
    try {
        const { db } = req;
        const clientRef = db.collection('clients').doc(clientId);
        
        // --- INÍCIO DA CORREÇÃO DE SEGURANÇA ---
        // Impede que esta rota genérica de 'update' altere os pontos de fidelidade.
        // Apenas as rotas de 'checkout' ou 'redeem' podem fazer isso.
        delete clientData.loyaltyPoints;
        delete clientData.id; // Remove ID (boa prática)
        delete clientData.lastService; // Remove campo computado
        // --- FIM DA CORREÇÃO DE SEGURANÇA ---

        await clientRef.update(clientData); 
        res.status(200).json({ message: 'Cliente atualizado com sucesso.' });
    } catch (error) {
        console.error("Erro ao atualizar cliente:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// ####################################################################
// ### FIM DA MODIFICAÇÃO ###
// ####################################################################

// Apagar um cliente (Original)
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


// Obter histórico de agendamentos de um cliente (Original)
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
        
        const history = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                date: data.startTime.toDate().toISOString(), 
                serviceName: (data.services || []).map(s => s.name).join(', '),
                status: data.status || 'pendente',
                professionalName: data.professionalName || 'N/A'
            };
        });
        
        history.sort((a, b) => new Date(b.date) - new Date(a.date));

        res.status(200).json(history);
    } catch (error) {
        console.error("Erro ao buscar histórico do cliente:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// ####################################################################
// ### INÍCIO DA MODIFICAÇÃO (Segurança do Add-on Fidelidade) ###
// ####################################################################

// Obter histórico de pontos de fidelidade (MODIFICADO)
router.get('/loyalty-history/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    const { clientName, clientPhone } = req.query;
    if (!clientName || !clientPhone) {
        return res.status(400).json({ message: 'Nome e telefone do cliente são obrigatórios.' });
    }
    try {
        const { db } = req;
        
        // --- VERIFICAÇÃO DE MÓDULO ---
        const establishmentDoc = await db.collection('establishments').doc(establishmentId).get();
        if (!establishmentDoc.exists) throw new Error("Estabelecimento não encontrado.");
        
        const loyaltyModuleEnabled = establishmentDoc.data().modules?.['loyalty-section'] === true;
        if (!loyaltyModuleEnabled) {
            return res.status(403).json({ message: "O módulo de Fidelidade não está ativo para este estabelecimento." });
        }
        // --- FIM DA VERIFICAÇÃO ---

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

// Resgatar prêmio de fidelidade (MODIFICADO)
router.post('/redeem', async (req, res) => {
    const { establishmentId, clientName, clientPhone, rewardData } = req.body;
    if (!establishmentId || !clientName || !clientPhone || !rewardData) {
        return res.status(400).json({ message: 'Dados insuficientes para resgatar prémio.' });
    }
    try {
        const { db } = req;

        // --- VERIFICAÇÃO DE MÓDULO ---
        const establishmentDoc = await db.collection('establishments').doc(establishmentId).get();
        if (!establishmentDoc.exists) throw new Error("Estabelecimento não encontrado.");
        
        const loyaltyModuleEnabled = establishmentDoc.data().modules?.['loyalty-section'] === true;
        if (!loyaltyModuleEnabled) {
            return res.status(403).json({ message: "O módulo de Fidelidade não está ativo para este estabelecimento." });
        }
        // --- FIM DA VERIFICAÇÃO ---
        
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

// ####################################################################
// ### FIM DA MODIFICAÇÃO ###
// ####################################################################

module.exports = router;