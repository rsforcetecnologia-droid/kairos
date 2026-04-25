// routes/subscriptionPlans.js (Gestão de Planos de Assinatura Multi-Tenant)

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, hasAccess, isOwner } = require('../middlewares/auth');

// =======================================================================
// 🛠️ FUNÇÕES AUXILIARES
// =======================================================================

function handleFirestoreError(res, error, context) {
    console.error(`Erro em ${context}:`, error);
    res.status(500).json({ message: `Ocorreu um erro no servidor ao processar ${context}.` });
}

/**
 * Filtra as lojas que o utilizador pode aceder, baseando-se no token.
 */
function getAccessibleEstablishmentIds(req, requestedIdsStr) {
    const userEstId = req.user.establishmentId;
    const accessibleEsts = req.user.accessibleEstablishments || [];
    
    const allowedIds = new Set([
        userEstId, 
        ...accessibleEsts.map(e => typeof e === 'string' ? e : e.id)
    ]);

    if (requestedIdsStr === 'all') return Array.from(allowedIds);
    if (!requestedIdsStr || requestedIdsStr === 'current') return [userEstId];

    const requestedIds = requestedIdsStr.split(',').map(id => id.trim()).filter(id => id);
    const validIds = requestedIds.filter(id => allowedIds.has(id));

    return validIds.length > 0 ? validIds : requestedIds;
}

// =======================================================================
// 🚀 ROTAS DE GESTÃO DE PLANOS
// =======================================================================

/**
 * ROTA: POST /api/subscription-plans
 * OBJETIVO: Criar um novo plano de assinatura
 * PERMISSÃO: Apenas Donos (isOwner)
 */
router.post('/', verifyToken, isOwner, async (req, res) => {
    const { db } = req;
    const estId = req.body.establishmentId || req.user.establishmentId;
    const { name, description, price, billingCycle, servicesIncluded, usageLimit, active } = req.body;

    if (!name || price === undefined || !billingCycle) {
        return res.status(400).json({ message: "Nome, preço e ciclo de faturação são obrigatórios." });
    }

    try {
        // Obter os IDs de Grupo e Companhia para manter a integridade Multi-Tenant
        const estDoc = await db.collection('establishments').doc(estId).get();
        const groupId = estDoc.exists ? (estDoc.data().groupId || null) : null;
        const companyId = estDoc.exists ? (estDoc.data().companyId || null) : null;

        const newPlan = {
            establishmentId: estId,
            groupId,
            companyId,
            name,
            description: description || '',
            price: Number(price),
            billingCycle, // Ex: 'monthly', 'yearly', 'weekly'
            servicesIncluded: Array.isArray(servicesIncluded) ? servicesIncluded : [], // IDs dos serviços cobertos
            usageLimit: usageLimit ? Number(usageLimit) : null, // Qtd. de serviços que o cliente pode fazer por ciclo
            active: active !== undefined ? active : true,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        };

        const planRef = await db.collection('plans').add(newPlan);

        res.status(201).json({ 
            message: "Plano criado com sucesso!", 
            planId: planRef.id, 
            ...newPlan 
        });

    } catch (error) {
        handleFirestoreError(res, error, 'criar plano de assinatura');
    }
});

/**
 * ROTA: GET /api/subscription-plans/:contextId
 * OBJETIVO: Listar os planos da unidade/rede
 * PERMISSÃO: Funcionários e Donos (hasAccess)
 */
router.get('/:contextId', verifyToken, hasAccess, async (req, res) => {
    const { contextId } = req.params;
    const { activeOnly } = req.query;
    const { db } = req;

    try {
        const validEstIds = getAccessibleEstablishmentIds(req, contextId);

        let query = db.collection('plans');

        // Filtrar pelas unidades permitidas
        if (validEstIds.length === 1) {
            query = query.where('establishmentId', '==', validEstIds[0]);
        } else {
            query = query.where('establishmentId', 'in', validEstIds.slice(0, 10));
        }

        // Se passar a query string ?activeOnly=true, traz só os ativos (bom para o checkout)
        if (activeOnly === 'true') {
            query = query.where('active', '==', true);
        }

        const snapshot = await query.orderBy('createdAt', 'desc').get();
        
        const plans = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.status(200).json(plans);

    } catch (error) {
        handleFirestoreError(res, error, 'listar planos de assinatura');
    }
});

/**
 * ROTA: PUT /api/subscription-plans/:planId
 * OBJETIVO: Atualizar um plano (ex: mudar preço, desativar)
 * PERMISSÃO: Apenas Donos (isOwner)
 */
router.put('/:planId', verifyToken, isOwner, async (req, res) => {
    const { planId } = req.params;
    const { db } = req;
    const updateData = req.body;

    // Remover campos que não devem ser alterados diretamente via PUT genérico
    delete updateData.establishmentId;
    delete updateData.groupId;
    delete updateData.companyId;
    delete updateData.createdAt;

    try {
        const planRef = db.collection('plans').doc(planId);
        const planDoc = await planRef.get();

        if (!planDoc.exists) {
            return res.status(404).json({ message: "Plano não encontrado." });
        }

        // Garantir que o preço e limite são números se existirem no payload
        if (updateData.price !== undefined) updateData.price = Number(updateData.price);
        if (updateData.usageLimit !== undefined) updateData.usageLimit = updateData.usageLimit ? Number(updateData.usageLimit) : null;

        updateData.updatedAt = admin.firestore.FieldValue.serverTimestamp();

        await planRef.update(updateData);

        res.status(200).json({ message: "Plano atualizado com sucesso." });

    } catch (error) {
        handleFirestoreError(res, error, 'atualizar plano');
    }
});

/**
 * ROTA: DELETE /api/subscription-plans/:planId
 * OBJETIVO: Apagar um plano de assinatura
 * PERMISSÃO: Apenas Donos (isOwner)
 */
router.delete('/:planId', verifyToken, isOwner, async (req, res) => {
    const { planId } = req.params;
    const { db } = req;

    try {
        const planRef = db.collection('plans').doc(planId);
        const planDoc = await planRef.get();

        if (!planDoc.exists) {
            return res.status(404).json({ message: "Plano não encontrado." });
        }

        // Nota: Idealmente, num sistema financeiro, faz-se "Soft Delete" (active: false).
        // Mas como criámos o PUT acima, o utilizador pode desativar. Aqui fazemos Hard Delete.
        
        // Regra de Ouro: Verificar se há assinaturas ativas com este plano antes de apagar
        const activeSubscriptions = await db.collection('client_subscriptions')
            .where('planId', '==', planId)
            .where('status', '==', 'active')
            .limit(1)
            .get();

        if (!activeSubscriptions.empty) {
            return res.status(400).json({ 
                message: "Não é possível apagar este plano pois existem clientes com assinaturas ativas vinculadas a ele. Experimente desativá-lo." 
            });
        }

        await planRef.delete();

        res.status(200).json({ message: "Plano apagado com sucesso." });

    } catch (error) {
        handleFirestoreError(res, error, 'apagar plano');
    }
});

module.exports = router;