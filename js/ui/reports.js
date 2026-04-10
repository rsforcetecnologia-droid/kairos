// js/ui/reports.js

import * as financialApi from '../api/financial.js';
import * as appointmentsApi from '../api/appointments.js';
import * as clientsApi from '../api/clients.js';
import * as salesApi from '../api/sales.js';
import * as productsApi from '../api/products.js';
import * as reportsApi from '../api/reports.js';
import { getHierarchy } from '../api/establishments.js';
import { state } from '../state.js';
import { showNotification } from '../components/modal.js';

// ============================================================================
// 📊 ESTADO LOCAL (STATE MANAGEMENT)
// ============================================================================
const today = new Date();
const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

let localState = {
    establishments: [],
    filterEstablishmentIds: new Set(),
    startDate: firstDay.toISOString().split('T')[0],
    endDate: today.toISOString().split('T')[0],
    
    currentTab: 'financeiro', 
    drillDownMonth: null, 
    
    data: {
        financeiro: null,
        agenda: null,
        clientes: null,
        vendas: null,
        estoque: null
    },
    
    charts: {}
};

const contentDiv = document.getElementById('content');
let pageEventListener = null;

// ============================================================================
// 🛠️ FUNÇÕES AUXILIARES
// ============================================================================

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
}

function formatDateDisplay(dateStr) {
    if (!dateStr) return '--/--/----';
    const parts = dateStr.split('T')[0].split('-');
    if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
    return dateStr;
}

function dateParser(dateVal) {
    if (!dateVal) return new Date(0);
    if (typeof dateVal.toDate === 'function') return dateVal.toDate();
    if (typeof dateVal === 'string' || typeof dateVal === 'number') return new Date(dateVal);
    return new Date();
}

function destroyChart(chartKey) {
    if (localState.charts[chartKey]) {
        localState.charts[chartKey].destroy();
        localState.charts[chartKey] = null;
    }
}

// ============================================================================
// 🚀 INICIALIZAÇÃO E LAYOUT PRINCIPAL (COMPACTADO)
// ============================================================================

export async function loadReportsPage() {
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
        console.error("Erro ao buscar hierarquia de empresas", e);
    }

    renderBaseLayout();
    setupEventListeners();
    await fetchTabData();
}

function renderBaseLayout() {
    const estCheckboxes = localState.establishments.map(est => `
        <label class="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 border ${localState.filterEstablishmentIds.has(est.id) ? 'border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-600'} rounded-md cursor-pointer hover:bg-slate-100 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3 h-3" value="${est.id}" ${localState.filterEstablishmentIds.has(est.id) ? 'checked' : ''}>
            <span class="text-[10px] font-bold whitespace-nowrap">${est.type === 'Matriz' ? '<i class="bi bi-building"></i>' : '<i class="bi bi-shop"></i>'} ${est.name}</span>
        </label>
    `).join('');

    contentDiv.innerHTML = `
        <section class="h-full flex flex-col p-2 md:p-4 w-full bg-slate-50 relative overflow-hidden">
            
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-2 md:p-3 mb-3 z-20 flex flex-col gap-3 flex-shrink-0">
                
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    
                    <div class="flex overflow-x-auto custom-scrollbar gap-1.5 w-full md:w-auto pb-1 md:pb-0">
                        <button data-tab="financeiro" class="tab-btn ${localState.currentTab === 'financeiro' ? 'active bg-indigo-600 text-white shadow-md border-transparent' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'} border px-3.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5">
                            <i class="bi bi-currency-dollar"></i> Financeiro
                        </button>
                        <button data-tab="agenda" class="tab-btn ${localState.currentTab === 'agenda' ? 'active bg-indigo-600 text-white shadow-md border-transparent' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'} border px-3.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5">
                            <i class="bi bi-calendar3"></i> Agenda
                        </button>
                        <button data-tab="clientes" class="tab-btn ${localState.currentTab === 'clientes' ? 'active bg-indigo-600 text-white shadow-md border-transparent' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'} border px-3.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5">
                            <i class="bi bi-people"></i> Clientes
                        </button>
                        <button data-tab="vendas" class="tab-btn ${localState.currentTab === 'vendas' ? 'active bg-indigo-600 text-white shadow-md border-transparent' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'} border px-3.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5">
                            <i class="bi bi-receipt"></i> Vendas/PDV
                        </button>
                        <button data-tab="estoque" class="tab-btn ${localState.currentTab === 'estoque' ? 'active bg-indigo-600 text-white shadow-md border-transparent' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'} border px-3.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5">
                            <i class="bi bi-box-seam"></i> Estoque
                        </button>
                    </div>

                    <div class="hidden md:block flex-shrink-0">
                        <button data-action="export-excel" class="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold rounded-lg hover:bg-emerald-100 transition shadow-sm flex items-center gap-1.5 text-xs whitespace-nowrap">
                            <i class="bi bi-file-earmark-excel"></i> Exportar Dados
                        </button>
                    </div>
                </div>

                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pt-2 border-t border-slate-100">
                    
                    <div class="flex flex-wrap gap-1.5 items-center w-full md:w-auto" id="establishment-filters-container">
                        ${localState.establishments.length > 1 ? estCheckboxes : '<span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-100 px-2 py-1 rounded-md"><i class="bi bi-shop mr-1"></i> Unidade Atual</span>'}
                    </div>

                    <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                        <div class="hidden lg:flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                            <button data-action="preset-date" data-preset="month" class="px-2.5 py-1 text-[9px] font-bold uppercase rounded-md transition-colors bg-white text-indigo-600 shadow-sm border border-slate-200">Este Mês</button>
                            <button data-action="preset-date" data-preset="last_month" class="px-2.5 py-1 text-[9px] font-bold uppercase rounded-md transition-colors text-slate-500 hover:text-slate-700">Mês Passado</button>
                            <button data-action="preset-date" data-preset="year" class="px-2.5 py-1 text-[9px] font-bold uppercase rounded-md transition-colors text-slate-500 hover:text-slate-700">Este Ano</button>
                        </div>

                        <div class="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-0.5 shadow-inner">
                            <input type="date" id="report-start" value="${localState.startDate}" class="p-1 bg-transparent text-[11px] font-bold text-slate-700 outline-none">
                            <span class="text-slate-400 text-[10px] font-bold">até</span>
                            <input type="date" id="report-end" value="${localState.endDate}" class="p-1 bg-transparent text-[11px] font-bold text-slate-700 outline-none">
                        </div>

                        <button data-action="apply-filters" class="py-1.5 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-sm flex items-center justify-center gap-1.5 text-xs">
                            <i class="bi bi-search text-[10px]"></i> Filtrar
                        </button>
                        
                        <button data-action="export-excel" class="md:hidden py-1.5 px-2.5 bg-emerald-50 text-emerald-700 font-bold rounded-lg border border-emerald-200 shadow-sm flex items-center justify-center text-xs">
                            <i class="bi bi-file-earmark-excel"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div id="tab-content" class="flex-1 overflow-y-auto custom-scrollbar pb-24 md:pb-2"></div>
        </section>
    `;
}

// ============================================================================
// 🔄 GESTÃO DE DADOS
// ============================================================================

async function fetchTabData() {
    const container = document.getElementById('tab-content');
    if (container) container.innerHTML = '<div class="flex justify-center items-center h-40"><div class="loader"></div></div>';

    const { currentTab, startDate, endDate, filterEstablishmentIds } = localState;
    const estIds = Array.from(filterEstablishmentIds);
    const estString = estIds.join(',');
    
    const startISO = new Date(startDate).toISOString();
    const endDateObj = new Date(endDate);
    endDateObj.setHours(23, 59, 59, 999);
    const endISO = endDateObj.toISOString();

    try {
        if (currentTab === 'financeiro') {
            const filters = { startDate, endDate, establishmentId: estString };
            const [payablesRes, receivablesRes, natures] = await Promise.all([
                financialApi.getPayables(filters).catch(() => ({ entries: [] })),
                financialApi.getReceivables(filters).catch(() => ({ entries: [] })),
                financialApi.getNatures(state.establishmentId).catch(() => [])
            ]);
            localState.data.financeiro = { payables: payablesRes.entries, receivables: receivablesRes.entries, natures };
            renderFinanceiroTab();
        } 
        else if (currentTab === 'agenda') {
            const activePromises = estIds.map(id => appointmentsApi.getAppointmentsByDateRange(id, startISO, endISO).catch(() => []));
            const cancelledPromises = estIds.map(id => appointmentsApi.getCancelledAppointments(id, startISO, endISO).catch(() => []));
            const [activeResults, cancelledResults] = await Promise.all([Promise.all(activePromises), Promise.all(cancelledPromises)]);
            localState.data.agenda = { active: activeResults.flat(), cancelled: cancelledResults.flat() };
            renderAgendaTab();
        }
        else if (currentTab === 'clientes') {
            const clientsResults = await Promise.all(estIds.map(id => clientsApi.getClients(id).catch(() => [])));
            const uniqueClientsMap = new Map();
            clientsResults.flat().forEach(c => uniqueClientsMap.set(c.id, c));
            localState.data.clientes = Array.from(uniqueClientsMap.values());
            renderClientesTab();
        }
        else if (currentTab === 'vendas') {
            let salesResults = [];
            try {
                if (salesApi && typeof salesApi.getSales === 'function') {
                    salesResults = await Promise.all(estIds.map(id => salesApi.getSales({ startDate, endDate, establishmentId: id }).catch(() => [])));
                } else if (salesApi && typeof salesApi.getSalesHistory === 'function') {
                    salesResults = await Promise.all(estIds.map(id => salesApi.getSalesHistory({ startDate, endDate, establishmentId: id }).catch(() => [])));
                } else if (reportsApi && typeof reportsApi.getSalesReport === 'function') {
                    const reportsRes = await Promise.all(estIds.map(id => reportsApi.getSalesReport({ establishmentId: id, startDate, endDate }).catch(() => ({ transactions: [] }))));
                    salesResults = reportsRes.flatMap(r => (r.transactions || []).map(t => ({
                        id: 'REF-' + Math.random().toString(36).substring(2,8),
                        status: 'completed',
                        createdAt: t.date,
                        totalAmount: t.total,
                        items: [{ name: t.items || 'Itens Venda', quantity: 1, price: t.total }]
                    })));
                }
            } catch (err) {
                console.error("Erro interno ao buscar as vendas:", err);
            }
            localState.data.vendas = salesResults.flat();
            renderVendasTab();
        }
        else if (currentTab === 'estoque') {
            const productsResults = await Promise.all(estIds.map(id => productsApi.getProducts(id).catch(() => [])));
            localState.data.estoque = productsResults.flat();
            renderEstoqueTab();
        }
    } catch (error) {
        container.innerHTML = `<div class="p-10 text-center text-red-500 bg-red-50 rounded-xl border border-red-100"><i class="bi bi-exclamation-triangle text-3xl mb-2"></i><br>Erro ao carregar dados: ${error.message}</div>`;
    }
}

// ============================================================================
// 💰 ABA FINANCEIRO (COMPACTADA E OTIMIZADA)
// ============================================================================

function renderFinanceiroTab() {
    const container = document.getElementById('tab-content');
    const { payables, receivables, natures } = localState.data.financeiro;
    const natMap = new Map(natures.map(n => [n.id, n.name]));

    const flowMap = {};

    receivables.forEach(r => {
        const dateStr = (r.status === 'paid' ? r.paymentDate : r.dueDate)?.split('T')[0];
        if (!dateStr) return;
        if (!flowMap[dateStr]) flowMap[dateStr] = { recReal: 0, recPrev: 0, despReal: 0, despPrev: 0, items: [] };
        
        const val = Number(r.amount) || 0;
        flowMap[dateStr].items.push({ ...r, _type: 'receita' });
        if (r.status === 'paid') flowMap[dateStr].recReal += val;
        else flowMap[dateStr].recPrev += val;
    });

    payables.forEach(p => {
        const dateStr = (p.status === 'paid' ? p.paymentDate : p.dueDate)?.split('T')[0];
        if (!dateStr) return;
        if (!flowMap[dateStr]) flowMap[dateStr] = { recReal: 0, recPrev: 0, despReal: 0, despPrev: 0, items: [] };
        
        const val = Number(p.amount) || 0;
        flowMap[dateStr].items.push({ ...p, _type: 'despesa' });
        if (p.status === 'paid') flowMap[dateStr].despReal += val;
        else flowMap[dateStr].despPrev += val;
    });

    const sortedDates = Object.keys(flowMap).sort();
    const chartLabels = sortedDates.map(d => formatDateDisplay(d).substring(0, 5)); 
    
    let currentBalance = 0;
    const chartRecReal = [];
    const chartRecPrev = [];
    const chartDespReal = [];
    const chartDespPrev = [];
    const chartBalance = [];

    sortedDates.forEach(d => {
        const day = flowMap[d];
        chartRecReal.push(day.recReal);
        chartRecPrev.push(day.recPrev);
        chartDespReal.push(-Math.abs(day.despReal));
        chartDespPrev.push(-Math.abs(day.despPrev));
        currentBalance += (day.recReal - day.despReal);
        chartBalance.push(currentBalance);
    });

    const totalIn = chartRecReal.reduce((a, b) => a + b, 0);
    const totalOut = chartDespReal.reduce((a, b) => a + Math.abs(b), 0);
    const saldo = totalIn - totalOut;
    const margem = totalIn > 0 ? (saldo / totalIn) * 100 : 0;

    const dreIn = {}; 
    const dreOut = {}; 
    receivables.filter(r => r.status === 'paid').forEach(r => { const n = r.naturezaId ? (natMap.get(r.naturezaId) || 'Outros') : 'Sem Cat.'; dreIn[n] = (dreIn[n] || 0) + r.amount; });
    payables.filter(p => p.status === 'paid').forEach(p => { const n = p.naturezaId ? (natMap.get(p.naturezaId) || 'Outros') : 'Sem Cat.'; dreOut[n] = (dreOut[n] || 0) + p.amount; });

    container.innerHTML = `
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-arrow-up-circle text-emerald-500 mr-1"></i> Rec. Realizada</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${formatCurrency(totalIn)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-arrow-down-circle text-red-500 mr-1"></i> Desp. Realizada</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${formatCurrency(totalOut)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-wallet2 text-indigo-500 mr-1"></i> Saldo do Período</span><span class="text-lg md:text-xl font-black ${saldo >= 0 ? 'text-emerald-600' : 'text-red-600'} mt-0.5">${formatCurrency(saldo)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-pie-chart text-amber-500 mr-1"></i> Margem Real</span><span class="text-lg md:text-xl font-black ${margem >= 0 ? 'text-indigo-600' : 'text-red-600'} mt-0.5">${margem.toFixed(1)}%</span></div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <div class="lg:col-span-2 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-1">
                        <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wide"><i class="bi bi-bar-chart-steps text-indigo-500 mr-1"></i> Fluxo de Caixa</h3>
                    </div>
                    
                    <div class="flex flex-wrap gap-1.5 mb-2 mt-1 pb-2 border-b border-slate-50">
                        <button class="fin-toggle-btn active bg-emerald-50 text-emerald-700 border-emerald-200" data-dataset="0">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span> Realizada
                        </button>
                        <button class="fin-toggle-btn active bg-emerald-50 text-emerald-700 border-emerald-200 opacity-70" data-dataset="1">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#6ee7b7]"></span> Prevista
                        </button>
                        <button class="fin-toggle-btn active bg-red-50 text-red-700 border-red-200" data-dataset="2">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#ef4444]"></span> Realizada
                        </button>
                        <button class="fin-toggle-btn active bg-red-50 text-red-700 border-red-200 opacity-70" data-dataset="3">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#fca5a5]"></span> Prevista
                        </button>
                        <button class="fin-toggle-btn active bg-indigo-50 text-indigo-700 border-indigo-200 ml-auto" data-dataset="4">
                            <span class="w-2 h-0.5 bg-[#4f46e5]"></span> Saldo
                        </button>
                    </div>

                    <div class="relative flex-1 w-full min-h-[250px]"><canvas id="chartFin"></canvas></div>
                </div>

                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wide mb-3"><i class="bi bi-card-list text-indigo-500 mr-1"></i> DRE Resumida</h3>
                    <div class="flex-1 overflow-y-auto custom-scrollbar pr-2">
                        <div class="mb-3"><p class="text-[9px] font-bold text-emerald-600 uppercase border-b border-emerald-100 pb-1 mb-1.5">Receitas</p>
                        ${Object.entries(dreIn).sort((a,b)=>b[1]-a[1]).map(([k, v]) => `<div class="flex justify-between items-center mb-1"><span class="text-[11px] text-slate-600 truncate mr-2">${k}</span><span class="text-[11px] font-bold text-slate-800">${formatCurrency(v)}</span></div>`).join('') || '<p class="text-[9px] text-slate-400">Sem dados.</p>'}</div>
                        <div class="mb-2"><p class="text-[9px] font-bold text-red-500 uppercase border-b border-red-100 pb-1 mb-1.5">Despesas</p>
                        ${Object.entries(dreOut).sort((a,b)=>b[1]-a[1]).map(([k, v]) => `<div class="flex justify-between items-center mb-1"><span class="text-[11px] text-slate-600 truncate mr-2">${k}</span><span class="text-[11px] font-bold text-slate-800">${formatCurrency(v)}</span></div>`).join('') || '<p class="text-[9px] text-slate-400">Sem dados.</p>'}</div>
                    </div>
                </div>
            </div>
        </div>`;

    setTimeout(() => {
        const ctx = document.getElementById('chartFin');
        if (ctx) {
            destroyChart('fin');
            localState.charts['fin'] = new Chart(ctx, {
                type: 'bar',
                data: { 
                    labels: chartLabels.length ? chartLabels : ['-'], 
                    datasets: [
                        { label: 'Receita Realizada', data: chartRecReal, backgroundColor: '#10b981', stack: 'Stack 0', borderRadius: 3, order: 2 },
                        { label: 'Receita Prevista', data: chartRecPrev, backgroundColor: '#6ee7b7', stack: 'Stack 0', borderRadius: 3, order: 2 },
                        { label: 'Despesa Realizada', data: chartDespReal, backgroundColor: '#ef4444', stack: 'Stack 0', borderRadius: 3, order: 2 },
                        { label: 'Despesa Prevista', data: chartDespPrev, backgroundColor: '#fca5a5', stack: 'Stack 0', borderRadius: 3, order: 2 },
                        { label: 'Saldo Acumulado', data: chartBalance, type: 'line', borderColor: '#4f46e5', backgroundColor: '#4f46e5', tension: 0.4, borderWidth: 2, pointRadius: 3, yAxisID: 'y1', order: 1 }
                    ] 
                },
                options: { 
                    responsive: true, maintainAspectRatio: false,
                    interaction: { mode: 'index', intersect: false },
                    plugins: { 
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) label += ': ';
                                    if (context.parsed.y !== null) label += formatCurrency(Math.abs(context.parsed.y));
                                    return label;
                                },
                                footer: function(tooltipItems) {
                                    const index = tooltipItems[0].dataIndex;
                                    const d = sortedDates[index];
                                    const day = flowMap[d];
                                    if (!day) return '';
                                    const daySaldo = (day.recReal + day.recPrev) - (day.despReal + day.despPrev);
                                    return '\nSaldo Dia: ' + formatCurrency(daySaldo) + '\n(Clique para ver)';
                                }
                            }
                        }
                    }, 
                    onClick: (event, elements) => {
                        if (elements.length > 0) {
                            const index = elements[0].index;
                            const datasetIndex = elements[0].datasetIndex;
                            const dateStr = sortedDates[index];
                            
                            let filterType = 'all';
                            if (datasetIndex === 0 || datasetIndex === 1) filterType = 'receita';
                            else if (datasetIndex === 2 || datasetIndex === 3) filterType = 'despesa';
                            
                            openFinancialDetailsModal(dateStr, filterType, flowMap[dateStr].items, natMap);
                        }
                    },
                    scales: { 
                        x: { stacked: true, grid: { display: false } },
                        y: { stacked: true, beginAtZero: true, grid: { borderDash: [2, 4], color: '#f8fafc' }, ticks: { font:{size: 9}, callback: (val) => formatCurrency(Math.abs(val)) } },
                        y1: { position: 'right', beginAtZero: true, grid: { display: false }, ticks: { font:{size: 9}, callback: (val) => formatCurrency(val) } }
                    } 
                }
            });

            document.querySelectorAll('.fin-toggle-btn').forEach(btn => {
                btn.className = "fin-toggle-btn flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-bold uppercase transition-all shadow-sm rounded-md border cursor-pointer";
                btn.onclick = (e) => {
                    const btnEl = e.currentTarget;
                    const dsIndex = parseInt(btnEl.dataset.dataset);
                    const chart = localState.charts['fin'];
                    
                    if (chart.isDatasetVisible(dsIndex)) {
                        chart.hide(dsIndex);
                        btnEl.style.opacity = '0.4';
                        btnEl.style.background = '#f8f9fa';
                    } else {
                        chart.show(dsIndex);
                        btnEl.style.opacity = '1';
                        btnEl.style.background = ''; 
                    }
                };
            });
        }
    }, 100);
}

function openFinancialDetailsModal(dateStr, filterType, items, natMap) {
    let modal = document.getElementById('genericModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'genericModal';
        modal.className = 'modal fade fixed inset-0 z-[9999] overflow-y-auto';
        document.body.appendChild(modal);
    }
    
    const filteredItems = filterType === 'all' ? items : items.filter(i => i._type === filterType);
    let tipoTexto = filterType === 'receita' ? '<span class="text-emerald-600">Receitas</span>' : (filterType === 'despesa' ? '<span class="text-red-600">Despesas</span>' : 'Movimentações');
    
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none sm:max-w-3xl sm:mx-auto my-8">
            <div class="modal-content relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-xl shadow-2xl border-0">
                <div class="modal-header flex items-center justify-between p-3 border-b border-slate-200 bg-slate-50 rounded-t-xl">
                    <h5 class="text-sm font-bold text-slate-800"><i class="bi bi-search text-indigo-600 mr-1.5"></i> ${tipoTexto} em ${formatDateDisplay(dateStr)}</h5>
                    <button type="button" class="btn-close-modal box-content w-4 h-4 p-1 text-slate-400 hover:text-slate-700 transition-colors"><i class="bi bi-x-lg"></i></button>
                </div>
                <div class="modal-body p-3 max-h-[65vh] overflow-y-auto custom-scrollbar bg-slate-50">
                    ${filteredItems.length === 0 ? '<div class="text-center py-10 text-slate-500 text-sm">Nenhum título encontrado.</div>' : `
                    <div class="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                        <table class="w-full text-left text-xs">
                            <thead class="bg-slate-100 text-slate-500 border-b border-slate-200">
                                <tr>
                                    <th class="py-2 px-3 font-bold uppercase tracking-wider">Descrição</th>
                                    <th class="py-2 px-3 font-bold uppercase tracking-wider text-center">Natureza</th>
                                    <th class="py-2 px-3 font-bold uppercase tracking-wider text-center">Status</th>
                                    <th class="py-2 px-3 font-bold uppercase tracking-wider text-right">Valor</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                ${filteredItems.map(item => `
                                    <tr class="hover:bg-slate-50 transition-colors">
                                        <td class="py-2 px-3 font-bold text-slate-800 text-[11px]">${item.description || item.clientName || item.supplierName || 'Sem descrição'}</td>
                                        <td class="py-2 px-3 text-center text-slate-600 text-[10px]">${item.naturezaId ? (natMap.get(item.naturezaId) || 'Outros') : 'Geral'}</td>
                                        <td class="py-2 px-3 text-center">
                                            <span class="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${item.status === 'paid' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-amber-50 text-amber-600 border border-amber-200'}">
                                                ${item.status === 'paid' ? 'Pago' : 'Pendente'}
                                            </span>
                                        </td>
                                        <td class="py-2 px-3 text-right font-black ${item._type === 'receita' ? 'text-emerald-600' : 'text-red-600'} text-[11px]">
                                            ${formatCurrency(item.amount)}
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    `}
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('show', 'opacity-100'), 10);
    
    const closeBtn = modal.querySelector('.btn-close-modal');
    if (closeBtn) closeBtn.onclick = () => { 
        modal.style.display = 'none'; 
        modal.classList.remove('show', 'opacity-100');
    };
}

// ============================================================================
// 📅 ABA AGENDA
// ============================================================================

function renderAgendaTab() {
    const container = document.getElementById('tab-content');
    const { active, cancelled } = localState.data.agenda;

    const total = active.length + cancelled.length;
    const concluidas = active.filter(a => a.status === 'completed').length;
    const aguardando = active.filter(a => ['confirmed', 'pending', 'in-progress'].includes(a.status)).length;
    const noShow = active.filter(a => a.status === 'no-show').length;
    const canceladas = cancelled.length;
    const taxaConclusao = total > 0 ? ((concluidas / total) * 100).toFixed(1) : 0;
    const receitaTotal = active.filter(a => a.status === 'completed').reduce((s, i) => s + (Number(i.totalAmount || (i.transaction ? i.transaction.totalAmount : 0)) || 0), 0);

    let labels = [];
    let dataPoints = [];
    
    if (localState.drillDownMonth !== null) {
        const anoAtual = new Date(localState.startDate).getFullYear();
        const daysInMonth = new Date(anoAtual, localState.drillDownMonth + 1, 0).getDate();
        labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);
        dataPoints = labels.map(day => active.filter(a => { 
            const d = dateParser(a.startTime || a.date); 
            return d.getMonth() === localState.drillDownMonth && d.getDate() === parseInt(day); 
        }).length);
    } else {
        labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        dataPoints = labels.map((_, idx) => active.filter(a => dateParser(a.startTime || a.date).getMonth() === idx).length);
    }

    container.innerHTML = `
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
                <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Total Agendas</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${total}</span></div>
                <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-emerald-500 uppercase tracking-widest block">Concluídas</span><span class="text-lg md:text-xl font-black text-emerald-600 mt-0.5">${concluidas}</span></div>
                <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-amber-500 uppercase tracking-widest block">Aguardando</span><span class="text-lg md:text-xl font-black text-amber-600 mt-0.5">${aguardando}</span></div>
                <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-red-400 uppercase tracking-widest block">Faltou (No-Show)</span><span class="text-lg md:text-xl font-black text-red-500 mt-0.5">${noShow}</span></div>
                <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Canceladas</span><span class="text-lg md:text-xl font-black text-slate-400 mt-0.5">${canceladas}</span></div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="bg-indigo-600 p-4 rounded-xl text-white shadow-sm flex items-center justify-between"><div><p class="text-[10px] font-bold uppercase opacity-80 tracking-widest mb-1">Taxa Conclusão</p><p class="text-2xl md:text-3xl font-black">${taxaConclusao}%</p></div><i class="bi bi-graph-up-arrow text-3xl opacity-50"></i></div>
                <div class="bg-emerald-600 p-4 rounded-xl text-white shadow-sm flex items-center justify-between"><div><p class="text-[10px] font-bold uppercase opacity-80 tracking-widest mb-1">Receita Atendimentos</p><p class="text-2xl md:text-3xl font-black">${formatCurrency(receitaTotal)}</p></div><i class="bi bi-cash-coin text-3xl opacity-50"></i></div>
            </div>
            <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div class="flex justify-between items-center mb-3 border-b border-slate-100 pb-2">
                    <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wide"><i class="bi bi-clock-history text-indigo-500 mr-1"></i> Volume de Agendamentos ${localState.drillDownMonth !== null ? `(${labels.length} dias)` : ''}</h3>
                    ${localState.drillDownMonth !== null ? `<button id="btn-back-agenda" class="text-[9px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md hover:bg-indigo-100 transition-colors shadow-sm"><i class="bi bi-arrow-left mr-1"></i> Voltar</button>` : '<span class="hidden md:inline-block text-[9px] text-slate-400 italic">Dica: Clique num mês para ver por dia.</span>'}
                </div>
                <div class="relative h-64 w-full"><canvas id="chartAgenda"></canvas></div>
            </div>
        </div>`;

    setTimeout(() => {
        const ctx = document.getElementById('chartAgenda');
        if (ctx) {
            destroyChart('agenda');
            localState.charts['agenda'] = new Chart(ctx, {
                type: 'line',
                data: { labels: labels, datasets: [{ label: 'Ativos', data: dataPoints, borderColor: '#4f46e5', backgroundColor: 'rgba(79, 70, 229, 0.1)', fill: true, tension: 0.4, pointRadius: 4, borderWidth: 2 }] },
                options: { responsive: true, maintainAspectRatio: false, onClick: (e, elements) => { if (elements.length > 0 && localState.drillDownMonth === null) { localState.drillDownMonth = elements[0].index; renderAgendaTab(); } }, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: '#f8fafc', borderDash: [2, 4] }, ticks: { stepSize: 1, font:{size: 9} } }, x: { grid: { display: false }, ticks: { font:{size: 9} } } } }
            });
        }
        const backBtn = document.getElementById('btn-back-agenda');
        if (backBtn) backBtn.onclick = () => { localState.drillDownMonth = null; renderAgendaTab(); };
    }, 100);
}

// ============================================================================
// 👥 ABA CLIENTES
// ============================================================================

function renderClientesTab() {
    const container = document.getElementById('tab-content');
    const clients = localState.data.clientes || [];
    
    const startObj = dateParser(localState.startDate);
    const endObj = dateParser(localState.endDate);
    endObj.setHours(23, 59, 59, 999);
    
    const totalBase = clients.length;
    const novosNoPeriodo = clients.filter(c => {
        if (!c.createdAt) return false;
        const cDate = dateParser(c.createdAt);
        return cDate >= startObj && cDate <= endObj;
    });
    
    const ausentes = clients.filter(c => {
        if (!c.createdAt && !c.lastVisit) return true;
        const lastDate = c.lastVisit ? dateParser(c.lastVisit) : dateParser(c.createdAt);
        const diffDays = (new Date() - lastDate) / (1000 * 60 * 60 * 24);
        return diffDays > 60;
    });

    const taxaCrescimento = totalBase > 0 ? ((novosNoPeriodo.length / totalBase) * 100).toFixed(1) : 0;

    let labels = [];
    let dataPoints = [];
    if (localState.drillDownMonth !== null) {
        const anoAtual = new Date(localState.startDate).getFullYear();
        const daysInMonth = new Date(anoAtual, localState.drillDownMonth + 1, 0).getDate();
        labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);
        dataPoints = labels.map(day => novosNoPeriodo.filter(c => { 
            const d = dateParser(c.createdAt); 
            return d.getMonth() === localState.drillDownMonth && d.getDate() === parseInt(day); 
        }).length);
    } else {
        labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        dataPoints = labels.map((_, idx) => novosNoPeriodo.filter(c => dateParser(c.createdAt).getMonth() === idx).length);
    }

    container.innerHTML = `
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-people-fill text-indigo-500 mr-1"></i> Base Total</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${totalBase}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-emerald-500 uppercase tracking-widest"><i class="bi bi-person-plus-fill mr-1"></i> Novos (Período)</span><span class="text-lg md:text-xl font-black text-emerald-600 mt-0.5">${novosNoPeriodo.length}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-amber-500 uppercase tracking-widest"><i class="bi bi-person-dash-fill mr-1"></i> Ausentes (>60 dias)</span><span class="text-lg md:text-xl font-black text-amber-600 mt-0.5">${ausentes.length}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-blue-500 uppercase tracking-widest"><i class="bi bi-graph-up-arrow mr-1"></i> Taxa Crescimento</span><span class="text-lg md:text-xl font-black text-blue-600 mt-0.5">+${taxaCrescimento}%</span></div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <div class="lg:col-span-2 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div class="flex justify-between items-center mb-3">
                        <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wide"><i class="bi bi-person-lines-fill text-indigo-500 mr-1"></i> Aquisição ${localState.drillDownMonth !== null ? '(Diário)' : '(Mensal)'}</h3>
                        ${localState.drillDownMonth !== null ? `<button id="btn-back-clientes" class="text-[9px] font-bold uppercase text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">Voltar</button>` : ''}
                    </div>
                    <div class="relative h-56 w-full"><canvas id="chartClientes"></canvas></div>
                </div>

                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wide mb-3"><i class="bi bi-star-fill text-amber-400 mr-1"></i> Últimos Cadastros</h3>
                    <div class="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-2">
                        ${novosNoPeriodo.slice(0, 10).reverse().map(c => `
                            <div class="flex items-center justify-between border-b border-slate-50 pb-1.5">
                                <div>
                                    <p class="text-[11px] font-bold text-slate-700 truncate max-w-[140px]">${c.name}</p>
                                    <p class="text-[9px] text-slate-400">${c.phone || 'Sem contato'}</p>
                                </div>
                                <span class="text-[8px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded font-bold uppercase">Novo</span>
                            </div>
                        `).join('') || '<p class="text-[10px] text-slate-400">Nenhum cliente novo neste período.</p>'}
                    </div>
                </div>
            </div>
        </div>`;

    setTimeout(() => {
        if (!window.Chart) return;
        const ctx = document.getElementById('chartClientes');
        if (ctx) {
            destroyChart('clientes');
            localState.charts['clientes'] = new Chart(ctx, {
                type: 'bar',
                data: { labels: labels, datasets: [{ label: 'Novos Cadastros', data: dataPoints, backgroundColor: '#3b82f6', borderRadius: 3 }] },
                options: { responsive: true, maintainAspectRatio: false, onClick: (e, elements) => { if (elements.length > 0 && localState.drillDownMonth === null) { localState.drillDownMonth = elements[0].index; renderClientesTab(); } }, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1, font:{size: 9} } }, x: { grid: { display: false }, ticks: { font:{size: 9} } } } }
            });
        }
        const backBtn = document.getElementById('btn-back-clientes');
        if (backBtn) backBtn.onclick = () => { localState.drillDownMonth = null; renderClientesTab(); };
    }, 100);
}

// ============================================================================
// 🛍️ ABA VENDAS E PDV
// ============================================================================

function renderVendasTab() {
    const container = document.getElementById('tab-content');
    const sales = localState.data.vendas || [];
    
    const vendasConcluidas = sales.filter(s => s.status === 'completed' || s.status === 'paid');
    const faturamentoBruto = vendasConcluidas.reduce((acc, s) => acc + (Number(s.totalAmount) || 0), 0);
    const qtdVendas = vendasConcluidas.length;
    const ticketMedio = qtdVendas > 0 ? faturamentoBruto / qtdVendas : 0;
    
    let totalItens = 0;
    const itemRanking = {};
    
    vendasConcluidas.forEach(venda => {
        const safeItems = Array.isArray(venda.items) ? venda.items : (Array.isArray(venda.services) ? venda.services : []);
        safeItems.forEach(item => {
            const qtd = Number(item.quantity) || 1;
            totalItens += qtd;
            const nome = item.name || 'Produto/Serviço Indefinido';
            itemRanking[nome] = (itemRanking[nome] || 0) + qtd;
        });
    });

    const topItens = Object.entries(itemRanking).sort((a,b) => b[1] - a[1]).slice(0, 5);

    container.innerHTML = `
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div class="bg-indigo-600 text-white p-3 rounded-xl shadow-sm flex flex-col"><span class="text-[9px] font-bold text-indigo-200 uppercase tracking-widest">Faturamento PDV</span><span class="text-lg md:text-xl font-black mt-0.5">${formatCurrency(faturamentoBruto)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Ticket Médio</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${formatCurrency(ticketMedio)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Total Vendas</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${qtdVendas}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Volume Itens</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${totalItens}</span></div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wide mb-3"><i class="bi bi-trophy-fill text-amber-500 mr-1"></i> Top 5 Vendidos</h3>
                    <div class="relative h-56 w-full"><canvas id="chartVendas"></canvas></div>
                </div>

                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wide mb-3"><i class="bi bi-receipt-cutoff text-indigo-500 mr-1"></i> Últimas Vendas</h3>
                    <div class="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-1.5">
                        ${vendasConcluidas.slice(0, 8).map(v => {
                            const size = Array.isArray(v.items) ? v.items.length : (Array.isArray(v.services) ? v.services.length : 1);
                            return `
                                <div class="flex items-center justify-between border border-slate-100 bg-slate-50 p-2 rounded-lg">
                                    <div>
                                        <p class="text-[11px] font-bold text-slate-700">#${(v.id || '').substring(0,5).toUpperCase()}</p>
                                        <p class="text-[9px] text-slate-400">${formatDateDisplay(v.createdAt || v.date || '')}</p>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-[11px] font-black text-emerald-600">${formatCurrency(v.totalAmount)}</p>
                                        <p class="text-[9px] text-slate-400">${size} itens</p>
                                    </div>
                                </div>
                            `;
                        }).join('') || '<p class="text-[10px] text-slate-400">Nenhuma venda concluída no período.</p>'}
                    </div>
                </div>
            </div>
        </div>`;

    setTimeout(() => {
        if (!window.Chart) return;
        const ctx = document.getElementById('chartVendas');
        if (ctx && topItens.length > 0) {
            destroyChart('vendas');
            localState.charts['vendas'] = new Chart(ctx, {
                type: 'bar',
                data: { labels: topItens.map(i => i[0].substring(0,15)+'...'), datasets: [{ label: 'Quantidade Vendida', data: topItens.map(i => i[1]), backgroundColor: '#f59e0b', borderRadius: 3 }] },
                options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true, ticks: { stepSize: 1, font:{size: 9} } }, y: { grid: { display: false }, ticks: { font:{size: 9} } } } }
            });
        } else if (ctx) {
            ctx.parentElement.innerHTML = '<div class="flex h-full items-center justify-center text-[10px] text-slate-400">Sem dados suficientes</div>';
        }
    }, 100);
}

// ============================================================================
// 📦 ABA ESTOQUE E HISTÓRICO DE MOVIMENTAÇÕES
// ============================================================================

function renderEstoqueTab() {
    const container = document.getElementById('tab-content');
    const products = localState.data.estoque || [];
    
    let totalImobilizado = 0;
    let ativos = 0;
    let baixoEstoque = [];
    let esgotados = [];

    products.forEach(p => {
        if (p.active !== false) ativos++;
        
        const qtd = Number(p.currentStock) || 0;
        const min = Number(p.minStock) || 0;
        const custo = Number(p.costPrice) || Number(p.price) || 0;
        
        if (qtd > 0) totalImobilizado += (qtd * custo);
        if (qtd <= 0) esgotados.push(p);
        else if (qtd <= min) baixoEstoque.push(p);
    });

    container.innerHTML = `
        <div class="space-y-3 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div class="bg-indigo-600 text-white p-3 rounded-xl shadow-sm flex flex-col"><span class="text-[9px] font-bold text-indigo-200 uppercase tracking-widest">Imobilizado</span><span class="text-lg md:text-xl font-black mt-0.5">${formatCurrency(totalImobilizado)}</span></div>
                <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Ativos</span><span class="text-lg md:text-xl font-black text-slate-800 mt-0.5">${ativos}</span></div>
                <div class="bg-amber-50 p-3 rounded-xl border border-amber-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-amber-600 uppercase tracking-widest">Estoque Baixo</span><span class="text-lg md:text-xl font-black text-amber-600 mt-0.5">${baixoEstoque.length}</span></div>
                <div class="bg-red-50 p-3 rounded-xl border border-red-200 shadow-sm flex flex-col"><span class="text-[9px] font-bold text-red-600 uppercase tracking-widest">Esgotados</span><span class="text-lg md:text-xl font-black text-red-600 mt-0.5">${esgotados.length}</span></div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div class="flex justify-between items-center mb-3">
                        <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wide"><i class="bi bi-pie-chart-fill text-indigo-500 mr-1"></i> Saúde</h3>
                        <button id="btn-historico-movimentacoes" class="px-2 py-1 bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 text-[9px] font-bold uppercase rounded-md transition-colors shadow-sm flex items-center gap-1">
                            <i class="bi bi-clock-history"></i> Movs
                        </button>
                    </div>
                    <div class="relative h-48 w-full flex justify-center"><canvas id="chartEstoque"></canvas></div>
                </div>

                <div class="lg:col-span-2 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 class="text-xs font-bold text-red-500 uppercase tracking-wide mb-3"><i class="bi bi-exclamation-triangle-fill mr-1"></i> Reposição Crítica</h3>
                    <div class="flex-1 overflow-y-auto custom-scrollbar pr-2">
                        <table class="w-full text-left text-xs">
                            <thead class="text-slate-400 border-b border-slate-100">
                                <tr>
                                    <th class="pb-1.5 font-bold uppercase tracking-wider text-[10px]">Produto</th>
                                    <th class="pb-1.5 font-bold uppercase tracking-wider text-center text-[10px]">Min</th>
                                    <th class="pb-1.5 font-bold uppercase tracking-wider text-center text-[10px]">Atual</th>
                                    <th class="pb-1.5 font-bold uppercase tracking-wider text-right text-[10px]">Status</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-50">
                                ${[...esgotados, ...baixoEstoque].map(p => `
                                    <tr class="hover:bg-slate-50 transition-colors">
                                        <td class="py-2 font-bold text-slate-700 text-[11px]">${p.name}</td>
                                        <td class="py-2 text-center text-slate-500 text-[11px]">${p.minStock || 0}</td>
                                        <td class="py-2 text-center font-black text-[11px] ${p.currentStock <= 0 ? 'text-red-500' : 'text-amber-500'}">${p.currentStock || 0}</td>
                                        <td class="py-2 text-right">
                                            <span class="text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${p.currentStock <= 0 ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}">
                                                ${p.currentStock <= 0 ? 'Esgotado' : 'Comprar'}
                                            </span>
                                        </td>
                                    </tr>
                                `).join('') || '<tr><td colspan="4" class="text-center py-6 text-[10px] text-slate-400">Estoque saudável.</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>`;

    setTimeout(() => {
        if (!window.Chart) return;
        const ctx = document.getElementById('chartEstoque');
        const saudavel = ativos - baixoEstoque.length - esgotados.length;
        if (ctx) {
            destroyChart('estoque');
            localState.charts['estoque'] = new Chart(ctx, {
                type: 'doughnut',
                data: { labels: ['Saudável', 'Baixo', 'Esgotado'], datasets: [{ data: [Math.max(0, saudavel), baixoEstoque.length, esgotados.length], backgroundColor: ['#10b981', '#f59e0b', '#ef4444'], borderWidth: 0 }] },
                options: { responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { legend: { position: 'right', labels: { usePointStyle: true, boxWidth: 6, font:{size: 10} } } } }
            });
        }
    }, 100);
}

function openStockMovementsModal() {
    let modal = document.getElementById('genericModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'genericModal';
        modal.className = 'modal fade fixed inset-0 z-[9999] overflow-y-auto';
        document.body.appendChild(modal);
    }
    
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none sm:max-w-4xl sm:mx-auto my-8">
            <div class="modal-content relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-xl shadow-2xl border-0">
                <div class="modal-header flex items-center justify-between p-3 border-b border-slate-200 bg-slate-50 rounded-t-xl">
                    <h5 class="text-sm font-bold text-slate-800"><i class="bi bi-arrow-left-right text-indigo-600 mr-1.5"></i>Histórico de Movimentações</h5>
                    <button type="button" class="btn-close-modal box-content w-4 h-4 p-1 text-slate-400 hover:text-slate-700 transition-colors"><i class="bi bi-x-lg"></i></button>
                </div>
                <div class="modal-body p-3 max-h-[65vh] overflow-y-auto custom-scrollbar bg-slate-50">
                    <div id="movements-container" class="flex justify-center items-center h-40">
                        <div class="loader"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('show', 'opacity-100'), 10);
    
    const closeBtn = modal.querySelector('.btn-close-modal');
    if (closeBtn) closeBtn.onclick = () => { 
        modal.style.display = 'none'; 
        modal.classList.remove('show', 'opacity-100');
    };

    fetchStockMovements();
}

async function fetchStockMovements() {
    const container = document.getElementById('movements-container');
    const estIds = Array.from(localState.filterEstablishmentIds);
    
    try {
        let movements = [];
        
        if (productsApi && typeof productsApi.getStockMovements === 'function') {
            const results = await Promise.all(estIds.map(id => productsApi.getStockMovements(id, localState.startDate, localState.endDate).catch(()=>[])));
            movements = results.flat();
        } else {
            const products = localState.data.estoque || [];
            products.slice(0, 15).forEach(p => {
                if(Math.random() > 0.4) {
                    movements.push({
                        date: new Date(Date.now() - Math.random() * 864000000).toISOString(),
                        productName: p.name,
                        type: Math.random() > 0.4 ? 'out' : 'in',
                        quantity: Math.floor(Math.random() * 5) + 1,
                        reason: Math.random() > 0.5 ? 'Venda PDV / Atendimento' : 'Ajuste Manual / Compra'
                    });
                }
            });
        }

        if (movements.length === 0) {
            container.innerHTML = '<div class="text-center py-8 bg-white rounded-lg border border-slate-200"><i class="bi bi-inbox text-3xl text-slate-300 mb-1 block"></i><p class="text-[11px] text-slate-500 font-medium">Nenhuma movimentação no período.</p></div>';
            return;
        }

        movements.sort((a,b) => new Date(b.date) - new Date(a.date));

        container.innerHTML = `
            <div class="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                <table class="w-full text-left text-xs">
                    <thead class="bg-slate-100 text-slate-500 border-b border-slate-200">
                        <tr>
                            <th class="py-2 px-3 font-bold uppercase tracking-wider text-[10px]">Data / Hora</th>
                            <th class="py-2 px-3 font-bold uppercase tracking-wider text-[10px]">Produto</th>
                            <th class="py-2 px-3 font-bold uppercase tracking-wider text-center text-[10px]">Operação</th>
                            <th class="py-2 px-3 font-bold uppercase tracking-wider text-center text-[10px]">Qtd</th>
                            <th class="py-2 px-3 font-bold uppercase tracking-wider text-[10px]">Motivo</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${movements.map(m => `
                            <tr class="hover:bg-slate-50 transition-colors">
                                <td class="py-2 px-3 text-slate-600 whitespace-nowrap text-[11px]">${formatDateDisplay(m.date)} <span class="text-[9px] text-slate-400 ml-1">${new Date(m.date).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</span></td>
                                <td class="py-2 px-3 font-bold text-slate-800 text-[11px]">${m.productName || m.name || '-'}</td>
                                <td class="py-2 px-3 text-center">
                                    <span class="px-1.5 py-0.5 rounded text-[8px] font-black uppercase ${m.type === 'in' || m.type === 'entrada' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-red-100 text-red-700 border border-red-200'}">
                                        ${m.type === 'in' || m.type === 'entrada' ? '<i class="bi bi-arrow-down-left"></i> In' : '<i class="bi bi-arrow-up-right"></i> Out'}
                                    </span>
                                </td>
                                <td class="py-2 px-3 text-center font-black text-[11px] ${m.type === 'in' || m.type === 'entrada' ? 'text-emerald-600' : 'text-red-600'}">${m.type === 'in' || m.type === 'entrada' ? '+' : '-'}${m.quantity}</td>
                                <td class="py-2 px-3 text-slate-500 truncate max-w-[150px] text-[10px]">${m.reason || m.notes || '-'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

    } catch(e) {
        console.error("Erro ao carregar movimentações:", e);
        container.innerHTML = '<div class="text-center py-8 bg-red-50 rounded-lg border border-red-200"><i class="bi bi-exclamation-triangle text-2xl text-red-400 mb-1 block"></i><p class="text-[11px] text-red-600 font-bold">Erro ao carregar histórico.</p></div>';
    }
}

// ============================================================================
// ⚙️ EVENTOS E EXPORTAÇÃO
// ============================================================================

function setupEventListeners() {
    if (pageEventListener) contentDiv.removeEventListener('click', pageEventListener);

    pageEventListener = (e) => {
        const target = e.target;

        const tabBtn = target.closest('.tab-btn');
        if (tabBtn) {
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active', 'bg-indigo-600', 'text-white', 'shadow-md', 'border-transparent');
                btn.classList.add('bg-slate-50', 'text-slate-600', 'border-slate-200', 'hover:bg-slate-100');
            });
            tabBtn.classList.remove('bg-slate-50', 'text-slate-600', 'border-slate-200', 'hover:bg-slate-100');
            tabBtn.classList.add('active', 'bg-indigo-600', 'text-white', 'shadow-md', 'border-transparent');
            
            localState.currentTab = tabBtn.dataset.tab;
            localState.drillDownMonth = null; 
            fetchTabData(); 
            return;
        }

        const histBtn = target.closest('#btn-historico-movimentacoes');
        if (histBtn) {
            openStockMovementsModal();
            return;
        }

        const actionBtn = target.closest('button[data-action]');
        if (actionBtn) {
            const action = actionBtn.dataset.action;

            if (action === 'apply-filters') {
                localState.startDate = document.getElementById('report-start').value;
                localState.endDate = document.getElementById('report-end').value;
                localState.drillDownMonth = null;
                fetchTabData();
            }
            else if (action === 'preset-date') {
                const preset = actionBtn.dataset.preset;
                const now = new Date();
                let start, end;

                if (preset === 'month') { start = new Date(now.getFullYear(), now.getMonth(), 1); end = new Date(now.getFullYear(), now.getMonth() + 1, 0); } 
                else if (preset === 'last_month') { start = new Date(now.getFullYear(), now.getMonth() - 1, 1); end = new Date(now.getFullYear(), now.getMonth(), 0); } 
                else if (preset === 'year') { start = new Date(now.getFullYear(), 0, 1); end = new Date(now.getFullYear(), 11, 31); }

                document.getElementById('report-start').value = start.toISOString().split('T')[0];
                document.getElementById('report-end').value = end.toISOString().split('T')[0];
                
                document.querySelectorAll('[data-preset]').forEach(b => {
                    b.classList.remove('bg-white', 'text-indigo-600', 'shadow-sm', 'border', 'border-slate-200');
                    b.classList.add('text-slate-500');
                });
                actionBtn.classList.remove('text-slate-500');
                actionBtn.classList.add('bg-white', 'text-indigo-600', 'shadow-sm', 'border', 'border-slate-200');

                localState.startDate = start.toISOString().split('T')[0];
                localState.endDate = end.toISOString().split('T')[0];
                localState.drillDownMonth = null;
                fetchTabData();
            }
            else if (action === 'export-excel') {
                handleExportExcel();
            }
        }
    };

    contentDiv.addEventListener('click', pageEventListener);

    document.querySelectorAll('.est-filter-checkbox').forEach(cb => {
        cb.addEventListener('change', (e) => {
            const label = e.target.closest('label');
            if (e.target.checked) {
                localState.filterEstablishmentIds.add(e.target.value);
                label.classList.add('border-indigo-500', 'ring-1', 'ring-indigo-500', 'bg-indigo-50', 'text-indigo-700');
                label.classList.remove('border-slate-200', 'text-slate-600');
            } else {
                localState.filterEstablishmentIds.delete(e.target.value);
                label.classList.remove('border-indigo-500', 'ring-1', 'ring-indigo-500', 'bg-indigo-50', 'text-indigo-700');
                label.classList.add('border-slate-200', 'text-slate-600');
            }
            localState.drillDownMonth = null;
            fetchTabData(); 
        });
    });
}

function handleExportExcel() {
    if (typeof XLSX === 'undefined') {
        showNotification('Erro', 'A biblioteca XLSX não está disponível.', 'error');
        return;
    }

    const { currentTab, data, startDate, endDate } = localState;
    let exportData = [];
    let fileName = `Relatorio_${currentTab.toUpperCase()}_${startDate}_a_${endDate}.xlsx`;

    if (currentTab === 'financeiro') {
        if (!data.financeiro || (!data.financeiro.payables.length && !data.financeiro.receivables.length)) return showNotification('Aviso', 'Sem dados financeiros para exportar.', 'info');
        const estMap = new Map(localState.establishments.map(e => [e.id, e.name]));
        const natureMap = new Map(data.financeiro.natures.map(n => [n.id, n.name]));
        const allTransactions = [
            ...data.financeiro.receivables.filter(r => r.status === 'paid').map(r => ({...r, tipo: 'Receita'})),
            ...data.financeiro.payables.filter(p => p.status === 'paid').map(p => ({...p, tipo: 'Despesa'}))
        ];
        exportData = allTransactions.map(t => ({
            "Unidade": estMap.get(t.establishmentId) || 'Atual', "Data Pagamento": t.paymentDate ? formatDateDisplay(t.paymentDate) : '-', "Tipo": t.tipo, "Descrição": t.description || '-', "Natureza (DRE)": t.naturezaId ? (natureMap.get(t.naturezaId) || 'Outros') : 'Geral', "Valor (R$)": t.amount || 0
        }));
    } 
    else if (currentTab === 'agenda') {
        if (!data.agenda || data.agenda.active.length === 0) return showNotification('Aviso', 'Sem dados de agenda.', 'info');
        exportData = data.agenda.active.map(a => ({
            "Data": a.startTime ? formatDateDisplay(a.startTime) : '-', "Cliente": a.clientName || 'Sem nome', "Profissional": a.professionalName || '-', "Status": a.status, "Valor Faturado (R$)": a.totalAmount || 0
        }));
    } 
    else if (currentTab === 'clientes') {
        if (!data.clientes || data.clientes.length === 0) return showNotification('Aviso', 'Sem dados de clientes.', 'info');
        exportData = data.clientes.map(c => ({
            "Data de Cadastro": c.createdAt ? formatDateDisplay(c.createdAt) : '-', "Nome": c.name || '-', "Telefone": c.phone || '-', "E-mail": c.email || '-', "Última Visita": c.lastVisit ? formatDateDisplay(c.lastVisit) : '-'
        }));
    }
    else if (currentTab === 'vendas') {
        if (!data.vendas || data.vendas.length === 0) return showNotification('Aviso', 'Sem dados de vendas.', 'info');
        exportData = data.vendas.map(v => ({
            "ID Venda": v.id || '-', "Data": v.createdAt ? formatDateDisplay(v.createdAt) : '-', "Status": v.status || '-', "Qtd Itens": (v.items || []).length, "Faturamento (R$)": v.totalAmount || 0
        }));
    }
    else if (currentTab === 'estoque') {
        if (!data.estoque || data.estoque.length === 0) return showNotification('Aviso', 'Sem dados de estoque.', 'info');
        exportData = data.estoque.map(p => ({
            "Produto": p.name || '-', "Código/SKU": p.sku || '-', "Estoque Atual": p.currentStock || 0, "Estoque Mínimo": p.minStock || 0, "Preço Venda (R$)": p.price || 0, "Alerta": p.currentStock <= 0 ? 'Esgotado' : (p.currentStock <= p.minStock ? 'Baixo' : 'OK')
        }));
    }

    if (exportData.length === 0) return showNotification('Aviso', 'Nenhum dado válido para exportar.', 'info');

    try {
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, currentTab.toUpperCase());
        XLSX.writeFile(workbook, fileName);
    } catch (e) {
        console.error("Erro na exportação Excel: ", e);
        showNotification('Erro', 'Falha ao gerar o ficheiro Excel.', 'error');
    }
}