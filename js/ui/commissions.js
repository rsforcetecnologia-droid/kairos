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
    
    establishmentConfig: null, 
    
    selectedIds: new Set(),
    isAdvancedFilterOpen: false,

    startDate: firstDay.toISOString().split('T')[0],
    endDate: new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0],
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

// Oculta a lista e mostra o ecrã de detalhes ocupando tudo via Flex Layout
function openDetailScreen() {
    const main = document.getElementById('commissions-layout-main');
    const detail = document.getElementById('commissions-layout-detail');
    const nav = document.getElementById('mobile-bottom-nav');
    
    if(main) main.style.display = 'none';
    if(detail) {
        detail.classList.remove('hidden');
        // Setup Modal overlay fixo que usa flexbox para controlar o scroll
        detail.className = 'fixed inset-0 z-[99999] bg-slate-900/40 backdrop-blur-sm flex flex-col items-center justify-end md:justify-center w-full h-[100dvh] overflow-hidden';
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
        detail.className = 'hidden'; // Reseta as classes
    }
    if(nav && window.innerWidth < 768) nav.style.display = '';
    localState.viewMode = 'list';
    localState.calculationResult = null; // Limpa cache
}

// ============================================================================
// 🚀 INICIALIZAÇÃO E LAYOUT PRINCIPAL
// ============================================================================

export async function loadCommissionsPage() {
    try {
        const [profs, establishmentData] = await Promise.all([
            professionalsApi.getProfessionals(state.establishmentId),
            establishmentsApi.getEstablishmentDetails(state.establishmentId).catch(() => ({}))
        ]);
        
        localState.professionals = profs;
        localState.establishmentConfig = establishmentData || {};

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

    contentDiv.innerHTML = `
        <style>
            #toast-container, .toast-notification, .modal, .modal-backdrop { z-index: 9999999 !important; }
            /* Custom Scrollbar escondida para UI Limpa mas funcional */
            .hide-scroll-calc::-webkit-scrollbar { width: 4px; }
            .hide-scroll-calc::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }
            .hide-scroll-calc::-webkit-scrollbar-track { background: transparent; }
        </style>
        
        <section id="commissions-layout-main" class="h-[calc(100vh-80px)] md:h-auto flex flex-col p-0 md:p-4 md:pl-6 w-full relative bg-slate-50 overflow-hidden" style="font-family: 'Plus Jakarta Sans', 'Nunito', sans-serif;">
            
            <div id="batch-action-bar" class="hidden fixed top-20 left-4 right-4 md:absolute md:top-4 z-50 bg-gray-900 text-white rounded-2xl shadow-2xl p-4 items-center justify-between animate-fade-in-down">
                <div class="flex items-center gap-3">
                    <button id="cancel-selection-btn" class="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors text-gray-300 hover:text-white">
                        <i class="bi bi-x-lg text-lg"></i>
                    </button>
                    <span class="font-bold text-base tracking-wide"><span id="selected-count" class="text-indigo-400">0</span> Selecionados</span>
                </div>
                <button id="batch-delete-btn" class="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg text-sm">
                    <i class="bi bi-trash3"></i> Excluir
                </button>
            </div>

            <div class="flex-shrink-0 z-30 bg-slate-50 pt-safe-top sticky top-0 md:static border-b border-gray-200 md:border-0 w-full max-w-7xl mx-auto">
                <div class="bg-white md:bg-transparent px-4 py-3 flex justify-between items-center md:pb-5">
                    <h1 class="text-xl md:hidden font-extrabold text-slate-800 tracking-tight truncate">Comissões</h1>
                    
                    <div class="flex items-center gap-3 ml-auto">
                        <button data-action="new-calculation" class="py-2.5 px-4 md:px-5 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 active:scale-95 transition-all text-sm flex items-center gap-2">
                            <i class="bi bi-calculator"></i> <span class="hidden md:inline">Nova Apuração</span><span class="md:hidden">Apurar</span>
                        </button>
                        <button id="export-excel-btn" class="py-2.5 px-4 bg-white border border-gray-200 text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition shadow-sm flex items-center gap-2 text-sm" title="Exportar Excel">
                            <i class="bi bi-file-earmark-excel-fill text-lg"></i> <span class="hidden md:inline">Exportar</span>
                        </button>
                    </div>
                </div>

                <div class="px-4 py-3 md:py-0 md:mb-5 bg-slate-50">
                    <div id="kpi-section" class="flex md:grid md:grid-cols-4 overflow-x-auto gap-3 md:gap-5 snap-x hide-scrollbar"></div>
                </div>
            </div>

            <div class="flex-1 overflow-y-auto custom-scrollbar w-full relative z-0 pb-[100px] md:pb-6" id="scrollable-content">
                
                <div class="px-4 py-3 flex flex-col gap-4 max-w-7xl mx-auto">
                    
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div class="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1 md:pb-0 w-full md:w-auto">
                            <button class="date-preset-btn px-4 py-2 bg-indigo-50 text-indigo-700 text-sm font-bold rounded-xl whitespace-nowrap shadow-sm active:scale-95 transition-all border border-indigo-200" data-preset="month">Este Mês</button>
                            <button class="date-preset-btn px-4 py-2 bg-white text-gray-600 text-sm font-bold rounded-xl whitespace-nowrap shadow-sm border border-gray-200 hover:bg-gray-50 active:scale-95 transition-all" data-preset="last_month">Mês Passado</button>
                            <button id="custom-date-btn" class="px-4 py-2 bg-white text-gray-600 text-sm font-bold rounded-xl whitespace-nowrap shadow-sm hover:bg-gray-50 active:scale-95 transition-all flex items-center gap-2 border border-gray-200"><i class="bi bi-calendar-event"></i> Customizado</button>
                        </div>
                        
                        <div class="relative w-full md:w-80">
                            <i class="bi bi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                            <input type="text" id="search-input" value="${localState.searchQuery}" placeholder="Buscar relatórios..." class="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 shadow-sm rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all">
                        </div>
                    </div>

                    <div id="filter-panel" class="hidden animate-fade-in-down">
                        <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
                            <div class="grid grid-cols-2 gap-4 flex-1">
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Data Inicial</label>
                                    <input type="date" id="filter-start" value="${localState.startDate}" class="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Data Final</label>
                                    <input type="date" id="filter-end" value="${localState.endDate}" class="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
                                </div>
                            </div>
                            <div class="flex-1">
                                <label class="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Profissional</label>
                                <select id="filter-prof" class="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500">
                                    <option value="all">Todos Profissionais</option>
                                    ${profOptions}
                                </select>
                            </div>
                            <div class="flex items-end gap-2 md:w-auto mt-2 md:mt-0">
                                <button data-action="apply-filters" class="flex-1 md:w-auto py-2.5 px-6 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 active:scale-95 transition-all text-sm flex items-center justify-center gap-2">
                                    <i class="bi bi-check2"></i> Aplicar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="hidden md:grid grid-cols-12 gap-4 px-6 py-4 text-xs font-bold text-gray-500 tracking-wide items-center bg-white border border-gray-100 sticky top-0 z-20 shadow-sm mx-4 mt-4 rounded-t-2xl max-w-7xl md:mx-auto">
                    <div class="col-span-3 flex items-center gap-2">
                        <input type="checkbox" id="select-all-toggle" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer">
                        Profissional & Unidade
                    </div>
                    <div class="col-span-2">Período de Ref.</div>
                    <div class="col-span-2 text-right">Bruto (R$)</div>
                    <div class="col-span-2 text-right">Ajustes (R$)</div>
                    <div class="col-span-2 text-right text-emerald-600">Líquido Pago</div>
                    <div class="col-span-1 text-center">Ações</div>
                </div>

                <div class="px-4 md:px-0 pb-6 w-full max-w-7xl md:mx-auto">
                    <div id="list-container" class="flex flex-col w-full md:bg-white md:border-x md:border-b md:border-gray-100 md:shadow-sm md:rounded-b-2xl">
                        <div class="flex justify-center py-20"><div class="loader mx-auto"></div></div>
                    </div>
                </div>
            </div>
        </section>

        <div id="commissions-layout-detail" class="hidden"></div>
    `;
}

// ============================================================================
// 📡 DADOS E RENDERIZAÇÃO DA LISTA
// ============================================================================

async function fetchAndDisplayData() {
    const container = document.getElementById('list-container');
    if(container) container.innerHTML = '<div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-gray-500 font-medium text-sm">Carregando comissões...</p></div>';

    // Consome o filtro global de lojas do cabecalho (App Header)
    const targetEstIds = (state.selectedEstablishments && state.selectedEstablishments.length > 0) 
        ? state.selectedEstablishments 
        : [state.establishmentId];
    
    const selectedEstsString = targetEstIds.join(',');

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
                <p class="text-gray-600 text-sm font-medium">Erro ao carregar dados.</p>
            </div>`;
    }
}

function renderKPIs() {
    const section = document.getElementById('kpi-section');
    if (!section) return;

    section.innerHTML = `
        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-indigo-50 flex items-center justify-center">
                    <i class="bi bi-graph-up-arrow text-indigo-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Faturamento<br class="md:hidden"/> Bruto</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-gray-900">${formatCurrency(localState.stats.revenue)}</span>
        </div>

        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-amber-50 flex items-center justify-center">
                    <i class="bi bi-wallet2 text-amber-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Comissões<br class="md:hidden"/> Pagas</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-amber-600">${formatCurrency(localState.stats.commissions)}</span>
        </div>

        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-blue-50 flex items-center justify-center">
                    <i class="bi bi-pie-chart-fill text-blue-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Retenção<br class="md:hidden"/> Líquida</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-blue-600">${localState.stats.margin}%</span>
        </div>

        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-emerald-50 flex items-center justify-center">
                    <i class="bi bi-cash-stack text-emerald-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Líquido<br class="md:hidden"/> Pago</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-emerald-600">${formatCurrency(localState.stats.netPaid)}</span>
        </div>
    `;
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
            <div class="flex flex-col items-center justify-center py-20 bg-white md:bg-transparent text-center rounded-b-2xl">
                <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5">
                    <i class="bi bi-receipt text-4xl text-gray-300"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-1">Nenhum pagamento</h3>
                <p class="text-sm font-medium text-gray-400 max-w-xs px-4">Não há relatórios gerados para este período ou profissional.</p>
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
        const unitName = report.establishmentName || 'Unidade Atual';
        
        let ajustesStr = '';
        if (debit > 0 && credit > 0) ajustesStr = `<span class="text-red-500">-R$${debit.toFixed(2)}</span> / <span class="text-emerald-500">+R$${credit.toFixed(2)}</span>`;
        else if (debit > 0) ajustesStr = `<span class="text-red-500">-R$ ${debit.toFixed(2)}</span>`;
        else if (credit > 0) ajustesStr = `<span class="text-emerald-500">+R$ ${credit.toFixed(2)}</span>`;
        else ajustesStr = `<span class="text-gray-300">--</span>`;

        return `
        <div class="bg-white border border-gray-100 md:border-0 md:border-b md:border-gray-100 hover:bg-gray-50 transition-all cursor-pointer relative flex flex-col md:grid md:grid-cols-12 md:gap-4 md:items-center p-4 md:px-6 md:py-4 mb-3 md:mb-0 rounded-2xl md:rounded-none ${isSelected ? 'ring-2 md:ring-0 ring-indigo-500 bg-indigo-50/50 md:bg-indigo-50/50' : ''}">
            
            <div class="absolute right-3 top-3 md:relative md:right-auto md:top-auto md:col-span-3 md:flex md:items-center md:gap-3 z-10">
                <input type="checkbox" value="${report.id}" class="item-checkbox w-4 h-4 md:w-5 md:h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm bg-white" ${isSelected ? 'checked' : ''}>
                
                <div class="hidden md:flex items-center gap-3 pr-2">
                    <div class="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-sm flex-shrink-0 shadow-sm border border-indigo-200">
                        ${getInitials(report.professionalName)}
                    </div>
                    <div class="min-w-0">
                        <p class="font-bold text-sm text-slate-900 truncate" title="${report.professionalName}">${report.professionalName}</p>
                        <div class="flex items-center gap-1.5 mt-0.5">
                            <span class="text-[9px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 truncate max-w-[90px]" title="${unitName}"><i class="bi bi-shop"></i> ${unitName}</span>
                            <span class="text-[10px] text-slate-400 font-medium truncate">Gerado: ${dateStr}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="md:hidden flex items-center gap-3 w-full pr-8 mb-3">
                <div class="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-sm flex-shrink-0 shadow-sm border border-indigo-200">
                    ${getInitials(report.professionalName)}
                </div>
                <div class="min-w-0">
                    <p class="font-bold text-sm text-slate-900 truncate">${report.professionalName}</p>
                    <div class="flex items-center gap-1.5 mt-0.5">
                        <span class="text-[9px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 truncate max-w-[120px]"><i class="bi bi-shop"></i> ${unitName}</span>
                        <span class="text-[10px] text-slate-400 font-medium truncate">Gerado: ${dateStr}</span>
                    </div>
                </div>
            </div>

            <div class="md:col-span-2 flex flex-col justify-center mb-2 md:mb-0 md:pl-0">
                <span class="md:hidden text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Período de Ref.</span>
                <span class="text-[10px] font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded-lg border border-gray-200 shadow-sm w-max max-w-full truncate">
                    <i class="bi bi-calendar3 opacity-50 mr-1.5"></i> ${report.period}
                </span>
            </div>

            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block mb-1.5 md:mb-0">
                <span class="md:hidden text-[10px] font-bold text-gray-400 uppercase tracking-widest">Bruto:</span>
                <span class="text-sm font-bold text-gray-700">${formatCurrency(bruto)}</span>
            </div>
            
            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block mb-2 md:mb-0">
                <span class="md:hidden text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ajustes:</span>
                <span class="text-xs font-bold">${ajustesStr}</span>
            </div>

            <div class="md:col-span-2 md:text-right flex items-center justify-between md:block pt-2 md:pt-0 border-t md:border-0 border-gray-100 mt-2 md:mt-0">
                <span class="md:hidden text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Líquido Pago:</span>
                <span class="text-base font-black text-emerald-600">${formatCurrency(finalVal)}</span>
            </div>

            <div class="md:col-span-1 flex justify-end gap-2 mt-3 md:mt-0 z-20">
                <button data-action="view-report-details" data-id="${report.id}" class="w-9 h-9 rounded-xl flex items-center justify-center text-indigo-500 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 transition-colors shadow-sm" title="Ver Detalhes">
                    <i class="bi bi-eye text-base"></i>
                </button>
                <button data-action="print-receipt" data-id="${report.id}" class="w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors shadow-sm" title="Imprimir Recibo">
                    <i class="bi bi-printer text-base"></i>
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
                    document.getElementById('custom-date-btn')?.click(); // Hide the panel after applying
                    fetchAndDisplayData();
                    break;
                case 'new-calculation':
                    renderNewCalculationView();
                    break;
                case 'whatsapp-receipt':
                    handleWhatsAppReceipt(id);
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
                case 'set-calc-preset':
                    handleCalcDatePreset(actionBtn);
                    break;
                case 'toggle-all-profs':
                    const checkboxes = document.querySelectorAll('.prof-checkbox');
                    const allChecked = Array.from(checkboxes).every(c => c.checked);
                    checkboxes.forEach(c => c.checked = !allChecked);
                    // Update visual state of custom toggles
                    document.querySelectorAll('.prof-toggle-ui').forEach(ui => {
                        if (!allChecked) {
                            ui.classList.replace('bg-slate-100', 'bg-indigo-500');
                            ui.classList.replace('border-slate-300', 'border-indigo-500');
                            ui.querySelector('.toggle-dot').classList.replace('translate-x-0', 'translate-x-4');
                        } else {
                            ui.classList.replace('bg-indigo-500', 'bg-slate-100');
                            ui.classList.replace('border-indigo-500', 'border-slate-300');
                            ui.querySelector('.toggle-dot').classList.replace('translate-x-4', 'translate-x-0');
                        }
                    });
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
                    const icon = actionBtn.querySelector('i.chevron-icon');
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

    // Dynamic UI Update for Custom Toggles
    document.body.addEventListener('change', (e) => {
        if (e.target.classList.contains('custom-toggle-input')) {
            const wrapper = e.target.closest('label');
            const toggleBg = wrapper.querySelector('.toggle-bg');
            const toggleDot = wrapper.querySelector('.toggle-dot');
            const labelText = wrapper.querySelector('.toggle-text');
            
            if (e.target.checked) {
                toggleBg.classList.replace('bg-slate-200', 'bg-indigo-500');
                toggleDot.classList.replace('translate-x-1', 'translate-x-6');
                if(labelText) labelText.classList.replace('text-slate-500', 'text-indigo-700');
            } else {
                toggleBg.classList.replace('bg-indigo-500', 'bg-slate-200');
                toggleDot.classList.replace('translate-x-6', 'translate-x-1');
                if(labelText) labelText.classList.replace('text-indigo-700', 'text-slate-500');
            }
        }
        
        if (e.target.classList.contains('prof-checkbox')) {
            const wrapper = e.target.closest('label');
            const toggleUi = wrapper.querySelector('.prof-toggle-ui');
            const dot = wrapper.querySelector('.toggle-dot');
            if(e.target.checked) {
                toggleUi.classList.replace('bg-slate-100', 'bg-indigo-500');
                toggleUi.classList.replace('border-slate-300', 'border-indigo-500');
                dot.classList.replace('translate-x-0', 'translate-x-4');
            } else {
                toggleUi.classList.replace('bg-indigo-500', 'bg-slate-100');
                toggleUi.classList.replace('border-indigo-500', 'border-slate-300');
                dot.classList.replace('translate-x-4', 'translate-x-0');
            }
        }
    });

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

    const exportBtn = document.getElementById('export-excel-btn');
    if (exportBtn) exportBtn.addEventListener('click', handleExportExcel);

    // Toggle Advanced Filter Panel
    document.getElementById('custom-date-btn')?.addEventListener('click', () => {
        const panel = document.getElementById('filter-panel');
        const btn = document.getElementById('custom-date-btn');
        localState.isAdvancedFilterOpen = !localState.isAdvancedFilterOpen;
        
        if (localState.isAdvancedFilterOpen) {
            panel.classList.remove('hidden');
            btn.classList.add('bg-gray-900', 'text-white', 'border-gray-900');
            btn.classList.remove('bg-white', 'text-gray-600', 'border-gray-200');
        } else {
            panel.classList.add('hidden');
            btn.classList.remove('bg-gray-900', 'text-white', 'border-gray-900');
            btn.classList.add('bg-white', 'text-gray-600', 'border-gray-200');
        }
    });

    // Handle Preset Buttons for main list
    document.querySelectorAll('.date-preset-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (navigator.vibrate) navigator.vibrate(15);
            document.querySelectorAll('.date-preset-btn').forEach(b => {
                b.classList.remove('bg-indigo-50', 'text-indigo-700', 'border-indigo-200');
                b.classList.add('bg-white', 'text-gray-600', 'border-gray-200');
            });
            e.target.classList.add('bg-indigo-50', 'text-indigo-700', 'border-indigo-200');
            e.target.classList.remove('bg-white', 'text-gray-600', 'border-gray-200');

            const preset = e.target.dataset.preset;
            const now = new Date();
            let start, end;

            if (preset === 'month') {
                start = new Date(now.getFullYear(), now.getMonth(), 1);
                end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            } else if (preset === 'last_month') {
                start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                end = new Date(now.getFullYear(), now.getMonth(), 0);
            }

            document.getElementById('filter-start').value = start.toISOString().split('T')[0];
            document.getElementById('filter-end').value = end.toISOString().split('T')[0];
            
            localState.startDate = start.toISOString().split('T')[0];
            localState.endDate = end.toISOString().split('T')[0];
            fetchAndDisplayData();
        });
    });
}

function handleCalcDatePreset(actionBtn) {
    const presetType = actionBtn.dataset.preset;
    const now = new Date();
    let start, end;

    if (presetType === 'month') {
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    } else if (presetType === 'last_month') {
        start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        end = new Date(now.getFullYear(), now.getMonth(), 0);
    } else if (presetType === 'today') {
        start = new Date();
        end = new Date();
    }

    if(start && end) {
        document.getElementById('calc-start-date').value = start.toISOString().split('T')[0];
        document.getElementById('calc-end-date').value = end.toISOString().split('T')[0];
    }

    document.querySelectorAll('button[data-action="set-calc-preset"]').forEach(b => {
        b.classList.remove('bg-indigo-50', 'text-indigo-700', 'border-indigo-200');
        b.classList.add('bg-white', 'text-gray-500', 'border-gray-200');
    });
    actionBtn.classList.add('bg-indigo-50', 'text-indigo-700', 'border-indigo-200');
    actionBtn.classList.remove('bg-white', 'text-gray-500', 'border-gray-200');
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
// 🧮 NOVA TELA: APURAÇÃO E CÁLCULO (ARQUITETURA FLEXBOX / BOTTOM SHEET)
// ============================================================================

function renderNewCalculationView() {
    localState.viewMode = 'new-calc';
    const detailContainer = document.getElementById('commissions-layout-detail');
    if(!detailContainer) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const firstDayStr = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
    
    // Lista de profissionais modernizada (Checkbox style toggle)
    const profsHtml = localState.professionals.map(p => `
        <label class="flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-indigo-300 transition-all cursor-pointer group mb-2">
            <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-black group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">${getInitials(p.name)}</div>
                <span class="font-bold text-sm text-slate-800">${p.name}</span>
            </div>
            <div class="relative">
                <input type="checkbox" value="${p.id}" class="prof-checkbox sr-only">
                <div class="prof-toggle-ui block w-10 h-6 bg-slate-100 border border-slate-300 rounded-full transition-colors"></div>
                <div class="toggle-dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform translate-x-0 shadow-sm border border-slate-200"></div>
            </div>
        </label>`).join('');

    detailContainer.innerHTML = `
        <div class="w-full h-full md:h-auto md:max-h-[90vh] md:max-w-3xl md:w-[90%] flex flex-col bg-slate-50 md:rounded-3xl shadow-2xl overflow-hidden relative animate-fade-in-down">
            
            <header class="flex-shrink-0 p-4 border-b border-slate-200 bg-white flex items-center justify-between shadow-sm z-20">
                <div class="flex items-center gap-3">
                    <button type="button" data-action="close-detail-screen" class="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 transition-transform active:scale-95">
                        <i class="bi bi-x-lg text-lg"></i>
                    </button>
                    <div>
                        <h3 id="calc-header-title" class="font-black text-base text-slate-800 uppercase tracking-wider">Apuração de Vendas (1/2)</h3>
                    </div>
                </div>
            </header>

            <div id="calc-step-1" class="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar bg-slate-50 space-y-6">
                
                <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-sm font-black text-slate-800 flex items-center gap-2"><i class="bi bi-calendar-range text-indigo-500"></i> Período</h3>
                    </div>
                    
                    <div class="flex gap-2 mb-4 overflow-x-auto hide-scroll-calc pb-1">
                        <button type="button" data-action="set-calc-preset" data-preset="month" class="px-4 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold whitespace-nowrap shadow-sm transition-colors">Este Mês</button>
                        <button type="button" data-action="set-calc-preset" data-preset="last_month" class="px-4 py-2 bg-white text-slate-500 border border-slate-200 rounded-xl text-xs font-bold whitespace-nowrap shadow-sm hover:bg-slate-50 transition-colors">Mês Passado</button>
                        <button type="button" data-action="set-calc-preset" data-preset="today" class="px-4 py-2 bg-white text-slate-500 border border-slate-200 rounded-xl text-xs font-bold whitespace-nowrap shadow-sm hover:bg-slate-50 transition-colors">Hoje</button>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Início</label>
                            <input type="date" id="calc-start-date" value="${firstDayStr}" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner">
                        </div>
                        <div>
                            <label class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Fim</label>
                            <input type="date" id="calc-end-date" value="${todayStr}" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner">
                        </div>
                    </div>
                </div>

                <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <h3 class="text-sm font-black text-slate-800 mb-4 flex items-center gap-2"><i class="bi bi-tags text-indigo-500"></i> Considerar na Apuração</h3>
                    <div class="flex flex-col gap-3">
                        <label class="flex items-center justify-between cursor-pointer group">
                            <span class="toggle-text text-indigo-700 text-sm font-bold uppercase tracking-wider transition-colors">Serviços Executados</span>
                            <div class="relative">
                                <input type="checkbox" id="calc-type-services" checked class="custom-toggle-input sr-only">
                                <div class="toggle-bg block w-12 h-7 bg-indigo-500 rounded-full shadow-inner transition-colors"></div>
                                <div class="toggle-dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform transform translate-x-6 shadow-sm"></div>
                            </div>
                        </label>
                        <div class="border-t border-slate-100"></div>
                        <label class="flex items-center justify-between cursor-pointer group">
                            <span class="toggle-text text-indigo-700 text-sm font-bold uppercase tracking-wider transition-colors">Produtos Vendidos</span>
                            <div class="relative">
                                <input type="checkbox" id="calc-type-products" checked class="custom-toggle-input sr-only">
                                <div class="toggle-bg block w-12 h-7 bg-indigo-500 rounded-full shadow-inner transition-colors"></div>
                                <div class="toggle-dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform transform translate-x-6 shadow-sm"></div>
                            </div>
                        </label>
                        <div class="border-t border-slate-100"></div>
                        <label class="flex items-center justify-between cursor-pointer group">
                            <span class="toggle-text text-slate-500 text-sm font-bold uppercase tracking-wider transition-colors">Venda de Pacotes</span>
                            <div class="relative">
                                <input type="checkbox" id="calc-type-packages" class="custom-toggle-input sr-only">
                                <div class="toggle-bg block w-12 h-7 bg-slate-200 rounded-full shadow-inner transition-colors"></div>
                                <div class="toggle-dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform transform translate-x-1 shadow-sm"></div>
                            </div>
                        </label>
                    </div>
                </div>

                <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-sm font-black text-slate-800 flex items-center gap-2"><i class="bi bi-people text-indigo-500"></i> Selecionar Equipe</h3>
                        <button type="button" data-action="toggle-all-profs" class="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors shadow-sm active:scale-95">Inverter Sel.</button>
                    </div>
                    <div class="max-h-60 overflow-y-auto custom-scrollbar pr-2 grid grid-cols-1 md:grid-cols-2 md:gap-x-4">
                        ${profsHtml}
                    </div>
                </div>
            </div>

            <div id="calc-step-2" class="hidden flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar bg-slate-50/50 space-y-4"></div>

            <footer class="flex-shrink-0 p-4 border-t border-slate-200 bg-white flex justify-end gap-3 z-20 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.05)]">
                <button type="button" data-action="close-detail-screen" class="hidden md:block py-3 px-6 bg-white border border-slate-300 text-slate-700 font-bold text-sm rounded-xl hover:bg-slate-50 transition-colors shadow-sm uppercase tracking-wider">Cancelar</button>
                <button type="button" data-action="calculate-preview" id="btn-calc-action" class="w-full md:w-auto py-3 px-8 bg-indigo-600 text-white font-black text-sm rounded-xl hover:bg-indigo-700 shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider">
                    <i class="bi bi-calculator text-lg"></i> Calcular Vendas
                </button>
            </footer>
        </div>
    `;

    openDetailScreen();
}

async function handleCalculatePreview() {
    const profIds = Array.from(document.querySelectorAll('.prof-checkbox:checked')).map(c => c.value);
    if (profIds.length === 0) return showNotification('Atenção', 'Selecione pelo menos um profissional na lista.', 'warning');

    // Consome o filtro global de lojas do cabecalho (App Header)
    const targetEstIds = (state.selectedEstablishments && state.selectedEstablishments.length > 0) 
        ? state.selectedEstablishments 
        : [state.establishmentId];
    const selectedEstsString = targetEstIds.join(',');
    
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

    // Altera Header
    const headerTitle = document.getElementById('calc-header-title');
    if (headerTitle) headerTitle.innerText = "Revisão e Pagamento (2/2)";

    const step1 = document.getElementById('calc-step-1');
    const step2 = document.getElementById('calc-step-2');
    const btn = document.getElementById('btn-calc-action');

    if (step1) step1.classList.add('hidden');
    if (step2) step2.classList.remove('hidden');

    if (btn) {
        btn.dataset.action = "save-final-reports";
        btn.className = "w-full md:w-auto py-3 px-8 bg-emerald-600 text-white font-black text-sm rounded-xl hover:bg-emerald-700 shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider";
        btn.innerHTML = '<i class="bi bi-check2-circle text-lg"></i> Confirmar Pagtos.';
        btn.disabled = false;
    }

    const totalGeral = results.reduce((acc, r) => acc + r.finalValue, 0);

    const cardsHtml = results.map((r, idx) => {
        if (r.summary.totalCommission === 0) return ''; 
        const unitName = r.establishmentName || 'Unidade Atual';
        
        const itemsHtml = (r.items || []).map(item => `
            <tr class="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                <td class="py-2.5 truncate max-w-[120px] text-slate-800 font-bold" title="${item.item}">${item.item}</td>
                <td class="py-2.5 text-slate-500 font-medium">${item.client || '--'}</td>
                <td class="py-2.5 text-right text-slate-600 font-bold">R$ ${(item.value || 0).toFixed(2)}</td>
                <td class="py-2.5 text-center text-slate-600 font-bold">${item.commissionRate}%</td>
                <td class="py-2.5 text-right font-black text-emerald-600">R$ ${(item.commissionValue || 0).toFixed(2)}</td>
            </tr>
        `).join('');

        const tableDetailsDiv = `
            <div id="preview-details-${idx}" class="hidden mt-4 pt-4 border-t border-slate-100 animate-fade-in-down">
                <h5 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Itens Processados</h5>
                <div class="overflow-x-auto border border-slate-200 rounded-xl shadow-sm custom-scrollbar bg-white">
                    <table class="w-full text-left text-xs whitespace-nowrap">
                        <thead class="text-slate-500 bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th class="p-3 font-bold uppercase tracking-wider text-[10px]">Serviço/Produto</th>
                                <th class="p-3 font-bold uppercase tracking-wider text-[10px]">Cliente</th>
                                <th class="p-3 font-bold uppercase tracking-wider text-[10px] text-right">Base</th>
                                <th class="p-3 font-bold uppercase tracking-wider text-[10px] text-center">%</th>
                                <th class="p-3 font-bold uppercase tracking-wider text-[10px] text-right">Comissão</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white">${itemsHtml || '<tr><td colspan="5" class="py-4 text-center text-slate-400">Nenhum item</td></tr>'}</tbody>
                    </table>
                </div>
            </div>
        `;
        
        return `
        <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 mb-4 relative overflow-hidden">
            <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-500"></div>
            
            <div class="flex justify-between items-start mb-5 border-b border-slate-100 pb-4 pl-3">
                <div>
                    <h4 class="font-black text-slate-800 text-base uppercase tracking-wider flex items-center gap-2">
                        ${r.professionalName}
                    </h4>
                    <div class="flex items-center gap-2 mt-1">
                        <span class="text-[9px] font-bold bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded border border-indigo-100"><i class="bi bi-shop"></i> ${unitName}</span>
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${r.summary.totalItems} itens calculados</span>
                    </div>
                </div>
                <div class="text-right bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 shadow-inner">
                    <p class="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Valor Bruto</p>
                    <p class="font-black text-slate-800 text-base md:text-lg leading-none">R$ ${r.summary.totalCommission.toFixed(2)}</p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pl-3 mb-4">
                <div>
                    <label class="text-[10px] font-bold text-red-500 uppercase tracking-widest block mb-1.5"><i class="bi bi-dash-circle mr-1"></i>Descontos/Vales</label>
                    <div class="relative">
                        <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-400 font-black text-sm">R$</span>
                        <input type="number" step="0.01" data-idx="${idx}" class="input-debit w-full pl-10 p-3 border border-red-200 rounded-xl bg-white shadow-inner font-black text-base text-red-600 outline-none focus:ring-2 focus:ring-red-500" placeholder="0.00">
                    </div>
                </div>
                <div>
                    <label class="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-1.5"><i class="bi bi-plus-circle mr-1"></i>Bônus Extras</label>
                    <div class="relative">
                        <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400 font-black text-sm">R$</span>
                        <input type="number" step="0.01" data-idx="${idx}" class="input-credit w-full pl-10 p-3 border border-emerald-200 rounded-xl bg-white shadow-inner font-black text-base text-emerald-600 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="0.00">
                    </div>
                </div>
            </div>

            <div class="pl-3 mb-5">
                <input type="text" data-idx="${idx}" class="input-notes w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-700 shadow-inner" placeholder="Motivo dos ajustes (Opcional)">
            </div>
            
            <div class="flex justify-between items-center bg-indigo-50 border border-indigo-200 p-4 rounded-xl pl-5 ml-3 shadow-sm">
                <span class="text-[10px] md:text-xs font-bold text-indigo-700 uppercase tracking-widest">Líquido a Pagar</span>
                <span class="text-2xl font-black text-indigo-800 final-value-display drop-shadow-sm" data-idx="${idx}">R$ ${r.finalValue.toFixed(2)}</span>
            </div>

            <div class="pl-3 mt-4 border-t border-slate-50 pt-4">
                <button type="button" data-action="toggle-preview-details" data-idx="${idx}" class="w-full text-xs font-bold text-slate-600 hover:text-indigo-700 uppercase tracking-widest flex items-center justify-center gap-1.5 transition-colors bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 shadow-sm active:scale-[0.98]">
                    <i class="bi bi-list-check"></i> Abrir Detalhamento de Itens <i class="bi bi-chevron-down chevron-icon ml-1"></i>
                </button>
                ${tableDetailsDiv}
            </div>
        </div>
        `;
    }).join('');

    if (step2) step2.innerHTML = `
        <div class="bg-gradient-to-r from-indigo-700 to-indigo-800 p-5 rounded-2xl shadow-lg text-white mb-6 flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden border border-indigo-600 gap-4 sticky top-0 z-10">
            <div class="absolute right-[-10px] top-[-10px] opacity-10"><i class="bi bi-cash-coin text-9xl"></i></div>
            <div class="bg-indigo-900/40 p-4 px-5 rounded-xl backdrop-blur-sm border border-indigo-400/30 z-10 w-full md:w-auto">
                <span class="block text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-1.5">Soma Total Equipe</span>
                <span id="grand-total-preview" class="text-3xl font-black drop-shadow-md">R$ ${totalGeral.toFixed(2)}</span>
            </div>
            <div class="text-left md:text-right z-10 flex flex-col items-start md:items-end w-full md:w-auto">
                <span class="block text-[9px] font-bold text-indigo-200 uppercase tracking-widest mb-1.5">Período Selecionado</span>
                <span class="text-xs font-black bg-white/20 px-3 py-2 rounded-xl border border-white/30 shadow-sm flex items-center gap-2"><i class="bi bi-calendar3"></i> ${localState.periodString}</span>
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

    const confirmed = await showConfirmation('Confirmar Pagamentos', `Você está prestes a gerar recibos e marcar as vendas de ${count} profissional(is) como PAGAS. Essa ação lançará a despesa correspondente no Financeiro da respectiva unidade. Confirmar?`);
    if (!confirmed) return;
    
    const btn = document.getElementById('btn-calc-action');
    btn.innerHTML = '<div class="loader-small border-white mr-2"></div> Finalizando...';
    btn.disabled = true;

    try {
        const savePromises = validResults.map(async (result) => {
            const salesIds = (result.items || [])
                .map(item => item.originalSaleId)
                .filter(id => id !== undefined && id !== null);

            // Garante que o ID salvo seja o da unidade do resultado, caso contrário, usa o global
            const unitIdToSave = result.establishmentId || state.establishmentId;

            await commissionsApi.saveCommissionReport({
                professionalId: result.professionalId,
                professionalName: result.professionalName,
                period: localState.periodString,
                processedSalesIds: salesIds,
                establishmentId: unitIdToSave, 
                establishmentName: result.establishmentName || '',
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
                        establishmentId: unitIdToSave,
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
// 🔍 NOVA TELA: DETALHES DO RECIBO (ARQUITETURA FLEXBOX / BOTTOM SHEET)
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
    const unitName = report.establishmentName || 'Unidade Atual';

    const itemsHtml = items.map(item => `
        <tr class="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
            <td class="py-3 px-4 text-slate-800 font-bold whitespace-normal min-w-[150px]">${item.item}</td>
            <td class="py-3 px-4 text-slate-500 font-medium">${item.client || '--'}</td>
            <td class="py-3 px-4 text-right text-slate-600 font-bold">R$ ${(item.value || 0).toFixed(2)}</td>
            <td class="py-3 px-4 text-center text-slate-600 font-black">${item.commissionRate}%</td>
            <td class="py-3 px-4 text-right font-black text-emerald-600">R$ ${(item.commissionValue || 0).toFixed(2)}</td>
        </tr>
    `).join('');

    let adjustmentsHtml = '';
    if (debit > 0 || credit > 0 || notes) {
        adjustmentsHtml = `
            <div class="mt-5 bg-slate-50 p-5 rounded-3xl border border-slate-200 shadow-sm">
                <h5 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4"><i class="bi bi-sliders mr-1 text-indigo-500"></i> Ajustes Aplicados</h5>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    ${debit > 0 ? `<div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm"><span class="text-slate-400 block text-[9px] uppercase tracking-widest font-bold mb-1">Descontos/Vales</span> <span class="font-black text-red-500 text-xl leading-none">-R$ ${debit.toFixed(2)}</span></div>` : ''}
                    ${credit > 0 ? `<div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm"><span class="text-slate-400 block text-[9px] uppercase tracking-widest font-bold mb-1">Bônus Extras</span> <span class="font-black text-emerald-500 text-xl leading-none">+R$ ${credit.toFixed(2)}</span></div>` : ''}
                </div>
                ${notes ? `<div class="text-sm font-bold text-slate-600 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm"><strong class="block text-[9px] uppercase tracking-widest text-indigo-400 mb-1.5"><i class="bi bi-card-text"></i> Motivo do Ajuste</strong> ${notes}</div>` : ''}
            </div>
        `;
    }

    detailContainer.innerHTML = `
        <div class="w-full h-full md:h-auto md:max-h-[90vh] md:max-w-4xl md:w-[90%] flex flex-col bg-slate-50 md:rounded-3xl shadow-2xl overflow-hidden relative animate-fade-in-down">
            
            <header class="flex-shrink-0 p-4 border-b border-slate-200 bg-white flex items-center justify-between shadow-sm z-20">
                <div class="flex items-center gap-3">
                    <button type="button" data-action="close-detail-screen" class="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 transition-transform active:scale-95">
                        <i class="bi bi-arrow-left text-lg"></i>
                    </button>
                    <div>
                        <h3 class="font-black text-base text-slate-800 uppercase tracking-wider">Detalhes do Recibo</h3>
                    </div>
                </div>
            </header>

            <div class="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar bg-slate-50">
                <div class="flex flex-col md:flex-row justify-between md:items-center bg-indigo-50 p-5 md:p-6 rounded-2xl md:rounded-3xl border border-indigo-200 mb-5 gap-4 shadow-sm relative overflow-hidden">
                    <div class="absolute right-0 top-0 bottom-0 w-2 bg-indigo-500"></div>
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 rounded-2xl bg-white text-indigo-600 flex items-center justify-center font-black text-2xl flex-shrink-0 shadow-sm border border-indigo-100">
                            ${getInitials(report.professionalName)}
                        </div>
                        <div>
                            <p class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-0.5">Profissional</p>
                            <p class="font-black text-indigo-900 text-2xl leading-tight uppercase tracking-wider">${report.professionalName}</p>
                            <p class="text-[10px] font-bold text-indigo-600 mt-1 flex items-center gap-1"><i class="bi bi-shop"></i> ${unitName}</p>
                        </div>
                    </div>
                    <div class="md:text-right border-t md:border-t-0 md:border-l border-indigo-200 pt-4 md:pt-0 md:pl-6">
                        <p class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Período Base</p>
                        <p class="font-black text-indigo-700 text-sm md:text-base bg-white px-4 py-2 rounded-xl shadow-sm border border-indigo-100 flex items-center justify-center md:justify-end gap-2"><i class="bi bi-calendar3 opacity-50 text-xl"></i> ${report.period}</p>
                    </div>
                </div>

                <div class="border border-slate-200 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm bg-white">
                    <div class="overflow-x-auto custom-scrollbar">
                        <table class="w-full text-left text-sm whitespace-nowrap">
                            <thead class="bg-slate-50 text-slate-500 border-b border-slate-200">
                                <tr>
                                    <th class="p-4 font-bold uppercase tracking-wider text-[10px]">Serviço / Produto</th>
                                    <th class="p-4 font-bold uppercase tracking-wider text-[10px]">Cliente</th>
                                    <th class="p-4 font-bold uppercase tracking-wider text-[10px] text-right">Base Calc.</th>
                                    <th class="p-4 font-bold uppercase tracking-wider text-[10px] text-center">%</th>
                                    <th class="p-4 font-bold uppercase tracking-wider text-[10px] text-right">Comissão</th>
                                </tr>
                            </thead>
                            <tbody>${itemsHtml || '<tr><td colspan="5" class="text-center py-10 text-slate-400 font-bold text-sm">Nenhum item detalhado neste recibo.</td></tr>'}</tbody>
                        </table>
                    </div>
                    <div class="bg-slate-50 p-5 border-t border-slate-200 flex justify-between items-center shadow-inner">
                        <span class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Bruto Apurado</span>
                        <span class="font-black text-slate-800 text-2xl drop-shadow-sm">R$ ${(rData.totalCommission || 0).toFixed(2)}</span>
                    </div>
                </div>
                
                ${adjustmentsHtml}

                <div class="mt-5 flex flex-col md:flex-row justify-between items-start md:items-center bg-emerald-50 p-6 rounded-2xl md:rounded-3xl border border-emerald-200 shadow-sm relative overflow-hidden gap-2">
                    <div class="absolute right-[-10px] top-[-10px] opacity-10"><i class="bi bi-check-circle-fill text-8xl md:text-9xl text-emerald-500"></i></div>
                    <div class="z-10">
                        <span class="block text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1 flex items-center gap-1.5"><i class="bi bi-cash-stack text-base"></i> Total Líquido Pago</span>
                        <span class="text-3xl md:text-4xl font-black text-emerald-700 drop-shadow-sm">R$ ${(rData.finalValue || rData.totalCommission).toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <footer class="flex-shrink-0 p-4 border-t border-slate-200 bg-white flex gap-2 md:gap-3 z-20 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.05)] md:rounded-b-3xl">
                <button data-action="whatsapp-receipt" data-id="${report.id}" class="flex-1 py-3 md:py-3.5 bg-[#25D366]/10 text-[#075E54] font-black text-xs md:text-sm rounded-xl hover:bg-[#25D366]/20 transition-colors shadow-sm uppercase tracking-wider flex items-center justify-center gap-1.5 md:gap-2 border border-[#25D366]/30 active:scale-95" title="Enviar por WhatsApp">
                    <i class="bi bi-whatsapp text-lg md:text-xl"></i> <span class="truncate">WhatsApp</span>
                </button>
                <button data-action="print-receipt" data-id="${report.id}" class="flex-1 py-3 md:py-3.5 bg-indigo-50 text-indigo-700 font-black text-xs md:text-sm rounded-xl hover:bg-indigo-100 transition-colors shadow-sm uppercase tracking-wider flex items-center justify-center gap-1.5 md:gap-2 border border-indigo-200 active:scale-95">
                    <i class="bi bi-printer text-lg md:text-xl"></i> <span class="truncate">Imprimir</span>
                </button>
                <button data-action="delete-report" data-id="${report.id}" class="w-12 md:w-14 h-auto bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors border border-red-200 shadow-sm active:scale-95" title="Excluir e Estornar">
                    <i class="bi bi-trash3 text-lg md:text-xl"></i>
                </button>
            </footer>
        </div>
    `;

    openDetailScreen();
}

// ============================================================================
// 🖨️ EXPORTAÇÃO, WHATSAPP, RECIBO E EXCLUSÃO EM LOTE
// ============================================================================

function handleWhatsAppReceipt(reportId) {
    const report = localState.reports.find(r => r.id === reportId);
    if (!report) return;

    const rData = report.summary || {};
    const unitName = report.establishmentName || 'Unidade Principal';
    
    let message = `*RECIBO DE COMISSÕES* 💰\n\n`;
    message += `*Profissional:* ${report.professionalName}\n`;
    message += `*Unidade:* ${unitName}\n`;
    message += `*Período:* ${report.period}\n\n`;
    
    message += `*Resumo da Apuração:*\n`;
    message += `Bruto Apurado: R$ ${(rData.totalCommission || 0).toFixed(2)}\n`;
    
    if (rData.extraCredit > 0) message += `(+) Bônus Extras: R$ ${rData.extraCredit.toFixed(2)}\n`;
    if (rData.extraDebit > 0) message += `(-) Descontos/Vales: R$ ${rData.extraDebit.toFixed(2)}\n`;
    if (rData.notes) message += `\n*Obs:* ${rData.notes}\n`;
    
    const finalVal = rData.finalValue || rData.totalCommission || 0;
    message += `\n*TOTAL LÍQUIDO PAGO: R$ ${finalVal.toFixed(2)}*\n\n`;
    message += `_Este é um recibo gerado automaticamente pelo sistema._`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    
    // Abre em nova guia/janela (No celular tentará abrir o App nativo)
    window.open(whatsappUrl, '_blank');
}

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
            "Unidade": report.establishmentName || "Unidade Principal",
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
    doc.text(`Data de Emissão: ${new Date().toLocaleDateString('pt-BR')} - Unidade: ${report.establishmentName || 'Principal'}`, 105, 28, { align: 'center' });

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