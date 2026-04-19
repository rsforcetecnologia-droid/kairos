// js/admin/super-establishments.js

import { authenticatedFetch } from '../api/apiService.js';
import { showNotification, showConfirmation } from '../components/modal.js';
import { escapeHTML } from '../utils.js'; // <-- IMPORTAÇÃO CORRIGIDA

let localState = {
    tenants: [],
    plans: [],
    searchQuery: '',
    currentPage: 1,
    limit: 20,
    totalPages: 1
};

export async function loadEstablishments(container) {
    renderBaseLayout(container);
    setupEventListeners(container);
    
    // Carrega dados em paralelo
    await Promise.all([
        fetchPlans(),
        fetchTenants()
    ]);
}

// ============================================================================
// 🎨 1. RENDERIZAÇÃO DO LAYOUT (TAILWIND CSS)
// ============================================================================

function renderBaseLayout(container) {
    container.innerHTML = `
        <div class="h-full flex flex-col w-full relative font-sans animate-fade-in">
            
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h2 class="text-2xl font-black text-slate-800 tracking-tight">Gestão de Inquilinos (Redes)</h2>
                    <p class="text-sm text-slate-500 font-medium mt-1">Gira os clientes da plataforma, planos e acessos Master.</p>
                </div>
                <button id="btn-open-wizard" class="bg-brand-600 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-brand-700 shadow-md shadow-brand-500/30 active:scale-95 transition-all flex items-center gap-2">
                    <i class="bi bi-building-add text-lg"></i> Novo Cliente (Rede)
                </button>
            </div>

            <div class="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 mb-4 flex items-center">
                <i class="bi bi-search text-slate-400 ml-3 text-lg"></i>
                <input type="text" id="search-tenant-input" placeholder="Pesquisar por nome da empresa, NIF, email..." class="w-full bg-transparent border-none p-3 outline-none text-sm font-bold text-slate-700 placeholder-slate-400">
                <div class="border-l border-slate-200 pl-2 ml-2">
                    <button id="btn-refresh-table" class="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-colors">
                        <i class="bi bi-arrow-clockwise text-lg"></i>
                    </button>
                </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-1 flex flex-col min-h-0">
                <div class="overflow-x-auto flex-1 custom-scrollbar">
                    <table class="w-full text-left border-collapse whitespace-nowrap">
                        <thead class="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
                            <tr>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Empresa (Rede)</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Responsável (Master)</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Plano SaaS</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Status</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody id="tenants-table-body" class="divide-y divide-slate-100">
                            <tr>
                                <td colspan="5" class="py-16 text-center text-slate-400">
                                    <div class="loader mx-auto mb-3 border-brand-500"></div>
                                    <p class="text-xs font-bold uppercase tracking-widest">A carregar Inquilinos...</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="pagination-container" class="bg-slate-50 border-t border-slate-200 p-3 flex justify-between items-center px-6"></div>
            </div>

            <div id="slide-panel-overlay" class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 hidden opacity-0 transition-opacity duration-300"></div>

            <div id="slide-panel" class="fixed top-0 right-0 h-full w-full max-w-[500px] bg-white z-50 shadow-[-10px_0_30px_rgba(0,0,0,0.1)] transform translate-x-full transition-transform duration-300 flex flex-col">
                <div class="px-6 py-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                    <div>
                        <h3 id="panel-title" class="text-lg font-black text-slate-800 tracking-tight">Novo Inquilino</h3>
                        <p id="panel-subtitle" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Configuração de Ambiente</p>
                    </div>
                    <button id="btn-close-panel" class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors active:scale-95">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                
                <div id="panel-content" class="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    </div>
                
                <div id="panel-footer" class="p-5 border-t border-slate-200 bg-slate-50 flex gap-3 justify-end">
                    </div>
            </div>
        </div>
    `;
}

// ============================================================================
// 📡 2. COMUNICAÇÃO COM O BACKEND (API REST)
// ============================================================================

async function fetchPlans() {
    try {
        const plans = await authenticatedFetch('/api/admin/plans');
        localState.plans = plans || [];
    } catch (error) {
        console.error("Erro ao buscar planos:", error);
        showNotification('Erro', 'Falha ao carregar a lista de planos SaaS do sistema.', 'error');
    }
}

async function fetchTenants() {
    const tbody = document.getElementById('tenants-table-body');
    const pagination = document.getElementById('pagination-container');
    
    if (tbody) {
        tbody.innerHTML = `<tr><td colspan="5" class="py-12 text-center"><div class="loader mx-auto border-brand-500 mb-2"></div><p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Atualizando...</p></td></tr>`;
    }

    try {
        let url = `/api/admin/tenants?page=${localState.currentPage}&limit=${localState.limit}`;
        if (localState.searchQuery) url += `&search=${encodeURIComponent(localState.searchQuery)}`;

        const response = await authenticatedFetch(url);
        
        localState.tenants = response.data || [];
        localState.totalPages = response.pagination.totalPages || 1;
        
        renderTenantsTable();
        renderPagination(pagination);
    } catch (error) {
        console.error("Erro ao buscar inquilinos:", error);
        if (tbody) tbody.innerHTML = `<tr><td colspan="5" class="py-12 text-center text-rose-500 font-bold text-sm"><i class="bi bi-exclamation-triangle block text-2xl mb-2"></i> Erro ao carregar os clientes.</td></tr>`;
    }
}

// ============================================================================
// 🖼️ 3. RENDERIZAÇÃO DE COMPONENTES
// ============================================================================

function renderTenantsTable() {
    const tbody = document.getElementById('tenants-table-body');
    if (!tbody) return;

    if (localState.tenants.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="py-16 text-center">
                    <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300 text-2xl"><i class="bi bi-buildings"></i></div>
                    <p class="text-sm font-bold text-slate-600">Nenhum cliente encontrado.</p>
                    <p class="text-xs text-slate-400 mt-1">Tente pesquisar com outro termo ou cadastre uma nova rede.</p>
                </td>
            </tr>`;
        return;
    }

    // Mapa para o nome dos planos para exibição amigável
    const plansMap = new Map(localState.plans.map(p => [p.id, p.name]));

    const html = localState.tenants.map(tenant => {
        const isBlocked = tenant.status === 'inactive' || tenant.status === 'blocked';
        const statusBadge = isBlocked 
            ? `<span class="bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest"><i class="bi bi-lock-fill mr-1"></i> Bloqueado</span>`
            : `<span class="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest"><i class="bi bi-check-circle-fill mr-1"></i> Ativo</span>`;

        const planName = plansMap.get(tenant.planId) || 'Plano Personalizado';
        
        return `
            <tr class="hover:bg-slate-50 transition-colors group cursor-pointer" data-action="view-tenant" data-id="${tenant.id}">
                <td class="p-4">
                    <p class="text-sm font-bold text-slate-800 group-hover:text-brand-600 transition-colors">${escapeHTML(tenant.name)}</p>
                    <p class="text-[10px] text-slate-500 font-semibold mt-0.5"><i class="bi bi-file-earmark-text mr-1 opacity-50"></i>NIF/CNPJ: ${escapeHTML(tenant.document || 'Não ind.')}</p>
                </td>
                <td class="p-4">
                    <p class="text-xs font-bold text-slate-700"><i class="bi bi-person-fill mr-1 text-slate-400"></i> ${escapeHTML(tenant.ownerEmail || 'Desconhecido')}</p>
                </td>
                <td class="p-4 text-center">
                    <span class="bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm">${escapeHTML(planName)}</span>
                </td>
                <td class="p-4 text-center">${statusBadge}</td>
                <td class="p-4 text-right">
                    <button class="bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 transition-all active:scale-95">
                        Gerir
                    </button>
                </td>
            </tr>
        `;
    }).join('');

    tbody.innerHTML = html;
}

function renderPagination(container) {
    if (!container) return;
    if (localState.totalPages <= 1) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = `
        <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pág. ${localState.currentPage} de ${localState.totalPages}</span>
        <div class="flex gap-2">
            <button data-action="prev-page" class="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm disabled:opacity-50 transition-colors" ${localState.currentPage <= 1 ? 'disabled' : ''}>
                <i class="bi bi-chevron-left"></i>
            </button>
            <button data-action="next-page" class="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm disabled:opacity-50 transition-colors" ${localState.currentPage >= localState.totalPages ? 'disabled' : ''}>
                <i class="bi bi-chevron-right"></i>
            </button>
        </div>
    `;
}

// ============================================================================
// 🧙‍♂️ 4. WIZARD E PAINEL LATERAL (SIDE PANEL)
// ============================================================================

function openPanel(mode, tenantId = null) {
    const overlay = document.getElementById('slide-panel-overlay');
    const panel = document.getElementById('slide-panel');
    const title = document.getElementById('panel-title');
    const content = document.getElementById('panel-content');
    const footer = document.getElementById('panel-footer');

    overlay.classList.remove('hidden');
    
    // Pequeno delay para a transição do CSS atuar
    requestAnimationFrame(() => {
        overlay.classList.remove('opacity-0');
        panel.classList.remove('translate-x-full');
    });

    if (mode === 'create') {
        title.innerText = 'Nova Assinatura (SaaS)';
        
        const planOptions = localState.plans.map(p => `<option value="${p.id}">${escapeHTML(p.name)} - (Max: ${p.maxEstablishments} Lojas)</option>`).join('');

        content.innerHTML = `
            <form id="wizard-form" class="space-y-6">
                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <h4 class="text-[10px] font-black text-brand-600 uppercase tracking-widest mb-4 flex items-center gap-2"><i class="bi bi-1-circle-fill text-sm"></i> Dados da Empresa</h4>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Nome Fantasia / Rede *</label>
                            <input type="text" id="wiz-company" required class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-sm font-bold text-slate-800 transition-shadow">
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">NIF / CNPJ (Opcional)</label>
                            <input type="text" id="wiz-doc" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-sm font-bold text-slate-800 transition-shadow">
                        </div>
                    </div>
                </div>

                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <h4 class="text-[10px] font-black text-brand-600 uppercase tracking-widest mb-4 flex items-center gap-2"><i class="bi bi-2-circle-fill text-sm"></i> Acesso Master (Dono)</h4>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Nome do Proprietário *</label>
                            <input type="text" id="wiz-name" required class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-sm font-bold text-slate-800 transition-shadow">
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">E-mail (Login) *</label>
                            <input type="email" id="wiz-email" required class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-sm font-bold text-slate-800 transition-shadow">
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Senha Inicial *</label>
                                <input type="text" id="wiz-password" required value="kairos123" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-sm font-bold text-slate-800 transition-shadow">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">WhatsApp</label>
                                <input type="text" id="wiz-phone" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-sm font-bold text-slate-800 transition-shadow">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-brand-500">
                    <h4 class="text-[10px] font-black text-brand-600 uppercase tracking-widest mb-4 flex items-center gap-2"><i class="bi bi-3-circle-fill text-sm"></i> Faturação e Limites</h4>
                    <div>
                        <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Plano Base *</label>
                        <select id="wiz-plan" required class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-sm font-bold text-slate-800 transition-shadow cursor-pointer">
                            <option value="">Selecione o plano...</option>
                            ${planOptions}
                        </select>
                        <p class="text-[9px] text-slate-400 mt-2 ml-1 font-medium"><i class="bi bi-info-circle"></i> O plano define quantos estabelecimentos (filiais) este cliente pode criar no sistema dele.</p>
                    </div>
                </div>
            </form>
        `;

        footer.innerHTML = `
            <button data-action="close-panel" class="px-5 py-3 rounded-xl font-bold text-sm text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 transition-colors">Cancelar</button>
            <button data-action="submit-wizard" class="px-6 py-3 rounded-xl font-bold text-sm text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/30 transition-all flex items-center gap-2 active:scale-95">
                <i class="bi bi-check2-circle text-lg"></i> Criar Inquilino (Tenant)
            </button>
        `;
    } 
    else if (mode === 'view' && tenantId) {
        const tenant = localState.tenants.find(t => t.id === tenantId);
        if(!tenant) return;

        title.innerText = 'Detalhes do Inquilino';
        const isBlocked = tenant.status === 'inactive' || tenant.status === 'blocked';
        const planName = localState.plans.find(p => p.id === tenant.planId)?.name || 'Plano Personalizado';
        
        content.innerHTML = `
            <div class="text-center mb-8">
                <div class="w-20 h-20 bg-slate-100 rounded-2xl mx-auto flex items-center justify-center text-3xl text-slate-300 border border-slate-200 shadow-inner mb-4">
                    <i class="bi bi-buildings-fill"></i>
                </div>
                <h2 class="text-xl font-black text-slate-800 tracking-tight">${escapeHTML(tenant.name)}</h2>
                <p class="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest bg-slate-100 inline-block px-3 py-1 rounded-full border border-slate-200">Plano: ${escapeHTML(planName)}</p>
            </div>

            <div class="space-y-4">
                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div class="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0"><i class="bi bi-person-fill text-lg"></i></div>
                    <div class="flex-1 min-w-0">
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Dono / Responsável</p>
                        <p class="text-sm font-bold text-slate-800 truncate">${escapeHTML(tenant.ownerEmail)}</p>
                    </div>
                </div>

                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div class="w-10 h-10 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center flex-shrink-0"><i class="bi bi-file-earmark-text text-lg"></i></div>
                    <div class="flex-1 min-w-0">
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">NIF / CNPJ</p>
                        <p class="text-sm font-bold text-slate-800 truncate">${escapeHTML(tenant.document || 'Não fornecido')}</p>
                    </div>
                </div>

                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div class="w-10 h-10 rounded-full ${isBlocked ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'} flex items-center justify-center flex-shrink-0">
                        <i class="bi ${isBlocked ? 'bi-lock-fill' : 'bi-check-circle-fill'} text-lg"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Status do Sistema</p>
                        <p class="text-sm font-black ${isBlocked ? 'text-rose-600' : 'text-emerald-600'} truncate uppercase tracking-widest">${isBlocked ? 'Acesso Suspenso' : 'Ambiente Ativo'}</p>
                    </div>
                </div>
            </div>

            <div class="mt-8 bg-indigo-50 border border-indigo-100 rounded-2xl p-5 shadow-sm">
                <h4 class="text-xs font-black text-indigo-800 uppercase tracking-widest mb-2 flex items-center gap-2"><i class="bi bi-headset"></i> Modo de Suporte</h4>
                <p class="text-[10px] text-indigo-600 font-medium mb-4 leading-relaxed">Assuma a identidade deste cliente temporariamente. O painel será aberto exatamente como o cliente o vê, permitindo-lhe investigar problemas ou configurar o ambiente para ele.</p>
                <button data-action="impersonate" data-id="${tenant.id}" class="w-full py-3.5 bg-white border border-indigo-200 text-indigo-700 font-black rounded-xl hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95">
                    <i class="bi bi-box-arrow-in-right text-lg"></i> Entrar como o Cliente
                </button>
            </div>
        `;

        footer.innerHTML = `
            <button data-action="close-panel" class="px-5 py-3 rounded-xl font-bold text-sm text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 transition-colors">Fechar</button>
            <button data-action="toggle-status" data-id="${tenant.id}" data-current="${tenant.status}" class="px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95 flex items-center gap-2 ${isBlocked ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-rose-100 text-rose-700 border border-rose-200 hover:bg-rose-200'}">
                <i class="bi ${isBlocked ? 'bi-unlock-fill' : 'bi-lock-fill'}"></i> ${isBlocked ? 'Restaurar Acesso' : 'Suspender Cliente'}
            </button>
        `;
    }
}

function closePanel() {
    const overlay = document.getElementById('slide-panel-overlay');
    const panel = document.getElementById('slide-panel');
    
    panel.classList.add('translate-x-full');
    overlay.classList.add('opacity-0');
    
    setTimeout(() => {
        overlay.classList.add('hidden');
    }, 300); // Aguarda o CSS transition terminar
}

// ============================================================================
// ⚡ 5. CONTROLOS E EVENTOS DE ACÇÃO
// ============================================================================

async function handleCreateTenant(btnElement) {
    const form = document.getElementById('wizard-form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const payload = {
        companyName: document.getElementById('wiz-company').value,
        documentInfo: document.getElementById('wiz-doc').value,
        adminName: document.getElementById('wiz-name').value,
        adminEmail: document.getElementById('wiz-email').value,
        adminPassword: document.getElementById('wiz-password').value,
        adminPhone: document.getElementById('wiz-phone').value,
        planId: document.getElementById('wiz-plan').value,
    };

    const originalHTML = btnElement.innerHTML;
    btnElement.innerHTML = '<div class="loader-small border-white mr-2"></div> Criando Ambiente...';
    btnElement.disabled = true;

    try {
        const response = await authenticatedFetch('/api/admin/tenants', {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        showNotification('Fantástico!', `A rede de ${payload.companyName} foi criada e o utilizador Master já tem acesso.`, 'success');
        closePanel();
        await fetchTenants();

    } catch (error) {
        showNotification('Erro na Criação', error.message, 'error');
        btnElement.innerHTML = originalHTML;
        btnElement.disabled = false;
    }
}

async function handleToggleStatus(btnElement) {
    const tenantId = btnElement.dataset.id;
    const currentStatus = btnElement.dataset.current;
    const newStatus = (currentStatus === 'inactive' || currentStatus === 'blocked') ? 'active' : 'blocked';
    const actionName = newStatus === 'blocked' ? 'BLOQUEAR' : 'DESBLOQUEAR';

    const confirmed = await showConfirmation('Alterar Status do Cliente', `Deseja realmente ${actionName} esta rede? Isso afetará todas as filiais ligadas a esta conta e desconectará o cliente.`);
    if (!confirmed) return;

    try {
        const btnOriginalText = btnElement.innerHTML;
        btnElement.innerHTML = '<div class="loader-small mx-auto border-current"></div>';
        btnElement.disabled = true;

        await authenticatedFetch(`/api/admin/tenants/${tenantId}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status: newStatus })
        });

        showNotification('Sucesso', `O ambiente foi ${newStatus === 'blocked' ? 'bloqueado' : 'ativado'}.`, 'success');
        closePanel();
        await fetchTenants();
    } catch (error) {
        showNotification('Erro', error.message, 'error');
        closePanel();
    }
}

async function handleImpersonate(btnElement) {
    const tenantId = btnElement.dataset.id;

    try {
        const btnOriginalText = btnElement.innerHTML;
        btnElement.innerHTML = '<div class="loader-small border-indigo-600 mr-2"></div> Conectando...';
        btnElement.disabled = true;

        const response = await authenticatedFetch(`/api/admin/tenants/${tenantId}/impersonate`, {
            method: 'POST'
        });

        if (response && response.token) {
            // Guardamos o token especial emitido pelo nosso backend no localstorage
            // O frontend do app.html (login/verificação) deve intercetar isto.
            localStorage.setItem('impersonateToken', response.token);
            
            showNotification('Conectado', 'A redirecionar para o painel do cliente...', 'info');
            setTimeout(() => {
                window.open('/app.html', '_blank');
                btnElement.innerHTML = btnOriginalText;
                btnElement.disabled = false;
            }, 1000);
        }

    } catch (error) {
        showNotification('Acesso Recusado', error.message, 'error');
        btnElement.innerHTML = '<i class="bi bi-box-arrow-in-right text-lg"></i> Entrar como o Cliente';
        btnElement.disabled = false;
    }
}

// Setup global de Event Listeners da página
function setupEventListeners(container) {
    
    // Pesquisa com Debounce
    let searchTimeout;
    container.addEventListener('input', (e) => {
        if (e.target.id === 'search-tenant-input') {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                localState.searchQuery = e.target.value;
                localState.currentPage = 1;
                fetchTenants();
            }, 500);
        }
    });

    container.addEventListener('click', (e) => {
        // Interceptador global para [data-action]
        const actionBtn = e.target.closest('[data-action]');
        
        if (actionBtn) {
            e.preventDefault();
            const action = actionBtn.dataset.action;

            switch(action) {
                case 'close-panel':
                    closePanel();
                    break;
                case 'view-tenant':
                    openPanel('view', actionBtn.dataset.id);
                    break;
                case 'submit-wizard':
                    handleCreateTenant(actionBtn);
                    break;
                case 'toggle-status':
                    handleToggleStatus(actionBtn);
                    break;
                case 'impersonate':
                    handleImpersonate(actionBtn);
                    break;
                case 'prev-page':
                    if (localState.currentPage > 1) {
                        localState.currentPage--;
                        fetchTenants();
                    }
                    break;
                case 'next-page':
                    if (localState.currentPage < localState.totalPages) {
                        localState.currentPage++;
                        fetchTenants();
                    }
                    break;
            }
            return; // Se processámos uma action, saímos do listener
        }

        // Botões avulsos sem data-action (legacy ou específicos)
        const btnOpenWizard = e.target.closest('#btn-open-wizard');
        if (btnOpenWizard) {
            openPanel('create');
            return;
        }

        const btnRefresh = e.target.closest('#btn-refresh-table');
        if (btnRefresh) {
            fetchTenants();
            return;
        }

        // Fecha o painel se clicar no overlay opaco fora dele
        if (e.target.id === 'slide-panel-overlay') {
            closePanel();
        }
    });
}