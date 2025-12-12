// routes/availability.js

const express = require('express');
const router = express.Router();

// ----------------------------------------------------------------------
// 1. FUNÇÕES AUXILIARES ROBUSTAS (BLINDAGEM DE FUSO)
// ----------------------------------------------------------------------

// Garante que o timezone é válido, senão usa o do Brasil
function getSafeTimezone(timezone) {
    if (!timezone || typeof timezone !== 'string') return 'America/Sao_Paulo';
    try {
        Intl.DateTimeFormat(undefined, { timeZone: timezone });
        return timezone;
    } catch (e) {
        console.warn(`Timezone inválido (${timezone}), usando padrão Brasil.`);
        return 'America/Sao_Paulo';
    }
}

// Obtém o offset numérico (ex: "-03:00") de forma segura
function getTimezoneOffset(date, timezone) {
    try {
        const safeTz = getSafeTimezone(timezone);
        const parts = new Intl.DateTimeFormat('en-US', {
            timeZone: safeTz,
            timeZoneName: 'longOffset',
        }).formatToParts(date);
        
        const tzPart = parts.find(p => p.type === 'timeZoneName');
        const match = tzPart ? tzPart.value.match(/([+-]\d{2}:\d{2})/) : null;
        return match ? match[1] : '-03:00'; 
    } catch (e) {
        return '-03:00'; // Fallback final
    }
}

// Descobre o dia da semana (segunda, terça...) baseado no RELÓGIO DO ESTABELECIMENTO
// e não no relógio do servidor (Cloud Run).
function getWeekdayInTimezone(date, timezone) {
    const safeTz = getSafeTimezone(timezone);
    try {
        // Formata explicitamente para o fuso desejado
        return new Intl.DateTimeFormat('en-US', { 
            weekday: 'long', 
            timeZone: safeTz 
        }).format(date).toLowerCase();
    } catch (error) {
        // Fallback manual de segurança
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        return days[date.getDay()];
    }
}

// ----------------------------------------------------------------------
// 2. ROTA DE DISPONIBILIDADE
// ----------------------------------------------------------------------

router.get('/', async (req, res) => {
    // 1. Recebimento e Limpeza de Dados
    let { establishmentId, professionalId, serviceIds, date } = req.query;
    
    if (!establishmentId || !professionalId || !serviceIds || !date) {
        return res.status(400).json({ message: 'Parâmetros obrigatórios faltando.' });
    }

    // CORREÇÃO CRÍTICA: Sanitizar a Data
    // Se o frontend enviar "2025-12-12T00:00:00.000Z", pegamos apenas "2025-12-12"
    if (date.includes('T')) {
        date = date.split('T')[0];
    }

    try {
        const { db } = req;

        // 2. Buscas em Paralelo (Performance)
        const establishmentPromise = db.collection('establishments').doc(establishmentId).get();
        const serviceIdArray = serviceIds.split(',');
        const servicesPromise = Promise.all(serviceIdArray.map(id => db.collection('services').doc(id).get()));
        const professionalPromise = db.collection('professionals').doc(professionalId).get();

        const establishmentDoc = await establishmentPromise;
        if (!establishmentDoc.exists) {
            return res.status(404).json({ message: 'Estabelecimento não encontrado.' });
        }
        
        const establishmentData = establishmentDoc.data();
        const slotInterval = Number(establishmentData.slotInterval) || 30;
        
        // Garante que usamos o timezone configurado ou o padrão BR
        const timezone = getSafeTimezone(establishmentData.timezone);

        // 3. Definição do "Dia" (Usando Fuso do Estabelecimento)
        // Criamos a data base ao meio-dia UTC para evitar bugs de virada de dia ao calcular offset
        const requestDateObj = new Date(date + 'T12:00:00Z');
        const tzOffset = getTimezoneOffset(requestDateObj, timezone);
        
        // Definimos o início e fim do dia no tempo absoluto (ISO com Offset)
        const startOfDay = new Date(`${date}T00:00:00.000${tzOffset}`);
        const endOfDay = new Date(`${date}T23:59:59.999${tzOffset}`);

        // 4. Busca Agendamentos e Bloqueios
        const [serviceDocs, professionalDoc, appointmentsSnapshot, blockagesSnapshot] = await Promise.all([
            servicesPromise,
            professionalPromise,
            db.collection('appointments')
                .where('professionalId', '==', professionalId)
                .where('startTime', '>=', startOfDay)
                .where('startTime', '<=', endOfDay).get(),
            db.collection('blockages')
                .where('professionalId', '==', professionalId)
                .where('startTime', '<=', endOfDay).get()
        ]);

        // 5. Calcula Duração Total dos Serviços
        let totalDuration = 0;
        for (const doc of serviceDocs) {
            if (doc.exists) {
                const sData = doc.data();
                totalDuration += (Number(sData.duration) || 0) + (Number(sData.bufferTime) || 0);
            }
        }
        if (totalDuration === 0) return res.status(200).json([]);

        // 6. Valida Horário de Trabalho
        if (!professionalDoc.exists) return res.status(200).json([]);
        const workingHours = professionalDoc.data().workingHours;
        if (!workingHours) return res.status(200).json([]);

        // Descobre qual dia da semana é este (no fuso do estabelecimento)
        const dayName = getWeekdayInTimezone(startOfDay, timezone);
        const todayConfig = workingHours[dayName];

        // Se o dia estiver fechado ou não configurado
        if (!todayConfig || !todayConfig.active || !todayConfig.start || !todayConfig.end) {
            return res.status(200).json([]);
        }

        // 7. Processa Slots Ocupados
        const busySlots = [
            // Agendamentos (exceto cancelados)
            ...appointmentsSnapshot.docs
                .filter(doc => doc.data().status !== 'cancelled') 
                .map(doc => ({ 
                    start: doc.data().startTime.toDate(), 
                    end: doc.data().endTime.toDate() 
                })),
            // Bloqueios
            ...blockagesSnapshot.docs
                .filter(doc => doc.data().endTime.toDate() > startOfDay) 
                .map(doc => ({ 
                    start: doc.data().startTime.toDate(), 
                    end: doc.data().endTime.toDate() 
                }))
        ];

        // 8. Gera Slots Disponíveis
        const availableSlots = [];
        
        // Define o início e fim do expediente na data específica
        const workStart = new Date(`${date}T${todayConfig.start}:00${tzOffset}`);
        const workEnd = new Date(`${date}T${todayConfig.end}:00${tzOffset}`);
        
        let breakStart, breakEnd;
        if (todayConfig.breakStart && todayConfig.breakEnd) {
            breakStart = new Date(`${date}T${todayConfig.breakStart}:00${tzOffset}`);
            breakEnd = new Date(`${date}T${todayConfig.breakEnd}:00${tzOffset}`);
        }

        // Hora atual ("Agora") para não mostrar slots passados
        // Importante: new Date() no servidor é UTC. Comparar com workStart (que tem offset) funciona porque ambos são timestamps absolutos.
        const now = new Date();
        
        let currentSlot = new Date(workStart);

        while (currentSlot < workEnd) {
            const potentialSlotStart = new Date(currentSlot);
            const potentialSlotEnd = new Date(potentialSlotStart.getTime() + totalDuration * 60000);
            
            // Regra: Slot tem de ser no futuro (com margem de 1 min para evitar "agora mesmo")
            if (potentialSlotStart.getTime() < (now.getTime() + 60000)) {
                currentSlot.setMinutes(currentSlot.getMinutes() + slotInterval);
                continue;
            }
            
            // Regra: Não pode ultrapassar o fim do expediente
            if (potentialSlotEnd > workEnd) break;
            
            let isOverlapping = false;
            
            // Verifica Almoço
            if (breakStart && breakEnd && (potentialSlotStart < breakEnd && potentialSlotEnd > breakStart)) {
                isOverlapping = true;
            }
            
            // Verifica Agendamentos/Bloqueios Existentes
            if (!isOverlapping) {
                for (const busy of busySlots) {
                    if (potentialSlotStart < busy.end && potentialSlotEnd > busy.start) {
                        isOverlapping = true;
                        break;
                    }
                }
            }
            
            // Se livre, formata e adiciona
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
        console.error("Erro Crítico Disponibilidade:", error);
        // Em caso de erro grave, retornamos array vazio para não quebrar o frontend
        res.status(500).json({ message: 'Erro ao processar horários.' });
    }
});

module.exports = router;