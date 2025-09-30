// js/ui/commissions.js

import * as commissionsApi from '../api/commissions.js';
import * as professionalsApi from '../api/professionals.js';
import * as reportsApi from '../api/reports.js';
import { state } from '../state.js';
import { showNotification } from '../components/modal.js';

const contentDiv = document.getElementById('content');
let currentCommissionResult = null;
let currentConsolidatedReport = null; // Cache para o relatório consolidado

// --- FUNÇÕES DE EXPORTAÇÃO ---

function exportCommissionsToPDF() {
    if (!currentConsolidatedReport || currentConsolidatedReport.length === 0) {
        showNotification('Nenhum relatório para exportar.', 'info');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const professionalName = document.getElementById('reportProfessionalSelect').options[document.getElementById('reportProfessionalSelect').selectedIndex].text;
    const month = document.getElementById('reportMonth').options[document.getElementById('reportMonth').selectedIndex].text;
    const year = document.getElementById('reportYear').value;

    doc.setFontSize(18);
    doc.text(`Relatório de Comissões - ${professionalName}`, 14, 22);
    doc.setFontSize(12);
    doc.text(`Período: ${month} de ${year}`, 14, 32);

    const head = [['Profissional', 'Total Comissionável (R$)', 'Taxa (%)', 'Comissão (R$)']];
    const body = currentConsolidatedReport.map(report => [
        report.professionalName,
        report.summary.totalCommissionableValue.toFixed(2),
        report.summary.commissionRate.toFixed(2),
        report.summary.totalCommission.toFixed(2)
    ]);

    const grandTotal = currentConsolidatedReport.reduce((acc, report) => acc + report.summary.totalCommission, 0);
    body.push(['', '', { content: 'TOTAL GERAL', styles: { fontStyle: 'bold' } }, { content: `R$ ${grandTotal.toFixed(2)}`, styles: { fontStyle: 'bold' } }]);

    doc.autoTable({
        startY: 40,
        head: head,
        body: body,
        theme: 'striped',
        headStyles: { fillColor: [41, 128, 185] }
    });

    doc.save(`relatorio_comissoes_${year}_${month}.pdf`);
}

function exportCommissionsToExcel() {
    if (!currentConsolidatedReport || currentConsolidatedReport.length === 0) {
        showNotification('Nenhum relatório para exportar.', 'info');
        return;
    }
    
    const month = document.getElementById('reportMonth').options[document.getElementById('reportMonth').selectedIndex].text;
    const year = document.getElementById('reportYear').value;

    const data = currentConsolidatedReport.map(report => ({
        'Profissional': report.professionalName,
        'Total Comissionável (R$)': report.summary.totalCommissionableValue,
        'Taxa (%)': report.summary.commissionRate,
        'Comissão (R$)': report.summary.totalCommission
    }));

    const grandTotal = data.reduce((acc, row) => acc + row['Comissão (R$)'], 0);
    data.push({}); // Linha em branco
    data.push({
        'Profissional': 'TOTAL GERAL',
        'Comissão (R$)': grandTotal
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Comissões");

    // Formatação
    worksheet['!cols'] = [{ wch: 30 }, { wch: 25 }, { wch: 10 }, { wch: 15 }];

    XLSX.writeFile(workbook, `relatorio_comissoes_${year}_${month}.xlsx`);
}

function renderCommissionHistory(history) {
    const historyContainer = document.getElementById('commissionHistory');
    if (!historyContainer) return;

    if (history.length === 0) {
        historyContainer.innerHTML = '<p class="text-center text-gray-500 py-4">Nenhum relatório salvo para este profissional.</p>';
        return;
    }
    
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    historyContainer.innerHTML = `
        <h3 class="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Histórico de Relatórios Salvos</h3>
        <div class="space-y-3 max-h-96 overflow-y-auto">
            ${history.map(report => `
                <div class="bg-gray-50 p-3 rounded-lg border">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="font-bold text-gray-800">${monthNames[report.month - 1]} de ${report.year}</p>
                            <p class="text-sm text-gray-600">Total Comissionável: <span class="font-semibold">R$ ${report.summary.totalCommissionableValue.toFixed(2)}</span></p>
                        </div>
                        <p class="text-lg font-bold text-green-600">Comissão: R$ ${report.summary.totalCommission.toFixed(2)}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

async function fetchAndRenderHistory(professionalId) {
    const historyContainer = document.getElementById('commissionHistory');
    if (!historyContainer) return;
    historyContainer.innerHTML = '<div class="loader mx-auto"></div>';

    try {
        const history = await commissionsApi.getCommissionHistory(professionalId);
        renderCommissionHistory(history);
    } catch (error) {
        historyContainer.innerHTML = `<p class="text-red-500 text-center">Erro ao carregar histórico: ${error.message}</p>`;
    }
}


async function handleCommissionReport() {
    const resultsDiv = document.getElementById('commissionResults');
    const professionalId = document.getElementById('professionalSelect').value;
    const year = document.getElementById('commissionYear').value;
    const month = document.getElementById('commissionMonth').value;
    const commissionRate = document.getElementById('commissionRate').value;
    const calculationType = document.getElementById('calculationType').value;

    if (!professionalId || !year || !month || !commissionRate || !calculationType) {
        showNotification('Por favor, preencha todos os campos do formulário.', 'error');
        return;
    }

    // Define startDate e endDate com base no mês e ano
    const startDate = new Date(year, month - 1, 1).toISOString().split('T')[0];
    const endDate = new Date(year, month, 0).toISOString().split('T')[0]; // O dia 0 do próximo mês é o último dia do mês atual

    resultsDiv.innerHTML = '<div class="loader mx-auto"></div>';
    currentCommissionResult = null; // Limpa o resultado anterior

    try {
        const result = await commissionsApi.calculateCommission({
            professionalId,
            startDate,
            endDate,
            commissionRate,
            calculationType
        });

        currentCommissionResult = result; // Armazena o resultado para poder salvar

        resultsDiv.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
                <div class="bg-blue-50 p-4 rounded-lg"><p class="text-sm text-gray-600">Total Comissionável</p><p class="text-2xl font-bold text-blue-800">R$ ${result.summary.totalCommissionableValue.toFixed(2)}</p></div>
                <div class="bg-yellow-50 p-4 rounded-lg"><p class="text-sm text-gray-600">Taxa de Comissão</p><p class="text-2xl font-bold text-yellow-800">${result.summary.commissionRate}%</p></div>
                <div class="bg-green-50 p-4 rounded-lg"><p class="text-sm text-gray-600">Comissão Total</p><p class="text-2xl font-bold text-green-800">R$ ${result.summary.totalCommission.toFixed(2)}</p></div>
            </div>
            <div class="flex justify-between items-center mb-4">
                <h4 class="text-lg font-semibold">Itens Comissionáveis</h4>
                <button id="saveReportBtn" class="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">Salvar Relatório</button>
            </div>
            <div class="overflow-y-auto max-h-96">
                <table class="min-w-full text-sm">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="px-4 py-2 text-left">Data</th>
                            <th class="px-4 py-2 text-left">Cliente</th>
                            <th class="px-4 py-2 text-left">Item</th>
                            <th class="px-4 py-2 text-left">Tipo</th>
                            <th class="px-4 py-2 text-right">Valor</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y">
                        ${result.items.map(item => `
                            <tr>
                                <td class="px-4 py-2">${new Date(item.date).toLocaleDateString('pt-BR')}</td>
                                <td class="px-4 py-2">${item.client}</td>
                                <td class="px-4 py-2">${item.item}</td>
                                <td class="px-4 py-2">${item.type}</td>
                                <td class="px-4 py-2 text-right">R$ ${item.value.toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        // Adiciona o listener para o botão de salvar
        document.getElementById('saveReportBtn').addEventListener('click', handleSaveReport);
    } catch (error) {
        resultsDiv.innerHTML = `<p class="text-red-500 text-center">Erro ao gerar relatório: ${error.message}</p>`;
    }
}

async function handleSaveReport() {
    if (!currentCommissionResult) {
        showNotification('Nenhum relatório para salvar.', 'error');
        return;
    }

    const professionalId = document.getElementById('professionalSelect').value;
    const professionalName = document.getElementById('professionalSelect').options[document.getElementById('professionalSelect').selectedIndex].text;
    const year = document.getElementById('commissionYear').value;
    const month = document.getElementById('commissionMonth').value;

    const reportToSave = {
        professionalId,
        professionalName,
        month,
        year,
        reportData: currentCommissionResult
    };

    try {
        await commissionsApi.saveCommissionReport(reportToSave);
        showNotification('Relatório salvo com sucesso!', 'success');
        fetchAndRenderHistory(professionalId); // Atualiza o histórico
    } catch (error) {
        showNotification(`Erro ao salvar: ${error.message}`, 'error');
    }
}

async function handleGenerateConsolidatedReport() {
    const resultsContainer = document.getElementById('consolidatedReportResults');
    const professionalId = document.getElementById('reportProfessionalSelect').value;
    const year = document.getElementById('reportYear').value;
    const month = document.getElementById('reportMonth').value;

    resultsContainer.innerHTML = '<div class="loader mx-auto"></div>';
    currentConsolidatedReport = null; // Limpa o cache

    try {
        const reports = await reportsApi.getCommissionReport(state.establishmentId, year, month, professionalId);
        currentConsolidatedReport = reports; // Armazena os dados para exportação
        
        if (reports.length === 0) {
            resultsContainer.innerHTML = '<p class="text-center text-gray-500">Nenhum relatório de comissão salvo para este período/profissional.</p>';
            return;
        }

        const grandTotal = reports.reduce((acc, report) => acc + report.summary.totalCommission, 0);

        resultsContainer.innerHTML = `
            <div class="flex justify-between items-center mb-4">
                 <div>
                    <p class="text-lg font-semibold">Total Geral de Comissões:</p>
                    <p class="text-4xl font-bold text-green-600">R$ ${grandTotal.toFixed(2)}</p>
                </div>
                <div class="flex gap-2">
                    <button id="exportPdfBtn" class="py-2 px-3 bg-red-600 text-white font-semibold rounded-lg text-sm hover:bg-red-700">Exportar PDF</button>
                    <button id="exportExcelBtn" class="py-2 px-3 bg-green-700 text-white font-semibold rounded-lg text-sm hover:bg-green-800">Exportar Excel</button>
                </div>
            </div>
            <table id="consolidated-table" class="min-w-full text-sm">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="px-4 py-2 text-left">Profissional</th>
                        <th class="px-4 py-2 text-right">Total Comissionável</th>
                        <th class="px-4 py-2 text-right">Taxa (%)</th>
                        <th class="px-4 py-2 text-right">Comissão (R$)</th>
                    </tr>
                </thead>
                <tbody class="divide-y">
                    ${reports.map(report => `
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-2 font-semibold">${report.professionalName}</td>
                            <td class="px-4 py-2 text-right">R$ ${report.summary.totalCommissionableValue.toFixed(2)}</td>
                            <td class="px-4 py-2 text-right">${report.summary.commissionRate}%</td>
                            <td class="px-4 py-2 text-right font-bold">R$ ${report.summary.totalCommission.toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        document.getElementById('exportPdfBtn').addEventListener('click', exportCommissionsToPDF);
        document.getElementById('exportExcelBtn').addEventListener('click', exportCommissionsToExcel);
    } catch (error) {
        resultsContainer.innerHTML = `<p class="text-red-500 text-center">Erro ao gerar relatório consolidado: ${error.message}</p>`;
    }
}


export async function loadCommissionsPage() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    contentDiv.innerHTML = `
        <section class="space-y-8">
            <div>
                <h2 class="text-3xl font-bold text-gray-800 mb-6">Apuração de Comissões</h2>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <div class="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                        <div>
                            <label for="professionalSelect" class="block text-sm font-medium">Profissional</label>
                            <select id="professionalSelect" class="w-full p-2 border rounded-md"></select>
                        </div>
                        <div>
                            <label for="commissionYear" class="block text-sm font-medium">Ano</label>
                            <select id="commissionYear" class="w-full p-2 border rounded-md">
                                ${Array.from({length: 5}, (_, i) => `<option value="${currentYear - i}">${currentYear - i}</option>`).join('')}
                            </select>
                        </div>
                        <div>
                            <label for="commissionMonth" class="block text-sm font-medium">Mês</label>
                            <select id="commissionMonth" class="w-full p-2 border rounded-md">
                                ${Array.from({length: 12}, (_, i) => `<option value="${i + 1}" ${i + 1 === currentMonth ? 'selected' : ''}>${new Date(0, i).toLocaleString('pt-BR', { month: 'long' })}</option>`).join('')}
                            </select>
                        </div>
                        <div>
                            <label for="calculationType" class="block text-sm font-medium">Calcular sobre</label>
                            <select id="calculationType" class="w-full p-2 border rounded-md">
                                <option value="services_only">Apenas Serviços</option>
                                <option value="products_only">Apenas Produtos</option>
                                <option value="services_and_products">Serviços e Produtos</option>
                            </select>
                        </div>
                        <div>
                            <label for="commissionRate" class="block text-sm font-medium">Comissão (%)</label>
                            <input type="number" id="commissionRate" value="10" class="w-full p-2 border rounded-md">
                        </div>
                    </div>
                    <button id="calculateCommissionBtn" class="mt-4 w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">Calcular</button>
                </div>
            </div>

            <div id="commissionResults" class="bg-white p-6 rounded-lg shadow-md">
                <p class="text-center text-gray-500">Preencha os filtros acima para gerar o relatório.</p>
            </div>

            <div id="commissionHistory" class="bg-white p-6 rounded-lg shadow-md">
                </div>
            
            <div>
                <h2 class="text-3xl font-bold text-gray-800 mb-6">Relatório de Comissões</h2>
                <div class="bg-white p-6 rounded-lg shadow-md">
                     <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div>
                            <label for="reportProfessionalSelect" class="block text-sm font-medium">Profissional</label>
                            <select id="reportProfessionalSelect" class="w-full p-2 border rounded-md"></select>
                        </div>
                        <div>
                            <label for="reportYear" class="block text-sm font-medium">Ano</label>
                             <select id="reportYear" class="w-full p-2 border rounded-md">
                                ${Array.from({length: 5}, (_, i) => `<option value="${currentYear - i}">${currentYear - i}</option>`).join('')}
                            </select>
                        </div>
                        <div>
                            <label for="reportMonth" class="block text-sm font-medium">Mês</label>
                            <select id="reportMonth" class="w-full p-2 border rounded-md">
                                ${Array.from({length: 12}, (_, i) => `<option value="${i + 1}" ${i + 1 === currentMonth ? 'selected' : ''}>${new Date(0, i).toLocaleString('pt-BR', { month: 'long' })}</option>`).join('')}
                            </select>
                        </div>
                        <button id="generateConsolidatedReportBtn" class="bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700">Extrair Relatório</button>
                    </div>
                </div>
                <div id="consolidatedReportResults" class="bg-white p-6 rounded-lg shadow-md mt-4">
                    <p class="text-center text-gray-500">Selecione o período para extrair o relatório de comissões.</p>
                </div>
            </div>
        </section>
    `;

    document.getElementById('calculateCommissionBtn').addEventListener('click', handleCommissionReport);
    document.getElementById('generateConsolidatedReportBtn').addEventListener('click', handleGenerateConsolidatedReport);

    try {
        const professionals = await professionalsApi.getProfessionals(state.establishmentId);
        const professionalSelect = document.getElementById('professionalSelect');
        const reportProfessionalSelect = document.getElementById('reportProfessionalSelect');
        
        if (professionals.length > 0) {
            const options = professionals.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
            professionalSelect.innerHTML = options;
            reportProfessionalSelect.innerHTML = '<option value="all">Toda a Equipe</option>' + options;

            // Carrega o histórico do primeiro profissional da lista
            fetchAndRenderHistory(professionals[0].id);
            // Adiciona um listener para atualizar o histórico quando o profissional muda
            professionalSelect.addEventListener('change', (e) => fetchAndRenderHistory(e.target.value));
        } else {
             const noProfMsg = '<option value="">Nenhum profissional encontrado</option>';
             professionalSelect.innerHTML = noProfMsg;
             reportProfessionalSelect.innerHTML = noProfMsg;
        }
    } catch (error) {
        showNotification('Erro', 'Não foi possível carregar a lista de profissionais.', 'error');
    }
}