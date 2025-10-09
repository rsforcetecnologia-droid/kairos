// js/ui/comandas.js (Completo e Corrigido - Versão 2025.10.10 - CORREÇÃO DE EXIBIÇÃO DE PACOTES)

// --- 1. IMPORTAÇÕES DE MÓDULOS ESSENCIAIS ---

import * as comandasApi from '../api/comandas.js';
import * as salesApi from '../api/sales.js';
import * as cashierApi from '../api/cashier.js';
import * as appointmentsApi from '../api/appointments.js';
import * as productsApi from '../api/products.js';
import * as servicesApi from '../api/services.js';
import * as professionalsApi from '../api/professionals.js';
import * as packagesApi from '../api/packages.js'; // <-- MÓDULO DE PACOTES IMPORTADO E NECESSÁRIO
import { state } from '../state.js';
import { showNotification, showConfirmation } from '../components/modal.js';
import { navigateTo } from '../main.js';

// --- 2. GESTÃO DO ESTADO LOCAL DA PÁGINA ---

const contentDiv = document.getElementById('content');

/**
 * Estado local da página de Comandas.
 * Centraliza dados e estados de UI.
 */
let localState = {
    // Lista de todas as comandas (agendamentos e vendas avulsas)
    allComandas: [],

    // Filtro de visualização na coluna esquerda ('atendimento', 'awaiting_payment', 'finalizada')
    comandaListView: 'atendimento',

    // Data selecionada para a vista 'finalizada'
    historyDate: new Date().toISOString().split('T')[0],

    /**
     * Cache do catálogo de itens para o modal de adicionar item.
     * Inclui Produtos, Serviços e Pacotes (carregamento preguiçoso).
     */
    itemCatalog: { 
        products: [], 
        services: [], 
        packages: [], // <-- CACHE PARA PACOTES
        professionals: [] 
    }, 

    // A venda atualmente selecionada no painel central (Comanda em Edição)
    currentSale: null,

    // Sessão de caixa ativa
    cashierSession: null
};

/**
 * Handler de eventos para a página PDV.
 */
let pdvPageHandler = null;


// --- 3. FUNÇÕES DE RENDERIZAÇÃO E LÓGICA DO PDV ---


/**
 * Seleciona uma comanda da lista e carrega seus detalhes no painel central.
 * @param {string} comandaId - O ID da comanda/agendamento.
 */
function handleSelectComanda(comandaId) {
    const comanda = localState.allComandas.find(c => c.id === comandaId);
    
    // Validação básica
    if (!comanda) return;

    let allItems = [];
    const isCompleted = comanda.status === 'completed';

    // --- CORREÇÃO APLICADA AQUI (Garante que Pacotes sejam incluídos) ---
    
    const services = comanda.services || [];
    const extraItems = comanda.comandaItems || []; // Itens adicionados (Produtos e Pacotes)
    const finalItemsSource = comanda.items || []; // Lista final da transação/venda avulsa
         
    if (isCompleted) {
        // Priorizamos a lista final unificada, se existir
        if (finalItemsSource.length > 0) {
             allItems = finalItemsSource;
        } else {
             // Fallback (Composição manual)
             allItems = [
                 // Serviços originais
                 ...services.map(s => ({ id: s.id, name: s.name, price: s.price, type: 'service' })),
                 // Itens adicionados (inclui produtos e pacotes)
                 // O campo 'i.type' aqui é o que define se é 'product' ou 'package'
                 ...extraItems.map(i => ({ id: i.itemId, name: i.name, price: i.price, type: i.type }))
             ];
        }

    } else if (comanda.type === 'appointment') {
        // Comanda de Agendamento em aberto/aguardando pagamento
        allItems = [
            // Serviços originais
            ...services.map(s => ({ id: s.id, name: s.name, price: s.price, type: 'service' })),
            // Itens adicionados
            ...extraItems.map(i => ({ id: i.itemId, name: i.name, price: i.price, type: i.type }))
        ];
        
    } else {
        // Venda avulsa em aberto (usa o campo items como working list)
        allItems = finalItemsSource;
    }
    
    // NORMALIZAÇÃO FINAL REFORÇADA: Garante que os campos name, price e type existam.
    allItems = allItems.map(item => ({
        id: item.id || item.itemId, 
        name: item.name || 'Item Sem Nome', 
        price: item.price || 0, 
        // Garante que o tipo seja lido do campo 'type' (que deve ser 'package' para pacotes)
        type: item.type || (item.id && item.id.includes('prod') ? 'product' : 'service') 
    }));
    // --- FIM CORREÇÃO ---

    // Atualiza o estado da venda atual
    localState.currentSale = {
        id: comanda.id,
        type: comanda.type,
        clientName: comanda.clientName,
        clientPhone: comanda.clientPhone,
        professionalId: comanda.professionalId,
        professionalName: comanda.professionalName,
        items: allItems,
        status: comanda.status
    };
    
    // Força a re-renderização da página
    renderPage();
}


/**
 * Renderiza o painel central com os detalhes da venda atual.
 */
function renderCurrentSale() {
    const container = document.getElementById('pdv-current-sale');
    if (!container) return;
    
    // Caso nenhuma venda esteja selecionada
    if (!localState.currentSale) {
        container.innerHTML = `<div class="flex flex-col items-center justify-center h-full text-gray-400 bg-white rounded-lg shadow"><svg class="w-24 h-24 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg><p class="text-lg font-medium">Nenhuma venda selecionada</p><p>Selecione uma comanda ou inicie uma nova venda.</p></div>`;
        return;
    }
    
    const sale = localState.currentSale;
    const isCompleted = sale.status === 'completed';
    
    // Recálculo do total para exibição (sempre a partir dos itens em memória)
    const total = sale.items.reduce((acc, item) => acc + (item.price || 0), 0);

    // Regras de desativação dos botões de ação
    const checkoutDisabled = !localState.cashierSession && !isCompleted;
    
    // Botão de rodapé
    const footerButton = isCompleted
        ? `<button data-action="reopen-comanda" class="w-full bg-yellow-500 text-white font-bold py-4 rounded-lg hover:bg-yellow-600 transition-all text-lg" ${checkoutDisabled ? 'disabled' : ''}>REABRIR COMANDA</button>`
        : `<button data-action="checkout" class="w-full bg-green-600 text-white font-bold py-4 rounded-lg hover:bg-green-700 transition-all text-lg" ${sale.items.length === 0 || checkoutDisabled ? 'disabled' : ''}>FINALIZAR PAGAMENTO</button>`;

    const professionalInfoHTML = sale.professionalName 
        ? `<div class="mt-2 text-sm text-gray-500"><span>Responsável: </span><span class="font-semibold text-gray-700">${sale.professionalName}</span></div>` 
        : '';

    container.innerHTML = `
        <div class="flex flex-col h-full bg-white rounded-lg shadow">
            <div class="p-4 border-b">
                <div class="flex justify-between items-center">
                    <div>
                        <input id="pdv-client-name" class="text-xl font-bold text-gray-800 w-full bg-transparent" value="${sale.clientName || 'Cliente Avulso'}" placeholder="Nome do Cliente" ${isCompleted ? 'disabled' : ''}>
                        <input id="pdv-client-phone" class="text-sm text-gray-500 w-full bg-transparent mt-1" value="${sale.clientPhone || ''}" placeholder="Telemóvel (opcional)" ${isCompleted ? 'disabled' : ''}>
                        ${professionalInfoHTML}
                    </div>
                    ${sale.type === 'appointment' 
                        ? `<span class="text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-1 rounded-full">Agendamento</span>` 
                        : `<span class="text-xs bg-green-100 text-green-800 font-semibold px-2 py-1 rounded-full">Venda Avulsa</span>`}
                </div>
            </div>
            <div class="flex-grow p-4 overflow-y-auto space-y-2">
                ${sale.items.length === 0 ? '<p class="text-center text-gray-400 mt-8">Nenhum item adicionado.</p>' : sale.items.map((item, index) => `
                    <div class="flex items-center text-sm">
                        <div class="flex-grow">
                            <p class="font-semibold text-gray-700">${item.name}</p>
                            <p class="text-xs text-gray-500">${item.type === 'product' ? 'Produto' : (item.type === 'package' ? 'Pacote' : 'Serviço')}</p>
                        </div>
                        <p class="font-medium text-gray-800 mr-4">R$ ${(item.price || 0).toFixed(2)}</p>
                        ${!isCompleted ? `<button class="text-red-500 hover:text-red-800 text-2xl leading-none" data-action="remove-item" data-item-index="${index}">&times;</button>` : ''}
                    </div>
                `).join('')}
            </div>
            <div class="p-4 border-t bg-gray-50">
                <div class="flex justify-between items-center mb-4">
                    <span class="text-lg font-bold text-gray-800">TOTAL</span>
                    <span class="text-3xl font-bold text-gray-900">R$ ${total.toFixed(2)}</span>
                </div>
                ${footerButton}
            </div>
        </div>`;
}


/**
 * Renderiza a lista de comandas (coluna esquerda) com base no filtro de status.
 */
function renderComandasList() {
    const container = document.getElementById('comandas-list');
    if (!container) return;
    
    let listToRender = [];
    let message = '';
    
    // Mapeamento dos status (Chaves de filtro ajustadas)
    let targetStatuses = [];
    switch (localState.comandaListView) {
        case 'atendimento':
            targetStatuses = ['confirmed'];
            message = 'Nenhuma comanda em atendimento.';
            break;
        case 'awaiting_payment':
            targetStatuses = ['awaiting_payment'];
            message = 'Nenhuma comanda aguardando pagamento.';
            break;
        case 'finalizada':
            targetStatuses = ['completed'];
            message = 'Nenhuma comanda finalizada nesta data.';
            break;
        default:
             targetStatuses = ['confirmed'];
            message = 'Nenhuma comanda em atendimento.';
    }

    // Aplica o filtro de status e data (apenas para 'finalizada')
    listToRender = localState.allComandas.filter(c => {
        if (!targetStatuses.includes(c.status)) return false;
        
        if (c.status === 'completed') {
            const targetDateStr = localState.historyDate;
            const targetDate = new Date(`${targetDateStr}T00:00:00`);
            targetDate.setHours(0, 0, 0, 0);

            if (!c.transaction || !c.transaction.paidAt) return false;
            
            const paidDate = new Date(c.transaction.paidAt);
            paidDate.setHours(0, 0, 0, 0);
            return paidDate.getTime() === targetDate.getTime();
        }
        
        return true;
    });

    // Ordenação
    const isClosedView = localState.comandaListView === 'finalizada'; 
    if (!isClosedView) {
        listToRender.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    } else {
        listToRender.sort((a, b) => new Date(b.transaction.paidAt) - new Date(a.transaction.paidAt));
    }
    
    if (listToRender.length === 0) {
        container.innerHTML = `<p class="text-center text-gray-500 p-4">${message}</p>`;
        return;
    }
    
    container.innerHTML = listToRender.map(comanda => {
        const isSelected = localState.currentSale && localState.currentSale.id === comanda.id;
        const comandaDate = new Date(comanda.startTime);
        const dateString = comandaDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        const timeString = comandaDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        // CORREÇÃO DO BUG: Para comandas completadas, use o valor final salvo na transação
        const totalValue = isClosedView && comanda.transaction && comanda.transaction.totalAmount !== undefined
            ? comanda.transaction.totalAmount // Prioriza o valor FINAL do checkout se a comanda estiver fechada
            : [...(comanda.services || []), ...(comanda.comandaItems || [])].reduce((acc, item) => acc + (item.price || 0), 0);

        return `<div class="p-3 rounded-lg cursor-pointer transition-all ${isSelected ? 'bg-indigo-100 shadow' : 'hover:bg-gray-100'}" data-action="select-comanda" data-comanda-id="${comanda.id}">
            <div class="flex justify-between items-start">
                <div class="flex-grow pr-2">
                    <p class="font-bold text-sm text-gray-800 truncate">${comanda.clientName}</p>
                    <p class="text-xs text-gray-500 truncate">com ${comanda.professionalName}</p>
                </div>
                <div class="text-right flex-shrink-0">
                     <p class="text-xs font-semibold ${isClosedView ? 'text-green-600' : 'text-gray-600'}">R$ ${totalValue.toFixed(2)}</p>
                    <p class="text-xs text-gray-500">${timeString}</p>
                </div>
            </div>
        </div>`;
    }).join('');
    
    // Configuração do picker de data
    const historyPicker = document.getElementById('history-date-picker');
    if (localState.comandaListView === 'finalizada') {
        historyPicker.classList.remove('hidden');
        document.getElementById('history-date-input').value = localState.historyDate;
    } else {
        historyPicker.classList.add('hidden');
    }
    
    // Adiciona o estado 'active' ao botão correto
    document.querySelectorAll('.comanda-filter-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-filter="${localState.comandaListView}"]`)?.classList.add('active');
}


/**
 * Renderiza o painel de adição de itens (coluna direita).
 * Esta função foi totalmente atualizada para exibir os três cartões de ação.
 */
function renderAddItemPanel() {
    const container = document.getElementById('pdv-add-item-panel');
    if (!container) return;

    // Desativa se o caixa estiver fechado
    const isCompleted = localState.currentSale && localState.currentSale.status === 'completed';
    const checkoutDisabled = !localState.cashierSession && !isCompleted;

    if (checkoutDisabled || isCompleted) {
        container.innerHTML = `
            <div class="p-4 h-full flex flex-col justify-center items-center text-center text-gray-400 bg-white rounded-lg shadow">
                 <svg class="w-24 h-24 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
                <p class="font-medium">Painel de Itens</p>
                <p class="text-sm">${!localState.cashierSession ? 'O caixa está fechado.' : 'Selecione uma comanda em aberto.'}</p>
            </div>`;

    } else if (localState.currentSale) {
        
        // NOVO HTML: Três cartões de ação (Serviço, Produto, Pacote)
        container.innerHTML = `
            <div class="p-4 h-full flex flex-col bg-white rounded-lg shadow space-y-4">
                <h3 class="text-xl font-bold text-gray-800 border-b pb-2">Adicionar à Venda</h3>
                <div class="grid grid-cols-1 gap-4 flex-grow">

                    <div data-action="open-add-item-modal" data-item-type="service" class="item-add-card p-4 rounded-lg border-2 border-indigo-200 bg-indigo-50 text-indigo-800 cursor-pointer text-center transition-all duration-200 hover:shadow-lg hover:border-indigo-400 transform hover:scale-[1.01]">
                        <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 00-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.512a9.04 9.04 0 00-3 5.012M12 12a9.04 9.04 0 01-3-5.012V5l-1-1z" /></svg>
                        <p class="font-bold">SERVIÇOS</p>
                        <p class="text-xs">Corte, Pintura, Tratamento</p>
                    </div>

                    <div data-action="open-add-item-modal" data-item-type="product" class="item-add-card p-4 rounded-lg border-2 border-green-200 bg-green-50 text-green-800 cursor-pointer text-center transition-all duration-200 hover:shadow-lg hover:border-green-400 transform hover:scale-[1.01]">
                        <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        <p class="font-bold">PRODUTOS</p>
                        <p class="text-xs">Shampoo, Gel, Cosméticos</p>
                    </div>

                    <div data-action="open-add-item-modal" data-item-type="package" class="item-add-card p-4 rounded-lg border-2 border-yellow-200 bg-yellow-50 text-yellow-800 cursor-pointer text-center transition-all duration-200 hover:shadow-lg hover:border-yellow-400 transform hover:scale-[1.01]">
                         <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4m8-14l-8 4m0 0l-8-4" /></svg>
                        <p class="font-bold">PACOTES</p>
                        <p class="text-xs">Série de Serviços/Créditos</p>
                    </div>
                </div>
            </div>`;

    } else {
        container.innerHTML = `
            <div class="p-4 h-full flex flex-col justify-center items-center text-center text-gray-400 bg-white rounded-lg shadow">
                <svg class="w-24 h-24 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
                <p class="font-medium">Painel de Itens</p>
                <p class="text-sm">Selecione uma comanda em aberto para adicionar itens.</p>
            </div>`;
    }
}

// Funções auxiliares de caixa, omitidas para brevidade e foco na correção.
function renderCashierStatus() {
    const openBtn = document.getElementById('open-cashier-btn');
    const closeBtn = document.getElementById('close-cashier-btn');
    const overlay = document.getElementById('pdv-overlay');
    
    if (!openBtn || !closeBtn || !overlay) return;
    
    if (localState.cashierSession) {
        openBtn.classList.add('hidden');
        closeBtn.classList.remove('hidden');
        overlay.classList.add('hidden');
    } else {
        openBtn.classList.remove('hidden');
        closeBtn.classList.add('hidden');
        overlay.classList.remove('hidden');
    }
}


/**
 * Inicializa os dados da página de forma robusta.
 * @param {object} params - Parâmetros de navegação.
 */
async function initializeData(params) {
    try {
        // [TRATAMENTO DE ERROS REFORÇADO]: Captura erros individualmente para evitar o "Erro Crítico"
        const results = await Promise.all([
            comandasApi.getComandas(state.establishmentId).catch(e => { 
                console.error("Erro ao buscar comandas:", e); 
                return []; 
            }),
            cashierApi.getActiveSession().catch(e => { 
                console.error("Erro ao buscar sessão de caixa:", e); 
                return null; 
            }),
            professionalsApi.getProfessionals(state.establishmentId).catch(e => { 
                console.error("Erro ao buscar profissionais:", e); 
                return []; 
            })
        ]);

        const [comandas, session, professionals] = results;

        localState.allComandas = comandas;
        localState.itemCatalog = { products: [], services: [], packages: [], professionals }; 
        localState.cashierSession = session;
        localState.historyDate = localState.historyDate || new Date().toISOString().split('T')[0];

        // Lógica para pré-selecionar uma comanda se vier de outra tela (ex: Agenda)
        if (params.selectedAppointmentId) {
            const selected = localState.allComandas.find(c => c.id === params.selectedAppointmentId);
            if (selected) {
                localState.comandaListView = params.initialFilter || 'atendimento'; 
                handleSelectComanda(selected.id);
            }
        } else {
             localState.comandaListView = 'atendimento';
        }
        
        renderPage();
        
    } catch (error) {
        showNotification('Erro Crítico', 'Não foi possível carregar os dados iniciais do PDV.', 'error');
        console.error("Erro estrutural em initializeData:", error);
    }
}


/**
 * Abre o modal para adicionar um item.
 * @param {string} itemType - Tipo de item a ser procurado ('service', 'product', 'package' ou 'all').
 */
async function openAddItemModal(itemType = 'all') { 
    const catalog = localState.itemCatalog;
    
    // Lógica de carregamento preguiçoso do catálogo
    const fetchPromises = [];
    const initialCatalogState = {
        products: catalog.products.length === 0,
        services: catalog.services.length === 0,
        packages: !catalog.packages || catalog.packages.length === 0
    };

    if (initialCatalogState.products) fetchPromises.push(productsApi.getProducts(state.establishmentId));
    if (initialCatalogState.services) fetchPromises.push(servicesApi.getServices(state.establishmentId));
    if (initialCatalogState.packages) fetchPromises.push(packagesApi.getPackages(state.establishmentId));

    if (fetchPromises.length > 0) {
        try {
            showNotification('Aguarde', 'A carregar catálogo de itens...', 'info', 2000);
            const results = await Promise.all(fetchPromises);
            
            let resultIndex = 0;
            if (initialCatalogState.products) catalog.products = results[resultIndex++];
            if (initialCatalogState.services) catalog.services = results[resultIndex++];
            if (initialCatalogState.packages) catalog.packages = results[resultIndex++];

        } catch (error) {
            showNotification('Erro', 'Não foi possível carregar o catálogo.', 'error');
            return;
        }
    }

    const modalId = 'addItemModal';
    let modal = document.getElementById(modalId);
    if (modal) modal.remove();

    modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 pt-20 z-50 transition-opacity duration-300 opacity-0';
    
    const modalTitle = itemType === 'all' ? 'Item' : itemType.charAt(0).toUpperCase() + itemType.slice(1);
    
    modal.innerHTML = `
        <div class="modal-content bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-transform duration-300 scale-95" data-action="stop-propagation">
            <div class="p-5 border-b">
                <h2 class="text-2xl font-bold text-gray-800">Adicionar ${modalTitle} à Venda</h2>
                <p class="text-sm text-gray-500">Pesquise por nome no catálogo de ${modalTitle}.</p>
            </div>
            <div class="p-5">
                <input type="search" id="modal-item-search" placeholder="Digite para pesquisar..." class="w-full p-4 border rounded-lg text-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div id="modal-item-results" class="px-5 pb-5 max-h-[50vh] overflow-y-auto">
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modal.querySelector('.modal-content').classList.remove('scale-95');
    }, 10);

    const searchInput = modal.querySelector('#modal-item-search');
    const resultsContainer = modal.querySelector('#modal-item-results');

    const renderResults = () => {
        const term = searchInput.value.toLowerCase();
        
        const listsToFilter = [];
        if (itemType === 'service' || itemType === 'all') listsToFilter.push({ title: 'Serviços', type: 'service', list: catalog.services });
        if (itemType === 'product' || itemType === 'all') listsToFilter.push({ title: 'Produtos', type: 'product', list: catalog.products });
        if (itemType === 'package' || itemType === 'all') listsToFilter.push({ title: 'Pacotes', type: 'package', list: catalog.packages });
        
        let allFilteredItems = [];

        listsToFilter.forEach(resource => {
            const filtered = (resource.list || []).filter(item => item.name.toLowerCase().includes(term));
            if (filtered.length > 0) {
                allFilteredItems.push({ ...resource, filtered });
            }
        });
        
        if (!term && itemType !== 'all') {
            const resource = listsToFilter.find(r => r.type === itemType);
            if (resource) {
                 allFilteredItems = [{ ...resource, filtered: resource.list }];
            }
        }
        
        if (allFilteredItems.length === 0) {
            resultsContainer.innerHTML = '<p class="text-center text-gray-500 p-8">Nenhum item encontrado.</p>';
            return;
        }

        resultsContainer.innerHTML = allFilteredItems.map(resource => `
            <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider px-2 my-2">${resource.title}</h3>
            <div class="space-y-1">
                ${resource.filtered.map(item => `
                    <div class="flex justify-between items-center p-3 rounded-lg hover:bg-indigo-50 cursor-pointer" 
                         data-action="add-item" 
                         data-item-type="${resource.type}" 
                         data-item-id="${item.id}">
                        <span class="font-semibold text-gray-700">${item.name}</span>
                        <span class="font-bold text-indigo-600 text-lg">R$ ${item.price.toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
        `).join('');
    };

    const closeModal = () => {
        modal.classList.add('opacity-0');
        modal.querySelector('.modal-content').classList.add('scale-95');
        setTimeout(() => modal.remove(), 300);
    };

    searchInput.addEventListener('input', renderResults);
    
    modal.addEventListener('click', (e) => {
        const targetAction = e.target.closest('[data-action]');
        
        if (!targetAction || targetAction.dataset.action === 'stop-propagation') {
             if (!e.target.closest('.modal-content')) {
                closeModal();
            }
            return;
        }

        const action = targetAction.dataset.action;
        if (action === 'add-item') {
            handleAddItemToSale(targetAction.dataset.itemId, targetAction.dataset.itemType);
            closeModal();
        }
    });

    renderResults();
}


/**
 * Abre o modal para selecionar o profissional e iniciar uma nova Venda Avulsa.
 */
async function openProfessionalSelectionModal() {
    const modal = document.getElementById('genericModal');
    const professionals = localState.itemCatalog.professionals;
    
    if (!professionals || professionals.length === 0) {
        showNotification('Atenção', 'Nenhum profissional cadastrado. Crie um profissional antes de iniciar uma venda.', 'error');
        return;
    }
    
    modal.innerHTML = `<div class="modal-content max-w-sm"><h2 class="text-2xl font-bold mb-4">Nova Venda Avulsa</h2><p class="text-gray-600 mb-6">Selecione o profissional responsável.</p><div id="professional-selection-list" class="space-y-2 max-h-64 overflow-y-auto">${professionals.map(prof => `<button data-action="select-professional-for-sale" data-prof-id="${prof.id}" data-prof-name="${prof.name}" class="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">${prof.name}</button>`).join('')}</div><div class="mt-6"><button type="button" data-action="close-modal" data-target="genericModal" class="action-btn-secondary w-full">Cancelar</button></div></div>`;
    modal.style.display = 'flex';
    
    modal.querySelectorAll('[data-action="select-professional-for-sale"]').forEach(button => {
        button.addEventListener('click', () => {
            const professionalId = button.dataset.profId;
            const professionalName = button.dataset.profName;
            
            // Inicia o estado da nova venda avulsa
            localState.currentSale = {
                id: `walk-in-${Date.now()}`, 
                type: 'walk-in', 
                clientName: 'Cliente Avulso', 
                clientPhone: '',
                professionalId, 
                professionalName, 
                items: [], 
                status: 'confirmed', 
                startTime: new Date().toISOString()
            };
            
            modal.style.display = 'none';
            renderPage();
        });
    });
}

function handleNewSale() { openProfessionalSelectionModal(); }

// ATUALIZADO: Suporta o tipo 'package'
function handleAddItemToSale(itemId, itemType) {
    if (!localState.currentSale) {
        showNotification('Atenção', 'Selecione uma comanda ou inicie uma nova venda para adicionar itens.', 'error');
        return;
    }
    
    let catalogList;
    if (itemType === 'product') catalogList = localState.itemCatalog.products;
    else if (itemType === 'service') catalogList = localState.itemCatalog.services;
    else if (itemType === 'package') catalogList = localState.itemCatalog.packages; // NOVO: Adicionado 'package'
    else return;

    const itemToAdd = catalogList.find(i => i.id === itemId);
    
    if (itemToAdd) {
        localState.currentSale.items.push({ 
            id: itemToAdd.id, 
            name: itemToAdd.name, 
            price: itemToAdd.price, 
            type: itemType 
        });
        renderCurrentSale();
    }
}

function handleRemoveItemFromSale(index) {
    if (localState.currentSale) {
        localState.currentSale.items.splice(index, 1);
        renderCurrentSale();
    }
}

async function handleCheckout() {
    if (!localState.currentSale || localState.currentSale.items.length === 0) return;
    localState.currentSale.clientName = document.getElementById('pdv-client-name').value || 'Cliente Avulso';
    localState.currentSale.clientPhone = document.getElementById('pdv-client-phone').value;
    const sale = localState.currentSale;
    const total = sale.items.reduce((acc, item) => acc + item.price, 0);
    openCheckoutModal(sale, total);
}

function openCheckoutModal(sale, total) {
    const modal = document.getElementById('checkoutModal');
    let payments = [];

    // Função para renderizar a lista de pagamentos e calcular o troco
    const renderPaymentsAndChange = () => {
        const paymentsList = modal.querySelector('#paymentsList');
        const remainingAmountEl = modal.querySelector('#remainingAmount');
        const addPaymentSection = modal.querySelector('#addPaymentSection');
        const installmentsSection = modal.querySelector('#installments-details');
        const paymentMethodSelect = modal.querySelector('#paymentMethod');
        
        const totalPaid = payments.reduce((acc, p) => acc + p.value, 0);
        const remaining = total - totalPaid;

        remainingAmountEl.textContent = `Faltam R$ ${remaining.toFixed(2)}`;
        remainingAmountEl.className = `text-xl font-bold text-center mb-4 ${remaining > 0.001 ? 'text-red-600' : 'text-green-600'}`;
        if (remaining <= 0.001) { remainingAmountEl.textContent = 'Total Pago!'; }

        paymentsList.innerHTML = payments.map((p, index) => `<div class="flex justify-between items-center bg-gray-100 p-2 rounded-md"><span>${p.method.charAt(0).toUpperCase() + p.method.slice(1)}</span><span>R$ ${p.value.toFixed(2)}</span><button data-payment-index="${index}" class="text-red-500 font-bold">&times;</button></div>`).join('');
        
        const paymentValueInput = modal.querySelector('#paymentValue');
        if (paymentValueInput) {
            paymentValueInput.value = remaining > 0 ? remaining.toFixed(2) : '0.00';
        }

        const isInstallmentMethod = paymentMethodSelect.value === 'credito' || paymentMethodSelect.value === 'crediario';
        if (isInstallmentMethod && payments.length === 0) {
            installmentsSection.classList.remove('hidden');
            addPaymentSection.classList.add('hidden'); // Esconde a adição de múltiplos pagamentos
        } else {
            installmentsSection.classList.add('hidden');
            addPaymentSection.classList.remove('hidden');
        }

        modal.querySelector('#confirmPaymentBtn').disabled = remaining > 0.001 || payments.length === 0 && !isInstallmentMethod;
        
        // Lógica para mostrar/esconder o cálculo de troco
        const cashPaymentDetails = modal.querySelector('#cash-payment-details');
        if (cashPaymentDetails) {
            if (paymentMethodSelect.value === 'dinheiro') {
                cashPaymentDetails.classList.remove('hidden');
                const amountReceivedInput = modal.querySelector('#amountReceived');
                const changeDueEl = modal.querySelector('#changeDue');
                const received = parseFloat(amountReceivedInput.value) || 0;
                const change = received - (remaining > 0 ? remaining : 0);
                changeDueEl.textContent = `R$ ${change > 0 ? change.toFixed(2) : '0.00'}`;
            } else {
                cashPaymentDetails.classList.add('hidden');
            }
        }
    };

    modal.innerHTML = `
        <div class="modal-content max-w-lg">
            <h2 class="text-2xl font-bold mb-4">Finalizar Pagamento</h2>
            <div class="mb-4 text-center"><p class="text-lg text-gray-600">Valor Total</p><p class="text-5xl font-bold text-gray-800 my-2">R$ ${total.toFixed(2)}</p></div>
            <div class="border-t pt-4">
                <div id="paymentsList" class="space-y-2 mb-4"></div>
                <div class="flex items-center gap-2 mb-4">
                    <select id="paymentMethod" class="p-2 border rounded-md w-full bg-white">
                        <option value="dinheiro">Dinheiro</option>
                        <option value="pix">PIX</option>
                        <option value="credito">Crédito</option>
                        <option value="debito">Débito</option>
                        <option value="crediario">Crediário (Fiado)</option>
                    </select>
                </div>

                <div id="addPaymentSection">
                    <div class="flex items-center gap-2 mb-4">
                        <input type="number" step="0.01" id="paymentValue" placeholder="Valor" class="p-2 border rounded-md w-full">
                        <button id="addPaymentBtn" class="action-btn-primary p-2">+</button>
                    </div>
                </div>

                <div id="installments-details" class="hidden mt-4 p-4 bg-gray-50 rounded-lg space-y-2">
                    <div class="flex items-center justify-center gap-4">
                        <label for="installmentsCount" class="block text-sm font-medium text-gray-700">Número de Parcelas:</label>
                        <input type="number" id="installmentsCount" min="1" max="12" value="1" class="p-2 border rounded-md w-24 text-center">
                    </div>
                    <p class="text-center font-semibold text-indigo-600" id="installmentsValue"></p>
                </div>
                
                <div id="remainingAmount"></div>
                
                <div id="cash-payment-details" class="hidden mt-4 p-4 bg-blue-50 rounded-lg space-y-2">
                    <div>
                        <label for="amountReceived" class="block text-sm font-medium text-gray-700">Valor Recebido (Dinheiro)</label>
                        <input type="number" step="0.01" id="amountReceived" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-2xl p-2 text-center">
                    </div>
                    <p class="flex justify-between text-lg font-semibold">
                        <span>Troco:</span>
                        <strong id="changeDue" class="text-blue-600">R$ 0.00</strong>
                    </p>
                </div>
            </div>
            <div class="flex gap-4 pt-4 border-t"><button type="button" data-action="close-modal" data-target="checkoutModal" class="action-btn-secondary w-full">Cancelar</button><button id="confirmPaymentBtn" class="action-btn-primary w-full" disabled>Confirmar Pagamento</button></div>
        </div>`;
    modal.style.display = 'flex';
    
    renderPaymentsAndChange();

    modal.querySelector('#paymentMethod').addEventListener('change', renderPaymentsAndChange);

    modal.querySelector('#addPaymentBtn').onclick = () => {
        const method = modal.querySelector('#paymentMethod').value;
        const value = parseFloat(modal.querySelector('#paymentValue').value);
        if (value > 0) {
            payments.push({ method, value });
            renderPaymentsAndChange();
        }
    };

    modal.querySelector('#paymentsList').onclick = (e) => {
        const paymentIndex = e.target.dataset.paymentIndex;
        if (paymentIndex) {
            payments.splice(parseInt(paymentIndex, 10), 1);
            renderPaymentsAndChange();
        }
    };

    modal.querySelector('#installmentsCount').addEventListener('input', (e) => {
        const count = parseInt(e.target.value, 10) || 1;
        const installmentValue = total / count;
        modal.querySelector('#installmentsValue').textContent = `${count}x de R$ ${installmentValue.toFixed(2)}`;
    });
    // Trigger initial calculation for installments
    modal.querySelector('#installmentsCount').dispatchEvent(new Event('input'));


    modal.querySelector('#amountReceived').addEventListener('input', renderPaymentsAndChange);

    modal.querySelector('#confirmPaymentBtn').onclick = async () => {
        const btn = modal.querySelector('#confirmPaymentBtn');
        btn.disabled = true;
        btn.textContent = 'Aguarde...';

        const installmentsCountInput = document.getElementById('installmentsCount');
        const paymentMethodSelect = document.getElementById('paymentMethod');
        const isInstallmentMethod = paymentMethodSelect && (paymentMethodSelect.value === 'credito' || paymentMethodSelect.value === 'crediario');
        
        let finalPayments = payments;

        if (payments.length === 0 && isInstallmentMethod) {
            const installments = parseInt(installmentsCountInput.value, 10) || 1;
            finalPayments = [{
                method: paymentMethodSelect.value,
                value: total,
                installments: installments
            }];
        } else if (payments.length === 0) {
             finalPayments = [{
                method: paymentMethodSelect.value,
                value: total,
                installments: 1
            }];
        }
        
        try {
            if (sale.type === 'appointment') {
                await appointmentsApi.checkoutAppointment(sale.id, { 
                    payments: finalPayments, 
                    totalAmount: total, 
                    cashierSessionId: localState.cashierSession?.id,
                    items: sale.items
                });
                const index = localState.allComandas.findIndex(c => c.id === sale.id);
                if (index !== -1) {
                    localState.allComandas[index].status = 'completed';
                    localState.allComandas[index].transaction = { paidAt: new Date().toISOString(), payments: finalPayments, totalAmount: total };
                }
            } else {
                const newSaleData = await salesApi.createSale({ 
                    items: sale.items, 
                    totalAmount: total, 
                    payments: finalPayments, 
                    clientName: sale.clientName, 
                    clientPhone: sale.clientPhone, 
                    professionalId: sale.professionalId, 
                    cashierSessionId: localState.cashierSession.id 
                });
                localState.allComandas.push({
                    ...newSaleData,
                    id: newSaleData.id,
                    clientName: sale.clientName,
                    professionalName: sale.professionalName,
                    startTime: newSaleData.createdAt,
                    status: 'completed',
                    transaction: { paidAt: new Date().toISOString(), payments: finalPayments, totalAmount: total }
                });
            }
            localState.currentSale = null;
            showNotification('Sucesso!', 'Venda finalizada com sucesso.', 'success');
            modal.style.display = 'none';
            renderPage();

        } catch (error) {
            showNotification('Erro no Checkout', error.message, 'error');
            btn.disabled = false;
            btn.textContent = 'Confirmar Pagamento';
        }
    };
}

// Funções auxiliares de caixa, omitidas para brevidade e foco na correção.
async function openOpenCashierModal() {
    const modal = document.getElementById('genericModal');
    
    // Conteúdo do modal de abertura de caixa
    modal.innerHTML = `<div class="modal-content max-w-sm"><h2 class="text-2xl font-bold mb-4">Abrir Caixa</h2><p class="text-gray-600 mb-6">Insira o valor inicial do fundo de troco para começar o dia.</p><form id="open-cashier-form"><div class="mb-4"><label for="initialAmount" class="block text-sm font-medium text-gray-700">Valor Inicial (R$)</label><input type="number" step="0.01" id="initialAmount" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-2xl p-2 text-center" required value="0.00"></div><div class="flex gap-4"><button type="button" data-action="close-modal" data-target="genericModal" class="action-btn-secondary w-full">Cancelar</button><button type="submit" class="action-btn-primary w-full">Abrir Caixa</button></div></form></div>`;
    
    modal.style.display = 'flex';
    
    // Adiciona listener para submissão do formulário
    modal.querySelector('#open-cashier-form').addEventListener('submit', handleOpenCashier);
}

async function openCloseCashierModal() {
    const modal = document.getElementById('genericModal');
    modal.innerHTML = `<div class="modal-content"><div class="loader mx-auto"></div></div>`;
    modal.style.display = 'flex';
    
    try {
        const report = await cashierApi.getCloseCashierReport(localState.cashierSession.id);
        
        // Conteúdo do modal de fechamento de caixa (com relatório)
        modal.innerHTML = `<div class="modal-content max-w-md"><h2 class="text-2xl font-bold mb-4">Fechar Caixa</h2><div class="bg-gray-50 p-4 rounded-lg space-y-2 mb-6 text-left"><p class="flex justify-between"><span>Abertura:</span><strong id="report-start">R$ 0.00</strong></p><p class="flex justify-between"><span>Vendas em Dinheiro:</span><strong id="report-cash">R$ 0.00</strong></p><p class="flex justify-between"><span>Total Esperado:</span><strong id="report-expected" class="text-xl text-indigo-600">R$ 0.00</strong></p></div><form id="close-cashier-form"><div class="mb-6"><label for="finalAmount" class="block text-sm font-medium text-gray-700">Valor Final Contado (R$)</label><input type="number" step="0.01" id="finalAmount" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-2xl p-2 text-center" required></div><p class="flex justify-between text-lg font-semibold mb-4"><span>Diferença:</span><strong id="report-difference" class="text-gray-600">R$ 0.00</strong></p><div class="flex gap-4"><button type="button" data-action="close-modal" data-target="genericModal" class="action-btn-secondary w-full">Cancelar</button><button type="submit" class="w-full bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700">Confirmar Fechamento</button></div></form></div>`;
        
        const finalAmountInput = modal.querySelector('#finalAmount');
        const differenceEl = modal.querySelector('#report-difference');
        
        document.getElementById('report-start').textContent = `R$ ${report.initialAmount.toFixed(2)}`;
        document.getElementById('report-cash').textContent = `R$ ${report.cashSales.toFixed(2)}`;
        document.getElementById('report-expected').textContent = `R$ ${report.expectedAmount.toFixed(2)}`;
        
        finalAmountInput.addEventListener('input', () => {
            const finalAmount = parseFloat(finalAmountInput.value) || 0;
            const difference = finalAmount - report.expectedAmount;
            differenceEl.textContent = `R$ ${difference.toFixed(2)}`;
            if (difference < 0) differenceEl.className = 'text-red-600'; else if (difference > 0) differenceEl.className = 'text-green-600'; else differenceEl.className = 'text-gray-600';
        });
        
        modal.querySelector('#close-cashier-form').addEventListener('submit', handleCloseCashier);
        
    } catch (error) {
        showNotification('Erro', 'Não foi possível carregar o relatório de fechamento.', 'error');
        modal.style.display = 'none';
    }
}

async function handleOpenCashier(e) {
    e.preventDefault();
    const initialAmount = parseFloat(document.getElementById('initialAmount').value);
    
    try {
        const session = await cashierApi.openCashier(initialAmount);
        localState.cashierSession = session;
        
        document.getElementById('genericModal').style.display = 'none';
        
        showNotification('Sucesso', 'Caixa aberto!', 'success');
        renderPage();
        
    } catch(error) {
        showNotification('Erro ao Abrir Caixa', error.message, 'error');
    }
}

async function handleCloseCashier(e) {
    e.preventDefault();
    const finalAmount = parseFloat(document.getElementById('finalAmount').value);
    
    const confirmed = await showConfirmation('Confirmar Fechamento', 'Tem a certeza que deseja fechar o caixa? Esta ação não pode ser desfeita.');
    
    if (confirmed) {
        try {
            await cashierApi.closeCashier(localState.cashierSession.id, finalAmount);
            
            localState.cashierSession = null;
            document.getElementById('genericModal').style.display = 'none';
            
            showNotification('Sucesso', 'Caixa fechado com sucesso!', 'success');
            renderPage();
            
        } catch(error) {
            showNotification('Erro ao Fechar Caixa', error.message, 'error');
        }
    }
}

async function handleHistorySearch() {
    const dateInput = document.getElementById('history-date-input');
    
    if (!dateInput.value) return;
    
    localState.historyDate = dateInput.value;
    renderPage();
}

function renderPage() {
    renderCashierStatus();
    renderComandasList();
    renderAddItemPanel();
    renderCurrentSale();
}


// --- 5. FUNÇÃO PRINCIPAL E EVENT LISTENERS ---

/**
 * Carrega e inicializa a página de Comandas.
 * @param {object} params - Parâmetros de navegação (ex: { selectedAppointmentId: '...', initialFilter: '...' }).
 */
export async function loadComandasPage(params = {}) {
    contentDiv.innerHTML = `
        <section class="h-full flex flex-col p-4 bg-gray-100">
            <div class="flex-shrink-0 flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold text-gray-800">Ponto de Venda (PDV)</h2>
                <div>
                    <button id="open-cashier-btn" data-action="open-cashier" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow">Abrir Caixa</button>
                    <button id="close-cashier-btn" data-action="close-cashier" class="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow hidden">Fechar Caixa</button>
                    <button data-action="navigate-to-sales-report" class="bg-white font-semibold py-2 px-4 rounded-lg shadow ml-2">Ver Relatório</button>
                </div>
            </div>
            <div class="flex-grow relative overflow-hidden">
                <div id="pdv-overlay" class="absolute inset-0 bg-gray-800 bg-opacity-50 z-20 flex flex-col items-center justify-center text-white hidden">
                    <svg class="w-16 h-16 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    <h3 class="text-2xl font-bold">Caixa Fechado</h3>
                    <p>Abra o caixa para iniciar as vendas.</p>
                </div>
                
                <div class="h-full flex flex-row gap-4">

                    <div class="w-3/12 flex flex-col bg-white rounded-lg shadow">
                        <div class="p-3 border-b"><button data-action="new-sale" class="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-all">+ NOVA VENDA</button></div>
                        <div class="p-2 border-b">
                            <div class="flex bg-gray-100 rounded-md p-1">
                                <button data-filter="atendimento" class="comanda-filter-btn flex-1 text-sm font-semibold py-1 rounded-md active">Em Atendimento</button>
                                <button data-filter="awaiting_payment" class="comanda-filter-btn flex-1 text-sm font-semibold py-1 rounded-md">Aguardando Pagamento</button>
                                <button data-filter="finalizada" class="comanda-filter-btn flex-1 text-sm font-semibold py-1 rounded-md">Finalizadas</button>
                            </div>
                            <div id="history-date-picker" class="hidden mt-2 flex gap-2">
                                <input type="date" id="history-date-input" class="w-full p-1 border rounded-md text-sm">
                                <button id="history-search-btn" class="bg-indigo-500 text-white px-3 rounded-md text-sm font-semibold">Buscar</button>
                            </div>
                        </div>
                        <div id="comandas-list" class="flex-grow overflow-y-auto p-2 space-y-2"></div>
                    </div>

                    <div id="pdv-current-sale" class="w-5/12">
                        </div>

                    <div id="pdv-add-item-panel" class="w-4/12">
                        </div>

                </div>
            </div>
        </section>
    `;
    
    // Atualiza o estado local com os parâmetros de navegação (se existirem)
    if (params.initialFilter) {
        localState.comandaListView = params.initialFilter;
    }
    if (params.filterDate) {
        localState.historyDate = new Date(params.filterDate).toISOString().split('T')[0];
    }
    
    // Remove listeners anteriores para evitar bugs de duplicação
    if (pdvPageHandler) {
        contentDiv.removeEventListener('click', pdvPageHandler);
    }

    pdvPageHandler = async (e) => {
        const target = e.target.closest('[data-action], .comanda-filter-btn, #history-search-btn');
        if (!target) return;
        
        // Manipulação dos botões de filtro de lista (coluna esquerda)
        if (target.classList.contains('comanda-filter-btn')) {
            const filter = target.dataset.filter;
            document.querySelectorAll('.comanda-filter-btn').forEach(btn => btn.classList.remove('active'));
            target.classList.add('active');
            localState.comandaListView = filter;
            localState.currentSale = null;
            
            // Lógica para mostrar/esconder o seletor de datas
            const historyPicker = document.getElementById('history-date-picker');
            if (filter === 'finalizada') {
                historyPicker.classList.remove('hidden');
                document.getElementById('history-date-input').value = localState.historyDate;
            } else {
                historyPicker.classList.add('hidden');
            }

            renderPage();
            return;
        }

        if (target.id === 'history-search-btn') {
            await handleHistorySearch();
            return;
        }

        const action = target.dataset.action;
        if (!action) return;
        
        switch (action) {
            case 'open-cashier': 
                openOpenCashierModal(); 
                break;
                
            case 'close-cashier': 
                openCloseCashierModal(); 
                break;
                
            case 'navigate-to-sales-report': 
                navigateTo('sales-report-section'); 
                break;
                
            case 'select-comanda': 
                handleSelectComanda(target.dataset.comandaId); 
                break;
                
            case 'new-sale': 
                handleNewSale(); 
                break;
            
            case 'open-add-item-modal': 
                // Ação dos novos cartões: captura o tipo de item e abre o modal filtrado
                const itemType = target.dataset.itemType; 
                openAddItemModal(itemType); 
                break;
            
            case 'add-item': 
                handleAddItemToSale(target.dataset.itemId, target.dataset.itemType); 
                break;
                
            case 'remove-item': 
                handleRemoveItemFromSale(parseInt(target.dataset.itemIndex, 10)); 
                break;
                
            case 'checkout': 
                handleCheckout(); 
                break;
                
            case 'reopen-comanda': {
                const sale = localState.currentSale;
                if (!sale || !sale.id) return;

                const confirmed = await showConfirmation('Reabrir Comanda', 'Tem a certeza que deseja reabrir esta comanda? O pagamento será revertido e o stock devolvido.');
                if (confirmed) {
                    try {
                        if (sale.type === 'appointment') {
                            await appointmentsApi.reopenAppointment(sale.id);
                        } else {
                            await salesApi.reopenSale(sale.id);
                        }
                        showNotification('Sucesso!', 'Comanda reaberta para edição.', 'success');
                        await initializeData(params);
                        localState.currentSale = null;
                        renderPage();
                    } catch (error) {
                        showNotification('Erro', `Não foi possível reabrir a comanda: ${error.message}`, 'error');
                    }
                }
                break;
            }
        }
    };

    contentDiv.addEventListener('click', pdvPageHandler);
    
    // Seleciona o botão de filtro correto na interface na inicialização
    document.querySelectorAll('.comanda-filter-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-filter="${localState.comandaListView}"]`)?.classList.add('active');

    // Inicia o carregamento dos dados
    await initializeData(params);
}