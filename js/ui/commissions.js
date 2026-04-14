// js/ui/commissions.js

import * as commissionsApi from '../api/commissions.js';
import * as professionalsApi from '../api/professionals.js';
import * as financialApi from '../api/financial.js'; 
import * as establishmentsApi from '../api/establishments.js';
import { state } from '../state.js';
import { showNotification, showConfirmation } from '../components/modal.js';

// ============================================================================
// 📊 ESTADO LOCAL
// ============================================================================
const today = new Date();
const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

let localState = {
    professionals: [],
    reports: [],         
    calculationResult: null, 
    periodString: '',
    
    establishments: [],
    filterEstablishmentIds: new Set(),
    establishmentConfig: null, 
    
    selectedIds: new Set(),

    startDate: firstDay.toISOString().split('T')[0],
    endDate: today.toISOString().split('T')[0],
    professionalId: 'all',
    searchQuery: '',

    stats: { 
        revenue: 0, 
        commissions: 0,
        margin: 0,
        netPaid: 0
    },
    
    viewMode: 'list' // 'list', 'new-calc', 'preview-calc', 'report-details'
};

let pageEventListener = null;
const contentDiv = document.getElementById('content');
let searchDebounceTimeout = null;

// ============================================================================
// 🛠️ FUNÇÕES AUXILIARES E TROCA DE ECRÃS
// ============================================================================

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
}

function formatDateDisplay(dateStr) {
    if (!dateStr) return '--/--/----';
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
}

function getInitials(name) {
    if (!name) return 'PR';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
}

// Oculta a lista e mostra o ecrã de detalhes ocupando tudo (Screen Swap)
function openDetailScreen() {
    const main = document.getElementById('commissions-layout-main');
    const detail = document.getElementById('commissions-layout-detail');
    const nav = document.getElementById('mobile-bottom-nav');
    
    if(main) main.style.display = 'none';
    if(detail) {
        detail.classList.remove('hidden');
        detail.classList.add('flex');
    }
    if(nav && window.innerWidth < 768) nav.style.display = 'none';
}

// Volta para a lista principal
function closeDetailScreen() {
    const main = document.getElementById('commissions-layout-main');
    const detail = document.getElementById('commissions-layout-detail');
    const nav = document.getElementById('mobile-bottom-nav');
    
    if(main) main.style.display = 'flex';
    if(detail) {
        detail.classList.add('hidden');
        detail.classList.remove('flex');
    }
    if(nav && window.innerWidth < 768) nav.style.display = '';
    localState.viewMode = 'list';
}

// ============================================================================
// 🚀 INICIALIZAÇÃO E LAYOUT PRINCIPAL
// ============================================================================

export async function loadCommissionsPage() {
    try {
        const [profs, hierarchyPayload, establishmentData] = await Promise.all([
            professionalsApi.getProfessionals(state.establishmentId),
            establishmentsApi.getHierarchy().catch(() => ({ matrizes: [] })),
            establishmentsApi.getEstablishmentDetails(state.establishmentId).catch(() => ({}))
        ]);
        
        localState.professionals = profs;
        localState.establishmentConfig = establishmentData || {};
        
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
        console.error("Erro na inicialização de comissões", e);
    }

    localState.viewMode = 'list';
    renderBaseLayout();
    setupEventListeners(); 
    await fetchAndDisplayData();
}

function renderBaseLayout() {
    const profOptions = localState.professionals.map(p => 
        `<option value="${p.id}">${p.name}</option>`
    ).join('');

    const estCheckboxes = localState.establishments.map(est => `
        <label class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border ${localState.filterEstablishmentIds.has(est.id) ? 'border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700' : 'border-gray-200 text-gray-600'} rounded-lg cursor-pointer hover:bg-gray-50 transition-all shadow-sm est-label select-none flex-shrink-0">
            <input type="checkbox" class="est-filter-checkbox rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-3 h-3" value="${est.id}" ${localState.filterEstablishmentIds.has(est.id) ? 'checked' : ''}>
            <span class="text-[10px] font-bold whitespace-nowrap">${est.type === 'Matriz' ? '<i class="bi bi-building mr-1"></i>' : '<i class="bi bi-shop mr-1"></i>'} ${est.name}</span>
        </label>
    `).join('');

    contentDiv.innerHTML = `
        <style>
            #toast-container, .toast-notification, .modal, .modal-backdrop { z-index: 9999999 !important; }
        </style>
        
        <section id="commissions-layout-main" class="h-full flex flex-col p-2 md:p-4 md:pl-6 w-full relative overflow-hidden">
            
            <div id="batch-action-bar" class="hidden absolute top-4 left-4 right-4 z-30 bg-gray-900 text-white rounded-xl shadow-2xl p-2.5 items-center justify-between animate-fade-in-down">
                <div class="flex items-center gap-3">
                    <button id="cancel-selection-btn" class="p-1.5 hover:bg-gray-700 rounded-full transition-colors text-gray-300 hover:text-white">
                        <i class="bi bi-x-lg text-lg"></i>
                    </button>
                    <span class="font-bold text-sm tracking-wide"><span id="selected-count" class="text-indigo-400">0</span> Selecionados</span>
                </div>
                <button id="batch-delete-btn" class="flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg text-sm">
                    <i class="bi bi-trash3"></i> Excluir
                </button>
            </div>

            <div class="grid grid-cols-2 gap-2 mb-2 animate-fade-in w-full">
                <button data-action="new-calculation" class="bg-indigo-600 text-white rounded-xl p-2.5 flex items-center justify-center shadow-md active:scale-95 transition-transform border border-indigo-700 gap-2">
                    <i class="bi bi-calculator text-lg drop-shadow-md"></i>
                    <span class="font-black text-[10px] md:text-xs uppercase tracking-widest leading-none mt-0.5">Nova Apuração</span>
                </button>
                <button id="export-excel-btn" class="bg-white text-emerald-700 rounded-xl p-2.5 flex items-center justify-center shadow-sm border border-gray-200 active:scale-95 transition-transform hover:bg-gray-50 gap-2">
                    <i class="bi bi-file-earmark-excel-fill text-lg"></i>
                    <span class="font-black text-[10px] md:text-xs uppercase tracking-widest leading-none mt-0.5">Exportar Excel</span>
                </button>
            </div>

            ${localState.establishments.length > 1 ? `
            <div class="mb-2 animate-fade-in flex gap-1.5 overflow-x-auto custom-scrollbar pb-1" id="establishment-filters-container">
                ${estCheckboxes}
            </div>
            ` : ''}

            <div id="kpi-section" class="grid grid-cols-4 gap-1.5 md:gap-3 mb-2 animate-fade-in w-full">
                <div class="bg-white p-1.5 md:p-2 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
                    <span class="text-[8px] font-bold text-gray-400 uppercase tracking-widest w-full truncate">Faturamento</span>
                    <span id="kpi-revenue" class="text-xs md:text-sm font-black text-gray-800 mt-0.5 w-full truncate">R$ 0,00</span>
                </div>
                <div class="bg-white p-1.5 md:p-2 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
                    <span class="text-[8px] font-bold text-gray-400 uppercase tracking-widest w-full truncate">Comissões</span>
                    <span id="kpi-commissions" class="text-xs md:text-sm font-bold text-amber-600 mt-0.5 w-full truncate">R$ 0,00</span>
                </div>
                <div class="bg-white p-1.5 md:p-2 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
                    <span class="text-[8px] font-bold text-gray-400 uppercase tracking-widest w-full truncate">Retenção</span>
                    <span id="kpi-margin" class="text-xs md:text-sm font-bold text-blue-600 mt-0.5 w-full truncate">0%</span>
                </div>
                <div class="bg-white p-1.5 md:p-2 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
                    <span class="text-[8px] font-bold text-gray-400 uppercase tracking-widest w-full truncate">Pago</span>
                    <span id="kpi-net" class="text-xs md:text-sm font-bold text-emerald-600 mt-0.5 w-full truncate">R$ 0,00</span>
                </div>
            </div>

            <div class="flex flex-col md:flex-row gap-2 mb-2 bg-white p-2 rounded-xl border border-gray-200 shadow-sm animate-fade-in w-full">
                <div class="flex items-center gap-1.5 w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 shadow-sm flex-1">
                    <span class="text-[9px] font-bold text-gray-500 uppercase tracking-widest">De</span>
                    <input type="date" id="filter-start" value="${localState.startDate}" class="w-full bg-transparent text-[10px] font-bold text-gray-700 outline-none">
                    <span class="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Até</span>
                    <input type="date" id="filter-end" value="${localState.endDate}" class="w-full bg-transparent text-[10px] font-bold text-gray-700 outline-none">
                </div>
                
                <div class="flex gap-2 w-full md:w-auto">
                    <select id="filter-prof" class="flex-1 py-1.5 px-2 bg-gray-50 border border-gray-200 rounded-lg text-[10px] font-bold text-gray-700 outline-none shadow-sm">
                        <option value="all">Todos Profissionais</option>
                        ${profOptions}
                    </select>
                    <button data-action="apply-filters" class="py-1.5 px-3 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-wider rounded-lg hover:bg-indigo-700 shadow-sm active:scale-95 transition-transform">
                        Filtrar
                    </button>
                </div>
            </div>
            
            <div class="relative w-full mb-2 flex-shrink-0 animate-fade-in">
                <i class="bi bi-search absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                <input type="text" id="search-input" placeholder="Buscar relatórios gerados..." class="w-full pl-8 p-2 bg-white border border-gray-200 shadow-sm rounded-lg text-xs outline-none focus:ring-1 focus:ring-indigo-500 font-semibold text-gray-700 transition-all">
            </div>

            <div class="flex-1 flex flex-col min-h-0 w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in">
                <div class="hidden md:grid grid-cols-12 gap-2 px-3 py-2 text-[9px] font-bold text-gray-500 uppercase tracking-widest items-center bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                    <div class="col-span-3 flex items-center gap-2">
                        <input type="checkbox" id="select-all-toggle" class="w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer">
                        Profissional
                    </div>
                    <div class="col-span-2">Período de Ref.</div>
                    <div class="col-span-2 text-right">Bruto (R$)</div>
                    <div class="col-span-2 text-right">Ajustes (R$)</div>
                    <div class="col-span-2 text-right text-indigo-600">Líquido Pago</div>
                    <div class="col-span-1 text-center">Ações</div>
                </div>

                <div id="list-container" class="flex-1 overflow-y-auto custom-scrollbar pb-24 md:pb-2">
                    <div class="flex justify-center py-20"><div class="loader"></div></div>
                </div>
            </div>
        </section>

        <div id="commissions-layout-detail" class="hidden fixed inset-0 z-[99999] bg-gray-50 flex-col overflow-hidden w-full h-[100dvh]">
            </div>
    `;
}

// ============================================================================
// 📡 DADOS E RENDERIZAÇÃO DA LISTA
// ============================================================================

async function fetchAndDisplayData() {
    const container = document.getElementById('list-container');
    if(container) container.innerHTML = '<div class="flex justify-center py-20"><div class="loader"></div></div>';

    const selectedEstsString = Array.from(localState.filterEstablishmentIds).join(',');

    try {
        const [history, stats] = await Promise.all([
            commissionsApi.getCommissionHistory({
                startDate: localState.startDate,
                endDate: localState.endDate,
                professionalId: localState.professionalId,
                establishmentId: selectedEstsString
            }),
            commissionsApi.getDashboardStats(localState.startDate, localState.endDate, selectedEstsString)
        ]);

        localState.reports = history || [];
        
        const netPaid = localState.reports.reduce((acc, rep) => acc + (rep.summary.finalValue || rep.summary.totalCommission), 0);
        
        localState.stats = {
            revenue: stats.totalRevenue || 0,
            commissions: stats.totalCommissionsPaid || 0,
            margin: stats.totalRevenue > 0 ? (((stats.totalRevenue - stats.totalCommissionsPaid) / stats.totalRevenue) * 100).toFixed(1) : 0,
            netPaid: netPaid
        };

        localState.selectedIds.clear();
        updateBatchActionBar();
        if(document.getElementById('select-all-toggle')) document.getElementById('select-all-toggle').checked = false;

        renderKPIs();
        renderList();

    } catch (error) {
        console.error(error);
        if(container) container.innerHTML = `
            <div class="flex flex-col items-center justify-center py-16">
                <i class="bi bi-exclamation-octagon text-3xl text-red-400 mb-2"></i>
                <p class="text-gray-600 text-xs font-medium">Erro ao carregar dados.</p>
            </div>`;
    }
}

function renderKPIs() {
    const r = document.getElementById('kpi-revenue');
    const c = document.getElementById('kpi-commissions');
    const m = document.getElementById('kpi-margin');
    const n = document.getElementById('kpi-net');
    
    if(r) r.textContent = formatCurrency(localState.stats.revenue);
    if(c) c.textContent = formatCurrency(localState.stats.commissions);
    if(m) m.textContent = `${localState.stats.margin}%`;
    if(n) n.textContent = formatCurrency(localState.stats.netPaid);
}

function renderList() {
    const container = document.getElementById('list-container');
    if(!container) return;
    let filteredList = localState.reports;

    if (localState.searchQuery) {
        const query = localState.searchQuery.toLowerCase();
        filteredList = filteredList.filter(r => 
            r.professionalName.toLowerCase().includes(query) ||
            r.period.toLowerCase().includes(query)
        );
    }

    if (filteredList.length === 0) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center py-20 text-center">
                <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-receipt text-xl text-gray-300"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-700 mb-1">Nenhum pagamento encontrado</h3>
                <p class="text-[10px] text-gray-400 max-w-xs">Não há relatórios gerados para este período ou profissional.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredList.map(report => {
        const dateStr = formatDateDisplay(report.createdAt);
        const bruto = report.summary.totalCommission;
        const debit = report.summary.extraDebit || 0;
        const credit = report.summary.extraCredit || 0;
        const finalVal = report.summary.finalValue || bruto;
        const isSelected = localState.selectedIds.has(report.id);
        
        let ajustesStr = '';
        if (debit > 0 && credit > 0) ajustesStr = `<span class="text-red-500">-R$${debit.toFixed(2)}</span> / <span class="text-emerald-500">+R$${credit.toFixed(2)}</span>`;
        else if (debit > 0) ajustesStr = `<span class="text-red-500">-R$ ${debit.toFixed(2)}</span>`;
        else if (credit > 0) ajustesStr = `<span class="text-emerald-500">+R$ ${credit.toFixed(2)}</span>`;
        else ajustesStr = `<span class="text-gray-300">--</span>`;

        return `
        <div class="border-b border-gray-100 hover:bg-gray-50 transition-colors relative group flex flex-col md:grid md:grid-cols-12 md:gap-2 md:items-center p-3 md:px-3 md:py-2 mb-2 md:mb-0 bg-white md:bg-transparent rounded-xl md:rounded-none shadow-sm md:shadow-none border md:border-b ${isSelected ? 'bg-indigo-50/40' : ''}">
            
            <div class="absolute right-2 top-2 md:relative md:right-auto md:top-auto md:col-span-3 md:flex md:items-center md:gap-2 z-10">
                <input type="checkbox" value="${report.id}" class="item-checkbox w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${isSelected ? 'checked' : ''}>
                <div class="hidden md:flex items-center gap-2 pr-2">
                    <div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm border border-indigo-200">
                        ${getInitials(report.professionalName)}
                    </div>
                    <div class="min-w-0">
                        <p class="font-bold text-xs text-gray-800 truncate" title="${report.professionalName}">${report.professionalName}</p>
                        <p class="text-[9px] text-gray-400 font-medium truncate mt-0.5">Gerado: ${dateStr}</p>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-2 md:hidden mb-2 pr-8">
                <div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm border border-indigo-200">
                    ${getInitials(report.professionalName)}
                </div>
                <div class="min-w-0">
                    <p class="font-bold text-xs text-gray-800 truncate">${report.professionalName}</p>
                    <p class="text-[9px] text-gray-400 font-medium truncate mt-0.5">Gerado: ${dateStr}</p>
                </div>
            </div>

            <div class="md:col-span-2 mb-1 md:mb-0 flex items-center ml-10 md:ml-0">
                <span class="md:hidden text-[9px] font-bold text-gray-400 uppercase tracking-widest w-16">Período:</span>
                <span class="text-[9px] font-bold text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200 uppercase tracking-wider">
                    <i class="bi bi-calendar3 opacity-50 mr-1"></i> ${report.period}
                </span>
            </div>

            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block mb-1 md:mb-0 ml-10 md:ml-0">
                <span class="md:hidden text-[9px] font-bold text-gray-400 uppercase tracking-widest">Bruto:</span>
                <span class="text-xs font-bold text-gray-700">${formatCurrency(bruto)}</span>
            </div>
            
            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block mb-1 md:mb-0 ml-10 md:ml-0">
                <span class="md:hidden text-[9px] font-bold text-gray-400 uppercase tracking-widest">Ajustes:</span>
                <span class="text-[10px] font-bold">${ajustesStr}</span>
            </div>

            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block pt-1 md:pt-0 border-t md:border-0 border-gray-100 ml-10 md:ml-0 mt-1 md:mt-0">
                <span class="md:hidden text-[9px] font-bold text-indigo-400 uppercase tracking-widest">Líquido Pago:</span>
                <span class="text-xs font-black text-emerald-600">${formatCurrency(finalVal)}</span>
            </div>

            <div class="md:col-span-1 flex justify-end gap-1.5 mt-3 md:mt-0 ml-10 md:ml-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <button data-action="view-report-details" data-id="${report.id}" class="w-8 h-8 md:w-6 md:h-6 rounded-lg md:rounded flex items-center justify-center text-indigo-500 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 transition-colors shadow-sm" title="Ver Detalhes">
                    <i class="bi bi-eye text-sm md:text-[10px]"></i>
                </button>
                <button data-action="print-receipt" data-id="${report.id}" class="w-8 h-8 md:w-6 md:h-6 rounded-lg md:rounded flex items-center justify-center text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors shadow-sm" title="Imprimir Recibo">
                    <i class="bi bi-printer text-sm md:text-[10px]"></i>
                </button>
                <button data-action="delete-report" data-id="${report.id}" class="w-8 h-8 md:w-6 md:h-6 rounded-lg md:rounded flex items-center justify-center text-red-500 bg-red-50 hover:bg-red-100 border border-red-100 transition-colors shadow-sm" title="Excluir e Estornar">
                    <i class="bi bi-trash3 text-sm md:text-[10px]"></i>
                </button>
            </div>
        </div>
        `;
    }).join('');
}

// ============================================================================
// ⚙️ EVENTOS E AÇÕES
// ============================================================================

function setupEventListeners() {
    if (pageEventListener) document.body.removeEventListener('click', pageEventListener);

    pageEventListener = (e) => {
        const target = e.target;

        if (target.classList.contains('item-checkbox')) {
            const id = target.value;
            if(target.checked) localState.selectedIds.add(id);
            else localState.selectedIds.delete(id);
            updateBatchActionBar();
            e.stopPropagation();
            return;
        }

        const actionBtn = target.closest('button[data-action]');
        if (actionBtn) {
            e.preventDefault();
            const action = actionBtn.dataset.action;
            const id = actionBtn.dataset.id;

            switch (action) {
                case 'apply-filters':
                    localState.startDate = document.getElementById('filter-start').value;
                    localState.endDate = document.getElementById('filter-end').value;
                    localState.professionalId = document.getElementById('filter-prof').value;
                    fetchAndDisplayData();
                    break;
                case 'new-calculation':
                    renderNewCalculationView();
                    break;
                case 'print-receipt':
                    handlePrintReceipt(id);
                    break;
                case 'delete-report':
                    handleDeleteReport(id);
                    break;
                case 'view-report-details':
                    renderReportDetailsView(id);
                    break;
                case 'close-detail-screen':
                    closeDetailScreen();
                    break;
                
                // --- In-Screen Actions ---
                case 'toggle-all-profs':
                    const checkboxes = document.querySelectorAll('.prof-checkbox');
                    const allChecked = Array.from(checkboxes).every(c => c.checked);
                    checkboxes.forEach(c => c.checked = !allChecked);
                    break;
                case 'calculate-preview':
                    handleCalculatePreview();
                    break;
                case 'save-final-reports':
                    handleSaveReports();
                    break;
                case 'toggle-preview-details':
                    const idx = actionBtn.dataset.idx;
                    const detailsDiv = document.getElementById(`preview-details-${idx}`);
                    const icon = actionBtn.querySelector('i');
                    if (detailsDiv) {
                        if (detailsDiv.classList.contains('hidden')) {
                            detailsDiv.classList.remove('hidden');
                            if(icon) icon.classList.replace('bi-chevron-down', 'bi-chevron-up');
                        } else {
                            detailsDiv.classList.add('hidden');
                            if(icon) icon.classList.replace('bi-chevron-up', 'bi-chevron-down');
                        }
                    }
                    break;
            }
        }
    };

    document.body.addEventListener('click', pageEventListener);

    const searchInput = document.getElementById('search-input');
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            localState.searchQuery = e.target.value;
            renderList();
        });
    }

    document.body.addEventListener('input', (e) => {
        if (e.target.classList.contains('input-debit') || 
            e.target.classList.contains('input-credit') || 
            e.target.classList.contains('input-notes')) {
            recalculateSingleRow(e.target.dataset.idx);
        }
    });

    const selectAllToggle = document.getElementById('select-all-toggle');
    if (selectAllToggle) {
        selectAllToggle.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            const allCheckboxes = document.querySelectorAll('.item-checkbox');
            localState.selectedIds.clear();
            allCheckboxes.forEach(cb => {
                cb.checked = isChecked;
                if(isChecked) localState.selectedIds.add(cb.value);
            });
            updateBatchActionBar();
        });
    }

    const cancelBtn = document.getElementById('cancel-selection-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            localState.selectedIds.clear();
            if(document.getElementById('select-all-toggle')) document.getElementById('select-all-toggle').checked = false;
            document.querySelectorAll('.item-checkbox').forEach(cb => cb.checked = false);
            updateBatchActionBar();
        });
    }

    const batchDeleteBtn = document.getElementById('batch-delete-btn');
    if (batchDeleteBtn) batchDeleteBtn.addEventListener('click', handleBatchDelete);

    const filtersContainer = document.getElementById('establishment-filters-container');
    if (filtersContainer) {
        filtersContainer.addEventListener('change', (e) => {
            if(e.target.classList.contains('est-filter-checkbox')) {
                const label = e.target.closest('label');
                if (e.target.checked) {
                    localState.filterEstablishmentIds.add(e.target.value);
                    label.classList.add('border-indigo-500', 'ring-1', 'ring-indigo-500', 'bg-indigo-50/20', 'text-indigo-700');
                    label.classList.remove('border-gray-200', 'text-gray-600');
                } else {
                    localState.filterEstablishmentIds.delete(e.target.value);
                    label.classList.remove('border-indigo-500', 'ring-1', 'ring-indigo-500', 'bg-indigo-50/20', 'text-indigo-700');
                    label.classList.add('border-gray-200', 'text-gray-600');
                }
                fetchAndDisplayData(); 
            }
        });
    }

    const exportBtn = document.getElementById('export-excel-btn');
    if (exportBtn) exportBtn.addEventListener('click', handleExportExcel);
}

function updateBatchActionBar() {
    const bar = document.getElementById('batch-action-bar');
    const countSpan = document.getElementById('selected-count');
    const count = localState.selectedIds.size;

    if (countSpan) countSpan.textContent = count;

    if (bar) {
        if (count > 0) {
            bar.classList.remove('hidden');
            bar.classList.add('flex');
        } else {
            bar.classList.add('hidden');
            bar.classList.remove('flex');
        }
    }
}

// ============================================================================
// 🧮 NOVA TELA: APURAÇÃO E CÁLCULO (SCREEN SWAP)
// ============================================================================

function renderNewCalculationView() {
    localState.viewMode = 'new-calc';
    const detailContainer = document.getElementById('commissions-layout-detail');
    if(!detailContainer) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const firstDayStr = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
    
    const profsHtml = localState.professionals.map(p => `
        <label class="flex items-center p-2.5 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-indigo-300 transition-all cursor-pointer group mb-1.5">
            <input type="checkbox" value="${p.id}" class="prof-checkbox w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
            <div class="ml-3 flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg border border-gray-100 bg-gray-50 text-gray-500 flex items-center justify-center text-[10px] font-black group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors shadow-sm">${getInitials(p.name)}</div>
                <span class="font-bold text-sm text-gray-800">${p.name}</span>
            </div>
        </label>`).join('');

    const mobileHeaderHTML = `
        <div class="p-4 border-b border-gray-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50">
            <button data-action="close-detail-screen" class="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 shadow-inner transition-transform active:scale-95">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            <h3 class="font-black text-base text-gray-800 ml-4 uppercase tracking-wider">Nova Apuração</h3>
        </div>
    `;

    detailContainer.innerHTML = `
        ${mobileHeaderHTML}
        <div id="calc-flow-container" class="flex flex-col flex-1 overflow-hidden relative">
            
            <div id="calc-step-1" class="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gray-50/50 pb-28">
                <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
                    <h3 class="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2"><i class="bi bi-calendar-range text-indigo-500"></i> Período</h3>
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Início</label>
                            <input type="date" id="calc-start-date" value="${firstDayStr}" class="w-full mt-1.5 p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner">
                        </div>
                        <div>
                            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Fim</label>
                            <input type="date" id="calc-end-date" value="${todayStr}" class="w-full mt-1.5 p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner">
                        </div>
                    </div>
                </div>

                <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
                    <h3 class="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2"><i class="bi bi-tags text-indigo-500"></i> Considerar nas vendas</h3>
                    <div class="grid grid-cols-3 gap-2">
                        <label class="flex items-center justify-center p-3 border border-gray-200 rounded-xl bg-gray-50 cursor-pointer hover:bg-white transition-colors active:scale-95">
                            <input type="checkbox" id="calc-type-services" checked class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                            <span class="ml-2 text-xs font-bold text-gray-700 uppercase tracking-wider">Serviços</span>
                        </label>
                        <label class="flex items-center justify-center p-3 border border-gray-200 rounded-xl bg-gray-50 cursor-pointer hover:bg-white transition-colors active:scale-95">
                            <input type="checkbox" id="calc-type-products" checked class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                            <span class="ml-2 text-xs font-bold text-gray-700 uppercase tracking-wider">Produtos</span>
                        </label>
                        <label class="flex items-center justify-center p-3 border border-gray-200 rounded-xl bg-gray-50 cursor-pointer hover:bg-white transition-colors active:scale-95">
                            <input type="checkbox" id="calc-type-packages" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                            <span class="ml-2 text-xs font-bold text-gray-700 uppercase tracking-wider">Pacotes</span>
                        </label>
                    </div>
                </div>

                <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
                    <div class="flex justify-between items-center mb-3">
                        <h3 class="text-sm font-bold text-gray-800 flex items-center gap-2"><i class="bi bi-people text-indigo-500"></i> Equipe</h3>
                        <button type="button" data-action="toggle-all-profs" class="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors shadow-sm active:scale-95">Inverter Sel.</button>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-3 max-h-64 overflow-y-auto custom-scrollbar pr-1">
                        ${profsHtml}
                    </div>
                </div>
            </div>

            <div id="calc-step-2" class="hidden flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar bg-gray-50/50 pb-28"></div>

            <footer class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white flex justify-end gap-3 z-50 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.1)]">
                <button type="button" data-action="close-detail-screen" class="hidden md:block py-3.5 px-6 bg-white border border-gray-300 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 transition-colors shadow-sm uppercase tracking-wider">Cancelar</button>
                <button type="button" data-action="calculate-preview" id="btn-calc-action" class="w-full md:w-auto py-3.5 px-8 bg-indigo-600 text-white font-black text-sm rounded-xl hover:bg-indigo-700 shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider">
                    <i class="bi bi-calculator text-lg"></i> Calcular Vendas
                </button>
            </footer>
        </div>
    `;

    openDetailScreen();
}

async function handleCalculatePreview() {
    const profIds = Array.from(document.querySelectorAll('.prof-checkbox:checked')).map(c => c.value);
    if (profIds.length === 0) return showNotification('Atenção', 'Selecione pelo menos um profissional.', 'warning');

    const selectedEstsString = Array.from(localState.filterEstablishmentIds).join(',');
    
    const startInput = document.getElementById('calc-start-date');
    const endInput = document.getElementById('calc-end-date');
    
    if (!startInput || !endInput || !startInput.value || !endInput.value) {
        return showNotification('Atenção', 'As datas de início e fim são obrigatórias.', 'warning');
    }

    const params = {
        professionalIds: profIds,
        startDate: startInput.value,
        endDate: endInput.value,
        establishmentId: selectedEstsString,
        calculationTypes: {
            services: document.getElementById('calc-type-services')?.checked || false,
            products: document.getElementById('calc-type-products')?.checked || false,
            packages: document.getElementById('calc-type-packages')?.checked || false,
        }
    };
    
    const sDate = new Date(params.startDate + 'T00:00:00').toLocaleDateString('pt-BR');
    const eDate = new Date(params.endDate + 'T00:00:00').toLocaleDateString('pt-BR');
    localState.periodString = `${sDate} a ${eDate}`;

    const btn = document.getElementById('btn-calc-action');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<div class="loader-small border-white mr-2"></div> Processando...';
    btn.disabled = true;

    try {
        const results = await commissionsApi.calculateCommission(params);
        
        localState.calculationResult = results.map(r => ({ 
            ...r, 
            extraDebit: 0, 
            extraCredit: 0, 
            finalValue: r.summary.totalCommission, 
            notes: '' 
        }));

        renderCalculationPreview();
    } catch (error) {
        showNotification('Erro na Apuração', error.message, 'error');
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

function renderCalculationPreview() {
    localState.viewMode = 'preview-calc';
    const results = localState.calculationResult;
    
    if (!results || results.length === 0 || results.every(r => r.summary.totalCommission === 0)) {
        showNotification('Aviso', 'Nenhuma comissão encontrada para os filtros selecionados.', 'info');
        const btn = document.getElementById('btn-calc-action');
        btn.innerHTML = '<i class="bi bi-calculator text-lg"></i> Calcular Vendas';
        btn.disabled = false;
        return;
    }

    const step1 = document.getElementById('calc-step-1');
    const step2 = document.getElementById('calc-step-2');
    const btn = document.getElementById('btn-calc-action');

    if (step1) step1.classList.add('hidden');
    if (step2) step2.classList.remove('hidden');

    if (btn) {
        btn.dataset.action = "save-final-reports";
        btn.className = "w-full md:w-auto py-3.5 px-8 bg-emerald-600 text-white font-black text-sm rounded-xl hover:bg-emerald-700 shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider";
        btn.innerHTML = '<i class="bi bi-check2-circle text-lg"></i> Confirmar Pagtos.';
        btn.disabled = false;
    }

    const totalGeral = results.reduce((acc, r) => acc + r.finalValue, 0);

    const cardsHtml = results.map((r, idx) => {
        if (r.summary.totalCommission === 0) return ''; 
        
        const itemsHtml = (r.items || []).map(item => `
            <tr class="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                <td class="py-2.5 truncate max-w-[120px] text-gray-800 font-bold" title="${item.item}">${item.item}</td>
                <td class="py-2.5 text-gray-500 font-medium">${item.client || '--'}</td>
                <td class="py-2.5 text-right text-gray-600 font-bold">R$ ${(item.value || 0).toFixed(2)}</td>
                <td class="py-2.5 text-center text-gray-600 font-bold">${item.commissionRate}%</td>
                <td class="py-2.5 text-right font-black text-emerald-600">R$ ${(item.commissionValue || 0).toFixed(2)}</td>
            </tr>
        `).join('');

        const detailsDiv = `
            <div id="preview-details-${idx}" class="hidden mt-4 pt-4 border-t border-gray-100">
                <h5 class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Itens Processados</h5>
                <div class="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
                    <table class="w-full text-left text-[10px]">
                        <thead class="text-gray-500 bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th class="p-2.5 font-bold uppercase tracking-wider">Serviço/Produto</th>
                                <th class="p-2.5 font-bold uppercase tracking-wider">Cliente</th>
                                <th class="p-2.5 font-bold uppercase tracking-wider text-right">Base</th>
                                <th class="p-2.5 font-bold uppercase tracking-wider text-center">%</th>
                                <th class="p-2.5 font-bold uppercase tracking-wider text-right">Comissão</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white">${itemsHtml || '<tr><td colspan="5" class="py-4 text-center text-gray-400">Nenhum item</td></tr>'}</tbody>
                    </table>
                </div>
            </div>
        `;
        
        return `
        <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-3 relative overflow-hidden">
            <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-500"></div>
            
            <div class="flex justify-between items-start mb-4 border-b border-gray-100 pb-3 pl-3">
                <div>
                    <h4 class="font-black text-gray-800 text-sm uppercase tracking-wider">${r.professionalName}</h4>
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">${r.summary.totalItems} itens calculados</p>
                </div>
                <div class="text-right bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 shadow-inner">
                    <p class="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Valor Bruto</p>
                    <p class="font-black text-gray-800 text-sm">R$ ${r.summary.totalCommission.toFixed(2)}</p>
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-3 pl-3 mb-3">
                <div>
                    <label class="text-[10px] font-bold text-red-500 uppercase tracking-widest block mb-1.5"><i class="bi bi-dash-circle mr-1"></i>Descontos/Vales</label>
                    <div class="relative">
                        <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 font-black text-xs">R$</span>
                        <input type="number" step="0.01" data-idx="${idx}" class="input-debit w-full pl-8 p-2.5 border border-red-200 rounded-xl bg-white shadow-inner font-black text-sm text-red-600 outline-none focus:ring-2 focus:ring-red-500" placeholder="0.00">
                    </div>
                </div>
                <div>
                    <label class="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1.5"><i class="bi bi-plus-circle mr-1"></i>Bônus Extras</label>
                    <div class="relative">
                        <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 font-black text-xs">R$</span>
                        <input type="number" step="0.01" data-idx="${idx}" class="input-credit w-full pl-8 p-2.5 border border-emerald-200 rounded-xl bg-white shadow-inner font-black text-sm text-emerald-600 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="0.00">
                    </div>
                </div>
            </div>

            <div class="pl-3 mb-4">
                <input type="text" data-idx="${idx}" class="input-notes w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-gray-700 shadow-inner" placeholder="Motivo dos ajustes (Opcional)">
            </div>
            
            <div class="flex justify-between items-center bg-indigo-50 border border-indigo-200 p-3.5 rounded-xl pl-4 ml-3 shadow-sm">
                <span class="text-[10px] font-bold text-indigo-700 uppercase tracking-widest">Líquido a Pagar</span>
                <span class="text-xl font-black text-indigo-800 final-value-display drop-shadow-sm" data-idx="${idx}">R$ ${r.finalValue.toFixed(2)}</span>
            </div>

            <div class="pl-3 mt-4 border-t border-gray-50 pt-3">
                <button type="button" data-action="toggle-preview-details" data-idx="${idx}" class="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-widest flex items-center gap-1.5 transition-colors bg-indigo-50 px-3 py-2 rounded-lg border border-indigo-100">
                    <i class="bi bi-list-check text-sm"></i> Detalhar Itens <i class="bi bi-chevron-down ml-1 text-xs"></i>
                </button>
                ${detailsDiv}
            </div>
        </div>
        `;
    }).join('');

    if (step2) step2.innerHTML = `
        <div class="bg-gradient-to-r from-indigo-700 to-indigo-800 p-4 rounded-2xl shadow-lg text-white mb-4 flex justify-between items-center relative overflow-hidden border border-indigo-600">
            <div class="absolute right-[-10px] top-[-10px] opacity-10"><i class="bi bi-cash-coin text-8xl"></i></div>
            <div class="bg-indigo-900/40 p-3 px-4 rounded-xl backdrop-blur-sm border border-indigo-400/30 z-10">
                <span class="block text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-1">Soma Total Equipe</span>
                <span id="grand-total-preview" class="text-2xl font-black drop-shadow-md">R$ ${totalGeral.toFixed(2)}</span>
            </div>
            <div class="text-right z-10 flex flex-col items-end">
                <span class="block text-[9px] font-bold text-indigo-200 uppercase tracking-widest mb-1.5">Período Selecionado</span>
                <span class="text-[10px] font-black bg-white/20 px-2.5 py-1.5 rounded-lg border border-white/30 shadow-sm flex items-center gap-1"><i class="bi bi-calendar3"></i> ${localState.periodString}</span>
            </div>
        </div>
        ${cardsHtml}
    `;
}

function recalculateSingleRow(idx) {
    const debitInput = document.querySelector(`.input-debit[data-idx="${idx}"]`);
    const creditInput = document.querySelector(`.input-credit[data-idx="${idx}"]`);
    const notesInput = document.querySelector(`.input-notes[data-idx="${idx}"]`);
    
    let debit = parseFloat(debitInput?.value) || 0;
    let credit = parseFloat(creditInput?.value) || 0;
    let notes = notesInput?.value || '';

    if (localState.calculationResult && localState.calculationResult[idx]) {
        const r = localState.calculationResult[idx];
        r.extraDebit = debit;
        r.extraCredit = credit;
        r.notes = notes;
        r.finalValue = r.summary.totalCommission - debit + credit;

        const finalSpan = document.querySelector(`.final-value-display[data-idx="${idx}"]`);
        if(finalSpan) finalSpan.innerText = `R$ ${r.finalValue.toFixed(2)}`;
        
        recalculateGrandTotal();
    }
}

function recalculateGrandTotal() {
    const total = localState.calculationResult.reduce((acc, r) => acc + r.finalValue, 0);
    const display = document.getElementById('grand-total-preview');
    if(display) display.innerText = `R$ ${total.toFixed(2)}`;
}

async function handleSaveReports() {
    const validResults = localState.calculationResult.filter(r => r.summary.totalCommission > 0);
    const count = validResults.length;
    
    if (count === 0) return showNotification('Aviso', 'Não há valores para pagar.', 'info');

    const confirmed = await showConfirmation('Confirmar Pagamentos', `Você está prestes a gerar recibos e marcar as vendas de ${count} profissional(is) como PAGAS. Essa ação lançará a despesa correspondente no Financeiro. Confirmar?`);
    if (!confirmed) return;
    
    const btn = document.getElementById('btn-calc-action');
    btn.innerHTML = '<div class="loader-small border-white mr-2"></div> Finalizando...';
    btn.disabled = true;

    try {
        const savePromises = validResults.map(async (result) => {
            const salesIds = (result.items || [])
                .map(item => item.originalSaleId)
                .filter(id => id !== undefined && id !== null);

            await commissionsApi.saveCommissionReport({
                professionalId: result.professionalId,
                professionalName: result.professionalName,
                period: localState.periodString,
                processedSalesIds: salesIds,
                establishmentId: state.establishmentId, 
                reportData: {
                    ...result,
                    summary: {
                        ...result.summary,
                        finalValue: result.finalValue,
                        extraDebit: result.extraDebit || 0,
                        extraCredit: result.extraCredit || 0,
                        notes: result.notes || ''
                    }
                }
            });

            // INTEGRAÇÃO FINANCEIRA AUTOMÁTICA
            try {
                if (result.finalValue > 0) {
                    const config = localState.establishmentConfig || {};
                    const defNature = config.defaultDespesaNaturezaId || config.financeConfig?.despesaNaturezaId || null;
                    const defCostCenter = config.defaultDespesaCentroCustoId || config.financeConfig?.despesaCentroCustoId || null;

                    await financialApi.createPayable({
                        establishmentId: state.establishmentId,
                        description: `Comissões - ${result.period}`,
                        amount: result.finalValue,
                        dueDate: new Date().toISOString().split('T')[0],
                        naturezaId: defNature,
                        centroDeCustoId: defCostCenter,
                        entity: result.professionalName, 
                        paymentMethod: 'dinheiro', 
                        status: 'paid', 
                        paymentDate: new Date().toISOString().split('T')[0],
                        origin: 'commission'
                    });
                }
            } catch (finErr) {
                console.error("Erro ao integrar com financeiro (Despesa):", finErr);
            }
        });

        await Promise.all(savePromises);
        showNotification('Sucesso', 'Pagamentos registrados e integrados ao financeiro!', 'success');
        
        localState.calculationResult = null;
        closeDetailScreen();
        
        await fetchAndDisplayData(); 

    } catch (error) { 
        showNotification('Erro ao Salvar', error.message, 'error'); 
        btn.innerHTML = '<i class="bi bi-check2-circle text-lg"></i> Confirmar Pagtos.';
        btn.disabled = false;
    }
}

// ============================================================================
// 🔍 NOVA TELA: DETALHES DO RECIBO (SCREEN SWAP)
// ============================================================================

function renderReportDetailsView(reportId) {
    localState.viewMode = 'report-details';
    const detailContainer = document.getElementById('commissions-layout-detail');
    if(!detailContainer) return;
    
    const report = localState.reports.find(r => r.id === reportId);
    if (!report) return;

    const items = report.reportData?.items || report.items || [];
    const rData = report.summary;
    const debit = rData.extraDebit || 0;
    const credit = rData.extraCredit || 0;
    const notes = rData.notes || '';

    const mobileHeaderHTML = `
        <div class="p-4 border-b border-gray-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50">
            <button data-action="close-detail-screen" class="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 shadow-inner transition-transform active:scale-95">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            <h3 class="font-black text-base text-gray-800 ml-4 uppercase tracking-wider">Detalhes do Recibo</h3>
        </div>
    `;

    const itemsHtml = items.map(item => `
        <tr class="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
            <td class="py-3 px-3 text-gray-800 font-bold whitespace-normal min-w-[150px]">${item.item}</td>
            <td class="py-3 px-3 text-gray-500 font-medium">${item.client || '--'}</td>
            <td class="py-3 px-3 text-right text-gray-600 font-bold">R$ ${(item.value || 0).toFixed(2)}</td>
            <td class="py-3 px-3 text-center text-gray-600 font-black">${item.commissionRate}%</td>
            <td class="py-3 px-3 text-right font-black text-emerald-600">R$ ${(item.commissionValue || 0).toFixed(2)}</td>
        </tr>
    `).join('');

    let adjustmentsHtml = '';
    if (debit > 0 || credit > 0 || notes) {
        adjustmentsHtml = `
            <div class="mt-4 bg-gray-50 p-4 rounded-2xl border border-gray-200 shadow-sm">
                <h5 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3"><i class="bi bi-sliders mr-1 text-indigo-500"></i> Ajustes Aplicados</h5>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    ${debit > 0 ? `<div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm"><span class="text-gray-400 block text-[9px] uppercase tracking-widest font-bold mb-1">Descontos/Vales</span> <span class="font-black text-red-500 text-lg leading-none">-R$ ${debit.toFixed(2)}</span></div>` : ''}
                    ${credit > 0 ? `<div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm"><span class="text-gray-400 block text-[9px] uppercase tracking-widest font-bold mb-1">Bônus Extras</span> <span class="font-black text-emerald-500 text-lg leading-none">+R$ ${credit.toFixed(2)}</span></div>` : ''}
                </div>
                ${notes ? `<div class="text-xs font-bold text-gray-600 bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm"><strong class="block text-[9px] uppercase tracking-widest text-indigo-400 mb-1.5"><i class="bi bi-card-text"></i> Motivo do Ajuste</strong> ${notes}</div>` : ''}
            </div>
        `;
    }

    detailContainer.innerHTML = `
        ${mobileHeaderHTML}
        <div class="flex-grow overflow-y-auto p-4 pb-28 custom-scrollbar bg-gray-50/50">
            <div class="flex flex-col md:flex-row justify-between md:items-center bg-indigo-50 p-5 rounded-2xl border border-indigo-200 mb-4 gap-4 shadow-sm relative overflow-hidden">
                <div class="absolute right-0 top-0 bottom-0 w-2 bg-indigo-500"></div>
                <div class="flex items-center gap-4">
                    <div class="w-14 h-14 rounded-xl bg-white text-indigo-600 flex items-center justify-center font-black text-xl flex-shrink-0 shadow-sm border border-indigo-100">
                        ${getInitials(report.professionalName)}
                    </div>
                    <div>
                        <p class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-0.5">Profissional</p>
                        <p class="font-black text-indigo-900 text-xl leading-tight uppercase tracking-wider">${report.professionalName}</p>
                    </div>
                </div>
                <div class="md:text-right border-t md:border-t-0 md:border-l border-indigo-200 pt-4 md:pt-0 md:pl-5">
                    <p class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Período Base</p>
                    <p class="font-black text-indigo-700 text-sm bg-white px-3 py-1.5 rounded-lg shadow-sm border border-indigo-100 flex items-center justify-center md:justify-end gap-2"><i class="bi bi-calendar3 opacity-50 text-lg"></i> ${report.period}</p>
                </div>
            </div>

            <div class="border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white">
                <div class="overflow-x-auto custom-scrollbar">
                    <table class="w-full text-left text-xs whitespace-nowrap">
                        <thead class="bg-gray-50 text-gray-500 border-b border-gray-200">
                            <tr>
                                <th class="p-3.5 font-bold uppercase tracking-wider text-[10px]">Serviço / Produto</th>
                                <th class="p-3.5 font-bold uppercase tracking-wider text-[10px]">Cliente</th>
                                <th class="p-3.5 font-bold uppercase tracking-wider text-[10px] text-right">Base Calc.</th>
                                <th class="p-3.5 font-bold uppercase tracking-wider text-[10px] text-center">%</th>
                                <th class="p-3.5 font-bold uppercase tracking-wider text-[10px] text-right">Comissão</th>
                            </tr>
                        </thead>
                        <tbody>${itemsHtml || '<tr><td colspan="5" class="text-center py-8 text-gray-400 font-bold text-sm">Nenhum item detalhado neste recibo.</td></tr>'}</tbody>
                    </table>
                </div>
                <div class="bg-gray-50 p-4 border-t border-gray-200 flex justify-between items-center shadow-inner">
                    <span class="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Bruto Apurado</span>
                    <span class="font-black text-gray-800 text-xl drop-shadow-sm">R$ ${(rData.totalCommission || 0).toFixed(2)}</span>
                </div>
            </div>
            
            ${adjustmentsHtml}

            <div class="mt-4 flex justify-between items-center bg-emerald-50 p-5 rounded-2xl border border-emerald-200 shadow-sm relative overflow-hidden">
                <div class="absolute right-[-10px] top-[-10px] opacity-10"><i class="bi bi-check-circle-fill text-8xl text-emerald-500"></i></div>
                <div>
                    <span class="block text-[10px] font-black text-emerald-600 uppercase tracking-widest z-10 mb-1 flex items-center gap-1.5"><i class="bi bi-cash-stack text-sm"></i> Total Líquido Pago</span>
                    <span class="text-3xl font-black text-emerald-700 z-10 drop-shadow-sm">R$ ${(rData.finalValue || rData.totalCommission).toFixed(2)}</span>
                </div>
            </div>
        </div>

        <footer class="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.1)] w-full flex-shrink-0 z-50 flex gap-3">
            <button data-action="print-receipt" data-id="${report.id}" class="flex-1 py-4 bg-indigo-50 text-indigo-700 font-black text-sm rounded-xl hover:bg-indigo-100 transition-colors shadow-sm uppercase tracking-wider flex items-center justify-center gap-2 border border-indigo-200 active:scale-95">
                <i class="bi bi-printer text-xl"></i> Imprimir Recibo
            </button>
            <button data-action="delete-report" data-id="${report.id}" class="w-14 h-auto bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors border border-red-200 shadow-sm active:scale-95" title="Excluir e Estornar">
                <i class="bi bi-trash3 text-xl"></i>
            </button>
        </footer>
    `;

    openDetailScreen();
}

// ============================================================================
// 🖨️ EXPORTAÇÃO, RECIBO E EXCLUSÃO EM LOTE
// ============================================================================

function handleExportExcel() {
    if (localState.reports.length === 0) {
        showNotification('Aviso', 'Não há dados para exportar com os filtros atuais.', 'info');
        return;
    }

    let filteredList = localState.reports;
    if (localState.searchQuery) {
        const query = localState.searchQuery.toLowerCase();
        filteredList = filteredList.filter(r => 
            r.professionalName.toLowerCase().includes(query) ||
            r.period.toLowerCase().includes(query)
        );
    }

    const exportData = filteredList.map(report => {
        const bruto = report.summary.totalCommission;
        const debit = report.summary.extraDebit || 0;
        const credit = report.summary.extraCredit || 0;
        const finalVal = report.summary.finalValue || bruto;

        return {
            "Data da Apuração": new Date(report.createdAt).toLocaleDateString('pt-BR'),
            "Profissional": report.professionalName,
            "Período Base": report.period,
            "Itens Calculados": report.summary.totalItems || 0,
            "Valor Bruto (R$)": bruto,
            "Bônus (R$)": credit,
            "Descontos (R$)": debit,
            "Líquido Pago (R$)": finalVal,
            "Observações/Motivo": report.summary.notes || ''
        };
    });

    try {
        if(typeof XLSX === 'undefined') {
            showNotification('Erro', 'A biblioteca XLSX não está disponível no momento.', 'error');
            return;
        }
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Comissoes");
        
        const fileName = `Relatorio_Comissoes_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(workbook, fileName);
    } catch (error) {
        console.error(error);
        showNotification('Erro', 'Falha ao exportar Excel.', 'error');
    }
}

function handlePrintReceipt(reportId) {
    const report = localState.reports.find(r => r.id === reportId);
    if (!report) return;

    if (!window.jspdf) {
        showNotification('Erro', 'A biblioteca de PDF não foi carregada.', 'error');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFillColor(79, 70, 229); 
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont(undefined, 'bold');
    doc.text('RECIBO DE COMISSÕES', 105, 20, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`Data de Emissão: ${new Date().toLocaleDateString('pt-BR')}`, 105, 28, { align: 'center' });

    doc.setTextColor(50, 50, 50);
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    doc.text(`Profissional:`, 15, 55);
    doc.setFont(undefined, 'bold');
    doc.text(report.professionalName, 40, 55);
    
    doc.setFont(undefined, 'normal');
    doc.text(`Período:`, 130, 55);
    doc.setFont(undefined, 'bold');
    doc.text(report.period, 147, 55);

    const items = report.reportData?.items || report.items || [];
    let startY = 70;

    if (items.length > 0) {
        const itemRows = items.map(item => [
            item.item || 'Item',
            item.client || '--',
            `R$ ${(item.value || 0).toFixed(2)}`,
            `${(item.commissionRate || 0)}%`,
            `R$ ${(item.commissionValue || 0).toFixed(2)}`
        ]);

        doc.autoTable({ 
            startY: startY, 
            head: [['Serviço/Produto', 'Cliente', 'Valor Base', 'Taxa', 'Comissão']], 
            body: itemRows,
            theme: 'striped',
            headStyles: { fillColor: [249, 250, 251], textColor: [75, 85, 99], fontStyle: 'bold' },
            styles: { fontSize: 8 },
            columnStyles: { 
                2: { halign: 'right' },
                3: { halign: 'center' },
                4: { halign: 'right', fontStyle: 'bold', textColor: [5, 150, 105] } 
            }
        });
        startY = doc.lastAutoTable.finalY + 15;
    }

    const rData = report.summary;
    const finalVal = rData.finalValue || rData.totalCommission;

    const summaryRows = [
        ['Comissões Brutas (Soma dos Itens)', `R$ ${rData.totalCommission.toFixed(2)}`]
    ];
    if (rData.extraCredit > 0) summaryRows.push(['(+) Bônus Extras', `R$ ${rData.extraCredit.toFixed(2)}`]);
    if (rData.extraDebit > 0) summaryRows.push(['(-) Descontos / Vales', `R$ ${rData.extraDebit.toFixed(2)}`]);

    doc.autoTable({ 
        startY: startY, 
        head: [['Resumo do Fechamento', 'Valor']], 
        body: summaryRows,
        theme: 'grid',
        headStyles: { fillColor: [79, 70, 229], textColor: [255, 255, 255] },
        columnStyles: { 1: { halign: 'right', fontStyle: 'bold' } }
    });

    const finalY = doc.lastAutoTable.finalY + 15;
    
    doc.setFillColor(236, 253, 245); 
    doc.rect(120, finalY - 8, 75, 15, 'F');
    doc.setTextColor(5, 150, 105); 
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(`Total Líquido: R$ ${finalVal.toFixed(2)}`, 190, finalY, { align: 'right' });

    if (rData.notes) {
        doc.setTextColor(100, 100, 100);
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        doc.text(`Obs/Motivo: ${rData.notes}`, 15, finalY + 10);
    }

    doc.setTextColor(150, 150, 150);
    doc.setFontSize(9);
    doc.line(20, finalY + 40, 90, finalY + 40);
    doc.text('Assinatura da Empresa', 55, finalY + 45, { align: 'center' });
    
    doc.line(120, finalY + 40, 190, finalY + 40);
    doc.text('Assinatura do Profissional', 155, finalY + 45, { align: 'center' });

    doc.save(`Recibo_Comissoes_${report.professionalName.replace(/\s+/g, '_')}.pdf`);
}

async function handleBatchDelete() {
    const count = localState.selectedIds.size;
    if(count === 0) return;

    const confirmed = await showConfirmation('Excluir Recibos', `Deseja excluir e estornar ${count} recibo(s)? As vendas associadas voltarão ao status "A Apurar".`);
    if (!confirmed) return;

    try {
        const deletePromises = Array.from(localState.selectedIds).map(id => commissionsApi.deleteCommissionReport(id));
        await Promise.all(deletePromises);
        
        showNotification('Sucesso', `${count} recibos excluídos com sucesso.`, 'success');
        localState.selectedIds.clear();
        updateBatchActionBar();
        if(document.getElementById('select-all-toggle')) document.getElementById('select-all-toggle').checked = false;
        
        await fetchAndDisplayData();
    } catch (error) {
        showNotification('Erro ao Excluir', 'Ocorreu um erro ao excluir alguns recibos.', 'error');
    }
}

async function handleDeleteReport(reportId) {
    const confirmed = await showConfirmation('Excluir Recibo', 'ATENÇÃO: Deseja realmente excluir este recibo? As vendas associadas a ele voltarão ao status "A Apurar" e o valor será subtraído dos relatórios. Esta ação não pode ser desfeita.');
    if (!confirmed) return;
    
    try {
        await commissionsApi.deleteCommissionReport(reportId);
        showNotification('Sucesso', 'Recibo cancelado com sucesso. Vendas estornadas para apuração.', 'success');
        closeDetailScreen();
        await fetchAndDisplayData();
    } catch (error) { 
        showNotification('Erro ao Excluir', error.message, 'error'); 
    }
}