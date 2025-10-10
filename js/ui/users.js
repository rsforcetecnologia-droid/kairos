// js/ui/users.js

import * as usersApi from '../api/users.js';
import * as professionalsApi from '../api/professionals.js'; // <-- Importado
import { state } from '../state.js';
import { showNotification, showConfirmation } from '../components/modal.js';

const contentDiv = document.getElementById('content');
const modules = {
    'agenda-section': 'Agenda',
    'comandas-section': 'Comandas',
    'relatorios-section': 'Relatórios',
    'financial-section': 'Financeiro',
    'servicos-section': 'Serviços',
    'produtos-section': 'Produtos',
    'profissionais-section': 'Profissionais',
    'clientes-section': 'Clientes',
    'packages-section': 'Pacotes', // ADICIONADO
    'commissions-section': 'Comissões', // ADICIONADO
    'estabelecimento-section': 'Configurações do Estabelecimento', // Corrigido/Ajustado rótulo
    'users-section': 'Usuários e Acessos' // Assumido que era a intenção original
};
const permissions = {
    view: 'Visualizar',
    create: 'Criar',
    edit: 'Editar'
};

// Variáveis para guardar a referência dos listeners
let usersPageClickListener = null;
let usersPageChangeListener = null;

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
        const permissionCount = user.permissions ? Object.values(user.permissions).filter(p => p.view).length : 0;
        const userDataString = JSON.stringify(user).replace(/'/g, "&apos;");
        const isActive = user.status === 'active';
        
        // Adiciona a busca pelo nome do profissional associado
        const professional = state.professionals.find(p => p.id === user.professionalId); 
        const professionalName = professional ? professional.name : 'N/A';

        return `
        <div class="bg-white rounded-lg shadow-md p-4 flex flex-col text-center transition-opacity ${!isActive ? 'opacity-60' : ''}">
            <div class="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-3xl mx-auto mb-3">
                ${user.name.charAt(0).toUpperCase()}
            </div>
            <div class="flex-grow">
                <p class="font-bold text-gray-800">${user.name}</p>
                <p class="text-sm text-gray-500 truncate">${user.email}</p>
                <p class="text-xs text-gray-400 mt-2">Profissional: <span class="font-semibold text-gray-700">${professionalName}</span></p>
                <p class="text-xs text-gray-400 pt-2 border-t mt-2">Acesso a ${permissionCount} módulos</p>
            </div>
            <div class="mt-4 flex items-center justify-center gap-2">
                <label class="flex items-center cursor-pointer" title="${isActive ? 'Ativo' : 'Inativo'}">
                    <div class="relative">
                        <input type="checkbox" data-action="toggle-user-status" data-user-id="${user.id}" class="sr-only" ${isActive ? 'checked' : ''}>
                        <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                    </div>
                </label>
                <button data-action="edit-user" data-user='${userDataString}' class="text-gray-500 hover:text-blue-600 p-2 rounded-full transition-colors" title="Editar Permissões">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg>
                </button>
                <button data-action="delete-user" data-user-id="${user.id}" class="text-gray-500 hover:text-red-600 p-2 rounded-full transition-colors" title="Excluir Usuário">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </div>
        </div>
    `}).join('');
}

function filterAndRenderUsers() {
    const showAll = document.getElementById('showInactiveUsersToggle')?.checked;
    
    let filteredUsers;
    if (showAll) {
        filteredUsers = state.users;
    } else {
        filteredUsers = state.users.filter(user => user.status === 'active');
    }
    
    renderUsersList(filteredUsers);
}

// FUNÇÃO ATUALIZADA: Adiciona o controle para a nova permissão "view_all_prof"
function renderPermissionsForm(currentPermissions = {}) {
    return Object.entries(modules).map(([key, title]) => {
        // Verifica se o módulo é Agenda ou Comandas para adicionar a permissão extra
        const isAgendaOrComandas = key === 'agenda-section' || key === 'comandas-section';
        const isViewAllChecked = currentPermissions[key]?.view_all_prof === true;
        
        const permissionToggles = Object.entries(permissions).map(([pKey, pLabel]) => `
             <div class="flex flex-col items-center space-y-1 cursor-pointer">
                <div class="relative">
                    <input type="checkbox" data-module="${key}" data-permission="${pKey}" class="sr-only" 
                        ${currentPermissions[key]?.[pKey] ? 'checked' : ''}>
                    <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                </div>
                <span class="text-xs text-gray-600">${pLabel}</span>
            </div>
        `).join('');

        const specialPermissionHtml = isAgendaOrComandas ? `
            <div class="col-span-full pt-2 mt-2 border-t border-gray-200">
                <label class="flex items-center space-x-3 cursor-pointer">
                    <div class="relative">
                        <input type="checkbox" data-module="${key}" data-permission="view_all_prof" class="sr-only" 
                            ${isViewAllChecked ? 'checked' : ''}>
                        <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                    </div>
                    <span class="text-sm font-semibold text-indigo-600">Ver todos os dados da Equipe</span>
                </label>
            </div>
        ` : '';

        return `
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-3">
            <h4 class="font-bold text-gray-800 border-b pb-2">${title}</h4>
            <div class="grid grid-cols-3 gap-2">
                ${permissionToggles}
            </div>
            ${specialPermissionHtml}
        </div>
    `}).join('');
}

async function showUserFormView(user = null) {
    document.getElementById('user-list-view').classList.add('hidden');
    const formView = document.getElementById('user-form-view');
    formView.classList.remove('hidden');

    // NOVO: Busca de profissionais para o dropdown
    let professionals = state.professionals;
    if (!professionals || professionals.length === 0) {
        try {
            professionals = await professionalsApi.getProfessionals(state.establishmentId);
            state.professionals = professionals; // Cache updated
        } catch(err) {
             showNotification('Erro', 'Não foi possível carregar a lista de profissionais.', 'error');
        }
    }
    
    // Função auxiliar para renderizar opções de profissionais
    const renderProfessionalOptions = (selectedId) => {
        let options = '<option value="">-- Não Associado a um Profissional --</option>';
        options += professionals.map(p => 
            `<option value="${p.id}" ${p.id === selectedId ? 'selected' : ''}>${p.name} (${p.specialty || 'N/A'})</option>`
        ).join('');
        return options;
    };

    const isEditing = user !== null;
    formView.querySelector('#userFormTitle').textContent = isEditing ? `Editar Usuário: ${user.name}` : 'Novo Usuário';

    const form = formView.querySelector('#userForm');
    
    // --- NOVO HTML COM ESTILO MODERNO E MOBILE-LIKE ---
    form.innerHTML = `
        <div class="bg-white p-4 sm:p-6 rounded-xl shadow-2xl space-y-6">
            
            <div class="form-grid">
                <div class="form-group">
                    <label for="userName">Nome Completo</label>
                    <input type="text" id="userName" required value="${user?.name || ''}">
                </div>
                <div class="form-group">
                    <label for="userEmail">Email</label>
                    <input type="email" id="userEmail" required value="${user?.email || ''}" ${isEditing ? 'disabled' : ''}>
                    ${isEditing ? '<p class="text-xs text-gray-500 mt-1">O e-mail não pode ser alterado.</p>' : ''}
                </div>
            </div>

            <div class="form-group">
                <label for="userProfessionalId">Associar a Profissional (Opcional)</label>
                <select id="userProfessionalId" class="mt-1 block w-full">
                    ${renderProfessionalOptions(user?.professionalId)}
                </select>
                <p class="text-xs text-gray-500 mt-1">Define qual profissional este usuário representa na Agenda/Comandas.</p>
            </div>
            
            ${!isEditing ? `
            <div class="form-group border-t pt-4">
                <label for="userPassword">Senha Provisória</label>
                <input type="password" id="userPassword" required placeholder="Mínimo 6 caracteres">
            </div>
            ` : ''}

            ${isEditing ? `
            <div class="border-t pt-6 bg-gray-50 p-4 rounded-lg">
                <h3 class="text-lg font-medium leading-6 text-gray-900">Segurança</h3>
                <div id="password-change-container" class="mt-4">
                    <button type="button" data-action="show-password-form" class="py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition">Alterar Senha</button>
                    <div id="password-form" class="hidden mt-4 space-y-4 max-w-xs">
                        <div class="form-group">
                            <label for="userNewPassword">Nova Senha</label>
                            <input type="password" id="userNewPassword" placeholder="Nova Senha">
                        </div>
                        <div class="flex gap-2">
                             <button type="button" data-action="cancel-password-change" class="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700">Cancelar</button>
                             <button type="button" data-action="save-password" class="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700">Salvar Nova Senha</button>
                        </div>
                    </div>
                </div>
            </div>
            ` : ''}

            <div class="border-t pt-6">
                <h3 class="text-xl font-semibold mb-4 text-gray-900">Permissões de Acesso (Módulos)</h3>
                <div class="space-y-3">
                    ${renderPermissionsForm(user?.permissions)}
                </div>
            </div>

            <div class="flex gap-4 pt-6 border-t">
                <button type="button" data-action="back-to-list" class="flex-1 py-3 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400">Cancelar</button>
                <button type="submit" class="flex-1 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Salvar Alterações</button>
            </div>
        </div>
    `;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const permissions = {};
        form.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            const module = cb.dataset.module;
            const permission = cb.dataset.permission;
            if (!permissions[module]) permissions[module] = {};
            permissions[module][permission] = cb.checked;
        });
        
        const professionalId = form.querySelector('#userProfessionalId').value || null; // <-- CAPTURA professionalId

        const userData = {
            name: form.querySelector('#userName').value,
            permissions,
            professionalId // <-- INCLUI professionalId
        };

        try {
            if (isEditing) {
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

    if (isEditing) {
        const passwordChangeContainer = form.querySelector('#password-change-container');
        const showPasswordBtn = passwordChangeContainer.querySelector('[data-action="show-password-form"]');
        const passwordForm = passwordChangeContainer.querySelector('#password-form');
        const savePasswordBtn = passwordForm.querySelector('[data-action="save-password"]');
        const cancelPasswordBtn = passwordForm.querySelector('[data-action="cancel-password-change"]');

        showPasswordBtn.addEventListener('click', () => {
            showPasswordBtn.classList.add('hidden');
            passwordForm.classList.remove('hidden');
        });

        cancelPasswordBtn.addEventListener('click', () => {
            showPasswordBtn.classList.remove('hidden');
            passwordForm.classList.add('hidden');
            passwordForm.querySelector('#userNewPassword').value = '';
        });

        savePasswordBtn.addEventListener('click', async () => {
            const newPassword = passwordForm.querySelector('#userNewPassword').value;
            if (!newPassword || newPassword.length < 6) {
                showNotification('Senha inválida', 'A nova senha deve ter pelo menos 6 caracteres.', 'error');
                return;
            }

            const confirmed = await showConfirmation('Alterar Senha', 'Tem a certeza que deseja alterar a senha deste usuário?');
            if (confirmed) {
                try {
                    savePasswordBtn.disabled = true;
                    savePasswordBtn.textContent = 'Aguarde...';
                    await usersApi.changeUserPassword(user.id, newPassword);
                    showNotification('Sucesso!', 'A senha do usuário foi alterada.', 'success');

                    showPasswordBtn.classList.remove('hidden');
                    passwordForm.classList.add('hidden');
                    passwordForm.querySelector('#userNewPassword').value = '';

                } catch (error) {
                    showNotification('Erro', `Não foi possível alterar a senha: ${error.message}`, 'error');
                } finally {
                    savePasswordBtn.disabled = false;
                    savePasswordBtn.textContent = 'Salvar Nova Senha';
                }
            }
        });
    }
}

async function fetchAndRenderUsers() {
    const listContainer = document.getElementById('usersListContainer');
    listContainer.innerHTML = '<div class="loader col-span-full mx-auto"></div>';
    try {
        // NOVO: Busca de usuários e profissionais em paralelo
        const [users, professionals] = await Promise.all([
            usersApi.getUsers(state.establishmentId),
            // Obtém todos os profissionais para mapeamento no formulário e na lista
            professionalsApi.getProfessionals(state.establishmentId) 
        ]);
        state.users = users;
        state.professionals = professionals; // Salva a lista de profissionais no estado
        filterAndRenderUsers();
    } catch (error) {
        showNotification('Erro ao carregar usuários.', 'error');
        listContainer.innerHTML = '<p class="col-span-full text-center text-red-500">Não foi possível carregar os usuários.</p>';
    }
}

export async function loadUsersPage() {
    contentDiv.innerHTML = `
        <div id="user-list-view">
            <section>
                <div class="flex flex-wrap justify-between items-center mb-6 gap-4">
                    <h2 class="text-3xl font-bold text-gray-800">Usuários e Acessos</h2>
                    <div class="flex items-center gap-4">
                        <label class="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" id="showInactiveUsersToggle" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                            <span class="text-sm font-medium text-gray-700">Mostrar Todos (inclui inativos)</span>
                        </label>
                        <button data-action="new-user" class="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
                            Novo Usuário
                        </button>
                    </div>
                </div>
                <div id="usersListContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"></div>
            </section>
        </div>
        <div id="user-form-view" class="hidden">
             <section>
                <div class="flex justify-between items-center mb-6">
                    <h2 id="userFormTitle" class="text-3xl font-bold text-gray-800"></h2>
                    <button data-action="back-to-list" class="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition">Voltar</button>
                </div>
                <form id="userForm"></form>
            </section>
        </div>
    `;

    // Gestão dos event listeners para evitar duplicação
    if (usersPageClickListener) {
        contentDiv.removeEventListener('click', usersPageClickListener);
    }
    if (usersPageChangeListener) {
        contentDiv.removeEventListener('change', usersPageChangeListener);
    }

    usersPageClickListener = async (e) => {
        const button = e.target.closest('button[data-action]');
        if (!button) return;

        const action = button.dataset.action;
        switch (action) {
            case 'new-user':
                showUserFormView();
                break;
            case 'edit-user':
                const userData = JSON.parse(button.dataset.user.replace(/&apos;/g, "'"));
                showUserFormView(userData);
                break;
            case 'back-to-list':
                loadUsersPage();
                break;
            case 'delete-user': {
                const userId = button.dataset.userId;
                const confirmed = await showConfirmation('Excluir Usuário', 'Tem certeza que deseja excluir este usuário? Esta ação é irreversível.');
                if (confirmed) {
                    try {
                        await usersApi.deleteUser(userId);
                        showNotification('Usuário excluído com sucesso!', 'success');
                        loadUsersPage();
                    } catch (error) {
                        showNotification(`Erro ao excluir: ${error.message}`, 'error');
                    }
                }
                break;
            }
        }
    };

    usersPageChangeListener = async (e) => {
        const toggle = e.target.closest('input[data-action="toggle-user-status"]');
        if (e.target.id === 'showInactiveUsersToggle') {
            filterAndRenderUsers();
        } else if (toggle) {
            const userId = toggle.dataset.userId;
            const newStatus = toggle.checked ? 'active' : 'inactive';
            
            try {
                await usersApi.updateUserStatus(userId, newStatus);
                showNotification(`Usuário ${newStatus === 'active' ? 'ativado' : 'inativado'} com sucesso.`, 'success');
                const userIndex = state.users.findIndex(u => u.id === userId);
                if (userIndex > -1) {
                    state.users[userIndex].status = newStatus;
                    filterAndRenderUsers();
                }
            } catch (error) {
                showNotification(`Erro ao atualizar status: ${error.message}`, 'error');
                toggle.checked = !toggle.checked;
                // Re-renderiza para reverter visualmente
                filterAndRenderUsers();
            }
        }
    };
    
    contentDiv.addEventListener('click', usersPageClickListener);
    contentDiv.addEventListener('change', usersPageChangeListener);

    await fetchAndRenderUsers();
}