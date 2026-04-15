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
    selectedCatalogItem: null, 
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
    showHistoryPanel: false, 
    filterStartDate: '',
    filterEndDate: '',
    filterPreset: 'hoje' 
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

function getDatesForPreset(preset) {
    const today = new Date();
    let start, end;
    
    if (preset === 'hoje') {
        start = new Date();
        end = new Date();
    } else if (preset === 'este_mes') {
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    } else if (preset === 'mes_passado') {
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
    } else {
        start = new Date(); 
        end = new Date();
    }

    const toYMD = (d) => {
        const tzOffset = d.getTimezoneOffset() * 60000;
        return new Date(d - tzOffset).toISOString().split('T')[0];
    };

    return { start: toYMD(start), end: toYMD(end) };
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
    loadingOverlay.className = 'fixed inset-0 bg-gray-900/60 z-[999999] flex items-center justify-center backdrop-blur-sm';
    loadingOverlay.innerHTML = `
        <div class="bg-white p-6 rounded-3xl shadow-2xl flex flex-col items-center animate-fade-in border border-gray-100">
            <div class="loader mb-4"></div>
            <p class="text-gray-800 font-black text-sm uppercase tracking-widest">Sincronizando...</p>
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
            showNotification('Sucesso', 'Comanda atualizada e salva!', 'success');
            renderComandaDetail();
        }

    } catch (error) {
        if(document.body.contains(loadingOverlay)) document.body.removeChild(loadingOverlay);
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

// --- LÓGICA DE SCREEN SWAP 100% NATIVA ---
function showMobileDetail() {
    const layout = document.getElementById('comandas-layout');
    if (layout) layout.classList.add('mobile-detail-open');
    const bottomNav = document.getElementById('mobile-bottom-nav');
    if (bottomNav) bottomNav.style.display = 'none';
}

function hideMobileDetail() {
    const layout = document.getElementById('comandas-layout');
    if (layout) layout.classList.remove('mobile-detail-open');
    const bottomNav = document.getElementById('mobile-bottom-nav');
    if (bottomNav) bottomNav.style.display = '';
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
    contentDiv.innerHTML = `
        <style id="comandas-mobile-css">
            @media (max-width: 767px) {
                .mobile-detail-open #comandas-list-column { display: none !important; }
                #comandas-layout:not(.mobile-detail-open) #comanda-detail-container { display: none !important; }
                .mobile-detail-open #comanda-detail-container {
                    display: flex !important;
                    position: fixed !important;
                    top: 0; left: 0; right: 0; bottom: 0;
                    height: 100dvh !important;
                    width: 100vw !important;
                    z-index: 99999 !important;
                    background-color: #f8fafc !important;
                    flex-direction: column !important;
                }
            }
            #toast-container, .toast-notification, .modal, .modal-backdrop, .modal-dialog, [id*="modal"], [id*="Modal"] { z-index: 9999999 !important; }
        </style>
        
        <section class="h-full flex flex-col p-2 md:p-4 md:pl-6 w-full relative">
            
            <div id="cashier-controls" class="flex items-center gap-2 mb-2">
                <div class="loader-sm"></div>
            </div>

            <div class="grid grid-cols-2 gap-2 mb-2 animate-fade-in w-full">
                <button id="btn-new-sale" data-action="new-sale" class="bg-indigo-600 text-white rounded-xl p-3 flex items-center justify-center shadow-md active:scale-95 transition-transform border border-indigo-700 gap-2">
                    <i class="bi bi-cart-plus text-xl drop-shadow-md"></i>
                    <span class="font-black text-xs uppercase tracking-widest leading-none mt-0.5">Nova Venda</span>
                </button>
                <button data-action="toggle-history" class="bg-white text-gray-700 rounded-xl p-3 flex items-center justify-center shadow-sm border border-gray-200 active:scale-95 transition-transform hover:bg-gray-50 gap-2">
                    <i class="bi bi-clock-history text-xl text-indigo-500"></i>
                    <span class="font-black text-xs uppercase tracking-widest leading-none mt-0.5">Histórico</span>
                </button>
            </div>

            <div id="cashier-alert-box"></div>

            <div id="history-panel" class="${localState.showHistoryPanel ? 'block' : 'hidden'} bg-white p-3 rounded-xl border border-gray-200 shadow-sm mb-2 animate-fade-in">
                <h4 class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Período de Busca</h4>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                    <button data-action="set-period" data-period="hoje" class="period-btn py-2 text-[10px] font-bold rounded-lg border transition-colors ${localState.filterPreset === 'hoje' ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-white'}">Hoje</button>
                    <button data-action="set-period" data-period="este_mes" class="period-btn py-2 text-[10px] font-bold rounded-lg border transition-colors ${localState.filterPreset === 'este_mes' ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-white'}">Este Mês</button>
                    <button data-action="set-period" data-period="mes_passado" class="period-btn py-2 text-[10px] font-bold rounded-lg border transition-colors ${localState.filterPreset === 'mes_passado' ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-white'}">Mês Passado</button>
                    <button data-action="set-period" data-period="custom" class="period-btn py-2 text-[10px] font-bold rounded-lg border transition-colors ${localState.filterPreset === 'custom' ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-white'}">Personalizado</button>
                </div>
                
                <div id="custom-date-fields" class="${localState.filterPreset === 'custom' ? 'flex' : 'hidden'} gap-2 items-end p-2 bg-gray-50 rounded-lg border border-gray-100 flex-wrap sm:flex-nowrap">
                    <div class="flex-1 min-w-[100px]">
                        <label class="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1 ml-1">Início</label>
                        <input type="date" id="filter-start-date" value="${localState.filterStartDate}" class="w-full p-2 border border-gray-300 rounded-lg bg-white text-xs font-bold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm">
                    </div>
                    <div class="flex-1 min-w-[100px]">
                        <label class="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1 ml-1">Fim</label>
                        <input type="date" id="filter-end-date" value="${localState.filterEndDate}" class="w-full p-2 border border-gray-300 rounded-lg bg-white text-xs font-bold text-gray-800 outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm">
                    </div>
                    <button data-action="apply-custom-dates" class="h-[38px] w-full sm:w-auto px-4 bg-indigo-600 text-white font-black text-xs rounded-lg hover:bg-indigo-700 shadow-sm active:scale-95 transition-transform uppercase tracking-wider flex items-center justify-center gap-1.5 mt-1 sm:mt-0">
                        <i class="bi bi-search"></i> Buscar
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-4 gap-2 mb-3 animate-fade-in w-full">
                <div class="bg-white p-2 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
                    <span class="text-[9px] font-bold text-gray-400 uppercase tracking-widest w-full truncate">Abertas</span>
                    <span id="kpi-abertas" class="text-sm md:text-base font-black text-indigo-600 mt-0.5 w-full truncate">0</span>
                </div>
                <div class="bg-white p-2 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
                    <span class="text-[9px] font-bold text-gray-400 uppercase tracking-widest w-full truncate">Vendas</span>
                    <span id="kpi-vendas" class="text-sm md:text-base font-black text-emerald-600 mt-0.5 w-full truncate">R$ 0,00</span>
                </div>
                <div class="bg-white p-2 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
                    <span class="text-[9px] font-bold text-gray-400 uppercase tracking-widest w-full truncate">Pagas</span>
                    <span id="kpi-pagas" class="text-sm md:text-base font-black text-gray-800 mt-0.5 w-full truncate">0</span>
                </div>
                <div class="bg-white p-2 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
                    <span class="text-[9px] font-bold text-gray-400 uppercase tracking-widest w-full truncate">Ticket</span>
                    <span id="kpi-ticket" class="text-sm md:text-base font-black text-blue-600 mt-0.5 w-full truncate">R$ 0,00</span>
                </div>
            </div>

            <div id="comandas-layout" class="flex-1 flex gap-3 min-h-0 w-full animate-fade-in relative overflow-hidden">
                
                <div id="comandas-list-column" class="flex flex-col bg-transparent md:bg-white md:border md:border-gray-200 rounded-xl md:shadow-sm h-full w-full md:w-80 lg:w-96 flex-shrink-0 transition-all duration-300 z-10">
                    
                    <div class="sticky top-0 z-20 bg-slate-50 md:bg-white pt-1 pb-3 px-1 md:px-3 md:pt-3 border-b border-transparent md:border-gray-100 flex gap-2 overflow-x-auto custom-scrollbar flex-shrink-0">
                        <button data-filter="todas" class="filter-btn flex-1 px-3 py-2 text-xs font-black rounded-xl border text-gray-600 border-gray-200 hover:bg-gray-50 transition whitespace-nowrap shadow-sm uppercase tracking-wider">Todas</button>
                        <button data-filter="abertas" class="filter-btn flex-1 px-3 py-2 text-xs font-black rounded-xl border text-gray-600 border-gray-200 hover:bg-gray-50 transition whitespace-nowrap shadow-sm uppercase tracking-wider">Abertas</button>
                        <button data-filter="pagas" class="filter-btn flex-1 px-3 py-2 text-xs font-black rounded-xl border text-gray-600 border-gray-200 hover:bg-gray-50 transition whitespace-nowrap shadow-sm uppercase tracking-wider">Pagas</button>
                    </div>

                    <div id="comandas-list" class="space-y-2 overflow-y-auto custom-scrollbar flex-1 px-1 md:px-3 pb-4">
                        <div class="loader mx-auto mt-10"></div>
                    </div>
                    <div id="pagination-container" class="p-2 border-t border-gray-100 bg-gray-50/50 flex-shrink-0 flex justify-center items-center rounded-b-xl"></div>
                </div>

                <div id="comanda-detail-container" class="bg-slate-50 md:bg-white border-0 md:border md:border-gray-200 md:rounded-2xl shadow-sm flex-col overflow-hidden hidden md:flex flex-1 min-w-0 transition-all duration-300 h-full z-20">
                    <div class="flex flex-col items-center justify-center h-full text-center text-gray-400">
                        <i class="bi bi-receipt text-5xl opacity-20 mb-3"></i>
                        <p class="text-base font-medium">Selecione uma comanda</p>
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
        btn.classList.remove('bg-indigo-600', 'text-white', 'border-indigo-600');
        btn.classList.add('bg-white', 'text-gray-600', 'border-gray-200');
    });
    const activeBtn = document.querySelector(`[data-filter="${localState.activeFilter}"]`);
    if(activeBtn) {
        activeBtn.classList.remove('bg-white', 'text-gray-600', 'border-gray-200');
        activeBtn.classList.add('bg-indigo-600', 'text-white', 'border-indigo-600');
    }
}

function updateCashierUIState() {
    const alertBox = document.getElementById('cashier-alert-box');
    const newSaleBtn = document.getElementById('btn-new-sale');

    if (!localState.isCashierOpen) {
        if (alertBox) alertBox.innerHTML = `
            <div class="bg-amber-50 border-l-4 border-amber-400 p-3 mb-3 rounded-r-xl animate-fade-in mx-1 shadow-sm">
                <div class="flex items-center">
                    <i class="bi bi-exclamation-triangle text-amber-500 mr-3 text-lg"></i>
                    <p class="text-xs md:text-sm text-amber-800 leading-tight">
                        <strong>Caixa Fechado!</strong> Abra o caixa para operações financeiras.
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
            <span class="hidden sm:inline-block text-[10px] font-bold text-emerald-700 bg-emerald-100 py-1.5 px-3 rounded-xl border border-emerald-200 uppercase tracking-widest shadow-sm"><i class="bi bi-unlock-fill"></i> Caixa Aberto</span>
            <button data-action="close-cashier" class="py-1.5 px-4 bg-red-50 text-red-700 border border-red-200 font-bold rounded-xl hover:bg-red-100 text-[10px] transition shadow-sm uppercase tracking-wider">Fechar Caixa</button>
        `;
    } else {
        container.innerHTML = `
            <span class="hidden sm:inline-block text-[10px] font-bold text-red-700 bg-red-100 py-1.5 px-3 rounded-xl border border-red-200 uppercase tracking-widest shadow-sm"><i class="bi bi-lock-fill"></i> Caixa Fechado</span>
            <button data-action="open-cashier" class="py-1.5 px-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 text-[10px] shadow-sm transition uppercase tracking-wider">Abrir Caixa</button>
        `;
    }
}

function renderComandaList() {
    const listContainer = document.getElementById('comandas-list');
    const paginationContainer = document.getElementById('pagination-container');
    
    if (!listContainer) return;
    
    if (!localState.isCashierOpen && localState.activeFilter === 'abertas') {
        listContainer.innerHTML = `
            <div class="text-center py-12 opacity-60">
                <i class="bi bi-lock text-4xl text-gray-300 mb-3 block"></i>
                <p class="text-sm font-bold text-gray-600 uppercase tracking-widest">Caixa Fechado</p>
                <p class="text-xs text-gray-500 mt-2">Abra o caixa para ver as vendas</p>
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
        listContainer.innerHTML = `<p class="text-center text-gray-400 py-12 text-sm font-medium border border-dashed border-gray-200 rounded-2xl mx-2">Nenhuma comanda encontrada.</p>`;
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
            ? `<span class="inline-flex items-center justify-center bg-yellow-100 text-yellow-700 rounded-full w-5 h-5 ml-1.5 text-xs shadow-sm border border-yellow-200" title="Prémio Resgatado">🎁</span>` 
            : '';

        const isSelected = String(comanda.id) === String(localState.selectedComandaId);
        
        const dateObj = new Date(comanda.startTime);
        const timeStr = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        const dateStr = dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

        const isWalkIn = comanda.type === 'walk-in' || (typeof comanda.id === 'string' && comanda.id.startsWith('temp-'));
        const isCompleted = comanda.status === 'completed';

        const safeClientName = escapeHTML(comanda.clientName || 'Cliente sem nome');
        const safeProfName = escapeHTML(comanda.professionalName || 'Sem profissional');
        
        let typeIndicator = '';
        if(isCompleted) {
            typeIndicator = `<span class="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200">Paga</span>`;
        } else if (isWalkIn) {
            typeIndicator = `<span class="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md border border-blue-200">Avulsa</span>`;
        } else {
            typeIndicator = `<span class="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200">Agenda</span>`;
        }

        const div = document.createElement('div');
        div.className = `comanda-card cursor-pointer border rounded-2xl p-3.5 hover:bg-gray-50 transition-all shadow-sm mb-2 ${isSelected ? 'ring-2 ring-indigo-500 bg-indigo-50/50 border-transparent' : 'bg-white border-gray-200'}`;
        div.dataset.action = 'select-comanda';
        div.dataset.comandaId = comanda.id;
        div.innerHTML = `
            <div class="flex justify-between items-start mb-2.5 pointer-events-none">
                <p class="font-bold text-gray-900 truncate flex-1 min-w-0 pr-2 text-base">${safeClientName}</p>
                <div class="flex items-center flex-shrink-0">
                    <p class="font-black ${isCompleted ? 'text-emerald-600' : 'text-gray-900'} text-base">R$ ${displayTotal.toFixed(2)}</p>
                    ${rewardIndicator}
                </div>
            </div>
            <div class="flex justify-between items-center mt-1 pointer-events-none gap-2">
                <div class="flex items-center gap-2 min-w-0 flex-1">
                    ${typeIndicator}
                    <p class="text-xs text-gray-500 truncate font-medium"><i class="bi bi-person mr-1 opacity-50"></i>${safeProfName}</p>
                </div>
                <p class="text-xs text-gray-500 font-bold flex-shrink-0"><i class="bi bi-calendar-event mr-1 opacity-50"></i>${dateStr} <span class="text-gray-300 mx-1">|</span> ${timeStr}</p> 
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
    div.className = "flex gap-2 justify-center items-center w-full py-1";
    div.innerHTML = `
        <button data-page="${page - 1}" class="w-8 h-8 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-sm font-black text-gray-600 shadow-sm flex items-center justify-center ${page <= 1 ? 'opacity-50 cursor-not-allowed' : ''}" ${page <= 1 ? 'disabled' : ''}>&laquo;</button>
        <span class="text-[10px] font-bold uppercase tracking-widest text-gray-500 mx-2">Pág ${page} de ${totalPages || 1}</span>
        <button data-page="${page + 1}" class="w-8 h-8 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-sm font-black text-gray-600 shadow-sm flex items-center justify-center ${page >= totalPages ? 'opacity-50 cursor-not-allowed' : ''}" ${page >= totalPages ? 'disabled' : ''}>&raquo;</button>
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

function renderAddItemView(comanda, container) {
    const mobileHeaderHTML = `
        <div class="p-4 border-b border-gray-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50 rounded-t-2xl">
            <button data-action="back-to-items" class="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 shadow-inner active:scale-90 transition-transform">
                <i class="bi bi-arrow-left text-xl"></i>
            </button>
            <h3 class="font-black text-lg text-gray-800 ml-4 uppercase tracking-wider">Catálogo</h3>
        </div>
    `;

    container.innerHTML = `
        ${mobileHeaderHTML}
        <div class="flex-grow overflow-y-auto p-4 custom-scrollbar bg-slate-50 relative flex flex-col">
            <div class="relative mb-5 flex-shrink-0">
                <i class="bi bi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                <input type="search" id="item-search-input" placeholder="Pesquisar produto ou serviço..." class="w-full pl-12 p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-white transition-colors shadow-sm font-bold text-gray-700">
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-grow overflow-y-auto pb-8">
                <div class="bg-white p-3 rounded-2xl border border-gray-200 shadow-sm"><h4 class="font-black mb-3 text-center text-xs uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 py-2.5 rounded-xl"><i class="bi bi-scissors mr-1"></i> Serviços</h4><div id="catalog-service-list" class="space-y-2"></div></div>
                <div class="bg-white p-3 rounded-2xl border border-gray-200 shadow-sm"><h4 class="font-black mb-3 text-center text-xs uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-100 py-2.5 rounded-xl"><i class="bi bi-box-seam mr-1"></i> Produtos</h4><div id="catalog-product-list" class="space-y-2"></div></div>
                <div class="bg-white p-3 rounded-2xl border border-gray-200 shadow-sm"><h4 class="font-black mb-3 text-center text-xs uppercase tracking-widest text-purple-700 bg-purple-50 border border-purple-100 py-2.5 rounded-xl"><i class="bi bi-boxes mr-1"></i> Pacotes</h4><div id="catalog-package-list" class="space-y-2"></div></div>
            </div>
        </div>
    `;

    const filterAndRender = (term = '') => {
        const lowerTerm = term.toLowerCase();
        const icons = {
            service: '<i class="bi bi-scissors text-indigo-600"></i>',
            product: '<i class="bi bi-box-seam text-emerald-600"></i>',
            package: '<i class="bi bi-boxes text-purple-600"></i>'
        };
        const lists = {
            'catalog-service-list': { items: localState.catalog.services, type: 'service' },
            'catalog-product-list': { items: localState.catalog.products, type: 'product' },
            'catalog-package-list': { items: localState.catalog.packages, type: 'package' }
        };
        Object.entries(lists).forEach(([id, { items, type }]) => {
            const el = container.querySelector('#' + id);
            if (!el) return;
            const filtered = items.filter(i => i.name.toLowerCase().includes(lowerTerm)).slice(0, 50);
            el.innerHTML = filtered.map(item => {
                if (!item.id) return '';
                
                return `
                <button data-action="select-catalog-item" data-item-type="${type}" data-item-id="${item.id}" class="flex items-center gap-3 w-full p-3 bg-white border border-gray-200 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 shadow-sm transition-all text-left group active:scale-95">
                    <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-lg border border-gray-100 group-hover:bg-white">${icons[type]}</div>
                    <span class="flex-grow text-sm font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-indigo-700">${escapeHTML(item.name)}</span>
                    <span class="font-black text-sm text-gray-900 bg-gray-100 px-2.5 py-1.5 rounded-lg border border-gray-200 whitespace-nowrap group-hover:bg-white group-hover:text-indigo-700">R$ ${item.price.toFixed(2)}</span>
                </button>
            `}).join('') || `<p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 text-center py-6 border border-dashed border-gray-300 rounded-xl">Vazio</p>`;
        });
    };

    filterAndRender(); 
    const searchInput = container.querySelector('#item-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => { filterAndRender(e.target.value); }, 300));
    }
}

function renderQuantityView(comanda, container) {
    const item = localState.selectedCatalogItem;
    if (!item) {
        localState.viewMode = 'add-item';
        renderComandaDetail();
        return;
    }

    let quantity = 1;
    
    const mobileHeaderHTML = `
        <div class="p-4 border-b border-gray-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50 rounded-t-2xl">
            <button data-action="back-to-add-item" class="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 shadow-inner active:scale-90 transition-transform">
                <i class="bi bi-arrow-left text-xl"></i>
            </button>
            <h3 class="font-black text-base text-gray-800 ml-4 uppercase tracking-wider">Quantidade</h3>
        </div>
    `;

    container.innerHTML = `
        ${mobileHeaderHTML}
        <div class="flex-grow flex flex-col items-center justify-center p-6 bg-slate-50 relative">
            <div class="text-center bg-white p-8 rounded-3xl shadow-sm border border-gray-200 w-full max-w-sm">
                <div class="w-20 h-20 bg-indigo-50 text-indigo-500 rounded-full mx-auto flex items-center justify-center text-4xl mb-6 border border-indigo-100 shadow-inner">
                    ${item.type === 'service' ? '<i class="bi bi-scissors"></i>' : (item.type === 'product' ? '<i class="bi bi-box-seam"></i>' : '<i class="bi bi-boxes"></i>')}
                </div>
                <h3 class="font-black text-2xl text-gray-900 leading-tight mb-3">${escapeHTML(item.name)}</h3>
                <p class="text-base text-gray-600 font-bold bg-gray-100 inline-block px-4 py-1.5 rounded-full border border-gray-200 shadow-sm">R$ ${item.price.toFixed(2)} / unidade</p>
                
                <div class="my-10 flex items-center justify-center gap-6">
                    <button id="quantity-minus-btn" class="w-16 h-16 rounded-2xl bg-white border border-gray-300 text-3xl font-black text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-200 shadow-md transition-all active:scale-90 disabled:opacity-30 disabled:hover:bg-white"><i class="bi bi-dash"></i></button>
                    <span id="quantity-display" class="text-6xl font-black w-24 text-center text-indigo-600 bg-indigo-50 rounded-3xl py-2 border border-indigo-100 shadow-inner">${quantity}</span>
                    <button id="quantity-plus-btn" class="w-16 h-16 rounded-2xl bg-white border border-gray-300 text-3xl font-black text-gray-600 hover:bg-green-50 hover:text-green-600 hover:border-green-200 shadow-md transition-all active:scale-90"><i class="bi bi-plus"></i></button>
                </div>
            </div>
        </div>
        <footer class="p-4 bg-white border-t border-gray-200 shadow-[0_-10px_20px_-3px_rgba(0,0,0,0.1)] w-full flex-shrink-0 z-50 pb-safe relative">
            <button id="confirm-add-qty-btn" class="w-full py-4 bg-indigo-600 text-white font-black text-base rounded-2xl hover:bg-indigo-700 transition-all shadow-lg uppercase tracking-widest active:scale-95 flex justify-center items-center gap-2">
                <i class="bi bi-cart-plus text-xl"></i> Confirmar Adição
            </button>
        </footer>
    `;

    const updateDisplay = () => {
        container.querySelector('#quantity-display').textContent = quantity;
        container.querySelector('#quantity-minus-btn').disabled = quantity <= 1;
    };

    container.querySelector('#quantity-minus-btn').onclick = () => { if (quantity > 1) { quantity--; updateDisplay(); } };
    container.querySelector('#quantity-plus-btn').onclick = () => { quantity++; updateDisplay(); };
    
    container.querySelector('#confirm-add-qty-btn').onclick = async () => { 
        await handleAddItemToComanda(item, quantity);
        localState.viewMode = 'items';
        localState.selectedCatalogItem = null;
        renderComandaDetail();
    };
    updateDisplay();
}

function renderComandaDetail() {
    const detailContainer = document.getElementById('comanda-detail-container');
    if (!detailContainer) return;
    
    const comanda = localState.allComandas.find(c => String(c.id) === String(localState.selectedComandaId));

    if (localState.viewMode === 'checkout' && comanda) {
        renderCheckoutView(comanda, detailContainer);
        return;
    }
    if (localState.viewMode === 'add-item' && comanda) {
        renderAddItemView(comanda, detailContainer);
        return;
    }
    if (localState.viewMode === 'add-item-qty' && comanda) {
        renderQuantityView(comanda, detailContainer);
        return;
    }
    
    const mobileHeaderHTML = `
        <div class="md:hidden p-4 border-b border-gray-200 bg-white flex items-center justify-between shadow-sm w-full flex-shrink-0 z-50 rounded-t-2xl">
            <div class="flex items-center">
                <button data-action="back-to-list" class="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 shadow-inner">
                    <i class="bi bi-arrow-left text-xl"></i>
                </button>
                <h3 class="font-black text-lg text-gray-800 ml-4 uppercase tracking-wider">Comanda</h3>
            </div>
            ${comanda && comanda._hasUnsavedChanges ? `
                <button data-action="save-comanda" class="bg-amber-500 text-white font-black text-[10px] uppercase tracking-widest px-3 py-2 rounded-lg animate-pulse shadow-md active:scale-95">Salvar</button>
            ` : ''}
        </div>
    `;

    if (!localState.isCashierOpen) {
        detailContainer.innerHTML = `
            ${mobileHeaderHTML}
            <div class="flex flex-col items-center justify-center h-full text-center text-gray-500 p-6">
                <div class="bg-gray-50 p-6 rounded-full mb-4 border border-gray-100 shadow-inner">
                    <i class="bi bi-lock text-5xl text-gray-300"></i>
                </div>
                <p class="font-black text-lg text-gray-700 uppercase tracking-widest">Caixa Fechado</p>
                <p class="text-sm text-gray-500 mt-2 max-w-xs">Você precisa abrir o caixa para gerenciar as vendas.</p>
                <button data-action="open-cashier" class="py-3 px-8 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 transition shadow-md mt-6 text-sm uppercase tracking-wider">Abrir Caixa Agora</button>
            </div>
        `;
        return;
    }

    if (!comanda) {
        detailContainer.innerHTML = `
            <div class="hidden md:flex flex-col items-center justify-center h-full text-center text-gray-400">
                <i class="bi bi-receipt text-6xl opacity-20 mb-4"></i>
                <p class="text-lg font-bold text-gray-500 uppercase tracking-widest">Nenhuma Selecionada</p>
                <p class="text-sm mt-2 opacity-70">Clique na lista ao lado para ver os detalhes</p>
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
    
    // FAB do Adicionar (Aparece flutuando no Mobile)
    const mobileAddFab = !isCompleted ? `
        <button data-action="add-item" class="md:hidden fixed bottom-[120px] right-4 w-14 h-14 bg-indigo-600 text-white font-black rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform z-[60]">
            <i class="bi bi-plus-lg text-2xl"></i>
        </button>
    ` : '';

    const desktopFooter = `
        <footer class="hidden md:block mt-auto p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] w-full flex-shrink-0 z-20 rounded-b-2xl">
            <div class="flex justify-between items-end mb-4">
                <span class="text-xs text-gray-500 font-bold uppercase tracking-widest">Total a Pagar</span>
                <span class="text-4xl font-black text-gray-900 leading-none">R$ ${total.toFixed(2)}</span>
            </div>
            ${!isCompleted ? `
                <div class="grid grid-cols-3 gap-3">
                    <button data-action="add-item" class="col-span-1 py-3 bg-indigo-50 text-indigo-700 font-black rounded-xl hover:bg-indigo-100 transition border border-indigo-200 text-xs shadow-sm uppercase tracking-wider flex justify-center items-center gap-2">
                        <i class="bi bi-plus-lg text-lg"></i> Incluir Item
                    </button>
                    <button data-action="save-comanda" class="col-span-1 py-3 font-black rounded-xl transition text-xs shadow-sm uppercase tracking-wider flex justify-center items-center gap-2 ${hasUnsaved ? "bg-amber-500 text-white hover:bg-amber-600 animate-pulse border-transparent" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"}">
                        <i class="bi bi-save2 text-lg"></i> ${hasUnsaved ? "Salvar Alterações" : "Salvar"}
                    </button>
                    <button data-action="go-to-checkout" class="col-span-1 py-3 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 transition shadow-md text-xs uppercase tracking-wider flex justify-center items-center gap-2">
                        <i class="bi bi-credit-card text-lg"></i> Finalizar Pagamento
                    </button>
                </div>
            ` : `
                <div class="bg-emerald-50 text-emerald-700 text-center py-3.5 rounded-xl font-black border border-emerald-200 flex items-center justify-center gap-2 text-sm shadow-sm">
                    <i class="bi bi-check-circle-fill text-xl"></i> Comanda Paga
                </div>
            `}
        </footer>
    `;

    // Rodapé Mobile Limpo (Strictly Checkout/Salvar)
    const mobileFooter = `
        <footer class="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-15px_30px_-5px_rgba(0,0,0,0.1)] z-50 pb-safe">
            <div class="flex justify-between items-end mb-3 px-1">
                <div class="flex flex-col">
                    <span class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Total da Comanda</span>
                    <span class="text-3xl font-black text-gray-900 leading-none">R$ ${total.toFixed(2)}</span>
                </div>
                ${hasUnsaved ? `
                    <button data-action="save-comanda" class="py-2 px-5 font-black rounded-xl text-xs shadow-md uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition-transform bg-amber-500 text-white animate-pulse">
                        <i class="bi bi-save2 text-base"></i> Salvar
                    </button>
                ` : ''}
            </div>
            ${!isCompleted ? `
                <button data-action="go-to-checkout" class="w-full py-4 bg-emerald-600 text-white font-black text-sm rounded-xl hover:bg-emerald-700 transition shadow-lg uppercase tracking-wider flex justify-center items-center gap-2 active:scale-95">
                    Ir para Pagamento <i class="bi bi-arrow-right text-xl"></i>
                </button>
            ` : `
                <div class="w-full bg-emerald-50 text-emerald-700 text-center py-4 rounded-xl font-black border border-emerald-200 flex items-center justify-center gap-2 text-sm shadow-sm">
                    <i class="bi bi-check-circle-fill text-xl"></i> Comanda Paga
                </div>
            `}
        </footer>
    `;

    detailContainer.innerHTML = `
        ${mobileHeaderHTML} 
        <div class="flex-grow overflow-y-auto p-4 pb-36 md:pb-6 custom-scrollbar bg-slate-50 relative"> 
            
            <div class="flex justify-between items-start mb-5 border-b border-gray-200 pb-5 bg-white p-4 rounded-2xl shadow-sm">
                <div>
                    <h3 class="text-lg font-black text-gray-900 truncate max-w-[220px] md:max-w-xs leading-tight">${safeClientName}</h3>
                    <p class="text-sm text-gray-500 flex items-center gap-1.5 mt-1 font-semibold">
                        <i class="bi bi-person text-indigo-400"></i> ${safeProfName}
                    </p>
                    ${!isWalkIn ? 
                        `<button data-action="go-to-appointment" data-id="${comanda.id}" data-date="${comanda.startTime}" class="text-indigo-600 text-xs font-black uppercase tracking-widest hover:text-indigo-800 flex items-center gap-1 mt-3 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 transition-colors w-max shadow-sm">
                             <i class="bi bi-calendar-check"></i> Ver Agenda
                         </button>` 
                         : `<span class="mt-3 inline-block px-2 py-1 text-[10px] font-black bg-blue-100 text-blue-700 rounded-md uppercase tracking-widest border border-blue-200">Venda Avulsa</span>`}
                </div>
                <div class="flex flex-col gap-2">
                    ${isCompleted ? 
                        `<button data-action="reopen-appointment" data-id="${comanda.id}" class="w-10 h-10 bg-yellow-50 text-yellow-600 rounded-xl hover:bg-yellow-100 flex items-center justify-center border border-yellow-200 shadow-sm transition-colors" title="Reabrir Comanda"><i class="bi bi-arrow-counterclockwise text-lg"></i></button>` 
                        : ''}
                    ${isWalkIn && !isCompleted ? 
                        `<button data-action="delete-walk-in" data-id="${comanda.id}" class="w-10 h-10 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 flex items-center justify-center border border-red-200 shadow-sm transition-colors" title="Excluir Venda"><i class="bi bi-trash3 text-lg"></i></button>` 
                        : ''}
                </div>
            </div>

            <div id="loyalty-container" class="mb-5"></div>

            <div class="space-y-3">
                <h4 class="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 pl-1">Itens Adicionados</h4>
                ${Object.values(groupedItems).map(item => {
                    const isOriginal = item.sources && item.sources.includes('original_service');
                    const isRedeemedItem = localState.pendingRedemption && String(localState.pendingRedemption.appliedToItemId) === String(item.id);
                    const showRewardTag = item.isReward || isRedeemedItem;

                    return `
                    <div class="flex flex-col bg-white p-4 rounded-2xl border border-gray-200 shadow-sm ${showRewardTag ? 'border-yellow-400 bg-yellow-50 ring-2 ring-yellow-200' : ''}">
                        <div class="flex justify-between items-start w-full">
                            <div class="min-w-0 flex-1 pr-3">
                                <p class="text-base font-bold text-gray-900 line-clamp-2 leading-tight">
                                    ${showRewardTag ? '🎁 ' : ''}
                                    ${escapeHTML(item.name)}
                                </p>
                                <div class="flex items-center mt-2 gap-2">
                                    ${isOriginal ? '<span class="text-[9px] font-black uppercase tracking-widest text-indigo-700 bg-indigo-100 px-2 py-1 rounded-md border border-indigo-200">Fixo Agenda</span>' : ''}
                                    <p class="text-xs text-gray-500 font-bold">${showRewardTag ? '<span class="text-yellow-700 font-black bg-yellow-100 px-2 py-1 rounded-md border border-yellow-200">Resgate</span>' : `R$ ${(item.price || 0).toFixed(2)} un.`}</p>
                                </div>
                            </div>
                            <div class="flex flex-col items-end gap-3">
                                <span class="font-black text-xl text-gray-900 whitespace-nowrap leading-none">R$ ${(item.price * item.quantity).toFixed(2)}</span>
                                
                                ${!isCompleted ? `
                                    <div class="flex items-center bg-gray-50 rounded-xl border border-gray-200 shadow-inner h-10">
                                        ${isOriginal ? 
                                            `<span class="text-[11px] font-black text-gray-500 px-4 uppercase tracking-widest">Qtd: ${item.quantity}</span>` 
                                            : 
                                            `<button data-action="decrease-qty" data-item-id="${item.id}" data-item-type="${item.type}" class="w-10 h-full flex items-center justify-center rounded-l-xl bg-white text-gray-600 hover:bg-red-50 hover:text-red-600 disabled:opacity-30 border-r border-gray-200 active:scale-95"><i class="bi bi-dash text-xl"></i></button>
                                             <span class="text-sm font-black text-gray-900 w-12 text-center">${item.quantity}</span>
                                             <button data-action="increase-qty" data-item-id="${item.id}" data-item-type="${item.type}" class="w-10 h-full flex items-center justify-center rounded-r-xl bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 border-l border-gray-200 active:scale-95"><i class="bi bi-plus text-xl"></i></button>`
                                        }
                                    </div>
                                ` : `<span class="flex items-center justify-center px-4 py-2 bg-gray-100 border border-gray-200 text-gray-700 font-black text-xs uppercase tracking-widest rounded-xl">${item.quantity} Itens</span>`}
                            </div>
                        </div>
                    </div>
                `}).join('')}
                ${Object.keys(groupedItems).length === 0 ? '<div class="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 bg-white rounded-2xl text-sm font-medium">Nenhum item lançado</div>' : ''}
            </div>
        </div>

        ${mobileAddFab}
        ${desktopFooter}
        ${mobileFooter}
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
        <div class="md:hidden p-4 border-b border-gray-200 bg-white flex items-center shadow-sm w-full flex-shrink-0 z-50 rounded-t-2xl">
            <button data-action="back-to-items" class="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 shadow-inner active:scale-90 transition-transform">
                <i class="bi bi-arrow-left text-xl"></i>
            </button>
            <h3 class="font-black text-lg text-gray-800 ml-4 uppercase tracking-wider">Pagamento</h3>
        </div>
    `;

    const checkoutFooter = `
        <footer class="fixed bottom-0 left-0 right-0 md:relative mt-auto p-4 bg-white border-t border-gray-200 shadow-[0_-15px_30px_-5px_rgba(0,0,0,0.1)] md:shadow-none grid grid-cols-3 gap-3 w-full flex-shrink-0 z-50 pb-safe md:pb-4">
            <button data-action="back-to-items" class="col-span-1 py-4 bg-gray-100 border border-gray-300 text-gray-700 font-black text-sm rounded-xl hover:bg-gray-200 transition shadow-sm uppercase tracking-wider active:scale-95">Voltar</button>
            <button data-action="finalize-checkout" class="col-span-2 py-4 bg-emerald-600 text-white font-black text-sm rounded-xl hover:bg-emerald-700 transition shadow-lg flex items-center justify-center gap-2 uppercase tracking-wider active:scale-95"><i class="bi bi-check2-circle text-xl"></i> Confirmar</button>
        </footer>
    `;

    container.innerHTML = `
        ${mobileHeaderHTML}
        <div class="flex-grow overflow-y-auto p-4 pb-36 md:pb-6 custom-scrollbar bg-slate-50 relative">
            
            <div class="text-center mb-6 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm relative overflow-hidden">
                <p class="text-[11px] font-black text-gray-400 uppercase tracking-widest relative z-10">Subtotal: <span id="checkout-subtotal-display" class="text-gray-600">R$ ${subtotal.toFixed(2)}</span></p>
                
                <div class="flex flex-col items-center justify-center gap-3 mt-4 mb-3 relative z-10">
                     <div class="flex items-center gap-3">
                         <span class="text-xs font-black text-red-400 uppercase tracking-widest bg-red-50 px-2 py-1 rounded-lg border border-red-100"><i class="bi bi-tag-fill mr-1"></i>Desc</span>
                         <div class="flex border-2 border-gray-300 rounded-xl bg-white overflow-hidden shadow-inner h-12 focus-within:border-indigo-400 transition-colors">
                             <input type="number" id="discount-value" value="${discount.value}" class="w-24 p-2 text-center text-lg font-black text-red-500 outline-none bg-transparent" placeholder="0">
                             <select id="discount-type" class="bg-gray-50 text-sm font-black text-gray-600 border-l border-gray-200 px-3 outline-none cursor-pointer hover:bg-gray-100">
                                 <option value="real" ${discount.type === 'real' ? 'selected' : ''}>R$</option>
                                 <option value="percent" ${discount.type === 'percent' ? 'selected' : ''}>%</option>
                             </select>
                         </div>
                     </div>
                     <input type="text" id="discount-reason" class="w-full max-w-[280px] p-3 text-sm border-2 border-gray-200 rounded-xl text-center focus:border-indigo-400 outline-none text-gray-700 bg-gray-50 font-medium transition-colors" placeholder="Motivo do desconto (opcional)" value="${checkoutState.discountReason || ''}">
                </div>

                <p class="text-5xl font-black text-gray-900 mt-6 mb-2 relative z-10 tracking-tight" id="checkout-total-display">R$ ${totalFinal.toFixed(2)}</p>
                
                <div id="checkout-status-msg" class="mt-4 bg-gray-50 py-3 rounded-xl border border-gray-100 relative z-10 shadow-inner">
                    ${remaining <= 0.01 
                        ? '<p class="text-emerald-500 font-black text-base uppercase tracking-widest"><i class="bi bi-check2-circle text-2xl mr-2 align-middle"></i> Totalmente Pago</p>' 
                        : `<p class="text-red-500 font-bold text-sm uppercase tracking-widest">Faltam: <span id="checkout-remaining-display" class="font-black text-xl text-red-600 ml-1">R$ ${remaining.toFixed(2)}</span></p>`
                    }
                </div>
            </div>

            <div class="space-y-3 mb-6">
                ${checkoutState.payments.map((p, index) => `
                    <div class="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-200 shadow-sm animate-fade-in-fast">
                        <div class="flex items-center gap-3">
                             <div class="bg-gray-100 px-4 py-2 rounded-xl border border-gray-200">
                                <span class="font-black text-xs uppercase tracking-widest text-gray-700">${p.method}</span>
                             </div>
                             ${p.installments > 1 ? `<span class="text-[10px] font-black bg-purple-100 text-purple-700 px-2.5 py-1.5 rounded-lg border border-purple-200 shadow-sm">${p.installments}x</span>` : ''}
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="font-black text-xl text-gray-900">R$ ${p.value.toFixed(2)}</span>
                            <button data-action="remove-payment-checkout" data-index="${index}" class="text-gray-400 hover:text-red-500 hover:bg-red-50 w-10 h-10 rounded-xl flex items-center justify-center transition-colors border border-transparent hover:border-red-200 active:scale-90"><i class="bi bi-trash3 text-lg"></i></button>
                        </div>
                    </div>
                `).join('')}
            </div>

            ${remaining > 0.01 ? `
            <div class="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
                <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-3">Selecionar Pagamento</label>
                
                <div class="grid grid-cols-2 gap-3 mb-5">
                    ${['dinheiro', 'pix', 'debito', 'credito', 'crediario'].map(m => `
                        <button data-action="select-method" data-method="${m}" class="py-4 px-2 rounded-xl border text-[11px] font-black uppercase tracking-wider transition-colors active:scale-95 ${checkoutState.selectedMethod === m ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-indigo-50 hover:border-indigo-200'}">
                            ${m === 'pix' ? '<i class="bi bi-qr-code mr-1"></i> ' : ''}
                            ${m === 'dinheiro' ? '<i class="bi bi-cash mr-1"></i> ' : ''}
                            ${m === 'debito' || m === 'credito' ? '<i class="bi bi-credit-card mr-1"></i> ' : ''}
                            ${m === 'crediario' ? '<i class="bi bi-journal-text mr-1"></i> ' : ''}
                            ${m}
                        </button>
                    `).join('')}
                </div>
                
                ${['credito', 'crediario'].includes(checkoutState.selectedMethod) ? `
                    <div class="mb-5">
                        <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Parcelamento</label>
                        <select id="checkout-installments" class="w-full p-3.5 border-2 border-gray-200 rounded-xl text-sm font-black text-gray-700 bg-gray-50 outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                            ${Array.from({length: 12}, (_, i) => `<option value="${i+1}" ${checkoutState.installments === i+1 ? 'selected' : ''}>${i+1} Parcela${i > 0 ? 's' : ''}</option>`).join('')}
                        </select>
                    </div>
                ` : ''}

                <div class="flex items-end gap-3 mt-2">
                    <div class="flex-grow relative">
                        <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Valor a Pagar Agora</label>
                        <span class="absolute left-4 bottom-3.5 text-gray-400 font-black text-xl">R$</span>
                        <input type="number" id="checkout-amount" step="0.01" class="w-full py-3.5 pl-12 pr-4 border-2 border-gray-300 rounded-xl text-2xl font-black text-gray-900 outline-none focus:border-indigo-500 shadow-inner transition-colors" value="${remaining.toFixed(2)}">
                    </div>
                    <button data-action="add-payment-checkout" class="h-[54px] px-6 bg-gray-800 text-white font-black text-sm rounded-xl hover:bg-gray-900 transition shadow-lg uppercase tracking-wider active:scale-95 flex items-center justify-center gap-2">
                        OK <i class="bi bi-plus-lg"></i>
                    </button>
                </div>
            </div>
            ` : ''}
        </div>

        ${checkoutFooter}
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
                elStatus.innerHTML = '<p class="text-emerald-500 font-black text-base uppercase tracking-widest"><i class="bi bi-check2-circle text-2xl mr-2 align-middle"></i> Totalmente Pago</p>';
            } else {
                elStatus.innerHTML = `<p class="text-red-500 font-bold text-sm uppercase tracking-widest">Faltam: <span id="checkout-remaining-display" class="font-black text-xl text-red-600 ml-1">R$ ${cRemaining.toFixed(2)}</span></p>`;
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
        rewardDiv.className = "bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl p-4 shadow-sm flex justify-between items-center animate-fade-in";
        rewardDiv.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="bg-white w-10 h-10 rounded-full text-yellow-500 shadow-sm border border-yellow-100 flex items-center justify-center">
                    <i class="bi bi-star-fill text-lg"></i>
                </div>
                <div>
                    <p class="text-xs font-black uppercase tracking-widest text-yellow-800">Prémio Disponível!</p>
                    <p class="text-[11px] text-yellow-700 font-bold mt-0.5">Saldo: ${currentPoints} pontos</p>
                </div>
            </div>
        `;
        const btn = document.createElement('button');
        btn.innerHTML = "<i class='bi bi-gift mr-1.5'></i> Resgatar";
        btn.className = "text-[10px] font-black uppercase tracking-wider bg-yellow-500 text-white px-4 py-2.5 rounded-xl shadow-md hover:bg-yellow-600 transition-colors active:scale-95";
        btn.onclick = () => openRewardSelectionModal(availableRewards, comanda);
        rewardDiv.appendChild(btn);
        containerElement.innerHTML = '';
        containerElement.appendChild(rewardDiv);
    }
}

function openRewardSelectionModal(rewards, comanda) {
    const contentHTML = `
        <div class="space-y-3">
            <p class="text-sm text-gray-500 mb-4 font-medium text-center">Pontos suficientes para resgatar:</p>
            <div class="space-y-3 max-h-72 overflow-y-auto custom-scrollbar">
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
                    <button data-action="select-reward" data-reward-id="${r.id || name}" class="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl hover:border-yellow-400 hover:bg-yellow-50 transition-all group shadow-sm text-left active:scale-95">
                        <div class="flex-1 min-w-0 pr-3">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md border border-white/0 group-hover:border-yellow-200 ${typeColor}">${typeLabel}</span>
                                <p class="font-black text-gray-900 group-hover:text-yellow-700 text-base truncate">${escapeHTML(name)}</p>
                            </div>
                            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Custo: ${cost} pontos</p>
                        </div>
                        <div class="flex-shrink-0">
                            <span class="block text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200 shadow-sm">Desc. R$ ${discountValue}</span>
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
                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 pl-1">Buscar Cliente</label>
                <i class="bi bi-search absolute left-4 top-[36px] text-gray-400 text-base"></i>
                <input type="text" id="client-search" class="w-full pl-11 p-3.5 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold text-gray-800 transition-colors shadow-inner" placeholder="Digite nome ou telefone..." autocomplete="off">
                <input type="hidden" id="selected-client-id" required>
                <ul id="client-suggestions" class="hidden absolute z-50 w-full bg-white border border-gray-200 rounded-xl shadow-2xl max-h-56 overflow-y-auto mt-2 custom-scrollbar"></ul>
                <button type="button" data-action="new-client-from-sale" class="text-[10px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest mt-3 flex items-center justify-center w-full gap-1.5 transition-colors bg-indigo-50 hover:bg-indigo-100 py-3 rounded-xl border border-indigo-100"><i class="bi bi-person-plus-fill text-lg"></i> Cadastrar Novo Cliente Rápido</button>
            </div>
            <div class="pt-2 border-t border-gray-100">
                <label for="new-sale-professional" class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 pl-1">Profissional Atendente</label>
                <select id="new-sale-professional" required class="w-full p-3.5 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white text-sm font-bold text-gray-800 outline-none focus:ring-2 focus:ring-indigo-500 transition-colors shadow-inner">
                    <option value="">-- Selecione o profissional --</option>
                    ${professionalsOptions}
                </select>
            </div>
            <div class="pt-4">
                <button type="submit" id="btn-start-sale" class="w-full bg-indigo-600 text-white font-black text-sm uppercase tracking-widest py-4 rounded-xl hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500 transition shadow-lg flex items-center justify-center gap-2 active:scale-95">
                    <i class="bi bi-cart-plus text-xl"></i> Iniciar Venda
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
        searchInput.classList.add('bg-emerald-50', 'border-emerald-300', 'text-emerald-800');
    }

    searchInput.addEventListener('input', debounce(async (e) => {
        const term = e.target.value.trim();
        hiddenIdInput.value = ''; searchInput.classList.remove('bg-emerald-50', 'border-emerald-300', 'text-emerald-800');
        if (term.length < 2) { suggestionsList.classList.add('hidden'); return; }
        try {
            suggestionsList.innerHTML = '<li class="p-4 text-sm text-gray-500 text-center"><div class="loader-small mx-auto"></div></li>';
            suggestionsList.classList.remove('hidden');
            const results = await clientsApi.getClients(state.establishmentId, term, 10);
            if (results.length === 0) suggestionsList.innerHTML = '<li class="p-5 text-xs font-bold text-gray-400 text-center uppercase tracking-widest">Nenhum cliente encontrado</li>';
            else {
                suggestionsList.innerHTML = results.map(c => `<li data-client-id="${c.id}" data-client-name="${c.name}" data-client-phone="${c.phone}" class="p-4 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors flex flex-col justify-center"><div class="font-bold text-sm text-gray-800">${escapeHTML(c.name)}</div><div class="text-xs font-medium text-gray-500 mt-1"><i class="bi bi-telephone opacity-50 mr-1.5"></i>${c.phone || 'Sem telefone'}</div></li>`).join('');
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
            searchInput.classList.add('bg-emerald-50', 'border-emerald-300', 'text-emerald-800');
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
        <form id="comandas_clientRegistrationForm" class="flex flex-col h-full bg-white p-2 sm:p-5 rounded-2xl">
            <div class="grid grid-cols-1 gap-4 mb-5">
                <div>
                    <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 pl-1">Nome Completo *</label>
                    <input type="text" id="regClientName" required class="w-full p-3.5 rounded-xl border border-gray-300 text-sm font-bold text-gray-800 outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner bg-gray-50 focus:bg-white transition-colors">
                </div>
                <div>
                    <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 pl-1">WhatsApp (Apenas números) *</label>
                    <input type="tel" id="regClientPhone" required class="w-full p-3.5 rounded-xl border border-gray-300 text-sm font-bold text-gray-800 outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner bg-gray-50 focus:bg-white transition-colors" placeholder="Ex: 912345678">
                </div>
            </div>
            <button type="submit" class="w-full py-4 bg-emerald-600 text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-emerald-700 transition shadow-lg flex items-center justify-center gap-2 active:scale-95">
                <i class="bi bi-save2 text-lg"></i> Salvar e Selecionar
            </button>
        </form>
    `;
    showGenericModal({ title: 'Cadastrar Cliente Rápido', contentHTML: modalContent, maxWidth: 'max-w-sm' });
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
        <form id="open-cashier-form" class="space-y-4 bg-white p-2 sm:p-5 rounded-2xl">
            <div>
                <label for="initial-amount" class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 text-center">Fundo de Caixa Inicial (Troco)</label>
                <div class="relative max-w-xs mx-auto">
                    <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-black text-2xl">R$</span>
                    <input type="number" step="0.01" min="0" id="initial-amount" required class="w-full p-4 pl-14 border-2 border-gray-300 rounded-2xl text-3xl font-black text-gray-900 bg-gray-50 focus:bg-white focus:border-emerald-500 outline-none shadow-inner text-center transition-colors" placeholder="0.00" value="0.00">
                </div>
            </div>
            <button type="submit" class="w-full bg-emerald-600 text-white font-black text-sm uppercase tracking-widest py-4 rounded-2xl hover:bg-emerald-700 transition shadow-lg mt-6 flex items-center justify-center gap-2 active:scale-95"><i class="bi bi-unlock-fill text-xl"></i> Confirmar Abertura</button>
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
            <form id="close-cashier-form" class="space-y-4 bg-white p-2 sm:p-5 rounded-2xl">
                <div class="grid grid-cols-2 gap-3 text-center mb-4">
                    <div class="bg-blue-50 p-3 rounded-2xl border border-blue-100 shadow-inner"><p class="text-[9px] text-blue-500 uppercase font-black tracking-widest mb-1">Abertura</p><p class="text-base font-black text-blue-700">R$ ${report.initialAmount.toFixed(2)}</p></div>
                    <div class="bg-emerald-50 p-3 rounded-2xl border border-emerald-100 shadow-inner"><p class="text-[9px] text-emerald-500 uppercase font-black tracking-widest mb-1">Vendas Dinheiro</p><p class="text-base font-black text-emerald-700">R$ ${report.cashSales.toFixed(2)}</p></div>
                </div>
                <div class="bg-gray-900 text-white p-5 rounded-3xl text-center shadow-xl mb-6 border border-gray-800">
                    <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Esperado em Gaveta</p>
                    <p class="text-5xl font-black tracking-tight text-white drop-shadow-md">R$ ${report.expectedAmount.toFixed(2)}</p>
                </div>
                
                <div class="bg-gray-50 p-5 rounded-3xl border border-gray-200 shadow-inner">
                    <label for="final-amount" class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 text-center">Informar Contagem Final Real (Gaveta)</label>
                    <div class="relative max-w-xs mx-auto">
                        <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-black text-2xl">R$</span>
                        <input type="number" step="0.01" min="0" id="final-amount" required class="w-full p-4 pl-14 border-2 border-gray-300 rounded-2xl text-3xl font-black text-gray-900 bg-white focus:border-red-500 outline-none shadow-sm text-center transition-colors" placeholder="0.00" value="${report.expectedAmount.toFixed(2)}">
                    </div>
                </div>
                <button type="submit" class="w-full bg-red-600 text-white font-black text-sm uppercase tracking-widest py-4 rounded-2xl hover:bg-red-700 transition shadow-lg mt-4 flex items-center justify-center gap-2 active:scale-95"><i class="bi bi-lock-fill text-xl"></i> Confirmar Fecho</button>
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
    localState.selectedComandaId = String(comandaId);
    localState.viewMode = 'items';
    localState.pendingRedemption = null;
    localState.checkoutState.discount = { type: 'real', value: 0 };
    localState.checkoutState.discountReason = '';
    
    renderComandaList(); 
    showMobileDetail();
    renderComandaDetail();
}

async function handleAddItemToComanda(itemData, quantity) {
    const comanda = localState.allComandas.find(c => String(c.id) === String(localState.selectedComandaId));
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
    const comanda = localState.allComandas.find(c => String(c.id) === String(localState.selectedComandaId));
    if (!comanda) return;

    let modified = false;
    let extraIndex = (comanda.comandaItems || []).findIndex(item => String(item.id) === String(itemId) && item.type === itemType);
    
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
    loadingOverlay.className = 'fixed inset-0 bg-gray-900/60 z-[999999] flex items-center justify-center backdrop-blur-sm';
    loadingOverlay.innerHTML = '<div class="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center"><div class="loader mb-5"></div><p class="text-sm font-black text-gray-800 uppercase tracking-widest mt-2">Processando...</p></div>';
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
    localState.selectedComandaId = String(newComanda.id);
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
    
    let sDate = localState.filterStartDate;
    let eDate = localState.filterEndDate;
    
    let dateParams;
    if (sDate && eDate && sDate !== eDate) {
         dateParams = { startDate: sDate, endDate: eDate };
    } else {
         dateParams = { startDate: sDate, endDate: eDate, date: sDate };
    }

    try {
        const sessionPromise = cashierApi.getActiveSession();
        const comandasPromise = comandasApi.getComandas(state.establishmentId, dateParams, localState.paging.page, localState.paging.limit);
        const loyaltyPromise = establishmentsApi.getEstablishmentDetails(state.establishmentId);

        const [activeSession, response, establishmentData] = await Promise.all([
            sessionPromise,
            comandasPromise,
            loyaltyPromise
        ]);

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
    localState.selectedComandaId = params.selectedAppointmentId ? String(params.selectedAppointmentId) : null;
    localState.viewMode = 'items';
    localState.selectedCatalogItem = null;
    
    const initDates = getDatesForPreset('hoje');
    localState.filterStartDate = initDates.start;
    localState.filterEndDate = initDates.end;
    localState.filterPreset = 'hoje';
    localState.showHistoryPanel = false;
    
    renderPageLayout();

    if (pageEventListener) {
        contentDiv.removeEventListener('click', pageEventListener);
        contentDiv.removeEventListener('change', pageEventListener);
    }

    pageEventListener = async (e) => {
        const target = e.target.closest('[data-action], [data-filter], [data-comanda-id]');

        if (!target) return;
        
        if (target.matches('[data-filter]')) {
            e.preventDefault();
            handleFilterClick(target.dataset.filter);
        } else if (target.matches('[data-comanda-id]')) {
            e.preventDefault();
            if (e.target.closest('[data-action="go-to-appointment"]')) { e.stopPropagation(); return; }
            handleComandaClick(target.dataset.comandaId);
        } else if (target.matches('[data-action]')) {
            e.preventDefault();
            const action = target.dataset.action;
            const comandaId = String(target.dataset.id || localState.selectedComandaId);
            const comanda = localState.allComandas.find(c => String(c.id) === comandaId);

            switch (action) {
                case 'toggle-history':
                    localState.showHistoryPanel = !localState.showHistoryPanel;
                    if(localState.showHistoryPanel && localState.activeFilter === 'abertas') {
                        localState.activeFilter = 'todas';
                    }
                    renderPageLayout();
                    
                    if(!localState.showHistoryPanel) {
                        localState.filterPreset = 'hoje';
                        const dates = getDatesForPreset('hoje');
                        localState.filterStartDate = dates.start;
                        localState.filterEndDate = dates.end;
                        await fetchAndDisplayData();
                    }
                    break;

                case 'set-period':
                    const period = target.dataset.period;
                    localState.filterPreset = period;
                    
                    if (period !== 'custom') {
                        const dates = getDatesForPreset(period);
                        localState.filterStartDate = dates.start;
                        localState.filterEndDate = dates.end;
                        renderPageLayout(); 
                        localState.paging.page = 1;
                        
                        showNotification('Buscando...', `Período: ${dates.start.split('-').reverse().join('/')} a ${dates.end.split('-').reverse().join('/')}`, 'info');
                        await fetchAndDisplayData();
                    } else {
                        renderPageLayout(); 
                    }
                    break;

                case 'apply-custom-dates':
                    const sDate = document.getElementById('filter-start-date').value;
                    const eDate = document.getElementById('filter-end-date').value;
                    if (sDate && eDate) {
                        localState.filterStartDate = sDate;
                        localState.filterEndDate = eDate;
                        localState.paging.page = 1;
                        showNotification('Buscando...', `Período personalizado aplicado.`, 'info');
                        await fetchAndDisplayData();
                    } else {
                        showNotification('Atenção', 'Preencha a data inicial e final.', 'warning');
                    }
                    break;
                    
                case 'back-to-list': 
                    hideMobileDetail(); 
                    localState.selectedComandaId = null; 
                    localState.selectedCatalogItem = null;
                    document.querySelectorAll('.comanda-card').forEach(el => el.classList.remove('ring-2', 'ring-indigo-500', 'bg-indigo-50/50', 'border-transparent')); 
                    document.querySelectorAll('.comanda-card').forEach(el => el.classList.add('bg-white', 'border-gray-200')); 
                    renderComandaDetail(); 
                    break;
                    
                case 'new-sale': openNewSaleModal(); break;
                
                case 'add-item': 
                    if (!localState.isCashierOpen) return showNotification('Caixa Fechado', 'Abra o caixa primeiro.', 'error');
                    localState.viewMode = 'add-item';
                    renderComandaDetail();
                    break;
                    
                case 'back-to-items':
                    localState.viewMode = 'items';
                    renderComandaDetail();
                    break;
                    
                case 'back-to-add-item':
                    localState.viewMode = 'add-item';
                    localState.selectedCatalogItem = null;
                    renderComandaDetail();
                    break;
                    
                case 'select-catalog-item':
                    const { itemType, itemId } = target.dataset;
                    const catalog = localState.catalog[itemType + 's'] || [];
                    const itemToSelect = catalog.find(i => String(i.id) === String(itemId));
                    if (itemToSelect) {
                        localState.selectedCatalogItem = { ...itemToSelect, type: itemType };
                        localState.viewMode = 'add-item-qty';
                        renderComandaDetail();
                    }
                    break;

                case 'open-cashier': openCashierModal(); break;
                case 'close-cashier': await handleOpenCloseCashierModal(); break;
                case 'view-sales-report': navigateTo('sales-report-section'); break;
                
                case 'go-to-checkout':
                    await executeSaveAction(comanda, 'checkout');
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
                    const iId = target.dataset.itemId;
                    const iType = target.dataset.itemType;
                    
                    if (!iId || iId === 'undefined' || iId === 'null') {
                        showNotification('Erro', 'Item inválido.', 'error');
                        return;
                    }
                    
                    const existingItems = getSafeAllItems(comanda);
                    let itemToClone = existingItems.find(i => String(i.id) === String(iId) && i.type === iType);

                    if (!itemToClone) {
                        const cat = localState.catalog[iType + 's'] || [];
                        itemToClone = cat.find(i => String(i.id) === String(iId));
                    }

                    const safeItem = itemToClone 
                        ? { id: itemToClone.id, name: itemToClone.name, price: Number(itemToClone.price), type: itemToClone.type } 
                        : { id: iId, name: 'Item', price: 0, type: iType };

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
                            const idx = localState.allComandas.findIndex(c => String(c.id) === comandaId);
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
                            localState.allComandas = localState.allComandas.filter(c => String(c.id) !== comandaId);
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
    
    if (params.selectedAppointmentId) localState.selectedComandaId = String(params.selectedAppointmentId);
    
    if (params.filterDate) {
        const extDate = new Date(params.filterDate).toISOString().split('T')[0];
        localState.filterStartDate = extDate;
        localState.filterEndDate = extDate;
        localState.filterPreset = 'custom';
        localState.showHistoryPanel = true;
    }

    await fetchAndDisplayData();
}