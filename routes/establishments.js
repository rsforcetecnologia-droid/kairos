// routes/establishments.js (Arquitetura Multi-Tenant Enterprise 3 Níveis)

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, isOwner } = require('../middlewares/auth');

// --- FUNÇÃO AUXILIAR DE ERRO ---
function handleFirestoreError(res, error, context) {
    console.error(`----------- ERRO NO BACKEND (${context}) -----------`);
    console.error(error);
    return res.status(500).json({ message: `Ocorreu um erro no servidor ao processar ${context}.` });
}

// Segurança: Quase todas as rotas de criação/edição de estrutura exigem token
router.use(verifyToken);

// =======================================================================
// 🏢 1. GESTÃO DE GRUPOS ECONÓMICOS (Nível 1 - Holding)
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

        res.status(201).json({ message: 'Grupo Económico criado com sucesso!', groupId: newGroupRef.id });
    } catch (error) {
        handleFirestoreError(res, error, 'criar grupo');
    }
});

// =======================================================================
// 🏬 2. GESTÃO DE EMPRESAS/MATRIZES (Nível 2 - CNPJ)
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

// 3.1. Criar Nova Filial (Agora exige CompanyId e GroupId)
router.post('/', isOwner, async (req, res) => {
    const { name, companyId, groupId, phone, address, timezone } = req.body;
    const { uid } = req.user;

    if (!name || !companyId || !groupId) {
        return res.status(400).json({ message: 'Nome, Empresa e Grupo são obrigatórios para criar uma filial.' });
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
            type: 'branch', // filial
            timezone: timezone || 'America/Sao_Paulo',
            ownerId: uid,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            status: 'active',
            // Módulos base ativados por defeito
            modules: {
                'agenda-section': true,
                'comandas-section': true,
                'financial-section': true,
                'reports-section': true
            },
            loyaltyProgram: { enabled: false, pointsPerVisit: 1, tiers: [] },
            financialIntegration: { defaultNaturezaId: null, defaultCentroDeCustoId: null }
        };

        // Usa uma transação para criar a filial e adicionar o utilizador como branch_manager se ele não for group_admin
        await db.runTransaction(async (transaction) => {
            transaction.set(newBranchRef, branchData);
            
            // Atualiza os acessos do utilizador dono (Admin)
            const userRef = db.collection('users').doc(uid);
            const userDoc = await transaction.get(userRef);
            
            if (userDoc.exists) {
                const userData = userDoc.data();
                const currentAccessible = userData.accessibleEstablishments || [];
                
                // Adiciona a nova filial ao array de acessos do dono
                currentAccessible.push({
                    id: newBranchRef.id,
                    companyId: companyId,
                    name: name
                });

                transaction.update(userRef, { 
                    accessibleEstablishments: currentAccessible 
                });
            }
        });

        res.status(201).json({ message: 'Filial criada com sucesso!', branchId: newBranchRef.id });
    } catch (error) {
        handleFirestoreError(res, error, 'criar filial');
    }
});

// 3.2. Listar Estrutura Completa (Grupos > Empresas > Filiais) para o Dono
router.get('/hierarchy', async (req, res) => {
    const { uid, role, groupId } = req.user;
    const { db } = req;

    try {
        let responsePayload = {
            group: null,
            companies: [],
            branches: []
        };

        // Se for um Dono Geral, carrega a árvore toda a partir do GroupID dele
        if (role === 'group_admin' && groupId) {
            const groupDoc = await db.collection('economicGroups').doc(groupId).get();
            responsePayload.group = groupDoc.exists ? groupDoc.data() : null;

            const companiesSnap = await db.collection('companies').where('groupId', '==', groupId).get();
            responsePayload.companies = companiesSnap.docs.map(d => d.data());

            const branchesSnap = await db.collection('establishments').where('groupId', '==', groupId).get();
            responsePayload.branches = branchesSnap.docs.map(d => d.data());
        } 
        // Se for um utilizador com acessos restritos, devolve apenas o que está no array dele
        else {
            const userDoc = await db.collection('users').doc(uid).get();
            const userData = userDoc.data();

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

    // Impedir que o utilizador mude IDs de hierarquia por aqui para evitar quebrar a árvore
    delete updateData.id;
    delete updateData.groupId;
    delete updateData.companyId;

    try {
        const { db } = req;
        const branchRef = db.collection('establishments').doc(branchId);
        
        await branchRef.update({
            ...updateData,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        res.status(200).json({ message: 'Filial atualizada com sucesso.' });
    } catch (error) {
        handleFirestoreError(res, error, 'atualizar filial');
    }
});

module.exports = router;