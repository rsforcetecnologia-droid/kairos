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
    filterCostCenterId: 'all'
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

    const items = await api();
    localState[collectionName] = items;
    renderData(items);

    modal.querySelector('#hierarchyForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = modal.querySelector('#itemName').value;
        const parentId = parentSelect.value;
        const createApi = isNature ? financialApi.createNature : financialApi.createCostCenter;
        try {
            await createApi({ name, parentId: parentId || null });
            const updatedItems = await api();
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
        const data = await financialApi.getCashFlowData(startDate, endDate);
        chartContainer.innerHTML = '<canvas id="cashFlowChart"></canvas>';
        renderCashFlowChart(data);
    } catch (error) {
        chartContainer.innerHTML = `<p class="text-red-500 text-center">Erro ao carregar dados do gráfico: ${error.message}</p>`;
    }
}

function openCashFlowModal() {
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
            const [natures, costCenters] = await Promise.all([
                financialApi.getNatures(),
                financialApi.getCostCenters()
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
        const filters = { startDate, endDate };
        
        // Inclui filtros de Natureza e Centro de Custo APENAS se não for 'all'
        if (natureId && natureId !== 'all') filters.natureId = natureId;
        if (costCenterId && costCenterId !== 'all') filters.costCenterId = costCenterId;

        // O API service precisa ser ajustado para aceitar e construir a query string com todos os filtros.
        const [payablesResult, receivablesResult, natures, costCenters] = await Promise.all([
            // Passa o objeto 'filters' completo
            financialApi.getPayables(filters),
            financialApi.getReceivables(filters),
            financialApi.getNatures(),
            financialApi.getCostCenters()
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
    
    // NOVOS TOTALIZADORES
    const paidPayable = localState.payables.filter(i => i.status === 'paid').reduce((acc, i) => acc + i.amount, 0);
    const paidReceivable = localState.receivables.filter(i => i.status === 'paid').reduce((acc, i) => acc + i.amount, 0);
    const currentBalance = paidReceivable - paidPayable; // Saldo do Realizado (DENTRO do período)

    // Totais Previstos (Pendentes no período)
    document.getElementById('summary-pending-receivables').textContent = `R$ ${pendingReceivable.toFixed(2)}`;
    document.getElementById('summary-pending-payables').textContent = `R$ ${pendingPayable.toFixed(2)}`;
    document.getElementById('summary-pending-balance').textContent = `R$ ${totalPendingBalance.toFixed(2)}`;
    document.getElementById('summary-pending-balance').className = `text-3xl font-bold ${totalPendingBalance >= 0 ? 'text-green-600' : 'text-red-600'}`;

    // Totais Realizados (Pagos/Recebidos no período)
    document.getElementById('summary-paid-receivables').textContent = `R$ ${paidReceivable.toFixed(2)}`;
    document.getElementById('summary-paid-payables').textContent = `R$ ${paidPayable.toFixed(2)}`;
    document.getElementById('summary-current-balance').textContent = `R$ ${currentBalance.toFixed(2)}`;
    document.getElementById('summary-current-balance').className = `text-3xl font-bold ${currentBalance >= 0 ? 'text-green-600' : 'text-red-600'}`;
    
    // NOVO: Saldo Anterior (Acumulado Realizado do período anterior)
    const previousBalance = localState.previousBalance || 0;
    document.getElementById('summary-previous-balance').textContent = `R$ ${previousBalance.toFixed(2)}`;
    document.getElementById('summary-previous-balance').className = `text-3xl font-bold ${previousBalance >= 0 ? 'text-green-600' : 'text-red-600'}`;
}

function openFinancialModal(type, item = null) {
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
                    <button data-action="open-cash-flow-modal" class="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                        Fluxo de Caixa
                    </button>
                    <button data-action="manage-natures" class="py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700">Gerir Naturezas</button>
                    <button data-action="manage-cost-centers" class="py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700">Gerir Centros de Custo</button>
                    <button data-action="open-modal" data-type="payable" class="py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700">+ Nova Despesa</button>
                    <button data-action="open-modal" data-type="receivable" class="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700">+ Nova Receita</button>
                </div>
            </div>

            <div id="financial-content">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div class="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg shadow">
                        <p class="text-gray-500 font-semibold">A Pagar Hoje (Pendente)</p>
                        <p id="summary-today-payables" class="text-3xl font-bold text-red-600">R$ 0,00</p>
                    </div>
                    <div class="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg shadow">
                        <p class="text-gray-500 font-semibold">A Receber Hoje (Pendente)</p>
                        <p id="summary-today-receivables" class="text-3xl font-bold text-green-600">R$ 0,00</p>
                    </div>
                </div>

                <div class="bg-white p-4 rounded-lg shadow-md mb-6">
                    <h3 class="text-lg font-semibold text-gray-700 mb-4">Filtrar Período e Critérios</h3>
                    <div class="flex flex-wrap items-end gap-4 mb-4">
                        <div>
                            <label for="filterStartDate" class="text-sm font-medium">De:</label>
                            <input type="date" id="filterStartDate" value="${localState.startDate}" class="p-2 border rounded-md">
                        </div>
                        <div>
                            <label for="filterEndDate" class="text-sm font-medium">Até:</label>
                            <input type="date" id="filterEndDate" value="${localState.endDate}" class="p-2 border rounded-md">
                        </div>
                        
                        <div>
                            <label for="filterNaturezaId" class="text-sm font-medium">Natureza:</label>
                            <select id="filterNaturezaId" class="p-2 border rounded-md bg-white w-48">
                                <option value="all">A carregar...</option>
                            </select>
                        </div>
                        
                        <div>
                            <label for="filterCostCenterId" class="text-sm font-medium">Centro de Custo:</label>
                            <select id="filterCostCenterId" class="p-2 border rounded-md bg-white w-48">
                                <option value="all">A carregar...</option>
                            </select>
                        </div>
                        
                        <button id="applyDateFilterBtn" class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">Aplicar Filtro</button>
                    </div>
                    
                    <div class="flex flex-wrap items-center justify-center sm:justify-start gap-3 border-t pt-4">
                        <button data-status-filter="pending" class="filter-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors bg-gray-100 text-gray-600">Aberto/Pendente</button>
                        <button data-status-filter="paid" class="filter-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors bg-gray-100 text-gray-600">Pago/Finalizado</button>
                        <button data-status-filter="all" class="filter-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors bg-gray-100 text-gray-600">Todos os Lançamentos</button>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 text-center">
                    <div class="bg-white p-4 rounded-lg shadow md:col-span-1 border-l-4 border-indigo-400">
                        <p class="text-gray-500">Saldo Anterior (Realizado)</p>
                        <p id="summary-previous-balance" class="text-3xl font-bold text-gray-800">R$ 0.00</p>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow"><p class="text-gray-500">Recebido (Total)</p><p id="summary-paid-receivables" class="text-3xl font-bold text-green-600">R$ 0.00</p></div>
                    <div class="bg-white p-4 rounded-lg shadow"><p class="text-gray-500">Pago (Total)</p><p id="summary-paid-payables" class="text-3xl font-bold text-red-600">R$ 0.00</p></div>
                    <div class="bg-white p-4 rounded-lg shadow"><p class="text-gray-500">Saldo do Período (Realizado)</p><p id="summary-current-balance" class="text-3xl font-bold text-gray-800">R$ 0.00</p></div>
                </div>

                <h3 class="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Resumo Previsto (No Período)</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
                    <div class="bg-white p-4 rounded-lg shadow"><p class="text-gray-500">A Receber (Pendente)</p><p id="summary-pending-receivables" class="text-3xl font-bold text-green-600">R$ 0.00</p></div>
                    <div class="bg-white p-4 rounded-lg shadow"><p class="text-gray-500">A Pagar (Pendente)</p><p id="summary-pending-payables" class="text-3xl font-bold text-red-600">R$ 0.00</p></div>
                    <div class="bg-white p-4 rounded-lg shadow"><p class="text-gray-500">Saldo Previsto</p><p id="summary-pending-balance" class="text-3xl font-bold text-gray-800">R$ 0.00</p></div>
                </div>


                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div><h3 class="text-xl font-semibold text-red-700 mb-4">Contas a Pagar</h3><div id="payables-list" class="space-y-3"></div></div>
                    <div><h3 class="text-xl font-semibold text-green-700 mb-4">Contas a Receber</h3><div id="receivables-list" class="space-y-3"></div></div>
                </div>
            </div>
        </section>
    `;

    // Remove listeners antigos para evitar duplicação
    if (financialPageEventListener) {
        contentDiv.removeEventListener('click', financialPageEventListener);
    }
    if (genericModalEventListener) {
        document.getElementById('genericModal').removeEventListener('click', genericModalEventListener);
    }
    
    // --- LÓGICA DE FILTRAGEM (Status e Data/Natureza/CCusto) ---
    
    const handleFilterChange = () => {
        // Captura o estado atualizado dos filtros
        const startDateInput = document.getElementById('filterStartDate');
        const endDateInput = document.getElementById('filterEndDate');
        
        localState.startDate = startDateInput.value;
        localState.endDate = endDateInput.value;
        localState.filterNaturezaId = document.getElementById('filterNaturezaId').value;
        localState.filterCostCenterId = document.getElementById('filterCostCenterId').value;
        
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

    // --- SETUP DE LISTENERS ---
    
    // Listener principal para aplicar filtros de data/natureza/centro de custo
    document.getElementById('applyDateFilterBtn').addEventListener('click', handleFilterChange);
    document.getElementById('filterNaturezaId').addEventListener('change', handleFilterChange);
    document.getElementById('filterCostCenterId').addEventListener('change', handleFilterChange);
    
    document.querySelectorAll('[data-status-filter]').forEach(btn => {
        btn.addEventListener('click', handleStatusFilterClick);
    });

    financialPageEventListener = (e) => {
        const target = e.target.closest('button[data-action]');
        if (!target) return;

        const { action, type, id } = target.dataset;
        if (action === 'open-modal') openFinancialModal(type);
        else if (action === 'edit') openFinancialModal(type, JSON.parse(target.dataset.item.replace(/&apos;/g, "'")));
        else if (action === 'delete') handleDelete(type, id);
        else if (action === 'mark-as-paid') handleMarkAsPaid(type, id);
        else if (action === 'manage-natures') openHierarchyModal('nature');
        else if (action === 'manage-cost-centers') openHierarchyModal('cost-center');
        else if (action === 'open-cash-flow-modal') openCashFlowModal();
    };

    genericModalEventListener = (e) => {
        const target = e.target.closest('button[data-action^="delete-"]');
        if (target) {
            const type = target.dataset.action.split('-')[1];
            handleDeleteHierarchyItem(type, target.dataset.id);
        }
    };

    contentDiv.addEventListener('click', financialPageEventListener);
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
                const updatedItems = await api();
                localState[collectionName] = updatedItems;
                renderHierarchyList(listDiv, buildHierarchy(updatedItems), type);
                await fetchAndDisplayData();
            } catch(error) {
                showNotification('Erro', `Não foi possível apagar: ${error.message}`, 'error');
            }
        }
    }

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
        const todaySummary = await financialApi.getTodaySummary();
        document.getElementById('summary-today-payables').textContent = `R$ ${todaySummary.totalPayables.toFixed(2)}`;
        document.getElementById('summary-today-receivables').textContent = `R$ ${todaySummary.totalReceivables.toFixed(2)}`;
    } catch (error) {
        showNotification('Erro', 'Não foi possível carregar o resumo do dia.', 'error');
    }
    
    await fetchAndDisplayData();
}