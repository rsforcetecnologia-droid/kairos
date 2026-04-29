// routes/subscriptions.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// --- Middleware para verificar se é Super Admin ---
const { verifyToken, isSuperAdmin } = require('../middlewares/auth');

// Aplica o middleware de autenticação e proteção em todas as rotas deste ficheiro
router.use(verifyToken, isSuperAdmin);

/**
 * ROTA: POST /api/subscriptions/plans
 * OBJETIVO: Criar um novo plano de assinatura SaaS com limites de uso
 */
router.post('/plans', async (req, res) => {
    const { name, price, maxProfessionals, maxUsers, maxEstablishments, allowedModules } = req.body;
    
    // Validação de campos obrigatórios (incluindo o novo maxEstablishments)
    if (!name || price === undefined || maxProfessionals === undefined || maxUsers === undefined || maxEstablishments === undefined || !allowedModules) {
        return res.status(400).json({ message: 'Todos os campos, incluindo limites de lojas, utilizadores e profissionais, são obrigatórios.' });
    }

    try {
        const { db } = req;
        const newPlan = {
            name,
            price: Number(price),
            maxProfessionals: Number(maxProfessionals),
            maxUsers: Number(maxUsers),
            maxEstablishments: Number(maxEstablishments), // NOVO: Persistindo limite de lojas
            allowedModules,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            active: true 
        };

        // Grava na coleção oficial de planos SaaS
        const docRef = await db.collection('saas_plans').add(newPlan);
        
        res.status(201).json({ 
            message: 'Plano criado com sucesso!', 
            id: docRef.id, 
            data: newPlan 
        });
    } catch (error) {
        console.error("Erro ao criar plano de assinatura:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao criar o plano.' });
    }
});

/**
 * ROTA: GET /api/subscriptions/plans
 * OBJETIVO: Listar todos os planos cadastrados (ordenados por nome)
 */
router.get('/plans', async (req, res) => {
    try {
        const { db } = req;
        const snapshot = await db.collection('saas_plans').orderBy('name').get();
        const plansList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(plansList);
    } catch (error) {
        console.error("Erro ao listar planos de assinatura:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao listar os planos.' });
    }
});

/**
 * ROTA: PUT /api/subscriptions/plans/:planId
 * OBJETIVO: Atualizar as regras e limites de um plano existente
 */
router.put('/plans/:planId', async (req, res) => {
    const { planId } = req.params;
    const { name, price, maxProfessionals, maxUsers, maxEstablishments, allowedModules } = req.body;

    if (!name || price === undefined || maxProfessionals === undefined || maxUsers === undefined || maxEstablishments === undefined || !allowedModules) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios para a atualização do plano.' });
    }

    try {
        const { db } = req;
        const updatedData = {
            name,
            price: Number(price),
            maxProfessionals: Number(maxProfessionals),
            maxUsers: Number(maxUsers),
            maxEstablishments: Number(maxEstablishments), // NOVO: Atualizando limite de lojas
            allowedModules,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        };

        await db.collection('saas_plans').doc(planId).update(updatedData);
        res.status(200).json({ message: 'Plano atualizado com sucesso!' });
    } catch (error) {
        console.error("Erro ao atualizar plano de assinatura:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao atualizar o plano.' });
    }
});

/**
 * ROTA: DELETE /api/subscriptions/plans/:planId
 * OBJETIVO: Remover (ou desativar) um plano de assinatura
 */
router.delete('/plans/:planId', async (req, res) => {
    const { planId } = req.params;
    try {
        const { db } = req;
        await db.collection('saas_plans').doc(planId).delete();
        res.status(200).json({ message: 'Plano apagado com sucesso!' });
    } catch (error) {
        console.error("Erro ao apagar plano de assinatura:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao apagar o plano.' });
    }
});

/**
 * ROTA: PATCH /api/subscriptions/assign/:establishmentId
 * OBJETIVO: Atribuir ou renovar um plano para um estabelecimento específico
 */
router.patch('/assign/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    const { planId } = req.body; 
    
    if (!planId) {
        return res.status(400).json({ message: 'O ID do plano é obrigatório.' });
    }

    try {
        const { db } = req;
        const establishmentRef = db.collection('establishments').doc(establishmentId);
        const doc = await establishmentRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Estabelecimento não encontrado.' });
        }

        const subscription = doc.data().subscription || {};

        // Tratamento robusto da data de expiração
        let currentExpiryDate;
        if (subscription.expiryDate) {
            if (typeof subscription.expiryDate.toDate === 'function') {
                currentExpiryDate = subscription.expiryDate.toDate();
            } else {
                currentExpiryDate = new Date(subscription.expiryDate);
            }
            if (isNaN(currentExpiryDate.getTime())) {
                currentExpiryDate = new Date();
            }
        } else {
            currentExpiryDate = new Date();
        }

        // Calcula renovação (+30 dias) a partir da data atual ou da expiração futura
        let startDateForExtension = new Date();
        if (subscription.expiryDate && currentExpiryDate > startDateForExtension) {
            startDateForExtension = currentExpiryDate;
        }

        let newExpiryDate = new Date(startDateForExtension);
        newExpiryDate.setDate(newExpiryDate.getDate() + 30);
        
        let finalDate;
        if (req.body.expiryDate) {
            finalDate = new Date(req.body.expiryDate);
            if (isNaN(finalDate.getTime())) {
                return res.status(400).json({ message: 'Data de expiração inválida.' });
            }
        } else {
            finalDate = newExpiryDate;
        }

        // Define status baseado na validade
        const status = finalDate > new Date() ? "active" : "inactive";

        const updatedData = {
            subscription: {
                planId,
                expiryDate: admin.firestore.Timestamp.fromDate(finalDate)
            },
            status
        };

        await establishmentRef.update(updatedData);

        res.status(200).json({ 
            message: 'Plano de assinatura atribuído com sucesso!', 
            newExpiryDate: finalDate.toISOString() 
        });

    } catch (error) {
        console.error("Erro ao atribuir plano:", error);
        res.status(500).json({ message: 'Ocorreu um erro interno ao processar a assinatura.' });
    }
});

module.exports = router;