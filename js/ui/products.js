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
        await categoriesApi.createCategory({ establishmentId: state.establishmentId, name }, 'products');
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
            await categoriesApi.deleteCategory(categoryId, 'products');
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
        const categories = await categoriesApi.getCategories(state.establishmentId, 'products');
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
                <form id="categoryForm" class="flex flex-col sm:flex-row gap-4 sm:items-end">
                    <div class="flex-1 w-full">
                        <label for="categoryName" class="block text-sm font-medium text-gray-700">Nova Categoria</label>
                        <input type="text" id="categoryName" placeholder="Nome da nova categoria" required class="mt-1 w-full p-2 border rounded-md">
                    </div>
                    <button type="submit" class="w-full sm:w-auto py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">Adicionar</button>
                </form>
            </div>
            <div id="categoryList" class="space-y-2 max-h-64 overflow-y-auto p-2 border rounded-md"></div>
        </div>
    `;

    showGenericModal({
        title: "Gerir Categorias de Produtos",
        contentHTML: contentHTML,
        maxWidth: 'max-w-xl'
    });
    
    const modalElement = document.getElementById('genericModal');
    if (modalElement) {
        const categoryForm = modalElement.querySelector('#categoryForm');
        if (categoryForm) {
            categoryForm.addEventListener('submit', handleCategoryFormSubmit);
            modalElement.addEventListener('click', (e) => {
                 const button = e.target.closest('button[data-action="delete-category"]');
                 if (button) handleDeleteCategory(button.dataset.id);
            });
        }
    }

    fetchAndDisplayCategoriesInModal();
}

// --- LÓGICA DE PRODUTOS E ESTOQUE ---

async function handleDeleteProduct(productId) {
     if (!productId) return;
     const confirmed = await showConfirmation('Apagar Produto', 'Tem a certeza que deseja apagar este produto? Esta ação não pode ser revertida.');
     if (confirmed) {
         try {
             await productsApi.deleteProduct(productId);
             showNotification('Sucesso', 'Produto apagado com sucesso!', 'success');
             await fetchBaseData(); 
         } catch (error) {
             showNotification('Erro', `Não foi possível apagar o produto: ${error.message}`, 'error');
         }
     }
}

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
        await fetchBaseData(); 
    } catch (error) {
        showNotification('Erro', error.message, 'error');
    }
}

function resizeAndCompressImage(file, maxWidth = 800, maxHeight = 800, format = 'image/jpeg', quality = 0.8) {
    return new Promise((resolve, reject) => {
        if (!file.type.startsWith('image/')) {
            return reject(new Error('O ficheiro selecionado não é uma imagem.'));
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                let width = img.width;
                let height = img.height;
                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                const dataUrl = canvas.toDataURL(format, quality);
                resolve(dataUrl);
            };
            img.onerror = (err) => reject(new Error('Não foi possível carregar a imagem.'));
            img.src = event.target.result;
        };
        reader.onerror = (err) => reject(new Error('Não foi possível ler o ficheiro.'));
        reader.readAsDataURL(file);
    });
}

function openProductModal(product = null) {
    const modal = document.getElementById('productModal');
    
    modal.innerHTML = `
    <div class="modal-content max-w-3xl overflow-y-auto max-h-screen">
        <form id="productForm">
            <input type="hidden" id="productId" value="${product?.id || ''}">
            <input type="hidden" id="productPhotoBase64" value="${product?.photo || ''}">
            
            <div class="flex justify-between items-center mb-4">
                <h2 id="productModalTitle" class="text-2xl font-bold text-gray-800">${product ? product.name : 'Novo Produto'}</h2>
                <button type="button" data-action="close-modal" data-target="productModal" class="text-2xl font-bold">&times;</button>
            </div>

            <!-- ABAS -->
            <div class="border-b border-gray-200 mb-6">
                <nav class="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                    <button type="button" data-tab="dados" class="tab-btn whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm border-indigo-500 text-indigo-600">Dados</button>
                    <button type="button" data-tab="stock" class="tab-btn whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 ${!product ? 'hidden' : ''}">Ajustar Estoque</button>
                </nav>
            </div>

            <!-- ABA 1: DADOS -->
            <div id="tab-content-dados" class="tab-content space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="md:col-span-1 space-y-4">
                        <div class="form-group"><label>Imagem do Produto</label><div class="mt-1 flex flex-col items-center"><img id="productPhotoPreview" src="${product?.photo || 'https://placehold.co/128x128/E2E8F0/4A5568?text=Foto'}" alt="Foto do Produto" class="w-32 h-32 rounded-lg object-cover mb-3 border-4 border-gray-200 bg-gray-50"><input type="file" id="productPhotoInput" class="hidden" accept="image/*"><button type="button" id="productPhotoButton" class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Alterar Imagem</button></div></div>
                    </div>
                    <div class="md:col-span-2"><div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5"><div class="form-group sm:col-span-2"><label for="productName">Nome do Produto</label><input type="text" id="productName" value="${product?.name || ''}" required></div><div class="form-group sm:col-span-2"><label for="productCategory">Categoria</label><select id="productCategory"></select></div><div class="form-group"><label for="productPrice">Preço (R$)</label><input type="number" id="productPrice" step="0.01" value="${product?.price || ''}" required></div><div class="form-group"><label for="productCommissionRate">Comissão (%)</label><input type="number" id="productCommissionRate" placeholder="Ex: 10" value="${product?.commissionRate || ''}"></div></div></div>
                </div>
                <div class="mt-6 pt-6 border-t"><h3 class="text-lg font-semibold text-gray-700 text-left mb-4">Controlo de Stock (Definições)</h3><div class="grid grid-cols-1 sm:grid-cols-3 gap-6"><div class="form-group"><label for="productCurrentStock">Atual</label><input type="number" id="productCurrentStock" value="${product?.currentStock || 0}" readonly class="bg-gray-100 p-2 border rounded-md"></div><div class="form-group"><label for="productMinStock">Mínimo</label><input type="number" id="productMinStock" value="${product?.minStock || 0}" class="p-2 border rounded-md"></div><div class="form-group"><label for="productMaxStock">Máximo</label><input type="number" id="productMaxStock" value="${product?.maxStock || 0}" class="p-2 border rounded-md"></div></div></div>
            </div>

            <!-- ABA 2: AJUSTE DE ESTOQUE -->
            <div id="tab-content-stock" class="tab-content hidden space-y-6">
                <p class="text-sm text-gray-600">Use esta secção para registar entradas (compras) ou saídas (perdas) manuais. O estoque atual é <strong id="currentStockDisplay" class="text-lg">${product?.currentStock || 0}</strong>.</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                    <div class="form-group">
                        <label for="stockAdjustmentAmount">Quantidade</label>
                        <input type="number" id="stockAdjustmentAmount" min="1" placeholder="Ex: 10" class="w-full p-2 border rounded-md">
                    </div>
                    <div class="form-group">
                        <label for="stockAdjustmentReason">Motivo (Opcional)</label>
                        <input type="text" id="stockAdjustmentReason" placeholder="Ex: Compra, Perda" class="w-full p-2 border rounded-md">
                    </div>
                </div>
                <div class="flex flex-col sm:flex-row gap-4">
                    <button type="button" data-action="adjust-stock-modal" data-change="1" class="w-full sm:w-auto flex-1 py-3 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                        Registar Entrada
                    </button>
                    <button type="button" data-action="adjust-stock-modal" data-change="-1" class="w-full sm:w-auto flex-1 py-3 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                        Registar Saída
                    </button>
                </div>
            </div>
            
            <!-- RODAPÉ -->
            <div class="mt-8 pt-6 border-t flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
                <button 
                    type="button" 
                    data-action="delete-product" 
                    data-id="${product?.id || ''}" 
                    class="w-full sm:w-auto text-red-600 hover:text-red-800 transition-colors ${!product ? 'hidden' : ''}"
                    title="Excluir Produto"
                >
                    <svg class="w-6 h-6 mx-auto sm:mx-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
                <div class="flex flex-col-reverse sm:flex-row w-full sm:w-auto gap-3">
                    <button type="button" data-action="close-modal" data-target="productModal" class="w-full sm:w-auto py-2 px-6 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">Cancelar</button>
                    <button type="submit" class="w-full sm:w-auto py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Salvar Alterações</button>
                </div>
            </div>
        </form>
    </div>`;

    const form = modal.querySelector('#productForm');
    const categorySelect = modal.querySelector('#productCategory');
    const photoInput = modal.querySelector('#productPhotoInput');
    
    form.addEventListener('submit', handleProductFormSubmit);
    modal.querySelector('#productPhotoButton').addEventListener('click', () => photoInput.click());

    categorySelect.innerHTML = '<option value="">Sem categoria</option>' + (state.categories || []).map(cat => `<option value="${cat.id}" ${product?.categoryId === cat.id ? 'selected' : ''}>${cat.name}</option>`).join('');
    if(product) categorySelect.value = product.categoryId || '';

    const photoPreview = modal.querySelector('#productPhotoPreview');
    const photoBase64Input = modal.querySelector('#productPhotoBase64');
    const originalPhotoSrc = product?.photo || 'https://placehold.co/128x128/E2E8F0/4A5568?text=Foto';
    const originalBase64 = product?.photo || '';
    
    photoInput.onchange = async () => {
        const file = photoInput.files[0];
        if (!file) return;
        photoPreview.src = 'https://placehold.co/128x128/E2E8F0/4A5568?text=...';
        try {
            const resizedBase64 = await resizeAndCompressImage(file, 800, 800, 'image/jpeg', 0.8);
            const stringLength = resizedBase64.length;
            const sizeInBytes = (stringLength * 3) / 4; 
            const maxSizeInBytes = 1000 * 1024; // 1MB
            if (sizeInBytes > maxSizeInBytes) {
                throw new Error('A imagem é muito grande mesmo após a compressão.');
            }
            photoPreview.src = resizedBase64;
            photoBase64Input.value = resizedBase64;
        } catch (error) {
            console.error("Erro ao processar imagem:", error);
            showNotification('Erro de Imagem', error.message || 'Não foi possível processar a imagem.', 'error');
            photoPreview.src = originalPhotoSrc;
            photoBase64Input.value = originalBase64;
            photoInput.value = '';
        }
    };

    modal.addEventListener('click', async (e) => {
        const button = e.target.closest('button[data-action]');
        if (!button) return;

        const action = button.dataset.action;
        const productId = modal.querySelector('#productId').value;

        if (action === 'close-modal') {
            modal.style.display = 'none';
        }

        if (action === 'delete-product') {
            if (!productId) return;
            modal.style.display = 'none';
            await handleDeleteProduct(productId); 
        }

        if (action === 'adjust-stock-modal') {
            e.preventDefault(); 
            const changeInput = modal.querySelector('#stockAdjustmentAmount');
            const reasonInput = modal.querySelector('#stockAdjustmentReason');
            const amount = parseInt(changeInput.value, 10);
            const changeDirection = parseInt(button.dataset.change, 10);
            
            if (!amount || amount <= 0) {
                showNotification('Erro', 'Por favor, insira uma quantidade válida.', 'error');
                return;
            }
            
            const change = amount * changeDirection;
            const reason = reasonInput.value || (change > 0 ? 'Entrada manual' : 'Saída manual');

            try {
                await productsApi.adjustStock(productId, { change, reason });
                
                const productIndex = state.products.findIndex(p => p.id === productId);
                if (productIndex > -1) {
                    const newStock = state.products[productIndex].currentStock + change;
                    state.products[productIndex].currentStock = newStock;
                    
                    modal.querySelector('#currentStockDisplay').textContent = newStock;
                    modal.querySelector('#productCurrentStock').value = newStock;
                    changeInput.value = '';
                    reasonInput.value = '';
                    showNotification('Sucesso', 'Estoque atualizado!', 'success');
                    
                    renderStockIndicators();
                    renderProductsList(); // <- ALTERAÇÃO AQUI
                }
            } catch (error) {
                showNotification('Erro de Stock', error.message, 'error');
            }
        }
    });

    const tabs = modal.querySelectorAll('.tab-btn');
    const tabContents = modal.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault(); 
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

    modal.style.display = 'flex';
}

// --- FUNÇÕES DE RENDERIZAÇÃO DAS ABAS ---

function renderProductsView() {
    const container = document.getElementById('products-content-container');
    container.innerHTML = `
        <div class="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center mb-6">
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <input type="text" id="productSearchInput" placeholder="Pesquisar..." class="w-full sm:w-64 p-2 border rounded-md">
                <select id="productCategoryFilter" class="w-full sm:w-auto p-2 border rounded-md bg-white">
                    <option value="all">Todas as categorias</option>
                </select>
            </div>
            <div class="flex items-center gap-2">
                <button data-action="new-product" class="w-full sm:w-auto py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600">Adicionar produto</button>
            </div>
        </div>
        
        <!-- Indicadores com scroll horizontal em mobile -->
        <div class="flex gap-3 mb-4 overflow-x-auto py-2 lg:grid lg:grid-cols-4 lg:overflow-visible lg:py-0 lg:gap-4">
            <div data-action="filter-stock" data-filter-type="ok" class="indicator-card flex-shrink-0 w-48 lg:w-auto bg-green-50 border-l-4 border-green-500 p-3 lg:p-4 rounded-r-lg flex items-center gap-3 lg:gap-4 cursor-pointer transition-all">
                <div class="bg-green-100 p-1.5 lg:p-2 rounded-full"><svg class="w-5 h-5 lg:w-6 lg:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.085a2 2 0 00-1.736.93L5.5 8m7 2H5m7 2v4m0 0H5"></path></svg></div>
                <div><p class="text-sm text-gray-500 whitespace-nowrap">Estoque em dia</p><p id="indicator-ok" class="text-xl lg:text-2xl font-bold text-gray-800">0</p></div>
            </div>
            <div data-action="filter-stock" data-filter-type="near_min" class="indicator-card flex-shrink-0 w-48 lg:w-auto bg-blue-50 border-l-4 border-blue-500 p-3 lg:p-4 rounded-r-lg flex items-center gap-3 lg:gap-4 cursor-pointer transition-all">
                <div class="bg-blue-100 p-1.5 lg:p-2 rounded-full"><svg class="w-5 h-5 lg:w-6 lg:h-6 text-blue-600 transform -rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6z"></path><path fill-rule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-7a7 7 0 100 14 7 7 0 000-14z" clip-rule="evenodd"></path></svg></div>
                <div><p class="text-sm text-gray-500 whitespace-nowrap">Perto do mínimo</p><p id="indicator-near-min" class="text-xl lg:text-2xl font-bold text-gray-800">0</p></div>
            </div>
            <div data-action="filter-stock" data-filter-type="at_min" class="indicator-card flex-shrink-0 w-48 lg:w-auto bg-orange-50 border-l-4 border-orange-500 p-3 lg:p-4 rounded-r-lg flex items-center gap-3 lg:gap-4 cursor-pointer transition-all">
                <div class="bg-orange-100 p-1.5 lg:p-2 rounded-full"><svg class="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg></div>
                <div><p class="text-sm text-gray-500 whitespace-nowrap">Utilizando o mínimo</p><p id="indicator-at-min" class="text-xl lg:text-2xl font-bold text-gray-800">0</p></div>
            </div>
            <div data-action="filter-stock" data-filter-type="empty" class="indicator-card flex-shrink-0 w-48 lg:w-auto bg-red-50 border-l-4 border-red-500 p-3 lg:p-4 rounded-r-lg flex items-center gap-3 lg:gap-4 cursor-pointer transition-all">
                <div class="bg-red-100 p-1.5 lg:p-2 rounded-full"><svg class="w-5 h-5 lg:w-6 lg:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg></div>
                <div><p class="text-sm text-gray-500 whitespace-nowrap">Esgotado</p><p id="indicator-empty" class="text-xl lg:text-2xl font-bold text-gray-800">0</p></div>
            </div>
        </div>
        
        <!-- ALTERAÇÃO: Trocado Tabela por Div de Cards -->
        <div id="productsList" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            <!-- Conteúdo será gerado por renderProductsList() -->
            <div class="loader col-span-full mx-auto my-10"></div>
        </div>
    `;
    
    const categoryFilter = document.getElementById('productCategoryFilter');
    if (categoryFilter) {
        categoryFilter.innerHTML = '<option value="all">Todas as categorias</option>';
        (state.categories || []).forEach(cat => categoryFilter.innerHTML += `<option value="${cat.id}">${cat.name}</option>`);
    }
    renderStockIndicators();
    renderProductsList(); // <- ALTERAÇÃO AQUI
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
    if (categoryFilter && state.categories) categoryFilter.innerHTML += state.categories.map(c => `<option value="${c.id}">${c.name}</CATE></option>`).join('');
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
        if (!p) return; // Proteção contra dados nulos
        const stock = p.currentStock;
        const min = p.minStock;
        if (stock <= 0) indicators.empty++;
        else if (min > 0 && stock <= min) indicators.at_min++;
        else if (min > 0 && stock <= min * 1.2) indicators.near_min++;
        else indicators.ok++;
    });
    
    const okEl = document.getElementById('indicator-ok');
    const nearMinEl = document.getElementById('indicator-near-min');
    const atMinEl = document.getElementById('indicator-at-min');
    const emptyEl = document.getElementById('indicator-empty');

    if (okEl) okEl.textContent = indicators.ok;
    if (nearMinEl) nearMinEl.textContent = indicators.near_min;
    if (atMinEl) atMinEl.textContent = indicators.at_min;
    if (emptyEl) emptyEl.textContent = indicators.empty;
}

// ALTERAÇÃO: Função renomeada de renderProductsTable para renderProductsList
function renderProductsList() {
    const listDiv = document.getElementById('productsList'); // Alvo é o novo DIV
    if (!listDiv) return;
    
    const searchTerm = document.getElementById('productSearchInput')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('productCategoryFilter')?.value || 'all';
    const categoryMap = new Map((state.categories || []).map(c => [c.id, c.name]));

    let filteredProducts = (state.products || []).filter(Boolean); // Limpa nulos

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
        
    listDiv.innerHTML = ''; // Limpa o DIV
    if (filteredProducts.length > 0) {
        filteredProducts.forEach(product => {
            const card = document.createElement('div');
            const productDataString = JSON.stringify(product).replace(/'/g, "&apos;");
            
            // Usamos 'product-card' para o nosso seletor de clique
            card.className = `product-card bg-white rounded-lg shadow-md flex flex-col overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50`;
            card.dataset.action = 'edit-product';
            card.dataset.product = productDataString;

            const photoSrc = product.photo || `https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(product.name.charAt(0))}`;
            const categoryName = categoryMap.get(product.categoryId) || 'N/A';
            
            // Lógica do status do estoque para o card
            let stockStatusHtml = '';
            const stock = product.currentStock;
            const min = product.minStock;
            if (stock <= 0) {
                stockStatusHtml = `<span class="text-xs font-semibold text-red-600">Esgotado</span>`;
            } else if (min > 0 && stock <= min) {
                stockStatusHtml = `<span class="text-xs font-semibold text-orange-600">Estoque Mínimo</span>`;
            } else if (min > 0 && stock <= min * 1.2) {
                stockStatusHtml = `<span class="text-xs font-semibold text-blue-600">Estoque Baixo</span>`;
            } else {
                stockStatusHtml = `<span class="text-xs font-semibold text-green-600">Em Estoque</span>`;
            }

            // HTML do Card (baseado no de Serviços)
            card.innerHTML = `
                <img src="${photoSrc}" alt="Imagem de ${product.name}" class="w-full h-24 object-cover">
                <div class="p-3 flex flex-col flex-grow">
                    <div class="flex-grow">
                        <div class="flex justify-between items-start mb-1">
                            <h3 class="text-sm font-bold text-gray-900 flex-1 text-left">${product.name}</h3>
                            ${stockStatusHtml}
                        </div>
                        <p class="text-xl font-bold text-indigo-600 mb-1 text-left">R$ ${product.price.toFixed(2)}</p>
                        <p class="text-xs text-gray-500 text-left mb-2">Categoria: ${categoryName}</p>
                        <p class="text-xs text-gray-500 text-left">Estoque Atual: <span class="font-bold text-base text-gray-800">${product.currentStock}</span></p>
                    </div>
                </div>`;
            listDiv.appendChild(card);
        });
    } else {
        listDiv.innerHTML = `<p class="col-span-full text-center text-gray-500 py-10">Nenhum produto encontrado.</p>`;
    }
}


async function fetchBaseData() {
    const contentContainer = document.getElementById('products-content-container');
    if (contentContainer) {
         contentContainer.innerHTML = '<div class="loader col-span-full mx-auto my-8"></div>';
    }
   
    try {
        const [products, categories] = await Promise.all([
            productsApi.getProducts(state.establishmentId),
            categoriesApi.getCategories(state.establishmentId, 'products')
        ]);
        
        state.products = (products || []).filter(Boolean); // Limpa dados nulos
        state.categories = (categories || []).filter(Boolean); // Limpa dados nulos
        
        switchTab(currentView);
    } catch (error) {
        if (contentContainer) {
            contentContainer.innerHTML = '<p class="text-red-500 col-span-full text-center p-8">Erro ao carregar dados.</p>';
        }
    }
}

function switchTab(targetView) {
    if (currentView === targetView && document.getElementById('products-content-container').children.length > 1) {
        if (currentView === 'products') {
            renderStockIndicators();
            renderProductsList(); // <- ALTERAÇÃO AQUI
        }
        return;
    }
    
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
        <section class="p-4 sm:p-6">
            <div class="bg-white rounded-lg shadow-md">
                <div id="products-tabs" class="border-b border-gray-200">
                    <nav class="-mb-px flex space-x-6 px-4 sm:px-6 overflow-x-auto" aria-label="Tabs">
                        <button data-view="products" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-indigo-500 text-indigo-600">Produtos</button>
                        <button data-action="manage-product-categories" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">Categorias</button>
                        <button data-view="movements" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">Movimentações</button>
                    </nav>
                </div>
                <div id="products-content-container" class="p-4 sm:p-6">
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
        
        // Filtros de Tabela
        if (target.id === 'productSearchInput' || target.id === 'productCategoryFilter') {
            renderProductsList(); // <- ALTERAÇÃO AQUI
            return;
        }
        
        // ALTERAÇÃO: Ouve cliques no 'product-card'
        const targetElement = e.target.closest('button[data-action], button[data-view], .indicator-card, .product-card[data-action]');

        if (!targetElement) return;

        if (targetElement.hasAttribute('data-view')) {
            switchTab(targetElement.dataset.view);
            return;
        }

        const action = targetElement.dataset.action;

        switch (action) {
            case 'new-product': 
                openProductModal(); 
                break;
            case 'edit-product': // Agora é acionado pelo CARD
                openProductModal(JSON.parse(targetElement.dataset.product)); 
                break;
            case 'manage-product-categories': 
                openCategoryModal(); 
                break;
            case 'generate-report': 
                await generateStockReport(); 
                break;
            case 'filter-stock':
                const filterType = targetElement.dataset.filterType;
                activeStockFilter = (activeStockFilter === filterType) ? 'all' : filterType;
                document.querySelectorAll('.indicator-card').forEach(card => {
                    card.classList.toggle('ring-2', card.dataset.filterType === activeStockFilter);
                    card.classList.toggle('ring-indigo-500', card.dataset.filterType === activeStockFilter);
                    card.classList.toggle('shadow-lg', card.dataset.filterType === activeStockFilter);
                });
                renderProductsList(); // <- ALTERAÇÃO AQUI
                break;
        }
    };
    
    contentDiv.addEventListener('click', pageEventListener);
    contentDiv.addEventListener('input', pageEventListener);
    contentDiv.addEventListener('change', pageEventListener);

    currentView = 'products';
    activeStockFilter = 'all'; 
    await fetchBaseData();
}