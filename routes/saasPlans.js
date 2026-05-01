// routes/saasPlans.js (Gestão de Planos Exclusivos do SaaS Kairos)

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken } = require('../middlewares/auth'); 

// 🔑 Chave Secreta Exclusiva da Conta Mãe (Kairos) no Pagar.me
// Usa variáveis de ambiente no servidor de produção (.env)
const PAGARME_SAAS_SECRET = process.env.PAGARME_SAAS_SECRET_KEY || 'sk_test_tua_chave_secreta_aqui';

// Função auxiliar para gerar o cabeçalho de autenticação do Pagar.me
const getPagarmeHeaders = () => {
    const encodedKey = Buffer.from(`${PAGARME_SAAS_SECRET}:`).toString('base64');
    return {
        'Authorization': `Basic ${encodedKey}`,
        'Content-Type': 'application/json'
    };
};

// =======================================================================
// 🚀 1. CRIAR NOVO PLANO SAAS (POST)
// =======================================================================
router.post('/', verifyToken, async (req, res) => {
    const { db } = req;
    
    // NOVO: Adicionado intervalCount (1=Mensal, 6=Semestral, 12=Anual) e trialDays (Teste Grátis)
    const { 
        name, 
        price, 
        maxEstablishments, 
        maxUsers, 
        maxProfessionals, 
        allowedModules, 
        features,
        intervalCount,
        trialDays
    } = req.body;

    if (!name || price === undefined) {
        return res.status(400).json({ message: "Nome e preço são obrigatórios." });
    }

    try {
        const priceInCents = Math.round(Number(price) * 100);
        
        // Configuração dinâmica de período e trial
        const planIntervalCount = Number(intervalCount) || 1; // Padrão: 1 mês (Mensal)
        const planTrialDays = trialDays !== undefined ? Number(trialDays) : 7; // Padrão: 7 dias de trial
        
        // 1.1 Criar o Plano na API do Pagar.me V5
        const pagarmeResponse = await fetch('https://api.pagar.me/core/v5/plans', {
            method: 'POST',
            headers: getPagarmeHeaders(),
            body: JSON.stringify({
                name: name,
                currency: "BRL",
                interval: "month",
                interval_count: planIntervalCount, // 1 (mensal), 6 (semestral), 12 (anual)
                billing_type: "prepaid", // Cobrança pré-paga
                trial_period_days: planTrialDays, // Mágica do Trial Automático do Pagar.me!
                items: [
                    {
                        name: `Licença Kairos ${name}`, // Nome dinâmico para ficar bonito na fatura
                        quantity: 1,
                        pricing_scheme: {
                            scheme_type: "unit",
                            price: priceInCents
                        }
                    }
                ]
            })
        });

        const pagarmeData = await pagarmeResponse.json();

        if (!pagarmeResponse.ok) {
            console.error("Erro Pagar.me (Criar):", pagarmeData);
            return res.status(400).json({ message: "Erro ao criar o plano no Pagar.me.", details: pagarmeData });
        }

        // 1.2 Guardar no Firestore (Coleção saas_plans Isolada!)
        const newPlan = {
            name,
            price: Number(price),
            maxEstablishments: Number(maxEstablishments || 1),
            maxUsers: Number(maxUsers || 1),
            maxProfessionals: Number(maxProfessionals || 1),
            allowedModules: allowedModules || [],
            features: features || [],
            intervalCount: planIntervalCount, // Salva o período localmente
            trialDays: planTrialDays, // Salva o tempo de trial localmente
            pagarmePlanId: pagarmeData.id, // ID retornado pelo Pagar.me (Ex: plan_xxxxxxxx)
            active: pagarmeData.status === 'active',
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        };

        const planRef = await db.collection('saas_plans').add(newPlan);
        
        res.status(201).json({ message: "Plano SaaS criado com sucesso!", id: planRef.id, ...newPlan });

    } catch (error) {
        console.error("Erro Servidor (Criar Plano SaaS):", error);
        res.status(500).json({ message: "Erro interno ao criar o plano SaaS." });
    }
});

// =======================================================================
// 🚀 2. LISTAR TODOS OS PLANOS SAAS (GET)
// =======================================================================
router.get('/', verifyToken, async (req, res) => {
    const { db } = req;
    
    try {
        // Trazemos todos os planos de SaaS
        const snapshot = await db.collection('saas_plans').get();
        
        const plans = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Ordenamos do mais recente para o mais antigo (em memória para evitar erros de índice no Firebase)
        plans.sort((a, b) => {
            const dateA = a.createdAt && a.createdAt.toDate ? a.createdAt.toDate() : new Date(0);
            const dateB = b.createdAt && b.createdAt.toDate ? b.createdAt.toDate() : new Date(0);
            return dateB - dateA;
        });

        res.status(200).json(plans);
    } catch (error) {
        console.error("Erro Servidor (Listar Planos SaaS):", error);
        res.status(500).json({ message: "Erro interno ao listar os planos." });
    }
});

// =======================================================================
// 🚀 3. ATUALIZAR PLANO SAAS (PUT)
// =======================================================================
router.put('/:planId', verifyToken, async (req, res) => {
    const { db } = req;
    const { planId } = req.params;
    
    // Lendo os novos campos no PUT também
    const { 
        name, 
        price, 
        maxEstablishments, 
        maxUsers, 
        maxProfessionals, 
        allowedModules, 
        features,
        intervalCount,
        trialDays 
    } = req.body;

    try {
        const planRef = db.collection('saas_plans').doc(planId);
        const planDoc = await planRef.get();

        if (!planDoc.exists) {
            return res.status(404).json({ message: "Plano SaaS não encontrado no Firebase." });
        }

        const currentPlanData = planDoc.data();
        
        // 3.1 Se o NOME for alterado, atualizamos no Pagar.me
        if (name && name !== currentPlanData.name && currentPlanData.pagarmePlanId) {
            const pagarmeResponse = await fetch(`https://api.pagar.me/core/v5/plans/${currentPlanData.pagarmePlanId}`, {
                method: 'PUT',
                headers: getPagarmeHeaders(),
                body: JSON.stringify({ name: name })
            });

            if (!pagarmeResponse.ok) {
                const pagarmeError = await pagarmeResponse.json();
                console.error("Erro Pagar.me (Atualizar):", pagarmeError);
                // Decisão de arquitetura: Não bloqueamos a atualização local se o Pagar.me falhar, 
                // mas podes querer travar se for crítico.
            }
        }

        // NOTA: O Pagar.me V5 não permite alterar o PREÇO, PERÍODO (interval) nem TRIAL de um plano existente de forma simples, 
        // para não afetar assinantes atuais. Eles só são atualizados no Firebase para novas exibições locais.

        // 3.2 Atualizamos os dados no Firebase
        const updateData = {
            name: name || currentPlanData.name,
            price: price !== undefined ? Number(price) : currentPlanData.price,
            maxEstablishments: maxEstablishments !== undefined ? Number(maxEstablishments) : currentPlanData.maxEstablishments,
            maxUsers: maxUsers !== undefined ? Number(maxUsers) : currentPlanData.maxUsers,
            maxProfessionals: maxProfessionals !== undefined ? Number(maxProfessionals) : currentPlanData.maxProfessionals,
            allowedModules: allowedModules || currentPlanData.allowedModules,
            features: features || currentPlanData.features,
            intervalCount: intervalCount !== undefined ? Number(intervalCount) : currentPlanData.intervalCount,
            trialDays: trialDays !== undefined ? Number(trialDays) : currentPlanData.trialDays,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        };

        await planRef.update(updateData);
        res.status(200).json({ message: "Plano SaaS atualizado com sucesso." });

    } catch (error) {
        console.error("Erro Servidor (Atualizar Plano SaaS):", error);
        res.status(500).json({ message: "Erro interno ao atualizar o plano." });
    }
});

// =======================================================================
// 🚀 4. APAGAR PLANO SAAS (DELETE)
// =======================================================================
router.delete('/:planId', verifyToken, async (req, res) => {
    const { db } = req;
    const { planId } = req.params;

    try {
        const planRef = db.collection('saas_plans').doc(planId);
        const planDoc = await planRef.get();

        if (!planDoc.exists) {
            return res.status(404).json({ message: "Plano SaaS não encontrado." });
        }

        const currentPlanData = planDoc.data();

        // 4.1 Tentar Apagar/Desativar no Pagar.me primeiro
        if (currentPlanData.pagarmePlanId) {
            const pagarmeResponse = await fetch(`https://api.pagar.me/core/v5/plans/${currentPlanData.pagarmePlanId}`, {
                method: 'DELETE',
                headers: getPagarmeHeaders()
            });

            if (!pagarmeResponse.ok) {
                const pagarmeData = await pagarmeResponse.json();
                console.error("Erro Pagar.me (Apagar):", pagarmeData);
                // Se existirem clientes com o plano, o Pagar.me pode recusar o Delete.
                return res.status(400).json({ 
                    message: "Não é possível apagar no Pagar.me (podem existir assinantes ativos). Tente inativar.",
                    details: pagarmeData
                });
            }
        }

        // 4.2 Apagar do Firebase
        await planRef.delete();
        res.status(200).json({ message: "Plano SaaS apagado com sucesso do sistema e do Pagar.me." });

    } catch (error) {
        console.error("Erro Servidor (Apagar Plano SaaS):", error);
        res.status(500).json({ message: "Erro interno ao apagar o plano." });
    }
});

module.exports = router;