// js/ui/clients.js

// --- 1. IMPORTAÇÕES ---
import * as clientsApi from '../api/clients.js';
import * as appointmentsApi from '../api/appointments.js';
// Importação da função de fetch autenticado para corrigir o erro 403
import { authenticatedFetch } from '../api/apiService.js'; 
import { showNotification, showConfirmation, showGenericModal } from '../components/modal.js';
import { navigateTo } from '../main.js';
import { escapeHTML, formatDate, formatCurrency } from '../utils.js'; 
import { state } from '../state.js';

// --- 2. ESTADO LOCAL ---
let localState = {
    clients: [],
    selectedClient: null,
    activeTab: 'profile', // 'profile', 'appointments', 'history', 'loyalty'
    searchTerm: '',
    loading: false,
    
    // Estados para otimização e paginação do histórico
    historyLimit: 20, 
    historySearchTerm: '', 
    historyLoading: false,
    historyData: {
        appointments: [],
        sales: [],
        loyaltyLog: [] // Histórico unificado de fidelidade
    }
};

let contentDiv = null;

// --- 3. FUNÇÕES PRINCIPAIS DE RENDERIZAÇÃO ---

// Layout Base (Responsivo)
function renderLayout() {
    contentDiv.innerHTML = `
        <section class="h-full flex flex-col bg-gray-50">
            <div class="p-4 bg-white border-b shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3 sticky top-0 z-30">
                <div class="w-full sm:w-auto text-center sm:text-left">
                    <h2 class="text-xl sm:text-2xl font-bold text-gray-800">Gestão de Clientes</h2>
                    <p class="text-xs text-gray-500 hidden sm:block">Gerencie perfis, histórico, agendamentos e fidelidade</p>
                </div>
                
                <div class="w-full sm:w-auto">
                    ${!localState.selectedClient ? `
                    <button id="btn-new-client" class="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-700 transition shadow flex items-center justify-center gap-2 text-sm font-bold active:scale-95 transform duration-150">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                        Novo Cliente
                    </button>` : `
                    <button id="btn-back-list" class="w-full sm:w-auto bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition border border-gray-300 flex items-center justify-center gap-2 text-sm font-bold active:scale-95 transform duration-150">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Voltar
                    </button>
                    `}
                </div>
            </div>

            <div id="clients-content-area" class="flex-grow overflow-y-auto p-2 sm:p-4 custom-scrollbar">
                ${localState.loading ? '<div class="loader mx-auto mt-10"></div>' : ''}
            </div>
        </section>
    `;

    // Event Listeners Globais do Layout
    const btnNew = document.getElementById('btn-new-client');
    const btnBack = document.getElementById('btn-back-list');

    if (btnNew) btnNew.onclick = openNewClientModal;
    if (btnBack) btnBack.onclick = () => {
        localState.selectedClient = null;
        renderClientList();
    };
}

// Renderiza a Lista de Clientes (Tela Inicial)
function renderClientList() {
    renderLayout(); 
    
    const container = document.getElementById('clients-content-area');
    
    // Filtragem local
    const filtered = localState.clients.filter(c => 
        c.name.toLowerCase().includes(localState.searchTerm.toLowerCase()) ||
        (c.phone && c.phone.includes(localState.searchTerm))
    );

    const searchHTML = `
        <div class="mb-4 sm:mb-6 max-w-2xl mx-auto px-1 sm:px-0">
            <div class="relative">
                <input type="text" id="client-search" 
                    class="w-full p-3.5 pl-12 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition text-base" 
                    placeholder="Buscar por nome ou telefone..." 
                    value="${localState.searchTerm}">
                <svg class="w-6 h-6 text-gray-400 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
        </div>
    `;

    const listHTML = filtered.length > 0 ? `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-6xl mx-auto pb-10">
            ${filtered.map(client => `
                <div class="client-card bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer group relative overflow-hidden active:bg-gray-50" data-id="${client.id}">
                    <div class="absolute top-0 left-0 w-1 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition"></div>
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
                            ${client.name.charAt(0).toUpperCase()}
                        </div>
                        <div class="flex-grow min-w-0">
                            <h3 class="font-bold text-gray-800 truncate text-base sm:text-lg">${escapeHTML(client.name)}</h3>
                            <p class="text-sm text-gray-500 flex items-center gap-1">
                                <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                <span class="truncate">${client.phone || 'Sem telefone'}</span>
                            </p>
                            ${client.loyaltyPoints ? `<span class="text-xs font-bold text-amber-600 mt-1 inline-block bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">⭐ ${client.loyaltyPoints} pts</span>` : ''}
                        </div>
                        <div class="text-right flex-shrink-0">
                            <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">Ver</span>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    ` : `
        <div class="text-center py-20 opacity-50 px-4">
            <svg class="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            <p class="text-lg sm:text-xl font-medium text-gray-600">Nenhum cliente encontrado</p>
            <p class="text-sm text-gray-400">Tente buscar outro nome ou cadastre um novo.</p>
        </div>
    `;

    container.innerHTML = searchHTML + listHTML;

    // Listeners da Lista
    const searchInput = document.getElementById('client-search');
    searchInput.focus();
    searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
    
    searchInput.addEventListener('input', (e) => {
        localState.searchTerm = e.target.value;
        renderClientList(); 
    });

    container.querySelectorAll('.client-card').forEach(card => {
        card.onclick = () => selectClient(card.dataset.id);
    });
}

// Renderiza a Ficha do Cliente (Detalhes) - Responsivo
async function renderClientDetails() {
    renderLayout(); 
    const container = document.getElementById('clients-content-area');
    const client = localState.selectedClient;

    if (!client) return renderClientList();

    // Carrega histórico se não estiver na aba perfil e se o histórico estiver vazio
    if (localState.activeTab !== 'profile' && localState.historyData.appointments.length === 0) {
        await fetchClientHistory(client.id);
    }

    const tabsHTML = `
        <div class="flex gap-2 mb-6 border-b overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <button class="tab-btn ${localState.activeTab === 'profile' ? 'active-tab' : ''}" data-tab="profile">
                👤 Perfil
            </button>
            <button class="tab-btn ${localState.activeTab === 'appointments' ? 'active-tab' : ''}" data-tab="appointments">
                📅 Agendamentos
            </button>
            <button class="tab-btn ${localState.activeTab === 'history' ? 'active-tab' : ''}" data-tab="history">
                💰 Histórico
            </button>
            <button class="tab-btn ${localState.activeTab === 'loyalty' ? 'active-tab' : ''}" data-tab="loyalty">
                ⭐ Fidelidade
            </button>
        </div>
    `;

    let contentHTML = '';

    if (localState.activeTab === 'profile') {
        contentHTML = renderProfileTab(client);
    } else if (localState.activeTab === 'appointments') {
        contentHTML = renderAppointmentsTab(client);
    } else if (localState.activeTab === 'history') {
        contentHTML = renderHistoryTab(client);
    } else if (localState.activeTab === 'loyalty') {
        contentHTML = renderLoyaltyTab(client);
    }

    // Card Full-Width no Mobile (sem bordas/margens laterais), com bordas no Desktop
    container.innerHTML = `
        <div class="max-w-4xl mx-auto w-full bg-white sm:rounded-2xl shadow-none sm:shadow-lg border-x-0 sm:border border-gray-200 overflow-hidden -mt-2 sm:mt-0">
            <div class="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white relative">
                <div class="flex flex-col md:flex-row items-center gap-4 relative z-10">
                    <div class="w-20 h-20 rounded-full bg-white text-indigo-600 flex items-center justify-center text-3xl font-bold shadow-lg flex-shrink-0">
                        ${client.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="text-center md:text-left">
                        <h2 class="text-2xl font-bold leading-tight">${escapeHTML(client.name)}</h2>
                        <p class="opacity-90 text-sm mt-1">${client.phone || 'Sem telefone'}</p>
                        ${client.email ? `<p class="opacity-75 text-xs">${client.email}</p>` : ''}
                    </div>
                    
                    <div class="md:ml-auto bg-white/20 p-2 rounded-lg backdrop-blur-sm text-center min-w-[100px]">
                        <p class="text-xs uppercase font-bold tracking-wide opacity-80">Pontos</p>
                        <p class="text-2xl font-extrabold text-yellow-300 shadow-sm">${client.loyaltyPoints || 0}</p>
                    </div>
                </div>
            </div>

            <div class="p-4 sm:p-6">
                ${tabsHTML}
                <div class="animate-fade-in relative min-h-[300px]">
                    ${localState.historyLoading ? '<div class="absolute inset-0 bg-white/80 flex items-start justify-center pt-10 z-20"><div class="loader"></div></div>' : ''}
                    ${contentHTML}
                </div>
            </div>
        </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
        .tab-btn { padding: 0.75rem 1rem; font-weight: 600; color: #6b7280; border-bottom: 3px solid transparent; transition: all 0.3s; white-space: nowrap; font-size: 0.9rem; }
        .tab-btn:hover { color: #4f46e5; background-color: #f9fafb; border-radius: 0.5rem 0.5rem 0 0; }
        .active-tab { color: #4f46e5; border-bottom-color: #4f46e5; }
        .history-card:hover { transform: translateY(-2px); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @media (min-width: 640px) { .tab-btn { padding: 0.75rem 1.5rem; font-size: 1rem; } }
    `;
    container.appendChild(style);

    // Event Listeners das Abas
    container.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => {
            const newTab = btn.dataset.tab;
            if (localState.activeTab !== newTab) {
                // Reset de filtros ao mudar de aba
                if (newTab === 'appointments' || newTab === 'history') {
                    localState.historyLimit = 20;
                    localState.historySearchTerm = '';
                }
            }
            localState.activeTab = newTab;
            renderClientDetails();
        };
    });

    if (localState.activeTab === 'profile') {
        document.getElementById('form-edit-client').onsubmit = handleSaveClient;
        document.getElementById('btn-delete-client').onclick = handleDeleteClient;
    }
    
    if (localState.activeTab === 'loyalty') {
        const btnRedeem = document.getElementById('btn-manual-redeem');
        if(btnRedeem) btnRedeem.onclick = () => openManualRedemptionModal(client);
    }

    const historySearchInput = document.getElementById('history-search-input');
    if (historySearchInput) {
        historySearchInput.focus();
        const val = historySearchInput.value;
        historySearchInput.value = '';
        historySearchInput.value = val;
        
        historySearchInput.addEventListener('input', (e) => {
            localState.historySearchTerm = e.target.value;
            renderClientDetails();
        });
    }

    const btnLoadMore = document.getElementById('btn-load-more');
    if (btnLoadMore) {
        btnLoadMore.onclick = () => {
            localState.historyLimit += 20; 
            renderClientDetails(); // Re-renderiza para mostrar mais itens
            fetchClientHistory(client.id); // Recarrega se necessário
        };
    }

    container.querySelectorAll('[data-go-agenda]').forEach(btn => {
        btn.onclick = (e) => {
            const date = btn.dataset.date;
            const id = btn.dataset.id;
            navigateTo('agenda-section', { targetDate: new Date(date), scrollToAppointmentId: id });
        };
    });

    container.querySelectorAll('[data-go-comanda]').forEach(btn => {
        btn.onclick = (e) => {
            const id = btn.dataset.id;
            navigateTo('comandas-section', { selectedAppointmentId: id, initialFilter: 'finalizadas' });
        };
    });
}

// HTML: Aba Perfil
function renderProfileTab(client) {
    return `
        <form id="form-edit-client" class="space-y-4 pb-10">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input type="text" name="name" value="${escapeHTML(client.name)}" required class="mt-1 block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Telefone</label>
                    <input type="tel" name="phone" value="${escapeHTML(client.phone || '')}" class="mt-1 block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">E-mail</label>
                    <input type="email" name="email" value="${escapeHTML(client.email || '')}" class="mt-1 block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base">
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Dia Nasc.</label>
                        <input type="number" name="dobDay" min="1" max="31" value="${client.dobDay || ''}" class="mt-1 block w-full p-3 rounded-lg border border-gray-300 text-base">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Mês Nasc.</label>
                        <input type="number" name="dobMonth" min="1" max="12" value="${client.dobMonth || ''}" class="mt-1 block w-full p-3 rounded-lg border border-gray-300 text-base">
                    </div>
                </div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Observações</label>
                <textarea name="notes" rows="3" class="mt-1 block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition text-base">${escapeHTML(client.notes || '')}</textarea>
            </div>
            
            <div class="pt-6 flex flex-col-reverse sm:flex-row justify-between items-center border-t mt-4 gap-4">
                <button type="button" id="btn-delete-client" class="w-full sm:w-auto text-red-500 hover:text-red-700 text-sm font-bold flex items-center justify-center gap-1 py-3 sm:py-0">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    Excluir Cliente
                </button>
                <button type="submit" class="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-indigo-700 transition transform active:scale-95">
                    Salvar Alterações
                </button>
            </div>
        </form>
    `;
}

// HTML: Aba Agendamentos
function renderAppointmentsTab(client) {
    let appointments = localState.historyData.appointments || [];
    
    if (localState.historySearchTerm) {
        const term = localState.historySearchTerm.toLowerCase();
        appointments = appointments.filter(a => 
            (a.serviceName && a.serviceName.toLowerCase().includes(term)) ||
            (a.professionalName && a.professionalName.toLowerCase().includes(term)) ||
            (a.startTime && new Date(a.startTime).toLocaleDateString().includes(term))
        );
    }
    
    const now = new Date();
    appointments.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

    const renderCard = (appt) => {
        const date = new Date(appt.startTime);
        const dateStr = date.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' });
        const timeStr = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        const isPast = date < now;
        
        return `
            <div class="history-card bg-white border border-gray-200 rounded-lg p-3 sm:p-4 mb-3 transition-all cursor-pointer relative overflow-hidden group active:bg-gray-50"
                 data-go-agenda="true" data-id="${appt.id}" data-date="${appt.startTime}">
                <div class="absolute left-0 top-0 bottom-0 w-1.5 ${appt.status === 'cancelled' ? 'bg-red-500' : (isPast ? 'bg-gray-400' : 'bg-green-500')}"></div>
                <div class="flex justify-between items-start pl-2">
                    <div>
                        <p class="font-bold text-gray-800 flex items-center gap-1.5 text-base">
                            <span class="capitalize">${dateStr}</span> <span class="text-sm font-normal text-gray-500">às ${timeStr}</span>
                        </p>
                        <p class="text-sm text-gray-600 mt-0.5 font-medium line-clamp-1">${escapeHTML(appt.serviceName || 'Serviço')}</p>
                        <p class="text-xs text-gray-500 mt-0.5">Prof: ${escapeHTML(appt.professionalName || 'N/A')}</p>
                    </div>
                    <div class="text-right flex flex-col items-end">
                        <span class="text-[10px] sm:text-xs px-2 py-1 rounded-full whitespace-nowrap ${appt.status === 'cancelled' ? 'bg-red-100 text-red-600' : (isPast ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700 font-bold')}">
                            ${appt.status === 'cancelled' ? 'Cancelado' : (isPast ? 'Concluído' : 'Agendado')}
                        </span>
                    </div>
                </div>
            </div>
        `;
    };

    return `
        <div class="space-y-4 pb-10">
            <div class="relative">
                <input type="text" id="history-search-input" 
                    class="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition" 
                    placeholder="Buscar serviço, profissional..." 
                    value="${localState.historySearchTerm}">
                <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>

            <div class="space-y-2">
                ${appointments.length ? appointments.map(renderCard).join('') : '<p class="text-center text-gray-400 py-8 text-sm">Nenhum agendamento encontrado.</p>'}
            </div>
            
            ${appointments.length >= localState.historyLimit ? `
            <div class="text-center pt-2">
                <button id="btn-load-more" class="w-full sm:w-auto text-sm text-indigo-600 font-bold hover:underline py-3 px-4 rounded bg-indigo-50 active:bg-indigo-100">
                    Carregar mais registros...
                </button>
            </div>` : ''}
        </div>
    `;
}

// HTML: Aba Histórico (Comandas)
function renderHistoryTab(client) {
    let sales = localState.historyData.sales || [];
    
    if (localState.historySearchTerm) {
        const term = localState.historySearchTerm.toLowerCase();
        sales = sales.filter(s => 
            s.id.includes(term) || 
            (s.date && new Date(s.date).toLocaleDateString().includes(term))
        );
    }
    
    sales.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (sales.length === 0 && !localState.historySearchTerm) {
        return `
            <div class="text-center py-12">
                <p class="text-gray-400 text-sm">Nenhum registro financeiro encontrado.</p>
            </div>
        `;
    }

    return `
        <div class="space-y-4 pb-10">
            <div class="relative">
                <input type="text" id="history-search-input" 
                    class="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition" 
                    placeholder="Buscar por código ou data..." 
                    value="${localState.historySearchTerm}">
                <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>

            <div class="space-y-3">
                ${sales.map(sale => {
                    const date = new Date(sale.date || sale.createdAt);
                    const total = sale.totalAmount || sale.total || 0;
                    const itemsCount = (sale.items || []).length;
                    
                    return `
                    <div class="history-card bg-white border border-gray-200 rounded-lg p-3 sm:p-4 flex justify-between items-center cursor-pointer transition group active:bg-gray-50"
                         data-go-comanda="true" data-id="${sale.id}">
                        <div class="flex items-center gap-3">
                            <div class="bg-indigo-50 p-2 rounded-lg text-indigo-600 flex-shrink-0">
                                <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                            </div>
                            <div>
                                <p class="font-bold text-gray-800 text-sm sm:text-base">Venda #${sale.id.slice(-4)}</p>
                                <p class="text-xs text-gray-500">${date.toLocaleDateString()} • ${itemsCount} item(s)</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-green-600 text-sm sm:text-base">R$ ${parseFloat(total).toFixed(2)}</p>
                            <span class="text-[10px] text-indigo-500 font-bold opacity-100 sm:opacity-0 group-hover:opacity-100 transition">Detalhes &rarr;</span>
                        </div>
                    </div>
                    `;
                }).join('')}
            </div>
            
            ${sales.length >= localState.historyLimit ? `
            <div class="text-center pt-2">
                <button id="btn-load-more" class="w-full sm:w-auto text-sm text-indigo-600 font-bold hover:underline py-3 px-4 rounded bg-indigo-50 active:bg-indigo-100">
                    Carregar mais...
                </button>
            </div>` : ''}
        </div>
    `;
}

// HTML: Aba Fidelidade (Nova)
function renderLoyaltyTab(client) {
    const log = localState.historyData.loyaltyLog || [];
    log.sort((a, b) => new Date(b.date) - new Date(a.date));

    const historyItems = log.length > 0 ? log.map(entry => {
        const isRedemption = entry.type === 'redemption';
        const icon = isRedemption 
            ? '<svg class="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" /></svg>'
            : '<svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>';
        
        return `
            <div class="flex justify-between items-center bg-white border border-gray-100 p-3 rounded-lg mb-2">
                <div class="flex items-center gap-3">
                    <div class="p-2 rounded-full ${isRedemption ? 'bg-red-50' : 'bg-green-50'}">
                        ${icon}
                    </div>
                    <div>
                        <p class="text-sm font-bold text-gray-800">${escapeHTML(entry.description || (isRedemption ? 'Resgate' : 'Acúmulo'))}</p>
                        <p class="text-xs text-gray-500">${new Date(entry.date).toLocaleDateString()} às ${new Date(entry.date).toLocaleTimeString()}</p>
                    </div>
                </div>
                <div class="text-right">
                    <span class="font-bold ${isRedemption ? 'text-red-600' : 'text-green-600'}">
                        ${isRedemption ? '-' : '+'}${entry.points} pts
                    </span>
                </div>
            </div>
        `;
    }).join('') : '<p class="text-center text-gray-400 py-4 text-sm">Nenhum histórico de pontos.</p>';

    return `
        <div class="space-y-6 pb-10">
            <div class="bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
                <div class="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-4">
                    <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
                <p class="text-amber-100 font-bold uppercase tracking-wider text-xs mb-1">Saldo Atual</p>
                <h1 class="text-4xl font-extrabold flex items-center gap-2">
                    ${client.loyaltyPoints || 0} <span class="text-lg opacity-80 font-normal">pontos</span>
                </h1>
                <div class="mt-4 flex gap-2">
                    <button id="btn-manual-redeem" class="bg-white/20 hover:bg-white/30 text-white text-xs font-bold py-2 px-4 rounded-lg backdrop-blur-sm transition border border-white/30">
                        Resgate Manual / Ajuste
                    </button>
                </div>
            </div>

            <div>
                <h4 class="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wide">Extrato de Pontos</h4>
                <div class="bg-gray-50 rounded-xl p-2 border border-gray-200">
                    ${historyItems}
                </div>
            </div>
        </div>
    `;
}

// --- 4. FUNÇÕES DE DADOS E LÓGICA ---

async function fetchClients() {
    localState.loading = true;
    renderLayout(); 
    try {
        localState.clients = await clientsApi.getClients(state.establishmentId, '');
        renderClientList();
    } catch (error) {
        showNotification('Erro', 'Falha ao carregar clientes.', 'error');
    } finally {
        localState.loading = false;
        renderClientList();
    }
}

async function fetchClientHistory(clientId) {
    const client = localState.selectedClient;
    if (!client || !client.phone) return; 

    localState.historyLoading = true;
    
    if(document.getElementById('clients-content-area').querySelector('.tab-btn')) {
        const spinner = document.createElement('div');
        spinner.className = 'absolute inset-0 bg-white/70 flex items-start justify-center pt-20 z-50 transition-opacity duration-300';
        spinner.innerHTML = '<div class="loader"></div>';
        const area = document.querySelector('.animate-fade-in');
        if(area) area.appendChild(spinner);
    }

    try {
        const end = new Date();
        end.setMonth(end.getMonth() + 12); 
        const start = new Date();
        start.setFullYear(start.getFullYear() - 5); 

        // --- CORREÇÃO: Usar authenticatedFetch para passar o token corretamente ---
        let url = `/api/appointments/${state.establishmentId}?startDate=${start.toISOString()}&endDate=${end.toISOString()}`;
        url += `&clientPhone=${encodeURIComponent(client.phone)}`;
        url += `&limit=${localState.historyLimit}`;

        // Substituindo o fetch manual pelo authenticatedFetch que injeta o cabeçalho Authorization
        const clientAppts = await authenticatedFetch(url);
        
        localState.historyData.appointments = clientAppts;

        // Histórico de Vendas (Filtrar Completed)
        localState.historyData.sales = clientAppts
            .filter(a => a.status === 'completed')
            .map(a => ({
                 id: a.id,
                 date: a.startTime,
                 totalAmount: a.totalAmount || 0,
                 items: a.services || []
             }));

        // --- Gerar Histórico de Fidelidade (Deduzido dos agendamentos) ---
        const loyaltyLog = [];
        
        clientAppts.forEach(appt => {
            // Ganho de pontos (Vendas finalizadas)
            if (appt.status === 'completed' && appt.loyaltyPointsEarned > 0) {
                loyaltyLog.push({
                    type: 'earn',
                    points: appt.loyaltyPointsEarned,
                    date: appt.startTime,
                    description: 'Venda finalizada'
                });
            }
            
            // Uso de pontos (Resgates na comanda)
            if (appt.loyaltyRedemption) {
                loyaltyLog.push({
                    type: 'redemption',
                    points: appt.loyaltyRedemption.cost || 0,
                    date: appt.startTime,
                    description: `Resgate: ${appt.loyaltyRedemption.name}`
                });
            }
        });
        
        localState.historyData.loyaltyLog = loyaltyLog;

    } catch (e) {
        console.error("Erro ao buscar histórico otimizado", e);
        showNotification('Aviso', 'Não foi possível carregar o histórico completo. Verifique sua conexão.', 'warning');
    } finally {
        localState.historyLoading = false;
        renderClientDetails();
    }
}

// Modal para Resgate Manual / Ajuste de Pontos (Deduz pontos do saldo)
function openManualRedemptionModal(client) {
    const currentPoints = client.loyaltyPoints || 0;
    
    const contentHTML = `
        <div class="text-center mb-6">
            <p class="text-sm text-gray-500">Saldo Atual</p>
            <h2 class="text-3xl font-bold text-gray-800">${currentPoints} pts</h2>
        </div>
        <form id="manual-redeem-form" class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700">Ação</label>
                <select id="redeem-action" class="w-full p-2 border rounded-lg bg-gray-50">
                    <option value="debit">Debitar Pontos (Resgate)</option>
                    <option value="credit">Adicionar Pontos (Ajuste)</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Quantidade de Pontos</label>
                <input type="number" id="redeem-points" min="1" required class="w-full p-2 border rounded-lg text-lg font-bold" placeholder="0">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Motivo / Descrição</label>
                <input type="text" id="redeem-reason" required class="w-full p-2 border rounded-lg" placeholder="Ex: Resgate de brinde balcão">
            </div>
            <div class="pt-4 border-t flex justify-end">
                <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700">Confirmar</button>
            </div>
        </form>
    `;

    const { modalElement, close } = showGenericModal({ title: "Ajuste Manual de Pontos", contentHTML: contentHTML, maxWidth: 'max-w-sm' });

    modalElement.querySelector('form').onsubmit = async (e) => {
        e.preventDefault();
        const action = document.getElementById('redeem-action').value;
        const pointsInput = parseInt(document.getElementById('redeem-points').value, 10);
        const reason = document.getElementById('redeem-reason').value;

        if (!pointsInput || pointsInput <= 0) return showNotification('Erro', 'Insira uma quantidade válida.', 'error');
        if (action === 'debit' && pointsInput > currentPoints) return showNotification('Erro', 'Saldo insuficiente.', 'error');

        try {
            let newBalance = currentPoints;
            
            if (action === 'debit') {
                // Chama API de resgate para garantir registro no backend se existir log lá
                // Deduz pontos do saldo do cliente
                await clientsApi.redeemReward(state.establishmentId, client.phone, pointsInput, reason);
                newBalance -= pointsInput;
            } else {
                // Crédito manual (Ajuste) - Atualiza cliente direto
                newBalance += pointsInput;
                await clientsApi.updateClient(client.id, { loyaltyPoints: newBalance });
            }

            // Atualiza estado local imediatamente para refletir na UI sem recarregar
            localState.selectedClient.loyaltyPoints = newBalance;
            
            // Adiciona ao log local temporariamente para feedback visual imediato
            localState.historyData.loyaltyLog.unshift({
                type: action === 'debit' ? 'redemption' : 'earn',
                points: pointsInput,
                date: new Date().toISOString(),
                description: reason + ' (Manual)'
            });

            showNotification('Sucesso', 'Saldo de pontos atualizado.', 'success');
            close();
            renderClientDetails(); // Re-renderiza para mostrar novo saldo

        } catch (error) {
            showNotification('Erro', 'Falha ao atualizar pontos: ' + error.message, 'error');
        }
    };
}

function selectClient(id) {
    localState.selectedClient = localState.clients.find(c => c.id === id);
    localState.activeTab = 'profile'; 
    localState.historyLimit = 20; 
    localState.historySearchTerm = ''; 
    
    // Limpa dados de histórico ao selecionar novo cliente para evitar flash de dados antigos
    localState.historyData = { appointments: [], sales: [], loyaltyLog: [] };
    
    renderClientDetails();
}

function openNewClientModal() {
    const content = `
        <form id="modal-new-client-form" class="space-y-4">
            <div><label class="block text-sm font-medium text-gray-700">Nome *</label><input type="text" id="new-name" required class="w-full border p-3 rounded-lg mt-1 text-base"></div>
            <div><label class="block text-sm font-medium text-gray-700">Telefone *</label><input type="tel" id="new-phone" required class="w-full border p-3 rounded-lg mt-1 text-base"></div>
            <div class="flex justify-end pt-4">
                <button type="submit" class="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-indigo-700">Salvar</button>
            </div>
        </form>
    `;
    const { modalElement, close } = showGenericModal({ title: "Novo Cliente", contentHTML: content });
    
    modalElement.querySelector('form').onsubmit = async (e) => {
        e.preventDefault();
        const name = document.getElementById('new-name').value;
        const phone = document.getElementById('new-phone').value;
        
        try {
            const newClient = await clientsApi.createClient({ establishmentId: state.establishmentId, name, phone });
            localState.clients.unshift(newClient); 
            showNotification('Sucesso', 'Cliente criado!', 'success');
            close();
            selectClient(newClient.id);
        } catch (err) {
            showNotification('Erro', err.message, 'error');
        }
    };
}

async function handleSaveClient(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
        await clientsApi.updateClient(localState.selectedClient.id, data);
        Object.assign(localState.selectedClient, data);
        const idx = localState.clients.findIndex(c => c.id === localState.selectedClient.id);
        if (idx !== -1) localState.clients[idx] = localState.selectedClient;
        showNotification('Sucesso', 'Dados atualizados!', 'success');
    } catch (err) {
        showNotification('Erro', 'Falha ao salvar: ' + err.message, 'error');
    }
}

async function handleDeleteClient() {
    if (!await showConfirmation('Excluir Cliente', 'Tem certeza? Todo o histórico será perdido.')) return;
    try {
        await clientsApi.deleteClient(localState.selectedClient.id);
        localState.clients = localState.clients.filter(c => c.id !== localState.selectedClient.id);
        localState.selectedClient = null;
        showNotification('Sucesso', 'Cliente removido.', 'success');
        renderClientList();
    } catch (err) {
        showNotification('Erro', err.message, 'error');
    }
}

export async function loadClientsPage() {
    contentDiv = document.getElementById('content');
    localState.selectedClient = null;
    localState.searchTerm = '';
    localState.historyLimit = 20;
    
    renderLayout(); 
    await fetchClients(); 
}