// routes/publicRegister.js
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// ⚠️ SUBSTITUA PELA SUA CHAVE SECRETA DA STRIPE ⚠️
const stripe = require('stripe')('SUA_CHAVE_SECRETA_STRIPE'); 

// Esta rota é pública, mas usa o addFirebaseInstances para acesso ao db/auth
router.post('/', async (req, res) => {
    const { 
        establishmentName, 
        ownerEmail, 
        ownerPassword, 
        planId, 
        paymentToken // O token gerado pelo Stripe Elements no frontend
    } = req.body;
    
    // O establishmentId vem do frontend e precisa ser validado
    const rawEstablishmentId = req.body.establishmentId;

    if (!rawEstablishmentId || !establishmentName || !ownerEmail || !ownerPassword || !planId || !paymentToken) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios, incluindo o token de pagamento.' });
    }
    
    if (ownerPassword.length < 6) {
        return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres.' });
    }

    // Normaliza o ID do estabelecimento (remove espaços, torna minúsculas)
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
        const { allowedModules, stripePriceId } = planData;
        
        // Verifica se o ID do estabelecimento já existe
        const existingEstablishment = await establishmentRef.get();
        if (existingEstablishment.exists) {
             return res.status(409).json({ message: `O ID de acesso '${sanitizedId}' já está em uso. Por favor, escolha outro.` });
        }
        
        // --- 2. CRIAÇÃO DA ASSINATURA STRIPE (O Ponto de Falha Crítico) ---

        // 2.1. Cria um cliente Stripe
        const customer = await stripe.customers.create({
            email: ownerEmail,
            source: paymentToken, // O token do cartão gerado pelo frontend (Stripe Elements)
            name: establishmentName,
            metadata: { establishmentId: sanitizedId } // Essencial para o Webhook!
        });

        // 2.2. Cria a Assinatura Recorrente
        const subscriptionStripe = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: stripePriceId }], 
            expand: ['latest_invoice.payment_intent'],
            trial_period_days: 0, // Inicia imediatamente, a menos que o plano Stripe defina um período de avaliação
        });
        
        // 2.3. Define a data de expiração (baseado no Stripe)
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
            modules: allowedModules || {},
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            subscription: {
                planId: planId,
                expiryDate: admin.firestore.Timestamp.fromDate(expiryDate),
                stripeSubscriptionId: subscriptionStripe.id, 
                statusStripe: subscriptionStripe.status, 
                stripeCustomerId: customer.id // Salva o ID do cliente Stripe
            }
        };

        await establishmentRef.set(establishmentData);

        // Define as Custom Claims do Firebase Auth
        await auth.setCustomUserClaims(userRecord.uid, { 
            role: 'owner', 
            establishmentId: sanitizedId 
        });

        res.status(201).json({ 
            message: 'Assinatura e estabelecimento criados com sucesso!', 
            loginUrl: `${req.protocol}://${req.get('host')}/login`
        });

    } catch (error) {
        console.error("Erro no processo de Registro Público:", error);
        
        // Se a criação do Customer falhou (erro no cartão), o código do Stripe estará aqui
        if (error.type === 'StripeCardError' || error.type === 'StripeInvalidRequestError') {
             return res.status(400).json({ message: `Erro de Pagamento: ${error.message}` });
        }
        
        // Se for erro de e-mail duplicado
        if (error.code === 'auth/email-already-exists') {
            return res.status(409).json({ message: 'Este e-mail já está sendo utilizado.' });
        }
        
        res.status(500).json({ message: error.message || 'Ocorreu um erro no servidor ao processar o registro.' });
    }
});

module.exports = router;
