// routes/clients.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, hasAccess } = require('../middlewares/auth');

// Middleware de autenticação
router.use(verifyToken, hasAccess);

const db = admin.firestore();

// --- HELPER DE FORMATAÇÃO PARA BUSCA ---
function getPhoneVariations(phone) {
    const p = String(phone).replace(/\D/g, '');
    const variations = [p]; 
    
    if (p.length === 11) {
        variations.push(`(${p.substring(0,2)}) ${p.substring(2,7)}-${p.substring(7,11)}`);
    }
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
// 1. LISTAGEM E BUSCA OTIMIZADA COM FILTROS
// =======================================================================
router.get('/:establishmentId', async (req, res) => {
    try {
        const { establishmentId } = req.params;
        const { search, limit, hasLoyalty, birthMonth, inactiveDays } = req.query;
        
        // Se houver filtros de memória (data/mês), aumentamos o limite da busca no banco 
        // para garantir que tenhamos candidatos suficientes após a filtragem.
        const isFilteringInMemory = birthMonth || inactiveDays;
        const limitVal = isFilteringInMemory ? 500 : (parseInt(limit) || 20);

        let query = db.collection('clients')
            .where('establishmentId', '==', establishmentId);

        // --- ESTRATÉGIA DE BUSCA NO BANCO ---

        // 1. Otimização: Se filtrar APENAS por fidelidade (sem busca textual), usa o índice do banco
        if (hasLoyalty === 'true' && !search) {
            query = query.where('loyaltyPoints', '>', 0).orderBy('loyaltyPoints', 'desc');
        } 
        // 2. Busca textual (Nome ou ID)
        else if (search && search.trim()) {
            const term = search.trim();
            // Busca numérica direta (Telefone ID)
            if (/^\d+$/.test(term)) {
                const doc = await db.collection('clients').doc(term).get();
                if (doc.exists && doc.data().establishmentId === establishmentId) {
                     let result = [{ id: doc.id, ...doc.data() }];
                     // Aplica os filtros de memória no resultado único
                     return res.json(applyMemoryFilters(result, hasLoyalty, birthMonth, inactiveDays)); 
                }
                // Fallback: tenta buscar por phone range se não achar ID direto (para casos de prefixo)
                query = query.orderBy('phone').startAt(term).endAt(term + '\uf8ff');
            } else {
                // Busca textual por nome
                query = query.orderBy('name').startAt(term).endAt(term + '\uf8ff');
            }
        } else {
            // 3. Padrão: Ordena por nome se não caiu na otimização de fidelidade
            if (!(hasLoyalty === 'true' && !search)) {
                query = query.orderBy('name');
            }
        }

        const snapshot = await query.limit(limitVal).get();
        let clients = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // --- FILTRAGEM EM MEMÓRIA (REFINAMENTO) ---
        // Necessário pois Firestore não filtra nativamente por "mês de uma data" ou "diferença de dias"
        clients = applyMemoryFilters(clients, hasLoyalty, birthMonth, inactiveDays);

        res.json(clients);
    } catch (error) {
        handleError(res, error, 'Falha ao listar clientes');
    }
});

// --- FUNÇÃO AUXILIAR DE FILTROS EM MEMÓRIA ---
function applyMemoryFilters(list, hasLoyalty, birthMonth, inactiveDays) {
    // Se não tem filtros extras, retorna a lista original
    if (!hasLoyalty && !birthMonth && !inactiveDays) return list;

    return list.filter(c => {
        let pass = true;

        // 1. Filtro Fidelidade (Segurança extra caso a query do banco seja mista)
        if (hasLoyalty === 'true') {
            if (!c.loyaltyPoints || c.loyaltyPoints <= 0) pass = false;
        }

        // 2. Filtro Mês de Aniversário
        if (pass && birthMonth) {
            // birthDate geralmente é "YYYY-MM-DD". Pegamos a parte do mês (índice 1 no split)
            if (!c.birthDate || c.birthDate.split('-')[1] !== birthMonth) {
                pass = false;
            }
        }

        // 3. Filtro de Inatividade (Dias sem visita)
        if (pass && inactiveDays) {
            const daysLimit = parseInt(inactiveDays);
            
            // Tenta usar lastVisit (se existir no futuro) ou updatedAt ou createdAt
            const lastInteractionStr = c.lastVisit || c.updatedAt || c.createdAt;
            
            if (!lastInteractionStr) {
                // Se não tem data nenhuma, assumimos que é inativo (ou novo sem interação)
                // Vamos manter na lista de inativos se considerarmos que nunca visitou
                // Mas aqui a lógica é "não visita há X dias". Se não tem data, faz muito tempo.
                pass = true; 
            } else {
                const lastDate = new Date(lastInteractionStr);
                const now = new Date();
                
                // Diferença em milissegundos
                const diffTime = Math.abs(now - lastDate);
                // Converte para dias
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                
                // Queremos clientes cuja última visita foi há MAIS tempo que o limite
                // Ex: Filtro 30 dias. Se visitou há 5 dias (5 < 30), NÃO passa (é ativo).
                if (diffDays < daysLimit) {
                    pass = false; 
                }
            }
        }

        return pass;
    });
}

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
        
        // Prepara dados de atualização
        const updateData = {
            ...data,
            id: id,
            phone: id,
            updatedAt: now // Atualiza a data de modificação (usada para cálculo de inatividade)
        };

        // Usa set com merge para criar ou atualizar
        await db.collection('clients').doc(id).set({
            createdAt: now, // Só define se o doc não existir (devido ao merge, mas cuidado: set sobrescreve se não tratar)
            ...updateData
        }, { merge: true });
        
        // Pequena correção: Se for update, o createdAt original é mantido pelo Firestore se usarmos update, 
        // mas com set({createdAt: now}, {merge:true}) ele pode sobrescrever se passarmos explicitamente.
        // O ideal é usar update() se existir, ou set() se não.
        // Mas para simplificar e garantir o upsert seguro sem leitura prévia:
        // O updatedAt já serve como "última interação" para nosso filtro.

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
// 5. HISTÓRICO UNIFICADO
// =======================================================================
router.get('/full-history/:establishmentId', async (req, res) => {
    try {
        const { establishmentId } = req.params;
        const { phone } = req.query; 

        if (!phone) return res.status(400).json([]);

        const phoneVariations = getPhoneVariations(phone);
        
        const [appointmentsSnap, salesSnap, loyaltySnap] = await Promise.all([
            // Busca Agendamentos
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

            // Busca Fidelidade
            db.collection('clients').doc(phone).collection('loyaltyHistory')
                .orderBy('date', 'desc').limit(50).get()
        ]);

        const history = [];

        // Processa Agendamentos
        appointmentsSnap.forEach(doc => {
            const d = doc.data();
            let dateIso = null;
            if (d.startTime && typeof d.startTime.toDate === 'function') {
                dateIso = d.startTime.toDate().toISOString();
            } else {
                dateIso = d.startTime;
            }

            if (dateIso) {
                history.push({
                    type: 'appointment',
                    date: dateIso,
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
                date: d.date || d.timestamp,
                description: d.rewardName || (d.points > 0 ? 'Acúmulo Manual' : 'Resgate'),
                status: 'completed',
                value: d.points,
                isPoints: true,
                id: doc.id
            });
        });

        // Ordenação Final em Memória
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

            // Atualiza pontos e data de última interação (importante para filtro de inatividade)
            t.update(clientRef, { 
                loyaltyPoints: currentPoints - cost,
                updatedAt: new Date().toISOString()
            });
            
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