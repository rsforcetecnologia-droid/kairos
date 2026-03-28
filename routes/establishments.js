// routes/establishments.js (Arquitetura Multi-Tenant Matriz/Filial)

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
// 🏢 1. GESTÃO DE ESTABELECIMENTOS (Matriz e Filiais)
// =======================================================================

// 1.1. Criar Novo Estabelecimento (Matriz ou Filial)
router.post('/', isOwner, async (req, res) => {
    // parentId: Se null, será uma Matriz. Se preenchido com ID de outra empresa, será Filial.
    const { name, cnpj, phone, address, timezone, parentId } = req.body;
    const { uid } = req.user;

    if (!name) {
        return res.status(400).json({ message: 'O nome do estabelecimento é obrigatório.' });
    }

    try {
        const { db } = req;
        const newEstablishmentRef = db.collection('establishments').doc();
        
        // Regra de Negócio: Se não tem vínculo, nasce como Matriz.
        const isMatriz = !parentId; 

        const establishmentData = {
            id: newEstablishmentRef.id,
            parentId: parentId || null,
            isMatriz: isMatriz,
            name,
            cnpj: cnpj || null,
            phone: phone || null,
            address: address || null,
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
            const userRef = db.collection('users').doc(uid);
            
            // --- 1º PASSO: LEITURAS (Reads) ---
            const userDoc = await transaction.get(userRef);
            
            let parentDoc = null;
            if (parentId) {
                const parentRef = db.collection('establishments').doc(parentId);
                parentDoc = await transaction.get(parentRef);
                if (!parentDoc.exists) {
                    throw new Error("MATRIZ_NOT_FOUND");
                }
            }
            
            // --- 2º PASSO: ESCRITAS (Writes) ---
            transaction.set(newEstablishmentRef, establishmentData);
            
            // Se foi vinculada a uma matriz, garantimos que o cadastro da matriz exiba visualmente que ela é Matriz
            if (parentId && parentDoc && parentDoc.exists) {
                transaction.update(parentDoc.ref, { isMatriz: true });
            }
            
            if (userDoc.exists) {
                const userData = userDoc.data();
                const currentAccessible = userData.accessibleEstablishments || [];
                
                currentAccessible.push({ 
                    id: newEstablishmentRef.id, 
                    parentId: parentId || null, 
                    name: name 
                });
                
                let updates = { accessibleEstablishments: currentAccessible };
                
                // Opcional: Promover usuário a Owner se ele criou sua primeira empresa independente
                if (isMatriz && userData.role !== 'admin' && userData.role !== 'owner') {
                    updates.role = 'owner'; 
                }
                
                transaction.update(userRef, updates);
            }
        });

        res.status(201).json({ 
            message: isMatriz ? 'Matriz criada com sucesso!' : 'Filial criada com sucesso!', 
            establishmentId: newEstablishmentRef.id,
            isMatriz
        });

    } catch (error) {
        if (error.message === "MATRIZ_NOT_FOUND") {
            return res.status(404).json({ message: 'A Matriz especificada para vínculo não foi encontrada.' });
        }
        handleFirestoreError(res, error, 'criar estabelecimento');
    }
});

// 1.2. Listar Estrutura Completa (Matrizes e suas respectivas Filiais)
router.get('/hierarchy', async (req, res) => {
    const { uid } = req.user;
    const { db } = req;

    try {
        const userDoc = await db.collection('users').doc(uid).get();
        const userData = userDoc.exists ? userDoc.data() : {};

        let allEstablishments = [];

        // Se for dono/admin total, enxerga tudo que for dele
        if (userData.role === 'owner' || userData.role === 'admin') {
            const snap = await db.collection('establishments').where('ownerId', '==', uid).get();
            allEstablishments = snap.docs.map(d => d.data());
        } 
        // Se for um funcionário/gerente comum, enxerga apenas o que está liberado para ele
        else {
            const accessibleIds = (userData.accessibleEstablishments || []).map(est => est.id);
            
            if (accessibleIds.length > 0) {
                // Firestore 'in' aceita arrays de até 10 itens, então fatiamos em lotes de 10
                for (let i = 0; i < accessibleIds.length; i += 10) {
                    const chunk = accessibleIds.slice(i, i + 10);
                    const snap = await db.collection('establishments').where('id', 'in', chunk).get();
                    allEstablishments.push(...snap.docs.map(d => d.data()));
                }
            }
        }

        // Montando a Lista de Adjacência
        const hierarchy = [];
        const filiais = [];

        // 1. Separa quem é raiz (sem parentId) de quem é galho (com parentId)
        allEstablishments.forEach(est => {
            if (!est.parentId) {
                hierarchy.push({ ...est, branches: [] });
            } else {
                filiais.push(est);
            }
        });

        // 2. Coloca as filiais dentro de suas respectivas Matrizes
        filiais.forEach(filial => {
            const matriz = hierarchy.find(m => m.id === filial.parentId);
            if (matriz) {
                matriz.branches.push(filial);
            } else {
                // Caso de borda: Se o usuário logado só tiver acesso de leitura na filial 
                // e não na Matriz, a filial é retornada na raiz para ele conseguir acessar
                hierarchy.push({ ...filial, branches: [], isOrphanBranch: true });
            }
        });

        res.status(200).json({ matrizes: hierarchy });
    } catch (error) {
        handleFirestoreError(res, error, 'listar hierarquia');
    }
});

// 1.3. Atualizar Dados de um Estabelecimento
router.put('/:id', isOwner, async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    
    // Trava para evitar que o frontend modifique campos cruciais por engano
    delete updateData.id; 
    delete updateData.ownerId;
    delete updateData.createdAt;

    try {
        const { db } = req;
        const ref = db.collection('establishments').doc(id);
        
        await ref.update({ 
            ...updateData, 
            updatedAt: admin.firestore.FieldValue.serverTimestamp() 
        });
        
        res.status(200).json({ message: 'Estabelecimento atualizado com sucesso.' });
    } catch (error) {
        handleFirestoreError(res, error, 'atualizar estabelecimento');
    }
});

// 1.4. Obter Detalhes de um Estabelecimento Específico
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { db } = req;
        const doc = await db.collection('establishments').doc(id).get();
        
        if (!doc.exists) return res.status(404).json({ message: 'Estabelecimento não encontrado.' });
        
        res.status(200).json(doc.data());
    } catch (error) {
        handleFirestoreError(res, error, 'obter detalhes do estabelecimento');
    }
});

module.exports = router;