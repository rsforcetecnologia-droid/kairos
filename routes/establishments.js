// routes/establishments.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { verifyToken, isOwner, hasAccess } = require('../middlewares/auth');

/**
 * Rota GET para buscar detalhes de UM estabelecimento.
 * Protegida por token e permissão de acesso.
 */
router.get('/:establishmentId', verifyToken, hasAccess, async (req, res) => {
    const { establishmentId } = req.params;
    const { db } = req;

    try {
        const establishmentRef = db.collection('establishments').doc(establishmentId);
        const doc = await establishmentRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Estabelecimento não encontrado.' });
        }

        // Garante que o usuário só pode ver o seu próprio estabelecimento
        if (doc.id !== req.user.establishmentId) {
             return res.status(403).json({ message: 'Acesso negado.' });
        }

        res.status(200).json({ id: doc.id, ...doc.data() });

    } catch (error) {
        console.error("Erro ao buscar detalhes do estabelecimento:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

/**
 * Rota PUT para atualizar os detalhes de UM estabelecimento.
 * Protegida por token, apenas o DONO (owner) pode fazer isso.
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
// ### INÍCIO DA NOVA ROTA (ATIVAR/DESATIVAR AGENDAMENTO) ###
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
// ### FIM DA NOVA ROTA ###
// ####################################################################


module.exports = router;