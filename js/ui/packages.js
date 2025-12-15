// js/ui/packages.js

// --- 1. IMPORTAÇÕES ---
import * as packagesApi from '../api/packages.js';
import * as servicesApi from '../api/services.js';
import * as productsApi from '../api/products.js'; 
import { state } from '../state.js';
import { showNotification, showConfirmation, showGenericModal } from '../components/modal.js';
import { escapeHTML } from '../utils.js'; // --- IMPORTAÇÃO DE SEGURANÇA ---

const contentDiv = document.getElementById('content');
let localState = {
    allPackages: [],
    catalogForModal: { 
        services: [], 
        products: [] 
    },
};
let pageEventListener = null;
let modalEventListener = null; 

// --- FUNÇÕES DE RENDERIZAÇÃO DA PÁGINA PRINCIPAL ---

function renderSkeletonList(count = 6) {
    let skeletonHTML = '';
    for (let i = 0; i < count; i++) {
        skeletonHTML += `
        <div class="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div class="p-4 space-y-3">
                <div class="flex justify-between items-start">
                    <div class="space-y-2 flex-1 pr-4">
                        <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div class="h-5 bg-gray-200 rounded-full w-14"></div>
                </div>
                <div class="mt-3 pt-3 border-t flex justify-between items-end">
                    <div class="space-y-2">
                        <div class="h-6 bg-gray-200 rounded w-24"></div>
                        <div class="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div class="space-y-2 text-right">
                        <div class="h-4 bg-gray-200 rounded w-20"></div>
                        <div class="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 h-10 border-t"></div>
        </div>
        `;
    }
    return skeletonHTML;
}

function renderPackagesList() {
    const listContainer = document.getElementById('packagesListContainer');
    if (!listContainer) return;

    if (localState.allPackages.length === 0) {
        listContainer.innerHTML = `
            <div class="text-center py-16 px-4 bg-white rounded-lg shadow-md col-span-full">
                <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2h-2.586a1 1 0 00-.707.293l-1.414 1.414a1 1 0 01-1.414 0l-1.414-1.414A1 1 0 009.586 17H7a2 2 0 01-2-2v-2a2 2 0 012-2h12z"></path>
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum pacote criado</h3>
                <p class="mt-1 text-sm text-gray-500">Crie pacotes para oferecer descontos e fidelizar clientes.</p>
                <div class="mt-6">
                    <button type="button" data-action="new-package" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                        <svg class="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                        Criar Pacote
                    </button>
                </div>
            </div>`;
        return;
    }

    listContainer.innerHTML = localState.allPackages.map(pkg => {
        const isActive = pkg.status === 'active';
        const packageDataString = JSON.stringify(pkg).replace(/'/g, "&apos;");
        
        const finalPrice = pkg.price || 0;
        const originalPrice = pkg.originalPrice || 0;
        // const commissionRate = pkg.commissionRate || 0; // Removido uso não utilizado
        const discountValue = originalPrice > finalPrice ? originalPrice - finalPrice : 0;
        const discountPercent = originalPrice > 0 ? ((originalPrice - finalPrice) / originalPrice) * 100 : 0;

        // BLINDAGEM XSS
        const safeName = escapeHTML(pkg.name);
        const safeDesc = escapeHTML(pkg.description || 'Sem descrição');

        return `
            <div class="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col cursor-pointer"
                 data-action="edit-package" data-package='${packageDataString}'>
                
                <div class="p-4 flex-grow">
                    <div class="flex justify-between items-start">
                        <div class="min-w-0 pr-2">
                            <h3 class="text-base font-bold text-gray-900 truncate">${safeName}</h3>
                            <p class="text-xs text-gray-500 truncate">${safeDesc}</p>
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
                            <p class="text-sm font-semibold text-gray-800">${(pkg.items || []).length} Itens</p> 
                            <p class="text-xs text-gray-500">${pkg.commissionRate || 0}% Comissão</p>
                            <p class="text-xs text-gray-500 mt-1">${pkg.validityDays || '-'} Dias Validade</p>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 px-4 py-2 flex justify-end items-center gap-2 border-t">
                    <button data-action="delete-package" data-id="${pkg.id}" data-action-stop-propagation="true" class="text-sm font-semibold text-red-600 hover:text-red-800 py-1 px-2">Excluir</button>
                </div>
            </div>
        `;
    }).join('');
}

// --- FUNÇÕES DO MODAL DE CRIAÇÃO/EDIÇÃO ---

function closePackageModal() {
    const modal = document.getElementById('genericModal');
    modal.style.display = 'none';
    if (modalEventListener) {
        modal.removeEventListener('click', modalEventListener);
    }
}

async function openPackageModal(pkg = null) {
    const modal = document.getElementById('genericModal'); 
    const isEditing = !!pkg;
    const itemsInPackage = pkg ? JSON.parse(JSON.stringify(pkg.items || [])) : [];

    // BLINDAGEM XSS para inputs
    const safeName = escapeHTML(pkg?.name || '');
    const safeDesc = escapeHTML(pkg?.description || '');
    const safePrice = pkg?.price || '';
    const safeCommission = pkg?.commissionRate || 0;
    const safeValidity = pkg?.validityDays || 30;

    const contentHTML = `
        <div class="modal-content max-w-4xl overflow-y-auto max-h-[90vh]">
            <form id="package-form" class="flex flex-col h-full">
                <div class="p-4 sm:p-6 border-b flex justify-between items-center">
                    <h2 class="text-2xl font-bold text-gray-800">${isEditing ? 'Editar Pacote' : 'Criar Novo Pacote'}</h2>
                    <button type="button" data-action="close-modal" class="text-gray-500 hover:text-gray-800 text-3xl">&times;</button>
                </div>
                <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                    <input type="hidden" id="packageId" value="${pkg?.id || ''}">
                    
                    <div>
                        <h3 class="text-lg font-semibold text-gray-800 mb-2">Informações Básicas</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="packageName" class="block text-sm font-medium text-gray-700">Nome do Pacote</label>
                                <input type="text" id="packageName" value="${safeName}" class="mt-1 w-full p-2 border rounded-md" required>
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
                            <textarea id="packageDescription" rows="2" class="mt-1 w-full p-2 border rounded-md">${safeDesc}</textarea>
                        </div>
                    </div>

                    <div class="border-t pt-6">
                        <div class="flex justify-between items-center mb-2">
                            <h3 class="text-lg font-semibold text-gray-800">Itens Incluídos</h3>
                            <button type="button" id="add-item-to-package-btn" class="py-1 px-3 bg-indigo-600 text-white font-semibold rounded-lg text-sm hover:bg-indigo-700 transition shadow-sm">+ Adicionar Item</button>
                        </div>
                        <div id="package-items-list" class="space-y-2 max-h-48 overflow-y-auto p-2 border rounded-md bg-gray-50 min-h-[5rem]"></div>
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
                                <input type="number" step="0.01" id="finalPrice" value="${safePrice}" class="mt-1 w-full p-2 border rounded-md" required>
                            </div>
                            <div>
                                <label for="commissionRate" class="block text-sm font-medium text-gray-700">Comissão (%)</label>
                                <input type="number" id="commissionRate" value="${safeCommission}" class="mt-1 w-full p-2 border rounded-md" placeholder="Ex: 10">
                            </div>
                            <div>
                                <label for="validityDays" class="block text-sm font-medium text-gray-700">Validade (dias)</label>
                                <input type="number" id="validityDays" value="${safeValidity}" class="mt-1 w-full p-2 border rounded-md" placeholder="Ex: 30, 60, 90">
                            </div>
                        </div>
                    </div>

                </div>
                <footer class="p-4 border-t bg-gray-100 flex justify-end gap-3 flex-shrink-0">
                    <button type="button" data-action="close-modal" class="py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400">Cancelar</button>
                    <button type="button" data-action="save-package" class="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">Salvar Pacote</button>
                </footer>
            </form>
        </div>
    `;

    modal.innerHTML = contentHTML;
    modal.style.display = 'flex';

    const itemsListContainer = modal.querySelector('#package-items-list');
    
    const updatePrices = (items, modal) => {
        const originalPriceEl = modal.querySelector('#originalPrice');
        const originalPrice = items.reduce((acc, s) => acc + (s.price * s.quantity), 0);
        if (originalPriceEl) {
            originalPriceEl.textContent = `R$ ${originalPrice.toFixed(2)}`;
        }
    };
    
    const renderSelectedItems = (items) => {
        if (items.length === 0) {
            itemsListContainer.innerHTML = '<p class="text-center text-gray-500 p-4">Nenhum item adicionado.</p>';
        } else {
            itemsListContainer.innerHTML = items.map((item, index) => {
                const isService = item.type === 'service';
                const typeLabel = isService ? 'Serviço' : 'Produto';
                const typeBg = isService ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800';

                return `
                <div class="flex items-center justify-between bg-white p-2 rounded shadow-sm border border-gray-200">
                    <div class="flex items-center gap-3 min-w-0">
                        <input type="number" value="${item.quantity}" min="1" class="w-12 p-1 border rounded-md text-sm quantity-input flex-shrink-0" data-index="${index}">
                        <span class="text-xs font-medium px-2 py-0.5 rounded-full ${typeBg}">${typeLabel}</span>
                        <span class="font-medium text-gray-800 truncate">${escapeHTML(item.name)}</span>
                    </div>
                    <div class="flex items-center gap-2 flex-shrink-0">
                        <span class="text-sm text-gray-600">R$ ${item.price.toFixed(2)}</span>
                        <button type="button" class="text-red-500 hover:text-red-700 remove-item-btn font-bold" data-index="${index}">&times;</button>
                    </div>
                </div>
            `}).join('');
        }
        updatePrices(items, modal);
    };

    renderSelectedItems(itemsInPackage);

    itemsListContainer.addEventListener('change', (e) => {
        if (e.target.classList.contains('quantity-input')) {
            const index = parseInt(e.target.dataset.index, 10);
            const newQuantity = parseInt(e.target.value, 10);
            if (newQuantity > 0 && itemsInPackage[index]) {
                itemsInPackage[index].quantity = newQuantity;
                renderSelectedItems(itemsInPackage);
            }
        }
    });

    itemsListContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item-btn')) {
            const index = parseInt(e.target.dataset.index, 10);
            itemsInPackage.splice(index, 1);
            renderSelectedItems(itemsInPackage);
        }
    });
    
    modal.querySelector('#add-item-to-package-btn').onclick = () => openItemSelectionModal((selectedItem) => {
        const existing = itemsInPackage.find(s => s.id === selectedItem.id && s.type === selectedItem.type);
        if (existing) {
            existing.quantity++;
        } else {
            itemsInPackage.push({ ...selectedItem, quantity: 1 });
        }
        renderSelectedItems(itemsInPackage);
    });

    if (modalEventListener) {
        modal.removeEventListener('click', modalEventListener);
    }

    modalEventListener = async (e) => {
        const button = e.target.closest('button[data-action]');
        if (!button) return;

        const action = button.dataset.action;
        e.stopPropagation();

        if (action === 'close-modal') {
            closePackageModal();
        }

        if (action === 'save-package') {
            const saveButton = button;
            
            const data = {
                id: document.getElementById('packageId').value || null,
                name: document.getElementById('packageName').value,
                description: document.getElementById('packageDescription').value,
                status: document.getElementById('packageStatus').value,
                items: itemsInPackage, 
                originalPrice: itemsInPackage.reduce((acc, s) => acc + (s.price * s.quantity), 0),
                price: parseFloat(document.getElementById('finalPrice').value),
                commissionRate: parseFloat(document.getElementById('commissionRate').value) || 0,
                validityDays: parseInt(document.getElementById('validityDays').value, 10) || null,
                establishmentId: state.establishmentId // CORREÇÃO MULTITENANT
            };

            if (!data.name || !data.price) {
                 showNotification('Erro', 'Nome do Pacote e Preço Final são obrigatórios.', 'error');
                 return;
            }

            if (data.items.length === 0) {
                showNotification('Erro', 'Adicione pelo menos um item ao pacote.', 'error');
                return;
            }

            saveButton.disabled = true;
            saveButton.textContent = 'A salvar...';

            try {
                if (isEditing) {
                    await packagesApi.updatePackage(data.id, data);
                } else {
                    delete data.id;
                    await packagesApi.createPackage(data);
                }
                showNotification('Sucesso!', `Pacote ${isEditing ? 'atualizado' : 'criado'} com sucesso.`, 'success');
                closePackageModal();
                await loadPackagesPage();
            } catch (error) {
                showNotification('Erro', `Não foi possível salvar o pacote: ${error.message}`, 'error');
                saveButton.disabled = false;
                saveButton.textContent = 'Salvar Pacote';
            }
        }
    };
    
    modal.addEventListener('click', modalEventListener);
}

// (NOVO) Modal para selecionar Serviços ou Produtos
function openItemSelectionModal(onSelect) {
    let searchTerm = '';

    const modalContainer = document.createElement('div');
    modalContainer.id = 'item-selection-modal';
    modalContainer.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[110]';

    const icons = {
        service: '<svg class="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',
        product: '<svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>',
    };

    const renderLists = (listContainer) => {
        const term = searchTerm.toLowerCase();
        
        const services = localState.catalogForModal.services.filter(s => s.name.toLowerCase().includes(term));
        const products = localState.catalogForModal.products.filter(p => p.name.toLowerCase().includes(term));

        const servicesHTML = services.map(item => `
            <button data-action="select-item" data-item-type="service" data-item-id="${item.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${icons.service}</div>
                <span class="flex-grow text-left min-w-0 truncate">${escapeHTML(item.name)}</span>
                <span class="font-semibold flex-shrink-0">R$ ${item.price.toFixed(2)}</span>
            </button>
        `).join('') || `<p class="text-xs text-gray-400 text-center p-4">Nenhum serviço encontrado.</p>`;
        
        const productsHTML = products.map(item => `
            <button data-action="select-item" data-item-type="product" data-item-id="${item.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${icons.product}</div>
                <span class="flex-grow text-left min-w-0 truncate">${escapeHTML(item.name)}</span>
                <span class="font-semibold flex-shrink-0">R$ ${item.price.toFixed(2)}</span>
            </button>
        `).join('') || `<p class="text-xs text-gray-400 text-center p-4">Nenhum produto encontrado.</p>`;

        listContainer.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><h4 class="font-semibold mb-2 text-center text-indigo-600">Serviços</h4><div id="modal-service-list" class="space-y-2 max-h-96 overflow-y-auto">${servicesHTML}</div></div>
                <div><h4 class="font-semibold mb-2 text-center text-green-600">Produtos</h4><div id="modal-product-list" class="space-y-2 max-h-96 overflow-y-auto">${productsHTML}</div></div>
            </div>
        `;
    };

    modalContainer.innerHTML = `
        <div class="bg-white rounded-lg shadow-xl w-full max-w-lg sm:max-w-3xl flex flex-col max-h-[80vh]">
            <header class="p-4 border-b flex justify-between items-center">
                <h2 class="text-xl font-bold text-gray-800">Selecionar Item</h2>
                <button data-action="close-selection-modal" class="text-2xl font-bold text-gray-500 hover:text-gray-900">&times;</button>
            </header>
            <div class="p-4 border-b">
                <input type="search" id="item-search-input" placeholder="Pesquisar por nome..." class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </div>
            <div id="item-selection-list" class="flex-1 overflow-y-auto p-4">
            </div>
        </div>
    `;

    document.body.appendChild(modalContainer);

    const listContainer = modalContainer.querySelector('#item-selection-list');
    const searchInput = modalContainer.querySelector('#item-search-input');
    
    const closeThisModal = () => {
        modalContainer.remove();
    };

    renderLists(listContainer);
    
    searchInput.addEventListener('input', () => {
        searchTerm = searchInput.value;
        renderLists(listContainer);
    });

    modalContainer.addEventListener('click', (e) => {
        const selectBtn = e.target.closest('[data-action="select-item"]');
        const closeButton = e.target.closest('[data-action="close-selection-modal"]');
        
        if (selectBtn) {
            const { itemType, itemId } = selectBtn.dataset;
            const catalog = localState.catalogForModal[itemType + 's'] || [];
            const item = catalog.find(i => i.id === itemId);
            if (item) {
                onSelect({ ...item, type: itemType }); 
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
        <section id="packages-page" class="p-4 sm:p-6">
             <div class="sticky top-0 z-10 bg-gray-100 sm:bg-transparent pt-3 pb-4 mb-6 -mx-4 -mt-4 sm:mx-0 sm:mt-0 sm:bg-transparent sm:pt-0 sm:pb-0 sm:static">
                <div class="flex justify-between items-center px-4 sm:px-0">
                    <h2 class="text-2xl sm:text-3xl font-bold text-gray-800">Pacotes de Serviços</h2>
                </div>
            </div>
            
            <div id="packagesListContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-20">
                ${renderSkeletonList()}
            </div>
            
            <button data-action="new-package" class="fixed z-30 bottom-20 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-transform hover:scale-105">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </button>
        </section>
    `;

    if (pageEventListener) {
        contentDiv.removeEventListener('click', pageEventListener);
    }

    pageEventListener = (e) => {
        if (e.target.closest('[data-action-stop-propagation="true"]')) {
            e.stopPropagation();
            const deleteButton = e.target.closest('[data-action="delete-package"]');
            if (deleteButton) {
                 const pkgId = deleteButton.dataset.id;
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
            return;
        }

        const target = e.target.closest('[data-action="new-package"], [data-action="edit-package"]');
        if (!target) return;

        const action = target.dataset.action;

        if (action === 'new-package') {
            openPackageModal(null); 
        } else if (action === 'edit-package') {
            const pkg = JSON.parse(target.dataset.package);
            openPackageModal(pkg);
        }
    };
    
    contentDiv.addEventListener('click', pageEventListener);

    try {
        const [packages, services, products] = await Promise.all([
            packagesApi.getPackages(state.establishmentId),
            servicesApi.getServices(state.establishmentId),
            productsApi.getProducts(state.establishmentId) 
        ]);
        localState.allPackages = packages;
        localState.catalogForModal = {
            services: services.filter(s => s.active),
            products: products 
        };
        renderPackagesList(); 
    } catch (error) {
        document.getElementById('packagesListContainer').innerHTML = '<p class="text-red-500 col-span-full">Erro ao carregar pacotes.</p>';
    }
}