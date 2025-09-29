// js/ui/establishment.js

import * as establishmentApi from '../api/establishments.js';
import { state } from '../state.js';
import { showNotification, showConfirmation } from '../components/modal.js';

const contentDiv = document.getElementById('content');
const daysOfWeek = { monday: 'Segunda', tuesday: 'Terça', wednesday: 'Quarta', thursday: 'Quinta', friday: 'Sexta', saturday: 'Sábado', sunday: 'Domingo' };

// ### NOVO: Paleta de cores definida ###
const colorThemes = {
    indigo: { name: 'Padrão (Índigo)', main: '#4f46e5', light: '#e0e7ff', text: '#ffffff' },
    rose: { name: 'Rosa', main: '#e11d48', light: '#ffe4e6', text: '#ffffff' },
    green: { name: 'Verde', main: '#16a34a', light: '#d1fae5', text: '#ffffff' },
    sky: { name: 'Azul Céu', main: '#0284c7', light: '#e0f2fe', text: '#ffffff' },
    amber: { name: 'Âmbar', main: '#d97706', light: '#fef3c7', text: '#1f2937' },
};

async function handleEstablishmentFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const workingHours = {};
    Object.keys(daysOfWeek).forEach(dayKey => {
        workingHours[dayKey] = {
            active: form.querySelector(`#est-${dayKey}-active`).checked,
            start: form.querySelector(`#est-${dayKey}-start`).value,
            end: form.querySelector(`#est-${dayKey}-end`).value,
            breakStart: form.querySelector(`#est-${dayKey}-breakStart`).value,
            breakEnd: form.querySelector(`#est-${dayKey}-breakEnd`).value,
        };
    });

    const loyaltyTiers = Array.from(document.querySelectorAll('#loyaltyTiersContainer .loyalty-tier-row')).map(row => ({
        points: parseInt(row.querySelector('input[data-field="points"]').value, 10),
        reward: row.querySelector('input[data-field="reward"]').value,
        discount: parseFloat(row.querySelector('input[data-field="discount"]').value) || 0
    }));

    const establishmentData = {
        name: form.querySelector('#establishmentName').value,
        document: form.querySelector('#establishmentCnpjCpf').value,
        phone: form.querySelector('#establishmentPhone').value,
        email: form.querySelector('#establishmentEmail').value,
        address: form.querySelector('#establishmentAddress').value,
        website: form.querySelector('#establishmentWebsite').value,
        welcomeMessage: form.querySelector('#establishmentWelcomeMessage').value,
        workingHours: workingHours,
        logo: form.querySelector('#establishmentLogoBase64').value,
        themeColor: form.querySelector('#establishmentThemeColor').value, // ### NOVO: Captura a cor do tema
        loyaltyProgram: {
            enabled: form.querySelector('#loyaltyEnabled').checked,
            pointsPerCurrency: parseFloat(form.querySelector('#loyaltyPointsPerCurrency').value) || 1,
            tiers: loyaltyTiers
        }
    };

    try {
        await establishmentApi.updateEstablishmentDetails(state.establishmentId, establishmentData);
        document.getElementById('panelEstablishmentName').textContent = establishmentData.name;
        showNotification('Sucesso', 'Dados do estabelecimento salvos com sucesso!', 'success');
    } catch (error) {
        showNotification('Erro', `Não foi possível salvar os dados: ${error.message}`, 'error');
    }
}

function renderLoyaltyTiers(tiers = []) {
    const container = document.getElementById('loyaltyTiersContainer');
    container.innerHTML = tiers.map((tier, index) => `
        <div class="loyalty-tier-row grid grid-cols-[1fr_2fr_1fr_auto] items-center gap-2 mb-2">
            <input type="number" placeholder="Pontos" data-field="points" value="${tier.points || ''}" class="w-full p-2 border rounded-md">
            <input type="text" placeholder="Descrição do Prémio" data-field="reward" value="${tier.reward || ''}" class="w-full p-2 border rounded-md">
            <div class="flex items-center">
                <span class="mr-1">R$</span>
                <input type="number" placeholder="Valor" data-field="discount" value="${tier.discount || ''}" class="w-full p-2 border rounded-md">
            </div>
            <button type="button" data-action="remove-loyalty-tier" class="bg-red-100 text-red-700 p-2 rounded-md hover:bg-red-200">&times;</button>
        </div>
    `).join('');
}

// ### NOVA FUNÇÃO ###
function renderColorPalette(currentThemeKey = 'indigo') {
    const container = document.getElementById('color-palette-container');
    const themeInput = document.getElementById('establishmentThemeColor');
    container.innerHTML = '';
    
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
            renderColorPalette(key); // Re-renderiza para mostrar a seleção
        });
        container.appendChild(swatch);
    });
}


async function fetchAndDisplayEstablishmentSettings() {
    try {
        const data = await establishmentApi.getEstablishmentDetails(state.establishmentId);

        document.getElementById('establishmentName').value = data.name || '';
        document.getElementById('establishmentCnpjCpf').value = data.document || '';
        document.getElementById('establishmentPhone').value = data.phone || '';
        document.getElementById('establishmentEmail').value = data.email || '';
        document.getElementById('establishmentAddress').value = data.address || '';
        document.getElementById('establishmentWebsite').value = data.website || '';
        document.getElementById('establishmentWelcomeMessage').value = data.welcomeMessage || '';
        
        // ### NOVO: Renderiza a paleta de cores com o valor guardado ###
        const currentTheme = data.themeColor || 'indigo';
        document.getElementById('establishmentThemeColor').value = currentTheme;
        renderColorPalette(currentTheme);


        if (data.logo) {
            document.getElementById('establishmentLogoPreview').src = data.logo;
            document.getElementById('establishmentLogoBase64').value = data.logo;
        }

        const loyaltyProgram = data.loyaltyProgram || {};
        document.getElementById('loyaltyEnabled').checked = loyaltyProgram.enabled || false;
        document.getElementById('loyaltyPointsPerCurrency').value = loyaltyProgram.pointsPerCurrency || 10;
        renderLoyaltyTiers(loyaltyProgram.tiers || []);

        const workingHoursContainer = document.getElementById('establishmentWorkingHoursContainer');
        workingHoursContainer.innerHTML = '';
        const scheduleData = data.workingHours || {};

        Object.keys(daysOfWeek).forEach(dayKey => {
            const dayData = scheduleData[dayKey] || {};
            const dayName = daysOfWeek[dayKey];
            const isChecked = dayData.active !== false;
            const dayElement = document.createElement('div');
            dayElement.className = `day-schedule-card p-4 rounded-lg ${isChecked ? 'bg-gray-50' : 'bg-gray-200 disabled'}`;

            dayElement.innerHTML = `
                <div class="flex justify-between items-center mb-3">
                    <span class="font-bold text-gray-800">${dayName}</span>
                    <label for="est-${dayKey}-active" class="flex items-center cursor-pointer">
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
                    <div class="flex items-center gap-2"><label class="w-16">Fim:</label><input type="time" id="est-${dayKey}-breakEnd" value="${dayData.breakEnd || '13:00'}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
                </div>`;
            workingHoursContainer.appendChild(dayElement);
        });

    } catch (error) {
        showNotification('Não foi possível carregar os dados do estabelecimento.', 'error');
    }
}

function setupEventListeners() {
    contentDiv.addEventListener('submit', e => {
        if (e.target.id === 'establishmentForm') handleEstablishmentFormSubmit(e);
    });

    contentDiv.addEventListener('change', e => {
        const toggle = e.target.closest('.day-schedule-card input[type="checkbox"]');
        if (toggle) {
            const card = toggle.closest('.day-schedule-card');
            card.classList.toggle('disabled', !toggle.checked);
            card.classList.toggle('bg-gray-200', !toggle.checked);
            card.classList.toggle('bg-gray-50', toggle.checked);
        }
    });

    contentDiv.addEventListener('click', async (e) => {
        const button = e.target.closest('button');
        if (!button) return;

        if (button.id === 'establishmentLogoButton') {
            document.getElementById('establishmentLogoInput').click();
        } else if (button.dataset.action === 'add-loyalty-tier') {
            const container = document.getElementById('loyaltyTiersContainer');
            const newTier = document.createElement('div');
            newTier.className = 'loyalty-tier-row grid grid-cols-[1fr_2fr_1fr_auto] items-center gap-2 mb-2';
            newTier.innerHTML = `
                <input type="number" placeholder="Pontos" data-field="points" class="w-full p-2 border rounded-md">
                <input type="text" placeholder="Descrição do Prémio" data-field="reward" class="w-full p-2 border rounded-md">
                <div class="flex items-center">
                    <span class="mr-1">R$</span>
                    <input type="number" placeholder="Valor" data-field="discount" class="w-full p-2 border rounded-md">
                </div>
                <button type="button" data-action="remove-loyalty-tier" class="bg-red-100 text-red-700 p-2 rounded-md hover:bg-red-200">&times;</button>
            `;
            container.appendChild(newTier);
        } else if (button.dataset.action === 'remove-loyalty-tier') {
            button.closest('.loyalty-tier-row').remove();
        } else if (button.dataset.action === 'clear-appointments') {
            const confirmed = await showConfirmation('Limpar Agendamentos', 'Tem a certeza ABSOLUTA? Todos os agendamentos, comandas e transações serão permanentemente apagados.');
            if (confirmed) {
                try {
                    await establishmentApi.clearAllAppointments(state.establishmentId);
                    showNotification('Todos os agendamentos foram limpos.', 'success');
                } catch (error) {
                    showNotification(`Não foi possível limpar os agendamentos: ${error.message}`, 'error');
                }
            }
        } else if (button.dataset.action === 'cleanup-invalid-appointments') { 
            const confirmed = await showConfirmation('Limpar Dados Inválidos', 'Isto irá procurar e apagar permanentemente todos os agendamentos que não têm uma data válida. Deseja continuar?');
            if (confirmed) {
                try {
                    const result = await establishmentApi.cleanupInvalidAppointments();
                    showNotification('Limpeza Concluída', result.message, 'success');
                } catch (error) {
                    showNotification(`Não foi possível concluir a limpeza: ${error.message}`, 'error');
                }
            }
        }
    });

    const logoInput = document.getElementById('establishmentLogoInput');
    if (logoInput) {
        logoInput.addEventListener('change', () => {
            const file = logoInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    document.getElementById('establishmentLogoPreview').src = e.target.result;
                    document.getElementById('establishmentLogoBase64').value = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

export async function loadEstablishmentPage() {
    contentDiv.innerHTML = `
        <section>
            <h2 class="text-3xl font-bold text-gray-800 mb-6">Dados do Estabelecimento</h2>
            <form id="establishmentForm" class="bg-white p-8 rounded-lg shadow-md space-y-8">

                <div>
                    <h3 class="text-xl font-semibold mb-4 border-b pb-2">Identidade Visual</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="flex items-center gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Logotipo</label>
                                <img id="establishmentLogoPreview" src="https://placehold.co/128x128/E2E8F0/4A5568?text=Logo" class="mt-2 h-24 w-24 rounded-lg object-contain border p-1 bg-gray-50">
                            </div>
                            <div class="flex-grow">
                                <input type="file" id="establishmentLogoInput" class="hidden" accept="image/*">
                                <input type="hidden" id="establishmentLogoBase64">
                                <button type="button" id="establishmentLogoButton" class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Alterar Logotipo</button>
                                <p class="text-xs text-gray-500 mt-2">Recomendado: PNG com fundo transparente.</p>
                            </div>
                        </div>
                         <div>
                            <label for="establishmentWelcomeMessage" class="block text-sm font-medium text-gray-700">Mensagem de Boas-Vindas</label>
                            <input type="text" id="establishmentWelcomeMessage" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Ex: Simples, rápido e à sua medida.">
                            <p class="text-xs text-gray-500 mt-1">Esta mensagem aparece abaixo do nome na página de agendamento do cliente.</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-semibold mb-4 border-b pb-2">Tema e Cores</h3>
                    <p class="text-sm text-gray-600 mb-4">Escolha a cor principal que representará sua marca no sistema e na página de agendamento do cliente.</p>
                    <div id="color-palette-container" class="flex flex-wrap gap-4"></div>
                    <input type="hidden" id="establishmentThemeColor">
                </div>

                <div>
                    <h3 class="text-xl font-semibold mb-4 border-b pb-2">Informações Gerais</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label for="establishmentName" class="block text-sm font-medium text-gray-700">Nome do Estabelecimento</label><input type="text" id="establishmentName" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                        <div><label for="establishmentCnpjCpf" class="block text-sm font-medium text-gray-700">CNPJ / CPF</label><input type="text" id="establishmentCnpjCpf" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                        <div><label for="establishmentPhone" class="block text-sm font-medium text-gray-700">Telefone</label><input type="tel" id="establishmentPhone" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                        <div><label for="establishmentEmail" class="block text-sm font-medium text-gray-700">E-mail</label><input type="email" id="establishmentEmail" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                        <div><label for="establishmentAddress" class="block text-sm font-medium text-gray-700">Endereço Completo</label><input type="text" id="establishmentAddress" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                        <div><label for="establishmentWebsite" class="block text-sm font-medium text-gray-700">Website</label><input type="url" id="establishmentWebsite" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-semibold mb-4 border-b pb-2">Plano de Fidelidade</h3>
                    <div class="space-y-4">
                        <div class="flex items-center">
                            <label for="loyaltyEnabled" class="flex items-center cursor-pointer">
                                <div class="relative"><input type="checkbox" id="loyaltyEnabled" class="sr-only"><div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div></div>
                                <span class="ml-3 font-medium text-gray-700">Habilitar Programa de Fidelidade</span>
                            </label>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="loyaltyPointsPerCurrency" class="block text-sm font-medium text-gray-700">Pontos Ganhos</label>
                                <div class="mt-1 flex items-center gap-2">
                                    <span>1 Ponto a cada R$</span>
                                    <input type="number" id="loyaltyPointsPerCurrency" value="10" class="w-24 p-2 border rounded-md">
                                </div>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Prémios (Níveis de Pontuação)</label>
                            <div class="grid grid-cols-[1fr_2fr_1fr_auto] items-center gap-2 mb-1 text-xs font-bold text-gray-500 px-2">
                                <span>Pontos</span>
                                <span>Descrição do Prémio</span>
                                <span>Valor do Desconto (R$)</span>
                                <span></span>
                            </div>
                            <div id="loyaltyTiersContainer"></div>
                            <button type="button" data-action="add-loyalty-tier" class="mt-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800">+ Adicionar Prémio</button>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-semibold mb-4 border-b pb-2">Horário de Funcionamento</h3>
                    <div id="establishmentWorkingHoursContainer" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"></div>
                </div>

                <div class="pt-4">
                    <button type="submit" class="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">Salvar Alterações</button>
                </div>

                <div class="pt-6 border-t border-red-200">
                    <h3 class="text-xl font-semibold text-red-700">Ações Perigosas</h3>
                    <p class="text-sm text-gray-600 my-2">Use estas ações com cuidado para manutenção.</p>
                    <div class="space-y-4">
                        <div>
                            <button type="button" data-action="cleanup-invalid-appointments" class="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600">Limpar Agendamentos Inválidos (com 'Invalid Date')</button>
                            <p class="text-xs text-gray-500 mt-1">Remove apenas os registos corrompidos que aparecem com data inválida.</p>
                        </div>
                        <div>
                            <button type="button" data-action="clear-appointments" class="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700">Limpar TODOS os Agendamentos</button>
                            <p class="text-xs text-gray-500 mt-1">Esta ação apaga TUDO. É irreversível.</p>
                        </div>
                    </div>
                </div>
            </form>
        </section>`;

    setupEventListeners();
    await fetchAndDisplayEstablishmentSettings();
}