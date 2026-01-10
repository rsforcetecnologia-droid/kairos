// js/ui/clients.js

import * as clientsApi from '../api/clients.js';
import * as establishmentApi from '../api/establishments.js';
import { state } from '../state.js';
import { showNotification, showGenericModal, showConfirmation } from '../components/modal.js';
import { navigateTo } from '../main.js';
import { escapeHTML } from '../utils.js'; 

// --- ESTADO LOCAL ---
let localState = {
    clients: [],
    establishment: null,
    searchTimeout: null,
    currentClient: null, // Cliente aberto no modal
    history: [], // Histórico completo carregado da API
    historyLimit: 10, // CONTROLE DE PAGINAÇÃO
    // Filtros
    filters: {
        hasLoyalty: false,
        birthMonth: '',
        inactiveDays: ''
    },
    showFilters: false,
    // Estado para Exclusão em Lote
    selectionMode: false,
    selectedClients: new Set() // Armazena IDs dos selecionados
};

// --- FUNÇÕES AUXILIARES ---
const cleanPhone = (val) => val ? val.replace(/\D/g, '') : '';

const formatPhone = (val) => {
    if (!val) return '';
    const v = val.replace(/\D/g, '');
    if (v.length > 10) return v.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3');
    return v.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3');
};

const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0);
};

const formatDate = (dateValue) => {
    if (!dateValue) return '-';
    try {
        const date = new Date(dateValue);
        if (isNaN(date.getTime())) return '-';
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
    } catch (e) {
        return '-';
    }
};

// --- CONTROLE DE UI (FILTROS E SELEÇÃO) ---

const toggleFilterPanel = () => {
    localState.showFilters = !localState.showFilters;
    const panel = document.getElementById('filter-panel');
    if (panel) panel.classList.toggle('hidden', !localState.showFilters);
};

const toggleSelectionMode = () => {
    localState.selectionMode = !localState.selectionMode;
    localState.selectedClients.clear(); // Limpa seleção ao sair/entrar
    renderList(); // Re-renderiza para mostrar/esconder checkboxes
    updateSelectionHeader();
};

const toggleClientSelection = (clientId) => {
    if (localState.selectedClients.has(clientId)) {
        localState.selectedClients.delete(clientId);
    } else {
        localState.selectedClients.add(clientId);
    }
    updateSelectionHeader();
    
    // Atualiza visual do card específico
    const card = document.getElementById(`card-${clientId}`);
    if (card) {
        const checkbox = card.querySelector('.client-checkbox');
        if (checkbox) checkbox.checked = localState.selectedClients.has(clientId);
        
        if (localState.selectedClients.has(clientId)) {
            card.classList.add('ring-2', 'ring-indigo-500', 'bg-indigo-50');
        } else {
            card.classList.remove('ring-2', 'ring-indigo-500', 'bg-indigo-50');
        }
    }
};

const updateSelectionHeader = () => {
    const headerNormal = document.getElementById('header-normal');
    const headerSelection = document.getElementById('header-selection');
    const countSpan = document.getElementById('selected-count');

    if (localState.selectionMode) {
        headerNormal.classList.add('hidden');
        headerSelection.classList.remove('hidden');
        if (countSpan) countSpan.textContent = `${localState.selectedClients.size} selecionado(s)`;
    } else {
        headerNormal.classList.remove('hidden');
        headerSelection.classList.add('hidden');
    }
};

// --- AÇÕES EM LOTE ---

const handleBulkDelete = async () => {
    const count = localState.selectedClients.size;
    if (count === 0) return;

    if (await showConfirmation('Excluir Clientes', `Tem certeza que deseja excluir ${count} clientes selecionados? Esta ação não pode ser desfeita.`)) {
        const btn = document.getElementById('btn-bulk-delete');
        if(btn) {
            btn.disabled = true;
            btn.textContent = 'Excluindo...';
        }

        try {
            // Executa exclusões em paralelo usando o ID correto
            const deletePromises = Array.from(localState.selectedClients).map(id => clientsApi.deleteClient(id));
            await Promise.all(deletePromises);

            showNotification('Sucesso', `${count} clientes excluídos com sucesso!`, 'success');
            
            // Sai do modo de seleção e recarrega
            toggleSelectionMode(); 
            
            // Delay para garantir propagação no banco
            setTimeout(() => refreshList(), 500);

        } catch (error) {
            console.error(error);
            showNotification('Erro', 'Ocorreu um erro ao excluir alguns clientes.', 'error');
            if(btn) {
                btn.disabled = false;
                btn.textContent = 'Excluir';
            }
        }
    }
};

const applyFilters = () => {
    const loyaltyEl = document.getElementById('filter-loyalty');
    const monthEl = document.getElementById('filter-month');
    const inactiveEl = document.getElementById('filter-inactive');

    localState.filters.hasLoyalty = loyaltyEl ? loyaltyEl.checked : false;
    localState.filters.birthMonth = monthEl ? monthEl.value : '';
    localState.filters.inactiveDays = inactiveEl ? inactiveEl.value : '';
    
    refreshList();
};

const clearFilters = () => {
    const loyaltyEl = document.getElementById('filter-loyalty');
    const monthEl = document.getElementById('filter-month');
    const inactiveEl = document.getElementById('filter-inactive');

    if (loyaltyEl) loyaltyEl.checked = false;
    if (monthEl) monthEl.value = '';
    if (inactiveEl) inactiveEl.value = '';
    
    localState.filters = { hasLoyalty: false, birthMonth: '', inactiveDays: '' };
    refreshList();
};

// --- COMPONENTE: MODAL DE CLIENTE ---

const openClientModal = async (client = null) => {
    localState.currentClient = client;
    localState.historyLimit = 10; // RESET NA PAGINAÇÃO
    const isNew = !client;

    const renderModalContent = (c) => `
        <div class="h-[80vh] flex flex-col bg-gray-50 rounded-lg overflow-hidden">
            <div class="bg-white border-b px-6 py-4 flex justify-between items-center shrink-0">
                <div>
                    <h2 class="text-xl font-bold text-gray-800">${isNew ? 'Novo Cliente' : (c.name || 'Cliente')}</h2>
                    ${!isNew ? `<p class="text-sm text-gray-500">${formatPhone(c.phone)}</p>` : ''}
                </div>
                ${!isNew ? `
                <div class="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">
                    ${c.loyaltyPoints || 0} pts
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

    showGenericModal({ title: '', contentHTML: renderModalContent(client || {}), maxWidth: 'max-w-3xl' });
    
    window.switchTab = (tabName) => renderTab(tabName, isNew);
    window.handleSave = submitSave;
    window.handleDelete = submitDelete;
    window.loadMoreHistory = () => {
        localState.historyLimit += 10;
        renderTab('history', isNew);
    };

    if (!isNew && client.id) {
        try {
            if (typeof clientsApi.getClient === 'function') {
                const freshClient = await clientsApi.getClient(state.establishmentId, client.id);
                if (freshClient) {
                    localState.currentClient = freshClient;
                    const headerPoints = document.querySelector('.bg-indigo-100.text-indigo-700');
                    if (headerPoints) headerPoints.textContent = `${freshClient.loyaltyPoints || 0} pts`;
                }
            }
            localState.history = await clientsApi.getFullHistory(state.establishmentId, client.phone);
        } catch (e) {
            console.error("Aviso: Não foi possível atualizar detalhes do cliente", e);
            localState.history = [];
        }
    }
    
    renderTab('details', isNew);
};

const renderTab = (tabName, isNew) => {
    const container = document.getElementById('modal-body');
    if (!container) return;

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
        if(isNew) {
            const phoneInput = document.getElementById('input-phone');
            if(phoneInput) phoneInput.oninput = (e) => e.target.value = formatPhone(e.target.value);
        }

    } else if (tabName === 'appointments') {
        const now = new Date();
        const upcoming = localState.history.filter(h => {
            const hDate = new Date(h.date);
            return h.type === 'appointment' && 
                   hDate >= now && 
                   h.status !== 'cancelled' && 
                   h.status !== 'cancelado' && 
                   h.status !== 'completed' && 
                   h.status !== 'finalizado';
        });

        upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));

        if (!upcoming.length) {
            container.innerHTML = `<div class="text-center py-10">
                <p class="text-gray-400 mb-4">Nenhum agendamento programado.</p>
                <button onclick="document.getElementById('genericModal').style.display='none'; navigateTo('agenda-section')" class="text-indigo-600 font-bold hover:underline">Ir para Agenda</button>
            </div>`;
            return;
        }

        container.innerHTML = `
            <div class="space-y-3">
                ${upcoming.map(h => `
                    <div onclick="document.getElementById('genericModal').style.display='none'; navigateTo('agenda-section', { targetDate: '${h.date}', scrollToAppointmentId: '${h.id}' })" 
                         class="flex items-center justify-between p-4 border-l-4 border-indigo-500 bg-white shadow-sm rounded-r-lg hover:shadow-md transition-all cursor-pointer hover:bg-indigo-50 group">
                        <div>
                            <p class="font-bold text-gray-800">${h.description}</p>
                            <p class="text-sm text-gray-600 mt-1">
                                📅 ${formatDate(h.date)}
                            </p>
                            <span class="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded mt-2 inline-block font-medium">
                                ${h.status === 'confirmed' ? 'Confirmado' : 'Agendado'}
                            </span>
                        </div>
                        <div class="p-2 text-indigo-400 group-hover:text-indigo-600 transition-colors">
                            <svg class="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 12h14"/></svg>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

    } else if (tabName === 'history') {
        const allHistory = [...localState.history].filter(h => 
            h.type === 'appointment' && (h.status === 'completed' || h.status === 'finalizado')
        ).sort((a, b) => new Date(b.date) - new Date(a.date));

        const visibleHistory = allHistory.slice(0, localState.historyLimit);
        const hasMore = allHistory.length > localState.historyLimit;

        if (!visibleHistory.length) {
            container.innerHTML = `<div class="text-center text-gray-400 mt-10">Nenhum histórico de agendamento finalizado.</div>`;
            return;
        }
        
        container.innerHTML = `
            <div class="space-y-3">
                ${visibleHistory.map(h => {
                    const sourceId = h.sourceId || h.id; 
                    return `
                    <div onclick="document.getElementById('genericModal').style.display='none'; navigateTo('comandas-section', { selectedAppointmentId: '${sourceId}' })" 
                         class="flex items-center justify-between p-3 border rounded bg-white cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 shadow-sm transition-all group">
                        <div class="flex items-center gap-3">
                            <div class="p-2 rounded-full bg-green-100 text-green-600">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm font-bold text-gray-800">${h.description}</p>
                                <div class="flex flex-col text-xs text-gray-500 mt-1">
                                    <span>📅 ${formatDate(h.date)}</span>
                                    <span class="text-gray-600 font-medium">👤 ${h.professionalName || h.workerName || 'Profissional'}</span>
                                </div>
                            </div>
                        </div>
                        <div class="text-right">
                             <span class="block text-sm font-bold text-gray-800">
                                ${formatCurrency(h.value)}
                             </span>
                             <span class="text-[10px] text-indigo-500 font-medium group-hover:underline">Ver Comanda</span>
                        </div>
                    </div>
                `}).join('')}
            </div>
            
            ${hasMore ? `
                <div class="text-center mt-4 pt-2">
                    <button onclick="window.loadMoreHistory()" class="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                        Carregar mais antigos...
                    </button>
                    <p class="text-xs text-gray-400 mt-2">Mostrando ${visibleHistory.length} de ${allHistory.length}</p>
                </div>
            ` : ''}
        `;

    } else if (tabName === 'loyalty') {
        const program = localState.establishment.loyaltyProgram;
        if (!program || !program.enabled) {
            container.innerHTML = `<div class="text-center text-gray-400 mt-10">Programa de fidelidade não ativo neste estabelecimento.</div>`;
            return;
        }

        const currentPoints = c.loyaltyPoints || 0;
        const ruleDescription = program.type === 'visit' 
            ? `Regra: Ganhe ${program.pointsPerVisit || 1} pontos a cada visita`
            : `Regra: Ganhe 1 ponto a cada R$ ${program.pointsPerCurrency || 10}`;

        const rewardsList = program.tiers || program.rewards || [];

        container.innerHTML = `
            <div class="text-center mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
                <p class="text-xs uppercase tracking-widest opacity-80">Saldo Atual</p>
                <h3 class="text-5xl font-extrabold mt-2">${currentPoints}</h3>
                <p class="text-sm opacity-80">Pontos</p>
                <div class="mt-4 pt-4 border-t border-white/20">
                    <p class="text-xs font-medium bg-white/20 inline-block px-3 py-1 rounded-full">${ruleDescription}</p>
                </div>
            </div>

            <h4 class="font-bold text-gray-700 mb-3 text-sm uppercase">Prêmios Disponíveis</h4>
            <div class="space-y-2">
                ${rewardsList.map(tier => {
                    const cost = tier.costPoints || tier.points || 0;
                    const canRedeem = currentPoints >= cost;
                    const rewardName = tier.reward || tier.name;
                    return `
                        <div class="flex justify-between items-center p-3 border rounded ${canRedeem ? 'bg-green-50 border-green-200' : 'bg-gray-50 opacity-70'}">
                            <div>
                                <p class="font-bold text-gray-800">${escapeHTML(rewardName)}</p>
                                <p class="text-xs text-gray-500">${cost} pontos necessários</p>
                            </div>
                            <button onclick="window.handleRedeem('${cost}', '${escapeHTML(rewardName)}')" ${!canRedeem ? 'disabled' : ''} 
                                class="px-3 py-1 rounded text-xs font-bold ${canRedeem ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}">
                                Resgatar
                            </button>
                        </div>
                    `;
                }).join('')}
                ${rewardsList.length === 0 ? '<p class="text-center text-gray-500 text-sm">Nenhum prémio cadastrado.</p>' : ''}
            </div>
        `;
        
        window.handleRedeem = async (points, rewardName) => {
            if (await showConfirmation('Resgatar', `Trocar ${points} pontos por "${rewardName}"?`)) {
                try {
                    await clientsApi.redeemReward(state.establishmentId, c.phone, points, rewardName);
                    showNotification('Sucesso', 'Resgate realizado!', 'success');
                    
                    c.loyaltyPoints = (c.loyaltyPoints || 0) - parseInt(points);
                    localState.history.unshift({ type: 'loyalty', description: `Resgate: ${rewardName}`, date: new Date().toISOString(), value: -points, isPoints: true, status: 'completed' });
                    
                    renderTab('loyalty', false); 
                    refreshList(); 
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
            // CORREÇÃO CRÍTICA: 
            // Usa o ID do documento se existir, caso contrário tenta o telefone limpo.
            const clientId = localState.currentClient.id || cleanPhone(localState.currentClient.phone);
            
            await clientsApi.deleteClient(clientId);
            
            showNotification('Sucesso', 'Cliente removido', 'success');
            document.getElementById('genericModal').style.display = 'none';
            
            // Pequeno delay para garantir que o Firestore processou a exclusão
            setTimeout(() => refreshList(), 500);
            
        } catch (e) {
            showNotification('Erro', 'Erro ao remover', 'error');
            console.error(e);
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
                <div class="mt-2 text-sm text-gray-500">
                    <button onclick="window.openNewClient()" class="text-indigo-600 font-bold hover:underline">Cadastrar novo</button>
                </div>
            </div>
        `;
        return;
    }

    localState.clients.forEach(client => {
        const card = document.createElement('div');
        // CORREÇÃO: Usa o ID do cliente (ou phone limpo) para controle de seleção e ID do DOM
        const clientId = client.id || cleanPhone(client.phone);
        const isSelected = localState.selectedClients.has(clientId);
        
        card.id = `card-${clientId}`;
        card.className = `bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group relative ${isSelected ? 'ring-2 ring-indigo-500 bg-indigo-50' : ''}`;
        
        // Clique no card abre modal, clique no checkbox alterna seleção
        card.onclick = (e) => {
            if (e.target.type === 'checkbox') return;
            if (localState.selectionMode) {
                toggleClientSelection(clientId);
            } else {
                openClientModal(client);
            }
        };

        // --- CORREÇÃO DATA ÚLTIMA VISITA ---
        // Verifica se existe lastVisit, lastServiceDate ou até lastAppointmentDate
        const visitDateRaw = client.lastVisit || client.lastServiceDate || client.lastAppointmentDate;
        
        let lastVisitText = 'Nunca visitou';
        if (visitDateRaw) {
            const formatted = formatDate(visitDateRaw);
            // Verifica se a formatação foi válida (não retornou apenas o traço)
            if (formatted && formatted !== '-') {
                lastVisitText = `Última visita: ${formatted.split(' ')[0]}`;
            }
        }

        const checkboxHTML = localState.selectionMode ? `
            <div class="absolute top-2 left-2 z-10" onclick="event.stopPropagation()">
                <input type="checkbox" class="client-checkbox w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500" 
                    ${isSelected ? 'checked' : ''} 
                    onchange="window.toggleClientSelection('${clientId}')">
            </div>
        ` : '';

        card.innerHTML = `
            ${checkboxHTML}
            <div class="flex items-center gap-4 ${localState.selectionMode ? 'ml-6' : ''}">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow shrink-0">
                    ${client.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h3 class="font-bold text-gray-800 text-sm md:text-base group-hover:text-indigo-600 transition-colors line-clamp-1">${client.name}</h3>
                    <p class="text-xs text-gray-500">${formatPhone(client.phone)}</p>
                    <p class="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        ${lastVisitText}
                    </p>
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

    const term = searchTerm || document.getElementById('search-input')?.value || '';

    try {
        localState.clients = await clientsApi.getClients(
            state.establishmentId, 
            term, 
            100, 
            localState.filters 
        );

        // --- FILTRO DE INATIVIDADE (Client Side - Reforço) ---
        if (localState.filters.inactiveDays) {
            const days = parseInt(localState.filters.inactiveDays, 10);
            if (!isNaN(days) && days > 0) {
                const today = new Date();
                const cutoffDate = new Date(today.setDate(today.getDate() - days));

                localState.clients = localState.clients.filter(client => {
                    const vDateRaw = client.lastVisit || client.lastServiceDate;
                    if (!vDateRaw) return true; // Nunca visitou = Inativo
                    
                    const visitDate = new Date(vDateRaw);
                    if (isNaN(visitDate.getTime())) return true; // Data inválida = Inativo

                    // Retorna TRUE se a visita foi ANTES da data de corte
                    return visitDate < cutoffDate;
                });
            }
        }
        
        renderList();
        updateSelectionHeader(); // Garante que o header esteja correto após refresh
    } catch (e) {
        console.error(e);
        if (container) container.innerHTML = '<p class="col-span-full text-center text-red-500">Erro ao carregar lista.</p>';
    }
};

// --- INICIALIZAÇÃO ---

export const loadClientsPage = async () => {
    const contentDiv = document.getElementById('content');
    
    contentDiv.innerHTML = `
        <div class="flex flex-col h-full bg-gray-50">
            <header id="header-normal" class="bg-white border-b sticky top-0 z-20 shadow-sm transition-all">
                <div class="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h1 class="text-2xl font-bold text-gray-800">Clientes</h1>
                    
                    <div class="flex flex-wrap w-full md:w-auto gap-3 items-center">
                        <div class="relative flex-grow md:flex-grow-0 md:w-64">
                            <input type="text" id="search-input" placeholder="Buscar nome ou telefone..." 
                                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                            <svg class="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                        </div>
                        
                        <button onclick="window.toggleSelectionMode()" class="bg-white text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 border border-gray-300 flex items-center gap-2 transition-colors h-[38px] text-sm font-medium">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                            Selecionar
                        </button>

                        <button onclick="window.toggleFilterPanel()" class="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 border border-gray-200 flex items-center gap-2 transition-colors h-[38px]">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                            <span class="hidden sm:inline">Filtros</span>
                        </button>

                        <button onclick="window.openNewClient()" class="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 shadow-sm flex items-center gap-2 text-sm whitespace-nowrap h-[38px]">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                            Novo
                        </button>
                    </div>
                </div>
            </header>

            <header id="header-selection" class="hidden bg-indigo-50 border-b border-indigo-100 sticky top-0 z-30 shadow-md transition-all">
                <div class="px-6 py-4 flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <button onclick="window.toggleSelectionMode()" class="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-indigo-100">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        <span id="selected-count" class="font-bold text-indigo-900 text-lg">0 selecionado(s)</span>
                    </div>
                    <button id="btn-bulk-delete" onclick="window.handleBulkDelete()" class="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 shadow-sm flex items-center gap-2 text-sm transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        Excluir Selecionados
                    </button>
                </div>
            </header>

            <div id="filter-panel" class="hidden border-t bg-gray-50 px-6 py-4 transition-all duration-300">
                <div class="flex flex-wrap items-end gap-4">
                    <div class="flex flex-col gap-1">
                        <span class="text-xs font-semibold text-gray-500 uppercase">Fidelidade</span>
                        <label class="flex items-center gap-2 bg-white px-3 py-2 rounded border border-gray-200 cursor-pointer hover:border-indigo-300 h-[38px]">
                            <input type="checkbox" id="filter-loyalty" class="text-indigo-600 rounded focus:ring-indigo-500">
                            <span class="text-sm text-gray-700">Com Pontos</span>
                        </label>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label class="text-xs font-semibold text-gray-500 uppercase">Aniversariantes</label>
                        <select id="filter-month" class="bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none h-[38px] min-w-[140px]">
                            <option value="">Todos os meses</option>
                            <option value="01">Janeiro</option>
                            <option value="02">Fevereiro</option>
                            <option value="03">Março</option>
                            <option value="04">Abril</option>
                            <option value="05">Maio</option>
                            <option value="06">Junho</option>
                            <option value="07">Julho</option>
                            <option value="08">Agosto</option>
                            <option value="09">Setembro</option>
                            <option value="10">Outubro</option>
                            <option value="11">Novembro</option>
                            <option value="12">Dezembro</option>
                        </select>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label class="text-xs font-semibold text-gray-500 uppercase">Ausentes há (+dias)</label>
                        <input type="number" id="filter-inactive" placeholder="Ex: 30" min="0" 
                            class="w-32 bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none h-[38px]">
                    </div>
                    <div class="flex gap-2 ml-auto">
                        <button onclick="window.clearFilters()" class="text-sm text-gray-500 hover:text-gray-700 px-3 py-2 underline h-[38px]">Limpar</button>
                        <button onclick="window.applyFilters()" class="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-indigo-700 h-[38px] shadow-sm">Aplicar Filtros</button>
                    </div>
                </div>
            </div>

            <div class="flex-1 overflow-y-auto p-4 md:p-6">
                <div id="clients-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    </div>
            </div>
        </div>
    `;

    // Expor funções globais
    window.openNewClient = () => openClientModal(null);
    window.toggleFilterPanel = toggleFilterPanel;
    window.toggleSelectionMode = toggleSelectionMode;
    window.toggleClientSelection = toggleClientSelection;
    window.handleBulkDelete = handleBulkDelete;
    window.applyFilters = applyFilters;
    window.clearFilters = clearFilters;
    // Garante que o navegador encontre a função navigateTo usada no HTML
    window.navigateTo = navigateTo;

    // Setup Search com Debounce
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            clearTimeout(localState.searchTimeout);
            localState.searchTimeout = setTimeout(() => {
                refreshList(e.target.value);
            }, 400); 
        });
    }

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