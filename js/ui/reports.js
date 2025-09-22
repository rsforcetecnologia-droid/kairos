// js/ui/reports.js (Versão Final e Corrigida)

// --- 1. IMPORTAÇÕES ---
import * as reportsApi from '../api/reports.js';
import { state } from '../state.js';
import { showNotification } from '../components/modal.js';

// --- 2. CONSTANTES E VARIÁVEIS DO MÓDULO ---
const contentDiv = document.getElementById('content');
let activeCharts = {};
let currentAnalyticsData = null; // Cache para os dados da visão principal
let selectedMonthlyAnalytics = null; // Cache para os dados da visão mensal
let currentView = 'main'; // 'main', 'monthly', 'professional'
let selectedDate = { year: null, month: null, monthName: null, professionalId: null, professionalName: null };

// --- 3. FUNÇÕES DE LIMPEZA E UTILIDADES ---
function destroyAllCharts() {
    Object.values(activeCharts).forEach(chart => chart?.destroy());
    activeCharts = {};
}

// Paleta de cores de alto contraste
const chartColors = [
    '#4f46e5', // Indigo
    '#22c55e', // Green
    '#f97316', // Orange
    '#06b6d4', // Cyan
    '#e11d48', // Rose
    '#6366f1', // Indigo Light
    '#84cc16', // Lime
    '#f59e0b', // Amber
];

// --- 4. FUNÇÕES DE RENDERIZAÇÃO E LÓGICA ---
function renderKPIs(kpis) {
    const kpiRevenue = document.getElementById('kpi-revenue');
    const kpiTransactions = document.getElementById('kpi-transactions');
    const kpiPopularItem = document.getElementById('kpi-popular-item');

    if (kpiRevenue) kpiRevenue.textContent = `R$ ${kpis.totalRevenue.toFixed(2)}`;
    if (kpiTransactions) kpiTransactions.textContent = kpis.totalTransactions;
    if (kpiPopularItem) kpiPopularItem.textContent = kpis.mostPopularItem || 'N/A';

    document.querySelectorAll('.kpi-loader').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.kpi-value').forEach(el => el.classList.remove('hidden'));
}

async function renderMonthlyDetailsView(year, month, monthName) {
    currentView = 'monthly';
    selectedDate = { year, month, monthName };
    contentDiv.innerHTML = `
        <section>
            <div class="flex justify-between items-center mb-6">
                <button id="backToMainBtn" class="py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">
                    < Voltar
                </button>
                <h2 class="text-3xl font-bold text-gray-800">Detalhes de ${monthName}</h2>
                <div></div>
            </div>
            <div class="loader-container p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>
            <div id="monthly-details-view" class="hidden">
                 <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="bg-white p-4 rounded-lg shadow-md border">
                        <h3 class="font-semibold text-center mb-2">Receita Diária</h3>
                        <canvas id="monthlyRevenueChart"></canvas>
                        <p class="text-xs text-center text-gray-500 mt-2">Clique nas barras para ver detalhes do dia.</p>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow-md border">
                        <h3 class="font-semibold text-center mb-2">Vendas por Profissional</h3>
                        <canvas id="salesByProfessionalChart"></canvas>
                        <p class="text-xs text-center text-gray-500 mt-2">Clique nas fatias para ver o detalhe do profissional.</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                     <div class="bg-white p-4 rounded-lg shadow-md border">
                        <h3 class="font-semibold text-center mb-2">Itens Mais Vendidos</h3>
                        <canvas id="topItemsChart"></canvas>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow-md border">
                        <h3 class="font-semibold text-center mb-2">Tipo de Venda</h3>
                        <canvas id="revenueByTypeChart"></canvas>
                    </div>
                </div>
            </div>
        </section>`;
    
    document.getElementById('backToMainBtn').addEventListener('click', loadReportsPage);
    
    try {
        const details = await reportsApi.getMonthlyAnalytics(state.establishmentId, year, month);
        selectedMonthlyAnalytics = details;

        document.querySelector('.loader-container').classList.add('hidden');
        document.getElementById('monthly-details-view').classList.remove('hidden');

        const revenueLabels = details.revenueByDay.map(d => d.day);
        const revenueData = details.revenueByDay.map(d => d.revenue);

        const profLabels = details.salesByProfessional.map(p => p.name);
        const profData = details.salesByProfessional.map(p => p.count);
        
        const topItemsLabels = details.topItems.map(i => i.name);
        const topItemsData = details.topItems.map(i => i.count);
        
        const revenueLabelsPie = ['Agendamentos', 'Vendas Avulsas'];
        const revenueDataPie = [details.revenueByTransactionType.appointment, details.revenueByTransactionType.sales];

        destroyAllCharts();

        activeCharts.monthlyRevenue = new Chart(document.getElementById('monthlyRevenueChart').getContext('2d'), {
            type: 'bar',
            data: { labels: revenueLabels, datasets: [{ label: 'Receita Diária', data: revenueData, backgroundColor: chartColors[0] }] },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
                onClick: (e, elements) => {
                    if (elements.length > 0) {
                        const day = revenueLabels[elements[0].index];
                        renderDailyDetailsView(year, month, day);
                    }
                }
            }
        });
        activeCharts.salesByProfessional = new Chart(document.getElementById('salesByProfessionalChart').getContext('2d'), {
            type: 'pie',
            data: { 
                labels: profLabels, 
                datasets: [{ 
                    label: 'Vendas', 
                    data: profData, 
                    backgroundColor: chartColors,
                    hoverOffset: 16
                }] 
            },
            options: { 
                responsive: true,
                plugins: { legend: { position: 'right' } },
                onClick: (e, elements) => {
                    if (elements.length > 0) {
                        const profIndex = elements[0].index;
                        const professional = details.salesByProfessional[profIndex];
                        if (professional) {
                            renderProfessionalDetailsView(year, month, professional.id, professional.name);
                        }
                    }
                }
            }
        });
        activeCharts.topItems = new Chart(document.getElementById('topItemsChart').getContext('2d'), {
            type: 'bar',
            data: { labels: topItemsLabels, datasets: [{ label: 'Itens Vendidos', data: topItemsData, backgroundColor: chartColors[2] }] },
            options: { 
                indexAxis: 'y', 
                responsive: true, 
                plugins: { legend: { display: false } }, 
                scales: { x: { beginAtZero: true } }
            }
        });
        activeCharts.revenueByType = new Chart(document.getElementById('revenueByTypeChart').getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: revenueLabelsPie,
                datasets: [{
                    label: 'Receita por Tipo',
                    data: revenueDataPie,
                    backgroundColor: [chartColors[1], chartColors[3]],
                    hoverOffset: 16
                }]
            },
            options: { responsive: true, plugins: { legend: { position: 'right' } } }
        });

    } catch(error) {
        showNotification('Erro', `Não foi possível carregar os detalhes do mês: ${error.message}`, 'error');
        loadReportsPage();
    }
}

async function renderDailyDetailsView(year, month, day) {
    currentView = 'daily';
    selectedDate = { ...selectedDate, day };
    
    contentDiv.innerHTML = `
        <section>
            <div class="flex justify-between items-center mb-6">
                <button id="backToMonthlyBtn" class="py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">
                    < Voltar
                </button>
                <h2 class="text-3xl font-bold text-gray-800">Detalhes do Dia ${day}/${month + 1}/${year}</h2>
                <div></div>
            </div>
            <div class="loader-container p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>
            <div id="daily-details-view" class="hidden">
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-center mb-6">
                    <div class="bg-blue-50 p-4 rounded-lg shadow-sm"><p class="text-gray-500">Total de Vendas</p><p id="daily-total-transactions" class="text-3xl font-bold text-blue-600"></p></div>
                    <div class="bg-green-50 p-4 rounded-lg shadow-sm"><p class="text-gray-500">Receita Gerada</p><p id="daily-total-revenue" class="text-3xl font-bold text-green-600"></p></div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-md max-h-[60vh] overflow-y-auto">
                    <h3 class="font-semibold text-xl mb-4">Detalhes das Transações</h3>
                    <table class="min-w-full text-sm">
                        <thead class="bg-gray-100">
                            <tr>
                                <th class="px-4 py-2 text-left">Hora</th>
                                <th class="px-4 py-2 text-left">Cliente</th>
                                <th class="px-4 py-2 text-left">Profissional</th>
                                <th class="px-4 py-2 text-left">Serviços/Itens</th>
                                <th class="px-4 py-2 text-right">Valor</th>
                                <th class="px-4 py-2 text-center">Tipo</th>
                            </tr>
                        </thead>
                        <tbody id="daily-transactions-list"></tbody>
                    </table>
                </div>
            </div>
        </section>`;

    document.getElementById('backToMonthlyBtn').addEventListener('click', () => {
        renderMonthlyDetailsView(selectedDate.year, selectedDate.month, selectedDate.monthName);
    });

    try {
        const details = await reportsApi.getDailyTransactions(state.establishmentId, year, month, day);

        document.querySelector('.loader-container').classList.add('hidden');
        document.getElementById('daily-details-view').classList.remove('hidden');

        document.getElementById('daily-total-transactions').textContent = details.summary.totalTransactions;
        document.getElementById('daily-total-revenue').textContent = `R$ ${details.summary.totalRevenue.toFixed(2)}`;
        
        const transactionList = document.getElementById('daily-transactions-list');
        transactionList.innerHTML = details.transactions.map(t => `
            <tr class="border-b hover:bg-gray-50">
                <td class="px-4 py-2">${new Date(t.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</td>
                <td class="px-4 py-2">${t.client}</td>
                <td class="px-4 py-2">${t.professionalName || 'N/A'}</td>
                <td class="px-4 py-2">${t.items}</td>
                <td class="px-4 py-2 text-right">R$ ${t.value.toFixed(2)}</td>
                <td class="px-4 py-2 text-center">${t.type}</td>
            </tr>
        `).join('');

    } catch (error) {
        showNotification('Erro', `Não foi possível carregar os detalhes diários: ${error.message}`, 'error');
        renderMonthlyDetailsView(selectedDate.year, selectedDate.month, selectedDate.monthName);
    }
}


async function renderProfessionalDetailsView(year, month, professionalId, professionalName) {
    currentView = 'professional';
    selectedDate = { year, month, professionalId, professionalName };
    contentDiv.innerHTML = `
        <section>
            <div class="flex justify-between items-center mb-6">
                <button id="backToMonthlyBtn" class="py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">
                    < Voltar
                </button>
                <h2 class="text-3xl font-bold text-gray-800">Relatório de ${professionalName}</h2>
                <div></div>
            </div>
            <div class="loader-container p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>
            <div id="professional-details-view" class="hidden">
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-center mb-6">
                    <div class="bg-blue-50 p-4 rounded-lg shadow-sm"><p class="text-gray-500">Total de Vendas</p><p id="prof-total-transactions" class="text-3xl font-bold text-blue-600"></p></div>
                    <div class="bg-green-50 p-4 rounded-lg shadow-sm"><p class="text-gray-500">Receita Gerada</p><p id="prof-total-revenue" class="text-3xl font-bold text-green-600"></p></div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-md max-h-[60vh] overflow-y-auto">
                    <h3 class="font-semibold text-xl mb-4">Detalhes das Transações</h3>
                    <table class="min-w-full text-sm">
                        <thead class="bg-gray-100">
                            <tr>
                                <th class="px-4 py-2 text-left">Data</th>
                                <th class="px-4 py-2 text-left">Cliente</th>
                                <th class="px-4 py-2 text-left">Serviços/Itens</th>
                                <th class="px-4 py-2 text-right">Valor</th>
                            </tr>
                        </thead>
                        <tbody id="prof-transactions-list"></tbody>
                    </table>
                </div>
            </div>
        </section>`;
    
    document.getElementById('backToMonthlyBtn').addEventListener('click', () => {
        renderMonthlyDetailsView(selectedDate.year, selectedDate.month, selectedDate.monthName);
    });
    
    try {
        const details = await reportsApi.getProfessionalMonthlyDetails(state.establishmentId, year, month, professionalId);
        
        document.querySelector('.loader-container').classList.add('hidden');
        document.getElementById('professional-details-view').classList.remove('hidden');

        document.getElementById('prof-total-transactions').textContent = details.summary.totalTransactions;
        document.getElementById('prof-total-revenue').textContent = `R$ ${details.summary.totalRevenue.toFixed(2)}`;
        
        const transactionList = document.getElementById('prof-transactions-list');
        transactionList.innerHTML = details.transactions.map(t => `
            <tr class="border-b hover:bg-gray-50">
                <td class="px-4 py-2">${new Date(t.date).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</td>
                <td class="px-4 py-2">${t.client}</td>
                <td class="px-4 py-2">${t.items}</td>
                <td class="px-4 py-2 text-right">R$ ${t.value.toFixed(2)}</td>
            </tr>
        `).join('');

    } catch (error) {
        showNotification('Erro', `Não foi possível carregar os detalhes do profissional: ${error.message}`, 'error');
        renderMonthlyDetailsView(selectedDate.year, selectedDate.month, selectedDate.monthName);
    }
}


async function handleMainChartClick(e, chart, transactionsByMonth) {
    const activePoints = chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false);
    if (activePoints.length > 0) {
        const firstPoint = activePoints[0];
        const monthIndex = firstPoint.index;
        const selectedMonth = transactionsByMonth[monthIndex];
        if (selectedMonth) {
            await renderMonthlyDetailsView(selectedMonth.year, selectedMonth.monthIndex, selectedMonth.month);
        }
    }
}

async function handleGenerateReport() {
    const mainReportsView = document.getElementById('main-reports-view');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');

    if (!mainReportsView || !startDateInput || !endDateInput) {
        console.error("Elementos essenciais para o relatório não foram encontrados no DOM.");
        return;
    }

    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    if (!startDate || !endDate) {
        return showNotification('Atenção', 'Por favor, selecione as datas de início e fim.', 'error');
    }

    mainReportsView.innerHTML = `<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>`;

    try {
        const analyticsData = await reportsApi.getAnalytics(state.establishmentId, startDate, endDate);
        currentAnalyticsData = analyticsData;
        
        mainReportsView.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 class="font-semibold text-gray-500">Receita Total</h3>
                    <p id="kpi-revenue" class="kpi-value text-4xl font-bold text-green-600 hidden"></p>
                    <div class="kpi-loader h-10 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 class="font-semibold text-gray-500">Vendas Totais</h3>
                    <p id="kpi-transactions" class="kpi-value text-4xl font-bold text-blue-600 hidden"></p>
                    <div class="kpi-loader h-10 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 class="font-semibold text-gray-500">Item Mais Popular</h3>
                    <p id="kpi-popular-item" class="kpi-value text-2xl font-bold text-indigo-600 hidden"></p>
                    <div class="kpi-loader h-8 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold mb-4 text-gray-700">Receita por Mês</h3>
                <div id="chart-container" class="relative h-96">
                    <canvas id="transactionsByMonthChart"></canvas>
                    <p class="text-xs text-center text-gray-500 mt-2">Clique nas barras para ver detalhes do mês.</p>
                </div>
            </div>`;
        
        renderKPIs(analyticsData.kpis);

        const ctx = document.getElementById('transactionsByMonthChart').getContext('2d');
        destroyAllCharts();
        activeCharts.main = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: analyticsData.transactionsByMonth.map(item => item.month),
                datasets: [{
                    label: 'Receita Total',
                    data: analyticsData.transactionsByMonth.map(item => item.revenue),
                    backgroundColor: chartColors[0],
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (c) => `R$ ${c.raw.toFixed(2)}`
                        }
                    }
                },
                scales: {
                    y: { beginAtZero: true }
                },
                onClick: (e, elements) => handleMainChartClick(e, activeCharts.main, analyticsData.transactionsByMonth)
            }
        });
    } catch (error) {
        showNotification('Erro', `Não foi possível carregar os relatórios: ${error.message}`, 'error');
        mainReportsView.innerHTML = `<p class="text-red-500 p-8 text-center">Erro ao carregar os dados dos relatórios. Verifique o terminal do servidor para mais detalhes.</p>`;
    }
}

// --- 5. FUNÇÃO PRINCIPAL EXPORTADA ---
export async function loadReportsPage() {
    destroyAllCharts();
    currentView = 'main';
    
    const today = new Date().toISOString().split('T')[0];
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];

    // 1. Renderiza a estrutura estática da página
    contentDiv.innerHTML = `
        <section>
            <div class="flex flex-wrap gap-4 justify-between items-center mb-6">
                <h2 class="text-3xl font-bold text-gray-800">Dashboard de Analytics</h2>
                <div class="flex items-center gap-4 bg-white p-3 rounded-lg shadow-md">
                    <div><label for="startDate" class="text-sm font-medium">De:</label><input type="date" id="startDate" value="${thirtyDaysAgoStr}" class="p-2 border rounded-md"></div>
                    <div><label for="endDate" class="text-sm font-medium">Até:</label><input type="date" id="endDate" value="${today}" class="p-2 border rounded-md"></div>
                    <button id="generateReportBtn" class="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Gerar Relatório</button>
                </div>
            </div>
            <div id="main-reports-view">
                </div>
        </section>`;
    
    // 2. Adiciona os event listeners aos elementos que agora existem
    document.getElementById('generateReportBtn').addEventListener('click', handleGenerateReport);
    
    // 3. Carrega o relatório inicial com as datas padrão
    await handleGenerateReport();
}