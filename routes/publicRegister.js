// routes/publicRegister.js
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// ⚠️ SUBSTITUA PELA SUA CHAVE SECRETA DA STRIPE (sk_...) ⚠️
const stripe = require('stripe')('process.env.STRIPE_SECRET_KEY'); 

// ####################################################################
// ### INÍCIO DA MODIFICAÇÃO (PERMISSÕES MASTER ATUALIZADAS) ###
// ####################################################################

// Define o objeto de permissões totais para o "Usuário Master" (Dono)
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
    'loyalty-section': { view: true, create: true, edit: true } // <-- ADICIONADO
};

// ####################################################################
// ### FIM DA MODIFICAÇÃO ###
// ####################################################################


// Esta rota é pública, mas usa o addFirebaseInstances para acesso ao db/auth
router.post('/', async (req, res) => {
    const { 
        establishmentName, 
        ownerEmail, 
        ownerPassword, 
        planId, 
        // MODIFICADO: Espera um 'paymentMethodId' (método moderno)
        paymentMethodId,
        timezone // <--- (NOVO) Recebe o fuso horário do cadastro (ex: 'America/Manaus')
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

        // --- 1. Verificação do Plano e IDs do Stripe ---
        const planDoc = await db.collection('subscriptionPlans').doc(planId).get();
        if (!planDoc.exists || !planDoc.data().stripePriceId) {
            throw new Error('Plano de assinatura inválido ou não configurado corretamente com o Stripe.');
        }
        const planData = planDoc.data();
        // Pega os módulos permitidos do plano que buscamos
        const { allowedModules, stripePriceId } = planData; 
        
        const existingEstablishment = await establishmentRef.get();
        if (existingEstablishment.exists) {
             return res.status(409).json({ message: `O ID de acesso '${sanitizedId}' já está em uso. Por favor, escolha outro.` });
        }
        
        // --- 2. CRIAÇÃO DA ASSINATURA STRIPE (Método Moderno) ---

        // 2.1. Cria um cliente Stripe
        const customer = await stripe.customers.create({
            email: ownerEmail,
            name: establishmentName,
            metadata: { establishmentId: sanitizedId } // Essencial para o Webhook!
        });

        // 2.2. Associa o método de pagamento ao cliente
        await stripe.paymentMethods.attach(paymentMethodId, {
            customer: customer.id,
        });

        // 2.3. Define o método de pagamento como padrão para o cliente
        await stripe.customers.update(customer.id, {
            invoice_settings: {
                default_payment_method: paymentMethodId,
            },
        });

        // 2.4. Cria a Assinatura Recorrente
        const subscriptionStripe = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: stripePriceId }], 
            payment_behavior: 'default_incomplete', // Tenta cobrar, mas permite falha
            proration_behavior: 'none',
            expand: ['latest_invoice.payment_intent'],
            metadata: { establishmentId: sanitizedId },
            trial_period_days: 0, 
        });
        
        // 2.5. Define a data de expiração (baseado no Stripe)
        const expiryDate = new Date(subscriptionStripe.current_period_end * 1000);
        
        // --- 3. Criar Usuário e Estabelecimento no Firebase ---

        // Cria o usuário do Firebase Auth
        const userRecord = await auth.createUser({
            email: ownerEmail,
            password: ownerPassword,
            displayName: establishmentName,
        });
        
        // Cria o documento do Estabelecimento
        const establishmentData = {
            name: establishmentName,
            ownerUid: userRecord.uid,
            ownerEmail: ownerEmail,
            status: subscriptionStripe.status === 'active' ? 'active' : 'inactive', // Ativo apenas se o Stripe confirmar
            modules: allowedModules || {}, // <-- USA OS MÓDULOS DO PLANO
            // (NOVO) Salva o fuso horário no banco. Se não vier, usa SP como padrão.
            timezone: timezone || 'America/Sao_Paulo', 
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            subscription: {
                planId: planId,
                expiryDate: admin.firestore.Timestamp.fromDate(expiryDate),
                stripeSubscriptionId: subscriptionStripe.id, 
                statusStripe: subscriptionStripe.status, 
                stripeCustomerId: customer.id 
            }
        };

        await establishmentRef.set(establishmentData);

        // Define as Custom Claims do Firebase Auth
        await auth.setCustomUserClaims(userRecord.uid, { 
            role: 'owner', 
            establishmentId: sanitizedId 
        });

        // ####################################################################
        // ### INÍCIO DAS NOVAS FUNCIONALIDADES (Master User e E-mail) ###
        // ####################################################################

        // 4. Cria o "Usuário Master" na coleção 'users'
        const newUserRef = db.collection('users').doc(userRecord.uid);
        await newUserRef.set({
            name: establishmentName,
            email: ownerEmail,
            establishmentId: sanitizedId,
            permissions: masterPermissions, // <-- Usa as permissões totais que definimos
            professionalId: null,
            status: 'active',
            isOwnerMaster: true,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        // 5. Adiciona o e-mail à coleção 'mail' para envio (Requer Extensão "Trigger Email")
        const loginUrl = `${req.protocol}://${req.get('host')}/login`;
        
        // (OPCIONAL: Descomente esta linha se tiver a extensão "Trigger Email" instalada)
        /*
        await db.collection('mail').add({
            to: ownerEmail,
            message: {
                subject: `Bem-vindo ao Kairos System, ${establishmentName}!`,
                html: `
                    <h1>Seu acesso foi criado com sucesso!</h1>
                    <p>Olá, ${establishmentName}.</p>
                    <p>Sua assinatura foi confirmada e sua conta está pronta para ser usada.</p>
                    <p><strong>Seu e-mail de login:</strong> ${ownerEmail}</p>
                    <p><strong>Sua senha:</strong> (a senha que você acabou de cadastrar)</p>
                    <p>Acesse seu painel agora mesmo:</p>
                    <a href="${loginUrl}" target="_blank">${loginUrl}</a>
                    <br><br>
                    <p>Obrigado por escolher o Kairos System!</p>
                `,
            },
        });
        */
        
        // ####################################################################
        // ### FIM DAS NOVAS FUNCIONALIDADES ###
        // ####################################################################

        res.status(201).json({ 
            message: 'Assinatura e estabelecimento criados com sucesso!', 
            loginUrl: loginUrl
        });

    } catch (error) {
        console.error("Erro no processo de Registro Público:", error);
        
        if (error.type === 'StripeCardError' || error.type === 'StripeInvalidRequestError') {
             return res.status(400).json({ message: `Erro de Pagamento: ${error.message}` });
        }
        
        if (error.code === 'auth/email-already-exists') {
            return res.status(409).json({ message: 'Este e-mail já está sendo utilizado.' });
        }
        
        res.status(500).json({ message: error.message || 'Ocorreu um erro no servidor ao processar o registro.' });
    }
});

module.exports = router;