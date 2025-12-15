// js/ui/financial.js

import * as financialApi from '../api/financial.js';
import { state } from '../state.js';
import { showNotification, showConfirmation } from '../components/modal.js';

const contentDiv = document.getElementById('content');
let localState = { 
    payables: [], 
    receivables: [], 
    natures: [], 
    costCenters: [],
    currentFilter: 'pending', // 'pending', 'paid', 'all'
    // Novos campos de estado para o filtro de data e saldo anterior
    startDate: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    previousBalance: 0,
    // Novos campos de filtro
    filterNaturezaId: 'all',
    filterCostCenterId: 'all',
    currentListView: 'receivables' // 'payables' or 'receivables'
};
let cashFlowChart = null;
let financialPageEventListener = null;
let genericModalEventListener = null;

// --- FUNÇÕES AUXILIARES ---

function buildHierarchy(list) {
    const map = new Map();
    const roots = [];
    if (!list) return roots;
    list.forEach(item => map.set(item.id, { ...item, children: [] }));
    map.forEach(item => {
        if (item.parentId && map.has(item.parentId)) {
            map.get(item.parentId).children.push(item);
        } else {
            roots.push(item);
        }
    });
    return roots;
}

// --- LÓGICA DE GESTÃO (NATUREZAS E CENTROS DE CUSTO) ---

function renderHierarchyList(container, items, type) {
    if (!items || items.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500">Nenhum item criado.</p>';
        return;
    }
    const renderNode = (item, level = 0) => {
        const spacer = '— '.repeat(level);
        return `
            <div style="margin-left: ${level * 20}px;" class="flex justify-between items-center bg-gray-100 p-2 rounded">
                <span>${spacer}${item.name}</span>
                <button data-action="delete-${type}" data-id="${item.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
            </div>
            ${item.children.map(child => renderNode(child, level + 1)).join('')}
        `;
    };
    container.innerHTML = items.map(item => renderNode(item)).join('');
}

async function openHierarchyModal(type) {
    // Garante que o menu FAB feche se estiver aberto
    document.getElementById('fab-menu')?.classList.add('hidden');
    document.getElementById('main-fab-btn')?.classList.remove('rotate-45');

    const modal = document.getElementById('genericModal');
    const isNature = type === 'nature';
    const title = `Gerir ${isNature ? 'Naturezas Financeiras' : 'Centros de Custo'}`;
    const api = isNature ? financialApi.getNatures : financialApi.getCostCenters;
    const collectionName = isNature ? 'natures' : 'costCenters';

    modal.innerHTML = `
        <div class="modal-content max-w-lg">
            <h2 class="text-2xl font-bold mb-6">${title}</h2>
            <form id="hierarchyForm" class="space-y-3 mb-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" id="itemName" placeholder="Nome do novo item" required class="p-2 border rounded-md w-full">
                    <select id="itemParent" class="p-2 border rounded-md bg-white w-full"><option value="">-- Nível Principal --</option></select>
                </div>
                <button type="submit" class="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg">Adicionar</button>
            </form>
            <div id="hierarchyList" class="space-y-1 max-h-64 overflow-y-auto p-2 border rounded-md"><div class="loader mx-auto"></div></div>
            <div class="mt-6"><button type="button" data-action="close-modal" data-target="genericModal" class="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg">Fechar</button></div>
        </div>`;
    modal.style.display = 'flex';

    const listDiv = modal.querySelector('#hierarchyList');
    const parentSelect = modal.querySelector('#itemParent');

    const renderData = (items) => {
        const hierarchy = buildHierarchy(items);
        renderHierarchyList(listDiv, hierarchy, type);
        parentSelect.innerHTML = '<option value="">-- Nível Principal --</option>';
        const renderOption = (item, prefix = '', level = 0) => {
            const spacer = level > 0 ? '— '.repeat(level) : '';
            parentSelect.innerHTML += `<option value="${item.id}">${spacer}${item.name}</option>`;
            item.children.forEach(child => renderOption(child, prefix + '— '));
        };
        hierarchy.forEach(root => renderOption(root));
    };

    // CORREÇÃO: Passar establishmentId
    const items = await api(state.establishmentId);
    localState[collectionName] = items;
    renderData(items);

    modal.querySelector('#hierarchyForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = modal.querySelector('#itemName').value;
        const parentId = parentSelect.value;
        const createApi = isNature ? financialApi.createNature : financialApi.createCostCenter;
        try {
            // CORREÇÃO: Passar establishmentId no payload
            await createApi({ 
                name, 
                parentId: parentId || null,
                establishmentId: state.establishmentId 
            });
            
            // CORREÇÃO: Passar establishmentId
            const updatedItems = await api(state.establishmentId);
            localState[collectionName] = updatedItems;
            renderData(updatedItems);
            modal.querySelector('#hierarchyForm').reset();
            await fetchAndDisplayData(); // Atualiza a lista principal após a criação
        } catch (error) {
            showNotification('Erro', `Não foi possível criar: ${error.message}`, 'error');
        }
    });
}

// --- LÓGICA DO GRÁFICO DE FLUXO DE CAIXA ---

function renderCashFlowChart(data) {
    const canvas = document.getElementById('cashFlowChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    if (cashFlowChart) {
        cashFlowChart.destroy();
    }

    const negativePayables = data.payables.map(p => p * -1);

    cashFlowChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'Receitas',
                    data: data.receivables,
                    backgroundColor: 'rgba(74, 222, 128, 0.6)',
                    borderColor: 'rgba(34, 197, 94, 1)',
                    borderWidth: 1,
                    yAxisID: 'y',
                },
                {
                    label: 'Despesas',
                    data: negativePayables,
                    backgroundColor: 'rgba(248, 113, 113, 0.6)',
                    borderColor: 'rgba(239, 68, 68, 1)',
                    borderWidth: 1,
                    yAxisID: 'y',
                },
                {
                    label: 'Saldo Acumulado',
                    data: data.expectedBalance,
                    type: 'line',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderWidth: 3,
                    pointRadius: 4,
                    pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                    fill: true,
                    tension: 0.1,
                    yAxisID: 'y1',
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { stacked: true },
                y: { type: 'linear', display: true, position: 'left', stacked: true, title: { display: true, text: 'Movimentações (R$)' } },
                y1: { type: 'linear', display: true, position: 'right', title: { display: true, text: 'Saldo Acumulado (R$)' }, grid: { drawOnChartArea: false } }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) { label += ': '; }
                            if (context.parsed.y !== null) {
                                const value = Math.abs(context.parsed.y);
                                label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}

async function handleCashFlowReportGeneration() {
    const chartContainer = document.getElementById('cash-flow-chart-container');
    const startDate = document.getElementById('cashFlowStartDate').value;
    const endDate = document.getElementById('cashFlowEndDate').value;
    
    if (!startDate || !endDate) {
        showNotification('Atenção', 'Por favor, selecione as datas de início e fim.', 'error');
        return;
    }
    
    chartContainer.innerHTML = '<div class="loader mx-auto my-10"></div>';
    try {
        // CORREÇÃO: Passar establishmentId para o gráfico
        const data = await financialApi.getCashFlowData(state.establishmentId, startDate, endDate);
        chartContainer.innerHTML = '<canvas id="cashFlowChart"></canvas>';
        renderCashFlowChart(data);
    } catch (error) {
        chartContainer.innerHTML = `<p class="text-red-500 text-center">Erro ao carregar dados do gráfico: ${error.message}</p>`;
    }
}

function openCashFlowModal() {
    // Garante que o menu FAB feche se estiver aberto
    document.getElementById('fab-menu')?.classList.add('hidden');
    document.getElementById('main-fab-btn')?.classList.remove('rotate-45');

    const modal = document.getElementById('genericModal');
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
    const todayStr = today.toISOString().split('T')[0];

    modal.innerHTML = `
        <div class="modal-content max-w-4xl">
             <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold text-gray-800">Fluxo de Caixa</h2>
                <button type="button" data-action="close-modal" data-target="genericModal" class="text-2xl font-bold">&times;</button>
            </div>
            <div class="flex flex-wrap items-end gap-4 mb-4 bg-gray-50 p-3 rounded-lg">
                <div>
                    <label for="cashFlowStartDate" class="text-sm font-medium">De:</label>
                    <input type="date" id="cashFlowStartDate" value="${firstDayOfMonth}" class="p-2 border rounded-md">
                </div>
                <div>
                    <label for="cashFlowEndDate" class="text-sm font-medium">Até:</label>
                    <input type="date" id="cashFlowEndDate" value="${todayStr}" class="p-2 border rounded-md">
                </div>
                <button id="generateCashFlowBtn" class="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Gerar Gráfico</button>
            </div>
            <div id="cash-flow-chart-container" class="relative h-96">
                <canvas id="cashFlowChart"></canvas>
            </div>
        </div>
    `;
    modal.style.display = 'flex';

    modal.querySelector('#generateCashFlowBtn').addEventListener('click', handleCashFlowReportGeneration);
    handleCashFlowReportGeneration();
}


// --- LÓGICA DE INDICADORES (NOVO MODAL) ---

function openIndicatorsModal() {
    const modal = document.getElementById('genericModal');
    
    // Cálculos necessários para o modal (usando dados de localState)
    const pendingPayable = localState.payables.filter(i => i.status === 'pending').reduce((acc, i) => acc + i.amount, 0);
    const pendingReceivable = localState.receivables.filter(i => i.status === 'pending').reduce((acc, i) => acc + i.amount, 0);
    const totalPendingBalance = pendingReceivable - pendingPayable;
    const paidPayable = localState.payables.filter(i => i.status === 'paid').reduce((acc, i) => acc + i.amount, 0);
    const paidReceivable = localState.receivables.filter(i => i.status === 'paid').reduce((acc, i) => acc + i.amount, 0);
    const currentBalance = paidReceivable - paidPayable;
    const previousBalance = localState.previousBalance || 0;
    const finalBalance = previousBalance + currentBalance;

    const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    const getColorClass = (value) => value >= 0 ? 'text-green-600' : 'text-red-600';

    modal.innerHTML = `
        <div class="modal-content max-w-4xl max-h-[90vh] flex flex-col">
             <div class="flex justify-between items-center p-6 border-b">
                <h2 class="text-2xl font-bold text-gray-800">Painel de Indicadores Financeiros</h2>
                <button type="button" data-action="close-modal" data-target="genericModal" class="text-2xl font-bold text-gray-500 hover:text-gray-800">&times;</button>
            </div>
            <div class="p-6 overflow-y-auto space-y-8">
                
                <p class="text-center text-sm text-gray-500 mb-6 bg-yellow-50 p-2 rounded-md">
                    Análise do período: ${new Date(localState.startDate + 'T00:00:00').toLocaleDateString('pt-BR')} a ${new Date(localState.endDate + 'T00:00:00').toLocaleDateString('pt-BR')}.
                </p>
                
                <div class="bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 class="text-xl font-semibold text-indigo-700 mb-4 border-b pb-2">Realizado no Período (Fechado)</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div class="bg-white p-3 rounded-lg shadow-sm border-b-4 border-green-400">
                            <p class="text-gray-500 text-sm">Total Recebido</p>
                            <p class="text-2xl font-bold text-green-600">${formatCurrency(paidReceivable)}</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow-sm border-b-4 border-red-400">
                            <p class="text-gray-500 text-sm">Total Pago</p>
                            <p class="text-2xl font-bold text-red-600">${formatCurrency(paidPayable)}</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow-lg border-b-4 ${getColorClass(currentBalance) === 'text-green-600' ? 'border-green-600' : 'border-red-600'}">
                            <p class="text-gray-700 text-sm font-medium">Saldo do Período</p>
                            <p class="text-2xl font-bold ${getColorClass(currentBalance)}">${formatCurrency(currentBalance)}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 class="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Balanço Patrimonial e Acumulado</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                        <div class="bg-white p-3 rounded-lg shadow-sm border-b-4 border-indigo-400">
                            <p class="text-gray-500 text-sm">Saldo Inicial (Realizado)</p>
                            <p class="text-2xl font-bold ${getColorClass(previousBalance)}">${formatCurrency(previousBalance)}</p>
                            <p class="text-xs text-gray-400 mt-1">Acumulado antes do período</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow-lg border-b-4 border-blue-600">
                            <p class="text-gray-700 text-sm font-medium">Saldo Final Acumulado</p>
                            <p class="text-2xl font-bold ${getColorClass(finalBalance)}">${formatCurrency(finalBalance)}</p>
                            <p class="text-xs text-gray-400 mt-1">Inicial + Saldo do Período</p>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 class="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Previsão (Abertos no Período)</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                         <div class="bg-white p-3 rounded-lg shadow-sm border-b-4 border-green-400">
                            <p class="text-gray-500 text-sm">A Receber (Pendente)</p>
                            <p class="text-2xl font-bold text-green-600">${formatCurrency(pendingReceivable)}</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow-sm border-b-4 border-red-400">
                            <p class="text-gray-500 text-sm">A Pagar (Pendente)</p>
                            <p class="text-2xl font-bold text-red-600">${formatCurrency(pendingPayable)}</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow-lg border-b-4 ${getColorClass(totalPendingBalance) === 'text-green-600' ? 'border-green-600' : 'border-red-600'}">
                            <p class="text-gray-700 text-sm font-medium">Saldo Previsto</p>
                            <p class="text-2xl font-bold ${getColorClass(totalPendingBalance)}">${formatCurrency(totalPendingBalance)}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `;
    modal.style.display = 'flex';
}

// --- LÓGICA DO MODAL DE CONFIGURAÇÕES (NOVO) ---
function openSettingsModal() {
    const modal = document.getElementById('genericModal');
    modal.innerHTML = `
        <div class="modal-content max-w-lg">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">Configurações</h2>
                <button type="button" data-action="close-modal" data-target="genericModal" class="text-2xl font-bold text-gray-500 hover:text-gray-800">&times;</button>
            </div>
            <div class="space-y-4">
                <button data-action="manage-natures" class="w-full text-left p-4 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center gap-4">
                    <svg class="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h.01M7 11h.01M16 7h.01M16 3h.01M16 11h.01M12 21V3m0 18H9m3 0h3m-3 0V3m0 0H9m3 0h3m0 18v-3.07a3.001 3.001 0 00-1.7-2.684l-3.398-1.963a3.001 3.001 0 00-3.8 0l-3.398 1.963A3.001 3.001 0 003 17.93V21h9z" /></svg>
                    <div>
                        <p class="font-semibold text-gray-800">Gerir Naturezas Financeiras</p>
                        <p class="text-sm text-gray-600">Organize suas categorias de receita/despesa.</p>
                    </div>
                </button>
                <button data-action="manage-cost-centers" class="w-full text-left p-4 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center gap-4">
                    <svg class="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    <div>
                        <p class="font-semibold text-gray-800">Gerir Centros de Custo</p>
                        <p class="text-sm text-gray-600">Atribua lançamentos a departamentos ou projetos.</p>
                    </div>
                </button>
            </div>
        </div>
    `;
    modal.style.display = 'flex';
}

// --- LÓGICA DE LANÇAMENTOS ---

// Função para construir as opções hierárquicas nos filtros
function buildFilterHierarchyOptions(items, selectedId = 'all') {
    let optionsHTML = '<option value="all">Todos</option>';
    
    const buildHierarchy = (list) => {
        const map = new Map();
        const roots = [];
        if (!list) return roots;
        list.forEach(item => map.set(item.id, { ...item, children: [] }));
        map.forEach(item => {
            if (item.parentId && map.has(item.parentId)) {
                map.get(item.parentId).children.push(item);
            } else {
                roots.push(item);
            }
        });
        return roots;
    };

    const renderOption = (item, level = 0) => {
        const spacer = level > 0 ? '— '.repeat(level) : '';
        const selected = item.id === selectedId ? 'selected' : '';
        optionsHTML += `<option value="${item.id}" ${selected}>${spacer}${item.name}</option>`;
        item.children.forEach(child => renderOption(child, level + 1));
    };

    const hierarchy = buildHierarchy(items);
    hierarchy.forEach(root => renderOption(root));
    
    return optionsHTML;
}


async function fetchAndDisplayData() {
    const content = document.getElementById('financial-content');
    
    // Captura as datas de filtro do DOM
    const startDate = document.getElementById('filterStartDate')?.value;
    const endDate = document.getElementById('filterEndDate')?.value;
    const natureId = document.getElementById('filterNaturezaId')?.value;
    const costCenterId = document.getElementById('filterCostCenterId')?.value;
    
    // Se as datas não estiverem definidas, sai para evitar erro (primeiro load)
    if (!startDate || !endDate) { 
        // Carrega apenas dados de suporte (natures e cost centers) no primeiro load
        try {
            // CORREÇÃO: Passar establishmentId
            const [natures, costCenters] = await Promise.all([
                financialApi.getNatures(state.establishmentId),
                financialApi.getCostCenters(state.establishmentId)
            ]);
            localState = { ...localState, natures, costCenters };
            
            // Popula os selects na primeira carga com as opções disponíveis
            if (document.getElementById('filterNaturezaId')) document.getElementById('filterNaturezaId').innerHTML = buildFilterHierarchyOptions(localState.natures);
            if (document.getElementById('filterCostCenterId')) document.getElementById('filterCostCenterId').innerHTML = buildFilterHierarchyOptions(localState.costCenters);
            
        } catch (error) {
            showNotification('Erro', `Não foi possível carregar os dados base: ${error.message}`, 'error');
        }
        renderLists(); 
        updateSummary();
        return; 
    }
    
    // Exibe loader
    const payablesList = document.getElementById('payables-list');
    const receivablesList = document.getElementById('receivables-list');
    if (payablesList) payablesList.innerHTML = '<div class="loader mx-auto"></div>';
    if (receivablesList) receivablesList.innerHTML = '<div class="loader mx-auto"></div>';
    
    try {
        // CORREÇÃO: Inserir establishmentId nos filtros
        const filters = { 
            startDate, 
            endDate, 
            establishmentId: state.establishmentId 
        };
        
        // Inclui filtros de Natureza e Centro de Custo APENAS se não for 'all'
        if (natureId && natureId !== 'all') filters.natureId = natureId;
        if (costCenterId && costCenterId !== 'all') filters.costCenterId = costCenterId;

        // O API service precisa ser ajustado para aceitar e construir a query string com todos os filtros.
        const [payablesResult, receivablesResult, natures, costCenters] = await Promise.all([
            // Passa o objeto 'filters' completo
            financialApi.getPayables(filters),
            financialApi.getReceivables(filters),
            financialApi.getNatures(state.establishmentId), // CORREÇÃO: Passar ID
            financialApi.getCostCenters(state.establishmentId) // CORREÇÃO: Passar ID
        ]);
        
        // O backend retorna { entries, previousBalance }
        const previousBalance = receivablesResult.previousBalance - payablesResult.previousBalance;
        
        localState = { 
            ...localState, 
            payables: payablesResult.entries, 
            receivables: receivablesResult.entries, 
            natures, 
            costCenters,
            previousBalance,
            filterNaturezaId: natureId,
            filterCostCenterId: costCenterId
        };
        
        // Repopula os selects para manter o valor selecionado
        if (document.getElementById('filterNaturezaId')) document.getElementById('filterNaturezaId').innerHTML = buildFilterHierarchyOptions(localState.natures, localState.filterNaturezaId);
        if (document.getElementById('filterCostCenterId')) document.getElementById('filterCostCenterId').innerHTML = buildFilterHierarchyOptions(localState.costCenters, localState.filterCostCenterId);

        renderLists();
        updateSummary();
    } catch (error) {
        showNotification('Erro', `Não foi possível carregar os dados: ${error.message}`, 'error');
        if (content) content.innerHTML = `<p class="text-red-500 text-center">Falha ao carregar dados.</p>`;
    }
}

async function handleFormSubmit(e, type, itemId = null) {
    e.preventDefault();
    const form = e.target;
    const isChecked = form.querySelector('[name="status"]').checked;
    const paymentDateValue = form.querySelector('[name="paymentDate"]').value;
    const amountValue = parseFloat(form.querySelector('[name="amount"]').value);
    const installments = parseInt(form.querySelector('[name="installments"]')?.value, 10) || 1;

    if (isNaN(amountValue)) {
        showNotification('Erro de Validação', 'O valor inserido é inválido.', 'error');
        return;
    }
    if (isChecked && !paymentDateValue) {
        showNotification('Erro de Validação', 'Por favor, forneça a data de pagamento para um lançamento pago.', 'error');
        return;
    }

    const data = {
        description: form.querySelector('[name="description"]').value,
        amount: amountValue,
        dueDate: form.querySelector('[name="dueDate"]').value,
        naturezaId: form.querySelector('[name="naturezaId"]').value || null,
        centroDeCustoId: form.querySelector('[name="centroDeCustoId"]').value || null,
        notes: form.querySelector('[name="notes"]').value,
        status: isChecked ? 'paid' : 'pending',
        paymentDate: isChecked ? paymentDateValue : null,
        installments: itemId ? 1 : installments, // Parcelamento só na criação
        establishmentId: state.establishmentId // CORREÇÃO: Vincula ao estabelecimento
    };

    try {
        if (itemId) {
            await (type === 'payable' ? financialApi.updatePayable(itemId, data) : financialApi.updateReceivable(itemId, data));
            showNotification('Sucesso', 'Lançamento atualizado!', 'success');
        } else {
            await (type === 'payable' ? financialApi.createPayable(data) : financialApi.createReceivable(data));
            showNotification('Sucesso', `Lançamento adicionado!`, 'success');
        }
        document.getElementById('genericModal').style.display = 'none';
        await fetchAndDisplayData();
    } catch (error) {
        showNotification('Erro', `Não foi possível salvar: ${error.message}`, 'error');
    }
}

async function handleDelete(type, id) {
    const confirmed = await showConfirmation('Confirmar Exclusão', 'Tem certeza? Esta ação é irreversível.');
    if (confirmed) {
        try {
            await (type === 'payable' ? financialApi.deletePayable(id) : financialApi.deleteReceivable(id));
            showNotification('Sucesso', 'Lançamento excluído!', 'success');
            await fetchAndDisplayData();
        } catch (error) {
            showNotification('Erro', `Falha ao excluir: ${error.message}`, 'error');
        }
    }
}

async function handleMarkAsPaid(type, id) {
    const today = new Date().toISOString().split('T')[0];
    try {
        await (type === 'payable' ? financialApi.markAsPaidPayable(id, today) : financialApi.markAsPaidReceivable(id, today));
        showNotification('Sucesso', 'Lançamento atualizado!', 'success');
        await fetchAndDisplayData();
    } catch (error) {
        showNotification('Erro', `Falha ao atualizar status: ${error.message}`, 'error');
    }
}

// Função para aplicar o filtro de status (usando o filtro de data do backend)
function applyFilter(items) {
    const filter = localState.currentFilter;
    if (filter === 'all') return items;
    return items.filter(item => item.status === filter);
}

function renderLists() {
    const payablesList = document.getElementById('payables-list');
    const receivablesList = document.getElementById('receivables-list');
    if (!payablesList || !receivablesList) return;

    const natureMap = new Map(localState.natures.map(n => [n.id, n.name]));
    const costCenterMap = new Map(localState.costCenters.map(c => [c.id, c.name]));

    const filteredPayables = applyFilter(localState.payables);
    const filteredReceivables = applyFilter(localState.receivables);

    const renderItem = (item, type) => {
        const isPaid = item.status === 'paid';
        const itemDataString = JSON.stringify(item).replace(/'/g, "&apos;");
        const natureName = item.naturezaId ? natureMap.get(item.naturezaId) : 'N/A';
        const costCenterName = item.centroDeCustoId ? costCenterMap.get(item.centroDeCustoId) : 'N/A';
        let amountColorClass = type === 'payable' ? 'text-red-600' : 'text-green-600';
        const statusBadgeClass = isPaid ? 'bg-gray-200 text-gray-600' : (type === 'payable' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700');
        const statusText = isPaid ? 'Finalizado' : 'Pendente';
        if (isPaid) amountColorClass = 'text-gray-500';

        return `
        <div class="bg-white p-3 rounded-lg shadow-sm border-l-4 ${isPaid ? 'border-gray-300 opacity-70' : (type === 'payable' ? 'border-red-400' : 'border-green-400')}">
            <div class="flex justify-between items-center">
                <div>
                    <p class="font-bold">${item.description}</p>
                    <p class="text-sm text-gray-500">Vence em: ${new Date(item.dueDate + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                    <div class="flex flex-wrap gap-2 mt-1">
                        <span class="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">Natureza: ${natureName}</span>
                        <span class="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">C. Custo: ${costCenterName}</span>
                    </div>
                </div>
                <div class="flex items-center gap-2 text-right">
                    <p class="font-bold text-lg ${amountColorClass}">R$ ${item.amount.toFixed(2)}</p>
                    <div class="flex flex-col items-center gap-1">
                        <span class="text-xs font-semibold px-2 py-1 rounded-full ${statusBadgeClass}">${statusText}</span>
                        <div class="flex">
                            ${!isPaid ? `<button data-action="mark-as-paid" data-type="${type}" data-id="${item.id}" class="text-gray-500 hover:text-green-500 p-1" title="Marcar como pago/recebido"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></button>` : ''}
                            <button data-action="edit" data-type="${type}" data-item='${itemDataString}' class="text-gray-400 hover:text-blue-500 p-1" title="Editar"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                            <button data-action="delete" data-type="${type}" data-id="${item.id}" class="text-gray-400 hover:text-red-500 p-1" title="Apagar"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    };
    
    payablesList.innerHTML = filteredPayables.map(item => renderItem(item, 'payable')).join('') || '<p class="text-center text-gray-500 py-4">Nenhuma conta a pagar.</p>';
    receivablesList.innerHTML = filteredReceivables.map(item => renderItem(item, 'receivable')).join('') || '<p class="text-center text-gray-500 py-4">Nenhuma conta a receber.</p>';
}

function updateSummary() {
    const pendingPayable = localState.payables.filter(i => i.status === 'pending').reduce((acc, i) => acc + i.amount, 0);
    const pendingReceivable = localState.receivables.filter(i => i.status === 'pending').reduce((acc, i) => acc + i.amount, 0);
    const totalPendingBalance = pendingReceivable - pendingPayable;
    
    // Totais Previstos (Pendentes no período) - MANTIDOS PARA O CÁLCULO NO DOM OCULTO
    document.getElementById('summary-pending-receivables').textContent = `R$ ${pendingReceivable.toFixed(2)}`;
    document.getElementById('summary-pending-payables').textContent = `R$ ${pendingPayable.toFixed(2)}`;
    document.getElementById('summary-pending-balance').textContent = `R$ ${totalPendingBalance.toFixed(2)}`;
    
    const summaryPendingBalanceEl = document.getElementById('summary-pending-balance');
    if (summaryPendingBalanceEl) {
         // Uso de text-2xl para compactação mobile
         summaryPendingBalanceEl.className = `text-2xl font-bold ${totalPendingBalance >= 0 ? 'text-green-600' : 'text-red-600'}`;
    }

    // REMOVIDO: Atualizações do DOM para indicadores secundários (movidos para o modal)
}

function openFinancialModal(type, item = null) {
    // Garante que o menu FAB feche ao abrir o modal
    document.getElementById('fab-menu')?.classList.add('hidden');
    document.getElementById('main-fab-btn')?.classList.remove('rotate-45');
    
    const modal = document.getElementById('genericModal');
    const title = `${item ? 'Editar' : 'Nova'} ${type === 'payable' ? 'Despesa' : 'Receita'}`;
    const buttonClass = type === 'payable' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700';

    const buildOptions = (items) => {
        let optionsHTML = '<option value="">-- Selecione (Opcional) --</option>';
        const hierarchy = buildHierarchy(items);
        const renderOption = (item, prefix = '', level = 0) => {
            const spacer = level > 0 ? '— '.repeat(level) : '';
            optionsHTML += `<option value="${item.id}">${spacer}${item.name}</option>`;
            item.children.forEach(child => renderOption(child, prefix + '— '));
        };
        hierarchy.forEach(root => renderOption(root));
        return optionsHTML;
    };
    
    const natureOptions = buildOptions(localState.natures);
    const costCenterOptions = buildOptions(localState.costCenters);

    // Mostra o campo de parcelas apenas se for uma NOVA entrada
    const installmentsHTML = !item ? `
        <div>
            <label>Número de Parcelas</label>
            <input type="number" name="installments" class="w-full p-2 border rounded-md" value="1" min="1" max="36">
        </div>
    ` : '';

    modal.innerHTML = `
        <div class="modal-content max-w-lg">
            <h2 class="text-2xl font-bold mb-6">${title}</h2>
            <form id="financial-form" class="space-y-4">
                <div><label>Descrição</label><input type="text" name="description" required class="w-full p-2 border rounded-md" value="${item?.description || ''}"></div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="md:col-span-1"><label>Valor Total (R$)</label><input type="number" step="0.01" name="amount" required class="w-full p-2 border rounded-md" value="${item?.amount || ''}"></div>
                    <div class="md:col-span-1"><label>1º Vencimento</label><input type="date" name="dueDate" required class="w-full p-2 border rounded-md" value="${item?.dueDate || ''}"></div>
                    <div class="md:col-span-1">${installmentsHTML}</div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div><label>Natureza</label><select name="naturezaId" class="w-full p-2 border rounded-md bg-white">${natureOptions}</select></div>
                    <div><label>Centro de Custo</label><select name="centroDeCustoId" class="w-full p-2 border rounded-md bg-white">${costCenterOptions}</select></div>
                </div>
                <div><label>Observações</label><textarea name="notes" class="w-full p-2 border rounded-md">${item?.notes || ''}</textarea></div>
                <div class="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                    <label for="status" class="flex items-center cursor-pointer"><div class="relative"><input type="checkbox" id="status" name="status" class="sr-only"><div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div></div><span class="ml-3 font-semibold text-gray-700">Marcar como Pago/Recebido</span></label>
                    <div id="payment-date-container" class="hidden"><label>Data Pgto.</label><input type="date" name="paymentDate" class="p-2 border rounded-md"></div>
                </div>
                <div class="flex gap-4 pt-4"><button type="button" data-action="close-modal" data-target="genericModal" class="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg">Cancelar</button><button type="submit" class="w-full py-2 px-4 text-white font-semibold rounded-lg ${buttonClass}">Salvar</button></div>
            </form>
        </div>`;
    modal.style.display = 'flex';
    
    if(item) {
        modal.querySelector('[name="naturezaId"]').value = item.naturezaId || '';
        modal.querySelector('[name="centroDeCustoId"]').value = item.centroDeCustoId || '';
    }

    const statusToggle = modal.querySelector('#status');
    const paymentDateContainer = modal.querySelector('#payment-date-container');
    const paymentDateInput = modal.querySelector('[name="paymentDate"]');

    if (item?.status === 'paid') {
        statusToggle.checked = true;
        paymentDateContainer.classList.remove('hidden');
        paymentDateInput.value = item.paymentDate || new Date().toISOString().split('T')[0];
    }

    statusToggle.addEventListener('change', () => {
        paymentDateContainer.classList.toggle('hidden', !statusToggle.checked);
        paymentDateInput.required = statusToggle.checked;
    });

    modal.querySelector('#financial-form').addEventListener('submit', (e) => handleFormSubmit(e, type, item?.id));
}


// --- FUNÇÃO DE INICIALIZAÇÃO ---

export async function loadFinancialPage() {
    // Calcula as datas padrão para filtro (1º dia do mês passado até hoje)
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthStr = lastMonth.toISOString().split('T')[0];
    const todayStr = today.toISOString().split('T')[0];
    
    // Atualiza o estado local com as datas padrão
    localState.startDate = lastMonthStr;
    localState.endDate = todayStr;
    localState.currentFilter = 'pending';
    localState.filterNaturezaId = 'all';
    localState.filterCostCenterId = 'all';

    contentDiv.innerHTML = `
        <section>
            <div class="flex flex-wrap gap-4 justify-between items-center mb-6">
                <h2 class="text-3xl font-bold text-gray-800">Módulo Financeiro</h2>
                <div class="flex items-center gap-2 flex-wrap">
                    <button data-action="toggle-filters" class="md:hidden py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 flex items-center gap-2">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                        Filtros
                    </button>
                    <button data-action="open-indicators-modal" class="md:hidden py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 flex items-center gap-2">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6a1 1 0 011-1h4a1 1 0 011 1v13m-6 0a2 2 0 002 2h2a2 2 0 002-2m-6 0H9"/></svg>
                        Indicadores
                    </button>
                    <button data-action="open-settings-modal" class="md:hidden py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 flex items-center gap-2">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        Config.
                    </button>
                    
                    <div class="hidden md:flex items-center gap-2 flex-wrap">
                        <button data-action="open-cash-flow-modal" class="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                            Fluxo de Caixa
                        </button>
                        <button data-action="manage-natures" class="py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700">Gerir Naturezas</button>
                        <button data-action="manage-cost-centers" class="py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700">Gerir Centros de Custo</button>
                        
                        <button data-action="open-indicators-modal" class="py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 flex items-center gap-2">
                             <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6a1 1 0 011-1h4a1 1 0 011 1v13m-6 0a2 2 0 002 2h2a2 2 0 002-2m-6 0H9"/></svg>
                            Indicadores
                        </button>
                    </div>
                </div>
            </div>

            <div id="financial-content">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div class="bg-red-50 border-l-4 border-red-400 p-3 rounded-lg shadow">
                        <p class="text-gray-500 font-semibold text-sm">A Pagar Hoje (Pendente)</p>
                        <p id="summary-today-payables" class="text-2xl font-bold text-red-600">R$ 0,00</p>
                    </div>
                    <div class="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg shadow">
                        <p class="text-gray-500 font-semibold text-sm">A Receber Hoje (Pendente)</p>
                        <p id="summary-today-receivables" class="text-2xl font-bold text-green-600">R$ 0,00</p>
                    </div>
                </div>

                <div id="advanced-filters" class="hidden md:block bg-white p-3 rounded-lg shadow-md mb-4">
                    <h3 class="text-lg font-semibold text-gray-700 mb-3">Filtrar Período e Critérios</h3>
                    <div class="grid grid-cols-2 md:flex md:flex-wrap items-end gap-3 mb-3">
                        <div class="w-full md:w-auto">
                            <label for="filterStartDate" class="text-xs font-medium">De:</label>
                            <input type="date" id="filterStartDate" value="${localState.startDate}" class="w-full p-1 border rounded-md text-sm">
                        </div>
                        <div class="w-full md:w-auto">
                            <label for="filterEndDate" class="text-xs font-medium">Até:</label>
                            <input type="date" id="filterEndDate" value="${localState.endDate}" class="w-full p-1 border rounded-md text-sm">
                        </div>
                        
                        <div class="w-full md:w-48">
                            <label for="filterNaturezaId" class="text-xs font-medium">Natureza:</label>
                            <select id="filterNaturezaId" class="w-full p-1 border rounded-md bg-white text-sm">
                                <option value="all">A carregar...</option>
                            </select>
                        </div>
                        
                        <div class="w-full md:w-48">
                            <label for="filterCostCenterId" class="text-xs font-medium">Centro de Custo:</label>
                            <select id="filterCostCenterId" class="w-full p-1 border rounded-md bg-white text-sm">
                                <option value="all">A carregar...</option>
                            </select>
                        </div>
                        
                        <button id="applyDateFilterBtn" class="w-full md:w-auto py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 col-span-2 md:col-span-auto">Aplicar Filtro</button>
                    </div>
                    
                    <div class="flex flex-wrap items-center justify-center sm:justify-start gap-3 border-t pt-3 mt-3">
                        <button data-status-filter="pending" class="filter-btn py-1 px-3 rounded-full text-xs font-semibold transition-colors bg-gray-100 text-gray-600">Aberto/Pendente</button>
                        <button data-status-filter="paid" class="filter-btn py-1 px-3 rounded-full text-xs font-semibold transition-colors bg-gray-100 text-gray-600">Pago/Finalizado</button>
                        <button data-status-filter="all" class="filter-btn py-1 px-3 rounded-full text-xs font-semibold transition-colors bg-gray-100 text-gray-600">Todos os Lançamentos</button>
                    </div>
                </div>
                
                <div class="hidden">
                    <h3 class="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Resumo Previsto (No Período)</h3>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 text-center">
                        <div class="bg-white p-3 rounded-lg shadow">
                            <p class="text-gray-500 text-sm">A Receber (Pendente)</p>
                            <p id="summary-pending-receivables" class="text-2xl font-bold text-green-600">R$ 0.00</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow">
                            <p class="text-gray-500 text-sm">A Pagar (Pendente)</p>
                            <p id="summary-pending-payables" class="text-2xl font-bold text-red-600">R$ 0.00</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow col-span-2 md:col-span-1">
                            <p class="text-gray-500 text-sm">Saldo Previsto</p>
                            <p id="summary-pending-balance" class="text-2xl font-bold text-gray-800">R$ 0.00</p>
                        </div>
                    </div>
                </div>

                <div id="list-toggle-buttons" class="grid grid-cols-2 gap-3 mb-4 md:hidden">
                    <button data-action="toggle-list-view" data-list="payables" id="btn-payables-view" class="py-2 px-4 font-semibold rounded-lg shadow-md bg-gray-200 text-red-700">Contas a Pagar</button>
                    <button data-action="toggle-list-view" data-list="receivables" id="btn-receivables-view" class="py-2 px-4 font-semibold rounded-lg shadow-md bg-green-100 text-green-700 border border-green-500">Contas a Receber</button>
                </div>


                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div id="payables-container" class="lg:col-span-1">
                        <h3 class="text-xl font-semibold text-red-700 mb-4">Contas a Pagar</h3>
                        <div id="payables-list" class="space-y-3"></div>
                    </div>
                    <div id="receivables-container" class="lg:col-span-1">
                        <h3 class="text-xl font-semibold text-green-700 mb-4">Contas a Receber</h3>
                        <div id="receivables-list" class="space-y-3"></div>
                    </div>
                </div>
            </div>
        </section>
        
        <div id="main-fab-container" class="fixed bottom-6 right-6 z-50">
            <div id="fab-menu" class="flex flex-col items-end space-y-3 mb-3 hidden">
                <button data-action="open-cash-flow-modal" class="p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 flex items-center gap-2 transition-transform transform hover:scale-105 text-sm">
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    Fluxo de Caixa
                </button>
                <button data-action="open-modal" data-type="receivable" class="p-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 flex items-center gap-2 transition-transform transform hover:scale-105 text-sm">
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                    Nova Receita
                </button>
                <button data-action="open-modal" data-type="payable" class="p-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 flex items-center gap-2 transition-transform transform hover:scale-105 text-sm">
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                    Nova Despesa
                </button>
            </div>
            <button data-action="toggle-fab-menu" id="main-fab-btn" class="w-14 h-14 bg-indigo-600 text-white font-bold text-3xl rounded-full shadow-xl hover:bg-indigo-700 flex items-center justify-center transition-transform duration-200">
                <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
            </button>
        </div>
    `;

    // --- CORREÇÃO: LISTENERS DIRETOS NO FAB ---
    // Anexa listeners de clique diretamente nos elementos do FAB após serem renderizados.
    const mainFabBtn = document.getElementById('main-fab-btn');
    const fabMenu = document.getElementById('fab-menu');
    
    if (mainFabBtn && fabMenu) {
        // Listener para o botão principal (+)
        mainFabBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede que o clique "vaze" para o body
            fabMenu.classList.toggle('hidden');
            mainFabBtn.classList.toggle('rotate-45');
        });

        // Listeners para os itens do menu
        const fabReceivableBtn = fabMenu.querySelector('button[data-action="open-modal"][data-type="receivable"]');
        const fabPayableBtn = fabMenu.querySelector('button[data-action="open-modal"][data-type="payable"]');
        const fabCashFlowBtn = fabMenu.querySelector('button[data-action="open-cash-flow-modal"]'); // Listener para o novo botão

        if (fabReceivableBtn) {
            fabReceivableBtn.addEventListener('click', (e) => {
                e.stopPropagation(); 
                openFinancialModal('receivable');
            });
        }

        if (fabPayableBtn) {
            fabPayableBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openFinancialModal('payable');
            });
        }
        
        if (fabCashFlowBtn) {
            fabCashFlowBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openCashFlowModal();
            });
        }
    }
    
    // Remove listeners antigos para evitar duplicação
    if (financialPageEventListener) {
        document.body.removeEventListener('click', financialPageEventListener);
    }
    if (genericModalEventListener) {
        document.getElementById('genericModal').removeEventListener('click', genericModalEventListener);
    }
    
    // --- LÓGICA DE FILTRAGEM (Status e Data/Natureza/CCusto) ---
    
    const handleFilterChangeAndReload = () => {
        // Captura o estado atualizado dos filtros
        const startDateInput = document.getElementById('filterStartDate');
        const endDateInput = document.getElementById('filterEndDate');
        const filterNaturezaId = document.getElementById('filterNaturezaId');
        const filterCostCenterId = document.getElementById('filterCostCenterId');
        
        // Atualiza o estado local com os valores atuais do DOM
        localState.startDate = startDateInput.value;
        localState.endDate = endDateInput.value;
        localState.filterNaturezaId = filterNaturezaId.value;
        localState.filterCostCenterId = filterCostCenterId.value;
        
        // Se a tela for pequena, oculta o painel de filtros após a aplicação
        const advancedFiltersEl = document.getElementById('advanced-filters');
        if (advancedFiltersEl && advancedFiltersEl.classList.contains('hidden') === false) {
            // 768px é o breakpoint 'md' do Tailwind
            if (window.innerWidth < 768) { 
                advancedFiltersEl.classList.add('hidden');
            }
        }
        
        fetchAndDisplayData();
    };

    const handleStatusFilterClick = (e) => {
        const filterBtn = e.target.closest('[data-status-filter]');
        if (!filterBtn) return;
        
        const newFilter = filterBtn.dataset.statusFilter;
        localState.currentFilter = newFilter;
        
        // Atualiza o estilo dos botões
        document.querySelectorAll('[data-status-filter]').forEach(btn => {
            btn.classList.remove('bg-blue-100', 'text-blue-800');
            btn.classList.add('bg-gray-100', 'text-gray-600');
        });
        filterBtn.classList.remove('bg-gray-100', 'text-gray-600');
        filterBtn.classList.add('bg-blue-100', 'text-blue-800');

        renderLists();
    };
    
    // Lógica de alternância de visualização da lista (mobile)
    const toggleListView = (listType) => {
        const payablesContainer = document.getElementById('payables-container');
        const receivablesContainer = document.getElementById('receivables-container');
        const btnPayables = document.getElementById('btn-payables-view');
        const btnReceivables = document.getElementById('btn-receivables-view');

        // Esta função deve funcionar em todas as resoluções, mas a lógica de visibilidade é forçada para mobile no initialSetup.
        if (window.innerWidth >= 1024 && localState.currentListView === listType) return;

        if (listType === 'payables') {
            payablesContainer.classList.remove('hidden');
            receivablesContainer.classList.add('hidden');
            
            if(btnPayables) {
                btnPayables.classList.remove('bg-gray-200');
                btnPayables.classList.add('bg-red-100', 'border', 'border-red-500');
            }
            if(btnReceivables) {
                btnReceivables.classList.remove('bg-green-100', 'border', 'border-green-500');
                btnReceivables.classList.add('bg-gray-200');
            }
        } else { // receivables
            payablesContainer.classList.add('hidden');
            receivablesContainer.classList.remove('hidden');

            if(btnPayables) {
                btnPayables.classList.remove('bg-red-100', 'border', 'border-red-500');
                btnPayables.classList.add('bg-gray-200');
            }
            if(btnReceivables) {
                btnReceivables.classList.remove('bg-gray-200');
                btnReceivables.classList.add('bg-green-100', 'border', 'border-green-500');
            }
        }
        localState.currentListView = listType;
    };


    // --- SETUP DE LISTENERS ---
    
    // Listener principal para aplicar filtros de data/natureza/centro de custo
    document.getElementById('applyDateFilterBtn').addEventListener('click', handleFilterChangeAndReload);
    
    // Listeners de change nos selects de hierarquia
    document.getElementById('filterNaturezaId').addEventListener('change', () => { 
        localState.filterNaturezaId = document.getElementById('filterNaturezaId').value; 
    });
    document.getElementById('filterCostCenterId').addEventListener('change', () => { 
        localState.filterCostCenterId = document.getElementById('filterCostCenterId').value;
    });

    document.querySelectorAll('[data-status-filter]').forEach(btn => {
        btn.addEventListener('click', handleStatusFilterClick);
    });

    // Listener principal da página (agora no document.body)
    financialPageEventListener = (e) => {
        const target = e.target.closest('button[data-action]');
        if (!target) return;

        const { action, type, id } = target.dataset;
        
        // Ações do FAB (toggle-fab-menu, open-modal, open-cash-flow-modal) são tratadas por listeners diretos
        
        if (action === 'edit') openFinancialModal(type, JSON.parse(target.dataset.item.replace(/&apos;/g, "'")));
        else if (action === 'delete') handleDelete(type, id);
        else if (action === 'mark-as-paid') handleMarkAsPaid(type, id);
        else if (action === 'manage-natures') openHierarchyModal('nature'); // Esta ação é reutilizada
        else if (action === 'manage-cost-centers') openHierarchyModal('cost-center'); // Esta ação é reutilizada
        else if (action === 'open-cash-flow-modal') openCashFlowModal(); // Chamado pelo botão do desktop
        else if (action === 'toggle-filters') {
            document.getElementById('advanced-filters')?.classList.toggle('hidden');
        }
        else if (action === 'open-indicators-modal') { 
            openIndicatorsModal();
        }
        // Ação do novo botão de Configurações
        else if (action === 'open-settings-modal') {
            openSettingsModal();
        }
        else if (action === 'toggle-list-view') {
            toggleListView(target.dataset.list);
        }
    };

    // Listener do Modal Genérico
    genericModalEventListener = (e) => {
        const target = e.target.closest('button[data-action^="delete-"]');
        if (target) {
            const type = target.dataset.action.split('-')[1];
            handleDeleteHierarchyItem(type, target.dataset.id);
        }
    };

    // Anexa os listeners principais
    document.body.addEventListener('click', financialPageEventListener);
    document.getElementById('genericModal').addEventListener('click', genericModalEventListener);

    async function handleDeleteHierarchyItem(type, id) {
        const isNature = type === 'nature';
        const deleteApi = isNature ? financialApi.deleteNature : financialApi.deleteCostCenter;
        const api = isNature ? financialApi.getNatures : financialApi.getCostCenters;
        const collectionName = isNature ? 'natures' : 'costCenters';
        const listDiv = document.getElementById('hierarchyList');

        const confirmed = await showConfirmation('Apagar Item', 'Tem a certeza? Apagar um item principal também apagará os seus sub-itens.');
        if(confirmed) {
            try {
                await deleteApi(id);
                // CORREÇÃO: Passar establishmentId
                const updatedItems = await api(state.establishmentId);
                localState[collectionName] = updatedItems;
                renderHierarchyList(listDiv, buildHierarchy(updatedItems), type);
                await fetchAndDisplayData();
            } catch(error) {
                showNotification('Erro', `Não foi possível apagar: ${error.message}`, 'error');
            }
        }
    }

    // Chamada inicial para configurar o estado da visualização da lista no mobile
    const initialSetup = () => {
        const isMobileView = window.innerWidth < 1024;
        const payablesContainer = document.getElementById('payables-container');
        const receivablesContainer = document.getElementById('receivables-container');
        const listToggleButtons = document.getElementById('list-toggle-buttons');

        if (payablesContainer && receivablesContainer) {
            // Garante que a visibilidade padrão seja resetada pelo CSS em telas grandes.
            payablesContainer.classList.remove('hidden');
            receivablesContainer.classList.remove('hidden');

            if (isMobileView) {
                // Força o display em colunas simples para mobile
                payablesContainer.classList.remove('lg:col-span-1');
                receivablesContainer.classList.remove('lg:col-span-1');
                
                // Garante que o container de botões de toggle esteja visível no mobile
                listToggleButtons?.classList.remove('hidden');
                
                // Seta o estado inicial (Receivables visível por padrão)
                toggleListView(localState.currentListView);
                
            } else {
                // Visão Desktop: Ambas as colunas visíveis por padrão (controlado pelo grid lg:grid-cols-2)
                payablesContainer.classList.add('lg:col-span-1');
                receivablesContainer.classList.add('lg:col-span-1');
                listToggleButtons?.classList.add('hidden');
                
                // Remove qualquer classe 'hidden' forçada pela visão mobile
                payablesContainer.classList.remove('hidden');
                receivablesContainer.classList.remove('hidden');
            }
        }
    };
    
    // Roda a configuração inicial e adiciona um listener para redimensionamento
    initialSetup();
    window.addEventListener('resize', initialSetup);
    
    // Aplica o estilo inicial de filtro e carrega os dados
    const initialFilterButton = document.querySelector(`[data-status-filter="${localState.currentFilter}"]`);
    if (initialFilterButton) {
        document.querySelectorAll('[data-status-filter]').forEach(btn => {
            btn.classList.remove('bg-blue-100', 'text-blue-800');
            btn.classList.add('bg-gray-100', 'text-gray-600');
        });
        initialFilterButton.classList.remove('bg-gray-100', 'text-gray-600');
        initialFilterButton.classList.add('bg-blue-100', 'text-blue-800');
    }
    
    // Carrega os dados do dia e os dados filtrados
    try {
        // CORREÇÃO: Passar establishmentId
        const todaySummary = await financialApi.getTodaySummary(state.establishmentId);
        const summaryTodayPayablesEl = document.getElementById('summary-today-payables');
        if (summaryTodayPayablesEl) summaryTodayPayablesEl.textContent = `R$ ${todaySummary.totalPayables.toFixed(2)}`;
        const summaryTodayReceivablesEl = document.getElementById('summary-today-receivables');
        if (summaryTodayReceivablesEl) summaryTodayReceivablesEl.textContent = `R$ ${todaySummary.totalReceivables.toFixed(2)}`;
    } catch (error) {
        showNotification('Erro', 'Não foi possível carregar o resumo do dia.', 'error');
    }
    
    await fetchAndDisplayData();
}