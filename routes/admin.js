// routes/admin.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { AggregateField } = require('firebase-admin/firestore'); // Importante para otimização

// Lista de módulos padrão
const defaultModules = {
    agenda: true, comandas: true, relatorios: true, 'sales-report': true,
    financial: true, servicos: true, produtos: true, suppliers: true,
    profissionais: true, ausencias: true, clientes: true, packages: true,
    commissions: true, estabelecimento: true, users: true, mobileApp: true
};

// Permissões totais para o dono
const masterPermissions = {
    'agenda-section': { view: true, create: true, edit: true, view_all_prof: true },
    'comandas-section': { view: true, create: true, edit: true, view_all_prof: true },
    'relatorios-section': { view: true, create: true, edit: true },
    'sales-report-section': { view: true, create: true, edit: true },
    'financial-section': { view: true, create: true, edit: true },
    'servicos-section': { view: true, create: true, edit: true },
    'produtos-section': { view: true, create: true, edit: true },
    'suppliers-section': { view: true, create: true, edit: true },
    'profissionais-section': { view: true, create: true, edit: true },
    'ausencias-section': { view: true, create: true, edit: true },
    'clientes-section': { view: true, create: true, edit: true },
    'packages-section': { view: true, create: true, edit: true },
    'commissions-section': { view: true, create: true, edit: true },
    'estabelecimento-section': { view: true, create: true, edit: true },
    'users-section': { view: true, create: true, edit: true }
};

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

const getSafeDate = (dateVal) => {
    if (!dateVal) return null;
    if (typeof dateVal.toDate === 'function') return dateVal.toDate();
    const d = new Date(dateVal);
    return isNaN(d.getTime()) ? null : d;
};

// =======================================================================
// 🚀 ROTAS ADMIN OTIMIZADAS
// =======================================================================

// Config da plataforma
router.get('/config', async (req, res) => {
    try {
        const doc = await req.db.collection('config').doc('plataforma').get();
        return res.status(200).json({ logoUrl: doc.exists ? doc.data().logoUrl : null });
    } catch (e) { res.status(500).json({ message: 'Erro config.' }); }
});

// 1. DASHBOARD ANALYTICS (TOTALMENTE REESCRITO PARA PERFORMANCE)
router.get('/dashboard-stats', async (req, res) => {
    try {
        const { db } = req;
        const now = new Date();
        const thirtyDaysAgo = new Date(); thirtyDaysAgo.setDate(now.getDate() - 30);
        const fiveDaysFromNow = new Date(); fiveDaysFromNow.setDate(now.getDate() + 5);

        // 1. Buscar Planos (Cachear preço)
        const plansSnapshot = await db.collection('subscriptionPlans').get();
        const planPrices = {};
        plansSnapshot.forEach(d => planPrices[d.id] = d.data().price || 0);

        // 2. Executar Queries em Paralelo (Aggregation e Selects Leves)
        const [totalAgg, activeAgg, cancelledAgg, mrrSnap, newUsersSnap, attentionSnap] = await Promise.all([
            // A. Contadores Totais (Rápido e Barato)
            db.collection('establishments').count().get(),
            db.collection('establishments').where('status', '==', 'active').count().get(),
            db.collection('establishments').where('status', 'in', ['deleted', 'inactive']).count().get(),
            
            // B. Para MRR: Busca apenas o ID do plano dos ativos (Payload mínimo)
            db.collection('establishments').where('status', '==', 'active').select('subscription.planId').get(),

            // C. Para Gráfico: Busca apenas a data de criação dos últimos 30 dias
            db.collection('establishments').where('createdAt', '>=', admin.firestore.Timestamp.fromDate(thirtyDaysAgo)).select('createdAt').get(),

            // D. Para Lista de Atenção: Filtra diretamente pela data de expiração (Requer índice)
            db.collection('establishments')
                .where('status', '==', 'active')
                .where('subscription.expiryDate', '<=', admin.firestore.Timestamp.fromDate(fiveDaysFromNow))
                .where('subscription.expiryDate', '>', admin.firestore.Timestamp.now()) // Apenas futuros próximos ou vencidos recentemente? Ajuste conforme necessidade
                .orderBy('subscription.expiryDate', 'asc')
                .limit(10)
                .select('name', 'subscription.expiryDate')
                .get()
        ]);

        const totalEstablishments = totalAgg.data().count;
        const activeCount = activeAgg.data().count;
        const cancelledCount = cancelledAgg.data().count;

        // Cálculo MRR
        let mrr = 0;
        mrrSnap.forEach(doc => {
            const pid = doc.data().subscription?.planId;
            if (pid && typeof planPrices[pid] === 'number') mrr += planPrices[pid];
        });

        // Gráfico Novos Assinantes
        const newSubscribersLast30Days = Array(30).fill(0);
        newUsersSnap.forEach(doc => {
            const created = doc.data().createdAt.toDate();
            const daysAgo = Math.floor((now - created) / (1000 * 60 * 60 * 24));
            if (daysAgo >= 0 && daysAgo < 30) newSubscribersLast30Days[29 - daysAgo]++;
        });

        // Lista de Atenção
        const attentionList = attentionSnap.docs.map(doc => {
            const data = doc.data();
            const expiry = data.subscription?.expiryDate.toDate();
            const diffDays = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
            return {
                id: doc.id,
                name: data.name,
                expiryDate: expiry,
                daysLeft: diffDays,
                status: diffDays < 0 ? 'Vencido' : 'A vencer'
            };
        });

        const churnRate = totalEstablishments > 0 ? ((cancelledCount / totalEstablishments) * 100).toFixed(1) : 0;

        res.status(200).json({
            kpis: { mrr, activeUsers: activeCount, newSubscribersData: newSubscribersLast30Days, churnRate, totalUsers: totalEstablishments },
            attentionList
        });

    } catch (error) {
        handleFirestoreError(res, error, 'dashboard stats');
    }
});

// 2. CRIAR ESTABELECIMENTO
router.post('/establishments', async (req, res) => {
    const { establishmentId, name, ownerEmail, ownerPassword, modules, subscription } = req.body;
    if (!establishmentId || !name || !ownerEmail || !ownerPassword) {
        return res.status(400).json({ message: 'Campos obrigatórios faltando.' });
    }
    try {
        const { db, auth } = req;

        const slugCheck = await db.collection('establishments').where('urlId', '==', establishmentId).get();
        if (!slugCheck.empty) return res.status(409).json({ message: 'URL ID já em uso.' });

        const userRecord = await auth.createUser({ email: ownerEmail, password: ownerPassword, displayName: name });

        const establishmentData = {
            name, ownerUid: userRecord.uid, ownerEmail, status: 'active', urlId: establishmentId,
            modules: modules || defaultModules, createdAt: admin.firestore.FieldValue.serverTimestamp(),
            subscription: subscription && subscription.planId ? {
                planId: subscription.planId,
                expiryDate: admin.firestore.Timestamp.fromDate(new Date(subscription.expiryDate))
            } : {
                planId: 'trial',
                expiryDate: admin.firestore.Timestamp.fromDate(new Date(Date.now() + 7*24*60*60*1000))
            }
        };

        await db.collection('establishments').doc(establishmentId).set(establishmentData);
        await auth.setCustomUserClaims(userRecord.uid, { role: 'owner', establishmentId });

        await db.collection('users').doc(userRecord.uid).set({
            name, email: ownerEmail, establishmentId, permissions: masterPermissions,
            status: 'active', isOwnerMaster: true, createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        res.status(201).json({ message: 'Criado com sucesso!', uid: userRecord.uid });
    } catch (error) {
        console.error("Erro criar:", error);
        res.status(500).json({ message: error.code === 'auth/email-already-exists' ? 'Email já usado.' : 'Erro servidor.' });
    }
});

// 3. LISTAR ESTABELECIMENTOS (OTIMIZADA COM .select)
router.get('/establishments', async (req, res) => {
    try {
        const { db } = req;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const search = (req.query.search || '').toLowerCase();
        const status = req.query.status; 
        const planId = req.query.plan;
        const dateRange = req.query.dateRange; 
        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder === 'asc' ? 'asc' : 'desc';

        let query = db.collection('establishments');

        if (status && status !== 'all') query = query.where('status', '==', status);
        else if (!status) query = query.where('status', 'in', ['active', 'inactive']);

        if (dateRange === 'this_month') {
            const now = new Date();
            const start = new Date(now.getFullYear(), now.getMonth(), 1);
            const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            query = query.where('createdAt', '>=', start).where('createdAt', '<=', end);
        }

        // --- OTIMIZAÇÃO: Select apenas campos da tabela ---
        // Evita baixar objetos gigantes com configurações e logs
        query = query.select('name', 'ownerEmail', 'status', 'subscription', 'createdAt', 'urlId', 'ownerUid');

        const snapshot = await query.get();
        let establishments = snapshot.docs.map(doc => {
            const d = doc.data();
            return { 
                id: doc.id, ...d,
                planId: d.subscription?.planId || 'N/A',
                createdAtDate: getSafeDate(d.createdAt) || new Date(0)
            };
        });

        // Filtros em Memória (Search)
        if (search) {
            establishments = establishments.filter(est => 
                (est.name?.toLowerCase().includes(search)) || 
                (est.id?.toLowerCase().includes(search)) ||
                (est.urlId?.toLowerCase().includes(search)) || 
                (est.ownerEmail?.toLowerCase().includes(search))
            );
        }

        if (planId && planId !== 'all') establishments = establishments.filter(est => est.planId === planId);

        // Ordenação em Memória
        establishments.sort((a, b) => {
            let valA = a[sortBy];
            let valB = b[sortBy];
            if (sortBy === 'createdAt') { valA = a.createdAtDate; valB = b.createdAtDate; }
            else { valA = String(valA||'').toLowerCase(); valB = String(valB||'').toLowerCase(); }
            if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
            if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        // Paginação
        const total = establishments.length;
        const totalPages = Math.ceil(total / limit);
        const paginatedData = establishments.slice((page - 1) * limit, page * limit);

        res.status(200).json({ data: paginatedData, pagination: { total, page, limit, totalPages } });

    } catch (error) {
        handleFirestoreError(res, error, 'listar estabelecimentos');
    }
});

// 4. DELETAR (LIXEIRA)
router.delete('/establishments/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { db, auth } = req;
        const ref = db.collection('establishments').doc(id);
        const doc = await ref.get();
        if (!doc.exists) return res.status(404).json({ message: 'Não encontrado.' });

        if (doc.data().ownerUid) {
            try { await auth.updateUser(doc.data().ownerUid, { disabled: true }); }
            catch (e) { if(e.code !== 'auth/user-not-found') console.warn('Erro ao desativar user:', e); }
        }

        await ref.update({ status: 'deleted', deletedAt: admin.firestore.FieldValue.serverTimestamp() });
        res.status(200).json({ message: 'Movido para lixeira.' });
    } catch (error) { handleFirestoreError(res, error, 'deletar'); }
});

// 5. RESTAURAR
router.post('/establishments/:id/restore', async (req, res) => {
    const { id } = req.params;
    try {
        const { db, auth } = req;
        const ref = db.collection('establishments').doc(id);
        const doc = await ref.get();
        if (!doc.exists) return res.status(404).json({ message: 'Não encontrado.' });

        if (doc.data().ownerUid) {
            try { await auth.updateUser(doc.data().ownerUid, { disabled: false }); }
            catch (e) {}
        }

        await ref.update({ status: 'active', deletedAt: admin.firestore.FieldValue.delete() });
        res.status(200).json({ message: 'Restaurado.' });
    } catch (error) { handleFirestoreError(res, error, 'restaurar'); }
});

// 6. ATUALIZAR DETALHES
router.put('/establishments/:id/details', async (req, res) => {
    const { id } = req.params;
    const { name, urlId } = req.body;
    if (!name) return res.status(400).json({ message: "Nome obrigatório." });

    try {
        const { db } = req;
        if (urlId) {
            const existing = await db.collection('establishments').where('urlId', '==', urlId).get();
            if (!existing.empty && existing.docs[0].id !== id) return res.status(409).json({ message: 'URL em uso.' });
        }
        await db.collection('establishments').doc(id).update({ name, ...(urlId && { urlId }) });
        res.status(200).json({ message: 'Atualizado.' });
    } catch (error) { handleFirestoreError(res, error, 'atualizar detalhes'); }
});

router.patch('/establishments/:id/modules', async (req, res) => {
    try {
        await req.db.collection('establishments').doc(req.params.id).update({ modules: req.body.modules });
        res.status(200).json({ message: 'Módulos atualizados.' });
    } catch (error) { handleFirestoreError(res, error, 'atualizar módulos'); }
});

router.patch('/establishments/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const { db, auth } = req;
        const ref = db.collection('establishments').doc(id);
        const doc = await ref.get();
        
        const ownerUid = doc.data()?.ownerUid;
        const usersSnap = await db.collection('users').where('establishmentId', '==', id).get();
        
        const uids = usersSnap.docs.map(d => d.id);
        if(ownerUid) uids.push(ownerUid);

        const disabled = status === 'inactive';
        await Promise.all(uids.map(uid => auth.updateUser(uid, { disabled }).catch(()=>{})));
        
        await ref.update({ status });
        res.status(200).json({ message: `Status alterado para ${status}.` });
    } catch (error) { handleFirestoreError(res, error, 'alterar status'); }
});

// 7. GESTÃO DE USUÁRIOS (SUPER ADMIN)
router.post('/users', async (req, res) => {
    try {
        const { auth } = req;
        const u = await auth.createUser({ email: req.body.email, password: req.body.password });
        await auth.setCustomUserClaims(u.uid, { role: 'super-admin' });
        res.status(201).json({ message: 'Admin criado.', uid: u.uid });
    } catch (error) { res.status(500).json({ message: error.code }); }
});

router.get('/users', async (req, res) => {
    try {
        const list = await req.auth.listUsers(1000);
        const admins = list.users.filter(u => u.customClaims?.role === 'super-admin').map(u => ({ uid: u.uid, email: u.email, role: 'super-admin' }));
        res.status(200).json(admins);
    } catch (error) { res.status(500).json({ message: 'Erro listar.' }); }
});

router.delete('/users/:uid', async (req, res) => {
    if (req.params.uid === req.user.uid) return res.status(403).json({ message: 'Não pode se apagar.' });
    try { await req.auth.deleteUser(req.params.uid); res.status(200).json({ message: 'Apagado.' }); }
    catch (e) { res.status(500).json({ message: 'Erro.' }); }
});

// 8. IMPERSONATION
router.post('/establishments/:id/impersonate', async (req, res) => {
    try {
        const doc = await req.db.collection('establishments').doc(req.params.id).get();
        if (!doc.exists || !doc.data().ownerUid) return res.status(400).json({ message: 'Inválido.' });
        const token = await req.auth.createCustomToken(doc.data().ownerUid, { role: 'owner', establishmentId: req.params.id, impersonated: true });
        res.status(200).json({ token });
    } catch (e) { handleFirestoreError(res, e, 'impersonate'); }
});

module.exports = router;