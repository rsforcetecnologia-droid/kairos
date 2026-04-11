// js/ui/establishment.js (Configuração Individual Dinâmica de Matriz/Filial)

import * as establishmentApi from '../api/establishments.js';
import * as financialApi from '../api/financial.js';
import * as servicesApi from '../api/services.js';
import * as productsApi from '../api/products.js';
import * as packagesApi from '../api/packages.js';
import { state } from '../state.js';
import { showNotification } from '../components/modal.js';
import { auth } from '../firebase-config.js';
import { updatePassword, updateProfile, verifyBeforeUpdateEmail, reauthenticateWithCredential, EmailAuthProvider } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js"; 
import { navigateTo } from '../main.js';
import { escapeHTML } from '../utils.js'; 

const contentDiv = document.getElementById('content');
const daysOfWeek = { monday: 'Segunda', tuesday: 'Terça', wednesday: 'Quarta', thursday: 'Quinta', friday: 'Sexta', saturday: 'Sábado', sunday: 'Domingo' };

// --- DEFINIÇÃO DOS TEMPLATES VISUAIS MODERNOS (10 OPÇÕES) ---
const designTemplates = [
    // 1. Clean & Moderno (O Padrão perfeito, fundos brancos, azul confiança)
    { id: 'clean-modern', name: 'Clean Moderno', bg: '#f8fafc', text: '#4b5563', titleColor: '#0f172a', primary: '#2563eb', font: 'Inter', btn: 'rounded', cardBg: '#ffffff', cardBorder: '#e2e8f0' },
    
    // 2. Dark Premium (Foco em Barbearias, Estúdios Noturnos - Fundo grafite, detalhes em âmbar/dourado)
    { id: 'dark-premium', name: 'Dark Premium', bg: '#0f172a', text: '#9ca3af', titleColor: '#f8fafc', primary: '#f59e0b', font: "'Playfair Display'", btn: 'square', cardBg: '#1e293b', cardBorder: '#334155' },
    
    // 3. Spa Zen (Para estúdios de beleza, clínicas - Tons de verde menta suaves)
    { id: 'spa-zen', name: 'Spa & Wellness', bg: '#f0fdf4', text: '#166534', titleColor: '#064e3b', primary: '#10b981', font: 'Poppins', btn: 'pill', cardBg: '#ffffff', cardBorder: '#d1fae5' },
    
    // 4. Neobrutalismo (Design arrojado, muito contraste, bordas fortes, chamativo)
    { id: 'neo-brutalism', name: 'Neobrutalismo', bg: '#ffffff', text: '#000000', titleColor: '#000000', primary: '#ef4444', font: 'Inter', btn: 'square', cardBg: '#ffffff', cardBorder: '#000000' },
    
    // 5. Tech Cyan (Dark mode com toques cibernéticos em Ciano, ótimo para barbearias modernas)
    { id: 'tech-cyan', name: 'Tech Night', bg: '#020617', text: '#94a3b8', titleColor: '#f1f5f9', primary: '#06b6d4', font: 'Roboto', btn: 'rounded', cardBg: '#0f172a', cardBorder: '#1e293b' },
    
    // 6. Sunset Glam (Tons quentes, blush/pêssego, para estética, unhas, salões)
    { id: 'sunset-glam', name: 'Sunset Glam', bg: '#fff7ed', text: '#831843', titleColor: '#4c0519', primary: '#f43f5e', font: 'Poppins', btn: 'pill', cardBg: '#ffffff', cardBorder: '#fce7f3' },
    
    // 7. Luxo Minimalista (Monocromático suave, cinzas elegantes)
    { id: 'luxury-mono', name: 'Luxo Minimal', bg: '#fafafa', text: '#525252', titleColor: '#171717', primary: '#404040', font: "'Playfair Display'", btn: 'square', cardBg: '#ffffff', cardBorder: '#e5e5e5' },
    
    // 8. Oceano Profundo (Tons de azul profundo, transmite muita calma e profissionalismo)
    { id: 'deep-ocean', name: 'Oceano Profundo', bg: '#172554', text: '#bfdbfe', titleColor: '#eff6ff', primary: '#3b82f6', font: 'Montserrat', btn: 'pill', cardBg: '#1e3a8a', cardBorder: '#1e40af' },
    
    // 9. Rústico Vintage (Fundo escuro acastanhado, detalhes em laranja queimado/cobre)
    { id: 'rustic-vintage', name: 'Rústico Vintage', bg: '#1c1917', text: '#a8a29e', titleColor: '#fafaf9', primary: '#ea580c', font: 'Montserrat', btn: 'rounded', cardBg: '#292524', cardBorder: '#44403c' },
    
    // 10. Violeta Vibrante (Criativo, arrojado, ótimo para estúdios de tatuagem, maquilhadoras)
    { id: 'vibrant-purple', name: 'Estúdio Criativo', bg: '#fdf4ff', text: '#701a75', titleColor: '#4a044e', primary: '#c026d3', font: 'Inter', btn: 'rounded', cardBg: '#ffffff', cardBorder: '#fae8ff' }
];

// Variáveis de Controlo Dinâmico
let establishmentData = null; 
let currentEditingId = null; 

function getMenuItems() {
    return [
        { id: 'personal-data', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', label: 'Dados Gerais da Unidade' },
        { id: 'branding', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z', label: 'Identidade e Cores'},
        { id: 'booking', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'Agendamento Online' },
        { id: 'working-hours', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Horário de Funcionamento' },
        { id: 'whatsapp-bot', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', label: 'Atendente Virtual (WhatsApp)' },
        { id: 'loyalty', icon: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h2V5z', label: 'Plano de Fidelidade' },
        { id: 'financial', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z', label: 'Integração Financeira' },
        { id: 'change-password', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', label: 'Alterar senha' },
        { id: 'change-email', icon: 'M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207', label: 'Alterar E-mail de Acesso' },
        { id: 'support', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z', label: 'Suporte e Ajuda' },
        { id: 'cancellation', icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Cancelar Assinatura' },
    ];
}

// --- FUNÇÕES AUXILIARES ---

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
        const updatePromises = [];
        const { ownerName, ...firestoreData } = formData;

        if (ownerName && ownerName !== state.userName) {
             const user = auth.currentUser;
             if (user) {
                   updatePromises.push(updateProfile(user, { displayName: ownerName }).then(() => { state.userName = ownerName; }));
             }
        }
        
        const updatedData = { ...establishmentData, ...firestoreData };
        
        updatePromises.push(establishmentApi.updateEstablishmentDetails(currentEditingId, updatedData));

        await Promise.all(updatePromises);
        
        establishmentData = updatedData;

        showNotification('Sucesso', 'Definições salvas com sucesso!', 'success');
        
        if (firestoreData.themeColor && currentEditingId === state.establishmentId) {
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

// --- FUNÇÕES DE RENDERIZAÇÃO DAS SECÇÕES ---

function renderPersonalDataSection(data, container) {
    const safeName = escapeHTML(data.name || '');
    const safePhone = escapeHTML(data.phone || '');
    const safeDoc = escapeHTML(data.cnpj || '');
    const safeEmail = escapeHTML(data.email || '');
    const safeAddr = escapeHTML(data.address || '');
    const safeWeb = escapeHTML(data.website || '');
    const safeUserName = escapeHTML(state.userName || '');

    container.innerHTML = `
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-100">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-gray-800">Dados Gerais e de Contato</h3>
                <button type="submit" form="personal-data-form" class="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700">Salvar</button>
            </div>
            <form id="personal-data-form" class="space-y-4">
                <div>
                    <label for="ownerName" class="block text-sm font-medium text-gray-700">Seu nome (Responsável)</label>
                    <input type="text" id="ownerName" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" value="${safeUserName}">
                </div>
                <div>
                    <label for="establishmentName" class="block text-sm font-medium text-gray-700">Nome da Unidade</label>
                    <input type="text" id="establishmentName" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" value="${safeName}">
                </div>
                <div>
                    <label for="establishmentPhone" class="block text-sm font-medium text-gray-700">Telefone Principal</label>
                    <input type="tel" id="establishmentPhone" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" value="${safePhone}">
                </div>
                <div>
                    <label for="establishmentCnpjCpf" class="block text-sm font-medium text-gray-700">CNPJ / CPF</label>
                    <input type="text" id="establishmentCnpjCpf" value="${safeDoc}" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md bg-gray-50">
                </div>
                <div>
                    <label for="establishmentEmail" class="block text-sm font-medium text-gray-700">E-mail de Contato</label>
                    <input type="email" id="establishmentEmail" value="${safeEmail}" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none">
                </div>
                <div>
                    <label for="establishmentAddress" class="block text-sm font-medium text-gray-700">Endereço Completo</label>
                    <input type="text" id="establishmentAddress" value="${safeAddr}" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none">
                </div>
                <div>
                    <label for="establishmentWebsite" class="block text-sm font-medium text-gray-700">Website</label>
                    <input type="url" id="establishmentWebsite" value="${safeWeb}" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none">
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
            cnpj: container.querySelector('#establishmentCnpjCpf').value,
            email: container.querySelector('#establishmentEmail').value,
            address: container.querySelector('#establishmentAddress').value,
            website: container.querySelector('#establishmentWebsite').value,
        };
        handleSave(formData, e);
    });
}

function renderChangePasswordSection(data, container) {
    container.innerHTML = `
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-100">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-gray-800">Alterar Senha</h3>
                <button type="submit" form="change-password-form" class="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700">Salvar Nova Senha</button>
            </div>
            <form id="change-password-form" class="space-y-4">
                <div>
                    <label for="newPassword" class="block text-sm font-medium text-gray-700">Nova Senha</label>
                    <input type="password" id="newPassword" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md" required minlength="6">
                </div>
                <div>
                    <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmar Nova Senha</label>
                    <input type="password" id="confirmPassword" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md" required>
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
                throw new Error("Nenhum utilizador logado encontrado.");
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
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-100">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-gray-800">Alterar E-mail de Acesso</h3>
                <button type="submit" form="change-email-form" class="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700">Salvar Novo E-mail</button>
            </div>
            <form id="change-email-form" class="space-y-4">
                <p class="text-sm text-gray-600">Para alterar o seu e-mail, confirme a sua senha atual. Um link será enviado para o **novo** endereço.</p>
                <div>
                    <label for="newEmail" class="block text-sm font-medium text-gray-700">Novo E-mail</label>
                    <input type="email" id="newEmail" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md" required>
                </div>
                <div>
                    <label for="currentPassword" class="block text-sm font-medium text-gray-700">Senha Atual</label>
                    <input type="password" id="currentPassword" class="mt-1 w-full p-2.5 border border-gray-300 rounded-md" required>
                </div>
            </form>
        </div>
    `;
    
    container.querySelector('#change-email-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const newEmail = container.querySelector('#newEmail').value;
        const currentPassword = container.querySelector('#currentPassword').value;
        
        const saveButton = container.querySelector('button[form="change-email-form"]');
        saveButton.disabled = true; saveButton.textContent = 'A verificar...';

        try {
            const user = auth.currentUser;
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);
            await verifyBeforeUpdateEmail(user, newEmail); 
            await establishmentApi.updateOwnerEmail(currentEditingId, newEmail);
            showNotification('Sucesso', 'Link de verificação enviado! Verifique o seu novo e-mail.', 'success');
            e.target.reset();
        } catch (error) {
            showNotification('Erro', error.message, 'error');
        } finally {
            saveButton.disabled = false; saveButton.textContent = 'Salvar Novo E-mail';
        }
    });
}

// ============================================================================
// MODAL DE IDENTIDADE VISUAL COM TEMPLATES MODERNOS
// ============================================================================
function renderBrandingSection(data, container) {
    const safeWelcome = escapeHTML(data.welcomeMessage || 'Agende o seu horário de forma rápida e fácil.');
    
    // Dados das Redes Sociais
    const socialData = data.socialLinks || {};
    const safeInsta = escapeHTML(socialData.instagram || '');
    const safeFace = escapeHTML(socialData.facebook || '');
    const safeWhats = escapeHTML(socialData.whatsapp || '');

    // Valores Atuais Visuais
    let currentPrimaryColor = data.primaryColor || data.themeColor || designTemplates[0].primary;
    let currentBgColor = data.backgroundColor || designTemplates[0].bg;
    let currentTextColor = data.textColor || designTemplates[0].text;
    let currentTitleColor = data.titleColor || designTemplates[0].titleColor; 
    let currentBtnStyle = data.buttonStyle || designTemplates[0].btn; 
    let currentTypography = data.typography || designTemplates[0].font;
    let currentTemplateIndex = data.templateId ? designTemplates.findIndex(t => t.id === data.templateId) : 0;
    if(currentTemplateIndex === -1) currentTemplateIndex = 0;

    const getBtnRadius = (style) => {
        if(style === 'pill') return '9999px';
        if(style === 'square') return '0.25rem';
        return '0.75rem'; // rounded default
    };

    container.innerHTML = `
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 flex-wrap gap-4">
                <div>
                    <h3 class="text-xl font-bold text-gray-800">Layout e Link na Bio</h3>
                    <p class="text-sm text-gray-500 mt-1">Personalize a vitrine digital para o seu cliente.</p>
                </div>
                <button type="submit" form="branding-form" class="bg-indigo-600 text-white font-semibold py-2.5 px-6 rounded-xl hover:bg-indigo-700 shadow-md transition-all active:scale-95 flex items-center gap-2">
                    <i class="bi bi-save"></i> Publicar Alterações
                </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 h-full">
                
                <div class="lg:col-span-7 p-6 border-r border-gray-100 overflow-y-auto max-h-[850px] bg-white">
                    <form id="branding-form" class="space-y-8">
                        <input type="hidden" id="establishmentLogoBase64" value="${data.logo || ''}">
                        <input type="hidden" id="establishmentBackgroundImageBase64" value="${data.backgroundImage || ''}">
                        <input type="hidden" id="selectedTemplateId" value="${designTemplates[currentTemplateIndex].id}">
                        
                        <div class="bg-indigo-50 p-5 rounded-2xl border border-indigo-100">
                            <h4 class="text-sm font-bold text-indigo-900 uppercase tracking-wider mb-3 text-center">1. Escolha um Tema Base</h4>
                            <div class="flex items-center justify-center gap-4">
                                <button type="button" id="prevTemplate" class="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white shadow-sm transition-colors cursor-pointer border border-indigo-200">
                                    <i class="bi bi-chevron-left text-lg"></i>
                                </button>
                                <div class="text-center min-w-[160px]">
                                    <span id="templateNameDisplay" class="text-lg font-bold text-indigo-950">${designTemplates[currentTemplateIndex].name}</span>
                                </div>
                                <button type="button" id="nextTemplate" class="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white shadow-sm transition-colors cursor-pointer border border-indigo-200">
                                    <i class="bi bi-chevron-right text-lg"></i>
                                </button>
                            </div>
                        </div>

                        <div class="space-y-4">
                            <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                                <i class="bi bi-image text-indigo-500"></i> 2. Logótipo e Capa
                            </h4>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-50 transition relative group" id="triggerBannerUpload">
                                    <input type="file" id="establishmentBgInput" class="hidden" accept="image/*">
                                    <div class="absolute inset-0 z-10 hidden group-hover:flex items-center justify-center bg-black bg-opacity-40 rounded-xl transition pointer-events-none">
                                        <span class="text-white font-semibold text-sm">Mudar Capa</span>
                                    </div>
                                    <div class="h-24 w-full bg-gray-100 rounded-lg overflow-hidden mb-3 flex items-center justify-center relative pointer-events-none">
                                        <img id="establishmentBgPreview" src="${data.backgroundImage || ''}" class="w-full h-full object-cover ${!data.backgroundImage ? 'hidden' : ''}">
                                        <i class="bi bi-image text-3xl text-gray-300 ${data.backgroundImage ? 'hidden' : ''}" id="establishmentBgPlaceholder"></i>
                                    </div>
                                    <p class="text-xs font-semibold text-gray-700 pointer-events-none">Imagem de Capa (Fundo)</p>
                                </div>

                                <div class="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-50 transition relative group" id="triggerLogoUpload">
                                    <input type="file" id="establishmentLogoInput" class="hidden" accept="image/*">
                                    <div class="absolute inset-0 z-10 hidden group-hover:flex items-center justify-center bg-black bg-opacity-40 rounded-xl transition pointer-events-none">
                                        <span class="text-white font-semibold text-sm">Mudar Logo</span>
                                    </div>
                                    <div class="h-24 w-24 bg-gray-100 rounded-full mx-auto overflow-hidden mb-3 flex items-center justify-center border-4 border-white shadow-sm relative pointer-events-none">
                                        <img id="establishmentLogoPreview" src="${data.logo || 'https://placehold.co/128x128/E2E8F0/4A5568?text=Logo'}" class="w-full h-full object-contain bg-white">
                                    </div>
                                    <p class="text-xs font-semibold text-gray-700 pointer-events-none">Logótipo</p>
                                </div>
                            </div>
                        </div>

                        <hr class="border-gray-100">

                        <div class="space-y-4">
                            <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                                <i class="bi bi-card-text text-indigo-500"></i> 3. Informações e Contactos
                            </h4>
                            <div>
                                <label for="establishmentWelcomeMessage" class="block text-xs font-semibold text-gray-600 mb-1">Descrição Curta</label>
                                <textarea id="establishmentWelcomeMessage" rows="2" class="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none" placeholder="Ex: Especialistas em cortes clássicos. Agende o seu horário!">${safeWelcome}</textarea>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                                <div class="flex rounded-xl shadow-sm overflow-hidden border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                                    <span class="inline-flex items-center px-3 bg-gray-50 text-gray-500 border-r border-gray-300"><i class="bi bi-instagram text-pink-600"></i></span>
                                    <input type="text" id="socialInstagram" value="${safeInsta}" class="flex-1 p-2.5 outline-none text-xs" placeholder="Usuário (@)">
                                </div>
                                <div class="flex rounded-xl shadow-sm overflow-hidden border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                                    <span class="inline-flex items-center px-3 bg-gray-50 text-gray-500 border-r border-gray-300"><i class="bi bi-whatsapp text-green-500"></i></span>
                                    <input type="text" id="socialWhatsapp" value="${safeWhats}" class="flex-1 p-2.5 outline-none text-xs" placeholder="Número Whatsapp">
                                </div>
                                <div class="flex rounded-xl shadow-sm overflow-hidden border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                                    <span class="inline-flex items-center px-3 bg-gray-50 text-gray-500 border-r border-gray-300"><i class="bi bi-facebook text-blue-600"></i></span>
                                    <input type="text" id="socialFacebook" value="${safeFace}" class="flex-1 p-2.5 outline-none text-xs" placeholder="Link da página">
                                </div>
                            </div>
                        </div>

                        <hr class="border-gray-100">

                        <div class="space-y-4 pb-4">
                            <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                                <i class="bi bi-sliders text-indigo-500"></i> 4. Ajustes Finos (Opcional)
                            </h4>
                            
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div class="bg-gray-50 p-2 rounded-xl border border-gray-200">
                                    <label class="block text-[10px] font-semibold text-gray-500 mb-1 text-center">Botões</label>
                                    <div class="flex flex-col items-center gap-1">
                                        <input type="color" id="previewPrimaryColorInput" value="${currentPrimaryColor}" class="w-8 h-8 p-0 border-0 rounded cursor-pointer bg-transparent">
                                    </div>
                                </div>

                                <div class="bg-gray-50 p-2 rounded-xl border border-gray-200">
                                    <label class="block text-[10px] font-semibold text-gray-500 mb-1 text-center">Fundo</label>
                                    <div class="flex flex-col items-center gap-1">
                                        <input type="color" id="previewBgColorInput" value="${currentBgColor}" class="w-8 h-8 p-0 border-0 rounded cursor-pointer bg-transparent">
                                    </div>
                                </div>

                                <div class="bg-gray-50 p-2 rounded-xl border border-gray-200">
                                    <label class="block text-[10px] font-semibold text-gray-500 mb-1 text-center">Nome</label>
                                    <div class="flex flex-col items-center gap-1">
                                        <input type="color" id="previewTitleColorInput" value="${currentTitleColor}" class="w-8 h-8 p-0 border-0 rounded cursor-pointer bg-transparent">
                                    </div>
                                </div>

                                <div class="bg-gray-50 p-2 rounded-xl border border-gray-200">
                                    <label class="block text-[10px] font-semibold text-gray-500 mb-1 text-center">Texto</label>
                                    <div class="flex flex-col items-center gap-1">
                                        <input type="color" id="previewTextColorInput" value="${currentTextColor}" class="w-8 h-8 p-0 border-0 rounded cursor-pointer bg-transparent">
                                    </div>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                                <div>
                                    <label class="block text-xs font-semibold text-gray-600 mb-1">Tipografia</label>
                                    <select id="typographyInput" class="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 bg-white">
                                        <option value="Inter" ${currentTypography === 'Inter' ? 'selected' : ''}>Inter (Moderna)</option>
                                        <option value="Roboto" ${currentTypography === 'Roboto' ? 'selected' : ''}>Roboto (Clássica)</option>
                                        <option value="'Playfair Display'" ${currentTypography === "'Playfair Display'" ? 'selected' : ''}>Playfair (Elegante)</option>
                                        <option value="Montserrat" ${currentTypography === 'Montserrat' ? 'selected' : ''}>Montserrat (Forte)</option>
                                        <option value="Poppins" ${currentTypography === 'Poppins' ? 'selected' : ''}>Poppins (Suave)</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-xs font-semibold text-gray-600 mb-1">Botões</label>
                                    <div class="flex bg-gray-100 p-1 rounded-xl">
                                        <label class="flex-1 text-center cursor-pointer">
                                            <input type="radio" name="buttonStyle" value="square" class="hidden peer" ${currentBtnStyle === 'square' ? 'checked' : ''}>
                                            <div class="py-1.5 px-2 text-xs font-semibold text-gray-500 rounded-lg peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-sm transition">Reto</div>
                                        </label>
                                        <label class="flex-1 text-center cursor-pointer">
                                            <input type="radio" name="buttonStyle" value="rounded" class="hidden peer" ${currentBtnStyle === 'rounded' ? 'checked' : ''}>
                                            <div class="py-1.5 px-2 text-xs font-semibold text-gray-500 rounded-lg peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-sm transition">Suave</div>
                                        </label>
                                        <label class="flex-1 text-center cursor-pointer">
                                            <input type="radio" name="buttonStyle" value="pill" class="hidden peer" ${currentBtnStyle === 'pill' ? 'checked' : ''}>
                                            <div class="py-1.5 px-2 text-xs font-semibold text-gray-500 rounded-lg peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-sm transition">Pílula</div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="lg:col-span-5 bg-gradient-to-br from-gray-100 to-gray-300 p-6 flex flex-col items-center justify-center relative overflow-hidden">
                    
                    <div class="relative w-[320px] h-[640px] bg-black rounded-[3rem] border-[10px] border-gray-900 shadow-2xl overflow-hidden shrink-0">
                        
                        <div class="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-xl w-32 mx-auto z-50"></div>

                        <div id="mockup-screen-wrapper" class="w-full h-full bg-white transition-all duration-300 transform scale-100 opacity-100 relative">
                            <div id="mockup-screen" class="w-full h-full overflow-y-auto no-scrollbar" style="
                                background-color: var(--preview-bg, ${currentBgColor}); 
                                color: var(--preview-text, ${currentTextColor}); 
                                font-family: var(--preview-font, ${currentTypography});
                                --preview-title-color: ${currentTitleColor};
                                --preview-primary: ${currentPrimaryColor};
                                --preview-btn-radius: ${getBtnRadius(currentBtnStyle)};
                                --preview-card-bg: ${designTemplates[currentTemplateIndex].cardBg};
                                --preview-card-border: ${designTemplates[currentTemplateIndex].cardBorder};
                            ">
                                
                                <div class="relative h-36 w-full bg-gray-200 overflow-hidden">
                                    <img id="mockup-banner" src="${data.backgroundImage || ''}" class="w-full h-full object-cover transition-opacity duration-300 ${!data.backgroundImage ? 'hidden' : ''}">
                                    <div id="mockup-banner-placeholder" class="w-full h-full flex items-center justify-center bg-gray-300 opacity-50 ${data.backgroundImage ? 'hidden' : ''}"></div>
                                    <div class="absolute inset-0 bg-gradient-to-t from-[var(--preview-bg)] to-transparent opacity-90"></div>
                                </div>

                                <div class="px-4 relative -mt-12 z-10 flex flex-col items-center text-center">
                                    
                                    <div class="w-24 h-24 bg-white rounded-full mx-auto border-[5px] shadow-sm overflow-hidden flex items-center justify-center transition-all duration-500" style="border-color: var(--preview-bg); background-color: var(--preview-bg);">
                                        <img id="mockup-logo" src="${data.logo || 'https://placehold.co/128x128/E2E8F0/4A5568?text=Logo'}" class="w-full h-full object-contain">
                                    </div>

                                    <div class="mt-2 w-full">
                                        <h1 class="text-xl font-bold truncate leading-tight" style="color: var(--preview-title-color);">${escapeHTML(data.name || 'Sua Empresa')}</h1>
                                        <p id="mockup-welcome" class="text-[11px] mt-1 opacity-70 leading-relaxed max-w-[260px] mx-auto">${safeWelcome}</p>
                                    </div>

                                    <div class="flex justify-center gap-2 mt-3 w-full" id="mockup-social-row">
                                        <div id="mockup-insta-icon" class="w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm transition-transform ${!safeInsta ? 'hidden' : ''}" style="background-color: var(--preview-card-bg); border: 1px solid var(--preview-card-border); color: var(--preview-primary)"><i class="bi bi-instagram"></i></div>
                                        <div id="mockup-whats-icon" class="w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm transition-transform ${!safeWhats ? 'hidden' : ''}" style="background-color: var(--preview-card-bg); border: 1px solid var(--preview-card-border); color: var(--preview-primary)"><i class="bi bi-whatsapp"></i></div>
                                        <div id="mockup-face-icon" class="w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm transition-transform ${!safeFace ? 'hidden' : ''}" style="background-color: var(--preview-card-bg); border: 1px solid var(--preview-card-border); color: var(--preview-primary)"><i class="bi bi-facebook"></i></div>
                                    </div>
                                </div>

                                <div class="flex border-b border-gray-200 border-opacity-30 mt-4 px-4 gap-5">
                                    <div class="py-2 border-b-2 font-bold text-[13px]" style="border-color: var(--preview-primary); color: var(--preview-primary);">Serviços</div>
                                    <div class="py-2 text-[13px] opacity-50 font-semibold" style="color: var(--preview-title-color);">Profissionais</div>
                                </div>

                                <div class="w-full text-left p-4 space-y-3">
                                    <div class="p-3 transition-all flex justify-between items-center shadow-sm" style="background-color: var(--preview-card-bg); border: 1px solid var(--preview-card-border); border-radius: var(--preview-btn-radius);">
                                        <div>
                                            <p class="font-bold text-[13px]" style="color: var(--preview-title-color);">Corte Clássico</p>
                                            <p class="text-[11px] opacity-70 mt-0.5">30 min • R$ 40,00</p>
                                        </div>
                                        <div class="px-3 py-1.5 text-[11px] font-bold text-white shadow-sm transition-all" style="background-color: var(--preview-primary); border-radius: var(--preview-btn-radius);">+ Adicionar</div>
                                    </div>
                                    
                                    <div class="p-3 transition-all flex justify-between items-center shadow-sm" style="background-color: var(--preview-card-bg); border: 1px solid var(--preview-card-border); border-radius: var(--preview-btn-radius);">
                                        <div>
                                            <p class="font-bold text-[13px]" style="color: var(--preview-title-color);">Corte + Barba</p>
                                            <p class="text-[11px] opacity-70 mt-0.5">60 min • R$ 70,00</p>
                                        </div>
                                        <div class="px-3 py-1.5 text-[11px] font-bold text-white shadow-sm transition-all" style="background-color: var(--preview-primary); border-radius: var(--preview-btn-radius);">+ Adicionar</div>
                                    </div>
                                </div>

                                <div class="w-full text-left pt-2 pb-24 border-t border-gray-200 border-opacity-20 mt-2">
                                    <div class="px-4 flex items-center justify-between mb-3">
                                        <h2 class="text-[11px] font-bold uppercase tracking-wider opacity-60" style="color: var(--preview-title-color);">Avaliações</h2>
                                        <div class="flex items-center gap-1 text-yellow-500 text-[10px] bg-yellow-500/10 px-1.5 py-0.5 rounded-md">
                                            <i class="bi bi-star-fill"></i><span class="font-bold" style="color: var(--preview-title-color);">4.9</span>
                                        </div>
                                    </div>
                                    <div class="flex gap-2 overflow-x-auto px-4 pb-4 snap-x no-scrollbar">
                                        <div class="p-3 shadow-sm min-w-[200px] snap-center shrink-0 flex flex-col" style="background-color: var(--preview-card-bg); border: 1px solid var(--preview-card-border); border-radius: var(--preview-btn-radius);">
                                            <div class="flex gap-1 text-yellow-400 text-[8px] mb-2"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></div>
                                            <p class="text-[10px] italic opacity-80 mb-3 flex-grow leading-relaxed" style="color: var(--preview-title-color);">"Atendimento impecável! O ambiente é ótimo e o serviço perfeito."</p>
                                            <div class="flex items-center gap-2 mt-auto pt-2 border-t border-gray-200 border-opacity-20">
                                                <div class="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white" style="background-color: var(--preview-primary);">MS</div>
                                                <span class="text-[10px] font-bold" style="color: var(--preview-title-color);">M. Silva</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            
                            <div class="absolute bottom-4 left-4 right-4 py-3 px-4 shadow-lg flex justify-between items-center z-20" style="background-color: var(--preview-primary); color: white; border-radius: var(--preview-btn-radius);">
                                <span class="text-xs font-semibold">1 serviço</span>
                                <span class="text-sm font-bold flex items-center gap-1">Continuar <i class="bi bi-arrow-right"></i></span>
                            </div>

                        </div>
                    </div>
                    </div>
            </div>
        </div>
    `;

    // --- LÓGICA DE INTERAÇÃO E ANIMAÇÃO ---
    const mockupScreenWrapper = container.querySelector('#mockup-screen-wrapper');
    const mockupScreen = container.querySelector('#mockup-screen');
    
    // Inputs manuais
    const primaryInput = container.querySelector('#previewPrimaryColorInput');
    const bgInput = container.querySelector('#previewBgColorInput');
    const textInput = container.querySelector('#previewTextColorInput');
    const titleColorInput = container.querySelector('#previewTitleColorInput');
    const typographyInput = container.querySelector('#typographyInput');
    
    // Outros campos
    const welcomeInput = container.querySelector('#establishmentWelcomeMessage');
    const mockupWelcome = container.querySelector('#mockup-welcome');
    const instaInput = container.querySelector('#socialInstagram');
    const whatsInput = container.querySelector('#socialWhatsapp');
    const faceInput = container.querySelector('#socialFacebook');

    // Navegação de templates
    const btnPrev = container.querySelector('#prevTemplate');
    const btnNext = container.querySelector('#nextTemplate');
    const templateNameDisplay = container.querySelector('#templateNameDisplay');
    const hiddenTemplateId = container.querySelector('#selectedTemplateId');

    // Função para aplicar template COM ANIMAÇÃO
    const applyTemplate = (index) => {
        const t = designTemplates[index];
        
        // 1. Efeito visual de Fade Out / Scale Down
        mockupScreenWrapper.style.opacity = '0.3';
        mockupScreenWrapper.style.transform = 'scale(0.96)';

        setTimeout(() => {
            // 2. Atualizar Valores UI (Esquerda)
            primaryInput.value = t.primary;
            bgInput.value = t.bg;
            textInput.value = t.text;
            titleColorInput.value = t.titleColor || t.text; // Garante fallback
            typographyInput.value = t.font;
            container.querySelectorAll('input[name="buttonStyle"]').forEach(radio => {
                radio.checked = (radio.value === t.btn);
            });
            
            hiddenTemplateId.value = t.id;
            templateNameDisplay.textContent = t.name;

            // 3. Atualizar Variáveis CSS do Mockup (Direita)
            mockupScreen.style.setProperty('--preview-primary', t.primary);
            mockupScreen.style.setProperty('--preview-bg', t.bg);
            mockupScreen.style.setProperty('--preview-text', t.text);
            mockupScreen.style.setProperty('--preview-title-color', t.titleColor || t.text);
            mockupScreen.style.setProperty('--preview-font', t.font);
            mockupScreen.style.setProperty('--preview-btn-radius', getBtnRadius(t.btn));
            mockupScreen.style.setProperty('--preview-card-bg', t.cardBg);
            mockupScreen.style.setProperty('--preview-card-border', t.cardBorder);

            // 4. Efeito visual de Fade In / Scale Up
            mockupScreenWrapper.style.opacity = '1';
            mockupScreenWrapper.style.transform = 'scale(1)';
        }, 300); // 300ms combina com o duration-300 do tailwind
    };

    // Listeners de Navegação
    btnPrev.addEventListener('click', () => {
        currentTemplateIndex = (currentTemplateIndex - 1 + designTemplates.length) % designTemplates.length;
        applyTemplate(currentTemplateIndex);
    });

    btnNext.addEventListener('click', () => {
        currentTemplateIndex = (currentTemplateIndex + 1) % designTemplates.length;
        applyTemplate(currentTemplateIndex);
    });

    // Atualização Manual Dinâmica (Sem animação para feedback instantâneo)
    primaryInput.addEventListener('input', e => mockupScreen.style.setProperty('--preview-primary', e.target.value));
    bgInput.addEventListener('input', e => mockupScreen.style.setProperty('--preview-bg', e.target.value));
    textInput.addEventListener('input', e => mockupScreen.style.setProperty('--preview-text', e.target.value));
    titleColorInput.addEventListener('input', e => mockupScreen.style.setProperty('--preview-title-color', e.target.value));
    
    typographyInput.addEventListener('change', e => mockupScreen.style.setProperty('--preview-font', e.target.value));
    container.querySelectorAll('input[name="buttonStyle"]').forEach(radio => {
        radio.addEventListener('change', e => {
            if(e.target.checked) mockupScreen.style.setProperty('--preview-btn-radius', getBtnRadius(e.target.value));
        });
    });

    // Atualizar Textos e Redes em Tempo Real
    welcomeInput.addEventListener('input', e => mockupWelcome.textContent = e.target.value || 'Mensagem...');
    const updateSocialMockup = () => {
        container.querySelector('#mockup-insta-icon').classList.toggle('hidden', !instaInput.value.trim());
        container.querySelector('#mockup-whats-icon').classList.toggle('hidden', !whatsInput.value.trim());
        container.querySelector('#mockup-face-icon').classList.toggle('hidden', !faceInput.value.trim());
    };
    [instaInput, whatsInput, faceInput].forEach(el => el.addEventListener('input', updateSocialMockup));

    // UPLOAD DE IMAGENS - CORRIGIDO O EVENTO DE CLIQUE
    const logoInput = container.querySelector('#establishmentLogoInput');
    const bgImageInput = container.querySelector('#establishmentBgInput');
    const logoBase64 = container.querySelector('#establishmentLogoBase64');
    const bgBase64 = container.querySelector('#establishmentBackgroundImageBase64');

    // Ao clicar na div do Logo (garantindo que não causa loop se clicar no próprio input)
    container.querySelector('#triggerLogoUpload').addEventListener('click', (e) => {
        if(e.target.id !== 'establishmentLogoInput') {
            logoInput.click();
        }
    });

    logoInput.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const resizedBase64 = await compressImage(file, 300, 0.9);
            container.querySelector('#establishmentLogoPreview').src = resizedBase64;
            container.querySelector('#mockup-logo').src = resizedBase64;
            logoBase64.value = resizedBase64;
        }
    };

    // Ao clicar na div do Banner
    container.querySelector('#triggerBannerUpload').addEventListener('click', (e) => {
        if(e.target.id !== 'establishmentBgInput') {
            bgImageInput.click();
        }
    });
    
    bgImageInput.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const resizedBase64 = await compressImage(file, 1280, 0.8);
            container.querySelector('#establishmentBgPreview').src = resizedBase64;
            container.querySelector('#establishmentBgPreview').classList.remove('hidden');
            container.querySelector('#establishmentBgPlaceholder').classList.add('hidden');
            bgBase64.value = resizedBase64;

            container.querySelector('#mockup-banner').src = resizedBase64;
            container.querySelector('#mockup-banner').classList.remove('hidden');
            container.querySelector('#mockup-banner-placeholder').classList.add('hidden');
        }
    };

    // SUBMETER DADOS
    container.querySelector('#branding-form').addEventListener('submit', (e) => {
        e.preventDefault();
        let selectedBtnStyle = 'rounded';
        container.querySelectorAll('input[name="buttonStyle"]').forEach(r => { if(r.checked) selectedBtnStyle = r.value; });

        const formData = {
            logo: logoBase64.value,
            backgroundImage: bgBase64.value,
            welcomeMessage: welcomeInput.value,
            templateId: hiddenTemplateId.value,
            primaryColor: primaryInput.value, 
            backgroundColor: bgInput.value,   
            textColor: textInput.value, 
            titleColor: titleColorInput.value,
            typography: typographyInput.value,
            buttonStyle: selectedBtnStyle,
            socialLinks: {
                instagram: instaInput.value.trim(),
                whatsapp: whatsInput.value.trim(),
                facebook: faceInput.value.trim()
            }
        };
        handleSave(formData, e);
    });
}
// ============================================================================


function renderBookingSection(data, container) {
    const linkId = data.urlId || currentEditingId;
    let baseUrl = window.location.origin;
    if (baseUrl.includes('localhost') || baseUrl.includes('capacitor://') || baseUrl.includes('127.0.0.1')) {
        baseUrl = 'https://www.kairosagenda.com.br';
    }
    const bookingLink = escapeHTML(`${baseUrl}/agendar?id=${linkId}`);
    
    const isChecked = data.publicBookingEnabled || false;
    const toggleText = isChecked ? "Agendamento Online ATIVO" : "Agendamento Online INATIVO";
    const statusColor = isChecked ? "text-green-600" : "text-red-600";

    container.innerHTML = `
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-100 space-y-8">
            <div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">Link Público de Agendamento</h3>
                <p class="text-sm text-gray-600 mb-4">Este é o link exclusivo desta unidade para compartilhar com os clientes.</p>
                <div class="flex flex-col sm:flex-row gap-2">
                    <input type="text" id="publicBookingLink" value="${bookingLink}" readonly class="flex-1 p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 outline-none">
                    <button type="button" id="copyBookingLinkBtn" class="py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">Copiar Link</button>
                </div>
            </div>

            <div>
                <h3 class="text-xl font-bold text-gray-800 mb-4">Status do Agendamento Online</h3>
                <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
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
                    <h3 class="text-xl font-bold text-gray-800">Intervalo da Agenda</h3>
                    <button type="submit" form="booking-form" class="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700">Salvar Intervalo</button>
                </div>
                <form id="booking-form" class="space-y-4">
                    <input type="hidden" id="establishmentSlotInterval">
                    <p class="text-sm text-gray-600 mb-2">De quanto em quanto tempo a agenda exibe horários disponíveis?</p>
                    <div id="slotIntervalContainer" class="flex flex-wrap gap-2"></div>
                </form>
            </div>
        </div>
    `;

    container.querySelector('#copyBookingLinkBtn').addEventListener('click', () => {
        const linkInput = container.querySelector('#publicBookingLink');
        linkInput.select(); document.execCommand('copy'); linkInput.blur(); 
        showNotification('Sucesso', 'Link copiado!', 'success');
    });

    container.querySelector('#publicBookingToggle').addEventListener('change', async (e) => {
        const isEnabled = e.target.checked;
        const statusTextEl = container.querySelector('#publicBookingStatusText');
        statusTextEl.textContent = isEnabled ? "Agendamento Online ATIVO" : "Agendamento Online INATIVO";
        statusTextEl.className = isEnabled ? "text-sm font-semibold text-green-600" : "text-sm font-semibold text-red-600";
        try {
            e.target.disabled = true; 
            await establishmentApi.updatePublicBookingStatus(currentEditingId, isEnabled);
            establishmentData.publicBookingEnabled = isEnabled; 
            showNotification('Sucesso', `Agendamento online ${isEnabled ? 'ativado' : 'desativado'}!`, 'success');
        } catch (error) {
            showNotification('Erro', error.message, 'error');
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
         <div class="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-100">
             <div class="flex justify-between items-center mb-6">
                 <h3 class="text-xl font-bold text-gray-800">Horário de Funcionamento</h3>
                 <button type="submit" form="working-hours-form" class="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700">Salvar Horários</button>
             </div>
             
             <form id="working-hours-form">
                 <div class="mb-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <label for="establishmentTimezone" class="block text-sm font-bold text-gray-700 mb-2">Fuso Horário da Unidade</label>
                    <select id="establishmentTimezone" class="block w-full p-2.5 border border-gray-300 rounded-md bg-white focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="America/Sao_Paulo">Horário de Brasília (SP, RJ, MG, Sul, NE, GO, DF)</option>
                        <option value="America/Manaus">Horário do Amazonas (Manaus)</option>
                        <option value="America/Cuiaba">Horário do Mato Grosso / MS</option>
                        <option value="America/Rio_Branco">Horário do Acre</option>
                        <option value="America/Noronha">Fernando de Noronha</option>
                        <option value="Europe/Lisbon">Portugal (Lisboa)</option>
                    </select>
                 </div>

                 <div id="establishmentWorkingHoursContainer" class="grid grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-4"></div>
             </form>
         </div>
    `;
    
    const timezoneSelect = container.querySelector('#establishmentTimezone');
    if (data.timezone) timezoneSelect.value = data.timezone;

    const workingHoursContainer = container.querySelector('#establishmentWorkingHoursContainer');
    const scheduleData = data.workingHours || {};
    
    Object.keys(daysOfWeek).forEach(dayKey => {
        const dayData = scheduleData[dayKey] || {};
        const dayName = daysOfWeek[dayKey];
        const isChecked = dayData.active !== false;
        
        const dayElement = document.createElement('div');
        dayElement.className = `day-schedule-card p-4 rounded-lg border ${isChecked ? 'bg-gray-50 border-gray-200' : 'bg-gray-100 border-gray-100 disabled opacity-60'}`;
        dayElement.innerHTML = `
            <div class="flex justify-between items-center mb-4">
                <span class="font-bold text-gray-800">${dayName}</span>
                <label class="flex items-center cursor-pointer">
                    <div class="relative">
                        <input type="checkbox" id="est-${dayKey}-active" class="sr-only" ${isChecked ? 'checked' : ''}>
                        <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                    </div>
                </label>
            </div>
            <div class="time-inputs grid grid-cols-2 gap-3">
                <div><label class="text-xs text-gray-500">Abertura:</label><input type="time" id="est-${dayKey}-start" value="${dayData.start || '09:00'}" class="w-full rounded-md border-gray-300 p-2 text-sm bg-white"></div>
                <div><label class="text-xs text-gray-500">Fecho:</label><input type="time" id="est-${dayKey}-end" value="${dayData.end || '18:00'}" class="w-full rounded-md border-gray-300 p-2 text-sm bg-white"></div>
                <div><label class="text-xs text-gray-500">Início Pausa:</label><input type="time" id="est-${dayKey}-breakStart" value="${dayData.breakStart || '12:00'}" class="w-full rounded-md border-gray-300 p-2 text-sm bg-white"></div>
                <div><label class="text-xs text-gray-500">Fim Pausa:</label><input type="time" id="est-${dayKey}-breakEnd" value="${dayData.breakEnd || '13:00'}" class="w-full rounded-md border-gray-300 p-2 text-sm bg-white"></div>
            </div>`;
        workingHoursContainer.appendChild(dayElement);
    });
    
    workingHoursContainer.addEventListener('change', e => {
        const toggle = e.target.closest('.day-schedule-card input[type="checkbox"]');
        if (toggle) {
            const card = toggle.closest('.day-schedule-card');
            card.classList.toggle('disabled', !toggle.checked);
            card.classList.toggle('opacity-60', !toggle.checked);
            card.classList.toggle('bg-gray-50', toggle.checked);
            card.classList.toggle('bg-gray-100', !toggle.checked);
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

function renderWhatsAppSection(data, container) {
    const isConnected = !!data.whatsappInstance;

    container.innerHTML = `
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-100">
            <div class="mb-6">
                <h3 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <i class="bi bi-robot text-green-500"></i> Atendente Virtual Inteligente
                </h3>
                <p class="text-sm text-gray-600 mt-2">Conecte o WhatsApp desta unidade para que a nossa Inteligência Artificial atenda os clientes, responda dúvidas e faça os agendamentos de forma automática, 24 horas por dia.</p>
            </div>

            <div class="bg-green-50 p-6 rounded-xl border border-green-200 text-center">
                
                <div id="whatsappStatusArea" class="${isConnected ? 'hidden' : 'block'}">
                    <div class="bg-white inline-block p-4 rounded-full shadow-sm mb-4">
                        <i class="bi bi-qr-code-scan text-4xl text-gray-700"></i>
                    </div>
                    <h4 class="text-lg font-bold text-gray-800 mb-2">Ligar o Bot a esta Unidade</h4>
                    <p class="text-sm text-gray-600 mb-6 max-w-md mx-auto">Clique no botão abaixo para gerar um QR Code. Escaneie-o com o telemóvel do estabelecimento (em Aparelhos Conectados).</p>
                    
                    <button type="button" id="btnGenerateQr" class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2 mx-auto">
                        <i class="bi bi-phone-vibrate"></i> Gerar QR Code
                    </button>
                </div>

                <div id="qrCodeDisplayArea" class="hidden">
                    <h4 class="text-lg font-bold text-indigo-800 mb-4 animate-pulse">Aguardando Conexão...</h4>
                    <div class="bg-white p-4 inline-block rounded-xl shadow-lg border-2 border-green-400">
                        <img id="qrCodeImage" src="" alt="QR Code WhatsApp" class="w-64 h-64 object-contain">
                    </div>
                    <ul class="text-sm text-left text-gray-700 max-w-sm mx-auto mt-6 space-y-2 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <li><span class="font-bold text-green-600">1.</span> Abra o WhatsApp no telemóvel da loja.</li>
                        <li><span class="font-bold text-green-600">2.</span> Vá a <b>Configurações</b> (ou Mais Opções).</li>
                        <li><span class="font-bold text-green-600">3.</span> Toque em <b>Aparelhos Conectados</b>.</li>
                        <li><span class="font-bold text-green-600">4.</span> Aponte a câmera para o quadrado acima.</li>
                    </ul>
                    <button type="button" id="btnCancelQr" class="mt-4 text-red-500 hover:text-red-700 font-semibold text-sm underline">Cancelar</button>
                </div>

                <div id="connectedStatusArea" class="${isConnected ? 'block' : 'hidden'} mt-4">
                    <div class="bg-white inline-block p-4 rounded-full shadow-sm mb-4 border-4 border-green-500">
                        <i class="bi bi-check-circle-fill text-4xl text-green-500"></i>
                    </div>
                    <h4 class="text-xl font-bold text-green-700 mb-2">WhatsApp Conectado!</h4>
                    <p class="text-sm text-gray-600 max-w-md mx-auto mb-6">O bot da Inteligência Artificial já está ativo no número desta unidade.</p>
                    
                    <div class="flex justify-center gap-4">
                        <button type="button" id="btnDisconnectWhatsapp" class="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2">
                            <i class="bi bi-power"></i> Desconectar
                        </button>
                    </div>
                </div>

            </div>
        </div>
    `;

    let pollingInterval = null; 

    const btnGenerate = container.querySelector('#btnGenerateQr');
    const btnCancel = container.querySelector('#btnCancelQr');

    if (btnGenerate) {
        btnGenerate.addEventListener('click', async () => {
            btnGenerate.disabled = true;
            btnGenerate.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Gerando...';

            const LOCAL_API_URL = "https://us-central1-kairos-agenda-us.cloudfunctions.net/whatsapp/api/whatsapp";

            try {
                const response = await fetch(`${LOCAL_API_URL}/connect`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ establishmentId: currentEditingId })
                });

                const apiData = await response.json();

                if (apiData.qrcode) {
                    container.querySelector('#whatsappStatusArea').classList.add('hidden');
                    container.querySelector('#qrCodeDisplayArea').classList.remove('hidden');
                    
                    const qrSrc = apiData.qrcode.includes('data:image') ? apiData.qrcode : `data:image/png;base64,${apiData.qrcode}`;
                    container.querySelector('#qrCodeImage').src = qrSrc;

                    pollingInterval = setInterval(async () => {
                        try {
                            const statusRes = await fetch(`${LOCAL_API_URL}/status/${currentEditingId}`);
                            const statusData = await statusRes.json();
                            
                            if (statusData.connected) {
                                clearInterval(pollingInterval); 
                                establishmentData.whatsappInstance = statusData.instanceName; 
                                
                                container.querySelector('#qrCodeDisplayArea').classList.add('hidden');
                                container.querySelector('#connectedStatusArea').classList.remove('hidden');
                                showNotification('Sucesso', 'WhatsApp conectado com sucesso!', 'success');
                            }
                        } catch (err) {
                            console.error("Erro ao verificar status do WhatsApp", err);
                        }
                    }, 5000); 

                } else {
                    showNotification('Erro na API', apiData.error || "Erro desconhecido", 'error');
                }
            } catch (error) {
                console.error(error);
                showNotification('Erro de Conexão', 'Não foi possível aceder ao servidor Kairós.', 'error');
            } finally {
                btnGenerate.disabled = false;
                btnGenerate.innerHTML = '<i class="bi bi-phone-vibrate"></i> Gerar QR Code';
            }
        });
    }

    if (btnCancel) {
        btnCancel.addEventListener('click', () => {
            if (pollingInterval) clearInterval(pollingInterval);
            container.querySelector('#qrCodeDisplayArea').classList.add('hidden');
            container.querySelector('#whatsappStatusArea').classList.remove('hidden');
        });
    }

    const btnDisconnect = container.querySelector('#btnDisconnectWhatsapp');
    if (btnDisconnect) {
        btnDisconnect.addEventListener('click', async () => {
            if (!confirm("Tem certeza que deseja DESCONECTAR? O bot parará de responder imediatamente.")) return;

            btnDisconnect.disabled = true;
            btnDisconnect.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Desconectando...';

            const LOCAL_API_URL = "https://us-central1-kairos-agenda-us.cloudfunctions.net/whatsapp/api/whatsapp";

            try {
                const response = await fetch(`${LOCAL_API_URL}/disconnect`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ establishmentId: currentEditingId })
                });

                const result = await response.json();
                if (result.success) {
                    showNotification('Sucesso', 'WhatsApp desconectado!', 'success');
                    establishmentData.whatsappInstance = null;
                    renderWhatsAppSection(establishmentData, container);
                } else {
                    alert("Erro ao desconectar: " + result.error);
                }
            } catch (error) {
                console.error(error);
                showNotification('Erro', 'Falha ao comunicar com o servidor.', 'error');
            } finally {
                if (btnDisconnect) {
                    btnDisconnect.disabled = false;
                    btnDisconnect.innerHTML = '<i class="bi bi-power"></i> Desconectar';
                }
            }
        });
    }
}

async function renderLoyaltySection(data, container) {
    const loyaltyProgram = data.loyaltyProgram || {};
    const currentPointsPerVisit = loyaltyProgram.pointsPerVisit || 1;

    let services = [], products = [], packages = [];
    try {
        [services, products, packages] = await Promise.all([
             servicesApi.getServices(currentEditingId),
             productsApi.getProducts(currentEditingId),
             packagesApi.getPackages(currentEditingId)
        ]);
    } catch (error) {
        console.error("Erro ao carregar dados para fidelidade:", error);
    }

    container.innerHTML = `
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-100">
             <div class="flex justify-between items-center mb-6">
                 <h3 class="text-xl font-bold text-gray-800">Plano de Fidelidade</h3>
                 <button type="submit" form="loyalty-form" class="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700">Salvar Fidelidade</button>
             </div>
             <form id="loyalty-form" class="space-y-6">
                 
                 <div class="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                     <label for="loyaltyEnabled" class="flex items-center cursor-pointer w-full">
                         <div class="relative"><input type="checkbox" id="loyaltyEnabled" class="sr-only" ${loyaltyProgram.enabled ? 'checked' : ''}><div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div></div>
                         <span class="ml-3 font-bold text-gray-700">Habilitar Programa de Fidelidade na Unidade</span>
                     </label>
                 </div>

                 <div id="loyalty-config-visit" class="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                     <label class="block text-sm font-bold text-indigo-900">Regra de Pontuação</label>
                     <p class="text-xs text-indigo-700 mb-3">Quantos pontos o cliente ganha a cada agendamento/venda?</p>
                     <div class="flex items-center gap-3">
                         <span class="text-gray-700 font-medium">Ganhar</span>
                         <input type="number" id="loyaltyPointsPerVisit" value="${currentPointsPerVisit}" min="1" step="1" class="w-24 p-2 border border-indigo-300 rounded-md focus:ring-indigo-500 text-center font-bold text-lg bg-white">
                         <span class="text-gray-700 font-medium">pontos por visita</span>
                     </div>
                 </div>

                 <div class="pt-6 border-t border-gray-200">
                     <label class="block text-lg font-bold text-gray-800 mb-2">Recompensas e Resgates</label>
                     <p class="text-sm text-gray-500 mb-4">Defina os prémios que os seus clientes podem trocar pelos pontos.</p>
                     
                     <div id="loyaltyTiersContainer" class="space-y-4 bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300"></div>
                     
                     <button type="button" id="add-loyalty-tier" class="mt-4 flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 py-2 px-4 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors bg-white">
                        <i class="bi bi-plus-circle"></i> Adicionar Novo Prémio
                     </button>
                 </div>
             </form>
        </div>
    `;

    const tiersContainer = container.querySelector('#loyaltyTiersContainer');
    
    const createTierRow = (tier = {}) => {
        const row = document.createElement('div');
        row.className = 'loyalty-tier-row bg-white p-4 border border-gray-200 rounded-lg shadow-sm relative grid grid-cols-1 md:grid-cols-4 gap-4 items-end'; 

        const currentType = tier.type || 'money';
        const currentItemId = tier.itemId || '';
        const currentRewardName = tier.reward || '';
        const currentDiscount = tier.discount || '';
        const currentPoints = tier.points || tier.costPoints || '';

        row.innerHTML = `
            <div>
                <label class="text-xs font-bold text-gray-500 mb-1 block">Custo (Pontos)</label>
                <div class="relative">
                    <input type="number" placeholder="Ex: 100" data-field="points" value="${currentPoints}" class="w-full p-2 border border-gray-300 rounded-md font-bold text-gray-800">
                </div>
            </div>

            <div>
                <label class="text-xs font-bold text-gray-500 mb-1 block">Tipo de Recompensa</label>
                <select data-field="type" class="type-select w-full p-2 border border-gray-300 rounded-md bg-white text-sm">
                    <option value="money" ${currentType === 'money' ? 'selected' : ''}>Desconto (€/R$)</option>
                    <option value="service" ${currentType === 'service' ? 'selected' : ''}>Serviço Grátis</option>
                    <option value="product" ${currentType === 'product' ? 'selected' : ''}>Produto Grátis</option>
                    <option value="package" ${currentType === 'package' ? 'selected' : ''}>Pacote Grátis</option>
                </select>
            </div>

            <div class="relative md:col-span-2">
                <label class="text-xs font-bold text-gray-500 mb-1 block">O que o cliente ganha?</label>
                
                <div class="flex gap-2">
                    <input type="text" placeholder="Ex: R$ 20 de Desconto" data-field="rewardName" value="${escapeHTML(currentRewardName)}" class="desc-input flex-1 p-2 border border-gray-300 rounded-md ${currentType !== 'money' ? 'hidden' : ''}">
                    
                    <select data-field="itemId" class="item-select flex-1 p-2 border border-gray-300 rounded-md bg-white text-sm ${currentType === 'money' ? 'hidden' : ''}">
                        <option value="">Selecione o item na lista...</option>
                    </select>

                    <div class="w-24 relative">
                        <span class="absolute left-2 top-2 text-gray-500 text-sm">$</span>
                        <input type="number" placeholder="Valor" data-field="discount" value="${currentDiscount}" step="0.01" class="discount-input w-full p-2 pl-7 border border-gray-300 rounded-md" title="Valor do desconto">
                    </div>
                </div>
            </div>

            <button type="button" class="remove-loyalty-tier absolute -top-3 -right-3 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white p-1.5 rounded-full shadow-md transition-colors" title="Remover Prémio">
                <i class="bi bi-x-lg text-sm"></i>
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
    
    if (loyaltyProgram.tiers && loyaltyProgram.tiers.length > 0) {
        loyaltyProgram.tiers.forEach(tier => tiersContainer.appendChild(createTierRow(tier)));
    } else {
        tiersContainer.appendChild(createTierRow());
    }
    
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
            
            let rewardName = type === 'money' ? row.querySelector('.desc-input').value : row.querySelector('.item-select').options[row.querySelector('.item-select').selectedIndex]?.text;

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
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-100">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-gray-800">Integração Financeira Automática</h3>
                <button type="submit" form="financial-form" class="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700">Salvar Contas</button>
            </div>
            <form id="financial-form" class="space-y-6">
                
                <div class="bg-green-50 p-5 rounded-xl border border-green-100">
                    <h4 class="text-lg font-bold text-green-800 mb-1 flex items-center gap-2">
                        <i class="bi bi-graph-up-arrow"></i> Vendas da Unidade (Contas a Receber)
                    </h4>
                    <p class="text-sm text-green-700 mb-4">Como as vendas do PDV desta unidade devem entrar no financeiro?</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="financialNatureId" class="block text-sm font-bold text-gray-700">Natureza/Categoria Padrão</label>
                            <select id="financialNatureId" class="mt-1 block w-full p-2.5 border border-gray-300 rounded-md bg-white"></select>
                        </div>
                        <div>
                            <label for="financialCostCenterId" class="block text-sm font-bold text-gray-700">Centro de Custo</label>
                            <select id="financialCostCenterId" class="mt-1 block w-full p-2.5 border border-gray-300 rounded-md bg-white"></select>
                        </div>
                    </div>
                </div>

                <div class="bg-blue-50 p-5 rounded-xl border border-blue-100">
                    <h4 class="text-lg font-bold text-blue-800 mb-1 flex items-center gap-2">
                        <i class="bi bi-box-seam"></i> Compras de Stock (Contas a Pagar)
                    </h4>
                    <p class="text-sm text-blue-700 mb-4">Como os pedidos de fornecedores são classificados?</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="purchaseNatureId" class="block text-sm font-bold text-gray-700">Natureza/Categoria Padrão</label>
                            <select id="purchaseNatureId" class="mt-1 block w-full p-2.5 border border-gray-300 rounded-md bg-white"></select>
                        </div>
                        <div>
                            <label for="purchaseCostCenterId" class="block text-sm font-bold text-gray-700">Centro de Custo</label>
                            <select id="purchaseCostCenterId" class="mt-1 block w-full p-2.5 border border-gray-300 rounded-md bg-white"></select>
                        </div>
                    </div>
                </div>

                <div class="bg-red-50 p-5 rounded-xl border border-red-100">
                    <h4 class="text-lg font-bold text-red-800 mb-1 flex items-center gap-2">
                        <i class="bi bi-person-lines-fill"></i> Comissões Profissionais (Contas a Pagar)
                    </h4>
                    <p class="text-sm text-red-700 mb-4">Quando pagar a um profissional desta unidade, classificar como:</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="commissionNatureId" class="block text-sm font-bold text-gray-700">Natureza/Categoria Padrão</label>
                            <select id="commissionNatureId" class="mt-1 block w-full p-2.5 border border-gray-300 rounded-md bg-white"></select>
                        </div>
                        <div>
                            <label for="commissionCostCenterId" class="block text-sm font-bold text-gray-700">Centro de Custo</label>
                            <select id="commissionCostCenterId" class="mt-1 block w-full p-2.5 border border-gray-300 rounded-md bg-white"></select>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    `;

    try {
        const [natures, costCenters] = await Promise.all([
            financialApi.getNatures(currentEditingId),
            financialApi.getCostCenters(currentEditingId)
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
        showNotification('Erro', 'Não foi possível carregar o plano de contas da unidade.', 'error');
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
    const whatsappLink = `https://wa.me/5516997859430?text=Olá, preciso de ajuda com o sistema Kairos (Minha Unidade: ${data.name}).`;

    container.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
            <div class="mb-6">
                <h3 class="text-2xl font-bold text-gray-800">Precisa de Ajuda?</h3>
                <p class="text-gray-600 mt-2">Estamos aqui para garantir que tenha a melhor experiência possível.</p>
            </div>
            <div class="bg-green-50 border border-green-100 rounded-xl p-8 inline-block max-w-lg mx-auto w-full">
                <i class="bi bi-whatsapp text-6xl text-green-500 mb-4 inline-block"></i>
                <h4 class="text-xl font-bold text-gray-800 mb-6">Falar com Suporte</h4>
                <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg inline-flex items-center gap-2">
                    <i class="bi bi-chat-dots"></i> Iniciar Atendimento
                </a>
            </div>
        </div>
    `;
}

function renderCancellationSection(data, container) {
    const whatsappLink = `https://wa.me/5516997859430?text=Gostaria de solicitar o cancelamento da assinatura. (Unidade: ${data.name})`;

    container.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-md border border-red-100">
            <h3 class="text-xl font-bold text-red-600 mb-4">Cancelamento de Assinatura</h3>
            <p class="text-gray-700 mb-6">Lamentamos ver-te partir. Para solicitar o cancelamento e exclusão dos dados desta unidade, por favor entre em contacto com a nossa equipa financeira.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="border border-gray-200 rounded-lg p-6 bg-gray-50 flex flex-col items-center text-center">
                    <i class="bi bi-envelope-paper text-3xl text-gray-400 mb-3"></i>
                    <h4 class="font-bold text-gray-800 mb-2">Via E-mail</h4>
                    <a href="mailto:sistemakairosagenda@gmail.com" class="text-indigo-600 font-semibold hover:underline">sistemakairosagenda@gmail.com</a>
                </div>
                <div class="border border-green-200 rounded-lg p-6 bg-green-50 flex flex-col items-center text-center">
                    <i class="bi bi-whatsapp text-3xl text-green-500 mb-3"></i>
                    <h4 class="font-bold text-gray-800 mb-4">Via WhatsApp</h4>
                    <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition-colors text-sm">Solicitar Cancelamento</a>
                </div>
            </div>
        </div>
    `;
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
                       class="interval-btn py-2 px-4 rounded-full text-sm font-semibold transition-colors shadow-sm
                           ${isSelected ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}">
                       ${interval.label}
                   </button>`;
    }).join('');
    intervalInput.value = currentValue;

    slotContainer.querySelectorAll('.interval-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            intervalInput.value = btn.dataset.value;
            slotContainer.querySelectorAll('.interval-btn').forEach(b => {
                b.classList.remove('bg-indigo-600', 'text-white');
                b.classList.add('bg-white', 'border', 'border-gray-300', 'text-gray-700');
            });
            btn.classList.add('bg-indigo-600', 'text-white');
            btn.classList.remove('bg-white', 'border', 'border-gray-300', 'text-gray-700');
        });
    });
}

// --- FUNÇÃO DE NAVEGAÇÃO INTERNA (TABS DAS DEFINIÇÕES) ---

async function showSettingsDetailView(sectionId) {
    const dynamicMenuItems = getMenuItems();
    const menuItem = dynamicMenuItems.find(item => item.id === sectionId);
    
    if (!menuItem) return;

    // Cabeçalho modificado: Sem fundo branco, sem sticky, design limpo
    contentDiv.innerHTML = `
        <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-gray-200 border-opacity-50">
            <div class="flex items-center gap-3">
                <button data-action="back-to-menu" class="p-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors text-gray-700 shadow-sm flex items-center gap-2 text-sm font-semibold">
                    <i class="bi bi-arrow-left"></i> Voltar
                </button>
                <h2 class="text-2xl font-bold text-gray-800">${menuItem.label}</h2>
            </div>
            <div class="text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
                ${escapeHTML(establishmentData?.name || '')}
            </div>
        </div>
        
        <div id="settings-content-detail" class="pb-20 max-w-6xl mx-auto w-full">
            <div class="flex justify-center items-center py-10"><div class="spinner-border text-indigo-600" role="status"></div></div>
        </div>
    `;

    contentDiv.querySelector('button[data-action="back-to-menu"]').addEventListener('click', (e) => {
        e.preventDefault();
        loadEstablishmentPage({ id: currentEditingId }); 
    });

    const detailContainer = document.getElementById('settings-content-detail');

    switch (sectionId) {
        case 'personal-data': renderPersonalDataSection(establishmentData, detailContainer); break;
        case 'change-password': renderChangePasswordSection(establishmentData, detailContainer); break;
        case 'change-email': renderChangeEmailSection(establishmentData, detailContainer); break; 
        case 'branding': renderBrandingSection(establishmentData, detailContainer); break;
        case 'booking': renderBookingSection(establishmentData, detailContainer); break;
        case 'working-hours': renderWorkingHoursSection(establishmentData, detailContainer); break;
        case 'whatsapp-bot': renderWhatsAppSection(establishmentData, detailContainer); break;
        case 'loyalty': await renderLoyaltySection(establishmentData, detailContainer); break; 
        case 'financial': await renderFinancialIntegrationSection(establishmentData, detailContainer); break;
        case 'support': renderSupportSection(establishmentData, detailContainer); break;
        case 'cancellation': renderCancellationSection(establishmentData, detailContainer); break;
        default: detailContainer.innerHTML = `<div class="p-4 text-center">Módulo em construção.</div>`;
    }
}

// --- FUNÇÃO DE ENTRADA PRINCIPAL ---

export async function loadEstablishmentPage(params = {}) {
    contentDiv.innerHTML = `
        <div class="flex flex-col justify-center items-center h-64">
            <div class="spinner-border text-indigo-600 border-4 w-12 h-12 mb-4" role="status"></div>
            <p class="text-gray-500 font-medium">A carregar configurações da unidade...</p>
        </div>
    `;

    try {
        currentEditingId = params.id || state.establishmentId;
        
        establishmentData = await establishmentApi.getEstablishmentDetails(currentEditingId);
        
        const backToNetworkBtn = params.id 
            ? `<button onclick="window.navigateTo('establishments-section')" class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center gap-2">
                   <i class="bi bi-diagram-3"></i> Voltar à Rede
               </button>` 
            : '';

        const badge = (establishmentData.isMatriz || !establishmentData.parentId) 
            ? `<span class="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded ml-3">🏢 MATRIZ</span>`
            : `<span class="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded ml-3">📍 UNIDADE</span>`;

        const currentMenuItems = getMenuItems();

        contentDiv.innerHTML = `
            <div class="max-w-5xl mx-auto w-full pb-20">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-800 flex items-center">
                            Configurações da Loja
                        </h2>
                        <p class="text-gray-500 text-sm mt-1">Gira os módulos, dados base e horários desta unidade individualmente.</p>
                    </div>
                    ${backToNetworkBtn}
                </div>

                <div class="bg-gradient-to-r from-indigo-900 to-indigo-700 rounded-xl shadow-lg p-6 mb-8 text-white flex justify-between items-center relative overflow-hidden">
                    <div class="relative z-10">
                        <h3 class="text-2xl font-bold mb-1">${escapeHTML(establishmentData.name)} ${badge}</h3>
                        <p class="text-indigo-200 text-sm flex items-center gap-2"><i class="bi bi-geo-alt"></i> ${escapeHTML(establishmentData.address || 'Morada não definida')}</p>
                    </div>
                    <div class="relative z-10 hidden sm:block">
                        <div class="w-16 h-16 bg-white rounded-xl shadow-md p-1 flex items-center justify-center">
                            ${establishmentData.logo ? `<img src="${establishmentData.logo}" class="w-full h-full object-contain rounded-lg">` : `<span class="text-2xl text-indigo-600 font-bold">${establishmentData.name.charAt(0).toUpperCase()}</span>`}
                        </div>
                    </div>
                    <div class="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${currentMenuItems.map(item => `
                        <div data-section="${item.id}" class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-300 cursor-pointer transition-all flex items-center gap-4 group">
                            <div class="w-12 h-12 bg-gray-50 group-hover:bg-indigo-50 text-gray-400 group-hover:text-indigo-600 rounded-lg flex items-center justify-center transition-colors">
                                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${item.icon}"></path></svg>
                            </div>
                            <div class="flex-1">
                                <h4 class="font-bold text-gray-800 group-hover:text-indigo-700 transition-colors text-sm">${item.label}</h4>
                            </div>
                            <i class="bi bi-chevron-right text-gray-300 group-hover:text-indigo-400 transition-colors"></i>
                        </div>
                    `).join('')}
                </div>
                
                <div class="mt-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 class="text-lg font-bold text-gray-800 mb-4">Módulos Ativos Nesta Unidade</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4" id="modules-container">
                        ${renderModuleToggles(establishmentData.modules || {})}
                    </div>
                </div>
            </div>
        `;

        contentDiv.querySelectorAll('div[data-section]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                showSettingsDetailView(btn.dataset.section);
            });
        });

        contentDiv.querySelectorAll('.module-toggle').forEach(sw => {
            sw.addEventListener('change', async () => {
                const moduleKey = sw.dataset.module;
                try {
                    const current = await establishmentApi.getEstablishmentDetails(currentEditingId);
                    const updatedModules = { ...current.modules, [moduleKey]: sw.checked };
                    await establishmentApi.updateEstablishmentDetails(currentEditingId, { modules: updatedModules });
                    showNotification('Módulos', 'Módulos atualizados com sucesso.', 'success');
                } catch (err) {
                    sw.checked = !sw.checked;
                    showNotification('Erro', err.message, 'error');
                }
            });
        });

    } catch (error) {
        contentDiv.innerHTML = `
            <div class="p-8 text-center max-w-md mx-auto">
                <i class="bi bi-exclamation-triangle text-4xl text-red-500 mb-4 block"></i>
                <h2 class="text-xl font-bold text-gray-800 mb-2">Erro ao carregar loja</h2>
                <p class="text-gray-600">${error.message}</p>
                <button onclick="window.navigateTo('establishments-section')" class="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700">Voltar à Rede</button>
            </div>
        `;
    }
}

function renderModuleToggles(modules) {
    const list = [
        { key: 'agenda-section', label: 'Agenda Diária', icon: 'bi-calendar' },
        { key: 'comandas-section', label: 'Comandas e PDV', icon: 'bi-receipt' },
        { key: 'financial-section', label: 'Financeiro Completo', icon: 'bi-cash-coin' },
        { key: 'reports-section', label: 'Relatórios Gerenciais', icon: 'bi-graph-up' }
    ];

    return list.map(m => `
        <div class="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <i class="bi ${m.icon}"></i>
                </div>
                <span class="text-sm font-bold text-gray-700">${m.label}</span>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input module-toggle cursor-pointer" type="checkbox" data-module="${m.key}" ${modules[m.key] ? 'checked' : ''}>
            </div>
        </div>
    `).join('');
}