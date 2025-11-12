// js/ui/clients.js

import * as clientsApi from '../api/clients.js';
import * as establishmentApi from '../api/establishments.js';
import { state } from '../state.js';
import { showNotification, showConfirmation, showGenericModal } from '../components/modal.js'; // <-- NOVA IMPORTAÇÃO
import { navigateTo } from '../main.js'; // <-- NOVA IMPORTAÇÃO

const contentDiv = document.getElementById('content');
let allClientsData = [];
let loyaltySettings = {};
let currentClient = null;
let currentView = 'list'; // 'list' ou 'detail'
let activeFilterKey = 'all'; // Chave do filtro ativo na barra superior
let establishmentName = 'O Estabelecimento'; // NOVO: Variável para armazenar o nome do estabelecimento

// CONSTANTE ATUALIZADA: Mensagem padrão de WhatsApp para Aniversário
const BIRTHDAY_MESSAGE_TEMPLATE = (clientName, estName) => `Olá, ${clientName}! Nós da ${estName} desejamos a você um Feliz Aniversário! Esperamos que seu dia seja maravilhoso. Venha comemorar conosco! 🎉🎂`;

// NOVA CONSTANTE: Mensagem padrão de WhatsApp para Clientes Inativos
const INACTIVE_MESSAGE_TEMPLATE = (clientName, estName) => `Oi, ${clientName}! Faz um tempo que não te vemos aqui no(a) ${estName}. Sentimos sua falta! Temos novidades/ofertas especiais para você. Que tal agendar seu horário?`;

// NOVO CONSTANTE: Opções de dias para o filtro de inatividade
const INACTIVE_DAYS_OPTIONS = [
    { value: 30, label: '30 dias' },
    { value: 60, label: '60 dias' },
    { value: 90, label: '90 dias' },
    { value: 120, label: '120 dias' }
];

// Mock function para simular os dias desde o último agendamento (será substituído por dado real do backend)
function mockLastAppointmentDaysAgo() {
    // Retorna um valor aleatório entre 10 e 150 dias para simulação
    return Math.floor(Math.random() * 140) + 10;
}

// NOVA FUNÇÃO AUXILIAR: Verifica se o aniversário do cliente é hoje
function isClientBirthdayToday(client) {
    if (!client.dob) return false;
    const dobParts = client.dob.split('/');
    if (dobParts.length !== 2) return false;
    
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1; // getMonth() é 0-indexed

    const dobDay = parseInt(dobParts[0], 10);
    const dobMonth = parseInt(dobParts[1], 10);
    
    return dobDay === currentDay && dobMonth === currentMonth;
}

// NOVA DEFINIÇÃO: Nomes e valores dos meses para o seletor (99 para "Hoje")
const months = [
    { value: 99, label: 'Aniversariantes de Hoje' },
    { value: 0, label: 'Todos os meses (com DOB)' },
    { value: 1, label: 'Janeiro' },
    { value: 2, label: 'Fevereiro' },
    { value: 3, label: 'Março' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Maio' },
    { value: 6, label: 'Junho' },
    { value: 7, label: 'Julho' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Setembro' },
    { value: 10, label: 'Outubro' },
    { value: 11, label: 'Novembro' },
    { value: 12, label: 'Dezembro' }
];

// Função auxiliar para gerar as opções do select de meses
function getMonthOptionsHTML() {
    return months.map(month => {
        let selected = '';
        if (month.value === 99) {
            selected = 'selected';
        }
        return `<option value="${month.value}" ${selected}>${month.label}</option>`;
    }).join('');
}

// NOVA FUNÇÃO: Gera opções para o seletor de dias de inatividade
function getInactiveDaysOptionsHTML() {
    return INACTIVE_DAYS_OPTIONS.map(opt => {
        // Seleciona 90 dias por padrão
        const selected = opt.value === 90 ? 'selected' : ''; 
        return `<option value="${opt.value}" ${selected}>${opt.label}</option>`;
    }).join('');
}

// --- FUNÇÕES AUXILIARES (ÍCONES PARA ABAS) ---

// Função para renderizar ícones baseados no nome da aba
function getTabIcon(tabId, colorClass) {
    const defaultClasses = `w-5 h-5 ${colorClass} mr-2`;
    switch (tabId) {
        case 'cadastro':
            return `<svg xmlns="http://www.w3.org/2000/svg" class="${defaultClasses}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>`;
        case 'agendamentos':
            return `<svg xmlns="http://www.w3.org/2000/svg" class="${defaultClasses}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>`;
        case 'historico':
            // Ícone de Histórico/Atividade
            return `<svg xmlns="http://www.w3.org/2000/svg" class="${defaultClasses}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2h-2.586a1 1 0 00-.707.293l-1.414 1.414a1 1 0 01-1.414 0l-1.414-1.414A1 1 0 009.586 17H7a2 2 0 01-2-2v-2a2 2 0 012-2h12z" /></svg>`;
        case 'fidelidade':
            // Ícone de Crédito/Moeda
            return `<svg xmlns="http://www.w3.org/2000/svg" class="${defaultClasses}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z" /><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.5a9.5 9.5 0 1019 0 9.5 9.5 0 00-19 0z" /></svg>`;
        default:
            return '';
    }
}

// --- FUNÇÕES DE RENDERIZAÇÃO DA VISTA DE DETALHE (MODAL) ---

function renderDetailTabs(activeTab = 'cadastro') {
    const tabs = [
        { id: 'cadastro', label: 'Cadastro' },
        { id: 'agendamentos', label: 'Próximos Agend.' },
        { id: 'historico', label: 'Histórico' },
        { id: 'fidelidade', label: 'Fidelidade' }
    ];

    const tabContainer = document.getElementById('client-detail-tabs');
    if (!tabContainer) return;

    tabContainer.innerHTML = tabs.map(tab => {
        const isActive = activeTab === tab.id;
        const colorClass = isActive ? 'text-indigo-600' : 'text-gray-500';

        return `
            <button data-tab="${tab.id}" class="tab-btn whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm transition-colors flex items-center ${isActive ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}">
                ${getTabIcon(tab.id, colorClass)}
                ${tab.label}
            </button>
        `;
    }).join('');

    // Adiciona listeners de clique às abas
    tabContainer.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            renderDetailContent(button.dataset.tab);
        });
    });
}

async function renderDetailContent(tabId) {
    renderDetailTabs(tabId);
    const contentContainer = document.getElementById('client-detail-content');
    if (!contentContainer) return;

    // Coloca a aba como ativa e mostra o loader, mantendo a estrutura do formulário Cadastro
    contentContainer.innerHTML = '<form id="client-form" class="p-6 space-y-4"><div class="loader mx-auto my-8"></div></form>';

    switch (tabId) {
        case 'cadastro':
            contentContainer.innerHTML = renderCadastroTab(currentClient);
            break;
        case 'agendamentos':
        case 'historico':
            try {
                // As duas abas ('agendamentos' e 'historico') usam a mesma API, a diferença é o filtro de data.
                const allHistory = await clientsApi.getClientHistory(state.establishmentId, currentClient.name, currentClient.phone);
                contentContainer.innerHTML = renderHistoryTab(allHistory, tabId);
            } catch (error) {
                console.error("Erro ao carregar histórico do cliente:", error);
                contentContainer.innerHTML = `<form id="client-form" class="p-6 space-y-4"><p class="text-center text-red-500">Erro ao carregar o histórico: ${error.message}</p></form>`;
            }
            break;
        case 'fidelidade':
            const loyaltyHistory = await clientsApi.getClientLoyaltyHistory(state.establishmentId, currentClient.name, currentClient.phone);
            contentContainer.innerHTML = renderFidelidadeTab(currentClient, loyaltyHistory);
            break;
        default:
            contentContainer.innerHTML = `<form id="client-form" class="p-6 space-y-4"><p class="p-4 text-center text-gray-500">Secção não implementada.</p></form>`;
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
    // Normaliza a data de hoje para 00:00:00.000 para comparação correta
    today.setHours(0, 0, 0, 0); 
    const isAgendamentos = type === 'agendamentos';

    const filteredHistory = (history || []).filter(item => {
        // A data no item.date é uma string ISO (sem fuso horário)
        const itemDate = new Date(item.date); 
        
        // Se for "Agendamentos", mostra itens cuja data seja MAIOR ou IGUAL a hoje.
        if (isAgendamentos) {
            return itemDate >= today;
        } 
        // Se for "Histórico", mostra itens cuja data seja MENOR que hoje.
        else { 
            return itemDate < today;
        }
    });
    
    // ORDENAÇÃO: Agendamentos futuros (crescente); Histórico (decrescente)
    filteredHistory.sort((a, b) => {
        return isAgendamentos 
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime();
    });


    if (filteredHistory.length === 0) {
        return `<form id="client-form" class="p-6 space-y-4"><p class="p-4 text-center text-gray-500">${noDataMessage}</p></form>`;
    }

    return `
        <form id="client-form" class="p-6 space-y-4">
            <div class="space-y-3 max-h-96 overflow-y-auto">
                <h4 class="font-semibold text-lg mb-2">${title}</h4>
                ${filteredHistory.map(item => {
                    const isHistoric = new Date(item.date) < today; // Se for histórico (gasto já aconteceu)
                    return `
                        <div class="bg-gray-50 p-3 rounded-lg cursor-pointer flex justify-between items-center ${isHistoric ? 'hover:bg-indigo-50' : ''}"
                            data-action="${isHistoric ? 'open-comanda-from-history' : 'view-appointment'}" 
                            data-appointment-id="${item.id}"> 
                            
                            <div>
                                <p class="font-semibold text-gray-800">${item.serviceName}</p>
                                <p class="text-sm text-gray-500">${new Date(item.date).toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>

                            ${isHistoric ? `
                                <span class="text-xs font-semibold text-indigo-600">VER GASTOS</span>
                            ` : `
                                <span class="text-xs font-semibold text-green-600">VER DETALHES</span>
                            `}
                        </div>
                    `;
                }).join('')}
            </div>
        </form>
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
        <form id="client-form" class="p-6 space-y-4">
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
        </form>
    `;
}


// --- FUNÇÕES DE LÓGICA (ABRIR MODAL, SALVAR, APAGAR) ---

function openClientDetailModal(client) {
    currentClient = client;
    currentView = 'detail';
    const isEditing = client !== null;
    const title = isEditing ? 'Editar Cliente' : 'Adicionar Cliente';

    // Adiciona IDs aos botões para anexar listeners diretamente
    const modalContent = `
        <div class="flex flex-col h-full">
            <div id="client-detail-tabs" class="flex flex-row overflow-x-auto bg-gray-50 border-b border-gray-200">
                </div>
            
            <div id="client-detail-content" class="flex-1 overflow-y-auto">
                </div>
            
            <footer class="p-4 bg-gray-50 border-t flex justify-between items-center flex-shrink-0">
                ${isEditing ? `<button type="button" id="deleteClientBtn" data-action="delete-client" class="py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700">Excluir Cliente</button>` : '<div></div>'}
                <div class="flex gap-3">
                    <button type="button" id="cancelDetailViewBtn" data-action="close-detail-view" class="py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">Cancelar</button>
                    <button type="submit" form="client-form" data-action="save-client" class="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600">Salvar</button>
                </div>
            </footer>
        </div>
    `;
    
    // (NOVA) Lógica de Modal Responsivo
    const isMobile = window.innerWidth < 768; // Tailwind 'md' breakpoint
    const modalMaxWidth = isMobile ? 'max-w-full' : 'max-w-3xl';

    // (MODIFICADO) Utiliza showGenericModal com maxWidth dinâmico
    showGenericModal({
        title: title,
        contentHTML: modalContent,
        maxWidth: modalMaxWidth
    });
    
    // (NOVO) Se for mobile, força o modal a ter 100% de altura/sem bordas
    if (isMobile) {
        const modalElement = document.getElementById('genericModal');
        if (modalElement) {
            // Encontra a "caixa" do modal (assumindo que é o div com a classe maxWidth)
            const modalBox = modalElement.querySelector(`.${modalMaxWidth.replace(':', '\\:')}`);
            if (modalBox) {
                modalBox.style.height = '100vh'; // Ocupa a altura toda
                modalBox.style.maxHeight = '100vh';
                modalBox.style.borderRadius = '0'; // Remove bordas arredondadas
            }
        }
    }
    
    // Renderiza o conteúdo inicial (Cadastro)
    renderDetailContent('cadastro');

    // Anexa o listener de submit ao formulário DEPOIS que o modal é renderizado.
    const form = document.getElementById('client-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleSaveClient();
        });
    }
    
    const cancelBtn = document.getElementById('cancelDetailViewBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('genericModal').style.display = 'none';
            loadClientsPage();
        });
    }
    
    const deleteBtn = document.getElementById('deleteClientBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', async () => {
            await handleDeleteClient();
        });
    }
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
        document.getElementById('genericModal').style.display = 'none';
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
            document.getElementById('genericModal').style.display = 'none';
            await loadClientsPage();
        } catch (error) {
            showNotification('Erro', `Não foi possível excluir: ${error.message}`, 'error');
        }
    }
}

// --- FUNÇÃO PRINCIPAL E CARREGAMENTO DA PÁGINA ---

// (MODIFICADO) Renderiza a lista de clientes com cards responsivos
function renderClientListWithFilters(filteredClients, totalClients) {
    const listDiv = document.getElementById('clientsList');
    if (!listDiv) return;

    listDiv.innerHTML = '';
    document.getElementById('client-count').textContent = `${filteredClients.length} cliente${filteredClients.length !== 1 ? 's' : ''} | Total: ${totalClients}`;

    if (filteredClients.length > 0) {
        
        const isInactiveFilterActive = activeFilterKey === 'inactive';
        const isBirthdayFilterActive = activeFilterKey === 'birthdays';

        filteredClients.forEach(client => {
            const clientCard = document.createElement('div');
            // (MODIFICADO) O card agora é flex-col por padrão
            clientCard.className = `client-card bg-white rounded-lg shadow p-4 flex flex-col cursor-pointer`;
            clientCard.dataset.clientId = client.id;
            
            const balance = client.loyaltyPoints || 0;
            // (MODIFICADO) Formato do saldo
            const balanceText = loyaltySettings.enabled ? `${balance} pts` : `R$ ${balance.toFixed(2)}`;

            // Lógica do WhatsApp (Original)
            let whatsappButton = '';
            const cleanedPhone = client.phone ? client.phone.replace(/\D/g, '') : '';
            const whatsappLinkBase = `https://wa.me/55${cleanedPhone}?text=`;
            
            if (isInactiveFilterActive) {
                const whatsappMessage = encodeURIComponent(INACTIVE_MESSAGE_TEMPLATE(client.name, establishmentName));
                whatsappButton = `
                    <a href="${whatsappLinkBase + whatsappMessage}" target="_blank" title="Enviar Mensagem de Recuperação (WhatsApp)" class="text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-full flex-shrink-0 ml-2 shadow-md">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                    </a>`;
            } else if (isBirthdayFilterActive) {
                const isTodayBirthday = isClientBirthdayToday(client);
                if (isTodayBirthday) {
                    const whatsappMessage = encodeURIComponent(BIRTHDAY_MESSAGE_TEMPLATE(client.name, establishmentName));
                    whatsappButton = `
                        <a href="${whatsappLinkBase + whatsappMessage}" target="_blank" title="Enviar Parabéns por WhatsApp" class="text-white bg-green-500 hover:bg-green-600 p-2 rounded-full flex-shrink-0 ml-2 shadow-md">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c1.333 0 2-1 2-2s-.667-2-2-2-2 1-2 2 .667 2 2 2zM2 15h20M7 15l2 6h6l2-6M7 15a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2"/></svg>
                        </a>`;
                }
            }

            // --- (NOVO) HTML do Card Responsivo ---
            clientCard.innerHTML = `
                <div class="flex items-center mb-3">
                    <div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl flex-shrink-0">
                        ${client.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="ml-4 flex-grow min-w-0">
                        <p class="font-bold text-gray-800 truncate">${client.name}</p>
                        <p class="text-sm text-gray-500 md:hidden">${client.phone}</p>
                    </div>
                    ${whatsappButton}
                </div>
                
                <div class="flex md:grid md:grid-cols-[1fr_1fr_3rem] items-center text-sm pt-2 border-t">
                    <div class="flex-1 md:w-auto">
                        <span class="font-semibold text-gray-700">Saldo/Pontos:</span>
                        <span class="font-bold text-indigo-600 ml-1">${balanceText}</span>
                    </div>
                    <div class="hidden md:flex justify-start md:justify-end items-center">
                        <span class="font-semibold text-gray-700">Telefone:</span>
                        <span class="text-gray-600 ml-1">${client.phone}</span>
                    </div>
                    <button class="text-gray-500 hover:text-indigo-600 p-1 rounded-full justify-self-end ml-2 md:ml-0" title="Ação">
                         <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M18 12a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
                    </button>
                </div>
            `;
            // --- Fim do Card ---

            clientCard.addEventListener('click', () => openClientDetailModal(client));
            listDiv.appendChild(clientCard);
        });
    } else {
        listDiv.innerHTML = `<p class="col-span-full text-center text-gray-500">Nenhum cliente encontrado com os filtros aplicados.</p>`;
    }
}

// (MODIFICADO) Lógica de Filtragem (lê os selects corretos)
function getFilteredClients(searchTerm = '', filterKey = 'all') {
    const term = searchTerm.toLowerCase();
    const isSearching = term.length > 0;
    
    let selectedMonth = 0;
    let selectedDays = 90;
    
    // (NOVO) Detecta se está em ecrã mobile
    const isMobile = window.innerWidth < 768;
    
    if (filterKey === 'birthdays') {
        // (MODIFICADO) Lê o ID do select correto (mobile ou desktop)
        const selectId = isMobile ? 'mobileBirthMonthFilter' : 'birthMonthFilter';
        const monthSelect = document.getElementById(selectId);
        if (monthSelect) {
            selectedMonth = parseInt(monthSelect.value, 10);
        }
    } else if (filterKey === 'inactive') {
        // (MODIFICADO) Lê o ID do select correto (mobile ou desktop)
        const selectId = isMobile ? 'mobileInactiveDaysFilter' : 'inactiveDaysFilter';
        const daysSelect = document.getElementById(selectId);
        if (daysSelect) {
            selectedDays = parseInt(daysSelect.value, 10);
        }
    }

    // 1. Filtrar por termo de pesquisa
    let filteredBySearch = allClientsData.filter(c => 
        !isSearching || c.name.toLowerCase().includes(term) || (c.phone || '').includes(term)
    );
    
    // 2. Aplicar filtro de chave (Lógica original)
    switch (filterKey) {
        case 'birthdays':
            const today = new Date();
            const currentDay = today.getDate();
            const currentMonth = today.getMonth() + 1;
            
            return filteredBySearch.filter(c => {
                if (!c.dob) return false;
                const dobParts = c.dob.split('/');
                if (dobParts.length !== 2) return false;
                const dobDay = parseInt(dobParts[0], 10);
                const dobMonth = parseInt(dobParts[1], 10);
                
                if (selectedMonth === 99) {
                     return dobDay === currentDay && dobMonth === currentMonth;
                } else if (selectedMonth === 0) {
                     return dobMonth >= 1 && dobMonth <= 12;
                } else {
                    return dobMonth === selectedMonth;
                }
            });
            
        case 'inactive':
            return filteredBySearch.filter(c => {
                // (Lembre-se da nossa conversa anterior sobre 'lastAppointmentDaysAgo' vs 'lastService')
                // Esta lógica usa a simulação até o backend ser ajustado.
                const daysAgo = c.lastAppointmentDaysAgo || mockLastAppointmentDaysAgo(); 
                return daysAgo > selectedDays;
            });
            
        case 'scheduled':
            return filteredBySearch.filter(c => c.loyaltyPoints > 50); // Simulação
        case 'credit':
            return filteredBySearch.filter(c => (c.loyaltyPoints || 0) > 0); // Simulação
        case 'debit':
            return filteredBySearch.filter(c => false);
        case 'package':
            return filteredBySearch.filter(c => false); 
        case 'all':
        default:
            return filteredBySearch;
    }
}

// (MODIFICADO) Atualiza ambos os menus de filtro (desktop e mobile)
async function handleFilterClick(newFilterKey) {
    
    // (MODIFICADO) Referências para os containers de select (desktop E mobile)
    const monthFilterContainer = document.getElementById('birthMonthFilterContainer');
    const mobileMonthFilterContainer = document.getElementById('mobileBirthMonthFilterContainer');
    const daysFilterContainer = document.getElementById('inactiveDaysFilterContainer');
    const mobileDaysFilterContainer = document.getElementById('mobileInactiveDaysFilterContainer');
    
    // 1. Gerenciar a visibilidade dos seletores (em ambos os menus)
    if (newFilterKey === 'birthdays') {
        monthFilterContainer?.classList.remove('hidden');
        mobileMonthFilterContainer?.classList.remove('hidden'); // (NOVO)
        daysFilterContainer?.classList.add('hidden');
        mobileDaysFilterContainer?.classList.add('hidden'); // (NOVO)
        
        if (activeFilterKey !== 'birthdays') {
            // Força 'Hoje' no desktop
            const monthSelect = document.getElementById('birthMonthFilter');
            if (monthSelect) monthSelect.value = 99;
            // Força 'Hoje' no mobile
            const mobileMonthSelect = document.getElementById('mobileBirthMonthFilter');
            if (mobileMonthSelect) mobileMonthSelect.value = 99;
        }

    } else if (newFilterKey === 'inactive') {
        daysFilterContainer?.classList.remove('hidden');
        mobileDaysFilterContainer?.classList.remove('hidden'); // (NOVO)
        monthFilterContainer?.classList.add('hidden');
        mobileMonthFilterContainer?.classList.add('hidden'); // (NOVO)

        if (activeFilterKey !== 'inactive') {
             // Força '90 dias' no desktop
            const daysSelect = document.getElementById('inactiveDaysFilter');
            if (daysSelect) daysSelect.value = 90;
            // Força '90 dias' no mobile
            const mobileDaysSelect = document.getElementById('mobileInactiveDaysFilter');
            if (mobileDaysSelect) mobileDaysSelect.value = 90;
        }
    } else {
        monthFilterContainer?.classList.add('hidden');
        mobileMonthFilterContainer?.classList.add('hidden'); // (NOVO)
        daysFilterContainer?.classList.add('hidden');
        mobileDaysFilterContainer?.classList.add('hidden'); // (NOVO)
    }

    if (activeFilterKey === newFilterKey && newFilterKey !== 'birthdays' && newFilterKey !== 'inactive') return;
    
    activeFilterKey = newFilterKey;
    
    // 2. Atualiza o estilo de TODOS os botões de filtro (desktop e mobile)
    document.querySelectorAll('.client-filter-btn').forEach(btn => {
        btn.classList.remove('bg-white', 'text-indigo-600', 'shadow');
        btn.classList.add('bg-gray-100', 'text-gray-600');
    });
    
    const activeBtns = document.querySelectorAll(`[data-filter-key="${newFilterKey}"]`);
    activeBtns.forEach(activeBtn => {
        if (activeBtn) {
            activeBtn.classList.remove('bg-gray-100', 'text-gray-600');
            activeBtn.classList.add('bg-white', 'text-indigo-600', 'shadow');
        }
    });

    const searchTerm = document.getElementById('clientSearchInput').value;
    const filtered = getFilteredClients(searchTerm, activeFilterKey);
    renderClientListWithFilters(filtered, allClientsData.length);
}

// (MODIFICADO) Esta é a função principal, agora com o HTML e lógica de filtro atualizados
export async function loadClientsPage() {
    currentView = 'list';
    
    // --- (NOVO) HTML Otimizado para Mobile ---
    contentDiv.innerHTML = `
        <section id="client-list-view" class="flex flex-col h-full">
            
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 bg-white md:bg-transparent md:shadow-none shadow-sm">
                <div class="flex-grow">
                    <input type="text" id="clientSearchInput" placeholder="Pesquisar por nome ou telefone..." class="w-full p-3 border border-gray-300 rounded-lg text-sm">
                </div>
                <div class="flex gap-2">
                    <button id="openFilterSheetBtn" class="flex-1 md:hidden py-3 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                        Filtros
                    </button>
                    <button data-action="new-client" class="flex-1 py-3 px-4 bg-green-100 text-green-700 font-semibold rounded-lg hover:bg-green-200 flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                        <span class="hidden md:inline">Adicionar cliente</span>
                    </button>
                    <button data-action="print-list" class="hidden md:flex py-3 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 whitespace-nowrap items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m0 0v2a2 2 0 002 2h6a2 2 0 002-2v-2M9 17h6" /></svg>
                        Imprimir
                    </button>
                </div>
            </div>

            <div id="desktop-filter-bar" class="hidden md:flex flex-wrap gap-2 p-4 bg-gray-100 border-b">
                <button data-filter-key="all" class="client-filter-btn bg-white text-indigo-600 shadow font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                     <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    Total de clientes
                </button>
                <button data-filter-key="scheduled" class="client-filter-btn bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                     <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    Agendados
                </button>
                <button data-filter-key="credit" class="client-filter-btn bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z" /><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.5a9.5 9.5 0 1019 0 9.5 9.5 0 00-19 0z" /></svg>
                    Clientes com crédito
                </button>
                <div class="flex items-center gap-2">
                    <button data-filter-key="birthdays" class="client-filter-btn bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c1.333 0 2-1 2-2s-.667-2-2-2-2 1-2 2 .667 2 2 2zM2 15h20M7 15l2 6h6l2-6M7 15a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2"/></svg>
                        Aniversariantes
                    </button>
                    <span id="birthMonthFilterContainer" class="hidden">
                        <select id="birthMonthFilter" class="p-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 font-semibold shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                            ${getMonthOptionsHTML()}
                        </select>
                    </span>
                </div>
                <div class="flex items-center gap-2">
                    <button data-filter-key="inactive" class="client-filter-btn bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Clientes Inativos
                    </button>
                    <span id="inactiveDaysFilterContainer" class="hidden">
                        <select id="inactiveDaysFilter" class="p-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 font-semibold shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                            ${getInactiveDaysOptionsHTML()}
                        </select>
                    </span>
                </div>
                <button data-filter-key="debit" class="client-filter-btn bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                    Clientes em débito
                </button>
                <button data-filter-key="package" class="client-filter-btn bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                    Clientes com pacote
                </button>
            </div>
            
            <div class="px-4 md:px-1">
                <p id="client-count" class="text-sm text-gray-500 my-4">A carregar clientes...</p>
            </div>
            
            <div class="hidden md:grid grid-cols-[3rem_2fr_1fr_1fr_3rem] gap-4 p-2 font-semibold text-xs text-gray-500 uppercase border-b mb-3">
                <span>Foto</span>
                <span>Nome</span>
                <span>Saldo/Pontos</span>
                <span>Telefone</span>
                <span>Ação</span>
            </div>

            <div id="clientsList" class="flex-1 overflow-y-auto space-y-3 p-2 md:p-0">
                <div class="loader col-span-full mx-auto"></div>
            </div>
        </section>

        <div id="filter-overlay" class="fixed inset-0 bg-black bg-opacity-50 hidden" style="z-index: 39;"></div>
        
        <div id="filter-sheet" class="fixed bottom-0 left-0 right-0 p-4 bg-white rounded-t-2xl shadow-lg" style="z-index: 40;">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-bold text-gray-800">Filtrar por</h3>
                <button id="closeFilterSheetBtn" class="text-gray-500 hover:text-gray-800">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            <div id="mobile-filter-list" class="space-y-2 max-h-[60vh] overflow-y-auto">
                <button data-filter-key="all" class="client-filter-btn bg-white text-indigo-600 shadow font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                     <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    Total de clientes
                </button>
                <button data-filter-key="scheduled" class="client-filter-btn bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                     <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    Agendados
                </button>
                <button data-filter-key="credit" class="client-filter-btn bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z" /><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.5a9.5 9.5 0 1019 0 9.5 9.5 0 00-19 0z" /></svg>
                    Clientes com crédito
                </button>
                <div class="flex items-center gap-2">
                    <button data-filter-key="birthdays" class="client-filter-btn bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c1.333 0 2-1 2-2s-.667-2-2-2-2 1-2 2 .667 2 2 2zM2 15h20M7 15l2 6h6l2-6M7 15a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2"/></svg>
                        Aniversariantes
                    </button>
                    <span id="mobileBirthMonthFilterContainer" class="hidden">
                        <select id="mobileBirthMonthFilter" class="p-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 font-semibold shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                            ${getMonthOptionsHTML()}
                        </select>
                    </span>
                </div>
                <div class="flex items-center gap-2">
                    <button data-filter-key="inactive" class="client-filter-btn bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Clientes Inativos
                    </button>
                    <span id="mobileInactiveDaysFilterContainer" class="hidden">
                        <select id="mobileInactiveDaysFilter" class="p-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 font-semibold shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                            ${getInactiveDaysOptionsHTML()}
                        </select>
                    </span>
                </div>
                <button data-filter-key="debit" class="client-filter-btn bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                    Clientes em débito
                </button>
                <button data-filter-key="package" class="client-filter-btn bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                    Clientes com pacote
                </button>
            </div>
        </div>
    `;

    try {
        const [clients, establishmentData] = await Promise.all([
            clientsApi.getClients(state.establishmentId),
            establishmentApi.getEstablishmentDetails(state.establishmentId)
        ]);
        allClientsData = clients;
        loyaltySettings = establishmentData.loyaltyProgram || { enabled: false };
        establishmentName = establishmentData.name || 'O Estabelecimento'; // NOVO: Salva o nome do estabelecimento.
        
        // Aplica o filtro inicial
        const initialFiltered = getFilteredClients('', activeFilterKey);
        renderClientListWithFilters(initialFiltered, allClientsData.length);

    } catch (error) {
        document.getElementById('clientsList').innerHTML = '<p class="text-red-500 col-span-full text-center">Erro ao carregar dados dos clientes.</p>';
    }

    // --- (NOVA) LÓGICA DO BOTTOM SHEET E FILTROS ---
    
    // Referências aos elementos do sheet
    const filterSheet = document.getElementById('filter-sheet');
    const filterOverlay = document.getElementById('filter-overlay');
    const openFilterBtn = document.getElementById('openFilterSheetBtn');
    const closeFilterBtn = document.getElementById('closeFilterSheetBtn');

    // Funções para abrir/fechar
    const openSheet = () => {
        filterSheet.classList.add('show');
        filterOverlay.classList.remove('hidden');
    };
    const closeSheet = () => {
        filterSheet.classList.remove('show');
        filterOverlay.classList.add('hidden');
    };

    // Listeners para abrir/fechar
    if(openFilterBtn) openFilterBtn.addEventListener('click', openSheet);
    if(closeFilterBtn) closeFilterBtn.addEventListener('click', closeSheet);
    if(filterOverlay) filterOverlay.addEventListener('click', closeSheet);

    // (NOVO) Handler de clique genérico para filtros
    const filterClickHandler = (e) => {
        const filterBtn = e.target.closest('.client-filter-btn');
        if (filterBtn) {
            handleFilterClick(filterBtn.dataset.filterKey);
            // Fecha o sheet se estiver em mobile
            if (window.innerWidth < 768) closeSheet();
        }
    };

    // (MODIFICADO) Anexa o handler aos DOIS containers de filtro
    const desktopFilterBar = document.getElementById('desktop-filter-bar');
    const mobileFilterList = document.getElementById('mobile-filter-list');
    
    if (desktopFilterBar) desktopFilterBar.addEventListener('click', filterClickHandler);
    if (mobileFilterList) mobileFilterList.addEventListener('click', filterClickHandler);

    // (NOVO) Função para configurar listeners de selects (para ambos os menus)
    const setupSelectListener = (selectId) => {
        const select = document.getElementById(selectId);
        if (select) {
            select.addEventListener('change', () => {
                // Se o filtro relevante (aniversário ou inativo) estiver ativo, refiltra
                if (activeFilterKey === 'birthdays' || activeFilterKey === 'inactive') {
                    const searchTerm = document.getElementById('clientSearchInput').value;
                    const filtered = getFilteredClients(searchTerm, activeFilterKey);
                    renderClientListWithFilters(filtered, allClientsData.length);
                }
            });
        }
    };

    // (MODIFICADO) Configura os listeners para os 4 selects
    setupSelectListener('birthMonthFilter');
    setupSelectListener('mobileBirthMonthFilter');
    setupSelectListener('inactiveDaysFilter');
    setupSelectListener('mobileInactiveDaysFilter');

    // --- (FIM DA NOVA LÓGICA) ---


    // --- GESTOR DE EVENTOS GLOBAL DA PÁGINA (Original, mas modificado) ---
    
    contentDiv.addEventListener('click', async (e) => {
        const actionTarget = e.target.closest('[data-action]');
        const cardTarget = e.target.closest('.client-card');

        if (currentView === 'list') {
            if (actionTarget) {
                const action = actionTarget.dataset.action;
                if (action === 'new-client') {
                    openClientDetailModal(null);
                } else if (action === 'print-list') {
                    window.print();
                }
            } else if (cardTarget) {
                const clientId = cardTarget.dataset.clientId;
                const client = allClientsData.find(c => c.id === clientId);
                if (client) {
                    openClientDetailModal(client);
                }
            }
        } else if (currentView === 'detail') {
            if (actionTarget) {
                const action = actionTarget.dataset.action;
                switch (action) {
                    case 'save-client':
                        // O submit do formulário já chama handleSaveClient
                        break;
                    case 'redeem-reward':
                        const points = parseInt(actionTarget.dataset.points, 10);
                        const reward = actionTarget.dataset.reward;
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
                        break;
                    case 'open-comanda-from-history': { // <-- NOVO: Abre Comanda do Histórico
                        const apptId = actionTarget.dataset.appointmentId;
                        if (apptId) {
                            // 1. Fechat o modal de clientes
                            document.getElementById('genericModal').style.display = 'none';
                            
                            // 2. Navega para a seção Comandas, passando o ID e o filtro 'finalizada'
                            navigateTo('comandas-section', { 
                                selectedAppointmentId: apptId, 
                                initialFilter: 'finalizada'
                            });
                        }
                        break;
                    }
                }
            }
        }
    });


    contentDiv.addEventListener('input', (e) => {
        if (e.target.id === 'clientSearchInput') {
            const searchTerm = e.target.value;
            const filtered = getFilteredClients(searchTerm, activeFilterKey);
            renderClientListWithFilters(filtered, allClientsData.length);
        }
    });
}