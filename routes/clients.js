// routes/clients.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, hasAccess } = require('../middlewares/auth');

router.use(verifyToken, hasAccess);

// --- FUNÇÃO AUXILIAR DE ERRO ---
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
    res.status(500).json({ message: `Erro ao processar ${context}.` });
}

// =======================================================================
// 🚀 ROTAS DE CLIENTES
// =======================================================================

// 1. LISTAR CLIENTES (OTIMIZADA)
// Removemos a busca de 'lastService' em tempo real. Agora lemos do cadastro.
router.get('/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    try {
        const { db } = req;
        
        // Busca simples e direta (1 leitura = 1 pacote de dados)
        // Sem 'orderBy' no banco para economizar índices compostos. Ordenamos na memória.
        const snapshot = await db.collection('clients')
            .where('establishmentId', '==', establishmentId)
            .get();

        if (snapshot.empty) {
            return res.status(200).json([]);
        }

        const clientsList = snapshot.docs.map(doc => {
            const data = doc.data();
            
            // Tratamento da data do último serviço (gravada pelo appointments.js)
            let lastService = null;
            if (data.lastServiceDate) {
                // Suporta tanto Timestamp do Firestore quanto String ISO
                lastService = data.lastServiceDate.toDate ? data.lastServiceDate.toDate() : new Date(data.lastServiceDate);
            }

            return {
                id: doc.id,
                ...data,
                lastService: lastService // Campo pronto para o Frontend
            };
        });
        
        // Ordenação Alfabética em Memória (Custo Zero de Processamento na Nuvem)
        clientsList.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

        res.status(200).json(clientsList);
    } catch (error) {
        handleFirestoreError(res, error, 'listar clientes');
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
        
        // Verifica duplicidade de telefone (Limit 1 = Leitura mínima)
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
            lastServiceDate: null, // Inicializa o campo para a otimização futura
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };

        const docRef = await db.collection('clients').add(newClientData);
        res.status(201).json({ message: 'Cliente criado com sucesso!', id: docRef.id, ...newClientData });

    } catch (error) {
        handleFirestoreError(res, error, 'criar cliente');
    }
});

// 3. ATUALIZAR CLIENTE (COM PROTEÇÃO DE DADOS)
router.put('/:clientId', async (req, res) => {
    const { clientId } = req.params;
    const clientData = req.body; 
    
    try {
        // --- SEGURANÇA ---
        // Removemos campos que não podem ser editados manualmente nesta rota
        delete clientData.loyaltyPoints;  // Pontos só via checkout/resgate
        delete clientData.id;
        delete clientData.lastServiceDate; // Data de serviço só via checkout
        delete clientData.createdAt;
        // -----------------

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
        
        // Opcional: Limpar subcoleção de histórico de fidelidade para não deixar lixo
        // (Isso é uma operação em lote "batch", eficiente)
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

// 5. HISTÓRICO DE AGENDAMENTOS (OTIMIZADO)
router.get('/history/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    const { clientName, clientPhone } = req.query;
    
    if (!clientName || !clientPhone) {
        return res.status(400).json({ message: 'Nome e telefone do cliente são obrigatórios.' });
    }

    try {
        // Limitamos a 20 itens para não carregar histórico infinito e travar o app
        const snapshot = await req.db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('clientName', '==', clientName)
            .where('clientPhone', '==', clientPhone)
            .orderBy('startTime', 'desc')
            .limit(20) 
            .get();

        const history = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                date: data.startTime.toDate().toISOString(), 
                serviceName: (data.services || []).map(s => s.name).join(', ') || data.serviceName || 'Serviço',
                status: data.status || 'pendente',
                professionalName: data.professionalName || 'N/A'
            };
        });
        
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
    const { clientName, clientPhone } = req.query; // Usamos nome/telefone como chave secundária se não tiver ID

    if (!clientName || !clientPhone) {
        return res.status(400).json({ message: 'Dados do cliente obrigatórios.' });
    }

    try {
        const { db } = req;
        
        // Validação Rápida de Módulo (Opcional, pode remover se quiser economizar 1 leitura)
        const establishmentDoc = await db.collection('establishments').doc(establishmentId).get();
        if (!establishmentDoc.exists || establishmentDoc.data().modules?.['loyalty-section'] !== true) {
            return res.status(403).json({ message: "Fidelidade inativa." });
        }

        // Busca o ID do cliente pelo telefone
        const clientQuery = await db.collection('clients')
            .where('establishmentId', '==', establishmentId)
            .where('phone', '==', clientPhone)
            .limit(1).get();
        
        if (clientQuery.empty) return res.status(200).json([]);

        const clientId = clientQuery.docs[0].id;
        
        // Busca o histórico na subcoleção
        const historySnapshot = await db.collection('clients').doc(clientId)
            .collection('loyaltyHistory')
            .orderBy('timestamp', 'desc')
            .limit(50) // Limite de segurança
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

// 7. RESGATAR PRÊMIO MANUALMENTE
router.post('/redeem', async (req, res) => {
    const { establishmentId, clientName, clientPhone, rewardData } = req.body;
    
    if (!establishmentId || !clientName || !clientPhone || !rewardData) {
        return res.status(400).json({ message: 'Dados insuficientes.' });
    }

    try {
        const { db } = req;

        // Validação de Módulo
        const establishmentDoc = await db.collection('establishments').doc(establishmentId).get();
        if (!establishmentDoc.exists || establishmentDoc.data().modules?.['loyalty-section'] !== true) {
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
            
            // Deduz pontos
            transaction.update(clientRef, { loyaltyPoints: admin.firestore.FieldValue.increment(-rewardData.points) });
            
            // Grava histórico
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