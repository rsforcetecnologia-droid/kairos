// js/ui/agenda.js (Completo com a nova Visão Semanal e Bloqueios)

// --- 1. IMPORTAÇÕES ---
import * as appointmentsApi from '../api/appointments.js';
import * as servicesApi from '../api/services.js';
import * as professionalsApi from '../api/professionals.js';
import * as blockagesApi from '../api/blockages.js';
import * as clientsApi from '../api/clients.js';
import * as establishmentApi from '../api/establishments.js';
import { state } from '../state.js';
import { showNotification, showConfirmation } from '../components/modal.js';
import { navigateTo } from '../main.js';

// --- 2. CONSTANTES E VARIÁVEIS DO MÓDULO ---
const contentDiv = document.getElementById('content');
const API_BASE_URL = window.location.origin;
let currentTimeInterval = null;
// NOVA PALETA DE CORES DE ALTO CONTRASTE
const colorPalette = [
    { bg: '#e0e7ff', border: '#4f46e5' }, // Indigo
    { bg: '#d1fae5', border: '#059669' }, // Emerald
    { bg: '#ffe4e6', border: '#e11d48' }, // Rose
    { bg: '#fef3c7', border: '#d97706' }, // Amber
    { bg: '#cffafe', border: '#0e7490' }, // Cyan
    { bg: '#e0f2fe', border: '#0284c7' }, // Sky
    { bg: '#ede9fe', border: '#7c3aed' }, // Violet
    { bg: '#fce7f3', border: '#db2777' }, // Fuchsia
];
let availableServicesForModal = [];
let availableProfessionalsForModal = [];
let loyaltySettingsForModal = {};

// Estado local da página da agenda
let localState = {
    currentView: 'list', // 'list' ou 'week'
    currentDate: new Date(),
};

// --- NOVO: Função Utilitária para Criar o Link do WhatsApp ---
/**
 * Gera a URL do WhatsApp com a mensagem de confirmação pré-preenchida.
 * @param {string} phone - O número de telefone do cliente.
 * @param {string} clientName - Nome do cliente.
 * @param {string} serviceName - Nome do serviço (pode ser múltiplos).
 * @param {string} professionalName - Nome do profissional.
 * @param {Date} startTime - Data e hora do agendamento.
 * @returns {string} - O link completo do WhatsApp.
 */
function createWhatsAppLink(phone, clientName, serviceName, professionalName, startTime) {
    // Remove caracteres não numéricos do telefone. Assume que o código do país está no número.
    const cleanedPhone = (phone || '').replace(/\D/g, '');
    
    // Formato da data e hora
    const date = new Date(startTime).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    const time = new Date(startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    // Monta a mensagem de confirmação
    const message = `Olá, ${clientName}! Você tem um agendamento de ${serviceName} com o(a) profissional ${professionalName} para o dia ${date} às ${time}. Podemos confirmar? Agradecemos a preferência!`;

    // Codifica a mensagem para a URL
    const encodedMessage = encodeURIComponent(message);

    // Retorna o link do WhatsApp
    return `https://wa.me/${cleanedPhone}?text=${encodedMessage}`;
}

// --- 3. FUNÇÕES DE LÓGICA E RENDERIZAÇÃO DA AGENDA ---

function getStartOfWeek(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

function renderListView(allEvents) {
    const agendaView = document.getElementById('agenda-view');
    allEvents.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    if (allEvents.length === 0) {
        agendaView.innerHTML = `<div class="text-center p-10 text-gray-500"><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum agendamento ou bloqueio</h3><p class="mt-1 text-sm text-gray-500">Não há eventos para o dia e filtros selecionados.</p></div>`;
        return;
    }

    const cardsHTML = allEvents.map(event => {
        const startTime = new Date(event.startTime);
        const endTime = new Date(event.endTime);
        const startTimeStr = startTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        const endTimeStr = endTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        const profColor = state.professionalColors.get(event.professionalId) || { bg: '#d1d5db' };
        
        if (event.type === 'blockage') {
            return `
                <div class="appointment-list-card bg-red-50" style="border-left-color: ${profColor.border};">
                    <div class="time-info"><p class="font-bold text-lg">${startTimeStr}</p><p class="text-sm text-gray-500">${endTimeStr}</p></div>
                    <div class="details-info"><p class="font-bold text-red-800">${event.reason}</p><p class="text-sm text-gray-600">com ${event.professionalName}</p></div>
                    <div class="status-info"><span class="status-badge bg-red-100 text-red-800">Bloqueio</span></div>
                </div>`;
        }

        const isCompleted = event.status === 'completed';
        const statusClass = isCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
        const statusText = isCompleted ? 'Finalizado' : 'Aberto';
        const apptDataString = JSON.stringify(event).replace(/'/g, "&apos;");
        
        // --- NOVO: Cria o link do WhatsApp ---
        const whatsappLink = createWhatsAppLink(event.clientPhone, event.clientName, event.serviceName, event.professionalName, event.startTime);


        return `
            <div class="appointment-list-card" data-appointment='${apptDataString}' style="border-left-color: ${profColor.border};">
                <div class="time-info" data-action="open-comanda"><p class="font-bold text-lg">${startTimeStr}</p><p class="text-sm text-gray-500">${endTimeStr}</p></div>
                <div class="details-info" data-action="open-comanda"><p class="font-bold text-gray-800">${event.clientName}</p><p class="text-sm text-gray-600">${event.serviceName}</p><p class="text-sm text-gray-500 mt-1">com ${event.professionalName || 'Indefinido'}</p></div>
                <div class="status-info">
                    <span class="status-badge ${statusClass}">${statusText}</span>
                    <div class="card-actions flex gap-1 items-center">
                        ${!isCompleted ? `
                            <a href="${whatsappLink}" target="_blank" class="action-btn text-green-500 hover:text-green-700 p-1" title="Enviar Confirmação WhatsApp">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.036 2a10 10 0 100 20 10 10 0 000-20zM17.5 14.8c-.24.125-1.465.716-1.696.804-.23.09-.49.135-.75.045-.26-.09-.982-.322-1.87-.965-.888-.643-1.474-1.442-1.64-1.748-.166-.307-.015-.467.106-.615.116-.149.23-.388.344-.582.113-.193.15-.327.1-.462-.05-.136-.264-.322-.544-.654-.28-.332-.572-.782-.828-.958-.255-.176-.438-.158-.61-.158-.173 0-.374-.022-.574-.022-.2 0-.54.075-.826.375-.285.3-.99.965-.99 2.355 0 1.43 1.018 2.872 1.16 3.072.14.2 2 3.047 4.86 4.218 2.86 1.17 2.86.786 3.376 1.054.516.268 1.49.462 1.696.406.206-.057 1.463-.615 1.67-.887.2-.27.2-.504.14-.615-.058-.11-.23-.166-.48-.306z"/></svg>
                            </a>
                        ` : ''}
                        <button data-action="edit-appointment" class="action-btn" title="Editar Agendamento"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                        <button data-action="delete-appointment" data-id="${event.id}" class="action-btn" title="Apagar Agendamento"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                    </div>
                </div>
            </div>`;
    }).join('');
    agendaView.innerHTML = `<div class="list-view-container">${cardsHTML}</div>`;
}

function renderWeekView(allEvents) {
    const agendaView = document.getElementById('agenda-view');
    const weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
    const weekStart = getStartOfWeek(localState.currentDate);

    let weekHTML = '<div class="grid grid-cols-7 divide-x divide-gray-200 min-h-[60vh]">';

    for (let i = 0; i < 7; i++) {
        const day = new Date(weekStart);
        day.setDate(weekStart.getDate() + i);
        const today = new Date();
        const isCurrentDay = day.toDateString() === today.toDateString();

        const dayEvents = allEvents
            .filter(event => new Date(event.startTime).toDateString() === day.toDateString())
            .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
        
        let eventsHTML = '<div class="p-2 space-y-2">';
        if (dayEvents.length > 0) {
            eventsHTML += dayEvents.map(event => {
                const startTime = new Date(event.startTime);
                const startTimeStr = startTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                const profColor = state.professionalColors.get(event.professionalId) || { bg: '#e5e7eb', border: '#9ca3af' };
                
                if (event.type === 'blockage') {
                    return `
                        <div class="p-2 rounded-lg border-l-4 flex flex-col justify-between bg-red-100" style="border-left-color: ${profColor.border};">
                            <p class="font-bold text-sm text-red-800">${startTimeStr} - ${event.reason}</p>
                            <p class="text-xs text-gray-600 truncate">com ${event.professionalName}</p>
                        </div>
                    `;
                }

                const apptDataString = JSON.stringify(event).replace(/'/g, "&apos;");
                
                // --- NOVO: Cria o link do WhatsApp para a Visão Semanal ---
                const whatsappLink = createWhatsAppLink(event.clientPhone, event.clientName, event.serviceName, event.professionalName, event.startTime);
                const isCompleted = event.status === 'completed';

                return `
                    <div class="p-2 rounded-lg border-l-4 flex flex-col justify-between" 
                         style="background-color: ${profColor.bg}; border-left-color: ${profColor.border};">
                        <div class="cursor-pointer flex-grow" data-action="open-comanda" data-appointment='${apptDataString}'>
                            <p class="font-bold text-sm text-gray-800">${startTimeStr} - ${event.clientName}</p>
                            <p class="text-xs text-gray-600 truncate">${event.serviceName}</p>
                        </div>
                        <div class="flex items-center justify-end gap-2 mt-2 pt-1 border-t border-black border-opacity-10">
                            ${!isCompleted ? `
                                <a href="${whatsappLink}" target="_blank" class="action-btn text-green-500 hover:text-green-700 p-1" title="Enviar Confirmação WhatsApp">
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.036 2a10 10 0 100 20 10 10 0 000-20zM17.5 14.8c-.24.125-1.465.716-1.696.804-.23.09-.49.135-.75.045-.26-.09-.982-.322-1.87-.965-.888-.643-1.474-1.442-1.64-1.748-.166-.307-.015-.467.106-.615.116-.149.23-.388.344-.582.113-.193.15-.327.1-.462-.05-.136-.264-.322-.544-.654-.28-.332-.572-.782-.828-.958-.255-.176-.438-.158-.61-.158-.173 0-.374-.022-.574-.022-.2 0-.54.075-.826.375-.285.3-.99.965-.99 2.355 0 1.43 1.018 2.872 1.16 3.072.14.2 2 3.047 4.86 4.218 2.86 1.17 2.86.786 3.376 1.054.516.268 1.49.462 1.696.406.206-.057 1.463-.615 1.67-.887.2-.27.2-.504.14-.615-.058-.11-.23-.166-.48-.306z"/></svg>
                                </a>
                            ` : ''}
                            <button data-action="edit-appointment" data-appointment='${apptDataString}' class="text-gray-600 hover:text-blue-600 p-1" title="Editar">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg>
                            </button>
                            <button data-action="delete-appointment" data-id="${event.id}" class="text-gray-600 hover:text-red-600 p-1" title="Apagar">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        } else {
            eventsHTML += '<div class="text-center text-xs text-gray-400 pt-4">Nenhum evento</div>';
        }
        eventsHTML += '</div>';

        weekHTML += `
            <div class="flex flex-col">
                <div class="text-center py-2 border-b ${isCurrentDay ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-50'}">
                    <p class="font-bold">${weekDays[i]}</p>
                    <p class="text-sm">${day.getDate()}/${day.getMonth() + 1}</p>
                </div>
                <div class="flex-grow overflow-y-auto">${eventsHTML}</div>
            </div>
        `;
    }

    weekHTML += '</div>';
    agendaView.innerHTML = weekHTML;
}

function renderAgenda() {
    const profFilter = document.getElementById('profFilter');
    const profFilterValue = profFilter ? profFilter.value : 'all';

    const filteredEvents = state.allEvents.filter(event => {
        return profFilterValue === 'all' || event.professionalId === profFilterValue;
    });

    if (localState.currentView === 'list') {
        renderListView(filteredEvents);
    } else {
        renderWeekView(filteredEvents);
    }
}

async function fetchAndDisplayAgenda() {
    const agendaView = document.getElementById('agenda-view');
    if (!agendaView) return;
    agendaView.innerHTML = '<div class="loader mx-auto my-10"></div>';

    let start, end;
    const weekRangeSpan = document.getElementById('weekRange');

    if (localState.currentView === 'list') {
        start = new Date(localState.currentDate);
        start.setHours(0, 0, 0, 0);
        end = new Date(localState.currentDate);
        end.setHours(23, 59, 59, 999);
        weekRangeSpan.textContent = start.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
    } else {
        start = getStartOfWeek(new Date(localState.currentDate));
        end = new Date(start);
        end.setDate(start.getDate() + 6);
        end.setHours(23, 59, 59, 999);
        weekRangeSpan.textContent = `${start.toLocaleDateString('pt-BR')} - ${end.toLocaleDateString('pt-BR')}`;
    }

    try {
        const appointmentsData = await appointmentsApi.getAppointmentsByDateRange(state.establishmentId, start.toISOString(), end.toISOString());
        const blockagesData = await blockagesApi.getBlockagesByDateRange(state.establishmentId, start.toISOString(), end.toISOString());
        
        // Combina agendamentos e bloqueios numa única lista de eventos
        const allEvents = [
            ...appointmentsData.map(a => ({ ...a, type: 'appointment' })),
            ...blockagesData.map(b => ({ ...b, type: 'blockage' }))
        ];
        
        state.allEvents = allEvents; // Armazena a lista combinada no estado global
        renderAgenda();
    } catch (error) {
        showNotification('Erro na Agenda', `Não foi possível carregar a agenda: ${error.message}`, 'error');
        agendaView.innerHTML = `<div class="p-6 text-center text-red-600">Falha ao carregar dados.</div>`;
    }
}

async function populateFilters() {
    const profFilter = document.getElementById('profFilter');
    if (!profFilter) return;

    try {
        if (!state.professionals || state.professionals.length === 0) {
            state.professionals = await professionalsApi.getProfessionals(state.establishmentId);
        }
        if (!state.services || state.services.length === 0) {
            state.services = await servicesApi.getServices(state.establishmentId);
        }

        state.professionals.forEach((prof, index) => {
            state.professionalColors.set(prof.id, colorPalette[index % colorPalette.length]);
        });

        profFilter.innerHTML = '<option value="all">Todos Profissionais</option>';
        state.professionals.forEach(p => profFilter.innerHTML += `<option value="${p.id}">${p.name}</option>`);
    } catch (error) {
        console.error("Erro ao popular filtros:", error);
    }
}

// --- 4. LÓGICA DO MODAL DE AGENDAMENTO ---

async function handleAppointmentFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const appointmentId = form.querySelector('#appointmentId').value;
    const selectedServiceIds = Array.from(form.querySelectorAll('#apptServicesContainer input:checked')).map(cb => cb.value);
    const selectedTime = form.querySelector('#selectedTime').value;
    const selectedDate = form.querySelector('#apptDate').value;

    const selectedRewardInput = form.querySelector('input[name="redeemedReward"]:checked');
    const redeemedReward = selectedRewardInput ? JSON.parse(selectedRewardInput.value) : null;

    if (selectedServiceIds.length === 0) return showNotification('Por favor, selecione pelo menos um serviço.', 'error');
    if (!selectedTime) return showNotification('Por favor, selecione um horário disponível.', 'error');

    const servicesData = selectedServiceIds.map(id => {
        const service = availableServicesForModal.find(s => s.id === id);
        return { id: service.id, name: service.name, price: service.price, duration: service.duration, bufferTime: service.bufferTime || 0, photo: service.photo || null };
    });

    const [hours, minutes] = selectedTime.split(':');
    const startTimeAsDate = new Date(`${selectedDate}T${hours}:${minutes}:00`);

    const appointmentData = {
        establishmentId: state.establishmentId,
        clientName: form.querySelector('#apptClientName').value,
        clientPhone: form.querySelector('#apptClientPhone').value,
        services: servicesData,
        professionalId: form.querySelector('#apptProfessional').value,
        startTime: startTimeAsDate.toISOString(),
        redeemedReward: redeemedReward
    };

    try {
        if (appointmentId) {
            await appointmentsApi.updateAppointment(appointmentId, appointmentData);
        } else {
            await appointmentsApi.createAppointment(appointmentData);
        }
        showNotification(`Agendamento ${appointmentId ? 'atualizado' : 'criado'} com sucesso!`, 'success');
        document.getElementById('appointmentModal').style.display = 'none';
        fetchAndDisplayAgenda();
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

async function openAppointmentModal(appointment = null) {
    const modal = document.getElementById('appointmentModal');
    modal.innerHTML = `
        <div class="modal-content">
            <h2 id="appointmentModalTitle" class="text-2xl font-bold mb-4">Novo Agendamento</h2>
            <form id="appointmentForm" class="space-y-4">
                <input type="hidden" id="appointmentId">
                <input type="hidden" id="selectedTime">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label for="apptClientName" class="block text-sm font-medium text-gray-700">Nome do Cliente</label><input type="text" id="apptClientName" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Nome Completo"></div>
                    <div><label for="apptClientPhone" class="block text-sm font-medium text-gray-700">Telemóvel do Cliente</label><input type="tel" id="apptClientPhone" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="(XX) XXXXX-XXXX"></div>
                </div>
                <div id="loyaltyRewardsContainer" class="hidden bg-indigo-50 p-4 rounded-lg"></div>
                <div><label class="block text-sm font-medium text-gray-700">Serviços</label><div id="apptServicesContainer" class="mt-1 grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto p-2 bg-gray-50 rounded-md border"><div class="loader"></div></div></div>
                <div><label for="apptProfessional" class="block text-sm font-medium text-gray-700">Profissional</label><select id="apptProfessional" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"><option value="">Selecione um profissional</option></select></div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label for="apptDate" class="block text-sm font-medium text-gray-700">Data</label><input type="date" id="apptDate" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                    <div><label class="block text-sm font-medium text-gray-700">Duração Total</label><span id="apptTotalDuration" class="mt-1 block w-full p-2 bg-gray-50 border border-gray-200 rounded-md text-gray-600">0 min</span></div>
                </div>
                <div><label class="block text-sm font-medium text-gray-700">Horários Disponíveis</label><div id="availableTimesContainer" class="mt-2 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-2 bg-gray-50 rounded-md"><p class="col-span-full text-center text-gray-500">Selecione serviço, profissional e data.</p></div></div>
                <div class="flex gap-4 pt-4"><button type="button" data-action="close-modal" data-target="appointmentModal" class="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg">Cancelar</button><button type="submit" class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg">Confirmar</button></div>
            </form>
        </div>`;

    const form = modal.querySelector('#appointmentForm');
    const title = modal.querySelector('#appointmentModalTitle');
    const dateInput = modal.querySelector('#apptDate');
    const timeContainer = modal.querySelector('#availableTimesContainer');
    const selectedTimeInput = modal.querySelector('#selectedTime');
    const servicesContainer = modal.querySelector('#apptServicesContainer');
    const professionalSelect = modal.querySelector('#apptProfessional');
    const totalDurationSpan = modal.querySelector('#apptTotalDuration');

    form.addEventListener('submit', handleAppointmentFormSubmit);

    try {
        const details = await establishmentApi.getEstablishmentDetails(state.establishmentId);
        loyaltySettingsForModal = details.loyaltyProgram || { enabled: false };

        [availableServicesForModal, availableProfessionalsForModal] = await Promise.all([
            servicesApi.getServices(state.establishmentId),
            professionalsApi.getProfessionals(state.establishmentId)
        ]);

        professionalSelect.innerHTML = '<option value="">Selecione um profissional</option>' + availableProfessionalsForModal.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
        servicesContainer.innerHTML = availableServicesForModal.map(service => `
            <div class="flex items-center">
                <input type="checkbox" id="appt-service-${service.id}" value="${service.id}" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <label for="appt-service-${service.id}" class="ml-2 text-sm text-gray-700">${service.name} (${service.duration} min)</label>
            </div>`).join('');

        const today = new Date();
        const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        if (appointment) {
            title.textContent = 'Editar Agendamento';
            form.querySelector('#appointmentId').value = appointment.id;
            form.querySelector('#apptClientName').value = appointment.clientName;
            form.querySelector('#apptClientPhone').value = appointment.clientPhone;
            professionalSelect.value = appointment.professionalId;
            const date = new Date(appointment.startTime);
            dateInput.value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            selectedTimeInput.value = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            const selectedServiceIds = appointment.services.map(s => s.id);
            form.querySelectorAll('#apptServicesContainer input[type="checkbox"]').forEach(cb => {
                cb.checked = selectedServiceIds.includes(cb.value);
            });
        } else {
            title.textContent = 'Novo Agendamento';
            dateInput.value = todayString;
        }

        const clientPhoneInput = form.querySelector('#apptClientPhone');
        clientPhoneInput.addEventListener('blur', async () => {
            const clientName = form.querySelector('#apptClientName').value;
            const clientPhone = clientPhoneInput.value;
            const rewardsContainer = form.querySelector('#loyaltyRewardsContainer');

            if (loyaltySettingsForModal.enabled && clientName && clientPhone) {
                try {
                    const clientDetails = await clientsApi.getClientDetails(state.establishmentId, clientName, clientPhone);
                    const points = clientDetails.loyaltyPoints || 0;
                    const availableRewards = loyaltySettingsForModal.tiers.filter(t => t.points <= points);

                    if (availableRewards.length > 0) {
                        rewardsContainer.innerHTML = `
                            <p class="font-semibold text-gray-800 mb-2">Fidelidade <span class="font-normal text-indigo-600">(${points} pts)</span></p>
                            <div class="space-y-2">
                                ${availableRewards.map(tier => {
                                    const tierDataString = JSON.stringify(tier).replace(/'/g, "&apos;");
                                    return `
                                    <label class="flex items-center bg-white p-2 rounded-md border cursor-pointer">
                                        <input type="radio" name="redeemedReward" value='${tierDataString}' class="h-4 w-4 text-indigo-600">
                                        <span class="ml-3 text-sm font-medium text-gray-700">${tier.reward} (-${tier.points} pts)</span>
                                    </label>
                                `}).join('')}
                                <label class="flex items-center bg-white p-2 rounded-md border cursor-pointer">
                                    <input type="radio" name="redeemedReward" value="" checked class="h-4 w-4 text-indigo-600">
                                    <span class="ml-3 text-sm font-medium text-gray-500">Não resgatar prémio</span>
                                </label>
                            </div>`;
                        rewardsContainer.classList.remove('hidden');
                    } else {
                        rewardsContainer.classList.add('hidden');
                    }
                } catch (error) {
                    console.warn("Cliente sem histórico de fidelidade ou erro na busca.");
                    rewardsContainer.classList.add('hidden');
                }
            }
        });

        const updateTimes = async () => {
            const selectedServiceIds = Array.from(form.querySelectorAll('#apptServicesContainer input:checked')).map(cb => cb.value);
            const professionalId = professionalSelect.value;
            const date = dateInput.value;
            selectedTimeInput.value = '';

            const totalDuration = selectedServiceIds.reduce((acc, id) => {
                const service = availableServicesForModal.find(s => s.id === id);
                return acc + (service ? (service.duration + (service.bufferTime || 0)) : 0);
            }, 0);
            totalDurationSpan.textContent = `${totalDuration} min`;

            if (selectedServiceIds.length === 0 || !professionalId || !date) {
                timeContainer.innerHTML = '<p class="col-span-full text-center text-gray-500">Selecione serviços, profissional e data.</p>';
                return;
            }

            timeContainer.innerHTML = '<div class="loader mx-auto col-span-full"></div>';
            try {
                const res = await fetch(`${API_BASE_URL}/api/availability?establishmentId=${state.establishmentId}&professionalId=${professionalId}&serviceIds=${selectedServiceIds.join(',')}&date=${date}`);
                if (!res.ok) throw new Error('Falha na resposta da API de disponibilidade');
                let slots = await res.json();

                const now = new Date();
                const selectedDateObj = new Date(date + 'T00:00:00');
                if (selectedDateObj.toDateString() === now.toDateString()) {
                    const currentMinutes = now.getHours() * 60 + now.getMinutes();
                    slots = slots.filter(slot => {
                        const [slotHours, slotMinutes] = slot.split(':').map(Number);
                        const slotTotalMinutes = slotHours * 60 + slotMinutes;
                        return slotTotalMinutes >= currentMinutes;
                    });
                }

                timeContainer.innerHTML = '';
                if (slots.length > 0) {
                    slots.forEach(slot => {
                        const card = document.createElement('button');
                        card.type = 'button';
                        card.className = 'time-slot-card';
                        card.textContent = slot;
                        if (appointment && selectedTimeInput.value === slot) card.classList.add('selected');
                        card.addEventListener('click', () => {
                            timeContainer.querySelectorAll('.time-slot-card').forEach(c => c.classList.remove('selected'));
                            card.classList.add('selected');
                            selectedTimeInput.value = slot;
                        });
                        timeContainer.appendChild(card);
                    });
                } else {
                    timeContainer.innerHTML = `<p class="col-span-full text-center text-gray-500">Nenhum horário disponível.</p>`;
                }
            } catch (e) {
                console.error("Erro ao buscar horários:", e);
                timeContainer.innerHTML = '<p class="col-span-full text-center text-red-500">Erro ao buscar horários.</p>';
            }
        };

        servicesContainer.addEventListener('change', updateTimes);
        professionalSelect.addEventListener('change', updateTimes);
        dateInput.addEventListener('change', updateTimes);
        updateTimes();
        modal.style.display = 'flex';
    } catch (error) {
        showNotification('Erro', 'Não foi possível carregar dados para o agendamento.', 'error');
    }
}


// --- 5. FUNÇÃO PRINCIPAL EXPORTADA ---

export async function loadAgendaPage() {
    if (currentTimeInterval) clearInterval(currentTimeInterval);
    localState.currentDate = new Date();

    contentDiv.innerHTML = `
        <section>
            <div class="flex flex-wrap justify-between items-center mb-6 gap-4">
                <div class="flex items-center gap-4">
                    <div class="flex items-center gap-1 rounded-lg bg-gray-200 p-1">
                        <button data-view="list" class="view-btn active">Lista</button>
                        <button data-view="week" class="view-btn">Semana</button>
                    </div>
                    <button id="todayBtn" class="p-2 border rounded-md shadow-sm font-semibold">Hoje</button>
                    <button id="prevBtn" class="p-2 border rounded-md shadow-sm"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button>
                    <button id="nextBtn" class="p-2 border rounded-md shadow-sm"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button>
                    <span id="weekRange" class="font-semibold text-lg"></span>
                </div>
                <div class="flex items-center gap-4">
                    <select id="profFilter" class="p-2 border rounded-md shadow-sm"><option value="all">Todos Profissionais</option></select>
                    <button data-action="new-appointment" class="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300">Novo Agendamento</button>
                </div>
            </div>
            <div id="agenda-view" class="bg-white rounded-xl shadow-lg overflow-hidden"></div>
        </section>`;

    // Adiciona listeners aos botões de navegação
    document.getElementById('profFilter').addEventListener('change', renderAgenda);
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            localState.currentView = btn.dataset.view;
            fetchAndDisplayAgenda();
        });
    });
    document.getElementById('todayBtn').addEventListener('click', () => {
        localState.currentDate = new Date();
        fetchAndDisplayAgenda();
    });
    document.getElementById('prevBtn').addEventListener('click', () => {
        const step = localState.currentView === 'week' ? 7 : 1;
        localState.currentDate.setDate(localState.currentDate.getDate() - step);
        fetchAndDisplayAgenda();
    });
    document.getElementById('nextBtn').addEventListener('click', () => {
        const step = localState.currentView === 'week' ? 7 : 1;
        localState.currentDate.setDate(localState.currentDate.getDate() + step);
        fetchAndDisplayAgenda();
    });

    contentDiv.addEventListener('click', async (e) => {
        const targetElement = e.target.closest('[data-action]');
        if (!targetElement) return;

        const action = targetElement.dataset.action;
        let apptData = null;
        const card = e.target.closest('[data-appointment]');
        if (card) {
            apptData = JSON.parse(card.dataset.appointment.replace(/&apos;/g, "'"));
        }
        
        switch (action) {
            case 'new-appointment':
                openAppointmentModal();
                break;
            case 'edit-appointment':
                if (apptData) openAppointmentModal(apptData);
                break;
            case 'delete-appointment': {
                const id = targetElement.dataset.id;
                const confirmed = await showConfirmation('Confirmar Exclusão', 'Tem a certeza que deseja apagar este agendamento?');
                if (confirmed) {
                    try {
                        await appointmentsApi.deleteAppointment(id);
                        showNotification('Agendamento apagado!', 'success');
                        fetchAndDisplayAgenda();
                    } catch (error) {
                        showNotification(`Não foi possível apagar: ${error.message}`, 'error');
                    }
                }
                break;
            }
            case 'open-comanda':
                if (apptData) {
                    const initialFilter = apptData.status === 'completed' ? 'finalizadas' : 'em-atendimento';
                    const params = { 
                        selectedAppointmentId: apptData.id,
                        initialFilter: initialFilter
                    };
                    if (initialFilter === 'finalizadas') {
                        params.filterDate = apptData.startTime; 
                    }
                    navigateTo('comandas-section', params);
                }
                break;
        }
    });

    await populateFilters();
    await fetchAndDisplayAgenda();
}
