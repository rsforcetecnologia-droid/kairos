// routes/comandas.js

const express = require('express');
const router = require('express').Router();
const admin = require('firebase-admin');
// --- INÍCIO DA CORREÇÃO ---
const { verifyToken, hasAccess } = require('../middlewares/auth');

// Adiciona middlewares de segurança que estavam faltando
router.get('/:establishmentId', verifyToken, hasAccess, async (req, res) => {
// --- FIM DA CORREÇÃO ---

    const { establishmentId } = req.params;
    const { filterDate } = req.query;
    const { db } = req;

    try {
        const comandas = [];

        // --- INÍCIO DA LÓGICA DE PERMISSÃO ---
        const { role, professionalId: userProfessionalId, permissions } = req.user;
        // Verifica se o usuário tem a permissão para ver comandas de todos
        // Se permissions for null (Dono), canViewAll é true.
        const canViewAll = permissions === null || permissions['comandas-section']?.view_all_prof === true;
        // --- FIM DA LÓGICA DE PERMISSÃO ---


        // --- 1. BUSCAR COMANDAS ABERTAS (EM ATENDIMENTO) ---
        let openAppointmentsQuery = db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('status', '==', 'confirmed');

        // --- APLICA FILTRO DE PERMISSÃO ---
        if (role === 'employee' && !canViewAll) {
            if (!userProfessionalId) return res.status(200).json([]); // Funcionário sem ID não vê nada
            openAppointmentsQuery = openAppointmentsQuery.where('professionalId', '==', userProfessionalId);
        }
        // --- FIM FILTRO DE PERMISSÃO ---

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

        // --- 2. BUSCAR COMANDAS FINALIZADAS (PARA A DATA DO FILTRO) ---
        const targetDate = filterDate ? new Date(filterDate) : new Date();
        // Ajuste para garantir que a busca inclua o dia inteiro no fuso horário correto
        const startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
        const endOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate() + 1);

        // **CORREÇÃO APLICADA AQUI: Filtrar por 'transaction.paidAt'**
        let completedAppointmentsQuery = db.collection('appointments')
            .where('establishmentId', '==', establishmentId)
            .where('status', '==', 'completed')
            .where('transaction.paidAt', '>=', startOfDay)
            .where('transaction.paidAt', '<', endOfDay);

        // **CORREÇÃO APLICADA AQUI: Filtrar por 'transaction.paidAt'**
        let salesQuery = db.collection('sales')
            .where('establishmentId', '==', establishmentId)
            .where('transaction.paidAt', '>=', startOfDay)
            .where('transaction.paidAt', '<', endOfDay);

        // --- APLICA FILTRO DE PERMISSÃO ---
        if (role === 'employee' && !canViewAll && userProfessionalId) {
            completedAppointmentsQuery = completedAppointmentsQuery.where('professionalId', '==', userProfessionalId);
            salesQuery = salesQuery.where('professionalId', '==', userProfessionalId);
        }
        // --- FIM FILTRO DE PERMISSÃO ---

        const [completedAppointmentsSnapshot, salesSnapshot] = await Promise.all([
            completedAppointmentsQuery.get(),
            salesQuery.get()
        ]);

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
        // --- INÍCIO DA CORREÇÃO ---
        // Se for um erro de índice, envie a MENSAGEM ORIGINAL do Firebase
        if (error.message && error.message.includes('requires an index')) {
             return res.status(500).json({ message: error.message });
        }
        // --- FIM DA CORREÇÃO ---
        res.status(500).json({ message: "Ocorreu um erro no servidor ao buscar as comandas." });
    }
});


// Rota para buscar uma comanda específica por ID (útil para reabrir)
// (MODIFICADO) Adicionado verifyToken e hasAccess
router.get('/:comandaId', verifyToken, hasAccess, async (req, res) => {
    const { comandaId } = req.params;
    const { db } = req;
    // (NOVO) Pega dados do usuário
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

        // --- INÍCIO DA VERIFICAÇÃO DE PERMISSÃO ---
        // 1. Verifica se a comanda pertence ao estabelecimento
        if (data.establishmentId !== establishmentId) {
            return res.status(403).json({ message: "Acesso negado." });
        }

        // 2. Verifica se o funcionário pode ver esta comanda específica
        const canViewAll = permissions === null || permissions['comandas-section']?.view_all_prof === true;
        if (role === 'employee' && !canViewAll && data.professionalId !== userProfessionalId) {
            return res.status(403).json({ message: "Acesso negado a esta comanda específica." });
        }
        // --- FIM DA VERIFICAÇÃO DE PERMISSÃO ---

        res.status(200).json({ id: doc.id, type, ...data });

    } catch (error) {
        console.error("Erro ao buscar comanda por ID:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor." });
    }
});


module.exports = router;