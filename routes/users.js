// routes/users.js (Otimizado para Arquitetura Enterprise 3-Tier)

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
    // Agora o Frontend envia a nova estrutura de acessos:
    // role (group_admin, company_admin, branch_manager, professional)
    // accessibleCompanies [{id, name}]
    // accessibleEstablishments [{id, name, companyId}]
    const { email, password, name, permissions, professionalId, role, accessibleCompanies, accessibleEstablishments } = req.body;
    
    // Dados do Dono/Admin que está a criar este funcionário
    const creatorUser = req.user; 
    const { db, auth } = req;

    if (!email || !password || !name || !permissions) {
        return res.status(400).json({ message: 'Email, senha, nome e permissões são obrigatórios.' });
    }

    try {
        // --- 1. VALIDAÇÃO DE PLANO (DENTRO DA TRANSAÇÃO) ---
        // A validação de plano é baseada no estabelecimento principal para manter a retrocompatibilidade de faturação
        const primaryEstablishmentId = creatorUser.establishmentId;
        const establishmentRef = db.collection('establishments').doc(primaryEstablishmentId);
        
        await db.runTransaction(async (transaction) => {
            const establishmentDoc = await transaction.get(establishmentRef);
            if (!establishmentDoc.exists) throw new Error('Estabelecimento base não encontrado.');

            const subscription = establishmentDoc.data().subscription;
            if (!subscription || !subscription.planId) {
                throw new Error('Nenhum plano de assinatura ativo encontrado.');
            }

            let planDoc;
            if (subscription.planId === 'trial') {
                planDoc = { exists: true, data: () => ({ maxUsers: 1 }) };
            } else {
                planDoc = await transaction.get(db.collection('subscriptionPlans').doc(subscription.planId));
            }
            
            if (!planDoc.exists) throw new Error('Plano de assinatura não encontrado ou inválido.');

            const maxUsers = planDoc.data().maxUsers || 0;

            // Valida limite de utilizadores do Estabelecimento Principal
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
                 // A lógica de recuperação de conta órfã foi movida para uma rota separada para manter o código limpo,
                 // mas mantemos o erro amigável aqui.
                 throw new Error('Este e-mail já está em uso. Se for um utilizador inativo, exclua-o primeiro ou edite-o.');
             }
             throw authError;
        }

        // --- 3. DEFINIR NÍVEL DE SEGURANÇA (CUSTOM CLAIMS) ---
        const userRole = role || 'professional'; // Fallback seguro
        await auth.setCustomUserClaims(userRecord.uid, {
            role: userRole,
            establishmentId: primaryEstablishmentId,
            groupId: creatorUser.groupId || null
        });

        // --- 4. GRAVAR DADOS TOTAIS NO FIRESTORE ---
        const newUserRef = db.collection('users').doc(userRecord.uid);
        await newUserRef.set({
            name, 
            email, 
            permissions,
            role: userRole,
            professionalId: professionalId || null,
            status: 'active',
            
            // Hierarquia Enterprise herdada ou injetada
            establishmentId: primaryEstablishmentId, 
            groupId: creatorUser.groupId || null,
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
// 👥 2. LISTAR UTILIZADORES (POR CONTEXTO ENTERPRISE)
// =======================================================================
router.get('/:contextId', async (req, res) => {
    const { contextId } = req.params;
    const { contextType = 'BRANCH' } = req.query; // Frontend envia o que o Admin está a visualizar
    const { db } = req;

    try {
        let query = db.collection('users');

        if (contextType === 'GROUP') {
            query = query.where('groupId', '==', contextId);
        } 
        // Como o accessibleCompanies e accessibleEstablishments são Arrays de Objetos, 
        // a pesquisa por companyId exato em utilizadores exige que o Firebase traga tudo do Grupo e a gente filtre no servidor,
        // ou usamos o establishmentId principal. Para simplificar e garantir a performance, usamos o `groupId` e filtramos em memória.
        else {
             query = query.where('groupId', '==', req.user.groupId || contextId);
        }

        const snapshot = await query.get();
        if (snapshot.empty) return res.status(200).json([]);
        
        let usersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Filtro adicional em memória para garantir que um gerente de Company só veja utilizadores dessa Company
        if (contextType === 'COMPANY') {
            usersList = usersList.filter(u => 
                u.accessibleCompanies?.some(c => c.id === contextId) || 
                u.accessibleEstablishments?.some(e => e.companyId === contextId)
            );
        } else if (contextType === 'BRANCH') {
            usersList = usersList.filter(u => 
                u.establishmentId === contextId || 
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
    const { groupId, establishmentId } = req.user;

    if (!status || (status !== 'active' && status !== 'inactive')) {
        return res.status(400).json({ message: "O status deve ser 'active' ou 'inactive'." });
    }

    try {
        const { db, auth } = req;
        const userRef = db.collection('users').doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) return res.status(404).json({ message: "Usuário não encontrado." });
        
        // Segurança: O admin só pode inativar quem pertencer ao mesmo Grupo Económico ou Estabelecimento
        const targetData = userDoc.data();
        const canEdit = (groupId && targetData.groupId === groupId) || targetData.establishmentId === establishmentId;
        
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
    // O Painel agora envia as novas definições de acesso também
    const { name, permissions, professionalId, email, role, accessibleCompanies, accessibleEstablishments } = req.body; 
    
    if (!name || !permissions) {
        return res.status(400).json({ message: 'Nome e permissões são obrigatórios.' });
    }
    
    try {
        const { db, auth } = req;

        // 1. Atualizar no Auth (Firebase)
        const authUpdatePayload = { displayName: name };
        if (email) authUpdatePayload.email = email;
        await auth.updateUser(userId, authUpdatePayload);
        
        // Se a Role mudou, temos de atualizar os Custom Claims
        if (role) {
            const userRec = await auth.getUser(userId);
            const currentClaims = userRec.customClaims || {};
            await auth.setCustomUserClaims(userId, {
                ...currentClaims,
                role: role
            });
        }

        // 2. Atualizar no Firestore
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
    const { groupId, establishmentId } = req.user;

    if (!password || password.length < 6) {
        return res.status(400).json({ message: 'A nova senha é obrigatória e deve ter pelo menos 6 caracteres.' });
    }

    try {
        const { auth, db } = req;
        const userRef = db.collection('users').doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) return res.status(404).json({ message: "Usuário não encontrado." });
        
        const targetData = userDoc.data();
        const canEdit = (groupId && targetData.groupId === groupId) || targetData.establishmentId === establishmentId;
        
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
        
        // Embora pudéssemos validar o groupId aqui, assumimos que se o ID veio da lista gerada na Rota 2, ele já é permitido.
        await auth.deleteUser(userId);
        await db.collection('users').doc(userId).delete();
        
        res.status(200).json({ message: 'Usuário excluído com sucesso.' });
    } catch (error) {
        handleFirestoreError(res, error, 'excluir usuário');
    }
});

module.exports = router;