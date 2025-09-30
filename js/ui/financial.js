import * as financialApi from '../api/financial.js';
import { state } from '../state.js';
import { showNotification, showConfirmation } from '../components/modal.js';

const contentDiv = document.getElementById('content');
let localState = { payables: [], receivables: [], natures: [], costCenters: [] };
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
    const renderNode = (item, level = 0) => `
        <div style="margin-left: ${level * 20}px;" class="flex justify-between items-center bg-gray-100 p-2 rounded">
            <span>${item.name}</span>
            <button data-action="delete-${type}" data-id="${item.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
        </div>
        ${item.children.map(child => renderNode(child, level + 1)).join('')}
    `;
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
        const renderOption = (item, prefix = '') => {
            parentSelect.innerHTML += `<option value="${item.id}">${prefix}${item.name}</option>`;
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

    // ✅ CORREÇÃO: Transforma os valores de despesas em números negativos para o gráfico
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
                    data: negativePayables, // Usa os valores negativos
                    backgroundColor: 'rgba(248, 113, 113, 0.6)',
                    borderColor: 'rgba(239, 68, 68, 1)',
                    borderWidth: 1,
                    yAxisID: 'y',
                },
                {
                    label: 'Saldo Esperado',
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
                                // Mostra o valor absoluto para a dica de despesas
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

async function fetchAndDisplayData() {
    const content = document.getElementById('financial-content');
    try {
        const [payables, receivables, natures, costCenters] = await Promise.all([
            financialApi.getPayables(),
            financialApi.getReceivables(),
            financialApi.getNatures(),
            financialApi.getCostCenters()
        ]);
        localState = { payables, receivables, natures, costCenters };
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

function renderLists() {
    const payablesList = document.getElementById('payables-list');
    const receivablesList = document.getElementById('receivables-list');
    if (!payablesList || !receivablesList) return;

    const natureMap = new Map(localState.natures.map(n => [n.id, n.name]));
    const costCenterMap = new Map(localState.costCenters.map(c => [c.id, c.name]));

    const renderItem = (item, type) => {
        const isPaid = item.status === 'paid';
        const itemDataString = JSON.stringify(item).replace(/'/g, "&apos;");
        const natureName = item.naturezaId ? natureMap.get(item.naturezaId) : 'N/A';
        const costCenterName = item.centroDeCustoId ? costCenterMap.get(item.centroDeCustoId) : 'N/A';
        let amountColorClass = type === 'payable' ? 'text-red-600' : 'text-green-600';
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
                        ${!isPaid ? `<button data-action="mark-as-paid" data-type="${type}" data-id="${item.id}" class="text-xs bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-full hover:bg-green-200">Pago</button>` : `<span class="text-xs bg-gray-200 text-gray-600 font-semibold px-2 py-1 rounded-full">Finalizado</span>`}
                        <div class="flex">
                            <button data-action="edit" data-type="${type}" data-item='${itemDataString}' class="text-gray-400 hover:text-blue-500 p-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                            <button data-action="delete" data-type="${type}" data-id="${item.id}" class="text-gray-400 hover:text-red-500 p-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    };
    
    payablesList.innerHTML = localState.payables.map(item => renderItem(item, 'payable')).join('') || '<p class="text-center text-gray-500 py-4">Nenhuma conta a pagar.</p>';
    receivablesList.innerHTML = localState.receivables.map(item => renderItem(item, 'receivable')).join('') || '<p class="text-center text-gray-500 py-4">Nenhuma conta a receber.</p>';
}

function updateSummary() {
    const totalPayable = localState.payables.filter(i => i.status === 'pending').reduce((acc, i) => acc + i.amount, 0);
    const totalReceivable = localState.receivables.filter(i => i.status === 'pending').reduce((acc, i) => acc + i.amount, 0);
    const balance = totalReceivable - totalPayable;
    
    document.getElementById('summary-receivables').textContent = `R$ ${totalReceivable.toFixed(2)}`;
    document.getElementById('summary-payables').textContent = `R$ ${totalPayable.toFixed(2)}`;
    document.getElementById('summary-balance').textContent = `R$ ${balance.toFixed(2)}`;
    document.getElementById('summary-balance').className = `text-3xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`;
}

function openFinancialModal(type, item = null) {
    const modal = document.getElementById('genericModal');
    const title = `${item ? 'Editar' : 'Nova'} ${type === 'payable' ? 'Despesa' : 'Receita'}`;
    const buttonClass = type === 'payable' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700';

    const buildOptions = (items) => {
        let optionsHTML = '<option value="">Selecione...</option>';
        const hierarchy = buildHierarchy(items);
        const renderOption = (item, prefix = '') => {
            optionsHTML += `<option value="${item.id}">${prefix}${item.name}</option>`;
            item.children.forEach(child => renderOption(child, prefix + '— '));
        };
        hierarchy.forEach(root => renderOption(root));
        return optionsHTML;
    };
    
    const natureOptions = buildOptions(localState.natures);
    const costCenterOptions = buildOptions(localState.costCenters);

    modal.innerHTML = `
        <div class="modal-content max-w-lg">
            <h2 class="text-2xl font-bold mb-6">${title}</h2>
            <form id="financial-form" class="space-y-4">
                <div><label>Descrição</label><input type="text" name="description" required class="w-full p-2 border rounded-md" value="${item?.description || ''}"></div>
                <div class="grid grid-cols-2 gap-4">
                    <div><label>Valor (R$)</label><input type="number" step="0.01" name="amount" required class="w-full p-2 border rounded-md" value="${item?.amount || ''}"></div>
                    <div><label>Data de Vencimento</label><input type="date" name="dueDate" required class="w-full p-2 border rounded-md" value="${item?.dueDate || ''}"></div>
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
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
                    <div class="bg-white p-4 rounded-lg shadow"><p class="text-gray-500">A Receber (Pendente)</p><p id="summary-receivables" class="text-3xl font-bold text-green-600">R$ 0.00</p></div>
                    <div class="bg-white p-4 rounded-lg shadow"><p class="text-gray-500">A Pagar (Pendente)</p><p id="summary-payables" class="text-3xl font-bold text-red-600">R$ 0.00</p></div>
                    <div class="bg-white p-4 rounded-lg shadow"><p class="text-gray-500">Saldo Previsto</p><p id="summary-balance" class="text-3xl font-bold text-gray-800">R$ 0.00</p></div>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div><h3 class="text-xl font-semibold text-red-700 mb-4">Contas a Pagar</h3><div id="payables-list" class="space-y-3"></div></div>
                    <div><h3 class="text-xl font-semibold text-green-700 mb-4">Contas a Receber</h3><div id="receivables-list" class="space-y-3"></div></div>
                </div>
            </div>
        </section>
    `;

    if (financialPageEventListener) {
        contentDiv.removeEventListener('click', financialPageEventListener);
    }
    if (genericModalEventListener) {
        document.getElementById('genericModal').removeEventListener('click', genericModalEventListener);
    }

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
                 fetchAndDisplayData();
            } catch(error) {
                showNotification('Erro', `Não foi possível apagar: ${error.message}`, 'error');
            }
        }
    }

    await fetchAndDisplayData();
}