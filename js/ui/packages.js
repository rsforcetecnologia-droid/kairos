// js/ui/packages.js

// --- 1. IMPORTAÇÕES ---
import * as packagesApi from '../api/packages.js';
import * as servicesApi from '../api/services.js';
import * as productsApi from '../api/products.js'; 
import { getHierarchy } from '../api/establishments.js'; 
import { state } from '../state.js';
import { showNotification, showConfirmation } from '../components/modal.js';
import { escapeHTML } from '../utils.js';

const contentDiv = document.getElementById('content');
let localState = {
    allPackages: [],
    catalogForModal: { 
        services: [], 
        products: [] 
    },
    
    establishments: [], // Mantido para o modal de criação/edição
    
    searchQuery: '',
    statusFilter: 'all', // 'all', 'active', 'inactive'
    
    viewMode: 'list', // 'list', 'edit-package', 'select-item'
    tempPackage: null, // Armazena os dados do pacote que está a ser editado
    selectedIds: new Set() // Controle de pacotes selecionados
};
let pageEventListener = null;

// --- 2. FUNÇÕES AUXILIARES E TROCA DE ECRÃS ---

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
}

function calculateKPIs() {
    const total = localState.allPackages.length;
    const activePackages = localState.allPackages.filter(p => p.status !== 'inactive');
    const activeCount = activePackages.length;
    
    const avgPrice = activeCount > 0 
        ? activePackages.reduce((acc, p) => acc + (p.price || 0), 0) / activeCount 
        : 0;

    let maxDiscount = 0;
    activePackages.forEach(pkg => {
        const orig = pkg.originalPrice || 0;
        const final = pkg.price || 0;
        if (orig > 0 && orig > final) {
            const discount = ((orig - final) / orig) * 100;
            if (discount > maxDiscount) maxDiscount = discount;
        }
    });

    return { total, activeCount, avgPrice, maxDiscount };
}

function showMobileDetail() {
    const layoutDetail = document.getElementById('packages-layout-detail');
    if (layoutDetail) {
        layoutDetail.classList.remove('hidden');
        layoutDetail.style.display = 'flex';
        requestAnimationFrame(() => {
            layoutDetail.classList.remove('opacity-0');
            const wrapper = layoutDetail.querySelector('#modal-content-wrapper');
            if(wrapper) {
                wrapper.classList.remove('translate-y-full', 'md:scale-95', 'md:opacity-0');
                wrapper.classList.add('translate-y-0', 'md:scale-100', 'md:opacity-100');
            }
        });
    }
}

function hideMobileDetail() {
    const layoutDetail = document.getElementById('packages-layout-detail');
    if (layoutDetail) {
        layoutDetail.classList.add('opacity-0');
        const wrapper = layoutDetail.querySelector('#modal-content-wrapper');
        if (wrapper) {
            wrapper.classList.remove('translate-y-0', 'md:scale-100', 'md:opacity-100');
            wrapper.classList.add('translate-y-full', 'md:scale-95', 'md:opacity-0');
        }
        setTimeout(() => {
            layoutDetail.classList.add('hidden');
            layoutDetail.style.display = 'none';
            layoutDetail.innerHTML = '';
        }, 300);
    }
}

// Guarda os dados do form atual na memória antes de mudar de tela
function syncPackageFormToState() {
    const detailContainer = document.getElementById('packages-layout-detail');
    if (!detailContainer || localState.viewMode !== 'edit-package' || !localState.tempPackage) return;

    localState.tempPackage.name = detailContainer.querySelector('#packageName')?.value || '';
    localState.tempPackage.description = detailContainer.querySelector('#packageDescription')?.value || '';
    localState.tempPackage.status = detailContainer.querySelector('#packageStatus')?.value || 'active';
    
    const priceVal = parseFloat(detailContainer.querySelector('#finalPrice')?.value);
    localState.tempPackage.price = isNaN(priceVal) ? '' : priceVal;
    
    const commVal = parseFloat(detailContainer.querySelector('#commissionRate')?.value);
    localState.tempPackage.commissionRate = isNaN(commVal) ? '' : commVal;
    
    const valDays = parseInt(detailContainer.querySelector('#validityDays')?.value, 10);
    localState.tempPackage.validityDays = isNaN(valDays) ? '' : valDays;
    
    localState.tempPackage.sellStartDate = detailContainer.querySelector('#sellStartDate')?.value || '';
    localState.tempPackage.sellEndDate = detailContainer.querySelector('#sellEndDate')?.value || '';
    
    const sLimit = parseInt(detailContainer.querySelector('#salesLimit')?.value, 10);
    localState.tempPackage.salesLimit = isNaN(sLimit) ? '' : sLimit;
    
    const selectedEsts = Array.from(detailContainer.querySelectorAll('.modal-est-checkbox:checked')).map(cb => cb.value);
    localState.tempPackage.establishmentIds = selectedEsts;
}

// --- 3. INICIALIZAÇÃO E LAYOUT PRINCIPAL ---

export async function loadPackagesPage() {
    try {
        const hierarchyPayload = await getHierarchy().catch(() => ({ matrizes: [] }));
        const matrizes = hierarchyPayload.matrizes || [];
        localState.establishments = [];
        
        matrizes.forEach(m => {
            localState.establishments.push({ id: m.id, name: m.name, type: 'Matriz' });
            if (m.branches) {
                m.branches.forEach(b => localState.establishments.push({ id: b.id, name: b.name, type: 'Filial' }));
            }
        });
    } catch (e) {
        console.error("Erro ao buscar hierarquia de empresas", e);
    }

    localState.viewMode = 'list';
    localState.selectedIds.clear();
    
    renderBaseLayout();
    setupEventListeners();
    await fetchAndDisplayData();
}

async function fetchAndDisplayData() {
    const listContainer = document.getElementById('packagesListContainer');
    if (listContainer) {
        listContainer.innerHTML = '<div class="col-span-full flex justify-center py-20"><div class="loader mx-auto"></div></div>';
    }

    const targetEstIds = (state.selectedEstablishments && state.selectedEstablishments.length > 0) 
        ? state.selectedEstablishments 
        : [state.establishmentId];

    try {
        const fetchPromises = targetEstIds.map(id => packagesApi.getPackages(id).catch(() => []));
        const results = await Promise.all(fetchPromises);
        
        const uniquePackagesMap = new Map();
        results.flat().forEach(pkg => {
            if (!uniquePackagesMap.has(pkg.id)) {
                uniquePackagesMap.set(pkg.id, pkg);
            }
        });
        localState.allPackages = Array.from(uniquePackagesMap.values());

        const servicesPromises = targetEstIds.map(id => servicesApi.getServices(id).catch(() => []));
        const productsPromises = targetEstIds.map(id => productsApi.getProducts(id).catch(() => []));

        const [servicesResults, productsResults] = await Promise.all([
            Promise.all(servicesPromises),
            Promise.all(productsPromises)
        ]);
        
        const uniqueServices = new Map();
        servicesResults.flat().forEach(s => uniqueServices.set(s.id, s));
        
        const uniqueProducts = new Map();
        productsResults.flat().forEach(p => uniqueProducts.set(p.id, p));

        localState.catalogForModal = {
            services: Array.from(uniqueServices.values()).filter(s => s.active),
            products: Array.from(uniqueProducts.values())
        };

        renderKPIs();
        renderPackagesList(); 
        updateBatchActionBar();
    } catch (error) {
        console.error(error);
        if (listContainer) {
            listContainer.innerHTML = `
                <div class="col-span-full flex flex-col items-center justify-center py-16 text-slate-500">
                    <i class="bi bi-exclamation-triangle text-4xl text-red-400 mb-3"></i>
                    <p class="text-xs font-bold">Erro ao carregar os pacotes. Tente novamente.</p>
                </div>
            `;
        }
    }
}

function updateBatchActionBar() {
    const bar = document.getElementById('batch-action-bar');
    const countSpan = document.getElementById('selected-count');
    const count = localState.selectedIds.size;

    if (countSpan) countSpan.textContent = count;

    if (bar) {
        if (count > 0) {
            bar.classList.remove('hidden');
            bar.classList.add('flex');
        } else {
            bar.classList.add('hidden');
            bar.classList.remove('flex');
        }
    }
    
    const selectAll = document.getElementById('select-all-toggle');
    if (selectAll) {
        selectAll.checked = localState.allPackages.length > 0 && count === localState.allPackages.length;
    }
}

function renderBaseLayout() {
    contentDiv.innerHTML = `
        <style id="packages-mobile-css">
            @media (max-width: 767px) {
                .mobile-detail-open #packages-layout-main { display: none !important; }
                #packages-layout-main:not(.mobile-detail-open) #packages-layout-detail { display: none !important; }
                .mobile-detail-open #packages-layout-detail {
                    display: flex !important;
                    position: fixed !important;
                    top: 0; left: 0; right: 0; bottom: 0;
                    height: 100dvh !important;
                    width: 100vw !important;
                    z-index: 99999 !important;
                    background-color: #f8fafc !important;
                    flex-direction: column !important;
                    padding: 0 !important;
                    border-radius: 0 !important;
                }
                .mobile-detail-open #modal-content-wrapper {
                    border-radius: 0 !important;
                    height: 100% !important;
                    max-height: none !important;
                }
            }
            #toast-container, .toast-notification, .modal, .modal-backdrop { z-index: 9999999 !important; }
        </style>
        
        <div class="h-[calc(100vh-80px)] md:h-auto flex flex-col w-full relative overflow-hidden bg-slate-50" style="font-family: 'Plus Jakarta Sans', 'Nunito', sans-serif;">
            
            <section id="packages-layout-main" class="flex-1 flex flex-col p-2 md:p-4 md:pl-6 w-full relative overflow-y-auto custom-scrollbar pb-[100px] md:pb-6">
                
                <div id="batch-action-bar" class="hidden fixed top-20 left-4 right-4 md:absolute md:top-4 z-50 bg-gray-900 text-white rounded-2xl shadow-2xl p-4 items-center justify-between animate-fade-in-down">
                    <div class="flex items-center gap-3">
                        <button id="cancel-selection-btn" class="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors text-gray-300 hover:text-white">
                            <i class="bi bi-x-lg text-lg"></i>
                        </button>
                        <span class="font-bold text-base tracking-wide"><span id="selected-count" class="text-indigo-400">0</span> Pacotes Selecionados</span>
                    </div>
                    <button id="batch-delete-btn" class="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg text-sm">
                        <i class="bi bi-trash3"></i> Excluir
                    </button>
                </div>

                <div class="flex-shrink-0 z-30 pt-safe-top w-full max-w-7xl mx-auto">
                    <div class="bg-transparent py-3 flex flex-col md:flex-row justify-end items-start md:items-center md:pb-5 gap-3">
                        <div class="w-full flex flex-col md:flex-row items-center gap-3">
                            <div class="relative w-full md:flex-1 md:max-w-md mr-auto">
                                <i class="bi bi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg"></i>
                                <input type="text" id="search-packages" placeholder="Buscar pacotes..." class="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 shadow-sm rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all">
                            </div>
                            
                            <div class="flex items-center gap-2 w-full md:w-auto overflow-x-auto hide-scrollbar">
                                <label class="flex items-center gap-2 cursor-pointer py-2.5 px-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 transition-colors flex-shrink-0">
                                    <input type="checkbox" id="select-all-toggle" class="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4">
                                    <span class="text-xs font-bold text-slate-700 hidden md:inline">Todos</span>
                                </label>
                                <select id="filter-status" class="flex-1 md:w-auto py-2.5 px-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-bold text-slate-700 shadow-sm cursor-pointer">
                                    <option value="all">Todos Status</option>
                                    <option value="active">Ativos</option>
                                    <option value="inactive">Inativos</option>
                                </select>
                                <button id="export-excel-btn" class="py-2.5 px-3 bg-white border border-slate-200 text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition shadow-sm flex items-center justify-center gap-2 text-xs active:scale-95 flex-shrink-0" title="Exportar Excel">
                                    <i class="bi bi-file-earmark-excel-fill text-base"></i> <span class="hidden md:inline">Exportar</span>
                                </button>
                                <button data-action="new-package" class="py-2.5 px-4 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 active:scale-95 transition-all text-xs flex items-center justify-center gap-2 uppercase tracking-wider flex-shrink-0">
                                    <i class="bi bi-plus-circle-fill text-sm"></i> Criar
                                </button>
                            </div>
                        </div>
                    </div>

                    <div id="kpi-container" class="flex md:grid md:grid-cols-4 overflow-x-auto gap-3 md:gap-5 snap-x hide-scrollbar mb-4"></div>
                </div>

                <div class="w-full max-w-7xl mx-auto flex-1">
                    <div id="packagesListContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-2"></div>
                </div>
                
            </section>

            <div id="packages-layout-detail" class="hidden fixed inset-0 z-[99999] bg-slate-900/60 backdrop-blur-sm flex-col md:flex-row items-end md:items-center justify-center opacity-0 transition-opacity duration-300 md:p-6"></div>
        </div>
    `;
}

function renderKPIs() {
    const kpis = calculateKPIs();
    const container = document.getElementById('kpi-container');
    if (!container) return;

    container.innerHTML = `
        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-slate-50 flex items-center justify-center">
                    <i class="bi bi-box2-fill text-slate-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest leading-tight">Total<br class="md:hidden"/> Pacotes</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-slate-800">${kpis.total}</span>
        </div>
        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-emerald-50 flex items-center justify-center">
                    <i class="bi bi-check-circle-fill text-emerald-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest leading-tight">Pacotes<br class="md:hidden"/> Ativos</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-emerald-600">${kpis.activeCount}</span>
        </div>
        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-red-50 flex items-center justify-center">
                    <i class="bi bi-tags-fill text-red-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest leading-tight">Maior<br class="md:hidden"/> Desconto</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-red-500">${kpis.maxDiscount.toFixed(0)}%</span>
        </div>
        <div class="snap-center shrink-0 w-[140px] md:w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 md:gap-3 mb-2">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-indigo-50 flex items-center justify-center">
                    <i class="bi bi-cash-stack text-indigo-500 text-base md:text-lg"></i>
                </div>
                <span class="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest leading-tight">Ticket<br class="md:hidden"/> Médio</span>
            </div>
            <span class="text-xl md:text-2xl font-black text-indigo-600">${formatCurrency(kpis.avgPrice)}</span>
        </div>
    `;
}

function renderPackagesList() {
    const listContainer = document.getElementById('packagesListContainer');
    if (!listContainer) return;

    let filteredPackages = localState.allPackages;

    if (localState.statusFilter !== 'all') {
        const isCheckingActive = localState.statusFilter === 'active';
        filteredPackages = filteredPackages.filter(p => (p.status !== 'inactive') === isCheckingActive);
    }

    if (localState.searchQuery) {
        const q = localState.searchQuery.toLowerCase();
        filteredPackages = filteredPackages.filter(p => p.name.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q));
    }

    if (filteredPackages.length === 0) {
        listContainer.innerHTML = `
            <div class="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-5">
                    <i class="bi bi-box2 text-4xl text-slate-300"></i>
                </div>
                <h3 class="text-lg font-black text-slate-700 mb-1">Nenhum pacote</h3>
                <p class="text-sm text-slate-500 mb-6 max-w-sm text-center">Não encontramos resultados para os filtros selecionados.</p>
                <button data-action="new-package" class="px-6 py-3 bg-indigo-50 text-indigo-700 font-black rounded-xl hover:bg-indigo-100 transition-colors text-xs uppercase tracking-wider shadow-sm">
                    Criar Novo Pacote
                </button>
            </div>
        `;
        return;
    }

    const estMap = new Map(localState.establishments.map(e => [e.id, e]));

    listContainer.innerHTML = filteredPackages.map(pkg => {
        const isActive = pkg.status !== 'inactive';
        const isSelected = localState.selectedIds.has(pkg.id);
        const finalPrice = pkg.price || 0;
        const originalPrice = pkg.originalPrice || 0;
        const discountPercent = originalPrice > 0 && originalPrice > finalPrice ? ((originalPrice - finalPrice) / originalPrice) * 100 : 0;
        const safeName = escapeHTML(pkg.name);
        const safeDesc = escapeHTML(pkg.description || 'Nenhuma descrição detalhada.');
        const itemsCount = (pkg.items || []).reduce((acc, i) => acc + (i.quantity || 1), 0);

        const validityStr = pkg.validityDays ? `${pkg.validityDays} dias de uso` : 'Uso vitalício';
        const promoDateStr = pkg.sellEndDate ? `Vendas até ${new Date(pkg.sellEndDate).toLocaleDateString('pt-BR')}` : 'Venda contínua';
        
        const pkgEstIds = pkg.establishmentIds || (pkg.establishmentId ? [pkg.establishmentId] : []);
        let estBadge = '';
        
        if (pkgEstIds.length === 1) {
            const estObj = estMap.get(pkgEstIds[0]);
            if (estObj) {
                const estIcon = estObj.type === 'Matriz' ? 'bi-building' : 'bi-shop';
                estBadge = `<span class="text-[9px] px-2 py-1 rounded-md bg-slate-100 text-slate-600 font-bold border border-slate-200 flex items-center w-max shadow-sm"><i class="bi ${estIcon} mr-1 opacity-50"></i> ${estObj.name}</span>`;
            }
        } else if (pkgEstIds.length > 1) {
            estBadge = `<span class="text-[9px] px-2 py-1 rounded-md bg-indigo-50 text-indigo-600 font-bold border border-indigo-100 flex items-center w-max shadow-sm"><i class="bi bi-buildings mr-1 opacity-50"></i> ${pkgEstIds.length} Unidades</span>`;
        }

        return `
            <div class="bg-white rounded-3xl border ${isSelected ? 'border-indigo-500 ring-2 ring-indigo-500 bg-indigo-50/30' : 'border-slate-200'} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden group cursor-pointer active:scale-[0.98]"
                 data-action="edit-package" data-id="${pkg.id}">
                
                <div class="absolute left-5 top-5 z-20">
                    <input type="checkbox" value="${pkg.id}" class="item-checkbox w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm bg-white transition-all" ${isSelected ? 'checked' : ''}>
                </div>

                ${discountPercent > 0 ? `<div class="absolute -right-8 top-4 bg-red-500 text-white text-[10px] font-black uppercase tracking-wider py-1 px-10 transform rotate-45 shadow-md z-10">${discountPercent.toFixed(0)}% OFF</div>` : ''}

                <div class="p-5 pt-5 flex-grow flex flex-col">
                    <div class="flex justify-between items-start mb-3">
                        <div class="flex flex-col gap-2 pl-8">
                            <div class="flex items-center gap-1.5">
                                <span class="w-2.5 h-2.5 rounded-full ${isActive ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-slate-300'}"></span>
                                <span class="text-[10px] font-black ${isActive ? 'text-emerald-600' : 'text-slate-500'} uppercase tracking-widest">${isActive ? 'Ativo' : 'Inativo'}</span>
                            </div>
                            ${estBadge}
                        </div>
                    </div>
                    
                    <h3 class="text-lg font-black text-slate-800 leading-tight line-clamp-1 mb-1.5">${safeName}</h3>
                    <p class="text-xs font-medium text-slate-500 line-clamp-2 min-h-[2rem] mb-4">${safeDesc}</p>

                    <div class="mt-auto bg-slate-50 rounded-2xl p-3 border border-slate-100 flex justify-between items-center shadow-inner mb-4">
                        <div class="flex flex-col">
                            <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Conteúdo</span>
                            <span class="text-xs font-black text-indigo-600 flex items-center gap-1.5"><i class="bi bi-box-seam"></i> ${itemsCount} Itens</span>
                        </div>
                        <div class="flex flex-col text-right">
                            <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Validade</span>
                            <span class="text-xs font-bold text-slate-700 flex items-center gap-1.5 justify-end"><i class="bi bi-hourglass-split"></i> ${validityStr}</span>
                        </div>
                    </div>

                    <div class="flex justify-between items-end border-t border-slate-100 pt-4">
                        <div class="flex flex-col">
                            ${discountPercent > 0 ? `<span class="text-[10px] text-slate-400 font-bold line-through mb-0.5">De ${formatCurrency(originalPrice)}</span>` : '<span class="text-[10px] text-transparent mb-0.5">.</span>'}
                            <span class="text-2xl font-black text-slate-900 leading-none drop-shadow-sm">${formatCurrency(finalPrice)}</span>
                        </div>
                        <div class="text-right">
                            <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded-md border border-slate-200"><i class="bi bi-calendar-event mr-1"></i>${promoDateStr}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// --- 4. EXPORTAÇÃO PARA EXCEL ---

function handleExportExcel() {
    if (localState.allPackages.length === 0) {
        showNotification('Aviso', 'Não há pacotes carregados para exportar.', 'info');
        return;
    }

    let filteredPackages = localState.allPackages;

    if (localState.statusFilter !== 'all') {
        const isCheckingActive = localState.statusFilter === 'active';
        filteredPackages = filteredPackages.filter(p => (p.status !== 'inactive') === isCheckingActive);
    }

    if (localState.searchQuery) {
        const q = localState.searchQuery.toLowerCase();
        filteredPackages = filteredPackages.filter(p => p.name.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q));
    }

    if (filteredPackages.length === 0) {
        showNotification('Aviso', 'Nenhum pacote corresponde aos filtros atuais.', 'info');
        return;
    }

    const estMap = new Map(localState.establishments.map(e => [e.id, e.name]));

    const exportData = filteredPackages.map(pkg => {
        const orig = pkg.originalPrice || 0;
        const final = pkg.price || 0;
        const descPercent = orig > 0 ? ((orig - final) / orig) * 100 : 0;
        
        const itemsDetail = (pkg.items || []).map(i => `${i.quantity}x ${i.name}`).join(' | ');
        const pkgEstIds = pkg.establishmentIds || (pkg.establishmentId ? [pkg.establishmentId] : []);
        const estNames = pkgEstIds.map(id => estMap.get(id)).filter(Boolean).join(', ') || 'Não identificada';

        return {
            "Unidade(s)": estNames,
            "Nome do Pacote": pkg.name,
            "Status": pkg.status !== 'inactive' ? 'Ativo' : 'Inativo',
            "Descrição": pkg.description || '',
            "Itens Incluídos": itemsDetail,
            "Valor Original (R$)": orig,
            "Preço de Venda (R$)": final,
            "Desconto (%)": descPercent.toFixed(1) + '%',
            "Comissão (%)": pkg.commissionRate || 0,
            "Validade de Uso (Dias)": pkg.validityDays || 'Vitalício',
            "Vendas Início": pkg.sellStartDate ? new Date(pkg.sellStartDate).toLocaleDateString('pt-BR') : '-',
            "Vendas Fim": pkg.sellEndDate ? new Date(pkg.sellEndDate).toLocaleDateString('pt-BR') : '-'
        };
    });

    try {
        if(typeof XLSX === 'undefined') {
            showNotification('Erro', 'A biblioteca XLSX não está disponível no momento.', 'error');
            return;
        }
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Pacotes");
        
        const fileName = `Relatorio_Pacotes_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(workbook, fileName);
    } catch (error) {
        console.error(error);
        showNotification('Erro', 'Falha ao exportar Excel.', 'error');
    }
}

// --- 5. TELAS NATIVAS DE EDIÇÃO (SCREEN SWAP -> MODAL) ---

function openPackageEditor(pkg = null) {
    localState.viewMode = 'edit-package';
    localState.tempPackage = pkg ? JSON.parse(JSON.stringify(pkg)) : {
        id: '', name: '', description: '', status: 'active',
        items: [], price: '', originalPrice: 0, commissionRate: 0,
        validityDays: '', sellStartDate: '', sellEndDate: '', salesLimit: '',
        establishmentIds: [state.establishmentId]
    };
    
    renderPackageEditorView();
    showMobileDetail();
}

function calculateAndShowDiscount() {
    const detailContainer = document.getElementById('packages-layout-detail');
    if (!detailContainer) return;
    
    const items = localState.tempPackage.items || [];
    const originalPrice = items.reduce((acc, s) => acc + ((s.price || 0) * (s.quantity || 1)), 0);
    
    const finalPriceInput = detailContainer.querySelector('#finalPrice');
    const discountIndicator = detailContainer.querySelector('#discountIndicator');
    const originalPriceDisplay = detailContainer.querySelector('#originalPrice');
    
    const finalPrice = parseFloat(finalPriceInput?.value) || 0;
    
    if (originalPriceDisplay) originalPriceDisplay.textContent = formatCurrency(originalPrice);

    if (discountIndicator) {
        if (originalPrice > 0 && originalPrice > finalPrice && finalPrice > 0) {
            const discount = ((originalPrice - finalPrice) / originalPrice) * 100;
            discountIndicator.textContent = `${discount.toFixed(0)}% OFF`;
            discountIndicator.classList.remove('hidden');
        } else {
            discountIndicator.classList.add('hidden');
        }
    }
}

function renderSelectedItems() {
    const itemsListContainer = document.getElementById('package-items-list');
    if (!itemsListContainer) return;
    
    const items = localState.tempPackage.items || [];

    if (items.length === 0) {
        itemsListContainer.innerHTML = `
            <div class="text-center py-8 text-slate-400 flex flex-col items-center">
                <i class="bi bi-inbox text-3xl mb-2 opacity-50"></i>
                <p class="text-[10px] font-bold uppercase tracking-widest">Nenhum item adicionado</p>
                <p class="text-[9px] mt-1 text-slate-400">Clique no botão acima para compor o pacote</p>
            </div>`;
    } else {
        itemsListContainer.innerHTML = items.map((item, index) => {
            const isService = item.type === 'service';
            const typeIcon = isService ? 'bi-scissors' : 'bi-box';
            const typeBg = isService ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-emerald-100 text-emerald-700 border-emerald-200';

            return `
            <div class="flex items-center justify-between bg-white p-3 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors animate-fade-in-fast mb-2">
                <div class="flex items-center gap-4 min-w-0 flex-1">
                    <div class="flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-xl px-2 py-1 shadow-inner">
                        <span class="text-[8px] font-bold text-slate-400 uppercase leading-none mb-1">Qtd</span>
                        <input type="number" value="${item.quantity}" min="1" class="w-12 text-center bg-transparent text-sm font-black text-slate-700 outline-none quantity-input" data-index="${index}">
                    </div>
                    <div class="min-w-0">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${typeBg} flex items-center gap-1 shadow-sm"><i class="bi ${typeIcon}"></i> ${isService ? 'Serviço' : 'Produto'}</span>
                        </div>
                        <p class="font-black text-slate-800 text-sm truncate leading-tight">${escapeHTML(item.name)}</p>
                    </div>
                </div>
                <div class="flex items-center gap-4 flex-shrink-0 pl-2">
                    <div class="text-right">
                        <span class="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Valor Un.</span>
                        <span class="text-sm font-black text-slate-700">${formatCurrency(item.price)}</span>
                    </div>
                    <button type="button" data-action="remove-item" data-index="${index}" class="w-10 h-10 flex items-center justify-center rounded-xl text-red-400 bg-red-50 hover:text-red-600 hover:bg-red-100 transition-colors shadow-sm z-10 cursor-pointer">
                        <i class="bi bi-trash3 pointer-events-none text-base"></i>
                    </button>
                </div>
            </div>
        `}).join('');
    }
    calculateAndShowDiscount();
}

function formatInputDate(isoOrDateString) {
    if (!isoOrDateString) return '';
    if (isoOrDateString.includes('T')) return isoOrDateString.split('T')[0];
    return isoOrDateString;
}

function renderPackageEditorView() {
    const detailContainer = document.getElementById('packages-layout-detail');
    if (!detailContainer) return;

    const pkg = localState.tempPackage;
    const isEditing = !!pkg.id;

    const safeName = escapeHTML(pkg.name || '');
    const safeDesc = escapeHTML(pkg.description || '');
    const safePrice = pkg.price !== undefined && pkg.price !== '' ? pkg.price : '';
    const safeCommission = pkg.commissionRate !== undefined && pkg.commissionRate !== '' ? pkg.commissionRate : '';
    const safeValidity = pkg.validityDays !== undefined && pkg.validityDays !== '' ? pkg.validityDays : '';
    
    const sellStartDate = formatInputDate(pkg.sellStartDate);
    const sellEndDate = formatInputDate(pkg.sellEndDate);
    const salesLimit = pkg.salesLimit !== undefined && pkg.salesLimit !== '' ? pkg.salesLimit : '';
    
    // Fallback de unidade para edição ou criação
    const currentEstIds = pkg.establishmentIds && pkg.establishmentIds.length > 0
        ? pkg.establishmentIds
        : (pkg.establishmentId ? [pkg.establishmentId] : [state.establishmentId]);

    const estCheckboxesHTML = localState.establishments.map(est => `
        <label class="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-colors cursor-pointer group shadow-sm">
            <input type="checkbox" class="modal-est-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4" value="${est.id}" ${currentEstIds.includes(est.id) ? 'checked' : ''}>
            <span class="text-xs font-bold text-slate-700 truncate group-hover:text-indigo-700" title="${est.name}">${est.type === 'Matriz' ? '🏢' : '📍'} ${est.name}</span>
        </label>
    `).join('');

    const modalHeaderHTML = `
        <header class="bg-indigo-600 border-b border-indigo-700 px-5 py-4 flex items-center justify-between pt-safe-top md:pt-4 shadow-sm z-20 flex-shrink-0 relative overflow-hidden md:rounded-t-3xl w-full">
            <div class="absolute right-[-20px] top-[-20px] opacity-10 pointer-events-none">
                <svg width="150" height="150" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="40" stroke="white" stroke-width="20"/></svg>
            </div>
            <button type="button" data-action="back-to-main" class="w-10 h-10 flex items-center justify-center rounded-full bg-black/10 text-white hover:bg-black/20 active:scale-90 transition-colors z-10 relative">
                <i class="bi bi-arrow-left"></i>
            </button>
            <div class="text-center z-10 relative flex-1 px-4">
                <h2 class="text-base font-black text-white tracking-tight leading-tight truncate">${isEditing ? 'Editar Pacote' : 'Novo Pacote'}</h2>
                <p class="text-[10px] text-indigo-100 font-bold uppercase tracking-widest mt-0.5">Configuração Comercial</p>
            </div>
            ${isEditing ? `
                <button data-action="delete-package" data-id="${pkg.id}" class="w-10 h-10 rounded-full bg-red-500/80 text-white flex items-center justify-center hover:bg-red-500 shadow-inner transition-transform active:scale-95 z-10 relative">
                    <i class="bi bi-trash3"></i>
                </button>
            ` : '<div class="w-10 h-10 z-10 relative"></div>'}
        </header>
    `;

    detailContainer.innerHTML = `
        <div id="modal-content-wrapper" class="w-full md:max-w-4xl bg-slate-50 flex flex-col transform transition-all duration-300 translate-y-full md:translate-y-0 md:scale-95 md:opacity-0 h-full md:h-auto md:max-h-[90vh] md:rounded-3xl overflow-hidden shadow-2xl relative">
            ${modalHeaderHTML}
            
            <div class="flex-grow overflow-y-auto p-4 md:p-6 custom-scrollbar bg-slate-50/50 pb-32 md:pb-24">
                <form id="package-form" class="space-y-5 md:space-y-6">
                    
                    <div>
                        <h3 class="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5 ml-1 flex items-center gap-1.5"><i class="bi bi-info-circle text-indigo-500 text-sm"></i> Informações Básicas</h3>
                        <div class="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div class="md:col-span-3">
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nome Comercial do Pacote *</label>
                                    <input type="text" id="packageName" value="${safeName}" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-black text-slate-800 text-sm shadow-inner transition-all" placeholder="Ex: Combo Verão, Especial Noivas..." required>
                                </div>
                                <div class="md:col-span-1">
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Status</label>
                                    <select id="packageStatus" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-800 text-sm shadow-inner cursor-pointer transition-all">
                                        <option value="active" ${pkg.status !== 'inactive' ? 'selected' : ''}>Ativo</option>
                                        <option value="inactive" ${pkg.status === 'inactive' ? 'selected' : ''}>Inativo</option>
                                    </select>
                                </div>
                                
                                <div class="md:col-span-4 mt-2 border-t border-slate-100 pt-4">
                                    <div class="flex justify-between items-center mb-3">
                                        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Unidades de Venda Permitidas *</label>
                                        <button type="button" data-action="toggle-all-ests" class="text-[9px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 shadow-sm active:scale-95 transition-all">Selecionar Todas</button>
                                    </div>
                                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-40 overflow-y-auto custom-scrollbar p-1">
                                        ${estCheckboxesHTML}
                                    </div>
                                </div>
                            </div>
                            <div class="pt-2">
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Descrição para o Cliente (Opcional)</label>
                                <textarea id="packageDescription" rows="2" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium text-slate-700 resize-none shadow-inner transition-all" placeholder="Descreva os benefícios e condições do pacote...">${safeDesc}</textarea>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div class="flex justify-between items-center mb-2.5 ml-1">
                            <h3 class="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><i class="bi bi-layers text-indigo-500 text-sm"></i> Composição do Pacote</h3>
                            <button type="button" data-action="add-item-to-package-btn" class="py-2 px-4 bg-indigo-100 text-indigo-700 font-black rounded-xl text-[10px] md:text-xs hover:bg-indigo-200 transition shadow-sm flex items-center gap-1.5 uppercase tracking-wider active:scale-95 border border-indigo-200">
                                <i class="bi bi-plus-circle-fill text-sm"></i> Inserir Serviço/Produto
                            </button>
                        </div>
                        <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                            <div id="package-items-list" class="max-h-72 overflow-y-auto custom-scrollbar bg-slate-50/50 p-4 min-h-[6rem]">
                                </div>
                            <div class="bg-slate-100 p-5 border-t border-slate-200 flex justify-between items-center shadow-inner">
                                <span class="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Soma Original dos Itens</span>
                                <span id="originalPrice" class="text-xl font-black text-slate-800 drop-shadow-sm">R$ 0,00</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5 ml-1 flex items-center gap-1.5"><i class="bi bi-currency-dollar text-indigo-500 text-sm"></i> Regras e Precificação</h3>
                        <div class="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                            
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div class="col-span-2 relative">
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Preço Final *</label>
                                    <div class="relative">
                                        <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-600 font-black text-xl">R$</span>
                                        <input type="number" step="0.01" id="finalPrice" value="${safePrice}" class="w-full pl-12 p-3.5 bg-indigo-50 border-2 border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-black text-2xl text-indigo-800 shadow-inner transition-all" required placeholder="0.00">
                                    </div>
                                    <p id="discountIndicator" class="absolute right-0 -top-5 text-[10px] font-black text-white bg-red-500 px-3 py-1 rounded-lg shadow-md hidden animate-fade-in-down">0% OFF</p>
                                </div>
                                
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Comissão (%)</label>
                                    <input type="number" id="commissionRate" value="${safeCommission}" class="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-black text-base text-slate-700 shadow-inner transition-all" placeholder="Ex: 10">
                                </div>

                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5" title="Prazo para usar os itens após a compra">Validade (Dias)</label>
                                    <div class="relative">
                                        <input type="number" id="validityDays" value="${safeValidity}" class="w-full p-3.5 pr-12 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-black text-base text-slate-700 shadow-inner transition-all" placeholder="Vitalício">
                                        <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dias</span>
                                    </div>
                                </div>
                            </div>

                            <div class="border-t border-slate-100 pt-5 mt-2">
                                <p class="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-1.5"><i class="bi bi-lightning-charge-fill text-sm"></i> Gatilhos de Venda (Opcional)</p>
                                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div>
                                        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Início da Venda</label>
                                        <input type="date" id="sellStartDate" value="${sellStartDate}" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-xs font-bold text-slate-700 shadow-inner transition-all">
                                    </div>
                                    <div>
                                        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Fim da Venda</label>
                                        <input type="date" id="sellEndDate" value="${sellEndDate}" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-xs font-bold text-slate-700 shadow-inner transition-all">
                                    </div>
                                    <div class="col-span-2 md:col-span-1">
                                        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Limite de Estoque</label>
                                        <input type="number" id="salesLimit" value="${salesLimit}" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-black text-slate-700 text-sm shadow-inner transition-all" placeholder="Qtd máxima">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <footer class="absolute bottom-0 left-0 right-0 p-3 pb-safe md:p-4 border-t border-slate-200 bg-white flex justify-end gap-3 z-50 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.1)] md:rounded-b-3xl">
                <button type="button" data-action="back-to-main" class="hidden md:block py-2.5 px-6 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 transition-colors shadow-sm uppercase tracking-wider">Cancelar</button>
                <button data-action="save-package" class="w-full md:w-auto py-3 md:py-2.5 px-6 bg-indigo-600 text-white font-black text-xs md:text-sm rounded-xl hover:bg-indigo-700 shadow-md transition-transform active:scale-95 uppercase tracking-wider flex justify-center items-center gap-2">
                    <i class="bi bi-save2-fill text-base"></i> Salvar Pacote
                </button>
            </footer>
        </div>
    `;

    renderSelectedItems();

    // Trigger de animação para garantir que não fique transparente
    requestAnimationFrame(() => {
        const wrapper = detailContainer.querySelector('#modal-content-wrapper');
        if (wrapper) {
            wrapper.classList.remove('translate-y-full', 'md:scale-95', 'md:opacity-0');
            wrapper.classList.add('translate-y-0', 'md:scale-100', 'md:opacity-100');
        }
    });
}

function renderItemSelectorView() {
    localState.viewMode = 'select-item';
    const detailContainer = document.getElementById('packages-layout-detail');
    if (!detailContainer) return;

    const modalHeaderHTML = `
        <header class="bg-white border-b border-slate-200 px-5 py-4 flex items-center justify-between pt-safe-top md:pt-4 shadow-sm z-20 flex-shrink-0 relative md:rounded-t-3xl w-full">
            <button type="button" data-action="back-to-editor" class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-90 transition-colors z-10 relative">
                <i class="bi bi-arrow-left"></i>
            </button>
            <div class="text-center z-10 relative flex-1 px-4">
                <h2 class="text-base font-black text-slate-800 tracking-tight leading-tight truncate">Catálogo de Itens</h2>
                <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Adicionar ao Pacote</p>
            </div>
            <div class="w-10 h-10 z-10 relative"></div>
        </header>
    `;

    detailContainer.innerHTML = `
        <div id="modal-content-wrapper" class="w-full md:max-w-4xl bg-slate-50 flex flex-col transform transition-all duration-300 translate-y-full md:translate-y-0 md:scale-95 md:opacity-0 h-full md:h-auto md:max-h-[90vh] md:rounded-3xl overflow-hidden shadow-2xl relative">
            ${modalHeaderHTML}
            <div class="flex-grow overflow-y-auto p-4 md:p-6 custom-scrollbar bg-slate-50/50 flex flex-col pb-24">
                
                <div class="relative mb-5 flex-shrink-0 w-full">
                    <i class="bi bi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg"></i>
                    <input type="search" id="item-search-input" placeholder="Pesquisar produto ou serviço..." class="w-full pl-12 p-3.5 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-white transition-colors shadow-sm font-bold text-slate-700">
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5 flex-grow overflow-y-auto w-full pb-8">
                    <div class="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
                        <h4 class="font-black mb-4 text-center text-xs uppercase tracking-widest text-indigo-600 bg-indigo-50 py-2.5 rounded-xl border border-indigo-100"><i class="bi bi-scissors mr-1 text-sm"></i> Serviços</h4>
                        <div id="catalog-service-list" class="space-y-3 flex-grow overflow-y-auto custom-scrollbar pr-2"></div>
                    </div>
                    <div class="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
                        <h4 class="font-black mb-4 text-center text-xs uppercase tracking-widest text-emerald-600 bg-emerald-50 py-2.5 rounded-xl border border-emerald-100"><i class="bi bi-box-seam mr-1 text-sm"></i> Produtos</h4>
                        <div id="catalog-product-list" class="space-y-3 flex-grow overflow-y-auto custom-scrollbar pr-2"></div>
                    </div>
                </div>

            </div>
        </div>
    `;

    let debounceTimer;
    const filterAndRender = (term = '') => {
        const lowerTerm = term.toLowerCase();
        const icons = {
            service: '<i class="bi bi-scissors text-indigo-600 text-lg"></i>',
            product: '<i class="bi bi-box-seam text-emerald-600 text-lg"></i>'
        };
        const lists = {
            'catalog-service-list': { items: localState.catalogForModal.services, type: 'service' },
            'catalog-product-list': { items: localState.catalogForModal.products, type: 'product' }
        };
        
        Object.entries(lists).forEach(([id, { items, type }]) => {
            const el = detailContainer.querySelector('#' + id);
            if (!el) return;
            const filtered = items.filter(i => i.name.toLowerCase().includes(lowerTerm)).slice(0, 50);
            
            const typeBg = type === 'service' ? 'hover:border-indigo-400 hover:bg-indigo-50/80 hover:shadow-md' : 'hover:border-emerald-400 hover:bg-emerald-50/80 hover:shadow-md';
            const iconBg = type === 'service' ? 'bg-indigo-100 border-indigo-200 shadow-sm' : 'bg-emerald-100 border-emerald-200 shadow-sm';

            el.innerHTML = filtered.map(item => {
                if (!item.id) return '';
                
                return `
                <button data-action="select-catalog-item" data-item-type="${type}" data-item-id="${item.id}" class="flex items-center gap-4 w-full p-3 bg-white border border-slate-200 rounded-2xl ${typeBg} shadow-sm transition-all duration-300 text-left group active:scale-95">
                    <div class="flex-shrink-0 w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center border group-hover:scale-110 transition-transform">${icons[type]}</div>
                    <div class="flex-grow min-w-0">
                        <span class="block text-sm font-black text-slate-800 truncate group-hover:text-indigo-900 transition-colors">${escapeHTML(item.name)}</span>
                        <span class="block font-black text-xs text-slate-500 mt-1">${formatCurrency(item.price)}</span>
                    </div>
                    <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-colors shadow-inner flex-shrink-0">
                        <i class="bi bi-plus-lg text-slate-400 group-hover:text-white transition-colors"></i>
                    </div>
                </button>
            `}).join('') || `<div class="flex flex-col items-center justify-center py-8 text-slate-400 border border-dashed border-slate-200 rounded-2xl bg-slate-50"><i class="bi bi-inbox text-3xl mb-2"></i><p class="text-[10px] font-bold uppercase tracking-widest">Nenhum resultado</p></div>`;
        });
    };

    filterAndRender(); 
    const searchInput = detailContainer.querySelector('#item-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => filterAndRender(e.target.value), 300);
        });
        setTimeout(() => searchInput.focus(), 100);
    }

    // Trigger de animação para garantir que não fique transparente
    requestAnimationFrame(() => {
        const wrapper = detailContainer.querySelector('#modal-content-wrapper');
        if (wrapper) {
            wrapper.classList.remove('translate-y-full', 'md:scale-95', 'md:opacity-0');
            wrapper.classList.add('translate-y-0', 'md:scale-100', 'md:opacity-100');
        }
    });
}

// --- 5. EVENT LISTENERS PRINCIPAIS ---

function setupEventListeners() {
    if (pageEventListener) {
        contentDiv.removeEventListener('click', pageEventListener);
        contentDiv.removeEventListener('input', pageEventListener);
        contentDiv.removeEventListener('change', pageEventListener);
    }

    pageEventListener = async (e) => {
        // Seleção Individual de Pacotes na Lista
        if (e.target.classList.contains('item-checkbox')) {
            const id = e.target.value;
            if(e.target.checked) localState.selectedIds.add(id);
            else localState.selectedIds.delete(id);
            updateBatchActionBar();
            renderPackagesList(); // Re-render para aplicar os estilos selecionados
            e.stopPropagation();
            return;
        }

        // Intercepta overlay fixo click para fechar (Comportamento de Modal)
        if (e.target.id === 'packages-layout-detail') {
            hideMobileDetail();
            localState.viewMode = 'list';
            localState.tempPackage = null;
            return;
        }

        // Clique no botão "Excluir em Lote"
        const batchDeleteBtn = e.target.closest('#batch-delete-btn');
        if (batchDeleteBtn) {
            const count = localState.selectedIds.size;
            if(count === 0) return;
            const confirmed = await showConfirmation('Excluir Pacotes', `Deseja realmente apagar ${count} pacotes selecionados?`);
            if (confirmed) {
                try {
                    const promises = Array.from(localState.selectedIds).map(id => packagesApi.deletePackage(id));
                    await Promise.all(promises);
                    showNotification('Sucesso', `${count} pacote(s) excluído(s).`, 'success');
                    localState.selectedIds.clear();
                    updateBatchActionBar();
                    await fetchAndDisplayData();
                } catch (err) {
                    showNotification('Erro', 'Ocorreu um erro ao excluir pacotes.', 'error');
                }
            }
            return;
        }

        // Clique no botão "Cancelar Seleção"
        const cancelBtn = e.target.closest('#cancel-selection-btn');
        if (cancelBtn) {
            localState.selectedIds.clear();
            const selectAll = document.getElementById('select-all-toggle');
            if(selectAll) selectAll.checked = false;
            updateBatchActionBar();
            renderPackagesList(); 
            return;
        }

        const target = e.target.closest('[data-action]');
        if (!target) return;

        const action = target.dataset.action;
        
        switch (action) {
            case 'new-package':
                if (navigator.vibrate) navigator.vibrate(20);
                openPackageEditor(null);
                break;
            case 'edit-package':
                if (navigator.vibrate) navigator.vibrate(15);
                const pkgIdToEdit = target.dataset.id;
                const pkgToEdit = localState.allPackages.find(p => p.id === pkgIdToEdit);
                if(pkgToEdit) openPackageEditor(pkgToEdit);
                break;
            case 'delete-package':
                e.stopPropagation();
                e.preventDefault();
                const pkgId = target.dataset.id;
                const confirmed = await showConfirmation('Excluir Pacote', 'Tem a certeza que deseja excluir este pacote promocional? Esta ação é irreversível.');
                if (confirmed) {
                    try {
                        await packagesApi.deletePackage(pkgId);
                        showNotification('Sucesso!', 'Pacote excluído.', 'success');
                        if(localState.viewMode === 'edit-package' && localState.tempPackage?.id === pkgId) {
                            hideMobileDetail();
                            localState.viewMode = 'list';
                        }
                        await fetchAndDisplayData();
                    } catch (error) {
                        showNotification('Erro', `Não foi possível excluir: ${error.message}`, 'error');
                    }
                }
                break;
            case 'back-to-main':
                hideMobileDetail();
                localState.viewMode = 'list';
                localState.tempPackage = null;
                break;
            case 'add-item-to-package-btn':
                syncPackageFormToState(); 
                renderItemSelectorView();
                break;
            case 'back-to-editor':
                renderPackageEditorView();
                break;
            case 'select-catalog-item':
                if (navigator.vibrate) navigator.vibrate(10);
                const { itemType, itemId } = target.dataset;
                const catalog = localState.catalogForModal[itemType + 's'] || [];
                const itemToSelect = catalog.find(i => i.id === itemId);
                if (itemToSelect) {
                    const existing = localState.tempPackage.items.find(s => s.id === itemToSelect.id && s.type === itemType);
                    if (existing) {
                        existing.quantity++;
                    } else {
                        localState.tempPackage.items.push({ ...itemToSelect, type: itemType, quantity: 1 });
                    }
                    renderPackageEditorView();
                }
                break;
            case 'remove-item':
                if (navigator.vibrate) navigator.vibrate(10);
                const index = parseInt(target.dataset.index, 10);
                localState.tempPackage.items.splice(index, 1);
                renderSelectedItems();
                break;
            case 'toggle-all-ests':
                const checkboxes = document.querySelectorAll('.modal-est-checkbox');
                const allChecked = Array.from(checkboxes).every(c => c.checked);
                checkboxes.forEach(c => c.checked = !allChecked);
                break;
            case 'save-package':
                await handleSavePackage(target);
                break;
        }
    };
    
    contentDiv.addEventListener('click', pageEventListener);

    contentDiv.addEventListener('input', (e) => {
        if (e.target.id === 'search-packages') {
            localState.searchQuery = e.target.value;
            renderPackagesList();
        }
        if (e.target.id === 'finalPrice') {
            calculateAndShowDiscount();
        }
    });

    contentDiv.addEventListener('change', (e) => {
        if (e.target.id === 'select-all-toggle') {
            const isChecked = e.target.checked;
            localState.selectedIds.clear();
            if (isChecked) {
                localState.allPackages.forEach(p => localState.selectedIds.add(p.id));
            }
            updateBatchActionBar();
            renderPackagesList();
        }
        if (e.target.id === 'filter-status') {
            localState.statusFilter = e.target.value;
            renderPackagesList();
        }
        if (e.target.classList.contains('quantity-input')) {
            const index = parseInt(e.target.dataset.index, 10);
            const newQuantity = parseInt(e.target.value, 10);
            if (newQuantity > 0 && localState.tempPackage.items[index]) {
                localState.tempPackage.items[index].quantity = newQuantity;
                renderSelectedItems();
            }
        }
    });

    const exportBtn = document.getElementById('export-excel-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', handleExportExcel);
    }
}

async function handleSavePackage(saveButton) {
    const pkg = localState.tempPackage;
    const isEditing = !!pkg.id;
    
    const detailContainer = document.getElementById('packages-layout-detail');
    if(!detailContainer) return;

    const selectedEsts = Array.from(detailContainer.querySelectorAll('.modal-est-checkbox:checked')).map(cb => cb.value);
    if (selectedEsts.length === 0) {
        showNotification('Atenção', 'Selecione pelo menos uma unidade para o pacote.', 'warning');
        return;
    }

    const originalPrice = pkg.items.reduce((acc, s) => acc + (s.price * s.quantity), 0);
    
    const data = {
        id: pkg.id || null,
        companyId: state.companyId, // INJEÇÃO DA COMPANY ID (CORREÇÃO DE GHOST RECORD)
        name: detailContainer.querySelector('#packageName').value,
        description: detailContainer.querySelector('#packageDescription').value,
        status: detailContainer.querySelector('#packageStatus').value,
        items: pkg.items, 
        originalPrice: originalPrice,
        price: parseFloat(detailContainer.querySelector('#finalPrice').value),
        commissionRate: parseFloat(detailContainer.querySelector('#commissionRate').value) || 0,
        validityDays: parseInt(detailContainer.querySelector('#validityDays').value, 10) || null,
        sellStartDate: detailContainer.querySelector('#sellStartDate').value || null,
        sellEndDate: detailContainer.querySelector('#sellEndDate').value || null,
        salesLimit: parseInt(detailContainer.querySelector('#salesLimit').value, 10) || null,
        establishmentIds: selectedEsts, 
        establishmentId: selectedEsts[0] 
    };

    if (!data.name || isNaN(data.price)) {
         showNotification('Erro', 'Nome do Pacote e Preço Final são obrigatórios.', 'warning');
         return;
    }

    if (data.items.length === 0) {
        showNotification('Erro', 'Adicione pelo menos um serviço ou produto ao pacote.', 'warning');
        return;
    }

    const originalText = saveButton.innerHTML;
    saveButton.disabled = true;
    saveButton.innerHTML = '<div class="loader-small border-white mr-2"></div> Salvando...';

    try {
        if (isEditing) {
            await packagesApi.updatePackage(data.id, data);
        } else {
            delete data.id;
            await packagesApi.createPackage(data);
        }
        showNotification('Sucesso!', `Pacote ${isEditing ? 'atualizado' : 'criado'} com sucesso.`, 'success');
        
        hideMobileDetail();
        localState.viewMode = 'list';
        localState.tempPackage = null;
        
        await fetchAndDisplayData(); 
    } catch (error) {
        showNotification('Erro', `Não foi possível salvar o pacote: ${error.message}`, 'error');
        saveButton.disabled = false;
        saveButton.innerHTML = originalText;
    }
}