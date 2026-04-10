// js/ui/services.js

// --- 1. IMPORTAÇÕES ---
import * as servicesApi from '../api/services.js';
import * as professionalsApi from '../api/professionals.js';
import { getHierarchy } from '../api/establishments.js'; 
import { state } from '../state.js';
import { showNotification, showConfirmation, showGenericModal } from '../components/modal.js';
import * as categoriesApi from '../api/categories.js'; 
import { logAction } from '../api/audit.js';
import { auth } from '../firebase-config.js';
import { escapeHTML, resizeAndCompressImage } from '../utils.js'; 

// --- 2. CONSTANTES E ESTADO LOCAL ---
const contentDiv = document.getElementById('content');

let localState = {
    services: [],
    professionals: [],
    categories: [],
    hierarchyCache: [],
    
    // Filtros
    statusFilter: 'all',
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

// --- 3. RENDERIZAÇÃO DO LAYOUT PRINCIPAL ---

export async function loadServicesPage() {
    localState.selectedIds.clear();
    
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
                <div class="flex bg-gray-200/80 p-1 rounded-xl border border-gray-300 w-full md:w-auto shadow-inner hidden md:flex opacity-0 pointer-events-none">
                    <button class="flex-1 md:w-32 py-1.5 text-xs font-bold rounded-lg transition-all flex justify-center items-center gap-2">Space</button>
                </div>

                <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end ml-auto">
                    <button data-action="manage-categories" class="py-1.5 px-3 bg-white text-gray-700 border border-gray-300 font-bold rounded-lg hover:bg-gray-50 transition shadow-sm flex items-center gap-2 text-xs flex-1 md:flex-none justify-center">
                        <i class="bi bi-tags text-sm"></i> Categorias
                    </button>
                    <button data-action="open-service-modal" data-service="{}" class="py-1.5 px-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-sm flex items-center gap-2 text-xs flex-1 md:flex-none justify-center">
                        <i class="bi bi-plus-lg text-sm"></i> Novo Serviço
                    </button>
                </div>
            </div>

            <div id="summary-section" class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                </div>

            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2 w-full">
                <div class="flex gap-2 overflow-x-auto pb-1 w-full md:w-auto custom-scrollbar">
                    <button data-status="all" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${localState.statusFilter === 'all' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-white text-gray-600 hover:bg-gray-50'}">Todos</button>
                    <button data-status="active" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${localState.statusFilter === 'active' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-white text-gray-600 hover:bg-gray-50'}">Ativos</button>
                    <button data-status="inactive" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${localState.statusFilter === 'inactive' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-white text-gray-600 hover:bg-gray-50'}">Inativos</button>
                </div>

                <div class="flex items-center gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-1 md:pb-0">
                    <div class="relative flex-shrink-0 w-full md:w-64">
                        <i class="bi bi-search absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                        <input type="text" id="searchInput" value="${localState.searchQuery}" placeholder="Pesquisar serviço..." class="w-full pl-8 p-1.5 bg-white border border-gray-200 shadow-sm rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all">
                    </div>
                    <button id="toggle-filter-btn" class="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition shadow-sm flex items-center gap-1.5 text-xs flex-shrink-0 ${localState.isAdvancedFilterOpen ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : ''}">
                        <i class="bi bi-funnel"></i> Filtros
                    </button>
                </div>
            </div>

            <div id="filter-panel" class="${localState.isAdvancedFilterOpen ? 'block' : 'hidden'} mb-3 bg-white p-3 rounded-xl border border-gray-200 shadow-sm animate-fade-in">
                <div class="flex flex-col md:flex-row items-end gap-3">
                    <div class="w-full md:w-64">
                        <label class="block text-[9px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Categoria</label>
                        <select id="filterCategoryId" class="w-full p-2 border border-gray-200 rounded-lg text-xs bg-gray-50 focus:bg-white outline-none focus:ring-1 focus:ring-indigo-500">
                            <option value="all">Todas as categorias</option>
                        </select>
                    </div>

                    <div class="flex gap-2 w-full md:w-auto">
                        <button id="clear-filters-btn" class="w-full md:w-auto px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors text-xs">Limpar</button>
                        <button id="apply-filter-btn" class="w-full md:w-auto px-5 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-sm hover:bg-indigo-700 active:scale-95 transition-all text-xs">
                            Aplicar
                        </button>
                    </div>
                </div>
            </div>

            <div id="servicesList" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20 mt-1 flex-1 content-start overflow-y-auto custom-scrollbar pr-1">
                ${renderSkeletonList(8)}
            </div>

            <button data-action="open-service-modal" data-service="{}" class="md:hidden fixed bottom-20 right-4 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40">
                <i class="bi bi-plus-lg text-xl"></i>
            </button>
        </section>
    `;
}

function setupEventListeners() {
    const globalApplyBtn = document.getElementById('multi-context-apply');
    if (globalApplyBtn) {
        globalApplyBtn.removeEventListener('click', fetchAndDisplayData);
        globalApplyBtn.addEventListener('click', () => {
            setTimeout(fetchAndDisplayData, 100);
        });
    }

    document.querySelectorAll('.status-filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const status = e.target.dataset.status;
            localState.statusFilter = status;
            
            document.querySelectorAll('.status-filter-btn').forEach(b => {
                b.classList.remove('bg-indigo-50', 'text-indigo-700', 'border-indigo-200', 'bg-red-50', 'text-red-700', 'border-red-200');
                b.classList.add('bg-white', 'text-gray-600', 'border-gray-200');
            });
            
            if (status === 'inactive') {
                e.target.classList.add('bg-red-50', 'text-red-700', 'border-red-200');
            } else {
                e.target.classList.add('bg-indigo-50', 'text-indigo-700', 'border-indigo-200');
            }
            e.target.classList.remove('bg-white', 'text-gray-600', 'border-gray-200');
            
            filterAndRenderServices();
        });
    });

    const toggleFilterBtn = document.getElementById('toggle-filter-btn');
    if (toggleFilterBtn) {
        toggleFilterBtn.addEventListener('click', () => {
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
        });
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            localState.searchQuery = e.target.value.toLowerCase();
            filterAndRenderServices();
        });
    }

    const clearBtn = document.getElementById('clear-filters-btn');
    if(clearBtn) {
        clearBtn.addEventListener('click', () => {
            localState.filterCategoryId = 'all';
            document.getElementById('filterCategoryId').value = 'all';
            filterAndRenderServices();
        });
    }

    const applyBtn = document.getElementById('apply-filter-btn');
    if(applyBtn) {
        applyBtn.addEventListener('click', () => {
            localState.filterCategoryId = document.getElementById('filterCategoryId').value;
            document.getElementById('toggle-filter-btn').click(); 
            filterAndRenderServices();
        });
    }

    if (pageEventListener) contentDiv.removeEventListener('click', pageEventListener);
    
    pageEventListener = e => {
        const cardOrBtn = e.target.closest('[data-action="open-service-modal"]');
        if (cardOrBtn) {
            e.preventDefault();
            let servData = {};
            if (cardOrBtn.dataset.service) {
                try { servData = JSON.parse(cardOrBtn.dataset.service); } catch (err) {}
            }
            openServiceModal(servData);
            return;
        }

        const catBtn = e.target.closest('[data-action="manage-categories"]');
        if (catBtn) {
            e.preventDefault();
            openCategoryModal();
            return;
        }

        const checkbox = e.target.closest('.service-checkbox');
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
            document.querySelectorAll('.service-checkbox').forEach(cb => cb.checked = false);
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
}

// --- 4. COMUNICAÇÃO DE DADOS E RENDERIZAÇÃO DA LISTA ---

async function fetchAndDisplayData() {
    const listDiv = document.getElementById('servicesList');
    const activeHeaderEstablishments = getActiveEstablishmentsFromHeader();
    
    try {
        const servPromises = activeHeaderEstablishments.map(id => servicesApi.getServices(id));
        const profPromises = activeHeaderEstablishments.map(id => professionalsApi.getProfessionals(id));
        const catPromises = activeHeaderEstablishments.map(id => categoriesApi.getCategories(id, 'services'));
        
        const servResults = await Promise.all(servPromises);
        const profResults = await Promise.all(profPromises);
        const catResults = await Promise.all(catPromises);
        
        const servMap = new Map();
        servResults.flat().filter(Boolean).forEach(s => servMap.set(s.id, s));
        localState.services = Array.from(servMap.values());
        state.services = localState.services; 
        
        const profMap = new Map();
        profResults.flat().filter(Boolean).forEach(p => profMap.set(p.id, p));
        localState.professionals = Array.from(profMap.values());
        state.professionals = localState.professionals;

        const catMap = new Map();
        catResults.flat().filter(Boolean).forEach(c => catMap.set(c.id, c));
        localState.categories = Array.from(catMap.values());
        state.serviceCategories = localState.categories;
        
        populateCategoryFilter();
        filterAndRenderServices(); 
        
    } catch (error) {
        console.error(error);
        listDiv.innerHTML = '<div class="col-span-full py-16 text-center"><p class="text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-100 inline-block text-sm"><i class="bi bi-exclamation-triangle"></i> Erro ao carregar dados do servidor.</p></div>';
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

    const total = filteredList.length;
    const ativos = filteredList.filter(s => s.active !== false).length;
    const inativos = total - ativos;

    section.innerHTML = `
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Serviços na Rede</span>
            <span class="text-xl font-black text-gray-800 mt-0.5">${total}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ativos</span>
            <span class="text-xl font-bold text-emerald-600 mt-0.5">${ativos}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Inativos</span>
            <span class="text-xl font-bold text-red-500 mt-0.5">${inativos}</span>
        </div>
        <div class="bg-indigo-50 p-3 rounded-xl border border-indigo-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Filtrados / Exibidos</span>
            <span class="text-xl font-bold text-indigo-700 mt-0.5">${filteredList.length}</span>
        </div>
    `;
}

function filterAndRenderServices() {
    const listDiv = document.getElementById('servicesList');
    if (!listDiv) return;

    if (!localState.services || localState.services.length === 0) {
        listDiv.innerHTML = renderSkeletonList(8); 
        return;
    }

    const activeHeaderEstablishments = getActiveEstablishmentsFromHeader();
    
    const filtered = localState.services.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(localState.searchQuery);
        
        let matchesStatus = true;
        if(localState.statusFilter === 'active') matchesStatus = s.active !== false;
        if(localState.statusFilter === 'inactive') matchesStatus = s.active === false;
        
        const matchesCategory = localState.filterCategoryId === "all" || s.categoryId === localState.filterCategoryId;
        
        const sUnits = s.accessibleIn && s.accessibleIn.length > 0 ? s.accessibleIn : [s.establishmentId || state.establishmentId];
        const matchesBranch = activeHeaderEstablishments.some(id => sUnits.includes(id));

        return matchesSearch && matchesStatus && matchesCategory && matchesBranch;
    });
    
    renderKPIs(filtered);
    listDiv.innerHTML = renderServicesListHTML(filtered);
}

// --- RENDERS DE COMPONENTES ---

function renderSkeletonList(count = 8) {
    let skeletonHTML = '';
    for (let i = 0; i < count; i++) {
        skeletonHTML += `
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm flex items-center p-3 animate-pulse h-[74px]">
            <div class="w-10 h-10 rounded bg-gray-200 flex-shrink-0 mr-3"></div>
            <div class="flex-1 space-y-2">
                <div class="h-2.5 bg-gray-200 rounded w-3/4"></div>
                <div class="h-2 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        `;
    }
    return skeletonHTML;
}

function renderServicesListHTML(servicesList) {
    if (servicesList.length === 0) {
        return `
            <div class="col-span-full flex flex-col items-center justify-center py-16">
                <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-scissors text-xl text-gray-300"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-600 mb-1">Nenhum serviço encontrado</h3>
                <p class="text-[10px] text-gray-400">Tente ajustar os filtros ou verificar as unidades no topo.</p>
            </div>
        `;
    }

    const categoryMap = new Map((localState.categories || []).map(c => [c.id, c.name]));

    return servicesList.map(service => {
        const isInactive = service.active === false;
        const safeName = escapeHTML(service.name);
        const safeCategoryName = escapeHTML(categoryMap.get(service.categoryId) || 'Sem Categoria');
        
        const photoSrc = service.photo || `https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(service.name.charAt(0))}`;
        const serviceDataString = JSON.stringify(service).replace(/'/g, "&apos;");

        const unitCount = service.accessibleIn ? service.accessibleIn.length : 1;
        const isSelected = localState.selectedIds.has(service.id);
        const formattedPrice = service.price !== undefined ? parseFloat(service.price).toFixed(2) : '0.00';
        const serviceColor = service.color || '#4f46e5';

        return `
            <div class="service-card relative bg-white rounded-xl border ${isSelected ? 'border-indigo-400 ring-1 ring-indigo-200 shadow-md bg-indigo-50/20' : 'border-gray-200'} shadow-sm flex items-center p-3 cursor-pointer transition-all hover:shadow-md hover:border-indigo-300 ${isInactive ? 'opacity-60 bg-gray-50' : ''}" 
                 data-action="open-service-modal" data-service='${serviceDataString}'>
                
                <div class="absolute top-2 right-2 z-10 flex flex-col gap-2 items-center" onclick="event.stopPropagation()">
                    <input type="checkbox" data-id="${service.id}" class="service-checkbox w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${isSelected ? 'checked' : ''}>
                </div>

                <div class="relative flex-shrink-0 mr-3">
                    <img src="${photoSrc}" alt="${safeName}" class="w-12 h-12 rounded-lg object-cover border border-gray-100 shadow-sm" style="border-left: 3px solid ${serviceColor};">
                    <span class="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-white rounded-full ${isInactive ? 'bg-red-500' : 'bg-emerald-500'}" title="${isInactive ? 'Inativo' : 'Ativo'}"></span>
                </div>
                
                <div class="flex-1 min-w-0 pr-4">
                    <h3 class="text-xs font-bold text-gray-800 truncate leading-tight">
                        ${safeName}
                    </h3>
                    <p class="text-[10px] text-gray-500 truncate mt-0.5">${safeCategoryName}</p>
                    
                    <div class="flex items-center justify-between mt-1.5">
                        <span class="text-[11px] font-black text-indigo-600">R$ ${formattedPrice}</span>
                        <div class="flex gap-1">
                            <span class="text-[8px] font-semibold text-gray-600 bg-gray-100 px-1 py-0.5 rounded border border-gray-200 flex items-center gap-1"><i class="bi bi-clock"></i> ${service.duration}m</span>
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
        }, 'services');
        
        logAction(state.establishmentId, getCurrentUserForLog(), 'Categorias (Serviços)', 'Criou', `Criou categoria: ${name}`);

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
    const confirmed = await showConfirmation('Apagar Categoria', 'Tem a certeza? Os serviços nesta categoria ficarão sem categoria.');
    if (confirmed) {
        try {
            await categoriesApi.deleteCategory(categoryId, 'services');
            logAction(state.establishmentId, getCurrentUserForLog(), 'Categorias (Serviços)', 'Excluiu', `Excluiu uma categoria (ID: ${categoryId})`);

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
        const categories = await categoriesApi.getCategories(state.establishmentId, 'services');
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
                <p class="text-xs text-indigo-800 mb-3 font-medium">As categorias criadas aqui ficarão disponíveis para toda a rede de lojas.</p>
                <form id="categoryForm" class="flex flex-col sm:flex-row gap-3 sm:items-end">
                    <div class="flex-1 w-full">
                        <label for="categoryName" class="block text-[10px] font-bold text-indigo-900 uppercase tracking-wider mb-1">Nova Categoria</label>
                        <input type="text" id="categoryName" placeholder="Ex: Cabelo, Estética..." required class="w-full p-2 border border-indigo-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
                    </div>
                    <button type="submit" class="w-full sm:w-auto py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-sm text-sm">Adicionar</button>
                </form>
            </div>
            <div id="categoryList" class="space-y-1 max-h-64 overflow-y-auto p-2 border border-gray-200 rounded-xl custom-scrollbar"></div>
        </div>
    `;

    showGenericModal({
        title: "Categorias de Serviços",
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

// --- 6. LÓGICA DE SERVIÇOS (MODAL CADASTRO PRO) ---

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

async function handleServiceFormSubmit(e) {
    e.preventDefault();
    const form = e.target.closest('#serviceForm');
    const serviceId = form.querySelector('#serviceId').value;
    const saveButton = form.querySelector('button[type="submit"]');
    
    const professionalCommissions = {};
    const commissionType = form.querySelector('input[name="commissionType"]:checked').value;
    if (commissionType === 'custom') {
        form.querySelectorAll('.professional-commission-row').forEach(row => {
            const profId = row.dataset.profId;
            const isChecked = row.querySelector('input[type="checkbox"]').checked;
            if (isChecked) {
                const rate = parseFloat(row.querySelector('input[type="number"]').value);
                professionalCommissions[profId] = isNaN(rate) ? 0 : rate;
            }
        });
    }

    const checkedUnits = Array.from(form.querySelectorAll('input[name="accessibleIn"]:checked')).map(cb => cb.value);
    const accessibleIn = checkedUnits.length > 0 ? checkedUnits : [state.establishmentId];

    const serviceData = {
        establishmentId: state.establishmentId, 
        accessibleIn: accessibleIn, 
        name: form.querySelector('#serviceName').value.trim(),
        price: parseFloat(form.querySelector('#servicePrice').value),
        duration: parseInt(form.querySelector('#serviceDurationMinutes').value, 10),
        bufferTime: parseInt(form.querySelector('#serviceBufferTimeMinutes').value, 10) || 0,
        categoryId: form.querySelector('#serviceCategory').value || null,
        
        // Novos Campos Avançados
        color: form.querySelector('#serviceColor').value,
        targetAudience: form.querySelector('#serviceAudience').value,
        loyaltyPoints: parseInt(form.querySelector('#serviceLoyaltyPoints').value, 10) || 0,
        publicDescription: form.querySelector('#servicePublicDescription').value.trim(),
        homeService: form.querySelector('#serviceHomeToggle').checked,
        
        commissionRate: parseFloat(form.querySelector('#serviceCommissionRate').value) || 0,
        active: form.querySelector('#serviceStatusToggle').checked, 
        photo: form.querySelector('#servicePhotoBase64').value,
        notes: form.querySelector('#serviceNotes').value,
        commissionType: commissionType,
        professionalCommissions: professionalCommissions
    };

    const originalText = saveButton.innerHTML;
    saveButton.disabled = true;
    saveButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';

    try {
        if (serviceId) {
            await servicesApi.updateService(serviceId, serviceData);
            logAction(state.establishmentId, getCurrentUserForLog(), 'Serviços', 'Editou', `Editou o serviço: ${serviceData.name}`);
            showNotification('Sucesso', 'Serviço atualizado com sucesso!', 'success');
        } else {
            await servicesApi.createService(serviceData);
            logAction(state.establishmentId, getCurrentUserForLog(), 'Serviços', 'Criou', `Criou novo serviço: ${serviceData.name}`);
            showNotification('Sucesso', 'Serviço adicionado à rede!', 'success');
        }
        
        document.getElementById('genericModal').style.display = 'none';
        await fetchAndDisplayData(); 
    } catch (error) {
        showNotification('Erro', error.message, 'error');
        saveButton.disabled = false;
        saveButton.innerHTML = originalText;
    }
}

function openServiceModal(service = null) {
    const modal = document.getElementById('genericModal');
    const categories = localState.categories || []; 

    const durationInMinutes = service?.duration || 0; 
    const bufferTimeInMinutes = service?.bufferTime || 0; 
    
    const safeName = escapeHTML(service?.name || '');
    const safeNotes = escapeHTML(service?.notes || '');
    const safePublicDescription = escapeHTML(service?.publicDescription || '');
    const safeTitle = service?.id ? safeName : 'Novo Serviço';

    const serviceColor = service?.color || '#4f46e5'; // Indigo default
    const loyaltyPoints = service?.loyaltyPoints || 0;

    const categoryOptions = categories.map(c => 
        `<option value="${c.id}" ${service?.categoryId === c.id ? 'selected' : ''}>${escapeHTML(c.name)}</option>`
    ).join('');

    const photoSrc = service?.photo || `https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(safeName ? safeName.charAt(0) : 'S')}`;

    const modalHTML = `
        <div class="modal-content max-w-4xl p-0 overflow-hidden flex flex-col max-h-[90vh]"> 
            <div class="modal-header px-6 py-4 flex justify-between items-center border-b bg-white flex-shrink-0">
                <h2 class="text-xl font-bold text-gray-800">${safeTitle}</h2>
                <button data-action="close-modal" class="text-gray-400 hover:text-red-500 transition-colors text-3xl leading-none">&times;</button>
            </div>
            
            <div class="modal-tabs px-6 border-b flex items-center overflow-x-auto bg-gray-50 flex-shrink-0 custom-scrollbar">
                <button class="tab-link active whitespace-nowrap font-semibold py-3 px-4 border-b-2 border-indigo-600 text-indigo-600 transition-colors" data-tab="dados-basicos">1. Dados Básicos</button>
                <button class="tab-link whitespace-nowrap font-semibold py-3 px-4 border-b-2 border-transparent text-gray-500 hover:text-indigo-500 transition-colors" data-tab="config-avancadas">2. Configurações & App</button>
                <button class="tab-link whitespace-nowrap font-semibold py-3 px-4 border-b-2 border-transparent text-gray-500 hover:text-indigo-500 transition-colors" data-tab="comissoes-servico">3. Comissões</button>
            </div>
            
            <div class="modal-body p-6 bg-white flex-1 overflow-y-auto custom-scrollbar relative"> 
                <form id="serviceForm" class="h-full">
                    <input type="hidden" id="serviceId" value="${service?.id || ''}">
                    <input type="hidden" id="servicePhotoBase64" value="${service?.photo || ''}">
                    
                    <div id="dados-basicos" class="tab-content active space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div class="md:col-span-1 space-y-4">
                                <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                                    <label class="block text-sm font-bold text-gray-700 mb-3">Imagem do Serviço</label>
                                    <div class="relative group mx-auto w-32 h-32 mb-4 cursor-pointer" id="servicePhotoContainer">
                                        <img id="servicePhotoPreview" src="${photoSrc}" alt="Foto" class="w-32 h-32 rounded-lg object-cover border-4 border-gray-50 shadow-md transition-all group-hover:brightness-75">
                                        <div id="servicePhotoButtonOverlay" class="absolute inset-0 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                                            <i class="bi bi-camera-fill text-white text-3xl drop-shadow-md"></i>
                                        </div>
                                    </div>
                                    <input type="file" id="servicePhotoInput" class="hidden" accept="image/*">
                                    <button type="button" id="servicePhotoButton" class="text-indigo-600 text-sm font-semibold hover:text-indigo-800 transition-colors w-full">Alterar Imagem</button>
                                </div>

                                <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <label for="serviceColor" class="block text-sm font-bold text-gray-700 mb-2 text-center">Cor na Agenda</label>
                                    <div class="flex items-center justify-center gap-3">
                                        <input type="color" id="serviceColor" value="${serviceColor}" class="w-12 h-12 p-1 border border-gray-300 rounded cursor-pointer bg-white">
                                        <span class="text-xs text-gray-500 max-w-[120px] text-left leading-tight">Ajuda a identificar visualmente os agendamentos.</span>
                                    </div>
                                </div>
                            </div>

                            <div class="md:col-span-2 space-y-4">
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div class="form-group sm:col-span-2">
                                        <label for="serviceName" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-tag text-indigo-500 mr-1"></i> Nome do Serviço <span class="text-red-500">*</span></label>
                                        <input type="text" id="serviceName" value="${safeName}" required placeholder="Ex: Corte Masculino Degradê" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors text-lg font-semibold text-gray-800">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="servicePrice" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-currency-dollar text-emerald-500 mr-1"></i> Preço (R$) <span class="text-red-500">*</span></label>
                                        <input type="number" id="servicePrice" step="0.01" value="${service?.price !== undefined ? service.price : ''}" required placeholder="0.00" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 focus:bg-white transition-colors font-bold text-gray-800">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="serviceCategory" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-folder2-open text-amber-500 mr-1"></i> Categoria</label>
                                        <select id="serviceCategory" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors">
                                            <option value="">Sem Categoria</option>
                                            ${categoryOptions}
                                        </select>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="serviceDurationMinutes" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-clock-history text-blue-500 mr-1"></i> Duração (minutos) <span class="text-red-500">*</span></label>
                                        <input type="number" id="serviceDurationMinutes" min="0" value="${durationInMinutes}" required placeholder="Ex: 45" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-colors">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="serviceBufferTimeMinutes" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-cup-hot text-orange-400 mr-1"></i> Pausa Pós-Serviço (min)</label>
                                        <input type="number" id="serviceBufferTimeMinutes" min="0" value="${bufferTimeInMinutes}" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50 focus:bg-white transition-colors" placeholder="Ex: 10 (limpeza, preparo)">
                                    </div>
                                </div>
                                
                                <div class="pt-2 border-t border-gray-100">
                                    <label class="block text-sm font-bold text-indigo-900 mb-1 flex items-center gap-2"><i class="bi bi-diagram-3"></i> Lojas que oferecem este serviço</label>
                                    <p class="text-xs text-gray-500 mb-2">Selecione as unidades onde o serviço pode ser agendado.</p>
                                    ${generateUnitCheckboxesHTML(service?.accessibleIn || [])}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="config-avancadas" class="tab-content hidden space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div class="space-y-4">
                                <h3 class="text-sm font-bold text-gray-800 border-b pb-2"><i class="bi bi-sliders mr-1"></i> Definições de Atendimento</h3>
                                
                                <div class="form-group">
                                    <label for="serviceAudience" class="block text-sm font-medium text-gray-700 mb-1">Público-Alvo</label>
                                    <select id="serviceAudience" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors">
                                        <option value="todos" ${service?.targetAudience === 'todos' ? 'selected' : ''}>Todos (Unissex)</option>
                                        <option value="feminino" ${service?.targetAudience === 'feminino' ? 'selected' : ''}>Feminino</option>
                                        <option value="masculino" ${service?.targetAudience === 'masculino' ? 'selected' : ''}>Masculino</option>
                                        <option value="infantil" ${service?.targetAudience === 'infantil' ? 'selected' : ''}>Infantil</option>
                                    </select>
                                </div>

                                <div class="bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                                    <div>
                                        <p class="text-sm font-bold text-gray-800"><i class="bi bi-house-door text-indigo-500 mr-1"></i> Atende a domicílio?</p>
                                        <p class="text-[10px] text-gray-500 leading-tight mt-0.5">Permite que o cliente solicite que o profissional vá até ele.</p>
                                    </div>
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" id="serviceHomeToggle" class="sr-only peer" ${service?.homeService ? 'checked' : ''}>
                                        <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                    </label>
                                </div>

                                <div class="form-group pt-2">
                                    <label for="serviceNotes" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-journal-text text-gray-500 mr-1"></i> Observações Internas (Só Gestão)</label>
                                    <textarea id="serviceNotes" rows="3" class="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors placeholder-gray-400" placeholder="Detalhes técnicos, custo de produtos, etc...">${safeNotes}</textarea>
                                </div>
                            </div>

                            <div class="space-y-4">
                                <h3 class="text-sm font-bold text-gray-800 border-b pb-2"><i class="bi bi-phone mr-1"></i> Exibição no Aplicativo/Link</h3>

                                <div class="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex items-center justify-between">
                                    <div>
                                        <p class="text-sm font-bold text-indigo-900">Visível no App / Online</p>
                                        <p class="text-[10px] text-indigo-700 leading-tight mt-0.5">Ative para permitir o agendamento público.</p>
                                    </div>
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" id="serviceStatusToggle" class="sr-only peer" ${service?.active !== false ? 'checked' : ''}>
                                        <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                    </label>
                                </div>

                                <div class="form-group">
                                    <label for="serviceLoyaltyPoints" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-star text-amber-400 mr-1"></i> Pontos de Fidelidade Ganhos</label>
                                    <div class="flex items-center">
                                        <input type="number" id="serviceLoyaltyPoints" min="0" value="${loyaltyPoints}" class="w-full p-2.5 border border-gray-300 rounded-l-lg outline-none focus:ring-2 focus:ring-amber-500 bg-gray-50 focus:bg-white transition-colors" placeholder="0">
                                        <span class="bg-gray-100 border border-l-0 border-gray-300 px-4 py-2.5 rounded-r-lg text-sm font-bold text-gray-500">pts</span>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="servicePublicDescription" class="block text-sm font-medium text-gray-700 mb-1"><i class="bi bi-card-text text-gray-500 mr-1"></i> Descrição Pública para o Cliente</label>
                                    <textarea id="servicePublicDescription" rows="3" class="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors placeholder-gray-400" placeholder="Ex: Tratamento reconstrutor capilar feito com produtos premium...">${safePublicDescription}</textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="comissoes-servico" class="tab-content hidden space-y-6">
                        <div class="max-w-2xl mx-auto">
                            <div class="bg-indigo-50 p-4 rounded-xl border border-indigo-100 mb-6">
                                <label class="block text-base font-bold text-indigo-900 mb-1"><i class="bi bi-percent mr-1"></i> Regras de Comissão</label>
                                <p class="text-xs text-indigo-700 mb-3">Defina como o profissional é remunerado ao executar este serviço.</p>
                                
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                                    <label class="flex items-center p-3 border border-indigo-200 bg-white rounded-lg cursor-pointer hover:border-indigo-400 transition-colors shadow-sm">
                                        <input type="radio" name="commissionType" value="default" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500" ${service?.commissionType !== 'custom' ? 'checked' : ''}>
                                        <span class="ml-3 text-sm font-bold text-gray-700">Taxa Padrão (Igual p/ Todos)</span>
                                    </label>
                                    <label class="flex items-center p-3 border border-indigo-200 bg-white rounded-lg cursor-pointer hover:border-indigo-400 transition-colors shadow-sm">
                                        <input type="radio" name="commissionType" value="custom" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500" ${service?.commissionType === 'custom' ? 'checked' : ''}>
                                        <span class="ml-3 text-sm font-bold text-gray-700">Taxa Personalizada (Por Membro)</span>
                                    </label>
                                </div>
                            </div>

                            <div id="defaultCommissionRateContainer" class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
                                <label for="serviceCommissionRate" class="block text-sm font-bold text-gray-700 mb-2">Qual a taxa de comissão padrão?</label>
                                <div class="flex items-center justify-center gap-2">
                                    <input type="number" id="serviceCommissionRate" value="${service?.commissionRate || 0}" step="0.1" class="w-32 p-3 text-xl font-black text-center border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white text-indigo-600">
                                    <span class="text-xl font-black text-gray-400">%</span>
                                </div>
                            </div>
                            
                            <div id="professionalCommissionsContainer" class="hidden">
                                <div class="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                    <div class="grid grid-cols-[1fr_auto] items-center p-3 bg-gray-100 font-bold text-xs text-gray-600 uppercase tracking-wider border-b border-gray-200">
                                        <span>Profissional Habilitado</span>
                                        <span class="text-center w-24">Taxa (%)</span>
                                    </div>
                                    <div id="professionalCommissionsList" class="space-y-1 max-h-[300px] overflow-y-auto p-2 bg-white custom-scrollbar"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            
            <div class="modal-footer px-6 py-4 bg-gray-50 border-t flex justify-between items-center flex-shrink-0">
                <button type="button" data-action="delete-service" data-id="${service?.id || ''}" class="text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg font-medium transition-colors ${service?.id ? '' : 'hidden'}" title="Excluir Serviço">
                    <i class="bi bi-trash3 mr-1"></i> Excluir
                </button>

                <div class="flex gap-3 ml-auto">
                    <button data-action="close-modal" class="py-2.5 px-5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 shadow-sm transition-colors">Cancelar</button>
                    <button type="button" data-action="save-service" class="py-2.5 px-6 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-sm flex items-center gap-2 transition-colors">
                        <i class="bi bi-save"></i> Salvar
                    </button>
                </div>
            </div>
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

    // Commissions logic
    const commissionTypeRadios = modal.querySelectorAll('input[name="commissionType"]');
    const defaultCommissionContainer = document.getElementById('defaultCommissionRateContainer');
    const customCommissionContainer = document.getElementById('professionalCommissionsContainer');
    
    function toggleCommissionView() {
        const selected = modal.querySelector('input[name="commissionType"]:checked').value;
        if (defaultCommissionContainer) defaultCommissionContainer.style.display = selected === 'default' ? 'block' : 'none';
        if (customCommissionContainer) customCommissionContainer.style.display = selected === 'custom' ? 'block' : 'none';
    }
    
    commissionTypeRadios.forEach(radio => radio.addEventListener('change', toggleCommissionView));
    
    const profListContainer = document.getElementById('professionalCommissionsList');
    if (profListContainer) {
        profListContainer.innerHTML = (localState.professionals || []).map(prof => {
            const isChecked = service?.professionalCommissions?.[prof.id] !== undefined;
            const rate = service?.professionalCommissions?.[prof.id] || 0;
            return `
                <div class="professional-commission-row flex items-center justify-between p-2 rounded-lg border border-transparent hover:bg-gray-50 transition-colors ${isChecked ? 'bg-indigo-50/50 border-indigo-100' : ''}" data-prof-id="${prof.id}">
                    <label class="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
                        <input type="checkbox" ${isChecked ? 'checked' : ''} class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <img src="${prof.photo || `https://placehold.co/40x40/E2E8F0/4A5568?text=${escapeHTML(prof.name.charAt(0))}`}" class="w-8 h-8 rounded-full object-cover border border-gray-200 flex-shrink-0">
                        <span class="text-sm font-bold text-gray-700 truncate">${escapeHTML(prof.name)}</span>
                    </label>
                    <div class="flex items-center gap-1">
                        <input type="number" value="${rate}" step="0.1" class="w-20 p-1.5 border border-gray-300 rounded-lg text-sm text-center outline-none focus:ring-1 focus:ring-indigo-500 bg-white" ${!isChecked ? 'disabled' : ''}>
                        <span class="text-sm font-black text-gray-400">%</span>
                    </div>
                </div>
            `;
        }).join('');

        profListContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const row = e.target.closest('.professional-commission-row');
                row.querySelector('input[type="number"]').disabled = !e.target.checked;
                row.classList.toggle('bg-indigo-50/50', e.target.checked);
                row.classList.toggle('border-indigo-100', e.target.checked);
                row.classList.toggle('border-transparent', !e.target.checked);
            });
        });
    }

    toggleCommissionView(); 

    // Photo Logic
    const photoInput = modal.querySelector('#servicePhotoInput');
    const photoButton = modal.querySelector('#servicePhotoButton');
    const photoContainer = modal.querySelector('#servicePhotoContainer');
    const photoPreview = modal.querySelector('#servicePhotoPreview');
    const photoBase64Input = modal.querySelector('#servicePhotoBase64');
    
    const triggerFileInput = () => photoInput.click();
    if (photoButton) photoButton.addEventListener('click', triggerFileInput);
    if (photoContainer) photoContainer.addEventListener('click', triggerFileInput);

    photoInput.onchange = async () => {
        const file = photoInput.files[0];
        if (!file) return;
        photoPreview.src = 'https://placehold.co/128x128/E2E8F0/4A5568?text=...'; 
        try {
            const resizedBase64 = await resizeAndCompressImage(file, 800, 800, 0.8);
            const sizeInBytes = (resizedBase64.length * 3) / 4; 
            if (sizeInBytes > 1000 * 1024) throw new Error('A imagem é muito grande mesmo após a compressão.');
            photoPreview.src = resizedBase64;
            photoBase64Input.value = resizedBase64;
        } catch (error) {
            showNotification('Erro de Imagem', error.message, 'error');
            photoPreview.src = photoSrc;
            photoBase64Input.value = service?.photo || '';
        }
    };
    
    // Modal Event Listener
    const form = modal.querySelector('#serviceForm');
    
    modal.onclick = async (e) => {
        const button = e.target.closest('button[data-action]');
        if (!button) return;

        const action = button.dataset.action;
        const serviceIdToDel = button.dataset.id;

        if (action === 'close-modal') modal.style.display = 'none';

        if (action === 'save-service') {
            if (form.reportValidity()) {
                handleServiceFormSubmit({ target: form, preventDefault: () => {} });
            }
        }

        if (action === 'delete-service') {
            if (!serviceIdToDel) return;
            const confirmed = await showConfirmation('Apagar Serviço', 'Tem certeza que deseja excluir este serviço da rede?');
            if (confirmed) {
                try {
                    const serviceName = localState.services.find(s => s.id === serviceIdToDel)?.name || 'Desconhecido';
                    await servicesApi.deleteService(serviceIdToDel);
                    logAction(state.establishmentId, getCurrentUserForLog(), 'Serviços', 'Excluiu', `Excluiu o serviço: ${serviceName}`);
                    showNotification('Sucesso', 'Serviço apagado da rede.', 'success');
                    modal.style.display = 'none';
                    await fetchAndDisplayData(); 
                } catch (error) {
                    showNotification('Erro', `Não foi possível apagar o serviço: ${error.message}`, 'error');
                }
            }
        }
    };
}

function handleBatchDelete() {
    showConfirmation('Excluir em Lote', `Tem certeza que deseja excluir ${localState.selectedIds.size} serviços da rede? Esta ação não pode ser desfeita.`)
        .then(async (confirmed) => {
            if (confirmed) {
                try {
                    const deletePromises = Array.from(localState.selectedIds).map(id => servicesApi.deleteService(id));
                    await Promise.all(deletePromises);
                    
                    logAction(state.establishmentId, getCurrentUserForLog(), 'Serviços', 'Excluiu em Lote', `Excluiu ${localState.selectedIds.size} serviços`);
                    showNotification('Sucesso', `${localState.selectedIds.size} serviços foram excluídos.`, 'success');
                    
                    localState.selectedIds.clear();
                    updateBatchActionBar();
                    fetchAndDisplayData();
                } catch (error) {
                    showNotification('Erro', `Não foi possível excluir em lote: ${error.message}`, 'error');
                }
            }
        });
}