// js/ui/professionals.js (Versão Completa + Multi-Tenant / Distribuição na Rede)

// --- 1. IMPORTAÇÕES ---
import * as professionalsApi from '../api/professionals.js';
import * as servicesApi from '../api/services.js';
import * as blockagesApi from '../api/blockages.js';
import { getHierarchy } from '../api/establishments.js'; // NOVO: Para buscar a estrutura da rede
import { state } from '../state.js';
import { showNotification, showConfirmation } from '../components/modal.js';
import { logAction } from '../api/audit.js';
import { auth } from '../firebase-config.js';
import { escapeHTML, resizeAndCompressImage } from '../utils.js'; 

// --- 2. CONSTANTES E VARIÁVEIS DO MÓDULO ---
const contentDiv = document.getElementById('content');
const daysOfWeek = { monday: 'Segunda', tuesday: 'Terça', wednesday: 'Quarta', thursday: 'Quinta', friday: 'Sexta', saturday: 'Sábado', sunday: 'Domingo' };
let selectedProfessionals = new Set();
let pageEventListener = null;
let modalEventListener = null;
let hierarchyCache = []; // NOVO: Cache da hierarquia da rede

// --- FUNÇÃO AUXILIAR PARA OBTER UTILIZADOR ATUAL (Para o Log) ---
function getCurrentUserForLog() {
    const user = auth.currentUser;
    if (!user) return { uid: 'unknown', name: 'Desconhecido' };
    return { uid: user.uid, name: user.displayName || user.email };
}

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
        const safeName = escapeHTML(prof.name);
        const safeSpecialty = escapeHTML(prof.specialty || 'Especialidade');
        
        const photoSrc = prof.photo || `https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(prof.name ? prof.name.charAt(0) : 'P')}`;
        const profDataString = JSON.stringify(prof).replace(/'/g, "&apos;");

        // NOVO: Distintivo de Multi-Loja
        const unitCount = prof.accessibleIn ? prof.accessibleIn.length : 1;
        const unitBadge = unitCount > 1 
            ? `<span class="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded ml-2 border border-indigo-200" title="Atende em ${unitCount} unidades"><i class="bi bi-diagram-3"></i> ${unitCount} Lojas</span>` 
            : '';

        return `
            <div class="professional-card bg-white rounded-lg shadow-md flex items-center gap-4 p-3 cursor-pointer transition-transform transform hover:shadow-lg hover:bg-gray-50
                        sm:flex-col sm:items-stretch sm:p-0 sm:gap-0 ${isInactive ? 'opacity-50 bg-gray-100' : ''}" 
                 data-action="open-professional-modal" data-professional='${profDataString}'>
                
                <img src="${photoSrc}" alt="Foto de ${safeName}" class="w-16 h-16 rounded-full object-cover flex-shrink-0
                            sm:w-full sm:h-32 sm:rounded-b-none sm:rounded-t-lg">
                
                <div class="flex-1 sm:p-4">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-sm font-bold text-gray-900 text-left sm:text-base flex items-center">
                                ${safeName} ${unitBadge}
                            </h3>
                            <p class="text-xs text-gray-500 text-left sm:text-sm mt-0.5">${safeSpecialty}</p>
                        </div>
                        <span class="text-[10px] font-bold py-1 px-2 rounded-full hidden sm:inline-block uppercase tracking-wider ${isInactive ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}">
                            ${isInactive ? 'Inativo' : 'Ativo'}
                        </span>
                    </div>
                    <div class="mt-2 pt-2 border-t sm:hidden">
                        <span class="text-xs font-semibold ${isInactive ? 'text-red-700' : 'text-green-700'}">${isInactive ? 'Inativo' : 'Ativo'}</span>
                    </div>
                    <div class="hidden sm:block mt-3 pt-3 border-t">
                        <p class="text-xs text-gray-600">Serviços Habilitados: <span class="font-semibold text-indigo-600">${prof.services?.length || 0}</span></p>
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
    
    const safeTitle = escapeHTML(prof.name);

    const services = state.services || await servicesApi.getServices(state.establishmentId);
    const professionals = state.professionals || await professionalsApi.getProfessionals(state.establishmentId);

    const modalHTML = `
        <div class="modal-content max-w-5xl p-0 overflow-y-auto max-h-[90vh]"> 
            <div class="modal-header px-6 py-4 flex justify-between items-center border-b bg-white sticky top-0 z-10">
                <h2 class="text-2xl font-bold text-gray-800">${safeTitle}</h2>
                <button data-action="close-modal" class="text-gray-400 hover:text-red-500 transition-colors text-3xl leading-none">&times;</button>
            </div>
            <div class="modal-tabs px-6 border-b flex items-center overflow-x-auto bg-gray-50/50">
                <button class="tab-link active whitespace-nowrap font-semibold py-3 px-4 border-b-2 border-indigo-600 text-indigo-600" data-tab="cadastro">Cadastro e Rede</button>
                <button class="tab-link whitespace-nowrap font-semibold py-3 px-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700" data-tab="jornada">Jornada Semanal</button>
                <button class="tab-link whitespace-nowrap font-semibold py-3 px-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700" data-tab="bloqueios">Bloqueios e Férias</button>
            </div>
            <div class="modal-body p-6 bg-white flex-1 overflow-y-auto"> 
                <div id="cadastro" class="tab-content active"><form id="professionalForm" class="space-y-6"></form></div>
                <div id="jornada" class="tab-content hidden"></div>
                <div id="bloqueios" class="tab-content hidden"></div>
            </div>
            <div class="modal-footer px-6 py-4 bg-gray-50 border-t flex justify-between items-center">
                
                <button 
                    type="button" 
                    data-action="delete-professional" 
                    data-id="${prof.id || ''}" 
                    class="text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg font-medium transition-colors ${prof.id ? '' : 'hidden'}" 
                    title="Excluir Profissional"
                >
                    <i class="bi bi-trash3 mr-1"></i> Excluir Profissional
                </button>

                <div class="flex gap-3">
                    <button data-action="close-modal" class="py-2.5 px-5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 shadow-sm transition-colors">Cancelar</button>
                    <button type="button" data-action="save-professional" class="py-2.5 px-6 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-sm flex items-center gap-2 transition-colors">
                        <i class="bi bi-save"></i> Salvar
                    </button>
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

// --- NOVO: GERADOR DE CHECKBOXES PARA MULTI-TENANT ---
function generateUnitCheckboxesHTML(selectedIds = []) {
    if (!hierarchyCache || hierarchyCache.length === 0) {
        return `
            <input type="hidden" name="accessibleIn" value="${state.establishmentId}">
            <div class="bg-gray-50 p-3 rounded border text-sm text-gray-500">
                <i class="bi bi-info-circle mr-1"></i> Profissional exclusivo desta unidade.
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

    const safeName = escapeHTML(prof.name || '');
    const safeSpecialty = escapeHTML(prof.specialty || '');
    const safePhone = escapeHTML(prof.phone || '');
    const safeNotes = escapeHTML(prof.notes || '');

    form.innerHTML = `
        <input type="hidden" id="professionalId" value="${prof.id || ''}">
        <input type="hidden" id="profPhotoBase64" value="${prof.photo || ''}">
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="md:col-span-1 space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Foto de Perfil</label>
                    <div class="flex flex-col items-center p-4 border border-dashed border-gray-300 rounded-xl bg-gray-50">
                        <img id="profPhotoPreview" src="${prof.photo || `https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(prof.name ? prof.name.charAt(0) : 'P')}`}" alt="Foto de Perfil" class="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white shadow-sm">
                        <input type="file" id="profPhotoInput" class="hidden" accept="image/*">
                        <button type="button" id="profPhotoButton" class="bg-white py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors w-full">Alterar Foto</button>
                    </div>
                </div>
                 <div class="form-group">
                    <label for="profStatus" class="block text-sm font-medium text-gray-700 mb-1">Status na Rede</label>
                    <select id="profStatus" class="mt-1 w-full p-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
                        <option value="active" ${currentStatus !== 'inactive' ? 'selected' : ''}>Ativo</option>
                        <option value="inactive" ${currentStatus === 'inactive' ? 'selected' : ''}>Inativo</option>
                    </select>
                </div>
            </div>

            <div class="md:col-span-2 space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="form-group"><label for="profName" class="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label><input type="text" id="profName" value="${safeName}" required class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"></div>
                    <div class="form-group"><label for="profSpecialty" class="block text-sm font-medium text-gray-700 mb-1">Especialidade / Cargo</label><input type="text" id="profSpecialty" value="${safeSpecialty}" required class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"></div>
                    <div class="form-group"><label for="profPhone" class="block text-sm font-medium text-gray-700 mb-1">WhatsApp / Telefone</label><input type="tel" id="profPhone" value="${safePhone}" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"></div>
                    <div class="form-group"><label for="profOrderOnAgenda" class="block text-sm font-medium text-gray-700 mb-1">Ordem de exibição na agenda</label><input type="number" id="profOrderOnAgenda" value="${prof.orderOnAgenda || '1'}" min="1" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"></div>
                    <div class="form-group"><label for="profDobDay" class="block text-sm font-medium text-gray-700 mb-1">Aniversário (Dia)</label><input type="number" id="profDobDay" value="${dob[0]}" min="1" max="31" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"></div>
                    <div class="form-group"><label for="profDobMonth" class="block text-sm font-medium text-gray-700 mb-1">Aniversário (Mês)</label><select id="profDobMonth" class="w-full p-2.5 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-indigo-500"><option value="">Selecione...</option>${monthOptions}</select></div>
                </div>
                 <div class="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div class="form-group"><label for="profCommission" class="block text-sm font-medium text-gray-700 mb-1">Paga Comissão?</label><select id="profCommission" class="w-full p-2.5 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-indigo-500"><option value="sim" ${prof.receivesCommission ? 'selected' : ''}>Sim</option><option value="nao" ${!prof.receivesCommission ? 'selected' : ''}>Não</option></select></div>
                    <div class="form-group"><label for="profShowOnAgenda" class="block text-sm font-medium text-gray-700 mb-1">Exibir aos Clientes (App)</label><select id="profShowOnAgenda" class="w-full p-2.5 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-indigo-500"><option value="sim" ${prof.showOnAgenda !== false ? 'selected' : ''}>Sim</option><option value="nao" ${prof.showOnAgenda === false ? 'selected' : ''}>Não</option></select></div>
                </div>
            </div>
        </div>

        <div class="pt-6 border-t border-gray-100">
            <label class="block text-base font-bold text-indigo-900 mb-1">
                <i class="bi bi-diagram-3 mr-1"></i> Locais de Atendimento
            </label>
            <p class="text-xs text-gray-500 mb-3">Marque em quais unidades da rede este profissional trabalha e recebe agendamentos.</p>
            ${generateUnitCheckboxesHTML(prof.accessibleIn || [])}
        </div>

        <div class="pt-6 border-t border-gray-100">
            <label class="block text-base font-bold text-gray-800 mb-3">Serviços que realiza</label>
            <div id="profServicesContainer" class="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border border-gray-200 rounded-xl bg-gray-50 max-h-64 overflow-y-auto">
                ${services.map(s => `
                    <label class="flex items-center space-x-3 p-2 hover:bg-white rounded-lg cursor-pointer transition-colors border border-transparent hover:border-gray-200 hover:shadow-sm">
                        <input type="checkbox" value="${s.id}" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4" ${prof.services?.includes(s.id) ? 'checked' : ''}>
                        <span class="text-sm font-medium text-gray-700">${escapeHTML(s.name)}</span>
                    </label>
                `).join('')}
            </div>
        </div>

        <div class="form-group pt-4">
            <label for="profNotes" class="block text-sm font-medium text-gray-700 mb-1">Observações Internas</label>
            <textarea id="profNotes" rows="3" class="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500">${safeNotes}</textarea>
        </div>`;

    const photoInput = document.getElementById('profPhotoInput');
    const photoButton = document.getElementById('profPhotoButton');
    const photoPreview = document.getElementById('profPhotoPreview');
    const photoBase64Input = document.getElementById('profPhotoBase64');
    const originalPhotoSrc = prof.photo || `https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(prof.name ? prof.name.charAt(0) : 'P')}`;
    const originalBase64 = prof.photo || '';

    if (photoButton) photoButton.addEventListener('click', () => photoInput.click());

    if (photoInput) {
        photoInput.onchange = async () => {
             const file = photoInput.files[0];
             if (!file) return;
             photoPreview.src = 'https://placehold.co/128x128/E2E8F0/4A5568?text=...';
             
             try {
                 const resizedBase64 = await resizeAndCompressImage(file, 800, 800, 0.8);
                 
                 const stringLength = resizedBase64.length;
                 const sizeInBytes = (stringLength * 3) / 4; 
                 const maxSizeInBytes = 1000 * 1024; // 1MB Hard Limit
                 
                 if (sizeInBytes > maxSizeInBytes) throw new Error('A imagem é muito grande mesmo após a compressão.');

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

function fillJornadaTab(prof) {
    const container = document.getElementById('jornada');
    container.innerHTML = `
        <div class="max-w-4xl mx-auto">
            <h3 class="text-xl font-bold text-gray-800 mb-2">Jornada de Trabalho Semanal</h3>
            <p class="text-sm text-gray-500 mb-6">Defina os dias e os horários em que este profissional atende.</p>
            <div id="profScheduleContainer" class="grid grid-cols-1 lg:grid-cols-2 gap-4"></div>
        </div>`;
    renderAdvancedScheduleSelector(container.querySelector('#profScheduleContainer'), prof.workingHours || {});
}

async function fillBloqueiosTab(prof, allProfessionals) {
    const container = document.getElementById('bloqueios');
    container.innerHTML = `
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div>
                <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><i class="bi bi-calendar-x text-orange-500"></i> Lançar Bloqueio / Férias</h3>
                <form id="batchBlockageForm" class="p-5 bg-orange-50/50 border border-orange-100 rounded-xl space-y-4">
                    <div>
                        <h4 class="font-bold text-gray-700 mb-2 text-sm">Aplicar aos Profissionais:</h4>
                        <div id="batchProfSelectionContainer" class="max-h-40 overflow-y-auto p-3 border border-orange-200 rounded-lg bg-white space-y-2 shadow-sm">
                            ${allProfessionals.map(p => `
                                <label class="flex items-center space-x-3 hover:bg-orange-50 p-1 rounded cursor-pointer transition-colors">
                                    <input type="checkbox" name="batch-professionals" value="${p.id}" class="rounded border-gray-300 text-orange-500 focus:ring-orange-500" ${p.id === prof.id ? 'checked' : ''}>
                                    <span class="text-sm font-medium text-gray-700">${escapeHTML(p.name)}</span>
                                </label>`).join('')}
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div><label for="batchBlockageStartDate" class="block text-sm font-medium text-gray-700 mb-1">Data Início</label><input type="date" id="batchBlockageStartDate" required class="w-full p-2.5 border border-gray-300 rounded-lg"></div>
                        <div><label for="batchBlockageEndDate" class="block text-sm font-medium text-gray-700 mb-1">Data Fim (Opcional)</label><input type="date" id="batchBlockageEndDate" class="w-full p-2.5 border border-gray-300 rounded-lg"></div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="block text-sm font-medium text-gray-700 mb-1">Início</label><input type="time" id="batchBlockageStartTime" required class="w-full p-2.5 border border-gray-300 rounded-lg"></div>
                        <div><label class="block text-sm font-medium text-gray-700 mb-1">Fim</label><input type="time" id="batchBlockageEndTime" required class="w-full p-2.5 border border-gray-300 rounded-lg"></div>
                    </div>
                    <div><label class="block text-sm font-medium text-gray-700 mb-1">Motivo / Descrição</label><input type="text" id="batchBlockageReason" placeholder="Ex: Férias, Médico, Casamento" class="w-full p-2.5 border border-gray-300 rounded-lg"></div>
                    <button type="submit" class="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 shadow-sm transition-colors mt-2">Gravar Bloqueio</button>
                </form>
            </div>
            <div>
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
                    <h3 class="text-xl font-bold text-gray-800">Registos de ${escapeHTML(prof.name.split(' ')[0])}</h3>
                    <select id="prof-blockages-filter" class="p-2 border border-gray-300 rounded-lg text-sm bg-white font-medium outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="future">Apenas Futuros</option>
                        <option value="history">Histórico Passado</option>
                    </select>
                </div>
                <div id="blockagesList" class="space-y-3 max-h-[500px] overflow-y-auto pr-2"></div>
            </div>
        </div>`;
    
    const batchBlockageForm = document.getElementById('batchBlockageForm');
    if(batchBlockageForm) {
        batchBlockageForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = batchBlockageForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.disabled = true; btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> A gravar...';

            const selectedProfIds = Array.from(e.target.querySelectorAll('input[name="batch-professionals"]:checked')).map(cb => cb.value);
            if (selectedProfIds.length === 0) {
                btn.disabled = false; btn.innerHTML = originalText;
                return showNotification('Atenção', 'Selecione pelo menos um profissional.', 'error');
            }

            const batchStartDate = e.target.batchBlockageStartDate.value;
            const batchEndDate = e.target.batchBlockageEndDate.value || batchStartDate;
            const batchStartTime = e.target.batchBlockageStartTime.value;
            const batchEndTime = e.target.batchBlockageEndTime.value;
            const reason = e.target.batchBlockageReason.value;
            
            if(!batchStartDate || !batchStartTime || !batchEndTime) {
                 btn.disabled = false; btn.innerHTML = originalText;
                 return showNotification('Atenção', 'Preencha Data de Início, Hora de Início e Fim.', 'error');
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
                
                // Limpa o form exceto o profissional atual
                batchBlockageForm.reset();
                e.target.querySelectorAll('input[name="batch-professionals"]').forEach(cb => {
                    cb.checked = cb.value === prof.id;
                });

                const currentFilter = document.getElementById('prof-blockages-filter').value;
                fetchAndRenderBlockages(prof.id, currentFilter);
            } catch (error) {
                showNotification('Erro', error.message, 'error');
            } finally {
                btn.disabled = false; btn.innerHTML = originalText;
            }
        });
    }

    const filterSelect = document.getElementById('prof-blockages-filter');
    filterSelect.addEventListener('change', (e) => fetchAndRenderBlockages(prof.id, e.target.value));

    await fetchAndRenderBlockages(prof.id, 'future');
}

function renderAdvancedScheduleSelector(container, scheduleData) {
    container.innerHTML = Object.keys(daysOfWeek).map(dayKey => {
        const dayData = scheduleData[dayKey] || {};
        const isChecked = dayData.active !== false;
        return `
            <div class="day-schedule-card p-4 rounded-xl ${isChecked ? 'bg-white border-gray-200 shadow-sm' : 'bg-gray-50 border-gray-100 disabled opacity-60'} border transition-all">
                 <div class="flex justify-between items-center mb-3">
                    <span class="font-bold text-gray-800">${daysOfWeek[dayKey]}</span>
                    <label class="flex items-center cursor-pointer">
                        <div class="relative">
                            <input type="checkbox" data-day="${dayKey}" data-field="active" class="sr-only" ${isChecked ? 'checked' : ''}>
                            <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full peer-checked:bg-indigo-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                        </div>
                    </label>
                 </div>
                <div class="time-inputs grid grid-cols-2 gap-3 mt-2 text-sm">
                    <div><label class="text-xs text-gray-500 font-medium">Abertura:</label><input type="time" data-day="${dayKey}" data-field="start" value="${dayData.start || '09:00'}" class="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 bg-white" ${!isChecked ? 'disabled' : ''}></div>
                    <div><label class="text-xs text-gray-500 font-medium">Fecho:</label><input type="time" data-day="${dayKey}" data-field="end" value="${dayData.end || '18:00'}" class="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 bg-white" ${!isChecked ? 'disabled' : ''}></div>
                    <div><label class="text-xs text-gray-500 font-medium">Início Pausa:</label><input type="time" data-day="${dayKey}" data-field="breakStart" value="${dayData.breakStart || '12:00'}" class="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 bg-white" ${!isChecked ? 'disabled' : ''}></div>
                    <div><label class="text-xs text-gray-500 font-medium">Fim Pausa:</label><input type="time" data-day="${dayKey}" data-field="breakEnd" value="${dayData.breakEnd || '13:00'}" class="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 bg-white" ${!isChecked ? 'disabled' : ''}></div>
                </div>
            </div>`;
    }).join('');

    container.querySelectorAll('input[type="checkbox"][data-field="active"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const card = e.target.closest('.day-schedule-card');
            const isDisabled = !e.target.checked;
            card.classList.toggle('bg-white', !isDisabled);
            card.classList.toggle('shadow-sm', !isDisabled);
            card.classList.toggle('border-gray-200', !isDisabled);
            
            card.classList.toggle('bg-gray-50', isDisabled);
            card.classList.toggle('border-gray-100', isDisabled);
            card.classList.toggle('opacity-60', isDisabled);
            card.classList.toggle('disabled', isDisabled);
            
            card.querySelectorAll('.time-inputs input').forEach(input => input.disabled = isDisabled);
        });
    });
}

async function fetchAndRenderBlockages(professionalId, mode = 'future') {
    const listDiv = document.getElementById('blockagesList');
    if (!listDiv) return;
    listDiv.innerHTML = '<div class="loader mx-auto mt-6"></div>';
    try {
        const now = new Date();
        let startDate, endDate;

        if (mode === 'history') {
            endDate = new Date();
            startDate = new Date();
            startDate.setFullYear(startDate.getFullYear() - 2); 
        } else {
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
                .sort((a, b) => b.startTime - a.startTime); 
        } else {
             filteredBlockages = filteredBlockages
                .filter(b => b.endTime >= now)
                .sort((a, b) => a.startTime - b.startTime); 
        }

        const groupedByReason = filteredBlockages.reduce((acc, b) => {
            const reason = b.reason || 'Sem motivo detalhado';
            if (!acc[reason]) acc[reason] = [];
            acc[reason].push(b);
            return acc;
        }, {});

        if (Object.keys(groupedByReason).length === 0) {
            listDiv.innerHTML = `
                <div class="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <i class="bi bi-calendar-check text-3xl text-gray-300 mb-2 block"></i>
                    <p class="text-gray-500 font-medium">Nenhum bloqueio ${mode === 'history' ? 'no histórico' : 'agendado para o futuro'}.</p>
                </div>`;
            return;
        }

        listDiv.innerHTML = Object.entries(groupedByReason).map(([reason, group]) => `
            <div class="bg-white border border-gray-200 rounded-xl shadow-sm mb-4 overflow-hidden">
                <div class="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                    <h4 class="font-bold text-gray-800 flex items-center gap-2"><i class="bi bi-tag text-orange-500"></i> ${escapeHTML(reason)}</h4>
                    ${group.length > 1 ? `<button data-action="batch-delete-blockage" data-ids='${JSON.stringify(group.map(b => b.id))}' class="text-xs text-red-600 bg-red-50 hover:bg-red-100 font-bold px-2 py-1 rounded transition-colors">Apagar Grupo (${group.length})</button>` : ''}
                </div>
                <div class="divide-y divide-gray-100">
                ${group.map(b => `
                    <div class="flex justify-between items-center p-3 hover:bg-gray-50 transition-colors">
                        <div class="flex items-center gap-3">
                            <div class="bg-orange-100 text-orange-600 w-10 h-10 rounded-lg flex flex-col items-center justify-center leading-none">
                                <span class="font-bold text-sm">${b.startTime.getDate().toString().padStart(2, '0')}</span>
                                <span class="text-[9px] uppercase font-bold">${b.startTime.toLocaleString('pt-BR', {month:'short'})}</span>
                            </div>
                            <div>
                                <p class="text-sm font-bold text-gray-700">
                                   ${b.startTime.toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'})} até ${b.endTime.toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'})}
                                </p>
                                ${b.startTime.getDate() !== b.endTime.getDate() ? `<p class="text-xs text-gray-400">Termina em ${b.endTime.toLocaleDateString('pt-BR')}</p>` : ''}
                            </div>
                        </div>
                        <button data-action="delete-blockage" data-id="${b.id}" class="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors" title="Apagar Dia">
                            <i class="bi bi-trash3"></i>
                        </button>
                    </div>
                `).join('')}
                </div>
            </div>
        `).join('');
    } catch (error) {
        listDiv.innerHTML = `<p class="text-red-500 p-4">${error.message}</p>`;
    }
}

function setupModalEventListeners(professional) {
    const modal = document.getElementById('genericModal');
    
    if (modalEventListener) {
        modal.removeEventListener('click', modalEventListener);
    }

    modalEventListener = async (e) => {
        const button = e.target.closest('button[data-action]');
        
        if (!button) {
            const tab = e.target.closest('.tab-link');
            if (tab) {
                modal.querySelectorAll('.tab-link').forEach(btn => {
                    btn.classList.remove('active', 'border-indigo-600', 'text-indigo-600');
                    btn.classList.add('border-transparent', 'text-gray-500');
                });
                tab.classList.add('active', 'border-indigo-600', 'text-indigo-600');
                tab.classList.remove('border-transparent', 'text-gray-500');
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
                const confirmed = await showConfirmation('Excluir Profissional', `Tem certeza que deseja excluir ${professional.name}? Esta ação não pode ser desfeita e ele será removido da agenda e de todas as lojas.`);
                if(confirmed) {
                    try {
                        await professionalsApi.deleteProfessional(idToDelete);
                        logAction(state.establishmentId, getCurrentUserForLog(), 'Equipe', 'Excluiu', `Excluiu profissional: ${professional.name}`);
                        showNotification('Sucesso!', 'Profissional excluído da rede.', 'success');
                        closeProfessionalModal();
                        loadProfessionalsPage(); 
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

                // 🎯 Captura as checkboxes da Hierarquia/Rede
                const checkedUnits = Array.from(form.querySelectorAll('input[name="accessibleIn"]:checked')).map(cb => cb.value);
                const accessibleIn = checkedUnits.length > 0 ? checkedUnits : [state.establishmentId];

                const professionalData = {
                    ...professional,
                    id: form.querySelector('#professionalId').value || undefined, 
                    accessibleIn: accessibleIn, // Array Multi-Loja
                    name: form.querySelector('#profName').value.trim(),
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
                    establishmentId: state.establishmentId // Mantém como criador original
                };

                const originalText = saveButton.innerHTML;
                saveButton.disabled = true;
                saveButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';

                try {
                    if (professionalData.id) {
                        await professionalsApi.updateProfessional(professionalData.id, professionalData);
                        logAction(state.establishmentId, getCurrentUserForLog(), 'Equipe', 'Editou', `Editou o profissional: ${professionalData.name}`);
                        showNotification('Sucesso!', 'Dados atualizados.', 'success');
                    } else {
                        delete professionalData.id; 
                        await professionalsApi.createProfessional(professionalData);
                        logAction(state.establishmentId, getCurrentUserForLog(), 'Equipe', 'Criou', `Cadastrou o profissional: ${professionalData.name}`);
                        showNotification('Sucesso!', 'Novo membro adicionado à equipe.', 'success');
                    }
                    
                    closeProfessionalModal();
                    loadProfessionalsPage(); 
                } catch (error) {
                    showNotification('Erro', error.message, 'error');
                    saveButton.disabled = false;
                    saveButton.innerHTML = originalText;
                }
                break;

            case 'delete-blockage':
                const blockageId = button.dataset.id;
                if (await showConfirmation('Apagar Bloqueio', 'O profissional voltará a ficar disponível na agenda neste dia. Confirma?')) {
                    try {
                        await blockagesApi.deleteBlockage(blockageId);
                        showNotification('Bloqueio removido.', 'success');
                        const currentFilter = document.getElementById('prof-blockages-filter') ? document.getElementById('prof-blockages-filter').value : 'future';
                        fetchAndRenderBlockages(professional.id, currentFilter);
                    } catch (error) {
                        showNotification('Erro', error.message, 'error');
                    }
                }
                break;
            
            case 'batch-delete-blockage':
                const ids = JSON.parse(button.dataset.ids);
                if (await showConfirmation('Apagar em Lote', `Tem certeza que deseja apagar ${ids.length} dias de bloqueio de uma vez?`)) {
                    try {
                        await blockagesApi.batchDeleteBlockages(ids);
                        showNotification('Bloqueios removidos.', 'success');
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
        container.classList.add('flex');
    } else {
        container.classList.add('hidden');
        container.classList.remove('flex');
    }
}

function handleBatchDelete() {
    showConfirmation('Excluir em Lote', `Tem certeza que deseja excluir ${selectedProfessionals.size} profissionais da rede? Esta ação não pode ser desfeita.`)
        .then(async (confirmed) => {
            if (confirmed) {
                try {
                    await professionalsApi.batchDeleteProfessionals(Array.from(selectedProfessionals));
                    logAction(state.establishmentId, getCurrentUserForLog(), 'Equipe', 'Excluiu em Lote', `Excluiu ${selectedProfessionals.size} profissionais`);
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
    
    listDiv.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 pb-20'; 
    listDiv.innerHTML = renderProfessionalsListHTML(filtered);
}

// --- 4. FUNÇÃO PRINCIPAL EXPORTADA ---

export async function loadProfessionalsPage() {
    selectedProfessionals.clear();
    contentDiv.innerHTML = `
        <section id="professional-list-view" class="p-4 sm:p-6 max-w-7xl mx-auto">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                
                <div class="mb-8 border-b border-gray-100 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-800">Equipa e Profissionais</h2>
                        <p class="text-sm text-gray-500 mt-1">Gira os membros da equipa e defina em quais lojas eles atendem.</p>
                    </div>
                    <button data-action="open-professional-modal" data-professional="{}" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-5 rounded-lg transition-colors shadow-sm flex items-center gap-2">
                        <i class="bi bi-person-plus-fill"></i> Novo Profissional
                    </button>
                </div>

                <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div class="relative w-full md:w-96">
                        <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <input type="search" id="profSearchInput" placeholder="Pesquisar por nome..." class="w-full pl-10 p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm">
                    </div>
                    
                    <label class="flex items-center space-x-3 cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full md:w-auto shadow-sm">
                        <div class="relative">
                            <input type="checkbox" id="showInactiveProfToggle" class="sr-only">
                            <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full peer-checked:bg-indigo-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                        </div>
                        <span class="text-sm font-bold text-gray-700">Mostrar Inativos</span>
                    </label>
                </div>

                <div id="batch-actions-container" class="hidden bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl shadow-sm mb-6 justify-between items-center transition-all">
                    <span id="selected-count" class="font-bold text-lg"><i class="bi bi-check2-square"></i> </span>
                    <button data-action="batch-delete" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-lg shadow-sm flex items-center gap-2 transition-colors">
                        <i class="bi bi-trash3"></i> Excluir Todos
                    </button>
                </div>

                <div id="professionalsList" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
                    </div>
            </div>
        </section>`;

    if (pageEventListener) {
        contentDiv.removeEventListener('click', pageEventListener);
    }

    pageEventListener = e => {
        const cardOrBtn = e.target.closest('[data-action="open-professional-modal"]');
        const batchDeleteButton = e.target.closest('[data-action="batch-delete"]');

        if (cardOrBtn) {
            e.preventDefault();
            let profData = {};
            if (cardOrBtn.dataset.professional) {
                try {
                    profData = JSON.parse(cardOrBtn.dataset.professional);
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
        const [professionals, services, hierarchyData] = await Promise.all([
            professionalsApi.getProfessionals(state.establishmentId),
            servicesApi.getServices(state.establishmentId),
            getHierarchy() // Busca a estrutura da rede para usar nas checkboxes
        ]);
        
        state.professionals = professionals;
        state.services = services;
        hierarchyCache = hierarchyData?.matrizes || [];
        
        filterAndRenderProfessionals(); 
        updateBatchActionsVisibility();
    } catch (error) {
        listDiv.innerHTML = '<p class="text-red-500 col-span-full font-bold text-center py-10 bg-red-50 rounded-lg border border-red-100">Erro ao carregar dados do servidor.</p>';
    }
}