// routes/comandas.js

const express = require('express');
const router = require('express').Router();
const admin = require('firebase-admin');

// Rota para buscar as "comandas"
router.get('/:establishmentId', async (req, res) => {
    const { establishmentId } = req.params;
    const { filterDate } = req.query;
    const { db } = req;

    try {
        const comandas = [];

        // --- 1. BUSCAR COMANDAS ABERTAS (EM ATENDIMENTO) ---
        const openAppointmentsSnapshot = await db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('status', '==', 'confirmed')
            .get();

        openAppointmentsSnapshot.forEach(doc => {
            const data = doc.data();
            comandas.push({
                id: doc.id,
                ...data,
                startTime: data.startTime.toDate().toISOString(),
                type: 'appointment',
            });
        });

        // --- 2. BUSCAR COMANDAS FINALIZADAS (PARA A DATA DO FILTRO) ---
        const targetDate = filterDate ? new Date(filterDate) : new Date();
        // Ajuste para garantir que a busca inclua o dia inteiro no fuso horário correto
        const startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
        const endOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate() + 1);

        // **CORREÇÃO APLICADA AQUI: Filtrar por 'transaction.paidAt'**
        const completedAppointmentsSnapshot = await db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('status', '==', 'completed')
            .where('transaction.paidAt', '>=', startOfDay)
            .where('transaction.paidAt', '<', endOfDay)
            .get();

        // **CORREÇÃO APLICADA AQUI: Filtrar por 'transaction.paidAt'**
        const salesSnapshot = await db.collection('sales')
            .where('establishmentId', '==', establishmentId)
            .where('transaction.paidAt', '>=', startOfDay)
            .where('transaction.paidAt', '<', endOfDay)
            .get();

        const processCompletedDoc = (doc) => {
             const data = doc.data();
             comandas.push({
                id: doc.id,
                ...data,
                startTime: data.startTime.toDate().toISOString(),
                status: 'completed', // Garante o status correto
                type: data.type || 'appointment',
            });
        };

        completedAppointmentsSnapshot.forEach(processCompletedDoc);
        salesSnapshot.forEach(doc => {
             if (doc.data().type === 'walk-in') {
                processCompletedDoc(doc);
            }
        });
        
        // Ordena por data de início, as mais recentes primeiro
        comandas.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

        res.status(200).json(comandas);

    } catch (error) {
        console.error("Erro ao buscar comandas:", error);
        if (error.message && error.message.includes('requires an index')) {
             return res.status(500).json({ message: "O Firestore precisa de um índice para esta consulta. Verifique o log do servidor para o link de criação." });
        }
        res.status(500).json({ message: "Ocorreu um erro no servidor ao buscar as comandas." });
    }
});


// Rota para buscar uma comanda específica por ID (útil para reabrir)
router.get('/:comandaId', async (req, res) => {
    const { comandaId } = req.params;
    const { db } = req;

    try {
        let doc = await db.collection('appointments').doc(comandaId).get();
        let type = 'appointment';

        if (!doc.exists) {
            doc = await db.collection('sales').doc(comandaId).get();
            type = 'walk-in';
        }

        if (!doc.exists) {
            return res.status(404).json({ message: "Comanda não encontrada." });
        }
        
        const data = doc.data();
        res.status(200).json({ id: doc.id, type, ...data });

    } catch (error) {
        console.error("Erro ao buscar comanda por ID:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor." });
    }
});


module.exports = router;