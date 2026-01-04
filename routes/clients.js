// routes/clients.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, hasAccess } = require('../middlewares/auth');

// Middleware de autenticação
router.use(verifyToken, hasAccess);

const db = admin.firestore();

// --- HELPER DE FORMATAÇÃO PARA BUSCA ---
// Tenta adivinhar formatos comuns para buscar legado
function getPhoneVariations(phone) {
    const p = String(phone).replace(/\D/g, '');
    const variations = [p]; // Adiciona o limpo (ex: 11999998888)

    // Tenta formato celular (11) 91234-5678
    if (p.length === 11) {
        variations.push(`(${p.substring(0,2)}) ${p.substring(2,7)}-${p.substring(7,11)}`);
    }
    // Tenta formato fixo (11) 1234-5678
    if (p.length === 10) {
        variations.push(`(${p.substring(0,2)}) ${p.substring(2,6)}-${p.substring(6,10)}`);
    }
    return variations;
}

const handleError = (res, error, message) => {
    console.error(`Error: ${message}`, error);
    res.status(500).json({ error: message, details: error.message });
};

// =======================================================================
// 1. LISTAGEM E BUSCA OTIMIZADA
// =======================================================================
router.get('/:establishmentId', async (req, res) => {
    try {
        const { establishmentId } = req.params;
        const { search, limit } = req.query;
        const limitVal = parseInt(limit) || 20;

        let query = db.collection('clients')
            .where('establishmentId', '==', establishmentId);

        if (search && search.trim()) {
            const term = search.trim();
            // Busca numérica direta (Telefone ID)
            if (/^\d+$/.test(term)) {
                // Tenta buscar documento exato pelo ID (telefone)
                const doc = await db.collection('clients').doc(term).get();
                if (doc.exists && doc.data().establishmentId === establishmentId) {
                     return res.json([{ id: doc.id, ...doc.data() }]);
                }
                // Fallback: busca por ordem alfabética se não achar ID direto
                query = query.orderBy('phone').startAt(term).endAt(term + '\uf8ff');
            } else {
                // Busca textual por nome
                query = query.orderBy('name').startAt(term).endAt(term + '\uf8ff');
            }
        } else {
            query = query.orderBy('name');
        }

        const snapshot = await query.limit(limitVal).get();
        const clients = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.json(clients);
    } catch (error) {
        handleError(res, error, 'Falha ao listar clientes');
    }
});

// =======================================================================
// 2. OBTER DETALHES DO CLIENTE
// =======================================================================
router.get('/details/:establishmentId/:clientId', async (req, res) => {
    try {
        const { establishmentId, clientId } = req.params;
        const clientDoc = await db.collection('clients').doc(clientId).get();
        
        if (!clientDoc.exists || clientDoc.data().establishmentId !== establishmentId) {
            return res.status(404).json({ error: 'Cliente não encontrado.' });
        }
        res.json({ id: clientDoc.id, ...clientDoc.data() });
    } catch (error) {
        handleError(res, error, 'Falha ao obter cliente');
    }
});

// =======================================================================
// 3. CRIAR OU ATUALIZAR (UPSERT)
// =======================================================================
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        if (!data.establishmentId) return res.status(400).json({ error: 'ID do estabelecimento obrigatório' });

        const now = new Date().toISOString();
        const updateData = {
            ...data,
            id: id,
            phone: id,
            updatedAt: now
        };

        // set com merge: true cria se não existir ou atualiza campos específicos
        await db.collection('clients').doc(id).set({
            createdAt: now, 
            ...updateData
        }, { merge: true });

        res.json({ message: 'Cliente salvo com sucesso', id });
    } catch (error) {
        handleError(res, error, 'Falha ao salvar cliente');
    }
});

// =======================================================================
// 4. EXCLUIR CLIENTE
// =======================================================================
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.collection('clients').doc(id).delete();
        res.json({ message: 'Cliente removido' });
    } catch (error) {
        handleError(res, error, 'Falha ao remover cliente');
    }
});

// =======================================================================
// 5. HISTÓRICO UNIFICADO (CORREÇÃO CRÍTICA AQUI)
// =======================================================================
router.get('/full-history/:establishmentId', async (req, res) => {
    try {
        const { establishmentId } = req.params;
        const { phone } = req.query; 

        if (!phone) return res.status(400).json([]);

        // Gera variações do telefone para tentar encontrar registros legados
        // Ex: Procura por "11999998888" E "(11) 99999-8888"
        const phoneVariations = getPhoneVariations(phone);

        // CORREÇÃO: Usar 'in' para buscar múltiplas variações de telefone
        // CORREÇÃO: Ordenar por 'startTime' e não 'date'
        
        // Nota: Queries com 'in' e 'orderBy' exigem índice composto.
        // Para evitar erro de índice agora, fazemos a ordenação em memória (limit 50 é leve).
        
        const [appointmentsSnap, salesSnap, loyaltySnap] = await Promise.all([
            // Busca Agendamentos (Vários formatos de telefone)
            db.collection('appointments')
                .where('establishmentId', '==', establishmentId)
                .where('clientPhone', 'in', phoneVariations) 
                .limit(50) 
                .get(),

            // Busca Vendas
            db.collection('sales')
                .where('establishmentId', '==', establishmentId)
                .where('clientPhone', 'in', phoneVariations)
                .limit(50)
                .get(),

            // Busca Fidelidade (Essa é subcoleção do ID exato, então usa apenas o phone limpo)
            db.collection('clients').doc(phone).collection('loyaltyHistory')
                .orderBy('date', 'desc').limit(50).get()
        ]);

        const history = [];

        // Processa Agendamentos
        appointmentsSnap.forEach(doc => {
            const d = doc.data();
            // CORREÇÃO: Tratamento seguro de data (Timestamp -> ISO String)
            let dateIso = null;
            if (d.startTime && typeof d.startTime.toDate === 'function') {
                dateIso = d.startTime.toDate().toISOString();
            } else if (d.startTime) {
                dateIso = d.startTime; // Caso já seja string
            }

            if (dateIso) {
                history.push({
                    type: 'appointment',
                    date: dateIso, // CAMPO PADRONIZADO PARA O FRONTEND
                    description: (d.services && d.services[0]) ? d.services[0].name : (d.serviceName || 'Agendamento'),
                    status: d.status,
                    value: d.totalAmount || 0,
                    id: doc.id
                });
            }
        });

        // Processa Vendas
        salesSnap.forEach(doc => {
            const d = doc.data();
            let dateIso = null;
            if (d.createdAt && typeof d.createdAt.toDate === 'function') {
                dateIso = d.createdAt.toDate().toISOString();
            } else {
                dateIso = d.createdAt;
            }

            history.push({
                type: 'sale',
                date: dateIso,
                description: 'Venda / Comanda',
                status: 'paid',
                value: d.totalAmount || 0,
                id: doc.id
            });
        });

        // Processa Fidelidade
        loyaltySnap.forEach(doc => {
            const d = doc.data();
            history.push({
                type: 'loyalty',
                date: d.date || d.timestamp, // Aceita variações de nome
                description: d.rewardName || (d.points > 0 ? 'Acúmulo Manual' : 'Resgate'),
                status: 'completed',
                value: d.points,
                isPoints: true,
                id: doc.id
            });
        });

        // Ordenação Final em Memória (Mais robusto que depender de índices complexos agora)
        history.sort((a, b) => new Date(b.date) - new Date(a.date));

        res.json(history);

    } catch (error) {
        handleError(res, error, 'Falha ao buscar histórico');
    }
});

// =======================================================================
// 6. RESGATE DE PONTOS
// =======================================================================
router.post('/redeem', async (req, res) => {
    try {
        const { establishmentId, clientPhone, points, rewardName } = req.body;
        
        await db.runTransaction(async (t) => {
            const clientRef = db.collection('clients').doc(clientPhone);
            const doc = await t.get(clientRef);
            if (!doc.exists) throw new Error('Cliente não existe');
            
            const currentPoints = doc.data().loyaltyPoints || 0;
            const cost = Math.abs(parseInt(points));

            if (currentPoints < cost) throw new Error(`Saldo insuficiente.`);

            t.update(clientRef, { loyaltyPoints: currentPoints - cost });
            
            const historyRef = clientRef.collection('loyaltyHistory').doc();
            t.set(historyRef, {
                establishmentId,
                date: new Date().toISOString(),
                points: -cost,
                rewardName: rewardName,
                type: 'redeem'
            });
        });
        res.json({ success: true });
    } catch (error) {
        handleError(res, error, error.message);
    }
});

module.exports = router;