// js/ui/reports.js (Versão Final e Corrigida)

// --- 1. IMPORTAÇÕES ---
import * as reportsApi from '../api/reports.js';
import { state } from '../state.js';
import { showNotification } from '../components/modal.js';

// --- 2. CONSTANTES E VARIÁVEIS DO MÓDULO ---
const contentDiv = document.getElementById('content');
let activeCharts = {};
let currentAnalyticsData = null; // Cache para os dados da visão principal

// --- 3. FUNÇÕES DE LIMPEZA E UTILIDADES ---
function destroyAllCharts() {
    Object.values(activeCharts).forEach(chart => chart?.destroy());
    activeCharts = {};
}

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

async function handleMainChartClick(e, chart, transactionsByMonth) {
    // Esta função será implementada no futuro para o drill-down
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
            <div class="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 class="text-xl font-semibold mb-4 text-gray-700">Desempenho Geral do Período</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="bg-gray-50 p-4 rounded-lg text-center"><h4 class="font-semibold text-gray-500">Receita Total</h4><p id="kpi-revenue" class="kpi-value text-4xl font-bold text-green-600 hidden"></p><div class="kpi-loader h-10 bg-gray-200 rounded-md animate-pulse"></div></div>
                    <div class="bg-gray-50 p-4 rounded-lg text-center"><h4 class="font-semibold text-gray-500">Vendas Totais</h4><p id="kpi-transactions" class="kpi-value text-4xl font-bold text-blue-600 hidden"></p><div class="kpi-loader h-10 bg-gray-200 rounded-md animate-pulse"></div></div>
                    <div class="bg-gray-50 p-4 rounded-lg text-center"><h4 class="font-semibold text-gray-500">Item Mais Popular</h4><p id="kpi-popular-item" class="kpi-value text-3xl font-bold text-indigo-600 hidden"></p><div class="kpi-loader h-9 bg-gray-200 rounded-md animate-pulse"></div></div>
                </div>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold mb-4 text-gray-700">Receita por Mês</h3>
                <div id="chart-container" class="relative h-96"><canvas id="transactionsByMonthChart"></canvas></div>
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
                    backgroundColor: 'rgba(79, 70, 229, 0.8)',
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => `R$ ${c.raw.toFixed(2)}` } } },
                scales: { y: { beginAtZero: true } },
                onClick: (e) => handleMainChartClick(e, activeCharts.main, analyticsData.transactionsByMonth)
            }
        });
    } catch (error) {
        showNotification('Erro', `Não foi possível carregar os relatórios: ${error.message}`, 'error');
        mainReportsView.innerHTML = `<p class="text-red-500 p-8 text-center">Erro ao carregar os dados dos relatórios. Verifique o terminal do servidor para mais detalhes.</p>`;
    }
}

// --- 5. FUNÇÃO PRINCIPAL EXPORTADA ---
// CORREÇÃO: Nome da função corrigido para 'loadReportsPage'
export async function loadReportsPage() {
    destroyAllCharts();
    
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
                <!-- O conteúdo dinâmico será carregado aqui -->
            </div>
        </section>`;
    
    // 2. Adiciona os event listeners aos elementos que agora existem
    document.getElementById('generateReportBtn').addEventListener('click', handleGenerateReport);
    
    // 3. Carrega o relatório inicial com as datas padrão
    await handleGenerateReport();
}

