// js/ui/clients.js

import * as clientsApi from '../api/clients.js';
import * as establishmentApi from '../api/establishments.js';
import { state } from '../state.js';
import { showNotification, showConfirmation, showGenericModal } from '../components/modal.js';
import { navigateTo } from '../main.js';
import { escapeHTML } from '../utils.js';

// --- ESTADO GLOBAL DA TELA ---
const contentDiv = document.getElementById('content');
let allClientsData = [];
let loyaltySettings = {};
let currentClient = null; // Cliente sendo visualizado no modal
let currentView = 'list'; // [CORREÇÃO] Variável reintroduzida para evitar o erro
let activeFilterKey = 'all'; 
let establishmentName = 'O Estabelecimento';

// Paginação e Seleção
let currentPage = 1;
const itemsPerPage = 20;
let selectedClientIds = new Set(); // IDs reais dos clientes selecionados

// CONSTANTE: Valor padrão para evitar divisão por zero
const DEFAULT_POINTS_DIVISOR = 1;

// Mensagens padrão de WhatsApp
const BIRTHDAY_MESSAGE_TEMPLATE = (clientName, estName) => `Olá, ${clientName}! Nós da ${estName} desejamos a você um Feliz Aniversário! Esperamos que seu dia seja maravilhoso. Venha comemorar conosco! 🎉🎂`;
const INACTIVE_MESSAGE_TEMPLATE = (clientName, estName) => `Oi, ${clientName}! Faz um tempo que não te vemos aqui no(a) ${estName}. Sentimos sua falta! Temos novidades/ofertas especiais para você. Que tal agendar seu horário?`;

const INACTIVE_DAYS_OPTIONS = [
    { value: 30, label: '30 dias' },
    { value: 60, label: '60 dias' },
    { value: 90, label: '90 dias' },
    { value: 120, label: '120 dias' }
];

function mockLastAppointmentDaysAgo() {
    return Math.floor(Math.random() * 140) + 10;
}

// --- FUNÇÃO DE FORMATAÇÃO DE TELEFONE (VISUAL) ---
function formatPhone(phone) {
    if (!phone) return '';
    const value = String(phone).replace(/\D/g, "");
    
    // Formata como (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
    if (value.length > 11) return value.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    if (value.length > 10) return value.replace(/^(\d\d)(\d{5})(\d{4})/, "($1) $2-$3");
    if (value.length > 6) return value.replace(/^(\d\d)(\d{4})(\d{0,4})/, "($1) $2-$3");
    if (value.length > 2) return value.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    
    // Se não conseguir formatar mas tiver valor, retorna o original para não sumir
    return value || phone;
}

function isClientBirthdayToday(client) {
    if (!client.dob) return false;
    const dobParts = client.dob.split('/');
    if (dobParts.length !== 2) return false;
    
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;

    const dobDay = parseInt(dobParts[0], 10);
    const dobMonth = parseInt(dobParts[1], 10);
    
    return dobDay === currentDay && dobMonth === currentMonth;
}

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

function getMonthOptionsHTML() {
    return months.map(month => {
        let selected = month.value === 99 ? 'selected' : '';
        return `<option value="${month.value}" ${selected}>${month.label}</option>`;
    }).join('');
}

function getInactiveDaysOptionsHTML() {
    return INACTIVE_DAYS_OPTIONS.map(opt => {
        const selected = opt.value === 90 ? 'selected' : ''; 
        return `<option value="${opt.value}" ${selected}>${opt.label}</option>`;
    }).join('');
}

// --- FUNÇÃO DE CÁLCULO DE VALOR ---
const formatCurrency = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? 'R$ 0,00' : num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

function getItemTotalValue(item) {
    if (!item) return 0;
    let total = 0;
    if (item.totalAmount !== undefined && item.totalAmount !== null) total = parseFloat(item.totalAmount);
    else if (item.value !== undefined && item.value !== null) total = parseFloat(item.value);
    else if (item.price !== undefined && item.price !== null && !Array.isArray(item.price)) total = parseFloat(item.price);

    if (!total || total === 0) {
        let calculatedSum = 0;
        if (item.services && Array.isArray(item.services)) {
            calculatedSum += item.services.reduce((acc, s) => {
                const price = parseFloat(s.price) || parseFloat(s.servicePrice) || 0;
                return acc + price;
            }, 0);
        }
        const itemsArr = item.comandaItems || item.items;
        if (itemsArr && Array.isArray(itemsArr)) {
            calculatedSum += itemsArr.reduce((acc, i) => {
                const price = parseFloat(i.price) || 0;
                const qty = parseInt(i.quantity) || 1;
                return acc + (price * qty);
            }, 0);
        }
        if (calculatedSum > 0) total = calculatedSum;
    }
    return isNaN(total) ? 0 : total;
}

// Normaliza os dados para exibição padronizada
function normalizeHistoryItem(item) {
    // Tenta encontrar o nome do serviço ou resumo
    const service = item.serviceName || item.summary || item.description || 'Serviço/Venda';
    // Tenta encontrar o profissional
    const professional = item.professionalName || item.professional || item.employeeName || '---';

    // Data e Hora
    const dateObj = new Date(item.date || item.startTime || item.createdAt);
    const dateStr = dateObj.toLocaleDateString('pt-BR');
    const timeStr = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    // Status Normalizado
    const statusRaw = (item.status || '').toLowerCase();
    let statusType = 'neutral';
    
    if (['completed', 'paid', 'finalized', 'finished'].includes(statusRaw)) {
        statusType = 'success';
    } else if (['scheduled', 'confirmed', 'pending'].includes(statusRaw)) {
        statusType = 'warning';
    } else if (['cancelled', 'canceled'].includes(statusRaw)) {
        statusType = 'error';
    }

    return {
        id: item.id,
        rawDate: dateObj,
        displayDate: dateStr,
        displayTime: timeStr,
        serviceName: service,
        professionalName: professional,
        totalValue: getItemTotalValue(item),
        status: statusRaw,
        statusType: statusType
    };
}


// --- LÓGICA DE FIDELIDADE ---

function calculateLoyaltyStats(salesHistory, loyaltyHistory) {
    // 1. Calcula Pontos Ganhos (Apenas finalizados)
    const validSales = (salesHistory || []).filter(s => {
        const nItem = normalizeHistoryItem(s);
        return nItem.statusType === 'success';
    });
    
    let totalSpent = 0;
    validSales.forEach(sale => {
        totalSpent += getItemTotalValue(sale);
    });

    let moneyPerPoint = (loyaltySettings && loyaltySettings.conversionRate) ? parseFloat(loyaltySettings.conversionRate) : DEFAULT_POINTS_DIVISOR;
    if (moneyPerPoint <= 0) moneyPerPoint = 1;

    const totalPointsEarned = Math.floor(totalSpent / moneyPerPoint);

    // 2. Calcula Pontos Gastos (Resgates)
    let totalPointsRedeemed = 0;
    (loyaltyHistory || []).forEach(log => {
        if (log.type === 'redeem') {
            totalPointsRedeemed += (log.points ? Math.abs(log.points) : 0);
        }
    });

    const currentBalance = totalPointsEarned - totalPointsRedeemed;

    return { totalSpent, totalPointsEarned, totalPointsRedeemed, currentBalance, moneyPerPoint };
}

// Sincroniza saldo com o banco
async function syncLoyaltyPoints(client, salesHistory, loyaltyHistory) {
    if (!loyaltySettings || !loyaltySettings.enabled) return null;

    const stats = calculateLoyaltyStats(salesHistory, loyaltyHistory);
    const storedPoints = parseInt(client.loyaltyPoints || 0);

    if (storedPoints !== stats.currentBalance) {
        console.log(`[Auto-Sync] ${client.name}: ${storedPoints} -> ${stats.currentBalance}`);
        
        client.loyaltyPoints = stats.currentBalance;
        client.totalSpent = stats.totalSpent;
        
        // Atualiza UI da lista
        const idx = allClientsData.findIndex(c => c.id === client.id);
        if (idx >= 0) allClientsData[idx].loyaltyPoints = stats.currentBalance;

        // Atualiza Banco
        clientsApi.updateClient(client.id, { loyaltyPoints: stats.currentBalance }).catch(console.error);
    }
    return stats;
}


// --- MODAL DE DETALHES DO CLIENTE ---

// Expor função globalmente para ser chamada pelo HTML string
window.openClientModal = async (client) => {
    currentClient = client;
    const isNew = !client;
    
    const modalHTML = `
        <div class="flex flex-col h-[85vh] md:h-full bg-gray-50 overflow-hidden">
            <div class="bg-white border-b px-6 py-4 flex justify-between items-center flex-shrink-0">
                <div>
                    <h2 class="text-xl font-bold text-gray-800">${isNew ? 'Novo Cliente' : client.name}</h2>
                    ${!isNew ? `<p class="text-sm text-gray-500">${formatPhone(client.phone)}</p>` : ''}
                </div>
                ${!isNew ? `
                <div class="flex gap-2">
                    <span class="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                         ★ <span id="header-points-display" class="ml-1">...</span> pts
                    </span>
                </div>` : ''}
            </div>

            <div class="flex bg-white border-b overflow-x-auto flex-shrink-0" id="modal-tabs-header">
                ${['Perfil', 'Agendamentos', 'Histórico', 'Fidelidade'].map((tab, i) => `
                    <button onclick="switchModalTab('${i}')" 
                        class="modal-tab-btn flex-1 py-3 px-4 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-indigo-600 whitespace-nowrap transition-colors"
                        data-index="${i}">
                        ${tab}
                    </button>
                `).join('')}
            </div>

            <div id="modal-tab-content" class="flex-1 overflow-y-auto p-4 md:p-6">
                <div class="loader mx-auto mt-10"></div>
            </div>

            <footer class="bg-white border-t p-4 flex justify-between items-center flex-shrink-0">
                ${!isNew ? `
                <button id="btn-delete-client" class="text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    Excluir
                </button>` : '<div></div>'}
                
                <div class="flex gap-3">
                    <button class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 text-sm" onclick="document.getElementById('genericModal').style.display='none'">Fechar</button>
                    <button id="btn-save-client" class="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 shadow-sm text-sm">Salvar</button>
                </div>
            </footer>
        </div>
    `;

    showGenericModal({ 
        title: null, 
        contentHTML: modalHTML,
        maxWidth: 'max-w-4xl' 
    });

    const modalBox = document.querySelector('#genericModal > div');
    if (modalBox) {
        modalBox.classList.remove('p-6'); 
        modalBox.classList.add('rounded-xl', 'overflow-hidden');
    }

    // Carregamento de Dados
    let salesHistory = [];
    let loyaltyHistory = [];
    let stats = null;

    if (!isNew) {
        try {
            [salesHistory, loyaltyHistory] = await Promise.all([
                clientsApi.getClientHistory(state.establishmentId, client.name, client.phone),
                loyaltySettings.enabled ? clientsApi.getClientLoyaltyHistory(state.establishmentId, client.name, client.phone) : []
            ]);

            stats = await syncLoyaltyPoints(client, salesHistory, loyaltyHistory);
            
            const headerPoints = document.getElementById('header-points-display');
            if(headerPoints && stats) headerPoints.textContent = stats.currentBalance;

        } catch (e) {
            console.error("Erro ao carregar dados", e);
        }
    }

    // Função de Troca de Aba
    window.switchModalTab = (index) => {
        const idx = parseInt(index);
        
        document.querySelectorAll('.modal-tab-btn').forEach(btn => {
            btn.classList.remove('border-indigo-600', 'text-indigo-600');
            btn.classList.add('border-transparent', 'text-gray-500');
        });
        const activeBtn = document.querySelector(`.modal-tab-btn[data-index="${idx}"]`);
        if(activeBtn) {
            activeBtn.classList.remove('border-transparent', 'text-gray-500');
            activeBtn.classList.add('border-indigo-600', 'text-indigo-600');
        }

        const container = document.getElementById('modal-tab-content');
        container.innerHTML = '';

        if (idx === 0) renderProfileTab(container, client);
        else if (idx === 1) renderAppointmentsTab(container, salesHistory);
        else if (idx === 2) renderHistoryTab(container, salesHistory);
        else if (idx === 3) renderLoyaltyTab(container, stats, salesHistory, loyaltyHistory);
    };

    window.switchModalTab(isNew ? 0 : 1);

    const btnSave = document.getElementById('btn-save-client');
    if(btnSave) btnSave.onclick = handleSaveClient;

    const btnDelete = document.getElementById('btn-delete-client');
    if(btnDelete) btnDelete.onclick = handleDeleteClient;
}


// --- ABAS DO MODAL ---

function renderProfileTab(container, client) {
    const safeName = escapeHTML(client?.name || '');
    const safeEmail = escapeHTML(client?.email || '');
    const safePhone = formatPhone(client?.phone || '');
    const safeNotes = escapeHTML(client?.notes || '');
    const dob = client?.dob ? client.dob.split('/') : ['',''];
    const isEditing = !!client?.id;

    container.innerHTML = `
        <form id="client-form" class="space-y-5 max-w-2xl mx-auto">
            <input type="hidden" id="clientId" value="${client?.id || ''}">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Nome Completo</label>
                    <input type="text" id="clientName" value="${safeName}" class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required>
                </div>
                
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">WhatsApp / Celular</label>
                    <input type="tel" id="clientPhone" value="${safePhone}" 
                        class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${isEditing ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}" 
                        ${isEditing ? 'disabled' : ''} required placeholder="(00) 00000-0000">
                    ${isEditing ? '<p class="text-[10px] text-gray-500 mt-1">O ID é o telefone e não pode ser alterado.</p>' : ''}
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">E-mail (Opcional)</label>
                    <input type="email" id="clientEmail" value="${safeEmail}" class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">Dia Nasc.</label>
                        <input type="number" id="clientDobDay" value="${dob[0]}" min="1" max="31" class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">Mês</label>
                        <input type="number" id="clientDobMonth" value="${dob[1]}" min="1" max="12" class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                    </div>
                </div>
            </div>

            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Observações Internas</label>
                <textarea id="clientNotes" rows="4" class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">${safeNotes}</textarea>
            </div>
        </form>
    `;

    const phoneInput = document.getElementById('clientPhone');
    if (phoneInput && !isEditing) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = formatPhone(e.target.value);
        });
    }
}

function renderAppointmentsTab(container, history) {
    if (!history) {
        container.innerHTML = '<p class="text-center text-gray-500 mt-10">Histórico vazio.</p>';
        return;
    }

    const upcoming = history.filter(item => {
        const nItem = normalizeHistoryItem(item);
        // Exibe apenas agendamentos NÃO finalizados e NÃO cancelados (futuros ou pendentes)
        return nItem.statusType === 'warning'; 
    });

    upcoming.sort((a, b) => new Date(a.date || a.startTime) - new Date(b.date || b.startTime));

    if (upcoming.length === 0) {
        container.innerHTML = `<div class="flex flex-col items-center justify-center py-12 text-gray-400">
            <p>Nenhum agendamento pendente.</p>
        </div>`;
        return;
    }

    container.innerHTML = `<div class="space-y-3">
        ${upcoming.map(item => {
            const nItem = normalizeHistoryItem(item);
            return `
            <div class="bg-white border border-l-4 border-l-indigo-500 rounded-lg p-4 shadow-sm flex justify-between items-center">
                <div>
                    <p class="font-bold text-gray-800">${nItem.serviceName}</p>
                    <p class="text-sm text-gray-600 mt-1">Com: ${nItem.professionalName}</p>
                    <p class="text-xs text-gray-400 mt-2">${nItem.displayDate} às ${nItem.displayTime}</p>
                </div>
                <button onclick="navigateToAppointment('${nItem.id}', '${item.date}')" class="text-indigo-600 hover:bg-indigo-50 p-2 rounded-full">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </button>
            </div>`;
        }).join('')}
    </div>`;
}

function renderHistoryTab(container, history) {
    if (!history) {
        container.innerHTML = '<p class="text-center text-gray-500">Histórico vazio.</p>';
        return;
    }

    // Exibe apenas o que foi CONCLUÍDO (pago, finalizado)
    const past = history.filter(item => {
        const nItem = normalizeHistoryItem(item);
        return nItem.statusType === 'success'; 
    });

    past.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));

    if (past.length === 0) {
        container.innerHTML = `<p class="text-center text-gray-500 py-10">Nenhum serviço finalizado.</p>`;
        return;
    }

    container.innerHTML = `<div class="space-y-3">
        ${past.map(item => {
            const nItem = normalizeHistoryItem(item);
            return `
            <div class="bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div class="flex-grow">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="text-xs font-bold uppercase text-green-600 bg-green-50 px-2 py-0.5 rounded">Finalizado</span>
                        <span class="text-xs text-gray-400">${nItem.displayDate}</span>
                    </div>
                    <h4 class="font-bold text-gray-800 text-sm">${nItem.serviceName}</h4>
                    <p class="text-xs text-gray-600 mt-0.5">Prof: ${nItem.professionalName}</p>
                </div>
                <div class="flex items-center justify-between sm:justify-end gap-4">
                    <span class="font-bold text-gray-800 text-sm">${formatCurrency(nItem.totalValue)}</span>
                    <button onclick="navigateToComanda('${nItem.id}')" class="text-xs text-indigo-600 border border-indigo-200 px-3 py-1.5 rounded hover:bg-indigo-50">
                        Ver
                    </button>
                </div>
            </div>`;
        }).join('')}
    </div>`;
}

function renderLoyaltyTab(container, stats, salesHistory, loyaltyHistory) {
    if (!stats) {
        container.innerHTML = `<div class="text-center py-10 text-gray-500">Fidelidade desativada.</div>`;
        return;
    }

    // Histórico unificado de pontos
    const pointsLog = [];
    (salesHistory || []).forEach(item => {
        const nItem = normalizeHistoryItem(item);
        if (nItem.statusType === 'success') {
            const points = Math.floor(nItem.totalValue / stats.moneyPerPoint);
            if (points > 0) pointsLog.push({ type: 'earn', desc: `Serviço`, points, date: nItem.rawDate });
        }
    });
    (loyaltyHistory || []).forEach(log => {
        pointsLog.push({ type: 'redeem', desc: `Resgate: ${log.reward || 'Prêmio'}`, points: -Math.abs(log.points), date: new Date(log.timestamp || log.date) });
    });
    pointsLog.sort((a, b) => b.date - a.date);

    const rewardsHTML = (loyaltySettings.tiers || []).map(tier => {
        const canRedeem = stats.currentBalance >= tier.points;
        return `
            <div class="flex justify-between items-center p-3 rounded-lg border ${canRedeem ? 'bg-green-50 border-green-200' : 'bg-gray-50'}">
                <div>
                    <p class="font-bold text-sm text-gray-800">${escapeHTML(tier.reward)}</p>
                    <p class="text-xs text-gray-500">${tier.points} pts</p>
                </div>
                <button onclick="handleRedeemReward('${tier.points}', '${escapeHTML(tier.reward)}')" ${!canRedeem ? 'disabled' : ''}
                    class="px-3 py-1 text-xs font-bold rounded ${canRedeem ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}">
                    Resgatar
                </button>
            </div>`;
    }).join('');

    container.innerHTML = `
        <div class="space-y-6">
            <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white shadow-lg text-center">
                <p class="text-indigo-100 text-xs font-medium uppercase tracking-widest mb-1">Saldo</p>
                <p class="text-5xl font-extrabold mb-2">${stats.currentBalance}</p>
                <p class="text-sm opacity-90">Gasto Total: ${formatCurrency(stats.totalSpent)}</p>
            </div>
            <div>
                <h3 class="font-bold text-gray-800 mb-3 text-sm uppercase">Prêmios</h3>
                <div class="space-y-2">${rewardsHTML || '<p class="text-sm text-gray-400">Sem prêmios.</p>'}</div>
            </div>
            <div>
                <h3 class="font-bold text-gray-800 mb-3 text-sm uppercase">Extrato</h3>
                <div class="bg-gray-50 rounded-lg border border-gray-200 max-h-64 overflow-y-auto">
                    ${pointsLog.map(log => `
                        <div class="flex justify-between items-center p-3 border-b last:border-0">
                            <div><p class="text-xs font-semibold text-gray-700">${log.desc}</p><p class="text-[10px] text-gray-400">${log.date.toLocaleDateString('pt-BR')}</p></div>
                            <span class="font-bold text-sm ${log.type === 'earn' ? 'text-green-600' : 'text-red-500'}">${log.type === 'earn' ? '+' : ''}${log.points}</span>
                        </div>`).join('') || '<p class="text-xs text-center p-4 text-gray-400">Vazio.</p>'}
                </div>
            </div>
        </div>`;
}

// --- FUNÇÕES GLOBAIS DE AÇÃO ---

window.navigateToAppointment = (id, date) => {
    document.getElementById('genericModal').style.display = 'none';
    navigateTo('agenda-section', { targetDate: date, scrollToAppointmentId: id });
};

window.navigateToComanda = (id) => {
    document.getElementById('genericModal').style.display = 'none';
    navigateTo('comandas-section', { selectedAppointmentId: id, initialFilter: 'finalizada' });
};

window.handleRedeemReward = async (points, rewardName) => {
    if (await showConfirmation('Resgatar', `Trocar ${points} pontos por "${rewardName}"?`)) {
        try {
            await clientsApi.redeemReward(state.establishmentId, currentClient.name, currentClient.phone, { points: parseInt(points), reward: rewardName });
            showNotification('Sucesso', 'Resgatado!', 'success');
            window.switchModalTab(3); 
        } catch (e) {
            showNotification('Erro', e.message, 'error');
        }
    }
};

window.openClientModalFromCard = (clientId) => {
    const client = allClientsData.find(c => c.id === clientId);
    if(client) window.openClientModal(client);
};

window.changePage = (delta) => {
    currentPage += delta;
    const term = document.getElementById('clientSearchInput').value.toLowerCase();
    const filtered = allClientsData.filter(c => c.name.toLowerCase().includes(term) || (c.phone && c.phone.includes(term)));
    renderClientList(filtered);
    document.getElementById('clientsList').scrollTop = 0;
};

window.handleBulkDelete = async () => {
    if(!await showConfirmation('Excluir', `Apagar ${selectedClientIds.size} clientes?`)) return;
    
    document.getElementById('bulk-actions-bar').innerHTML = '<span class="text-center w-full">Excluindo...</span>';
    const ids = Array.from(selectedClientIds);
    await Promise.all(ids.map(id => clientsApi.deleteClient(id).catch(console.error)));
    
    showNotification('Sucesso', 'Excluídos.', 'success');
    loadClientsPage();
};

async function handleSaveClient() {
    const form = document.getElementById('client-form');
    if (!form) return;

    const clientId = form.querySelector('#clientId').value;
    const rawPhone = form.querySelector('#clientPhone').value;
    
    if (rawPhone.replace(/\D/g, '').length < 10) {
        showNotification('Erro', 'Telefone inválido.', 'error');
        return;
    }

    const clientData = {
        name: form.querySelector('#clientName').value.trim(),
        email: form.querySelector('#clientEmail').value.trim(),
        phone: rawPhone,
        dob: `${form.querySelector('#clientDobDay').value}/${form.querySelector('#clientDobMonth').value}`,
        notes: form.querySelector('#clientNotes').value.trim(),
        establishmentId: state.establishmentId
    };

    try {
        if (clientId) {
            await clientsApi.updateClient(clientId, clientData);
            showNotification('Sucesso', 'Atualizado!', 'success');
        } else {
            await clientsApi.createClient(clientData);
            showNotification('Sucesso', 'Criado!', 'success');
        }
        document.getElementById('genericModal').style.display = 'none';
        loadClientsPage();
    } catch (e) {
        showNotification('Erro', e.message, 'error');
    }
}

async function handleDeleteClient() {
    if (!currentClient || !currentClient.id) return;
    if (await showConfirmation('Excluir', 'Tem certeza?')) {
        try {
            await clientsApi.deleteClient(currentClient.id);
            showNotification('Sucesso', 'Removido.', 'success');
            document.getElementById('genericModal').style.display = 'none';
            loadClientsPage();
        } catch (e) {
            showNotification('Erro', e.message, 'error');
        }
    }
}

// --- RENDERIZAÇÃO DA LISTA DE CLIENTES ---

function renderClientList(clients) {
    const listDiv = document.getElementById('clientsList');
    if(!listDiv) return;
    
    listDiv.innerHTML = '';
    const totalPages = Math.ceil(clients.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const paginatedClients = clients.slice(start, start + itemsPerPage);

    const bulkBar = document.getElementById('bulk-actions-bar');
    if(bulkBar) bulkBar.classList.add('hidden');
    selectedClientIds.clear();

    if(paginatedClients.length === 0) {
        listDiv.innerHTML = '<p class="text-center text-gray-500 mt-10">Nenhum cliente encontrado.</p>';
        return;
    }

    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4';
    listDiv.appendChild(grid);

    paginatedClients.forEach(client => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all cursor-pointer relative group';
        
        card.innerHTML = `
            <div class="absolute top-4 right-4">
                <input type="checkbox" class="client-checkbox w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" value="${client.id}">
            </div>
            
            <div class="flex items-center gap-4" onclick="openClientModalFromCard('${client.id}')">
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    ${client.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h3 class="font-bold text-gray-900 truncate pr-6">${escapeHTML(client.name)}</h3>
                    <p class="text-sm text-gray-500">${formatPhone(client.phone)}</p>
                </div>
            </div>
            
            <div class="mt-4 pt-3 border-t grid grid-cols-2 gap-2 text-center" onclick="openClientModalFromCard('${client.id}')">
                <div>
                    <p class="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Pontos</p>
                    <p class="text-sm font-bold text-indigo-600">${client.loyaltyPoints || 0}</p>
                </div>
                <div>
                    <p class="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Total Gasto</p>
                    <p class="text-sm font-bold text-gray-700">${formatCurrency(client.totalSpent || 0)}</p>
                </div>
            </div>
        `;

        const checkbox = card.querySelector('.client-checkbox');
        checkbox.onclick = (e) => {
            e.stopPropagation();
            if(e.target.checked) selectedClientIds.add(client.id);
            else selectedClientIds.delete(client.id);
            
            const count = document.getElementById('selected-count');
            if(selectedClientIds.size > 0) {
                bulkBar.classList.remove('hidden');
                count.textContent = selectedClientIds.size;
            } else {
                bulkBar.classList.add('hidden');
            }
        };

        grid.appendChild(card);
    });

    if(totalPages > 1) {
        const pagination = document.createElement('div');
        pagination.className = 'flex justify-center items-center gap-4 mt-8 pb-10';
        pagination.innerHTML = `
            <button ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(-1)" class="px-4 py-2 bg-white border rounded disabled:opacity-50">Anterior</button>
            <span class="text-sm text-gray-600">Página ${currentPage} de ${totalPages}</span>
            <button ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(1)" class="px-4 py-2 bg-white border rounded disabled:opacity-50">Próximo</button>
        `;
        listDiv.appendChild(pagination);
    }
}

// --- CARREGAMENTO INICIAL ---

export async function loadClientsPage() {
    currentView = 'list';
    currentPage = 1;
    selectedClientIds.clear();

    contentDiv.innerHTML = `
        <div class="h-full flex flex-col bg-gray-50">
            <header class="bg-white border-b px-4 py-3 flex flex-col md:flex-row md:items-center gap-4 sticky top-0 z-10 shadow-sm">
                <div class="flex-grow relative">
                    <input type="text" id="clientSearchInput" placeholder="Buscar por nome ou telefone..." 
                        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                    <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </div>
                <div class="flex gap-2">
                     <button onclick="openClientModal(null)" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                        Novo
                    </button>
                </div>
            </header>
            
            <div id="clientsList" class="flex-1 overflow-y-auto p-4">
                <div class="loader mx-auto mt-10"></div>
            </div>

            <div id="bulk-actions-bar" class="hidden bg-gray-900 text-white px-6 py-3 flex justify-between items-center fixed bottom-4 left-1/2 transform -translate-x-1/2 rounded-full shadow-xl z-20 w-[90%] max-w-md">
                <span class="text-sm font-medium"><span id="selected-count">0</span> selecionados</span>
                <button onclick="handleBulkDelete()" class="text-red-400 hover:text-red-200 font-bold text-sm">Excluir</button>
            </div>
        </div>
    `;

    try {
        const [clients, establishmentData] = await Promise.all([
            clientsApi.getClients(state.establishmentId, '', 1000), 
            establishmentApi.getEstablishmentDetails(state.establishmentId)
        ]);
        
        allClientsData = clients;
        loyaltySettings = establishmentData.loyaltyProgram || { enabled: false };
        establishmentName = establishmentData.name || 'O Estabelecimento';
        renderClientList(allClientsData);

    } catch (e) {
        document.getElementById('clientsList').innerHTML = `<p class="text-center text-red-500 mt-10">Erro ao carregar clientes.</p>`;
    }

    document.getElementById('clientSearchInput').addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = allClientsData.filter(c => 
            c.name.toLowerCase().includes(term) || (c.phone && c.phone.includes(term))
        );
        currentPage = 1;
        renderClientList(filtered);
    });
}