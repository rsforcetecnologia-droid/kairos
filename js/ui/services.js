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
    services: null, 
    professionals: [],
    categories: [],
    hierarchyCache: [],
    
    // Filtros
    statusFilter: 'all',
    searchQuery: '',
    filterCategoryId: 'all',
    isAdvancedFilterOpen: false,
    
    selectedIds: new Set(),
    tempService: null
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

// --- 3. TROCA DE ECRÃS (MODAL FLUTUANTE) ---
function showMobileDetail() {
    const modal = document.getElementById('services-layout-detail');
    const modalInner = document.getElementById('service-modal-inner');
    
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
    const modal = document.getElementById('services-layout-detail');
    const modalInner = document.getElementById('service-modal-inner');
    
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
    localState.tempService = null;
}


// --- 4. RENDERIZAÇÃO DO LAYOUT PRINCIPAL ---

export async function loadServicesPage() {
    localState.selectedIds.clear();
    localState.services = null;
    
    try {
        const payload = await getHierarchy();
        localState.hierarchyCache = payload.matrizes || [];
    } catch (e) { console.warn("Erro ao buscar lojas", e); }

    renderBaseLayout();
    setupEventListeners(); // Função agora perfeitamente definida
    await fetchAndDisplayData();
}

function renderBaseLayout() {
    contentDiv.innerHTML = `
        <div class="h-full flex w-full relative overflow-hidden bg-slate-50">
            <section id="services-layout-main" class="flex-1 flex flex-col p-4 md:pl-6 md:pr-6 md:pt-6 w-full relative overflow-y-auto custom-scrollbar">
                
                <div id="batch-action-bar" class="hidden absolute top-4 left-4 right-4 z-30 bg-slate-900 text-white rounded-xl shadow-2xl p-2.5 items-center justify-between animate-fade-in-down">
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
                        <input type="text" id="searchInput" value="${localState.searchQuery}" placeholder="Pesquisar serviço..." class="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm text-sm font-semibold text-slate-700">
                    </div>
                    
                    <div class="grid grid-cols-2 md:flex md:flex-wrap items-center gap-2 w-full md:w-auto">
                        <button data-action="manage-categories" class="py-2.5 px-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-2 text-xs active:scale-95">
                            <i class="bi bi-tags text-base"></i> Categorias
                        </button>
                        <button id="toggle-filter-btn" class="py-2.5 px-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-2 text-xs active:scale-95 ${localState.isAdvancedFilterOpen ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : ''}">
                            <i class="bi bi-funnel text-base"></i> Filtros
                        </button>
                        <button data-action="open-service-editor" data-id="" class="py-2.5 px-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-500/30 flex items-center justify-center gap-2 text-xs active:scale-95 uppercase tracking-wider border border-indigo-500 col-span-2 md:col-span-1">
                            <i class="bi bi-plus-lg text-base"></i> Novo Serviço
                        </button>
                    </div>
                </div>

                <div id="filter-panel" class="${localState.isAdvancedFilterOpen ? 'block' : 'hidden'} mb-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm animate-fade-in">
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

                <div id="summary-section" class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 animate-fade-in w-full"></div>

                <div class="flex gap-2 overflow-x-auto pb-2 w-full custom-scrollbar mb-2 animate-fade-in flex-shrink-0">
                    <button data-status="all" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${localState.statusFilter === 'all' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}">Todos</button>
                    <button data-status="active" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${localState.statusFilter === 'active' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}">Ativos</button>
                    <button data-status="inactive" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${localState.statusFilter === 'inactive' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}">Inativos</button>
                </div>

                <div id="servicesList" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 pb-20 mt-1 flex-1 content-start overflow-y-auto custom-scrollbar pr-1">
                    ${renderSkeletonList(8)}
                </div>
            </section>
        </div>

        <div id="services-layout-detail" class="hidden fixed inset-0 z-[99999] bg-slate-900/60 backdrop-blur-sm items-center justify-center p-0 md:p-6 opacity-0 transition-opacity duration-300">
            <div id="service-modal-inner" class="bg-slate-50 w-full h-[100dvh] md:h-auto md:max-h-[95vh] md:max-w-4xl flex flex-col md:rounded-3xl shadow-2xl transform scale-95 translate-y-4 md:translate-y-0 transition-all duration-300 overflow-hidden">
                </div>
        </div>
    `;
}

// --- 5. COMUNICAÇÃO DE DADOS E RENDERIZAÇÃO DA LISTA ---

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
        if (listDiv) {
            listDiv.innerHTML = '<div class="col-span-full py-16 text-center"><p class="text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-100 inline-block text-sm"><i class="bi bi-exclamation-triangle"></i> Erro ao carregar dados do servidor.</p></div>';
        }
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
        <div class="bg-white p-2 md:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Serviços na Rede</span>
            <span class="text-base md:text-2xl font-black text-slate-800 mt-0.5 w-full truncate">${total}</span>
        </div>
        <div class="bg-white p-2 md:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Ativos</span>
            <span class="text-base md:text-2xl font-black text-emerald-600 mt-0.5 w-full truncate">${ativos}</span>
        </div>
        <div class="bg-white p-2 md:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Inativos</span>
            <span class="text-base md:text-2xl font-black text-red-500 mt-0.5 w-full truncate">${inativos}</span>
        </div>
        <div class="bg-indigo-50 p-2 md:p-4 rounded-xl border border-indigo-100 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-indigo-500 uppercase tracking-widest w-full truncate">Filtrados</span>
            <span class="text-base md:text-2xl font-black text-indigo-700 mt-0.5 w-full truncate">${filteredList.length}</span>
        </div>
    `;
}

function filterAndRenderServices() {
    const listDiv = document.getElementById('servicesList');
    if (!listDiv) return;

    if (localState.services === null) {
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
    
    if (filtered.length === 0) {
        if (localState.services.length === 0) {
            listDiv.innerHTML = `
                <div class="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm">
                    <div class="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 border border-indigo-100">
                        <i class="bi bi-scissors text-3xl text-indigo-400"></i>
                    </div>
                    <h3 class="text-base font-black text-slate-800 mb-1">Nenhum serviço cadastrado</h3>
                    <p class="text-xs text-slate-500 max-w-sm text-center font-medium mb-6">O seu portefólio está vazio. Adicione o seu primeiro serviço para poder agendar clientes!</p>
                    <button data-action="open-service-editor" data-id="" class="py-3 px-6 bg-indigo-600 text-white font-black rounded-xl shadow-md hover:bg-indigo-700 transition active:scale-95 uppercase tracking-wider text-xs flex items-center gap-2">
                        <i class="bi bi-plus-lg"></i> Criar Serviço
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

    listDiv.innerHTML = filtered.map(service => {
        const isInactive = service.active === false;
        const safeName = escapeHTML(service.name);
        const safeCategoryName = escapeHTML(categoryMap.get(service.categoryId) || 'Sem Categoria');
        
        const photoSrc = service.photo || `https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(service.name.charAt(0))}`;

        const unitCount = service.accessibleIn ? service.accessibleIn.length : 1;
        const isSelected = localState.selectedIds.has(service.id);
        const formattedPrice = service.price !== undefined ? parseFloat(service.price).toFixed(2) : '0.00';
        const serviceColor = service.color || '#4f46e5';

        return `
            <div class="service-card relative bg-white rounded-2xl border ${isSelected ? 'border-indigo-400 ring-1 ring-indigo-200 shadow-md bg-indigo-50/20' : 'border-slate-200'} shadow-sm flex items-center p-3.5 cursor-pointer transition-all hover:shadow-md hover:border-indigo-300 active:scale-[0.98] ${isInactive ? 'opacity-60 bg-slate-50' : ''}" 
                 data-action="open-service-editor" data-id="${service.id}">
                
                <div class="absolute top-2 right-2 z-10 flex flex-col gap-2 items-center" data-action-stop-propagation="true">
                    <input type="checkbox" data-id="${service.id}" class="service-checkbox w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${isSelected ? 'checked' : ''}>
                </div>

                <div class="relative flex-shrink-0 mr-4">
                    <img src="${photoSrc}" alt="${safeName}" class="w-12 h-12 md:w-14 md:h-14 rounded-xl object-cover shadow-sm" style="border-left: 3px solid ${serviceColor};">
                    <span class="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-2 border-white rounded-full ${isInactive ? 'bg-red-500' : 'bg-emerald-500'}" title="${isInactive ? 'Inativo' : 'Ativo'}"></span>
                </div>
                
                <div class="flex-1 min-w-0 pr-6">
                    <h3 class="text-sm font-black text-slate-800 truncate leading-tight mb-0.5">
                        ${safeName}
                    </h3>
                    <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate mb-2">${safeCategoryName}</p>
                    
                    <div class="flex items-center justify-between mt-1">
                        <span class="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100 shadow-sm">R$ ${formattedPrice}</span>
                        <div class="flex gap-1.5">
                            <span class="text-[9px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200 flex items-center gap-1"><i class="bi bi-clock"></i> ${service.duration}m</span>
                            ${unitCount > 1 
                                ? `<span class="text-[9px] font-bold bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded-md border border-indigo-100 flex items-center gap-1"><i class="bi bi-diagram-3"></i> ${unitCount}</span>` 
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
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center p-3.5 animate-pulse h-[86px]">
            <div class="w-14 h-14 rounded-xl bg-slate-200 flex-shrink-0 mr-4"></div>
            <div class="flex-1 space-y-2">
                <div class="h-3 bg-slate-200 rounded w-3/4"></div>
                <div class="h-2 bg-slate-200 rounded w-1/2"></div>
            </div>
        </div>
        `;
    }
    return skeletonHTML;
}

// --- 6. CATEGORIAS DE SERVIÇOS (MODAL) ---

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
        }, 'services');
        
        logAction(state.establishmentId, getCurrentUserForLog(), 'Categorias (Serviços)', 'Criou', `Criou categoria: ${name}`);

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
    listDiv.innerHTML = '<div class="loader mx-auto my-4 border-indigo-500"></div>';
    try {
        const categories = await categoriesApi.getCategories(state.establishmentId, 'services');
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
                        <input type="text" id="categoryName" placeholder="Ex: Cabelo, Estética..." required class="w-full p-3 border border-indigo-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-bold bg-white shadow-inner">
                    </div>
                    <button type="submit" class="w-12 h-12 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-md active:scale-95 flex items-center justify-center flex-shrink-0"><i class="bi bi-plus-lg"></i></button>
                </form>
            </div>
            <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 ml-1">Categorias Existentes</h4>
            <div id="categoryList" class="max-h-64 overflow-y-auto custom-scrollbar pr-1"></div>
        </div>
    `;

    showGenericModal({
        title: "Categorias de Serviços",
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


// --- 7. LÓGICA DE CADASTRO DE SERVIÇOS (MODAL NATIVO) ---

function generateUnitCheckboxesHTMLForService(selectedIds = []) {
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

function openServiceEditor(serviceId) {
    localState.viewMode = 'edit-service';
    const modalInner = document.getElementById('service-modal-inner');
    if(!modalInner) return;

    let service = { name: '', active: true, duration: 30, price: 0 };
    if (serviceId) {
        const found = localState.services?.find(s => String(s.id) === String(serviceId));
        if (found) service = JSON.parse(JSON.stringify(found));
    }
    
    localState.tempService = service;
    const isEditing = !!service.id;
    
    const categories = localState.categories || []; 
    const durationInMinutes = service.duration || 30; 
    const bufferTimeInMinutes = service.bufferTime || 0; 
    
    const safeName = escapeHTML(service.name || '');
    const safeNotes = escapeHTML(service.notes || '');
    const safePublicDescription = escapeHTML(service.publicDescription || '');
    const safeTitle = isEditing ? safeName : 'Novo Serviço';

    const serviceColor = service.color || '#4f46e5'; 
    const loyaltyPoints = service.loyaltyPoints || 0;

    const categoryOptions = categories.map(c => 
        `<option value="${c.id}" ${service.categoryId === c.id ? 'selected' : ''}>${escapeHTML(c.name)}</option>`
    ).join('');

    const photoSrc = service.photo || `https://placehold.co/150x150/E2E8F0/4A5568?text=${encodeURIComponent(safeName ? safeName.charAt(0) : 'S')}`;

    const mobileHeaderHTML = `
        <div class="p-4 md:p-5 border-b border-slate-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50">
            <button data-action="close-detail-screen" class="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-100 hover:text-slate-800 transition-colors active:scale-95 mr-4">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            <div>
                <h3 class="font-black text-sm md:text-base text-slate-800 uppercase tracking-wider truncate leading-tight">${isEditing ? 'Editar Serviço' : 'Novo Serviço'}</h3>
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">${isEditing ? safeTitle : 'Configuração de Catálogo'}</p>
            </div>
            ${isEditing ? `
                <button data-action="delete-service" data-id="${service.id}" class="ml-auto w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 border border-red-100 transition-colors active:scale-95" title="Excluir">
                    <i class="bi bi-trash3 text-base pointer-events-none"></i>
                </button>
            ` : ''}
        </div>
    `;

    modalInner.innerHTML = `
        ${mobileHeaderHTML}
        
        <div class="modal-tabs px-2 md:px-6 border-b flex items-center justify-between overflow-x-auto bg-slate-50 flex-shrink-0 custom-scrollbar shadow-sm">
            <button class="tab-link active whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-indigo-600 text-indigo-600 transition-colors uppercase tracking-widest" data-tab="dados-basicos">1. Básicos</button>
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-transparent text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest" data-tab="config-avancadas">2. Configurações</button>
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-transparent text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest" data-tab="comissoes-servico">3. Comissões</button>
        </div>
        
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50 p-3 md:p-6 relative"> 
            <form id="serviceForm" class="h-full w-full mx-auto max-w-4xl">
                <input type="hidden" id="serviceId" value="${service.id || ''}">
                <input type="hidden" id="servicePhotoBase64" value="${service.photo || ''}">
                
                <div id="dados-basicos" class="tab-content active space-y-4 md:space-y-6 animate-fade-in-fast">
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div class="lg:col-span-1 space-y-4">
                            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center flex flex-col items-center">
                                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Imagem do Serviço</label>
                                <div class="relative group w-32 h-32 mb-5 cursor-pointer" id="servicePhotoContainer">
                                    <img id="servicePhotoPreview" src="${photoSrc}" alt="Foto" class="w-full h-full rounded-2xl object-cover border-4 border-slate-50 shadow-md transition-all group-hover:brightness-75">
                                    <div id="servicePhotoButtonOverlay" class="absolute inset-0 flex items-center justify-center rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                        <i class="bi bi-camera-fill text-white text-3xl drop-shadow-md"></i>
                                    </div>
                                </div>
                                <input type="file" id="servicePhotoInput" class="hidden" accept="image/*">
                                <button type="button" id="servicePhotoButton" class="text-indigo-600 text-[10px] font-black uppercase tracking-wider hover:text-indigo-800 transition-colors w-full bg-indigo-50 py-2.5 rounded-xl border border-indigo-100 shadow-sm active:scale-95">Alterar Imagem</button>
                            </div>

                            <div class="bg-slate-100 p-5 rounded-2xl border border-slate-200 flex flex-col items-center justify-center">
                                <label for="serviceColor" class="block text-[10px] font-black text-slate-700 uppercase tracking-widest mb-3 text-center">Cor na Agenda</label>
                                <div class="flex items-center justify-center w-full">
                                    <input type="color" id="serviceColor" value="${serviceColor}" class="w-full h-12 p-1 border border-slate-300 rounded-xl cursor-pointer bg-white shadow-inner">
                                </div>
                                <p class="text-[9px] font-bold text-slate-400 text-center mt-3">Identificação visual nos agendamentos.</p>
                            </div>
                        </div>

                        <div class="lg:col-span-2 space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div class="form-group sm:col-span-2">
                                    <label for="serviceName" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Nome do Serviço *</label>
                                    <input type="text" id="serviceName" value="${safeName}" required placeholder="Ex: Corte Masculino Degradê" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors text-base font-black text-slate-800 shadow-inner">
                                </div>
                                
                                <div class="form-group">
                                    <label for="servicePrice" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Preço (R$) *</label>
                                    <input type="number" id="servicePrice" step="0.01" value="${service.price !== undefined ? service.price : ''}" required placeholder="0.00" class="w-full p-3.5 border border-emerald-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 bg-emerald-50/30 focus:bg-white transition-colors font-black text-emerald-700 shadow-inner">
                                </div>
                                
                                <div class="form-group">
                                    <label for="serviceCategory" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Categoria</label>
                                    <select id="serviceCategory" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors font-bold text-slate-700 shadow-inner cursor-pointer">
                                        <option value="">Sem Categoria</option>
                                        ${categoryOptions}
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label for="serviceDurationMinutes" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Duração Média (min) *</label>
                                    <input type="number" id="serviceDurationMinutes" min="0" value="${durationInMinutes}" required placeholder="Ex: 45" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-colors font-bold text-slate-700 shadow-inner">
                                </div>
                                
                                <div class="form-group">
                                    <label for="serviceBufferTimeMinutes" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1" title="Tempo necessário para limpar/preparar entre clientes">Pausa Pós-Serviço (min)</label>
                                    <input type="number" id="serviceBufferTimeMinutes" min="0" value="${bufferTimeInMinutes}" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50 focus:bg-white transition-colors font-bold text-slate-700 shadow-inner" placeholder="Ex: 10 (limpeza)">
                                </div>
                            </div>
                            
                            <div class="pt-4 border-t border-slate-100 mt-2">
                                <label class="block text-[10px] font-black text-indigo-900 uppercase tracking-widest mb-1.5 ml-1 flex items-center gap-2"><i class="bi bi-diagram-3 text-sm"></i> Lojas que oferecem este serviço</label>
                                ${generateUnitCheckboxesHTMLForService(service.accessibleIn || [])}
                            </div>
                        </div>
                    </div>
                </div>

                <div id="config-avancadas" class="tab-content hidden space-y-6 animate-fade-in-fast">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 class="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 mb-4 flex items-center gap-2"><i class="bi bi-sliders text-indigo-500 text-lg"></i> Definições de Atendimento</h3>
                            
                            <div class="form-group">
                                <label for="serviceAudience" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Público-Alvo</label>
                                <select id="serviceAudience" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors font-bold text-slate-700 shadow-inner cursor-pointer">
                                    <option value="todos" ${service.targetAudience === 'todos' ? 'selected' : ''}>Todos (Unissex)</option>
                                    <option value="feminino" ${service.targetAudience === 'feminino' ? 'selected' : ''}>Feminino</option>
                                    <option value="masculino" ${service.targetAudience === 'masculino' ? 'selected' : ''}>Masculino</option>
                                    <option value="infantil" ${service.targetAudience === 'infantil' ? 'selected' : ''}>Infantil</option>
                                </select>
                            </div>

                            <div class="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 flex items-center justify-between">
                                <div>
                                    <p class="text-xs font-black text-indigo-900 uppercase tracking-wider mb-0.5">Atende a domicílio?</p>
                                    <p class="text-[9px] font-bold text-indigo-700 leading-tight">Cliente pode pedir atendimento externo.</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer ml-3">
                                    <input type="checkbox" id="serviceHomeToggle" class="sr-only peer" ${service.homeService ? 'checked' : ''}>
                                    <div class="w-12 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
                                </label>
                            </div>

                            <div class="form-group pt-2 border-t border-slate-100">
                                <label for="serviceNotes" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Observações Internas (Só Gestão)</label>
                                <textarea id="serviceNotes" rows="4" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors placeholder-slate-400 font-medium text-sm text-slate-700 shadow-inner resize-none" placeholder="Detalhes técnicos, custo de produtos, etc...">${safeNotes}</textarea>
                            </div>
                        </div>

                        <div class="space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 class="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 mb-4 flex items-center gap-2"><i class="bi bi-phone text-indigo-500 text-lg"></i> Exibição no Aplicativo/Link</h3>

                            <div class="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-center justify-between">
                                <div>
                                    <p class="text-xs font-black text-emerald-900 uppercase tracking-wider mb-0.5">Visível no App / Online</p>
                                    <p class="text-[9px] font-bold text-emerald-700 leading-tight">Permitir agendamento público deste serviço.</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer ml-3">
                                    <input type="checkbox" id="serviceStatusToggle" class="sr-only peer" ${service.active !== false ? 'checked' : ''}>
                                    <div class="w-12 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 shadow-inner"></div>
                                </label>
                            </div>

                            <div class="form-group">
                                <label for="serviceLoyaltyPoints" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Pontos de Fidelidade Ganhos</label>
                                <div class="flex items-center shadow-inner rounded-xl overflow-hidden border border-amber-300 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500 bg-amber-50/30">
                                    <input type="number" id="serviceLoyaltyPoints" min="0" value="${loyaltyPoints}" class="w-full p-3.5 bg-transparent outline-none font-black text-amber-700" placeholder="0">
                                    <span class="bg-amber-100 px-5 py-3.5 text-[10px] uppercase tracking-widest font-black text-amber-700 border-l border-amber-200">PTS</span>
                                </div>
                            </div>

                            <div class="form-group border-t border-slate-100 pt-4">
                                <label for="servicePublicDescription" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Descrição Pública para o Cliente</label>
                                <textarea id="servicePublicDescription" rows="4" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors placeholder-slate-400 font-medium text-sm text-slate-700 shadow-inner resize-none" placeholder="Ex: Tratamento reconstrutor capilar feito com produtos premium...">${safePublicDescription}</textarea>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="comissoes-servico" class="tab-content hidden space-y-6 animate-fade-in-fast">
                    <div class="max-w-2xl mx-auto bg-white p-5 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <div class="bg-indigo-50 p-5 rounded-2xl border border-indigo-100 mb-6">
                            <label class="block text-sm font-black text-indigo-900 uppercase tracking-wider mb-1.5 flex items-center gap-2"><i class="bi bi-percent text-lg"></i> Regras de Comissão</label>
                            <p class="text-[10px] font-bold text-indigo-700 uppercase tracking-widest mb-4">Defina como a equipa é remunerada ao executar este serviço.</p>
                            
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                                <label class="flex items-center p-3.5 border border-indigo-200 bg-white rounded-xl cursor-pointer hover:border-indigo-400 hover:shadow-sm transition-all">
                                    <input type="radio" name="commissionType" value="default" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500" ${service.commissionType !== 'custom' ? 'checked' : ''}>
                                    <span class="ml-3 text-xs font-black text-slate-700 uppercase tracking-wider">Taxa Padrão Geral</span>
                                </label>
                                <label class="flex items-center p-3.5 border border-indigo-200 bg-white rounded-xl cursor-pointer hover:border-indigo-400 hover:shadow-sm transition-all">
                                    <input type="radio" name="commissionType" value="custom" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500" ${service.commissionType === 'custom' ? 'checked' : ''}>
                                    <span class="ml-3 text-xs font-black text-slate-700 uppercase tracking-wider">Personalizada (Por Prof.)</span>
                                </label>
                            </div>
                        </div>

                        <div id="defaultCommissionRateContainer" class="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner text-center animate-fade-in">
                            <label for="serviceCommissionRate" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Qual a taxa de comissão padrão do serviço?</label>
                            <div class="flex items-center justify-center gap-3">
                                <input type="number" id="serviceCommissionRate" value="${service.commissionRate || 0}" step="0.1" class="w-32 p-3 text-2xl font-black text-center border border-indigo-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-indigo-700 shadow-sm">
                                <span class="text-3xl font-black text-slate-300">%</span>
                            </div>
                        </div>
                        
                        <div id="professionalCommissionsContainer" class="hidden animate-fade-in mt-6">
                            <div class="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
                                <div class="grid grid-cols-[1fr_auto] items-center p-4 bg-slate-50 font-black text-[10px] text-slate-500 uppercase tracking-widest border-b border-slate-200">
                                    <span>Profissional Habilitado</span>
                                    <span class="text-center w-24">Taxa (%)</span>
                                </div>
                                <div id="professionalCommissionsList" class="space-y-1.5 max-h-[350px] overflow-y-auto p-3 custom-scrollbar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        
        <footer class="p-4 bg-white border-t border-slate-200 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.05)] w-full flex-shrink-0 z-50 flex gap-3 justify-end rounded-b-3xl">
            <button type="button" data-action="close-detail-screen" class="hidden md:block py-3 px-6 bg-slate-100 border border-slate-200 text-slate-600 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-slate-200 transition-colors shadow-sm active:scale-95">Cancelar</button>
            <button type="button" data-action="save-service" class="w-full md:w-auto md:px-8 py-3 bg-indigo-600 text-white font-black text-xs md:text-sm rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-500/30 transition-transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider border border-indigo-600">
                <i class="bi bi-save2 text-lg pointer-events-none"></i> Salvar Perfil
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

    // Commissions logic
    const commissionTypeRadios = modalInner.querySelectorAll('input[name="commissionType"]');
    const defaultCommissionContainer = modalInner.querySelector('#defaultCommissionRateContainer');
    const customCommissionContainer = modalInner.querySelector('#professionalCommissionsContainer');
    
    function toggleCommissionView() {
        const selected = modalInner.querySelector('input[name="commissionType"]:checked').value;
        if (defaultCommissionContainer) defaultCommissionContainer.style.display = selected === 'default' ? 'block' : 'none';
        if (customCommissionContainer) customCommissionContainer.style.display = selected === 'custom' ? 'block' : 'none';
    }
    
    commissionTypeRadios.forEach(radio => radio.addEventListener('change', toggleCommissionView));
    
    const profListContainer = modalInner.querySelector('#professionalCommissionsList');
    if (profListContainer) {
        profListContainer.innerHTML = (localState.professionals || []).map(prof => {
            const isChecked = service.professionalCommissions?.[prof.id] !== undefined;
            const rate = service.professionalCommissions?.[prof.id] || 0;
            return `
                <div class="professional-commission-row flex items-center justify-between p-2.5 rounded-xl border border-transparent hover:bg-slate-50 transition-colors ${isChecked ? 'bg-indigo-50/50 border-indigo-100 shadow-sm' : ''}" data-prof-id="${prof.id}">
                    <label class="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
                        <input type="checkbox" ${isChecked ? 'checked' : ''} class="h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 shadow-sm cursor-pointer">
                        <img src="${prof.photo || `https://placehold.co/100x100/E2E8F0/4A5568?text=${escapeHTML(prof.name.charAt(0))}`}" class="w-10 h-10 rounded-full object-cover border border-white shadow-sm flex-shrink-0">
                        <span class="text-xs font-black text-slate-800 truncate uppercase tracking-widest">${escapeHTML(prof.name)}</span>
                    </label>
                    <div class="flex items-center gap-1.5 ml-3">
                        <input type="number" value="${rate}" step="0.1" class="w-20 p-2 border border-slate-300 rounded-lg text-sm font-bold text-center outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-inner transition-shadow" ${!isChecked ? 'disabled' : ''}>
                        <span class="text-[10px] font-black text-slate-400">%</span>
                    </div>
                </div>
            `;
        }).join('');

        profListContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const row = e.target.closest('.professional-commission-row');
                const input = row.querySelector('input[type="number"]');
                input.disabled = !e.target.checked;
                
                row.classList.toggle('bg-indigo-50/50', e.target.checked);
                row.classList.toggle('border-indigo-100', e.target.checked);
                row.classList.toggle('shadow-sm', e.target.checked);
                row.classList.toggle('border-transparent', !e.target.checked);
                
                if (e.target.checked) input.focus();
            });
        });
    }

    toggleCommissionView(); 

    // Photo Logic
    const photoInput = modalInner.querySelector('#servicePhotoInput');
    const photoButton = modalInner.querySelector('#servicePhotoButton');
    const photoContainer = modalInner.querySelector('#servicePhotoContainer');
    const photoPreview = modalInner.querySelector('#servicePhotoPreview');
    const photoBase64Input = modalInner.querySelector('#servicePhotoBase64');
    
    const triggerFileInput = () => photoInput.click();
    if (photoButton) photoButton.addEventListener('click', triggerFileInput);
    if (photoContainer) photoContainer.addEventListener('click', triggerFileInput);

    photoInput.onchange = async () => {
        const file = photoInput.files[0];
        if (!file) return;
        photoPreview.src = 'https://placehold.co/150x150/E2E8F0/4A5568?text=...'; 
        try {
            const resizedBase64 = await resizeAndCompressImage(file, 800, 800, 0.8);
            const sizeInBytes = (resizedBase64.length * 3) / 4; 
            if (sizeInBytes > 1000 * 1024) throw new Error('A imagem é muito grande mesmo após a compressão.');
            photoPreview.src = resizedBase64;
            photoBase64Input.value = resizedBase64;
        } catch (error) {
            showNotification('Erro de Imagem', error.message, 'error');
            photoPreview.src = photoSrc;
            photoBase64Input.value = service.photo || '';
        }
    };
    
    showMobileDetail();
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

// --- 8. DELEGAÇÃO DE EVENTOS DE PÁGINA GLOBAL E ACTIONS ---

function setupEventListeners() {
    if (pageEventListener) {
        document.body.removeEventListener('click', pageEventListener);
    }
    if (pageInputListener) {
        contentDiv.removeEventListener('input', pageInputListener);
    }

    pageEventListener = async (e) => {
        
        // 1. Checkboxes de Seleção em Lote
        if (e.target.classList.contains('service-checkbox')) {
            const id = e.target.dataset.id;
            if(e.target.checked) localState.selectedIds.add(id);
            else localState.selectedIds.delete(id);
            updateBatchActionBar();
            e.stopPropagation();
            return;
        }

        // 2. Filtros de Status (Todos, Ativos, Inativos)
        const statusBtn = e.target.closest('.status-filter-btn');
        if (statusBtn) {
            localState.statusFilter = statusBtn.dataset.status;
            document.querySelectorAll('.status-filter-btn').forEach(btn => {
                btn.classList.remove('bg-indigo-600', 'text-white', 'border-indigo-600', 'bg-red-600', 'border-red-600');
                btn.classList.add('bg-white', 'text-slate-600', 'border-slate-200');
            });
            if (localState.statusFilter === 'inactive') {
                statusBtn.classList.remove('bg-white', 'text-slate-600', 'border-slate-200');
                statusBtn.classList.add('bg-red-600', 'text-white', 'border-red-600');
            } else {
                statusBtn.classList.remove('bg-white', 'text-slate-600', 'border-slate-200');
                statusBtn.classList.add('bg-indigo-600', 'text-white', 'border-indigo-600');
            }
            filterAndRenderServices();
            return;
        }

        // 3. Botões de Filtros Avançados
        if (e.target.id === 'clear-filters-btn') {
            e.preventDefault();
            document.getElementById('filterCategoryId').value = 'all';
            localState.filterCategoryId = 'all';
            filterAndRenderServices();
            return;
        }

        if (e.target.id === 'apply-filter-btn') {
            e.preventDefault();
            localState.filterCategoryId = document.getElementById('filterCategoryId').value;
            filterAndRenderServices();
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

        // 4. Fechar Modal clicando fora (no background escuro)
        if(e.target.id === 'services-layout-detail') {
             hideMobileDetail();
             return;
        }

        // 5. Botões com Ação Específica (Data-Action)
        const actionBtn = e.target.closest('[data-action]');
        if (!actionBtn) return;
        
        const action = actionBtn.dataset.action;

        // Impedir que o clique propague para trás (ex: não abrir o card ao clicar no apagar)
        if (['close-detail-screen', 'delete-service', 'save-service', 'manage-categories', 'open-service-editor', 'batch-delete'].includes(action)) {
            e.stopPropagation();
        }

        switch(action) {
            case 'manage-categories':
                openCategoryModal();
                break;
                
            case 'open-service-editor':
                openServiceEditor(actionBtn.dataset.id);
                break;
                
            case 'close-detail-screen':
                hideMobileDetail();
                break;
                
            case 'batch-delete':
                handleBatchDelete();
                break;
                
            case 'delete-service': {
                const serviceIdToDel = actionBtn.dataset.id;
                if (!serviceIdToDel) return;
                
                const confirmed = await showConfirmation('Apagar Serviço', 'Tem certeza que deseja excluir este serviço da rede?');
                if (confirmed) {
                    try {
                        const serviceName = localState.services.find(s => s.id === serviceIdToDel)?.name || 'Desconhecido';
                        await servicesApi.deleteService(serviceIdToDel);
                        logAction(state.establishmentId, getCurrentUserForLog(), 'Serviços', 'Excluiu', `Excluiu o serviço: ${serviceName}`);
                        showNotification('Sucesso', 'Serviço apagado da rede.', 'success');
                        hideMobileDetail();
                        await fetchAndDisplayData(); 
                    } catch (error) {
                        showNotification('Erro', `Não foi possível apagar o serviço: ${error.message}`, 'error');
                    }
                }
                break;
            }

            case 'save-service': {
                e.preventDefault();
                const form = document.getElementById('serviceForm');
                if (!form.reportValidity()) return; // Validação nativa do HTML

                const saveButton = actionBtn;
                const originalText = saveButton.innerHTML;
                saveButton.disabled = true;
                saveButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';

                try {
                    const serviceId = form.querySelector('#serviceId').value;
                    const commissionType = form.querySelector('input[name="commissionType"]:checked').value;
                    const professionalCommissions = {};
                    
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
                        ...localState.tempService,
                        establishmentId: state.establishmentId, 
                        accessibleIn: accessibleIn, 
                        name: form.querySelector('#serviceName').value.trim(),
                        price: parseFloat(form.querySelector('#servicePrice').value),
                        duration: parseInt(form.querySelector('#serviceDurationMinutes').value, 10),
                        bufferTime: parseInt(form.querySelector('#serviceBufferTimeMinutes').value, 10) || 0,
                        categoryId: form.querySelector('#serviceCategory').value || null,
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

                    if (serviceId) {
                        await servicesApi.updateService(serviceId, serviceData);
                        logAction(state.establishmentId, getCurrentUserForLog(), 'Serviços', 'Editou', `Editou o serviço: ${serviceData.name}`);
                        showNotification('Sucesso', 'Serviço atualizado com sucesso!', 'success');
                    } else {
                        delete serviceData.id;
                        await servicesApi.createService(serviceData);
                        logAction(state.establishmentId, getCurrentUserForLog(), 'Serviços', 'Criou', `Criou novo serviço: ${serviceData.name}`);
                        showNotification('Sucesso', 'Serviço adicionado à rede!', 'success');
                    }
                    
                    hideMobileDetail();
                    await fetchAndDisplayData(); 
                } catch (error) {
                    showNotification('Erro', error.message, 'error');
                    saveButton.disabled = false;
                    saveButton.innerHTML = originalText;
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
            filterAndRenderServices();
        }
    };
    contentDiv.addEventListener('input', pageInputListener);
}