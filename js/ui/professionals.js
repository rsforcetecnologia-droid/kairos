// js/ui/professionals.js (Versão Completa e Blindada + Resize Otimizado)

// --- 1. IMPORTAÇÕES ---
import * as professionalsApi from '../api/professionals.js';
import * as servicesApi from '../api/services.js';
import * as blockagesApi from '../api/blockages.js';
import { state } from '../state.js';
import { showNotification, showConfirmation } from '../components/modal.js';
// CORREÇÃO: Importamos resizeAndCompressImage para centralizar a lógica e evitar duplicação
import { escapeHTML, resizeAndCompressImage } from '../utils.js'; 

// --- 2. CONSTANTES E VARIÁVEIS DO MÓDULO ---
const contentDiv = document.getElementById('content');
const daysOfWeek = { monday: 'Segunda', tuesday: 'Terça', wednesday: 'Quarta', thursday: 'Quinta', friday: 'Sexta', saturday: 'Sábado', sunday: 'Domingo' };
let selectedProfessionals = new Set();
let pageEventListener = null;
let modalEventListener = null;


// --- 3. FUNÇÕES DE RENDERIZAÇÃO E LÓGICA ---

// Renderiza esqueletos de carregamento (UX)
function renderSkeletonList(count = 8) {
    let skeletonHTML = '';
    for (let i = 0; i < count; i++) {
        skeletonHTML += `
        <div class="bg-white rounded-lg shadow-md flex items-center gap-4 p-3 overflow-hidden animate-pulse sm:flex-col sm:items-stretch sm:p-0 sm:gap-0">
            <div class="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg"></div>
            <div class="flex-1 space-y-3 sm:p-4">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        `;
    }
    return skeletonHTML;
}

// Renderiza a lista de profissionais (Lista no Mobile / Grid no Desktop)
function renderProfessionalsListHTML(professionals) {
    if (professionals.length === 0) {
        return `<p class="col-span-full text-center text-gray-500 py-10">Nenhum profissional encontrado.</p>`;
    }

    return professionals.map(prof => {
        const isInactive = prof.status === 'inactive';
        // BLINDAGEM XSS
        const safeName = escapeHTML(prof.name);
        const safeSpecialty = escapeHTML(prof.specialty || 'Especialidade');
        
        const photoSrc = prof.photo || `https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(prof.name ? prof.name.charAt(0) : 'P')}`;
        const profDataString = JSON.stringify(prof).replace(/'/g, "&apos;");

        return `
            <div class="professional-card bg-white rounded-lg shadow-md flex items-center gap-4 p-3 cursor-pointer transition-transform transform hover:shadow-lg hover:bg-gray-50
                        sm:flex-col sm:items-stretch sm:p-0 sm:gap-0 ${isInactive ? 'opacity-50 bg-gray-100' : ''}" 
                 data-action="open-professional-modal" data-professional='${profDataString}'>
                
                <img src="${photoSrc}" alt="Foto de ${safeName}" class="w-16 h-16 rounded-full object-cover flex-shrink-0
                            sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg">
                
                <div class="flex-1 sm:p-4">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-sm font-bold text-gray-900 text-left sm:text-base">${safeName}</h3>
                            <p class="text-xs text-gray-500 text-left sm:text-sm">${safeSpecialty}</p>
                        </div>
                        <span class="text-xs font-semibold py-1 px-2 rounded-full hidden sm:inline-block ${isInactive ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}">
                            ${isInactive ? 'Inativo' : 'Ativo'}
                        </span>
                    </div>
                    <div class="mt-2 pt-2 border-t sm:hidden">
                        <span class="text-xs font-semibold ${isInactive ? 'text-red-700' : 'text-green-700'}">${isInactive ? 'Inativo' : 'Ativo'}</span>
                    </div>
                    <div class="hidden sm:block mt-3 pt-3 border-t">
                        <p class="text-xs text-gray-600">Serviços: <span class="font-semibold">${prof.services?.length || 0}</span></p>
                    </div>
                </div>
            </div>`;
    }).join('');
}


function closeProfessionalModal() {
    const modal = document.getElementById('genericModal');
    modal.style.display = 'none';
    if (modalEventListener) {
        modal.removeEventListener('click', modalEventListener);
    }
}


async function openProfessionalModal(professional) {
    const modal = document.getElementById('genericModal');
    const prof = professional.id ? professional : { name: 'Novo Profissional', specialty: '', status: 'active', workingHours: {}, services: [] };
    
    // BLINDAGEM XSS
    const safeTitle = escapeHTML(prof.name);

    const services = state.services || await servicesApi.getServices(state.establishmentId);
    const professionals = state.professionals || await professionalsApi.getProfessionals(state.establishmentId);

    const modalHTML = `
        <div class="modal-content max-w-5xl p-0 overflow-y-auto max-h-[90vh]"> 
            <div class="modal-header px-6 py-4 flex justify-between items-center border-b">
                <h2 class="text-2xl font-bold text-gray-800">${safeTitle}</h2>
                <button data-action="close-modal" class="text-gray-500 hover:text-gray-800 text-3xl">&times;</button>
            </div>
            <div class="modal-tabs px-6 border-b flex items-center overflow-x-auto">
                <button class="tab-link active whitespace-nowrap" data-tab="cadastro">Cadastro</button>
                <button class="tab-link whitespace-nowrap" data-tab="jornada">Jornada</button>
                <button class="tab-link whitespace-nowrap" data-tab="bloqueios">Bloqueios</button>
            </div>
            <div class="modal-body p-6 bg-gray-50 flex-1 overflow-y-auto"> 
                <div id="cadastro" class="tab-content active"><form id="professionalForm" class="space-y-6"></form></div>
                <div id="jornada" class="tab-content hidden"></div>
                <div id="bloqueios" class="tab-content hidden"></div>
            </div>
            <div class="modal-footer px-6 py-4 bg-gray-100 flex justify-between items-center">
                
                <button 
                    type="button" 
                    data-action="delete-professional" 
                    data-id="${prof.id || ''}" 
                    class="text-red-600 hover:text-red-800 transition-colors ${prof.id ? '' : 'hidden'}" 
                    title="Excluir Profissional"
                >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>

                <div class="flex gap-2">
                    <button data-action="close-modal" class="py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400">Cancelar</button>
                    <button type="button" data-action="save-professional" class="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Salvar</button>
                </div>
            </div>
        </div>`;

    modal.innerHTML = modalHTML;
    modal.style.display = 'flex';

    fillCadastroTab(prof, services);
    fillJornadaTab(prof);
    fillBloqueiosTab(prof, professionals);

    setupModalEventListeners(prof);
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
    
    const currentStatus = prof.status || 'active';

    // BLINDAGEM XSS
    const safeName = escapeHTML(prof.name || '');
    const safeSpecialty = escapeHTML(prof.specialty || '');
    const safePhone = escapeHTML(prof.phone || '');
    const safeNotes = escapeHTML(prof.notes || '');

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
                    <select id="profStatus" class="mt-1 w-full p-2 border rounded-md bg-white">
                        <option value="active" ${currentStatus !== 'inactive' ? 'selected' : ''}>Ativo</option>
                        <option value="inactive" ${currentStatus === 'inactive' ? 'selected' : ''}>Inativo</option>
                    </select>
                </div>
            </div>

            <div class="md:col-span-2 space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="form-group"><label for="profName">Nome</label><input type="text" id="profName" value="${safeName}" required class="mt-1 w-full p-2 border rounded-md"></div>
                    <div class="form-group"><label for="profSpecialty">Especialidade</label><input type="text" id="profSpecialty" value="${safeSpecialty}" required class="mt-1 w-full p-2 border rounded-md"></div>
                    <div class="form-group"><label for="profPhone">Número de telefone</label><input type="tel" id="profPhone" value="${safePhone}" class="mt-1 w-full p-2 border rounded-md"></div>
                    <div class="form-group"><label for="profDobDay">Aniversário (Dia)</label><input type="number" id="profDobDay" value="${dob[0]}" min="1" max="31" class="mt-1 w-full p-2 border rounded-md"></div>
                    <div class="form-group"><label for="profDobMonth">Aniversário (Mês)</label><select id="profDobMonth" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="">Selecione...</option>${monthOptions}</select></div>
                    <div class="form-group"><label for="profOrderOnAgenda">Ordem na agenda</label><input type="number" id="profOrderOnAgenda" value="${prof.orderOnAgenda || '1'}" min="1" class="mt-1 w-full p-2 border rounded-md"></div>
                </div>
                 <div class="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div class="form-group"><label for="profCommission">Recebe comissão?</label><select id="profCommission" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="sim" ${prof.receivesCommission ? 'selected' : ''}>Sim</option><option value="nao" ${!prof.receivesCommission ? 'selected' : ''}>Não</option></select></div>
                    <div class="form-group"><label for="profShowOnAgenda">Mostrar na agenda</label><select id="profShowOnAgenda" class="mt-1 w-full p-2 border rounded-md bg-white"><option value="sim" ${prof.showOnAgenda !== false ? 'selected' : ''}>Sim</option><option value="nao" ${prof.showOnAgenda === false ? 'selected' : ''}>Não</option></select></div>
                </div>
            </div>
        </div>

        <div><label class="block text-sm font-medium text-gray-700">Serviços Realizados</label><div id="profServicesContainer" class="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4 p-4 border rounded-md bg-white max-h-48 overflow-y-auto">${services.map(s => `<label class="flex items-center space-x-2"><input type="checkbox" value="${s.id}" class="rounded" ${prof.services?.includes(s.id) ? 'checked' : ''}><span>${escapeHTML(s.name)}</span></label>`).join('')}</div></div>
        <div class="form-group"><label for="profNotes">Observações</label><textarea id="profNotes" rows="3" class="mt-1 w-full p-2 border rounded-md">${safeNotes}</textarea></div>`;

    const photoInput = document.getElementById('profPhotoInput');
    const photoButton = document.getElementById('profPhotoButton');
    const photoPreview = document.getElementById('profPhotoPreview');
    const photoBase64Input = document.getElementById('profPhotoBase64');
    const originalPhotoSrc = prof.photo || `https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(prof.name ? prof.name.charAt(0) : 'P')}`;
    const originalBase64 = prof.photo || '';

    if (photoButton) {
        photoButton.addEventListener('click', () => photoInput.click());
    }

    if (photoInput) {
        photoInput.onchange = async () => {
             const file = photoInput.files[0];
             if (!file) return;
             photoPreview.src = 'https://placehold.co/128x128/E2E8F0/4A5568?text=...';
             
             try {
                 // OTIMIZAÇÃO: Usa função importada, remove argumento de formato para usar o padrão JPEG
                 const resizedBase64 = await resizeAndCompressImage(file, 800, 800, 0.8);
                 
                 const stringLength = resizedBase64.length;
                 const sizeInBytes = (stringLength * 3) / 4; 
                 const maxSizeInBytes = 1000 * 1024; // 1MB Hard Limit
                 
                 if (sizeInBytes > maxSizeInBytes) {
                     throw new Error('A imagem é muito grande mesmo após a compressão.');
                 }

                 photoPreview.src = resizedBase64;
                 photoBase64Input.value = resizedBase64;
             } catch (error) {
                 showNotification('Erro de Imagem', error.message || 'Não foi possível processar a imagem.', 'error');
                 photoPreview.src = originalPhotoSrc;
                 photoBase64Input.value = originalBase64;
                 photoInput.value = '';
             }
        };
    }
}

// NOTA: Função local resizeAndCompressImage removida

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
                        ${allProfessionals.map(p => `<label class="flex items-center"><input type="checkbox" name="batch-professionals" value="${p.id}" class="rounded mr-2" ${p.id === prof.id ? 'checked' : ''}><span>${escapeHTML(p.name)}</span></label>`).join('')}
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
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-semibold">Bloqueios de ${escapeHTML(prof.name)}</h3>
                    <select id="prof-blockages-filter" class="p-1 border rounded text-sm bg-white">
                        <option value="future">Futuros</option>
                        <option value="history">Histórico</option>
                    </select>
                </div>
                <div id="blockagesList" class="space-y-2 max-h-96 overflow-y-auto pr-2"></div>
            </div>
        </div>`;
    
    // Anexa listener ao formulário de bloqueio
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
            
            if(!batchStartDate || !batchStartTime || !batchEndTime) {
                 return showNotification('Atenção', 'Preencha Data de Início, Início e Fim.', 'error');
            }

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
                
                // Atualiza a lista respeitando o filtro
                const currentFilter = document.getElementById('prof-blockages-filter').value;
                fetchAndRenderBlockages(prof.id, currentFilter);
            } catch (error) {
                showNotification('Erro', error.message, 'error');
            }
        });
    }

    // Listener do Filtro da Lista
    const filterSelect = document.getElementById('prof-blockages-filter');
    filterSelect.addEventListener('change', (e) => fetchAndRenderBlockages(prof.id, e.target.value));

    // Carregamento Inicial (Futuros)
    await fetchAndRenderBlockages(prof.id, 'future');
}

function renderAdvancedScheduleSelector(container, scheduleData) {
    container.innerHTML = Object.keys(daysOfWeek).map(dayKey => {
        const dayData = scheduleData[dayKey] || {};
        const isChecked = dayData.active !== false;
        return `
            <div class="day-schedule-card p-3 rounded-lg ${isChecked ? 'bg-white' : 'bg-gray-100 disabled'} border">
                 <div class="flex justify-between items-center"><span class="font-semibold text-gray-800">${daysOfWeek[dayKey]}</span><label class="flex items-center cursor-pointer"><div class="relative"><input type="checkbox" data-day="${dayKey}" data-field="active" class="sr-only" ${isChecked ? 'checked' : ''}><div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div></div></label></div>
                <div class="time-inputs grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div><label>Início:</label><input type="time" data-day="${dayKey}" data-field="start" value="${dayData.start || '09:00'}" class="w-full p-1 border rounded" ${!isChecked ? 'disabled' : ''}></div>
                    <div><label>Fim:</label><input type="time" data-day="${dayKey}" data-field="end" value="${dayData.end || '18:00'}" class="w-full p-1 border rounded" ${!isChecked ? 'disabled' : ''}></div>
                    <div><label>Intervalo:</label><input type="time" data-day="${dayKey}" data-field="breakStart" value="${dayData.breakStart || '12:00'}" class="w-full p-1 border rounded" ${!isChecked ? 'disabled' : ''}></div>
                    <div><label>Fim Int.:</label><input type="time" data-day="${dayKey}" data-field="breakEnd" value="${dayData.breakEnd || '13:00'}" class="w-full p-1 border rounded" ${!isChecked ? 'disabled' : ''}></div>
                </div>
            </div>`;
    }).join('');

    // Adiciona listener para toggle
    container.querySelectorAll('input[type="checkbox"][data-field="active"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const card = e.target.closest('.day-schedule-card');
            const isDisabled = !e.target.checked;
            card.classList.toggle('bg-white', !isDisabled);
            card.classList.toggle('bg-gray-100', isDisabled);
            card.classList.toggle('disabled', isDisabled);
            card.querySelectorAll('.time-inputs input').forEach(input => input.disabled = isDisabled);
        });
    });
}

async function fetchAndRenderBlockages(professionalId, mode = 'future') {
    const listDiv = document.getElementById('blockagesList');
    if (!listDiv) return;
    listDiv.innerHTML = '<div class="loader mx-auto"></div>';
    try {
        const now = new Date();
        let startDate, endDate;

        if (mode === 'history') {
            // Histórico: 2 anos atrás até hoje
            endDate = new Date();
            startDate = new Date();
            startDate.setFullYear(startDate.getFullYear() - 2); 
        } else {
            // Futuro: Hoje até 2 anos à frente
            startDate = new Date();
            endDate = new Date();
            endDate.setFullYear(endDate.getFullYear() + 2);
        }

        const blockages = await blockagesApi.getBlockagesByDateRange(state.establishmentId, startDate.toISOString(), endDate.toISOString(), professionalId);
        
        let filteredBlockages = blockages.map(b => ({
             ...b,
             startTime: new Date(b.startTime),
             endTime: new Date(b.endTime)
        }));

        if (mode === 'history') {
             filteredBlockages = filteredBlockages
                .filter(b => b.endTime < now)
                .sort((a, b) => b.startTime - a.startTime); // Decrescente (mais recente primeiro)
        } else {
             filteredBlockages = filteredBlockages
                .filter(b => b.endTime >= now)
                .sort((a, b) => a.startTime - b.startTime); // Crescente
        }

        const groupedByReason = filteredBlockages.reduce((acc, b) => {
            const reason = b.reason || 'Sem motivo';
            if (!acc[reason]) acc[reason] = [];
            acc[reason].push(b);
            return acc;
        }, {});

        if (Object.keys(groupedByReason).length === 0) {
            listDiv.innerHTML = `<p class="text-center text-gray-500 text-sm py-4">Nenhum bloqueio ${mode === 'history' ? 'no histórico' : 'futuro'}.</p>`;
            return;
        }

        listDiv.innerHTML = Object.entries(groupedByReason).map(([reason, group]) => `
            <div class="bg-gray-100 rounded-lg p-3 my-2 space-y-2">
                <div class="flex justify-between items-center pb-2 border-b">
                    <h4 class="font-bold text-gray-700">${escapeHTML(reason)} (${group.length})</h4>
                    ${group.length > 1 ? `<button data-action="batch-delete-blockage" data-ids='${JSON.stringify(group.map(b => b.id))}' class="text-xs text-red-600 font-semibold hover:underline">Apagar Todos (${group.length})</button>` : ''}
                </div>
                ${group.map(b => `
                    <div class="flex justify-between items-center bg-white p-2 rounded-md text-sm border">
                        <p class="text-xs text-gray-500">
                           ${b.startTime.toLocaleDateString('pt-BR')} 
                           <span class="text-gray-400 mx-1">|</span> 
                           ${b.startTime.toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'})} - ${b.endTime.toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'})}
                        </p>
                        <button data-action="delete-blockage" data-id="${b.id}" class="text-red-500 p-1 rounded-full hover:bg-red-100" title="Apagar">&times;</button>
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
    
    // Limpa listener antigo se existir
    if (modalEventListener) {
        modal.removeEventListener('click', modalEventListener);
    }

    // Define o novo listener
    modalEventListener = async (e) => {
        const button = e.target.closest('button[data-action]');
        
        if (!button) {
            const tab = e.target.closest('.tab-link');
            if (tab) {
                modal.querySelectorAll('.tab-link').forEach(btn => btn.classList.remove('active'));
                tab.classList.add('active');
                modal.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
                document.getElementById(tab.dataset.tab).classList.remove('hidden');
            }
            return;
        }

        const action = button.dataset.action;
        e.stopPropagation();

        switch(action) {
            case 'close-modal':
                closeProfessionalModal();
                break;
            
            case 'delete-professional':
                const idToDelete = button.dataset.id;
                const confirmed = await showConfirmation('Excluir Profissional', `Tem certeza que deseja excluir ${professional.name}? Esta ação não pode ser desfeita.`);
                if(confirmed) {
                    try {
                        await professionalsApi.deleteProfessional(idToDelete);
                        showNotification('Sucesso!', 'Profissional excluído.', 'success');
                        closeProfessionalModal();
                        loadProfessionalsPage(); // Recarrega a página principal
                    } catch (error) {
                         showNotification('Erro', `Não foi possível excluir: ${error.message}`, 'error');
                    }
                }
                break;

            case 'save-professional':
                const form = document.getElementById('professionalForm');
                const saveButton = button;
                
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
                    id: form.querySelector('#professionalId').value || undefined, 
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
                    status: form.querySelector('#profStatus').value,
                    establishmentId: state.establishmentId
                };

                saveButton.disabled = true;
                saveButton.textContent = 'A salvar...';

                try {
                    if (professionalData.id) {
                        await professionalsApi.updateProfessional(professionalData.id, professionalData);
                        showNotification('Sucesso!', 'Profissional atualizado.', 'success');
                    } else {
                        delete professionalData.id; 
                        await professionalsApi.createProfessional(professionalData);
                        showNotification('Sucesso!', 'Profissional criado.', 'success');
                    }
                    
                    closeProfessionalModal();
                    loadProfessionalsPage(); 
                } catch (error) {
                    showNotification('Erro', error.message, 'error');
                    saveButton.disabled = false;
                    saveButton.textContent = 'Salvar';
                }
                break;

            case 'delete-blockage':
                const blockageId = button.dataset.id;
                if (await showConfirmation('Apagar Bloqueio', 'Tem certeza?')) {
                    try {
                        await blockagesApi.deleteBlockage(blockageId);
                        showNotification('Bloqueio removido.', 'success');
                        // Atualiza usando o filtro atual
                        const currentFilter = document.getElementById('prof-blockages-filter') ? document.getElementById('prof-blockages-filter').value : 'future';
                        fetchAndRenderBlockages(professional.id, currentFilter);
                    } catch (error) {
                        showNotification('Erro', error.message, 'error');
                    }
                }
                break;
            
            case 'batch-delete-blockage':
                const ids = JSON.parse(button.dataset.ids);
                if (await showConfirmation('Apagar em Lote', `Tem certeza que deseja apagar ${ids.length} bloqueios com este motivo?`)) {
                    try {
                        await blockagesApi.batchDeleteBlockages(ids);
                        showNotification('Bloqueios removidos.', 'success');
                        // Atualiza usando o filtro atual
                        const currentFilter = document.getElementById('prof-blockages-filter') ? document.getElementById('prof-blockages-filter').value : 'future';
                        fetchAndRenderBlockages(professional.id, currentFilter);
                    } catch (error) {
                        showNotification('Erro', error.message, 'error');
                    }
                }
                break;
        }
    };

    modal.addEventListener('click', modalEventListener);
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
    if (!listDiv) return;

    if (!state.professionals) {
        listDiv.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20';
        listDiv.innerHTML = renderSkeletonList(); 
        return;
    }
    
    const showInactive = document.getElementById('showInactiveProfToggle').checked;
    const searchTerm = document.getElementById('profSearchInput').value.toLowerCase();

    const filtered = state.professionals.filter(p => {
        const nameMatch = p.name.toLowerCase().includes(searchTerm);
        const statusMatch = showInactive || p.status !== 'inactive';
        return nameMatch && statusMatch;
    });
    
    listDiv.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-20'; 
    listDiv.innerHTML = renderProfessionalsListHTML(filtered);
}

export async function loadProfessionalsPage() {
    selectedProfessionals.clear();
    contentDiv.innerHTML = `
        <section id="professional-list-view" class="p-4 sm:p-6">
            <div class="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div class="sticky top-0 z-10 bg-white pt-2 pb-4 mb-6 -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 px-4 sm:px-6 rounded-t-lg border-b border-gray-200">
                    <h2 class="text-2xl font-bold text-gray-800 mb-4">Sua Equipe</h2>
                    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                        <input type="search" id="profSearchInput" placeholder="Pesquisar por nome..." class="w-full md:w-64 p-2 border rounded-md shadow-sm">
                        
                        <div class="flex items-center gap-4">
                            <label class="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" id="showInactiveProfToggle" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                                <span class="text-sm font-medium text-gray-700">Mostrar Inativos</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div id="batch-actions-container" class="hidden bg-indigo-600 text-white p-3 rounded-lg shadow-md mb-6 flex justify-between items-center">
                    <span id="selected-count" class="font-semibold"></span>
                    <div>
                        <button data-action="batch-delete" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">Excluir Selecionados</button>
                    </div>
                </div>

                <div id="professionalsList" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
                    </div>
            </div>
            
            <button data-action="open-professional-modal" data-professional="{}" class="fixed z-30 bottom-20 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-transform hover:scale-105">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </button>
        </section>`;

    if (pageEventListener) {
        contentDiv.removeEventListener('click', pageEventListener);
    }

    pageEventListener = e => {
        const cardOrFab = e.target.closest('[data-action="open-professional-modal"]');
        const batchDeleteButton = e.target.closest('[data-action="batch-delete"]');

        if (cardOrFab) {
            e.preventDefault();
            let profData = {};
            if (cardOrFab.dataset.professional) {
                try {
                    profData = JSON.parse(cardOrFab.dataset.professional);
                } catch (error) {
                    console.error("Erro ao fazer parse do professional data:", error);
                    return;
                }
            }
            openProfessionalModal(profData);
            return;
        }

        if (batchDeleteButton) {
            handleBatchDelete();
            return;
        }
        
        const checkbox = e.target.closest('.professional-checkbox');
        if (checkbox) {
             const id = checkbox.dataset.id;
             if (checkbox.checked) { selectedProfessionals.add(id); } else { selectedProfessionals.delete(id); }
             filterAndRenderProfessionals();
             updateBatchActionsVisibility();
             return;
        }
    };
    
    contentDiv.addEventListener('click', pageEventListener);
    document.getElementById('profSearchInput').addEventListener('input', filterAndRenderProfessionals);
    document.getElementById('showInactiveProfToggle').addEventListener('change', filterAndRenderProfessionals);

    const listDiv = document.getElementById('professionalsList');
    
    state.professionals = null;
    state.services = null;
    filterAndRenderProfessionals(); 
    
    try {
        const [professionals, services] = await Promise.all([
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