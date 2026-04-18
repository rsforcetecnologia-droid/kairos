// js/ui/agenda.js

import * as appointmentsApi from '../api/appointments.js';
import * as servicesApi from '../api/services.js';
import * as professionalsApi from '../api/professionals.js';
import * as blockagesApi from '../api/blockages.js';
import * as clientsApi from '../api/clients.js';
import * as establishmentApi from '../api/establishments.js';
import { state } from '../state.js';
import { showNotification, showConfirmation } from '../components/modal.js';
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
    currentDate: new Date(),
    selectedProfessionalId: 'all',
    showInactiveProfs: false,
    isSelectionMode: false,
    selectedItems: new Set(),
};

let newAppointmentState = {
    step: 1,
    data: {
        id: null, clientName: '', clientPhone: '', selectedServiceIds: [],
        professionalId: null, professionalName: '', date: null, time: null,
        originalDate: null, originalTime: null, 
        redeemedReward: null, clientHasRewards: false, clientLoyaltyPoints: 0
    }
};

function getMonday(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
}

function getLocalDateStr(dateObj) {
    const d = dateObj || new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

// ============================================================================
// RENDERIZAÇÃO
// ============================================================================

function renderProfessionalSelector() {
    const container = document.getElementById('profSelectorContainer');
    if (!container || !state.professionals) return;

    let availableProfs = state.professionals.filter(p => localState.showInactiveProfs || p.status !== 'inactive');
    const allOption = [{ id: 'all', name: 'Todos', photo: null }];
    const professionList = [...allOption, ...availableProfs];

    container.innerHTML = professionList.map((prof) => {
        const isActive = localState.selectedProfessionalId === prof.id;
        const initials = prof.name === 'Todos' ? 'T' : prof.name.charAt(0).toUpperCase();
        const profColor = prof.id !== 'all' ? state.professionalColors.get(prof.id) || colorPalette[0] : { main: '#adb5bd', light: '#f1f3f5' };

        return `
            <div class="flex items-center gap-2 px-4 py-1.5 rounded-full whitespace-nowrap cursor-pointer transition-transform active:scale-95 border ${isActive ? 'border-transparent shadow-sm' : 'border-gray-200 bg-white hover:bg-gray-50'}"
                 data-action="select-professional" data-prof-id="${prof.id}"
                 style="background-color: ${isActive ? profColor.light : ''}; border-color: ${isActive ? profColor.main : ''}; color: ${isActive ? profColor.main : '#4b5563'};">
                <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm flex-shrink-0" 
                     style="background-color: ${profColor.main}; ${prof.photo ? `background-image: url('${esc(prof.photo)}'); background-size: cover; background-position: center;` : ''}">
                    ${!prof.photo ? initials : ''}
                </div>
                <span class="text-sm font-semibold tracking-tight">${esc(prof.name === 'Todos' ? 'Todos' : prof.name.split(' ')[0])}</span>
            </div>`;
    }).join('');
}

function renderCalendarStrip() {
    const container = document.getElementById('calendarStripContainer');
    if (!container || localState.currentView !== 'list') return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const selectedDate = new Date(localState.currentDate);
    selectedDate.setHours(0, 0, 0, 0);

    let html = '';
    const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    for (let i = -7; i <= 14; i++) {
        const d = new Date(selectedDate);
        d.setDate(selectedDate.getDate() + i);
        d.setHours(0,0,0,0);
        
        const isSelected = d.getTime() === selectedDate.getTime();
        const isToday = d.getTime() === today.getTime();
        
        const dayName = weekDays[d.getDay()];
        const dayNum = d.getDate();

        const bgClass = isSelected ? 'bg-indigo-600 text-white shadow-md' : (isToday ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'bg-gray-50 text-gray-500 border border-transparent');
        const numClass = isSelected ? 'text-white' : (isToday ? 'text-indigo-700' : 'text-gray-900');

        html += `
            <div class="flex flex-col items-center justify-center min-w-[3.5rem] py-2 rounded-xl ${bgClass} cursor-pointer transition-transform active:scale-90 flex-shrink-0" data-action="select-date" data-date="${d.toISOString()}">
                <span class="text-[0.65rem] uppercase font-bold tracking-wider opacity-80 pointer-events-none">${dayName}</span>
                <span class="text-lg font-bold ${numClass} pointer-events-none mt-0.5">${dayNum}</span>
                ${isToday && !isSelected ? `<div class="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 pointer-events-none"></div>` : '<div class="w-1.5 h-1.5 mt-1 opacity-0"></div>'}
            </div>
        `;
    }
    
    container.innerHTML = html;

    container.querySelectorAll('[data-action="select-date"]').forEach(el => {
        el.addEventListener('click', () => {
            const newDate = new Date(el.dataset.date);
            localState.currentDate = newDate;
            if (navigator.vibrate) navigator.vibrate(30); 
            fetchAndDisplayAgenda();
        });
    });

    requestAnimationFrame(() => {
        const selectedEl = container.querySelector('.bg-indigo-600');
        if (selectedEl) {
            selectedEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    });
}

function esc(str) { return escapeHTML(str || ''); }

function createWhatsAppLink(phone, clientName, serviceName, professionalName, startTime) {
    const cleanedPhone = (phone || '').replace(/\D/g, '');
    const date = new Date(startTime).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    const time = new Date(startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const message = `Olá, ${clientName}! Você tem um agendamento de ${serviceName} com ${professionalName} para ${date} às ${time}. Podemos confirmar?`;
    return `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(message)}`;
}

function renderWeekView(allEvents) {
    const container = document.getElementById('agenda-view');
    if (!container) return;

    const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    const monday = getMonday(localState.currentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let html = '<div class="week-container flex gap-2 overflow-x-auto hide-scrollbar px-4" id="weekScroller">';

    for (let i = 0; i < 7; i++) {
        const day = new Date(monday);
        day.setDate(monday.getDate() + i);
        const isToday = day.toDateString() === today.toDateString();

        const dayEvents = allEvents
            .filter(e => new Date(e.startTime).toDateString() === day.toDateString())
            .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

        let dayContent = '';
        if (dayEvents.length === 0) {
            dayContent = '<div class="week-empty text-xs text-gray-400 text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200"><i class="bi bi-dash-lg block text-lg mb-1"></i>Livre</div>';
        } else {
            dayContent = dayEvents.map(event => {
                const st = new Date(event.startTime);
                const timeStr = st.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                const profColor = state.professionalColors.get(event.professionalId) || { main: '#adb5bd' };
                const isCompleted = event.status === 'completed';
                const isChecked = localState.selectedItems.has(event.id);

                if (event.type === 'blockage') {
                    return `<div class="week-event-chip bg-red-50 border-l-4 border-red-500 rounded-md p-2 mb-2">
                        <div class="text-xs font-bold text-red-700 flex items-center"><i class="bi bi-lock mr-1"></i>${timeStr}</div>
                        <div class="text-xs text-gray-800 font-semibold mt-1">${esc(event.reason)}</div>
                        <div class="text-[0.65rem] text-gray-500">${esc(event.professionalName)}</div>
                    </div>`;
                }

                const dataStr = JSON.stringify(event).replace(/'/g, '&apos;');
                const selStyle = isChecked ? 'ring-2 ring-indigo-500 bg-indigo-50' : 'bg-white';
                
                const checkboxHtml = localState.isSelectionMode
                    ? `<div class="absolute top-1 right-1 z-10">
                           <input type="checkbox" class="w-4 h-4 accent-indigo-600 pointer-events-none" ${isChecked ? 'checked' : ''}>
                       </div>`
                    : '';

                return `<div class="week-event-chip relative shadow-sm border-l-4 rounded-md p-2 mb-2 cursor-pointer transition-transform active:scale-95 ${isCompleted ? 'opacity-60' : ''} ${selStyle}" style="border-left-color: ${profColor.main};"
                    data-action="edit-appointment" data-appointment='${dataStr}'>
                    ${checkboxHtml}
                    <div class="text-xs font-bold text-gray-900">${timeStr}</div>
                    <div class="text-xs text-gray-800 font-semibold mt-0.5 truncate pr-2">${esc(event.clientName)}</div>
                    <div class="text-[0.65rem] text-gray-500 leading-tight mt-0.5">${esc(event.serviceName)} <br/> <span class="font-medium text-indigo-600">${esc((event.professionalName || '').split(' ')[0])}</span></div>
                </div>`;
            }).join('');
        }

        html += `<div class="week-day-col min-w-[140px] flex-1 flex flex-col pt-2">
            <div class="week-day-header text-center mb-3 pb-2 border-b border-gray-200 ${isToday ? 'is-today' : ''}">
                <div class="text-xs uppercase font-bold text-gray-500 ${isToday ? 'text-indigo-600' : ''}">${isToday ? 'Hoje' : weekDays[i]}</div>
                <div class="text-xl font-black text-gray-900 ${isToday ? 'text-indigo-600' : ''}">${day.getDate()}</div>
            </div>
            <div class="week-day-events flex-1">${dayContent}</div>
        </div>`;
    }

    html += '</div>';
    container.innerHTML = html;

    requestAnimationFrame(() => {
        const scroller = document.getElementById('weekScroller');
        if (scroller && window.innerWidth < 768) {
            const todayCol = scroller.querySelector('.is-today');
            if (todayCol) {
                todayCol.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
        }
    });
}

function renderListView(allEvents) {
    const container = document.getElementById('agenda-view');
    if (!container) return;

    allEvents.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    if (allEvents.length === 0) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                <div class="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 text-indigo-300">
                    <i class="bi bi-calendar2-x text-3xl"></i>
                </div>
                <p class="text-gray-800 font-bold text-lg mb-1">Agenda Livre</p>
                <p class="text-gray-500 text-sm">Não há agendamentos para esta data.</p>
            </div>`;
        return;
    }

    let html = '<div class="list-container px-4 py-2 space-y-4">';

    allEvents.forEach(event => {
        const st = new Date(event.startTime);
        const et = new Date(event.endTime);
        const durMin = Math.round((et - st) / 60000);
        const timeStr = st.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        const profColor = state.professionalColors.get(event.professionalId) || { main: '#adb5bd', light: '#f1f3f5' };
        const isCompleted = event.status === 'completed';
        const dataStr = JSON.stringify(event).replace(/'/g, '&apos;');
        const isChecked = localState.selectedItems.has(event.id);

        const checkboxHtml = localState.isSelectionMode
            ? `<div class="flex items-center justify-center pr-3 border-r border-gray-100 mr-3">
                   <input type="checkbox" class="w-5 h-5 accent-indigo-600 pointer-events-none" ${isChecked ? 'checked' : ''}>
               </div>`
            : '';

        const selStyle = isChecked ? 'ring-2 ring-indigo-500 bg-indigo-50' : 'bg-white';

        if (event.type === 'blockage') {
            html += `<div class="list-card flex bg-red-50 rounded-2xl p-4 shadow-sm border border-red-100 mb-3 cursor-pointer">
                ${checkboxHtml}
                <div class="flex flex-col items-center justify-center border-r border-red-200 pr-4 min-w-[4.5rem]">
                    <span class="text-lg font-bold text-red-700">${timeStr}</span>
                    <span class="text-xs text-red-500 font-semibold"><i class="bi bi-lock-fill"></i> Bloqueio</span>
                </div>
                <div class="flex-1 pl-4 flex flex-col justify-center">
                    <h3 class="font-bold text-red-800 text-sm">${esc(event.reason)}</h3>
                    <p class="text-xs text-red-600 mt-1 font-medium">${esc(event.professionalName)}</p>
                </div>
            </div>`;
            return;
        }

        const whatsappLink = createWhatsAppLink(event.clientPhone, event.clientName, event.serviceName, event.professionalName, event.startTime);
        const serviceValue = (event.services || []).reduce((sum, srv) => sum + (Number(srv.price) || 0), 0) || Number(event.totalPrice || 0) || Number(event.servicePrice || 0);
        const paymentState = event.paymentStatus || (event.status === 'completed' ? 'Finalizado' : 'Agendado');
        const professionalShort = esc((event.professionalName || '').split(' ')[0]);

        html += `<div class="list-card flex rounded-2xl p-3.5 shadow-sm border border-gray-100 cursor-pointer transition-transform active:scale-95 ${selStyle} ${isCompleted ? 'opacity-70 bg-gray-50' : ''}"
            style="border-left: 5px solid ${profColor.main};"
            data-action="edit-appointment" data-appointment='${dataStr}'>
            
            ${checkboxHtml}
            
            <div class="flex flex-col items-center justify-center border-r border-gray-100 pr-3.5 min-w-[4.5rem]">
                <span class="text-lg font-bold text-gray-900 ${isCompleted ? 'line-through text-gray-500' : ''}">${timeStr}</span>
                <span class="text-xs text-gray-500 font-medium">${durMin} min</span>
            </div>
            
            <div class="flex-1 pl-3.5 flex flex-col justify-center min-w-0">
                <h3 class="font-bold text-gray-900 text-[0.95rem] truncate">${esc(event.clientName)}</h3>
                <p class="text-xs text-gray-600 mt-0.5 truncate">${esc(event.serviceName)} <span class="font-bold text-indigo-600 px-1">·</span> ${professionalShort}</p>
                
                <div class="flex flex-wrap gap-1.5 mt-2.5">
                    <span class="text-[0.65rem] bg-gray-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200 font-bold">R$ ${serviceValue.toFixed(2).replace('.', ',')}</span>
                    ${event.clientPhone ? `<span class="text-[0.65rem] bg-gray-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200 font-bold flex items-center gap-1"><i class="bi bi-telephone-fill opacity-70"></i> ${esc(event.clientPhone)}</span>` : ''}
                    <span class="text-[0.65rem] px-2 py-0.5 rounded border font-bold ${isCompleted ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}">${esc(paymentState)}</span>
                </div>
            </div>

            ${!isCompleted && !localState.isSelectionMode ? `
            <div class="flex flex-col justify-center items-end pl-2 gap-2 border-l border-gray-50">
                <button class="lc-action-btn wa w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors" data-link="${whatsappLink}" title="WhatsApp">
                    <i class="bi bi-whatsapp"></i>
                </button>
                <button class="lc-action-btn comanda w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors" data-action="open-comanda" data-appointment='${dataStr}' title="Comanda">
                    <i class="bi bi-receipt-cutoff"></i>
                </button>
            </div>` : ''}
        </div>`;
    });

    html += '</div>';
    container.innerHTML = html;
}

function renderAgenda() {
    const filtered = state.allEvents.filter(ev => {
        const profMatch = localState.selectedProfessionalId === 'all' || ev.professionalId === localState.selectedProfessionalId;
        return profMatch;
    });

    if (localState.currentView === 'list') renderListView(filtered);
    else renderWeekView(filtered);

    updateBatchDeleteUI();
}

function updateBatchDeleteUI() {
    const container = document.getElementById('batch-delete-container');
    const fab = document.getElementById('agendaFab');
    if (!container) return;

    if (localState.isSelectionMode && localState.selectedItems.size > 0) {
        container.innerHTML = `<div class="bg-gray-900 text-white p-3 mx-4 rounded-2xl shadow-xl flex items-center justify-between">
            <span class="font-semibold text-sm flex items-center"><span class="bg-indigo-500 text-white w-6 h-6 flex items-center justify-center rounded-full mr-2 text-xs">${localState.selectedItems.size}</span> selecionados</span>
            <button data-action="batch-delete" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors">
                <i class="bi bi-trash3-fill"></i> Apagar
            </button>
        </div>`;
        container.style.display = 'block';
        if (fab) fab.style.transform = 'scale(0)'; 
    } else {
        container.style.display = 'none';
        if (fab) fab.style.transform = 'scale(1)'; 
    }
}

function updateDateDisplay() {
    const display = document.getElementById('currentMonthYearDisplay');
    if (display) {
        const cd = new Date(localState.currentDate);
        const monthStr = cd.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
        display.textContent = monthStr.charAt(0).toUpperCase() + monthStr.slice(1);
    }
    
    if (localState.currentView === 'list') {
        renderCalendarStrip();
        const stripContainer = document.getElementById('calendarStripContainer');
        if(stripContainer) stripContainer.style.display = 'flex';
    } else {
        const stripContainer = document.getElementById('calendarStripContainer');
        if(stripContainer) stripContainer.style.display = 'none';
    }
}

// ============================================================================
// BUSCA DE DADOS
// ============================================================================

async function fetchAndDisplayAgenda() {
    const agendaView = document.getElementById('agenda-view');
    if (!agendaView) return;

    localState.selectedItems.clear();
    updateBatchDeleteUI();
    agendaView.innerHTML = '<div class="flex items-center justify-center h-40"><div class="w-8 h-8 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div></div>';

    updateDateDisplay();

    let start, end;
    if (localState.currentView === 'list') {
        start = new Date(localState.currentDate);
        start.setHours(0, 0, 0, 0);
        end = new Date(start);
        end.setHours(23, 59, 59, 999);
    } else {
        const monday = getMonday(localState.currentDate);
        start = new Date(monday);
        end = new Date(monday);
        end.setDate(monday.getDate() + 6);
        end.setHours(23, 59, 59, 999);
    }

    try {
        const estIds = (state.selectedEstablishments && state.selectedEstablishments.length > 0) 
            ? state.selectedEstablishments 
            : [state.establishmentId];

        const fetchPromises = estIds.map(async (estId) => {
            const [appts, blockages] = await Promise.all([
                appointmentsApi.getAppointmentsByDateRange(estId, start.toISOString(), end.toISOString(), localState.selectedProfessionalId === 'all' ? null : localState.selectedProfessionalId),
                blockagesApi.getBlockagesByDateRange(estId, start.toISOString(), end.toISOString(), localState.selectedProfessionalId)
            ]);
            return { appts: appts || [], blockages: blockages || [] };
        });

        const results = await Promise.all(fetchPromises);
        
        let allAppts = [];
        let allBlockages = [];
        results.forEach(res => {
            allAppts = allAppts.concat(res.appts);
            allBlockages = allBlockages.concat(res.blockages);
        });

        if (!document.getElementById('agenda-view')) return;

        const enrich = items => items.map(a => ({
            ...a,
            type: a.type || 'appointment',
            professionalName: a.professionalName || (() => {
                const p = state.professionals?.find(pp => pp.id === a.professionalId);
                return p ? p.name : 'Indefinido';
            })()
        }));

        state.allEvents = [...enrich(allAppts), ...enrich(allBlockages)];
        renderProfessionalSelector();
        renderAgenda();
    } catch (error) {
        if (document.getElementById('agenda-view')) {
            document.getElementById('agenda-view').innerHTML = `
                <div class="text-center py-12 text-gray-500">
                    <i class="bi bi-exclamation-triangle text-3xl mb-2"></i>
                    <p class="text-sm font-medium">Erro ao carregar a agenda.</p>
                </div>`;
        }
    }
}

async function populateFilters() {
    try {
        const estIds = (state.selectedEstablishments && state.selectedEstablishments.length > 0) 
            ? state.selectedEstablishments 
            : [state.establishmentId];

        const fetchPromises = estIds.map(async (estId) => {
            const [profs, services, estDetails] = await Promise.all([
                professionalsApi.getProfessionals(estId),
                servicesApi.getServices(estId),
                establishmentApi.getEstablishmentDetails(estId)
            ]);
            return { profs: profs || [], services: services || [], estDetails };
        });

        const results = await Promise.all(fetchPromises);
        
        const profsMap = new Map();
        const servicesMap = new Map();
        let primaryDetails = results[0]?.estDetails;

        results.forEach(res => {
            res.profs.forEach(p => profsMap.set(p.id, p));
            res.services.forEach(s => servicesMap.set(s.id, s));
        });

        state.professionals = Array.from(profsMap.values());
        state.services = Array.from(servicesMap.values());
        allClientsData = [];

        if (primaryDetails) {
            loyaltySettingsForModal = primaryDetails.loyaltyProgram || { enabled: false };
        }

        state.professionals.forEach((prof, index) => {
            state.professionalColors.set(prof.id, colorPalette[index % colorPalette.length]);
        });

        renderProfessionalSelector();
    } catch (error) {
        showNotification('Atenção', 'Não foi possível carregar os dados da equipe.', 'error');
    }
}

// ============================================================================
// INICIALIZAÇÃO DA PÁGINA
// ============================================================================

export async function loadAgendaPage(params = {}) {
    if (currentTimeInterval) clearInterval(currentTimeInterval);

    localState.currentDate = params.targetDate ? new Date(params.targetDate) : (localState.currentDate || new Date());
    localState.isSelectionMode = false;
    localState.selectedItems.clear();

    contentDiv.innerHTML = `
        <div class="flex flex-col h-[calc(100vh-80px)] md:h-auto bg-gray-50 relative font-sans w-full">

            <div class="bg-white pt-safe-top sticky top-0 z-10 shadow-sm border-b border-gray-100 flex flex-col">
                <div class="flex justify-between items-center px-4 py-3">
                    <div class="flex items-center gap-3">
                        <button id="btnWeekDays" class="text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors" title="Opções">
                            <i class="bi bi-sliders text-xl"></i>
                        </button>
                        <h1 id="currentMonthYearDisplay" class="text-lg font-bold text-gray-900 m-0 leading-none">Carregando...</h1>
                    </div>

                    <div class="flex items-center gap-2">
                        <div class="flex items-center gap-1 bg-indigo-50 rounded-lg border border-indigo-100 p-0.5 shadow-sm">
                            <button id="btnPrevDate" class="w-7 h-7 flex items-center justify-center text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors active:scale-95" title="Anterior">
                                <i class="bi bi-chevron-left text-sm"></i>
                            </button>
                            <button id="btnTodayHeader" class="text-indigo-700 px-2 py-1 font-bold text-xs hover:bg-indigo-100 transition-colors uppercase tracking-wide rounded-md active:scale-95">
                                Hoje
                            </button>
                            <button id="btnNextDate" class="w-7 h-7 flex items-center justify-center text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors active:scale-95" title="Próximo">
                                <i class="bi bi-chevron-right text-sm"></i>
                            </button>
                        </div>
                        <div class="agenda-view-toggle bg-gray-100 p-1 rounded-xl flex gap-1">
                            <button class="${localState.currentView === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'} rounded-lg px-3 py-1 text-xs font-bold transition-all" data-action="setView" data-view="list">Lista</button>
                            <button class="${localState.currentView === 'week' ? 'bg-white shadow-sm' : 'text-gray-500'} rounded-lg px-3 py-1 text-xs font-bold transition-all" data-action="setView" data-view="week">Semana</button>
                        </div>
                    </div>
                </div>

                <div id="calendarStripContainer" class="flex overflow-x-auto hide-scrollbar gap-2 px-4 pb-3" style="scroll-behavior: smooth;"></div>
                
                <div id="profSelectorContainer" class="flex overflow-x-auto hide-scrollbar gap-2 px-4 py-3 border-t border-gray-100">
                    <div class="w-6 h-6 border-2 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
                </div>
            </div>

            <div id="agenda-view" class="flex-1 overflow-y-auto pb-32 pt-2"></div>

            <div id="batch-delete-container" class="fixed bottom-24 left-0 right-0 z-50 hidden px-4"></div>

            <button id="agendaFab" data-action="new-appointment" class="fixed bottom-24 right-4 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform active:scale-90 z-40">
                <i class="bi bi-plus-lg text-2xl"></i>
            </button>
            
            <div id="appointmentModal" class="fixed inset-0 z-[10000] hidden"></div>
        </div>`;

    document.getElementById('btnTodayHeader').addEventListener('click', () => {
        localState.currentDate = new Date();
        if (navigator.vibrate) navigator.vibrate(30);
        fetchAndDisplayAgenda();
    });

    document.getElementById('btnPrevDate').addEventListener('click', () => {
        const daysToMove = localState.currentView === 'week' ? 7 : 1;
        localState.currentDate.setDate(localState.currentDate.getDate() - daysToMove);
        if (navigator.vibrate) navigator.vibrate(20);
        fetchAndDisplayAgenda();
    });

    document.getElementById('btnNextDate').addEventListener('click', () => {
        const daysToMove = localState.currentView === 'week' ? 7 : 1;
        localState.currentDate.setDate(localState.currentDate.getDate() + daysToMove);
        if (navigator.vibrate) navigator.vibrate(20);
        fetchAndDisplayAgenda();
    });

    const viewBtns = document.querySelectorAll('.agenda-view-toggle button');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => {
                b.classList.remove('bg-white', 'shadow-sm');
                b.classList.add('text-gray-500');
            });
            btn.classList.add('bg-white', 'shadow-sm');
            btn.classList.remove('text-gray-500');
            localState.currentView = btn.dataset.view;
            if (navigator.vibrate) navigator.vibrate(20);
            fetchAndDisplayAgenda();
        });
    });

    document.getElementById('btnWeekDays').addEventListener('click', showOptionsMenu);

    if (!hasContentDelegationInitialized) {
        contentDiv.addEventListener('click', async (e) => {
            const comandaBtn = e.target.closest('[data-action="open-comanda"]');
            if (comandaBtn) {
                e.stopPropagation();
                if (navigator.vibrate) navigator.vibrate(20);
                const apptDataStr = comandaBtn.dataset.appointment || comandaBtn.closest('[data-appointment]')?.dataset.appointment;
                if (!apptDataStr) return;
                
                const apptData = JSON.parse(apptDataStr.replace(/&apos;/g, "'"));
                const initialFilter = apptData.status === 'completed' ? 'finalizadas' : 'em-atendimento';
                const navParams = { selectedAppointmentId: apptData.id, initialFilter };
                
                if (initialFilter === 'finalizadas' && apptData.transaction?.paidAt) {
                    navParams.filterDate = typeof apptData.transaction.paidAt === 'object'
                        ? new Date(apptData.transaction.paidAt._seconds * 1000)
                        : apptData.transaction.paidAt;
                }
                navigateTo('comandas-section', navParams);
                return;
            }

            const waBtn = e.target.closest('.lc-action-btn.wa');
            if (waBtn) {
                e.stopPropagation();
                if (navigator.vibrate) navigator.vibrate(20);
                if (waBtn.dataset.link) window.open(waBtn.dataset.link, '_blank');
                return;
            }

            if (e.target.closest('[data-action="batch-delete"]')) {
                const count = localState.selectedItems.size;
                const confirmed = await showConfirmation('Apagar Selecionados', `Deseja apagar ${count} registro(s)? Esta ação é irreversível.`);
                if (confirmed) {
                    await Promise.all(Array.from(localState.selectedItems).map(async (id) => {
                        try { await appointmentsApi.deleteAppointment(id); } catch (err) {}
                    }));
                    showNotification(`${count} registro(s) apagado(s).`, 'success');
                    localState.selectedItems.clear();
                    localState.isSelectionMode = false;
                    fetchAndDisplayAgenda();
                }
                return;
            }

            const profPill = e.target.closest('[data-action="select-professional"]');
            if (profPill) {
                if (navigator.vibrate) navigator.vibrate(20);
                const profId = profPill.dataset.profId;
                localState.selectedProfessionalId = (localState.selectedProfessionalId === profId && profId !== 'all') ? 'all' : profId;
                fetchAndDisplayAgenda();
                return;
            }

            const card = e.target.closest('.list-card[data-appointment], .week-event-chip[data-appointment]');
            if (card) {
                if (localState.isSelectionMode) {
                    e.stopPropagation();
                    const cb = card.querySelector('input[type="checkbox"]');
                    if (cb) {
                        const apptData = JSON.parse(card.dataset.appointment.replace(/&apos;/g, "'"));
                        const isNowChecked = !cb.checked; 
                        cb.checked = isNowChecked;
                        
                        if (isNowChecked) localState.selectedItems.add(apptData.id);
                        else localState.selectedItems.delete(apptData.id);
                        
                        if (card.classList.contains('week-event-chip') || card.classList.contains('list-card')) {
                            if (isNowChecked) {
                                card.classList.add('ring-2', 'ring-indigo-500', 'bg-indigo-50');
                                card.classList.remove('bg-white');
                            } else {
                                card.classList.remove('ring-2', 'ring-indigo-500', 'bg-indigo-50');
                                card.classList.add('bg-white');
                            }
                        }
                        if (navigator.vibrate) navigator.vibrate(15);
                        updateBatchDeleteUI();
                    }
                    return;
                }
                
                const apptData = JSON.parse(card.dataset.appointment.replace(/&apos;/g, "'"));
                if (navigator.vibrate) navigator.vibrate(20);
                openAppointmentModal(apptData);
                return;
            }

            const fab = e.target.closest('[data-action="new-appointment"]');
            if (fab) {
                if (navigator.vibrate) navigator.vibrate(30);
                openAppointmentModal();
                return;
            }
        });
        hasContentDelegationInitialized = true;
    }

    await populateFilters();
    await fetchAndDisplayAgenda();
}

function showOptionsMenu() {
    const existing = document.getElementById('optionsSheet');
    if (existing) { existing.remove(); return; }

    const sheet = document.createElement('div');
    sheet.id = 'optionsSheet';
    sheet.className = 'fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white rounded-t-3xl z-[10000] shadow-[0_-8px_40px_rgba(0,0,0,0.15)] transition-transform duration-300 translate-y-full';
    
    const selModeBtnBg = localState.isSelectionMode ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700';
    const selModeIcon = localState.isSelectionMode ? 'bi-x-circle' : 'bi-check2-square';

    sheet.innerHTML = `
        <div class="px-6 py-5">
            <div class="w-10 h-1.5 bg-gray-200 rounded-full mx-auto mb-5"></div>
            
            <div class="flex justify-between items-center mb-5">
                <span class="text-lg font-bold text-gray-900">Opções da Agenda</span>
                <button id="closeOptSheet" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200">
                    <i class="bi bi-x-lg text-sm"></i>
                </button>
            </div>

            <div class="mb-5">
                <div class="text-[0.7rem] font-bold text-gray-400 uppercase tracking-wider mb-2.5">Gestão em Lote</div>
                <button id="optSelectMode" class="w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 ${selModeBtnBg} transition-colors active:scale-95">
                    <i class="bi ${selModeIcon} text-lg"></i> ${localState.isSelectionMode ? 'Desativar Modo de Exclusão' : 'Ativar Seleção Múltipla'}
                </button>
                <p class="text-xs text-gray-500 text-center mt-2.5">${localState.isSelectionMode ? 'Toque num cartão para desmarcar.' : 'Permite selecionar vários registros para apagar.'}</p>
            </div>

            <div class="mb-4">
                <div class="text-[0.7rem] font-bold text-gray-400 uppercase tracking-wider mb-2.5">Equipe</div>
                <label class="flex items-center gap-3 p-3.5 bg-gray-50 border border-gray-100 rounded-xl cursor-pointer">
                    <input type="checkbox" id="optInactiveToggle" class="w-5 h-5 accent-indigo-600 rounded" ${localState.showInactiveProfs ? 'checked' : ''}>
                    <span class="text-sm font-semibold text-gray-700">Exibir profissionais inativos na barra</span>
                </label>
            </div>
        </div>`;

    const overlay = document.createElement('div');
    overlay.id = 'optionsOverlay';
    overlay.className = 'fixed inset-0 bg-black/40 z-[9999] opacity-0 transition-opacity duration-300';

    document.body.appendChild(overlay);
    document.body.appendChild(sheet);

    requestAnimationFrame(() => {
        sheet.classList.remove('translate-y-full');
        overlay.classList.remove('opacity-0');
    });

    const closeSheet = () => {
        sheet.classList.add('translate-y-full');
        overlay.classList.add('opacity-0');
        setTimeout(() => {
            sheet.remove();
            overlay.remove();
        }, 300);
    };

    document.getElementById('closeOptSheet').addEventListener('click', closeSheet);
    overlay.addEventListener('click', closeSheet);

    document.getElementById('optSelectMode').addEventListener('click', () => {
        localState.isSelectionMode = !localState.isSelectionMode;
        if (!localState.isSelectionMode) localState.selectedItems.clear(); 
        closeSheet();
        renderAgenda(); 
    });

    document.getElementById('optInactiveToggle').addEventListener('change', (e) => {
        localState.showInactiveProfs = e.target.checked;
        renderProfessionalSelector();
    });
}

// ============================================================================
// MODAL RESPONSIVO (TELA CHEIA MOBILE / FLUTUANTE DESKTOP)
// ============================================================================

function navigateModalStep(step) {
    if (step < 1 || step > 4) return;
    newAppointmentState.step = step;
    openAppointmentModal(null, true);
}

function renderStep1_Client(appointment) {
    return {
        title: appointment ? 'Editar Reserva' : 'Novo Cliente',
        content: `
        <div class="p-4 space-y-4 flex-1">
            <div class="space-y-3">
                <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nome Completo</label>
                    <input type="text" id="apptClientName" placeholder="Ex: João Silva" class="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 font-semibold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm" value="${esc(newAppointmentState.data.clientName)}">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">WhatsApp / Telefone</label>
                    <input type="tel" id="apptClientPhone" placeholder="(00) 00000-0000" class="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 font-semibold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm" value="${esc(newAppointmentState.data.clientPhone)}">
                </div>
            </div>
            
            <div class="pt-4 border-t border-gray-200">
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Buscar na Base de Dados</label>
                <div class="relative">
                    <i class="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base"></i>
                    <input type="text" id="clientSearchInput" placeholder="Procurar cliente..." class="w-full p-3 pl-11 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-900 font-medium focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all">
                </div>
                <div id="clientSearchResults" class="mt-3 space-y-2"></div>
            </div>
        </div>
        <div class="p-4 bg-white border-t border-gray-200 flex gap-3 pb-safe">
            <button type="button" data-action="close-modal" class="flex-1 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl active:bg-gray-200 transition-colors text-sm">Cancelar</button>
            <button type="button" data-action="next-step" data-current-step="1" class="flex-1 py-3.5 bg-indigo-600 text-white font-bold rounded-xl shadow-md active:scale-95 transition-transform text-sm">Avançar</button>
        </div>`
    };
}

function renderStep2_Service() {
    return {
        title: 'Serviços',
        content: `
        <div class="p-4 space-y-4 flex-1 flex flex-col">
            <div class="flex items-center gap-3">
                <div class="relative flex-1">
                    <i class="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base"></i>
                    <input type="search" id="serviceSearchModalInput" placeholder="Buscar serviço..." class="w-full p-3 pl-11 bg-gray-100 border border-transparent rounded-xl text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none">
                </div>
                <label class="flex items-center gap-2 bg-white px-3 py-3 rounded-xl border border-gray-200 cursor-pointer shadow-sm">
                    <input type="checkbox" id="multiServiceToggle" class="w-5 h-5 accent-indigo-600 rounded" ${newAppointmentState.data.selectedServiceIds.length > 1 ? 'checked' : ''}>
                    <span class="text-xs font-bold text-gray-700 uppercase">Múltiplos</span>
                </label>
            </div>
            <div id="apptServicesContainer" class="flex-1 overflow-y-auto grid grid-cols-2 gap-3 content-start pb-4">
                ${availableServicesForModal.map(srv => {
                    const sel = newAppointmentState.data.selectedServiceIds.includes(srv.id);
                    return `<div class="service-card p-3 bg-white rounded-xl border-2 transition-all active:scale-95 ${sel ? 'border-indigo-500 bg-indigo-50 shadow-md' : 'border-gray-100 hover:border-gray-200 shadow-sm'} cursor-pointer flex flex-col justify-between gap-2" data-service-id="${srv.id}">
                        <div>
                            <p class="font-bold text-[0.85rem] leading-tight text-gray-900 line-clamp-2">${esc(srv.name)}</p>
                            <p class="text-[0.7rem] font-bold text-gray-500 mt-1"><i class="bi bi-clock mr-1"></i>${srv.duration} min</p>
                        </div>
                        <div class="w-full text-left mt-1">
                            <p class="text-sm font-black text-indigo-600">R$ ${srv.price.toFixed(2).replace('.', ',')}</p>
                        </div>
                    </div>`;
                }).join('')}
            </div>
        </div>
        <div class="p-4 bg-white border-t border-gray-200 flex gap-3 pb-safe">
            <button type="button" data-action="prev-step" data-current-step="2" class="w-1/3 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl active:bg-gray-200 transition-colors text-sm">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="2" class="w-2/3 py-3.5 bg-indigo-600 text-white font-bold rounded-xl shadow-md active:scale-95 transition-transform text-sm">Avançar</button>
        </div>`
    };
}

function renderStep3_Professional() {
    return {
        title: 'Equipe',
        content: `
        <div class="p-4 space-y-4 flex-1 flex flex-col">
            <div class="relative">
                <i class="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base"></i>
                <input type="search" id="professionalSearchModalInput" placeholder="Procurar profissional..." class="w-full p-3 pl-11 bg-gray-100 border border-transparent rounded-xl text-sm focus:bg-white focus:border-indigo-500 outline-none">
            </div>
            <div id="apptProfessionalContainer" class="flex-1 overflow-y-auto grid grid-cols-3 gap-3 content-start pb-4">
                ${availableProfessionalsForModal.map(prof => {
                    const sel = newAppointmentState.data.professionalId === prof.id;
                    const pColor = state.professionalColors.get(prof.id) || colorPalette[0];
                    return `<div class="professional-modal-card p-3 bg-white rounded-2xl border-2 transition-all active:scale-95 ${sel ? 'border-indigo-500 bg-indigo-50 shadow-md' : 'border-gray-100 hover:border-gray-200 shadow-sm'} cursor-pointer text-center flex flex-col items-center justify-center" data-professional-id="${prof.id}">
                        <div class="w-14 h-14 rounded-full flex items-center justify-center font-black text-white text-xl shadow-sm mb-2" style="background-color: ${pColor.main}; ${prof.photo ? `background-image: url('${esc(prof.photo)}'); background-size: cover; background-position: center;` : ''}">
                            ${!prof.photo ? esc(prof.name).charAt(0) : ''}
                        </div>
                        <p class="text-[0.75rem] font-bold text-gray-900 w-full truncate">${esc(prof.name.split(' ')[0])}</p>
                    </div>`;
                }).join('')}
            </div>
        </div>
        <div class="p-4 bg-white border-t border-gray-200 flex gap-3 pb-safe">
            <button type="button" data-action="prev-step" data-current-step="3" class="w-1/3 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl active:bg-gray-200 transition-colors text-sm">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="3" class="w-2/3 py-3.5 bg-indigo-600 text-white font-bold rounded-xl shadow-md active:scale-95 transition-transform text-sm">Avançar</button>
        </div>`
    };
}

function renderStep4_Schedule() {
    const initDate = newAppointmentState.data.date || getLocalDateStr();
    return {
        title: 'Horário',
        content: `
        <div class="p-4 space-y-4 flex-1 flex flex-col">
            
            <div class="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-sm">
                <div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-lg">${esc(newAppointmentState.data.clientName).charAt(0)}</div>
                <div class="flex-1 min-w-0">
                    <p class="font-bold text-sm text-gray-900 truncate">${esc(newAppointmentState.data.clientName)}</p>
                    <p class="text-xs font-bold text-gray-500 truncate mt-0.5"><i class="bi bi-person-badge mr-1"></i> ${esc(newAppointmentState.data.professionalName)}</p>
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-3">
                <div>
                    <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Data</label>
                    <input type="date" id="apptDate" class="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:border-indigo-500 outline-none shadow-sm" value="${initDate}">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Duração</label>
                    <div class="w-full p-3 bg-gray-100 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 flex items-center justify-center gap-2 shadow-sm">
                        <i class="bi bi-stopwatch text-indigo-500"></i> <span id="apptTotalDuration">--</span>
                    </div>
                </div>
            </div>

            <div class="flex-1 flex flex-col min-h-0 mt-2">
                <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Horários Disponíveis</label>
                <div id="availableTimesContainer" class="flex-1 overflow-y-auto grid grid-cols-3 gap-2.5 content-start pb-4"></div>
            </div>
            <div id="loyaltyRewardsContainer"></div>
        </div>
        <div class="p-4 bg-white border-t border-gray-200 flex gap-3 pb-safe">
            <button type="button" data-action="prev-step" data-current-step="4" class="w-1/3 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl active:bg-gray-200 transition-colors text-sm">Voltar</button>
            <button type="button" id="btnSubmitAppointment" class="w-2/3 py-3.5 bg-indigo-600 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2 text-sm">
                <i class="bi bi-check-circle-fill"></i> ${newAppointmentState.data.id ? 'Salvar' : 'Confirmar'}
            </button>
        </div>`
    };
}

async function openAppointmentModal(appointment = null, isNavigating = false) {
    const modal = document.getElementById('appointmentModal');
    
    if (!isNavigating) {
        newAppointmentState = {
            step: 1,
            data: {
                id: appointment?.id || null,
                clientName: appointment?.clientName || '',
                clientPhone: appointment?.clientPhone || '',
                selectedServiceIds: appointment?.services?.map(s => s.id) || [],
                professionalId: appointment?.professionalId || null,
                professionalName: appointment?.professionalName || '',
                date: appointment?.startTime ? getLocalDateStr(new Date(appointment.startTime)) : getLocalDateStr(),
                time: appointment?.startTime ? new Date(appointment.startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false }) : null,
                originalDate: appointment?.startTime ? getLocalDateStr(new Date(appointment.startTime)) : null,
                originalTime: appointment?.startTime ? new Date(appointment.startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false }) : null,
                redeemedReward: appointment?.redeemedReward || null,
                clientHasRewards: appointment?.hasRewards || false,
                clientLoyaltyPoints: 0
            }
        };
    }
    
    availableServicesForModal = state.services || [];
    availableProfessionalsForModal = (state.professionals || []).filter(p => p.status === 'active');

    let renderResult;
    switch (newAppointmentState.step) {
        case 1: renderResult = renderStep1_Client(appointment); break;
        case 2: renderResult = renderStep2_Service(); break;
        case 3: renderResult = renderStep3_Professional(); break;
        case 4: renderResult = renderStep4_Schedule(); break;
    }

    // Configurando as classes do Modal (Mobile Tela Cheia / Desktop Flutuante)
    modal.className = 'fixed inset-0 z-[10000] hidden flex items-end md:items-center justify-center bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 opacity-0';
    
    modal.innerHTML = `
        <div class="absolute inset-0 z-0 cursor-pointer" data-action="close-modal"></div>
        <div id="appointmentModalContent" class="relative z-10 w-full h-full md:h-auto md:max-h-[85vh] md:w-[550px] md:rounded-2xl bg-gray-50 flex flex-col transform transition-all duration-300 translate-y-full md:translate-y-8 md:scale-95 shadow-2xl overflow-hidden">
            <header class="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between pt-safe-top md:pt-4 shadow-sm z-20">
                <button type="button" data-action="close-modal" class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 active:scale-90 transition-all">
                    <i class="bi bi-x-lg text-sm"></i>
                </button>
                <div class="text-center flex-1 px-2">
                    <h2 class="text-sm font-black text-gray-900 tracking-tight leading-tight truncate">${renderResult.title}</h2>
                    <div class="flex items-center justify-center gap-1 mt-1">
                        <div class="w-2 h-2 rounded-full ${newAppointmentState.step >= 1 ? 'bg-indigo-600' : 'bg-gray-200'}"></div>
                        <div class="w-2 h-2 rounded-full ${newAppointmentState.step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}"></div>
                        <div class="w-2 h-2 rounded-full ${newAppointmentState.step >= 3 ? 'bg-indigo-600' : 'bg-gray-200'}"></div>
                        <div class="w-2 h-2 rounded-full ${newAppointmentState.step >= 4 ? 'bg-indigo-600' : 'bg-gray-200'}"></div>
                    </div>
                </div>
                <div class="w-10 h-10"></div>
            </header>
            <form id="appointmentForm" class="flex-1 overflow-y-auto flex flex-col bg-gray-50">${renderResult.content}</form>
        </div>
    `;

    // Função universal de encerramento
    const closeApptModal = () => {
        const content = modal.querySelector('#appointmentModalContent');
        if (content) {
            content.classList.remove('translate-y-0', 'md:translate-y-0', 'md:scale-100');
            content.classList.add('translate-y-full', 'md:translate-y-8', 'md:scale-95');
        }
        modal.classList.add('opacity-0');
        setTimeout(() => { modal.classList.add('hidden'); }, 300);
    };

    modal.querySelectorAll('[data-action="next-step"]').forEach(btn => btn.addEventListener('click', () => {
        const cs = parseInt(btn.dataset.currentStep, 10);
        if (cs === 1) {
            newAppointmentState.data.clientName = modal.querySelector('#apptClientName').value.trim();
            newAppointmentState.data.clientPhone = modal.querySelector('#apptClientPhone').value.trim();
            if (!newAppointmentState.data.clientName) return showNotification('Preencha o nome do cliente.', 'warning');
        }
        if (cs === 2 && newAppointmentState.data.selectedServiceIds.length === 0) return showNotification('Selecione um serviço.', 'warning');
        if (cs === 3 && !newAppointmentState.data.professionalId) return showNotification('Escolha um membro da equipe.', 'warning');
        navigateModalStep(cs + 1);
    }));
    
    modal.querySelectorAll('[data-action="prev-step"]').forEach(btn => btn.addEventListener('click', () => navigateModalStep(parseInt(btn.dataset.currentStep, 10) - 1)));
    
    modal.querySelectorAll('[data-action="close-modal"]').forEach(btn => {
        btn.addEventListener('click', closeApptModal);
    });

    // Exibindo o Modal (Trigger Animations)
    modal.classList.remove('hidden');
    void modal.offsetWidth; // Força layout reflow
    modal.classList.remove('opacity-0');
    const contentBox = modal.querySelector('#appointmentModalContent');
    if (contentBox) {
        contentBox.classList.remove('translate-y-full', 'md:translate-y-8', 'md:scale-95');
        contentBox.classList.add('translate-y-0', 'md:translate-y-0', 'md:scale-100');
    }

    if (newAppointmentState.step === 2) {
        modal.querySelectorAll('.service-card').forEach(card => card.addEventListener('click', () => {
            const isMulti = modal.querySelector('#multiServiceToggle')?.checked;
            const sel = card.classList.contains('bg-indigo-50');
            const sid = card.dataset.serviceId;
            if (navigator.vibrate) navigator.vibrate(15);
            
            if (!isMulti) {
                modal.querySelectorAll('.service-card.bg-indigo-50').forEach(c => {
                    c.classList.remove('border-indigo-500', 'bg-indigo-50', 'shadow-md');
                    c.classList.add('border-gray-100', 'shadow-sm');
                });
                card.classList.add('border-indigo-500', 'bg-indigo-50', 'shadow-md');
                card.classList.remove('border-gray-100', 'shadow-sm');
                newAppointmentState.data.selectedServiceIds = [sid];
                
                setTimeout(() => navigateModalStep(3), 250);
            } else {
                if (sel) {
                    card.classList.remove('border-indigo-500', 'bg-indigo-50', 'shadow-md');
                    card.classList.add('border-gray-100', 'shadow-sm');
                    newAppointmentState.data.selectedServiceIds = newAppointmentState.data.selectedServiceIds.filter(i => i !== sid);
                } else {
                    card.classList.add('border-indigo-500', 'bg-indigo-50', 'shadow-md');
                    card.classList.remove('border-gray-100', 'shadow-sm');
                    if(!newAppointmentState.data.selectedServiceIds.includes(sid)) {
                        newAppointmentState.data.selectedServiceIds.push(sid);
                    }
                }
            }
        }));
    }

    if (newAppointmentState.step === 3) {
        modal.querySelectorAll('.professional-modal-card').forEach(card => card.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(15);
            modal.querySelectorAll('.professional-modal-card.bg-indigo-50').forEach(c => {
                c.classList.remove('border-indigo-500', 'bg-indigo-50', 'shadow-md');
                c.classList.add('border-gray-100', 'shadow-sm');
            });
            card.classList.add('border-indigo-500', 'bg-indigo-50', 'shadow-md');
            card.classList.remove('border-gray-100', 'shadow-sm');
            newAppointmentState.data.professionalId = card.dataset.professionalId;
            const prof = availableProfessionalsForModal.find(p => p.id === card.dataset.professionalId);
            newAppointmentState.data.professionalName = prof ? prof.name : '';
            
            setTimeout(() => navigateModalStep(4), 250);
        }));
    }

    if (newAppointmentState.step === 1) {
        modal.querySelector('#clientSearchInput')?.addEventListener('input', (e) => handleClientSearch(e.target.value));
    }

    if (newAppointmentState.step === 4) {
        modal.querySelector('#apptDate')?.addEventListener('change', updateTimesAndDuration);
        
        modal.querySelector('#availableTimesContainer')?.addEventListener('click', (e) => {
            const btn = e.target.closest('button[data-time-slot]');
            if (btn) {
                if (navigator.vibrate) navigator.vibrate(10);
                modal.querySelectorAll('#availableTimesContainer button').forEach(b => {
                    b.classList.remove('bg-indigo-600', 'text-white', 'border-indigo-600', 'shadow-md');
                    b.classList.add('bg-white', 'text-gray-700', 'border-gray-200', 'shadow-sm');
                });
                btn.classList.add('bg-indigo-600', 'text-white', 'border-indigo-600', 'shadow-md');
                btn.classList.remove('bg-white', 'text-gray-700', 'border-gray-200', 'shadow-sm');
                newAppointmentState.data.time = btn.dataset.timeSlot;
            }
        });

        modal.querySelector('#btnSubmitAppointment')?.addEventListener('click', handleAppointmentFormSubmit);

        updateTimesAndDuration();
        renderLoyaltyRewards();
    }
}

async function handleAppointmentFormSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('btnSubmitAppointment');

    if (!newAppointmentState.data.time || !newAppointmentState.data.selectedServiceIds.length || !newAppointmentState.data.professionalId) {
        return showNotification('Selecione horário, serviço e profissional.', 'warning');
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Processando...';

    const servicesData = newAppointmentState.data.selectedServiceIds.map(id => {
        const s = availableServicesForModal.find(x => x.id === id);
        return { id: s.id, name: s.name, price: s.price, duration: s.duration, bufferTime: s.bufferTime || 0, photo: s.photo || null };
    });

    const [h, m] = newAppointmentState.data.time.split(':');
    const startTime = new Date(`${newAppointmentState.data.date}T${h}:${m}:00`);

    const totalDur = servicesData.reduce((acc, s) => acc + (s.duration + (s.bufferTime || 0)), 0);
    const endTime = new Date(startTime.getTime() + totalDur * 60000);

    const targetEstId = (state.selectedEstablishments && state.selectedEstablishments.length > 0) 
        ? state.selectedEstablishments[0] 
        : state.establishmentId;

    const data = {
        establishmentId: targetEstId,
        clientName: newAppointmentState.data.clientName,
        clientPhone: newAppointmentState.data.clientPhone,
        services: servicesData,
        professionalId: newAppointmentState.data.professionalId,
        professionalName: newAppointmentState.data.professionalName,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        redeemedReward: newAppointmentState.data.redeemedReward
    };

    if (newAppointmentState.data.id) data.id = newAppointmentState.data.id;

    try {
        if (newAppointmentState.data.id) await appointmentsApi.updateAppointment(newAppointmentState.data.id, data);
        else await appointmentsApi.createAppointment(data);

        showNotification('Registro salvo!', 'success');
        
        // Fechamento Universal Animado
        const modal = document.getElementById('appointmentModal');
        const content = modal.querySelector('#appointmentModalContent');
        if (content) {
            content.classList.remove('translate-y-0', 'md:translate-y-0', 'md:scale-100');
            content.classList.add('translate-y-full', 'md:translate-y-8', 'md:scale-95');
        }
        modal.classList.add('opacity-0');
        setTimeout(() => { modal.classList.add('hidden'); }, 300);
        
        fetchAndDisplayAgenda();
    } catch (error) {
        showNotification(error.message, 'error');
        btn.disabled = false;
        btn.innerHTML = `<i class="bi bi-check-circle-fill"></i> ${newAppointmentState.data.id ? 'Salvar Edição' : 'Confirmar'}`;
    }
}

async function updateTimesAndDuration() {
    const container = document.getElementById('availableTimesContainer');
    const durationEl = document.getElementById('apptTotalDuration');
    if (!container) return;

    const dateInput = document.getElementById('apptDate');
    if (dateInput && dateInput.value) {
        newAppointmentState.data.date = dateInput.value;
    }

    const totalDur = newAppointmentState.data.selectedServiceIds.reduce((acc, id) => {
        const s = availableServicesForModal.find(x => x.id === id);
        return acc + (s ? (s.duration + (s.bufferTime || 0)) : 0);
    }, 0);

    if (durationEl) durationEl.innerHTML = `<strong>${totalDur}</strong> min`;

    const { professionalId, selectedServiceIds, date, originalDate, originalTime, id: isEditing } = newAppointmentState.data;
    if (!professionalId || !selectedServiceIds.length || !date) {
        container.innerHTML = '<p class="col-span-full text-center text-xs text-gray-500 font-bold py-4 bg-white rounded-xl shadow-sm border border-gray-100">Preencha os passos anteriores.</p>';
        return;
    }

    container.innerHTML = '<div class="col-span-full flex justify-center py-4"><div class="w-6 h-6 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div></div>';

    try {
        const targetEstId = (state.selectedEstablishments && state.selectedEstablishments.length > 0) 
            ? state.selectedEstablishments[0] 
            : state.establishmentId;

        let slots = await appointmentsApi.getAvailability({
            establishmentId: targetEstId,
            professionalId,
            serviceIds: selectedServiceIds,
            date
        });
        
        const now = new Date();
        if (new Date(date + 'T00:00:00').toDateString() === now.toDateString()) {
            const curMin = now.getHours() * 60 + now.getMinutes();
            slots = slots.filter(s => {
                const [sh, sm] = s.split(':').map(Number);
                return (sh * 60 + sm) >= curMin;
            });
        }

        if (isEditing && date === originalDate && originalTime) {
            if (!slots.includes(originalTime)) {
                slots.push(originalTime);
                slots.sort(); 
            }
        }

        container.innerHTML = slots.length > 0 ? slots.map(slot => {
            const sel = newAppointmentState.data.time === slot;
            return `<button type="button" data-time-slot="${slot}" class="py-3 text-sm font-bold rounded-xl border-2 transition-transform active:scale-95 ${sel ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300 shadow-sm'}">${slot}</button>`;
        }).join('') : '<p class="col-span-full text-center text-sm font-bold text-red-500 bg-white py-4 rounded-xl border border-red-100 shadow-sm">Nenhum horário livre.</p>';
    } catch (err) {
        container.innerHTML = '<p class="col-span-full text-center text-sm font-bold text-red-500 bg-white py-4 rounded-xl">Erro ao pesquisar.</p>';
    }
}

function renderLoyaltyRewards() {
    const container = document.getElementById('loyaltyRewardsContainer');
    if (!container) return;

    const { clientHasRewards, clientLoyaltyPoints } = newAppointmentState.data;
    const { enabled, rewards } = loyaltySettingsForModal;
    if (!enabled || !clientHasRewards || !rewards?.length) { container.innerHTML = ''; return; }

    const avail = rewards.filter(r => clientLoyaltyPoints >= r.points);
    if (!avail.length) { container.innerHTML = '<p class="text-xs font-bold text-gray-400 mt-3 text-center">Nenhuma recompensa atingida ainda.</p>'; return; }

    container.innerHTML = `<div class="border border-indigo-100 bg-indigo-50/80 rounded-xl p-3 mt-3 shadow-sm">
        <p class="text-[0.7rem] font-bold text-indigo-800 uppercase tracking-wider mb-2">Recompensas (${clientLoyaltyPoints} pts)</p>
        ${avail.map(r => `<label class="flex items-center gap-2 p-2 bg-white border border-indigo-100 rounded-lg mb-1.5 cursor-pointer shadow-sm active:scale-95 transition-transform"><input type="radio" name="loyaltyReward" value="${esc(r.reward)}" data-points="${r.points}" class="w-4 h-4 accent-indigo-600"><span class="text-[0.85rem] font-bold text-gray-800 flex-1">${esc(r.reward)}</span><span class="text-[0.65rem] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">-${r.points} pts</span></label>`).join('')}
    </div>`;

    container.querySelectorAll('input[name="loyaltyReward"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.checked) newAppointmentState.data.redeemedReward = { reward: e.target.value, points: parseInt(e.target.dataset.points, 10) };
        });
    });
}

async function handleClientSearch(term) {
    const container = document.getElementById('clientSearchResults');
    if (!container || term.trim().length < 3) {
        if (container) container.innerHTML = '<p class="text-sm text-gray-400 font-medium px-2 py-2 text-center">Digite 3 ou mais caracteres...</p>';
        return;
    }

    container.innerHTML = '<div class="text-center py-4"><div class="w-6 h-6 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div></div>';

    try {
        const estIds = (state.selectedEstablishments && state.selectedEstablishments.length > 0) 
            ? state.selectedEstablishments 
            : [state.establishmentId];

        const searchPromises = estIds.map(estId => clientsApi.getClients(estId, term.trim()));
        const results = await Promise.all(searchPromises);
        
        const clientsMap = new Map();
        results.forEach(res => {
            res.forEach(c => {
                if (c.phone) clientsMap.set(c.phone, c);
                else clientsMap.set(c.id || Math.random().toString(), c);
            });
        });

        const found = Array.from(clientsMap.values());
        allClientsData = found;

        if (!found.length) {
            container.innerHTML = '<p class="text-sm text-gray-500 bg-white border border-gray-200 p-3 rounded-xl text-center font-bold shadow-sm">Nenhum cliente encontrado.</p>';
            return;
        }
        
        container.innerHTML = found.map(c => {
            const sel = newAppointmentState.data.clientName === c.name && newAppointmentState.data.clientPhone === c.phone;
            return `<div class="client-card p-3 bg-white rounded-xl border-2 transition-all active:scale-95 ${sel ? 'border-indigo-500 bg-indigo-50 shadow-md' : 'border-gray-100 hover:border-gray-200 shadow-sm'} cursor-pointer flex items-center gap-3" data-client-name="${esc(c.name)}" data-client-phone="${esc(c.phone)}" data-loyalty-points="${c.loyaltyPoints || 0}">
                <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-black text-gray-500 flex-shrink-0">${esc(c.name).charAt(0)}</div>
                <div class="flex-1 min-w-0"><p class="text-sm font-bold text-gray-900 truncate">${esc(c.name)}</p><p class="text-[0.75rem] font-semibold text-gray-500 truncate mt-0.5">${esc(c.phone)}</p></div>
            </div>`;
        }).join('');

        container.querySelectorAll('.client-card').forEach(card => {
            card.addEventListener('click', () => {
                if (navigator.vibrate) navigator.vibrate(15);
                newAppointmentState.data.clientName = card.dataset.clientName;
                newAppointmentState.data.clientPhone = card.dataset.clientPhone;
                newAppointmentState.data.clientLoyaltyPoints = parseInt(card.dataset.loyaltyPoints || '0', 10);
                const minPts = Math.min(...(loyaltySettingsForModal?.rewards || []).map(r => r.points));
                newAppointmentState.data.clientHasRewards = loyaltySettingsForModal.enabled && minPts !== Infinity && newAppointmentState.data.clientLoyaltyPoints >= minPts;
                
                document.getElementById('apptClientName').value = card.dataset.clientName;
                document.getElementById('apptClientPhone').value = card.dataset.clientPhone;
                
                container.querySelectorAll('.client-card').forEach(c => {
                    c.classList.remove('border-indigo-500', 'bg-indigo-50', 'shadow-md');
                    c.classList.add('border-gray-100', 'shadow-sm');
                });
                card.classList.add('border-indigo-500', 'bg-indigo-50', 'shadow-md');
                card.classList.remove('border-gray-100', 'shadow-sm');
                
                setTimeout(() => navigateModalStep(2), 250);
            });
        });
    } catch (err) {
        container.innerHTML = '<p class="text-[0.75rem] font-bold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100 text-center shadow-sm">Erro ao pesquisar.</p>';
    }
}