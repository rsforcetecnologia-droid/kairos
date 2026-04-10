// js/ui/clients.js

// --- 1. IMPORTAÇÕES ---
import * as clientsApi from '../api/clients.js';
import * as appointmentsApi from '../api/appointments.js';
import { getHierarchy } from '../api/establishments.js';
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
    
    // Multi-Unidades
    establishments: [],
    filterEstablishmentIds: new Set(),
    
    // Filtros e Ordenação
    filters: {
        search: '',
        inactiveDays: '',
        birthMonth: '',
        hasLoyalty: false,
        hasDebt: false,
        status: 'all' // all, novos, devendo, aniversariantes
    },
    sortConfig: {
        key: 'name', // name, contact, lastVisit, financial
        direction: 'asc' // asc, desc
    },
    
    // Seleção em Lote
    selectedIds: new Set(),
    
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
    
    modalOpen: false
};

let contentDiv = null;
let pageEventListener = null;

// --- FUNÇÕES AUXILIARES ---

const cleanPhone = (phone) => {
    if (!phone) return '';
    return String(phone).replace(/\D/g, '');
};

const parseLastVisit = (dateValue) => {
    if (!dateValue) return 'Nunca';
    let date;
    if (typeof dateValue === 'object' && (dateValue.seconds || dateValue._seconds)) {
        const seconds = dateValue.seconds || dateValue._seconds;
        date = new Date(seconds * 1000);
    } else {
        date = new Date(dateValue);
    }
    if (isNaN(date.getTime())) return 'Data Inválida';
    return date.toLocaleDateString('pt-BR');
};

const getInitials = (name) => {
    if (!name) return 'CL';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
};

// --- 3. RENDERIZAÇÃO DO LAYOUT BASE ---

export async function loadClientsPage() {
    contentDiv = document.getElementById('content');
    localState.selectedClient = null;
    localState.historyLimit = 20;
    localState.modalOpen = false;
    localState.selectedIds.clear();
    localState.filters = { search: '', inactiveDays: '', birthMonth: '', hasLoyalty: false, hasDebt: false, status: 'all' };
    localState.sortConfig = { key: 'name', direction: 'asc' };
    
    try {
        const hierarchyPayload = await getHierarchy().catch(() => ({ matrizes: [] }));
        const matrizes = hierarchyPayload.matrizes || [];
        localState.establishments = [];
        matrizes.forEach(m => {
            localState.establishments.push({ id: m.id, name: m.name, type: 'Matriz' });
            if (m.branches) {
                m.branches.forEach(b => localState.establishments.push({ id: b.id, name: b.name, type: 'Filial' }));
            }
        });
        
        if (localState.filterEstablishmentIds.size === 0) {
            localState.filterEstablishmentIds.add(state.establishmentId);
        }
    } catch (e) {
        console.error("Erro ao buscar hierarquia", e);
    }

    renderBaseLayout();
    setupEventListeners();
    await fetchClients(); 
}

function renderBaseLayout() {
    const estCheckboxes = localState.establishments.map(est => `
        <label class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border ${localState.filterEstablishmentIds.has(est.id) ? 'border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700' : 'border-slate-200 text-slate-600'} rounded-lg cursor-pointer hover:bg-slate-50 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3 h-3" value="${est.id}" ${localState.filterEstablishmentIds.has(est.id) ? 'checked' : ''}>
            <span class="text-[10px] font-bold whitespace-nowrap">${est.type === 'Matriz' ? '<i class="bi bi-building mr-1"></i>' : '<i class="bi bi-shop mr-1"></i>'} ${est.name}</span>
        </label>
    `).join('');

    contentDiv.innerHTML = `
        <section class="h-full flex flex-col p-2 md:p-4 md:pl-6 w-full relative bg-slate-50">
            
            <div id="batch-action-bar" class="hidden absolute top-4 left-4 right-4 z-30 bg-slate-900 text-white rounded-xl shadow-2xl p-2.5 items-center justify-between animate-fade-in-down">
                <div class="flex items-center gap-3">
                    <button id="cancel-selection-btn" class="p-1.5 hover:bg-slate-700 rounded-full transition-colors text-slate-300 hover:text-white">
                        <i class="bi bi-x-lg text-lg"></i>
                    </button>
                    <span class="font-bold text-sm tracking-wide"><span id="selected-count" class="text-indigo-400">0</span> Selecionados</span>
                </div>
                <button id="batch-delete-btn" class="flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg text-sm">
                    <i class="bi bi-trash3"></i> Excluir Clientes
                </button>
            </div>

            <div class="flex flex-col md:flex-row justify-end items-start md:items-center mb-3 gap-3 w-full animate-fade-in">
                <div class="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    <button id="export-excel-btn" class="py-1.5 px-3 bg-white border border-slate-300 text-emerald-700 font-bold rounded-lg hover:bg-emerald-50 transition shadow-sm flex items-center gap-2 text-xs">
                        <i class="bi bi-file-earmark-excel-fill"></i> Excel
                    </button>
                    <button data-action="new-client" class="flex-1 md:flex-none py-1.5 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-sm flex items-center justify-center gap-2 text-xs">
                        <i class="bi bi-person-plus-fill"></i> Novo Cliente
                    </button>
                </div>
            </div>

            ${localState.establishments.length > 1 ? `
            <div class="mb-3 animate-fade-in">
                <div class="flex flex-wrap gap-2" id="establishment-filters-container">
                    ${estCheckboxes}
                </div>
            </div>
            ` : ''}

            <div id="kpi-section" class="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3 animate-fade-in">
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group cursor-pointer hover:border-indigo-300 transition-colors" data-filter="all">
                    <div class="absolute right-[-10px] top-[-10px] opacity-5 group-hover:opacity-10 transition-opacity"><i class="bi bi-people-fill text-5xl"></i></div>
                    <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest z-10">Total de Clientes</span>
                    <span id="kpi-total" class="text-base md:text-xl font-black text-slate-800 mt-0.5 z-10">0</span>
                </div>
                <div class="bg-emerald-50 p-3 rounded-xl border border-emerald-100 shadow-sm flex flex-col relative overflow-hidden group cursor-pointer hover:border-emerald-300 transition-colors" data-filter="novos">
                    <div class="absolute right-[-10px] top-[-10px] opacity-10 group-hover:opacity-20 transition-opacity"><i class="bi bi-stars text-emerald-500 text-5xl"></i></div>
                    <span class="text-[9px] font-bold text-emerald-600 uppercase tracking-widest z-10">Novos (Este Mês)</span>
                    <span id="kpi-novos" class="text-base md:text-xl font-black text-emerald-700 mt-0.5 z-10">0</span>
                </div>
                <div class="bg-red-50 p-3 rounded-xl border border-red-100 shadow-sm flex flex-col relative overflow-hidden group cursor-pointer hover:border-red-300 transition-colors" data-filter="devendo">
                    <div class="absolute right-[-10px] top-[-10px] opacity-10 group-hover:opacity-20 transition-opacity"><i class="bi bi-exclamation-triangle-fill text-red-500 text-5xl"></i></div>
                    <span class="text-[9px] font-bold text-red-600 uppercase tracking-widest z-10">Com Débitos (Fiado)</span>
                    <span id="kpi-devendo" class="text-base md:text-xl font-black text-red-700 mt-0.5 z-10">0</span>
                </div>
                <div class="bg-indigo-50 p-3 rounded-xl border border-indigo-100 shadow-sm flex flex-col relative overflow-hidden group cursor-pointer hover:border-indigo-300 transition-colors" data-filter="aniversariantes">
                    <div class="absolute right-[-10px] top-[-10px] opacity-10 group-hover:opacity-20 transition-opacity"><i class="bi bi-gift-fill text-indigo-500 text-5xl"></i></div>
                    <span class="text-[9px] font-bold text-indigo-600 uppercase tracking-widest z-10">Aniversariantes (Mês)</span>
                    <span id="kpi-niver" class="text-base md:text-xl font-black text-indigo-700 mt-0.5 z-10">0</span>
                </div>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-center mb-3 gap-3 w-full bg-white p-2 rounded-xl border border-slate-200 shadow-sm animate-fade-in">
                <div class="relative w-full md:w-1/3">
                    <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-xs"></i>
                    <input type="text" id="search-input" placeholder="Buscar por nome, telefone ou CPF..." class="w-full pl-8 py-1.5 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-indigo-400 font-semibold text-slate-700 transition-colors">
                </div>
                
                <div class="flex flex-1 justify-center items-center gap-2 w-full overflow-x-auto custom-scrollbar pb-1 md:pb-0">
                    <label class="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg cursor-pointer hover:bg-amber-100 transition-all shadow-sm select-none flex-shrink-0">
                        <input type="checkbox" id="filter-loyalty" class="rounded border-amber-300 text-amber-600 focus:ring-amber-500 w-3 h-3">
                        <span class="text-[10px] font-bold whitespace-nowrap"><i class="bi bi-star-fill mr-1"></i>Com Pontos</span>
                    </label>
                    <div class="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-0.5 shadow-inner flex-shrink-0">
                        <span class="text-[10px] font-bold text-slate-500 mr-2">Ausente ></span>
                        <input type="number" id="filter-inactive" placeholder="Dias" class="w-12 py-1 bg-transparent text-xs outline-none font-bold text-indigo-600 text-center">
                    </div>
                </div>

                <div class="hidden md:block w-1/3"></div>
            </div>

            <div class="flex-1 flex flex-col min-h-0 w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in">
                <div id="table-header-container"></div>
                <div id="list-container" class="flex-1 overflow-y-auto custom-scrollbar p-2 md:p-0">
                    <div class="flex justify-center py-20"><div class="loader"></div></div>
                </div>
            </div>
        </section>
    `;
}

function renderTableHeaders() {
    const headerContainer = document.getElementById('table-header-container');
    if (!headerContainer) return;

    const getIcon = (key) => {
        if (localState.sortConfig.key !== key) return '<i class="bi bi-arrow-down-up opacity-30"></i>';
        return localState.sortConfig.direction === 'asc' ? '<i class="bi bi-arrow-up text-indigo-600 font-black"></i>' : '<i class="bi bi-arrow-down text-indigo-600 font-black"></i>';
    };

    headerContainer.innerHTML = `
        <div class="hidden md:grid grid-cols-12 gap-2 px-3 py-2 text-[9px] font-bold text-slate-500 uppercase tracking-widest items-center bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
            <div class="col-span-4 pl-2 flex items-center gap-3">
                <input type="checkbox" id="select-all-toggle" class="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" ${localState.selectedIds.size > 0 && localState.selectedIds.size === localState.clients.length ? 'checked' : ''}>
                <div class="cursor-pointer flex items-center gap-1 hover:text-indigo-600 transition-colors select-none" data-sort="name">
                    Cliente ${getIcon('name')}
                </div>
            </div>
            <div class="col-span-3 cursor-pointer flex items-center gap-1 hover:text-indigo-600 transition-colors select-none" data-sort="contact">
                Contato ${getIcon('contact')}
            </div>
            <div class="col-span-2 text-center cursor-pointer flex items-center justify-center gap-1 hover:text-indigo-600 transition-colors select-none" data-sort="lastVisit">
                Última Visita ${getIcon('lastVisit')}
            </div>
            <div class="col-span-2 text-center cursor-pointer flex items-center justify-center gap-1 hover:text-indigo-600 transition-colors select-none" data-sort="financial">
                Situação Financeira ${getIcon('financial')}
            </div>
            <div class="col-span-1 text-center">Ações</div>
        </div>
    `;
}

// --- 4. GESTÃO DE DADOS E RENDERIZAÇÃO DA LISTA ---

async function fetchClients() {
    localState.loading = true;
    const container = document.getElementById('list-container');
    if(container) container.innerHTML = '<div class="flex justify-center py-20"><div class="loader"></div></div>';
    
    try {
        const estIds = Array.from(localState.filterEstablishmentIds);
        
        const promises = estIds.map(estId => {
            let url = `/api/clients/${estId}?limit=1000`; 
            return authenticatedFetch(url).catch(() => []);
        });

        const resultsArray = await Promise.all(promises);
        const allClients = resultsArray.flat();
        
        const uniqueClients = new Map();
        allClients.forEach(c => uniqueClients.set(c.id, c));
        localState.clients = Array.from(uniqueClients.values());
        
        updateKPIs();
        renderList();
    } catch (error) {
        console.error(error);
        showNotification('Erro', 'Falha ao carregar clientes.', 'error');
        if(container) container.innerHTML = '<div class="text-center py-10 text-red-500 text-sm">Erro ao carregar dados.</div>';
    } finally {
        localState.loading = false;
    }
}

function updateKPIs() {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    
    let kpiNovos = 0;
    let kpiDevendo = 0;
    let kpiNiver = 0;

    localState.clients.forEach(c => {
        if (c.totalDebt && parseFloat(c.totalDebt) > 0) kpiDevendo++;
        if (c.dobMonth == currentMonth) kpiNiver++;
        if (c.createdAt) {
            const cDate = new Date(c.createdAt);
            if (cDate.getMonth() + 1 === currentMonth && cDate.getFullYear() === currentYear) kpiNovos++;
        }
    });

    document.getElementById('kpi-total').textContent = localState.clients.length;
    document.getElementById('kpi-novos').textContent = kpiNovos;
    document.getElementById('kpi-devendo').textContent = kpiDevendo;
    document.getElementById('kpi-niver').textContent = kpiNiver;
}

function renderList() {
    renderTableHeaders();
    
    const container = document.getElementById('list-container');
    let filteredList = localState.clients;

    // Filtros
    if (localState.filters.search) {
        const query = localState.filters.search.toLowerCase();
        filteredList = filteredList.filter(c => 
            c.name.toLowerCase().includes(query) || 
            (c.phone && c.phone.includes(query)) ||
            (c.cpf && c.cpf.includes(query))
        );
    }
    if (localState.filters.status === 'devendo') {
        filteredList = filteredList.filter(c => c.totalDebt && parseFloat(c.totalDebt) > 0);
    } else if (localState.filters.status === 'aniversariantes') {
        const currentMonth = new Date().getMonth() + 1;
        filteredList = filteredList.filter(c => c.dobMonth == currentMonth);
    } else if (localState.filters.status === 'novos') {
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        filteredList = filteredList.filter(c => {
            if(!c.createdAt) return false;
            const d = new Date(c.createdAt);
            return d.getMonth() + 1 === currentMonth && d.getFullYear() === currentYear;
        });
    }
    if (localState.filters.hasLoyalty) {
        filteredList = filteredList.filter(c => c.loyaltyPoints && c.loyaltyPoints > 0);
    }
    if (localState.filters.inactiveDays) {
        const days = parseInt(localState.filters.inactiveDays);
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        filteredList = filteredList.filter(c => {
            if (!c.lastVisit && !c.createdAt) return false;
            let lastD;
            if (c.lastVisit) {
                const s = c.lastVisit.seconds || c.lastVisit._seconds;
                lastD = s ? new Date(s * 1000) : new Date(c.lastVisit);
            } else {
                lastD = new Date(c.createdAt);
            }
            return lastD < cutoffDate;
        });
    }

    // Ordenação (Sorting)
    filteredList.sort((a, b) => {
        let valA, valB;
        switch(localState.sortConfig.key) {
            case 'name': 
                valA = (a.name || '').toLowerCase(); valB = (b.name || '').toLowerCase(); 
                return localState.sortConfig.direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
            case 'contact': 
                valA = a.phone || ''; valB = b.phone || ''; 
                return localState.sortConfig.direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
            case 'lastVisit':
                valA = a.lastVisit ? (a.lastVisit.seconds ? a.lastVisit.seconds : new Date(a.lastVisit).getTime()/1000) : (a.createdAt ? new Date(a.createdAt).getTime()/1000 : 0);
                valB = b.lastVisit ? (b.lastVisit.seconds ? b.lastVisit.seconds : new Date(b.lastVisit).getTime()/1000) : (b.createdAt ? new Date(b.createdAt).getTime()/1000 : 0);
                break;
            case 'financial':
                valA = parseFloat(a.totalDebt) || 0;
                valB = parseFloat(b.totalDebt) || 0;
                break;
            default: valA = a.name; valB = b.name;
        }
        if (valA < valB) return localState.sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return localState.sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    if (filteredList.length === 0) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center py-20 text-center">
                <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-people text-xl text-slate-300"></i>
                </div>
                <h3 class="text-sm font-bold text-slate-700 mb-1">Nenhum cliente encontrado</h3>
                <p class="text-[10px] text-slate-400 max-w-xs">Tente ajustar a busca ou os filtros ativos.</p>
            </div>`;
        return;
    }

    container.innerHTML = filteredList.map(client => {
        const hasDebt = client.totalDebt && parseFloat(client.totalDebt) > 0;
        const lastVisit = parseLastVisit(client.lastVisit);
        const wappNumber = cleanPhone(client.phone);
        const currentMonth = new Date().getMonth() + 1;
        const isBirthday = client.dobMonth == currentMonth;
        const isSelected = localState.selectedIds.has(client.id);

        let tagsHTML = '';
        if (isBirthday) tagsHTML += `<span class="bg-indigo-100 text-indigo-700 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">🎂 Aniversariante</span> `;
        if (client.loyaltyPoints > 0) tagsHTML += `<span class="bg-amber-100 text-amber-700 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider"><i class="bi bi-star-fill"></i> ${client.loyaltyPoints} pts</span> `;

        return `
        <div class="border-b border-slate-100 hover:bg-slate-50/80 transition-colors relative group flex flex-col md:grid md:grid-cols-12 md:gap-2 md:items-center p-3 md:px-3 md:py-2 mb-2 md:mb-0 bg-white md:bg-transparent rounded-xl md:rounded-none shadow-sm md:shadow-none border md:border-b ${hasDebt ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-transparent hover:border-l-indigo-400'} ${isSelected ? 'bg-indigo-50/50' : ''} cursor-pointer" data-action="open-modal" data-id="${client.id}">
            
            <div class="flex justify-between items-start md:hidden mb-2 relative">
                <div class="absolute -top-1 -right-1 z-20">
                    <input type="checkbox" value="${client.id}" class="item-checkbox w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${isSelected ? 'checked' : ''}>
                </div>
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full ${hasDebt ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-600'} flex items-center justify-center font-bold text-xs flex-shrink-0">
                        ${getInitials(client.name)}
                    </div>
                    <div class="pr-6">
                        <p class="font-bold text-xs text-slate-800 truncate max-w-[180px]">${escapeHTML(client.name)}</p>
                        <p class="text-[9px] text-slate-400 font-medium">${escapeHTML(client.phone || 'Sem contato')}</p>
                    </div>
                </div>
                ${wappNumber ? `<button data-action="whatsapp" data-phone="${wappNumber}" class="w-7 h-7 mt-5 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors"><i class="bi bi-whatsapp text-xs"></i></button>` : ''}
            </div>

            <div class="hidden md:flex md:col-span-4 items-center gap-3 pl-1">
                <input type="checkbox" value="${client.id}" class="item-checkbox w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm z-20 flex-shrink-0" ${isSelected ? 'checked' : ''}>
                <div class="w-8 h-8 rounded-full ${hasDebt ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-600'} flex items-center justify-center font-bold text-xs flex-shrink-0">
                    ${getInitials(client.name)}
                </div>
                <div class="min-w-0">
                    <p class="font-bold text-xs text-slate-800 truncate" title="${escapeHTML(client.name)}">${escapeHTML(client.name)}</p>
                    <div class="flex gap-1 mt-0.5">${tagsHTML}</div>
                </div>
            </div>

            <div class="hidden md:block md:col-span-3">
                <p class="text-[10px] font-bold text-slate-600">${escapeHTML(client.phone || '--')}</p>
                <p class="text-[9px] text-slate-400 truncate w-full" title="${escapeHTML(client.email || '')}">${escapeHTML(client.email || '--')}</p>
            </div>

            <div class="md:col-span-2 md:text-center flex justify-between md:block items-center mb-1 md:mb-0">
                <span class="md:hidden text-[9px] font-bold text-slate-400 uppercase tracking-widest">Última Visita:</span>
                <span class="text-[10px] font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                    <i class="bi bi-calendar-check opacity-50 mr-1"></i> ${lastVisit}
                </span>
            </div>

            <div class="md:col-span-2 md:text-center flex justify-between md:block items-center mb-1 md:mb-0">
                <span class="md:hidden text-[9px] font-bold text-slate-400 uppercase tracking-widest">Situação:</span>
                ${hasDebt 
                    ? `<span class="text-[10px] font-black text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-100">Débito: R$ ${parseFloat(client.totalDebt).toFixed(2)}</span>`
                    : `<span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">Em dia</span>`
                }
            </div>

            <div class="hidden md:flex md:col-span-1 justify-center gap-1">
                ${wappNumber ? `<button data-action="whatsapp" data-phone="${wappNumber}" class="w-7 h-7 rounded-md flex items-center justify-center text-[#25D366] bg-[#25D366]/10 hover:bg-[#25D366] hover:text-white transition-colors border border-[#25D366]/20 shadow-sm z-20" title="WhatsApp"><i class="bi bi-whatsapp text-[10px]"></i></button>` : ''}
                <button class="w-7 h-7 rounded-md flex items-center justify-center text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors border border-indigo-100 shadow-sm" title="Perfil Completo"><i class="bi bi-arrow-right-short"></i></button>
            </div>
            
            <div class="md:hidden flex gap-1 mt-2 border-t border-slate-50 pt-2">
                ${tagsHTML}
            </div>
        </div>
        `;
    }).join('');
}

// --- 5. EVENTOS GERAIS DA TELA E LOTE ---

function setupEventListeners() {
    if (pageEventListener) contentDiv.removeEventListener('click', pageEventListener);

    pageEventListener = (e) => {
        const target = e.target;

        // Checkbox individual da lista
        if (target.classList.contains('item-checkbox')) {
            const id = target.value;
            if(target.checked) localState.selectedIds.add(id);
            else localState.selectedIds.delete(id);
            updateBatchActionBar();
            e.stopPropagation(); // Impede abrir o modal
            return;
        }

        // Checkbox de Select All (Topo da tabela)
        if (target.id === 'select-all-toggle') {
            const isChecked = target.checked;
            const allCheckboxes = document.querySelectorAll('.item-checkbox');
            localState.selectedIds.clear();
            allCheckboxes.forEach(cb => {
                cb.checked = isChecked;
                if(isChecked) localState.selectedIds.add(cb.value);
            });
            updateBatchActionBar();
            e.stopPropagation();
            return;
        }

        // Ordenação pelas Colunas
        const sortEl = target.closest('[data-sort]');
        if (sortEl) {
            const key = sortEl.dataset.sort;
            if (localState.sortConfig.key === key) {
                localState.sortConfig.direction = localState.sortConfig.direction === 'asc' ? 'desc' : 'asc';
            } else {
                localState.sortConfig.key = key;
                localState.sortConfig.direction = 'asc';
            }
            renderList();
            return;
        }

        // Ações Rápidas (Cards / Botões)
        const actionEl = target.closest('[data-action]');
        if (actionEl) {
            const action = actionEl.dataset.action;
            const id = actionEl.dataset.id;

            if (action === 'new-client') {
                openUnifiedModal(null);
                return;
            }
            if (action === 'open-modal') {
                openUnifiedModal(id);
                return;
            }
            if (action === 'whatsapp') {
                e.stopPropagation(); 
                const phone = actionEl.dataset.phone;
                window.open(`https://wa.me/55${phone}`, '_blank');
                return;
            }
            if (action === 'export-excel') {
                handleExportExcel();
                return;
            }
        }

        // Filtros Rápidos (KPIs)
        const filterKpi = target.closest('[data-filter]');
        if (filterKpi) {
            document.querySelectorAll('[data-filter]').forEach(el => el.classList.remove('ring-2', 'ring-offset-1', 'ring-indigo-400'));
            filterKpi.classList.add('ring-2', 'ring-offset-1', 'ring-indigo-400');
            localState.filters.status = filterKpi.dataset.filter;
            renderList();
        }
    };

    contentDiv.addEventListener('click', pageEventListener);

    // Botão Cancelar Lote
    const cancelBtn = document.getElementById('cancel-selection-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            localState.selectedIds.clear();
            const toggle = document.getElementById('select-all-toggle');
            if(toggle) toggle.checked = false;
            document.querySelectorAll('.item-checkbox').forEach(cb => cb.checked = false);
            updateBatchActionBar();
        });
    }

    // Botão Excluir em Lote
    const batchDeleteBtn = document.getElementById('batch-delete-btn');
    if (batchDeleteBtn) batchDeleteBtn.addEventListener('click', handleBatchDelete);

    document.querySelectorAll('.est-filter-checkbox').forEach(cb => {
        cb.addEventListener('change', (e) => {
            const label = e.target.closest('label');
            if (e.target.checked) {
                localState.filterEstablishmentIds.add(e.target.value);
                label.classList.add('border-indigo-500', 'ring-1', 'ring-indigo-500', 'bg-indigo-50/20', 'text-indigo-700');
                label.classList.remove('border-slate-200', 'text-slate-600');
            } else {
                localState.filterEstablishmentIds.delete(e.target.value);
                label.classList.remove('border-indigo-500', 'ring-1', 'ring-indigo-500', 'bg-indigo-50/20', 'text-indigo-700');
                label.classList.add('border-slate-200', 'text-slate-600');
            }
            fetchClients(); 
        });
    });

    const searchInput = document.getElementById('search-input');
    if(searchInput) searchInput.addEventListener('input', (e) => { localState.filters.search = e.target.value; renderList(); });

    const inactiveInput = document.getElementById('filter-inactive');
    if(inactiveInput) inactiveInput.addEventListener('input', (e) => { localState.filters.inactiveDays = e.target.value; renderList(); });

    const loyaltyCheck = document.getElementById('filter-loyalty');
    if(loyaltyCheck) loyaltyCheck.addEventListener('change', (e) => { localState.filters.hasLoyalty = e.target.checked; renderList(); });
}

function updateBatchActionBar() {
    const bar = document.getElementById('batch-action-bar');
    const countSpan = document.getElementById('selected-count');
    if(!bar || !countSpan) return;

    const count = localState.selectedIds.size;
    countSpan.textContent = count;

    if (count > 0) {
        bar.classList.remove('hidden');
        bar.classList.add('flex');
    } else {
        bar.classList.add('hidden');
        bar.classList.remove('flex');
    }
}

async function handleBatchDelete() {
    const count = localState.selectedIds.size;
    if(count === 0) return;

    const confirmed = await showConfirmation('Excluir Clientes', `Deseja realmente excluir permanentemente ${count} cliente(s)? Esta ação não pode ser desfeita.`);
    if (!confirmed) return;

    try {
        const deletePromises = Array.from(localState.selectedIds).map(id => clientsApi.deleteClient(id));
        await Promise.all(deletePromises);
        
        showNotification('Sucesso', `${count} cliente(s) excluído(s) com sucesso.`, 'success');
        localState.selectedIds.clear();
        updateBatchActionBar();
        const selectAllToggle = document.getElementById('select-all-toggle');
        if(selectAllToggle) selectAllToggle.checked = false;
        
        await fetchClients();
    } catch (error) {
        showNotification('Erro ao Excluir', 'Ocorreu um erro ao excluir alguns clientes.', 'error');
    }
}

// --- 6. O MODAL UNIFICADO LAGO E OFICIAL ---

function openUnifiedModal(clientId = null) {
    if (clientId) {
        localState.selectedClient = localState.clients.find(c => c.id === clientId);
        localState.selectedClient.isNew = false;
    } else {
        localState.selectedClient = { 
            isNew: true, id: '', name: '', phone: '', email: '', cpf: '', 
            gender: '', dobDay: '', dobMonth: '', source: '', notes: '', 
            loyaltyPoints: 0, totalDebt: 0 
        };
    }

    localState.activeTab = 'profile'; 
    localState.historyData = { appointments: [], sales: [], loyaltyLog: [] };
    
    let modalOverlay = document.getElementById('client-details-modal-overlay');
    if (!modalOverlay) {
        modalOverlay = document.createElement('div');
        modalOverlay.id = 'client-details-modal-overlay';
        modalOverlay.className = 'fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm sm:p-4 animate-fade-in';
        modalOverlay.innerHTML = `<div class="bg-white w-full sm:w-[90vw] h-[90vh] sm:h-auto sm:max-h-[90vh] sm:max-w-4xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col relative animate-slide-up sm:animate-scale-in rounded-t-2xl" id="client-modal-content"></div>`;
        modalOverlay.onclick = (e) => { if(e.target === modalOverlay) closeClientModal(); };
        document.body.appendChild(modalOverlay);
        document.body.classList.add('overflow-hidden');
    }
    
    const modalContent = modalOverlay.querySelector('#client-modal-content');
    modalContent.innerHTML = getClientDetailsHTML(localState.selectedClient);
    attachDetailsEvents(modalContent, localState.selectedClient);
}

function closeClientModal() {
    const modal = document.getElementById('client-details-modal-overlay');
    if (modal) modal.remove();
    document.body.classList.remove('overflow-hidden');
    localState.modalOpen = false;
    localState.selectedClient = null;
    renderList();
}

function getClientDetailsHTML(client) {
    const isNew = client.isNew;

    const tabsHTML = `
        <div class="bg-white border-b border-slate-200 sticky top-0 z-10 w-full flex overflow-x-auto custom-scrollbar gap-2 px-4 sm:px-6 py-3">
            <button class="tab-btn ${localState.activeTab === 'profile' ? 'active bg-indigo-600 text-white shadow-md border-transparent' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'} border px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all" data-tab="profile">👤 Perfil e Dados</button>
            ${!isNew ? `
            <button class="tab-btn ${localState.activeTab === 'appointments' ? 'active bg-indigo-600 text-white shadow-md border-transparent' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'} border px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all" data-tab="appointments">📅 Agendamentos</button>
            <button class="tab-btn ${localState.activeTab === 'history' ? 'active bg-indigo-600 text-white shadow-md border-transparent' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'} border px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all" data-tab="history">💰 Finanças</button>
            <button class="tab-btn ${localState.activeTab === 'loyalty' ? 'active bg-indigo-600 text-white shadow-md border-transparent' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'} border px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all" data-tab="loyalty">⭐ Fidelidade</button>
            ` : ''}
        </div>
    `;

    let contentHTML = '';
    if (localState.activeTab === 'profile') contentHTML = renderProfileTab(client);
    else if (localState.activeTab === 'appointments') contentHTML = renderAppointmentsTab(client);
    else if (localState.activeTab === 'history') contentHTML = renderHistoryTab(client);
    else if (localState.activeTab === 'loyalty') contentHTML = renderLoyaltyTab(client);

    return `
        <div class="w-full bg-slate-50 min-h-full flex flex-col overflow-hidden">
            <div class="bg-indigo-600 px-4 py-5 sm:px-6 sm:py-6 text-white relative flex-shrink-0 w-full shadow-md z-20">
                <button id="btn-close-modal" class="absolute top-4 right-4 text-indigo-200 hover:text-white transition z-50">
                    <i class="bi bi-x-lg text-xl sm:text-2xl"></i>
                </button>

                <div class="flex items-center gap-4 sm:gap-6">
                    <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-indigo-600 flex items-center justify-center text-3xl font-black shadow-lg flex-shrink-0">
                        ${isNew ? '<i class="bi bi-person-plus-fill"></i>' : getInitials(client.name)}
                    </div>
                    <div class="flex-grow min-w-0 pr-8">
                        <h2 class="text-xl sm:text-2xl font-black leading-tight truncate">${isNew ? 'Novo Cliente' : escapeHTML(client.name)}</h2>
                        <p class="text-xs sm:text-sm text-indigo-200 mt-1 truncate">
                            ${isNew ? 'Preencha as informações do novo registo' : `<i class="bi bi-whatsapp mr-1"></i>${client.phone || 'Sem telefone'}`}
                        </p>
                        ${(!isNew && client.totalDebt && client.totalDebt > 0) ? `<span class="inline-block mt-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-red-400 shadow-sm">Dívida Ativa: R$ ${parseFloat(client.totalDebt).toFixed(2)}</span>` : ''}
                    </div>
                </div>
            </div>
            
            ${tabsHTML}
            
            <div class="p-4 sm:p-6 flex-grow overflow-y-auto custom-scrollbar relative bg-slate-50 w-full">
                ${localState.historyLoading ? '<div class="absolute inset-0 bg-white/80 flex items-center justify-center z-20"><div class="loader"></div></div>' : ''}
                <div class="animate-fade-in w-full pb-10">${contentHTML}</div>
            </div>
        </div>
    `;
}

function renderProfileTab(client) {
    return `
        <form id="form-edit-client" class="space-y-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                    <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4 border-b border-slate-100 pb-2"><i class="bi bi-person-vcard text-indigo-500 mr-2"></i> Dados Pessoais</h3>
                    
                    <div>
                        <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nome Completo *</label>
                        <input type="text" name="name" value="${escapeHTML(client.name)}" required class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:border-indigo-400 focus:bg-white transition-colors">
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">WhatsApp *</label>
                            <input type="tel" name="phone" value="${escapeHTML(client.phone || '')}" required class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:border-indigo-400 focus:bg-white transition-colors">
                        </div>
                        <div>
                            <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">CPF</label>
                            <input type="text" name="cpf" value="${escapeHTML(client.cpf || '')}" placeholder="000.000.000-00" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:border-indigo-400 focus:bg-white transition-colors">
                        </div>
                    </div>

                    <div>
                        <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">E-mail</label>
                        <input type="email" name="email" value="${escapeHTML(client.email || '')}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:border-indigo-400 focus:bg-white transition-colors">
                    </div>
                </div>

                <div class="space-y-6">
                    <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4 border-b border-slate-100 pb-2"><i class="bi bi-info-circle text-indigo-500 mr-2"></i> Informações Adicionais</h3>
                        
                        <div class="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Dia Nasc.</label>
                                <input type="number" name="dobDay" min="1" max="31" value="${client.dobDay || ''}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:border-indigo-400 focus:bg-white text-center transition-colors">
                            </div>
                            <div>
                                <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Mês Nasc.</label>
                                <input type="number" name="dobMonth" min="1" max="12" value="${client.dobMonth || ''}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:border-indigo-400 focus:bg-white text-center transition-colors">
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Gênero</label>
                                <select name="gender" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:border-indigo-400 focus:bg-white transition-colors">
                                    <option value="">Não informar</option>
                                    <option value="F" ${client.gender === 'F' ? 'selected' : ''}>Feminino</option>
                                    <option value="M" ${client.gender === 'M' ? 'selected' : ''}>Masculino</option>
                                    <option value="O" ${client.gender === 'O' ? 'selected' : ''}>Outro</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Captação</label>
                                <select name="source" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:border-indigo-400 focus:bg-white transition-colors">
                                    <option value="">Como conheceu?</option>
                                    <option value="Instagram" ${client.source === 'Instagram' ? 'selected' : ''}>Instagram / Redes Sociais</option>
                                    <option value="Indicacao" ${client.source === 'Indicacao' ? 'selected' : ''}>Indicação (Amigo)</option>
                                    <option value="Passagem" ${client.source === 'Passagem' ? 'selected' : ''}>Fachada / Passagem</option>
                                    <option value="Google" ${client.source === 'Google' ? 'selected' : ''}>Google</option>
                                    <option value="Outros" ${client.source === 'Outros' ? 'selected' : ''}>Outros</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3 border-b border-slate-100 pb-2"><i class="bi bi-journal-text text-indigo-500 mr-2"></i> Anotações Internas</h3>
                        <textarea name="notes" rows="3" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:border-indigo-400 focus:bg-white transition-colors" placeholder="Preferências, histórico de alergias, como gosta do serviço...">${escapeHTML(client.notes || '')}</textarea>
                    </div>
                </div>
            </div>

            <div class="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-slate-200">
                
                <button type="submit" class="w-full sm:w-auto bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold shadow-md hover:bg-indigo-700 transition flex items-center justify-center gap-2 text-sm">
                    <i class="bi bi-check2-circle text-xl"></i> ${client.isNew ? 'Cadastrar Cliente' : 'Salvar Alterações'}
                </button>
            </div>
        </form>
    `;
}

function renderAppointmentsTab(client) {
    let appointments = localState.historyData.appointments || [];
    appointments.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

    return `
        <div class="space-y-2">
            ${appointments.length ? appointments.map(appt => {
                const date = new Date(appt.startTime);
                const isPast = date < new Date();
                let statusBadge = isPast ? '<span class="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase border border-slate-200">Concluído</span>' : '<span class="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase border border-emerald-200">Agendado</span>';
                if (appt.status === 'cancelled') statusBadge = '<span class="bg-red-100 text-red-600 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase border border-red-200">Cancelado</span>';

                return `
                <div class="bg-white border border-slate-200 rounded-xl p-3 flex gap-3 shadow-sm items-center cursor-pointer hover:bg-slate-50 transition-colors" data-go-agenda="true" data-id="${appt.id}" data-date="${appt.startTime}">
                    <div class="flex-shrink-0 text-center w-12 border-r border-slate-100 pr-2">
                        <span class="block text-[9px] font-bold text-slate-400 uppercase">${date.toLocaleDateString('pt-BR', {month:'short'})}</span>
                        <span class="block text-lg font-black text-slate-800 leading-none">${date.getDate()}</span>
                    </div>
                    <div class="flex-grow min-w-0">
                        <p class="font-bold text-xs text-slate-800 truncate">${escapeHTML(appt.serviceName || 'Serviço')}</p>
                        <p class="text-[9px] text-slate-400 truncate">Com: ${escapeHTML(appt.professionalName || 'N/A')} às ${date.toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'})}</p>
                    </div>
                    <div class="flex-shrink-0 text-right">
                        ${statusBadge}
                    </div>
                </div>`;
            }).join('') : '<div class="text-center py-10 bg-white rounded-xl border border-slate-200"><p class="text-[11px] text-slate-400 font-medium">Nenhum agendamento encontrado.</p></div>'}
        </div>
    `;
}

function renderHistoryTab(client) {
    let sales = localState.historyData.sales || [];
    sales.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const totalLTV = sales.reduce((acc, s) => acc + (Number(s.totalAmount) || 0), 0);
    const ticketMedio = sales.length > 0 ? (totalLTV / sales.length) : 0;

    return `
        <div class="space-y-4">
            <div class="grid grid-cols-2 gap-3 mb-2">
                <div class="bg-emerald-50 p-4 rounded-xl border border-emerald-100 shadow-sm flex flex-col text-center">
                    <span class="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Valor Vitalício (LTV)</span>
                    <span class="text-xl sm:text-2xl font-black text-emerald-700 mt-1">${formatCurrency(totalLTV)}</span>
                </div>
                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col text-center">
                    <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Ticket Médio</span>
                    <span class="text-xl sm:text-2xl font-black text-slate-800 mt-1">${formatCurrency(ticketMedio)}</span>
                </div>
            </div>

            <div class="space-y-2">
                <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 pl-1">Histórico de Recibos</h4>
                ${sales.length ? sales.map(sale => `
                <div class="bg-white border border-slate-200 rounded-xl p-3 flex justify-between items-center shadow-sm hover:bg-slate-50 cursor-pointer transition-colors" data-go-comanda="true" data-id="${sale.id}">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-sm"><i class="bi bi-receipt"></i></div>
                        <div>
                            <p class="font-bold text-slate-800 text-[11px] sm:text-xs">Venda #${sale.id.slice(-5).toUpperCase()}</p>
                            <p class="text-[9px] text-slate-400">${new Date(sale.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="font-black text-emerald-600 text-xs sm:text-sm">${formatCurrency(sale.totalAmount)}</p>
                        <p class="text-[8px] sm:text-[9px] text-indigo-500 font-bold uppercase mt-0.5">Ver Comanda <i class="bi bi-chevron-right"></i></p>
                    </div>
                </div>`).join('') : '<div class="text-center py-8 bg-white rounded-xl border border-slate-200"><p class="text-[10px] text-slate-400">Nenhum histórico financeiro.</p></div>'}
            </div>
        </div>
    `;
}

function renderLoyaltyTab(client) {
    const log = localState.historyData.loyaltyLog || [];
    log.sort((a, b) => new Date(b.date) - new Date(a.date));

    return `
        <div class="space-y-4">
            <div class="bg-amber-400 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden flex flex-col items-center justify-center text-center">
                <div class="absolute right-[-20px] top-[-20px] opacity-20"><i class="bi bi-star-fill text-9xl"></i></div>
                <p class="text-amber-100 font-bold uppercase tracking-wider text-[10px] sm:text-xs mb-1 z-10">Saldo de Pontos</p>
                <h1 class="text-6xl sm:text-7xl font-black z-10 drop-shadow-md">${client.loyaltyPoints || 0}</h1>
                
                <button id="btn-manual-redeem" type="button" class="mt-6 bg-white/20 hover:bg-white/30 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider py-2 px-6 rounded-lg backdrop-blur-sm transition border border-white/30 flex items-center gap-2 z-10 shadow-sm">
                    <i class="bi bi-sliders"></i> Ajustar Manualmente
                </button>
            </div>

            <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div class="bg-slate-50 p-3 border-b border-slate-200"><h4 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Extrato de Pontos</h4></div>
                <div class="p-2 space-y-1 max-h-64 overflow-y-auto custom-scrollbar">
                    ${log.length > 0 ? log.map(entry => {
                        const isRedemption = entry.type === 'redemption';
                        return `
                        <div class="flex justify-between items-center py-2 px-3 border-b border-slate-50 last:border-0">
                            <div>
                                <p class="text-[11px] font-bold text-slate-700">${escapeHTML(entry.description || (isRedemption ? 'Resgate' : 'Acúmulo'))}</p>
                                <p class="text-[9px] text-slate-400">${new Date(entry.date).toLocaleDateString()}</p>
                            </div>
                            <span class="font-black text-xs ${isRedemption ? 'text-red-500' : 'text-amber-500'}">
                                ${isRedemption ? '-' : '+'}${entry.points}
                            </span>
                        </div>`;
                    }).join('') : '<p class="text-center text-slate-400 py-6 text-[10px]">Sem movimentações.</p>'}
                </div>
            </div>
        </div>
    `;
}

// --- INTEGRAÇÃO DO MODAL COM EVENTOS ---

function attachDetailsEvents(modalContent, client) {
    modalContent.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = async () => {
            const newTab = btn.dataset.tab;
            if (localState.activeTab === newTab) return;
            localState.activeTab = newTab;
            
            const modalDOM = document.getElementById('client-modal-content');
            if(modalDOM) {
                modalDOM.innerHTML = getClientDetailsHTML(client);
                attachDetailsEvents(modalDOM, client);
            }

            if (newTab !== 'profile' && !localState.historyLoading && localState.historyData.appointments.length === 0) {
                 await fetchClientHistory(client.id);
            }
        };
    });

    if (localState.activeTab === 'profile') {
        const form = modalContent.querySelector('#form-edit-client');
        if(form) form.onsubmit = handleSaveClient;
        const btnDel = modalContent.querySelector('#btn-delete-client');
        if(btnDel) btnDel.onclick = handleDeleteClient;
    }
    
    if (localState.activeTab === 'loyalty') {
        const btnRedeem = modalContent.querySelector('#btn-manual-redeem');
        if(btnRedeem) btnRedeem.onclick = () => openManualRedemptionModal(client);
    }

    modalContent.querySelectorAll('[data-go-agenda]').forEach(btn => {
        btn.onclick = () => {
            closeClientModal(); 
            navigateTo('agenda-section', { targetDate: new Date(btn.dataset.date), scrollToAppointmentId: btn.dataset.id });
        };
    });

    modalContent.querySelectorAll('[data-go-comanda]').forEach(btn => {
        btn.onclick = () => {
            closeClientModal();
            navigateTo('comandas-section', { selectedAppointmentId: btn.dataset.id, initialFilter: 'finalizadas' });
        };
    });

    const btnClose = modalContent.querySelector('#btn-close-modal');
    if(btnClose) btnClose.onclick = closeClientModal;
}

async function fetchClientHistory(clientId) {
    const client = localState.selectedClient;
    if (!client || !client.phone) return; 

    localState.historyLoading = true;
    const modalDOM = document.getElementById('client-modal-content');
    if(modalDOM) {
        modalDOM.innerHTML = getClientDetailsHTML(client);
        attachDetailsEvents(modalDOM, client);
    }
    
    try {
        const end = new Date(); end.setMonth(end.getMonth() + 12); 
        const start = new Date(); start.setFullYear(start.getFullYear() - 5); 

        let url = `/api/appointments/${state.establishmentId}?startDate=${start.toISOString()}&endDate=${end.toISOString()}&clientPhone=${encodeURIComponent(cleanPhone(client.phone))}&limit=50`;
        const clientAppts = await authenticatedFetch(url);
        
        localState.historyData.appointments = clientAppts;
        localState.historyData.sales = clientAppts.filter(a => a.status === 'completed').map(a => ({ id: a.id, date: a.startTime, totalAmount: a.totalAmount || 0, items: a.comandaItems || a.services || [] }));

        const loyaltyLog = [];
        clientAppts.forEach(appt => {
            if (appt.status === 'completed' && appt.loyaltyPointsEarned > 0) loyaltyLog.push({ type: 'earn', points: appt.loyaltyPointsEarned, date: appt.startTime, description: 'Venda finalizada' });
            if (appt.loyaltyRedemption) loyaltyLog.push({ type: 'redemption', points: appt.loyaltyRedemption.cost || 0, date: appt.startTime, description: `Resgate: ${appt.loyaltyRedemption.name}` });
        });
        localState.historyData.loyaltyLog = loyaltyLog;
    } catch (e) {
        console.error("Erro histórico", e);
    } finally {
        localState.historyLoading = false;
        const modalDOMFinal = document.getElementById('client-modal-content');
        if(modalDOMFinal && localState.selectedClient) {
            modalDOMFinal.innerHTML = getClientDetailsHTML(localState.selectedClient);
            attachDetailsEvents(modalDOMFinal, localState.selectedClient);
        }
    }
}

async function handleSaveClient(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.establishmentId = state.establishmentId; 
    
    if (data.dobDay) data.dobDay = parseInt(data.dobDay);
    if (data.dobMonth) data.dobMonth = parseInt(data.dobMonth);

    try {
        if (localState.selectedClient.isNew) {
            const newClient = await clientsApi.createClient(data);
            localState.clients.unshift(newClient); 
            showNotification('Sucesso', 'Cliente cadastrado com sucesso!', 'success');
            
            localState.selectedClient = newClient;
            openUnifiedModal(newClient.id);
            
        } else {
            await clientsApi.updateClient(localState.selectedClient.id, data);
            Object.assign(localState.selectedClient, data);
            const idx = localState.clients.findIndex(c => c.id === localState.selectedClient.id);
            if (idx !== -1) localState.clients[idx] = localState.selectedClient;
            showNotification('Sucesso', 'Dados salvos com sucesso!', 'success');
            
            // Re-render modal silently
            const modalDOM = document.getElementById('client-modal-content');
            if(modalDOM) {
                modalDOM.innerHTML = getClientDetailsHTML(localState.selectedClient);
                attachDetailsEvents(modalDOM, localState.selectedClient);
            }
        }
        updateKPIs();
        renderList();
    } catch (err) { showNotification('Erro', err.message, 'error'); }
}

async function handleDeleteClient() {
    if (!await showConfirmation('Excluir Cliente', 'Tem certeza? O histórico será apagado e não pode ser desfeito.')) return;
    try {
        await clientsApi.deleteClient(localState.selectedClient.id);
        localState.clients = localState.clients.filter(c => c.id !== localState.selectedClient.id);
        localState.selectedClient = null;
        showNotification('Sucesso', 'Cliente removido com sucesso.', 'success');
        closeClientModal();
        updateKPIs();
        renderList();
    } catch (err) { showNotification('Erro', err.message, 'error'); }
}

function openManualRedemptionModal(client) {
    const currentPoints = client.loyaltyPoints || 0;
    const contentHTML = `
        <div class="text-center mb-4">
            <p class="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Saldo Atual</p>
            <h2 class="text-3xl font-black text-amber-500">${currentPoints}</h2>
        </div>
        <form id="manual-redeem-form" class="space-y-3">
            <div>
                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Ação</label>
                <select id="redeem-action" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 outline-none focus:border-indigo-400">
                    <option value="debit">Remover Pontos (Resgate / Uso)</option>
                    <option value="credit">Adicionar Pontos (Bônus / Correção)</option>
                </select>
            </div>
            <div>
                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Quantidade</label>
                <input type="number" id="redeem-points" min="1" required class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-black text-slate-800 text-center outline-none focus:border-indigo-400" placeholder="Ex: 50">
            </div>
            <div>
                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Motivo/Obs</label>
                <input type="text" id="redeem-reason" required class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 outline-none focus:border-indigo-400" placeholder="Ex: Brinde especial">
            </div>
            <div class="pt-2">
                <button type="submit" class="w-full bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-bold shadow-sm hover:bg-indigo-700 active:scale-95 transition text-xs">Confirmar Ajuste</button>
            </div>
        </form>
    `;

    const { modalElement, close } = showGenericModal({ title: "Ajuste de Pontos", contentHTML: contentHTML, maxWidth: 'w-[90%] max-w-xs' });

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
            localState.historyData.loyaltyLog.unshift({ type: action === 'debit' ? 'redemption' : 'earn', points: pointsInput, date: new Date().toISOString(), description: reason + ' (Manual)' });

            showNotification('Sucesso', 'Saldo atualizado.', 'success');
            close();
            
            const modalDOM = document.getElementById('client-modal-content');
            if(modalDOM && localState.selectedClient) {
                modalDOM.innerHTML = getClientDetailsHTML(localState.selectedClient);
                attachDetailsEvents(modalDOM, localState.selectedClient);
            }
            renderList();

        } catch (error) { showNotification('Erro', error.message, 'error'); }
    };
}

function handleExportExcel() {
    if (typeof XLSX === 'undefined') return showNotification('Erro', 'Biblioteca de exportação não carregada.', 'error');
    if (localState.clients.length === 0) return showNotification('Aviso', 'Nenhum cliente para exportar.', 'info');

    const exportData = localState.clients.map(c => ({
        "Nome": c.name,
        "Telefone": c.phone || '',
        "E-mail": c.email || '',
        "CPF": c.cpf || '',
        "Gênero": c.gender === 'M' ? 'Masculino' : (c.gender === 'F' ? 'Feminino' : (c.gender === 'O' ? 'Outro' : '')),
        "Aniversário": (c.dobDay && c.dobMonth) ? `${c.dobDay}/${c.dobMonth}` : '',
        "Origem": c.source || '',
        "Cadastro": parseLastVisit(c.createdAt),
        "Última Visita": parseLastVisit(c.lastVisit),
        "Pontos Fidelidade": c.loyaltyPoints || 0,
        "Débito/Fiado (R$)": c.totalDebt || 0,
        "Anotações": c.notes || ''
    }));

    try {
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Clientes");
        XLSX.writeFile(workbook, `KAIROS_Clientes_${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (e) { showNotification('Erro', 'Falha ao gerar o ficheiro.', 'error'); }
}