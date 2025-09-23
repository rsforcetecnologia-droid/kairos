import * as financialApi from '../api/financial.js';
import { state } from '../state.js';
import { showNotification, showConfirmation } from '../components/modal.js';

const contentDiv = document.getElementById('content');

let localState = {
    payables: [],
    receivables: [],
};

async function fetchAndDisplayFinancialData() {
    try {
        const [payables, receivables] = await Promise.all([
            financialApi.getPayables(),
            financialApi.getReceivables(),
        ]);
        localState.payables = payables;
        localState.receivables = receivables;
        renderFinancialPageContent();
    } catch (error) {
        showNotification('Erro', `Não foi possível carregar os dados financeiros: ${error.message}`, 'error');
        contentDiv.querySelector('#financial-content').innerHTML = `<p class="text-red-500 text-center mt-8">Erro ao carregar dados.</p>`;
    }
}

// Esta função agora recebe uma string ISO e a formata
function formatReadableDate(dateString) {
    if (!dateString) {
        return 'Data Inválida';
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return 'Data Inválida';
    }
    
    // CORREÇÃO: Pega a data local e formata sem considerar o fuso horário
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
}

function renderFinancialPageContent() {
    const payablesList = document.getElementById('payables-list');
    const receivablesList = document.getElementById('receivables-list');

    if (!payablesList || !receivablesList) return;

    // Renderiza a lista de contas a pagar
    payablesList.innerHTML = localState.payables.map(item => `
        <div class="bg-white p-3 rounded-lg shadow-sm border-l-4 border-red-400 flex justify-between items-center">
            <div>
                <p class="font-bold">${item.description}</p>
                <p class="text-sm text-gray-500">${formatReadableDate(item.dueDate)}</p>
            </div>
            <div class="flex items-center gap-4">
                <p class="font-bold text-lg text-red-600">R$ ${item.amount.toFixed(2)}</p>
                <button data-action="delete-payable" data-id="${item.id}" class="text-gray-400 hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
            </div>
        </div>
    `).join('') || '<p class="text-center text-gray-500">Nenhuma conta a pagar.</p>';

    // Renderiza a lista de contas a receber
    receivablesList.innerHTML = localState.receivables.map(item => `
        <div class="bg-white p-3 rounded-lg shadow-sm border-l-4 border-green-400 flex justify-between items-center">
            <div>
                <p class="font-bold">${item.description}</p>
                <p class="text-sm text-gray-500">${formatReadableDate(item.dueDate)}</p>
            </div>
            <div class="flex items-center gap-4">
                <p class="font-bold text-lg text-green-600">R$ ${item.amount.toFixed(2)}</p>
                <button data-action="delete-receivable" data-id="${item.id}" class="text-gray-400 hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
            </div>
        </div>
    `).join('') || '<p class="text-center text-gray-500">Nenhuma conta a receber.</p>';
}

async function handleFormSubmit(e) {
    e.preventDefault();
    const formId = e.target.id;
    const description = e.target.querySelector('[name="description"]').value;
    const amount = e.target.querySelector('[name="amount"]').value;
    const dueDate = e.target.querySelector('[name="dueDate"]').value;

    const data = {
        description,
        amount,
        dueDate,
    };

    try {
        if (formId === 'payable-form') {
            await financialApi.createPayable(data);
            showNotification('Sucesso', 'Conta a pagar adicionada!', 'success');
        } else {
            await financialApi.createReceivable(data);
            showNotification('Sucesso', 'Conta a receber adicionada!', 'success');
        }
        e.target.reset();
        await fetchAndDisplayFinancialData();
    } catch (error) {
        showNotification('Erro', `Não foi possível salvar: ${error.message}`, 'error');
    }
}

async function handleDelete(type, id) {
    const confirmed = await showConfirmation('Confirmar Exclusão', 'Tem certeza que deseja excluir este lançamento? Esta ação não pode ser desfeita.');
    if (confirmed) {
        try {
            if (type === 'payable') {
                await financialApi.deletePayable(id);
                showNotification('Sucesso', 'Lançamento excluído!', 'success');
            } else {
                await financialApi.deleteReceivable(id);
                showNotification('Sucesso', 'Lançamento excluído!', 'success');
            }
            await fetchAndDisplayFinancialData();
        } catch (error) {
            showNotification('Erro', `Não foi possível excluir o lançamento: ${error.message}`, 'error');
        }
    }
}

export async function loadFinancialPage() {
    contentDiv.innerHTML = `
        <section>
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-3xl font-bold text-gray-800">Módulo Financeiro</h2>
            </div>
            <div id="financial-content">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-xl font-semibold text-red-700 mb-4 border-b pb-2">Contas a Pagar</h3>
                        <form id="payable-form" class="space-y-4 mb-6">
                            <input type="text" name="description" placeholder="Descrição" required class="w-full p-2 border rounded-md">
                            <div class="flex gap-2">
                                <input type="number" step="0.01" name="amount" placeholder="Valor (R$)" required class="w-1/2 p-2 border rounded-md">
                                <input type="date" name="dueDate" required class="w-1/2 p-2 border rounded-md">
                            </div>
                            <button type="submit" class="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700">Adicionar Conta a Pagar</button>
                        </form>
                        <div id="payables-list" class="space-y-2 max-h-64 overflow-y-auto">
                            <p class="text-center text-gray-500">A carregar...</p>
                        </div>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-xl font-semibold text-green-700 mb-4 border-b pb-2">Contas a Receber</h3>
                        <form id="receivable-form" class="space-y-4 mb-6">
                            <input type="text" name="description" placeholder="Descrição" required class="w-full p-2 border rounded-md">
                            <div class="flex gap-2">
                                <input type="number" step="0.01" name="amount" placeholder="Valor (R$)" required class="w-1/2 p-2 border rounded-md">
                                <input type="date" name="dueDate" required class="w-1/2 p-2 border rounded-md">
                            </div>
                            <button type="submit" class="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">Adicionar Conta a Receber</button>
                        </form>
                        <div id="receivables-list" class="space-y-2 max-h-64 overflow-y-auto">
                            <p class="text-center text-gray-500">A carregar...</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;

    contentDiv.querySelector('#payable-form').addEventListener('submit', handleFormSubmit);
    contentDiv.querySelector('#receivable-form').addEventListener('submit', handleFormSubmit);

    contentDiv.addEventListener('click', (e) => {
        const target = e.target.closest('button[data-action]');
        if (target) {
            const action = target.dataset.action;
            const id = target.dataset.id;
            if (action === 'delete-payable') {
                handleDelete('payable', id);
            } else if (action === 'delete-receivable') {
                handleDelete('receivable', id);
            }
        }
    });

    await fetchAndDisplayFinancialData();
}
