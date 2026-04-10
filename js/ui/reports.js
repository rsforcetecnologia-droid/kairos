// js/ui/reports.js

import * as financialApi from '../api/financial.js';
import * as appointmentsApi from '../api/appointments.js';
import * as clientsApi from '../api/clients.js';
import * as salesApi from '../api/sales.js';
import * as productsApi from '../api/products.js';
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
    drillDownMonth: null, // Usado na Agenda e Clientes
    
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

function destroyChart(chartKey) {
    if (localState.charts[chartKey]) {
        localState.charts[chartKey].destroy();
        localState.charts[chartKey] = null;
    }
}

// ============================================================================
// 🚀 INICIALIZAÇÃO E LAYOUT PRINCIPAL
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
        <label class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border ${localState.filterEstablishmentIds.has(est.id) ? 'border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700' : 'border-slate-200 text-slate-600'} rounded-lg cursor-pointer hover:bg-slate-50 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3 h-3" value="${est.id}" ${localState.filterEstablishmentIds.has(est.id) ? 'checked' : ''}>
            <span class="text-[10px] font-bold whitespace-nowrap">${est.type === 'Matriz' ? '<i class="bi bi-building mr-1"></i>' : '<i class="bi bi-shop mr-1"></i>'} ${est.name}</span>
        </label>
    `).join('');

    contentDiv.innerHTML = `
        <section class="h-full flex flex-col p-3 md:p-6 w-full bg-slate-50 relative overflow-hidden">
            
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-4 z-20 relative">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-200">
                            <i class="bi bi-bar-chart-fill text-xl"></i>
                        </div>
                        <div>
                            <h1 class="text-lg font-black text-slate-800 tracking-tight">Relatórios & BI</h1>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Painel Gerencial</p>
                        </div>
                    </div>

                    <div class="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
                        <div class="hidden md:flex bg-slate-100 p-1 rounded-lg">
                            <button data-action="preset-date" data-preset="month" class="px-3 py-1.5 text-[10px] font-bold uppercase rounded-md transition-colors bg-white text-indigo-600 shadow-sm border border-slate-200">Este Mês</button>
                            <button data-action="preset-date" data-preset="last_month" class="px-3 py-1.5 text-[10px] font-bold uppercase rounded-md transition-colors text-slate-500 hover:text-slate-700">Mês Passado</button>
                            <button data-action="preset-date" data-preset="year" class="px-3 py-1.5 text-[10px] font-bold uppercase rounded-md transition-colors text-slate-500 hover:text-slate-700">Este Ano</button>
                        </div>

                        <div class="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2 py-1 shadow-inner w-full md:w-auto">
                            <input type="date" id="report-start" value="${localState.startDate}" class="p-1.5 bg-transparent text-xs font-semibold text-slate-700 outline-none w-full md:w-auto">
                            <span class="text-slate-400 text-xs font-bold">até</span>
                            <input type="date" id="report-end" value="${localState.endDate}" class="p-1.5 bg-transparent text-xs font-semibold text-slate-700 outline-none w-full md:w-auto">
                        </div>

                        <button data-action="apply-filters" class="w-full md:w-auto py-2 px-5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-md flex items-center justify-center gap-2 text-xs">
                            Atualizar
                        </button>
                    </div>
                </div>

                ${localState.establishments.length > 1 ? `
                <div class="mt-4 pt-3 border-t border-slate-100">
                    <div class="flex flex-wrap gap-2" id="establishment-filters-container">
                        ${estCheckboxes}
                    </div>
                </div>
                ` : ''}
            </div>

            <div class="flex overflow-x-auto custom-scrollbar gap-2 mb-4 pb-1 z-10">
                <button data-tab="financeiro" class="tab-btn ${localState.currentTab === 'financeiro' ? 'active bg-indigo-50 text-indigo-700 border-indigo-200 shadow-sm' : 'bg-white text-slate-500 border-slate-200'} px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-2">
                    <i class="bi bi-currency-dollar text-base"></i> Financeiro
                </button>
                <button data-tab="agenda" class="tab-btn ${localState.currentTab === 'agenda' ? 'active bg-indigo-50 text-indigo-700 border-indigo-200 shadow-sm' : 'bg-white text-slate-500 border-slate-200'} px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-2">
                    <i class="bi bi-calendar3 text-base"></i> Agenda
                </button>
                <button data-tab="clientes" class="tab-btn ${localState.currentTab === 'clientes' ? 'active bg-indigo-50 text-indigo-700 border-indigo-200 shadow-sm' : 'bg-white text-slate-500 border-slate-200'} px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-2">
                    <i class="bi bi-people text-base"></i> Clientes
                </button>
                <button data-tab="vendas" class="tab-btn ${localState.currentTab === 'vendas' ? 'active bg-indigo-50 text-indigo-700 border-indigo-200 shadow-sm' : 'bg-white text-slate-500 border-slate-200'} px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-2">
                    <i class="bi bi-receipt text-base"></i> Vendas / PDV
                </button>
                <button data-tab="estoque" class="tab-btn ${localState.currentTab === 'estoque' ? 'active bg-indigo-50 text-indigo-700 border-indigo-200 shadow-sm' : 'bg-white text-slate-500 border-slate-200'} px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-2">
                    <i class="bi bi-box-seam text-base"></i> Estoque
                </button>
                
                <div class="ml-auto pl-2 border-l border-slate-200 flex items-center">
                    <button data-action="export-excel" class="px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold rounded-xl hover:bg-emerald-100 transition shadow-sm flex items-center gap-2 text-xs">
                        <i class="bi bi-file-earmark-excel-fill"></i> Exportar
                    </button>
                </div>
            </div>

            <div id="tab-content" class="flex-1 overflow-y-auto custom-scrollbar rounded-xl pb-20 md:pb-0"></div>
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
            // Clientes são transversais ou por unidade, dependendo da regra de negócio.
            // Para efeitos de BI, vamos buscar clientes da raiz ou das unidades selecionadas.
            const clientsResults = await Promise.all(estIds.map(id => clientsApi.getClients(id).catch(() => [])));
            
            // Remove duplicados pelo ID do cliente
            const uniqueClientsMap = new Map();
            clientsResults.flat().forEach(c => uniqueClientsMap.set(c.id, c));
            localState.data.clientes = Array.from(uniqueClientsMap.values());
            
            renderClientesTab();
        }
        else if (currentTab === 'vendas') {
            // Busca vendas no período
            const salesResults = await Promise.all(estIds.map(id => salesApi.getSalesHistory({ startDate, endDate, establishmentId: id }).catch(() => [])));
            localState.data.vendas = salesResults.flat();
            renderVendasTab();
        }
        else if (currentTab === 'estoque') {
            // Busca produtos para análise de estoque
            const productsResults = await Promise.all(estIds.map(id => productsApi.getProducts(id).catch(() => [])));
            localState.data.estoque = productsResults.flat();
            renderEstoqueTab();
        }
    } catch (error) {
        container.innerHTML = `<div class="p-10 text-center text-red-500 bg-red-50 rounded-xl border border-red-100"><i class="bi bi-exclamation-triangle text-3xl mb-2"></i><br>Erro ao carregar dados: ${error.message}</div>`;
    }
}

// ============================================================================
// 💰 ABA FINANCEIRO
// ============================================================================

function renderFinanceiroTab() {
    const container = document.getElementById('tab-content');
    const { payables, receivables, natures } = localState.data.financeiro;

    const paidRec = receivables.filter(r => r.status === 'paid');
    const paidPay = payables.filter(p => p.status === 'paid');

    const totalIn = paidRec.reduce((s, i) => s + i.amount, 0);
    const totalOut = paidPay.reduce((s, i) => s + i.amount, 0);
    const saldo = totalIn - totalOut;
    const margem = totalIn > 0 ? (saldo / totalIn) * 100 : 0;

    const flowMap = {};
    [...paidRec, ...paidPay].forEach(item => {
        const date = item.paymentDate || item.dueDate;
        if (!date) return;
        if (!flowMap[date]) flowMap[date] = { in: 0, out: 0 };
        if (item.status === 'paid' && paidRec.includes(item)) flowMap[date].in += item.amount;
        if (item.status === 'paid' && paidPay.includes(item)) flowMap[date].out += item.amount;
    });

    const sortedDates = Object.keys(flowMap).sort();
    const chartLabels = sortedDates.map(d => formatDateDisplay(d).substring(0, 5)); 
    const chartIn = sortedDates.map(d => flowMap[d].in);
    const chartOut = sortedDates.map(d => flowMap[d].out);

    const natMap = new Map(natures.map(n => [n.id, n.name]));
    const dreIn = {}; paidRec.forEach(r => { const n = r.naturezaId ? (natMap.get(r.naturezaId) || 'Outros') : 'Sem Cat.'; dreIn[n] = (dreIn[n] || 0) + r.amount; });
    const dreOut = {}; paidPay.forEach(p => { const n = p.naturezaId ? (natMap.get(p.naturezaId) || 'Outros') : 'Sem Cat.'; dreOut[n] = (dreOut[n] || 0) + p.amount; });

    container.innerHTML = `
        <div class="space-y-4 animate-fade-in pb-10">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-arrow-up-circle text-emerald-500 mr-1"></i> Receitas</span><span class="text-xl md:text-2xl font-black text-slate-800 mt-1">${formatCurrency(totalIn)}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-arrow-down-circle text-red-500 mr-1"></i> Despesas</span><span class="text-xl md:text-2xl font-black text-slate-800 mt-1">${formatCurrency(totalOut)}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-wallet2 text-indigo-500 mr-1"></i> Saldo</span><span class="text-xl md:text-2xl font-black ${saldo >= 0 ? 'text-emerald-600' : 'text-red-600'} mt-1">${formatCurrency(saldo)}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-pie-chart text-amber-500 mr-1"></i> Margem</span><span class="text-xl md:text-2xl font-black ${margem >= 0 ? 'text-indigo-600' : 'text-red-600'} mt-1">${margem.toFixed(1)}%</span></div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div class="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 class="text-sm font-bold text-slate-800 mb-4"><i class="bi bi-bar-chart text-indigo-500 mr-1"></i> Fluxo de Caixa (Realizado)</h3>
                    <div class="relative h-64 w-full"><canvas id="chartFin"></canvas></div>
                </div>
                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 class="text-sm font-bold text-slate-800 mb-4"><i class="bi bi-card-list text-indigo-500 mr-1"></i> DRE Gerencial</h3>
                    <div class="flex-1 overflow-y-auto custom-scrollbar pr-2">
                        <div class="mb-4"><p class="text-[10px] font-bold text-emerald-600 uppercase border-b border-emerald-100 pb-1 mb-2">Receitas</p>
                        ${Object.entries(dreIn).sort((a,b)=>b[1]-a[1]).map(([k, v]) => `<div class="flex justify-between items-center mb-1.5"><span class="text-xs text-slate-600 truncate mr-2">${k}</span><span class="text-xs font-bold text-slate-800">${formatCurrency(v)}</span></div>`).join('') || '<p class="text-[10px] text-slate-400">Sem dados.</p>'}</div>
                        <div class="mb-4"><p class="text-[10px] font-bold text-red-500 uppercase border-b border-red-100 pb-1 mb-2">Despesas</p>
                        ${Object.entries(dreOut).sort((a,b)=>b[1]-a[1]).map(([k, v]) => `<div class="flex justify-between items-center mb-1.5"><span class="text-xs text-slate-600 truncate mr-2">${k}</span><span class="text-xs font-bold text-slate-800">${formatCurrency(v)}</span></div>`).join('') || '<p class="text-[10px] text-slate-400">Sem dados.</p>'}</div>
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
                data: { labels: chartLabels.length ? chartLabels : ['-'], datasets: [{ label: 'Receitas', data: chartIn, backgroundColor: '#10b981', borderRadius: 4 }, { label: 'Despesas', data: chartOut, backgroundColor: '#ef4444', borderRadius: 4 }] },
                options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, grid: { borderDash: [2, 4], color: '#f1f5f9' } }, x: { grid: { display: false } } } }
            });
        }
    }, 100);
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
    const receitaTotal = active.filter(a => a.status === 'completed').reduce((s, i) => s + (Number(i.totalAmount) || 0), 0);

    let labels = [];
    let dataPoints = [];
    
    if (localState.drillDownMonth !== null) {
        const anoAtual = new Date(localState.startDate).getFullYear();
        const daysInMonth = new Date(anoAtual, localState.drillDownMonth + 1, 0).getDate();
        labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);
        dataPoints = labels.map(day => active.filter(a => { const d = new Date(a.startTime); return d.getMonth() === localState.drillDownMonth && d.getDate() === parseInt(day); }).length);
    } else {
        labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        dataPoints = labels.map((_, idx) => active.filter(a => new Date(a.startTime).getMonth() === idx).length);
    }

    container.innerHTML = `
        <div class="space-y-4 animate-fade-in pb-10">
            <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div class="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Total Agendas</span><span class="text-xl md:text-2xl font-black text-slate-800 mt-1">${total}</span></div>
                <div class="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-emerald-500 uppercase tracking-widest block">Concluídas</span><span class="text-xl md:text-2xl font-black text-emerald-600 mt-1">${concluidas}</span></div>
                <div class="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-amber-500 uppercase tracking-widest block">Aguardando</span><span class="text-xl md:text-2xl font-black text-amber-600 mt-1">${aguardando}</span></div>
                <div class="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-red-400 uppercase tracking-widest block">Faltou (No-Show)</span><span class="text-xl md:text-2xl font-black text-red-500 mt-1">${noShow}</span></div>
                <div class="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Canceladas</span><span class="text-xl md:text-2xl font-black text-slate-400 mt-1">${canceladas}</span></div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-indigo-600 p-5 rounded-2xl text-white shadow-md flex items-center justify-between"><div><p class="text-xs font-bold uppercase opacity-80 tracking-widest mb-1">Taxa de Conclusão</p><p class="text-3xl md:text-4xl font-black">${taxaConclusao}%</p></div><i class="bi bi-graph-up-arrow text-4xl opacity-50"></i></div>
                <div class="bg-emerald-600 p-5 rounded-2xl text-white shadow-md flex items-center justify-between"><div><p class="text-xs font-bold uppercase opacity-80 tracking-widest mb-1">Receita em Atendimentos</p><p class="text-3xl md:text-4xl font-black">${formatCurrency(receitaTotal)}</p></div><i class="bi bi-cash-coin text-4xl opacity-50"></i></div>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div class="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                    <h3 class="text-sm font-bold text-slate-800"><i class="bi bi-clock-history text-indigo-500 mr-1"></i> Volume de Agendamentos ${localState.drillDownMonth !== null ? `(${labels.length} dias)` : '(Por Mês)'}</h3>
                    ${localState.drillDownMonth !== null ? `<button id="btn-back-agenda" class="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors shadow-sm"><i class="bi bi-arrow-left mr-1"></i> Voltar</button>` : '<span class="hidden md:inline-block text-[10px] text-slate-400 italic">Dica: Clique num mês para ver por dia.</span>'}
                </div>
                <div class="relative h-72 w-full"><canvas id="chartAgenda"></canvas></div>
            </div>
        </div>`;

    setTimeout(() => {
        const ctx = document.getElementById('chartAgenda');
        if (ctx) {
            destroyChart('agenda');
            localState.charts['agenda'] = new Chart(ctx, {
                type: 'line',
                data: { labels: labels, datasets: [{ label: 'Ativos', data: dataPoints, borderColor: '#4f46e5', backgroundColor: 'rgba(79, 70, 229, 0.1)', fill: true, tension: 0.4, pointRadius: 5, borderWidth: 2 }] },
                options: { responsive: true, maintainAspectRatio: false, onClick: (e, elements) => { if (elements.length > 0 && localState.drillDownMonth === null) { localState.drillDownMonth = elements[0].index; renderAgendaTab(); } }, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: '#f1f5f9', borderDash: [2, 4] }, ticks: { stepSize: 1 } }, x: { grid: { display: false } } } }
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
    
    const startObj = new Date(localState.startDate);
    const endObj = new Date(localState.endDate);
    
    // Filtros
    const totalBase = clients.length;
    const novosNoPeriodo = clients.filter(c => {
        if (!c.createdAt) return false;
        const cDate = new Date(c.createdAt);
        return cDate >= startObj && cDate <= endObj;
    });
    
    // Mock de clientes ausentes (> 60 dias sem interagir/sem data recente)
    const ausentes = clients.filter(c => {
        if (!c.createdAt && !c.lastVisit) return true;
        const lastDate = c.lastVisit ? new Date(c.lastVisit) : new Date(c.createdAt);
        const diffDays = (new Date() - lastDate) / (1000 * 60 * 60 * 24);
        return diffDays > 60;
    });

    const taxaCrescimento = totalBase > 0 ? ((novosNoPeriodo.length / totalBase) * 100).toFixed(1) : 0;

    // Gráfico de Novos Clientes
    let labels = [];
    let dataPoints = [];
    if (localState.drillDownMonth !== null) {
        const anoAtual = new Date(localState.startDate).getFullYear();
        const daysInMonth = new Date(anoAtual, localState.drillDownMonth + 1, 0).getDate();
        labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);
        dataPoints = labels.map(day => novosNoPeriodo.filter(c => { const d = new Date(c.createdAt); return d.getMonth() === localState.drillDownMonth && d.getDate() === parseInt(day); }).length);
    } else {
        labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        dataPoints = labels.map((_, idx) => novosNoPeriodo.filter(c => new Date(c.createdAt).getMonth() === idx).length);
    }

    container.innerHTML = `
        <div class="space-y-4 animate-fade-in pb-10">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-people-fill text-indigo-500 mr-1"></i> Base Total</span><span class="text-xl md:text-2xl font-black text-slate-800 mt-1">${totalBase}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-emerald-500 uppercase tracking-widest"><i class="bi bi-person-plus-fill mr-1"></i> Cadastros (Período)</span><span class="text-xl md:text-2xl font-black text-emerald-600 mt-1">${novosNoPeriodo.length}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-amber-500 uppercase tracking-widest"><i class="bi bi-person-dash-fill mr-1"></i> Ausentes (>60 dias)</span><span class="text-xl md:text-2xl font-black text-amber-600 mt-1">${ausentes.length}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-blue-500 uppercase tracking-widest"><i class="bi bi-graph-up-arrow mr-1"></i> Taxa Crescimento</span><span class="text-xl md:text-2xl font-black text-blue-600 mt-1">+${taxaCrescimento}%</span></div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div class="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-sm font-bold text-slate-800"><i class="bi bi-person-lines-fill text-indigo-500 mr-1"></i> Aquisição de Clientes ${localState.drillDownMonth !== null ? '(Diário)' : '(Mensal)'}</h3>
                        ${localState.drillDownMonth !== null ? `<button id="btn-back-clientes" class="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-50 px-3 py-1 rounded">Voltar</button>` : ''}
                    </div>
                    <div class="relative h-64 w-full"><canvas id="chartClientes"></canvas></div>
                </div>

                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 class="text-sm font-bold text-slate-800 mb-4"><i class="bi bi-star-fill text-amber-400 mr-1"></i> Últimos Cadastros</h3>
                    <div class="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
                        ${novosNoPeriodo.slice(0, 10).reverse().map(c => `
                            <div class="flex items-center justify-between border-b border-slate-50 pb-2">
                                <div>
                                    <p class="text-xs font-bold text-slate-700 truncate max-w-[150px]">${c.name}</p>
                                    <p class="text-[9px] text-slate-400">${c.phone || 'Sem contato'}</p>
                                </div>
                                <span class="text-[9px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded font-bold uppercase">Novo</span>
                            </div>
                        `).join('') || '<p class="text-xs text-slate-400">Nenhum cliente novo neste período.</p>'}
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
                data: { labels: labels, datasets: [{ label: 'Novos Cadastros', data: dataPoints, backgroundColor: '#3b82f6', borderRadius: 4 }] },
                options: { responsive: true, maintainAspectRatio: false, onClick: (e, elements) => { if (elements.length > 0 && localState.drillDownMonth === null) { localState.drillDownMonth = elements[0].index; renderClientesTab(); } }, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } }, x: { grid: { display: false } } } }
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
    
    // Contagem de itens
    let totalItens = 0;
    const itemRanking = {};
    
    vendasConcluidas.forEach(venda => {
        (venda.items || []).forEach(item => {
            const qtd = Number(item.quantity) || 1;
            totalItens += qtd;
            const nome = item.name || 'Produto/Serviço Indefinido';
            itemRanking[nome] = (itemRanking[nome] || 0) + qtd;
        });
    });

    const topItens = Object.entries(itemRanking).sort((a,b) => b[1] - a[1]).slice(0, 5);

    container.innerHTML = `
        <div class="space-y-4 animate-fade-in pb-10">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div class="bg-indigo-600 text-white p-4 rounded-2xl shadow-sm flex flex-col"><span class="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">Faturamento PDV</span><span class="text-xl md:text-2xl font-black mt-1">${formatCurrency(faturamentoBruto)}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ticket Médio</span><span class="text-xl md:text-2xl font-black text-slate-800 mt-1">${formatCurrency(ticketMedio)}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total de Vendas (Recibos)</span><span class="text-xl md:text-2xl font-black text-slate-800 mt-1">${qtdVendas}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Volume de Itens</span><span class="text-xl md:text-2xl font-black text-slate-800 mt-1">${totalItens}</span></div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 class="text-sm font-bold text-slate-800 mb-4"><i class="bi bi-trophy-fill text-amber-500 mr-1"></i> Top 5 Mais Vendidos (Curva A)</h3>
                    <div class="relative h-64 w-full"><canvas id="chartVendas"></canvas></div>
                </div>

                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 class="text-sm font-bold text-slate-800 mb-4"><i class="bi bi-receipt-cutoff text-indigo-500 mr-1"></i> Últimas Vendas Fechadas</h3>
                    <div class="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-2">
                        ${vendasConcluidas.slice(0, 8).map(v => `
                            <div class="flex items-center justify-between border border-slate-100 bg-slate-50 p-2.5 rounded-xl">
                                <div>
                                    <p class="text-xs font-bold text-slate-700">Recibo #${(v.id || '').substring(0,5).toUpperCase()}</p>
                                    <p class="text-[9px] text-slate-400">${formatDateDisplay(v.createdAt || v.date || '')}</p>
                                </div>
                                <div class="text-right">
                                    <p class="text-xs font-black text-emerald-600">${formatCurrency(v.totalAmount)}</p>
                                    <p class="text-[9px] text-slate-400">${(v.items || []).length} itens</p>
                                </div>
                            </div>
                        `).join('') || '<p class="text-xs text-slate-400">Nenhuma venda concluída no período.</p>'}
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
                data: { labels: topItens.map(i => i[0].substring(0,15)+'...'), datasets: [{ label: 'Quantidade Vendida', data: topItens.map(i => i[1]), backgroundColor: '#f59e0b', borderRadius: 4 }] },
                options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true, ticks: { stepSize: 1 } }, y: { grid: { display: false } } } }
            });
        } else if (ctx) {
            ctx.parentElement.innerHTML = '<div class="flex h-full items-center justify-center text-xs text-slate-400">Sem dados suficientes para o gráfico</div>';
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
        const custo = Number(p.costPrice) || Number(p.price) || 0; // Tenta custo, se não existir usa preço venda
        
        if (qtd > 0) totalImobilizado += (qtd * custo);
        if (qtd <= 0) esgotados.push(p);
        else if (qtd <= min) baixoEstoque.push(p);
    });

    container.innerHTML = `
        <div class="space-y-4 animate-fade-in pb-10">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div class="bg-indigo-600 text-white p-4 rounded-2xl shadow-sm flex flex-col"><span class="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">Capital Imobilizado</span><span class="text-xl md:text-2xl font-black mt-1">${formatCurrency(totalImobilizado)}</span></div>
                <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Produtos Ativos</span><span class="text-xl md:text-2xl font-black text-slate-800 mt-1">${ativos}</span></div>
                <div class="bg-amber-50 p-4 rounded-2xl border border-amber-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Estoque Baixo</span><span class="text-xl md:text-2xl font-black text-amber-600 mt-1">${baixoEstoque.length}</span></div>
                <div class="bg-red-50 p-4 rounded-2xl border border-red-200 shadow-sm flex flex-col"><span class="text-[10px] font-bold text-red-600 uppercase tracking-widest">Esgotados</span><span class="text-xl md:text-2xl font-black text-red-600 mt-1">${esgotados.length}</span></div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 class="text-sm font-bold text-slate-800 mb-4"><i class="bi bi-pie-chart-fill text-indigo-500 mr-1"></i> Saúde do Estoque</h3>
                    <div class="relative h-56 w-full flex justify-center"><canvas id="chartEstoque"></canvas></div>
                </div>

                <div class="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 class="text-sm font-bold text-red-500 mb-4"><i class="bi bi-exclamation-triangle-fill mr-1"></i> Alertas de Reposição Crítica</h3>
                    <div class="flex-1 overflow-y-auto custom-scrollbar pr-2">
                        <table class="w-full text-left text-xs">
                            <thead class="text-slate-400 border-b border-slate-100">
                                <tr>
                                    <th class="pb-2 font-bold uppercase tracking-wider">Produto</th>
                                    <th class="pb-2 font-bold uppercase tracking-wider text-center">Mínimo Ideal</th>
                                    <th class="pb-2 font-bold uppercase tracking-wider text-center">Atual</th>
                                    <th class="pb-2 font-bold uppercase tracking-wider text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-50">
                                ${[...esgotados, ...baixoEstoque].map(p => `
                                    <tr class="hover:bg-slate-50 transition-colors">
                                        <td class="py-2.5 font-bold text-slate-700">${p.name}</td>
                                        <td class="py-2.5 text-center text-slate-500">${p.minStock || 0}</td>
                                        <td class="py-2.5 text-center font-black ${p.currentStock <= 0 ? 'text-red-500' : 'text-amber-500'}">${p.currentStock || 0}</td>
                                        <td class="py-2.5 text-right">
                                            <span class="text-[9px] font-bold uppercase px-2 py-0.5 rounded ${p.currentStock <= 0 ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}">
                                                ${p.currentStock <= 0 ? 'Esgotado' : 'Comprar'}
                                            </span>
                                        </td>
                                    </tr>
                                `).join('') || '<tr><td colspan="4" class="text-center py-6 text-slate-400">Estoque saudável. Nenhum alerta.</td></tr>'}
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
                options: { responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8 } } } }
            });
        }
    }, 100);
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
                btn.classList.remove('active', 'border-indigo-200', 'bg-indigo-50', 'text-indigo-700', 'shadow-sm');
                btn.classList.add('border-slate-200', 'bg-white', 'text-slate-500');
            });
            tabBtn.classList.remove('border-slate-200', 'bg-white', 'text-slate-500');
            tabBtn.classList.add('active', 'border-indigo-200', 'bg-indigo-50', 'text-indigo-700', 'shadow-sm');
            
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
                label.classList.add('border-indigo-500', 'ring-1', 'ring-indigo-500', 'bg-indigo-50/20', 'text-indigo-700');
                label.classList.remove('border-slate-200', 'text-slate-600');
            } else {
                localState.filterEstablishmentIds.delete(e.target.value);
                label.classList.remove('border-indigo-500', 'ring-1', 'ring-indigo-500', 'bg-indigo-50/20', 'text-indigo-700');
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