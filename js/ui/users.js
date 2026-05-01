// js/ui/users.js (Arquitetura Premium Multi-Tenant - Tabs & Contexto Global)

import * as usersApi from '../api/users.js';
import * as professionalsApi from '../api/professionals.js'; 
import * as establishmentApi from '../api/establishments.js'; 
import { state } from '../state.js';
import { showNotification, showConfirmation } from '../components/modal.js';
import { escapeHTML } from '../utils.js';

const contentDiv = document.getElementById('content');

// --- AGRUPAMENTO DE MÓDULOS COM ÍCONES (Design Moderno) ---
const moduleGroups = {
    'Operação & Atendimento': {
        'dashboard-section': { title: 'Dashboard', icon: 'bi-grid-1x2-fill' },
        'agenda-section': { title: 'Agenda', icon: 'bi-calendar3' },
        'comandas-section': { title: 'Comandas / PDV', icon: 'bi-receipt' },
        'ausencias-section': { title: 'Ausências e Bloqueios', icon: 'bi-clock-history' }
    },
    'Financeiro & Vendas': {
        'financial-section': { title: 'Financeiro (ERP)', icon: 'bi-currency-dollar' },
        'sales-report-section': { title: 'Relatório de Vendas', icon: 'bi-graph-up-arrow' },
        'commissions-section': { title: 'Comissões', icon: 'bi-percent' },
        'packages-section': { title: 'Planos e Pacotes', icon: 'bi-box-seam' }
    },
    'Cadastros Base': {
        'clientes-section': { title: 'Clientes', icon: 'bi-people' },
        'profissionais-section': { title: 'Profissionais', icon: 'bi-person-workspace' },
        'servicos-section': { title: 'Serviços', icon: 'bi-scissors' },
        'produtos-section': { title: 'Produtos', icon: 'bi-box' },
        'suppliers-section': { title: 'Fornecedores', icon: 'bi-truck' }
    },
    'Administração': {
        'relatorios-section': { title: 'Relatórios Gerais', icon: 'bi-bar-chart-fill' },
        'estabelecimento-section': { title: 'Configurações da Empresa', icon: 'bi-gear-fill' },
        'users-section': { title: 'Usuários e Acessos', icon: 'bi-shield-lock-fill' }
    }
};

const permissions = { view: 'Visualizar', create: 'Criar', edit: 'Editar' };

// Tradução de Roles (Cores e Nomes)
const roleMap = {
    'owner': { label: 'Proprietário', color: 'bg-rose-100 text-rose-700 border-rose-200' },
    'group_admin': { label: 'Admin da Rede', color: 'bg-purple-100 text-purple-700 border-purple-200' },
    'company_admin': { label: 'Gestor Matriz', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    'branch_manager': { label: 'Gestor Filial', color: 'bg-orange-100 text-orange-700 border-orange-200' },
    'professional': { label: 'Profissional', color: 'bg-slate-100 text-slate-600 border-slate-200' }
};

let usersPageClickListener = null;
let usersPageChangeListener = null;
let globalContextChangeListener = null; 
let currentHierarchy = null; 

// --- FUNÇÃO DE BUSCA MULTI-EMPRESA ---
function getActiveEstablishmentsFromHeader() {
    const checkboxes = document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');
    if (checkboxes.length > 0) {
        return Array.from(checkboxes).map(cb => cb.value);
    }
    return [state.currentViewContext?.id || state.establishmentId];
}

// --- RENDERIZAR A LISTA DE USUÁRIOS ---
function renderUsersList(users) {
    const listContainer = document.getElementById('usersListContainer');
    if (!listContainer) return;

    const showAll = document.getElementById('showInactiveUsersToggle')?.checked;
    if (users.length === 0) {
        const message = showAll ? 'Nenhum usuário encontrado na base.' : 'Nenhum usuário ativo neste contexto.';
        listContainer.innerHTML = `
            <div class="col-span-full py-16 bg-white rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center">
                <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3"><i class="bi bi-people text-3xl text-slate-300"></i></div>
                <h3 class="text-sm font-bold text-slate-700 mb-1">${message}</h3>
                <p class="text-[10px] text-slate-500 max-w-xs">Tente selecionar mais unidades no topo da tela ou exibir inativos.</p>
            </div>`;
        return;
    }

    users.sort((a, b) => {
        if (a.role === 'owner' && b.role !== 'owner') return -1;
        if (a.role !== 'owner' && b.role === 'owner') return 1;
        return (a.status === 'active' ? -1 : 1) - (b.status === 'active' ? -1 : 1);
    });

    listContainer.innerHTML = users.map(user => {
        const userDataString = JSON.stringify(user).replace(/'/g, "&apos;");
        const isActive = user.status === 'active';
        
        const professional = state.professionals?.find(p => p.id === user.professionalId); 
        const professionalName = professional ? professional.name : 'Acesso Administrativo';
        
        const photoInitials = professional ? professional.name.charAt(0) : user.name.charAt(0);
        const photoSrc = user.photo || professional?.photo || `https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(photoInitials)}`;

        const roleInfo = roleMap[user.role] || roleMap['professional'];

        return `
        <div class="user-card-clickable bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between p-4 cursor-pointer hover:border-indigo-300 hover:shadow-md transition-all active:scale-[0.99] ${!isActive ? 'opacity-60 bg-slate-50' : ''}" 
             data-action="edit-user" data-user='${userDataString}'>
            
            <div class="flex items-center gap-4 w-full md:w-auto mb-4 md:mb-0">
                <img src="${photoSrc}" alt="Foto" class="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0 pointer-events-none">
                <div class="flex-1 min-w-0 pointer-events-none">
                    <h3 class="font-black text-slate-800 text-sm md:text-base truncate flex items-center gap-2">
                        ${escapeHTML(user.name)} 
                        ${user.role === 'owner' ? '<i class="bi bi-star-fill text-amber-400 text-[10px]" title="Proprietário"></i>' : ''}
                    </h3>
                    <p class="text-[10px] md:text-xs text-slate-500 font-medium truncate mb-1">${escapeHTML(user.email)}</p>
                    <div class="flex flex-wrap gap-1.5 mt-1">
                        <span class="text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest border ${roleInfo.color}">${roleInfo.label}</span>
                        ${professional ? `<span class="text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-widest border border-slate-200 bg-slate-50 text-slate-500"><i class="bi bi-scissors text-indigo-400 mr-1"></i>Vínculo Prof.</span>` : ''}
                    </div>
                </div>
            </div>
            
            <div class="flex items-center justify-between w-full md:w-auto md:justify-end gap-4 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
                <div class="flex flex-col items-start md:items-end mr-4">
                    <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</span>
                    <label class="flex items-center cursor-pointer" title="${isActive ? 'Ativo' : 'Inativo'}" data-action-stop-propagation="true">
                        <div class="relative">
                            <input type="checkbox" data-action="toggle-user-status" data-user-id="${user.id}" class="sr-only" ${isActive ? 'checked' : ''} ${user.role === 'owner' ? 'disabled' : ''}>
                            <div class="toggle-bg block ${isActive ? 'bg-emerald-500' : 'bg-slate-300'} ${user.role === 'owner' ? 'opacity-50' : ''} w-10 h-5 rounded-full transition-colors shadow-inner"></div>
                            <div class="dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform ${isActive ? 'transform translate-x-5' : ''}"></div>
                        </div>
                    </label>
                </div>
                
                ${user.role !== 'owner' ? `
                <button data-action="delete-user" data-user-id="${user.id}" class="text-slate-400 hover:text-red-500 w-10 h-10 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center border border-transparent hover:border-red-100 shadow-sm md:shadow-none bg-white md:bg-transparent" title="Excluir Usuário">
                    <i class="bi bi-trash3 pointer-events-none text-base"></i>
                </button>
                ` : `<div class="w-10 h-10 flex items-center justify-center text-amber-500"><i class="bi bi-shield-check text-xl"></i></div>`}
            </div>
        </div>
        `;
    }).join('');
}

function filterAndRenderUsers() {
    const showAll = document.getElementById('showInactiveUsersToggle')?.checked;
    const filteredUsers = showAll ? state.users : state.users.filter(u => u.status === 'active');
    renderUsersList(filteredUsers);
}

// --- RENDERIZAR FORMULÁRIO DE PERMISSÕES (Modernizado com Ícones) ---
function renderPermissionsForm(currentPermissions = {}) {
    let html = '';
    let hasAnyModule = false;

    for (const [groupName, groupModules] of Object.entries(moduleGroups)) {
        // Filtra para mostrar apenas módulos que a empresa tem contratado
        const activeModulesInGroup = Object.entries(groupModules).filter(([key]) => {
            const moduleKey = key.replace('-section', '');
            return !(state.enabledModules && state.enabledModules[moduleKey] === false);
        });

        if (activeModulesInGroup.length === 0) continue;
        hasAnyModule = true;

        html += `
        <div class="mb-8 last:mb-0">
            <h4 class="font-black text-xs text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                <i class="bi bi-folder2-open text-indigo-400 text-lg"></i> ${groupName}
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        `;

        activeModulesInGroup.forEach(([key, modData]) => {
            const isAgendaOrComandas = key === 'agenda-section' || key === 'comandas-section';
            const isViewAllChecked = currentPermissions[key]?.view_all_prof === true;
            
            const permissionToggles = Object.entries(permissions).map(([pKey, pLabel]) => `
                <label class="flex items-center justify-between cursor-pointer py-1.5 px-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <span class="text-[10px] text-slate-600 font-bold uppercase tracking-widest">${pLabel}</span>
                    <div class="relative ml-2">
                        <input type="checkbox" data-module="${key}" data-permission="${pKey}" class="sr-only permission-checkbox" ${currentPermissions[key]?.[pKey] ? 'checked' : ''}>
                        <div class="toggle-bg block bg-slate-200 w-8 h-4 rounded-full transition-colors shadow-inner"></div>
                        <div class="dot absolute left-1 top-[2px] bg-white w-3 h-3 rounded-full transition-transform ${currentPermissions[key]?.[pKey] ? 'transform translate-x-4' : ''}"></div>
                    </div>
                </label>
            `).join('');

            const specialPermissionHtml = isAgendaOrComandas ? `
                <div class="mt-3 pt-3 border-t border-slate-100">
                    <label class="flex flex-col cursor-pointer p-3 rounded-xl bg-indigo-50/30 hover:bg-indigo-50 transition-colors border border-indigo-100 relative overflow-hidden group/special">
                        <div class="flex items-center justify-between mb-1 z-10">
                            <span class="text-[10px] font-black text-indigo-700 uppercase tracking-widest flex items-center gap-1.5">
                                <i class="bi bi-globe"></i> Visão Toda Equipe
                            </span>
                            <div class="relative ml-2">
                                <input type="checkbox" data-module="${key}" data-permission="view_all_prof" class="sr-only permission-checkbox" ${isViewAllChecked ? 'checked' : ''}>
                                <div class="toggle-bg block bg-indigo-200 w-8 h-4 rounded-full transition-colors shadow-inner"></div>
                                <div class="dot absolute left-1 top-[2px] bg-white w-3 h-3 rounded-full transition-transform ${isViewAllChecked ? 'transform translate-x-4' : ''}"></div>
                            </div>
                        </div>
                        <span class="text-[9.5px] text-indigo-500 font-medium z-10 leading-tight">
                            Desmarque para que o usuário veja <b>apenas</b> a sua própria agenda/comandas.
                        </span>
                    </label>
                </div>
            ` : '';

            html += `
            <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
                <div class="absolute top-0 left-0 w-1 h-full bg-slate-200 group-hover:bg-indigo-500 transition-colors"></div>
                
                <h5 class="font-black text-sm text-slate-800 mb-3 flex items-center gap-2 pl-2">
                    <i class="bi ${modData.icon} text-slate-400 group-hover:text-indigo-500 transition-colors"></i> 
                    ${modData.title}
                </h5>
                
                <div class="space-y-1 pl-2">
                    ${permissionToggles}
                </div>
                
                <div class="pl-2">
                    ${specialPermissionHtml}
                </div>
            </div>
            `;
        });

        html += `</div></div>`;
    }

    if (!hasAnyModule) {
        return `<div class="p-6 bg-rose-50 border border-rose-100 rounded-2xl text-center"><p class="text-sm font-bold text-rose-600">Sua empresa não possui módulos ativados. Contate o suporte.</p></div>`;
    }

    return html;
}

// --- RENDERIZAR SELETOR DE ACESSOS (HIERARQUIA) ---
function renderAccessSelector(user) {
    if (!currentHierarchy) return '<p class="text-xs text-rose-500 p-4">Carregando lista de unidades...</p>';
    if (state.userRole === 'professional') return '';

    const userAccessBranches = user?.accessibleEstablishments?.map(e => e.id) || [];
    const userAccessCompanies = user?.accessibleCompanies?.map(c => c.id) || [];
    const role = user?.role || 'professional';

    if (role === 'owner' || role === 'group_admin') {
        return `<div class="p-5 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-800 text-sm font-black flex items-center justify-center gap-3"><i class="bi bi-shield-check text-2xl"></i> Acesso Total (Toda a Rede)</div>`;
    }

    if (!currentHierarchy.companies || currentHierarchy.companies.length === 0) {
        return '<p class="text-xs text-slate-500 p-4">Nenhuma unidade disponível na hierarquia.</p>';
    }

    let html = `<div class="space-y-3 max-h-60 overflow-y-auto custom-scrollbar p-1">`;

    currentHierarchy.companies.forEach(company => {
        const isCompanyChecked = userAccessCompanies.includes(company.id);
        const companyBranches = currentHierarchy.branches.filter(b => b.companyId === company.id);
        
        html += `
            <div class="company-block bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <label class="flex items-center space-x-3 cursor-pointer p-3 bg-slate-50 hover:bg-slate-100 transition-colors border-b border-slate-200">
                    <input type="checkbox" class="company-checkbox rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-5 w-5" value="${company.id}" data-name="${company.name}" ${isCompanyChecked ? 'checked' : ''}>
                    <span class="text-sm font-black text-slate-800 uppercase tracking-wider">🏢 ${company.name}</span>
                </label>
                <div class="p-2 space-y-1">
                    ${companyBranches.map(branch => {
                        const isBranchChecked = userAccessBranches.includes(branch.id) || isCompanyChecked;
                        return `
                            <label class="flex items-center space-x-3 cursor-pointer p-2.5 hover:bg-indigo-50/50 rounded-lg transition-colors border border-transparent hover:border-indigo-100">
                                <input type="checkbox" class="branch-checkbox rounded border-slate-300 text-indigo-500 h-4 w-4" value="${branch.id}" data-name="${branch.name}" data-company-id="${company.id}" ${isBranchChecked ? 'checked' : ''}>
                                <span class="text-xs font-bold text-slate-600">📍 ${branch.name}</span>
                            </label>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    });

    html += `</div>`;
    return html;
}

// --- FORMULÁRIO DE CRIAÇÃO/EDIÇÃO COM ABAS ---
async function showUserFormView(user = null) {
    document.getElementById('user-list-view').classList.add('hidden');
    const formView = document.getElementById('user-form-view');
    formView.classList.remove('hidden');

    let professionals = state.professionals;
    if (!professionals || professionals.length === 0) {
        try {
            const activeIds = getActiveEstablishmentsFromHeader();
            const profPromises = activeIds.map(id => professionalsApi.getProfessionals(id));
            const profResults = await Promise.all(profPromises);
            const profMap = new Map();
            profResults.flat().forEach(p => profMap.set(p.id, p));
            professionals = Array.from(profMap.values());
            state.professionals = professionals;
        } catch(err) { console.warn('Profissionais não carregados', err); }
    }
    
    // Suporte robusto aos vários nomes de cargo Admin
    if (['owner', 'group_admin', 'company_admin', 'admin'].includes(state.userRole) && !currentHierarchy) {
        try {
            const response = await establishmentApi.getHierarchy();
            
            // CORREÇÃO: Traduzindo os dados do Backend (matrizes) para o formato visual do Frontend (companies e branches)
            if (response && response.matrizes) {
                const companies = [];
                const branches = [];
                
                response.matrizes.forEach(matriz => {
                    // Adiciona a matriz na lista de "empresas"
                    companies.push({ id: matriz.id, name: matriz.name });
                    
                    // Se a matriz tiver filiais, adiciona na lista vinculando com o ID da matriz
                    if (matriz.branches && matriz.branches.length > 0) {
                        matriz.branches.forEach(filial => {
                            branches.push({ id: filial.id, name: filial.name, companyId: matriz.id });
                        });
                    }
                });
                
                currentHierarchy = { companies, branches };
            } else if (response) {
                currentHierarchy = response;
            }
        } catch (error) {
            console.error('Falha ao buscar hierarquia', error);
            currentHierarchy = { companies: [], branches: [] };
        }
    }

    const isEditing = user !== null;
    const isEditingOwner = isEditing && user.role === 'owner';
    const isCurrentUserOwner = state.userRole === 'owner';

    const headerTitle = formView.querySelector('#userFormTitle');
    headerTitle.innerHTML = isEditing ? `<i class="bi bi-person-lines-fill mr-2 text-indigo-600"></i>Editar Perfil: ${user.name}` : `<i class="bi bi-person-plus-fill mr-2 text-indigo-600"></i>Novo Acesso`;

    const form = formView.querySelector('#userForm');
    
    form.innerHTML = `
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[70vh]">
            
            <div class="flex overflow-x-auto custom-scrollbar border-b border-slate-200 bg-slate-50 flex-shrink-0">
                <button type="button" class="tab-btn active px-6 py-4 text-xs font-black uppercase tracking-widest text-indigo-600 border-b-2 border-indigo-600 whitespace-nowrap transition-colors" data-tab="tab-basico">1. Dados Básicos</button>
                <button type="button" class="tab-btn px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400 border-b-2 border-transparent hover:text-indigo-500 whitespace-nowrap transition-colors" data-tab="tab-acesso">2. Nível & Unidades</button>
                <button type="button" class="tab-btn px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400 border-b-2 border-transparent hover:text-indigo-500 whitespace-nowrap transition-colors" data-tab="tab-modulos">3. Módulos do Sistema</button>
            </div>

            <div class="flex-1 p-4 md:p-6 bg-slate-50/30 overflow-y-auto">
                
                <div id="tab-basico" class="tab-content space-y-6 animate-fade-in-fast">
                    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                        <h3 class="font-black text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3"><i class="bi bi-person-badge text-indigo-500 text-lg"></i> Identificação</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="form-group">
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Nome Completo *</label>
                                <input type="text" id="userName" required value="${user?.name || ''}" class="w-full p-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none shadow-inner transition-colors">
                            </div>
                            <div class="form-group">
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">E-mail de Login *</label>
                                <input type="email" id="userEmail" required value="${user?.email || ''}" ${isEditingOwner ? 'disabled' : ''} class="w-full p-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none shadow-inner transition-colors ${isEditingOwner ? 'opacity-70 cursor-not-allowed' : ''}">
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                        <h3 class="font-black text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3"><i class="bi bi-link-45deg text-orange-500 text-lg"></i> Vínculo na Agenda</h3>
                        <div class="form-group max-w-xl">
                            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Vincular a qual Perfil Profissional?</label>
                            <select id="userProfessionalId" class="w-full p-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none shadow-inner transition-colors">
                                <option value="">-- Apenas Administrativo / Recepção --</option>
                                ${professionals?.map(p => `<option value="${p.id}" ${p.id === user?.professionalId ? 'selected' : ''}>${p.name}</option>`).join('')}
                            </select>
                            <p class="text-[10px] font-bold text-orange-500 mt-2 ml-1"><i class="bi bi-info-circle mr-1"></i>Necessário para que o usuário veja sua própria agenda e comissões no app.</p>
                        </div>
                    </div>

                    ${!isEditing ? `
                    <div class="bg-white p-5 rounded-2xl border border-rose-200 shadow-sm relative overflow-hidden">
                        <div class="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
                        <h3 class="font-black text-xs text-rose-800 uppercase tracking-wider flex items-center gap-2 mb-4"><i class="bi bi-asterisk text-rose-500 text-lg"></i> Senha de Acesso</h3>
                        <input type="password" id="userPassword" required placeholder="Mínimo 6 caracteres" class="w-full max-w-md p-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none shadow-inner transition-colors">
                    </div>
                    ` : `
                    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <button type="button" id="btn-show-password" class="text-[10px] py-2.5 px-5 bg-slate-800 text-white font-black uppercase tracking-widest rounded-xl hover:bg-slate-900 transition-colors shadow-md flex items-center gap-2"><i class="bi bi-key-fill text-sm"></i> Redefinir Senha de Acesso</button>
                        <div id="password-form" class="hidden mt-4 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 max-w-md">
                            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Nova Senha</label>
                            <input type="password" id="userNewPassword" placeholder="Mínimo 6 caracteres" class="w-full p-3 border border-slate-300 rounded-xl text-sm font-bold bg-white focus:ring-2 focus:ring-slate-500 outline-none shadow-inner">
                            <div class="flex gap-2 pt-2">
                                <button type="button" id="btn-cancel-pwd" class="flex-1 py-2.5 bg-white border border-slate-300 text-slate-700 text-[10px] uppercase tracking-widest font-black rounded-xl hover:bg-slate-50 transition-colors shadow-sm">Cancelar</button>
                                <button type="button" id="btn-save-pwd" class="flex-1 py-2.5 bg-rose-600 text-white text-[10px] uppercase tracking-widest font-black rounded-xl shadow-md hover:bg-rose-700 transition-colors">Salvar Senha</button>
                            </div>
                        </div>
                    </div>
                    `}
                </div>

                <div id="tab-acesso" class="tab-content hidden space-y-6 animate-fade-in-fast">
                    ${['owner', 'group_admin', 'company_admin', 'admin'].includes(state.userRole) ? `
                    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 class="font-black text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3 mb-5"><i class="bi bi-diagram-3 text-indigo-500 text-lg"></i> Permissões de Rede</h3>
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                                <label class="block text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-2 ml-1">Qual o cargo/nível na empresa?</label>
                                <select id="userRole" class="w-full p-3.5 border border-indigo-200 rounded-xl text-sm font-black text-indigo-900 bg-indigo-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-colors" ${isEditingOwner && !isCurrentUserOwner ? 'disabled' : ''}>
                                    ${isCurrentUserOwner ? `<option value="owner" ${user?.role === 'owner' ? 'selected' : ''}>Proprietário (Dono do Negócio)</option>` : ''}
                                    ${['owner', 'group_admin', 'admin'].includes(state.userRole) ? `<option value="group_admin" ${user?.role === 'group_admin' ? 'selected' : ''}>Administrador Geral (Acesso Total)</option>` : ''}
                                    <option value="company_admin" ${user?.role === 'company_admin' ? 'selected' : ''}>Gestor de Matriz / Empresa</option>
                                    <option value="branch_manager" ${user?.role === 'branch_manager' ? 'selected' : ''}>Gestor de Filial (Loja)</option>
                                    <option value="professional" ${user?.role === 'professional' ? 'selected' : ''}>Profissional / Recepção (Padrão)</option>
                                </select>
                            </div>
                            <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <label class="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3 ml-1">Unidades que pode visualizar</label>
                                <div id="hierarchySelectorContainer">
                                    ${renderAccessSelector(user)}
                                </div>
                            </div>
                        </div>
                    </div>
                    ` : `<div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center"><p class="text-sm font-bold text-slate-500">Seu nível de acesso não permite alterar a hierarquia deste usuário.</p></div>
                         <input type="hidden" id="userRole" value="${user?.role || 'professional'}">`}
                </div>

                <div id="tab-modulos" class="tab-content hidden animate-fade-in-fast">
                    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 class="font-black text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3 mb-5"><i class="bi bi-ui-checks-grid text-indigo-500 text-lg"></i> O que ele pode fazer no sistema?</h3>
                        ${renderPermissionsForm(user?.permissions)}
                    </div>
                </div>

            </div>

            <div class="p-4 bg-white border-t border-slate-200 flex gap-3 flex-shrink-0 relative z-10 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.05)]">
                <button type="button" data-action="back-to-list" class="hidden md:block w-1/3 py-3.5 bg-slate-100 text-slate-700 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-slate-200 transition-colors shadow-sm">Voltar à Lista</button>
                <button type="submit" class="w-full md:w-2/3 py-3.5 bg-indigo-600 text-white font-black text-sm uppercase tracking-wider rounded-xl hover:bg-indigo-700 transition-transform active:scale-95 shadow-md flex justify-center items-center gap-2">
                    <i class="bi bi-check2-circle text-xl"></i> ${isEditing ? 'Salvar Configurações' : 'Cadastrar Usuário'}
                </button>
            </div>
        </div>
    `;

    // --- LÓGICA DAS TABS ---
    const tabBtns = formView.querySelectorAll('.tab-btn');
    const tabContents = formView.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => {
                b.classList.remove('active', 'text-indigo-600', 'border-indigo-600');
                b.classList.add('text-slate-400', 'border-transparent');
            });
            tabContents.forEach(c => c.classList.add('hidden'));

            btn.classList.add('active', 'text-indigo-600', 'border-indigo-600');
            btn.classList.remove('text-slate-400', 'border-transparent');
            const targetId = btn.getAttribute('data-tab');
            formView.querySelector(`#${targetId}`).classList.remove('hidden');
        });
    });

    // --- LÓGICA DE HIERARQUIA ---
    const roleSelect = form.querySelector('#userRole');
    const hierarchyContainer = form.querySelector('#hierarchySelectorContainer');

    if (roleSelect && hierarchyContainer) {
        roleSelect.addEventListener('change', (e) => {
            const tempUser = { ...user, role: e.target.value };
            // Atualiza dinamicamente as unidades disponíveis sempre que troca o cargo
            hierarchyContainer.innerHTML = renderAccessSelector(tempUser);
            attachHierarchyListeners();
        });

        const attachHierarchyListeners = () => {
            hierarchyContainer.querySelectorAll('.company-checkbox').forEach(cb => {
                cb.addEventListener('change', ev => {
                    const companyBlock = ev.target.closest('.company-block');
                    const branchCheckboxes = companyBlock.querySelectorAll('.branch-checkbox');
                    branchCheckboxes.forEach(b => {
                        b.checked = ev.target.checked;
                        const dot = b.nextElementSibling.querySelector('.dot');
                        if (dot) {
                            if (ev.target.checked) dot.classList.add('transform', 'translate-x-4');
                            else dot.classList.remove('transform', 'translate-x-4');
                        }
                    });
                });
            });
        };
        attachHierarchyListeners();
    }

    // Toggle visual dos checkboxes de permissão e hierarquia
    form.querySelectorAll('.permission-checkbox').forEach(cb => {
        cb.addEventListener('change', (e) => {
            const toggleBg = e.target.nextElementSibling;
            const dot = toggleBg.nextElementSibling;
            if (e.target.checked) {
                toggleBg.classList.replace('bg-slate-200', 'bg-indigo-500');
                toggleBg.classList.replace('bg-indigo-200', 'bg-indigo-500'); // caso seja o botão special
                dot.classList.add('transform', 'translate-x-4');
            } else {
                toggleBg.classList.replace('bg-indigo-500', 'bg-slate-200');
                toggleBg.classList.replace('bg-indigo-500', 'bg-indigo-200'); // caso seja o botão special
                dot.classList.remove('transform', 'translate-x-4');
            }
        });
        if (cb.checked) {
            const toggleBg = cb.nextElementSibling;
            const dot = toggleBg.nextElementSibling;
            toggleBg.classList.replace('bg-slate-200', 'bg-indigo-500');
            toggleBg.classList.replace('bg-indigo-200', 'bg-indigo-500');
            dot.classList.add('transform', 'translate-x-4');
        }
    });

    // --- SALVAR USUÁRIO ---
    form.onsubmit = async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const origText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm mr-2"></span> Processando...';
        
        const permissions = {};
        form.querySelectorAll('.permission-checkbox').forEach(cb => {
            const mod = cb.dataset.module;
            const perm = cb.dataset.permission;
            if (!permissions[mod]) permissions[mod] = {};
            permissions[mod][perm] = cb.checked;
        });
        
        const professionalId = form.querySelector('#userProfessionalId').value || null;
        const role = form.querySelector('#userRole')?.value || 'professional';

        const accessibleCompanies = [];
        const accessibleEstablishments = [];

        if (role !== 'group_admin' && role !== 'owner' && form.querySelector('.company-checkbox')) {
            form.querySelectorAll('.company-checkbox:checked').forEach(cb => {
                accessibleCompanies.push({ id: cb.value, name: cb.dataset.name });
            });
            form.querySelectorAll('.branch-checkbox:checked').forEach(cb => {
                accessibleEstablishments.push({ id: cb.value, name: cb.dataset.name, companyId: cb.dataset.companyId });
            });

            if (accessibleEstablishments.length === 0) {
                submitBtn.disabled = false; submitBtn.innerHTML = origText;
                return showNotification('Atenção', 'Selecione pelo menos uma filial na aba de Acesso.', 'warning');
            }
        }

        const userData = {
            name: form.querySelector('#userName').value,
            permissions,
            professionalId,
            role,
            accessibleCompanies,
            accessibleEstablishments
        };

        try {
            if (isEditing) {
                const newEmail = form.querySelector('#userEmail').value;
                if (user?.email !== newEmail && !isEditingOwner) userData.email = newEmail;
                
                await usersApi.updateUser(user.id, userData);
                showNotification('Sucesso', 'Usuário atualizado.', 'success');
            } else {
                userData.email = form.querySelector('#userEmail').value;
                userData.password = form.querySelector('#userPassword').value;
                await usersApi.createUser(userData);
                showNotification('Sucesso', 'Novo usuário cadastrado na plataforma.', 'success');
            }
            loadUsersPage();
        } catch (error) {
            showNotification(`Erro: ${error.message}`, 'error');
            submitBtn.disabled = false; submitBtn.innerHTML = origText;
        }
    };

    // --- Lógica de Troca de Senha ---
    if (isEditing) {
        const showPasswordBtn = form.querySelector('#btn-show-password');
        const passwordForm = form.querySelector('#password-form');
        
        if (showPasswordBtn && passwordForm) {
            showPasswordBtn.onclick = () => {
                showPasswordBtn.classList.add('hidden');
                passwordForm.classList.remove('hidden');
            };

            form.querySelector('#btn-cancel-pwd').onclick = () => {
                showPasswordBtn.classList.remove('hidden');
                passwordForm.classList.add('hidden');
                passwordForm.querySelector('#userNewPassword').value = '';
            };

            form.querySelector('#btn-save-pwd').onclick = async (e) => {
                const btn = e.target;
                const newPassword = passwordForm.querySelector('#userNewPassword').value;
                if (!newPassword || newPassword.length < 6) return showNotification('Aviso', 'Senha deve ter no mínimo 6 caracteres.', 'warning');

                if (await showConfirmation('Alterar Senha', 'O usuário usará esta nova senha no próximo acesso. Confirma?')) {
                    try {
                        btn.disabled = true; btn.textContent = 'Aguarde...';
                        await usersApi.changeUserPassword(user.id, newPassword);
                        showNotification('Sucesso', 'Senha alterada com segurança.', 'success');
                        showPasswordBtn.classList.remove('hidden');
                        passwordForm.classList.add('hidden');
                    } catch (err) {
                        showNotification('Erro', err.message, 'error');
                    } finally {
                        btn.disabled = false; btn.textContent = 'Salvar Senha';
                    }
                }
            };
        }
    }
}

// --- FUNÇÃO PARA BUSCAR E RENDERIZAR OS DADOS ---
async function fetchAndRenderUsers() {
    const listContainer = document.getElementById('usersListContainer');
    if (!listContainer) return; 
    
    listContainer.innerHTML = '<div class="col-span-full py-16 flex justify-center"><div class="loader"></div></div>';
    try {
        const activeIds = getActiveEstablishmentsFromHeader();
        
        const userPromises = activeIds.map(id => usersApi.getUsers(id));
        const profPromises = activeIds.map(id => professionalsApi.getProfessionals(id));
        
        const userResults = await Promise.all(userPromises);
        const profResults = await Promise.all(profPromises);
        
        const userMap = new Map();
        userResults.flat().forEach(u => userMap.set(u.id, u));
        state.users = Array.from(userMap.values());
        
        const profMap = new Map();
        profResults.flat().forEach(p => profMap.set(p.id, p));
        state.professionals = Array.from(profMap.values());
        
        filterAndRenderUsers();
    } catch (error) {
        showNotification('Erro ao carregar base de usuários.', 'error');
        listContainer.innerHTML = '<p class="col-span-full text-center font-bold text-red-500 bg-red-50 p-6 rounded-2xl">Falha de comunicação com o servidor de acessos.</p>';
    }
}

export async function loadUsersPage() {
    contentDiv.innerHTML = `
        <div id="user-list-view" class="relative h-full pb-24 p-2 md:p-6 w-full max-w-7xl mx-auto overflow-y-auto custom-scrollbar">
            <section class="animate-fade-in-down max-w-5xl mx-auto">
                <div class="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100 shadow-inner">
                            <i class="bi bi-shield-lock text-2xl"></i>
                        </div>
                        <div>
                            <h2 class="text-lg md:text-xl font-black text-slate-800 uppercase tracking-tight">Equipe & Acessos</h2>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gestão de Logins e Permissões</p>
                        </div>
                    </div>
                    <label class="flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 bg-slate-50 md:bg-transparent">
                        <div class="relative">
                            <input type="checkbox" id="showInactiveUsersToggle" class="sr-only">
                            <div class="toggle-bg block bg-slate-200 w-10 h-5 rounded-full transition-colors shadow-inner"></div>
                            <div class="dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform"></div>
                        </div>
                        <span class="text-[10px] font-black text-slate-600 uppercase tracking-widest">Exibir Bloqueados</span>
                    </label>
                </div>
                
                <div id="usersListContainer" class="grid grid-cols-1 md:grid-cols-2 gap-4 pb-12"></div>
            </section>
            
            <button id="btn-add-user" data-action="new-user" title="Cadastrar Usuário" class="fixed right-5 md:right-10 bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_10px_20px_-10px_rgba(79,70,229,0.8)] hover:bg-indigo-700 transition-transform active:scale-90 z-[90] border border-indigo-500" style="bottom: 96px;">
                <i class="bi bi-person-plus-fill text-2xl drop-shadow-md pointer-events-none"></i>
            </button>
        </div>

        <div id="user-form-view" class="hidden h-full pb-24 p-2 md:p-6 w-full max-w-4xl mx-auto overflow-y-auto custom-scrollbar relative">
             <section class="animate-fade-in-down h-full flex flex-col">
                <div class="flex justify-between items-center mb-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex-shrink-0">
                    <button data-action="back-to-list" class="w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 transition-colors flex items-center justify-center shadow-inner">
                        <i class="bi bi-arrow-left text-lg"></i>
                    </button>
                    <h2 id="userFormTitle" class="text-sm md:text-base font-black text-slate-800 uppercase tracking-wider flex items-center"></h2>
                    <div class="w-10"></div>
                </div>
                <form id="userForm" class="flex-1 flex flex-col"></form>
            </section>
        </div>
    `;

    if (usersPageClickListener) contentDiv.removeEventListener('click', usersPageClickListener);
    if (usersPageChangeListener) contentDiv.removeEventListener('change', usersPageChangeListener);
    if (globalContextChangeListener) {
        window.removeEventListener('kairos:contextChanged', globalContextChangeListener);
        document.removeEventListener('change', globalContextChangeListener);
    }

    globalContextChangeListener = (e) => {
        if (e.type === 'kairos:contextChanged' || e.target.closest('#multi-context-list')) {
            if (document.getElementById('user-list-view') && !document.getElementById('user-list-view').classList.contains('hidden')) {
                fetchAndRenderUsers();
            }
        }
    };
    
    window.addEventListener('kairos:contextChanged', globalContextChangeListener);
    document.addEventListener('change', globalContextChangeListener);

    usersPageClickListener = async (e) => {
        const actionElement = e.target.closest('[data-action]');
        if (!actionElement) return;

        const action = actionElement.dataset.action;
        switch (action) {
            case 'new-user': showUserFormView(); break;
            case 'edit-user':
                const userData = JSON.parse(actionElement.dataset.user.replace(/&apos;/g, "'"));
                showUserFormView(userData);
                break;
            case 'back-to-list': loadUsersPage(); break;
            case 'delete-user': {
                e.stopPropagation(); 
                if (await showConfirmation('Excluir Usuário', 'O usuário perderá totalmente o acesso ao sistema. Confirma?')) {
                    try {
                        await usersApi.deleteUser(actionElement.dataset.userId);
                        showNotification('Usuário excluído com sucesso.', 'success');
                        loadUsersPage();
                    } catch (error) { showNotification(`Erro: ${error.message}`, 'error'); }
                }
                break;
            }
        }
    };

    usersPageChangeListener = async (e) => {
        if (e.target.id === 'showInactiveUsersToggle') {
            const toggleBg = e.target.nextElementSibling;
            const dot = toggleBg.nextElementSibling;
            if (e.target.checked) {
                toggleBg.classList.replace('bg-slate-200', 'bg-indigo-500');
                dot.classList.add('transform', 'translate-x-5');
            } else {
                toggleBg.classList.replace('bg-indigo-500', 'bg-slate-200');
                dot.classList.remove('transform', 'translate-x-5');
            }
            filterAndRenderUsers();
        } else {
            const toggle = e.target.closest('input[data-action="toggle-user-status"]');
            if (toggle) {
                e.stopPropagation();
                const userId = toggle.dataset.userId;
                const newStatus = toggle.checked ? 'active' : 'inactive';
                
                const toggleBg = toggle.nextElementSibling;
                const dot = toggleBg.nextElementSibling;
                if (toggle.checked) {
                    toggleBg.classList.replace('bg-slate-300', 'bg-emerald-500');
                    dot.classList.add('transform', 'translate-x-5');
                } else {
                    toggleBg.classList.replace('bg-emerald-500', 'bg-slate-300');
                    dot.classList.remove('transform', 'translate-x-5');
                }

                try {
                    await usersApi.updateUserStatus(userId, newStatus);
                    const userIndex = state.users.findIndex(u => u.id === userId);
                    if (userIndex > -1) {
                        state.users[userIndex].status = newStatus;
                        const card = toggle.closest('.user-card-clickable');
                        if (newStatus === 'inactive') card.classList.add('opacity-60', 'bg-slate-50');
                        else card.classList.remove('opacity-60', 'bg-slate-50');
                    }
                } catch (error) {
                    showNotification(`Erro: ${error.message}`, 'error');
                    toggle.checked = !toggle.checked; 
                    if (toggle.checked) {
                        toggleBg.classList.replace('bg-slate-300', 'bg-emerald-500');
                        dot.classList.add('transform', 'translate-x-5');
                    } else {
                        toggleBg.classList.replace('bg-emerald-500', 'bg-slate-300');
                        dot.classList.remove('transform', 'translate-x-5');
                    }
                }
            }
        }
    };
    
    contentDiv.addEventListener('click', usersPageClickListener);
    contentDiv.addEventListener('change', usersPageChangeListener);

    await fetchAndRenderUsers();
}