// js/ui/clients.js

import * as clientsApi from '../api/clients.js';
import * as establishmentApi from '../api/establishments.js';
import { state } from '../state.js';
import { showNotification, showGenericModal, showConfirmation } from '../components/modal.js';
import { navigateTo } from '../main.js';

// --- ESTADO LOCAL ---
let localState = {
    clients: [],
    establishment: null,
    searchTimeout: null,
    currentClient: null, // Cliente aberto no modal
    history: [] // Histórico do cliente aberto
};

// --- FUNÇÕES AUXILIARES DE FORMATAÇÃO ---
const formatPhone = (val) => {
    if (!val) return '';
    const v = val.replace(/\D/g, '');
    if (v.length > 10) return v.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3');
    return v.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3');
};

const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0);
};

const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    // Correção: Garantir que datas ISO sejam lidas corretamente
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
};

// --- COMPONENTE: MODAL DE CLIENTE ---

const openClientModal = async (client = null) => {
    localState.currentClient = client;
    const isNew = !client;

    // Estrutura do Modal
    const modalContent = `
        <div class="h-[80vh] flex flex-col bg-gray-50 rounded-lg overflow-hidden">
            <div class="bg-white border-b px-6 py-4 flex justify-between items-center shrink-0">
                <div>
                    <h2 class="text-xl font-bold text-gray-800">${isNew ? 'Novo Cliente' : client.name}</h2>
                    ${!isNew ? `<p class="text-sm text-gray-500">${formatPhone(client.phone)}</p>` : ''}
                </div>
                ${!isNew ? `
                <div class="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">
                    ${client.loyaltyPoints || 0} pts
                </div>` : ''}
            </div>

            <div class="flex bg-white border-b shrink-0 overflow-x-auto">
                <button onclick="window.switchTab('details')" id="tab-btn-details" class="flex-1 py-3 px-4 text-sm font-medium border-b-2 border-indigo-600 text-indigo-600 transition-colors whitespace-nowrap">Cadastro</button>
                ${!isNew ? `
                <button onclick="window.switchTab('appointments')" id="tab-btn-appointments" class="flex-1 py-3 px-4 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-indigo-600 transition-colors whitespace-nowrap">Agendamentos</button>
                <button onclick="window.switchTab('history')" id="tab-btn-history" class="flex-1 py-3 px-4 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-indigo-600 transition-colors whitespace-nowrap">Histórico</button>
                <button onclick="window.switchTab('loyalty')" id="tab-btn-loyalty" class="flex-1 py-3 px-4 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-indigo-600 transition-colors whitespace-nowrap">Fidelidade</button>
                ` : ''}
            </div>

            <div id="modal-body" class="flex-1 overflow-y-auto p-6 relative">
                <div class="loader mx-auto mt-10"></div>
            </div>

            <div class="bg-white border-t p-4 flex justify-between shrink-0">
                ${!isNew ? `<button onclick="window.handleDelete()" class="text-red-500 hover:bg-red-50 px-4 py-2 rounded text-sm font-medium">Excluir</button>` : '<div></div>'}
                <div class="flex gap-2">
                    <button onclick="document.getElementById('genericModal').style.display='none'" class="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50">Cancelar</button>
                    <button onclick="window.handleSave()" class="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 font-medium">Salvar</button>
                </div>
            </div>
        </div>
    `;

    // CORREÇÃO: Passar string vazia no title para não aparecer "null"
    showGenericModal({ title: '', contentHTML: modalContent, maxWidth: 'max-w-3xl' });
    
    // Configura Tabs globais para acesso via onclick string
    window.switchTab = (tabName) => renderTab(tabName, isNew);
    window.handleSave = submitSave;
    window.handleDelete = submitDelete;

    // Se não for novo, carrega dados. Se for novo, renderiza direto.
    if (!isNew) {
        try {
            // Busca histórico em background
            localState.history = await clientsApi.getFullHistory(state.establishmentId, client.phone);
        } catch (e) {
            console.error("Erro ao carregar histórico", e);
            localState.history = [];
        }
    }
    
    // Renderiza a primeira aba (Cadastro)
    renderTab('details', isNew);
};

const renderTab = (tabName, isNew) => {
    const container = document.getElementById('modal-body');
    if (!container) return;

    // Atualiza estilo dos botões (Aba Ativa)
    document.querySelectorAll('[id^="tab-btn-"]').forEach(btn => {
        btn.classList.remove('border-indigo-600', 'text-indigo-600');
        btn.classList.add('border-transparent', 'text-gray-500');
    });
    const activeBtn = document.getElementById(`tab-btn-${tabName}`);
    if (activeBtn) {
        activeBtn.classList.add('border-indigo-600', 'text-indigo-600');
        activeBtn.classList.remove('border-transparent', 'text-gray-500');
    }

    const c = localState.currentClient || {};

    // --- ABA: CADASTRO ---
    if (tabName === 'details') {
        container.innerHTML = `
            <form id="form-client" class="space-y-4 max-w-lg mx-auto">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                    <input type="text" name="name" value="${c.name || ''}" class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Telefone (WhatsApp)</label>
                    <input type="tel" name="phone" id="input-phone" value="${formatPhone(c.phone)}" 
                        ${!isNew ? 'disabled class="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed"' : 'class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none"'} 
                        placeholder="(00) 00000-0000" required>
                    ${!isNew ? '<p class="text-xs text-gray-400 mt-1">O telefone é o ID e não pode ser alterado.</p>' : ''}
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">E-mail (Opcional)</label>
                    <input type="email" name="email" value="${c.email || ''}" class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento (Opcional)</label>
                    <input type="date" name="birthDate" value="${c.birthDate || ''}" class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Anotações</label>
                    <textarea name="notes" rows="3" class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none">${c.notes || ''}</textarea>
                </div>
            </form>
        `;
        
        // Máscara simples para novos clientes
        if(isNew) {
            const phoneInput = document.getElementById('input-phone');
            if(phoneInput) phoneInput.oninput = (e) => e.target.value = formatPhone(e.target.value);
        }

    // --- ABA: AGENDAMENTOS FUTUROS (CORREÇÃO: Navegação com scrollToAppointmentId) ---
    } else if (tabName === 'appointments') {
        const now = new Date();
        
        // Filtra: Tipo Agendamento + Data no Futuro + Não Cancelado
        const upcoming = localState.history.filter(h => {
            const hDate = new Date(h.date);
            return h.type === 'appointment' && hDate >= now && h.status !== 'cancelled';
        });

        // Ordena: Mais próximo primeiro (Ascendente)
        upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));

        if (!upcoming.length) {
            container.innerHTML = `<div class="text-center py-10">
                <p class="text-gray-400 mb-4">Nenhum agendamento futuro.</p>
                <button onclick="document.getElementById('genericModal').style.display='none'; navigateTo('agenda-section')" class="text-indigo-600 font-bold hover:underline">Ir para Agenda</button>
            </div>`;
            return;
        }

        container.innerHTML = `
            <div class="space-y-3">
                ${upcoming.map(h => `
                    <div class="flex items-center justify-between p-4 border-l-4 border-indigo-500 bg-white shadow-sm rounded-r-lg hover:shadow-md transition-shadow">
                        <div>
                            <p class="font-bold text-gray-800">${h.description}</p>
                            <p class="text-sm text-gray-600 mt-1">
                                📅 ${formatDate(h.date)}
                            </p>
                            <span class="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded mt-2 inline-block">Agendado</span>
                        </div>
                        
                        <button onclick="
                            document.getElementById('genericModal').style.display='none'; 
                            navigateTo('agenda-section', { 
                                targetDate: '${h.date}', 
                                scrollToAppointmentId: '${h.id}' 
                            })
                        " class="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors group" title="Ver na Agenda">
                            <svg class="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 12h14"/>
                            </svg>
                        </button>
                    </div>
                `).join('')}
            </div>
        `;

    // --- ABA: HISTÓRICO GERAL ---
    } else if (tabName === 'history') {
        // Mostra tudo que já passou ou foi finalizado
        const past = localState.history; 

        if (!past.length) {
            container.innerHTML = `<div class="text-center text-gray-400 mt-10">Histórico vazio.</div>`;
            return;
        }
        
        container.innerHTML = `
            <div class="space-y-3">
                ${past.map(h => `
                    <div class="flex items-center justify-between p-3 border rounded bg-white hover:bg-gray-50">
                        <div class="flex items-center gap-3">
                            <div class="p-2 rounded-full ${h.type === 'sale' ? 'bg-green-100 text-green-600' : (h.type === 'loyalty' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600')}">
                                <span class="text-xs font-bold uppercase">${h.type.substring(0,1)}</span>
                            </div>
                            <div>
                                <p class="text-sm font-bold text-gray-800">${h.description}</p>
                                <p class="text-xs text-gray-500">${formatDate(h.date)} • ${h.status}</p>
                            </div>
                        </div>
                        <span class="text-sm font-bold ${h.isPoints ? 'text-purple-600' : 'text-gray-700'}">
                            ${h.isPoints ? (h.value > 0 ? `+${h.value} pts` : `${h.value} pts`) : formatCurrency(h.value)}
                        </span>
                    </div>
                `).join('')}
            </div>
        `;

    // --- ABA: FIDELIDADE ---
    } else if (tabName === 'loyalty') {
        const program = localState.establishment.loyaltyProgram;
        if (!program || !program.enabled) {
            container.innerHTML = `<div class="text-center text-gray-400 mt-10">Programa de fidelidade não ativo neste estabelecimento.</div>`;
            return;
        }

        const currentPoints = c.loyaltyPoints || 0;

        container.innerHTML = `
            <div class="text-center mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
                <p class="text-xs uppercase tracking-widest opacity-80">Saldo Atual</p>
                <h3 class="text-5xl font-extrabold mt-2">${currentPoints}</h3>
                <p class="text-sm opacity-80">Pontos</p>
            </div>

            <h4 class="font-bold text-gray-700 mb-3 text-sm uppercase">Prêmios Disponíveis</h4>
            <div class="space-y-2">
                ${(program.tiers || []).map(tier => {
                    const canRedeem = currentPoints >= tier.points;
                    return `
                        <div class="flex justify-between items-center p-3 border rounded ${canRedeem ? 'bg-green-50 border-green-200' : 'bg-gray-50 opacity-70'}">
                            <div>
                                <p class="font-bold text-gray-800">${tier.reward}</p>
                                <p class="text-xs text-gray-500">${tier.points} pontos necessários</p>
                            </div>
                            <button onclick="window.handleRedeem('${tier.points}', '${tier.reward}')" ${!canRedeem ? 'disabled' : ''} 
                                class="px-3 py-1 rounded text-xs font-bold ${canRedeem ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}">
                                Resgatar
                            </button>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
        
        window.handleRedeem = async (points, rewardName) => {
            if (await showConfirmation('Resgatar', `Trocar ${points} pontos por "${rewardName}"?`)) {
                try {
                    await clientsApi.redeemReward(state.establishmentId, c.phone, points, rewardName);
                    showNotification('Sucesso', 'Resgate realizado!', 'success');
                    
                    // Atualiza localmente
                    c.loyaltyPoints = (c.loyaltyPoints || 0) - parseInt(points);
                    localState.history.unshift({ type: 'loyalty', description: `Resgate: ${rewardName}`, date: new Date().toISOString(), value: -points, isPoints: true, status: 'completed' });
                    
                    renderTab('loyalty', false); // Re-renderiza para atualizar saldo e botões
                } catch (e) {
                    showNotification('Erro', e.message || 'Erro ao resgatar', 'error');
                }
            }
        };
    }
};

// --- AÇÕES DO FORMULÁRIO ---

const submitSave = async () => {
    const form = document.getElementById('form-client');
    const formData = new FormData(form);
    
    const rawPhone = formData.get('phone').replace(/\D/g, '');
    
    if (rawPhone.length < 10) {
        showNotification('Erro', 'Telefone inválido', 'error');
        return;
    }

    const payload = {
        name: formData.get('name'),
        phone: rawPhone,
        email: formData.get('email'),
        birthDate: formData.get('birthDate'),
        notes: formData.get('notes'),
        establishmentId: state.establishmentId
    };

    try {
        await clientsApi.saveClient(payload);
        showNotification('Sucesso', 'Cliente salvo!', 'success');
        document.getElementById('genericModal').style.display = 'none';
        refreshList();
    } catch (e) {
        showNotification('Erro', 'Erro ao salvar cliente', 'error');
        console.error(e);
    }
};

const submitDelete = async () => {
    if (await showConfirmation('Excluir', 'Tem certeza? Isso apagará o histórico deste cliente.')) {
        try {
            await clientsApi.deleteClient(localState.currentClient.phone);
            showNotification('Sucesso', 'Cliente removido', 'success');
            document.getElementById('genericModal').style.display = 'none';
            refreshList();
        } catch (e) {
            showNotification('Erro', 'Erro ao remover', 'error');
        }
    }
};

// --- LISTAGEM PRINCIPAL ---

const renderList = () => {
    const container = document.getElementById('clients-grid');
    if (!container) return;

    container.innerHTML = '';

    if (localState.clients.length === 0) {
        container.innerHTML = `
            <div class="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
                <svg class="w-16 h-16 mb-4 opacity-20" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>
                <p class="text-lg">Nenhum cliente encontrado.</p>
                <button onclick="window.openNewClient()" class="mt-4 text-indigo-600 font-bold hover:underline">Cadastrar novo</button>
            </div>
        `;
        return;
    }

    localState.clients.forEach(client => {
        const card = document.createElement('div');
        card.className = "bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group";
        card.onclick = () => openClientModal(client);

        card.innerHTML = `
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow">
                    ${client.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h3 class="font-bold text-gray-800 text-sm md:text-base group-hover:text-indigo-600 transition-colors">${client.name}</h3>
                    <p class="text-xs text-gray-500">${formatPhone(client.phone)}</p>
                </div>
            </div>
            <div class="text-right">
                <span class="block text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
                    ${client.loyaltyPoints || 0} pts
                </span>
            </div>
        `;
        container.appendChild(card);
    });
};

const refreshList = async (searchTerm = '') => {
    const container = document.getElementById('clients-grid');
    if (container) container.innerHTML = '<div class="col-span-full flex justify-center py-10"><div class="loader"></div></div>';

    try {
        localState.clients = await clientsApi.getClients(state.establishmentId, searchTerm);
        renderList();
    } catch (e) {
        console.error(e);
        if (container) container.innerHTML = '<p class="col-span-full text-center text-red-500">Erro ao carregar lista.</p>';
    }
};

// --- INICIALIZAÇÃO ---

export const loadClientsPage = async () => {
    const contentDiv = document.getElementById('content');
    
    // Setup da estrutura base da página
    contentDiv.innerHTML = `
        <div class="flex flex-col h-full bg-gray-50">
            <header class="bg-white border-b px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-10">
                <h1 class="text-2xl font-bold text-gray-800">Clientes</h1>
                
                <div class="flex w-full md:w-auto gap-3">
                    <div class="relative flex-grow md:flex-grow-0 md:w-64">
                        <input type="text" id="search-input" placeholder="Buscar nome ou telefone..." 
                            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                        <svg class="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    </div>
                    <button onclick="window.openNewClient()" class="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 shadow-sm flex items-center gap-2 text-sm whitespace-nowrap">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                        Novo Cliente
                    </button>
                </div>
            </header>

            <div class="flex-1 overflow-y-auto p-4 md:p-6">
                <div id="clients-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    </div>
            </div>
        </div>
    `;

    // Expor funções globais para o HTML string
    window.openNewClient = () => openClientModal(null);

    // Setup Search com Debounce
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        clearTimeout(localState.searchTimeout);
        localState.searchTimeout = setTimeout(() => {
            refreshList(e.target.value);
        }, 400); // Espera 400ms após parar de digitar
    });

    // Carga inicial
    try {
        const [est] = await Promise.all([
            establishmentApi.getEstablishmentDetails(state.establishmentId),
            refreshList()
        ]);
        localState.establishment = est;
    } catch (e) {
        console.error("Erro inicialização clientes", e);
    }
};