// routes/admin.js (Código Otimizado e Unificado na coleção 'establishments')

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, isSuperAdmin } = require('../middlewares/auth');

const defaultModules = {
    agenda: true, comandas: true, relatorios: true, 'sales-report': true,
    financial: true, servicos: true, produtos: true, suppliers: true,
    profissionais: true, ausencias: true, clientes: true, packages: true,
    commissions: true, estabelecimento: true, users: true, mobileApp: true
};

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

router.use(verifyToken, isSuperAdmin);

function handleFirestoreError(res, error, context) {
    console.error(`Erro em ${context}:`, error);
    res.status(500).json({ message: error.message || `Erro ao processar ${context}.` });
}

// =======================================================================
// ⚙️ CONFIGURAÇÕES E DASHBOARD
// =======================================================================

router.get('/config', async (req, res) => {
    try {
        const doc = await req.db.collection('config').doc('plataforma').get();
        return res.status(200).json({ logoUrl: doc.exists ? doc.data().logoUrl : null });
    } catch (e) { res.status(500).json({ message: 'Erro config.' }); }
});

router.get('/dashboard-stats', async (req, res) => {
    try {
        const { db } = req;
        const now = new Date();
        const thirtyDaysAgo = new Date(); thirtyDaysAgo.setDate(now.getDate() - 30);

        const plansSnapshot = await db.collection('saas_plans').get();
        const planPrices = {};
        plansSnapshot.forEach(d => planPrices[d.id] = d.data().price || 0);

        // 🔄 Busca os estabelecimentos para gerar os gráficos
        const allSnap = await db.collection('establishments').get();
        // Filtra apenas os clientes raízes (Matrizes), ou seja, quem não tem parentId
        const roots = allSnap.docs.map(d => d.data()).filter(e => !e.parentId);

        const totalCompanies = roots.length;
        const activeRoots = roots.filter(e => e.status === 'active');
        const activeCount = activeRoots.length;
        const cancelledCount = roots.filter(e => ['deleted', 'inactive', 'blocked'].includes(e.status)).length;

        let mrr = 0;
        activeRoots.forEach(e => {
            const pid = e.planId || (e.subscription && e.subscription.planId);
            if (pid && typeof planPrices[pid] === 'number') mrr += planPrices[pid];
        });

        const newSubscribersLast30Days = Array(30).fill(0);
        roots.forEach(e => {
            if (e.createdAt) {
                const created = e.createdAt.toDate ? e.createdAt.toDate() : new Date(e.createdAt);
                const daysAgo = Math.floor((now - created) / (1000 * 60 * 60 * 24));
                if (daysAgo >= 0 && daysAgo < 30) newSubscribersLast30Days[29 - daysAgo]++;
            }
        });

        const churnRate = totalCompanies > 0 ? ((cancelledCount / totalCompanies) * 100).toFixed(1) : 0;

        res.status(200).json({
            kpis: { mrr, activeUsers: activeCount, newSubscribersData: newSubscribersLast30Days, churnRate, totalUsers: totalCompanies }
        });
    } catch (error) { handleFirestoreError(res, error, 'dashboard stats'); }
});

// ============================================================================
// 📦 1. GESTÃO DE PLANOS SAAS
// ============================================================================

router.post('/plans', async (req, res) => {
    const { name, price, maxEstablishments, features } = req.body;
    if (!name || maxEstablishments === undefined) return res.status(400).json({ message: 'Dados obrigatórios ausentes.' });

    try {
        const planRef = await req.db.collection('saas_plans').add({
            name, price: Number(price) || 0, maxEstablishments: Number(maxEstablishments),
            features: features || [], active: true, createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        res.status(201).json({ message: 'Plano criado com sucesso!', planId: planRef.id });
    } catch (error) { handleFirestoreError(res, error, 'criação de plano'); }
});

router.get('/plans', async (req, res) => {
    try {
        const snapshot = await req.db.collection('saas_plans').where('active', '==', true).get();
        res.status(200).json(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) { handleFirestoreError(res, error, 'listagem de planos'); }
});

router.put('/plans/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, maxEstablishments, features } = req.body;
    try {
        await req.db.collection('saas_plans').doc(id).update({
            name, price: Number(price) || 0, maxEstablishments: Number(maxEstablishments),
            features: features || [], updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        res.status(200).json({ message: 'Plano atualizado com sucesso!' });
    } catch (error) { handleFirestoreError(res, error, 'atualização de plano'); }
});

router.delete('/plans/:id', async (req, res) => {
    try {
        await req.db.collection('saas_plans').doc(req.params.id).update({ active: false });
        res.status(200).json({ message: 'Plano desativado com sucesso!' });
    } catch (error) { handleFirestoreError(res, error, 'exclusão de plano'); }
});

// ============================================================================
// 🏢 2. INQUILINOS / REDES / TENANTS
// ============================================================================

router.get('/tenants', async (req, res) => {
    try {
        const { db } = req;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const search = (req.query.search || '').toLowerCase();
        
        // 🔄 Busca da coleção correta (establishments)
        const snapshot = await db.collection('establishments').orderBy('createdAt', 'desc').get();
        let allEstablishments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Filtra para pegar apenas os donos (Matrizes), ocultando filiais soltas da tabela
        let companies = allEstablishments.filter(e => !e.parentId);

        if (search) {
            companies = companies.filter(c => 
                (c.name?.toLowerCase().includes(search)) || 
                (c.document?.toLowerCase().includes(search)) ||
                (c.ownerEmail?.toLowerCase().includes(search))
            );
        }

        const total = companies.length;
        const paginatedData = companies.slice((page - 1) * limit, page * limit);

        res.status(200).json({ data: paginatedData, pagination: { total, page, limit, totalPages: Math.ceil(total / limit) } });
    } catch (error) { handleFirestoreError(res, error, 'listar inquilinos'); }
});

router.put('/tenants/:companyId', async (req, res) => {
    const { companyId } = req.params;
    
    // CORREÇÃO: Adicionados 'phone' e 'documentInfo' na desestruturação
    const { planId, nextDueDate, gracePeriodDays, lastPaymentStatus, isNetwork, phone, documentInfo } = req.body;

    try {
        const { db } = req;
        const updateData = { updatedAt: admin.firestore.FieldValue.serverTimestamp() };
        
        if (planId !== undefined) {
            updateData.planId = planId;
            // CORREÇÃO: Força a atualização dentro do objeto subscription também para retrocompatibilidade
            updateData['subscription.planId'] = planId; 
        }
        if (nextDueDate !== undefined) updateData.nextDueDate = nextDueDate; 
        if (gracePeriodDays !== undefined) updateData.gracePeriodDays = Number(gracePeriodDays) || 0;
        if (lastPaymentStatus !== undefined) updateData.lastPaymentStatus = lastPaymentStatus; 
        if (isNetwork !== undefined) updateData.isNetwork = isNetwork;
        
        // CORREÇÃO: Salvando telefone e documento no banco
        if (phone !== undefined) updateData.phone = phone;
        if (documentInfo !== undefined) updateData.document = documentInfo;

        // Atualiza direto o estabelecimento raiz
        await db.collection('establishments').doc(companyId).update(updateData);
        res.status(200).json({ message: 'Dados do cliente atualizados com sucesso.' });
    } catch (error) {
        handleFirestoreError(res, error, 'atualizar inquilino');
    }
});

router.patch('/tenants/:companyId/status', async (req, res) => {
    const { companyId } = req.params;
    const { status } = req.body;
    try {
        const { db, auth } = req;
        
        // 1. Atualiza o status da Matriz
        await db.collection('establishments').doc(companyId).update({ status });
        
        // 2. Atualiza o status de todas as filiais amarradas a esta Matriz
        const ests = await db.collection('establishments').where('parentId', '==', companyId).get();
        const batch = db.batch();
        ests.forEach(doc => batch.update(doc.ref, { status }));
        await batch.commit();

        // 3. Desativa os utilizadores
        const usersSnap = await db.collection('users').where('establishmentId', '==', companyId).get();
        const disabled = status === 'inactive' || status === 'blocked' || status === 'deleted';
        await Promise.all(usersSnap.docs.map(d => auth.updateUser(d.id, { disabled }).catch(()=>{})));
        
        res.status(200).json({ message: `Status alterado para ${status}.` });
    } catch (error) { handleFirestoreError(res, error, 'alterar status'); }
});

// ============================================================================
// 💰 3. HISTÓRICO DE PAGAMENTOS SAAS E FATURAÇÃO
// ============================================================================

router.get('/tenants/:companyId/payments', async (req, res) => {
    try {
        const snapshot = await req.db.collection('saas_payments')
            .where('companyId', '==', req.params.companyId)
            .orderBy('paymentDate', 'desc')
            .get();
        
        res.status(200).json(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) { handleFirestoreError(res, error, 'listar pagamentos saas'); }
});

router.post('/tenants/:companyId/payments', async (req, res) => {
    const { companyId } = req.params;
    const { amount, paymentMethod, status, notes, paymentDate } = req.body;

    try {
        const { db } = req;
        await db.runTransaction(async (t) => {
            const estRef = db.collection('establishments').doc(companyId);
            const estDoc = await t.get(estRef);
            if (!estDoc.exists) throw new Error("Cliente não encontrado.");

            const paymentRef = db.collection('saas_payments').doc();
            t.set(paymentRef, {
                companyId,
                amount: Number(amount),
                paymentMethod: paymentMethod || 'manual',
                status: status || 'paid',
                paymentDate: paymentDate || new Date().toISOString().split('T')[0],
                notes: notes || '',
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            });

            if (status === 'paid') {
                const currentDueDateStr = estDoc.data().nextDueDate;
                let currentDueDate = currentDueDateStr ? new Date(currentDueDateStr + 'T12:00:00Z') : new Date();
                
                currentDueDate.setMonth(currentDueDate.getMonth() + 1); // Adiciona 1 mês
                
                t.update(estRef, {
                    lastPaymentDate: paymentDate || new Date().toISOString().split('T')[0],
                    lastPaymentStatus: 'paid',
                    nextDueDate: currentDueDate.toISOString().split('T')[0],
                    status: 'active' 
                });

                if (estDoc.data().status === 'blocked' || estDoc.data().status === 'inactive') {
                    const branches = await t.get(db.collection('establishments').where('parentId', '==', companyId));
                    branches.forEach(doc => t.update(doc.ref, { status: 'active' }));
                }
            }
        });
        
        res.status(201).json({ message: 'Pagamento registado com sucesso e faturação atualizada.' });
    } catch (error) { handleFirestoreError(res, error, 'registar pagamento saas'); }
});

// ============================================================================
// 🕵️ 4. IMPERSONATION E ADMINS INTERNOS
// ============================================================================

router.post('/tenants/:companyId/impersonate', async (req, res) => {
    try {
        const { db, auth } = req;
        const { companyId } = req.params;

        const estDoc = await db.collection('establishments').doc(companyId).get();
        if (!estDoc.exists || !estDoc.data().ownerUid) return res.status(400).json({ message: 'Rede inválida ou dono não encontrado.' });

        const token = await auth.createCustomToken(estDoc.data().ownerUid, { 
            role: 'owner', establishmentId: companyId, impersonated: true 
        });
        
        res.status(200).json({ token });
    } catch (e) { handleFirestoreError(res, e, 'impersonate company'); }
});

router.post('/users', async (req, res) => {
    try {
        const { auth } = req;
        const u = await auth.createUser({ email: req.body.email, password: req.body.password });
        await auth.setCustomUserClaims(u.uid, { role: 'super-admin' });
        res.status(201).json({ message: 'Admin Interno criado.', uid: u.uid });
    } catch (error) { res.status(500).json({ message: error.code }); }
});

router.get('/users', async (req, res) => {
    try {
        const list = await req.auth.listUsers(1000);
        const admins = list.users.filter(u => u.customClaims?.role === 'super-admin' || u.customClaims?.role === 'super_admin').map(u => ({ uid: u.uid, email: u.email }));
        res.status(200).json(admins);
    } catch (error) { res.status(500).json({ message: 'Erro listar admins.' }); }
});

router.delete('/users/:uid', async (req, res) => {
    if (req.params.uid === req.user.uid) return res.status(403).json({ message: 'Não pode se apagar.' });
    try { await req.auth.deleteUser(req.params.uid); res.status(200).json({ message: 'Admin Apagado.' }); }
    catch (e) { res.status(500).json({ message: 'Erro ao apagar admin.' }); }
});

module.exports = router;