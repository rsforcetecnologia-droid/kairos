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
    historyLimit: 50, 
    historyData: {
        appointments: [],
        sales: [],
        loyaltyLog: []
    }
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

// --- 3. TROCA DE ECRÃS (MODAL FLUTUANTE DE CLIENTES) ---
function showClientModal() {
    const modal = document.getElementById('clients-layout-detail');
    const modalInner = document.getElementById('client-modal-inner');
    
    if (modal && modalInner) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalInner.classList.remove('scale-95', 'translate-y-4');
            modalInner.classList.add('scale-100', 'translate-y-0');
        }, 10);
        
        document.body.style.overflow = 'hidden'; 
    }
}

function hideClientModal() {
    const modal = document.getElementById('clients-layout-detail');
    const modalInner = document.getElementById('client-modal-inner');
    
    if (modal && modalInner) {
        modal.classList.add('opacity-0');
        modalInner.classList.remove('scale-100', 'translate-y-0');
        modalInner.classList.add('scale-95', 'translate-y-4');
        
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = ''; 
        }, 300); 
    }
    localState.selectedClient = null;
}


// --- 4. RENDERIZAÇÃO DO LAYOUT BASE ---

export async function loadClientsPage() {
    contentDiv = document.getElementById('content');
    localState.selectedClient = null;
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
        <label class="inline-flex items-center gap-2 px-3 py-1.5 bg-white border ${localState.filterEstablishmentIds.has(est.id) ? 'border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700' : 'border-slate-200 text-slate-600'} rounded-xl cursor-pointer hover:bg-slate-50 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5" value="${est.id}" ${localState.filterEstablishmentIds.has(est.id) ? 'checked' : ''}>
            <span class="text-xs font-bold whitespace-nowrap">${est.type === 'Matriz' ? '<i class="bi bi-building mr-1"></i>' : '<i class="bi bi-shop mr-1"></i>'} ${est.name}</span>
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
                <button id="batch-delete-btn" class="flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg text-sm active:scale-95">
                    <i class="bi bi-trash3"></i> Excluir Clientes
                </button>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-center mb-3 gap-3 w-full animate-fade-in">
                <div></div> 
                <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                    <button data-action="export-excel" class="py-2.5 px-4 bg-white border border-slate-200 text-emerald-700 font-bold rounded-xl hover:bg-slate-50 transition shadow-sm flex items-center gap-2 text-xs active:scale-95">
                        <i class="bi bi-file-earmark-excel-fill text-emerald-600 text-base"></i> Exportar
                    </button>
                    <button data-action="new-client" class="py-2.5 px-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-500/30 flex items-center gap-2 text-xs flex-1 md:flex-none justify-center active:scale-95 uppercase tracking-wider border border-indigo-500">
                        <i class="bi bi-person-plus-fill text-base"></i> Novo Cliente
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

            <div id="kpi-section" class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-4 animate-fade-in flex-shrink-0">
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group cursor-pointer hover:border-indigo-300 transition-colors" data-filter="all">
                    <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest z-10">Total de Clientes</span>
                    <span id="kpi-total" class="text-xl font-black text-slate-800 mt-0.5 z-10">0</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group cursor-pointer hover:border-emerald-300 transition-colors" data-filter="novos">
                    <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest z-10">Novos (Mês)</span>
                    <span id="kpi-novos" class="text-xl font-black text-emerald-600 mt-0.5 z-10">0</span>
                </div>
                <div class="bg-red-50 p-3 rounded-xl border border-red-100 shadow-sm flex flex-col relative overflow-hidden group cursor-pointer hover:border-red-300 transition-colors" data-filter="devendo">
                    <span class="text-[9px] font-bold text-red-500 uppercase tracking-widest z-10">Em Débito</span>
                    <span id="kpi-devendo" class="text-xl font-black text-red-600 mt-0.5 z-10">0</span>
                </div>
                <div class="bg-indigo-50 p-3 rounded-xl border border-indigo-100 shadow-sm flex flex-col relative overflow-hidden group cursor-pointer hover:border-indigo-300 transition-colors" data-filter="aniversariantes">
                    <span class="text-[9px] font-bold text-indigo-500 uppercase tracking-widest z-10">Aniversariantes</span>
                    <span id="kpi-niver" class="text-xl font-black text-indigo-600 mt-0.5 z-10">0</span>
                </div>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 gap-3 w-full animate-fade-in flex-shrink-0">
                <div class="flex gap-2 overflow-x-auto pb-1 w-full md:w-auto custom-scrollbar">
                    <label class="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl cursor-pointer transition-all shadow-sm select-none flex-shrink-0 text-xs font-bold uppercase tracking-wider">
                        <input type="checkbox" id="filter-loyalty" class="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5">
                        <i class="bi bi-star-fill text-amber-500"></i> Com Pontos
                    </label>
                    <div class="flex items-center bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm flex-shrink-0 gap-2">
                        <span class="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Ausente ></span>
                        <input type="number" id="filter-inactive" placeholder="Dias" class="w-12 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none font-black text-indigo-600 text-center py-0.5 shadow-inner">
                    </div>
                </div>

                <div class="flex items-center gap-2 w-full md:w-auto">
                    <div class="relative w-full md:w-80 flex-shrink-0">
                        <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
                        <input type="text" id="search-input" placeholder="Buscar por nome, telefone, CPF..." class="w-full pl-9 p-2.5 bg-white border border-slate-200 shadow-sm rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                    </div>
                </div>
            </div>

            <div class="flex-1 flex flex-col min-h-0 w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in relative">
                <div id="table-header-container"></div>
                <div id="list-container" class="flex-1 overflow-y-auto custom-scrollbar pb-24 md:pb-2">
                    <div class="flex justify-center py-20"><div class="loader"></div></div>
                </div>
            </div>
        </section>

        <div id="clients-layout-detail" class="hidden fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm items-center justify-center p-0 md:p-6 opacity-0 transition-opacity duration-300">
            <div id="client-modal-inner" class="bg-slate-50 w-full h-[100dvh] md:h-auto md:max-h-[95vh] md:max-w-4xl flex flex-col md:rounded-3xl shadow-2xl transform scale-95 translate-y-4 md:translate-y-0 transition-all duration-300 overflow-hidden">
                </div>
        </div>
    `;
}

function renderTableHeaders() {
    const headerContainer = document.getElementById('table-header-container');
    if (!headerContainer) return;

    const getIcon = (key) => {
        if (localState.sortConfig.key !== key) return '<i class="bi bi-arrow-down-up ml-1 opacity-40 text-xs"></i>';
        return localState.sortConfig.direction === 'asc' ? '<i class="bi bi-arrow-up ml-1 text-indigo-600"></i>' : '<i class="bi bi-arrow-down ml-1 text-indigo-600"></i>';
    };

    headerContainer.innerHTML = `
        <div class="hidden md:grid grid-cols-12 gap-2 px-4 py-3 text-[9px] font-black text-slate-500 uppercase tracking-widest items-center bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
            <div class="col-span-4 pl-2 flex items-center gap-3">
                <input type="checkbox" id="select-all-toggle" class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${localState.selectedIds.size > 0 && localState.selectedIds.size === localState.clients.length ? 'checked' : ''}>
                <div class="cursor-pointer flex items-center hover:text-indigo-700 transition-colors select-none" data-sort="name">
                    Cliente ${getIcon('name')}
                </div>
            </div>
            <div class="col-span-3 cursor-pointer flex items-center hover:text-indigo-700 transition-colors select-none" data-sort="contact">
                Contato ${getIcon('contact')}
            </div>
            <div class="col-span-2 text-center cursor-pointer flex items-center justify-center hover:text-indigo-700 transition-colors select-none" data-sort="lastVisit">
                Última Visita ${getIcon('lastVisit')}
            </div>
            <div class="col-span-2 text-center cursor-pointer flex items-center justify-center hover:text-indigo-700 transition-colors select-none" data-sort="financial">
                Situação ${getIcon('financial')}
            </div>
            <div class="col-span-1 text-center">Ações</div>
        </div>
    `;
}

// --- 5. GESTÃO DE DADOS DA LISTA PRINCIPAL ---

async function fetchClients() {
    localState.loading = true;
    const container = document.getElementById('list-container');
    if(container) container.innerHTML = '<div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-slate-500 font-bold text-[10px] uppercase tracking-widest">Carregando clientes...</p></div>';
    
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
        if(container) container.innerHTML = '<div class="text-center py-10 text-red-500 font-bold text-sm">Erro ao carregar dados.</div>';
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

    // Ordenação
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
            <div class="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm m-4">
                <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                    <i class="bi bi-people text-3xl text-slate-300"></i>
                </div>
                <h3 class="text-base font-black text-slate-800 mb-1">Nenhum cliente encontrado</h3>
                <p class="text-[10px] text-slate-500 max-w-sm text-center font-bold uppercase tracking-widest mb-6">Tente ajustar a busca ou limpar os filtros.</p>
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
        if (isBirthday) tagsHTML += `<span class="bg-indigo-50 text-indigo-700 text-[8px] font-black px-1.5 py-0.5 rounded border border-indigo-200 uppercase tracking-wider shadow-sm flex items-center gap-1"><i class="bi bi-gift-fill"></i> Niver</span> `;
        if (client.loyaltyPoints > 0) tagsHTML += `<span class="bg-amber-50 text-amber-700 text-[8px] font-black px-1.5 py-0.5 rounded border border-amber-200 uppercase tracking-wider shadow-sm flex items-center gap-1"><i class="bi bi-star-fill"></i> ${client.loyaltyPoints} pts</span> `;

        return `
        <div class="border-b border-slate-100 hover:bg-slate-50 transition-colors relative group flex flex-col md:grid md:grid-cols-12 md:gap-2 md:items-center p-3 md:p-3 mb-2 md:mb-0 bg-white md:bg-transparent rounded-2xl md:rounded-none shadow-sm md:shadow-none border md:border-b md:border-x-0 md:border-t-0 mx-2 md:mx-0 ${hasDebt ? 'border-l-4 border-l-red-400' : 'border-l-4 border-l-transparent hover:border-l-indigo-300'} ${isSelected ? 'bg-indigo-50/40 ring-1 ring-indigo-200 border-indigo-200' : ''} cursor-pointer active:scale-[0.99] md:active:scale-100" data-action="open-modal" data-id="${client.id}">
            
            <div class="flex justify-between items-start md:hidden mb-2 relative">
                <div class="absolute -top-1 -right-1 z-20">
                    <input type="checkbox" value="${client.id}" class="item-checkbox w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${isSelected ? 'checked' : ''} data-action-stop-propagation="true">
                </div>
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl ${hasDebt ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-slate-100 text-slate-600 border border-slate-200'} flex items-center justify-center font-black text-sm flex-shrink-0 shadow-sm">
                        ${getInitials(client.name)}
                    </div>
                    <div class="pr-6 min-w-0">
                        <p class="font-black text-sm text-slate-800 truncate max-w-[180px]">${escapeHTML(client.name)}</p>
                        <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">${escapeHTML(client.phone || 'Sem contato')}</p>
                    </div>
                </div>
                ${wappNumber ? `<button data-action="whatsapp" data-phone="${wappNumber}" class="w-8 h-8 mt-5 bg-[#25D366]/10 text-[#25D366] rounded-xl flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors border border-[#25D366]/20 z-20 active:scale-95"><i class="bi bi-whatsapp text-[12px] pointer-events-none"></i></button>` : ''}
            </div>

            <div class="hidden md:flex md:col-span-4 items-center gap-3 pl-2">
                <input type="checkbox" value="${client.id}" class="item-checkbox w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm z-20 flex-shrink-0" ${isSelected ? 'checked' : ''} data-action-stop-propagation="true">
                <div class="w-9 h-9 rounded-xl ${hasDebt ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-slate-100 text-slate-600 border border-slate-200'} flex items-center justify-center font-black text-xs flex-shrink-0 shadow-sm">
                    ${getInitials(client.name)}
                </div>
                <div class="min-w-0 flex-1">
                    <p class="font-black text-sm text-slate-800 truncate" title="${escapeHTML(client.name)}">${escapeHTML(client.name)}</p>
                    <div class="flex gap-1.5 mt-1">${tagsHTML}</div>
                </div>
            </div>

            <div class="hidden md:block md:col-span-3">
                <p class="text-[10px] font-black text-slate-700 uppercase tracking-widest">${escapeHTML(client.phone || '--')}</p>
                <p class="text-[9px] text-slate-400 font-bold truncate w-full mt-0.5" title="${escapeHTML(client.email || '')}">${escapeHTML(client.email || '--')}</p>
            </div>

            <div class="md:col-span-2 md:text-center flex justify-between md:block items-center mb-2 md:mb-0">
                <span class="md:hidden text-[9px] font-bold text-slate-400 uppercase tracking-widest">Última Visita:</span>
                <span class="text-[9px] font-black text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200 uppercase tracking-wider flex items-center md:justify-center gap-1 shadow-sm w-fit md:w-auto md:mx-auto">
                    <i class="bi bi-calendar-check text-slate-400"></i> ${lastVisit}
                </span>
            </div>

            <div class="md:col-span-2 md:text-center flex justify-between md:block items-center mb-1 md:mb-0">
                <span class="md:hidden text-[9px] font-bold text-slate-400 uppercase tracking-widest">Situação:</span>
                ${hasDebt 
                    ? `<span class="text-[9px] font-black text-red-700 bg-red-50 px-2.5 py-0.5 rounded-lg border border-red-200 uppercase tracking-wider shadow-sm flex items-center md:justify-center gap-1 w-fit md:w-auto md:mx-auto"><i class="bi bi-exclamation-circle text-red-500"></i> Dívida: R$ ${parseFloat(client.totalDebt).toFixed(2)}</span>`
                    : `<span class="text-[9px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200 uppercase tracking-wider shadow-sm flex items-center md:justify-center gap-1 w-fit md:w-auto md:mx-auto"><i class="bi bi-check-circle text-emerald-500"></i> Em dia</span>`
                }
            </div>

            <div class="hidden md:flex md:col-span-1 justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                ${wappNumber ? `<button data-action="whatsapp" data-phone="${wappNumber}" class="w-8 h-8 rounded-xl flex items-center justify-center text-[#25D366] bg-[#25D366]/10 hover:bg-[#25D366] hover:text-white transition-colors border border-[#25D366]/20 shadow-sm z-20 active:scale-95" title="WhatsApp"><i class="bi bi-whatsapp text-[12px] pointer-events-none"></i></button>` : ''}
                <button class="w-8 h-8 rounded-xl flex items-center justify-center text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors border border-indigo-100 shadow-sm active:scale-95" title="Editar Perfil"><i class="bi bi-pencil-fill text-[12px] pointer-events-none"></i></button>
            </div>
            
            <div class="md:hidden flex gap-1 mt-2 border-t border-slate-100 pt-3">
                ${tagsHTML}
            </div>
        </div>
        `;
    }).join('');
}

// --- 6. EVENTOS GERAIS DA TELA E LOTE ---

function setupEventListeners() {
    if (pageEventListener) contentDiv.removeEventListener('click', pageEventListener);

    pageEventListener = (e) => {
        const target = e.target;

        // Checkbox individual (Não abre o modal se clicar nele)
        if (target.classList.contains('item-checkbox')) {
            const id = target.value;
            if(target.checked) localState.selectedIds.add(id);
            else localState.selectedIds.delete(id);
            updateBatchActionBar();
            
            const tr = target.closest('div[data-action="open-modal"]');
            if(target.checked) {
                tr.classList.add('bg-indigo-50/40', 'ring-1', 'ring-indigo-200', 'border-indigo-200');
            } else {
                tr.classList.remove('bg-indigo-50/40', 'ring-1', 'ring-indigo-200', 'border-indigo-200');
            }
            e.stopPropagation(); 
            return;
        }

        if (target.dataset.actionStopPropagation === "true") {
            e.stopPropagation();
        }

        // Checkbox de Select All
        if (target.id === 'select-all-toggle') {
            const isChecked = target.checked;
            const allCheckboxes = document.querySelectorAll('.item-checkbox');
            localState.selectedIds.clear();
            allCheckboxes.forEach(cb => {
                cb.checked = isChecked;
                if(isChecked) localState.selectedIds.add(cb.value);
                
                const tr = cb.closest('div[data-action="open-modal"]');
                if(isChecked) tr.classList.add('bg-indigo-50/40', 'ring-1', 'ring-indigo-200', 'border-indigo-200');
                else tr.classList.remove('bg-indigo-50/40', 'ring-1', 'ring-indigo-200', 'border-indigo-200');
            });
            updateBatchActionBar();
            e.stopPropagation();
            return;
        }

        // Ordenação
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

        // Ações Rápidas
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
            if (action === 'close-detail-screen') {
                hideClientModal();
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

        // Modais Clicando Fora
        if(target.id === 'clients-layout-detail') {
            hideClientModal();
            return;
        }

        // Filtros (KPIs)
        const filterKpi = target.closest('[data-filter]');
        if (filterKpi) {
            document.querySelectorAll('[data-filter]').forEach(el => el.classList.remove('ring-2', 'ring-offset-1', 'ring-indigo-400', 'border-indigo-300'));
            filterKpi.classList.add('ring-2', 'ring-offset-1', 'ring-indigo-400', 'border-indigo-300');
            localState.filters.status = filterKpi.dataset.filter;
            renderList();
        }
    };

    contentDiv.addEventListener('click', pageEventListener);

    const cancelBtn = document.getElementById('cancel-selection-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            localState.selectedIds.clear();
            const toggle = document.getElementById('select-all-toggle');
            if(toggle) toggle.checked = false;
            document.querySelectorAll('.item-checkbox').forEach(cb => {
                cb.checked = false;
                const tr = cb.closest('div[data-action="open-modal"]');
                tr.classList.remove('bg-indigo-50/40', 'ring-1', 'ring-indigo-200', 'border-indigo-200');
            });
            updateBatchActionBar();
        });
    }

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

    const confirmed = await showConfirmation('Excluir Clientes', `Deseja realmente excluir permanentemente ${count} cliente(s)? O histórico de agendamentos será mantido, mas o cadastro será apagado.`);
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

// --- 7. O MODAL DE CLIENTE PADRONIZADO ---

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

    localState.historyData = { appointments: [], sales: [], loyaltyLog: [] };
    
    const modalInner = document.getElementById('client-modal-content') || document.getElementById('client-modal-inner');
    if (!modalInner) return;

    buildModalHTML(modalInner, localState.selectedClient);
    showClientModal();

    // Se for edição, dispara a busca de histórico em background baseado no telefone (chave mestra)
    if (!localState.selectedClient.isNew) {
        fetchClientHistory(localState.selectedClient);
    }
}

function buildModalHTML(modalInner, client) {
    const isNew = client.isNew;
    const safeName = escapeHTML(client.name || '');

    const mobileHeaderHTML = `
        <div class="p-4 md:p-5 border-b border-slate-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50">
            <button data-action="close-detail-screen" class="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-100 hover:text-slate-800 transition-colors active:scale-95 mr-4 flex-shrink-0">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            
            <div class="w-10 h-10 md:w-12 md:h-12 rounded-full ${client.totalDebt > 0 ? 'bg-red-50 text-red-600 border-red-200' : 'bg-indigo-50 text-indigo-600 border-indigo-200'} border flex items-center justify-center font-black text-sm md:text-base mr-3 flex-shrink-0 shadow-sm">
                ${isNew ? '<i class="bi bi-person-plus"></i>' : getInitials(client.name)}
            </div>

            <div class="min-w-0 flex-1">
                <h3 class="font-black text-sm md:text-base text-slate-800 uppercase tracking-wider truncate leading-tight">${isNew ? 'Novo Cliente' : safeName}</h3>
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest truncate">${isNew ? 'Ficha Cadastral' : `<i class="bi bi-whatsapp text-[9px] mr-1"></i> ${client.phone || 'Sem Telefone'}`}</p>
            </div>
            
            ${!isNew ? `
                <button data-action="delete-client" class="ml-auto w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 border border-red-100 transition-colors active:scale-95 flex-shrink-0 shadow-sm" title="Excluir">
                    <i class="bi bi-trash3 text-base pointer-events-none"></i>
                </button>
            ` : ''}
        </div>
    `;

    const tabsHTML = `
        <div class="modal-tabs px-2 md:px-6 border-b flex items-center justify-start gap-4 overflow-x-auto bg-slate-50 flex-shrink-0 custom-scrollbar shadow-sm">
            <button class="tab-link active whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-indigo-600 text-indigo-600 transition-colors uppercase tracking-widest" data-tab="tab-profile">1. Ficha e Perfil</button>
            ${!isNew ? `
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-transparent text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest" data-tab="tab-appointments">2. Agendamentos</button>
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-transparent text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest" data-tab="tab-history">3. Finanças</button>
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-transparent text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest" data-tab="tab-loyalty">4. Fidelidade</button>
            ` : ''}
        </div>
    `;

    modalInner.innerHTML = `
        ${mobileHeaderHTML}
        ${tabsHTML}
        
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50 p-3 md:p-6 relative">
            <form id="form-edit-client" class="h-full w-full mx-auto max-w-4xl">
                
                <div id="tab-profile" class="tab-content active space-y-4 md:space-y-6 animate-fade-in-fast">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                        
                        <div class="bg-white p-5 md:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                            <h3 class="text-xs font-black text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3 flex items-center gap-2"><i class="bi bi-person-vcard text-indigo-500 text-lg"></i> Dados Pessoais</h3>
                            
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Nome Completo *</label>
                                <input type="text" name="name" value="${safeName}" required class="w-full p-3.5 border border-slate-300 rounded-xl text-sm font-black text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white shadow-inner transition-colors">
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1" title="O Telefone é a chave que unifica o histórico do cliente.">WhatsApp * <i class="bi bi-info-circle text-indigo-400"></i></label>
                                    <input type="tel" name="phone" value="${escapeHTML(client.phone || '')}" required placeholder="(00) 00000-0000" class="w-full p-3.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white shadow-inner transition-colors">
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">CPF</label>
                                    <input type="text" name="cpf" value="${escapeHTML(client.cpf || '')}" placeholder="000.000.000-00" class="w-full p-3.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white shadow-inner transition-colors">
                                </div>
                            </div>

                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">E-mail</label>
                                <input type="email" name="email" value="${escapeHTML(client.email || '')}" class="w-full p-3.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white shadow-inner transition-colors">
                            </div>
                        </div>

                        <div class="space-y-4 md:space-y-6">
                            <div class="bg-white p-5 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 class="text-xs font-black text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3 flex items-center gap-2"><i class="bi bi-info-circle text-indigo-500 text-lg"></i> Detalhes Adicionais</h3>
                                
                                <div class="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Dia Nasc.</label>
                                        <input type="number" name="dobDay" min="1" max="31" value="${client.dobDay || ''}" class="w-full p-3.5 border border-slate-300 rounded-xl text-sm font-black text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white shadow-inner text-center transition-colors">
                                    </div>
                                    <div>
                                        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Mês Nasc.</label>
                                        <input type="number" name="dobMonth" min="1" max="12" value="${client.dobMonth || ''}" class="w-full p-3.5 border border-slate-300 rounded-xl text-sm font-black text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white shadow-inner text-center transition-colors">
                                    </div>
                                </div>

                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Gênero</label>
                                        <select name="gender" class="w-full p-3.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white shadow-inner cursor-pointer transition-colors">
                                            <option value="">Não informar</option>
                                            <option value="F" ${client.gender === 'F' ? 'selected' : ''}>Feminino</option>
                                            <option value="M" ${client.gender === 'M' ? 'selected' : ''}>Masculino</option>
                                            <option value="O" ${client.gender === 'O' ? 'selected' : ''}>Outro</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Captação</label>
                                        <select name="source" class="w-full p-3.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white shadow-inner cursor-pointer transition-colors">
                                            <option value="">Como conheceu?</option>
                                            <option value="Instagram" ${client.source === 'Instagram' ? 'selected' : ''}>Instagram</option>
                                            <option value="Indicacao" ${client.source === 'Indicacao' ? 'selected' : ''}>Indicação</option>
                                            <option value="Passagem" ${client.source === 'Passagem' ? 'selected' : ''}>Fachada</option>
                                            <option value="Google" ${client.source === 'Google' ? 'selected' : ''}>Google</option>
                                            <option value="Outros" ${client.source === 'Outros' ? 'selected' : ''}>Outros</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="bg-white p-5 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 class="text-xs font-black text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3 flex items-center gap-2"><i class="bi bi-journal-text text-indigo-500 text-lg"></i> Anotações Internas</h3>
                                <textarea name="notes" rows="3" class="w-full p-3.5 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white shadow-inner resize-none transition-colors" placeholder="Histórico de alergias, preferências, observações...">${escapeHTML(client.notes || '')}</textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="tab-appointments" class="tab-content hidden space-y-6 animate-fade-in-fast">
                    <div class="max-w-3xl mx-auto">
                        <div class="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 mb-6 shadow-sm">
                            <p class="text-[10px] font-black text-indigo-800 uppercase tracking-widest flex items-center gap-2"><i class="bi bi-link-45deg text-lg"></i> Agendamentos unificados pelo número: ${client.phone || 'N/A'}</p>
                        </div>
                        <div id="historico-agendamentos-container">
                            <div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Buscando histórico na base...</p></div>
                        </div>
                    </div>
                </div>

                <div id="tab-history" class="tab-content hidden space-y-6 animate-fade-in-fast">
                    <div class="max-w-3xl mx-auto" id="historico-financeiro-container">
                        <div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Calculando LTV...</p></div>
                    </div>
                </div>

                <div id="tab-loyalty" class="tab-content hidden space-y-6 animate-fade-in-fast">
                    <div class="max-w-xl mx-auto" id="historico-fidelidade-container">
                        <div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Processando pontos...</p></div>
                    </div>
                </div>

            </form>
        </div>

        <footer class="p-4 bg-white border-t border-slate-200 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.05)] w-full flex-shrink-0 z-50 flex gap-3 justify-end md:rounded-b-3xl">
            <button type="button" data-action="close-detail-screen" class="hidden md:block py-3 px-6 bg-slate-100 border border-slate-200 text-slate-600 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-slate-200 transition-colors shadow-sm active:scale-95">Cancelar</button>
            <button type="submit" form="form-edit-client" class="w-full md:w-auto md:px-8 py-3 bg-indigo-600 text-white font-black text-xs md:text-sm rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-500/30 transition-transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider border border-indigo-600">
                <i class="bi bi-save2 text-lg pointer-events-none"></i> Salvar Cliente
            </button>
        </footer>
    `;

    // Tabs logic (Modal)
    modalInner.querySelectorAll('.tab-link').forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            modalInner.querySelectorAll('.tab-link').forEach(btn => {
                btn.classList.remove('active', 'border-indigo-600', 'text-indigo-600');
                btn.classList.add('border-transparent', 'text-slate-400');
            });
            tab.classList.add('active', 'border-indigo-600', 'text-indigo-600');
            tab.classList.remove('border-transparent', 'text-slate-400');
            
            modalInner.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
            modalInner.querySelector('#' + tab.dataset.tab).classList.remove('hidden');
        });
    });

    // Form Submit
    const form = modalInner.querySelector('#form-edit-client');
    if (form) form.onsubmit = handleSaveClient;

    // Deletar via botão no header
    const btnDel = modalInner.querySelector('[data-action="delete-client"]');
    if (btnDel) btnDel.onclick = handleDeleteClient;
}

// --- RENDERS DINÂMICOS PÓS-FETCH DO HISTÓRICO ---

function buildAppointmentsHTML(appointments) {
    appointments.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

    return `
        <div class="space-y-3">
            ${appointments.length ? appointments.map(appt => {
                const date = new Date(appt.startTime);
                const isPast = date < new Date();
                let statusBadge = isPast ? '<span class="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-[9px] font-black uppercase border border-slate-200">Concluído</span>' : '<span class="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md text-[9px] font-black uppercase border border-emerald-200">Agendado</span>';
                if (appt.status === 'cancelled') statusBadge = '<span class="bg-red-50 text-red-600 px-2 py-0.5 rounded-md text-[9px] font-black uppercase border border-red-200">Cancelado</span>';

                return `
                <div class="bg-white border border-slate-200 rounded-2xl p-4 flex gap-4 shadow-sm items-center cursor-pointer hover:border-indigo-300 hover:shadow-md transition-all active:scale-[0.98]" data-go-agenda="true" data-id="${appt.id}" data-date="${appt.startTime}">
                    <div class="flex-shrink-0 text-center w-12 border-r border-slate-100 pr-3">
                        <span class="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">${date.toLocaleDateString('pt-BR', {month:'short'})}</span>
                        <span class="block text-xl font-black text-slate-800 leading-none mt-1">${date.getDate()}</span>
                    </div>
                    <div class="flex-grow min-w-0">
                        <p class="font-black text-sm text-slate-800 truncate">${escapeHTML(appt.serviceName || 'Serviço Variado')}</p>
                        <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate mt-1.5 flex items-center gap-1.5"><i class="bi bi-person-fill bg-slate-100 p-1 rounded"></i> ${escapeHTML(appt.professionalName || 'N/A')} <span class="mx-1 text-slate-300">•</span> <i class="bi bi-clock-fill bg-slate-100 p-1 rounded"></i> ${date.toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'})}</p>
                    </div>
                    <div class="flex-shrink-0 text-right">
                        ${statusBadge}
                    </div>
                </div>`;
            }).join('') : `
                <div class="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm">
                    <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3"><i class="bi bi-calendar-x text-xl text-slate-300"></i></div>
                    <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Nenhum agendamento encontrado.</p>
                </div>
            `}
        </div>
    `;
}

function buildHistoryHTML(sales) {
    sales.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const totalLTV = sales.reduce((acc, s) => acc + (Number(s.totalAmount) || 0), 0);
    const ticketMedio = sales.length > 0 ? (totalLTV / sales.length) : 0;

    return `
        <div class="space-y-6">
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-emerald-50 p-4 md:p-5 rounded-2xl border border-emerald-100 shadow-sm flex flex-col text-center justify-center">
                    <span class="text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex justify-center items-center gap-1"><i class="bi bi-graph-up-arrow"></i> LTV (Valor Vitalício)</span>
                    <span class="text-2xl md:text-3xl font-black text-emerald-700 mt-1">${formatCurrency(totalLTV)}</span>
                </div>
                <div class="bg-white p-4 md:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col text-center justify-center">
                    <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex justify-center items-center gap-1"><i class="bi bi-receipt"></i> Ticket Médio</span>
                    <span class="text-2xl md:text-3xl font-black text-slate-800 mt-1">${formatCurrency(ticketMedio)}</span>
                </div>
            </div>

            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div class="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-2">
                    <i class="bi bi-cart-check text-indigo-500 text-lg"></i>
                    <h4 class="text-[10px] font-black text-slate-600 uppercase tracking-widest">Histórico de Compras e Comandas</h4>
                </div>
                <div class="p-3 space-y-2">
                    ${sales.length ? sales.map(sale => `
                    <div class="bg-white border border-slate-100 rounded-xl p-4 flex justify-between items-center shadow-sm hover:border-indigo-200 cursor-pointer transition-all active:scale-[0.98]" data-go-comanda="true" data-id="${sale.id}">
                        <div class="flex items-center gap-4">
                            <div class="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 text-sm shadow-sm"><i class="bi bi-receipt-cutoff"></i></div>
                            <div>
                                <p class="font-black text-slate-800 text-xs uppercase tracking-wider">Comanda #${sale.id.slice(-5).toUpperCase()}</p>
                                <p class="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">${new Date(sale.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-black text-emerald-600 text-sm bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">${formatCurrency(sale.totalAmount)}</p>
                            <p class="text-[9px] text-indigo-500 font-bold uppercase tracking-widest mt-1.5 flex items-center gap-1 justify-end">Abrir Comanda <i class="bi bi-chevron-right"></i></p>
                        </div>
                    </div>`).join('') : `
                        <div class="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200 m-2">
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nenhum histórico financeiro.</p>
                        </div>
                    `}
                </div>
            </div>
        </div>
    `;
}

function buildLoyaltyHTML(client, log) {
    log.sort((a, b) => new Date(b.date) - new Date(a.date));

    return `
        <div class="space-y-6">
            <div class="bg-amber-400 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden flex flex-col items-center justify-center text-center shadow-amber-500/30">
                <div class="absolute -right-4 -top-4 opacity-20 transform rotate-12"><i class="bi bi-star-fill text-9xl"></i></div>
                <p class="text-amber-100 font-bold uppercase tracking-widest text-[10px] mb-2 z-10">Saldo de Pontos de Fidelidade</p>
                <h1 class="text-6xl font-black z-10 drop-shadow-md tracking-tighter">${client.loyaltyPoints || 0}</h1>
                
                <button type="button" data-action="manual-redeem" class="mt-6 bg-white text-amber-600 text-[10px] font-black uppercase tracking-widest py-2.5 px-6 rounded-xl transition hover:bg-amber-50 shadow-lg active:scale-95 flex items-center gap-2 z-10 border border-white">
                    <i class="bi bi-sliders"></i> Ajuste Manual
                </button>
            </div>

            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div class="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-2">
                    <i class="bi bi-card-list text-indigo-500 text-lg"></i>
                    <h4 class="text-[10px] font-black text-slate-600 uppercase tracking-widest">Extrato de Movimentações</h4>
                </div>
                <div class="p-3 space-y-1 max-h-80 overflow-y-auto custom-scrollbar">
                    ${log.length > 0 ? log.map(entry => {
                        const isRedemption = entry.type === 'redemption';
                        return `
                        <div class="flex justify-between items-center py-3 px-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors rounded-xl">
                            <div>
                                <p class="text-[10px] font-black text-slate-800 uppercase tracking-wider">${escapeHTML(entry.description || (isRedemption ? 'Resgate' : 'Acúmulo'))}</p>
                                <p class="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">${new Date(entry.date).toLocaleDateString()}</p>
                            </div>
                            <span class="font-black text-sm px-3 py-1 rounded-lg border ${isRedemption ? 'text-red-600 bg-red-50 border-red-100' : 'text-amber-600 bg-amber-50 border-amber-100'} shadow-sm">
                                ${isRedemption ? '-' : '+'}${entry.points}
                            </span>
                        </div>`;
                    }).join('') : `
                        <div class="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200 m-2">
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sem movimentações de pontos.</p>
                        </div>
                    `}
                </div>
            </div>
        </div>
    `;
}

// --- 8. ROTINAS DE HISTÓRICO E SALVAMENTO ---

async function fetchClientHistory(client) {
    if (!client || !client.phone) return; 
    
    // O Telefone é a chave mestra para buscar na API de Appointments
    const phoneToSearch = cleanPhone(client.phone);

    try {
        const end = new Date(); end.setMonth(end.getMonth() + 12); 
        const start = new Date(); start.setFullYear(start.getFullYear() - 5); 

        let url = `/api/appointments/${state.establishmentId}?startDate=${start.toISOString()}&endDate=${end.toISOString()}&clientPhone=${encodeURIComponent(phoneToSearch)}&limit=100`;
        const clientAppts = await authenticatedFetch(url);
        
        localState.historyData.appointments = clientAppts;
        localState.historyData.sales = clientAppts.filter(a => a.status === 'completed').map(a => ({ id: a.id, date: a.startTime, totalAmount: a.totalAmount || 0, items: a.comandaItems || a.services || [] }));

        const loyaltyLog = [];
        clientAppts.forEach(appt => {
            if (appt.status === 'completed' && appt.loyaltyPointsEarned > 0) loyaltyLog.push({ type: 'earn', points: appt.loyaltyPointsEarned, date: appt.startTime, description: 'Serviço / Venda concluída' });
            if (appt.loyaltyRedemption) loyaltyLog.push({ type: 'redemption', points: appt.loyaltyRedemption.cost || 0, date: appt.startTime, description: `Resgate: ${appt.loyaltyRedemption.name}` });
        });
        localState.historyData.loyaltyLog = loyaltyLog;
        
        // Renderiza nas abas se existirem
        const apptContainer = document.getElementById('historico-agendamentos-container');
        if (apptContainer) apptContainer.innerHTML = buildAppointmentsHTML(localState.historyData.appointments);
        
        const finContainer = document.getElementById('historico-financeiro-container');
        if (finContainer) finContainer.innerHTML = buildHistoryHTML(localState.historyData.sales);
        
        const loyContainer = document.getElementById('historico-fidelidade-container');
        if (loyContainer) loyContainer.innerHTML = buildLoyaltyHTML(client, localState.historyData.loyaltyLog);
        
        // Adiciona eventos aos novos elementos gerados (Ir para agenda, comanda, e botão manual)
        attachDynamicEvents(client);

    } catch (e) {
        console.error("Erro ao buscar histórico via telefone", e);
        const errHtml = '<div class="text-center py-6 text-red-500 font-bold text-[10px] uppercase bg-red-50 rounded-xl m-2 border border-red-100">Falha na busca. O Telefone está preenchido corretamente?</div>';
        
        const apptContainer = document.getElementById('historico-agendamentos-container');
        if(apptContainer) apptContainer.innerHTML = errHtml;
        const finContainer = document.getElementById('historico-financeiro-container');
        if(finContainer) finContainer.innerHTML = errHtml;
        const loyContainer = document.getElementById('historico-fidelidade-container');
        if(loyContainer) loyContainer.innerHTML = errHtml;
    } 
}

function attachDynamicEvents(client) {
    const modalContent = document.getElementById('client-modal-inner');
    if (!modalContent) return;

    modalContent.querySelectorAll('[data-go-agenda]').forEach(btn => {
        btn.onclick = () => {
            hideClientModal(); 
            navigateTo('agenda-section', { targetDate: new Date(btn.dataset.date), scrollToAppointmentId: btn.dataset.id });
        };
    });

    modalContent.querySelectorAll('[data-go-comanda]').forEach(btn => {
        btn.onclick = () => {
            hideClientModal();
            navigateTo('comandas-section', { selectedAppointmentId: btn.dataset.id, initialFilter: 'finalizadas' });
        };
    });

    const btnRedeem = modalContent.querySelector('[data-action="manual-redeem"]');
    if(btnRedeem) {
        btnRedeem.onclick = (e) => {
            e.preventDefault();
            openManualRedemptionModal(client);
        };
    }
}

async function handleSaveClient(e) {
    e.preventDefault();
    const btnSubmit = e.target.querySelector('button[type="submit"]');
    const originalText = btnSubmit.innerHTML;
    btnSubmit.innerHTML = '<span class="spinner-border spinner-border-sm mr-2"></span> Gravando...';
    btnSubmit.disabled = true;

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
            hideClientModal();
        } else {
            await clientsApi.updateClient(localState.selectedClient.id, data);
            Object.assign(localState.selectedClient, data);
            const idx = localState.clients.findIndex(c => c.id === localState.selectedClient.id);
            if (idx !== -1) localState.clients[idx] = localState.selectedClient;
            showNotification('Sucesso', 'Dados salvos com sucesso!', 'success');
            hideClientModal();
        }
        updateKPIs();
        renderList();
    } catch (err) { 
        showNotification('Erro', err.message, 'error'); 
        btnSubmit.innerHTML = originalText;
        btnSubmit.disabled = false;
    }
}

async function handleDeleteClient(e) {
    e.preventDefault();
    const confirmed = await showConfirmation('Excluir Cliente', 'Tem certeza? O histórico financeiro será mantido de forma anônima, mas a ficha cadastral será perdida permanentemente.');
    if (!confirmed) return;
    
    try {
        await clientsApi.deleteClient(localState.selectedClient.id);
        localState.clients = localState.clients.filter(c => c.id !== localState.selectedClient.id);
        showNotification('Sucesso', 'Cliente removido com sucesso.', 'success');
        hideClientModal();
        updateKPIs();
        renderList();
    } catch (err) { showNotification('Erro', err.message, 'error'); }
}

function openManualRedemptionModal(client) {
    const currentPoints = client.loyaltyPoints || 0;
    const contentHTML = `
        <div class="text-center mb-6">
            <p class="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Saldo Atual</p>
            <h2 class="text-4xl font-black text-amber-500">${currentPoints}</h2>
        </div>
        <form id="manual-redeem-form" class="space-y-4">
            <div>
                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Ação Desejada</label>
                <select id="redeem-action" class="w-full p-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 shadow-inner cursor-pointer">
                    <option value="debit">Remover Pontos (Resgate / Punição)</option>
                    <option value="credit">Adicionar Pontos (Bônus / Erro)</option>
                </select>
            </div>
            <div>
                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Quantidade de Pontos</label>
                <input type="number" id="redeem-points" min="1" required class="w-full p-4 border border-slate-300 rounded-xl text-2xl font-black text-slate-800 text-center outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 shadow-inner" placeholder="Ex: 50">
            </div>
            <div>
                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Motivo / Observação *</label>
                <input type="text" id="redeem-reason" required class="w-full p-3 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 shadow-inner" placeholder="Ex: Brinde especial de Natal">
            </div>
            <div class="pt-4">
                <button type="submit" class="w-full bg-indigo-600 text-white px-4 py-3.5 rounded-xl font-black shadow-md hover:bg-indigo-700 active:scale-95 transition-transform text-xs uppercase tracking-wider border border-indigo-500 flex items-center justify-center gap-2">
                    <i class="bi bi-check2-circle text-lg pointer-events-none"></i> Confirmar Ajuste
                </button>
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
        if (action === 'debit' && pointsInput > currentPoints) return showNotification('Erro', 'Saldo insuficiente na carteira do cliente.', 'error');

        const btn = e.target.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
        btn.disabled = true;

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
            localState.historyData.loyaltyLog.unshift({ type: action === 'debit' ? 'redemption' : 'earn', points: pointsInput, date: new Date().toISOString(), description: reason + ' (Ajuste Manual)' });

            showNotification('Sucesso', 'Saldo de pontos atualizado.', 'success');
            close();
            
            // Re-renderizar a tela de fidelidade
            const loyContainer = document.getElementById('historico-fidelidade-container');
            if (loyContainer) loyContainer.innerHTML = buildLoyaltyHTML(localState.selectedClient, localState.historyData.loyaltyLog);
            attachDynamicEvents(localState.selectedClient);

            renderList(); // Atualiza na tabela geral

        } catch (error) { 
            showNotification('Erro', error.message, 'error'); 
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    };
}

function handleExportExcel() {
    if (typeof XLSX === 'undefined') return showNotification('Erro', 'Biblioteca de exportação não carregada. Atualize a página.', 'error');
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
        showNotification('Sucesso', 'Exportação gerada e descarregada.', 'success');
    } catch (e) { showNotification('Erro', 'Falha ao gerar o ficheiro Excel.', 'error'); }
}