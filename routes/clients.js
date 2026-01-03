// routes/clients.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, hasAccess } = require('../middlewares/auth');

router.use(verifyToken, hasAccess);

const db = admin.firestore();

// --- FUNÇÃO AUXILIAR DE ERRO ---
function handleFirestoreError(res, error, context) {
    console.error(`Erro em ${context}:`, error);
    res.status(500).json({ message: `Erro ao processar ${context}: ${error.message}` });
}

// =======================================================================
// 🚀 ROTAS DE CLIENTES (MODELO: TELEFONE COMO ID)
// =======================================================================

/**
 * 1. CRIAR OU ATUALIZAR CLIENTE (UPSERT)
 * Usa o Telefone como ID na URL.
 * Se não existir, cria. Se existir, atualiza (sem apagar dados antigos).
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params; // Este é o telefone (ID)
        const data = req.body;

        // Validação básica
        if (!id) return res.status(400).json({ error: 'O ID (telefone) é obrigatório.' });

        // Limpeza: remove campos undefined
        Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);

        // Datas automáticas
        const now = new Date().toISOString();
        if (!data.createdAt) data.createdAt = now; // Apenas se for novo
        data.updatedAt = now;

        // Garante que o ID no documento é igual ao da URL
        data.id = id;
        data.phone = id; 

        // .set com merge: true é o segredo do "Upsert"
        await db.collection('clients').doc(id).set(data, { merge: true });

        res.status(200).json({ id, ...data, message: 'Cliente salvo com sucesso.' });
    } catch (error) {
        handleFirestoreError(res, error, 'salvar cliente');
    }
});

/**
 * 2. LISTAR CLIENTES
 */
router.get('/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    const { search, limit } = req.query;

    try {
        let query = db.collection('clients').where('establishmentId', '==', establishmentId);

        if (search && search.trim().length > 0) {
            const searchTerm = search.trim();
            // Se a busca for numérica, tenta buscar direto pelo ID (Telefone)
            // Isso é MUITO mais rápido e barato que buscar texto
            if (/^\d+$/.test(searchTerm)) {
                const doc = await db.collection('clients').doc(searchTerm).get();
                if (doc.exists && doc.data().establishmentId === establishmentId) {
                    return res.json([{ id: doc.id, ...doc.data() }]);
                }
                return res.json([]);
            }
            
            // Busca por nome (texto)
            query = query.orderBy('name').startAt(searchTerm).endAt(searchTerm + '\uf8ff').limit(20);
        } else {
            // Listagem padrão
            const queryLimit = limit === 'all' ? 1000 : 20;
            query = query.orderBy('name').limit(queryLimit);
        }

        const snapshot = await query.get();
        const clients = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        res.status(200).json(clients);
    } catch (error) {
        handleFirestoreError(res, error, 'listar clientes');
    }
});

/**
 * 3. OBTER CLIENTE PELO ID
 */
router.get('/id/:id', async (req, res) => {
    try {
        const doc = await db.collection('clients').doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.json({ id: doc.id, ...doc.data() });
    } catch (error) {
        handleFirestoreError(res, error, 'obter cliente');
    }
});

/**
 * 4. APAGAR CLIENTE
 */
router.delete('/:id', async (req, res) => {
    try {
        const clientRef = db.collection('clients').doc(req.params.id);
        
        // Apaga histórico de fidelidade primeiro (limpeza)
        const historySnap = await clientRef.collection('loyaltyHistory').get();
        if (!historySnap.empty) {
            const batch = db.batch();
            historySnap.docs.forEach(doc => batch.delete(doc.ref));
            batch.delete(clientRef);
            await batch.commit();
        } else {
            await clientRef.delete();
        }

        res.json({ message: 'Cliente removido.' });
    } catch (error) {
        handleFirestoreError(res, error, 'deletar cliente');
    }
});

// =======================================================================
// 💎 ROTAS AUXILIARES (Histórico e Fidelidade)
// =======================================================================

router.get('/history/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    const { clientName, clientPhone } = req.query;

    try {
        // Busca paralela de agendamentos e vendas
        const [apptSnap, salesSnap] = await Promise.all([
            db.collection('appointments')
                .where('establishmentId', '==', establishmentId)
                .where('clientPhone', '==', clientPhone) // Busca segura pelo telefone
                .orderBy('startTime', 'desc').limit(20).get(),
            db.collection('sales')
                .where('establishmentId', '==', establishmentId)
                .where('clientPhone', '==', clientPhone) // Busca segura pelo telefone
                .orderBy('createdAt', 'desc').limit(20).get()
        ]);

        const history = [];
        // Processa Agendamentos
        apptSnap.forEach(doc => {
            const d = doc.data();
            history.push({
                type: 'Agendamento',
                date: d.startTime ? d.startTime.toDate().toISOString() : null,
                summary: d.serviceName || 'Serviço',
                status: d.status,
                total: d.totalAmount || 0
            });
        });
        // Processa Vendas
        salesSnap.forEach(doc => {
            const d = doc.data();
            history.push({
                type: 'Venda',
                date: d.createdAt ? d.createdAt.toDate().toISOString() : null,
                summary: 'Produtos/Serviços Avulsos',
                status: 'Concluído',
                total: d.totalAmount || 0
            });
        });

        // Ordena por data (mais recente primeiro)
        history.sort((a, b) => new Date(b.date) - new Date(a.date));

        res.json(history);
    } catch (error) {
        handleFirestoreError(res, error, 'buscar histórico');
    }
});

router.get('/loyalty-history/:establishmentId', async (req, res) => {
    try {
        // ID do cliente é o telefone que vem na query
        const clientId = req.query.clientPhone; 
        if (!clientId) return res.json([]);

        const snapshot = await db.collection('clients').doc(clientId)
            .collection('loyaltyHistory')
            .orderBy('date', 'desc')
            .limit(20)
            .get();

        const history = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(history);
    } catch (error) {
        handleFirestoreError(res, error, 'histórico fidelidade');
    }
});

router.post('/redeem', async (req, res) => {
    try {
        const { establishmentId, clientPhone, rewardData } = req.body;
        const clientRef = db.collection('clients').doc(clientPhone);

        await db.runTransaction(async (t) => {
            const doc = await t.get(clientRef);
            if (!doc.exists) throw new Error("Cliente não encontrado.");
            
            const current = doc.data().loyaltyPoints || 0;
            const cost = rewardData.points || 0;

            if (current < cost) throw new Error("Saldo insuficiente.");

            t.update(clientRef, { loyaltyPoints: current - cost });
            
            const historyRef = clientRef.collection('loyaltyHistory').doc();
            t.set(historyRef, {
                date: new Date().toISOString(),
                type: 'redeem',
                points: -cost,
                rewardName: rewardData.reward,
                establishmentId
            });
        });

        res.json({ success: true });
    } catch (error) {
        handleFirestoreError(res, error, 'resgate de prémio');
    }
});

module.exports = router;