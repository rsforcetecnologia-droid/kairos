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
    products: null, // Começa como null para o loading skeleton inicial
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
    
    selectedIds: new Set(),
    tempProduct: null,
    tempSupplierIds: new Set()
};

let pageEventListener = null;
let pageInputListener = null;

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

// --- 3. TROCA DE ECRÃS (MODAL FLUTUANTE DE PRODUTOS) ---
function showMobileDetail() {
    const modal = document.getElementById('products-layout-detail');
    const modalInner = document.getElementById('product-modal-inner');
    
    if (modal && modalInner) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalInner.classList.remove('scale-95', 'translate-y-4');
            modalInner.classList.add('scale-100', 'translate-y-0');
        }, 10);
        
        document.body.style.overflow = 'hidden'; 
    }
}

function hideMobileDetail() {
    const modal = document.getElementById('products-layout-detail');
    const modalInner = document.getElementById('product-modal-inner');
    
    if (modal && modalInner) {
        modal.classList.add('opacity-0');
        modalInner.classList.remove('scale-100', 'translate-y-0');
        modalInner.classList.add('scale-95', 'translate-y-4');
        
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = ''; 
        }, 300); 
    }
    localState.tempProduct = null;
    localState.tempSupplierIds.clear();
}

// --- 3.1 TROCA DE ECRÃS (MODAL DE MOVIMENTAÇÃO) ---
function showMovementModal() {
    const modal = document.getElementById('movement-layout-detail');
    const modalInner = document.getElementById('movement-modal-inner');
    
    if (modal && modalInner) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalInner.classList.remove('scale-95', 'translate-y-4');
            modalInner.classList.add('scale-100', 'translate-y-0');
        }, 10);
        
        document.body.style.overflow = 'hidden'; 
    }
}

function hideMovementModal() {
    const modal = document.getElementById('movement-layout-detail');
    const modalInner = document.getElementById('movement-modal-inner');
    
    if (modal && modalInner) {
        modal.classList.add('opacity-0');
        modalInner.classList.remove('scale-100', 'translate-y-0');
        modalInner.classList.add('scale-95', 'translate-y-4');
        
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = ''; 
        }, 300); 
    }
}


// --- 4. RENDERIZAÇÃO DO LAYOUT PRINCIPAL ---

export async function loadProductsPage() {
    localState.selectedIds.clear();
    localState.currentTab = 'catalogo';
    localState.products = null;
    
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
        <div class="h-full flex w-full relative overflow-hidden bg-slate-50">
            <section class="flex-1 flex flex-col p-4 md:pl-6 md:pr-6 md:pt-6 w-full relative overflow-y-auto custom-scrollbar">
                
                <div class="mb-4 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-shrink-0 animate-fade-in-down">
                    <nav class="flex overflow-x-auto custom-scrollbar">
                        <button data-main-tab="catalogo" class="flex-1 py-4 px-6 text-xs md:text-sm font-black border-b-2 transition-colors whitespace-nowrap uppercase tracking-widest ${localState.currentTab === 'catalogo' ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50' : 'border-transparent text-slate-500 hover:text-indigo-500 hover:bg-slate-50'}">
                            <i class="bi bi-box-seam mr-2"></i> Catálogo de Produtos
                        </button>
                        <button data-main-tab="movimentacoes" class="flex-1 py-4 px-6 text-xs md:text-sm font-black border-b-2 transition-colors whitespace-nowrap uppercase tracking-widest ${localState.currentTab === 'movimentacoes' ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50' : 'border-transparent text-slate-500 hover:text-indigo-500 hover:bg-slate-50'}">
                            <i class="bi bi-arrow-left-right mr-2"></i> Estoque & Movimentações
                        </button>
                    </nav>
                </div>

                <div id="main-tab-content" class="flex-1 flex flex-col min-h-0 relative"></div>
            </section>
        </div>

        <div id="products-layout-detail" class="hidden fixed inset-0 z-[99999] bg-slate-900/60 backdrop-blur-sm items-center justify-center p-0 md:p-6 opacity-0 transition-opacity duration-300">
            <div id="product-modal-inner" class="bg-slate-50 w-full h-[100dvh] md:h-auto md:max-h-[95vh] md:max-w-4xl flex flex-col md:rounded-3xl shadow-2xl transform scale-95 translate-y-4 md:translate-y-0 transition-all duration-300 overflow-hidden">
            </div>
        </div>

        <div id="movement-layout-detail" class="hidden fixed inset-0 z-[99999] bg-slate-900/60 backdrop-blur-sm items-center justify-center p-0 md:p-6 opacity-0 transition-opacity duration-300">
            <div id="movement-modal-inner" class="bg-slate-50 w-full h-[100dvh] md:h-auto md:max-h-[95vh] md:max-w-lg flex flex-col md:rounded-3xl shadow-2xl transform scale-95 translate-y-4 md:translate-y-0 transition-all duration-300 overflow-hidden">
            </div>
        </div>
    `;
    
    renderCurrentTab();
}

function renderCurrentTab() {
    const container = document.getElementById('main-tab-content');
    if (!container) return;

    if (localState.currentTab === 'catalogo') {
        container.innerHTML = `
            <div id="batch-action-bar" class="hidden absolute top-0 left-0 right-0 z-30 bg-slate-900 text-white rounded-xl shadow-2xl p-2.5 items-center justify-between animate-fade-in-down mb-4">
                <div class="flex items-center gap-3">
                    <button id="cancel-selection-btn" class="p-1.5 hover:bg-slate-700 rounded-full transition-colors text-slate-300 hover:text-white">
                        <i class="bi bi-x-lg text-lg"></i>
                    </button>
                    <span class="font-bold text-sm tracking-wide"><span id="selected-count" class="text-indigo-400">0</span> Selecionados</span>
                </div>
                <button data-action="batch-delete" class="flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg text-sm active:scale-95">
                    <i class="bi bi-trash3"></i> Excluir
                </button>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3 animate-fade-in w-full">
                <div class="relative w-full md:w-96 flex-shrink-0">
                    <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input type="text" id="searchInput" value="${localState.searchQuery}" placeholder="Pesquisar produto, código..." class="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm text-sm font-semibold text-slate-700">
                </div>
                
                <div class="grid grid-cols-2 md:flex md:flex-wrap items-center gap-2 w-full md:w-auto">
                    <button data-action="manage-categories" class="py-2.5 px-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-2 text-xs active:scale-95">
                        <i class="bi bi-tags text-base"></i> Categorias
                    </button>
                    <button id="toggle-filter-btn" class="py-2.5 px-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-2 text-xs active:scale-95 ${localState.isAdvancedFilterOpen ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : ''}">
                        <i class="bi bi-funnel text-base"></i> Filtros
                    </button>
                    <button data-action="open-product-editor" data-id="" class="py-2.5 px-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-500/30 flex items-center justify-center gap-2 text-xs active:scale-95 uppercase tracking-wider border border-indigo-500 col-span-2 md:col-span-1">
                        <i class="bi bi-plus-lg text-base pointer-events-none"></i> Novo Produto
                    </button>
                </div>
            </div>

            <div id="filter-panel" class="${localState.isAdvancedFilterOpen ? 'block' : 'hidden'} mb-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm animate-fade-in flex-shrink-0">
                <div class="flex flex-col md:flex-row items-end gap-3">
                    <div class="w-full md:w-64">
                        <label class="block text-[9px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Categoria</label>
                        <select id="filterCategoryId" class="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-colors">
                            <option value="all">Todas as categorias</option>
                        </select>
                    </div>
                    <div class="flex gap-2 w-full md:w-auto">
                        <button id="clear-filters-btn" class="w-full md:w-auto px-5 py-2.5 bg-slate-100 text-slate-700 font-black rounded-lg hover:bg-slate-200 transition-colors text-xs uppercase tracking-wider border border-slate-200">Limpar</button>
                        <button id="apply-filter-btn" class="w-full md:w-auto px-6 py-2.5 bg-indigo-600 text-white font-black rounded-lg shadow-md hover:bg-indigo-700 active:scale-95 transition-all text-xs uppercase tracking-wider">Aplicar</button>
                    </div>
                </div>
            </div>

            <div id="summary-section" class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 flex-shrink-0"></div>

            <div class="flex gap-2 overflow-x-auto pb-2 w-full custom-scrollbar mb-2 animate-fade-in flex-shrink-0">
                <button data-status="all" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${localState.stockFilter === 'all' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}">Todos</button>
                <button data-status="ok" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${localState.stockFilter === 'ok' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}">Estoque OK</button>
                <button data-status="alert" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${localState.stockFilter === 'alert' ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}">Alerta Mínimo</button>
                <button data-status="empty" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${localState.stockFilter === 'empty' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}">Esgotados</button>
            </div>

            <div id="productsList" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 pb-20 mt-1 flex-1 content-start overflow-y-auto custom-scrollbar pr-1">
                ${renderSkeletonList(8)}
            </div>

            <button data-action="open-product-editor" data-id="" class="md:hidden fixed bottom-20 right-4 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-500/40 flex items-center justify-center hover:bg-indigo-700 transition-all z-40 active:scale-95 border border-indigo-500">
                <i class="bi bi-plus-lg text-2xl pointer-events-none"></i>
            </button>
        `;
    } 
    else if (localState.currentTab === 'movimentacoes') {
        const today = new Date().toISOString().split('T')[0];
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];

        const prodOptions = (localState.products || []).map(p => `<option value="${p.id}">${escapeHTML(p.name)}</option>`).join('');
        const catOptions = (localState.categories || []).map(c => `<option value="${c.id}">${escapeHTML(c.name)}</option>`).join('');

        container.innerHTML = `
            <div class="flex flex-col h-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in">
                <div class="bg-white px-5 py-5 border-b border-slate-100 flex flex-col md:flex-row md:justify-between md:items-center gap-4 flex-shrink-0">
                    <div>
                        <h2 class="text-base font-black text-slate-800 flex items-center gap-2 uppercase tracking-wider"><i class="bi bi-arrow-left-right text-indigo-500"></i> Histórico de Estoque</h2>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Acompanhe entradas e saídas de mercadoria na rede.</p>
                    </div>
                    <button data-action="open-new-movement-modal" class="w-full md:w-auto py-3 px-6 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-colors shadow-md active:scale-95 flex items-center justify-center gap-2 text-xs uppercase tracking-wider border border-indigo-600">
                        <i class="bi bi-plus-circle text-base pointer-events-none"></i> Lançar Movimento
                    </button>
                </div>

                <div class="bg-slate-50 px-5 py-5 border-b border-slate-200 flex-shrink-0">
                    <div class="flex flex-wrap md:flex-nowrap gap-4 items-end">
                        <div class="w-full md:w-40">
                            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Início</label>
                            <input type="date" id="reportStartDate" value="${thirtyDaysAgoStr}" class="w-full px-3 py-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-inner">
                        </div>
                        <div class="w-full md:w-40">
                            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Fim</label>
                            <input type="date" id="reportEndDate" value="${today}" class="w-full px-3 py-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-inner">
                        </div>
                        <div class="w-full md:w-auto flex-1">
                            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Filtrar Produto</label>
                            <select id="productFilterReport" class="w-full px-3 py-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-inner cursor-pointer">
                                <option value="all">Todos os produtos</option>${prodOptions}
                            </select>
                        </div>
                        <div class="w-full md:w-auto flex-1 hidden md:block">
                            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Categoria</label>
                            <select id="categoryFilterReport" class="w-full px-3 py-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-inner cursor-pointer">
                                <option value="all">Todas as categorias</option>${catOptions}
                            </select>
                        </div>
                        <div class="w-full md:w-auto">
                            <button id="btn-generate-report" class="bg-slate-800 text-white font-black px-8 py-3 rounded-xl hover:bg-slate-900 transition-colors text-sm w-full md:w-auto shadow-md active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider">
                                <i class="bi bi-search text-base"></i> Buscar
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

// --- 5. COMUNICAÇÃO DE DADOS E RENDERIZAÇÃO DA LISTA ---

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

    let stockTotalValue = 0;

    filteredList.forEach(p => {
        const stock = p.currentStock || 0;
        const min = p.minStock || 0;
        
        if (p.active !== false && p.price && stock > 0) {
            stockTotalValue += (p.price * stock);
        }
        
        if (stock <= 0) empty++;
        else if (min > 0 && stock <= min) alert++;
        else if (min > 0 && stock <= min * 1.2) alert++;
        else ok++;
    });

    section.innerHTML = `
        <div class="bg-white p-2 md:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Itens de Estoque</span>
            <span class="text-base md:text-2xl font-black text-slate-800 mt-0.5 w-full truncate">${total}</span>
        </div>
        <div class="bg-white p-2 md:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Estoque OK</span>
            <span class="text-base md:text-2xl font-black text-emerald-600 mt-0.5 w-full truncate">${ok}</span>
        </div>
        <div class="bg-white p-2 md:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Alerta (Baixo)</span>
            <span class="text-base md:text-2xl font-black text-amber-500 mt-0.5 w-full truncate">${alert}</span>
        </div>
        <div class="bg-red-50 p-2 md:p-4 rounded-xl border border-red-100 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-red-500 uppercase tracking-widest w-full truncate">Esgotados</span>
            <span class="text-base md:text-2xl font-black text-red-600 mt-0.5 w-full truncate">${empty}</span>
        </div>
    `;
}

function filterAndRenderProducts() {
    const listDiv = document.getElementById('productsList');
    if (!listDiv) return;

    if (localState.products === null) {
        listDiv.innerHTML = renderSkeletonList(8); 
        return;
    }

    const activeHeaderEstablishments = getActiveEstablishmentsFromHeader();
    
    const filtered = localState.products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(localState.searchQuery) || 
                              (p.sku && p.sku.toLowerCase().includes(localState.searchQuery)) ||
                              (p.barcode && p.barcode.toLowerCase().includes(localState.searchQuery));
        
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
    
    if (filtered.length === 0) {
        if (localState.products.length === 0) {
            listDiv.innerHTML = `
                <div class="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm">
                    <div class="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 border border-indigo-100">
                        <i class="bi bi-box-seam text-3xl text-indigo-400"></i>
                    </div>
                    <h3 class="text-base font-black text-slate-800 mb-1">Nenhum produto cadastrado</h3>
                    <p class="text-xs text-slate-500 max-w-sm text-center font-medium mb-6">O seu estoque está vazio. Adicione o seu primeiro produto para gerir e vender!</p>
                    <button data-action="open-product-editor" data-id="" class="py-3 px-6 bg-indigo-600 text-white font-black rounded-xl shadow-md hover:bg-indigo-700 transition active:scale-95 uppercase tracking-wider text-xs flex items-center gap-2 border border-indigo-500">
                        <i class="bi bi-plus-lg"></i> Criar Produto
                    </button>
                </div>
            `;
        } else {
            listDiv.innerHTML = `
                <div class="col-span-full flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm">
                    <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                        <i class="bi bi-search text-2xl text-slate-300"></i>
                    </div>
                    <h3 class="text-sm font-bold text-slate-700 mb-1">Nenhum resultado encontrado</h3>
                    <p class="text-[10px] text-slate-500 max-w-xs text-center font-medium">Tente ajustar os filtros ou limpar a barra de pesquisa.</p>
                    <button id="clear-filters-btn" class="mt-4 py-2 px-4 bg-slate-100 text-slate-600 font-bold rounded-lg border border-slate-200 text-[10px] uppercase tracking-wider hover:bg-slate-200 transition">Limpar Filtros</button>
                </div>
            `;
        }
        return;
    }

    const categoryMap = new Map((localState.categories || []).map(c => [c.id, c.name]));

    listDiv.innerHTML = filtered.map(product => {
        const safeName = escapeHTML(product.name);
        const safeCategoryName = escapeHTML(categoryMap.get(product.categoryId) || 'Sem Categoria');
        
        const photoSrc = product.photo || `https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(product.name.charAt(0))}`;

        const unitCount = product.accessibleIn ? product.accessibleIn.length : 1;
        const isSelected = localState.selectedIds.has(product.id);
        const formattedPrice = product.price !== undefined ? parseFloat(product.price).toFixed(2) : '0.00';
        
        const stock = product.currentStock || 0;
        const min = product.minStock || 0;
        
        let stockIndicatorColor = 'bg-emerald-500';
        let isInactive = false;
        
        let stockBadge = `<span class="text-[9px] font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-md border border-emerald-100 flex items-center gap-1"><i class="bi bi-box-seam"></i> ${stock} un</span>`;
        
        if (stock <= 0) {
            stockIndicatorColor = 'bg-red-500';
            isInactive = true;
            stockBadge = `<span class="text-[9px] font-bold bg-red-50 text-red-700 px-1.5 py-0.5 rounded-md border border-red-100 flex items-center gap-1"><i class="bi bi-exclamation-triangle"></i> Sem Estoque</span>`;
        } else if (min > 0 && stock <= min * 1.2) {
            stockIndicatorColor = 'bg-amber-500';
            stockBadge = `<span class="text-[9px] font-bold bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-md border border-amber-100 flex items-center gap-1"><i class="bi bi-exclamation-circle"></i> Baixo (${stock})</span>`;
        }

        if (product.active === false) {
             isInactive = true;
             stockIndicatorColor = 'bg-slate-400';
        }

        return `
            <div class="product-card relative bg-white rounded-2xl border ${isSelected ? 'border-indigo-400 ring-1 ring-indigo-200 shadow-md bg-indigo-50/20' : 'border-slate-200'} shadow-sm flex items-center p-4 cursor-pointer transition-all hover:shadow-md hover:border-indigo-300 active:scale-[0.98] ${isInactive ? 'opacity-70 bg-slate-50' : ''}" 
                 data-action="open-product-editor" data-id="${product.id}">
                
                <div class="absolute top-2 right-2 z-10 flex flex-col gap-2 items-center" data-action-stop-propagation="true">
                    <input type="checkbox" data-id="${product.id}" class="product-checkbox w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${isSelected ? 'checked' : ''}>
                </div>

                <div class="relative flex-shrink-0 mr-4">
                    <img src="${photoSrc}" alt="${safeName}" class="w-14 h-14 md:w-16 md:h-16 rounded-xl object-cover border border-slate-100 shadow-sm">
                    <span class="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-2 border-white rounded-full ${stockIndicatorColor}" title="Estoque: ${stock}"></span>
                </div>
                
                <div class="flex-1 min-w-0 pr-6">
                    <h3 class="text-sm font-black text-slate-800 truncate leading-tight mb-1">
                        ${safeName}
                    </h3>
                    <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate mb-2">${safeCategoryName}</p>
                    
                    <div class="flex items-center justify-between mt-1">
                        <span class="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100 shadow-sm">R$ ${formattedPrice}</span>
                        <div class="flex gap-1.5">
                            ${stockBadge}
                            ${unitCount > 1 
                                ? `<span class="text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md border border-slate-200 flex items-center gap-1" title="${unitCount} Lojas"><i class="bi bi-diagram-3"></i></span>` 
                                : ``
                            }
                        </div>
                    </div>
                </div>
            </div>`;
    }).join('');
}

function renderSkeletonList(count = 8) {
    let skeletonHTML = '';
    for (let i = 0; i < count; i++) {
        skeletonHTML += `
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center p-4 animate-pulse h-[98px]">
            <div class="w-14 h-14 rounded-xl bg-slate-200 flex-shrink-0 mr-4"></div>
            <div class="flex-1 space-y-3">
                <div class="h-3 bg-slate-200 rounded w-3/4"></div>
                <div class="h-2 bg-slate-200 rounded w-1/2"></div>
            </div>
        </div>
        `;
    }
    return skeletonHTML;
}

// --- 5. LÓGICA DE CATEGORIAS (MODAL) ---
async function handleCategoryFormSubmit(e) {
    e.preventDefault();
    const form = e.target.closest('#categoryForm');
    const categoryNameInput = form.querySelector('#categoryName');
    const name = categoryNameInput.value;
    if (!name) return;
    
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true; btn.innerHTML = '<i class="bi bi-hourglass-split"></i>...';

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
        btn.disabled = false; btn.innerHTML = '<i class="bi bi-plus-lg"></i>';
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
    listDiv.innerHTML = '<div class="loader mx-auto my-4 border-indigo-500"></div>';
    try {
        const categories = await categoriesApi.getCategories(state.establishmentId, 'products');
        localState.categories = categories; 
        
        if (categories.length > 0) {
            listDiv.innerHTML = categories.map(cat => `
                <div class="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200 mb-2 shadow-sm">
                    <span class="text-xs font-black text-slate-700 uppercase tracking-widest">${escapeHTML(cat.name)}</span>
                    <button data-action="delete-category" data-id="${cat.id}" class="text-red-500 hover:text-white w-8 h-8 flex items-center justify-center bg-red-50 hover:bg-red-600 rounded-lg transition-colors border border-red-100 active:scale-95"><i class="bi bi-trash3 pointer-events-none"></i></button>
                </div>`).join('');
        } else {
            listDiv.innerHTML = '<div class="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200"><p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nenhuma categoria criada.</p></div>';
        }
    } catch (error) {
        listDiv.innerHTML = `<p class="text-red-500 text-center text-[10px] font-bold p-4 bg-red-50 rounded-xl">Erro ao carregar categorias.</p>`;
    }
}

function openCategoryModal() {
    const contentHTML = `
        <div class="space-y-4">
            <div class="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                <p class="text-[10px] text-indigo-800 mb-3 font-bold uppercase tracking-widest"><i class="bi bi-info-circle mr-1"></i> Categorias disponíveis para toda a rede.</p>
                <form id="categoryForm" class="flex gap-2 items-end">
                    <div class="flex-1 min-w-0">
                        <label for="categoryName" class="block text-[10px] font-black text-indigo-900 uppercase tracking-widest mb-1 ml-1">Nome da Categoria</label>
                        <input type="text" id="categoryName" placeholder="Ex: Shampoos, Ferramentas..." required class="w-full p-3 border border-indigo-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-bold bg-white shadow-inner">
                    </div>
                    <button type="submit" class="w-12 h-12 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-md active:scale-95 flex items-center justify-center flex-shrink-0"><i class="bi bi-plus-lg"></i></button>
                </form>
            </div>
            <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 ml-1">Categorias Existentes</h4>
            <div id="categoryList" class="max-h-64 overflow-y-auto custom-scrollbar pr-1"></div>
        </div>
    `;

    showGenericModal({
        title: "Categorias de Produtos",
        contentHTML: contentHTML,
        maxWidth: 'max-w-md'
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

    const modalInner = document.getElementById('movement-modal-inner');

    const contentHTML = `
        <div class="p-4 md:p-5 border-b border-slate-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50">
            <button type="button" data-action="close-movement-modal" class="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-100 hover:text-slate-800 transition-colors active:scale-95 mr-4">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            <div class="min-w-0">
                <h3 class="font-black text-sm md:text-base text-slate-800 uppercase tracking-wider truncate leading-tight">Lançar Movimentação</h3>
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest truncate">Entradas ou Saídas Manuais</p>
            </div>
        </div>

        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50 p-4 md:p-6">
            <form id="newMovementForm" class="space-y-5 max-w-md mx-auto">
                <div class="grid grid-cols-1 gap-4">
                    <div>
                        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Unidade de Estoque *</label>
                        <select id="movEstablishmentId" required class="w-full p-3.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-700 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner cursor-pointer">
                            ${estOptions}
                        </select>
                    </div>

                    <div>
                        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Produto *</label>
                        <select id="movProductId" required class="w-full p-3.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-700 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner cursor-pointer">
                            <option value="">Selecione o produto...</option>
                            ${prodOptions}
                        </select>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-5">
                    <div>
                        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Tipo de Movimento</label>
                        <div class="flex gap-2">
                            <label class="flex-1 flex flex-col items-center justify-center p-3 border border-slate-200 rounded-xl cursor-pointer bg-white hover:bg-slate-50 transition-colors has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50 has-[:checked]:text-emerald-700 shadow-sm text-slate-500">
                                <input type="radio" name="movType" value="in" checked class="sr-only">
                                <i class="bi bi-arrow-down-circle text-lg mb-1"></i> <span class="font-black text-[10px] uppercase tracking-widest">Entrada</span>
                            </label>
                            <label class="flex-1 flex flex-col items-center justify-center p-3 border border-slate-200 rounded-xl cursor-pointer bg-white hover:bg-slate-50 transition-colors has-[:checked]:border-red-500 has-[:checked]:bg-red-50 has-[:checked]:text-red-700 shadow-sm text-slate-500">
                                <input type="radio" name="movType" value="out" class="sr-only">
                                <i class="bi bi-arrow-up-circle text-lg mb-1"></i> <span class="font-black text-[10px] uppercase tracking-widest">Saída</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Quantidade *</label>
                        <input type="number" id="movAmount" required min="1" placeholder="Ex: 10" class="w-full p-4 border border-slate-300 rounded-xl text-xl text-center bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 font-black text-slate-800 shadow-inner h-full">
                    </div>
                </div>

                <div>
                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Motivo / Observação *</label>
                    <input type="text" id="movReason" required placeholder="Ex: Compra de fornecedor, Quebra, Validade..." class="w-full p-3.5 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner">
                </div>
            </form>
        </div>

        <footer class="p-4 bg-white border-t border-slate-200 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.05)] w-full flex-shrink-0 z-50 flex gap-3 justify-end md:rounded-b-3xl">
            <button type="button" data-action="close-movement-modal" class="hidden md:block py-3 px-6 bg-slate-100 border border-slate-200 text-slate-600 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-slate-200 transition-colors shadow-sm active:scale-95">Cancelar</button>
            <button type="submit" form="newMovementForm" class="w-full md:w-auto md:px-8 py-3 bg-indigo-600 text-white font-black text-xs md:text-sm rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-500/30 transition-transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider border border-indigo-600">
                <i class="bi bi-check2-circle text-lg pointer-events-none"></i> Lançar
            </button>
        </footer>
    `;

    modalInner.innerHTML = contentHTML;
    showMovementModal();

    // Como o select de lojas pode não ter a loja logada como primeira, forçamos o default:
    const estSelect = document.getElementById('movEstablishmentId');
    if (estSelect) estSelect.value = state.establishmentId;

    const form = document.getElementById('newMovementForm');
    form.onsubmit = async (e) => {
        e.preventDefault();
        const btn = modalInner.querySelector('button[type="submit"]');
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
            hideMovementModal();
            
            await fetchAndDisplayData();
        } catch (error) {
            showNotification('Erro', error.message, 'error');
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
    };
}


// --- 7. LÓGICA DE PRODUTOS (MODAL NATIVO FULL SCREEN) ---

function generateUnitCheckboxesHTML(selectedIds = []) {
    if (!localState.hierarchyCache || localState.hierarchyCache.length === 0) {
        return `
            <input type="hidden" name="accessibleIn" value="${state.establishmentId}">
            <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 text-sm font-bold text-slate-500 text-center">
                <i class="bi bi-info-circle text-2xl block mb-2 text-slate-400"></i> Exclusivo desta unidade.
            </div>`;
    }

    let html = '<div class="space-y-2 mt-1 max-h-48 overflow-y-auto custom-scrollbar pr-2">';
    
    localState.hierarchyCache.forEach(matriz => {
        const isMatrizSelected = selectedIds.includes(matriz.id) || (selectedIds.length === 0 && matriz.id === state.establishmentId);
        
        html += `
            <label class="flex items-center space-x-3 p-3 cursor-pointer bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-300 rounded-xl transition-colors shadow-sm">
                <input type="checkbox" name="accessibleIn" value="${matriz.id}" class="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" ${isMatrizSelected ? 'checked' : ''}>
                <span class="text-xs md:text-sm font-black text-slate-800">🏢 ${escapeHTML(matriz.name)}</span>
            </label>
        `;
        
        if (matriz.branches && matriz.branches.length > 0) {
            matriz.branches.forEach(branch => {
                const isBranchSelected = selectedIds.includes(branch.id) || (selectedIds.length === 0 && branch.id === state.establishmentId);
                html += `
                    <label class="flex items-center space-x-3 p-3 ml-8 cursor-pointer bg-white hover:bg-indigo-50/50 border border-slate-100 hover:border-indigo-200 rounded-xl transition-colors border-l-4 border-l-indigo-200 shadow-sm">
                        <input type="checkbox" name="accessibleIn" value="${branch.id}" class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" ${isBranchSelected ? 'checked' : ''}>
                        <span class="text-xs font-bold text-slate-600">📍 ${escapeHTML(branch.name)}</span>
                    </label>
                `;
            });
        }
    });
    
    html += '</div>';
    return html;
}

function openProductEditor(productId) {
    localState.viewMode = 'edit-product';
    const modalInner = document.getElementById('product-modal-inner');
    if(!modalInner) return;

    let product = { name: '', active: true, price: 0, costPrice: 0, currentStock: 0, minStock: 0, maxStock: 0, supplierIds: [] };
    if (productId) {
        const found = localState.products?.find(p => String(p.id) === String(productId));
        if (found) product = JSON.parse(JSON.stringify(found));
    }
    
    localState.tempProduct = product;
    localState.tempSupplierIds = new Set(product.supplierIds || []);
    
    const isEditing = !!product.id;
    const categories = localState.categories || []; 
    
    const safeName = escapeHTML(product.name || '');
    const safeSku = escapeHTML(product.sku || '');
    const safeBarcode = escapeHTML(product.barcode || '');
    const safeDescription = escapeHTML(product.description || '');
    const safeTitle = isEditing ? safeName : 'Novo Produto';

    const safePrice = product.price !== undefined ? product.price : '';
    const safeCost = product.costPrice !== undefined ? product.costPrice : '';
    const safeComm = product.commissionRate !== undefined ? product.commissionRate : '';
    const safeCurrent = product.currentStock || 0;
    const safeMin = product.minStock || 0;
    const safeMax = product.maxStock || 0;

    const categoryOptions = categories.map(c => 
        `<option value="${c.id}" ${product.categoryId === c.id ? 'selected' : ''}>${escapeHTML(c.name)}</option>`
    ).join('');

    const photoSrc = product.photo || `https://placehold.co/150x150/E2E8F0/4A5568?text=${encodeURIComponent(safeName ? safeName.charAt(0) : 'P')}`;

    const mobileHeaderHTML = `
        <div class="p-4 md:p-5 border-b border-slate-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50">
            <button data-action="close-detail-screen" class="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-100 hover:text-slate-800 transition-colors active:scale-95 mr-4">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            <div class="min-w-0">
                <h3 class="font-black text-sm md:text-base text-slate-800 uppercase tracking-wider truncate leading-tight">${isEditing ? 'Editar Produto' : 'Novo Produto'}</h3>
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest truncate">${isEditing ? safeTitle : 'Gerenciamento de Estoque'}</p>
            </div>
            ${isEditing ? `
                <button data-action="delete-product" data-id="${product.id}" class="ml-auto w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 border border-red-100 transition-colors active:scale-95 flex-shrink-0" title="Excluir">
                    <i class="bi bi-trash3 text-base pointer-events-none"></i>
                </button>
            ` : ''}
        </div>
    `;

    modalInner.innerHTML = `
        ${mobileHeaderHTML}
        
        <div class="modal-tabs px-2 md:px-6 border-b flex items-center justify-start gap-4 overflow-x-auto bg-slate-50 flex-shrink-0 custom-scrollbar shadow-sm">
            <button class="tab-link active whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-indigo-600 text-indigo-600 transition-colors uppercase tracking-widest" data-tab="dados-basicos">1. Dados Básicos</button>
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-transparent text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest" data-tab="config-vendas">2. Estoque & Vendas</button>
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-transparent text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest" data-tab="fornecedores-produto">3. Fornecedores</button>
        </div>
        
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50 p-3 md:p-6 relative"> 
            <form id="productForm" class="h-full w-full mx-auto max-w-4xl">
                <input type="hidden" id="productId" value="${product.id || ''}">
                <input type="hidden" id="productPhotoBase64" value="${product.photo || ''}">
                
                <div id="dados-basicos" class="tab-content active space-y-4 md:space-y-6 animate-fade-in-fast">
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div class="lg:col-span-1 space-y-4">
                            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center flex flex-col items-center">
                                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Imagem do Produto</label>
                                <div class="relative group w-32 h-32 mb-5 cursor-pointer" id="productPhotoContainer">
                                    <img id="productPhotoPreview" src="${photoSrc}" alt="Foto" class="w-full h-full rounded-2xl object-cover border-4 border-slate-50 shadow-md transition-all group-hover:brightness-75">
                                    <div id="productPhotoButtonOverlay" class="absolute inset-0 flex items-center justify-center rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                        <i class="bi bi-camera-fill text-white text-3xl drop-shadow-md"></i>
                                    </div>
                                </div>
                                <input type="file" id="productPhotoInput" class="hidden" accept="image/*">
                                <button type="button" id="productPhotoButton" class="text-indigo-600 text-[10px] font-black uppercase tracking-wider hover:text-indigo-800 transition-colors w-full bg-indigo-50 py-2.5 rounded-xl border border-indigo-100 shadow-sm active:scale-95">Alterar Imagem</button>
                            </div>

                            <div class="bg-emerald-50 p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
                                <div>
                                    <p class="text-xs font-black text-emerald-900 uppercase tracking-wider mb-0.5">Ativo / Venda</p>
                                    <p class="text-[9px] font-bold text-emerald-700">Pode ser vendido no PDV.</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer ml-3">
                                    <input type="checkbox" id="productStatusToggle" class="sr-only peer" ${product.active !== false ? 'checked' : ''}>
                                    <div class="w-12 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 shadow-inner"></div>
                                </label>
                            </div>
                        </div>

                        <div class="lg:col-span-2 space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div class="form-group sm:col-span-2">
                                    <label for="productName" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Nome do Produto *</label>
                                    <input type="text" id="productName" value="${safeName}" required placeholder="Ex: Shampoo Revitalizante 300ml" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors text-base font-black text-slate-800 shadow-inner">
                                </div>
                                
                                <div class="form-group">
                                    <label for="productCategory" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Categoria</label>
                                    <select id="productCategory" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors font-bold text-slate-700 shadow-inner cursor-pointer">
                                        <option value="">Sem Categoria</option>
                                        ${categoryOptions}
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label for="productSku" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">SKU (Código Interno)</label>
                                    <input type="text" id="productSku" value="${safeSku}" placeholder="Ex: POM-MAT-01" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors font-bold text-slate-700 shadow-inner">
                                </div>

                                <div class="form-group sm:col-span-2">
                                    <label for="productBarcode" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Código de Barras (EAN/UPC)</label>
                                    <div class="relative">
                                        <i class="bi bi-upc-scan absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg"></i>
                                        <input type="text" id="productBarcode" value="${safeBarcode}" placeholder="Bipe aqui ou digite" class="w-full pl-12 p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors font-bold text-slate-700 shadow-inner tracking-widest">
                                    </div>
                                </div>
                            </div>
                            
                            <div class="form-group pt-4 border-t border-slate-100 mt-2">
                                <label for="productDescription" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Descrição Comercial</label>
                                <textarea id="productDescription" rows="4" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors placeholder-slate-400 font-medium text-sm text-slate-700 shadow-inner resize-none" placeholder="Descrição para recibos e detalhes...">${safeDescription}</textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="config-vendas" class="tab-content hidden space-y-6 animate-fade-in-fast">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-4">
                            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 class="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 mb-4 flex items-center gap-2"><i class="bi bi-tag-fill text-indigo-500 text-lg"></i> Preço e Margem</h3>
                                
                                <div class="grid grid-cols-2 gap-5">
                                    <div class="form-group">
                                        <label for="productCostPrice" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Preço de Custo</label>
                                        <input type="number" id="productCostPrice" step="0.01" min="0" value="${safeCost}" placeholder="0.00" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors font-black text-slate-700 shadow-inner">
                                    </div>
                                    <div class="form-group">
                                        <label for="productPrice" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Preço de Venda *</label>
                                        <input type="number" id="productPrice" step="0.01" min="0" value="${safePrice}" required placeholder="0.00" class="w-full p-3.5 border border-emerald-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 bg-emerald-50/30 focus:bg-white transition-colors font-black text-emerald-700 shadow-inner">
                                    </div>
                                </div>
                            </div>

                            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 class="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 mb-4 flex items-center gap-2"><i class="bi bi-box-seam text-amber-500 text-lg"></i> Controle de Estoque</h3>
                                
                                <div class="grid grid-cols-2 gap-5">
                                    <div class="form-group">
                                        <label for="productCurrentStock" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Estoque Atual</label>
                                        <input type="number" id="productCurrentStock" value="${safeCurrent}" readonly class="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-100 font-black text-center text-xl text-slate-700 cursor-not-allowed shadow-inner" title="Para alterar, use a aba Movimentações">
                                    </div>
                                    <div class="form-group">
                                        <label for="productMinStock" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Mínimo (Alerta)</label>
                                        <input type="number" id="productMinStock" value="${safeMin}" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50 focus:bg-white transition-colors font-bold text-slate-700 shadow-inner text-center text-lg">
                                    </div>
                                </div>
                            </div>
                            
                            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 class="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 mb-4 flex items-center gap-2"><i class="bi bi-percent text-indigo-500 text-lg"></i> Comissão por Venda</h3>
                                <div class="form-group">
                                    <label for="productCommissionRate" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Taxa padrão de comissão</label>
                                    <div class="flex items-center shadow-inner rounded-xl overflow-hidden border border-indigo-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500 bg-white">
                                        <input type="number" id="productCommissionRate" step="0.1" min="0" value="${safeComm}" class="w-full p-3.5 bg-transparent outline-none font-black text-indigo-700 text-center text-lg" placeholder="0">
                                        <span class="bg-slate-100 px-5 py-3.5 text-lg font-black text-slate-400 border-l border-slate-200">%</span>
                                    </div>
                                    <p class="text-[9px] font-bold text-slate-400 mt-2 ml-1 uppercase tracking-widest">Remuneração paga ao profissional.</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
                            <h3 class="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 mb-4 flex items-center gap-2"><i class="bi bi-diagram-3 text-indigo-500 text-lg"></i> Disponibilidade na Rede</h3>
                            <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">Lojas que possuem este produto.</p>
                            <div class="flex-1 overflow-y-auto max-h-96 custom-scrollbar pr-2 border border-slate-100 rounded-xl p-2 bg-slate-50">
                                ${generateUnitCheckboxesHTML(product.accessibleIn || [])}
                            </div>
                        </div>
                    </div>
                </div>

                <div id="fornecedores-produto" class="tab-content hidden space-y-6 animate-fade-in-fast">
                    <div class="max-w-2xl mx-auto">
                        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
                            <label class="block text-xs font-black text-slate-800 uppercase tracking-wider mb-3"><i class="bi bi-search text-indigo-500 mr-2 text-lg"></i> Pesquisar Fornecedor</label>
                            <div class="relative">
                                <i class="bi bi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
                                <input type="text" id="modalSupplierSearch" placeholder="Digite o nome da empresa ou contato..." class="w-full pl-12 p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors font-bold text-slate-700 shadow-inner">
                            </div>
                            <div id="supplierSearchResults" class="mt-2 border border-slate-200 rounded-xl max-h-48 overflow-y-auto bg-white hidden shadow-lg absolute w-full max-w-[calc(100%-48px)] z-20 custom-scrollbar"></div>
                        </div>

                        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                            <h4 class="text-xs font-black text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3"><i class="bi bi-truck text-indigo-500 mr-2 text-lg"></i> Fornecedores Vinculados</h4>
                            <div id="selectedSuppliersList" class="space-y-2 max-h-80 overflow-y-auto border border-dashed border-slate-300 p-3 rounded-xl bg-slate-50 min-h-[150px] custom-scrollbar flex flex-col justify-center">
                                <p class="text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest">Nenhum fornecedor adicionado ainda.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        
        <footer class="p-4 bg-white border-t border-slate-200 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.05)] w-full flex-shrink-0 z-50 flex gap-3 justify-end rounded-b-3xl">
            <button type="button" data-action="close-detail-screen" class="hidden md:block py-3 px-6 bg-slate-100 border border-slate-200 text-slate-600 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-slate-200 transition-colors shadow-sm active:scale-95">Cancelar</button>
            <button type="submit" form="productForm" class="w-full md:w-auto md:px-8 py-3 bg-indigo-600 text-white font-black text-xs md:text-sm rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-500/30 transition-transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider border border-indigo-600">
                <i class="bi bi-save2 text-lg pointer-events-none"></i> Salvar Produto
            </button>
        </footer>
    `;

    // Tabs logic (Modal)
    modalInner.querySelectorAll('.tab-link').forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            modalInner.querySelectorAll('.tab-link').forEach(btn => {
                btn.classList.remove('active', 'border-indigo-600', 'text-indigo-600');
                btn.classList.add('border-transparent', 'text-slate-400');
            });
            tab.classList.add('active', 'border-indigo-600', 'text-indigo-600');
            tab.classList.remove('border-transparent', 'text-slate-400');
            
            modalInner.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
            modalInner.querySelector('#' + tab.dataset.tab).classList.remove('hidden');
        });
    });

    // --- LÓGICA DE FORNECEDORES NO MODAL ---
    const renderSupplierLists = () => {
        const searchInput = document.getElementById('modalSupplierSearch');
        const searchResultsDiv = document.getElementById('supplierSearchResults');
        const selectedListDiv = document.getElementById('selectedSuppliersList');
        const term = searchInput?.value.toLowerCase() || '';
        const allSuppliers = localState.suppliers || [];

        if (term.length > 0) {
            const results = allSuppliers.filter(s => 
                s.name.toLowerCase().includes(term) && !localState.tempSupplierIds.has(s.id)
            );

            if (results.length > 0) {
                searchResultsDiv.classList.remove('hidden');
                searchResultsDiv.innerHTML = results.map(s => `
                    <div class="p-3.5 hover:bg-indigo-50 cursor-pointer border-b border-slate-100 last:border-0 flex justify-between items-center transition-colors" data-add-supplier="${s.id}">
                        <span class="font-bold text-xs text-slate-700 uppercase tracking-widest">${escapeHTML(s.name)}</span>
                        <span class="text-indigo-600 text-[10px] font-black px-2 py-1 bg-indigo-100 rounded-md uppercase tracking-widest pointer-events-none">+ Adicionar</span>
                    </div>
                `).join('');
            } else {
                searchResultsDiv.classList.remove('hidden');
                searchResultsDiv.innerHTML = '<div class="p-4 text-xs font-bold text-slate-500 text-center uppercase tracking-widest">Fornecedor não encontrado.</div>';
            }
        } else {
            if(searchResultsDiv) searchResultsDiv.classList.add('hidden');
        }

        if (localState.tempSupplierIds.size > 0) {
            selectedListDiv.classList.remove('justify-center');
            selectedListDiv.classList.add('justify-start');
            selectedListDiv.innerHTML = '';
            localState.tempSupplierIds.forEach(id => {
                const sup = allSuppliers.find(s => s.id === id);
                if (sup) {
                    selectedListDiv.innerHTML += `
                        <div class="selected-supplier-item flex items-center justify-between bg-white border border-slate-200 p-3.5 rounded-xl shadow-sm hover:border-indigo-200 transition-colors" data-id="${sup.id}">
                            <div>
                                <p class="font-black text-slate-800 text-xs uppercase tracking-widest mb-1">${escapeHTML(sup.name)}</p>
                                <p class="text-[9px] font-bold text-slate-500 uppercase tracking-widest"><i class="bi bi-person mr-1"></i> ${escapeHTML(sup.contactName || 'N/I')} | <i class="bi bi-telephone mr-1"></i> ${escapeHTML(sup.phone || 'N/I')}</p>
                            </div>
                            <button type="button" class="text-slate-400 hover:text-red-600 w-10 h-10 flex items-center justify-center hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 active:scale-95" data-remove-supplier="${sup.id}" title="Remover">
                                <i class="bi bi-trash3 pointer-events-none"></i>
                            </button>
                        </div>
                    `;
                }
            });
        } else {
            selectedListDiv.classList.add('justify-center');
            selectedListDiv.classList.remove('justify-start');
            selectedListDiv.innerHTML = '<p class="text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest">Nenhum fornecedor adicionado ainda.</p>';
        }
    };

    const searchInputEl = document.getElementById('modalSupplierSearch');
    if(searchInputEl) searchInputEl.addEventListener('input', renderSupplierLists);
    renderSupplierLists(); // Render inicial

    // Photo Logic 
    const photoInput = modalInner.querySelector('#productPhotoInput');
    const photoButton = modalInner.querySelector('#productPhotoButton');
    const photoContainer = modalInner.querySelector('#productPhotoContainer');
    const photoPreview = modalInner.querySelector('#productPhotoPreview');
    const photoBase64Input = modalInner.querySelector('#productPhotoBase64');
    
    const triggerFileInput = () => photoInput?.click();
    if (photoButton) photoButton.addEventListener('click', triggerFileInput);
    if (photoContainer) photoContainer.addEventListener('click', triggerFileInput);

    if (photoInput) {
        photoInput.onchange = async () => {
            const file = photoInput.files[0];
            if (!file) return;
            
            const originalSrc = photoPreview.src;
            photoPreview.src = 'https://placehold.co/150x150/E2E8F0/4A5568?text=...'; 
            
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

    const formElement = document.getElementById('productForm');
    if (formElement) {
        formElement.onsubmit = async (e) => {
            e.preventDefault();
            const btn = modalInner.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            const nameEl = document.getElementById('productName');
            const priceEl = document.getElementById('productPrice');

            if (!nameEl?.value || !priceEl?.value) {
                showNotification('Aviso', 'Preencha o Nome e o Preço do produto.', 'warning');
                return;
            }

            const currentStock = parseInt(document.getElementById('productCurrentStock')?.value || '0', 10);
            const minStock = parseInt(document.getElementById('productMinStock')?.value || '0', 10);
            
            const checkedUnits = Array.from(document.querySelectorAll('#productForm input[name="accessibleIn"]:checked')).map(cb => cb.value);
            const accessibleIn = checkedUnits.length > 0 ? checkedUnits : [state.establishmentId];

            const productData = {
                ...localState.tempProduct,
                establishmentId: state.establishmentId,
                accessibleIn: accessibleIn,
                name: nameEl.value.trim(),
                sku: document.getElementById('productSku')?.value.trim() || '',
                barcode: document.getElementById('productBarcode')?.value.trim() || '',
                price: parseFloat(priceEl.value),
                costPrice: parseFloat(document.getElementById('productCostPrice')?.value) || 0,
                commissionRate: parseFloat(document.getElementById('productCommissionRate')?.value) || 0,
                currentStock: isNaN(currentStock) ? 0 : currentStock, 
                minStock: isNaN(minStock) ? 0 : minStock,
                categoryId: document.getElementById('productCategory')?.value || null,
                photo: document.getElementById('productPhotoBase64')?.value || '',
                description: document.getElementById('productDescription')?.value.trim() || '',
                active: document.getElementById('productStatusToggle')?.checked !== false,
                supplierIds: Array.from(localState.tempSupplierIds) 
            };

            btn.disabled = true;
            btn.innerHTML = '<span class="spinner-border spinner-border-sm mr-2"></span> A gravar...';

            try {
                if (isEditing) {
                    await productsApi.updateProduct(productId, productData);
                    logAction(state.establishmentId, getCurrentUserForLog(), 'Produtos', 'Editou', `Editou o produto: ${productData.name}`);
                    showNotification('Sucesso', 'Produto atualizado com sucesso!', 'success');
                } else {
                    delete productData.id;
                    await productsApi.createProduct(productData);
                    logAction(state.establishmentId, getCurrentUserForLog(), 'Produtos', 'Criou', `Criou novo produto: ${productData.name}`);
                    showNotification('Sucesso', 'Produto adicionado à rede!', 'success');
                }
                
                hideMobileDetail();
                await fetchAndDisplayData(); 
            } catch (error) {
                showNotification('Erro', error.message, 'error');
                btn.disabled = false;
                btn.innerHTML = originalText;
            }
        };
    }
    
    showMobileDetail();
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
        
        const reportPromises = activeHeaderEstablishments.map(id => 
            productsApi.getStockReport({ ...filters, establishmentId: id }).catch(e => []) 
        );
        
        const reportsArrays = await Promise.all(reportPromises);
        
        let allMovements = [];
        reportsArrays.forEach(report => {
            if (!report) return;
            const items = Array.isArray(report) ? report : (Array.isArray(report.data) ? report.data : (Array.isArray(report.movements) ? report.movements : []));
            allMovements = allMovements.concat(items);
        });

        allMovements.sort((a, b) => parseSafeDate(b.date) - parseSafeDate(a.date));
        
        if (allMovements.length === 0) {
            resultsContainer.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full py-16">
                    <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-dashed border-slate-200">
                        <i class="bi bi-inboxes text-3xl text-slate-300"></i>
                    </div>
                    <h3 class="text-sm font-bold text-slate-700 mb-1">Nenhuma movimentação no período</h3>
                    <p class="text-[10px] text-slate-500 max-w-xs text-center font-medium">Tente alterar as datas ou limpar os filtros de produto.</p>
                </div>`;
            return;
        }

        const tableHTML = `
            <div class="overflow-y-auto custom-scrollbar h-full">
                <table class="min-w-full text-left border-collapse">
                    <thead class="bg-slate-50 sticky top-0 shadow-sm z-10">
                        <tr>
                            <th class="px-5 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-200 whitespace-nowrap">Data e Hora</th>
                            <th class="px-5 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-200 whitespace-nowrap">Produto</th>
                            <th class="px-5 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-200 text-center whitespace-nowrap">Movimento</th>
                            <th class="px-5 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-200 text-center whitespace-nowrap">Qtd. Após</th>
                            <th class="px-5 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-200 whitespace-nowrap">Motivo / Obs</th>
                            <th class="px-5 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-200 whitespace-nowrap">Lançado por</th>
                            <th class="px-5 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-200 whitespace-nowrap text-right">Ação</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${allMovements.map(item => {
                            const isPositive = item.change > 0;
                            const changeColor = isPositive ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-red-700 bg-red-50 border-red-200';
                            const changeIcon = isPositive ? '<i class="bi bi-arrow-down-left"></i>' : '<i class="bi bi-arrow-up-right"></i>';
                            
                            const d = parseSafeDate(item.date);
                            const dateStr = d.toLocaleDateString('pt-BR');
                            const timeStr = d.toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'});

                            return `
                            <tr class="hover:bg-slate-50/50 transition-colors">
                                <td class="px-5 py-3 whitespace-nowrap">
                                    <p class="text-xs font-black text-slate-700">${dateStr}</p>
                                    <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">${timeStr}</p>
                                </td>
                                <td class="px-5 py-3 text-xs font-black text-slate-800 uppercase tracking-widest">${escapeHTML(item.productName)}</td>
                                <td class="px-5 py-3 whitespace-nowrap text-center">
                                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-black text-[10px] border shadow-sm ${changeColor}">
                                        ${changeIcon} ${isPositive ? '+' : ''}${item.change}
                                    </span>
                                </td>
                                <td class="px-5 py-3 whitespace-nowrap text-center text-slate-800 font-black text-sm">${item.newStock}</td>
                                <td class="px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate max-w-[250px]" title="${escapeHTML(item.reason)}">${escapeHTML(item.reason)}</td>
                                <td class="px-5 py-3 whitespace-nowrap text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <div class="w-6 h-6 rounded-md bg-slate-200 flex items-center justify-center text-slate-500 flex-shrink-0"><i class="bi bi-person-fill text-xs"></i></div>
                                    ${escapeHTML(item.user)}
                                </td>
                                <td class="px-5 py-3 whitespace-nowrap text-right">
                                    <button data-action="delete-movement" data-id="${item.id}" data-product-id="${item.productId}" data-est-id="${item.establishmentId}" class="text-slate-400 hover:text-red-500 w-8 h-8 rounded-lg hover:bg-red-50 border border-transparent hover:border-red-100 transition-colors inline-flex items-center justify-center shadow-sm active:scale-95" title="Apagar Movimento">
                                        <i class="bi bi-trash3 pointer-events-none text-sm"></i>
                                    </button>
                                </td>
                            </tr>`;
                        }).join('')}
                    </tbody>
                </table>
            </div>`;

        resultsContainer.innerHTML = tableHTML;

    } catch (error) {
        showNotification('Erro', `Não foi possível gerar: ${error.message}`, 'error');
        resultsContainer.innerHTML = `<div class="p-8 text-center text-red-500 font-bold bg-red-50 rounded-xl m-4 border border-red-100">Falha ao buscar movimentações.</div>`;
    }
}

// --- 9. DELEGAÇÃO DE EVENTOS DE PÁGINA GLOBAL E ACTIONS ---

function setupEventListeners() {
    const globalApplyBtn = document.getElementById('multi-context-apply');
    if (globalApplyBtn) {
        globalApplyBtn.removeEventListener('click', fetchAndDisplayData);
        globalApplyBtn.addEventListener('click', () => {
            setTimeout(fetchAndDisplayData, 100);
        });
    }

    if (pageEventListener) document.body.removeEventListener('click', pageEventListener);
    if (pageInputListener) contentDiv.removeEventListener('input', pageInputListener);
    
    pageEventListener = async (e) => {
        // Abas principais (Catálogo vs Movimentações)
        const mainTabBtn = e.target.closest('[data-main-tab]');
        if (mainTabBtn) {
            localState.currentTab = mainTabBtn.dataset.mainTab;
            renderBaseLayout(); 
            return;
        }

        // Checkboxes de Seleção em Lote
        if (e.target.classList.contains('product-checkbox')) {
            const id = e.target.dataset.id;
            if(e.target.checked) localState.selectedIds.add(id);
            else localState.selectedIds.delete(id);
            updateBatchActionBar();
            e.stopPropagation();
            return;
        }

        // Filtros de Status
        const statusBtn = e.target.closest('.status-filter-btn');
        if (statusBtn) {
            localState.stockFilter = statusBtn.dataset.status;
            document.querySelectorAll('.status-filter-btn').forEach(btn => {
                btn.classList.remove('bg-indigo-600', 'text-white', 'border-indigo-600', 'bg-emerald-600', 'border-emerald-600', 'bg-amber-500', 'border-amber-500', 'bg-red-600', 'border-red-600');
                btn.classList.add('bg-white', 'text-slate-600', 'border-slate-200');
            });
            
            if (localState.stockFilter === 'ok') {
                statusBtn.classList.add('bg-emerald-600', 'text-white', 'border-emerald-600');
            } else if (localState.stockFilter === 'alert') {
                statusBtn.classList.add('bg-amber-500', 'text-white', 'border-amber-500');
            } else if (localState.stockFilter === 'empty') {
                statusBtn.classList.add('bg-red-600', 'text-white', 'border-red-600');
            } else {
                statusBtn.classList.add('bg-indigo-600', 'text-white', 'border-indigo-600');
            }
            statusBtn.classList.remove('bg-white', 'text-slate-600', 'border-slate-200');
            
            filterAndRenderProducts();
            return;
        }

        // Botões de Filtros Avançados
        if (e.target.id === 'clear-filters-btn') {
            e.preventDefault();
            document.getElementById('filterCategoryId').value = 'all';
            localState.filterCategoryId = 'all';
            filterAndRenderProducts();
            return;
        }

        if (e.target.id === 'apply-filter-btn') {
            e.preventDefault();
            localState.filterCategoryId = document.getElementById('filterCategoryId').value;
            filterAndRenderProducts();
            return;
        }

        const toggleFilterBtn = e.target.closest('#toggle-filter-btn');
        if (toggleFilterBtn) {
            e.preventDefault();
            localState.isAdvancedFilterOpen = !localState.isAdvancedFilterOpen;
            const filterPanel = document.getElementById('filter-panel');
            if(localState.isAdvancedFilterOpen) {
                filterPanel.classList.remove('hidden');
                filterPanel.classList.add('block');
                toggleFilterBtn.classList.add('bg-indigo-50', 'text-indigo-700', 'border-indigo-200');
                toggleFilterBtn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');
            } else {
                filterPanel.classList.add('hidden');
                filterPanel.classList.remove('block');
                toggleFilterBtn.classList.remove('bg-indigo-50', 'text-indigo-700', 'border-indigo-200');
                toggleFilterBtn.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
            }
            return;
        }

        // Fechar Modais Clicando Fora
        if(e.target.id === 'products-layout-detail') {
             hideMobileDetail();
             return;
        }
        if(e.target.id === 'movement-layout-detail') {
             hideMovementModal();
             return;
        }
        
        // Adicionar Fornecedor na Lista Temporária do Modal
        const addBtn = e.target.closest('[data-add-supplier]');
        if (addBtn) {
            localState.tempSupplierIds.add(addBtn.dataset.addSupplier);
            const searchInput = document.getElementById('modalSupplierSearch');
            if(searchInput) searchInput.value = ''; 
            searchInput.dispatchEvent(new Event('input'));
            return;
        }

        // Remover Fornecedor da Lista Temporária do Modal
        const removeBtn = e.target.closest('[data-remove-supplier]');
        if (removeBtn) {
            localState.tempSupplierIds.delete(removeBtn.dataset.removeSupplier);
            const searchInput = document.getElementById('modalSupplierSearch');
            if(searchInput) searchInput.dispatchEvent(new Event('input'));
            return;
        }

        // Botões com Ação Específica (Data-Action)
        const actionBtn = e.target.closest('[data-action]');
        if (!actionBtn) return;
        
        const action = actionBtn.dataset.action;

        if (['close-detail-screen', 'close-movement-modal', 'delete-product', 'manage-categories', 'open-product-editor', 'batch-delete', 'open-new-movement-modal', 'delete-movement'].includes(action)) {
            e.stopPropagation();
        }

        switch(action) {
            case 'manage-categories':
                openCategoryModal();
                break;
                
            case 'open-product-editor':
                openProductEditor(actionBtn.dataset.id);
                break;
                
            case 'close-detail-screen':
                hideMobileDetail();
                break;
                
            case 'close-movement-modal':
                hideMovementModal();
                break;
                
            case 'batch-delete':
                handleBatchDelete();
                break;
                
            case 'open-new-movement-modal':
                openNewMovementModal();
                break;
                
            case 'delete-movement': {
                const movId = actionBtn.dataset.id;
                const prodId = actionBtn.dataset.productId;
                const estId = actionBtn.dataset.estId;
                
                if (!movId) return;
                
                const confirmed = await showConfirmation('Apagar Movimentação', 'Tem certeza que deseja excluir esta movimentação? O histórico será limpo, mas o saldo de estoque não será revertido automaticamente nesta ação.');
                if (confirmed) {
                    try {
                        // Verifica se a API implementa a função para deletar. Se não, avisa o admin.
                        if (typeof productsApi.deleteMovement === 'function') {
                            await productsApi.deleteMovement(movId, prodId, estId);
                        } else if (typeof productsApi.deleteStockMovement === 'function') {
                            await productsApi.deleteStockMovement(movId, prodId, estId);
                        } else {
                             throw new Error("A função de excluir movimentação ainda não está implementada no servidor.");
                        }
                        
                        logAction(state.establishmentId, getCurrentUserForLog(), 'Estoque', 'Excluiu Movimento', `Excluiu a movimentação ID: ${movId}`);
                        showNotification('Sucesso', 'Movimentação excluída do histórico.', 'success');
                        await fetchAndDisplayData(); 
                    } catch (error) {
                        showNotification('Aviso', error.message, 'warning');
                    }
                }
                break;
            }

            case 'delete-product': {
                const productIdToDel = actionBtn.dataset.id;
                if (!productIdToDel) return;
                
                const confirmed = await showConfirmation('Apagar Produto', 'Tem certeza que deseja excluir este produto do estoque?');
                if (confirmed) {
                    try {
                        const productName = localState.products.find(s => s.id === productIdToDel)?.name || 'Desconhecido';
                        await productsApi.deleteProduct(productIdToDel);
                        logAction(state.establishmentId, getCurrentUserForLog(), 'Produtos', 'Excluiu', `Excluiu o produto: ${productName}`);
                        showNotification('Sucesso', 'Produto removido do estoque.', 'success');
                        hideMobileDetail();
                        await fetchAndDisplayData(); 
                    } catch (error) {
                        showNotification('Erro', `Não foi possível apagar o produto: ${error.message}`, 'error');
                    }
                }
                break;
            }
        }
    };

    document.body.addEventListener('click', pageEventListener);

    // Lógica da Barra de Pesquisa
    pageInputListener = (e) => {
        if (e.target.id === 'searchInput') {
            localState.searchQuery = e.target.value;
            filterAndRenderProducts();
        }
    };
    contentDiv.addEventListener('input', pageInputListener);
}