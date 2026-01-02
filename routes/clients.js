// routes/clients.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, hasAccess } = require('../middlewares/auth');

router.use(verifyToken, hasAccess);

// --- FUNÇÃO AUXILIAR DE ERRO ---
function handleFirestoreError(res, error, context) {
    console.error(`Erro em ${context}:`, error);
    // Tenta extrair o link de criação de índice se existir
    const linkMatch = error.message ? error.message.match(/https:\/\/console\.firebase\.google\.com[^\s]*/) : null;
    const indexLink = linkMatch ? linkMatch[0] : null;

    if (error.message && error.message.includes('requires an index')) {
        return res.status(500).json({ 
            message: `O Firestore precisa de um índice para ${context}.`,
            createIndexUrl: indexLink || "Link não encontrado automaticamente. Verifique os logs do servidor."
        });
    }
    res.status(500).json({ message: `Erro ao processar ${context}.` });
}

// =======================================================================
// 🚀 ROTAS DE CLIENTES
// =======================================================================

// 1. LISTAR CLIENTES (OTIMIZADO PARA BAIXO CUSTO)
router.get('/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    const { search, limit } = req.query; // Recebe o termo de busca e limite da URL

    try {
        const { db } = req;
        
        let query = db.collection('clients')
            .where('establishmentId', '==', establishmentId);

        // LÓGICA DE OTIMIZAÇÃO DE LEITURA
        if (search && search.trim().length > 0) {
            // Se houver busca, filtra pelo nome
            const searchTerm = search.trim();
            
            query = query
                .orderBy('name')
                .startAt(searchTerm)
                .endAt(searchTerm + '\uf8ff')
                .limit(20); // Limite de segurança na busca
        } else {
            // Se NÃO houver busca, traz os últimos cadastrados
            // Suporta parametro ?limit=all para casos específicos (com cuidado) ou padrão 20
            const queryLimit = limit === 'all' ? 1000 : 20;

            query = query
                .orderBy('createdAt', 'desc')
                .limit(queryLimit);
        }

        const snapshot = await query.get();

        if (snapshot.empty) {
            return res.status(200).json([]);
        }

        const clientsList = snapshot.docs.map(doc => {
            const data = doc.data();
            
            let lastService = null;
            if (data.lastServiceDate) {
                lastService = data.lastServiceDate.toDate ? data.lastServiceDate.toDate() : new Date(data.lastServiceDate);
            }

            return {
                id: doc.id,
                ...data,
                lastService: lastService 
            };
        });
        
        res.status(200).json(clientsList);
    } catch (error) {
        handleFirestoreError(res, error, 'listar clientes (busca otimizada)');
    }
});

// 2. CRIAR NOVO CLIENTE
router.post('/', async (req, res) => {
    const { establishmentId, name, phone, email, dob, notes } = req.body;
    
    if (!establishmentId || !name || !phone) {
        return res.status(400).json({ message: 'Estabelecimento, nome e telefone são obrigatórios.' });
    }

    try {
        const { db } = req;
        
        // Verifica duplicidade (apenas 1 leitura)
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
            lastServiceDate: null,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };

        const docRef = await db.collection('clients').add(newClientData);
        res.status(201).json({ message: 'Cliente criado com sucesso!', id: docRef.id, ...newClientData });

    } catch (error) {
        handleFirestoreError(res, error, 'criar cliente');
    }
});

// 3. ATUALIZAR CLIENTE (CORRIGIDO PARA PERMITIR SYNC DE PONTOS)
router.put('/:clientId', async (req, res) => {
    const { clientId } = req.params;
    const clientData = req.body; 
    
    try {
        // CORREÇÃO: Removido 'delete clientData.loyaltyPoints' para permitir que o frontend atualize o saldo correto.
        
        // Protege apenas campos de sistema imutáveis
        delete clientData.id;
        delete clientData.createdAt;
        // lastServiceDate pode vir se quisermos forçar atualização, mas geralmente é automático.
        
        await req.db.collection('clients').doc(clientId).update(clientData); 
        res.status(200).json({ message: 'Cliente atualizado com sucesso.' });
    } catch (error) {
        handleFirestoreError(res, error, 'atualizar cliente');
    }
});

// 4. APAGAR CLIENTE
router.delete('/:clientId', async (req, res) => {
    const { clientId } = req.params;
    try {
        const { db } = req;
        const clientRef = db.collection('clients').doc(clientId);
        
        // Remove subcoleção de histórico de fidelidade primeiro (Batch)
        const subcollectionRef = clientRef.collection('loyaltyHistory');
        const subcollectionSnapshot = await subcollectionRef.get();
        
        if (!subcollectionSnapshot.empty) {
            const batch = db.batch();
            subcollectionSnapshot.docs.forEach(doc => batch.delete(doc.ref));
            batch.delete(clientRef);
            await batch.commit();
        } else {
            await clientRef.delete();
        }

        res.status(200).json({ message: 'Cliente excluído com sucesso.' });
    } catch (error) {
        handleFirestoreError(res, error, 'apagar cliente');
    }
});

// 5. HISTÓRICO COMPLETO DO CLIENTE
router.get('/history/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    const { clientName, clientPhone } = req.query;
    
    if (!clientName || !clientPhone) {
        return res.status(400).json({ message: 'Nome e telefone do cliente são obrigatórios.' });
    }

    try {
        const { db } = req;

        // Limita leituras a 30 itens de cada coleção (Aumentado levemente de 20 para 30 para melhor histórico)
        const appointmentsPromise = db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('clientName', '==', clientName)
            .where('clientPhone', '==', clientPhone)
            .orderBy('startTime', 'desc')
            .limit(30) 
            .get();

        const salesPromise = db.collection('sales')
            .where('establishmentId', '==', establishmentId)
            .where('clientName', '==', clientName)
            .where('clientPhone', '==', clientPhone)
            .orderBy('startTime', 'desc')
            .limit(30)
            .get();

        const [apptSnapshot, salesSnapshot] = await Promise.all([appointmentsPromise, salesPromise]);

        const history = [];

        apptSnapshot.docs.forEach(doc => {
            const data = doc.data();
            history.push({
                id: doc.id,
                type: 'appointment',
                date: data.startTime ? data.startTime.toDate().toISOString() : new Date().toISOString(),
                serviceName: (data.services || []).map(s => s.name).join(', ') || data.serviceName || 'Serviço Agendado',
                status: data.status || 'pendente',
                professionalName: data.professionalName || 'N/A',
                totalAmount: data.totalAmount || data.price || 0,
                items: data.services || [] 
            });
        });

        salesSnapshot.docs.forEach(doc => {
            const data = doc.data();
            const itemsSummary = (data.items || []).map(i => `${i.quantity || 1}x ${i.name}`).join(', ');

            history.push({
                id: doc.id,
                type: 'sale',
                date: data.startTime ? data.startTime.toDate().toISOString() : (data.createdAt ? data.createdAt.toDate().toISOString() : new Date().toISOString()),
                serviceName: itemsSummary || 'Comanda / Venda Avulsa',
                status: data.status || 'completed',
                professionalName: data.professionalName || 'Balcão',
                totalAmount: Number(data.totalAmount || 0),
                items: data.items || []
            });
        });

        // Ordena em memória
        history.sort((a, b) => new Date(b.date) - new Date(a.date));

        res.status(200).json(history);

    } catch (error) {
        handleFirestoreError(res, error, 'histórico do cliente');
    }
});

// =======================================================================
// 💎 ROTAS DO MÓDULO FIDELIDADE
// =======================================================================

// 6. HISTÓRICO DE PONTOS
router.get('/loyalty-history/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    const { clientName, clientPhone } = req.query;

    if (!clientName || !clientPhone) {
        return res.status(400).json({ message: 'Dados do cliente obrigatórios.' });
    }

    try {
        const { db } = req;
        
        const establishmentDoc = await db.collection('establishments').doc(establishmentId).get();
        if (!establishmentDoc.exists) {
            return res.status(404).json({ message: "Estabelecimento não encontrado." });
        }

        const estData = establishmentDoc.data();
        
        const isLoyaltyActive = 
            (estData.modules && estData.modules['loyalty-section'] === true) || 
            (estData.loyaltyProgram && estData.loyaltyProgram.enabled === true);

        if (!isLoyaltyActive) {
            return res.status(403).json({ message: "Fidelidade inativa." });
        }

        const clientQuery = await db.collection('clients')
            .where('establishmentId', '==', establishmentId)
            .where('phone', '==', clientPhone)
            .limit(1).get();
        
        if (clientQuery.empty) return res.status(200).json([]);

        const clientId = clientQuery.docs[0].id;
        
        const historySnapshot = await db.collection('clients').doc(clientId)
            .collection('loyaltyHistory')
            .orderBy('timestamp', 'desc')
            .limit(50) // Limitado a 50
            .get();

        const history = historySnapshot.docs.map(doc => {
            const data = doc.data();
            return { 
                ...data, 
                timestamp: data.timestamp ? data.timestamp.toDate().toLocaleDateString('pt-BR') : 'N/A' 
            };
        });

        res.status(200).json(history);
    } catch (error) {
        handleFirestoreError(res, error, 'histórico fidelidade');
    }
});

// 7. RESGATAR PRÊMIO
router.post('/redeem', async (req, res) => {
    const { establishmentId, clientName, clientPhone, rewardData } = req.body;
    
    if (!establishmentId || !clientName || !clientPhone || !rewardData) {
        return res.status(400).json({ message: 'Dados insuficientes.' });
    }

    try {
        const { db } = req;

        const establishmentDoc = await db.collection('establishments').doc(establishmentId).get();
        if (!establishmentDoc.exists) {
            return res.status(404).json({ message: "Estabelecimento não encontrado." });
        }

        const estData = establishmentDoc.data();

        const isLoyaltyActive = 
            (estData.modules && estData.modules['loyalty-section'] === true) || 
            (estData.loyaltyProgram && estData.loyaltyProgram.enabled === true);

        if (!isLoyaltyActive) {
            return res.status(403).json({ message: "Fidelidade inativa." });
        }
        
        const clientQuery = await db.collection('clients')
            .where('establishmentId', '==', establishmentId)
            .where('phone', '==', clientPhone)
            .limit(1).get();
        
        if (clientQuery.empty) throw new Error("Cliente não encontrado.");

        const clientRef = clientQuery.docs[0].ref;

        await db.runTransaction(async (transaction) => {
            const clientDoc = await transaction.get(clientRef);
            if (!clientDoc.exists) throw new Error("Cliente não encontrado.");
            
            const currentPoints = clientDoc.data().loyaltyPoints || 0;
            if (currentPoints < rewardData.points) throw new Error("Pontos insuficientes.");
            
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
        handleFirestoreError(res, error, 'resgatar prémio');
    }
});

module.exports = router;