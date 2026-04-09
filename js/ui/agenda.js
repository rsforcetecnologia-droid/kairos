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
        redeemedReward: null, clientHasRewards: false, clientLoyaltyPoints: 0
    }
};

// Always 7 days: Monday to Sunday
function getMonday(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
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
            <div class="prof-pill ${isActive ? 'active' : ''}"
                 data-action="select-professional" data-prof-id="${prof.id}"
                 style="--pc: ${profColor.main}; --pb: ${isActive ? profColor.bg : ''}; --pl: ${profColor.light};">
                <div class="prof-pill-dot" ${prof.photo ? `style="background-image: url('${esc(prof.photo)}'); background-size: cover; background-position: center;"` : ''}>
                    ${!prof.photo ? initials : ''}
                </div>
                <span>${esc(prof.name === 'Todos' ? 'Todos' : prof.name.split(' ')[0])}</span>
            </div>`;
    }).join('');
}

function esc(str) { return escapeHTML(str || ''); }

function createWhatsAppLink(phone, clientName, serviceName, professionalName, startTime) {
    const cleanedPhone = (phone || '').replace(/\D/g, '');
    const date = new Date(startTime).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    const time = new Date(startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const message = `Olá, ${clientName}! Você tem um agendamento de ${serviceName} com ${professionalName} para ${date} às ${time}. Podemos confirmar?`;
    return `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(message)}`;
}

// --- WEEK VIEW: 7 days, mobile shows 3 at a time (33.33% each), scrollable ---
function renderWeekView(allEvents) {
    const container = document.getElementById('agenda-view');
    if (!container) return;

    const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    const monday = getMonday(localState.currentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let html = '<div class="week-container" id="weekScroller">';

    for (let i = 0; i < 7; i++) {
        const day = new Date(monday);
        day.setDate(monday.getDate() + i);
        const isToday = day.toDateString() === today.toDateString();

        const dayEvents = allEvents
            .filter(e => new Date(e.startTime).toDateString() === day.toDateString())
            .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

        let dayContent = '';
        if (dayEvents.length === 0) {
            dayContent = '<div class="week-empty"><i class="bi bi-dash-lg" style="font-size:1rem;display:block;margin-bottom:4px;"></i>Sem agendamentos</div>';
        } else {
            dayContent = dayEvents.map(event => {
                const st = new Date(event.startTime);
                const et = new Date(event.endTime);
                const timeStr = st.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                const profColor = state.professionalColors.get(event.professionalId) || { main: '#adb5bd' };
                const isCompleted = event.status === 'completed';

                if (event.type === 'blockage') {
                    return `<div class="week-event-chip week-blockage">
                        <div class="we-time"><i class="bi bi-lock me-1"></i>${timeStr}</div>
                        <div class="we-client">${esc(event.reason)}</div>
                        <div class="we-service">${esc(event.professionalName)}</div>
                    </div>`;
                }

                const dataStr = JSON.stringify(event).replace(/'/g, '&apos;');
                return `<div class="week-event-chip ${isCompleted ? 'completed' : ''}" style="--ec: ${profColor.main};"
                    ${!isCompleted ? `data-action="edit-appointment" data-appointment="${dataStr}"` : ''}>
                    <div class="we-time">${timeStr}</div>
                    <div class="we-client">${esc(event.clientName)}</div>
                    <div class="we-service">${esc(event.serviceName)} · ${esc((event.professionalName || '').split(' ')[0])}</div>
                    <div class="we-actions">
                        <button class="we-btn" data-action="open-comanda" data-appointment="${dataStr}" title="Comanda" onclick="event.stopPropagation();">
                            <i class="bi bi-receipt"></i>
                        </button>
                    </div>
                </div>`;
            }).join('');
        }

        html += `<div class="week-day-col">
            <div class="week-day-header ${isToday ? 'is-today' : ''}">
                <div class="wd-name">${isToday ? 'Hoje' : weekDays[i]}</div>
                <div class="wd-num">${day.getDate()}</div>
            </div>
            <div class="week-day-events">${dayContent}</div>
        </div>`;
    }

    html += '</div>';
    container.innerHTML = html;

    // Scroll active day (today) to center on mobile
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

// --- LIST VIEW: clean, minimal ---
function renderListView(allEvents) {
    const container = document.getElementById('agenda-view');
    if (!container) return;

    allEvents.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    if (allEvents.length === 0) {
        container.innerHTML = `
            <div class="list-container" style="min-height:50vh;display:flex;align-items:center;justify-content:center;">
                <div class="text-center" style="max-width:220px;">
                    <div style="width:52px;height:52px;background:#f1f3f5;border-radius:14px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:12px;">
                        <i class="bi bi-calendar-check" style="font-size:1.3rem;color:#adb5bd;"></i>
                    </div>
                    <p style="font-size:0.85rem;font-weight:600;color:#495057;margin-bottom:4px;">Nenhum agendamento</p>
                    <p style="font-size:0.7rem;color:#868e96;">Toque em + para criar um novo.</p>
                </div>
            </div>`;
        return;
    }

    // Group by date
    const groups = {};
    allEvents.forEach(ev => {
        const dateKey = new Date(ev.startTime).toLocaleDateString('pt-BR', {
            weekday: 'long', day: 'numeric', month: 'long'
        });
        if (!groups[dateKey]) groups[dateKey] = [];
        groups[dateKey].push(ev);
    });

    let html = '<div class="list-container">';

    Object.entries(groups).forEach(([dateLabel, events]) => {
        html += `<div class="list-date-group">
            <div class="list-date-label">${dateLabel}</div>`;

        events.forEach(event => {
            const st = new Date(event.startTime);
            const et = new Date(event.endTime);
            const durMin = Math.round((et - st) / 60000);
            const timeStr = st.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            const profColor = state.professionalColors.get(event.professionalId) || { main: '#adb5bd', light: '#f1f3f5' };
            const isCompleted = event.status === 'completed';
            const clientInitials = event.clientName ? event.clientName.charAt(0).toUpperCase() : '?';
            const dataStr = JSON.stringify(event).replace(/'/g, '&apos;');
            const isChecked = localState.selectedItems.has(event.id);

            const checkboxHtml = localState.isSelectionMode
                ? `<input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-indigo-600" data-action="toggle-select-item" data-id="${event.id}" ${isChecked ? 'checked' : ''} onclick="event.stopPropagation()">`
                : '';

            if (event.type === 'blockage') {
                html += `<div class="list-card blockage">
                    ${checkboxHtml}
                    <div class="list-card-time"><div class="t-start" style="color:#c92a2a;">${timeStr}</div><div class="t-dur">Bloqueio</div></div>
                    <div class="list-card-dot" style="--dc:#e03131;"></div>
                    <div class="list-card-info">
                        <div class="lc-name" style="color:#c92a2a;">${esc(event.reason)}</div>
                        <div class="lc-detail">${esc(event.professionalName)}</div>
                    </div>
                </div>`;
                return;
            }

            const whatsappLink = createWhatsAppLink(event.clientPhone, event.clientName, event.serviceName, event.professionalName, event.startTime);

            html += `<div class="list-card ${isCompleted ? 'completed' : ''}"
                data-action="edit-appointment" data-appointment="${dataStr}">
                ${checkboxHtml}
                <div class="list-card-time">
                    <div class="t-start ${isCompleted ? 'opacity-50 line-through' : ''}">${timeStr}</div>
                    <div class="t-dur">${durMin} min</div>
                </div>
                <div class="list-card-dot" style="--dc: ${profColor.main};"></div>
                <div class="list-card-info">
                    <div class="lc-name">${esc(event.clientName)}</div>
                    <div class="lc-detail">${esc(event.serviceName)} · ${esc((event.professionalName || '').split(' ')[0])}</div>
                </div>
                <div class="list-card-status">
                    <div class="lc-status-dot ${isCompleted ? 'done' : ''}"></div>
                </div>
                ${!isCompleted && !localState.isSelectionMode ? `
                <div class="list-card-actions">
                    <button class="lc-action-btn wa" onclick="event.stopPropagation(); window.open('${whatsappLink}', '_blank')" title="WhatsApp">
                        <i class="bi bi-whatsapp" style="font-size:0.85rem;"></i>
                    </button>
                    <button class="lc-action-btn comanda" data-action="open-comanda" data-appointment="${dataStr}" title="Comanda" onclick="event.stopPropagation();">
                        <i class="bi bi-receipt" style="font-size:0.8rem;"></i>
                    </button>
                </div>` : ''}
            </div>`;
        });

        html += '</div>';
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
        container.innerHTML = `<div class="bg-gray-900 text-white p-3 rounded-xl shadow-xl flex items-center justify-between gap-4 w-full mx-4" style="background:#212529;color:#fff;padding:12px 16px;border-radius:12px;display:flex;align-items:center;gap:12px;">
            <span class="font-semibold text-sm"><span style="color:#7c3aed;">${localState.selectedItems.size}</span> itens</span>
            <button data-action="batch-delete" style="background:#e03131;color:#fff;border:none;padding:8px 16px;border-radius:8px;font-size:0.8rem;font-weight:600;cursor:pointer;">
                <i class="bi bi-trash"></i> Excluir
            </button>
        </div>`;
        container.style.display = 'block';
        if (fab) fab.style.display = 'none';
    } else {
        container.style.display = 'none';
        if (fab) fab.style.display = 'flex';
    }
}

function updateDateDisplay() {
    const display = document.getElementById('currentDateDisplay');
    if (!display) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const cd = new Date(localState.currentDate);
    cd.setHours(0, 0, 0, 0);
    const isTodayRange = isSameWeek(today, cd);

    if (localState.currentView === 'list') {
        if (cd.toDateString() === today.toDateString()) {
            display.textContent = 'Hoje';
        } else {
            display.textContent = cd.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' });
        }
    } else {
        const monday = getMonday(cd);
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        const mStr = monday.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
        const sStr = sunday.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' });
        display.textContent = `${mStr} — ${sStr}`;
    }
}

function isSameWeek(d1, d2) {
    const m1 = getMonday(d1);
    const m2 = getMonday(d2);
    return m1.toDateString() === m2.toDateString();
}

// ============================================================================
// BUSCA DE DADOS
// ============================================================================

async function fetchAndDisplayAgenda() {
    const agendaView = document.getElementById('agenda-view');
    if (!agendaView) return;

    localState.selectedItems.clear();
    updateBatchDeleteUI();
    agendaView.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;padding:60px 0;"><div style="width:28px;height:28px;border:2.5px solid #e9ecef;border-top:2.5px solid #4f46e5;border-radius:50%;animation:spin 0.7s linear infinite;"></div></div><style>@keyframes spin{to{transform:rotate(360deg)}}</style>';

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
        const [appts, blockages] = await Promise.all([
            appointmentsApi.getAppointmentsByDateRange(state.establishmentId, start.toISOString(), end.toISOString(), localState.selectedProfessionalId === 'all' ? null : localState.selectedProfessionalId),
            blockagesApi.getBlockagesByDateRange(state.establishmentId, start.toISOString(), end.toISOString(), localState.selectedProfessionalId)
        ]);

        if (!document.getElementById('agenda-view')) return;

        const enrich = items => items.map(a => ({
            ...a,
            type: a.type || 'appointment',
            professionalName: a.professionalName || (() => {
                const p = state.professionals?.find(pp => pp.id === a.professionalId);
                return p ? p.name : 'Indefinido';
            })()
        }));

        state.allEvents = [...enrich(appts || []), ...enrich(blockages || [])];
        renderProfessionalSelector();
        renderAgenda();
    } catch (error) {
        if (document.getElementById('agenda-view')) {
            document.getElementById('agenda-view').innerHTML = `
                <div class="text-center py-12" style="color:#868e96;">
                    <i class="bi bi-exclamation-triangle" style="font-size:1.5rem;"></i>
                    <p class="mt-2" style="font-size:0.8rem;">Erro ao carregar agenda.</p>
                </div>`;
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
        showNotification('Atenção', 'Não foi possível carregar os dados da equipa.', 'error');
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
        <div class="flex flex-col h-[calc(100vh-80px)] md:h-auto bg-gray-50 relative font-sans w-full" style="background:#f8f9fa;">

            <!-- TOOLBAR -->
            <div class="agenda-toolbar">
                <div class="agenda-date-row">
                    <div class="flex items-center gap-2" style="flex:1;min-width:0;">
                        <button id="btnPrevDate" class="agenda-nav-btn" style="flex-shrink:0;">
                            <i class="bi bi-chevron-left"></i>
                        </button>
                        <div class="agenda-date-text" style="flex:1;min-width:0;cursor:pointer;" id="dateDisplayWrap">
                            <div id="currentDateDisplay" class="agenda-date-main">Carregando...</div>
                        </div>
                        <button id="btnNextDate" class="agenda-nav-btn" style="flex-shrink:0;">
                            <i class="bi bi-chevron-right"></i>
                        </button>
                    </div>
                    <div class="agenda-top-actions" style="flex-shrink:0;">
                        <button id="btnToday" class="agenda-today-btn">Hoje</button>
                        <div id="agendaFab" class="agenda-fab" data-action="new-appointment" style="display:none;" onclick="event.stopPropagation();">
                            <i class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SUB-BAR: View toggle + Filter -->
            <div class="agenda-subbar">
                <div class="agenda-view-toggle">
                    <button class="${localState.currentView === 'list' ? 'active' : ''}" data-action="setView" data-view="list">Lista</button>
                    <button class="${localState.currentView === 'week' ? 'active' : ''}" data-action="setView" data-view="week">Semana</button>
                </div>
                <button class="agenda-filter-btn" id="btnWeekDays">
                    <i class="bi bi-sliders2" style="font-size:0.8rem;"></i> Opções
                </button>
            </div>

            <!-- PROFESSIONAL PILLS -->
            <div id="profSelectorContainer" class="agenda-prof-bar">
                <div style="width:24px;height:24px;border:2px solid #e9ecef;border-top:2px solid #4f46e5;border-radius:50%;animation:spin 0.7s linear infinite;margin:8px auto;"></div>
            </div>

            <!-- CONTENT AREA -->
            <div id="agenda-view" style="flex:1;overflow-y:auto;"></div>

            <div id="batch-delete-container" style="position:fixed;bottom:80px;left:0;right:0;z-index:50;display:none;"></div>
        </div>`;

    // Show FAB only if not in selection mode
    document.getElementById('agendaFab').style.display = 'flex';

    // --- Navigation ---
    document.getElementById('btnPrevDate').addEventListener('click', () => {
        if (localState.currentView === 'list') {
            localState.currentDate.setDate(localState.currentDate.getDate() - 1);
        } else {
            localState.currentDate.setDate(localState.currentDate.getDate() - 7);
        }
        fetchAndDisplayAgenda();
    });

    document.getElementById('btnNextDate').addEventListener('click', () => {
        if (localState.currentView === 'list') {
            localState.currentDate.setDate(localState.currentDate.getDate() + 1);
        } else {
            localState.currentDate.setDate(localState.currentDate.getDate() + 7);
        }
        fetchAndDisplayAgenda();
    });

    document.getElementById('btnToday').addEventListener('click', () => {
        localState.currentDate = new Date();
        fetchAndDisplayAgenda();
    });

    // --- FAB ---
    document.getElementById('agendaFab').addEventListener('click', () => {
        openAppointmentModal();
    });

    // --- View toggle ---
    const viewBtns = document.querySelectorAll('.agenda-view-toggle button');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            localState.currentView = btn.dataset.view;
            fetchAndDisplayAgenda();
        });
    });

    // --- Options menu (week days, selection mode, inactive) ---
    const btnWeekDays = document.getElementById('btnWeekDays');
    if (btnWeekDays) {
        btnWeekDays.addEventListener('click', () => {
            showOptionsMenu();
        });
    }

    // --- Event delegation ---
    if (!hasContentDelegationInitialized) {
        contentDiv.addEventListener('click', async (e) => {

            // === Priority 1: Action buttons (Comanda, WhatsApp) inside cards/chips ===
            const actionBarBtn = e.target.closest('.we-btn[data-action="open-comanda"], .lc-action-btn[data-action="open-comanda"]');
            if (actionBarBtn) {
                e.stopPropagation();
                const card = actionBarBtn.closest('.list-card') || actionBarBtn.closest('.week-event-chip');
                const apptData = card && card.dataset.appointment ? JSON.parse(card.dataset.appointment.replace(/&apos;/g, "'")) : null;
                if (!apptData) return;
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
                return;
            }

            // === Priority 2: Checkbox toggle ===
            if (e.target.dataset?.action === 'toggle-select-item') {
                if (e.target.checked) localState.selectedItems.add(e.target.dataset.id);
                else localState.selectedItems.delete(e.target.dataset.id);
                updateBatchDeleteUI();
                return;
            }

            // === Priority 3: Batch delete ===
            if (e.target.closest('[data-action="batch-delete"]')) {
                const count = localState.selectedItems.size;
                const confirmed = await showConfirmation('Excluir em Lote', `Excluir ${count} agendamento(s)?`);
                if (confirmed) {
                    await Promise.all(Array.from(localState.selectedItems).map(async (id) => {
                        try { await appointmentsApi.deleteAppointment(id); } catch (err) {}
                    }));
                    showNotification(`${count} excluído(s).`, 'success');
                    localState.selectedItems.clear();
                    localState.isSelectionMode = false;
                    fetchAndDisplayAgenda();
                }
                return;
            }

            // === Priority 4: Professional pill ===
            const profPill = e.target.closest('[data-action="select-professional"]');
            if (profPill) {
                const profId = profPill.dataset.profId;
                localState.selectedProfessionalId = (localState.selectedProfessionalId === profId && profId !== 'all') ? 'all' : profId;
                fetchAndDisplayAgenda();
                return;
            }

            // === Priority 5: Week view chip click → edit appointment ===
            const weekChip = e.target.closest('.week-event-chip[data-appointment]');
            if (weekChip) {
                const apptData = JSON.parse(weekChip.dataset.appointment.replace(/&apos;/g, "'"));
                if (apptData.status === 'completed') {
                    showNotification('Agendamentos finalizados não podem ser editados.', 'warning');
                    return;
                }
                openAppointmentModal(apptData);
                return;
            }

            // === Priority 6: List card click → edit appointment ===
            const listCard = e.target.closest('.list-card[data-appointment]');
            if (listCard) {
                if (localState.isSelectionMode) return;
                const apptData = JSON.parse(listCard.dataset.appointment.replace(/&apos;/g, "'"));
                if (apptData.status === 'completed') {
                    showNotification('Agendamentos finalizados não podem ser editados.', 'warning');
                    return;
                }
                openAppointmentModal(apptData);
                return;
            }

            // === Priority 7: Generic data-action catch-all ===
            const targetEl = e.target.closest('[data-action]');
            if (!targetEl) return;

            const action = targetEl.dataset.action;
            switch (action) {
                case 'new-appointment':
                    openAppointmentModal();
                    break;
                case 'delete-appointment': {
                    e.stopPropagation();
                    const id = targetEl.dataset.id;
                    const confirmed = await showConfirmation('Confirmar', 'Apagar este agendamento?');
                    if (confirmed) {
                        await appointmentsApi.deleteAppointment(id);
                        showNotification('Agendamento apagado.', 'success');
                        fetchAndDisplayAgenda();
                    }
                    break;
                }
                case 'open-comanda': {
                    e.stopPropagation();
                    let apptData = null;
                    const card = e.target.closest('[data-appointment]');
                    if (card) apptData = JSON.parse(card.dataset.appointment.replace(/&apos;/g, "'"));
                    if (localState.isSelectionMode || !apptData) return;
                    const initialFilter = apptData.status === 'completed' ? 'finalizadas' : 'em-atendimento';
                    const navParams = { selectedAppointmentId: apptData.id, initialFilter };
                    if (initialFilter === 'finalizadas' && apptData.transaction?.paidAt) {
                        navParams.filterDate = typeof apptData.transaction.paidAt === 'object'
                            ? new Date(apptData.transaction.paidAt._seconds * 1000)
                            : apptData.transaction.paidAt;
                    }
                    navigateTo('comandas-section', navParams);
                    break;
                }
            }
        });
        hasContentDelegationInitialized = true;
    }

    await populateFilters();
    await fetchAndDisplayAgenda();
}

// --- Options menu as bottom sheet ---
function showOptionsMenu() {
    const existing = document.getElementById('optionsSheet');
    if (existing) { existing.remove(); return; }

    const sheet = document.createElement('div');
    sheet.id = 'optionsSheet';
    sheet.style.cssText = 'position:fixed;bottom:0;left:50%;right:auto;transform:translateX(-50%) translateY(100%);width:100%;max-width:440px;background:#fff;border-radius:16px 16px 0 0;z-index:10000;box-shadow:0 -8px 30px rgba(0,0,0,0.12);transition:transform 0.3s ease;max-height:60vh;overflow-y:auto;';
    sheet.innerHTML = `
        <div style="padding:16px 20px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                <span style="font-size:0.9rem;font-weight:700;color:#212529;">Opções</span>
                <button id="closeOptSheet" style="width:30px;height:30px;border:none;background:#f1f3f5;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;">
                    <i class="bi bi-x-lg" style="font-size:0.7rem;color:#495057;"></i>
                </button>
            </div>

            <div style="margin-bottom:16px;">
                <div style="font-size:0.65rem;font-weight:600;color:#adb5bd;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">Modo seleção</div>
                <button id="optSelectMode" style="width:100%;padding:10px 16px;border:1.5px solid #e9ecef;background:#fff;border-radius:10px;font-size:0.8rem;font-weight:500;color:#495057;cursor:pointer;display:flex;align-items:center;gap:8px;">
                    <i class="bi bi-check2-square"></i> ${localState.isSelectionMode ? 'Sair do modo seleção' : 'Ativar modo seleção'}
                </button>
            </div>

            <div style="margin-bottom:16px;">
                <div style="font-size:0.65rem;font-weight:600;color:#adb5bd;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">Equipa</div>
                <label style="display:flex;align-items:center;gap:8px;font-size:0.8rem;color:#495057;cursor:pointer;padding:4px 0;">
                    <input type="checkbox" id="optInactiveToggle" style="width:16px;height:16px;accent-color:#4f46e5;" ${localState.showInactiveProfs ? 'checked' : ''}>
                    Exibir equipa inativa
                </label>
            </div>
        </div>`;

    const overlay = document.createElement('div');
    overlay.id = 'optionsOverlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.25);z-index:9999;opacity:0;transition:opacity 0.3s;';

    document.body.appendChild(overlay);
    document.body.appendChild(sheet);

    requestAnimationFrame(() => {
        sheet.style.transform = 'translateX(-50%) translateY(0)';
        overlay.style.opacity = '1';
    });

    const closeSheet = () => {
        sheet.style.transform = 'translateX(-50%) translateY(100%)';
        overlay.style.opacity = '0';
        setTimeout(() => {
            sheet.remove();
            overlay.remove();
        }, 300);
    };

    document.getElementById('closeOptSheet').addEventListener('click', closeSheet);
    overlay.addEventListener('click', closeSheet);

    // Selection mode
    document.getElementById('optSelectMode').addEventListener('click', () => {
        localState.isSelectionMode = !localState.isSelectionMode;
        if (!localState.isSelectionMode) localState.selectedItems.clear();
        closeSheet();
        renderAgenda();
    });

    // Inactive profs
    document.getElementById('optInactiveToggle').addEventListener('change', (e) => {
        localState.showInactiveProfs = e.target.checked;
        renderProfessionalSelector();
    });
}

// ============================================================================
// MODAIS DE CADASTRO / EDIÇÃO
// ============================================================================

function navigateModalStep(step) {
    if (step < 1 || step > 4) return;
    newAppointmentState.step = step;
    openAppointmentModal(null, true);
}

function renderStep1_Client(appointment) {
    return {
        title: appointment ? 'Editar Reserva' : 'Identificar Cliente',
        content: `
        <div class="p-5 space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-gray-500 mb-1.5">Nome *</label>
                    <input type="text" id="apptClientName" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm" value="${esc(newAppointmentState.data.clientName)}">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-gray-500 mb-1.5">Telefone/WhatsApp *</label>
                    <input type="tel" id="apptClientPhone" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm" value="${esc(newAppointmentState.data.clientPhone)}">
                </div>
            </div>
            <div class="border-t border-gray-100 pt-5">
                <label class="block text-xs font-semibold text-gray-500 mb-2">Buscar cliente:</label>
                <div class="relative">
                    <i class="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input type="text" id="clientSearchInput" placeholder="Digite o nome..." class="w-full p-3 pl-10 border border-gray-300 rounded-lg text-sm">
                </div>
                <div id="clientSearchResults" class="mt-3 space-y-2 max-h-36 overflow-y-auto"></div>
            </div>
        </div>
        <div class="px-5 py-4 border-t border-gray-100 flex justify-end gap-3">
            <button type="button" data-action="close-modal" data-target="appointmentModal" class="py-2.5 px-5 bg-white border border-gray-300 text-gray-700 font-semibold text-sm rounded-lg">Cancelar</button>
            <button type="button" data-action="next-step" data-current-step="1" class="py-2.5 px-5 bg-gray-900 text-white font-semibold text-sm rounded-lg">Avançar</button>
        </div>`
    };
}

function renderStep2_Service() {
    return {
        title: 'Serviços',
        content: `
        <div class="p-5 space-y-5">
            <div class="flex items-center gap-3">
                <div class="relative flex-1">
                    <i class="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input type="search" id="serviceSearchModalInput" placeholder="Buscar serviço..." class="w-full p-3 pl-10 border border-gray-300 rounded-lg text-sm">
                </div>
                <label class="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                    <input type="checkbox" id="multiServiceToggle" class="w-4 h-4 rounded" ${newAppointmentState.data.selectedServiceIds.length > 1 ? 'checked' : ''}>
                    <span class="text-xs font-semibold text-gray-600">Múltiplos</span>
                </label>
            </div>
            <div id="apptServicesContainer" class="grid grid-cols-2 gap-3 max-h-56 overflow-y-auto">
                ${availableServicesForModal.map(srv => {
                    const sel = newAppointmentState.data.selectedServiceIds.includes(srv.id);
                    return `<div class="service-card p-3 bg-white rounded-xl border ${sel ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'} cursor-pointer" data-service-id="${srv.id}">
                        <p class="font-semibold text-sm text-gray-800 truncate">${esc(srv.name)}</p>
                        <p class="text-xs text-gray-500 mt-0.5">R$ ${srv.price.toFixed(2)} · ${srv.duration} min</p>
                    </div>`;
                }).join('')}
            </div>
        </div>
        <div class="px-5 py-4 border-t border-gray-100 flex justify-between gap-3">
            <button type="button" data-action="prev-step" data-current-step="2" class="py-2.5 px-5 bg-white border border-gray-300 text-gray-700 font-semibold text-sm rounded-lg">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="2" class="py-2.5 px-5 bg-gray-900 text-white font-semibold text-sm rounded-lg">Avançar</button>
        </div>`
    };
}

function renderStep3_Professional() {
    return {
        title: 'Profissional',
        content: `
        <div class="p-5 space-y-5">
            <div class="relative">
                <i class="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input type="search" id="professionalSearchModalInput" placeholder="Buscar na equipa..." class="w-full p-3 pl-10 border border-gray-300 rounded-lg text-sm">
            </div>
            <div id="apptProfessionalContainer" class="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-52 overflow-y-auto professional-step-cards">
                ${availableProfessionalsForModal.map(prof => {
                    const sel = newAppointmentState.data.professionalId === prof.id;
                    return `<div class="professional-modal-card p-3 bg-white rounded-xl border ${sel ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'} cursor-pointer text-center" data-professional-id="${prof.id}">
                        <div class="w-10 h-10 rounded-full bg-gray-100 mx-auto flex items-center justify-center font-bold text-sm text-gray-500">${esc(prof.name).charAt(0)}</div>
                        <p class="text-sm font-semibold mt-2 truncate">${esc(prof.name.split(' ')[0])}</p>
                    </div>`;
                }).join('')}
            </div>
        </div>
        <div class="px-5 py-4 border-t border-gray-100 flex justify-between gap-3">
            <button type="button" data-action="prev-step" data-current-step="3" class="py-2.5 px-5 bg-white border border-gray-300 text-gray-700 font-semibold text-sm rounded-lg">Voltar</button>
            <button type="button" data-action="next-step" data-current-step="3" class="py-2.5 px-5 bg-gray-900 text-white font-semibold text-sm rounded-lg">Avançar</button>
        </div>`
    };
}

function renderStep4_Schedule() {
    const initDate = newAppointmentState.data.date || new Date().toISOString().split('T')[0];
    return {
        title: 'Data e Horário',
        content: `
        <div class="p-5 space-y-5">
            <div class="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl">
                <div class="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold flex-shrink-0">${esc(newAppointmentState.data.clientName).charAt(0)}</div>
                <div class="min-w-0">
                    <p class="font-semibold text-sm text-gray-900 truncate">${esc(newAppointmentState.data.clientName)}</p>
                    <p class="text-xs text-gray-500 truncate">${esc(newAppointmentState.data.professionalName)}</p>
                </div>
            </div>
            <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1.5">Data</label>
                <input type="date" id="apptDate" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold" value="${initDate}">
            </div>
            <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1.5">Duração total: <span id="apptTotalDuration" class="text-indigo-600">--</span></label>
            </div>
            <div>
                <label class="block text-xs font-semibold text-gray-500 mb-3">Horários disponíveis</label>
                <div id="availableTimesContainer" class="grid grid-cols-4 gap-2 max-h-36 overflow-y-auto"></div>
            </div>
            <div id="loyaltyRewardsContainer"></div>
        </div>
        <div class="px-5 py-4 border-t border-gray-100 flex justify-between gap-3">
            <button type="button" data-action="prev-step" data-current-step="4" class="py-2.5 px-5 bg-white border border-gray-300 text-gray-700 font-semibold text-sm rounded-lg">Voltar</button>
            <button type="submit" class="py-2.5 px-8 bg-indigo-600 text-white font-semibold text-sm rounded-lg flex items-center gap-2"><i class="bi bi-calendar-check"></i> ${newAppointmentState.data.id ? 'Salvar' : 'Agendar'}</button>
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
                date: appointment?.startTime ? new Date(appointment.startTime).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                time: appointment?.startTime ? new Date(appointment.startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false }) : null,
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

    modal.innerHTML = `
        <div class="modal-content max-w-xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden m-4 flex flex-col" style="max-height:90vh;">
            <header class="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
                <div class="flex items-center gap-3">
                    <span class="w-7 h-7 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">${newAppointmentState.step}/4</span>
                    <h2 class="text-lg font-bold text-gray-900">${renderResult.title}</h2>
                </div>
                <button type="button" data-action="close-modal" data-target="appointmentModal" class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100">
                    <i class="bi bi-x-lg"></i>
                </button>
            </header>
            <form id="appointmentForm" class="flex-1 overflow-y-auto">${renderResult.content}</form>
        </div>`;

    modal.querySelectorAll('[data-action="next-step"]').forEach(btn => btn.addEventListener('click', () => {
        const cs = parseInt(btn.dataset.currentStep, 10);
        if (cs === 1) {
            newAppointmentState.data.clientName = modal.querySelector('#apptClientName').value.trim();
            newAppointmentState.data.clientPhone = modal.querySelector('#apptClientPhone').value.trim();
            if (!newAppointmentState.data.clientName) return showNotification('Preencha o nome do cliente.', 'warning');
        }
        if (cs === 2 && newAppointmentState.data.selectedServiceIds.length === 0) return showNotification('Selecione um serviço.', 'warning');
        if (cs === 3 && !newAppointmentState.data.professionalId) return showNotification('Escolha um profissional.', 'warning');
        navigateModalStep(cs + 1);
    }));
    modal.querySelectorAll('[data-action="prev-step"]').forEach(btn => btn.addEventListener('click', () => navigateModalStep(parseInt(btn.dataset.currentStep, 10) - 1)));
    modal.querySelector('[data-action="close-modal"]')?.addEventListener('click', () => { modal.style.display = 'none'; });

    if (newAppointmentState.step === 4) modal.querySelector('#appointmentForm').addEventListener('submit', handleAppointmentFormSubmit);
    modal.style.display = 'flex';

    if (newAppointmentState.step === 2) {
        modal.querySelectorAll('.service-card').forEach(card => card.addEventListener('click', () => {
            const isMulti = modal.querySelector('#multiServiceToggle')?.checked;
            const sel = card.classList.contains('selected');
            if (!isMulti) {
                modal.querySelectorAll('.service-card.selected').forEach(c => c.classList.remove('selected', 'border-indigo-500', 'bg-indigo-50'));
                newAppointmentState.data.selectedServiceIds = [];
            }
            const sid = card.dataset.serviceId;
            if (sel) {
                card.classList.remove('selected', 'border-indigo-500', 'bg-indigo-50');
                newAppointmentState.data.selectedServiceIds = newAppointmentState.data.selectedServiceIds.filter(i => i !== sid);
            } else {
                card.classList.add('selected', 'border-indigo-500', 'bg-indigo-50');
                newAppointmentState.data.selectedServiceIds.push(sid);
            }
        }));
    }

    if (newAppointmentState.step === 3) {
        modal.querySelectorAll('.professional-modal-card').forEach(card => card.addEventListener('click', () => {
            modal.querySelectorAll('.professional-modal-card.selected').forEach(c => c.classList.remove('selected', 'border-indigo-500', 'bg-indigo-50'));
            card.classList.add('selected', 'border-indigo-500', 'bg-indigo-50');
            newAppointmentState.data.professionalId = card.dataset.professionalId;
            const prof = availableProfessionalsForModal.find(p => p.id === card.dataset.professionalId);
            newAppointmentState.data.professionalName = prof ? prof.name : '';
        }));
    }

    if (newAppointmentState.step === 1) {
        modal.querySelector('#clientSearchInput')?.addEventListener('input', (e) => handleClientSearch(e.target.value));
    }

    if (newAppointmentState.step === 4) {
        modal.querySelector('#apptDate')?.addEventListener('change', updateTimesAndDuration);
        updateTimesAndDuration();
        renderLoyaltyRewards();
    }
}

async function handleAppointmentFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');

    if (!newAppointmentState.data.time || !newAppointmentState.data.selectedServiceIds.length || !newAppointmentState.data.professionalId) {
        return showNotification('Selecione horário, serviço e profissional.', 'warning');
    }

    btn.disabled = true;
    btn.innerHTML = 'Aguarde...';

    const servicesData = newAppointmentState.data.selectedServiceIds.map(id => {
        const s = availableServicesForModal.find(x => x.id === id);
        return { id: s.id, name: s.name, price: s.price, duration: s.duration, bufferTime: s.bufferTime || 0, photo: s.photo || null };
    });

    const [h, m] = newAppointmentState.data.time.split(':');
    const startTime = new Date(`${newAppointmentState.data.date}T${h}:${m}:00`);

    const data = {
        establishmentId: state.establishmentId,
        clientName: newAppointmentState.data.clientName,
        clientPhone: newAppointmentState.data.clientPhone,
        services: servicesData,
        professionalId: newAppointmentState.data.professionalId,
        professionalName: newAppointmentState.data.professionalName,
        startTime: startTime.toISOString(),
        redeemedReward: newAppointmentState.data.redeemedReward
    };

    if (newAppointmentState.data.id) data.id = newAppointmentState.data.id;

    try {
        if (newAppointmentState.data.id) await appointmentsApi.updateAppointment(newAppointmentState.data.id, data);
        else await appointmentsApi.createAppointment(data);

        showNotification('Agendamento registrado!', 'success');
        document.getElementById('appointmentModal').style.display = 'none';
        fetchAndDisplayAgenda();
    } catch (error) {
        showNotification(error.message, 'error');
        btn.disabled = false;
        btn.textContent = 'Agendar';
    }
}

async function updateTimesAndDuration() {
    const container = document.getElementById('availableTimesContainer');
    const durationEl = document.getElementById('apptTotalDuration');
    if (!container) return;

    const totalDur = newAppointmentState.data.selectedServiceIds.reduce((acc, id) => {
        const s = availableServicesForModal.find(x => x.id === id);
        return acc + (s ? (s.duration + (s.bufferTime || 0)) : 0);
    }, 0);

    if (durationEl) durationEl.textContent = `${totalDur} min`;

    const { professionalId, selectedServiceIds, date } = newAppointmentState.data;
    if (!professionalId || !selectedServiceIds.length || !date) {
        container.innerHTML = '<p class="col-span-full text-center text-xs text-gray-400">Selecione serviço e profissional</p>';
        return;
    }

    try {
        let slots = await appointmentsApi.getAvailability({
            establishmentId: state.establishmentId,
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

        container.innerHTML = slots.length > 0 ? slots.map(slot => {
            const sel = newAppointmentState.data.time === slot;
            return `<button type="button" class="p-2 text-sm font-semibold rounded-lg border ${sel ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-indigo-50'}" onclick="document.querySelectorAll('#availableTimesContainer button').forEach(b=>{b.classList.remove('bg-indigo-600','text-white','border-indigo-600');b.classList.add('bg-gray-50','text-gray-700','border-gray-200')});this.classList.add('bg-indigo-600','text-white','border-indigo-600');this.classList.remove('bg-gray-50','text-gray-700','border-gray-200');window._selectedTime='${slot}';">${slot}</button>`;
        }).join('') : '<p class="col-span-full text-center text-xs text-gray-400">Sem horários</p>';
    } catch (err) {
        container.innerHTML = '<p class="col-span-full text-center text-xs text-red-400">Erro</p>';
    }
}

function renderLoyaltyRewards() {
    const container = document.getElementById('loyaltyRewardsContainer');
    if (!container) return;

    const { clientHasRewards, clientLoyaltyPoints } = newAppointmentState.data;
    const { enabled, rewards } = loyaltySettingsForModal;
    if (!enabled || !clientHasRewards || !rewards?.length) { container.innerHTML = ''; return; }

    const avail = rewards.filter(r => clientLoyaltyPoints >= r.points);
    if (!avail.length) { container.innerHTML = '<p class="text-xs text-gray-400">Sem recompensas disponíveis.</p>'; return; }

    container.innerHTML = `<div class="border-t border-gray-100 pt-4">
        <p class="text-xs font-semibold text-gray-500 mb-2">Resgate fidelidade (${clientLoyaltyPoints} pts)</p>
        ${avail.map(r => `<label class="flex items-center gap-3 p-2 bg-gray-50 rounded-lg mb-1 cursor-pointer"><input type="radio" name="loyaltyReward" value="${esc(r.reward)}" data-points="${r.points}" class="accent-indigo-600"><span class="text-sm">${esc(r.reward)} (-${r.points} pts)</span></label>`).join('')}
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
        if (container) container.innerHTML = '<p class="text-xs text-gray-400">Digite pelo menos 3 caracteres...</p>';
        return;
    }

    container.innerHTML = '<div class="text-center py-3"><div class="w-5 h-5 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div></div>';

    try {
        const found = await clientsApi.getClients(state.establishmentId, term.trim());
        allClientsData = found;
        if (!found.length) {
            container.innerHTML = '<p class="text-xs text-gray-400">Nenhum cliente encontrado.</p>';
            return;
        }
        container.innerHTML = found.map(c => {
            const sel = newAppointmentState.data.clientName === c.name && newAppointmentState.data.clientPhone === c.phone;
            return `<div class="client-card p-2.5 bg-white rounded-lg border ${sel ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'} cursor-pointer flex items-center gap-2" data-client-name="${esc(c.name)}" data-client-phone="${esc(c.phone)}" data-loyalty-points="${c.loyaltyPoints || 0}">
                <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">${esc(c.name).charAt(0)}</div>
                <div><p class="text-sm font-semibold text-gray-800">${esc(c.name)}</p><p class="text-xs text-gray-500">${esc(c.phone)}</p></div>
            </div>`;
        }).join('');

        container.querySelectorAll('.client-card').forEach(card => card.addEventListener('click', () => {
            newAppointmentState.data.clientName = card.dataset.clientName;
            newAppointmentState.data.clientPhone = card.dataset.clientPhone;
            newAppointmentState.data.clientLoyaltyPoints = parseInt(card.dataset.loyaltyPoints || '0', 10);
            const minPts = Math.min(...(loyaltySettingsForModal?.rewards || []).map(r => r.points));
            newAppointmentState.data.clientHasRewards = loyaltySettingsForModal.enabled && minPts !== Infinity && newAppointmentState.data.clientLoyaltyPoints >= minPts;
            document.getElementById('apptClientName').value = card.dataset.clientName;
            document.getElementById('apptClientPhone').value = card.dataset.clientPhone;
            container.querySelectorAll('.client-card').forEach(c => c.classList.remove('border-indigo-500', 'bg-indigo-50'));
            card.classList.add('border-indigo-500', 'bg-indigo-50');
        }));
    } catch (err) {
        container.innerHTML = '<p class="text-xs text-red-400">Erro ao buscar.</p>';
    }
}
