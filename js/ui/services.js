// js/ui/services.js

// --- 1. IMPORTAÇÕES ---
import * as servicesApi from '../api/services.js';
import * as professionalsApi from '../api/professionals.js';
import { getHierarchy } from '../api/establishments.js'; // NOVO: Para buscar a hierarquia
import { state } from '../state.js';
import { showNotification, showConfirmation, showGenericModal } from '../components/modal.js';
import * as categoriesApi from '../api/categories.js'; 
import { navigateTo } from '../main.js';
import { logAction } from '../api/audit.js';
import { auth } from '../firebase-config.js';
import { escapeHTML, resizeAndCompressImage } from '../utils.js'; 

// --- 2. CONSTANTES E VARIÁVEIS DO MÓDULO ---
const contentDiv = document.getElementById('content');
let pageEventListener = null;
let currentView = 'services'; 
let activeServiceFilter = 'all'; 
let hierarchyCache = []; // NOVO: Cache da hierarquia da rede

// --- FUNÇÃO AUXILIAR PARA OBTER UTILIZADOR ATUAL (Para o Log) ---
function getCurrentUserForLog() {
    const user = auth.currentUser;
    if (!user) return { uid: 'unknown', name: 'Desconhecido' };
    return { uid: user.uid, name: user.displayName || user.email };
}

// --- 3. LÓGICA DE CATEGORIAS (MODAL) ---
async function handleCategoryFormSubmit(e) {
    e.preventDefault();
    const form = e.target.closest('#categoryForm');
    const categoryNameInput = form.querySelector('#categoryName');
    const name = categoryNameInput.value;
    if (!name) return;
    
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = '...';

    try {
        // As categorias são "Globais". Criamos um array com os IDs de toda a rede.
        const accessibleIn = hierarchyCache.reduce((acc, curr) => {
            acc.push(curr.id);
            if(curr.branches) curr.branches.forEach(b => acc.push(b.id));
            return acc;
        }, []);
        
        if(accessibleIn.length === 0) accessibleIn.push(state.establishmentId);

        await categoriesApi.createCategory({ 
            establishmentId: state.establishmentId, 
            name,
            accessibleIn // Envia o array de rede
        }, 'services');
        
        logAction(state.establishmentId, getCurrentUserForLog(), 'Categorias (Serviços)', 'Criou', `Criou categoria: ${name}`);

        categoryNameInput.value = '';
        showNotification('Sucesso', 'Categoria criada!', 'success');
        await fetchAndDisplayCategoriesInModal();
        await fetchBaseData(); 
    } catch (error) {
        showNotification('Erro', `Não foi possível criar a categoria: ${error.message}`, 'error');
    } finally {
        btn.disabled = false; btn.textContent = 'Adicionar';
    }
}

async function handleDeleteCategory(categoryId) {
    const confirmed = await showConfirmation('Apagar Categoria', 'Tem a certeza? Os serviços nesta categoria ficarão sem categoria.');
    if (confirmed) {
        try {
            await categoriesApi.deleteCategory(categoryId, 'services');
            logAction(state.establishmentId, getCurrentUserForLog(), 'Categorias (Serviços)', 'Excluiu', `Excluiu uma categoria (ID: ${categoryId})`);

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
                    <span>${escapeHTML(cat.name)}</span>
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
            <div class="mb-4 bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                <p class="text-xs text-indigo-800 mb-3 font-medium">As categorias criadas aqui ficarão disponíveis para toda a rede.</p>
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

// --- NOVO: GERADOR DE CHECKBOXES PARA MULTI-TENANT ---
function generateUnitCheckboxesHTML(selectedIds = []) {
    if (!hierarchyCache || hierarchyCache.length === 0) {
        return `
            <input type="hidden" name="accessibleIn" value="${state.establishmentId}">
            <div class="bg-gray-50 p-3 rounded border text-sm text-gray-500">
                Disponível apenas nesta unidade. Crie mais lojas para distribuir serviços.
            </div>`;
    }

    let html = '<div class="space-y-1 mt-2 max-h-48 overflow-y-auto p-3 border border-indigo-100 rounded-lg bg-indigo-50/30">';
    
    hierarchyCache.forEach(matriz => {
        const isMatrizSelected = selectedIds.includes(matriz.id) || (selectedIds.length === 0 && matriz.id === state.establishmentId);
        
        html += `
            <label class="flex items-center space-x-3 py-1.5 cursor-pointer hover:bg-white rounded px-2 transition-colors">
                <input type="checkbox" name="accessibleIn" value="${matriz.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${isMatrizSelected ? 'checked' : ''}>
                <span class="text-sm font-bold text-gray-800">🏢 ${escapeHTML(matriz.name)} (Matriz)</span>
            </label>
        `;
        
        if (matriz.branches && matriz.branches.length > 0) {
            matriz.branches.forEach(branch => {
                const isBranchSelected = selectedIds.includes(branch.id) || (selectedIds.length === 0 && branch.id === state.establishmentId);
                html += `
                    <label class="flex items-center space-x-3 py-1.5 ml-6 cursor-pointer hover:bg-white rounded px-2 transition-colors border-l-2 border-indigo-100 pl-4">
                        <input type="checkbox" name="accessibleIn" value="${branch.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${isBranchSelected ? 'checked' : ''}>
                        <span class="text-sm font-medium text-gray-600">📍 ${escapeHTML(branch.name)}</span>
                    </label>
                `;
            });
        }
    });
    
    html += '</div>';
    return html;
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

    // 🎯 Lógica de Captura das Unidades Selecionadas
    const checkedUnits = Array.from(form.querySelectorAll('input[name="accessibleIn"]:checked')).map(cb => cb.value);
    const accessibleIn = checkedUnits.length > 0 ? checkedUnits : [state.establishmentId];

    const serviceData = {
        establishmentId: state.establishmentId, // Fica guardado como o dono "Raiz" do serviço
        accessibleIn: accessibleIn, // Array Multi-Loja
        name: form.querySelector('#serviceName').value.trim(),
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
            logAction(state.establishmentId, getCurrentUserForLog(), 'Serviços', 'Editou', `Editou o serviço: ${serviceData.name}`);
        } else {
            await servicesApi.createService(serviceData);
            logAction(state.establishmentId, getCurrentUserForLog(), 'Serviços', 'Criou', `Criou novo serviço: ${serviceData.name}`);
        }
        document.getElementById('serviceModal').style.display = 'none';
        showNotification('Sucesso', `Serviço ${serviceId ? 'atualizado' : 'adicionado'} com sucesso!`, 'success');
        await fetchBaseData(); 
    } catch (error) {
        showNotification('Erro', error.message, 'error');
    }
}

function openServiceModal(service = null) {
    const modal = document.getElementById('serviceModal');
    const categories = state.serviceCategories || []; 

    const durationInMinutes = service?.duration || 0; 
    const bufferTimeInMinutes = service?.bufferTime || 0; 
    
    const safeName = escapeHTML(service?.name || '');
    const safeNotes = escapeHTML(service?.notes || '');
    const safeTitle = service ? safeName : 'Novo Serviço';

    const categoryOptions = categories.map(c => 
        `<option value="${c.id}" ${service?.categoryId === c.id ? 'selected' : ''}>${escapeHTML(c.name)}</option>`
    ).join('');

    modal.innerHTML = `
    <div class="modal-content max-w-3xl overflow-y-auto max-h-[85vh] my-auto">
        <form id="serviceForm">
            <input type="hidden" id="serviceId" value="${service?.id || ''}">
            <input type="hidden" id="servicePhotoBase64" value="${service?.photo || ''}">
            
            <div class="flex justify-between items-center mb-4">
                <h2 id="serviceModalTitle" class="text-2xl font-bold text-gray-800">${safeTitle}</h2>
                <button type="button" data-action="close-modal" data-target="serviceModal" class="text-2xl font-bold hover:text-red-500">&times;</button>
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
                        <img id="servicePhotoPreview" src="${service?.photo || 'https://placehold.co/128x128/E2E8F0/4A5568?text=Foto'}" alt="Foto" class="w-32 h-32 rounded-lg object-cover mb-3 border-4 border-gray-200 bg-gray-50">
                        <input type="file" id="servicePhotoInput" class="hidden" accept="image/*">
                        <button type="button" id="servicePhotoButton" class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Alterar Imagem</button>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="md:col-span-2">
                        <label for="serviceName" class="block text-sm font-medium text-gray-700">Nome do serviço</label>
                        <input type="text" id="serviceName" value="${safeName}" class="mt-1 w-full p-2 border rounded-md" required>
                    </div>
                    <div>
                        <label for="servicePrice" class="block text-sm font-medium text-gray-700">Preço (a partir de:)</label>
                        <input type="number" id="servicePrice" step="0.01" value="${service?.price !== undefined ? service.price : ''}" class="mt-1 w-full p-2 border rounded-md" required>
                    </div>
                    <div>
                        <label for="serviceCategory" class="block text-sm font-medium text-gray-700">Categoria</label>
                        <select id="serviceCategory" class="mt-1 w-full p-2 border rounded-md bg-white">
                            <option value="">Sem Categoria</option>
                            ${categoryOptions}
                        </select>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4 md:col-span-2">
                        <div>
                            <label for="serviceDurationMinutes" class="block text-sm font-medium text-gray-700">Duração (minutos)</label>
                            <input type="number" id="serviceDurationMinutes" min="0" value="${durationInMinutes}" class="mt-1 w-full p-2 border rounded-md" required>
                        </div>
                        <div>
                            <label for="serviceBufferTimeMinutes" class="block text-sm font-medium text-gray-700">Minutos Extras (Pausa)</label>
                            <input type="number" id="serviceBufferTimeMinutes" min="0" value="${bufferTimeInMinutes}" class="mt-1 w-full p-2 border rounded-md">
                        </div>
                    </div>
                </div>

                <div class="pt-4 border-t border-gray-100 mt-2">
                    <label class="block text-sm font-bold text-indigo-900 mb-1">Distribuição na Rede</label>
                    <p class="text-xs text-gray-500 mb-2">Marque as unidades em que este serviço será realizado.</p>
                    ${generateUnitCheckboxesHTML(service?.accessibleIn || [])}
                </div>

                <div class="pt-4 border-t border-gray-100 mt-2">
                    <label for="serviceNotes" class="block text-sm font-medium text-gray-700">Observações Internas</label>
                    <textarea id="serviceNotes" rows="3" class="mt-1 w-full p-2 border rounded-md">${safeNotes}</textarea>
                </div>
                <div>
                    <label for="serviceStatus" class="block text-sm font-medium text-gray-700">Status</label>
                    <select id="serviceStatus" class="mt-1 w-full p-2 border rounded-md bg-white">
                        <option value="true" ${service?.active !== false ? 'selected' : ''}>Ativo (Visível na Agenda)</option>
                        <option value="false" ${service?.active === false ? 'selected' : ''}>Inativo (Oculto)</option>
                    </select>
                </div>
            </div>
            
            <div id="tab-content-comissoes" class="tab-content hidden space-y-6">
                <div>
                    <label class="block text-lg font-medium text-gray-800">Tipo de comissão</label>
                    <p class="text-sm text-gray-500">Qual o tipo de comissão que é paga neste serviço?</p>
                    <div class="mt-2 space-y-2">
                        <label class="flex items-center p-3 border rounded-md has-[:checked]:bg-indigo-50 cursor-pointer">
                            <input type="radio" name="commissionType" value="default" class="h-4 w-4 text-indigo-600" ${service?.commissionType !== 'custom' ? 'checked' : ''}>
                            <span class="ml-3 text-sm text-gray-700 font-medium">Padrão para todos os profissionais</span>
                        </label>
                        <label class="flex items-center p-3 border rounded-md has-[:checked]:bg-indigo-50 cursor-pointer">
                            <input type="radio" name="commissionType" value="custom" class="h-4 w-4 text-indigo-600" ${service?.commissionType === 'custom' ? 'checked' : ''}>
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
                     <p class="text-sm text-gray-500 mb-2">Selecione os profissionais e informe a comissão de cada um.</p>
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
                <button type="button" data-action="delete-service" data-id="${service?.id || ''}" class="w-full sm:w-auto text-red-600 hover:text-red-800 font-medium ${!service ? 'hidden' : ''}">Excluir Serviço</button>
                <div class="flex flex-col-reverse sm:flex-row w-full sm:w-auto gap-3">
                    <button type="button" data-action="close-modal" data-target="serviceModal" class="w-full sm:w-auto py-2 px-6 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">Cancelar</button>
                    <button type="submit" class="w-full sm:w-auto py-2 px-6 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">Salvar</button>
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

        if (action === 'close-modal') modal.style.display = 'none';

        if (action === 'delete-service') {
            if (!serviceId) return;
            modal.style.display = 'none'; 
            
            const confirmed = await showConfirmation('Apagar Serviço', 'Tem a certeza que deseja apagar este serviço?');
            if (confirmed) {
                try {
                    const serviceName = state.services.find(s => s.id === serviceId)?.name || 'Desconhecido';
                    await servicesApi.deleteService(serviceId);
                    logAction(state.establishmentId, getCurrentUserForLog(), 'Serviços', 'Excluiu', `Excluiu o serviço: ${serviceName}`);
                    showNotification('Sucesso', 'Serviço apagado com sucesso!', 'success');
                    await fetchBaseData(); 
                } catch (error) {
                    showNotification('Erro', `Não foi possível apagar o serviço: ${error.message}`, 'error');
                }
            } else {
                 modal.style.display = 'flex'; 
            }
        }
    });

    const tabs = modal.querySelectorAll('.tab-btn');
    const tabContents = modal.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => {
                t.classList.remove('border-indigo-500', 'text-indigo-600');
                t.classList.add('border-transparent', 'text-gray-500');
            });
            tab.classList.add('border-indigo-500', 'text-indigo-600');
            tab.classList.remove('border-transparent', 'text-gray-500');
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
                        <input type="checkbox" ${isChecked ? 'checked' : ''} class="h-4 w-4 rounded border-gray-300 text-indigo-600">
                        <img src="${prof.photo || `https://placehold.co/40x40/E2E8F0/4A5568?text=${escapeHTML(prof.name.charAt(0))}`}" class="w-8 h-8 rounded-full object-cover">
                        <span class="text-sm font-medium">${escapeHTML(prof.name)}</span>
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
    
    modal.querySelector('#servicePhotoButton').addEventListener('click', () => photoInput.click());

    photoInput.onchange = async () => {
        const file = photoInput.files[0];
        if (!file) return;
        photoPreview.src = 'https://placehold.co/128x128/E2E8F0/4A5568?text=...'; 
        try {
            const resizedBase64 = await resizeAndCompressImage(file, 800, 800, 0.8);
            const sizeInBytes = (resizedBase64.length * 3) / 4; 
            if (sizeInBytes > 1000 * 1024) throw new Error('Imagem muito grande.');
            photoPreview.src = resizedBase64;
            photoBase64Input.value = resizedBase64;
        } catch (error) {
            showNotification('Erro de Imagem', error.message, 'error');
            photoPreview.src = service?.photo || 'https://placehold.co/128x128/E2E8F0/4A5568?text=Foto';
            photoBase64Input.value = service?.photo || '';
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
            
            card.className = `service-card bg-white rounded-lg shadow-md flex overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:border-indigo-300 border border-transparent ${service.active !== false ? 'opacity-100' : 'opacity-60 bg-gray-100'} sm:flex-col`;
            card.dataset.action = 'edit-service'; 
            card.dataset.service = serviceDataString; 

            const safeServiceName = escapeHTML(service.name);
            const safeCategoryName = escapeHTML(categoryMap.get(service.categoryId) || 'Sem Categoria');
            const photoSrc = service.photo || `https://placehold.co/200x200/E2E8F0/4A5568?text=${encodeURIComponent(service.name.charAt(0))}`;

            card.innerHTML = `
                <img src="${photoSrc}" alt="Imagem" class="w-24 h-24 object-cover flex-shrink-0 sm:w-full sm:h-32">
                <div class="p-3 flex flex-col flex-grow justify-between w-full">
                    <div class="flex justify-between items-start mb-1">
                        <h3 class="text-sm font-bold text-gray-900 flex-1 text-left truncate pr-2">${safeServiceName}</h3>
                        <label class="flex items-center cursor-pointer ml-2" data-action-stop-propagation="true">
                            <div class="relative">
                                <input type="checkbox" data-action="toggle-service-status" data-id="${service.id}" class="sr-only" ${service.active !== false ? 'checked' : ''}>
                                <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                            </div>
                        </label>
                    </div>
                    <p class="text-lg font-bold text-indigo-600 mb-1 text-left hidden sm:block">R$ ${service.price.toFixed(2)}</p>
                    <div>
                        <div class="hidden sm:block">
                            <p class="text-xs text-gray-500 text-left mb-1 truncate">${safeCategoryName}</p>
                            <p class="text-xs text-gray-500 text-left">${service.duration} min</p>
                        </div>
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
        if (s.active === false) indicators.inactive++;
        else indicators.active++;
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
            popularEl.textContent = escapeHTML(state.mostPopularService.name);
            popularEl.closest('.indicator-card').title = `${state.mostPopularService.name} (${state.mostPopularService.count} agendamentos)`;
        } else {
            popularEl.textContent = 'Nenhum agendado';
        }
    }
}

function renderServicesView() {
    const container = document.getElementById('services-content-container');
    container.innerHTML = `
        <div class="flex flex-col sm:flex-row gap-4 mb-6">
            <input type="search" id="serviceSearchInput" placeholder="Pesquisar por nome..." class="w-full sm:w-64 p-2.5 border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-indigo-500">
            <select id="serviceCategoryFilter" class="w-full sm:w-auto p-2.5 border border-gray-300 rounded-lg bg-white shadow-sm outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="all">Todas as categorias</option>
            </select>
        </div>
        
        <div class="grid grid-cols-2 gap-3 mb-6 lg:grid-cols-4 lg:gap-4">
            <div data-action="filter-service" data-filter-type="total" class="indicator-card bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all hover:shadow-md ring-2 ring-indigo-500">
                <div class="bg-blue-100 p-2 rounded-lg"><i class="bi bi-ui-radios-grid text-xl text-blue-600"></i></div>
                <div><p class="text-xs text-gray-500 uppercase tracking-wider font-bold">Total</p><p id="indicator-total" class="text-2xl font-bold text-gray-800">0</p></div>
            </div>
            <div data-action="filter-service" data-filter-type="active" class="indicator-card bg-green-50 border border-green-100 p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all hover:shadow-md">
                <div class="bg-green-100 p-2 rounded-lg"><i class="bi bi-check-circle text-xl text-green-600"></i></div>
                <div><p class="text-xs text-gray-500 uppercase tracking-wider font-bold">Ativos</p><p id="indicator-active" class="text-2xl font-bold text-gray-800">0</p></div>
            </div>
            <div data-action="filter-service" data-filter-type="inactive" class="indicator-card bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all hover:shadow-md">
                <div class="bg-red-100 p-2 rounded-lg"><i class="bi bi-x-circle text-xl text-red-600"></i></div>
                <div><p class="text-xs text-gray-500 uppercase tracking-wider font-bold">Inativos</p><p id="indicator-inactive" class="text-2xl font-bold text-gray-800">0</p></div>
            </div>
            <div id="popular-card" data-action="filter-service" data-filter-type="popular" class="indicator-card bg-amber-50 border border-amber-100 p-4 rounded-xl flex items-center gap-4 transition-all opacity-80">
                <div class="bg-amber-100 p-2 rounded-lg"><i class="bi bi-star-fill text-xl text-amber-600"></i></div>
                <div class="overflow-hidden w-full"><p class="text-xs text-gray-500 uppercase tracking-wider font-bold">Favorito</p><p id="indicator-popular" class="text-lg font-bold text-gray-800 truncate">...</p></div>
            </div>
        </div>

        <div id="servicesList" class="space-y-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-4">
            <div class="loader col-span-full mx-auto my-10"></div>
        </div>
        
        <button data-action="new-service" class="fixed z-30 bottom-24 right-6 sm:bottom-8 sm:right-8 bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition-transform hover:scale-110">
            <i class="bi bi-plus-lg text-2xl"></i>
        </button>
    `;

    const categoryFilter = document.getElementById('serviceCategoryFilter');
    if (categoryFilter) {
        categoryFilter.innerHTML = '<option value="all">Todas as categorias</option>';
        (state.serviceCategories || []).forEach(cat => categoryFilter.innerHTML += `<option value="${cat.id}">${escapeHTML(cat.name)}</option>`);
    }

    renderServiceIndicators();
    renderServicesList();
}

function renderServiceReportsView() {
    const container = document.getElementById('services-content-container');
    container.innerHTML = `
        <div class="p-12 text-center bg-gray-50 border border-dashed border-gray-300 rounded-xl max-w-lg mx-auto mt-10">
            <i class="bi bi-bar-chart-line text-4xl text-indigo-300 mb-4 block"></i>
            <h3 class="text-xl font-bold text-gray-700">Relatórios de Serviços</h3>
            <p class="text-gray-500 mt-2 text-sm">Acompanhe métricas de conversão e lucratividade por serviço e unidade. (Em breve)</p>
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
        const [servicesData, professionalsData, categoriesData, mostPopularData, hierarchyData] = await Promise.all([
            servicesApi.getServices(state.establishmentId),
            professionalsApi.getProfessionals(state.establishmentId),
            categoriesApi.getCategories(state.establishmentId, 'services'), 
            servicesApi.getMostPopularService(state.establishmentId),
            getHierarchy() // Busca a estrutura da rede!
        ]);
        
        state.services = (servicesData || []).filter(Boolean);
        state.professionals = (professionalsData || []).filter(Boolean);
        state.serviceCategories = (categoriesData || []).filter(Boolean);
        state.mostPopularService = mostPopularData || { name: 'N/A', count: 0 }; 
        hierarchyCache = hierarchyData?.matrizes || [];
        
        state.services.forEach(s => {
            if (s.active === undefined) s.active = true;
        });

        switchTab(currentView);

    } catch (error) {
        if (contentContainer) {
            contentContainer.innerHTML = '<p class="text-red-500 text-center py-10">Erro ao carregar dados. Verifique a conexão com o servidor.</p>';
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
                
                logAction(state.establishmentId, getCurrentUserForLog(), 'Serviços', 'Atualizou Status', `Alterou status do serviço (ID: ${serviceId}) para ${newStatus ? 'Ativo' : 'Inativo'}`);

                renderServicesList();
                renderServiceIndicators();
            } catch (error) {
                showNotification('Erro', `Não foi possível atualizar o status: ${error.message}`, 'error');
                toggle.checked = !newStatus;
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
                    card.classList.toggle('shadow-md', isSelected);
                    card.classList.toggle('bg-white', !isSelected);
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
        <div class="max-w-7xl mx-auto w-full pb-20">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div id="services-tabs" class="border-b border-gray-200 bg-gray-50/50">
                    <nav class="-mb-px flex space-x-8 px-6 overflow-x-auto" aria-label="Tabs">
                        <button data-view="services" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm border-indigo-500 text-indigo-600 transition-colors">
                            <i class="bi bi-scissors mr-2"></i> Meus Serviços
                        </button>
                        <button data-action="manage-categories" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300 transition-colors">
                            <i class="bi bi-tags mr-2"></i> Categorias
                        </button>
                        <button data-view="reports" class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300 transition-colors">
                            <i class="bi bi-graph-up mr-2"></i> Relatórios
                        </button>
                    </nav>
                </div>
                
                <div id="services-content-container" class="p-6 bg-white min-h-[500px] relative">
                    <div class="loader mx-auto mt-20"></div>
                </div>
            </div>
        </div>`;

    setupEventListeners();
    
    currentView = 'services';
    activeServiceFilter = 'all';
    await fetchBaseData();
}