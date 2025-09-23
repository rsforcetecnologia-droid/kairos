import * as financialApi from '../api/financial.js';
import { state } from '../state.js';
import { showNotification, showConfirmation } from '../components/modal.js';

const contentDiv = document.getElementById('content');
let localState = { payables: [], receivables: [] };

// --- LÓGICA PRINCIPAL ---

async function fetchAndDisplayData() {
    const content = document.getElementById('financial-content');
    try {
        const [payables, receivables] = await Promise.all([
            financialApi.getPayables(),
            financialApi.getReceivables()
        ]);
        localState = { payables, receivables };
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

    // Validação robusta
    if (isNaN(amountValue)) {
        showNotification('Erro de Validação', 'O valor inserido é inválido.', 'error');
        return;
    }
    if (isChecked && !paymentDateValue) {
        showNotification('Erro de Validação', 'Por favor, forneça a data de pagamento para um lançamento pago.', 'error');
        return;
    }

    const status = isChecked ? 'paid' : 'pending';
    const paymentDate = isChecked ? paymentDateValue : null;

    const data = {
        description: form.querySelector('[name="description"]').value,
        amount: amountValue,
        dueDate: form.querySelector('[name="dueDate"]').value,
        category: form.querySelector('[name="category"]').value,
        notes: form.querySelector('[name="notes"]').value,
        status: status,
        paymentDate: paymentDate,
    };

    try {
        const isPayable = type === 'payable';
        if (itemId) { // Editando
            await (isPayable ? financialApi.updatePayable(itemId, data) : financialApi.updateReceivable(itemId, data));
            showNotification('Sucesso', 'Lançamento atualizado!', 'success');
        } else { // Criando
            await (isPayable ? financialApi.createPayable(data) : financialApi.createReceivable(data));
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


// --- FUNÇÕES DE RENDERIZAÇÃO ---

function renderLists() {
    const payablesList = document.getElementById('payables-list');
    const receivablesList = document.getElementById('receivables-list');
    if (!payablesList || !receivablesList) return;

    const renderItem = (item, type) => {
        const isPayable = type === 'payable';
        const isPaid = item.status === 'paid';
        const itemDataString = JSON.stringify(item).replace(/'/g, "&apos;");
        
        let amountColorClass = isPayable ? 'text-red-600' : 'text-green-600';
        if (isPaid) {
            amountColorClass = 'text-gray-500';
        }

        return `
        <div class="bg-white p-3 rounded-lg shadow-sm border-l-4 ${isPaid ? 'border-gray-300 opacity-70' : (isPayable ? 'border-red-400' : 'border-green-400')}">
            <div class="flex justify-between items-center">
                <div>
                    <p class="font-bold">${item.description}</p>
                    <p class="text-sm text-gray-500">Vence em: ${new Date(item.dueDate + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                    ${item.category ? `<span class="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">${item.category}</span>` : ''}
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
    const isPayable = type === 'payable';
    const isEditing = item !== null;
    const title = `${isEditing ? 'Editar' : 'Nova'} ${isPayable ? 'Despesa' : 'Receita'}`;
    const buttonClass = isPayable ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700';

    modal.innerHTML = `
        <div class="modal-content max-w-lg">
            <h2 class="text-2xl font-bold mb-6">${title}</h2>
            <form id="financial-form" class="space-y-4">
                <div><label>Descrição</label><input type="text" name="description" required class="w-full p-2 border rounded-md" value="${item?.description || ''}"></div>
                <div class="grid grid-cols-2 gap-4">
                    <div><label>Valor (R$)</label><input type="number" step="0.01" name="amount" required class="w-full p-2 border rounded-md" value="${item?.amount || ''}"></div>
                    <div><label>Data de Vencimento</label><input type="date" name="dueDate" required class="w-full p-2 border rounded-md" value="${item?.dueDate || ''}"></div>
                </div>
                <div><label>Categoria</label><input type="text" name="category" placeholder="Ex: Fornecedor, Salário" class="w-full p-2 border rounded-md" value="${item?.category || ''}"></div>
                <div><label>Observações</label><textarea name="notes" class="w-full p-2 border rounded-md">${item?.notes || ''}</textarea></div>
                <div class="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                    <label for="status" class="flex items-center cursor-pointer">
                        <div class="relative"><input type="checkbox" id="status" name="status" class="sr-only"><div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div></div>
                        <span class="ml-3 font-semibold text-gray-700">Marcar como ${isPayable ? 'Paga' : 'Recebida'}</span>
                    </label>
                    <div id="payment-date-container" class="hidden">
                        <label>Data Pgto.</label><input type="date" name="paymentDate" class="p-2 border rounded-md">
                    </div>
                </div>
                <div class="flex gap-4 pt-4"><button type="button" data-action="close-modal" data-target="genericModal" class="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg">Cancelar</button><button type="submit" class="w-full py-2 px-4 text-white font-semibold rounded-lg ${buttonClass}">Salvar</button></div>
            </form>
        </div>`;
    modal.style.display = 'flex';
    
    const statusToggle = modal.querySelector('#status');
    const paymentDateContainer = modal.querySelector('#payment-date-container');
    const paymentDateInput = modal.querySelector('[name="paymentDate"]');

    if (isEditing && item.status === 'paid') {
        statusToggle.checked = true;
        paymentDateContainer.classList.remove('hidden');
        paymentDateInput.value = item.paymentDate || new Date().toISOString().split('T')[0];
        paymentDateInput.required = true;
    } else {
        statusToggle.checked = false;
        paymentDateContainer.classList.add('hidden');
        paymentDateInput.value = new Date().toISOString().split('T')[0];
        paymentDateInput.required = false;
    }

    statusToggle.addEventListener('change', () => {
        const isChecked = statusToggle.checked;
        paymentDateContainer.classList.toggle('hidden', !isChecked);
        paymentDateInput.required = isChecked; // CORREÇÃO: Torna o campo obrigatório dinamicamente
    });

    modal.querySelector('#financial-form').addEventListener('submit', (e) => handleFormSubmit(e, type, item?.id));
}

// --- FUNÇÃO DE INICIALIZAÇÃO ---

export async function loadFinancialPage() {
    contentDiv.innerHTML = `
        <section>
            <div class="flex flex-wrap gap-4 justify-between items-center mb-6">
                <h2 class="text-3xl font-bold text-gray-800">Módulo Financeiro</h2>
                <div class="flex items-center gap-4">
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

    contentDiv.addEventListener('click', (e) => {
        const target = e.target.closest('button[data-action]');
        if (target) {
            const { action, type, id } = target.dataset;
            if (action === 'open-modal') {
                openFinancialModal(type);
            } else if (action === 'delete') {
                handleDelete(type, id);
            } else if (action === 'edit') {
                const item = JSON.parse(target.dataset.item.replace(/&apos;/g, "'"));
                openFinancialModal(type, item);
            } else if (action === 'mark-as-paid') {
                handleMarkAsPaid(type, id);
            }
        }
    });

    await fetchAndDisplayData();
}

