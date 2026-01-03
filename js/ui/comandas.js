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
    clients: [],
    activeFilter: 'atendimento',
    selectedComandaId: null,
    isCashierOpen: false,
    activeCashierSessionId: null,
    loyaltySettings: null, 
    paging: {
        page: 1,
        limit: 12,
        total: 0,
    },
};
let pageEventListener = null;
let contentDiv = null;

// --- 3. FUNÇÕES AUXILIARES (MOBILE & UI & LÓGICA) ---

function getSafeAllItems(comanda) {
    if (comanda.status === 'completed') {
        const finalItems = comanda.comandaItems || comanda.items || [];
        if (finalItems.length > 0) return finalItems;
        return comanda.services || [];
    }

    const baseServices = comanda.services || [];
    const extras = [...(comanda.comandaItems || []), ...(comanda.items || [])];

    let combined = [...baseServices];

    extras.forEach(extra => {
        if (extra.type === 'product') {
            combined.push(extra);
            return;
        }

        const exists = combined.some(existing => {
            const sameId = existing.id && extra.id && existing.id === extra.id;
            const sameName = existing.name && extra.name && existing.name === extra.name;
            return sameId || sameName;
        });

        if (!exists) {
            combined.push(extra);
        }
    });

    return combined;
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
                <div id="cashier-controls" class="flex items-center gap-2"></div>
            </div>

            ${!localState.isCashierOpen ? `
                <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
                    <div class="flex">
                        <div class="flex-shrink-0">⚠️</div>
                        <div class="ml-3">
                            <p class="text-sm text-yellow-700">
                                <strong>Caixa Fechado!</strong> Abra o caixa para realizar vendas.
                            </p>
                        </div>
                    </div>
                </div>
            ` : ''}

            <div id="comandas-layout">
                <div id="comandas-list-column">
                    <div class="p-4 pb-2 sticky top-0 bg-white z-10 border-b border-gray-100">
                        <button 
                            data-action="new-sale" 
                            class="w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-md flex items-center justify-center gap-2 mb-3 ${!localState.isCashierOpen ? 'opacity-50 cursor-not-allowed' : ''}"
                            ${!localState.isCashierOpen ? 'disabled' : ''}
                        >
                            <span>+</span> NOVA VENDA
                        </button>
                        
                        <div class="flex bg-gray-100 rounded-lg p-1">
                            <button data-filter="atendimento" class="filter-btn flex-1 text-sm font-medium py-2 rounded-md transition-all">Em Aberto</button>
                            <button data-filter="finalizadas" class="filter-btn flex-1 text-sm font-medium py-2 rounded-md transition-all">Finalizadas</button>
                        </div>
                    </div>

                    <div id="finalizadas-datepicker" class="hidden px-4 py-2 bg-gray-50 border-b">
                        <label for="filter-date" class="text-xs font-semibold text-gray-500 uppercase">Data:</label>
                        <input type="date" id="filter-date" value="${todayStr}" class="w-full mt-1 p-2 border rounded-md bg-white text-sm">
                    </div>

                    <div id="comandas-list" class="p-3 space-y-2 pb-20">
                        <div class="loader mx-auto mt-10"></div>
                    </div>
                </div>

                <div id="comanda-detail-container">
                    <div class="hidden lg:flex flex-col items-center justify-center h-full text-center text-gray-400">
                        <p>Selecione uma venda para ver os detalhes</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderCashierControls() {
    const container = document.getElementById('cashier-controls');
    if (!container) return;
    if (localState.isCashierOpen) {
        container.innerHTML = `
            <span class="hidden sm:inline-block text-sm font-medium text-green-700 bg-green-100 py-1 px-3 rounded-full">Caixa Aberto</span>
            <button data-action="close-cashier" class="py-2 px-4 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 text-sm">Fechar Caixa</button>
            <button data-action="view-sales-report" class="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 text-sm">Relatório</button>
        `;
    } else {
        container.innerHTML = `
            <span class="hidden sm:inline-block text-sm font-medium text-red-700 bg-red-100 py-1 px-3 rounded-full">Caixa Fechado</span>
            <button data-action="open-cashier" class="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 text-sm">Abrir Caixa</button>
            <button data-action="view-sales-report" class="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 text-sm">Relatório</button>
        `;
    }
}

function renderComandaList() {
    const listContainer = document.getElementById('comandas-list');
    if (!listContainer) return;
    
    if (!localState.isCashierOpen && localState.activeFilter === 'atendimento') {
        listContainer.innerHTML = `
            <div class="text-center py-10 opacity-60">
                <p class="text-sm font-medium text-gray-700">Caixa Fechado</p>
                <p class="text-xs text-gray-500">Abra o caixa para ver as vendas</p>
            </div>
        `;
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
        renderPaginationControls(listContainer);
        return;
    }

    listContainer.innerHTML = filteredComandas.map(comanda => {
        const allItems = getSafeAllItems(comanda);
        const total = allItems.reduce((acc, item) => acc + (item.price || 0), 0);
        
        const isSelected = comanda.id === localState.selectedComandaId;
        const time = new Date(comanda.startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        const isWalkIn = comanda.type === 'walk-in' || comanda.id.startsWith('temp-');
        
        const safeClientName = escapeHTML(comanda.clientName);
        const safeProfName = escapeHTML(comanda.professionalName);
        
        const typeIndicator = isWalkIn
            ? `<span class="text-[10px] font-bold uppercase text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md">Avulso</span>`
            : `<span class="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md">Agendado</span>`;

        return `
            <div data-action="select-comanda" data-comanda-id="${comanda.id}" 
                 class="comanda-card cursor-pointer ${isSelected ? 'selected' : ''}">
                
                <div class="flex justify-between items-start mb-1">
                    <p class="font-bold text-gray-800 truncate max-w-[70%]">${safeClientName}</p>
                    <p class="font-bold text-gray-900">R$ ${total.toFixed(2)}</p>
                </div>
                
                <div class="flex justify-between items-center mt-1">
                    <div class="flex items-center gap-2">
                        ${typeIndicator}
                        <p class="text-xs text-gray-500 truncate max-w-[100px]">${safeProfName}</p>
                    </div>
                    <p class="text-xs text-gray-400 font-medium">${time}</p> 
                </div>
            </div>
        `;
    }).join('');

    renderPaginationControls(listContainer);
}

function renderPaginationControls(container) {
    const { page, total, limit } = localState.paging;
    const totalPages = Math.ceil((total || 0) / limit);
    
    if (totalPages <= 1) return;

    let paginationHtml = `<div class="flex gap-2 justify-center mt-4 flex-wrap pb-4">`;
    
    if (page > 1) {
        paginationHtml += `<button data-page="${page - 1}" class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm">&laquo;</button>`;
    }
    
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= page - 2 && i <= page + 2)) {
            paginationHtml += `<button data-page="${i}" class="px-3 py-1 rounded text-sm ${i === page ? 'bg-indigo-600 text-white font-bold' : 'bg-gray-200 hover:bg-gray-300'}">${i}</button>`;
        } else if (i === page - 3 || i === page + 3) {
            paginationHtml += `<span class="px-2 text-gray-400">...</span>`;
        }
    }
    
    if (page < totalPages) {
        paginationHtml += `<button data-page="${page + 1}" class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm">&raquo;</button>`;
    }
    
    paginationHtml += `</div>`;
    container.innerHTML += paginationHtml;

    container.querySelectorAll('button[data-page]').forEach(btn => {
        btn.onclick = (e) => {
            e.stopPropagation(); 
            localState.paging.page = parseInt(btn.dataset.page, 10);
            fetchAndDisplayData();
        };
    });
}

function renderComandaDetail() {
    const detailContainer = document.getElementById('comanda-detail-container');
    if (!detailContainer) return;
    
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
                <p class="text-sm mb-6">Abra o caixa para ver detalhes.</p>
                <button data-action="open-cashier" class="py-2 px-6 bg-green-600 text-white font-bold rounded-lg">Abrir Caixa</button>
            </div>
        `;
        return;
    }
    
    const comanda = localState.allComandas.find(c => c.id === localState.selectedComandaId);

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
    const isWalkIn = comanda.type === 'walk-in' || comanda.id.startsWith('temp-');
    
    const goToAppointmentBtn = !isWalkIn
        ? `<button data-action="go-to-appointment" data-id="${comanda.id}" data-date="${comanda.startTime}" 
                class="text-indigo-600 text-xs font-semibold hover:underline flex items-center gap-1 mt-1">
             Ir para Agendamento <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
           </button>`
        : '';

    const groupedItems = allItems.reduce((acc, item) => {
        const key = `${item.type}-${item.id || item.name}`;
        if (!acc[key]) {
            acc[key] = { ...item, quantity: 0 };
        }
        acc[key].quantity += 1;
        return acc;
    }, {});
    
    const total = Object.values(groupedItems).reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

    const safeClientName = escapeHTML(comanda.clientName);
    const safeProfName = escapeHTML(comanda.professionalName);

    detailContainer.innerHTML = `
        ${mobileHeaderHTML} <div class="flex-grow overflow-y-auto p-4">
            <div class="flex justify-between items-start mb-6 border-b pb-4">
                <div>
                    <h3 class="text-xl font-bold text-gray-800 truncate max-w-[200px]">${safeClientName}</h3>
                    <p class="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        ${safeProfName}
                    </p>
                    ${isWalkIn ? `<span class="mt-2 inline-block px-2 py-1 text-xs font-bold bg-blue-100 text-blue-700 rounded-md">Venda Avulsa</span>` : goToAppointmentBtn}
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
                ${Object.values(groupedItems).map(item => `
                    <div class="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm ${item.isReward ? 'border-yellow-200 bg-yellow-50' : ''}">
                        <div class="flex items-center gap-3">
                            <span class="flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-700 font-bold text-sm rounded-lg">
                                ${item.quantity}x
                            </span>
                            <div>
                                <p class="text-sm font-semibold text-gray-800 line-clamp-1">
                                    ${item.isReward ? '🎁 ' : ''}${escapeHTML(item.name)}
                                </p>
                                <p class="text-xs text-gray-500">
                                    ${item.isReward ? '<span class="text-yellow-700 font-bold">Prémio Fidelidade</span>' : `R$ ${(item.price || 0).toFixed(2)} un.`}
                                </p>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="font-bold text-gray-900">R$ ${(item.price * item.quantity).toFixed(2)}</span>
                            ${!isCompleted ? 
                                `<button data-action="remove-item" data-item-id="${item.id}" data-item-type="${item.type}" class="text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>` 
                                : ''}
                        </div>
                    </div>
                `).join('')}
                
                ${Object.keys(groupedItems).length === 0 ? '<div class="text-center py-8 text-gray-400 border-2 border-dashed rounded-lg text-sm">Nenhum item adicionado</div>' : ''}
            </div>
        </div>

        <footer class="p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div class="flex justify-between items-end mb-4">
                <span class="text-sm text-gray-500 font-medium">Total a Pagar</span>
                <span class="text-3xl font-extrabold text-gray-900">R$ ${total.toFixed(2)}</span>
            </div>
            
            ${!isCompleted ? `
                <div class="grid grid-cols-2 gap-3">
                    <button data-action="add-item" class="py-3.5 bg-blue-50 text-blue-700 font-bold rounded-xl hover:bg-blue-100 transition border border-blue-200">
                        + ADICIONAR
                    </button>
                    <button data-action="checkout" class="py-3.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-200">
                        RECEBER
                    </button>
                </div>` 
            : `
                <div class="bg-green-50 text-green-700 text-center py-3 rounded-xl font-bold border border-green-200 flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    Venda Finalizada
                </div>
            `}
        </footer>
    `;

    if (!isCompleted) {
        checkAndRenderLoyalty(comanda, detailContainer.querySelector('#loyalty-container'));
    }
}

// --- NOVO: LÓGICA DE FIDELIDADE (UI) ---

async function checkAndRenderLoyalty(comanda, containerElement) {
    if (!containerElement) return;
    
    const settings = localState.loyaltySettings;
    if (!settings || !settings.enabled) {
        return;
    }

    // Tenta encontrar o cliente pelo ID (Telefone) ou Nome
    let client = null;
    if (comanda.clientId) {
        client = localState.clients.find(c => c.id === comanda.clientId);
    } 
    
    if (!client) {
        client = localState.clients.find(c => c.name === comanda.clientName);
    }

    // Se ainda não temos dados de pontos atualizados, busca
    if (!client || client.loyaltyPoints === undefined) {
        try {
            // Se tiver ID (telefone), busca direto
            if (comanda.clientId) {
                 client = await clientsApi.getClient(comanda.clientId);
            } else {
                 // Fallback para busca por nome
                 const foundClients = await clientsApi.getClients(state.establishmentId, comanda.clientName);
                 client = foundClients.find(c => c.name === comanda.clientName) || foundClients[0];
            }
        } catch (e) {
            console.error("[Fidelidade] Erro ao buscar cliente", e);
            return;
        }
    }

    if (!client || !client.loyaltyPoints) return;

    // Filtra prémios
    const availableRewards = (settings.rewards || []).filter(r => client.loyaltyPoints >= r.costPoints);

    if (availableRewards.length > 0) {
        const rewardDiv = document.createElement('div');
        rewardDiv.className = "bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4 shadow-sm flex justify-between items-center";
        
        rewardDiv.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="bg-yellow-100 p-2 rounded-full text-yellow-600">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
                <div>
                    <p class="text-sm font-bold text-yellow-800">Prémio Disponível!</p>
                    <p class="text-xs text-yellow-700">Saldo: <strong>${client.loyaltyPoints} pts</strong></p>
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
            <div class="space-y-2 max-h-96 overflow-y-auto">
                ${rewards.map(r => `
                    <button data-action="select-reward" data-reward-id="${r.id}" class="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-yellow-400 hover:bg-yellow-50 transition-all group">
                        <div class="text-left">
                            <p class="font-bold text-gray-800 group-hover:text-yellow-700">${escapeHTML(r.name)}</p>
                            <p class="text-xs text-gray-500">Custo: ${r.costPoints} pontos</p>
                        </div>
                        <span class="text-sm font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">Grátis</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    const { modalElement, close } = showGenericModal({ 
        title: "🎁 Resgatar Prémio", 
        contentHTML: contentHTML, 
        maxWidth: 'max-w-md' 
    });

    modalElement.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-action="select-reward"]');
        if (btn) {
            const rewardId = btn.dataset.rewardId;
            const reward = rewards.find(r => r.id == rewardId); 
            if (reward) {
                addRewardToComanda(reward, comanda);
                close();
            }
        }
    });
}

async function addRewardToComanda(reward, comanda) {
    const rewardItem = {
        id: reward.serviceId || reward.productId || `reward-${Date.now()}`,
        name: `${reward.name}`,
        price: 0.00, 
        type: reward.serviceId ? 'service' : 'product',
        isReward: true,
        pointsCost: reward.costPoints 
    };

    await handleAddItemToComanda(rewardItem, 1);
}

function _comandas_renderClientRegistrationModal() {
    const modalContent = `
        <form id="comandas_clientRegistrationForm" class="flex flex-col h-full">
            <div class="flex-1 overflow-y-auto p-5 space-y-6" style="max-height: 80vh;">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="regClientName" class="block text-sm font-medium text-gray-700">Nome</label>
                        <input type="text" id="regClientName" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm">
                    </div>
                    <div>
                        <label for="regClientPhone" class="block text-sm font-medium text-gray-700">Telefone (ID)</label>
                        <input type="tel" id="regClientPhone" required class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm">
                        <p class="text-xs text-gray-400 mt-1">Use apenas números.</p>
                    </div>
                    <div>
                        <label for="regClientEmail" class="block text-sm font-medium text-gray-700">E-mail (Opcional)</label>
                        <input type="email" id="regClientEmail" class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm">
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <label for="regClientDobDay" class="block text-sm font-medium text-gray-700">Dia Nasc.</label>
                            <input type="number" id="regClientDobDay" min="1" max="31" class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm">
                        </div>
                        <div>
                            <label for="regClientDobMonth" class="block text-sm font-medium text-gray-700">Mês Nasc.</label>
                            <input type="number" id="regClientDobMonth" min="1" max="12" class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm">
                        </div>
                    </div>
                </div>
                <div>
                    <label for="regClientNotes" class="block text-sm font-medium text-gray-700">Observações</label>
                    <textarea id="regClientNotes" rows="3" class="mt-1 block w-full p-3 rounded-lg border-gray-300 shadow-sm"></textarea>
                </div>
            </div>
            
            <footer class="p-5 border-t bg-gray-100 flex justify-end gap-3 flex-shrink-0">
                <button type="button" data-action="close-modal" data-target="genericModal" class="py-3 px-6 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition shadow-sm">Cancelar</button>
                <button type="submit" class="py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-md">Salvar Cliente</button>
            </footer>
        </form>
    `;

    showGenericModal({
        title: 'Cadastrar Novo Cliente',
        contentHTML: modalContent,
        maxWidth: 'max-w-2xl'
    });
    
    const form = document.getElementById('comandas_clientRegistrationForm');
    if (form) {
         form.addEventListener('submit', _comandas_handleClientRegistration);
    }
}

// --- CADASTRO RÁPIDO COM PROTEÇÃO DE DUPLICIDADE ---
async function _comandas_handleClientRegistration(e) {
    e.preventDefault();
    const form = document.getElementById('comandas_clientRegistrationForm');
    if (!form) return;
    
    const registerButton = form.querySelector('button[type="submit"]');
    const nameInput = form.querySelector('#regClientName');
    const phoneInput = form.querySelector('#regClientPhone');

    const rawPhone = phoneInput.value.trim();
    // Limpa o telefone para ser o ID
    const cleanPhone = rawPhone.replace(/\D/g, '');

    const clientData = {
        establishmentId: state.establishmentId,
        name: nameInput.value.trim(),
        email: form.querySelector('#regClientEmail').value.trim() || null,
        phone: cleanPhone, // Salva o ID limpo
        dob: `${form.querySelector('#regClientDobDay').value.trim()}/${form.querySelector('#regClientDobMonth').value.trim()}`,
        notes: form.querySelector('#regClientNotes').value.trim() || null,
    };

    if (!clientData.name || !cleanPhone) {
         return showNotification('Erro de Validação', 'Nome e Telefone (apenas números) são obrigatórios.', 'error');
    }
    
    registerButton.disabled = true;
    registerButton.textContent = 'Verificando...';

    try {
        // 1. Verifica se já existe pelo ID (Telefone)
        const existingClient = await clientsApi.getClientByPhone(state.establishmentId, cleanPhone);

        if (existingClient) {
            // CLIENTE EXISTE: Apenas avisa e usa o existente
            showNotification('Atenção', `Cliente já cadastrado: ${existingClient.name}. Selecionando existente...`, 'info');
            
            // Atualiza lista local
            const inList = localState.clients.find(c => c.id === existingClient.id);
            if (!inList) localState.clients.push(existingClient);

            document.getElementById('genericModal').style.display = 'none';
            openNewSaleModal(existingClient.id); // Abre venda com o ID existente

        } else {
            // NOVO CLIENTE: Cria
            registerButton.textContent = 'A salvar...';
            const newClient = await clientsApi.createClient(clientData);
            
            localState.clients.push({ id: newClient.id, ...clientData });
            showNotification('Cliente cadastrado com sucesso!', 'success');
            
            document.getElementById('genericModal').style.display = 'none';
            openNewSaleModal(newClient.id);
        }

    } catch (error) {
        showNotification(`Erro ao processar: ${error.message}`, 'error');
    } finally {
        if(registerButton) {
            registerButton.disabled = false;
            registerButton.textContent = 'Salvar Cliente';
        }
    }
}

function openAddItemModal() {
    if (!localState.isCashierOpen) {
        showNotification('Caixa Fechado', 'Abra o caixa antes de adicionar itens.', 'error');
        return;
    }
    
    const { modalElement, close } = showGenericModal({ 
        title: "Adicionar Item à Comanda", 
        contentHTML: '<div id="add-item-content"></div>', 
        maxWidth: 'max-w-4xl' 
    });

    const renderCatalogView = () => {
        let searchTerm = '';
        const contentContainer = modalElement.querySelector('#add-item-content');

        const icons = {
            service: '<svg class="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>',
            product: '<svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>',
            package: '<svg class="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" /></svg>'
        };

        const renderLists = () => {
            const term = searchTerm.toLowerCase();
            const filterItems = (items) => items.filter(item => item.name.toLowerCase().includes(term));

            const lists = {
                'modal-service-list': { items: filterItems(localState.catalog.services), type: 'service' },
                'modal-product-list': { items: filterItems(localState.catalog.products), type: 'product' },
                'modal-package-list': { items: filterItems(localState.catalog.packages), type: 'package' }
            };

            for (const [listId, { items, type }] of Object.entries(lists)) {
                const listEl = contentContainer.querySelector(`#${listId}`);
                if (listEl) {
                    listEl.innerHTML = items.map(item => `
                        <button data-action="select-item-for-quantity" data-item-type="${type}" data-item-id="${item.id}" class="flex items-center gap-3 w-full p-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">${icons[type]}</div>
                            <span class="flex-grow text-left min-w-0 truncate">${escapeHTML(item.name)}</span>
                            <span class="font-semibold flex-shrink-0">R$ ${item.price.toFixed(2)}</span>
                        </button>
                    `).join('') || `<p class="text-xs text-gray-400 text-center p-4">Nenhum item.</p>`;
                }
            }
        };

        contentContainer.innerHTML = `
            <input type="search" id="item-search-input" placeholder="Pesquisar por nome..." class="w-full p-3 mb-4 border rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><h4 class="font-semibold mb-2 text-center text-indigo-600">Serviços</h4><div id="modal-service-list" class="space-y-2 max-h-96 overflow-y-auto"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-green-600">Produtos</h4><div id="modal-product-list" class="space-y-2 max-h-96 overflow-y-auto"></div></div>
                <div><h4 class="font-semibold mb-2 text-center text-purple-600">Pacotes</h4><div id="modal-package-list" class="space-y-2 max-h-96 overflow-y-auto"></div></div>
            </div>`;
        
        renderLists();
        contentContainer.querySelector('#item-search-input').addEventListener('input', (e) => {
            searchTerm = e.target.value;
            renderLists();
        });
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
                <button data-action="back-to-catalog" class="absolute top-5 left-5 text-gray-600 hover:text-gray-900">&larr; Voltar</button>
                <h3 class="font-bold text-2xl text-gray-800">${escapeHTML(item.name)}</h3>
                <p class="text-lg text-gray-500">R$ ${item.price.toFixed(2)}</p>
                <div class="my-8 flex items-center justify-center gap-4">
                    <button id="quantity-minus-btn" class="w-12 h-12 rounded-full bg-gray-200 text-3xl font-bold text-gray-600 hover:bg-gray-300">-</button>
                    <span id="quantity-display" class="text-4xl font-bold w-20 text-center">${quantity}</span>
                    <button id="quantity-plus-btn" class="w-12 h-12 rounded-full bg-gray-200 text-3xl font-bold text-gray-600 hover:bg-gray-300">+</button>
                </div>
                <button data-action="confirm-add-item" class="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700">Adicionar à Comanda</button>
            </div>
        `;
        
        document.getElementById('quantity-minus-btn').onclick = () => {
            if (quantity > 1) {
                quantity--;
                updateDisplay();
            }
        };
        document.getElementById('quantity-plus-btn').onclick = () => {
            quantity++;
            updateDisplay();
        };
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
        } else if (backBtn) {
            renderCatalogView();
        }
    });

    renderCatalogView();
}

async function openNewSaleModal(newClientId = null) {
    if (!localState.isCashierOpen) {
        showNotification('Caixa Fechado', 'Abra o caixa antes de criar uma nova venda.', 'error');
        return;
    }
    
    if (!localState.clients || localState.clients.length === 0) {
        try {
             localState.clients = await clientsApi.getClients(state.establishmentId);
        } catch (err) {
            showNotification('Erro', 'Não foi possível carregar dados de clientes.', 'error');
            return;
        }
    }
    if (!state.professionals || state.professionals.length === 0) {
         try {
             state.professionals = await professionalsApi.getProfessionals(state.establishmentId);
        } catch (err) {
            showNotification('Erro', 'Não foi possível carregar dados de profissionais.', 'error');
            return;
        }
    }
    
    const clientsOptions = localState.clients.map(c => {
        const isSelected = c.id === newClientId ? 'selected' : '';
        // BLINDAGEM XSS
        return `<option value="${c.id}" ${isSelected}>${escapeHTML(c.name)} - ${escapeHTML(c.phone)}</option>`;
    }).join('');
    
    const professionalsOptions = state.professionals.map(p => `<option value="${p.id}">${escapeHTML(p.name)}</option>`).join('');

    const contentHTML = `
        <form id="new-sale-form" class="space-y-4">
            <div>
                <label for="new-sale-client" class="block text-sm font-medium text-gray-700">Cliente</label>
                <select id="new-sale-client" required class="mt-1 w-full p-2 border rounded-md bg-white">
                    <option value="">Selecione um cliente...</option>
                    ${clientsOptions}
                </select>
                <button type="button" data-action="new-client-from-sale" class="text-sm text-blue-600 hover:underline mt-1">ou Cadastrar Novo Cliente</button>
            </div>
            <div>
                <label for="new-sale-professional" class="block text-sm font-medium text-gray-700">Profissional Responsável</label>
                <select id="new-sale-professional" required class="mt-1 w-full p-2 border rounded-md bg-white">
                    <option value="">Selecione um profissional...</option>
                    ${professionalsOptions}
                </select>
            </div>
             <div class="pt-4 border-t">
                <button type="submit" class="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">Iniciar Venda</button>
            </div>
        </form>
    `;

    const { modalElement } = showGenericModal({ title: "Nova Venda Avulsa", contentHTML, maxWidth: 'max-w-md' });

    modalElement.querySelector('#new-sale-form').addEventListener('submit', handleCreateNewSale);
    
    const newClientBtn = modalElement.querySelector('[data-action="new-client-from-sale"]');
    if (newClientBtn) {
        newClientBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modalElement.style.display = 'none'; 
            _comandas_renderClientRegistrationModal(); 
        });
    }
}

function openCheckoutModal() {
    if (!localState.isCashierOpen) {
        showNotification('Caixa Fechado', 'Abra o caixa antes de finalizar pagamentos.', 'error');
        return;
    }
    
    const comanda = localState.allComandas.find(c => c.id === localState.selectedComandaId);
    if (!comanda) return;

    const rawItems = getSafeAllItems(comanda);
    const seenIds = new Set();
    const finalItems = [];
    
    for (const item of rawItems) {
        if (item.type === 'service' && item.id) {
            if (seenIds.has(item.id)) continue; 
            seenIds.add(item.id);
        }
        finalItems.push(item);
    }

    const total = finalItems.reduce((acc, item) => acc + (item.price || 0), 0);

    let payments = [];
    let modalInternalState = {
        remainingAmount: total,
        selectedMethod: 'dinheiro',
        installments: 1,
        amountReceived: ''
    };

    const render = () => {
        const paymentList = document.getElementById('payment-list');
        const remainingEl = document.getElementById('remaining-amount');
        const finalizeBtn = document.getElementById('finalize-checkout-btn');
        const changeContainer = document.getElementById('change-container');
        const installmentsContainer = document.getElementById('installments-container');
        const paymentValueInput = document.getElementById('payment-value');
        const paymentControls = document.getElementById('payment-controls');

        const totalPaid = payments.reduce((acc, p) => acc + p.value, 0);
        modalInternalState.remainingAmount = total - totalPaid;

        paymentList.innerHTML = payments.map((p, index) => `
            <div class="flex justify-between items-center bg-gray-100 p-2 rounded-md animate-fade-in-fast">
                <span class="font-medium text-sm">${p.method.charAt(0).toUpperCase() + p.method.slice(1)} ${p.installments > 1 ? `(${p.installments}x)`: ''}</span>
                <div class="flex items-center gap-2">
                    <span class="font-semibold">R$ ${p.value.toFixed(2)}</span>
                    <button data-action="remove-payment" data-payment-index="${index}" class="text-red-500 font-bold">&times;</button>
                </div>
            </div>`).join('');

        if (modalInternalState.remainingAmount <= 0.001) {
            remainingEl.textContent = 'Total Pago!';
            remainingEl.className = `text-lg font-bold text-center mb-4 text-green-600`;
            paymentValueInput.value = ''; 
            finalizeBtn.disabled = false;
            if (paymentControls) paymentControls.style.display = 'none';
        } else {
            remainingEl.textContent = `Faltam: R$ ${modalInternalState.remainingAmount.toFixed(2)}`;
            remainingEl.className = `text-lg font-bold text-center mb-4 text-red-600`;
            paymentValueInput.value = modalInternalState.remainingAmount.toFixed(2);
            finalizeBtn.disabled = true;
            if (paymentControls) paymentControls.style.display = 'block';
        }
        
        document.querySelectorAll('.payment-method-btn').forEach(btn => {
            btn.classList.toggle('ring-2', btn.dataset.method === modalInternalState.selectedMethod);
            btn.classList.toggle('ring-offset-2', btn.dataset.method === modalInternalState.selectedMethod);
        });

        installmentsContainer.style.display = ['credito', 'crediario'].includes(modalInternalState.selectedMethod) ? 'block' : 'none';
        changeContainer.style.display = modalInternalState.selectedMethod === 'dinheiro' && modalInternalState.remainingAmount > 0 ? 'block' : 'none';

        const change = parseFloat(modalInternalState.amountReceived) - modalInternalState.remainingAmount;
        document.getElementById('change-value').textContent = `R$ ${change > 0 ? change.toFixed(2) : '0.00'}`;
    };

    const addPayment = () => {
        const valueInput = document.getElementById('payment-value');
        let value = parseFloat(valueInput.value);
        
        if (isNaN(value) || value <= 0) {
            showNotification('Valor Inválido', 'Insira um valor de pagamento válido e maior que zero.', 'error');
            return;
        }
        
        if (value > modalInternalState.remainingAmount + 0.001) {
             showNotification('Valor Inválido', 'O valor excede o saldo restante.', 'error');
            return;
        }
        
        const newPayment = { 
            method: modalInternalState.selectedMethod, 
            value: value,
        };

        if (['credito', 'crediario'].includes(modalInternalState.selectedMethod) && modalInternalState.installments > 1) {
            newPayment.installments = modalInternalState.installments;
        }
        
        payments.push(newPayment);
        modalInternalState.selectedMethod = 'dinheiro';
        modalInternalState.installments = 1;
        document.getElementById('installments-select').value = 1;
        render();
    };

    const contentHTML = `
        <div class="text-center mb-4">
            <p class="text-lg text-gray-600">Valor Total</p>
            <p class="text-4xl font-bold text-gray-800 my-2">R$ ${total.toFixed(2)}</p>
        </div>
        <div id="payment-list" class="space-y-2 mb-4"></div>
        <div id="remaining-amount"></div>
        
        <div id="payment-controls" class="space-y-4 border-t pt-4">
            <div class="grid grid-cols-3 gap-1">
                <button data-method="dinheiro" class="payment-method-btn flex flex-col items-center p-1 rounded-lg border-2 border-green-400 bg-green-50 ring-green-500">
                    <svg class="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    <span class="text-[11px] mt-0.5 font-semibold">Dinheiro</span>
                </button>
                <button data-method="pix" class="payment-method-btn flex flex-col items-center p-1 rounded-lg border-2 border-cyan-400 bg-cyan-50 ring-cyan-500">
                    <svg class="w-5 h-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    <span class="text-[11px] mt-0.5 font-semibold">PIX</span>
                </button>
                <button data-method="debito" class="payment-method-btn flex flex-col items-center p-1 rounded-lg border-2 border-blue-400 bg-blue-50 ring-blue-500">
                    <svg class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                    <span class="text-[11px] mt-0.5 font-semibold">Débito</span>
                </button>
                <button data-method="credito" class="payment-method-btn flex flex-col items-center p-1 rounded-lg border-2 border-purple-400 bg-purple-50 ring-purple-500">
                    <svg class="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                    <span class="text-[11px] mt-0.5 font-semibold">Crédito</span>
                </button>
                <button data-method="crediario" class="payment-method-btn flex flex-col items-center p-1 rounded-lg border-2 border-orange-400 bg-orange-50 ring-orange-500">
                    <svg class="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    <span class="text-[11px] mt-0.5 font-semibold">Fiado</span>
                </button>
            </div>
            <div id="installments-container" class="hidden"><label class="text-sm font-medium">Parcelas</label><select id="installments-select" class="w-full p-2 border rounded-md bg-white mt-1">${Array.from({length: 12}, (_, i) => `<option value="${i+1}">${i+1}x</option>`).join('')}</select></div>
            <div class="flex items-end gap-2">
                <div class="flex-grow"><label class="text-sm font-medium">Valor a Adicionar</label><input type="number" step="0.01" id="payment-value" class="w-full p-2 border rounded-md text-lg font-bold"></div>
                <button id="add-payment-btn" class="py-2 px-4 bg-gray-700 text-white font-semibold rounded-md hover:bg-gray-800">Adicionar</button>
            </div>
            <div id="change-container" class="hidden mt-2 p-3 bg-blue-50 rounded-lg"><label class="text-sm">Valor Recebido</label><input type="number" id="amount-received" class="w-full p-2 border rounded-md text-lg" /><p class="flex justify-between mt-2 font-semibold"><span>Troco:</span><strong id="change-value" class="text-blue-600">R$ 0.00</strong></p></div>
        </div>
        <div class="mt-6 pt-4 border-t"><button id="finalize-checkout-btn" class="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400" disabled>Finalizar</button></div>
    `;

    const { modalElement } = showGenericModal({ title: "Finalizar Pagamento", contentHTML, maxWidth: 'max-w-md' });
    document.getElementById('payment-value').value = modalInternalState.remainingAmount.toFixed(2);
    
    modalElement.addEventListener('click', (e) => {
        const methodBtn = e.target.closest('.payment-method-btn');
        if (methodBtn) {
            modalInternalState.selectedMethod = methodBtn.dataset.method;
            modalInternalState.installments = 1;
            document.getElementById('installments-select').value = 1;
            render();
        }
        if (e.target.closest('#add-payment-btn')) addPayment();
        if (e.target.closest('[data-action="remove-payment"]')) {
            payments.splice(parseInt(e.target.closest('[data-action="remove-payment"]').dataset.paymentIndex, 10), 1);
            render();
        }
        if (e.target.closest('#finalize-checkout-btn')) handleFinalizeCheckout(comanda, total, payments);
    });

    modalElement.addEventListener('change', e => {
        if(e.target.id === 'installments-select') modalInternalState.installments = parseInt(e.target.value, 10);
    });
    modalElement.addEventListener('input', e => {
        if(e.target.id === 'amount-received') {
            modalInternalState.amountReceived = e.target.value;
            render();
        }
    });

    render();
}

async function openCashierModal() {
    const contentHTML = `
        <form id="open-cashier-form" class="space-y-4">
            <div>
                <label for="initial-amount" class="block text-sm font-medium text-gray-700">Valor Inicial do Caixa</label>
                <div class="mt-1 relative">
                    <span class="absolute left-3 top-2 text-gray-500 font-semibold">R$</span>
                    <input type="number" step="0.01" min="0" id="initial-amount" required class="w-full p-2 pl-12 border rounded-md text-lg font-semibold" placeholder="0.00" value="0.00">
                </div>
                <p class="text-xs text-gray-500 mt-1">Digite o valor inicial disponível no caixa (pode ser R$ 0,00)</p>
            </div>
            <div>
                <label for="cashier-notes" class="block text-sm font-medium text-gray-700">Observações (opcional)</label>
                <textarea id="cashier-notes" rows="3" class="mt-1 w-full p-2 border rounded-md" placeholder="Notas sobre a abertura do caixa..."></textarea>
            </div>
            <div class="pt-4 border-t">
                <button type="submit" class="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition">Abrir Caixa</button>
            </div>
        </form>
    `;

    const { modalElement } = showGenericModal({ title: "Abrir Caixa", contentHTML, maxWidth: 'max-w-md' });

    modalElement.querySelector('#open-cashier-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const initialAmountInput = document.getElementById('initial-amount');
        const initialAmountValue = initialAmountInput.value.trim();
        const notes = document.getElementById('cashier-notes').value.trim();
        const initialAmount = parseFloat(initialAmountValue);

        if (initialAmountValue === '' || isNaN(initialAmount) || initialAmount < 0) {
            showNotification('Valor Inválido', 'Por favor, insira um valor inicial válido (maior ou igual a R$ 0,00).', 'error');
            initialAmountInput.focus();
            return;
        }

        try {
            const payload = {
                establishmentId: state.establishmentId,
                initialAmount: parseFloat(initialAmount.toFixed(2)),
            };
            if (notes) payload.notes = notes;

            const session = await cashierApi.openCashier(payload);
            localState.isCashierOpen = true;
            localState.activeCashierSessionId = session.id;
            
            await loadComandasPage();
            document.getElementById('genericModal').style.display = 'none';
            showNotification('Sucesso!', `Caixa aberto com valor inicial de R$ ${initialAmount.toFixed(2)}`, 'success');
        } catch (error) {
            showNotification('Erro', `Não foi possível abrir o caixa: ${error.message}`, 'error');
        }
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
                    <div class="bg-blue-50 p-3 rounded-lg">
                        <p class="text-sm text-gray-600">Valor de Abertura</p>
                        <p class="text-2xl font-bold text-blue-600">R$ ${report.initialAmount.toFixed(2)}</p>
                    </div>
                    <div class="bg-green-50 p-3 rounded-lg">
                        <p class="text-sm text-gray-600">Vendas em Dinheiro</p>
                        <p class="text-2xl font-bold text-green-600">R$ ${report.cashSales.toFixed(2)}</p>
                    </div>
                </div>
                <div class="bg-gray-100 p-4 rounded-lg text-center">
                    <p class="text-sm font-medium text-gray-700">Valor Esperado em Caixa</p>
                    <p class="text-3xl font-bold text-gray-900">R$ ${report.expectedAmount.toFixed(2)}</p>
                </div>
                <hr>
                <div>
                    <label for="final-amount" class="block text-sm font-medium text-gray-700">Valor Final (Contado no Caixa)</label>
                    <div class="mt-1 relative">
                        <span class="absolute left-3 top-2 text-gray-500 font-semibold">R$</span>
                        <input type="number" step="0.01" min="0" id="final-amount" required class="w-full p-2 pl-12 border rounded-md text-lg font-semibold" placeholder="0.00" value="${report.expectedAmount.toFixed(2)}">
                    </div>
                </div>
                <div class="pt-4 border-t">
                    <button type="submit" class="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition">Confirmar e Fechar Caixa</button>
                </div>
            </form>
        `;

        const { modalElement } = showGenericModal({ title: "Fechar Caixa", contentHTML, maxWidth: 'max-w-md' });

        modalElement.querySelector('#close-cashier-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const finalAmount = parseFloat(document.getElementById('final-amount').value);
            if (isNaN(finalAmount) || finalAmount < 0) {
                showNotification('Valor Inválido', 'Insira um valor final válido.', 'error');
                return;
            }

            try {
                await cashierApi.closeCashier(sessionId, finalAmount);
                localState.isCashierOpen = false;
                localState.activeCashierSessionId = null;
                document.getElementById('genericModal').style.display = 'none';
                await loadComandasPage();
                showNotification('Sucesso!', 'Caixa fechado com sucesso!', 'success');
            } catch (error) {
                showNotification('Erro', `Não foi possível fechar o caixa: ${error.message}`, 'error');
            }
        });
        
    } catch (error) {
        showNotification('Erro', `Não foi possível carregar o relatório de fecho: ${error.message}`, 'error');
    }
}

// --- 6. HANDLERS ---

async function handleFilterClick(filter) {
    if (localState.activeFilter === filter) return;
    localState.activeFilter = filter;
    localState.paging.page = 1;
    
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('bg-white', 'text-indigo-600', 'shadow'));
    document.querySelector(`[data-filter="${filter}"]`).classList.add('bg-white', 'text-indigo-600', 'shadow');
    
    document.getElementById('finalizadas-datepicker').classList.toggle('hidden', filter !== 'finalizadas');
    
    hideMobileDetail();

    await fetchAndDisplayData();
    localState.selectedComandaId = null;
    
    renderComandaDetail();
}

function handleComandaClick(comandaId) {
    localState.selectedComandaId = comandaId;
    renderComandaList(); 
    showMobileDetail();
    renderComandaDetail();
}


async function handleAddItemToComanda(itemData, quantity) {
    const comanda = localState.allComandas.find(c => c.id === localState.selectedComandaId);
    if (!comanda) return;

    const itemsToAdd = Array(quantity).fill(0).map(() => ({
        id: itemData.id,
        name: itemData.name,
        price: itemData.price,
        type: itemData.type,
        isReward: itemData.isReward || false, 
        pointsCost: itemData.pointsCost || 0
    }));
    
    comanda.comandaItems = comanda.comandaItems || [];
    comanda.comandaItems.push(...itemsToAdd);

    if (comanda.type === 'walk-in' && comanda.id.startsWith('temp-')) {
        showNotification('Sucesso', `${quantity}x ${itemData.name} adicionado(s)!`, 'success');
        renderComandaDetail(); 
        renderComandaList();
        return; 
    }

    try {
        await appointmentsApi.updateAppointment(comanda.id, comanda);
        showNotification('Sucesso', `${quantity}x ${itemData.name} adicionado(s)!`, 'success');
        renderComandaDetail();
        renderComandaList();
    } catch (error) {
        showNotification('Erro', `Não foi possível adicionar o item: ${error.message}`, 'error');
        comanda.comandaItems.splice(comanda.comandaItems.length - quantity, quantity);
    }
}


async function handleRemoveItemFromComanda(itemId, itemType) {
    const comanda = localState.allComandas.find(c => c.id === localState.selectedComandaId);
    if (!comanda) return;

    let itemRemoved = false;

    let comandaItemIndex = (comanda.comandaItems || []).findIndex(item => item.id === itemId && item.type === itemType);
    if (comandaItemIndex > -1) {
        comanda.comandaItems.splice(comandaItemIndex, 1);
        itemRemoved = true;
    } else {
        let serviceIndex = (comanda.services || []).findIndex(item => item.id === itemId);
        if (serviceIndex > -1) {
            comanda.services.splice(serviceIndex, 1);
            itemRemoved = true;
        } else {
             let saleItemIndex = (comanda.items || []).findIndex(item => item.id === itemId && item.type === itemType);
             if (saleItemIndex > -1) {
                comanda.items.splice(saleItemIndex, 1);
                itemRemoved = true;
            }
        }
    }
    
    if (itemRemoved) {
        if (comanda.type === 'walk-in' && comanda.id.startsWith('temp-')) {
             showNotification('Sucesso', 'Item removido!', 'success');
             renderComandaDetail();
             renderComandaList();
             return;
        }
        
        try {
            await appointmentsApi.updateAppointment(comanda.id, comanda);
            showNotification('Sucesso', 'Item removido!', 'success');
            renderComandaDetail();
            renderComandaList();
        } catch (error) {
            showNotification('Erro', `Não foi possível remover o item: ${error.message}`, 'error');
            await fetchAndDisplayData();
        }
    }
}

async function handleFinalizeCheckout(comanda, totalAmount, payments) {
    const isAppointment = comanda.type === 'appointment';
    
    const rawItems = getSafeAllItems(comanda);
    const seenIds = new Set();
    const finalItems = [];
    
    for (const item of rawItems) {
        if (item.type === 'service' && item.id) {
            if (seenIds.has(item.id)) continue; 
            seenIds.add(item.id);
        }
        finalItems.push(item);
    }
    
    const data = {
        payments,
        totalAmount,
        items: finalItems,
        cashierSessionId: localState.activeCashierSessionId,
    };

    try {
        if (isAppointment) {
            await appointmentsApi.checkoutAppointment(comanda.id, data);
        } else {
            data.establishmentId = state.establishmentId;
            data.clientId = comanda.clientId; // ID (Telefone)
            data.clientName = comanda.clientName;
            data.professionalId = comanda.professionalId;
            data.clientPhone = comanda.clientPhone;
            await salesApi.createSale(data);
        }
        showNotification('Sucesso!', 'Venda finalizada com sucesso!', 'success');
        document.getElementById('genericModal').style.display = 'none';

        hideMobileDetail();
        
        localState.selectedComandaId = null;
        await fetchAndDisplayData();
    } catch (error) {
        showNotification('Erro no Checkout', error.message, 'error');
    }
}

async function handleCreateNewSale(e) {
    e.preventDefault();
    const clientId = document.getElementById('new-sale-client').value;
    const professionalId = document.getElementById('new-sale-professional').value;
    
    // Busca na lista local (onde o ID agora é o telefone)
    const client = localState.clients.find(c => c.id === clientId);
    const professional = state.professionals.find(p => p.id === professionalId);

    if (!client || !professional) {
        showNotification('Erro', 'Selecione um cliente e um profissional válidos.', 'error');
        return;
    }
    
    const newComanda = {
        id: `temp-${Date.now()}`,
        type: 'walk-in',
        clientId: client.id, // GARANTIDO: ID é o telefone
        clientName: client.name,
        clientPhone: client.phone,
        professionalId: professional.id,
        professionalName: professional.name,
        startTime: new Date(),
        status: 'confirmed',
        services: [],
        comandaItems: [],
    };

    localState.allComandas.unshift(newComanda);
    localState.selectedComandaId = newComanda.id;
    
    document.getElementById('genericModal').style.display = 'none';
    
    handleComandaClick(newComanda.id);
}

// --- 7. INICIALIZAÇÃO ---

async function fetchAndDisplayData() {
    const listContainer = document.getElementById('comandas-list');
    listContainer.innerHTML = '<div class="loader mx-auto mt-10"></div>';
    
    const filterDate = localState.activeFilter === 'finalizadas' 
        ? document.getElementById('filter-date').value 
        : null;

    try {
        const activeSession = await cashierApi.getActiveSession();
        localState.isCashierOpen = !!activeSession;
        localState.activeCashierSessionId = activeSession ? activeSession.id : null;
        
        renderCashierControls();
        
        if (!localState.isCashierOpen && localState.activeFilter === 'atendimento') {
            renderComandaList();
            renderComandaDetail();
            return;
        }
        
        try {
            const establishmentData = await establishmentsApi.getEstablishment(state.establishmentId);
            if (establishmentData && establishmentData.loyaltyProgram) {
                localState.loyaltySettings = establishmentData.loyaltyProgram;
            }
        } catch (e) {
            console.log("Sem config de fidelidade carregada");
        }

        const response = await comandasApi.getComandas(
            state.establishmentId, 
            filterDate,
            localState.paging.page,
            localState.paging.limit
        );
        
        localState.allComandas = response.data || response;
        localState.paging.total = response.total || response.length;
        
        if (localState.catalog.services.length === 0) {
            const [services, products, packages, clients, professionals] = await Promise.all([
                servicesApi.getServices(state.establishmentId),
                productsApi.getProducts(state.establishmentId),
                packagesApi.getPackages(state.establishmentId),
                clientsApi.getClients(state.establishmentId),
                professionalsApi.getProfessionals(state.establishmentId)
            ]);
            localState.catalog = { services, products, packages };
            localState.clients = clients;
            state.professionals = professionals;
        }
        
        renderComandaList();
        
        if (localState.selectedComandaId) {
             renderComandaDetail();
        } else {
             renderComandaDetail(); 
        }

    } catch (error) {
        showNotification('Erro de Carregamento', `Não foi possível carregar os dados: ${error.message}`, 'error');
        listContainer.innerHTML = `<p class="text-red-500 p-4">${error.message}</p>`;
    }
}

export async function loadComandasPage(params = {}) {
    contentDiv = document.getElementById('content');
    
    try {
        const activeSession = await cashierApi.getActiveSession();
        localState.isCashierOpen = !!activeSession;
        localState.activeCashierSessionId = activeSession ? activeSession.id : null;
    } catch (error) {
        console.error('Erro ao verificar caixa:', error);
        localState.isCashierOpen = false;
    }
    
    localState.selectedComandaId = params.selectedAppointmentId || null;
    
    renderPageLayout();

    if (pageEventListener) {
        contentDiv.removeEventListener('click', pageEventListener);
        contentDiv.removeEventListener('change', pageEventListener);
    }

    pageEventListener = async (e) => {
        const target = e.target.closest('[data-action], [data-filter], [data-comanda-id], [data-id]');
        
        if (e.target.id === 'filter-date' && localState.activeFilter === 'finalizadas') {
             localState.paging.page = 1;
             await fetchAndDisplayData();
             return;
        }

        if (!target) return;
        
        if (target.matches('[data-filter]')) {
            handleFilterClick(target.dataset.filter);
        } else if (target.matches('[data-comanda-id]')) {
            if (e.target.closest('[data-action="go-to-appointment"]')) {
                e.stopPropagation();
                return;
            }
            handleComandaClick(target.dataset.comandaId);
        } else if (target.matches('[data-action]')) {
            const action = target.dataset.action;
            const comandaId = target.dataset.id || localState.selectedComandaId;
            
            switch (action) {
                case 'back-to-list': {
                    hideMobileDetail();
                    localState.selectedComandaId = null;
                    document.querySelectorAll('.comanda-card').forEach(el => el.classList.remove('selected'));
                    renderComandaDetail(); 
                    break;
                }
                case 'new-sale': 
                    openNewSaleModal(); 
                    break;
                case 'add-item': 
                    openAddItemModal(); 
                    break;
                case 'checkout': 
                    openCheckoutModal(); 
                    break;
                case 'open-cashier':
                    openCashierModal();
                    break;
                case 'close-cashier':
                    await handleOpenCloseCashierModal();
                    break;
                case 'view-sales-report':
                    navigateTo('sales-report-section'); 
                    break;
                case 'remove-item':
                    await handleRemoveItemFromComanda(target.dataset.itemId, target.dataset.itemType);
                    break;
                case 'reopen-appointment': {
                    const confirmed = await showConfirmation('Reabrir Comanda', 'Tem certeza? O pagamento será estornado e os produtos devolvidos ao estoque.');
                    if (confirmed) {
                        try {
                            await appointmentsApi.reopenAppointment(comandaId);
                            const reopenedComandaIndex = localState.allComandas.findIndex(c => c.id === comandaId);
                            if (reopenedComandaIndex !== -1) {
                                delete localState.allComandas[reopenedComandaIndex].transaction; 
                                delete localState.allComandas[reopenedComandaIndex].cashierSessionId; 
                                delete localState.allComandas[reopenedComandaIndex].redeemedReward;
                                localState.allComandas[reopenedComandaIndex].status = 'confirmed';
                            }
                            
                            localState.selectedComandaId = null; 
                            hideMobileDetail();

                            showNotification('Sucesso!', 'Comanda reaberta para edição.', 'success');
                            await fetchAndDisplayData(); 
                        } catch (error) {
                            showNotification('Erro', `Não foi possível reabrir: ${error.message}`, 'error');
                        }
                    }
                    break;
                }
                case 'reopen-walk-in': {
                    const confirmed = await showConfirmation('Reabrir Venda', 'Tem certeza? A venda será cancelada e os produtos devolvidos ao estoque.');
                    if (confirmed) {
                        try {
                            await salesApi.reopenSale(comandaId);
                            showNotification('Sucesso!', 'Venda revertida.');
                            
                            hideMobileDetail();
                            localState.selectedComandaId = null;

                            await fetchAndDisplayData();
                        } catch (error) {
                            showNotification('Erro', `Não foi possível reabrir: ${error.message}`, 'error');
                        }
                    }
                    break;
                }
                case 'go-to-appointment': {
                    const appointmentId = target.dataset.id;
                    const startTime = target.dataset.date;
                    navigateTo('agenda-section', {
                        scrollToAppointmentId: appointmentId,
                        targetDate: new Date(startTime) 
                    });
                    break;
                }
                case 'delete-walk-in': {
                    const confirmed = await showConfirmation('Excluir Venda', 'Tem certeza que deseja excluir esta venda avulsa? O estoque dos produtos será devolvido.');
                    if (confirmed) {
                        if (comandaId.startsWith('temp-')) {
                            localState.allComandas = localState.allComandas.filter(c => c.id !== comandaId);
                            localState.selectedComandaId = null;
                            renderComandaList();
                            renderComandaDetail(); 
                            showNotification('Sucesso', 'Venda avulsa removida.', 'success');
                            hideMobileDetail();
                        } else {
                            try {
                                await salesApi.deleteSale(comandaId);
                                showNotification('Sucesso', 'Venda avulsa excluída com sucesso.', 'success');
                                localState.selectedComandaId = null;
                                hideMobileDetail();
                                await fetchAndDisplayData();
                            } catch (error) {
                                showNotification('Erro', `Não foi possível excluir: ${error.message}`, 'error');
                            }
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
        localState.activeFilter = params.initialFilter === 'finalizadas' ? 'finalizadas' : 'atendimento';
    }
     if (params.selectedAppointmentId) {
        localState.selectedComandaId = params.selectedAppointmentId;
    }
    
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('bg-white', 'text-indigo-600', 'shadow'));
    document.querySelector(`[data-filter="${localState.activeFilter}"]`).classList.add('bg-white', 'text-indigo-600', 'shadow');
    document.getElementById('finalizadas-datepicker').classList.toggle('hidden', localState.activeFilter !== 'finalizadas');
    
    if (params.filterDate) {
        document.getElementById('filter-date').value = new Date(params.filterDate).toISOString().split('T')[0];
    }

    await fetchAndDisplayData();

    if (localState.selectedComandaId) {
        handleComandaClick(localState.selectedComandaId);
    }
}