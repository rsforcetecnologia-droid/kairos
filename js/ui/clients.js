// js/ui/clients.js

// --- 1. IMPORTAÇÕES ---
import * as clientsApi from '../api/clients.js';
import * as establishmentApi from '../api/establishments.js';
import { state } from '../state.js';
import { showNotification, showConfirmation } from '../components/modal.js';

// --- 2. CONSTANTES E VARIÁVEIS DO MÓDULO ---
const contentDiv = document.getElementById('content');
let allClientsData = [];
let loyaltySettings = {};
let isLoyaltyVisible = true;

// --- 3. FUNÇÕES DE LÓGICA E RENDERIZAÇÃO ---

function renderClientsList() {
    const listDiv = document.getElementById('clientsList');
    const searchTerm = document.getElementById('clientSearchInput').value.toLowerCase();
    const sortOrder = document.getElementById('clientSortSelect').value;

    let filteredClients = allClientsData.filter(c => 
        c.name.toLowerCase().includes(searchTerm) || c.phone.includes(searchTerm)
    );

    if (sortOrder === 'points-desc') {
        filteredClients.sort((a, b) => (b.loyaltyPoints || 0) - (a.loyaltyPoints || 0));
    } else if (sortOrder === 'points-asc') {
        filteredClients.sort((a, b) => (a.loyaltyPoints || 0) - (b.loyaltyPoints || 0));
    } else if (sortOrder === 'visits-desc') {
        filteredClients.sort((a, b) => b.visitCount - a.visitCount);
    }

    if (filteredClients.length === 0) {
        listDiv.innerHTML = `<p class="col-span-full text-center text-gray-500">Nenhum cliente encontrado.</p>`;
        return;
    }

    listDiv.innerHTML = filteredClients.map(client => {
        const points = client.loyaltyPoints || 0;
        let nextTier = null;
        if (loyaltySettings.enabled && loyaltySettings.tiers) {
            nextTier = loyaltySettings.tiers
                .filter(t => t.points > points)
                .sort((a, b) => a.points - b.points)[0];
        }

        const progressPercent = nextTier ? (points / nextTier.points) * 100 : (points > 0 ? 100 : 0);

        const loyaltyHTML = `
            <div class="mt-auto ${isLoyaltyVisible ? '' : 'hidden'}">
                <div class="flex justify-between text-sm font-medium text-gray-600">
                    <span>Fidelidade</span>
                    <span>${points} pts</span>
                </div>
                <div class="w-full loyalty-progress-bar rounded-full h-2 mt-1">
                    <div class="loyalty-progress bg-indigo-600 h-2 rounded-full" style="width: ${progressPercent}%"></div>
                </div>
                ${nextTier ? `<p class="text-xs text-gray-500 mt-1 text-right">Próximo prémio: ${nextTier.points} pts</p>` : `<p class="text-xs text-green-600 mt-1 text-right">Todos os prémios disponíveis!</p>`}
            </div>
        `;

        return `
            <div class="client-card bg-white rounded-lg shadow p-4 flex flex-col cursor-pointer" data-client-name="${client.name}" data-client-phone="${client.phone}">
                <div class="flex items-center mb-3">
                    <div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                        ${client.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="ml-4">
                        <p class="font-bold text-gray-800">${client.name}</p>
                        <p class="text-sm text-gray-500">${client.phone}</p>
                    </div>
                </div>
                ${loyaltySettings.enabled ? loyaltyHTML : ''}
            </div>`;
    }).join('');
}

async function openClientDetailModal(clientName, clientPhone) {
    const modal = document.getElementById('clientHistoryModal');
    modal.innerHTML = `<div class="modal-content"><div class="loader mx-auto"></div></div>`;
    modal.style.display = 'flex';

    try {
        const [clientHistory, loyaltyHistory] = await Promise.all([
            clientsApi.getClientHistory(state.establishmentId, clientName, clientPhone),
            clientsApi.getClientLoyaltyHistory(state.establishmentId, clientName, clientPhone)
        ]);

        const clientData = allClientsData.find(c => c.name === clientName && c.phone === clientPhone);
        const points = clientData.loyaltyPoints || 0;

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

        const redeemedHTML = loyaltyHistory.filter(item => item.type === 'redeem').map(item => `
            <div class="text-sm">
                <p class="font-medium text-gray-700">${item.reward}</p>
                <p class="text-gray-500">${item.timestamp} (${item.points} pts)</p>
            </div>
        `).join('<hr class="my-2">');

        modal.innerHTML = `
            <div class="modal-content max-w-4xl">
                <div class="flex justify-between items-start">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-800">${clientData.name}</h2>
                        <p class="text-gray-500">${clientData.phone}</p>
                    </div>
                    <button type="button" data-action="close-modal" data-target="clientHistoryModal" class="text-2xl font-bold">&times;</button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div class="md:col-span-1">
                        <h3 class="font-semibold text-lg mb-2 border-b pb-2">Plano de Fidelidade</h3>
                        <div class="text-center bg-indigo-50 p-4 rounded-lg mb-4">
                            <p class="text-indigo-900 font-bold text-4xl">${points}</p>
                            <p class="text-indigo-700 font-semibold">Pontos Atuais</p>
                        </div>
                        <div class="space-y-2 max-h-48 overflow-y-auto pr-2">${rewardsHTML}</div>
                    </div>
                    <div class="md:col-span-2">
                        <div class="border-b border-gray-200">
                            <nav class="-mb-px flex space-x-6" id="client-modal-tabs">
                                <button data-tab="visits" class="whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm border-indigo-500 text-indigo-600">Histórico de Visitas</button>
                                <button data-tab="redeemed" class="whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">Prémios Resgatados</button>
                            </nav>
                        </div>
                        <div class="mt-4">
                            <div id="tab-content-visits" class="space-y-2 max-h-64 overflow-y-auto pr-2">
                                ${clientHistory.length > 0 ? clientHistory.map(item => `
                                    <div class="text-sm">
                                        <p class="font-medium text-gray-700">${item.serviceName}</p>
                                        <p class="text-gray-500">${item.date}</p>
                                    </div>
                                `).join('<hr class="my-2">') : '<p class="text-sm text-gray-500">Nenhum histórico de visitas.</p>'}
                            </div>
                             <div id="tab-content-redeemed" class="hidden space-y-2 max-h-64 overflow-y-auto pr-2">
                                ${redeemedHTML.length > 0 ? redeemedHTML : '<p class="text-sm text-gray-500">Nenhum prémio resgatado.</p>'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

        // Adiciona lógica para as abas
        const tabs = modal.querySelectorAll('#client-modal-tabs button');
        const contents = modal.querySelectorAll('[id^="tab-content-"]');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('border-indigo-500', 'text-indigo-600'));
                tab.classList.add('border-indigo-500', 'text-indigo-600');
                contents.forEach(c => c.classList.add('hidden'));
                modal.querySelector(`#tab-content-${tab.dataset.tab}`).classList.remove('hidden');
            });
        });

    } catch (error) {
        console.error("Erro ao carregar detalhes do cliente:", error);
        modal.innerHTML = `<div class="modal-content"><p class="text-red-500">Erro ao carregar detalhes do cliente.</p></div>`;
    }
}

// --- 5. EVENT LISTENERS E INICIALIZAÇÃO DA PÁGINA ---

function setupEventListeners() {
    contentDiv.addEventListener('input', e => {
        if (e.target.id === 'clientSearchInput') renderClientsList();
    });
    contentDiv.addEventListener('change', e => {
        if (e.target.id === 'clientSortSelect') renderClientsList();
        if (e.target.id === 'loyaltyVisibilityToggle') {
            isLoyaltyVisible = e.target.checked;
            renderClientsList();
        }
    });

    contentDiv.addEventListener('click', e => {
        const card = e.target.closest('.client-card');
        if (card) {
            document.querySelectorAll('.client-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            openClientDetailModal(card.dataset.clientName, card.dataset.clientPhone);
        }
    });

    document.getElementById('clientHistoryModal').addEventListener('click', async e => {
        const button = e.target.closest('button[data-action="redeem-reward"]');
        if (button) {
            const selectedCard = document.querySelector('.client-card.selected');
            if (!selectedCard) return;

            const clientName = selectedCard.dataset.clientName;
            const clientPhone = selectedCard.dataset.clientPhone;
            const points = parseInt(button.dataset.points, 10);
            const reward = button.dataset.reward;

            const confirmed = await showConfirmation('Confirmar Resgate', `Deseja resgatar "${reward}" por ${points} pontos?`);
            if (confirmed) {
                try {
                    await clientsApi.redeemReward(state.establishmentId, clientName, clientPhone, { points, reward });
                    showNotification('Prémio resgatado com sucesso!', 'success');
                    document.getElementById('clientHistoryModal').style.display = 'none';
                    await loadClientsPage();
                } catch (error) {
                    showNotification(`Erro ao resgatar: ${error.message}`, 'error');
                }
            }
        }
    });
}

// --- 6. FUNÇÃO PRINCIPAL EXPORTADA ---

export async function loadClientsPage() {
    contentDiv.innerHTML = `
        <section>
            <div class="flex flex-wrap gap-4 justify-between items-center mb-6">
                <h2 class="text-3xl font-bold text-gray-800">Clientes</h2>
                <div class="flex items-center gap-4">
                    <label for="loyaltyVisibilityToggle" class="flex items-center cursor-pointer">
                        <div class="relative">
                            <input type="checkbox" id="loyaltyVisibilityToggle" class="sr-only" checked>
                            <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                        </div>
                        <span class="ml-3 font-medium text-gray-700">Fidelidade</span>
                    </label>
                    <input type="text" id="clientSearchInput" placeholder="Pesquisar por nome ou telemóvel..." class="w-full md:w-64 p-2 border rounded-md shadow-sm">
                    <select id="clientSortSelect" class="p-2 border rounded-md shadow-sm">
                        <option value="points-desc">Ordenar por Pontos (Maior)</option>
                        <option value="points-asc">Ordenar por Pontos (Menor)</option>
                        <option value="visits-desc">Ordenar por Visitas</option>
                    </select>
                </div>
            </div>
            <div id="clientsList" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div class="loader col-span-full mx-auto"></div>
            </div>
        </section>`;

    try {
        const establishmentData = await establishmentApi.getEstablishmentDetails(state.establishmentId);
        loyaltySettings = establishmentData.loyaltyProgram || { enabled: false };
        document.getElementById('loyaltyVisibilityToggle').checked = loyaltySettings.enabled;
        isLoyaltyVisible = loyaltySettings.enabled;

        allClientsData = await clientsApi.getClients(state.establishmentId);
        renderClientsList();
        setupEventListeners();
    } catch (error) {
        contentDiv.querySelector('#clientsList').innerHTML = '<p class="text-red-500 col-span-full text-center">Erro ao carregar dados dos clientes.</p>';
    }
}
