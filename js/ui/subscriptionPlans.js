// js/ui/subscriptionPlans.js (Gestão de Clubes e Assinaturas)

import { authenticatedFetch } from '../api/apiService.js';
import { getServices } from '../api/services.js';
import { state } from '../state.js';
import { showNotification, showConfirmation } from '../components/modal.js';
import { escapeHTML, formatCurrency } from '../utils.js';

let plansData = [];
let availableServices = [];
let currentEditingPlanId = null;

// --- API WRAPPERS LOCAIS ---
const fetchPlans = async () => {
    // Usamos state.establishmentId ou 'current' dependendo do viewContext
    const targetId = state.selectedEstablishments?.[0] || state.establishmentId;
    return await authenticatedFetch(`/api/subscription-plans/${targetId}`);
};

const createPlanAPI = async (data) => {
    return await authenticatedFetch('/api/subscription-plans', {
        method: 'POST',
        body: JSON.stringify(data)
    });
};

const updatePlanAPI = async (id, data) => {
    return await authenticatedFetch(`/api/subscription-plans/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
};

const deletePlanAPI = async (id) => {
    return await authenticatedFetch(`/api/subscription-plans/${id}`, {
        method: 'DELETE'
    });
};

// --- RENDERIZAÇÃO DA PÁGINA ---
export async function loadSubscriptionPlansPage(params = {}) {
    const contentDiv = document.getElementById('content');
    
    contentDiv.innerHTML = `
        <div class="flex items-center justify-center p-12">
            <div class="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
    `;

    try {
        // Carrega Planos e Serviços em paralelo
        const targetId = state.selectedEstablishments?.[0] || state.establishmentId;
        const [plans, services] = await Promise.all([
            fetchPlans(),
            getServices(targetId)
        ]);

        plansData = plans || [];
        availableServices = services || [];

        renderMainUI(contentDiv);
        renderPlansList();

    } catch (error) {
        contentDiv.innerHTML = `
            <div class="p-12 text-center">
                <i class="bi bi-exclamation-triangle text-rose-500 text-4xl mb-4"></i>
                <h2 class="text-xl font-bold text-slate-800">Erro ao Carregar Planos</h2>
                <p class="text-slate-500">${error.message}</p>
            </div>
        `;
    }
}

function renderMainUI(container) {
    container.innerHTML = `
        <div class="p-4 md:p-8 max-w-7xl mx-auto pb-24 animate-fade-in">
            <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 class="text-2xl font-black text-slate-800 tracking-tight">Clubes de Benefícios</h1>
                    <p class="text-slate-500 text-sm mt-1">Crie planos de assinatura para fidelizar clientes e garantir receita recorrente.</p>
                </div>
                <button id="btnNewPlan" class="bg-indigo-600 text-white font-bold py-2.5 px-5 rounded-xl hover:bg-indigo-700 shadow-md transition-all active:scale-95 flex items-center gap-2">
                    <i class="bi bi-plus-lg"></i> Novo Plano
                </button>
            </header>

            <div id="plansGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>

            <div id="planModal" class="fixed inset-0 z-[1000] hidden items-center justify-center bg-slate-900/50 backdrop-blur-sm opacity-0 transition-opacity duration-300">
                <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform scale-95 transition-transform duration-300 m-4">
                    <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
                        <h3 id="planModalTitle" class="text-lg font-bold text-slate-800">Criar Novo Plano</h3>
                        <button id="btnCloseModal" class="text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center transition-colors">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                    
                    <div class="p-6 overflow-y-auto flex-1">
                        <form id="planForm" class="space-y-5">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div class="md:col-span-2">
                                    <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Nome do Plano</label>
                                    <input type="text" id="planName" placeholder="Ex: Clube VIP da Barba" class="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-semibold outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all" required>
                                </div>

                                <div class="md:col-span-2">
                                    <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Descrição Comercial</label>
                                    <textarea id="planDesc" rows="2" placeholder="O que o cliente ganha ao assinar este plano?" class="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"></textarea>
                                </div>

                                <div>
                                    <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Preço da Mensalidade (R$)</label>
                                    <input type="number" id="planPrice" step="0.01" min="0" placeholder="Ex: 89.90" class="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-indigo-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all" required>
                                </div>

                                <div>
                                    <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Ciclo de Cobrança</label>
                                    <select id="planCycle" class="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-semibold outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all" required>
                                        <option value="monthly">Mensal</option>
                                        <option value="quarterly">Trimestral</option>
                                        <option value="semiannual">Semestral</option>
                                        <option value="yearly">Anual</option>
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Limite de Usos por Ciclo</label>
                                    <input type="number" id="planUsageLimit" min="1" step="1" placeholder="Ex: 4 (Deixe vazio p/ Ilimitado)" class="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-semibold outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all">
                                    <p class="text-[10px] text-slate-400 mt-1">Quantos serviços o cliente pode agendar grátis.</p>
                                </div>
                                
                                <div class="flex items-center mt-6">
                                    <label class="flex items-center cursor-pointer bg-slate-50 p-3 rounded-xl border border-slate-200 w-full">
                                        <div class="relative">
                                            <input type="checkbox" id="planActive" class="sr-only" checked>
                                            <div class="toggle-bg block bg-slate-300 w-10 h-6 rounded-full"></div>
                                        </div>
                                        <span class="ml-3 font-bold text-slate-700 text-sm">Plano Ativo para Venda</span>
                                    </label>
                                </div>
                            </div>

                            <div class="pt-4 border-t border-slate-200">
                                <label class="block text-sm font-bold text-slate-700 mb-3">Serviços Incluídos no Plano</label>
                                <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 max-h-48 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-2" id="planServicesContainer">
                                    </div>
                            </div>
                        </form>
                    </div>
                    
                    <div class="px-6 py-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end gap-3">
                        <button type="button" id="btnCancelModal" class="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-100 transition-colors">Cancelar</button>
                        <button type="submit" form="planForm" id="btnSavePlan" class="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-2">
                            <i class="bi bi-check2"></i> Salvar Plano
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    setupEvents();
}

function renderPlansList() {
    const grid = document.getElementById('plansGrid');
    
    if (plansData.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center flex flex-col items-center">
                <div class="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-4"><i class="bi bi-star text-3xl"></i></div>
                <h3 class="text-lg font-bold text-slate-700">Nenhum plano criado</h3>
                <p class="text-slate-500 text-sm mt-1 max-w-md mx-auto">Crie o seu primeiro clube de assinaturas para garantir receita recorrente todos os meses.</p>
            </div>
        `;
        return;
    }

    const translateCycle = { 'monthly': 'mês', 'quarterly': 'trimestre', 'semiannual': 'semestre', 'yearly': 'ano' };

    grid.innerHTML = plansData.map(plan => {
        const isActive = plan.active;
        const cycleStr = translateCycle[plan.billingCycle] || plan.billingCycle;
        const servicesCount = (plan.servicesIncluded || []).length;
        const limitStr = plan.usageLimit ? `${plan.usageLimit} usos` : 'Ilimitado';

        return `
            <div class="bg-white rounded-2xl border ${isActive ? 'border-slate-200 hover:border-indigo-300' : 'border-slate-200 opacity-75'} shadow-sm p-6 flex flex-col transition-colors relative">
                <div class="absolute top-4 right-4">
                    <span class="text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}">${isActive ? 'Ativo' : 'Inativo'}</span>
                </div>
                
                <h3 class="text-lg font-black text-slate-800 pr-16 leading-tight">${escapeHTML(plan.name)}</h3>
                <p class="text-xs text-slate-500 mt-1 line-clamp-2 flex-1">${escapeHTML(plan.description || 'Sem descrição')}</p>
                
                <div class="mt-5 mb-5 flex items-baseline gap-1 text-indigo-700">
                    <span class="text-sm font-bold">R$</span>
                    <span class="text-3xl font-black tracking-tight">${plan.price.toFixed(2).replace('.', ',')}</span>
                    <span class="text-xs font-semibold text-slate-400">/${cycleStr}</span>
                </div>

                <div class="space-y-2 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div class="flex justify-between text-xs">
                        <span class="text-slate-500 font-semibold"><i class="bi bi-arrow-repeat mr-1"></i>Limite:</span>
                        <span class="text-slate-800 font-bold">${limitStr}</span>
                    </div>
                    <div class="flex justify-between text-xs">
                        <span class="text-slate-500 font-semibold"><i class="bi bi-list-check mr-1"></i>Cobertura:</span>
                        <span class="text-slate-800 font-bold">${servicesCount} Serviços</span>
                    </div>
                </div>

                <div class="mt-auto grid grid-cols-2 gap-2">
                    <button data-action="edit" data-id="${plan.id}" class="py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-colors">Editar</button>
                    <button data-action="delete" data-id="${plan.id}" class="py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-xl text-sm transition-colors">Apagar</button>
                </div>
            </div>
        `;
    }).join('');
}

function renderServicesCheckboxes(selectedIds = []) {
    const container = document.getElementById('planServicesContainer');
    
    if (availableServices.length === 0) {
        container.innerHTML = `<p class="text-xs text-slate-500 col-span-full">Nenhum serviço registado no sistema.</p>`;
        return;
    }

    container.innerHTML = availableServices.map(srv => {
        const isChecked = selectedIds.includes(srv.id);
        return `
            <label class="flex items-center p-2 rounded-lg hover:bg-white cursor-pointer transition-colors border border-transparent hover:border-slate-200">
                <input type="checkbox" value="${srv.id}" class="service-cb w-4 h-4 text-indigo-600 accent-indigo-600 rounded border-slate-300 focus:ring-indigo-500" ${isChecked ? 'checked' : ''}>
                <span class="ml-3 text-sm font-semibold text-slate-700 truncate flex-1">${escapeHTML(srv.name)}</span>
                <span class="text-xs font-bold text-slate-400">R$ ${srv.price.toFixed(2)}</span>
            </label>
        `;
    }).join('');
}

function openModal(plan = null) {
    currentEditingPlanId = plan ? plan.id : null;
    
    document.getElementById('planModalTitle').textContent = plan ? 'Editar Plano' : 'Criar Novo Plano';
    document.getElementById('planName').value = plan ? plan.name : '';
    document.getElementById('planDesc').value = plan ? (plan.description || '') : '';
    document.getElementById('planPrice').value = plan ? plan.price : '';
    document.getElementById('planCycle').value = plan ? plan.billingCycle : 'monthly';
    document.getElementById('planUsageLimit').value = (plan && plan.usageLimit) ? plan.usageLimit : '';
    document.getElementById('planActive').checked = plan ? plan.active : true;

    renderServicesCheckboxes(plan ? plan.servicesIncluded : []);

    const modal = document.getElementById('planModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Animação entrada
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modal.querySelector('div').classList.remove('scale-95');
        modal.querySelector('div').classList.add('scale-100');
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('planModal');
    modal.classList.add('opacity-0');
    modal.querySelector('div').classList.remove('scale-100');
    modal.querySelector('div').classList.add('scale-95');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.getElementById('planForm').reset();
    }, 300);
}

function setupEvents() {
    document.getElementById('btnNewPlan').addEventListener('click', () => openModal());
    document.getElementById('btnCloseModal').addEventListener('click', closeModal);
    document.getElementById('btnCancelModal').addEventListener('click', closeModal);

    // Delegação de eventos para os cartões
    document.getElementById('plansGrid').addEventListener('click', async (e) => {
        const btn = e.target.closest('button[data-action]');
        if (!btn) return;

        const action = btn.dataset.action;
        const id = btn.dataset.id;
        const plan = plansData.find(p => p.id === id);

        if (action === 'edit') {
            openModal(plan);
        } else if (action === 'delete') {
            const confirmed = await showConfirmation('Apagar Plano', `Tem a certeza que deseja apagar o plano "${plan.name}"?`);
            if (confirmed) {
                try {
                    btn.disabled = true;
                    btn.innerHTML = '<i class="bi bi-hourglass"></i>';
                    await deletePlanAPI(id);
                    plansData = plansData.filter(p => p.id !== id);
                    renderPlansList();
                    showNotification('Sucesso', 'Plano apagado.', 'success');
                } catch (error) {
                    btn.disabled = false;
                    btn.innerHTML = 'Apagar';
                    showNotification('Atenção', error.message, 'warning'); // Geralmente por haver clientes vinculados
                }
            }
        }
    });

    // Submissão do Formulário
    document.getElementById('planForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('btnSavePlan');
        
        // Coleta os IDs dos serviços marcados
        const selectedServices = Array.from(document.querySelectorAll('.service-cb:checked')).map(cb => cb.value);

        if (selectedServices.length === 0) {
            return showNotification('Aviso', 'Selecione pelo menos um serviço para o plano.', 'warning');
        }

        const payload = {
            name: document.getElementById('planName').value.trim(),
            description: document.getElementById('planDesc').value.trim(),
            price: parseFloat(document.getElementById('planPrice').value),
            billingCycle: document.getElementById('planCycle').value,
            usageLimit: document.getElementById('planUsageLimit').value ? parseInt(document.getElementById('planUsageLimit').value, 10) : null,
            active: document.getElementById('planActive').checked,
            servicesIncluded: selectedServices,
            establishmentId: state.selectedEstablishments?.[0] || state.establishmentId
        };

        try {
            btn.disabled = true;
            btn.innerHTML = '<div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Salvando...';

            if (currentEditingPlanId) {
                await updatePlanAPI(currentEditingPlanId, payload);
                const index = plansData.findIndex(p => p.id === currentEditingPlanId);
                plansData[index] = { ...plansData[index], ...payload };
                showNotification('Sucesso', 'Plano atualizado!', 'success');
            } else {
                const response = await createPlanAPI(payload);
                plansData.unshift(response); // Adiciona no início da lista
                showNotification('Sucesso', 'Plano criado com sucesso!', 'success');
            }

            closeModal();
            renderPlansList();

        } catch (error) {
            showNotification('Erro', error.message || 'Erro ao salvar o plano.', 'error');
        } finally {
            btn.disabled = false;
            btn.innerHTML = '<i class="bi bi-check2"></i> Salvar Plano';
        }
    });
}