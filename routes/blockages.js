//routes/blockages.js
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Criar um novo bloqueio de horário (ou múltiplos em um período)
router.post('/', async (req, res) => {
    const { professionalId, establishmentId, startTime, endTime, reason } = req.body;
    if (!professionalId || !establishmentId || !startTime || !endTime) {
        return res.status(400).json({ message: 'professionalId, establishmentId, startTime e endTime são obrigatórios.' });
    }
    try {
        const { db } = req;
        const batch = db.batch();
        
        const startDate = new Date(startTime);
        const endDate = new Date(endTime);
        
        // Loop para criar um bloqueio para cada dia no intervalo
        let currentDate = new Date(startDate.toISOString().split('T')[0]);
        const finalDate = new Date(endDate.toISOString().split('T')[0]);

        while(currentDate <= finalDate) {
            const docRef = db.collection('blockages').doc();
            
            const dayStartTime = new Date(currentDate);
            dayStartTime.setUTCHours(startDate.getUTCHours(), startDate.getUTCMinutes(), 0, 0);

            const dayEndTime = new Date(currentDate);
            dayEndTime.setUTCHours(endDate.getUTCHours(), endDate.getUTCMinutes(), 0, 0);

            const newBlockage = {
                professionalId,
                establishmentId,
                startTime: admin.firestore.Timestamp.fromDate(dayStartTime),
                endTime: admin.firestore.Timestamp.fromDate(dayEndTime),
                reason: reason || 'Ausência'
            };
            batch.set(docRef, newBlockage);

            // Avança para o próximo dia
            currentDate.setDate(currentDate.getDate() + 1);
        }

        await batch.commit();
        res.status(201).json({ message: 'Período de ausência criado com sucesso.' });

    } catch (error) {
        console.error("Erro ao criar bloqueio:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});


// Listar bloqueios por período
router.get('/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    
    // --- INÍCIO DA CORREÇÃO ---
    let { startDate, endDate, professionalId } = req.query; // Mudar para 'let'

    // Define padrões se 'startDate' ou 'endDate' não forem fornecidos
    if (!startDate) {
        // Se não houver data de início, assume hoje (sem horas)
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
    }
    if (!endDate) {
        // Se não houver data de fim, assume 1 ano a partir da data de início
        const oneYearFromStart = new Date(startDate);
        oneYearFromStart.setFullYear(oneYearFromStart.getFullYear() + 1);
        endDate = oneYearFromStart;
    }
    // --- FIM DA CORREÇÃO ---

    try {
        const { db } = req;

        // --- INÍCIO DA CORREÇÃO DA QUERY ---
        // Converte as strings ISO (ou objetos Date) para objetos Date do Firebase
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        let query = db.collection('blockages')
            .where('establishmentId', '==', establishmentId)
            // A query correta é buscar onde o início do bloqueio está DENTRO do período
            .where('startTime', '>=', start)
            .where('startTime', '<=', end);
        
        if (professionalId && professionalId !== 'all') {
            query = query.where('professionalId', '==', professionalId);
        }
        
        // Adiciona uma ordenação para consistência
        query = query.orderBy('startTime', 'asc');

        const snapshot = await query.get();
        if (snapshot.empty) return res.status(200).json([]);

        // A filtragem em memória que existia foi removida pois a query do DB está correta
        const formattedBlockages = snapshot.docs.map(doc => {
            const b = doc.data();
            return {
                id: doc.id,
                ...b,
                startTime: b.startTime.toDate().toISOString(),
                endTime: b.endTime.toDate().toISOString()
            };
        });
        // --- FIM DA CORREÇÃO DA QUERY ---
        
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

// ROTA PARA EXCLUSÃO EM LOTE DE BLOQUEIOS
router.post('/batch-delete', async (req, res) => {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: 'Um array de IDs é obrigatório.' });
    }
    try {
        const { db } = req;
        const batch = db.batch();
        ids.forEach(id => {
            const docRef = db.collection('blockages').doc(id);
            batch.delete(docRef);
        });
        await batch.commit();
        res.status(200).json({ message: `${ids.length} bloqueios foram removidos com sucesso.` });
    } catch (error) {
        console.error("Erro ao remover bloqueios em lote:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
});


module.exports = router;