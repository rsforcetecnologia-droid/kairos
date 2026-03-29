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

// =======================================================================
// 🌍 ROTAS DE LEITURA (A ordem destas rotas é super importante!)
// =======================================================================

// 1. Listar Estrutura Completa (Matrizes e suas respectivas Filiais)
// 🔒 PRIVADA: Usa o verifyToken direto na rota
router.get('/hierarchy', verifyToken, async (req, res) => {
    const { uid } = req.user;
    const { db } = req;

    try {
        const userDoc = await db.collection('users').doc(uid).get();
        const userData = userDoc.exists ? userDoc.data() : {};

        let allEstablishments = [];

        if (userData.role === 'owner' || userData.role === 'admin') {
            const snap = await db.collection('establishments').where('ownerId', '==', uid).get();
            allEstablishments = snap.docs.map(d => d.data());
        } 
        else {
            const accessibleIds = (userData.accessibleEstablishments || []).map(est => est.id);
            if (accessibleIds.length > 0) {
                for (let i = 0; i < accessibleIds.length; i += 10) {
                    const chunk = accessibleIds.slice(i, i + 10);
                    const snap = await db.collection('establishments').where('id', 'in', chunk).get();
                    allEstablishments.push(...snap.docs.map(d => d.data()));
                }
            }
        }

        const hierarchy = [];
        const filiais = [];

        allEstablishments.forEach(est => {
            if (!est.parentId) {
                hierarchy.push({ ...est, branches: [] });
            } else {
                filiais.push(est);
            }
        });

        filiais.forEach(filial => {
            const matriz = hierarchy.find(m => m.id === filial.parentId);
            if (matriz) {
                matriz.branches.push(filial);
            } else {
                hierarchy.push({ ...filial, branches: [], isOrphanBranch: true });
            }
        });

        res.status(200).json({ matrizes: hierarchy });
    } catch (error) {
        handleFirestoreError(res, error, 'listar hierarquia');
    }
});

// 2. Obter as Filiais Ativas de uma Matriz (Para o Portal de Agendamento do Cliente)
// 🌍 PÚBLICA: Sem verifyToken
router.get('/:id/branches', async (req, res) => {
    const { id } = req.params;
    try {
        const { db } = req;
        const snapshot = await db.collection('establishments')
            .where('parentId', '==', id)
            .where('status', '==', 'active')
            .get();
        
        if (snapshot.empty) {
            return res.status(200).json([]); // Não tem filiais (Vai direto para o agendamento)
        }
        
        // Retorna apenas dados públicos essenciais para o cliente clicar
        const branches = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                address: data.address || null,
                phone: data.phone || null,
                logo: data.logo || null
            };
        });
        
        res.status(200).json(branches);
    } catch (error) {
        handleFirestoreError(res, error, 'buscar filiais públicas');
    }
});

// 3. Obter Detalhes de um Estabelecimento Específico 
// 🌍 PÚBLICA: Sem verifyToken, para carregar o Agendamento dos Clientes
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { db } = req;
        const doc = await db.collection('establishments').doc(id).get();
        
        if (!doc.exists) return res.status(404).json({ message: 'Estabelecimento não encontrado.' });
        
        const data = doc.data();

        // 🛡️ SEGURANÇA: Removemos dados sensíveis antes de enviar para o cliente final público
        delete data.financialIntegration;
        delete data.purchaseConfig;
        delete data.commissionConfig;
        delete data.ownerId;
        
        res.status(200).json(data);
    } catch (error) {
        handleFirestoreError(res, error, 'obter detalhes do estabelecimento');
    }
});


// =======================================================================
// 🔒 ROTAS DE ESCRITA (Exigem token de autenticação do Administrador)
// =======================================================================
router.use(verifyToken);

// 4. Criar Novo Estabelecimento (Matriz ou Filial)
router.post('/', isOwner, async (req, res) => {
    const { name, cnpj, phone, address, timezone, parentId } = req.body;
    const { uid } = req.user;

    if (!name) {
        return res.status(400).json({ message: 'O nome do estabelecimento é obrigatório.' });
    }

    try {
        const { db } = req;
        const newEstablishmentRef = db.collection('establishments').doc();
        
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
            publicBookingEnabled: false, 
            modules: {
                'agenda-section': true, 'comandas-section': true,
                'financial-section': true, 'reports-section': true
            },
            loyaltyProgram: { enabled: false, pointsPerVisit: 1, tiers: [] },
            financialIntegration: { defaultNaturezaId: null, defaultCentroDeCustoId: null }
        };

        await db.runTransaction(async (transaction) => {
            const userRef = db.collection('users').doc(uid);
            
            const userDoc = await transaction.get(userRef);
            let parentDoc = null;
            
            if (parentId) {
                const parentRef = db.collection('establishments').doc(parentId);
                parentDoc = await transaction.get(parentRef);
                if (!parentDoc.exists) {
                    throw new Error("MATRIZ_NOT_FOUND");
                }
            }
            
            transaction.set(newEstablishmentRef, establishmentData);
            
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

// 5. Atualizar Status do Agendamento Público
router.patch('/:id/booking-status', isOwner, async (req, res) => {
    const { id } = req.params;
    const { publicBookingEnabled } = req.body;

    if (typeof publicBookingEnabled !== 'boolean') {
        return res.status(400).json({ message: 'O status de agendamento deve ser um valor booleano.' });
    }

    try {
        const { db } = req;
        await db.collection('establishments').doc(id).update({
            publicBookingEnabled,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        res.status(200).json({ message: `Agendamento público ${publicBookingEnabled ? 'ativado' : 'desativado'} com sucesso.` });
    } catch (error) {
        handleFirestoreError(res, error, 'atualizar status de agendamento');
    }
});

// 6. Atualizar Email do Proprietário
router.patch('/:id/owner-email', isOwner, async (req, res) => {
    const { id } = req.params;
    const { newEmail } = req.body;

    if (!newEmail) {
        return res.status(400).json({ message: 'O novo email é obrigatório.' });
    }

    try {
        const { db } = req;
        await db.collection('establishments').doc(id).update({
            email: newEmail,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        res.status(200).json({ message: 'E-mail da loja atualizado com sucesso.' });
    } catch (error) {
        handleFirestoreError(res, error, 'atualizar e-mail do proprietário');
    }
});

// 7. Salvar Configurações de Fidelidade
router.put('/:id/loyalty', isOwner, async (req, res) => {
    const { id } = req.params;
    const { loyaltyProgram } = req.body;

    if (!loyaltyProgram) {
        return res.status(400).json({ message: 'Os dados do programa de fidelidade são obrigatórios.' });
    }

    try {
        const { db } = req;
        await db.collection('establishments').doc(id).update({
            loyaltyProgram,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        res.status(200).json({ message: 'Programa de fidelidade atualizado com sucesso.' });
    } catch (error) {
        handleFirestoreError(res, error, 'salvar regras de fidelidade');
    }
});

// 8. Atualizar Dados Gerais de um Estabelecimento
router.put('/:id', isOwner, async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    
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

module.exports = router;