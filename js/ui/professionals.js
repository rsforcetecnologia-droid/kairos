// js/ui/professionals.js

// --- 1. IMPORTAÇÕES ---
import * as professionalsApi from '../api/professionals.js';
import * as servicesApi from '../api/services.js';
import * as blockagesApi from '../api/blockages.js';
import { getHierarchy } from '../api/establishments.js'; 
import { state } from '../state.js';
import { showNotification, showConfirmation } from '../components/modal.js';
import { logAction } from '../api/audit.js';
import { auth } from '../firebase-config.js';
import { escapeHTML, resizeAndCompressImage } from '../utils.js'; 

// --- 2. CONSTANTES E ESTADO LOCAL ---
const contentDiv = document.getElementById('content');
const daysOfWeek = { monday: 'Segunda', tuesday: 'Terça', wednesday: 'Quarta', thursday: 'Quinta', friday: 'Sexta', saturday: 'Sábado', sunday: 'Domingo' };

let localState = {
    professionals: null, // Inicia como null para diferenciar "Carregando" de "Vazio"
    services: [],
    hierarchyCache: [],
    
    // Filtros
    statusFilter: 'all',
    searchQuery: '',
    filterServiceId: 'all',
    isAdvancedFilterOpen: false,
    
    selectedIds: new Set(),
    viewMode: 'list', // 'list', 'edit-professional'
    tempProf: null
};

let pageEventListener = null;
let pageInputListener = null;

function getCurrentUserForLog() {
    const user = auth.currentUser;
    if (!user) return { uid: 'unknown', name: 'Desconhecido' };
    return { uid: user.uid, name: user.displayName || user.email };
}

// --- FUNÇÃO AUXILIAR: LER CHAVE SELETORA DO TOPO DO SISTEMA ---
function getActiveEstablishmentsFromHeader() {
    const checkboxes = document.querySelectorAll('#multi-context-list input[type="checkbox"]:checked');
    if (checkboxes.length > 0) {
        return Array.from(checkboxes).map(cb => cb.value);
    }
    return [state.establishmentId];
}

// --- 3. TROCA DE ECRÃS (MODAL FLUTUANTE) ---
function showMobileDetail() {
    const modal = document.getElementById('professionals-layout-detail');
    const modalInner = document.getElementById('prof-modal-inner');
    
    if (modal && modalInner) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        // Timeout pequeno para garantir a transição suave do Tailwind
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalInner.classList.remove('scale-95', 'translate-y-4');
            modalInner.classList.add('scale-100', 'translate-y-0');
        }, 10);
        
        document.body.style.overflow = 'hidden'; // Impede rolagem do fundo
    }
}

function hideMobileDetail() {
    const modal = document.getElementById('professionals-layout-detail');
    const modalInner = document.getElementById('prof-modal-inner');
    
    if (modal && modalInner) {
        modal.classList.add('opacity-0');
        modalInner.classList.remove('scale-100', 'translate-y-0');
        modalInner.classList.add('scale-95', 'translate-y-4');
        
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = ''; // Devolve rolagem ao fundo
        }, 300); // Tempo da transição
    }
    localState.viewMode = 'list';
}

// --- 4. RENDERIZAÇÃO DO LAYOUT PRINCIPAL ---

export async function loadProfessionalsPage() {
    localState.selectedIds.clear();
    localState.viewMode = 'list';
    localState.professionals = null; // Reset para estado de loading
    
    try {
        const payload = await getHierarchy();
        localState.hierarchyCache = payload.matrizes || [];
    } catch (e) { console.warn("Erro ao buscar lojas", e); }

    renderBaseLayout();
    setupEventListeners();
    await fetchAndDisplayData();
}

function renderBaseLayout() {
    contentDiv.innerHTML = `
        <div class="h-full flex w-full relative overflow-hidden bg-slate-50">
            <section id="professionals-layout-main" class="flex-1 flex flex-col p-4 md:pl-6 md:pr-6 md:pt-6 w-full relative overflow-y-auto custom-scrollbar">
                
                <div id="batch-action-bar" class="hidden absolute top-4 left-4 right-4 z-30 bg-slate-900 text-white rounded-xl shadow-2xl p-2.5 items-center justify-between animate-fade-in-down">
                    <div class="flex items-center gap-3">
                        <button id="cancel-selection-btn" class="p-1.5 hover:bg-slate-700 rounded-full transition-colors text-slate-300 hover:text-white">
                            <i class="bi bi-x-lg text-lg"></i>
                        </button>
                        <span class="font-bold text-sm tracking-wide"><span id="selected-count" class="text-indigo-400">0</span> Selecionados</span>
                    </div>
                    <button data-action="batch-delete" class="flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg text-sm active:scale-95">
                        <i class="bi bi-trash3"></i> Excluir
                    </button>
                </div>

                <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3 animate-fade-in w-full">
                    <div class="relative w-full md:w-96 flex-shrink-0">
                        <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"></i>
                        <input type="text" id="searchInput" value="${localState.searchQuery}" placeholder="Nome ou especialidade..." class="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm text-sm font-semibold text-slate-700">
                    </div>
                    
                    <div class="grid grid-cols-2 md:flex md:flex-wrap items-center gap-2 w-full md:w-auto">
                        <button id="toggle-filter-btn" class="py-2.5 px-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-2 text-xs active:scale-95 ${localState.isAdvancedFilterOpen ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : ''}">
                            <i class="bi bi-funnel text-base"></i> Filtros
                        </button>
                        <button data-action="open-professional-editor" data-id="" class="py-2.5 px-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-500/30 flex items-center justify-center gap-2 text-xs active:scale-95 uppercase tracking-wider border border-indigo-500">
                            <i class="bi bi-person-plus-fill text-base"></i> Criar Perfil
                        </button>
                    </div>
                </div>

                <div id="filter-panel" class="${localState.isAdvancedFilterOpen ? 'block' : 'hidden'} mb-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm animate-fade-in">
                    <div class="flex flex-col md:flex-row items-end gap-3">
                        <div class="w-full md:w-64">
                            <label class="block text-[9px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Serviço Habilitado</label>
                            <select id="filterServiceId" class="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-colors">
                                <option value="all">Todos os serviços</option>
                            </select>
                        </div>
                        <div class="flex gap-2 w-full md:w-auto">
                            <button id="clear-filters-btn" class="w-full md:w-auto px-5 py-2.5 bg-slate-100 text-slate-700 font-black rounded-lg hover:bg-slate-200 transition-colors text-xs uppercase tracking-wider border border-slate-200">Limpar</button>
                            <button id="apply-filter-btn" class="w-full md:w-auto px-6 py-2.5 bg-indigo-600 text-white font-black rounded-lg shadow-md hover:bg-indigo-700 active:scale-95 transition-all text-xs uppercase tracking-wider">Aplicar</button>
                        </div>
                    </div>
                </div>

                <div id="summary-section" class="grid grid-cols-4 gap-2 md:gap-4 mb-4 animate-fade-in w-full"></div>

                <div class="flex gap-2 overflow-x-auto pb-2 w-full custom-scrollbar mb-2 animate-fade-in flex-shrink-0">
                    <button data-status="all" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${localState.statusFilter === 'all' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}">Todos</button>
                    <button data-status="active" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${localState.statusFilter === 'active' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}">Ativos</button>
                    <button data-status="inactive" class="status-filter-btn px-4 py-2 text-xs font-black rounded-xl border uppercase tracking-wider transition whitespace-nowrap shadow-sm ${localState.statusFilter === 'inactive' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}">Inativos</button>
                </div>

                <div id="professionalsList" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 pb-20 mt-1 flex-1 content-start overflow-y-auto custom-scrollbar pr-1">
                    ${renderSkeletonList(8)}
                </div>
            </section>
        </div>

        <div id="professionals-layout-detail" class="hidden fixed inset-0 z-[99999] bg-slate-900/60 backdrop-blur-sm items-center justify-center p-0 md:p-6 opacity-0 transition-opacity duration-300">
            <div id="prof-modal-inner" class="bg-slate-50 w-full h-[100dvh] md:h-auto md:max-h-[95vh] md:max-w-5xl flex flex-col md:rounded-3xl shadow-2xl transform scale-95 translate-y-4 md:translate-y-0 transition-all duration-300 overflow-hidden">
                </div>
        </div>
    `;
}

// --- 5. COMUNICAÇÃO DE DADOS E RENDERIZAÇÃO DA LISTA ---

async function fetchAndDisplayData() {
    const listDiv = document.getElementById('professionalsList');
    const activeHeaderEstablishments = getActiveEstablishmentsFromHeader();
    
    try {
        const profPromises = activeHeaderEstablishments.map(id => professionalsApi.getProfessionals(id));
        const servPromises = activeHeaderEstablishments.map(id => servicesApi.getServices(id));
        
        const profResults = await Promise.all(profPromises);
        const servResults = await Promise.all(servPromises);
        
        const profMap = new Map();
        profResults.flat().forEach(p => profMap.set(p.id, p));
        localState.professionals = Array.from(profMap.values());
        state.professionals = localState.professionals;
        
        const servMap = new Map();
        servResults.flat().forEach(s => servMap.set(s.id, s));
        localState.services = Array.from(servMap.values());
        
        populateServiceFilter();
        filterAndRenderProfessionals(); 
        
    } catch (error) {
        console.error(error);
        if(listDiv) listDiv.innerHTML = '<div class="col-span-full py-16 text-center"><p class="text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-100 inline-block text-sm"><i class="bi bi-exclamation-triangle"></i> Erro ao carregar dados do servidor.</p></div>';
    }
}

function populateServiceFilter() {
    const serviceSelect = document.getElementById('filterServiceId');
    if(serviceSelect && localState.services) {
        serviceSelect.innerHTML = '<option value="all">Todos os serviços</option>';
        localState.services.forEach(s => {
            const option = document.createElement('option');
            option.value = s.id; 
            option.textContent = escapeHTML(s.name);
            if(localState.filterServiceId === s.id) option.selected = true;
            serviceSelect.appendChild(option);
        });
    }
}

function updateBatchActionBar() {
    const bar = document.getElementById('batch-action-bar');
    const countSpan = document.getElementById('selected-count');
    const count = localState.selectedIds.size;

    if (!bar || !countSpan) return;

    if (count > 0) {
        countSpan.textContent = count;
        bar.classList.remove('hidden');
        bar.classList.add('flex');
    } else {
        bar.classList.add('hidden');
        bar.classList.remove('flex');
    }
}

function renderKPIs(filteredList) {
    const section = document.getElementById('summary-section');
    if (!section) return;

    const total = filteredList.length;
    const ativos = filteredList.filter(p => p.status !== 'inactive').length;
    const inativos = total - ativos;

    section.innerHTML = `
        <div class="bg-white p-2 md:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Total Equipe</span>
            <span class="text-base md:text-2xl font-black text-slate-800 mt-0.5 w-full truncate">${total}</span>
        </div>
        <div class="bg-white p-2 md:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Ativos</span>
            <span class="text-base md:text-2xl font-black text-emerald-600 mt-0.5 w-full truncate">${ativos}</span>
        </div>
        <div class="bg-white p-2 md:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest w-full truncate">Inativos</span>
            <span class="text-base md:text-2xl font-black text-red-500 mt-0.5 w-full truncate">${inativos}</span>
        </div>
        <div class="bg-indigo-50 p-2 md:p-4 rounded-xl border border-indigo-100 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
            <span class="text-[9px] md:text-[10px] font-bold text-indigo-500 uppercase tracking-widest w-full truncate">Exibidos</span>
            <span class="text-base md:text-2xl font-black text-indigo-700 mt-0.5 w-full truncate">${filteredList.length}</span>
        </div>
    `;
}

function filterAndRenderProfessionals() {
    const listDiv = document.getElementById('professionalsList');
    if (!listDiv) return;

    // Se for null, ainda estamos carregando do servidor.
    if (localState.professionals === null) {
        listDiv.innerHTML = renderSkeletonList(8); 
        return;
    }

    const activeHeaderEstablishments = getActiveEstablishmentsFromHeader();
    
    const filtered = localState.professionals.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(localState.searchQuery) || (p.specialty && p.specialty.toLowerCase().includes(localState.searchQuery));
        
        let matchesStatus = true;
        if(localState.statusFilter === 'active') matchesStatus = p.status !== 'inactive';
        if(localState.statusFilter === 'inactive') matchesStatus = p.status === 'inactive';
        
        const matchesService = localState.filterServiceId === "all" || (p.services && p.services.includes(localState.filterServiceId));
        
        const pUnits = p.accessibleIn && p.accessibleIn.length > 0 ? p.accessibleIn : [p.establishmentId || state.establishmentId];
        const matchesBranch = activeHeaderEstablishments.some(id => pUnits.includes(id));

        return matchesSearch && matchesStatus && matchesService && matchesBranch;
    });
    
    renderKPIs(filtered);
    
    // Mostra estado vazio correto
    if (filtered.length === 0) {
        if (localState.professionals.length === 0) {
            // Banco de dados realmente vazio
            listDiv.innerHTML = `
                <div class="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm">
                    <div class="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 border border-indigo-100">
                        <i class="bi bi-people text-3xl text-indigo-400"></i>
                    </div>
                    <h3 class="text-base font-black text-slate-800 mb-1">Nenhum profissional cadastrado</h3>
                    <p class="text-xs text-slate-500 max-w-sm text-center font-medium mb-6">A sua equipe de atendimento ainda está vazia. Adicione o seu primeiro profissional para começar a agendar!</p>
                    <button data-action="open-professional-editor" class="py-3 px-6 bg-indigo-600 text-white font-black rounded-xl shadow-md hover:bg-indigo-700 transition active:scale-95 uppercase tracking-wider text-xs flex items-center gap-2">
                        <i class="bi bi-person-plus-fill"></i> Cadastrar Agora
                    </button>
                </div>
            `;
        } else {
            // Vazio devido aos filtros da pesquisa
            listDiv.innerHTML = `
                <div class="col-span-full flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm">
                    <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                        <i class="bi bi-search text-2xl text-slate-300"></i>
                    </div>
                    <h3 class="text-sm font-bold text-slate-700 mb-1">Nenhum resultado encontrado</h3>
                    <p class="text-[10px] text-slate-500 max-w-xs text-center font-medium">Tente ajustar os filtros ou limpar a barra de pesquisa.</p>
                    <button id="clear-filters-btn" class="mt-4 py-2 px-4 bg-slate-100 text-slate-600 font-bold rounded-lg border border-slate-200 text-[10px] uppercase tracking-wider hover:bg-slate-200 transition">Limpar Filtros</button>
                </div>
            `;
        }
        return;
    }

    listDiv.innerHTML = filtered.map(prof => {
        const isInactive = prof.status === 'inactive';
        const safeName = escapeHTML(prof.name);
        const safeSpecialty = escapeHTML(prof.specialty || 'Especialidade');
        
        const photoSrc = prof.photo || `https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(prof.name ? prof.name.charAt(0) : 'P')}`;

        const unitCount = prof.accessibleIn ? prof.accessibleIn.length : 1;
        const serviceCount = prof.services ? prof.services.length : 0;
        const isSelected = localState.selectedIds.has(prof.id);

        return `
            <div class="professional-card relative bg-white rounded-2xl border ${isSelected ? 'border-indigo-400 ring-1 ring-indigo-200 shadow-md bg-indigo-50/20' : 'border-slate-200'} shadow-sm flex items-center p-4 cursor-pointer transition-all hover:shadow-md hover:border-indigo-300 active:scale-[0.98] ${isInactive ? 'opacity-60 bg-slate-50' : ''}" 
                 data-action="open-professional-editor" data-id="${prof.id}">
                
                <div class="absolute top-2 right-2 z-10 flex flex-col gap-2 items-center" data-action-stop-propagation="true">
                    <input type="checkbox" data-id="${prof.id}" class="professional-checkbox w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${isSelected ? 'checked' : ''}>
                </div>

                <div class="relative flex-shrink-0 mr-4">
                    <img src="${photoSrc}" alt="${safeName}" class="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border border-slate-100 shadow-sm">
                    <span class="absolute bottom-0 right-0 w-4 h-4 border-2 border-white rounded-full ${isInactive ? 'bg-red-500' : 'bg-emerald-500'}" title="${isInactive ? 'Inativo' : 'Ativo'}"></span>
                </div>
                
                <div class="flex-1 min-w-0 pr-6">
                    <h3 class="text-sm font-black text-slate-800 truncate leading-tight mb-1">${safeName}</h3>
                    <p class="text-[10px] font-bold text-slate-500 truncate uppercase tracking-widest mb-2">${safeSpecialty}</p>
                    
                    <div class="flex items-center gap-1.5 mt-1">
                        ${unitCount > 1 
                            ? `<span class="text-[9px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md border border-indigo-100 flex items-center gap-1"><i class="bi bi-diagram-3"></i> ${unitCount}</span>` 
                            : `<span class="text-[9px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 flex items-center gap-1"><i class="bi bi-geo-alt"></i> Única</span>`
                        }
                        <span class="text-[9px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 flex items-center gap-1" title="${serviceCount} serviços habilitados"><i class="bi bi-scissors text-indigo-400"></i> ${serviceCount}</span>
                    </div>
                </div>
            </div>`;
    }).join('');
}

function renderSkeletonList(count = 8) {
    let skeletonHTML = '';
    for (let i = 0; i < count; i++) {
        skeletonHTML += `
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center p-4 animate-pulse h-[98px]">
            <div class="w-14 h-14 rounded-full bg-slate-200 flex-shrink-0 mr-4"></div>
            <div class="flex-1 space-y-3">
                <div class="h-3 bg-slate-200 rounded w-3/4"></div>
                <div class="h-2 bg-slate-200 rounded w-1/2"></div>
            </div>
        </div>
        `;
    }
    return skeletonHTML;
}

// --- 6. NOVA TELA NATIVA DE EDIÇÃO (MODAL) ---

async function openProfessionalEditor(profId) {
    localState.viewMode = 'edit-professional';
    const modalInner = document.getElementById('prof-modal-inner');
    if(!modalInner) return;

    let prof = { name: '', specialty: '', status: 'active', workingHours: {}, services: [] };
    if (profId) {
        const found = localState.professionals.find(p => String(p.id) === String(profId));
        if (found) prof = JSON.parse(JSON.stringify(found));
    }
    
    localState.tempProf = prof;
    const isEditing = !!prof.id;
    const safeTitle = escapeHTML(prof.name || 'Novo Profissional');

    const mobileHeaderHTML = `
        <div class="p-4 md:p-5 border-b border-slate-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50">
            <button data-action="close-detail-screen" class="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-100 hover:text-slate-800 transition-colors active:scale-95 mr-4">
                <i class="bi bi-arrow-left text-lg"></i>
            </button>
            <div>
                <h3 class="font-black text-sm md:text-base text-slate-800 uppercase tracking-wider truncate leading-tight">${isEditing ? 'Editar Perfil' : 'Novo Perfil'}</h3>
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">${isEditing ? safeTitle : 'Configuração de Atendimento'}</p>
            </div>
            ${isEditing ? `
                <button data-action="delete-professional" data-id="${prof.id}" class="ml-auto w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 border border-red-100 transition-colors active:scale-95" title="Excluir">
                    <i class="bi bi-trash3 text-base"></i>
                </button>
            ` : ''}
        </div>
    `;

    modalInner.innerHTML = `
        ${mobileHeaderHTML}
        
        <div class="modal-tabs px-2 md:px-6 border-b flex items-center justify-between overflow-x-auto bg-slate-50 flex-shrink-0 custom-scrollbar shadow-sm">
            <button class="tab-link active whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-indigo-600 text-indigo-600 transition-colors uppercase tracking-widest" data-tab="dados-basicos">1. Básicos</button>
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-transparent text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest" data-tab="atuacao">2. Atuação</button>
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-transparent text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest" data-tab="jornada">3. Jornada</button>
            <button class="tab-link whitespace-nowrap text-[10px] md:text-xs font-black py-4 px-4 border-b-2 border-transparent text-slate-400 hover:text-indigo-500 transition-colors uppercase tracking-widest" data-tab="bloqueios">4. Bloqueios</button>
        </div>
        
        <div class="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50 p-3 md:p-6 relative"> 
            <form id="professionalForm" class="h-full w-full mx-auto">
                <input type="hidden" id="professionalId" value="${prof.id || ''}">
                <input type="hidden" id="profPhotoBase64" value="${prof.photo || ''}">
                
                <div id="dados-basicos" class="tab-content active space-y-4 md:space-y-6 animate-fade-in-fast"></div>
                <div id="atuacao" class="tab-content hidden space-y-4 md:space-y-6 animate-fade-in-fast"></div>
                <div id="jornada" class="tab-content hidden animate-fade-in-fast"></div>
                <div id="bloqueios" class="tab-content hidden animate-fade-in-fast"></div>
            </form>
        </div>

        <footer class="p-4 bg-white border-t border-slate-200 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.05)] w-full flex-shrink-0 z-50 flex gap-3 justify-end rounded-b-3xl">
            <button type="button" data-action="close-detail-screen" class="hidden md:block py-3 px-6 bg-slate-100 border border-slate-200 text-slate-600 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-slate-200 transition-colors shadow-sm">Cancelar</button>
            <button type="button" data-action="save-professional" class="w-full md:w-auto md:px-8 py-3 bg-indigo-600 text-white font-black text-xs md:text-sm rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-500/30 transition-transform active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider border border-indigo-600">
                <i class="bi bi-check2-circle text-lg"></i> Salvar Perfil
            </button>
        </footer>
    `;

    fillCadastroTab(prof, localState.services);
    fillJornadaTab(prof);
    await fillBloqueiosTab(prof, localState.professionals);
    
    attachEditorDynamicEvents(prof);

    showMobileDetail();
}

function fillCadastroTab(prof, services) {
    const dadosBasicosContainer = document.getElementById('dados-basicos');
    const atuacaoContainer = document.getElementById('atuacao');
    if (!dadosBasicosContainer || !atuacaoContainer) return;
    
    const dob = prof.dob ? prof.dob.split('/') : ['', ''];
    const monthOptions = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        const selected = month == dob[1] ? 'selected' : '';
        const monthName = new Date(0, i).toLocaleString('pt-BR', { month: 'long' });
        return `<option value="${month}" ${selected}>${monthName.charAt(0).toUpperCase() + monthName.slice(1)}</option>`;
    }).join('');
    
    const safeName = escapeHTML(prof.name || '');
    const safeSpecialty = escapeHTML(prof.specialty || '');
    const safePhone = escapeHTML(prof.phone || '');
    const safeNotes = escapeHTML(prof.notes || '');

    dadosBasicosContainer.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-1 space-y-4">
                <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center flex flex-col items-center">
                    <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Foto de Perfil</label>
                    <div class="relative group w-32 h-32 mb-5 cursor-pointer" id="profPhotoContainer">
                        <img id="profPhotoPreview" src="${prof.photo || `https://placehold.co/150x150/E2E8F0/4A5568?text=${encodeURIComponent(prof.name ? prof.name.charAt(0) : 'P')}`}" alt="Foto de Perfil" class="w-full h-full rounded-full object-cover border-4 border-slate-50 shadow-md transition-all group-hover:brightness-75">
                        <div id="profPhotoButtonOverlay" class="absolute inset-0 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                            <i class="bi bi-camera-fill text-white text-3xl drop-shadow-md"></i>
                        </div>
                    </div>
                    <input type="file" id="profPhotoInput" class="hidden" accept="image/*">
                    <button type="button" id="profPhotoButton" class="text-indigo-600 text-[10px] font-black uppercase tracking-wider hover:text-indigo-800 transition-colors w-full bg-indigo-50 py-2.5 rounded-xl border border-indigo-100 shadow-sm active:scale-95">Alterar Imagem</button>
                </div>

                 <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p class="text-xs font-black text-slate-800 uppercase tracking-wider mb-0.5">Status do Perfil</p>
                        <p class="text-[9px] font-bold text-slate-400">Inativos não aparecem na agenda.</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" id="profStatusToggle" class="sr-only peer" ${prof.status !== 'inactive' ? 'checked' : ''}>
                        <div class="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 shadow-inner"></div>
                    </label>
                </div>
            </div>

            <div class="lg:col-span-2 space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div class="form-group sm:col-span-2">
                        <label for="profName" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Nome Completo *</label>
                        <input type="text" id="profName" value="${safeName}" required class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white text-sm font-bold text-slate-800 shadow-inner transition-colors">
                    </div>
                    <div class="form-group">
                        <label for="profSpecialty" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Especialidade / Cargo *</label>
                        <input type="text" id="profSpecialty" value="${safeSpecialty}" required placeholder="Ex: Cabeleireiro, Médico" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white text-sm font-bold text-slate-800 shadow-inner transition-colors">
                    </div>
                    <div class="form-group">
                        <label for="profPhone" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">WhatsApp / Telefone</label>
                        <input type="tel" id="profPhone" value="${safePhone}" placeholder="(00) 00000-0000" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white text-sm font-bold text-slate-800 shadow-inner transition-colors">
                    </div>
                    <div class="form-group">
                        <label for="profDobDay" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Aniversário (Dia)</label>
                        <input type="number" id="profDobDay" value="${dob[0]}" min="1" max="31" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white text-sm font-bold text-slate-800 shadow-inner transition-colors">
                    </div>
                    <div class="form-group">
                        <label for="profDobMonth" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Aniversário (Mês)</label>
                        <select id="profDobMonth" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white text-sm font-bold text-slate-800 shadow-inner transition-colors cursor-pointer">
                            <option value="">Selecione...</option>${monthOptions}
                        </select>
                    </div>
                </div>

                <div class="form-group pt-2">
                    <label for="profNotes" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Observações Internas</label>
                    <textarea id="profNotes" rows="3" class="w-full p-3.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white text-sm font-medium text-slate-700 shadow-inner transition-colors placeholder-slate-400 resize-none" placeholder="Ex: Informações contratuais, detalhes de preferência...">${safeNotes}</textarea>
                </div>
            </div>
        </div>
    `;

    atuacaoContainer.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-4">
                <div>
                    <p class="text-xs font-black text-slate-800 uppercase tracking-wider mb-0.5">Paga Comissão?</p>
                    <p class="text-[9px] font-bold text-slate-400">Gera comissão em serviços.</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer ml-3">
                    <input type="checkbox" id="profCommissionToggle" class="sr-only peer" ${prof.receivesCommission !== false ? 'checked' : ''}>
                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 shadow-inner"></div>
                </label>
            </div>

            <div class="flex items-center justify-between border-b md:border-b-0 md:border-r border-slate-100 py-4 md:py-0 md:px-4">
                <div>
                    <p class="text-xs font-black text-slate-800 uppercase tracking-wider mb-0.5">Exibir no App</p>
                    <p class="text-[9px] font-bold text-slate-400">Visível para agendamento online.</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer ml-3">
                    <input type="checkbox" id="profShowOnAgendaToggle" class="sr-only peer" ${prof.showOnAgenda !== false ? 'checked' : ''}>
                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
                </label>
            </div>

            <div class="pt-4 md:pt-0 md:pl-4">
                <label for="profOrderOnAgenda" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Ordem na Agenda</label>
                <div class="flex items-center gap-2">
                    <input type="number" id="profOrderOnAgenda" value="${prof.orderOnAgenda || '1'}" min="1" class="w-20 p-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-center font-black bg-slate-50 shadow-inner">
                    <span class="text-[9px] font-bold text-slate-400">Posição visual.</span>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
                <div class="flex items-center mb-4 text-indigo-900 border-b border-slate-100 pb-4">
                    <div class="bg-indigo-100 w-12 h-12 rounded-xl mr-3 flex items-center justify-center border border-indigo-200"><i class="bi bi-diagram-3 text-2xl"></i></div>
                    <div>
                        <h3 class="text-sm font-black uppercase tracking-wider">Lojas de Atendimento</h3>
                        <p class="text-[9px] font-bold text-slate-400">Unidades onde atende.</p>
                    </div>
                </div>
                <div class="flex-1 overflow-y-auto max-h-80 custom-scrollbar pr-2">
                    ${generateUnitCheckboxesHTML(prof.accessibleIn || [])}
                </div>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
                <div class="flex justify-between items-center mb-4 border-b border-slate-100 pb-4">
                    <div class="flex items-center text-emerald-900">
                        <div class="bg-emerald-100 w-12 h-12 rounded-xl mr-3 flex items-center justify-center border border-emerald-200"><i class="bi bi-scissors text-2xl"></i></div>
                        <div>
                            <h3 class="text-sm font-black uppercase tracking-wider">Serviços Habilitados</h3>
                            <p class="text-[9px] font-bold text-slate-400">O que o profissional faz.</p>
                        </div>
                    </div>
                    <button type="button" id="selectAllServicesBtn" class="text-[9px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-2 rounded-lg transition-colors border border-indigo-100 active:scale-95 shadow-sm">
                        Selecionar Todos
                    </button>
                </div>
                
                <div id="profServicesContainer" class="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1 overflow-y-auto max-h-80 custom-scrollbar pr-2">
                    ${services.map(s => `
                        <label class="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl cursor-pointer transition-colors border border-slate-200 hover:border-indigo-300 hover:shadow-sm">
                            <input type="checkbox" value="${s.id}" class="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-5 w-5" ${prof.services?.includes(s.id) ? 'checked' : ''}>
                            <span class="text-xs font-bold text-slate-700 truncate" title="${escapeHTML(s.name)}">${escapeHTML(s.name)}</span>
                        </label>
                    `).join('')}
                    ${services.length === 0 ? '<p class="col-span-full text-center text-xs font-bold text-slate-400 py-8 border border-dashed border-slate-200 rounded-xl">Nenhum serviço cadastrado no sistema.</p>' : ''}
                </div>
            </div>
        </div>
    `;
}

function generateUnitCheckboxesHTML(selectedIds = []) {
    if (!localState.hierarchyCache || localState.hierarchyCache.length === 0) {
        return `
            <input type="hidden" name="accessibleIn" value="${state.establishmentId}">
            <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 text-sm font-bold text-slate-500 text-center">
                <i class="bi bi-info-circle text-2xl block mb-2 text-slate-400"></i> Exclusivo desta unidade.
            </div>`;
    }

    let html = '<div class="space-y-2 mt-1">';
    
    localState.hierarchyCache.forEach(matriz => {
        const isMatrizSelected = selectedIds.includes(matriz.id) || (selectedIds.length === 0 && matriz.id === state.establishmentId);
        html += `
            <label class="flex items-center space-x-3 p-3 cursor-pointer bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-300 rounded-xl transition-colors shadow-sm">
                <input type="checkbox" name="accessibleIn" value="${matriz.id}" class="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" ${isMatrizSelected ? 'checked' : ''}>
                <span class="text-xs md:text-sm font-black text-slate-800">🏢 ${escapeHTML(matriz.name)}</span>
            </label>
        `;
        if (matriz.branches && matriz.branches.length > 0) {
            matriz.branches.forEach(branch => {
                const isBranchSelected = selectedIds.includes(branch.id) || (selectedIds.length === 0 && branch.id === state.establishmentId);
                html += `
                    <label class="flex items-center space-x-3 p-3 ml-8 cursor-pointer bg-white hover:bg-indigo-50/50 border border-slate-100 hover:border-indigo-200 rounded-xl transition-colors border-l-4 border-l-indigo-200 shadow-sm">
                        <input type="checkbox" name="accessibleIn" value="${branch.id}" class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" ${isBranchSelected ? 'checked' : ''}>
                        <span class="text-xs font-bold text-slate-600">📍 ${escapeHTML(branch.name)}</span>
                    </label>
                `;
            });
        }
    });
    
    html += '</div>';
    return html;
}

function fillJornadaTab(prof) {
    const container = document.getElementById('jornada');
    if(!container) return;
    container.innerHTML = `
        <div class="bg-white p-5 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div class="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div class="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100"><i class="bi bi-clock-history text-2xl"></i></div>
                <div>
                    <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider mb-0.5">Jornada Semanal</h3>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Defina os dias e os horários de atendimento.</p>
                </div>
            </div>
            <div id="profScheduleContainer" class="grid grid-cols-1 lg:grid-cols-2 gap-4"></div>
        </div>`;
    renderAdvancedScheduleSelector(container.querySelector('#profScheduleContainer'), prof.workingHours || {});
}

function renderAdvancedScheduleSelector(container, scheduleData) {
    container.innerHTML = Object.keys(daysOfWeek).map(dayKey => {
        const dayData = scheduleData[dayKey] || {};
        const isChecked = dayData.active !== false;
        return `
            <div class="day-schedule-card p-4 md:p-5 rounded-2xl ${isChecked ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50 border-slate-100 disabled opacity-60'} border transition-all">
                 <div class="flex justify-between items-center mb-4">
                    <span class="font-black text-sm text-slate-800 uppercase tracking-wider flex items-center gap-2"><i class="bi bi-calendar-day text-slate-400"></i> ${daysOfWeek[dayKey]}</span>
                    <label class="flex items-center cursor-pointer">
                        <div class="relative">
                            <input type="checkbox" data-day="${dayKey}" data-field="active" class="sr-only" ${isChecked ? 'checked' : ''}>
                            <div class="toggle-bg block bg-slate-200 w-12 h-6 rounded-full peer-checked:bg-indigo-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full shadow-inner"></div>
                        </div>
                    </label>
                 </div>
                <div class="time-inputs grid grid-cols-2 gap-3 text-sm">
                    <div><label class="block text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1.5 ml-1">Abertura</label><input type="time" data-day="${dayKey}" data-field="start" value="${dayData.start || '09:00'}" class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-bold text-slate-800 shadow-inner transition-shadow" ${!isChecked ? 'disabled' : ''}></div>
                    <div><label class="block text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1.5 ml-1">Fecho</label><input type="time" data-day="${dayKey}" data-field="end" value="${dayData.end || '18:00'}" class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-bold text-slate-800 shadow-inner transition-shadow" ${!isChecked ? 'disabled' : ''}></div>
                    <div><label class="block text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1.5 ml-1">Início Pausa</label><input type="time" data-day="${dayKey}" data-field="breakStart" value="${dayData.breakStart || '12:00'}" class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-bold text-slate-800 shadow-inner transition-shadow" ${!isChecked ? 'disabled' : ''}></div>
                    <div><label class="block text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1.5 ml-1">Fim Pausa</label><input type="time" data-day="${dayKey}" data-field="breakEnd" value="${dayData.breakEnd || '13:00'}" class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-bold text-slate-800 shadow-inner transition-shadow" ${!isChecked ? 'disabled' : ''}></div>
                </div>
            </div>`;
    }).join('');

    container.querySelectorAll('input[type="checkbox"][data-field="active"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const card = e.target.closest('.day-schedule-card');
            const isDisabled = !e.target.checked;
            card.classList.toggle('bg-white', !isDisabled);
            card.classList.toggle('shadow-sm', !isDisabled);
            card.classList.toggle('border-slate-200', !isDisabled);
            
            card.classList.toggle('bg-slate-50', isDisabled);
            card.classList.toggle('border-slate-100', isDisabled);
            card.classList.toggle('opacity-60', isDisabled);
            card.classList.toggle('disabled', isDisabled);
            
            card.querySelectorAll('.time-inputs input').forEach(input => input.disabled = isDisabled);
        });
    });
}

async function fillBloqueiosTab(prof, allProfessionals) {
    const container = document.getElementById('bloqueios');
    if(!container) return;
    container.innerHTML = `
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 bg-white p-5 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div class="border-b xl:border-b-0 xl:border-r border-slate-100 pb-6 xl:pb-0 xl:pr-8">
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center border border-orange-100"><i class="bi bi-calendar-x text-2xl"></i></div>
                    <div>
                        <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider mb-0.5">Lançar Bloqueio</h3>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Adicione férias ou ausências.</p>
                    </div>
                </div>
                
                <form id="batchBlockageForm" class="p-5 md:p-6 bg-orange-50/50 border border-orange-200 rounded-2xl space-y-5 shadow-sm">
                    <div>
                        <h4 class="font-bold text-slate-700 mb-2 text-[10px] uppercase tracking-widest ml-1">Aplicar aos Profissionais:</h4>
                        <div id="batchProfSelectionContainer" class="max-h-40 overflow-y-auto custom-scrollbar p-2.5 border border-orange-200 rounded-xl bg-white space-y-1.5 shadow-inner">
                            ${allProfessionals.map(p => `
                                <label class="flex items-center space-x-3 hover:bg-orange-50 p-2.5 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-orange-100">
                                    <input type="checkbox" name="batch-professionals" value="${p.id}" class="w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500" ${p.id === prof.id ? 'checked' : ''}>
                                    <span class="text-xs font-bold text-slate-700">${escapeHTML(p.name)}</span>
                                </label>`).join('')}
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div><label for="batchBlockageStartDate" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Data Início *</label><input type="date" id="batchBlockageStartDate" required class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 text-xs font-bold bg-white shadow-inner"></div>
                        <div><label for="batchBlockageEndDate" class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Data Fim (Opcional)</label><input type="date" id="batchBlockageEndDate" class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 text-xs font-bold bg-white shadow-inner"></div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Hora Início *</label><input type="time" id="batchBlockageStartTime" required class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 text-xs font-bold bg-white shadow-inner"></div>
                        <div><label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Hora Fim *</label><input type="time" id="batchBlockageEndTime" required class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 text-xs font-bold bg-white shadow-inner"></div>
                    </div>
                    <div><label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Motivo / Descrição</label><input type="text" id="batchBlockageReason" placeholder="Ex: Férias, Consulta Médica..." class="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium bg-white shadow-inner"></div>
                    <button type="submit" class="w-full bg-orange-500 text-white font-black py-3.5 rounded-xl hover:bg-orange-600 shadow-md shadow-orange-500/30 active:scale-95 transition-transform mt-4 uppercase tracking-wider text-xs border border-orange-600">Gravar Bloqueio na Agenda</button>
                </form>
            </div>
            <div class="xl:pl-2 flex flex-col">
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3 border-b border-slate-100 pb-4">
                    <div>
                        <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider mb-0.5">Registos Salvos</h3>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${escapeHTML((prof.name || '').split(' ')[0] || 'Deste Perfil')}</p>
                    </div>
                    <select id="prof-blockages-filter" class="p-2.5 border border-slate-200 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm cursor-pointer transition-colors">
                        <option value="future">Apenas Futuros</option>
                        <option value="history">Histórico Passado</option>
                    </select>
                </div>
                <div id="blockagesList" class="space-y-4 flex-1 overflow-y-auto max-h-[500px] custom-scrollbar pr-2"></div>
            </div>
        </div>`;
    
    const batchBlockageForm = document.getElementById('batchBlockageForm');
    if(batchBlockageForm) {
        batchBlockageForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = batchBlockageForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.disabled = true; btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';

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
    if(filterSelect) filterSelect.addEventListener('change', (e) => fetchAndRenderBlockages(prof.id, e.target.value));

    if(prof.id) await fetchAndRenderBlockages(prof.id, 'future');
}

async function fetchAndRenderBlockages(professionalId, mode = 'future') {
    const listDiv = document.getElementById('blockagesList');
    if (!listDiv) return;
    listDiv.innerHTML = '<div class="loader mx-auto mt-10"></div>';
    
    if(!professionalId) {
        listDiv.innerHTML = `
            <div class="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <i class="bi bi-info-circle text-3xl text-slate-300 mb-3 block"></i>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Salve o perfil para ver o histórico.</p>
            </div>`;
        return;
    }

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
                <div class="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                    <i class="bi bi-calendar-check text-4xl text-slate-300 mb-3 block"></i>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nenhum bloqueio ${mode === 'history' ? 'no histórico' : 'agendado para o futuro'}.</p>
                </div>`;
            return;
        }

        listDiv.innerHTML = Object.entries(groupedByReason).map(([reason, group]) => `
            <div class="bg-white border border-slate-200 rounded-xl shadow-sm mb-4 overflow-hidden">
                <div class="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                    <h4 class="font-black text-xs text-slate-800 flex items-center gap-2"><i class="bi bi-tag-fill text-orange-400 text-sm"></i> ${escapeHTML(reason)}</h4>
                    ${group.length > 1 ? `<button data-action="batch-delete-blockage" data-ids='${JSON.stringify(group.map(b => b.id))}' class="text-[9px] text-red-600 bg-red-50 hover:bg-red-100 font-bold px-3 py-1.5 rounded-lg border border-red-100 transition-colors uppercase tracking-widest active:scale-95 shadow-sm">Apagar Todos (${group.length})</button>` : ''}
                </div>
                <div class="divide-y divide-slate-100 p-1.5">
                ${group.map(b => `
                    <div class="flex justify-between items-center p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                        <div class="flex items-center gap-3 md:gap-4">
                            <div class="bg-orange-50 text-orange-600 border border-orange-100 w-12 h-12 rounded-xl flex flex-col items-center justify-center leading-none shadow-inner">
                                <span class="font-black text-base">${b.startTime.getDate().toString().padStart(2, '0')}</span>
                                <span class="text-[9px] uppercase font-bold mt-0.5">${b.startTime.toLocaleString('pt-BR', {month:'short'})}</span>
                            </div>
                            <div>
                                <p class="text-xs md:text-sm font-black text-slate-700">
                                   ${b.startTime.toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'})} <span class="text-slate-400 font-medium">até</span> ${b.endTime.toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'})}
                                </p>
                                ${b.startTime.getDate() !== b.endTime.getDate() ? `<p class="text-[10px] text-slate-400 font-bold mt-1 bg-slate-100 px-2 py-0.5 rounded-md inline-block">Termina: ${b.endTime.toLocaleDateString('pt-BR')}</p>` : ''}
                            </div>
                        </div>
                        <button data-action="delete-blockage" data-id="${b.id}" class="text-slate-400 hover:text-red-500 w-10 h-10 rounded-xl hover:bg-red-50 border border-transparent hover:border-red-100 transition-colors flex items-center justify-center shadow-sm active:scale-95" title="Apagar">
                            <i class="bi bi-trash3 pointer-events-none text-base"></i>
                        </button>
                    </div>
                `).join('')}
                </div>
            </div>
        `).join('');
    } catch (error) {
        listDiv.innerHTML = `<p class="text-[10px] font-bold text-red-500 p-4 bg-red-50 rounded-xl border border-red-100">${error.message}</p>`;
    }
}

function attachEditorDynamicEvents(prof) {
    const modalInner = document.getElementById('prof-modal-inner');
    if (!modalInner) return;

    // Lógica das Abas (Tabs)
    const tabLinks = modalInner.querySelectorAll('.tab-link');
    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            tabLinks.forEach(btn => {
                btn.classList.remove('active', 'border-indigo-600', 'text-indigo-600');
                btn.classList.add('border-transparent', 'text-slate-400');
            });
            link.classList.add('active', 'border-indigo-600', 'text-indigo-600');
            link.classList.remove('border-transparent', 'text-slate-400');
            
            modalInner.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
            const tabId = link.dataset.tab;
            const tabEl = modalInner.querySelector('#' + tabId);
            if(tabEl) {
                tabEl.classList.remove('hidden');
            }
        });
    });

    // Lógica do Upload de Imagem
    const photoInput = modalInner.querySelector('#profPhotoInput');
    const photoButton = modalInner.querySelector('#profPhotoButton');
    const photoContainer = modalInner.querySelector('#profPhotoContainer');
    const photoPreview = modalInner.querySelector('#profPhotoPreview');
    const photoBase64Input = modalInner.querySelector('#profPhotoBase64');
    const originalPhotoSrc = prof.photo || `https://placehold.co/150x150/E2E8F0/4A5568?text=${encodeURIComponent(prof.name ? prof.name.charAt(0) : 'P')}`;
    const originalBase64 = prof.photo || '';

    const triggerFileInput = () => photoInput.click();
    if (photoButton) photoButton.addEventListener('click', triggerFileInput);
    if (photoContainer) photoContainer.addEventListener('click', triggerFileInput);

    if (photoInput) {
        photoInput.onchange = async () => {
             const file = photoInput.files[0];
             if (!file) return;
             photoPreview.src = 'https://placehold.co/150x150/E2E8F0/4A5568?text=...';
             
             try {
                 const resizedBase64 = await resizeAndCompressImage(file, 800, 800, 0.8);
                 const stringLength = resizedBase64.length;
                 const sizeInBytes = (stringLength * 3) / 4; 
                 if (sizeInBytes > 1000 * 1024) throw new Error('A imagem é muito grande mesmo após a compressão.');

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

    // Selecionar todos os Serviços
    const selectAllBtn = modalInner.querySelector('#selectAllServicesBtn');
    if(selectAllBtn) {
        selectAllBtn.addEventListener('click', () => {
            const checkboxes = modalInner.querySelectorAll('#profServicesContainer input[type="checkbox"]');
            const allChecked = Array.from(checkboxes).every(cb => cb.checked);
            checkboxes.forEach(cb => { cb.checked = !allChecked; });
            selectAllBtn.textContent = allChecked ? "Selecionar Todos" : "Desmarcar Todos";
        });
        
        const checkboxes = modalInner.querySelectorAll('#profServicesContainer input[type="checkbox"]');
        if(checkboxes.length > 0 && Array.from(checkboxes).every(cb => cb.checked)) {
            selectAllBtn.textContent = "Desmarcar Todos";
        }
    }
}

// --- 7. DELEGAÇÃO DE EVENTOS DE PÁGINA GLOBAL ---

function setupEventListeners() {
    if (pageEventListener) {
        document.body.removeEventListener('click', pageEventListener);
    }
    if (pageInputListener) {
        contentDiv.removeEventListener('input', pageInputListener);
    }

    pageEventListener = async (e) => {
        // --- 1. Checkboxes de Lista ---
        if (e.target.classList.contains('professional-checkbox')) {
            const id = e.target.dataset.id;
            if(e.target.checked) localState.selectedIds.add(id);
            else localState.selectedIds.delete(id);
            updateBatchActionBar();
            e.stopPropagation();
            return;
        }

        // --- 2. Filtros de Status ---
        const statusBtn = e.target.closest('.status-filter-btn');
        if (statusBtn) {
            localState.statusFilter = statusBtn.dataset.status;
            document.querySelectorAll('.status-filter-btn').forEach(btn => {
                btn.classList.remove('bg-indigo-600', 'text-white', 'border-indigo-600');
                btn.classList.add('bg-white', 'text-slate-600', 'border-slate-200');
            });
            statusBtn.classList.remove('bg-white', 'text-slate-600', 'border-slate-200');
            statusBtn.classList.add('bg-indigo-600', 'text-white', 'border-indigo-600');
            filterAndRenderProfessionals();
            return;
        }

        // --- 3. Limpar Filtros ---
        if (e.target.id === 'clear-filters-btn') {
            e.preventDefault();
            document.getElementById('filterServiceId').value = 'all';
            localState.filterServiceId = 'all';
            filterAndRenderProfessionals();
            return;
        }

        // --- 4. Aplicar Filtros ---
        if (e.target.id === 'apply-filter-btn') {
            e.preventDefault();
            localState.filterServiceId = document.getElementById('filterServiceId').value;
            filterAndRenderProfessionals();
            return;
        }

        // --- 5. Toggle Filtros Avançados ---
        const toggleFilterBtn = e.target.closest('#toggle-filter-btn');
        if (toggleFilterBtn) {
            e.preventDefault();
            localState.isAdvancedFilterOpen = !localState.isAdvancedFilterOpen;
            // Para manter a UI reativa, atualizamos a classe manualmento ao invés de re-renderizar a base layout inteira
            const filterPanel = document.getElementById('filter-panel');
            if(localState.isAdvancedFilterOpen) {
                filterPanel.classList.remove('hidden');
                filterPanel.classList.add('block');
                toggleFilterBtn.classList.add('bg-indigo-50', 'text-indigo-700', 'border-indigo-200');
            } else {
                filterPanel.classList.add('hidden');
                filterPanel.classList.remove('block');
                toggleFilterBtn.classList.remove('bg-indigo-50', 'text-indigo-700', 'border-indigo-200');
            }
            return;
        }

        // --- 6. Eventos com Data-Action ---
        const button = e.target.closest('[data-action]');
        if (!button) {
            // Fechar modal clicando no backdrop escuro
            if(e.target.id === 'professionals-layout-detail') {
                 hideMobileDetail();
            }
            return;
        }
        
        const action = button.dataset.action;

        // Prevenir fechamento inesperado e propagação
        if (['close-detail-screen', 'delete-professional', 'save-professional', 'delete-blockage', 'batch-delete-blockage'].includes(action)) {
            e.stopPropagation();
        }

        switch(action) {
            case 'open-professional-editor':
                openProfessionalEditor(button.dataset.id);
                break;
                
            case 'close-detail-screen':
                hideMobileDetail();
                localState.tempProf = null;
                break;
                
            case 'batch-delete':
                handleBatchDelete();
                break;

            case 'delete-professional': {
                const idToDelete = button.dataset.id;
                const profName = localState.tempProf?.name || 'Profissional';
                const confirmed = await showConfirmation('Excluir Profissional', `Tem certeza que deseja excluir ${profName}? Esta ação não pode ser desfeita.`);
                if(confirmed) {
                    try {
                        await professionalsApi.deleteProfessional(idToDelete);
                        logAction(state.establishmentId, getCurrentUserForLog(), 'Equipe', 'Excluiu', `Excluiu profissional: ${profName}`);
                        showNotification('Sucesso!', 'Profissional excluído da rede.', 'success');
                        hideMobileDetail();
                        fetchAndDisplayData(); 
                    } catch (error) {
                         showNotification('Erro', `Não foi possível excluir: ${error.message}`, 'error');
                    }
                }
                break;
            }

            case 'save-professional': {
                const modalInner = document.getElementById('prof-modal-inner');
                const saveButton = button;
                
                const scheduleContainer = modalInner.querySelector('#profScheduleContainer');
                const selectedServices = Array.from(modalInner.querySelectorAll('#profServicesContainer input[type="checkbox"]:checked')).map(cb => cb.value);
                
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

                const checkedUnits = Array.from(modalInner.querySelectorAll('input[name="accessibleIn"]:checked')).map(cb => cb.value);
                const accessibleIn = checkedUnits.length > 0 ? checkedUnits : [state.establishmentId];

                const isActive = modalInner.querySelector('#profStatusToggle').checked;
                const receivesCommission = modalInner.querySelector('#profCommissionToggle').checked;
                const showOnAgenda = modalInner.querySelector('#profShowOnAgendaToggle').checked;

                const professionalData = {
                    ...localState.tempProf,
                    id: modalInner.querySelector('#professionalId').value || undefined, 
                    accessibleIn: accessibleIn,
                    name: modalInner.querySelector('#profName').value.trim(),
                    specialty: modalInner.querySelector('#profSpecialty').value,
                    photo: modalInner.querySelector('#profPhotoBase64').value,
                    services: selectedServices,
                    workingHours: workingHours,
                    phone: modalInner.querySelector('#profPhone').value,
                    dob: `${modalInner.querySelector('#profDobDay').value}/${modalInner.querySelector('#profDobMonth').value}`,
                    receivesCommission: receivesCommission, 
                    showOnAgenda: showOnAgenda, 
                    orderOnAgenda: parseInt(modalInner.querySelector('#profOrderOnAgenda').value) || 1,
                    notes: modalInner.querySelector('#profNotes').value,
                    status: isActive ? 'active' : 'inactive', 
                    establishmentId: state.establishmentId
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
                    
                    hideMobileDetail();
                    fetchAndDisplayData(); 
                } catch (error) {
                    showNotification('Erro', error.message, 'error');
                    saveButton.disabled = false;
                    saveButton.innerHTML = originalText;
                }
                break;
            }

            case 'delete-blockage': {
                const blockageId = button.dataset.id;
                if (await showConfirmation('Apagar Bloqueio', 'O profissional voltará a ficar disponível na agenda neste dia. Confirma?')) {
                    try {
                        await blockagesApi.deleteBlockage(blockageId);
                        showNotification('Bloqueio removido.', 'success');
                        const currentFilter = document.getElementById('prof-blockages-filter') ? document.getElementById('prof-blockages-filter').value : 'future';
                        fetchAndRenderBlockages(localState.tempProf.id, currentFilter);
                    } catch (error) {
                        showNotification('Erro', error.message, 'error');
                    }
                }
                break;
            }

            case 'batch-delete-blockage': {
                const ids = JSON.parse(button.dataset.ids);
                if (await showConfirmation('Apagar em Lote', `Tem certeza que deseja apagar ${ids.length} dias de bloqueio de uma vez?`)) {
                    try {
                        await blockagesApi.batchDeleteBlockages(ids);
                        showNotification('Bloqueios removidos.', 'success');
                        const currentFilter = document.getElementById('prof-blockages-filter') ? document.getElementById('prof-blockages-filter').value : 'future';
                        fetchAndRenderBlockages(localState.tempProf.id, currentFilter);
                    } catch (error) {
                        showNotification('Erro', error.message, 'error');
                    }
                }
                break;
            }
        }
    };

    document.body.addEventListener('click', pageEventListener);

    pageInputListener = (e) => {
        if (e.target.id === 'searchInput') {
            localState.searchQuery = e.target.value;
            filterAndRenderProfessionals();
        }
    };
    contentDiv.addEventListener('input', pageInputListener);
}

function handleBatchDelete() {
    showConfirmation('Excluir em Lote', `Tem certeza que deseja excluir ${localState.selectedIds.size} profissionais da rede? Esta ação não pode ser desfeita.`)
        .then(async (confirmed) => {
            if (confirmed) {
                try {
                    await professionalsApi.batchDeleteProfessionals(Array.from(localState.selectedIds));
                    logAction(state.establishmentId, getCurrentUserForLog(), 'Equipe', 'Excluiu em Lote', `Excluiu ${localState.selectedIds.size} profissionais`);
                    showNotification('Sucesso!', `${localState.selectedIds.size} profissionais foram excluídos.`, 'success');
                    
                    localState.selectedIds.clear();
                    updateBatchActionBar();
                    fetchAndDisplayData();
                } catch (error) {
                    showNotification('Erro', `Não foi possível excluir em lote: ${error.message}`, 'error');
                }
            }
        });
}