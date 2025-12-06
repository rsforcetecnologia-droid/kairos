// js/ui/commissions.js

import * as commissionsApi from '../api/commissions.js';
import * as professionalsApi from '../api/professionals.js';
import { state } from '../state.js';
import { showNotification, showConfirmation, showGenericModal } from '../components/modal.js';

// --- ESTADO LOCAL ---
const today = new Date();
const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

const localState = {
    currentTab: 'dashboard', 
    professionals: [],
    calculationResult: null, 
    historyData: [],         
    periodString: '',
    
    // Filtros do Dashboard
    dashStartDate: firstDay.toISOString().split('T')[0],
    dashEndDate: today.toISOString().split('T')[0],
    dashStats: { revenue: 0, commissions: 0 },

    // Filtros do Histórico (Pesquisa)
    histStartDate: firstDay.toISOString().split('T')[0],
    histEndDate: today.toISOString().split('T')[0],
    histProfessionalId: 'all'
};

let pageClickHandler = null; 
const contentDiv = document.getElementById('content');

// --- PONTO DE ENTRADA ---
export async function loadCommissionsPage() {
    try {
        localState.professionals = await professionalsApi.getProfessionals(state.establishmentId);
    } catch (e) {
        console.error("Erro profissionais", e);
    }

    renderLayout();
    setupGlobalEventListeners(); 
    
    // Carrega dados iniciais do Dashboard
    updateDashboardStats();
    navigateToTab('dashboard');
}

// --- CONFIGURAÇÃO DE EVENTOS ---
function setupGlobalEventListeners() {
    if (pageClickHandler) contentDiv.removeEventListener('click', pageClickHandler);

    pageClickHandler = (e) => {
        const target = e.target.closest('button');
        if (!target) return;

        const action = target.dataset.action;
        const id = target.dataset.id;
        const idx = target.dataset.idx;

        switch (action) {
            // Navegação
            case 'tab-nav': navigateToTab(target.dataset.tab); break;
            
            // Calculadora
            case 'toggle-all-profs': toggleAllProfs(); break;
            case 'back-to-filters': 
                localState.calculationResult = null;
                renderCalculator(document.getElementById('commissions-content'));
                break;
            case 'view-preview-items': openPreviewItemsModal(idx); break;
            case 'save-final-report': handleSaveReports(); break;
            case 'start-new-calc': navigateToTab('calculator'); break;

            // Histórico e Dashboard
            case 'print-receipt': handlePrintReceipt(id); break;
            case 'delete-report': handleDeleteReport(id); break;
            case 'filter-dashboard': updateDashboardStats(); break;
            case 'filter-history': updateHistoryList(); break;
        }
    };

    contentDiv.addEventListener('click', pageClickHandler);

    // Listeners de Input para recálculo na prévia
    contentDiv.oninput = (e) => {
        if (e.target.classList.contains('input-debit') || e.target.classList.contains('input-credit')) {
            const idx = e.target.dataset.idx;
            recalculateSingleRow(idx);
        }
    };
    
    // Listeners de Submit
    contentDiv.onsubmit = (e) => {
        if (e.target.id === 'calc-form') {
            e.preventDefault();
            handleCalculateSubmit();
        }
    };
}

// --- LÓGICA DO DASHBOARD ---
async function updateDashboardStats() {
    // Pega valores dos inputs se existirem, senão usa estado
    const startEl = document.getElementById('dash-start');
    const endEl = document.getElementById('dash-end');
    
    if (startEl) localState.dashStartDate = startEl.value;
    if (endEl) localState.dashEndDate = endEl.value;

    const container = document.getElementById('dashboard-stats-container');
    if(container) container.innerHTML = '<div class="flex justify-center py-10"><div class="loader"></div></div>';

    try {
        const stats = await commissionsApi.getDashboardStats(localState.dashStartDate, localState.dashEndDate);
        localState.dashStats = {
            revenue: stats.totalRevenue || 0,
            commissions: stats.totalCommissionsPaid || 0
        };
        // Se a aba estiver ativa, re-renderiza só a parte dos cards
        if (localState.currentTab === 'dashboard') {
            renderDashboardContent(document.getElementById('commissions-content'));
        }
    } catch (error) {
        console.error(error);
        if(container) container.innerHTML = '<p class="text-red-500 text-center">Erro ao carregar dados.</p>';
    }
}

// --- LÓGICA DO HISTÓRICO (PESQUISA) ---
async function updateHistoryList() {
    const startEl = document.getElementById('hist-start');
    const endEl = document.getElementById('hist-end');
    const profEl = document.getElementById('hist-prof');

    if (startEl) localState.histStartDate = startEl.value;
    if (endEl) localState.histEndDate = endEl.value;
    if (profEl) localState.histProfessionalId = profEl.value;

    const container = document.getElementById('history-list-container');
    if (!container) return;

    container.innerHTML = '<div class="flex justify-center py-10"><div class="loader"></div></div>';

    try {
        const history = await commissionsApi.getCommissionHistory({
            startDate: localState.histStartDate,
            endDate: localState.histEndDate,
            professionalId: localState.histProfessionalId
        });
        localState.historyData = history;
        renderHistoryList(container, history);
    } catch (error) {
        container.innerHTML = '<p class="text-red-500 text-center py-4">Erro ao buscar registros.</p>';
    }
}


// --- LÓGICA DA CALCULADORA (Mantida igual ao anterior, resumida aqui) ---
function toggleAllProfs() {
    const checkboxes = document.querySelectorAll('.prof-checkbox');
    const allChecked = Array.from(checkboxes).every(c => c.checked);
    checkboxes.forEach(c => c.checked = !allChecked);
}

// ... (Funções openPreviewItemsModal, recalculateSingleRow, etc. mantêm-se iguais) ...
// Vou incluir apenas as principais mudanças no renderLayout e renders das abas

async function handleCalculateSubmit() {
    const profIds = Array.from(document.querySelectorAll('.prof-checkbox:checked')).map(c => c.value);
    if (profIds.length === 0) return showNotification('Atenção', 'Selecione profissionais', 'error');

    const params = {
        professionalIds: profIds,
        startDate: document.getElementById('start-date').value,
        endDate: document.getElementById('end-date').value,
        calculationTypes: {
            services: document.getElementById('type-services').checked,
            products: document.getElementById('type-products').checked,
            packages: document.getElementById('type-packages').checked,
        }
    };
    
    // Atualiza string do período para salvar depois
    const sDate = new Date(params.startDate + 'T00:00:00').toLocaleDateString('pt-BR');
    const eDate = new Date(params.endDate + 'T00:00:00').toLocaleDateString('pt-BR');
    localState.periodString = `${sDate} a ${eDate}`;

    const container = document.getElementById('commissions-content');
    container.innerHTML = `<div class="flex flex-col items-center justify-center py-20"><div class="loader mb-4"></div><p class="text-gray-500 animate-pulse">Calculando...</p></div>`;

    try {
        const results = await commissionsApi.calculateCommission(params);
        localState.calculationResult = results.map(r => ({ ...r, extraDebit: 0, extraCredit: 0, finalValue: r.summary.totalCommission, notes: '' }));
        renderCalculator(container);
    } catch (error) {
        showNotification('Erro', error.message, 'error');
        localState.calculationResult = null;
        renderCalculator(container);
    }
}

// ... (handleSaveReports, handlePrintReceipt, handleDeleteReport, generateReceiptPDF mantidos) ...
// Para brevidade, vou focar na renderização nova abaixo.

// --- RENDERIZAÇÃO ---

function renderLayout() {
    contentDiv.innerHTML = `
        <div class="flex flex-col min-h-screen bg-gray-50 pb-20 md:pb-0">
            <header class="bg-white shadow-sm border-b sticky top-0 z-20">
                <div class="max-w-7xl mx-auto px-4">
                    <div class="flex flex-col md:flex-row justify-between h-auto md:h-16 items-center py-2 md:py-0">
                        <div class="flex items-center gap-2 w-full md:w-auto mb-2 md:mb-0">
                            <span class="bg-indigo-100 text-indigo-600 p-2 rounded-lg">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </span>
                            <h1 class="text-xl font-bold text-gray-800">Comissões</h1>
                        </div>
                        <nav class="flex w-full md:w-auto space-x-2 bg-gray-50 p-1 rounded-lg overflow-x-auto scrollbar-hide">
                            <button data-action="tab-nav" data-tab="dashboard" id="tab-dashboard" class="flex-1 md:flex-none text-center px-4 py-2 rounded-md text-sm font-medium transition-all">Visão Geral</button>
                            <button data-action="tab-nav" data-tab="calculator" id="tab-calculator" class="flex-1 md:flex-none text-center px-4 py-2 rounded-md text-sm font-medium transition-all">Nova Apuração</button>
                            <button data-action="tab-nav" data-tab="history" id="tab-history" class="flex-1 md:flex-none text-center px-4 py-2 rounded-md text-sm font-medium transition-all">Pesquisar Pagamentos</button>
                        </nav>
                    </div>
                </div>
            </header>
            <main id="commissions-content" class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8"></main>
        </div>
    `;
}

function navigateToTab(tabName) {
    localState.currentTab = tabName;
    ['dashboard', 'calculator', 'history'].forEach(t => {
        const el = document.getElementById(`tab-${t}`);
        if(t === tabName) el.className = 'flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-bold bg-white text-indigo-600 shadow-sm border border-gray-100';
        else el.className = 'flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700';
    });
    
    const container = document.getElementById('commissions-content');
    if (tabName === 'dashboard') renderDashboardContent(container);
    if (tabName === 'calculator') renderCalculator(container);
    if (tabName === 'history') renderHistoryTab(container);
}

// --- DASHBOARD ATUALIZADO (Comparativo) ---
function renderDashboardContent(container) {
    const { revenue, commissions } = localState.dashStats;
    const percentage = revenue > 0 ? ((commissions / revenue) * 100).toFixed(1) : 0;

    container.innerHTML = `
        <div class="space-y-6 animate-fade-in">
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-end">
                <div class="flex-1 w-full">
                    <label class="text-xs font-bold text-gray-500 uppercase">Data Inicial</label>
                    <input type="date" id="dash-start" value="${localState.dashStartDate}" class="w-full mt-1 rounded-lg border-gray-300">
                </div>
                <div class="flex-1 w-full">
                    <label class="text-xs font-bold text-gray-500 uppercase">Data Final</label>
                    <input type="date" id="dash-end" value="${localState.dashEndDate}" class="w-full mt-1 rounded-lg border-gray-300">
                </div>
                <button data-action="filter-dashboard" class="w-full md:w-auto bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-indigo-700 transition h-[42px]">
                    Filtrar
                </button>
            </div>

            <div id="dashboard-stats-container">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-l-4 border-l-blue-500 border-gray-100">
                        <p class="text-sm text-gray-500 font-bold uppercase">Faturamento (Vendas)</p>
                        <p class="text-2xl font-extrabold text-gray-800 mt-2">R$ ${revenue.toFixed(2)}</p>
                        <p class="text-xs text-gray-400 mt-1">Total vendido no período</p>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-l-4 border-l-green-500 border-gray-100">
                        <p class="text-sm text-gray-500 font-bold uppercase">Comissões Pagas</p>
                        <p class="text-2xl font-extrabold text-gray-800 mt-2">R$ ${commissions.toFixed(2)}</p>
                        <p class="text-xs text-gray-400 mt-1">Total de relatórios gerados</p>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-6">
                    <h3 class="font-bold text-gray-800 mb-4">Proporção de Comissão sobre Vendas</h3>
                    <div class="relative pt-1">
                        <div class="flex mb-2 items-center justify-between">
                            <div>
                                <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                                    Impacto
                                </span>
                            </div>
                            <div class="text-right">
                                <span class="text-xs font-semibold inline-block text-indigo-600">
                                    ${percentage}%
                                </span>
                            </div>
                        </div>
                        <div class="overflow-hidden h-4 mb-4 text-xs flex rounded bg-indigo-100">
                            <div style="width:${Math.min(percentage, 100)}%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-500"></div>
                        </div>
                        <p class="text-sm text-gray-500">
                            De cada R$ 100,00 vendidos, <strong>R$ ${percentage}</strong> foram pagos em comissões neste período.
                        </p>
                    </div>
                </div>
            </div>

            <div class="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl shadow-xl p-6 md:p-8 text-white text-center mt-6">
                <h2 class="text-xl md:text-2xl font-bold mb-2">Novo Fechamento</h2>
                <p class="text-gray-300 mb-6 text-sm">Pronto para calcular as comissões do próximo período?</p>
                <button data-action="start-new-calc" class="bg-white text-gray-900 px-8 py-3 rounded-xl font-bold shadow hover:bg-gray-100 transition transform hover:scale-105">
                    Iniciar Nova Apuração
                </button>
            </div>
        </div>
    `;
}

// --- HISTÓRICO TRANSFORMADO (PESQUISA) ---
function renderHistoryTab(container) {
    // Opções de Profissionais para o Select
    const profOptions = localState.professionals.map(p => 
        `<option value="${p.id}" ${localState.histProfessionalId === p.id ? 'selected' : ''}>${p.name}</option>`
    ).join('');

    container.innerHTML = `
        <div class="space-y-6">
            <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h2 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    Pesquisar Pagamentos
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                        <label class="text-xs font-bold text-gray-500 uppercase">De (Data Pagto)</label>
                        <input type="date" id="hist-start" value="${localState.histStartDate}" class="w-full mt-1 rounded-lg border-gray-300">
                    </div>
                    <div>
                        <label class="text-xs font-bold text-gray-500 uppercase">Até</label>
                        <input type="date" id="hist-end" value="${localState.histEndDate}" class="w-full mt-1 rounded-lg border-gray-300">
                    </div>
                    <div>
                        <label class="text-xs font-bold text-gray-500 uppercase">Profissional</label>
                        <select id="hist-prof" class="w-full mt-1 rounded-lg border-gray-300">
                            <option value="all">Todos</option>
                            ${profOptions}
                        </select>
                    </div>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                    <button data-action="filter-history" class="w-full md:w-auto bg-indigo-600 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-indigo-700 transition">
                        Pesquisar
                    </button>
                </div>
            </div>

            <div id="history-list-container">
                <div class="text-center py-10 text-gray-500">Clique em "Pesquisar" para ver os registros.</div>
            </div>
        </div>
    `;
    
    // Auto-carregar se já tivermos dados em memória ou na primeira vez
    if (localState.historyData.length > 0) {
        renderHistoryList(document.getElementById('history-list-container'), localState.historyData);
    } else {
        // Opcional: Auto pesquisar ao entrar
        updateHistoryList(); 
    }
}

function renderHistoryList(container, history) {
    if (history.length === 0) {
        container.innerHTML = `
            <div class="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
                <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum registro encontrado</h3>
                <p class="mt-1 text-sm text-gray-500">Tente ajustar os filtros de data.</p>
            </div>`;
        return;
    }

    const mobileList = history.map(h => `
        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-3 animate-fade-in">
            <div class="flex justify-between items-start mb-2">
                <div>
                    <p class="text-xs text-gray-400 uppercase">Pago em: ${new Date(h.createdAt).toLocaleDateString('pt-BR')}</p>
                    <h4 class="font-bold text-gray-800 text-lg">${h.professionalName}</h4>
                </div>
                <span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Pago</span>
            </div>
            <div class="flex justify-between items-end mb-4">
                <p class="text-sm text-gray-500">Ref: ${h.period}</p>
                <p class="text-xl font-bold text-gray-900">R$ ${(h.summary.finalValue || h.summary.totalCommission).toFixed(2)}</p>
            </div>
            <div class="grid grid-cols-2 gap-2">
                <button data-action="print-receipt" data-id="${h.id}" class="flex items-center justify-center py-2 bg-indigo-50 text-indigo-600 rounded-lg font-bold text-sm hover:bg-indigo-100">
                    📄 Recibo
                </button>
                <button data-action="delete-report" data-id="${h.id}" class="flex items-center justify-center py-2 bg-red-50 text-red-600 rounded-lg font-bold text-sm hover:bg-red-100">
                    🗑️ Excluir
                </button>
            </div>
        </div>
    `).join('');

    const desktopList = history.map(h => `
        <tr class="hover:bg-gray-50 border-b border-gray-100">
            <td class="px-6 py-4 text-sm text-gray-500">${new Date(h.createdAt).toLocaleDateString('pt-BR')}</td>
            <td class="px-6 py-4 font-bold text-gray-900">${h.professionalName}</td>
            <td class="px-6 py-4 text-sm text-gray-500">${h.period}</td>
            <td class="px-6 py-4 text-right font-bold text-green-600">R$ ${(h.summary.finalValue || h.summary.totalCommission).toFixed(2)}</td>
            <td class="px-6 py-4 text-right space-x-2">
                <button data-action="print-receipt" data-id="${h.id}" class="text-indigo-600 hover:bg-indigo-50 px-3 py-1 rounded">Recibo</button>
                <button data-action="delete-report" data-id="${h.id}" class="text-red-600 hover:bg-red-50 px-3 py-1 rounded">Excluir</button>
            </td>
        </tr>
    `).join('');

    container.innerHTML = `
        <div class="block md:hidden pb-20">${mobileList}</div>
        <div class="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table class="min-w-full text-left">
                <thead class="bg-gray-50 text-gray-500 uppercase text-xs">
                    <tr><th class="px-6 py-3">Data Pagto</th><th class="px-6 py-3">Profissional</th><th class="px-6 py-3">Ref. Período</th><th class="px-6 py-3 text-right">Valor Pago</th><th class="px-6 py-3 text-right">Ações</th></tr>
                </thead>
                <tbody>${desktopList}</tbody>
            </table>
        </div>
    `;
}

// --- Funções Auxiliares Reutilizadas (recalculateSingleRow, etc) ---
// ... Mantenha as funções recalculateSingleRow, recalculateGrandTotal, openPreviewItemsModal, 
// handleSaveReports, handlePrintReceipt, handleDeleteReport, generateReceiptPDF como estavam 
// no arquivo anterior. Elas funcionam perfeitamente com este novo layout.

// Se precisar que eu repita essas funções aqui, me avise, mas elas são idênticas ao código anterior.
// Certifique-se apenas de que 'recalculateSingleRow' e outras estão presentes no arquivo final.

function recalculateSingleRow(idx) {
    const debitInputs = document.querySelectorAll(`.input-debit[data-idx="${idx}"]`);
    const creditInputs = document.querySelectorAll(`.input-credit[data-idx="${idx}"]`);
    
    let debit = 0, credit = 0;
    debitInputs.forEach(inp => { if(inp.value) debit = parseFloat(inp.value); });
    creditInputs.forEach(inp => { if(inp.value) credit = parseFloat(inp.value); });

    // Atualiza estado e UI (sincronizando Mobile/Desktop)
    if(localState.calculationResult && localState.calculationResult[idx]) {
        const r = localState.calculationResult[idx];
        r.extraDebit = debit;
        r.extraCredit = credit;
        r.finalValue = r.summary.totalCommission - debit + credit;

        debitInputs.forEach(inp => { if(inp !== document.activeElement) inp.value = debit || ''; });
        creditInputs.forEach(inp => { if(inp !== document.activeElement) inp.value = credit || ''; });

        const finalSpans = document.querySelectorAll(`.final-value-display[data-idx="${idx}"]`);
        finalSpans.forEach(span => span.innerText = `R$ ${r.finalValue.toFixed(2)}`);
        
        recalculateGrandTotal();
    }
}

function recalculateGrandTotal() {
    const total = localState.calculationResult.reduce((acc, r) => acc + r.finalValue, 0);
    const displays = document.querySelectorAll('#grand-total-display');
    displays.forEach(el => el.innerText = `R$ ${total.toFixed(2)}`);
}

function openPreviewItemsModal(idx) {
    const data = localState.calculationResult[idx];
    if (!data) return;
    // ... (use o mesmo código de modal responsivo que fizemos antes) ...
    const itemsHtml = data.items.map(item => `
        <div class="flex justify-between items-center p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50">
            <div class="flex-1">
                <p class="text-sm font-bold text-gray-800">${item.item}</p>
                <p class="text-xs text-gray-500">${new Date(item.date).toLocaleDateString('pt-BR')} • ${item.client}</p>
            </div>
            <div class="text-right">
                <p class="text-sm font-bold text-green-600">R$ ${item.commissionValue.toFixed(2)}</p>
                <p class="text-xs text-gray-400">${item.commissionRate}% de R$ ${item.value.toFixed(2)}</p>
            </div>
        </div>
    `).join('');
    
    showGenericModal({
        title: `Detalhes da Comissão`,
        contentHTML: `<div class="bg-gray-50 p-3 rounded-lg mb-4 flex justify-between items-center"><div><p class="text-xs text-gray-500">Profissional</p><p class="font-bold text-gray-800">${data.professionalName}</p></div><div class="text-right"><p class="text-xs text-gray-500">Total Itens</p><p class="font-bold text-gray-800">${data.items.length}</p></div></div><div class="border rounded-lg overflow-hidden max-h-[60vh] overflow-y-auto">${itemsHtml}</div>`,
        maxWidth: 'max-w-md'
    });
}

// Para garantir que o código funcione completo, estou incluindo as funções de suporte restantes
// ...
async function handleSaveReports() {
    const count = localState.calculationResult.length;
    const confirmed = await showConfirmation('Confirmar', `Gerar ${count} relatórios?`);
    if (!confirmed) return;
    try {
        const savePromises = localState.calculationResult.map(result => 
            commissionsApi.saveCommissionReport({
                professionalId: result.professionalId,
                professionalName: result.professionalName,
                period: localState.periodString,
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
            })
        );
        await Promise.all(savePromises);
        showNotification('Sucesso', 'Pagamentos registrados!', 'success');
        localState.calculationResult = null;
        updateDashboardStats(); // Atualiza dashboard com novos dados
        navigateToTab('history');
    } catch (error) { showNotification('Erro', error.message, 'error'); }
}

function handlePrintReceipt(reportId) {
    const report = localState.historyData.find(r => r.id === reportId);
    if (report) generateReceiptPDF(report);
}

async function handleDeleteReport(reportId) {
    const confirmed = await showConfirmation('Excluir', 'Deseja remover este registro?');
    if (!confirmed) return;
    try {
        await commissionsApi.deleteCommissionReport(reportId);
        showNotification('Sucesso', 'Registro removido.', 'success');
        updateHistoryList();
        updateDashboardStats();
    } catch (error) { showNotification('Erro', error.message, 'error'); }
}

function generateReceiptPDF(report) {
    const { jsPDF } = window.jspdf;
    if (!jsPDF) return showNotification('Erro', 'PDF lib não carregada.', 'error');
    const doc = new jsPDF();
    const centerX = doc.internal.pageSize.getWidth() / 2;
    doc.setFontSize(18); doc.setFont(undefined, 'bold');
    doc.text('RECIBO DE PAGAMENTO DE COMISSÃO', centerX, 20, { align: 'center' });
    doc.setFontSize(12); doc.setFont(undefined, 'normal');
    doc.text(`Profissional: ${report.professionalName}`, 15, 40);
    doc.text(`Período: ${report.period}`, 15, 48);
    
    const rows = [['Comissão Bruta', `R$ ${report.summary.totalCommission.toFixed(2)}`]];
    if (report.summary.extraCredit > 0) rows.push(['(+) Bônus', `R$ ${report.summary.extraCredit.toFixed(2)}`]);
    if (report.summary.extraDebit > 0) rows.push(['(-) Descontos', `R$ ${report.summary.extraDebit.toFixed(2)}`]);
    
    doc.autoTable({ startY: 60, head: [['Descrição', 'Valor']], body: rows, theme: 'grid' });
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14); doc.setFont(undefined, 'bold');
    doc.text(`Total Líquido: R$ ${(report.summary.finalValue || report.summary.totalCommission).toFixed(2)}`, 190, finalY, { align: 'right' });
    doc.save(`Recibo_${report.professionalName}.pdf`);
}

function renderCalculator(container) {
    if(!localState.calculationResult) {
        // Renderiza Formulário de Novo Cálculo (Igual ao anterior)
        const todayStr = new Date().toISOString().split('T')[0];
        const firstDayStr = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
        const profsHtml = localState.professionals.map(p => `
            <label class="flex items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm active:bg-indigo-50 transition cursor-pointer">
                <input type="checkbox" value="${p.id}" class="prof-checkbox w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500">
                <span class="ml-3 font-medium text-gray-700">${p.name}</span>
            </label>`).join('');
            
        container.innerHTML = `
            <form id="calc-form" class="space-y-6 max-w-3xl mx-auto animate-fade-in">
                <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <h3 class="font-bold text-gray-800 mb-4">Novo Cálculo</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="text-xs font-bold text-gray-500 uppercase">Início</label><input type="date" id="start-date" value="${firstDayStr}" class="w-full mt-1 rounded-lg border-gray-300"></div>
                        <div><label class="text-xs font-bold text-gray-500 uppercase">Fim</label><input type="date" id="end-date" value="${todayStr}" class="w-full mt-1 rounded-lg border-gray-300"></div>
                    </div>
                </div>
                <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <div class="flex justify-between items-center mb-4"><h3 class="font-bold text-gray-800">Profissionais</h3><button type="button" data-action="toggle-all-profs" class="text-sm text-indigo-600 font-medium">Selecionar Todos</button></div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">${profsHtml}</div>
                </div>
                <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <h3 class="font-bold text-gray-800 mb-3">Tipos</h3>
                    <div class="flex flex-col md:flex-row gap-3">
                        <label class="flex items-center p-3 border rounded-lg bg-gray-50"><input type="checkbox" id="type-services" checked class="text-indigo-600 rounded mr-2"> Serviços</label>
                        <label class="flex items-center p-3 border rounded-lg bg-gray-50"><input type="checkbox" id="type-products" checked class="text-indigo-600 rounded mr-2"> Produtos</label>
                        <label class="flex items-center p-3 border rounded-lg bg-gray-50"><input type="checkbox" id="type-packages" class="text-indigo-600 rounded mr-2"> Pacotes</label>
                    </div>
                </div>
                <button type="submit" class="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition">Calcular Prévia</button>
            </form>`;
    } else {
        // Renderiza Tabela de Prévia (Desktop/Mobile Híbrido - Igual ao anterior)
        const results = localState.calculationResult;
        const totalGeral = results.reduce((acc, r) => acc + r.finalValue, 0);

        const mobileCards = results.map((r, idx) => `
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-4">
                <div class="flex justify-between items-start mb-3 border-b border-gray-100 pb-2">
                    <div><h4 class="font-bold text-gray-900 text-lg">${r.professionalName}</h4><p class="text-xs text-gray-500">${r.summary.totalItems} itens</p></div>
                    <div class="text-right"><p class="text-xs text-gray-500">Bruto</p><p class="font-bold text-gray-700">R$ ${r.summary.totalCommission.toFixed(2)}</p></div>
                </div>
                <div class="grid grid-cols-2 gap-3 mb-3">
                    <div><label class="text-xs font-bold text-red-500 uppercase">Desc.</label><input type="number" step="0.01" data-idx="${idx}" class="input-debit w-full mt-1 p-2 border border-red-200 rounded-lg bg-red-50 font-bold text-red-700" value="${r.extraDebit||''}"></div>
                    <div><label class="text-xs font-bold text-green-500 uppercase">Bônus</label><input type="number" step="0.01" data-idx="${idx}" class="input-credit w-full mt-1 p-2 border border-green-200 rounded-lg bg-green-50 font-bold text-green-700" value="${r.extraCredit||''}"></div>
                </div>
                <div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg"><span class="text-sm font-medium">Líquido</span><span class="text-xl font-bold text-indigo-700 final-value-display" data-idx="${idx}">R$ ${r.finalValue.toFixed(2)}</span></div>
                <button data-action="view-preview-items" data-idx="${idx}" class="w-full mt-3 py-2 text-indigo-600 font-medium text-sm border border-indigo-100 rounded-lg">Ver Detalhes</button>
            </div>`).join('');

        const desktopRows = results.map((r, idx) => `
            <tr class="hover:bg-gray-50"><td class="px-6 py-4 font-bold text-gray-900">${r.professionalName}</td><td class="px-6 py-4 text-right">R$ ${r.summary.totalCommission.toFixed(2)}</td>
            <td class="px-6 py-4 text-right"><input type="number" step="0.01" data-idx="${idx}" class="input-debit w-24 text-right border-gray-300 rounded bg-red-50 text-red-700" value="${r.extraDebit||''}"></td>
            <td class="px-6 py-4 text-right"><input type="number" step="0.01" data-idx="${idx}" class="input-credit w-24 text-right border-gray-300 rounded bg-green-50 text-green-700" value="${r.extraCredit||''}"></td>
            <td class="px-6 py-4 text-right font-bold text-indigo-700 final-value-display" data-idx="${idx}">R$ ${r.finalValue.toFixed(2)}</td>
            <td class="px-6 py-4 text-center"><button data-action="view-preview-items" data-idx="${idx}" class="text-indigo-600 hover:underline text-sm">Ver Itens</button></td></tr>`).join('');

        container.innerHTML = `
            <div class="space-y-4 animate-fade-in pb-20">
                <div class="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200 sticky top-0 z-10 flex justify-between items-center">
                    <div><button data-action="back-to-filters" class="text-sm text-gray-500 hover:text-indigo-600">← Voltar</button><h2 class="text-lg md:text-2xl font-bold text-gray-800">Prévia</h2></div>
                    <div class="text-right"><p class="text-xs uppercase font-bold text-gray-500">Total a Pagar</p><p id="grand-total-display" class="text-2xl md:text-3xl font-extrabold text-green-600">R$ ${totalGeral.toFixed(2)}</p></div>
                </div>
                <div class="block md:hidden space-y-4">${mobileCards}</div>
                <div class="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-bold uppercase">Profissional</th><th class="px-6 py-3 text-right text-xs font-bold uppercase">Bruto</th><th class="px-6 py-3 text-right text-xs font-bold uppercase">(-) Desc.</th><th class="px-6 py-3 text-right text-xs font-bold uppercase">(+) Bônus</th><th class="px-6 py-3 text-right text-xs font-bold uppercase">Líquido</th><th class="px-6 py-3 text-center text-xs font-bold uppercase">Ações</th></tr></thead><tbody>${desktopRows}</tbody></table></div>
                <div class="fixed bottom-0 left-0 w-full bg-white p-4 border-t border-gray-200 shadow-lg md:static md:bg-transparent md:border-0 md:shadow-none z-30 flex justify-end gap-3">
                    <button data-action="back-to-filters" class="hidden md:block px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-bold">Cancelar</button>
                    <button data-action="save-final-report" class="w-full md:w-auto px-6 py-4 md:py-3 bg-green-600 text-white rounded-xl font-bold shadow-md hover:bg-green-700 transition">Finalizar Apuração</button>
                </div>
            </div>`;
    }
}