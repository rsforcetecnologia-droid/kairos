const express = require('express');
const router = express.Router();

// Endpoint público para verificar horários disponíveis
router.get('/', async (req, res) => {
    const { establishmentId, professionalId, serviceIds, date } = req.query;
    if (!establishmentId || !professionalId || !serviceIds || !date) {
        return res.status(400).json({ message: 'establishmentId, professionalId, serviceIds e date são obrigatórios.' });
    }
    try {
        const { db } = req;
        const serviceIdArray = serviceIds.split(',');
        const serviceDocs = await Promise.all(serviceIdArray.map(id => db.collection('services').doc(id).get()));
        let totalDuration = 0;
        for (const doc of serviceDocs) {
            if (!doc.exists) return res.status(404).json({ message: `Serviço com ID ${doc.id} não encontrado.` });
            const serviceData = doc.data();
            totalDuration += (serviceData.duration || 0) + (serviceData.bufferTime || 0);
        }
        if (totalDuration === 0) return res.status(200).json([]);

        const professionalDoc = await db.collection('professionals').doc(professionalId).get();
        if (!professionalDoc.exists || !professionalDoc.data().workingHours) return res.status(200).json([]);
        
        const workingHours = professionalDoc.data().workingHours;
        const startOfDayInBrasilia = new Date(`${date}T00:00:00.000-03:00`);
        const endOfDayInBrasilia = new Date(`${date}T23:59:59.999-03:00`);
        const dayOfWeek = startOfDayInBrasilia.getDay();
        const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const todayConfig = workingHours[dayNames[dayOfWeek]];

        if (!todayConfig || !todayConfig.active || !todayConfig.start || !todayConfig.end) {
            return res.status(200).json([]);
        }

        const [appointmentsSnapshot, blockagesSnapshot] = await Promise.all([
            db.collection('appointments').where('professionalId', '==', professionalId).where('startTime', '>=', startOfDayInBrasilia).where('startTime', '<=', endOfDayInBrasilia).get(),
            db.collection('blockages').where('professionalId', '==', professionalId).where('startTime', '<=', endOfDayInBrasilia).get()
        ]);
        const busySlots = [
            ...appointmentsSnapshot.docs.map(doc => ({ start: doc.data().startTime.toDate(), end: doc.data().endTime.toDate() })),
            ...blockagesSnapshot.docs.filter(doc => doc.data().endTime.toDate() > startOfDayInBrasilia).map(doc => ({ start: doc.data().startTime.toDate(), end: doc.data().endTime.toDate() }))
        ];

        const availableSlots = [];
        const slotInterval = 30; // ✅ ALTERADO DE 15 PARA 30
        const workStart = new Date(`${date}T${todayConfig.start}:00-03:00`);
        const workEnd = new Date(`${date}T${todayConfig.end}:00-03:00`);
        let breakStart, breakEnd;
        const hasBreak = todayConfig.breakStart && todayConfig.breakEnd;
        if (hasBreak) {
            breakStart = new Date(`${date}T${todayConfig.breakStart}:00-03:00`);
            breakEnd = new Date(`${date}T${todayConfig.breakEnd}:00-03:00`);
        }
        const nowInBrasilia = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
        let currentSlot = new Date(workStart);

        while (currentSlot < workEnd) {
            const potentialSlotStart = new Date(currentSlot);
            const potentialSlotEnd = new Date(potentialSlotStart.getTime() + totalDuration * 60000);
            if (potentialSlotStart < nowInBrasilia) {
                currentSlot.setMinutes(currentSlot.getMinutes() + slotInterval);
                continue;
            }
            if (potentialSlotEnd > workEnd) break;
            
            let isOverlapping = false;
            if (hasBreak && (potentialSlotStart < breakEnd && potentialSlotEnd > breakStart)) isOverlapping = true;
            if (!isOverlapping) {
                for (const busy of busySlots) {
                    if (potentialSlotStart < busy.end && potentialSlotEnd > busy.start) {
                        isOverlapping = true;
                        break;
                    }
                }
            }
            if (!isOverlapping) {
                availableSlots.push(potentialSlotStart.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' }));
            }
            currentSlot.setMinutes(currentSlot.getMinutes() + slotInterval);
        }
        res.status(200).json(availableSlots);
    } catch (error) {
        console.error("Erro ao verificar disponibilidade:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao verificar a disponibilidade.' });
    }
});

// ✅ ESSA LINHA RESOLVE O ERRO
module.exports = router;
