// js/ui/agenda.js

import * as appointmentsApi from '../api/appointments.js';
import * as servicesApi from '../api/services.js';
import * as professionalsApi from '../api/professionals.js';
import * as blockagesApi from '../api/blockages.js';
import * as clientsApi from '../api/clients.js';
import * as establishmentApi from '../api/establishments.js';
import { state } from '../state.js';
import { showNotification, showConfirmation, showGenericModal } from '../components/modal.js';
import { navigateTo } from '../main.js';
import { escapeHTML } from '../utils.js';

const contentDiv = document.getElementById('content');
let currentTimeInterval = null;
let hasContentDelegationInitialized = false; 

const colorPalette = [
    { bg: '#e0e7ff', border: '#4f46e5', main: '#4f46e5', light: '#c7d2fe' }, 
    { bg: '#d1fae5', border: '#059669', main: '#059669', light: '#a7f3d0' }, 
    { bg: '#ffe4e6', border: '#e11d48', main: '#e11d48', light: '#fecdd3' }, 
    { bg: '#fef3c7', border: '#d97706', main: '#d97706', light: '#fde68a' }, 
    { bg: '#cffafe', border: '#0e7490', main: '#0e7490', light: '#a5f3fc' }, 
    { bg: '#e0f2fe', border: '#0284c7', main: '#0284c7', light: '#bae6fd' }, 
    { bg: '#ede9fe', border: '#7c3aed', main: '#7c3aed', light: '#ddd6fe' }, 
    { bg: '#fce7f3', border: '#db2777', main: '#db2777', light: '#fbcfe8' }, 
];

let availableServicesForModal = [];
let availableProfessionalsForModal = [];
let loyaltySettingsForModal = {};
let allClientsData = []; 

let localState = {
    currentView: window.innerWidth < 768 ? 'list' : 'week', 
    weekViewDays: window.innerWidth < 768 ? 3 : 7, 
    currentDate: new Date(),
    selectedProfessionalId: 'all', 
    profSearchTerm: '', 
    showInactiveProfs: false, 
    scrollToAppointmentId: null,
    isSelectionMode: false,
    selectedItems: new Set() 
};

let newAppointmentState = {
    step: 1, 
    data: {
        id: null, clientName: '', clientPhone: '', selectedServiceIds: [],
        professionalId: null, professionalName: '', date: null, time: null,
        redeemedReward: null, clientHasRewards: false, clientLoyaltyPoints: 0
    }
};

// 🔥 CORREÇÃO: Função que estava a faltar adicionada aqui
function getActiveWeekDays() {
    return localState.weekViewDays || 7;
}

function getWeekStart(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    if (localState.currentView === 'week' && localState.weekViewDays === 7) {
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); 
        return new Date(d.setDate(diff));
    }
    return d;
}

// ============================================================================
// 🎨 RENDERIZAÇÃO DA UI DA AGENDA
// ============================================================================

function renderProfessionalSelector() {
    const container = document.getElementById('profSelectorContainer');
    if (!container || !state.professionals) return;

    let availableProfs = state.professionals.filter(p => localState.showInactiveProfs || p.status !== 'inactive');

    const allOption = [{ id: 'all', name: 'Todos', photo: null, status: 'active' }];
    const professionalsToRender = [...allOption, ...availableProfs];

    container.innerHTML = professionalsToRender.map((prof) => {
        const isSelected = localState.selectedProfessionalId === prof.id;
        const profName = prof.name === 'Todos' ? 'Todos' : prof.name.split(' ')[0];
        const initials = prof.name === 'Todos' ? 'T' : prof.name.charAt(0).toUpperCase();
        const isActive = prof.status !== 'inactive';
        
        const defaultColor = colorPalette[0];
        const profColor = prof.id !== 'all' ? state.professionalColors.get(prof.id) || defaultColor : { main: '#6b7280', light: '#f3f4f6' };
        
        const ringStyle = isSelected ? `ring-2 ring-offset-2 ring-[${profColor.main}]` : 'ring-1 ring-gray-200 hover:ring-gray-300';
        const opacityStyle = !isActive ? 'opacity-50 grayscale' : '';
        const bgStyle = prof.photo ? `background-image: url('${prof.photo}'); background-size: cover; background-position: center;` : `background-color: ${profColor.light}; color: ${profColor.main};`;

        return `
            <div class="flex flex-col items-center gap-1 cursor-pointer group flex-shrink-0 ${opacityStyle}" data-action="select-professional" data-prof-id="${prof.id}">
                <div class="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-sm ${ringStyle}" style="${bgStyle}">
                    ${!prof.photo ? initials : ''}
                </div>
                <span class="text-xs font-medium ${isSelected ? 'text-gray-900 font-bold' : 'text-gray-500'} truncate w-14 text-center">${escapeHTML(profName)}</span>
            </div>
        `;
    }).join('');
}

function createWhatsAppLink(phone, clientName, serviceName, professionalName, startTime) {
    const cleanedPhone = (phone || '').replace(/\D/g, '');
    const date = new Date(startTime).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    const time = new Date(startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const message = `Olá, ${clientName}! Você tem um agendamento de ${serviceName} com o(a) profissional ${professionalName} para o dia ${date} às ${time}. Podemos confirmar? Agradecemos a preferência!`;
    return `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(message)}`;
}

function renderListView(allEvents) {
    const agendaView = document.getElementById('agenda-view');
    if (!agendaView) return;

    allEvents.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    if (allEvents.length === 0) {
        agendaView.innerHTML = `
            <div class="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-xl mx-4 mt-4 w-full max-w-4xl">
                <div class="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-3 border border-gray-100">
                    <i class="bi bi-calendar-x text-xl text-gray-400"></i>
                </div>
                <h3 class="text-base font-semibold text-gray-800 mb-1">Agenda Livre</h3>
                <p class="text-sm text-gray-500">Nenhum evento programado para este dia.</p>
            </div>
        `;
        return;
    }

    const cardsHTML = allEvents.map(event => {
        const startTime = new Date(event.startTime);
        const endTime = new Date(event.endTime);
        const startTimeStr = startTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        const endTimeStr = endTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        const profColor = state.professionalColors.get(event.professionalId) || { border: '#cbd5e1' };
        
        const isSelected = localState.selectedItems.has(event.id);
        const checkboxHTML = localState.isSelectionMode ? `
            <div class="flex items-center justify-center pr-4 border-r border-gray-100 mr-4">
                 <input type="checkbox" class="w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer" data-action="toggle-select-item" data-id="${event.id}" ${isSelected ? 'checked' : ''}>
            </div>` : '';

        if (event.type === 'blockage') {
            return `
                <div class="bg-red-50/30 hover:bg-red-50 transition-colors border border-red-100 rounded-lg p-4 flex items-center shadow-sm relative overflow-hidden group">
                    <div class="absolute left-0 top-0 bottom-0 w-1" style="background-color: ${profColor.border};"></div>
                    ${checkboxHTML}
                    <div class="w-20 text-left border-r border-red-100 pr-4 mr-4">
                        <p class="font-bold text-lg text-red-900">${startTimeStr}</p>
                        <p class="text-xs text-red-400 mt-0.5">${endTimeStr}</p>
                    </div>
                    <div class="flex-1 min-w-0 text-left">
                        <p class="font-semibold text-red-800 truncate text-base">${escapeHTML(event.reason)}</p>
                        <p class="text-sm text-red-500 truncate flex items-center gap-1 mt-0.5"><i class="bi bi-person-slash"></i> ${escapeHTML(event.professionalName)}</p>
                    </div>
                    <span class="bg-red-100 text-red-700 text-xs font-semibold px-2.5 py-1 rounded hidden md:block">Bloqueio</span>
                </div>`;
        }

        const isCompleted = event.status === 'completed';
        const isRedeemed = event.redeemedReward?.points > 0;
        const hasRewards = event.hasRewards && !isRedeemed;
        const apptDataString = JSON.stringify(event).replace(/'/g, "&apos;");
        const whatsappLink = createWhatsAppLink(event.clientPhone, event.clientName, event.serviceName, event.professionalName, event.startTime);
        const cardAction = localState.isSelectionMode ? '' : 'data-action="open-comanda"';

        return `
            <div class="bg-white hover:bg-gray-50 transition-colors border ${isCompleted ? 'border-emerald-100' : 'border-gray-200'} rounded-lg p-4 flex items-center shadow-sm relative overflow-hidden group cursor-pointer" data-appointment='${apptDataString}'>
                <div class="absolute left-0 top-0 bottom-0 w-1" style="background-color: ${profColor.border};"></div>
                ${checkboxHTML}
                
                <div class="w-20 text-left border-r border-gray-100 pr-4 mr-4" ${cardAction}>
                    <p class="font-bold text-lg text-gray-900 ${isCompleted ? 'opacity-50 line-through' : ''}">${startTimeStr}</p>
                    <p class="text-xs text-gray-400 mt-0.5">${endTimeStr}</p>
                </div>
                
                <div class="flex-1 min-w-0 text-left" ${cardAction}>
                    <div class="flex items-center gap-2 mb-1">
                        <p class="font-semibold text-gray-800 truncate text-base ${isCompleted ? 'opacity-50' : ''}">${hasRewards ? '🎁 ' : ''}${escapeHTML(event.clientName)}</p>
                        ${isRedeemed ? '<span class="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-0.5 rounded">Resgate</span>' : ''}
                        ${isCompleted ? '<span class="bg-emerald-50 text-emerald-600 border border-emerald-100 text-xs font-medium px-2 py-0.5 rounded"><i class="bi bi-check2"></i> Finalizado</span>' : ''}
                    </div>
                    <p class="text-sm text-gray-600 truncate mb-1">${escapeHTML(event.serviceName)}</p>
                    <p class="text-sm text-gray-400 truncate flex items-center gap-1"><i class="bi bi-person text-gray-300"></i> ${escapeHTML(event.professionalName)}</p>
                </div>

                <div class="flex items-center gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity pl-4">
                    ${!isCompleted ? `
                        <a href="${whatsappLink}" target="_blank" class="w-9 h-9 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors shadow-sm" title="Confirmar WhatsApp" onclick="event.stopPropagation()">
                            <i class="bi bi-whatsapp"></i>
                        </a>
                        <button data-action="edit-appointment" data-appointment='${apptDataString}' class="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors shadow-sm" title="Editar">
                            <i class="bi bi-pencil"></i>
                        </button>
                    ` : ''}
                    <button data-action="delete-appointment" data-id="${event.id}" class="w-9 h-9 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors shadow-sm" title="Excluir">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>`;
    }).join('');
    
    // Layout em largura total com leve margem (w-full px-4) em vez de ficar centralizado e espremido.
    agendaView.innerHTML = `<div class="w-full px-4 pt-4 pb-24 space-y-3 bg-white min-h-[50vh]">${cardsHTML}</div>`;
}

function renderWeekView(allEvents) {
    const agendaView = document.getElementById('agenda-view');
    if (!agendaView) return;

    const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const weekStart = getWeekStart(localState.currentDate);
    const numDays = getActiveWeekDays();
    const isMobile = window.innerWidth < 768;
    const daysToShow = isMobile ? 3 : numDays; 
    
    const percentWidth = 100 / daysToShow;
    const colStyle = `flex: 0 0 ${percentWidth}%; width: ${percentWidth}%; max-width: ${percentWidth}%;`;

    let weekHTML = `
        <style>
            .agenda-scroll-container::-webkit-scrollbar { height: 6px; }
            .agenda-scroll-container::-webkit-scrollbar-track { background: #f9fafb; }
            .agenda-scroll-container::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
        </style>
        <div class="flex h-full min-h-[70vh] overflow-x-auto overflow-y-hidden snap-x snap-mandatory agenda-scroll-container divide-x divide-gray-100 bg-white w-full">
    `;

    for (let i = 0; i < numDays; i++) {
        const day = new Date(weekStart);
        day.setDate(day.getDate() + i);
        const today = new Date();
        const isCurrentDay = day.toDateString() === today.toDateString();

        const dayEvents = allEvents
            .filter(event => new Date(event.startTime).toDateString() === day.toDateString())
            .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
        
        let eventsHTML = '<div class="flex-grow overflow-y-auto px-2 py-3 space-y-2 pb-24 custom-scrollbar bg-white">'; 
        if (dayEvents.length > 0) {
            eventsHTML += dayEvents.map(event => {
                const startTime = new Date(event.startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                const profColor = state.professionalColors.get(event.professionalId) || { main: '#9ca3af' };
                const safeProfName = escapeHTML(event.professionalName || 'Indefinido');

                if (event.type === 'blockage') {
                    return `
                        <div class="relative p-2.5 rounded-lg bg-red-50/50 border border-red-100 overflow-hidden flex flex-col text-left">
                            <div class="absolute left-0 top-0 bottom-0 w-1 bg-red-400"></div>
                            <span class="font-semibold text-xs text-red-800 mb-0.5">${startTime}</span>
                            <p class="font-medium text-xs text-red-600 leading-tight truncate">${escapeHTML(event.reason)}</p>
                        </div>
                    `;
                }

                const apptDataString = JSON.stringify(event).replace(/'/g, "&apos;");
                const isCompleted = event.status === 'completed';

                return `
                    <div class="relative p-2.5 rounded-lg bg-white border border-gray-200 hover:border-gray-300 shadow-sm cursor-pointer transition-all flex flex-col group text-left ${isCompleted ? 'opacity-60 bg-gray-50' : ''}" 
                         data-action="open-comanda" data-appointment='${apptDataString}'>
                        <div class="absolute left-0 top-0 bottom-0 w-1" style="background-color: ${profColor.main};"></div>
                        <div class="flex justify-between items-start mb-1">
                            <span class="font-semibold text-xs text-gray-900">${startTime}</span>
                            ${isCompleted ? '<i class="bi bi-check2 text-emerald-500"></i>' : ''}
                        </div>
                        <p class="font-semibold text-sm text-gray-800 leading-tight truncate mb-1">${escapeHTML(event.clientName)}</p>
                        <p class="text-xs text-gray-500 truncate">${safeProfName.split(' ')[0]}</p>
                    </div>
                `;
            }).join('');
        } else {
            eventsHTML += `<div class="flex flex-col items-center justify-center pt-10 opacity-40"><span class="text-xs font-medium text-gray-400">Livre</span></div>`;
        }
        eventsHTML += '</div>';

        const headerClass = isCurrentDay ? 'bg-indigo-50 border-b-2 border-indigo-500' : 'bg-gray-50 border-b border-gray-200';
        const dayColor = isCurrentDay ? 'text-indigo-600' : 'text-gray-500';
        const numColor = isCurrentDay ? 'text-indigo-900' : 'text-gray-800';

        weekHTML += `
            <div class="flex flex-col snap-start shrink-0 relative" style="${colStyle}">
                <div class="sticky top-0 z-10 text-center py-3 ${headerClass}">
                    <p class="text-xs font-semibold ${dayColor} mb-0.5">${weekDays[day.getDay()]}</p>
                    <span class="text-xl font-bold ${numColor} leading-none">${day.getDate()}</span>
                </div>
                ${eventsHTML}
            </div>
        `;
    }

    weekHTML += '</div>';
    agendaView.innerHTML = weekHTML;
}

function renderAgenda() {
    const filteredEvents = state.allEvents.filter(event => {
        const profMatch = localState.selectedProfessionalId === 'all' || event.professionalId === localState.selectedProfessionalId;
        return profMatch;
    });

    if (localState.currentView === 'list') renderListView(filteredEvents);
    else renderWeekView(filteredEvents);
    
    updateBatchDeleteUI();
}

function updateBatchDeleteUI() {
    const container = document.getElementById('batch-delete-container');
    const fabButton = document.querySelector('[data-action="new-appointment"]');
    if (!container) return;

    if (localState.isSelectionMode && localState.selectedItems.size > 0) {
        container.innerHTML = `
            <div class="bg-gray-900 text-white p-3 rounded-xl shadow-xl flex items-center justify-between gap-4 animate-fade-in-up">
                <span class="font-semibold text-sm ml-2"><span class="text-indigo-400">${localState.selectedItems.size}</span> itens selecionados</span>
                <button data-action="batch-delete" class="bg-red-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-700 shadow-md text-sm flex items-center gap-2 transition-colors">
                    <i class="bi bi-trash"></i> Excluir
                </button>
            </div>
        `;
        container.style.display = 'block';
        if (fabButton) fabButton.style.display = 'none';
    } else {
        container.style.display = 'none';
        if (fabButton) fabButton.style.display = 'flex'; 
    }
}

// ============================================================================
// 📡 COMUNICAÇÃO DE DADOS
// ============================================================================

async function fetchAndDisplayAgenda() {
    const agendaView = document.getElementById('agenda-view');
    if (!agendaView) return;
    
    localState.selectedItems.clear();
    updateBatchDeleteUI();
    
    agendaView.innerHTML = '<div class="loader mx-auto my-16 border-gray-400"></div>';

    let start, end;
    const dateDisplay = document.getElementById('current-date-display');

    if (localState.currentView === 'list') {
        start = new Date(localState.currentDate);
        start.setHours(0, 0, 0, 0);
        end = new Date(localState.currentDate);
        end.setHours(23, 59, 59, 999);
        if(dateDisplay) dateDisplay.textContent = start.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).replace(' de ', ' de ');
    } else {
        const numDays = getActiveWeekDays(); 
        start = getWeekStart(new Date(localState.currentDate)); 
        end = new Date(start);
        end.setDate(start.getDate() + (numDays - 1)); 
        end.setHours(23, 59, 59, 999);
        if(dateDisplay) {
            const startStr = start.toLocaleDateString('pt-BR', {day: '2-digit', month: 'short'});
            const endStr = end.toLocaleDateString('pt-BR', {day: '2-digit', month: 'short', year: 'numeric'});
            dateDisplay.textContent = `${startStr} — ${endStr}`;
        }
    }

    try {
        const [appointmentsData, blockagesData] = await Promise.all([
            appointmentsApi.getAppointmentsByDateRange(state.establishmentId, start.toISOString(), end.toISOString(), localState.selectedProfessionalId === 'all' ? null : localState.selectedProfessionalId),
            blockagesApi.getBlockagesByDateRange(state.establishmentId, start.toISOString(), end.toISOString(), localState.selectedProfessionalId)
        ]);
        
        if (!document.getElementById('agenda-view')) return;

        const enrichedAppointments = appointmentsData.map(a => {
            let profName = a.professionalName;
            if (!profName && a.professionalId) {
                const prof = state.professionals ? state.professionals.find(p => p.id === a.professionalId) : null;
                if (prof) profName = prof.name;
            }
            return { ...a, type: 'appointment', professionalName: profName || 'Indefinido' };
        });

        const enrichedBlockages = blockagesData.map(b => {
            let profName = b.professionalName;
            if (!profName && b.professionalId) {
                const prof = state.professionals ? state.professionals.find(p => p.id === b.professionalId) : null;
                if (prof) profName = prof.name;
            }
            return { ...b, type: 'blockage', professionalName: profName || 'Indefinido' };
        });
        
        state.allEvents = [...enrichedAppointments, ...enrichedBlockages]; 
        
        renderProfessionalSelector();
        renderAgenda(); 

    } catch (error) {
        if (document.getElementById('agenda-view')) {
            document.getElementById('agenda-view').innerHTML = `<div class="p-6 text-center text-red-500 font-medium">Falha ao carregar dados da agenda.</div>`;
        }
    }
}

async function populateFilters() {
    try {
        const [profs, services, establishmentDetails] = await Promise.all([
            professionalsApi.getProfessionals(state.establishmentId),
            servicesApi.getServices(state.establishmentId),
            establishmentApi.getEstablishmentDetails(state.establishmentId)
        ]);

        state.professionals = profs || [];
        state.services = services || [];
        allClientsData = []; 

        if (establishmentDetails) { 
            loyaltySettingsForModal = establishmentDetails.loyaltyProgram || { enabled: false };
        }

        state.professionals.forEach((prof, index) => {
            state.professionalColors.set(prof.id, colorPalette[index % colorPalette.length]);
        });
        
        renderProfessionalSelector();
    } catch (error) {
        showNotification('Atenção', 'Não foi possível pré-carregar os dados da equipa.', 'error');
    }
}

// ============================================================================
// 🏗️ INICIALIZAÇÃO DA PÁGINA (ESTRUTURA HTML)
// ============================================================================

export async function loadAgendaPage(params = {}) { 
    if (currentTimeInterval) clearInterval(currentTimeInterval);
    
    localState.currentDate = params.targetDate ? new Date(params.targetDate) : (localState.currentDate || new Date());
    localState.scrollToAppointmentId = params.scrollToAppointmentId || null; 
    localState.isSelectionMode = false;
    localState.selectedItems.clear();

    // Novo Layout Base (Sóbrio, fontes normais, fundos brancos)
    contentDiv.innerHTML = `
        <div class="flex flex-col h-[calc(100vh-80px)] md:h-auto bg-gray-50 relative font-sans w-full overflow-x-hidden">
            
            <div class="bg-white border-b border-gray-200 z-30 w-full shadow-sm sticky top-0">
                <div class="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between gap-4 md:items-center">
                    
                    <div class="flex items-center justify-between md:justify-start gap-4">
                        <div class="flex items-center bg-white rounded-lg border border-gray-300 p-1 shadow-sm">
                            <button id="btn-prev-date" class="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-all"><i class="bi bi-chevron-left"></i></button>
                            <button id="btn-today" class="px-4 py-1.5 text-sm font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-all">Hoje</button>
                            <button id="btn-next-date" class="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-all"><i class="bi bi-chevron-right"></i></button>
                        </div>
                        <div class="relative flex-1 text-right md:text-left">
                            <h2 id="current-date-display" class="font-semibold text-lg text-gray-800 cursor-pointer hover:text-indigo-600 transition-colors">Carregando...</h2>
                            <input type="date" id="dateFilterInput" class="absolute inset-0 opacity-0 cursor-pointer w-full">
                        </div>
                    </div>

                    <div class="flex items-center gap-3">
                        <div class="flex bg-gray-100 p-1 rounded-lg border border-gray-200 w-full md:w-auto shadow-inner">
                            <button data-view="list" class="view-btn flex-1 md:flex-none px-5 py-2 text-sm font-semibold rounded-md transition-all ${localState.currentView === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}">Lista</button>
                            <button data-view="week" class="view-btn flex-1 md:flex-none px-5 py-2 text-sm font-semibold rounded-md transition-all ${localState.currentView === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}">Semana</button>
                        </div>
                        
                        <div class="relative">
                            <button id="btn-agenda-options" class="w-10 h-10 flex items-center justify-center text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg shadow-sm transition-all"><i class="bi bi-three-dots-vertical"></i></button>
                            
                            <div id="agenda-options-menu" class="hidden absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 z-50 py-2 animate-fade-in-down origin-top-right">
                                <button id="btn-toggle-select" class="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors flex items-center gap-3">
                                    <i class="bi bi-check2-square text-lg"></i> Modo Seleção
                                </button>
                                
                                <div class="px-4 py-2.5 border-t border-gray-100 mt-1">
                                    <label class="flex items-center gap-3 text-sm font-medium text-gray-700 cursor-pointer">
                                        <input type="checkbox" id="showInactiveProfsToggle" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"> 
                                        Exibir Equipa Inativa
                                    </label>
                                </div>

                                <div id="week-days-menu" class="px-4 py-3 border-t border-gray-100 ${localState.currentView === 'week' ? 'block' : 'hidden'}">
                                    <span class="text-xs font-semibold text-gray-500 mb-2 block">Dias (Visão Semanal)</span>
                                    <div class="flex gap-2">
                                        <button data-days="3" class="week-days-btn flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${localState.weekViewDays === 3 ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}">3</button>
                                        <button data-days="5" class="week-days-btn hidden md:block flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${localState.weekViewDays === 5 ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}">5</button>
                                        <button data-days="7" class="week-days-btn hidden md:block flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${localState.weekViewDays === 7 ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}">7</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white border-b border-gray-200">
                    <div id="profSelectorContainer" class="max-w-7xl mx-auto px-4 py-3 flex overflow-x-auto hide-scrollbar gap-4 items-start">
                        <div class="loader-small mx-auto my-2 border-gray-400"></div>
                    </div>
                </div>
            </div> 
            
            <div id="agenda-view" class="flex-1 w-full bg-white"></div>
            
            <button data-action="new-appointment" class="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 hover:-translate-y-1 transition-all z-40">
                <i class="bi bi-plus text-3xl"></i>
            </button>

            <div id="batch-delete-container" class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 hidden w-[90%] max-w-md"></div>
        </div>`;

    // --- EVENT LISTENERS DA TOOLBAR ---

    document.getElementById('btn-prev-date').addEventListener('click', () => {
        if (localState.currentView === 'list') {
            localState.currentDate.setDate(localState.currentDate.getDate() - 1);
        } else {
            localState.currentDate.setDate(localState.currentDate.getDate() - localState.weekViewDays);
        }
        fetchAndDisplayAgenda();
    });

    document.getElementById('btn-next-date').addEventListener('click', () => {
        if (localState.currentView === 'list') {
            localState.currentDate.setDate(localState.currentDate.getDate() + 1);
        } else {
            localState.currentDate.setDate(localState.currentDate.getDate() + localState.weekViewDays);
        }
        fetchAndDisplayAgenda();
    });

    document.getElementById('btn-today').addEventListener('click', () => {
        localState.currentDate = new Date();
        fetchAndDisplayAgenda();
    });
    
    document.getElementById('dateFilterInput').addEventListener('change', (e) => {
        if (e.target.value) {
            const [year, month, day] = e.target.value.split('-');
            localState.currentDate = new Date(year, month - 1, day);
            fetchAndDisplayAgenda();
        }
    });

    // --- EVENT LISTENERS DE VIEW ---
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const view = e.target.dataset.view;
            if (localState.currentView === view) return;
            
            document.querySelectorAll('.view-btn').forEach(b => {
                b.classList.remove('bg-white', 'text-gray-900', 'shadow-sm');
                b.classList.add('text-gray-500');
            });
            e.target.classList.add('bg-white', 'text-gray-900', 'shadow-sm');
            e.target.classList.remove('text-gray-500');
            
            localState.currentView = view;
            
            const weekMenu = document.getElementById('week-days-menu');
            if (view === 'week') weekMenu.classList.remove('hidden');
            else weekMenu.classList.add('hidden');

            fetchAndDisplayAgenda();
        });
    });

    // --- EVENT LISTENERS DO MENU KEBAB ---
    const btnOptions = document.getElementById('btn-agenda-options');
    const menuOptions = document.getElementById('agenda-options-menu');
    
    btnOptions.addEventListener('click', (e) => {
        e.stopPropagation();
        menuOptions.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!menuOptions.contains(e.target) && e.target !== btnOptions) {
            menuOptions.classList.add('hidden');
        }
    });

    document.getElementById('btn-toggle-select').addEventListener('click', () => {
        localState.isSelectionMode = !localState.isSelectionMode;
        if (!localState.isSelectionMode) localState.selectedItems.clear();
        menuOptions.classList.add('hidden');
        renderAgenda(); 
    });

    document.getElementById('showInactiveProfsToggle').addEventListener('change', (e) => {
        localState.showInactiveProfs = e.target.checked;
        renderProfessionalSelector(); 
    });

    document.querySelectorAll('.week-days-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const days = parseInt(e.target.dataset.days, 10);
            document.querySelectorAll('.week-days-btn').forEach(b => {
                b.classList.remove('bg-gray-800', 'text-white');
                b.classList.add('bg-gray-100', 'text-gray-600');
            });
            e.target.classList.add('bg-gray-800', 'text-white');
            e.target.classList.remove('bg-gray-100', 'text-gray-600');
            
            localState.weekViewDays = days;
            menuOptions.classList.add('hidden');
            fetchAndDisplayAgenda();
        });
    });

    // --- DELEGAÇÃO DE EVENTOS GERAIS DA TELA ---
    if (!hasContentDelegationInitialized) {
        contentDiv.addEventListener('click', async (e) => {
            const targetElement = e.target.closest('[data-action]');
            
            if (e.target.dataset.action === 'toggle-select-item') {
                const id = e.target.dataset.id;
                if (e.target.checked) localState.selectedItems.add(id);
                else localState.selectedItems.delete(id);
                updateBatchDeleteUI();
                return;
            }

            if (targetElement && targetElement.dataset.action === 'batch-delete') {
                const count = localState.selectedItems.size;
                const confirmed = await showConfirmation('Excluir em Lote', `Tem certeza que deseja excluir ${count} agendamento(s)? Esta ação não pode ser desfeita.`);
                if (confirmed) {
                    const ids = Array.from(localState.selectedItems);
                    let successCount = 0;
                    try {
                        await Promise.all(ids.map(async (id) => {
                            try { await appointmentsApi.deleteAppointment(id); successCount++; } catch (err) { }
                        }));
                        showNotification(`${successCount} agendamento(s) excluído(s).`, 'success');
                        localState.selectedItems.clear();
                        localState.isSelectionMode = false;
                        fetchAndDisplayAgenda();
                    } catch (error) {
                        showNotification('Erro ao processar exclusão.', 'error');
                    }
                }
                return;
            }
            
            if (e.target.closest('[data-action="select-professional"]')) {
                const selectedProfCard = e.target.closest('[data-action="select-professional"]');
                const profId = selectedProfCard.dataset.profId;
                const isDeselecting = localState.selectedProfessionalId === profId && profId !== 'all';
                localState.selectedProfessionalId = isDeselecting ? 'all' : profId;
                await fetchAndDisplayAgenda(); 
                return;
            }

            if (!targetElement) return;

            const action = targetElement.dataset.action;
            let apptData = null;
            const card = e.target.closest('[data-appointment]');
            if (card) apptData = JSON.parse(card.dataset.appointment.replace(/&apos;/g, "'"));
            
            switch (action) {
                case 'new-appointment':
                    openAppointmentModal();
                    break;
                case 'edit-appointment':
                    if (localState.isSelectionMode || !apptData) return;
                    if (apptData.status === 'completed') {
                        showNotification('Atenção', 'Agendamentos finalizados não podem ser editados.', 'warning');
                        return;
                    }
                    openAppointmentModal(apptData);
                    break;
                case 'delete-appointment': {
                    if (localState.isSelectionMode) return;
                    e.stopPropagation();
                    const id = targetElement.dataset.id;
                    const confirmed = await showConfirmation('Confirmar Exclusão', 'Apagar este agendamento do sistema?');
                    if (confirmed) {
                        try {
                            await appointmentsApi.deleteAppointment(id);
                            showNotification('Agendamento apagado.', 'success');
                            fetchAndDisplayAgenda();
                        } catch (error) {
                            showNotification(`Não foi possível apagar: ${error.message}`, 'error');
                        }
                    }
                    break;
                }
                case 'open-comanda':
                    if (localState.isSelectionMode) return; 
                    if (apptData) {
                        const initialFilter = apptData.status === 'completed' ? 'finalizadas' : 'em-atendimento';
                        const params = { selectedAppointmentId: apptData.id, initialFilter: initialFilter };
                        if (initialFilter === 'finalizadas') {
                            let dateToUse = apptData.startTime;
                            if (apptData.transaction && apptData.transaction.paidAt) {
                                dateToUse = typeof apptData.transaction.paidAt === 'object' ? new Date(apptData.transaction.paidAt._seconds * 1000) : apptData.transaction.paidAt;
                            }
                            params.filterDate = dateToUse;
                        }
                        navigateTo('comandas-section', params);
                    }
                    break;
            }
        });
        hasContentDelegationInitialized = true; 
    }

    await populateFilters();
    await fetchAndDisplayAgenda();
}

// ============================================================================
// LÓGICA MANTIDA DOS MODAIS DE CADASTRO / EDIÇÃO
// ============================================================================

function navigateModalStep(step) {
    if (step < 1 || step > 4) return;
    newAppointmentState.step = step;
    openAppointmentModal(null, true); 
}

function handleServiceCardClick(serviceId, element) {
    const multiToggle = document.getElementById('multiServiceToggle');
    const isMultiSelect = multiToggle && multiToggle.checked;
    const isSelected = element.classList.contains('selected');
    const index = newAppointmentState.data.selectedServiceIds.indexOf(serviceId);

    if (isSelected) {
        element.classList.remove('selected', 'border-indigo-500');
        if (index > -1) newAppointmentState.data.selectedServiceIds.splice(index, 1);
    } else {
        if (!isMultiSelect) {
            newAppointmentState.data.selectedServiceIds = []; 
            const container = document.getElementById('apptServicesContainer');
            if (container) {
                container.querySelectorAll('.service-card.selected').forEach(card => card.classList.remove('selected', 'border-indigo-500'));
            }
        }
        element.classList.add('selected', 'border-indigo-500');
        newAppointmentState.data.selectedServiceIds.push(serviceId);
    }
}

function handleProfessionalCardClick(professionalId, element) {
    const professionalContainer = document.querySelector('.professional-step-cards');
    if (!professionalContainer) return;
    professionalContainer.querySelectorAll('.professional-modal-card').forEach(card => card.classList.remove('selected', 'border-indigo-500'));
    element.classList.add('selected', 'border-indigo-500');
    const professional = availableProfessionalsForModal.find(p => p.id === professionalId);
    newAppointmentState.data.professionalId = professionalId;
    newAppointmentState.data.professionalName = professional ? professional.name : 'Indefinido';
}

function handleTimeSlotClick(slot, element) {
    const timeContainer = document.getElementById('availableTimesContainer');
    if (!timeContainer) return;
    timeContainer.querySelectorAll('.time-slot-card').forEach(c => c.classList.remove('selected'));
    element.classList.add('selected');
    newAppointmentState.data.time = slot;
}

async function updateTimesAndDuration() {
    const totalDurationSpan = document.getElementById('apptTotalDuration');
    const timeContainer = document.getElementById('availableTimesContainer');
    if (!totalDurationSpan || !timeContainer) return;

    const professionalId = newAppointmentState.data.professionalId;
    const selectedServiceIds = newAppointmentState.data.selectedServiceIds;
    const date = document.getElementById('apptDate').value;
    newAppointmentState.data.date = date; 

    const totalDuration = selectedServiceIds.reduce((acc, id) => {
        const service = availableServicesForModal.find(s => s.id === id);
        return acc + (service ? (service.duration + (service.bufferTime || 0)) : 0);
    }, 0);
    totalDurationSpan.textContent = `${totalDuration} min`;

    if (totalDuration === 0 || !professionalId || !date) {
        timeContainer.innerHTML = '<p class="col-span-full text-center text-sm text-gray-500">Selecione o serviço e o profissional primeiro.</p>';
        return;
    }

    timeContainer.innerHTML = '<div class="loader-small mx-auto col-span-full border-gray-400"></div>';
    
    try {
        let slots = await appointmentsApi.getAvailability({ establishmentId: state.establishmentId, professionalId: professionalId, serviceIds: selectedServiceIds, date: date });
        const now = new Date();
        const selectedDateObj = new Date(date + 'T00:00:00');
        if (selectedDateObj.toDateString() === now.toDateString()) {
            const currentMinutes = now.getHours() * 60 + now.getMinutes();
            slots = slots.filter(slot => {
                const [slotHours, slotMinutes] = slot.split(':').map(Number);
                return (slotHours * 60 + slotMinutes) >= currentMinutes;
            });
        }

        timeContainer.innerHTML = '';
        if (slots.length > 0) {
            slots.forEach(slot => {
                const card = document.createElement('button');
                card.type = 'button';
                card.className = `time-slot-card p-2 text-sm bg-gray-100 font-semibold text-gray-700 rounded-lg hover:bg-indigo-50 transition-colors ${newAppointmentState.data.time === slot ? 'selected bg-indigo-600 text-white' : ''}`;
                card.textContent = slot;
                card.addEventListener('click', () => {
                    timeContainer.querySelectorAll('.time-slot-card').forEach(c => {
                        c.classList.remove('selected', 'bg-indigo-600', 'text-white');
                        c.classList.add('bg-gray-100', 'text-gray-700');
                    });
                    card.classList.remove('bg-gray-100', 'text-gray-700');
                    card.classList.add('selected', 'bg-indigo-600', 'text-white');
                    newAppointmentState.data.time = slot;
                });
                timeContainer.appendChild(card);
            });
        } else {
            timeContainer.innerHTML = `<p class="col-span-full text-center text-sm text-gray-500">Nenhum horário livre encontrado.</p>`;
        }
    } catch (e) {
        timeContainer.innerHTML = '<p class="col-span-full text-center text-sm text-red-500">Erro ao buscar horários.</p>';
    }
}

function renderLoyaltyRewards() {
    const container = document.getElementById('loyaltyRewardsContainer');
    if (!container) return;

    const { clientHasRewards, clientLoyaltyPoints, redeemedReward } = newAppointmentState.data;
    const { enabled, rewards } = loyaltySettingsForModal;
    
    if (!enabled || !clientHasRewards || !rewards || rewards.length === 0) {
        container.classList.add('hidden');
        container.innerHTML = '';
        return;
    }

    container.classList.remove('hidden');
    const availableRewards = rewards.filter(r => clientLoyaltyPoints >= r.points);

    let rewardsHTML = `<h4 class="text-sm font-semibold text-gray-700 mb-3"><i class="bi bi-gift mr-1"></i> Resgate de Fidelidade (${clientLoyaltyPoints} pts)</h4>`;

    if (availableRewards.length > 0) {
        rewardsHTML += '<div class="space-y-2">';
        rewardsHTML += availableRewards.map(reward => {
            const isChecked = redeemedReward?.reward === reward.reward;
            return `
                <label class="flex items-center p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                    <input type="radio" name="loyaltyReward" class="form-radio text-indigo-600 focus:ring-indigo-500" value="${escapeHTML(reward.reward)}" data-points="${reward.points}" ${isChecked ? 'checked' : ''}>
                    <span class="ml-3"><span class="font-semibold text-gray-800 text-sm">${escapeHTML(reward.reward)}</span><span class="text-xs text-gray-500 ml-2"> (-${reward.points} pts)</span></span>
                </label>
            `;
        }).join('');
        rewardsHTML += '</div>';
    } else {
        rewardsHTML += `<p class="text-xs text-gray-500">Pontos insuficientes para as recompensas atuais.</p>`;
    }

    container.innerHTML = rewardsHTML;
    container.querySelectorAll('input[name="loyaltyReward"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.checked) newAppointmentState.data.redeemedReward = { reward: e.target.value, points: parseInt(e.target.dataset.points, 10) };
        });
    });
    
    container.insertAdjacentHTML('beforeend', `
        <label class="flex items-center p-3 mt-2 bg-white rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
            <input type="radio" name="loyaltyReward" class="form-radio text-gray-400" value="none" ${!redeemedReward ? 'checked' : ''}>
            <span class="ml-3 text-sm text-gray-500 font-medium">Não utilizar pontos agora</span>
        </label>
    `);
    container.querySelector('input[value="none"]').addEventListener('change', (e) => {
        if (e.target.checked) newAppointmentState.data.redeemedReward = null;
    });
}

async function handleAppointmentFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');

    if (!newAppointmentState.data.time || newAppointmentState.data.selectedServiceIds.length === 0 || !newAppointmentState.data.professionalId) {
        return showNotification('Atenção', 'Por favor, selecione horário, serviço e profissional.', 'warning');
    }

    submitButton.disabled = true;
    submitButton.innerHTML = '<div class="loader-small border-white"></div>';

    const servicesData = newAppointmentState.data.selectedServiceIds.map(id => {
        const s = availableServicesForModal.find(s => s.id === id);
        return { id: s.id, name: s.name, price: s.price, duration: s.duration, bufferTime: s.bufferTime || 0, photo: s.photo || null };
    });

    const [hours, minutes] = newAppointmentState.data.time.split(':');
    const startTimeAsDate = new Date(`${newAppointmentState.data.date}T${hours}:${minutes}:00`);

    const appointmentData = {
        establishmentId: state.establishmentId,
        clientName: newAppointmentState.data.clientName,
        clientPhone: newAppointmentState.data.clientPhone,
        services: servicesData,
        professionalId: newAppointmentState.data.professionalId,
        professionalName: newAppointmentState.data.professionalName,
        startTime: startTimeAsDate.toISOString(),
        redeemedReward: newAppointmentState.data.redeemedReward
    };
    
    const appointmentId = form.querySelector('#appointmentId').value;
    if (appointmentId) appointmentData.id = appointmentId;

    try {
        if (appointmentId) await appointmentsApi.updateAppointment(appointmentId, appointmentData);
        else await appointmentsApi.createAppointment(appointmentData);
        
        showNotification('Sucesso', `Agendamento registado com sucesso!`, 'success');
        document.getElementById('appointmentModal').style.display = 'none';
        fetchAndDisplayAgenda();
    } catch (error) {
        showNotification('Erro', error.message, 'error');
        submitButton.disabled = false;
        submitButton.innerHTML = 'Confirmar Agendamento';
    }
}

function renderClientCard(client) {
    const isSelected = newAppointmentState.data.clientName === client.name && newAppointmentState.data.clientPhone === client.phone;
    return `
        <div class="client-search-card p-3 bg-white rounded-lg border border-gray-200 cursor-pointer transition-colors hover:bg-gray-50 ${isSelected ? 'selected border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/30' : ''}" 
             data-action="select-client" data-client-name="${escapeHTML(client.name)}" data-client-phone="${escapeHTML(client.phone)}" data-loyalty-points="${client.loyaltyPoints || 0}">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 font-bold text-sm">${escapeHTML(client.name).charAt(0).toUpperCase()}</div>
                <div><p class="font-semibold text-sm text-gray-800 leading-tight">${escapeHTML(client.name)}</p><p class="text-xs text-gray-500 mt-0.5">${escapeHTML(client.phone)}</p></div>
            </div>
        </div>
    `;
}

async function handleClientSearch(searchTerm) {
    const resultsContainer = document.getElementById('clientSearchResults');
    if (!resultsContainer || searchTerm.trim().length < 3) {
        if (resultsContainer) resultsContainer.innerHTML = '<p class="text-xs font-medium text-gray-400">Digite pelo menos 3 letras do nome...</p>';
        return;
    }
    
    resultsContainer.innerHTML = '<div class="loader-small mx-auto my-4 border-gray-400"></div>';
    try {
        const foundClients = await clientsApi.getClients(state.establishmentId, searchTerm.trim());
        allClientsData = foundClients;
        if (foundClients.length === 0) {
            resultsContainer.innerHTML = '<p class="text-sm text-gray-500">Nenhum cliente na base de dados.</p>';
            return;
        }
        resultsContainer.innerHTML = foundClients.map(renderClientCard).join('');
        resultsContainer.querySelectorAll('[data-action="select-client"]').forEach(card => {
            card.addEventListener('click', () => {
                newAppointmentState.data.clientName = card.dataset.clientName;
                newAppointmentState.data.clientPhone = card.dataset.clientPhone;
                newAppointmentState.data.clientLoyaltyPoints = parseInt(card.dataset.loyaltyPoints || '0', 10);
                const minPoints = Math.min(...(loyaltySettingsForModal?.rewards || []).map(r => r.points));
                newAppointmentState.data.clientHasRewards = (loyaltySettingsForModal.enabled && minPoints !== Infinity && newAppointmentState.data.clientLoyaltyPoints >= minPoints);
                
                document.getElementById('apptClientName').value = card.dataset.clientName;
                document.getElementById('apptClientPhone').value = card.dataset.clientPhone;
                document.querySelectorAll('.client-search-card').forEach(c => c.classList.remove('selected', 'border-indigo-500', 'ring-1', 'ring-indigo-500', 'bg-indigo-50/30'));
                card.classList.add('selected', 'border-indigo-500', 'ring-1', 'ring-indigo-500', 'bg-indigo-50/30');
            });
        });
    } catch (error) {
        resultsContainer.innerHTML = '<p class="text-sm text-red-500">Erro na procura.</p>';
    }
}

function renderStep1_Client(appointment, isNavigating) {
    return { title: appointment ? 'Editar Reserva' : 'Identificar Cliente', content: `
        <div class="p-6 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Nome do Cliente *</label>
                    <input type="text" id="apptClientName" required class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium text-gray-800" value="${escapeHTML(newAppointmentState.data.clientName)}">
                </div>
                <div>
                    <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Telefone / WhatsApp *</label>
                    <input type="tel" id="apptClientPhone" required class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium text-gray-800" value="${escapeHTML(newAppointmentState.data.clientPhone)}">
                </div>
            </div>
            
            <div class="border-t border-gray-100 pt-6">
                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Já é cliente? Busque pelo nome:</label>
                <div class="relative w-full">
                    <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input type="text" id="clientSearchInput" placeholder="Procurar na base de dados..." class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm">
                </div>
                <div id="clientSearchResults" class="mt-3 space-y-2 max-h-40 overflow-y-auto p-1 custom-scrollbar"></div>
            </div>
        </div>
        <footer class="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
            <button type="button" data-action="close-modal" data-target="appointmentModal" class="py-2.5 px-6 bg-white border border-gray-300 text-gray-700 font-bold text-sm rounded-lg hover:bg-gray-50">Cancelar</button>
            <button type="button" data-action="next-step" data-current-step="1" class="py-2.5 px-6 bg-gray-900 text-white font-bold text-sm rounded-lg hover:bg-gray-800">Avançar</button>
        </footer>
    `};
}

function renderStep2_Service() {
    return { title: 'Quais serviços deseja?', content: `
        <div class="p-6 space-y-6">
             <div class="flex flex-col sm:flex-row items-center gap-4">
                 <div class="relative w-full sm:flex-grow">
                     <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                     <input type="search" id="serviceSearchModalInput" placeholder="Filtrar menu..." class="w-full p-3 pl-10 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
                 </div>
                 <label class="flex items-center space-x-2 cursor-pointer flex-shrink-0 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                     <input type="checkbox" id="multiServiceToggle" class="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" ${newAppointmentState.data.selectedServiceIds.length > 1 ? 'checked' : ''}>
                     <span class="text-xs font-bold text-gray-600 uppercase tracking-widest">Múltiplos</span>
                 </label>
            </div>
            
            <div id="apptServicesContainer" class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto p-1 custom-scrollbar">
                 ${availableServicesForModal.map(service => {
                     const isChecked = newAppointmentState.data.selectedServiceIds.includes(service.id);
                     return `
                         <div class="service-card p-3 bg-white rounded-xl border border-gray-200 cursor-pointer transition-colors hover:bg-gray-50 ${isChecked ? 'selected border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/30' : ''}" data-service-id="${service.id}">
                             <div class="flex items-center gap-3">
                                 <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-400 border border-gray-200"><i class="bi bi-scissors"></i></div>
                                 <div class="flex-1 min-w-0">
                                     <p class="font-bold text-sm text-gray-800 leading-tight truncate">${escapeHTML(service.name)}</p>
                                     <p class="text-xs font-medium text-gray-500 mt-0.5">R$ ${service.price.toFixed(2)} • ${service.duration}m</p>
                                 </div>
                             </div>
                         </div>`;
                 }).join('')}
            </div>
        </div>
        <footer class="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between gap-3">
            <button type="button" data-action="prev-step" data-current-step="2" class="py-2.5 px-6 bg-white border border-gray-300 text-gray-700 font-bold text-sm rounded-lg hover:bg-gray-50">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="2" class="py-2.5 px-6 bg-gray-900 text-white font-bold text-sm rounded-lg hover:bg-gray-800">Avançar</button>
        </footer>
    `};
}

function renderStep3_Professional() {
    return { title: 'Quem fará o atendimento?', content: `
        <div class="p-6 space-y-6">
             <div class="relative w-full">
                 <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                 <input type="search" id="professionalSearchModalInput" placeholder="Procurar na equipa..." class="w-full p-3 pl-10 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
             </div>
             
             <div id="apptProfessionalContainer" class="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-60 overflow-y-auto p-1 custom-scrollbar professional-step-cards">
                 ${availableProfessionalsForModal.map(prof => {
                     const isChecked = newAppointmentState.data.professionalId === prof.id;
                     const bgStyle = prof.photo ? `background-image: url('${prof.photo}'); background-size: cover; background-position: center;` : '';
                     
                     return `
                         <div class="professional-modal-card p-3 bg-white rounded-xl border border-gray-200 text-center cursor-pointer transition-colors hover:bg-gray-50 flex flex-col items-center gap-2 ${isChecked ? 'selected border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/30' : ''}" data-professional-id="${prof.id}">
                             <div class="w-12 h-12 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-gray-500 shadow-sm" style="${bgStyle}">
                                 ${!prof.photo ? escapeHTML(prof.name).charAt(0).toUpperCase() : ''}
                             </div>
                             <div class="w-full">
                                <p class="text-sm font-bold text-gray-800 truncate leading-tight">${escapeHTML(prof.name).split(' ')[0]}</p>
                                <p class="text-[10px] text-gray-500 uppercase tracking-widest truncate mt-0.5">${escapeHTML(prof.specialty || 'Staff')}</p>
                             </div>
                         </div>`;
                 }).join('')}
             </div>
        </div>
        <footer class="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between gap-3">
            <button type="button" data-action="prev-step" data-current-step="3" class="py-2.5 px-6 bg-white border border-gray-300 text-gray-700 font-bold text-sm rounded-lg hover:bg-gray-50">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="3" class="py-2.5 px-6 bg-gray-900 text-white font-bold text-sm rounded-lg hover:bg-gray-800">Avançar</button>
        </footer>
    `};
}

function renderStep4_Schedule(appointment) {
    const title = appointment ? 'Revisão e Data' : 'Agendar Data e Horário';
    const initialDate = newAppointmentState.data.date || new Date().toISOString().split('T')[0];
    
    return { title: title, content: `
        <div class="p-6 space-y-6">
            
            <div class="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold flex-shrink-0"><i class="bi bi-person"></i></div>
                <div class="flex-1 min-w-0">
                    <p class="font-bold text-gray-900 truncate leading-tight">${escapeHTML(newAppointmentState.data.clientName)}</p>
                    <p class="text-xs text-gray-500 font-medium truncate mt-0.5">Com: ${escapeHTML(newAppointmentState.data.professionalName)}</p>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Escolha o Dia</label>
                    <input type="date" id="apptDate" required class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold text-gray-700 transition-all shadow-inner" value="${initialDate}">
                </div>
                <div>
                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Tempo Necessário</label>
                    <div class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 flex items-center gap-2 shadow-inner">
                        <i class="bi bi-clock-history text-gray-400"></i> <span id="apptTotalDuration">Calculando...</span>
                    </div>
                </div>
            </div>

            <div class="border-t border-gray-100 pt-5">
                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Horários Livres Encontrados</label>
                <div id="availableTimesContainer" class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar"></div>
            </div>

            <div id="loyaltyRewardsContainer" class="hidden bg-gray-50 p-4 rounded-xl border border-gray-200"></div>
        </div>
        <footer class="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between gap-3">
            <button type="button" data-action="prev-step" data-current-step="4" class="py-2.5 px-6 bg-white border border-gray-300 text-gray-700 font-bold text-sm rounded-lg hover:bg-gray-50">Voltar</button>
            <button type="submit" class="py-2.5 px-8 bg-indigo-600 text-white font-bold text-sm rounded-lg hover:bg-indigo-700 shadow-md active:scale-95 transition-transform flex items-center gap-2">
                <i class="bi bi-calendar-check"></i> ${appointment ? 'Salvar' : 'Agendar'}
            </button>
        </footer>
    `};
}

async function openAppointmentModal(appointment = null, isNavigating = false) {
    const modal = document.getElementById('appointmentModal');
    if (!isNavigating) {
        newAppointmentState = {
            step: 1,
            data: {
                id: appointment?.id || null, clientName: appointment?.clientName || '', clientPhone: appointment?.clientPhone || '',
                selectedServiceIds: appointment?.services?.map(s => s.id) || [], professionalId: appointment?.professionalId || null,
                professionalName: appointment?.professionalName || '', date: appointment?.startTime ? new Date(appointment.startTime).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                time: appointment?.startTime ? new Date(appointment.startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false }) : null,
                redeemedReward: appointment?.redeemedReward || null, clientHasRewards: appointment?.hasRewards || false, clientLoyaltyPoints: 0 
            }
        };
    }
    availableServicesForModal = state.services;
    availableProfessionalsForModal = state.professionals.filter(p => p.status === 'active');
    
    let renderResult = { title: 'Erro', content: '' };
    switch (newAppointmentState.step) {
        case 1: renderResult = renderStep1_Client(appointment, isNavigating); break;
        case 2: renderResult = renderStep2_Service(); break;
        case 3: renderResult = renderStep3_Professional(); break;
        case 4: renderResult = renderStep4_Schedule(appointment); break;
    }
    
    modal.innerHTML = `
        <div class="modal-content max-w-3xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden m-4 flex flex-col max-h-[90vh]">
            <header class="p-6 border-b border-gray-100 flex justify-between items-center bg-white z-10 shadow-sm relative">
                <div class="flex items-center gap-3">
                    <span class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs shadow-inner border border-indigo-200">
                        ${newAppointmentState.step}/4
                    </span>
                    <h2 class="text-xl font-black text-gray-900 tracking-tight">${renderResult.title}</h2>
                </div>
                <button type="button" data-action="close-modal" data-target="appointmentModal" class="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                    <i class="bi bi-x-lg text-lg"></i>
                </button>
            </header>
            <form id="appointmentForm" class="flex flex-col h-full bg-white relative">
                <input type="hidden" id="appointmentId" value="${newAppointmentState.data.id || ''}">
                <div class="flex-1 overflow-y-auto custom-scrollbar">${renderResult.content}</div>
            </form>
        </div>`;

    modal.querySelectorAll('[data-action="next-step"]').forEach(btn => btn.addEventListener('click', () => {
        const cs = parseInt(btn.dataset.currentStep, 10);
        if (cs === 1) { newAppointmentState.data.clientName = modal.querySelector('#apptClientName').value.trim(); newAppointmentState.data.clientPhone = modal.querySelector('#apptClientPhone').value.trim(); if (!newAppointmentState.data.clientName) return showNotification('Atenção', 'O nome do cliente é obrigatório.', 'warning'); }
        if (cs === 2 && newAppointmentState.data.selectedServiceIds.length === 0) return showNotification('Atenção', 'Selecione pelo menos um serviço do menu.', 'warning');
        if (cs === 3 && !newAppointmentState.data.professionalId) return showNotification('Atenção', 'Escolha o membro da equipa para este atendimento.', 'warning');
        navigateModalStep(cs + 1);
    }));
    modal.querySelectorAll('[data-action="prev-step"]').forEach(btn => btn.addEventListener('click', () => navigateModalStep(parseInt(btn.dataset.currentStep, 10) - 1)));

    if (newAppointmentState.step === 4) modal.querySelector('#appointmentForm').addEventListener('submit', handleAppointmentFormSubmit);
    modal.style.display = 'flex';
    
    if (newAppointmentState.step === 2) modal.querySelectorAll('.service-card').forEach(card => card.addEventListener('click', () => handleServiceCardClick(card.dataset.serviceId, card)));
    if (newAppointmentState.step === 3) modal.querySelectorAll('.professional-modal-card').forEach(card => card.addEventListener('click', () => handleProfessionalCardClick(card.dataset.professionalId, card)));
    if (newAppointmentState.step === 1) modal.querySelector('#clientSearchInput')?.addEventListener('input', (e) => handleClientSearch(e.target.value));
    if (newAppointmentState.step === 4) { modal.querySelector('#apptDate')?.addEventListener('change', updateTimesAndDuration); updateTimesAndDuration(); renderLoyaltyRewards(); }
}