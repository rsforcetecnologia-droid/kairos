// js/ui/reports.js

// --- 1. IMPORTAÇÕES ---
import * as reportsApi from '../api/reports.js';
import * as professionalsApi from '../api/professionals.js';
import { state } from '../state.js';
import { showGenericModal, showNotification } from '../components/modal.js';

const contentDiv = document.getElementById('content');
let chartsInstances = {}; // Cache dos gráficos

// Paleta de cores consistente
const chartColors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

// --- 2. ESTADO LOCAL ---
const localState = {
    // Filtros Globais
    startDate: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0], // Início do Ano atual
    endDate: new Date().toISOString().split('T')[0], // Hoje
    selectedProfessional: 'all',
    selectedCostCenter: 'all', // Novo filtro
    
    // Dados de Dependências
    professionalsList: [],
    costCentersList: [],

    // Dados Carregados
    data: null, // Dados completos retornados pela API /indicators

    // Controle de Navegação (Views)
    currentTab: 'dashboards', // 'dashboards', 'appointments', 'dre'
    
    // Estado Específico de Agendamentos (Drill-down)
    apptViewMode: 'year', // 'year' ou 'month'
    apptSelectedMonth: null
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

// --- 4. PONTO DE ENTRADA ---
export async function loadReportsPage() {
    contentDiv.innerHTML = `<div class="flex flex-col items-center justify-center h-64"><div class="loader mb-4"></div><p class="text-gray-500">Carregando inteligência de dados...</p></div>`;
    
    try {
        await loadChartJs();
        
        // Carrega dependências em paralelo
        const [profs, costs] = await Promise.all([
            professionalsApi.getProfessionals(state.establishmentId),
            reportsApi.getCostCenters().catch(() => []) // Fallback se módulo financeiro não estiver ativo
        ]);
        
        localState.professionalsList = profs;
        localState.costCentersList = costs;

        renderLayout();
        await fetchAndRenderData();
    } catch (e) {
        contentDiv.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-red-500">
                <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p>Erro ao carregar relatórios: ${e.message}</p>
                <button onclick="window.location.reload()" class="mt-4 px-4 py-2 bg-gray-200 rounded text-gray-700">Tentar Novamente</button>
            </div>`;
    }
}

// --- 5. RENDERIZAÇÃO E LAYOUT ---

function renderLayout() {
    const profOptions = localState.professionalsList.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
    const costOptions = localState.costCentersList.map(c => `<option value="${c.id}">${c.name}</option>`).join('');

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
                            <select id="report-prof" class="border rounded-lg px-2 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none w-full"><option value="all">Todos Profissionais</option>${profOptions}</select>
                            <select id="report-cost" class="border rounded-lg px-2 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none w-full"><option value="all">Todos Centros</option>${costOptions}</select>
                        </div>
                        <div class="flex gap-2">
                            <input type="date" id="report-start" value="${localState.startDate}" class="border rounded-lg px-2 py-2 text-sm w-full">
                            <input type="date" id="report-end" value="${localState.endDate}" class="border rounded-lg px-2 py-2 text-sm w-full">
                            <button id="btn-filter" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 shadow-sm transition">
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

    updateTabsUI(); // Define estado inicial dos botões
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
    
    // Reseta visualizações de drill-down
    localState.apptViewMode = 'year';
    localState.apptSelectedMonth = null;

    await fetchAndRenderData();
}

async function fetchAndRenderData() {
    const container = document.getElementById('report-content');
    container.innerHTML = `<div class="flex justify-center py-20"><div class="loader"></div></div>`;

    try {
        const data = await reportsApi.getAdvancedIndicators(
            localState.startDate, 
            localState.endDate, 
            localState.selectedProfessional,
            localState.selectedCostCenter
        );
        localState.data = data;
        renderCurrentView();
    } catch (error) {
        console.error(error);
        container.innerHTML = `
            <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700 text-center">
                <p class="font-bold">Erro ao carregar dados</p>
                <p class="text-sm">${error.message || 'Verifique sua conexão.'}</p>
            </div>`;
    }
}

function renderCurrentView() {
    const container = document.getElementById('report-content');
    
    // Roteamento de Views
    switch(localState.currentTab) {
        case 'dashboards':
            renderFinancialDashboards(container);
            break;
        case 'appointments':
            renderAppointmentsDashboard(container);
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
    renderChart('chart-profs', 'doughnut', 'Total Vendas', charts.professionals.labels, charts.professionals.data, chartColors);
    renderChart('chart-daily', 'line', 'Vendas Diárias', charts.salesDaily.labels, charts.salesDaily.data, chartColors[4]);
    renderChart('chart-products', 'bar', 'Total Vendido', charts.products.labels, charts.products.data, chartColors[1]);
}

// --- 8. ABA AGENDAMENTOS (CORRIGIDA) ---

function renderAppointmentsDashboard(container) {
    const { charts } = localState.data;

    let headerHtml = `<h3 class="font-bold text-gray-700 text-lg">Visão Anual/Mensal</h3>`;
    let subtext = `Clique na barra do Mês para detalhar os dias`;

    if (localState.apptViewMode === 'month') {
        headerHtml = `
            <div class="flex items-center gap-4">
                <button id="btn-back-year" class="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-bold bg-indigo-50 px-3 py-1 rounded transition hover:bg-indigo-100">
                    ← Voltar
                </button>
                <h3 class="font-bold text-gray-700 text-lg">Detalhes de ${localState.apptSelectedMonth}</h3>
            </div>`;
        subtext = `Clique na barra do Dia para ver a lista de clientes`;
    }

    container.innerHTML = `
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-fade-in">
            <div class="mb-6 flex justify-between items-center flex-wrap gap-2">
                ${headerHtml}
                <div class="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                    ${subtext}
                </div>
            </div>
            <div class="relative h-80">
                <canvas id="chart-appointments"></canvas>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div class="bg-blue-50 p-4 rounded-lg text-center border border-blue-100">
                <span class="block text-2xl font-bold text-blue-600">${charts.appointmentsStatus.scheduled || 0}</span>
                <span class="text-xs text-blue-400 uppercase font-bold tracking-wider">Agendados</span>
            </div>
            <div class="bg-green-50 p-4 rounded-lg text-center border border-green-100">
                <span class="block text-2xl font-bold text-green-600">${charts.appointmentsStatus.completed || 0}</span>
                <span class="text-xs text-green-400 uppercase font-bold tracking-wider">Concluídos</span>
            </div>
            <div class="bg-red-50 p-4 rounded-lg text-center border border-red-100">
                <span class="block text-2xl font-bold text-red-600">${charts.appointmentsStatus.canceled || 0}</span>
                <span class="text-xs text-red-400 uppercase font-bold tracking-wider">Cancelados</span>
            </div>
        </div>
    `;
    
    // Configura o botão de voltar ANTES de renderizar o gráfico
    const backBtn = document.getElementById('btn-back-year');
    if (backBtn) {
        backBtn.onclick = () => {
            localState.apptViewMode = 'year';
            localState.apptSelectedMonth = null;
            renderAppointmentsDashboard(container);
        };
    }

    // Tenta renderizar o gráfico com proteção contra erros
    try {
        renderInteractiveApptChart();
    } catch (e) {
        console.error("Erro ao renderizar gráfico de agendamentos:", e);
    }
}

function renderInteractiveApptChart() {
    const ctx = document.getElementById('chart-appointments').getContext('2d');
    if (chartsInstances['chart-appointments']) chartsInstances['chart-appointments'].destroy();

    const { charts } = localState.data;
    let labels, dataValues;

    if (localState.apptViewMode === 'year') {
        // Visão Geral (Meses)
        labels = charts.appointmentsMonthly.labels;
        dataValues = charts.appointmentsMonthly.data;
    } else {
        // CORREÇÃO ROBUSTA: Extração de mês e ano usando Regex
        // Captura: (letras ou pontos para o mês) + (separador qualquer) + (2 ou 4 dígitos para o ano)
        const parts = localState.apptSelectedMonth.match(/([a-zç\.]+)(?:[\/\s\-]*)(\d{2,4})/i);
        
        if (!parts) {
            console.error("Formato de mês não reconhecido:", localState.apptSelectedMonth);
            return;
        }

        // Limpa o mês (remove pontos)
        const cleanMStr = parts[1].toLowerCase().replace(/\./g, '').trim();
        const yStr = parts[2];
        const fullYear = yStr.length === 2 ? '20' + yStr : yStr;

        const monthMap = { 
            'jan': '01', 'fev': '02', 'mar': '03', 'abr': '04', 'mai': '05', 'jun': '06', 
            'jul': '07', 'ago': '08', 'set': '09', 'out': '10', 'nov': '11', 'dez': '12',
            'janeiro': '01', 'fevereiro': '02', 'março': '03', 'abril': '04', 'maio': '05', 'junho': '06',
            'julho': '07', 'agosto': '08', 'setembro': '09', 'outubro': '10', 'novembro': '11', 'dezembro': '12'
        };
        
        const mNum = monthMap[cleanMStr] || '01'; // Fallback seguro
        const targetSuffix = `/${mNum}/${fullYear}`;

        const filteredEntries = Object.entries(charts.appointmentsDaily.data).map(([k, v], i) => {
            const dateKey = charts.appointmentsDaily.labels[i];
            // Verifica se a data (ex: 05/10/2023) contém o sufixo (ex: /10/2023)
            if (dateKey.includes(targetSuffix)) return { label: dateKey, value: v };
            return null;
        }).filter(Boolean);

        labels = filteredEntries.map(e => e.label);
        dataValues = filteredEntries.map(e => e.value);
    }

    const config = {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Volume de Agendamentos',
                data: dataValues,
                backgroundColor: localState.apptViewMode === 'year' ? '#3b82f6' : '#8b5cf6',
                borderRadius: 4,
                hoverBackgroundColor: '#1e40af'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            onClick: (e, elements) => {
                if (elements.length > 0) {
                    const index = elements[0].index;
                    const label = labels[index];
                    handleApptChartClick(label);
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => ` ${context.raw} Agendamentos`
                    }
                }
            }
        }
    };

    chartsInstances['chart-appointments'] = new Chart(ctx, config);
}

function handleApptChartClick(label) {
    if (localState.apptViewMode === 'year') {
        localState.apptViewMode = 'month';
        localState.apptSelectedMonth = label;
        renderAppointmentsDashboard(document.getElementById('report-content'));
    } else if (localState.apptViewMode === 'month') {
        openDayDetailsModal(label);
    }
}

async function openDayDetailsModal(dateStr) {
    // Parser seguro da data DD/MM/YYYY
    const [d, m, y] = dateStr.split('/');
    const apiDate = `${y}-${m}-${d}`;

    showGenericModal({
        title: `Carregando...`,
        contentHTML: `<div class="p-8 text-center"><div class="loader mx-auto"></div></div>`,
        maxWidth: 'max-w-2xl'
    });

    try {
        const list = await reportsApi.getDailyAppointments(apiDate, localState.selectedProfessional);
        
        let html = '';
        if (list.length === 0) {
            html = '<div class="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">Nenhum agendamento encontrado para este dia.</div>';
        } else {
            // CORREÇÃO: Tabela com coluna Profissional
            html = `
                <div class="overflow-hidden border rounded-lg max-h-[60vh] overflow-y-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50 sticky top-0 z-10">
                            <tr>
                                <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Hora</th>
                                <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Profissional</th>
                                <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Cliente</th>
                                <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Serviço</th>
                                <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200 text-sm">
                            ${list.map(appt => `
                                <tr class="hover:bg-gray-50 transition-colors">
                                    <td class="px-4 py-3 font-bold text-gray-900">${appt.time || '--:--'}</td>
                                    <td class="px-4 py-3 text-indigo-700 font-medium">${appt.professionalName || 'N/A'}</td>
                                    <td class="px-4 py-3 text-gray-700">${appt.clientName || 'Cliente'}</td>
                                    <td class="px-4 py-3 text-gray-500">${appt.serviceName || 'Serviço'}</td>
                                    <td class="px-4 py-3">
                                        <span class="px-2 py-1 rounded-full text-xs font-bold ${
                                            appt.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                            appt.status === 'canceled' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                                        }">
                                            ${appt.status === 'completed' ? 'Concluído' : appt.status === 'canceled' ? 'Cancelado' : 'Agendado'}
                                        </span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }

        const modalBody = document.querySelector('.modal-content-body');
        if(modalBody) {
             modalBody.innerHTML = html;
             document.querySelector('.modal-title').innerText = `Agendamentos de ${dateStr}`;
        } else {
             document.getElementById('genericModal').style.display = 'none';
             showGenericModal({
                title: `Agendamentos de ${dateStr}`,
                contentHTML: html,
                maxWidth: 'max-w-4xl'
            });
        }

    } catch (e) {
        showNotification('Erro', 'Não foi possível carregar os detalhes do dia.', 'error');
        document.getElementById('genericModal').style.display = 'none';
    }
}

// --- 9. ABA DRE (Detalhado por Natureza) ---

function renderDRE(container) {
    const { dreFinancial } = localState.data;

    // Linhas de Receita (Agrupadas)
    const revRows = Object.entries(dreFinancial.revenues).map(([nature, val]) => `
        <tr class="text-sm text-gray-600 bg-green-50/30 hover:bg-green-50 transition-colors">
            <td class="pl-8 py-2 border-l-4 border-transparent hover:border-green-400">${nature}</td>
            <td class="text-right pr-6 py-2 text-green-700 font-medium">R$ ${val.toFixed(2)}</td>
            <td class="text-right pr-4 text-xs text-gray-400">${dreFinancial.totalRevenues > 0 ? ((val/dreFinancial.totalRevenues)*100).toFixed(1) : 0}%</td>
        </tr>
    `).join('');

    // Linhas de Despesa (Agrupadas)
    const expRows = Object.entries(dreFinancial.expenses).map(([nature, val]) => `
        <tr class="text-sm text-gray-600 bg-red-50/30 hover:bg-red-50 transition-colors">
            <td class="pl-8 py-2 border-l-4 border-transparent hover:border-red-400">${nature}</td>
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
            
            <div class="p-4 bg-gray-50 text-center border-t border-gray-200">
                <p class="text-xs text-gray-500">
                    * Este relatório baseia-se nos lançamentos de Contas a Pagar/Receber e Naturezas Financeiras.
                    Verifique se todos os lançamentos estão categorizados corretamente.
                </p>
            </div>
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