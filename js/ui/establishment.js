// js/ui/establishment.js

import * as establishmentApi from '../api/establishments.js';
import * as financialApi from '../api/financial.js';
import { state } from '../state.js';
import { showNotification } from '../components/modal.js';
import { auth } from '../firebase-config.js';
import { updatePassword, updateProfile, verifyBeforeUpdateEmail, reauthenticateWithCredential, EmailAuthProvider } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js"; 
import { navigateTo } from '../main.js';

const contentDiv = document.getElementById('content');
const daysOfWeek = { monday: 'Segunda', tuesday: 'Terça', wednesday: 'Quarta', thursday: 'Quinta', friday: 'Sexta', saturday: 'Sábado', sunday: 'Domingo' };

// Temas do Painel (Sistema)
const colorThemes = {
    indigo: { name: 'Padrão (Índigo)', main: '#4f46e5', light: '#e0e7ff', text: '#ffffff' },
    rose: { name: 'Rosa', main: '#e11d48', light: '#ffe4e6', text: '#ffffff' },
    green: { name: 'Verde', main: '#16a34a', light: '#d1fae5', text: '#ffffff' },
    sky: { name: 'Azul Céu', main: '#0284c7', light: '#e0f2fe', text: '#ffffff' },
    amber: { name: 'Âmbar', main: '#d97706', light: '#fef3c7', text: '#1f2937' },
};

const menuItems = [
    { id: 'personal-data', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', label: 'Dados Gerais' },
    { id: 'branding', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z', label: 'Identidade e Cores'},
    { id: 'booking', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'Agendamento Online' },
    { id: 'working-hours', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Horário de Funcionamento' },
    { id: 'loyalty', icon: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h2V5z', label: 'Plano de Fidelidade' },
    { id: 'financial', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z', label: 'Integração Financeira' },
    { id: 'change-password', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', label: 'Alterar senha' },
    { id: 'change-email', icon: 'M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207', label: 'Alterar E-mail de Acesso' },
    { id: 'delete-account', icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m-7-10V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v3M4 7h16', label: 'Excluir conta' },
];

let establishmentData = null; 

// --- 1. FUNÇÕES AUXILIARES ---

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
        optionsHTML += `<option value="${item.id}" ${isSelected}>${prefix}${item.name}</option>`;
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
                   updatePromises.push(updateProfile(user, { displayName: ownerName })
                        .then(() => {
                            state.userName = ownerName;
                        })
                );
             }
        }
        
        const updatedData = { ...existingData, ...firestoreData };
        updatePromises.push(establishmentApi.updateEstablishmentDetails(state.establishmentId, updatedData));

        await Promise.all(updatePromises);
        
        establishmentData = updatedData;

        showNotification('Sucesso', 'Definições salvas com sucesso!', 'success');
        
        const panelEstablishmentName = document.getElementById('panelEstablishmentName');
        if (firestoreData.name && panelEstablishmentName) {
            panelEstablishmentName.textContent = firestoreData.name;
            state.establishmentName = firestoreData.name;
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

// --- 2. FUNÇÕES DE RENDERIZAÇÃO DAS SECÇÕES ---

function renderPersonalDataSection(data, container) {
    container.innerHTML = `
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-gray-800">Dados Gerais e de Contato</h3>
                <button type="submit" form="personal-data-form" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Salvar</button>
            </div>
            <form id="personal-data-form" class="space-y-4">
                <div>
                    <label for="ownerName" class="block text-sm font-medium text-gray-700">Seu nome (Dono)</label>
                    <input type="text" id="ownerName" class="mt-1 w-full p-2 border border-gray-300 rounded-md" value="${state.userName || ''}">
                </div>
                <div>
                    <label for="establishmentName" class="block text-sm font-medium text-gray-700">Nome do Salão ou Barbearia</label>
                    <input type="text" id="establishmentName" class="mt-1 w-full p-2 border border-gray-300 rounded-md" value="${data.name || ''}">
                </div>
                <div>
                    <label for="establishmentPhone" class="block text-sm font-medium text-gray-700">Telefone Principal</label>
                    <input type="tel" id="establishmentPhone" class="mt-1 w-full p-2 border border-gray-300 rounded-md" value="${data.phone || ''}">
                </div>
                <div>
                    <label for="establishmentCnpjCpf" class="block text-sm font-medium text-gray-700">CNPJ / CPF</label>
                    <input type="text" id="establishmentCnpjCpf" value="${data.document || ''}" class="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm">
                </div>
                <div>
                    <label for="establishmentEmail" class="block text-sm font-medium text-gray-700">E-mail de Contato</label>
                    <input type="email" id="establishmentEmail" value="${data.email || ''}" class="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm">
                </div>
                <div>
                    <label for="establishmentAddress" class="block text-sm font-medium text-gray-700">Endereço Completo</label>
                    <input type="text" id="establishmentAddress" value="${data.address || ''}" class="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm">
                </div>
                <div>
                    <label for="establishmentWebsite" class="block text-sm font-medium text-gray-700">Website</label>
                    <input type="url" id="establishmentWebsite" value="${data.website || ''}" class="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm">
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
                        <p class="text-xs text-gray-500 mt-2">Recomendado: PNG com fundo transparente.</p>
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
                                <p class="text-xs text-gray-500 mt-2">Aparecerá no fundo do agendamento online.</p>
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
                        <input type="text" id="establishmentWelcomeMessage" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Ex: Simples, rápido e à sua medida." value="${data.welcomeMessage || ''}">
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

    // Listeners de Imagens
    container.querySelector('#establishmentLogoButton').onclick = () => container.querySelector('#establishmentLogoInput').click();
    container.querySelector('#establishmentLogoInput').onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                container.querySelector('#establishmentLogoPreview').src = ev.target.result;
                container.querySelector('#establishmentLogoBase64').value = ev.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    container.querySelector('#establishmentBgButton').onclick = () => container.querySelector('#establishmentBgInput').click();
    container.querySelector('#establishmentBgInput').onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                container.querySelector('#establishmentBgPreview').src = ev.target.result;
                container.querySelector('#establishmentBgPreview').classList.remove('hidden');
                container.querySelector('#establishmentBgPlaceholder').classList.add('hidden');
                container.querySelector('#establishmentBackgroundImageBase64').value = ev.target.result;
            };
            reader.readAsDataURL(file);
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
    
    // --- LÓGICA DE URL DE PRODUÇÃO ---
    // Define a URL de produção oficial (Google Cloud)
    const productionUrl = 'https://kairos-service-603994960586.southamerica-east1.run.app'; 
    
    let baseUrl = window.location.origin;
    
    // Se estiver rodando localmente (App Mobile via Capacitor, ou ambiente de dev), usa a URL de produção.
    // Se estiver rodando na Web (produção), mantém a URL atual (o que permite que seu domínio personalizado funcione automaticamente no futuro).
    if (baseUrl.includes('localhost') || baseUrl.includes('capacitor://') || baseUrl.includes('127.0.0.1') || baseUrl.includes('192.168')) {
        baseUrl = productionUrl;
    }

    const bookingLink = `${baseUrl}/agendar?id=${linkId}`;
    
    const isChecked = data.publicBookingEnabled || false;
    const toggleText = isChecked ? "Agendamento Online ATIVO" : "Agendamento Online INATIVO";
    const statusColor = isChecked ? "text-green-600" : "text-red-600";

    container.innerHTML = `
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md space-y-8">
            <div>
                <div class="flex justify-between items-center mb-6 border-b pb-4">
                    <h3 class="text-xl font-bold text-gray-800">Link Público de Agendamento</h3>
                </div>
                <p class="text-sm text-gray-600 mb-4">
                    Este é o link exclusivo que você pode partilhar com os seus clientes para que eles façam agendamentos online.
                </p>
                <div class="flex flex-col sm:flex-row gap-2">
                    <input 
                        type="text" 
                        id="publicBookingLink" 
                        value="${bookingLink}" 
                        readonly 
                        class="flex-1 p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                    >
                    <button 
                        type="button" 
                        id="copyBookingLinkBtn"
                        class="py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                    >
                        Copiar Link
                    </button>
                </div>
            </div>

            <div>
                <h3 class="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Status do Agendamento Online</h3>
                <p class="text-sm text-gray-600 mb-4">
                    Se o agendamento online estiver inativo, os clientes que tentarem aceder ao link verão uma mensagem a informar que o estabelecimento não está a aceitar agendamentos no momento.
                </p>
                <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <label for="publicBookingToggle" class="flex items-center cursor-pointer">
                        <div class="relative">
                            <input type="checkbox" id="publicBookingToggle" class="sr-only" ${isChecked ? 'checked' : ''}>
                            <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                        </div>
                    </label>
                    <span id="publicBookingStatusText" class="text-sm font-semibold ${statusColor}">
                        ${toggleText}
                    </span>
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
                    <p class="text-sm text-gray-600 mb-4">Defina o intervalo de tempo entre os horários disponíveis na agenda online.</p>
                    <div id="slotIntervalContainer" class="flex flex-wrap gap-2"></div>
                </form>
            </div>
        </div>
    `;

    container.querySelector('#copyBookingLinkBtn').addEventListener('click', () => {
        const linkInput = container.querySelector('#publicBookingLink');
        
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(linkInput.value).then(() => {
                showNotification('Sucesso', 'Link copiado para a área de transferência!', 'success');
            }).catch(err => {
                showNotification('Erro', 'Não foi possível copiar o link.', 'error');
            });
        } else {
            try {
                linkInput.select(); 
                document.execCommand('copy'); 
                linkInput.blur(); 
                showNotification('Sucesso', 'Link copiado para a área de transferência!', 'success');
            } catch (err) {
                showNotification('Erro', 'Não foi possível copiar o link. Por favor, copie manualmente.', 'error');
            }
        }
    });

    container.querySelector('#publicBookingToggle').addEventListener('change', async (e) => {
        const isEnabled = e.target.checked;
        const statusTextEl = container.querySelector('#publicBookingStatusText');
        
        if (isEnabled) {
            statusTextEl.textContent = "Agendamento Online ATIVO";
            statusTextEl.className = "text-sm font-semibold text-green-600";
        } else {
            statusTextEl.textContent = "Agendamento Online INATIVO";
            statusTextEl.className = "text-sm font-semibold text-red-600";
        }
        
        try {
            e.target.disabled = true; 
            await establishmentApi.updatePublicBookingStatus(state.establishmentId, isEnabled);
            establishmentData.publicBookingEnabled = isEnabled; 
            showNotification('Sucesso', `Agendamento online ${isEnabled ? 'ativado' : 'desativado'}!`, 'success');
        } catch (error) {
            showNotification('Erro', `Não foi possível alterar o status: ${error.message}`, 'error');
            e.target.checked = !isEnabled;
             if (!isEnabled) {
                statusTextEl.textContent = "Agendamento Online INATIVO";
                statusTextEl.className = "text-sm font-semibold text-red-600";
            } else {
                statusTextEl.textContent = "Agendamento Online ATIVO";
                statusTextEl.className = "text-sm font-semibold text-green-600";
            }
        } finally {
            e.target.disabled = false; 
        }
    });

    renderSlotIntervalSelector(data.slotInterval || 30, container); 
    
    container.querySelector('#booking-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            slotInterval: parseInt(container.querySelector('#establishmentSlotInterval').value, 10)
        };
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
                 <div id="establishmentWorkingHoursContainer" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"></div>
             </form>
         </div>
    `;
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
        handleSave({ workingHours }, e);
    });
}

function renderLoyaltySection(data, container) {
    container.innerHTML = `
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
             <div class="flex justify-between items-center mb-6">
                 <h3 class="text-xl font-bold text-gray-800">Plano de Fidelidade</h3>
                 <button type="submit" form="loyalty-form" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Salvar</button>
             </div>
             <form id="loyalty-form" class="space-y-4">
                 <div class="flex items-center">
                     <label for="loyaltyEnabled" class="flex items-center cursor-pointer">
                         <div class="relative"><input type="checkbox" id="loyaltyEnabled" class="sr-only"><div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div></div>
                         <span class="ml-3 font-medium text-gray-700">Habilitar Programa de Fidelidade</span>
                     </label>
                 </div>
                 <div>
                     <label for="loyaltyPointsPerCurrency" class="block text-sm font-medium text-gray-700">Pontos Ganhos</label>
                     <div class="mt-1 flex items-center gap-2">
                         <span>1 Ponto a cada R$</span>
                         <input type="number" id="loyaltyPointsPerCurrency" value="10" class="w-24 p-2 border rounded-md">
                     </div>
                 </div>
                 <div>
                     <label class="block text-sm font-medium text-gray-700 mb-2">Prémios (Níveis de Pontuação)</label>
                     
                     <div class="hidden md:grid grid-cols-[1fr_2fr_1fr_auto] items-center gap-2 mb-1 text-xs font-bold text-gray-500 px-2">
                         <span>Pontos</span>
                         <span>Descrição do Prémio</span>
                         <span>Valor do Desconto (R$)</span>
                         <span></span>
                     </div>
                     
                     <div id="loyaltyTiersContainer" class="space-y-4 md:space-y-2"></div>
                     
                     <button type="button" id="add-loyalty-tier" class="mt-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800">+ Adicionar Prémio</button>
                 </div>
             </form>
        </div>
    `;
    const loyaltyProgram = data.loyaltyProgram || {};
    container.querySelector('#loyaltyEnabled').checked = loyaltyProgram.enabled || false;
    container.querySelector('#loyaltyPointsPerCurrency').value = loyaltyProgram.pointsPerCurrency || 10;
    const tiersContainer = container.querySelector('#loyaltyTiersContainer');
    
    const createTierRow = (tier = {}) => {
        const newTier = document.createElement('div');
        newTier.className = 'loyalty-tier-row'; 
        newTier.innerHTML = `
            <div>
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Pontos</label>
                <input type="number" placeholder="Pontos" data-field="points" value="${tier.points || ''}" class="w-full p-2 border rounded-md">
            </div>
            <div>
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Descrição do Prémio</label>
                <input type="text" placeholder="Descrição do Prémio" data-field="reward" value="${tier.reward || ''}" class="w-full p-2 border rounded-md">
            </div>
            <div>
                <label class="md:hidden text-xs font-bold text-gray-500 mb-1 block">Valor do Desconto (R$)</label>
                <div class="flex items-center"><span class="mr-1">R$</span><input type="number" placeholder="Valor" data-field="discount" value="${tier.discount || ''}" class="w-full p-2 border rounded-md"></div>
            </div>
            <button type="button" class="remove-loyalty-tier bg-red-100 text-red-700 p-2 rounded-md hover:bg-red-200 md:bg-transparent md:text-red-500 md:hover:bg-red-100">&times;</button>
        `;
        return newTier;
    };
    
    (loyaltyProgram.tiers || []).forEach(tier => {
        tiersContainer.appendChild(createTierRow(tier));
    });
    
    container.querySelector('#add-loyalty-tier').addEventListener('click', () => {
        tiersContainer.appendChild(createTierRow());
    });
    
    tiersContainer.addEventListener('click', e => {
        const removeButton = e.target.closest('.remove-loyalty-tier');
        if (removeButton) {
            removeButton.closest('.loyalty-tier-row').remove();
        }
    });
    
    container.querySelector('#loyalty-form').addEventListener('submit', e => {
        e.preventDefault();
        const loyaltyTiers = Array.from(container.querySelectorAll('#loyaltyTiersContainer .loyalty-tier-row')).map(row => ({
            points: parseInt(row.querySelector('input[data-field="points"]').value, 10) || 0,
            reward: row.querySelector('input[data-field="reward"]').value,
            discount: parseFloat(row.querySelector('input[data-field="discount"]').value) || 0
        }));
        const formData = {
            loyaltyProgram: {
                enabled: container.querySelector('#loyaltyEnabled').checked,
                pointsPerCurrency: parseFloat(container.querySelector('#loyaltyPointsPerCurrency').value) || 1,
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
                <h3 class="text-xl font-bold text-gray-800">Integração Financeira Padrão</h3>
                <button type="submit" form="financial-form" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600">Salvar</button>
            </div>
            <form id="financial-form" class="space-y-4">
                <p class="text-sm text-gray-600">Selecione as Naturezas e Centros de Custo padrões para serem aplicados automaticamente em todas as vendas (Contas a Receber).</p>
                <div>
                    <label for="financialNatureId" class="block text-sm font-medium text-gray-700">Natureza Padrão (Receita)</label>
                    <select id="financialNatureId" class="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white">
                        <option value="">A carregar...</option>
                    </select>
                </div>
                <div>
                    <label for="financialCostCenterId" class="block text-sm font-medium text-gray-700">Centro de Custo Padrão</label>
                    <select id="financialCostCenterId" class="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white">
                        <option value="">A carregar...</option>
                    </select>
                </div>
            </form>
        </div>
    `;

    try {
        const [natures, costCenters] = await Promise.all([
            financialApi.getNatures(),
            financialApi.getCostCenters()
        ]);
        const financialIntegration = data.financialIntegration || {};
        container.querySelector('#financialNatureId').innerHTML = buildHierarchyOptions(natures, financialIntegration.defaultNaturezaId);
        container.querySelector('#financialCostCenterId').innerHTML = buildHierarchyOptions(costCenters, financialIntegration.defaultCentroDeCustoId);
    } catch (error) {
        showNotification('Erro', 'Não foi possível carregar os dados para a integração financeira.', 'error');
    }

    container.querySelector('#financial-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            financialIntegration: {
                defaultNaturezaId: container.querySelector('#financialNatureId').value || null,
                defaultCentroDeCustoId: container.querySelector('#financialCostCenterId').value || null,
            }
        };
        handleSave(formData, e);
    });
}


function renderPlaceholderSection(title, container) {
    container.innerHTML = `
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-gray-800">${title}</h3>
            <p class="mt-4 text-gray-500">Esta secção ainda não foi implementada.</p>
        </div>
    `;
}

// Renderizador da Paleta (RESTAURADO E EXPANDIDO)
function renderColorPalette(currentThemeKey = 'indigo', container) {
    const paletteContainer = container.querySelector('#color-palette-container');
    const themeInput = container.querySelector('#establishmentThemeColor');
    if (!paletteContainer || !themeInput) return;
    
    paletteContainer.innerHTML = '';
    Object.entries(colorThemes).forEach(([key, theme]) => {
        const isSelected = key === currentThemeKey;
        const swatch = document.createElement('div');
        swatch.className = `w-24 text-center cursor-pointer`;
        swatch.innerHTML = `
            <div class="w-16 h-16 mx-auto rounded-full border-4 ${isSelected ? 'border-blue-500' : 'border-transparent'} p-1">
                <div class="w-full h-full rounded-full" style="background-color: ${theme.main};"></div>
            </div>
            <p class="text-xs mt-2 font-medium ${isSelected ? 'text-blue-600' : 'text-gray-600'}">${theme.name}</p>
        `;
        swatch.addEventListener('click', () => {
            themeInput.value = key;
            renderColorPalette(key, container); // Re-renderiza para atualizar a seleção visual
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
    const menuItem = menuItems.find(item => item.id === sectionId);
    if (!menuItem) {
        console.error("Secção de definições não encontrada:", sectionId);
        return;
    }

    contentDiv.innerHTML = `
        <div class="bg-white p-4 shadow-md sticky top-0 z-10 md:relative">
            <button data-action="back-to-list" class="flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-800">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                Voltar
            </button>
        </div>
        
        <div id="settings-content-detail" class="p-4">
            <div class="flex justify-center items-center h-full"><div class="loader"></div></div>
        </div>
    `;

    contentDiv.querySelector('button[data-action="back-to-list"]').addEventListener('click', (e) => {
        e.preventDefault();
        loadEstablishmentPage(); 
    });

    const detailContainer = document.getElementById('settings-content-detail');

    switch (sectionId) {
        case 'personal-data': renderPersonalDataSection(establishmentData, detailContainer); break;
        case 'change-password': renderChangePasswordSection(establishmentData, detailContainer); break;
        case 'change-email': renderChangeEmailSection(establishmentData, detailContainer); break; 
        case 'branding': renderBrandingSection(establishmentData, detailContainer); break;
        case 'booking': renderBookingSection(establishmentData, detailContainer); break;
        case 'working-hours': renderWorkingHoursSection(establishmentData, detailContainer); break;
        case 'loyalty': renderLoyaltySection(establishmentData, detailContainer); break;
        case 'financial': await renderFinancialIntegrationSection(establishmentData, detailContainer); break;
        default:
            renderPlaceholderSection(menuItem ? menuItem.label : 'Definições', detailContainer);
    }
}

export async function loadEstablishmentPage() {
    contentDiv.innerHTML = `
        <div class="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>
                Definições
            </h2>
        </div>
        <div class="flex justify-center items-center h-64"><div class="loader"></div></div>
    `;

    if (!establishmentData) {
        try {
            establishmentData = await establishmentApi.getEstablishmentDetails(state.establishmentId);
        } catch (error) {
            showNotification('Erro Fatal', 'Não foi possível carregar os dados do estabelecimento.', 'error');
            contentDiv.innerHTML = '<p class="text-red-500">Erro ao carregar dados.</p>';
            return;
        }
    }

    const displayName = state.userName || auth.currentUser.email;
    const displayInitials = displayName ? displayName.charAt(0).toUpperCase() : 'U';

    contentDiv.innerHTML = `
        <div class="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>
                Definições
            </h2>
        </div>
        
        <div data-action="go-to-my-profile" class="bg-white p-4 rounded-lg shadow-md mb-6 cursor-pointer hover:bg-gray-50 transition-all">
            <div class="text-center relative">
                
                <div class="absolute top-0 right-0 p-2 text-gray-400 hover:text-indigo-600" title="Ver Meu Perfil">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                 </div>

                 <div class="relative w-24 h-24 mx-auto">
                    <img id="user-avatar" src="https://placehold.co/96x96/E2E8F0/4A5568?text=${displayInitials}" class="w-24 h-24 rounded-full object-cover">
                 </div>
                 <h3 class="font-bold mt-2 text-lg truncate">${displayName}</h3>
                 ${(state.userName && state.userName !== auth.currentUser.email) ? `<p class="text-sm text-gray-500">${auth.currentUser.email || 'Não disponível'}</p>` : ''}
                 
                 <p class="text-xs text-indigo-600 font-semibold mt-2">VER MEU PERFIL / MEUS BLOQUEIOS</p>
            </div>
        </div>

        <div class="bg-white p-4 rounded-lg shadow-md">
            <nav id="settings-menu-list" class="space-y-1">
                ${menuItems.map(item => `
                    <button data-section="${item.id}" class="w-full flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-semibold text-sm">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${item.icon}"></path></svg>
                        <span class="flex-1 text-left">${item.label}</span>
                        <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
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