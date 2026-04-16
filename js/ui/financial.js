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
    searchQuery: '',
    
    isAdvancedFilterOpen: false,
    selectedIds: new Set(), 
    isSelectionMode: false,

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
            <div class="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <i class="bi bi-inbox text-3xl text-gray-300"></i>
                <p class="text-gray-500 text-sm mt-2 font-medium">Nenhum item criado.</p>
            </div>`;
        return;
    }
    
    const renderNode = (item, level = 0) => {
        const padding = level * 16; 
        const isRoot = level === 0;
        const icon = isRoot ? 'bi-folder-fill text-indigo-500' : 'bi-file-earmark-text text-gray-400';
        const bgClass = isRoot ? 'bg-white shadow-sm border border-gray-200' : 'bg-gray-50 border border-gray-100';
        const textClass = isRoot ? 'text-sm font-bold text-gray-800' : 'text-sm font-semibold text-gray-600';
        
        const connector = level > 0 ? `<div class="absolute left-0 top-1/2 w-3 border-t-2 border-gray-200" style="margin-left: -12px;"></div>` : '';
        const borderLeft = level > 0 ? `border-left: 2px solid #e5e7eb;` : '';

        return `
            <div class="relative flex justify-between items-center ${bgClass} p-3 rounded-xl mb-2 hover:border-indigo-300 transition-all group" style="margin-left: ${padding}px; ${borderLeft}">
                ${connector}
                <span class="${textClass} flex items-center gap-2">
                    <i class="bi ${icon} text-lg"></i>
                    ${escapeHTML(item.name)}
                </span>
                <button type="button" data-action="delete-${type}" data-id="${item.id}" class="text-gray-400 hover:text-red-600 text-xs w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all border border-transparent hover:border-red-100" title="Excluir">
                    <i class="bi bi-trash3 text-sm"></i>
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

    modal.className = 'fixed inset-0 z-[10000] bg-slate-900/60 backdrop-blur-sm flex items-end md:items-center justify-center opacity-0 transition-opacity duration-300 p-0 md:p-6';

    modal.innerHTML = `
        <div id="modal-content-wrapper" class="w-full md:max-w-xl bg-gray-50 md:bg-white flex flex-col transform transition-all duration-300 translate-y-full md:translate-y-0 md:scale-95 h-full md:h-auto md:max-h-[85vh] rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl relative" style="font-family: 'Plus Jakarta Sans', 'Nunito', sans-serif;">
            <header class="bg-white md:bg-transparent border-b border-gray-100 md:border-gray-200 px-5 py-4 flex items-center justify-between pt-safe-top md:pt-4 z-20 flex-shrink-0">
                <button type="button" data-action="close-modal" class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-90 transition-transform">
                    <i class="bi bi-x-lg"></i>
                </button>
                <h2 class="text-base font-bold text-gray-900 tracking-tight flex items-center gap-2">
                    <i class="bi ${isNature ? 'bi-tags-fill text-indigo-500' : 'bi-diagram-3-fill text-blue-500'}"></i> ${title}
                </h2>
                <div class="w-10 h-10"></div>
            </header>
            
            <div class="flex-1 overflow-y-auto p-5 pb-safe custom-scrollbar">
                <form id="hierarchyForm" class="mb-5 bg-white md:bg-gray-50 p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
                    <div class="w-full">
                        <label class="block text-xs font-bold text-gray-500 mb-1.5">Nome da Categoria</label>
                        <input type="text" id="itemName" placeholder="Ex: Receitas de Vendas..." required class="w-full p-3.5 bg-gray-50 md:bg-white border border-gray-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all">
                    </div>
                    <div class="w-full">
                        <label class="block text-xs font-bold text-gray-500 mb-1.5">Sub-categoria de (Opcional)</label>
                        <select id="itemParent" class="w-full p-3.5 bg-gray-50 md:bg-white border border-gray-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all">
                            <option value="">-- Nível Principal --</option>
                        </select>
                    </div>
                    <button type="submit" class="w-full py-3.5 mt-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 text-sm">
                        <i class="bi bi-plus-circle-fill"></i> Adicionar
                    </button>
                </form>

                <div class="pt-2">
                    <h3 class="text-sm font-bold text-gray-800 mb-3 ml-1">Estrutura Cadastrada</h3>
                    <div id="hierarchyList" class="space-y-2 pb-10">
                        <div class="loader mx-auto"></div>
                    </div>
                </div>
            </div>
        </div>`;
    
    modal.style.display = 'flex';
    requestAnimationFrame(() => {
        modal.classList.remove('opacity-0');
        const wrapper = modal.querySelector('#modal-content-wrapper');
        if(wrapper) {
            wrapper.classList.remove('translate-y-full', 'md:scale-95', 'md:opacity-0');
            wrapper.classList.add('translate-y-0', 'md:scale-100', 'md:opacity-100');
        }
    });

    const listDiv = modal.querySelector('#hierarchyList');
    const parentSelect = modal.querySelector('#itemParent');

    const renderData = (items) => {
        const hierarchy = buildHierarchy(items);
        renderHierarchyList(listDiv, hierarchy, type);
        
        const currentSelection = parentSelect.value;
        parentSelect.innerHTML = '<option value="">-- Nível Principal --</option>';
        const renderOption = (item, level = 0) => {
            const prefix = '\u00A0\u00A0'.repeat(level) + (level > 0 ? '↳ ' : '');
            parentSelect.innerHTML += `<option value="${item.id}">${prefix}${escapeHTML(item.name)}</option>`;
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

function closeGenericModal() {
    const modal = document.getElementById('genericModal');
    modal.classList.add('opacity-0');
    const wrapper = modal.querySelector('#modal-content-wrapper');
    if (wrapper) {
        wrapper.classList.remove('translate-y-0', 'md:scale-100', 'md:opacity-100');
        wrapper.classList.add('translate-y-full', 'md:scale-95', 'md:opacity-0');
    }
    setTimeout(() => {
        modal.style.display = 'none';
        modal.className = 'modal fade fixed inset-0 z-[9999] overflow-y-auto'; 
        modal.innerHTML = '';
    }, 300);
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
    } catch (e) { console.warn("Erro ao buscar lojas", e); }

    renderBaseLayout();
    setupEventListeners();
    await fetchAndDisplayData();
}

function renderBaseLayout() {
    contentDiv.innerHTML = `
        <section class="h-[calc(100vh-80px)] md:h-auto flex flex-col p-0 md:p-4 md:pl-6 w-full relative bg-slate-50 overflow-hidden" style="font-family: 'Plus Jakarta Sans', 'Nunito', sans-serif;">
            
            <div id="batch-action-bar" class="hidden fixed top-20 left-4 right-4 md:absolute md:top-4 z-50 bg-gray-900 text-white rounded-2xl shadow-2xl p-4 items-center justify-between animate-fade-in-down">
                <div class="flex items-center gap-3">
                    <button id="cancel-selection-btn" class="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors text-gray-300 hover:text-white">
                        <i class="bi bi-x-lg text-lg"></i>
                    </button>
                    <span class="font-bold text-base tracking-wide"><span id="selected-count" class="text-indigo-400">0</span> Lançamentos Selecionados</span>
                </div>
                <button id="batch-delete-btn" class="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg text-sm">
                    <i class="bi bi-trash3"></i> Excluir Massa
                </button>
            </div>

            <div class="flex-shrink-0 z-30 bg-slate-50 pt-safe-top sticky top-0 md:static border-b border-gray-200 md:border-0 w-full max-w-7xl mx-auto">
                <div class="bg-white md:bg-transparent px-4 py-3 flex justify-between items-center md:pb-5">
                    <div class="flex bg-gray-100 md:bg-white p-1 md:p-1.5 rounded-xl w-full md:w-auto shadow-inner md:shadow-sm border md:border-gray-200">
                        <button id="tab-receivables" class="flex-1 md:w-40 py-2.5 text-sm font-bold rounded-lg transition-all flex justify-center items-center gap-2 ${localState.currentTab === 'receivables' ? 'bg-white md:bg-emerald-50 text-emerald-700 shadow-sm md:shadow-none' : 'text-gray-500 hover:text-gray-800'}">
                            A Receber
                        </button>
                        <button id="tab-payables" class="flex-1 md:w-40 py-2.5 text-sm font-bold rounded-lg transition-all flex justify-center items-center gap-2 ${localState.currentTab === 'payables' ? 'bg-white md:bg-red-50 text-red-700 shadow-sm md:shadow-none' : 'text-gray-500 hover:text-gray-800'}">
                            A Pagar
                        </button>
                    </div>
                    
                    <div class="hidden md:flex items-center gap-3 ml-4">
                        <button data-action="new-financial" data-type="receivable" class="py-2.5 px-5 bg-emerald-600 text-white font-bold rounded-xl shadow-md hover:bg-emerald-700 active:scale-95 transition-all text-sm flex items-center gap-2">
                            <i class="bi bi-plus-circle-fill"></i> Nova Receita
                        </button>
                        <button data-action="new-financial" data-type="payable" class="py-2.5 px-5 bg-red-600 text-white font-bold rounded-xl shadow-md hover:bg-red-700 active:scale-95 transition-all text-sm flex items-center gap-2">
                            <i class="bi bi-dash-circle-fill"></i> Nova Despesa
                        </button>
                        <div class="w-px h-8 bg-gray-300 mx-2"></div>
                        <button id="export-excel-btn" class="py-2.5 px-4 bg-white border border-gray-200 text-green-700 font-bold rounded-xl hover:bg-green-50 transition shadow-sm flex items-center gap-2 text-sm" title="Exportar Excel">
                            <i class="bi bi-file-earmark-excel-fill text-green-600 text-lg"></i>
                        </button>
                        <button id="settings-btn" class="py-2.5 px-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition shadow-sm flex items-center gap-2 text-sm" title="Configurações">
                            <i class="bi bi-gear-fill text-gray-500 text-lg"></i>
                        </button>
                    </div>
                </div>

                <div class="px-4 py-3 md:py-0 md:mb-5 bg-slate-50">
                    <div id="summary-section" class="flex md:grid md:grid-cols-4 overflow-x-auto gap-3 md:gap-5 snap-x hide-scrollbar"></div>
                </div>
            </div>

            <div class="flex-1 overflow-y-auto custom-scrollbar w-full relative z-0 pb-[100px] md:pb-6" id="scrollable-content">
                
                <div class="px-4 py-3 flex flex-col gap-4 max-w-7xl mx-auto">
                    
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div class="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1 md:pb-0 w-full md:w-auto">
                            <button class="date-preset-btn px-4 py-2 bg-indigo-50 text-indigo-700 text-sm font-bold rounded-xl whitespace-nowrap shadow-sm active:scale-95 transition-all" data-preset="month">Este Mês</button>
                            <button class="date-preset-btn px-4 py-2 bg-white text-gray-600 text-sm font-bold rounded-xl whitespace-nowrap shadow-sm hover:bg-gray-50 active:scale-95 transition-all" data-preset="last_month">Mês Passado</button>
                            <button id="custom-date-btn" class="px-4 py-2 bg-white text-gray-600 text-sm font-bold rounded-xl whitespace-nowrap shadow-sm hover:bg-gray-50 active:scale-95 transition-all flex items-center gap-2"><i class="bi bi-calendar-event"></i> Customizado</button>
                        </div>
                        
                        <div class="relative w-full md:w-80">
                            <i class="bi bi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                            <input type="text" id="searchInput" value="${localState.searchQuery}" placeholder="Procurar por nome ou nota..." class="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 shadow-sm rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all">
                        </div>
                    </div>

                    <div id="filter-panel" class="hidden animate-fade-in-down">
                        <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
                            <div class="grid grid-cols-2 gap-4 flex-1">
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Data Inicial</label>
                                    <input type="date" id="filterStartDate" value="${localState.startDate}" class="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Data Final</label>
                                    <input type="date" id="filterEndDate" value="${localState.endDate}" class="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4 flex-1">
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Categoria (Natureza)</label>
                                    <select id="filterNaturezaId" class="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500">
                                        <option value="all">Todas as Categorias</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-500 mb-1.5 ml-1">C. de Custo</label>
                                    <select id="filterCostCenterId" class="w-full py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500">
                                        <option value="all">Todos</option>
                                    </select>
                                </div>
                            </div>

                            <div class="flex items-end gap-2 md:w-auto mt-2 md:mt-0">
                                <button id="clear-filters-btn" class="flex-1 md:w-auto py-2.5 px-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors text-sm">Limpar</button>
                                <button id="apply-filter-btn" class="flex-[2] md:w-auto py-2.5 px-6 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 active:scale-95 transition-all text-sm flex items-center justify-center gap-2">
                                    <i class="bi bi-check2"></i> Aplicar
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                        <button data-status="all" class="status-filter-btn px-4 py-2 text-sm font-bold rounded-xl transition whitespace-nowrap shadow-sm ${localState.statusFilter === 'all' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}">Todos os Status</button>
                        <button data-status="pending" class="status-filter-btn px-4 py-2 text-sm font-bold rounded-xl transition whitespace-nowrap shadow-sm ${localState.statusFilter === 'pending' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}">Pendente</button>
                        <button data-status="paid" class="status-filter-btn px-4 py-2 text-sm font-bold rounded-xl transition whitespace-nowrap shadow-sm ${localState.statusFilter === 'paid' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}">Baixado</button>
                        <button data-status="overdue" class="status-filter-btn px-4 py-2 text-sm font-bold rounded-xl transition whitespace-nowrap shadow-sm ${localState.statusFilter === 'overdue' ? 'bg-red-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}">Atrasado</button>
                    </div>
                </div>

                <div class="hidden md:grid grid-cols-12 gap-4 px-6 py-4 text-xs font-bold text-gray-500 tracking-wide items-center bg-white border border-gray-100 sticky top-0 z-20 shadow-sm mx-4 mt-4 rounded-t-2xl max-w-7xl md:mx-auto">
                    <div class="col-span-1 flex justify-center">
                        <input type="checkbox" id="select-all-toggle" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer">
                    </div>
                    <div class="col-span-1 cursor-pointer hover:text-indigo-700 transition-colors sort-header flex items-center justify-center select-none" data-sort="dueDate">
                        Vencimento <i class="bi bi-chevron-expand ml-1 opacity-40 text-[10px]"></i>
                    </div>
                    <div class="col-span-4 cursor-pointer hover:text-indigo-700 transition-colors sort-header flex items-center select-none" data-sort="description">
                        Descrição / Entidade <i class="bi bi-chevron-expand ml-1 opacity-40 text-[10px]"></i>
                    </div>
                    <div class="col-span-2 cursor-pointer hover:text-indigo-700 transition-colors sort-header flex items-center select-none" data-sort="naturezaId">
                        Natureza / C. Custo <i class="bi bi-chevron-expand ml-1 opacity-40 text-[10px]"></i>
                    </div>
                    <div class="col-span-1 cursor-pointer hover:text-indigo-700 transition-colors sort-header flex items-center justify-center select-none" data-sort="status">
                        Status <i class="bi bi-chevron-expand ml-1 opacity-40 text-[10px]"></i>
                    </div>
                    <div class="col-span-2 cursor-pointer hover:text-indigo-700 transition-colors sort-header flex items-center justify-end text-right select-none" data-sort="amount">
                        Valor <i class="bi bi-chevron-expand ml-1 opacity-40 text-[10px]"></i>
                    </div>
                    <div class="col-span-1 text-center">Ações</div>
                </div>

                <div class="px-4 md:px-0 pb-6 w-full max-w-7xl md:mx-auto">
                    <div id="list-container" class="flex flex-col w-full md:bg-white md:border-x md:border-b md:border-gray-100 md:shadow-sm md:rounded-b-2xl">
                        <div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-gray-500 font-medium text-sm">Carregando lançamentos...</p></div>
                    </div>
                </div>
            </div>

            <div class="md:hidden fixed bottom-[85px] left-0 right-0 px-4 flex gap-3 justify-center pointer-events-none z-40">
                <button data-action="new-financial" data-type="receivable" class="pointer-events-auto flex-1 max-w-[150px] bg-emerald-600 text-white py-3.5 rounded-2xl shadow-[0_8px_30px_rgb(5,150,105,0.3)] font-bold flex items-center justify-center gap-2 active:scale-95 transition-all text-sm border border-emerald-500">
                    <i class="bi bi-arrow-down-circle-fill text-lg"></i> Receita
                </button>
                <button data-action="new-financial" data-type="payable" class="pointer-events-auto flex-1 max-w-[150px] bg-red-600 text-white py-3.5 rounded-2xl shadow-[0_8px_30px_rgb(220,38,38,0.3)] font-bold flex items-center justify-center gap-2 active:scale-95 transition-all text-sm border border-red-500">
                    <i class="bi bi-arrow-up-circle-fill text-lg"></i> Despesa
                </button>
            </div>

        </section>
    `;

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

function updateSortIcons() {
    document.querySelectorAll('.sort-header').forEach(header => {
        const icon = header.querySelector('i.bi-chevron-expand, i.bi-chevron-up, i.bi-chevron-down');
        if(!icon) return;
        
        const col = header.dataset.sort;
        if (col === localState.sortCol) {
            header.classList.add('text-indigo-700');
            header.classList.remove('text-gray-500');
            icon.className = localState.sortAsc ? 'bi bi-chevron-up ml-1 text-indigo-600 text-[11px] font-black' : 'bi bi-chevron-down ml-1 text-indigo-600 text-[11px] font-black';
        } else {
            header.classList.remove('text-indigo-700');
            header.classList.add('text-gray-500');
            icon.className = 'bi bi-chevron-expand ml-1 opacity-40 text-[10px] font-black';
        }
    });
}

function setupEventListeners() {
    
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

    const selectAllToggle = document.getElementById('select-all-toggle');
    if (selectAllToggle) {
        selectAllToggle.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            const allCheckboxes = document.querySelectorAll('.item-checkbox');
            localState.selectedIds.clear();
            allCheckboxes.forEach(cb => {
                cb.checked = isChecked;
                if(isChecked) localState.selectedIds.add(cb.value);
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

    document.getElementById('custom-date-btn').addEventListener('click', () => {
        const panel = document.getElementById('filter-panel');
        const btn = document.getElementById('custom-date-btn');
        localState.isAdvancedFilterOpen = !localState.isAdvancedFilterOpen;
        
        if (localState.isAdvancedFilterOpen) {
            panel.classList.remove('hidden');
            btn.classList.add('bg-gray-900', 'text-white', 'border-gray-900');
            btn.classList.remove('bg-white', 'text-gray-600', 'border-gray-200');
        } else {
            panel.classList.add('hidden');
            btn.classList.remove('bg-gray-900', 'text-white', 'border-gray-900');
            btn.classList.add('bg-white', 'text-gray-600', 'border-gray-200');
        }
    });

    const exportBtn = document.getElementById('export-excel-btn');
    if(exportBtn) exportBtn.addEventListener('click', handleExportExcel);
    
    const settingsBtn = document.getElementById('settings-btn');
    if(settingsBtn) settingsBtn.addEventListener('click', openSettingsModal);

    document.querySelectorAll('[data-action="new-financial"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (navigator.vibrate) navigator.vibrate(20);
            openFinancialModal(e.target.closest('button').dataset.type);
        });
    });

    const tabRec = document.getElementById('tab-receivables');
    const tabPay = document.getElementById('tab-payables');

    tabRec.addEventListener('click', () => { if (navigator.vibrate) navigator.vibrate(15); switchTab('receivables'); });
    tabPay.addEventListener('click', () => { if (navigator.vibrate) navigator.vibrate(15); switchTab('payables'); });

    document.querySelectorAll('.status-filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (navigator.vibrate) navigator.vibrate(15);
            document.querySelectorAll('.status-filter-btn').forEach(b => {
                b.classList.remove('bg-gray-900', 'bg-blue-600', 'bg-emerald-600', 'bg-red-600', 'text-white');
                b.classList.add('bg-white', 'text-gray-600');
            });
            
            const status = e.target.dataset.status;
            if (status === 'all') e.target.classList.add('bg-gray-900', 'text-white');
            else if (status === 'pending') e.target.classList.add('bg-blue-600', 'text-white');
            else if (status === 'paid') e.target.classList.add('bg-emerald-600', 'text-white');
            else if (status === 'overdue') e.target.classList.add('bg-red-600', 'text-white');
            
            e.target.classList.remove('bg-white', 'text-gray-600');
            
            localState.statusFilter = status;
            renderLists(); 
        });
    });

    document.querySelectorAll('.date-preset-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (navigator.vibrate) navigator.vibrate(15);
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
            }

            document.getElementById('filterStartDate').value = start.toISOString().split('T')[0];
            document.getElementById('filterEndDate').value = end.toISOString().split('T')[0];
            
            localState.startDate = start.toISOString().split('T')[0];
            localState.endDate = end.toISOString().split('T')[0];
            fetchAndDisplayData();
        });
    });

    document.getElementById('searchInput').addEventListener('input', (e) => {
        localState.searchQuery = e.target.value.toLowerCase();
        renderLists(); 
    });

    document.getElementById('clear-filters-btn').addEventListener('click', () => {
        if (navigator.vibrate) navigator.vibrate(15);
        const now = new Date();
        document.getElementById('filterStartDate').value = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
        document.getElementById('filterEndDate').value = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
        document.getElementById('filterNaturezaId').value = 'all';
        document.getElementById('filterCostCenterId').value = 'all';
        
        renderBaseLayout();
        setupEventListeners();
        fetchAndDisplayData();
    });

    document.getElementById('apply-filter-btn').addEventListener('click', () => {
        if (navigator.vibrate) navigator.vibrate(20);
        localState.startDate = document.getElementById('filterStartDate').value;
        localState.endDate = document.getElementById('filterEndDate').value;
        localState.filterNaturezaId = document.getElementById('filterNaturezaId').value;
        localState.filterCostCenterId = document.getElementById('filterCostCenterId').value;
        
        document.getElementById('custom-date-btn').click(); 
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
            
            if (action === 'mark-as-paid') {
                e.stopPropagation();
                if (navigator.vibrate) navigator.vibrate(20);
                handleMarkAsPaid(type, id);
                return;
            }
            if (action === 'delete') {
                e.stopPropagation();
                if (navigator.vibrate) navigator.vibrate(30);
                const itemStr = actionButton.closest('.financial-row').dataset.item;
                try {
                    handleSmartDelete(type, JSON.parse(decodeURIComponent(itemStr)));
                } catch(err) {
                    console.error("Parse error on delete", err);
                }
                return;
            }
            if (action === 'manage-natures') { e.stopPropagation(); openHierarchyModal('nature'); return; }
            if (action === 'manage-cost-centers') { e.stopPropagation(); openHierarchyModal('cost-center'); return; }
            if (action === 'close-modal') { e.stopPropagation(); closeGenericModal(); return; }
        }

        const rowItem = target.closest('.financial-row');
        if (rowItem && document.getElementById('list-container').contains(rowItem)) {
            if (!target.closest('button') && !target.closest('.item-checkbox')) {
                if (navigator.vibrate) navigator.vibrate(15);
                const { type } = rowItem.dataset;
                try {
                    const itemData = JSON.parse(decodeURIComponent(rowItem.dataset.item));
                    openFinancialModal(type, itemData);
                } catch (err) {
                    console.error("Parse error on card click", err);
                    showNotification('Erro', 'Os dados deste lançamento não puderam ser lidos corretamente.', 'error');
                }
            }
        }
    };
    document.body.addEventListener('click', financialPageEventListener);

    if (genericModalEventListener) document.getElementById('genericModal').removeEventListener('click', genericModalEventListener);
    genericModalEventListener = (e) => {
        const deleteBtn = e.target.closest('button[data-action^="delete-"]');
        if (deleteBtn) {
            const type = deleteBtn.dataset.action.split('-')[1];
            handleDeleteHierarchyItem(type, deleteBtn.dataset.id);
        }

        if(e.target === document.getElementById('genericModal')) {
            closeGenericModal();
        }
    };
    document.getElementById('genericModal').addEventListener('click', genericModalEventListener);
}

function updateBatchActionBar() {
    const bar = document.getElementById('batch-action-bar');
    const countSpan = document.getElementById('selected-count');
    const count = localState.selectedIds.size;

    countSpan.textContent = count;

    if (count > 0) {
        bar.classList.remove('hidden');
        bar.classList.add('flex');
    } else {
        bar.classList.add('hidden');
        bar.classList.remove('flex');
    }
}

function switchTab(tab) {
    localState.currentTab = tab;
    localState.selectedIds.clear();
    updateBatchActionBar();
    if(document.getElementById('select-all-toggle')) document.getElementById('select-all-toggle').checked = false;
    
    const tabRec = document.getElementById('tab-receivables');
    const tabPay = document.getElementById('tab-payables');

    if (tab === 'receivables') {
        tabRec.classList.add('bg-white', 'md:bg-emerald-50', 'text-emerald-700', 'shadow-sm', 'md:shadow-none');
        tabRec.classList.remove('text-gray-500');
        tabPay.classList.remove('bg-white', 'md:bg-red-50', 'text-red-700', 'shadow-sm', 'md:shadow-none');
        tabPay.classList.add('text-gray-500');
    } else {
        tabPay.classList.add('bg-white', 'md:bg-red-50', 'text-red-700', 'shadow-sm', 'md:shadow-none');
        tabPay.classList.remove('text-gray-500');
        tabRec.classList.remove('bg-white', 'md:bg-emerald-50', 'text-emerald-700', 'shadow-sm', 'md:shadow-none');
        tabRec.classList.add('text-gray-500');
    }

    renderLists();
    renderSummary();
}

// ============================================================================
// 📡 COMUNICAÇÃO DE DADOS E GHOST RECORDS FIX
// ============================================================================

async function fetchAndDisplayData() {
    const listContainer = document.getElementById('list-container');
    listContainer.innerHTML = '<div class="text-center py-16"><div class="loader mx-auto"></div><p class="mt-4 text-gray-500 font-medium text-sm">A sincronizar carteira...</p></div>';

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

        const targetEstIds = (state.selectedEstablishments && state.selectedEstablishments.length > 0) 
            ? state.selectedEstablishments 
            : [state.establishmentId];
        
        const selectedEstsString = targetEstIds.join(',');

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
                <p class="text-gray-600 text-sm font-bold">Erro ao carregar dados: ${error.message}</p>
            </div>`;
    }
}

function populateFilterSelects() {
    const buildOptions = (items) => {
        let optionsHTML = '<option value="all">Todas as categorias</option>';
        const hierarchy = buildHierarchy(items);
        const renderOption = (item, level = 0) => {
            const prefix = '\u00A0\u00A0'.repeat(level) + (level > 0 ? '↳ ' : '');
            optionsHTML += `<option value="${item.id}">${prefix}${escapeHTML(item.name)}</option>`;
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
    const iconBase = isRec ? 'bi-arrow-down-left-circle-fill text-emerald-500' : 'bi-arrow-up-right-circle-fill text-red-500';

    section.innerHTML = `
        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 md:p-5 rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                <div class="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gray-50 flex items-center justify-center">
                    <i class="bi ${iconBase} text-base md:text-xl"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Total<br class="md:hidden"/> Geral</span>
            </div>
            <span class="text-xl md:text-3xl font-black text-gray-900">${formatCurrency(total)}</span>
        </div>
        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 md:p-5 rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                <div class="w-8 h-8 md:w-12 md:h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    <i class="bi bi-clock-history text-blue-500 text-base md:text-xl"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">A Vencer<br class="md:hidden"/> Pendente</span>
            </div>
            <span class="text-xl md:text-3xl font-black text-blue-600">${formatCurrency(pending)}</span>
        </div>
        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 md:p-5 rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                <div class="w-8 h-8 md:w-12 md:h-12 rounded-full bg-${themeColor}-50 flex items-center justify-center">
                    <i class="bi bi-check-circle-fill text-${themeColor}-500 text-base md:text-xl"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Status<br class="md:hidden"/> Baixado</span>
            </div>
            <span class="text-xl md:text-3xl font-black text-${themeColor}-600">${formatCurrency(paid)}</span>
        </div>
        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 md:p-5 rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                <div class="w-8 h-8 md:w-12 md:h-12 rounded-full ${overdue > 0 ? 'bg-red-50' : 'bg-gray-50'} flex items-center justify-center">
                    <i class="bi bi-exclamation-circle-fill ${overdue > 0 ? 'text-red-500' : 'text-gray-300'} text-base md:text-xl"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Pagos<br class="md:hidden"/> Atrasados</span>
            </div>
            <span class="text-xl md:text-3xl font-black ${overdue > 0 ? 'text-red-600' : 'text-gray-400'}">${formatCurrency(overdue)}</span>
        </div>
    `;
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
            <div class="flex flex-col items-center justify-center py-20 bg-white">
                <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5">
                    <i class="bi bi-wallet2 text-4xl text-gray-300"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-1">Sem resultados</h3>
                <p class="text-sm font-medium text-gray-400 text-center px-4">Não existem lançamentos com os filtros aplicados neste período.</p>
            </div>
        `;
        return;
    }

    const natureMap = new Map(localState.natures.map(n => [n.id, n.name]));
    const costCenterMap = new Map(localState.costCenters.map(n => [n.id, n.name]));
    const estMap = new Map(localState.establishments.map(e => [e.id, e]));

    const typeStr = isReceivable ? 'receivable' : 'payable';
    const amountColor = isReceivable ? 'text-emerald-600' : 'text-red-600';
    const rowIcon = isReceivable ? '<i class="bi bi-arrow-down-left-circle-fill text-emerald-500 text-2xl drop-shadow-sm"></i>' : '<i class="bi bi-arrow-up-right-circle-fill text-red-500 text-2xl drop-shadow-sm"></i>';
    const rowIconMini = isReceivable ? '<i class="bi bi-arrow-down-left-circle-fill text-emerald-500 text-lg"></i>' : '<i class="bi bi-arrow-up-right-circle-fill text-red-500 text-lg"></i>';

    container.innerHTML = filteredList.map(item => {
        const dateObj = formatDateDisplay(item.dueDate);
        const isPaid = item.status === 'paid';
        const itemOverdue = isOverdue(item.dueDate, item.status);
        
        let statusBadge = '';
        if (isPaid) statusBadge = '<span class="text-[9px] md:text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 md:px-2.5 py-1 rounded-lg uppercase tracking-widest"><i class="bi bi-check2-circle"></i> Baixado</span>';
        else if (itemOverdue) statusBadge = '<span class="text-[9px] md:text-[10px] font-black text-red-600 bg-red-50 px-2 md:px-2.5 py-1 rounded-lg uppercase tracking-widest"><i class="bi bi-exclamation-circle"></i> Atraso</span>';
        else statusBadge = '<span class="text-[9px] md:text-[10px] font-black text-blue-600 bg-blue-50 px-2 md:px-2.5 py-1 rounded-lg uppercase tracking-widest"><i class="bi bi-clock"></i> Pendente</span>';

        const natureName = item.naturezaId ? natureMap.get(item.naturezaId) || 'Geral' : 'Geral';
        const ccName = item.centroDeCustoId ? costCenterMap.get(item.centroDeCustoId) || 'Geral' : 'Geral';
        
        const estObj = estMap.get(item.establishmentId);
        let estBadge = '';
        if (estObj) {
            const estIcon = estObj.type === 'Matriz' ? 'bi-building' : 'bi-shop';
            estBadge = `<span class="text-[9px] font-bold text-gray-600 bg-gray-50 px-2 py-1 rounded-lg border border-gray-200 flex items-center max-w-[110px] truncate leading-none shadow-sm" title="${escapeHTML(estObj.name)}"><i class="bi ${estIcon} mr-1 opacity-60"></i> ${escapeHTML(estObj.name)}</span>`;
        }

        const itemDataStr = encodeURIComponent(JSON.stringify(item));
        const isSelected = localState.selectedIds.has(item.id);
        const isRecurring = !!item.recurrenceId;
        const recurringIcon = isRecurring ? `<i class="bi bi-arrow-repeat text-indigo-600 ml-1 text-sm md:text-base bg-indigo-50 rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center shadow-sm" title="Recorrente"></i>` : '';

        return `
        <div class="financial-row bg-white border border-gray-100 md:border-0 md:border-b md:border-gray-100 hover:bg-gray-50 transition-all cursor-pointer relative flex flex-col md:grid md:grid-cols-12 md:gap-4 md:items-center p-3.5 md:px-6 md:py-4 mb-3 md:mb-0 rounded-2xl md:rounded-none ${isSelected ? 'ring-2 md:ring-0 ring-indigo-500 bg-indigo-50/50 md:bg-indigo-50/50' : ''} ${isPaid ? 'opacity-70 md:opacity-100' : ''}"
             data-type="${typeStr}"
             data-item="${itemDataStr}">
            
            <div class="absolute right-3 top-3 md:relative md:right-auto md:top-auto md:col-span-1 flex md:justify-center z-10">
                <input type="checkbox" value="${item.id}" class="item-checkbox w-4 h-4 md:w-5 md:h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm bg-white" ${isSelected ? 'checked' : ''}>
            </div>

            <div class="md:hidden flex items-start gap-3 w-full pr-6">
                <div class="flex-shrink-0 relative pt-1">
                    ${rowIcon}
                </div>
                <div class="flex-1 min-w-0 flex flex-col">
                    <div class="flex justify-between items-center mb-1">
                        <p class="font-bold text-[14px] text-gray-900 truncate leading-tight pr-2 ${isPaid ? 'line-through text-gray-400' : ''}">${escapeHTML(item.description)}</p>
                        <p class="font-black text-[16px] leading-none flex-shrink-0 ${isPaid ? 'text-gray-400' : amountColor}">${formatCurrency(item.amount)}</p>
                    </div>
                    <div class="flex justify-between items-end mt-1.5">
                        <div class="flex flex-col gap-1.5 overflow-hidden pr-2">
                            <p class="text-[10px] text-gray-500 font-semibold truncate leading-none"><i class="bi bi-person opacity-60 mr-1"></i>${escapeHTML(item.entity || 'Sem Entidade')}</p>
                            <div class="flex items-center gap-1.5 overflow-hidden mt-1">
                                <span class="text-[9px] font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded-lg border border-gray-200 whitespace-nowrap leading-none shadow-sm">
                                    Venc: ${dateObj.full}
                                </span>
                                <span class="text-[9px] font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100 truncate max-w-[100px] leading-none">
                                    ${natureName}
                                </span>
                                ${estBadge}
                                ${recurringIcon}
                            </div>
                        </div>
                        <div class="flex flex-col items-end gap-1.5 flex-shrink-0">
                            ${statusBadge}
                            ${!isPaid ? `
                            <button data-action="mark-as-paid" data-type="${typeStr}" data-id="${item.id}" class="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition-colors shadow-sm" title="Dar Baixa">
                                <i class="bi bi-check2-all text-xs font-bold"></i>
                            </button>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>

            <div class="hidden md:flex md:col-span-1 flex-col items-center justify-center ${isPaid ? 'opacity-50' : ''}">
                <span class="text-base font-black text-gray-900 leading-none">${dateObj.day}</span>
                <span class="text-[9px] font-bold text-gray-500 uppercase leading-none mt-1">${dateObj.month}</span>
            </div>

            <div class="hidden md:flex md:col-span-4 flex-col justify-center min-w-0 pr-4">
                <div class="flex items-center gap-2.5">
                    ${rowIconMini}
                    <p class="font-bold text-sm text-gray-900 truncate ${isPaid ? 'line-through text-gray-400' : ''}">${escapeHTML(item.description)}</p>
                    ${item.documentNumber ? `<span class="text-[9px] font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-lg border border-gray-200 shadow-sm leading-none flex-shrink-0">NF: ${escapeHTML(item.documentNumber)}</span>` : ''}
                </div>
                <p class="text-xs text-gray-500 font-semibold truncate mt-1.5 pl-7"><i class="bi bi-person opacity-60 mr-1.5"></i>${escapeHTML(item.entity || 'Sem Entidade associada')}</p>
            </div>

            <div class="hidden md:flex md:col-span-2 flex-col justify-center min-w-0 pr-4 gap-1.5">
                <span class="text-[10px] font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-lg border border-gray-200 w-max max-w-full truncate shadow-sm"><i class="bi bi-tag opacity-50 mr-1.5"></i>${natureName}</span>
                <span class="text-[10px] font-semibold text-gray-500 truncate w-max max-w-full"><i class="bi bi-diagram-3 opacity-50 mr-1.5"></i>${ccName}</span>
            </div>

            <div class="hidden md:flex md:col-span-1 justify-center items-center">
                ${statusBadge}
            </div>

            <div class="hidden md:flex md:col-span-2 justify-end items-center pr-6">
                <p class="font-black text-lg ${isPaid ? 'text-gray-400' : amountColor}">${formatCurrency(item.amount)}</p>
            </div>

            <div class="hidden md:flex md:col-span-1 justify-center items-center gap-2 z-20">
                ${!isPaid ? `
                <button data-action="mark-as-paid" data-type="${typeStr}" data-id="${item.id}" class="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 border border-emerald-100 transition-colors shadow-sm" title="Dar Baixa">
                    <i class="bi bi-check2-all text-base font-bold"></i>
                </button>
                ` : ''}
                <button data-action="delete" data-type="${typeStr}" data-id="${item.id}" class="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 border border-red-100 transition-colors shadow-sm" title="Excluir">
                    <i class="bi bi-trash3 text-sm"></i>
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

    modal.className = 'fixed inset-0 z-[10000] bg-slate-900/60 backdrop-blur-sm flex items-end md:items-center justify-center opacity-0 transition-opacity duration-300 p-0 md:p-6';

    modal.innerHTML = `
        <div id="modal-content-wrapper" class="w-full md:max-w-2xl bg-gray-50 md:bg-white flex flex-col transform transition-all duration-300 translate-y-full md:translate-y-0 md:scale-95 md:opacity-0 h-full md:h-auto md:max-h-[90vh] rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl relative" style="font-family: 'Plus Jakarta Sans', 'Nunito', sans-serif;">
            <header class="bg-red-600 border-b border-red-700 px-5 py-4 flex items-center justify-between pt-safe-top md:pt-4 shadow-md z-20 flex-shrink-0 md:rounded-t-3xl">
                <button type="button" data-action="close-modal" class="w-10 h-10 flex items-center justify-center rounded-full bg-red-500/50 text-white hover:bg-red-500 active:scale-90 transition-all">
                    <i class="bi bi-x-lg text-sm"></i>
                </button>
                <h2 class="text-base font-black text-white tracking-tight flex items-center gap-2">
                    <i class="bi bi-trash3-fill"></i> Exclusão em Lote
                </h2>
                <div class="w-10 h-10"></div>
            </header>
            
            <div class="p-4 bg-white md:bg-transparent border-b border-gray-100 flex justify-between items-center z-10 flex-shrink-0">
                <span class="text-xs text-gray-600 font-bold uppercase tracking-wider">Parcelas Conectadas:</span>
                <label class="flex items-center gap-2 cursor-pointer text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 shadow-sm active:scale-95">
                    <input type="checkbox" id="modal-select-all" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4">
                    Marcar Todas
                </label>
            </div>

            <div class="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar bg-gray-50 pb-safe md:pb-4">
                ${relatedItems.map(item => {
                    const isCurrent = item.id === currentItem.id;
                    const isPaid = item.status === 'paid';
                    const dateObj = formatDateDisplay(item.dueDate);
                    
                    return `
                    <label class="flex items-center gap-4 p-4 bg-white rounded-2xl border ${isCurrent ? 'border-red-400 ring-2 ring-red-100 shadow-md bg-red-50/20' : 'border-gray-200 shadow-sm'} cursor-pointer transition-all hover:bg-gray-50 active:scale-[0.98]">
                        <input type="checkbox" class="modal-item-checkbox w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500" value="${item.id}" ${isCurrent ? 'checked' : ''}>
                        
                        <div class="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-xl flex flex-col items-center justify-center border border-gray-200">
                            <span class="text-base font-black text-gray-800 leading-none">${dateObj.day}</span>
                            <span class="text-[9px] font-bold text-gray-500 uppercase leading-none mt-1.5">${dateObj.month}</span>
                        </div>

                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-bold text-gray-900 truncate">${escapeHTML(item.description)}</p>
                            <p class="text-sm font-black text-gray-600 mt-1">${formatCurrency(item.amount)} ${isPaid ? '<span class="text-emerald-600 font-bold ml-1">(Baixado)</span>' : ''}</p>
                        </div>
                    </label>
                    `;
                }).join('')}
            </div>

            <div class="p-4 border-t border-gray-200 bg-white md:bg-gray-50 flex-shrink-0 pb-safe md:pb-4 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] md:rounded-b-3xl">
                <button id="confirm-batch-delete" class="w-full py-4 bg-red-600 text-white font-black uppercase tracking-wider rounded-2xl hover:bg-red-700 shadow-lg active:scale-95 transition-all flex justify-center items-center gap-2 text-sm">
                    Excluir Selecionados
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    requestAnimationFrame(() => {
        modal.classList.remove('opacity-0');
        const wrapper = modal.querySelector('#modal-content-wrapper');
        if(wrapper) {
            wrapper.classList.remove('translate-y-full', 'md:scale-95', 'md:opacity-0');
            wrapper.classList.add('translate-y-0', 'md:scale-100', 'md:opacity-100');
        }
    });

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
        confirmBtn.innerHTML = count > 0 ? `<i class="bi bi-trash3-fill"></i> Excluir ${count} Parcela(s)` : 'Selecione para excluir';
        confirmBtn.disabled = count === 0;
        if(count === 0) confirmBtn.classList.add('opacity-50', 'bg-gray-400');
        else confirmBtn.classList.remove('opacity-50', 'bg-gray-400');
    }

    confirmBtn.addEventListener('click', async () => {
        const idsToDelete = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
        if (idsToDelete.length === 0) return;
        closeGenericModal();
        
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

function openSettingsModal() {
    const modal = document.getElementById('genericModal');
    modal.className = 'fixed inset-0 z-[10000] bg-slate-900/60 backdrop-blur-sm flex items-end md:items-center justify-center opacity-0 transition-opacity duration-300 p-0 md:p-6';
    
    modal.innerHTML = `
        <div id="modal-content-wrapper" class="w-full md:max-w-md bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 translate-y-full md:translate-y-0 md:scale-95 md:opacity-0" style="font-family: 'Plus Jakarta Sans', 'Nunito', sans-serif;">
            <div class="p-6 text-center relative pb-safe md:pb-6">
                <div class="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 md:hidden"></div>
                <h2 class="text-xl font-black text-gray-900 mb-6">Ajustes Financeiros</h2>
                <div class="space-y-4">
                    <button data-action="manage-natures" class="w-full py-4 px-5 bg-gray-50 text-gray-800 font-bold rounded-2xl active:bg-gray-100 flex items-center justify-between border border-gray-200 transition-colors shadow-sm hover:border-indigo-300">
                        <span class="flex items-center gap-3"><i class="bi bi-tags-fill text-indigo-500 text-lg"></i> Plano de Naturezas</span>
                        <i class="bi bi-chevron-right text-gray-400"></i>
                    </button>
                    <button data-action="manage-cost-centers" class="w-full py-4 px-5 bg-gray-50 text-gray-800 font-bold rounded-2xl active:bg-gray-100 flex items-center justify-between border border-gray-200 transition-colors shadow-sm hover:border-blue-300">
                        <span class="flex items-center gap-3"><i class="bi bi-diagram-3-fill text-blue-500 text-lg"></i> Centros de Custo</span>
                        <i class="bi bi-chevron-right text-gray-400"></i>
                    </button>
                    <button data-action="close-modal" class="w-full py-4 mt-3 bg-gray-900 text-white font-bold rounded-2xl active:scale-95 transition-all shadow-md">
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    `;
    modal.style.display = 'flex';
    
    requestAnimationFrame(() => {
        modal.classList.remove('opacity-0');
        const wrapper = modal.querySelector('#modal-content-wrapper');
        if(wrapper) {
            wrapper.classList.remove('translate-y-full', 'md:scale-95', 'md:opacity-0');
            wrapper.classList.add('translate-y-0', 'md:scale-100', 'md:opacity-100');
        }
    });
}

function openFinancialModal(type, item = null) {
    const modal = document.getElementById('genericModal');
    const isPayable = type === 'payable';
    const themeColor = isPayable ? 'red' : 'emerald';
    const title = item ? `Editar Lançamento` : `Novo Lançamento`;

    const buildOptions = (items, selectedId) => {
        let html = '<option value="">-- Categoria --</option>';
        const hierarchy = buildHierarchy(items);
        const renderOption = (it, level = 0) => {
            const prefix = '\u00A0\u00A0'.repeat(level) + (level > 0 ? '↳ ' : '');
            const selected = it.id === selectedId ? 'selected' : '';
            html += `<option value="${it.id}" ${selected}>${prefix}${escapeHTML(it.name)}</option>`;
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

    const datalistHTML = `
        <datalist id="entity-suggestions">
            ${isPayable 
                ? localState.suppliers.map(s => `<option value="${escapeHTML(s.name)}">Fornecedor</option>`).join('') +
                  localState.professionals.map(p => `<option value="${escapeHTML(p.name)}">Profissional</option>`).join('')
                : localState.clients.map(c => `<option value="${escapeHTML(c.name)} ${c.phone ? '- ' + escapeHTML(c.phone) : ''}">Cliente</option>`).join('')
            }
        </datalist>
    `;

    // Garante a filial escolhida (Adicionado COMPANY ID de segurança)
    const autoEstId = item?.establishmentId || (state.selectedEstablishments && state.selectedEstablishments[0]) || state.establishmentId;
    const estOptions = localState.establishments.map(est => {
        const isSelected = est.id === autoEstId;
        return `<option value="${est.id}" ${isSelected ? 'selected' : ''}>${est.type === 'Matriz' ? '🏢' : '📍'} ${escapeHTML(est.name)}</option>`;
    }).join('');

    modal.className = 'fixed inset-0 z-[10000] bg-slate-900/60 backdrop-blur-sm flex items-end md:items-center justify-center opacity-0 transition-opacity duration-300 p-0 md:p-6';

    modal.innerHTML = `
        ${datalistHTML}

        <div id="modal-content-wrapper" class="w-full md:max-w-3xl bg-gray-50 flex flex-col transform transition-all duration-300 translate-y-full md:translate-y-0 md:scale-95 md:opacity-0 h-[90vh] md:h-auto md:max-h-[90vh] rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl relative" style="font-family: 'Plus Jakarta Sans', 'Nunito', sans-serif;">
            
            <header class="bg-${themeColor}-600 border-b border-${themeColor}-700 px-5 py-4 flex items-center justify-between pt-safe-top md:pt-4 shadow-sm z-20 flex-shrink-0 relative overflow-hidden md:rounded-t-3xl">
                <div class="absolute right-[-20px] top-[-20px] opacity-10 pointer-events-none">
                    <svg width="150" height="150" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="40" stroke="white" stroke-width="20"/></svg>
                </div>
                <button type="button" data-action="close-modal" class="w-10 h-10 flex items-center justify-center rounded-full bg-black/10 text-white hover:bg-black/20 active:scale-90 transition-colors z-10 relative">
                    <i class="bi bi-x-lg"></i>
                </button>
                <div class="text-center z-10 relative">
                    <h2 class="text-base font-black text-white tracking-tight leading-tight truncate">${title}</h2>
                    <p class="text-[10px] text-${themeColor}-100 font-bold uppercase tracking-widest mt-0.5">${isPayable ? 'Registo de Despesa' : 'Registo de Receita'}</p>
                </div>
                <div class="w-10 h-10"></div>
            </header>
            
            <form id="financial-form" class="flex-1 overflow-y-auto custom-scrollbar pb-safe flex flex-col relative z-0 bg-gray-50">
                <div class="p-4 md:p-6 space-y-4 md:space-y-5">

                    ${!item ? `
                    <div class="bg-gray-200/80 p-1.5 rounded-xl flex border border-gray-300 shadow-inner" id="mode-switcher">
                        <button type="button" class="mode-btn flex-1 py-2 text-[10px] md:text-xs uppercase tracking-widest font-black rounded-lg shadow-sm bg-white text-gray-900 transition-all" data-mode="single">Único</button>
                        <button type="button" class="mode-btn flex-1 py-2 text-[10px] md:text-xs uppercase tracking-widest font-black rounded-lg text-gray-500 hover:text-gray-900 transition-all" data-mode="installment">Parcelado</button>
                        <button type="button" class="mode-btn flex-1 py-2 text-[10px] md:text-xs uppercase tracking-widest font-black rounded-lg text-gray-500 hover:text-gray-900 transition-all" data-mode="repeat">Recorrente</button>
                    </div>
                    ` : ''}

                    <div class="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl border border-gray-200 shadow-sm space-y-4">
                        
                        <div>
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Unidade de Lançamento</label>
                            <select name="establishmentId" required class="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-${themeColor}-500 focus:bg-white outline-none text-sm font-bold text-gray-800 transition-all shadow-sm cursor-pointer">
                                ${estOptions}
                            </select>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 text-center">Valor Total (R$)</label>
                                <input type="number" step="0.01" name="amount" required 
                                    class="w-full py-3 px-4 border border-gray-200 bg-gray-50 focus:bg-white rounded-xl focus:ring-2 focus:ring-${themeColor}-500 outline-none font-black text-xl md:text-2xl text-center text-${themeColor}-600 transition-all shadow-sm" 
                                    value="${item?.amount || ''}" placeholder="0,00">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 text-center">Data de Venc.</label>
                                <input type="date" name="dueDate" required 
                                    class="w-full py-3 px-4 border border-gray-200 bg-gray-50 focus:bg-white rounded-xl focus:ring-2 focus:ring-${themeColor}-500 outline-none font-bold text-sm md:text-base text-center text-gray-900 transition-all shadow-sm" 
                                    value="${item?.dueDate || new Date().toISOString().split('T')[0]}">
                            </div>
                        </div>
                    </div>

                    <div id="recurrence-options" style="display: none;" class="bg-indigo-50 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-indigo-100 shadow-inner">
                        <div class="flex flex-col md:flex-row gap-4 items-center">
                            <div class="w-full md:w-auto">
                                <label id="recurrence-label" class="block text-[10px] font-black text-indigo-800 uppercase tracking-widest text-center md:text-left mb-1.5">Quantidade de Meses</label>
                                <div class="flex items-center shadow-sm rounded-xl overflow-hidden border border-indigo-200 w-full md:w-[180px] mx-auto md:mx-0">
                                    <button type="button" id="btn-minus" class="w-12 h-12 bg-white text-indigo-600 active:bg-indigo-100 font-black text-xl transition-colors flex items-center justify-center">-</button>
                                    <input type="number" id="installments-input" name="installments" min="2" max="60" value="2" 
                                        class="w-full h-12 border-x border-indigo-100 text-center font-black text-lg text-indigo-900 outline-none bg-indigo-50/50 appearance-none p-0">
                                    <button type="button" id="btn-plus" class="w-12 h-12 bg-white text-indigo-600 active:bg-indigo-100 font-black text-xl transition-colors flex items-center justify-center">+</button>
                                </div>
                            </div>
                            <div class="text-center md:text-left w-full md:flex-1 mt-2 md:mt-0">
                                <span id="recurrence-summary" class="bg-white px-4 py-3 rounded-xl border border-indigo-100 shadow-sm inline-block w-full">Calculando...</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl border border-gray-200 shadow-sm space-y-4">
                        <div>
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Descrição / Título</label>
                            <input type="text" name="description" required 
                                class="w-full py-3 px-4 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${themeColor}-500 outline-none font-bold text-gray-900 text-sm transition-all shadow-sm" 
                                value="${item?.description ? escapeHTML(item.description) : ''}" placeholder="Ex: Fornecedor de Bebidas...">
                        </div>
                        
                        <div>
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">${isPayable ? 'Fornecedor / Favorecido' : 'Cliente / Pagador'}</label>
                            <div class="relative">
                                <i class="bi bi-person absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                                <input type="text" name="entity" list="entity-suggestions" 
                                    class="w-full pl-11 pr-4 py-3 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${themeColor}-500 outline-none font-bold text-sm text-gray-900 transition-all shadow-sm" 
                                    value="${item?.entity ? escapeHTML(item.entity) : ''}" placeholder="Nome da pessoa ou empresa..." autocomplete="off">
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl border border-gray-200 shadow-sm space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Plano de Natureza</label>
                                <select name="naturezaId" class="w-full py-3 px-4 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${themeColor}-500 outline-none text-sm font-bold text-gray-700 transition-all shadow-sm">
                                    ${buildOptions(localState.natures, item?.naturezaId)}
                                </select>
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Centro de Custo</label>
                                <select name="centroDeCustoId" class="w-full py-3 px-4 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${themeColor}-500 outline-none text-sm font-bold text-gray-700 transition-all shadow-sm">
                                    ${buildOptions(localState.costCenters, item?.centroDeCustoId)}
                                </select>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Nº Documento</label>
                                <input type="text" name="documentNumber" 
                                    class="w-full py-3 px-4 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${themeColor}-500 outline-none text-sm font-bold text-gray-900 transition-all shadow-sm" 
                                    value="${item?.documentNumber ? escapeHTML(item.documentNumber) : ''}" placeholder="Opcional">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Forma de Pagto.</label>
                                <select name="paymentMethod" class="w-full py-3 px-4 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${themeColor}-500 outline-none text-sm font-bold text-gray-700 transition-all shadow-sm">
                                    <option value="">-- Escolha --</option>
                                    ${paymentMethodOptions}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-5 md:p-6 rounded-2xl md:rounded-3xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 md:gap-6 md:items-center">
                        <label class="flex items-center justify-between cursor-pointer group flex-1">
                            <div>
                                <span class="block text-sm md:text-base font-black text-gray-900 uppercase tracking-wide group-active:text-${themeColor}-600 transition-colors">Marcar como ${isPayable ? 'Pago' : 'Recebido'}</span>
                                <span class="block text-[9px] md:text-[10px] font-bold text-gray-400 mt-0.5 uppercase tracking-widest">Confirma a liquidação.</span>
                            </div>
                            <div class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="status" id="status-toggle" class="sr-only peer" ${item?.status === 'paid' ? 'checked' : ''}>
                                <div class="w-14 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-${themeColor}-500 shadow-inner"></div>
                            </div>
                        </label>
                        
                        <div id="payment-date-wrapper" class="${item?.status === 'paid' ? '' : 'hidden'} animate-fade-in border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
                            <label class="block text-[9px] md:text-[10px] font-black text-${themeColor}-600 uppercase tracking-widest mb-1.5 text-center md:text-left">Data da Baixa Bancária</label>
                            <input type="date" name="paymentDate" 
                                class="w-full py-3 px-4 bg-${themeColor}-50 border-2 border-${themeColor}-200 text-${themeColor}-800 rounded-xl text-sm font-black text-center md:text-left outline-none focus:ring-2 focus:ring-${themeColor}-500/50 shadow-sm transition-all" 
                                value="${item?.paymentDate || new Date().toISOString().split('T')[0]}">
                        </div>
                    </div>
                    
                    <div class="h-2"></div>
                </div>

                <div class="p-4 md:p-5 border-t border-gray-200 bg-white md:bg-gray-50 flex gap-3 flex-shrink-0 z-20 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] md:rounded-b-3xl">
                    ${item ? `
                    <button type="button" id="modal-delete-btn" class="w-16 md:w-20 flex-shrink-0 py-3.5 bg-red-50 text-red-600 font-bold rounded-xl active:scale-95 transition-all text-xl flex items-center justify-center border border-red-100 shadow-sm hover:bg-red-100">
                        <i class="bi bi-trash3-fill"></i>
                    </button>` : ''}
                    
                    <button type="submit" class="flex-1 py-3.5 bg-${themeColor}-600 text-white font-black uppercase tracking-wider text-sm rounded-xl hover:bg-${themeColor}-700 shadow-lg shadow-${themeColor}-500/20 active:scale-95 transition-all flex items-center justify-center gap-2">
                        <i class="bi bi-save2-fill text-lg"></i> <span>${item ? 'Salvar Lançamento' : 'Confirmar Lançamento'}</span>
                    </button>
                </div>
            </form>
        </div>
    `;
    
    modal.style.display = 'flex';
    requestAnimationFrame(() => {
        modal.classList.remove('opacity-0');
        const wrapper = modal.querySelector('#modal-content-wrapper');
        if(wrapper) {
            wrapper.classList.remove('translate-y-full', 'md:scale-95', 'md:opacity-0');
            wrapper.classList.add('translate-y-0', 'md:scale-100', 'md:opacity-100');
        }
    });

    const form = modal.querySelector('#financial-form');
    let currentMode = 'single'; 
    let installmentsCount = 2;

    const modalDeleteBtn = form.querySelector('#modal-delete-btn');
    if (modalDeleteBtn) {
        modalDeleteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (navigator.vibrate) navigator.vibrate(30);
            closeGenericModal();
            setTimeout(() => handleSmartDelete(type, item), 300);
        });
    }

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
            summaryText.innerHTML = '<span class="text-[10px] md:text-xs text-indigo-400 font-bold">Digite o valor total...</span>';
            return;
        }

        if (currentMode === 'installment') {
            const installmentVal = totalVal / installmentsCount;
            summaryText.innerHTML = `
                <div>
                    <span class="block text-[8px] md:text-[10px] text-indigo-400 uppercase tracking-widest font-black mb-0.5">Simulação do Parcelamento</span>
                    <span class="font-black text-sm md:text-base text-indigo-700 block leading-tight">${installmentsCount}x de ${formatCurrency(installmentVal)}</span>
                    <span class="text-[9px] md:text-[10px] text-indigo-500 font-bold mt-1 block bg-indigo-50/50 p-1 rounded">Total da Dívida: ${formatCurrency(totalVal)}</span>
                </div>
            `;
        } else if (currentMode === 'repeat') {
            const totalFinal = totalVal * installmentsCount;
            summaryText.innerHTML = `
                <div>
                    <span class="block text-[8px] md:text-[10px] text-indigo-400 uppercase tracking-widest font-black mb-0.5">Geração Recorrente Fixa</span>
                    <span class="font-black text-sm md:text-base text-indigo-700 block leading-tight">${installmentsCount} meses de ${formatCurrency(totalVal)}</span>
                    <span class="text-[9px] md:text-[10px] text-indigo-500 font-bold mt-1 block bg-indigo-50/50 p-1 rounded">Comprometimento: ${formatCurrency(totalFinal)}</span>
                </div>
            `;
        }
    };

    form.addEventListener('click', (e) => {
        const btnMode = e.target.closest('.mode-btn');
        if (btnMode && !item) {
            e.preventDefault(); 
            if (navigator.vibrate) navigator.vibrate(15);
            
            form.querySelectorAll('.mode-btn').forEach(b => {
                b.classList.remove('bg-white', 'text-gray-900', 'shadow-sm');
                b.classList.add('text-gray-500');
            });
            
            btnMode.classList.add('bg-white', 'text-gray-900', 'shadow-sm');
            btnMode.classList.remove('text-gray-500');

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
            if (navigator.vibrate) navigator.vibrate(10);
            let val = parseInt(installmentsInput.value) || 2;
            if (val > 2) { installmentsInput.value = val - 1; updateSummary(); }
        }

        const plusBtn = e.target.closest('#btn-plus');
        if (plusBtn && installmentsInput) {
            e.preventDefault();
            if (navigator.vibrate) navigator.vibrate(10);
            let val = parseInt(installmentsInput.value) || 2;
            if (val < 60) { installmentsInput.value = val + 1; updateSummary(); }
        }
    });

    amountInput.addEventListener('input', updateSummary);
    if(installmentsInput) installmentsInput.addEventListener('input', updateSummary);

    statusToggle.addEventListener('change', () => {
        if (navigator.vibrate) navigator.vibrate(20);
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
        btnSubmit.innerHTML = '<div class="loader mx-auto h-5 w-5 border-2 border-white border-t-transparent"></div>';

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

        // SOLUÇÃO DEFINITIVA DO GHOST RECORD
        const resolvedEstablishmentId = formData.get('establishmentId');
        if (!resolvedEstablishmentId) {
            showNotification('Atenção', 'Selecione uma Unidade válida para o lançamento.', 'warning');
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = originalText;
            return;
        }

        const payload = {
            companyId: state.companyId, // INJEÇÃO DA COMPANY ID (TENANT)
            establishmentId: resolvedEstablishmentId, 
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
            closeGenericModal();
            fetchAndDisplayData();
        } catch (error) {
            showNotification('Erro', error.message || 'Erro ao salvar', 'error');
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = originalText;
        }
    });
}