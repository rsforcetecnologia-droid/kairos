// js/ui/reports.js

import * as financialApi from '../api/financial.js';
import * as appointmentsApi from '../api/appointments.js';
import * as clientsApi from '../api/clients.js';
import * as salesApi from '../api/sales.js';
import * as productsApi from '../api/products.js';
import * as reportsApi from '../api/reports.js';
import { state } from '../state.js';
import { showNotification } from '../components/modal.js';
import * as comandasApi from '../api/comandas.js';

// ============================================================================
// 📊 ESTADO LOCAL E ARQUITETURA
// ============================================================================
const today = new Date();
const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

let localState = {
    startDate: firstDay.toISOString().split('T')[0],
    endDate: today.toISOString().split('T')[0],
    currentTab: 'financeiro', 
    drillDownMonth: null, 
    
    // Novo sistema de filtros cruzados para a Agenda
    agendaFilters: {
        status: null,
        professional: null,
        service: null
    },
    
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
// 🛠️ FUNÇÕES AUXILIARES E INTEGRAÇÃO GLOBAL
// ============================================================================

function getActiveEstablishmentsFromHeader() {
    const checkboxes = document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');
    if (checkboxes && checkboxes.length > 0) {
        return Array.from(checkboxes).map(cb => cb.value);
    }
    return [state.establishmentId];
}

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
// 🚀 INICIALIZAÇÃO E LAYOUT BASE
// ============================================================================

export async function loadReportsPage() {
    renderBaseLayout();
    setupEventListeners();
    await fetchTabData();
}

function renderBaseLayout() {
    contentDiv.innerHTML = `
        <section class="h-full flex flex-col p-2 pt-1 md:px-6 md:py-4 w-full bg-slate-50 relative overflow-hidden">
            
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-3 md:p-4 mb-3 z-20 flex flex-col gap-3 flex-shrink-0 animate-fade-in-down">
                
                <div class="flex flex-col 2xl:flex-row justify-between items-start 2xl:items-center gap-4 w-full">
                    
                    <div class="flex overflow-x-auto custom-scrollbar gap-2 w-full 2xl:w-auto pb-1">
                        <button data-tab="financeiro" class="tab-btn ${localState.currentTab === 'financeiro' ? 'active bg-indigo-600 text-white shadow-md border-transparent' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'} border px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2">
                            <i class="bi bi-currency-dollar text-base"></i> Financeiro
                        </button>
                        <button data-tab="agenda" class="tab-btn ${localState.currentTab === 'agenda' ? 'active bg-indigo-600 text-white shadow-md border-transparent' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'} border px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2">
                            <i class="bi bi-calendar3 text-base"></i> Agenda
                        </button>
                        <button data-tab="clientes" class="tab-btn ${localState.currentTab === 'clientes' ? 'active bg-indigo-600 text-white shadow-md border-transparent' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'} border px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2">
                            <i class="bi bi-people text-base"></i> Clientes
                        </button>
                        <button data-tab="vendas" class="tab-btn ${localState.currentTab === 'vendas' ? 'active bg-indigo-600 text-white shadow-md border-transparent' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'} border px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2">
                            <i class="bi bi-receipt text-base"></i> Vendas
                        </button>
                        <button data-tab="estoque" class="tab-btn ${localState.currentTab === 'estoque' ? 'active bg-indigo-600 text-white shadow-md border-transparent' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'} border px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2">
                            <i class="bi bi-box-seam text-base"></i> Estoque
                        </button>
                    </div>

                    <div class="flex flex-wrap items-center gap-2 w-full 2xl:w-auto justify-start 2xl:justify-end">
                        <div class="hidden md:flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                            <button data-action="preset-date" data-preset="month" class="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-colors bg-white text-indigo-600 shadow-sm border border-slate-200">Este Mês</button>
                            <button data-action="preset-date" data-preset="last_month" class="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-colors text-slate-500 hover:text-slate-700">Mês Passado</button>
                            <button data-action="preset-date" data-preset="year" class="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-colors text-slate-500 hover:text-slate-700">Este Ano</button>
                        </div>

                        <div class="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 shadow-inner flex-1 md:flex-none">
                            <input type="date" id="report-start" value="${localState.startDate}" class="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer w-full md:w-auto">
                            <span class="text-slate-400 text-[10px] font-bold uppercase">até</span>
                            <input type="date" id="report-end" value="${localState.endDate}" class="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer w-full md:w-auto">
                        </div>

                        <button data-action="apply-filters" class="py-2 px-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 active:scale-95 transition shadow-md flex items-center justify-center gap-2 text-xs uppercase tracking-wider flex-1 md:flex-none" title="Buscar">
                            <i class="bi bi-search text-sm pointer-events-none"></i> <span class="md:hidden">Buscar</span>
                        </button>
                        
                        <button data-action="export-excel" class="py-2 px-3 bg-emerald-50 text-emerald-700 font-bold rounded-xl border border-emerald-200 hover:bg-emerald-100 active:scale-95 shadow-sm flex items-center justify-center transition-colors" title="Exportar para Excel">
                            <i class="bi bi-file-earmark-excel text-base pointer-events-none"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div id="tab-content" class="flex-1 overflow-y-auto custom-scrollbar pb-24 md:pb-2"></div>
        </section>
    `;
}

// ============================================================================
// 🔄 GESTÃO INTELIGENTE DE DADOS
// ============================================================================

async function fetchTabData() {
    const container = document.getElementById('tab-content');
    if (container) container.innerHTML = '<div class="flex flex-col justify-center items-center h-64"><div class="loader mb-4 border-indigo-500"></div><p class="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">Compilando Dados...</p></div>';

    const { currentTab, startDate, endDate } = localState;
    const estIds = getActiveEstablishmentsFromHeader();
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
            localState.data.financeiro = { payables: payablesRes.entries || [], receivables: receivablesRes.entries || [], natures: natures || [] };
            renderFinanceiroTab();
        } 
        else if (currentTab === 'agenda') {
            const activePromises = estIds.map(id => appointmentsApi.getAppointmentsByDateRange(id, startISO, endISO).catch(() => []));
            const cancelledPromises = estIds.map(id => appointmentsApi.getCancelledAppointments(id, startISO, endISO).catch(() => []));
            
            const [activeResults, cancelledResults] = await Promise.all([Promise.all(activePromises), Promise.all(cancelledPromises)]);
            
            const allAppointmentsMap = new Map();
            
            activeResults.flat().forEach(a => allAppointmentsMap.set(a.id, a));
            cancelledResults.flat().forEach(a => {
                a.status = 'cancelled';
                allAppointmentsMap.set(a.id, a);
            });

            localState.data.agenda = Array.from(allAppointmentsMap.values());
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
            try {
                const reportsRes = await Promise.all(estIds.map(id => 
                    reportsApi.getSalesReport({ establishmentId: id, startDate, endDate }).catch(() => [])
                ));
                let consolidated = reportsRes.flatMap(r => Array.isArray(r) ? r : (r.transactions || r.data || []));

                let walkinSales = [];
                if (salesApi && typeof salesApi.getSalesByDateRange === 'function') {
                    const fallbackRes = await Promise.all(estIds.map(id => 
                        salesApi.getSalesByDateRange(id, startISO, endISO).catch(() => [])
                    ));
                    walkinSales = fallbackRes.flat();
                }

                let comandasSales = [];
                if (comandasApi && typeof comandasApi.getComandas === 'function') {
                    const comandasRes = await Promise.all(estIds.map(id => 
                        comandasApi.getComandas(id).catch(() => ({ data: [] }))
                    ));
                    const allComandas = comandasRes.flatMap(r => Array.isArray(r) ? r : (r.data || r.comandas || []));
                    
                    const startObj = new Date(startISO);
                    const endObj = new Date(endISO);
                    comandasSales = allComandas.filter(c => {
                        const cDate = dateParser(c.createdAt || c.date || c.timestamp);
                        return cDate >= startObj && cDate <= endObj;
                    });
                }

                const allSalesMap = new Map();
                consolidated.forEach(v => allSalesMap.set(v.id, v));
                walkinSales.forEach(v => allSalesMap.set(v.id, v));
                comandasSales.forEach(v => allSalesMap.set(v.id, v));

                localState.data.vendas = Array.from(allSalesMap.values());

            } catch (err) {
                console.warn("Aviso ao buscar vendas:", err);
                localState.data.vendas = [];
            }
            renderVendasTab();
        }
        else if (currentTab === 'estoque') {
            const productsResults = await Promise.all(estIds.map(id => productsApi.getProducts(id).catch(() => [])));
            const uniqueProductsMap = new Map();
            productsResults.flat().forEach(p => uniqueProductsMap.set(p.id, p));
            localState.data.estoque = Array.from(uniqueProductsMap.values());
            renderEstoqueTab();
        }
    } catch (error) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-red-100 shadow-sm">
                <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                    <i class="bi bi-exclamation-triangle text-3xl text-red-400"></i>
                </div>
                <h3 class="text-base font-black text-slate-800 mb-1">Erro de Processamento</h3>
                <p class="text-xs text-slate-500 max-w-sm text-center font-medium mb-6">${error.message}</p>
            </div>
        `;
    }
}

// ============================================================================
// 💰 ABA FINANCEIRO (COM INSIGHTS)
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
    const chartRecReal = [], chartRecPrev = [], chartDespReal = [], chartDespPrev = [], chartBalance = [];

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

    const insightBg = saldo >= 0 ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800';
    const insightIcon = saldo >= 0 ? '<i class="bi bi-graph-up-arrow mr-2 text-emerald-500"></i>' : '<i class="bi bi-graph-down-arrow mr-2 text-red-500"></i>';
    const insightText = saldo >= 0 ? 'O fluxo de caixa operacional está positivo neste período.' : 'Atenção: As despesas superaram as receitas no período selecionado.';

    const dreIn = {}; const dreOut = {}; 
    receivables.filter(r => r.status === 'paid').forEach(r => { const n = r.naturezaId ? (natMap.get(r.naturezaId) || 'Outros') : 'Sem Cat.'; dreIn[n] = (dreIn[n] || 0) + r.amount; });
    payables.filter(p => p.status === 'paid').forEach(p => { const n = p.naturezaId ? (natMap.get(p.naturezaId) || 'Outros') : 'Sem Cat.'; dreOut[n] = (dreOut[n] || 0) + p.amount; });

    container.innerHTML = `
        <div class="space-y-4 animate-fade-in">
            
            <div class="flex items-center p-3 rounded-xl border shadow-sm ${insightBg}">
                ${insightIcon}
                <span class="text-xs font-bold tracking-wide">${insightText}</span>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:border-emerald-300 transition-colors"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-arrow-up-circle text-emerald-500 mr-1 text-sm"></i> Receita Realizada</span><span class="text-xl md:text-2xl font-black text-slate-800 mt-1">${formatCurrency(totalIn)}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:border-red-300 transition-colors"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-arrow-down-circle text-red-500 mr-1 text-sm"></i> Despesa Realizada</span><span class="text-xl md:text-2xl font-black text-slate-800 mt-1">${formatCurrency(totalOut)}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:border-indigo-300 transition-colors"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-wallet2 text-indigo-500 mr-1 text-sm"></i> Saldo do Período</span><span class="text-xl md:text-2xl font-black ${saldo >= 0 ? 'text-emerald-600' : 'text-red-600'} mt-1">${formatCurrency(saldo)}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:border-amber-300 transition-colors"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-pie-chart text-amber-500 mr-1 text-sm"></i> Margem Real</span><span class="text-xl md:text-2xl font-black ${margem >= 0 ? 'text-indigo-600' : 'text-red-600'} mt-1">${margem.toFixed(1)}%</span></div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div class="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
                        <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider"><i class="bi bi-bar-chart-steps text-indigo-500 mr-2"></i> Fluxo de Caixa Dinâmico</h3>
                    </div>
                    
                    <div class="flex flex-wrap gap-2 mb-4 pb-3 border-b border-slate-100">
                        <button class="fin-toggle-btn active bg-emerald-50 text-emerald-700 border-emerald-200" data-dataset="0"><span class="w-2 h-2 rounded-full bg-[#10b981]"></span> Realizada</button>
                        <button class="fin-toggle-btn active bg-emerald-50 text-emerald-700 border-emerald-200 opacity-60" data-dataset="1"><span class="w-2 h-2 rounded-full bg-[#6ee7b7]"></span> Prevista</button>
                        <button class="fin-toggle-btn active bg-red-50 text-red-700 border-red-200" data-dataset="2"><span class="w-2 h-2 rounded-full bg-[#ef4444]"></span> Realizada</button>
                        <button class="fin-toggle-btn active bg-red-50 text-red-700 border-red-200 opacity-60" data-dataset="3"><span class="w-2 h-2 rounded-full bg-[#fca5a5]"></span> Prevista</button>
                        <button class="fin-toggle-btn active bg-indigo-50 text-indigo-700 border-indigo-200 ml-auto" data-dataset="4"><span class="w-3 h-1 bg-[#4f46e5] rounded-full"></span> Saldo</button>
                    </div>

                    <div class="relative flex-1 w-full min-h-[300px]"><canvas id="chartFin"></canvas></div>
                </div>

                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider mb-4"><i class="bi bi-card-list text-indigo-500 mr-2"></i> DRE Resumida</h3>
                    <div class="flex-1 overflow-y-auto custom-scrollbar pr-3">
                        <div class="mb-5">
                            <p class="text-[10px] font-black text-emerald-600 uppercase tracking-widest border-b border-emerald-100 pb-2 mb-3">Receitas</p>
                            ${Object.entries(dreIn).sort((a,b)=>b[1]-a[1]).map(([k, v]) => `<div class="flex justify-between items-center mb-2"><span class="text-xs font-medium text-slate-600 truncate mr-2">${k}</span><span class="text-xs font-black text-slate-800">${formatCurrency(v)}</span></div>`).join('') || '<p class="text-xs font-medium text-slate-400">Sem receitas pagas no período.</p>'}
                        </div>
                        <div>
                            <p class="text-[10px] font-black text-red-500 uppercase tracking-widest border-b border-red-100 pb-2 mb-3">Despesas</p>
                            ${Object.entries(dreOut).sort((a,b)=>b[1]-a[1]).map(([k, v]) => `<div class="flex justify-between items-center mb-2"><span class="text-xs font-medium text-slate-600 truncate mr-2">${k}</span><span class="text-xs font-black text-slate-800">${formatCurrency(v)}</span></div>`).join('') || '<p class="text-xs font-medium text-slate-400">Sem despesas pagas no período.</p>'}
                        </div>
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
                        { label: 'Receita Realizada', data: chartRecReal, backgroundColor: '#10b981', stack: 'Stack 0', borderRadius: 4, order: 2 },
                        { label: 'Receita Prevista', data: chartRecPrev, backgroundColor: '#6ee7b7', stack: 'Stack 0', borderRadius: 4, order: 2 },
                        { label: 'Despesa Realizada', data: chartDespReal, backgroundColor: '#ef4444', stack: 'Stack 0', borderRadius: 4, order: 2 },
                        { label: 'Despesa Prevista', data: chartDespPrev, backgroundColor: '#fca5a5', stack: 'Stack 0', borderRadius: 4, order: 2 },
                        { label: 'Saldo Acumulado', data: chartBalance, type: 'line', borderColor: '#4f46e5', backgroundColor: 'rgba(79, 70, 229, 0.1)', fill: true, tension: 0.4, borderWidth: 3, pointRadius: 4, yAxisID: 'y1', order: 1 }
                    ] 
                },
                options: { 
                    responsive: true, maintainAspectRatio: false,
                    interaction: { mode: 'index', intersect: false },
                    plugins: { 
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                            titleFont: { size: 13, family: 'Inter' },
                            bodyFont: { size: 12, family: 'Inter' },
                            padding: 12,
                            cornerRadius: 8,
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) label += ': ';
                                    if (context.parsed.y !== null) label += formatCurrency(Math.abs(context.parsed.y));
                                    return label;
                                }
                            }
                        }
                    },
                    scales: { 
                        x: { stacked: true, grid: { display: false }, ticks: { font: { family: 'Inter', weight: 'bold' } } },
                        y: { stacked: true, beginAtZero: true, grid: { borderDash: [4, 4], color: '#f1f5f9' }, ticks: { font:{size: 10, family: 'Inter'}, callback: (val) => formatCurrency(Math.abs(val)) } },
                        y1: { position: 'right', beginAtZero: true, grid: { display: false }, ticks: { font:{size: 10, family: 'Inter'}, callback: (val) => formatCurrency(val) } }
                    } 
                }
            });

            document.querySelectorAll('.fin-toggle-btn').forEach(btn => {
                btn.className = "fin-toggle-btn flex items-center gap-2 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all shadow-sm rounded-lg border cursor-pointer";
                btn.onclick = (e) => {
                    const btnEl = e.currentTarget;
                    const dsIndex = parseInt(btnEl.dataset.dataset);
                    const chart = localState.charts['fin'];
                    
                    if (chart.isDatasetVisible(dsIndex)) {
                        chart.hide(dsIndex);
                        btnEl.style.opacity = '0.4';
                        btnEl.style.filter = 'grayscale(100%)';
                    } else {
                        chart.show(dsIndex);
                        btnEl.style.opacity = '1';
                        btnEl.style.filter = 'none'; 
                    }
                };
            });
        }
    }, 100);
}

// ============================================================================
// 📅 ABA AGENDA (DASHBOARD COMPLETO & CRUZAMENTO DE DADOS)
// ============================================================================

function renderAgendaTab() {
    const container = document.getElementById('tab-content');
    const allAgenda = localState.data.agenda || [];

    // 1. Cálculos Globais (Cartões do Topo - para não sumirem ao filtrar)
    const total = allAgenda.length;
    const concluidas = allAgenda.filter(a => a.status === 'completed' || a.status === 'concluida').length;
    const aguardando = allAgenda.filter(a => ['confirmed', 'pending', 'in-progress'].includes(a.status)).length;
    const noShow = allAgenda.filter(a => a.status === 'no-show').length;
    const canceladas = allAgenda.filter(a => a.status === 'cancelled' || a.status === 'cancelada').length;

    // 2. Aplicar Filtros (Drill-down cruzado)
    let filteredAgenda = allAgenda;

    if (localState.agendaFilters.status) {
        if (localState.agendaFilters.status === 'concluidas') {
            filteredAgenda = filteredAgenda.filter(a => a.status === 'completed' || a.status === 'concluida');
        } else if (localState.agendaFilters.status === 'aguardando') {
            filteredAgenda = filteredAgenda.filter(a => ['confirmed', 'pending', 'in-progress'].includes(a.status));
        } else if (localState.agendaFilters.status === 'noshow') {
            filteredAgenda = filteredAgenda.filter(a => a.status === 'no-show');
        } else if (localState.agendaFilters.status === 'canceladas') {
            filteredAgenda = filteredAgenda.filter(a => a.status === 'cancelled' || a.status === 'cancelada');
        }
    }

    if (localState.agendaFilters.professional) {
        filteredAgenda = filteredAgenda.filter(a => (a.professionalName || 'Sem Profissional') === localState.agendaFilters.professional);
    }

    if (localState.agendaFilters.service) {
        filteredAgenda = filteredAgenda.filter(a => {
            if (a.services && Array.isArray(a.services) && a.services.length > 0) {
                return a.services.some(s => (s.name || s.nome || 'Serviço Indefinido') === localState.agendaFilters.service);
            } else if (a.serviceName) {
                return a.serviceName === localState.agendaFilters.service;
            }
            return localState.agendaFilters.service === 'Outros';
        });
    }

    // 3. Recalcular Métricas Secundárias (Baseadas na Filtragem)
    const f_total = filteredAgenda.length;
    const f_concluidas = filteredAgenda.filter(a => a.status === 'completed' || a.status === 'concluida').length;
    const f_canceladas = filteredAgenda.filter(a => a.status === 'cancelled' || a.status === 'cancelada').length;

    const taxaConclusao = f_total > 0 ? ((f_concluidas / f_total) * 100).toFixed(1) : 0;
    const taxaCancelamento = f_total > 0 ? ((f_canceladas / f_total) * 100).toFixed(1) : 0;
    const receitaTotal = filteredAgenda.filter(a => a.status === 'completed' || a.status === 'concluida').reduce((s, i) => s + (Number(i.totalAmount || (i.transaction ? i.transaction.totalAmount : 0)) || 0), 0);

    const insightBg = taxaCancelamento > 20 ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-indigo-50 border-indigo-200 text-indigo-800';
    const insightIcon = taxaCancelamento > 20 ? '<i class="bi bi-exclamation-triangle mr-2 text-amber-500"></i>' : '<i class="bi bi-calendar-check mr-2 text-indigo-500"></i>';
    const insightText = taxaCancelamento > 20 ? `Atenção: A taxa de cancelamento está alta (${taxaCancelamento}%). Considere enviar lembretes aos clientes.` : `A agenda fluiu bem neste cenário, com ${taxaConclusao}% de aproveitamento.`;

    // Processamento do Gráfico Principal: Evolução
    let labels = [];
    let dataAgendados = [];
    let dataCancelados = [];
    
    if (localState.drillDownMonth !== null) {
        const anoAtual = new Date(localState.startDate).getFullYear();
        const daysInMonth = new Date(anoAtual, localState.drillDownMonth + 1, 0).getDate();
        labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);
        
        dataAgendados = labels.map(day => filteredAgenda.filter(a => { 
            const d = dateParser(a.startTime || a.date); 
            return d.getMonth() === localState.drillDownMonth && d.getDate() === parseInt(day) && (a.status !== 'cancelled' && a.status !== 'cancelada'); 
        }).length);
        
        dataCancelados = labels.map(day => filteredAgenda.filter(a => { 
            const d = dateParser(a.startTime || a.date); 
            return d.getMonth() === localState.drillDownMonth && d.getDate() === parseInt(day) && (a.status === 'cancelled' || a.status === 'cancelada'); 
        }).length);

    } else {
        labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        dataAgendados = labels.map((_, idx) => filteredAgenda.filter(a => dateParser(a.startTime || a.date).getMonth() === idx && (a.status !== 'cancelled' && a.status !== 'cancelada')).length);
        dataCancelados = labels.map((_, idx) => filteredAgenda.filter(a => dateParser(a.startTime || a.date).getMonth() === idx && (a.status === 'cancelled' || a.status === 'cancelada')).length);
    }

    // Processamento de Profissionais e Serviços
    const profRanking = {};
    const serviceRanking = {};

    filteredAgenda.forEach(a => {
        // Ignora canceladas nos gráficos de Top (a menos que estejamos filtrando apenas canceladas)
        if ((a.status === 'cancelled' || a.status === 'cancelada') && localState.agendaFilters.status !== 'canceladas') return;

        const prof = a.professionalName || 'Sem Profissional';
        profRanking[prof] = (profRanking[prof] || 0) + 1;

        if (a.services && Array.isArray(a.services) && a.services.length > 0) {
            a.services.forEach(s => {
                const sName = s.name || s.nome || 'Serviço Indefinido';
                serviceRanking[sName] = (serviceRanking[sName] || 0) + 1;
            });
        } else if (a.serviceName) {
            serviceRanking[a.serviceName] = (serviceRanking[a.serviceName] || 0) + 1;
        } else {
            serviceRanking['Outros'] = (serviceRanking['Outros'] || 0) + 1;
        }
    });

    const topProfissionais = Object.entries(profRanking).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const topServicos = Object.entries(serviceRanking).sort((a, b) => b[1] - a[1]).slice(0, 5);

    // Classes dinâmicas para as bordas dos cards (UI feedback visual)
    const fStatus = localState.agendaFilters.status;
    const cardTodosClass = !fStatus ? 'border-slate-800 ring-2 ring-slate-200' : 'border-slate-200';
    const cardConcluidaClass = fStatus === 'concluidas' ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-emerald-100';
    const cardAguardandoClass = fStatus === 'aguardando' ? 'border-amber-500 ring-2 ring-amber-200' : 'border-amber-100';
    const cardNoshowClass = fStatus === 'noshow' ? 'border-red-500 ring-2 ring-red-200' : 'border-red-100';
    const cardCanceladasClass = fStatus === 'canceladas' ? 'border-slate-500 ring-2 ring-slate-300' : 'border-slate-200';

    container.innerHTML = `
        <div class="space-y-4 animate-fade-in">
            
            ${(localState.agendaFilters.status || localState.agendaFilters.professional || localState.agendaFilters.service || localState.drillDownMonth !== null) ? `
                <div class="flex flex-wrap items-center gap-2 mb-4 bg-indigo-50 p-2.5 rounded-xl border border-indigo-100 shadow-sm animate-fade-in-fast">
                    <span class="text-[10px] font-bold text-indigo-800 uppercase tracking-widest ml-2 flex items-center gap-1.5"><i class="bi bi-funnel-fill text-indigo-500"></i> Filtros Ativos:</span>
                    ${localState.agendaFilters.status ? `<span class="bg-white px-2 py-1 rounded border border-indigo-200 text-[10px] font-black text-indigo-600 shadow-sm">${localState.agendaFilters.status.toUpperCase()}</span>` : ''}
                    ${localState.agendaFilters.professional ? `<span class="bg-white px-2 py-1 rounded border border-indigo-200 text-[10px] font-black text-indigo-600 shadow-sm">${localState.agendaFilters.professional}</span>` : ''}
                    ${localState.agendaFilters.service ? `<span class="bg-white px-2 py-1 rounded border border-indigo-200 text-[10px] font-black text-indigo-600 shadow-sm">${localState.agendaFilters.service}</span>` : ''}
                    ${localState.drillDownMonth !== null ? `<span class="bg-white px-2 py-1 rounded border border-indigo-200 text-[10px] font-black text-indigo-600 shadow-sm">MÊS: ${localState.drillDownMonth + 1}</span>` : ''}
                    <button id="btn-clear-agenda-filters" class="ml-auto text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors shadow-sm active:scale-95"><i class="bi bi-x-lg mr-1"></i> Limpar</button>
                </div>
            ` : ''}

            <div class="flex items-center p-3 rounded-xl border shadow-sm ${insightBg}">
                ${insightIcon}
                <span class="text-xs font-bold tracking-wide">${insightText}</span>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div data-agenda-filter="todos" class="cursor-pointer transition-transform hover:scale-105 bg-white p-4 rounded-2xl border ${cardTodosClass} shadow-sm">
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Total Agendas</span><span class="text-xl md:text-2xl font-black text-slate-800 mt-1">${total}</span>
                </div>
                <div data-agenda-filter="concluidas" class="cursor-pointer transition-transform hover:scale-105 bg-emerald-50 p-4 rounded-2xl border ${cardConcluidaClass} shadow-sm">
                    <span class="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block">Concluídas</span><span class="text-xl md:text-2xl font-black text-emerald-700 mt-1">${concluidas}</span>
                </div>
                <div data-agenda-filter="aguardando" class="cursor-pointer transition-transform hover:scale-105 bg-amber-50 p-4 rounded-2xl border ${cardAguardandoClass} shadow-sm">
                    <span class="text-[10px] font-bold text-amber-600 uppercase tracking-widest block">Aguardando</span><span class="text-xl md:text-2xl font-black text-amber-700 mt-1">${aguardando}</span>
                </div>
                <div data-agenda-filter="noshow" class="cursor-pointer transition-transform hover:scale-105 bg-red-50 p-4 rounded-2xl border ${cardNoshowClass} shadow-sm">
                    <span class="text-[10px] font-bold text-red-600 uppercase tracking-widest block">Faltou (No-Show)</span><span class="text-xl md:text-2xl font-black text-red-700 mt-1">${noShow}</span>
                </div>
                <div data-agenda-filter="canceladas" class="cursor-pointer transition-transform hover:scale-105 bg-slate-100 p-4 rounded-2xl border ${cardCanceladasClass} shadow-sm">
                    <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Canceladas</span><span class="text-xl md:text-2xl font-black text-slate-600 mt-1">${canceladas}</span>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-gradient-to-br from-indigo-600 to-violet-700 p-5 rounded-2xl text-white shadow-lg flex items-center justify-between transition-transform hover:scale-[1.02]">
                    <div>
                        <p class="text-[11px] font-black uppercase opacity-80 tracking-widest mb-1.5">Taxa Conclusão (Cenário)</p>
                        <p class="text-3xl md:text-4xl font-black">${taxaConclusao}%</p>
                    </div>
                    <i class="bi bi-graph-up-arrow text-5xl opacity-30 drop-shadow-md"></i>
                </div>
                <div class="bg-gradient-to-br from-emerald-500 to-teal-600 p-5 rounded-2xl text-white shadow-lg flex items-center justify-between transition-transform hover:scale-[1.02]">
                    <div>
                        <p class="text-[11px] font-black uppercase opacity-80 tracking-widest mb-1.5">Receita Atendimentos (Cenário)</p>
                        <p class="text-3xl md:text-4xl font-black">${formatCurrency(receitaTotal)}</p>
                    </div>
                    <i class="bi bi-cash-coin text-5xl opacity-30 drop-shadow-md"></i>
                </div>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div class="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                    <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider"><i class="bi bi-bar-chart-line text-indigo-500 mr-2"></i> Evolução da Agenda ${localState.drillDownMonth !== null ? `(${labels.length} dias)` : ''}</h3>
                    ${localState.drillDownMonth !== null ? `<button id="btn-back-agenda" class="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors shadow-sm active:scale-95"><i class="bi bi-arrow-left mr-1"></i> Voltar p/ Anual</button>` : '<span class="hidden md:inline-block text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-1 rounded-md">Dica: Clique na barra para detalhar.</span>'}
                </div>
                <div class="relative h-72 w-full"><canvas id="chartAgenda"></canvas></div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3 flex items-center justify-between">
                        <span><i class="bi bi-person-badge text-indigo-500 mr-2"></i> Top Profissionais</span>
                        <span class="text-[9px] text-slate-400">Clique na cor para filtrar</span>
                    </h3>
                    <div class="relative h-64 w-full flex justify-center"><canvas id="chartProfissionais"></canvas></div>
                </div>
                
                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3 flex items-center justify-between">
                        <span><i class="bi bi-scissors text-indigo-500 mr-2"></i> Serviços Mais Agendados</span>
                        <span class="text-[9px] text-slate-400">Clique na barra para filtrar</span>
                    </h3>
                    <div class="relative h-64 w-full"><canvas id="chartServicos"></canvas></div>
                </div>
            </div>
        </div>`;

    setTimeout(() => {
        if (!window.Chart) return;

        // 1. Gráfico de Evolução (Barras Empilhadas)
        const ctxAgenda = document.getElementById('chartAgenda');
        if (ctxAgenda) {
            destroyChart('agenda');
            localState.charts['agenda'] = new Chart(ctxAgenda, {
                type: 'bar',
                data: { 
                    labels: labels, 
                    datasets: [
                        { label: 'Realizados / Pendentes', data: dataAgendados, backgroundColor: '#4f46e5', borderRadius: 4, stack: 'Stack 0' },
                        { label: 'Cancelados', data: dataCancelados, backgroundColor: '#cbd5e1', borderRadius: 4, stack: 'Stack 0' }
                    ] 
                },
                options: { 
                    responsive: true, maintainAspectRatio: false, 
                    onClick: (e, elements) => { 
                        if (elements.length > 0 && localState.drillDownMonth === null) { 
                            localState.drillDownMonth = elements[0].index; 
                            renderAgendaTab(); 
                        } 
                    }, 
                    onHover: (event, chartElement) => {
                        event.native.target.style.cursor = chartElement[0] && localState.drillDownMonth === null ? 'pointer' : 'default';
                    },
                    plugins: { 
                        legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8, font: { family: 'Inter', size: 11, weight: 'bold' } } },
                        tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.9)', titleFont: { size: 13, family: 'Inter' }, bodyFont: { size: 12, family: 'Inter' }, padding: 12, cornerRadius: 8 }
                    }, 
                    scales: { 
                        y: { stacked: true, beginAtZero: true, grid: { color: '#f1f5f9', borderDash: [4, 4] }, ticks: { stepSize: 1, font:{size: 10, family: 'Inter', weight: 'bold'} } }, 
                        x: { stacked: true, grid: { display: false }, ticks: { font:{size: 10, family: 'Inter', weight: 'bold'} } } 
                    } 
                }
            });
        }
        const backBtn = document.getElementById('btn-back-agenda');
        if (backBtn) backBtn.onclick = () => { localState.drillDownMonth = null; renderAgendaTab(); };

        // 2. Gráfico de Profissionais (Rosca/Doughnut c/ Drill Down)
        const ctxProf = document.getElementById('chartProfissionais');
        if (ctxProf && topProfissionais.length > 0) {
            destroyChart('profissionais');
            localState.charts['profissionais'] = new Chart(ctxProf, {
                type: 'doughnut',
                data: {
                    labels: topProfissionais.map(p => p[0].length > 20 ? p[0].substring(0,20)+'...' : p[0]),
                    datasets: [{ data: topProfissionais.map(p => p[1]), backgroundColor: ['#4f46e5', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6'], borderWidth: 0, hoverOffset: 4 }]
                },
                options: { 
                    responsive: true, maintainAspectRatio: false, cutout: '65%', 
                    onClick: (e, elements) => {
                        if (elements.length > 0) {
                            const idx = elements[0].index;
                            const selectedProf = topProfissionais[idx][0];
                            if(localState.agendaFilters.professional !== selectedProf) {
                                localState.agendaFilters.professional = selectedProf;
                                renderAgendaTab();
                            }
                        }
                    },
                    onHover: (event, chartElement) => {
                        event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
                    },
                    plugins: { 
                        legend: { position: 'right', labels: { usePointStyle: true, boxWidth: 8, font: { family: 'Inter', size: 10, weight: 'bold' } } },
                        tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.9)', titleFont: { size: 13, family: 'Inter' }, bodyFont: { size: 12, family: 'Inter' }, padding: 12, cornerRadius: 8 } 
                    } 
                }
            });
        } else if (ctxProf) {
            ctxProf.parentElement.innerHTML = '<div class="flex h-full items-center justify-center text-xs font-bold text-slate-400">Sem dados suficientes no período</div>';
        }

        // 3. Gráfico de Serviços (Barras Horizontais c/ Drill Down)
        const ctxServ = document.getElementById('chartServicos');
        if (ctxServ && topServicos.length > 0) {
            destroyChart('servicos');
            localState.charts['servicos'] = new Chart(ctxServ, {
                type: 'bar',
                data: { 
                    labels: topServicos.map(s => s[0].length > 18 ? s[0].substring(0,18)+'...' : s[0]), 
                    datasets: [{ label: 'Agendamentos', data: topServicos.map(s => s[1]), backgroundColor: '#f43f5e', borderRadius: 4 }] 
                },
                options: { 
                    indexAxis: 'y', responsive: true, maintainAspectRatio: false, 
                    onClick: (e, elements) => {
                        if (elements.length > 0) {
                            const idx = elements[0].index;
                            const selectedServ = topServicos[idx][0];
                            if(localState.agendaFilters.service !== selectedServ) {
                                localState.agendaFilters.service = selectedServ;
                                renderAgendaTab();
                            }
                        }
                    },
                    onHover: (event, chartElement) => {
                        event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
                    },
                    plugins: { 
                        legend: { display: false },
                        tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.9)', titleFont: { size: 13, family: 'Inter' }, bodyFont: { size: 12, family: 'Inter' }, padding: 12, cornerRadius: 8 }
                    }, 
                    scales: { 
                        x: { beginAtZero: true, grid: { color: '#f1f5f9', borderDash: [4, 4] }, ticks: { stepSize: 1, font:{size: 10, family: 'Inter', weight: 'bold'} } }, 
                        y: { grid: { display: false }, ticks: { font:{size: 10, family: 'Inter', weight: 'bold'} } } 
                    } 
                }
            });
        } else if (ctxServ) {
            ctxServ.parentElement.innerHTML = '<div class="flex h-full items-center justify-center text-xs font-bold text-slate-400">Sem dados suficientes no período</div>';
        }

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
        <div class="space-y-4 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-people-fill text-indigo-500 mr-1"></i> Base Total</span><span class="text-xl md:text-2xl font-black text-slate-800 mt-1">${totalBase}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-emerald-600 uppercase tracking-widest"><i class="bi bi-person-plus-fill mr-1"></i> Novos (Período)</span><span class="text-xl md:text-2xl font-black text-emerald-700 mt-1">${novosNoPeriodo.length}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-amber-500 uppercase tracking-widest"><i class="bi bi-person-dash-fill mr-1"></i> Ausentes (>60d)</span><span class="text-xl md:text-2xl font-black text-amber-600 mt-1">${ausentes.length}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-blue-500 uppercase tracking-widest"><i class="bi bi-graph-up-arrow mr-1"></i> Crescimento</span><span class="text-xl md:text-2xl font-black text-blue-600 mt-1">+${taxaCrescimento}%</span></div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div class="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div class="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                        <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider"><i class="bi bi-person-lines-fill text-indigo-500 mr-2"></i> Aquisição ${localState.drillDownMonth !== null ? '(Diário)' : '(Mensal)'}</h3>
                        ${localState.drillDownMonth !== null ? `<button id="btn-back-clientes" class="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg">Voltar</button>` : ''}
                    </div>
                    <div class="relative h-64 w-full"><canvas id="chartClientes"></canvas></div>
                </div>

                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3"><i class="bi bi-star-fill text-amber-400 mr-2"></i> Últimos Cadastros</h3>
                    <div class="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
                        ${novosNoPeriodo.slice(0, 10).reverse().map(c => `
                            <div class="flex items-center justify-between border-b border-slate-50 pb-2">
                                <div>
                                    <p class="text-xs font-black text-slate-700 truncate max-w-[140px]">${c.name}</p>
                                    <p class="text-[10px] font-medium text-slate-400">${c.phone || 'Sem contato'}</p>
                                </div>
                                <span class="text-[9px] bg-emerald-50 border border-emerald-200 text-emerald-600 px-2 py-1 rounded-lg font-black uppercase tracking-widest">Novo</span>
                            </div>
                        `).join('') || '<p class="text-xs font-medium text-slate-400">Nenhum cliente novo neste período.</p>'}
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
                type: 'line',
                data: { labels: labels, datasets: [{ label: 'Novos Cadastros', data: dataPoints, borderColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.15)', fill: true, tension: 0.4, borderWidth: 3, pointRadius: 4 }] },
                options: { responsive: true, maintainAspectRatio: false, onClick: (e, elements) => { if (elements.length > 0 && localState.drillDownMonth === null) { localState.drillDownMonth = elements[0].index; renderClientesTab(); } }, plugins: { legend: { display: false }, tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.9)', titleFont: { size: 13, family: 'Inter' }, bodyFont: { size: 12, family: 'Inter' }, padding: 12, cornerRadius: 8 } }, scales: { y: { beginAtZero: true, grid: { color: '#f1f5f9', borderDash: [4, 4] }, ticks: { stepSize: 1, font:{size: 10, family: 'Inter', weight: 'bold'} } }, x: { grid: { display: false }, ticks: { font:{size: 10, family: 'Inter', weight: 'bold'} } } } }
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
    
    // Status universais do PDV e Vendas: 'closed', 'paid', 'concluida', 'fechada', 'completed'
    const vendasConcluidas = sales.filter(s => {
        const st = String(s.status || '').toLowerCase();
        return ['completed', 'paid', 'concluida', 'fechada', 'closed'].includes(st);
    });
    
    // Suporte para 'totalAmount' (Vendas) ou 'total' / 'valorTotal' (Comandas PDV)
    const faturamentoBruto = vendasConcluidas.reduce((acc, s) => acc + (Number(s.totalAmount || s.total || s.totalValue || s.valorTotal) || 0), 0);
    const qtdVendas = vendasConcluidas.length;
    const ticketMedio = qtdVendas > 0 ? faturamentoBruto / qtdVendas : 0;
    
    let totalItens = 0;
    const itemRanking = {};
    
    vendasConcluidas.forEach(venda => {
        // Suporte para listas de 'items', 'services' ou 'cart' (usado no PDV)
        const safeItems = Array.isArray(venda.items) ? venda.items : (Array.isArray(venda.services) ? venda.services : (Array.isArray(venda.cart) ? venda.cart : []));
        
        safeItems.forEach(item => {
            const qtd = Number(item.quantity || item.quantidade) || 1;
            totalItens += qtd;
            const nome = item.name || item.nome || 'Produto/Serviço Indefinido';
            itemRanking[nome] = (itemRanking[nome] || 0) + qtd;
        });
    });

    const topItens = Object.entries(itemRanking).sort((a,b) => b[1] - a[1]).slice(0, 5);

    container.innerHTML = `
        <div class="space-y-4 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div class="bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-4 rounded-2xl shadow-md flex flex-col hover:scale-[1.02] transition-transform"><span class="text-[10px] font-black text-indigo-200 uppercase tracking-widest">Faturamento PDV</span><span class="text-xl md:text-2xl font-black mt-1">${formatCurrency(faturamentoBruto)}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ticket Médio</span><span class="text-xl md:text-2xl font-black text-slate-800 mt-1">${formatCurrency(ticketMedio)}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Vendas</span><span class="text-xl md:text-2xl font-black text-slate-800 mt-1">${qtdVendas}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Volume Itens</span><span class="text-xl md:text-2xl font-black text-slate-800 mt-1">${totalItens}</span></div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3"><i class="bi bi-trophy-fill text-amber-500 mr-2"></i> Curva ABC (Top 5 Vendidos)</h3>
                    <div class="relative h-64 w-full"><canvas id="chartVendas"></canvas></div>
                </div>

                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3"><i class="bi bi-receipt-cutoff text-indigo-500 mr-2"></i> Últimas Vendas Processadas</h3>
                    <div class="flex-1 overflow-y-auto custom-scrollbar pr-3 space-y-2.5">
                        ${vendasConcluidas.slice(0, 8).map(v => {
                            const safeItemsArray = Array.isArray(v.items) ? v.items : (Array.isArray(v.services) ? v.services : (Array.isArray(v.cart) ? v.cart : []));
                            const size = safeItemsArray.length || 1;
                            const total = Number(v.totalAmount || v.total || v.totalValue || v.valorTotal || 0);
                            const dateStr = v.createdAt || v.date || v.timestamp || '';
                            
                            return `
                                <div class="flex items-center justify-between border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors p-3 rounded-xl">
                                    <div>
                                        <p class="text-xs font-black text-slate-700">#${(v.id || '').substring(0,6).toUpperCase()}</p>
                                        <p class="text-[10px] font-bold text-slate-400 mt-0.5">${formatDateDisplay(dateStr)}</p>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-xs font-black text-emerald-600">${formatCurrency(total)}</p>
                                        <p class="text-[10px] font-bold text-slate-400 mt-0.5">${size} ${size === 1 ? 'item' : 'itens'}</p>
                                    </div>
                                </div>
                            `;
                        }).join('') || '<p class="text-xs font-medium text-slate-400 text-center py-4">Nenhuma venda concluída no período.</p>'}
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
                data: { labels: topItens.map(i => i[0].length > 15 ? i[0].substring(0,15)+'...' : i[0]), datasets: [{ label: 'Quantidade Vendida', data: topItens.map(i => i[1]), backgroundColor: '#f59e0b', borderRadius: 4 }] },
                options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.9)', titleFont: { size: 13, family: 'Inter' }, bodyFont: { size: 12, family: 'Inter' }, padding: 12, cornerRadius: 8 } }, scales: { x: { beginAtZero: true, grid: { color: '#f1f5f9', borderDash: [4, 4] }, ticks: { stepSize: 1, font:{size: 10, family: 'Inter', weight: 'bold'} } }, y: { grid: { display: false }, ticks: { font:{size: 10, family: 'Inter', weight: 'bold'} } } } }
            });
        } else if (ctx) {
            ctx.parentElement.innerHTML = '<div class="flex h-full items-center justify-center text-xs font-bold text-slate-400">Sem dados suficientes</div>';
        }
    }, 100);
}

// ============================================================================
// 📦 ABA ESTOQUE 
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
        <div class="space-y-4 animate-fade-in">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div class="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-4 rounded-2xl shadow-md flex flex-col hover:scale-[1.02] transition-transform"><span class="text-[10px] font-black text-slate-300 uppercase tracking-widest">Imobilizado</span><span class="text-xl md:text-2xl font-black mt-1">${formatCurrency(totalImobilizado)}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Produtos Ativos</span><span class="text-xl md:text-2xl font-black text-slate-800 mt-1">${ativos}</span></div>
                <div class="bg-amber-50 p-4 rounded-2xl border border-amber-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Estoque Baixo</span><span class="text-xl md:text-2xl font-black text-amber-700 mt-1">${baixoEstoque.length}</span></div>
                <div class="bg-red-50 p-4 rounded-2xl border border-red-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-red-600 uppercase tracking-widest">Esgotados</span><span class="text-xl md:text-2xl font-black text-red-700 mt-1">${esgotados.length}</span></div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div class="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                        <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider"><i class="bi bi-pie-chart-fill text-indigo-500 mr-2"></i> Saúde Geral</h3>
                    </div>
                    <div class="relative h-64 w-full flex justify-center"><canvas id="chartEstoque"></canvas></div>
                </div>

                <div class="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 class="text-sm font-black text-red-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3"><i class="bi bi-exclamation-triangle-fill mr-2"></i> Reposição Crítica Necessária</h3>
                    <div class="flex-1 overflow-y-auto custom-scrollbar pr-3">
                        <table class="w-full text-left text-xs">
                            <thead class="text-slate-400 border-b border-slate-100">
                                <tr>
                                    <th class="pb-2 font-bold uppercase tracking-wider text-[10px]">Produto</th>
                                    <th class="pb-2 font-bold uppercase tracking-wider text-center text-[10px]">Mínimo</th>
                                    <th class="pb-2 font-bold uppercase tracking-wider text-center text-[10px]">Atual</th>
                                    <th class="pb-2 font-bold uppercase tracking-wider text-right text-[10px]">Status</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-50">
                                ${[...esgotados, ...baixoEstoque].map(p => `
                                    <tr class="hover:bg-slate-50 transition-colors">
                                        <td class="py-3 font-bold text-slate-700 text-xs">${p.name}</td>
                                        <td class="py-3 text-center text-slate-500 font-bold text-xs">${p.minStock || 0}</td>
                                        <td class="py-3 text-center font-black text-xs ${p.currentStock <= 0 ? 'text-red-500' : 'text-amber-500'}">${p.currentStock || 0}</td>
                                        <td class="py-3 text-right">
                                            <span class="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${p.currentStock <= 0 ? 'bg-red-100 text-red-600 border border-red-200' : 'bg-amber-100 text-amber-600 border border-amber-200'}">
                                                ${p.currentStock <= 0 ? 'Esgotado' : 'Comprar'}
                                            </span>
                                        </td>
                                    </tr>
                                `).join('') || '<tr><td colspan="4" class="text-center py-10 font-bold text-xs text-slate-400">Todo o estoque está em níveis saudáveis. Nenhuma ação necessária.</td></tr>'}
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
                data: { labels: ['Saudável', 'Baixo', 'Esgotado'], datasets: [{ data: [Math.max(0, saudavel), baixoEstoque.length, esgotados.length], backgroundColor: ['#10b981', '#f59e0b', '#ef4444'], borderWidth: 0, hoverOffset: 4 }] },
                options: { responsive: true, maintainAspectRatio: false, cutout: '75%', plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8, font:{size: 11, family: 'Inter', weight: 'bold'} } }, tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.9)', titleFont: { size: 13, family: 'Inter' }, bodyFont: { size: 12, family: 'Inter' }, padding: 12, cornerRadius: 8 } } }
            });
        }
    }, 100);
}

// ============================================================================
// ⚙️ EVENTOS E EXPORTAÇÃO
// ============================================================================

function setupEventListeners() {
    // 1. Escutar alterações no Header Global Multi-Empresa
    const globalApplyBtn = document.getElementById('multi-context-apply');
    if (globalApplyBtn) {
        globalApplyBtn.removeEventListener('click', fetchTabData); 
        globalApplyBtn.addEventListener('click', () => {
            setTimeout(fetchTabData, 100);
        });
    }

    if (pageEventListener) contentDiv.removeEventListener('click', pageEventListener);

    pageEventListener = (e) => {
        const target = e.target;

        // Limpar todos os filtros da Agenda
        const clearFiltersBtn = target.closest('#btn-clear-agenda-filters');
        if (clearFiltersBtn) {
            localState.agendaFilters = { status: null, professional: null, service: null };
            localState.drillDownMonth = null;
            renderAgendaTab();
            return;
        }

        // Clicar nos cartões superiores da Agenda (Drill down de Status)
        const agendaFilterBtn = target.closest('[data-agenda-filter]');
        if (agendaFilterBtn) {
            const filterVal = agendaFilterBtn.dataset.agendaFilter;
            if (filterVal === 'todos') {
                localState.agendaFilters.status = null;
            } else if (localState.agendaFilters.status === filterVal) {
                localState.agendaFilters.status = null; // Toggle off se clicar de novo
            } else {
                localState.agendaFilters.status = filterVal;
            }
            renderAgendaTab();
            return;
        }

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

        const actionBtn = target.closest('button[data-action]');
        if (actionBtn) {
            const action = actionBtn.dataset.action;

            if (action === 'apply-filters') {
                localState.startDate = document.getElementById('report-start').value;
                localState.endDate = document.getElementById('report-end').value;
                localState.drillDownMonth = null;
                localState.agendaFilters = { status: null, professional: null, service: null };
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
                localState.agendaFilters = { status: null, professional: null, service: null };
                fetchTabData();
            }
            else if (action === 'export-excel') {
                handleExportExcel();
            }
        }
    };

    contentDiv.addEventListener('click', pageEventListener);
}

function handleExportExcel() {
    if (typeof XLSX === 'undefined') {
        showNotification('Erro', 'A biblioteca XLSX não está disponível.', 'error');
        return;
    }

    const { currentTab, data, startDate, endDate } = localState;
    let exportData = [];
    let fileName = `Kairos_Relatorio_${currentTab.toUpperCase()}_${startDate}_a_${endDate}.xlsx`;

    if (currentTab === 'financeiro') {
        if (!data.financeiro || (!data.financeiro.payables.length && !data.financeiro.receivables.length)) return showNotification('Aviso', 'Sem dados financeiros para exportar.', 'info');
        const natureMap = new Map(data.financeiro.natures.map(n => [n.id, n.name]));
        const allTransactions = [
            ...data.financeiro.receivables.filter(r => r.status === 'paid').map(r => ({...r, tipo: 'Receita'})),
            ...data.financeiro.payables.filter(p => p.status === 'paid').map(p => ({...p, tipo: 'Despesa'}))
        ];
        exportData = allTransactions.map(t => ({
            "Data Pagamento": t.paymentDate ? formatDateDisplay(t.paymentDate) : '-', "Tipo": t.tipo, "Descrição": t.description || '-', "Natureza (DRE)": t.naturezaId ? (natureMap.get(t.naturezaId) || 'Outros') : 'Geral', "Valor (R$)": t.amount || 0
        }));
    } 
    else if (currentTab === 'agenda') {
        if (!data.agenda || data.agenda.length === 0) return showNotification('Aviso', 'Sem dados de agenda.', 'info');
        exportData = data.agenda.map(a => ({
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