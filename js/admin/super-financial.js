// js/admin/super-financial.js

import { authenticatedFetch } from '../api/apiService.js';
import { showNotification, showConfirmation } from '../components/modal.js';
import { escapeHTML } from '../utils.js';

// Mapeamento Oficial de TODOS os Módulos do Sistema
const SYSTEM_MODULES = {
    'dashboard': 'Visão Geral (Dashboard)',
    'agenda': 'Agenda / Calendário',
    'comandas': 'Comandas / PDV',
    'relatorios': 'Relatórios (Analytics)',
    'sales-report': 'Relatório de Vendas',
    'financial': 'Financeiro',
    'servicos': 'Serviços',
    'produtos': 'Produtos',
    'suppliers': 'Fornecedores',
    'profissionais': 'Profissionais',
    'ausencias': 'Ausências e Bloqueios',
    'clientes': 'Clientes',
    'packages': 'Pacotes de Serviços',
    'commissions': 'Comissões',
    'estabelecimento': 'Configurações',
    'users': 'Usuários Internos',
    'whatsapp': 'Integração WhatsApp', 
    'mobileApp': 'Acesso App Mobile'
};

let localState = {
    plans: [],
    tempPlanId: null
};

// Variável para guardar a referência do listener e evitar duplicação no SPA
let pageEventListener = null;

export async function loadFinancial(container) {
    renderBaseLayout(container);
    setupEvents(container);
    await fetchPlans();
}

// ============================================================================
// 🎨 1. RENDERIZAÇÃO DO LAYOUT (TAILWIND CSS)
// ============================================================================

function renderBaseLayout(container) {
    container.innerHTML = `
        <div class="h-full flex flex-col w-full relative font-sans animate-fade-in pb-[100px] md:pb-6">
            
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h2 class="text-2xl font-black text-slate-800 tracking-tight">Planos SaaS & Faturação</h2>
                    <p class="text-sm text-slate-500 font-medium mt-1">Crie as regras de negócio, preços e limites do seu software.</p>
                </div>
                <button id="btn-new-plan" class="bg-emerald-600 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-emerald-700 shadow-md shadow-emerald-500/30 active:scale-95 transition-all flex items-center gap-2">
                    <i class="bi bi-plus-circle-fill text-lg"></i> Novo Plano
                </button>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                <div class="overflow-x-auto custom-scrollbar">
                    <table class="w-full text-left border-collapse whitespace-nowrap">
                        <thead class="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nome do Plano</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Preço</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Ciclo</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Trial</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Limites (Lojas/Usr/Prof)</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Status</th>
                                <th class="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody id="plans-table-body" class="divide-y divide-slate-100">
                            <tr>
                                <td colspan="7" class="py-16 text-center text-slate-400">
                                    <div class="loader mx-auto mb-3 border-emerald-500"></div>
                                    <p class="text-xs font-bold uppercase tracking-widest">A carregar Planos...</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div id="plan-modal" class="hidden fixed inset-0 z-[99999] bg-slate-900/60 backdrop-blur-sm flex-col items-center justify-center opacity-0 transition-opacity duration-300 md:p-6 p-3">
                <div id="modal-content-wrapper" class="w-full max-w-2xl bg-white flex flex-col transform transition-all duration-300 translate-y-full md:translate-y-8 md:scale-95 opacity-0 rounded-3xl overflow-hidden shadow-2xl relative max-h-full">
                    
                    <header class="bg-emerald-600 border-b border-emerald-700 px-6 py-5 flex items-center justify-between shadow-sm z-20 flex-shrink-0 relative overflow-hidden">
                        <div class="absolute right-[-20px] top-[-20px] opacity-10 pointer-events-none">
                            <i class="bi bi-tag-fill text-9xl text-white"></i>
                        </div>
                        <div class="text-left z-10 relative">
                            <h2 id="modal-title" class="text-xl font-black text-white tracking-tight leading-tight">Novo Plano</h2>
                            <p class="text-[10px] text-emerald-100 font-bold uppercase tracking-widest mt-0.5">Configuração do SaaS</p>
                        </div>
                        <button type="button" id="btn-close-modal" class="w-10 h-10 flex items-center justify-center rounded-full bg-black/10 text-white hover:bg-black/20 active:scale-90 transition-colors z-10 relative">
                            <i class="bi bi-x-lg pointer-events-none"></i>
                        </button>
                    </header>
                    
                    <form id="plan-form" class="flex-grow overflow-y-auto p-6 custom-scrollbar bg-slate-50 space-y-6">
                        
                        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Nome Comercial do Plano *</label>
                                <input type="text" id="plan-name" required class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm font-black text-slate-800 transition-shadow" placeholder="Ex: Profissional, Basic, Enterprise...">
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Preço do Período (R$) *</label>
                                    <div class="relative">
                                        <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 font-black">R$</span>
                                        <input type="number" step="0.01" id="plan-price" required class="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-lg font-black text-slate-800 transition-shadow" placeholder="0.00">
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1" title="Quantas Lojas (Matriz + Filiais) o cliente pode ter?">Máx. Lojas Total *</label>
                                    <input type="number" id="plan-max-ests" required min="1" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-lg font-black text-slate-800 transition-shadow" placeholder="Ex: 1, 3, 999...">
                                </div>
                            </div>

                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1" title="Frequência em que o cliente será cobrado">Ciclo de Cobrança *</label>
                                    <select id="plan-interval" required class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm font-black text-slate-800 transition-shadow cursor-pointer">
                                        <option value="1">Mensal</option>
                                        <option value="6">Semestral</option>
                                        <option value="12">Anual</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1" title="Dias grátis de carência antes do Pagar.me fazer a 1ª cobrança no cartão">Dias de Teste (Trial) *</label>
                                    <input type="number" id="plan-trial" required min="0" value="7" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-lg font-black text-slate-800 transition-shadow" placeholder="Ex: 7">
                                </div>
                            </div>

                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1" title="Quantos usuários administrativos o plano permite?">Máx. Usuários Sistema *</label>
                                    <input type="number" id="plan-max-users" required min="1" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-lg font-black text-slate-800 transition-shadow" placeholder="Ex: 5, 10, 999...">
                                </div>
                                <div>
                                    <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1" title="Quantos profissionais podem ter agenda neste plano?">Máx. Profissionais *</label>
                                    <input type="number" id="plan-max-profs" required min="1" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-lg font-black text-slate-800 transition-shadow" placeholder="Ex: 3, 10, 999...">
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 class="text-[11px] font-black text-emerald-600 uppercase tracking-widest mb-3 ml-1 flex items-center gap-2"><i class="bi bi-grid-1x2-fill"></i> Módulos Liberados no Plano</h3>
                            <p class="text-xs text-slate-500 mb-4 ml-1">Selecione as telas que estarão visíveis para os clientes deste plano.</p>
                            
                            <div id="modules-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm max-h-64 overflow-y-auto custom-scrollbar">
                                </div>
                        </div>
                    </form>

                    <footer class="p-5 bg-white border-t border-slate-200 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.05)] flex justify-end gap-3 z-50 flex-shrink-0">
                        <button type="button" id="btn-cancel-modal" class="px-6 py-3 rounded-xl font-bold text-sm text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 transition-colors uppercase tracking-wider">Cancelar</button>
                        <button type="submit" form="plan-form" id="btn-submit-plan" class="px-8 py-3 rounded-xl font-black text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-500/30 transition-all flex items-center gap-2 active:scale-95 uppercase tracking-wider">
                            <i class="bi bi-save2-fill text-lg"></i> Salvar Plano
                        </button>
                    </footer>
                </div>
            </div>
            
        </div>
    `;
}

// ============================================================================
// 📡 2. COMUNICAÇÃO COM O BACKEND E LÓGICA DE DADOS
// ============================================================================

async function fetchPlans() {
    const tbody = document.getElementById('plans-table-body');
    
    try {
        // CORREÇÃO DE CACHE: Adicionamos "?_t=" com um timestamp para forçar o navegador a trazer dados novos!
        const timestamp = new Date().getTime();
        
        // NOVO: Aponta para a nova rota isolada do SaaS
        const plans = await authenticatedFetch(`/api/saas/plans?_t=${timestamp}`);
        
        localState.plans = plans || [];
        renderTable();
    } catch (error) {
        console.error("Erro ao buscar planos:", error);
        if (tbody) tbody.innerHTML = `<tr><td colspan="7" class="py-12 text-center text-rose-500 font-bold text-sm"><i class="bi bi-exclamation-triangle block text-2xl mb-2"></i> Erro ao carregar os planos.</td></tr>`;
    }
}

function renderTable() {
    const tbody = document.getElementById('plans-table-body');
    if (!tbody) return;

    if (localState.plans.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="py-16 text-center">
                    <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300 text-2xl"><i class="bi bi-tags"></i></div>
                    <p class="text-sm font-bold text-slate-600">Nenhum plano cadastrado.</p>
                    <p class="text-xs text-slate-400 mt-1">Clique em '+ Novo Plano' para criar as regras de venda.</p>
                </td>
            </tr>`;
        return;
    }

    const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    const html = localState.plans.map(plan => {
        const isActive = plan.active !== false;
        const statusBadge = isActive 
            ? `<span class="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest"><i class="bi bi-check-circle-fill mr-1"></i> Ativo</span>`
            : `<span class="bg-slate-100 text-slate-500 border border-slate-200 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest"><i class="bi bi-pause-circle-fill mr-1"></i> Inativo</span>`;

        const intervalText = plan.intervalCount === 12 ? 'Anual' : (plan.intervalCount === 6 ? 'Semestral' : 'Mensal');
        const trialText = plan.trialDays ? `${plan.trialDays} dias` : 'Sem trial';

        return `
            <tr class="hover:bg-slate-50 transition-colors group cursor-pointer" data-action="edit-plan" data-id="${plan.id}">
                <td class="p-4">
                    <p class="text-sm font-black text-slate-800 group-hover:text-emerald-600 transition-colors">${escapeHTML(plan.name)}</p>
                </td>
                <td class="p-4 text-center">
                    <p class="text-lg font-black text-slate-700">${formatter.format(plan.price)}</p>
                </td>
                <td class="p-4 text-center">
                    <span class="inline-block bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest shadow-sm">${intervalText}</span>
                </td>
                <td class="p-4 text-center">
                    <span class="inline-block bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest shadow-sm">${trialText}</span>
                </td>
                <td class="p-4 text-center space-y-1">
                    <span class="inline-block bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest shadow-sm">${plan.maxEstablishments || 1} Lojas</span>
                    <span class="inline-block bg-blue-50 text-blue-700 border border-blue-200 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest shadow-sm">${plan.maxUsers || 1} Usrs</span>
                    <span class="inline-block bg-cyan-50 text-cyan-700 border border-cyan-200 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest shadow-sm">${plan.maxProfessionals || 1} Profs</span>
                </td>
                <td class="p-4 text-center">${statusBadge}</td>
                <td class="p-4 text-right">
                    <button data-action="delete-plan" data-id="${plan.id}" class="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 shadow-sm transition-all active:scale-95 ml-auto">
                        <i class="bi bi-trash3 pointer-events-none"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');

    tbody.innerHTML = html;
}

// ============================================================================
// ⚡ 3. CONTROLO DO MODAL E EVENTOS
// ============================================================================

function openModal(planId = null) {
    localState.tempPlanId = planId;
    const modal = document.getElementById('plan-modal');
    const form = document.getElementById('plan-form');
    form.reset();

    const isEditing = !!planId;
    document.getElementById('modal-title').innerText = isEditing ? "Editar Plano SaaS" : "Novo Plano SaaS";

    const planData = isEditing ? localState.plans.find(p => p.id === planId) : null;

    document.getElementById('plan-name').value = planData ? planData.name : '';
    document.getElementById('plan-price').value = planData ? planData.price : '';
    document.getElementById('plan-max-ests').value = planData ? (planData.maxEstablishments || 1) : 1;
    document.getElementById('plan-max-users').value = planData ? (planData.maxUsers || 1) : 1;
    document.getElementById('plan-max-profs').value = planData ? (planData.maxProfessionals || 1) : 1;
    
    // Configura os novos campos 
    document.getElementById('plan-interval').value = planData ? (planData.intervalCount || 1) : 1;
    document.getElementById('plan-trial').value = planData && planData.trialDays !== undefined ? planData.trialDays : 7;

    // Gerar os checkboxes dos módulos
    const modulesGrid = document.getElementById('modules-grid');
    const allowedModules = planData?.features || planData?.allowedModules || {};
    
    const modulesMap = Array.isArray(allowedModules) 
        ? allowedModules.reduce((acc, curr) => ({...acc, [curr]: true}), {}) 
        : allowedModules;

    modulesGrid.innerHTML = Object.entries(SYSTEM_MODULES).map(([key, label]) => {
        const isChecked = (!isEditing || modulesMap[key]) ? 'checked' : '';
        return `
            <label class="flex items-center p-3 border border-slate-200 rounded-xl cursor-pointer transition-colors hover:bg-emerald-50/50 hover:border-emerald-300 group shadow-sm bg-slate-50">
                <input type="checkbox" name="plan-modules" value="${key}" ${isChecked} class="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 cursor-pointer">
                <span class="text-xs font-bold text-slate-700 ml-3 group-hover:text-emerald-800">${label}</span>
            </label>
        `;
    }).join('');

    // Animação de abertura suave
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    
    requestAnimationFrame(() => {
        modal.classList.remove('opacity-0');
        const wrapper = modal.querySelector('#modal-content-wrapper');
        if (wrapper) {
            wrapper.classList.remove('translate-y-full', 'md:translate-y-8', 'md:scale-95', 'opacity-0');
            wrapper.classList.add('translate-y-0', 'md:scale-100', 'opacity-100');
        }
    });
}

function closeModal() {
    const modal = document.getElementById('plan-modal');
    if (!modal) return;
    
    modal.classList.add('opacity-0');
    const wrapper = modal.querySelector('#modal-content-wrapper');
    if (wrapper) {
        wrapper.classList.remove('translate-y-0', 'md:scale-100', 'opacity-100');
        wrapper.classList.add('translate-y-full', 'md:translate-y-8', 'md:scale-95', 'opacity-0');
    }
    
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        localState.tempPlanId = null;
    }, 300); 
}

async function savePlan(e) {
    e.preventDefault();
    const btnSubmit = document.getElementById('btn-submit-plan');
    const originalText = btnSubmit.innerHTML;
    
    btnSubmit.innerHTML = '<div class="loader-small border-white mr-2"></div> Salvando...';
    btnSubmit.disabled = true;

    // Lê os módulos selecionados
    const featuresArray = [];
    document.querySelectorAll('input[name="plan-modules"]:checked').forEach(checkbox => {
        featuresArray.push(checkbox.value);
    });

    const payload = {
        name: document.getElementById('plan-name').value,
        price: parseFloat(document.getElementById('plan-price').value),
        intervalCount: parseInt(document.getElementById('plan-interval').value, 10), // NOVO
        trialDays: parseInt(document.getElementById('plan-trial').value, 10),       // NOVO
        maxEstablishments: parseInt(document.getElementById('plan-max-ests').value, 10),
        maxUsers: parseInt(document.getElementById('plan-max-users').value, 10),
        maxProfessionals: parseInt(document.getElementById('plan-max-profs').value, 10),
        allowedModules: featuresArray, 
        features: featuresArray 
    };

    try {
        if (localState.tempPlanId) {
            // Atualiza via API
            await authenticatedFetch(`/api/saas/plans/${localState.tempPlanId}`, { 
                method: 'PUT', 
                body: JSON.stringify(payload) 
            });
            showNotification('Sucesso!', 'Plano atualizado com sucesso.', 'success');
        } else {
            // Cria via API (A API fará a chamada ao Pagar.me com o interval_count)
            await authenticatedFetch('/api/saas/plans', {
                method: 'POST',
                body: JSON.stringify(payload)
            });
            showNotification('Sucesso!', 'Plano criado com sucesso no SaaS e no Pagar.me.', 'success');
        }

        closeModal();
        await fetchPlans(); 

    } catch (error) {
        console.error("Erro ao salvar plano:", error);
        showNotification('Erro', error.message || "Erro ao salvar o plano.", 'error');
    } finally {
        btnSubmit.innerHTML = originalText;
        btnSubmit.disabled = false;
    }
}

async function deletePlan(planId) {
    const confirmed = await showConfirmation(
        'Apagar Plano', 
        'Deseja realmente apagar este plano? Clientes antigos continuarão a utilizá-lo, mas não estará disponível para novas vendas.'
    );
    
    if (!confirmed) return;

    try {
        await authenticatedFetch(`/api/saas/plans/${planId}`, { method: 'DELETE' });
        showNotification('Sucesso', 'Plano apagado.', 'success');
        await fetchPlans(); 
    } catch (error) {
        showNotification('Erro', error.message, 'error');
    }
}

function setupEvents(container) {
    if (pageEventListener) {
        container.removeEventListener('click', pageEventListener);
    }

    pageEventListener = (e) => {
        const isCloseBtn = e.target.closest('#btn-close-modal') || e.target.closest('#btn-cancel-modal');
        const isOverlay = e.target.id === 'plan-modal';
        
        if (isCloseBtn || isOverlay) {
            closeModal();
            return;
        }

        const actionBtn = e.target.closest('[data-action], #btn-new-plan');
        if (!actionBtn) return;

        if (actionBtn.id === 'btn-new-plan') {
            openModal();
            return;
        }

        const action = actionBtn.dataset.action;
        
        switch(action) {
            case 'edit-plan':
                if (!e.target.closest('[data-action="delete-plan"]')) {
                    openModal(actionBtn.dataset.id);
                }
                break;
            case 'delete-plan':
                e.stopPropagation(); 
                deletePlan(actionBtn.dataset.id);
                break;
        }
    };

    container.addEventListener('click', pageEventListener);

    const form = document.getElementById('plan-form');
    if (form) form.addEventListener('submit', savePlan);
}