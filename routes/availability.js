const express = require('express');
const router = express.Router();

// Função auxiliar para obter o offset (ex: "-04:00") a partir do nome do fuso (ex: "America/Manaus")
function getTimezoneOffset(date, timezone) {
    try {
        const str = date.toLocaleString('en-US', { timeZone: timezone, timeZoneName: 'longOffset' });
        const match = str.match(/GMT([+-]\d{2}:\d{2})/);
        return match ? match[1] : '-03:00'; // Fallback para Brasília
    } catch (e) {
        return '-03:00';
    }
}

// Endpoint público para verificar horários disponíveis
router.get('/', async (req, res) => {
    const { establishmentId, professionalId, serviceIds, date } = req.query;
    if (!establishmentId || !professionalId || !serviceIds || !date) {
        return res.status(400).json({ message: 'establishmentId, professionalId, serviceIds e date são obrigatórios.' });
    }
    try {
        const { db } = req;

        // 1. Busca configurações e FUSO HORÁRIO do estabelecimento
        const establishmentDoc = await db.collection('establishments').doc(establishmentId).get();
        if (!establishmentDoc.exists) {
            return res.status(404).json({ message: 'Estabelecimento não encontrado.' });
        }
        const establishmentData = establishmentDoc.data();
        const slotInterval = establishmentData.slotInterval || 30;
        const timezone = establishmentData.timezone || 'America/Sao_Paulo'; // <--- Fuso dinâmico

        // 2. Calcula o offset correto (ex: -04:00 para Manaus) para o dia solicitado
        // Isso é importante porque o offset pode mudar (horário de verão em alguns países)
        const requestDateObj = new Date(date + 'T12:00:00Z'); // Meio-dia UTC para referência
        const tzOffset = getTimezoneOffset(requestDateObj, timezone);

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
        
        // 3. Define início e fim do dia usando o OFFSET DO ESTABELECIMENTO
        const startOfDay = new Date(`${date}T00:00:00.000${tzOffset}`);
        const endOfDay = new Date(`${date}T23:59:59.999${tzOffset}`);
        
        const dayOfWeek = startOfDay.getDay();
        const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const todayConfig = workingHours[dayNames[dayOfWeek]];

        if (!todayConfig || !todayConfig.active || !todayConfig.start || !todayConfig.end) {
            return res.status(200).json([]);
        }

        const [appointmentsSnapshot, blockagesSnapshot] = await Promise.all([
            db.collection('appointments').where('professionalId', '==', professionalId).where('startTime', '>=', startOfDay).where('startTime', '<=', endOfDay).get(),
            db.collection('blockages').where('professionalId', '==', professionalId).where('startTime', '<=', endOfDay).get()
        ]);
        const busySlots = [
            ...appointmentsSnapshot.docs.map(doc => ({ start: doc.data().startTime.toDate(), end: doc.data().endTime.toDate() })),
            ...blockagesSnapshot.docs.filter(doc => doc.data().endTime.toDate() > startOfDay).map(doc => ({ start: doc.data().startTime.toDate(), end: doc.data().endTime.toDate() }))
        ];

        const availableSlots = [];
        
        // 4. Define horários de trabalho usando o OFFSET DO ESTABELECIMENTO
        const workStart = new Date(`${date}T${todayConfig.start}:00${tzOffset}`);
        const workEnd = new Date(`${date}T${todayConfig.end}:00${tzOffset}`);
        let breakStart, breakEnd;
        const hasBreak = todayConfig.breakStart && todayConfig.breakEnd;
        if (hasBreak) {
            breakStart = new Date(`${date}T${todayConfig.breakStart}:00${tzOffset}`);
            breakEnd = new Date(`${date}T${todayConfig.breakEnd}:00${tzOffset}`);
        }

        // 5. Verifica "agora" no fuso do estabelecimento para não mostrar horários passados
        // Criamos uma data comparável convertendo o horário atual para o fuso do estabelecimento
        const nowString = new Date().toLocaleString("en-US", { timeZone: timezone });
        const nowInEstablishment = new Date(nowString); 
        
        let currentSlot = new Date(workStart);

        while (currentSlot < workEnd) {
            const potentialSlotStart = new Date(currentSlot);
            const potentialSlotEnd = new Date(potentialSlotStart.getTime() + totalDuration * 60000);
            
            // Comparação de horário passado
            if (potentialSlotStart < nowInEstablishment) {
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
                // 6. Retorna o horário formatado no FUSO DO ESTABELECIMENTO
                availableSlots.push(potentialSlotStart.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: timezone }));
            }
            currentSlot.setMinutes(currentSlot.getMinutes() + slotInterval);
        }
        res.status(200).json(availableSlots);
    } catch (error) {
        console.error("Erro ao verificar disponibilidade:", error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor ao verificar a disponibilidade.' });
    }
});

module.exports = router;