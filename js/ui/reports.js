// js/ui/reports.js (Versão Híbrida: Financeiro/DRE Originais + Agendamentos Novo)

// --- 1. IMPORTAÇÕES ---
import * as reportsApi from '../api/reports.js';
import * as professionalsApi from '../api/professionals.js';
import * as appointmentsApi from '../api/appointments.js'; // Necessário para a aba Agendamentos
import { state } from '../state.js';
import { showGenericModal, showNotification } from '../components/modal.js';
import { escapeHTML } from '../utils.js';

const contentDiv = document.getElementById('content');
let chartsInstances = {}; // Cache dos gráficos

// Cores modernas
const chartColors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

// --- 2. ESTADO LOCAL ---
const localState = {
    // Filtros Globais
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0], // Início do Mês
    endDate: new Date().toISOString().split('T')[0], // Hoje
    selectedProfessional: 'all',
    selectedCostCenter: 'all',
    
    // Dados de Dependências
    professionalsList: [],
    costCentersList: [],

    // Dados Carregados
    data: null,            // Dados do Financeiro/DRE (getAdvancedIndicators)
    appointmentsData: [],  // Dados dos Agendamentos (getAppointmentsByDateRange)

    // Controle de Navegação
    currentTab: 'dashboards', // 'dashboards' (Financeiro), 'appointments' (Novo), 'dre' (DRE)
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
    contentDiv.innerHTML = `<div class="flex flex-col items-center justify-center h-64"><div class="loader mb-4"></div><p class="text-gray-500">A carregar inteligência de dados...</p></div>`;
    
    try {
        await loadChartJs();
        
        // Carrega dependências
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
            <div class="flex flex-col items-center justify-center h-full text-red-500">
                <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p>Erro ao carregar relatórios: ${escapeHTML(e.message)}</p>
                <button onclick="window.location.reload()" class="mt-4 px-4 py-2 bg-gray-200 rounded text-gray-700 hover:bg-gray-300">Tentar Novamente</button>
            </div>`;
    }
}

// --- 5. RENDERIZAÇÃO E LAYOUT ---

function renderLayout() {
    const profOptions = localState.professionalsList.map(p => `<option value="${p.id}">${escapeHTML(p.name)}</option>`).join('');
    const costOptions = localState.costCentersList.map(c => `<option value="${c.id}">${escapeHTML(c.name)}</option>`).join('');

    contentDiv.innerHTML = `
        <div class="flex flex-col min-h-screen bg-gray-50 pb-20">
            <div class="bg-white shadow-sm border-b sticky top-0 z-20 px-4 py-4">
                <div class="max-w-7xl mx-auto flex flex-col xl:flex-row justify-between items-center gap-4">
                    
                    <div class="flex items-center gap-3 w-full md:w-auto">
                        <div class="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                        </div>
                        <h1 class="text-xl font-bold text-gray-800">Relatórios</h1>
                    </div>
                    
                    <div class="flex gap-1 bg-gray-100 p-1 rounded-lg w-full md:w-auto overflow-x-auto shadow-inner">
                        <button data-tab="dashboards" class="tab-btn flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap">Financeiro</button>
                        <button data-tab="appointments" class="tab-btn flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap">Agendamentos</button>
                        <button data-tab="dre" class="tab-btn flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap">DRE Contábil</button>
                    </div>

                    <div class="flex flex-col md:flex-row gap-2 w-full xl:w-auto">
                        <div class="grid grid-cols-2 gap-2">
                            <select id="report-prof" class="border rounded-lg px-2 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none w-full">
                                <option value="all">Todos Profissionais</option>
                                ${profOptions}
                            </select>
                            <select id="report-cost" class="border rounded-lg px-2 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none w-full">
                                <option value="all">Todos Centros</option>
                                ${costOptions}
                            </select>
                        </div>
                        <div class="flex gap-2">
                            <input type="date" id="report-start" value="${localState.startDate}" class="border rounded-lg px-2 py-2 text-sm w-full">
                            <input type="date" id="report-end" value="${localState.endDate}" class="border rounded-lg px-2 py-2 text-sm w-full">
                            <button id="btn-filter" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 shadow-sm transition flex items-center justify-center">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <main id="report-content" class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6"></main>
        </div>
    `;

    // Event Listeners
    document.getElementById('btn-filter').onclick = applyFilters;
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => {
            localState.currentTab = btn.dataset.tab;
            updateTabsUI();
            renderCurrentView();
        };
    });

    updateTabsUI(); 
}

function updateTabsUI() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        const isActive = btn.dataset.tab === localState.currentTab;
        btn.className = isActive 
            ? "tab-btn flex-1 px-4 py-2 rounded-md text-sm font-bold bg-white text-indigo-600 shadow-sm transition-all whitespace-nowrap"
            : "tab-btn flex-1 px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-all whitespace-nowrap";
    });
}

// --- 6. LÓGICA DE DADOS ---

async function applyFilters() {
    localState.startDate = document.getElementById('report-start').value;
    localState.endDate = document.getElementById('report-end').value;
    localState.selectedProfessional = document.getElementById('report-prof').value;
    localState.selectedCostCenter = document.getElementById('report-cost').value;

    await fetchAndRenderData();
}

async function fetchAndRenderData() {
    const container = document.getElementById('report-content');
    container.innerHTML = `<div class="flex justify-center py-20"><div class="loader"></div></div>`;

    try {
        // BUSCA 1: Dados Financeiros e DRE (API Antiga/Potente)
        const financialPromise = reportsApi.getAdvancedIndicators(
            localState.startDate, 
            localState.endDate, 
            localState.selectedProfessional,
            localState.selectedCostCenter
        );

        // BUSCA 2: Dados de Agendamentos Detalhados (API Nova/Flexível)
        const profIdFilter = localState.selectedProfessional === 'all' ? null : localState.selectedProfessional;
        const startISO = new Date(localState.startDate + 'T00:00:00').toISOString();
        const endISO = new Date(localState.endDate + 'T23:59:59').toISOString();
        
        const appointmentsPromise = appointmentsApi.getAppointmentsByDateRange(
            state.establishmentId, 
            startISO, 
            endISO, 
            profIdFilter
        ).catch(err => []); // Fallback

        const [data, appointments] = await Promise.all([financialPromise, appointmentsPromise]);
        
        localState.data = data;
        localState.appointmentsData = Array.isArray(appointments) ? appointments : [];
        
        renderCurrentView();
    } catch (error) {
        console.error(error);
        container.innerHTML = `
            <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700 text-center">
                <p class="font-bold">Erro ao carregar dados</p>
                <p class="text-sm">${escapeHTML(error.message || 'Verifique sua conexão.')}</p>
            </div>`;
    }
}

function renderCurrentView() {
    const container = document.getElementById('report-content');
    if (!localState.data) return; // Segurança
    
    switch(localState.currentTab) {
        case 'dashboards':
            renderFinancialDashboards(container);
            break;
        case 'appointments':
            // AQUI ESTÁ A MUDANÇA: Usamos a função da "nova aba" que você gostou
            renderAppointmentsTab(container);
            break;
        case 'dre':
            renderDRE(container);
            break;
    }
}

// --- 7. ABA FINANCEIRO (Ressuscitada) ---

function renderFinancialDashboards(container) {
    const { dreSimple, charts } = localState.data;
    const dre = dreSimple || { grossRevenue: 0, netProfit: 0, variableCosts: 0 }; 
    
    const completedAppointments = localState.data.totalAppointments || 0; 
    const ticketMedio = completedAppointments > 0 ? (dre.grossRevenue / completedAppointments) : 0;

    container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 animate-fade-in">
            <div class="bg-white p-5 rounded-xl shadow-sm border-l-4 border-indigo-500">
                <p class="text-xs text-gray-500 font-bold uppercase">Faturamento</p>
                <p class="text-xl xl:text-2xl font-extrabold text-gray-800 mt-1">R$ ${dre.grossRevenue.toFixed(2)}</p>
            </div>

            <div class="bg-white p-5 rounded-xl shadow-sm border-l-4 border-red-400">
                <p class="text-xs text-gray-500 font-bold uppercase">Comissões Pagas</p>
                <p class="text-xl xl:text-2xl font-extrabold text-red-600 mt-1">R$ ${dre.variableCosts.toFixed(2)}</p>
            </div>

            <div class="bg-white p-5 rounded-xl shadow-sm border-l-4 border-green-500">
                <p class="text-xs text-gray-500 font-bold uppercase">Lucro Operacional</p>
                <p class="text-xl xl:text-2xl font-extrabold text-green-600 mt-1">R$ ${dre.netProfit.toFixed(2)}</p>
                <p class="text-[10px] text-gray-400 mt-1">Faturamento (-) Comissões</p>
            </div>

            <div class="bg-white p-5 rounded-xl shadow-sm border-l-4 border-blue-500">
                <p class="text-xs text-gray-500 font-bold uppercase">Atendidos</p>
                <p class="text-xl xl:text-2xl font-extrabold text-blue-600 mt-1">${completedAppointments}</p>
                <p class="text-[10px] text-gray-400 mt-1">Concluídos no período</p>
            </div>

            <div class="bg-white p-5 rounded-xl shadow-sm border-l-4 border-yellow-500">
                <p class="text-xs text-gray-500 font-bold uppercase">Ticket Médio</p>
                <p class="text-xl xl:text-2xl font-extrabold text-yellow-600 mt-1">R$ ${ticketMedio.toFixed(2)}</p>
                <p class="text-[10px] text-gray-400 mt-1">Por atendimento</p>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 animate-fade-in">
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <h3 class="font-bold text-gray-700 mb-4">Evolução Mensal</h3>
                <div class="relative h-64"><canvas id="chart-monthly"></canvas></div>
            </div>
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <h3 class="font-bold text-gray-700 mb-4">Faturamento por Profissional</h3>
                <div class="relative h-64 flex justify-center"><canvas id="chart-profs"></canvas></div>
            </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 animate-fade-in">
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <h3 class="font-bold text-gray-700 mb-4">Vendas Diárias</h3>
                <div class="relative h-64"><canvas id="chart-daily"></canvas></div>
            </div>
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <h3 class="font-bold text-gray-700 mb-4">Top Serviços/Produtos</h3>
                <div class="relative h-64"><canvas id="chart-products"></canvas></div>
            </div>
        </div>
    `;

    renderChart('chart-monthly', 'bar', 'Receita Mensal', charts.salesMonthly.labels, charts.salesMonthly.data, chartColors[0]);
    const safeProfLabels = charts.professionals.labels.map(l => escapeHTML(l));
    renderChart('chart-profs', 'doughnut', 'Total Vendas', safeProfLabels, charts.professionals.data, chartColors);
    renderChart('chart-daily', 'line', 'Vendas Diárias', charts.salesDaily.labels, charts.salesDaily.data, chartColors[4]);
    const safeProductLabels = charts.products.labels.map(l => escapeHTML(l));
    renderChart('chart-products', 'bar', 'Total Vendido', safeProductLabels, charts.products.data, chartColors[1]);
}

// --- 8. ABA AGENDAMENTOS (A NOVA, DO PASSO ANTERIOR) ---

function renderAppointmentsTab(container) {
    const appointments = localState.appointmentsData;
    
    // Processamento
    const totalCount = appointments.length;
    let completedCount = 0;
    let cancelledCount = 0;
    let totalValue = 0;
    let cancelledValue = 0;

    const dailyMap = {};
    const professionalMap = {};

    // Popula datas zeradas no range
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
    const byProfessional = Object.values(professionalMap).sort((a,b) => b.count - a.count);

    container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p class="text-xs font-bold text-gray-500 uppercase">Total Agendamentos</p>
                <h3 class="text-3xl font-extrabold text-indigo-600 mt-1">${totalCount - cancelledCount}</h3>
                <p class="text-xs text-green-600 mt-1">${completedCount} concluídos</p>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p class="text-xs font-bold text-gray-500 uppercase">Valor Estimado</p>
                <h3 class="text-3xl font-extrabold text-gray-800 mt-1">R$ ${totalValue.toLocaleString('pt-BR', {minimumFractionDigits:2})}</h3>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p class="text-xs font-bold text-gray-500 uppercase">Cancelamentos</p>
                <h3 class="text-3xl font-extrabold text-red-500 mt-1">${cancelledCount}</h3>
                <p class="text-xs text-red-400 mt-1">Perda: R$ ${cancelledValue.toLocaleString('pt-BR', {minimumFractionDigits:2})}</p>
            </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6 animate-fade-in">
            <h3 class="font-bold text-gray-800 mb-4">Volume Diário</h3>
            <div class="h-64 w-full relative"><canvas id="dailyApptChart"></canvas></div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6 animate-fade-in">
            <div class="flex justify-between items-center mb-4">
                <h3 class="font-bold text-gray-800">Performance por Profissional</h3>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead class="bg-gray-50 text-gray-500 font-semibold border-b">
                        <tr><th class="p-3 text-left">Nome</th><th class="p-3 text-center">Qtd.</th><th class="p-3 text-right">Valor Total</th></tr>
                    </thead>
                    <tbody class="divide-y">
                        ${byProfessional.map(p => `
                            <tr>
                                <td class="p-3 text-gray-800 font-medium">${escapeHTML(p.name)}</td>
                                <td class="p-3 text-center"><span class="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-bold">${p.count}</span></td>
                                <td class="p-3 text-right text-gray-600">R$ ${p.value.toLocaleString('pt-BR', {minimumFractionDigits:2})}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    renderChart('dailyApptChart', 'line', 'Agendamentos', dailyLabels.map(d => d.split('-').reverse().slice(0,2).join('/')), dailyValues, '#4f46e5');
}

// --- 9. ABA DRE (Ressuscitada) ---

function renderDRE(container) {
    const { dreFinancial } = localState.data;

    const revRows = Object.entries(dreFinancial.revenues).map(([nature, val]) => `
        <tr class="text-sm text-gray-600 bg-green-50/30 hover:bg-green-50 transition-colors">
            <td class="pl-8 py-2 border-l-4 border-transparent hover:border-green-400">${escapeHTML(nature)}</td>
            <td class="text-right pr-6 py-2 text-green-700 font-medium">R$ ${val.toFixed(2)}</td>
            <td class="text-right pr-4 text-xs text-gray-400">${dreFinancial.totalRevenues > 0 ? ((val/dreFinancial.totalRevenues)*100).toFixed(1) : 0}%</td>
        </tr>
    `).join('');

    const expRows = Object.entries(dreFinancial.expenses).map(([nature, val]) => `
        <tr class="text-sm text-gray-600 bg-red-50/30 hover:bg-red-50 transition-colors">
            <td class="pl-8 py-2 border-l-4 border-transparent hover:border-red-400">${escapeHTML(nature)}</td>
            <td class="text-right pr-6 py-2 text-red-600 font-medium">- R$ ${val.toFixed(2)}</td>
            <td class="text-right pr-4 text-xs text-gray-400">${dreFinancial.totalRevenues > 0 ? ((val/dreFinancial.totalRevenues)*100).toFixed(1) : 0}%</td>
        </tr>
    `).join('');

    container.innerHTML = `
        <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-fade-in mb-10">
            <div class="bg-gray-900 text-white p-6 text-center relative overflow-hidden">
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                <h2 class="text-xl font-bold uppercase tracking-widest">DRE Gerencial Detalhado</h2>
                <p class="text-sm opacity-75 mt-1">
                    ${new Date(localState.startDate).toLocaleDateString('pt-BR')} até ${new Date(localState.endDate).toLocaleDateString('pt-BR')}
                </p>
            </div>
            
            <table class="w-full">
                <tbody class="divide-y divide-gray-100">
                    <tr class="font-bold text-gray-800 bg-blue-50">
                        <td class="p-4">1. RECEITAS OPERACIONAIS</td>
                        <td class="p-4 text-right text-blue-800 font-extrabold">R$ ${dreFinancial.totalRevenues.toFixed(2)}</td>
                        <td class="p-4 text-right w-24 text-blue-800">100%</td>
                    </tr>
                    ${revRows || '<tr><td colspan="3" class="pl-8 py-3 text-sm text-gray-400 italic">Nenhuma receita lançada no financeiro.</td></tr>'}

                    <tr class="font-bold text-gray-800 bg-orange-50 mt-4 border-t border-orange-100">
                        <td class="p-4">2. (-) CUSTOS E DESPESAS</td>
                        <td class="p-4 text-right text-red-600 font-extrabold">- R$ ${dreFinancial.totalExpenses.toFixed(2)}</td>
                        <td class="p-4 text-right text-xs text-red-600 font-bold">
                            ${dreFinancial.totalRevenues > 0 ? ((dreFinancial.totalExpenses/dreFinancial.totalRevenues)*100).toFixed(1) : 0}%
                        </td>
                    </tr>
                    ${expRows || '<tr><td colspan="3" class="pl-8 py-3 text-sm text-gray-400 italic">Nenhuma despesa lançada no financeiro.</td></tr>'}

                    <tr class="font-extrabold text-white ${dreFinancial.netResult >= 0 ? 'bg-green-600' : 'bg-red-600'} text-lg border-t-4 border-white shadow-inner">
                        <td class="p-6">3. (=) RESULTADO DO EXERCÍCIO</td>
                        <td class="p-6 text-right">R$ ${dreFinancial.netResult.toFixed(2)}</td>
                        <td class="p-6 text-right opacity-90">
                            ${dreFinancial.totalRevenues > 0 ? ((dreFinancial.netResult/dreFinancial.totalRevenues)*100).toFixed(1) : 0}%
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// --- FUNÇÕES UTILITÁRIAS ---

function renderChart(canvasId, type, label, labels, data, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (chartsInstances[canvasId]) chartsInstances[canvasId].destroy();

    const config = {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: Array.isArray(color) ? color : type === 'line' ? 'rgba(79, 70, 229, 0.1)' : color,
                borderColor: Array.isArray(color) ? '#fff' : color,
                borderWidth: 2,
                fill: type === 'line',
                tension: 0.3,
                borderRadius: type === 'bar' ? 4 : 0,
                pointBackgroundColor: '#fff',
                pointBorderColor: color,
                pointHoverBackgroundColor: color
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: type === 'doughnut', position: 'bottom' },
                tooltip: {
                    backgroundColor: 'rgba(17, 24, 39, 0.9)',
                    padding: 10,
                    cornerRadius: 8,
                    callbacks: {
                        label: (context) => {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
                            } else {
                                label += context.raw;
                            }
                            return label;
                        }
                    }
                }
            },
            scales: type === 'doughnut' ? {} : {
                y: {
                    beginAtZero: true,
                    grid: { color: '#f3f4f6' },
                    ticks: { font: { size: 11 } }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 11 } }
                }
            }
        }
    };

    chartsInstances[canvasId] = new Chart(ctx, config);
}