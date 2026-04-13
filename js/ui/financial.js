// js/ui/financial.js

import * as financialApi from '../api/financial.js';
import { getHierarchy } from '../api/establishments.js';
import * as suppliersApi from '../api/suppliers.js';
import * as clientsApi from '../api/clients.js';
import * as professionalsApi from '../api/professionals.js';
import { state } from '../state.js';
import { showNotification, showConfirmation } from '../components/modal.js';
import { escapeHTML } from '../utils.js';

const contentDiv = document.getElementById('content');

// ============================================================================
// 📊 ESTADO LOCAL (ERP STATE MANAGEMENT)
// ============================================================================
let localState = { 
    payables: [], 
    receivables: [], 
    natures: [], 
    costCenters: [],
    establishments: [], 
    suppliers: [],
    clients: [],
    professionals: [],
    
    currentTab: 'receivables', 
    statusFilter: 'all', 
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0],
    filterNaturezaId: 'all',
    filterCostCenterId: 'all',
    filterEstablishmentIds: new Set(), 
    searchQuery: '',
    
    isAdvancedFilterOpen: false,
    selectedIds: new Set(), 
    isSelectionMode: false,

    // Variáveis para ordenação
    sortCol: 'dueDate', 
    sortAsc: true 
};

let financialPageEventListener = null;
let genericModalEventListener = null;

// ============================================================================
// 🛠️ FUNÇÕES AUXILIARES
// ============================================================================

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

function formatDateDisplay(dateStr) {
    if (!dateStr) return { day: '--', month: '---', full: '--/--/----' };
    const [year, month, day] = dateStr.split('-');
    const date = new Date(year, month - 1, day);
    const dayStr = String(date.getDate()).padStart(2, '0');
    const monthStr = date.toLocaleString('pt-BR', { month: 'short' }).toUpperCase().replace('.', '');
    return { day: dayStr, month: monthStr, full: date.toLocaleDateString('pt-BR') };
}

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function isOverdue(dueDateStr, status) {
    if (status === 'paid') return false;
    const today = new Date();
    today.setHours(0,0,0,0);
    const [year, month, day] = dueDateStr.split('-');
    const dueDate = new Date(year, month - 1, day);
    return dueDate < today;
}

// ============================================================================
// 🏢 CONFIGURAÇÕES DE ERP (NATUREZAS E CENTROS DE CUSTO)
// ============================================================================

function renderHierarchyList(container, items, type) {
    if (!container) return;
    if (!items || items.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <i class="bi bi-inbox text-2xl text-gray-300"></i>
                <p class="text-gray-500 text-sm mt-2 font-medium">Nenhum item criado.</p>
            </div>`;
        return;
    }
    
    // Visual Hierárquico Compacto (Tree View)
    const renderNode = (item, level = 0) => {
        const padding = level * 16; 
        const isRoot = level === 0;
        const icon = isRoot ? 'bi-folder-fill text-indigo-500' : 'bi-file-earmark-text text-gray-400';
        const bgClass = isRoot ? 'bg-white shadow-sm border border-gray-200' : 'bg-gray-50 border border-gray-100/50';
        const textClass = isRoot ? 'text-sm font-bold text-gray-800' : 'text-xs font-semibold text-gray-600';
        
        const connector = level > 0 ? `<div class="absolute left-0 top-1/2 w-3 border-t-2 border-gray-200" style="margin-left: -12px;"></div>` : '';
        const borderLeft = level > 0 ? `border-left: 2px solid #e5e7eb;` : '';

        return `
            <div class="relative flex justify-between items-center ${bgClass} p-2 rounded-lg mb-1.5 hover:border-indigo-300 transition-all group" style="margin-left: ${padding}px; ${borderLeft}">
                ${connector}
                <span class="${textClass} flex items-center gap-2">
                    <i class="bi ${icon} text-base"></i>
                    ${item.name}
                </span>
                <button type="button" data-action="delete-${type}" data-id="${item.id}" class="text-gray-400 hover:text-red-600 text-xs w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all shadow-sm border border-transparent hover:border-red-100" title="Excluir">
                    <i class="bi bi-trash3"></i>
                </button>
            </div>
            ${item.children.map(child => renderNode(child, level + 1)).join('')}
        `;
    };
    container.innerHTML = items.map(item => renderNode(item)).join('');
}

async function openHierarchyModal(type) {
    const modal = document.getElementById('genericModal');
    const isNature = type === 'nature';
    const title = isNature ? 'Plano de Naturezas' : 'Centros de Custo';
    const api = isNature ? financialApi.getNatures : financialApi.getCostCenters;
    const createApi = isNature ? financialApi.createNature : financialApi.createCostCenter;
    const collectionName = isNature ? 'natures' : 'costCenters';

    modal.innerHTML = `
        <div class="modal-content max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden">
            <div class="bg-gray-50 px-5 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 class="text-base font-bold text-gray-800 flex items-center gap-2">
                    <i class="bi ${isNature ? 'bi-tags-fill text-indigo-500' : 'bi-diagram-3-fill text-blue-500'}"></i> ${title}
                </h2>
                <button type="button" data-action="close-modal" class="text-gray-400 hover:text-red-500 text-xl font-bold transition-colors">&times;</button>
            </div>
            
            <div class="p-4">
                <form id="hierarchyForm" class="mb-4 bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-sm flex flex-col md:flex-row gap-3 items-end">
                    <div class="flex-1 w-full">
                        <label class="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wide">Nome da Categoria</label>
                        <input type="text" id="itemName" placeholder="Ex: Receitas..." required class="w-full p-2 border border-gray-300 rounded-md text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all">
                    </div>
                    <div class="flex-1 w-full">
                        <label class="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wide">Sub-categoria de (Opcional)</label>
                        <select id="itemParent" class="w-full p-2 bg-white border border-gray-300 rounded-md text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all">
                            <option value="">-- Nível Principal --</option>
                        </select>
                    </div>
                    <button type="submit" class="w-full md:w-auto py-2 px-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-1.5 text-xs">
                        <i class="bi bi-plus-lg"></i> Add
                    </button>
                </form>

                <div class="border-t border-gray-100 pt-3">
                    <h3 class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Estrutura Atual</h3>
                    <div id="hierarchyList" class="space-y-1 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
                        <div class="loader mx-auto"></div>
                    </div>
                </div>
            </div>
        </div>`;
    modal.style.display = 'flex';

    const listDiv = modal.querySelector('#hierarchyList');
    const parentSelect = modal.querySelector('#itemParent');

    const renderData = (items) => {
        const hierarchy = buildHierarchy(items);
        renderHierarchyList(listDiv, hierarchy, type);
        
        const currentSelection = parentSelect.value;
        parentSelect.innerHTML = '<option value="">-- Nível Principal --</option>';
        const renderOption = (item, level = 0) => {
            const prefix = '\u00A0\u00A0'.repeat(level) + (level > 0 ? '↳ ' : '');
            parentSelect.innerHTML += `<option value="${item.id}">${prefix}${item.name}</option>`;
            item.children.forEach(child => renderOption(child, level + 1));
        };
        hierarchy.forEach(root => renderOption(root));
        parentSelect.value = currentSelection; 
    };

    try {
        const items = await api(state.establishmentId);
        localState[collectionName] = items;
        renderData(items);
    } catch (e) { console.error(e); }

    const form = modal.querySelector('#hierarchyForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = modal.querySelector('#itemName').value;
        const parentId = parentSelect.value;
        try {
            await createApi({ name, parentId: parentId || null, establishmentId: state.establishmentId });
            const updatedItems = await api(state.establishmentId);
            localState[collectionName] = updatedItems;
            renderData(updatedItems);
            form.reset();
            await fetchAndDisplayData(); 
            showNotification('Sucesso', 'Item adicionado à estrutura.', 'success');
        } catch (error) {
            showNotification('Erro', error.message, 'error');
        }
    });
}

// ============================================================================
// 🎨 RENDERIZAÇÃO DO LAYOUT ERP E FILTROS AVANÇADOS
// ============================================================================

export async function loadFinancialPage() {
    try {
        const payload = await getHierarchy();
        const matrizes = payload.matrizes || [];
        localState.establishments = [];
        matrizes.forEach(m => {
            localState.establishments.push({ id: m.id, name: m.name, type: 'Matriz' });
            if (m.branches) {
                m.branches.forEach(b => localState.establishments.push({ id: b.id, name: b.name, type: 'Filial' }));
            }
        });
        
        if (localState.filterEstablishmentIds.size === 0) {
            localState.filterEstablishmentIds.add(state.establishmentId);
        }
    } catch (e) { console.warn("Erro ao buscar lojas", e); }

    renderBaseLayout();
    setupEventListeners();
    await fetchAndDisplayData();
}

function renderBaseLayout() {
    const estCheckboxes = localState.establishments.map(est => `
        <label class="inline-flex items-center gap-2 px-3 py-1.5 bg-white border ${localState.filterEstablishmentIds.has(est.id) ? 'border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700' : 'border-gray-200 text-gray-600'} rounded-lg cursor-pointer hover:bg-gray-50 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5" value="${est.id}" ${localState.filterEstablishmentIds.has(est.id) ? 'checked' : ''}>
            <span class="text-xs font-bold whitespace-nowrap">${est.type === 'Matriz' ? '<i class="bi bi-building mr-1"></i>' : '<i class="bi bi-shop mr-1"></i>'} ${est.name}</span>
        </label>
    `).join('');

    contentDiv.innerHTML = `
        <section class="h-full flex flex-col p-2 md:p-4 md:pl-6 w-full relative">
            
            <div id="batch-action-bar" class="hidden absolute top-4 left-4 right-4 z-30 bg-gray-900 text-white rounded-xl shadow-2xl p-2.5 items-center justify-between animate-fade-in-down">
                <div class="flex items-center gap-3">
                    <button id="cancel-selection-btn" class="p-1.5 hover:bg-gray-700 rounded-full transition-colors text-gray-300 hover:text-white">
                        <i class="bi bi-x-lg text-lg"></i>
                    </button>
                    <span class="font-bold text-sm tracking-wide"><span id="selected-count" class="text-indigo-400">0</span> Selecionados</span>
                </div>
                <button id="batch-delete-btn" class="flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg text-sm">
                    <i class="bi bi-trash3"></i> Excluir
                </button>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-center mb-3 gap-3 w-full">
                
                <div class="flex bg-gray-200/80 p-1 rounded-xl border border-gray-300 w-full md:w-auto shadow-inner">
                    <button id="tab-receivables" class="flex-1 md:w-32 py-1.5 text-xs font-bold rounded-lg transition-all flex justify-center items-center gap-2 ${localState.currentTab === 'receivables' ? 'bg-white text-emerald-700 shadow' : 'text-gray-600 hover:text-gray-800'}">
                        A Receber
                    </button>
                    <button id="tab-payables" class="flex-1 md:w-32 py-1.5 text-xs font-bold rounded-lg transition-all flex justify-center items-center gap-2 ${localState.currentTab === 'payables' ? 'bg-white text-red-700 shadow' : 'text-gray-600 hover:text-gray-800'}">
                        A Pagar
                    </button>
                </div>

                <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                    <button id="export-excel-btn" class="py-1.5 px-3 bg-white border border-gray-300 text-green-700 font-semibold rounded-lg hover:bg-green-50 transition shadow-sm flex items-center gap-2 text-xs" title="Exportar para Excel">
                        <i class="bi bi-file-earmark-excel-fill text-green-600"></i> Excel
                    </button>
                    <button id="settings-btn" class="py-1.5 px-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition shadow-sm flex items-center gap-2 text-xs" title="Plano de Naturezas e Centros de Custo">
                        <i class="bi bi-gear-fill text-gray-400"></i> Ajustes
                    </button>
                    <button data-action="new-financial" data-type="payable" class="py-1.5 px-3 bg-red-50 text-red-700 border border-red-200 font-bold rounded-lg hover:bg-red-100 transition shadow-sm flex items-center gap-2 text-xs flex-1 md:flex-none justify-center">
                        <i class="bi bi-arrow-down-circle"></i> Nova Despesa
                    </button>
                    <button data-action="new-financial" data-type="receivable" class="py-1.5 px-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition shadow-sm flex items-center gap-2 text-xs flex-1 md:flex-none justify-center">
                        <i class="bi bi-arrow-up-circle"></i> Nova Receita
                    </button>
                </div>
            </div>

            <div id="summary-section" class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3"></div>

            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2 w-full">
                <div class="flex gap-2 overflow-x-auto pb-1 w-full md:w-auto custom-scrollbar">
                    <button data-status="all" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${localState.statusFilter === 'all' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-white text-gray-600 hover:bg-gray-50'}">Todos</button>
                    <button data-status="pending" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${localState.statusFilter === 'pending' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-white text-gray-600 hover:bg-gray-50'}">Abertos / Prov.</button>
                    <button data-status="paid" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${localState.statusFilter === 'paid' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-white text-gray-600 hover:bg-gray-50'}">Baixados</button>
                    <button data-status="overdue" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${localState.statusFilter === 'overdue' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-white text-gray-600 hover:bg-gray-50'}">Atrasados</button>
                </div>

                <div class="flex items-center gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-1 md:pb-0">
                    <div class="relative flex-shrink-0 w-full md:w-64">
                        <i class="bi bi-search absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                        <input type="text" id="searchInput" value="${localState.searchQuery}" placeholder="Pesquisar..." class="w-full pl-8 p-1.5 bg-white border border-gray-200 shadow-sm rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all">
                    </div>
                    <button id="toggle-filter-btn" class="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition shadow-sm flex items-center gap-1.5 text-xs flex-shrink-0 ${localState.isAdvancedFilterOpen ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : ''}">
                        <i class="bi bi-funnel"></i> Filtros
                    </button>
                </div>
            </div>

            <div id="filter-panel" class="${localState.isAdvancedFilterOpen ? 'block' : 'hidden'} mb-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
                    
                    ${localState.establishments.length > 1 ? `
                    <div class="md:col-span-4 mb-1">
                        <label class="block text-[9px] font-bold text-gray-400 mb-1.5 uppercase tracking-widest">Filtrar por Unidades (Multi-Seleção)</label>
                        <div class="flex flex-wrap gap-2" id="establishment-filters-container">
                            ${estCheckboxes}
                        </div>
                    </div>
                    ` : ''}
                    
                    <div>
                        <label class="block text-[9px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Data Inicial</label>
                        <input type="date" id="filterStartDate" value="${localState.startDate}" class="w-full p-2 border border-gray-200 rounded-lg text-xs bg-gray-50 focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none">
                    </div>
                    <div>
                        <label class="block text-[9px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Data Final</label>
                        <input type="date" id="filterEndDate" value="${localState.endDate}" class="w-full p-2 border border-gray-200 rounded-lg text-xs bg-gray-50 focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none">
                    </div>
                    
                    <div>
                        <label class="block text-[9px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Plano de Naturezas</label>
                        <select id="filterNaturezaId" class="w-full p-2 border border-gray-200 rounded-lg text-xs bg-gray-50 focus:bg-white outline-none focus:ring-1 focus:ring-indigo-500">
                            <option value="all">Todas as naturezas</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-[9px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Centro de Custo</label>
                        <select id="filterCostCenterId" class="w-full p-2 border border-gray-200 rounded-lg text-xs bg-gray-50 focus:bg-white outline-none focus:ring-1 focus:ring-indigo-500">
                            <option value="all">Todos os centros</option>
                        </select>
                    </div>

                    <div class="md:col-span-4 mt-1 flex flex-col md:flex-row justify-between items-center pt-3 border-t border-gray-100 gap-3">
                        <div class="flex gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-1 md:pb-0">
                            <span class="text-[9px] font-bold text-gray-400 uppercase tracking-widest py-1.5 mr-1">Atalhos:</span>
                            <button class="date-preset-btn px-2.5 py-1 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded-md whitespace-nowrap hover:bg-gray-50 transition shadow-sm" data-preset="month">Este Mês</button>
                            <button class="date-preset-btn px-2.5 py-1 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded-md whitespace-nowrap hover:bg-gray-50 transition shadow-sm" data-preset="last_month">Mês Passado</button>
                            <button class="date-preset-btn px-2.5 py-1 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded-md whitespace-nowrap hover:bg-gray-50 transition shadow-sm" data-preset="year">Este Ano</button>
                        </div>

                        <div class="flex gap-2 w-full md:w-auto">
                            <button id="clear-filters-btn" class="w-full md:w-auto px-4 py-1.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors text-xs">Limpar</button>
                            <button id="apply-filter-btn" class="w-full md:w-auto px-5 py-1.5 bg-indigo-600 text-white font-bold rounded-lg shadow-sm hover:bg-indigo-700 active:scale-95 transition-all text-xs">
                                Aplicar Filtros
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex-1 flex flex-col min-h-0 w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                
                <div class="hidden md:grid grid-cols-12 gap-2 px-3 py-2 text-[9px] font-bold text-gray-500 uppercase tracking-widest items-center bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                    <div class="col-span-1 flex justify-center">
                        <input type="checkbox" id="select-all-toggle" class="w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer">
                    </div>
                    <div class="col-span-1 cursor-pointer hover:text-indigo-700 transition-colors sort-header flex items-center" data-sort="dueDate">
                        Venc. <i class="bi bi-arrow-down-up ml-1 opacity-40 text-xs"></i>
                    </div>
                    <div class="col-span-3 cursor-pointer hover:text-indigo-700 transition-colors sort-header flex items-center" data-sort="description">
                        Descrição / NFS <i class="bi bi-arrow-down-up ml-1 opacity-40 text-xs"></i>
                    </div>
                    <div class="col-span-2 cursor-pointer hover:text-indigo-700 transition-colors sort-header flex items-center" data-sort="naturezaId">
                        Natureza / Centro
                    </div>
                    <div class="col-span-1 cursor-pointer hover:text-indigo-700 transition-colors sort-header flex items-center" data-sort="origin">
                        Origem
                    </div>
                    <div class="col-span-1 text-center cursor-pointer hover:text-indigo-700 transition-colors sort-header flex items-center justify-center" data-sort="status">
                        Status <i class="bi bi-arrow-down-up ml-1 opacity-40 text-xs"></i>
                    </div>
                    <div class="col-span-2 text-right cursor-pointer hover:text-indigo-700 transition-colors sort-header flex items-center justify-end" data-sort="amount">
                        Valor (R$) <i class="bi bi-arrow-down-up ml-1 opacity-40 text-xs"></i>
                    </div>
                    <div class="col-span-1 text-center">Ações</div>
                </div>

                <div id="list-container" class="flex-1 overflow-y-auto custom-scrollbar pb-24 md:pb-2">
                    <div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-gray-500 font-medium text-xs">Carregando dados financeiros...</p></div>
                </div>
            </div>

            <button id="fab-add" class="md:hidden fixed bottom-20 right-4 w-12 h-12 ${localState.currentTab === 'receivables' ? 'bg-emerald-600' : 'bg-red-600'} text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40">
                <i class="bi bi-plus-lg text-xl"></i>
            </button>

        </section>
    `;

    document.querySelector('.date-preset-btn[data-preset="month"]').classList.add('bg-indigo-50', 'text-indigo-700', 'border-indigo-200');
    document.querySelector('.date-preset-btn[data-preset="month"]').classList.remove('bg-white', 'text-gray-600', 'border-gray-200');
    populateFilterSelects();
}

function handleExportExcel() {
    const isReceivable = localState.currentTab === 'receivables';
    const rawList = isReceivable ? localState.receivables : localState.payables;
    
    let filteredList = rawList;
    if (localState.statusFilter !== 'all') {
        filteredList = rawList.filter(item => {
            const isItemOverdue = isOverdue(item.dueDate, item.status);
            if (localState.statusFilter === 'overdue') return isItemOverdue;
            if (localState.statusFilter === 'pending') return item.status === 'pending' && !isItemOverdue;
            return item.status === localState.statusFilter;
        });
    }

    if (localState.searchQuery) {
        filteredList = filteredList.filter(i => 
            (i.description && i.description.toLowerCase().includes(localState.searchQuery)) ||
            (i.entity && i.entity.toLowerCase().includes(localState.searchQuery)) ||
            (i.notes && i.notes.toLowerCase().includes(localState.searchQuery))
        );
    }

    filteredList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    if (filteredList.length === 0) {
        showNotification('Aviso', 'Não há dados para exportar com os filtros atuais.', 'info');
        return;
    }

    const natureMap = new Map(localState.natures.map(n => [n.id, n.name]));
    const costCenterMap = new Map(localState.costCenters.map(c => [c.id, c.name]));
    const estMap = new Map(localState.establishments.map(e => [e.id, e]));

    const exportData = filteredList.map(item => {
        const isPaid = item.status === 'paid';
        const isOverdueItem = isOverdue(item.dueDate, item.status);
        let statusStr = isPaid ? 'Baixado' : (isOverdueItem ? 'Atrasado' : 'A Vencer / Pendente');
        
        const natureName = item.naturezaId ? natureMap.get(item.naturezaId) || 'Não Categorizado' : 'Geral';
        const ccName = item.centroDeCustoId ? costCenterMap.get(item.centroDeCustoId) || 'Não Categorizado' : 'Geral';
        
        const estObj = estMap.get(item.establishmentId);
        const estName = estObj ? estObj.name : 'Atual';

        const originStr = (item.saleId || item.appointmentId || item.origin === 'comanda') ? 'Comanda / PDV' : (item.origin === 'commission' ? 'Comissões' : 'Manual');

        return {
            "Data de Vencimento": new Date(item.dueDate).toLocaleDateString('pt-BR'),
            "Data de Pagamento": item.paymentDate ? new Date(item.paymentDate).toLocaleDateString('pt-BR') : '-',
            "Descrição": item.description || '',
            "Favorecido / Pagador": item.entity || '',
            "Unidade": estName,
            "Natureza": natureName,
            "Centro de Custo": ccName,
            "Origem": originStr,
            "Documento / NFS": item.documentNumber || '',
            "Status": statusStr,
            "Valor (R$)": item.amount
        };
    });

    try {
        if(typeof XLSX === 'undefined') {
            showNotification('Erro', 'A biblioteca de exportação (XLSX) não foi carregada no sistema.', 'error');
            return;
        }
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Financeiro");
        
        const prefix = isReceivable ? "Receitas" : "Despesas";
        const fileName = `Fluxo_${prefix}_${new Date().toISOString().split('T')[0]}.xlsx`;
        
        XLSX.writeFile(workbook, fileName);
    } catch (error) {
        console.error("Erro ao exportar:", error);
        showNotification('Erro', 'Não foi possível exportar para Excel.', 'error');
    }
}

function setupEventListeners() {
    
    const selectAllToggle = document.getElementById('select-all-toggle');
    if (selectAllToggle) {
        selectAllToggle.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            const allCheckboxes = document.querySelectorAll('.item-checkbox');
            localState.selectedIds.clear();
            allCheckboxes.forEach(cb => {
                cb.checked = isChecked;
                if(isChecked) localState.selectedIds.add(cb.dataset.id);
            });
            updateBatchActionBar();
        });
    }

    document.getElementById('cancel-selection-btn').addEventListener('click', () => {
        localState.selectedIds.clear();
        if(document.getElementById('select-all-toggle')) document.getElementById('select-all-toggle').checked = false;
        document.querySelectorAll('.item-checkbox').forEach(cb => cb.checked = false);
        updateBatchActionBar();
    });

    document.getElementById('batch-delete-btn').addEventListener('click', async () => {
        const count = localState.selectedIds.size;
        if(count === 0) return;

        const confirmed = await showConfirmation('Excluir Lançamentos', `Deseja realmente apagar ${count} registros financeiros?`);
        if(confirmed) {
            try {
                const type = localState.currentTab === 'payables' ? 'payables' : 'receivables';
                await financialApi.deleteBatch(type, Array.from(localState.selectedIds));
                showNotification('Sucesso', `${count} itens excluídos.`, 'success');
                localState.selectedIds.clear();
                updateBatchActionBar();
                fetchAndDisplayData();
            } catch (error) {
                showNotification('Erro', 'Falha ao excluir itens.', 'error');
            }
        }
    });

    document.querySelectorAll('.est-filter-checkbox').forEach(cb => {
        cb.addEventListener('change', (e) => {
            const label = e.target.closest('label');
            if (e.target.checked) {
                localState.filterEstablishmentIds.add(e.target.value);
                label.classList.add('border-indigo-500', 'ring-1', 'ring-indigo-500', 'bg-indigo-50/20', 'text-indigo-700');
                label.classList.remove('border-gray-200', 'text-gray-600');
            } else {
                localState.filterEstablishmentIds.delete(e.target.value);
                label.classList.remove('border-indigo-500', 'ring-1', 'ring-indigo-500', 'bg-indigo-50/20', 'text-indigo-700');
                label.classList.add('border-gray-200', 'text-gray-600');
            }
        });
    });

    document.querySelectorAll('.sort-header').forEach(header => {
        header.addEventListener('click', (e) => {
            const col = e.currentTarget.dataset.sort;
            if (localState.sortCol === col) {
                localState.sortAsc = !localState.sortAsc; 
            } else {
                localState.sortCol = col;
                localState.sortAsc = true; 
            }
            renderLists(); 
        });
    });

    document.getElementById('toggle-filter-btn').addEventListener('click', () => {
        const panel = document.getElementById('filter-panel');
        const btn = document.getElementById('toggle-filter-btn');
        localState.isAdvancedFilterOpen = !localState.isAdvancedFilterOpen;
        
        if (localState.isAdvancedFilterOpen) {
            panel.classList.remove('hidden');
            btn.classList.add('bg-indigo-50', 'text-indigo-700', 'border-indigo-200');
            btn.classList.remove('bg-white', 'text-gray-600', 'border-gray-200');
        } else {
            panel.classList.add('hidden');
            btn.classList.remove('bg-indigo-50', 'text-indigo-700', 'border-indigo-200');
            btn.classList.add('bg-white', 'text-gray-600', 'border-gray-200');
        }
    });

    document.getElementById('settings-btn').addEventListener('click', openSettingsModal);
    
    const exportBtn = document.getElementById('export-excel-btn');
    if(exportBtn) exportBtn.addEventListener('click', handleExportExcel);

    document.querySelectorAll('[data-action="new-financial"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            openFinancialModal(e.target.closest('button').dataset.type);
        });
    });

    document.getElementById('fab-add').addEventListener('click', () => {
        const type = localState.currentTab === 'payables' ? 'payable' : 'receivable';
        openFinancialModal(type);
    });

    const tabRec = document.getElementById('tab-receivables');
    const tabPay = document.getElementById('tab-payables');

    tabRec.addEventListener('click', () => switchTab('receivables'));
    tabPay.addEventListener('click', () => switchTab('payables'));

    document.querySelectorAll('.status-filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.status-filter-btn').forEach(b => {
                b.classList.remove('bg-indigo-50', 'text-indigo-700', 'border-indigo-200', 'bg-red-50', 'text-red-700', 'border-red-200');
                b.classList.add('bg-white', 'text-gray-600');
            });
            
            if (e.target.dataset.status === 'overdue') {
                e.target.classList.add('bg-red-50', 'text-red-700', 'border-red-200');
            } else {
                e.target.classList.add('bg-indigo-50', 'text-indigo-700', 'border-indigo-200');
            }
            e.target.classList.remove('bg-white', 'text-gray-600');
            
            localState.statusFilter = e.target.dataset.status;
            renderLists(); 
            renderSummary(); 
        });
    });

    document.querySelectorAll('.date-preset-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.date-preset-btn').forEach(b => {
                b.classList.remove('bg-indigo-50', 'text-indigo-700', 'border-indigo-200');
                b.classList.add('bg-white', 'text-gray-600', 'border-gray-200');
            });
            e.target.classList.add('bg-indigo-50', 'text-indigo-700', 'border-indigo-200');
            e.target.classList.remove('bg-white', 'text-gray-600', 'border-gray-200');

            const preset = e.target.dataset.preset;
            const now = new Date();
            let start, end;

            if (preset === 'month') {
                start = new Date(now.getFullYear(), now.getMonth(), 1);
                end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            } else if (preset === 'last_month') {
                start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                end = new Date(now.getFullYear(), now.getMonth(), 0);
            } else if (preset === 'year') {
                start = new Date(now.getFullYear(), 0, 1);
                end = new Date(now.getFullYear(), 11, 31);
            }

            document.getElementById('filterStartDate').value = start.toISOString().split('T')[0];
            document.getElementById('filterEndDate').value = end.toISOString().split('T')[0];
            
            document.getElementById('apply-filter-btn').click();
        });
    });

    document.getElementById('searchInput').addEventListener('input', (e) => {
        localState.searchQuery = e.target.value.toLowerCase();
        renderLists(); 
    });

    document.getElementById('clear-filters-btn').addEventListener('click', () => {
        const now = new Date();
        document.getElementById('filterStartDate').value = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
        document.getElementById('filterEndDate').value = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
        document.getElementById('filterNaturezaId').value = 'all';
        document.getElementById('filterCostCenterId').value = 'all';
        
        localState.filterEstablishmentIds.clear();
        localState.filterEstablishmentIds.add(state.establishmentId);
        
        renderBaseLayout();
        setupEventListeners();
    });

    document.getElementById('apply-filter-btn').addEventListener('click', () => {
        localState.startDate = document.getElementById('filterStartDate').value;
        localState.endDate = document.getElementById('filterEndDate').value;
        localState.filterNaturezaId = document.getElementById('filterNaturezaId').value;
        localState.filterCostCenterId = document.getElementById('filterCostCenterId').value;
        
        if (localState.filterEstablishmentIds.size === 0) {
            localState.filterEstablishmentIds.add(state.establishmentId);
        }
        
        document.getElementById('toggle-filter-btn').click(); 
        fetchAndDisplayData();
    });

    if (financialPageEventListener) document.body.removeEventListener('click', financialPageEventListener);
    
    financialPageEventListener = (e) => {
        const target = e.target;
        
        if (target.classList.contains('item-checkbox') || target.classList.contains('modal-item-checkbox')) {
            const id = target.value || target.dataset.id;
            if(target.checked) localState.selectedIds.add(id);
            else localState.selectedIds.delete(id);
            updateBatchActionBar();
            e.stopPropagation();
            return;
        }

        const actionButton = target.closest('button[data-action]');
        if (actionButton) {
            const { action, type, id } = actionButton.dataset;
            e.stopPropagation();

            if (action === 'delete') {
                const itemStr = actionButton.closest('.financial-row').dataset.item.replace(/&apos;/g, "'");
                handleSmartDelete(type, JSON.parse(itemStr));
                return;
            }
            if (action === 'mark-as-paid') {
                handleMarkAsPaid(type, id);
                return;
            }
            if (action === 'manage-natures') { openHierarchyModal('nature'); return; }
            if (action === 'manage-cost-centers') { openHierarchyModal('cost-center'); return; }
        }

        const rowItem = target.closest('.financial-row');
        if (rowItem && document.getElementById('list-container').contains(rowItem)) {
            if (!target.closest('button') && !target.closest('.item-checkbox')) {
                const { type } = rowItem.dataset;
                const itemData = JSON.parse(rowItem.dataset.item.replace(/&apos;/g, "'"));
                openFinancialModal(type, itemData);
            }
        }
    };
    document.body.addEventListener('click', financialPageEventListener);

    if (genericModalEventListener) document.getElementById('genericModal').removeEventListener('click', genericModalEventListener);
    genericModalEventListener = (e) => {
        const closeBtn = e.target.closest('[data-action="close-modal"]');
        if (closeBtn) { document.getElementById('genericModal').style.display = 'none'; return; }

        const deleteBtn = e.target.closest('button[data-action^="delete-"]');
        if (deleteBtn) {
            const type = deleteBtn.dataset.action.split('-')[1];
            handleDeleteHierarchyItem(type, deleteBtn.dataset.id);
        }
    };
    document.getElementById('genericModal').addEventListener('click', genericModalEventListener);
}

function updateBatchActionBar() {
    const bar = document.getElementById('batch-action-bar');
    const countSpan = document.getElementById('selected-count');
    const fab = document.getElementById('fab-add');
    const count = localState.selectedIds.size;

    countSpan.textContent = count;

    if (count > 0) {
        bar.classList.remove('hidden');
        bar.classList.add('flex');
        if(fab) fab.classList.add('hidden'); 
    } else {
        bar.classList.add('hidden');
        bar.classList.remove('flex');
        if(fab) fab.classList.remove('hidden');
    }
}

function switchTab(tab) {
    localState.currentTab = tab;
    localState.selectedIds.clear();
    updateBatchActionBar();
    if(document.getElementById('select-all-toggle')) document.getElementById('select-all-toggle').checked = false;
    
    const tabRec = document.getElementById('tab-receivables');
    const tabPay = document.getElementById('tab-payables');
    const fab = document.getElementById('fab-add');

    if (tab === 'receivables') {
        tabRec.classList.add('bg-white', 'text-emerald-700', 'shadow');
        tabRec.classList.remove('text-gray-600');
        tabPay.classList.remove('bg-white', 'text-red-700', 'shadow');
        tabPay.classList.add('text-gray-600');
        if(fab) fab.className = "md:hidden fixed bottom-20 right-4 w-12 h-12 bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40";
    } else {
        tabPay.classList.add('bg-white', 'text-red-700', 'shadow');
        tabPay.classList.remove('text-gray-600');
        tabRec.classList.remove('bg-white', 'text-emerald-700', 'shadow');
        tabRec.classList.add('text-gray-600');
        if(fab) fab.className = "md:hidden fixed bottom-20 right-4 w-12 h-12 bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40";
    }

    renderLists();
}

// ============================================================================
// 📡 COMUNICAÇÃO DE DADOS
// ============================================================================

async function fetchAndDisplayData() {
    const listContainer = document.getElementById('list-container');
    listContainer.innerHTML = '<div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-gray-500 font-medium text-xs">A processar transações...</p></div>';

    try {
        if (localState.natures.length === 0) {
            const [natures, costCenters, supps, clis, profs] = await Promise.all([
                financialApi.getNatures(state.establishmentId),
                financialApi.getCostCenters(state.establishmentId),
                suppliersApi.getAll(state.establishmentId).catch(() => []),
                clientsApi.getClients(state.establishmentId, '', 1000).catch(() => []),
                professionalsApi.getProfessionals(state.establishmentId).catch(() => [])
            ]);
            localState.natures = natures || [];
            localState.costCenters = costCenters || [];
            localState.suppliers = supps || [];
            localState.clients = clis || [];
            localState.professionals = profs || [];
            populateFilterSelects();
        }

        const selectedEstsString = Array.from(localState.filterEstablishmentIds).join(',');

        const filters = { 
            startDate: localState.startDate, 
            endDate: localState.endDate, 
            establishmentId: selectedEstsString 
        };
        
        if (localState.filterNaturezaId !== 'all') filters.natureId = localState.filterNaturezaId;
        if (localState.filterCostCenterId !== 'all') filters.costCenterId = localState.filterCostCenterId;

        const [payablesResult, receivablesResult] = await Promise.all([
            financialApi.getPayables(filters),
            financialApi.getReceivables(filters)
        ]);

        localState.payables = payablesResult.entries || [];
        localState.receivables = receivablesResult.entries || [];

        renderSummary();
        renderLists();

    } catch (error) {
        listContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center py-16">
                <i class="bi bi-exclamation-octagon text-3xl text-red-400 mb-2"></i>
                <p class="text-gray-600 text-xs font-medium">Erro ao carregar dados: ${error.message}</p>
            </div>`;
    }
}

function populateFilterSelects() {
    const buildOptions = (items) => {
        let optionsHTML = '<option value="all">-- Todas as opções --</option>';
        const hierarchy = buildHierarchy(items);
        const renderOption = (item, level = 0) => {
            const prefix = '\u00A0\u00A0'.repeat(level) + (level > 0 ? '↳ ' : '');
            optionsHTML += `<option value="${item.id}">${prefix}${item.name}</option>`;
            item.children.forEach(child => renderOption(child, level + 1));
        };
        hierarchy.forEach(root => renderOption(root));
        return optionsHTML;
    };

    const natSelect = document.getElementById('filterNaturezaId');
    const ccSelect = document.getElementById('filterCostCenterId');
    if (natSelect) natSelect.innerHTML = buildOptions(localState.natures);
    if (ccSelect) ccSelect.innerHTML = buildOptions(localState.costCenters);
}

// ============================================================================
// 📈 RENDERIZAÇÃO DA TABELA / LISTA E KPIS
// ============================================================================

function renderSummary() {
    const section = document.getElementById('summary-section');
    if (!section) return;

    const isRec = localState.currentTab === 'receivables';
    const activeList = isRec ? localState.receivables : localState.payables;
    
    let filteredList = activeList;
    if (localState.searchQuery) {
        filteredList = filteredList.filter(i => 
            (i.description && i.description.toLowerCase().includes(localState.searchQuery)) ||
            (i.entity && i.entity.toLowerCase().includes(localState.searchQuery)) ||
            (i.notes && i.notes.toLowerCase().includes(localState.searchQuery))
        );
    }

    const total = filteredList.reduce((acc, i) => acc + i.amount, 0);
    const paid = filteredList.filter(i => i.status === 'paid').reduce((acc, i) => acc + i.amount, 0);
    const pending = filteredList.filter(i => i.status === 'pending' && !isOverdue(i.dueDate, i.status)).reduce((acc, i) => acc + i.amount, 0);
    const overdue = filteredList.filter(i => isOverdue(i.dueDate, i.status)).reduce((acc, i) => acc + i.amount, 0);

    const themeColor = isRec ? 'emerald' : 'red';
    const titleBase = isRec ? 'Receitas' : 'Despesas';

    section.innerHTML = `
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total do Período</span>
            <span class="text-xl font-black text-gray-800 mt-0.5">${formatCurrency(total)}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">A Vencer / Prov.</span>
            <span class="text-xl font-bold text-blue-600 mt-0.5">${formatCurrency(pending)}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">${titleBase} Baixadas</span>
            <span class="text-xl font-bold text-${themeColor}-600 mt-0.5">${formatCurrency(paid)}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Atrasadas</span>
            <span class="text-xl font-bold ${overdue > 0 ? 'text-red-600' : 'text-gray-400'} mt-0.5">${formatCurrency(overdue)}</span>
        </div>
    `;
}

function updateSortIcons() {
    document.querySelectorAll('.sort-header').forEach(header => {
        const icon = header.querySelector('i');
        if(!icon) return;
        
        const col = header.dataset.sort;
        if (col === localState.sortCol) {
            header.classList.add('text-indigo-700');
            header.classList.remove('text-gray-500');
            icon.className = localState.sortAsc ? 'bi bi-arrow-up ml-1 text-indigo-600' : 'bi bi-arrow-down ml-1 text-indigo-600';
        } else {
            header.classList.remove('text-indigo-700');
            header.classList.add('text-gray-500');
            icon.className = 'bi bi-arrow-down-up ml-1 opacity-30 text-[10px]';
        }
    });
}

function renderLists() {
    const container = document.getElementById('list-container');
    if (!container) return;

    const isReceivable = localState.currentTab === 'receivables';
    const rawList = isReceivable ? localState.receivables : localState.payables;
    
    let filteredList = rawList;
    if (localState.statusFilter !== 'all') {
        filteredList = rawList.filter(item => {
            const isItemOverdue = isOverdue(item.dueDate, item.status);
            if (localState.statusFilter === 'overdue') return isItemOverdue;
            if (localState.statusFilter === 'pending') return item.status === 'pending' && !isItemOverdue;
            return item.status === localState.statusFilter;
        });
    }

    if (localState.searchQuery) {
        filteredList = filteredList.filter(i => 
            (i.description && i.description.toLowerCase().includes(localState.searchQuery)) ||
            (i.entity && i.entity.toLowerCase().includes(localState.searchQuery)) ||
            (i.notes && i.notes.toLowerCase().includes(localState.searchQuery))
        );
    }

    filteredList.sort((a, b) => {
        let valA = a[localState.sortCol];
        let valB = b[localState.sortCol];

        if (localState.sortCol === 'dueDate') {
            valA = new Date(valA).getTime();
            valB = new Date(valB).getTime();
        } else if (localState.sortCol === 'description' || localState.sortCol === 'status') {
            valA = valA ? valA.toLowerCase() : '';
            valB = valB ? valB.toLowerCase() : '';
        }

        if (valA < valB) return localState.sortAsc ? -1 : 1;
        if (valA > valB) return localState.sortAsc ? 1 : -1;
        return 0;
    });

    updateSortIcons();

    if (filteredList.length === 0) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center py-16">
                <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-inbox text-xl text-gray-300"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-600 mb-1">Nenhum registo encontrado</h3>
                <p class="text-[10px] text-gray-400">Tente limpar os filtros ou faça um novo lançamento.</p>
            </div>
        `;
        return;
    }

    const natureMap = new Map(localState.natures.map(n => [n.id, n.name]));
    const costCenterMap = new Map(localState.costCenters.map(c => [c.id, c.name]));
    const estMap = new Map(localState.establishments.map(e => [e.id, e]));

    const typeStr = isReceivable ? 'receivable' : 'payable';
    const amountColor = isReceivable ? 'text-emerald-600' : 'text-red-600';

    container.innerHTML = filteredList.map(item => {
        const dateObj = formatDateDisplay(item.dueDate);
        const isPaid = item.status === 'paid';
        const itemOverdue = isOverdue(item.dueDate, item.status);
        
        let statusBadge = '';
        if (isPaid) statusBadge = '<span class="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest"><i class="bi bi-check2-circle mr-0.5"></i> Baixado</span>';
        else if (itemOverdue) statusBadge = '<span class="bg-red-50 text-red-600 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest"><i class="bi bi-exclamation-circle mr-0.5"></i> Atrasado</span>';
        else statusBadge = '<span class="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest"><i class="bi bi-clock-history mr-0.5"></i> A Vencer</span>';

        const natureName = item.naturezaId ? natureMap.get(item.naturezaId) || 'Sem Natureza' : 'Não Categorizado';
        const ccName = item.centroDeCustoId ? costCenterMap.get(item.centroDeCustoId) || 'Sem Centro' : 'Geral';
        
        const isFromSystem = item.saleId || item.appointmentId || item.origin === 'comanda';
        const originLabel = isFromSystem 
            ? '<span class="text-[8px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-100"><i class="bi bi-receipt mr-1"></i>Comanda</span>' 
            : (item.origin === 'commission' ? '<span class="text-[8px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100"><i class="bi bi-cash-stack mr-1"></i>Comissões</span>' : '<span class="text-[8px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200"><i class="bi bi-keyboard mr-1"></i>Manual</span>');

        const docNfs = item.documentNumber 
            ? `<span class="text-[8px] bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded ml-2" title="NFS / Documento">NFS: ${item.documentNumber}</span>` 
            : '';

        const estObj = estMap.get(item.establishmentId);
        let estBadge = '';
        if (estObj) {
            const estIcon = estObj.type === 'Matriz' ? 'bi-building' : 'bi-shop';
            estBadge = `<span class="text-[8px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-bold border border-slate-200 flex items-center whitespace-nowrap w-max" title="Unidade: ${estObj.name}"><i class="bi ${estIcon} mr-1 opacity-60"></i> ${estObj.name}</span>`;
        } else {
            estBadge = `<span class="text-[8px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-bold border border-gray-200 flex items-center whitespace-nowrap w-max"><i class="bi bi-geo-alt mr-1 opacity-60"></i> Atual</span>`;
        }

        const itemDataStr = JSON.stringify(item).replace(/'/g, "&apos;");
        const isSelected = localState.selectedIds.has(item.id);
        const isRecurring = !!item.recurrenceId;
        const recurringIcon = isRecurring ? `<i class="bi bi-arrow-repeat text-indigo-400 ml-1 text-[10px]" title="Lançamento Recorrente"></i>` : '';

        const entityLabel = item.entity ? `<span class="text-[9px] text-gray-400 font-medium truncate block mt-0.5"><i class="bi bi-person mr-1 opacity-40"></i>${item.entity}</span>` : '';

        return `
        <div class="financial-row border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer relative group flex flex-col md:grid md:grid-cols-12 md:gap-2 md:items-center p-1.5 md:p-2 mb-1 ${isSelected ? 'bg-indigo-50/40' : ''}"
             data-type="${typeStr}"
             data-item='${itemDataStr}'>
            
            <div class="absolute left-0 top-0 bottom-0 w-1 ${isPaid ? 'bg-gray-200' : (isReceivable ? 'bg-emerald-400' : 'bg-red-400')}"></div>

            <div class="absolute right-2 top-2 md:relative md:right-auto md:top-auto md:col-span-1 md:flex md:justify-center z-10">
                <input type="checkbox" value="${item.id}" class="item-checkbox w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${isSelected ? 'checked' : ''}>
            </div>

            <div class="flex items-center gap-2 md:col-span-1 pl-2 md:pl-0">
                <div class="flex flex-col items-center justify-center bg-white border border-gray-200 rounded w-9 h-9 flex-shrink-0 shadow-sm">
                    <span class="text-xs font-black text-gray-800 leading-none">${dateObj.day}</span>
                    <span class="text-[7px] font-bold text-gray-400 uppercase leading-none mt-0.5">${dateObj.month}</span>
                </div>
                <div class="md:hidden flex-1 pr-6">
                    <div class="flex items-center">
                        <p class="font-bold text-xs text-gray-800 leading-tight ${isPaid ? 'line-through text-gray-400' : ''}">${item.description}</p>
                        ${docNfs}
                    </div>
                    ${entityLabel}
                </div>
            </div>

            <div class="md:col-span-3 hidden md:flex flex-col justify-center min-w-0">
                <div class="flex items-center">
                    <p class="font-bold text-xs text-gray-800 truncate ${isPaid ? 'line-through text-gray-400' : ''}" title="${item.description}">${item.description}</p>
                    ${docNfs}
                </div>
                ${entityLabel}
                <div class="flex items-center gap-1.5 mt-0.5">
                    ${estBadge}
                    ${recurringIcon}
                </div>
            </div>

            <div class="md:col-span-2 hidden md:flex flex-col justify-center min-w-0">
                <p class="text-[9px] text-gray-600 font-bold truncate" title="Natureza: ${natureName}"><i class="bi bi-tag opacity-50 mr-1"></i> ${natureName}</p>
                <p class="text-[9px] text-gray-400 truncate mt-0.5" title="Centro: ${ccName}"><i class="bi bi-diagram-3 opacity-50 mr-1"></i> ${ccName}</p>
            </div>

            <div class="md:col-span-1 hidden md:flex items-center">
                ${originLabel}
            </div>

            <div class="md:hidden flex flex-wrap items-center gap-1.5 mt-1 ml-11">
                ${estBadge}
                <span class="text-[8px] px-1.5 py-0.5 rounded bg-gray-50 text-gray-500 font-bold border border-gray-200 flex items-center">
                    <i class="bi bi-tag mr-1 opacity-50"></i> ${natureName}
                </span>
                ${originLabel}
            </div>

            <div class="md:col-span-1 md:text-center flex justify-start md:justify-center mt-1.5 md:mt-0 ml-11 md:ml-0">
                ${statusBadge}
            </div>

            <div class="md:col-span-2 md:text-right flex items-center justify-between md:justify-end mt-1.5 md:mt-0 ml-11 md:ml-0">
                <span class="md:hidden text-[9px] font-bold text-gray-400 uppercase tracking-wide">Valor:</span>
                <p class="font-black text-sm ${isPaid ? 'text-gray-400' : amountColor}">${formatCurrency(item.amount)}</p>
            </div>

            <div class="absolute right-1 bottom-1 md:relative md:right-auto md:bottom-auto md:col-span-1 md:flex md:justify-center z-10 flex gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-white/90 md:bg-transparent rounded px-1">
                ${!isPaid ? `
                    <button data-action="mark-as-paid" data-type="${typeStr}" data-id="${item.id}" class="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors" title="Dar Baixa">
                        <i class="bi bi-check2-all text-sm"></i>
                    </button>
                ` : ''}
                <button data-action="delete" data-type="${typeStr}" data-id="${item.id}" class="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Excluir">
                    <i class="bi bi-trash3 text-[10px]"></i>
                </button>
            </div>
        </div>
        `;
    }).join('');
}

// ============================================================================
// ⚙️ AÇÕES CRUD E MODAIS
// ============================================================================

async function handleMarkAsPaid(type, id) {
    const today = new Date().toISOString().split('T')[0];
    try {
        await (type === 'payable' ? financialApi.markAsPaidPayable(id, today) : financialApi.markAsPaidReceivable(id, today));
        showNotification('Baixa Realizada', 'O lançamento foi registado como pago.', 'success');
        await fetchAndDisplayData();
    } catch (error) {
        showNotification('Erro', error.message, 'error');
    }
}

async function handleSmartDelete(type, item) {
    const isRecurring = !!item.recurrenceId;

    if (!isRecurring) {
        const confirmed = await showConfirmation('Excluir Lançamento', 'Tem certeza? Essa ação apagará o registo do seu fluxo de caixa.');
        if (confirmed) await executeDelete(type, [item.id]);
        return;
    }

    openRecurrenceDeleteModal(type, item);
}

function openRecurrenceDeleteModal(type, currentItem) {
    const modal = document.getElementById('genericModal');
    const list = type === 'payable' ? localState.payables : localState.receivables;
    
    const relatedItems = list.filter(i => i.recurrenceId === currentItem.recurrenceId).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    modal.innerHTML = `
        <div class="modal-content max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div class="bg-red-50 px-6 py-4 border-b border-red-100 flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <div class="p-2 bg-white rounded-lg text-red-600 shadow-sm border border-red-100">
                        <i class="bi bi-trash3 text-lg"></i>
                    </div>
                    <div>
                        <h2 class="text-lg font-bold text-gray-800 leading-tight">Exclusão em Lote</h2>
                        <p class="text-xs text-red-600 font-medium">Este lançamento possui parcelas conectadas.</p>
                    </div>
                </div>
                <button type="button" data-action="close-modal" class="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
            </div>
            
            <div class="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <span class="text-xs text-gray-600 font-bold uppercase tracking-wider">Selecione as parcelas:</span>
                <label class="flex items-center gap-2 cursor-pointer text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                    <input type="checkbox" id="modal-select-all" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                    Marcar Todos
                </label>
            </div>

            <div class="overflow-y-auto p-3 space-y-2 custom-scrollbar flex-1 bg-white">
                ${relatedItems.map(item => {
                    const isCurrent = item.id === currentItem.id;
                    const isPaid = item.status === 'paid';
                    const dateObj = formatDateDisplay(item.dueDate);
                    
                    return `
                    <label class="flex items-center gap-4 p-3 bg-white rounded-xl border ${isCurrent ? 'border-red-400 ring-1 ring-red-100 shadow-sm bg-red-50/30' : 'border-gray-200 hover:bg-gray-50'} cursor-pointer transition-all">
                        <input type="checkbox" class="modal-item-checkbox w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500" value="${item.id}" ${isCurrent ? 'checked' : ''}>
                        
                        <div class="flex-shrink-0 w-11 h-11 bg-white rounded-lg flex flex-col items-center justify-center border border-gray-200 shadow-sm">
                            <span class="text-sm font-black text-gray-800 leading-none">${dateObj.day}</span>
                            <span class="text-[8px] font-bold text-gray-500 uppercase leading-none mt-1">${dateObj.month}</span>
                        </div>

                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-bold text-gray-800 truncate">${item.description}</p>
                            <p class="text-xs font-medium text-gray-500 mt-0.5">${formatCurrency(item.amount)} ${isPaid ? '<span class="text-emerald-600 font-bold ml-1">(Baixado)</span>' : ''}</p>
                        </div>
                        
                        ${isCurrent ? '<span class="text-[10px] bg-red-600 text-white px-2 py-1 rounded-md font-bold uppercase tracking-wider shadow-sm">Alvo</span>' : ''}
                    </label>
                    `;
                }).join('')}
            </div>

            <div class="p-4 border-t border-gray-200 bg-gray-50">
                <button id="confirm-batch-delete" class="w-full py-3 bg-red-600 text-white font-bold uppercase tracking-wider rounded-xl hover:bg-red-700 shadow-lg active:scale-[0.98] transition-all flex justify-center items-center gap-2">
                    Excluir Selecionados
                </button>
            </div>
        </div>
    `;
    modal.style.display = 'flex';

    const selectAll = modal.querySelector('#modal-select-all');
    const checkboxes = modal.querySelectorAll('.modal-item-checkbox');
    const confirmBtn = modal.querySelector('#confirm-batch-delete');

    selectAll.addEventListener('change', (e) => {
        checkboxes.forEach(cb => cb.checked = e.target.checked);
        updateButtonText();
    });

    checkboxes.forEach(cb => cb.addEventListener('change', updateButtonText));

    function updateButtonText() {
        const count = Array.from(checkboxes).filter(cb => cb.checked).length;
        confirmBtn.innerHTML = count > 0 ? `<i class="bi bi-trash3"></i> Excluir ${count} Parcela(s)` : 'Selecione para excluir';
        confirmBtn.disabled = count === 0;
        if(count === 0) confirmBtn.classList.add('opacity-50', 'cursor-not-allowed', 'bg-gray-400');
        else confirmBtn.classList.remove('opacity-50', 'cursor-not-allowed', 'bg-gray-400');
    }

    confirmBtn.addEventListener('click', async () => {
        const idsToDelete = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
        if (idsToDelete.length === 0) return;
        modal.style.display = 'none'; 
        
        const confirmed = await showConfirmation('Confirmar Ação', `Tem certeza que deseja apagar estas ${idsToDelete.length} parcelas permanentemente?`);
        if (confirmed) await executeDelete(type, idsToDelete);
    });

    updateButtonText(); 
}

async function executeDelete(type, ids) {
    try {
        if(ids.length === 1) {
            type === 'payable' ? await financialApi.deletePayable(ids[0]) : await financialApi.deleteReceivable(ids[0]);
        } else {
            const apiType = type === 'payable' ? 'payables' : 'receivables';
            await financialApi.deleteBatch(apiType, ids);
        }
        showNotification('Sucesso', `${ids.length} registo(s) limpo(s) do sistema.`, 'success');
        localState.selectedIds.clear();
        updateBatchActionBar();
        await fetchAndDisplayData();
    } catch (error) {
        showNotification('Erro', error.message, 'error');
    }
}

async function handleDeleteHierarchyItem(type, id) {
    const isNature = type === 'nature';
    const deleteApi = isNature ? financialApi.deleteNature : financialApi.deleteCostCenter;
    
    const confirmed = await showConfirmation('Apagar Categoria', 'Tem certeza? Apagar um item pai também apagará as suas subcategorias.');
    if(confirmed) {
        try {
            await deleteApi(id);
            openHierarchyModal(type === 'nature' ? 'nature' : 'cost-center');
        } catch(error) {
            showNotification('Erro', error.message, 'error');
        }
    }
}

function openSettingsModal() {
    const modal = document.getElementById('genericModal');
    modal.innerHTML = `
        <div class="modal-content max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
            <div class="p-8 text-center relative">
                <button type="button" data-action="close-modal" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
                    <i class="bi bi-gear-fill text-2xl text-gray-600"></i>
                </div>
                <h2 class="text-xl font-bold text-gray-900 mb-6">Configurações de ERP</h2>
                <div class="space-y-3">
                    <button data-action="manage-natures" class="w-full py-4 px-5 bg-indigo-50 text-indigo-700 font-bold rounded-xl hover:bg-indigo-100 flex items-center justify-between group border border-indigo-100 transition-colors shadow-sm">
                        <span class="flex items-center gap-3"><i class="bi bi-tags-fill"></i> Plano de Naturezas</span>
                        <i class="bi bi-chevron-right text-indigo-400 group-hover:translate-x-1 transition-transform"></i>
                    </button>
                    <button data-action="manage-cost-centers" class="w-full py-4 px-5 bg-blue-50 text-blue-700 font-bold rounded-xl hover:bg-blue-100 flex items-center justify-between group border border-blue-100 transition-colors shadow-sm">
                        <span class="flex items-center gap-3"><i class="bi bi-diagram-3-fill"></i> Centros de Custo</span>
                        <i class="bi bi-chevron-right text-blue-400 group-hover:translate-x-1 transition-transform"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    modal.style.display = 'flex';
}

function openFinancialModal(type, item = null) {
    const modal = document.getElementById('genericModal');
    const isPayable = type === 'payable';
    const themeColor = isPayable ? 'red' : 'emerald';
    const title = item ? `Editar Lançamento` : `Novo Lançamento`;

    const estOptions = localState.establishments.map(est => {
        const isSelected = item 
            ? item.establishmentId === est.id 
            : est.id === state.establishmentId;
        return `<option value="${est.id}" ${isSelected ? 'selected' : ''}>${est.type === 'Matriz' ? '🏢' : '📍'} ${est.name}</option>`;
    }).join('');

    const buildOptions = (items, selectedId) => {
        let html = '<option value="">-- Selecione --</option>';
        const hierarchy = buildHierarchy(items);
        const renderOption = (it, level = 0) => {
            const prefix = '\u00A0\u00A0'.repeat(level) + (level > 0 ? '↳ ' : '');
            const selected = it.id === selectedId ? 'selected' : '';
            html += `<option value="${it.id}" ${selected}>${prefix}${it.name}</option>`;
            it.children.forEach(c => renderOption(c, level + 1));
        };
        hierarchy.forEach(root => renderOption(root));
        return html;
    };

    const paymentMethods = [
        { value: 'dinheiro', label: 'Dinheiro' },
        { value: 'pix', label: 'PIX' },
        { value: 'cartao_credito', label: 'Cartão de Crédito' },
        { value: 'cartao_debito', label: 'Cartão de Débito' },
        { value: 'transferencia', label: 'Transferência Bancária' },
        { value: 'boleto', label: 'Boleto' },
        { value: 'outros', label: 'Outros' }
    ];
    const paymentMethodOptions = paymentMethods.map(pm => 
        `<option value="${pm.value}" ${item?.paymentMethod === pm.value ? 'selected' : ''}>${pm.label}</option>`
    ).join('');

    // Datalist de Fornecedores, Clientes e Profissionais
    const datalistHTML = `
        <datalist id="entity-suggestions">
            ${isPayable 
                ? localState.suppliers.map(s => `<option value="${escapeHTML(s.name)}">Fornecedor</option>`).join('') +
                  localState.professionals.map(p => `<option value="${escapeHTML(p.name)}">Profissional</option>`).join('')
                : localState.clients.map(c => `<option value="${escapeHTML(c.name)} ${c.phone ? '- ' + escapeHTML(c.phone) : ''}">Cliente</option>`).join('')
            }
        </datalist>
    `;

    modal.innerHTML = `
        <div class="modal-content max-w-3xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden m-4 flex flex-col max-h-[90vh]">
            ${datalistHTML}
            <div class="bg-${themeColor}-600 px-5 py-4 flex justify-between items-center flex-shrink-0 relative overflow-hidden">
                <div class="absolute right-0 top-0 opacity-10 pointer-events-none">
                    <svg width="120" height="120" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="40" stroke="white" stroke-width="20"/></svg>
                </div>
                
                <div class="flex items-center gap-3 relative z-10">
                    <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white backdrop-blur-sm border border-white/30 shadow-inner">
                        <i class="bi ${isPayable ? 'bi-arrow-down-right' : 'bi-arrow-up-right'} text-xl"></i>
                    </div>
                    <div>
                        <h2 class="text-lg font-bold text-white tracking-wide">${title}</h2>
                        <p class="text-[10px] text-${themeColor}-100 font-medium uppercase tracking-widest mt-0.5">${isPayable ? 'Despesa' : 'Receita'}</p>
                    </div>
                </div>
                <button type="button" data-action="close-modal" class="relative z-10 text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
                    <i class="bi bi-x-lg text-lg font-bold"></i>
                </button>
            </div>
            
            <form id="financial-form" class="flex-1 overflow-y-auto custom-scrollbar bg-gray-50">
                <div class="p-5 space-y-4">

                    ${!item ? `
                    <div class="bg-white p-1 rounded-lg flex border border-gray-200 shadow-sm" id="mode-switcher">
                        <button type="button" class="mode-btn flex-1 py-1.5 text-xs uppercase tracking-wider font-bold rounded-md shadow-sm bg-gray-900 text-white transition-all" data-mode="single">Único</button>
                        <button type="button" class="mode-btn flex-1 py-1.5 text-xs uppercase tracking-wider font-bold rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all" data-mode="installment">Parcelado</button>
                        <button type="button" class="mode-btn flex-1 py-1.5 text-xs uppercase tracking-wider font-bold rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all" data-mode="repeat">Recorrente</button>
                    </div>
                    ` : ''}

                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
                        
                        <div class="md:col-span-3">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Unidade / Filial</label>
                            <select name="establishmentId" required class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${themeColor}-500 outline-none text-xs font-bold text-gray-800 transition-shadow">
                                ${estOptions}
                            </select>
                        </div>

                        <div class="md:col-span-1">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Valor Total (R$)</label>
                            <div class="relative">
                                <input type="number" step="0.01" name="amount" required 
                                    class="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${themeColor}-500 outline-none font-bold text-sm text-gray-900 transition-shadow" 
                                    value="${item?.amount || ''}" placeholder="0.00">
                            </div>
                        </div>
                        
                        <div class="md:col-span-2">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Data de Vencimento</label>
                            <input type="date" name="dueDate" required 
                                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${themeColor}-500 outline-none font-bold text-gray-800 text-xs transition-shadow" 
                                value="${item?.dueDate || new Date().toISOString().split('T')[0]}">
                        </div>
                    </div>

                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="md:col-span-2">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Descrição / Título</label>
                            <input type="text" name="description" required 
                                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${themeColor}-500 outline-none font-bold text-gray-800 text-xs transition-shadow" 
                                value="${item?.description || ''}" placeholder="Ex: Compra de Estoque...">
                        </div>
                        
                        <div class="md:col-span-2">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">${isPayable ? 'Fornecedor / Favorecido' : 'Cliente / Pagador'}</label>
                            <div class="relative">
                                <i class="bi bi-person absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                                <input type="text" name="entity" list="entity-suggestions" 
                                    class="w-full pl-8 pr-3 p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${themeColor}-500 outline-none text-xs text-gray-800 transition-shadow" 
                                    value="${item?.entity || ''}" placeholder="Nome ou Selecione na lista..." autocomplete="off">
                            </div>
                        </div>
                    </div>

                    <div id="recurrence-options" style="display: none;" class="bg-indigo-50 p-4 rounded-xl border border-indigo-100 shadow-inner">
                        <div class="flex flex-col md:flex-row gap-4 items-center">
                            <div class="w-full md:w-1/2">
                                <label id="recurrence-label" class="block text-[10px] font-bold text-indigo-800 uppercase tracking-widest mb-1">Quantidade de Meses</label>
                                <div class="flex items-center shadow-sm rounded-lg overflow-hidden border border-indigo-200">
                                    <button type="button" id="btn-minus" class="w-10 h-10 bg-white text-indigo-600 hover:bg-indigo-100 font-bold text-lg transition-colors">-</button>
                                    <input type="number" id="installments-input" name="installments" min="2" max="60" value="2" 
                                        class="w-full h-10 border-x border-indigo-100 text-center font-bold text-sm text-indigo-900 outline-none bg-indigo-50/50 appearance-none">
                                    <button type="button" id="btn-plus" class="w-10 h-10 bg-white text-indigo-600 hover:bg-indigo-100 font-bold text-lg transition-colors">+</button>
                                </div>
                            </div>
                            <div class="w-full md:w-1/2 flex items-center justify-center">
                                <div class="text-xs text-indigo-900 bg-white px-3 py-2 rounded-lg border border-indigo-100 w-full shadow-sm">
                                    <span id="recurrence-summary">Calculando...</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Plano de Naturezas</label>
                            <select name="naturezaId" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${themeColor}-500 outline-none text-xs font-medium text-gray-700 transition-shadow">
                                ${buildOptions(localState.natures, item?.naturezaId)}
                            </select>
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Centro de Custo</label>
                            <select name="centroDeCustoId" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${themeColor}-500 outline-none text-xs font-medium text-gray-700 transition-shadow">
                                ${buildOptions(localState.costCenters, item?.centroDeCustoId)}
                            </select>
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Forma de Pagamento</label>
                            <select name="paymentMethod" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${themeColor}-500 outline-none text-xs font-medium text-gray-700 transition-shadow">
                                <option value="">-- Selecione --</option>
                                ${paymentMethodOptions}
                            </select>
                        </div>
                    </div>

                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="md:col-span-1">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nº do Documento / NFS</label>
                            <input type="text" name="documentNumber" 
                                class="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${themeColor}-500 outline-none text-xs text-gray-800 transition-shadow" 
                                value="${item?.documentNumber || ''}" placeholder="Ex: NF-12345">
                        </div>
                        <div class="md:col-span-1">
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Observações</label>
                            <textarea name="notes" rows="1" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-${themeColor}-500 outline-none text-xs text-gray-700 font-medium resize-none transition-shadow">${item?.notes || ''}</textarea>
                        </div>
                    </div>

                    <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <label class="flex items-center gap-3 cursor-pointer group">
                            <div class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="status" id="status-toggle" class="sr-only peer" ${item?.status === 'paid' ? 'checked' : ''}>
                                <div class="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-${themeColor}-500 shadow-inner"></div>
                            </div>
                            <div>
                                <span class="block text-xs font-bold text-gray-800 group-hover:text-${themeColor}-700 transition-colors uppercase tracking-wide">Marcar como ${isPayable ? 'Pago' : 'Recebido'}</span>
                                <span class="block text-[9px] text-gray-400 font-medium mt-0.5">Retira a transação do status de pendente.</span>
                            </div>
                        </label>
                        
                        <div id="payment-date-wrapper" class="${item?.status === 'paid' ? '' : 'hidden'} flex-1 md:max-w-[220px] animate-fade-in border-l md:border-l border-gray-100 pl-0 md:pl-4 pt-3 md:pt-0 mt-3 md:mt-0">
                            <label class="block text-[10px] font-bold text-${themeColor}-600 uppercase tracking-widest mb-1.5">Data da Baixa Bancária</label>
                            <input type="date" name="paymentDate" 
                                class="w-full p-2 bg-${themeColor}-50 border border-${themeColor}-200 text-${themeColor}-800 rounded-lg text-xs font-bold outline-none focus:ring-1 focus:ring-${themeColor}-500 shadow-sm transition-shadow" 
                                value="${item?.paymentDate || new Date().toISOString().split('T')[0]}">
                        </div>
                    </div>
                </div>

                <div class="p-5 border-t border-gray-200 bg-white flex flex-col-reverse md:flex-row gap-3 flex-shrink-0 z-10 relative shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
                    <button type="button" data-action="close-modal" class="w-full md:w-auto py-2.5 px-5 bg-gray-100 text-gray-700 font-bold uppercase tracking-wider text-[10px] rounded-lg hover:bg-gray-200 transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" class="w-full flex-1 py-2.5 px-5 bg-${themeColor}-600 text-white font-bold uppercase tracking-wider text-xs rounded-lg hover:bg-${themeColor}-700 shadow-md shadow-${themeColor}-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        <i class="bi bi-save2"></i> <span>${item ? 'Salvar Alterações' : 'Confirmar Lançamento'}</span>
                    </button>
                </div>
            </form>
        </div>`;
    
    modal.style.display = 'flex';

    const form = modal.querySelector('#financial-form');
    let currentMode = 'single'; 
    let installmentsCount = 2;

    const amountInput = form.querySelector('[name="amount"]');
    const recurrenceOptions = form.querySelector('#recurrence-options');
    const summaryText = form.querySelector('#recurrence-summary');
    const installmentsInput = form.querySelector('#installments-input');
    const statusToggle = form.querySelector('#status-toggle');
    const paymentWrapper = form.querySelector('#payment-date-wrapper');
    const paymentInput = form.querySelector('[name="paymentDate"]');

    const updateSummary = () => {
        if (currentMode === 'single') return;

        const totalVal = parseFloat(amountInput.value) || 0;
        installmentsCount = parseInt(installmentsInput.value) || 2;
        
        if (totalVal === 0) {
            summaryText.innerHTML = '<span class="text-[10px] text-indigo-400 font-medium">Digite o valor total...</span>';
            return;
        }

        if (currentMode === 'installment') {
            const installmentVal = totalVal / installmentsCount;
            summaryText.innerHTML = `
                <div>
                    <span class="block text-[9px] text-indigo-400 uppercase tracking-widest font-bold mb-0.5">Simulação do Parcelamento</span>
                    <span class="font-bold text-sm text-indigo-700 block leading-tight">${installmentsCount}x de ${formatCurrency(installmentVal)}</span>
                    <span class="text-[10px] text-indigo-500 font-medium">Total: ${formatCurrency(totalVal)}</span>
                </div>
            `;
        } else if (currentMode === 'repeat') {
            const totalFinal = totalVal * installmentsCount;
            summaryText.innerHTML = `
                <div>
                    <span class="block text-[9px] text-indigo-400 uppercase tracking-widest font-bold mb-0.5">Geração Recorrente Fixa</span>
                    <span class="font-bold text-sm text-indigo-700 block leading-tight">${installmentsCount}x de ${formatCurrency(totalVal)}</span>
                    <span class="text-[10px] text-indigo-500 font-medium">Lançamento Total: ${formatCurrency(totalFinal)}</span>
                </div>
            `;
        }
    };

    form.addEventListener('click', (e) => {
        const btnMode = e.target.closest('.mode-btn');
        if (btnMode && !item) {
            e.preventDefault(); 
            
            form.querySelectorAll('.mode-btn').forEach(b => {
                b.classList.remove('bg-gray-900', 'text-white', 'shadow-sm');
                b.classList.add('text-gray-500', 'hover:bg-gray-100');
            });
            
            btnMode.classList.add('bg-gray-900', 'text-white', 'shadow-sm');
            btnMode.classList.remove('text-gray-500', 'hover:bg-gray-100');

            currentMode = btnMode.dataset.mode;
            
            if (currentMode === 'single') {
                recurrenceOptions.style.display = 'none'; 
            } else {
                recurrenceOptions.style.display = 'block'; 
                const label = recurrenceOptions.querySelector('#recurrence-label');
                if (label) {
                    label.textContent = currentMode === 'installment' ? 'Número de Parcelas' : 'Repetir por quantos meses?';
                }
                updateSummary();
            }
        }

        const minusBtn = e.target.closest('#btn-minus');
        if (minusBtn && installmentsInput) {
            e.preventDefault();
            let val = parseInt(installmentsInput.value) || 2;
            if (val > 2) { installmentsInput.value = val - 1; updateSummary(); }
        }

        const plusBtn = e.target.closest('#btn-plus');
        if (plusBtn && installmentsInput) {
            e.preventDefault();
            let val = parseInt(installmentsInput.value) || 2;
            if (val < 60) { installmentsInput.value = val + 1; updateSummary(); }
        }
    });

    amountInput.addEventListener('input', updateSummary);
    if(installmentsInput) installmentsInput.addEventListener('input', updateSummary);

    statusToggle.addEventListener('change', () => {
        if (statusToggle.checked) {
            paymentWrapper.classList.remove('hidden');
            paymentInput.required = true;
        } else {
            paymentWrapper.classList.add('hidden');
            paymentInput.required = false;
        }
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btnSubmit = form.querySelector('button[type="submit"]');
        const originalText = btnSubmit.innerHTML;
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<div class="loader-small border-white"></div> A gravar...';

        const formData = new FormData(form);
        const isPaid = statusToggle.checked;
        const rawAmount = parseFloat(formData.get('amount'));
        
        let finalAmount = rawAmount;
        let finalInstallments = 1;

        if (!item && currentMode !== 'single') {
            finalInstallments = parseInt(formData.get('installments'));
            if (currentMode === 'repeat') {
                finalAmount = rawAmount * finalInstallments;
            }
        }

        const payload = {
            establishmentId: formData.get('establishmentId'), 
            description: formData.get('description'),
            amount: finalAmount,
            dueDate: formData.get('dueDate'),
            naturezaId: formData.get('naturezaId') || null,
            centroDeCustoId: formData.get('centroDeCustoId') || null,
            
            entity: formData.get('entity') || null,
            paymentMethod: formData.get('paymentMethod') || null,
            documentNumber: formData.get('documentNumber') || null,
            
            notes: formData.get('notes'),
            status: isPaid ? 'paid' : 'pending',
            paymentDate: isPaid ? formData.get('paymentDate') : null,
            installments: finalInstallments 
        };

        if (finalInstallments > 1 && !item) {
            payload.recurrenceId = self.crypto.randomUUID();
        }

        try {
            if (item) {
                await (isPayable ? financialApi.updatePayable(item.id, payload) : financialApi.updateReceivable(item.id, payload));
                showNotification('Sucesso', 'Atualizado com sucesso!', 'success');
            } else {
                await (isPayable ? financialApi.createPayable(payload) : financialApi.createReceivable(payload));
                showNotification('Sucesso', 'Lançamento criado!', 'success');
            }
            document.getElementById('genericModal').style.display = 'none';
            fetchAndDisplayData();
        } catch (error) {
            showNotification('Erro', error.message || 'Erro ao salvar', 'error');
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = originalText;
        }
    });
}