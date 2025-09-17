// js/ui/services.js

// --- 1. IMPORTAÇÕES ---
import * as servicesApi from '../api/services.js';
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

            // --- ALTERAÇÕES PARA REDUZIR O TAMANHO DO CARD ---
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
    const form = e.target;
    const serviceId = form.querySelector('#serviceId').value;
    const serviceData = {
        establishmentId: state.establishmentId,
        name: form.querySelector('#serviceName').value,
        price: parseFloat(form.querySelector('#servicePrice').value),
        duration: parseInt(form.querySelector('#serviceDuration').value),
        bufferTime: parseInt(form.querySelector('#serviceBufferTime').value) || 0,
        active: form.querySelector('#serviceStatus').checked,
        photo: form.querySelector('#servicePhotoBase64').value
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
    <div class="modal-content max-w-2xl">
        <h2 id="serviceModalTitle" class="text-2xl font-bold mb-6">Novo Serviço</h2>
        <form id="serviceForm" class="space-y-6">
            <input type="hidden" id="serviceId">
            <input type="hidden" id="servicePhotoBase64">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="md:col-span-1">
                    <label class="block text-sm font-medium text-gray-700">Imagem do Serviço</label>
                    <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div class="space-y-1 text-center">
                            <img id="servicePhotoPreview" src="https://placehold.co/128x128/E2E8F0/4A5568?text=Foto" class="mx-auto h-24 w-24 rounded-md object-cover mb-2">
                            <div class="flex text-sm text-gray-600">
                                <label for="servicePhotoInput" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                                    <span>Carregar ficheiro</span>
                                    <input id="servicePhotoInput" name="servicePhotoInput" type="file" class="sr-only" accept="image/*">
                                </label>
                            </div>
                            <p class="text-xs text-gray-500">PNG, JPG, GIF até 10MB</p>
                        </div>
                    </div>
                </div>
                <div class="md:col-span-2 space-y-4">
                    <div><label for="serviceName" class="block text-sm font-medium text-gray-700">Nome do Serviço</label><input type="text" id="serviceName" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label for="servicePrice" class="block text-sm font-medium text-gray-700">Preço (R$)</label><input type="number" id="servicePrice" step="0.01" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                        <div><label for="serviceDuration" class="block text-sm font-medium text-gray-700">Duração (minutos)</label><input type="number" id="serviceDuration" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                    </div>
                    <div><label for="serviceBufferTime" class="block text-sm font-medium text-gray-700">Tempo Extra / Limpeza (minutos)</label><input type="number" id="serviceBufferTime" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Opcional"></div>
                    <div class="flex items-center pt-2"><label for="serviceStatus" class="flex items-center cursor-pointer"><div class="relative"><input type="checkbox" id="serviceStatus" class="sr-only"><div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div></div><div id="serviceStatusLabel" class="ml-3 text-gray-700 font-semibold"></div></label></div>
                </div>
            </div>
            <div class="flex gap-4 pt-4 border-t"><button type="button" data-action="close-modal" data-target="serviceModal" class="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg">Cancelar</button><button type="submit" class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg">Salvar</button></div>
        </form>
    </div>`;

    const form = modal.querySelector('#serviceForm');
    const title = modal.querySelector('#serviceModalTitle');
    const statusToggle = modal.querySelector('#serviceStatus');
    const statusLabel = modal.querySelector('#serviceStatusLabel');
    const photoPreview = modal.querySelector('#servicePhotoPreview');
    const photoBase64Input = modal.querySelector('#servicePhotoBase64');
    const photoInput = modal.querySelector('#servicePhotoInput');

    form.addEventListener('submit', handleServiceFormSubmit);

    if (service) {
        title.textContent = 'Editar Serviço';
        form.querySelector('#serviceId').value = service.id;
        form.querySelector('#serviceName').value = service.name;
        form.querySelector('#servicePrice').value = service.price;
        form.querySelector('#serviceDuration').value = service.duration;
        form.querySelector('#serviceBufferTime').value = service.bufferTime || '';
        statusToggle.checked = service.active;
        if (service.photo) {
            photoPreview.src = service.photo;
            photoBase64Input.value = service.photo;
        }
    } else {
        title.textContent = 'Novo Serviço';
        statusToggle.checked = true;
    }

    photoInput.onchange = () => {
        const file = photoInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                photoPreview.src = e.target.result;
                photoBase64Input.value = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const updateStatusLabel = () => {
        statusLabel.textContent = statusToggle.checked ? 'Serviço Ativo' : 'Serviço Inativo';
    };
    updateStatusLabel();
    statusToggle.onchange = updateStatusLabel;

    modal.style.display = 'flex';
}

// --- 5. EVENT LISTENERS E INICIALIZAÇÃO DA PÁGINA ---

function setupEventListeners() {
    contentDiv.addEventListener('input', (e) => {
        if (e.target.id === 'serviceSearchInput') {
            renderServicesList();
        }
    });

    contentDiv.addEventListener('click', async (e) => {
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
    await fetchAndDisplayServices();
}
