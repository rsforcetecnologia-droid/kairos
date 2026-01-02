// js/ui/clients.js

import * as clientsApi from '../api/clients.js';
import * as establishmentApi from '../api/establishments.js';
import { state } from '../state.js';
import { showNotification, showConfirmation, showGenericModal } from '../components/modal.js';
import { navigateTo } from '../main.js';
import { escapeHTML } from '../utils.js'; // IMPORTAÇÃO DA SEGURANÇA

const contentDiv = document.getElementById('content');
let allClientsData = [];
let loyaltySettings = {};
let currentClient = null;
let currentView = 'list'; // 'list' ou 'detail'
let activeFilterKey = 'all'; // Chave do filtro ativo na barra superior
let establishmentName = 'O Estabelecimento';

// CONSTANTE: Valor padrão para evitar divisão por zero (1 Real = 1 Ponto se não houver regra)
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

// --- FUNÇÃO DE CÁLCULO DE VALOR (DEFINITIVA) ---
function getItemTotalValue(item) {
    if (!item) return 0;

    let total = 0;

    // 1. Tenta pegar totais explícitos
    if (item.totalAmount !== undefined && item.totalAmount !== null) total = parseFloat(item.totalAmount);
    else if (item.value !== undefined && item.value !== null) total = parseFloat(item.value);
    else if (item.price !== undefined && item.price !== null && !Array.isArray(item.price)) total = parseFloat(item.price);

    // 2. Se o total for zero ou inválido, SOMAR OS ITENS DA COMANDA
    if (!total || total === 0) {
        let calculatedSum = 0;

        // Soma Serviços (verifica array 'services')
        if (item.services && Array.isArray(item.services)) {
            calculatedSum += item.services.reduce((acc, s) => {
                const price = parseFloat(s.price) || parseFloat(s.servicePrice) || 0;
                return acc + price;
            }, 0);
        }

        // Soma Itens/Produtos (verifica array 'comandaItems' ou 'items')
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

// --- FUNÇÕES AUXILIARES (ÍCONES PARA ABAS) ---

function getTabIcon(tabId, colorClass) {
    const defaultClasses = `w-5 h-5 ${colorClass} mr-2`;
    switch (tabId) {
        case 'cadastro':
            return `<svg xmlns="http://www.w3.org/2000/svg" class="${defaultClasses}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>`;
        case 'agendamentos':
            return `<svg xmlns="http://www.w3.org/2000/svg" class="${defaultClasses}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>`;
        case 'historico':
            return `<svg xmlns="http://www.w3.org/2000/svg" class="${defaultClasses}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2h-2.586a1 1 0 00-.707.293l-1.414 1.414a1 1 0 01-1.414 0l-1.414-1.414A1 1 0 009.586 17H7a2 2 0 01-2-2v-2a2 2 0 012-2h12z" /></svg>`;
        case 'fidelidade':
            return `<svg xmlns="http://www.w3.org/2000/svg" class="${defaultClasses}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0 0a1 1 0 001-1V5a1 1 0 10-2 0v2a1 1 0 001 1zm0 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z" /><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.5a9.5 9.5 0 1019 0 9.5 9.5 0 00-19 0z" /></svg>`;
        default:
            return '';
    }
}

// --- FUNÇÕES DE RENDERIZAÇÃO DA VISTA DE DETALHE (MODAL) ---

function renderDetailTabs(activeTab = 'cadastro') {
    const tabs = [
        { id: 'cadastro', label: 'Cadastro' },
        { id: 'agendamentos', label: 'Agend.' },
        { id: 'historico', label: 'Histórico' },
        { id: 'fidelidade', label: 'Fidelidade' }
    ];

    const tabContainer = document.getElementById('client-detail-tabs');
    if (!tabContainer) return;

    tabContainer.innerHTML = tabs.map(tab => {
        const isActive = activeTab === tab.id;
        const colorClass = isActive ? 'text-indigo-600' : 'text-gray-500';

        return `
            <button data-tab="${tab.id}" class="tab-btn flex-1 py-3 px-2 border-b-2 font-medium text-xs sm:text-sm transition-colors flex items-center justify-center ${isActive ? 'border-indigo-500 text-indigo-600 bg-indigo-50' : 'border-transparent text-gray-500 hover:text-gray-700'}">
                ${getTabIcon(tab.id, colorClass)}
                ${tab.label}
            </button>
        `;
    }).join('');

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

    // Loader
    contentContainer.innerHTML = '<div class="flex h-64 items-center justify-center"><div class="loader"></div></div>';

    try {
        switch (tabId) {
            case 'cadastro':
                contentContainer.innerHTML = renderCadastroTab(currentClient);
                break;
            case 'agendamentos':
            case 'historico':
                // Busca histórico para ambas as abas
                const allHistory = await clientsApi.getClientHistory(state.establishmentId, currentClient.name, currentClient.phone);
                contentContainer.innerHTML = renderHistoryTab(allHistory, tabId);
                break;
                
            case 'fidelidade':
                // Carregamento resiliente
                let salesHistory = [];
                let loyaltyHistory = [];

                try {
                    salesHistory = await clientsApi.getClientHistory(state.establishmentId, currentClient.name, currentClient.phone);
                } catch (e) {
                    console.error("Erro ao buscar histórico de vendas:", e);
                }

                if (loyaltySettings && loyaltySettings.enabled) {
                    try {
                        loyaltyHistory = await clientsApi.getClientLoyaltyHistory(state.establishmentId, currentClient.name, currentClient.phone);
                    } catch (e) {
                        console.warn("Aviso: Histórico de fidelidade indisponível.", e);
                    }
                }
                
                contentContainer.innerHTML = renderFidelidadeTab(currentClient, salesHistory, loyaltyHistory);
                break;
                
            default:
                contentContainer.innerHTML = `<p class="p-6 text-center text-gray-500">Seção não implementada.</p>`;
        }
    } catch (error) {
        console.error("Erro crítico ao carregar aba:", error);
        contentContainer.innerHTML = `<div class="p-6 text-center text-red-500"><p>Erro ao carregar dados.</p><p class="text-xs mt-2">${escapeHTML(error.message)}</p></div>`;
    }
}

function renderCadastroTab(client) {
    const dob = client?.dob ? client.dob.split('/') : ['',''];
    // BLINDAGEM DE XSS NOS VALORES DOS INPUTS
    const safeName = escapeHTML(client?.name || '');
    const safeEmail = escapeHTML(client?.email || '');
    const safePhone = escapeHTML(client?.phone || '');
    const safeNotes = escapeHTML(client?.notes || '');

    return `
        <form id="client-form" class="p-6 space-y-4">
            <input type="hidden" id="clientId" value="${client?.id || ''}">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="clientName" class="block text-sm font-medium text-gray-700">Nome</label>
                    <input type="text" id="clientName" value="${safeName}" class="mt-1 w-full p-2 border border-gray-300 rounded-md" required>
                </div>
                <div>
                    <label for="clientEmail" class="block text-sm font-medium text-gray-700">E-mail</label>
                    <input type="email" id="clientEmail" value="${safeEmail}" class="mt-1 w-full p-2 border border-gray-300 rounded-md">
                </div>
                <div>
                    <label for="clientPhone" class="block text-sm font-medium text-gray-700">Telefone</label>
                    <input type="tel" id="clientPhone" value="${safePhone}" class="mt-1 w-full p-2 border border-gray-300 rounded-md" required>
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
                <textarea id="clientNotes" rows="4" class="mt-1 w-full p-2 border border-gray-300 rounded-md">${safeNotes}</textarea>
            </div>
        </form>
    `;
}

function renderHistoryTab(history, type) {
    const title = type === 'agendamentos' ? 'Próximos Agendamentos' : 'Histórico de Visitas';
    const noDataMessage = type === 'agendamentos' ? 'Nenhum agendamento futuro.' : 'Nenhum histórico de visitas.';
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const isAgendamentos = type === 'agendamentos';

    const filteredHistory = (history || []).filter(item => {
        const itemDate = new Date(item.date); 
        const itemDateZero = new Date(itemDate);
        itemDateZero.setHours(0,0,0,0);

        const isToday = itemDateZero.getTime() === today.getTime();
        const isFuture = itemDateZero > today;
        const isPast = itemDateZero < today;
        
        // Verifica status "Finalizado" (incluindo variações comuns)
        const isCompleted = ['completed', 'finalized', 'finished', 'paid'].includes((item.status || '').toLowerCase());

        if (isAgendamentos) {
            // Se está finalizado, NÃO é agendamento futuro (mesmo que seja hoje)
            return !isCompleted && (isFuture || isToday);
        } else {
            // Histórico: Passado OU Finalizado
            return isPast || isCompleted;
        }
    });
    
    // Ordenação
    filteredHistory.sort((a, b) => {
        return isAgendamentos 
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    if (filteredHistory.length === 0) {
        return `<div class="p-6 text-center text-gray-500">${noDataMessage}</div>`;
    }

    return `
        <div class="p-4 space-y-3">
            <h4 class="font-semibold text-lg mb-2 pl-2">${title}</h4>
            ${filteredHistory.map(item => {
                const isHistoric = type === 'historico';
                const totalValue = getItemTotalValue(item); // Valor calculado corretamente
                // BLINDAGEM DE XSS NO HISTÓRICO
                const safeServiceName = escapeHTML(item.serviceName || 'Serviço');
                const safeProfName = escapeHTML(item.professionalName || '');

                return `
                    <div class="bg-white border p-3 rounded-lg flex justify-between items-center shadow-sm cursor-pointer hover:bg-gray-50"
                        data-action="${isHistoric ? 'open-comanda-from-history' : 'view-appointment'}" 
                        data-appointment-id="${item.id}"
                        data-appointment-date="${item.date}"> 
                        
                        <div>
                            <p class="font-bold text-gray-800 text-sm">${safeServiceName}</p>
                            <p class="text-xs text-gray-500">${new Date(item.date).toLocaleDateString('pt-BR')} - ${safeProfName}</p>
                        </div>

                        <span class="text-xs font-bold ${isHistoric ? 'text-indigo-600 bg-indigo-50 px-2 py-1 rounded' : 'text-green-600 bg-green-50 px-2 py-1 rounded'}">
                            ${isHistoric ? `R$ ${totalValue.toFixed(2)}` : 'VER'}
                        </span>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// --- CÁLCULO E RENDERIZAÇÃO DE FIDELIDADE (CORRIGIDO PARA DIVISÃO E SYNC) ---

function calculateLoyaltyStats(salesHistory, loyaltyHistory) {
    // 1. Calcula Pontos Ganhos com base no histórico de vendas
    const validSales = (salesHistory || []).filter(s => {
        const st = (s.status || '').toLowerCase();
        return st === 'completed' || st === 'finished' || st === 'paid' || st === 'finalized';
    });
    
    let totalSpent = 0;
    validSales.forEach(sale => {
        totalSpent += getItemTotalValue(sale);
    });

    // CORREÇÃO: Trata o valor como divisor ("A cada X reais = 1 ponto")
    let moneyPerPoint = (loyaltySettings && loyaltySettings.conversionRate) ? parseFloat(loyaltySettings.conversionRate) : DEFAULT_POINTS_DIVISOR;
    if (moneyPerPoint <= 0) moneyPerPoint = 1; // Proteção contra divisão por zero

    // Ex: Gastou 400 reais. Regra é 40. 400 / 40 = 10 pontos.
    const totalPointsEarned = Math.floor(totalSpent / moneyPerPoint);

    // 2. Calcula Pontos Gastos (Resgates)
    let totalPointsRedeemed = 0;
    (loyaltyHistory || []).forEach(log => {
        if (log.type === 'redeem') {
            totalPointsRedeemed += (log.points ? Math.abs(log.points) : 0); // Soma o valor positivo dos pontos gastos
        }
    });

    // 3. Saldo Atual
    const currentBalance = totalPointsEarned - totalPointsRedeemed;

    return { totalSpent, totalPointsEarned, totalPointsRedeemed, currentBalance, moneyPerPoint };
}

function renderFidelidadeTab(client, salesHistory, loyaltyHistory) {
    if (!loyaltySettings || !loyaltySettings.enabled) {
        return `<div class="p-8 text-center text-gray-500">
            <svg class="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p>O programa de fidelidade não está ativo neste estabelecimento.</p>
        </div>`;
    }

    const stats = calculateLoyaltyStats(salesHistory, loyaltyHistory);
    
    // === SINCRONIZAÇÃO AUTOMÁTICA (AUTO-SYNC) - ADICIONADO ===
    // Se o saldo calculado diferir do saldo salvo no cliente, atualiza o backend silenciosamente
    const storedPoints = parseInt(client.loyaltyPoints || 0);
    if (storedPoints !== stats.currentBalance) {
        console.log(`[Auto-Sync] Atualizando pontos de ${client.name}: ${storedPoints} -> ${stats.currentBalance}`);
        
        // 1. Atualiza objeto local
        client.loyaltyPoints = stats.currentBalance;
        client.totalSpent = stats.totalSpent;
        
        // 2. Atualiza na lista global para refletir ao voltar
        const idx = allClientsData.findIndex(c => c.id === client.id);
        if (idx >= 0) allClientsData[idx].loyaltyPoints = stats.currentBalance;

        // 3. Atualiza Backend (Sem bloquear a UI)
        clientsApi.updateClient(client.id, { loyaltyPoints: stats.currentBalance })
            .catch(err => console.error("Erro no auto-sync de pontos:", err));
    }
    // ==========================================================

    const rewardsHTML = (loyaltySettings.tiers || []).map(tier => {
        const canRedeem = stats.currentBalance >= tier.points;
        // BLINDAGEM XSS
        const safeReward = escapeHTML(tier.reward);
        return `
            <div class="flex justify-between items-center p-3 rounded-lg border ${canRedeem ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}">
                <div>
                    <p class="font-bold text-sm ${canRedeem ? 'text-green-800' : 'text-gray-700'}">${safeReward}</p>
                    <p class="text-xs ${canRedeem ? 'text-green-600' : 'text-gray-500'} font-medium">${tier.points} pts</p>
                </div>
                <button data-action="redeem-reward" data-points="${tier.points}" data-reward="${safeReward}" ${!canRedeem ? 'disabled' : ''}
                    class="py-1.5 px-3 text-xs font-bold uppercase rounded shadow-sm transition-colors ${canRedeem ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}">
                    Resgatar
                </button>
            </div>`;
    }).join('') || '<p class="text-sm text-gray-400 italic">Nenhum prêmio configurado.</p>';

    const historyEntries = [];
    
    // Adiciona entradas de vendas (Ganhos) usando a lógica de DIVISÃO
    (salesHistory || []).forEach(sale => {
        const st = (sale.status || '').toLowerCase();
        if (st === 'completed' || st === 'finished' || st === 'paid' || st === 'finalized') {
            const saleValue = getItemTotalValue(sale);
            
            // CORREÇÃO AQUI TAMBÉM: Divisão pelo fator configurado
            const pts = Math.floor(saleValue / stats.moneyPerPoint);
            
            if (pts > 0) {
                historyEntries.push({
                    type: 'earn',
                    desc: `Serviço/Compra (R$ ${saleValue.toFixed(2)})`,
                    points: pts,
                    date: sale.date || sale.createdAt
                });
            }
        }
    });

    (loyaltyHistory || []).forEach(log => {
        historyEntries.push({
            type: 'redeem',
            desc: `Resgate: ${log.reward || 'Prêmio'}`,
            points: log.points, // Pontos vêm negativos do backend geralmente, ou ajustamos na exibição
            date: log.timestamp || log.date
        });
    });

    historyEntries.sort((a, b) => new Date(b.date) - new Date(a.date));

    const historyHTML = historyEntries.length > 0 ? historyEntries.map(item => `
        <div class="flex justify-between items-center py-2 border-b last:border-0 border-gray-100">
            <div>
                <p class="text-xs font-semibold text-gray-700">${escapeHTML(item.desc)}</p>
                <p class="text-[10px] text-gray-400">${new Date(item.date).toLocaleDateString('pt-BR')} ${new Date(item.date).toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'})}</p>
            </div>
            <span class="text-xs font-bold ${item.type === 'earn' ? 'text-green-600' : 'text-red-500'}">
                ${item.type === 'earn' ? '+' : ''}${item.points}
            </span>
        </div>
    `).join('') : '<p class="text-xs text-center text-gray-400 py-4">Sem movimentações.</p>';

    return `
        <div class="p-4 space-y-6">
            <div class="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl p-5 text-white shadow-lg text-center relative overflow-hidden">
                <div class="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-white opacity-10 rounded-full"></div>
                <p class="text-indigo-100 text-xs font-medium uppercase tracking-wider mb-1">Saldo Fidelidade</p>
                <p class="text-5xl font-extrabold mb-1">${stats.currentBalance}</p>
                <p class="text-sm opacity-90">Total Gasto: R$ ${stats.totalSpent.toFixed(2)}</p>
                <p class="text-[10px] mt-2 opacity-75">Regra: A cada R$ ${stats.moneyPerPoint} = 1 ponto</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h5 class="font-bold text-gray-800 mb-3 text-sm uppercase flex items-center gap-2">
                        <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                        Prêmios Disponíveis
                    </h5>
                    <div class="space-y-2 bg-white rounded-lg">${rewardsHTML}</div>
                </div>

                <div>
                    <h5 class="font-bold text-gray-800 mb-3 text-sm uppercase flex items-center gap-2">
                        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Extrato de Pontos
                    </h5>
                    <div class="bg-gray-50 rounded-lg p-3 max-h-60 overflow-y-auto border border-gray-100">
                        ${historyHTML}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// --- FUNÇÕES DE LÓGICA (ABRIR MODAL, SALVAR, APAGAR) ---

function openClientDetailModal(client) {
    currentClient = client;
    currentView = 'detail';
    const isEditing = client !== null;
    const title = isEditing ? 'Editar Cliente' : 'Adicionar Cliente';

    const modalContent = `
        <div class="flex flex-col h-full bg-white rounded-xl overflow-hidden">
            <div id="client-detail-tabs" class="flex flex-row bg-gray-50 border-b border-gray-200"></div>
            <div id="client-detail-content" class="flex-1 overflow-y-auto bg-white relative"></div>
            
            <footer class="p-4 bg-gray-50 border-t flex justify-between items-center flex-shrink-0">
                <button type="button" id="deleteClientBtn" data-action="delete-client" class="text-red-500 hover:bg-red-50 p-2 rounded-full transition ${isEditing ? '' : 'hidden'}" title="Excluir">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
                <div class="flex gap-2">
                    <button type="button" id="cancelDetailViewBtn" class="py-2 px-4 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 text-sm">Fechar</button>
                    <button type="submit" form="client-form" data-action="save-client" class="py-2 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 shadow-sm text-sm">Salvar</button>
                </div>
            </footer>
        </div>
    `;
    
    const isMobile = window.innerWidth < 768; 
    const modalMaxWidth = isMobile ? 'max-w-full' : 'max-w-3xl';

    showGenericModal({
        title: title,
        contentHTML: modalContent,
        maxWidth: modalMaxWidth
    });
    
    if (isMobile) {
        const modalElement = document.getElementById('genericModal');
        if (modalElement) {
            const modalBox = modalElement.querySelector(`.${modalMaxWidth.replace(':', '\\:')}`);
            if (modalBox) {
                modalBox.style.height = 'auto';
                modalBox.style.maxHeight = '85vh';
                modalBox.style.borderRadius = '1rem';
            }
        }
    }

    const modalElement = document.getElementById('genericModal');
    if (modalElement) {
        modalElement.onclick = async (e) => {
            const actionTarget = e.target.closest('[data-action]');
            if (!actionTarget) return;

            const action = actionTarget.dataset.action;

            switch (action) {
                case 'redeem-reward': {
                    const points = parseInt(actionTarget.dataset.points, 10);
                    const reward = actionTarget.dataset.reward;
                    const confirmed = await showConfirmation('Confirmar Resgate', `Deseja resgatar "${reward}" por ${points} pontos?`);
                    if (confirmed) {
                        try {
                            await clientsApi.redeemReward(state.establishmentId, currentClient.name, currentClient.phone, { points, reward });
                            showNotification('Prêmio resgatado com sucesso!', 'success');
                            await renderDetailContent('fidelidade');
                        } catch (error) {
                            showNotification(`Erro ao resgatar: ${error.message}`, 'error');
                        }
                    }
                    break;
                }
                case 'open-comanda-from-history': {
                    const apptId = actionTarget.dataset.appointmentId;
                    if (apptId) {
                        document.getElementById('genericModal').style.display = 'none';
                        navigateTo('comandas-section', { selectedAppointmentId: apptId, initialFilter: 'finalizada' });
                    }
                    break;
                }
                case 'view-appointment': {
                    const apptId = actionTarget.dataset.appointmentId;
                    const apptDate = actionTarget.dataset.appointmentDate;
                    if (apptId && apptDate) {
                        document.getElementById('genericModal').style.display = 'none';
                        navigateTo('agenda-section', { targetDate: apptDate, scrollToAppointmentId: apptId });
                    }
                    break;
                }
                case 'save-client': {
                    e.preventDefault();
                    handleSaveClient();
                    break;
                }
            }
        };
    }
    
    renderDetailContent('cadastro');

    setTimeout(() => {
        const f = document.getElementById('client-form');
        if (f) f.addEventListener('submit', (e) => { e.preventDefault(); handleSaveClient(); });
    }, 500);
    
    const cancelBtn = document.getElementById('cancelDetailViewBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('genericModal').style.display = 'none';
            // Recarrega a lista para mostrar saldos atualizados (CORREÇÃO DE SYNC)
            const term = document.getElementById('clientSearchInput')?.value || '';
            const list = getFilteredClients(term, activeFilterKey);
            renderClientListWithFilters(list, allClientsData.length);
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
        await loadClientsPage();
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

function renderClientListWithFilters(filteredClients, totalClients) {
    const listDiv = document.getElementById('clientsList');
    if (!listDiv) return;

    listDiv.innerHTML = '';
    listDiv.className = "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 content-start p-2 pb-20";

    document.getElementById('client-count').textContent = `${filteredClients.length} cliente${filteredClients.length !== 1 ? 's' : ''} | Total: ${totalClients}`;

    if (filteredClients.length > 0) {
        const isInactiveFilterActive = activeFilterKey === 'inactive';
        const isBirthdayFilterActive = activeFilterKey === 'birthdays';

        filteredClients.forEach(client => {
            const clientCard = document.createElement('div');
            clientCard.className = `bg-white rounded-lg border border-gray-200 shadow-sm p-3 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between h-full relative group`;
            clientCard.dataset.clientId = client.id;
            
            // CORREÇÃO: Usar parseInt para garantir exibição correta
            const points = parseInt(client.loyaltyPoints || 0);
            const spent = client.totalSpent || 0;

            let whatsappButton = '';
            const cleanedPhone = client.phone ? client.phone.replace(/\D/g, '') : '';
            const whatsappLinkBase = `https://wa.me/55${cleanedPhone}?text=`;
            
            // BLINDAGEM DE XSS NO CARD PRINCIPAL
            const safeName = escapeHTML(client.name);
            const safePhone = escapeHTML(client.phone);

            if (isInactiveFilterActive) {
                const whatsappMessage = encodeURIComponent(INACTIVE_MESSAGE_TEMPLATE(client.name, establishmentName));
                whatsappButton = `<a href="${whatsappLinkBase + whatsappMessage}" target="_blank" class="absolute top-2 right-2 text-blue-500 bg-blue-50 p-1 rounded-full z-10 hover:bg-blue-100"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 16.64C16.64 16.64 15.11 17.58 14.54 17.76C13.97 17.94 13.06 18.06 10.66 17.06C8.26 16.06 6.38 13.62 6.38 13.62C6.38 13.62 4.96 11.72 4.96 9.76C4.96 7.8 6.04 6.88 6.04 6.88C6.04 6.88 6.32 6.56 6.6 6.56C6.88 6.56 7.16 6.56 7.16 6.56C7.38 6.56 7.62 6.46 7.86 7.02C8.1 7.58 8.68 9.02 8.68 9.02C8.68 9.02 8.78 9.24 8.64 9.48C8.5 9.72 8.36 9.88 8.16 10.1C7.96 10.32 7.74 10.4 8.02 10.88C8.3 11.36 9.26 12.92 10.68 14.18C11.62 15.02 12.56 15.36 12.94 15.54C13.32 15.72 13.6 15.66 13.84 15.38C14.08 15.1 14.62 14.34 14.62 14.34C14.62 14.34 14.88 14.06 15.18 14.12C15.48 14.18 16.94 14.9 16.94 14.9C16.94 14.9 17.2 15.04 17.3 15.22C17.4 15.4 17.4 16.28 16.64 16.64Z"/></svg></a>`;
            } else if (isBirthdayFilterActive && isClientBirthdayToday(client)) {
                const whatsappMessage = encodeURIComponent(BIRTHDAY_MESSAGE_TEMPLATE(client.name, establishmentName));
                whatsappButton = `<a href="${whatsappLinkBase + whatsappMessage}" target="_blank" class="absolute top-2 right-2 text-green-500 bg-green-50 p-1 rounded-full z-10 hover:bg-green-100"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M... (mesmo icone)"/></svg></a>`;
            }

            clientCard.innerHTML = `
                ${whatsappButton}
                <div class="flex items-center gap-3 mb-2">
                    <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm flex-shrink-0">
                        ${safeName.charAt(0).toUpperCase()}
                    </div>
                    <div class="min-w-0">
                        <p class="font-bold text-gray-800 text-sm truncate leading-tight">${safeName}</p>
                        <p class="text-[10px] text-gray-500 truncate">${safePhone}</p>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-1 border-t pt-2 mt-auto">
                    <div class="text-center border-r border-gray-100">
                        <p class="text-[10px] text-gray-400 uppercase font-semibold">Gasto</p>
                        <p class="text-xs font-bold text-gray-700">R$ ${spent.toFixed(0)}</p>
                    </div>
                    <div class="text-center">
                        <p class="text-[10px] text-gray-400 uppercase font-semibold">Pontos</p>
                        <p class="text-xs font-bold ${points > 0 ? 'text-green-600' : 'text-gray-300'}">${points}</p>
                    </div>
                </div>
            `;

            clientCard.addEventListener('click', () => openClientDetailModal(client));
            listDiv.appendChild(clientCard);
        });
    } else {
        listDiv.innerHTML = `<p class="col-span-full text-center text-gray-500 py-10">Nenhum cliente encontrado com os filtros aplicados.</p>`;
    }
}

function getFilteredClients(searchTerm = '', filterKey = 'all') {
    const term = searchTerm.toLowerCase();
    const isSearching = term.length > 0;
    
    let selectedMonth = 0;
    let selectedDays = 90;
    
    const isMobile = window.innerWidth < 768;
    
    if (filterKey === 'birthdays') {
        const selectId = isMobile ? 'mobileBirthMonthFilter' : 'birthMonthFilter';
        const monthSelect = document.getElementById(selectId);
        if (monthSelect) selectedMonth = parseInt(monthSelect.value, 10);
    } else if (filterKey === 'inactive') {
        const selectId = isMobile ? 'mobileInactiveDaysFilter' : 'inactiveDaysFilter';
        const daysSelect = document.getElementById(selectId);
        if (daysSelect) selectedDays = parseInt(daysSelect.value, 10);
    }

    let filteredBySearch = allClientsData.filter(c => 
        !isSearching || c.name.toLowerCase().includes(term) || (c.phone || '').includes(term)
    );
    
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
                
                if (selectedMonth === 99) return dobDay === currentDay && dobMonth === currentMonth;
                else if (selectedMonth === 0) return dobMonth >= 1 && dobMonth <= 12;
                else return dobMonth === selectedMonth;
            });
            
        case 'inactive':
            return filteredBySearch.filter(c => {
                const daysAgo = c.lastAppointmentDaysAgo || mockLastAppointmentDaysAgo(); 
                return daysAgo > selectedDays;
            });
            
        case 'credit':
            // CORREÇÃO CRÍTICA: Parse Int para garantir comparação numérica
            return filteredBySearch.filter(c => {
                const pts = parseInt(c.loyaltyPoints || 0);
                return pts > 0;
            });
        case 'all':
        default:
            return filteredBySearch;
    }
}

async function handleFilterClick(newFilterKey) {
    const monthFilterContainer = document.getElementById('birthMonthFilterContainer');
    const mobileMonthFilterContainer = document.getElementById('mobileBirthMonthFilterContainer');
    const daysFilterContainer = document.getElementById('inactiveDaysFilterContainer');
    const mobileDaysFilterContainer = document.getElementById('mobileInactiveDaysFilterContainer');
    
    const isBirthday = newFilterKey === 'birthdays';
    const isInactive = newFilterKey === 'inactive';
    
    [monthFilterContainer, mobileMonthFilterContainer].forEach(el => el?.classList.toggle('hidden', !isBirthday));
    [daysFilterContainer, mobileDaysFilterContainer].forEach(el => el?.classList.toggle('hidden', !isInactive));

    if (isBirthday && activeFilterKey !== 'birthdays') {
        document.querySelectorAll('#birthMonthFilter, #mobileBirthMonthFilter').forEach(el => el.value = 99);
    }
    if (isInactive && activeFilterKey !== 'inactive') {
        document.querySelectorAll('#inactiveDaysFilter, #mobileInactiveDaysFilter').forEach(el => el.value = 90);
    }

    if (activeFilterKey === newFilterKey && !isBirthday && !isInactive) return;
    activeFilterKey = newFilterKey;
    
    document.querySelectorAll('.client-filter-btn').forEach(btn => {
        btn.classList.remove('bg-white', 'text-indigo-600', 'shadow');
        btn.classList.add('bg-gray-100', 'text-gray-600');
    });
    
    document.querySelectorAll(`[data-filter-key="${newFilterKey}"]`).forEach(btn => {
        btn.classList.remove('bg-gray-100', 'text-gray-600');
        btn.classList.add('bg-white', 'text-indigo-600', 'shadow');
    });

    const searchTerm = document.getElementById('clientSearchInput').value;
    const filtered = getFilteredClients(searchTerm, activeFilterKey);
    renderClientListWithFilters(filtered, allClientsData.length);
}

export async function loadClientsPage() {
    currentView = 'list';
    
    contentDiv.innerHTML = `
        <section id="client-list-view" class="flex flex-col h-full bg-gray-50">
            
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 bg-white shadow-sm border-b sticky top-0 z-20">
                <div class="flex-grow">
                    <input type="text" id="clientSearchInput" placeholder="Pesquisar por nome ou telefone..." class="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-indigo-500">
                </div>
                <div class="flex gap-2">
                    <button id="openFilterSheetBtn" class="flex-1 md:hidden py-2.5 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg flex items-center justify-center gap-2 text-sm">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                        Filtros
                    </button>
                    <button data-action="new-client" class="flex-1 py-2.5 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 text-sm shadow-sm transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                        <span class="hidden md:inline">Novo cliente</span>
                        <span class="md:hidden">Novo</span>
                    </button>
                </div>
            </div>

            <div id="desktop-filter-bar" class="hidden md:flex flex-wrap gap-2 p-3 bg-white border-b overflow-x-auto text-sm">
                <button data-filter-key="all" class="client-filter-btn bg-white text-indigo-600 shadow font-semibold py-1.5 px-3 rounded-lg flex items-center gap-2 transition-colors border border-gray-200">
                    Todos
                </button>
                <button data-filter-key="birthdays" class="client-filter-btn bg-gray-100 text-gray-600 font-semibold py-1.5 px-3 rounded-lg flex items-center gap-2 transition-colors border border-transparent">
                    Aniversariantes
                </button>
                <span id="birthMonthFilterContainer" class="hidden">
                    <select id="birthMonthFilter" class="p-1.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 font-semibold shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                        ${getMonthOptionsHTML()}
                    </select>
                </span>
                
                <div class="h-6 w-px bg-gray-300 mx-1"></div>

                <button data-filter-key="credit" class="client-filter-btn bg-gray-100 text-gray-600 font-semibold py-1.5 px-3 rounded-lg flex items-center gap-2 transition-colors border border-transparent">
                    Com Pontos
                </button>
                <button data-filter-key="inactive" class="client-filter-btn bg-gray-100 text-gray-600 font-semibold py-1.5 px-3 rounded-lg flex items-center gap-2 transition-colors border border-transparent">
                    Inativos
                </button>
                <span id="inactiveDaysFilterContainer" class="hidden">
                    <select id="inactiveDaysFilter" class="p-1.5 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 font-semibold shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                        ${getInactiveDaysOptionsHTML()}
                    </select>
                </span>
            </div>
            
            <div class="px-4 py-2 flex justify-between items-center bg-gray-50">
                <p id="client-count" class="text-xs text-gray-500 font-medium">A carregar clientes...</p>
            </div>

            <div id="clientsList" class="flex-1 overflow-y-auto p-2">
                <div class="loader mx-auto mt-10"></div>
            </div>
        </section>

        <div id="filter-overlay" class="fixed inset-0 bg-black bg-opacity-50 hidden" style="z-index: 39;"></div>
        <div id="filter-sheet" class="fixed bottom-0 left-0 right-0 p-4 bg-white rounded-t-2xl shadow-lg transition-transform transform translate-y-full" style="z-index: 40;">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-bold text-gray-800">Filtrar clientes</h3>
                <button id="closeFilterSheetBtn" class="text-gray-500 hover:text-gray-800 bg-gray-100 p-1 rounded-full">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            <div id="mobile-filter-list" class="space-y-2 max-h-[60vh] overflow-y-auto pb-4">
                <button data-filter-key="all" class="client-filter-btn w-full text-left bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-xl flex items-center gap-3">
                     Todos os clientes
                </button>
                <button data-filter-key="birthdays" class="client-filter-btn w-full text-left bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-xl flex items-center gap-3">
                    Aniversariantes
                </button>
                <span id="mobileBirthMonthFilterContainer" class="hidden block px-2">
                    <select id="mobileBirthMonthFilter" class="w-full p-3 border border-gray-300 rounded-xl text-base bg-white">
                        ${getMonthOptionsHTML()}
                    </select>
                </span>
                <button data-filter-key="credit" class="client-filter-btn w-full text-left bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-xl flex items-center gap-3">
                    Clientes com pontos
                </button>
                <button data-filter-key="inactive" class="client-filter-btn w-full text-left bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-xl flex items-center gap-3">
                    Clientes Inativos
                </button>
                <span id="mobileInactiveDaysFilterContainer" class="hidden block px-2">
                    <select id="mobileInactiveDaysFilter" class="w-full p-3 border border-gray-300 rounded-xl text-base bg-white">
                        ${getInactiveDaysOptionsHTML()}
                    </select>
                </span>
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
        establishmentName = establishmentData.name || 'O Estabelecimento'; 
        
        const initialFiltered = getFilteredClients('', activeFilterKey);
        renderClientListWithFilters(initialFiltered, allClientsData.length);

    } catch (error) {
        const listDiv = document.getElementById('clientsList');
        if(listDiv) listDiv.innerHTML = '<p class="text-red-500 col-span-full text-center mt-10">Erro ao carregar dados dos clientes.</p>';
    }

    const filterSheet = document.getElementById('filter-sheet');
    const filterOverlay = document.getElementById('filter-overlay');
    const openFilterBtn = document.getElementById('openFilterSheetBtn');
    const closeFilterBtn = document.getElementById('closeFilterSheetBtn');

    const openSheet = () => {
        filterSheet.classList.remove('translate-y-full');
        filterOverlay.classList.remove('hidden');
    };
    const closeSheet = () => {
        filterSheet.classList.add('translate-y-full');
        filterOverlay.classList.add('hidden');
    };

    if(openFilterBtn) openFilterBtn.addEventListener('click', openSheet);
    if(closeFilterBtn) closeFilterBtn.addEventListener('click', closeSheet);
    if(filterOverlay) filterOverlay.addEventListener('click', closeSheet);

    const filterClickHandler = (e) => {
        const filterBtn = e.target.closest('.client-filter-btn');
        if (filterBtn) {
            handleFilterClick(filterBtn.dataset.filterKey);
            const key = filterBtn.dataset.filterKey;
            if (window.innerWidth < 768 && key !== 'birthdays' && key !== 'inactive') {
                closeSheet();
            }
        }
    };

    const desktopFilterBar = document.getElementById('desktop-filter-bar');
    const mobileFilterList = document.getElementById('mobile-filter-list');
    
    if (desktopFilterBar) desktopFilterBar.addEventListener('click', filterClickHandler);
    if (mobileFilterList) mobileFilterList.addEventListener('click', filterClickHandler);

    const setupSelectListener = (selectId) => {
        const select = document.getElementById(selectId);
        if (select) {
            select.addEventListener('change', () => {
                if (activeFilterKey === 'birthdays' || activeFilterKey === 'inactive') {
                    const searchTerm = document.getElementById('clientSearchInput').value;
                    const filtered = getFilteredClients(searchTerm, activeFilterKey);
                    renderClientListWithFilters(filtered, allClientsData.length);
                }
            });
        }
    };

    setupSelectListener('birthMonthFilter');
    setupSelectListener('mobileBirthMonthFilter');
    setupSelectListener('inactiveDaysFilter');
    setupSelectListener('mobileInactiveDaysFilter');

    contentDiv.addEventListener('click', async (e) => {
        const actionTarget = e.target.closest('[data-action]');
        
        if (currentView === 'list' && actionTarget) {
            const action = actionTarget.dataset.action;
            if (action === 'new-client') {
                openClientDetailModal(null);
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