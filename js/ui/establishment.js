// js/ui/establishment.js (Otimizado com Multi-Tenant Enterprise - 3 Níveis)

import * as establishmentApi from '../api/establishments.js';
import * as financialApi from '../api/financial.js';
import * as servicesApi from '../api/services.js';
import * as productsApi from '../api/products.js';
import * as packagesApi from '../api/packages.js';
import { state } from '../state.js';
import { showNotification, showGenericModal } from '../components/modal.js';
import { auth } from '../firebase-config.js';
import { updatePassword, updateProfile, verifyBeforeUpdateEmail, reauthenticateWithCredential, EmailAuthProvider } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js"; 
import { navigateTo } from '../main.js';
import { escapeHTML } from '../utils.js'; 

const contentDiv = document.getElementById('content');
const daysOfWeek = { monday: 'Segunda', tuesday: 'Terça', wednesday: 'Quarta', thursday: 'Quinta', friday: 'Sexta', saturday: 'Sábado', sunday: 'Domingo' };

const colorThemes = {
    indigo: { name: 'Padrão (Índigo)', main: '#4f46e5' },
    blue:   { name: 'Azul', main: '#2563eb' },
    sky:    { name: 'Céu', main: '#0284c7' },
    teal:   { name: 'Verde Água', main: '#0d9488' },
    emerald:{ name: 'Esmeralda', main: '#059669' },
    green:  { name: 'Verde', main: '#16a34a' },
    lime:   { name: 'Lima', main: '#65a30d' },
    amber:  { name: 'Âmbar', main: '#d97706' },
    orange: { name: 'Laranja', main: '#ea580c' },
    red:    { name: 'Vermelho', main: '#dc2626' },
    rose:   { name: 'Rosa', main: '#e11d48' },
    pink:   { name: 'Pink', main: '#db2777' },
    fuchsia:{ name: 'Fúcsia', main: '#c026d3' },
    purple: { name: 'Roxo', main: '#7c3aed' },
    violet: { name: 'Violeta', main: '#8b5cf6' },
    gray:   { name: 'Cinza', main: '#4b5563' },
    black:  { name: 'Preto', main: '#111827' },
};

// MENU DE DEFINIÇÕES DINÂMICO
function getMenuItems() {
    let items = [
        { id: 'personal-data', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', label: 'Dados Gerais da Unidade' },
        { id: 'branding', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z', label: 'Identidade e Cores'},
        { id: 'booking', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'Agendamento Online' },
        { id: 'working-hours', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Horário de Funcionamento' },
        { id: 'loyalty', icon: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h2V5z', label: 'Plano de Fidelidade' },
        { id: 'financial', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z', label: 'Integração Financeira' },
        { id: 'change-password', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', label: 'Alterar senha' },
        { id: 'change-email', icon: 'M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207', label: 'Alterar E-mail de Acesso' },
        { id: 'support', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z', label: 'Suporte e Ajuda' },
        { id: 'cancellation', icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Cancelar Assinatura' },
    ];

    // Se o usuário for Administrador de Grupo ou de Empresa, liberta o menu de Rede
    if (state.userRole === 'group_admin' || state.userRole === 'company_admin') {
        items.unshift({ id: 'manage-network', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', label: 'Gestão de Múltiplas Filiais e Empresas' });
    }

    return items;
}

let establishmentData = null; 
let currentHierarchyData = null; // Cache da Hierarquia

// --- 1. FUNÇÕES AUXILIARES ---

function compressImage(file, maxWidth, quality) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = event => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                const mimeType = file.type === 'image/png' && maxWidth < 500 ? 'image/png' : 'image/jpeg'; 
                resolve(canvas.toDataURL(mimeType, quality));
            };
            img.onerror = error => reject(error);
        };
        reader.onerror = error => reject(error);
    });
}

function buildHierarchyOptions(items, currentId = null) {
    let optionsHTML = '<option value="">-- Selecione (Opcional) --</option>';
    const buildHierarchy = (list) => {
        const map = new Map();
        const roots = [];
        if (!list) return roots;
        list.forEach(item => map.set(item.id, { ...item, children: [] }));
        map.forEach(item => {
            if (item.parentId && map.has(item.parentId)) {
                map.get(item.parentId).children.push(item);
            } else {
                roots.push(item);
            }
        });
        return roots;
    };
    const renderOption = (item, prefix = '') => {
        const isSelected = item.id === currentId ? 'selected' : '';
        optionsHTML += `<option value="${item.id}" ${isSelected}>${prefix}${escapeHTML(item.name)}</option>`;
        item.children.forEach(child => renderOption(child, prefix + '— '));
    };
    const hierarchy = buildHierarchy(items);
    hierarchy.forEach(root => renderOption(root));
    return optionsHTML;
}

async function handleSave(formData, event) {
    const saveButton = event.target.querySelector('button[type="submit"]');
    if (saveButton) {
        saveButton.disabled = true;
        saveButton.textContent = 'A Salvar...';
    }
    try {
        const existingData = establishmentData || await establishmentApi.getEstablishmentDetails(state.establishmentId);
        const updatePromises = [];
        
        const { ownerName, ...firestoreData } = formData;

        if (ownerName && ownerName !== state.userName) {
             const user = auth.currentUser;
             if (user) {
                   updatePromises.push(updateProfile(user, { displayName: ownerName }).then(() => { state.userName = ownerName; }));
             }
        }
        
        const updatedData = { ...existingData, ...firestoreData };
        // Atualiza SEMPRE na filial que o Administrador está a editar (o contexto atual)
        updatePromises.push(establishmentApi.updateEstablishmentDetails(state.currentViewContext?.id || state.establishmentId, updatedData));

        await Promise.all(updatePromises);
        
        establishmentData = updatedData;

        showNotification('Sucesso', 'Definições salvas com sucesso! A página será recarregada para aplicar o novo tema.', 'success');
        
        if (firestoreData.themeColor) {
            setTimeout(() => window.location.reload(), 1500);
        }
        
    } catch (error) {
        showNotification('Erro', `Não foi possível salvar: ${error.message}`, 'error');
    } finally {
        if (saveButton) {
            saveButton.disabled = false;
            saveButton.textContent = 'Salvar';
        }
    }
}

// =========================================================================================
// NOVO MÓDULO: GESTÃO DE REDES (ENTERPRISE)
// =========================================================================================

async function loadHierarchyData() {
    try {
        const token = await state.getAuthToken?.() || await auth.currentUser.getIdToken();
        const res = await fetch('/api/establishments/hierarchy', { headers: { 'Authorization': `Bearer ${token}` } });
        if (!res.ok) throw new Error('Falha ao obter hierarquia.');
        currentHierarchyData = await res.json();
    } catch (e) {
        console.error(e);
        showNotification('Erro', 'Não foi possível carregar a hierarquia da empresa.', 'error');
        currentHierarchyData = { companies: [], branches: [] };
    }
}

async function renderManageNetworkSection(container) {
    container.innerHTML = `<div class="flex justify-center py-10"><div class="loader"></div></div>`;
    await loadHierarchyData();

    let html = `
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b pb-4">
                <div>
                    <h3 class="text-xl font-bold text-indigo-900">Gestão de Empresas e Filiais</h3>
                    <p class="text-sm text-gray-500">Controle a estrutura completa da sua rede.</p>
                </div>
                <div class="flex gap-2">
                    <button data-action="new-company" class="bg-indigo-50 border border-indigo-200 text-indigo-700 font-semibold py-2 px-3 rounded-lg hover:bg-indigo-100 text-xs">
                        + Nova Empresa (Matriz)
                    </button>
                    <button data-action="new-branch" class="bg-indigo-600 text-white font-semibold py-2 px-3 rounded-lg hover:bg-indigo-700 text-xs shadow-sm">
                        + Nova Filial (Loja)
                    </button>
                </div>
            </div>
            
            <div class="space-y-6">
    `;

    if (currentHierarchyData.companies.length === 0) {
        html += `<p class="text-gray-500 text-center py-8">Nenhuma empresa registada na sua rede.</p>`;
    } else {
        currentHierarchyData.companies.forEach(company => {
            const branches = currentHierarchyData.branches.filter(b => b.companyId === company.id);
            
            html += `
                <div class="border border-gray-200 rounded-xl overflow-hidden">
                    <div class="bg-gray-50 p-4 border-b flex justify-between items-center">
                        <div>
                            <h4 class="font-bold text-gray-800 text-lg flex items-center gap-2">
                                🏢 ${escapeHTML(company.name)}
                            </h4>
                            <p class="text-xs text-gray-500 ml-6">CNPJ: ${escapeHTML(company.cnpj || 'Não registado')}</p>
                        </div>
                    </div>
                    
                    <div class="p-4 bg-white">
                        <h5 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Filiais Registadas (${branches.length})</h5>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            ${branches.length === 0 ? `<p class="text-sm text-gray-400 italic">Nenhuma filial associada a esta matriz.</p>` : ''}
                            ${branches.map(branch => `
                                <div class="p-3 border rounded-lg bg-gray-50 hover:border-indigo-300 transition-colors flex justify-between items-center">
                                    <div>
                                        <p class="font-bold text-sm text-gray-800">📍 ${escapeHTML(branch.name)}</p>
                                        <p class="text-[10px] text-gray-500">ID: ${branch.id}</p>
                                    </div>
                                    <button data-action="switch-context" data-id="${branch.id}" data-name="${escapeHTML(branch.name)}" class="text-xs bg-white border border-gray-300 px-2 py-1 rounded hover:bg-gray-100 font-semibold shadow-sm">
                                        Gerir Unidade
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        });
    }

    html += `</div></div>`;
    container.innerHTML = html;

    // Listeners do Menu de Redes
    container.querySelector('[data-action="new-company"]').addEventListener('click', () => openCompanyModal());
    container.querySelector('[data-action="new-branch"]').addEventListener('click', () => openBranchModal());
    
    container.querySelectorAll('[data-action="switch-context"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const { id, name } = e.target.dataset;
            // Dispara mudança de contexto para a unidade escolhida para que o dono a edite diretamente
            if (state.setContext) {
                state.setContext('BRANCH', id, name);
                showNotification('A carregar...', `Mudando o painel para a filial ${name}`, 'info');
            } else {
                showNotification('Erro', 'O mecanismo de multi-empresa ainda está a carregar.', 'error');
            }
        });
    });
}

function openCompanyModal() {
    const modalHtml = `
        <form id="newCompanyForm" class="space-y-4 p-4">
            <div>
                <label class="block text-sm font-medium text-gray-700">Nome da Matriz (Empresa)</label>
                <input type="text" id="compName" required class="mt-1 w-full p-2 border rounded-md">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">CNPJ (Opcional)</label>
                <input type="text" id="compCnpj" class="mt-1 w-full p-2 border rounded-md">
            </div>
            <div class="flex justify-end gap-2 pt-4">
                <button type="button" data-action="close-modal" data-target="genericModal" class="px-4 py-2 bg-gray-200 text-gray-800 rounded">Cancelar</button>
                <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded font-bold">Criar Matriz</button>
            </div>
        </form>
    `;
    
    showGenericModal({ title: 'Adicionar Nova Empresa (Matriz)', contentHTML: modalHtml, maxWidth: 'max-w-md' });

    document.getElementById('newCompanyForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        btn.disabled = true; btn.textContent = '...';
        try {
            const token = await state.getAuthToken?.() || await auth.currentUser.getIdToken();
            const res = await fetch('/api/establishments/companies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    name: document.getElementById('compName').value,
                    cnpj: document.getElementById('compCnpj').value,
                    groupId: state.groupId // Passa o grupo pai
                })
            });
            if (!res.ok) throw new Error('Falha ao criar');
            showNotification('Sucesso', 'Nova Matriz criada!', 'success');
            document.getElementById('genericModal').style.display = 'none';
            // Recarrega a view
            renderManageNetworkSection(document.getElementById('settings-content-detail'));
        } catch (error) {
            showNotification('Erro', error.message, 'error');
            btn.disabled = false; btn.textContent = 'Criar Matriz';
        }
    });
}

function openBranchModal() {
    const companiesOptions = currentHierarchyData.companies.map(c => `<option value="${c.id}">${c.name}</option>`).join('');

    if (!companiesOptions) {
        return showNotification('Aviso', 'Crie uma Empresa (Matriz) primeiro.', 'error');
    }

    const modalHtml = `
        <form id="newBranchForm" class="space-y-4 p-4">
            <div>
                <label class="block text-sm font-medium text-gray-700">Selecione a Matriz</label>
                <select id="branchCompanyId" required class="mt-1 w-full p-2 border rounded-md bg-white">
                    <option value="">Selecione...</option>
                    ${companiesOptions}
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Nome da Filial (Ex: Shopping Sul)</label>
                <input type="text" id="branchName" required class="mt-1 w-full p-2 border rounded-md">
            </div>
            <div class="flex justify-end gap-2 pt-4">
                <button type="button" data-action="close-modal" data-target="genericModal" class="px-4 py-2 bg-gray-200 text-gray-800 rounded">Cancelar</button>
                <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded font-bold">Criar Filial</button>
            </div>
        </form>
    `;
    
    showGenericModal({ title: 'Adicionar Nova Filial', contentHTML: modalHtml, maxWidth: 'max-w-md' });

    document.getElementById('newBranchForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        btn.disabled = true; btn.textContent = '...';
        try {
            const token = await state.getAuthToken?.() || await auth.currentUser.getIdToken();
            const res = await fetch('/api/establishments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    name: document.getElementById('branchName').value,
                    companyId: document.getElementById('branchCompanyId').value,
                    groupId: state.groupId
                })
            });
            if (!res.ok) throw new Error('Falha ao criar');
            showNotification('Sucesso', 'Nova Filial criada e configurada!', 'success');
            document.getElementById('genericModal').style.display = 'none';
            renderManageNetworkSection(document.getElementById('settings-content-detail'));
        } catch (error) {
            showNotification('Erro', error.message, 'error');
            btn.disabled = false; btn.textContent = 'Criar Filial';
        }
    });
}

// =========================================================================================

// --- FUNÇÕES ORIGINAIS DE RENDERIZAÇÃO DAS SECÇÕES ---
function renderPersonalDataSection(data, container) {
    const safeName = escapeHTML(data.name || '');
    const safePhone = escapeHTML(data.phone || '');
    const safeDoc = escapeHTML(data.document || '');
    const safeEmail = escapeHTML(data.email || '');
    const safeAddr = escapeHTML(data.address || '');
    const safeWeb = escapeHTML(data.website || '');
    const safeUserName = escapeHTML(state.userName || '');

    container.innerHTML = `
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-gray-800">Dados Gerais e de Contato</h3>
                <button type="submit" form="personal-data-form" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Salvar</button>
            </div>
            <form id="personal-data-form" class="space-y-4">
                <div>
                    <label for="ownerName" class="block text-sm font-medium text-gray-700">Seu nome (Dono)</label>
                    <input type="text" id="ownerName" class="mt-1 w-full p-2 border border-gray-300 rounded-md" value="${safeUserName}">
                </div>
                <div>
                    <label for="establishmentName" class="block text-sm font-medium text-gray-700">Nome do Salão ou Barbearia</label>
                    <input type="text" id="establishmentName" class="mt-1 w-full p-2 border border-gray-300 rounded-md" value="${safeName}">
                </div>
                <div>
                    <label for="establishmentPhone" class="block text-sm font-medium text-gray-700">Telefone Principal</label>
                    <input type="tel" id="establishmentPhone" class="mt-1 w-full p-2 border border-gray-300 rounded-md" value="${safePhone}">
                </div>
                <div>
                    <label for="establishmentCnpjCpf" class="block text-sm font-medium text-gray-700">CNPJ / CPF</label>
                    <input type="text" id="establishmentCnpjCpf" value="${safeDoc}" class="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm">
                </div>
                <div>
                    <label for="establishmentEmail" class="block text-sm font-medium text-gray-700">E-mail de Contato</label>
                    <input type="email" id="establishmentEmail" value="${safeEmail}" class="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm">
                </div>
                <div>
                    <label for="establishmentAddress" class="block text-sm font-medium text-gray-700">Endereço Completo</label>
                    <input type="text" id="establishmentAddress" value="${safeAddr}" class="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm">
                </div>
                <div>
                    <label for="establishmentWebsite" class="block text-sm font-medium text-gray-700">Website</label>
                    <input type="url" id="establishmentWebsite" value="${safeWeb}" class="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm">
                </div>
            </form>
        </div>
    `;
    container.querySelector('#personal-data-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            ownerName: container.querySelector('#ownerName').value,
            name: container.querySelector('#establishmentName').value,
            phone: container.querySelector('#establishmentPhone').value,
            document: container.querySelector('#establishmentCnpjCpf').value,
            email: container.querySelector('#establishmentEmail').value,
            address: container.querySelector('#establishmentAddress').value,
            website: container.querySelector('#establishmentWebsite').value,
        };
        handleSave(formData, e);
    });
}

function renderChangePasswordSection(data, container) {
    container.innerHTML = `
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-gray-800">Alterar Senha</h3>
                <button type="submit" form="change-password-form" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Salvar Nova Senha</button>
            </div>
            <form id="change-password-form" class="space-y-4">
                <div>
                    <label for="newPassword" class="block text-sm font-medium text-gray-700">Nova Senha</label>
                    <input type="password" id="newPassword" class="mt-1 w-full p-2 border border-gray-300 rounded-md" required minlength="6">
                </div>
                <div>
                    <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmar Nova Senha</label>
                    <input type="password" id="confirmPassword" class="mt-1 w-full p-2 border border-gray-300 rounded-md" required>
                </div>
            </form>
        </div>
    `;
    container.querySelector('#change-password-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const newPassword = container.querySelector('#newPassword').value;
        const confirmPassword = container.querySelector('#confirmPassword').value;
        if (newPassword !== confirmPassword) {
            showNotification('Erro', 'As senhas não coincidem.', 'error');
            return;
        }
        const saveButton = container.querySelector('button[form="change-password-form"]');
        saveButton.disabled = true;
        saveButton.textContent = 'A Salvar...';
        try {
            const user = auth.currentUser;
            if (user) {
                await updatePassword(user, newPassword);
                showNotification('Sucesso', 'Senha alterada com sucesso!', 'success');
                e.target.reset();
            } else {
                throw new Error("Nenhum usuário autenticado encontrado.");
            }
        } catch (error) {
            showNotification('Erro', `Não foi possível alterar a senha: ${error.message}`, 'error');
        } finally {
            saveButton.disabled = false;
            saveButton.textContent = 'Salvar Nova Senha';
        }
    });
}

function renderChangeEmailSection(data, container) {
    container.innerHTML = `
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-gray-800">Alterar E-mail de Acesso</h3>
                <button type="submit" form="change-email-form" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Salvar Novo E-mail</button>
            </div>
            <form id="change-email-form" class="space-y-4">
                <p class="text-sm text-gray-600">Para alterar seu e-mail de login, por favor, confirme sua senha atual. Um e-mail de verificação será enviado para o seu **novo** endereço.</p>
                <div>
                    <label for="newEmail" class="block text-sm font-medium text-gray-700">Novo E-mail</label>
                    <input type="email" id="newEmail" class="mt-1 w-full p-2 border border-gray-300 rounded-md" required>
                </div>
                <div>
                    <label for="currentPassword" class="block text-sm font-medium text-gray-700">Senha Atual</label>
                    <input type="password" id="currentPassword" class="mt-1 w-full p-2 border border-gray-300 rounded-md" required>
                </div>
            </form>
        </div>
    `;
    
    container.querySelector('#change-email-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const newEmail = container.querySelector('#newEmail').value;
        const currentPassword = container.querySelector('#currentPassword').value;
        
        if (!newEmail || !currentPassword) {
            showNotification('Erro', 'Preencha todos os campos.', 'error');
            return;
        }

        const saveButton = container.querySelector('button[form="change-email-form"]');
        saveButton.disabled = true;
        saveButton.textContent = 'A verificar...';

        try {
            const user = auth.currentUser;
            if (!user) throw new Error("Usuário não autenticado.");

            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);

            saveButton.textContent = 'A enviar link...';
            await verifyBeforeUpdateEmail(user, newEmail); 

            saveButton.textContent = 'A atualizar BD...';
            await establishmentApi.updateOwnerEmail(state.establishmentId, newEmail);

            showNotification('Sucesso', 'Link de verificação enviado! Por favor, verifique seu **novo e-mail** para confirmar a alteração.', 'success');
            e.target.reset();

        } catch (error) {
            let friendlyMessage = 'Não foi possível alterar o e-mail.';
            if (error.code === 'auth/wrong-password') {
                friendlyMessage = 'A senha atual está incorreta.';
            } else if (error.code === 'auth/email-already-in-use') {
                friendlyMessage = 'Este e-mail já está sendo usado por outra conta.';
            } else if (error.code === 'auth/operation-not-allowed') {
                 friendlyMessage = 'A troca de e-mail precisa ser habilitada no console do Firebase.';
            } else {
                friendlyMessage = error.message;
            }
            showNotification('Erro', friendlyMessage, 'error');
        } finally {
            saveButton.disabled = false;
            saveButton.textContent = 'Salvar Novo E-mail';
        }
    });
}

function renderBrandingSection(data, container) {
    const safeWelcome = escapeHTML(data.welcomeMessage || '');
    
    container.innerHTML = `
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-gray-800">Identidade Visual e Cores</h3>
                <button type="submit" form="branding-form" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Salvar</button>
            </div>
            <form id="branding-form" class="space-y-8">
                <input type="hidden" id="establishmentLogoBase64">
                <input type="hidden" id="establishmentBackgroundImageBase64">
                <input type="hidden" id="establishmentThemeColor">
                
                <div class="flex flex-col md:flex-row items-center gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Logotipo</label>
                        <img id="establishmentLogoPreview" src="${data.logo || 'https://placehold.co/128x128/E2E8F0/4A5568?text=Logo'}" class="mt-2 h-24 w-24 rounded-lg object-contain border p-1 bg-gray-50">
                    </div>
                    <div class="flex-grow">
                        <input type="file" id="establishmentLogoInput" class="hidden" accept="image/*">
                        <button type="button" id="establishmentLogoButton" class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Alterar Logotipo</button>
                        <p class="text-xs text-gray-500 mt-2">Recomendado: PNG ou JPG.</p>
                    </div>
                </div>

                <div class="border-t pt-4 mt-4">
                    <h4 class="text-lg font-semibold text-gray-800 mb-4">Personalização do Link de Agendamento</h4>
                    
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700">Imagem de Fundo</label>
                        <div class="mt-2 flex items-center gap-4">
                            <div class="h-32 w-20 bg-gray-100 border rounded-lg overflow-hidden relative group">
                                 <img id="establishmentBgPreview" src="${data.backgroundImage || ''}" class="w-full h-full object-cover ${!data.backgroundImage ? 'hidden' : ''}">
                                 <div id="establishmentBgPlaceholder" class="${data.backgroundImage ? 'hidden' : 'flex'} w-full h-full items-center justify-center text-gray-400 text-xs text-center p-1">Sem Imagem</div>
                            </div>
                            <div class="flex-grow">
                                <input type="file" id="establishmentBgInput" class="hidden" accept="image/*">
                                <button type="button" id="establishmentBgButton" class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Carregar Imagem</button>
                                <button type="button" id="establishmentBgRemoveBtn" class="ml-2 text-red-600 text-sm hover:underline">Remover</button>
                                <p class="text-xs text-gray-500 mt-2">Aparecerá no fundo do agendamento online. Aceita imagens de qualquer tamanho (serão otimizadas automaticamente).</p>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Cor Principal (Botões/Ícones)</label>
                            <div class="flex items-center gap-3">
                                <input type="color" id="establishmentPrimaryColorInput" value="${data.primaryColor || data.themeColor || '#4f46e5'}" class="h-10 w-20 p-1 rounded border border-gray-300 cursor-pointer">
                            </div>
                        </div>

                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Cor do Texto (Nome/Mensagem)</label>
                            <div class="flex items-center gap-3">
                                <input type="color" id="establishmentTextColorInput" value="${data.textColor || '#111827'}" class="h-10 w-20 p-1 rounded border border-gray-300 cursor-pointer">
                                <span class="text-xs text-gray-500">Ajuste para melhorar a leitura sobre a imagem.</span>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <label for="establishmentWelcomeMessage" class="block text-sm font-medium text-gray-700">Mensagem de Boas-Vindas</label>
                        <input type="text" id="establishmentWelcomeMessage" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Ex: Simples, rápido e à sua medida." value="${safeWelcome}">
                    </div>
                </div>

                <div class="border-t pt-4 mt-4">
                    <h4 class="text-lg font-semibold text-gray-800 mb-2">Tema do Painel (Sistema)</h4>
                    <p class="text-sm text-gray-600 mb-4">Escolha a cor dos menus e botões do <strong>seu</strong> painel de gestão.</p>
                    <div id="color-palette-container" class="flex flex-wrap gap-4"></div>
                </div>
            </form>
        </div>
    `;
    
    container.querySelector('#establishmentLogoBase64').value = data.logo || '';
    container.querySelector('#establishmentBackgroundImageBase64').value = data.backgroundImage || '';

    renderColorPalette(data.themeColor || 'indigo', container);

    container.querySelector('#establishmentLogoButton').onclick = () => container.querySelector('#establishmentLogoInput').click();
    container.querySelector('#establishmentLogoInput').onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const resizedBase64 = await compressImage(file, 300, 0.9);
                container.querySelector('#establishmentLogoPreview').src = resizedBase64;
                container.querySelector('#establishmentLogoBase64').value = resizedBase64;
            } catch (error) {
                showNotification('Erro', 'Formato de imagem inválido ou corrompido.', 'error');
            }
        }
    };

    container.querySelector('#establishmentBgButton').onclick = () => container.querySelector('#establishmentBgInput').click();
    container.querySelector('#establishmentBgInput').onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const btn = container.querySelector('#establishmentBgButton');
            const originalText = btn.textContent;
            try {
                btn.textContent = 'A processar...';
                btn.disabled = true;
                const resizedBase64 = await compressImage(file, 1280, 0.7);
                container.querySelector('#establishmentBgPreview').src = resizedBase64;
                container.querySelector('#establishmentBgPreview').classList.remove('hidden');
                container.querySelector('#establishmentBgPlaceholder').classList.add('hidden');
                container.querySelector('#establishmentBackgroundImageBase64').value = resizedBase64;
            } catch (error) {
                showNotification('Erro', 'Não foi possível processar esta imagem. Tente outra.', 'error');
            } finally {
                btn.textContent = originalText;
                btn.disabled = false;
            }
        }
    };
    
    container.querySelector('#establishmentBgRemoveBtn').onclick = () => {
        container.querySelector('#establishmentBgPreview').src = '';
        container.querySelector('#establishmentBgPreview').classList.add('hidden');
        container.querySelector('#establishmentBgPlaceholder').classList.remove('hidden');
        container.querySelector('#establishmentBackgroundImageBase64').value = '';
    };

    container.querySelector('#branding-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            logo: container.querySelector('#establishmentLogoBase64').value,
            welcomeMessage: container.querySelector('#establishmentWelcomeMessage').value,
            backgroundImage: container.querySelector('#establishmentBackgroundImageBase64').value,
            primaryColor: container.querySelector('#establishmentPrimaryColorInput').value,
            textColor: container.querySelector('#establishmentTextColorInput').value, 
            themeColor: container.querySelector('#establishmentThemeColor').value 
        };
        handleSave(formData, e);
    });
}

function renderBookingSection(data, container) {
    const linkId = data.urlId || state.establishmentId;
    const productionUrl = 'https://www.kairosagenda.com.br'; 
    let baseUrl = window.location.origin;
    if (baseUrl.includes('localhost') || baseUrl.includes('capacitor://') || baseUrl.includes('127.0.0.1') || baseUrl.includes('192.168')) {
        baseUrl = productionUrl;
    }
    const bookingLink = escapeHTML(`${baseUrl}/agendar?id=${linkId}`);
    
    const isChecked = data.publicBookingEnabled || false;
    const toggleText = isChecked ? "Agendamento Online ATIVO" : "Agendamento Online INATIVO";
    const statusColor = isChecked ? "text-green-600" : "text-red-600";

    container.innerHTML = `
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md space-y-8">
            <div>
                <div class="flex justify-between items-center mb-6 border-b pb-4">
                    <h3 class="text-xl font-bold text-gray-800">Link Público de Agendamento</h3>
                </div>
                <p class="text-sm text-gray-600 mb-4">Este é o link exclusivo que você pode partilhar com os seus clientes.</p>
                <div class="flex flex-col sm:flex-row gap-2">
                    <input type="text" id="publicBookingLink" value="${bookingLink}" readonly class="flex-1 p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                    <button type="button" id="copyBookingLinkBtn" class="py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">Copiar Link</button>
                </div>
            </div>

            <div>
                <h3 class="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Status do Agendamento Online</h3>
                <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <label for="publicBookingToggle" class="flex items-center cursor-pointer">
                        <div class="relative">
                            <input type="checkbox" id="publicBookingToggle" class="sr-only" ${isChecked ? 'checked' : ''}>
                            <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                        </div>
                    </label>
                    <span id="publicBookingStatusText" class="text-sm font-semibold ${statusColor}">${toggleText}</span>
                </div>
            </div>

            <div class="pt-8 border-t">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-gray-800">Intervalo de Horários</h3>
                    <button type="submit" form="booking-form" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Salvar Intervalo</button>
                </div>
                <form id="booking-form" class="space-y-4">
                    <input type="hidden" id="establishmentSlotInterval">
                    <h4 class="text-md font-semibold text-gray-800 mb-2">Intervalo entre agendamentos</h4>
                    <div id="slotIntervalContainer" class="flex flex-wrap gap-2"></div>
                </form>
            </div>
        </div>
    `;

    container.querySelector('#copyBookingLinkBtn').addEventListener('click', () => {
        const linkInput = container.querySelector('#publicBookingLink');
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(linkInput.value).then(() => showNotification('Sucesso', 'Link copiado!', 'success'));
        } else {
            linkInput.select(); document.execCommand('copy'); linkInput.blur(); 
            showNotification('Sucesso', 'Link copiado!', 'success');
        }
    });

    container.querySelector('#publicBookingToggle').addEventListener('change', async (e) => {
        const isEnabled = e.target.checked;
        const statusTextEl = container.querySelector('#publicBookingStatusText');
        statusTextEl.textContent = isEnabled ? "Agendamento Online ATIVO" : "Agendamento Online INATIVO";
        statusTextEl.className = isEnabled ? "text-sm font-semibold text-green-600" : "text-sm font-semibold text-red-600";
        try {
            e.target.disabled = true; 
            await establishmentApi.updatePublicBookingStatus(state.establishmentId, isEnabled);
            establishmentData.publicBookingEnabled = isEnabled; 
            showNotification('Sucesso', `Agendamento online ${isEnabled ? 'ativado' : 'desativado'}!`, 'success');
        } catch (error) {
            showNotification('Erro', `Não foi possível alterar o status: ${error.message}`, 'error');
            e.target.checked = !isEnabled;
        } finally { e.target.disabled = false; }
    });

    renderSlotIntervalSelector(data.slotInterval || 30, container); 
    
    container.querySelector('#booking-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = { slotInterval: parseInt(container.querySelector('#establishmentSlotInterval').value, 10) };
        handleSave(formData, e);
    });
}

function renderWorkingHoursSection(data, container) {
    container.innerHTML = `
         <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
             <div class="flex justify-between items-center mb-6">
                 <h3 class="text-xl font-bold text-gray-800">Horário de Funcionamento</h3>
                 <button type="submit" form="working-hours-form" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Salvar Horários</button>
             </div>
             
             <form id="working-hours-form">
                 <div class="mb-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <label for="establishmentTimezone" class="block text-sm font-bold text-gray-700 mb-2">Fuso Horário da Região</label>
                    <select id="establishmentTimezone" class="block w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="" disabled>Selecione a região...</option>
                        <optgroup label="Brasil">
                            <option value="America/Sao_Paulo">Horário de Brasília (SP, RJ, MG, Sul, NE, GO, DF)</option>
                            <option value="America/Manaus">Horário do Amazonas (Manaus)</option>
                            <option value="America/Cuiaba">Horário do Mato Grosso / MS</option>
                            <option value="America/Rio_Branco">Horário do Acre</option>
                            <option value="America/Noronha">Fernando de Noronha</option>
                        </optgroup>
                        <optgroup label="Internacional">
                            <option value="Europe/Lisbon">Portugal (Lisboa)</option>
                            <option value="Europe/London">Reino Unido (Londres)</option>
                            <option value="America/New_York">Estados Unidos (Nova Iorque)</option>
                            <option value="UTC">UTC (Universal)</option>
                        </optgroup>
                    </select>
                 </div>

                 <div id="establishmentWorkingHoursContainer" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"></div>
             </form>
         </div>
    `;
    
    const timezoneSelect = container.querySelector('#establishmentTimezone');
    if (data.timezone) {
        timezoneSelect.value = data.timezone;
    } else {
        try {
            const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const optionExists = Array.from(timezoneSelect.options).some(opt => opt.value === userTimezone);
            timezoneSelect.value = optionExists ? userTimezone : "America/Sao_Paulo";
        } catch (e) { timezoneSelect.value = "America/Sao_Paulo"; }
    }

    const workingHoursContainer = container.querySelector('#establishmentWorkingHoursContainer');
    const scheduleData = data.workingHours || {};
    Object.keys(daysOfWeek).forEach(dayKey => {
        const dayData = scheduleData[dayKey] || {};
        const dayName = daysOfWeek[dayKey];
        const isChecked = dayData.active !== false;
        const dayElement = document.createElement('div');
        dayElement.className = `day-schedule-card p-4 rounded-lg ${isChecked ? 'bg-gray-50' : 'bg-gray-100 disabled'}`;
        dayElement.innerHTML = `
            <div class="flex justify-between items-center mb-3">
                <span class="font-bold text-gray-800">${dayName}</span>
                <label class="flex items-center cursor-pointer">
                    <div class="relative">
                        <input type="checkbox" id="est-${dayKey}-active" class="sr-only" ${isChecked ? 'checked' : ''}>
                        <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                    </div>
                </label>
            </div>
            <div class="time-inputs space-y-2">
                <div class="flex items-center gap-2"><label class="w-16">Início:</label><input type="time" id="est-${dayKey}-start" value="${dayData.start || '09:00'}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
                <div class="flex items-center gap-2"><label class="w-16">Fim:</label><input type="time" id="est-${dayKey}-end" value="${dayData.end || '18:00'}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
                <div class="flex items-center gap-2"><label class="w-16">Intervalo:</label><input type="time" id="est-${dayKey}-breakStart" value="${dayData.breakStart || '12:00'}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
                <div class="flex items-center gap-2"><label class="w-16">Fim Int.:</label><input type="time" id="est-${dayKey}-breakEnd" value="${dayData.breakEnd || '13:00'}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
            </div>`;
        workingHoursContainer.appendChild(dayElement);
    });
    
    workingHoursContainer.addEventListener('change', e => {
        const toggle = e.target.closest('.day-schedule-card input[type="checkbox"]');
        if (toggle) {
            const card = toggle.closest('.day-schedule-card');
            card.classList.toggle('disabled', !toggle.checked);
        }
    });
    
    container.querySelector('#working-hours-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const workingHours = {};
        Object.keys(daysOfWeek).forEach(dayKey => {
            workingHours[dayKey] = {
                active: container.querySelector(`#est-${dayKey}-active`).checked,
                start: container.querySelector(`#est-${dayKey}-start`).value,
                end: container.querySelector(`#est-${dayKey}-end`).value,
                breakStart: container.querySelector(`#est-${dayKey}-breakStart`).value,
                breakEnd: container.querySelector(`#est-${dayKey}-breakEnd`).value,
            };
        });
        const timezone = container.querySelector('#establishmentTimezone').value;
        handleSave({ workingHours, timezone }, e);
    });
}

async function renderLoyaltySection(data, container) {
    const loyaltyProgram = data.loyaltyProgram || {};
    const currentPointsPerVisit = loyaltyProgram.pointsPerVisit || 1;

    let services = [], products = [], packages = [];
    try {
        [services, products, packages] = await Promise.all([
             servicesApi.getServices(state.establishmentId),
             productsApi.getProducts(state.establishmentId),
             packagesApi.getPackages(state.establishmentId)
        ]);
    } catch (error) {
        console.error("Erro ao carregar dados para fidelidade:", error);
    }

    container.innerHTML = `
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
             <div class="flex justify-between items-center mb-6">
                 <h3 class="text-xl font-bold text-gray-800">Plano de Fidelidade</h3>
                 <button type="submit" form="loyalty-form" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Salvar</button>
             </div>
             <form id="loyalty-form" class="space-y-6">
                 
                 <div class="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                     <label for="loyaltyEnabled" class="flex items-center cursor-pointer w-full">
                         <div class="relative"><input type="checkbox" id="loyaltyEnabled" class="sr-only"><div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div></div>
                         <span class="ml-3 font-medium text-gray-700">Habilitar Programa de Fidelidade</span>
                     </label>
                 </div>

                 <div id="loyalty-config-visit" class="p-4 bg-purple-50 rounded-lg border border-purple-100">
                     <label for="loyaltyPointsPerVisit" class="block text-sm font-medium text-purple-800">Regra de Pontuação</label>
                     <p class="text-xs text-purple-600 mb-2">Quantos pontos o cliente ganha a cada venda realizada?</p>
                     <div class="flex items-center gap-2">
                         <span class="text-gray-600 font-medium">Ganhar</span>
                         <input type="number" id="loyaltyPointsPerVisit" value="${currentPointsPerVisit}" min="1" step="1" class="w-20 p-2 border border-purple-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-center font-bold">
                         <span class="text-gray-600 font-medium">pontos por visita/venda</span>
                     </div>
                 </div>

                 <hr class="border-gray-200">

                 <div>
                     <label class="block text-sm font-bold text-gray-700 mb-2">Prémios e Recompensas</label>
                     <p class="text-xs text-gray-500 mb-3">Defina os prêmios que o cliente pode resgatar com os pontos acumulados.</p>
                     
                     <div class="hidden md:grid grid-cols-[0.8fr_1fr_1.5fr_1fr_auto] items-center gap-2 mb-1 text-xs font-bold text-gray-500 px-2">
                         <span>Custo (Pts)</span>
                         <span>Tipo do Prêmio</span>
                         <span>Item / Descrição</span>
                         <span>Valor Desconto (R$)</span>
                         <span></span>
                     </div>
                     
                     <div id="loyaltyTiersContainer" class="space-y-4 md:space-y-2"></div>
                     
                     <button type="button" id="add-loyalty-tier" class="mt-3 flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-800 py-2 px-3 rounded-md hover:bg-indigo-50 transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                        Adicionar Prémio
                     </button>
                 </div>
             </form>
        </div>
    `;

    container.querySelector('#loyaltyEnabled').checked = loyaltyProgram.enabled || false;

    const tiersContainer = container.querySelector('#loyaltyTiersContainer');
    
    const createTierRow = (tier = {}) => {
        const row = document.createElement('div');
        row.className = 'loyalty-tier-row group bg-white md:bg-transparent p-3 md:p-0 border md:border-0 rounded-lg shadow-sm md:shadow-none relative md:grid md:grid-cols-[0.8fr_1fr_1.5fr_1fr_auto] md:gap-2 md:items-start'; 

        const currentType = tier.type || 'money';
        const currentItemId = tier.itemId || '';
        const currentRewardName = tier.reward || '';
        const currentDiscount = tier.discount || '';
        const currentPoints = tier.points || tier.costPoints || '';

        row.innerHTML = `
            <div class="mb-2 md:mb-0">
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Custo (Pontos)</label>
                <div class="relative">
                    <input type="number" placeholder="Ex: 100" data-field="points" value="${currentPoints}" class="w-full p-2 pl-2 border rounded-md font-semibold text-gray-800">
                    <span class="md:hidden absolute right-3 top-2 text-xs text-gray-400">pts</span>
                </div>
            </div>

            <div class="mb-2 md:mb-0">
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Tipo</label>
                <select data-field="type" class="type-select w-full p-2 border rounded-md bg-white text-sm">
                    <option value="money" ${currentType === 'money' ? 'selected' : ''}>Desconto Livre (R$)</option>
                    <option value="service" ${currentType === 'service' ? 'selected' : ''}>Serviço Específico</option>
                    <option value="product" ${currentType === 'product' ? 'selected' : ''}>Produto Específico</option>
                    <option value="package" ${currentType === 'package' ? 'selected' : ''}>Pacote</option>
                </select>
            </div>

            <div class="mb-2 md:mb-0 relative">
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Item / Descrição</label>
                
                <input type="text" placeholder="Ex: Vale Compras R$ 20" data-field="rewardName" value="${escapeHTML(currentRewardName)}" class="desc-input w-full p-2 border rounded-md ${currentType !== 'money' ? 'hidden' : ''}">
                
                <select data-field="itemId" class="item-select w-full p-2 border rounded-md bg-white text-sm ${currentType === 'money' ? 'hidden' : ''}">
                    <option value="">Selecione o item...</option>
                </select>
            </div>

            <div class="mb-2 md:mb-0">
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Valor Desconto (R$)</label>
                <div class="flex items-center relative">
                    <span class="absolute left-3 text-gray-500">R$</span>
                    <input type="number" placeholder="0.00" data-field="discount" value="${currentDiscount}" step="0.01" class="discount-input w-full p-2 pl-8 border rounded-md">
                </div>
                <p class="text-[10px] text-gray-500 mt-1 hidden md:block">Deixe 0 para 100% (se item)</p>
            </div>

            <button type="button" class="remove-loyalty-tier absolute top-2 right-2 md:static text-gray-400 hover:text-red-600 p-2 rounded-md hover:bg-red-50 transition-colors" title="Remover">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
        `;

        const typeSelect = row.querySelector('.type-select');
        const itemSelect = row.querySelector('.item-select');
        const descInput = row.querySelector('.desc-input');
        const discountInput = row.querySelector('.discount-input');

        const updateItemOptions = (type) => {
            itemSelect.innerHTML = '<option value="">Selecione...</option>';
            let list = [];
            if (type === 'service') list = services;
            else if (type === 'product') list = products;
            else if (type === 'package') list = packages;

            list.forEach(item => {
                const isSelected = item.id === currentItemId;
                const name = item.name || item.title || 'Sem nome';
                const price = item.price || item.salePrice || 0;
                itemSelect.innerHTML += `<option value="${item.id}" data-price="${price}" ${isSelected ? 'selected' : ''}>${escapeHTML(name)}</option>`;
            });
        };

        if (currentType !== 'money') updateItemOptions(currentType);

        typeSelect.addEventListener('change', (e) => {
            const type = e.target.value;
            if (type === 'money') {
                itemSelect.classList.add('hidden');
                descInput.classList.remove('hidden');
                descInput.value = ''; 
                discountInput.value = '';
            } else {
                itemSelect.classList.remove('hidden');
                descInput.classList.add('hidden');
                updateItemOptions(type);
                discountInput.value = ''; 
            }
        });

        itemSelect.addEventListener('change', (e) => {
            const selectedOption = e.target.selectedOptions[0];
            if (selectedOption && selectedOption.value) {
                descInput.value = selectedOption.text;
                const price = selectedOption.dataset.price;
                if (price) discountInput.value = parseFloat(price).toFixed(2);
            }
        });

        return row;
    };
    
    (loyaltyProgram.tiers || []).forEach(tier => {
        tiersContainer.appendChild(createTierRow(tier));
    });
    
    container.querySelector('#add-loyalty-tier').addEventListener('click', () => {
        tiersContainer.appendChild(createTierRow());
    });
    
    tiersContainer.addEventListener('click', e => {
        const removeButton = e.target.closest('.remove-loyalty-tier');
        if (removeButton) removeButton.closest('.loyalty-tier-row').remove();
    });
    
    container.querySelector('#loyalty-form').addEventListener('submit', e => {
        e.preventDefault();
        
        const loyaltyTiers = Array.from(container.querySelectorAll('#loyaltyTiersContainer .loyalty-tier-row')).map(row => {
            const type = row.querySelector('.type-select').value;
            const itemId = type === 'money' ? null : row.querySelector('.item-select').value;
            
            let rewardName = '';
            if (type === 'money') {
                rewardName = row.querySelector('.desc-input').value;
            } else {
                 const sel = row.querySelector('.item-select');
                 rewardName = sel.options[sel.selectedIndex]?.text || '';
            }

            return {
                points: parseInt(row.querySelector('input[data-field="points"]').value, 10) || 0,
                costPoints: parseInt(row.querySelector('input[data-field="points"]').value, 10) || 0,
                type: type,
                itemId: itemId,
                reward: rewardName,
                name: rewardName,
                discount: parseFloat(row.querySelector('input[data-field="discount"]').value) || 0
            };
        });

        const formData = {
            loyaltyProgram: {
                enabled: container.querySelector('#loyaltyEnabled').checked,
                type: 'visit', 
                pointsPerVisit: parseInt(container.querySelector('#loyaltyPointsPerVisit').value, 10) || 1,
                pointsPerCurrency: 0, 
                tiers: loyaltyTiers.filter(t => t.points > 0 && t.reward)
            }
        };
        handleSave(formData, e);
    });
}

async function renderFinancialIntegrationSection(data, container) {
    container.innerHTML = `
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-gray-800">Integração Financeira</h3>
                <button type="submit" form="financial-form" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Salvar</button>
            </div>
            <form id="financial-form" class="space-y-8">
                
                <div class="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h4 class="text-lg font-semibold text-green-800 mb-2 flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path></svg>
                        Vendas (Contas a Receber)
                    </h4>
                    <p class="text-sm text-green-700 mb-4">Defina a classificação automática para vendas realizadas no PDV/Agenda.</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="financialNatureId" class="block text-sm font-bold text-gray-700">Natureza Padrão</label>
                            <select id="financialNatureId" class="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white">
                                <option value="">A carregar...</option>
                            </select>
                        </div>
                        <div>
                            <label for="financialCostCenterId" class="block text-sm font-bold text-gray-700">Centro de Custo</label>
                            <select id="financialCostCenterId" class="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white">
                                <option value="">A carregar...</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h4 class="text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        Compras de Fornecedores (Contas a Pagar)
                    </h4>
                    <p class="text-sm text-blue-700 mb-4">Defina a classificação automática para pedidos de compra confirmados.</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="purchaseNatureId" class="block text-sm font-bold text-gray-700">Natureza Padrão</label>
                            <select id="purchaseNatureId" class="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white">
                                <option value="">A carregar...</option>
                            </select>
                        </div>
                        <div>
                            <label for="purchaseCostCenterId" class="block text-sm font-bold text-gray-700">Centro de Custo</label>
                            <select id="purchaseCostCenterId" class="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white">
                                <option value="">A carregar...</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="bg-red-50 p-4 rounded-lg border border-red-100">
                    <h4 class="text-lg font-semibold text-red-800 mb-2 flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path></svg>
                        Comissões (Contas a Pagar)
                    </h4>
                    <p class="text-sm text-red-700 mb-4">Defina a classificação automática para comissões geradas.</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="commissionNatureId" class="block text-sm font-bold text-gray-700">Natureza Padrão</label>
                            <select id="commissionNatureId" class="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white">
                                <option value="">A carregar...</option>
                            </select>
                        </div>
                        <div>
                            <label for="commissionCostCenterId" class="block text-sm font-bold text-gray-700">Centro de Custo</label>
                            <select id="commissionCostCenterId" class="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white">
                                <option value="">A carregar...</option>
                            </select>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    `;

    try {
        const [natures, costCenters] = await Promise.all([
            financialApi.getNatures(state.establishmentId),
            financialApi.getCostCenters(state.establishmentId)
        ]);
        
        const financialIntegration = data.financialIntegration || {};
        const commissionConfig = data.commissionConfig || {};
        const purchaseConfig = data.purchaseConfig || {}; 

        container.querySelector('#financialNatureId').innerHTML = buildHierarchyOptions(natures, financialIntegration.defaultNaturezaId);
        container.querySelector('#financialCostCenterId').innerHTML = buildHierarchyOptions(costCenters, financialIntegration.defaultCentroDeCustoId);

        container.querySelector('#purchaseNatureId').innerHTML = buildHierarchyOptions(natures, purchaseConfig.defaultNatureId);
        container.querySelector('#purchaseCostCenterId').innerHTML = buildHierarchyOptions(costCenters, purchaseConfig.defaultCostCenterId);

        container.querySelector('#commissionNatureId').innerHTML = buildHierarchyOptions(natures, commissionConfig.defaultNatureId);
        container.querySelector('#commissionCostCenterId').innerHTML = buildHierarchyOptions(costCenters, commissionConfig.defaultCostCenterId);

    } catch (error) {
        showNotification('Erro', 'Não foi possível carregar os dados para a integração financeira.', 'error');
    }

    container.querySelector('#financial-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            financialIntegration: {
                defaultNaturezaId: container.querySelector('#financialNatureId').value || null,
                defaultCentroDeCustoId: container.querySelector('#financialCostCenterId').value || null,
            },
            purchaseConfig: { 
                defaultNatureId: container.querySelector('#purchaseNatureId').value || null,
                defaultCostCenterId: container.querySelector('#purchaseCostCenterId').value || null,
            },
            commissionConfig: {
                defaultNatureId: container.querySelector('#commissionNatureId').value || null,
                defaultCostCenterId: container.querySelector('#commissionCostCenterId').value || null,
            }
        };
        handleSave(formData, e);
    });
}

function renderSupportSection(data, container) {
    const supportNumber = "5516997859430";
    const message = encodeURIComponent("Olá, preciso de ajuda com o sistema Kairos.");
    const whatsappLink = `https://wa.me/${supportNumber}?text=${message}`;

    container.innerHTML = `
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md text-center md:text-left">
            <div class="flex flex-col md:flex-row items-center justify-between mb-6 border-b pb-4">
                <div>
                    <h3 class="text-xl font-bold text-gray-800">Suporte Técnico</h3>
                    <p class="text-sm text-gray-600 mt-1">Estamos aqui para ajudar você a tirar o máximo proveito do sistema.</p>
                </div>
            </div>

            <div class="bg-green-50 border border-green-100 rounded-lg p-6 flex flex-col items-center justify-center space-y-4">
                <div class="bg-white p-3 rounded-full shadow-sm">
                    <svg class="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                </div>
                <h4 class="text-lg font-semibold text-gray-800">Falar com Suporte via WhatsApp</h4>
                <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" 
                   class="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg">
                    <span>Iniciar Atendimento</span>
                </a>
            </div>
        </div>
    `;
}

function renderCancellationSection(data, container) {
    const supportNumber = "5516997859430";
    const cancellationMessage = encodeURIComponent("Olá, gostaria de solicitar o cancelamento da minha assinatura.");
    const whatsappLink = `https://wa.me/${supportNumber}?text=${cancellationMessage}`;
    const emailContato = "sistemakairosagenda@gmail.com";

    container.innerHTML = `
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div class="flex flex-col md:flex-row items-center justify-between mb-6 border-b pb-4">
                <div>
                    <h3 class="text-xl font-bold text-red-600">Cancelamento de Assinatura</h3>
                    <p class="text-sm text-gray-600 mt-1">Lamentamos ver você partir. Veja abaixo como proceder.</p>
                </div>
            </div>

            <div class="space-y-6">
                <p class="text-gray-700">Para solicitar o cancelamento da sua assinatura, por favor, entre em contato conosco através de um dos canais abaixo. Nossa equipe financeira irá processar sua solicitação o mais breve possível.</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="border rounded-lg p-6 bg-gray-50 flex flex-col items-center text-center">
                        <h4 class="font-bold text-gray-800 mb-2">Via E-mail</h4>
                        <a href="mailto:${emailContato}" class="text-indigo-600 font-semibold hover:underline">${emailContato}</a>
                    </div>
                    <div class="border rounded-lg p-6 bg-green-50 border-green-100 flex flex-col items-center text-center">
                        <h4 class="font-bold text-gray-800 mb-2">Via WhatsApp</h4>
                        <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition-colors text-sm">Solicitar Cancelamento</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderPlaceholderSection(title, container) {
    container.innerHTML = `<div class="bg-white p-4 md:p-6 rounded-lg shadow-md"><h3 class="text-xl font-bold text-gray-800">${title}</h3><p class="mt-4 text-gray-500">Esta secção ainda não foi implementada.</p></div>`;
}

function renderColorPalette(currentThemeKey = 'indigo', container) {
    const paletteContainer = container.querySelector('#color-palette-container');
    const themeInput = container.querySelector('#establishmentThemeColor');
    if (!paletteContainer || !themeInput) return;
    
    paletteContainer.innerHTML = '';
    Object.entries(colorThemes).forEach(([key, theme]) => {
        const isSelected = key === currentThemeKey;
        const swatch = document.createElement('div');
        swatch.className = `w-24 text-center cursor-pointer mb-4`;
        swatch.innerHTML = `
            <div class="w-16 h-16 mx-auto rounded-full border-4 ${isSelected ? 'border-gray-800 scale-110 shadow-lg' : 'border-transparent'} p-1 transition-all">
                <div class="w-full h-full rounded-full" style="background-color: ${theme.main};"></div>
            </div>
            <p class="text-xs mt-2 font-medium ${isSelected ? 'text-gray-900 font-bold' : 'text-gray-500'}">${theme.name}</p>
        `;
        swatch.addEventListener('click', () => {
            themeInput.value = key;
            renderColorPalette(key, container); 
        });
        paletteContainer.appendChild(swatch);
    });
    themeInput.value = currentThemeKey;
}

function renderSlotIntervalSelector(currentValue, container) {
    const slotContainer = container.querySelector('#slotIntervalContainer');
    const intervalInput = container.querySelector('#establishmentSlotInterval');
    if (!slotContainer || !intervalInput) return;

    const intervals = [
        { label: '10 min', value: 10 }, { label: '15 min', value: 15 }, { label: '20 min', value: 20 }, 
        { label: '30 min', value: 30 }, { label: '45 min', value: 45 }, { label: '1 hora', value: 60 }
    ];

    slotContainer.innerHTML = intervals.map(interval => {
        const isSelected = interval.value === currentValue;
        return `<button type="button" data-value="${interval.value}" 
                       class="interval-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors 
                           ${isSelected ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}">
                       ${interval.label}
                   </button>`;
    }).join('');
    intervalInput.value = currentValue;

    slotContainer.querySelectorAll('.interval-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            intervalInput.value = btn.dataset.value;
            slotContainer.querySelectorAll('.interval-btn').forEach(b => {
                b.classList.remove('bg-indigo-600', 'text-white');
                b.classList.add('bg-gray-200', 'text-gray-700');
            });
            btn.classList.add('bg-indigo-600', 'text-white');
            btn.classList.remove('bg-gray-200', 'text-gray-700');
        });
    });
}

// --- 2. FUNÇÃO PRINCIPAL E NAVEGAÇÃO ---

async function showSettingsDetailView(sectionId) {
    const dynamicMenuItems = getMenuItems();
    const menuItem = dynamicMenuItems.find(item => item.id === sectionId);
    
    if (!menuItem) {
        console.error("Secção de definições não encontrada:", sectionId);
        return;
    }

    contentDiv.innerHTML = `
        <div class="bg-white p-4 shadow-sm sticky top-0 z-10 md:relative flex justify-between items-center">
            <button data-action="back-to-list" class="flex items-center gap-2 font-bold text-gray-600 hover:text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg text-sm transition">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
                Voltar
            </button>
            <span class="text-sm font-bold text-gray-800">${menuItem.label}</span>
        </div>
        
        <div id="settings-content-detail" class="p-2 md:p-4 pb-20">
            <div class="flex justify-center items-center py-10"><div class="loader"></div></div>
        </div>
    `;

    contentDiv.querySelector('button[data-action="back-to-list"]').addEventListener('click', (e) => {
        e.preventDefault();
        loadEstablishmentPage(); 
    });

    const detailContainer = document.getElementById('settings-content-detail');

    switch (sectionId) {
        case 'manage-network': await renderManageNetworkSection(detailContainer); break;
        case 'personal-data': renderPersonalDataSection(establishmentData, detailContainer); break;
        case 'change-password': renderChangePasswordSection(establishmentData, detailContainer); break;
        case 'change-email': renderChangeEmailSection(establishmentData, detailContainer); break; 
        case 'branding': renderBrandingSection(establishmentData, detailContainer); break;
        case 'booking': renderBookingSection(establishmentData, detailContainer); break;
        case 'working-hours': renderWorkingHoursSection(establishmentData, detailContainer); break;
        case 'loyalty': await renderLoyaltySection(establishmentData, detailContainer); break; 
        case 'financial': await renderFinancialIntegrationSection(establishmentData, detailContainer); break;
        case 'support': renderSupportSection(establishmentData, detailContainer); break;
        case 'cancellation': renderCancellationSection(establishmentData, detailContainer); break;
        default: renderPlaceholderSection(menuItem.label, detailContainer);
    }
}

export async function loadEstablishmentPage() {
    contentDiv.innerHTML = `
        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                Definições do Sistema
            </h2>
        </div>
        <div class="flex justify-center items-center h-64"><div class="loader"></div></div>
    `;

    try {
        // Lógica Inteligente: Carrega os dados da Matriz ou da Filial dependendo de onde ele estiver
        let targetId = state.currentViewContext?.id || state.establishmentId;
        
        // Se estiver na visão de Holding, não tem um "estabelecimento" físico para editar os horários, 
        // então forçamos ele a ver o menu de Gestão da Rede e dados de uma unidade base dele.
        if (state.currentViewContext?.type === 'GROUP') {
             targetId = state.accessibleEstablishments[0]?.id || state.establishmentId;
        }

        establishmentData = await establishmentApi.getEstablishmentDetails(targetId);
    } catch (error) {
        showNotification('Erro Fatal', 'Não foi possível carregar as definições.', 'error');
        contentDiv.innerHTML = '<p class="text-red-500 text-center py-10">Erro ao carregar dados.</p>';
        return;
    }

    const user = auth.currentUser;
    if (user && user.displayName) state.userName = user.displayName;

    const displayName = escapeHTML(state.userName || auth.currentUser.email);
    const displayInitials = displayName ? displayName.charAt(0).toUpperCase() : 'U';
    let userAvatarUrl = `https://placehold.co/96x96/E2E8F0/4A5568?text=${displayInitials}`; 
    if (user && user.photoURL) userAvatarUrl = user.photoURL;
    
    // Obtém os menus certos para a role da pessoa logada
    const currentMenuItems = getMenuItems();

    contentDiv.innerHTML = `
        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                Definições
            </h2>
        </div>
        
        <div data-action="go-to-my-profile" class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4 cursor-pointer hover:bg-gray-50 transition-all">
            <div class="text-center relative">
                 <div class="relative w-20 h-20 mx-auto">
                    <img id="user-avatar" src="${userAvatarUrl}" class="w-20 h-20 rounded-full object-cover border-4 border-gray-100">
                 </div>
                 <h3 class="font-bold mt-2 text-base text-gray-800 truncate">${displayName}</h3>
                 <p class="text-xs text-indigo-600 font-bold mt-1">MEU PERFIL (VER BLOQUEIOS)</p>
            </div>
        </div>

        <div class="bg-white p-2 rounded-xl shadow-sm border border-gray-100 mb-20">
            <nav id="settings-menu-list" class="space-y-1">
                ${currentMenuItems.map(item => `
                    <button data-section="${item.id}" class="w-full flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold text-sm transition-colors ${item.id === 'manage-network' ? 'bg-indigo-50 border border-indigo-100 text-indigo-800 hover:bg-indigo-100 mb-3' : ''}">
                        <svg class="w-5 h-5 ${item.id === 'manage-network' ? 'text-indigo-600' : 'text-gray-400'}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${item.icon}"></path></svg>
                        <span class="flex-1 text-left">${item.label}</span>
                        <svg class="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                `).join('')}
            </nav>
        </div>
    `;

    contentDiv.querySelector('#settings-menu-list').addEventListener('click', (e) => {
        const button = e.target.closest('button[data-section]');
        if (button) {
            e.preventDefault();
            showSettingsDetailView(button.dataset.section);
        }
    });

    const profileCard = contentDiv.querySelector('[data-action="go-to-my-profile"]');
    if (profileCard) {
        profileCard.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('my-profile-section');
        });
    }
}