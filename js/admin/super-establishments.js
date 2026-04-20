// js/admin/super-establishments.js

import { authenticatedFetch } from '../api/apiService.js';
import { showNotification, showConfirmation, showGenericModal } from '../components/modal.js';
import { escapeHTML } from '../utils.js';

let localState = {
    tenants: [],
    plans: [],
    payments: [],
    searchQuery: '',
    currentPage: 1,
    limit: 20,
    totalPages: 1,
    activeTab: 'cadastro' // 'cadastro', 'history'
};

let pageEventListener = null;

export async function loadEstablishments(container) {
    renderBaseLayout(container);
    setupEventListeners(container);
    await Promise.all([ fetchPlans(), fetchTenants() ]);
}

// ============================================================================
// 🎨 1. RENDERIZAÇÃO DO LAYOUT (TAILWIND CSS)
// ============================================================================

function renderBaseLayout(container) {
    container.innerHTML = `
        <div class="h-full flex flex-col w-full relative font-sans animate-fade-in pb-12">
            
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h2 class="text-2xl font-black text-slate-800 tracking-tight">Clientes (SaaS CRM)</h2>
                    <p class="text-sm text-slate-500 font-medium mt-1">Gira cadastros, planos, faturas e bloqueios dos seus clientes.</p>
                </div>
                <button id="btn-open-wizard" class="bg-brand-600 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-brand-700 shadow-md shadow-brand-500/30 active:scale-95 transition-all flex items-center gap-2">
                    <i class="bi bi-building-add text-lg"></i> Novo Cliente
                </button>
            </div>

            <div class="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 mb-4 flex items-center">
                <i class="bi bi-search text-slate-400 ml-3 text-lg"></i>
                <input type="text" id="search-tenant-input" placeholder="Pesquisar por nome da empresa, CNPJ/CPF ou email..." class="w-full bg-transparent border-none p-3 outline-none text-sm font-bold text-slate-700 placeholder-slate-400">
                <div class="border-l border-slate-200 pl-2 ml-2">
                    <button id="btn-refresh-table" class="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-colors" title="Atualizar">
                        <i class="bi bi-arrow-clockwise text-lg"></i>
                    </button>
                </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-1 flex flex-col min-h-0">
                <div class="overflow-x-auto flex-1 custom-scrollbar">
                    <table class="w-full text-left border-collapse whitespace-nowrap">
                        <thead class="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
                            <tr>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Empresa / Rede</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Acesso Master</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Assinatura SaaS</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Status</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody id="tenants-table-body" class="divide-y divide-slate-100">
                            <tr><td colspan="5" class="py-16 text-center text-slate-400"><div class="loader mx-auto mb-3 border-brand-500"></div></td></tr>
                        </tbody>
                    </table>
                </div>
                <div id="pagination-container" class="bg-slate-50 border-t border-slate-200 p-3 flex justify-between items-center px-6"></div>
            </div>

            <div id="slide-panel-overlay" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 hidden opacity-0 transition-opacity duration-300"></div>

            <div id="slide-panel" class="fixed inset-0 z-50 hidden items-center justify-center p-4 sm:p-6 pointer-events-none">
                
                <div id="modal-container" class="w-full max-w-4xl bg-slate-50 rounded-3xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden transform scale-95 opacity-0 transition-all duration-300 pointer-events-auto">
                    
                    <div class="px-6 py-5 border-b border-slate-200 bg-white flex justify-between items-center shadow-sm z-20 flex-shrink-0">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center text-xl border border-brand-100">
                                <i class="bi bi-briefcase-fill"></i>
                            </div>
                            <div>
                                <h3 id="panel-title" class="text-xl font-black text-slate-800 tracking-tight">Painel</h3>
                                <p id="panel-subtitle" class="text-[10px] font-bold text-brand-600 uppercase tracking-widest mt-0.5">Gestão de Cliente SaaS</p>
                            </div>
                        </div>
                        <button id="btn-close-panel" class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors active:scale-95 shadow-inner">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                    
                    <div id="panel-tabs-container" class="hidden bg-white border-b border-slate-200 px-6 pt-2 flex gap-6 overflow-x-auto custom-scrollbar flex-shrink-0 z-10 shadow-sm">
                        <button data-tab="cadastro" class="panel-tab text-xs font-bold py-3 border-b-2 border-brand-600 text-brand-600 whitespace-nowrap">Cadastro Completo</button>
                        <button data-tab="history" class="panel-tab text-xs font-bold py-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800 whitespace-nowrap">Histórico de Pagamentos</button>
                    </div>

                    <div id="panel-content" class="flex-1 overflow-y-auto p-5 md:p-8 custom-scrollbar space-y-6 relative bg-slate-50"></div>
                    
                    <div id="panel-footer" class="p-5 border-t border-slate-200 bg-white flex gap-3 justify-end shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.05)] z-20 flex-shrink-0"></div>
                </div>
            </div>
        </div>
    `;
}

// ============================================================================
// 📡 2. COMUNICAÇÃO COM O BACKEND
// ============================================================================

async function fetchPlans() {
    try { localState.plans = await authenticatedFetch('/api/admin/plans') || []; } 
    catch (e) { showNotification('Erro', 'Falha ao carregar os planos.', 'error'); }
}

async function fetchTenants() {
    const tbody = document.getElementById('tenants-table-body');
    const pagination = document.getElementById('pagination-container');
    if (tbody) tbody.innerHTML = `<tr><td colspan="5" class="py-12 text-center"><div class="loader mx-auto mb-2 border-brand-500"></div></td></tr>`;

    try {
        let url = `/api/admin/tenants?page=${localState.currentPage}&limit=${localState.limit}`;
        if (localState.searchQuery) url += `&search=${encodeURIComponent(localState.searchQuery)}`;

        const response = await authenticatedFetch(url);
        
        // Filtramos do frontend os que foram marcados como deletados
        localState.tenants = (response.data || []).filter(t => t.status !== 'deleted');
        localState.totalPages = response.pagination.totalPages || 1;
        
        renderTenantsTable();
        renderPagination(pagination);
    } catch (error) {
        if (tbody) tbody.innerHTML = `<tr><td colspan="5" class="py-12 text-center text-rose-500">Erro ao carregar clientes.</td></tr>`;
    }
}

async function fetchPayments(companyId) {
    try {
        const res = await authenticatedFetch(`/api/admin/tenants/${companyId}/payments`);
        localState.payments = res || [];
        renderPaymentsTab(companyId);
    } catch (e) {
        document.getElementById('payments-wrapper').innerHTML = '<p class="text-rose-500 text-xs font-bold text-center mt-4">Erro ao carregar pagamentos.</p>';
    }
}

// ============================================================================
// 🖼️ 3. RENDERIZAÇÃO DE TABELA
// ============================================================================

function formatDateBR(dateString) {
    if (!dateString) return '-';
    try {
        const [y, m, d] = dateString.split('T')[0].split('-');
        return `${d}/${m}/${y}`;
    } catch(e) { return dateString; }
}

function renderTenantsTable() {
    const tbody = document.getElementById('tenants-table-body');
    if (!tbody) return;

    if (localState.tenants.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="py-16 text-center text-slate-400">Nenhum cliente encontrado.</td></tr>`;
        return;
    }

    const plansMap = new Map(localState.plans.map(p => [p.id, p.name]));

    const html = localState.tenants.map(tenant => {
        const isBlocked = tenant.status === 'inactive' || tenant.status === 'blocked';
        const planName = plansMap.get(tenant.planId) || 'Não Definido';
        const dueDateStr = tenant.nextDueDate ? formatDateBR(tenant.nextDueDate) : '-';
        
        const isOverdue = tenant.lastPaymentStatus === 'overdue';
        const payStatusHtml = isOverdue 
            ? `<span class="text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded ml-1 border border-rose-100"><i class="bi bi-exclamation-circle text-[8px]"></i> Atrasado</span>`
            : `<span class="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded ml-1 border border-emerald-100">Em dia</span>`;

        return `
            <tr class="hover:bg-slate-50 transition-colors group cursor-pointer border-b border-slate-100" data-action="view-tenant" data-id="${tenant.id}">
                <td class="p-4">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-lg ${tenant.isNetwork ? 'bg-indigo-50 text-indigo-500 border-indigo-100' : 'bg-white text-slate-500 border-slate-200'} flex items-center justify-center border shadow-sm">
                            <i class="bi ${tenant.isNetwork ? 'bi-diagram-3-fill' : 'bi-shop'}"></i>
                        </div>
                        <div>
                            <p class="text-sm font-bold text-slate-800 group-hover:text-brand-600 transition-colors">${escapeHTML(tenant.name)}</p>
                            <p class="text-[10px] text-slate-500 font-semibold mt-0.5">DOC: ${escapeHTML(tenant.document || 'N/A')}</p>
                        </div>
                    </div>
                </td>
                <td class="p-4">
                    <p class="text-xs font-bold text-slate-700"><i class="bi bi-person-fill text-slate-300 mr-1"></i> ${escapeHTML(tenant.ownerEmail || 'S/E-mail')}</p>
                </td>
                <td class="p-4 text-center">
                    <p class="text-xs font-black text-slate-700">${escapeHTML(planName)}</p>
                    <p class="text-[9px] font-bold text-slate-500 mt-1">Vence: ${dueDateStr} ${payStatusHtml}</p>
                </td>
                <td class="p-4 text-center">
                    ${isBlocked 
                        ? `<span class="bg-rose-50 text-rose-600 border border-rose-200 px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest"><i class="bi bi-lock-fill"></i> Bloqueado</span>`
                        : `<span class="bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest"><i class="bi bi-check-circle-fill"></i> Ativo</span>`}
                </td>
                <td class="p-4 text-right">
                    <div class="flex items-center justify-end gap-2">
                        <button class="bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 transition-colors active:scale-95" data-action="view-tenant" data-id="${tenant.id}">
                            Gerir
                        </button>
                        <button class="bg-white border border-slate-200 text-slate-400 w-8 h-8 flex items-center justify-center rounded-lg shadow-sm hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors active:scale-95" data-action="delete-tenant" data-id="${tenant.id}" title="Excluir Cliente">
                            <i class="bi bi-trash3"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    tbody.innerHTML = html;
}

function renderPagination(container) {
    if (!container) return;
    if (localState.totalPages <= 1) { container.innerHTML = ''; return; }
    container.innerHTML = `
        <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pág. ${localState.currentPage} de ${localState.totalPages}</span>
        <div class="flex gap-2">
            <button data-action="prev-page" class="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm disabled:opacity-50" ${localState.currentPage <= 1 ? 'disabled' : ''}><i class="bi bi-chevron-left"></i></button>
            <button data-action="next-page" class="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm disabled:opacity-50" ${localState.currentPage >= localState.totalPages ? 'disabled' : ''}><i class="bi bi-chevron-right"></i></button>
        </div>
    `;
}

// ============================================================================
// 🪄 4. MODAL CENTRALIZADO (WIZARD E TABS)
// ============================================================================

function openPanel(mode, tenantId = null) {
    const overlay = document.getElementById('slide-panel-overlay');
    const panel = document.getElementById('slide-panel');
    const containerModal = document.getElementById('modal-container');
    const title = document.getElementById('panel-title');
    const content = document.getElementById('panel-content');
    const footer = document.getElementById('panel-footer');
    const tabsContainer = document.getElementById('panel-tabs-container');

    // 1. Mostra o Wrapper
    overlay.classList.remove('hidden');
    panel.classList.remove('hidden');
    panel.classList.add('flex');

    // 2. Aciona Transição Suave
    requestAnimationFrame(() => {
        overlay.classList.remove('opacity-0');
        containerModal.classList.remove('scale-95', 'opacity-0');
        containerModal.classList.add('scale-100', 'opacity-100');
    });

    const planOptions = localState.plans.map(p => `<option value="${p.id}">${escapeHTML(p.name)}</option>`).join('');

    if (mode === 'create') {
        title.innerText = 'Cadastrar Novo Cliente';
        tabsContainer.classList.add('hidden'); // Oculta abas na criação
        containerModal.classList.add('max-w-3xl'); // Menor no modo criação
        containerModal.classList.remove('max-w-4xl');
        
        content.innerHTML = `
            <form id="wizard-form" class="space-y-6">
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 class="text-[10px] font-black text-brand-600 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">1. Perfil da Empresa</h4>
                        
                        <div class="mb-4">
                            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Tipo de Cadastro *</label>
                            <div class="flex bg-slate-50 p-1 rounded-xl border border-slate-200">
                                <label class="flex-1 cursor-pointer relative">
                                    <input type="radio" name="wiz-is-network" value="false" checked class="peer sr-only">
                                    <div class="text-center text-xs font-bold text-slate-500 py-2 rounded-lg peer-checked:bg-white peer-checked:text-brand-600 peer-checked:shadow-sm transition-all">Única Loja</div>
                                </label>
                                <label class="flex-1 cursor-pointer relative">
                                    <input type="radio" name="wiz-is-network" value="true" class="peer sr-only">
                                    <div class="text-center text-xs font-bold text-slate-500 py-2 rounded-lg peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-sm transition-all">Rede (Múltiplas)</div>
                                </label>
                            </div>
                        </div>

                        <div class="space-y-4">
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Nome Fantasia / Marca *</label>
                                <input type="text" id="wiz-company" required class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-brand-500 transition-shadow">
                            </div>
                            
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">CNPJ / CPF</label>
                                <input type="text" id="wiz-doc" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-brand-500 transition-shadow">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Telefone Principal</label>
                                <input type="text" id="wiz-phone" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-brand-500 transition-shadow">
                            </div>
                        </div>
                    </div>

                    <div class="space-y-6">
                        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <h4 class="text-[10px] font-black text-brand-600 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">2. Acesso Master (Dono)</h4>
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Nome Completo do Proprietário *</label>
                                    <input type="text" id="wiz-name" required class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-brand-500 transition-shadow">
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">E-mail de Login *</label>
                                    <input type="email" id="wiz-email" required class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-brand-500 transition-shadow" autocomplete="new-email">
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Senha Inicial *</label>
                                    <input type="text" id="wiz-password" required value="kairos123" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-brand-500 transition-shadow">
                                </div>
                            </div>
                        </div>

                        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-brand-500">
                            <h4 class="text-[10px] font-black text-brand-600 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">3. Assinatura SaaS</h4>
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Plano Base *</label>
                                <select id="wiz-plan" required class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer transition-shadow">
                                    <option value="">Selecione o plano...</option>${planOptions}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        `;

        footer.innerHTML = `
            <button data-action="close-panel" class="px-6 py-3 rounded-xl font-bold text-sm text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 transition-colors uppercase tracking-widest">Cancelar</button>
            <button data-action="submit-wizard" class="px-8 py-3 rounded-xl font-black text-sm text-white bg-brand-600 hover:bg-brand-700 shadow-md flex items-center gap-2 active:scale-95 transition-transform uppercase tracking-widest">Criar Ambiente</button>
        `;
    } 
    else if (mode === 'view' && tenantId) {
        const tenant = localState.tenants.find(t => t.id === tenantId);
        if(!tenant) return;

        title.innerText = tenant.name;
        tabsContainer.classList.remove('hidden'); 
        containerModal.classList.add('max-w-4xl'); 
        containerModal.classList.remove('max-w-3xl');
        
        localState.activeTab = 'cadastro';
        renderViewTabs(tenant, planOptions);

        footer.innerHTML = `
            <button data-action="close-panel" class="px-6 py-3 rounded-xl font-bold text-sm text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 transition-colors uppercase tracking-widest active:scale-95">Fechar Janela</button>
            <button data-action="update-tenant" data-id="${tenant.id}" class="px-8 py-3 bg-brand-600 text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-brand-700 transition-colors shadow-md active:scale-95 flex items-center justify-center gap-2">
                <i class="bi bi-save2"></i> Salvar Cadastro
            </button>
        `;
    }
}

function renderViewTabs(tenant, planOptions) {
    const content = document.getElementById('panel-content');
    const tabs = document.querySelectorAll('.panel-tab');
    
    tabs.forEach(t => {
        if(t.dataset.tab === localState.activeTab) {
            t.classList.remove('border-transparent', 'text-slate-500');
            t.classList.add('border-brand-600', 'text-brand-600');
        } else {
            t.classList.add('border-transparent', 'text-slate-500');
            t.classList.remove('border-brand-600', 'text-brand-600');
        }
    });

    const isBlocked = tenant.status === 'inactive' || tenant.status === 'blocked' || tenant.status === 'deleted';

    if (localState.activeTab === 'cadastro') {
        content.innerHTML = `
            <form id="tenant-full-form" class="space-y-6">
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                        <div class="flex items-center gap-3 mb-4 border-b border-slate-100 pb-3">
                            <div class="w-10 h-10 rounded-lg ${tenant.isNetwork ? 'bg-indigo-50 text-indigo-500 border-indigo-100' : 'bg-slate-50 text-slate-500 border-slate-200'} flex items-center justify-center text-lg border flex-shrink-0">
                                <i class="bi ${tenant.isNetwork ? 'bi-diagram-3-fill' : 'bi-shop'}"></i>
                            </div>
                            <div>
                                <h4 class="text-[11px] font-black text-slate-700 uppercase tracking-widest">Perfil da Empresa</h4>
                                <p class="text-[10px] text-slate-400 font-bold">${tenant.isNetwork ? 'Rede / Franquia' : 'Empresa Única'}</p>
                            </div>
                        </div>

                        <div class="space-y-4 flex-1">
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Email Master (Login)</label>
                                <input type="text" value="${escapeHTML(tenant.ownerEmail)}" disabled class="w-full p-3 bg-slate-100 border border-slate-200 rounded-xl text-sm font-bold text-slate-500 cursor-not-allowed">
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Telefone Comercial</label>
                                    <input type="text" id="edit-phone" value="${escapeHTML(tenant.phone || '')}" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow">
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">CNPJ / CPF</label>
                                    <input type="text" id="edit-doc" value="${escapeHTML(tenant.document || '')}" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-emerald-500 flex flex-col">
                        <h4 class="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-100 pb-2"><i class="bi bi-credit-card-2-front text-sm"></i> Faturação e Assinatura SaaS</h4>
                        
                        <div class="space-y-4 flex-1">
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Plano Contratado (Upsell / Downgrade)</label>
                                <select id="edit-plan" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer transition-shadow">
                                    ${planOptions}
                                </select>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Data de Vencimento</label>
                                    <input type="date" id="edit-due-date" value="${tenant.nextDueDate || ''}" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow">
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1" title="Dias para bloqueio após vencimento">Carência (Dias)</label>
                                    <input type="number" id="edit-grace-period" value="${tenant.gracePeriodDays !== undefined ? tenant.gracePeriodDays : 5}" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-brand-500 transition-shadow">
                                </div>
                            </div>

                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Status da Fatura Atual</label>
                                <select id="edit-pay-status" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer transition-shadow">
                                    <option value="paid" ${tenant.lastPaymentStatus === 'paid' ? 'selected' : ''}>Em Dia (Pago)</option>
                                    <option value="pending" ${tenant.lastPaymentStatus === 'pending' ? 'selected' : ''}>Pendente / Aguardando</option>
                                    <option value="overdue" ${tenant.lastPaymentStatus === 'overdue' ? 'selected' : ''}>Atrasado (Inadimplente)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                <hr class="border-slate-200 my-6">

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div class="bg-indigo-50 p-5 rounded-2xl border border-indigo-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <h4 class="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2 flex items-center gap-2"><i class="bi bi-headset text-sm"></i> Suporte Técnico</h4>
                            <p class="text-[10px] text-indigo-800 font-medium mb-4 leading-relaxed">Aceder à conta deste cliente sem necessitar da senha original.</p>
                        </div>
                        <button type="button" data-action="impersonate" data-id="${tenant.id}" class="w-full py-3 bg-white border border-indigo-200 text-indigo-700 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-indigo-600 hover:text-white transition-colors shadow-sm active:scale-95 flex justify-center items-center gap-2">
                            <i class="bi bi-box-arrow-in-right text-lg"></i> Assumir Identidade
                        </button>
                    </div>

                    <div class="bg-rose-50 p-5 rounded-2xl border border-rose-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <h4 class="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-2 flex items-center gap-2"><i class="bi bi-exclamation-triangle-fill text-sm"></i> Zona de Risco</h4>
                            <p class="text-[10px] text-rose-800 font-medium mb-4 leading-relaxed">Bloquear impede o acesso imediato de todas as unidades desta rede.</p>
                        </div>
                        <button type="button" data-action="toggle-status" data-id="${tenant.id}" data-current="${tenant.status}" class="w-full py-3 ${isBlocked ? 'bg-emerald-600 text-white border-transparent' : 'bg-white border-rose-200 text-rose-700 hover:bg-rose-600 hover:text-white hover:border-transparent'} font-black text-xs uppercase tracking-widest rounded-xl transition-colors shadow-sm active:scale-95 flex items-center justify-center gap-1.5">
                            <i class="bi ${isBlocked ? 'bi-unlock-fill' : 'bi-lock-fill'}"></i> ${isBlocked ? 'Desbloquear Ambiente' : 'Bloquear Sistema'}
                        </button>
                    </div>
                </div>
            </form>
        `;
        
        setTimeout(() => {
            const planSelect = document.getElementById('edit-plan');
            if (planSelect && tenant.planId) planSelect.value = tenant.planId;
        }, 50);
    }
    else if (localState.activeTab === 'history') {
        content.innerHTML = `
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full min-h-[400px]">
                <div class="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                    <h4 class="text-xs font-black text-slate-800 tracking-tight flex items-center gap-2"><i class="bi bi-receipt-cutoff text-emerald-600"></i> Faturas Pagas</h4>
                    <button data-action="add-manual-payment" data-id="${tenant.id}" class="bg-emerald-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 shadow-sm shadow-emerald-500/30 active:scale-95 transition-all flex items-center gap-1"><i class="bi bi-plus-lg"></i> Inserir</button>
                </div>
                
                <div id="payments-wrapper" class="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
                    <div class="loader mx-auto mt-10"></div>
                </div>
            </div>
        `;
        fetchPayments(tenant.id);
    }
}

function renderPaymentsTab(companyId) {
    const wrapper = document.getElementById('payments-wrapper');
    if(!wrapper) return;

    if (localState.payments.length === 0) {
        wrapper.innerHTML = `
            <div class="text-center py-16">
                <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 border border-slate-100"><i class="bi bi-receipt text-2xl text-slate-300"></i></div>
                <p class="text-sm font-bold text-slate-600">Nenhum pagamento registado.</p>
                <p class="text-xs text-slate-400 mt-1">Os pagamentos desta assinatura aparecerão aqui.</p>
            </div>
        `;
        return;
    }

    wrapper.innerHTML = localState.payments.map(p => `
        <div class="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-sm hover:border-brand-200 hover:bg-white transition-all group">
            <div>
                <p class="text-base font-black text-slate-800 tracking-tight">R$ ${Number(p.amount).toFixed(2)}</p>
                <p class="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-widest"><i class="bi bi-calendar-check text-emerald-500 mr-1"></i> Data: ${formatDateBR(p.paymentDate)}</p>
            </div>
            <div class="text-right">
                <span class="bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm">Pago</span>
                <p class="text-[9px] font-bold text-slate-400 mt-1.5 uppercase tracking-widest">Via ${escapeHTML(p.paymentMethod)}</p>
            </div>
        </div>
    `).join('');
}

function closePanel() {
    const overlay = document.getElementById('slide-panel-overlay');
    const panel = document.getElementById('slide-panel');
    const containerModal = document.getElementById('modal-container');
    
    // Anima a saída
    overlay.classList.add('opacity-0');
    if(containerModal) {
        containerModal.classList.remove('scale-100', 'opacity-100');
        containerModal.classList.add('scale-95', 'opacity-0');
    }

    // Esconde fisicamente após a animação
    setTimeout(() => {
        overlay.classList.add('hidden');
        panel.classList.add('hidden');
        panel.classList.remove('flex');
    }, 300); 
}

// ============================================================================
// ⚡ 5. LÓGICA DE AÇÕES (SALVAR E ATUALIZAR)
// ============================================================================

async function handleCreateTenant(btnElement) {
    const form = document.getElementById('wizard-form');
    if (!form.checkValidity()) { form.reportValidity(); return; }

    const isNetworkSelect = document.querySelector('input[name="wiz-is-network"]:checked');
    const companyRaw = document.getElementById('wiz-company').value;

    const payload = {
        companyName: companyRaw,
        documentInfo: document.getElementById('wiz-doc').value,
        isNetwork: isNetworkSelect ? isNetworkSelect.value : false,
        phone: document.getElementById('wiz-phone').value,
        adminName: document.getElementById('wiz-name').value,
        adminEmail: document.getElementById('wiz-email').value,
        adminPassword: document.getElementById('wiz-password').value,
        planId: document.getElementById('wiz-plan').value,
    };

    const originalHTML = btnElement.innerHTML;
    btnElement.innerHTML = '<div class="loader-small border-white mr-2"></div> Criando...';
    btnElement.disabled = true;

    try {
        await authenticatedFetch('/api/admin/tenants', { method: 'POST', body: JSON.stringify(payload) });
        showNotification('Fantástico!', `A conta de ${payload.companyName} foi criada com sucesso.`, 'success');
        closePanel();
        await fetchTenants();
    } catch (error) {
        showNotification('Erro', error.message, 'error');
        btnElement.innerHTML = originalHTML; btnElement.disabled = false;
    }
}

async function handleUpdateTenant(btnElement) {
    const tenantId = btnElement.dataset.id;
    
    const payload = {
        phone: document.getElementById('edit-phone').value,
        documentInfo: document.getElementById('edit-doc').value,
        planId: document.getElementById('edit-plan').value,
        nextDueDate: document.getElementById('edit-due-date').value,
        gracePeriodDays: document.getElementById('edit-grace-period').value,
        lastPaymentStatus: document.getElementById('edit-pay-status').value
    };

    const originalHTML = btnElement.innerHTML;
    btnElement.innerHTML = '<div class="loader-small border-white mr-2"></div> Salvando...';
    btnElement.disabled = true;

    try {
        await authenticatedFetch(`/api/admin/tenants/${tenantId}`, { method: 'PUT', body: JSON.stringify(payload) });
        showNotification('Sucesso', 'Cadastro do cliente salvo com sucesso.', 'success');
        
        // Atualiza estado local e re-renderiza
        const tIdx = localState.tenants.findIndex(t => t.id === tenantId);
        if(tIdx > -1) {
            localState.tenants[tIdx] = { ...localState.tenants[tIdx], ...payload, document: payload.documentInfo };
            renderTenantsTable();
        }
        closePanel();

    } catch (error) {
        showNotification('Erro', error.message, 'error');
        btnElement.innerHTML = originalHTML; btnElement.disabled = false;
    } 
}

async function handleAddManualPayment(companyId) {
    const content = `
        <form id="manual-payment-form" class="space-y-5 bg-white p-1 rounded-2xl">
            <div>
                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Valor Recebido (R$)</label>
                <div class="relative">
                    <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 font-black">R$</span>
                    <input type="number" id="pay-amount" step="0.01" required class="w-full pl-10 p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-black text-lg text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow">
                </div>
            </div>
            <div>
                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Data do Pagamento</label>
                <input type="date" id="pay-date" required value="${new Date().toISOString().split('T')[0]}" class="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow">
            </div>
            <div>
                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Forma de Pagamento</label>
                <select id="pay-method" class="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer transition-shadow">
                    <option value="pix">PIX</option>
                    <option value="cartao">Cartão de Crédito</option>
                    <option value="boleto">Boleto Bancário</option>
                    <option value="manual">Manual / Transferência</option>
                </select>
            </div>
            <button type="submit" class="w-full py-4 mt-4 bg-emerald-600 text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-emerald-700 shadow-md active:scale-95 transition-transform flex justify-center items-center gap-2">
                <i class="bi bi-check2-circle text-lg"></i> Confirmar Fatura Paga
            </button>
        </form>
    `;

    const { modalElement, close } = showGenericModal({ title: "Registar Fatura Paga", contentHTML: content, maxWidth: 'max-w-sm' });
    
    modalElement.querySelector('#manual-payment-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btnSubmit = e.target.querySelector('button[type="submit"]');
        const originalText = btnSubmit.innerHTML;
        btnSubmit.innerHTML = '<div class="loader-small border-white"></div>';
        btnSubmit.disabled = true;

        const payload = {
            amount: document.getElementById('pay-amount').value,
            paymentDate: document.getElementById('pay-date').value,
            paymentMethod: document.getElementById('pay-method').value,
            status: 'paid'
        };

        try {
            await authenticatedFetch(`/api/admin/tenants/${companyId}/payments`, { method: 'POST', body: JSON.stringify(payload) });
            showNotification('Sucesso', 'Pagamento registado. O vencimento foi adiado em 1 mês.', 'success');
            close();
            
            await fetchTenants(); // Atualiza vencimentos na tabela
            fetchPayments(companyId); // Atualiza aba local

        } catch (error) { 
            showNotification('Erro', error.message, 'error'); 
            btnSubmit.innerHTML = originalText;
            btnSubmit.disabled = false;
        }
    });
}

async function handleDeleteTenant(tenantId) {
    const confirmed = await showConfirmation(
        'Atenção MÁXIMA!', 
        'Deseja excluir DEFINITIVAMENTE este cliente? A conta ficará invisível, o acesso será bloqueado e ele desaparecerá desta tabela.',
        'Sim, excluir'
    );
    if (!confirmed) return;

    try {
        await authenticatedFetch(`/api/admin/tenants/${tenantId}/status`, { method: 'PATCH', body: JSON.stringify({ status: 'deleted' }) });
        showNotification('Sucesso', `Ambiente excluído com sucesso.`, 'success');
        
        // Remove do estado local e redesenha a tabela sem fechar outras coisas
        localState.tenants = localState.tenants.filter(t => t.id !== tenantId);
        renderTenantsTable();
    } catch (error) {
        showNotification('Erro', error.message, 'error'); 
    }
}

async function handleToggleStatus(btnElement) {
    const tenantId = btnElement.dataset.id;
    const newStatus = (btnElement.dataset.current === 'inactive' || btnElement.dataset.current === 'blocked' || btnElement.dataset.current === 'deleted') ? 'active' : 'blocked';
    
    const confirmed = await showConfirmation('Zona de Risco', `Deseja realmente ${newStatus === 'blocked' ? 'BLOQUEAR' : 'DESBLOQUEAR'} o acesso de toda esta rede?`);
    if (!confirmed) return;

    const originalHTML = btnElement.innerHTML;
    btnElement.innerHTML = '<div class="loader-small mx-auto border-white"></div>';
    btnElement.disabled = true;

    try {
        await authenticatedFetch(`/api/admin/tenants/${tenantId}/status`, { method: 'PATCH', body: JSON.stringify({ status: newStatus }) });
        showNotification('Sucesso', `Ambiente ${newStatus === 'blocked' ? 'bloqueado' : 'ativado'}.`, 'success');
        closePanel(); 
        await fetchTenants();
    } catch (error) {
        showNotification('Erro', error.message, 'error'); 
        btnElement.innerHTML = originalHTML; 
        btnElement.disabled = false;
    }
}

async function handleImpersonate(btnElement) {
    const tenantId = btnElement.dataset.id;
    const btnOriginalText = btnElement.innerHTML;
    btnElement.innerHTML = '<div class="loader-small border-brand-600 mr-2"></div> Acedendo...';
    btnElement.disabled = true;

    try {
        const response = await authenticatedFetch(`/api/admin/tenants/${tenantId}/impersonate`, { method: 'POST' });
        if (response && response.token) {
            localStorage.setItem('impersonateToken', response.token);
            showNotification('Conectado', 'A redirecionar...', 'info');
            setTimeout(() => {
                window.open('/app.html', '_blank');
                btnElement.innerHTML = btnOriginalText; btnElement.disabled = false;
            }, 1000);
        }
    } catch (error) {
        showNotification('Acesso Recusado', error.message, 'error');
        btnElement.innerHTML = btnOriginalText; btnElement.disabled = false;
    }
}

// ============================================================================
// 🖱️ 6. DELEGAÇÃO DE EVENTOS GLOBAIS
// ============================================================================

function setupEventListeners(container) {
    if (pageEventListener) container.removeEventListener('click', pageEventListener);

    let searchTimeout;
    container.addEventListener('input', (e) => {
        if (e.target.id === 'search-tenant-input') {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => { localState.searchQuery = e.target.value; localState.currentPage = 1; fetchTenants(); }, 500);
        }
    });

    pageEventListener = (e) => {
        // Fechar Modal (via Overlay ou botões explícitos)
        if (e.target.id === 'slide-panel-overlay') { closePanel(); return; }

        // Navegação de Abas
        const tabBtn = e.target.closest('.panel-tab');
        if (tabBtn) {
            localState.activeTab = tabBtn.dataset.tab;
            const tenantId = document.querySelector('[data-action="update-tenant"], [data-action="toggle-status"], [data-action="add-manual-payment"]')?.dataset.id;
            if (tenantId) {
                const tenant = localState.tenants.find(t => t.id === tenantId);
                const planOptions = localState.plans.map(p => `<option value="${p.id}">${escapeHTML(p.name)}</option>`).join('');
                renderViewTabs(tenant, planOptions);
            }
            return;
        }

        // Botões de Ação
        const actionBtn = e.target.closest('[data-action], #btn-open-wizard, #btn-refresh-table, #btn-close-panel');
        if (!actionBtn) return;

        // Botões Básicos Sem Dataset Action
        if (actionBtn.id === 'btn-open-wizard') { openPanel('create'); return; }
        if (actionBtn.id === 'btn-refresh-table') { fetchTenants(); return; }
        if (actionBtn.id === 'btn-close-panel') { closePanel(); return; }

        const action = actionBtn.dataset.action;

        // Previne bubbling em botões aninhados na tabela
        if (action === 'delete-tenant') {
            e.stopPropagation();
            handleDeleteTenant(actionBtn.dataset.id);
            return;
        }

        e.preventDefault();
        
        switch(action) {
            case 'close-panel': closePanel(); break;
            case 'view-tenant': openPanel('view', actionBtn.dataset.id); break;
            case 'submit-wizard': handleCreateTenant(actionBtn); break;
            case 'update-tenant': handleUpdateTenant(actionBtn); break;
            case 'toggle-status': handleToggleStatus(actionBtn); break;
            case 'impersonate': handleImpersonate(actionBtn); break;
            case 'add-manual-payment': handleAddManualPayment(actionBtn.dataset.id); break;
            case 'prev-page': if (localState.currentPage > 1) { localState.currentPage--; fetchTenants(); } break;
            case 'next-page': if (localState.currentPage < localState.totalPages) { localState.currentPage++; fetchTenants(); } break;
        }
    };

    container.addEventListener('click', pageEventListener);
}