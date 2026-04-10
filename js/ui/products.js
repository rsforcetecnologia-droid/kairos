// js/ui/products.js

// --- 1. IMPORTAÇÕES ---
import * as productsApi from '../api/products.js';
import * as categoriesApi from '../api/categories.js';
import * as suppliersApi from '../api/suppliers.js';
import { getHierarchy } from '../api/establishments.js';
import { state } from '../state.js';
import { showNotification, showConfirmation, showGenericModal } from '../components/modal.js';
import { logAction } from '../api/audit.js';
import { auth } from '../firebase-config.js';
import { escapeHTML, resizeAndCompressImage } from '../utils.js'; 

// --- 2. CONSTANTES E ESTADO LOCAL ---
const contentDiv = document.getElementById('content');

let localState = {
    products: [],
    categories: [],
    suppliers: [],
    hierarchyCache: [],
    
    // UI State
    currentTab: 'catalogo', 
    
    // Filtros Catálogo
    stockFilter: 'all', 
    searchQuery: '',
    filterCategoryId: 'all',
    isAdvancedFilterOpen: false,
    
    selectedIds: new Set()
};

let pageEventListener = null;

function getCurrentUserForLog() {
    const user = auth.currentUser;
    if (!user) return { uid: 'unknown', name: 'Desconhecido' };
    return { uid: user.uid, name: user.displayName || user.email };
}

function getActiveEstablishmentsFromHeader() {
    const checkboxes = document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');
    if (checkboxes.length > 0) {
        return Array.from(checkboxes).map(cb => cb.value);
    }
    return [state.establishmentId];
}

// --- FUNÇÃO DE SUPORTE PARA DATAS SEGURAS ---
function parseSafeDate(dateVal) {
    if (!dateVal) return new Date();
    if (dateVal._seconds) return new Date(dateVal._seconds * 1000);
    if (dateVal.seconds) return new Date(dateVal.seconds * 1000);
    return new Date(dateVal);
}

// --- 3. RENDERIZAÇÃO DO LAYOUT PRINCIPAL ---

export async function loadProductsPage() {
    localState.selectedIds.clear();
    localState.currentTab = 'catalogo';
    
    try {
        const payload = await getHierarchy();
        localState.hierarchyCache = payload.matrizes || [];
    } catch (e) { console.warn("Erro ao buscar lojas", e); }

    renderBaseLayout();
    setupEventListeners();
    await fetchAndDisplayData();
}

function renderBaseLayout() {
    contentDiv.innerHTML = `
        <section class="h-full flex flex-col p-2 md:p-4 md:pl-6 w-full relative">
            
            <div class="mb-4 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex-shrink-0">
                <nav class="flex overflow-x-auto custom-scrollbar">
                    <button data-main-tab="catalogo" class="flex-1 py-4 px-6 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${localState.currentTab === 'catalogo' ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50' : 'border-transparent text-gray-500 hover:text-indigo-500 hover:bg-gray-50'}">
                        <i class="bi bi-box-seam mr-2"></i> Catálogo de Produtos
                    </button>
                    <button data-main-tab="movimentacoes" class="flex-1 py-4 px-6 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${localState.currentTab === 'movimentacoes' ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50' : 'border-transparent text-gray-500 hover:text-indigo-500 hover:bg-gray-50'}">
                        <i class="bi bi-arrow-left-right mr-2"></i> Estoque e Movimentações
                    </button>
                </nav>
            </div>

            <div id="main-tab-content" class="flex-1 flex flex-col min-h-0 relative">
                </div>
        </section>
    `;
    
    renderCurrentTab();
}

function renderCurrentTab() {
    const container = document.getElementById('main-tab-content');
    if (!container) return;

    if (localState.currentTab === 'catalogo') {
        container.innerHTML = `
            <div id="batch-action-bar" class="hidden absolute top-0 left-0 right-0 z-30 bg-gray-900 text-white rounded-xl shadow-2xl p-2.5 items-center justify-between animate-fade-in-down mx-2">
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
                <div class="flex bg-gray-200/80 p-1 rounded-xl border border-gray-300 w-full md:w-auto shadow-inner hidden md:flex opacity-0 pointer-events-none">
                    <button class="flex-1 md:w-32 py-1.5 text-xs font-bold rounded-lg transition-all flex justify-center items-center gap-2">Space</button>
                </div>

                <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end ml-auto">
                    <button data-action="manage-categories" class="py-1.5 px-3 bg-white text-gray-700 border border-gray-300 font-bold rounded-lg hover:bg-gray-50 transition shadow-sm flex items-center gap-2 text-xs flex-1 md:flex-none justify-center">
                        <i class="bi bi-tags text-sm"></i> Categorias
                    </button>
                    <button data-action="open-product-modal" data-product="{}" class="py-1.5 px-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-sm flex items-center gap-2 text-xs flex-1 md:flex-none justify-center">
                        <i class="bi bi-plus-lg text-sm"></i> Novo Produto
                    </button>
                </div>
            </div>

            <div id="summary-section" class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 flex-shrink-0"></div>

            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2 w-full flex-shrink-0">
                <div class="flex gap-2 overflow-x-auto pb-1 w-full md:w-auto custom-scrollbar">
                    <button data-status="all" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${localState.stockFilter === 'all' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-white text-gray-600 hover:bg-gray-50'}">Todos</button>
                    <button data-status="ok" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${localState.stockFilter === 'ok' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-white text-gray-600 hover:bg-gray-50'}">Em Dia</button>
                    <button data-status="alert" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${localState.stockFilter === 'alert' ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-white text-gray-600 hover:bg-gray-50'}">Alerta</button>
                    <button data-status="empty" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${localState.stockFilter === 'empty' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-white text-gray-600 hover:bg-gray-50'}">Esgotados</button>
                </div>

                <div class="flex items-center gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-1 md:pb-0">
                    <div class="relative flex-shrink-0 w-full md:w-64">
                        <i class="bi bi-search absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                        <input type="text" id="searchInput" value="${localState.searchQuery}" placeholder="Pesquisar produto..." class="w-full pl-8 p-1.5 bg-white border border-gray-200 shadow-sm rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all">
                    </div>
                    <button id="toggle-filter-btn" class="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition shadow-sm flex items-center gap-1.5 text-xs flex-shrink-0 ${localState.isAdvancedFilterOpen ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : ''}">
                        <i class="bi bi-funnel"></i> Filtros
                    </button>
                </div>
            </div>

            <div id="filter-panel" class="${localState.isAdvancedFilterOpen ? 'block' : 'hidden'} mb-3 bg-white p-3 rounded-xl border border-gray-200 shadow-sm animate-fade-in flex-shrink-0">
                <div class="flex flex-col md:flex-row items-end gap-3">
                    <div class="w-full md:w-64">
                        <label class="block text-[9px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Categoria</label>
                        <select id="filterCategoryId" class="w-full p-2 border border-gray-200 rounded-lg text-xs bg-gray-50 focus:bg-white outline-none focus:ring-1 focus:ring-indigo-500">
                            <option value="all">Todas as categorias</option>
                        </select>
                    </div>
                    <div class="flex gap-2 w-full md:w-auto">
                        <button id="clear-filters-btn" class="w-full md:w-auto px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors text-xs">Limpar</button>
                        <button id="apply-filter-btn" class="w-full md:w-auto px-5 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-sm hover:bg-indigo-700 active:scale-95 transition-all text-xs">Aplicar</button>
                    </div>
                </div>
            </div>

            <div id="productsList" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20 mt-1 flex-1 content-start overflow-y-auto custom-scrollbar pr-1">
                ${renderSkeletonList(8)}
            </div>

            <button data-action="open-product-modal" data-product="{}" class="md:hidden fixed bottom-20 right-4 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40">
                <i class="bi bi-plus-lg text-xl"></i>
            </button>
        `;
        populateCategoryFilter();
        filterAndRenderProducts();
    } 
    else if (localState.currentTab === 'movimentacoes') {
        const today = new Date().toISOString().split('T')[0];
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];

        const prodOptions = (localState.products || []).map(p => `<option value="${p.id}">${escapeHTML(p.name)}</option>`).join('');
        const catOptions = (localState.categories || []).map(c => `<option value="${c.id}">${escapeHTML(c.name)}</option>`).join('');

        container.innerHTML = `
            <div class="flex flex-col h-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div class="bg-white px-5 py-4 border-b border-gray-100 flex flex-col md:flex-row md:justify-between md:items-center gap-4 flex-shrink-0">
                    <div>
                        <h2 class="text-base font-bold text-gray-800 flex items-center gap-2"><i class="bi bi-arrow-left-right text-indigo-500"></i> Histórico de Estoque</h2>
                        <p class="text-[11px] text-gray-500 mt-0.5">Acompanhe entradas e saídas de mercadoria consolidadas na rede.</p>
                    </div>
                    <button data-action="open-new-movement-modal" class="w-full md:w-auto py-2 px-5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-2 text-xs">
                        <i class="bi bi-plus-circle"></i> Nova Movimentação
                    </button>
                </div>

                <div class="bg-gray-50 px-5 py-2.5 border-b border-gray-200 flex-shrink-0">
                    <div class="flex flex-wrap md:flex-nowrap gap-3 items-end">
                        <div class="w-full md:w-32">
                            <label class="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Início</label>
                            <input type="date" id="reportStartDate" value="${thirtyDaysAgoStr}" class="w-full px-2 py-1.5 border border-gray-300 rounded-md text-xs outline-none focus:border-indigo-500 bg-white h-[30px]">
                        </div>
                        <div class="w-full md:w-32">
                            <label class="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Fim</label>
                            <input type="date" id="reportEndDate" value="${today}" class="w-full px-2 py-1.5 border border-gray-300 rounded-md text-xs outline-none focus:border-indigo-500 bg-white h-[30px]">
                        </div>
                        <div class="w-full md:w-auto flex-1">
                            <label class="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Filtrar Produto</label>
                            <select id="productFilterReport" class="w-full px-2 py-1.5 border border-gray-300 rounded-md text-xs outline-none focus:border-indigo-500 bg-white h-[30px]">
                                <option value="all">Todos os produtos</option>${prodOptions}
                            </select>
                        </div>
                        <div class="w-full md:w-auto flex-1 hidden md:block">
                            <label class="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Categoria</label>
                            <select id="categoryFilterReport" class="w-full px-2 py-1.5 border border-gray-300 rounded-md text-xs outline-none focus:border-indigo-500 bg-white h-[30px]">
                                <option value="all">Todas as categorias</option>${catOptions}
                            </select>
                        </div>
                        <div class="w-full md:w-auto">
                            <button id="btn-generate-report" class="bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold px-4 py-1.5 rounded-md hover:bg-indigo-100 transition-colors text-xs w-full md:w-auto h-[30px] flex items-center justify-center gap-1.5">
                                <i class="bi bi-search"></i> Buscar
                            </button>
                        </div>
                    </div>
                </div>
                
                <div id="report-results" class="flex-1 overflow-hidden flex flex-col bg-white relative">
                    <div class="flex items-center justify-center h-full p-8 text-center">
                        <div class="loader"></div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('btn-generate-report').addEventListener('click', generateStockReport);
        generateStockReport(); 
    }
}


function setupEventListeners() {
    const globalApplyBtn = document.getElementById('multi-context-apply');
    if (globalApplyBtn) {
        globalApplyBtn.removeEventListener('click', fetchAndDisplayData);
        globalApplyBtn.addEventListener('click', () => {
            setTimeout(fetchAndDisplayData, 100);
        });
    }

    if (pageEventListener) contentDiv.removeEventListener('click', pageEventListener);
    
    pageEventListener = e => {
        const mainTabBtn = e.target.closest('[data-main-tab]');
        if (mainTabBtn) {
            localState.currentTab = mainTabBtn.dataset.mainTab;
            renderBaseLayout(); 
            return;
        }

        if (e.target.classList.contains('status-filter-btn')) {
            const status = e.target.dataset.status;
            localState.stockFilter = status;
            
            document.querySelectorAll('.status-filter-btn').forEach(b => {
                b.classList.remove('bg-indigo-50', 'text-indigo-700', 'border-indigo-200', 'bg-green-50', 'text-green-700', 'border-green-200', 'bg-orange-50', 'text-orange-700', 'border-orange-200', 'bg-red-50', 'text-red-700', 'border-red-200');
                b.classList.add('bg-white', 'text-gray-600', 'border-gray-200');
            });
            
            if (status === 'ok') e.target.classList.add('bg-green-50', 'text-green-700', 'border-green-200');
            else if (status === 'alert') e.target.classList.add('bg-orange-50', 'text-orange-700', 'border-orange-200');
            else if (status === 'empty') e.target.classList.add('bg-red-50', 'text-red-700', 'border-red-200');
            else e.target.classList.add('bg-indigo-50', 'text-indigo-700', 'border-indigo-200');
            
            e.target.classList.remove('bg-white', 'text-gray-600', 'border-gray-200');
            filterAndRenderProducts();
            return;
        }

        const cardOrBtn = e.target.closest('[data-action="open-product-modal"]');
        if (cardOrBtn) {
            e.preventDefault();
            let prodData = {};
            if (cardOrBtn.dataset.product) {
                try { prodData = JSON.parse(cardOrBtn.dataset.product); } catch (err) {}
            }
            openProductModal(prodData);
            return;
        }

        const catBtn = e.target.closest('[data-action="manage-categories"]');
        if (catBtn) {
            e.preventDefault();
            openCategoryModal();
            return;
        }

        const newMovBtn = e.target.closest('[data-action="open-new-movement-modal"]');
        if (newMovBtn) {
            e.preventDefault();
            openNewMovementModal();
            return;
        }

        const checkbox = e.target.closest('.product-checkbox');
        if (checkbox) {
             const id = checkbox.dataset.id;
             if (checkbox.checked) localState.selectedIds.add(id); 
             else localState.selectedIds.delete(id);
             
             updateBatchActionBar();
             e.stopPropagation();
             return;
        }

        const cancelSelectionBtn = e.target.closest('#cancel-selection-btn');
        if (cancelSelectionBtn) {
            localState.selectedIds.clear();
            document.querySelectorAll('.product-checkbox').forEach(cb => cb.checked = false);
            updateBatchActionBar();
            return;
        }

        const batchDeleteBtn = e.target.closest('#batch-delete-btn');
        if (batchDeleteBtn) {
            handleBatchDelete();
            return;
        }
    };
    
    contentDiv.addEventListener('click', pageEventListener);

    contentDiv.addEventListener('input', e => {
        if (e.target.id === 'searchInput') {
            localState.searchQuery = e.target.value.toLowerCase();
            filterAndRenderProducts();
        }
    });

    contentDiv.addEventListener('click', e => {
        const toggleFilterBtn = e.target.closest('#toggle-filter-btn');
        if (toggleFilterBtn) {
            const panel = document.getElementById('filter-panel');
            localState.isAdvancedFilterOpen = !localState.isAdvancedFilterOpen;
            
            if (localState.isAdvancedFilterOpen) {
                panel.classList.remove('hidden');
                toggleFilterBtn.classList.add('bg-indigo-50', 'text-indigo-700', 'border-indigo-200');
                toggleFilterBtn.classList.remove('bg-white', 'text-gray-600', 'border-gray-200');
            } else {
                panel.classList.add('hidden');
                toggleFilterBtn.classList.remove('bg-indigo-50', 'text-indigo-700', 'border-indigo-200');
                toggleFilterBtn.classList.add('bg-white', 'text-gray-600', 'border-gray-200');
            }
        }

        const clearBtn = e.target.closest('#clear-filters-btn');
        if(clearBtn) {
            localState.filterCategoryId = 'all';
            document.getElementById('filterCategoryId').value = 'all';
            filterAndRenderProducts();
        }

        const applyBtn = e.target.closest('#apply-filter-btn');
        if(applyBtn) {
            localState.filterCategoryId = document.getElementById('filterCategoryId').value;
            document.getElementById('toggle-filter-btn').click(); 
            filterAndRenderProducts();
        }
    });
}

// --- 4. COMUNICAÇÃO DE DADOS E RENDERIZAÇÃO DA LISTA ---

async function fetchAndDisplayData() {
    const activeHeaderEstablishments = getActiveEstablishmentsFromHeader();
    
    try {
        const prodPromises = activeHeaderEstablishments.map(id => productsApi.getProducts(id));
        const catPromises = activeHeaderEstablishments.map(id => categoriesApi.getCategories(id, 'products'));
        
        const [prodResults, catResults] = await Promise.all([
            Promise.all(prodPromises),
            Promise.all(catPromises)
        ]);
        
        const prodMap = new Map();
        prodResults.flat().filter(Boolean).forEach(p => prodMap.set(p.id, p));
        localState.products = Array.from(prodMap.values());
        state.products = localState.products; 
        
        const catMap = new Map();
        catResults.flat().filter(Boolean).forEach(c => catMap.set(c.id, c));
        localState.categories = Array.from(catMap.values());
        state.categories = localState.categories;

        if (localState.currentTab === 'catalogo') {
            populateCategoryFilter();
            filterAndRenderProducts(); 
        } else if (localState.currentTab === 'movimentacoes') {
            generateStockReport();
        }

        localState.suppliers = []; 
        activeHeaderEstablishments.forEach(async id => {
            try {
                let supps = [];
                if (typeof suppliersApi.getAll === 'function') supps = await suppliersApi.getAll(id);
                else if (typeof suppliersApi.getSuppliers === 'function') supps = await suppliersApi.getSuppliers(id);
                
                supps.forEach(s => {
                    if(!localState.suppliers.find(existing => existing.id === s.id)) {
                        localState.suppliers.push(s);
                    }
                });
                state.suppliers = localState.suppliers;
            } catch (err) {
                console.warn(`Aviso: Falha ao carregar fornecedores em background.`, err);
            }
        });
        
    } catch (error) {
        console.error("Erro detalhado ao carregar produtos:", error);
        const listDiv = document.getElementById('productsList');
        if(listDiv) listDiv.innerHTML = '<div class="col-span-full py-16 text-center"><p class="text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-100 inline-block text-sm"><i class="bi bi-exclamation-triangle"></i> Erro ao carregar dados do servidor.</p></div>';
    }
}

function populateCategoryFilter() {
    const categorySelect = document.getElementById('filterCategoryId');
    if(categorySelect && localState.categories) {
        categorySelect.innerHTML = '<option value="all">Todas as categorias</option>';
        localState.categories.forEach(c => {
            const option = document.createElement('option');
            option.value = c.id; 
            option.textContent = escapeHTML(c.name);
            if(localState.filterCategoryId === c.id) option.selected = true;
            categorySelect.appendChild(option);
        });
    }
}

function updateBatchActionBar() {
    const bar = document.getElementById('batch-action-bar');
    const countSpan = document.getElementById('selected-count');
    const count = localState.selectedIds.size;

    if (!bar || !countSpan) return;

    if (count > 0) {
        countSpan.textContent = count;
        bar.classList.remove('hidden');
        bar.classList.add('flex');
    } else {
        bar.classList.add('hidden');
        bar.classList.remove('flex');
    }
}

function renderKPIs(filteredList) {
    const section = document.getElementById('summary-section');
    if (!section) return;

    let total = filteredList.length;
    let ok = 0;
    let alert = 0;
    let empty = 0;

    filteredList.forEach(p => {
        const stock = p.currentStock || 0;
        const min = p.minStock || 0;
        
        if (stock <= 0) empty++;
        else if (min > 0 && stock <= min) alert++;
        else if (min > 0 && stock <= min * 1.2) alert++;
        else ok++;
    });

    section.innerHTML = `
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Catálogo</span>
            <span class="text-xl font-black text-gray-800 mt-0.5">${total}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Estoque OK</span>
            <span class="text-xl font-bold text-emerald-600 mt-0.5">${ok}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Alerta</span>
            <span class="text-xl font-bold text-orange-500 mt-0.5">${alert}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-red-500 uppercase tracking-widest">Esgotados</span>
            <span class="text-xl font-bold text-red-600 mt-0.5">${empty}</span>
        </div>
    `;
}

function filterAndRenderProducts() {
    const listDiv = document.getElementById('productsList');
    if (!listDiv) return;

    if (!localState.products || localState.products.length === 0) {
        listDiv.innerHTML = renderSkeletonList(8); 
        return;
    }

    const activeHeaderEstablishments = getActiveEstablishmentsFromHeader();
    
    const filtered = localState.products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(localState.searchQuery);
        
        const stock = p.currentStock || 0;
        const min = p.minStock || 0;
        let matchesStatus = true;
        
        if (localState.stockFilter === 'ok') matchesStatus = stock > 0 && (min === 0 || stock > min * 1.2);
        if (localState.stockFilter === 'alert') matchesStatus = min > 0 && stock > 0 && stock <= min * 1.2;
        if (localState.stockFilter === 'empty') matchesStatus = stock <= 0;
        
        const matchesCategory = localState.filterCategoryId === "all" || p.categoryId === localState.filterCategoryId;
        
        const pUnits = p.accessibleIn && p.accessibleIn.length > 0 ? p.accessibleIn : [p.establishmentId || state.establishmentId];
        const matchesBranch = activeHeaderEstablishments.some(id => pUnits.includes(id));

        return matchesSearch && matchesStatus && matchesCategory && matchesBranch;
    });
    
    renderKPIs(filtered);
    listDiv.innerHTML = renderProductsListHTML(filtered);
}

// --- RENDERS DE COMPONENTES ---

function renderSkeletonList(count = 8) {
    let skeletonHTML = '';
    for (let i = 0; i < count; i++) {
        skeletonHTML += `
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm flex items-center p-3 animate-pulse h-[74px]">
            <div class="w-10 h-10 rounded-md bg-gray-200 flex-shrink-0 mr-3"></div>
            <div class="flex-1 space-y-2">
                <div class="h-2.5 bg-gray-200 rounded w-3/4"></div>
                <div class="h-2 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        `;
    }
    return skeletonHTML;
}

function renderProductsListHTML(productsList) {
    if (productsList.length === 0) {
        return `
            <div class="col-span-full flex flex-col items-center justify-center py-16">
                <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-box-seam text-xl text-gray-300"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-600 mb-1">Nenhum produto encontrado</h3>
                <p class="text-[10px] text-gray-400">Tente ajustar os filtros ou verificar as unidades no topo.</p>
            </div>
        `;
    }

    const categoryMap = new Map((localState.categories || []).map(c => [c.id, c.name]));

    return productsList.map(product => {
        const safeName = escapeHTML(product.name);
        const safeCategoryName = escapeHTML(categoryMap.get(product.categoryId) || 'Sem Categoria');
        
        const photoSrc = product.photo || `https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(product.name.charAt(0))}`;
        const productDataString = JSON.stringify(product).replace(/'/g, "&apos;");

        const unitCount = product.accessibleIn ? product.accessibleIn.length : 1;
        const isSelected = localState.selectedIds.has(product.id);
        const formattedPrice = product.price !== undefined ? parseFloat(product.price).toFixed(2) : '0.00';
        
        const stock = product.currentStock || 0;
        const min = product.minStock || 0;
        
        let stockIndicatorColor = 'bg-emerald-500';
        let isInactive = false;
        
        if (stock <= 0) {
            stockIndicatorColor = 'bg-red-500';
            isInactive = true;
        } else if (min > 0 && stock <= min * 1.2) {
            stockIndicatorColor = 'bg-orange-500';
        }

        return `
            <div class="product-card relative bg-white rounded-xl border ${isSelected ? 'border-indigo-400 ring-1 ring-indigo-200 shadow-md bg-indigo-50/20' : 'border-gray-200'} shadow-sm flex items-center p-3 cursor-pointer transition-all hover:shadow-md hover:border-indigo-300 ${isInactive ? 'opacity-70 bg-gray-50' : ''}" 
                 data-action="open-product-modal" data-product='${productDataString}'>
                
                <div class="absolute top-2 right-2 z-10 flex flex-col gap-2 items-center" onclick="event.stopPropagation()">
                    <input type="checkbox" data-id="${product.id}" class="product-checkbox w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${isSelected ? 'checked' : ''}>
                </div>

                <div class="relative flex-shrink-0 mr-3">
                    <img src="${photoSrc}" alt="${safeName}" class="w-12 h-12 rounded-md object-cover border border-gray-100 shadow-sm">
                    <span class="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-white rounded-full ${stockIndicatorColor}" title="Estoque: ${stock}"></span>
                </div>
                
                <div class="flex-1 min-w-0 pr-4">
                    <h3 class="text-xs font-bold text-gray-800 truncate leading-tight">
                        ${safeName}
                    </h3>
                    <p class="text-[10px] text-gray-500 truncate mt-0.5">${safeCategoryName}</p>
                    
                    <div class="flex items-center justify-between mt-1.5">
                        <span class="text-[11px] font-black text-indigo-600">R$ ${formattedPrice}</span>
                        <div class="flex gap-1">
                            <span class="text-[8px] font-semibold text-gray-600 bg-gray-100 px-1 py-0.5 rounded border border-gray-200 flex items-center gap-1"><i class="bi bi-box2"></i> ${stock}x</span>
                            ${unitCount > 1 
                                ? `<span class="text-[8px] font-bold bg-indigo-50 text-indigo-700 px-1 py-0.5 rounded border border-indigo-100 flex items-center gap-1"><i class="bi bi-diagram-3"></i> ${unitCount}</span>` 
                                : ``
                            }
                        </div>
                    </div>
                </div>
            </div>`;
    }).join('');
}

// --- 5. LÓGICA DE CATEGORIAS (MODAL) ---
async function handleCategoryFormSubmit(e) {
    e.preventDefault();
    const form = e.target.closest('#categoryForm');
    const categoryNameInput = form.querySelector('#categoryName');
    const name = categoryNameInput.value;
    if (!name) return;
    
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = '...';

    try {
        const accessibleIn = localState.hierarchyCache.reduce((acc, curr) => {
            acc.push(curr.id);
            if(curr.branches) curr.branches.forEach(b => acc.push(b.id));
            return acc;
        }, []);
        
        if(accessibleIn.length === 0) accessibleIn.push(state.establishmentId);

        await categoriesApi.createCategory({ 
            establishmentId: state.establishmentId, 
            name,
            accessibleIn
        }, 'products');
        
        logAction(state.establishmentId, getCurrentUserForLog(), 'Categorias (Produtos)', 'Criou', `Criou categoria: ${name}`);

        categoryNameInput.value = '';
        showNotification('Sucesso', 'Categoria criada!', 'success');
        await fetchAndDisplayCategoriesInModal();
        await fetchAndDisplayData(); 
    } catch (error) {
        showNotification('Erro', `Não foi possível criar a categoria: ${error.message}`, 'error');
    } finally {
        btn.disabled = false; btn.textContent = 'Adicionar';
    }
}

async function handleDeleteCategory(categoryId) {
    const confirmed = await showConfirmation('Apagar Categoria', 'Tem a certeza? Os produtos nesta categoria ficarão sem categoria.');
    if (confirmed) {
        try {
            await categoriesApi.deleteCategory(categoryId, 'products');
            logAction(state.establishmentId, getCurrentUserForLog(), 'Categorias (Produtos)', 'Excluiu', `Excluiu uma categoria (ID: ${categoryId})`);

            showNotification('Sucesso', 'Categoria apagada.', 'success');
            await fetchAndDisplayCategoriesInModal();
            await fetchAndDisplayData(); 
        } catch (error) {
            showNotification('Erro', 'Não foi possível apagar a categoria.', 'error');
        }
    }
}

async function fetchAndDisplayCategoriesInModal() {
    const listDiv = document.getElementById('categoryList');
    if (!listDiv) return;
    listDiv.innerHTML = '<div class="loader mx-auto my-4"></div>';
    try {
        const categories = await categoriesApi.getCategories(state.establishmentId, 'products');
        localState.categories = categories; 
        listDiv.innerHTML = '';
        if (categories.length > 0) {
            listDiv.innerHTML = categories.map(cat => `
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded mb-1">
                    <span class="text-sm font-medium text-gray-700">${escapeHTML(cat.name)}</span>
                    <button data-action="delete-category" data-id="${cat.id}" class="text-red-500 hover:text-red-700 font-semibold text-xs bg-red-50 px-2 py-1 rounded">Apagar</button>
                </div>`).join('');
        } else {
            listDiv.innerHTML = '<p class="text-center text-gray-500 text-sm">Nenhuma categoria criada.</p>';
        }
    } catch (error) {
        listDiv.innerHTML = `<p class="text-red-500 text-center text-sm">Erro ao carregar categorias.</p>`;
    }
}

function openCategoryModal() {
    const contentHTML = `
        <div class="space-y-4">
            <div class="mb-4 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                <p class="text-xs text-indigo-800 mb-3 font-medium">As categorias de produtos ficarão disponíveis para toda a rede de lojas.</p>
                <form id="categoryForm" class="flex flex-col sm:flex-row gap-3 sm:items-end">
                    <div class="flex-1 w-full">
                        <label for="categoryName" class="block text-[10px] font-bold text-indigo-900 uppercase tracking-wider mb-1">Nova Categoria</label>
                        <input type="text" id="categoryName" placeholder="Ex: Shampoos, Ferramentas..." required class="w-full p-2 border border-indigo-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
                    </div>
                    <button type="submit" class="w-full sm:w-auto py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-sm text-sm">Adicionar</button>
                </form>
            </div>
            <div id="categoryList" class="space-y-1 max-h-64 overflow-y-auto p-2 border border-gray-200 rounded-xl custom-scrollbar"></div>
        </div>
    `;

    showGenericModal({
        title: "Categorias de Produtos",
        contentHTML: contentHTML,
        maxWidth: 'max-w-lg'
    });

    const modalElement = document.getElementById('genericModal');
    if (modalElement) {
        const categoryForm = modalElement.querySelector('#categoryForm');
        if (categoryForm) {
             categoryForm.addEventListener('submit', handleCategoryFormSubmit);
             modalElement.addEventListener('click', (e) => {
                 const button = e.target.closest('button[data-action="delete-category"]');
                 if (button) {
                     e.preventDefault(); 
                     handleDeleteCategory(button.dataset.id);
                 }
             });
        }
    }

    fetchAndDisplayCategoriesInModal();
}

// --- 6. LANÇAMENTO RÁPIDO DE MOVIMENTAÇÃO (NOVO MODAL NA ABA) ---

function openNewMovementModal() {
    const prodOptions = (localState.products || []).map(p => `<option value="${p.id}">${escapeHTML(p.name)} (Estoque: ${p.currentStock || 0})</option>`).join('');

    // Gera opções de lojas para que o usuário diga ONDE está entrando esse estoque
    const estOptions = localState.hierarchyCache.reduce((acc, matriz) => {
        acc.push(`<option value="${matriz.id}">🏢 ${escapeHTML(matriz.name)}</option>`);
        if(matriz.branches) {
            matriz.branches.forEach(b => acc.push(`<option value="${b.id}">📍 ${escapeHTML(b.name)}</option>`));
        }
        return acc;
    }, []).join('');

    const contentHTML = `
        <div class="space-y-4 p-2">
            <div class="bg-indigo-50 p-4 rounded-xl border border-indigo-100 mb-4">
                <p class="text-sm text-indigo-800 font-medium">Registre entradas de mercadorias ou saídas/perdas manuais no estoque.</p>
            </div>
            <form id="newMovementForm" class="space-y-4">
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="md:col-span-2">
                        <label class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Unidade de Estoque <span class="text-red-500">*</span></label>
                        <select id="movEstablishmentId" required class="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500">
                            ${estOptions}
                        </select>
                        <p class="text-[10px] text-gray-500 mt-1">Em qual loja este produto está entrando/saindo?</p>
                    </div>

                    <div class="md:col-span-2">
                        <label class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Produto <span class="text-red-500">*</span></label>
                        <select id="movProductId" required class="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500">
                            <option value="">Selecione o produto...</option>
                            ${prodOptions}
                        </select>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Tipo de Movimento</label>
                        <div class="flex gap-2">
                            <label class="flex-1 flex items-center justify-center p-2 border border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition-colors has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50 has-[:checked]:text-emerald-700">
                                <input type="radio" name="movType" value="in" checked class="sr-only">
                                <i class="bi bi-arrow-down-circle mr-2"></i> <span class="font-bold text-sm">Entrada</span>
                            </label>
                            <label class="flex-1 flex items-center justify-center p-2 border border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition-colors has-[:checked]:border-red-500 has-[:checked]:bg-red-50 has-[:checked]:text-red-700">
                                <input type="radio" name="movType" value="out" class="sr-only">
                                <i class="bi bi-arrow-up-circle mr-2"></i> <span class="font-bold text-sm">Saída</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Quantidade <span class="text-red-500">*</span></label>
                        <input type="number" id="movAmount" required min="1" placeholder="Ex: 10" class="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 font-bold">
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Motivo / Observação <span class="text-red-500">*</span></label>
                    <input type="text" id="movReason" required placeholder="Ex: Compra com fornecedor, Quebra, Validade..." class="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500">
                </div>

                <div class="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
                    <button type="button" onclick="document.getElementById('genericModal').style.display='none'" class="px-5 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">Cancelar</button>
                    <button type="submit" class="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors flex items-center gap-2">
                        <i class="bi bi-check2"></i> Confirmar Lançamento
                    </button>
                </div>
            </form>
        </div>
    `;

    showGenericModal({
        title: "Lançar Movimentação",
        contentHTML: contentHTML,
        maxWidth: 'max-w-lg'
    });

    // Como o select de lojas pode não ter a loja logada como primeira, forçamos o default:
    const estSelect = document.getElementById('movEstablishmentId');
    if (estSelect) estSelect.value = state.establishmentId;

    const form = document.getElementById('newMovementForm');
    form.onsubmit = async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        const productId = document.getElementById('movProductId')?.value;
        const targetEstablishmentId = document.getElementById('movEstablishmentId')?.value;
        const type = form.querySelector('input[name="movType"]:checked')?.value;
        const amount = parseInt(document.getElementById('movAmount')?.value, 10);
        const reason = document.getElementById('movReason')?.value.trim();

        if(!productId || !amount || amount <= 0 || !reason || !targetEstablishmentId) {
            showNotification('Erro', 'Preencha todos os campos corretamente.', 'warning');
            return;
        }

        const change = type === 'in' ? amount : -amount;

        btn.disabled = true;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm mr-2"></span> Salvando...';

        try {
            await productsApi.adjustStock(productId, { 
                change, 
                reason,
                establishmentId: targetEstablishmentId 
            });
            
            const prodName = localState.products.find(p => p.id === productId)?.name || 'Produto';
            logAction(targetEstablishmentId, getCurrentUserForLog(), 'Estoque', 'Ajuste Manual', `Lançou movimentação (${change > 0 ? '+' : ''}${change}) para ${prodName}`);
            
            showNotification('Sucesso', 'Movimentação registrada com sucesso!', 'success');
            document.getElementById('genericModal').style.display = 'none';
            
            await fetchAndDisplayData();
        } catch (error) {
            showNotification('Erro', error.message, 'error');
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
    };
}


// --- 7. LÓGICA DE PRODUTOS (MODAL CADASTRO PRO) ---

function generateUnitCheckboxesHTML(selectedIds = []) {
    if (!localState.hierarchyCache || localState.hierarchyCache.length === 0) {
        return `
            <input type="hidden" name="accessibleIn" value="${state.establishmentId}">
            <div class="bg-gray-50 p-3 rounded border text-sm text-gray-500">
                <i class="bi bi-info-circle mr-1"></i> Exclusivo desta unidade.
            </div>`;
    }

    let html = '<div class="space-y-1 mt-2 max-h-40 overflow-y-auto p-3 border border-indigo-100 rounded-lg bg-indigo-50/30 custom-scrollbar">';
    
    localState.hierarchyCache.forEach(matriz => {
        const isMatrizSelected = selectedIds.includes(matriz.id) || (selectedIds.length === 0 && matriz.id === state.establishmentId);
        
        html += `
            <label class="flex items-center space-x-3 py-1.5 cursor-pointer hover:bg-white rounded px-2 transition-colors">
                <input type="checkbox" name="accessibleIn" value="${matriz.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${isMatrizSelected ? 'checked' : ''}>
                <span class="text-sm font-bold text-gray-800">🏢 ${escapeHTML(matriz.name)}</span>
            </label>
        `;
        
        if (matriz.branches && matriz.branches.length > 0) {
            matriz.branches.forEach(branch => {
                const isBranchSelected = selectedIds.includes(branch.id) || (selectedIds.length === 0 && branch.id === state.establishmentId);
                html += `
                    <label class="flex items-center space-x-3 py-1.5 ml-6 cursor-pointer hover:bg-white rounded px-2 transition-colors border-l-2 border-indigo-100 pl-4">
                        <input type="checkbox" name="accessibleIn" value="${branch.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${isBranchSelected ? 'checked' : ''}>
                        <span class="text-sm font-medium text-gray-600">📍 ${escapeHTML(branch.name)}</span>
                    </label>
                `;
            });
        }
    });
    
    html += '</div>';
    return html;
}

// SALVAMENTO NATIVO DE PRODUTOS (Totalmente blindado com IDs e fallbacks)
async function handleProductFormSubmit(e) {
    e.preventDefault(); // IMPEDE O RECARREGAMENTO DA PÁGINA (F5)
    
    const productId = document.getElementById('productId')?.value || '';
    const saveButton = document.querySelector('#productForm button[type="submit"]');
    
    const currentStock = parseInt(document.getElementById('productCurrentStock')?.value || '0', 10);
    const minStock = parseInt(document.getElementById('productMinStock')?.value || '0', 10);
    const maxStock = parseInt(document.getElementById('productMaxStock')?.value || '0', 10);

    const selectedSupplierElements = document.querySelectorAll('#selectedSuppliersList .selected-supplier-item');
    const selectedSupplierIds = Array.from(selectedSupplierElements).map(el => el.dataset.id);

    const checkedUnits = Array.from(document.querySelectorAll('#productForm input[name="accessibleIn"]:checked')).map(cb => cb.value);
    const accessibleIn = checkedUnits.length > 0 ? checkedUnits : [state.establishmentId];

    const nameEl = document.getElementById('productName');
    const priceEl = document.getElementById('productPrice');

    if (!nameEl?.value || !priceEl?.value) {
        showNotification('Aviso', 'Preencha o Nome e o Preço do produto.', 'warning');
        return;
    }

    const productData = {
        establishmentId: state.establishmentId,
        accessibleIn: accessibleIn,
        name: nameEl.value.trim(),
        price: parseFloat(priceEl.value),
        costPrice: parseFloat(document.getElementById('productCostPrice')?.value) || 0,
        commissionRate: parseFloat(document.getElementById('productCommissionRate')?.value) || 0,
        currentStock: isNaN(currentStock) ? 0 : currentStock, 
        minStock: isNaN(minStock) ? 0 : minStock,
        maxStock: isNaN(maxStock) ? 0 : maxStock,
        categoryId: document.getElementById('productCategory')?.value || null,
        photo: document.getElementById('productPhotoBase64')?.value || '',
        supplierIds: selectedSupplierIds 
    };

    const originalText = saveButton ? saveButton.innerHTML : 'Salvar';
    if (saveButton) {
        saveButton.disabled = true;
        saveButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';
    }

    try {
        if (productId) {
            await productsApi.updateProduct(productId, productData);
            logAction(state.establishmentId, getCurrentUserForLog(), 'Produtos', 'Editou', `Editou o produto: ${productData.name}`);
            showNotification('Sucesso', 'Produto atualizado com sucesso!', 'success');
        } else {
            await productsApi.createProduct(productData);
            logAction(state.establishmentId, getCurrentUserForLog(), 'Produtos', 'Criou', `Criou novo produto: ${productData.name}`);
            showNotification('Sucesso', 'Produto adicionado à rede!', 'success');
        }
        
        document.getElementById('genericModal').style.display = 'none';
        await fetchAndDisplayData(); 
    } catch (error) {
        showNotification('Erro', error.message, 'error');
        if (saveButton) {
            saveButton.disabled = false;
            saveButton.innerHTML = originalText;
        }
    }
}

function openProductModal(product = null) {
    const modal = document.getElementById('genericModal');
    const categories = localState.categories || []; 
    const allSuppliers = localState.suppliers || [];
    
    const safeName = escapeHTML(product?.name || '');
    const safePrice = product?.price !== undefined ? product.price : '';
    const safeCost = product?.costPrice !== undefined ? product.costPrice : '';
    const safeComm = product?.commissionRate !== undefined ? product.commissionRate : '';
    const safeCurrent = product?.currentStock || 0;
    const safeMin = product?.minStock || 0;
    const safeMax = product?.maxStock || 0;
    
    const safeTitle = product?.id ? safeName : 'Novo Produto';

    const categoryOptions = categories.map(c => 
        `<option value="${c.id}" ${product?.categoryId === c.id ? 'selected' : ''}>${escapeHTML(c.name)}</option>`
    ).join('');

    const photoSrc = product?.photo || `https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(safeName ? safeName.charAt(0) : 'P')}`;

    const modalHTML = `
        <div class="modal-content max-w-4xl p-0 overflow-hidden flex flex-col max-h-[90vh]"> 
            <div class="modal-header px-6 py-4 flex justify-between items-center border-b bg-white flex-shrink-0">
                <h2 class="text-xl font-bold text-gray-800">${safeTitle}</h2>
                <button type="button" data-action="close-modal" class="text-gray-400 hover:text-red-500 transition-colors text-3xl leading-none">&times;</button>
            </div>
            
            <div class="modal-tabs px-6 border-b flex items-center overflow-x-auto bg-gray-50 flex-shrink-0 custom-scrollbar">
                <button type="button" class="tab-link active whitespace-nowrap font-semibold py-3 px-4 border-b-2 border-indigo-600 text-indigo-600 transition-colors" data-tab="dados-produto">1. Dados Básicos</button>
                <button type="button" class="tab-link whitespace-nowrap font-semibold py-3 px-4 border-b-2 border-transparent text-gray-500 hover:text-indigo-500 transition-colors" data-tab="estoque-produto">2. Estoque & Ajustes</button>
                <button type="button" class="tab-link whitespace-nowrap font-semibold py-3 px-4 border-b-2 border-transparent text-gray-500 hover:text-indigo-500 transition-colors" data-tab="fornecedores-produto">3. Fornecedores</button>
            </div>
            
            <form id="productForm" class="flex-1 flex flex-col overflow-hidden">
                <div class="modal-body p-6 bg-white flex-1 overflow-y-auto custom-scrollbar relative"> 
                    <input type="hidden" id="productId" value="${product?.id || ''}">
                    <input type="hidden" id="productPhotoBase64" value="${product?.photo || ''}">
                    
                    <div id="dados-produto" class="tab-content active space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div class="md:col-span-1 space-y-4">
                                <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                                    <label class="block text-sm font-bold text-gray-700 mb-3">Foto do Produto</label>
                                    <div class="relative group mx-auto w-32 h-32 mb-4 cursor-pointer" id="productPhotoContainer">
                                        <img id="productPhotoPreview" src="${photoSrc}" alt="Foto" class="w-32 h-32 rounded-lg object-cover border-4 border-gray-50 shadow-md transition-all group-hover:brightness-75">
                                        <div id="productPhotoButtonOverlay" class="absolute inset-0 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                                            <i class="bi bi-camera-fill text-white text-3xl drop-shadow-md"></i>
                                        </div>
                                    </div>
                                    <input type="file" id="productPhotoInput" class="hidden" accept="image/*">
                                    <button type="button" id="productPhotoButton" class="text-indigo-600 text-sm font-semibold hover:text-indigo-800 transition-colors w-full">Alterar Imagem</button>
                                </div>
                            </div>

                            <div class="md:col-span-2 space-y-4">
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div class="form-group sm:col-span-2">
                                        <label for="productName" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-tag text-indigo-500 mr-1"></i> Nome do Produto <span class="text-red-500">*</span></label>
                                        <input type="text" id="productName" value="${safeName}" required placeholder="Ex: Shampoo Revitalizante 300ml" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors text-lg font-semibold text-gray-800">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="productCategory" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-folder2-open text-amber-500 mr-1"></i> Categoria</label>
                                        <select id="productCategory" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors">
                                            <option value="">Sem Categoria</option>
                                            ${categoryOptions}
                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <label for="productPrice" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-currency-dollar text-emerald-500 mr-1"></i> Preço de Venda (R$) <span class="text-red-500">*</span></label>
                                        <input type="number" id="productPrice" step="0.01" value="${safePrice}" required placeholder="0.00" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 focus:bg-white transition-colors font-bold text-gray-800">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="productCostPrice" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-graph-down-arrow text-red-400 mr-1"></i> Custo Médio (R$)</label>
                                        <input type="number" id="productCostPrice" step="0.01" value="${safeCost}" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-400 bg-gray-50 focus:bg-white transition-colors" placeholder="0.00">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="productCommissionRate" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-percent text-blue-500 mr-1"></i> Comissão ao Vender (%)</label>
                                        <input type="number" id="productCommissionRate" step="0.1" min="0" value="${safeComm}" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-colors" placeholder="Ex: 10">
                                    </div>
                                </div>
                                
                                <div class="pt-2 border-t border-gray-100">
                                    <label class="block text-sm font-bold text-indigo-900 mb-1 flex items-center gap-2"><i class="bi bi-diagram-3"></i> Lojas que vendem o produto</label>
                                    <p class="text-xs text-gray-500 mb-2">Selecione as unidades onde o produto estará no catálogo.</p>
                                    ${generateUnitCheckboxesHTML(product?.accessibleIn || [])}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="estoque-produto" class="tab-content hidden space-y-6">
                        <div class="max-w-2xl mx-auto">
                            <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mb-6">
                                <h3 class="text-base font-bold text-gray-800 mb-4 flex items-center gap-2"><i class="bi bi-box-seam text-indigo-500"></i> Níveis de Estoque</h3>
                                <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div class="form-group">
                                        <label for="productCurrentStock" class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Atual</label>
                                        <input type="number" id="productCurrentStock" value="${safeCurrent}" readonly class="w-full p-3 border border-gray-200 rounded-lg bg-gray-100 font-black text-center text-lg text-gray-700 cursor-not-allowed">
                                    </div>
                                    <div class="form-group">
                                        <label for="productMinStock" class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Mínimo (Alerta)</label>
                                        <input type="number" id="productMinStock" value="${safeMin}" class="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-400 font-bold text-center text-lg">
                                    </div>
                                    <div class="form-group">
                                        <label for="productMaxStock" class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Máximo (Ideal)</label>
                                        <input type="number" id="productMaxStock" value="${safeMax}" class="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-center text-lg">
                                    </div>
                                </div>
                            </div>

                            <div class="bg-indigo-50 p-5 rounded-xl border border-indigo-100 ${!product?.id ? 'hidden' : ''}">
                                <h3 class="text-sm font-bold text-indigo-900 mb-2 flex items-center gap-2"><i class="bi bi-arrow-left-right"></i> Ajuste Rápido Manual</h3>
                                <p class="text-xs text-indigo-700 mb-4">Deseja lançar entrada de mercadorias no estoque desta loja? Utilize a tela principal de Movimentações.</p>
                                <button type="button" data-action="open-new-movement-modal" class="w-full py-2.5 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 shadow-sm transition-colors">
                                    <i class="bi bi-box-arrow-in-right"></i> Lançar Movimentação Agora
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div id="fornecedores-produto" class="tab-content hidden space-y-6">
                        <div class="max-w-2xl mx-auto">
                            <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mb-6">
                                <label class="block text-sm font-bold text-gray-800 mb-2"><i class="bi bi-search text-indigo-500 mr-1"></i> Pesquisar e Adicionar Fornecedor</label>
                                <div class="relative">
                                    <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                    <input type="text" id="modalSupplierSearch" placeholder="Digite o nome da empresa ou contato..." class="w-full pl-10 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors">
                                </div>
                                <div id="supplierSearchResults" class="mt-2 border border-gray-200 rounded-lg max-h-40 overflow-y-auto bg-white hidden shadow-md absolute w-full z-10 custom-scrollbar"></div>
                            </div>

                            <div>
                                <h4 class="text-sm font-bold text-gray-700 mb-3"><i class="bi bi-truck text-gray-500 mr-1"></i> Fornecedores Vinculados</h4>
                                <div id="selectedSuppliersList" class="space-y-2 max-h-64 overflow-y-auto border border-dashed border-gray-300 p-3 rounded-xl bg-gray-50 min-h-[100px] custom-scrollbar flex flex-col justify-center">
                                    <p class="text-xs text-gray-400 text-center">Nenhum fornecedor adicionado ainda.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-footer px-6 py-4 bg-gray-50 border-t flex justify-between items-center flex-shrink-0">
                    <button type="button" data-action="delete-product" data-id="${product?.id || ''}" class="text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg font-medium transition-colors ${product?.id ? '' : 'hidden'}" title="Excluir Produto">
                        <i class="bi bi-trash3 mr-1"></i> Excluir
                    </button>

                    <div class="flex gap-3 ml-auto">
                        <button type="button" data-action="close-modal" class="py-2.5 px-5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 shadow-sm transition-colors">Cancelar</button>
                        <button type="submit" class="py-2.5 px-6 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-sm flex items-center gap-2 transition-colors">
                            <i class="bi bi-save"></i> Salvar
                        </button>
                    </div>
                </div>
            </form>
        </div>`;

    modal.innerHTML = modalHTML;
    modal.style.display = 'flex';

    // Tabs logic
    modal.querySelectorAll('.tab-link').forEach(tab => {
        tab.addEventListener('click', () => {
            modal.querySelectorAll('.tab-link').forEach(btn => {
                btn.classList.remove('active', 'border-indigo-600', 'text-indigo-600');
                btn.classList.add('border-transparent', 'text-gray-500');
            });
            tab.classList.add('active', 'border-indigo-600', 'text-indigo-600');
            tab.classList.remove('border-transparent', 'text-gray-500');
            modal.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
            document.getElementById(tab.dataset.tab).classList.remove('hidden');
        });
    });

    // --- LÓGICA DO SUBMIT DO FORMULÁRIO ---
    const formElement = document.getElementById('productForm');
    formElement.onsubmit = handleProductFormSubmit;

    // --- LÓGICA DE FORNECEDORES ---
    let tempSelectedIds = new Set(product?.supplierIds || []);
    
    const renderSupplierLists = () => {
        const searchInput = document.getElementById('modalSupplierSearch');
        const searchResultsDiv = document.getElementById('supplierSearchResults');
        const selectedListDiv = document.getElementById('selectedSuppliersList');
        const term = searchInput?.value.toLowerCase() || '';
        const allSuppliers = localState.suppliers || [];

        if (term.length > 0) {
            const results = allSuppliers.filter(s => 
                s.name.toLowerCase().includes(term) && !tempSelectedIds.has(s.id)
            );

            if (results.length > 0) {
                searchResultsDiv.classList.remove('hidden');
                searchResultsDiv.innerHTML = results.map(s => `
                    <div class="p-3 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-0 flex justify-between items-center transition-colors" data-add-supplier="${s.id}">
                        <span class="font-bold text-sm text-gray-700">${escapeHTML(s.name)}</span>
                        <span class="text-indigo-600 text-xs font-bold px-2 py-1 bg-indigo-100 rounded">+ Adicionar</span>
                    </div>
                `).join('');
            } else {
                searchResultsDiv.classList.remove('hidden');
                searchResultsDiv.innerHTML = '<div class="p-4 text-sm text-gray-500 text-center">Fornecedor não encontrado.</div>';
            }
        } else {
            searchResultsDiv.classList.add('hidden');
        }

        if (tempSelectedIds.size > 0) {
            selectedListDiv.classList.remove('justify-center');
            selectedListDiv.classList.add('justify-start');
            selectedListDiv.innerHTML = '';
            tempSelectedIds.forEach(id => {
                const sup = allSuppliers.find(s => s.id === id);
                if (sup) {
                    selectedListDiv.innerHTML += `
                        <div class="selected-supplier-item flex items-center justify-between bg-white border border-gray-200 p-3 rounded-lg shadow-sm" data-id="${sup.id}">
                            <div>
                                <p class="font-bold text-gray-800 text-sm">${escapeHTML(sup.name)}</p>
                                <p class="text-[10px] text-gray-500 mt-0.5"><i class="bi bi-person"></i> ${escapeHTML(sup.contactName || 'N/I')} | <i class="bi bi-telephone"></i> ${escapeHTML(sup.phone || 'N/I')}</p>
                            </div>
                            <button type="button" class="text-gray-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors" data-remove-supplier="${sup.id}" title="Remover">
                                <i class="bi bi-x-lg"></i>
                            </button>
                        </div>
                    `;
                }
            });
        } else {
            selectedListDiv.classList.add('justify-center');
            selectedListDiv.classList.remove('justify-start');
            selectedListDiv.innerHTML = '<p class="text-xs text-gray-400 text-center">Nenhum fornecedor adicionado ainda.</p>';
        }
    };

    document.getElementById('modalSupplierSearch')?.addEventListener('input', renderSupplierLists);
    renderSupplierLists();

    // Photo Logic Corrigida
    const photoInput = document.getElementById('productPhotoInput');
    const photoButton = document.getElementById('productPhotoButton');
    const photoContainer = document.getElementById('productPhotoContainer');
    const photoPreview = document.getElementById('productPhotoPreview');
    const photoBase64Input = document.getElementById('productPhotoBase64');
    
    const triggerFileInput = () => photoInput?.click();
    if (photoButton) photoButton.addEventListener('click', triggerFileInput);
    if (photoContainer) photoContainer.addEventListener('click', triggerFileInput);

    if (photoInput) {
        photoInput.onchange = async () => {
            const file = photoInput.files[0];
            if (!file) return;
            
            const originalSrc = photoPreview.src;
            photoPreview.src = 'https://placehold.co/128x128/E2E8F0/4A5568?text=...'; 
            
            try {
                const resizedBase64 = await resizeAndCompressImage(file, 800, 800, 0.8);
                const sizeInBytes = (resizedBase64.length * 3) / 4; 
                if (sizeInBytes > 1000 * 1024) throw new Error('A imagem é muito grande mesmo após a compressão.');
                photoPreview.src = resizedBase64;
                photoBase64Input.value = resizedBase64;
            } catch (error) {
                showNotification('Erro de Imagem', error.message, 'error');
                photoPreview.src = originalSrc;
                photoBase64Input.value = product?.photo || '';
            }
        };
    }
    
    // Modal Click Listener para botões auxiliares
    modal.onclick = async (e) => {
        const addBtn = e.target.closest('[data-add-supplier]');
        if (addBtn) {
            tempSelectedIds.add(addBtn.dataset.addSupplier);
            const searchInput = document.getElementById('modalSupplierSearch');
            if(searchInput) searchInput.value = ''; 
            renderSupplierLists();
            return;
        }

        const removeBtn = e.target.closest('[data-remove-supplier]');
        if (removeBtn) {
            tempSelectedIds.delete(removeBtn.dataset.removeSupplier);
            renderSupplierLists();
            return;
        }

        const button = e.target.closest('button[data-action]');
        if (!button) return;

        const action = button.dataset.action;
        const productIdToDel = button.dataset.id;

        if (action === 'close-modal') modal.style.display = 'none';

        if (action === 'delete-product') {
            if (!productIdToDel) return;
            const confirmed = await showConfirmation('Apagar Produto', 'Tem certeza que deseja excluir este produto do catálogo?');
            if (confirmed) {
                try {
                    const prodName = localState.products.find(p => p.id === productIdToDel)?.name || 'Desconhecido';
                    await productsApi.deleteProduct(productIdToDel);
                    logAction(state.establishmentId, getCurrentUserForLog(), 'Produtos', 'Excluiu', `Excluiu o produto: ${prodName}`);
                    showNotification('Sucesso', 'Produto apagado.', 'success');
                    modal.style.display = 'none';
                    await fetchAndDisplayData(); 
                } catch (error) {
                    showNotification('Erro', `Não foi possível apagar: ${error.message}`, 'error');
                }
            }
        }

        if (action === 'open-new-movement-modal') {
            modal.style.display = 'none';
            // Alterna para a aba de movimentações para focar na gestão de estoque
            localState.currentTab = 'movimentacoes';
            renderBaseLayout();
            openNewMovementModal();
        }
    };
}

function handleBatchDelete() {
    showConfirmation('Excluir em Lote', `Tem certeza que deseja excluir ${localState.selectedIds.size} produtos da rede?`)
        .then(async (confirmed) => {
            if (confirmed) {
                try {
                    const deletePromises = Array.from(localState.selectedIds).map(id => productsApi.deleteProduct(id));
                    await Promise.all(deletePromises);
                    
                    logAction(state.establishmentId, getCurrentUserForLog(), 'Produtos', 'Excluiu em Lote', `Excluiu ${localState.selectedIds.size} produtos`);
                    showNotification('Sucesso', `${localState.selectedIds.size} produtos foram excluídos.`, 'success');
                    
                    localState.selectedIds.clear();
                    updateBatchActionBar();
                    fetchAndDisplayData();
                } catch (error) {
                    showNotification('Erro', `Não foi possível excluir em lote: ${error.message}`, 'error');
                }
            }
        });
}

// --- 8. ABA RELATÓRIO DE MOVIMENTAÇÕES MULTI-EMPRESA ---

async function generateStockReport() {
    const resultsContainer = document.getElementById('report-results');
    if (!resultsContainer) return;
    
    resultsContainer.innerHTML = '<div class="flex items-center justify-center h-full"><div class="loader"></div></div>';

    const filters = {
        startDate: document.getElementById('reportStartDate')?.value || '',
        endDate: document.getElementById('reportEndDate')?.value || '',
        productId: document.getElementById('productFilterReport')?.value || 'all',
        categoryId: document.getElementById('categoryFilterReport')?.value || 'all'
    };

    try {
        const activeHeaderEstablishments = getActiveEstablishmentsFromHeader();
        
        // Busca os relatórios para TODAS as lojas selecionadas no topo
        const reportPromises = activeHeaderEstablishments.map(id => 
            productsApi.getStockReport({ ...filters, establishmentId: id }).catch(e => []) // Protege contra erros numa loja específica
        );
        
        const reportsArrays = await Promise.all(reportPromises);
        
        // Junta todos os arrays, ignorando falhas, e ordena pela data mais recente
        let allMovements = [];
        reportsArrays.forEach(report => {
            if (!report) return;
            const items = Array.isArray(report) ? report : (Array.isArray(report.data) ? report.data : (Array.isArray(report.movements) ? report.movements : []));
            allMovements = allMovements.concat(items);
        });

        allMovements.sort((a, b) => parseSafeDate(b.date) - parseSafeDate(a.date));
        
        if (allMovements.length === 0) {
            resultsContainer.innerHTML = `
                <div class="flex items-center justify-center h-full p-8 text-center">
                    <div>
                        <i class="bi bi-inboxes text-4xl text-gray-300 mb-2 block"></i>
                        <p class="text-gray-500 font-medium text-sm">Nenhuma movimentação encontrada neste período.</p>
                    </div>
                </div>`;
            return;
        }

        const tableHTML = `
            <div class="overflow-y-auto custom-scrollbar h-full">
                <table class="min-w-full text-sm text-left">
                    <thead class="bg-gray-50 sticky top-0 shadow-sm z-10">
                        <tr>
                            <th class="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Data</th>
                            <th class="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Produto</th>
                            <th class="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 text-center">Movimento</th>
                            <th class="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 text-center">Estoque Novo</th>
                            <th class="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Motivo</th>
                            <th class="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">Responsável</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        ${allMovements.map(item => {
                            const isPositive = item.change > 0;
                            const changeColor = isPositive ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50';
                            const changeIcon = isPositive ? '<i class="bi bi-arrow-down-left"></i>' : '<i class="bi bi-arrow-up-right"></i>';
                            
                            const d = parseSafeDate(item.date);
                            const dateStr = d.toLocaleString('pt-BR', {day:'2-digit', month:'2-digit', year:'2-digit', hour:'2-digit', minute:'2-digit'});

                            return `
                            <tr class="hover:bg-gray-50 transition-colors">
                                <td class="px-4 py-3 whitespace-nowrap text-gray-500 text-xs">${dateStr}</td>
                                <td class="px-4 py-3 font-bold text-gray-800 text-xs">${escapeHTML(item.productName)}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center">
                                    <span class="inline-flex items-center gap-1 px-2 py-1 rounded-md font-bold text-xs ${changeColor}">
                                        ${changeIcon} ${isPositive ? '+' : ''}${item.change}
                                    </span>
                                </td>
                                <td class="px-4 py-3 whitespace-nowrap text-center text-gray-800 font-bold font-mono text-xs">${item.newStock}</td>
                                <td class="px-4 py-3 text-gray-600 text-xs truncate max-w-[200px]" title="${escapeHTML(item.reason)}">${escapeHTML(item.reason)}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-gray-500 text-xs flex items-center gap-2">
                                    <i class="bi bi-person-circle text-gray-300"></i> ${escapeHTML(item.user)}
                                </td>
                            </tr>`;
                        }).join('')}
                    </tbody>
                </table>
            </div>`;

        resultsContainer.innerHTML = tableHTML;

    } catch (error) {
        showNotification('Erro', `Não foi possível gerar: ${error.message}`, 'error');
        resultsContainer.innerHTML = `<div class="p-8 text-center text-red-500 font-bold">Falha ao buscar movimentações.</div>`;
    }
}