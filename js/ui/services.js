// js/ui/services.js

// --- 1. IMPORTAÇÕES ---
import * as servicesApi from '../api/services.js';
import * as professionalsApi from '../api/professionals.js';
import { state } from '../state.js';
import { showNotification, showConfirmation } from '../components/modal.js';

// --- 2. CONSTANTES E VARIÁVEIS DO MÓDULO ---
const contentDiv = document.getElementById('content');

// --- 3. FUNÇÕES DE LÓGICA E RENDERIZAÇÃO ---

function renderServicesList() {
    const listDiv = document.getElementById('servicesList');
    const searchInput = document.getElementById('serviceSearchInput');
    if (!listDiv || !searchInput) return;

    const searchTerm = searchInput.value.toLowerCase();
    const filteredServices = state.services.filter(s => s.name.toLowerCase().includes(searchTerm));

    listDiv.innerHTML = '';
    if (filteredServices.length > 0) {
        filteredServices.forEach(service => {
            const card = document.createElement('div');
            card.className = `service-card bg-white rounded-lg shadow-md flex flex-col overflow-hidden transition-all duration-300 ${service.active ? 'opacity-100' : 'opacity-50 bg-gray-100'}`;
            const photoSrc = service.photo || `https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(service.name.charAt(0))}`;
            const serviceDataString = JSON.stringify(service).replace(/'/g, "&apos;");

            card.innerHTML = `
                <img src="${photoSrc}" alt="Imagem de ${service.name}" class="w-full h-24 object-cover">
                <div class="p-3 flex flex-col flex-grow">
                    <div class="flex-grow">
                        <div class="flex justify-between items-start mb-1">
                            <h3 class="text-sm font-bold text-gray-900 flex-1 text-left">${service.name}</h3>
                            <label class="flex items-center cursor-pointer">
                                <div class="relative">
                                    <input type="checkbox" data-action="toggle-service-status" data-id="${service.id}" class="sr-only" ${service.active ? 'checked' : ''}>
                                    <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                                </div>
                            </label>
                        </div>
                        <p class="text-xl font-bold text-indigo-600 mb-2 text-left">R$ ${service.price.toFixed(2)}</p>
                        <p class="text-xs text-gray-500 text-left">${service.duration} min (+${service.bufferTime || 0} min extra)</p>
                        <p class="text-xs text-gray-500 text-left">Comissão Padrão: ${service.commissionRate || 0}%</p>
                    </div>
                    <div class="mt-2 pt-2 border-t flex items-center justify-end gap-2">
                        <button data-action="edit-service" data-service='${serviceDataString}' class="text-gray-500 hover:text-blue-600 p-1" title="Editar"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                        <button data-action="delete-service" data-id="${service.id}" class="text-gray-500 hover:text-red-600 p-1" title="Apagar"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                    </div>
                </div>`;
            listDiv.appendChild(card);
        });
    } else {
        listDiv.innerHTML = `<p class="col-span-full text-center text-gray-500">Nenhum serviço encontrado.</p>`;
    }
}

async function fetchAndDisplayServices() {
    const listDiv = document.getElementById('servicesList');
    if (!listDiv) return;
    listDiv.innerHTML = '<div class="loader col-span-full mx-auto"></div>';
    try {
        state.services = await servicesApi.getServices(state.establishmentId);
        renderServicesList();
    } catch (error) {
        listDiv.innerHTML = '<p class="text-red-500 col-span-full">Erro ao carregar serviços.</p>';
        showNotification('Erro', `Não foi possível carregar os serviços: ${error.message}`, 'error');
    }
}

async function handleServiceFormSubmit(e) {
    e.preventDefault();
    const form = e.target.closest('#serviceModal');
    const serviceId = form.querySelector('#serviceId').value;
    
    const professionalCommissions = {};
    const commissionType = form.querySelector('input[name="commissionType"]:checked').value;
    if (commissionType === 'custom') {
        form.querySelectorAll('.professional-commission-row').forEach(row => {
            const profId = row.dataset.profId;
            const isChecked = row.querySelector('input[type="checkbox"]').checked;
            if (isChecked) {
                const rate = parseFloat(row.querySelector('input[type="number"]').value);
                professionalCommissions[profId] = isNaN(rate) ? 0 : rate;
            }
        });
    }

    const serviceData = {
        establishmentId: state.establishmentId,
        name: form.querySelector('#serviceName').value,
        price: parseFloat(form.querySelector('#servicePrice').value),
        duration: parseInt(form.querySelector('#serviceDurationHours').value * 60) + parseInt(form.querySelector('#serviceDurationMinutes').value),
        bufferTime: 0,
        commissionRate: parseFloat(form.querySelector('#serviceCommissionRate').value) || 0,
        active: true,
        photo: form.querySelector('#servicePhotoBase64').value,
        notes: form.querySelector('#serviceNotes').value,
        commissionType: commissionType,
        professionalCommissions: professionalCommissions
    };

    try {
        if (serviceId) {
            await servicesApi.updateService(serviceId, serviceData);
        } else {
            await servicesApi.createService(serviceData);
        }
        document.getElementById('serviceModal').style.display = 'none';
        showNotification('Sucesso', `Serviço ${serviceId ? 'atualizado' : 'adicionado'} com sucesso!`, 'success');
        await fetchAndDisplayServices();
    } catch (error) {
        showNotification('Erro', error.message, 'error');
    }
}

function openServiceModal(service = null) {
    const modal = document.getElementById('serviceModal');
    modal.innerHTML = `
    <div class="modal-content max-w-3xl">
        <form id="serviceForm">
            <input type="hidden" id="serviceId" value="${service?.id || ''}">
            <input type="hidden" id="servicePhotoBase64" value="${service?.photo || ''}">
            
            <div class="flex justify-between items-center mb-4">
                <h2 id="serviceModalTitle" class="text-2xl font-bold text-gray-800">${service ? service.name : 'Novo Serviço'}</h2>
                <button type="button" data-action="close-modal" data-target="serviceModal" class="text-2xl font-bold">&times;</button>
            </div>

            <div class="border-b border-gray-200 mb-6">
                <nav class="-mb-px flex space-x-6" aria-label="Tabs">
                    <button type="button" data-tab="dados" class="tab-btn whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm border-indigo-500 text-indigo-600">Dados do serviço</button>
                    <button type="button" data-tab="comissoes" class="tab-btn whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">Personalizar comissões</button>
                </nav>
            </div>

            <div id="tab-content-dados" class="tab-content space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="serviceName" class="block text-sm font-medium text-gray-700">Nome do serviço</label>
                        <input type="text" id="serviceName" value="${service?.name || ''}" class="mt-1 w-full p-2 border rounded-md" required>
                    </div>
                    <div>
                        <label for="servicePrice" class="block text-sm font-medium text-gray-700">Preço (a partir de:)</label>
                        <input type="number" id="servicePrice" step="0.01" value="${service?.price || ''}" class="mt-1 w-full p-2 border rounded-md" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Categoria</label>
                        <select id="serviceCategory" class="mt-1 w-full p-2 border rounded-md bg-white"></select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Duração</label>
                        <div class="flex items-center gap-2 mt-1">
                            <select id="serviceDurationHours" class="w-full p-2 border rounded-md bg-white">${Array.from({length: 10}, (_, i) => `<option value="${i}">${i}</option>`).join('')} h</select>
                            <select id="serviceDurationMinutes" class="w-full p-2 border rounded-md bg-white">${[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(m => `<option value="${m}">${m}</option>`).join('')} min</select>
                        </div>
                    </div>
                </div>
                <div>
                    <label for="serviceNotes" class="block text-sm font-medium text-gray-700">Observações</label>
                    <textarea id="serviceNotes" rows="3" class="mt-1 w-full p-2 border rounded-md">${service?.notes || ''}</textarea>
                </div>
            </div>

            <div id="tab-content-comissoes" class="tab-content hidden space-y-6">
                <div>
                    <label class="block text-lg font-medium text-gray-800">Tipo de comissão</label>
                    <p class="text-sm text-gray-500">Qual o tipo de comissão que é paga neste serviço?</p>
                    <div class="mt-2 space-y-2">
                        <label class="flex items-center p-3 border rounded-md has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-400 cursor-pointer">
                            <input type="radio" name="commissionType" value="default" class="h-4 w-4 text-indigo-600 border-gray-300" ${service?.commissionType !== 'custom' ? 'checked' : ''}>
                            <span class="ml-3 text-sm text-gray-700 font-medium">Padrão para todos os profissionais</span>
                        </label>
                        <label class="flex items-center p-3 border rounded-md has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-400 cursor-pointer">
                            <input type="radio" name="commissionType" value="custom" class="h-4 w-4 text-indigo-600 border-gray-300" ${service?.commissionType === 'custom' ? 'checked' : ''}>
                            <span class="ml-3 text-sm text-gray-700 font-medium">Diferente para cada profissional</span>
                        </label>
                    </div>
                </div>
                <div id="defaultCommissionRateContainer">
                    <label for="serviceCommissionRate" class="block text-sm font-medium text-gray-700">Comissão Padrão (%)</label>
                    <input type="number" id="serviceCommissionRate" value="${service?.commissionRate || 0}" class="mt-1 w-32 p-2 border rounded-md">
                </div>
                <div id="professionalCommissionsContainer" class="hidden">
                     <label class="block text-lg font-medium text-gray-800">Comissão por Profissional</label>
                     <p class="text-sm text-gray-500 mb-2">Selecione os profissionais que fazem este serviço e informe a comissão de cada um deles.</p>
                     <div class="border rounded-lg overflow-hidden">
                        <div class="grid grid-cols-[1fr_auto] items-center p-2 bg-gray-50 font-semibold text-xs text-gray-600">
                           <span>Profissional</span>
                           <span class="text-center">Comissão</span>
                        </div>
                        <div id="professionalCommissionsList" class="space-y-1 max-h-48 overflow-y-auto p-2"></div>
                     </div>
                </div>
            </div>

            <div class="mt-6 pt-6 border-t flex justify-between items-center">
                <button type="button" data-action="delete-service" data-id="${service?.id || ''}" class="text-red-600 font-semibold hover:underline ${!service ? 'hidden' : ''}">Excluir Serviço</button>
                <div class="flex gap-4">
                    <button type="button" data-action="close-modal" data-target="serviceModal" class="py-2 px-6 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">Cancelar</button>
                    <button type="submit" class="py-2 px-6 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700">Salvar</button>
                </div>
            </div>
        </form>
    </div>`;

    modal.style.display = 'flex';

    // Lógica das abas
    const tabs = modal.querySelectorAll('.tab-btn');
    const tabContents = modal.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => {
                t.classList.remove('border-indigo-500', 'text-indigo-600');
                t.classList.add('border-transparent', 'text-gray-500', 'hover:text-gray-700', 'hover:border-gray-300');
            });
            tab.classList.add('border-indigo-500', 'text-indigo-600');
            tab.classList.remove('border-transparent', 'text-gray-500', 'hover:text-gray-700', 'hover:border-gray-300');
            tabContents.forEach(c => c.classList.add('hidden'));
            document.getElementById(`tab-content-${tab.dataset.tab}`).classList.remove('hidden');
        });
    });

    // CORREÇÃO: Utiliza document.getElementById que é mais seguro
    const commissionTypeRadios = modal.querySelectorAll('input[name="commissionType"]');
    const defaultCommissionContainer = document.getElementById('defaultCommissionRateContainer');
    const customCommissionContainer = document.getElementById('professionalCommissionsContainer');
    
    function toggleCommissionView() {
        const selected = modal.querySelector('input[name="commissionType"]:checked').value;
        if (defaultCommissionContainer) defaultCommissionContainer.style.display = selected === 'default' ? 'block' : 'none';
        if (customCommissionContainer) customCommissionContainer.style.display = selected === 'custom' ? 'block' : 'none';
    }
    
    commissionTypeRadios.forEach(radio => radio.addEventListener('change', toggleCommissionView));
    
    const profListContainer = document.getElementById('professionalCommissionsList');
    profListContainer.innerHTML = state.professionals.map(prof => {
        const isChecked = service?.professionalCommissions?.[prof.id] !== undefined;
        const rate = service?.professionalCommissions?.[prof.id] || 0;
        return `
            <div class="professional-commission-row flex items-center justify-between p-2 rounded-md ${isChecked ? 'bg-blue-50' : ''}" data-prof-id="${prof.id}">
                <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" ${isChecked ? 'checked' : ''} class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                    <img src="${prof.photo || `https://placehold.co/40x40/E2E8F0/4A5568?text=${prof.name.charAt(0)}`}" class="w-8 h-8 rounded-full object-cover">
                    <span class="text-sm font-medium">${prof.name}</span>
                </label>
                <div class="flex items-center gap-1">
                    <input type="number" value="${rate}" class="w-20 p-1 border rounded-md text-sm text-center" ${!isChecked ? 'disabled' : ''}>
                    <span class="text-sm font-semibold">%</span>
                </div>
            </div>
        `;
    }).join('');

    profListContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const row = e.target.closest('.professional-commission-row');
            row.querySelector('input[type="number"]').disabled = !e.target.checked;
            row.classList.toggle('bg-blue-50', e.target.checked);
        });
    });

    toggleCommissionView();

    const form = modal.querySelector('#serviceForm');
    const durationInMinutes = service?.duration || 0;
    form.querySelector('#serviceDurationHours').value = Math.floor(durationInMinutes / 60);
    form.querySelector('#serviceDurationMinutes').value = durationInMinutes % 60;
    
    // Este campo não existe mais no novo layout, mas mantemos a lógica para não quebrar o submit
    const serviceStatusInput = document.createElement('input');
    serviceStatusInput.type = 'hidden';
    serviceStatusInput.id = 'serviceStatus';
    serviceStatusInput.checked = service ? service.active : true;
    form.appendChild(serviceStatusInput);
    
    form.addEventListener('submit', handleServiceFormSubmit);
}


// --- 5. EVENT LISTENERS E INICIALIZAÇÃO DA PÁGINA ---

function setupEventListeners() {
    const pageHandler = async (e) => {
        const button = e.target.closest('button[data-action]');
        const toggle = e.target.closest('input[type="checkbox"][data-action="toggle-service-status"]');

        if (button) {
            const action = button.dataset.action;
            const serviceId = button.dataset.id;

            if (action === 'new-service') {
                openServiceModal();
            } else if (action === 'edit-service') {
                const serviceData = JSON.parse(button.dataset.service);
                openServiceModal(serviceData);
            } else if (action === 'delete-service') {
                if(!serviceId) return;
                const confirmed = await showConfirmation('Apagar Serviço', 'Tem a certeza que deseja apagar este serviço?');
                if (confirmed) {
                    try {
                        await servicesApi.deleteService(serviceId);
                        showNotification('Sucesso', 'Serviço apagado com sucesso!', 'success');
                        await fetchAndDisplayServices();
                    } catch (error) {
                        showNotification('Erro', `Não foi possível apagar o serviço: ${error.message}`, 'error');
                    }
                }
            }
        } else if (toggle) {
            const serviceId = toggle.dataset.id;
            const newStatus = toggle.checked;
            try {
                await servicesApi.updateServiceStatus(serviceId, newStatus);
                const serviceIndex = state.services.findIndex(s => s.id === serviceId);
                if (serviceIndex > -1) state.services[serviceIndex].active = newStatus;
                renderServicesList();
            } catch (error) {
                showNotification('Erro', `Não foi possível atualizar o status: ${error.message}`, 'error');
                toggle.checked = !newStatus;
                renderServicesList();
            }
        }
    };

    contentDiv.addEventListener('click', pageHandler);
    contentDiv.addEventListener('input', e => {
        if (e.target.id === 'serviceSearchInput') {
            renderServicesList();
        }
    });
}

// --- 6. FUNÇÃO PRINCIPAL EXPORTADA ---

export async function loadServicesPage() {
    contentDiv.innerHTML = `
        <section>
            <div class="flex flex-wrap gap-4 justify-between items-center mb-6">
                <h2 class="text-3xl font-bold text-gray-800">Gerir Serviços</h2>
                <div class="flex items-center gap-4">
                    <input type="text" id="serviceSearchInput" placeholder="Pesquisar por nome..." class="w-full md:w-64 p-2 border rounded-md shadow-sm">
                    <button data-action="new-service" class="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
                        Novo Serviço
                    </button>
                </div>
            </div>
            <div id="servicesList" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4"></div>
        </section>`;

    setupEventListeners();
    
    // Garante que os profissionais estejam carregados antes de abrir qualquer modal
    if (!state.professionals || state.professionals.length === 0) {
        state.professionals = await professionalsApi.getProfessionals(state.establishmentId);
    }
    
    await fetchAndDisplayServices();
}