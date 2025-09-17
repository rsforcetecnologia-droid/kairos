// js/ui/salesReport.js (Completo e Corrigido)

// --- 1. IMPORTAÇÕES ---
import * as reportsApi from '../api/reports.js';
import * as cashierApi from '../api/cashier.js';
import { state } from '../state.js';
import { showNotification } from '../components/modal.js';
import { navigateTo } from '../main.js';

// --- 2. CONSTANTES E VARIÁVEIS DO MÓDULO ---
const contentDiv = document.getElementById('content');
let activeCharts = {};
let currentAnalyticsData = null; // Cache para os dados da visão principal

// --- 3. FUNÇÕES DE LIMPEZA E UTILIDADES ---
function destroyAllCharts() {
    Object.values(activeCharts).forEach(chart => chart?.destroy());
    activeCharts = {};
}

function exportReportToPDF(title, tableId) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape', unit: 'px', format: 'a4' });
    const tableElement = document.getElementById(tableId);
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
    
    doc.autoTable({
        html: `#${tableId}`,
        startY: finalY + 10,
        theme: 'grid',
        headStyles: { fillColor: [22, 163, 74] }
    });

    doc.save(`${title.replace(/[\s/]/g, '_').toLowerCase()}.pdf`);
}

// --- 4. FUNÇÕES DE RENDERIZAÇÃO E LÓGICA ---

function renderReportData(data) {
    const { summary, transactions } = data;
    document.getElementById('summary-revenue').textContent = `R$ ${summary.totalRevenue.toFixed(2)}`;
    document.getElementById('summary-transactions').textContent = summary.totalTransactions;
    document.getElementById('summary-avg-ticket').textContent = `R$ ${summary.averageTicket.toFixed(2)}`;
    
    const paymentSummaryBody = document.getElementById('paymentSummaryTableBody');
    paymentSummaryBody.innerHTML = Object.entries(summary.paymentMethodTotals).map(([method, total]) => `
        <tr class="border-b">
            <td class="py-2 px-4 font-medium">${method.charAt(0).toUpperCase() + method.slice(1)}</td>
            <td class="py-2 px-4 text-right font-semibold">R$ ${total.toFixed(2)}</td>
        </tr>
    `).join('');
    
    const transactionsTableBody = document.getElementById('transactionsTableBody');
    if (transactions.length === 0) {
        transactionsTableBody.innerHTML = `<tr><td colspan="5" class="text-center py-8 text-gray-500">Nenhuma venda encontrada para o período selecionado.</td></tr>`;
        return;
    }

    transactionsTableBody.innerHTML = transactions.map(t => `
        <tr class="border-b hover:bg-gray-50">
            <td class="py-3 px-4">${new Date(t.date).toLocaleString('pt-BR')}</td>
            <td class="py-3 px-4">${t.client}</td>
            <td class="py-3 px-4">${t.items}</td>
            <td class="py-3 px-4">${t.type}</td>
            <td class="py-3 px-4 text-right font-medium">R$ ${t.total.toFixed(2)}</td>
        </tr>
    `).join('');
}

async function handleGenerateReport() {
    const mainReportsView = document.getElementById('main-reports-view');
    const startDateInput = document.getElementById('reportStartDate');
    const endDateInput = document.getElementById('reportEndDate');

    if (!mainReportsView || !startDateInput || !endDateInput) {
        console.error("Elementos essenciais para o relatório não foram encontrados no DOM.");
        return;
    }

    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    if (!startDate || !endDate) {
        return showNotification('Atenção', 'Por favor, selecione as datas de início e fim.', 'error');
    }

    mainReportsView.innerHTML = `<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A gerar relatório...</p></div>`;

    try {
        const cashierSessionId = document.getElementById('cashierSessionFilter').value;
        const data = await reportsApi.getSalesReport({ establishmentId: state.establishmentId, startDate, endDate, cashierSessionId });

        mainReportsView.innerHTML = `
            <div id="salesReportSummaryCards" class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div class="bg-white p-4 rounded-lg shadow text-center"><h4 class="font-semibold text-gray-500">Receita Total</h4><p id="summary-revenue" class="text-3xl font-bold text-green-600"></p></div>
                <div class="bg-white p-4 rounded-lg shadow text-center"><h4 class="font-semibold text-gray-500">Vendas Totais</h4><p id="summary-transactions" class="text-3xl font-bold text-blue-600"></p></div>
                <div class="bg-white p-4 rounded-lg shadow text-center"><h4 class="font-semibold text-gray-500">Ticket Médio</h4><p id="summary-avg-ticket" class="text-3xl font-bold text-indigo-600"></p></div>
                <div class="bg-white p-4 rounded-lg shadow"><h4 class="font-semibold text-gray-700 text-center mb-2">Receita por Pagamento</h4><table class="w-full text-sm"><tbody id="paymentSummaryTableBody"></tbody></table></div>
            </div>
            <div class="bg-white p-6 rounded-lg shadow mt-8">
                <h3 class="text-xl font-semibold mb-4">Detalhes das Transações</h3>
                <div class="overflow-y-auto max-h-[60vh]">
                    <table id="transactionsTable" class="min-w-full text-sm">
                        <thead class="bg-gray-100 sticky top-0"><tr>
                            <th class="px-4 py-2 text-left font-semibold">Data/Hora</th>
                            <th class="px-4 py-2 text-left font-semibold">Cliente</th>
                            <th class="px-4 py-2 text-left font-semibold">Itens</th>
                            <th class="px-4 py-2 text-left font-semibold">Tipo</th>
                            <th class="px-4 py-2 text-right font-semibold">Valor Total</th>
                        </tr></thead>
                        <tbody id="transactionsTableBody" class="divide-y"></tbody>
                    </table>
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
// CORREÇÃO: Nome da função alterado para corresponder à importação em main.js
export async function loadSalesReportPage() {
    destroyAllCharts();
    
    const today = new Date().toISOString().split('T')[0];
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];

    contentDiv.innerHTML = `
        <section>
            <div class="flex flex-wrap gap-4 justify-between items-center mb-6">
                <h2 class="text-3xl font-bold text-gray-800">Relatório de Vendas</h2>
                <div class="flex items-center gap-4 bg-white p-3 rounded-lg shadow-md">
                    <div><label for="reportStartDate" class="text-sm font-medium">De:</label><input type="date" id="reportStartDate" value="${thirtyDaysAgoStr}" class="p-2 border rounded-md"></div>
                    <div><label for="reportEndDate" class="text-sm font-medium">Até:</label><input type="date" id="reportEndDate" value="${today}" class="p-2 border rounded-md"></div>
                    <div><label for="cashierSessionFilter" class="text-sm font-medium">Caixa:</label><select id="cashierSessionFilter" class="p-2 border rounded-md"><option value="all">Todos os Caixas</option></select></div>
                    <button id="generateReportBtn" class="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Gerar Relatório</button>
                    <button id="exportPdfBtn" class="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">Exportar PDF</button>
                </div>
            </div>
            <div id="main-reports-view">
                <!-- O conteúdo dinâmico será carregado aqui -->
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
            const closeDate = new Date(session.closeTime).toLocaleDateString('pt-BR');
            sessionFilter.innerHTML += `<option value="${session.id}">Caixa de ${closeDate} (${session.closedByName})</option>`;
        });
        await handleGenerateReport();
    } catch (error) {
        showNotification('Erro', 'Não foi possível carregar o histórico de caixas para o filtro.', 'error');
        await handleGenerateReport();
    }
}

