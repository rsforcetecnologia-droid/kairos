// routes/establishments.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
// (MODIFICADO) 'hasAccess' é removido da rota GET, mas mantido para as outras
const { verifyToken, isOwner, hasAccess } = require('../middlewares/auth');

/**
 * Rota GET para buscar detalhes de UM estabelecimento.
 * (MODIFICADA PARA SUPORTAR ACESSO PÚBLICO E PRIVADO)
 */
router.get('/:establishmentId', async (req, res) => { // Removido verifyToken e hasAccess
    const { establishmentId } = req.params;
    const { db } = req; // Assumindo que addFirebaseInstances está no index.js

    try {
        const establishmentRef = db.collection('establishments').doc(establishmentId);
        const doc = await establishmentRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Estabelecimento não encontrado.' });
        }
        
        const data = doc.data();

        // Verifica se é um usuário autenticado (dono/funcionário)
        const { authorization } = req.headers;
        let isAuthenticated = false;
        if (authorization && authorization.startsWith('Bearer ')) {
            const token = authorization.split('Bearer ')[1];
            try {
                const decodedToken = await admin.auth().verifyIdToken(token);
                // Verifica se o token pertence a este estabelecimento
                if (decodedToken.establishmentId === establishmentId) {
                    isAuthenticated = true;
                }
            } catch (error) {
                isAuthenticated = false; // Token inválido ou expirado
            }
        }

        // Se for autenticado (vindo do painel admin), retorna todos os dados
        if (isAuthenticated) {
            // Garante que o usuário só pode ver o seu próprio estabelecimento
            // (Esta verificação é feita pelo decodedToken.establishmentId acima)
            return res.status(200).json({ id: doc.id, ...data });
        }
        
        // Se for acesso público (cliente.html):
        
        // 1. Verifica se o agendamento público está habilitado
        if (data.publicBookingEnabled === false) {
             return res.status(403).json({ message: 'Este estabelecimento não está aceitando agendamentos online no momento.' });
        }

        // 2. Retorna apenas dados públicos e seguros
        const publicData = {
            id: doc.id,
            name: data.name,
            logo: data.logo || null,
            themeColor: data.themeColor || 'indigo',
            welcomeMessage: data.welcomeMessage || 'Seja bem-vindo(a)!'
        };
        
        res.status(200).json(publicData);

    } catch (error) {
        console.error("Erro ao buscar detalhes do estabelecimento:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});


/**
 * Rota PUT para atualizar os detalhes de UM estabelecimento.
 * Protegida por token, apenas o DONO (owner) pode fazer isso.
 * (Esta rota permanece protegida e inalterada)
 */
router.put('/:establishmentId', verifyToken, isOwner, async (req, res) => {
    const { establishmentId } = req.params;
    const { db } = req;
    const updatedData = req.body; // Dados vêm do frontend

    try {
        const establishmentRef = db.collection('establishments').doc(establishmentId);
        const doc = await establishmentRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Estabelecimento não encontrado.' });
        }

        // Garante que o dono só pode editar o seu próprio estabelecimento
        if (doc.id !== req.user.establishmentId) {
             return res.status(403).json({ message: 'Acesso negado.' });
        }

        // Atualiza o documento
        // O 'set' com 'merge: true' é mais seguro pois apenas atualiza os campos enviados
        await establishmentRef.set(updatedData, { merge: true });

        res.status(200).json({ message: 'Estabelecimento atualizado com sucesso.' });

    } catch (error) {
        console.error("Erro ao atualizar estabelecimento:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// ####################################################################
// ### ROTA DE STATUS DE AGENDAMENTO (JÁ EXISTENTE) ###
// ####################################################################

/**
 * Rota PATCH para atualizar SOMENTE o status do agendamento público.
 * Protegida por token, apenas o DONO (owner) pode fazer isso.
 */
router.patch('/:establishmentId/booking-status', verifyToken, isOwner, async (req, res) => {
    const { establishmentId } = req.params;
    const { db } = req;
    const { publicBookingEnabled } = req.body; // Espera: { "publicBookingEnabled": true } ou { "publicBookingEnabled": false }

    // Validação
    if (typeof publicBookingEnabled !== 'boolean') {
        return res.status(400).json({ message: 'O valor de "publicBookingEnabled" deve ser um booleano (true/false).' });
    }

    try {
        const establishmentRef = db.collection('establishments').doc(establishmentId);
        const doc = await establishmentRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Estabelecimento não encontrado.' });
        }

        // Garante que o dono só pode editar o seu próprio estabelecimento
        if (doc.id !== req.user.establishmentId) {
             return res.status(403).json({ message: 'Acesso negado.' });
        }

        // Atualiza apenas o campo 'publicBookingEnabled'
        await establishmentRef.update({
            publicBookingEnabled: publicBookingEnabled
        });

        res.status(200).json({ message: `Agendamento online ${publicBookingEnabled ? 'ativado' : 'desativado'} com sucesso.` });

    } catch (error) {
        console.error("Erro ao atualizar status do agendamento:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// ####################################################################
// ### ROTA CORRIGIDA PARA ALTERAR E-MAIL (CAUSA DO 404) ###
// ####################################################################

/**
 * (NOVA ROTA ADICIONADA) Rota PATCH para atualizar SOMENTE o e-mail do proprietário.
 * Protegida por token, apenas o DONO (owner) pode fazer isso.
 */
router.patch('/:establishmentId/owner-email', verifyToken, isOwner, async (req, res) => {
    const { establishmentId } = req.params;
    const { db } = req;
    const { newEmail } = req.body;

    // Validação
    if (!newEmail || typeof newEmail !== 'string') {
        return res.status(400).json({ message: 'O "newEmail" é obrigatório.' });
    }

    // Verifica se o ID do token corresponde ao ID da rota
    if (establishmentId !== req.user.establishmentId) {
        return res.status(403).json({ message: 'Acesso negado.' });
    }

    try {
        const establishmentRef = db.collection('establishments').doc(establishmentId);
        
        // Atualiza apenas o campo 'ownerEmail' no Firestore
        await establishmentRef.update({
            ownerEmail: newEmail
        });

        res.status(200).json({ message: `E-mail do proprietário atualizado com sucesso.` });

    } catch (error) {
        console.error("Erro ao atualizar e-mail do proprietário:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});


module.exports = router;