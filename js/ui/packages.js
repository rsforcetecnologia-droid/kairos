// js/ui/packages.js

// --- 1. IMPORTAÇÕES ---
import * as packagesApi from '../api/packages.js';
import * as servicesApi from '../api/services.js';
import * as productsApi from '../api/products.js'; 
import { getHierarchy } from '../api/establishments.js'; 
import { state } from '../state.js';
import { showNotification, showConfirmation, showGenericModal } from '../components/modal.js';
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
    statusFilter: 'all' // 'all', 'active', 'inactive'
};
let pageEventListener = null;
let modalEventListener = null; 

// --- 2. FUNÇÕES AUXILIARES ---

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

// --- 3. RENDERIZAÇÃO DA PÁGINA PRINCIPAL ---

export async function loadPackagesPage() {
    // Carrega as filiais do utilizador
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
        // Busca os pacotes de todas as unidades selecionadas
        const fetchPromises = Array.from(localState.filterEstablishmentIds).map(id => packagesApi.getPackages(id).catch(() => []));
        const results = await Promise.all(fetchPromises);
        
        // Achata o array e remove pacotes duplicados (caso o mesmo pacote esteja em mais de 1 unidade filtrada)
        const uniquePackagesMap = new Map();
        results.flat().forEach(pkg => {
            if (!uniquePackagesMap.has(pkg.id)) {
                uniquePackagesMap.set(pkg.id, pkg);
            }
        });
        localState.allPackages = Array.from(uniquePackagesMap.values());

        // Busca serviços e produtos para o Modal de Criação (Baseado na unidade logada)
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
                    <p>Erro ao carregar os pacotes. Tente novamente.</p>
                </div>
            `;
        }
    }
}

function renderBaseLayout() {
    const estCheckboxes = localState.establishments.map(est => `
        <label class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border ${localState.filterEstablishmentIds.has(est.id) ? 'border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/20 text-indigo-700' : 'border-slate-200 text-slate-600'} rounded-lg cursor-pointer hover:bg-slate-50 transition-all shadow-sm est-label select-none">
            <input type="checkbox" class="est-filter-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3 h-3" value="${est.id}" ${localState.filterEstablishmentIds.has(est.id) ? 'checked' : ''}>
            <span class="text-[10px] font-bold whitespace-nowrap">${est.type === 'Matriz' ? '<i class="bi bi-building mr-1"></i>' : '<i class="bi bi-shop mr-1"></i>'} ${est.name}</span>
        </label>
    `).join('');

    contentDiv.innerHTML = `
        <section class="h-full flex flex-col p-3 md:p-6 w-full bg-slate-50 relative">
            
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <div class="relative w-full md:w-96">
                    <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
                    <input type="text" id="search-packages" placeholder="Buscar pacotes..." class="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm font-medium text-slate-700">
                </div>
                
                <div class="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    <select id="filter-status" class="flex-1 md:flex-none py-2 px-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-bold text-slate-700 shadow-sm cursor-pointer h-10">
                        <option value="all">Todos os Status</option>
                        <option value="active">Apenas Ativos</option>
                        <option value="inactive">Apenas Inativos</option>
                    </select>
                    <button id="export-excel-btn" class="py-2 px-3 bg-white border border-slate-300 text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition shadow-sm flex items-center justify-center gap-2 text-xs h-10">
                        <i class="bi bi-file-earmark-excel-fill text-base"></i> <span class="hidden md:inline">Exportar Excel</span>
                    </button>
                    <button data-action="new-package" class="flex-1 md:flex-none py-2 px-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-200 flex items-center justify-center gap-2 text-xs h-10">
                        <i class="bi bi-plus-lg"></i> Novo Pacote
                    </button>
                </div>
            </div>

            ${localState.establishments.length > 1 ? `
            <div class="mb-4">
                <div class="flex flex-wrap gap-2" id="establishment-filters-container">
                    ${estCheckboxes}
                </div>
            </div>
            ` : ''}

            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6" id="kpi-container"></div>

            <div id="packagesListContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-20"></div>
            
        </section>
    `;
}

function renderKPIs() {
    const kpis = calculateKPIs();
    const container = document.getElementById('kpi-container');
    if (!container) return;

    container.innerHTML = `
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group">
            <div class="absolute right-[-10px] top-[-10px] opacity-5 group-hover:opacity-10 transition-opacity"><i class="bi bi-box-seam text-6xl"></i></div>
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest z-10">Total de Pacotes</span>
            <span class="text-2xl font-black text-slate-800 mt-1 z-10">${kpis.total}</span>
        </div>
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group">
            <div class="absolute right-[-10px] top-[-10px] opacity-5 group-hover:opacity-10 transition-opacity"><i class="bi bi-check-circle text-6xl"></i></div>
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest z-10">Pacotes Ativos</span>
            <span class="text-2xl font-black text-emerald-600 mt-1 z-10">${kpis.activeCount}</span>
        </div>
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group">
            <div class="absolute right-[-10px] top-[-10px] opacity-5 group-hover:opacity-10 transition-opacity"><i class="bi bi-tags text-6xl"></i></div>
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest z-10">Maior Desconto</span>
            <span class="text-2xl font-black text-red-500 mt-1 z-10">${kpis.maxDiscount.toFixed(0)}% OFF</span>
        </div>
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group">
            <div class="absolute right-[-10px] top-[-10px] opacity-5 group-hover:opacity-10 transition-opacity"><i class="bi bi-graph-up-arrow text-6xl"></i></div>
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest z-10">Ticket Médio</span>
            <span class="text-2xl font-black text-indigo-600 mt-1 z-10">${formatCurrency(kpis.avgPrice)}</span>
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
            <div class="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <i class="bi bi-box2 text-3xl text-slate-300"></i>
                </div>
                <h3 class="text-base font-bold text-slate-700 mb-1">Nenhum pacote encontrado</h3>
                <p class="text-xs text-slate-500 mb-4 max-w-sm text-center">Não existem pacotes com os filtros selecionados.</p>
                <button data-action="new-package" class="px-5 py-2.5 bg-indigo-50 text-indigo-700 font-bold rounded-xl hover:bg-indigo-100 transition-colors text-sm">
                    <i class="bi bi-plus-lg mr-1"></i> Criar Pacote
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
        const packageDataString = JSON.stringify(pkg).replace(/'/g, "&apos;");
        const itemsCount = (pkg.items || []).reduce((acc, i) => acc + (i.quantity || 1), 0);

        const validityStr = pkg.validityDays ? `${pkg.validityDays} dias p/ uso` : 'Uso vitalício';
        const promoDateStr = pkg.sellEndDate ? `Até ${new Date(pkg.sellEndDate).toLocaleDateString('pt-BR')}` : 'Venda contínua';
        
        // Identificação de Múltiplas Unidades
        const pkgEstIds = pkg.establishmentIds || (pkg.establishmentId ? [pkg.establishmentId] : []);
        let estBadge = '';
        
        if (pkgEstIds.length === 1) {
            const estObj = estMap.get(pkgEstIds[0]);
            if (estObj) {
                const estIcon = estObj.type === 'Matriz' ? 'bi-building' : 'bi-shop';
                estBadge = `<span class="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold border border-slate-200 flex items-center w-max" title="${estObj.name}"><i class="bi ${estIcon} mr-1 opacity-50"></i> ${estObj.name}</span>`;
            }
        } else if (pkgEstIds.length > 1) {
            const names = pkgEstIds.map(id => estMap.get(id)?.name).filter(Boolean).join(', ');
            estBadge = `<span class="text-[9px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 font-bold border border-indigo-100 flex items-center w-max cursor-help" title="${names}"><i class="bi bi-buildings mr-1 opacity-50"></i> ${pkgEstIds.length} Unidades</span>`;
        }

        return `
            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-300 flex flex-col relative overflow-hidden group cursor-pointer"
                 data-action="edit-package" data-package='${packageDataString}'>
                
                ${discountPercent > 0 ? `<div class="absolute -right-8 top-4 bg-red-500 text-white text-[10px] font-black uppercase tracking-wider py-1 px-8 transform rotate-45 shadow-sm z-10">${discountPercent.toFixed(0)}% OFF</div>` : ''}

                <div class="p-5 flex-grow">
                    <div class="flex justify-between items-start pr-8 mb-3">
                        <div class="flex flex-col gap-1.5">
                            <div class="flex items-center gap-2">
                                <span class="w-2.5 h-2.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-slate-300'}"></span>
                                <span class="text-[10px] font-bold ${isActive ? 'text-emerald-600' : 'text-slate-500'} uppercase tracking-widest">${isActive ? 'Ativo' : 'Inativo'}</span>
                            </div>
                            ${estBadge}
                        </div>
                    </div>
                    
                    <h3 class="text-lg font-black text-slate-800 leading-tight line-clamp-1 mb-1" title="${safeName}">${safeName}</h3>
                    <p class="text-xs text-slate-500 line-clamp-2 min-h-[2rem] mb-4">${safeDesc}</p>

                    <div class="bg-slate-50 rounded-xl p-3 mb-4 border border-slate-100">
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-[10px] font-bold text-slate-400 uppercase">Conteúdo</span>
                            <span class="text-xs font-black text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md">${itemsCount} Itens</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-[10px] font-bold text-slate-400 uppercase">Validade</span>
                            <span class="text-[10px] font-semibold text-slate-700"><i class="bi bi-clock-history mr-1 opacity-50"></i>${validityStr}</span>
                        </div>
                    </div>

                    <div class="flex justify-between items-end">
                        <div>
                            ${discountPercent > 0 ? `<p class="text-[10px] text-slate-400 font-bold line-through mb-0.5">De ${formatCurrency(originalPrice)}</p>` : ''}
                            <p class="text-2xl font-black text-slate-900 leading-none">${formatCurrency(finalPrice)}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"><i class="bi bi-calendar-event mr-1"></i>${promoDateStr}</p>
                        </div>
                    </div>
                </div>
                
                <div class="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span class="text-[10px] font-bold text-indigo-600 flex items-center gap-1"><i class="bi bi-pencil-square"></i> Editar Pacote</span>
                    <button data-action="delete-package" data-id="${pkg.id}" data-action-stop-propagation="true" class="text-[10px] font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2 py-1 rounded transition-colors">
                        <i class="bi bi-trash3"></i> Excluir
                    </button>
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

// --- 5. FLUXO DO MODAL (CRIAR/EDITAR) ---

function closePackageModal() {
    const modal = document.getElementById('genericModal');
    modal.style.display = 'none';
    if (modalEventListener) {
        modal.removeEventListener('click', modalEventListener);
    }
}

async function openPackageModal(pkg = null) {
    const modal = document.getElementById('genericModal'); 
    const isEditing = !!pkg;
    const itemsInPackage = pkg ? JSON.parse(JSON.stringify(pkg.items || [])) : [];

    const safeName = escapeHTML(pkg?.name || '');
    const safeDesc = escapeHTML(pkg?.description || '');
    const safePrice = pkg?.price || '';
    const safeCommission = pkg?.commissionRate || 0;
    const safeValidity = pkg?.validityDays || '';
    const sellStartDate = pkg?.sellStartDate ? new Date(pkg.sellStartDate).toISOString().split('T')[0] : '';
    const sellEndDate = pkg?.sellEndDate ? new Date(pkg.sellEndDate).toISOString().split('T')[0] : '';
    const salesLimit = pkg?.salesLimit || '';
    
    // Tratamento para pacotes que possuam ID único legado ou array moderno
    const currentEstIds = pkg?.establishmentIds || (pkg?.establishmentId ? [pkg.establishmentId] : [state.establishmentId]);

    const estCheckboxesHTML = localState.establishments.map(est => `
        <label class="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors cursor-pointer group">
            <input type="checkbox" class="modal-est-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4" value="${est.id}" ${currentEstIds.includes(est.id) ? 'checked' : ''}>
            <span class="text-xs font-semibold text-slate-700 truncate group-hover:text-indigo-700" title="${est.name}">${est.type === 'Matriz' ? '🏢' : '📍'} ${est.name}</span>
        </label>
    `).join('');

    const contentHTML = `
        <div class="modal-content max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <header class="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center text-lg shadow-sm">
                        <i class="bi ${isEditing ? 'bi-pencil-square' : 'bi-box2-heart'}"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-black text-slate-800 tracking-tight">${isEditing ? 'Editar Pacote' : 'Novo Pacote Promocional'}</h2>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Configuração de Venda</p>
                    </div>
                </div>
                <button type="button" data-action="close-modal" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500 transition-colors">
                    <i class="bi bi-x-lg"></i>
                </button>
            </header>

            <form id="package-form" class="flex-1 overflow-y-auto p-5 custom-scrollbar space-y-6 bg-slate-50/30">
                <input type="hidden" id="packageId" value="${pkg?.id || ''}">
                
                <div>
                    <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2"><i class="bi bi-info-circle text-indigo-400"></i> Detalhes Básicos</h3>
                    <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div class="md:col-span-3">
                                <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Nome Comercial do Pacote *</label>
                                <input type="text" id="packageName" value="${safeName}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-slate-800 text-sm" placeholder="Ex: Combo Verão, Especial Noivas..." required>
                            </div>
                            <div class="md:col-span-1">
                                <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Status</label>
                                <select id="packageStatus" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-slate-800 text-sm">
                                    <option value="active" ${pkg?.status !== 'inactive' ? 'selected' : ''}>Ativo (Disponível)</option>
                                    <option value="inactive" ${pkg?.status === 'inactive' ? 'selected' : ''}>Inativo (Pausado)</option>
                                </select>
                            </div>
                            
                            <div class="md:col-span-4 mt-1 border-t border-slate-100 pt-3">
                                <div class="flex justify-between items-center mb-2">
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase">Unidades Disponíveis *</label>
                                    <button type="button" data-action="toggle-all-ests" class="text-[9px] font-bold text-indigo-500 hover:text-indigo-700 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded">Selecionar Todas</button>
                                </div>
                                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto custom-scrollbar p-1">
                                    ${estCheckboxesHTML}
                                </div>
                            </div>
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Descrição para o Cliente (Opcional)</label>
                            <textarea id="packageDescription" rows="2" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm text-slate-700 resize-none" placeholder="Descreva os benefícios e condições do pacote...">${safeDesc}</textarea>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="flex justify-between items-center mb-3">
                        <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><i class="bi bi-layers text-indigo-400"></i> Composição do Pacote</h3>
                        <button type="button" id="add-item-to-package-btn" class="py-1.5 px-3 bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold rounded-lg text-xs hover:bg-indigo-100 transition shadow-sm flex items-center gap-1">
                            <i class="bi bi-plus-circle"></i> Inserir Serviço/Produto
                        </button>
                    </div>
                    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div id="package-items-list" class="max-h-60 overflow-y-auto custom-scrollbar bg-slate-50/50 p-2 min-h-[5rem] space-y-2">
                            </div>
                        <div class="bg-slate-100 p-3 border-t border-slate-200 flex justify-between items-center">
                            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Soma Original dos Itens</span>
                            <span id="originalPrice" class="text-base font-black text-slate-700">R$ 0,00</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2"><i class="bi bi-currency-dollar text-indigo-400"></i> Precificação e Regras de Venda</h3>
                    <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div class="md:col-span-2 relative">
                                <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Preço Final do Pacote *</label>
                                <div class="relative">
                                    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-600 font-black">R$</span>
                                    <input type="number" step="0.01" id="finalPrice" value="${safePrice}" class="w-full pl-10 p-3 bg-indigo-50/30 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-black text-lg text-indigo-700 transition-colors" required placeholder="0.00">
                                </div>
                                <p id="discountIndicator" class="absolute right-0 -top-5 text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded hidden">0% OFF</p>
                            </div>
                            
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Comissão Base (%)</label>
                                <input type="number" id="commissionRate" value="${safeCommission}" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700" placeholder="Ex: 10">
                            </div>

                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1" title="Prazo para o cliente usar os itens após a compra">Validade de Uso</label>
                                <div class="relative">
                                    <input type="number" id="validityDays" value="${safeValidity}" class="w-full p-3 pr-12 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700" placeholder="Vitalício">
                                    <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-[10px] font-bold text-slate-400">Dias</span>
                                </div>
                            </div>
                        </div>

                        <div class="border-t border-slate-100 pt-4 mt-2">
                            <p class="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-1"><i class="bi bi-lightning-charge"></i> Gatilhos Promocionais de Venda (Opcionais)</p>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Vender a partir de</label>
                                    <input type="date" id="sellStartDate" value="${sellStartDate}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-xs font-semibold text-slate-700">
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Vender até</label>
                                    <input type="date" id="sellEndDate" value="${sellEndDate}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-xs font-semibold text-slate-700">
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Limite de Estoque</label>
                                    <input type="number" id="salesLimit" value="${salesLimit}" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700 text-sm" placeholder="Qtd máxima">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
            <footer class="p-4 border-t border-slate-200 bg-white flex justify-end gap-3 z-10 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
                <button type="button" data-action="close-modal" class="py-2.5 px-5 bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-200 transition-colors">Cancelar</button>
                <button type="button" data-action="save-package" class="py-2.5 px-6 bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all flex items-center gap-2">
                    <i class="bi bi-save2"></i> Salvar Pacote
                </button>
            </footer>
        </div>
    `;

    modal.innerHTML = contentHTML;
    modal.style.display = 'flex';

    const itemsListContainer = modal.querySelector('#package-items-list');
    const finalPriceInput = modal.querySelector('#finalPrice');
    const discountIndicator = modal.querySelector('#discountIndicator');
    
    const calculateAndShowDiscount = (items) => {
        const originalPrice = items.reduce((acc, s) => acc + ((s.price || 0) * (s.quantity || 1)), 0);
        const finalPrice = parseFloat(finalPriceInput.value) || 0;
        
        modal.querySelector('#originalPrice').textContent = formatCurrency(originalPrice);

        if (originalPrice > 0 && originalPrice > finalPrice && finalPrice > 0) {
            const discount = ((originalPrice - finalPrice) / originalPrice) * 100;
            discountIndicator.textContent = `${discount.toFixed(0)}% OFF`;
            discountIndicator.classList.remove('hidden');
        } else {
            discountIndicator.classList.add('hidden');
        }
    };
    
    const renderSelectedItems = (items) => {
        if (items.length === 0) {
            itemsListContainer.innerHTML = `
                <div class="text-center py-6 text-slate-400 flex flex-col items-center">
                    <i class="bi bi-inbox text-2xl mb-1 opacity-50"></i>
                    <p class="text-[10px] font-bold uppercase tracking-widest">Nenhum item adicionado</p>
                </div>`;
        } else {
            itemsListContainer.innerHTML = items.map((item, index) => {
                const isService = item.type === 'service';
                const typeIcon = isService ? 'bi-scissors' : 'bi-box';
                const typeBg = isService ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-emerald-100 text-emerald-700 border-emerald-200';

                return `
                <div class="flex items-center justify-between bg-white p-2 rounded-xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors animate-fade-in-fast">
                    <div class="flex items-center gap-3 min-w-0 flex-1">
                        <div class="flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
                            <span class="text-[8px] font-bold text-slate-400 uppercase leading-none mb-0.5">Qtd</span>
                            <input type="number" value="${item.quantity}" min="1" class="w-10 text-center bg-transparent text-sm font-black text-slate-700 outline-none quantity-input" data-index="${index}">
                        </div>
                        <div class="min-w-0">
                            <div class="flex items-center gap-1.5 mb-0.5">
                                <span class="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${typeBg} flex items-center gap-1"><i class="bi ${typeIcon}"></i> ${isService ? 'Serviço' : 'Produto'}</span>
                            </div>
                            <p class="font-bold text-slate-800 text-sm truncate leading-tight">${escapeHTML(item.name)}</p>
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
        calculateAndShowDiscount(items);
    };

    renderSelectedItems(itemsInPackage);

    itemsListContainer.addEventListener('change', (e) => {
        if (e.target.classList.contains('quantity-input')) {
            const index = parseInt(e.target.dataset.index, 10);
            const newQuantity = parseInt(e.target.value, 10);
            if (newQuantity > 0 && itemsInPackage[index]) {
                itemsInPackage[index].quantity = newQuantity;
                renderSelectedItems(itemsInPackage);
            }
        }
    });

    itemsListContainer.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.remove-item-btn');
        if (removeBtn) {
            const index = parseInt(removeBtn.dataset.index, 10);
            itemsInPackage.splice(index, 1);
            renderSelectedItems(itemsInPackage);
        }
    });

    finalPriceInput.addEventListener('input', () => {
        calculateAndShowDiscount(itemsInPackage);
    });
    
    modal.querySelector('#add-item-to-package-btn').onclick = () => openItemSelectionModal((selectedItem) => {
        const existing = itemsInPackage.find(s => s.id === selectedItem.id && s.type === selectedItem.type);
        if (existing) {
            existing.quantity++;
        } else {
            itemsInPackage.push({ ...selectedItem, quantity: 1 });
        }
        renderSelectedItems(itemsInPackage);
    });

    if (modalEventListener) {
        modal.removeEventListener('click', modalEventListener);
    }

    modalEventListener = async (e) => {
        const button = e.target.closest('button[data-action]');
        if (!button) return;

        const action = button.dataset.action;
        e.stopPropagation();

        if (action === 'close-modal') {
            closePackageModal();
        }

        if (action === 'toggle-all-ests') {
            const checkboxes = document.querySelectorAll('.modal-est-checkbox');
            const allChecked = Array.from(checkboxes).every(c => c.checked);
            checkboxes.forEach(c => c.checked = !allChecked);
        }

        if (action === 'save-package') {
            const saveButton = button;
            
            const selectedEsts = Array.from(document.querySelectorAll('.modal-est-checkbox:checked')).map(cb => cb.value);
            if (selectedEsts.length === 0) {
                showNotification('Atenção', 'Selecione pelo menos uma unidade para o pacote.', 'warning');
                return;
            }

            const originalPrice = itemsInPackage.reduce((acc, s) => acc + (s.price * s.quantity), 0);
            
            const data = {
                id: document.getElementById('packageId').value || null,
                name: document.getElementById('packageName').value,
                description: document.getElementById('packageDescription').value,
                status: document.getElementById('packageStatus').value,
                items: itemsInPackage, 
                originalPrice: originalPrice,
                price: parseFloat(document.getElementById('finalPrice').value),
                commissionRate: parseFloat(document.getElementById('commissionRate').value) || 0,
                validityDays: parseInt(document.getElementById('validityDays').value, 10) || null,
                sellStartDate: document.getElementById('sellStartDate').value || null,
                sellEndDate: document.getElementById('sellEndDate').value || null,
                salesLimit: parseInt(document.getElementById('salesLimit').value, 10) || null,
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
                closePackageModal();
                await fetchAndDisplayData(); 
            } catch (error) {
                showNotification('Erro', `Não foi possível salvar o pacote: ${error.message}`, 'error');
                saveButton.disabled = false;
                saveButton.innerHTML = '<i class="bi bi-save2"></i> Salvar Pacote';
            }
        }
    };
    
    modal.addEventListener('click', modalEventListener);
}

// --- SUB-MODAL DE SELEÇÃO DE ITENS ---
function openItemSelectionModal(onSelect) {
    let searchTerm = '';

    const modalContainer = document.createElement('div');
    modalContainer.id = 'item-selection-modal';
    modalContainer.className = 'fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[110] p-4 animate-fade-in-fast';

    const renderLists = (listContainer) => {
        const term = searchTerm.toLowerCase();
        
        const services = localState.catalogForModal.services.filter(s => s.name.toLowerCase().includes(term));
        const products = localState.catalogForModal.products.filter(p => p.name.toLowerCase().includes(term));

        const servicesHTML = services.map(item => `
            <button data-action="select-item" data-item-type="service" data-item-id="${item.id}" class="flex items-center gap-3 w-full p-2 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all text-left group">
                <div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"><i class="bi bi-scissors"></i></div>
                <div class="flex-grow min-w-0">
                    <p class="font-bold text-xs text-slate-800 truncate">${escapeHTML(item.name)}</p>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${formatCurrency(item.price)}</p>
                </div>
                <i class="bi bi-plus-circle text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"></i>
            </button>
        `).join('') || `<p class="text-xs text-slate-400 text-center p-4">Nenhum serviço encontrado.</p>`;
        
        const productsHTML = products.map(item => `
            <button data-action="select-item" data-item-type="product" data-item-id="${item.id}" class="flex items-center gap-3 w-full p-2 bg-white border border-slate-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all text-left group">
                <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"><i class="bi bi-box"></i></div>
                <div class="flex-grow min-w-0">
                    <p class="font-bold text-xs text-slate-800 truncate">${escapeHTML(item.name)}</p>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${formatCurrency(item.price)}</p>
                </div>
                <i class="bi bi-plus-circle text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></i>
            </button>
        `).join('') || `<p class="text-xs text-slate-400 text-center p-4">Nenhum produto encontrado.</p>`;

        listContainer.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-100 pb-1">Serviços</h4>
                    <div id="modal-service-list" class="space-y-2 max-h-72 overflow-y-auto custom-scrollbar pr-1">${servicesHTML}</div>
                </div>
                <div>
                    <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-100 pb-1">Produtos</h4>
                    <div id="modal-product-list" class="space-y-2 max-h-72 overflow-y-auto custom-scrollbar pr-1">${productsHTML}</div>
                </div>
            </div>
        `;
    };

    modalContainer.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[85vh] overflow-hidden transform scale-100">
            <header class="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 class="text-base font-black text-slate-800">Selecione o Item para o Pacote</h2>
                <button data-action="close-selection-modal" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500 transition-colors"><i class="bi bi-x-lg"></i></button>
            </header>
            <div class="p-4 border-b border-slate-100 bg-white">
                <div class="relative">
                    <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
                    <input type="search" id="item-search-input" placeholder="Procurar serviço ou produto..." class="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm text-slate-700">
                </div>
            </div>
            <div id="item-selection-list" class="flex-1 overflow-y-auto p-4 custom-scrollbar bg-slate-50/30">
            </div>
        </div>
    `;

    document.body.appendChild(modalContainer);

    const listContainer = modalContainer.querySelector('#item-selection-list');
    const searchInput = modalContainer.querySelector('#item-search-input');
    
    const closeThisModal = () => {
        modalContainer.classList.add('opacity-0');
        setTimeout(() => modalContainer.remove(), 200);
    };

    renderLists(listContainer);
    setTimeout(() => searchInput.focus(), 100);
    
    searchInput.addEventListener('input', () => {
        searchTerm = searchInput.value;
        renderLists(listContainer);
    });

    modalContainer.addEventListener('click', (e) => {
        const selectBtn = e.target.closest('[data-action="select-item"]');
        const closeButton = e.target.closest('[data-action="close-selection-modal"]');
        
        if (selectBtn) {
            const { itemType, itemId } = selectBtn.dataset;
            const catalog = localState.catalogForModal[itemType + 's'] || [];
            const item = catalog.find(i => i.id === itemId);
            if (item) {
                onSelect({ ...item, type: itemType }); 
                closeThisModal();
            }
        } else if (closeButton || e.target === modalContainer) {
            closeThisModal();
        }
    });
}

// --- 5. EVENT LISTENERS PRINCIPAIS ---

function setupEventListeners() {
    if (pageEventListener) {
        contentDiv.removeEventListener('click', pageEventListener);
    }

    pageEventListener = (e) => {
        if (e.target.closest('[data-action-stop-propagation="true"]')) {
            e.stopPropagation();
            const deleteButton = e.target.closest('[data-action="delete-package"]');
            if (deleteButton) {
                 const pkgId = deleteButton.dataset.id;
                 showConfirmation('Excluir Pacote', 'Tem a certeza que deseja excluir este pacote promocional? Esta ação é irreversível.')
                     .then(async (confirmed) => {
                         if (confirmed) {
                             try {
                                 await packagesApi.deletePackage(pkgId);
                                 showNotification('Sucesso!', 'Pacote excluído.', 'success');
                                 await fetchAndDisplayData();
                             } catch (error) {
                                 showNotification('Erro', `Não foi possível excluir: ${error.message}`, 'error');
                             }
                         }
                     });
            }
            return;
        }

        const target = e.target.closest('[data-action="new-package"], [data-action="edit-package"]');
        if (!target) return;

        const action = target.dataset.action;

        if (action === 'new-package') {
            openPackageModal(null); 
        } else if (action === 'edit-package') {
            const pkg = JSON.parse(target.dataset.package);
            openPackageModal(pkg);
        }
    };
    
    contentDiv.addEventListener('click', pageEventListener);

    const searchInput = document.getElementById('search-packages');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            localState.searchQuery = e.target.value;
            renderPackagesList();
        });
    }

    const filterStatus = document.getElementById('filter-status');
    if (filterStatus) {
        filterStatus.addEventListener('change', (e) => {
            localState.statusFilter = e.target.value;
            renderPackagesList();
        });
    }

    document.querySelectorAll('.est-filter-checkbox').forEach(cb => {
        cb.addEventListener('change', (e) => {
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
        });
    });

    const exportBtn = document.getElementById('export-excel-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', handleExportExcel);
    }
}