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
import { state } from '../state.js';
import { showNotification, showConfirmation, showGenericModal } from '../components/modal.js';
import { navigateTo } from '../main.js';
import { escapeHTML } from '../utils.js';

// --- 2. ESTADO LOCAL DA PÁGINA ---
let localState = {
    allComandas: [],
    catalog: { services: [], products: [], packages: [] },
    activeFilter: 'atendimento',
    selectedComandaId: null,
    viewMode: 'items', // 'items' ou 'checkout'
    isCashierOpen: false,
    activeCashierSessionId: null,
    loyaltySettings: null,
    pendingRedemption: null, // Armazena dados do prémio a ser resgatado
    paging: {
        page: 1,
        limit: 10,
        total: 0,
    },
    checkoutState: {
        payments: [],
        selectedMethod: 'dinheiro',
        installments: 1,
        amountReceived: '',
        discount: {
            type: 'real', // 'real' ou 'percent'
            value: 0
        },
        discountReason: '' // Novo campo para o motivo
    },
    isProcessing: false
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

// Executa o salvamento com Loading na tela
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
        
        // Mantém desconto se já tiver sido aplicado (ex: fidelidade), senão reseta
        if (!localState.checkoutState.discount.value) {
             localState.checkoutState.discount = { type: 'real', value: 0 };
             localState.checkoutState.discountReason = '';
        }
        
        renderComandaDetail();
    }

    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'saving-overlay';
    loadingOverlay.className = 'fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center backdrop-blur-sm';
    loadingOverlay.innerHTML = `
        <div class="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center animate-fade-in">
            <div class="loader mb-4 border-t-indigo-600"></div>
            <p class="text-gray-800 font-bold text-lg">Sincronizando...</p>
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
             // Lógica para temp se necessário
        } else {
            await comandasApi.updateComandaItems(comanda.id, itemsToSave);
        }
        
        if(document.body.contains(loadingOverlay)) {
            document.body.removeChild(loadingOverlay);
        }

        if (nextStep !== 'checkout') {
            showNotification('Sucesso', 'Comanda atualizada!', 'success');
            renderComandaDetail();
        }

    } catch (error) {
        if(document.body.contains(loadingOverlay)) {
            document.body.removeChild(loadingOverlay);
        }
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

// --- 4. FUNÇÕES DE RENDERIZAÇÃO DA UI ---

function renderPageLayout() {
    const todayStr = new Date().toISOString().split('T')[0];
    
    contentDiv.innerHTML = `
        <section class="h-full flex flex-col">
            <div class="flex flex-wrap justify-between items-center mb-4 gap-4 px-1">
                <h2 class="text-2xl md:text-3xl font-bold text-gray-800">Ponto de Venda</h2>
                <div id="cashier-controls" class="flex items-center gap-2">
                    <div class="loader-sm"></div>
                </div>
            </div>

            <div id="cashier-alert-box"></div>

            <div id="comandas-layout">
                <div id="comandas-list-column" class="flex flex-col h-full">
                    <div class="p-4 pb-2 sticky top-0 bg-white z-10 border-b border-gray-100 shadow-sm flex-shrink-0">
                        <button 
                            id="btn-new-sale"
                            data-action="new-sale" 
                            class="w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-md flex items-center justify-center gap-2 mb-3"
                        >
                            <span>+</span> NOVA VENDA
                        </button>
                        
                        <div class="flex bg-gray-100 rounded-lg p-1">
                            <button data-filter="atendimento" class="filter-btn flex-1 text-sm font-medium py-2 rounded-md transition-all">Em Aberto</button>
                            <button data-filter="finalizadas" class="filter-btn flex-1 text-sm font-medium py-2 rounded-md transition-all">Finalizadas</button>
                        </div>
                    </div>

                    <div id="finalizadas-datepicker" class="hidden px-4 py-2 bg-gray-50 border-b flex-shrink-0">
                        <label for="filter-date" class="text-xs font-semibold text-gray-500 uppercase">Data:</label>
                        <input type="date" id="filter-date" value="${todayStr}" class="w-full mt-1 p-2 border rounded-md bg-white text-sm">
                    </div>

                    <div id="comandas-list" class="p-3 space-y-2 overflow-y-auto custom-scrollbar flex-grow">
                        <div class="loader mx-auto mt-10"></div>
                    </div>
                    
                    <div id="pagination-container" class="p-2 border-t bg-gray-50 flex-shrink-0 min-h-[50px] flex justify-center items-center"></div>
                </div>

                <div id="comanda-detail-container">
                    <div class="hidden lg:flex flex-col items-center justify-center h-full text-center text-gray-400">
                        <p>Selecione uma venda para ver os detalhes</p>
                    </div>
                </div>
            </div>
        </section>
    `;
    updateCashierUIState();
}

function updateCashierUIState() {
    const alertBox = document.getElementById('cashier-alert-box');
    const newSaleBtn = document.getElementById('btn-new-sale');

    if (!localState.isCashierOpen) {
        if (alertBox) alertBox.innerHTML = `
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg animate-fade-in">
                <div class="flex">
                    <div class="flex-shrink-0">⚠️</div>
                    <div class="ml-3">
                        <p class="text-sm text-yellow-700">
                            <strong>Caixa Fechado!</strong> Abra o caixa para realizar vendas.
                        </p>
                    </div>
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
            <span class="hidden sm:inline-block text-sm font-medium text-green-700 bg-green-100 py-1 px-3 rounded-full border border-green-200">Caixa Aberto</span>
            <button data-action="close-cashier" class="py-2 px-4 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 text-sm transition">Fechar Caixa</button>
            <button data-action="view-sales-report" class="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 text-sm transition">Relatório</button>
        `;
    } else {
        container.innerHTML = `
            <span class="hidden sm:inline-block text-sm font-medium text-red-700 bg-red-100 py-1 px-3 rounded-full border border-red-200">Caixa Fechado</span>
            <button data-action="open-cashier" class="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 text-sm shadow transition">Abrir Caixa</button>
            <button data-action="view-sales-report" class="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 text-sm transition">Relatório</button>
        `;
    }
}

function renderComandaList() {
    const listContainer = document.getElementById('comandas-list');
    const paginationContainer = document.getElementById('pagination-container');
    
    if (!listContainer) return;
    
    if (!localState.isCashierOpen && localState.activeFilter === 'atendimento') {
        listContainer.innerHTML = `
            <div class="text-center py-10 opacity-60">
                <svg class="w-12 h-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                <p class="text-sm font-medium text-gray-700">Caixa Fechado</p>
                <p class="text-xs text-gray-500">Abra o caixa para ver as vendas</p>
            </div>
        `;
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }
    
    const statusMap = {
        atendimento: 'confirmed',
        finalizadas: 'completed'
    };
    const currentStatus = statusMap[localState.activeFilter];
    const filteredComandas = localState.allComandas.filter(c => c.status === currentStatus);

    if (filteredComandas.length === 0) {
        listContainer.innerHTML = `<p class="text-center text-gray-400 py-10 text-sm">Nenhuma venda encontrada.</p>`;
        renderPaginationControls(paginationContainer);
        return;
    }

    const fragment = document.createDocumentFragment();

    filteredComandas.forEach(comanda => {
        const allItems = getSafeAllItems(comanda);
        
        // --- CÁLCULO ATUALIZADO DO TOTAL PARA EXIBIÇÃO NO CARD ---
        // Se a comanda está finalizada, usa o valor total salvo (que já inclui descontos)
        let displayTotal = 0;
        if (comanda.status === 'completed' && comanda.totalAmount !== undefined && comanda.totalAmount !== null) {
            displayTotal = Number(comanda.totalAmount);
        } else {
            displayTotal = allItems.reduce((acc, item) => acc + Number(item.price || 0), 0);
        }

        // --- INDICADOR DE PRÊMIO RESGATADO ---
        const hasReward = comanda.loyaltyRedemption || (comanda.discount && comanda.discount.reason && String(comanda.discount.reason).toLowerCase().includes('fidelidade'));
        const rewardIndicator = hasReward 
            ? `<span class="inline-flex items-center justify-center bg-yellow-100 text-yellow-700 rounded-full w-5 h-5 ml-2" title="Prémio Resgatado">🎁</span>` 
            : '';

        const isSelected = comanda.id === localState.selectedComandaId;
        const time = new Date(comanda.startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        const isWalkIn = comanda.type === 'walk-in' || (typeof comanda.id === 'string' && comanda.id.startsWith('temp-'));
        const safeClientName = escapeHTML(comanda.clientName || 'Cliente sem nome');
        const safeProfName = escapeHTML(comanda.professionalName || 'Sem profissional');
        const typeIndicator = isWalkIn
            ? `<span class="text-[10px] font-bold uppercase text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md border border-blue-200">Avulso</span>`
            : `<span class="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200">Agenda</span>`;

        const div = document.createElement('div');
        div.className = `comanda-card cursor-pointer ${isSelected ? 'selected' : ''}`;
        div.dataset.action = 'select-comanda';
        div.dataset.comandaId = comanda.id;
        div.innerHTML = `
            <div class="flex justify-between items-start mb-1 pointer-events-none">
                <p class="font-bold text-gray-800 truncate max-w-[70%] text-sm">${safeClientName}</p>
                <div class="flex items-center">
                    <p class="font-bold text-gray-900 text-sm">R$ ${displayTotal.toFixed(2)}</p>
                    ${rewardIndicator}
                </div>
            </div>
            <div class="flex justify-between items-center mt-1 pointer-events-none">
                <div class="flex items-center gap-2">
                    ${typeIndicator}
                    <p class="text-xs text-gray-500 truncate max-w-[100px]">${safeProfName}</p>
                </div>
                <p class="text-xs text-gray-400 font-medium">${time}</p> 
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
        <button data-page="${page - 1}" class="px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100 text-sm font-medium ${page <= 1 ? 'opacity-50 cursor-not-allowed' : ''}" ${page <= 1 ? 'disabled' : ''}>&laquo;</button>
        <span class="text-xs font-semibold text-gray-600 mx-2">Pág ${page} de ${totalPages || 1}</span>
        <button data-page="${page + 1}" class="px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100 text-sm font-medium ${page >= totalPages ? 'opacity-50 cursor-not-allowed' : ''}" ${page >= totalPages ? 'disabled' : ''}>&raquo;</button>
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
        <div class="mobile-only-header">
            <button data-action="back-to-list" class="btn-back-mobile">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <h3 class="font-bold text-lg text-gray-800 ml-2">Detalhes</h3>
        </div>
    `;

    if (!localState.isCashierOpen) {
        detailContainer.innerHTML = `
            ${mobileHeaderHTML}
            <div class="flex flex-col items-center justify-center h-full text-center text-gray-500 p-6">
                <div class="bg-gray-100 p-4 rounded-full mb-4">🔒</div>
                <p class="font-semibold text-lg">Caixa Fechado</p>
                <button data-action="open-cashier" class="py-2 px-6 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow mt-4">Abrir Caixa</button>
            </div>
        `;
        return;
    }

    if (!comanda) {
        detailContainer.innerHTML = `
            <div class="hidden lg:flex flex-col items-center justify-center h-full text-center text-gray-400">
                <svg class="w-16 h-16 mb-4 opacity-20" fill="currentColor" viewBox="0 0 20 20"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>
                <p class="text-lg font-medium">Selecione uma venda</p>
                <p class="text-sm">Toque em um item à esquerda para ver os detalhes</p>
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
        ? "bg-amber-500 text-white hover:bg-amber-600 shadow-lg animate-pulse" 
        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"; 
    
    const saveBtnText = hasUnsaved ? "Salvar Alterações*" : "Salvar";

    const desktopButtons = `
        <div class="grid grid-cols-3 gap-3 mobile-hidden pt-2">
            <button data-action="add-item" class="col-span-1 py-3 bg-blue-50 text-blue-700 font-bold rounded-xl hover:bg-blue-100 transition border border-blue-200 text-sm">
                + Item
            </button>
            <button data-action="save-comanda" class="col-span-1 py-3 font-bold rounded-xl transition text-sm ${saveBtnClass}">
                ${saveBtnText}
            </button>
            <button data-action="go-to-checkout" class="col-span-1 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-200 text-sm">
                Receber
            </button>
        </div>
    `;

    const mobileFABs = `
        <div class="mobile-fabs-container">
            <button data-action="add-item" class="fab-btn-secondary" title="Adicionar Item">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            </button>
            <button data-action="save-comanda" class="fab-btn-secondary ${hasUnsaved ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-gray-600 text-white hover:bg-gray-700'}" title="Salvar Alterações">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
            </button>
            <button data-action="go-to-checkout" class="fab-btn-primary" title="Receber / Pagar">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
        </div>
    `;

    detailContainer.innerHTML = `
        ${mobileHeaderHTML} 
        <div class="flex-grow overflow-y-auto p-4 pb-24 custom-scrollbar"> 
            <div class="flex justify-between items-start mb-6 border-b pb-4">
                <div>
                    <h3 class="text-xl font-bold text-gray-800 truncate max-w-[200px]">${safeClientName}</h3>
                    <p class="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        ${safeProfName}
                    </p>
                    ${!isWalkIn ? 
                        `<button data-action="go-to-appointment" data-id="${comanda.id}" data-date="${comanda.startTime}" class="text-indigo-600 text-xs font-semibold hover:underline flex items-center gap-1 mt-2">
                             Ver na Agenda <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                         </button>` 
                         : `<span class="mt-2 inline-block px-2 py-1 text-xs font-bold bg-blue-100 text-blue-700 rounded-md">Venda Avulsa</span>`}
                </div>
                <div class="flex gap-2">
                    ${isCompleted ? 
                        `<button data-action="reopen-appointment" data-id="${comanda.id}" class="p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200" title="Reabrir"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></button>` 
                        : ''}
                    ${isWalkIn && !isCompleted ? 
                        `<button data-action="delete-walk-in" data-id="${comanda.id}" class="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200" title="Excluir"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>` 
                        : ''}
                </div>
            </div>

            <div id="loyalty-container" class="mb-4"></div>

            <div class="space-y-3">
                <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Itens do Pedido</h4>
                ${Object.values(groupedItems).map(item => {
                    const isOriginal = item.sources && item.sources.includes('original_service');
                    
                    // --- IDENTIFICAÇÃO VISUAL DO ITEM RESGATADO ---
                    const isRedeemedItem = localState.pendingRedemption && String(localState.pendingRedemption.appliedToItemId) === String(item.id);
                    const showRewardTag = item.isReward || isRedeemedItem;

                    return `
                    <div class="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm ${showRewardTag ? 'border-yellow-300 bg-yellow-50 ring-1 ring-yellow-200' : ''}">
                        <div class="flex items-center gap-3 w-full">
                            <div class="flex-grow min-w-0">
                                <p class="text-sm font-semibold text-gray-800 line-clamp-1">
                                    ${showRewardTag ? '🎁 ' : ''}
                                    ${escapeHTML(item.name)}
                                    ${isOriginal ? '<span class="text-[10px] text-indigo-600 bg-indigo-50 px-1 rounded border border-indigo-100 ml-1">Original</span>' : ''}
                                </p>
                                <p class="text-xs text-gray-500">${showRewardTag ? '<span class="text-yellow-700 font-bold bg-yellow-100 px-1 rounded">Prémio Fidelidade</span>' : `R$ ${(item.price || 0).toFixed(2)} un.`}</p>
                            </div>
                            ${!isCompleted ? `
                                <div class="flex items-center bg-gray-100 rounded-lg p-1 gap-3">
                                    ${isOriginal ? 
                                        `<span class="text-sm font-bold text-gray-500 w-16 text-center py-1 bg-gray-200 rounded text-[10px] uppercase">Fixo: ${item.quantity}</span>` 
                                        : 
                                        `<button data-action="decrease-qty" data-item-id="${item.id}" data-item-type="${item.type}" class="w-6 h-6 flex items-center justify-center rounded bg-white text-gray-600 shadow-sm hover:bg-red-50 hover:text-red-600 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-600">-</button>
                                         <span class="text-sm font-bold text-gray-800 w-4 text-center">${item.quantity}</span>
                                         <button data-action="increase-qty" data-item-id="${item.id}" data-item-type="${item.type}" class="w-6 h-6 flex items-center justify-center rounded bg-white text-gray-600 shadow-sm hover:bg-green-50 hover:text-green-600">+</button>`
                                    }
                                </div>
                            ` : `<span class="flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-700 font-bold text-sm rounded-lg">${item.quantity}x</span>`}
                            <div class="flex items-center justify-end w-20">
                                <span class="font-bold text-gray-900 whitespace-nowrap">R$ ${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                `}).join('')}
                ${Object.keys(groupedItems).length === 0 ? '<div class="text-center py-8 text-gray-400 border-2 border-dashed rounded-lg text-sm">Nenhum item adicionado</div>' : ''}
            </div>
        </div>

        <footer class="p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div class="flex flex-col items-start lg:flex-row lg:justify-between lg:items-end mb-4">
                <span class="text-sm text-gray-500 font-medium">Total a Pagar</span>
                <span class="text-4xl lg:text-3xl font-extrabold text-gray-900 mt-1 lg:mt-0">R$ ${total.toFixed(2)}</span>
            </div>
            ${!isCompleted ? desktopButtons : `
                <div class="bg-green-50 text-green-700 text-center py-3 rounded-xl font-bold border border-green-200 flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    Venda Finalizada
                </div>
            `}
        </footer>

        ${!isCompleted ? mobileFABs : ''}
    `;

    if (!isCompleted && (comanda.clientId || comanda.clientName)) {
        checkAndRenderLoyalty(comanda, detailContainer.querySelector('#loyalty-container'));
    }
}

// --- ESTÁGIO 2: TELA DE CHECKOUT (OTIMIZADA) ---
function renderCheckoutView(comanda, container) {
    const rawItems = getSafeAllItems(comanda);
    const subtotal = rawItems.reduce((acc, item) => acc + Number(item.price || 0) * (item.quantity || 1), 0);
    const checkoutState = localState.checkoutState;

    // Cálculo inicial
    const discount = checkoutState.discount || { type: 'real', value: 0 };
    let discountValue = 0;
    if (discount.type === 'percent') {
        discountValue = (subtotal * discount.value) / 100;
    } else {
        discountValue = discount.value;
    }
    if (discountValue > subtotal) discountValue = subtotal;
    const totalFinal = subtotal - discountValue;
    
    // Pagamentos
    const totalPaid = checkoutState.payments.reduce((acc, p) => acc + p.value, 0);
    const remaining = Math.max(0, totalFinal - totalPaid);
    
    // Atualiza valor sugerido se necessário
    if (!checkoutState.amountReceived || remaining > 0) {
         checkoutState.amountReceived = remaining.toFixed(2);
    }

    const mobileHeaderHTML = `
        <div class="mobile-only-header">
            <button data-action="back-to-items" class="btn-back-mobile">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <h3 class="font-bold text-lg text-gray-800 ml-2">Pagamento</h3>
        </div>
    `;

    container.innerHTML = `
        ${mobileHeaderHTML}
        <div class="flex-grow overflow-y-auto p-4 pb-24 custom-scrollbar">
            
            <div class="text-center mb-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                <p class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Subtotal: <span id="checkout-subtotal-display">R$ ${subtotal.toFixed(2)}</span></p>
                
                <div class="flex flex-col items-center justify-center gap-2 mt-4 mb-2">
                     <div class="flex items-center gap-2">
                         <span class="text-xs font-bold text-red-500">Desconto:</span>
                         <div class="flex border rounded-lg bg-white overflow-hidden shadow-sm w-40">
                             <input type="number" id="discount-value" value="${discount.value}" class="w-20 p-1 text-center text-sm font-bold text-red-600 outline-none" placeholder="0">
                             <select id="discount-type" class="bg-gray-100 text-xs font-bold text-gray-700 border-l p-1 outline-none">
                                 <option value="real" ${discount.type === 'real' ? 'selected' : ''}>R$</option>
                                 <option value="percent" ${discount.type === 'percent' ? 'selected' : ''}>%</option>
                             </select>
                         </div>
                     </div>
                     <input type="text" id="discount-reason" class="w-64 p-2 text-xs border border-gray-200 rounded-lg text-center focus:border-indigo-300 focus:ring focus:ring-indigo-100 outline-none" placeholder="Motivo do desconto (opcional)" value="${checkoutState.discountReason || ''}">
                </div>

                <p class="text-5xl font-extrabold text-gray-800 mt-2" id="checkout-total-display">R$ ${totalFinal.toFixed(2)}</p>
                
                <div id="checkout-status-msg" class="mt-2">
                    ${remaining <= 0.01 
                        ? '<p class="text-green-600 font-bold text-lg">Pago</p>' 
                        : `<p class="text-red-500 font-medium">Faltam: <span id="checkout-remaining-display">R$ ${remaining.toFixed(2)}</span></p>`
                    }
                </div>
            </div>

            <div class="space-y-3 mb-6">
                ${checkoutState.payments.map((p, index) => `
                    <div class="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200 shadow-sm animate-fade-in-fast">
                        <div class="flex items-center gap-3">
                             <div class="bg-gray-100 p-2 rounded-lg">
                                <span class="font-bold text-xs uppercase text-gray-600">${p.method}</span>
                             </div>
                             ${p.installments > 1 ? `<span class="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">${p.installments}x</span>` : ''}
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="font-bold text-gray-900">R$ ${p.value.toFixed(2)}</span>
                            <button data-action="remove-payment-checkout" data-index="${index}" class="text-red-400 hover:text-red-600 p-1"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                        </div>
                    </div>
                `).join('')}
            </div>

            ${remaining > 0.01 ? `
            <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <label class="block text-xs font-bold text-gray-500 uppercase mb-3">Adicionar Pagamento</label>
                <div class="grid grid-cols-3 gap-2 mb-4">
                    ${['dinheiro', 'pix', 'debito', 'credito', 'crediario'].map(m => `
                        <button data-action="select-method" data-method="${m}" class="p-2 rounded-lg border text-xs font-bold uppercase transition ${checkoutState.selectedMethod === m ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}">
                            ${m}
                        </button>
                    `).join('')}
                </div>
                
                ${['credito', 'crediario'].includes(checkoutState.selectedMethod) ? `
                    <div class="mb-3">
                        <label class="text-xs text-gray-500">Parcelas</label>
                        <select id="checkout-installments" class="w-full mt-1 p-2 border rounded-lg text-sm bg-gray-50">
                            ${Array.from({length: 12}, (_, i) => `<option value="${i+1}" ${checkoutState.installments === i+1 ? 'selected' : ''}>${i+1}x</option>`).join('')}
                        </select>
                    </div>
                ` : ''}

                <div class="flex items-end gap-2">
                    <div class="flex-grow">
                        <label class="text-xs text-gray-500">Valor</label>
                        <input type="number" id="checkout-amount" step="0.01" class="w-full p-2 border rounded-lg text-lg font-bold" value="${remaining.toFixed(2)}">
                    </div>
                    <button data-action="add-payment-checkout" class="h-[46px] px-4 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-900 transition">OK</button>
                </div>
            </div>
            ` : ''}
        </div>

        <footer class="p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] grid grid-cols-2 gap-3">
            <button data-action="back-to-items" class="py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition">Voltar</button>
            <button data-action="finalize-checkout" class="py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-200">Finalizar</button>
        </footer>
    `;

    // Função interna para atualizar APENAS os números sem redesenhar o HTML
    const updateCheckoutUI = () => {
        // Recalcular
        const dType = localState.checkoutState.discount.type;
        const dVal = localState.checkoutState.discount.value;
        let cDiscount = (dType === 'percent') ? (subtotal * dVal) / 100 : dVal;
        if (cDiscount > subtotal) cDiscount = subtotal;
        
        const cFinal = subtotal - cDiscount;
        const cPaid = localState.checkoutState.payments.reduce((acc, p) => acc + p.value, 0);
        const cRemaining = Math.max(0, cFinal - cPaid);

        // Atualizar DOM
        const elTotal = container.querySelector('#checkout-total-display');
        if (elTotal) elTotal.textContent = `R$ ${cFinal.toFixed(2)}`;

        const elStatus = container.querySelector('#checkout-status-msg');
        if (elStatus) {
            if (cRemaining <= 0.01) {
                elStatus.innerHTML = '<p class="text-green-600 font-bold text-lg">Pago</p>';
            } else {
                elStatus.innerHTML = `<p class="text-red-500 font-medium">Faltam: <span id="checkout-remaining-display">R$ ${cRemaining.toFixed(2)}</span></p>`;
            }
        }
        
        // Atualiza input de pagamento se ainda não foi pago
        const elAmount = container.querySelector('#checkout-amount');
        if (elAmount && cRemaining > 0) {
             // Opcional: Atualizar o valor sugerido se o usuário não estiver digitando nele
             if (document.activeElement !== elAmount) {
                 elAmount.value = cRemaining.toFixed(2);
             }
        }
    };

    // Listeners OTIMIZADOS
    container.querySelector('#discount-value')?.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value) || 0;
        localState.checkoutState.discount.value = val;
        // NÃO chama renderComandaDetail(), chama updateCheckoutUI
        updateCheckoutUI();
    });

    container.querySelector('#discount-type')?.addEventListener('change', (e) => {
        localState.checkoutState.discount.type = e.target.value;
        updateCheckoutUI();
    });
    
    // Listener para o motivo do desconto
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

// --- FIDELIDADE E MODAIS ---

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
        rewardDiv.className = "bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4 shadow-sm flex justify-between items-center animate-fade-in";
        rewardDiv.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="bg-yellow-100 p-2 rounded-full text-yellow-600">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
                <div>
                    <p class="text-sm font-bold text-yellow-800">Prémio Disponível!</p>
                    <p class="text-xs text-yellow-700">Saldo: <strong>${currentPoints} pts</strong></p>
                </div>
            </div>
        `;
        const btn = document.createElement('button');
        btn.innerText = "Resgatar";
        btn.className = "text-xs font-bold bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition-colors";
        btn.onclick = () => openRewardSelectionModal(availableRewards, comanda);
        rewardDiv.appendChild(btn);
        containerElement.innerHTML = '';
        containerElement.appendChild(rewardDiv);
    }
}

function openRewardSelectionModal(rewards, comanda) {
    const contentHTML = `
        <div class="space-y-4">
            <p class="text-sm text-gray-600 mb-4">O cliente possui pontos suficientes para resgatar os seguintes itens:</p>
            <div class="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                ${rewards.map(r => {
                    const cost = r.costPoints || r.points || 0;
                    const name = r.name || r.reward;
                    const type = r.type || 'money';
                    const discountValue = r.discount ? parseFloat(r.discount).toFixed(2) : '0.00';
                    let typeLabel = '';
                    let typeColor = 'bg-gray-100 text-gray-600';

                    // Definir rótulos e cores baseados no tipo
                    switch(type) {
                        case 'service': typeLabel = 'Serviço'; typeColor = 'bg-indigo-100 text-indigo-700'; break;
                        case 'product': typeLabel = 'Produto'; typeColor = 'bg-green-100 text-green-700'; break;
                        case 'package': typeLabel = 'Pacote'; typeColor = 'bg-purple-100 text-purple-700'; break;
                        case 'money': default: typeLabel = 'Valor Livre'; typeColor = 'bg-yellow-100 text-yellow-700'; break;
                    }

                    return `
                    <button data-action="select-reward" data-reward-id="${r.id || name}" class="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-yellow-400 hover:bg-yellow-50 transition-all group">
                        <div class="text-left flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded ${typeColor}">${typeLabel}</span>
                                <p class="font-bold text-gray-800 group-hover:text-yellow-700">${escapeHTML(name)}</p>
                            </div>
                            <p class="text-xs text-gray-500">Custo: ${cost} pontos</p>
                        </div>
                        <div class="text-right">
                            <span class="block text-sm font-bold text-green-600">Desc. R$ ${discountValue}</span>
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

// --- FUNÇÃO ATUALIZADA: RESGATE ROBUSTO E INTEGRAÇÃO FINANCEIRA ---
async function addRewardToComanda(reward, comanda) {
    const cost = Number(reward.costPoints || reward.points || 0);
    const name = reward.name || reward.reward;
    const type = reward.type || 'money';
    
    // --- CENÁRIO 1: VALOR LIVRE (MONEY) ---
    if (type === 'money') {
        const discountValue = parseFloat(reward.discount) || 0;
        
        if (discountValue <= 0) {
            showNotification('Erro', 'O valor do desconto configurado é inválido.', 'error');
            return;
        }

        // Aplica o desconto no estado do checkout
        localState.checkoutState.discount = {
            type: 'real',
            value: discountValue
        };
        
        localState.checkoutState.discountReason = `Resgate Fidelidade: ${name}`;
        
        localState.pendingRedemption = {
            rewardId: reward.id || null,
            name: name,
            cost: cost,
            type: 'money'
        };

        showNotification('Sucesso', `Prémio "${name}" resgatado! Desconto de R$ ${discountValue.toFixed(2)} aplicado.`, 'success');
        
        // Renderiza o checkout diretamente, pois não há item específico
        renderComandaDetail(); 
        return;
    }

    // --- CENÁRIO 2: ITEM ESPECÍFICO (SERVIÇO, PRODUTO, PACOTE) ---
    
    // 1. Busca todos os itens atuais da comanda
    const allItems = getSafeAllItems(comanda);

    // 2. Tenta encontrar EXATAMENTE o item do prémio na comanda
    // Normalização de IDs para evitar falhas de comparação (String vs Number)
    const rewardItemId = reward.itemId ? String(reward.itemId) : null;

    if (!rewardItemId) {
        showNotification('Erro de Configuração', `O prémio "${name}" não tem um item vinculado nas configurações.`, 'error');
        return;
    }

    const match = allItems.find(i => {
        // Normaliza IDs do item da comanda
        const itemId = i.id ? String(i.id) : null;
        const itemServiceId = i.serviceId ? String(i.serviceId) : (i.service_id ? String(i.service_id) : null);
        const itemProductId = i.productId ? String(i.productId) : (i.product_id ? String(i.product_id) : null);

        // Verifica compatibilidade baseado no tipo do prémio
        if (type === 'service') {
            return (itemId === rewardItemId || itemServiceId === rewardItemId);
        } else if (type === 'product') {
            return (itemId === rewardItemId || itemProductId === rewardItemId);
        } else if (type === 'package') {
            // Lógica para pacote pode variar dependendo da estrutura do item na comanda
            return itemId === rewardItemId; 
        }
        return false;
    });

    if (match) {
        // --- ITEM ENCONTRADO (APLICAR DESCONTO) ---
        
        // Se o desconto configurado for 0 ou null, assume 100% do valor do item (preço cheio)
        // Se tiver valor configurado, usa o valor configurado.
        let discountValue = parseFloat(reward.discount);
        if (!discountValue || discountValue <= 0) {
            discountValue = parseFloat(match.price || 0);
        }
        
        // Aplica o desconto no estado do checkout
        localState.checkoutState.discount = {
            type: 'real',
            value: discountValue
        };
        
        // Define o motivo automaticamente
        localState.checkoutState.discountReason = `Resgate Fidelidade: ${name}`;
        
        // Armazena informações do resgate e referencia o item para identificação visual
        localState.pendingRedemption = {
            rewardId: reward.id || null,
            name: name,
            cost: cost,
            type: type,
            appliedToItemId: match.id 
        };

        showNotification('Sucesso', `Prémio "${name}" resgatado! Item encontrado e desconto de R$ ${discountValue.toFixed(2)} aplicado.`, 'success');
        
        // Atualiza a interface (agora identificará visualmente o item)
        renderComandaDetail(); 
    } else {
        // --- ITEM NÃO ENCONTRADO (BLOQUEAR) ---
        let itemTypeName = type === 'service' ? 'serviço' : (type === 'product' ? 'produto' : 'pacote');
        
        showNotification(
            'Item Não Encontrado', 
            `Para resgatar o prémio "${name}", o ${itemTypeName} correspondente deve estar lançado nesta comanda. Por favor, adicione o item primeiro e tente resgatar novamente.`, 
            'warning'
        );
    }
}

function openAddItemModal() {
    if (!localState.isCashierOpen) return showNotification('Caixa Fechado', 'Abra o caixa antes de adicionar itens.', 'error');
    const { modalElement, close } = showGenericModal({ title: "Adicionar Item à Comanda", contentHTML: '<div id="add-item-content"></div>', maxWidth: 'max-w-4xl' });

    const renderCatalogView = () => {
        const contentContainer = modalElement.querySelector('#add-item-content');
        contentContainer.innerHTML = `
            <input type="search" id="item-search-input" placeholder="Pesquisar por nome..." class="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><h4 class="font-semibold mb-2 text-center text-indigo-600">Serviços</h4><div id="modal-service-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-green-600">Produtos</h4><div id="modal-product-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-purple-600">Pacotes</h4><div id="modal-package-list" class="space-y-2 max-h-80 overflow-y-auto custom-scrollbar"></div></div>
            </div>`;

        const filterAndRender = (term = '') => {
            const lowerTerm = term.toLowerCase();
            const icons = {
                service: '<svg class="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',
                product: '<svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>',
                package: '<svg class="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" /></svg>'
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
                    <button data-action="select-item-for-quantity" data-item-type="${type}" data-item-id="${item.id}" class="flex items-center gap-2 w-full p-2 bg-white border rounded hover:bg-gray-50 transition text-left">
                        <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-50">${icons[type]}</div>
                        <span class="flex-grow text-sm truncate">${escapeHTML(item.name)}</span>
                        <span class="font-bold text-xs text-gray-700">R$ ${item.price.toFixed(2)}</span>
                    </button>
                `}).join('') || `<p class="text-xs text-gray-400 text-center py-2">Nada encontrado</p>`;
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
            <div class="text-center p-8 relative">
                <button data-action="back-to-catalog" class="absolute top-0 left-0 text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> Voltar
                </button>
                <h3 class="font-bold text-2xl text-gray-800 mt-4">${escapeHTML(item.name)}</h3>
                <p class="text-lg text-gray-500 font-medium">R$ ${item.price.toFixed(2)}</p>
                <div class="my-8 flex items-center justify-center gap-6">
                    <button id="quantity-minus-btn" class="w-14 h-14 rounded-full bg-gray-100 text-2xl font-bold text-gray-600 hover:bg-gray-200 transition disabled:opacity-50">-</button>
                    <span id="quantity-display" class="text-5xl font-bold w-24 text-center text-indigo-700">${quantity}</span>
                    <button id="quantity-plus-btn" class="w-14 h-14 rounded-full bg-gray-100 text-2xl font-bold text-gray-600 hover:bg-gray-200 transition">+</button>
                </div>
                <button data-action="confirm-add-item" class="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg text-lg">Adicionar à Comanda</button>
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
                <label class="block text-sm font-medium text-gray-700">Cliente</label>
                <input type="text" id="client-search" class="mt-1 w-full p-2 border rounded-md bg-white focus:ring-2 focus:ring-indigo-500" placeholder="Digite nome ou telefone..." autocomplete="off">
                <input type="hidden" id="selected-client-id" required>
                <ul id="client-suggestions" class="hidden absolute z-50 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto mt-1"></ul>
                <button type="button" data-action="new-client-from-sale" class="text-xs text-blue-600 hover:underline mt-1 font-medium inline-block">+ Cadastrar Novo Cliente</button>
            </div>
            <div>
                <label for="new-sale-professional" class="block text-sm font-medium text-gray-700">Profissional</label>
                <select id="new-sale-professional" required class="mt-1 w-full p-2 border rounded-md bg-white"><option value="">Selecione...</option>${professionalsOptions}</select>
            </div>
            <div class="pt-4 border-t"><button type="submit" id="btn-start-sale" class="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">Iniciar Venda</button></div>
        </form>
    `;
    const { modalElement } = showGenericModal({ title: "Nova Venda Avulsa", contentHTML: contentHTML, maxWidth: 'max-w-md' });
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
            suggestionsList.innerHTML = '<li class="p-2 text-xs text-gray-500">Buscando...</li>';
            suggestionsList.classList.remove('hidden');
            const results = await clientsApi.getClients(state.establishmentId, term, 10);
            if (results.length === 0) suggestionsList.innerHTML = '<li class="p-2 text-xs text-gray-500">Nenhum cliente encontrado</li>';
            else {
                suggestionsList.innerHTML = results.map(c => `<li data-client-id="${c.id}" data-client-name="${c.name}" data-client-phone="${c.phone}" class="p-2 hover:bg-indigo-50 cursor-pointer border-b last:border-0 transition-colors"><div class="font-bold text-sm text-gray-800">${escapeHTML(c.name)}</div><div class="text-xs text-gray-500">${c.phone || 'Sem telefone'}</div></li>`).join('');
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
        <form id="comandas_clientRegistrationForm" class="flex flex-col h-full">
            <div class="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar" style="max-height: 80vh;">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label class="block text-sm font-medium text-gray-700">Nome *</label><input type="text" id="regClientName" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm"></div>
                    <div><label class="block text-sm font-medium text-gray-700">Telefone (ID) *</label><input type="tel" id="regClientPhone" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm" placeholder="Apenas números"></div>
                </div>
            </div>
            <footer class="p-5 border-t bg-gray-100 flex justify-end gap-3 flex-shrink-0">
                <button type="submit" class="py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-md">Salvar Cliente</button>
            </footer>
        </form>
    `;
    showGenericModal({ title: 'Cadastrar Novo Cliente', contentHTML: modalContent, maxWidth: 'max-w-2xl' });
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
        <form id="open-cashier-form" class="space-y-4">
            <div>
                <label for="initial-amount" class="block text-sm font-medium text-gray-700">Valor Inicial do Caixa</label>
                <div class="mt-1 relative"><span class="absolute left-3 top-2 text-gray-500 font-semibold">R$</span><input type="number" step="0.01" min="0" id="initial-amount" required class="w-full p-2 pl-12 border rounded-md text-lg font-semibold" placeholder="0.00" value="0.00"></div>
            </div>
            <div class="pt-4 border-t"><button type="submit" class="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition shadow-md">Confirmar Abertura</button></div>
        </form>
    `;
    const { modalElement } = showGenericModal({ title: "Abrir Caixa", contentHTML, maxWidth: 'max-w-md' });
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
            <form id="close-cashier-form" class="space-y-4">
                <div class="grid grid-cols-2 gap-4 text-center">
                    <div class="bg-blue-50 p-3 rounded-lg border border-blue-100"><p class="text-xs text-gray-500 uppercase font-bold">Abertura</p><p class="text-xl font-bold text-blue-700">R$ ${report.initialAmount.toFixed(2)}</p></div>
                    <div class="bg-green-50 p-3 rounded-lg border border-green-100"><p class="text-xs text-gray-500 uppercase font-bold">Vendas Dinheiro</p><p class="text-xl font-bold text-green-700">R$ ${report.cashSales.toFixed(2)}</p></div>
                </div>
                <div class="bg-gray-800 text-white p-4 rounded-lg text-center shadow-lg"><p class="text-sm font-medium opacity-80">Valor Esperado em Caixa</p><p class="text-3xl font-bold">R$ ${report.expectedAmount.toFixed(2)}</p></div>
                <hr>
                <div>
                    <label for="final-amount" class="block text-sm font-bold text-gray-700">Valor Final (Contado)</label>
                    <div class="mt-1 relative"><span class="absolute left-3 top-2 text-gray-500 font-semibold">R$</span><input type="number" step="0.01" min="0" id="final-amount" required class="w-full p-2 pl-12 border rounded-md text-lg font-semibold border-gray-300 focus:ring-2 focus:ring-red-500" placeholder="0.00" value="${report.expectedAmount.toFixed(2)}"></div>
                </div>
                <div class="pt-4 border-t"><button type="submit" class="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition shadow-md">Confirmar e Fechar</button></div>
            </form>
        `;
        const { modalElement } = showGenericModal({ title: "Fechar Caixa", contentHTML, maxWidth: 'max-w-md' });
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

// --- HANDLERS E OPERAÇÕES CRÍTICAS ---

async function handleFilterClick(filter) {
    if (localState.activeFilter === filter) return;
    localState.activeFilter = filter;
    localState.paging.page = 1;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('bg-white', 'text-indigo-600', 'shadow'));
    document.querySelector(`[data-filter="${filter}"]`).classList.add('bg-white', 'text-indigo-600', 'shadow');
    document.getElementById('finalizadas-datepicker').classList.toggle('hidden', filter !== 'finalizadas');
    
    // UI Otimista: Limpa e mostra loader imediatamente
    hideMobileDetail();
    localState.selectedComandaId = null;
    localState.viewMode = 'items';
    const listContainer = document.getElementById('comandas-list');
    if (listContainer) listContainer.innerHTML = '<div class="loader mx-auto mt-10"></div>';
    
    await fetchAndDisplayData();
    renderComandaDetail();
}

function handleComandaClick(comandaId) {
    localState.selectedComandaId = comandaId;
    localState.viewMode = 'items';
    // Limpa estado pendente de resgate ao mudar de comanda
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
        console.error("Tentativa de adicionar item sem ID:", itemData);
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

// js/ui/comandas.js - Parte corrigida

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

    // --- LÓGICA DE FIDELIDADE (SIMPLIFICADA: APENAS PONTOS POR VISITA) ---
    let pointsToAward = 0;
    const settings = localState.loyaltySettings;

    if (settings && settings.enabled) {
        // MODIFICAÇÃO: Removemos a verificação de tipo (Valor vs Visita).
        // Agora, independente da configuração antiga, usa-se a regra de Visita.
        // Se não houver valor definido, atribui 1 ponto por padrão.
        pointsToAward = parseInt(settings.pointsPerVisit || 1, 10);
        
        // Log para depuração (opcional, pode remover depois)
        console.log(`Fidelidade: Cliente ganhou ${pointsToAward} pontos fixos pela visita.`);
    }

    // Prepara o objeto de desconto incluindo o motivo
    const enrichedDiscount = {
        ...discount,
        reason: localState.checkoutState.discountReason || '' 
    };

    const data = {
        payments,
        totalAmount: Number(totalAmount),
        items: finalItems,
        cashierSessionId: localState.activeCashierSessionId,
        loyaltyPointsEarned: pointsToAward, // Envia a pontuação fixa calculada acima
        discount: enrichedDiscount,
        loyaltyRedemption: localState.pendingRedemption 
    };

    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center backdrop-blur-sm';
    loadingOverlay.innerHTML = '<div class="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center"><div class="loader mb-4 border-t-indigo-600"></div><p>Finalizando venda...</p></div>';
    document.body.appendChild(loadingOverlay);

    try {
        if (isAppointment) await appointmentsApi.checkoutAppointment(comanda.id, data);
        else {
            data.establishmentId = state.establishmentId;
            data.clientId = comanda.clientId; data.clientName = comanda.clientName; data.professionalId = comanda.professionalId;
            if (comanda.clientPhone) data.clientPhone = comanda.clientPhone;
            await salesApi.createSale(data);
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
    handleComandaClick(newComanda.id);
}

// --- INICIALIZAÇÃO OTIMIZADA ---

async function fetchAndDisplayData() {
    const listContainer = document.getElementById('comandas-list');
    
    // Exibe loader apenas se a lista estiver vazia ou já tiver um loader (evita piscar se já tem dados)
    if (!listContainer.hasChildNodes() || listContainer.innerHTML.includes('loader')) {
        listContainer.innerHTML = '<div class="loader mx-auto mt-10"></div>';
    }
    
    const filterDate = localState.activeFilter === 'finalizadas' ? document.getElementById('filter-date').value : null;

    try {
        // --- OTIMIZAÇÃO: PARALELISMO DE REQUISIÇÕES CRÍTICAS ---
        const sessionPromise = cashierApi.getActiveSession();
        const comandasPromise = comandasApi.getComandas(state.establishmentId, filterDate, localState.paging.page, localState.paging.limit);
        
        // --- CORREÇÃO FUNDAMENTAL ---
        // Sempre busca as configurações de fidelidade para garantir que não estamos usando cache antigo
        const loyaltyPromise = establishmentsApi.getEstablishmentDetails(state.establishmentId);

        const [activeSession, response, establishmentData] = await Promise.all([
            sessionPromise,
            comandasPromise,
            loyaltyPromise
        ]);

        // Processamento dos resultados
        localState.isCashierOpen = !!activeSession;
        localState.activeCashierSessionId = activeSession ? activeSession.id : null;
        updateCashierUIState();
        
        if (establishmentData && establishmentData.loyaltyProgram) {
            localState.loyaltySettings = establishmentData.loyaltyProgram;
        }

        if (!localState.isCashierOpen && localState.activeFilter === 'atendimento') {
            renderComandaList();
            renderComandaDetail();
            return;
        }

        localState.allComandas = response.data || response;
        localState.paging.total = response.total || response.length;
        
        // --- CARREGAMENTO DE CATÁLOGO OTIMIZADO ---
        // Só carrega se o catálogo estiver vazio
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

        if (dateInput && localState.activeFilter === 'finalizadas') {
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
                case 'back-to-list': hideMobileDetail(); localState.selectedComandaId = null; document.querySelectorAll('.comanda-card').forEach(el => el.classList.remove('selected')); renderComandaDetail(); break;
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

                    const newPayment = { 
                        method: localState.checkoutState.selectedMethod, 
                        value: value 
                    };
                    if (['credito', 'crediario'].includes(localState.checkoutState.selectedMethod) && localState.checkoutState.installments > 1) {
                        newPayment.installments = localState.checkoutState.installments;
                    }
                    
                    localState.checkoutState.payments.push(newPayment);
                    localState.checkoutState.selectedMethod = 'dinheiro'; // Reset
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
                        showNotification('Erro', 'Item inválido para adição.', 'error');
                        return;
                    }
                    
                    const existingItems = getSafeAllItems(comanda);
                    let itemToClone = existingItems.find(i => i.id == itemId && i.type === itemType);

                    if (!itemToClone) {
                        const catalog = localState.catalog[itemType + 's'] || [];
                        itemToClone = catalog.find(i => i.id == itemId);
                    }

                    const safeItem = itemToClone 
                        ? { 
                            id: itemToClone.id, 
                            name: itemToClone.name, 
                            price: Number(itemToClone.price), 
                            type: itemToClone.type 
                          } 
                        : { 
                            id: itemId, 
                            name: 'Item Indisponível', 
                            price: 0, 
                            type: itemType 
                          };

                    await handleAddItemToComanda(safeItem, 1);
                    break;
                }
                case 'decrease-qty': {
                    await handleRemoveItemFromComanda(target.dataset.itemId, target.dataset.itemType);
                    break;
                }
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
                    const appointmentId = target.dataset.id;
                    const startTime = target.dataset.date;
                    navigateTo('agenda-section', { scrollToAppointmentId: appointmentId, targetDate: new Date(startTime) });
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

    if (params.initialFilter) localState.activeFilter = params.initialFilter === 'finalizadas' ? 'finalizadas' : 'atendimento';
    if (params.selectedAppointmentId) localState.selectedComandaId = params.selectedAppointmentId;
    
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('bg-white', 'text-indigo-600', 'shadow'));
    document.querySelector(`[data-filter="${localState.activeFilter}"]`).classList.add('bg-white', 'text-indigo-600', 'shadow');
    document.getElementById('finalizadas-datepicker').classList.toggle('hidden', localState.activeFilter !== 'finalizadas');
    if (params.filterDate) document.getElementById('filter-date').value = new Date(params.filterDate).toISOString().split('T')[0];

    await fetchAndDisplayData();
}