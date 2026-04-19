// routes/admin.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { AggregateField } = require('firebase-admin/firestore');

// 1. IMPORTAMOS OS MIDDLEWARES REAIS AQUI
const { verifyToken, isSuperAdmin } = require('../middlewares/auth');

// Lista de módulos padrão...
const defaultModules = {
    // ... (mantenha o seu código existente aqui) ...
};

const masterPermissions = {
    // ... (mantenha o seu código existente aqui) ...
};

// 2. SUBSTITUÍMOS O MIDDLEWARE FALSO PELOS MIDDLEWARES REAIS
// O verifyToken extrai o "req.user" do Token. O isSuperAdmin verifica a role.
router.use(verifyToken, isSuperAdmin);

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
    res.status(500).json({ message: error.message || `Erro ao processar ${context}.` });
}

const getSafeDate = (dateVal) => {
    if (!dateVal) return null;
    if (typeof dateVal.toDate === 'function') return dateVal.toDate();
    const d = new Date(dateVal);
    return isNaN(d.getTime()) ? null : d;
};

// =======================================================================
// ⚙️ CONFIGURAÇÕES DA PLATAFORMA E DASHBOARD (SAAS)
// =======================================================================

// Config da plataforma (Logo, etc)
router.get('/config', async (req, res) => {
    try {
        const doc = await req.db.collection('config').doc('plataforma').get();
        return res.status(200).json({ logoUrl: doc.exists ? doc.data().logoUrl : null });
    } catch (e) { res.status(500).json({ message: 'Erro config.' }); }
});

// Dashboard Analytics
router.get('/dashboard-stats', async (req, res) => {
    try {
        const { db } = req;
        const now = new Date();
        const thirtyDaysAgo = new Date(); thirtyDaysAgo.setDate(now.getDate() - 30);

        // 1. Buscar Planos para cálculo do MRR
        const plansSnapshot = await db.collection('saas_plans').get();
        const planPrices = {};
        plansSnapshot.forEach(d => planPrices[d.id] = d.data().price || 0);

        // 2. Executar Queries na coleção de Redes (Companies)
        const [totalAgg, activeAgg, cancelledAgg, activeCompaniesSnap, newCompaniesSnap] = await Promise.all([
            db.collection('companies').count().get(),
            db.collection('companies').where('status', '==', 'active').count().get(),
            db.collection('companies').where('status', 'in', ['deleted', 'inactive']).count().get(),
            db.collection('companies').where('status', '==', 'active').select('planId').get(),
            db.collection('companies').where('createdAt', '>=', admin.firestore.Timestamp.fromDate(thirtyDaysAgo)).select('createdAt').get()
        ]);

        const totalCompanies = totalAgg.data().count;
        const activeCount = activeAgg.data().count;
        const cancelledCount = cancelledAgg.data().count;

        // Cálculo MRR
        let mrr = 0;
        activeCompaniesSnap.forEach(doc => {
            const pid = doc.data().planId;
            if (pid && typeof planPrices[pid] === 'number') mrr += planPrices[pid];
        });

        // Gráfico Novos Clientes
        const newSubscribersLast30Days = Array(30).fill(0);
        newCompaniesSnap.forEach(doc => {
            const created = doc.data().createdAt.toDate();
            const daysAgo = Math.floor((now - created) / (1000 * 60 * 60 * 24));
            if (daysAgo >= 0 && daysAgo < 30) newSubscribersLast30Days[29 - daysAgo]++;
        });

        const churnRate = totalCompanies > 0 ? ((cancelledCount / totalCompanies) * 100).toFixed(1) : 0;

        res.status(200).json({
            kpis: { mrr, activeUsers: activeCount, newSubscribersData: newSubscribersLast30Days, churnRate, totalUsers: totalCompanies },
            attentionList: [] 
        });

    } catch (error) {
        handleFirestoreError(res, error, 'dashboard stats');
    }
});

// ============================================================================
// 📦 1. GESTÃO DE PLANOS SAAS
// ============================================================================

// Criar Plano
router.post('/plans', async (req, res) => {
    const { name, price, maxEstablishments, features } = req.body;

    if (!name || maxEstablishments === undefined) {
        return res.status(400).json({ message: 'Nome e Limite de Empresas (maxEstablishments) são obrigatórios.' });
    }

    try {
        const { db } = req;
        const planRef = await db.collection('saas_plans').add({
            name,
            price: Number(price) || 0,
            maxEstablishments: Number(maxEstablishments),
            features: features || [],
            active: true,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        res.status(201).json({ message: 'Plano criado com sucesso!', planId: planRef.id });
    } catch (error) {
        handleFirestoreError(res, error, 'criação de plano');
    }
});

// Listar Planos (Apenas os ativos)
router.get('/plans', async (req, res) => {
    try {
        const { db } = req;
        const snapshot = await db.collection('saas_plans').where('active', '==', true).get();
        const plans = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(plans);
    } catch (error) {
        handleFirestoreError(res, error, 'listagem de planos');
    }
});

// Atualizar Plano
router.put('/plans/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, maxEstablishments, features } = req.body;

    if (!name || maxEstablishments === undefined) {
        return res.status(400).json({ message: 'Nome e Limite de Empresas são obrigatórios.' });
    }

    try {
        const { db } = req;
        await db.collection('saas_plans').doc(id).update({
            name,
            price: Number(price) || 0,
            maxEstablishments: Number(maxEstablishments),
            features: features || [],
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        res.status(200).json({ message: 'Plano atualizado com sucesso!' });
    } catch (error) {
        handleFirestoreError(res, error, 'atualização de plano');
    }
});

// Excluir Plano (Soft Delete para não quebrar clientes antigos)
router.delete('/plans/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { db } = req;
        await db.collection('saas_plans').doc(id).update({ active: false });
        res.status(200).json({ message: 'Plano desativado com sucesso!' });
    } catch (error) {
        handleFirestoreError(res, error, 'exclusão de plano');
    }
});

// ============================================================================
// 🏢 2. WIZARD: CRIAÇÃO DO CLIENTE / REDE / TENANT ATÔMICO
// ============================================================================

router.post('/tenants', async (req, res) => {
    const { db, auth } = req;
    const { 
        companyName, documentInfo, 
        planId, 
        adminName, adminEmail, adminPassword, adminPhone 
    } = req.body;

    if (!companyName || !planId || !adminEmail || !adminPassword) {
        return res.status(400).json({ message: 'Dados incompletos para o Setup do Cliente.' });
    }

    try {
        const planDoc = await db.collection('saas_plans').doc(planId).get();
        if (!planDoc.exists) return res.status(400).json({ message: 'Plano selecionado não existe.' });

        const urlIdCandidate = companyName.toLowerCase().replace(/[^a-z0-9]/g, '');
        const slugCheck = await db.collection('establishments').where('urlId', '==', urlIdCandidate).get();
        const finalUrlId = slugCheck.empty ? urlIdCandidate : `${urlIdCandidate}-${Date.now().toString().slice(-4)}`;

        let userRecord;
        try {
            userRecord = await auth.createUser({
                email: adminEmail,
                password: adminPassword,
                displayName: adminName,
            });
        } catch (authError) {
            return res.status(400).json({ message: authError.code === 'auth/email-already-exists' ? 'O Email já está em uso.' : `Erro Auth: ${authError.message}` });
        }

        const companyRef = db.collection('companies').doc();
        const matrizRef = db.collection('establishments').doc();
        const userRef = db.collection('users').doc(userRecord.uid);

        await db.runTransaction(async (transaction) => {
            transaction.set(companyRef, {
                name: companyName,
                document: documentInfo || '',
                planId: planId,
                ownerUid: userRecord.uid,
                ownerEmail: adminEmail,
                status: 'active',
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            });

            transaction.set(matrizRef, {
                companyId: companyRef.id,
                name: `Matriz - ${companyName}`,
                type: 'Matriz',
                urlId: finalUrlId,
                status: 'active',
                modules: defaultModules,
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            });

            transaction.set(userRef, {
                email: adminEmail,
                name: adminName,
                phone: adminPhone || '',
                role: 'company_admin', 
                companyId: companyRef.id,
                establishmentId: matrizRef.id, 
                accessibleIn: [matrizRef.id], 
                permissions: masterPermissions,
                status: 'active',
                isOwnerMaster: true,
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            });
        });

        await auth.setCustomUserClaims(userRecord.uid, {
            companyId: companyRef.id,
            role: 'company_admin'
        });

        res.status(201).json({ 
            message: 'Ambiente do Cliente criado com sucesso!', 
            companyId: companyRef.id,
            loginUrlSlug: finalUrlId
        });

    } catch (error) {
        if (adminEmail) {
            try {
                const u = await admin.auth().getUserByEmail(adminEmail);
                if (u) await admin.auth().deleteUser(u.uid);
            } catch (e) {} 
        }
        handleFirestoreError(res, error, 'criação de tenant (Setup Wizard)');
    }
});

// ============================================================================
// 🏬 3. ADICIONAR FILIAL (COM TRAVA DE UPSELL E LIMITE DE PLANO)
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
// 👥 4. LISTAR INQUILINOS (COMPANIES / REDES)
// ============================================================================

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
        const totalPages = Math.ceil(total / limit);
        const paginatedData = companies.slice((page - 1) * limit, page * limit);

        res.status(200).json({ data: paginatedData, pagination: { total, page, limit, totalPages } });
    } catch (error) {
        handleFirestoreError(res, error, 'listar inquilinos');
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
        
        res.status(200).json({ message: `Status da rede alterado para ${status}.` });
    } catch (error) { handleFirestoreError(res, error, 'alterar status da rede'); }
});


// ============================================================================
// 🕵️ 5. IMPERSONATION (ENTRAR COMO O CLIENTE)
// ============================================================================

router.post('/tenants/:companyId/impersonate', async (req, res) => {
    try {
        const { db, auth } = req;
        const { companyId } = req.params;

        const companyDoc = await db.collection('companies').doc(companyId).get();
        if (!companyDoc.exists || !companyDoc.data().ownerUid) {
            return res.status(400).json({ message: 'Rede inválida ou dono não encontrado.' });
        }

        const matrizSnap = await db.collection('establishments').where('companyId', '==', companyId).where('type', '==', 'Matriz').limit(1).get();
        const establishmentId = matrizSnap.empty ? companyId : matrizSnap.docs[0].id;

        const token = await auth.createCustomToken(companyDoc.data().ownerUid, { 
            role: 'company_admin', 
            companyId: companyId,
            establishmentId: establishmentId, 
            impersonated: true 
        });
        
        res.status(200).json({ token });
    } catch (e) { handleFirestoreError(res, e, 'impersonate company'); }
});

// ============================================================================
// 🔐 6. GESTÃO DE USUÁRIOS SUPER ADMIN (Acesso Interno Kairos)
// ============================================================================

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
        const admins = list.users.filter(u => u.customClaims?.role === 'super-admin').map(u => ({ uid: u.uid, email: u.email, role: 'super-admin' }));
        res.status(200).json(admins);
    } catch (error) { res.status(500).json({ message: 'Erro listar admins.' }); }
});

router.delete('/users/:uid', async (req, res) => {
    if (req.params.uid === req.user.uid) return res.status(403).json({ message: 'Não pode se apagar.' });
    try { await req.auth.deleteUser(req.params.uid); res.status(200).json({ message: 'Admin Apagado.' }); }
    catch (e) { res.status(500).json({ message: 'Erro ao apagar admin.' }); }
});

module.exports = router;