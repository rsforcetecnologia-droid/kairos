// js/ui/users.js

import * as usersApi from '../api/users.js';
import * as professionalsApi from '../api/professionals.js'; 
import { state } from '../state.js';
import { showNotification, showConfirmation } from '../components/modal.js';

const contentDiv = document.getElementById('content');

// --- LISTA DE MÓDULOS ATUALIZADA ---
// Mapeia o ID da rota (data-target) para um Nome Amigável na tela de permissões
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

// Função para renderizar a lista de usuários
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
        
        // Adiciona a busca pelo nome do profissional associado
        const professional = state.professionals.find(p => p.id === user.professionalId); 
        const professionalName = professional ? professional.name : 'N/A';
        
        const photoInitials = professional ? professional.name.charAt(0) : user.name.charAt(0);
        const photoSrc = professional?.photo || `https://placehold.co/64x64/E2E8F0/4A5568?text=${encodeURIComponent(photoInitials)}`;

        return `
        <div class="user-card-clickable bg-white rounded-lg shadow-sm border overflow-hidden flex cursor-pointer ${!isActive ? 'opacity-60' : ''}" 
             data-action="edit-user" 
             data-user='${userDataString}'>
            
            <img src="${photoSrc}" alt="Foto de Perfil" class="w-16 h-16 object-cover flex-shrink-0 pointer-events-none">
            
            <div class="p-3 flex-grow flex flex-col justify-between">
                
                <div class="pointer-events-none">
                    <p class="font-bold text-gray-800 text-sm truncate">${user.name}</p>
                    <p class="text-xs text-gray-500 truncate">${user.email}</p>
                    <p class="text-xs text-gray-400 mt-1">Prof: <span class="font-semibold text-gray-700">${professionalName}</span></p>
                </div>
                
                <div class="mt-2 flex items-center justify-start gap-2">
                    <label class="flex items-center cursor-pointer" title="${isActive ? 'Ativo' : 'Inativo'}">
                        <div class="relative">
                            <input type="checkbox" data-action="toggle-user-status" data-user-id="${user.id}" class="sr-only" ${isActive ? 'checked' : ''}>
                            <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                        </div>
                    </label>
                    
                    <button data-action="delete-user" data-user-id="${user.id}" class="text-gray-500 hover:text-red-600 p-2 rounded-full transition-colors action-btn-delete" title="Excluir Usuário">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    `
    }).join('');
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

// Renderiza o formulário de permissões com base nos módulos definidos
function renderPermissionsForm(currentPermissions = {}) {
    return Object.entries(modules).map(([key, title]) => {
        // Verifica se o módulo é Agenda ou Comandas para adicionar a permissão extra
        const isAgendaOrComandas = key === 'agenda-section' || key === 'comandas-section';
        const isViewAllChecked = currentPermissions[key]?.view_all_prof === true;
        
        const permissionToggles = Object.entries(permissions).map(([pKey, pLabel]) => `
             <label class="flex flex-col items-center space-y-1 cursor-pointer">
                <div class="relative">
                    <input type="checkbox" data-module="${key}" data-permission="${pKey}" class="sr-only" 
                        ${currentPermissions[key]?.[pKey] ? 'checked' : ''}>
                    <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                </div>
                <span class="text-xs text-gray-600">${pLabel}</span>
            </label>
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

    let professionals = state.professionals;
    if (!professionals || professionals.length === 0) {
        try {
            professionals = await professionalsApi.getProfessionals(state.establishmentId);
            state.professionals = professionals;
        } catch(err) {
             showNotification('Erro', 'Não foi possível carregar a lista de profissionais.', 'error');
        }
    }
    
    const getProfessionalById = (id) => professionals.find(p => p.id === id);
    
    const renderUserPhotoPreview = (profId, userName) => {
        const prof = getProfessionalById(profId);
        const photo = prof?.photo;
        const initials = userName ? userName.charAt(0).toUpperCase() : 'U';
        const photoSrc = photo || `https://placehold.co/128x128/E2E8F0/4A5568?text=${initials}`;
        
        return { 
            photoSrc: photoSrc, 
            initials: initials,
            photoUrl: photo || '' 
        };
    };
    
    const initialProfId = user?.professionalId;
    const initialUserName = user?.name || 'Novo Usuário'; 
    const initialPhotoData = renderUserPhotoPreview(initialProfId, initialUserName);
    const initialProf = getProfessionalById(initialProfId);
    
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
    
    form.innerHTML = `
        <div class="bg-white p-4 sm:p-6 rounded-xl shadow-2xl space-y-4">
            
            <div class="flex flex-col items-center mb-4">
                 <img id="userPhotoPreview" src="${initialPhotoData.photoSrc}" alt="Foto de Perfil do Profissional" class="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-gray-200 object-cover">
                 <p id="profPhotoName" class="text-sm text-gray-500">${initialProf ? initialProf.name : 'Selecione um profissional'}</p>
                 <input type="hidden" id="professionalPhotoUrl" value="${initialPhotoData.photoUrl}">
            </div>

            <div class="bg-blue-50 p-4 rounded-lg space-y-3">
                 <h3 class="font-bold text-lg text-blue-800">Dados de Acesso</h3>
                <div class="form-group">
                    <label for="userName">Nome Completo</label>
                    <input type="text" id="userName" required value="${user?.name || ''}">
                </div>
                <div class="form-group">
                    <label for="userEmail">Email</label>
                    <input type="email" id="userEmail" required value="${user?.email || ''}">
                    ${isEditing ? '<p class="text-xs text-gray-700 mt-1"></p>' : ''}
                </div>
            </div>

            <div class="bg-yellow-50 p-4 rounded-lg space-y-3">
                 <h3 class="font-bold text-lg text-yellow-800">Associação (Agenda)</h3>
                <div class="form-group">
                    <label for="userProfessionalId">Associar a Profissional (Opcional)</label>
                    <select id="userProfessionalId" class="mt-1 block w-full">
                        ${renderProfessionalOptions(user?.professionalId)}
                    </select>
                    <p class="text-xs text-gray-700 mt-1">Define qual profissional este usuário representa na Agenda/Comandas.</p>
                </div>
            </div>
            
            ${!isEditing ? `
            <div class="bg-red-50 p-4 rounded-lg space-y-3">
                 <h3 class="font-bold text-lg text-red-800">Senha Provisória</h3>
                 <div class="form-group">
                     <label for="userPassword">Senha Provisória</label>
                     <input type="password" id="userPassword" required placeholder="Mínimo 6 caracteres">
                 </div>
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

    const isMobile = window.innerWidth < 768; 
    const formContainer = form.querySelector('.bg-white');

    if (isMobile && formContainer) {
        formContainer.classList.remove('rounded-xl', 'shadow-2xl', 'sm:p-6');
        
        const parentSection = form.closest('section');
        if (parentSection) {
            parentSection.style.padding = '0';
            parentSection.style.margin = '0';
        }
        
        formContainer.classList.add('p-4'); 
    }
    
    const professionalSelect = form.querySelector('#userProfessionalId');
    const photoPreviewEl = form.querySelector('#userPhotoPreview');
    const profPhotoNameEl = form.querySelector('#profPhotoName');
    
    professionalSelect.addEventListener('change', (e) => {
        const newProfId = e.target.value;
        const prof = getProfessionalById(newProfId);
        const nameToDisplay = prof ? prof.name : 'Selecione um profissional';
        const photoData = renderUserPhotoPreview(newProfId, initialUserName);
        photoPreviewEl.src = photoData.photoSrc;
        profPhotoNameEl.textContent = nameToDisplay;
        form.querySelector('#professionalPhotoUrl').value = photoData.photoUrl;
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const currentEmail = user?.email;
        const newEmail = form.querySelector('#userEmail').value;
        
        const permissions = {};
        form.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            const module = cb.dataset.module;
            const permission = cb.dataset.permission;
            if (!permissions[module]) permissions[module] = {};
            permissions[module][permission] = cb.checked;
        });
        
        const professionalId = form.querySelector('#userProfessionalId').value || null;

        const userData = {
            name: form.querySelector('#userName').value,
            permissions,
            professionalId,
            establishmentId: state.establishmentId // <-- CORREÇÃO DE SEGURANÇA: VINCULAÇÃO FORÇADA AO ESTABELECIMENTO
        };

        try {
            if (isEditing) {
                if (currentEmail !== newEmail) {
                    userData.email = newEmail;
                }
                
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
        const [users, professionals] = await Promise.all([
            usersApi.getUsers(state.establishmentId),
            professionalsApi.getProfessionals(state.establishmentId) 
        ]);
        state.users = users;
        state.professionals = professionals; 
        filterAndRenderUsers();
    } catch (error) {
        showNotification('Erro ao carregar usuários.', 'error');
        listContainer.innerHTML = '<p class="col-span-full text-center text-red-500">Não foi possível carregar os usuários.</p>';
    }
}

export async function loadUsersPage() {
    contentDiv.innerHTML = `
        <div id="user-list-view" class="relative min-h-full" style="padding-bottom: 6rem;">
            <section>
                <div class="flex flex-wrap justify-between items-center mb-6 gap-4">
                    <h2 class="text-3xl font-bold text-gray-800">Usuários e Acessos</h2>
                    <div class="flex items-center gap-4">
                        <label class="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" id="showInactiveUsersToggle" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                            <span class="text-sm font-medium text-gray-700">Mostrar Todos (inclui inativos)</span>
                        </label>
                        </div>
                </div>
                <div id="usersListContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"></div>
            </section>
            
            <button id="fab-new-user" data-action="new-user" title="Novo Usuário">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </button>
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

    if (usersPageClickListener) {
        contentDiv.removeEventListener('click', usersPageClickListener);
    }
    if (usersPageChangeListener) {
        contentDiv.removeEventListener('change', usersPageChangeListener);
    }

    usersPageClickListener = async (e) => {
        if (!document.getElementById('user-list-view')) {
            contentDiv.removeEventListener('click', usersPageClickListener);
            return;
        }

        const actionElement = e.target.closest('[data-action]');
        if (!actionElement) return;

        const action = actionElement.dataset.action;
        switch (action) {
            case 'new-user':
                showUserFormView();
                break;
            case 'edit-user':
                const userData = JSON.parse(actionElement.dataset.user.replace(/&apos;/g, "'"));
                showUserFormView(userData);
                break;
            case 'back-to-list':
                loadUsersPage();
                break;
            case 'delete-user': {
                e.stopPropagation(); 
                const userId = actionElement.dataset.userId;
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
        if (!document.getElementById('user-list-view')) {
            contentDiv.removeEventListener('change', usersPageChangeListener);
            return;
        }

        const toggle = e.target.closest('input[data-action="toggle-user-status"]');
        if (e.target.id === 'showInactiveUsersToggle') {
            filterAndRenderUsers();
        } else if (toggle) {
            e.stopPropagation();
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
                filterAndRenderUsers();
            }
        }
    };
    
    contentDiv.addEventListener('click', usersPageClickListener);
    contentDiv.addEventListener('change', usersPageChangeListener);

    await fetchAndRenderUsers();
}