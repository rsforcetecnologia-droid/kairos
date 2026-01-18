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
                // 3. Busca textual por nome (CORREÇÃO CASE SENSITIVE)
                
                // Se o termo veio totalmente em minúsculo (ex: "mar"), convertemos a primeira letra
                // para Maiúscula (ex: "Mar") para aumentar a chance de encontrar nomes próprios (ex: "Maria").
                let searchTerm = term;
                if (searchTerm.length > 0 && searchTerm === searchTerm.toLowerCase()) {
                    searchTerm = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1);
                }

                query = query.orderBy('name').startAt(searchTerm).endAt(searchTerm + '\uf8ff');
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
        clients = applyMemoryFilters(clients, hasLoyalty, birthMonth, inactiveDays);

        res.json(clients);
    } catch (error) {
        handleError(res, error, 'Falha ao listar clientes');
    }
});

// --- FUNÇÃO AUXILIAR DE FILTROS EM MEMÓRIA (CORRIGIDA) ---
function applyMemoryFilters(list, hasLoyalty, birthMonth, inactiveDays) {
    // Se não tem filtros extras, retorna a lista original
    if (!hasLoyalty && !birthMonth && !inactiveDays) return list;

    return list.filter(c => {
        let pass = true;

        // 1. Filtro Fidelidade
        if (hasLoyalty === 'true') {
            if (!c.loyaltyPoints || c.loyaltyPoints <= 0) pass = false;
        }

        // 2. Filtro Mês de Aniversário [CORRIGIDO]
        if (pass && birthMonth) {
            const filterMonth = parseInt(birthMonth, 10);
            
            // Prioridade: Campo explícito 'dobMonth' (ex: salvo como número 5 ou string "5")
            if (c.dobMonth) {
                const clientMonth = parseInt(c.dobMonth, 10);
                if (clientMonth !== filterMonth) pass = false;
            } 
            // Fallback: Campo 'birthDate' (ex: "2000-05-20")
            else if (c.birthDate) {
                const parts = c.birthDate.split('-');
                if (parts.length >= 2) {
                    const clientMonth = parseInt(parts[1], 10); // "05" vira 5
                    if (clientMonth !== filterMonth) pass = false;
                } else {
                    pass = false; // Formato inválido
                }
            } else {
                pass = false; // Sem data de nascimento
            }
        }

        // 3. Filtro de Inatividade (Dias sem visita) [CORRIGIDO]
        if (pass && inactiveDays) {
            const daysLimit = parseInt(inactiveDays);
            
            // Busca qualquer registro de data de interação
            const rawDate = c.lastServiceDate || c.lastVisit || c.updatedAt || c.createdAt;
            
            // Usa o helper para converter Timestamp/String em objeto Date válido
            const lastDate = parseFirestoreDate(rawDate);
            
            if (!lastDate) {
                // Se não tem data nenhuma, assumimos que é inativo (nunca veio) -> Passa no filtro
                pass = true; 
            } else {
                const now = new Date();
                const diffTime = Math.abs(now - lastDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                
                // Se diffDays (dias desde a visita) for MENOR que o limite, ele veio recentemente.
                // Logo, devemos DESCARTAR (pass = false) pois ele é ATIVO.
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

        const now = admin.firestore.FieldValue.serverTimestamp(); 
        
        // Prepara dados de atualização
        const updateData = {
            ...data,
            id: id,
            phone: id,
            updatedAt: now // Atualiza a data de modificação
        };

        // Usa set com merge para criar ou atualizar
        await db.collection('clients').doc(id).set({
            createdAt: now, // Só define se o doc não existir
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
            const dateIso = parseFirestoreDate(d.startTime); 

            if (dateIso) {
                history.push({
                    type: 'appointment',
                    date: dateIso.toISOString(),
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
            const dateIso = parseFirestoreDate(d.createdAt); 

            if (dateIso) {
                history.push({
                    type: 'sale',
                    date: dateIso.toISOString(),
                    description: 'Venda / Comanda',
                    status: 'paid',
                    value: d.totalAmount || 0,
                    id: doc.id
                });
            }
        });

        // Processa Fidelidade
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