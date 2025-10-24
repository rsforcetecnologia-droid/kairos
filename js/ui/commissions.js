// js/ui/commissions.js

import * as commissionsApi from '../api/commissions.js';
import * as professionalsApi from '../api/professionals.js';
import { state } from '../state.js';
import { showNotification, showConfirmation, showGenericModal } from '../components/modal.js';
import { navigateTo } from '../main.js';

const contentDiv = document.getElementById('content');
let calculationResults = []; // Cache para os resultados do cálculo
let calculatedPeriodString = ""; // NOVO: Cache para a string do período
let pageEventListener = null;
let lastFilters = {}; // Variavel de cache para filtros

// --- FUNÇÕES DE RECIBO E MODAIS ---

function generateReceipt(report) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text(`Recibo de Comissão - ${report.professionalName}`, 105, 20, null, null, 'center');
    doc.setFontSize(12);
    doc.text(`Período: ${report.period}`, 105, 30, null, null, 'center');
    
    doc.autoTable({
        startY: 40,
        head: [['Descrição', 'Valor (R$)']],
        body: [
            ['Total Comissionável', `R$ ${report.summary.totalCommissionableValue.toFixed(2)}`],
            ['Total de Itens', report.summary.totalItems],
        ],
        theme: 'striped'
    });
    
    const finalY = doc.lastAutoTable.finalY + 20;
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Valor Total da Comissão:', 14, finalY);
    doc.text(`R$ ${report.summary.totalCommission.toFixed(2)}`, 190, finalY, null, null, 'right');
    
    const signatureY = finalY + 80;
    doc.line(40, signatureY, 170, signatureY);
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(report.professionalName, 105, signatureY + 10, null, null, 'center');

    doc.save(`recibo_comissao_${report.professionalName}_${report.period.replace(/\//g, '-')}.pdf`);
}

function openCalculationModal() {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
    const todayStr = today.toISOString().split('T')[0];

    const professionalsOptions = state.professionals.map(p => `<option value="${p.id}">${p.name}</option>`).join('');

    const contentHTML = `
        <form id="calculation-form" class="space-y-6">
            <div>
                <label for="calc-professionals" class="block text-sm font-medium text-gray-700">Profissionais</label>
                <select id="calc-professionals" multiple class="mt-1 w-full p-2 border rounded-md h-32">
                    <option value="all">Todos os Profissionais</option>
                    ${professionalsOptions}
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Período</label>
                <div class="mt-1 grid grid-cols-2 gap-4">
                    <input type="date" id="calc-start-date" value="${firstDayOfMonth}" class="w-full p-2 border rounded-md">
                    <input type="date" id="calc-end-date" value="${todayStr}" class="w-full p-2 border rounded-md">
                </div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Incluir no cálculo</label>
                <div class="mt-2 space-y-2">
                    <label class="flex items-center"><input type="checkbox" id="calc-type-services" checked class="h-4 w-4 rounded border-gray-300 text-indigo-600"> <span class="ml-2">Serviços</span></label>
                    <label class="flex items-center"><input type="checkbox" id="calc-type-products" checked class="h-4 w-4 rounded border-gray-300 text-indigo-600"> <span class="ml-2">Produtos</span></label>
                    <label class="flex items-center"><input type="checkbox" id="calc-type-packages" class="h-4 w-4 rounded border-gray-300 text-indigo-600"> <span class="ml-2">Pacotes</span></label>
                </div>
            </div>
            <div class="pt-4 border-t">
                <button type="submit" class="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">Calcular Previsão</button>
            </div>
        </form>
    `;

    const { modalElement } = showGenericModal({
        title: "Calcular Comissões",
        contentHTML: contentHTML,
        maxWidth: 'max-w-md'
    });

    modalElement.querySelector('#calculation-form').addEventListener('submit', (e) => {
        e.preventDefault();
        handleCommissionCalculation();
        
        const closeButton = modalElement.querySelector('[data-close-modal]'); 
        if (closeButton) {
            closeButton.click();
        } else {
            modalElement.style.display = 'none'; 
        }
    });
}

// --- FUNÇÕES DE LÓGICA E RENDERIZAÇÃO ---

/**
 * NOVO: Lógica para excluir um relatório de comissão.
 */
async function handleDeleteReport(reportId) {
    const confirmed = await showConfirmation('Excluir Relatório', 'Tem a certeza que deseja excluir permanentemente este relatório de comissão? Esta ação não pode ser desfeita.');

    if (confirmed) {
        try {
            await commissionsApi.deleteCommissionReport(reportId);
            showNotification('Sucesso!', 'Relatório de comissão excluído.', 'success');
            // Re-renderiza o histórico com os filtros atuais
            fetchAndRenderHistory();
        } catch (error) {
            showNotification('Erro', `Não foi possível excluir: ${error.message}`, 'error');
        }
    }
}


async function handleCommissionCalculation() {
    const professionalIds = Array.from(document.getElementById('calc-professionals').selectedOptions).map(opt => opt.value);
    const startDate = document.getElementById('calc-start-date').value;
    const endDate = document.getElementById('calc-end-date').value;
    const calculationTypes = {
        services: document.getElementById('calc-type-services').checked,
        products: document.getElementById('calc-type-products').checked,
        packages: document.getElementById('calc-type-packages').checked,
    };

    if (professionalIds.length === 0) {
        showNotification('Atenção', 'Selecione pelo menos um profissional.', 'error');
        return;
    }

    navigateTo('commissions-section', { view: 'results', isLoading: true });

    try {
        const results = await commissionsApi.calculateCommission({ professionalIds, startDate, endDate, calculationTypes });
        calculationResults = results;
        
        const periodString = `${new Date(startDate+'T00:00:00').toLocaleDateString('pt-BR')} a ${new Date(endDate+'T00:00:00').toLocaleDateString('pt-BR')}`;
        
        // CORREÇÃO: Salva a string do período no cache
        calculatedPeriodString = periodString; 
        
        renderResultsView(results, periodString);

    } catch (error) {
        showNotification('Erro', `Não foi possível calcular: ${error.message}`, 'error');
        navigateTo('commissions-section', { view: 'history' });
    }
}

async function handleSaveReports() {
    if (calculationResults.length === 0) {
        showNotification('Erro', 'Não há resultados para salvar.', 'error');
        return;
    }

    // CORREÇÃO: Usar a string do período guardada no cache,
    // pois os inputs <input type="date"> não existem mais nesta tela.
    const period = calculatedPeriodString; 
    
    const confirmed = await showConfirmation('Salvar Relatórios', `Tem a certeza que deseja salvar ${calculationResults.length} relatório(s) de comissão para o período de ${period}?`);
    
    if(confirmed) {
        try {
            const savePromises = calculationResults.map(result => 
                commissionsApi.saveCommissionReport({
                    professionalId: result.professionalId,
                    professionalName: result.professionalName,
                    period: period, // Usar a variável 'period' corrigida
                    reportData: result
                })
            );
            await Promise.all(savePromises);
            showNotification('Sucesso!', 'Relatórios de comissão salvos.', 'success');
            navigateTo('commissions-section', { view: 'history' });
        } catch (error) {
            showNotification('Erro', `Não foi possível salvar: ${error.message}`, 'error');
        }
    }
}

async function fetchAndRenderHistory() {
    const historyContainer = document.getElementById('commissionHistory');
    if (!historyContainer) return;
    
    // --- LÓGICA DE FILTRO: Leitura dos campos de filtro ---
    const professionalFilter = document.getElementById('filter-professional')?.value || '';
    const monthFilter = document.getElementById('filter-month')?.value || ''; 
    
    lastFilters = {};
    if (professionalFilter && professionalFilter !== 'all') {
        lastFilters.professionalId = professionalFilter;
    }
    if (monthFilter) {
        // O servidor precisa de YYYY-MM para filtrar
        lastFilters.period = monthFilter; 
    }
    // ------------------------------------------------------

    historyContainer.innerHTML = '<div class="loader mx-auto my-8"></div>';

    try {
        // Uso da nova função da API com filtros
        const history = await commissionsApi.getCommissionHistory(lastFilters); 
        
        if (history.length === 0) {
            historyContainer.innerHTML = '<p class="text-center text-gray-500 py-8">Nenhum relatório de comissão salvo encontrado para os filtros.</p>';
            return;
        }

        historyContainer.innerHTML = `
            <div class="space-y-3">
                ${history.map(report => `
                    <div class="bg-white p-4 rounded-lg shadow-sm border" data-id="${report.id}">
                        <div class="flex flex-wrap justify-between items-center gap-2">
                            <div>
                                <p class="font-bold text-gray-800">${report.professionalName}</p>
                                <p class="text-sm text-gray-500">Período: ${report.period}</p>
                                <p class="text-sm text-gray-600 mt-1">Salvo em: ${new Date(report.createdAt).toLocaleDateString('pt-BR')}</p>
                            </div>
                            <div class="text-right flex items-center gap-3">
                                <p class="text-lg font-bold text-green-600">R$ ${report.summary.totalCommission.toFixed(2)}</p>
                                <div>
                                    <button data-action="generate-receipt" data-report='${JSON.stringify(report).replace(/'/g, "&apos;")}' class="py-1 px-3 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg hover:bg-indigo-200">Recibo</button>
                                    <button data-action="delete-report" data-id="${report.id}" class="mt-1 py-1 px-3 bg-red-100 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-200">Excluir</button>
                                </div>
                            </div>
                        </div>
                    </div>`).join('')}
            </div>`;
    } catch (error) {
        historyContainer.innerHTML = `<p class="text-red-500 text-center">Erro ao carregar histórico: ${error.message}</p>`;
    }
}

function renderHistoryView() {
    // Garante que a lista de profissionais está carregada
    if (!state.professionals) {
        contentDiv.innerHTML = `<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A carregar dados...</p></div>`;
        return;
    }
    
    // Código para gerar as opções dos profissionais (para o filtro)
    const professionalsOptions = state.professionals.map(p => `<option value="${p.id}">${p.name}</option>`).join('');

    // Gera as opções de mês/ano dos últimos 12 meses (para o filtro)
    const monthOptions = [];
    const today = new Date();
    for(let i = 0; i < 12; i++) {
        const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const monthString = month.toString().padStart(2, '0');
        const value = `${year}-${monthString}`; // Formato YYYY-MM
        const label = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
        monthOptions.push(`<option value="${value}">${label}</option>`);
    }
    
    // Aplica os filtros persistidos (se existirem)
    const selectedProfessional = lastFilters.professionalId || 'all';
    const selectedMonth = lastFilters.period || '';


    contentDiv.innerHTML = `
        <section class="space-y-6">
            <div class="flex justify-between items-center">
                <h2 class="text-3xl font-bold text-gray-800">Comissões</h2>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-4">
                <div class="flex-1">
                    <label for="filter-professional" class="block text-sm font-medium text-gray-700">Filtrar por Profissional</label>
                    <select id="filter-professional" class="mt-1 w-full p-2 border rounded-md">
                        <option value="all">Todos os Profissionais</option>
                        ${professionalsOptions}
                    </select>
                </div>
                <div class="flex-1">
                    <label for="filter-month" class="block text-sm font-medium text-gray-700">Filtrar por Mês</label>
                    <select id="filter-month" class="mt-1 w-full p-2 border rounded-md">
                        <option value="">Todos os Meses</option>
                        ${monthOptions.join('')}
                    </select>
                </div>
            </div>
            <div id="commissionHistory" class="bg-gray-50 p-4 rounded-lg"></div>
            <button data-action="open-calculator" class="fixed bottom-10 right-10 bg-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-xl hover:bg-indigo-700 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m-3 3v6m-3-9h6m-6 9h6m3-9a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </button>
        </section>
    `;
    
    // Re-seleciona os valores dos filtros se eles foram definidos anteriormente
    document.getElementById('filter-professional').value = selectedProfessional;
    document.getElementById('filter-month').value = selectedMonth;

    // Configura os event listeners para os filtros
    document.getElementById('filter-professional').addEventListener('change', fetchAndRenderHistory);
    document.getElementById('filter-month').addEventListener('change', fetchAndRenderHistory);

    fetchAndRenderHistory();
}

function renderResultsView(results, period) {
    calculationResults = results;
    const grandTotal = results.reduce((acc, r) => acc + r.summary.totalCommission, 0);

    contentDiv.innerHTML = `
        <section>
            <div class="flex justify-between items-center mb-6">
                <button data-action="back-to-history" class="py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300"> < Voltar </button>
                <h2 class="text-2xl font-bold text-gray-800 text-center">Previsão de Comissão</h2>
                <button data-action="save-reports" class="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">Salvar Relatórios</button>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-md">
                <p class="text-center text-gray-500 mb-4">Período: <strong>${period}</strong></p>
                <div class="text-center mb-6"><p class="text-lg font-semibold">Total Geral de Comissões:</p><p class="text-4xl font-bold text-green-600">R$ ${grandTotal.toFixed(2)}</p></div>
                
                <div class="space-y-4">
                ${results.map(result => `
                    <details class="bg-gray-50 p-3 rounded-lg border">
                        <summary class="flex justify-between items-center cursor-pointer">
                            <p class="font-bold text-gray-800">${result.professionalName}</p>
                            <p class="text-lg font-bold text-green-600">R$ ${result.summary.totalCommission.toFixed(2)}</p>
                        </summary>
                        <div class="mt-4 pt-4 border-t overflow-x-auto">
                            <table class="min-w-full text-xs">
                                <thead class="bg-gray-100"><tr>
                                    <th class="px-2 py-1 text-left">Data</th><th class="px-2 py-1 text-left">Item</th>
                                    <th class="px-2 py-1 text-right">Valor</th><th class="px-2 py-1 text-right">Taxa</th><th class="px-2 py-1 text-right">Comissão</th>
                                </tr></thead>
                                <tbody class="divide-y">
                                ${result.items.map(item => `
                                    <tr>
                                        <td class="px-2 py-1">${new Date(item.date).toLocaleDateString('pt-BR')}</td>
                                        <td class="px-2 py-1">${item.item}</td>
                                        <td class="px-2 py-1 text-right">R$ ${item.value.toFixed(2)}</td>
                                        <td class="px-2 py-1 text-right">${item.commissionRate}%</td>
                                        <td class="px-2 py-1 text-right font-semibold">R$ ${item.commissionValue.toFixed(2)}</td>
                                    </tr>`).join('')}
                                </tbody>
                            </table>
                        </div>
                    </details>
                `).join('')}
                </div>
            </div>
        </section>
    `;
}

// --- FUNÇÃO PRINCIPAL E EVENT LISTENERS ---

export async function loadCommissionsPage(params = {}) {
    const { view = 'history', isLoading = false } = params;

    if (pageEventListener) {
        contentDiv.removeEventListener('click', pageEventListener);
    }

    pageEventListener = (e) => {
        const button = e.target.closest('button[data-action]');
        if (!button) return;
        const action = button.dataset.action;

        switch (action) {
            case 'open-calculator': openCalculationModal(); break;
            case 'back-to-history': navigateTo('commissions-section', { view: 'history' }); break;
            case 'save-reports': handleSaveReports(); break;
            case 'generate-receipt':
                const reportData = JSON.parse(button.dataset.report.replace(/&apos;/g, "'"));
                generateReceipt(reportData);
                break;
            case 'delete-report': // Lida com a exclusão de um relatório
                const reportId = button.dataset.id;
                handleDeleteReport(reportId);
                break;
        }
    };
    contentDiv.addEventListener('click', pageEventListener);

    if (isLoading) {
        contentDiv.innerHTML = `<div class="p-8 text-center"><div class="loader mx-auto"></div><p class="mt-4">A calcular comissões...</p></div>`;
        return;
    }

    // Garante que a lista de profissionais está carregada para os filtros
    if (!state.professionals || state.professionals.length === 0) {
        try {
            state.professionals = await professionalsApi.getProfessionals(state.establishmentId);
        } catch (error) {
            showNotification('Erro', 'Não foi possível carregar a lista de profissionais.', 'error');
            state.professionals = [];
        }
    }

    if (view === 'history' || view === 'main') {
        renderHistoryView();
    }
}

