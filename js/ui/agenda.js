// js/ui/agenda.js (Completo com a nova Visão Semanal e Bloqueios)

// --- 1. IMPORTAÇÕES ---
import * as appointmentsApi from '../api/appointments.js';
import * as servicesApi from '../api/services.js';
import * as professionalsApi from '../api/professionals.js';
import * as blockagesApi from '../api/blockages.js';
import * as clientsApi from '../api/clients.js';
import * as establishmentApi from '../api/establishments.js';
import { state } from '../state.js';
import { showNotification, showConfirmation, showGenericModal } from '../components/modal.js';
import { navigateTo } from '../main.js';

// --- 2. CONSTANTES E VARIÁVEIS DO MÓDULO ---
const contentDiv = document.getElementById('content');
const API_BASE_URL = window.location.origin;
let currentTimeInterval = null;
// NOVO: Variável de controlo para prevenir múltiplos ouvintes
let hasContentDelegationInitialized = false; 

// NOVA PALETA DE CORES DE ALTO CONTRASTE
const colorPalette = [
    { bg: '#e0e7ff', border: '#4f46e5', main: '#4f46e5' }, // Indigo
    { bg: '#d1fae5', border: '#059669', main: '#059669' }, // Emerald
    { bg: '#ffe4e6', border: '#e11d48', main: '#e11d48' }, // Rose
    { bg: '#fef3c7', border: '#d97706', main: '#d97706' }, // Amber
    { bg: '#cffafe', border: '#0e7490', main: '#0e7490' }, // Cyan
    { bg: '#e0f2fe', border: '#0284c7', main: '#0284c7' }, // Sky
    { bg: '#ede9fe', border: '#7c3aed', main: '#7c3aed' }, // Violet
    { bg: '#fce7f3', border: '#db2777', main: '#db2777' }, // Fuchsia
];
let availableServicesForModal = [];
let availableProfessionalsForModal = [];
let loyaltySettingsForModal = {};
let allClientsData = []; // NOVO: Cache de clientes para a busca

// Estado local da página da agenda
let localState = {
    currentView: 'list', // 'list' ou 'week'
    weekViewDays: 7, // NOVO: 3, 5, ou 7
    currentDate: new Date(),
    selectedProfessionalId: 'all', // NOVO: ID do profissional selecionado ('all' por padrão)
    profSearchTerm: '', // NOVO: Termo de busca para o filtro de fotos
    showInactiveProfs: false, // NOVO: Estado para mostrar inativos
};

// ESTADO CENTRALIZADO DO NOVO FLUXO DE AGENDAMENTO
let newAppointmentState = {
    step: 1, // 1: Cliente, 2: Serviço, 3: Profissional, 4: Data/Hora
    data: {
        id: null, // <-- AJUSTE FEITO (1/3): Adicionado ID para rastrear a edição
        clientName: '',
        clientPhone: '',
        selectedServiceIds: [],
        professionalId: null,
        professionalName: '',
        date: null,
        time: null,
        redeemedReward: null
    }
};

// --- NOVO: Função para formatar a data de forma reduzida (Ex: Sex, 26 Set) ---
function formatDateReduced(date) {
    return new Intl.DateTimeFormat('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' }).format(date).replace(/\./g, '');
}

// --- NOVO: Função para obter o início do bloco de visualização (substitui getStartOfWeek) ---
function getWeekStart(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    
    // Só faz o 'snap' para a segunda-feira se a visualização for de 7 dias completos.
    if (localState.currentView === 'week' && localState.weekViewDays === 7) {
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Garante que a semana começa na Segunda-feira (1)
        return new Date(d.setDate(diff));
    }
    
    // Para 'list' (1 dia) ou blocos de 3/5 dias na 'week' view, 
    // a data atual (d) já é o início do bloco que queremos exibir.
    return d;
}


// --- NOVO: Função para renderizar a faixa de seleção de profissionais ---
function renderProfessionalSelector() {
    const container = document.getElementById('profSelectorContainer');
    const searchTerm = localState.profSearchTerm.toLowerCase();
    
    if (!container || !state.professionals) return;

    // 1. FILTRAGEM POR STATUS (Inativos só aparecem se o toggle estiver ativo)
    let availableProfs = state.professionals.filter(p => 
        localState.showInactiveProfs || p.status !== 'inactive'
    );

    // 2. Aplica o filtro de busca
    if (searchTerm) {
        availableProfs = availableProfs.filter(p => 
            p.name.toLowerCase().includes(searchTerm)
        );
    }
    
    const allOption = [{ id: 'all', name: 'Todos', photo: null, status: 'active' }];
    const professionalsToRender = [...allOption, ...availableProfs];

    container.innerHTML = professionalsToRender.map(prof => {
        const isSelected = localState.selectedProfessionalId === prof.id;
        const profName = prof.name === 'Todos' ? 'Todos' : prof.name.split(' ')[0];
        const initials = prof.name === 'Todos' ? 'T' : prof.name.charAt(0).toUpperCase();
        const isActive = prof.status !== 'inactive';
        
        // Obtém a cor do mapa, garantindo que 'all' use uma cor neutra
        const defaultColor = colorPalette[0];
        const profColor = prof.id !== 'all' ? state.professionalColors.get(prof.id) || defaultColor : defaultColor;
        
        const photoSrc = prof.photo || `https://placehold.co/64x64/${profColor.main?.replace('#', '') || 'E0E7FF'}/${profColor.light?.replace('#', '') || '4F46E5'}?text=${initials}`;
        const placeholderBg = prof.id === 'all' ? '#e0e7ff' : profColor.light;
        const placeholderText = prof.id === 'all' ? '#4f46e5' : profColor.main;
        
        // CORREÇÃO (BUG 1): Adiciona a lógica da moldura colorida via style inline
        const borderColor = isSelected ? profColor.border : 'transparent'; // Use 'border' for the visible color
        const borderStyle = `border: 3px solid ${borderColor}; box-shadow: ${isSelected ? '0 0 0 2px ' + profColor.border : 'none'};`;

        return `
            <div class="prof-card ${isSelected ? 'selected' : ''} ${!isActive ? 'opacity-50' : ''}" 
                 data-action="select-professional" 
                 data-prof-id="${prof.id}">
                
                ${prof.id === 'all' 
                    ? `<div class="prof-card-all-placeholder" style="background-color: ${placeholderBg}; color: ${placeholderText}; ${borderStyle}">
                        ${initials}
                       </div>`
                    : `<img src="${photoSrc}" alt="${prof.name}" class="prof-card-photo" style="${borderStyle}" />`
                }
                
                <span class="prof-card-name">${profName}</span>
            </div>
        `;
    }).join('');
}

/**
 * Gera a URL do WhatsApp com a mensagem de confirmação pré-preenchida.
 * [Restante da função createWhatsAppLink...]
 */
function createWhatsAppLink(phone, clientName, serviceName, professionalName, startTime) {
    const cleanedPhone = (phone || '').replace(/\D/g, '');
    const date = new Date(startTime).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    const time = new Date(startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const message = `Olá, ${clientName}! Você tem um agendamento de ${serviceName} com o(a) profissional ${professionalName} para o dia ${date} às ${time}. Podemos confirmar? Agradecemos a preferência!`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${cleanedPhone}?text=${encodedMessage}`;
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
        
        // --- Verifica se há resgate de prêmio ---
        const isRedeemed = event.redeemedReward?.points > 0;
        
        // --- Cria o link do WhatsApp ---
        const whatsappLink = createWhatsAppLink(event.clientPhone, event.clientName, event.serviceName, event.professionalName, event.startTime);


        return `
            <div class="appointment-list-card" data-appointment='${apptDataString}' style="border-left-color: ${profColor.border};">
                <div class="time-info" data-action="open-comanda"><p class="font-bold text-lg">${startTimeStr}</p><p class="text-sm text-gray-500">${endTimeStr}</p></div>
                <div class="details-info" data-action="open-comanda">
                    <p class="font-bold text-gray-800">${event.clientName}</p>
                    <p class="text-sm text-gray-600">${event.serviceName}</p>
                    <p class="text-sm text-gray-500 mt-1">com ${event.professionalName || 'Indefinido'}
                        ${isRedeemed ? '<span class="text-xs font-semibold text-purple-600 ml-1">(Resgate de Prémio)</span>' : ''}
                    </p>
                </div>
                <div class="status-info">
                    <span class="status-badge ${statusClass}">${statusText}</span>
                    <div class="card-actions flex gap-1 items-center">
                        ${!isCompleted ? `
                            <a href="${whatsappLink}" target="_blank" class="action-btn text-green-500 hover:text-green-700 p-1" title="Enviar Confirmação WhatsApp">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.036 2a10 10 0 100 20 10 10 0 000-20zM17.5 14.8c-.24.125-1.465.716-1.696.804-.23.09-.49.135-.75.045-.26-.09-.982-.322-1.87-.965-.888-.643-1.474-1.442-1.64-1.748-.166-.307-.015-.467.106-.615.116-.149.23-.388.344-.582.113-.193.15-.327.1-.462-.05-.136-.264-.322-.544-.654-.28-.332-.572-.782-.828-.958-.255-.176-.438-.158-.61-.158-.173 0-.374-.022-.574-.022-.2 0-.54.075-.826.375-.285.3-.99.965-.99 2.355 0 1.43 1.018 2.872 1.16 3.072.14.2 2 3.047 4.86 4.218 2.86 1.17 2.86.786 3.376 1.054.516.268 1.49.462 1.696.406.206-.057 1.463-.615 1.67-.887.2-.27.2-.504.14-.615-.058-.11-.23-.166-.48-.306z"/></svg>
                            </a>
                            <button data-action="edit-appointment" data-appointment='${apptDataString}' class="action-btn" title="Editar Agendamento"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                        ` : `
                            <button data-action="edit-appointment" data-appointment='${apptDataString}' class="action-btn opacity-40 cursor-not-allowed" title="Finalizado - Não editável" disabled><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                        `}
                        <button data-action="delete-appointment" data-id="${event.id}" class="action-btn" title="Apagar Agendamento"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                    </div>
                </div>
            </div>`;
    }).join('');
    agendaView.innerHTML = `<div class="list-view-container">${cardsHTML}</div>`;
}

function renderWeekView(allEvents) {
    const agendaView = document.getElementById('agenda-view');
    const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    // CORREÇÃO (BUG 3): Usa getWeekStart para calcular a data inicial do bloco
    const weekStart = getWeekStart(localState.currentDate);
    const numDays = localState.weekViewDays;

    let weekHTML = `<div class="grid divide-x divide-gray-200 min-h-[60vh]" style="grid-template-columns: repeat(${numDays}, minmax(0, 1fr));">`;

    for (let i = 0; i < numDays; i++) {
        const day = new Date(weekStart);
        day.setDate(day.getDate() + i);
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
                
                // --- Verifica se há resgate de prêmio ---
                const isRedeemed = event.redeemedReward?.points > 0;

                // --- Cria o link do WhatsApp para a Visão Semanal ---
                const whatsappLink = createWhatsAppLink(event.clientPhone, event.clientName, event.serviceName, event.professionalName, event.startTime);
                const isCompleted = event.status === 'completed';

                return `
                    <div class="p-2 rounded-lg border-l-4 flex flex-col justify-between" 
                         style="background-color: ${profColor.bg}; border-left-color: ${profColor.border};">
                        <div class="cursor-pointer flex-grow" data-action="open-comanda" data-appointment='${apptDataString}'>
                            <p class="font-bold text-sm text-gray-800">${startTimeStr} - ${event.clientName}</p>
                            <p class="text-xs text-gray-600 truncate">${event.serviceName}</p>
                            <p class="text-xs text-gray-500 mt-1">com ${event.professionalName || 'Indefinido'}</p> ${isRedeemed ? '<p class="text-xs text-purple-600 truncate">Resgate de Prémio</p>' : ''}
                        </div>
                        <div class="flex items-center justify-end gap-2 mt-2 pt-1 border-t border-black border-opacity-10">
                            ${!isCompleted ? `
                                <a href="${whatsappLink}" target="_blank" class="action-btn text-green-500 hover:text-green-700 p-1" title="Enviar Confirmação WhatsApp">
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.036 2a10 10 0 100 20 10 10 0 000-20zM17.5 14.8c-.24.125-1.465.716-1.696.804-.23.09-.49.135-.75.045-.26-.09-.982-.322-1.87-.965-.888-.643-1.474-1.442-1.64-1.748-.166-.307-.015-.467.106-.615.116-.149.23-.388.344-.582.113-.193.15-.327.1-.462-.05-.136-.264-.322-.544-.654-.28-.332-.572-.782-.828-.958-.255-.176-.438-.158-.61-.158-.173 0-.374-.022-.574-.022-.2 0-.54.075-.826.375-.285.3-.99.965-.99 2.355 0 1.43 1.018 2.872 1.16 3.072.14.2 2 3.047 4.86 4.218 2.86 1.17 2.86.786 3.376 1.054.516.268 1.49.462 1.696.406.206-.057 1.463-.615 1.67-.887.2-.27.2-.504.14-.615-.058-.11-.23-.166-.48-.306z"/></svg>
                                </a>
                                ` : ''}
                            <button data-action="edit-appointment" data-appointment='${apptDataString}' class="text-gray-600 hover:text-blue-600 p-1 ${isCompleted ? 'opacity-40 cursor-not-allowed' : ''}" title="Editar">
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
                    <p class="font-bold">${weekDays[day.getDay()]}</p>
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
    const filteredEvents = state.allEvents.filter(event => {
        // Filtra pelo profissional selecionado
        const profMatch = localState.selectedProfessionalId === 'all' || event.professionalId === localState.selectedProfessionalId;
        return profMatch;
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
        // ATUALIZAÇÃO: Usa o formato reduzido
        weekRangeSpan.textContent = formatDateReduced(start);
    } else {
        // CORREÇÃO (BUG 3): Usa getWeekStart para calcular a data inicial do bloco
        start = getWeekStart(new Date(localState.currentDate)); 
        end = new Date(start);
        end.setDate(start.getDate() + (localState.weekViewDays - 1));
        end.setHours(23, 59, 59, 999);
        weekRangeSpan.textContent = `${start.toLocaleDateString('pt-BR', {day: '2-digit', month: 'short'})} - ${end.toLocaleDateString('pt-BR', {day: '2-digit', month: 'short'})}`;
    }

    try {
        // Envia o ID do profissional selecionado no filtro (se não for 'all')
        const appointmentsData = await appointmentsApi.getAppointmentsByDateRange(
            state.establishmentId, 
            start.toISOString(), 
            end.toISOString(), 
            localState.selectedProfessionalId === 'all' ? null : localState.selectedProfessionalId
        );
        
        const blockagesData = await blockagesApi.getBlockagesByDateRange(
            state.establishmentId, 
            start.toISOString(), 
            end.toISOString(), 
            localState.selectedProfessionalId
        );
        
        // Combina agendamentos e bloqueios numa única lista de eventos
        const allEvents = [
            ...appointmentsData.map(a => ({ ...a, type: 'appointment' })),
            ...blockagesData.map(b => ({ ...b, type: 'blockage' }))
        ];
        
        state.allEvents = allEvents; // Armazena a lista combinada no estado global
        
        // Recarrega o seletor de profissionais para atualizar o estado de 'selected'
        renderProfessionalSelector();
        
        renderAgenda();
    } catch (error) {
        showNotification('Erro na Agenda', `Não foi possível carregar a agenda: ${error.message}`, 'error');
        agendaView.innerHTML = `<div class="p-6 text-center text-red-600">Falha ao carregar dados.</div>`;
    }
}

async function populateFilters() {
    try {
        if (!state.professionals || state.professionals.length === 0) {
            state.professionals = await professionalsApi.getProfessionals(state.establishmentId);
        }
        if (!state.services || state.services.length === 0) {
            state.services = await servicesApi.getServices(state.establishmentId);
        }

        // Aplica a cor para o filtro de card
        state.professionals.forEach((prof, index) => {
            state.professionalColors.set(prof.id, colorPalette[index % colorPalette.length]);
        });
        
        // Renderiza o seletor de fotos na primeira carga
        renderProfessionalSelector();

    } catch (error) {
        console.error("Erro ao popular filtros:", error);
    }
}

// --- LÓGICA DE MANIPULAÇÃO DO FLUXO DO MODAL ---

/**
 * Atualiza o estado da nova marcação e renderiza a view correta.
 * @param {number} step - O passo para onde navegar (1-4).
 */
function navigateModalStep(step) {
    if (step < 1 || step > 4) return;
    newAppointmentState.step = step;
    openAppointmentModal(null, true); // O segundo parâmetro true indica que é uma navegação interna
}

// Lógica para selecionar Serviço no Step 2
function handleServiceCardClick(serviceId, element) {
    const isSelected = element.classList.contains('selected');
    const index = newAppointmentState.data.selectedServiceIds.indexOf(serviceId);

    if (isSelected) {
        element.classList.remove('selected', 'border-blue-500'); // CORREÇÃO: Remove a classe da borda
        // Remove o ID do serviço da lista
        if (index > -1) newAppointmentState.data.selectedServiceIds.splice(index, 1);
    } else {
        element.classList.add('selected', 'border-blue-500'); // CORREÇÃO: Adiciona a classe da borda
        // Adiciona o ID do serviço à lista
        newAppointmentState.data.selectedServiceIds.push(serviceId);
    }
}

// Lógica para selecionar Profissional no Step 3
function handleProfessionalCardClick(professionalId, element) {
    const professionalContainer = document.querySelector('.professional-step-cards');
    if (!professionalContainer) return;
    
    // Limpa a seleção anterior
    professionalContainer.querySelectorAll('.professional-modal-card').forEach(card => card.classList.remove('selected', 'border-blue-500')); // CORREÇÃO: Remove a classe da borda
    
    // Seleciona o novo
    element.classList.add('selected', 'border-blue-500'); // CORREÇÃO: Adiciona a classe da borda
    
    const professional = availableProfessionalsForModal.find(p => p.id === professionalId);
    
    newAppointmentState.data.professionalId = professionalId;
    newAppointmentState.data.professionalName = professional ? professional.name : 'N/A';
}


// Lógica para selecionar Horário no Step 4
function handleTimeSlotClick(slot, element) {
    const timeContainer = document.getElementById('availableTimesContainer');
    if (!timeContainer) return;
    
    timeContainer.querySelectorAll('.time-slot-card').forEach(c => c.classList.remove('selected'));
    element.classList.add('selected');
    newAppointmentState.data.time = slot;
}


// --- LÓGICA DE ATUALIZAÇÃO E VALIDAÇÃO ---

async function updateTimesAndDuration() {
    const totalDurationSpan = document.getElementById('apptTotalDuration');
    const timeContainer = document.getElementById('availableTimesContainer');
    
    if (!totalDurationSpan || !timeContainer) return;

    const professionalId = newAppointmentState.data.professionalId;
    const selectedServiceIds = newAppointmentState.data.selectedServiceIds;
    const date = document.getElementById('apptDate').value;
    
    newAppointmentState.data.date = date; // Salva a data

    const totalDuration = selectedServiceIds.reduce((acc, id) => {
        const service = availableServicesForModal.find(s => s.id === id);
        return acc + (service ? (service.duration + (service.bufferTime || 0)) : 0);
    }, 0);
    totalDurationSpan.textContent = `${totalDuration} min`;

    if (totalDuration === 0 || !professionalId || !date) {
        timeContainer.innerHTML = '<p class="col-span-full text-center text-gray-500">Selecione serviço, profissional e data.</p>';
        return;
    }

    timeContainer.innerHTML = '<div class="loader mx-auto col-span-full"></div>';
    
    try {
        const serviceIdsParam = selectedServiceIds.join(',');
        const res = await fetch(`${API_BASE_URL}/api/availability?establishmentId=${state.establishmentId}&professionalId=${professionalId}&serviceIds=${serviceIdsParam}&date=${date}`);
        
        if (!res.ok) throw new Error('Falha na resposta da API de disponibilidade');
        
        let slots = await res.json();
        
        // Filtra slots passados
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
                card.className = `time-slot-card p-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 transition ${newAppointmentState.data.time === slot ? 'selected' : ''}`;
                card.textContent = slot;
                // CORREÇÃO: Anexando o listener de clique no slot
                card.addEventListener('click', () => handleTimeSlotClick(slot, card));
                timeContainer.appendChild(card);
            });
            // Re-seleciona o horário se ele ainda estiver no estado
            if (newAppointmentState.data.time) {
                const selectedSlot = timeContainer.querySelector(`[data-action="time-slot"][data-time="${newAppointmentState.data.time}"]`);
                if (selectedSlot) selectedSlot.classList.add('selected');
            }
        } else {
            timeContainer.innerHTML = `<p class="col-span-full text-center text-gray-500">Nenhum horário disponível.</p>`;
        }
    } catch (e) {
        timeContainer.innerHTML = '<p class="col-span-full text-center text-red-500">Erro ao buscar horários.</p>';
    }
}

// --- FUNÇÃO DE SUBMISSÃO FINAL ---
async function handleAppointmentFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');

    // Validação final
    if (!newAppointmentState.data.time || newAppointmentState.data.selectedServiceIds.length === 0 || !newAppointmentState.data.professionalId) {
        return showNotification('Erro de Validação', 'Por favor, selecione o horário, serviço(s) e profissional antes de confirmar.', 'error');
    }

    submitButton.disabled = true;
    submitButton.textContent = 'A confirmar...';

    const servicesData = newAppointmentState.data.selectedServiceIds.map(id => {
        const service = availableServicesForModal.find(s => s.id === id);
        return { id: service.id, name: service.name, price: service.price, duration: service.duration, bufferTime: service.bufferTime || 0, photo: service.photo || null };
    });

    const [hours, minutes] = newAppointmentState.data.time.split(':');
    const startTimeAsDate = new Date(`${newAppointmentState.data.date}T${hours}:${minutes}:00`);

    const appointmentData = {
        establishmentId: state.establishmentId,
        clientName: newAppointmentState.data.clientName, // Pego do estado
        clientPhone: newAppointmentState.data.clientPhone, // Pego do estado
        services: servicesData,
        professionalId: newAppointmentState.data.professionalId, // Pego do estado
        startTime: startTimeAsDate.toISOString(),
        redeemedReward: newAppointmentState.data.redeemedReward
    };
    
    // Se estiver editando, adicione o ID
    const appointmentId = form.querySelector('#appointmentId').value;
    if (appointmentId) {
        appointmentData.id = appointmentId;
    }


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
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Confirmar Agendamento';
    }
}


// --- RENDERIZADORES DE ETAPA ---

function renderClientCard(client) {
    const isSelected = newAppointmentState.data.clientName === client.name && newAppointmentState.data.clientPhone === client.phone;
    
    return `
        <div class="client-search-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-blue-50 ${isSelected ? 'selected border-blue-500' : ''}" 
             data-action="select-client" 
             data-client-name="${client.name}" 
             data-client-phone="${client.phone}">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">${client.name.charAt(0).toUpperCase()}</div>
                <div>
                    <p class="font-semibold text-gray-800">${client.name}</p>
                    <p class="text-sm text-gray-500">${client.phone}</p>
                </div>
            </div>
        </div>
    `;
}

async function handleClientSearch(searchTerm) {
    const resultsContainer = document.getElementById('clientSearchResults');
    if (!resultsContainer) return;
    
    // CORREÇÃO: A busca deve ser case-insensitive
    const term = searchTerm.toLowerCase().trim();

    if (term.length < 3) {
        resultsContainer.innerHTML = '<p class="text-sm text-gray-500">Digite pelo menos 3 caracteres para buscar clientes existentes.</p>';
        return;
    }
    
    // Filtra no cache local (que deve ser carregado na inicialização)
    const filteredClients = allClientsData.filter(client => 
        client.name.toLowerCase().includes(term) || 
        client.phone.includes(term)
    );

    if (filteredClients.length === 0) {
        resultsContainer.innerHTML = '<p class="text-sm text-gray-500">Nenhum cliente encontrado com este termo.</p>';
        return;
    }

    resultsContainer.innerHTML = filteredClients.map(renderClientCard).join('');
    
    // Anexa listeners de seleção aos novos cards renderizados
    resultsContainer.querySelectorAll('[data-action="select-client"]').forEach(card => {
        card.addEventListener('click', (e) => {
            const clientName = card.dataset.clientName;
            const clientPhone = card.dataset.clientPhone;
            
            // Atualiza o estado
            newAppointmentState.data.clientName = clientName;
            newAppointmentState.data.clientPhone = clientPhone;
            
            // Atualiza a UI da etapa 1 (Inputs e Resultados)
            document.getElementById('apptClientName').value = clientName;
            document.getElementById('apptClientPhone').value = clientPhone;
            
            // Força a atualização visual (deseleciona todos e seleciona o atual)
            document.querySelectorAll('.client-search-card').forEach(c => c.classList.remove('selected', 'border-blue-500'));
            card.classList.add('selected', 'border-blue-500');
        });
    });
}

async function handleClientRegistration(e) {
    e.preventDefault();
    const form = document.getElementById('clientRegistrationForm');
    const registerButton = form.querySelector('button[type="submit"]');

    const clientData = {
        establishmentId: state.establishmentId,
        name: form.querySelector('#regClientName').value.trim(),
        email: form.querySelector('#regClientEmail').value.trim(),
        phone: form.querySelector('#regClientPhone').value.trim(),
        dobDay: form.querySelector('#regClientDobDay').value.trim(),
        dobMonth: form.querySelector('#regClientDobMonth').value.trim(),
        notes: form.querySelector('#regClientNotes').value.trim(),
    };

    if (!clientData.name || !clientData.phone) {
         return showNotification('Erro de Validação', 'Nome e Telefone são obrigatórios.', 'error');
    }
    
    registerButton.disabled = true;
    registerButton.textContent = 'A salvar...';

    try {
        // CORREÇÃO: Chama a API real para criar o cliente
        await clientsApi.createClient(clientData);
        
        // Adiciona o novo cliente ao cache local para que a busca o encontre imediatamente
        allClientsData.push({ name: clientData.name, phone: clientData.phone, loyaltyPoints: 0 });
        
        // ATUALIZAÇÃO DO ESTADO DE AGENDAMENTO
        newAppointmentState.data.clientName = clientData.name;
        newAppointmentState.data.clientPhone = clientData.phone;
        
        showNotification('Cliente cadastrado com sucesso!', 'success');
        
        // CORREÇÃO: Fecha o modal genérico
        document.getElementById('genericModal').style.display = 'none';
        
        // Re-renderiza a Step 1 para mostrar o cliente selecionado
        navigateModalStep(1); 
        
    } catch (error) {
        showNotification(`Erro ao cadastrar cliente: ${error.message}`, 'error');
    } finally {
        registerButton.disabled = false;
        registerButton.textContent = 'Salvar';
    }
}

function renderClientRegistrationModal() {
    // CORREÇÃO: O conteúdo agora é apenas o formulário, pois o modal genérico cria a estrutura.
    const modalContent = `
        <form id="clientRegistrationForm" class="flex flex-col h-full">
            <div class="flex-1 overflow-y-auto p-5 space-y-6" style="max-height: 80vh;">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label for="regClientName" class="block text-sm font-medium text-gray-700">Nome</label><input type="text" id="regClientName" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm"></div>
                    <div><label for="regClientEmail" class="block text-sm font-medium text-gray-700">E-mail</label><input type="email" id="regClientEmail" class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm"></div>
                    <div><label for="regClientPhone" class="block text-sm font-medium text-gray-700">Telefone</label><input type="tel" id="regClientPhone" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm"></div>
                    <div><label for="regClientDobDay" class="block text-sm font-medium text-gray-700">Aniversário (Dia)</label><input type="number" id="regClientDobDay" min="1" max="31" class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm"></div>
                    <div><label for="regClientDobMonth" class="block text-sm font-medium text-gray-700">Aniversário (Mês)</label><input type="number" id="regClientDobMonth" min="1" max="12" class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm"></div>
                </div>
                <div><label for="regClientNotes" class="block text-sm font-medium text-gray-700">Observações</label><textarea id="regClientNotes" rows="3" class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm"></textarea></div>
            </div>
            
            <footer class="p-5 border-t bg-gray-100 flex justify-end gap-3 flex-shrink-0">
                <button type="button" data-action="close-modal" data-target="genericModal" class="py-3 px-6 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition shadow-sm">Cancelar</button>
                <button type="submit" class="py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-md">Salvar</button>
            </footer>
        </form>
    `;

    // CORREÇÃO: Usa a assinatura correta de `showGenericModal`
    showGenericModal({
        title: 'Cadastrar Novo Cliente',
        contentHTML: modalContent,
        maxWidth: 'max-w-2xl'
    });
    
    // CORREÇÃO: Anexa o listener de submit ao formulário DEPOIS que o modal é renderizado.
    const form = document.getElementById('clientRegistrationForm');
    if (form) {
         form.addEventListener('submit', handleClientRegistration);
    }
}


function openClientRegistrationModal() {
    renderClientRegistrationModal();
}

function renderStep1_Client(appointment, isNavigating) {
    const title = appointment ? 'Editar Agendamento' : 'Selecionar Cliente';
    const formContent = `
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">1. Dados do Cliente</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="apptClientName" class="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input type="text" id="apptClientName" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm" placeholder="Nome Completo" value="${newAppointmentState.data.clientName}">
                </div>
                <div>
                    <label for="apptClientPhone" class="block text-sm font-medium text-gray-700">Telemóvel</label>
                    <input type="tel" id="apptClientPhone" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm" placeholder="(XX) XXXXX-XXXX" value="${newAppointmentState.data.clientPhone}">
                </div>
            </div>
             <div class="flex items-center gap-4 bg-gray-100 p-4 rounded-lg border border-gray-200">
                <div class="relative flex-grow">
                    <input type="text" id="clientSearchInput" placeholder="Buscar cliente existente..." class="w-full p-3 pl-10 border rounded-lg">
                    <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <button type="button" data-action="open-client-registration" class="bg-green-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-600 flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                    Cadastrar
                </button>
            </div>
            
            <div id="clientSearchResults" class="space-y-3 max-h-40 overflow-y-auto p-1">
                <p class="text-sm text-gray-500">Digite para buscar clientes existentes.</p>
            </div>
        </div>
        
        <footer class="p-5 border-t bg-gray-100 flex justify-end gap-3 flex-shrink-0">
            <button type="button" data-action="close-modal" data-target="appointmentModal" class="py-3 px-6 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition shadow-sm">Cancelar</button>
            <button type="button" data-action="next-step" data-current-step="1" class="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md">Avançar</button>
        </footer>
    `;
    return { title: title, content: formContent };
}

function renderStep2_Service() {
    const title = 'Selecionar Serviço';
    
    const formContent = `
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">2. Serviços</h3>
             <div class="flex items-center gap-4 bg-gray-100 p-4 rounded-lg border border-gray-200">
                 <input type="search" id="serviceSearchModalInput" placeholder="Buscar Serviço..." class="flex-grow p-3 pl-10 border rounded-lg">
            </div>
            
            <div id="apptServicesContainer" class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto p-1">
                 ${availableServicesForModal.map(service => {
                    const isChecked = newAppointmentState.data.selectedServiceIds.includes(service.id);
                    const photoSrc = service.photo || 'https://placehold.co/40x40/E0E7FF/4F46E5?text=S';
                    
                    return `
                        <div class="service-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${isChecked ? 'selected border-blue-500' : ''}" data-service-id="${service.id}">
                            <div class="flex items-center">
                                <img src="${photoSrc}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0">
                                <div class="flex-1">
                                    <p class="font-semibold text-sm text-gray-800">${service.name}</p>
                                    <p class="text-xs text-gray-500">R$ ${service.price.toFixed(2)} (${service.duration} min)</p>
                                </div>
                            </div>
                        </div>`;
                }).join('')}
            </div>
        </div>
        
        <footer class="p-5 border-t bg-gray-100 flex justify-between gap-3 flex-shrink-0">
            <button type="button" data-action="prev-step" data-current-step="2" class="py-3 px-6 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition shadow-sm">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="2" class="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md">Avançar</button>
        </footer>
    `;
    return { title: title, content: formContent };
}

function renderStep3_Professional() {
    const title = 'Selecionar Profissional';

    const formContent = `
        <div class="p-5 space-y-6">
             <h3 class="text-xl font-bold text-gray-800">3. Profissional</h3>
             <div id="apptProfessionalContainer" class="mt-4 flex flex-wrap gap-3 max-h-48 overflow-y-auto p-1 professional-step-cards">
                 ${availableProfessionalsForModal.map(prof => {
                    const isChecked = newAppointmentState.data.professionalId === prof.id;
                    const photoSrc = prof.photo || 'https://placehold.co/60x60/E0E7FF/4F46E5?text=P';
                    
                    return `
                         <div class="professional-modal-card p-3 bg-white rounded-lg border-2 border-gray-200 text-center cursor-pointer transition-all hover:bg-gray-50 ${isChecked ? 'selected border-blue-500' : ''}" data-professional-id="${prof.id}">
                             <img src="${photoSrc}" class="w-12 h-12 rounded-full object-cover mx-auto mb-1">
                             <p class="text-xs font-semibold text-gray-800">${prof.name.split(' ')[0]}</p>
                             <p class="text-[10px] text-gray-500">${prof.specialty || 'Profissional'}</p>
                         </div>`;
                    }).join('')}
             </div>
             <div class="flex items-center gap-4 bg-gray-100 p-4 rounded-lg border border-gray-200">
                <input type="search" id="professionalSearchModalInput" placeholder="Buscar profissional por nome..." class="flex-grow p-3 pl-10 border rounded-lg">
             </div>
        </div>
        
        <footer class="p-5 border-t bg-gray-100 flex justify-between gap-3 flex-shrink-0">
            <button type="button" data-action="prev-step" data-current-step="3" class="py-3 px-6 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition shadow-sm">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="3" class="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md">Avançar</button>
        </footer>
    `;
    return { title: title, content: formContent };
}

function renderStep4_Schedule(appointment) {
    const title = appointment ? 'Confirmar Edição' : 'Data e Horário';
    
    // Obter data formatada para a exibição no cabeçalho
    const today = new Date();
    const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const initialDate = newAppointmentState.data.date || todayString;

    const formContent = `
        <div class="p-5 space-y-6">
            <h3 class="text-xl font-bold text-gray-800">4. ${title}</h3>

            <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 space-y-1">
                <p class="font-bold text-gray-800">${newAppointmentState.data.clientName}</p>
                <p class="text-sm text-gray-700">Serviços: ${newAppointmentState.data.selectedServiceIds.length} selecionado(s)</p>
                <p class="text-sm text-gray-700">Profissional: ${newAppointmentState.data.professionalName}</p>
            </div>

            <div class="grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                    <label for="apptDate" class="block text-sm font-medium text-gray-700">Data</label>
                    <input type="date" id="apptDate" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500" value="${initialDate}">
                </div>
                <div class="bg-gray-100 p-3 rounded-lg shadow-sm flex flex-col justify-center">
                    <label class="block text-xs font-medium text-gray-600">Duração Total Estimada</label>
                    <span id="apptTotalDuration" class="mt-1 text-xl font-bold text-gray-800">0 min</span>
                </div>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Horários Disponíveis</label>
                <div id="availableTimesContainer" class="mt-2 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 max-h-40 overflow-y-auto p-3 bg-gray-50 rounded-lg border">
                    <p class="col-span-full text-center text-gray-500">Selecione serviço(s), profissional e data.</p>
                </div>
            </div>

             <div id="loyaltyRewardsContainer" class="hidden bg-indigo-50 p-4 rounded-lg"></div>
        </div>
        
        <footer class="p-5 border-t bg-gray-100 flex justify-between gap-3 flex-shrink-0">
            <button type="button" data-action="prev-step" data-current-step="4" class="py-3 px-6 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition shadow-sm">Voltar</button>
            <button type="submit" class="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md">Confirmar Agendamento</button>
        </footer>
    `;
    return { title: title, content: formContent };
}

// --- FUNÇÕES DE BUSCA NO MODAL ---
function handleServiceSearchInModal(searchTerm) {
    const container = document.getElementById('apptServicesContainer');
    if (!container) return;
    const term = searchTerm.toLowerCase();
    const filtered = availableServicesForModal.filter(s => s.name.toLowerCase().includes(term));

    container.innerHTML = filtered.map(service => {
        const isChecked = newAppointmentState.data.selectedServiceIds.includes(service.id);
        const photoSrc = service.photo || 'https://placehold.co/40x40/E0E7FF/4F46E5?text=S';
        
        return `
            <div class="service-card p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${isChecked ? 'selected border-blue-500' : ''}" data-service-id="${service.id}">
                <div class="flex items-center">
                    <img src="${photoSrc}" class="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0">
                    <div class="flex-1">
                        <p class="font-semibold text-sm text-gray-800">${service.name}</p>
                        <p class="text-xs text-gray-500">R$ ${service.price.toFixed(2)} (${service.duration} min)</p>
                    </div>
                </div>
            </div>`;
    }).join('');

    // Reanexa os listeners de clique aos cards filtrados
    container.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', () => handleServiceCardClick(card.dataset.serviceId, card));
    });
}

function handleProfessionalSearchInModal(searchTerm) {
    const container = document.getElementById('apptProfessionalContainer');
    if (!container) return;
    const term = searchTerm.toLowerCase();
    const filtered = availableProfessionalsForModal.filter(p => p.name.toLowerCase().includes(term));

    container.innerHTML = filtered.map(prof => {
        const isChecked = newAppointmentState.data.professionalId === prof.id;
        const photoSrc = prof.photo || 'https://placehold.co/60x60/E0E7FF/4F46E5?text=P';
        
        return `
             <div class="professional-modal-card p-3 bg-white rounded-lg border-2 border-gray-200 text-center cursor-pointer transition-all hover:bg-gray-50 ${isChecked ? 'selected border-blue-500' : ''}" data-professional-id="${prof.id}">
                 <img src="${photoSrc}" class="w-12 h-12 rounded-full object-cover mx-auto mb-1">
                 <p class="text-xs font-semibold text-gray-800">${prof.name.split(' ')[0]}</p>
                 <p class="text-[10px] text-gray-500">${prof.specialty || 'Profissional'}</p>
             </div>`;
    }).join('');

    // Reanexa os listeners de clique aos cards filtrados
    container.querySelectorAll('.professional-modal-card').forEach(card => {
        card.addEventListener('click', () => handleProfessionalCardClick(card.dataset.professionalId, card));
    });
}


// --- FUNÇÃO PRINCIPAL DO MODAL ---

async function openAppointmentModal(appointment = null, isNavigating = false) {
    const modal = document.getElementById('appointmentModal');
    
    // CORREÇÃO: Reinicia o estado na abertura inicial (não navegação) e usa dados existentes para pré-preencher
    if (!isNavigating) {
        // Formata a data de início para o valor inicial do input
        const initialDateString = appointment?.startTime 
            ? new Date(appointment.startTime).toISOString().split('T')[0] 
            : new Date().toISOString().split('T')[0];

        // Formata a hora de início para o valor inicial do input (usado para seleção de slot)
        const initialTimeString = appointment?.startTime
            ? new Date(appointment.startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false })
            : null;

        newAppointmentState = {
            step: 1,
            data: {
                id: appointment?.id || null, // <-- AJUSTE FEITO (2/3): Salva o ID no estado
                clientName: appointment?.clientName || '',
                clientPhone: appointment?.clientPhone || '',
                // CORREÇÃO: Usa os IDs dos serviços existentes
                selectedServiceIds: appointment?.services?.map(s => s.id) || [], 
                professionalId: appointment?.professionalId || null,
                professionalName: appointment?.professionalName || '',
                date: initialDateString,
                time: initialTimeString,
                redeemedReward: appointment?.redeemedReward || null
            }
        };
    }
    
    // --- 1. Busca de Dados (Garante que os catálogos estão prontos) ---
    try {
        const [details, servicesData, professionalsData, clientsData] = await Promise.all([
            establishmentApi.getEstablishmentDetails(state.establishmentId),
            servicesApi.getServices(state.establishmentId),
            (await professionalsApi.getProfessionals(state.establishmentId)).filter(p => p.status === 'active'),
            clientsApi.getClients(state.establishmentId) // NOVO: Busca todos os clientes
        ]);
        
        loyaltySettingsForModal = details.loyaltyProgram || { enabled: false };
        availableServicesForModal = servicesData;
        availableProfessionalsForModal = professionalsData;
        allClientsData = clientsData; // NOVO: Salva clientes no cache

    } catch (error) {
        showNotification('Erro Crítico', 'Não foi possível carregar os dados para o agendamento. Verifique a conexão.', 'error');
        modal.style.display = 'none';
        return;
    }

    // --- 2. Renderiza a Etapa Atual ---
    let renderResult = { title: 'Erro', content: '<p>Etapa não encontrada.</p>' };
    
    switch (newAppointmentState.step) {
        case 1: renderResult = renderStep1_Client(appointment, isNavigating); break;
        case 2: renderResult = renderStep2_Service(); break;
        case 3: renderResult = renderStep3_Professional(); break;
        case 4: renderResult = renderStep4_Schedule(appointment); break;
        default: break;
    }
    
    // 3. Monta o Modal
    modal.innerHTML = `
        <div class="modal-content max-w-4xl p-0 rounded-xl overflow-hidden shadow-2xl">
            <header class="p-5 border-b flex justify-between items-center bg-gray-50">
                <h2 class="text-xl font-bold text-gray-800">${renderResult.title}</h2>
                <button type="button" data-action="close-modal" data-target="appointmentModal" class="text-2xl font-bold text-gray-500 hover:text-gray-900">&times;</button>
            </header>
            
            <form id="appointmentForm" class="flex flex-col h-full">
                <input type="hidden" id="appointmentId" value="${newAppointmentState.data.id || ''}">
                <input type="hidden" id="selectedTime" value="${newAppointmentState.data.time || ''}">
                
                <div class="flex-1 overflow-y-auto" style="max-height: 80vh;">
                    ${renderResult.content}
                </div>
                
            </form>
        </div>`;

    // 4. Anexa Listeners de Navegação/Ação
    modal.querySelectorAll('[data-action="next-step"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const currentStep = parseInt(btn.dataset.currentStep, 10);
            
            // Validação
            if (currentStep === 1) {
                const clientNameInput = modal.querySelector('#apptClientName');
                const clientPhoneInput = modal.querySelector('#apptClientPhone');

                // Garante que o estado seja atualizado com os dados atuais dos inputs antes da validação
                newAppointmentState.data.clientName = clientNameInput.value.trim();
                newAppointmentState.data.clientPhone = clientPhoneInput.value.trim();
                
                if (!newAppointmentState.data.clientName || !newAppointmentState.data.clientPhone) {
                    return showNotification('Atenção', 'Nome e telefone do cliente são obrigatórios.', 'error');
                }
            } else if (currentStep === 2) {
                if (newAppointmentState.data.selectedServiceIds.length === 0) {
                     return showNotification('Atenção', 'Selecione pelo menos um serviço.', 'error');
                }
            } else if (currentStep === 3) {
                 if (!newAppointmentState.data.professionalId) {
                     return showNotification('Atenção', 'Selecione um profissional.', 'error');
                 }
            }
            
            navigateModalStep(currentStep + 1);
        });
    });

    modal.querySelectorAll('[data-action="prev-step"]').forEach(btn => {
        btn.addEventListener('click', () => navigateModalStep(parseInt(btn.dataset.currentStep, 10) - 1));
    });

    // Event listener para o formulário na Etapa 4
    const appointmentForm = modal.querySelector('#appointmentForm');
    
    // Se estivermos na Etapa 4 (e o botão de submit for renderizado)
    if (newAppointmentState.step === 4 && appointmentForm) {
         appointmentForm.addEventListener('submit', handleAppointmentFormSubmit);
    }


    // 5. Ativação inicial do modal e listeners específicos da etapa

    // Certifica-se de que o modal está visível
    modal.style.display = 'flex';
    
    // --- LÓGICA DE ATIVAÇÃO DE CARDS (Step 2 & 3) ---
    if (newAppointmentState.step === 2) {
        const servicesContainer = modal.querySelector('#apptServicesContainer');
        servicesContainer.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('click', () => handleServiceCardClick(card.dataset.serviceId, card));
        });
        const serviceSearchInput = modal.querySelector('#serviceSearchModalInput');
        if (serviceSearchInput) {
            serviceSearchInput.addEventListener('input', (e) => handleServiceSearchInModal(e.target.value));
        }
    }

    if (newAppointmentState.step === 3) {
        const professionalContainer = modal.querySelector('#apptProfessionalContainer');
        professionalContainer.querySelectorAll('.professional-modal-card').forEach(card => {
            card.addEventListener('click', () => handleProfessionalCardClick(card.dataset.professionalId, card));
        });
        const professionalSearchInput = modal.querySelector('#professionalSearchModalInput');
        if (professionalSearchInput) {
            professionalSearchInput.addEventListener('input', (e) => handleProfessionalSearchInModal(e.target.value));
        }
    }
    
    // --- LÓGICA ESPECÍFICA DA STEP 1 (Busca e Cadastro) ---
    if (newAppointmentState.step === 1) {
        const clientSearchInput = modal.querySelector('#clientSearchInput');
        
        // Listener para a busca de clientes (em tempo real)
        if (clientSearchInput) {
            clientSearchInput.addEventListener('input', (e) => handleClientSearch(e.target.value));
            
            // CORREÇÃO: Disparar a busca inicial se houver dados no estado, para mostrar a seleção
             if (newAppointmentState.data.clientName && newAppointmentState.data.clientPhone) {
                 // Concatena nome e telefone para simular um termo de busca que traria o cliente
                 handleClientSearch(`${newAppointmentState.data.clientName} ${newAppointmentState.data.clientPhone}`);
             }
        }

        // Listener para abrir o modal de cadastro de novo cliente
        const registerButton = modal.querySelector('[data-action="open-client-registration"]');
        if (registerButton) {
            registerButton.addEventListener('click', openClientRegistrationModal);
        }
    }
    
    // Lógica para a Etapa 4 (Data/Hora)
    if (newAppointmentState.step === 4) {
        const dateInput = modal.querySelector('#apptDate');
        
        // Listener para atualização de horários ao mudar a data
        if (dateInput) dateInput.addEventListener('change', updateTimesAndDuration);
        
        // Chamada inicial (após a renderização)
        updateTimesAndDuration();

        // Lógica de Fidelidade (Disparada no carregamento da Step 4)
        const clientPhoneInput = modal.querySelector('#apptClientPhone');
        if (clientPhoneInput) clientPhoneInput.dispatchEvent(new Event('blur'));

    }
}


// --- 5. FUNÇÃO PRINCIPAL EXPORTADA ---

export async function loadAgendaPage() {
    if (currentTimeInterval) clearInterval(currentTimeInterval);
    localState.currentDate = new Date();
    // Limpa o termo de busca ao carregar a página
    localState.profSearchTerm = ''; 

    contentDiv.innerHTML = `
        <section>
            <div class="flex flex-wrap justify-between items-center mb-6 gap-4">
                <div class="flex items-center gap-4">
                    <div class="flex items-center gap-1 rounded-lg bg-gray-200 p-1">
                        <button data-view="list" class="view-btn active">Lista</button>
                        <button data-view="week" class="view-btn">Semana</button>
                    </div>
                    <div id="week-days-toggle" class="hidden items-center gap-1 rounded-lg bg-gray-200 p-1">
                        <button data-days="3" class="week-days-btn view-btn">3 dias</button>
                        <button data-days="5" class="week-days-btn view-btn">5 dias</button>
                        <button data-days="7" class="week-days-btn view-btn active">7 dias</button>
                    </div>
                    <button id="todayBtn" class="p-2 border rounded-md shadow-sm font-semibold">Hoje</button>
                    <button id="prevBtn" data-amount="-1" class="p-2 border rounded-md shadow-sm"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button>
                    <button id="nextBtn" data-amount="1" class="p-2 border rounded-md shadow-sm"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button>
                    <span id="weekRange" class="font-semibold text-lg"></span>
                </div>
            </div>
            
            <div class="bg-white p-4 rounded-xl shadow-lg mb-6">
                 <div class="prof-search-bar flex items-center gap-4">
                    <input type="search" id="profSearchInput" placeholder="Pesquisar profissional por nome..." class="flex-grow p-2 border rounded-md shadow-sm">
                    <label class="flex items-center space-x-2 cursor-pointer flex-shrink-0">
                        <div class="relative">
                            <input type="checkbox" id="showInactiveProfsToggle" class="sr-only">
                            <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                        </div>
                        <span class="text-sm font-medium text-gray-700">Inativos</span>
                    </label>
                </div>
                <div id="profSelectorContainer" class="prof-selector-container mt-2 flex">
                    <div class="loader mx-auto"></div>
                </div>
            </div>
            <div id="agenda-view" class="bg-white rounded-xl shadow-lg overflow-hidden"></div>
            
            <button data-action="new-appointment" class="fixed bottom-10 right-10 bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:bg-indigo-700 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
            </button>
        </section>`;

    // Adiciona listeners aos botões de navegação
    document.querySelectorAll('.view-btn[data-view]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.view-btn[data-view]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            localState.currentView = btn.dataset.view;

            const weekDaysToggle = document.getElementById('week-days-toggle');
            if (localState.currentView === 'week') {
                weekDaysToggle.style.display = 'flex';
            } else {
                weekDaysToggle.style.display = 'none';
            }

            fetchAndDisplayAgenda();
        });
    });

    document.querySelectorAll('.week-days-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.week-days-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            localState.weekViewDays = parseInt(btn.dataset.days, 10);
            fetchAndDisplayAgenda();
        });
    });

    document.getElementById('todayBtn').addEventListener('click', () => {
        localState.currentDate = new Date();
        fetchAndDisplayAgenda();
    });
    
    // CORREÇÃO (BUG 3): Lógica unificada para navegação semanal
    const handleNavigationClick = (e) => {
        const amount = parseInt(e.currentTarget.dataset.amount, 10);
        const step = localState.currentView === 'week' ? localState.weekViewDays : 1;
        
        const newDate = new Date(localState.currentDate);
        newDate.setDate(newDate.getDate() + amount * step);
        localState.currentDate = newDate;
        
        fetchAndDisplayAgenda();
    };

    document.getElementById('prevBtn').addEventListener('click', handleNavigationClick);
    document.getElementById('nextBtn').addEventListener('click', handleNavigationClick);
    
    // NOVO: Listeners para o filtro de profissionais (Busca, Seleção e Toggle)
    document.getElementById('profSearchInput').addEventListener('input', (e) => {
        localState.profSearchTerm = e.target.value;
        renderProfessionalSelector();
    });

    document.getElementById('showInactiveProfsToggle').addEventListener('change', (e) => {
        localState.showInactiveProfs = e.target.checked;
        // Se a busca estiver ativa, o render vai lidar com a filtragem
        // Se a busca estiver vazia, apenas atualiza a lista de seleção
        renderProfessionalSelector(); 
        fetchAndDisplayAgenda(); // Adiciona o fetch para reatualizar a agenda com base nos inativos/ativos
    });
    
    // --- INÍCIO DA CORREÇÃO PRINCIPAL: Previne que o listener de delegação seja anexado múltiplas vezes ---
    if (!hasContentDelegationInitialized) {
        contentDiv.addEventListener('click', async (e) => {
            const targetElement = e.target.closest('[data-action]');
            
            // LÓGICA DE SELEÇÃO DE PROFISSIONAL
            if (e.target.closest('[data-action="select-professional"]')) {
                const selectedProfCard = e.target.closest('[data-action="select-professional"]');
                const profId = selectedProfCard.dataset.profId;
                
                // Verifica se está deselecionando o profissional atual
                const isDeselecting = localState.selectedProfessionalId === profId && profId !== 'all';
                
                localState.selectedProfessionalId = isDeselecting ? 'all' : profId;

                // Limpa o termo de busca se um profissional foi selecionado
                if (profId !== 'all') {
                    const searchInput = document.getElementById('profSearchInput');
                    if(searchInput) {
                        searchInput.value = '';
                    }
                    localState.profSearchTerm = '';
                }
                
                await fetchAndDisplayAgenda(); // Atualiza a agenda com o novo filtro
                return;
            }

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
                    if (!apptData) return;
                    
                    // --- CORREÇÃO SOLICITADA: Bloquear edição se finalizada ---
                    if (apptData.status === 'completed') {
                        showNotification('Atenção', 'Agendamentos finalizados não podem ser editados.', 'error');
                        return;
                    }
                    // --- FIM CORREÇÃO SOLICITADA ---

                    openAppointmentModal(apptData);
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
        hasContentDelegationInitialized = true; // Define a flag após anexar
    }
    // --- FIM DA CORREÇÃO PRINCIPAL ---

    await populateFilters();
    await fetchAndDisplayAgenda();
}