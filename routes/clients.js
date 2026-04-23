// routes/clients.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, hasAccess } = require('../middlewares/auth');

// Middleware de autenticação
router.use(verifyToken, hasAccess);

const db = admin.firestore();

// --- HELPER DE FORMATAÇÃO PARA BUSCA DE TELEFONE ---
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

// --- HELPER SEGURO PARA DATAS DO FIRESTORE ---
function parseFirestoreDate(value) {
    if (!value) return null;
    
    // 1. Se for objeto Timestamp do Firestore (tem método toDate)
    if (value && typeof value.toDate === 'function') {
        return value.toDate();
    }
    
    // 2. Se for objeto serializado com seconds (comum em algumas queries)
    if (value && (value.seconds !== undefined || value._seconds !== undefined)) {
        const seconds = value.seconds || value._seconds;
        return new Date(seconds * 1000);
    }

    // 3. Tenta string ISO ou timestamp numérico padrão
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
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
        const { search, limit, hasLoyalty, birthMonth, inactiveDays, hasDebt } = req.query; 
        
        const isFilteringInMemory = birthMonth || inactiveDays;
        const limitVal = isFilteringInMemory ? 500 : (parseInt(limit) || 20);

        let query = db.collection('clients')
            .where('establishmentId', '==', establishmentId);

        // --- ESTRATÉGIA DE BUSCA NO BANCO ---
        if (hasLoyalty === 'true' && !search) {
            query = query.where('loyaltyPoints', '>', 0).orderBy('loyaltyPoints', 'desc');
        } 
        else if (hasDebt === 'true' && !search) {
            query = query.where('totalDebt', '>', 0).orderBy('totalDebt', 'desc');
        }
        else if (search && search.trim()) {
            const term = search.trim();
            if (/^\d+$/.test(term)) {
                const doc = await db.collection('clients').doc(term).get();
                if (doc.exists && doc.data().establishmentId === establishmentId) {
                     let result = [{ id: doc.id, ...doc.data() }];
                     return res.json(applyMemoryFilters(result, hasLoyalty, birthMonth, inactiveDays, hasDebt)); 
                }
                query = query.orderBy('phone').startAt(term).endAt(term + '\uf8ff');
            } else {
                let searchTerm = term;
                if (searchTerm.length > 0 && searchTerm === searchTerm.toLowerCase()) {
                    searchTerm = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1);
                }
                query = query.orderBy('name').startAt(searchTerm).endAt(searchTerm + '\uf8ff');
            }
        } else {
            if (!(hasLoyalty === 'true' && !search) && !(hasDebt === 'true' && !search)) {
                query = query.orderBy('name');
            }
        }

        const snapshot = await query.limit(limitVal).get();
        let clients = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        clients = applyMemoryFilters(clients, hasLoyalty, birthMonth, inactiveDays, hasDebt);

        res.json(clients);
    } catch (error) {
        handleError(res, error, 'Falha ao listar clientes');
    }
});

// --- FUNÇÃO AUXILIAR DE FILTROS EM MEMÓRIA ---
function applyMemoryFilters(list, hasLoyalty, birthMonth, inactiveDays, hasDebt) {
    if (!hasLoyalty && !birthMonth && !inactiveDays && !hasDebt) return list;

    return list.filter(c => {
        let pass = true;

        if (hasLoyalty === 'true') {
            if (!c.loyaltyPoints || c.loyaltyPoints <= 0) pass = false;
        }

        if (hasDebt === 'true') {
            if (!c.totalDebt || c.totalDebt <= 0) pass = false;
        }

        if (pass && birthMonth) {
            const filterMonth = parseInt(birthMonth, 10);
            if (c.dobMonth) {
                const clientMonth = parseInt(c.dobMonth, 10);
                if (clientMonth !== filterMonth) pass = false;
            } 
            else if (c.birthDate) {
                const parts = c.birthDate.split('-');
                if (parts.length >= 2) {
                    const clientMonth = parseInt(parts[1], 10);
                    if (clientMonth !== filterMonth) pass = false;
                } else {
                    pass = false; 
                }
            } else {
                pass = false; 
            }
        }

        if (pass && inactiveDays) {
            const daysLimit = parseInt(inactiveDays);
            const rawDate = c.lastServiceDate || c.lastVisit || c.updatedAt || c.createdAt;
            const lastDate = parseFirestoreDate(rawDate);
            
            if (!lastDate) {
                pass = true; 
            } else {
                const now = new Date();
                const diffTime = Math.abs(now - lastDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                if (diffDays < daysLimit) pass = false; 
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

        const now = admin.firestore.FieldValue.serverTimestamp(); 
        
        const updateData = {
            ...data,
            id: id,
            phone: id,
            updatedAt: now 
        };

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
// 5. HISTÓRICO UNIFICADO (ADAPTADO PARA MULTI-EMPRESAS)
// =======================================================================
router.get('/full-history/:establishmentIds', async (req, res) => {
    try {
        // Pode receber um ID único ou vários separados por vírgula (Matriz + Filiais)
        const estIds = req.params.establishmentIds.split(',').filter(id => id.trim() !== '');
        const { phone } = req.query; 

        if (!phone || estIds.length === 0) return res.status(400).json([]);

        const phoneVariations = getPhoneVariations(phone);
        
        // Como o Firestore só permite um 'in' por query e já o usamos nos telefones,
        // geramos as buscas paralelamente para cada estabelecimento selecionado.
        const apptPromises = estIds.map(eid => 
            db.collection('appointments')
                .where('establishmentId', '==', eid)
                .where('clientPhone', 'in', phoneVariations) 
                .limit(50) 
                .get()
        );

        const salesPromises = estIds.map(eid => 
            db.collection('sales')
                .where('establishmentId', '==', eid)
                .where('clientPhone', 'in', phoneVariations)
                .limit(50)
                .get()
        );

        // Fidelidade é vinculada ao cliente (Telefone), buscamos 1 vez.
        const loyaltyPromise = db.collection('clients').doc(phone).collection('loyaltyHistory')
            .orderBy('date', 'desc').limit(50).get();

        const [apptSnaps, salesSnaps, loyaltySnap] = await Promise.all([
            Promise.all(apptPromises),
            Promise.all(salesPromises),
            loyaltyPromise
        ]);

        const history = [];

        // Processa Agendamentos (Extrai establishmentId de cada doc para o UI saber a origem)
        apptSnaps.forEach(snap => {
            snap.forEach(doc => {
                const d = doc.data();
                const dateIso = parseFirestoreDate(d.startTime); 

                if (dateIso) {
                    history.push({
                        type: 'appointment',
                        date: dateIso.toISOString(),
                        description: (d.services && d.services[0]) ? d.services[0].name : (d.serviceName || 'Agendamento'),
                        status: d.status,
                        value: d.totalAmount || 0,
                        id: doc.id,
                        establishmentId: d.establishmentId
                    });

                    // --- Captura os pontos ganhos neste agendamento ---
                    if (d.status === 'completed' && d.loyaltyPointsEarned > 0) {
                        history.push({
                            type: 'loyalty',
                            date: dateIso.toISOString(),
                            description: 'Pontos de Agendamento',
                            points: d.loyaltyPointsEarned, // Valor positivo
                            id: doc.id + '_earn',
                            establishmentId: d.establishmentId
                        });
                    }
                    
                    // --- Captura os pontos resgatados (deduzidos) neste agendamento ---
                    if (d.loyaltyRedemption) {
                        history.push({
                            type: 'loyalty',
                            date: dateIso.toISOString(),
                            description: `Resgate: ${d.loyaltyRedemption.name || 'Prêmio'}`,
                            points: -(d.loyaltyRedemption.cost || 0), // Valor negativo (Deduz)
                            id: doc.id + '_redeem',
                            establishmentId: d.establishmentId
                        });
                    }
                }
            });
        });

        // Processa Vendas / Comandas
        salesSnaps.forEach(snap => {
            snap.forEach(doc => {
                const d = doc.data();
                const dateIso = parseFirestoreDate(d.createdAt); 

                if (dateIso) {
                    history.push({
                        type: 'sale',
                        date: dateIso.toISOString(),
                        description: 'Venda / Comanda',
                        status: 'paid',
                        value: d.totalAmount || 0,
                        id: doc.id,
                        establishmentId: d.establishmentId
                    });
                    
                    // A captura de pontos de fidelidade (earn/redeem) foi removida daqui
                    // para evitar duplicação com a captura já feita no processamento de Agendamentos.
                }
            });
        });

        // Processa Fidelidade (Ajustes manuais e outros registos antigos diretos no cliente)
        if (loyaltySnap) {
            loyaltySnap.forEach(doc => {
                const d = doc.data();
                const dateVal = parseFirestoreDate(d.date || d.timestamp);
                
                history.push({
                    type: 'loyalty',
                    date: dateVal ? dateVal.toISOString() : new Date().toISOString(),
                    description: d.rewardName || (d.points > 0 ? 'Acúmulo Manual' : 'Resgate'),
                    status: 'completed',
                    value: d.points,
                    isPoints: true,
                    id: doc.id,
                    establishmentId: d.establishmentId || estIds[0]
                });
            });
        }

        // Ordenação Final em Memória (Mais recentes primeiro)
        history.sort((a, b) => new Date(b.date) - new Date(a.date));

        res.json(history);

    } catch (error) {
        handleError(res, error, 'Falha ao buscar histórico unificado');
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

            t.update(clientRef, { 
                loyaltyPoints: currentPoints - cost,
                updatedAt: admin.firestore.FieldValue.serverTimestamp()
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