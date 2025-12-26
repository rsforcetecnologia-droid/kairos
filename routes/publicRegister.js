// routes/publicRegister.js
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// ⚠️ CORREÇÃO: As aspas foram removidas para ler a variável de ambiente corretamente
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 

// ####################################################################
// ### PERMISSÕES DO USUÁRIO MASTER ###
// ####################################################################

const masterPermissions = {
    'agenda-section': { view: true, create: true, edit: true, view_all_prof: true },
    'comandas-section': { view: true, create: true, edit: true, view_all_prof: true },
    'relatorios-section': { view: true, create: true, edit: true },
    'sales-report-section': { view: true, create: true, edit: true },
    'financial-section': { view: true, create: true, edit: true },
    'servicos-section': { view: true, create: true, edit: true },
    'produtos-section': { view: true, create: true, edit: true },
    'profissionais-section': { view: true, create: true, edit: true },
    'clientes-section': { view: true, create: true, edit: true },
    'packages-section': { view: true, create: true, edit: true },
    'commissions-section': { view: true, create: true, edit: true },
    'estabelecimento-section': { view: true, create: true, edit: true },
    'users-section': { view: true, create: true, edit: true },
    'ausencias-section': { view: true, create: true, edit: true },
    'loyalty-section': { view: true, create: true, edit: true }
};

// ####################################################################
// ### ROTA DE REGISTO ###
// ####################################################################

router.post('/', async (req, res) => {
    const { 
        establishmentName, 
        ownerEmail, 
        ownerPassword, 
        planId, 
        paymentMethodId,
        timezone 
    } = req.body;
    
    const rawEstablishmentId = req.body.establishmentId;

    if (!rawEstablishmentId || !establishmentName || !ownerEmail || !ownerPassword || !planId || !paymentMethodId) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios, incluindo o método de pagamento.' });
    }
    
    if (ownerPassword.length < 6) {
        return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres.' });
    }

    const sanitizedId = rawEstablishmentId.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (sanitizedId.length === 0) {
          return res.status(400).json({ message: 'ID do estabelecimento inválido após limpeza. Use apenas letras e números.' });
    }

    try {
        const { db, auth } = req;
        const establishmentRef = db.collection('establishments').doc(sanitizedId);

        // --- 1. Verificação do Plano ---
        const planDoc = await db.collection('subscriptionPlans').doc(planId).get();
        if (!planDoc.exists || !planDoc.data().stripePriceId) {
            throw new Error('Plano de assinatura inválido ou não configurado corretamente com o Stripe.');
        }
        const planData = planDoc.data();
        const { allowedModules, stripePriceId } = planData; 
        
        const existingEstablishment = await establishmentRef.get();
        if (existingEstablishment.exists) {
             return res.status(409).json({ message: `O ID de acesso '${sanitizedId}' já está em uso. Por favor, escolha outro.` });
        }
        
        // --- 2. CRIAÇÃO DA ASSINATURA STRIPE (COM 7 DIAS GRÁTIS) ---

        // 2.1. Cria um cliente Stripe
        const customer = await stripe.customers.create({
            email: ownerEmail,
            name: establishmentName,
            metadata: { establishmentId: sanitizedId } 
        });

        // 2.2. Associa o cartão ao cliente (Fundamental para cobrança futura)
        await stripe.paymentMethods.attach(paymentMethodId, {
            customer: customer.id,
        });

        // 2.3. Define este cartão como o padrão para cobranças
        await stripe.customers.update(customer.id, {
            invoice_settings: {
                default_payment_method: paymentMethodId,
            },
        });

        // 2.4. Cria a Assinatura com Trial
        const subscriptionStripe = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: stripePriceId }], 
            payment_behavior: 'default_incomplete',
            proration_behavior: 'none',
            expand: ['latest_invoice.payment_intent'],
            metadata: { establishmentId: sanitizedId },
            trial_period_days: 7, // <--- AQUI: Define os 7 dias de teste grátis
        });
        
        const expiryDate = new Date(subscriptionStripe.current_period_end * 1000);
        
        // --- 3. Salvar no Firebase ---

        const userRecord = await auth.createUser({
            email: ownerEmail,
            password: ownerPassword,
            displayName: establishmentName,
        });
        
        const establishmentData = {
            name: establishmentName,
            ownerUid: userRecord.uid,
            ownerEmail: ownerEmail,
            // Status 'trialing' é considerado 'active' pelo seu Webhook, então o acesso é liberado
            status: (subscriptionStripe.status === 'active' || subscriptionStripe.status === 'trialing') ? 'active' : 'inactive',
            modules: allowedModules || {}, 
            timezone: timezone || 'America/Sao_Paulo', 
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            subscription: {
                planId: planId,
                expiryDate: admin.firestore.Timestamp.fromDate(expiryDate),
                stripeSubscriptionId: subscriptionStripe.id, 
                statusStripe: subscriptionStripe.status, 
                stripeCustomerId: customer.id,
                isTrial: true // Flag útil para mostrar "Em período de teste" no front
            }
        };

        await establishmentRef.set(establishmentData);

        await auth.setCustomUserClaims(userRecord.uid, { 
            role: 'owner', 
            establishmentId: sanitizedId 
        });

        // 4. Cria o "Usuário Master"
        const newUserRef = db.collection('users').doc(userRecord.uid);
        await newUserRef.set({
            name: establishmentName,
            email: ownerEmail,
            establishmentId: sanitizedId,
            permissions: masterPermissions,
            professionalId: null,
            status: 'active',
            isOwnerMaster: true,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        const loginUrl = `${req.protocol}://${req.get('host')}/login`;

        res.status(201).json({ 
            message: 'Conta criada com sucesso! Aproveite seus 7 dias grátis.', 
            loginUrl: loginUrl
        });

    } catch (error) {
        console.error("Erro no processo de Registro:", error);
        
        if (error.type === 'StripeCardError' || error.type === 'StripeInvalidRequestError') {
             return res.status(400).json({ message: `Erro no Cartão: ${error.message}` });
        }
        
        if (error.code === 'auth/email-already-exists') {
            return res.status(409).json({ message: 'Este e-mail já está sendo utilizado.' });
        }
        
        res.status(500).json({ message: error.message || 'Erro interno no servidor.' });
    }
});

module.exports = router;