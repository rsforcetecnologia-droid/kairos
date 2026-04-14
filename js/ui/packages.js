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
    
    // Suporte Multi-Unidades
    establishments: [],
    filterEstablishmentIds: new Set(),
    
    searchQuery: '',
    statusFilter: 'all', // 'all', 'active', 'inactive'
    
    viewMode: 'list', // 'list', 'edit-package', 'select-item'
    tempPackage: null // Armazena os dados do pacote que está a ser editado
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
    const layoutMain = document.getElementById('packages-layout-main');
    const layoutDetail = document.getElementById('packages-layout-detail');
    const bottomNav = document.getElementById('mobile-bottom-nav');
    
    if (layoutMain) layoutMain.classList.add('mobile-detail-open');
    if (layoutDetail) {
        layoutDetail.classList.remove('hidden');
        layoutDetail.classList.add('flex');
    }
    if (bottomNav) bottomNav.style.display = 'none';
}

function hideMobileDetail() {
    const layoutMain = document.getElementById('packages-layout-main');
    const layoutDetail = document.getElementById('packages-layout-detail');
    const bottomNav = document.getElementById('mobile-bottom-nav');
    
    if (layoutMain) layoutMain.classList.remove('mobile-detail-open');
    if (layoutDetail) {
        layoutDetail.classList.add('hidden');
        layoutDetail.classList.remove('flex');
    }
    if (bottomNav) bottomNav.style.display = '';
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
        
        if (localState.filterEstablishmentIds.size === 0) {
            localState.filterEstablishmentIds.add(state.establishmentId);
        }
    } catch (e) {
        console.error("Erro ao buscar hierarquia de empresas", e);
    }

    localState.viewMode = 'list';
    renderBaseLayout();
    setupEventListeners();
    await fetchAndDisplayData();
}

async function fetchAndDisplayData() {
    const listContainer = document.getElementById('packagesListContainer');
    if (listContainer) {
        listContainer.innerHTML = '<div class="col-span-full flex justify-center py-20"><div class="loader"></div></div>';
    }

    try {
        const fetchPromises = Array.from(localState.filterEstablishmentIds).map(id => packagesApi.getPackages(id).catch(() => []));
        const results = await Promise.all(fetchPromises);
        
        const uniquePackagesMap = new Map();
        results.flat().forEach(pkg => {
            if (!uniquePackagesMap.has(pkg.id)) {
                uniquePackagesMap.set(pkg.id, pkg);
            }
        });
        localState.allPackages = Array.from(uniquePackagesMap.values());

        const [services, products] = await Promise.all([
            servicesApi.getServices(state.establishmentId).catch(() => []),
            productsApi.getProducts(state.establishmentId).catch(() => [])
        ]);
        
        localState.catalogForModal = {
            services: (services || []).filter(s => s.active),
            products: products || []
        };

        renderKPIs();
        renderPackagesList(); 
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

function renderBaseLayout() {
    const estCheckboxes = localState.establishments.map(est => `
        <label class="inline-flex items-center gap-1.5 px-2 py-1 bg-white border ${localState.filterEstablishmentIds.has(est.id) ? 'border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700' : 'border-slate-200 text-slate-600'} rounded-lg cursor-pointer hover:bg-slate-50 transition-all shadow-sm est-label select-none flex-shrink-0">
            <input type="checkbox" class="est-filter-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3 h-3" value="${est.id}" ${localState.filterEstablishmentIds.has(est.id) ? 'checked' : ''}>
            <span class="text-[9px] font-bold whitespace-nowrap">${est.type === 'Matriz' ? '<i class="bi bi-building mr-1"></i>' : '<i class="bi bi-shop mr-1"></i>'} ${est.name}</span>
        </label>
    `).join('');

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
                }
            }
            #toast-container, .toast-notification, .modal, .modal-backdrop { z-index: 9999999 !important; }
        </style>
        
        <div class="h-full flex w-full relative overflow-hidden bg-slate-50">
            <section id="packages-layout-main" class="flex-1 flex flex-col p-2 md:p-4 md:pl-6 w-full relative overflow-y-auto custom-scrollbar">
                
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2 animate-fade-in w-full">
                    <div class="relative w-full md:w-96 flex-shrink-0">
                        <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
                        <input type="text" id="search-packages" placeholder="Buscar pacotes..." class="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm text-xs font-semibold text-slate-700">
                    </div>
                    
                    <div class="grid grid-cols-2 md:flex md:flex-wrap items-center gap-2 w-full md:w-auto">
                        <select id="filter-status" class="py-2 px-2 bg-white border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-indigo-500 text-[10px] font-bold text-slate-700 shadow-sm cursor-pointer col-span-2 md:col-span-1">
                            <option value="all">Todos os Status</option>
                            <option value="active">Apenas Ativos</option>
                            <option value="inactive">Apenas Inativos</option>
                        </select>
                        <button id="export-excel-btn" class="py-2 px-2 bg-white border border-slate-200 text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition shadow-sm flex items-center justify-center gap-1.5 text-[10px] active:scale-95">
                            <i class="bi bi-file-earmark-excel-fill text-sm"></i> Excel
                        </button>
                        <button data-action="new-package" class="py-2 px-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-sm flex items-center justify-center gap-1.5 text-[10px] active:scale-95 uppercase tracking-wider">
                            <i class="bi bi-plus-lg text-sm"></i> Criar Pacote
                        </button>
                    </div>
                </div>

                ${localState.establishments.length > 1 ? `
                <div class="mb-2 animate-fade-in flex gap-1.5 overflow-x-auto custom-scrollbar pb-1" id="establishment-filters-container">
                    ${estCheckboxes}
                </div>
                ` : ''}

                <div id="kpi-container" class="grid grid-cols-4 gap-1.5 md:gap-3 mb-2 animate-fade-in w-full"></div>

                <div id="packagesListContainer" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 pb-20 mt-2"></div>
                
            </section>

            <div id="packages-layout-detail" class="hidden absolute inset-0 z-50 bg-slate-50 flex-col overflow-hidden w-full h-full md:relative md:inset-auto md:z-auto md:flex-1 md:border-l md:border-slate-200">
                </div>
        </div>
    `;
}

function renderKPIs() {
    const kpis = calculateKPIs();
    const container = document.getElementById('kpi-container');
    if (!container) return;

    container.innerHTML = `
        <div class="bg-white p-1.5 md:p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Total</span>
            <span class="text-xs md:text-lg font-black text-slate-800 mt-0.5 w-full truncate">${kpis.total}</span>
        </div>
        <div class="bg-white p-1.5 md:p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Ativos</span>
            <span class="text-xs md:text-lg font-black text-emerald-600 mt-0.5 w-full truncate">${kpis.activeCount}</span>
        </div>
        <div class="bg-white p-1.5 md:p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Desconto</span>
            <span class="text-xs md:text-lg font-black text-red-500 mt-0.5 w-full truncate">${kpis.maxDiscount.toFixed(0)}%</span>
        </div>
        <div class="bg-white p-1.5 md:p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[8px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Ticket</span>
            <span class="text-xs md:text-lg font-black text-indigo-600 mt-0.5 w-full truncate">${formatCurrency(kpis.avgPrice)}</span>
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
            <div class="col-span-full flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-dashed border-slate-300">
                <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-box2 text-2xl text-slate-300"></i>
                </div>
                <h3 class="text-sm font-bold text-slate-700 mb-1">Nenhum pacote encontrado</h3>
                <p class="text-[10px] text-slate-500 mb-4 max-w-sm text-center">Não existem pacotes com os filtros selecionados.</p>
                <button data-action="new-package" class="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold rounded-lg hover:bg-indigo-100 transition-colors text-[10px] uppercase tracking-wider">
                    Criar Pacote
                </button>
            </div>
        `;
        return;
    }

    const estMap = new Map(localState.establishments.map(e => [e.id, e]));

    listContainer.innerHTML = filteredPackages.map(pkg => {
        const isActive = pkg.status !== 'inactive';
        const finalPrice = pkg.price || 0;
        const originalPrice = pkg.originalPrice || 0;
        const discountPercent = originalPrice > 0 && originalPrice > finalPrice ? ((originalPrice - finalPrice) / originalPrice) * 100 : 0;
        const safeName = escapeHTML(pkg.name);
        const safeDesc = escapeHTML(pkg.description || 'Nenhuma descrição detalhada.');
        const itemsCount = (pkg.items || []).reduce((acc, i) => acc + (i.quantity || 1), 0);

        const validityStr = pkg.validityDays ? `${pkg.validityDays} dias p/ uso` : 'Uso vitalício';
        const promoDateStr = pkg.sellEndDate ? `Até ${new Date(pkg.sellEndDate).toLocaleDateString('pt-BR')}` : 'Venda contínua';
        
        const pkgEstIds = pkg.establishmentIds || (pkg.establishmentId ? [pkg.establishmentId] : []);
        let estBadge = '';
        
        if (pkgEstIds.length === 1) {
            const estObj = estMap.get(pkgEstIds[0]);
            if (estObj) {
                const estIcon = estObj.type === 'Matriz' ? 'bi-building' : 'bi-shop';
                estBadge = `<span class="text-[8px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold border border-slate-200 flex items-center w-max"><i class="bi ${estIcon} mr-1 opacity-50"></i> ${estObj.name}</span>`;
            }
        } else if (pkgEstIds.length > 1) {
            estBadge = `<span class="text-[8px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 font-bold border border-indigo-100 flex items-center w-max"><i class="bi bi-buildings mr-1 opacity-50"></i> ${pkgEstIds.length} Unidades</span>`;
        }

        // Criar card estilo Native
        return `
            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-300 flex flex-col relative overflow-hidden group cursor-pointer active:scale-[0.98]"
                 data-action="edit-package" data-id="${pkg.id}">
                
                ${discountPercent > 0 ? `<div class="absolute -right-7 top-3 bg-red-500 text-white text-[9px] font-black uppercase tracking-wider py-0.5 px-8 transform rotate-45 shadow-sm z-10">${discountPercent.toFixed(0)}% OFF</div>` : ''}

                <div class="p-4 flex-grow">
                    <div class="flex justify-between items-start pr-6 mb-2">
                        <div class="flex flex-col gap-1">
                            <div class="flex items-center gap-1.5">
                                <span class="w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-slate-300'}"></span>
                                <span class="text-[9px] font-bold ${isActive ? 'text-emerald-600' : 'text-slate-500'} uppercase tracking-widest">${isActive ? 'Ativo' : 'Inativo'}</span>
                            </div>
                            ${estBadge}
                        </div>
                    </div>
                    
                    <h3 class="text-base font-black text-slate-800 leading-tight line-clamp-1 mb-1">${safeName}</h3>
                    <p class="text-[10px] text-slate-500 line-clamp-2 min-h-[1.5rem] mb-3">${safeDesc}</p>

                    <div class="bg-slate-50 rounded-xl p-2.5 mb-3 border border-slate-100 flex justify-between items-center">
                        <div class="flex flex-col">
                            <span class="text-[9px] font-bold text-slate-400 uppercase">Conteúdo</span>
                            <span class="text-[11px] font-black text-indigo-600">${itemsCount} Itens</span>
                        </div>
                        <div class="flex flex-col text-right">
                            <span class="text-[9px] font-bold text-slate-400 uppercase">Validade</span>
                            <span class="text-[10px] font-semibold text-slate-700">${validityStr}</span>
                        </div>
                    </div>

                    <div class="flex justify-between items-end">
                        <div>
                            ${discountPercent > 0 ? `<p class="text-[9px] text-slate-400 font-bold line-through mb-0.5">De ${formatCurrency(originalPrice)}</p>` : ''}
                            <p class="text-xl font-black text-slate-900 leading-none">${formatCurrency(finalPrice)}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-[8px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-calendar-event mr-0.5"></i>${promoDateStr}</p>
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

// --- 5. TELAS NATIVAS DE EDIÇÃO (SCREEN SWAP) ---

function openPackageEditor(pkg = null) {
    localState.viewMode = 'edit-package';
    // Fazemos uma cópia profunda para não sujar o estado até salvar
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
            <div class="flex items-center justify-between bg-white p-2.5 rounded-xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors animate-fade-in-fast mb-2">
                <div class="flex items-center gap-3 min-w-0 flex-1">
                    <div class="flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 shadow-inner">
                        <span class="text-[8px] font-bold text-slate-400 uppercase leading-none mb-0.5">Qtd</span>
                        <input type="number" value="${item.quantity}" min="1" class="w-10 text-center bg-transparent text-sm font-black text-slate-700 outline-none quantity-input" data-index="${index}">
                    </div>
                    <div class="min-w-0">
                        <div class="flex items-center gap-1.5 mb-1">
                            <span class="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${typeBg} flex items-center gap-1"><i class="bi ${typeIcon}"></i> ${isService ? 'Serviço' : 'Produto'}</span>
                        </div>
                        <p class="font-bold text-slate-800 text-xs truncate leading-tight">${escapeHTML(item.name)}</p>
                    </div>
                </div>
                <div class="flex items-center gap-3 flex-shrink-0 pl-2">
                    <div class="text-right">
                        <span class="block text-[8px] font-bold text-slate-400 uppercase">Valor Un.</span>
                        <span class="text-xs font-black text-slate-700">${formatCurrency(item.price)}</span>
                    </div>
                    <button type="button" class="w-8 h-8 flex items-center justify-center rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors remove-item-btn" data-index="${index}">
                        <i class="bi bi-trash3 pointer-events-none"></i>
                    </button>
                </div>
            </div>
        `}).join('');
    }
    calculateAndShowDiscount();
}

function renderPackageEditorView() {
    const detailContainer = document.getElementById('packages-layout-detail');
    if (!detailContainer) return;

    const pkg = localState.tempPackage;
    const isEditing = !!pkg.id;

    const safeName = escapeHTML(pkg.name || '');
    const safeDesc = escapeHTML(pkg.description || '');
    const safePrice = pkg.price || '';
    const safeCommission = pkg.commissionRate || 0;
    const safeValidity = pkg.validityDays || '';
    const sellStartDate = pkg.sellStartDate ? new Date(pkg.sellStartDate).toISOString().split('T')[0] : '';
    const sellEndDate = pkg.sellEndDate ? new Date(pkg.sellEndDate).toISOString().split('T')[0] : '';
    const salesLimit = pkg.salesLimit || '';
    
    const currentEstIds = pkg.establishmentIds || [];

    const estCheckboxesHTML = localState.establishments.map(est => `
        <label class="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors cursor-pointer group">
            <input type="checkbox" class="modal-est-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4" value="${est.id}" ${currentEstIds.includes(est.id) ? 'checked' : ''}>
            <span class="text-xs font-semibold text-slate-700 truncate group-hover:text-indigo-700" title="${est.name}">${est.type === 'Matriz' ? '🏢' : '📍'} ${est.name}</span>
        </label>
    `).join('');

    const mobileHeaderHTML = `
        <div class="p-4 border-b border-slate-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50">
            <button data-action="back-to-main" class="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 shadow-inner transition-transform active:scale-95">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            <h3 class="font-black text-base text-slate-800 ml-4 uppercase tracking-wider">${isEditing ? 'Editar Pacote' : 'Novo Pacote'}</h3>
            ${isEditing ? `
                <button data-action="delete-package" data-id="${pkg.id}" class="ml-auto w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 shadow-inner transition-transform active:scale-95">
                    <i class="bi bi-trash3 text-lg"></i>
                </button>
            ` : ''}
        </div>
    `;

    detailContainer.innerHTML = `
        ${mobileHeaderHTML}
        <div class="flex-grow overflow-y-auto p-3 md:p-6 custom-scrollbar bg-slate-50/50 pb-28">
            <form id="package-form" class="max-w-3xl mx-auto space-y-4 md:space-y-6">
                
                <div>
                    <h3 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1 flex items-center gap-1.5"><i class="bi bi-info-circle text-indigo-400"></i> Informações Básicas</h3>
                    <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
                            <div class="md:col-span-3">
                                <label class="block text-[9px] font-bold text-slate-500 uppercase mb-1">Nome Comercial do Pacote *</label>
                                <input type="text" id="packageName" value="${safeName}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none font-black text-slate-800 text-sm shadow-inner" placeholder="Ex: Combo Verão, Especial Noivas..." required>
                            </div>
                            <div class="md:col-span-1">
                                <label class="block text-[9px] font-bold text-slate-500 uppercase mb-1">Status</label>
                                <select id="packageStatus" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none font-bold text-slate-800 text-xs shadow-inner">
                                    <option value="active" ${pkg.status !== 'inactive' ? 'selected' : ''}>Ativo</option>
                                    <option value="inactive" ${pkg.status === 'inactive' ? 'selected' : ''}>Inativo</option>
                                </select>
                            </div>
                            
                            <div class="md:col-span-4 mt-2 border-t border-slate-100 pt-3">
                                <div class="flex justify-between items-center mb-2">
                                    <label class="block text-[9px] font-bold text-slate-500 uppercase">Unidades Disponíveis *</label>
                                    <button type="button" data-action="toggle-all-ests" class="text-[8px] font-black text-indigo-500 hover:text-indigo-700 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-100">Selecionar Todas</button>
                                </div>
                                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto custom-scrollbar p-1">
                                    ${estCheckboxesHTML}
                                </div>
                            </div>
                        </div>
                        <div>
                            <label class="block text-[9px] font-bold text-slate-500 uppercase mb-1">Descrição para o Cliente (Opcional)</label>
                            <textarea id="packageDescription" rows="2" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none text-xs font-medium text-slate-700 resize-none shadow-inner" placeholder="Descreva os benefícios e condições do pacote...">${safeDesc}</textarea>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="flex justify-between items-center mb-2 ml-1">
                        <h3 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><i class="bi bi-layers text-indigo-400"></i> Composição do Pacote</h3>
                        <button type="button" data-action="add-item-to-package-btn" class="py-1.5 px-3 bg-indigo-100 text-indigo-700 font-black rounded-lg text-[9px] hover:bg-indigo-200 transition shadow-sm flex items-center gap-1 uppercase tracking-wider">
                            <i class="bi bi-plus-lg"></i> Inserir Serviço/Produto
                        </button>
                    </div>
                    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div id="package-items-list" class="max-h-64 overflow-y-auto custom-scrollbar bg-slate-50/50 p-2 min-h-[5rem]">
                            </div>
                        <div class="bg-slate-100 p-3.5 border-t border-slate-200 flex justify-between items-center shadow-inner">
                            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Soma Original</span>
                            <span id="originalPrice" class="text-lg font-black text-slate-800">R$ 0,00</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1 flex items-center gap-1.5"><i class="bi bi-currency-dollar text-indigo-400"></i> Regras e Precificação</h3>
                    <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                        
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div class="col-span-2 relative">
                                <label class="block text-[9px] font-bold text-slate-500 uppercase mb-1">Preço Final *</label>
                                <div class="relative">
                                    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-600 font-black text-lg">R$</span>
                                    <input type="number" step="0.01" id="finalPrice" value="${safePrice}" class="w-full pl-10 p-3 bg-indigo-50 border border-indigo-200 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none font-black text-xl text-indigo-800 shadow-inner" required placeholder="0.00">
                                </div>
                                <p id="discountIndicator" class="absolute right-0 -top-5 text-[10px] font-bold text-white bg-red-500 px-2 py-0.5 rounded shadow-sm hidden">0% OFF</p>
                            </div>
                            
                            <div>
                                <label class="block text-[9px] font-bold text-slate-500 uppercase mb-1">Comissão (%)</label>
                                <input type="number" id="commissionRate" value="${safeCommission}" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none font-black text-sm text-slate-700 shadow-inner" placeholder="Ex: 10">
                            </div>

                            <div>
                                <label class="block text-[9px] font-bold text-slate-500 uppercase mb-1" title="Prazo para usar os itens após a compra">Validade (Dias)</label>
                                <div class="relative">
                                    <input type="number" id="validityDays" value="${safeValidity}" class="w-full p-3 pr-10 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none font-black text-sm text-slate-700 shadow-inner" placeholder="Vitalício">
                                    <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-[9px] font-bold text-slate-400 uppercase">Dias</span>
                                </div>
                            </div>
                        </div>

                        <div class="border-t border-slate-100 pt-4 mt-2">
                            <p class="text-[9px] font-bold text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-1"><i class="bi bi-lightning-charge"></i> Gatilhos de Venda (Opcional)</p>
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                                <div>
                                    <label class="block text-[9px] font-bold text-slate-500 uppercase mb-1">Início da Venda</label>
                                    <input type="date" id="sellStartDate" value="${sellStartDate}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none text-[10px] font-bold text-slate-700 shadow-inner">
                                </div>
                                <div>
                                    <label class="block text-[9px] font-bold text-slate-500 uppercase mb-1">Fim da Venda</label>
                                    <input type="date" id="sellEndDate" value="${sellEndDate}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none text-[10px] font-bold text-slate-700 shadow-inner">
                                </div>
                                <div class="col-span-2 md:col-span-1">
                                    <label class="block text-[9px] font-bold text-slate-500 uppercase mb-1">Limite de Estoque</label>
                                    <input type="number" id="salesLimit" value="${salesLimit}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none font-black text-slate-700 text-xs shadow-inner" placeholder="Qtd máxima">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </div>

        <footer class="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.1)] w-full flex-shrink-0 z-50 flex gap-3">
            <button data-action="save-package" class="w-full py-4 bg-indigo-600 text-white font-black text-sm rounded-xl hover:bg-indigo-700 shadow-md transition-transform active:scale-95 uppercase tracking-wider flex justify-center items-center gap-2">
                <i class="bi bi-save2 text-lg"></i> Salvar Pacote
            </button>
        </footer>
    `;

    renderSelectedItems();
}

function renderItemSelectorView() {
    localState.viewMode = 'select-item';
    const detailContainer = document.getElementById('packages-layout-detail');
    if (!detailContainer) return;

    const mobileHeaderHTML = `
        <div class="p-4 border-b border-slate-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50">
            <button data-action="back-to-editor" class="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 shadow-inner transition-transform active:scale-95">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            <h3 class="font-black text-base text-slate-800 ml-4 uppercase tracking-wider">Catálogo</h3>
        </div>
    `;

    detailContainer.innerHTML = `
        ${mobileHeaderHTML}
        <div class="flex-grow overflow-y-auto p-3 md:p-6 custom-scrollbar bg-slate-50/50 flex flex-col">
            <div class="relative mb-4 flex-shrink-0 max-w-3xl mx-auto w-full">
                <i class="bi bi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg"></i>
                <input type="search" id="item-search-input" placeholder="Pesquisar produto ou serviço..." class="w-full pl-12 p-3.5 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-white transition-colors shadow-sm font-bold text-slate-700">
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow overflow-y-auto max-w-3xl mx-auto w-full pb-8">
                <div class="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                    <h4 class="font-black mb-3 text-center text-[10px] uppercase tracking-widest text-indigo-600 bg-indigo-50 py-2 rounded-xl border border-indigo-100"><i class="bi bi-scissors mr-1"></i> Serviços</h4>
                    <div id="catalog-service-list" class="space-y-2 flex-grow overflow-y-auto custom-scrollbar pr-1"></div>
                </div>
                <div class="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                    <h4 class="font-black mb-3 text-center text-[10px] uppercase tracking-widest text-emerald-600 bg-emerald-50 py-2 rounded-xl border border-emerald-100"><i class="bi bi-box-seam mr-1"></i> Produtos</h4>
                    <div id="catalog-product-list" class="space-y-2 flex-grow overflow-y-auto custom-scrollbar pr-1"></div>
                </div>
            </div>
        </div>
    `;

    const filterAndRender = (term = '') => {
        const lowerTerm = term.toLowerCase();
        const icons = {
            service: '<i class="bi bi-scissors text-indigo-600"></i>',
            product: '<i class="bi bi-box-seam text-emerald-600"></i>'
        };
        const lists = {
            'catalog-service-list': { items: localState.catalogForModal.services, type: 'service' },
            'catalog-product-list': { items: localState.catalogForModal.products, type: 'product' }
        };
        
        Object.entries(lists).forEach(([id, { items, type }]) => {
            const el = detailContainer.querySelector('#' + id);
            if (!el) return;
            const filtered = items.filter(i => i.name.toLowerCase().includes(lowerTerm)).slice(0, 50);
            
            const typeBg = type === 'service' ? 'hover:border-indigo-300 hover:bg-indigo-50/50' : 'hover:border-emerald-300 hover:bg-emerald-50/50';
            const iconBg = type === 'service' ? 'bg-indigo-100 border-indigo-200' : 'bg-emerald-100 border-emerald-200';

            el.innerHTML = filtered.map(item => {
                if (!item.id) return '';
                
                return `
                <button data-action="select-catalog-item" data-item-type="${type}" data-item-id="${item.id}" class="flex items-center gap-3 w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl ${typeBg} shadow-sm transition-all text-left group active:scale-95">
                    <div class="flex-shrink-0 w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center text-base border group-hover:scale-105 transition-transform">${icons[type]}</div>
                    <div class="flex-grow min-w-0">
                        <span class="block text-xs font-bold text-slate-800 truncate">${escapeHTML(item.name)}</span>
                        <span class="block font-black text-[10px] text-slate-500 mt-0.5">${formatCurrency(item.price)}</span>
                    </div>
                    <i class="bi bi-plus-circle-fill text-indigo-500 text-lg opacity-20 group-hover:opacity-100 transition-opacity pr-1"></i>
                </button>
            `}).join('') || `<p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center py-6 border border-dashed border-slate-200 rounded-xl">Vazio</p>`;
        });
    };

    filterAndRender(); 
    const searchInput = detailContainer.querySelector('#item-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => { filterAndRender(e.target.value); }, 300));
        setTimeout(() => searchInput.focus(), 100);
    }
}

// --- 5. EVENT LISTENERS PRINCIPAIS ---

function setupEventListeners() {
    if (pageEventListener) {
        contentDiv.removeEventListener('click', pageEventListener);
        contentDiv.removeEventListener('input', pageEventListener);
        contentDiv.removeEventListener('change', pageEventListener);
    }

    pageEventListener = async (e) => {
        // Intercepta deleções para manter o bubble
        const deleteButton = e.target.closest('[data-action="delete-package"]');
        if (deleteButton) {
             e.stopPropagation();
             e.preventDefault();
             const pkgId = deleteButton.dataset.id;
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
             return;
        }

        const target = e.target.closest('[data-action]');
        if (!target) return;

        const action = target.dataset.action;
        
        switch (action) {
            case 'new-package':
                openPackageEditor(null);
                break;
            case 'edit-package':
                const pkgIdToEdit = target.dataset.id;
                const pkgToEdit = localState.allPackages.find(p => p.id === pkgIdToEdit);
                if(pkgToEdit) openPackageEditor(pkgToEdit);
                break;
            case 'back-to-main':
                hideMobileDetail();
                localState.viewMode = 'list';
                localState.tempPackage = null;
                break;
            case 'add-item-to-package-btn':
                renderItemSelectorView();
                break;
            case 'back-to-editor':
                renderPackageEditorView();
                break;
            case 'select-catalog-item':
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

    // Delegação global para inputs do Form e Buscas
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
        if (e.target.classList.contains('est-filter-checkbox') && e.target.closest('#establishment-filters-container')) {
            const label = e.target.closest('label');
            if (e.target.checked) {
                localState.filterEstablishmentIds.add(e.target.value);
                label.classList.add('border-indigo-500', 'ring-1', 'ring-indigo-500', 'bg-indigo-50/20', 'text-indigo-700');
                label.classList.remove('border-slate-200', 'text-slate-600');
            } else {
                localState.filterEstablishmentIds.delete(e.target.value);
                label.classList.remove('border-indigo-500', 'ring-1', 'ring-indigo-500', 'bg-indigo-50/20', 'text-indigo-700');
                label.classList.add('border-slate-200', 'text-slate-600');
            }
            fetchAndDisplayData(); 
        }
    });

    const exportBtn = document.getElementById('export-excel-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', handleExportExcel);
    }
    
    // Delegação para remover items do pacote
    contentDiv.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.remove-item-btn');
        if (removeBtn && localState.viewMode === 'edit-package') {
            const index = parseInt(removeBtn.dataset.index, 10);
            localState.tempPackage.items.splice(index, 1);
            renderSelectedItems();
        }
    });
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
        establishmentId: selectedEsts[0] // Mantido por compatibilidade com APIs mais antigas
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