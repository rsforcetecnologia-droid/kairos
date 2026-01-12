// js/ui/reports.js

// --- 1. IMPORTAÇÕES ---
import * as reportsApi from '../api/reports.js';
import * as professionalsApi from '../api/professionals.js';
import * as appointmentsApi from '../api/appointments.js';
import * as financialApi from '../api/financial.js';
import { state } from '../state.js';
import { escapeHTML } from '../utils.js';

const contentDiv = document.getElementById('content');
let chartsInstances = {}; // Cache dos gráficos

// Paleta de Cores Modernas
const chartColors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

// --- 2. ESTADO LOCAL ---
const localState = {
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0], 
    endDate: new Date().toISOString().split('T')[0], 
    selectedProfessional: 'all',
    selectedCostCenter: 'all',
    
    professionalsList: [],
    costCentersList: [],

    data: null,            
    appointmentsData: [],  
    cashFlowData: null,    

    currentTab: 'dashboards',
    isFilterOpen: false // Novo estado para controle mobile
};

// --- 3. CARREGAMENTO DE RECURSOS ---
async function loadChartJs() {
    if (window.Chart) return;
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// --- 4. PONTO DE ENTRADA (INIT) ---
export async function loadReportsPage() {
    contentDiv.innerHTML = `
        <div class="flex flex-col items-center justify-center h-[calc(100vh-100px)]">
            <div class="loader mb-4 border-t-indigo-600"></div>
            <p class="text-gray-500 font-medium animate-pulse">Carregando inteligência...</p>
        </div>`;
    
    try {
        await loadChartJs();
        
        const [profs, costs] = await Promise.all([
            professionalsApi.getProfessionals(state.establishmentId),
            reportsApi.getCostCenters(state.establishmentId).catch(() => []) 
        ]);
        
        localState.professionalsList = profs || [];
        localState.costCentersList = costs || [];

        renderLayout();
        await fetchAndRenderData();
    } catch (e) {
        console.error("Erro no loadReportsPage:", e);
        contentDiv.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-red-500 p-6 text-center">
                <div class="bg-red-50 p-4 rounded-full mb-4"><svg class="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                <h3 class="text-lg font-bold text-gray-800">Ops! Algo deu errado.</h3>
                <p class="text-sm text-gray-600 mt-2">${escapeHTML(e.message)}</p>
                <button onclick="window.location.reload()" class="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-transform active:scale-95">Tentar Novamente</button>
            </div>`;
    }
}

// --- 5. RENDERIZAÇÃO E LAYOUT (MOBILE OPTIMIZED) ---
function renderLayout() {
    const profOptions = localState.professionalsList.map(p => `<option value="${p.id}">${escapeHTML(p.name)}</option>`).join('');
    const costOptions = localState.costCentersList.map(c => `<option value="${c.id}">${escapeHTML(c.name)}</option>`).join('');

    contentDiv.innerHTML = `
        <div class="flex flex-col min-h-screen bg-gray-50 pb-24 relative w-full overflow-x-hidden">
            
            <div class="sticky top-0 z-30 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300">
                <div class="max-w-7xl mx-auto px-3 md:px-4 py-3">
                    <div class="flex justify-between items-center">
                        <div class="overflow-hidden mr-2">
                            <h1 class="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2 truncate">
                                <svg class="w-5 h-5 md:w-6 md:h-6 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                Relatórios
                            </h1>
                            <p class="text-[10px] md:text-xs text-gray-500 mt-0.5 truncate" id="date-range-display">
                                ${formatDateShort(localState.startDate)} até ${formatDateShort(localState.endDate)}
                            </p>
                        </div>
                        <button id="toggle-filters-btn" class="p-2 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors relative flex-shrink-0">
                            <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                        </button>
                    </div>
                </div>

                <div id="filters-container" class="hidden border-t border-gray-100 bg-gray-50/50 overflow-hidden transition-all duration-300">
                    <div class="p-4 grid grid-cols-1 md:grid-cols-4 gap-3 max-w-7xl mx-auto">
                        <div class="space-y-1">
                            <label class="text-xs font-semibold text-gray-500 ml-1">Início</label>
                            <input type="date" id="report-start" value="${localState.startDate}" class="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm">
                        </div>
                        <div class="space-y-1">
                            <label class="text-xs font-semibold text-gray-500 ml-1">Fim</label>
                            <input type="date" id="report-end" value="${localState.endDate}" class="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm">
                        </div>
                        <div class="space-y-1">
                            <label class="text-xs font-semibold text-gray-500 ml-1">Profissional</label>
                            <select id="report-prof" class="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm">
                                <option value="all">Todos Profissionais</option>
                                ${profOptions}
                            </select>
                        </div>
                        <div class="space-y-1">
                            <label class="text-xs font-semibold text-gray-500 ml-1">Centro de Custo</label>
                            <select id="report-cost" class="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm">
                                <option value="all">Todos Centros</option>
                                ${costOptions}
                            </select>
                        </div>
                        <button id="btn-apply-filters" class="md:col-span-4 mt-2 w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md active:scale-95 transition-transform flex justify-center items-center gap-2">
                            Aplicar Filtros
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                        </button>
                    </div>
                </div>

                <div class="overflow-x-auto no-scrollbar border-t border-gray-100 bg-white w-full">
                    <div class="flex px-3 md:px-4 py-2 gap-2 min-w-max max-w-7xl mx-auto">
                        <button data-tab="dashboards" class="tab-btn flex-1 py-2 px-4 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap border">Financeiro</button>
                        <button data-tab="appointments" class="tab-btn flex-1 py-2 px-4 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap border">Agendamentos</button>
                        <button data-tab="dre" class="tab-btn flex-1 py-2 px-4 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap border">DRE Contábil</button>
                    </div>
                </div>
            </div>

            <main id="report-content" class="flex-1 max-w-7xl w-full mx-auto px-3 md:px-4 py-4 space-y-4 animate-fade-in"></main>
        </div>
    `;

    // Event Listeners
    document.getElementById('toggle-filters-btn').onclick = toggleFilters;
    document.getElementById('btn-apply-filters').onclick = () => {
        applyFilters();
        toggleFilters(); // Fecha ao aplicar
    };

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => {
            localState.currentTab = btn.dataset.tab;
            updateTabsUI();
            renderCurrentView();
            // Scroll suave para o topo
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    });
    
    updateTabsUI(); 
}

function toggleFilters() {
    const container = document.getElementById('filters-container');
    const btn = document.getElementById('toggle-filters-btn');
    localState.isFilterOpen = !localState.isFilterOpen;
    
    if (localState.isFilterOpen) {
        container.classList.remove('hidden');
        btn.classList.add('bg-indigo-100', 'text-indigo-800');
    } else {
        container.classList.add('hidden');
        btn.classList.remove('bg-indigo-100', 'text-indigo-800');
    }
}

function updateTabsUI() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        const isActive = btn.dataset.tab === localState.currentTab;
        btn.className = isActive 
            ? "tab-btn py-2 px-6 rounded-full text-xs md:text-sm font-bold bg-indigo-600 text-white shadow-md transform scale-105 transition-all whitespace-nowrap border-transparent"
            : "tab-btn py-2 px-6 rounded-full text-xs md:text-sm font-medium text-gray-500 bg-white border-gray-200 hover:bg-gray-50 transition-all whitespace-nowrap";
    });
}

function formatDateShort(dateString) {
    if (!dateString) return '';
    const parts = dateString.split('-');
    return `${parts[2]}/${parts[1]}`;
}

// --- 6. LÓGICA DE DADOS ---
async function applyFilters() {
    localState.startDate = document.getElementById('report-start').value;
    localState.endDate = document.getElementById('report-end').value;
    localState.selectedProfessional = document.getElementById('report-prof').value;
    localState.selectedCostCenter = document.getElementById('report-cost').value;

    // Atualiza label de data no header
    document.getElementById('date-range-display').textContent = 
        `${formatDateShort(localState.startDate)} até ${formatDateShort(localState.endDate)}`;

    await fetchAndRenderData();
}

async function fetchAndRenderData() {
    const container = document.getElementById('report-content');
    container.innerHTML = `<div class="flex justify-center py-20"><div class="loader border-t-indigo-600"></div></div>`;

    try {
        const profIdFilter = localState.selectedProfessional === 'all' ? null : localState.selectedProfessional;
        
        // 1. Financeiro
        const financialPromise = reportsApi.getAdvancedIndicators(
            localState.startDate, 
            localState.endDate, 
            localState.selectedProfessional,
            localState.selectedCostCenter
        );

        // 2. Fluxo de Caixa
        const cashFlowPromise = financialApi.getCashFlowData(
            state.establishmentId, 
            localState.startDate, 
            localState.endDate
        ).catch(() => ({ labels: [], payables: [], receivables: [], expectedBalance: [] }));

        // 3. Agendamentos
        const startISO = new Date(localState.startDate + 'T00:00:00').toISOString();
        const endISO = new Date(localState.endDate + 'T23:59:59').toISOString();
        const appointmentsPromise = appointmentsApi.getAppointmentsByDateRange(
            state.establishmentId, startISO, endISO, profIdFilter
        ).catch(() => []);

        const [data, cashFlow, appointments] = await Promise.all([financialPromise, cashFlowPromise, appointmentsPromise]);
        
        localState.data = data;
        localState.cashFlowData = cashFlow; 
        localState.appointmentsData = Array.isArray(appointments) ? appointments : [];
        
        renderCurrentView();
    } catch (error) {
        console.error(error);
        container.innerHTML = `
            <div class="bg-red-50 border border-red-100 p-6 rounded-2xl text-center mx-4">
                <div class="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <p class="font-bold text-gray-800">Não foi possível carregar</p>
                <p class="text-sm text-gray-500 mt-1">${escapeHTML(error.message || 'Verifique sua conexão.')}</p>
            </div>`;
    }
}

function renderCurrentView() {
    const container = document.getElementById('report-content');
    if (!localState.data) return;
    
    switch(localState.currentTab) {
        case 'dashboards':
            renderFinancialDashboards(container);
            break;
        case 'appointments':
            renderAppointmentsTab(container);
            break;
        case 'dre':
            renderDRE(container);
            break;
    }
}

// --- 7. ABA FINANCEIRO ---
function renderFinancialDashboards(container) {
    const { dreSimple, charts } = localState.data;
    const dre = dreSimple || { grossRevenue: 0, netProfit: 0, variableCosts: 0 }; 

    container.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 animate-slide-up w-full">
            <div class="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                <div class="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <svg class="w-16 h-16 md:w-20 md:h-20 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                </div>
                <div class="flex items-center gap-2 mb-2">
                    <span class="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z" /></svg>
                    </span>
                    <p class="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider">Faturamento</p>
                </div>
                <p class="text-xl md:text-2xl font-black text-gray-800 tracking-tight">R$ ${dre.grossRevenue.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                <div class="mt-3 md:mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                     <div class="h-full bg-blue-500 rounded-full" style="width: 100%"></div>
                </div>
            </div>

            <div class="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                <div class="flex items-center gap-2 mb-2">
                    <span class="p-2 bg-red-50 text-red-600 rounded-lg">
                        <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
                    </span>
                    <p class="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider">Custos</p>
                </div>
                <p class="text-xl md:text-2xl font-black text-red-500 tracking-tight">R$ ${dre.variableCosts.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                <div class="mt-3 md:mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                     <div class="h-full bg-red-500 rounded-full" style="width: ${dre.grossRevenue > 0 ? (dre.variableCosts/dre.grossRevenue)*100 : 0}%"></div>
                </div>
            </div>

            <div class="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                <div class="flex items-center gap-2 mb-2">
                    <span class="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                        <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </span>
                    <p class="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider">Lucro Líquido</p>
                </div>
                <p class="text-xl md:text-2xl font-black text-emerald-600 tracking-tight">R$ ${dre.netProfit.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                 <div class="mt-3 md:mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                     <div class="h-full bg-emerald-500 rounded-full" style="width: ${dre.grossRevenue > 0 ? (dre.netProfit/dre.grossRevenue)*100 : 0}%"></div>
                </div>
            </div>
        </div>

        <div class="bg-white p-4 md:p-5 rounded-3xl shadow-sm border border-gray-100 mt-4 md:mt-6 animate-slide-up delay-100 w-full">
            <div class="mb-4 md:mb-6">
                <h3 class="text-base md:text-lg font-bold text-gray-800">Fluxo de Caixa</h3>
                <p class="text-[10px] md:text-xs text-gray-400">Entradas, saídas e saldo acumulado.</p>
            </div>
            <div class="relative w-full h-64 md:h-96">
                <canvas id="chart-cashflow-modern"></canvas>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6 animate-slide-up delay-200 w-full">
            <div class="bg-white p-4 md:p-5 rounded-3xl shadow-sm border border-gray-100 w-full">
                <h3 class="font-bold text-gray-800 mb-4 text-xs md:text-sm uppercase tracking-wide">Evolução Mensal</h3>
                <div class="relative h-56 md:h-64"><canvas id="chart-monthly"></canvas></div>
            </div>
            <div class="bg-white p-4 md:p-5 rounded-3xl shadow-sm border border-gray-100 w-full">
                <h3 class="font-bold text-gray-800 mb-4 text-xs md:text-sm uppercase tracking-wide">Vendas por Profissional</h3>
                <div class="relative h-56 md:h-64 flex justify-center"><canvas id="chart-profs"></canvas></div>
            </div>
        </div>
    `;

    if (localState.cashFlowData) renderModernCashFlowChart('chart-cashflow-modern', localState.cashFlowData);
    renderChart('chart-monthly', 'bar', 'Receita Mensal', charts.salesMonthly.labels, charts.salesMonthly.data, chartColors[0]);
    renderChart('chart-profs', 'doughnut', 'Total Vendas', charts.professionals.labels, charts.professionals.data, chartColors);
}

// --- 8. ABA AGENDAMENTOS ---
function renderAppointmentsTab(container) {
    const appointments = localState.appointmentsData;
    
    // Cálculos
    const totalCount = appointments.length;
    let completedCount = 0;
    let cancelledCount = 0;
    let totalValue = 0;
    let cancelledValue = 0;

    const dailyMap = {};
    const professionalMap = {};

    let curr = new Date(localState.startDate);
    const end = new Date(localState.endDate);
    while (curr <= end) {
        dailyMap[curr.toISOString().split('T')[0]] = 0;
        curr.setDate(curr.getDate() + 1);
    }

    appointments.forEach(app => {
        const val = parseFloat(app.totalAmount || app.price || 0);
        const status = (app.status || '').toLowerCase();
        let dateStr = app.startTime ? (app.startTime.toDate ? app.startTime.toDate() : new Date(app.startTime)).toISOString().split('T')[0] : '';
        const profName = app.professionalName || 'Sem Profissional';

        if (!professionalMap[profName]) professionalMap[profName] = { name: profName, count: 0, value: 0 };

        if (['cancelled', 'cancelado', 'no-show'].includes(status)) {
            cancelledCount++;
            cancelledValue += val;
        } else {
            if (['completed', 'finalized', 'paid'].includes(status)) completedCount++;
            totalValue += val;
            if (dateStr && dailyMap.hasOwnProperty(dateStr)) dailyMap[dateStr]++;
            professionalMap[profName].count++;
            professionalMap[profName].value += val;
        }
    });

    const dailyLabels = Object.keys(dailyMap).sort();
    const dailyValues = dailyLabels.map(d => dailyMap[d]);
    const byProfessional = Object.values(professionalMap).sort((a,b) => b.value - a.value);

    container.innerHTML = `
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 animate-slide-up w-full">
            <div class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 col-span-2 md:col-span-1">
                <p class="text-[10px] text-gray-500 font-bold uppercase">Agendamentos</p>
                <div class="flex items-end gap-2 mt-1">
                    <p class="text-2xl md:text-3xl font-black text-gray-800">${totalCount}</p>
                </div>
            </div>
            
            <div class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100">
                <p class="text-[10px] text-gray-500 font-bold uppercase">Concluídos</p>
                <p class="text-lg md:text-xl font-black text-indigo-600 mt-1">${totalCount > 0 ? Math.round((completedCount/totalCount)*100) : 0}%</p>
            </div>
             <div class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100">
                <p class="text-[10px] text-gray-500 font-bold uppercase">Cancelados</p>
                <p class="text-lg md:text-xl font-black text-red-500 mt-1">${cancelledCount}</p>
            </div>

            <div class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 col-span-2 md:col-span-1">
                <p class="text-[10px] text-gray-500 font-bold uppercase">Valor Estimado</p>
                 <p class="text-xl md:text-2xl font-black text-gray-800 mt-1">R$ ${totalValue.toLocaleString('pt-BR', {minimumFractionDigits: 0})}</p>
            </div>
        </div>

        <div class="bg-white p-4 md:p-5 rounded-3xl shadow-sm border border-gray-100 mt-4 animate-slide-up delay-100 w-full">
            <h3 class="text-base md:text-lg font-bold text-gray-800 mb-4">Volume Diário</h3>
            <div class="relative w-full h-56 md:h-64">
                <canvas id="chart-appointments-daily"></canvas>
            </div>
        </div>

        <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mt-4 animate-slide-up delay-200 w-full">
            <div class="p-4 md:p-5 border-b border-gray-50 bg-gray-50/50">
                <h3 class="text-base md:text-lg font-bold text-gray-800">Ranking Profissional</h3>
            </div>
            <div class="overflow-x-auto no-scrollbar w-full">
                <table class="w-full text-xs md:text-sm min-w-full">
                    <tbody class="divide-y divide-gray-100">
                        ${byProfessional.map((p, idx) => {
                            const maxVal = byProfessional[0]?.value || 1;
                            const percent = (p.value / maxVal) * 100;
                            return `
                            <tr class="group">
                                <td class="p-3 md:p-4 w-8 md:w-12 text-center font-bold text-gray-300">${idx + 1}</td>
                                <td class="p-3 md:p-4 pl-0 min-w-[100px]">
                                    <p class="font-bold text-gray-800 truncate">${escapeHTML(p.name)}</p>
                                    <div class="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                                        <div class="h-full bg-indigo-500 rounded-full" style="width: ${percent}%"></div>
                                    </div>
                                </td>
                                <td class="p-3 md:p-4 text-center">
                                    <span class="bg-indigo-50 text-indigo-700 px-2 md:px-2.5 py-1 rounded-lg font-bold text-xs">${p.count}</span>
                                </td>
                                <td class="p-3 md:p-4 text-right font-bold text-gray-700 whitespace-nowrap">R$ ${p.value.toLocaleString('pt-BR', {minimumFractionDigits: 0})}</td>
                            </tr>
                        `}).join('')}
                        ${byProfessional.length === 0 ? '<tr><td colspan="4" class="p-8 text-center text-gray-400">Sem dados.</td></tr>' : ''}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    renderModernAreaChart('chart-appointments-daily', dailyLabels, dailyValues);
}

// --- 9. ABA DRE ---
function renderDRE(container) {
    const { dreFinancial } = localState.data;
    if(!dreFinancial) return;

    const totalRev = dreFinancial.totalRevenues;
    
    const renderRow = (label, value, colorClass, isNegative = false) => {
        const percent = totalRev > 0 ? (value / totalRev) * 100 : 0;
        const sign = isNegative ? '- ' : '';
        return `
        <div class="flex items-center justify-between py-2 md:py-3 px-3 md:px-4 border-b border-dashed border-gray-100 last:border-0">
            <div class="flex-1 pr-2 md:pr-4 overflow-hidden">
                <p class="text-[10px] md:text-xs font-semibold text-gray-600 truncate">${escapeHTML(label)}</p>
                <div class="w-full h-1 bg-gray-100 rounded-full mt-1.5 overflow-hidden max-w-[80px] md:max-w-[100px]">
                    <div class="h-full ${colorClass.replace('text-', 'bg-')} opacity-40" style="width: ${Math.min(percent, 100)}%"></div>
                </div>
            </div>
            <div class="text-right flex-shrink-0">
                <p class="text-xs md:text-sm font-bold ${colorClass}">${sign}R$ ${value.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                <p class="text-[9px] md:text-[10px] text-gray-400 font-medium">${percent.toFixed(1)}%</p>
            </div>
        </div>`;
    };

    const revRows = Object.entries(dreFinancial.revenues).map(([k, v]) => renderRow(k, v, 'text-emerald-600', false)).join('');
    const expRows = Object.entries(dreFinancial.expenses).map(([k, v]) => renderRow(k, v, 'text-red-500', true)).join('');

    const netResultClass = dreFinancial.netResult >= 0 ? 'from-emerald-500 to-emerald-600' : 'from-red-500 to-red-600';
    const netResultLabel = dreFinancial.netResult >= 0 ? 'Lucro' : 'Prejuízo';

    container.innerHTML = `
        <div class="max-w-xl mx-auto animate-slide-up pb-10 w-full">
            <div class="bg-gray-900 text-white rounded-3xl p-5 md:p-6 shadow-xl relative overflow-hidden mb-4 md:mb-6">
                <div class="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                    <svg class="w-32 h-32 md:w-48 md:h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                </div>
                <p class="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Resultado Líquido</p>
                <h2 class="text-3xl md:text-4xl font-black mb-2">R$ ${dreFinancial.netResult.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</h2>
                <span class="inline-block px-2 py-1 md:px-3 md:py-1 bg-white/20 rounded-lg text-[10px] md:text-xs font-bold backdrop-blur-sm">
                    ${netResultLabel}: ${(totalRev > 0 ? (dreFinancial.netResult/totalRev)*100 : 0).toFixed(1)}% de Margem
                </span>
            </div>

            <div class="space-y-3 md:space-y-4">
                <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div class="bg-gray-50/50 p-3 border-b border-gray-100 flex justify-between items-center">
                        <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider pl-2">Receitas</h3>
                        <span class="text-[10px] md:text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Total: R$ ${dreFinancial.totalRevenues.toLocaleString('pt-BR', {minimumFractionDigits: 0})}</span>
                    </div>
                    <div>${revRows || '<p class="text-xs text-gray-400 p-4 text-center">Nenhuma receita.</p>'}</div>
                </div>

                <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div class="bg-gray-50/50 p-3 border-b border-gray-100 flex justify-between items-center">
                        <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider pl-2">Despesas</h3>
                        <span class="text-[10px] md:text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">Total: R$ ${dreFinancial.totalExpenses.toLocaleString('pt-BR', {minimumFractionDigits: 0})}</span>
                    </div>
                    <div>${expRows || '<p class="text-xs text-gray-400 p-4 text-center">Nenhuma despesa.</p>'}</div>
                </div>
            </div>
        </div>
    `;
}

// --- FUNÇÕES DE GRÁFICO (Chart.js Configs) ---

function renderModernCashFlowChart(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (chartsInstances[canvasId]) chartsInstances[canvasId].destroy();

    const gradientBalance = ctx.createLinearGradient(0, 0, 0, 400);
    gradientBalance.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
    gradientBalance.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

    const negativePayables = data.payables.map(p => p * -1);
    const labelsFormatted = data.labels.map(d => d.split('-').reverse().slice(0, 2).join('/'));

    chartsInstances[canvasId] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labelsFormatted,
            datasets: [
                {
                    label: 'Saldo',
                    data: data.expectedBalance,
                    type: 'line',
                    borderColor: '#3b82f6',
                    backgroundColor: gradientBalance,
                    borderWidth: 3,
                    
                    // MELHORIAS PARA MOBILE (CLICK E VISIBILIDADE)
                    pointRadius: 3,           // Ponto visível (pequeno)
                    pointBackgroundColor: '#fff', 
                    pointBorderColor: '#3b82f6',
                    pointBorderWidth: 2,
                    pointHoverRadius: 6,
                    hitRadius: 30,           // Área de toque expandida
                    
                    fill: true,
                    tension: 0.4,
                    order: 0,
                    yAxisID: 'y'
                },
                { label: 'Entradas', data: data.receivables, backgroundColor: '#34d399', borderRadius: 4, barPercentage: 0.6, order: 1, yAxisID: 'y' },
                { label: 'Saídas', data: negativePayables, backgroundColor: '#f87171', borderRadius: 4, barPercentage: 0.6, order: 2, yAxisID: 'y' }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            // INTERAÇÃO MELHORADA
            interaction: { 
                mode: 'index',   // Mostra tooltip de todos os datasets (saldo, entrada, saída)
                intersect: false // Não precisa tocar exatamente no elemento, apenas na linha vertical
            },
            plugins: {
                legend: { position: 'top', align: 'end', labels: { usePointStyle: true, boxWidth: 6, font: { family: "'Inter', sans-serif", size: 10 } } },
                tooltip: { backgroundColor: '#fff', titleColor: '#111', bodyColor: '#444', borderColor: '#eee', borderWidth: 1, padding: 10 }
            },
            scales: {
                x: { grid: { display: false }, ticks: { font: { size: 10 } } },
                y: { display: true, grid: { color: '#f3f4f6', borderDash: [4, 4] }, ticks: { callback: v => new Intl.NumberFormat('pt-BR', { notation: "compact" }).format(v), font: { size: 10 } } }
            }
        }
    });
}

function renderModernAreaChart(canvasId, labels, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (chartsInstances[canvasId]) chartsInstances[canvasId].destroy();

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.5)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');

    const labelsFormatted = labels.map(d => d.split('-').reverse().slice(0, 2).join('/'));

    chartsInstances[canvasId] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labelsFormatted,
            datasets: [{
                label: 'Agendamentos',
                data: data,
                borderColor: '#6366f1',
                backgroundColor: gradient,
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                
                // MELHORIAS PARA MOBILE
                pointRadius: 3,          // Ponto visível
                pointBackgroundColor: '#fff',
                pointBorderColor: '#6366f1',
                pointBorderWidth: 2,
                pointHoverRadius: 5,
                hitRadius: 30            // Área de toque expandida
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            // INTERAÇÃO MELHORADA
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: { legend: { display: false }, tooltip: { backgroundColor: '#fff', titleColor: '#111', bodyColor: '#6366f1', borderColor: '#eee', borderWidth: 1 } },
            scales: {
                x: { grid: { display: false }, ticks: { font: { size: 10 } } },
                y: { beginAtZero: true, grid: { color: '#f3f4f6' }, ticks: { stepSize: 1, font: { size: 10 } } }
            }
        }
    });
}

function renderChart(canvasId, type, label, labels, data, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (chartsInstances[canvasId]) chartsInstances[canvasId].destroy();

    new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
            datasets: [{ label: label, data: data, backgroundColor: color, borderColor: Array.isArray(color) ? '#fff' : color, borderWidth: 1, tension: 0.3, fill: type === 'line' }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: type === 'doughnut', position: 'right', labels: { usePointStyle: true, boxWidth: 8, font: { size: 10 } } } },
            scales: type === 'doughnut' ? {} : { x: { grid: { display: false }, ticks: {font:{size:9}} }, y: { grid: { color: '#f3f4f6' }, beginAtZero: true, ticks: {font:{size:9}} } }
        }
    });
}