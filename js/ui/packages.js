// js/ui/packages.js

import * as packagesApi from '../api/packages.js';
import * as servicesApi from '../api/services.js';
import { state } from '../state.js';
import { showNotification, showConfirmation, showGenericModal } from '../components/modal.js';

const contentDiv = document.getElementById('content');
let localState = {
    allPackages: [],
    servicesForModal: [],
};

// --- FUNÇÕES DE RENDERIZAÇÃO DA PÁGINA PRINCIPAL ---

function renderPackagesList() {
    const listContainer = document.getElementById('packagesListContainer');
    if (!listContainer) return;

    if (localState.allPackages.length === 0) {
        listContainer.innerHTML = `
            <div class="text-center py-16 px-4 bg-white rounded-lg shadow-md">
                <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2h-2.586a1 1 0 00-.707.293l-1.414 1.414a1 1 0 01-1.414 0l-1.414-1.414A1 1 0 009.586 17H7a2 2 0 01-2-2v-2a2 2 0 012-2h12z"></path>
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum pacote criado</h3>
                <p class="mt-1 text-sm text-gray-500">Crie pacotes para oferecer descontos e fidelizar clientes.</p>
                <div class="mt-6">
                    <button type="button" data-action="open-package-modal" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                        + Criar Novo Pacote
                    </button>
                </div>
            </div>`;
        return;
    }

    listContainer.innerHTML = localState.allPackages.map(pkg => {
        const isActive = pkg.status === 'active';
        const packageDataString = JSON.stringify(pkg).replace(/'/g, "&apos;");

        return `
            <div class="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                <div class="p-5">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-lg font-bold text-gray-900">${pkg.name}</h3>
                            <p class="text-sm text-gray-500">${pkg.description || 'Sem descrição'}</p>
                        </div>
                        <span class="text-xs font-semibold py-1 px-3 rounded-full ${isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}">
                            ${isActive ? 'Ativo' : 'Inativo'}
                        </span>
                    </div>
                    <div class="mt-4 pt-4 border-t">
                        <p class="text-3xl font-extrabold text-indigo-600">R$ ${pkg.finalPrice.toFixed(2)}</p>
                        <p class="text-sm text-gray-500 line-through">Valor original: R$ ${pkg.originalPrice.toFixed(2)}</p>
                    </div>
                    <ul class="mt-4 space-y-1 text-sm text-gray-600">
                        ${pkg.services.slice(0, 3).map(s => `<li>• ${s.quantity}x ${s.name}</li>`).join('')}
                        ${pkg.services.length > 3 ? `<li class="font-semibold text-xs">...e mais ${pkg.services.length - 3} item(ns)</li>` : ''}
                    </ul>
                </div>
                <div class="bg-gray-50 px-5 py-3 flex justify-end items-center gap-2">
                    <button data-action="edit-package" data-package='${packageDataString}' class="text-sm font-semibold text-indigo-600 hover:text-indigo-800">Editar</button>
                    <button data-action="delete-package" data-id="${pkg.id}" class="text-sm font-semibold text-red-600 hover:text-red-800">Excluir</button>
                </div>
            </div>
        `;
    }).join('');
}

// --- FUNÇÕES DO MODAL DE CRIAÇÃO/EDIÇÃO ---

async function openPackageModal(pkg = null) {
    const isEditing = !!pkg;
    const servicesInPackage = pkg ? pkg.services : [];

    const contentHTML = `
        <form id="package-form" class="flex flex-col h-full">
            <input type="hidden" id="packageId" value="${pkg?.id || ''}">
            <div class="flex-1 overflow-y-auto p-6 space-y-6">
                
                <div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Informações Básicas</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="packageName" class="block text-sm font-medium text-gray-700">Nome do Pacote</label>
                            <input type="text" id="packageName" value="${pkg?.name || ''}" class="mt-1 w-full p-2 border rounded-md" required>
                        </div>
                        <div>
                            <label for="packageStatus" class="block text-sm font-medium text-gray-700">Status</label>
                            <select id="packageStatus" class="mt-1 w-full p-2 border rounded-md bg-white">
                                <option value="active" ${pkg?.status !== 'inactive' ? 'selected' : ''}>Ativo</option>
                                <option value="inactive" ${pkg?.status === 'inactive' ? 'selected' : ''}>Inativo</option>
                            </select>
                        </div>
                    </div>
                    <div class="mt-4">
                        <label for="packageDescription" class="block text-sm font-medium text-gray-700">Descrição (Opcional)</label>
                        <textarea id="packageDescription" rows="2" class="mt-1 w-full p-2 border rounded-md">${pkg?.description || ''}</textarea>
                    </div>
                </div>

                <div class="border-t pt-6">
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="text-lg font-semibold text-gray-800">Serviços Incluídos</h3>
                        <button type="button" id="add-service-to-package-btn" class="py-1 px-3 bg-indigo-100 text-indigo-700 font-semibold rounded-lg text-sm hover:bg-indigo-200">+ Adicionar</button>
                    </div>
                    <div id="package-services-list" class="space-y-2 max-h-48 overflow-y-auto p-2 border rounded-md bg-gray-50 min-h-[5rem]">
                        <!-- Serviços serão renderizados aqui -->
                    </div>
                </div>

                <div class="border-t pt-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Preço e Validade</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div>
                            <label class="block text-sm font-medium text-gray-500">Valor Original</label>
                            <p id="originalPrice" class="text-xl font-bold text-gray-700 mt-1">R$ 0.00</p>
                        </div>
                         <div>
                            <label for="finalPrice" class="block text-sm font-medium text-gray-700">Preço Final do Pacote</label>
                            <input type="number" step="0.01" id="finalPrice" value="${pkg?.finalPrice || ''}" class="mt-1 w-full p-2 border rounded-md" required>
                        </div>
                        <div>
                            <label for="validityDays" class="block text-sm font-medium text-gray-700">Validade (dias)</label>
                            <input type="number" id="validityDays" value="${pkg?.validityDays || 30}" class="mt-1 w-full p-2 border rounded-md" placeholder="Ex: 30, 60, 90">
                             <p class="text-xs text-gray-500 mt-1">Deixe em branco para não expirar.</p>
                        </div>
                    </div>
                </div>

            </div>
            <footer class="p-5 border-t bg-gray-100 flex justify-end gap-3 flex-shrink-0">
                <button type="button" data-action="close-modal" data-target="genericModal" class="py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400">Cancelar</button>
                <button type="submit" class="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">Salvar Pacote</button>
            </footer>
        </form>
    `;

    const { modalElement } = showGenericModal({
        title: isEditing ? 'Editar Pacote de Serviços' : 'Criar Novo Pacote',
        contentHTML: contentHTML,
        maxWidth: 'max-w-3xl'
    });

    // Anexa listeners e renderiza dados iniciais
    const servicesListContainer = modalElement.querySelector('#package-services-list');
    
    const renderSelectedServices = (services) => {
        if (services.length === 0) {
            servicesListContainer.innerHTML = '<p class="text-center text-gray-500 p-4">Nenhum serviço adicionado.</p>';
        } else {
            servicesListContainer.innerHTML = services.map((s, index) => `
                <div class="flex items-center justify-between bg-white p-2 rounded shadow-sm">
                    <div class="flex items-center gap-2">
                        <input type="number" value="${s.quantity}" min="1" class="w-16 p-1 border rounded-md text-sm quantity-input" data-index="${index}">
                        <span class="font-medium text-gray-800">${s.name}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-sm text-gray-600">R$ ${s.price.toFixed(2)}</span>
                        <button type="button" class="text-red-500 hover:text-red-700 remove-service-btn" data-index="${index}">&times;</button>
                    </div>
                </div>
            `).join('');
        }
        updatePrices(services);
    };
    
    const updatePrices = (services) => {
        const originalPrice = services.reduce((acc, s) => acc + (s.price * s.quantity), 0);
        document.getElementById('originalPrice').textContent = `R$ ${originalPrice.toFixed(2)}`;
    };

    renderSelectedServices(servicesInPackage);

    servicesListContainer.addEventListener('change', (e) => {
        if (e.target.classList.contains('quantity-input')) {
            const index = parseInt(e.target.dataset.index, 10);
            const newQuantity = parseInt(e.target.value, 10);
            if (newQuantity > 0 && servicesInPackage[index]) {
                servicesInPackage[index].quantity = newQuantity;
                renderSelectedServices(servicesInPackage);
            }
        }
    });

    servicesListContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-service-btn')) {
            const index = parseInt(e.target.dataset.index, 10);
            servicesInPackage.splice(index, 1);
            renderSelectedServices(servicesInPackage);
        }
    });
    
    modalElement.querySelector('#add-service-to-package-btn').onclick = () => openServiceSelectionModal((selectedService) => {
        const existing = servicesInPackage.find(s => s.id === selectedService.id);
        if (existing) {
            existing.quantity++;
        } else {
            servicesInPackage.push({ ...selectedService, quantity: 1 });
        }
        renderSelectedServices(servicesInPackage);
    });

    modalElement.querySelector('#package-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const data = {
            id: document.getElementById('packageId').value || null,
            name: document.getElementById('packageName').value,
            description: document.getElementById('packageDescription').value,
            status: document.getElementById('packageStatus').value,
            services: servicesInPackage,
            originalPrice: servicesInPackage.reduce((acc, s) => acc + (s.price * s.quantity), 0),
            finalPrice: parseFloat(document.getElementById('finalPrice').value),
            validityDays: parseInt(document.getElementById('validityDays').value, 10) || null
        };

        if (data.services.length === 0) {
            showNotification('Erro', 'Adicione pelo menos um serviço ao pacote.', 'error');
            return;
        }

        try {
            if (isEditing) {
                await packagesApi.updatePackage(data.id, data);
            } else {
                await packagesApi.createPackage(data);
            }
            showNotification('Sucesso!', `Pacote ${isEditing ? 'atualizado' : 'criado'} com sucesso.`, 'success');
            modalElement.querySelector('[data-action="close-modal"]').click();
            loadPackagesPage();
        } catch (error) {
            showNotification('Erro', `Não foi possível salvar o pacote: ${error.message}`, 'error');
        }
    });
}

function openServiceSelectionModal(onSelect) {
    let searchTerm = '';

    const renderServiceList = (container) => {
        const filtered = localState.servicesForModal.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
        container.innerHTML = filtered.map(s => `
            <div class="flex justify-between items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer" data-service-id="${s.id}">
                <div>
                    <p class="font-semibold">${s.name}</p>
                    <p class="text-sm text-gray-500">${s.duration} min</p>
                </div>
                <span class="font-bold text-gray-800">R$ ${s.price.toFixed(2)}</span>
            </div>
        `).join('');
    };

    const modalContent = `
        <div class="flex flex-col h-full">
            <input type="search" id="service-search-input" placeholder="Pesquisar serviço..." class="p-3 border-b focus:outline-none">
            <div id="service-selection-list" class="flex-1 overflow-y-auto p-2"></div>
        </div>`;

    const { modalElement } = showGenericModal({
        title: 'Selecionar Serviço',
        contentHTML: modalContent,
        maxWidth: 'max-w-lg'
    });

    const listContainer = modalElement.querySelector('#service-selection-list');
    const searchInput = modalElement.querySelector('#service-search-input');
    
    renderServiceList(listContainer);
    
    searchInput.addEventListener('input', () => {
        searchTerm = searchInput.value;
        renderServiceList(listContainer);
    });

    listContainer.addEventListener('click', (e) => {
        const serviceRow = e.target.closest('[data-service-id]');
        if (serviceRow) {
            const service = localState.servicesForModal.find(s => s.id === serviceRow.dataset.serviceId);
            if (service) {
                onSelect(service);
                modalElement.querySelector('[data-close-modal]').click();
            }
        }
    });
}


// --- FUNÇÃO DE INICIALIZAÇÃO DA PÁGINA ---

export async function loadPackagesPage() {
    contentDiv.innerHTML = `
        <section id="packages-page">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-3xl font-bold text-gray-800">Pacotes de Serviços</h2>
                <button data-action="open-package-modal" class="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700">
                    + Criar Novo Pacote
                </button>
            </div>
            <div id="packagesListContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="loader col-span-full mx-auto"></div>
            </div>
        </section>
    `;

    try {
        const [packages, services] = await Promise.all([
            packagesApi.getPackages(state.establishmentId),
            servicesApi.getServices(state.establishmentId)
        ]);
        localState.allPackages = packages;
        localState.servicesForModal = services.filter(s => s.active);
        renderPackagesList();
    } catch (error) {
        document.getElementById('packagesListContainer').innerHTML = '<p class="text-red-500 col-span-full">Erro ao carregar pacotes.</p>';
    }

    // Listener de eventos principal da página
    contentDiv.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action]');
        if (!target) return;

        const action = target.dataset.action;

        if (action === 'open-package-modal') {
            openPackageModal();
        } else if (action === 'edit-package') {
            const pkg = JSON.parse(target.dataset.package);
            openPackageModal(pkg);
        } else if (action === 'delete-package') {
            const pkgId = target.dataset.id;
            showConfirmation('Excluir Pacote', 'Tem a certeza que deseja excluir este pacote? Esta ação é irreversível.')
                .then(async (confirmed) => {
                    if (confirmed) {
                        try {
                            await packagesApi.deletePackage(pkgId);
                            showNotification('Sucesso', 'Pacote excluído.', 'success');
                            loadPackagesPage();
                        } catch (error) {
                            showNotification('Erro', `Não foi possível excluir: ${error.message}`, 'error');
                        }
                    }
                });
        }
    });
}
