// js/ui/stockReport.js

import * as productsApi from '../api/products.js';
import { state } from '../state.js';
import { showNotification } from '../components/modal.js';

const contentDiv = document.getElementById('content');

// Função para gerar o relatório com base nos filtros
async function generateStockReport() {
    const resultsContainer = document.getElementById('report-results');
    resultsContainer.innerHTML = '<div class="loader mx-auto"></div>';

    const filters = {
        startDate: document.getElementById('reportStartDate').value,
        endDate: document.getElementById('reportEndDate').value,
        productId: document.getElementById('productFilter').value,
        categoryId: document.getElementById('categoryFilter').value,
    };

    try {
        const reportData = await productsApi.getStockReport(filters);

        if (reportData.length === 0) {
            resultsContainer.innerHTML = '<p class="text-center text-gray-500 py-8">Nenhuma movimentação de stock encontrada para os filtros selecionados.</p>';
            return;
        }

        resultsContainer.innerHTML = `
            <table class="min-w-full text-sm">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="px-4 py-2 text-left">Data</th>
                        <th class="px-4 py-2 text-left">Produto</th>
                        <th class="px-4 py-2 text-center">Alteração</th>
                        <th class="px-4 py-2 text-center">Stock Anterior</th>
                        <th class="px-4 py-2 text-center">Stock Novo</th>
                        <th class="px-4 py-2 text-left">Motivo</th>
                        <th class="px-4 py-2 text-left">Utilizador</th>
                    </tr>
                </thead>
                <tbody class="divide-y">
                    ${reportData.map(item => `
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-2">${new Date(item.date).toLocaleString('pt-BR')}</td>
                            <td class="px-4 py-2 font-semibold">${item.productName}</td>
                            <td class="px-4 py-2 text-center font-bold ${item.change > 0 ? 'text-green-600' : 'text-red-600'}">
                                ${item.change > 0 ? '+' : ''}${item.change}
                            </td>
                            <td class="px-4 py-2 text-center">${item.oldStock}</td>
                            <td class="px-4 py-2 text-center">${item.newStock}</td>
                            <td class="px-4 py-2 text-gray-600">${item.reason}</td>
                            <td class="px-4 py-2 text-gray-600">${item.user}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } catch (error) {
        showNotification('Erro', `Não foi possível gerar o relatório: ${error.message}`, 'error');
        resultsContainer.innerHTML = `<p class="text-center text-red-500 py-8">${error.message}</p>`;
    }
}

// Função principal que carrega a página
export async function loadStockReportPage() {
    const today = new Date().toISOString().split('T')[0];
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];

    contentDiv.innerHTML = `
        <section>
            <div class="flex flex-wrap gap-4 justify-between items-center mb-6">
                <h2 class="text-3xl font-bold text-gray-800">Relatório de Movimentação de Stock</h2>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-md mb-6">
                <div class="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    <div>
                        <label for="reportStartDate" class="block text-sm font-medium text-gray-700">De</label>
                        <input type="date" id="reportStartDate" value="${thirtyDaysAgoStr}" class="mt-1 w-full p-2 border rounded-md">
                    </div>
                    <div>
                        <label for="reportEndDate" class="block text-sm font-medium text-gray-700">Até</label>
                        <input type="date" id="reportEndDate" value="${today}" class="mt-1 w-full p-2 border rounded-md">
                    </div>
                    <div>
                        <label for="productFilter" class="block text-sm font-medium text-gray-700">Produto</label>
                        <select id="productFilter" class="mt-1 w-full p-2 border rounded-md bg-white">
                            <option value="all">Todos os Produtos</option>
                        </select>
                    </div>
                    <div>
                        <label for="categoryFilter" class="block text-sm font-medium text-gray-700">Categoria</label>
                        <select id="categoryFilter" class="mt-1 w-full p-2 border rounded-md bg-white">
                            <option value="all">Todas as Categorias</option>
                        </select>
                    </div>
                    <button id="generateReportBtn" class="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700">
                        Gerar Relatório
                    </button>
                </div>
            </div>
            <div id="report-results" class="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
                <p class="text-center text-gray-500 py-8">Selecione os filtros e clique em "Gerar Relatório".</p>
            </div>
        </section>
    `;

    // Preenche os filtros de produto e categoria
    const productFilter = document.getElementById('productFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    if (state.products && state.categories) {
        productFilter.innerHTML += state.products.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
        categoryFilter.innerHTML += state.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    }

    // Adiciona o listener ao botão
    document.getElementById('generateReportBtn').addEventListener('click', generateStockReport);
}