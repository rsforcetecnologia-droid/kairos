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
    activeTab: 'profile',
    
    // Filtros
    filters: {
        search: '',
        inactiveDays: '',
        birthMonth: '',
        hasLoyalty: false,
        hasDebt: false,
    },
    showFilters: false, // Controla a visibilidade da barra de filtros

    loading: false,
    
    // Paginação e Histórico
    historyLimit: 20, 
    historySearchTerm: '', 
    historyLoading: false,
    historyData: {
        appointments: [],
        sales: [],
        loyaltyLog: []
    },
    
    // Estado do Modal
    modalOpen: false
};

let contentDiv = null;

// --- FUNÇÃO AUXILIAR: LIMPAR TELEFONE ---
const cleanPhone = (phone) => {
    if (!phone) return '';
    return String(phone).replace(/\D/g, '');
};

// --- 3. FUNÇÕES PRINCIPAIS DE RENDERIZAÇÃO ---

// Layout Base (Lista de Clientes)
function renderLayout() {
    contentDiv.innerHTML = `
        <section class="h-[calc(100vh-4rem)] sm:h-full flex flex-col bg-gray-50 overflow-x-hidden w-full">
            <div class="bg-white border-b shadow-sm z-30 flex-shrink-0">
                <div class="p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-center gap-3 max-w-7xl mx-auto w-full">
                    <div class="w-full sm:w-auto text-center sm:text-left">
                        <h2 class="text-xl sm:text-2xl font-bold text-gray-800">Clientes</h2>
                        <p class="text-xs text-gray-500 hidden sm:block">Gerencie sua base de contatos</p>
                    </div>
                    
                    <div class="w-full sm:w-auto flex gap-2">
                        <button id="btn-new-client" class="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-700 transition shadow flex items-center justify-center gap-2 text-sm font-bold active:scale-95 transform duration-150">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                            Novo
                        </button>
                    </div>
                </div>
            </div>

            <div id="clients-content-area" class="flex-grow overflow-y-auto custom-scrollbar w-full max-w-7xl mx-auto relative">
                ${localState.loading ? '<div class="flex justify-center pt-20"><div class="loader"></div></div>' : ''}
            </div>
        </section>
    `;

    const btnNew = document.getElementById('btn-new-client');
    if (btnNew) btnNew.onclick = openNewClientModal;
}

// Renderiza a Lista de Clientes
function renderClientList() {
    // Se o modal estiver aberto, não renderizamos a lista novamente para não perder o estado visual de fundo
    if (localState.modalOpen) return;

    renderLayout(); 
    
    const container = document.getElementById('clients-content-area');
    const hasActiveFilters = localState.filters.inactiveDays || localState.filters.birthMonth || localState.filters.hasLoyalty || localState.filters.hasDebt;
    
    // --- BARRA DE FERRAMENTAS ---
    const toolbarHTML = `
        <div class="sticky top-0 bg-gray-50 z-20 px-3 sm:px-4 pt-4 pb-2 w-full">
            <div class="flex gap-2 items-center">
                <div class="relative flex-grow shadow-sm">
                    <input type="text" id="client-search" 
                        class="w-full py-3 pl-10 pr-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm outline-none transition bg-white" 
                        placeholder="Buscar cliente..." 
                        value="${localState.filters.search}">
                    <svg class="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                
                <button id="btn-toggle-filters" class="flex-shrink-0 p-3 rounded-xl border transition flex items-center gap-2 font-medium ${localState.showFilters || hasActiveFilters ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                    <span class="hidden sm:inline">Filtros</span>
                    ${hasActiveFilters ? '<span class="flex h-2 w-2 rounded-full bg-indigo-600"></span>' : ''}
                </button>
            </div>

            <div id="filter-panel" class="${localState.showFilters ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0 overflow-hidden'} transition-all duration-300 ease-in-out">
                <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase">Dias Ausente (Min)</label>
                        <div class="relative">
                            <input type="number" id="filter-inactive" min="1"
                                class="w-full p-2.5 pl-9 rounded-lg border border-gray-300 focus:ring-indigo-500 text-sm bg-gray-50 outline-none" 
                                placeholder="Ex: 30 dias" 
                                value="${localState.filters.inactiveDays}">
                            <svg class="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                    </div>

                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase">Aniversário em</label>
                        <select id="filter-birth-month" class="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-indigo-500 text-sm bg-gray-50 outline-none">
                            <option value="">Todos os meses</option>
                            <option value="1">Janeiro</option>
                            <option value="2">Fevereiro</option>
                            <option value="3">Março</option>
                            <option value="4">Abril</option>
                            <option value="5">Maio</option>
                            <option value="6">Junho</option>
                            <option value="7">Julho</option>
                            <option value="8">Agosto</option>
                            <option value="9">Setembro</option>
                            <option value="10">Outubro</option>
                            <option value="11">Novembro</option>
                            <option value="12">Dezembro</option>
                        </select>
                    </div>

                    <div class="flex flex-col justify-center gap-2 pt-4 sm:pt-0">
                        <label class="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded transition">
                            <input type="checkbox" id="filter-loyalty" class="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4" ${localState.filters.hasLoyalty ? 'checked' : ''}>
                            <span class="ml-2 text-sm text-gray-700 font-medium">Com Pontos Fidelidade</span>
                        </label>
                        <label class="flex items-center cursor-pointer hover:bg-red-50 p-1 rounded transition">
                            <input type="checkbox" id="filter-debt" class="rounded text-red-600 focus:ring-red-500 w-4 h-4" ${localState.filters.hasDebt ? 'checked' : ''}>
                            <span class="ml-2 text-sm font-semibold text-red-600">Com Débitos (Fiado)</span>
                        </label>
                    </div>

                    <div class="flex items-end">
                        <button id="btn-apply-filters" class="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-bold shadow hover:bg-gray-800 transition active:scale-95">
                            Aplicar Filtros
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    const listHTML = localState.clients.length > 0 ? `
        <div class="px-3 sm:px-4 pb-20 pt-2 w-full">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                ${localState.clients.map(client => {
                    const hasDebt = client.totalDebt && parseFloat(client.totalDebt) > 0;
                    const lastVisit = client.lastVisit ? new Date(client.lastVisit).toLocaleDateString('pt-BR') : 'Nunca';
                    
                    return `
                    <div class="client-card bg-white p-3 sm:p-4 rounded-xl border ${hasDebt ? 'border-l-4 border-l-red-500 border-y-red-100 border-r-red-100' : 'border-gray-200 border-l-4 border-l-indigo-500'} shadow-sm hover:shadow-md transition cursor-pointer active:bg-gray-50 flex items-center gap-3 group" data-id="${client.id}">
                        
                        <div class="w-12 h-12 rounded-full ${hasDebt ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white'} transition-colors flex items-center justify-center font-bold text-lg flex-shrink-0">
                            ${client.name.charAt(0).toUpperCase()}
                        </div>
                        
                        <div class="flex-grow min-w-0">
                            <div class="flex justify-between items-start">
                                <h3 class="font-bold text-gray-800 truncate text-base">${escapeHTML(client.name)}</h3>
                                ${client.dobDay && client.dobMonth == (new Date().getMonth() + 1) ? '<span class="text-xs bg-pink-100 text-pink-600 px-1.5 py-0.5 rounded font-bold">🎂 Mês</span>' : ''}
                            </div>
                            <p class="text-sm text-gray-500 truncate">${client.phone || 'Sem telefone'}</p>
                            
                            <div class="flex flex-wrap gap-2 mt-1.5 items-center">
                                ${client.loyaltyPoints ? `<span class="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">⭐ ${client.loyaltyPoints}</span>` : ''}
                                ${hasDebt ? `<span class="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full border border-red-200">Devendo: R$ ${parseFloat(client.totalDebt).toFixed(2)}</span>` : ''}
                                <span class="text-[10px] text-gray-400 flex items-center gap-1 ml-auto">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    ${lastVisit === 'Nunca' ? 'Novo' : lastVisit}
                                </span>
                            </div>
                        </div>
                        
                        <div class="text-gray-300 group-hover:text-indigo-500 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </div>
                    </div>
                `}).join('')}
            </div>
        </div>
    ` : `
        <div class="text-center py-20 px-6 opacity-60">
            <div class="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
            <p class="text-xl font-bold text-gray-800 mb-2">Nenhum cliente encontrado</p>
            <p class="text-sm text-gray-500 max-w-xs mx-auto">Tente ajustar seus filtros de busca ou cadastre um novo cliente.</p>
            ${hasActiveFilters ? '<button id="btn-clear-search" class="mt-4 text-indigo-600 font-bold text-sm hover:underline">Limpar Filtros</button>' : ''}
        </div>
    `;

    container.innerHTML = toolbarHTML + listHTML;

    // --- EVENT LISTENERS ---
    const searchInput = document.getElementById('client-search');
    const toggleBtn = document.getElementById('btn-toggle-filters');
    const applyBtn = document.getElementById('btn-apply-filters');
    const clearBtn = document.getElementById('btn-clear-search');
    
    if(toggleBtn) {
        toggleBtn.onclick = () => {
            localState.showFilters = !localState.showFilters;
            renderClientList(); 
        };
    }

    const monthSelect = document.getElementById('filter-birth-month');
    if(monthSelect) {
        monthSelect.value = localState.filters.birthMonth;
    }

    const executeFilter = () => {
        const inactiveInput = document.getElementById('filter-inactive');
        const loyaltyCheck = document.getElementById('filter-loyalty');
        const debtCheck = document.getElementById('filter-debt');
        const monthSelect = document.getElementById('filter-birth-month');

        localState.filters = {
            search: searchInput.value,
            inactiveDays: inactiveInput ? inactiveInput.value : '',
            birthMonth: monthSelect ? monthSelect.value : '',
            hasLoyalty: loyaltyCheck ? loyaltyCheck.checked : false,
            hasDebt: debtCheck ? debtCheck.checked : false
        };
        fetchClients();
    };

    if (applyBtn) applyBtn.onclick = executeFilter;
    
    if (clearBtn) clearBtn.onclick = () => {
        localState.filters = { search: '', inactiveDays: '', birthMonth: '', hasLoyalty: false, hasDebt: false };
        localState.showFilters = false;
        fetchClients();
    };

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') executeFilter();
    });

    container.querySelectorAll('.client-card').forEach(card => {
        card.onclick = () => selectClient(card.dataset.id);
    });
}

// --- FUNÇÃO AUXILIAR: GERA HTML DOS DETALHES ---
function getClientDetailsHTML(client) {
    const tabsHTML = `
        <div class="bg-white border-b sticky top-0 z-10 shadow-sm w-full">
            <div class="flex overflow-x-auto no-scrollbar gap-1 px-3 sm:px-4 py-1 w-full">
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

    return `
        <div class="w-full bg-white shadow-sm min-h-full flex flex-col overflow-x-hidden">
            <div class="bg-gradient-to-br from-indigo-600 to-purple-700 p-4 sm:p-6 text-white relative overflow-hidden flex-shrink-0">
                
                <button id="btn-close-modal" class="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/20 p-2 rounded-full transition z-50 bg-black/10 sm:bg-transparent">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-6 sm:pt-0">
                    <div class="w-20 h-20 rounded-full bg-white text-indigo-600 flex items-center justify-center text-3xl font-bold shadow-lg ring-4 ring-white/20 flex-shrink-0">
                        ${client.name.charAt(0).toUpperCase()}
                    </div>
                    
                    <div class="text-center sm:text-left flex-grow min-w-0">
                        <h2 class="text-xl sm:text-2xl font-bold leading-tight break-words">${escapeHTML(client.name)}</h2>
                        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-1 mt-1 opacity-90 text-sm">
                            <span>${client.phone || 'Sem telefone'}</span>
                            <span class="hidden sm:inline">•</span>
                            <span class="truncate max-w-[200px]">${client.email || ''}</span>
                        </div>
                        
                        ${client.totalDebt && client.totalDebt > 0 ? `
                            <div class="mt-3 inline-block bg-red-900/40 backdrop-blur-md border border-red-400/30 px-3 py-1.5 rounded-full max-w-full">
                                <p class="text-xs font-bold text-red-50 flex items-center justify-center sm:justify-start gap-1 truncate">
                                    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
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

            <div class="p-3 sm:p-6 flex-grow relative bg-gray-50/50 overflow-y-auto custom-scrollbar">
                ${localState.historyLoading ? '<div class="absolute inset-0 bg-white/80 flex items-start justify-center pt-20 z-20"><div class="loader"></div></div>' : ''}
                <div class="animate-fade-in max-w-4xl mx-auto w-full pb-10">
                    ${contentHTML}
                </div>
            </div>
        </div>
    `;
}

// --- FUNÇÃO AUXILIAR: ATTACH LISTENERS ---
function attachDetailsEvents(container, client) {
    if(!document.getElementById('tabs-styles')) {
        const style = document.createElement('style');
        style.id = 'tabs-styles';
        style.textContent = `
            .tab-btn { padding: 12px 16px; white-space: nowrap; font-size: 0.9rem; font-weight: 500; color: #6b7280; border-bottom: 2px solid transparent; transition: all 0.2s; flex-shrink: 0; }
            .tab-btn.active { color: #4f46e5; border-bottom-color: #4f46e5; font-weight: 700; background-color: #f3f4f6; border-top-left-radius: 8px; border-top-right-radius: 8px; }
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `;
        container.appendChild(style);
    }

    container.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = async () => {
            const newTab = btn.dataset.tab;
            if (localState.activeTab === newTab) return;

            if (newTab === 'appointments' || newTab === 'history') {
                localState.historyLimit = 20;
                localState.historySearchTerm = '';
            }
            localState.activeTab = newTab;
            
            renderClientDetails(); 

            const shouldFetch = newTab !== 'profile' && !localState.historyLoading && localState.historyData.appointments.length === 0;
            
            if (shouldFetch) {
                 await fetchClientHistory(client.id);
            }
        };
    });

    if (localState.activeTab === 'profile') {
        const form = container.querySelector('#form-edit-client');
        const btnDel = container.querySelector('#btn-delete-client');
        if(form) form.onsubmit = handleSaveClient;
        if(btnDel) btnDel.onclick = handleDeleteClient;
    }
    
    if (localState.activeTab === 'loyalty') {
        const btnRedeem = container.querySelector('#btn-manual-redeem');
        if(btnRedeem) btnRedeem.onclick = () => openManualRedemptionModal(client);
    }

    const historySearchInput = container.querySelector('#history-search-input');
    if (historySearchInput) {
        const val = historySearchInput.value;
        historySearchInput.value = '';
        historySearchInput.focus();
        historySearchInput.value = val;
        
        historySearchInput.addEventListener('input', (e) => {
            localState.historySearchTerm = e.target.value;
            renderClientDetails();
        });
    }

    const btnLoadMore = container.querySelector('#btn-load-more');
    if (btnLoadMore) {
        btnLoadMore.onclick = () => {
            localState.historyLimit += 20; 
            renderClientDetails();
            fetchClientHistory(client.id);
        };
    }

    container.querySelectorAll('[data-go-agenda]').forEach(btn => {
        btn.onclick = (e) => {
            closeClientModal(); 
            navigateTo('agenda-section', { targetDate: new Date(btn.dataset.date), scrollToAppointmentId: btn.dataset.id });
        };
    });
    container.querySelectorAll('[data-go-comanda]').forEach(btn => {
        btn.onclick = (e) => {
            closeClientModal();
            navigateTo('comandas-section', { selectedAppointmentId: btn.dataset.id, initialFilter: 'finalizadas' });
        };
    });

    const btnClose = container.querySelector('#btn-close-modal');
    if(btnClose) btnClose.onclick = closeClientModal;
}

// --- RENDERIZAÇÃO DO MODAL (FLUTUANTE PARA MOBILE E DESKTOP) ---
async function renderClientDetails() {
    const client = localState.selectedClient;
    
    if (!client) {
        closeClientModal();
        return;
    }

    // Agora sempre renderiza como Modal (tela flutuante)
    renderClientModal(client);
}

function renderClientModal(client) {
    let modalOverlay = document.getElementById('client-details-modal-overlay');
    
    if (!modalOverlay) {
        modalOverlay = document.createElement('div');
        modalOverlay.id = 'client-details-modal-overlay';
        // Ajuste: p-0 no mobile (tela cheia), p-4 no desktop
        modalOverlay.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 animate-fade-in';
        
        // Ajuste: w-full h-full no mobile (tela cheia)
        modalOverlay.innerHTML = `
            <div class="bg-white w-full h-full sm:h-[90vh] sm:max-w-5xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col relative animate-scale-in" id="client-modal-content">
            </div>
        `;
        
        modalOverlay.onclick = (e) => {
            if(e.target === modalOverlay) closeClientModal();
        };

        document.body.appendChild(modalOverlay);
        // Bloqueia rolagem do fundo
        document.body.classList.add('overflow-hidden');
        localState.modalOpen = true;
    }

    const modalContent = modalOverlay.querySelector('#client-modal-content');
    modalContent.innerHTML = getClientDetailsHTML(client);
    
    attachDetailsEvents(modalContent, client);
}

function closeClientModal() {
    const modal = document.getElementById('client-details-modal-overlay');
    if (modal) {
        modal.remove();
    }
    // Libera rolagem do fundo
    document.body.classList.remove('overflow-hidden');
    localState.modalOpen = false;
    localState.selectedClient = null;
    
    // Atualiza a lista caso algo tenha mudado
    renderClientList();
}

// HTML: Aba Perfil (Edit)
function renderProfileTab(client) {
    return `
        <form id="form-edit-client" class="space-y-5 w-full">
            <div class="bg-white p-3 sm:p-4 rounded-xl border border-gray-200 shadow-sm w-full">
                <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    Dados Pessoais
                </h3>
                
                <div class="space-y-4 w-full">
                    <div class="w-full">
                        <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Nome Completo</label>
                        <input type="text" name="name" value="${escapeHTML(client.name)}" required class="block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base box-border">
                    </div>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        <div class="w-full">
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Telefone</label>
                            <input type="tel" name="phone" value="${escapeHTML(client.phone || '')}" class="block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base box-border">
                        </div>
                        <div class="w-full">
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">E-mail</label>
                            <input type="email" name="email" value="${escapeHTML(client.email || '')}" class="block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base box-border">
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4 w-full">
                        <div class="w-full">
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Dia Nasc.</label>
                            <input type="number" name="dobDay" min="1" max="31" value="${client.dobDay || ''}" class="block w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-base text-center box-border">
                        </div>
                        <div class="w-full">
                            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Mês Nasc.</label>
                            <input type="number" name="dobMonth" min="1" max="12" value="${client.dobMonth || ''}" class="block w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-base text-center box-border">
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white p-3 sm:p-4 rounded-xl border border-gray-200 shadow-sm w-full">
                <h3 class="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    Anotações
                </h3>
                <textarea name="notes" rows="4" class="block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base box-border" placeholder="Preferências, alergias...">${escapeHTML(client.notes || '')}</textarea>
            </div>
            
            <div class="flex flex-col gap-3 pt-2 w-full">
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
            <div class="relative bg-white border rounded-xl p-3 shadow-sm mb-3 flex gap-3 cursor-pointer active:scale-[0.99] transition w-full overflow-hidden"
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
        <div class="space-y-4 w-full">
            <div class="sticky top-0 bg-gray-50 pt-2 pb-2 z-10 w-full">
                <div class="relative w-full">
                    <input type="text" id="history-search-input" 
                        class="w-full p-3 pl-10 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm" 
                        placeholder="Filtrar histórico..." 
                        value="${localState.historySearchTerm}">
                    <svg class="w-5 h-5 text-gray-400 absolute left-3 top-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
            </div>

            <div class="w-full">
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
        <div class="space-y-4 w-full">
            <div class="sticky top-0 bg-gray-50 pt-2 pb-2 z-10 w-full">
                <div class="relative w-full">
                    <input type="text" id="history-search-input" 
                        class="w-full p-3 pl-10 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm" 
                        placeholder="Buscar código da venda..." 
                        value="${localState.historySearchTerm}">
                    <svg class="w-5 h-5 text-gray-400 absolute left-3 top-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
            </div>

            <div class="space-y-3 w-full">
                ${sales.map(sale => {
                    const date = new Date(sale.date || sale.createdAt);
                    const total = sale.totalAmount || 0;
                    
                    return `
                    <div class="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center shadow-sm active:bg-gray-50 cursor-pointer w-full"
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
            <div class="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 w-full">
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
        <div class="space-y-6 w-full">
            <div class="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden w-full">
                <div class="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-4">
                    <svg class="w-40 h-40" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
                
                <p class="text-amber-100 font-bold uppercase tracking-wider text-xs mb-1">Saldo de Pontos</p>
                <div class="flex items-baseline gap-2">
                    <h1 class="text-4xl sm:text-5xl font-black">${client.loyaltyPoints || 0}</h1>
                    <span class="text-lg opacity-80">pts</span>
                </div>
                
                <button id="btn-manual-redeem" class="mt-4 w-full bg-white/20 hover:bg-white/30 text-white text-sm font-bold py-3 px-4 rounded-xl backdrop-blur-md transition border border-white/30 flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    Ajustar / Resgatar
                </button>
            </div>

            <div class="bg-white rounded-xl border border-gray-200 p-4 shadow-sm w-full">
                <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 border-b pb-2">Últimas Movimentações</h4>
                ${historyItems}
            </div>
        </div>
    `;
}

// --- 4. FUNÇÕES DE DADOS E LÓGICA ---

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
    
    try {
        const end = new Date();
        end.setMonth(end.getMonth() + 12); 
        const start = new Date();
        start.setFullYear(start.getFullYear() - 5); 

        let url = `/api/appointments/${state.establishmentId}?startDate=${start.toISOString()}&endDate=${end.toISOString()}`;
        url += `&clientPhone=${encodeURIComponent(cleanPhone(client.phone))}`;
        url += `&limit=${localState.historyLimit}`;

        const clientAppts = await authenticatedFetch(url);
        
        localState.historyData.appointments = clientAppts;

        localState.historyData.sales = clientAppts
            .filter(a => a.status === 'completed')
            .map(a => ({
                 id: a.id,
                 date: a.startTime,
                 totalAmount: a.totalAmount || 0,
                 items: a.comandaItems || a.services || [] 
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
        // Atualiza apenas se o modal estiver aberto
        if(localState.modalOpen && localState.selectedClient) {
            renderClientDetails();
        }
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

    const { modalElement, close } = showGenericModal({ 
        title: "Ajuste de Pontos", 
        contentHTML: contentHTML, 
        maxWidth: 'w-[90%] max-w-xs' 
    });

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
    
    // Modal Responsivo: 90% no mobile, max-w-sm no desktop
    const { modalElement, close } = showGenericModal({ 
        title: "Novo Cliente", 
        contentHTML: content, 
        maxWidth: 'w-[90%] max-w-sm' 
    });
    
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
        closeClientModal();
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
    localState.showFilters = false;
    localState.modalOpen = false;
    localState.filters = { search: '', inactiveDays: '', birthMonth: '', hasLoyalty: false, hasDebt: false };
    
    renderLayout(); 
    await fetchClients(); 
}