// js/ui/comandas.js

// --- 1. IMPORTAÇÕES ---
import * as comandasApi from '../api/comandas.js';
import * as salesApi from '../api/sales.js';
import * as appointmentsApi from '../api/appointments.js';
import * as productsApi from '../api/products.js';
import * as servicesApi from '../api/services.js';
import * as clientsApi from '../api/clients.js';
import * as cashierApi from '../api/cashier.js';
import * as packagesApi from '../api/packages.js';
import * as professionalsApi from '../api/professionals.js';
import * as establishmentsApi from '../api/establishments.js';
import * as financialApi from '../api/financial.js';
import { state } from '../state.js';
import { showNotification, showConfirmation, showGenericModal } from '../components/modal.js';
import { navigateTo } from '../main.js';
import { escapeHTML } from '../utils.js';

// --- 2. ESTADO LOCAL DA PÁGINA ---
let localState = {
    allComandas: [],
    catalog: { services: [], products: [], packages: [] },
    activeFilter: 'abertas', 
    selectedComandaId: null,
    viewMode: 'items', 
    isCashierOpen: false,
    activeCashierSessionId: null,
    loyaltySettings: null,
    establishmentConfig: null, 
    pendingRedemption: null,
    paging: {
        page: 1,
        limit: 15,
        total: 0,
    },
    checkoutState: {
        payments: [],
        selectedMethod: 'dinheiro',
        installments: 1,
        amountReceived: '',
        discount: { type: 'real', value: 0 },
        discountReason: ''
    },
    isProcessing: false,
    showHistoryDate: false 
};

let pageEventListener = null;
let contentDiv = null;
let searchDebounceTimeout = null;

// --- 3. FUNÇÕES AUXILIARES ---

function debounce(func, wait) {
    return function(...args) {
        clearTimeout(searchDebounceTimeout);
        searchDebounceTimeout = setTimeout(() => func.apply(this, args), wait);
    };
}

async function executeSaveAction(comanda, nextStep = 'stay') {
    if (!comanda || !comanda.id) return;

    comanda._localUpdatedAt = Date.now();
    comanda._cachedItems = null; 
    comanda._hasUnsavedChanges = false; 

    renderComandaList();

    if (nextStep === 'checkout') {
        localState.viewMode = 'checkout';
        if (!localState.checkoutState.payments) localState.checkoutState.payments = [];
        localState.checkoutState.selectedMethod = 'dinheiro';
        localState.checkoutState.amountReceived = '';
        
        if (!localState.checkoutState.discount.value) {
             localState.checkoutState.discount = { type: 'real', value: 0 };
             localState.checkoutState.discountReason = '';
        }
        
        renderComandaDetail();
    }

    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'saving-overlay';
    loadingOverlay.className = 'fixed inset-0 bg-gray-900/50 z-[9999] flex items-center justify-center backdrop-blur-sm';
    loadingOverlay.innerHTML = `
        <div class="bg-white p-5 rounded-2xl shadow-xl flex flex-col items-center animate-fade-in">
            <div class="loader mb-3"></div>
            <p class="text-gray-800 font-bold text-sm">Sincronizando...</p>
        </div>
    `;
    document.body.appendChild(loadingOverlay);

    try {
        const itemsToSave = (comanda.comandaItems || [])
            .filter(i => i && i.id && String(i.id) !== 'undefined' && String(i.id) !== 'null')
            .map(i => {
                const itemPayload = { ...i };
                itemPayload.id = String(i.id);

                if (itemPayload.type === 'product') {
                    const pid = itemPayload.id;
                    if (!itemPayload.productId) itemPayload.productId = pid;
                    if (!itemPayload.product_id) itemPayload.product_id = pid;
                }
                
                if (itemPayload.type === 'service') {
                    const sid = itemPayload.id;
                    if (!itemPayload.serviceId) itemPayload.serviceId = sid;
                    if (!itemPayload.service_id) itemPayload.service_id = sid;
                }
                
                return itemPayload;
            });

        if (comanda.type === 'walk-in' && String(comanda.id).startsWith('temp-')) {
             // Lógica temporária
        } else {
            await comandasApi.updateComandaItems(comanda.id, itemsToSave);
        }
        
        if(document.body.contains(loadingOverlay)) document.body.removeChild(loadingOverlay);

        if (nextStep !== 'checkout') {
            showNotification('Sucesso', 'Comanda atualizada!', 'success');
            renderComandaDetail();
        }

    } catch (error) {
        if(document.body.contains(loadingOverlay)) document.body.removeChild(loadingOverlay);
        console.error("Erro ao salvar:", error);
        comanda._hasUnsavedChanges = true; 
        renderComandaDetail();
        showNotification('Erro', 'Falha ao salvar no servidor: ' + error.message, 'warning');
    }
}

function getSafeAllItems(comanda) {
    if (!comanda._cachedItems) {
        let result = [];
        if (comanda.status === 'completed') {
            const finalItems = comanda.comandaItems || comanda.items || [];
            result = finalItems.length > 0 ? finalItems : (comanda.services || []);
        } else {
            const baseServices = (comanda.services || []).map(s => ({
                ...s, 
                _source: 'original_service',
                type: 'service' 
            }));
            
            const originalsMap = baseServices.reduce((acc, s) => {
                const key = String(s.id); 
                acc[key] = (acc[key] || 0) + 1;
                return acc;
            }, {});

            const rawExtras = [...(comanda.comandaItems || []), ...(comanda.items || [])];
            const validExtras = [];

            rawExtras.forEach(item => {
                const key = String(item.id);
                const isServiceCandidate = item.type === 'service' || !item.type;

                if (isServiceCandidate && originalsMap[key] > 0) {
                    originalsMap[key]--; 
                } else {
                    validExtras.push({...item, _source: 'extra'});
                }
            });

            result = [...baseServices, ...validExtras];
        }
        
        comanda._cachedItems = result;
        comanda._cachedTimestamp = Date.now();
        return result;
    }
    return comanda._cachedItems;
}

function showMobileDetail() {
    const layout = document.getElementById('comandas-layout');
    if (layout) {
        layout.classList.add('detail-view-active');
        const detailContainer = document.getElementById('comanda-detail-container');
        if(detailContainer) detailContainer.scrollTop = 0;
    }
}

function hideMobileDetail() {
    const layout = document.getElementById('comandas-layout');
    if (layout) {
        layout.classList.remove('detail-view-active');
    }
}

function updateKPIs() {
    const comandas = localState.allComandas || [];
    
    const abertas = comandas.filter(c => c.status !== 'completed').length;
    const pagas = comandas.filter(c => c.status === 'completed');
    
    const totalVendasHoje = pagas.reduce((acc, c) => {
        let val = c.totalAmount !== undefined ? Number(c.totalAmount) : getSafeAllItems(c).reduce((s, i) => s + Number(i.price || 0), 0);
        return acc + val;
    }, 0);
    
    const ticketMedio = pagas.length > 0 ? (totalVendasHoje / pagas.length) : 0;

    const elAbertas = document.getElementById('kpi-abertas');
    const elPagas = document.getElementById('kpi-pagas');
    const elVendas = document.getElementById('kpi-vendas');
    const elTicket = document.getElementById('kpi-ticket');

    if(elAbertas) elAbertas.textContent = abertas;
    if(elPagas) elPagas.textContent = pagas.length;
    if(elVendas) elVendas.textContent = `R$ ${totalVendasHoje.toFixed(2).replace('.', ',')}`;
    if(elTicket) elTicket.textContent = `R$ ${ticketMedio.toFixed(2).replace('.', ',')}`;
}

// --- 4. FUNÇÕES DE RENDERIZAÇÃO DA UI ---

function renderPageLayout() {
    const todayStr = new Date().toISOString().split('T')[0];
    
    contentDiv.innerHTML = `
        <section class="h-full flex flex-col p-2 md:p-4 md:pl-6 w-full relative">
            
            <div class="flex flex-col md:flex-row justify-between items-center mb-3 gap-3 w-full animate-fade-in">
                <div id="cashier-controls" class="flex items-center gap-2">
                    <div class="loader-sm"></div>
                </div>
                
                <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                    <button data-action="toggle-history" class="py-1.5 px-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition shadow-sm flex items-center gap-2 text-xs">
                        <i class="bi bi-clock-history"></i> Histórico
                    </button>
                    <button id="btn-new-sale" data-action="new-sale" class="py-1.5 px-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-sm flex items-center gap-2 text-xs flex-1 md:flex-none justify-center">
                        <i class="bi bi-plus-lg"></i> Nova Venda
                    </button>
                </div>
            </div>

            <div id="cashier-alert-box"></div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 animate-fade-in">
                <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col relative overflow-hidden group">
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10">Abertas</span>
                    <span id="kpi-abertas" class="text-xl font-black text-indigo-600 mt-0.5 z-10">0</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col relative overflow-hidden group">
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10">Vendas Hoje</span>
                    <span id="kpi-vendas" class="text-xl font-black text-green-600 mt-0.5 z-10">R$ 0,00</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col relative overflow-hidden group">
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10">Pagas</span>
                    <span id="kpi-pagas" class="text-xl font-black text-gray-800 mt-0.5 z-10">0</span>
                </div>
                <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col relative overflow-hidden group">
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10">Ticket Médio</span>
                    <span id="kpi-ticket" class="text-xl font-black text-blue-600 mt-0.5 z-10">R$ 0,00</span>
                </div>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2 w-full animate-fade-in">
                <div class="flex gap-2 overflow-x-auto pb-1 w-full md:w-auto custom-scrollbar">
                    <button data-filter="todas" class="filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition whitespace-nowrap shadow-sm">Todas</button>
                    <button data-filter="abertas" class="filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition whitespace-nowrap shadow-sm">Abertas</button>
                    <button data-filter="pagas" class="filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition whitespace-nowrap shadow-sm">Fechadas / Pagas</button>
                </div>
                
                <div id="finalizadas-datepicker" class="hidden flex items-center gap-2 bg-white p-1.5 rounded-lg border border-gray-200 shadow-sm w-full md:w-auto">
                    <label for="filter-date" class="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-2">Data:</label>
                    <input type="date" id="filter-date" value="${todayStr}" class="w-full md:w-auto p-1 border-0 rounded bg-gray-50 text-xs font-semibold outline-none focus:ring-1 focus:ring-indigo-500">
                </div>
            </div>

            <div id="comandas-layout" class="flex-1 flex gap-3 min-h-0 w-full animate-fade-in">
                <div id="comandas-list-column" class="flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm h-full w-full md:w-80 lg:w-96 flex-shrink-0 transition-all duration-300">
                    <div id="comandas-list" class="p-2 space-y-1.5 overflow-y-auto custom-scrollbar flex-1">
                        <div class="loader mx-auto mt-10"></div>
                    </div>
                    <div id="pagination-container" class="p-2 border-t border-gray-100 bg-gray-50/50 flex-shrink-0 min-h-[40px] flex justify-center items-center rounded-b-xl"></div>
                </div>

                <div id="comanda-detail-container" class="bg-white border border-gray-200 rounded-xl shadow-sm h-full flex-col relative overflow-hidden hidden md:flex flex-1 min-w-0 transition-all duration-300">
                    <div class="flex flex-col items-center justify-center h-full text-center text-gray-400">
                        <i class="bi bi-receipt text-4xl opacity-20 mb-2"></i>
                        <p class="text-sm font-medium">Selecione uma venda</p>
                    </div>
                </div>
            </div>
        </section>
    `;
    updateCashierUIState();
    updateFilterStyles();
}

function updateFilterStyles() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-indigo-50', 'text-indigo-700', 'border-indigo-200');
        btn.classList.add('bg-white', 'text-gray-600', 'border-gray-200');
    });
    const activeBtn = document.querySelector(`[data-filter="${localState.activeFilter}"]`);
    if(activeBtn) {
        activeBtn.classList.remove('bg-white', 'text-gray-600', 'border-gray-200');
        activeBtn.classList.add('bg-indigo-50', 'text-indigo-700', 'border-indigo-200');
    }

    const datePicker = document.getElementById('finalizadas-datepicker');
    if(datePicker) {
        datePicker.classList.toggle('hidden', !localState.showHistoryDate);
    }
}

function updateCashierUIState() {
    const alertBox = document.getElementById('cashier-alert-box');
    const newSaleBtn = document.getElementById('btn-new-sale');

    if (!localState.isCashierOpen) {
        if (alertBox) alertBox.innerHTML = `
            <div class="bg-amber-50 border-l-4 border-amber-400 p-3 mb-3 rounded-r-lg animate-fade-in mx-1 shadow-sm">
                <div class="flex items-center">
                    <i class="bi bi-exclamation-triangle text-amber-500 mr-3 text-lg"></i>
                    <p class="text-xs text-amber-800">
                        <strong>Caixa Fechado!</strong> Abra o caixa para realizar operações e novas vendas.
                    </p>
                </div>
            </div>
        `;
        if (newSaleBtn) {
            newSaleBtn.classList.add('opacity-50', 'cursor-not-allowed');
            newSaleBtn.disabled = true;
        }
    } else {
        if (alertBox) alertBox.innerHTML = '';
        if (newSaleBtn) {
            newSaleBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            newSaleBtn.disabled = false;
        }
    }
    renderCashierControls();
}

function renderCashierControls() {
    const container = document.getElementById('cashier-controls');
    if (!container) return;
    
    if (localState.isCashierOpen) {
        container.innerHTML = `
            <span class="hidden sm:inline-block text-[10px] font-bold text-green-700 bg-green-100 py-1.5 px-2.5 rounded-lg border border-green-200 uppercase tracking-widest shadow-sm"><i class="bi bi-unlock-fill"></i> Caixa Aberto</span>
            <button data-action="close-cashier" class="py-1.5 px-3 bg-red-50 text-red-700 border border-red-200 font-bold rounded-lg hover:bg-red-100 text-xs transition shadow-sm">Fechar Caixa</button>
        `;
    } else {
        container.innerHTML = `
            <span class="hidden sm:inline-block text-[10px] font-bold text-red-700 bg-red-100 py-1.5 px-2.5 rounded-lg border border-red-200 uppercase tracking-widest shadow-sm"><i class="bi bi-lock-fill"></i> Caixa Fechado</span>
            <button data-action="open-cashier" class="py-1.5 px-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 text-xs shadow-sm transition">Abrir Caixa</button>
        `;
    }
}

function renderComandaList() {
    const listContainer = document.getElementById('comandas-list');
    const paginationContainer = document.getElementById('pagination-container');
    
    if (!listContainer) return;
    
    if (!localState.isCashierOpen && localState.activeFilter === 'abertas') {
        listContainer.innerHTML = `
            <div class="text-center py-10 opacity-60">
                <i class="bi bi-lock text-3xl text-gray-300 mb-2 block"></i>
                <p class="text-xs font-bold text-gray-600 uppercase tracking-widest">Caixa Fechado</p>
                <p class="text-[10px] text-gray-500 mt-1">Abra o caixa para ver as vendas</p>
            </div>
        `;
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }
    
    let filteredComandas = localState.allComandas || [];
    if(localState.activeFilter === 'abertas') {
        filteredComandas = filteredComandas.filter(c => c.status !== 'completed');
    } else if (localState.activeFilter === 'pagas') {
        filteredComandas = filteredComandas.filter(c => c.status === 'completed');
    }

    updateKPIs(); 

    if (filteredComandas.length === 0) {
        listContainer.innerHTML = `<p class="text-center text-gray-400 py-10 text-xs font-medium">Nenhuma venda encontrada para este filtro.</p>`;
        renderPaginationControls(paginationContainer);
        return;
    }

    const fragment = document.createDocumentFragment();

    filteredComandas.forEach(comanda => {
        const allItems = getSafeAllItems(comanda);
        
        let displayTotal = 0;
        if (comanda.status === 'completed' && comanda.totalAmount !== undefined && comanda.totalAmount !== null) {
            displayTotal = Number(comanda.totalAmount);
        } else {
            displayTotal = allItems.reduce((acc, item) => acc + Number(item.price || 0), 0);
        }

        const hasReward = comanda.loyaltyRedemption || (comanda.discount && comanda.discount.reason && String(comanda.discount.reason).toLowerCase().includes('fidelidade'));
        const rewardIndicator = hasReward 
            ? `<span class="inline-flex items-center justify-center bg-yellow-100 text-yellow-700 rounded-full w-4 h-4 ml-1 text-[10px]" title="Prémio Resgatado">🎁</span>` 
            : '';

        const isSelected = comanda.id === localState.selectedComandaId;
        
        const dateObj = new Date(comanda.startTime);
        const timeStr = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        const isWalkIn = comanda.type === 'walk-in' || (typeof comanda.id === 'string' && comanda.id.startsWith('temp-'));
        const isCompleted = comanda.status === 'completed';

        const safeClientName = escapeHTML(comanda.clientName || 'Cliente sem nome');
        const safeProfName = escapeHTML(comanda.professionalName || 'Sem profissional');
        
        let typeIndicator = '';
        if(isCompleted) {
            typeIndicator = `<span class="text-[9px] font-bold uppercase text-green-700 bg-green-100 px-1.5 py-0.5 rounded border border-green-200">Paga</span>`;
        } else if (isWalkIn) {
            typeIndicator = `<span class="text-[9px] font-bold uppercase text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded border border-blue-200">Avulsa</span>`;
        } else {
            typeIndicator = `<span class="text-[9px] font-bold uppercase text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded border border-indigo-200">Agenda</span>`;
        }

        const div = document.createElement('div');
        div.className = `comanda-card cursor-pointer border border-gray-100 rounded-lg p-2.5 hover:bg-gray-50 transition-colors shadow-sm ${isSelected ? 'ring-2 ring-indigo-500 bg-indigo-50/50' : 'bg-white'}`;
        div.dataset.action = 'select-comanda';
        div.dataset.comandaId = comanda.id;
        div.innerHTML = `
            <div class="flex justify-between items-start mb-1.5 pointer-events-none">
                <p class="font-bold text-gray-800 truncate flex-1 min-w-0 pr-2 text-xs">${safeClientName}</p>
                <div class="flex items-center flex-shrink-0">
                    <p class="font-black ${isCompleted ? 'text-green-600' : 'text-gray-800'} text-xs">R$ ${displayTotal.toFixed(2)}</p>
                    ${rewardIndicator}
                </div>
            </div>
            <div class="flex justify-between items-center mt-1 pointer-events-none gap-2">
                <div class="flex items-center gap-1.5 min-w-0 flex-1">
                    ${typeIndicator}
                    <p class="text-[10px] text-gray-500 truncate"><i class="bi bi-person mr-0.5 opacity-50"></i>${safeProfName}</p>
                </div>
                <p class="text-[10px] text-gray-500 font-bold flex-shrink-0"><i class="bi bi-clock mr-0.5 opacity-50"></i>${timeStr}</p> 
            </div>
        `;
        fragment.appendChild(div);
    });

    listContainer.innerHTML = '';
    listContainer.appendChild(fragment);
    renderPaginationControls(paginationContainer);
}

function renderPaginationControls(container) {
    if (!container) return;
    container.innerHTML = '';

    const { page, total, limit } = localState.paging;
    const totalPages = Math.ceil((total || 0) / limit);
    if (totalPages === 0) return;

    const div = document.createElement('div');
    div.className = "flex gap-2 justify-center items-center w-full";
    div.innerHTML = `
        <button data-page="${page - 1}" class="px-2.5 py-1 rounded bg-white border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-600 shadow-sm ${page <= 1 ? 'opacity-50 cursor-not-allowed' : ''}" ${page <= 1 ? 'disabled' : ''}>&laquo;</button>
        <span class="text-[10px] font-bold uppercase tracking-widest text-gray-500 mx-1">Pág ${page} de ${totalPages || 1}</span>
        <button data-page="${page + 1}" class="px-2.5 py-1 rounded bg-white border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-600 shadow-sm ${page >= totalPages ? 'opacity-50 cursor-not-allowed' : ''}" ${page >= totalPages ? 'disabled' : ''}>&raquo;</button>
    `;
    container.appendChild(div);

    div.querySelectorAll('button[data-page]').forEach(btn => {
        btn.onclick = (e) => {
            e.stopPropagation(); 
            const newPage = parseInt(btn.dataset.page, 10);
            if (newPage > 0 && newPage <= totalPages) {
                localState.paging.page = newPage;
                fetchAndDisplayData();
            }
        };
    });
}

function renderComandaDetail() {
    const detailContainer = document.getElementById('comanda-detail-container');
    if (!detailContainer) return;
    
    const comanda = localState.allComandas.find(c => c.id === localState.selectedComandaId);

    if (localState.viewMode === 'checkout' && comanda) {
        renderCheckoutView(comanda, detailContainer);
        return;
    }
    
    const mobileHeaderHTML = `
        <div class="mobile-only-header p-3 border-b border-gray-200 bg-gray-50 flex items-center shadow-sm">
            <button data-action="back-to-list" class="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-100 shadow-sm">
                <i class="bi bi-arrow-left text-sm"></i>
            </button>
            <h3 class="font-bold text-sm text-gray-800 ml-3 uppercase tracking-wider">Detalhes</h3>
        </div>
    `;

    if (!localState.isCashierOpen) {
        detailContainer.innerHTML = `
            ${mobileHeaderHTML}
            <div class="flex flex-col items-center justify-center h-full text-center text-gray-500 p-6">
                <div class="bg-gray-50 p-4 rounded-full mb-3 border border-gray-100">
                    <i class="bi bi-lock text-3xl text-gray-300"></i>
                </div>
                <p class="font-bold text-sm text-gray-700">Caixa Fechado</p>
                <button data-action="open-cashier" class="py-2 px-5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-sm mt-3 text-xs">Abrir Caixa</button>
            </div>
        `;
        return;
    }

    if (!comanda) {
        detailContainer.innerHTML = `
            <div class="hidden md:flex flex-col items-center justify-center h-full text-center text-gray-400">
                <i class="bi bi-receipt text-4xl opacity-20 mb-2"></i>
                <p class="text-sm font-medium">Selecione uma venda</p>
                <p class="text-[10px] uppercase tracking-widest mt-1 opacity-70">Clique na lista ao lado</p>
            </div>
        `;
        return;
    }

    const allItems = getSafeAllItems(comanda);
    const isCompleted = comanda.status === 'completed';
    const isWalkIn = comanda.type === 'walk-in' || (typeof comanda.id === 'string' && comanda.id.startsWith('temp-'));
    
    const groupedItems = allItems.reduce((acc, item) => {
        const isOriginal = item._source === 'original_service';
        const safeId = item.id || item.name;
        
        const key = isOriginal 
            ? `original-${safeId}` 
            : `${item.type}-${safeId}`;
            
        if (!acc[key]) acc[key] = { ...item, quantity: 0, sources: [] };
        acc[key].quantity += 1;
        if(item._source) acc[key].sources.push(item._source);
        return acc;
    }, {});
    
    const total = Object.values(groupedItems).reduce((acc, item) => acc + Number(item.price || 0) * item.quantity, 0);
    const safeClientName = escapeHTML(comanda.clientName || 'Cliente sem nome');
    const safeProfName = escapeHTML(comanda.professionalName || 'Profissional não atribuído');

    const hasUnsaved = comanda._hasUnsavedChanges;
    const saveBtnClass = hasUnsaved 
        ? "bg-amber-500 text-white hover:bg-amber-600 shadow-md animate-pulse border-transparent" 
        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm"; 
    
    const saveBtnText = hasUnsaved ? "Salvar*" : "Salvar";

    const desktopButtons = `
        <div class="grid grid-cols-3 gap-2 mobile-hidden pt-1">
            <button data-action="add-item" class="col-span-1 py-2 bg-indigo-50 text-indigo-700 font-bold rounded-lg hover:bg-indigo-100 transition border border-indigo-200 text-xs shadow-sm">
                + Item
            </button>
            <button data-action="save-comanda" class="col-span-1 py-2 font-bold rounded-lg transition text-xs ${saveBtnClass}">
                ${saveBtnText}
            </button>
            <button data-action="go-to-checkout" class="col-span-1 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-sm text-xs">
                Receber
            </button>
        </div>
    `;

    const mobileFABs = `
        <div class="mobile-fabs-container">
            <button data-action="add-item" class="fab-btn-secondary" title="Adicionar Item">
                <i class="bi bi-plus-lg text-lg"></i>
            </button>
            <button data-action="save-comanda" class="fab-btn-secondary ${hasUnsaved ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-gray-700 text-white hover:bg-gray-800'}" title="Salvar Alterações">
                <i class="bi bi-save2 text-lg"></i>
            </button>
            <button data-action="go-to-checkout" class="fab-btn-primary" title="Receber / Pagar">
                <i class="bi bi-currency-dollar text-xl"></i>
            </button>
        </div>
    `;

    detailContainer.innerHTML = `
        ${mobileHeaderHTML} 
        <div class="flex-grow overflow-y-auto p-3 pb-24 custom-scrollbar bg-gray-50/30"> 
            <div class="flex justify-between items-start mb-4 border-b border-gray-100 pb-3">
                <div>
                    <h3 class="text-base font-black text-gray-800 truncate max-w-[200px]">${safeClientName}</h3>
                    <p class="text-xs text-gray-500 flex items-center gap-1 mt-0.5 font-medium">
                        <i class="bi bi-person opacity-50"></i> ${safeProfName}
                    </p>
                    ${!isWalkIn ? 
                        `<button data-action="go-to-appointment" data-id="${comanda.id}" data-date="${comanda.startTime}" class="text-indigo-600 text-[10px] font-bold uppercase tracking-widest hover:underline flex items-center gap-1 mt-1.5">
                             Ver na Agenda <i class="bi bi-arrow-right-short"></i>
                         </button>` 
                         : `<span class="mt-1.5 inline-block px-1.5 py-0.5 text-[9px] font-bold bg-blue-100 text-blue-700 rounded uppercase tracking-widest">Venda Avulsa</span>`}
                </div>
                <div class="flex gap-1.5">
                    ${isCompleted ? 
                        `<button data-action="reopen-appointment" data-id="${comanda.id}" class="w-7 h-7 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 flex items-center justify-center border border-yellow-200 shadow-sm" title="Reabrir"><i class="bi bi-arrow-counterclockwise text-xs"></i></button>` 
                        : ''}
                    ${isWalkIn && !isCompleted ? 
                        `<button data-action="delete-walk-in" data-id="${comanda.id}" class="w-7 h-7 bg-red-100 text-red-700 rounded-md hover:bg-red-200 flex items-center justify-center border border-red-200 shadow-sm" title="Excluir"><i class="bi bi-trash3 text-xs"></i></button>` 
                        : ''}
                </div>
            </div>

            <div id="loyalty-container" class="mb-3"></div>

            <div class="space-y-2">
                <h4 class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 px-1">Itens do Pedido</h4>
                ${Object.values(groupedItems).map(item => {
                    const isOriginal = item.sources && item.sources.includes('original_service');
                    const isRedeemedItem = localState.pendingRedemption && String(localState.pendingRedemption.appliedToItemId) === String(item.id);
                    const showRewardTag = item.isReward || isRedeemedItem;

                    return `
                    <div class="flex items-center justify-between bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm ${showRewardTag ? 'border-yellow-400 bg-yellow-50 ring-1 ring-yellow-200' : ''}">
                        <div class="flex flex-col w-full gap-2">
                            <div class="flex justify-between items-start">
                                <div class="min-w-0 flex-1 pr-2">
                                    <p class="text-xs font-bold text-gray-800 line-clamp-1 leading-tight">
                                        ${showRewardTag ? '🎁 ' : ''}
                                        ${escapeHTML(item.name)}
                                    </p>
                                    <div class="flex items-center mt-1">
                                        ${isOriginal ? '<span class="text-[8px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-1 py-0.5 rounded border border-indigo-100 mr-2">Original</span>' : ''}
                                        <p class="text-[10px] text-gray-500 font-medium">${showRewardTag ? '<span class="text-yellow-700 font-bold bg-yellow-100 px-1 py-0.5 rounded border border-yellow-200">Prémio</span>' : `R$ ${(item.price || 0).toFixed(2)} un.`}</p>
                                    </div>
                                </div>
                                <span class="font-black text-sm text-gray-900 whitespace-nowrap">R$ ${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                            
                            <div class="flex justify-end">
                                ${!isCompleted ? `
                                    <div class="flex items-center bg-gray-50 rounded-md border border-gray-200 shadow-inner">
                                        ${isOriginal ? 
                                            `<span class="text-[10px] font-bold text-gray-500 px-3 py-1 bg-gray-100 rounded-md uppercase tracking-wider">Fixo: ${item.quantity}</span>` 
                                            : 
                                            `<button data-action="decrease-qty" data-item-id="${item.id}" data-item-type="${item.type}" class="w-7 h-7 flex items-center justify-center rounded-l-md bg-white text-gray-600 hover:bg-red-50 hover:text-red-600 disabled:opacity-30 border-r border-gray-200"><i class="bi bi-dash"></i></button>
                                             <span class="text-xs font-black text-gray-800 w-6 text-center">${item.quantity}</span>
                                             <button data-action="increase-qty" data-item-id="${item.id}" data-item-type="${item.type}" class="w-7 h-7 flex items-center justify-center rounded-r-md bg-white text-gray-600 hover:bg-green-50 hover:text-green-600 border-l border-gray-200"><i class="bi bi-plus"></i></button>`
                                        }
                                    </div>
                                ` : `<span class="flex items-center justify-center px-2.5 py-1 bg-gray-100 border border-gray-200 text-gray-600 font-bold text-[10px] uppercase tracking-widest rounded-md">${item.quantity} Qtd</span>`}
                            </div>
                        </div>
                    </div>
                `}).join('')}
                ${Object.keys(groupedItems).length === 0 ? '<div class="text-center py-6 text-gray-400 border border-dashed border-gray-300 bg-gray-50 rounded-lg text-xs font-medium">Nenhum item adicionado</div>' : ''}
            </div>
        </div>

        <footer class="p-3 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10 relative">
            <div class="flex justify-between items-end mb-3 px-1">
                <span class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Total a Pagar</span>
                <span class="text-2xl font-black text-gray-900 leading-none">R$ ${total.toFixed(2)}</span>
            </div>
            ${!isCompleted ? desktopButtons : `
                <div class="bg-green-50 text-green-700 text-center py-2 rounded-lg font-bold border border-green-200 flex items-center justify-center gap-1.5 text-xs shadow-sm">
                    <i class="bi bi-check-circle-fill"></i> Venda Finalizada
                </div>
            `}
        </footer>

        ${!isCompleted ? mobileFABs : ''}
    `;

    if (!isCompleted && (comanda.clientId || comanda.clientName)) {
        checkAndRenderLoyalty(comanda, detailContainer.querySelector('#loyalty-container'));
    }
}

function renderCheckoutView(comanda, container) {
    const rawItems = getSafeAllItems(comanda);
    const subtotal = rawItems.reduce((acc, item) => acc + Number(item.price || 0) * (item.quantity || 1), 0);
    const checkoutState = localState.checkoutState;

    const discount = checkoutState.discount || { type: 'real', value: 0 };
    let discountValue = 0;
    if (discount.type === 'percent') {
        discountValue = (subtotal * discount.value) / 100;
    } else {
        discountValue = discount.value;
    }
    if (discountValue > subtotal) discountValue = subtotal;
    const totalFinal = subtotal - discountValue;
    
    const totalPaid = checkoutState.payments.reduce((acc, p) => acc + p.value, 0);
    const remaining = Math.max(0, totalFinal - totalPaid);
    
    if (!checkoutState.amountReceived || remaining > 0) {
         checkoutState.amountReceived = remaining.toFixed(2);
    }

    const mobileHeaderHTML = `
        <div class="mobile-only-header p-3 border-b border-gray-200 bg-gray-50 flex items-center shadow-sm">
            <button data-action="back-to-items" class="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-100 shadow-sm">
                <i class="bi bi-arrow-left text-sm"></i>
            </button>
            <h3 class="font-bold text-sm text-gray-800 ml-3 uppercase tracking-wider">Pagamento</h3>
        </div>
    `;

    container.innerHTML = `
        ${mobileHeaderHTML}
        <div class="flex-grow overflow-y-auto p-4 pb-24 custom-scrollbar bg-gray-50/50">
            
            <div class="text-center mb-5 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Subtotal: <span id="checkout-subtotal-display" class="text-gray-600">R$ ${subtotal.toFixed(2)}</span></p>
                
                <div class="flex flex-col items-center justify-center gap-2 mt-3 mb-2">
                     <div class="flex items-center gap-2">
                         <span class="text-[10px] font-bold text-red-400 uppercase tracking-widest"><i class="bi bi-tag-fill mr-1"></i>Desc:</span>
                         <div class="flex border border-gray-300 rounded-lg bg-white overflow-hidden shadow-inner w-32">
                             <input type="number" id="discount-value" value="${discount.value}" class="w-16 p-1.5 text-center text-xs font-black text-red-500 outline-none bg-transparent" placeholder="0">
                             <select id="discount-type" class="bg-gray-50 text-[10px] font-bold text-gray-600 border-l border-gray-200 p-1.5 outline-none">
                                 <option value="real" ${discount.type === 'real' ? 'selected' : ''}>R$</option>
                                 <option value="percent" ${discount.type === 'percent' ? 'selected' : ''}>%</option>
                             </select>
                         </div>
                     </div>
                     <input type="text" id="discount-reason" class="w-48 p-1.5 text-[10px] border border-gray-200 rounded-md text-center focus:border-indigo-400 outline-none text-gray-600 bg-gray-50" placeholder="Motivo do desconto" value="${checkoutState.discountReason || ''}">
                </div>

                <p class="text-3xl font-black text-gray-900 mt-2" id="checkout-total-display">R$ ${totalFinal.toFixed(2)}</p>
                
                <div id="checkout-status-msg" class="mt-1.5">
                    ${remaining <= 0.01 
                        ? '<p class="text-emerald-500 font-black text-sm uppercase tracking-widest"><i class="bi bi-check2-circle"></i> Pago</p>' 
                        : `<p class="text-red-500 font-bold text-xs">Faltam: <span id="checkout-remaining-display">R$ ${remaining.toFixed(2)}</span></p>`
                    }
                </div>
            </div>

            <div class="space-y-2 mb-5">
                ${checkoutState.payments.map((p, index) => `
                    <div class="flex justify-between items-center bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm animate-fade-in-fast">
                        <div class="flex items-center gap-2">
                             <div class="bg-gray-100 px-2 py-1 rounded border border-gray-200">
                                <span class="font-bold text-[10px] uppercase tracking-widest text-gray-600">${p.method}</span>
                             </div>
                             ${p.installments > 1 ? `<span class="text-[9px] font-bold bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded border border-purple-200">${p.installments}x</span>` : ''}
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="font-black text-sm text-gray-800">R$ ${p.value.toFixed(2)}</span>
                            <button data-action="remove-payment-checkout" data-index="${index}" class="text-gray-400 hover:text-red-500 hover:bg-red-50 w-6 h-6 rounded flex items-center justify-center transition-colors"><i class="bi bi-trash3 text-[10px]"></i></button>
                        </div>
                    </div>
                `).join('')}
            </div>

            ${remaining > 0.01 ? `
            <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 border-b border-gray-100 pb-1.5">Adicionar Pagamento</label>
                <div class="grid grid-cols-3 gap-1.5 mb-3">
                    ${['dinheiro', 'pix', 'debito', 'credito', 'crediario'].map(m => `
                        <button data-action="select-method" data-method="${m}" class="p-1.5 rounded-md border text-[9px] font-bold uppercase tracking-wider transition-colors ${checkoutState.selectedMethod === m ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-white'}">
                            ${m}
                        </button>
                    `).join('')}
                </div>
                
                ${['credito', 'crediario'].includes(checkoutState.selectedMethod) ? `
                    <div class="mb-3">
                        <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Parcelas</label>
                        <select id="checkout-installments" class="w-full mt-0.5 p-1.5 border border-gray-200 rounded-md text-xs font-bold text-gray-700 bg-gray-50 outline-none focus:border-indigo-400">
                            ${Array.from({length: 12}, (_, i) => `<option value="${i+1}" ${checkoutState.installments === i+1 ? 'selected' : ''}>${i+1}x</option>`).join('')}
                        </select>
                    </div>
                ` : ''}

                <div class="flex items-end gap-2">
                    <div class="flex-grow relative">
                        <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Valor</label>
                        <span class="absolute left-2.5 bottom-2 text-gray-400 font-bold text-sm">R$</span>
                        <input type="number" id="checkout-amount" step="0.01" class="w-full p-1.5 pl-8 border border-gray-300 rounded-lg text-sm font-black text-gray-800 outline-none focus:border-indigo-500 shadow-inner mt-0.5" value="${remaining.toFixed(2)}">
                    </div>
                    <button data-action="add-payment-checkout" class="h-[34px] px-4 bg-gray-800 text-white font-bold text-xs rounded-lg hover:bg-gray-900 transition shadow-sm uppercase tracking-wider">OK</button>
                </div>
            </div>
            ` : ''}
        </div>

        <footer class="p-3 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] grid grid-cols-2 gap-2 z-10 relative">
            <button data-action="back-to-items" class="py-2.5 bg-white border border-gray-300 text-gray-700 font-bold text-xs rounded-lg hover:bg-gray-50 transition shadow-sm">Voltar</button>
            <button data-action="finalize-checkout" class="py-2.5 bg-green-600 text-white font-bold text-xs rounded-lg hover:bg-green-700 transition shadow-sm flex items-center justify-center gap-1.5"><i class="bi bi-check2-circle"></i> Finalizar</button>
        </footer>
    `;

    const updateCheckoutUI = () => {
        const dType = localState.checkoutState.discount.type;
        const dVal = localState.checkoutState.discount.value;
        let cDiscount = (dType === 'percent') ? (subtotal * dVal) / 100 : dVal;
        if (cDiscount > subtotal) cDiscount = subtotal;
        
        const cFinal = subtotal - cDiscount;
        const cPaid = localState.checkoutState.payments.reduce((acc, p) => acc + p.value, 0);
        const cRemaining = Math.max(0, cFinal - cPaid);

        const elTotal = container.querySelector('#checkout-total-display');
        if (elTotal) elTotal.textContent = `R$ ${cFinal.toFixed(2)}`;

        const elStatus = container.querySelector('#checkout-status-msg');
        if (elStatus) {
            if (cRemaining <= 0.01) {
                elStatus.innerHTML = '<p class="text-emerald-500 font-black text-sm uppercase tracking-widest"><i class="bi bi-check2-circle"></i> Pago</p>';
            } else {
                elStatus.innerHTML = `<p class="text-red-500 font-bold text-xs">Faltam: <span id="checkout-remaining-display">R$ ${cRemaining.toFixed(2)}</span></p>`;
            }
        }
        
        const elAmount = container.querySelector('#checkout-amount');
        if (elAmount && cRemaining > 0) {
             if (document.activeElement !== elAmount) {
                 elAmount.value = cRemaining.toFixed(2);
             }
        }
    };

    container.querySelector('#discount-value')?.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value) || 0;
        localState.checkoutState.discount.value = val;
        updateCheckoutUI();
    });

    container.querySelector('#discount-type')?.addEventListener('change', (e) => {
        localState.checkoutState.discount.type = e.target.value;
        updateCheckoutUI();
    });
    
    container.querySelector('#discount-reason')?.addEventListener('input', (e) => {
        localState.checkoutState.discountReason = e.target.value;
    });

    container.querySelector('#checkout-amount')?.addEventListener('input', (e) => {
        localState.checkoutState.amountReceived = e.target.value;
    });
    
    container.querySelector('#checkout-installments')?.addEventListener('change', (e) => {
        localState.checkoutState.installments = parseInt(e.target.value, 10);
    });
}

async function checkAndRenderLoyalty(comanda, containerElement) {
    if (!containerElement) return;
    const settings = localState.loyaltySettings;
    if (!settings || !settings.enabled) return;

    let clientData = null;
    try {
        if (comanda.clientId) {
            clientData = await clientsApi.getClient(state.establishmentId, comanda.clientId);
        } else if (comanda.clientName) {
            const search = await clientsApi.getClients(state.establishmentId, comanda.clientName, 1);
            if (search && search.length > 0) clientData = search[0];
        }
    } catch (e) { console.warn("Erro ao buscar dados de fidelidade", e); }

    if (!clientData || clientData.loyaltyPoints === undefined) return;

    const currentPoints = Number(clientData.loyaltyPoints) || 0;
    const rewardsList = settings.tiers || settings.rewards || [];
    const availableRewards = rewardsList.filter(r => {
        const cost = Number(r.costPoints || r.points || 0); 
        return cost > 0 && currentPoints >= cost;
    });

    if (availableRewards.length > 0) {
        const rewardDiv = document.createElement('div');
        rewardDiv.className = "bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-3 shadow-sm flex justify-between items-center animate-fade-in";
        rewardDiv.innerHTML = `
            <div class="flex items-center gap-2">
                <div class="bg-white p-1.5 rounded-lg text-yellow-500 shadow-sm border border-yellow-100">
                    <i class="bi bi-star-fill text-lg"></i>
                </div>
                <div>
                    <p class="text-[10px] font-black uppercase tracking-widest text-yellow-800">Prémio Disponível!</p>
                    <p class="text-[9px] text-yellow-700 font-bold">Saldo: ${currentPoints} pts</p>
                </div>
            </div>
        `;
        const btn = document.createElement('button');
        btn.innerHTML = "<i class='bi bi-gift mr-1'></i> Resgatar";
        btn.className = "text-[9px] font-black uppercase tracking-wider bg-yellow-500 text-white px-2.5 py-1.5 rounded shadow-sm hover:bg-yellow-600 transition-colors";
        btn.onclick = () => openRewardSelectionModal(availableRewards, comanda);
        rewardDiv.appendChild(btn);
        containerElement.innerHTML = '';
        containerElement.appendChild(rewardDiv);
    }
}

function openRewardSelectionModal(rewards, comanda) {
    const contentHTML = `
        <div class="space-y-3">
            <p class="text-xs text-gray-500 mb-3 font-medium">O cliente possui pontos suficientes para resgatar os seguintes itens:</p>
            <div class="space-y-2 max-h-72 overflow-y-auto custom-scrollbar">
                ${rewards.map(r => {
                    const cost = r.costPoints || r.points || 0;
                    const name = r.name || r.reward;
                    const type = r.type || 'money';
                    const discountValue = r.discount ? parseFloat(r.discount).toFixed(2) : '0.00';
                    let typeLabel = '';
                    let typeColor = 'bg-gray-100 text-gray-600';

                    switch(type) {
                        case 'service': typeLabel = 'Serviço'; typeColor = 'bg-indigo-100 text-indigo-700'; break;
                        case 'product': typeLabel = 'Produto'; typeColor = 'bg-green-100 text-green-700'; break;
                        case 'package': typeLabel = 'Pacote'; typeColor = 'bg-purple-100 text-purple-700'; break;
                        case 'money': default: typeLabel = 'Valor'; typeColor = 'bg-yellow-100 text-yellow-700'; break;
                    }

                    return `
                    <button data-action="select-reward" data-reward-id="${r.id || name}" class="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl hover:border-yellow-400 hover:bg-yellow-50 transition-all group shadow-sm">
                        <div class="text-left flex-1 min-w-0 pr-2">
                            <div class="flex items-center gap-1.5 mb-1">
                                <span class="text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border border-white/0 group-hover:border-yellow-200 ${typeColor}">${typeLabel}</span>
                                <p class="font-bold text-gray-800 group-hover:text-yellow-700 text-xs truncate">${escapeHTML(name)}</p>
                            </div>
                            <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Custo: ${cost} pts</p>
                        </div>
                        <div class="text-right flex-shrink-0">
                            <span class="block text-xs font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">Desc. R$ ${discountValue}</span>
                        </div>
                    </button>
                `}).join('')}
            </div>
        </div>
    `;
    const { modalElement, close } = showGenericModal({ title: "🎁 Resgatar Prémio", contentHTML: contentHTML, maxWidth: 'max-w-md' });
    modalElement.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-action="select-reward"]');
        if (btn) {
            const rewardId = btn.dataset.rewardId;
            const reward = rewards.find(r => (r.id && r.id == rewardId) || ((r.name || r.reward) == rewardId)); 
            if (reward) { addRewardToComanda(reward, comanda); close(); }
        }
    });
}

async function addRewardToComanda(reward, comanda) {
    const cost = Number(reward.costPoints || reward.points || 0);
    const name = reward.name || reward.reward;
    const type = reward.type || 'money';
    
    if (type === 'money') {
        const discountValue = parseFloat(reward.discount) || 0;
        
        if (discountValue <= 0) {
            showNotification('Erro', 'O valor do desconto configurado é inválido.', 'error');
            return;
        }

        localState.checkoutState.discount = { type: 'real', value: discountValue };
        localState.checkoutState.discountReason = `Resgate Fidelidade: ${name}`;
        
        localState.pendingRedemption = { rewardId: reward.id || null, name: name, cost: cost, type: 'money' };

        showNotification('Sucesso', `Prémio "${name}" resgatado! Desconto de R$ ${discountValue.toFixed(2)} aplicado.`, 'success');
        renderComandaDetail(); 
        return;
    }
    
    const allItems = getSafeAllItems(comanda);
    const rewardItemId = reward.itemId ? String(reward.itemId) : null;

    if (!rewardItemId) {
        showNotification('Erro de Configuração', `O prémio "${name}" não tem um item vinculado nas configurações.`, 'error');
        return;
    }

    const match = allItems.find(i => {
        const itemId = i.id ? String(i.id) : null;
        const itemServiceId = i.serviceId ? String(i.serviceId) : (i.service_id ? String(i.service_id) : null);
        const itemProductId = i.productId ? String(i.productId) : (i.product_id ? String(i.product_id) : null);

        if (type === 'service') return (itemId === rewardItemId || itemServiceId === rewardItemId);
        else if (type === 'product') return (itemId === rewardItemId || itemProductId === rewardItemId);
        else if (type === 'package') return itemId === rewardItemId; 
        return false;
    });

    if (match) {
        let discountValue = parseFloat(reward.discount);
        if (!discountValue || discountValue <= 0) discountValue = parseFloat(match.price || 0);
        
        localState.checkoutState.discount = { type: 'real', value: discountValue };
        localState.checkoutState.discountReason = `Resgate Fidelidade: ${name}`;
        
        localState.pendingRedemption = { rewardId: reward.id || null, name: name, cost: cost, type: type, appliedToItemId: match.id };

        showNotification('Sucesso', `Prémio "${name}" resgatado! Item encontrado e desconto de R$ ${discountValue.toFixed(2)} aplicado.`, 'success');
        renderComandaDetail(); 
    } else {
        let itemTypeName = type === 'service' ? 'serviço' : (type === 'product' ? 'produto' : 'pacote');
        showNotification('Item Não Encontrado', `Para resgatar o prémio "${name}", o ${itemTypeName} correspondente deve estar lançado nesta comanda. Por favor, adicione o item primeiro e tente resgatar novamente.`, 'warning');
    }
}

function openAddItemModal() {
    if (!localState.isCashierOpen) return showNotification('Caixa Fechado', 'Abra o caixa antes de adicionar itens.', 'error');
    const { modalElement, close } = showGenericModal({ title: "Adicionar Item", contentHTML: '<div id="add-item-content"></div>', maxWidth: 'max-w-3xl' });

    const renderCatalogView = () => {
        const contentContainer = modalElement.querySelector('#add-item-content');
        contentContainer.innerHTML = `
            <div class="relative mb-4">
                <i class="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                <input type="search" id="item-search-input" placeholder="Pesquisar por nome..." class="w-full pl-8 p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none text-xs bg-gray-50 focus:bg-white transition-colors">
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="bg-gray-50 p-2 rounded-xl border border-gray-100"><h4 class="font-black mb-2 text-center text-[10px] uppercase tracking-widest text-indigo-500">Serviços</h4><div id="modal-service-list" class="space-y-1.5 max-h-60 overflow-y-auto custom-scrollbar"></div></div>
                <div class="bg-gray-50 p-2 rounded-xl border border-gray-100"><h4 class="font-black mb-2 text-center text-[10px] uppercase tracking-widest text-emerald-500">Produtos</h4><div id="modal-product-list" class="space-y-1.5 max-h-60 overflow-y-auto custom-scrollbar"></div></div>
                <div class="bg-gray-50 p-2 rounded-xl border border-gray-100"><h4 class="font-black mb-2 text-center text-[10px] uppercase tracking-widest text-purple-500">Pacotes</h4><div id="modal-package-list" class="space-y-1.5 max-h-60 overflow-y-auto custom-scrollbar"></div></div>
            </div>`;

        const filterAndRender = (term = '') => {
            const lowerTerm = term.toLowerCase();
            const icons = {
                service: '<i class="bi bi-scissors text-indigo-500"></i>',
                product: '<i class="bi bi-box-seam text-emerald-500"></i>',
                package: '<i class="bi bi-boxes text-purple-500"></i>'
            };
            const lists = {
                'modal-service-list': { items: localState.catalog.services, type: 'service' },
                'modal-product-list': { items: localState.catalog.products, type: 'product' },
                'modal-package-list': { items: localState.catalog.packages, type: 'package' }
            };
            Object.entries(lists).forEach(([id, { items, type }]) => {
                const el = document.getElementById(id);
                if (!el) return;
                const filtered = items.filter(i => i.name.toLowerCase().includes(lowerTerm)).slice(0, 50);
                el.innerHTML = filtered.map(item => {
                    if (!item.id) return '';
                    
                    return `
                    <button data-action="select-item-for-quantity" data-item-type="${type}" data-item-id="${item.id}" class="flex items-center gap-2 w-full p-2 bg-white border border-gray-200 rounded hover:border-indigo-300 shadow-sm transition-all text-left group">
                        <div class="flex-shrink-0 w-6 h-6 rounded bg-gray-50 flex items-center justify-center text-xs group-hover:bg-indigo-50">${icons[type]}</div>
                        <span class="flex-grow text-[10px] font-bold text-gray-700 truncate group-hover:text-indigo-700">${escapeHTML(item.name)}</span>
                        <span class="font-black text-[10px] text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200 whitespace-nowrap">R$ ${item.price.toFixed(2)}</span>
                    </button>
                `}).join('') || `<p class="text-[9px] font-bold uppercase tracking-widest text-gray-400 text-center py-4 border border-dashed border-gray-300 rounded-lg">Vazio</p>`;
            });
        };

        filterAndRender(); 
        const searchInput = document.getElementById('item-search-input');
        searchInput.addEventListener('input', debounce((e) => { filterAndRender(e.target.value); }, 300));
        setTimeout(() => searchInput.focus(), 100);
    };

    const renderQuantityView = (item) => {
        let quantity = 1;
        const contentContainer = modalElement.querySelector('#add-item-content');
        const updateDisplay = () => {
            document.getElementById('quantity-display').textContent = quantity;
            document.getElementById('quantity-minus-btn').disabled = quantity <= 1;
        };
        contentContainer.innerHTML = `
            <div class="text-center p-4 relative">
                <button data-action="back-to-catalog" class="absolute top-2 left-0 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-gray-800 bg-gray-100 px-2 py-1 rounded border border-gray-200 transition-colors flex items-center gap-1">
                    <i class="bi bi-arrow-left"></i> Voltar
                </button>
                <div class="mt-8 mb-4">
                    <h3 class="font-black text-lg text-gray-800 leading-tight">${escapeHTML(item.name)}</h3>
                    <p class="text-xs text-gray-500 font-bold mt-1 bg-gray-100 inline-block px-2 py-0.5 rounded-full border border-gray-200">R$ ${item.price.toFixed(2)} / un</p>
                </div>
                <div class="my-6 flex items-center justify-center gap-4">
                    <button id="quantity-minus-btn" class="w-10 h-10 rounded-lg bg-white border border-gray-300 text-lg font-black text-gray-600 hover:bg-gray-100 shadow-sm transition disabled:opacity-30"><i class="bi bi-dash"></i></button>
                    <span id="quantity-display" class="text-3xl font-black w-16 text-center text-indigo-600 bg-indigo-50 rounded-lg py-1 border border-indigo-100 shadow-inner">${quantity}</span>
                    <button id="quantity-plus-btn" class="w-10 h-10 rounded-lg bg-white border border-gray-300 text-lg font-black text-gray-600 hover:bg-gray-100 shadow-sm transition"><i class="bi bi-plus"></i></button>
                </div>
                <button data-action="confirm-add-item" class="w-full py-3 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-700 transition shadow-sm uppercase tracking-widest">Adicionar Item</button>
            </div>
        `;
        document.getElementById('quantity-minus-btn').onclick = () => { if (quantity > 1) { quantity--; updateDisplay(); } };
        document.getElementById('quantity-plus-btn').onclick = () => { quantity++; updateDisplay(); };
        
        document.querySelector('[data-action="confirm-add-item"]').onclick = async () => { 
            await handleAddItemToComanda(item, quantity);
            close(); 
        };
    };

    modalElement.addEventListener('click', (e) => {
        const selectBtn = e.target.closest('[data-action="select-item-for-quantity"]');
        const backBtn = e.target.closest('[data-action="back-to-catalog"]');
        if (selectBtn) {
            const { itemType, itemId } = selectBtn.dataset;
            const catalog = localState.catalog[itemType + 's'] || [];
            const item = catalog.find(i => i.id === itemId);
            if (item) renderQuantityView({...item, type: itemType});
        } else if (backBtn) renderCatalogView();
    });
    renderCatalogView();
}

async function openNewSaleModal(preSelectedClient = null) {
    if (!localState.isCashierOpen) return showNotification('Caixa Fechado', 'Abra o caixa antes de criar uma nova venda.', 'error');
    if (!state.professionals || state.professionals.length === 0) {
         try { state.professionals = await professionalsApi.getProfessionals(state.establishmentId); } 
         catch (err) { return showNotification('Erro', 'Não foi possível carregar profissionais.', 'error'); }
    }
    const professionalsOptions = state.professionals.map(p => `<option value="${p.id}">${escapeHTML(p.name)}</option>`).join('');
    const contentHTML = `
        <form id="new-sale-form" class="space-y-4">
            <div class="relative">
                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Cliente</label>
                <i class="bi bi-search absolute left-3 top-[28px] text-gray-400 text-xs"></i>
                <input type="text" id="client-search" class="w-full pl-8 p-2 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none text-xs font-semibold text-gray-800 transition-colors" placeholder="Digite nome ou telefone..." autocomplete="off">
                <input type="hidden" id="selected-client-id" required>
                <ul id="client-suggestions" class="hidden absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto mt-1 custom-scrollbar"></ul>
                <button type="button" data-action="new-client-from-sale" class="text-[10px] font-bold text-indigo-500 hover:text-indigo-700 uppercase tracking-widest mt-1.5 flex items-center gap-1 transition-colors"><i class="bi bi-person-plus-fill"></i> Cadastrar Novo Cliente</button>
            </div>
            <div>
                <label for="new-sale-professional" class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Profissional Atendente</label>
                <select id="new-sale-professional" required class="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 transition-colors">
                    <option value="">-- Selecione --</option>
                    ${professionalsOptions}
                </select>
            </div>
            <div class="pt-2">
                <button type="submit" id="btn-start-sale" class="w-full bg-indigo-600 text-white font-bold text-xs uppercase tracking-widest py-2.5 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500 transition shadow-sm flex items-center justify-center gap-1.5">
                    <i class="bi bi-cart-plus"></i> Iniciar Venda
                </button>
            </div>
        </form>
    `;
    const { modalElement } = showGenericModal({ title: "Nova Venda Avulsa", contentHTML: contentHTML, maxWidth: 'max-w-sm' });
    const searchInput = modalElement.querySelector('#client-search');
    const suggestionsList = modalElement.querySelector('#client-suggestions');
    const hiddenIdInput = modalElement.querySelector('#selected-client-id');
    
    if (preSelectedClient) {
        hiddenIdInput.value = preSelectedClient.id;
        searchInput.value = `${preSelectedClient.name} (${preSelectedClient.phone || 'Sem tel'})`;
        searchInput.classList.add('bg-green-50', 'border-green-300', 'text-green-800');
    }

    searchInput.addEventListener('input', debounce(async (e) => {
        const term = e.target.value.trim();
        hiddenIdInput.value = ''; searchInput.classList.remove('bg-green-50', 'border-green-300', 'text-green-800');
        if (term.length < 2) { suggestionsList.classList.add('hidden'); return; }
        try {
            suggestionsList.innerHTML = '<li class="p-2 text-xs text-gray-500 text-center"><div class="loader-small mx-auto"></div></li>';
            suggestionsList.classList.remove('hidden');
            const results = await clientsApi.getClients(state.establishmentId, term, 10);
            if (results.length === 0) suggestionsList.innerHTML = '<li class="p-3 text-xs font-bold text-gray-400 text-center uppercase tracking-widest">Nenhum cliente</li>';
            else {
                suggestionsList.innerHTML = results.map(c => `<li data-client-id="${c.id}" data-client-name="${c.name}" data-client-phone="${c.phone}" class="p-2 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors"><div class="font-bold text-xs text-gray-800">${escapeHTML(c.name)}</div><div class="text-[10px] font-medium text-gray-500"><i class="bi bi-telephone opacity-50 mr-1"></i>${c.phone || 'Sem telefone'}</div></li>`).join('');
            }
        } catch (err) { suggestionsList.classList.add('hidden'); }
    }, 400));

    suggestionsList.addEventListener('click', (e) => {
        const li = e.target.closest('li[data-client-id]');
        if (li) {
            hiddenIdInput.value = li.dataset.clientId;
            hiddenIdInput.dataset.name = li.dataset.clientName;
            hiddenIdInput.dataset.phone = li.dataset.clientPhone;
            searchInput.value = `${li.dataset.clientName}`;
            searchInput.classList.add('bg-green-50', 'border-green-300', 'text-green-800');
            suggestionsList.classList.add('hidden');
        }
    });
    document.addEventListener('click', (e) => { if (!searchInput.contains(e.target) && !suggestionsList.contains(e.target)) suggestionsList.classList.add('hidden'); });
    modalElement.querySelector('#new-sale-form').addEventListener('submit', handleCreateNewSale);
    const newClientBtn = modalElement.querySelector('[data-action="new-client-from-sale"]');
    if (newClientBtn) newClientBtn.addEventListener('click', (e) => { e.preventDefault(); modalElement.style.display = 'none'; _comandas_renderClientRegistrationModal(); });
}

function _comandas_renderClientRegistrationModal() {
    const modalContent = `
        <form id="comandas_clientRegistrationForm" class="flex flex-col h-full bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div class="grid grid-cols-1 gap-3 mb-4">
                <div>
                    <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Nome Completo *</label>
                    <input type="text" id="regClientName" required class="w-full p-2 rounded-lg border border-gray-300 text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 shadow-inner bg-white">
                </div>
                <div>
                    <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">WhatsApp (ID) *</label>
                    <input type="tel" id="regClientPhone" required class="w-full p-2 rounded-lg border border-gray-300 text-xs font-semibold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 shadow-inner bg-white" placeholder="Apenas números">
                </div>
            </div>
            <button type="submit" class="w-full py-2.5 bg-green-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-green-700 transition shadow-sm flex items-center justify-center gap-1.5">
                <i class="bi bi-save2"></i> Salvar Cliente
            </button>
        </form>
    `;
    showGenericModal({ title: 'Cadastrar Novo Cliente', contentHTML: modalContent, maxWidth: 'max-w-sm' });
    const form = document.getElementById('comandas_clientRegistrationForm');
    if (form) form.addEventListener('submit', _comandas_handleClientRegistration);
}

async function _comandas_handleClientRegistration(e) {
    e.preventDefault();
    const form = document.getElementById('comandas_clientRegistrationForm');
    if (!form) return;
    const nameInput = form.querySelector('#regClientName');
    const phoneInput = form.querySelector('#regClientPhone');
    const cleanPhone = phoneInput.value.replace(/\D/g, '');

    if (!nameInput.value || !cleanPhone) return showNotification('Erro', 'Nome e Telefone são obrigatórios.', 'error');

    try {
        const existingClient = await clientsApi.getClientByPhone(state.establishmentId, cleanPhone);
        if (existingClient) {
            showNotification('Atenção', `Cliente já cadastrado.`, 'info');
            document.getElementById('genericModal').style.display = 'none';
            openNewSaleModal(existingClient); 
        } else {
            const newClient = await clientsApi.createClient({ establishmentId: state.establishmentId, name: nameInput.value, phone: cleanPhone });
            showNotification('Sucesso', 'Cliente cadastrado!', 'success');
            document.getElementById('genericModal').style.display = 'none';
            openNewSaleModal(newClient);
        }
    } catch (error) { showNotification(`Erro`, error.message, 'error'); }
}

async function openCashierModal() {
    const contentHTML = `
        <form id="open-cashier-form" class="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div>
                <label for="initial-amount" class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 text-center">Fundo de Caixa (Troco Inicial)</label>
                <div class="relative max-w-xs mx-auto">
                    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-black text-sm">R$</span>
                    <input type="number" step="0.01" min="0" id="initial-amount" required class="w-full p-2 pl-9 border border-gray-300 rounded-lg text-lg font-black text-gray-900 bg-white focus:ring-2 focus:ring-green-500 outline-none shadow-inner text-center" placeholder="0.00" value="0.00">
                </div>
            </div>
            <button type="submit" class="w-full bg-green-600 text-white font-bold text-xs uppercase tracking-widest py-2.5 rounded-lg hover:bg-green-700 transition shadow-sm mt-4 flex items-center justify-center gap-1.5"><i class="bi bi-unlock-fill"></i> Confirmar Abertura</button>
        </form>
    `;
    const { modalElement } = showGenericModal({ title: "Abrir Caixa", contentHTML, maxWidth: 'max-w-xs' });
    modalElement.querySelector('#open-cashier-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const initialAmount = parseFloat(document.getElementById('initial-amount').value);
        if (isNaN(initialAmount) || initialAmount < 0) return showNotification('Valor Inválido', 'Insira um valor válido.', 'error');
        try {
            const session = await cashierApi.openCashier({ establishmentId: state.establishmentId, initialAmount: parseFloat(initialAmount.toFixed(2)) });
            localState.isCashierOpen = true; localState.activeCashierSessionId = session.id; document.getElementById('genericModal').style.display = 'none'; showNotification('Sucesso!', `Caixa aberto (R$ ${initialAmount.toFixed(2)})`, 'success'); updateCashierUIState(); await fetchAndDisplayData();
        } catch (error) { showNotification('Erro', `Falha ao abrir caixa: ${error.message}`, 'error'); }
    });
}

async function handleOpenCloseCashierModal() {
    const sessionId = localState.activeCashierSessionId;
    if (!sessionId) return;
    try {
        const report = await cashierApi.getCloseCashierReport(sessionId);
        const contentHTML = `
            <form id="close-cashier-form" class="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div class="grid grid-cols-2 gap-2 text-center mb-1">
                    <div class="bg-blue-50 p-2 rounded-lg border border-blue-100 shadow-sm"><p class="text-[9px] text-blue-500 uppercase font-bold tracking-widest mb-0.5">Abertura</p><p class="text-sm font-black text-blue-700">R$ ${report.initialAmount.toFixed(2)}</p></div>
                    <div class="bg-green-50 p-2 rounded-lg border border-green-100 shadow-sm"><p class="text-[9px] text-green-500 uppercase font-bold tracking-widest mb-0.5">Vendas Dinheiro</p><p class="text-sm font-black text-green-700">R$ ${report.cashSales.toFixed(2)}</p></div>
                </div>
                <div class="bg-gray-900 text-white p-3 rounded-xl text-center shadow-md mb-4 border border-gray-700">
                    <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Esperado em Gaveta</p>
                    <p class="text-3xl font-black tracking-tight text-white drop-shadow">R$ ${report.expectedAmount.toFixed(2)}</p>
                </div>
                
                <div class="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                    <label for="final-amount" class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 text-center">Contagem Final (Gaveta)</label>
                    <div class="relative max-w-xs mx-auto">
                        <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-black text-sm">R$</span>
                        <input type="number" step="0.01" min="0" id="final-amount" required class="w-full p-2 pl-9 border border-gray-300 rounded-lg text-lg font-black text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none shadow-inner text-center transition-colors" placeholder="0.00" value="${report.expectedAmount.toFixed(2)}">
                    </div>
                </div>
                <button type="submit" class="w-full bg-red-600 text-white font-bold text-xs uppercase tracking-widest py-2.5 rounded-lg hover:bg-red-700 transition shadow-sm mt-2 flex items-center justify-center gap-1.5"><i class="bi bi-lock-fill"></i> Confirmar Fecho</button>
            </form>
        `;
        const { modalElement } = showGenericModal({ title: "Fechar Caixa", contentHTML, maxWidth: 'max-w-sm' });
        modalElement.querySelector('#close-cashier-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const finalAmount = parseFloat(document.getElementById('final-amount').value);
            if (isNaN(finalAmount) || finalAmount < 0) return showNotification('Valor Inválido', 'Insira um valor final válido.', 'error');
            try {
                await cashierApi.closeCashier(sessionId, finalAmount);
                localState.isCashierOpen = false; localState.activeCashierSessionId = null; document.getElementById('genericModal').style.display = 'none'; updateCashierUIState(); await fetchAndDisplayData(); showNotification('Sucesso!', 'Caixa fechado com sucesso!', 'success');
            } catch (error) { showNotification('Erro', `Falha ao fechar caixa: ${error.message}`, 'error'); }
        });
    } catch (error) { showNotification('Erro', `Falha ao carregar relatório: ${error.message}`, 'error'); }
}

async function handleFilterClick(filter) {
    if (localState.activeFilter === filter) return;
    localState.activeFilter = filter;
    localState.paging.page = 1;
    
    updateFilterStyles();
    
    hideMobileDetail();
    localState.selectedComandaId = null;
    localState.viewMode = 'items';
    const listContainer = document.getElementById('comandas-list');
    if (listContainer) listContainer.innerHTML = '<div class="loader mx-auto mt-10"></div>';
    
    await fetchAndDisplayData();
}

function handleComandaClick(comandaId) {
    localState.selectedComandaId = comandaId;
    localState.viewMode = 'items';
    localState.pendingRedemption = null;
    localState.checkoutState.discount = { type: 'real', value: 0 };
    localState.checkoutState.discountReason = '';
    
    renderComandaList(); 
    showMobileDetail();
    renderComandaDetail();
}

async function handleAddItemToComanda(itemData, quantity) {
    const comanda = localState.allComandas.find(c => c.id === localState.selectedComandaId);
    if (!comanda) return;

    if (!itemData.id || String(itemData.id) === 'undefined') {
        showNotification('Erro', 'Item sem identificador. Não foi possível adicionar.', 'error');
        return;
    }

    const numericPrice = parseFloat(itemData.price) || 0;

    const itemsToAdd = Array(quantity).fill(0).map(() => {
        const baseItem = {
            id: String(itemData.id), 
            name: itemData.name,
            price: numericPrice, 
            type: itemData.type,
            isReward: itemData.isReward || false, 
            pointsCost: itemData.pointsCost || 0
        };
        
        if (itemData.type === 'product') {
            baseItem.productId = baseItem.id;
            baseItem.product_id = baseItem.id;
        } else if (itemData.type === 'service') {
            baseItem.serviceId = baseItem.id;
            baseItem.service_id = baseItem.id;
        }
        return baseItem;
    });
    
    comanda.comandaItems = comanda.comandaItems || [];
    comanda.comandaItems.push(...itemsToAdd);
    
    comanda._cachedItems = null;
    comanda._hasUnsavedChanges = true; 
    
    renderComandaDetail();
}

async function handleRemoveItemFromComanda(itemId, itemType) {
    const comanda = localState.allComandas.find(c => c.id === localState.selectedComandaId);
    if (!comanda) return;

    let modified = false;
    let extraIndex = (comanda.comandaItems || []).findIndex(item => item.id == itemId && item.type === itemType);
    
    if (extraIndex > -1) {
        comanda.comandaItems.splice(extraIndex, 1);
        modified = true;
    } 

    if (modified) {
        comanda._cachedItems = null;
        comanda._hasUnsavedChanges = true;
        renderComandaDetail();
    }
}

async function handleFinalizeCheckout(comanda) {
    if (localState.isProcessing) return;
    
    const rawItems = getSafeAllItems(comanda);
    const subtotal = rawItems.reduce((acc, item) => acc + Number(item.price || 0) * (item.quantity || 1), 0);
    const discount = localState.checkoutState.discount || { type: 'real', value: 0 };
    let discountValue = (discount.type === 'percent') ? (subtotal * discount.value) / 100 : discount.value;
    if (discountValue > subtotal) discountValue = subtotal;
    const totalAmount = subtotal - discountValue;

    const { payments } = localState.checkoutState;
    const totalPaid = payments.reduce((acc, p) => acc + p.value, 0);
    const remaining = totalAmount - totalPaid;

    if (remaining > 0.01) {
        const confirmed = await showConfirmation(
            'Pagamento Parcial', 
            `O valor de R$ ${remaining.toFixed(2)} não foi pago. Deseja registrar como DÍVIDA (Fiado) no cadastro do cliente?`,
            'Sim, registrar dívida'
        );

        if (!confirmed) return; 

        payments.push({
            method: 'fiado',
            value: remaining,
            installments: 1
        });
    }

    localState.isProcessing = true;

    const isAppointment = comanda.type === 'appointment';
    const finalItems = rawItems; 

    let pointsToAward = 0;
    const settings = localState.loyaltySettings;

    if (settings && settings.enabled) {
        pointsToAward = parseInt(settings.pointsPerVisit || 1, 10);
    }

    const enrichedDiscount = {
        ...discount,
        reason: localState.checkoutState.discountReason || '' 
    };

    const data = {
        payments,
        totalAmount: Number(totalAmount),
        items: finalItems,
        cashierSessionId: localState.activeCashierSessionId,
        loyaltyPointsEarned: pointsToAward,
        discount: enrichedDiscount,
        loyaltyRedemption: localState.pendingRedemption 
    };

    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'fixed inset-0 bg-gray-900/50 z-[9999] flex items-center justify-center backdrop-blur-sm';
    loadingOverlay.innerHTML = '<div class="bg-white p-5 rounded-2xl shadow-xl flex flex-col items-center"><div class="loader mb-3"></div><p class="text-sm font-bold text-gray-800">Finalizando venda...</p></div>';
    document.body.appendChild(loadingOverlay);

    try {
        if (isAppointment) await appointmentsApi.checkoutAppointment(comanda.id, data);
        else {
            data.establishmentId = state.establishmentId;
            data.clientId = comanda.clientId; data.clientName = comanda.clientName; data.professionalId = comanda.professionalId;
            if (comanda.clientPhone) data.clientPhone = comanda.clientPhone;
            await salesApi.createSale(data);
        }

        // --- INTEGRAÇÃO FINANCEIRA AUTOMÁTICA ---
        try {
            const clientEntity = comanda.clientName ? `${comanda.clientName} ${comanda.clientPhone ? '- ' + comanda.clientPhone : ''}`.trim() : 'Cliente Avulso';
            
            // Busca o config que deixámos no LocalState para pegar a Natureza
            const config = localState.establishmentConfig || {};
            const defNature = config.defaultReceitaNaturezaId || config.financeConfig?.receitaNaturezaId || null;
            const defCostCenter = config.defaultReceitaCentroCustoId || config.financeConfig?.receitaCentroCustoId || null;
            
            for (const p of payments) {
                if (p.method === 'fiado') continue; 
                await financialApi.createReceivable({
                    establishmentId: state.establishmentId,
                    description: `Comanda - ${comanda.clientName || 'Avulso'}`,
                    amount: p.value,
                    dueDate: new Date().toISOString().split('T')[0],
                    naturezaId: defNature,
                    centroDeCustoId: defCostCenter,
                    entity: clientEntity,
                    paymentMethod: p.method,
                    status: 'paid',
                    paymentDate: new Date().toISOString().split('T')[0],
                    origin: 'comanda'
                });
            }
        } catch (finErr) {
            console.error("Erro na integração com o financeiro:", finErr);
        }
        
        let msg = 'Venda finalizada com sucesso!';
        if (pointsToAward > 0) msg += ` Cliente ganhou ${pointsToAward} pontos!`;

        showNotification('Sucesso!', msg, 'success');
        
        hideMobileDetail();
        localState.selectedComandaId = null;
        localState.viewMode = 'items';
        localState.pendingRedemption = null;
        await fetchAndDisplayData(); 
    } catch (error) { 
        showNotification('Erro no Checkout', error.message, 'error'); 
    } finally { 
        if(document.body.contains(loadingOverlay)) document.body.removeChild(loadingOverlay);
        localState.isProcessing = false; 
    }
}

async function handleCreateNewSale(e) {
    e.preventDefault();
    const hiddenIdInput = document.getElementById('selected-client-id');
    const professionalId = document.getElementById('new-sale-professional').value;
    const clientId = hiddenIdInput.value;
    const clientName = document.getElementById('client-search').value;
    const clientPhone = hiddenIdInput.dataset.phone || '';

    if (!clientId) return showNotification('Erro', 'Selecione um cliente válido.', 'error');
    const professional = state.professionals.find(p => p.id === professionalId);
    if (!professional) return showNotification('Erro', 'Selecione um profissional válido.', 'error');
    
    const newComanda = {
        id: `temp-${Date.now()}`,
        type: 'walk-in',
        clientId: clientId, 
        clientName: clientName.split('(')[0].trim(),
        clientPhone: clientPhone,
        professionalId: professional.id,
        professionalName: professional.name,
        startTime: new Date(),
        status: 'confirmed',
        services: [],
        comandaItems: [],
    };

    localState.allComandas.unshift(newComanda);
    localState.selectedComandaId = newComanda.id;
    localState.viewMode = 'items';
    document.getElementById('genericModal').style.display = 'none';
    
    if(localState.activeFilter === 'pagas') localState.activeFilter = 'abertas';
    updateFilterStyles();
    
    handleComandaClick(newComanda.id);
}

async function fetchAndDisplayData() {
    const listContainer = document.getElementById('comandas-list');
    
    if (!listContainer.hasChildNodes() || listContainer.innerHTML.includes('loader')) {
        listContainer.innerHTML = '<div class="loader mx-auto mt-10"></div>';
    }
    
    const filterDate = localState.showHistoryDate ? document.getElementById('filter-date').value : null;

    try {
        const sessionPromise = cashierApi.getActiveSession();
        const comandasPromise = comandasApi.getComandas(state.establishmentId, filterDate, localState.paging.page, localState.paging.limit);
        const loyaltyPromise = establishmentsApi.getEstablishmentDetails(state.establishmentId);

        const [activeSession, response, establishmentData] = await Promise.all([
            sessionPromise,
            comandasPromise,
            loyaltyPromise
        ]);

        // Grava as configurações gerais do estabelecimento para integrar Natureza e Centro de Custo no Financeiro
        localState.establishmentConfig = establishmentData || {}; 

        localState.isCashierOpen = !!activeSession;
        localState.activeCashierSessionId = activeSession ? activeSession.id : null;
        updateCashierUIState();
        
        if (establishmentData && establishmentData.loyaltyProgram) {
            localState.loyaltySettings = establishmentData.loyaltyProgram;
        }

        localState.allComandas = response.data || response || [];
        localState.paging.total = response.total || localState.allComandas.length;
        
        if (localState.catalog.services.length === 0) {
            const [services, products, packages, professionals] = await Promise.all([
                servicesApi.getServices(state.establishmentId),
                productsApi.getProducts(state.establishmentId),
                packagesApi.getPackages(state.establishmentId),
                professionalsApi.getProfessionals(state.establishmentId)
            ]);
            localState.catalog = { services, products, packages };
            state.professionals = professionals;
        }
        
        renderComandaList();
        renderComandaDetail();

    } catch (error) {
        showNotification('Erro', `Não foi possível carregar os dados: ${error.message}`, 'error');
    }
}

export async function loadComandasPage(params = {}) {
    contentDiv = document.getElementById('content');
    localState.selectedComandaId = params.selectedAppointmentId || null;
    localState.viewMode = 'items';
    
    renderPageLayout();

    if (pageEventListener) {
        contentDiv.removeEventListener('click', pageEventListener);
        contentDiv.removeEventListener('change', pageEventListener);
    }

    pageEventListener = async (e) => {
        const target = e.target.closest('[data-action], [data-filter], [data-comanda-id]');
        const dateInput = e.target.id === 'filter-date';

        if (dateInput) {
             localState.paging.page = 1;
             await fetchAndDisplayData();
             return;
        }

        if (!target) return;
        
        if (target.matches('[data-filter]')) {
            handleFilterClick(target.dataset.filter);
        } else if (target.matches('[data-comanda-id]')) {
            if (e.target.closest('[data-action="go-to-appointment"]')) { e.stopPropagation(); return; }
            handleComandaClick(target.dataset.comandaId);
        } else if (target.matches('[data-action]')) {
            const action = target.dataset.action;
            const comandaId = target.dataset.id || localState.selectedComandaId;
            const comanda = localState.allComandas.find(c => c.id === comandaId);

            switch (action) {
                case 'toggle-history':
                    localState.showHistoryDate = !localState.showHistoryDate;
                    if(localState.showHistoryDate && localState.activeFilter === 'abertas') {
                        localState.activeFilter = 'todas';
                    }
                    updateFilterStyles();
                    if(!localState.showHistoryDate) {
                        await fetchAndDisplayData();
                    }
                    break;
                    
                case 'back-to-list': hideMobileDetail(); localState.selectedComandaId = null; document.querySelectorAll('.comanda-card').forEach(el => el.classList.remove('selected', 'ring-2', 'ring-indigo-500', 'bg-indigo-50/50')); document.querySelectorAll('.comanda-card').forEach(el => el.classList.add('bg-white')); renderComandaDetail(); break;
                case 'new-sale': openNewSaleModal(); break;
                case 'add-item': openAddItemModal(); break;
                case 'open-cashier': openCashierModal(); break;
                case 'close-cashier': await handleOpenCloseCashierModal(); break;
                case 'view-sales-report': navigateTo('sales-report-section'); break;
                
                case 'go-to-checkout':
                    await executeSaveAction(comanda, 'checkout');
                    break;
                    
                case 'back-to-items':
                    localState.viewMode = 'items';
                    renderComandaDetail();
                    break;

                case 'save-comanda':
                    await executeSaveAction(comanda, 'stay');
                    break;

                case 'select-method':
                    localState.checkoutState.selectedMethod = target.dataset.method;
                    localState.checkoutState.installments = 1;
                    renderComandaDetail();
                    break;
                
                case 'add-payment-checkout':
                    const amountInput = document.getElementById('checkout-amount');
                    let value = parseFloat(amountInput.value);
                    const rawItems = getSafeAllItems(comanda);
                    
                    const subtotal = rawItems.reduce((acc, item) => acc + (item.price || 0), 0);
                    const discount = localState.checkoutState.discount || { type: 'real', value: 0 };
                    let discountValue = (discount.type === 'percent') ? (subtotal * discount.value) / 100 : discount.value;
                    if (discountValue > subtotal) discountValue = subtotal;
                    const total = subtotal - discountValue;

                    const currentPaid = localState.checkoutState.payments.reduce((acc,p)=>acc+p.value,0);
                    const remaining = total - currentPaid;

                    if (isNaN(value) || value <= 0) { showNotification('Valor inválido', 'Insira um valor maior que zero.', 'error'); break; }
                    if (value > remaining + 0.05) { showNotification('Valor inválido', 'Valor excede o restante.', 'error'); break; }

                    const newPayment = { method: localState.checkoutState.selectedMethod, value: value };
                    if (['credito', 'crediario'].includes(localState.checkoutState.selectedMethod) && localState.checkoutState.installments > 1) {
                        newPayment.installments = localState.checkoutState.installments;
                    }
                    
                    localState.checkoutState.payments.push(newPayment);
                    localState.checkoutState.selectedMethod = 'dinheiro'; 
                    localState.checkoutState.installments = 1;
                    localState.checkoutState.amountReceived = '';
                    renderComandaDetail();
                    break;

                case 'remove-payment-checkout':
                    const idx = parseInt(target.dataset.index, 10);
                    localState.checkoutState.payments.splice(idx, 1);
                    renderComandaDetail();
                    break;

                case 'finalize-checkout':
                    await handleFinalizeCheckout(comanda);
                    break;

                case 'increase-qty': {
                    const itemId = target.dataset.itemId;
                    const itemType = target.dataset.itemType;
                    
                    if (!itemId || itemId === 'undefined' || itemId === 'null') {
                        showNotification('Erro', 'Item inválido.', 'error');
                        return;
                    }
                    
                    const existingItems = getSafeAllItems(comanda);
                    let itemToClone = existingItems.find(i => i.id == itemId && i.type === itemType);

                    if (!itemToClone) {
                        const catalog = localState.catalog[itemType + 's'] || [];
                        itemToClone = catalog.find(i => i.id == itemId);
                    }

                    const safeItem = itemToClone 
                        ? { id: itemToClone.id, name: itemToClone.name, price: Number(itemToClone.price), type: itemToClone.type } 
                        : { id: itemId, name: 'Item', price: 0, type: itemType };

                    await handleAddItemToComanda(safeItem, 1);
                    break;
                }
                case 'decrease-qty': await handleRemoveItemFromComanda(target.dataset.itemId, target.dataset.itemType); break;
                case 'remove-item': await handleRemoveItemFromComanda(target.dataset.itemId, target.dataset.itemType); break;
                
                case 'reopen-appointment': {
                    const confirmed = await showConfirmation('Reabrir Comanda', 'Tem certeza? O pagamento será estornado.');
                    if (confirmed) {
                        try {
                            await appointmentsApi.reopenAppointment(comandaId);
                            const idx = localState.allComandas.findIndex(c => c.id === comandaId);
                            if (idx !== -1) { localState.allComandas[idx].status = 'confirmed'; delete localState.allComandas[idx].transaction; }
                            localState.selectedComandaId = null; hideMobileDetail(); await fetchAndDisplayData(); showNotification('Sucesso!', 'Comanda reaberta.', 'success');
                        } catch (error) { showNotification('Erro', error.message, 'error'); }
                    }
                    break;
                }
                case 'go-to-appointment': {
                    navigateTo('agenda-section', { scrollToAppointmentId: target.dataset.id, targetDate: new Date(target.dataset.date) });
                    break;
                }
                case 'delete-walk-in': {
                    const confirmed = await showConfirmation('Excluir Venda', 'Confirma a exclusão desta venda avulsa?');
                    if (confirmed) {
                        if (comandaId.startsWith('temp-')) {
                            localState.allComandas = localState.allComandas.filter(c => c.id !== comandaId);
                            localState.selectedComandaId = null; renderComandaList(); renderComandaDetail(); hideMobileDetail();
                        } else {
                            try {
                                await salesApi.deleteSale(comandaId);
                                showNotification('Sucesso', 'Venda excluída.', 'success');
                                localState.selectedComandaId = null; hideMobileDetail(); await fetchAndDisplayData();
                            } catch (error) { showNotification('Erro', error.message, 'error'); }
                        }
                    }
                    break;
                }
            }
        }
    };
    
    contentDiv.addEventListener('click', pageEventListener);
    contentDiv.addEventListener('change', pageEventListener);

    if (params.initialFilter) {
        if(params.initialFilter === 'finalizadas') localState.activeFilter = 'pagas';
        else localState.activeFilter = 'abertas';
    }
    
    if (params.selectedAppointmentId) localState.selectedComandaId = params.selectedAppointmentId;
    if (params.filterDate) {
        document.getElementById('filter-date').value = new Date(params.filterDate).toISOString().split('T')[0];
        localState.showHistoryDate = true;
    }

    await fetchAndDisplayData();
}