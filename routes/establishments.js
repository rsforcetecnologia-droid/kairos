// routes/establishments.js (Arquitetura Multi-Tenant Enterprise 3 Níveis)

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, isOwner } = require('../middlewares/auth');

function handleFirestoreError(res, error, context) {
    console.error(`----------- ERRO NO BACKEND (${context}) -----------`);
    console.error(error);
    return res.status(500).json({ message: `Ocorreu um erro no servidor ao processar ${context}.` });
}

router.use(verifyToken);

// =======================================================================
// 🏢 1. GESTÃO DE GRUPOS ECONÓMICOS (Nível 1)
// =======================================================================
router.post('/groups', isOwner, async (req, res) => {
    const { name } = req.body;
    const { uid } = req.user;

    if (!name) return res.status(400).json({ message: 'O nome do grupo é obrigatório.' });

    try {
        const { db } = req;
        const newGroupRef = db.collection('economicGroups').doc();
        
        await newGroupRef.set({
            id: newGroupRef.id,
            name,
            ownerId: uid,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            status: 'active'
        });

        // UPDATE: Transforma o dono atual num Administrador de Grupo
        await db.collection('users').doc(uid).update({
            role: 'group_admin',
            groupId: newGroupRef.id
        }).catch(err => console.error("Aviso: Erro ao dar permissão de group_admin", err));

        res.status(201).json({ message: 'Grupo Económico criado com sucesso!', groupId: newGroupRef.id });
    } catch (error) {
        handleFirestoreError(res, error, 'criar grupo');
    }
});

// =======================================================================
// 🏬 2. GESTÃO DE EMPRESAS/MATRIZES (Nível 2)
// =======================================================================
router.post('/companies', isOwner, async (req, res) => {
    const { name, cnpj, groupId } = req.body;

    if (!name || !groupId) return res.status(400).json({ message: 'Nome e Grupo são obrigatórios.' });

    try {
        const { db } = req;
        const newCompanyRef = db.collection('companies').doc();
        
        await newCompanyRef.set({
            id: newCompanyRef.id,
            groupId,
            name,
            cnpj: cnpj || null,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            status: 'active'
        });

        res.status(201).json({ message: 'Empresa criada com sucesso!', companyId: newCompanyRef.id });
    } catch (error) {
        handleFirestoreError(res, error, 'criar empresa');
    }
});

// =======================================================================
// 📍 3. GESTÃO DE ESTABELECIMENTOS/FILIAIS (Nível 3)
// =======================================================================

// 3.1. Criar Nova Filial
router.post('/', isOwner, async (req, res) => {
    const { name, companyId, groupId, phone, address, timezone } = req.body;
    const { uid } = req.user;

    if (!name || !companyId || !groupId) {
        return res.status(400).json({ message: 'Nome, Empresa e Grupo são obrigatórios.' });
    }

    try {
        const { db } = req;
        const newBranchRef = db.collection('establishments').doc();
        
        const branchData = {
            id: newBranchRef.id,
            groupId,
            companyId,
            name,
            phone: phone || null,
            address: address || null,
            type: 'branch',
            timezone: timezone || 'America/Sao_Paulo',
            ownerId: uid,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            status: 'active',
            modules: {
                'agenda-section': true, 'comandas-section': true,
                'financial-section': true, 'reports-section': true
            },
            loyaltyProgram: { enabled: false, pointsPerVisit: 1, tiers: [] },
            financialIntegration: { defaultNaturezaId: null, defaultCentroDeCustoId: null }
        };

        await db.runTransaction(async (transaction) => {
            transaction.set(newBranchRef, branchData);
            const userRef = db.collection('users').doc(uid);
            const userDoc = await transaction.get(userRef);
            
            if (userDoc.exists) {
                const userData = userDoc.data();
                const currentAccessible = userData.accessibleEstablishments || [];
                currentAccessible.push({ id: newBranchRef.id, companyId: companyId, name: name });
                transaction.update(userRef, { accessibleEstablishments: currentAccessible });
            }
        });

        res.status(201).json({ message: 'Filial criada com sucesso!', branchId: newBranchRef.id });
    } catch (error) {
        handleFirestoreError(res, error, 'criar filial');
    }
});

// 3.2. Listar Estrutura Completa (Grupos > Empresas > Filiais)
router.get('/hierarchy', async (req, res) => {
    const { uid } = req.user;
    const { db } = req;

    try {
        let responsePayload = { group: null, companies: [], branches: [] };

        // Busca dados atualizados do user direto no Firestore para evitar delay de Token
        const userDoc = await db.collection('users').doc(uid).get();
        const userData = userDoc.exists ? userDoc.data() : {};

        let activeGroupId = userData.groupId || null;

        // Se ele não tem groupId no cadastro de usuário, mas é o criador de algum grupo, acha esse grupo
        if (!activeGroupId) {
            const myGroups = await db.collection('economicGroups').where('ownerId', '==', uid).limit(1).get();
            if (!myGroups.empty) {
                activeGroupId = myGroups.docs[0].id;
                responsePayload.group = myGroups.docs[0].data();
            }
        } else {
            const groupDoc = await db.collection('economicGroups').doc(activeGroupId).get();
            responsePayload.group = groupDoc.exists ? groupDoc.data() : null;
        }

        // Se encontrou o grupo, carrega toda a árvore abaixo dele
        if (activeGroupId) {
            const companiesSnap = await db.collection('companies').where('groupId', '==', activeGroupId).get();
            responsePayload.companies = companiesSnap.docs.map(d => d.data());

            const branchesSnap = await db.collection('establishments').where('groupId', '==', activeGroupId).get();
            responsePayload.branches = branchesSnap.docs.map(d => d.data());
        } 
        // Se for um funcionário restrito sem acesso ao grupo
        else {
            responsePayload.companies = userData.accessibleCompanies || [];
            responsePayload.branches = userData.accessibleEstablishments || [];
        }

        res.status(200).json(responsePayload);
    } catch (error) {
        handleFirestoreError(res, error, 'listar hierarquia');
    }
});

// 3.3. Atualizar Dados de uma Filial
router.put('/:branchId', isOwner, async (req, res) => {
    const { branchId } = req.params;
    const updateData = req.body;
    delete updateData.id; delete updateData.groupId; delete updateData.companyId;

    try {
        const { db } = req;
        const branchRef = db.collection('establishments').doc(branchId);
        await branchRef.update({ ...updateData, updatedAt: admin.firestore.FieldValue.serverTimestamp() });
        res.status(200).json({ message: 'Filial atualizada com sucesso.' });
    } catch (error) {
        handleFirestoreError(res, error, 'atualizar filial');
    }
});

// 3.4. Obter Detalhes de uma Filial Específica
router.get('/:branchId', async (req, res) => {
    const { branchId } = req.params;
    try {
        const { db } = req;
        const branchDoc = await db.collection('establishments').doc(branchId).get();
        if (!branchDoc.exists) return res.status(404).json({ message: 'Estabelecimento não encontrado.' });
        res.status(200).json(branchDoc.data());
    } catch (error) {
        handleFirestoreError(res, error, 'obter detalhes da filial');
    }
});

module.exports = router;