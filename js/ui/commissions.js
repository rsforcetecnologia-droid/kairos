// js/ui/commissions.js

import * as commissionsApi from '../api/commissions.js';
import * as professionalsApi from '../api/professionals.js';
import { getHierarchy } from '../api/establishments.js';
import { state } from '../state.js';
import { showNotification, showConfirmation, showGenericModal } from '../components/modal.js';

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
    
    // Suporte a Multi-Unidades
    establishments: [],
    filterEstablishmentIds: new Set(),
    
    // Seleção em Lote
    selectedIds: new Set(),

    // Filtros da Lista Principal
    startDate: firstDay.toISOString().split('T')[0],
    endDate: today.toISOString().split('T')[0],
    professionalId: 'all',
    searchQuery: '',

    // KPIs
    stats: { 
        revenue: 0, 
        commissions: 0,
        margin: 0,
        netPaid: 0
    }
};

let pageEventListener = null;
const contentDiv = document.getElementById('content');

// ============================================================================
// 🛠️ FUNÇÕES AUXILIARES
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

// ============================================================================
// 🚀 INICIALIZAÇÃO E LAYOUT PRINCIPAL
// ============================================================================

export async function loadCommissionsPage() {
    try {
        const [profs, hierarchyPayload] = await Promise.all([
            professionalsApi.getProfessionals(state.establishmentId),
            getHierarchy().catch(() => ({ matrizes: [] }))
        ]);
        
        localState.professionals = profs;
        
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

    renderBaseLayout();
    setupEventListeners(); 
    await fetchAndDisplayData();
}

function renderBaseLayout() {
    const profOptions = localState.professionals.map(p => 
        `<option value="${p.id}">${p.name}</option>`
    ).join('');

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
                    <i class="bi bi-trash3"></i> Excluir Recibos
                </button>
            </div>

            <div class="flex flex-col md:flex-row justify-end items-start md:items-center mb-3 gap-3 w-full">
                <div class="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    <button id="export-excel-btn" class="py-1.5 px-3 bg-white border border-slate-300 text-emerald-700 font-bold rounded-lg hover:bg-emerald-50 transition shadow-sm flex items-center gap-2 text-xs">
                        <i class="bi bi-file-earmark-excel-fill"></i> Excel
                    </button>
                    <button data-action="new-calculation" class="flex-1 md:flex-none py-1.5 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-sm flex items-center justify-center gap-2 text-xs">
                        <i class="bi bi-calculator"></i> Nova Apuração
                    </button>
                </div>
            </div>

            ${localState.establishments.length > 1 ? `
            <div class="mb-3">
                <div class="flex flex-wrap gap-2" id="establishment-filters-container">
                    ${estCheckboxes}
                </div>
            </div>
            ` : ''}

            <div id="kpi-section" class="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group">
                    <div class="absolute right-[-10px] top-[-10px] opacity-5 group-hover:opacity-10 transition-opacity"><i class="bi bi-graph-up-arrow text-5xl"></i></div>
                    <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest z-10">Faturamento Base</span>
                    <span id="kpi-revenue" class="text-base md:text-xl font-black text-slate-800 mt-0.5 z-10">R$ 0,00</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group">
                    <div class="absolute right-[-10px] top-[-10px] opacity-5 group-hover:opacity-10 transition-opacity"><i class="bi bi-cash-stack text-5xl"></i></div>
                    <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest z-10">Comissões (Bruto)</span>
                    <span id="kpi-commissions" class="text-base md:text-xl font-bold text-amber-600 mt-0.5 z-10">R$ 0,00</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group">
                    <div class="absolute right-[-10px] top-[-10px] opacity-5 group-hover:opacity-10 transition-opacity"><i class="bi bi-pie-chart text-5xl"></i></div>
                    <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest z-10">Retenção (Empresa)</span>
                    <span id="kpi-margin" class="text-base md:text-xl font-bold text-blue-600 mt-0.5 z-10">0%</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group">
                    <div class="absolute right-[-10px] top-[-10px] opacity-5 group-hover:opacity-10 transition-opacity"><i class="bi bi-check-circle text-5xl"></i></div>
                    <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest z-10">Total Líquido Pago</span>
                    <span id="kpi-net" class="text-base md:text-xl font-bold text-emerald-600 mt-0.5 z-10">R$ 0,00</span>
                </div>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 gap-2 w-full bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                <div class="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
                    <div class="flex items-center gap-1 w-full md:w-auto">
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-1 hidden md:block">Período:</span>
                        <input type="date" id="filter-start" value="${localState.startDate}" class="py-1 px-2 bg-slate-50 border border-slate-200 rounded text-xs font-semibold text-slate-700 outline-none focus:border-indigo-400">
                        <span class="text-slate-400 text-xs">até</span>
                        <input type="date" id="filter-end" value="${localState.endDate}" class="py-1 px-2 bg-slate-50 border border-slate-200 rounded text-xs font-semibold text-slate-700 outline-none focus:border-indigo-400">
                    </div>
                    
                    <div class="flex items-center gap-1 w-full md:w-auto">
                        <select id="filter-prof" class="py-1 px-2 bg-slate-50 border border-slate-200 rounded text-xs font-semibold text-slate-700 outline-none focus:border-indigo-400 w-full md:w-40">
                            <option value="all">Todos os Profissionais</option>
                            ${profOptions}
                        </select>
                    </div>

                    <button data-action="apply-filters" class="w-full md:w-auto py-1 px-3 bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold rounded hover:bg-indigo-100 transition shadow-sm text-xs">
                        Filtrar
                    </button>
                </div>

                <div class="relative w-full md:w-56 mt-1 md:mt-0">
                    <i class="bi bi-search absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400 text-[10px]"></i>
                    <input type="text" id="search-input" placeholder="Buscar relatório..." class="w-full pl-6 py-1 pr-2 bg-slate-50 border border-slate-200 rounded text-xs outline-none focus:border-indigo-400 font-semibold text-slate-700">
                </div>
            </div>

            <div class="flex-1 flex flex-col min-h-0 w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div class="hidden md:grid grid-cols-12 gap-2 px-3 py-2 text-[9px] font-bold text-slate-500 uppercase tracking-widest items-center bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
                    <div class="col-span-3 flex items-center gap-2">
                        <input type="checkbox" id="select-all-toggle" class="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer">
                        Profissional
                    </div>
                    <div class="col-span-2">Período de Ref.</div>
                    <div class="col-span-2 text-right">Bruto (R$)</div>
                    <div class="col-span-2 text-right">Ajustes (R$)</div>
                    <div class="col-span-2 text-right text-indigo-600">Líquido Pago</div>
                    <div class="col-span-1 text-center">Ações</div>
                </div>

                <div id="list-container" class="flex-1 overflow-y-auto custom-scrollbar p-2 md:p-0">
                    <div class="flex justify-center py-20"><div class="loader"></div></div>
                </div>
            </div>
        </section>
    `;
}

// ============================================================================
// 📡 DADOS E RENDERIZAÇÃO DA LISTA
// ============================================================================

async function fetchAndDisplayData() {
    const container = document.getElementById('list-container');
    container.innerHTML = '<div class="flex justify-center py-20"><div class="loader"></div></div>';

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
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center py-16">
                <i class="bi bi-exclamation-octagon text-3xl text-red-400 mb-2"></i>
                <p class="text-slate-600 text-xs font-medium">Erro ao carregar dados.</p>
            </div>`;
    }
}

function renderKPIs() {
    document.getElementById('kpi-revenue').textContent = formatCurrency(localState.stats.revenue);
    document.getElementById('kpi-commissions').textContent = formatCurrency(localState.stats.commissions);
    document.getElementById('kpi-margin').textContent = `${localState.stats.margin}%`;
    document.getElementById('kpi-net').textContent = formatCurrency(localState.stats.netPaid);
}

function renderList() {
    const container = document.getElementById('list-container');
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
                <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-receipt text-xl text-slate-300"></i>
                </div>
                <h3 class="text-sm font-bold text-slate-700 mb-1">Nenhum pagamento encontrado</h3>
                <p class="text-[10px] text-slate-400 max-w-xs">Não há relatórios gerados para este período ou profissional.</p>
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
        else ajustesStr = `<span class="text-slate-300">--</span>`;

        return `
        <div class="border-b border-slate-100 hover:bg-slate-50/80 transition-colors relative group flex flex-col md:grid md:grid-cols-12 md:gap-2 md:items-center p-2.5 md:px-3 md:py-2 mb-2 md:mb-0 bg-white md:bg-transparent rounded-xl md:rounded-none shadow-sm md:shadow-none border md:border-b ${isSelected ? 'bg-indigo-50/40' : ''}">
            
            <div class="absolute right-2 top-2 md:relative md:right-auto md:top-auto md:col-span-3 md:flex md:items-center md:gap-2 z-10">
                <input type="checkbox" value="${report.id}" class="item-checkbox w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${isSelected ? 'checked' : ''}>
                <div class="hidden md:flex items-center gap-2 pr-2">
                    <div class="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                        ${getInitials(report.professionalName)}
                    </div>
                    <div class="min-w-0">
                        <p class="font-bold text-xs text-slate-800 truncate" title="${report.professionalName}">${report.professionalName}</p>
                        <p class="text-[9px] text-slate-400 font-medium truncate mt-0.5">Gerado: ${dateStr}</p>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-2 md:hidden mb-2 pr-8">
                <div class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    ${getInitials(report.professionalName)}
                </div>
                <div class="min-w-0">
                    <p class="font-bold text-xs text-slate-800 truncate">${report.professionalName}</p>
                    <p class="text-[9px] text-slate-400 font-medium truncate mt-0.5">Gerado: ${dateStr}</p>
                </div>
            </div>

            <div class="md:col-span-2 mb-1 md:mb-0 flex items-center ml-10 md:ml-0">
                <span class="md:hidden text-[9px] font-bold text-slate-400 uppercase tracking-widest w-16">Período:</span>
                <span class="text-[10px] font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                    <i class="bi bi-calendar3 opacity-50 mr-1"></i> ${report.period}
                </span>
            </div>

            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block mb-1 md:mb-0 ml-10 md:ml-0">
                <span class="md:hidden text-[9px] font-bold text-slate-400 uppercase tracking-widest">Bruto:</span>
                <span class="text-xs font-bold text-slate-700">${formatCurrency(bruto)}</span>
            </div>
            
            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block mb-1 md:mb-0 ml-10 md:ml-0">
                <span class="md:hidden text-[9px] font-bold text-slate-400 uppercase tracking-widest">Ajustes:</span>
                <span class="text-[10px] font-bold">${ajustesStr}</span>
            </div>

            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block pt-1 md:pt-0 border-t md:border-0 border-slate-100 ml-10 md:ml-0 mt-1 md:mt-0">
                <span class="md:hidden text-[9px] font-bold text-indigo-400 uppercase tracking-widest">Líquido Pago:</span>
                <span class="text-xs font-black text-emerald-600">${formatCurrency(finalVal)}</span>
            </div>

            <div class="md:col-span-1 flex justify-end gap-1 mt-2 md:mt-0 ml-10 md:ml-0">
                <button data-action="view-report-details" data-id="${report.id}" class="w-7 h-7 rounded-md flex items-center justify-center text-slate-600 bg-slate-50 hover:bg-slate-200 transition-colors border border-slate-200 shadow-sm" title="Ver Detalhes (Itens)">
                    <i class="bi bi-eye text-[10px]"></i>
                </button>
                <button data-action="print-receipt" data-id="${report.id}" class="w-7 h-7 rounded-md flex items-center justify-center text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors border border-indigo-100 shadow-sm" title="Imprimir Recibo">
                    <i class="bi bi-printer text-[10px]"></i>
                </button>
                <button data-action="delete-report" data-id="${report.id}" class="w-7 h-7 rounded-md flex items-center justify-center text-red-500 bg-red-50 hover:bg-red-100 transition-colors border border-red-100 shadow-sm" title="Excluir e Estornar">
                    <i class="bi bi-trash3 text-[10px]"></i>
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
                    openNewCalculationModal();
                    break;
                case 'print-receipt':
                    handlePrintReceipt(id);
                    break;
                case 'delete-report':
                    handleDeleteReport(id);
                    break;
                case 'view-report-details':
                    openReportDetailsModal(id);
                    break;
                
                // --- Modal Actions ---
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

    document.getElementById('search-input').addEventListener('input', (e) => {
        localState.searchQuery = e.target.value;
        renderList();
    });

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
            fetchAndDisplayData(); 
        });
    });

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
// 🧮 MODAL DE APURAÇÃO (O FLUXO DE CÁLCULO)
// ============================================================================

function openNewCalculationModal() {
    const todayStr = new Date().toISOString().split('T')[0];
    const firstDayStr = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
    
    const profsHtml = localState.professionals.map(p => `
        <label class="flex items-center p-2.5 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-indigo-300 transition-all cursor-pointer group">
            <input type="checkbox" value="${p.id}" class="prof-checkbox w-3.5 h-3.5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500">
            <div class="ml-2 flex items-center gap-2">
                <div class="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[9px] font-bold group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">${getInitials(p.name)}</div>
                <span class="font-bold text-xs text-slate-700">${p.name}</span>
            </div>
        </label>`).join('');

    const contentHTML = `
        <div id="calc-flow-container" class="flex flex-col h-[70vh] md:h-auto max-h-[85vh] overflow-hidden">
            
            <div id="calc-step-1" class="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50">
                <div class="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                    <h3 class="text-xs font-bold text-slate-800 mb-2 flex items-center gap-2"><i class="bi bi-calendar-range text-indigo-500"></i> Período de Apuração</h3>
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Início</label>
                            <input type="date" id="calc-start-date" value="${firstDayStr}" class="w-full mt-0.5 p-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-semibold outline-none focus:border-indigo-400">
                        </div>
                        <div>
                            <label class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Fim</label>
                            <input type="date" id="calc-end-date" value="${todayStr}" class="w-full mt-0.5 p-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-semibold outline-none focus:border-indigo-400">
                        </div>
                    </div>
                </div>

                <div class="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                    <h3 class="text-xs font-bold text-slate-800 mb-2 flex items-center gap-2"><i class="bi bi-tags text-indigo-500"></i> Considerar nas vendas</h3>
                    <div class="grid grid-cols-3 gap-2">
                        <label class="flex items-center justify-center p-1.5 border border-slate-200 rounded bg-slate-50 cursor-pointer hover:bg-white transition-colors">
                            <input type="checkbox" id="calc-type-services" checked class="w-3 h-3 text-indigo-600 rounded">
                            <span class="ml-1.5 text-[10px] font-bold text-slate-600">Serviços</span>
                        </label>
                        <label class="flex items-center justify-center p-1.5 border border-slate-200 rounded bg-slate-50 cursor-pointer hover:bg-white transition-colors">
                            <input type="checkbox" id="calc-type-products" checked class="w-3 h-3 text-indigo-600 rounded">
                            <span class="ml-1.5 text-[10px] font-bold text-slate-600">Produtos</span>
                        </label>
                        <label class="flex items-center justify-center p-1.5 border border-slate-200 rounded bg-slate-50 cursor-pointer hover:bg-white transition-colors">
                            <input type="checkbox" id="calc-type-packages" class="w-3 h-3 text-indigo-600 rounded">
                            <span class="ml-1.5 text-[10px] font-bold text-slate-600">Pacotes</span>
                        </label>
                    </div>
                </div>

                <div class="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="text-xs font-bold text-slate-800 flex items-center gap-2"><i class="bi bi-people text-indigo-500"></i> Equipe</h3>
                        <button type="button" data-action="toggle-all-profs" class="text-[9px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">Inverter</button>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto custom-scrollbar pr-1">
                        ${profsHtml}
                    </div>
                </div>
            </div>

            <div id="calc-step-2" class="hidden flex-1 overflow-y-auto p-3 md:p-4 space-y-3 custom-scrollbar bg-slate-50">
                </div>

            <footer class="p-3 border-t border-slate-200 bg-white flex justify-end gap-2 z-10 shadow-md">
                <button type="button" data-action="close-modal" class="py-2 px-4 bg-slate-100 text-slate-700 font-bold text-[10px] uppercase tracking-wider rounded-lg hover:bg-slate-200 transition-colors">Cancelar</button>
                <button type="button" data-action="calculate-preview" id="btn-calc-action" class="py-2 px-5 bg-indigo-600 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg hover:bg-indigo-700 shadow-sm transition-all flex items-center gap-2">
                    <i class="bi bi-lightning-charge"></i> Calcular Vendas
                </button>
            </footer>
        </div>
    `;

    showGenericModal({
        title: "Nova Apuração de Comissões",
        contentHTML: contentHTML,
        maxWidth: 'max-w-2xl'
    });
}

async function handleCalculatePreview() {
    const profIds = Array.from(document.querySelectorAll('.prof-checkbox:checked')).map(c => c.value);
    if (profIds.length === 0) return showNotification('Atenção', 'Selecione pelo menos um profissional.', 'warning');

    const selectedEstsString = Array.from(localState.filterEstablishmentIds).join(',');
    
    // Captura os valores de input com validação
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
    btn.innerHTML = '<div class="loader-small border-white mr-1"></div> Processando...';
    btn.disabled = true;

    try {
        console.log('Enviando cálculo...', params);
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
    const results = localState.calculationResult;
    
    if (!results || results.length === 0 || results.every(r => r.summary.totalCommission === 0)) {
        showNotification('Aviso', 'Nenhuma comissão encontrada para os filtros selecionados.', 'info');
        const btn = document.getElementById('btn-calc-action');
        btn.innerHTML = '<i class="bi bi-lightning-charge"></i> Calcular Vendas';
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
        btn.className = "py-2 px-5 bg-emerald-600 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg hover:bg-emerald-700 shadow-sm transition-all flex items-center gap-2";
        btn.innerHTML = '<i class="bi bi-check2-circle text-sm"></i> Confirmar Pagamentos';
        btn.disabled = false;
    }

    const totalGeral = results.reduce((acc, r) => acc + r.finalValue, 0);

    const cardsHtml = results.map((r, idx) => {
        if (r.summary.totalCommission === 0) return ''; 
        
        // Detalhe dos Itens no Acordeão
        const itemsHtml = (r.items || []).map(item => `
            <tr class="border-b border-slate-100 last:border-0">
                <td class="py-1.5 truncate max-w-[120px] text-slate-700" title="${item.item}">${item.item}</td>
                <td class="py-1.5 text-slate-500">${item.client || '--'}</td>
                <td class="py-1.5 text-right text-slate-600">R$ ${(item.value || 0).toFixed(2)}</td>
                <td class="py-1.5 text-center text-slate-600">${item.commissionRate}%</td>
                <td class="py-1.5 text-right font-bold text-emerald-600">R$ ${(item.commissionValue || 0).toFixed(2)}</td>
            </tr>
        `).join('');

        const detailsDiv = `
            <div id="preview-details-${idx}" class="hidden mt-3 pt-3 border-t border-slate-100">
                <h5 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Itens Processados</h5>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-[10px]">
                        <thead class="text-slate-400">
                            <tr>
                                <th class="pb-1 font-bold">Serviço/Produto</th>
                                <th class="pb-1 font-bold">Cliente</th>
                                <th class="pb-1 font-bold text-right">Base</th>
                                <th class="pb-1 font-bold text-center">%</th>
                                <th class="pb-1 font-bold text-right">Comissão</th>
                            </tr>
                        </thead>
                        <tbody>${itemsHtml || '<tr><td colspan="5" class="py-2 text-center text-slate-400">Nenhum item</td></tr>'}</tbody>
                    </table>
                </div>
            </div>
        `;
        
        return `
        <div class="bg-white p-3 rounded-xl shadow-sm border border-slate-200 mb-2 relative overflow-hidden">
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"></div>
            
            <div class="flex justify-between items-start mb-2 border-b border-slate-100 pb-2 pl-2">
                <div>
                    <h4 class="font-black text-slate-800 text-xs">${r.professionalName}</h4>
                    <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">${r.summary.totalItems} itens processados</p>
                </div>
                <div class="text-right bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                    <p class="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Valor Bruto</p>
                    <p class="font-black text-slate-700 text-xs">R$ ${r.summary.totalCommission.toFixed(2)}</p>
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-2 pl-2 mb-2">
                <div>
                    <label class="text-[9px] font-bold text-red-400 uppercase tracking-widest"><i class="bi bi-dash-circle mr-1"></i>Descontos</label>
                    <div class="relative mt-0.5">
                        <span class="absolute left-2 top-1/2 transform -translate-y-1/2 text-red-400 font-bold text-[10px]">R$</span>
                        <input type="number" step="0.01" data-idx="${idx}" class="input-debit w-full pl-6 p-1.5 border border-red-200 rounded bg-red-50/50 font-black text-xs text-red-600 outline-none focus:ring-1 focus:ring-red-400" placeholder="0.00">
                    </div>
                </div>
                <div>
                    <label class="text-[9px] font-bold text-emerald-400 uppercase tracking-widest"><i class="bi bi-plus-circle mr-1"></i>Bônus</label>
                    <div class="relative mt-0.5">
                        <span class="absolute left-2 top-1/2 transform -translate-y-1/2 text-emerald-400 font-bold text-[10px]">R$</span>
                        <input type="number" step="0.01" data-idx="${idx}" class="input-credit w-full pl-6 p-1.5 border border-emerald-200 rounded bg-emerald-50/50 font-black text-xs text-emerald-600 outline-none focus:ring-1 focus:ring-emerald-400" placeholder="0.00">
                    </div>
                </div>
            </div>

            <div class="pl-2 mb-2">
                <input type="text" data-idx="${idx}" class="input-notes w-full p-1.5 bg-slate-50 border border-slate-200 rounded text-[10px] outline-none focus:border-indigo-400 text-slate-600" placeholder="Motivo dos ajustes (Opcional)">
            </div>
            
            <div class="flex justify-between items-center bg-indigo-50/50 border border-indigo-100 p-2 rounded-md pl-3 ml-2">
                <span class="text-[9px] font-black text-indigo-800 uppercase tracking-widest">Líquido a Pagar</span>
                <span class="text-sm font-black text-indigo-700 final-value-display drop-shadow-sm" data-idx="${idx}">R$ ${r.finalValue.toFixed(2)}</span>
            </div>

            <div class="pl-2">
                <button type="button" data-action="toggle-preview-details" data-idx="${idx}" class="text-[9px] font-bold text-indigo-500 hover:text-indigo-700 uppercase tracking-widest mt-2 flex items-center gap-1 transition-colors">
                    <i class="bi bi-chevron-down"></i> Ver Detalhes dos Itens
                </button>
                ${detailsDiv}
            </div>
        </div>
        `;
    }).join('');

    if (step2) step2.innerHTML = `
        <div class="bg-indigo-600 p-3 rounded-xl shadow-sm text-white mb-2 flex justify-between items-center">
            <div class="bg-indigo-900/40 p-1.5 px-2 rounded-md backdrop-blur-sm border border-indigo-400/30">
                <span class="block text-[9px] font-bold text-indigo-200 uppercase tracking-widest mb-0.5">Total a Pagar (Equipe)</span>
                <span id="grand-total-preview" class="text-lg font-black drop-shadow-md">R$ ${totalGeral.toFixed(2)}</span>
            </div>
            <div class="text-right">
                <span class="block text-[9px] font-bold text-indigo-200 uppercase tracking-widest mb-0.5">Período</span>
                <span class="text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded border border-white/20">${localState.periodString}</span>
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

    const confirmed = await showConfirmation('Confirmar Pagamentos', `Você está prestes a gerar recibos e marcar as vendas de ${count} profissional(is) como PAGAS. Confirmar?`);
    if (!confirmed) return;
    
    const btn = document.getElementById('btn-calc-action');
    btn.innerHTML = '<div class="loader-small border-white mr-1"></div> Finalizando...';
    btn.disabled = true;

    try {
        const savePromises = validResults.map(result => {
            const salesIds = (result.items || [])
                .map(item => item.originalSaleId)
                .filter(id => id !== undefined && id !== null);

            return commissionsApi.saveCommissionReport({
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
        });

        await Promise.all(savePromises);
        showNotification('Sucesso', 'Pagamentos registrados e vendas baixadas!', 'success');
        
        localState.calculationResult = null;
        document.getElementById('genericModal').style.display = 'none';
        
        await fetchAndDisplayData(); 

    } catch (error) { 
        showNotification('Erro ao Salvar', error.message, 'error'); 
        btn.innerHTML = '<i class="bi bi-check2-circle text-sm"></i> Confirmar Pagamentos';
        btn.disabled = false;
    }
}

// ============================================================================
// 🔍 VISUALIZAR DETALHES DOS RECIBOS SALVOS
// ============================================================================

function openReportDetailsModal(reportId) {
    const report = localState.reports.find(r => r.id === reportId);
    if (!report) return;

    const items = report.reportData?.items || report.items || [];
    const rData = report.summary;
    const debit = rData.extraDebit || 0;
    const credit = rData.extraCredit || 0;
    const notes = rData.notes || '';

    const itemsHtml = items.map(item => `
        <tr class="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
            <td class="py-2.5 px-3 text-slate-700 font-medium whitespace-normal min-w-[150px]">${item.item}</td>
            <td class="py-2.5 px-3 text-slate-500">${item.client || '--'}</td>
            <td class="py-2.5 px-3 text-right text-slate-600">R$ ${(item.value || 0).toFixed(2)}</td>
            <td class="py-2.5 px-3 text-center text-slate-600">${item.commissionRate}%</td>
            <td class="py-2.5 px-3 text-right font-bold text-emerald-600">R$ ${(item.commissionValue || 0).toFixed(2)}</td>
        </tr>
    `).join('');

    let adjustmentsHtml = '';
    if (debit > 0 || credit > 0 || notes) {
        adjustmentsHtml = `
            <div class="mt-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h5 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3"><i class="bi bi-sliders mr-1"></i> Ajustes Aplicados</h5>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    ${debit > 0 ? `<div class="text-sm bg-white p-2 rounded-lg border border-slate-100 shadow-sm"><span class="text-slate-500 block text-[10px] uppercase font-bold">Descontos/Vales:</span> <span class="font-black text-red-500">-R$ ${debit.toFixed(2)}</span></div>` : ''}
                    ${credit > 0 ? `<div class="text-sm bg-white p-2 rounded-lg border border-slate-100 shadow-sm"><span class="text-slate-500 block text-[10px] uppercase font-bold">Bônus Extras:</span> <span class="font-black text-emerald-500">+R$ ${credit.toFixed(2)}</span></div>` : ''}
                </div>
                ${notes ? `<div class="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-100 shadow-sm"><strong class="block text-[10px] uppercase text-slate-400 mb-1">Motivo do Ajuste:</strong> ${notes}</div>` : ''}
            </div>
        `;
    }

    const contentHTML = `
        <div class="max-h-[75vh] overflow-y-auto custom-scrollbar p-1">
            <div class="flex flex-col md:flex-row justify-between md:items-center bg-indigo-50 p-4 rounded-xl border border-indigo-100 mb-4 gap-3">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-white text-indigo-600 flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm border border-indigo-100">
                        ${getInitials(report.professionalName)}
                    </div>
                    <div>
                        <p class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Profissional</p>
                        <p class="font-black text-indigo-900 text-base leading-tight">${report.professionalName}</p>
                    </div>
                </div>
                <div class="md:text-right border-t md:border-t-0 md:border-l border-indigo-200/50 pt-2 md:pt-0 md:pl-4">
                    <p class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Período Referência</p>
                    <p class="font-bold text-indigo-700 text-sm"><i class="bi bi-calendar3 mr-1 opacity-70"></i> ${report.period}</p>
                </div>
            </div>

            <div class="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div class="overflow-x-auto custom-scrollbar">
                    <table class="w-full text-left text-xs whitespace-nowrap">
                        <thead class="bg-slate-50 text-slate-500 border-b border-slate-200">
                            <tr>
                                <th class="p-3 font-bold uppercase tracking-wider text-[10px]">Item</th>
                                <th class="p-3 font-bold uppercase tracking-wider text-[10px]">Cliente</th>
                                <th class="p-3 font-bold uppercase tracking-wider text-[10px] text-right">Base</th>
                                <th class="p-3 font-bold uppercase tracking-wider text-[10px] text-center">%</th>
                                <th class="p-3 font-bold uppercase tracking-wider text-[10px] text-right">Comissão</th>
                            </tr>
                        </thead>
                        <tbody>${itemsHtml || '<tr><td colspan="5" class="text-center py-6 text-slate-400">Nenhum item detalhado encontrado neste recibo.</td></tr>'}</tbody>
                    </table>
                </div>
                <div class="bg-slate-50 p-3 border-t border-slate-200 flex justify-between items-center">
                    <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Bruto Apurado</span>
                    <span class="font-black text-slate-700">R$ ${(rData.totalCommission || 0).toFixed(2)}</span>
                </div>
            </div>
            
            ${adjustmentsHtml}

            <div class="mt-4 flex justify-between items-center bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm">
                <span class="text-xs font-black text-emerald-600 uppercase tracking-widest"><i class="bi bi-check-circle-fill mr-1"></i> Total Líquido Pago</span>
                <span class="text-2xl font-black text-emerald-700">R$ ${(rData.finalValue || rData.totalCommission).toFixed(2)}</span>
            </div>
        </div>
    `;

    showGenericModal({
        title: "Detalhes do Pagamento",
        contentHTML: contentHTML,
        maxWidth: 'max-w-3xl'
    });
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
            headStyles: { fillColor: [241, 245, 249], textColor: [71, 85, 105], fontStyle: 'bold' },
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
        await fetchAndDisplayData();
    } catch (error) { 
        showNotification('Erro ao Excluir', error.message, 'error'); 
    }
}