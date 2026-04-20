// routes/admin.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { AggregateField } = require('firebase-admin/firestore');
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

const getSafeDate = (dateVal) => {
    if (!dateVal) return null;
    if (typeof dateVal.toDate === 'function') return dateVal.toDate();
    const d = new Date(dateVal);
    return isNaN(d.getTime()) ? null : d;
};

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

        const [totalAgg, activeAgg, cancelledAgg, activeCompaniesSnap, newCompaniesSnap] = await Promise.all([
            db.collection('companies').count().get(),
            db.collection('companies').where('status', '==', 'active').count().get(),
            db.collection('companies').where('status', 'in', ['deleted', 'inactive', 'blocked']).count().get(),
            db.collection('companies').where('status', '==', 'active').select('planId').get(),
            db.collection('companies').where('createdAt', '>=', admin.firestore.Timestamp.fromDate(thirtyDaysAgo)).select('createdAt').get()
        ]);

        const totalCompanies = totalAgg.data().count;
        const activeCount = activeAgg.data().count;
        const cancelledCount = cancelledAgg.data().count;

        let mrr = 0;
        activeCompaniesSnap.forEach(doc => {
            const pid = doc.data().planId;
            if (pid && typeof planPrices[pid] === 'number') mrr += planPrices[pid];
        });

        const newSubscribersLast30Days = Array(30).fill(0);
        newCompaniesSnap.forEach(doc => {
            const created = doc.data().createdAt.toDate();
            const daysAgo = Math.floor((now - created) / (1000 * 60 * 60 * 24));
            if (daysAgo >= 0 && daysAgo < 30) newSubscribersLast30Days[29 - daysAgo]++;
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

router.post('/tenants', async (req, res) => {
    const { db, auth } = req;
    const { 
        companyName, documentInfo, phone, address, isNetwork, // Dados da Empresa
        planId, // Plano
        adminName, adminEmail, adminPassword // Dados Master
    } = req.body;

    if (!companyName || !planId || !adminEmail || !adminPassword) {
        return res.status(400).json({ message: 'Dados essenciais incompletos.' });
    }

    try {
        const planDoc = await db.collection('saas_plans').doc(planId).get();
        if (!planDoc.exists) return res.status(400).json({ message: 'Plano não existe.' });

        // Auto-geração silenciosa do Slug interno para a Matriz funcionar sem erros no front do cliente
        const baseSlug = companyName.toLowerCase().replace(/[^a-z0-9-]/g, '');
        const slugCheck = await db.collection('establishments').where('urlId', '==', baseSlug).get();
        const finalUrlId = slugCheck.empty ? baseSlug : `${baseSlug}-${Date.now().toString().slice(-4)}`;

        let userRecord;
        try {
            userRecord = await auth.createUser({ email: adminEmail, password: adminPassword, displayName: adminName });
        } catch (authError) {
            return res.status(400).json({ message: authError.code === 'auth/email-already-exists' ? 'Email já em uso.' : authError.message });
        }

        const companyRef = db.collection('companies').doc();
        const matrizRef = db.collection('establishments').doc();
        const userRef = db.collection('users').doc(userRecord.uid);

        const nextDueDate = new Date();
        nextDueDate.setDate(nextDueDate.getDate() + 30); // 1 Mês grátis padrão

        await db.runTransaction(async (transaction) => {
            transaction.set(companyRef, {
                name: companyName, 
                document: documentInfo || '',
                phone: phone || '',
                address: address || '',
                isNetwork: isNetwork === true || isNetwork === 'true',
                planId: planId, 
                ownerUid: userRecord.uid, 
                ownerEmail: adminEmail,
                status: 'active',
                nextDueDate: nextDueDate.toISOString().split('T')[0],
                gracePeriodDays: 5, 
                lastPaymentStatus: 'pending', // pending, paid, overdue
                lastPaymentDate: null,
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            });

            transaction.set(matrizRef, {
                companyId: companyRef.id, 
                name: isNetwork ? `Matriz - ${companyName}` : companyName, 
                type: 'Matriz',
                urlId: finalUrlId, 
                status: 'active', 
                modules: defaultModules,
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            });

            transaction.set(userRef, {
                email: adminEmail, name: adminName, phone: phone || '',
                role: 'company_admin', companyId: companyRef.id,
                establishmentId: matrizRef.id, accessibleIn: [matrizRef.id], 
                permissions: masterPermissions, status: 'active', isOwnerMaster: true,
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            });
        });

        await auth.setCustomUserClaims(userRecord.uid, { companyId: companyRef.id, role: 'company_admin' });
        res.status(201).json({ message: 'Cliente criado com sucesso!', companyId: companyRef.id });

    } catch (error) {
        if (adminEmail) {
            try { const u = await admin.auth().getUserByEmail(adminEmail); if (u) await admin.auth().deleteUser(u.uid); } catch (e) {} 
        }
        handleFirestoreError(res, error, 'setup wizard');
    }
});

router.get('/tenants', async (req, res) => {
    try {
        const { db } = req;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const search = (req.query.search || '').toLowerCase();
        
        let query = db.collection('companies').orderBy('createdAt', 'desc');
        const snapshot = await query.get();
        let companies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

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
    const { planId, nextDueDate, gracePeriodDays, lastPaymentStatus, isNetwork } = req.body;

    try {
        const { db } = req;
        const updateData = { updatedAt: admin.firestore.FieldValue.serverTimestamp() };
        
        if (planId !== undefined) updateData.planId = planId;
        if (nextDueDate !== undefined) updateData.nextDueDate = nextDueDate; 
        if (gracePeriodDays !== undefined) updateData.gracePeriodDays = Number(gracePeriodDays) || 0;
        if (lastPaymentStatus !== undefined) updateData.lastPaymentStatus = lastPaymentStatus; 
        if (isNetwork !== undefined) updateData.isNetwork = isNetwork;

        await db.collection('companies').doc(companyId).update(updateData);
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
        await db.collection('companies').doc(companyId).update({ status });
        
        const ests = await db.collection('establishments').where('companyId', '==', companyId).get();
        const batch = db.batch();
        ests.forEach(doc => batch.update(doc.ref, { status }));
        await batch.commit();

        const usersSnap = await db.collection('users').where('companyId', '==', companyId).get();
        const disabled = status === 'inactive' || status === 'blocked';
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
            const companyRef = db.collection('companies').doc(companyId);
            const compDoc = await t.get(companyRef);
            if (!compDoc.exists) throw new Error("Cliente não encontrado.");

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
                const currentDueDateStr = compDoc.data().nextDueDate;
                let currentDueDate = currentDueDateStr ? new Date(currentDueDateStr + 'T12:00:00Z') : new Date();
                
                currentDueDate.setMonth(currentDueDate.getMonth() + 1);
                
                t.update(companyRef, {
                    lastPaymentDate: paymentDate || new Date().toISOString().split('T')[0],
                    lastPaymentStatus: 'paid',
                    nextDueDate: currentDueDate.toISOString().split('T')[0],
                    status: 'active' 
                });

                if (compDoc.data().status === 'blocked' || compDoc.data().status === 'inactive') {
                    const ests = await t.get(db.collection('establishments').where('companyId', '==', companyId));
                    ests.forEach(doc => t.update(doc.ref, { status: 'active' }));
                }
            }
        });
        
        res.status(201).json({ message: 'Pagamento registado com sucesso e faturação atualizada.' });
    } catch (error) { handleFirestoreError(res, error, 'registar pagamento saas'); }
});


// ============================================================================
// 🏬 4. ADICIONAR FILIAL (COM TRAVA DE UPSELL E LIMITE DE PLANO)
// ============================================================================

router.post('/tenants/:companyId/branches', async (req, res) => {
    const { companyId } = req.params;
    const { name, urlId, address, phone } = req.body;
    const { db } = req;

    if (!name || !urlId) return res.status(400).json({ message: 'Nome e URL de login (slug) são obrigatórios.' });

    try {
        const slugCheck = await db.collection('establishments').where('urlId', '==', urlId).get();
        if (!slugCheck.empty) return res.status(409).json({ message: 'URL de Login já em uso por outra loja.' });

        await db.runTransaction(async (transaction) => {
            const companyDoc = await transaction.get(db.collection('companies').doc(companyId));
            if (!companyDoc.exists) throw new Error("Rede não encontrada.");
            
            const planDoc = await transaction.get(db.collection('saas_plans').doc(companyDoc.data().planId));
            if (!planDoc.exists) throw new Error("Plano do cliente inválido.");

            const maxEstablishments = planDoc.data().maxEstablishments || 1;

            const branchesQuery = await transaction.get(db.collection('establishments').where('companyId', '==', companyId));
            
            if (branchesQuery.size >= maxEstablishments) {
                throw new Error(`UPSELL_REQUIRED: O plano atual permite no máximo ${maxEstablishments} unidade(s). Realize um upgrade para adicionar mais filiais.`);
            }

            const newBranchRef = db.collection('establishments').doc();
            transaction.set(newBranchRef, {
                companyId: companyId,
                name: name,
                type: 'Filial',
                urlId: urlId,
                address: address || '',
                phone: phone || '',
                status: 'active',
                modules: defaultModules,
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            });

            const masterUsersSnapshot = await transaction.get(db.collection('users').where('companyId', '==', companyId).where('role', '==', 'company_admin'));
            masterUsersSnapshot.forEach(userDoc => {
                transaction.update(userDoc.ref, {
                    accessibleIn: admin.firestore.FieldValue.arrayUnion(newBranchRef.id)
                });
            });
        });

        res.status(201).json({ message: 'Nova unidade adicionada com sucesso à Rede!' });

    } catch (error) {
        if (error.message.includes('UPSELL_REQUIRED')) {
            const cleanMessage = error.message.replace('UPSELL_REQUIRED: ', '');
            return res.status(403).json({ message: cleanMessage, code: 'LIMIT_REACHED' });
        }
        handleFirestoreError(res, error, 'criação de filial');
    }
});


// ============================================================================
// 🕵️ 5. IMPERSONATION E OUTRAS ROTAS
// ============================================================================

router.post('/tenants/:companyId/impersonate', async (req, res) => {
    try {
        const { db, auth } = req;
        const { companyId } = req.params;

        const companyDoc = await db.collection('companies').doc(companyId).get();
        if (!companyDoc.exists || !companyDoc.data().ownerUid) return res.status(400).json({ message: 'Rede inválida ou dono não encontrado.' });

        const matrizSnap = await db.collection('establishments').where('companyId', '==', companyId).where('type', '==', 'Matriz').limit(1).get();
        const establishmentId = matrizSnap.empty ? companyId : matrizSnap.docs[0].id;

        const token = await auth.createCustomToken(companyDoc.data().ownerUid, { 
            role: 'company_admin', companyId, establishmentId, impersonated: true 
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