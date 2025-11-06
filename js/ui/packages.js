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
                        <svg class="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                        Criar Pacote
                    </button>
                </div>
            </div>`;
        return;
    }

    // Estrutura do card mais compacta
    listContainer.innerHTML = localState.allPackages.map(pkg => {
        const isActive = pkg.status === 'active';
        const packageDataString = JSON.stringify(pkg).replace(/'/g, "&apos;");
        
        const finalPrice = pkg.price || 0;
        const originalPrice = pkg.originalPrice || 0;
        const commissionRate = pkg.commissionRate || 0;
        const discountValue = originalPrice > finalPrice ? originalPrice - finalPrice : 0;
        const discountPercent = originalPrice > 0 ? ((originalPrice - finalPrice) / originalPrice) * 100 : 0;


        return `
            <div class="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                <div class="p-4">
                    <div class="flex justify-between items-start">
                        <div class="min-w-0 pr-2">
                            <h3 class="text-base font-bold text-gray-900 truncate">${pkg.name}</h3>
                            <p class="text-xs text-gray-500 truncate">${pkg.description || 'Sem descrição'}</p>
                        </div>
                        <span class="text-xs font-semibold py-0.5 px-2 rounded-full flex-shrink-0 ${isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}">
                            ${isActive ? 'Ativo' : 'Inativo'}
                        </span>
                    </div>

                    <div class="mt-3 pt-3 border-t flex justify-between items-end">
                        <div>
                            <p class="text-2xl font-extrabold text-indigo-600">R$ ${finalPrice.toFixed(2)}</p>
                            ${discountValue > 0 ? 
                                `<p class="text-xs text-gray-500 line-through">De R$ ${originalPrice.toFixed(2)}</p>
                                 <span class="text-xs font-semibold text-red-600 bg-red-100 px-1.5 rounded">${discountPercent.toFixed(0)}% OFF</span>`
                                : `<p class="text-xs text-gray-500 line-through">Valor integral</p>`
                            }
                        </div>
                        
                        <div class="text-right flex flex-col items-end">
                            <p class="text-sm font-semibold text-gray-800">${(pkg.services || []).length} Serviços</p>
                            <p class="text-xs text-gray-500">${pkg.commissionRate || 0}% Comissão</p>
                            <p class="text-xs text-gray-500 mt-1">${pkg.validityDays || '-'} Dias Validade</p>
                        </div>
                    </div>

                </div>
                <div class="bg-gray-50 px-4 py-2 flex justify-end items-center gap-2 border-t">
                    <button data-action="edit-package" data-package='${packageDataString}' class="text-sm font-semibold text-indigo-600 hover:text-indigo-800 py-1 px-2">Editar</button>
                    <button data-action="delete-package" data-id="${pkg.id}" class="text-sm font-semibold text-red-600 hover:text-red-800 py-1 px-2">Excluir</button>
                </div>
            </div>
        `;
    }).join('');
}

// --- FUNÇÕES DO MODAL DE CRIAÇÃO/EDIÇÃO ---

async function openPackageModal(pkg = null) {
    const isEditing = !!pkg;
    const servicesInPackage = pkg ? JSON.parse(JSON.stringify(pkg.services || [])) : [];

    const contentHTML = `
        <form id="package-form" class="flex flex-col h-full">
            <input type="hidden" id="packageId" value="${pkg?.id || ''}">
            <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                
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
                        <button type="button" id="add-service-to-package-btn" class="py-1 px-3 bg-indigo-600 text-white font-semibold rounded-lg text-sm hover:bg-indigo-700 transition shadow-sm">+ Adicionar</button>
                    </div>
                    <div id="package-services-list" class="space-y-2 max-h-48 overflow-y-auto p-2 border rounded-md bg-gray-50 min-h-[5rem]"></div>
                </div>

                <div class="border-t pt-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Preço e Validade</h3>
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 items-end">
                        <div class="col-span-2 sm:col-span-1">
                            <label class="block text-sm font-bold text-gray-700">Valor Original</label>
                            <p id="originalPrice" class="text-xl font-bold text-gray-800 mt-1">R$ 0.00</p>
                        </div>
                         <div>
                            <label for="finalPrice" class="block text-sm font-medium text-gray-700">Preço Final</label>
                            <input type="number" step="0.01" id="finalPrice" value="${pkg?.price || ''}" class="mt-1 w-full p-2 border rounded-md" required>
                        </div>
                        <div>
                            <label for="commissionRate" class="block text-sm font-medium text-gray-700">Comissão (%)</label>
                            <input type="number" id="commissionRate" value="${pkg?.commissionRate || 0}" class="mt-1 w-full p-2 border rounded-md" placeholder="Ex: 10">
                        </div>
                        <div>
                            <label for="validityDays" class="block text-sm font-medium text-gray-700">Validade (dias)</label>
                            <input type="number" id="validityDays" value="${pkg?.validityDays || 30}" class="mt-1 w-full p-2 border rounded-md" placeholder="Ex: 30, 60, 90">
                        </div>
                    </div>
                </div>

            </div>
            <footer class="p-4 border-t bg-gray-100 flex justify-end gap-3 flex-shrink-0">
                <button type="button" data-action="close-modal" data-target="genericModal" class="py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400">Cancelar</button>
                <button type="submit" class="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">Salvar Pacote</button>
            </footer>
        </form>
    `;

    const { modalElement } = showGenericModal({
        title: isEditing ? 'Editar Pacote de Serviços' : 'Criar Novo Pacote',
        contentHTML: contentHTML,
        maxWidth: 'max-w-4xl'
    });

    const servicesListContainer = modalElement.querySelector('#package-services-list');
    
    const updatePrices = (services, modal) => {
        const originalPriceEl = modal.querySelector('#originalPrice');
        const originalPrice = services.reduce((acc, s) => acc + (s.price * s.quantity), 0);
        if (originalPriceEl) {
            originalPriceEl.textContent = `R$ ${originalPrice.toFixed(2)}`;
        }
    };
    
    // Otimização da renderização do serviço para mobile
    const renderSelectedServices = (services) => {
        if (services.length === 0) {
            servicesListContainer.innerHTML = '<p class="text-center text-gray-500 p-4">Nenhum serviço adicionado.</p>';
        } else {
            servicesListContainer.innerHTML = services.map((s, index) => `
                <div class="flex items-center justify-between bg-white p-2 rounded shadow-sm border border-gray-200">
                    <div class="flex items-center gap-3 min-w-0">
                        <input type="number" value="${s.quantity}" min="1" class="w-12 p-1 border rounded-md text-sm quantity-input flex-shrink-0" data-index="${index}">
                        <span class="font-medium text-gray-800 truncate">${s.name}</span>
                    </div>
                    <div class="flex items-center gap-2 flex-shrink-0">
                        <span class="text-sm text-gray-600">R$ ${s.price.toFixed(2)}</span>
                        <button type="button" class="text-red-500 hover:text-red-700 remove-service-btn font-bold" data-index="${index}">&times;</button>
                    </div>
                </div>
            `).join('');
        }
        updatePrices(services, modalElement);
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
            price: parseFloat(document.getElementById('finalPrice').value),
            commissionRate: parseFloat(document.getElementById('commissionRate').value) || 0, // Adicionado
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
            await loadPackagesPage();
        } catch (error) {
            showNotification('Erro', `Não foi possível salvar o pacote: ${error.message}`, 'error');
        }
    });
}

function openServiceSelectionModal(onSelect) {
    let searchTerm = '';

    const modalContainer = document.createElement('div');
    modalContainer.id = 'service-selection-modal';
    // Garante que o modal de seleção sobrepõe o modal principal
    modalContainer.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[110]';

    const renderServiceList = (listContainer) => {
        const filtered = localState.servicesForModal.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
        listContainer.innerHTML = filtered.map(s => `
            <div class="flex justify-between items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer border-b last:border-b-0" 
                 data-action="select-service" data-service-id="${s.id}">
                <div>
                    <p class="font-semibold">${s.name}</p>
                    <p class="text-sm text-gray-500">${s.duration} min</p>
                </div>
                <span class="font-bold text-gray-800">R$ ${s.price.toFixed(2)}</span>
            </div>
        `).join('');
    };

    modalContainer.innerHTML = `
        <div class="bg-white rounded-lg shadow-xl w-full max-w-sm sm:max-w-lg flex flex-col max-h-[80vh]">
            <header class="p-4 border-b flex justify-between items-center">
                <h2 class="text-xl font-bold text-gray-800">Selecionar Serviço</h2>
                <button data-action="close-selection-modal" class="text-2xl font-bold text-gray-500 hover:text-gray-900">&times;</button>
            </header>
            <div class="p-4 border-b">
                <input type="search" id="service-search-input" placeholder="Pesquisar serviço..." class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </div>
            <div id="service-selection-list" class="flex-1 overflow-y-auto"></div>
        </div>
    `;

    document.body.appendChild(modalContainer);

    const listContainer = modalContainer.querySelector('#service-selection-list');
    const searchInput = modalContainer.querySelector('#service-search-input');
    
    const closeThisModal = () => {
        modalContainer.remove();
    };

    renderServiceList(listContainer);
    
    searchInput.addEventListener('input', () => {
        searchTerm = searchInput.value;
        renderServiceList(listContainer);
    });

    modalContainer.addEventListener('click', (e) => {
        const serviceRow = e.target.closest('[data-action="select-service"]');
        const closeButton = e.target.closest('[data-action="close-selection-modal"]');
        
        if (serviceRow) {
            const service = localState.servicesForModal.find(s => s.id === serviceRow.dataset.serviceId);
            if (service) {
                onSelect(service);
                closeThisModal();
            }
        } else if (closeButton || e.target === modalContainer) {
            closeThisModal();
        }
    });
}


// --- FUNÇÃO DE INICIALIZAÇÃO DA PÁGINA ---

export async function loadPackagesPage() {
    contentDiv.innerHTML = `
        <section id="packages-page">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-3xl font-bold text-gray-800">Pacotes de Serviços</h2>
                </div>
            <div id="packagesListContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="loader col-span-full mx-auto"></div>
            </div>
            
            <button data-action="open-package-modal" class="fixed bottom-10 right-10 bg-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:bg-indigo-700 transition transform hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
            </button>
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
                            showNotification('Sucesso!', 'Pacote excluído.', 'success');
                            await loadPackagesPage();
                        } catch (error) {
                            showNotification('Erro', `Não foi possível excluir: ${error.message}`, 'error');
                        }
                    }
                });
        }
    });
}