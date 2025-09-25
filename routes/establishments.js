const express = require('express');
const router = express.Router();
const { verifyToken, isOwner } = require('../middlewares/auth');

// Rota pública para obter detalhes do estabelecimento
router.get('/:establishmentId/details', async (req, res) => {
    try {
        const { establishmentId } = req.params;
        const { db } = req;
        const doc = await db.collection('establishments').doc(establishmentId).get();
        if (!doc.exists) {
            return res.status(404).json({ message: "Estabelecimento não encontrado." });
        }
        
        const establishmentData = doc.data();

        // NOVO: Verificação de status
        // Se o estabelecimento não estiver ativo, bloqueia o acesso público.
        if (establishmentData.status !== 'active') {
            return res.status(403).json({ message: "Este estabelecimento não está disponível no momento." });
        }

        res.status(200).json(establishmentData);
    } catch (error) {
        console.error("Erro ao buscar detalhes do estabelecimento:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Rota protegida (dono) para atualizar detalhes do estabelecimento
router.put('/:establishmentId/details', verifyToken, isOwner, async (req, res) => {
    try {
        const { establishmentId } = req.params;
        const data = req.body;
        const { db } = req;
        
        if (req.user.establishmentId !== establishmentId) {
            return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para editar este estabelecimento.' });
        }
        
        const establishmentRef = db.collection('establishments').doc(establishmentId);
        await establishmentRef.update(data);
        res.status(200).json({ message: "Dados do estabelecimento atualizados com sucesso." });
    } catch (error) {
        console.error("Erro ao atualizar detalhes do estabelecimento:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

module.exports = router;