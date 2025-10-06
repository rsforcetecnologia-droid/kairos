// js/ui/clients.js

import * as clientsApi from '../api/clients.js';
import * as establishmentApi from '../api/establishments.js';
import { state } from '../state.js';
import { showNotification, showConfirmation } from '../components/modal.js';

const contentDiv = document.getElementById('content');
let allClientsData = [];
let loyaltySettings = {};
let currentClient = null;
let currentView = 'list'; // 'list' ou 'detail'

// --- FUNÇÕES DE RENDERIZAÇÃO DA VISTA DE DETALHE (MODAL) ---

function renderDetailTabs(activeTab = 'cadastro') {
    const tabs = [
        { id: 'cadastro', label: 'Cadastro' },
        { id: 'agendamentos', label: 'Agendamentos' },
        { id: 'historico', label: 'Histórico' },
        { id: 'fidelidade', label: 'Fidelidade' }
    ];

    const tabContainer = document.getElementById('client-detail-tabs');
    if (!tabContainer) return;

    tabContainer.innerHTML = tabs.map(tab => `
        <button data-tab="${tab.id}" class="tab-btn whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm ${activeTab === tab.id ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}">
            ${tab.label}
        </button>
    `).join('');

    // Adiciona listeners de clique às abas
    tabContainer.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => renderDetailContent(button.dataset.tab));
    });
}

async function renderDetailContent(tabId) {
    renderDetailTabs(tabId);
    const contentContainer = document.getElementById('client-detail-content');
    if (!contentContainer) return;

    contentContainer.innerHTML = '<div class="loader mx-auto my-8"></div>';

    switch (tabId) {
        case 'cadastro':
            contentContainer.innerHTML = renderCadastroTab(currentClient);
            break;
        case 'agendamentos':
        case 'historico':
            const history = await clientsApi.getClientHistory(state.establishmentId, currentClient.name, currentClient.phone);
            contentContainer.innerHTML = renderHistoryTab(history, tabId);
            break;
        case 'fidelidade':
            const loyaltyHistory = await clientsApi.getClientLoyaltyHistory(state.establishmentId, currentClient.name, currentClient.phone);
            contentContainer.innerHTML = renderFidelidadeTab(currentClient, loyaltyHistory);
            break;
        default:
            contentContainer.innerHTML = `<p class="p-4 text-center text-gray-500">Secção não implementada.</p>`;
    }
}

function renderCadastroTab(client) {
    const dob = client?.dob ? client.dob.split('/') : ['',''];
    return `
        <form id="client-form" class="p-6 space-y-4">
            <input type="hidden" id="clientId" value="${client?.id || ''}">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="clientName" class="block text-sm font-medium text-gray-700">Nome</label>
                    <input type="text" id="clientName" value="${client?.name || ''}" class="mt-1 w-full p-2 border border-gray-300 rounded-md" required>
                </div>
                <div>
                    <label for="clientEmail" class="block text-sm font-medium text-gray-700">E-mail</label>
                    <input type="email" id="clientEmail" value="${client?.email || ''}" class="mt-1 w-full p-2 border border-gray-300 rounded-md">
                </div>
                <div>
                    <label for="clientPhone" class="block text-sm font-medium text-gray-700">Telefone</label>
                    <input type="tel" id="clientPhone" value="${client?.phone || ''}" class="mt-1 w-full p-2 border border-gray-300 rounded-md" required>
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <label for="clientDobDay" class="block text-sm font-medium text-gray-700">Aniversário (dia)</label>
                        <input type="number" id="clientDobDay" value="${dob[0]}" min="1" max="31" class="mt-1 w-full p-2 border border-gray-300 rounded-md">
                    </div>
                    <div>
                        <label for="clientDobMonth" class="block text-sm font-medium text-gray-700">(mês)</label>
                        <input type="number" id="clientDobMonth" value="${dob[1]}" min="1" max="12" class="mt-1 w-full p-2 border border-gray-300 rounded-md">
                    </div>
                </div>
            </div>
            <div>
                <label for="clientNotes" class="block text-sm font-medium text-gray-700">Observações</label>
                <textarea id="clientNotes" rows="4" class="mt-1 w-full p-2 border border-gray-300 rounded-md">${client?.notes || ''}</textarea>
            </div>
        </form>
    `;
}

function renderHistoryTab(history, type) {
    const title = type === 'agendamentos' ? 'Próximos Agendamentos' : 'Histórico de Visitas';
    const noDataMessage = type === 'agendamentos' ? 'Nenhum agendamento futuro.' : 'Nenhum histórico de visitas.';
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const filteredHistory = history.filter(item => {
        const itemDate = new Date(item.date);
        return type === 'agendamentos' ? itemDate >= today : itemDate < today;
    });

    if (filteredHistory.length === 0) {
        return `<p class="p-4 text-center text-gray-500">${noDataMessage}</p>`;
    }

    return `
        <div class="p-4 space-y-3 max-h-96 overflow-y-auto">
            <h4 class="font-semibold text-lg mb-2">${title}</h4>
            ${filteredHistory.map(item => `
                <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="font-semibold text-gray-800">${item.serviceName}</p>
                    <p class="text-sm text-gray-500">${new Date(item.date).toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            `).join('')}
        </div>
    `;
}


function renderFidelidadeTab(client, loyaltyHistory) {
    const points = client.loyaltyPoints || 0;

    let rewardsHTML = '<p class="text-sm text-gray-500">O programa de fidelidade não está ativo.</p>';
    if (loyaltySettings.enabled && loyaltySettings.tiers) {
        rewardsHTML = loyaltySettings.tiers.map(tier => {
            const canRedeem = points >= tier.points;
            return `
                <div class="flex justify-between items-center p-3 rounded-lg ${canRedeem ? 'bg-green-50' : 'bg-gray-100'}">
                    <div>
                        <p class="font-semibold ${canRedeem ? 'text-green-800' : 'text-gray-800'}">${tier.reward}</p>
                        <p class="text-sm ${canRedeem ? 'text-green-600' : 'text-gray-500'}">${tier.points} Pontos</p>
                    </div>
                    <button data-action="redeem-reward" data-points="${tier.points}" data-reward="${tier.reward}" ${!canRedeem ? 'disabled' : ''}
                        class="py-1 px-3 text-sm font-semibold rounded-lg ${canRedeem ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}">
                        Resgatar
                    </button>
                </div>`;
        }).join('');
    }

    const historyHTML = loyaltyHistory.length > 0 ? loyaltyHistory.map(item => `
        <div class="text-sm flex justify-between items-center">
            <div>
                <p class="font-medium text-gray-700">${item.type === 'earn' ? `Ganhou por visita` : `Resgatou: ${item.reward}`}</p>
                <p class="text-xs text-gray-500">${item.timestamp}</p>
            </div>
            <p class="font-bold ${item.type === 'earn' ? 'text-green-600' : 'text-red-600'}">${item.points} pts</p>
        </div>
    `).join('<hr class="my-2">') : '<p class="text-sm text-gray-500">Nenhum histórico de pontos.</p>';

    return `
        <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h4 class="font-semibold text-lg mb-2">Pontos e Prémios</h4>
                <div class="text-center bg-indigo-50 p-4 rounded-lg mb-4">
                    <p class="text-indigo-900 font-bold text-4xl">${points}</p>
                    <p class="text-indigo-700 font-semibold">Pontos Atuais</p>
                </div>
                <div class="space-y-2 max-h-64 overflow-y-auto">${rewardsHTML}</div>
            </div>
            <div>
                <h4 class="font-semibold text-lg mb-2">Histórico de Pontos</h4>
                <div class="space-y-2 max-h-80 overflow-y-auto">${historyHTML}</div>
            </div>
        </div>
    `;
}


// --- FUNÇÕES DE LÓGICA (ABRIR MODAL, SALVAR, APAGAR) ---

function openClientDetailModal(client) {
    currentClient = client;
    currentView = 'detail';
    const title = client ? client.name : 'Novo Cliente';

    contentDiv.innerHTML = `
        <div id="client-detail-view" class="bg-gray-50 p-4 rounded-t-lg">
            <div class="flex justify-between items-center">
                <h2 class="text-2xl font-bold text-gray-800">${title}</h2>
                <button data-action="close-detail-view" class="text-2xl font-bold text-gray-500 hover:text-gray-800">&times;</button>
            </div>
        </div>
        <div class="bg-white rounded-b-lg shadow-md">
            <div class="border-b border-gray-200">
                <nav id="client-detail-tabs" class="-mb-px flex space-x-6 px-4"">
                    <!-- Abas serão renderizadas aqui -->
                </nav>
            </div>
            <div id="client-detail-content">
                <!-- Conteúdo da aba será renderizado aqui -->
            </div>
            <div class="p-4 bg-gray-50 border-t flex justify-between">
                <button data-action="delete-client" class="py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 ${!client ? 'hidden' : ''}">Excluir Cliente</button>
                <div>
                    <button data-action="close-detail-view" class="py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 mr-2">Voltar</button>
                    <button data-action="save-client" class="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600">Salvar</button>
                </div>
            </div>
        </div>
    `;
    renderDetailContent('cadastro');
}

async function handleSaveClient() {
    const form = document.getElementById('client-form');
    if (!form) return;

    const clientId = form.querySelector('#clientId').value;
    const clientData = {
        name: form.querySelector('#clientName').value,
        email: form.querySelector('#clientEmail').value,
        phone: form.querySelector('#clientPhone').value,
        dob: `${form.querySelector('#clientDobDay').value}/${form.querySelector('#clientDobMonth').value}`,
        notes: form.querySelector('#clientNotes').value,
        establishmentId: state.establishmentId
    };

    if (!clientData.name || !clientData.phone) {
        showNotification('Erro', 'Nome e Telefone são obrigatórios.', 'error');
        return;
    }

    try {
        if (clientId) {
            await clientsApi.updateClient(clientId, clientData);
            showNotification('Sucesso', 'Cliente atualizado com sucesso!', 'success');
        } else {
            await clientsApi.createClient(clientData);
            showNotification('Sucesso', 'Cliente cadastrado com sucesso!', 'success');
        }
        await loadClientsPage(); // Volta para a lista
    } catch (error) {
        showNotification('Erro', `Não foi possível salvar: ${error.message}`, 'error');
    }
}

async function handleDeleteClient() {
    if (!currentClient || !currentClient.id) return;
    const confirmed = await showConfirmation('Excluir Cliente', `Tem certeza que deseja excluir ${currentClient.name}? Esta ação é irreversível.`);
    if (confirmed) {
        try {
            await clientsApi.deleteClient(currentClient.id);
            showNotification('Sucesso', 'Cliente excluído.', 'success');
            await loadClientsPage();
        } catch (error) {
            showNotification('Erro', `Não foi possível excluir: ${error.message}`, 'error');
        }
    }
}

// --- FUNÇÃO PRINCIPAL E CARREGAMENTO DA PÁGINA ---

export async function loadClientsPage() {
    currentView = 'list';
    contentDiv.innerHTML = `
        <section id="client-list-view">
            <div class="flex flex-wrap gap-4 justify-between items-center mb-6">
                <h2 class="text-3xl font-bold text-gray-800">Clientes</h2>
                <div class="flex items-center gap-4">
                    <input type="text" id="clientSearchInput" placeholder="Pesquisar por nome ou telemóvel..." class="w-full md:w-64 p-2 border rounded-md shadow-sm">
                    <button data-action="new-client" class="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 whitespace-nowrap">+ Novo Cliente</button>
                </div>
            </div>
            <div id="clientsList" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div class="loader col-span-full mx-auto"></div>
            </div>
        </section>
    `;

    try {
        const [clients, establishmentData] = await Promise.all([
            clientsApi.getClients(state.establishmentId),
            establishmentApi.getEstablishmentDetails(state.establishmentId)
        ]);
        allClientsData = clients;
        loyaltySettings = establishmentData.loyaltyProgram || { enabled: false };
        
        const listDiv = document.getElementById('clientsList');
        listDiv.innerHTML = allClientsData.length > 0 ? allClientsData.map(client => `
            <div class="client-card bg-white rounded-lg shadow p-4 flex flex-col cursor-pointer" data-client-id="${client.id}">
                <div class="flex items-center mb-3">
                    <div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                        ${client.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="ml-4">
                        <p class="font-bold text-gray-800">${client.name}</p>
                        <p class="text-sm text-gray-500">${client.phone}</p>
                    </div>
                </div>
            </div>
        `).join('') : `<p class="col-span-full text-center text-gray-500">Nenhum cliente cadastrado.</p>`;

    } catch (error) {
        contentDiv.innerHTML = '<p class="text-red-500 col-span-full text-center">Erro ao carregar dados dos clientes.</p>';
    }
}

// --- GESTOR DE EVENTOS GLOBAL DA PÁGINA ---

contentDiv.addEventListener('click', async (e) => {
    const target = e.target.closest('[data-action]');
    if (!target) return;

    const action = target.dataset.action;

    if (currentView === 'list') {
        if (action === 'new-client') {
            openClientDetailModal(null);
        } else if (e.target.closest('.client-card')) {
            const clientId = e.target.closest('.client-card').dataset.clientId;
            const client = allClientsData.find(c => c.id === clientId);
            if(client) openClientDetailModal(client);
        }
    } else if (currentView === 'detail') {
        if (action === 'close-detail-view') {
            loadClientsPage();
        } else if (action === 'save-client') {
            await handleSaveClient();
        } else if (action === 'delete-client') {
            await handleDeleteClient();
        } else if (action === 'redeem-reward') {
             const points = parseInt(target.dataset.points, 10);
            const reward = target.dataset.reward;
            const confirmed = await showConfirmation('Confirmar Resgate', `Deseja resgatar "${reward}" por ${points} pontos?`);
            if (confirmed) {
                try {
                    await clientsApi.redeemReward(state.establishmentId, currentClient.name, currentClient.phone, { points, reward });
                    showNotification('Prémio resgatado com sucesso!', 'success');
                    // Recarrega os dados do cliente e a aba de fidelidade
                    const updatedClients = await clientsApi.getClients(state.establishmentId);
                    allClientsData = updatedClients;
                    const updatedClient = allClientsData.find(c => c.id === currentClient.id);
                    if(updatedClient) currentClient = updatedClient;
                    renderDetailContent('fidelidade');
                } catch (error) {
                    showNotification(`Erro ao resgatar: ${error.message}`, 'error');
                }
            }
        }
    }
});

contentDiv.addEventListener('input', (e) => {
    if (e.target.id === 'clientSearchInput') {
        const searchTerm = e.target.value.toLowerCase();
        const filteredClients = allClientsData.filter(c => 
            c.name.toLowerCase().includes(searchTerm) || c.phone.includes(searchTerm)
        );
         const listDiv = document.getElementById('clientsList');
         listDiv.innerHTML = filteredClients.length > 0 ? filteredClients.map(client => `
            <div class="client-card bg-white rounded-lg shadow p-4 flex flex-col cursor-pointer" data-client-id="${client.id}">
                <div class="flex items-center mb-3">
                    <div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                        ${client.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="ml-4">
                        <p class="font-bold text-gray-800">${client.name}</p>
                        <p class="text-sm text-gray-500">${client.phone}</p>
                    </div>
                </div>
            </div>
        `).join('') : `<p class="col-span-full text-center text-gray-500">Nenhum cliente encontrado.</p>`;
    }
});

