// routes/blockages.js
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


// ####################################################################
// ### INÍCIO DA CORREÇÃO (Erro 500 e Índice) ###
// ####################################################################

// Listar bloqueios por período (Rota Corrigida)
router.get('/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    let { startDate, endDate, professionalId } = req.query; 

    try {
        const { db } = req;
        let query = db.collection('blockages')
            .where('establishmentId', '==', establishmentId);

        // --- LÓGICA DE FILTRO CORRIGIDA ---
        
        if (startDate) {
            // CASO 1: A tela de "Ausências" (ou "Agenda") enviou um startDate.
            
            // CORREÇÃO DE DATA: Apenas converte o ISO string. Não concatena nada.
            const start = new Date(startDate);
            // Se endDate não for fornecido, assume 1 ano
            const end = endDate ? new Date(endDate) : new Date(new Date(start).setFullYear(start.getFullYear() + 1));

            // Aplica filtro de datas
            query = query
                .where('startTime', '>=', start)
                .where('startTime', '<=', end);

            // CORREÇÃO DE ÍNDICE: A ordenação depende do filtro de profissional
            if (professionalId && professionalId !== 'all') {
                // Se um profissional específico for selecionado:
                query = query.where('professionalId', '==', professionalId);
                // A ordenação DEVE começar pelo campo de igualdade ('professionalId')
                query = query
                    .orderBy('professionalId', 'asc')
                    .orderBy('startTime', 'asc');
            } else {
                // Se for "Todos os Profissionais":
                // A ordenação é simples, apenas pelo campo de desigualdade.
                query = query.orderBy('startTime', 'asc');
            }

        } else {
            // CASO 2: A tela "Meu Perfil" não enviou startDate.
            // Filtra por bloqueios que TERMINAM a partir de agora.
            const now = new Date();
            
            query = query.where('endTime', '>=', now);

            // CORREÇÃO DE ÍNDICE (para o "Meu Perfil"):
            if (professionalId && professionalId !== 'all') {
                query = query.where('professionalId', '==', professionalId);
                query = query
                    .orderBy('professionalId', 'asc')
                    .orderBy('endTime', 'asc');
            } else {
                query = query.orderBy('endTime', 'asc');
            }
        }
        // --- FIM DA LÓGICA DE FILTRO ---

        const snapshot = await query.get();
        if (snapshot.empty) return res.status(200).json([]);

        const formattedBlockages = snapshot.docs.map(doc => {
            const b = doc.data();
            return {
                id: doc.id,
                ...b,
                startTime: b.startTime.toDate().toISOString(),
                endTime: b.endTime.toDate().toISOString()
            };
        });
        
        res.status(200).json(formattedBlockages);
        
    } catch (error) {
        console.error("Erro ao listar bloqueios por data:", error);
        if (error.message && error.message.includes('requires an index')) {
            const detailedMessage = `O Firestore precisa de um índice. Verifique o log do servidor para o link de criação. (Erro: ${error.message})`;
            return res.status(500).json({ message: detailedMessage });
        }
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao listar bloqueios.' });
    }
});

// ####################################################################
// ### FIM DA CORREÇÃO ###
// ####################################################################


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