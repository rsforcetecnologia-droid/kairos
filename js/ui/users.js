// js/ui/users.js (Otimizado para Multi-Tenant Enterprise - 3 Níveis)

import * as usersApi from '../api/users.js';
import * as professionalsApi from '../api/professionals.js'; 
import * as establishmentApi from '../api/establishments.js'; // Importante para buscar a hierarquia
import { state } from '../state.js';
import { showNotification, showConfirmation } from '../components/modal.js';

const contentDiv = document.getElementById('content');

// --- LISTA DE MÓDULOS ---
const modules = {
    'agenda-section': 'Agenda',
    'comandas-section': 'Comandas',
    'relatorios-section': 'Relatórios Gerais',
    'sales-report-section': 'Relatório de Vendas (Caixa)', 
    'financial-section': 'Financeiro',
    'servicos-section': 'Serviços',
    'produtos-section': 'Produtos',
    'suppliers-section': 'Fornecedores', 
    'profissionais-section': 'Profissionais',
    'ausencias-section': 'Ausências e Bloqueios', 
    'clientes-section': 'Clientes',
    'packages-section': 'Pacotes', 
    'commissions-section': 'Comissões', 
    'estabelecimento-section': 'Configurações do Estabelecimento', 
    'users-section': 'Usuários e Acessos' 
};

const permissions = {
    view: 'Visualizar',
    create: 'Criar',
    edit: 'Editar'
};

// Variáveis para guardar a referência dos listeners
let usersPageClickListener = null;
let usersPageChangeListener = null;
let currentHierarchy = null; // Cache da hierarquia do Grupo

// Tradução de Roles
const roleNames = {
    'group_admin': 'Administrador do Grupo',
    'company_admin': 'Gestor de Matriz',
    'branch_manager': 'Gestor de Filial',
    'professional': 'Profissional Padrão'
};

// --- RENDERIZAR A LISTA DE USUÁRIOS ---
function renderUsersList(users) {
    const listContainer = document.getElementById('usersListContainer');
    if (!listContainer) return;

    const showAll = document.getElementById('showInactiveUsersToggle')?.checked;
    if (users.length === 0) {
        const message = showAll ? 'Nenhum usuário encontrado.' : 'Nenhum usuário ativo cadastrado.';
        listContainer.innerHTML = `<p class="col-span-full text-center text-gray-500">${message}</p>`;
        return;
    }

    users.sort((a, b) => (a.status === 'active' ? -1 : 1) - (b.status === 'active' ? -1 : 1));

    listContainer.innerHTML = users.map(user => {
        const userDataString = JSON.stringify(user).replace(/'/g, "&apos;");
        const isActive = user.status === 'active';
        
        const professional = state.professionals.find(p => p.id === user.professionalId); 
        const professionalName = professional ? professional.name : 'N/A';
        
        const photoInitials = professional ? professional.name.charAt(0) : user.name.charAt(0);
        const photoSrc = professional?.photo || `https://placehold.co/64x64/E2E8F0/4A5568?text=${encodeURIComponent(photoInitials)}`;

        const roleLabel = roleNames[user.role] || 'Profissional';
        const roleColor = user.role === 'group_admin' ? 'bg-purple-100 text-purple-800' : 
                          user.role === 'company_admin' ? 'bg-blue-100 text-blue-800' : 
                          user.role === 'branch_manager' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800';

        return `
        <div class="user-card-clickable bg-white rounded-lg shadow-sm border overflow-hidden flex cursor-pointer ${!isActive ? 'opacity-60' : ''} hover:shadow-md transition" 
             data-action="edit-user" 
             data-user='${userDataString}'>
            
            <img src="${photoSrc}" alt="Foto de Perfil" class="w-16 h-16 object-cover flex-shrink-0 pointer-events-none border-r">
            
            <div class="p-3 flex-grow flex flex-col justify-between min-w-0">
                <div class="pointer-events-none min-w-0">
                    <div class="flex justify-between items-start gap-2">
                        <p class="font-bold text-gray-800 text-sm truncate">${user.name}</p>
                        <span class="text-[9px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap ${roleColor}">${roleLabel}</span>
                    </div>
                    <p class="text-xs text-gray-500 truncate">${user.email}</p>
                    <p class="text-[10px] text-gray-400 mt-1 truncate">Prof: <span class="font-semibold text-gray-600">${professionalName}</span></p>
                </div>
                
                <div class="mt-2 flex items-center justify-between gap-2">
                    <label class="flex items-center cursor-pointer" title="${isActive ? 'Ativo' : 'Inativo'}">
                        <div class="relative">
                            <input type="checkbox" data-action="toggle-user-status" data-user-id="${user.id}" class="sr-only" ${isActive ? 'checked' : ''}>
                            <div class="toggle-bg block bg-gray-300 w-8 h-4 rounded-full"></div>
                        </div>
                    </label>
                    
                    <button data-action="delete-user" data-user-id="${user.id}" class="text-gray-400 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50 transition-colors action-btn-delete" title="Excluir Usuário">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    `
    }).join('');
}

function filterAndRenderUsers() {
    const showAll = document.getElementById('showInactiveUsersToggle')?.checked;
    const filteredUsers = showAll ? state.users : state.users.filter(u => u.status === 'active');
    renderUsersList(filteredUsers);
}

// --- RENDERIZAR FORMULÁRIO DE PERMISSÕES ---
function renderPermissionsForm(currentPermissions = {}) {
    return Object.entries(modules).map(([key, title]) => {
        const isAgendaOrComandas = key === 'agenda-section' || key === 'comandas-section';
        const isViewAllChecked = currentPermissions[key]?.view_all_prof === true;
        
        const permissionToggles = Object.entries(permissions).map(([pKey, pLabel]) => `
             <label class="flex flex-col items-center space-y-1 cursor-pointer">
                <div class="relative">
                    <input type="checkbox" data-module="${key}" data-permission="${pKey}" class="sr-only" ${currentPermissions[key]?.[pKey] ? 'checked' : ''}>
                    <div class="toggle-bg block bg-gray-300 w-8 h-4 rounded-full"></div>
                </div>
                <span class="text-[10px] text-gray-600 font-medium">${pLabel}</span>
            </label>
        `).join('');

        const specialPermissionHtml = isAgendaOrComandas ? `
            <div class="col-span-full pt-2 mt-2 border-t border-gray-100">
                <label class="flex items-center space-x-2 cursor-pointer">
                    <div class="relative">
                        <input type="checkbox" data-module="${key}" data-permission="view_all_prof" class="sr-only" ${isViewAllChecked ? 'checked' : ''}>
                        <div class="toggle-bg block bg-gray-300 w-8 h-4 rounded-full"></div>
                    </div>
                    <span class="text-xs font-bold text-indigo-600">Ver dados de toda a Equipe</span>
                </label>
            </div>
        ` : '';

        return `
        <div class="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
            <h4 class="font-bold text-xs text-gray-800 border-b pb-1.5 mb-2">${title}</h4>
            <div class="grid grid-cols-3 gap-1">
                ${permissionToggles}
            </div>
            ${specialPermissionHtml}
        </div>
    `}).join('');
}

// --- RENDERIZAR SELETOR DE ACESSOS (HIERARQUIA) ---
function renderAccessSelector(user) {
    if (!currentHierarchy || state.userRole === 'professional') return '';

    const userAccessBranches = user?.accessibleEstablishments?.map(e => e.id) || [];
    const userAccessCompanies = user?.accessibleCompanies?.map(c => c.id) || [];
    const role = user?.role || 'professional';

    // Se o usuário que estamos editando for Group Admin, ele tem acesso a tudo
    if (role === 'group_admin') {
        return `<div class="p-3 bg-purple-50 border border-purple-200 rounded-lg text-purple-800 text-sm font-bold">Acesso Total (Global) liberado.</div>`;
    }

    let html = `<div class="space-y-3 max-h-48 overflow-y-auto custom-scrollbar p-2 bg-gray-50 rounded border">`;

    // Renderiza as Empresas e Filiais baseadas na Hierarquia carregada
    currentHierarchy.companies.forEach(company => {
        const isCompanyChecked = userAccessCompanies.includes(company.id);
        const companyBranches = currentHierarchy.branches.filter(b => b.companyId === company.id);
        
        html += `
            <div class="company-block">
                <label class="flex items-center space-x-2 cursor-pointer mb-1">
                    <input type="checkbox" class="company-checkbox rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4" value="${company.id}" data-name="${company.name}" ${isCompanyChecked ? 'checked' : ''}>
                    <span class="text-sm font-bold text-gray-800">🏢 ${company.name}</span>
                </label>
                <div class="pl-6 space-y-1 border-l-2 border-gray-200 ml-2">
                    ${companyBranches.map(branch => {
                        const isBranchChecked = userAccessBranches.includes(branch.id) || isCompanyChecked;
                        return `
                            <label class="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" class="branch-checkbox rounded text-indigo-500 h-3 w-3" value="${branch.id}" data-name="${branch.name}" data-company-id="${company.id}" ${isBranchChecked ? 'checked' : ''}>
                                <span class="text-xs text-gray-600">📍 ${branch.name}</span>
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


// --- FORMULÁRIO DE CRIAÇÃO/EDIÇÃO ---
async function showUserFormView(user = null) {
    document.getElementById('user-list-view').classList.add('hidden');
    const formView = document.getElementById('user-form-view');
    formView.classList.remove('hidden');

    let professionals = state.professionals;
    if (!professionals || professionals.length === 0) {
        try {
            professionals = await professionalsApi.getProfessionals(state.currentViewContext.id); // Usa contexto atual
            state.professionals = professionals;
        } catch(err) {
             console.warn('Profissionais não carregados');
        }
    }
    
    // Carregar hierarquia se for admin/manager
    if (['group_admin', 'company_admin'].includes(state.userRole) && !currentHierarchy) {
        try {
            // Requer que exista uma rota no api/establishments.js chamada getHierarchy
            // Simularemos a chamada aqui ou assumimos que já foi implementada no seu backend
            const response = await fetch('/api/establishments/hierarchy', { headers: { 'Authorization': `Bearer ${await state.getAuthToken?.() || ''}` }});
            if(response.ok) {
                currentHierarchy = await response.json();
            }
        } catch (error) {
            console.error('Falha ao buscar hierarquia', error);
            currentHierarchy = { companies: [], branches: [] };
        }
    }

    const getProfessionalById = (id) => professionals?.find(p => p.id === id);
    const initialProfId = user?.professionalId;
    const initialProf = getProfessionalById(initialProfId);
    const isEditing = user !== null;

    formView.querySelector('#userFormTitle').textContent = isEditing ? `Editar: ${user.name}` : 'Novo Usuário';

    const form = formView.querySelector('#userForm');
    
    form.innerHTML = `
        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-4">
            
            <div class="bg-gray-50 p-4 rounded-lg border space-y-3">
                 <h3 class="font-bold text-sm text-gray-800 border-b pb-1">Dados de Acesso</h3>
                 <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div class="form-group">
                        <label class="text-xs font-bold text-gray-600">Nome Completo</label>
                        <input type="text" id="userName" required value="${user?.name || ''}" class="w-full p-2 border rounded text-sm">
                    </div>
                    <div class="form-group">
                        <label class="text-xs font-bold text-gray-600">E-mail de Login</label>
                        <input type="email" id="userEmail" required value="${user?.email || ''}" class="w-full p-2 border rounded text-sm">
                    </div>
                </div>
            </div>

            ${['group_admin', 'company_admin'].includes(state.userRole) ? `
            <div class="bg-indigo-50 p-4 rounded-lg border border-indigo-100 space-y-3">
                 <h3 class="font-bold text-sm text-indigo-800 border-b border-indigo-200 pb-1">Nível de Acesso (Enterprise)</h3>
                 <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="text-xs font-bold text-indigo-700 block mb-1">Perfil do Usuário</label>
                        <select id="userRole" class="w-full p-2 border border-indigo-300 rounded text-sm bg-white font-semibold">
                            ${state.userRole === 'group_admin' ? `<option value="group_admin" ${user?.role === 'group_admin' ? 'selected' : ''}>Administrador Global (Acesso a tudo)</option>` : ''}
                            <option value="company_admin" ${user?.role === 'company_admin' ? 'selected' : ''}>Gestor de Empresa/Matriz</option>
                            <option value="branch_manager" ${user?.role === 'branch_manager' ? 'selected' : ''}>Gestor de Filial (Loja)</option>
                            <option value="professional" ${user?.role === 'professional' ? 'selected' : ''}>Profissional Padrão (Barbeiro)</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-xs font-bold text-indigo-700 block mb-1">Locais Permitidos</label>
                        <div id="hierarchySelectorContainer">
                            ${renderAccessSelector(user)}
                        </div>
                    </div>
                 </div>
            </div>
            ` : `<input type="hidden" id="userRole" value="${user?.role || 'professional'}">`}

            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-100 space-y-3">
                 <h3 class="font-bold text-sm text-yellow-800 border-b border-yellow-200 pb-1">Associação na Agenda</h3>
                <div class="form-group">
                    <label class="text-xs font-bold text-yellow-700">Vincular a qual Profissional?</label>
                    <select id="userProfessionalId" class="w-full p-2 border border-yellow-300 rounded text-sm bg-white">
                        <option value="">-- Não Associar --</option>
                        ${professionals?.map(p => `<option value="${p.id}" ${p.id === initialProfId ? 'selected' : ''}>${p.name}</option>`).join('')}
                    </select>
                    <p class="text-[10px] text-yellow-600 mt-1">Garante que o profissional só veja os agendamentos dele.</p>
                </div>
            </div>
            
            ${!isEditing ? `
            <div class="bg-red-50 p-4 rounded-lg border border-red-100">
                 <h3 class="font-bold text-sm text-red-800 mb-2">Senha Inicial</h3>
                 <input type="password" id="userPassword" required placeholder="Mínimo 6 caracteres" class="w-full p-2 border border-red-200 rounded text-sm">
            </div>
            ` : `
            <div class="border-t pt-4 bg-gray-50 p-3 rounded mt-4">
                <button type="button" data-action="show-password-form" class="text-xs py-1.5 px-3 bg-gray-800 text-white font-bold rounded hover:bg-gray-900 transition">Alterar Senha do Usuário</button>
                <div id="password-form" class="hidden mt-3 max-w-xs space-y-2">
                    <input type="password" id="userNewPassword" placeholder="Nova Senha" class="w-full p-2 border rounded text-sm">
                    <div class="flex gap-2">
                         <button type="button" data-action="cancel-password-change" class="flex-1 py-1.5 bg-gray-300 text-gray-800 text-xs font-bold rounded">Cancelar</button>
                         <button type="button" data-action="save-password" class="flex-1 py-1.5 bg-red-600 text-white text-xs font-bold rounded">Salvar Senha</button>
                    </div>
                </div>
            </div>
            `}

            <div class="border-t pt-4 mt-4">
                <h3 class="text-sm font-bold mb-3 text-gray-800">Permissões de Módulos</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    ${renderPermissionsForm(user?.permissions)}
                </div>
            </div>

            <div class="flex gap-3 pt-6 border-t">
                <button type="button" data-action="back-to-list" class="flex-1 py-2 bg-gray-200 text-gray-800 font-bold rounded hover:bg-gray-300">Cancelar</button>
                <button type="submit" class="flex-1 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700">Salvar Usuário</button>
            </div>
        </div>
    `;

    // Interatividade da Hierarquia (Checkboxes dinâmicos)
    const roleSelect = form.querySelector('#userRole');
    const hierarchyContainer = form.querySelector('#hierarchySelectorContainer');

    if (roleSelect && hierarchyContainer) {
        roleSelect.addEventListener('change', (e) => {
            const tempUser = { ...user, role: e.target.value };
            hierarchyContainer.innerHTML = renderAccessSelector(tempUser);
            attachHierarchyListeners();
        });

        const attachHierarchyListeners = () => {
            hierarchyContainer.querySelectorAll('.company-checkbox').forEach(cb => {
                cb.addEventListener('change', ev => {
                    const companyBlock = ev.target.closest('.company-block');
                    const branchCheckboxes = companyBlock.querySelectorAll('.branch-checkbox');
                    branchCheckboxes.forEach(b => b.checked = ev.target.checked);
                });
            });
        };
        attachHierarchyListeners();
    }

    // --- SALVAR USUÁRIO ---
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const permissions = {};
        form.querySelectorAll('input[data-module]').forEach(cb => {
            const mod = cb.dataset.module;
            const perm = cb.dataset.permission;
            if (!permissions[mod]) permissions[mod] = {};
            permissions[mod][perm] = cb.checked;
        });
        
        const professionalId = form.querySelector('#userProfessionalId').value || null;
        const role = form.querySelector('#userRole')?.value || 'professional';

        // Capturar Hierarquia
        const accessibleCompanies = [];
        const accessibleEstablishments = [];

        if (role !== 'group_admin' && form.querySelector('.company-checkbox')) {
            form.querySelectorAll('.company-checkbox:checked').forEach(cb => {
                accessibleCompanies.push({ id: cb.value, name: cb.dataset.name });
            });
            form.querySelectorAll('.branch-checkbox:checked').forEach(cb => {
                accessibleEstablishments.push({ id: cb.value, name: cb.dataset.name, companyId: cb.dataset.companyId });
            });

            if (accessibleEstablishments.length === 0) {
                return showNotification('Atenção', 'Você deve selecionar pelo menos uma filial para este usuário.', 'error');
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
                if (user?.email !== newEmail) userData.email = newEmail;
                
                await usersApi.updateUser(user.id, userData);
                showNotification('Usuário atualizado com sucesso!', 'success');
            } else {
                userData.email = form.querySelector('#userEmail').value;
                userData.password = form.querySelector('#userPassword').value;
                await usersApi.createUser(userData);
                showNotification('Usuário criado com sucesso!', 'success');
            }
            loadUsersPage();
        } catch (error) {
            showNotification(`Erro: ${error.message}`, 'error');
        }
    });

    // Lógica de Troca de Senha (Mantida)
    if (isEditing) {
        const showPasswordBtn = form.querySelector('[data-action="show-password-form"]');
        const passwordForm = form.querySelector('#password-form');
        
        if (showPasswordBtn && passwordForm) {
            showPasswordBtn.addEventListener('click', () => {
                showPasswordBtn.classList.add('hidden');
                passwordForm.classList.remove('hidden');
            });

            passwordForm.querySelector('[data-action="cancel-password-change"]').addEventListener('click', () => {
                showPasswordBtn.classList.remove('hidden');
                passwordForm.classList.add('hidden');
                passwordForm.querySelector('#userNewPassword').value = '';
            });

            passwordForm.querySelector('[data-action="save-password"]').addEventListener('click', async (e) => {
                const btn = e.target;
                const newPassword = passwordForm.querySelector('#userNewPassword').value;
                if (!newPassword || newPassword.length < 6) return showNotification('Aviso', 'Senha deve ter no mínimo 6 caracteres.', 'error');

                if (await showConfirmation('Alterar Senha', 'Tem certeza?')) {
                    try {
                        btn.disabled = true; btn.textContent = '...';
                        await usersApi.changeUserPassword(user.id, newPassword);
                        showNotification('Sucesso', 'Senha alterada.', 'success');
                        showPasswordBtn.classList.remove('hidden');
                        passwordForm.classList.add('hidden');
                    } catch (err) {
                        showNotification('Erro', err.message, 'error');
                    } finally {
                        btn.disabled = false; btn.textContent = 'Salvar Senha';
                    }
                }
            });
        }
    }
}

async function fetchAndRenderUsers() {
    const listContainer = document.getElementById('usersListContainer');
    listContainer.innerHTML = '<div class="loader col-span-full mx-auto"></div>';
    try {
        // Busca os usuários baseados no contexto global que o Admin está visualizando
        const [users, professionals] = await Promise.all([
            usersApi.getUsers(state.currentViewContext.id), // <- Alterado para o Contexto
            professionalsApi.getProfessionals(state.currentViewContext.id) 
        ]);
        state.users = users;
        state.professionals = professionals; 
        filterAndRenderUsers();
    } catch (error) {
        showNotification('Erro ao carregar usuários.', 'error');
        listContainer.innerHTML = '<p class="col-span-full text-center text-red-500">Falha ao carregar.</p>';
    }
}

export async function loadUsersPage() {
    contentDiv.innerHTML = `
        <style>
            .toggle-bg::after { content: ''; position: absolute; top: 2px; left: 2px; width: 12px; height: 12px; background: white; border-radius: 50%; transition: transform 0.2s; }
            input:checked + .toggle-bg { background-color: #4f46e5; }
            input:checked + .toggle-bg::after { transform: translateX(16px); }
            .custom-scrollbar::-webkit-scrollbar { width: 4px; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 4px; }
        </style>
        <div id="user-list-view" class="relative min-h-full pb-24">
            <section>
                <div class="flex flex-wrap justify-between items-center mb-6 gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <h2 class="text-xl font-bold text-gray-800">Equipe e Acessos</h2>
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" id="showInactiveUsersToggle" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <span class="text-xs font-bold text-gray-600 uppercase">Exibir Inativos</span>
                    </label>
                </div>
                <div id="usersListContainer" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"></div>
            </section>
            
            <button id="fab-new-user" data-action="new-user" title="Novo Usuário" class="fixed bottom-6 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:bg-indigo-700 transition z-50 transform hover:scale-105">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
            </button>
        </div>

        <div id="user-form-view" class="hidden pb-20">
             <section>
                <div class="flex justify-between items-center mb-4 bg-white p-3 rounded-lg shadow-sm border">
                    <h2 id="userFormTitle" class="text-lg font-bold text-gray-800"></h2>
                    <button data-action="back-to-list" class="bg-gray-100 text-gray-600 hover:text-gray-900 font-bold py-1.5 px-3 rounded-md transition text-xs">Voltar</button>
                </div>
                <form id="userForm"></form>
            </section>
        </div>
    `;

    if (usersPageClickListener) contentDiv.removeEventListener('click', usersPageClickListener);
    if (usersPageChangeListener) contentDiv.removeEventListener('change', usersPageChangeListener);

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
                if (await showConfirmation('Excluir Usuário', 'Tem certeza? Ação irreversível.')) {
                    try {
                        await usersApi.deleteUser(actionElement.dataset.userId);
                        showNotification('Usuário excluído!', 'success');
                        loadUsersPage();
                    } catch (error) { showNotification(`Erro: ${error.message}`, 'error'); }
                }
                break;
            }
        }
    };

    usersPageChangeListener = async (e) => {
        const toggle = e.target.closest('input[data-action="toggle-user-status"]');
        if (e.target.id === 'showInactiveUsersToggle') filterAndRenderUsers();
        else if (toggle) {
            e.stopPropagation();
            const userId = toggle.dataset.userId;
            const newStatus = toggle.checked ? 'active' : 'inactive';
            try {
                await usersApi.updateUserStatus(userId, newStatus);
                const userIndex = state.users.findIndex(u => u.id === userId);
                if (userIndex > -1) {
                    state.users[userIndex].status = newStatus;
                    filterAndRenderUsers();
                }
            } catch (error) {
                showNotification(`Erro: ${error.message}`, 'error');
                toggle.checked = !toggle.checked;
            }
        }
    };
    
    contentDiv.addEventListener('click', usersPageClickListener);
    contentDiv.addEventListener('change', usersPageChangeListener);

    await fetchAndRenderUsers();
}