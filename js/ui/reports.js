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

// Cores para o Fluxo de Caixa
const cashFlowColors = {
    creditRealized: '#10b981',      // Verde Forte
    creditProvisioned: '#6ee7b7',   // Verde Claro
    debitRealized: '#ef4444',       // Vermelho Forte
    debitProvisioned: '#fca5a5',    // Vermelho Claro
    balance: '#3b82f6'              // Azul
};

const chartColors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

// --- 2. ESTADO LOCAL ---
const localState = {
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0], 
    endDate: new Date().toISOString().split('T')[0], 
    selectedProfessional: 'all',
    selectedCostCenter: 'all',
    
    professionalsList: [],
    costCentersList: [],
    naturesList: [],

    // Dados Brutos (Financeiro)
    rawPayables: [],
    rawReceivables: [],

    // Dados Processados Localmente
    processedDRE: null,
    processedCashFlow: null,
    processedDailyRevenue: null,

    // Dados do Backend (Legado/Complementar)
    backendData: null,            
    appointmentsData: [],  

    currentTab: 'dashboards',
    isFilterOpen: false
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
        <div class="flex flex-col items-center justify-center h-[calc(100vh-100px)] w-full">
            <div class="loader mb-4 border-t-indigo-600"></div>
            <p class="text-gray-500 font-medium animate-pulse">Carregando inteligência...</p>
        </div>`;
    
    try {
        await loadChartJs();
        
        // Carrega listas auxiliares
        const [profs, costs, natures] = await Promise.all([
            professionalsApi.getProfessionals(state.establishmentId),
            reportsApi.getCostCenters(state.establishmentId).catch(() => []),
            financialApi.getNatures(state.establishmentId).catch(() => [])
        ]);
        
        localState.professionalsList = profs || [];
        localState.costCentersList = costs || [];
        localState.naturesList = natures || [];

        renderLayout();
        await fetchAndRenderData();
    } catch (e) {
        console.error("Erro no loadReportsPage:", e);
        contentDiv.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-red-500 p-6 text-center w-full">
                <div class="bg-red-50 p-4 rounded-full mb-4"><svg class="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                <h3 class="text-lg font-bold text-gray-800">Ops! Algo deu errado.</h3>
                <p class="text-sm text-gray-600 mt-2 max-w-xs mx-auto break-words">${escapeHTML(e.message)}</p>
                <button onclick="window.location.reload()" class="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-transform active:scale-95">Tentar Novamente</button>
            </div>`;
    }
}

// --- 5. RENDERIZAÇÃO E LAYOUT ---
function renderLayout() {
    const profOptions = localState.professionalsList.map(p => `<option value="${p.id}">${escapeHTML(p.name)}</option>`).join('');
    const costOptions = localState.costCentersList.map(c => `<option value="${c.id}">${escapeHTML(c.name)}</option>`).join('');

    contentDiv.innerHTML = `
        <div class="flex flex-col min-h-screen bg-gray-50 pb-24 relative w-full max-w-[100vw] overflow-x-hidden">
            
            <div class="sticky top-0 z-30 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300 w-full">
                <div class="max-w-7xl mx-auto px-3 md:px-4 py-3">
                    <div class="flex justify-between items-center">
                        <div class="flex-1 min-w-0 mr-2">
                            <h1 class="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                                <span class="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg flex-shrink-0 shadow-sm border border-indigo-100">
                                    <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                </span>
                                <span class="truncate">Relatórios</span>
                            </h1>
                            <p class="text-[10px] md:text-xs text-gray-500 mt-0.5 ml-1 truncate" id="date-range-display">
                                ${formatDateShort(localState.startDate)} até ${formatDateShort(localState.endDate)}
                            </p>
                        </div>
                        <button id="toggle-filters-btn" class="p-2 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors relative flex-shrink-0">
                            <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                        </button>
                    </div>
                </div>

                <div id="filters-container" class="hidden border-t border-gray-100 bg-gray-50/50 overflow-hidden transition-all duration-300 w-full">
                    <div class="p-4 grid grid-cols-1 md:grid-cols-4 gap-3 max-w-7xl mx-auto w-full">
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
                            <select id="report-prof" class="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm text-gray-700">
                                <option value="all">Todos Profissionais</option>
                                ${profOptions}
                            </select>
                        </div>
                        <div class="space-y-1">
                            <label class="text-xs font-semibold text-gray-500 ml-1">Centro de Custo</label>
                            <select id="report-cost" class="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm text-gray-700">
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
                        <button data-tab="dre" class="tab-btn flex-1 py-2 px-4 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap border">DRE Contábil</button>
                        <button data-tab="appointments" class="tab-btn flex-1 py-2 px-4 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap border">Agendamentos</button>
                    </div>
                </div>
            </div>

            <main id="report-content" class="flex-1 max-w-7xl w-full mx-auto px-3 md:px-4 py-4 space-y-4 animate-fade-in overflow-hidden"></main>
        </div>
    `;

    document.getElementById('toggle-filters-btn').onclick = toggleFilters;
    document.getElementById('btn-apply-filters').onclick = () => {
        applyFilters();
        toggleFilters();
    };

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => {
            localState.currentTab = btn.dataset.tab;
            updateTabsUI();
            renderCurrentView();
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

    document.getElementById('date-range-display').textContent = 
        `${formatDateShort(localState.startDate)} até ${formatDateShort(localState.endDate)}`;

    await fetchAndRenderData();
}

// Processamento Local: DRE (Somente Realizado/Pago)
function processDREData(payables, receivables) {
    const natureMap = new Map();
    localState.naturesList.forEach(n => natureMap.set(n.id, n.name));

    const dre = { revenues: {}, expenses: {}, totalRevenues: 0, totalExpenses: 0, netResult: 0 };

    receivables.forEach(r => {
        if (r.status === 'paid') {
            const natureName = r.naturezaId ? (natureMap.get(r.naturezaId) || 'Outras Receitas') : 'Geral';
            if (!dre.revenues[natureName]) dre.revenues[natureName] = 0;
            dre.revenues[natureName] += r.amount;
            dre.totalRevenues += r.amount;
        }
    });

    payables.forEach(p => {
        if (p.status === 'paid') {
            const natureName = p.naturezaId ? (natureMap.get(p.naturezaId) || 'Outras Despesas') : 'Geral';
            if (!dre.expenses[natureName]) dre.expenses[natureName] = 0;
            dre.expenses[natureName] += p.amount;
            dre.totalExpenses += p.amount;
        }
    });

    dre.netResult = dre.totalRevenues - dre.totalExpenses;
    return dre;
}

// Processamento Local: Fluxo de Caixa
function processCashFlowData(payables, receivables) {
    const dataMap = {};
    const initDate = (date) => {
        if (!dataMap[date]) dataMap[date] = { realizedCredit: 0, provisionedCredit: 0, realizedDebit: 0, provisionedDebit: 0 };
    };

    let curr = new Date(localState.startDate);
    const end = new Date(localState.endDate);
    while (curr <= end) {
        initDate(curr.toISOString().split('T')[0]);
        curr.setDate(curr.getDate() + 1);
    }

    receivables.forEach(item => {
        const date = item.dueDate.split('T')[0];
        if (dataMap[date]) { 
            if (item.status === 'paid') dataMap[date].realizedCredit += item.amount;
            else dataMap[date].provisionedCredit += item.amount;
        }
    });

    payables.forEach(item => {
        const date = item.dueDate.split('T')[0];
        if (dataMap[date]) {
            if (item.status === 'paid') dataMap[date].realizedDebit += item.amount;
            else dataMap[date].provisionedDebit += item.amount;
        }
    });

    const sortedDates = Object.keys(dataMap).sort();
    const balanceData = [];
    let accumulated = 0;
    
    sortedDates.forEach(date => {
        const day = dataMap[date];
        const dailyNet = (day.realizedCredit + day.provisionedCredit) - (day.realizedDebit + day.provisionedDebit);
        accumulated += dailyNet;
        balanceData.push(accumulated);
    });

    return {
        labels: sortedDates,
        realizedCredit: sortedDates.map(d => dataMap[d].realizedCredit),
        provisionedCredit: sortedDates.map(d => dataMap[d].provisionedCredit),
        realizedDebit: sortedDates.map(d => dataMap[d].realizedDebit * -1),
        provisionedDebit: sortedDates.map(d => dataMap[d].provisionedDebit * -1),
        balance: balanceData
    };
}

// Processamento Local: Faturamento Diário
function processDailyRevenueData(receivables) {
    const dailyMap = {};
    let curr = new Date(localState.startDate);
    const end = new Date(localState.endDate);
    while (curr <= end) {
        dailyMap[curr.toISOString().split('T')[0]] = 0;
        curr.setDate(curr.getDate() + 1);
    }

    receivables.forEach(r => {
        if (r.status === 'paid') {
            const date = r.dueDate.split('T')[0];
            if (dailyMap.hasOwnProperty(date)) dailyMap[date] += r.amount;
        }
    });

    const labels = Object.keys(dailyMap).sort();
    const data = labels.map(d => dailyMap[d]);
    return { labels, data };
}

// Cálculo de Tendência Linear
function calculateLinearTrend(data) {
    const n = data.length;
    if (n < 2) return { trendData: Array(n).fill(data[0] || 0), color: '#9ca3af' }; 

    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    for (let i = 0; i < n; i++) {
        sumX += i;
        sumY += data[i];
        sumXY += i * data[i];
        sumXX += i * i;
    }

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const trendData = [];
    for (let i = 0; i < n; i++) {
        trendData.push(slope * i + intercept);
    }

    const color = slope >= 0 ? '#10b981' : '#ef4444'; 
    return { trendData, color };
}

async function fetchAndRenderData() {
    const container = document.getElementById('report-content');
    container.innerHTML = `<div class="flex justify-center py-20 w-full"><div class="loader border-t-indigo-600"></div></div>`;

    try {
        const filters = { 
            startDate: localState.startDate, 
            endDate: localState.endDate, 
            establishmentId: state.establishmentId 
        };
        if(localState.selectedCostCenter !== 'all') filters.costCenterId = localState.selectedCostCenter;

        const [payablesResult, receivablesResult] = await Promise.all([
            financialApi.getPayables(filters),
            financialApi.getReceivables(filters)
        ]);

        localState.rawPayables = payablesResult.entries || [];
        localState.rawReceivables = receivablesResult.entries || [];

        const backendData = await reportsApi.getAdvancedIndicators(
            localState.startDate, 
            localState.endDate, 
            localState.selectedProfessional,
            localState.selectedCostCenter
        ).catch(() => ({ charts: { professionals: { labels: [], data: [] }, salesMonthly: { labels: [], data: [] } } }));

        localState.backendData = backendData;
        localState.processedDRE = processDREData(localState.rawPayables, localState.rawReceivables);
        localState.processedCashFlow = processCashFlowData(localState.rawPayables, localState.rawReceivables);
        localState.processedDailyRevenue = processDailyRevenueData(localState.rawReceivables);

        const startISO = new Date(localState.startDate + 'T00:00:00').toISOString();
        const endISO = new Date(localState.endDate + 'T23:59:59').toISOString();
        const profIdFilter = localState.selectedProfessional === 'all' ? null : localState.selectedProfessional;
        
        const appointments = await appointmentsApi.getAppointmentsByDateRange(
            state.establishmentId, startISO, endISO, profIdFilter
        ).catch(() => []);

        localState.appointmentsData = Array.isArray(appointments) ? appointments : [];
        renderCurrentView();

    } catch (error) {
        console.error(error);
        container.innerHTML = `
            <div class="bg-red-50 border border-red-100 p-6 rounded-2xl text-center mx-4 w-full">
                <p class="font-bold text-gray-800">Não foi possível carregar</p>
                <p class="text-sm text-gray-500 mt-1">${escapeHTML(error.message || 'Verifique sua conexão.')}</p>
            </div>`;
    }
}

function renderCurrentView() {
    const container = document.getElementById('report-content');
    
    switch(localState.currentTab) {
        case 'dashboards': renderFinancialDashboards(container); break;
        case 'appointments': renderAppointmentsTab(container); break;
        case 'dre': renderDRE(container); break;
    }
}

// --- 7. ABA FINANCEIRO ---
function renderFinancialDashboards(container) {
    const dre = localState.processedDRE;
    const dailyRev = localState.processedDailyRevenue;
    const monthlyRev = localState.backendData.charts?.salesMonthly || { labels: [], data: [] };
    const profsChart = localState.backendData.charts?.professionals || { labels: [], data: [] };

    container.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 animate-slide-up w-full">
            <div class="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group w-full">
                 <div class="flex items-center gap-2 mb-2">
                    <span class="p-2 bg-blue-50 text-blue-600 rounded-lg flex-shrink-0"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z" /></svg></span>
                    <p class="text-xs text-gray-500 font-bold uppercase tracking-wider truncate">Receita Realizada</p>
                </div>
                <p class="text-2xl font-black text-gray-800 tracking-tight truncate">R$ ${dre.totalRevenues.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
            </div>
            <div class="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden w-full">
                <div class="flex items-center gap-2 mb-2">
                    <span class="p-2 bg-red-50 text-red-600 rounded-lg flex-shrink-0"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg></span>
                    <p class="text-xs text-gray-500 font-bold uppercase tracking-wider truncate">Despesa Realizada</p>
                </div>
                <p class="text-2xl font-black text-red-500 tracking-tight truncate">R$ ${dre.totalExpenses.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
            </div>
            <div class="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden w-full">
                <div class="flex items-center gap-2 mb-2">
                    <span class="p-2 bg-emerald-50 text-emerald-600 rounded-lg flex-shrink-0"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                    <p class="text-xs text-gray-500 font-bold uppercase tracking-wider truncate">Saldo Realizado</p>
                </div>
                <p class="text-2xl font-black text-emerald-600 tracking-tight truncate">R$ ${dre.netResult.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
            </div>
        </div>

        <div class="bg-white p-4 md:p-5 rounded-3xl shadow-sm border border-gray-100 mt-4 md:mt-6 animate-slide-up delay-100 w-full overflow-hidden">
            <div class="mb-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                <div>
                    <h3 class="text-base md:text-lg font-bold text-gray-800">Fluxo de Caixa</h3>
                    <p class="text-[10px] md:text-xs text-gray-400">Analise provisionado vs realizado.</p>
                </div>
                <div class="flex flex-wrap gap-2 md:gap-3">
                    <label class="inline-flex items-center cursor-pointer bg-gray-50 px-2 py-1 rounded-lg border border-gray-100"><input type="checkbox" checked class="chart-toggle w-4 h-4 text-emerald-500 rounded border-gray-300 focus:ring-emerald-500" data-dataset="0"><span class="ml-1.5 text-[10px] md:text-xs font-semibold text-gray-700">Créd. Real.</span></label>
                    <label class="inline-flex items-center cursor-pointer bg-gray-50 px-2 py-1 rounded-lg border border-gray-100"><input type="checkbox" checked class="chart-toggle w-4 h-4 text-emerald-300 rounded border-gray-300 focus:ring-emerald-300" data-dataset="1"><span class="ml-1.5 text-[10px] md:text-xs font-semibold text-gray-700">Créd. Prov.</span></label>
                    <label class="inline-flex items-center cursor-pointer bg-gray-50 px-2 py-1 rounded-lg border border-gray-100"><input type="checkbox" checked class="chart-toggle w-4 h-4 text-red-500 rounded border-gray-300 focus:ring-red-500" data-dataset="2"><span class="ml-1.5 text-[10px] md:text-xs font-semibold text-gray-700">Déb. Real.</span></label>
                    <label class="inline-flex items-center cursor-pointer bg-gray-50 px-2 py-1 rounded-lg border border-gray-100"><input type="checkbox" checked class="chart-toggle w-4 h-4 text-red-300 rounded border-gray-300 focus:ring-red-300" data-dataset="3"><span class="ml-1.5 text-[10px] md:text-xs font-semibold text-gray-700">Déb. Prov.</span></label>
                    <label class="inline-flex items-center cursor-pointer bg-gray-50 px-2 py-1 rounded-lg border border-gray-100"><input type="checkbox" checked class="chart-toggle w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500" data-dataset="4"><span class="ml-1.5 text-[10px] md:text-xs font-semibold text-gray-700">Saldo</span></label>
                </div>
            </div>
            <div class="relative w-full h-60 md:h-80"><canvas id="chart-cashflow-modern"></canvas></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6 animate-slide-up delay-200 w-full">
            <div class="bg-white p-4 md:p-5 rounded-3xl shadow-sm border border-gray-100 w-full overflow-hidden">
                <h3 class="font-bold text-gray-800 mb-4 text-xs md:text-sm uppercase tracking-wide truncate">Faturamento Diário (Realizado)</h3>
                <div class="relative h-56 md:h-64 w-full"><canvas id="chart-daily-revenue"></canvas></div>
            </div>
             <div class="bg-white p-4 md:p-5 rounded-3xl shadow-sm border border-gray-100 w-full overflow-hidden">
                <h3 class="font-bold text-gray-800 mb-4 text-xs md:text-sm uppercase tracking-wide truncate">Evolução Mensal (Realizada)</h3>
                <div class="relative h-56 md:h-64 w-full"><canvas id="chart-monthly"></canvas></div>
            </div>
            <div class="bg-white p-4 md:p-5 rounded-3xl shadow-sm border border-gray-100 w-full overflow-hidden lg:col-span-2">
                <h3 class="font-bold text-gray-800 mb-4 text-xs md:text-sm uppercase tracking-wide truncate">Faturamento por Profissional</h3>
                <div class="relative h-56 md:h-64 flex justify-center w-full"><canvas id="chart-profs"></canvas></div>
            </div>
        </div>
    `;

    renderModernCashFlowChart('chart-cashflow-modern', localState.processedCashFlow);
    
    renderTrendChart('chart-daily-revenue', 'Receita Diária', 
        dailyRev.labels.map(d => d.split('-').reverse().slice(0, 2).join('/')), 
        dailyRev.data
    );

    renderTrendChart('chart-monthly', 'Receita Mensal', 
        monthlyRev.labels, 
        monthlyRev.data
    );
    
    renderChart('chart-profs', 'doughnut', 'Total Vendas', profsChart.labels, profsChart.data, chartColors);
    
    document.querySelectorAll('.chart-toggle').forEach(cb => {
        cb.addEventListener('change', (e) => {
            const chart = chartsInstances['chart-cashflow-modern'];
            if (chart) {
                const datasetIndex = parseInt(e.target.dataset.dataset);
                chart.setDatasetVisibility(datasetIndex, e.target.checked);
                chart.update();
            }
        });
    });
}

// --- 8. ABA AGENDAMENTOS ---
function renderAppointmentsTab(container) {
    const appointments = localState.appointmentsData;
    const totalCount = appointments.length;
    let completedCount = 0;
    let cancelledCount = 0;
    let totalValue = 0;

    const dailyMap = {};
    const professionalMap = {};

    let curr = new Date(localState.startDate);
    const end = new Date(localState.endDate);
    while (curr <= end) {
        dailyMap[curr.toISOString().split('T')[0]] = { active: 0, cancelled: 0 };
        curr.setDate(curr.getDate() + 1);
    }

    appointments.forEach(app => {
        const val = parseFloat(app.totalAmount || app.price || 0);
        const status = (app.status || '').toLowerCase();
        let dateStr = '';
        if (app.startTime) {
             const d = app.startTime.toDate ? app.startTime.toDate() : new Date(app.startTime);
             if (!isNaN(d)) dateStr = d.toISOString().split('T')[0];
        }
        
        const profName = app.professionalName || 'Sem Profissional';
        if (!professionalMap[profName]) professionalMap[profName] = { name: profName, count: 0, value: 0 };

        if (['cancelled', 'cancelado', 'no-show', 'cancelada'].includes(status)) {
            cancelledCount++;
            if (dateStr && dailyMap[dateStr]) dailyMap[dateStr].cancelled++;
        } else {
            if (['completed', 'finalized', 'paid'].includes(status)) completedCount++;
            
            totalValue += val;
            
            if (dateStr && dailyMap[dateStr]) dailyMap[dateStr].active++;
            professionalMap[profName].count++;
            professionalMap[profName].value += val;
        }
    });

    const dailyLabels = Object.keys(dailyMap).sort();
    const activeValues = dailyLabels.map(d => dailyMap[d].active);
    const cancelledValues = dailyLabels.map(d => dailyMap[d].cancelled);
    const byProfessional = Object.values(professionalMap).sort((a,b) => b.value - a.value);

    container.innerHTML = `
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 animate-slide-up w-full">
            <div class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 col-span-2 md:col-span-1 w-full">
                <p class="text-[10px] text-gray-500 font-bold uppercase truncate">Agendamentos</p>
                <div class="flex items-end gap-2 mt-1">
                    <p class="text-2xl md:text-3xl font-black text-gray-800">${totalCount}</p>
                </div>
            </div>
            
            <div class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 w-full">
                <p class="text-[10px] text-gray-500 font-bold uppercase truncate">Concluídos</p>
                <p class="text-lg md:text-xl font-black text-indigo-600 mt-1">${totalCount > 0 ? Math.round((completedCount/totalCount)*100) : 0}%</p>
            </div>
             <div class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 w-full">
                <p class="text-[10px] text-gray-500 font-bold uppercase truncate">Cancelados</p>
                <p class="text-lg md:text-xl font-black text-red-500 mt-1">${cancelledCount}</p>
            </div>

            <div class="bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 col-span-2 md:col-span-1 w-full">
                <p class="text-[10px] text-gray-500 font-bold uppercase truncate">Valor Estimado</p>
                 <p class="text-xl md:text-2xl font-black text-gray-800 mt-1 truncate">R$ ${totalValue.toLocaleString('pt-BR', {minimumFractionDigits: 0})}</p>
            </div>
        </div>

        <div class="bg-white p-4 md:p-5 rounded-3xl shadow-sm border border-gray-100 mt-4 animate-slide-up delay-100 w-full overflow-hidden">
            <div class="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 class="text-base md:text-lg font-bold text-gray-800 truncate">Volume Diário</h3>
                
                <div class="flex flex-wrap gap-2">
                    <label class="inline-flex items-center cursor-pointer bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                        <input type="checkbox" checked class="app-chart-toggle w-4 h-4 text-indigo-500 rounded border-gray-300 focus:ring-indigo-500" data-dataset="0">
                        <span class="ml-1.5 text-[10px] md:text-xs font-semibold text-gray-700">Realizados</span>
                    </label>
                    <label class="inline-flex items-center cursor-pointer bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                        <input type="checkbox" checked class="app-chart-toggle w-4 h-4 text-red-500 rounded border-gray-300 focus:ring-red-500" data-dataset="1">
                        <span class="ml-1.5 text-[10px] md:text-xs font-semibold text-gray-700">Cancelados</span>
                    </label>
                </div>
            </div>
            
            <div class="relative w-full h-56 md:h-64">
                <canvas id="chart-appointments-daily"></canvas>
            </div>
        </div>

        <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mt-4 animate-slide-up delay-200 w-full">
            <div class="p-4 md:p-5 border-b border-gray-50 bg-gray-50/50">
                <h3 class="text-base md:text-lg font-bold text-gray-800 truncate">Ranking Profissional</h3>
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
                                    <p class="font-bold text-gray-800 truncate max-w-[120px] md:max-w-xs">${escapeHTML(p.name)}</p>
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

    renderAppointmentsChart('chart-appointments-daily', dailyLabels, activeValues, cancelledValues);

    document.querySelectorAll('.app-chart-toggle').forEach(cb => {
        cb.addEventListener('change', (e) => {
            const chart = chartsInstances['chart-appointments-daily'];
            if (chart) {
                const datasetIndex = parseInt(e.target.dataset.dataset);
                chart.setDatasetVisibility(datasetIndex, e.target.checked);
                chart.update();
            }
        });
    });
}

// --- 9. ABA DRE ---
function renderDRE(container) {
    const dre = localState.processedDRE;
    if(!dre) return;

    const totalRev = dre.totalRevenues;
    
    const renderRow = (label, value, colorClass, isNegative = false) => {
        const percent = totalRev > 0 ? (value / totalRev) * 100 : 0;
        const sign = isNegative ? '- ' : '';
        return `
        <div class="flex items-center justify-between py-2 md:py-3 px-3 md:px-4 border-b border-dashed border-gray-100 last:border-0 w-full">
            <div class="flex-1 pr-2 md:pr-4 overflow-hidden min-w-0">
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

    const revRows = Object.entries(dre.revenues).map(([k, v]) => renderRow(k, v, 'text-emerald-600', false)).join('');
    const expRows = Object.entries(dre.expenses).map(([k, v]) => renderRow(k, v, 'text-red-500', true)).join('');

    const netResultLabel = dre.netResult >= 0 ? 'Lucro Real' : 'Prejuízo Real';

    container.innerHTML = `
        <div class="max-w-xl mx-auto animate-slide-up pb-10 w-full">
            <div class="bg-gray-900 text-white rounded-3xl p-5 md:p-6 shadow-xl relative overflow-hidden mb-4 md:mb-6 w-full">
                <div class="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                    <svg class="w-32 h-32 md:w-48 md:h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                </div>
                <p class="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-widest mb-1 truncate">Resultado Líquido (Realizado)</p>
                <h2 class="text-3xl md:text-4xl font-black mb-2 truncate">R$ ${dre.netResult.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</h2>
                <span class="inline-block px-2 py-1 md:px-3 md:py-1 bg-white/20 rounded-lg text-[10px] md:text-xs font-bold backdrop-blur-sm whitespace-nowrap">
                    ${netResultLabel}: ${(totalRev > 0 ? (dre.netResult/totalRev)*100 : 0).toFixed(1)}% de Margem
                </span>
            </div>

            <div class="space-y-3 md:space-y-4 w-full">
                <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden w-full">
                    <div class="bg-gray-50/50 p-3 border-b border-gray-100 flex justify-between items-center">
                        <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider pl-2 truncate">Receitas Baixadas</h3>
                        <span class="text-[10px] md:text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex-shrink-0 whitespace-nowrap">Total: R$ ${dre.totalRevenues.toLocaleString('pt-BR', {minimumFractionDigits: 0})}</span>
                    </div>
                    <div>${revRows || '<p class="text-xs text-gray-400 p-4 text-center">Nenhuma receita baixada.</p>'}</div>
                </div>

                <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden w-full">
                    <div class="bg-gray-50/50 p-3 border-b border-gray-100 flex justify-between items-center">
                        <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider pl-2 truncate">Despesas Baixadas</h3>
                        <span class="text-[10px] md:text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md flex-shrink-0 whitespace-nowrap">Total: R$ ${dre.totalExpenses.toLocaleString('pt-BR', {minimumFractionDigits: 0})}</span>
                    </div>
                    <div>${expRows || '<p class="text-xs text-gray-400 p-4 text-center">Nenhuma despesa baixada.</p>'}</div>
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

    const labelsFormatted = data.labels.map(d => d.split('-').reverse().slice(0, 2).join('/'));

    chartsInstances[canvasId] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labelsFormatted,
            datasets: [
                {
                    label: 'Créd. Realizado',
                    data: data.realizedCredit,
                    backgroundColor: cashFlowColors.creditRealized,
                    borderRadius: 3,
                    barPercentage: 0.7,
                    order: 1
                },
                {
                    label: 'Créd. Provisionado',
                    data: data.provisionedCredit,
                    backgroundColor: cashFlowColors.creditProvisioned,
                    borderRadius: 3,
                    borderWidth: 1,
                    borderColor: '#fff',
                    borderDash: [5, 5],
                    barPercentage: 0.7,
                    order: 2
                },
                {
                    label: 'Déb. Realizado',
                    data: data.realizedDebit,
                    backgroundColor: cashFlowColors.debitRealized,
                    borderRadius: 3,
                    barPercentage: 0.7,
                    order: 3
                },
                {
                    label: 'Déb. Provisionado',
                    data: data.provisionedDebit,
                    backgroundColor: cashFlowColors.debitProvisioned,
                    borderRadius: 3,
                    borderWidth: 1,
                    borderColor: '#fff',
                    borderDash: [5, 5],
                    barPercentage: 0.7,
                    order: 4
                },
                {
                    label: 'Saldo Acumulado',
                    data: data.balance,
                    type: 'line',
                    borderColor: '#3b82f6',
                    backgroundColor: gradientBalance,
                    borderWidth: 3,
                    
                    pointRadius: 3,
                    pointBackgroundColor: '#fff', 
                    pointBorderColor: '#3b82f6',
                    pointBorderWidth: 2,
                    pointHoverRadius: 8,
                    hitRadius: 30, 
                    
                    fill: true,
                    tension: 0.4,
                    order: 0, 
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { 
                mode: 'index',
                intersect: false 
            },
            plugins: {
                legend: { display: false },
                tooltip: { 
                    backgroundColor: '#fff', 
                    titleColor: '#111', 
                    bodyColor: '#444', 
                    borderColor: '#eee', 
                    borderWidth: 1, 
                    padding: 10,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Math.abs(context.parsed.y));
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: { stacked: true, grid: { display: false }, ticks: { font: { size: 10 } } },
                y: { stacked: true, display: true, grid: { color: '#f3f4f6', borderDash: [4, 4] }, ticks: { callback: v => new Intl.NumberFormat('pt-BR', { notation: "compact" }).format(Math.abs(v)), font: { size: 10 } } }
            }
        }
    });
}

function renderAppointmentsChart(canvasId, labels, activeData, cancelledData) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (chartsInstances[canvasId]) chartsInstances[canvasId].destroy();

    const labelsFormatted = labels.map(d => d.split('-').reverse().slice(0, 2).join('/'));

    chartsInstances[canvasId] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labelsFormatted,
            datasets: [
                {
                    label: 'Realizados',
                    data: activeData,
                    backgroundColor: '#4f46e5', // Indigo
                    borderRadius: 3,
                    barPercentage: 0.6,
                    order: 1
                },
                {
                    label: 'Cancelados',
                    data: cancelledData,
                    backgroundColor: '#ef4444', // Red
                    borderRadius: 3,
                    barPercentage: 0.6,
                    order: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: { display: false },
                tooltip: { backgroundColor: '#fff', titleColor: '#111', bodyColor: '#444', borderColor: '#eee', borderWidth: 1 }
            },
            scales: {
                x: { grid: { display: false }, ticks: { font: { size: 10 } } },
                y: { beginAtZero: true, grid: { color: '#f3f4f6' }, ticks: { stepSize: 1, font: { size: 10 } } }
            }
        }
    });
}

// Novo renderizador com suporte a linha de tendência "com bolinhas" e seta
function renderTrendChart(canvasId, label, labels, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (chartsInstances[canvasId]) chartsInstances[canvasId].destroy();

    // Calcula Tendência
    const { trendData, color } = calculateLinearTrend(data);

    // Ajusta o estilo do último ponto para ser um triângulo (seta)
    const pointStyles = trendData.map((_, i) => i === trendData.length - 1 ? 'triangle' : 'circle');
    const pointRadii = trendData.map((_, i) => i === trendData.length - 1 ? 6 : 3); // Aumenta o triângulo
    const pointRotations = trendData.map((_, i) => {
       if (i === trendData.length - 1) {
           // Se a tendência é de alta (verde), aponta pra cima (0 grau no chart.js é topo?)
           // ChartJS triangle points up by default. 
           // Se for vermelho (queda), rotacionar 180.
           return color === '#ef4444' ? 180 : 0; 
       }
       return 0;
    });


    chartsInstances[canvasId] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: label,
                    data: data,
                    backgroundColor: '#4f46e5', // Indigo
                    borderRadius: 4,
                    order: 1
                },
                {
                    label: 'Tendência',
                    data: trendData,
                    type: 'line',
                    borderColor: color, // Verde ou Vermelho
                    borderWidth: 3, 
                    
                    // Configuração de Bolinhas e Seta
                    pointStyle: pointStyles,
                    pointRadius: pointRadii,
                    pointRotation: pointRotations,
                    
                    pointBackgroundColor: '#fff',
                    pointBorderColor: color,
                    pointBorderWidth: 2,
                    pointHoverRadius: 8,
                    hitRadius: 30, 

                    fill: false,
                    tension: 0, // Linha reta
                    order: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false }, ticks: { font: { size: 9 } } },
                y: { grid: { color: '#f3f4f6' }, beginAtZero: true, ticks: { font: { size: 9 }, callback: v => new Intl.NumberFormat('pt-BR', { notation: "compact" }).format(v) } }
            }
        }
    });
}

// Renderizador genérico (para Doughnut)
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