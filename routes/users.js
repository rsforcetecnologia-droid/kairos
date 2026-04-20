// routes/users.js (Corrigido para exibir o Dono/Master)

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, isOwner } = require('../middlewares/auth');

// --- Função Auxiliar ---
function handleFirestoreError(res, error, context) {
    console.error(`----------- ERRO NO BACKEND (${context}) -----------`);
    console.error(error);
    return res.status(500).json({ message: error.message || `Ocorreu um erro no servidor ao processar ${context}.` });
}

// Todas as rotas de utilizadores exigem que o utilizador seja Dono (ou Administrador na nova hierarquia)
router.use(verifyToken, isOwner);

// =======================================================================
// 👤 1. CRIAR NOVO UTILIZADOR
// =======================================================================
router.post('/', async (req, res) => {
    const { email, password, name, permissions, professionalId, role, accessibleCompanies, accessibleEstablishments } = req.body;
    
    const creatorUser = req.user; 
    const { db, auth } = req;

    if (!email || !password || !name || !permissions) {
        return res.status(400).json({ message: 'Email, senha, nome e permissões são obrigatórios.' });
    }

    try {
        const primaryEstablishmentId = creatorUser.establishmentId;
        const companyId = creatorUser.companyId || null;

        // --- 1. VALIDAÇÃO DE PLANO (DENTRO DA TRANSAÇÃO) ---
        const establishmentRef = db.collection('establishments').doc(primaryEstablishmentId);
        
        await db.runTransaction(async (transaction) => {
            const establishmentDoc = await transaction.get(establishmentRef);
            if (!establishmentDoc.exists) throw new Error('Estabelecimento base não encontrado.');

            const subscription = establishmentDoc.data().subscription || {};
            const planId = subscription.planId || establishmentDoc.data().planId;
            
            if (!planId) {
                throw new Error('Nenhum plano de assinatura ativo encontrado.');
            }

            let planDoc;
            if (planId === 'admin_manual' || planId === 'trial') {
                planDoc = { exists: true, data: () => ({ maxUsers: 999 }) }; // Sem limite
            } else {
                // Busca no banco correto
                planDoc = await transaction.get(db.collection('saas_plans').doc(planId));
            }
            
            if (!planDoc.exists) throw new Error('Plano de assinatura não encontrado ou inválido.');

            const maxUsers = planDoc.data().maxUsers || 999; 

            // Valida limite de utilizadores
            const usersRef = db.collection('users')
                .where('establishmentId', '==', primaryEstablishmentId)
                .where('status', '!=', 'inactive');
                
            const currentActiveUsersSnapshot = await transaction.get(usersRef);

            if (currentActiveUsersSnapshot.size + 1 >= maxUsers) {
                throw new Error('Limite de usuários ativos atingido para o seu plano.');
            }
        });
        
        // --- 2. CRIAÇÃO NO FIREBASE AUTH ---
        let userRecord;
        try {
            userRecord = await auth.createUser({ email, password, displayName: name });
        } catch (authError) {
             if (authError.code === 'auth/email-already-exists') {
                 throw new Error('Este e-mail já está em uso. Se for um utilizador inativo, exclua-o primeiro ou edite-o.');
             }
             throw authError;
        }

        // --- 3. DEFINIR NÍVEL DE SEGURANÇA (CUSTOM CLAIMS) ---
        const userRole = role || 'employee';
        await auth.setCustomUserClaims(userRecord.uid, {
            role: userRole,
            establishmentId: primaryEstablishmentId,
            companyId: companyId
        });

        // --- 4. GRAVAR DADOS NO FIRESTORE ---
        const newUserRef = db.collection('users').doc(userRecord.uid);
        await newUserRef.set({
            name, 
            email, 
            permissions,
            role: userRole,
            professionalId: professionalId || null,
            status: 'active',
            establishmentId: primaryEstablishmentId, 
            companyId: companyId,
            accessibleCompanies: accessibleCompanies || [],
            accessibleEstablishments: accessibleEstablishments || [],
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        res.status(201).json({ message: 'Usuário criado com sucesso!', uid: userRecord.uid });

    } catch (error) {
        handleFirestoreError(res, error, 'criar usuário');
    }
});

// =======================================================================
// 👥 2. LISTAR UTILIZADORES (Corrigido para exibir o Dono/Master)
// =======================================================================
router.get('/:contextId', async (req, res) => {
    const { contextId } = req.params;
    const { contextType = 'BRANCH' } = req.query; 
    const { db } = req;

    try {
        // 🔄 CORREÇÃO: Buscamos diretamente por EstablishmentId ou CompanyId em vez de GroupId
        const snapshotEst = await db.collection('users').where('establishmentId', '==', contextId).get();
        const snapshotComp = await db.collection('users').where('companyId', '==', contextId).get();

        let usersMap = new Map();
        
        snapshotEst.docs.forEach(doc => usersMap.set(doc.id, { id: doc.id, ...doc.data() }));
        snapshotComp.docs.forEach(doc => usersMap.set(doc.id, { id: doc.id, ...doc.data() }));

        let usersList = Array.from(usersMap.values());

        // Filtro adicional
        if (contextType === 'COMPANY') {
            usersList = usersList.filter(u => 
                u.companyId === contextId ||
                u.establishmentId === contextId ||
                u.accessibleCompanies?.some(c => c.id === contextId) || 
                u.accessibleEstablishments?.some(e => e.companyId === contextId)
            );
        } else if (contextType === 'BRANCH') {
            usersList = usersList.filter(u => 
                u.establishmentId === contextId || 
                u.companyId === contextId ||
                u.accessibleEstablishments?.some(e => e.id === contextId)
            );
        }

        res.status(200).json(usersList);
    } catch (error) {
        handleFirestoreError(res, error, 'listar usuários');
    }
});

// =======================================================================
// 🔄 3. ATIVAR/INATIVAR UTILIZADOR
// =======================================================================
router.patch('/:userId/status', async (req, res) => {
    const { userId } = req.params;
    const { status } = req.body;
    const { companyId, establishmentId } = req.user;

    if (!status || (status !== 'active' && status !== 'inactive')) {
        return res.status(400).json({ message: "O status deve ser 'active' ou 'inactive'." });
    }

    try {
        const { db, auth } = req;
        const userRef = db.collection('users').doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) return res.status(404).json({ message: "Usuário não encontrado." });
        
        const targetData = userDoc.data();
        const canEdit = targetData.establishmentId === establishmentId || (companyId && targetData.companyId === companyId);
        
        if (!canEdit) {
            return res.status(403).json({ message: "Acesso negado. Este usuário pertence a outra rede." });
        }

        const shouldBeDisabled = status === 'inactive';
        await auth.updateUser(userId, { disabled: shouldBeDisabled });
        await userRef.update({ status: status });

        res.status(200).json({ message: `Usuário ${status === 'active' ? 'ativado' : 'inativado'} com sucesso.` });
    } catch (error) {
        handleFirestoreError(res, error, 'atualizar status de usuário');
    }
});

// =======================================================================
// ✏️ 4. ATUALIZAR DADOS DO UTILIZADOR
// =======================================================================
router.put('/:userId', async (req, res) => {
    const { userId } = req.params;
    const { name, permissions, professionalId, email, role, accessibleCompanies, accessibleEstablishments } = req.body; 
    
    if (!name || !permissions) {
        return res.status(400).json({ message: 'Nome e permissões são obrigatórios.' });
    }
    
    try {
        const { db, auth } = req;

        const authUpdatePayload = { displayName: name };
        if (email) authUpdatePayload.email = email;
        await auth.updateUser(userId, authUpdatePayload);
        
        if (role) {
            const userRec = await auth.getUser(userId);
            const currentClaims = userRec.customClaims || {};
            await auth.setCustomUserClaims(userId, {
                ...currentClaims,
                role: role
            });
        }

        const updateData = { name, permissions };
        if (professionalId !== undefined) updateData.professionalId = professionalId || null;
        if (email) updateData.email = email;
        if (role) updateData.role = role;
        if (accessibleCompanies) updateData.accessibleCompanies = accessibleCompanies;
        if (accessibleEstablishments) updateData.accessibleEstablishments = accessibleEstablishments;

        await db.collection('users').doc(userId).update(updateData);
        
        res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
    
    } catch (error) {
        if (error.code === 'auth/email-already-exists') {
            return res.status(409).json({ message: 'Este e-mail já está em uso por outra conta.' });
        }
        handleFirestoreError(res, error, 'atualizar usuário');
    }
});

// =======================================================================
// 🔑 5. ATUALIZAR SENHA
// =======================================================================
router.put('/:userId/password', async (req, res) => {
    const { userId } = req.params;
    const { password } = req.body;
    const { companyId, establishmentId } = req.user;

    if (!password || password.length < 6) {
        return res.status(400).json({ message: 'A nova senha é obrigatória e deve ter pelo menos 6 caracteres.' });
    }

    try {
        const { auth, db } = req;
        const userRef = db.collection('users').doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) return res.status(404).json({ message: "Usuário não encontrado." });
        
        const targetData = userDoc.data();
        const canEdit = targetData.establishmentId === establishmentId || (companyId && targetData.companyId === companyId);
        
        if (!canEdit) {
             return res.status(403).json({ message: 'Acesso negado. Você não pode alterar usuários de outra rede.' });
        }

        await auth.updateUser(userId, { password: password });
        res.status(200).json({ message: 'Senha do usuário atualizada com sucesso.' });
    } catch (error) {
        handleFirestoreError(res, error, 'atualizar senha do usuário');
    }
});

// =======================================================================
// 🗑️ 6. EXCLUIR UTILIZADOR
// =======================================================================
router.delete('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const { db, auth } = req;
        await auth.deleteUser(userId);
        await db.collection('users').doc(userId).delete();
        res.status(200).json({ message: 'Usuário excluído com sucesso.' });
    } catch (error) {
        handleFirestoreError(res, error, 'excluir usuário');
    }
});

module.exports = router;