const express = require('express');
const router = express.Router();

// Função auxiliar para obter o offset (ex: "-04:00")
function getTimezoneOffset(date, timezone) {
    try {
        const str = date.toLocaleString('en-US', { timeZone: timezone, timeZoneName: 'longOffset' });
        const match = str.match(/GMT([+-]\d{2}:\d{2})/);
        return match ? match[1] : '-03:00'; 
    } catch (e) {
        return '-03:00';
    }
}

// Endpoint otimizado para verificar horários disponíveis
router.get('/', async (req, res) => {
    const { establishmentId, professionalId, serviceIds, date } = req.query;
    
    if (!establishmentId || !professionalId || !serviceIds || !date) {
        return res.status(400).json({ message: 'Parâmetros obrigatórios faltando.' });
    }

    try {
        const { db } = req;

        // --- 1. PARALELISMO INICIAL (Otimização de Performance) ---
        // Disparamos as buscas independentes IMEDIATAMENTE, sem esperar uma pela outra.
        
        // A. Busca Estabelecimento (Necessário para timezone)
        const establishmentPromise = db.collection('establishments').doc(establishmentId).get();

        // B. Busca Serviços (Para calcular duração)
        const serviceIdArray = serviceIds.split(',');
        const servicesPromise = Promise.all(serviceIdArray.map(id => db.collection('services').doc(id).get()));

        // C. Busca Profissional (Para pegar jornada de trabalho)
        const professionalPromise = db.collection('professionals').doc(professionalId).get();

        // --- 2. SINCRONIZAÇÃO ESTRATÉGICA ---
        // Aguardamos apenas o Estabelecimento primeiro, pois precisamos do Fuso Horário 
        // para calcular o início e fim do dia e disparar a busca de agendamentos.
        const establishmentDoc = await establishmentPromise;
        
        if (!establishmentDoc.exists) {
            return res.status(404).json({ message: 'Estabelecimento não encontrado.' });
        }
        
        const establishmentData = establishmentDoc.data();
        const slotInterval = establishmentData.slotInterval || 30;
        const timezone = establishmentData.timezone || 'America/Sao_Paulo';

        // --- 3. CÁLCULO DE DATAS (Com base no Fuso) ---
        const requestDateObj = new Date(date + 'T12:00:00Z');
        const tzOffset = getTimezoneOffset(requestDateObj, timezone);
        
        const startOfDay = new Date(`${date}T00:00:00.000${tzOffset}`);
        const endOfDay = new Date(`${date}T23:59:59.999${tzOffset}`);

        // --- 4. BUSCA DE DISPONIBILIDADE (Paralela) ---
        // Agora que temos as datas, disparamos as queries de bloqueios e agenda
        const appointmentsPromise = db.collection('appointments')
            .where('professionalId', '==', professionalId)
            .where('startTime', '>=', startOfDay)
            .where('startTime', '<=', endOfDay)
            .get();

        const blockagesPromise = db.collection('blockages')
            .where('professionalId', '==', professionalId)
            .where('startTime', '<=', endOfDay) 
            .get(); // Nota: filtraremos o startTime > startOfDay na memória para garantir performance do índice

        // --- 5. AGUARDAR TODOS OS DADOS ---
        // Aqui o "mágica" acontece: recebemos todos os dados restantes de uma só vez
        const [serviceDocs, professionalDoc, appointmentsSnapshot, blockagesSnapshot] = await Promise.all([
            servicesPromise,
            professionalPromise,
            appointmentsPromise,
            blockagesPromise
        ]);

        // --- 6. PROCESSAMENTO LÓGICO ---
        
        // Calcular Duração Total
        let totalDuration = 0;
        for (const doc of serviceDocs) {
            if (doc.exists) {
                const sData = doc.data();
                totalDuration += (sData.duration || 0) + (sData.bufferTime || 0);
            }
        }
        if (totalDuration === 0) return res.status(200).json([]);

        // Validar Profissional e Jornada
        if (!professionalDoc.exists) return res.status(200).json([]);
        const workingHours = professionalDoc.data().workingHours;
        if (!workingHours) return res.status(200).json([]);

        const dayOfWeek = startOfDay.getDay();
        const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const todayConfig = workingHours[dayNames[dayOfWeek]];

        if (!todayConfig || !todayConfig.active || !todayConfig.start || !todayConfig.end) {
            return res.status(200).json([]);
        }

        // Consolidar Horários Ocupados
        const busySlots = [
            ...appointmentsSnapshot.docs.map(doc => ({ 
                start: doc.data().startTime.toDate(), 
                end: doc.data().endTime.toDate() 
            })),
            ...blockagesSnapshot.docs
                .filter(doc => doc.data().endTime.toDate() > startOfDay) // Filtragem em memória complementar
                .map(doc => ({ 
                    start: doc.data().startTime.toDate(), 
                    end: doc.data().endTime.toDate() 
                }))
        ];

        const availableSlots = [];
        
        // Definir janela de trabalho
        const workStart = new Date(`${date}T${todayConfig.start}:00${tzOffset}`);
        const workEnd = new Date(`${date}T${todayConfig.end}:00${tzOffset}`);
        
        let breakStart, breakEnd;
        const hasBreak = todayConfig.breakStart && todayConfig.breakEnd;
        if (hasBreak) {
            breakStart = new Date(`${date}T${todayConfig.breakStart}:00${tzOffset}`);
            breakEnd = new Date(`${date}T${todayConfig.breakEnd}:00${tzOffset}`);
        }

        // --- CORREÇÃO DO "AGORA" ---
        // Usamos o tempo absoluto do servidor (UTC real).
        // Como 'workStart' e 'currentSlot' foram criados com o offset correto (ex: -03:00),
        // eles representam o momento absoluto correto no tempo.
        // Comparar diretamente com new Date() funciona perfeitamente e evita erros de string parsing.
        const now = new Date();
        
        let currentSlot = new Date(workStart);

        // Loop de verificação de slots
        while (currentSlot < workEnd) {
            const potentialSlotStart = new Date(currentSlot);
            const potentialSlotEnd = new Date(potentialSlotStart.getTime() + totalDuration * 60000);
            
            // Passado? (Compara o momento absoluto do slot com o momento absoluto de agora)
            if (potentialSlotStart < now) {
                currentSlot.setMinutes(currentSlot.getMinutes() + slotInterval);
                continue;
            }
            
            // Excede o expediente?
            if (potentialSlotEnd > workEnd) break;
            
            let isOverlapping = false;
            
            // Conflito com Intervalo de Almoço
            if (hasBreak && (potentialSlotStart < breakEnd && potentialSlotEnd > breakStart)) {
                isOverlapping = true;
            }
            
            // Conflito com Agendamentos/Bloqueios
            if (!isOverlapping) {
                for (const busy of busySlots) {
                    if (potentialSlotStart < busy.end && potentialSlotEnd > busy.start) {
                        isOverlapping = true;
                        break;
                    }
                }
            }
            
            if (!isOverlapping) {
                availableSlots.push(potentialSlotStart.toLocaleTimeString('pt-BR', { 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    timeZone: timezone 
                }));
            }
            
            currentSlot.setMinutes(currentSlot.getMinutes() + slotInterval);
        }

        res.status(200).json(availableSlots);

    } catch (error) {
        console.error("Erro na API de Disponibilidade:", error);
        res.status(500).json({ message: 'Erro ao calcular horários.' });
    }
});

module.exports = router;