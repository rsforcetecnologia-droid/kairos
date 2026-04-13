// js/ui/suppliers.js (Arquitetura ERP: Master-Detail / On-Demand Fetching)

import * as suppliersApi from '../api/suppliers.js';
import { getHierarchy } from '../api/establishments.js';
import { state } from '../state.js';
import { showNotification, showConfirmation } from '../components/modal.js';
import { escapeHTML } from '../utils.js';

const contentDiv = document.getElementById('content');

// ============================================================================
// 📊 ESTADO LOCAL
// ============================================================================
let localState = {
    partners: [],
    establishments: [],
    
    // Filtros Ativos
    searchQuery: '',
    categoryFilter: 'all',
    stateFilter: 'all',
    cityFilter: '',
    sortBy: 'name_asc', // 'name_asc', 'name_desc', 'contact_asc'
    
    // Controlo de Visão e Carregamento
    hasSearched: false, 
    viewMode: 'list', // 'list' ou 'form'
    editingItem: null 
};

let pageEventListener = null;

// Categorias de Parceiros
const partnerCategories = {
    'contas_fixas': { label: 'Contas Fixas (Água, Luz)', color: 'blue', icon: 'bi-lightning-charge' },
    'estoque': { label: 'Fornecedor de Produtos', color: 'emerald', icon: 'bi-box-seam' },
    'servicos': { label: 'Prestador de Serviço', color: 'purple', icon: 'bi-tools' },
    'impostos': { label: 'Governo / Impostos', color: 'red', icon: 'bi-bank' },
    'outros': { label: 'Outros Parceiros', color: 'gray', icon: 'bi-person-vcard' }
};

const brazilStates = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 
    'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

// ============================================================================
// 🚀 INICIALIZAÇÃO
// ============================================================================

export async function loadSuppliersPage() {
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

    // Reseta estado ao entrar na tela
    localState.viewMode = 'list';
    localState.editingItem = null;
    localState.hasSearched = false; 
    localState.partners = [];

    renderBaseLayout();
    setupEventListeners();
    
    // Inicializa com a tela vazia orientando a pesquisa
    renderInitialEmptyState();
}

// ============================================================================
// 🎨 RENDERIZAÇÃO DOS LAYOUTS (LISTA E FORMULÁRIO)
// ============================================================================

function renderBaseLayout() {
    contentDiv.innerHTML = `
        <div class="flex flex-col h-full bg-gray-50 w-full relative min-h-0 overflow-hidden">
            
            <div id="suppliers-list-view" class="w-full h-full flex flex-col transition-all duration-300 ${localState.viewMode === 'list' ? 'flex' : 'hidden'} p-2 md:p-4 md:pl-6 relative">
                
                <div class="flex flex-col md:flex-row justify-between items-center mb-3 gap-3 w-full animate-fade-in">
                    <div></div> <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                        <button data-action="new-partner" class="py-1.5 px-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-sm flex items-center gap-2 text-xs flex-1 md:flex-none justify-center">
                            <i class="bi bi-plus-lg"></i> Novo Parceiro
                        </button>
                    </div>
                </div>

                ${renderListViewFilters()}

                <div class="flex-1 flex flex-col min-h-0 w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in">
                    <div id="partners-grid" class="flex-1 overflow-y-auto custom-scrollbar pb-24 md:pb-2">
                    </div>
                </div>
            </div>

            <div id="suppliers-form-view" class="w-full h-full overflow-y-auto custom-scrollbar transition-all duration-300 ${localState.viewMode === 'form' ? 'block' : 'hidden'} p-2 md:p-4 md:pl-6">
                <div id="form-container-wrapper" class="max-w-4xl mx-auto w-full">
                </div>
            </div>

        </div>
    `;
}

function renderListViewFilters() {
    const categoryOptions = Object.entries(partnerCategories).map(([val, cat]) => `<option value="${val}">${cat.label}</option>`).join('');
    const stateOptions = brazilStates.map(uf => `<option value="${uf}">${uf}</option>`).join('');

    return `
        <div class="flex flex-col md:flex-row items-start md:items-center gap-2 mb-3 w-full animate-fade-in bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
            
            <div class="relative flex-shrink-0 w-full md:w-64">
                <i class="bi bi-search absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                <input type="text" id="filterSearch" placeholder="Nome, CNPJ, Email..." value="${localState.searchQuery}" class="w-full pl-8 p-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all">
            </div>
            
            <div class="flex gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-1 md:pb-0">
                <select id="filterCategory" class="w-full md:w-auto p-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-gray-700 flex-shrink-0">
                    <option value="all">Categorias</option>
                    ${categoryOptions}
                </select>
                
                <select id="filterState" class="w-full md:w-auto p-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-gray-700 flex-shrink-0">
                    <option value="all">Estados</option>
                    ${stateOptions}
                </select>

                <input type="text" id="filterCity" placeholder="Cidade" value="${localState.cityFilter}" class="w-full md:w-32 p-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all flex-shrink-0">
                
                <select id="filterSortBy" class="w-full md:w-auto p-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-gray-700 flex-shrink-0">
                    <option value="name_asc">Nome (A-Z)</option>
                    <option value="name_desc">Nome (Z-A)</option>
                    <option value="contact_asc">Contato</option>
                </select>
            </div>

            <button id="btn-search-partners" class="w-full md:w-auto px-4 py-1.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1.5 text-xs flex-shrink-0 ml-auto">
                <i class="bi bi-search text-[10px]"></i> Buscar
            </button>
        </div>
    `;
}

function renderFormView(item = null) {
    const isEditing = !!item;
    let currentCategory = item?.category || '';
    if (currentCategory === 'Produtos') currentCategory = 'estoque';
    if (currentCategory === 'Serviços') currentCategory = 'servicos';

    const categoryOptions = Object.entries(partnerCategories).map(([val, cat]) => 
        `<option value="${val}" ${currentCategory === val ? 'selected' : ''}>${cat.label}</option>`
    ).join('');

    const stateOptionsForm = brazilStates.map(uf => 
        `<option value="${uf}" ${item?.state === uf ? 'selected' : ''}>${uf}</option>`
    ).join('');

    const wrapper = document.getElementById('form-container-wrapper');
    if (!wrapper) return;

    wrapper.innerHTML = `
        <div class="animate-fade-in-up bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-3">
                <button data-action="back-to-list" class="w-8 h-8 bg-white border border-gray-200 rounded text-gray-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm flex items-center justify-center">
                    <i class="bi bi-arrow-left text-sm"></i>
                </button>
                <div>
                    <h2 class="text-sm font-bold text-gray-800 tracking-tight">${isEditing ? 'Editar Parceiro' : 'Novo Parceiro'}</h2>
                </div>
            </div>

            <form id="partner-form" class="flex flex-col">
                <input type="hidden" id="supId" value="${item?.id || ''}">

                <div class="p-4 space-y-4">
                    
                    <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                        <h3 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5 border-b border-gray-50 pb-1.5"><i class="bi bi-building text-indigo-500"></i> Dados Empresariais</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div class="md:col-span-2">
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Razão Social / Nome *</label>
                                <input type="text" id="supName" required class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none font-semibold text-gray-800 text-xs transition-shadow" value="${escapeHTML(item?.name || '')}" placeholder="Ex: CPFL Energia...">
                            </div>
                            
                            <div>
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Categoria / Tipo *</label>
                                <select id="supCategory" required class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none text-xs font-semibold text-gray-800 transition-shadow">
                                    <option value="">-- Selecione --</option>
                                    ${categoryOptions}
                                </select>
                            </div>

                            <div>
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">CNPJ / CPF</label>
                                <input type="text" id="supTaxId" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none text-xs text-gray-800 transition-shadow" value="${escapeHTML(item?.document || item?.taxId || '')}" placeholder="00.000.000/0001-00">
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                        <h3 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5 border-b border-gray-50 pb-1.5"><i class="bi bi-geo-alt text-indigo-500"></i> Localização</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Estado (UF)</label>
                                <select id="supState" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none text-xs font-semibold text-gray-800 transition-shadow">
                                    <option value="">-- Estado --</option>
                                    ${stateOptionsForm}
                                </select>
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Cidade</label>
                                <input type="text" id="supCity" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none text-xs text-gray-800 transition-shadow" value="${escapeHTML(item?.city || '')}" placeholder="Ex: São Paulo">
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                        <h3 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5 border-b border-gray-50 pb-1.5"><i class="bi bi-person-lines-fill text-indigo-500"></i> Contatos</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div class="md:col-span-2">
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Nome do Contato</label>
                                <input type="text" id="supContact" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none text-xs text-gray-800 transition-shadow" value="${escapeHTML(item?.contactName || '')}" placeholder="Ex: João Silva (Comercial)">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">E-mail</label>
                                <input type="email" id="supEmail" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none text-xs text-gray-800 transition-shadow" value="${escapeHTML(item?.email || '')}" placeholder="contato@empresa.com">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Telefone / WhatsApp</label>
                                <input type="tel" id="supPhone" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none text-xs text-gray-800 transition-shadow" value="${escapeHTML(item?.phone || '')}" placeholder="(00) 0000-0000">
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                        <h3 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5 border-b border-gray-50 pb-1.5"><i class="bi bi-journal-text text-indigo-500"></i> Informações Adicionais</h3>
                        <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Observações (PIX, Dados Bancários)</label>
                        <textarea id="supNotes" rows="2" class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white outline-none text-xs text-gray-800 font-medium resize-none transition-shadow">${item?.notes || ''}</textarea>
                    </div>
                </div>

                <div class="px-4 py-3 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                    ${isEditing ? `
                        <button type="button" data-action="delete-partner" data-id="${item.id}" class="w-full sm:w-auto px-4 py-2 text-red-600 bg-white border border-red-200 rounded-lg font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-1.5 shadow-sm text-xs">
                            <i class="bi bi-trash3 text-[10px]"></i> Excluir
                        </button>
                    ` : `<div></div>`}
                    
                    <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <button type="button" data-action="back-to-list" class="px-5 py-2 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-sm w-full sm:w-auto text-xs">
                            Cancelar
                        </button>
                        <button type="submit" class="px-5 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-sm transition-all active:scale-95 flex items-center justify-center gap-1.5 w-full sm:w-auto text-xs">
                            <i class="bi bi-save2 text-[10px]"></i> ${isEditing ? 'Salvar Alterações' : 'Cadastrar'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    `;

    document.getElementById('partner-form').addEventListener('submit', handleSupplierFormSubmit);
}

function renderInitialEmptyState() {
    const grid = document.getElementById('partners-grid');
    if(grid) {
        grid.innerHTML = `
            <div class="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-xl w-full max-w-2xl mx-auto shadow-sm mt-4">
                <div class="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-3 border border-indigo-100 shadow-inner">
                    <i class="bi bi-search text-xl text-indigo-400"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-800 mb-1">Pronto para pesquisar</h3>
                <p class="text-[10px] text-gray-500 font-medium max-w-sm text-center">Utilize os filtros acima e clique em "Buscar" para listar os parceiros registados no sistema.</p>
            </div>
        `;
    }
}

// ============================================================================
// 📡 COMUNICAÇÃO DE DADOS E RENDERIZAÇÃO DA PLANILHA
// ============================================================================

async function fetchAndDisplayData() {
    const grid = document.getElementById('partners-grid');
    
    if (!localState.hasSearched) {
        renderInitialEmptyState();
        return;
    }

    grid.innerHTML = '<div class="text-center py-16"><div class="loader mx-auto"></div><p class="text-xs text-gray-500 mt-4 font-medium">Buscando parceiros...</p></div>';

    try {
        const partners = await suppliersApi.getAll(state.establishmentId);
        localState.partners = partners || [];
        renderPartnersList();
    } catch (error) {
        grid.innerHTML = `<div class="text-center py-10 text-red-500 text-sm font-bold">Erro ao carregar parceiros: ${error.message}</div>`;
    }
}

function renderPartnersList() {
    const grid = document.getElementById('partners-grid');
    if (!grid) return;

    let filtered = localState.partners;

    // Filtros
    if (localState.searchQuery) {
        const q = localState.searchQuery.toLowerCase();
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(q) || 
            (p.document && p.document.includes(q)) ||
            (p.taxId && p.taxId.includes(q)) ||
            (p.email && p.email.toLowerCase().includes(q)) ||
            (p.contactName && p.contactName.toLowerCase().includes(q))
        );
    }
    if (localState.categoryFilter !== 'all') {
        filtered = filtered.filter(p => p.category === localState.categoryFilter);
    }
    if (localState.stateFilter !== 'all') {
        filtered = filtered.filter(p => p.state === localState.stateFilter);
    }
    if (localState.cityFilter) {
        const c = localState.cityFilter.toLowerCase();
        filtered = filtered.filter(p => p.city && p.city.toLowerCase().includes(c));
    }

    // Ordenação
    filtered.sort((a, b) => {
        let valA = '', valB = '';
        
        if (localState.sortBy === 'name_asc' || localState.sortBy === 'name_desc') {
            valA = (a.name || '').toLowerCase();
            valB = (b.name || '').toLowerCase();
        } else if (localState.sortBy === 'contact_asc') {
            valA = (a.contactName || '').toLowerCase();
            valB = (b.contactName || '').toLowerCase();
        }

        if (localState.sortBy === 'name_desc') {
            return valB.localeCompare(valA);
        }
        return valA.localeCompare(valB);
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="flex flex-col items-center justify-center py-16 bg-white border border-dashed border-gray-300 rounded-xl max-w-2xl mx-auto shadow-sm mt-4">
                <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3 border border-gray-100 shadow-inner">
                    <i class="bi bi-inbox text-xl text-gray-400"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-800 mb-1">Nenhum parceiro encontrado</h3>
                <p class="text-[10px] text-gray-500 font-medium">Os filtros aplicados não retornaram resultados.</p>
            </div>
        `;
        return;
    }

    // --- VISÃO DE PLANILHA (DESKTOP) ---
    let desktopTable = `
        <div class="hidden md:block w-full bg-white">
            <table class="w-full text-left border-collapse">
                <thead class="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                    <tr>
                        <th class="px-3 py-2 text-[9px] font-bold text-gray-500 uppercase tracking-widest w-14 text-center">Tipo</th>
                        <th class="px-3 py-2 text-[9px] font-bold text-gray-500 uppercase tracking-widest">Razão Social / Parceiro</th>
                        <th class="px-3 py-2 text-[9px] font-bold text-gray-500 uppercase tracking-widest">Documento</th>
                        <th class="px-3 py-2 text-[9px] font-bold text-gray-500 uppercase tracking-widest">Contacto / Localização</th>
                        <th class="px-3 py-2 text-[9px] font-bold text-gray-500 uppercase tracking-widest text-center">Ações</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
    `;

    // --- VISÃO DE CARDS (MOBILE) ---
    let mobileCards = `<div class="flex flex-col gap-2 md:hidden p-2">`;

    filtered.forEach(partner => {
        let catKey = partner.category;
        if (catKey === 'Produtos') catKey = 'estoque';
        if (catKey === 'Serviços') catKey = 'servicos';
        const cat = partnerCategories[catKey] || partnerCategories['outros'];
        
        const docText = partner.document || partner.taxId ? partner.document || partner.taxId : '-';
        const partnerDataStr = JSON.stringify(partner).replace(/'/g, "&apos;");

        const locationText = [partner.city, partner.state].filter(Boolean).join(' - ');

        // DESKTOP ROW
        desktopTable += `
            <tr class="hover:bg-gray-50 cursor-pointer transition-colors group" data-action="open-form" data-item='${partnerDataStr}'>
                <td class="px-3 py-2 text-center">
                    <div class="w-8 h-8 mx-auto rounded-lg bg-${cat.color}-100 text-${cat.color}-600 flex items-center justify-center text-sm shadow-sm" title="${cat.label}">
                        <i class="bi ${cat.icon}"></i>
                    </div>
                </td>
                <td class="px-3 py-2">
                    <p class="font-bold text-gray-800 text-xs group-hover:text-indigo-700 transition-colors">${escapeHTML(partner.name)}</p>
                    ${partner.email ? `<p class="text-[9px] text-gray-500 mt-0.5 truncate max-w-[200px]"><i class="bi bi-envelope mr-1 opacity-50"></i>${escapeHTML(partner.email)}</p>` : ''}
                </td>
                <td class="px-3 py-2 text-xs font-medium text-gray-600">${escapeHTML(docText)}</td>
                <td class="px-3 py-2">
                    <div class="text-xs font-medium text-gray-800">${escapeHTML(partner.contactName || '-')}</div>
                    ${locationText ? `<div class="text-[9px] font-bold uppercase tracking-wider text-gray-400 mt-0.5"><i class="bi bi-geo-alt mr-1"></i>${escapeHTML(locationText)}</div>` : ''}
                </td>
                <td class="px-3 py-2 text-center">
                    <button class="w-6 h-6 mx-auto rounded flex items-center justify-center text-gray-400 group-hover:text-indigo-600 group-hover:bg-indigo-100 transition-colors shadow-sm bg-white border border-gray-200 group-hover:border-indigo-200">
                        <i class="bi bi-pencil-fill text-[10px]"></i>
                    </button>
                </td>
            </tr>
        `;

        // MOBILE CARD
        mobileCards += `
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-3 flex flex-col gap-2 active:scale-[0.98] transition-transform cursor-pointer relative overflow-hidden" data-action="open-form" data-item='${partnerDataStr}'>
                <div class="absolute left-0 top-0 bottom-0 w-1 bg-${cat.color}-500"></div>
                <div class="flex gap-3">
                    <div class="w-10 h-10 rounded-lg bg-${cat.color}-100 text-${cat.color}-600 flex items-center justify-center text-lg shadow-sm flex-shrink-0">
                        <i class="bi ${cat.icon}"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">${cat.label.split(' ')[0]}</p>
                        <h3 class="font-bold text-gray-900 text-xs leading-tight truncate">${escapeHTML(partner.name)}</h3>
                    </div>
                </div>
                <div class="bg-gray-50 rounded-lg p-2 border border-gray-100 mt-1 flex flex-col gap-1">
                    <div class="flex justify-between items-center text-[10px]">
                        <span class="text-gray-500 font-medium">Documento:</span>
                        <span class="font-bold text-gray-700">${escapeHTML(docText)}</span>
                    </div>
                    ${locationText ? `
                    <div class="flex justify-between items-center text-[10px]">
                        <span class="text-gray-500 font-medium">Local:</span>
                        <span class="font-bold text-gray-700">${escapeHTML(locationText)}</span>
                    </div>` : ''}
                </div>
            </div>
        `;
    });

    desktopTable += `</tbody></table></div>`;
    mobileCards += `</div>`;

    grid.innerHTML = desktopTable + mobileCards;
}

// ============================================================================
// ⚙️ GESTÃO DE ESTADOS E EVENTOS
// ============================================================================

function switchView(mode, item = null) {
    const listEl = document.getElementById('suppliers-list-view');
    const formEl = document.getElementById('suppliers-form-view');

    localState.viewMode = mode;
    localState.editingItem = item;

    if (mode === 'list') {
        listEl.classList.remove('hidden');
        listEl.classList.add('flex');
        formEl.classList.add('hidden');
        formEl.innerHTML = '<div id="form-container-wrapper" class="max-w-4xl mx-auto w-full"></div>';
        
        if(localState.hasSearched) {
            renderPartnersList(); 
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        listEl.classList.add('hidden');
        listEl.classList.remove('flex');
        formEl.classList.remove('hidden');
        renderFormView(item);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

async function handleSupplierFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const id = form.querySelector('#supId').value;
    
    const data = {
        name: form.querySelector('#supName').value,
        contactName: form.querySelector('#supContact').value,
        email: form.querySelector('#supEmail').value,
        phone: form.querySelector('#supPhone').value,
        document: form.querySelector('#supTaxId').value,
        category: form.querySelector('#supCategory').value,
        state: form.querySelector('#supState').value,
        city: form.querySelector('#supCity').value, 
        establishmentId: state.establishmentId,
        notes: form.querySelector('#supNotes')?.value || '',
        accessibleIn: [state.establishmentId] 
    };

    const btnSubmit = form.querySelector('button[type="submit"]');
    const originalText = btnSubmit.innerHTML;
    btnSubmit.disabled = true;
    btnSubmit.innerHTML = '<div class="loader-small border-white"></div> A gravar...';

    try {
        if (id) {
            await suppliersApi.updateSupplier(id, data);
            showNotification("Sucesso", "Ficha atualizada!", "success");
        } else {
            await suppliersApi.createSupplier(data);
            showNotification("Sucesso", "Parceiro registado!", "success");
        }
        
        if(localState.hasSearched) {
            localState.partners = await suppliersApi.getAll(state.establishmentId) || [];
        }
        
        switchView('list');
    } catch (error) {
        showNotification("Erro", "Falha ao gravar: " + error.message, "error");
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = originalText;
    }
}

async function handleDeleteSupplier(id) {
    const confirmed = await showConfirmation("Excluir Parceiro", "Deseja realmente apagar esta ficha permanentemente?");
    if (confirmed) {
        try {
            await suppliersApi.deleteSupplier(id);
            showNotification("Sucesso", "Entidade excluída.", "success");
            
            localState.partners = localState.partners.filter(p => p.id !== id);
            switchView('list'); 
        } catch (error) {
            showNotification("Erro", "Erro ao excluir: " + error.message, "error");
        }
    }
}

function setupEventListeners() {
    if (pageEventListener) {
        contentDiv.removeEventListener('click', pageEventListener);
    }

    pageEventListener = async (e) => {
        const target = e.target;
        
        if (target.closest('button[data-action="new-partner"]')) {
            switchView('form', null);
            return;
        }

        if (target.closest('#btn-search-partners')) {
            localState.searchQuery = document.getElementById('filterSearch').value;
            localState.categoryFilter = document.getElementById('filterCategory').value;
            localState.stateFilter = document.getElementById('filterState').value;
            localState.cityFilter = document.getElementById('filterCity').value;
            localState.sortBy = document.getElementById('filterSortBy').value;
            
            localState.hasSearched = true;
            fetchAndDisplayData();
            return;
        }

        if (target.closest('button[data-action="back-to-list"]')) {
            switchView('list');
            return;
        }

        const deleteBtn = target.closest('button[data-action="delete-partner"]');
        if (deleteBtn) {
            e.preventDefault();
            handleDeleteSupplier(deleteBtn.dataset.id);
            return;
        }

        const rowOrCard = target.closest('[data-action="open-form"]');
        if (rowOrCard && !target.closest('button')) {
            const itemData = JSON.parse(rowOrCard.dataset.item.replace(/&apos;/g, "'"));
            switchView('form', itemData);
        }
    };

    contentDiv.addEventListener('click', pageEventListener);

    contentDiv.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const isFilterInput = e.target.id === 'filterSearch' || e.target.id === 'filterCity';
            if (isFilterInput) {
                document.getElementById('btn-search-partners').click();
            }
        }
    });
}