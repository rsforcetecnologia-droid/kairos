// js/ui/salesReport.js (Versão Mobile Adaptativa)

// --- 1. IMPORTAÇÕES ---
import * as reportsApi from '../api/reports.js';
import * as cashierApi from '../api/cashier.js';
import { state } from '../state.js';
import { showNotification } from '../components/modal.js';

// --- 2. CONSTANTES E VARIÁVEIS DO MÓDULO ---
const contentDiv = document.getElementById('content');
let activeCharts = {};
let currentReportData = null; // Cache para os dados do relatório

// --- 3. FUNÇÕES DE LIMPEZA E UTILIDADES ---
function destroyAllCharts() {
    Object.values(activeCharts).forEach(chart => chart?.destroy());
    activeCharts = {};
}

function exportReportToPDF(title, tableId) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape', unit: 'px', format: 'a4' });
    const summaryElement = document.getElementById('salesReportSummaryCards');

    doc.setFontSize(18);
    doc.text(title, doc.internal.pageSize.getWidth() / 2, 40, { align: 'center' });
    
    if (summaryElement) {
        const summaryData = [
            ['Receita Total', summaryElement.querySelector('#summary-revenue').textContent],
            ['Vendas Totais', summaryElement.querySelector('#summary-transactions').textContent],
            ['Ticket Médio', summaryElement.querySelector('#summary-avg-ticket').textContent],
        ];
        
        doc.autoTable({
            startY: 60,
            head: [['Métrica', 'Valor']],
            body: summaryData,
            theme: 'striped',
            headStyles: { fillColor: [79, 70, 229] }
        });
    }
    
    const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 20 : 60;
    doc.text('Detalhes das Vendas', 20, finalY);
    
    // Nota: O PDF continua usando a tabela como referência, o que é correto para impressão
    doc.autoTable({
        html: `#${tableId}`,
        startY: finalY + 10,
        theme: 'grid',
        headStyles: { fillColor: [22, 163, 74] }
    });

    doc.save(`${title.replace(/[\s/]/g, '_').toLowerCase()}.pdf`);
}

// Função para abrir o modal de detalhes da venda
function openSaleDetailModal(transaction) {
    const modal = document.getElementById('genericModal');
    const paymentMethodsHTML = (transaction.payments || []).map(p => `
        <div class="flex justify-between text-sm">
            <span>${p.method.charAt(0).toUpperCase() + p.method.slice(1)}</span>
            <span class="font-medium">R$ ${p.value.toFixed(2)}</span>
        </div>
    `).join('');

    modal.innerHTML = `
        <div class="modal-content max-w-md w-full m-4">
            <div class="flex justify-between items-start">
                <div>
                    <h2 class="text-xl md:text-2xl font-bold text-gray-800">Detalhes da Venda</h2>
                    <p class="text-sm text-gray-500">${new Date(transaction.date).toLocaleString('pt-BR')}</p>
                </div>
                <button type="button" data-action="close-modal" data-target="genericModal" class="text-3xl font-bold p-2">&times;</button>
            </div>
            <div class="mt-6 space-y-4">
                <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-sm font-medium text-gray-600">Cliente</p>
                    <p class="font-semibold text-gray-800">${transaction.client}</p>
                </div>
                 <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-sm font-medium text-gray-600">Itens</p>
                    <p class="font-semibold text-gray-800">${transaction.items}</p>
                </div>
                <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-sm font-medium text-gray-600">Responsável pelo Caixa</p>
                    <p class="font-semibold text-gray-800">${transaction.responsavelCaixa || 'N/A'}</p>
                </div>
                 <div class="border-t pt-4 mt-4">
                     <h3 class="font-semibold mb-2">Pagamento</h3>
                     <div class="space-y-1">
                        ${paymentMethodsHTML}
                     </div>
                     <div class="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                         <span>TOTAL</span>
                         <span>R$ ${transaction.total.toFixed(2)}</span>
                     </div>
                </div>
            </div>
        </div>
    `;
    modal.style.display = 'flex';
}

// --- 4. FUNÇÕES DE RENDERIZAÇÃO E LÓGICA ---

function renderReportData(data) {
    const { summary, transactions } = data;
    
    // 1. Atualiza Cards de Resumo (Topo)
    document.getElementById('summary-revenue').textContent = `R$ ${summary.totalRevenue.toFixed(2)}`;
    document.getElementById('summary-transactions').textContent = summary.totalTransactions;
    document.getElementById('summary-avg-ticket').textContent = `R$ ${summary.averageTicket.toFixed(2)}`;
    
    // 2. Atualiza Resumo de Pagamentos
    const paymentSummaryBody = document.getElementById('paymentSummaryTableBody');
    const sortedPayments = Object.entries(summary.paymentMethodTotals).sort(([, totalA], [, totalB]) => totalB - totalA);

    paymentSummaryBody.innerHTML = sortedPayments.map(([method, total]) => `
        <tr class="border-b">
            <td class="py-2 px-4 font-medium">${method.charAt(0).toUpperCase() + method.slice(1)}</td>
            <td class="py-2 px-4 text-right font-semibold">R$ ${total.toFixed(2)}</td>
        </tr>
    `).join('');
    
    // 3. Renderiza a TABELA (Visão Desktop)
    const transactionsTableBody = document.getElementById('transactionsTableBody');
    const mobileList = document.getElementById('mobileTransactionsList');
    
    if (transactions.length === 0) {
        const emptyMsg = `<tr><td colspan="5" class="text-center py-8 text-gray-500">Nenhuma venda encontrada para o período selecionado.</td></tr>`;
        transactionsTableBody.innerHTML = emptyMsg;
        mobileList.innerHTML = `<div class="text-center py-8 text-gray-500">Nenhuma venda encontrada.</div>`;
        return;
    }

    // A) Preenche a Tabela (Desktop)
    transactionsTableBody.innerHTML = transactions.map((t, index) => `
        <tr class="border-b hover:bg-gray-50 cursor-pointer" data-transaction-index="${index}">
            <td class="w-24 py-3 px-4">${new Date(t.date).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</td>
            <td class="w-40 py-3 px-4 truncate max-w-[150px]">${t.client}</td>
            <td class="w-auto py-3 px-4 truncate max-w-[200px]">${t.items}</td>
            <td class="w-16 py-3 px-4 text-center text-xs">${t.type}</td>
            <td class="w-24 py-3 px-4 text-right font-medium">R$ ${t.total.toFixed(2)}</td>
        </tr>
    `).join('');

    // Listener Duplo Clique (Desktop)
    transactionsTableBody.querySelectorAll('tr').forEach(row => {
        row.addEventListener('dblclick', () => {
            const transactionIndex = row.dataset.transactionIndex;
            const selectedTransaction = currentReportData.transactions[transactionIndex];
            if (selectedTransaction) openSaleDetailModal(selectedTransaction);
        });
    });

    // B) Preenche a Lista de Cards (Mobile) - NOVO
    mobileList.innerHTML = transactions.map((t, index) => `
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 active:bg-gray-50 cursor-pointer transition-colors" data-transaction-index="${index}">
            <div class="flex justify-between items-start mb-2">
                <div class="flex flex-col">
                    <span class="text-xs text-gray-500 font-medium">${new Date(t.date).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</span>
                    <span class="font-bold text-gray-800 text-lg">${t.client}</span>
                </div>
                <div class="text-right">
                    <span class="block font-bold text-green-600 text-lg">R$ ${t.total.toFixed(2)}</span>
                    <span class="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 border border-gray-200">${t.type}</span>
                </div>
            </div>
            <div class="mt-2 pt-2 border-t border-dashed border-gray-200">
                <p class="text-sm text-gray-600 line-clamp-2">${t.items}</p>
            </div>
            <p class="text-xs text-blue-500 mt-2 text-center font-medium">Toque para ver detalhes</p>
        </div>
    `).join('');

    // Listener de Clique Simples (Mobile)
    mobileList.querySelectorAll('div[data-transaction-index]').forEach(card => {
        card.addEventListener('click', () => {
            const transactionIndex = card.dataset.transactionIndex;
            const selectedTransaction = currentReportData.transactions[transactionIndex];
            if (selectedTransaction) openSaleDetailModal(selectedTransaction);
        });
    });
}

async function handleGenerateReport() {
    const mainReportsView = document.getElementById('main-reports-view');
    const startDateInput = document.getElementById('reportStartDate');
    const endDateInput = document.getElementById('reportEndDate');

    if (!mainReportsView || !startDateInput || !endDateInput) return;

    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    if (!startDate || !endDate) {
        return showNotification('Atenção', 'Por favor, selecione as datas de início e fim.', 'error');
    }

    mainReportsView.innerHTML = `<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>`;

    try {
        const cashierSessionId = document.getElementById('cashierSessionFilter').value;
        const data = await reportsApi.getSalesReport({ establishmentId: state.establishmentId, startDate, endDate, cashierSessionId });
        currentReportData = data;

        // Renderiza a estrutura do relatório
        mainReportsView.innerHTML = `
            <div id="salesReportSummaryCards" class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
                <div class="bg-white p-3 md:p-4 rounded-lg shadow text-center border-b-4 border-green-500">
                    <h4 class="text-xs md:text-sm font-semibold text-gray-500 uppercase">Receita Total</h4>
                    <p id="summary-revenue" class="text-xl md:text-3xl font-bold text-green-600">R$ 0,00</p>
                </div>
                <div class="bg-white p-3 md:p-4 rounded-lg shadow text-center border-b-4 border-blue-500">
                    <h4 class="text-xs md:text-sm font-semibold text-gray-500 uppercase">Vendas</h4>
                    <p id="summary-transactions" class="text-xl md:text-3xl font-bold text-blue-600">0</p>
                </div>
                <div class="bg-white p-3 md:p-4 rounded-lg shadow text-center border-b-4 border-indigo-500">
                    <h4 class="text-xs md:text-sm font-semibold text-gray-500 uppercase">Ticket Médio</h4>
                    <p id="summary-avg-ticket" class="text-xl md:text-3xl font-bold text-indigo-600">R$ 0,00</p>
                </div>
                <div class="bg-white p-3 md:p-4 rounded-lg shadow col-span-2 lg:col-span-1">
                    <h4 class="text-xs md:text-sm font-semibold text-gray-700 text-center mb-2 uppercase">Por Pagamento</h4>
                    <table class="w-full text-xs md:text-sm"><tbody id="paymentSummaryTableBody"></tbody></table>
                </div>
            </div>

            <div class="bg-white md:p-6 rounded-lg md:shadow mt-4">
                <div class="p-4 md:p-0 mb-4 border-b md:border-none">
                    <h3 class="text-lg md:text-xl font-semibold">Detalhes das Transações</h3>
                    <p class="text-xs text-gray-500 hidden md:block">Dê um duplo clique numa linha para ver mais detalhes.</p>
                    <p class="text-xs text-gray-500 md:hidden">Toque num card para ver detalhes.</p>
                </div>

                <div class="hidden md:block overflow-x-auto rounded-lg border border-gray-100">
                    <table id="transactionsTable" class="min-w-full text-sm table-fixed">
                        <thead class="bg-gray-100 sticky top-0"><tr>
                            <th class="w-24 px-4 py-2 text-left font-semibold text-gray-600">Data/Hora</th>
                            <th class="w-40 px-4 py-2 text-left font-semibold text-gray-600">Cliente</th>
                            <th class="w-auto px-4 py-2 text-left font-semibold text-gray-600">Itens</th>
                            <th class="w-16 px-4 py-2 text-center font-semibold text-gray-600">Tipo</th>
                            <th class="w-24 px-4 py-2 text-right font-semibold text-gray-600">Total</th>
                        </tr></thead>
                        <tbody id="transactionsTableBody" class="divide-y divide-gray-100"></tbody>
                    </table>
                </div>

                <div id="mobileTransactionsList" class="md:hidden space-y-3 px-2 pb-4">
                    </div>
            </div>
        `;
        renderReportData(data);
    } catch(error) {
        showNotification('Erro', `Não foi possível carregar o relatório: ${error.message}`, 'error');
        mainReportsView.innerHTML = `<p class="p-8 text-center text-red-500">${error.message}</p>`;
    }
}

// --- 5. FUNÇÃO PRINCIPAL EXPORTADA ---
export async function loadSalesReportPage() {
    destroyAllCharts();
    
    const today = new Date().toISOString().split('T')[0];
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];

    contentDiv.innerHTML = `
        <section class="pb-20 md:pb-0"> <div class="flex flex-col gap-4 mb-6">
                <h2 class="text-2xl md:text-3xl font-bold text-gray-800 px-2 md:px-0">Relatório de Vendas</h2>
                
                <div class="w-full bg-white p-4 rounded-lg shadow-md space-y-4">
                    <div class="grid grid-cols-2 gap-3 md:flex md:items-center md:gap-4">
                        <div class="flex-1">
                            <label for="reportStartDate" class="block text-xs font-medium text-gray-500 mb-1">De:</label>
                            <input type="date" id="reportStartDate" value="${thirtyDaysAgoStr}" class="w-full p-2 border rounded-md text-sm">
                        </div>
                        <div class="flex-1">
                            <label for="reportEndDate" class="block text-xs font-medium text-gray-500 mb-1">Até:</label>
                            <input type="date" id="reportEndDate" value="${today}" class="w-full p-2 border rounded-md text-sm">
                        </div>
                    </div>
                    
                    <div class="flex flex-col md:flex-row gap-3">
                         <div class="flex-grow">
                            <select id="cashierSessionFilter" class="w-full p-2 border rounded-md bg-white text-sm">
                                <option value="all">Todos os Caixas</option>
                            </select>
                         </div>
                         <div class="flex gap-2">
                             <button id="generateReportBtn" class="flex-1 md:flex-none py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 text-sm md:text-base">
                                Filtrar
                             </button>
                             <button id="exportPdfBtn" class="flex-1 md:flex-none py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 text-sm md:text-base flex items-center justify-center gap-2">
                                <span class="hidden md:inline">Exportar</span> PDF
                             </button>
                         </div>
                    </div>
                </div>
            </div>
            
            <div id="main-reports-view">
            </div>
        </section>`;
    
    document.getElementById('generateReportBtn').addEventListener('click', handleGenerateReport);
    document.getElementById('exportPdfBtn').addEventListener('click', () => {
        const startDate = document.getElementById('reportStartDate').value;
        const endDate = document.getElementById('reportEndDate').value;
        const title = `Relatorio_Vendas_${startDate}_a_${endDate}`;
        exportReportToPDF(title, 'transactionsTable');
    });

    try {
        const sessions = await cashierApi.getCashierHistory();
        const sessionFilter = document.getElementById('cashierSessionFilter');
        
        sessions.forEach(session => {
            const openTime = new Date(session.openTime).toLocaleString('pt-BR', { dateStyle: 'short' });
            const closedByName = session.closedByName || 'N/A';
            sessionFilter.innerHTML += `<option value="${session.id}">${closedByName} - ${openTime}</option>`;
        });
    } catch (error) {
        showNotification('Erro', 'Não foi possível carregar o histórico de caixas para o filtro.', 'error');
    }
    
    await handleGenerateReport();
}