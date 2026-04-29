// routes/publicRegister.js
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const axios = require('axios'); // Necessário para chamar a API do Pagar.me

// ============================================================================
// CONFIGURAÇÃO DA API PAGAR.ME V5
// A chave secreta (sk_...) deve estar configurada nas suas variáveis de ambiente
// ============================================================================
const PAGARME_API = axios.create({
    baseURL: 'https://api.pagar.me/core/v5',
    headers: {
        'Authorization': `Basic ${Buffer.from(process.env.PAGARME_SECRET_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/json'
    }
});

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
// ### ROTA DE CRIAÇÃO DO AMBIENTE E ASSINATURA SAAS (PÚBLICA) ###
// ####################################################################

router.post('/', async (req, res) => {
    
    // Instanciando Auth e DB diretamente do admin (pois é rota sem verifyToken)
    const db = admin.firestore();
    const auth = admin.auth();

    const { 
        establishmentName, 
        ownerEmail, 
        ownerPassword,
        ownerName,      
        documentInfo,   
        phone,          
        planId,
        cardToken,       // NOVO: Token seguro do cartão enviado pelo Frontend
        installments,    // NOVO: Quantidade de parcelas (para planos anuais)
        timezone 
    } = req.body;
    
    if (!establishmentName || !ownerEmail || !ownerPassword || !planId || !cardToken) {
        return res.status(400).json({ message: 'Campos obrigatórios ausentes. Verifique os dados preenchidos e o cartão.' });
    }
    
    if (ownerPassword.length < 6) {
        return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres.' });
    }

    // 1. GERAR ID DO ESTABELECIMENTO BASEADO NO NOME (Ex: "Studio Kairos" -> "studiokairos")
    const baseId = establishmentName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, '');
    let sanitizedId = baseId;
    let counter = 1;
    
    try {
        // Verifica se o ID gerado já existe, se existir, adiciona um número (ex: studiokairos2)
        let existingEstablishment = await db.collection('establishments').doc(sanitizedId).get();
        while (existingEstablishment.exists) {
            sanitizedId = `${baseId}${counter}`;
            existingEstablishment = await db.collection('establishments').doc(sanitizedId).get();
            counter++;
        }

        // 2. VERIFICA SE O EMAIL JÁ EXISTE NO FIREBASE ANTES DE COBRAR
        try {
            await auth.getUserByEmail(ownerEmail);
            return res.status(409).json({ message: 'Este e-mail já está sendo utilizado por outro usuário.' });
        } catch (error) {
            if (error.code !== 'auth/user-not-found') throw error;
        }

        // 3. TRATAR O NÚMERO DE TELEFONE PARA O PAGAR.ME (Exige DDD separado)
        const cleanPhone = phone ? phone.replace(/\D/g, '') : '';
        const ddd = cleanPhone.length >= 10 ? cleanPhone.substring(0, 2) : '11';
        const phoneNumber = cleanPhone.length >= 10 ? cleanPhone.substring(2) : '999999999';

        // 4. INTEGRAÇÃO PAGAR.ME: CRIAR ASSINATURA
        let pagarmeSubscriptionId = null;
        let pagarmeCustomerId = null;

        try {
            console.log(`[PAGARME] Iniciando cobrança SaaS para a empresa: ${establishmentName}`);
            
            // Payload para criar Assinatura com o Token do Cartão
            const pagarmePayload = {
                plan_id: planId, // Deve ser o ID do plano configurado no Pagar.me
                payment_method: 'credit_card',
                card_token: cardToken,
                installments: installments || 1,
                customer: {
                    name: ownerName || establishmentName,
                    email: ownerEmail,
                    document: documentInfo ? documentInfo.replace(/\D/g, '') : '',
                    type: (documentInfo && documentInfo.replace(/\D/g, '').length === 14) ? 'company' : 'individual',
                    phones: {
                        mobile_phone: {
                            country_code: "55",
                            area_code: ddd,
                            number: phoneNumber
                        }
                    }
                }
            };

            const subResponse = await PAGARME_API.post('/subscriptions', pagarmePayload);
            
            pagarmeSubscriptionId = subResponse.data.id;
            pagarmeCustomerId = subResponse.data.customer.id;
            
        } catch (pagarmeError) {
            const errorDetails = pagarmeError.response?.data || pagarmeError.message;
            console.error("[PAGAR.ME ERRO]", JSON.stringify(errorDetails));
            // Se o cartão for recusado, devolve o erro para o Frontend
            return res.status(402).json({ message: "O pagamento foi recusado pela operadora. Verifique os dados do cartão." });
        }

        // ====================================================================
        // SE CHEGOU AQUI, O PAGAMENTO (OU CARTÃO) FOI APROVADO!
        // ====================================================================

        // 5. CRIAR USUÁRIO NO FIREBASE
        const userRecord = await auth.createUser({
            email: ownerEmail,
            password: ownerPassword,
            displayName: ownerName || establishmentName, 
        });
        
        // 6. BUSCAR MÓDULOS PERMITIDOS DO PLANO
        let allowedModules = {};
        const planDoc = await db.collection('saas_plans').doc(planId).get();
        if (planDoc.exists) {
            allowedModules = planDoc.data().allowedModules || {};
        }

        // 7. SALVAR O AMBIENTE (TENANT) NO FIRESTORE
        const establishmentData = {
            id: sanitizedId,
            name: establishmentName,
            companyName: establishmentName, 
            document: documentInfo || null,
            phone: phone || null,
            ownerUid: userRecord.uid,
            ownerId: userRecord.uid, 
            ownerEmail: ownerEmail,
            ownerName: ownerName || '',
            isNetwork: false,
            status: 'active', 
            planId: planId, 
            modules: allowedModules, 
            timezone: timezone || 'America/Sao_Paulo', 
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            publicBookingEnabled: false,
            
            // 🚀 AQUI FICAM OS DADOS DO SAAS E PAGAR.ME
            saasSubscription: {
                pagarmeSubscriptionId: pagarmeSubscriptionId,
                pagarmeCustomerId: pagarmeCustomerId,
                planId: planId,
                status: 'active',
                isManualAdmin: false,
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            }
        };

        await db.collection('establishments').doc(sanitizedId).set(establishmentData);

        // 8. DAR PERMISSÕES MASTER E ATRIBUIR AO SALÃO
        await auth.setCustomUserClaims(userRecord.uid, { 
            role: 'owner', 
            establishmentId: sanitizedId 
        });

        // 9. CRIAR O DOCUMENTO DO USUÁRIO
        const newUserRef = db.collection('users').doc(userRecord.uid);
        await newUserRef.set({
            name: ownerName || establishmentName,
            email: ownerEmail,
            establishmentId: sanitizedId,
            permissions: masterPermissions,
            professionalId: null,
            status: 'active',
            isOwnerMaster: true,
            role: 'owner',
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        res.status(201).json({ 
            message: 'Assinatura concluída e ambiente criado com sucesso!',
            establishmentId: sanitizedId,
            success: true
        });

    } catch (error) {
        console.error("Erro Crítico no Registro Público SaaS:", error);
        res.status(500).json({ message: 'Erro interno no servidor ao processar o registro.' });
    }
});

module.exports = router;