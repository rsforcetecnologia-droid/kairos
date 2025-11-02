// js/ui/financial.js
// (ATUALIZADO: Lógica de exclusão simplificada para o modelo "Contínuo")

// --- 1. IMPORTAÇÕES ---
import {
    getPayables,
    createPayable,
    updatePayable,
    deletePayable,
    markAsPaidPayable,
    getReceivables,
    createReceivable,
    updateReceivable,
    deleteReceivable,
    markAsPaidReceivable,
    getCashFlowData,
    getTodaySummary,
    getNatures,
    getCostCenters
} from '../api/financial.js';
import { state } from '../state.js';
import { showNotification, showConfirmation, showGenericModal } from '../components/modal.js';

// --- 2. ESTADO LOCAL (Baseado no Original) ---
let localState = {
    payables: [],
    receivables: [],
    natures: [],
    costCenters: [],
    currentStatusFilter: 'pending', // 'pending', 'paid', 'all'
    activeTab: 'receber', // 'receber' ou 'pagar'
    filters: {
        startDate: '',
        endDate: '',
        natureId: 'all',
        costCenterId: 'all'
    }
};

let pageEventListener = null;
let contentDiv = null;
let cashFlowChart = null; 

// --- 3. FUNÇÕES DE RENDERIZAÇÃO DA UI ---

/**
 * Renderiza o layout principal da página
 */
function renderPageLayout() {
    const today = new Date();
    // Datas padrão do código original (mês anterior até hoje)
    const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().split('T')[0];
    const todayStr = today.toISOString().split('T')[0];

    localState.filters.startDate = firstDayOfLastMonth;
    localState.filters.endDate = todayStr;

    contentDiv.innerHTML = `
        <section>
            <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 class="text-3xl font-bold text-gray-800">Financeiro</h2>
                <div class="flex items-center gap-2 flex-wrap">
                    <button data-action="open-cash-flow-modal" class="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700">Fluxo de Caixa</button>
                    <button data-action="add-entry" class="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md">
                        + Lançamento
                    </button>
                </div>
            </div>

            <div id="today-summary-container" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                 <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
                    <h4 class="text-sm font-medium text-gray-500">A PAGAR (Venc. Hoje)</h4>
                    <p id="summary-payables" class="text-3xl font-bold text-red-600"><div class="loader-small mx-auto"></div></p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
                    <h4 class="text-sm font-medium text-gray-500">A RECEBER (Venc. Hoje)</h4>
                    <p id="summary-receivables" class="text-3xl font-bold text-green-600"><div class="loader-small mx-auto"></div></p>
                </div>
            </div>

            <div class="mb-6 p-4 bg-white rounded-lg shadow-md border">
                <h3 class="text-xl font-bold text-gray-800 mb-4">Filtros de Lançamentos</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label for="filter-start-date" class="block text-sm font-medium text-gray-700">De:</label>
                        <input type="date" id="filter-start-date" value="${firstDayOfLastMonth}" class="mt-1 w-full p-2 border rounded-md">
                    </div>
                    <div>
                        <label for="filter-end-date" class="block text-sm font-medium text-gray-700">Até:</label>
                        <input type="date" id="filter-end-date" value="${todayStr}" class="mt-1 w-full p-2 border rounded-md">
                    </div>
                    <div>
                        <label for="filter-natureId" class="block text-sm font-medium text-gray-700">Natureza:</label>
                        <select id="filter-natureId" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="all">Carregando...</option></select>
                    </div>
                    <div>
                        <label for="filter-costCenterId" class="block text-sm font-medium text-gray-700">Centro de Custo:</label>
                        <select id="filter-costCenterId" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="all">Carregando...</option></select>
                    </div>
                    <div class="md:col-span-2 flex items-end">
                         <button data-action="filter-entries" class="w-full py-2 px-4 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800">
                            Aplicar Filtros
                        </button>
                    </div>
                </div>
                 <div class="flex flex-wrap items-center justify-center sm:justify-start gap-3 border-t pt-4 mt-4">
                    <button data-status-filter="pending" class="filter-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors">Aberto/Pendente</button>
                    <button data-status-filter="paid" class="filter-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors">Pago/Finalizado</button>
                    <button data-status-filter="all" class="filter-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors">Todos</button>
                </div>
            </div>

            <div id="kpi-container" class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div class="bg-white p-4 rounded-lg shadow-sm border">
                    <h4 class="text-sm font-medium text-green-700">A Receber (Previsto)</h4>
                    <p id="kpi-receber" class="text-3xl font-bold text-green-600">R$ 0,00</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm border">
                    <h4 class="text-sm font-medium text-red-700">A Pagar (Previsto)</h4>
                    <p id="kpi-pagar" class="text-3xl font-bold text-red-600">R$ 0,00</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm border">
                    <h4 class="text-sm font-medium text-gray-700">Saldo Previsto</h4>
                    <p id="kpi-previsto" class="text-3xl font-bold text-gray-800">R$ 0,00</p>
                </div>
            </div>
            
            <nav class="flex space-x-4 border-b-2 mb-6">
                <button data-tab="receber" class="tab-btn py-2 px-4 font-semibold text-lg border-b-4 border-transparent">Contas a Receber</button>
                <button data-tab="pagar" class="tab-btn py-2 px-4 font-semibold text-lg border-b-4 border-transparent">Contas a Pagar</button>
            </nav>

            <div id="financial-list-container" class="bg-gray-50 p-4 rounded-lg min-h-[400px]">
                <div id="financial-list" class="space-y-3">
                    </div>
            </div>
        </section>
    `;
}

/**
 * Constrói as opções de select hierárquicas
 */
function buildHierarchyOptions(items, selectedId = 'all') {
    let optionsHTML = '<option value="all">Todos</option>';
    const map = new Map();
    const roots = [];
    if (!items) return optionsHTML;
    items.forEach(item => map.set(item.id, { ...item, children: [] }));
    map.forEach(item => {
        if (item.parentId && map.has(item.parentId)) {
            map.get(item.parentId).children.push(item);
        } else {
            roots.push(item);
        }
    });

    const renderOption = (item, level = 0) => {
        const spacer = level > 0 ? '— '.repeat(level) : '';
        const selected = item.id === selectedId ? 'selected' : '';
        optionsHTML += `<option value="${item.id}" ${selected}>${spacer}${item.name}</option>`;
        item.children.forEach(child => renderOption(child, level + 1));
    };
    roots.forEach(root => renderOption(root));
    return optionsHTML;
}

/**
 * Renderiza os KPIs (indicadores)
 */
function renderListKPIs() {
    const kpiReceber = document.getElementById('kpi-receber');
    const kpiPagar = document.getElementById('kpi-pagar');
    const kpiPrevisto = document.getElementById('kpi-previsto');

    // Filtra pelo status selecionado (lógica original)
    const filterByStatus = (item) => localState.currentStatusFilter === 'all' || item.status === localState.currentStatusFilter;

    const pendingReceber = localState.receivables
        .filter(filterByStatus)
        .reduce((sum, e) => sum + e.amount, 0);

    const pendingPagar = localState.payables
        .filter(filterByStatus)
        .reduce((sum, e) => sum + e.amount, 0);
        
    const saldoPrevisto = pendingReceber - pendingPagar;

    if (kpiReceber) kpiReceber.textContent = `R$ ${pendingReceber.toFixed(2)}`;
    if (kpiPagar) kpiPagar.textContent = `R$ ${pendingPagar.toFixed(2)}`;
    if (kpiPrevisto) {
         kpiPrevisto.textContent = `R$ ${saldoPrevisto.toFixed(2)}`;
         kpiPrevisto.className = `text-3xl font-bold ${saldoPrevisto >= 0 ? 'text-green-600' : 'text-red-600'}`;
    }
}

/**
 * Renderiza a lista de lançamentos como CARDS
 */
function renderList() {
    const listContainer = document.getElementById('financial-list');
    if (!listContainer) return;

    // 1. Define qual array base usar
    const baseEntries = (localState.activeTab === 'receber') ? localState.receivables : localState.payables;

    // 2. Filtra pelo status selecionado (lógica original)
    const filteredEntries = baseEntries.filter(e => {
        return localState.currentStatusFilter === 'all' || e.status === localState.currentStatusFilter;
    });

    if (filteredEntries.length === 0) {
        listContainer.innerHTML = `<p class="text-center text-gray-500 py-10">Nenhum lançamento encontrado para esta combinação de filtros.</p>`;
        return;
    }
    
    // 3. Ordena pela data de vencimento
    filteredEntries.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    // 4. Mapeia para os cards
    const natureMap = new Map((localState.natures || []).map(n => [n.id, n.name]));
    const costCenterMap = new Map((localState.costCenters || []).map(c => [c.id, c.name]));

    listContainer.innerHTML = filteredEntries.map(entry => {
        const isPending = entry.status === 'pending';
        const isReceber = localState.activeTab === 'receber';
        
        const amountColor = isReceber ? 'text-green-600' : 'text-red-600';
        const statusColor = isPending ? 'text-yellow-600' : 'text-gray-500';
        const statusText = isPending ? 'Pendente' : (isReceber ? 'Recebido' : 'Pago');
        
        const dueDate = new Date(entry.dueDate);
        dueDate.setUTCDate(dueDate.getUTCDate() + 1);
        const formattedDueDate = dueDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' });

        const natureName = entry.naturezaId ? natureMap.get(entry.naturezaId) : 'N/A';
        const costCenterName = entry.centroDeCustoId ? costCenterMap.get(entry.centroDeCustoId) : 'N/A';

        // Armazena o tipo correto no item para o botão de edição
        entry.type = isReceber ? 'receber' : 'pagar';
        const itemDataString = JSON.stringify(entry).replace(/'/g, "&apos;");

        return `
            <div class="bg-white p-4 rounded-lg shadow-md border animate-fade-in-fast">
                
                <div class="flex justify-between items-start mb-2">
                    <span class="font-bold text-gray-800 break-words">${entry.description}</span>
                    <span class="font-bold text-xl ${amountColor} ml-4 whitespace-nowrap">
                        ${isReceber ? '' : '-'} R$ ${entry.amount.toFixed(2)}
                    </span>
                </div>

                <div class="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-600 mb-4">
                    <p>
                        Vencimento: <strong class="font-medium">${formattedDueDate}</strong>
                         ${(entry.isRecurring || entry.recurringGroupId) ? '<span class="text-xs text-blue-500 ml-2">(Fixo)</span>' : ''}
                    </p>
                    <div class="flex gap-2">
                        <span class="text-xs font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">Natureza: ${natureName}</span>
                        <span class="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">C. Custo: ${costCenterName}</span>
                    </div>
                </div>

                <div class="flex justify-between items-center pt-2 border-t border-gray-100">
                    <span class="text-sm font-semibold ${statusColor}">${statusText}</span>
                    <div class="flex gap-2">
                        ${isPending ? `
                            <button data-action="mark-paid" data-id="${entry.id}" 
                                class="py-1 px-3 text-sm ${isReceber ? 'bg-green-500' : 'bg-red-500'} text-white font-semibold rounded-md hover:opacity-80">
                                ${isReceber ? 'Baixar' : 'Pagar'}
                            </button>
                        ` : ''}
                        <button data-action="edit" data-id="${entry.id}" data-item='${itemDataString}' class="py-1 px-3 text-sm bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300">
                            Editar
                        </button>
                        <button data-action="delete" data-id="${entry.id}" data-item='${itemDataString}' class="py-1 px-3 text-sm bg-red-100 text-red-700 font-semibold rounded-md hover:bg-red-200">
                            Excluir
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}


// --- 4. FUNÇÕES DE MODAIS ---

/**
 * (Híbrido) Abre o modal de Lançamento (Novo layout + campos originais)
 */
function openEntryModal(entry = null) {
    const isEdit = entry !== null;
    const title = isEdit ? 'Editar Lançamento' : 'Novo Lançamento';
    const today = new Date().toISOString().split('T')[0];
    
    const entryType = isEdit ? entry.type : localState.activeTab;

    const natureOptions = buildHierarchyOptions(localState.natures, isEdit ? entry.naturezaId : null);
    const costCenterOptions = buildHierarchyOptions(localState.costCenters, isEdit ? entry.centroDeCustoId : null);
    
    // Em modo de edição, o valor da parcela não deve ser mostrado (lógica original)
    // Mas se for recorrente, o valor é o "template", então deve ser mostrado.
    const amountValue = isEdit ? entry.amount : '';
    
    // Se for edição de um lançamento fixo ou parcelado, desabilita a edição de valor/parcela
    const isPartOfSeries = isEdit && (entry.installmentInfo || entry.recurringGroupId);

    const contentHTML = `
        <form id="entry-form" class="space-y-4">
            <input type="hidden" id="entry-id" value="${isEdit ? entry.id : ''}">
            
            <div>
                <label for="entry-type" class="block text-sm font-medium text-gray-700">Tipo de Lançamento</label>
                <select id="entry-type" required 
                        class="mt-1 w-full p-2 border rounded-md ${isEdit ? 'bg-gray-100 text-gray-500' : 'bg-white'}" 
                        ${isEdit ? 'disabled' : ''}>
                    
                    <option value="receber" ${entryType === 'receber' ? 'selected' : ''}>
                        A Receber
                    </option>
                    <option value="pagar" ${entryType === 'pagar' ? 'selected' : ''}>
                        A Pagar
                    </option>
                </select>
            </div>

            <div>
                <label for="entry-description" class="block text-sm font-medium text-gray-700">Descrição</label>
                <input type="text" id="entry-description" required value="${isEdit ? entry.description : ''}" class="mt-1 w-full p-2 border rounded-md" placeholder="Ex: Aluguel, Compra de estoque">
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label for="entry-amount" class="block text-sm font-medium text-gray-700">${!isEdit ? 'Valor Total (R$)' : 'Valor (R$)'}</label>
                    <input type="number" step="0.01" id="entry-amount" required value="${amountValue}" 
                           class="mt-1 w-full p-2 border rounded-md ${isPartOfSeries ? 'bg-gray-100 text-gray-500' : 'bg-white'}"
                           ${isPartOfSeries ? 'disabled' : ''}>
                    ${isPartOfSeries ? '<p class="text-xs text-gray-500 mt-1">O valor de lançamentos parcelados ou fixos não pode ser editado individualmente.</p>' : ''}
                </div>
                <div>
                    <label for="entry-due-date" class="block text-sm font-medium text-gray-700">${isEdit ? 'Vencimento' : '1º Vencimento'}</label>
                    <input type="date" id="entry-due-date" required value="${isEdit ? entry.dueDate.split('T')[0] : today}" class="mt-1 w-full p-2 border rounded-md">
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                 <div>
                    <label for="entry-natureId" class="block text-sm font-medium text-gray-700">Natureza Financeira</label>
                    <select id="entry-natureId" class="mt-1 w-full p-2 border rounded-md bg-white">${natureOptions}</select>
                </div>
                 <div>
                    <label for="entry-costCenterId" class="block text-sm font-medium text-gray-700">Centro de Custo</label>
                    <select id="entry-costCenterId" class="mt-1 w-full p-2 border rounded-md bg-white">${costCenterOptions}</select>
                </div>
            </div>

            <div>
                <label for="entry-notes" class="block text-sm font-medium text-gray-700">Observações (Opcional)</label>
                <textarea id="entry-notes" rows="2" class="mt-1 w-full p-2 border rounded-md">${isEdit ? entry.notes || '' : ''}</textarea>
            </div>


            ${!isEdit ? `
            <div class="border-t pt-4 space-y-4">
                <label class="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" id="entry-is-installment" class="h-4 w-4 text-blue-600 rounded">
                    <span class="text-sm font-medium text-gray-700">Lançamento parcelado?</span>
                </label>
                
                <div id="installment-fields" class="hidden space-y-4 p-4 bg-gray-50 rounded-md">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="entry-installments" class="block text-sm font-medium text-gray-700">Nº de Parcelas</label>
                            <input type="number" id="entry-installments" value="2" min="2" class="mt-1 w-full p-2 border rounded-md">
                        </div>
                        <div>
                            <label for="entry-frequency" class="block text-sm font-medium text-gray-700">Frequência</label>
                            <select id="entry-frequency" class="mt-1 w-full p-2 border rounded-md bg-white">
                                <option value="monthly">Mensal</option>
                                <option value="weekly">Semanal</option>
                                <option value="daily">Diário</option>
                            </select>
                        </div>
                    </div>
                </div>

                <label class="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" id="entry-is-recurring" class="h-4 w-4 text-blue-600 rounded">
                    <span class="text-sm font-medium text-gray-700">Lançamento Fixo (Repete Mensalmente)</span>
                </label>
            </div>
            ` : ''}

            <div class="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <label for="entry-status" class="flex items-center cursor-pointer">
                    <div class="relative"><input type="checkbox" id="entry-status" class="sr-only"><div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div></div>
                    <span class="ml-3 font-semibold text-gray-700">Marcar como Pago/Recebido</span>
                </label>
                <div id="payment-date-container" class="hidden">
                    <label class="block text-sm font-medium text-gray-700">Data Pgto.</label>
                    <input type="date" id="entry-paymentDate" class="p-2 border rounded-md">
                </div>
            </div>
            
            <div class="pt-4 border-t">
                <button type="submit" class="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all">
                    Salvar Lançamento
                </button>
            </div>
        </form>
    `;

    const { modalElement } = showGenericModal({ title, contentHTML, maxWidth: 'max-w-md' });

    // --- Listeners do Modal ---

    if (!isEdit) {
        const installmentCheckbox = modalElement.querySelector('#entry-is-installment');
        const installmentFields = modalElement.querySelector('#installment-fields');
        const recurringCheckbox = modalElement.querySelector('#entry-is-recurring');

        installmentCheckbox.addEventListener('change', (e) => {
            installmentFields.style.display = e.target.checked ? 'block' : 'none';
            if (e.target.checked) {
                recurringCheckbox.checked = false; 
            }
        });

        recurringCheckbox.addEventListener('change', (e) => {
             if (e.target.checked) {
                installmentCheckbox.checked = false; 
                installmentFields.style.display = 'none';
            }
        });
    }

    const statusToggle = modalElement.querySelector('#entry-status');
    const paymentDateContainer = modalElement.querySelector('#payment-date-container');
    const paymentDateInput = modalElement.querySelector('#entry-paymentDate');

    if (isEdit && entry.status === 'paid') {
        statusToggle.checked = true;
        paymentDateContainer.classList.remove('hidden');
        paymentDateInput.value = entry.paymentDate || today;
    }

    statusToggle.addEventListener('change', () => {
        paymentDateContainer.classList.toggle('hidden', !statusToggle.checked);
        if (statusToggle.checked && !paymentDateInput.value) {
            paymentDateInput.value = today;
        }
    });

    modalElement.querySelector('#entry-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleSaveEntry();
    });
}

/**
 * Modal do Fluxo de Caixa
 */
function openCashFlowModal() {
    const modal = document.getElementById('genericModal');
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
    const todayStr = today.toISOString().split('T')[0];

    modal.innerHTML = `
        <div class="modal-content max-w-4xl">
             <div class="flex justify-between items-center mb-4">
                 <h2 class="text-2xl font-bold text-gray-800">Fluxo de Caixa (Realizado)</h2>
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
                 <button data-action="generate-cashflow" class="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Gerar Gráfico</button>
             </div>
             <div id="cash-flow-chart-container" class="relative h-96">
                 <canvas id="cashFlowChartCanvas"></canvas>
             </div>
        </div>
    `;
    modal.style.display = 'flex';

    renderCashFlowChart(); // Gera o gráfico inicial
}


// --- 5. HANDLERS (Lógica de Ações) ---

/**
 * Busca o resumo do dia
 */
async function renderTodaySummary() {
    try {
        const summary = await getTodaySummary();
        const payablesEl = document.getElementById('summary-payables');
        const receivablesEl = document.getElementById('summary-receivables');

        const payablesToday = summary.totalPayables || summary.payablesToday || 0;
        const receivablesToday = summary.totalReceivables || summary.receivablesToday || 0;

        if (payablesEl) payablesEl.textContent = `R$ ${payablesToday.toFixed(2)}`;
        if (receivablesEl) receivablesEl.textContent = `R$ ${receivablesToday.toFixed(2)}`;
        
    } catch (error) {
        console.error("Erro ao buscar resumo do dia:", error);
        const summaryContainer = document.getElementById('today-summary-container');
        if (summaryContainer) summaryContainer.innerHTML = '<p class="text-red-500 text-center col-span-2">Não foi possível carregar o resumo do dia.</p>';
    }
}

/**
 * Renderiza o gráfico de fluxo de caixa
 */
async function renderCashFlowChart() {
    const canvas = document.getElementById('cashFlowChartCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = "16px Arial";
    ctx.fillStyle = "#888";
    ctx.textAlign = "center";
    ctx.fillText("Gerando gráfico...", ctx.canvas.width / 2, ctx.canvas.height / 2);

    try {
        const startDate = document.getElementById('cashFlowStartDate').value;
        const endDate = document.getElementById('cashFlowEndDate').value;

        const data = await getCashFlowData(startDate, endDate);

        if (cashFlowChart) {
            cashFlowChart.destroy();
        }
        
        const labels = data.labels || (data.expectedBalance ? data.expectedBalance.map(d => d.date) : []);
        const receivablesData = data.receivablesData || (data.receivables || []);
        const payablesData = (data.payablesData || (data.payables || [])).map(p => p * -1); 
        const balanceData = data.balanceData || (data.expectedBalance || []);

        cashFlowChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Recebimentos (Realizado)',
                        data: receivablesData,
                        backgroundColor: 'rgba(74, 222, 128, 0.6)',
                        yAxisID: 'y',
                    },
                    {
                        label: 'Pagamentos (Realizado)',
                        data: payablesData,
                        backgroundColor: 'rgba(248, 113, 113, 0.6)',
                        yAxisID: 'y',
                    },
                    {
                        label: 'Saldo Acumulado',
                        data: balanceData,
                        type: 'line',
                        borderColor: 'rgba(59, 130, 246, 1)',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 3,
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
                }
            }
        });

    } catch (error) {
        showNotification('Erro no Gráfico', `Não foi possível carregar dados do fluxo de caixa: ${error.message}`, 'error');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "#ef4444";
        ctx.fillText("Erro ao carregar gráfico.", ctx.canvas.width / 2, ctx.canvas.height / 2);
    }
}


/**
 * Busca os dados da LISTA DE LANÇAMENTOS (Lógica Original)
 */
async function fetchEntriesList() {
    const listContainer = document.getElementById('financial-list');
    if (!listContainer) return;
    listContainer.innerHTML = '<div class="loader mx-auto"></div>';

    try {
        const filters = {
            startDate: document.getElementById('filter-start-date').value,
            endDate: document.getElementById('filter-end-date').value,
            natureId: document.getElementById('filter-natureId').value,
            costCenterId: document.getElementById('filter-costCenterId').value,
        };
        
        localState.filters = filters;
        
        const cleanFilters = { 
            startDate: filters.startDate,
            endDate: filters.endDate
        };
        if (filters.natureId && filters.natureId !== 'all') cleanFilters.natureId = filters.natureId;
        if (filters.costCenterId && filters.costCenterId !== 'all') cleanFilters.costCenterId = filters.costCenterId;

        const payablesPromise = getPayables(cleanFilters);
        const receivablesPromise = getReceivables(cleanFilters);
        
        const naturesPromise = localState.natures.length > 0 ? Promise.resolve(localState.natures) : getNatures();
        const costCentersPromise = localState.costCenters.length > 0 ? Promise.resolve(localState.costCenters) : getCostCenters();

        const [payablesResponse, receivablesResponse, natures, costCenters] = await Promise.all([
            payablesPromise, 
            receivablesPromise,
            naturesPromise,
            costCentersPromise
        ]);

        localState.payables = payablesResponse.entries || [];
        localState.receivables = receivablesResponse.entries || [];
        localState.natures = natures || [];
        localState.costCenters = costCenters || [];

        document.getElementById('filter-natureId').innerHTML = buildHierarchyOptions(localState.natures, localState.filters.natureId);
        document.getElementById('filter-costCenterId').innerHTML = buildHierarchyOptions(localState.costCenters, localState.filters.costCenterId);

        renderListKPIs(); 
        renderList();     

    } catch (error) {
        showNotification('Erro', `Não foi possível carregar os lançamentos: ${error.message}`, 'error');
        listContainer.innerHTML = `<p class="text-red-500 p-4">${error.message}</p>`;
    }
}

/**
 * Salva (Cria ou Atualiza) um lançamento (Lógica Original + Nova UI)
 */
async function handleSaveEntry() {
    const entryId = document.getElementById('entry-id').value;
    const isEdit = entryId !== '';
    
    const statusChecked = document.getElementById('entry-status').checked;
    const paymentDateValue = document.getElementById('entry-paymentDate').value;

    const payload = {
        description: document.getElementById('entry-description').value,
        amount: parseFloat(document.getElementById('entry-amount').value),
        dueDate: document.getElementById('entry-due-date').value,
        naturezaId: document.getElementById('entry-natureId').value === 'all' ? null : document.getElementById('entry-natureId').value,
        centroDeCustoId: document.getElementById('entry-costCenterId').value === 'all' ? null : document.getElementById('entry-costCenterId').value,
        notes: document.getElementById('entry-notes').value,
        status: statusChecked ? 'paid' : 'pending',
        paymentDate: statusChecked ? paymentDateValue : null,
    };
    
    const entryType = document.getElementById('entry-type').value; // 'receber' ou 'pagar'

    if (!payload.description || isNaN(payload.amount) || !payload.dueDate) {
        showNotification('Erro', 'Descrição, Valor e Data de Vencimento são obrigatórios.', 'error');
        return;
    }
    if (payload.status === 'paid' && !payload.paymentDate) {
         showNotification('Erro', 'Data de Pagamento é obrigatória se o lançamento está pago.', 'error');
        return;
    }

    if (!isEdit) {
        const isInstallment = document.getElementById('entry-is-installment').checked;
        const isRecurring = document.getElementById('entry-is-recurring').checked; 

        if (isInstallment) {
            const installments = parseInt(document.getElementById('entry-installments').value, 10);
            if (!installments || installments <= 1) {
                showNotification('Erro', 'O número de parcelas deve ser maior que 1.', 'error');
                return;
            }
            payload.installments = installments; 
            payload.frequency = document.getElementById('entry-frequency').value;
            payload.isRecurring = false; 
        } else if (isRecurring) { 
            payload.isRecurring = true;
            payload.recurringFrequency = 'monthly'; 
            payload.installments = 1; 
        } else {
             payload.installments = 1;
             payload.isRecurring = false;
        }
    }

    try {
        if (isEdit) {
            if (entryType === 'receber') {
                await updateReceivable(entryId, payload);
            } else {
                await updatePayable(entryId, payload);
            }
            showNotification('Sucesso', 'Lançamento atualizado!', 'success');
        } else {
            if (entryType === 'receber') {
                await createReceivable(payload);
            } else {
                await createPayable(payload);
            }
            showNotification('Sucesso', 'Lançamento salvo!', 'success');
        }
        
        document.getElementById('genericModal').style.display = 'none';
        await fetchEntriesList(); 
        await renderTodaySummary(); 

    } catch (error) {
        showNotification('Erro', `Não foi possível salvar: ${error.message}`, 'error');
    }
}

/**
 * Marca um lançamento como Pago/Recebido
 */
async function handleMarkAsPaid(entryId) {
    const entry = [...localState.payables, ...localState.receivables].find(e => e.id === entryId);
    if (!entry) return;

    const isReceber = entry.type === 'receber' || localState.activeTab === 'receber';
    const actionText = isReceber ? 'recebido' : 'pago';
    
    const confirmed = await showConfirmation(
        `Confirmar Baixa`,
        `Tem certeza que deseja marcar este item como ${actionText}?`
    );

    if (!confirmed) return;
    
    const paymentDate = new Date().toISOString().split('T')[0]; 

    try {
        if (isReceber) {
            await markAsPaidReceivable(entryId, paymentDate);
        } else {
            await markAsPaidPayable(entryId, paymentDate);
        }
        
        showNotification('Sucesso', `Lançamento baixado com sucesso!`, 'success');
        await fetchEntriesList(); 
        await renderTodaySummary(); 

    } catch (error) {
        showNotification('Erro', `Não foi possível baixar o lançamento: ${error.message}`, 'error');
    }
}

/**
 * (MODIFICADO) Exclui um lançamento (com lógica de recorrência)
 */
async function handleDeleteEntry(entryData) {
    if (!entryData) return;
    
    const { id: entryId, type, isRecurring, recurringGroupId } = entryData;
    const isReceber = type === 'receber';
    let confirmed = false;

    // Se for um item recorrente (fixo)
    if (isRecurring || recurringGroupId) {
        confirmed = await showConfirmation(
            'Excluir Lançamento Fixo',
            'Tem certeza? Excluir este item irá PARAR todas as recorrências futuras associadas a ele.',
            { confirmText: 'Sim, parar recorrência', cancelText: 'Cancelar' }
        );
    } else {
        // Lançamento normal ou parcela
         confirmed = await showConfirmation(
            'Excluir Lançamento',
            'Tem certeza que deseja excluir este lançamento?',
            { confirmText: 'Sim, excluir', cancelText: 'Cancelar' }
        );
    }

    if (!confirmed) return;

    try {
        // A API de exclusão agora lida com a lógica de parar a recorrência
        if (isReceber) {
            await deleteReceivable(entryId);
        } else {
            await deletePayable(entryId);
        }
        
        showNotification('Sucesso', 'Lançamento(s) excluído(s)!', 'success');
        await fetchEntriesList(); 
        await renderTodaySummary(); 

    } catch (error) {
        showNotification('Erro', `Não foi possível excluir: ${error.message}`, 'error');
    }
}

/**
 * Alterna as abas (Receber / Pagar)
 */
function handleTabClick(tab) {
    if (localState.activeTab === tab) return;
    localState.activeTab = tab;

    document.querySelectorAll('.tab-btn').forEach(btn => {
        const isReceber = btn.dataset.tab === 'receber';
        const isActive = btn.dataset.tab === localState.activeTab;

        btn.classList.toggle('border-blue-600', isActive && isReceber);
        btn.classList.toggle('text-blue-600', isActive && isReceber);
        btn.classList.toggle('border-red-600', isActive && !isReceber);
        btn.classList.toggle('text-red-600', isActive && !isReceber);
        
        btn.classList.toggle('text-gray-500', !isActive);
        btn.classList.toggle('hover:text-gray-700', !isActive);
        btn.classList.toggle('border-transparent', !isActive);
    });

    renderList(); 
}

/**
 * Filtra o Status (Client-side)
 */
function handleStatusFilterClick(status) {
    if (localState.currentStatusFilter === status) return;
    localState.currentStatusFilter = status;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        const isActive = btn.dataset.statusFilter === status;
        btn.classList.toggle('bg-blue-600', isActive);
        btn.classList.toggle('text-white', isActive);
        btn.classList.toggle('bg-gray-100', !isActive);
        btn.classList.toggle('text-gray-700', !isActive);
    });
    
    renderListKPIs(); 
    renderList();     
}


// --- 6. INICIALIZAÇÃO ---

export async function loadFinancialPage() {
    contentDiv = document.getElementById('content');
    renderPageLayout();

    if (pageEventListener) {
        contentDiv.removeEventListener('click', pageEventListener);
    }
    
    if (cashFlowChart) {
        cashFlowChart.destroy();
        cashFlowChart = null;
    }

    // Listener de eventos principal da página
    pageEventListener = async (e) => {
        const target = e.target.closest('[data-action], [data-tab], [data-status-filter]');

        if (!target) return;

        const action = target.dataset.action;
        const tab = target.dataset.tab;
        const statusFilter = target.dataset.statusFilter;
        
        if (tab) {
            handleTabClick(tab);
        }
        if (statusFilter) {
            handleStatusFilterClick(statusFilter);
        }

        switch (action) {
            case 'filter-entries': 
                await fetchEntriesList();
                break;
            case 'generate-cashflow': 
                await renderCashFlowChart();
                break;
             case 'open-cash-flow-modal': 
                openCashFlowModal();
                break;
            case 'add-entry':
                openEntryModal();
                break;
            case 'edit': {
                const itemDataString = target.dataset.item;
                const entry = JSON.parse(itemDataString.replace(/&apos;/g, "'"));
                if (entry) openEntryModal(entry);
                break;
            }
            case 'delete': {
                const itemDataString = target.dataset.item;
                const entry = JSON.parse(itemDataString.replace(/&apos;/g, "'"));
                await handleDeleteEntry(entry);
                break;
            }
            case 'mark-paid': {
                const entryId = target.dataset.id;
                await handleMarkAsPaid(entryId);
                break;
            }
            case 'close-modal': {
                const modalId = target.dataset.target || 'genericModal';
                document.getElementById(modalId).style.display = 'none';
                break;
            }
        }
    };

    contentDiv.addEventListener('click', pageEventListener);

    // --- CARREGAMENTO INICIAL ---
    handleTabClick(localState.activeTab); // Define a aba
    handleStatusFilterClick(localState.currentStatusFilter); // Define o filtro de status
    
    await Promise.all([
        renderTodaySummary(),
        fetchEntriesList() 
    ]);
}