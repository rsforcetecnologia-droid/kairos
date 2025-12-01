// routes/comandas.js

const express = require('express');
const router = require('express').Router();
const admin = require('firebase-admin');
const { verifyToken, hasAccess } = require('../middlewares/auth');

// Rota para buscar comandas (Abertas e Finalizadas)
router.get('/:establishmentId', verifyToken, hasAccess, async (req, res) => {
    const { establishmentId } = req.params;
    const { date, filterDate } = req.query;
    const { db } = req;

    try {
        const comandas = [];

        // --- LÓGICA DE PERMISSÃO ---
        const { role, professionalId: userProfessionalId, permissions } = req.user;
        const canViewAll = permissions === null || permissions['comandas-section']?.view_all_prof === true;

        // --- 1. BUSCAR COMANDAS ABERTAS (EM ATENDIMENTO) ---
        let openAppointmentsQuery = db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('status', '==', 'confirmed');

        if (role === 'employee' && !canViewAll) {
            if (!userProfessionalId) return res.status(200).json([]);
            openAppointmentsQuery = openAppointmentsQuery.where('professionalId', '==', userProfessionalId);
        }

        const openAppointmentsSnapshot = await openAppointmentsQuery.get();

        openAppointmentsSnapshot.forEach(doc => {
            const data = doc.data();
            comandas.push({
                id: doc.id,
                ...data,
                startTime: data.startTime.toDate().toISOString(),
                type: 'appointment',
            });
        });

        // --- 2. BUSCAR COMANDAS FINALIZADAS (FILTRO DE DATA) ---
        
        const queryDateStr = date || filterDate;
        let startOfDay, endOfDay;

        if (queryDateStr) {
            // Força o intervalo UTC para cobrir o dia inteiro independente do fuso
            startOfDay = new Date(`${queryDateStr}T00:00:00.000Z`);
            endOfDay = new Date(`${queryDateStr}T23:59:59.999Z`);
        } else {
            const now = new Date();
            now.setHours(0,0,0,0);
            startOfDay = now;
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            endOfDay = tomorrow;
        }

        // Query em Appointments (Agendamentos Finalizados)
        let completedAppointmentsQuery = db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('status', '==', 'completed')
            .where('transaction.paidAt', '>=', startOfDay)
            .where('transaction.paidAt', '<=', endOfDay);

        // Query em Sales (APENAS Vendas Avulsas)
        // CORREÇÃO: Adicionado .where('type', '==', 'walk-in') para não duplicar agendamentos
        let salesQuery = db.collection('sales')
            .where('establishmentId', '==', establishmentId)
            .where('type', '==', 'walk-in') 
            .where('transaction.paidAt', '>=', startOfDay)
            .where('transaction.paidAt', '<=', endOfDay);

        // Aplica permissões nas queries finalizadas
        if (role === 'employee' && !canViewAll && userProfessionalId) {
            completedAppointmentsQuery = completedAppointmentsQuery.where('professionalId', '==', userProfessionalId);
            salesQuery = salesQuery.where('professionalId', '==', userProfessionalId);
        }

        const [completedAppointmentsSnapshot, salesSnapshot] = await Promise.all([
            completedAppointmentsQuery.get(),
            salesQuery.get()
        ]);

        const processCompletedDoc = (doc, typeDefault) => {
             const data = doc.data();
             const paidAt = data.transaction && data.transaction.paidAt ? data.transaction.paidAt.toDate().toISOString() : new Date().toISOString();
             
             comandas.push({
                id: doc.id,
                ...data,
                startTime: paidAt, 
                status: 'completed',
                type: data.type || typeDefault,
            });
        };

        completedAppointmentsSnapshot.forEach(doc => processCompletedDoc(doc, 'appointment'));
        salesSnapshot.forEach(doc => processCompletedDoc(doc, 'walk-in'));
        
        // Ordena por data (mais recentes primeiro)
        comandas.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

        res.status(200).json(comandas);

    } catch (error) {
        console.error("Erro ao buscar comandas:", error);
        if (error.message && error.message.includes('requires an index')) {
             return res.status(500).json({ message: error.message, code: 'INDEX_REQUIRED' });
        }
        res.status(500).json({ message: "Ocorreu um erro no servidor." });
    }
});

// Rota para buscar uma comanda específica por ID
router.get('/:comandaId', verifyToken, hasAccess, async (req, res) => {
    const { comandaId } = req.params;
    const { db } = req;
    const { establishmentId, role, professionalId: userProfessionalId, permissions } = req.user;

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

        if (data.establishmentId !== establishmentId) {
            return res.status(403).json({ message: "Acesso negado." });
        }

        const canViewAll = permissions === null || permissions['comandas-section']?.view_all_prof === true;
        if (role === 'employee' && !canViewAll && data.professionalId !== userProfessionalId) {
            return res.status(403).json({ message: "Acesso negado a esta comanda específica." });
        }

        res.status(200).json({ id: doc.id, type, ...data });

    } catch (error) {
        console.error("Erro ao buscar comanda por ID:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor." });
    }
});

module.exports = router;