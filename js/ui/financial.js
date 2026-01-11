// js/ui/financial.js

import * as financialApi from '../api/financial.js';
import { state } from '../state.js';
import { showNotification, showConfirmation } from '../components/modal.js';

const contentDiv = document.getElementById('content');

// Estado Local
let localState = { 
    payables: [], 
    receivables: [], 
    natures: [], 
    costCenters: [],
    
    // Filtros
    currentTab: 'payables', // 'payables' ou 'receivables'
    statusFilter: 'pending', // 'pending', 'paid', 'all'
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    filterNaturezaId: 'all',
    filterCostCenterId: 'all',
    
    // UI Control
    isFilterOpen: false
};

// Listeners globais para limpeza
let financialPageEventListener = null;
let genericModalEventListener = null;

// --- FUNÇÕES AUXILIARES ---

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
    if (!dateStr) return { day: '--', month: '---' };
    const date = new Date(dateStr + 'T00:00:00');
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('pt-BR', { month: 'short' }).toUpperCase().replace('.', '');
    return { day, month, full: date.toLocaleDateString('pt-BR') };
}

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

// --- GESTÃO DE NATUREZAS E CENTROS DE CUSTO ---

function renderHierarchyList(container, items, type) {
    if (!container) return;
    if (!items || items.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-400 text-sm py-4">Nenhum item criado.</p>';
        return;
    }
    const renderNode = (item, level = 0) => {
        const padding = level * 16;
        return `
            <div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100 mb-1" style="margin-left: ${padding}px;">
                <span class="text-sm font-medium text-gray-700">${item.name}</span>
                <button data-action="delete-${type}" data-id="${item.id}" class="text-red-400 hover:text-red-600 text-xs font-semibold px-2 py-1 bg-red-50 rounded hover:bg-red-100 transition-colors">
                    Excluir
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
    const title = isNature ? 'Naturezas Financeiras' : 'Centros de Custo';
    const api = isNature ? financialApi.getNatures : financialApi.getCostCenters;
    const createApi = isNature ? financialApi.createNature : financialApi.createCostCenter;
    const collectionName = isNature ? 'natures' : 'costCenters';

    modal.innerHTML = `
        <div class="modal-content max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
            <div class="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 class="text-lg font-bold text-gray-800">Gerir ${title}</h2>
                <button data-action="close-modal" data-target="genericModal" class="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            
            <div class="p-6">
                <form id="hierarchyForm" class="space-y-4 mb-6">
                    <div>
                        <label class="block text-xs font-semibold text-gray-500 mb-1">Nome do Item</label>
                        <input type="text" id="itemName" placeholder="Ex: Manutenção, Vendas..." required class="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-gray-500 mb-1">Sub-categoria de (Opcional)</label>
                        <select id="itemParent" class="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                            <option value="">-- Categoria Principal --</option>
                        </select>
                    </div>
                    <button type="submit" class="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-md">
                        Adicionar Item
                    </button>
                </form>

                <div class="border-t border-gray-100 pt-4">
                    <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Itens Cadastrados</h3>
                    <div id="hierarchyList" class="space-y-1 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
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
        
        // Atualiza select
        const currentSelection = parentSelect.value;
        parentSelect.innerHTML = '<option value="">-- Categoria Principal --</option>';
        const renderOption = (item, level = 0) => {
            const prefix = '\u00A0\u00A0'.repeat(level) + (level > 0 ? '↳ ' : '');
            parentSelect.innerHTML += `<option value="${item.id}">${prefix}${item.name}</option>`;
            item.children.forEach(child => renderOption(child, level + 1));
        };
        hierarchy.forEach(root => renderOption(root));
        parentSelect.value = currentSelection; // Tenta manter seleção
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
            await fetchAndDisplayData(); // Atualiza tela principal se necessário
            showNotification('Sucesso', 'Item adicionado.', 'success');
        } catch (error) {
            showNotification('Erro', error.message, 'error');
        }
    });
}

// --- FUNÇÃO DE INICIALIZAÇÃO E LAYOUT ---

export async function loadFinancialPage() {
    // 1. Renderiza a estrutura base da tela (Mobile-First)
    renderBaseLayout();

    // 2. Configura os Listeners
    setupEventListeners();

    // 3. Carrega dados iniciais
    await fetchAndDisplayData();
}

function renderBaseLayout() {
    contentDiv.innerHTML = `
        <div class="flex flex-col h-[calc(100vh-80px)] md:h-auto bg-gray-50">
            
            <div class="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-20">
                <div class="max-w-5xl mx-auto px-4 py-3">
                    <div class="flex justify-between items-center mb-3">
                        <h1 class="text-xl font-bold text-gray-800">Financeiro</h1>
                        <div class="flex gap-2">
                            <button id="toggle-filter-btn" class="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors relative">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                            </button>
                            <button id="settings-btn" class="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            </button>
                        </div>
                    </div>

                    <div id="filter-panel" class="hidden overflow-hidden transition-all duration-300 mb-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div class="col-span-2 md:col-span-1">
                                <label class="text-xs font-semibold text-gray-500 ml-1">De</label>
                                <input type="date" id="filterStartDate" value="${localState.startDate}" class="w-full p-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
                            </div>
                            <div class="col-span-2 md:col-span-1">
                                <label class="text-xs font-semibold text-gray-500 ml-1">Até</label>
                                <input type="date" id="filterEndDate" value="${localState.endDate}" class="w-full p-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
                            </div>
                            <div class="col-span-2 md:col-span-1">
                                <label class="text-xs font-semibold text-gray-500 ml-1">Natureza</label>
                                <select id="filterNaturezaId" class="w-full p-2 border border-gray-200 rounded-lg text-sm bg-white outline-none">
                                    <option value="all">Todas</option>
                                </select>
                            </div>
                            <div class="col-span-2 md:col-span-1">
                                <label class="text-xs font-semibold text-gray-500 ml-1">Centro Custo</label>
                                <select id="filterCostCenterId" class="w-full p-2 border border-gray-200 rounded-lg text-sm bg-white outline-none">
                                    <option value="all">Todos</option>
                                </select>
                            </div>
                            <div class="col-span-2 md:col-span-4 mt-2">
                                <div class="flex bg-white p-1 rounded-lg border border-gray-200">
                                    <button data-status="pending" class="status-filter-btn flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors bg-indigo-100 text-indigo-700">Pendentes</button>
                                    <button data-status="paid" class="status-filter-btn flex-1 py-1.5 text-xs font-semibold rounded-md text-gray-500 hover:bg-gray-50">Baixados</button>
                                    <button data-status="all" class="status-filter-btn flex-1 py-1.5 text-xs font-semibold rounded-md text-gray-500 hover:bg-gray-50">Todos</button>
                                </div>
                            </div>
                            <button id="apply-filter-btn" class="col-span-2 md:col-span-4 mt-2 w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm active:scale-95 transition-transform">
                                Aplicar Filtros
                            </button>
                        </div>
                    </div>

                    <div class="flex p-1 bg-gray-100 rounded-xl">
                        <button id="tab-receivables" class="flex-1 py-2 text-sm font-bold rounded-lg shadow-sm bg-white text-green-700 transition-all">
                            A Receber
                        </button>
                        <button id="tab-payables" class="flex-1 py-2 text-sm font-medium rounded-lg text-gray-500 hover:text-gray-700 transition-all">
                            A Pagar
                        </button>
                    </div>
                </div>
            </div>

            <div class="flex-1 overflow-y-auto px-4 py-6 max-w-5xl mx-auto w-full space-y-6">
                
                <div id="summary-section" class="grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-in">
                    </div>

                <div id="list-container" class="space-y-3 pb-20">
                    <div class="text-center py-10"><div class="loader mx-auto"></div></div>
                </div>
            </div>

            <button id="fab-add" class="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-indigo-700 hover:scale-105 transition-all z-40">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            </button>

        </div>
    `;
}

function setupEventListeners() {
    // Toggle Filtros
    document.getElementById('toggle-filter-btn').addEventListener('click', () => {
        const panel = document.getElementById('filter-panel');
        const btn = document.getElementById('toggle-filter-btn');
        localState.isFilterOpen = !localState.isFilterOpen;
        
        if (localState.isFilterOpen) {
            panel.classList.remove('hidden');
            btn.classList.add('bg-indigo-100', 'text-indigo-600');
        } else {
            panel.classList.add('hidden');
            btn.classList.remove('bg-indigo-100', 'text-indigo-600');
        }
    });

    // Botão Settings
    document.getElementById('settings-btn').addEventListener('click', openSettingsModal);

    // Botão Add (FAB)
    document.getElementById('fab-add').addEventListener('click', () => {
        // Abre modal baseado na aba atual
        const type = localState.currentTab === 'payables' ? 'payable' : 'receivable';
        openFinancialModal(type);
    });

    // Abas
    const tabRec = document.getElementById('tab-receivables');
    const tabPay = document.getElementById('tab-payables');

    tabRec.addEventListener('click', () => switchTab('receivables'));
    tabPay.addEventListener('click', () => switchTab('payables'));

    // Filtros de Status
    document.querySelectorAll('.status-filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // UI Update
            document.querySelectorAll('.status-filter-btn').forEach(b => {
                b.classList.remove('bg-indigo-100', 'text-indigo-700');
                b.classList.add('text-gray-500');
            });
            e.target.classList.add('bg-indigo-100', 'text-indigo-700');
            e.target.classList.remove('text-gray-500');
            
            localState.statusFilter = e.target.dataset.status;
        });
    });

    // Botão Aplicar Filtros
    document.getElementById('apply-filter-btn').addEventListener('click', () => {
        localState.startDate = document.getElementById('filterStartDate').value;
        localState.endDate = document.getElementById('filterEndDate').value;
        localState.filterNaturezaId = document.getElementById('filterNaturezaId').value;
        localState.filterCostCenterId = document.getElementById('filterCostCenterId').value;
        
        // Fecha painel
        document.getElementById('toggle-filter-btn').click();
        
        fetchAndDisplayData();
    });

    // Listener Global de Cliques (Deletar, Editar, Baixar)
    if (financialPageEventListener) document.body.removeEventListener('click', financialPageEventListener);
    
    financialPageEventListener = (e) => {
        const target = e.target.closest('button[data-action]');
        if (!target) return;

        const { action, type, id } = target.dataset;
        // Evita disparar em outras telas se o ID coincidir
        if (!document.getElementById('list-container')) return;

        if (action === 'edit') {
            const itemData = JSON.parse(target.dataset.item.replace(/&apos;/g, "'"));
            openFinancialModal(type, itemData);
        }
        else if (action === 'delete') handleDelete(type, id);
        else if (action === 'mark-as-paid') handleMarkAsPaid(type, id);
        else if (action === 'manage-natures') openHierarchyModal('nature');
        else if (action === 'manage-cost-centers') openHierarchyModal('cost-center');
    };
    document.body.addEventListener('click', financialPageEventListener);

    // Listener de Modais Genéricos
    if (genericModalEventListener) document.getElementById('genericModal').removeEventListener('click', genericModalEventListener);
    
    genericModalEventListener = (e) => {
        const target = e.target.closest('button[data-action^="delete-"]');
        if (target) {
            const type = target.dataset.action.split('-')[1];
            handleDeleteHierarchyItem(type, target.dataset.id);
        }
    };
    document.getElementById('genericModal').addEventListener('click', genericModalEventListener);
}

function switchTab(tab) {
    localState.currentTab = tab;
    
    const tabRec = document.getElementById('tab-receivables');
    const tabPay = document.getElementById('tab-payables');
    const fab = document.getElementById('fab-add');

    if (tab === 'receivables') {
        tabRec.classList.add('bg-white', 'text-green-700', 'shadow-sm');
        tabRec.classList.remove('text-gray-500');
        
        tabPay.classList.remove('bg-white', 'text-red-700', 'shadow-sm');
        tabPay.classList.add('text-gray-500');
        
        fab.className = "fixed bottom-6 right-6 w-14 h-14 bg-green-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-green-700 hover:scale-105 transition-all z-40";
    } else {
        tabPay.classList.add('bg-white', 'text-red-700', 'shadow-sm');
        tabPay.classList.remove('text-gray-500');
        
        tabRec.classList.remove('bg-white', 'text-green-700', 'shadow-sm');
        tabRec.classList.add('text-gray-500');

        fab.className = "fixed bottom-6 right-6 w-14 h-14 bg-red-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-red-700 hover:scale-105 transition-all z-40";
    }

    renderLists();
}

// --- BUSCA E RENDERIZAÇÃO DE DADOS ---

async function fetchAndDisplayData() {
    const listContainer = document.getElementById('list-container');
    listContainer.innerHTML = '<div class="loader mx-auto my-10"></div>';

    try {
        // Carrega Natures/CostCenters se ainda não tiver
        if (localState.natures.length === 0) {
            const [natures, costCenters] = await Promise.all([
                financialApi.getNatures(state.establishmentId),
                financialApi.getCostCenters(state.establishmentId)
            ]);
            localState.natures = natures;
            localState.costCenters = costCenters;
            populateFilterSelects();
        }

        const filters = { 
            startDate: localState.startDate, 
            endDate: localState.endDate, 
            establishmentId: state.establishmentId 
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
        listContainer.innerHTML = `<p class="text-center text-red-500 mt-10">Erro ao carregar: ${error.message}</p>`;
    }
}

function populateFilterSelects() {
    const buildOptions = (items) => {
        let optionsHTML = '<option value="all">Todas</option>';
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
    
    // Restaura seleção se houver
    if(natSelect) natSelect.value = localState.filterNaturezaId;
    if(ccSelect) ccSelect.value = localState.filterCostCenterId;
}

function renderSummary() {
    const section = document.getElementById('summary-section');
    if (!section) return;

    // Filtra apenas pelo status (Pendente/Pago) selecionado ou Tudo para o resumo?
    // Geralmente resumo mostra o total do período independente do status, ou segue o filtro.
    // Vamos fazer o resumo seguir o filtro de Data, mas mostrar totais Pendentes vs Realizados.
    
    // Totais Receitas
    const totalRec = localState.receivables.reduce((acc, i) => acc + i.amount, 0);
    const paidRec = localState.receivables.filter(i => i.status === 'paid').reduce((acc, i) => acc + i.amount, 0);
    const pendingRec = totalRec - paidRec;

    // Totais Despesas
    const totalPay = localState.payables.reduce((acc, i) => acc + i.amount, 0);
    const paidPay = localState.payables.filter(i => i.status === 'paid').reduce((acc, i) => acc + i.amount, 0);
    const pendingPay = totalPay - paidPay;

    // Saldo
    const balance = paidRec - paidPay;

    section.innerHTML = `
        <div class="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 col-span-2 md:col-span-1">
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">A Receber</p>
            <p class="text-xl font-bold text-green-600">${formatCurrency(pendingRec)}</p>
        </div>
        <div class="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 col-span-2 md:col-span-1">
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">A Pagar</p>
            <p class="text-xl font-bold text-red-500">${formatCurrency(pendingPay)}</p>
        </div>
        <div class="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 col-span-2 md:col-span-1">
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Realizado</p>
            <p class="text-xl font-bold ${balance >= 0 ? 'text-indigo-600' : 'text-orange-500'}">${formatCurrency(balance)}</p>
        </div>
    `;
}

function renderLists() {
    const container = document.getElementById('list-container');
    if (!container) return;

    const isReceivable = localState.currentTab === 'receivables';
    const rawList = isReceivable ? localState.receivables : localState.payables;
    
    // Filtro de Status
    let filteredList = rawList;
    if (localState.statusFilter !== 'all') {
        filteredList = rawList.filter(item => item.status === localState.statusFilter);
    }

    // Ordenação por data
    filteredList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    if (filteredList.length === 0) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12 text-gray-400 opacity-60">
                <svg class="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <p>Nenhum lançamento encontrado.</p>
            </div>
        `;
        return;
    }

    const natureMap = new Map(localState.natures.map(n => [n.id, n.name]));
    const typeStr = isReceivable ? 'receivable' : 'payable';

    container.innerHTML = filteredList.map(item => {
        const dateObj = formatDateDisplay(item.dueDate);
        const isPaid = item.status === 'paid';
        const amountClass = isPaid ? 'text-gray-400' : (isReceivable ? 'text-green-600' : 'text-red-500');
        const natureName = item.naturezaId ? natureMap.get(item.naturezaId) || 'Geral' : 'Geral';
        const itemDataStr = JSON.stringify(item).replace(/'/g, "&apos;");

        // Card Moderno
        return `
        <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 relative overflow-hidden group transition-all hover:shadow-md">
            
            <div class="absolute left-0 top-0 bottom-0 w-1 ${isPaid ? 'bg-gray-300' : (isReceivable ? 'bg-green-500' : 'bg-red-500')}"></div>

            <div class="flex-shrink-0 flex flex-col items-center justify-center bg-gray-50 rounded-xl w-14 h-14 border border-gray-100">
                <span class="text-lg font-bold text-gray-800 leading-none">${dateObj.day}</span>
                <span class="text-[10px] font-bold text-gray-400 uppercase leading-none mt-1">${dateObj.month}</span>
            </div>

            <div class="flex-1 min-w-0">
                <h3 class="font-bold text-gray-800 truncate text-sm md:text-base ${isPaid ? 'line-through text-gray-400' : ''}">${item.description}</h3>
                <div class="flex items-center gap-2 mt-1">
                    <span class="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium truncate max-w-[120px]">
                        ${natureName}
                    </span>
                    ${isPaid ? '<span class="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">Baixado</span>' : ''}
                </div>
            </div>

            <div class="text-right">
                <p class="font-bold text-sm md:text-lg ${amountClass}">${formatCurrency(item.amount)}</p>
                
                <div class="flex justify-end gap-3 mt-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    ${!isPaid ? `
                        <button data-action="mark-as-paid" data-type="${typeStr}" data-id="${item.id}" class="text-gray-400 hover:text-green-500" title="Baixar">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                        </button>
                    ` : ''}
                    <button data-action="edit" data-type="${typeStr}" data-item='${itemDataStr}' class="text-gray-400 hover:text-blue-500" title="Editar">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    </button>
                    <button data-action="delete" data-type="${typeStr}" data-id="${item.id}" class="text-gray-400 hover:text-red-500" title="Excluir">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

// --- AÇÕES CRUD ---

async function handleMarkAsPaid(type, id) {
    const today = new Date().toISOString().split('T')[0];
    try {
        await (type === 'payable' ? financialApi.markAsPaidPayable(id, today) : financialApi.markAsPaidReceivable(id, today));
        showNotification('Sucesso', 'Lançamento baixado!', 'success');
        await fetchAndDisplayData();
    } catch (error) {
        showNotification('Erro', error.message, 'error');
    }
}

async function handleDelete(type, id) {
    const confirmed = await showConfirmation('Excluir Lançamento', 'Tem certeza? Essa ação não pode ser desfeita.');
    if (confirmed) {
        try {
            await (type === 'payable' ? financialApi.deletePayable(id) : financialApi.deleteReceivable(id));
            showNotification('Sucesso', 'Lançamento excluído.', 'success');
            await fetchAndDisplayData();
        } catch (error) {
            showNotification('Erro', error.message, 'error');
        }
    }
}

async function handleDeleteHierarchyItem(type, id) {
    const isNature = type === 'nature';
    const deleteApi = isNature ? financialApi.deleteNature : financialApi.deleteCostCenter;
    
    const confirmed = await showConfirmation('Apagar Item', 'Tem a certeza? Apagar um item principal também apagará os seus sub-itens.');
    if(confirmed) {
        try {
            await deleteApi(id);
            // Reabre modal para atualizar lista
            openHierarchyModal(type === 'nature' ? 'nature' : 'cost-center');
        } catch(error) {
            showNotification('Erro', error.message, 'error');
        }
    }
}

// --- MODAIS (Formulário Principal e Settings) ---

function openSettingsModal() {
    const modal = document.getElementById('genericModal');
    modal.innerHTML = `
        <div class="modal-content max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden">
            <div class="p-6 text-center">
                <h2 class="text-xl font-bold text-gray-800 mb-4">Configurações</h2>
                <div class="space-y-3">
                    <button data-action="manage-natures" class="w-full py-3 px-4 bg-indigo-50 text-indigo-700 font-semibold rounded-xl hover:bg-indigo-100 flex items-center justify-between group">
                        <span>Naturezas Financeiras</span>
                        <svg class="w-5 h-5 text-indigo-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    </button>
                    <button data-action="manage-cost-centers" class="w-full py-3 px-4 bg-blue-50 text-blue-700 font-semibold rounded-xl hover:bg-blue-100 flex items-center justify-between group">
                        <span>Centros de Custo</span>
                        <svg class="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    </button>
                </div>
                <button type="button" data-action="close-modal" data-target="genericModal" class="mt-6 text-gray-400 hover:text-gray-600 font-medium text-sm">Fechar</button>
            </div>
        </div>
    `;
    modal.style.display = 'flex';
}

function openFinancialModal(type, item = null) {
    const modal = document.getElementById('genericModal');
    const isPayable = type === 'payable';
    const title = `${item ? 'Editar' : 'Nova'} ${isPayable ? 'Despesa' : 'Receita'}`;
    const colorClass = isPayable ? 'red' : 'green';

    // Helpers para opções
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

    modal.innerHTML = `
        <div class="modal-content max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden w-full m-4">
            <div class="bg-${colorClass}-50 px-6 py-4 border-b border-${colorClass}-100 flex justify-between items-center">
                <h2 class="text-xl font-bold text-${colorClass}-800">${title}</h2>
                <button type="button" data-action="close-modal" data-target="genericModal" class="text-${colorClass}-400 hover:text-${colorClass}-600 text-2xl">&times;</button>
            </div>
            
            <form id="financial-form" class="p-6 space-y-4">
                <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Descrição</label>
                    <input type="text" name="description" required class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-${colorClass}-500 outline-none transition-all" value="${item?.description || ''}" placeholder="Ex: Conta de Luz, Venda Balcão...">
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Valor (R$)</label>
                        <input type="number" step="0.01" name="amount" required class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-${colorClass}-500 outline-none font-bold text-gray-700" value="${item?.amount || ''}">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Vencimento</label>
                        <input type="date" name="dueDate" required class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-${colorClass}-500 outline-none" value="${item?.dueDate || new Date().toISOString().split('T')[0]}">
                    </div>
                </div>

                ${!item ? `
                <div class="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" id="toggle-installments" class="w-4 h-4 text-${colorClass}-600 rounded focus:ring-${colorClass}-500">
                        <span class="text-sm font-semibold text-gray-700">Repetir / Parcelar</span>
                    </label>
                    <div id="installments-container" class="hidden mt-3">
                        <label class="block text-xs text-gray-500 mb-1">Número de Parcelas (Mensais)</label>
                        <input type="number" name="installments" min="2" max="36" value="2" class="w-full p-2 border border-gray-200 rounded-lg">
                    </div>
                </div>` : ''}

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Natureza</label>
                        <select name="naturezaId" class="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${colorClass}-500 outline-none text-sm">
                            ${buildOptions(localState.natures, item?.naturezaId)}
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Centro de Custo</label>
                        <select name="centroDeCustoId" class="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-${colorClass}-500 outline-none text-sm">
                            ${buildOptions(localState.costCenters, item?.centroDeCustoId)}
                        </select>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Observações</label>
                    <textarea name="notes" rows="2" class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-${colorClass}-500 outline-none text-sm">${item?.notes || ''}</textarea>
                </div>

                <div class="border-t border-gray-100 pt-4 mt-2">
                    <label class="flex items-center justify-between cursor-pointer group">
                        <span class="text-sm font-bold text-gray-700 group-hover:text-${colorClass}-700 transition-colors">Já foi Pago/Recebido?</span>
                        <div class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" name="status" id="status-toggle" class="sr-only peer" ${item?.status === 'paid' ? 'checked' : ''}>
                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${colorClass}-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-${colorClass}-600"></div>
                        </div>
                    </label>
                    
                    <div id="payment-date-wrapper" class="${item?.status === 'paid' ? '' : 'hidden'} mt-3 bg-${colorClass}-50 p-3 rounded-lg animate-fade-in">
                        <label class="block text-xs font-bold text-${colorClass}-700 mb-1">Data do Pagamento</label>
                        <input type="date" name="paymentDate" class="w-full p-2 border border-${colorClass}-200 rounded-lg text-sm" value="${item?.paymentDate || new Date().toISOString().split('T')[0]}">
                    </div>
                </div>

                <div class="pt-4 flex gap-3">
                    <button type="button" data-action="close-modal" data-target="genericModal" class="flex-1 py-3 bg-gray-100 text-gray-600 font-semibold rounded-xl hover:bg-gray-200">Cancelar</button>
                    <button type="submit" class="flex-1 py-3 bg-${colorClass}-600 text-white font-semibold rounded-xl hover:bg-${colorClass}-700 shadow-lg active:scale-95 transition-transform">Salvar</button>
                </div>
            </form>
        </div>`;
    modal.style.display = 'flex';

    // Lógica do Form
    const form = modal.querySelector('#financial-form');
    const statusToggle = form.querySelector('#status-toggle');
    const paymentWrapper = form.querySelector('#payment-date-wrapper');
    const paymentInput = form.querySelector('[name="paymentDate"]');
    
    // Toggle Parcelas (apenas se criando novo)
    if (!item) {
        const toggleInstallments = form.querySelector('#toggle-installments');
        const installmentsDiv = form.querySelector('#installments-container');
        toggleInstallments.addEventListener('change', () => {
            installmentsDiv.classList.toggle('hidden', !toggleInstallments.checked);
        });
    }

    // Toggle Status Pagamento
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
        const formData = new FormData(form);
        const isPaid = statusToggle.checked;
        
        const payload = {
            description: formData.get('description'),
            amount: parseFloat(formData.get('amount')),
            dueDate: formData.get('dueDate'),
            naturezaId: formData.get('naturezaId') || null,
            centroDeCustoId: formData.get('centroDeCustoId') || null,
            notes: formData.get('notes'),
            status: isPaid ? 'paid' : 'pending',
            paymentDate: isPaid ? formData.get('paymentDate') : null,
            establishmentId: state.establishmentId
        };

        // Parcelas
        const installmentsInput = formData.get('installments');
        if (!item && installmentsInput && parseInt(installmentsInput) > 1) {
            payload.installments = parseInt(installmentsInput);
        } else {
            payload.installments = 1;
        }

        try {
            if (item) {
                await (isPayable ? financialApi.updatePayable(item.id, payload) : financialApi.updateReceivable(item.id, payload));
                showNotification('Sucesso', 'Atualizado com sucesso!', 'success');
            } else {
                await (isPayable ? financialApi.createPayable(payload) : financialApi.createReceivable(payload));
                showNotification('Sucesso', 'Criado com sucesso!', 'success');
            }
            document.getElementById('genericModal').style.display = 'none';
            fetchAndDisplayData();
        } catch (error) {
            showNotification('Erro', error.message, 'error');
        }
    });
}