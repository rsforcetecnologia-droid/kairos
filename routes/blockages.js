//routes/blockages.js
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Criar um novo bloqueio de horário
router.post('/', async (req, res) => {
    const { professionalId, establishmentId, startTime, endTime, reason } = req.body;
    if (!professionalId || !establishmentId || !startTime || !endTime) {
        return res.status(400).json({ message: 'professionalId, establishmentId, startTime e endTime são obrigatórios.' });
    }
    try {
        const { db } = req;
        const newBlockage = {
            professionalId,
            establishmentId,
            startTime: admin.firestore.Timestamp.fromDate(new Date(startTime)),
            endTime: admin.firestore.Timestamp.fromDate(new Date(endTime)),
            reason: reason || 'Ausência'
        };
        const docRef = await db.collection('blockages').add(newBlockage);
        res.status(201).json({ message: 'Período de ausência criado com sucesso.', blockageId: docRef.id });
    } catch (error) {
        console.error("Erro ao criar bloqueio:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// Listar bloqueios por período
router.get('/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    const { startDate, endDate, professionalId } = req.query;
    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'startDate e endDate são obrigatórios.' });
    }
    try {
        const { db } = req;
        let query = db.collection('blockages')
            .where('establishmentId', '==', establishmentId)
            .where('startTime', '<=', new Date(endDate));
        if (professionalId && professionalId !== 'all') {
            query = query.where('professionalId', '==', professionalId);
        }
        const snapshot = await query.get();
        if (snapshot.empty) return res.status(200).json([]);
        const blockages = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(blockage => blockage.endTime.toDate() >= new Date(startDate));
        const formattedBlockages = blockages.map(b => ({
            ...b,
            startTime: b.startTime.toDate().toISOString(),
            endTime: b.endTime.toDate().toISOString()
        }));
        res.status(200).json(formattedBlockages);
    } catch (error) {
        console.error("Erro ao listar bloqueios por data:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao listar bloqueios.' });
    }
});

// Deletar um bloqueio
router.delete('/:blockageId', async (req, res) => {
    const { blockageId } = req.params;
    try {
        const { db } = req;
        await db.collection('blockages').doc(blockageId).delete();
        res.status(200).json({ message: 'Bloqueio removido com sucesso.' });
    } catch (error) {
        console.error("Erro ao remover bloqueio:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});

// ✅ ESSA LINHA RESOLVE O ERRO
module.exports = router;