// js/ui/clients.js

// --- 1. IMPORTAÇÕES ---
import * as clientsApi from '../api/clients.js';
import * as appointmentsApi from '../api/appointments.js';
import { authenticatedFetch } from '../api/apiService.js'; 
import { showNotification, showConfirmation, showGenericModal } from '../components/modal.js';
import { navigateTo } from '../main.js';
import { escapeHTML, formatDate, formatCurrency } from '../utils.js'; 
import { state } from '../state.js';

// --- 2. ESTADO LOCAL ---
let localState = {
    clients: [],
    selectedClient: null,
    activeTab: 'profile', // 'profile', 'appointments', 'history', 'loyalty'
    
    // Filtros
    filters: {
        search: '',
        inactiveDays: '',
        hasLoyalty: false,
        hasDebt: false,
    },
    isFiltersExpanded: false, // Novo estado para controlar expansão mobile

    loading: false,
    
    // Paginação e Histórico
    historyLimit: 20, 
    historySearchTerm: '', 
    historyLoading: false,
    historyData: {
        appointments: [],
        sales: [],
        loyaltyLog: []
    }
};

let contentDiv = null;

// --- 3. FUNÇÕES PRINCIPAIS DE RENDERIZAÇÃO ---

// Layout Base (Responsivo - Ajustado para altura total e scroll correto)
function renderLayout() {
    contentDiv.innerHTML = `
        <section class="h-[calc(100vh-4rem)] sm:h-full flex flex-col bg-gray-50">
            <div class="bg-white border-b shadow-sm z-30 flex-shrink-0">
                <div class="p-4 flex flex-col sm:flex-row justify-between items-center gap-3 max-w-7xl mx-auto w-full">
                    <div class="w-full sm:w-auto text-center sm:text-left">
                        <h2 class="text-xl sm:text-2xl font-bold text-gray-800">Clientes</h2>
                        <p class="text-xs text-gray-500 hidden sm:block">Gerencie perfis e fidelidade</p>
                    </div>
                    
                    <div class="w-full sm:w-auto flex gap-2">
                        ${!localState.selectedClient ? `
                        <button id="btn-new-client" class="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-700 transition shadow flex items-center justify-center gap-2 text-sm font-bold active:scale-95 transform duration-150">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                            Novo
                        </button>` : `
                        <button id="btn-back-list" class="w-full sm:w-auto bg-white text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-100 transition border border-gray-300 flex items-center justify-center gap-2 text-sm font-bold active:scale-95 transform duration-150 shadow-sm">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                            Voltar
                        </button>
                        `}
                    </div>
                </div>
            </div>

            <div id="clients-content-area" class="flex-grow overflow-y-auto custom-scrollbar w-full max-w-7xl mx-auto">
                ${localState.loading ? '<div class="flex justify-center pt-20"><div class="loader"></div></div>' : ''}
            </div>
        </section>
    `;

    const btnNew = document.getElementById('btn-new-client');
    const btnBack = document.getElementById('btn-back-list');

    if (btnNew) btnNew.onclick = openNewClientModal;
    if (btnBack) btnBack.onclick = () => {
        localState.selectedClient = null;
        renderClientList();
    };
}

// Renderiza a Lista de Clientes com Filtros Responsivos
function renderClientList() {
    renderLayout(); 
    
    const container = document.getElementById('clients-content-area');
    
    // --- ÁREA DE FILTROS (Mobile Friendly) ---
    // No mobile, mostra apenas a busca. O resto fica escondido num toggle.
    const filtersHTML = `
        <div class="p-4 sticky top-0 bg-gray-50 z-20 pb-2">
            <div class="bg-white p-3 sm:p-4 rounded-xl border border-gray-200 shadow-sm">
                
                <div class="flex gap-2">
                    <div class="relative flex-grow">
                        <input type="text" id="client-search" 
                            class="w-full py-2.5 pl-10 pr-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm outline-none transition" 
                            placeholder="Buscar nome ou telefone..." 
                            value="${localState.filters.search}">
                        <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    
                    <button id="btn-toggle-filters" class="sm:hidden px-3 border border-gray-300 rounded-lg text-gray-600 bg-gray-50 hover:bg-gray-100 transition">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                    </button>
                    
                    <button id="btn-apply-filters-desktop" class="hidden sm:block bg-gray-800 text-white px-4 rounded-lg text-sm font-bold hover:bg-gray-900 transition shadow-md">
                        Filtrar
                    </button>
                </div>

                <div id="advanced-filters" class="${localState.isFiltersExpanded ? '' : 'hidden'} sm:grid sm:grid-cols-3 gap-3 mt-3 pt-3 border-t border-gray-100 animate-fade-in">
                    
                    <div class="mb-2 sm:mb-0">
                        <label class="block text-xs font-bold text-gray-500 mb-1">Dias sem visita</label>
                        <input type="number" id="filter-inactive" 
                            class="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm outline-none" 
                            placeholder="Ex: 30" 
                            value="${localState.filters.inactiveDays}">
                    </div>

                    <div class="flex flex-col justify-center gap-2 mb-3 sm:mb-0">
                        <label class="flex items-center cursor-pointer p-1">
                            <input type="checkbox" id="filter-loyalty" class="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4" ${localState.filters.hasLoyalty ? 'checked' : ''}>
                            <span class="ml-2 text-sm text-gray-700">Com Pontos</span>
                        </label>
                        <label class="flex items-center cursor-pointer p-1">
                            <input type="checkbox" id="filter-debt" class="rounded text-red-600 focus:ring-red-500 w-4 h-4" ${localState.filters.hasDebt ? 'checked' : ''}>
                            <span class="ml-2 text-sm font-semibold text-red-600">Com Débitos (Fiado)</span>
                        </label>
                    </div>

                    <div class="sm:hidden">
                        <button id="btn-apply-filters-mobile" class="w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-bold shadow-md">
                            Aplicar Filtros
                        </button>
                    </div>
                </div>

            </div>
        </div>
    `;

    const listHTML = localState.clients.length > 0 ? `
        <div class="px-4 pb-20">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                ${localState.clients.map(client => {
                    const hasDebt = client.totalDebt && parseFloat(client.totalDebt) > 0;
                    
                    return `
                    <div class="client-card bg-white p-4 rounded-xl border ${hasDebt ? 'border-l-4 border-l-red-500 border-y-red-100 border-r-red-100' : 'border-gray-200 border-l-4 border-l-indigo-500'} shadow-sm hover:shadow-md transition cursor-pointer active:bg-gray-50 flex items-center gap-3" data-id="${client.id}">
                        
                        <div class="w-12 h-12 rounded-full ${hasDebt ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-600'} flex items-center justify-center font-bold text-lg flex-shrink-0">
                            ${client.name.charAt(0).toUpperCase()}
                        </div>
                        
                        <div class="flex-grow min-w-0">
                            <h3 class="font-bold text-gray-800 truncate text-base">${escapeHTML(client.name)}</h3>
                            <p class="text-sm text-gray-500 truncate">${client.phone || 'Sem telefone'}</p>
                            
                            <div class="flex flex-wrap gap-1 mt-1.5">
                                ${client.loyaltyPoints ? `<span class="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">⭐ ${client.loyaltyPoints}</span>` : ''}
                                ${hasDebt ? `<span class="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">Devendo: R$ ${parseFloat(client.totalDebt).toFixed(2)}</span>` : ''}
                            </div>
                        </div>
                        
                        <div class="text-gray-400">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </div>
                    </div>
                `}).join('')}
            </div>
        </div>
    ` : `
        <div class="text-center py-20 px-6 opacity-60">
            <div class="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
            <p class="text-lg font-medium text-gray-700">Nenhum cliente encontrado</p>
            <p class="text-sm text-gray-500">Tente ajustar a busca.</p>
        </div>
    `;

    container.innerHTML = filtersHTML + listHTML;

    // --- EVENT LISTENERS ---
    const searchInput = document.getElementById('client-search');
    const toggleBtn = document.getElementById('btn-toggle-filters');
    const advancedFiltersDiv = document.getElementById('advanced-filters');
    
    // Toggle Mobile
    if(toggleBtn) {
        toggleBtn.onclick = () => {
            localState.isFiltersExpanded = !localState.isFiltersExpanded;
            advancedFiltersDiv.classList.toggle('hidden');
            // Ajusta cor do botão quando ativo
            if(localState.isFiltersExpanded) {
                toggleBtn.classList.add('bg-indigo-50', 'text-indigo-600', 'border-indigo-200');
            } else {
                toggleBtn.classList.remove('bg-indigo-50', 'text-indigo-600', 'border-indigo-200');
            }
        };
    }

    const applyFilters = () => {
        const inactiveInput = document.getElementById('filter-inactive');
        const loyaltyCheck = document.getElementById('filter-loyalty');
        const debtCheck = document.getElementById('filter-debt');

        localState.filters = {
            search: searchInput.value,
            inactiveDays: inactiveInput ? inactiveInput.value : '',
            hasLoyalty: loyaltyCheck ? loyaltyCheck.checked : false,
            hasDebt: debtCheck ? debtCheck.checked : false
        };
        fetchClients();
    };

    // Botões de aplicar
    const btnApplyDesktop = document.getElementById('btn-apply-filters-desktop');
    const btnApplyMobile = document.getElementById('btn-apply-filters-mobile');
    
    if (btnApplyDesktop) btnApplyDesktop.onclick = applyFilters;
    if (btnApplyMobile) btnApplyMobile.onclick = applyFilters;

    // Enter na busca
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') applyFilters();
    });

    // Clique no Card
    container.querySelectorAll('.client-card').forEach(card => {
        card.onclick = () => selectClient(card.dataset.id);
    });
}

// Renderiza a Ficha do Cliente (Detalhes) - Responsivo
async function renderClientDetails() {
    renderLayout(); 
    const container = document.getElementById('clients-content-area');
    const client = localState.selectedClient;

    if (!client) return renderClientList();

    if (localState.activeTab !== 'profile' && localState.historyData.appointments.length === 0) {
        await fetchClientHistory(client.id);
    }

    // Abas com Scroll Horizontal para Mobile
    const tabsHTML = `
        <div class="bg-white border-b sticky top-0 z-10 shadow-sm">
            <div class="flex overflow-x-auto no-scrollbar gap-1 px-4 py-1">
                <button class="tab-btn ${localState.activeTab === 'profile' ? 'active' : ''}" data-tab="profile">👤 Perfil</button>
                <button class="tab-btn ${localState.activeTab === 'appointments' ? 'active' : ''}" data-tab="appointments">📅 Agendamentos</button>
                <button class="tab-btn ${localState.activeTab === 'history' ? 'active' : ''}" data-tab="history">💰 Histórico</button>
                <button class="tab-btn ${localState.activeTab === 'loyalty' ? 'active' : ''}" data-tab="loyalty">⭐ Fidelidade</button>
            </div>
        </div>
    `;

    let contentHTML = '';
    if (localState.activeTab === 'profile') contentHTML = renderProfileTab(client);
    else if (localState.activeTab === 'appointments') contentHTML = renderAppointmentsTab(client);
    else if (localState.activeTab === 'history') contentHTML = renderHistoryTab(client);
    else if (localState.activeTab === 'loyalty') contentHTML = renderLoyaltyTab(client);

    // Ajuste de margens negativas para compensar padding do container
    container.innerHTML = `
        <div class="w-full bg-white shadow-sm min-h-full flex flex-col">
            <div class="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white">
                <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    <div class="w-20 h-20 rounded-full bg-white text-indigo-600 flex items-center justify-center text-3xl font-bold shadow-lg ring-4 ring-white/20 flex-shrink-0">
                        ${client.name.charAt(0).toUpperCase()}
                    </div>
                    
                    <div class="text-center sm:text-left flex-grow">
                        <h2 class="text-2xl font-bold leading-tight break-words">${escapeHTML(client.name)}</h2>
                        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-1 mt-1 opacity-90 text-sm">
                            <span>${client.phone || 'Sem telefone'}</span>
                            <span class="hidden sm:inline">•</span>
                            <span>${client.email || ''}</span>
                        </div>
                        
                        ${client.totalDebt && client.totalDebt > 0 ? `
                            <div class="mt-3 inline-block bg-red-900/40 backdrop-blur-md border border-red-400/30 px-3 py-1.5 rounded-full">
                                <p class="text-xs font-bold text-red-50 flex items-center justify-center sm:justify-start gap-1">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    Débito: R$ ${parseFloat(client.totalDebt).toFixed(2)}
                                </p>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="mt-2 sm:mt-0 bg-white/10 p-3 rounded-xl backdrop-blur-sm text-center min-w-[100px] border border-white/10">
                        <p class="text-[10px] uppercase font-bold tracking-wide opacity-80">Fidelidade</p>
                        <p class="text-2xl font-extrabold text-yellow-300 drop-shadow-md">${client.loyaltyPoints || 0}</p>
                    </div>
                </div>
            </div>

            ${tabsHTML}

            <div class="p-4 sm:p-6 flex-grow relative bg-gray-50/50">
                ${localState.historyLoading ? '<div class="absolute inset-0 bg-white/80 flex items-start justify-center pt-20 z-20"><div class="loader"></div></div>' : ''}
                <div class="animate-fade-in max-w-3xl mx-auto">
                    ${contentHTML}
                </div>
            </div>
        </div>
    `;

    // Estilos Inline para as Abas
    const style = document.createElement('style');
    style.textContent = `
        .tab-btn {
            padding: 12px 16px;
            white-space: nowrap;
            font-size: 0.9rem;
            font-weight: 500;
            color: #6b7280;
            border-bottom: 2px solid transparent;
            transition: all 0.2s;
            flex-shrink: 0;
        }
        .tab-btn.active {
            color: #4f46e5;
            border-bottom-color: #4f46e5;
            font-weight: 700;
            background-color: #f3f4f6;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `;
    container.appendChild(style);

    // Event Listeners
    container.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => {
            const newTab = btn.dataset.tab;
            if (localState.activeTab !== newTab) {
                if (newTab === 'appointments' || newTab === 'history') {
                    localState.historyLimit = 20;
                    localState.historySearchTerm = '';
                }
            }
            localState.activeTab = newTab;
            renderClientDetails();
        };
    });

    if (localState.activeTab === 'profile') {
        document.getElementById('form-edit-client').onsubmit = handleSaveClient;
        document.getElementById('btn-delete-client').onclick = handleDeleteClient;
    }
    
    if (localState.activeTab === 'loyalty') {
        const btnRedeem = document.getElementById('btn-manual-redeem');
        if(btnRedeem) btnRedeem.onclick = () => openManualRedemptionModal(client);
    }

    // Busca no Histórico
    const historySearchInput = document.getElementById('history-search-input');
    if (historySearchInput) {
        // Truque para manter o foco
        const val = historySearchInput.value;
        historySearchInput.value = '';
        historySearchInput.focus();
        historySearchInput.value = val;
        
        historySearchInput.addEventListener('input', (e) => {
            localState.historySearchTerm = e.target.value;
            renderClientDetails();
        });
    }

    const btnLoadMore = document.getElementById('btn-load-more');
    if (btnLoadMore) {
        btnLoadMore.onclick = () => {
            localState.historyLimit += 20; 
            renderClientDetails();
            fetchClientHistory(client.id);
        };
    }

    // Navegação
    container.querySelectorAll('[data-go-agenda]').forEach(btn => {
        btn.onclick = (e) => {
            navigateTo('agenda-section', { targetDate: new Date(btn.dataset.date), scrollToAppointmentId: btn.dataset.id });
        };
    });
    container.querySelectorAll('[data-go-comanda]').forEach(btn => {
        btn.onclick = (e) => {
            navigateTo('comandas-section', { selectedAppointmentId: btn.dataset.id, initialFilter: 'finalizadas' });
        };
    });
}

// HTML: Aba Perfil (Mobile Friendly)
function renderProfileTab(client) {
    return `
        <form id="form-edit-client" class="space-y-5 pb-20">
            <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    Dados Pessoais
                </h3>
                
                <div class="space-y-4">
                    <div>
                        <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Nome Completo</label>
                        <input type="text" name="name" value="${escapeHTML(client.name)}" required class="block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base">
                    </div>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Telefone</label>
                            <input type="tel" name="phone" value="${escapeHTML(client.phone || '')}" class="block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">E-mail</label>
                            <input type="email" name="email" value="${escapeHTML(client.email || '')}" class="block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base">
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Dia Nasc.</label>
                            <input type="number" name="dobDay" min="1" max="31" value="${client.dobDay || ''}" class="block w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-base text-center">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Mês Nasc.</label>
                            <input type="number" name="dobMonth" min="1" max="12" value="${client.dobMonth || ''}" class="block w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-base text-center">
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h3 class="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    Anotações
                </h3>
                <textarea name="notes" rows="4" class="block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base" placeholder="Preferências, alergias...">${escapeHTML(client.notes || '')}</textarea>
            </div>
            
            <div class="flex flex-col gap-3 pt-2">
                <button type="submit" class="w-full bg-indigo-600 text-white px-6 py-3.5 rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition transform active:scale-95 text-base">
                    Salvar Alterações
                </button>
                <button type="button" id="btn-delete-client" class="w-full bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 px-6 py-3 rounded-xl font-bold transition text-sm flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    Excluir Cliente
                </button>
            </div>
        </form>
    `;
}

// HTML: Aba Agendamentos
function renderAppointmentsTab(client) {
    let appointments = localState.historyData.appointments || [];
    
    if (localState.historySearchTerm) {
        const term = localState.historySearchTerm.toLowerCase();
        appointments = appointments.filter(a => 
            (a.serviceName && a.serviceName.toLowerCase().includes(term)) ||
            (a.professionalName && a.professionalName.toLowerCase().includes(term))
        );
    }
    
    appointments.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

    const renderCard = (appt) => {
        const date = new Date(appt.startTime);
        const dateStr = date.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' }).replace('.', '');
        const timeStr = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        const isPast = date < new Date();
        
        let statusColor = isPast ? 'border-gray-300 bg-gray-50' : 'border-green-500 bg-white';
        let statusText = isPast ? 'Concluído' : 'Agendado';
        let badgeClass = isPast ? 'bg-gray-200 text-gray-600' : 'bg-green-100 text-green-700';

        if (appt.status === 'cancelled') {
            statusColor = 'border-red-400 bg-red-50';
            statusText = 'Cancelado';
            badgeClass = 'bg-red-100 text-red-600';
        }

        return `
            <div class="relative bg-white border rounded-xl p-3 shadow-sm mb-3 flex gap-3 cursor-pointer active:scale-[0.99] transition"
                 data-go-agenda="true" data-id="${appt.id}" data-date="${appt.startTime}">
                
                <div class="flex-shrink-0 w-14 flex flex-col items-center justify-center rounded-lg bg-gray-100 border border-gray-200 p-1">
                    <span class="text-xs font-bold text-gray-500 uppercase">${dateStr.split(' ')[0]}</span>
                    <span class="text-lg font-black text-gray-800 leading-none">${date.getDate()}</span>
                    <span class="text-[10px] text-gray-500">${timeStr}</span>
                </div>

                <div class="flex-grow min-w-0 flex flex-col justify-center">
                    <h4 class="font-bold text-gray-800 text-sm truncate">${escapeHTML(appt.serviceName || 'Serviço')}</h4>
                    <p class="text-xs text-gray-500 truncate">Prof: ${escapeHTML(appt.professionalName || 'N/A')}</p>
                    <div class="mt-1">
                        <span class="inline-block text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${badgeClass}">
                            ${statusText}
                        </span>
                    </div>
                </div>

                <div class="flex items-center text-gray-300">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </div>
            </div>
        `;
    };

    return `
        <div class="space-y-4 pb-20">
            <div class="sticky top-0 bg-gray-50 pt-2 pb-2 z-10">
                <div class="relative">
                    <input type="text" id="history-search-input" 
                        class="w-full p-3 pl-10 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm" 
                        placeholder="Filtrar histórico..." 
                        value="${localState.historySearchTerm}">
                    <svg class="w-5 h-5 text-gray-400 absolute left-3 top-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
            </div>

            <div>
                ${appointments.length ? appointments.map(renderCard).join('') : '<p class="text-center text-gray-400 py-10 italic">Nenhum agendamento encontrado.</p>'}
            </div>
            
            ${appointments.length >= localState.historyLimit ? `
            <button id="btn-load-more" class="w-full py-3 text-sm text-indigo-600 font-bold bg-indigo-50 rounded-xl hover:bg-indigo-100 transition">
                Carregar mais antigos...
            </button>` : ''}
        </div>
    `;
}

// HTML: Aba Histórico (Comandas)
function renderHistoryTab(client) {
    let sales = localState.historyData.sales || [];
    
    if (localState.historySearchTerm) {
        const term = localState.historySearchTerm.toLowerCase();
        sales = sales.filter(s => s.id.includes(term));
    }
    
    sales.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (sales.length === 0 && !localState.historySearchTerm) {
        return `<div class="text-center py-12 text-gray-400">Nenhum registro financeiro.</div>`;
    }

    return `
        <div class="space-y-4 pb-20">
            <div class="sticky top-0 bg-gray-50 pt-2 pb-2 z-10">
                <div class="relative">
                    <input type="text" id="history-search-input" 
                        class="w-full p-3 pl-10 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm" 
                        placeholder="Buscar código da venda..." 
                        value="${localState.historySearchTerm}">
                    <svg class="w-5 h-5 text-gray-400 absolute left-3 top-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
            </div>

            <div class="space-y-3">
                ${sales.map(sale => {
                    const date = new Date(sale.date || sale.createdAt);
                    const total = sale.totalAmount || 0;
                    
                    return `
                    <div class="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center shadow-sm active:bg-gray-50 cursor-pointer"
                         data-go-comanda="true" data-id="${sale.id}">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            </div>
                            <div>
                                <p class="font-bold text-gray-800 text-sm">Venda #${sale.id.slice(-4)}</p>
                                <p class="text-xs text-gray-500">${date.toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-gray-900">R$ ${parseFloat(total).toFixed(2)}</p>
                            <p class="text-[10px] text-indigo-500 font-medium">Ver detalhes</p>
                        </div>
                    </div>
                    `;
                }).join('')}
            </div>
            
             ${sales.length >= localState.historyLimit ? `
            <button id="btn-load-more" class="w-full py-3 text-sm text-indigo-600 font-bold bg-indigo-50 rounded-xl hover:bg-indigo-100 transition">
                Carregar mais...
            </button>` : ''}
        </div>
    `;
}

// HTML: Aba Fidelidade (Card Moderno)
function renderLoyaltyTab(client) {
    const log = localState.historyData.loyaltyLog || [];
    log.sort((a, b) => new Date(b.date) - new Date(a.date));

    const historyItems = log.length > 0 ? log.map(entry => {
        const isRedemption = entry.type === 'redemption';
        return `
            <div class="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                <div class="flex items-center gap-3">
                    <div class="w-2 h-2 rounded-full ${isRedemption ? 'bg-red-500' : 'bg-green-500'}"></div>
                    <div>
                        <p class="text-sm font-medium text-gray-700">${escapeHTML(entry.description || (isRedemption ? 'Resgate' : 'Acúmulo'))}</p>
                        <p class="text-[10px] text-gray-400">${new Date(entry.date).toLocaleDateString()}</p>
                    </div>
                </div>
                <span class="font-bold text-sm ${isRedemption ? 'text-red-600' : 'text-green-600'}">
                    ${isRedemption ? '-' : '+'}${entry.points}
                </span>
            </div>
        `;
    }).join('') : '<p class="text-center text-gray-400 py-4 text-xs italic">Sem histórico recente.</p>';

    return `
        <div class="space-y-6 pb-20">
            <div class="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <div class="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-4">
                    <svg class="w-40 h-40" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
                
                <p class="text-amber-100 font-bold uppercase tracking-wider text-xs mb-1">Saldo de Pontos</p>
                <div class="flex items-baseline gap-2">
                    <h1 class="text-5xl font-black">${client.loyaltyPoints || 0}</h1>
                    <span class="text-lg opacity-80">pts</span>
                </div>
                
                <button id="btn-manual-redeem" class="mt-4 w-full bg-white/20 hover:bg-white/30 text-white text-sm font-bold py-3 px-4 rounded-xl backdrop-blur-md transition border border-white/30 flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    Ajustar / Resgatar
                </button>
            </div>

            <div class="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 border-b pb-2">Últimas Movimentações</h4>
                ${historyItems}
            </div>
        </div>
    `;
}

// --- 4. FUNÇÕES DE DADOS E LÓGICA (Mantidas com otimizações de segurança) ---

async function fetchClients() {
    localState.loading = true;
    renderLayout(); 
    try {
        let url = `/api/clients/${state.establishmentId}?limit=20`;
        
        if (localState.filters.search) url += `&search=${encodeURIComponent(localState.filters.search)}`;
        if (localState.filters.inactiveDays) url += `&inactiveDays=${localState.filters.inactiveDays}`;
        if (localState.filters.hasLoyalty) url += `&hasLoyalty=true`;
        if (localState.filters.hasDebt) url += `&hasDebt=true`;

        localState.clients = await authenticatedFetch(url);
        renderClientList();
    } catch (error) {
        console.error(error);
        showNotification('Erro', 'Falha ao carregar clientes.', 'error');
        localState.clients = [];
        renderClientList();
    } finally {
        localState.loading = false;
        const loader = document.querySelector('.loader');
        if(loader && loader.parentElement) loader.parentElement.remove();
    }
}

async function fetchClientHistory(clientId) {
    const client = localState.selectedClient;
    if (!client || !client.phone) return; 

    localState.historyLoading = true;
    
    // Mostra loading no card
    const container = document.querySelector('.animate-fade-in');
    if(container) {
        // Apenas para feedback visual caso a UI já esteja renderizada
    }

    try {
        const end = new Date();
        end.setMonth(end.getMonth() + 12); 
        const start = new Date();
        start.setFullYear(start.getFullYear() - 5); 

        let url = `/api/appointments/${state.establishmentId}?startDate=${start.toISOString()}&endDate=${end.toISOString()}`;
        url += `&clientPhone=${encodeURIComponent(client.phone)}`;
        url += `&limit=${localState.historyLimit}`;

        const clientAppts = await authenticatedFetch(url);
        
        localState.historyData.appointments = clientAppts;

        localState.historyData.sales = clientAppts
            .filter(a => a.status === 'completed')
            .map(a => ({
                 id: a.id,
                 date: a.startTime,
                 totalAmount: a.totalAmount || 0,
                 items: a.services || []
             }));

        const loyaltyLog = [];
        clientAppts.forEach(appt => {
            if (appt.status === 'completed' && appt.loyaltyPointsEarned > 0) {
                loyaltyLog.push({ type: 'earn', points: appt.loyaltyPointsEarned, date: appt.startTime, description: 'Venda finalizada' });
            }
            if (appt.loyaltyRedemption) {
                loyaltyLog.push({ type: 'redemption', points: appt.loyaltyRedemption.cost || 0, date: appt.startTime, description: `Resgate: ${appt.loyaltyRedemption.name}` });
            }
        });
        
        localState.historyData.loyaltyLog = loyaltyLog;

    } catch (e) {
        console.error("Erro ao buscar histórico", e);
    } finally {
        localState.historyLoading = false;
        // Re-renderiza para atualizar as listas
        if(localState.selectedClient) renderClientDetails();
    }
}

function openManualRedemptionModal(client) {
    const currentPoints = client.loyaltyPoints || 0;
    
    const contentHTML = `
        <div class="text-center mb-6">
            <p class="text-xs text-gray-500 uppercase font-bold">Saldo Atual</p>
            <h2 class="text-4xl font-black text-gray-800">${currentPoints}</h2>
        </div>
        <form id="manual-redeem-form" class="space-y-4">
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Tipo de Ajuste</label>
                <select id="redeem-action" class="w-full p-3 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="debit">🔻 Remover Pontos (Resgate)</option>
                    <option value="credit">➕ Adicionar Pontos (Correção)</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Quantidade</label>
                <input type="number" id="redeem-points" min="1" required class="w-full p-3 border rounded-xl text-lg font-bold outline-none focus:ring-2 focus:ring-indigo-500" placeholder="0">
            </div>
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Motivo</label>
                <input type="text" id="redeem-reason" required class="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Ex: Brinde entregue">
            </div>
            <div class="pt-4">
                <button type="submit" class="w-full bg-indigo-600 text-white px-4 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-700 active:scale-95 transition">Confirmar</button>
            </div>
        </form>
    `;

    const { modalElement, close } = showGenericModal({ title: "Ajuste de Pontos", contentHTML: contentHTML, maxWidth: 'max-w-xs' });

    modalElement.querySelector('form').onsubmit = async (e) => {
        e.preventDefault();
        const action = document.getElementById('redeem-action').value;
        const pointsInput = parseInt(document.getElementById('redeem-points').value, 10);
        const reason = document.getElementById('redeem-reason').value;

        if (!pointsInput || pointsInput <= 0) return showNotification('Erro', 'Qtd inválida.', 'error');
        if (action === 'debit' && pointsInput > currentPoints) return showNotification('Erro', 'Saldo insuficiente.', 'error');

        try {
            let newBalance = currentPoints;
            if (action === 'debit') {
                await clientsApi.redeemReward(state.establishmentId, client.phone, pointsInput, reason);
                newBalance -= pointsInput;
            } else {
                newBalance += pointsInput;
                await clientsApi.updateClient(client.id, { loyaltyPoints: newBalance });
            }

            localState.selectedClient.loyaltyPoints = newBalance;
            localState.historyData.loyaltyLog.unshift({
                type: action === 'debit' ? 'redemption' : 'earn',
                points: pointsInput,
                date: new Date().toISOString(),
                description: reason + ' (Manual)'
            });

            showNotification('Sucesso', 'Saldo atualizado.', 'success');
            close();
            renderClientDetails();

        } catch (error) {
            showNotification('Erro', error.message, 'error');
        }
    };
}

function selectClient(id) {
    localState.selectedClient = localState.clients.find(c => c.id === id);
    localState.activeTab = 'profile'; 
    localState.historyLimit = 20; 
    localState.historySearchTerm = ''; 
    localState.historyData = { appointments: [], sales: [], loyaltyLog: [] };
    renderClientDetails();
}

function openNewClientModal() {
    const content = `
        <form id="modal-new-client-form" class="space-y-4">
            <div><label class="block text-sm font-bold text-gray-700 mb-1">Nome Completo *</label><input type="text" id="new-name" required class="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"></div>
            <div><label class="block text-sm font-bold text-gray-700 mb-1">Telefone (WhatsApp) *</label><input type="tel" id="new-phone" required class="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"></div>
            <div class="pt-4">
                <button type="submit" class="w-full bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow hover:bg-indigo-700 active:scale-95 transition">Cadastrar</button>
            </div>
        </form>
    `;
    const { modalElement, close } = showGenericModal({ title: "Novo Cliente", contentHTML: content, maxWidth: 'max-w-sm' });
    
    modalElement.querySelector('form').onsubmit = async (e) => {
        e.preventDefault();
        const name = document.getElementById('new-name').value;
        const phone = document.getElementById('new-phone').value;
        
        try {
            const newClient = await clientsApi.createClient({ establishmentId: state.establishmentId, name, phone });
            localState.clients.unshift(newClient); 
            showNotification('Sucesso', 'Cliente criado!', 'success');
            close();
            selectClient(newClient.id);
        } catch (err) {
            showNotification('Erro', err.message, 'error');
        }
    };
}

async function handleSaveClient(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.establishmentId = state.establishmentId; 
    
    try {
        await clientsApi.updateClient(localState.selectedClient.id, data);
        Object.assign(localState.selectedClient, data);
        
        const idx = localState.clients.findIndex(c => c.id === localState.selectedClient.id);
        if (idx !== -1) localState.clients[idx] = localState.selectedClient;
        
        showNotification('Sucesso', 'Dados salvos!', 'success');
    } catch (err) {
        showNotification('Erro', err.message, 'error');
    }
}

async function handleDeleteClient() {
    if (!await showConfirmation('Excluir Cliente', 'Tem certeza? O histórico será apagado.')) return;
    try {
        await clientsApi.deleteClient(localState.selectedClient.id);
        localState.clients = localState.clients.filter(c => c.id !== localState.selectedClient.id);
        localState.selectedClient = null;
        showNotification('Sucesso', 'Cliente removido.', 'success');
        renderClientList();
    } catch (err) {
        showNotification('Erro', err.message, 'error');
    }
}

export async function loadClientsPage() {
    contentDiv = document.getElementById('content');
    localState.selectedClient = null;
    localState.searchTerm = '';
    localState.historyLimit = 20;
    localState.isFiltersExpanded = false;
    
    renderLayout(); 
    await fetchClients(); 
}