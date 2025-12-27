// js/ui/onboarding.js (Tamanho Reduzido e Compacto)

import * as establishmentApi from '../api/establishments.js';
import * as professionalsApi from '../api/professionals.js';
import * as servicesApi from '../api/services.js';
import * as productsApi from '../api/products.js';
import { state } from '../state.js';
import { showNotification } from '../components/modal.js';

// --- CONFIGURAÇÕES DE TEMA ---
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

// --- FUNÇÃO AUXILIAR DE COMPRESSÃO ---
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

// Elemento principal que cobrirá a tela
let onboardingOverlay = null;

// Definição das Missões
const missions = [
    { id: 'company_data', title: 'Identidade do Negócio', icon: '🏢', description: 'Configure os dados da sua empresa.' },
    { id: 'branding', title: 'Sua Marca', icon: '🎨', description: 'Logo e cores (Opcional).' },
    { id: 'time_config', title: 'O Relógio', icon: '⏱️', description: 'Tempo padrão entre agendamentos.' },
    { id: 'first_service', title: 'O Menu', icon: '✂️', description: 'Seu principal serviço.' },
    { id: 'first_prof', title: 'Sua Equipe', icon: '💇', description: 'Cadastre o primeiro profissional.' },
    { id: 'first_product', title: 'O Estoque', icon: '🧴', description: 'Cadastre um produto (opcional).' }
];

let currentStepIndex = 0;
let cachedServices = [];

export async function checkAndStartOnboarding() {
    try {
        console.log("Iniciando verificação de Onboarding para ID:", state.establishmentId);

        const estData = await establishmentApi.getEstablishmentDetails(state.establishmentId);
        const profs = await professionalsApi.getProfessionals(state.establishmentId);
        const services = await servicesApi.getServices(state.establishmentId);
        
        cachedServices = services || [];

        // Validações
        const hasCompanyData = estData && estData.name && (estData.phone || estData.address);
        const hasBranding = estData && (estData.logo || (estData.themeColor && estData.themeColor !== 'indigo'));
        const hasTimeConfig = estData && estData.slotInterval > 0;
        const hasService = services && services.length > 0;
        const hasProf = profs && profs.length > 0;

        console.log("Status Onboarding:", { hasCompanyData, hasBranding, hasTimeConfig, hasService, hasProf });

        if (hasCompanyData && hasTimeConfig && hasProf && hasService) {
            return; 
        }

        if (!hasCompanyData) currentStepIndex = 0;
        else if (!hasBranding && !hasTimeConfig) currentStepIndex = 1;
        else if (!hasTimeConfig) currentStepIndex = 2;
        else if (!hasService) currentStepIndex = 3;
        else if (!hasProf) currentStepIndex = 4;
        else if (currentStepIndex === 0) {
            return;
        }

        renderOnboardingOverlay();
        renderStep(currentStepIndex);

    } catch (error) {
        console.error("Erro ao verificar onboarding:", error);
    }
}

function renderOnboardingOverlay() {
    if (document.getElementById('onboarding-overlay')) return;

    onboardingOverlay = document.createElement('div');
    onboardingOverlay.id = 'onboarding-overlay';
    
    onboardingOverlay.className = 'fixed inset-0 bg-gray-900 bg-opacity-95 z-[9999] flex items-center justify-center p-4 overflow-y-auto';
    onboardingOverlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(17, 24, 39, 0.95); z-index: 9999; display: flex; align-items: center; justify-content: center;';

    // --- AJUSTE DE TAMANHO AQUI (max-width: 35rem) ---
    onboardingOverlay.innerHTML = `
        <div class="bg-white rounded-xl shadow-2xl w-full overflow-hidden relative animate-fade-in-up" style="background-color: white; border-radius: 0.75rem; max-width: 35rem; width: 95%;">
            <div class="bg-indigo-600 p-4 text-white text-center" style="background-color: #4f46e5; padding: 1.25rem; color: white;">
                <h2 class="text-2xl font-bold mb-1">🚀 Vamos Decolar!</h2>
                <p class="text-indigo-100 text-sm">Complete as missões para configurar seu ambiente.</p>
                
                <div class="mt-4 relative pt-1">
                    <div class="flex mb-1 items-center justify-between">
                        <div class="text-right">
                            <span class="text-[10px] font-semibold inline-block py-0.5 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                                Progresso
                            </span>
                        </div>
                        <div class="text-right">
                            <span id="progress-text" class="text-xs font-semibold inline-block text-white">
                                0%
                            </span>
                        </div>
                    </div>
                    <div class="overflow-hidden h-1.5 mb-2 text-xs flex rounded bg-indigo-200" style="background-color: #c7d2fe; height: 0.375rem; border-radius: 0.25rem;">
                        <div id="progress-bar" style="width:0%; background-color: #4ade80;" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500"></div>
                    </div>
                </div>
            </div>

            <div id="onboarding-step-content" class="p-5">
                </div>
        </div>
    `;
    
    document.body.appendChild(onboardingOverlay);
    updateProgress();
}

function updateProgress() {
    const percentage = Math.round((currentStepIndex / missions.length) * 100);
    const bar = document.getElementById('progress-bar');
    const text = document.getElementById('progress-text');
    if (bar) bar.style.width = `${percentage}%`;
    if (text) text.innerText = `${percentage}%`;
}

function renderStep(index) {
    const container = document.getElementById('onboarding-step-content');
    const mission = missions[index];
    
    if (!mission) {
        finishOnboarding(container);
        return;
    }

    let formHTML = '';

    // --- FORMULÁRIO 1: DADOS ---
    if (mission.id === 'company_data') {
        formHTML = `
            <form id="step-form" class="space-y-3">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase">Nome do Estabelecimento</label>
                        <input type="text" name="name" class="mt-1 w-full p-2 border rounded text-sm" required placeholder="Ex: Barbearia do João">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase">Seu Nome</label>
                        <input type="text" name="ownerName" class="mt-1 w-full p-2 border rounded text-sm" required value="${state.userName || ''}">
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase">WhatsApp</label>
                        <input type="tel" name="phone" class="mt-1 w-full p-2 border rounded text-sm" required placeholder="(00) 00000-0000">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase">E-mail</label>
                        <input type="email" name="email" class="mt-1 w-full p-2 border rounded text-sm" required value="${state.userEmail || ''}">
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase">Endereço</label>
                    <input type="text" name="address" class="mt-1 w-full p-2 border rounded text-sm" required placeholder="Rua, Número, Bairro">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase">CEP</label>
                    <input type="text" name="zipCode" class="mt-1 w-full p-2 border rounded text-sm" required placeholder="00000-000">
                </div>
            </form>
        `;
    }
    // --- FORMULÁRIO 2: BRANDING ---
    else if (mission.id === 'branding') {
        const themeOptions = Object.entries(colorThemes).map(([key, theme]) => 
            `<option value="${key}">${theme.name}</option>`
        ).join('');

        formHTML = `
            <form id="step-form" class="space-y-4">
                <p class="text-gray-600 text-xs">Personalize a aparência do seu sistema (Opcional).</p>
                
                <div class="flex items-center gap-3">
                    <div class="shrink-0">
                        <div id="logo-preview" class="h-14 w-14 rounded bg-gray-100 border flex items-center justify-center text-[10px] text-gray-400">Logo</div>
                    </div>
                    <div class="w-full">
                        <label class="block text-xs font-bold text-gray-700 uppercase">Logotipo</label>
                        <input type="file" id="logo-input" accept="image/*" class="mt-1 block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100">
                        <input type="hidden" name="logoBase64" id="logo-base64">
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase">Tema do Painel</label>
                        <select name="themeColor" class="mt-1 w-full p-2 border rounded text-sm bg-white">
                            ${themeOptions}
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase">Cor do Link</label>
                        <div class="flex items-center gap-2 mt-1">
                            <input type="color" name="primaryColor" value="#4f46e5" class="h-8 w-12 p-0.5 border rounded cursor-pointer">
                        </div>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase">Imagem de Fundo</label>
                    <input type="file" id="bg-input" accept="image/*" class="mt-1 block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100">
                    <input type="hidden" name="bgBase64" id="bg-base64">
                </div>
            </form>
        `;
    }
    // --- FORMULÁRIO 3: TEMPO ---
    else if (mission.id === 'time_config') {
        formHTML = `
            <form id="step-form" class="space-y-4">
                <p class="text-gray-600 text-sm">Selecione o intervalo padrão da agenda.</p>
                
                <div class="grid grid-cols-3 gap-2">
                    ${[10, 15, 20, 30, 45, 60].map(time => `
                        <label class="cursor-pointer">
                            <input type="radio" name="slotInterval" value="${time}" class="peer sr-only" ${time === 30 ? 'checked' : ''}>
                            <div class="text-center py-2 px-1 border rounded hover:bg-indigo-50 peer-checked:bg-indigo-600 peer-checked:text-white peer-checked:border-indigo-600 transition-all font-bold text-sm text-gray-700">
                                ${time} min${time === 60 ? '' : ''}
                            </div>
                        </label>
                    `).join('')}
                </div>
            </form>
        `;
    }
    // --- FORMULÁRIO 4: SERVIÇO ---
    else if (mission.id === 'first_service') {
        formHTML = `
            <form id="step-form" class="space-y-3">
                <p class="text-gray-600 text-sm">Qual serviço você mais vende?</p>
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase">Nome do Serviço</label>
                    <input type="text" name="name" class="mt-1 w-full p-2 border rounded text-sm" required placeholder="Ex: Corte Masculino">
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase">Preço (R$)</label>
                        <input type="number" name="price" step="0.01" class="mt-1 w-full p-2 border rounded text-sm" required placeholder="0,00">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase">Duração (min)</label>
                        <input type="number" name="duration" class="mt-1 w-full p-2 border rounded text-sm" required value="30">
                    </div>
                </div>
            </form>
        `;
    }
    // --- FORMULÁRIO 5: PROFISSIONAL ---
    else if (mission.id === 'first_prof') {
        const serviceOptions = cachedServices.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
        const hasServices = cachedServices.length > 0;

        formHTML = `
            <form id="step-form" class="space-y-3">
                <p class="text-gray-600 text-sm">Quem realiza os serviços? (Pode ser você!)</p>
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase">Nome</label>
                    <input type="text" name="name" class="mt-1 w-full p-2 border rounded text-sm" required value="${state.userName || ''}">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase">Especialidade</label>
                    <input type="text" name="role" class="mt-1 w-full p-2 border rounded text-sm" placeholder="Ex: Cabeleireiro">
                </div>
                ${hasServices ? `
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase">Serviço Principal</label>
                    <select name="serviceId" class="mt-1 w-full p-2 border rounded text-sm bg-white">
                        ${serviceOptions}
                    </select>
                </div>
                ` : ''}
            </form>
        `;
    }
    // --- FORMULÁRIO 6: PRODUTO ---
    else if (mission.id === 'first_product') {
        formHTML = `
            <form id="step-form" class="space-y-3">
                <p class="text-gray-600 text-sm">Cadastre um produto para venda.</p>
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase">Nome do Produto</label>
                    <input type="text" name="name" class="mt-1 w-full p-2 border rounded text-sm" required placeholder="Ex: Gel Fixador">
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase">Venda (R$)</label>
                        <input type="number" name="salePrice" step="0.01" class="mt-1 w-full p-2 border rounded text-sm" required placeholder="0,00">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase">Estoque</label>
                        <input type="number" name="stock" class="mt-1 w-full p-2 border rounded text-sm" required value="10">
                    </div>
                </div>
            </form>
        `;
    }

    container.innerHTML = `
        <div class="flex items-center mb-4">
            <span class="text-3xl mr-3">${mission.icon}</span>
            <div>
                <h3 class="text-lg font-bold text-gray-800">${mission.title}</h3>
                <p class="text-gray-500 text-xs">${mission.description}</p>
            </div>
        </div>
        
        ${formHTML}

        <div class="mt-6 flex justify-end gap-2">
            ${(mission.id === 'first_product' || mission.id === 'branding') ? '<button type="button" id="skip-btn" class="text-gray-500 hover:text-gray-700 font-medium text-sm px-3 py-2">Pular</button>' : ''}
            <button type="button" id="next-step-btn" class="bg-indigo-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 text-sm">
                ${index === missions.length - 1 ? 'Concluir' : 'Próximo'}
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </button>
        </div>
    `;

    // Listeners
    document.getElementById('next-step-btn').addEventListener('click', () => handleStepSubmit(mission.id));
    
    if (document.getElementById('skip-btn')) {
        document.getElementById('skip-btn').addEventListener('click', () => {
            if (index === missions.length - 1) {
                finishOnboarding(container);
            } else {
                currentStepIndex++;
                updateProgress();
                renderStep(currentStepIndex);
            }
        });
    }

    // Handlers de Imagem (Branding)
    if (mission.id === 'branding') {
        const logoInput = document.getElementById('logo-input');
        const bgInput = document.getElementById('bg-input');

        if (logoInput) {
            logoInput.onchange = async (e) => {
                const file = e.target.files[0];
                if (file) {
                    try {
                        const base64 = await compressImage(file, 200, 0.8);
                        document.getElementById('logo-base64').value = base64;
                        document.getElementById('logo-preview').innerHTML = `<img src="${base64}" class="w-full h-full object-contain rounded">`;
                    } catch (err) { console.error("Erro logo", err); }
                }
            };
        }

        if (bgInput) {
            bgInput.onchange = async (e) => {
                const file = e.target.files[0];
                if (file) {
                    try {
                        const base64 = await compressImage(file, 1024, 0.7);
                        document.getElementById('bg-base64').value = base64;
                    } catch (err) { console.error("Erro bg", err); }
                }
            };
        }
    }
}

function finishOnboarding(container) {
    container.innerHTML = `
        <div class="text-center py-6">
            <div class="text-5xl mb-3">🏆</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Tudo Pronto!</h3>
            <p class="text-gray-600 text-sm mb-6">Seu sistema está configurado. Boas vendas!</p>
            <button id="finish-onboarding-btn" class="bg-indigo-600 text-white font-bold py-2 px-6 rounded-full hover:bg-indigo-700 transition shadow-lg transform hover:scale-105 text-sm">
                Acessar Painel
            </button>
        </div>
    `;
    const bar = document.getElementById('progress-bar');
    const text = document.getElementById('progress-text');
    if (bar) bar.style.width = `100%`;
    if (text) text.innerText = `100%`;

    document.getElementById('finish-onboarding-btn').onclick = () => {
        if (onboardingOverlay) onboardingOverlay.remove();
        window.location.reload(); 
    };
}

async function handleStepSubmit(stepId) {
    const form = document.getElementById('step-form');
    if (!form.reportValidity()) return; 

    const btn = document.getElementById('next-step-btn');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = 'Salvando...';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        if (stepId === 'company_data') {
            await establishmentApi.updateEstablishmentDetails(state.establishmentId, {
                name: data.name,
                phone: data.phone,
                email: data.email,
                address: data.address,
                zipCode: data.zipCode
            });
        }
        else if (stepId === 'branding') {
            const updateData = {};
            if (data.logoBase64) updateData.logo = data.logoBase64;
            if (data.bgBase64) updateData.backgroundImage = data.bgBase64;
            if (data.themeColor) updateData.themeColor = data.themeColor;
            if (data.primaryColor) updateData.primaryColor = data.primaryColor;

            if (Object.keys(updateData).length > 0) {
                await establishmentApi.updateEstablishmentDetails(state.establishmentId, updateData);
            }
        }
        else if (stepId === 'time_config') {
            const interval = parseInt(data.slotInterval);
            await establishmentApi.updateEstablishmentDetails(state.establishmentId, {
                slotInterval: interval
            });
        }
        else if (stepId === 'first_service') {
            const newService = await servicesApi.createService({
                establishmentId: state.establishmentId,
                name: data.name,
                price: parseFloat(data.price),
                duration: parseInt(data.duration),
                active: true
            });
            if (newService) cachedServices.push(newService);
        }
        else if (stepId === 'first_prof') {
            const newProf = await professionalsApi.createProfessional({
                establishmentId: state.establishmentId,
                name: data.name,
                specialty: data.role, 
                active: true,
                commissionRate: 0
            });

            if (data.serviceId && newProf && newProf.id) {
                try {
                    if (professionalsApi.updateProfessionalServices) {
                        await professionalsApi.updateProfessionalServices(newProf.id, [data.serviceId]);
                    } else if (professionalsApi.updateProfessional) {
                         await professionalsApi.updateProfessional(newProf.id, { services: [data.serviceId] });
                    }
                } catch (e) {
                    console.warn("Não foi possível vincular o serviço automaticamente.", e);
                }
            }
        }
        else if (stepId === 'first_product') {
            await productsApi.createProduct({
                establishmentId: state.establishmentId,
                name: data.name,
                price: parseFloat(data.salePrice), 
                stock: parseInt(data.stock),
                active: true
            });
        }

        showNotification('Sucesso', 'Passo concluído!', 'success');
        currentStepIndex++;
        updateProgress();
        renderStep(currentStepIndex);

    } catch (error) {
        showNotification('Erro', 'Erro ao salvar: ' + error.message, 'error');
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
}