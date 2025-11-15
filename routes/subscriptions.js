const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// --- Middleware para verificar se é Super Admin (reutilizado) ---
const { verifyToken, isSuperAdmin } = require('../middlewares/auth');

// Aplica o middleware de autenticação em todas as rotas
router.use(verifyToken, isSuperAdmin);

// ####################################################################
// ### INÍCIO DA MODIFICAÇÃO (Planos Base e Add-on Fidelidade) ###
// ####################################################################

// Define os módulos para cada plano
const planoEssencialModules = {
    'agenda-section': true,
    'comandas-section': false, // Essencial não tem PDV
    'relatorios-section': false,
    'sales-report-section': false,
    'financial-section': false,
    'servicos-section': true,
    'produtos-section': true,
    'profissionais-section': true,
    'clientes-section': true,
    'packages-section': false,
    'commissions-section': false,
    'estabelecimento-section': true, // Precisa para configurar horários
    'users-section': true,
    'ausencias-section': true, // Precisa para bloquear agenda
    'loyalty-section': false // <-- ADICIONADO (Desligado por defeito)
};

const planoProModules = {
    'agenda-section': true,
    'comandas-section': true,
    'relatorios-section': true,
    'sales-report-section': true,
    'financial-section': true,
    'servicos-section': true,
    'produtos-section': true,
    'profissionais-section': true,
    'clientes-section': true,
    'packages-section': true,
    'commissions-section': true,
    'estabelecimento-section': true,
    'users-section': true,
    'ausencias-section': true,
    'loyalty-section': false // <-- ADICIONADO (Desligado por defeito)
};

const planoEnterpriseModules = {
    ...planoProModules, // Enterprise tem tudo do Pro
    'loyalty-section': false // <-- ADICIONADO (Também desligado por defeito)
};

// Planos padrão que serão criados no Firestore
const defaultPlans = [
    {
        id: 'plano_essencial', // ID interno (importante para o frontend)
        name: 'Plano Essencial',
        description: 'Gestão de agenda e clientes para profissionais solo.',
        // ⚠️ COLOQUE AQUI O ID DO PREÇO DO STRIPE (price_...) ⚠️
        stripePriceId: 'price_ID_STRIPE_ESSENCIAL', 
        maxProfessionals: 1,
        maxUsers: 1,
        allowedModules: planoEssencialModules
    },
    {
        id: 'plano_pro',
        name: 'Plano Pro',
        description: 'Gestão completa, incluindo financeiro, comissões e PDV.',
        // ⚠️ COLOQUE AQUI O ID DO PREÇO DO STRIPE (price_...) ⚠️
        stripePriceId: 'price_ID_STRIPE_PRO',
        maxProfessionals: 10,
        maxUsers: 5,
        allowedModules: planoProModules
    },
    {
        id: 'plano_enterprise',
        name: 'Plano Enterprise',
        description: 'Para grandes operações e franquias, com suporte prioritário.',
        // ⚠️ COLOQUE AQUI O ID DO PREÇO DO STRIPE (price_...) ⚠️
        stripePriceId: 'price_ID_STRIPE_ENTERPRISE',
        maxProfessionals: 999, // Ilimitado
        maxUsers: 999, // Ilimitado
        allowedModules: planoEnterpriseModules
    }
];

// NOVA ROTA: Rota para inicializar/verificar os planos no Firestore
router.post('/initialize-plans', async (req, res) => {
    // Esta rota é protegida pelo 'isSuperAdmin'
    try {
        const { db } = req;
        const batch = db.batch();
        const plansCollection = db.collection('subscriptionPlans');

        for (const plan of defaultPlans) {
            const docRef = plansCollection.doc(plan.id);
            // Usa set com { merge: true } para criar ou atualizar sem sobrescrever dados extras
            batch.set(docRef, plan, { merge: true }); 
        }
        
        await batch.commit();
        res.status(200).json({ message: 'Planos de assinatura inicializados/atualizados com sucesso.' });
    } catch (error) {
        console.error("Erro ao inicializar planos:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// ####################################################################
// ### FIM DA MODIFICAÇÃO ###
// ####################################################################


// Rota para obter todos os planos de assinatura (Mantida do seu código original)
// Útil para o painel de Super Admin
router.get('/plans', async (req, res) => {
    try {
        const { db } = req;
        const snapshot = await db.collection('subscriptionPlans').orderBy('name').get();
        const plansList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(plansList);
    } catch (error) {
        console.error("Erro ao listar planos de assinatura:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Rota para apagar um plano de assinatura (Mantida do seu código original)
// Útil para o painel de Super Admin
router.delete('/plans/:planId', async (req, res) => {
    const { planId } = req.params;
    try {
        const { db } = req;
        await db.collection('subscriptionPlans').doc(planId).delete();
        res.status(200).json({ message: 'Plano apagado com sucesso!' });
    } catch (error) {
        console.error("Erro ao apagar plano de assinatura:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// ROTA ATUALIZADA: Atribuir ou prorrogar um plano a um estabelecimento (Mantida do seu código original)
// Útil para o painel de Super Admin
router.patch('/assign/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    const { planId, paymentDate } = req.body; // paymentDate é opcional
    
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

        // --- Correção: Trata os diferentes tipos de expiryDate ---
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

        // 1. Determina a data de início da prorrogação
        let startDateForExtension = new Date();
        
        // Se já existe uma data de expiração futura, começa dela
        if (subscription.expiryDate && currentExpiryDate > startDateForExtension) {
            startDateForExtension = currentExpiryDate;
        }

        // 2. Calcula a nova data de expiração (+ 30 dias)
        let newExpiryDate = new Date(startDateForExtension);
        newExpiryDate.setDate(newExpiryDate.getDate() + 30);
        
        // Se o request body tiver o campo 'expiryDate', valida antes de usar
        let finalDate;
        if (req.body.expiryDate) {
            finalDate = new Date(req.body.expiryDate);
            if (isNaN(finalDate.getTime())) {
                return res.status(400).json({ message: 'A data de expiração informada é inválida. Use o padrão yyyy-MM-dd ou yyyy-MM-ddTHH:mm:ssZ.' });
            }
        } else {
            finalDate = newExpiryDate;
        }

        // *** Atualiza status conforme data de expiração ***
        let status = "inactive";
        if (finalDate > new Date()) {
            status = "active";
        }

        const updatedData = {
            subscription: {
                planId,
                expiryDate: admin.firestore.Timestamp.fromDate(finalDate)
            },
            status
        };

        await establishmentRef.update(updatedData);

        res.status(200).json({ 
            message: 'Plano de assinatura atribuído/prorrogado com sucesso!', 
            newExpiryDate: finalDate.toISOString() 
        });

    } catch (error) {
        console.error("Erro ao atribuir/prorrogar plano:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

module.exports = router;