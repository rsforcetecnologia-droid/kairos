// js/ui/clients.js

// --- 1. IMPORTAÇÕES ---
import * as clientsApi from '../api/clients.js';
import * as appointmentsApi from '../api/appointments.js';
import * as salesApi from '../api/sales.js'; // Assumindo que existe para buscar histórico
import { showNotification, showConfirmation, showGenericModal } from '../components/modal.js';
import { navigateTo } from '../main.js';
import { escapeHTML, formatDate, formatCurrency } from '../utils.js'; // Funções utilitárias comuns
import { state } from '../state.js';

// --- 2. ESTADO LOCAL ---
let localState = {
    clients: [],
    selectedClient: null,
    activeTab: 'profile', // 'profile', 'appointments', 'history'
    searchTerm: '',
    loading: false,
    historyData: {
        appointments: [],
        sales: []
    }
};

let contentDiv = null;

// --- 3. FUNÇÕES PRINCIPAIS DE RENDERIZAÇÃO ---

// Layout Base
function renderLayout() {
    contentDiv.innerHTML = `
        <section class="h-full flex flex-col bg-gray-50">
            <div class="p-4 bg-white border-b shadow-sm flex justify-between items-center sticky top-0 z-10">
                <div>
                    <h2 class="text-2xl font-bold text-gray-800">Gestão de Clientes</h2>
                    <p class="text-xs text-gray-500">Gerencie perfis, histórico e agendamentos</p>
                </div>
                ${!localState.selectedClient ? `
                <button id="btn-new-client" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow flex items-center gap-2 text-sm font-bold">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                    Novo Cliente
                </button>` : `
                <button id="btn-back-list" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition border border-gray-300 flex items-center gap-2 text-sm font-bold">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Voltar
                </button>
                `}
            </div>

            <div id="clients-content-area" class="flex-grow overflow-y-auto p-4 custom-scrollbar">
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
    // Atualiza o botão de voltar/novo no header
    renderLayout(); 
    
    const container = document.getElementById('clients-content-area');
    
    // Filtragem local
    const filtered = localState.clients.filter(c => 
        c.name.toLowerCase().includes(localState.searchTerm.toLowerCase()) ||
        (c.phone && c.phone.includes(localState.searchTerm))
    );

    const searchHTML = `
        <div class="mb-6 max-w-2xl mx-auto">
            <div class="relative">
                <input type="text" id="client-search" 
                    class="w-full p-4 pl-12 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition" 
                    placeholder="Buscar por nome ou telefone..." 
                    value="${localState.searchTerm}">
                <svg class="w-6 h-6 text-gray-400 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
        </div>
    `;

    const listHTML = filtered.length > 0 ? `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            ${filtered.map(client => `
                <div class="client-card bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer group relative overflow-hidden" data-id="${client.id}">
                    <div class="absolute top-0 left-0 w-1 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition"></div>
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
                            ${client.name.charAt(0).toUpperCase()}
                        </div>
                        <div class="flex-grow min-w-0">
                            <h3 class="font-bold text-gray-800 truncate text-lg">${escapeHTML(client.name)}</h3>
                            <p class="text-sm text-gray-500 flex items-center gap-1">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                ${client.phone || 'Sem telefone'}
                            </p>
                        </div>
                        <div class="text-right">
                            <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">Ver</span>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    ` : `
        <div class="text-center py-20 opacity-50">
            <svg class="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            <p class="text-xl font-medium text-gray-600">Nenhum cliente encontrado</p>
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
        // Debounce simples visual (re-renderiza a lista filtrada)
        renderClientList(); 
    });

    container.querySelectorAll('.client-card').forEach(card => {
        card.onclick = () => selectClient(card.dataset.id);
    });
}

// Renderiza a Ficha do Cliente (Detalhes)
async function renderClientDetails() {
    renderLayout(); // Recria header com botão voltar
    const container = document.getElementById('clients-content-area');
    const client = localState.selectedClient;

    if (!client) return renderClientList();

    // Carregar dados de histórico se ainda não carregou para este cliente
    if (localState.activeTab !== 'profile') {
        await fetchClientHistory(client.id);
    }

    const tabsHTML = `
        <div class="flex gap-2 mb-6 border-b overflow-x-auto pb-1">
            <button class="tab-btn ${localState.activeTab === 'profile' ? 'active-tab' : ''}" data-tab="profile">
                👤 Perfil
            </button>
            <button class="tab-btn ${localState.activeTab === 'appointments' ? 'active-tab' : ''}" data-tab="appointments">
                📅 Agendamentos
            </button>
            <button class="tab-btn ${localState.activeTab === 'history' ? 'active-tab' : ''}" data-tab="history">
                💰 Histórico / Comandas
            </button>
        </div>
    `;

    let contentHTML = '';

    // Lógica das Abas
    if (localState.activeTab === 'profile') {
        contentHTML = renderProfileTab(client);
    } else if (localState.activeTab === 'appointments') {
        contentHTML = renderAppointmentsTab(client);
    } else if (localState.activeTab === 'history') {
        contentHTML = renderHistoryTab(client);
    }

    container.innerHTML = `
        <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div class="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                <div class="flex flex-col md:flex-row items-center gap-4">
                    <div class="w-20 h-20 rounded-full bg-white text-indigo-600 flex items-center justify-center text-3xl font-bold shadow-lg">
                        ${client.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="text-center md:text-left">
                        <h2 class="text-2xl font-bold">${escapeHTML(client.name)}</h2>
                        <p class="opacity-90 text-sm">${client.phone || 'Sem telefone'}</p>
                        ${client.email ? `<p class="opacity-75 text-xs">${client.email}</p>` : ''}
                    </div>
                    <div class="md:ml-auto flex gap-2">
                        </div>
                </div>
            </div>

            <div class="p-6">
                ${tabsHTML}
                <div class="animate-fade-in">
                    ${contentHTML}
                </div>
            </div>
        </div>
    `;

    // Estilos das abas e listeners
    const style = document.createElement('style');
    style.textContent = `
        .tab-btn { padding: 0.75rem 1.5rem; font-weight: 600; color: #6b7280; border-bottom: 3px solid transparent; transition: all 0.3s; white-space: nowrap; }
        .tab-btn:hover { color: #4f46e5; background-color: #f9fafb; border-radius: 0.5rem 0.5rem 0 0; }
        .active-tab { color: #4f46e5; border-bottom-color: #4f46e5; }
        .history-card:hover { transform: translateY(-2px); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
    `;
    container.appendChild(style);

    container.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => {
            localState.activeTab = btn.dataset.tab;
            renderClientDetails();
        };
    });

    // Listeners do Formulário de Perfil
    if (localState.activeTab === 'profile') {
        document.getElementById('form-edit-client').onsubmit = handleSaveClient;
        document.getElementById('btn-delete-client').onclick = handleDeleteClient;
    }

    // Listeners de Navegação (Cards)
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
        <form id="form-edit-client" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input type="text" name="name" value="${escapeHTML(client.name)}" required class="mt-1 block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Telefone</label>
                    <input type="tel" name="phone" value="${escapeHTML(client.phone || '')}" class="mt-1 block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">E-mail</label>
                    <input type="email" name="email" value="${escapeHTML(client.email || '')}" class="mt-1 block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition">
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Aniversário (Dia)</label>
                        <input type="number" name="dobDay" min="1" max="31" value="${client.dobDay || ''}" class="mt-1 block w-full p-3 rounded-lg border border-gray-300">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Mês</label>
                        <input type="number" name="dobMonth" min="1" max="12" value="${client.dobMonth || ''}" class="mt-1 block w-full p-3 rounded-lg border border-gray-300">
                    </div>
                </div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Observações</label>
                <textarea name="notes" rows="3" class="mt-1 block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition">${escapeHTML(client.notes || '')}</textarea>
            </div>
            
            <div class="pt-4 flex justify-between items-center border-t mt-4">
                <button type="button" id="btn-delete-client" class="text-red-500 hover:text-red-700 text-sm font-bold flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    Excluir Cliente
                </button>
                <button type="submit" class="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-indigo-700 transition transform hover:-translate-y-0.5">
                    Salvar Alterações
                </button>
            </div>
        </form>
    `;
}

// HTML: Aba Agendamentos (Link para Agenda)
function renderAppointmentsTab(client) {
    const appointments = localState.historyData.appointments || [];
    
    // Filtra futuros e passados
    const now = new Date();
    const future = appointments.filter(a => new Date(a.startTime) >= now).sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    const past = appointments.filter(a => new Date(a.startTime) < now).sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

    const renderCard = (appt, isPast) => {
        const date = new Date(appt.startTime);
        const dateStr = date.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'long' });
        const timeStr = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        return `
            <div class="history-card bg-white border border-gray-200 rounded-lg p-4 mb-3 transition-all cursor-pointer relative overflow-hidden group"
                 data-go-agenda="true" data-id="${appt.id}" data-date="${appt.startTime}">
                <div class="absolute left-0 top-0 bottom-0 w-1 ${isPast ? 'bg-gray-400' : 'bg-green-500'}"></div>
                <div class="flex justify-between items-start">
                    <div>
                        <p class="font-bold text-gray-800 flex items-center gap-2">
                            ${dateStr} <span class="text-sm font-normal text-gray-500">às ${timeStr}</span>
                        </p>
                        <p class="text-sm text-gray-600 mt-1 font-medium">${escapeHTML(appt.serviceName || 'Serviço')}</p>
                        <p class="text-xs text-gray-500">Profissional: ${escapeHTML(appt.professionalName || 'N/A')}</p>
                    </div>
                    <div class="text-right">
                        <span class="text-xs px-2 py-1 rounded-full ${isPast ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700 font-bold'}">
                            ${isPast ? 'Concluído' : 'Agendado'}
                        </span>
                        <div class="mt-2 text-indigo-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition flex items-center justify-end gap-1">
                            Ver na Agenda <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    return `
        <div class="space-y-6">
            <div>
                <h4 class="font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-green-500"></span> Próximos
                </h4>
                ${future.length ? future.map(a => renderCard(a, false)).join('') : '<p class="text-sm text-gray-400 italic bg-gray-50 p-3 rounded">Nenhum agendamento futuro.</p>'}
            </div>
            
            <div>
                <h4 class="font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-gray-400"></span> Histórico Recente
                </h4>
                ${past.length ? past.slice(0, 5).map(a => renderCard(a, true)).join('') : '<p class="text-sm text-gray-400 italic bg-gray-50 p-3 rounded">Nenhum histórico.</p>'}
            </div>
        </div>
    `;
}

// HTML: Aba Histórico (Link para Comanda)
function renderHistoryTab(client) {
    // Aqui usamos os dados de vendas/comandas finalizadas
    // Se a API de sales retornar appointments finalizados, usamos eles.
    // Se não, tentamos pegar de salesApi (dependendo da estrutura do seu backend)
    
    // Assumindo que salesApi retorna o histórico financeiro:
    const sales = localState.historyData.sales || [];
    
    if (sales.length === 0) {
        return `
            <div class="text-center py-10">
                <p class="text-gray-400">Nenhum registro financeiro encontrado.</p>
            </div>
        `;
    }

    return `
        <div class="space-y-3">
            ${sales.map(sale => {
                const date = new Date(sale.date || sale.createdAt); // Ajuste conforme seu modelo de dados
                const total = sale.totalAmount || sale.total || 0;
                const itemsCount = (sale.items || []).length;
                
                return `
                <div class="history-card bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center cursor-pointer transition group"
                     data-go-comanda="true" data-id="${sale.id}">
                    <div class="flex items-center gap-3">
                        <div class="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                        </div>
                        <div>
                            <p class="font-bold text-gray-800">Venda #${sale.id.slice(-4)}</p>
                            <p class="text-xs text-gray-500">${date.toLocaleDateString()} • ${itemsCount} iten(s)</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="font-bold text-green-600">R$ ${parseFloat(total).toFixed(2)}</p>
                        <span class="text-[10px] text-indigo-500 font-bold opacity-0 group-hover:opacity-100 transition">Ver Detalhes &rarr;</span>
                    </div>
                </div>
                `;
            }).join('')}
        </div>
    `;
}

// --- 4. FUNÇÕES DE DADOS E LÓGICA ---

async function fetchClients() {
    localState.loading = true;
    renderLayout(); // Mostra loader
    try {
        // Carrega todos (ou paginado se preferir, aqui simplificado)
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
    try {
        // 1. Busca agendamentos (Agenda)
        // Precisamos de uma rota que busque pelo clientId. 
        // Se appointmentsApi.getAppointmentsByDateRange for a única opção, teríamos que filtrar no front, o que é pesado.
        // Assumindo que existe ou criando uma lógica para buscar histórico específico:
        
        // *TENTATIVA DE BUSCA OTIMIZADA*: 
        // Se a API permitir busca por cliente, ótimo. Se não, listamos um range grande (ex: 3 meses).
        // Para simplificar e não quebrar, vou assumir que existe um endpoint ou filtraremos de uma lista global se disponível.
        // No contexto atual do projeto, appointmentsApi geralmente filtra por data.
        // Vamos simular/adaptar:
        
        const now = new Date();
        const start = new Date(); start.setMonth(start.getMonth() - 6); // 6 meses atrás
        const end = new Date(); end.setMonth(end.getMonth() + 6); // 6 meses frente
        
        const allAppts = await appointmentsApi.getAppointmentsByDateRange(
            state.establishmentId, 
            start.toISOString(), 
            end.toISOString()
        );
        
        // Filtra pelo cliente selecionado (nome ou telefone, já que ID as vezes varia em sistemas legados, mas o ideal é ID)
        const client = localState.selectedClient;
        const clientAppts = allAppts.filter(a => 
            (a.clientId && a.clientId === client.id) || 
            (a.clientPhone === client.phone) ||
            (a.clientName.toLowerCase() === client.name.toLowerCase())
        );
        
        localState.historyData.appointments = clientAppts;

        // 2. Busca Vendas (Comandas)
        // Idealmente salesApi.getSalesByClient(clientId).
        // Se não existir, deixamos vazio por segurança ou tentamos buscar vendas gerais.
        if (salesApi.getSalesByClient) {
             localState.historyData.sales = await salesApi.getSalesByClient(client.id);
        } else {
             // Fallback: filtra os agendamentos que estão 'completed' e trata como venda
             localState.historyData.sales = clientAppts.filter(a => a.status === 'completed').map(a => ({
                 id: a.id,
                 date: a.startTime,
                 totalAmount: a.totalAmount || 0,
                 items: a.services || []
             }));
        }

    } catch (e) {
        console.error("Erro ao buscar histórico", e);
    }
}

function selectClient(id) {
    localState.selectedClient = localState.clients.find(c => c.id === id);
    localState.activeTab = 'profile'; // Reset tab
    renderClientDetails();
}

// Modal Novo Cliente
function openNewClientModal() {
    const content = `
        <form id="modal-new-client-form" class="space-y-4">
            <div><label>Nome *</label><input type="text" id="new-name" required class="w-full border p-2 rounded"></div>
            <div><label>Telefone *</label><input type="tel" id="new-phone" required class="w-full border p-2 rounded"></div>
            <div class="flex justify-end pt-4">
                <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded font-bold">Salvar</button>
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
            localState.clients.unshift(newClient); // Adiciona ao topo
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
        
        // Atualiza estado local
        Object.assign(localState.selectedClient, data);
        
        // Atualiza na lista principal
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

// --- 5. EXPORTAÇÃO ---
export async function loadClientsPage() {
    contentDiv = document.getElementById('content');
    localState.selectedClient = null;
    localState.searchTerm = '';
    
    renderLayout(); // Estrutura inicial
    await fetchClients(); // Busca dados
}