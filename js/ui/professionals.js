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
    professionals: [],
    services: [],
    hierarchyCache: [],
    
    // Filtros
    statusFilter: 'all',
    searchQuery: '',
    filterServiceId: 'all',
    isAdvancedFilterOpen: false,
    
    selectedIds: new Set()
};

let pageEventListener = null;
let modalEventListener = null;

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

// --- 3. RENDERIZAÇÃO DO LAYOUT PRINCIPAL ---

export async function loadProfessionalsPage() {
    localState.selectedIds.clear();
    
    try {
        // Mantemos a busca da hierarquia APENAS para usar no Modal de Cadastro
        const payload = await getHierarchy();
        localState.hierarchyCache = payload.matrizes || [];
    } catch (e) { console.warn("Erro ao buscar lojas", e); }

    renderBaseLayout();
    setupEventListeners();
    await fetchAndDisplayData();
}

function renderBaseLayout() {
    contentDiv.innerHTML = `
        <section class="h-full flex flex-col p-2 md:p-4 md:pl-6 w-full relative">
            
            <div id="batch-action-bar" class="hidden absolute top-4 left-4 right-4 z-30 bg-gray-900 text-white rounded-xl shadow-2xl p-2.5 items-center justify-between animate-fade-in-down">
                <div class="flex items-center gap-3">
                    <button id="cancel-selection-btn" class="p-1.5 hover:bg-gray-700 rounded-full transition-colors text-gray-300 hover:text-white">
                        <i class="bi bi-x-lg text-lg"></i>
                    </button>
                    <span class="font-bold text-sm tracking-wide"><span id="selected-count" class="text-indigo-400">0</span> Selecionados</span>
                </div>
                <button id="batch-delete-btn" class="flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg text-sm">
                    <i class="bi bi-trash3"></i> Excluir
                </button>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-center mb-3 gap-3 w-full">
                <div class="flex bg-gray-200/80 p-1 rounded-xl border border-gray-300 w-full md:w-auto shadow-inner hidden md:flex opacity-0 pointer-events-none">
                    <button class="flex-1 md:w-32 py-1.5 text-xs font-bold rounded-lg transition-all flex justify-center items-center gap-2">Space</button>
                </div>

                <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end ml-auto">
                    <button data-action="open-professional-modal" data-professional="{}" class="py-1.5 px-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-sm flex items-center gap-2 text-xs flex-1 md:flex-none justify-center">
                        <i class="bi bi-person-plus-fill text-sm"></i> Novo Profissional
                    </button>
                </div>
            </div>

            <div id="summary-section" class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                </div>

            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2 w-full">
                <div class="flex gap-2 overflow-x-auto pb-1 w-full md:w-auto custom-scrollbar">
                    <button data-status="all" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${localState.statusFilter === 'all' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-white text-gray-600 hover:bg-gray-50'}">Todos</button>
                    <button data-status="active" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${localState.statusFilter === 'active' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-white text-gray-600 hover:bg-gray-50'}">Ativos</button>
                    <button data-status="inactive" class="status-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 transition whitespace-nowrap ${localState.statusFilter === 'inactive' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-white text-gray-600 hover:bg-gray-50'}">Inativos</button>
                </div>

                <div class="flex items-center gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-1 md:pb-0">
                    <div class="relative flex-shrink-0 w-full md:w-64">
                        <i class="bi bi-search absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                        <input type="text" id="searchInput" value="${localState.searchQuery}" placeholder="Nome ou especialidade..." class="w-full pl-8 p-1.5 bg-white border border-gray-200 shadow-sm rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 outline-none transition-all">
                    </div>
                    <button id="toggle-filter-btn" class="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition shadow-sm flex items-center gap-1.5 text-xs flex-shrink-0 ${localState.isAdvancedFilterOpen ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : ''}">
                        <i class="bi bi-funnel"></i> Filtros
                    </button>
                </div>
            </div>

            <div id="filter-panel" class="${localState.isAdvancedFilterOpen ? 'block' : 'hidden'} mb-3 bg-white p-3 rounded-xl border border-gray-200 shadow-sm animate-fade-in">
                <div class="flex flex-col md:flex-row items-end gap-3">
                    <div class="w-full md:w-64">
                        <label class="block text-[9px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Serviço Habilitado</label>
                        <select id="filterServiceId" class="w-full p-2 border border-gray-200 rounded-lg text-xs bg-gray-50 focus:bg-white outline-none focus:ring-1 focus:ring-indigo-500">
                            <option value="all">Todos os serviços</option>
                        </select>
                    </div>

                    <div class="flex gap-2 w-full md:w-auto">
                        <button id="clear-filters-btn" class="w-full md:w-auto px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors text-xs">Limpar</button>
                        <button id="apply-filter-btn" class="w-full md:w-auto px-5 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-sm hover:bg-indigo-700 active:scale-95 transition-all text-xs">
                            Aplicar
                        </button>
                    </div>
                </div>
            </div>

            <div id="professionalsList" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20 mt-1 flex-1 content-start overflow-y-auto custom-scrollbar pr-1">
                ${renderSkeletonList(8)}
            </div>

            <button data-action="open-professional-modal" data-professional="{}" class="md:hidden fixed bottom-20 right-4 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all z-40">
                <i class="bi bi-plus-lg text-xl"></i>
            </button>
        </section>
    `;
}

function setupEventListeners() {
    // Escuta o Botão de "Aplicar Visualização" do Cabeçalho Global
    const globalApplyBtn = document.getElementById('multi-context-apply');
    if (globalApplyBtn) {
        // Previne duplicação de eventos
        globalApplyBtn.removeEventListener('click', fetchAndDisplayData);
        globalApplyBtn.addEventListener('click', () => {
            // Agora forçamos o recarregamento total (busca no BD) das lojas selecionadas
            setTimeout(fetchAndDisplayData, 100);
        });
    }

    // Filtros de Status (Abas Estilo Financeiro)
    document.querySelectorAll('.status-filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const status = e.target.dataset.status;
            localState.statusFilter = status;
            
            document.querySelectorAll('.status-filter-btn').forEach(b => {
                b.classList.remove('bg-indigo-50', 'text-indigo-700', 'border-indigo-200', 'bg-red-50', 'text-red-700', 'border-red-200');
                b.classList.add('bg-white', 'text-gray-600', 'border-gray-200');
            });
            
            if (status === 'inactive') {
                e.target.classList.add('bg-red-50', 'text-red-700', 'border-red-200');
            } else {
                e.target.classList.add('bg-indigo-50', 'text-indigo-700', 'border-indigo-200');
            }
            e.target.classList.remove('bg-white', 'text-gray-600', 'border-gray-200');
            
            filterAndRenderProfessionals();
        });
    });

    // Toggle Filtros Avançados
    const toggleFilterBtn = document.getElementById('toggle-filter-btn');
    if (toggleFilterBtn) {
        toggleFilterBtn.addEventListener('click', () => {
            const panel = document.getElementById('filter-panel');
            localState.isAdvancedFilterOpen = !localState.isAdvancedFilterOpen;
            
            if (localState.isAdvancedFilterOpen) {
                panel.classList.remove('hidden');
                toggleFilterBtn.classList.add('bg-indigo-50', 'text-indigo-700', 'border-indigo-200');
                toggleFilterBtn.classList.remove('bg-white', 'text-gray-600', 'border-gray-200');
            } else {
                panel.classList.add('hidden');
                toggleFilterBtn.classList.remove('bg-indigo-50', 'text-indigo-700', 'border-indigo-200');
                toggleFilterBtn.classList.add('bg-white', 'text-gray-600', 'border-gray-200');
            }
        });
    }

    // Input de Busca
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            localState.searchQuery = e.target.value.toLowerCase();
            filterAndRenderProfessionals();
        });
    }

    // Botões Limpar e Aplicar
    const clearBtn = document.getElementById('clear-filters-btn');
    if(clearBtn) {
        clearBtn.addEventListener('click', () => {
            localState.filterServiceId = 'all';
            document.getElementById('filterServiceId').value = 'all';
            filterAndRenderProfessionals();
        });
    }

    const applyBtn = document.getElementById('apply-filter-btn');
    if(applyBtn) {
        applyBtn.addEventListener('click', () => {
            localState.filterServiceId = document.getElementById('filterServiceId').value;
            document.getElementById('toggle-filter-btn').click(); // Fecha painel
            filterAndRenderProfessionals();
        });
    }

    // Delegação de Eventos (Cards, Modais, Ações em Lote)
    if (pageEventListener) contentDiv.removeEventListener('click', pageEventListener);
    
    pageEventListener = e => {
        const cardOrBtn = e.target.closest('[data-action="open-professional-modal"]');
        if (cardOrBtn) {
            e.preventDefault();
            let profData = {};
            if (cardOrBtn.dataset.professional) {
                try { profData = JSON.parse(cardOrBtn.dataset.professional); } catch (err) {}
            }
            openProfessionalModal(profData);
            return;
        }

        const checkbox = e.target.closest('.professional-checkbox');
        if (checkbox) {
             const id = checkbox.dataset.id;
             if (checkbox.checked) localState.selectedIds.add(id); 
             else localState.selectedIds.delete(id);
             
             updateBatchActionBar();
             e.stopPropagation();
             return;
        }

        const cancelSelectionBtn = e.target.closest('#cancel-selection-btn');
        if (cancelSelectionBtn) {
            localState.selectedIds.clear();
            document.querySelectorAll('.professional-checkbox').forEach(cb => cb.checked = false);
            updateBatchActionBar();
            return;
        }

        const batchDeleteBtn = e.target.closest('#batch-delete-btn');
        if (batchDeleteBtn) {
            handleBatchDelete();
            return;
        }
    };
    
    contentDiv.addEventListener('click', pageEventListener);
}

// --- 4. COMUNICAÇÃO DE DADOS E RENDERIZAÇÃO DA LISTA ---

async function fetchAndDisplayData() {
    const listDiv = document.getElementById('professionalsList');
    const activeHeaderEstablishments = getActiveEstablishmentsFromHeader();
    
    try {
        // Busca profissionais e serviços em paralelo para TODAS as unidades selecionadas no cabeçalho
        const profPromises = activeHeaderEstablishments.map(id => professionalsApi.getProfessionals(id));
        const servPromises = activeHeaderEstablishments.map(id => servicesApi.getServices(id));
        
        const profResults = await Promise.all(profPromises);
        const servResults = await Promise.all(servPromises);
        
        // Mescla e remove duplicatas (caso um profissional atenda em mais de uma loja selecionada)
        const profMap = new Map();
        profResults.flat().forEach(p => profMap.set(p.id, p));
        localState.professionals = Array.from(profMap.values());
        state.professionals = localState.professionals;
        
        // Mescla e remove duplicatas de serviços
        const servMap = new Map();
        servResults.flat().forEach(s => servMap.set(s.id, s));
        localState.services = Array.from(servMap.values());
        
        populateServiceFilter();
        filterAndRenderProfessionals(); 
        
    } catch (error) {
        console.error(error);
        listDiv.innerHTML = '<div class="col-span-full py-16 text-center"><p class="text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-100 inline-block text-sm"><i class="bi bi-exclamation-triangle"></i> Erro ao carregar dados do servidor.</p></div>';
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

    // Calcula baseado nos profissionais que as empresas SELECIONADAS NO TOPO têm
    const total = filteredList.length;
    const ativos = filteredList.filter(p => p.status !== 'inactive').length;
    const inativos = total - ativos;

    section.innerHTML = `
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Membros na Unidade</span>
            <span class="text-xl font-black text-gray-800 mt-0.5">${total}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ativos</span>
            <span class="text-xl font-bold text-emerald-600 mt-0.5">${ativos}</span>
        </div>
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Inativos</span>
            <span class="text-xl font-bold text-red-500 mt-0.5">${inativos}</span>
        </div>
        <div class="bg-indigo-50 p-3 rounded-xl border border-indigo-100 shadow-sm flex flex-col">
            <span class="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Filtrados / Exibidos</span>
            <span class="text-xl font-bold text-indigo-700 mt-0.5">${filteredList.length}</span>
        </div>
    `;
}

function filterAndRenderProfessionals() {
    const listDiv = document.getElementById('professionalsList');
    if (!listDiv) return;

    if (!localState.professionals || localState.professionals.length === 0) {
        listDiv.innerHTML = renderSkeletonList(8); 
        return;
    }

    // Pega as empresas marcadas na chave seletora global do topo
    const activeHeaderEstablishments = getActiveEstablishmentsFromHeader();
    
    const filtered = localState.professionals.filter(p => {
        // Texto (Nome / Especialidade)
        const matchesSearch = p.name.toLowerCase().includes(localState.searchQuery) || (p.specialty && p.specialty.toLowerCase().includes(localState.searchQuery));
        
        // Status
        let matchesStatus = true;
        if(localState.statusFilter === 'active') matchesStatus = p.status !== 'inactive';
        if(localState.statusFilter === 'inactive') matchesStatus = p.status === 'inactive';
        
        // Serviço
        const matchesService = localState.filterServiceId === "all" || (p.services && p.services.includes(localState.filterServiceId));
        
        // Integração Multi-Loja: Verifica se o profissional tem acesso a pelo menos UMA das lojas selecionadas no topo
        const pUnits = p.accessibleIn && p.accessibleIn.length > 0 ? p.accessibleIn : [p.establishmentId || state.establishmentId];
        const matchesBranch = activeHeaderEstablishments.some(id => pUnits.includes(id));

        return matchesSearch && matchesStatus && matchesService && matchesBranch;
    });
    
    renderKPIs(filtered);
    listDiv.innerHTML = renderProfessionalsListHTML(filtered);
}

// --- RENDERS DE COMPONENTES ---

function renderSkeletonList(count = 8) {
    let skeletonHTML = '';
    for (let i = 0; i < count; i++) {
        skeletonHTML += `
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm flex items-center p-3 animate-pulse h-[74px]">
            <div class="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 mr-3"></div>
            <div class="flex-1 space-y-2">
                <div class="h-2.5 bg-gray-200 rounded w-3/4"></div>
                <div class="h-2 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        `;
    }
    return skeletonHTML;
}

function renderProfessionalsListHTML(professionals) {
    if (professionals.length === 0) {
        return `
            <div class="col-span-full flex flex-col items-center justify-center py-16">
                <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <i class="bi bi-people text-xl text-gray-300"></i>
                </div>
                <h3 class="text-sm font-bold text-gray-600 mb-1">Nenhum profissional encontrado</h3>
                <p class="text-[10px] text-gray-400">Tente ajustar os filtros ou verificar as unidades no topo.</p>
            </div>
        `;
    }

    return professionals.map(prof => {
        const isInactive = prof.status === 'inactive';
        const safeName = escapeHTML(prof.name);
        const safeSpecialty = escapeHTML(prof.specialty || 'Especialidade');
        
        const photoSrc = prof.photo || `https://placehold.co/100x100/E2E8F0/4A5568?text=${encodeURIComponent(prof.name ? prof.name.charAt(0) : 'P')}`;
        const profDataString = JSON.stringify(prof).replace(/'/g, "&apos;");

        const unitCount = prof.accessibleIn ? prof.accessibleIn.length : 1;
        const serviceCount = prof.services ? prof.services.length : 0;
        const isSelected = localState.selectedIds.has(prof.id);

        return `
            <div class="professional-card relative bg-white rounded-xl border ${isSelected ? 'border-indigo-400 ring-1 ring-indigo-200 shadow-md bg-indigo-50/20' : 'border-gray-200'} shadow-sm flex items-center p-3 cursor-pointer transition-all hover:shadow-md hover:border-indigo-300 ${isInactive ? 'opacity-60 bg-gray-50' : ''}" 
                 data-action="open-professional-modal" data-professional='${profDataString}'>
                
                <div class="absolute top-2 right-2 z-10 flex flex-col gap-2 items-center" onclick="event.stopPropagation()">
                    <input type="checkbox" data-id="${prof.id}" class="professional-checkbox w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm" ${isSelected ? 'checked' : ''}>
                </div>

                <div class="relative flex-shrink-0 mr-3">
                    <img src="${photoSrc}" alt="${safeName}" class="w-12 h-12 rounded-full object-cover border border-gray-100 shadow-sm">
                    <span class="absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white rounded-full ${isInactive ? 'bg-red-500' : 'bg-emerald-500'}" title="${isInactive ? 'Inativo' : 'Ativo'}"></span>
                </div>
                
                <div class="flex-1 min-w-0 pr-4">
                    <h3 class="text-xs font-bold text-gray-800 truncate leading-tight">
                        ${safeName}
                    </h3>
                    <p class="text-[10px] text-gray-500 truncate mt-0.5">${safeSpecialty}</p>
                    
                    <div class="flex items-center gap-1 mt-1.5">
                        ${unitCount > 1 
                            ? `<span class="text-[8px] font-bold bg-indigo-50 text-indigo-700 px-1 py-0.5 rounded border border-indigo-100 flex items-center gap-1"><i class="bi bi-diagram-3"></i> ${unitCount}</span>` 
                            : `<span class="text-[8px] font-bold bg-gray-100 text-gray-600 px-1 py-0.5 rounded border border-gray-200 flex items-center gap-1"><i class="bi bi-geo-alt"></i> Única</span>`
                        }
                        <span class="text-[8px] font-semibold text-gray-600 bg-gray-100 px-1 py-0.5 rounded border border-gray-200 flex items-center gap-1" title="${serviceCount} serviços habilitados"><i class="bi bi-scissors"></i> ${serviceCount}</span>
                    </div>
                </div>
            </div>`;
    }).join('');
}


// --- 5. LÓGICA DE MODAIS E FORMULÁRIOS ---

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

    const modalHTML = `
        <div class="modal-content max-w-5xl p-0 overflow-hidden flex flex-col max-h-[90vh]"> 
            <div class="modal-header px-6 py-4 flex justify-between items-center border-b bg-white flex-shrink-0">
                <h2 class="text-2xl font-bold text-gray-800">${safeTitle}</h2>
                <button data-action="close-modal" class="text-gray-400 hover:text-red-500 transition-colors text-3xl leading-none">&times;</button>
            </div>
            
            <div class="modal-tabs px-6 border-b flex items-center overflow-x-auto bg-gray-50 flex-shrink-0 custom-scrollbar">
                <button class="tab-link active whitespace-nowrap font-semibold py-3 px-4 border-b-2 border-indigo-600 text-indigo-600 transition-colors" data-tab="dados-basicos">1. Dados Básicos</button>
                <button class="tab-link whitespace-nowrap font-semibold py-3 px-4 border-b-2 border-transparent text-gray-500 hover:text-indigo-500 transition-colors" data-tab="atuacao">2. Atuação (Rede & Serviços)</button>
                <button class="tab-link whitespace-nowrap font-semibold py-3 px-4 border-b-2 border-transparent text-gray-500 hover:text-indigo-500 transition-colors" data-tab="jornada">3. Jornada Semanal</button>
                <button class="tab-link whitespace-nowrap font-semibold py-3 px-4 border-b-2 border-transparent text-gray-500 hover:text-indigo-500 transition-colors" data-tab="bloqueios">4. Bloqueios e Férias</button>
            </div>
            
            <div class="modal-body p-6 bg-white flex-1 overflow-y-auto custom-scrollbar relative"> 
                <form id="professionalForm" class="h-full">
                    <input type="hidden" id="professionalId" value="${prof.id || ''}">
                    <input type="hidden" id="profPhotoBase64" value="${prof.photo || ''}">
                    
                    <div id="dados-basicos" class="tab-content active space-y-6"></div>
                    <div id="atuacao" class="tab-content hidden space-y-6"></div>
                </form>
                
                <div id="jornada" class="tab-content hidden"></div>
                <div id="bloqueios" class="tab-content hidden"></div>
            </div>
            
            <div class="modal-footer px-6 py-4 bg-gray-50 border-t flex justify-between items-center flex-shrink-0">
                <button type="button" data-action="delete-professional" data-id="${prof.id || ''}" class="text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg font-medium transition-colors ${prof.id ? '' : 'hidden'}" title="Excluir Profissional">
                    <i class="bi bi-trash3 mr-1"></i> Excluir
                </button>

                <div class="flex gap-3 ml-auto">
                    <button data-action="close-modal" class="py-2.5 px-5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 shadow-sm transition-colors">Cancelar</button>
                    <button type="button" data-action="save-professional" class="py-2.5 px-6 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-sm flex items-center gap-2 transition-colors">
                        <i class="bi bi-save"></i> Salvar
                    </button>
                </div>
            </div>
        </div>`;

    modal.innerHTML = modalHTML;
    modal.style.display = 'flex';

    fillCadastroTab(prof, localState.services);
    fillJornadaTab(prof);
    fillBloqueiosTab(prof, localState.professionals);

    setupModalEventListeners(prof);
}

// Checkboxes de Unidade apenas para o Modal de Atribuição (Criar/Editar Profissional)
function generateUnitCheckboxesHTML(selectedIds = []) {
    if (!localState.hierarchyCache || localState.hierarchyCache.length === 0) {
        return `
            <input type="hidden" name="accessibleIn" value="${state.establishmentId}">
            <div class="bg-gray-50 p-3 rounded border text-sm text-gray-500">
                <i class="bi bi-info-circle mr-1"></i> Exclusivo desta unidade.
            </div>`;
    }

    let html = '<div class="space-y-1 mt-2 max-h-48 overflow-y-auto p-3 border border-indigo-100 rounded-lg bg-indigo-50/30 custom-scrollbar">';
    
    localState.hierarchyCache.forEach(matriz => {
        const isMatrizSelected = selectedIds.includes(matriz.id) || (selectedIds.length === 0 && matriz.id === state.establishmentId);
        html += `
            <label class="flex items-center space-x-3 py-1.5 cursor-pointer hover:bg-white rounded px-2 transition-colors">
                <input type="checkbox" name="accessibleIn" value="${matriz.id}" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${isMatrizSelected ? 'checked' : ''}>
                <span class="text-sm font-bold text-gray-800">🏢 ${escapeHTML(matriz.name)}</span>
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
    const dadosBasicosContainer = document.getElementById('dados-basicos');
    const atuacaoContainer = document.getElementById('atuacao');
    
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
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="md:col-span-1 space-y-4">
                <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                    <label class="block text-sm font-bold text-gray-700 mb-3">Foto de Perfil</label>
                    <div class="relative group mx-auto w-32 h-32 mb-4 cursor-pointer" id="profPhotoContainer">
                        <img id="profPhotoPreview" src="${prof.photo || `https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(prof.name ? prof.name.charAt(0) : 'P')}`}" alt="Foto de Perfil" class="w-32 h-32 rounded-full object-cover border-4 border-gray-50 shadow-md transition-all group-hover:brightness-75">
                        <div id="profPhotoButtonOverlay" class="absolute inset-0 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                            <i class="bi bi-camera-fill text-white text-3xl drop-shadow-md"></i>
                        </div>
                    </div>
                    <input type="file" id="profPhotoInput" class="hidden" accept="image/*">
                    <button type="button" id="profPhotoButton" class="text-indigo-600 text-sm font-semibold hover:text-indigo-800 transition-colors w-full">Alterar Imagem</button>
                </div>

                 <div class="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between">
                    <div>
                        <p class="text-sm font-bold text-gray-700">Status do Perfil</p>
                        <p class="text-xs text-gray-500">Inativos não aparecem na agenda.</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" id="profStatusToggle" class="sr-only peer" ${prof.status !== 'inactive' ? 'checked' : ''}>
                        <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                </div>
            </div>

            <div class="md:col-span-2 space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="form-group sm:col-span-2">
                        <label for="profName" class="block text-sm font-medium text-gray-700 mb-1">Nome Completo <span class="text-red-500">*</span></label>
                        <input type="text" id="profName" value="${safeName}" required class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors">
                    </div>
                    <div class="form-group">
                        <label for="profSpecialty" class="block text-sm font-medium text-gray-700 mb-1">Especialidade / Cargo <span class="text-red-500">*</span></label>
                        <input type="text" id="profSpecialty" value="${safeSpecialty}" required placeholder="Ex: Cabeleireiro, Médico" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors">
                    </div>
                    <div class="form-group">
                        <label for="profPhone" class="block text-sm font-medium text-gray-700 mb-1">WhatsApp / Telefone</label>
                        <input type="tel" id="profPhone" value="${safePhone}" placeholder="(00) 00000-0000" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors">
                    </div>
                    <div class="form-group">
                        <label for="profDobDay" class="block text-sm font-medium text-gray-700 mb-1">Aniversário (Dia)</label>
                        <input type="number" id="profDobDay" value="${dob[0]}" min="1" max="31" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors">
                    </div>
                    <div class="form-group">
                        <label for="profDobMonth" class="block text-sm font-medium text-gray-700 mb-1">Aniversário (Mês)</label>
                        <select id="profDobMonth" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors">
                            <option value="">Selecione...</option>${monthOptions}
                        </select>
                    </div>
                </div>

                <div class="form-group pt-2">
                    <label for="profNotes" class="block text-sm font-medium text-gray-700 mb-1">Observações Internas (Apenas Gestão)</label>
                    <textarea id="profNotes" rows="3" class="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-colors placeholder-gray-400" placeholder="Ex: Informações contratuais, detalhes de preferência...">${safeNotes}</textarea>
                </div>
            </div>
        </div>
    `;

    atuacaoContainer.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div class="flex items-center justify-between border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 md:pr-4">
                <div>
                    <p class="text-sm font-bold text-gray-800">Paga Comissão?</p>
                    <p class="text-[11px] text-gray-500 leading-tight mt-1">Gera comissão ao realizar serviços.</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer ml-3">
                    <input type="checkbox" id="profCommissionToggle" class="sr-only peer" ${prof.receivesCommission !== false ? 'checked' : ''}>
                    <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
            </div>

            <div class="flex items-center justify-between border-b md:border-b-0 md:border-r border-gray-100 py-4 md:py-0 md:px-4">
                <div>
                    <p class="text-sm font-bold text-gray-800">Exibir no App</p>
                    <p class="text-[11px] text-gray-500 leading-tight mt-1">Clientes podem agendar online.</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer ml-3">
                    <input type="checkbox" id="profShowOnAgendaToggle" class="sr-only peer" ${prof.showOnAgenda !== false ? 'checked' : ''}>
                    <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
            </div>

            <div class="pt-4 md:pt-0 md:pl-4">
                <label for="profOrderOnAgenda" class="block text-sm font-bold text-gray-800 mb-1">Ordem na Agenda</label>
                <div class="flex items-center gap-2">
                    <input type="number" id="profOrderOnAgenda" value="${prof.orderOnAgenda || '1'}" min="1" class="w-20 p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-center bg-gray-50 focus:bg-white">
                    <span class="text-[11px] text-gray-500 leading-tight">Posição na visualização diária.</span>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <div class="flex items-center mb-3 text-indigo-900">
                    <div class="bg-indigo-100 p-2 rounded-lg mr-3"><i class="bi bi-diagram-3 text-lg"></i></div>
                    <div>
                        <h3 class="text-base font-bold">Lojas de Atendimento</h3>
                        <p class="text-xs text-gray-500">Unidades onde este membro atende.</p>
                    </div>
                </div>
                ${generateUnitCheckboxesHTML(prof.accessibleIn || [])}
            </div>

            <div>
                <div class="flex justify-between items-end mb-3">
                    <div class="flex items-center text-emerald-900">
                        <div class="bg-emerald-100 p-2 rounded-lg mr-3"><i class="bi bi-scissors text-lg"></i></div>
                        <div>
                            <h3 class="text-base font-bold">Serviços Habilitados</h3>
                            <p class="text-xs text-gray-500">O que este profissional faz.</p>
                        </div>
                    </div>
                    <button type="button" id="selectAllServicesBtn" class="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-1.5 rounded-md transition-colors">
                        Selecionar Todos
                    </button>
                </div>
                
                <div id="profServicesContainer" class="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 border border-gray-200 rounded-xl bg-gray-50 max-h-40 overflow-y-auto custom-scrollbar">
                    ${services.map(s => `
                        <label class="flex items-center space-x-3 p-2.5 bg-white rounded-lg cursor-pointer transition-colors border border-gray-100 hover:border-indigo-300 hover:shadow-sm">
                            <input type="checkbox" value="${s.id}" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4" ${prof.services?.includes(s.id) ? 'checked' : ''}>
                            <span class="text-sm font-medium text-gray-700 truncate" title="${escapeHTML(s.name)}">${escapeHTML(s.name)}</span>
                        </label>
                    `).join('')}
                    ${services.length === 0 ? '<p class="col-span-full text-center text-sm text-gray-500 py-4">Nenhum serviço cadastrado no sistema.</p>' : ''}
                </div>
            </div>
        </div>
    `;

    const selectAllBtn = document.getElementById('selectAllServicesBtn');
    if(selectAllBtn) {
        selectAllBtn.addEventListener('click', () => {
            const checkboxes = document.querySelectorAll('#profServicesContainer input[type="checkbox"]');
            const allChecked = Array.from(checkboxes).every(cb => cb.checked);
            checkboxes.forEach(cb => { cb.checked = !allChecked; });
            selectAllBtn.textContent = allChecked ? "Selecionar Todos" : "Desmarcar Todos";
        });
        
        const checkboxes = document.querySelectorAll('#profServicesContainer input[type="checkbox"]');
        if(checkboxes.length > 0 && Array.from(checkboxes).every(cb => cb.checked)) {
            selectAllBtn.textContent = "Desmarcar Todos";
        }
    }

    const photoInput = document.getElementById('profPhotoInput');
    const photoButton = document.getElementById('profPhotoButton');
    const photoContainer = document.getElementById('profPhotoContainer');
    const photoPreview = document.getElementById('profPhotoPreview');
    const photoBase64Input = document.getElementById('profPhotoBase64');
    const originalPhotoSrc = prof.photo || `https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(prof.name ? prof.name.charAt(0) : 'P')}`;
    const originalBase64 = prof.photo || '';

    const triggerFileInput = () => photoInput.click();
    if (photoButton) photoButton.addEventListener('click', triggerFileInput);
    if (photoContainer) photoContainer.addEventListener('click', triggerFileInput);

    if (photoInput) {
        photoInput.onchange = async () => {
             const file = photoInput.files[0];
             if (!file) return;
             photoPreview.src = 'https://placehold.co/128x128/E2E8F0/4A5568?text=...';
             
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
                        <div id="batchProfSelectionContainer" class="max-h-40 overflow-y-auto custom-scrollbar p-3 border border-orange-200 rounded-lg bg-white space-y-2 shadow-sm">
                            ${allProfessionals.map(p => `
                                <label class="flex items-center space-x-3 hover:bg-orange-50 p-1 rounded cursor-pointer transition-colors">
                                    <input type="checkbox" name="batch-professionals" value="${p.id}" class="rounded border-gray-300 text-orange-500 focus:ring-orange-500" ${p.id === prof.id ? 'checked' : ''}>
                                    <span class="text-sm font-medium text-gray-700">${escapeHTML(p.name)}</span>
                                </label>`).join('')}
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div><label for="batchBlockageStartDate" class="block text-sm font-medium text-gray-700 mb-1">Data Início</label><input type="date" id="batchBlockageStartDate" required class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"></div>
                        <div><label for="batchBlockageEndDate" class="block text-sm font-medium text-gray-700 mb-1">Data Fim (Opcional)</label><input type="date" id="batchBlockageEndDate" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"></div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="block text-sm font-medium text-gray-700 mb-1">Início</label><input type="time" id="batchBlockageStartTime" required class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"></div>
                        <div><label class="block text-sm font-medium text-gray-700 mb-1">Fim</label><input type="time" id="batchBlockageEndTime" required class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"></div>
                    </div>
                    <div><label class="block text-sm font-medium text-gray-700 mb-1">Motivo / Descrição</label><input type="text" id="batchBlockageReason" placeholder="Ex: Férias, Médico, Casamento" class="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"></div>
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
                <div id="blockagesList" class="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-2"></div>
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
                const confirmed = await showConfirmation('Excluir Profissional', `Tem certeza que deseja excluir ${professional.name}? Esta ação não pode ser desfeita.`);
                if(confirmed) {
                    try {
                        await professionalsApi.deleteProfessional(idToDelete);
                        logAction(state.establishmentId, getCurrentUserForLog(), 'Equipe', 'Excluiu', `Excluiu profissional: ${professional.name}`);
                        showNotification('Sucesso!', 'Profissional excluído da rede.', 'success');
                        closeProfessionalModal();
                        fetchAndDisplayData(); 
                    } catch (error) {
                         showNotification('Erro', `Não foi possível excluir: ${error.message}`, 'error');
                    }
                }
                break;

            case 'save-professional':
                const form = document.getElementById('professionalForm');
                const saveButton = button;
                
                const scheduleContainer = document.getElementById('profScheduleContainer');
                const selectedServices = Array.from(document.querySelectorAll('#profServicesContainer input[type="checkbox"]:checked')).map(cb => cb.value);
                
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

                const checkedUnits = Array.from(form.querySelectorAll('input[name="accessibleIn"]:checked')).map(cb => cb.value);
                const accessibleIn = checkedUnits.length > 0 ? checkedUnits : [state.establishmentId];

                const isActive = document.getElementById('profStatusToggle').checked;
                const receivesCommission = document.getElementById('profCommissionToggle').checked;
                const showOnAgenda = document.getElementById('profShowOnAgendaToggle').checked;

                const professionalData = {
                    ...professional,
                    id: document.getElementById('professionalId').value || undefined, 
                    accessibleIn: accessibleIn,
                    name: document.getElementById('profName').value.trim(),
                    specialty: document.getElementById('profSpecialty').value,
                    photo: document.getElementById('profPhotoBase64').value,
                    services: selectedServices,
                    workingHours: workingHours,
                    phone: document.getElementById('profPhone').value,
                    dob: `${document.getElementById('profDobDay').value}/${document.getElementById('profDobMonth').value}`,
                    receivesCommission: receivesCommission, 
                    showOnAgenda: showOnAgenda, 
                    orderOnAgenda: parseInt(document.getElementById('profOrderOnAgenda').value) || 1,
                    notes: document.getElementById('profNotes').value,
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
                    
                    closeProfessionalModal();
                    fetchAndDisplayData(); 
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