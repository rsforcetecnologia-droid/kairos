// routes/publicRegister.js (Atualizado com Data de Vencimento)
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const { verifyToken } = require('../middlewares/auth');

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
// ### ROTA DE CRIAÇÃO DO AMBIENTE DO CLIENTE (TENANT) ###
// ####################################################################

router.post('/', verifyToken, async (req, res) => {
    
    const userRole = req.user.role || '';
    if (userRole !== 'admin' && userRole !== 'superadmin' && userRole !== 'super_admin') {
         return res.status(403).json({ message: 'Acesso negado. Apenas administradores master podem criar novos clientes.' });
    }

    const { 
        establishmentName, 
        establishmentId, 
        ownerEmail, 
        ownerPassword,
        ownerName,      
        documentInfo,   
        phone,          
        planId,         
        isNetwork,      
        timezone 
    } = req.body;
    
    if (!establishmentId || !establishmentName || !ownerEmail || !ownerPassword || !planId) {
        return res.status(400).json({ message: 'Campos obrigatórios ausentes. Verifique Nome, ID, Email, Senha e Plano.' });
    }
    
    if (ownerPassword.length < 6) {
        return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres.' });
    }

    const sanitizedId = establishmentId.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (sanitizedId.length === 0) {
          return res.status(400).json({ message: 'ID do estabelecimento inválido. Use apenas letras e números.' });
    }

    try {
        const { db, auth } = req;
        const establishmentRef = db.collection('establishments').doc(sanitizedId);

        const existingEstablishment = await establishmentRef.get();
        if (existingEstablishment.exists) {
             return res.status(409).json({ message: `O ID de acesso '${sanitizedId}' já está em uso. Por favor, escolha outro.` });
        }

        let allowedModules = {};
        const planDoc = await db.collection('saas_plans').doc(planId).get();
        
        if (planDoc.exists) {
            allowedModules = planDoc.data().allowedModules || {};
        } else {
            return res.status(400).json({ message: 'O plano selecionado não foi encontrado na base de dados.' });
        }
        
        const userRecord = await auth.createUser({
            email: ownerEmail,
            password: ownerPassword,
            displayName: ownerName || establishmentName, 
        });
        
        // 🔄 CORREÇÃO: Calcula 30 dias de acesso padrão a partir de hoje
        const initialExpiryDate = new Date();
        initialExpiryDate.setDate(initialExpiryDate.getDate() + 30);

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
            isNetwork: Boolean(isNetwork),
            status: 'active', 
            planId: planId, 
            modules: allowedModules, 
            timezone: timezone || 'America/Sao_Paulo', 
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            publicBookingEnabled: false,
            subscription: {
                planId: planId,
                status: 'active',
                isManualAdmin: true,
                // 🔄 CORREÇÃO: Salvamos a data no formato nativo do Firestore
                expiryDate: admin.firestore.Timestamp.fromDate(initialExpiryDate)
            }
        };

        await establishmentRef.set(establishmentData);

        await auth.setCustomUserClaims(userRecord.uid, { 
            role: 'owner', 
            establishmentId: sanitizedId 
        });

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
            message: 'Ambiente do cliente criado com sucesso!',
            establishmentId: sanitizedId
        });

    } catch (error) {
        console.error("Erro ao criar ambiente do cliente:", error);
        
        if (error.code === 'auth/email-already-exists') {
            return res.status(409).json({ message: 'Este e-mail já está sendo utilizado por outro usuário.' });
        }
        
        res.status(500).json({ message: error.message || 'Erro interno no servidor.' });
    }
});

module.exports = router;