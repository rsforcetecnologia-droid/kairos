// js/ui/professionals.js

// --- 1. IMPORTAÇÕES ---
import * as professionalsApi from '../api/professionals.js';
import * as servicesApi from '../api/services.js';
import * as blockagesApi from '../api/blockages.js';
import { state } from '../state.js';
import { showNotification, showConfirmation } from '../components/modal.js';
import { navigateTo } from '../main.js';

// --- 2. CONSTANTES E VARIÁVEIS DO MÓDULO ---
const contentDiv = document.getElementById('content');
const daysOfWeek = { monday: 'Segunda', tuesday: 'Terça', wednesday: 'Quarta', thursday: 'Quinta', friday: 'Sexta', saturday: 'Sábado', sunday: 'Domingo' };
let selectedProfessionals = new Set(); // Resetado: Não usado mais nesta tela.

// --- 3. FUNÇÕES DE RENDERIZAÇÃO E LÓGICA ---

function renderProfessionalsListHTML(professionals) {
    if (professionals.length === 0) {
        return `<p class="col-span-full text-center text-gray-500">Nenhum profissional encontrado.</p>`;
    }

    return professionals.map(prof => {
        const isInactive = prof.status === 'inactive';
        const photoSrc = prof.photo || `https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(prof.name.charAt(0))}`;
        const profDataString = JSON.stringify(prof).replace(/'/g, "&apos;");

        return `
            <div class="professional-card bg-white rounded-lg shadow-md p-4 text-center flex flex-col cursor-pointer transition-transform transform hover:-translate-y-1 hover:shadow-xl ${isInactive ? 'opacity-60' : ''}" 
                 data-action="open-professional-modal" data-professional='${profDataString}'>
                
                <img src="${photoSrc}" alt="Foto de ${prof.name}" class="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-gray-200 object-cover">
                <div class="flex-grow">
                    <h3 class="text-md font-bold text-gray-900">${prof.name}</h3>
                    <p class="text-sm text-gray-500">${prof.specialty || 'Especialidade'}</p>
                </div>
                <div class="mt-2 pt-2 border-t">
                     <span class="text-xs font-semibold py-1 px-3 rounded-full ${isInactive ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}">
                        ${isInactive ? 'Inativo' : 'Ativo'}
                    </span>
                </div>
            </div>`;
    }).join('');
}

function closeProfessionalModal() {
    const modal = document.getElementById('genericModal');
    modal.style.display = 'none';
}


async function openProfessionalModal(professional) {
    const modal = document.getElementById('genericModal');
    const services = state.services || await servicesApi.getServices(state.establishmentId);
    const professionals = state.professionals || await professionalsApi.getProfessionals(state.establishmentId);

    const modalHTML = `
        <div class="modal-content max-w-5xl p-0">
            <div class="modal-header px-6 py-4 flex justify-between items-center border-b">
                <h2 class="text-2xl font-bold text-gray-800">${professional.name || 'Novo Profissional'}</h2>
                <button data-action="close-modal" class="text-gray-500 hover:text-gray-800 text-3xl">&times;</button>
            </div>
            <div class="modal-tabs px-6 border-b flex items-center">
                <button class="tab-link active" data-tab="cadastro">Cadastro</button>
                <button class="tab-link" data-tab="jornada">Jornada</button>
                <button class="tab-link" data-tab="bloqueios">Bloqueios</button>
                <button class="tab-link" data-tab="comissoes">Comissões</button>
            </div>
            <div class="modal-body p-6 bg-gray-50 max-h-[65vh] overflow-y-auto">
                <div id="cadastro" class="tab-content active"><form id="professionalForm" class="space-y-6"></form></div>
                <div id="jornada" class="tab-content hidden"></div>
                <div id="bloqueios" class="tab-content hidden"></div>
                <div id="comissoes" class="tab-content hidden"><h3 class="text-xl font-semibold mb-4">Personalizar Comissões</h3><p>Funcionalidade de comissões personalizadas será implementada aqui.</p></div>
            </div>
            <div class="modal-footer px-6 py-4 bg-gray-100 flex justify-between items-center">
                <button data-action="delete-professional" data-id="${professional.id}" class="text-red-600 font-semibold hover:text-red-800 ${professional.id ? '' : 'hidden'}">Excluir Profissional</button>
                <div>
                    <button data-action="close-modal" class="py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 mr-2">Cancelar</button>
                    <button id="save-professional-btn" class="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Salvar</button>
                </div>
            </div>
        </div>`;

    modal.innerHTML = modalHTML;
    modal.style.display = 'flex';

    fillCadastroTab(professional, services);
    fillJornadaTab(professional);
    fillBloqueiosTab(professional, professionals);

    setupModalEventListeners(professional);
}

function fillCadastroTab(prof, services) {
    const form = document.getElementById('professionalForm');
    const dob = prof.dob ? prof.dob.split('/') : ['', ''];
    const monthOptions = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        const selected = month == dob[1] ? 'selected' : '';
        const monthName = new Date(0, i).toLocaleString('pt-BR', { month: 'long' });
        return `<option value="${month}" ${selected}>${monthName.charAt(0).toUpperCase() + monthName.slice(1)}</option>`;
    }).join('');
    
    // Define o status padrão como 'active' se não estiver definido
    const currentStatus = prof.status || 'active';

    form.innerHTML = `
        <input type="hidden" id="professionalId" value="${prof.id || ''}">
        <input type="hidden" id="profPhotoBase64" value="${prof.photo || ''}">
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="md:col-span-1 space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Foto de Perfil</label>
                    <div class="mt-1 flex flex-col items-center">
                        <img id="profPhotoPreview" src="${prof.photo || `https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(prof.name ? prof.name.charAt(0) : 'P')}`}" alt="Foto de Perfil" class="w-32 h-32 rounded-full object-cover mb-3 border-4 border-gray-200">
                        <input type="file" id="profPhotoInput" class="hidden" accept="image/*">
                        <button type="button" id="profPhotoButton" class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Alterar Foto</button>
                    </div>
                </div>
                 <div class="form-group">
                    <label for="profStatus">Status</label>
                    <select id="profStatus">
                        <option value="active" ${currentStatus !== 'inactive' ? 'selected' : ''}>Ativo</option>
                        <option value="inactive" ${currentStatus === 'inactive' ? 'selected' : ''}>Inativo</option>
                    </select>
                </div>
            </div>

            <div class="md:col-span-2 space-y-4">
                <div class="form-grid">
                    <div class="form-group"><label for="profName">Nome</label><input type="text" id="profName" value="${prof.name || ''}" required></div>
                    <div class="form-group"><label for="profSpecialty">Especialidade</label><input type="text" id="profSpecialty" value="${prof.specialty || ''}" required></div>
                    <div class="form-group"><label for="profPhone">Número de telefone</label><input type="tel" id="profPhone" value="${prof.phone || ''}"></div>
                    <div class="form-group"><label for="profDobDay">Aniversário (Dia)</label><input type="number" id="profDobDay" value="${dob[0]}" min="1" max="31"></div>
                    <div class="form-group"><label for="profDobMonth">Aniversário (Mês)</label><select id="profDobMonth"><option value="">Selecione...</option>${monthOptions}</select></div>
                    <div class="form-group"><label for="profOrderOnAgenda">Ordem na agenda</label><input type="number" id="profOrderOnAgenda" value="${prof.orderOnAgenda || '1'}" min="1"></div>
                </div>
                 <div class="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div class="form-group"><label for="profCommission">Recebe comissão?</label><select id="profCommission"><option value="sim" ${prof.receivesCommission ? 'selected' : ''}>Sim</option><option value="nao" ${!prof.receivesCommission ? 'selected' : ''}>Não</option></select></div>
                    <div class="form-group"><label for="profShowOnAgenda">Mostrar na agenda</label><select id="profShowOnAgenda"><option value="sim" ${prof.showOnAgenda !== false ? 'selected' : ''}>Sim</option><option value="nao" ${prof.showOnAgenda === false ? 'selected' : ''}>Não</option></select></div>
                </div>
            </div>
        </div>

        <div><label class="block text-sm font-medium text-gray-700">Serviços Realizados</label><div id="profServicesContainer" class="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4 p-4 border rounded-md bg-white max-h-48 overflow-y-auto">${services.map(s => `<label class="flex items-center space-x-2"><input type="checkbox" value="${s.id}" class="rounded" ${prof.services?.includes(s.id) ? 'checked' : ''}><span>${s.name}</span></label>`).join('')}</div></div>
        <div class="form-group"><label for="profNotes">Observações</label><textarea id="profNotes" rows="3">${prof.notes || ''}</textarea></div>`;
}

function fillJornadaTab(prof) {
    const container = document.getElementById('jornada');
    container.innerHTML = `<div><h3 class="text-xl font-semibold mb-4">Jornada de Trabalho Semanal</h3><p class="text-sm text-gray-600 mb-4">Defina os horários de trabalho padrão para este profissional.</p><div id="profScheduleContainer" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"></div></div>`;
    renderAdvancedScheduleSelector(container.querySelector('#profScheduleContainer'), prof.workingHours || {});
}

async function fillBloqueiosTab(prof, allProfessionals) {
    const container = document.getElementById('bloqueios');
    container.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <h3 class="text-xl font-semibold mb-4">Lançamento de Bloqueios</h3>
                <form id="batchBlockageForm" class="p-4 bg-white rounded-lg shadow-inner space-y-3 mb-4">
                    <h4 class="font-semibold text-gray-800">Selecione os Profissionais</h4>
                    <div id="batchProfSelectionContainer" class="max-h-32 overflow-y-auto p-2 border rounded-md space-y-2">
                        ${allProfessionals.map(p => `<label class="flex items-center"><input type="checkbox" name="batch-professionals" value="${p.id}" class="rounded mr-2" ${p.id === prof.id ? 'checked' : ''}><span>${p.name}</span></label>`).join('')}
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <div><label for="batchBlockageStartDate" class="text-sm">Data Início</label><input type="date" id="batchBlockageStartDate" required class="w-full p-2 border rounded-md"></div>
                        <div><label for="batchBlockageEndDate" class="text-sm">Data Fim (Opcional)</label><input type="date" id="batchBlockageEndDate" class="w-full p-2 border rounded-md"></div>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <div><label class="text-sm">Início</label><input type="time" id="batchBlockageStartTime" required class="w-full p-2 border rounded-md"></div>
                        <div><label class="text-sm">Fim</label><input type="time" id="batchBlockageEndTime" required class="w-full p-2 border rounded-md"></div>
                    </div>
                    <div><label class="text-sm">Motivo</label><input type="text" id="batchBlockageReason" placeholder="Ex: Feriado, Evento" class="w-full p-2 border rounded-md"></div>
                    <button type="submit" class="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600">Lançar Bloqueio em Lote</button>
                </form>
            </div>
            <div>
                <h3 class="text-xl font-semibold mb-4">Bloqueios Futuros de ${prof.name}</h3>
                <div id="blockagesList" class="space-y-2 max-h-96 overflow-y-auto pr-2"></div>
            </div>
        </div>`;
    await fetchAndRenderBlockages(prof.id);
}

function renderAdvancedScheduleSelector(container, scheduleData) {
    container.innerHTML = Object.keys(daysOfWeek).map(dayKey => {
        const dayData = scheduleData[dayKey] || {};
        const isChecked = dayData.active !== false;
        return `
            <div class="day-schedule-card p-3 rounded-lg ${isChecked ? 'bg-white' : 'bg-gray-100 disabled'} border">
                 <div class="flex justify-between items-center"><span class="font-semibold text-gray-800">${daysOfWeek[dayKey]}</span><label class="flex items-center cursor-pointer"><div class="relative"><input type="checkbox" data-day="${dayKey}" data-field="active" class="sr-only" ${isChecked ? 'checked' : ''}><div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div></div></label></div>
                <div class="time-inputs grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div><label>Início:</label><input type="time" data-day="${dayKey}" data-field="start" value="${dayData.start || '09:00'}" class="w-full p-1 border rounded"></div>
                    <div><label>Fim:</label><input type="time" data-day="${dayKey}" data-field="end" value="${dayData.end || '18:00'}" class="w-full p-1 border rounded"></div>
                    <div><label>Intervalo:</label><input type="time" data-day="${dayKey}" data-field="breakStart" value="${dayData.breakStart || '12:00'}" class="w-full p-1 border rounded"></div>
                    <div><label>Fim Int.:</label><input type="time" data-day="${dayKey}" data-field="breakEnd" value="${dayData.breakEnd || '13:00'}" class="w-full p-1 border rounded"></div>
                </div>
            </div>`;
    }).join('');
}

async function fetchAndRenderBlockages(professionalId) {
    const listDiv = document.getElementById('blockagesList');
    listDiv.innerHTML = '<div class="loader mx-auto"></div>';
    try {
        const today = new Date().toISOString();
        const nextYear = new Date(); nextYear.setFullYear(nextYear.getFullYear() + 1);
        const blockages = await blockagesApi.getBlockagesByDateRange(state.establishmentId, today, nextYear.toISOString(), professionalId);
        
        const groupedByReason = blockages.reduce((acc, b) => {
            const reason = b.reason || 'Sem motivo';
            if (!acc[reason]) acc[reason] = [];
            acc[reason].push(b);
            return acc;
        }, {});

        if (Object.keys(groupedByReason).length === 0) {
            listDiv.innerHTML = '<p class="text-center text-gray-500 text-sm py-4">Nenhum bloqueio futuro.</p>';
            return;
        }

        listDiv.innerHTML = Object.entries(groupedByReason).map(([reason, group]) => `
            <div class="bg-gray-100 rounded-lg p-3 my-2 space-y-2">
                <div class="flex justify-between items-center pb-2 border-b">
                    <h4 class="font-bold text-gray-700">${reason} (${group.length})</h4>
                    ${group.length > 1 ? `<button data-action="batch-delete-blockage" data-ids='${JSON.stringify(group.map(b => b.id))}' class="text-xs text-red-600 font-semibold">Apagar Lote</button>` : ''}
                </div>
                ${group.map(b => `
                    <div class="flex justify-between items-center bg-white p-2 rounded-md text-sm border">
                        <p class="text-xs text-gray-500">${new Date(b.startTime).toLocaleString('pt-BR')} - ${new Date(b.endTime).toLocaleString('pt-BR')}</p>
                        <button data-action="delete-blockage" data-id="${b.id}" class="text-red-500 p-1 rounded-full hover:bg-red-100">&times;</button>
                    </div>
                `).join('')}
            </div>
        `).join('');
    } catch (error) {
        listDiv.innerHTML = `<p class="text-red-500">${error.message}</p>`;
    }
}

function setupModalEventListeners(professional) {
    const modal = document.getElementById('genericModal');

    modal.querySelectorAll('.tab-link').forEach(button => {
        button.addEventListener('click', () => {
            modal.querySelectorAll('.tab-link').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            modal.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
            document.getElementById(button.dataset.tab).classList.remove('hidden');
        });
    });
    
    // CORREÇÃO: Adiciona listener para fechar o modal ao clicar no botão "Cancelar" ou no "X"
    modal.addEventListener('click', (e) => {
        const closeBtn = e.target.closest('[data-action="close-modal"]');
        if (closeBtn) {
            e.stopPropagation();
            closeProfessionalModal();
        }
    });

    // --- Lógica para upload de foto ---
    const photoInput = document.getElementById('profPhotoInput');
    const photoButton = document.getElementById('profPhotoButton');
    const photoPreview = document.getElementById('profPhotoPreview');
    const photoBase64Input = document.getElementById('profPhotoBase64');

    if (photoButton) {
        photoButton.addEventListener('click', () => photoInput.click());
    }

    if (photoInput) {
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
    }
    // --- FIM Lógica Foto ---


    document.getElementById('save-professional-btn').addEventListener('click', async () => {
        const form = document.getElementById('professionalForm');
        const scheduleContainer = document.getElementById('profScheduleContainer');
        const selectedServices = Array.from(form.querySelectorAll('#profServicesContainer input:checked')).map(cb => cb.value);
        
        const workingHours = {};
        if (scheduleContainer) {
            scheduleContainer.querySelectorAll('.day-schedule-card').forEach(card => {
                const dayKey = card.querySelector('[data-field="active"]').dataset.day;
                workingHours[dayKey] = {
                    active: card.querySelector('[data-field="active"]').checked,
                    start: card.querySelector('[data-field="start"]').value,
                    end: card.querySelector('[data-field="end"]').value,
                    breakStart: card.querySelector('[data-field="breakStart"]').value,
                    breakEnd: card.querySelector('[data-field="breakEnd"]').value,
                };
            });
        }
        
        const professionalData = {
            ...professional,
            name: form.querySelector('#profName').value,
            specialty: form.querySelector('#profSpecialty').value,
            photo: form.querySelector('#profPhotoBase64').value,
            services: selectedServices,
            workingHours: workingHours,
            phone: form.querySelector('#profPhone').value,
            dob: `${form.querySelector('#profDobDay').value}/${form.querySelector('#profDobMonth').value}`,
            receivesCommission: form.querySelector('#profCommission').value === 'sim',
            showOnAgenda: form.querySelector('#profShowOnAgenda').value === 'sim',
            orderOnAgenda: parseInt(form.querySelector('#profOrderOnAgenda').value) || 1,
            notes: form.querySelector('#profNotes').value,
            status: form.querySelector('#profStatus').value
        };
        
        try {
            if (professional.id) {
                await professionalsApi.updateProfessional(professional.id, professionalData);
                showNotification('Sucesso!', 'Profissional atualizado.', 'success');
            } else {
                 await professionalsApi.createProfessional(professionalData);
                showNotification('Sucesso!', 'Profissional criado.', 'success');
            }
            
            closeProfessionalModal();
            loadProfessionalsPage();
        } catch (error) {
            showNotification('Erro', error.message, 'error');
        }
    });
    
    const batchBlockageForm = document.getElementById('batchBlockageForm');
    if(batchBlockageForm) {
        batchBlockageForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const selectedProfIds = Array.from(e.target.querySelectorAll('input[name="batch-professionals"]:checked')).map(cb => cb.value);
            if (selectedProfIds.length === 0) {
                return showNotification('Atenção', 'Selecione pelo menos um profissional.', 'error');
            }

            const batchStartDate = e.target.batchBlockageStartDate.value;
            const batchEndDate = e.target.batchBlockageEndDate.value || batchStartDate;
            const batchStartTime = e.target.batchBlockageStartTime.value;
            const batchEndTime = e.target.batchBlockageEndTime.value;
            const reason = e.target.batchBlockageReason.value;

            const blockagePromises = selectedProfIds.map(profId => {
                const data = {
                    professionalId: profId,
                    establishmentId: state.establishmentId,
                    startTime: new Date(`${batchStartDate}T${batchStartTime}`).toISOString(),
                    endTime: new Date(`${batchEndDate}T${batchEndTime}`).toISOString(),
                    reason: reason
                };
                return blockagesApi.createBlockage(data);
            });

            try {
                await Promise.all(blockagePromises);
                showNotification('Sucesso!', `${selectedProfIds.length} bloqueios foram criados.`);
                fetchAndRenderBlockages(professional.id);
            } catch (error) {
                showNotification('Erro', error.message, 'error');
            }
        });
    }

    const blockagesList = document.getElementById('blockagesList');
    if (blockagesList) {
        blockagesList.addEventListener('click', async (e) => {
            const deleteBtn = e.target.closest('[data-action="delete-blockage"]');
            const batchDeleteBtn = e.target.closest('[data-action="batch-delete-blockage"]');
            
            if (deleteBtn) {
                const id = deleteBtn.dataset.id;
                if (await showConfirmation('Apagar Bloqueio', 'Tem certeza?')) {
                    try {
                        await blockagesApi.deleteBlockage(id);
                        showNotification('Bloqueio removido.', 'success');
                        fetchAndRenderBlockages(professional.id);
                    } catch (error) {
                        showNotification('Erro', error.message, 'error');
                    }
                }
            } else if (batchDeleteBtn) {
                const ids = JSON.parse(batchDeleteBtn.dataset.ids);
                if (await showConfirmation('Apagar em Lote', `Tem certeza que deseja apagar ${ids.length} bloqueios com este motivo?`)) {
                    try {
                        await blockagesApi.batchDeleteBlockages(ids);
                        showNotification('Bloqueios removidos.', 'success');
                        fetchAndRenderBlockages(professional.id);
                    } catch (error) {
                        showNotification('Erro', error.message, 'error');
                    }
                }
            }
        });
    }

    modal.querySelector('[data-action="delete-professional"]').addEventListener('click', async () => {
        const confirmed = await showConfirmation('Excluir Profissional', `Tem certeza que deseja excluir ${professional.name}? Esta ação não pode ser desfeita.`);
        if(confirmed) {
            try {
                await professionalsApi.deleteProfessional(professional.id);
                showNotification('Sucesso!', 'Profissional excluído.', 'success');
                closeProfessionalModal();
                loadProfessionalsPage();
            } catch (error) {
                 showNotification('Erro', `Não foi possível excluir: ${error.message}`, 'error');
            }
        }
    });
}

function updateBatchActionsVisibility() {
    const container = document.getElementById('batch-actions-container');
    const countSpan = document.getElementById('selected-count');
    if (!container || !countSpan) return;

    if (selectedProfessionals.size > 0) {
        countSpan.textContent = `${selectedProfessionals.size} selecionado(s)`;
        container.classList.remove('hidden');
    } else {
        container.classList.add('hidden');
    }
}

function handleBatchDelete() {
    showConfirmation('Excluir em Lote', `Tem certeza que deseja excluir ${selectedProfessionals.size} profissionais? Esta ação não pode ser desfeita.`)
        .then(async (confirmed) => {
            if (confirmed) {
                try {
                    await professionalsApi.batchDeleteProfessionals(Array.from(selectedProfessionals));
                    showNotification('Sucesso!', `${selectedProfessionals.size} profissionais foram excluídos.`, 'success');
                    selectedProfessionals.clear();
                    updateBatchActionsVisibility();
                    loadProfessionalsPage();
                } catch (error) {
                    showNotification('Erro', `Não foi possível excluir em lote: ${error.message}`, 'error');
                }
            }
        });
}

function filterAndRenderProfessionals() {
    const listDiv = document.getElementById('professionalsList');
    const showInactive = document.getElementById('showInactiveProfToggle').checked;
    const searchTerm = document.getElementById('profSearchInput').value.toLowerCase();

    const filtered = state.professionals.filter(p => {
        const nameMatch = p.name.toLowerCase().includes(searchTerm);
        const statusMatch = showInactive || p.status !== 'inactive';
        return nameMatch && statusMatch;
    });
    listDiv.innerHTML = renderProfessionalsListHTML(filtered);
}

export async function loadProfessionalsPage() {
    selectedProfessionals.clear();
    contentDiv.innerHTML = `
        <section id="professional-list-view">
            <div class="flex flex-wrap justify-between items-center mb-6 gap-4">
                <h2 class="text-3xl font-bold text-gray-800">Sua Equipe</h2>
                <div class="flex items-center gap-4 w-full md:w-auto">
                    <input type="search" id="profSearchInput" placeholder="Pesquisar por nome..." class="w-full md:w-64 p-2 border rounded-md shadow-sm">
                    <label class="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" id="showInactiveProfToggle" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                        <span class="text-sm font-medium text-gray-700">Mostrar Inativos</span>
                    </label>
                    <button data-action="open-professional-modal" data-professional="{}" class="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 flex-shrink-0">
                        + Novo Profissional
                    </button>
                </div>
            </div>

            <div id="batch-actions-container" class="hidden bg-indigo-600 text-white p-3 rounded-lg shadow-md mb-6 flex justify-between items-center">
                <span id="selected-count" class="font-semibold"></span>
                <div>
                    <button data-action="batch-delete" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">Excluir Selecionados</button>
                </div>
            </div>

            <div id="professionalsList" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"></div>
        </section>`;

    document.getElementById('profSearchInput').addEventListener('input', filterAndRenderProfessionals);
    document.getElementById('showInactiveProfToggle').addEventListener('change', filterAndRenderProfessionals);

    contentDiv.addEventListener('click', e => {
        const card = e.target.closest('[data-action="open-professional-modal"]');
        const checkbox = e.target.closest('.professional-checkbox');
        const batchDeleteButton = e.target.closest('[data-action="batch-delete"]');

        if (checkbox) {
            const id = checkbox.dataset.id;
            if (checkbox.checked) {
                selectedProfessionals.add(id);
            } else {
                selectedProfessionals.delete(id);
            }
            filterAndRenderProfessionals();
            updateBatchActionsVisibility();
            return;
        }

        if (card) {
            e.preventDefault();
            let profData = {};
            if (card.dataset.professional) {
                try {
                    profData = JSON.parse(card.dataset.professional);
                } catch (error) {
                    console.error("Erro ao fazer parse do professional data:", error);
                    return;
                }
            }
            openProfessionalModal(profData);
        }

        if (batchDeleteButton) {
            handleBatchDelete();
        }
    });

    const listDiv = document.getElementById('professionalsList');
    listDiv.innerHTML = '<div class="loader col-span-full mx-auto"></div>';
    try {
        const [professionals, services] = await Promise.all([
            // A API agora inclui inativos para o painel de gestão
            professionalsApi.getProfessionals(state.establishmentId),
            servicesApi.getServices(state.establishmentId)
        ]);
        state.professionals = professionals;
        state.services = services;
        filterAndRenderProfessionals();
        updateBatchActionsVisibility();
    } catch (error) {
        listDiv.innerHTML = '<p class="text-red-500 col-span-full">Erro ao carregar dados da página.</p>';
    }
}
