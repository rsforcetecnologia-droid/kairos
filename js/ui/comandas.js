// js/ui/comandas.js (Card Otimizado)

// --- 1. IMPORTAÇÕES ---
import * as comandasApi from '../api/comandas.js';
import * as salesApi from '../api/sales.js';
import * as appointmentsApi from '../api/appointments.js';
import * as productsApi from '../api/products.js';
import * as servicesApi from '../api/services.js';
import * as clientsApi from '../api/clients.js';
import * as cashierApi from '../api/cashier.js';
import * as packagesApi from '../api/packages.js';
import { state } from '../state.js';
import { showNotification, showConfirmation, showGenericModal } from '../components/modal.js';
import { navigateTo } from '../main.js'; // <-- Importa a função de navegação

// --- 2. ESTADO LOCAL DA PÁGINA ---
let localState = {
    allComandas: [],
    catalog: { services: [], products: [], packages: [] },
    clients: [],
    activeFilter: 'atendimento',
    selectedComandaId: null,
    isCashierOpen: false,
    activeCashierSessionId: null,
    paging: {
        page: 1,
        limit: 12,
        total: 0,
    },
};
let pageEventListener = null;
let contentDiv = null;

// --- 3. FUNÇÕES DE RENDERIZAÇÃO DA UI ---

/** Renderiza o layout base da página de comandas */
function renderPageLayout() {
    const todayStr = new Date().toISOString().split('T')[0];
    contentDiv.innerHTML = `
        <section>
            <div class="flex flex-wrap justify-between items-center mb-6 gap-4">
                <h2 class="text-3xl font-bold text-gray-800">Ponto de Venda (PDV)</h2>
                <div id="cashier-controls" class="flex items-center gap-2"></div>
            </div>

            ${!localState.isCashierOpen ? `
                <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm text-yellow-700">
                                <strong>Caixa Fechado!</strong> Para realizar vendas, você precisa abrir o caixa primeiro. Clique no botão "Abrir Caixa" acima.
                            </p>
                        </div>
                    </div>
                </div>
            ` : ''}

            <div id="comandas-layout">
                <div id="comandas-list-column" class="bg-white p-4 rounded-lg shadow-md">
                    <button 
                        data-action="new-sale" 
                        class="w-full py-3 px-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition shadow-md mb-4 ${!localState.isCashierOpen ? 'opacity-50 cursor-not-allowed' : ''}"
                        ${!localState.isCashierOpen ? 'disabled' : ''}
                    >
                        + NOVA VENDA
                    </button>
                    
                    <div class="flex bg-gray-100 rounded-lg p-1 mb-4">
                        <button data-filter="atendimento" class="filter-btn flex-1 text-sm font-semibold py-2 rounded-md">Em Atendimento</button>
                        <button data-filter="finalizadas" class="filter-btn flex-1 text-sm font-semibold py-2 rounded-md">Finalizadas</button>
                    </div>

                    <div id="finalizadas-datepicker" class="hidden mb-4">
                        <label for="filter-date" class="text-sm font-medium text-gray-700">Mostrar finalizadas de:</label>
                        <input type="date" id="filter-date" value="${todayStr}" class="w-full mt-1 p-2 border rounded-md">
                    </div>

                    <div id="comandas-list" class="space-y-3 max-h-[60vh] overflow-y-auto">
                        <div class="loader mx-auto"></div>
                    </div>
                </div>

                <div id="comanda-detail-container" class="bg-white p-4 lg:p-6 rounded-lg shadow-md flex flex-col min-h-[75vh]">
                    </div>
            </div>
        </section>
    `;
}

/** Renderiza os botões de controle do caixa */
function renderCashierControls() {
    const container = document.getElementById('cashier-controls');
    if (!container) return;
    if (localState.isCashierOpen) {
        container.innerHTML = `
            <span class="text-sm font-medium text-green-700 bg-green-100 py-1 px-3 rounded-full">Caixa Aberto</span>
            <button data-action="close-cashier" class="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600">Fechar Caixa</button>
            <button data-action="view-sales-report" class="py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">Ver Relatório</button>
        `;
    } else {
        container.innerHTML = `
            <span class="text-sm font-medium text-red-700 bg-red-100 py-1 px-3 rounded-full">Caixa Fechado</span>
            <button data-action="open-cashier" class="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600">Abrir Caixa</button>
            <button data-action="view-sales-report" class="py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">Ver Relatório</button>
        `;
    }
}

// ####################################################################
// ### OTIMIZAÇÃO APLICADA AQUI ###
// ####################################################################

/** Renderiza a lista de comandas na coluna da esquerda */
function renderComandaList() {
    const listContainer = document.getElementById('comandas-list');
    if (!listContainer) return;
    
    // Se o caixa estiver fechado, mostra apenas mensagem
    if (!localState.isCashierOpen && localState.activeFilter === 'atendimento') {
        listContainer.innerHTML = `
            <div class="text-center py-10">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p class="mt-2 text-sm font-medium text-gray-700">Caixa Fechado</p>
                <p class="text-xs text-gray-500">Abra o caixa para acessar as comandas</p>
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
        listContainer.innerHTML = `<p class="text-center text-gray-500 py-10">Nenhuma comanda encontrada.</p>`;
        renderPaginationControls(listContainer);
        return;
    }

    // Início da nova lógica de renderização do card
    listContainer.innerHTML = filteredComandas.map(comanda => {
        const total = [...(comanda.services || []), ...(comanda.comandaItems || [])].reduce((acc, item) => acc + (item.price || 0), 0);
        const isSelected = comanda.id === localState.selectedComandaId;
        const time = new Date(comanda.startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        // --- Lógica das Novas Features (Ícone, Tag, etc.) ---
        const isWalkIn = comanda.type === 'walk-in' || comanda.id.startsWith('temp-');
        
        // Se for Venda Avulsa, mostra a tag. Se não, mostra o nome do profissional.
        const typeIndicator = isWalkIn
            ? `<span class="text-xs font-semibold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">Venda Avulsa</span>`
            : `<p class="text-xs text-gray-500 truncate" title="${comanda.professionalName}">${comanda.professionalName}</p>`; // <-- Preenche o espaço em branco

        // Botão de ir para agenda (só para não-avulsas)
        const goToAppointmentBtn = !isWalkIn
            ? `<button data-action="go-to-appointment" data-id="${comanda.id}" data-date="${comanda.startTime}" 
                        class="p-1 rounded-full hover:bg-indigo-100 text-indigo-600" title="Ir para o agendamento">
                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
               </button>`
            : '';
        // --- Fim da Lógica ---

        // --- Nova Estrutura HTML do Card Otimizada ---
        return `
            <div data-action="select-comanda" data-comanda-id="${comanda.id}" 
                 class="comanda-card p-3 rounded-lg border-l-4 cursor-pointer transition-all 
                        ${isSelected ? 'bg-indigo-50 border-indigo-500 shadow' : 'bg-gray-50 border-gray-300 hover:bg-gray-100'}">
                
                <div class="flex justify-between items-start mb-1">
                    <p class="font-bold text-gray-800 truncate" title="${comanda.clientName}">${comanda.clientName}</p>
                    <p class="font-bold text-gray-900 flex-shrink-0 ml-2">R$ ${total.toFixed(2)}</p>
                </div>
                
                <div class="flex justify-between items-center mt-1">
                    <div class="flex items-center gap-2 min-w-0">
                        ${typeIndicator}
                    </div>
                    <div class="flex items-center gap-1 flex-shrink-0">
                        ${goToAppointmentBtn}
                        <p class="text-xs text-gray-500 font-semibold">${time}</p> 
                    </div>
                </div>
            </div>
        `;
    }).join('');
    // Fim da nova lógica

    renderPaginationControls(listContainer);
}

// ####################################################################
// ### FIM DA OTIMIZAÇÃO ###
// ####################################################################


/** Renderiza os controles de paginação */
function renderPaginationControls(container) {
    const { page, total, limit } = localState.paging;
    const totalPages = Math.ceil((total || 0) / limit);
    
    if (totalPages <= 1) return;

    let paginationHtml = `<div class="flex gap-2 justify-center mt-4 flex-wrap">`;
    
    if (page > 1) {
        paginationHtml += `<button data-page="${page - 1}" class="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400">&laquo;</button>`;
    }
    
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= page - 2 && i <= page + 2)) {
            paginationHtml += `<button data-page="${i}" class="px-3 py-1 rounded ${i === page ? 'bg-indigo-600 text-white font-bold' : 'bg-gray-300 hover:bg-gray-400'}">${i}</button>`;
        } else if (i === page - 3 || i === page + 3) {
            paginationHtml += `<span class="px-2">...</span>`;
        }
    }
    
    if (page < totalPages) {
        paginationHtml += `<button data-page="${page + 1}" class="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400">&raquo;</button>`;
    }
    
    paginationHtml += `</div>`;
    container.innerHTML += paginationHtml;

    container.querySelectorAll('button[data-page]').forEach(btn => {
        btn.onclick = () => {
            localState.paging.page = parseInt(btn.dataset.page, 10);
            fetchAndDisplayData();
        };
    });
}

/** Renderiza os detalhes da comanda selecionada na coluna da direita */
function renderComandaDetail() {
    const detailContainer = document.getElementById('comanda-detail-container');
    if (!detailContainer) return;
    
    // Se caixa fechado, mostra mensagem
    if (!localState.isCashierOpen) {
        detailContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-center text-gray-500 relative">
                <button data-action="back-to-list" class="lg:hidden absolute top-0 left-0 p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <svg class="w-20 h-20 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p class="mt-4 font-semibold text-xl">Caixa Fechado</p>
                <p class="text-sm mt-2">Abra o caixa para começar a realizar vendas</p>
                <button data-action="open-cashier" class="mt-6 py-3 px-6 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600">Abrir Caixa Agora</button>
            </div>
        `;
        return;
    }
    
    const comanda = localState.allComandas.find(c => c.id === localState.selectedComandaId);

    if (!comanda) {
        detailContainer.innerHTML = `<div class="flex flex-col items-center justify-center h-full text-center text-gray-500 relative">
            <button data-action="back-to-list" class="lg:hidden absolute top-0 left-0 p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <svg class="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
            <p class="mt-4 font-semibold">Selecione uma comanda</p>
            <p class="text-sm">Ou crie uma nova venda para começar.</p>
        </div>`;
        return;
    }

    // Garante que o container tenha o loader enquanto os detalhes estão sendo preparados (caso a busca de dados demore)
    detailContainer.innerHTML = `<div class="loader mx-auto my-auto"></div>`;

    const allItems = [...(comanda.services || []), ...(comanda.comandaItems || [])];
    const isCompleted = comanda.status === 'completed';

    // --- LÓGICA DE EXIBIÇÃO DOS BOTÕES (JÁ INCLUI A TRAVA) ---
    const isWalkIn = comanda.type === 'walk-in' || comanda.id.startsWith('temp-');
    
    const reopenButton = isCompleted
        ? `<button data-action="reopen-${comanda.type}" data-id="${comanda.id}" class="py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 flex-shrink-0">Reabrir</button>`
        : '';
        
    // Botão de Excluir (só para Venda Avulsa E não-finalizada)
    const deleteButton = isWalkIn && !isCompleted
        ? `<button data-action="delete-walk-in" data-id="${comanda.id}" class="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 flex-shrink-0 ml-2">Excluir Venda</button>`
        : '';
    // --- FIM DA LÓGICA ---


    const groupedItems = allItems.reduce((acc, item) => {
        const key = `${item.type}-${item.id || item.name}`;
        if (!acc[key]) {
            const isOriginal = (comanda.services || []).some(s => s.id === item.id && s.name === item.name);
            acc[key] = { ...item, quantity: 0, isOriginalService: isOriginal && item.type === 'service' };
        }
        acc[key].quantity += 1;
        return acc;
    }, {});
    
    const total = Object.values(groupedItems).reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

    detailContainer.innerHTML = `
        <header class="relative mb-4 pb-4 border-b flex justify-between items-start">
             <button data-action="back-to-list" class="lg:hidden absolute top-0 left-0 p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                 <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
             </button>
            <div class="lg:pl-0 pl-10 min-w-0">
                <h3 class="text-2xl font-bold text-gray-800 truncate">${comanda.clientName}</h3>
                <p class="text-sm text-gray-500 truncate">com ${comanda.professionalName}</p>
                ${isWalkIn ? `<span class="text-xs font-semibold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full mt-1 inline-block">Venda Avulsa</span>` : ''}
            </div>
            
            <div class="flex-shrink-0 flex gap-2">
                ${reopenButton}
                ${deleteButton}
            </div>
        </header>

        <div class="flex-grow overflow-y-auto pr-2">
            <div class="space-y-3">
                ${Object.values(groupedItems).map(item => `
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div class="flex-grow min-w-0">
                            <p class="font-semibold truncate">
                                <span class="inline-flex items-center justify-center bg-gray-200 text-gray-700 text-xs font-bold w-6 h-6 rounded-full mr-2">${item.quantity}x</span>
                                ${item.name}
                                ${item.isOriginalService ? '<span class="text-xs text-indigo-500 font-normal ml-2">(Agendado)</span>' : ''}
                            </p>
                            <p class="text-sm text-gray-500">${item.price.toFixed(2)} /unid.</p>
                        </div>
                        ${!isCompleted ? `<button data-action="remove-item" data-item-id="${item.id}" data-item-type="${item.type}" class="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 font-bold text-xl">&times;</button>` : ''}
                    </div>
                `).join('')}
            </div>
        </div>

        <footer class="mt-6 pt-4 border-t">
            <div class="flex justify-between items-center mb-4">
                <span class="text-lg font-bold">TOTAL</span>
                <span class="text-3xl font-extrabold text-gray-800">R$ ${total.toFixed(2)}</span>
            </div>
            ${!isCompleted ? `
                <div class="flex flex-col sm:flex-row gap-4">
                    <button data-action="add-item" class="flex-1 py-3 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition">Adicionar Item</button>
                    <button data-action="checkout" class="flex-1 py-3 px-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition">Finalizar Pagamento</button>
                </div>` : 
                `<p class="text-center text-green-600 font-semibold bg-green-50 p-3 rounded-lg">Venda finalizada com sucesso!</p>`
            }
        </footer>
    `;
}

// --- 4. FUNÇÕES DE MODAIS ---

function openAddItemModal() {
    // Validação: bloqueia se caixa fechado
    if (!localState.isCashierOpen) {
        showNotification('Caixa Fechado', 'Abra o caixa antes de adicionar itens.', 'error');
        return;
    }
    
    const { modalElement, setContent, close } = showGenericModal({ 
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
                            <span class="flex-grow text-left min-w-0 truncate">${item.name}</span>
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
                <h3 class="font-bold text-2xl text-gray-800">${item.name}</h3>
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

function openCheckoutModal() {
    // Validação: bloqueia se caixa fechado
    if (!localState.isCashierOpen) {
        showNotification('Caixa Fechado', 'Abra o caixa antes de finalizar pagamentos.', 'error');
        return;
    }
    
    const comanda = localState.allComandas.find(c => c.id === localState.selectedComandaId);
    if (!comanda) return;

    const allItems = [...(comanda.services || []), ...(comanda.comandaItems || [])];
    const total = allItems.reduce((acc, item) => acc + (item.price || 0), 0);

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
        
        // (NOVO) Referência ao container dos controles de adição
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

        // Lógica de exibição principal (O que mudou)
        if (modalInternalState.remainingAmount <= 0.001) {
            // TOTAL PAGO
            remainingEl.textContent = 'Total Pago!';
            remainingEl.className = `text-lg font-bold text-center mb-4 text-green-600`;
            
            // CORREÇÃO ESTRUTURAL: Definimos o valor como 0.00, mas o controle estará oculto.
            paymentValueInput.value = ''; 
            finalizeBtn.disabled = false; // Habilita o botão Finalizar
            
            // ESCONDE os controles de adicionar pagamento
            if (paymentControls) paymentControls.style.display = 'none';

        } else {
            // AINDA FALTA PAGAR
            remainingEl.textContent = `Faltam: R$ ${modalInternalState.remainingAmount.toFixed(2)}`;
            remainingEl.className = `text-lg font-bold text-center mb-4 text-red-600`;
            
            // Preenche o input com o valor que falta
            paymentValueInput.value = modalInternalState.remainingAmount.toFixed(2);
            finalizeBtn.disabled = true; // Desabilita o botão Finalizar
            
            // MOSTRA os controles de adicionar pagamento
            if (paymentControls) paymentControls.style.display = 'block';
        }
        
        // O restante da lógica de render (seleção de método, parcelas, troco) permanece o mesmo
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
        
        // CORREÇÃO DA VALIDAÇÃO (MAIS ROBUSTA)
        // Checa se é NaN (ex: `parseFloat('')`) OU se é um valor não positivo.
        if (isNaN(value) || value <= 0) {
            showNotification('Valor Inválido', 'Insira um valor de pagamento válido e maior que zero.', 'error');
            return;
        }
        
        // Verifica se excede o saldo restante (regra de negócio)
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
        <div class="text-center mb-4"><p class="text-lg text-gray-600">Valor Total</p><p class="text-5xl font-bold text-gray-800 my-2">R$ ${total.toFixed(2)}</p></div>
        <div id="payment-list" class="space-y-2 mb-4"></div>
        <div id="remaining-amount"></div>
        
        <div id="payment-controls" class="space-y-4 border-t pt-4">
            <div class="grid grid-cols-3 gap-2">
                <button data-method="dinheiro" class="payment-method-btn flex flex-col items-center p-2 rounded-lg border-2 border-green-400 bg-green-50 ring-green-500"><svg class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg><span class="text-xs mt-1 font-semibold">Dinheiro</span></button>
                <button data-method="pix" class="payment-method-btn flex flex-col items-center p-2 rounded-lg border-2 border-cyan-400 bg-cyan-50 ring-cyan-500"><svg class="w-6 h-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg><span class="text-xs mt-1 font-semibold">PIX</span></button>
                <button data-method="debito" class="payment-method-btn flex flex-col items-center p-2 rounded-lg border-2 border-blue-400 bg-blue-50 ring-blue-500"><svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg><span class="text-xs mt-1 font-semibold">Débito</span></button>
                <button data-method="credito" class="payment-method-btn flex flex-col items-center p-2 rounded-lg border-2 border-purple-400 bg-purple-50 ring-purple-500"><svg class="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg><span class="text-xs mt-1 font-semibold">Crédito</span></button>
                <button data-method="crediario" class="payment-method-btn flex flex-col items-center p-2 rounded-lg border-2 border-orange-400 bg-orange-50 ring-orange-500"><svg class="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg><span class="text-xs mt-1 font-semibold">Fiado</span></button>
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

async function openNewSaleModal() {
    // Validação: bloqueia se caixa fechado
    if (!localState.isCashierOpen) {
        showNotification('Caixa Fechado', 'Abra o caixa antes de criar uma nova venda.', 'error');
        return;
    }
    
    const clientsOptions = localState.clients.map(c => `<option value="${c.id}">${c.name} - ${c.phone}</option>`).join('');
    const professionalsOptions = state.professionals.map(p => `<option value="${p.id}">${p.name}</option>`).join('');

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
}

async function openCashierModal() {
    const contentHTML = `
        <form id="open-cashier-form" class="space-y-4">
            <div>
                <label for="initial-amount" class="block text-sm font-medium text-gray-700">Valor Inicial do Caixa</label>
                <div class="mt-1 relative">
                    <span class="absolute left-3 top-2 text-gray-500 font-semibold">R$</span>
                    <input 
                        type="number" 
                        step="0.01" 
                        min="0"
                        id="initial-amount" 
                        required 
                        class="w-full p-2 pl-12 border rounded-md text-lg font-semibold" 
                        placeholder="0.00"
                        value="0.00"
                    >
                </div>
                <p class="text-xs text-gray-500 mt-1">Digite o valor inicial disponível no caixa (pode ser R$ 0,00)</p>
            </div>
            <div>
                <label for="cashier-notes" class="block text-sm font-medium text-gray-700">Observações (opcional)</label>
                <textarea 
                    id="cashier-notes" 
                    rows="3" 
                    class="mt-1 w-full p-2 border rounded-md" 
                    placeholder="Notas sobre a abertura do caixa..."
                ></textarea>
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

            if (notes) {
                payload.notes = notes;
            }

            console.log('Abrindo caixa com payload:', payload);

            const session = await cashierApi.openCashier(payload);
            
            localState.isCashierOpen = true;
            localState.activeCashierSessionId = session.id;
            
            // Recarrega toda a página para refletir o estado do caixa
            await loadComandasPage();
            
            document.getElementById('genericModal').style.display = 'none';
            showNotification('Sucesso!', `Caixa aberto com valor inicial de R$ ${initialAmount.toFixed(2)}`, 'success');
        } catch (error) {
            console.error('Erro ao abrir caixa:', error);
            showNotification('Erro', `Não foi possível abrir o caixa: ${error.message}`, 'error');
        }
    });
}

// (NOVA FUNÇÃO) Substitui a antiga 'handleCloseCashier'
async function handleOpenCloseCashierModal() {
    const sessionId = localState.activeCashierSessionId;
    if (!sessionId) return; // Segurança

    try {
        // 1. Busca os dados da sessão atual
        const report = await cashierApi.getCloseCashierReport(sessionId);
        
        // 2. Monta o HTML do modal
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

        // 3. Exibe o modal
        const { modalElement } = showGenericModal({ title: "Fechar Caixa", contentHTML, maxWidth: 'max-w-md' });

        // 4. Adiciona o listener de submit
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
                await loadComandasPage(); // Recarrega a página
                
                showNotification('Sucesso!', 'Caixa fechado com sucesso!', 'success');
            } catch (error) {
                showNotification('Erro', `Não foi possível fechar o caixa: ${error.message}`, 'error');
            }
        });
        
    } catch (error) {
        showNotification('Erro', `Não foi possível carregar o relatório de fecho: ${error.message}`, 'error');
    }
}


// --- 5. HANDLERS ---

async function handleFilterClick(filter) {
    if (localState.activeFilter === filter) return;
    localState.activeFilter = filter;
    localState.paging.page = 1;
    
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('bg-white', 'text-indigo-600', 'shadow'));
    document.querySelector(`[data-filter="${filter}"]`).classList.add('bg-white', 'text-indigo-600', 'shadow');
    
    document.getElementById('finalizadas-datepicker').classList.toggle('hidden', filter !== 'finalizadas');
    
    await fetchAndDisplayData();
    localState.selectedComandaId = null;
    
    // ATUALIZAÇÃO RESPONSIVA: Garante que a lista esteja visível ao trocar de filtro
    const layout = document.getElementById('comandas-layout');
    if (layout) layout.classList.remove('detail-view-active');
    
    // Renderiza o placeholder no desktop
    if (window.innerWidth >= 1024) {
        renderComandaDetail();
    }
}

function handleComandaClick(comandaId) {
    localState.selectedComandaId = comandaId;
    renderComandaList(); // Apenas atualiza o highlight da lista

    // ATUALIZAÇÃO RESPONSIVA: Ativa a view de detalhe no mobile
    const layout = document.getElementById('comandas-layout');
    if (layout) layout.classList.add('detail-view-active');

    // CORREÇÃO DE TIMING (Bug do Estouro):
    // Espera a animação de slide de 300ms (definida no styles.css) terminar
    // ANTES de tentar renderizar o conteúdo do painel de detalhes.
    setTimeout(() => {
        // Só renderiza se o usuário ainda estiver nesta comanda (evita race condition)
        if (localState.selectedComandaId === comandaId) {
            renderComandaDetail(); // Renderiza o conteúdo DEPOIS da animação
        }
    }, 300); // 300ms = tempo da transição em css/styles.css
}


async function handleAddItemToComanda(itemData, quantity) {
    const comanda = localState.allComandas.find(c => c.id === localState.selectedComandaId);
    if (!comanda) return;

    const itemsToAdd = Array(quantity).fill(0).map(() => ({
        id: itemData.id,
        name: itemData.name,
        price: itemData.price,
        type: itemData.type
    }));
    
    comanda.comandaItems = comanda.comandaItems || [];
    comanda.comandaItems.push(...itemsToAdd);

    // ### INÍCIO DA CORREÇÃO ###
    // Se a comanda é uma 'Venda Avulsa' (walk-in) e ainda é temporária (não foi salva),
    // apenas atualiza a UI local. Não chama a API.
    if (comanda.type === 'walk-in' && comanda.id.startsWith('temp-')) {
        showNotification('Sucesso', `${quantity}x ${itemData.name} adicionado(s)!`, 'success');
        renderComandaDetail(); // A comanda no localState foi atualizada, só re-renderiza
        renderComandaList(); // Atualiza o total na lista
        return; // Para a execução aqui
    }
    // ### FIM DA CORREÇÃO ###

    // Se for um agendamento existente, continua o fluxo normal da API
    try {
        // A API de updateAppointment lida com a persistência de itens de comanda no backend
        await appointmentsApi.updateAppointment(comanda.id, comanda);
        showNotification('Sucesso', `${quantity}x ${itemData.name} adicionado(s)!`, 'success');
        renderComandaDetail();
        renderComandaList();
    } catch (error) {
        showNotification('Erro', `Não foi possível adicionar o item: ${error.message}`, 'error');
        // Reverte a alteração local em caso de erro
        comanda.comandaItems.splice(comanda.comandaItems.length - quantity, quantity);
    }
}


async function handleRemoveItemFromComanda(itemId, itemType) {
    const comanda = localState.allComandas.find(c => c.id === localState.selectedComandaId);
    if (!comanda) return;

    let itemRemoved = false;

    // Tenta remover dos itens adicionais (comandaItems)
    let comandaItemIndex = comanda.comandaItems.findIndex(item => item.id === itemId && item.type === itemType);
    if (comandaItemIndex > -1) {
        comanda.comandaItems.splice(comandaItemIndex, 1);
        itemRemoved = true;
    } else {
        // Tenta remover dos serviços originais (services) - isso é mais arriscado mas a lógica já existe
        let serviceIndex = comanda.services.findIndex(item => item.id === itemId);
        if (serviceIndex > -1) {
            comanda.services.splice(serviceIndex, 1);
            itemRemoved = true;
        }
    }
    
    if (itemRemoved) {
        // ### INÍCIO DA CORREÇÃO ###
        // Se for uma Venda Avulsa temporária, apenas atualiza a UI local
        if (comanda.type === 'walk-in' && comanda.id.startsWith('temp-')) {
             showNotification('Sucesso', 'Item removido!', 'success');
             renderComandaDetail();
             renderComandaList();
             return;
        }
        // ### FIM DA CORREÇÃO ###
        
        // Se for um agendamento existente, chama a API
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
    const allItems = [...(comanda.services || []), ...(comanda.comandaItems || [])];
    const data = {
        payments,
        totalAmount,
        items: allItems,
        cashierSessionId: localState.activeCashierSessionId,
    };

    try {
        if (isAppointment) {
            await appointmentsApi.checkoutAppointment(comanda.id, data);
        } else {
            // Se for walk-in, usa a API de criação de venda (sales)
            data.clientName = comanda.clientName;
            data.professionalId = comanda.professionalId;
            data.clientPhone = comanda.clientPhone; // Garante que o telefone seja enviado
            await salesApi.createSale(data);
        }
        showNotification('Sucesso!', 'Venda finalizada com sucesso!', 'success');
        document.getElementById('genericModal').style.display = 'none';

        // ATUALIZAÇÃO RESPONSIVA: Volta para a lista após finalizar
        const layout = document.getElementById('comandas-layout');
        if (layout) layout.classList.remove('detail-view-active');
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
    const client = localState.clients.find(c => c.id === clientId);
    const professional = state.professionals.find(p => p.id === professionalId);

    if (!client || !professional) {
        showNotification('Erro', 'Selecione um cliente e um profissional válidos.', 'error');
        return;
    }
    
    const newComanda = {
        id: `temp-${Date.now()}`,
        type: 'walk-in',
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
    
    // Aplica a mesma lógica de clique para a nova comanda
    handleComandaClick(newComanda.id);
}

// --- 6. INICIALIZAÇÃO ---

async function fetchAndDisplayData() {
    const listContainer = document.getElementById('comandas-list');
    listContainer.innerHTML = '<div class="loader mx-auto"></div>';
    
    const filterDate = localState.activeFilter === 'finalizadas' 
        ? document.getElementById('filter-date').value 
        : null;

    try {
        // Primeiro verifica estado do caixa
        const activeSession = await cashierApi.getActiveSession();
        localState.isCashierOpen = !!activeSession;
        localState.activeCashierSessionId = activeSession ? activeSession.id : null;
        
        renderCashierControls();
        
        // Se caixa fechado no modo "atendimento", não carrega comandas
        if (!localState.isCashierOpen && localState.activeFilter === 'atendimento') {
            renderComandaList();
            renderComandaDetail(); // Isso vai mostrar o placeholder de "caixa fechado"
            return;
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
            const [services, products, packages, clients] = await Promise.all([
                servicesApi.getServices(state.establishmentId),
                productsApi.getProducts(state.establishmentId),
                packagesApi.getPackages(state.establishmentId),
                clientsApi.getClients(state.establishmentId)
            ]);
            localState.catalog = { services, products, packages };
            localState.clients = clients;
        }
        
        renderComandaList();
        
        // ATUALIZAÇÃO RESPONSIVA: Só renderiza o detalhe se um ID estiver selecionado
        // E NÃO ESTIVERMOS EM MODO MOBILE (pois o 'handleComandaClick' cuidará disso)
        if (localState.selectedComandaId && window.innerWidth >= 1024) {
             renderComandaDetail();
        } else {
             // Garante que o placeholder seja renderizado no desktop
             if (window.innerWidth >= 1024) {
                 renderComandaDetail();
             }
        }

    } catch (error) {
        showNotification('Erro de Carregamento', `Não foi possível carregar os dados: ${error.message}`, 'error');
        listContainer.innerHTML = `<p class="text-red-500">${error.message}</p>`;
    }
}

export async function loadComandasPage(params = {}) {
    contentDiv = document.getElementById('content');
    
    // Verifica primeiro o estado do caixa
    try {
        const activeSession = await cashierApi.getActiveSession();
        localState.isCashierOpen = !!activeSession;
        localState.activeCashierSessionId = activeSession ? activeSession.id : null;
    } catch (error) {
        console.error('Erro ao verificar caixa:', error);
        localState.isCashierOpen = false;
    }
    
    // Limpa o estado de seleção ao carregar a página
    localState.selectedComandaId = params.selectedAppointmentId || null;
    
    renderPageLayout();

    if (pageEventListener) {
        contentDiv.removeEventListener('click', pageEventListener);
        contentDiv.removeEventListener('change', pageEventListener);
    }

    pageEventListener = async (e) => {
        // (MODIFICADO) Adicionado 'data-id' para capturar cliques nos novos botões
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
            // Impede que o clique no botão "go-to-appointment" selecione a comanda
            if (e.target.closest('[data-action="go-to-appointment"]')) {
                e.stopPropagation();
                return;
            }
            handleComandaClick(target.dataset.comandaId);
        } else if (target.matches('[data-action]')) {
            const action = target.dataset.action;
            // (MODIFICADO) Pega o ID do target, que pode ser a comanda ou um botão específico
            const comandaId = target.dataset.id || localState.selectedComandaId;
            
            switch (action) {
                // ATUALIZAÇÃO RESPONSIVA: Adicionado 'back-to-list'
                case 'back-to-list': {
                    const layout = document.getElementById('comandas-layout');
                    if (layout) layout.classList.remove('detail-view-active');
                    localState.selectedComandaId = null;
                    renderComandaList(); // Re-renderiza para tirar o highlight
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
                    // (MODIFICADO) Chama o novo modal de fechamento
                    await handleOpenCloseCashierModal();
                    break;
                
                // ### INÍCIO DA CORREÇÃO ###
                case 'view-sales-report':
                    // Ação corrigida: Sempre navega para a página de relatórios,
                    // que contém o histórico de caixas.
                    navigateTo('sales-report-section'); 
                    break;
                // ### FIM DA CORREÇÃO ###

                case 'remove-item':
                    await handleRemoveItemFromComanda(target.dataset.itemId, target.dataset.itemType);
                    break;
                case 'reopen-appointment': {
                    const confirmed = await showConfirmation('Reabrir Comanda', 'Tem certeza? O pagamento será estornado e os produtos devolvidos ao estoque.');
                    if (confirmed) {
                        try {
                            // 1. CHAMA API DO BACKEND
                            await appointmentsApi.reopenAppointment(comandaId);
                            
                            // 2. AJUSTE CRÍTICO: Limpa o objeto em MEMÓRIA (localState) imediatamente
                            const reopenedComandaIndex = localState.allComandas.findIndex(c => c.id === comandaId);
                            if (reopenedComandaIndex !== -1) {
                                // REMOVE os campos que continham a forma de pagamento anterior
                                delete localState.allComandas[reopenedComandaIndex].transaction; 
                                delete localState.allComandas[reopenedComandaIndex].cashierSessionId; 
                                delete localState.allComandas[reopenedComandaIndex].redeemedReward;
                                localState.allComandas[reopenedComandaIndex].status = 'confirmed'; // Garante o status correto para reexibição
                            }
                            
                            // 3. Limpa a seleção para forçar o re-render
                            localState.selectedComandaId = null; 
                            
                            // ATUALIZAÇÃO RESPONSIVA: Volta para a lista
                            const layout = document.getElementById('comandas-layout');
                            if (layout) layout.classList.remove('detail-view-active');

                            showNotification('Sucesso!', 'Comanda reaberta para edição.', 'success');
                            // 4. Recarrega a lista do backend (obtém os dados mais limpos)
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
                            
                            // ATUALIZAÇÃO RESPONSIVA: Volta para a lista
                            const layout = document.getElementById('comandas-layout');
                            if (layout) layout.classList.remove('detail-view-active');
                            localState.selectedComandaId = null;

                            await fetchAndDisplayData();
                        } catch (error) {
                            showNotification('Erro', `Não foi possível reabrir: ${error.message}`, 'error');
                        }
                    }
                    break;
                }
                
                // ### INÍCIO DAS NOVAS AÇÕES ###
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
                        // Se for um 'temp-' id, apenas remove localmente
                        if (comandaId.startsWith('temp-')) {
                            localState.allComandas = localState.allComandas.filter(c => c.id !== comandaId);
                            localState.selectedComandaId = null;
                            renderComandaList();
                            renderComandaDetail(); // Mostra o placeholder
                            showNotification('Sucesso', 'Venda avulsa removida.', 'success');
                        } else {
                            // Se for um ID real, chama a API
                            try {
                                await salesApi.deleteSale(comandaId);
                                showNotification('Sucesso', 'Venda avulsa excluída com sucesso.', 'success');
                                localState.selectedComandaId = null;
                                await fetchAndDisplayData(); // Recarrega do zero
                            } catch (error) {
                                showNotification('Erro', `Não foi possível excluir: ${error.message}`, 'error');
                            }
                        }
                    }
                    break;
                }
                // ### FIM DAS NOVAS AÇÕES ###
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

    // ATUALIZAÇÃO RESPONSIVA: Se uma comanda foi passada por parâmetro (ex: vindo da agenda),
    // ativa a view de detalhe imediatamente, mas com o atraso para a animação.
    if (localState.selectedComandaId) {
        handleComandaClick(localState.selectedComandaId);
    }
}