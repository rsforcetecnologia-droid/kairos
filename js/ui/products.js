// js/ui/products.js

// --- 1. IMPORTAÇÕES ---
import * as productsApi from '../api/products.js';
import * as categoriesApi from '../api/categories.js';
import { state } from '../state.js';
import { showNotification, showConfirmation } from '../components/modal.js';

// --- 2. CONSTANTES E VARIÁVEIS DO MÓDULO ---
const contentDiv = document.getElementById('content');

// --- 3. FUNÇÕES DE LÓGICA E RENDERIZAÇÃO ---

// --- LÓGICA DE CATEGORIAS ---

async function handleCategoryFormSubmit(e) {
    e.preventDefault();
    const categoryNameInput = document.getElementById('categoryName');
    const name = categoryNameInput.value;
    if (!name) return;

    try {
        await categoriesApi.createCategory({ establishmentId: state.establishmentId, name });
        categoryNameInput.value = '';
        await fetchAndDisplayCategories();
    } catch (error) {
        showNotification('Erro', `Não foi possível criar a categoria: ${error.message}`, 'error');
    }
}

async function handleDeleteCategory(categoryId) {
    const confirmed = await showConfirmation('Apagar Categoria', 'Tem a certeza? Os produtos nesta categoria ficarão sem categoria.');
    if (confirmed) {
        try {
            await categoriesApi.deleteCategory(categoryId);
            await fetchAndDisplayCategories();
        } catch (error) {
            showNotification('Erro', 'Não foi possível apagar a categoria.', 'error');
        }
    }
}

async function fetchAndDisplayCategories() {
    const listDiv = document.getElementById('categoryList');
    if (!listDiv) return;
    listDiv.innerHTML = '<div class="loader mx-auto"></div>';
    try {
        const categories = await categoriesApi.getCategories(state.establishmentId);
        state.categories = categories;
        listDiv.innerHTML = '';
        if (categories.length > 0) {
            categories.forEach(cat => {
                const item = document.createElement('div');
                item.className = 'flex justify-between items-center bg-gray-100 p-2 rounded';
                item.innerHTML = `
                    <span>${cat.name}</span>
                    <button data-action="delete-category" data-id="${cat.id}" class="text-red-500 hover:text-red-700">Apagar</button>
                `;
                listDiv.appendChild(item);
            });
        } else {
            listDiv.innerHTML = '<p class="text-center text-gray-500">Nenhuma categoria encontrada.</p>';
        }
    } catch (error) {
        listDiv.innerHTML = '<p class="text-red-500">Erro ao carregar categorias.</p>';
    }
}

function openCategoryModal() {
    const modal = document.getElementById('categoryModal');
    modal.innerHTML = `
    <div class="modal-content max-w-lg">
        <h2 class="text-2xl font-bold mb-6">Gerir Categorias de Produtos</h2>
        <div class="mb-6">
            <form id="categoryForm" class="flex gap-4">
                <input type="text" id="categoryName" placeholder="Nome da nova categoria" required class="flex-grow block w-full rounded-md border-gray-300 shadow-sm">
                <button type="submit" class="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg">Adicionar</button>
            </form>
        </div>
        <div id="categoryList" class="space-y-2 max-h-64 overflow-y-auto"></div>
        <div class="mt-6">
            <button type="button" data-action="close-modal" data-target="categoryModal" class="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg">Fechar</button>
        </div>
    </div>`;
    modal.style.display = 'flex';
    modal.querySelector('#categoryForm').addEventListener('submit', handleCategoryFormSubmit);
    fetchAndDisplayCategories();
}

// --- LÓGICA DE PRODUTOS ---

async function handleProductFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const productId = form.querySelector('#productId').value;
    const productData = {
        establishmentId: state.establishmentId,
        name: form.querySelector('#productName').value,
        price: parseFloat(form.querySelector('#productPrice').value),
        currentStock: parseInt(form.querySelector('#productCurrentStock').value),
        minStock: parseInt(form.querySelector('#productMinStock').value),
        maxStock: parseInt(form.querySelector('#productMaxStock').value),
        categoryId: form.querySelector('#productCategory').value,
        photo: form.querySelector('#productPhotoBase64').value
    };

    try {
        if (productId) {
            await productsApi.updateProduct(productId, productData);
        } else {
            await productsApi.createProduct(productData);
        }
        document.getElementById('productModal').style.display = 'none';
        showNotification('Sucesso', `Produto ${productId ? 'atualizado' : 'adicionado'} com sucesso!`, 'success');
        await fetchProductsAndCategories();
    } catch (error) {
        showNotification('Erro', error.message, 'error');
    }
}

function openProductModal(product = null) {
    const modal = document.getElementById('productModal');
    modal.innerHTML = `
    <div class="modal-content max-w-2xl">
        <h2 id="productModalTitle" class="text-2xl font-bold mb-6">Novo Produto</h2>
        <form id="productForm" class="space-y-6">
            <input type="hidden" id="productId">
            <input type="hidden" id="productPhotoBase64">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="md:col-span-1">
                    <label class="block text-sm font-medium text-gray-700">Imagem do Produto</label>
                    <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div class="space-y-1 text-center">
                            <img id="productPhotoPreview" src="https://placehold.co/128x128/E2E8F0/4A5568?text=Foto" class="mx-auto h-24 w-24 rounded-md object-cover mb-2">
                            <div class="flex text-sm text-gray-600">
                                <label for="productPhotoInput" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                                    <span>Carregar ficheiro</span>
                                    <input id="productPhotoInput" type="file" class="sr-only" accept="image/*">
                                </label>
                            </div>
                            <p class="text-xs text-gray-500">PNG, JPG, GIF até 10MB</p>
                        </div>
                    </div>
                </div>
                <div class="md:col-span-2 space-y-4">
                    <div>
                        <label for="productName" class="block text-sm font-medium text-gray-700">Nome do Produto</label>
                        <input type="text" id="productName" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    </div>
                    <div>
                        <label for="productCategory" class="block text-sm font-medium text-gray-700">Categoria</label>
                        <select id="productCategory" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></select>
                    </div>
                    <div>
                        <label for="productPrice" class="block text-sm font-medium text-gray-700">Preço (R$)</label>
                        <input type="number" id="productPrice" step="0.01" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    </div>
                </div>
            </div>
            <div class="border-t pt-6">
                <h3 class="text-lg font-semibold text-gray-700 text-left mb-2">Controlo de Stock</h3>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label for="productCurrentStock" class="block text-sm font-medium text-gray-700">Atual</label>
                        <input type="number" id="productCurrentStock" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    </div>
                    <div>
                        <label for="productMinStock" class="block text-sm font-medium text-gray-700">Mínimo</label>
                        <input type="number" id="productMinStock" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    </div>
                    <div>
                        <label for="productMaxStock" class="block text-sm font-medium text-gray-700">Máximo</label>
                        <input type="number" id="productMaxStock" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    </div>
                </div>
            </div>
            <div class="flex gap-4 pt-4">
                <button type="button" data-action="close-modal" data-target="productModal" class="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg">Cancelar</button>
                <button type="submit" class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg">Salvar</button>
            </div>
        </form>
    </div>`;

    const form = modal.querySelector('#productForm');
    const title = modal.querySelector('#productModalTitle');
    const categorySelect = modal.querySelector('#productCategory');
    const photoPreview = modal.querySelector('#productPhotoPreview');
    const photoBase64Input = modal.querySelector('#productPhotoBase64');
    const photoInput = modal.querySelector('#productPhotoInput');

    form.addEventListener('submit', handleProductFormSubmit);

    categorySelect.innerHTML = '<option value="">Sem categoria</option>' + state.categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');

    if (product) {
        title.textContent = 'Editar Produto';
        form.querySelector('#productId').value = product.id;
        form.querySelector('#productName').value = product.name;
        form.querySelector('#productPrice').value = product.price;
        form.querySelector('#productCurrentStock').value = product.currentStock;
        form.querySelector('#productMinStock').value = product.minStock;
        form.querySelector('#productMaxStock').value = product.maxStock;
        categorySelect.value = product.categoryId || '';
        if (product.photo) {
            photoPreview.src = product.photo;
            photoBase64Input.value = product.photo;
        }
    } else {
        title.textContent = 'Novo Produto';
    }

    photoInput.onchange = () => {
        const file = photoInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = e => {
                photoPreview.src = e.target.result;
                photoBase64Input.value = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    modal.style.display = 'flex';
}

function renderProductsList() {
    const listDiv = document.getElementById('productsList');
    const searchTerm = document.getElementById('productSearchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('productCategoryFilter').value;

    const filteredProducts = state.products.filter(p => {
        const nameMatch = p.name.toLowerCase().includes(searchTerm);
        const categoryMatch = categoryFilter === 'all' || p.categoryId === categoryFilter;
        return nameMatch && categoryMatch;
    });

    listDiv.innerHTML = '';
    if (filteredProducts.length > 0) {
        filteredProducts.forEach(p => {
            const card = document.createElement('div');
            let stockColorClass = 'bg-green-100 text-green-800', borderColorClass = 'border-green-500', progressBgClass = 'bg-green-500', stockStatusText = 'OK';
            if (p.currentStock <= 0) {
                stockColorClass = 'bg-red-100 text-red-800'; borderColorClass = 'border-red-500'; progressBgClass = 'bg-red-500'; stockStatusText = 'Esgotado';
            } else if (p.minStock > 0 && p.currentStock <= p.minStock) {
                stockColorClass = 'bg-yellow-100 text-yellow-800'; borderColorClass = 'border-yellow-500'; progressBgClass = 'bg-yellow-500'; stockStatusText = 'Baixo';
            }
            const category = state.categories.find(c => c.id === p.categoryId);
            const photoSrc = p.photo || `https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(p.name.charAt(0))}`;
            const productDataString = JSON.stringify(p).replace(/'/g, "&apos;");

            // --- ALTERAÇÕES APLICADAS AQUI ---
            card.className = `product-card bg-white rounded-lg shadow-md flex flex-col overflow-hidden transition-all duration-300`;
            card.innerHTML = `
                <img src="${photoSrc}" alt="Imagem de ${p.name}" class="w-full h-20 object-cover">
                <div class="p-2 flex flex-col flex-grow">
                    <div class="flex-grow">
                        ${category ? `<p class="text-[10px] font-semibold text-indigo-600 uppercase mb-1">${category.name}</p>` : ''}
                        <div class="flex justify-between items-start gap-1">
                            <h3 class="text-xs font-bold text-gray-900 text-left flex-1 leading-tight">${p.name}</h3>
                            <span class="text-sm font-bold text-blue-600 whitespace-nowrap">R$ ${p.price.toFixed(2)}</span>
                        </div>
                        <div class="text-center my-1">
                            <p class="text-lg font-bold text-gray-800">${p.currentStock}</p>
                            <div class="text-xs text-gray-500 flex justify-between items-center">
                                <span>Mín: ${p.minStock}</span>
                                <span class="px-1.5 py-0.5 text-[10px] font-semibold rounded-full ${stockColorClass}">${stockStatusText}</span>
                                <span>Máx: ${p.maxStock}</span>
                            </div>
                        </div>
                    </div>
                    <div class="mt-2 pt-2 border-t space-y-1">
                        <div class="grid grid-cols-2 gap-1">
                            <button data-action="adjust-stock" data-product-id="${p.id}" data-change="-1" class="text-xs font-semibold bg-red-100 text-red-700 rounded py-1 px-2 hover:bg-red-200">Saída</button>
                            <button data-action="adjust-stock" data-product-id="${p.id}" data-change="1" class="text-xs font-semibold bg-green-100 text-green-700 rounded py-1 px-2 hover:bg-green-200">Entrada</button>
                        </div>
                        <div class="flex items-center justify-end gap-1">
                            <button data-action="edit-product" data-product='${productDataString}' class="text-gray-500 hover:text-blue-600 p-1" title="Editar"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg></button>
                            <button data-action="delete-product" data-id="${p.id}" class="text-gray-500 hover:text-red-600 p-1" title="Apagar"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                        </div>
                    </div>
                </div>`;
            listDiv.appendChild(card);
        });
    } else {
        listDiv.innerHTML = `<p class="col-span-full text-center text-gray-500">Nenhum produto encontrado.</p>`;
    }
}


async function fetchProductsAndCategories() {
    const listDiv = document.getElementById('productsList');
    listDiv.innerHTML = '<div class="loader col-span-full mx-auto"></div>';
    try {
        const [products, categories] = await Promise.all([
            productsApi.getProducts(state.establishmentId),
            categoriesApi.getCategories(state.establishmentId)
        ]);
        state.products = products;
        state.categories = categories;

        const categoryFilter = document.getElementById('productCategoryFilter');
        categoryFilter.innerHTML = '<option value="all">Todas as categorias</option>';
        state.categories.forEach(cat => categoryFilter.innerHTML += `<option value="${cat.id}">${cat.name}</option>`);

        renderProductsList();
    } catch (error) {
        listDiv.innerHTML = '<p class="text-red-500 col-span-full">Erro ao carregar dados.</p>';
    }
}

// --- 5. EVENT LISTENERS E INICIALIZAÇÃO DA PÁGINA ---

function setupEventListeners() {
    const pageHandler = async (e) => {
        const button = e.target.closest('button[data-action]');
        if (!button) return;

        const action = button.dataset.action;
        const productId = button.dataset.productId || button.dataset.id;

        if (action === 'new-product') {
            openProductModal();
        } else if (action === 'edit-product') {
            const productData = JSON.parse(button.dataset.product);
            openProductModal(productData);
        } else if (action === 'delete-product') {
            const confirmed = await showConfirmation('Apagar Produto', 'Tem a certeza que deseja apagar este produto?');
            if (confirmed) {
                try {
                    await productsApi.deleteProduct(productId);
                    showNotification('Sucesso', 'Produto apagado.', 'success');
                    await fetchProductsAndCategories();
                } catch (error) {
                    showNotification('Erro', `Não foi possível apagar o produto: ${error.message}`, 'error');
                }
            }
        } else if (action === 'adjust-stock') {
            const change = parseInt(button.dataset.change, 10);
            try {
                await productsApi.adjustStock(productId, { change, reason: 'Ajuste manual' });
                const productIndex = state.products.findIndex(p => p.id === productId);
                if (productIndex > -1) {
                    state.products[productIndex].currentStock += change;
                    renderProductsList();
                }
            } catch (error) {
                showNotification('Erro de Stock', error.message, 'error');
            }
        } else if (action === 'manage-categories') {
            openCategoryModal();
        } else if (action === 'delete-category') {
            handleDeleteCategory(button.dataset.id);
        }
    };

    contentDiv.addEventListener('click', pageHandler);
    contentDiv.addEventListener('input', e => {
        if (e.target.id === 'productSearchInput') renderProductsList();
    });
    contentDiv.addEventListener('change', e => {
        if (e.target.id === 'productCategoryFilter') renderProductsList();
    });

    document.getElementById('categoryModal').addEventListener('click', e => {
        const button = e.target.closest('button[data-action="delete-category"]');
        if (button) handleDeleteCategory(button.dataset.id);
    });
}

// --- 6. FUNÇÃO PRINCIPAL EXPORTADA ---

export async function loadProductsPage() {
    contentDiv.innerHTML = `
        <section>
            <div class="flex flex-wrap gap-4 justify-between items-center mb-6">
                <h2 class="text-3xl font-bold text-gray-800">Produtos e Stock</h2>
                <div class="flex items-center gap-4">
                    <button data-action="manage-categories" class="py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700">Gerir Categorias</button>
                    <button data-action="new-product" class="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">Adicionar Produto</button>
                </div>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-md mb-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" id="productSearchInput" placeholder="Pesquisar por nome do produto..." class="w-full p-2 border rounded-md">
                    <select id="productCategoryFilter" class="w-full p-2 border rounded-md">
                        <option value="all">Todas as categorias</option>
                    </select>
                </div>
            </div>
            <div id="productsList" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4"></div>
        </section>`;

    setupEventListeners();
    await fetchProductsAndCategories();
}