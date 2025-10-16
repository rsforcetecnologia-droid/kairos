// rsforcetecnologia-droid/kairos/kairos-aaa61fc2d5245a1c14d229ce794eaaa3acd28154/js/ui/products.js

// --- 1. IMPORTAÇÕES ---
import * as productsApi from '../api/products.js';
import * as categoriesApi from '../api/categories.js';
import { state } from '../state.js';
import { showNotification, showConfirmation, showGenericModal } from '../components/modal.js';
import { navigateTo } from '../main.js';

// --- 2. CONSTANTES E VARIÁVEIS DO MÓDULO ---
const contentDiv = document.getElementById('content');
let pageEventListener = null;
let currentView = 'products'; // 'products' ou 'movements'
let activeStockFilter = 'all'; // Filtro para os cartões de indicadores

// --- 3. LÓGICA DE CATEGORIAS (MODAL) ---
async function handleCategoryFormSubmit(e) {
    e.preventDefault();
    const categoryNameInput = document.getElementById('categoryName');
    const name = categoryNameInput.value;
    if (!name) return;
    try {
        // CORREÇÃO: Chama a API de criação de categoria de PRODUTOS
        await categoriesApi.createCategory({ establishmentId: state.establishmentId, name });
        categoryNameInput.value = '';
        showNotification('Sucesso', 'Categoria de produto criada!', 'success');
        await fetchAndDisplayCategoriesInModal();
        await fetchBaseData(); // Atualiza os filtros na página principal
    } catch (error) {
        showNotification('Erro', `Não foi possível criar a categoria: ${error.message}`, 'error');
    }
}

async function handleDeleteCategory(categoryId) {
    const confirmed = await showConfirmation('Apagar Categoria', 'Tem a certeza? Os produtos nesta categoria ficarão sem categoria.');
    if (confirmed) {
        try {
            await categoriesApi.deleteCategory(categoryId);
            showNotification('Sucesso', 'Categoria de produto apagada.', 'success');
            await fetchAndDisplayCategoriesInModal();
            await fetchBaseData(); // Atualiza os filtros na página principal
        } catch (error) {
            showNotification('Erro', 'Não foi possível apagar a categoria.', 'error');
        }
    }
}

async function fetchAndDisplayCategoriesInModal() {
    const listDiv = document.getElementById('categoryList');
    if (!listDiv) return;
    listDiv.innerHTML = '<div class="loader mx-auto my-4"></div>';
    try {
        const categories = await categoriesApi.getCategories(state.establishmentId);
        state.categories = categories;
        listDiv.innerHTML = '';
        if (categories.length > 0) {
            listDiv.innerHTML = categories.map(cat => `
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${cat.name}</span>
                    <button data-action="delete-category" data-id="${cat.id}" class="text-red-500 hover:text-red-700">Apagar</button>
                </div>`).join('');
        } else {
            listDiv.innerHTML = '<p class="text-center text-gray-500">Nenhuma categoria encontrada.</p>';
        }
    } catch (error) {
        listDiv.innerHTML = `<p class="text-red-500">Erro ao carregar categorias.</p>`;
    }
}

function openCategoryModal() {
    const contentHTML = `
        <div class="space-y-4">
            <div class="mb-4">
                <form id="categoryForm" class="flex gap-4 items-end">
                    <div class="flex-1">
                        <label for="categoryName" class="block text-sm font-medium text-gray-700">Nova Categoria</label>
                        <input type="text" id="categoryName" placeholder="Nome da nova categoria" required class="mt-1 w-full p-2 border rounded-md">
                    </div>
                    <button type="submit" class="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">Adicionar</button>
                </form>
            </div>
            <div id="categoryList" class="space-y-2 max-h-64 overflow-y-auto p-2 border rounded-md"></div>
        </div>
    `;

    // Utiliza showGenericModal que injeta o conteúdo no modal genérico
    showGenericModal({
        title: "Gerir Categorias de Produtos",
        contentHTML: contentHTML,
        maxWidth: 'max-w-xl'
    });
    
    // O modal genérico já está visível, basta anexar os listeners ao seu conteúdo
    const modalElement = document.getElementById('genericModal');
    if (modalElement) {
        const categoryForm = modalElement.querySelector('#categoryForm');
        if (categoryForm) {
            categoryForm.addEventListener('submit', handleCategoryFormSubmit);
            modalElement.addEventListener('click', (e) => {
                 const button = e.target.closest('button[data-action="delete-category"]');
                 // O ID do modal principal é 'categoryModal', mas estamos usando 'genericModal' no novo fluxo
                 if (button) handleDeleteCategory(button.dataset.id);
            });
        }
    }

    fetchAndDisplayCategoriesInModal();
}

// --- LÓGICA DE PRODUTOS E ESTOQUE ---

async function handleProductFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const productId = form.querySelector('#productId').value;
    const productData = {
        establishmentId: state.establishmentId,
        name: form.querySelector('#productName').value,
        price: parseFloat(form.querySelector('#productPrice').value),
        commissionRate: parseFloat(form.querySelector('#productCommissionRate').value) || 0,
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
        await fetchBaseData(); // Recarrega os dados
    } catch (error) {
        showNotification('Erro', error.message, 'error');
    }
}

function openProductModal(product = null) {
    const modal = document.getElementById('productModal');
    modal.innerHTML = `
    <div class="modal-content max-w-3xl">
        <h2 id="productModalTitle" class="text-2xl font-bold mb-6">${product ? 'Editar' : 'Novo'} Produto</h2>
        <form id="productForm">
            <input type="hidden" id="productId" value="${product?.id || ''}">
            <input type="hidden" id="productPhotoBase64" value="${product?.photo || ''}">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="md:col-span-1 space-y-4">
                    <div class="form-group"><label>Imagem do Produto</label><div class="mt-1 flex flex-col items-center"><img id="productPhotoPreview" src="${product?.photo || 'https://placehold.co/128x128/E2E8F0/4A5568?text=Foto'}" alt="Foto do Produto" class="w-32 h-32 rounded-lg object-cover mb-3 border-4 border-gray-200 bg-gray-50"><input type="file" id="productPhotoInput" class="hidden" accept="image/*"><button type="button" id="productPhotoButton" class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Alterar Imagem</button></div></div>
                </div>
                <div class="md:col-span-2"><div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5"><div class="form-group sm:col-span-2"><label for="productName">Nome do Produto</label><input type="text" id="productName" value="${product?.name || ''}" required></div><div class="form-group sm:col-span-2"><label for="productCategory">Categoria</label><select id="productCategory"></select></div><div class="form-group"><label for="productPrice">Preço (R$)</label><input type="number" id="productPrice" step="0.01" value="${product?.price || ''}" required></div><div class="form-group"><label for="productCommissionRate">Comissão (%)</label><input type="number" id="productCommissionRate" placeholder="Ex: 10" value="${product?.commissionRate || ''}"></div></div></div>
            </div>
            <div class="mt-6 pt-6 border-t"><h3 class="text-lg font-semibold text-gray-700 text-left mb-4">Controlo de Stock</h3><div class="grid grid-cols-1 sm:grid-cols-3 gap-6"><div class="form-group"><label for="productCurrentStock">Atual</label><input type="number" id="productCurrentStock" value="${product?.currentStock || 0}"></div><div class="form-group"><label for="productMinStock">Mínimo</label><input type="number" id="productMinStock" value="${product?.minStock || 0}"></div><div class="form-group"><label for="productMaxStock">Máximo</label><input type="number" id="productMaxStock" value="${product?.maxStock || 0}"></div></div></div>
            <div class="mt-8 pt-6 border-t flex justify-end gap-4"><button type="button" data-action="close-modal" data-target="productModal" class="py-2 px-6 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">Cancelar</button><button type="submit" class="py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Salvar</button></div>
        </form>
    </div>`;

    const form = modal.querySelector('#productForm');
    const categorySelect = modal.querySelector('#productCategory');
    const photoInput = modal.querySelector('#productPhotoInput');
    
    form.addEventListener('submit', handleProductFormSubmit);
    modal.querySelector('#productPhotoButton').addEventListener('click', () => photoInput.click());

    categorySelect.innerHTML = '<option value="">Sem categoria</option>' + state.categories.map(cat => `<option value="${cat.id}" ${product?.categoryId === cat.id ? 'selected' : ''}>${cat.name}</option>`).join('');
    if(product) categorySelect.value = product.categoryId || '';

    photoInput.onchange = () => {
        const file = photoInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = e => {
                modal.querySelector('#productPhotoPreview').src = e.target.result;
                modal.querySelector('#productPhotoBase64').value = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    modal.style.display = 'flex';
}

// --- FUNÇÕES DE RENDERIZAÇÃO DAS ABAS ---

function renderProductsView() {
    const container = document.getElementById('products-content-container');
    container.innerHTML = `
        <div class="flex flex-wrap gap-4 justify-between items-center mb-6">
            <div class="flex items-center gap-4"><input type="text" id="productSearchInput" placeholder="Pesquisar..." class="w-64 p-2 border rounded-md"><select id="productCategoryFilter" class="p-2 border rounded-md bg-white"><option value="all">Todas as categorias</option></select></div>
            <div class="flex items-center gap-2"><button data-action="new-product" class="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600">Adicionar produto</button><button class="py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300">Imprimir</button></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div data-action="filter-stock" data-filter-type="ok" class="indicator-card bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg flex items-center gap-4 cursor-pointer transition-all"><div class="bg-green-100 p-2 rounded-full"><svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.085a2 2 0 00-1.736.93L5.5 8m7 2H5m7 2v4m0 0H5"></path></svg></div><div><p class="text-sm text-gray-500">Estoque em dia</p><p id="indicator-ok" class="text-2xl font-bold text-gray-800">0</p></div></div>
            <div data-action="filter-stock" data-filter-type="near_min" class="indicator-card bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg flex items-center gap-4 cursor-pointer transition-all"><div class="bg-blue-100 p-2 rounded-full"><svg class="w-6 h-6 text-blue-600 transform -rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6z"></path><path fill-rule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-7a7 7 0 100 14 7 7 0 000-14z" clip-rule="evenodd"></path></svg></div><div><p class="text-sm text-gray-500">Perto do mínimo</p><p id="indicator-near-min" class="text-2xl font-bold text-gray-800">0</p></div></div>
            <div data-action="filter-stock" data-filter-type="at_min" class="indicator-card bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg flex items-center gap-4 cursor-pointer transition-all"><div class="bg-orange-100 p-2 rounded-full"><svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg></div><div><p class="text-sm text-gray-500">Utilizando o mínimo</p><p id="indicator-at-min" class="text-2xl font-bold text-gray-800">0</p></div></div>
            <div data-action="filter-stock" data-filter-type="empty" class="indicator-card bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-center gap-4 cursor-pointer transition-all"><div class="bg-red-100 p-2 rounded-full"><svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg></div><div><p class="text-sm text-gray-500">Esgotado</p><p id="indicator-empty" class="text-2xl font-bold text-gray-800">0</p></div></div>
        </div>
        <div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estoque (Min/Max)</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Movimentação do estoque</th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ação</th></tr></thead><tbody id="productsTableBody" class="bg-white divide-y divide-gray-200"></tbody></table></div>`;
    
    const categoryFilter = document.getElementById('productCategoryFilter');
    if (categoryFilter) {
        categoryFilter.innerHTML = '<option value="all">Todas as categorias</option>';
        state.categories.forEach(cat => categoryFilter.innerHTML += `<option value="${cat.id}">${cat.name}</option>`);
    }
    renderStockIndicators();
    renderProductsTable();
}

function renderStockReportView() {
    const container = document.getElementById('products-content-container');
    const today = new Date().toISOString().split('T')[0];
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];

    container.innerHTML = `
        <div class="space-y-6">
             <div class="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div><label for="reportStartDate" class="block text-sm font-medium text-gray-700">De</label><input type="date" id="reportStartDate" value="${thirtyDaysAgoStr}" class="mt-1 w-full p-2 border rounded-md"></div>
                <div><label for="reportEndDate" class="block text-sm font-medium text-gray-700">Até</label><input type="date" id="reportEndDate" value="${today}" class="mt-1 w-full p-2 border rounded-md"></div>
                <div><label for="productFilterReport" class="block text-sm font-medium text-gray-700">Produto</label><select id="productFilterReport" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="all">Todos os Produtos</option></select></div>
                <div><label for="categoryFilterReport" class="block text-sm font-medium text-gray-700">Categoria</label><select id="categoryFilterReport" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="all">Todas as Categorias</option></select></div>
                <button data-action="generate-report" class="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700">Gerar Relatório</button>
            </div>
            <div id="report-results" class="bg-white border rounded-lg shadow-sm overflow-x-auto">
                <p class="text-center text-gray-500 py-8">Selecione os filtros e clique em "Gerar Relatório".</p>
            </div>
        </div>`;

    const productFilter = document.getElementById('productFilterReport');
    const categoryFilter = document.getElementById('categoryFilterReport');
    if (productFilter && state.products) productFilter.innerHTML += state.products.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
    if (categoryFilter && state.categories) categoryFilter.innerHTML += state.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
}

async function generateStockReport() {
    const resultsContainer = document.getElementById('report-results');
    resultsContainer.innerHTML = '<div class="loader mx-auto my-8"></div>';

    const filters = {
        startDate: document.getElementById('reportStartDate').value,
        endDate: document.getElementById('reportEndDate').value,
        productId: document.getElementById('productFilterReport').value,
        categoryId: document.getElementById('categoryFilterReport').value,
    };

    try {
        const reportData = await productsApi.getStockReport(filters);
        if (reportData.length === 0) {
            resultsContainer.innerHTML = '<p class="text-center text-gray-500 py-8">Nenhuma movimentação de stock encontrada.</p>';
            return;
        }
        resultsContainer.innerHTML = `
            <table class="min-w-full text-sm">
                <thead class="bg-gray-50"><tr><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th><th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Alteração</th><th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Anterior</th><th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Novo</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motivo</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilizador</th></tr></thead>
                <tbody class="divide-y divide-gray-200">
                    ${reportData.map(item => `
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 whitespace-nowrap">${new Date(item.date).toLocaleString('pt-BR')}</td>
                            <td class="px-4 py-3 whitespace-nowrap font-semibold">${item.productName}</td>
                            <td class="px-4 py-3 whitespace-nowrap text-center font-bold ${item.change > 0 ? 'text-green-600' : 'text-red-600'}">${item.change > 0 ? '+' : ''}${item.change}</td>
                            <td class="px-4 py-3 whitespace-nowrap text-center">${item.oldStock}</td>
                            <td class="px-4 py-3 whitespace-nowrap text-center">${item.newStock}</td>
                            <td class="px-4 py-3 whitespace-nowrap text-gray-600">${item.reason}</td>
                            <td class="px-4 py-3 whitespace-nowrap text-gray-600">${item.user}</td>
                        </tr>`).join('')}
                </tbody>
            </table>`;
    } catch (error) {
        showNotification('Erro', `Não foi possível gerar o relatório: ${error.message}`, 'error');
        resultsContainer.innerHTML = `<p class="text-center text-red-500 py-8">${error.message}</p>`;
    }
}

// --- FUNÇÕES DE CONTROLO ---

function renderStockIndicators() {
    const indicators = { ok: 0, near_min: 0, at_min: 0, empty: 0 };
    if (!state.products) return;
    state.products.forEach(p => {
        const stock = p.currentStock;
        const min = p.minStock;
        if (stock <= 0) indicators.empty++;
        else if (min > 0 && stock <= min) indicators.at_min++;
        else if (min > 0 && stock <= min * 1.2) indicators.near_min++;
        else indicators.ok++;
    });
    document.getElementById('indicator-ok').textContent = indicators.ok;
    document.getElementById('indicator-near-min').textContent = indicators.near_min;
    document.getElementById('indicator-at-min').textContent = indicators.at_min;
    document.getElementById('indicator-empty').textContent = indicators.empty;
}

function renderProductsTable() {
    const tableBody = document.getElementById('productsTableBody');
    if (!tableBody) return;
    const searchTerm = document.getElementById('productSearchInput')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('productCategoryFilter')?.value || 'all';

    let filteredProducts = state.products;

    // 1. Filtro por status de estoque
    if (activeStockFilter !== 'all') {
        filteredProducts = filteredProducts.filter(p => {
            const stock = p.currentStock;
            const min = p.minStock;
            switch (activeStockFilter) {
                case 'ok': return stock > 0 && (min === 0 || stock > min * 1.2);
                case 'near_min': return min > 0 && stock > min && stock <= min * 1.2;
                case 'at_min': return min > 0 && stock > 0 && stock <= min;
                case 'empty': return stock <= 0;
                default: return true;
            }
        });
    }

    // 2. Filtro por busca e categoria
    filteredProducts = filteredProducts.filter(p => {
        const nameMatch = p.name.toLowerCase().includes(searchTerm);
        const categoryMatch = categoryFilter === 'all' || p.categoryId === categoryFilter;
        return nameMatch && categoryMatch;
    });

    tableBody.innerHTML = '';
    if (filteredProducts.length > 0) {
        tableBody.innerHTML = filteredProducts.map(p => {
            const photoSrc = p.photo || `https://placehold.co/40x40/E2E8F0/4A5568?text=${encodeURIComponent(p.name.charAt(0))}`;
            const productDataString = JSON.stringify(p).replace(/'/g, "&apos;");
            return `<tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap"><div class="flex items-center"><div class="flex-shrink-0 h-10 w-10"><img class="h-10 w-10 rounded-full object-cover" src="${photoSrc}" alt=""></div><div class="ml-4"><div class="text-sm font-medium text-gray-900">${p.name}</div></div></div></td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">R$ ${p.price.toFixed(2)}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"><div class="flex flex-col"><span class="font-bold">${p.currentStock}</span><span class="text-xs text-gray-500">Min: ${p.minStock} / Max: ${p.maxStock}</span></div></td>
                <td class="px-6 py-4 whitespace-nowrap text-sm"><div class="flex items-center gap-2"><button data-action="adjust-stock" data-product-id="${p.id}" data-change="1" class="flex items-center gap-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full py-1 px-3 hover:bg-green-200"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>Entrada</button><button data-action="adjust-stock" data-product-id="${p.id}" data-change="-1" class="flex items-center gap-1 text-xs font-semibold bg-red-100 text-red-700 rounded-full py-1 px-3 hover:bg-red-200"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>Saída</button></div></td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><button data-action="edit-product" data-product='${productDataString}' class="text-indigo-600 hover:text-indigo-900">Editar</button></td>
            </tr>`;
        }).join('');
    } else {
        tableBody.innerHTML = `<tr><td colspan="5" class="text-center py-8 text-gray-500">Nenhum produto encontrado.</td></tr>`;
    }
}


async function fetchBaseData() {
    const contentContainer = document.getElementById('products-content-container');
    contentContainer.innerHTML = '<div class="loader col-span-full mx-auto my-8"></div>';
    try {
        const [products, categories] = await Promise.all([
            productsApi.getProducts(state.establishmentId),
            categoriesApi.getCategories(state.establishmentId)
        ]);
        state.products = products;
        state.categories = categories;
        switchTab(currentView);
    } catch (error) {
        contentContainer.innerHTML = '<p class="text-red-500 col-span-full text-center p-8">Erro ao carregar dados.</p>';
    }
}

function switchTab(targetView) {
    if (currentView === targetView && document.getElementById('products-content-container').children.length > 1) return;
    currentView = targetView;
    activeStockFilter = 'all'; // Reseta o filtro de estoque ao trocar de aba

    document.querySelectorAll('#products-tabs button.tab-button').forEach(button => {
        const isTarget = button.dataset.view === targetView;
        button.classList.toggle('border-indigo-500', isTarget);
        button.classList.toggle('text-indigo-600', isTarget);
        button.classList.toggle('border-transparent', !isTarget);
        button.classList.toggle('text-gray-500', !isTarget);
    });

    if (targetView === 'products') renderProductsView();
    else if (targetView === 'movements') renderStockReportView();
}

export async function loadProductsPage() {
    contentDiv.innerHTML = `
        <section>
            <div class="bg-white rounded-lg shadow-md">
                <div id="products-tabs" class="border-b border-gray-200">
                    <nav class="-mb-px flex space-x-6 px-6" aria-label="Tabs">
                        <button data-view="products" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">Produtos</button>
                        <button data-action="manage-product-categories" class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">Categorias</button>
                        <button data-view="movements" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">Movimentações</button>
                    </nav>
                </div>
                <div id="products-content-container" class="p-6">
                    <div class="loader mx-auto"></div>
                </div>
            </div>
        </section>`;

    if (pageEventListener) {
        contentDiv.removeEventListener('click', pageEventListener);
        contentDiv.removeEventListener('input', pageEventListener);
        contentDiv.removeEventListener('change', pageEventListener);
    }

    pageEventListener = async (e) => {
        const target = e.target;
        const button = target.closest('button[data-action], button[data-view], .indicator-card');

        if (target.id === 'productSearchInput' || target.id === 'productCategoryFilter') {
            renderProductsTable();
            return;
        }
        if (!button) return;

        if (button.hasAttribute('data-view')) {
            switchTab(button.dataset.view);
            return;
        }

        const action = button.dataset.action;
        const productId = button.dataset.productId || button.dataset.id;

        switch (action) {
            case 'new-product': openProductModal(); break;
            case 'edit-product': openProductModal(JSON.parse(button.dataset.product)); break;
            case 'manage-product-categories': openCategoryModal(); break; // <-- AÇÃO CORRIGIDA
            case 'generate-report': await generateStockReport(); break;
            case 'filter-stock':
                const filterType = button.dataset.filterType;
                activeStockFilter = (activeStockFilter === filterType) ? 'all' : filterType;
                document.querySelectorAll('.indicator-card').forEach(card => {
                    card.classList.toggle('ring-2', card.dataset.filterType === activeStockFilter);
                    card.classList.toggle('ring-indigo-500', card.dataset.filterType === activeStockFilter);
                    card.classList.toggle('shadow-lg', card.dataset.filterType === activeStockFilter);
                });
                renderProductsTable();
                break;
            case 'adjust-stock':
                const change = parseInt(button.dataset.change, 10);
                try {
                    await productsApi.adjustStock(productId, { change, reason: 'Ajuste manual' });
                    const productIndex = state.products.findIndex(p => p.id === productId);
                    if (productIndex > -1) {
                        state.products[productIndex].currentStock += change;
                        renderStockIndicators();
                        renderProductsTable();
                    }
                } catch (error) {
                    showNotification('Erro de Stock', error.message, 'error');
                }
                break;
        }
    };
    
    contentDiv.addEventListener('click', pageEventListener);
    contentDiv.addEventListener('input', pageEventListener);
    contentDiv.addEventListener('change', pageEventListener);

    currentView = 'products';
    activeStockFilter = 'all'; // Reseta o filtro ao carregar a página
    await fetchBaseData();
}