// --- 1. IMPORTAÇÕES ---
import * as servicesApi from '../api/services.js';
import * as professionalsApi from '../api/professionals.js';
import { state } from '../state.js';
import { showNotification, showConfirmation, showGenericModal } from '../components/modal.js';
import * as categoriesApi from '../api/categories.js'; 
import { navigateTo } from '../main.js'; // Adicionado para consistência

// --- 2. CONSTANTES E VARIÁVEIS DO MÓDULO ---
const contentDiv = document.getElementById('content');
let pageEventListener = null;
let currentView = 'services'; // Define a aba inicial
let activeServiceFilter = 'all'; // 'all', 'active', 'inactive'

// --- 3. LÓGICA DE CATEGORIAS (MODAL) ---
async function handleCategoryFormSubmit(e) {
    e.preventDefault();
    const form = e.target.closest('#categoryForm');
    const categoryNameInput = form.querySelector('#categoryName');
    const name = categoryNameInput.value;
    if (!name) return;
    try {
        await categoriesApi.createCategory({ establishmentId: state.establishmentId, name }, 'services');
        categoryNameInput.value = '';
        showNotification('Sucesso', 'Categoria criada!', 'success');
        await fetchAndDisplayCategoriesInModal();
        await fetchBaseData(); 
    } catch (error) {
        showNotification('Erro', `Não foi possível criar a categoria: ${error.message}`, 'error');
    }
}

async function handleDeleteCategory(categoryId) {
    const confirmed = await showConfirmation('Apagar Categoria', 'Tem a certeza? Os serviços nesta categoria ficarão sem categoria.');
    if (confirmed) {
        try {
            await categoriesApi.deleteCategory(categoryId, 'services');
            showNotification('Sucesso', 'Categoria apagada.', 'success');
            await fetchAndDisplayCategoriesInModal();
            await fetchBaseData(); 
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
        const categories = await categoriesApi.getCategories(state.establishmentId, 'services');
        state.serviceCategories = categories; 
        listDiv.innerHTML = '';
        if (categories.length > 0) {
            listDiv.innerHTML = categories.map(cat => `
                <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span>${cat.name}</span>
                    <button data-action="delete-category" data-id="${cat.id}" class="text-red-500 hover:text-red-700 font-semibold text-sm">Apagar</button>
                </div>`).join('');
        } else {
            listDiv.innerHTML = '<p class="text-center text-gray-500">Nenhuma categoria criada.</p>';
        }
    } catch (error) {
        listDiv.innerHTML = `<p class="text-red-500 text-center">Erro ao carregar categorias.</p>`;
    }
}

function openCategoryModal() {
    const contentHTML = `
        <div class="space-y-4">
            <div class="mb-4">
                <form id="categoryForm" class="flex flex-col sm:flex-row gap-4 sm:items-end">
                    <div class="flex-1 w-full">
                        <label for="categoryName" class="block text-sm font-medium text-gray-700">Nova Categoria</label>
                        <input type="text" id="categoryName" placeholder="Nome da categoria" required class="mt-1 w-full p-2 border rounded-md">
                    </div>
                    <button type="submit" class="w-full sm:w-auto py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">Adicionar</button>
                </form>
            </div>
            <div id="categoryList" class="space-y-2 max-h-64 overflow-y-auto p-2 border rounded-md"></div>
        </div>
    `;

    showGenericModal({
        title: "Gerir Categorias de Serviços",
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
                 if (button) {
                     e.preventDefault(); 
                     handleDeleteCategory(button.dataset.id);
                 }
             });
        }
    }

    fetchAndDisplayCategoriesInModal();
}

// --- LÓGICA DE SERVIÇOS (MODAL) ---
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
        duration: parseInt(form.querySelector('#serviceDurationMinutes').value, 10),
        bufferTime: parseInt(form.querySelector('#serviceBufferTimeMinutes').value, 10) || 0,
        categoryId: form.querySelector('#serviceCategory').value || null,
        commissionRate: parseFloat(form.querySelector('#serviceCommissionRate').value) || 0,
        active: form.querySelector('#serviceStatus').value === 'true', 
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

function openServiceModal(service = null) {
    const modal = document.getElementById('serviceModal');
    const categories = state.serviceCategories || []; 

    const durationInMinutes = service?.duration || 0; 
    const bufferTimeInMinutes = service?.bufferTime || 0; 
    
    const categoryOptions = categories.map(c => 
        `<option value="${c.id}" ${service?.categoryId === c.id ? 'selected' : ''}>${c.name}</option>`
    ).join('');

    modal.innerHTML = `
    <div class="modal-content max-w-3xl overflow-y-auto max-h-screen">
        <form id="serviceForm">
            <input type="hidden" id="serviceId" value="${service?.id || ''}">
            <input type="hidden" id="servicePhotoBase64" value="${service?.photo || ''}">
            
            <div class="flex justify-between items-center mb-4">
                <h2 id="serviceModalTitle" class="text-2xl font-bold text-gray-800">${service ? service.name : 'Novo Serviço'}</h2>
                <button type="button" data-action="close-modal" data-target="serviceModal" class="text-2xl font-bold">&times;</button>
            </div>

            <div class="border-b border-gray-200 mb-6">
                <nav class="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                    <button type="button" data-tab="dados" class="tab-btn whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm border-indigo-500 text-indigo-600">Dados do serviço</button>
                    <button type="button" data-tab="comissoes" class="tab-btn whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">Personalizar comissões</button>
                </nav>
            </div>

            <div id="tab-content-dados" class="tab-content space-y-4">
                
                <div class="space-y-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Foto do Serviço</label>
                    <div class="mt-1 flex flex-col items-center">
                        <img id="servicePhotoPreview" src="${service?.photo || 'https://placehold.co/128x128/E2E8F0/4A5568?text=Foto'}" alt="Foto do Serviço" class="w-32 h-32 rounded-lg object-cover mb-3 border-4 border-gray-200 bg-gray-50">
                        <input type="file" id="servicePhotoInput" class="hidden" accept="image/*">
                        <button type="button" id="servicePhotoButton" class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Alterar Imagem</button>
                    </div>
                </div>

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
                        <label for="serviceCategory" class="block text-sm font-medium text-gray-700">Categoria</label>
                        <select id="serviceCategory" class="mt-1 w-full p-2 border rounded-md bg-white">
                            <option value="">Sem Categoria</option>
                            ${categoryOptions}
                        </select>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="serviceDurationMinutes" class="block text-sm font-medium text-gray-700">Duração (minutos)</label>
                            <input type="number" id="serviceDurationMinutes" min="0" value="${durationInMinutes}" class="mt-1 w-full p-2 border rounded-md" required>
                        </div>
                        <div>
                            <label for="serviceBufferTimeMinutes" class="block text-sm font-medium text-gray-700">Minutos Extras</label>
                            <input type="number" id="serviceBufferTimeMinutes" min="0" value="${bufferTimeInMinutes}" class="mt-1 w-full p-2 border rounded-md">
                        </div>
                    </div>
                </div>
                <div>
                    <label for="serviceNotes" class="block text-sm font-medium text-gray-700">Observações</label>
                    <textarea id="serviceNotes" rows="3" class="mt-1 w-full p-2 border rounded-md">${service?.notes || ''}</textarea>
                </div>
                <div>
                    <label for="serviceStatus" class="block text-sm font-medium text-gray-700">Status</label>
                    <select id="serviceStatus" class="mt-1 w-full p-2 border rounded-md bg-white">
                        <option value="true" ${service?.active !== false ? 'selected' : ''}>Ativo</option>
                        <option value="false" ${service?.active === false ? 'selected' : ''}>Inativo</option>
                    </select>
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

            <div class="mt-6 pt-6 border-t flex flex-col-reverse sm:flex-row justify-between items-center gap-3">
                
                <button 
                    type="button" 
                    data-action="delete-service" 
                    data-id="${service?.id || ''}" 
                    class="w-full sm:w-auto text-red-600 hover:text-red-800 transition-colors ${!service ? 'hidden' : ''}"
                    title="Excluir Serviço"
                >
                    <svg class="w-6 h-6 mx-auto sm:mx-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
                
                <div class="flex flex-col-reverse sm:flex-row w-full sm:w-auto gap-3">
                    <button type="button" data-action="close-modal" data-target="serviceModal" class="w-full sm:w-auto py-2 px-6 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">Cancelar</button>
                    <button type="submit" class="w-full sm:w-auto py-2 px-6 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700">Salvar</button>
                </div>
            </div>
        </form>
    </div>`;

    modal.style.display = 'flex';

    modal.addEventListener('click', async (e) => {
        const button = e.target.closest('button[data-action]');
        if (!button) return;

        const action = button.dataset.action;
        const serviceId = button.dataset.id;

        if (action === 'close-modal') {
            modal.style.display = 'none';
        }

        if (action === 'delete-service') {
            if (!serviceId) return;
            
            modal.style.display = 'none'; 
            
            const confirmed = await showConfirmation('Apagar Serviço', 'Tem a certeza que deseja apagar este serviço?');
            if (confirmed) {
                try {
                    await servicesApi.deleteService(serviceId);
                    showNotification('Sucesso', 'Serviço apagado com sucesso!', 'success');
                    await fetchBaseData(); 
                } catch (error) {
                    showNotification('Erro', `Não foi possível apagar o serviço: ${error.message}`, 'error');
                }
            } else {
                 modal.style.display = 'flex'; // Reabre o modal se cancelar
            }
        }
    });

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
    if (profListContainer) {
        profListContainer.innerHTML = (state.professionals || []).map(prof => {
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
    }

    toggleCommissionView(); 

    const form = modal.querySelector('#serviceForm');
    
    const photoInput = modal.querySelector('#servicePhotoInput');
    const photoPreview = modal.querySelector('#servicePhotoPreview');
    const photoBase64Input = modal.querySelector('#servicePhotoBase64');
    const originalPhotoSrc = service?.photo || 'https://placehold.co/128x128/E2E8F0/4A5568?text=Foto';
    const originalBase64 = service?.photo || '';
    
    modal.querySelector('#servicePhotoButton').addEventListener('click', () => photoInput.click());

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
    
    form.addEventListener('submit', handleServiceFormSubmit);
}

// --- SECÇÃO DE RENDERIZAÇÃO DA PÁGINA PRINCIPAL ---

function renderServicesList() {
    const listDiv = document.getElementById('servicesList');
    if (!listDiv) return;

    const searchTerm = document.getElementById('serviceSearchInput')?.value.toLowerCase() || '';
    const categoryFilterValue = document.getElementById('serviceCategoryFilter')?.value || 'all';
    
    const categoryMap = new Map((state.serviceCategories || []).map(c => [c.id, c.name]));
    
    let filteredServices = (state.services || []).filter(Boolean);

    if (activeServiceFilter !== 'all') {
        const isActive = activeServiceFilter === 'active';
        filteredServices = filteredServices.filter(s => (s.active !== false) === isActive); 
    }

    filteredServices = filteredServices.filter(s => {
        const nameMatch = s.name.toLowerCase().includes(searchTerm);
        const categoryMatch = categoryFilterValue === 'all' || s.categoryId === categoryFilterValue;
        return nameMatch && categoryMatch;
    });

    listDiv.innerHTML = '';
    if (filteredServices.length > 0) {
        filteredServices.forEach(service => {
            const card = document.createElement('div');
            const serviceDataString = JSON.stringify(service).replace(/'/g, "&apos;");
            
            // ALTERAÇÃO: Classes alteradas para suportar layout flex (lista) em mobile e flex-col (card) em desktop
            card.className = `service-card bg-white rounded-lg shadow-md flex overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-gray-50 ${service.active !== false ? 'opacity-100' : 'opacity-50 bg-gray-100'} sm:flex-col`;
            card.dataset.action = 'edit-service'; 
            card.dataset.service = serviceDataString; 

            const photoSrc = service.photo || `https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(service.name.charAt(0))}`;
            const categoryName = categoryMap.get(service.categoryId) || 'N/A';

            // ALTERAÇÃO: O innerHTML foi reestruturado para ser responsivo (lista em mobile, card em desktop)
            card.innerHTML = `
                <!-- Imagem: pequena na esquerda (mobile), grande no topo (desktop) -->
                <img src="${photoSrc}" alt="Imagem de ${service.name}" class="w-20 h-20 object-cover flex-shrink-0 sm:w-full sm:h-24">
                
                <!-- Conteúdo Principal -->
                <div class="p-3 flex flex-col flex-grow justify-between w-full">
                    <!-- Topo: Nome e Toggle -->
                    <div class="flex justify-between items-start mb-1">
                        <h3 class="text-sm font-bold text-gray-900 flex-1 text-left truncate pr-2">${service.name}</h3>
                        <label class="flex items-center cursor-pointer ml-2" data-action-stop-propagation="true">
                            <div class="relative">
                                <input type="checkbox" data-action="toggle-service-status" data-id="${service.id}" class="sr-only" ${service.active !== false ? 'checked' : ''}>
                                <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                            </div>
                        </label>
                    </div>

                    <!-- Meio: Preço (esconde em mobile, mostra em desktop) -->
                    <p class="text-xl font-bold text-indigo-600 mb-1 text-left hidden sm:block">R$ ${service.price.toFixed(2)}</p>

                    <!-- Rodapé: Duração e Preço (mobile) / Categoria e Duração (desktop) -->
                    <div>
                        <!-- Info Desktop: Categoria e Duração (visível em sm e acima) -->
                        <div class="hidden sm:block">
                            <p class="text-xs text-gray-500 text-left mb-1 truncate">Categoria: ${categoryName}</p>
                            <p class="text-xs text-gray-500 text-left">Duração: ${service.duration} min (+${service.bufferTime || 0} min extra)</p>
                        </div>
                        <!-- Info Mobile: Preço e Duração (visível apenas em mobile) -->
                        <div class="flex justify-between items-center sm:hidden mt-2">
                            <p class="text-lg font-bold text-indigo-600 text-left">R$ ${service.price.toFixed(2)}</p>
                            <p class="text-xs text-gray-500 text-right">${service.duration} min</p>
                        </div>
                    </div>
                </div>`;
            listDiv.appendChild(card);
        });
    } else {
        listDiv.innerHTML = `<p class="col-span-full text-center text-gray-500 py-10">Nenhum serviço encontrado.</p>`;
    }
}

function renderServiceIndicators() {
    const indicators = { active: 0, inactive: 0, total: 0 };
    
    const validServices = (state.services || []).filter(Boolean);
    
    validServices.forEach(s => {
        if (s.active === false) {
            indicators.inactive++;
        } else {
            indicators.active++;
        }
    });
    indicators.total = validServices.length; 

    const totalEl = document.getElementById('indicator-total');
    const activeEl = document.getElementById('indicator-active');
    const inactiveEl = document.getElementById('indicator-inactive');
    const popularEl = document.getElementById('indicator-popular');

    if (totalEl) totalEl.textContent = indicators.total;
    if (activeEl) activeEl.textContent = indicators.active;
    if (inactiveEl) inactiveEl.textContent = indicators.inactive;
    
    if (popularEl) {
        if (state.mostPopularService && state.mostPopularService.name !== 'N/A') {
            // const serviceName = state.mostPopularService.name.length > 18 ? 
            //     state.mostPopularService.name.substring(0, 18) + '...' : 
            //     state.mostPopularService.name;
            // popularEl.textContent = serviceName;
            popularEl.textContent = state.mostPopularService.name;
            popularEl.closest('.indicator-card').title = `${state.mostPopularService.name} (${state.mostPopularService.count} agendamentos)`;
        } else {
            popularEl.textContent = 'N/A';
            popularEl.closest('.indicator-card').title = 'Nenhum serviço agendado ainda';
        }
    }
}

function renderServicesView() {
    const container = document.getElementById('services-content-container');
    container.innerHTML = `
        <!-- ALTERAÇÃO: Botão "Novo Serviço" foi REMOVIDO daqui -->

        <div class="flex flex-col sm:flex-row gap-4 mb-6">
            <input type="search" id="serviceSearchInput" placeholder="Pesquisar por nome..." class="w-full sm:w-64 p-2 border rounded-md shadow-sm">
            <select id="serviceCategoryFilter" class="w-full sm:w-auto p-2 border rounded-md bg-white shadow-sm">
                <option value="all">Todas as categorias</option>
            </select>
        </div>
        
        <div class="grid grid-cols-2 gap-3 mb-4 lg:grid-cols-4 lg:gap-4">
            <div data-action="filter-service" data-filter-type="total" class="indicator-card bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg flex items-center gap-3 cursor-pointer transition-all lg:p-4 lg:gap-4">
                <div class="bg-blue-100 p-1.5 lg:p-2 rounded-full"><svg class="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M5 11v2m14-2v2"></path></svg></div>
                <div><p class="text-xs text-gray-500">Total de Serviços</p><p id="indicator-total" class="text-lg font-bold text-gray-800 lg:text-2xl">0</p></div>
            </div>
            <div data-action="filter-service" data-filter-type="active" class="indicator-card bg-green-50 border-l-4 border-green-500 p-3 rounded-r-lg flex items-center gap-3 cursor-pointer transition-all lg:p-4 lg:gap-4">
                <div class="bg-green-100 p-1.5 lg:p-2 rounded-full"><svg class="w-5 h-5 lg:w-6 lg:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                <div><p class="text-xs text-gray-500">Serviços Ativos</p><p id="indicator-active" class="text-lg font-bold text-gray-800 lg:text-2xl">0</p></div>
            </div>
            <div data-action="filter-service" data-filter-type="inactive" class="indicator-card bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg flex items-center gap-3 cursor-pointer transition-all lg:p-4 lg:gap-4">
                <div class="bg-red-100 p-1.5 lg:p-2 rounded-full"><svg class="w-5 h-5 lg:w-6 lg:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg></div>
                <div><p class="text-xs text-gray-500">Serviços Inativos</p><p id="indicator-inactive" class="text-lg font-bold text-gray-800 lg:text-2xl">0</p></div>
            </div>
            <div id="popular-card" data-action="filter-service" data-filter-type="popular" class="indicator-card bg-gray-50 border-l-4 border-gray-400 p-3 rounded-r-lg flex items-center gap-3 transition-all opacity-70 lg:p-4 lg:gap-4" title="Carregando...">
                <div class="bg-gray-100 p-1.5 lg:p-2 rounded-full"><svg class="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.05 10.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg></div>
                <div><p class="text-xs text-gray-500">Mais Usados</p><p id="indicator-popular" class="text-lg font-bold text-gray-800 lg:text-2xl truncate">...</p></div>
            </div>
        </div>

        <div id="servicesList" class="space-y-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 sm:gap-4">
            <div class="loader col-span-full mx-auto my-10"></div>
        </div>
        
        <!-- ALTERAÇÃO: Botão de Ação Flutuante (FAB) "Novo Serviço" adicionado -->
        <button data-action="new-service" class="fixed z-30 bottom-20 right-6 sm:bottom-8 sm:right-8 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        </button>
    `;

    const categoryFilter = document.getElementById('serviceCategoryFilter');
    if (categoryFilter) {
        categoryFilter.innerHTML = '<option value="all">Todas as categorias</option>';
        (state.serviceCategories || []).forEach(cat => categoryFilter.innerHTML += `<option value="${cat.id}">${cat.name}</option>`);
    }

    renderServiceIndicators();
    renderServicesList();
}

function renderServiceReportsView() {
    const container = document.getElementById('services-content-container');
    container.innerHTML = `
        <div class="p-8 text-center">
            <h3 class="text-xl font-bold text-gray-700">Relatórios de Serviços</h3>
            <p class="text-gray-500 mt-2">Em breve, aqui poderás ver relatórios detalhados sobre os teus serviços mais rentáveis, mais agendados e muito mais.</p>
        </div>
    `;
}

async function fetchBaseData() {
    const contentContainer = document.getElementById('services-content-container');
    if (contentContainer) {
        const loader = contentContainer.querySelector('.loader');
        if (loader) loader.style.display = 'block';
    }
    
    try {
        const [servicesData, professionalsData, categoriesData, mostPopularData] = await Promise.all([
            servicesApi.getServices(state.establishmentId),
            professionalsApi.getProfessionals(state.establishmentId),
            categoriesApi.getCategories(state.establishmentId, 'services'), 
            servicesApi.getMostPopularService(state.establishmentId) 
        ]);
        
        state.services = (servicesData || []).filter(Boolean);
        state.professionals = (professionalsData || []).filter(Boolean);
        state.serviceCategories = (categoriesData || []).filter(Boolean);
        state.mostPopularService = mostPopularData || { name: 'N/A', count: 0 }; 
        
        state.services.forEach(s => {
            if (s.active === undefined) s.active = true;
        });

        switchTab(currentView);

    } catch (error) {
        if (contentContainer) {
            contentContainer.innerHTML = '<p class="text-red-500 col-span-full text-center py-10">Erro ao carregar dados. Verifique a conexão com o servidor.</p>';
        }
        showNotification('Erro', `Não foi possível carregar os dados: ${error.message}`, 'error');
    }
}

function switchTab(targetView) {
    if (!document.getElementById('services-content-container')) return;
    
    if (currentView === targetView && document.getElementById('services-content-container').children.length > 1) {
         if(currentView === 'services') {
             renderServiceIndicators();
             renderServicesList();
         }
         return;
    }
    
    currentView = targetView;
    activeServiceFilter = 'all'; 

    document.querySelectorAll('#services-tabs button.tab-button').forEach(button => {
        const isTarget = button.dataset.view === targetView;
        button.classList.toggle('border-indigo-500', isTarget);
        button.classList.toggle('text-indigo-600', isTarget);
        button.classList.toggle('border-transparent', !isTarget);
        button.classList.toggle('text-gray-500', !isTarget);
    });

    if (targetView === 'services') renderServicesView();
    else if (targetView === 'reports') renderServiceReportsView();
}


// --- 5. EVENT LISTENERS E INICIALIZAÇÃO DA PÁGINA ---

function setupEventListeners() {
    if (pageEventListener) {
        contentDiv.removeEventListener('click', pageEventListener);
        contentDiv.removeEventListener('input', pageEventListener);
        contentDiv.removeEventListener('change', pageEventListener);
    }
    
    pageEventListener = async (e) => {
        const target = e.target;
        
        if (target.closest('[data-action="toggle-service-status"]')) {
            e.stopPropagation(); 
            const toggle = target.closest('[data-action="toggle-service-status"]');
            const serviceId = toggle.dataset.id;
            const newStatus = toggle.checked;
            try {
                await servicesApi.updateServiceStatus(serviceId, newStatus);
                const serviceIndex = state.services.findIndex(s => s.id === serviceId);
                if (serviceIndex > -1) state.services[serviceIndex].active = newStatus;
                renderServicesList();
                renderServiceIndicators();
            } catch (error) {
                showNotification('Erro', `Não foi possível atualizar o status: ${error.message}`, 'error');
                toggle.checked = !newStatus;
                renderServicesList();
            }
            return; 
        }

        const button = target.closest('button[data-action], button[data-view], .indicator-card[data-action], .service-card[data-action]');
        
        if (target.id === 'serviceSearchInput' || target.id === 'serviceCategoryFilter') {
            renderServicesList();
            return;
        }

        if (!button) return; 

        if (button.hasAttribute('data-view')) {
            switchTab(button.dataset.view);
            return;
        }

        const action = button.dataset.action;
        
        switch (action) {
            case 'new-service':
                openServiceModal();
                break;
            
            case 'edit-service':
                const serviceData = JSON.parse(button.dataset.service);
                openServiceModal(serviceData);
                break;

            case 'manage-categories': 
                openCategoryModal();
                break;
            
            case 'filter-service':
                const filterType = button.dataset.filterType;
                if (filterType === 'popular') return; 
                
                activeServiceFilter = (filterType === 'total') ? 'all' : filterType;
                
                document.querySelectorAll('.indicator-card[data-action="filter-service"]').forEach(card => {
                    const cardType = card.dataset.filterType;
                    const isTotalOrAll = (cardType === 'total' && activeServiceFilter === 'all');
                    const isSelected = (cardType === activeServiceFilter) || isTotalOrAll;

                    card.classList.toggle('ring-2', isSelected);
                    card.classList.toggle('ring-indigo-500', isSelected);
                    card.classList.toggle('shadow-lg', isSelected);
                });
                renderServicesList();
                break;
        }
    };

    contentDiv.addEventListener('click', pageEventListener);
    contentDiv.addEventListener('input', pageEventListener);
    contentDiv.addEventListener('change', pageEventListener);
}

// --- 6. FUNÇÃO PRINCIPAL EXPORTADA ---

export async function loadServicesPage() {
    contentDiv.innerHTML = `
        <section class="p-4 sm:p-6">
            <div class="bg-white rounded-lg shadow-md">
                <div id="services-tabs" class="border-b border-gray-200">
                    <nav class="-mb-px flex space-x-6 px-4 sm:px-6 overflow-x-auto" aria-label="Tabs">
                        <button data-view="services" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-indigo-500 text-indigo-600">
                            Serviços
                        </button>
                        <button data-action="manage-categories" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">
                            Categorias
                        </button>
                        <button data-view="reports" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">
                            Relatórios
                        </button>
                    </nav>
                </div>
                
                <div id="services-content-container" class="p-4 sm:p-6">
                    <div class="loader mx-auto"></div>
                </div>
            </div>
        </section>`;

    setupEventListeners();
    
    try {
        if (!state.professionals || state.professionals.length === 0) {
            state.professionals = await professionalsApi.getProfessionals(state.establishmentId) || [];
        }
    } catch (error) {
        console.error("Falha ao carregar profissionais:", error);
        showNotification('Erro', 'Não foi possível carregar a lista de profissionais.', 'error');
        state.professionals = [];
    }
    
    currentView = 'services';
    activeServiceFilter = 'all';
    await fetchBaseData();
}