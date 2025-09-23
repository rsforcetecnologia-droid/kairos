import * as financialApi from '../api/financial.js';
import { state } from '../state.js';
import { showNotification } from '../components/modal.js';

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

function renderFinancialPageContent() {
    const payablesList = document.getElementById('payables-list');
    const receivablesList = document.getElementById('receivables-list');

    if (!payablesList || !receivablesList) return;

    payablesList.innerHTML = localState.payables.map(item => `
        <div class="bg-white p-3 rounded-lg shadow-sm border-l-4 border-red-400 flex justify-between items-center">
            <div>
                <p class="font-bold">${item.description}</p>
                <p class="text-sm text-gray-500">${new Date(item.dueDate.seconds * 1000).toLocaleDateString('pt-BR')}</p>
            </div>
            <p class="font-bold text-lg text-red-600">R$ ${item.amount.toFixed(2)}</p>
        </div>
    `).join('') || '<p class="text-center text-gray-500">Nenhuma conta a pagar.</p>';

    receivablesList.innerHTML = localState.receivables.map(item => `
        <div class="bg-white p-3 rounded-lg shadow-sm border-l-4 border-green-400 flex justify-between items-center">
            <div>
                <p class="font-bold">${item.description}</p>
                <p class="text-sm text-gray-500">${new Date(item.dueDate.seconds * 1000).toLocaleDateString('pt-BR')}</p>
            </div>
            <p class="font-bold text-lg text-green-600">R$ ${item.amount.toFixed(2)}</p>
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

    await fetchAndDisplayFinancialData();
}