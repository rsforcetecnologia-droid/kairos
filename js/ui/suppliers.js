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
    hasSearched: false, // Bloqueia o carregamento automático inicial
    viewMode: 'list', // 'list' ou 'form'
    editingItem: null // Dados do parceiro a ser editado (null = Novo)
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
        <div class="flex flex-col h-auto bg-gray-50 w-full relative font-sans min-h-[calc(100vh-80px)] overflow-x-hidden">
            
            <div id="suppliers-list-view" class="w-full transition-all duration-300 ${localState.viewMode === 'list' ? 'block' : 'hidden'}">
                ${renderListViewHeader()}
                <div class="flex-1 px-4 py-8 max-w-7xl mx-auto w-full">
                    <div id="partners-grid" class="pb-20">
                        </div>
                </div>
            </div>

            <div id="suppliers-form-view" class="w-full transition-all duration-300 ${localState.viewMode === 'form' ? 'block' : 'hidden'}">
                <div id="form-container-wrapper" class="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-24">
                    </div>
            </div>

        </div>
    `;
}

function renderListViewHeader() {
    const categoryOptions = Object.entries(partnerCategories).map(([val, cat]) => `<option value="${val}">${cat.label}</option>`).join('');
    const stateOptions = brazilStates.map(uf => `<option value="${uf}">${uf}</option>`).join('');

    return `
        <div class="bg-white shadow-sm border-b border-gray-200 z-20 w-full animate-fade-in">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h1 class="text-2xl font-black text-gray-900 tracking-tight">Parceiros de Negócio</h1>
                        <p class="text-sm text-gray-500 font-medium">Faça a gestão de fornecedores e entidades. Utilize os filtros para localizar registros.</p>
                    </div>
                    <button data-action="new-partner" class="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
                        <i class="bi bi-plus-lg text-lg"></i> Novo Parceiro
                    </button>
                </div>

                <div class="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-inner">
                    <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
                        
                        <div class="md:col-span-3">
                            <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Pesquisa Livre</label>
                            <div class="relative">
                                <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                <input type="text" id="filterSearch" placeholder="Nome, CNPJ, Email..." value="${localState.searchQuery}" class="w-full pl-10 p-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all">
                            </div>
                        </div>

                        <div class="md:col-span-2">
                            <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Categoria</label>
                            <select id="filterCategory" class="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all text-gray-700">
                                <option value="all">Todas as Categorias</option>
                                ${categoryOptions}
                            </select>
                        </div>

                        <div class="md:col-span-2">
                            <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Estado (UF)</label>
                            <select id="filterState" class="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all text-gray-700">
                                <option value="all">Todos os Estados</option>
                                ${stateOptions}
                            </select>
                        </div>

                        <div class="md:col-span-2">
                            <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Cidade</label>
                            <input type="text" id="filterCity" placeholder="Ex: São Paulo" value="${localState.cityFilter}" class="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all">
                        </div>

                        <div class="md:col-span-2">
                            <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Classificar por</label>
                            <select id="filterSortBy" class="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all text-gray-700">
                                <option value="name_asc">Razão Social (A-Z)</option>
                                <option value="name_desc">Razão Social (Z-A)</option>
                                <option value="contact_asc">Nome Contato (A-Z)</option>
                            </select>
                        </div>

                        <div class="md:col-span-1 flex items-end">
                            <button id="btn-search-partners" class="w-full p-2.5 bg-indigo-600 text-white font-bold uppercase tracking-wider text-xs rounded-lg hover:bg-indigo-700 shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 h-[42px]">
                                <i class="bi bi-search"></i> Buscar
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    `;
}

function renderFormView(item = null) {
    const isEditing = !!item;
    const title = isEditing ? 'Ficha do Parceiro' : 'Novo Parceiro de Negócio';

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
        <div class="animate-fade-in-up">
            <div class="flex items-center gap-4 mb-6">
                <button data-action="back-to-list" class="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm">
                    <i class="bi bi-arrow-left text-xl"></i>
                </button>
                <div>
                    <h2 class="text-2xl font-black text-gray-900 tracking-tight">${title}</h2>
                    <p class="text-sm text-gray-500 font-medium">Preencha as informações da entidade abaixo.</p>
                </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <form id="partner-form" class="flex flex-col">
                    <input type="hidden" id="supId" value="${item?.id || ''}">

                    <div class="p-6 md:p-8 space-y-8">
                        
                        <div>
                            <h3 class="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4 flex items-center gap-2"><i class="bi bi-building"></i> Dados Empresariais</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div class="md:col-span-2">
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Razão Social / Nome da Empresa *</label>
                                    <input type="text" id="supName" required class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none font-bold text-gray-800 text-lg transition-all shadow-inner" value="${escapeHTML(item?.name || '')}" placeholder="Ex: CPFL Energia, Coca-Cola...">
                                </div>
                                
                                <div>
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Categoria / Tipo *</label>
                                    <select id="supCategory" required class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm font-medium text-gray-700 transition-all shadow-inner">
                                        <option value="">-- Selecione --</option>
                                        ${categoryOptions}
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">CNPJ / CPF</label>
                                    <input type="text" id="supTaxId" class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm text-gray-800 transition-all shadow-inner" value="${escapeHTML(item?.document || item?.taxId || '')}" placeholder="00.000.000/0001-00">
                                </div>
                            </div>
                        </div>

                        <hr class="border-gray-100">

                        <div>
                            <h3 class="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4 flex items-center gap-2"><i class="bi bi-geo-alt"></i> Localização</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Estado (UF)</label>
                                    <select id="supState" class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm font-medium text-gray-700 transition-all shadow-inner">
                                        <option value="">-- Selecione o Estado --</option>
                                        ${stateOptionsForm}
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Cidade</label>
                                    <input type="text" id="supCity" class="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm text-gray-800 transition-all shadow-inner" value="${escapeHTML(item?.city || '')}" placeholder="Ex: São Paulo">
                                </div>
                            </div>
                        </div>

                        <hr class="border-gray-100">

                        <div>
                            <h3 class="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4 flex items-center gap-2"><i class="bi bi-person-lines-fill"></i> Contactos Principais</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div class="md:col-span-2">
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Nome do Contato na Empresa</label>
                                    <div class="relative">
                                        <i class="bi bi-person absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                                        <input type="text" id="supContact" class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm text-gray-800 transition-all shadow-inner" value="${escapeHTML(item?.contactName || '')}" placeholder="Ex: João Silva (Comercial)">
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">E-mail Comercial</label>
                                    <div class="relative">
                                        <i class="bi bi-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input type="email" id="supEmail" class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm text-gray-800 transition-all shadow-inner" value="${escapeHTML(item?.email || '')}" placeholder="contato@empresa.com">
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Telefone / WhatsApp</label>
                                    <div class="relative">
                                        <i class="bi bi-telephone absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input type="tel" id="supPhone" class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm text-gray-800 transition-all shadow-inner" value="${escapeHTML(item?.phone || '')}" placeholder="(00) 0000-0000">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr class="border-gray-100">

                        <div>
                            <h3 class="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4 flex items-center gap-2"><i class="bi bi-journal-text"></i> Informações Adicionais</h3>
                            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Observações Internas (Ex: Dados Bancários, Chave PIX, Conta Contrato)</label>
                            <textarea id="supNotes" rows="4" class="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none text-sm text-gray-700 font-medium resize-none transition-all shadow-inner">${item?.notes || ''}</textarea>
                        </div>
                    </div>

                    <div class="px-6 py-5 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        ${isEditing ? `
                            <button type="button" data-action="delete-partner" data-id="${item.id}" class="w-full sm:w-auto px-6 py-3 text-red-600 bg-white border border-red-200 rounded-xl font-bold hover:bg-red-50 hover:border-red-300 transition-colors flex items-center justify-center gap-2 shadow-sm">
                                <i class="bi bi-trash3"></i> Excluir Registro
                            </button>
                        ` : `<div></div>`}
                        
                        <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <button type="button" data-action="back-to-list" class="px-8 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-sm w-full sm:w-auto">
                                Cancelar
                            </button>
                            <button type="submit" class="px-8 py-3 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 transition-all active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto">
                                <i class="bi bi-save2"></i> ${isEditing ? 'Salvar Alterações' : 'Cadastrar Parceiro'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.getElementById('partner-form').addEventListener('submit', handleSupplierFormSubmit);
}

function renderInitialEmptyState() {
    const grid = document.getElementById('partners-grid');
    if(grid) {
        grid.innerHTML = `
            <div class="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-2xl w-full max-w-3xl mx-auto shadow-sm">
                <div class="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 border border-indigo-100 shadow-inner">
                    <i class="bi bi-search text-2xl text-indigo-400"></i>
                </div>
                <h3 class="text-xl font-black text-gray-800 mb-2">Pronto para pesquisar</h3>
                <p class="text-sm text-gray-500 font-medium max-w-md text-center">Utilize os filtros acima e clique em "Buscar" para listar os parceiros registados no sistema.</p>
            </div>
        `;
    }
}

// ============================================================================
// 📡 COMUNICAÇÃO DE DADOS E RENDERIZAÇÃO DA PLANILHA
// ============================================================================

async function fetchAndDisplayData() {
    const grid = document.getElementById('partners-grid');
    
    // Se ainda não buscou (clicou no botão), renderiza apenas o estado vazio
    if (!localState.hasSearched) {
        renderInitialEmptyState();
        return;
    }

    grid.innerHTML = '<div class="text-center py-16"><div class="loader mx-auto"></div><p class="text-sm text-gray-500 mt-4 font-medium">Buscando parceiros...</p></div>';

    try {
        const partners = await suppliersApi.getAll(state.establishmentId);
        localState.partners = partners || [];
        renderPartnersList();
    } catch (error) {
        grid.innerHTML = `<div class="text-center py-10 text-red-500 font-bold">Erro ao carregar parceiros: ${error.message}</div>`;
    }
}

function renderPartnersList() {
    const grid = document.getElementById('partners-grid');
    if (!grid) return;

    let filtered = localState.partners;

    // 1. Filtro Pesquisa Livre
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

    // 2. Filtro Categoria
    if (localState.categoryFilter !== 'all') {
        filtered = filtered.filter(p => p.category === localState.categoryFilter);
    }

    // 3. Filtro Estado (UF)
    if (localState.stateFilter !== 'all') {
        filtered = filtered.filter(p => p.state === localState.stateFilter);
    }

    // 4. Filtro Cidade
    if (localState.cityFilter) {
        const c = localState.cityFilter.toLowerCase();
        filtered = filtered.filter(p => p.city && p.city.toLowerCase().includes(c));
    }

    // 5. Ordenação
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
            <div class="flex flex-col items-center justify-center py-16 bg-white border border-dashed border-gray-300 rounded-2xl max-w-3xl mx-auto shadow-sm">
                <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100 shadow-inner">
                    <i class="bi bi-inbox text-2xl text-gray-400"></i>
                </div>
                <h3 class="text-lg font-black text-gray-800 mb-1">Nenhum parceiro encontrado</h3>
                <p class="text-sm text-gray-500 font-medium">Os filtros aplicados não retornaram resultados.</p>
            </div>
        `;
        return;
    }

    // --- VISÃO DE PLANILHA (DESKTOP) ---
    let desktopTable = `
        <div class="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <table class="w-full text-left border-collapse">
                <thead class="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th class="p-4 pl-6 text-[10px] font-black text-gray-500 uppercase tracking-widest w-16 text-center">Tipo</th>
                        <th class="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Razão Social / Parceiro</th>
                        <th class="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Documento</th>
                        <th class="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Contacto / Localização</th>
                        <th class="p-4 pr-6 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Ação</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
    `;

    // --- VISÃO DE CARDS (MOBILE) ---
    let mobileCards = `<div class="flex flex-col gap-4 md:hidden">`;

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
            <tr class="hover:bg-indigo-50/50 cursor-pointer transition-colors group" data-action="open-form" data-item='${partnerDataStr}'>
                <td class="p-4 pl-6 text-center">
                    <div class="w-10 h-10 mx-auto rounded-xl bg-${cat.color}-100 text-${cat.color}-600 flex items-center justify-center text-lg shadow-sm" title="${cat.label}">
                        <i class="bi ${cat.icon}"></i>
                    </div>
                </td>
                <td class="p-4">
                    <p class="font-bold text-gray-900 text-sm group-hover:text-indigo-700 transition-colors">${escapeHTML(partner.name)}</p>
                    ${partner.email ? `<p class="text-xs text-gray-500 mt-0.5"><i class="bi bi-envelope mr-1 opacity-50"></i>${escapeHTML(partner.email)}</p>` : ''}
                </td>
                <td class="p-4 text-sm font-medium text-gray-600">${escapeHTML(docText)}</td>
                <td class="p-4">
                    <div class="text-sm font-medium text-gray-800">${escapeHTML(partner.contactName || '-')}</div>
                    ${locationText ? `<div class="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-1"><i class="bi bi-geo-alt mr-1"></i>${escapeHTML(locationText)}</div>` : ''}
                </td>
                <td class="p-4 pr-6 text-right">
                    <button class="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 group-hover:text-indigo-600 group-hover:bg-indigo-100 transition-colors shadow-sm bg-white border border-gray-200 group-hover:border-indigo-200">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                </td>
            </tr>
        `;

        // MOBILE CARD
        mobileCards += `
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col gap-3 active:scale-[0.98] transition-transform cursor-pointer relative overflow-hidden" data-action="open-form" data-item='${partnerDataStr}'>
                <div class="absolute left-0 top-0 bottom-0 w-1 bg-${cat.color}-500"></div>
                <div class="flex gap-4">
                    <div class="w-12 h-12 rounded-xl bg-${cat.color}-100 text-${cat.color}-600 flex items-center justify-center text-xl shadow-sm flex-shrink-0">
                        <i class="bi ${cat.icon}"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">${cat.label.split(' ')[0]}</p>
                        <h3 class="font-black text-gray-900 text-base leading-tight truncate">${escapeHTML(partner.name)}</h3>
                    </div>
                </div>
                <div class="bg-gray-50 rounded-lg p-3 border border-gray-100 mt-1 flex flex-col gap-1.5">
                    <div class="flex justify-between items-center text-xs">
                        <span class="text-gray-500 font-medium">Documento:</span>
                        <span class="font-bold text-gray-700">${escapeHTML(docText)}</span>
                    </div>
                    ${locationText ? `
                    <div class="flex justify-between items-center text-xs">
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
        formEl.classList.add('hidden');
        formEl.innerHTML = '<div id="form-container-wrapper" class="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-24"></div>';
        
        // Mantém a pesquisa ativa se já tiver sido feita
        if(localState.hasSearched) {
            renderPartnersList(); 
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        listEl.classList.add('hidden');
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
        state: form.querySelector('#supState').value, // NOVO
        city: form.querySelector('#supCity').value, // NOVO
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
        
        // Força recarregamento para trazer o novo dado para a lista
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
    const confirmed = await showConfirmation("Excluir Parceiro", "Deseja realmente apagar esta ficha permanentemente? Os lançamentos financeiros antigos não serão apagados.");
    if (confirmed) {
        try {
            await suppliersApi.deleteSupplier(id);
            showNotification("Sucesso", "Entidade excluída.", "success");
            
            // Atualiza a lista em memória
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
        
        // 1. Botão Novo Parceiro
        if (target.closest('button[data-action="new-partner"]')) {
            switchView('form', null);
            return;
        }

        // 2. Botão Buscar (Dispara a Pesquisa)
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

        // 3. Clicar em Voltar para a Lista
        if (target.closest('button[data-action="back-to-list"]')) {
            switchView('list');
            return;
        }

        // 4. Clicar em Excluir (Dentro do Form)
        const deleteBtn = target.closest('button[data-action="delete-partner"]');
        if (deleteBtn) {
            e.preventDefault();
            handleDeleteSupplier(deleteBtn.dataset.id);
            return;
        }

        // 5. Clicar na Linha da Tabela ou no Card Mobile para Editar
        const rowOrCard = target.closest('[data-action="open-form"]');
        if (rowOrCard && !target.closest('button')) {
            const itemData = JSON.parse(rowOrCard.dataset.item.replace(/&apos;/g, "'"));
            switchView('form', itemData);
        }
    };

    contentDiv.addEventListener('click', pageEventListener);

    // Permite usar a tecla "Enter" nos campos de input para disparar a busca
    contentDiv.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const isFilterInput = e.target.id === 'filterSearch' || e.target.id === 'filterCity';
            if (isFilterInput) {
                document.getElementById('btn-search-partners').click();
            }
        }
    });
}