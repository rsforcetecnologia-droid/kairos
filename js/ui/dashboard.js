// js/ui/dashboard.js

import { state } from '../state.js';
import * as appointmentsApi from '../api/appointments.js';
import * as clientsApi from '../api/clients.js';
import * as financialApi from '../api/financial.js'; 
import { navigateTo } from '../main.js';
import { escapeHTML } from '../utils.js';

let revenueChartInstance = null;

// Função auxiliar para obter YYYY-MM-DD em horário local (sem bugar fuso horário)
function getLocalDateString(dateObj) {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

export async function loadDashboardPage() {
    const contentDiv = document.getElementById('content');
    
    contentDiv.innerHTML = `
        <div class="flex items-center justify-center h-full min-h-[60vh] font-sans">
            <div class="flex flex-col items-center">
                <div class="w-12 h-12 border-[3px] border-indigo-50 border-t-indigo-500 rounded-full animate-spin mb-4 shadow-sm"></div>
                <p class="text-slate-500 font-semibold text-sm tracking-wide animate-pulse">Sincronizando dados...</p>
            </div>
        </div>
    `;

    try {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const endOfToday = new Date(today);
        endOfToday.setHours(23, 59, 59, 999);
        
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 6);

        // 1. Identificar Contextos Selecionados (Multiseleção)
        const estIds = (state.selectedEstablishments && state.selectedEstablishments.length > 0) 
            ? state.selectedEstablishments 
            : [state.establishmentId];
            
        const selectedEstsString = estIds.join(',');

        // 2. Busca Paralela de Agendamentos e Clientes (Mês atual)
        const apptsClientsPromises = estIds.map(async (estId) => {
            const [appts, clients] = await Promise.all([
                appointmentsApi.getAppointmentsByDateRange(estId, firstDayOfMonth.toISOString(), endOfToday.toISOString(), null).catch(() => []),
                clientsApi.getClients(estId).catch(() => [])
            ]);
            return { appts, clients };
        });

        // 3. Busca Paralela do Financeiro (Receitas Reais e Despesas do mês)
        const financialPromises = Promise.all([
            financialApi.getReceivables({ startDate: getLocalDateString(firstDayOfMonth), endDate: getLocalDateString(lastDayOfMonth), establishmentId: selectedEstsString }).catch(() => ({entries:[]})),
            financialApi.getPayables({ startDate: getLocalDateString(firstDayOfMonth), endDate: getLocalDateString(lastDayOfMonth), establishmentId: selectedEstsString }).catch(() => ({entries:[]}))
        ]);

        const [apptsClientsResults, [receivablesRes, payablesRes]] = await Promise.all([
            Promise.all(apptsClientsPromises),
            financialPromises
        ]);

        let apptsMonth = [];
        let allClients = [];

        apptsClientsResults.forEach(res => {
            apptsMonth = apptsMonth.concat(res.appts);
            allClients = allClients.concat(res.clients);
        });

        const receivables = receivablesRes.entries || [];
        const payables = payablesRes.entries || [];

        const todayString = getLocalDateString(today);

        // 4. Cálculo de Métricas Financeiras
        const receitaMes = receivables.filter(r => r.status === 'paid').reduce((sum, r) => sum + r.amount, 0);
        const despesaMes = payables.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
        const saldoMes = receitaMes - despesaMes;

        const receitaHoje = receivables.filter(r => 
            r.status === 'paid' && 
            (r.paymentDate === todayString || (!r.paymentDate && r.dueDate.startsWith(todayString)))
        ).reduce((sum, r) => sum + r.amount, 0);

        // 5. Cálculo de Métricas Operacionais
        const apptsToday = apptsMonth.filter(a => {
            const st = new Date(a.startTime);
            return st >= today && st <= endOfToday;
        });

        const agendamentosHoje = apptsToday.length;
        const completedMonth = apptsMonth.filter(a => a.status === 'completed');
        const ticketMedio = completedMonth.length > 0 ? (receitaMes / completedMonth.length) : 0;

        // 6. Próximos Agendamentos (Hoje a partir de agora)
        const nextAppointments = apptsToday
            .filter(a => new Date(a.startTime).getTime() >= now.getTime() && a.status !== 'completed' && a.status !== 'cancelled')
            .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
            .slice(0, 4) 
            .map(a => ({
                client: a.clientName || 'Desconhecido',
                service: a.serviceName || (a.services && a.services[0] ? a.services[0].name : 'Serviço'),
                time: new Date(a.startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                prof: (a.professionalName || '').split(' ')[0] || 'Profissionais',
                id: a.id
            }));

        // 7. Aniversariantes de Hoje (Remoção de duplicados multi-lojas)
        const todayStr = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}`;
        
        const uniqueClientsMap = new Map();
        allClients.forEach(c => {
            if (c.phone) uniqueClientsMap.set(c.phone, c);
            else uniqueClientsMap.set(c.id || Math.random().toString(), c);
        });
        const uniqueClients = Array.from(uniqueClientsMap.values());

        const birthdays = uniqueClients
            .filter(c => {
                if (!c.birthDate) return false;
                let bMonth, bDay;
                if (c.birthDate.includes('-')) {
                    const parts = c.birthDate.split('-');
                    if(parts[0].length === 4) { bMonth = parts[1]; bDay = parts[2]; } 
                    else { bDay = parts[0]; bMonth = parts[1]; } 
                } else if (c.birthDate.includes('/')) {
                    const parts = c.birthDate.split('/');
                    bDay = parts[0]; bMonth = parts[1];
                }
                return `${bDay}/${bMonth}` === todayStr;
            })
            .map(c => {
                let age = '';
                if (c.birthDate && c.birthDate.includes('-') && c.birthDate.split('-')[0].length === 4) {
                    age = today.getFullYear() - parseInt(c.birthDate.split('-')[0]);
                }
                return { name: c.name, age, phone: c.phone };
            });

        const metrics = { receitaHoje, agendamentosHoje, receitaMes, despesaMes, saldoMes, ticketMedio };
        const isMultiView = estIds.length > 1;

        // 8. Renderização Inicial (Apenas UI, Gráfico carrega logo depois)
        renderDashboardUI(contentDiv, metrics, nextAppointments, birthdays, isMultiView, getLocalDateString(sevenDaysAgo), getLocalDateString(today));
        
        // 9. Carregar dados do gráfico isoladamente (para suportar recarregamento pelo botão)
        await loadAndRenderChart(sevenDaysAgo, today);

        setupDashboardEvents();

    } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
        contentDiv.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full min-h-[60vh] text-slate-500 font-sans">
                <i class="bi bi-exclamation-triangle text-5xl mb-4 text-rose-400"></i>
                <h3 class="font-bold text-lg text-slate-700">Erro de Sincronização</h3>
                <p class="font-medium text-sm mt-1">Ocorreu um problema ao comunicar com o servidor.</p>
                <button onclick="window.navigateTo('dashboard-section')" class="mt-6 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm active:scale-95">Tentar Novamente</button>
            </div>
        `;
    }
}

function renderDashboardUI(container, metrics, nextAppointments, birthdays, isMultiView, chartInitialStart, chartInitialEnd) {
    const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    const multiViewBanner = isMultiView 
        ? `
        <div class="bg-indigo-50 border border-indigo-100 p-3 rounded-xl flex items-center gap-3 text-indigo-700 mb-5 shadow-sm">
            <div class="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0"><i class="bi bi-buildings text-indigo-600 text-xs"></i></div>
            <span class="text-xs font-semibold">Visão Consolidada: Os dados refletem a soma das filiais selecionadas.</span>
        </div>
        ` : '';

    container.innerHTML = `
        <div class="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto pb-24 font-sans text-slate-800">
            
            ${multiViewBanner}

            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-5 md:mb-6">
                
                <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-300 transition-colors relative overflow-hidden group">
                    <div class="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity"><i class="bi bi-cash-coin text-8xl text-emerald-600"></i></div>
                    <div class="flex items-center gap-2.5 mb-2 relative z-10">
                        <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                            <i class="bi bi-arrow-down-left-circle text-base"></i>
                        </div>
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Receita<br/>Hoje</span>
                    </div>
                    <h3 class="text-2xl md:text-3xl font-bold text-slate-700 relative z-10 tracking-tight">${formatter.format(metrics.receitaHoje)}</h3>
                </div>

                <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-300 transition-colors relative overflow-hidden group">
                    <div class="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity"><i class="bi bi-wallet2 text-8xl text-blue-600"></i></div>
                    <div class="flex items-center gap-2.5 mb-2 relative z-10">
                        <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                            <i class="bi bi-graph-up-arrow text-base"></i>
                        </div>
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Faturamento<br/>(Mês)</span>
                    </div>
                    <h3 class="text-2xl md:text-3xl font-bold text-slate-700 relative z-10 tracking-tight">${formatter.format(metrics.receitaMes)}</h3>
                </div>

                <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-rose-300 transition-colors relative overflow-hidden group">
                    <div class="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity"><i class="bi bi-cart-x text-8xl text-rose-600"></i></div>
                    <div class="flex items-center gap-2.5 mb-2 relative z-10">
                        <div class="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
                            <i class="bi bi-arrow-up-right-circle text-base"></i>
                        </div>
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Despesas<br/>(Mês)</span>
                    </div>
                    <h3 class="text-2xl md:text-3xl font-bold text-rose-600 relative z-10 tracking-tight">${formatter.format(metrics.despesaMes)}</h3>
                </div>

                <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors relative overflow-hidden group">
                    <div class="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity"><i class="bi bi-piggy-bank text-8xl text-indigo-600"></i></div>
                    <div class="flex items-center gap-2.5 mb-2 relative z-10">
                        <div class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                            <i class="bi bi-bank text-base"></i>
                        </div>
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Saldo<br/>Líquido</span>
                    </div>
                    <h3 class="text-2xl md:text-3xl font-bold ${metrics.saldoMes >= 0 ? 'text-indigo-600' : 'text-rose-600'} relative z-10 tracking-tight">${formatter.format(metrics.saldoMes)}</h3>
                </div>

            </div>

            <div class="grid grid-cols-2 gap-4 md:gap-5 mb-5 md:mb-6">
                <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex justify-between items-center shadow-inner">
                    <div>
                        <span class="block text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Agendamentos Hoje</span>
                        <span class="text-xl font-bold text-slate-700">${metrics.agendamentosHoje}</span>
                    </div>
                    <div class="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 border border-slate-100"><i class="bi bi-calendar-check text-base"></i></div>
                </div>
                <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex justify-between items-center shadow-inner">
                    <div>
                        <span class="block text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Ticket Médio Geral</span>
                        <span class="text-xl font-bold text-slate-700">${formatter.format(metrics.ticketMedio)}</span>
                    </div>
                    <div class="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 border border-slate-100"><i class="bi bi-receipt text-base"></i></div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
                
                <div class="lg:col-span-2 space-y-5 md:space-y-6">
                    
                    <div class="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-slate-200">
                        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-3 border-b border-slate-100 pb-4">
                            <div>
                                <h3 class="text-sm font-semibold text-slate-700">Desempenho Geral</h3>
                                <p class="text-[10px] text-slate-400 font-medium">Receita Realizada vs Agendamentos Concluídos</p>
                            </div>
                            
                            <div class="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-lg border border-slate-200 w-full md:w-auto">
                                <input type="date" id="chart-start-date" value="${chartInitialStart}" class="bg-white text-[10px] md:text-xs py-1.5 px-2 border border-slate-200 rounded text-slate-600 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 shadow-sm flex-1 md:w-28 font-medium">
                                <span class="text-slate-400 text-[10px] font-semibold">até</span>
                                <input type="date" id="chart-end-date" value="${chartInitialEnd}" class="bg-white text-[10px] md:text-xs py-1.5 px-2 border border-slate-200 rounded text-slate-600 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 shadow-sm flex-1 md:w-28 font-medium">
                                <button id="btn-update-chart" class="bg-indigo-600 text-white px-2.5 py-1.5 rounded hover:bg-indigo-700 transition-colors shadow-sm active:scale-95 flex items-center justify-center">
                                    <i class="bi bi-arrow-repeat text-xs"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="relative h-64 w-full" id="chart-container">
                            <canvas id="revenueChart"></canvas>
                        </div>
                    </div>

                    <div class="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-slate-200">
                        <div class="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                            <h3 class="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                                <i class="bi bi-calendar-range text-indigo-500"></i> Próximos na Agenda
                            </h3>
                            <button data-action="goto-agenda" class="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded hover:bg-indigo-100 transition-colors uppercase tracking-widest border border-indigo-100 shadow-sm">Ver Todos</button>
                        </div>
                        
                        <div class="space-y-2">
                            ${nextAppointments.length > 0 ? nextAppointments.map(appt => `
                                <div data-action="goto-agenda" class="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 transition-colors cursor-pointer group">
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 rounded-lg bg-white border border-slate-200 flex flex-col items-center justify-center flex-shrink-0 text-indigo-600 shadow-sm">
                                            <span class="font-bold text-sm leading-tight">${appt.time.split(':')[0]}</span>
                                            <span class="text-[9px] font-semibold leading-tight text-slate-400">${appt.time.split(':')[1]}</span>
                                        </div>
                                        <div>
                                            <p class="font-semibold text-slate-700 text-[0.8rem] group-hover:text-indigo-700 transition-colors">${escapeHTML(appt.client)}</p>
                                            <p class="text-[10px] font-medium text-slate-500 mt-0.5">${escapeHTML(appt.service)} <span class="mx-1 text-slate-300">•</span> ${escapeHTML(appt.prof)}</p>
                                        </div>
                                    </div>
                                    <div class="w-7 h-7 rounded-full text-slate-300 flex items-center justify-center group-hover:text-indigo-500 transition-colors">
                                        <i class="bi bi-chevron-right text-xs"></i>
                                    </div>
                                </div>
                            `).join('') : `
                                <div class="text-center py-6 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                    <div class="w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-2 border border-slate-100">
                                        <i class="bi bi-calendar2-x text-lg text-slate-300"></i>
                                    </div>
                                    <p class="text-xs font-semibold text-slate-500">Agenda livre</p>
                                    <p class="text-[10px] font-medium mt-0.5">Nenhum agendamento pendente para hoje.</p>
                                </div>
                            `}
                        </div>
                    </div>

                </div>

                <div class="space-y-5 md:space-y-6">
                    
                    <div class="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-slate-200">
                        <h3 class="text-sm font-semibold text-slate-700 mb-3 border-b border-slate-100 pb-3">Ações Rápidas</h3>
                        <div class="grid grid-cols-2 gap-2">
                            <button data-action="new-appointment" class="flex flex-col items-center justify-center p-3 bg-indigo-50/70 rounded-xl text-indigo-700 hover:bg-indigo-100 transition-colors border border-indigo-100/50 group active:scale-95">
                                <i class="bi bi-calendar-plus text-xl mb-1.5 opacity-80 group-hover:opacity-100 transition-opacity"></i>
                                <span class="text-[9px] font-bold uppercase tracking-widest text-center">Agendar</span>
                            </button>
                            
                            <button data-action="goto-pdv" class="flex flex-col items-center justify-center p-3 bg-emerald-50/70 rounded-xl text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-100/50 group active:scale-95">
                                <i class="bi bi-cart-check text-xl mb-1.5 opacity-80 group-hover:opacity-100 transition-opacity"></i>
                                <span class="text-[9px] font-bold uppercase tracking-widest text-center">PDV / Caixa</span>
                            </button>
                            
                            <button data-action="goto-clients" class="flex flex-col items-center justify-center p-3 bg-blue-50/70 rounded-xl text-blue-700 hover:bg-blue-100 transition-colors border border-blue-100/50 group active:scale-95">
                                <i class="bi bi-people text-xl mb-1.5 opacity-80 group-hover:opacity-100 transition-opacity"></i>
                                <span class="text-[9px] font-bold uppercase tracking-widest text-center">Clientes</span>
                            </button>
                            
                            <button data-action="open-link" class="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-colors border border-slate-200 group active:scale-95">
                                <i class="bi bi-globe text-xl mb-1.5 opacity-80 group-hover:opacity-100 transition-opacity"></i>
                                <span class="text-[9px] font-bold uppercase tracking-widest text-center">Meu Link</span>
                            </button>
                        </div>
                    </div>

                    <div class="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-slate-200">
                        <h3 class="text-sm font-semibold text-slate-700 mb-3 border-b border-slate-100 pb-3 flex items-center gap-1.5">
                            <i class="bi bi-gift text-rose-400"></i> Aniversariantes
                        </h3>
                        
                        <div class="space-y-2">
                            ${birthdays.length > 0 ? birthdays.map(b => {
                                const cleanPhone = (b.phone || '').replace(/\D/g, '');
                                const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Olá ${b.name.split(' ')[0]}! A equipa deseja-lhe um Feliz Aniversário! 🎉`)}`;
                                
                                return `
                                <div class="flex items-center justify-between p-2.5 rounded-xl border border-rose-100 bg-rose-50/40 hover:bg-rose-50 transition-colors">
                                    <div class="flex items-center gap-2.5">
                                        <div class="w-8 h-8 rounded-lg bg-white text-rose-500 flex items-center justify-center font-bold text-xs border border-rose-100 shadow-sm">
                                            ${escapeHTML(b.name).charAt(0)}
                                        </div>
                                        <div>
                                            <p class="font-semibold text-slate-700 text-[0.75rem] leading-tight">${escapeHTML(b.name)}</p>
                                            ${b.age ? `<p class="text-[9px] font-medium text-rose-400 mt-0.5">${b.age} anos</p>` : ''}
                                        </div>
                                    </div>
                                    <a href="${waLink}" target="_blank" class="w-8 h-8 rounded-lg bg-white text-emerald-500 shadow-sm border border-emerald-100 flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-200 transition-colors" title="Enviar Parabéns pelo WhatsApp">
                                        <i class="bi bi-whatsapp text-[0.8rem]"></i>
                                    </a>
                                </div>
                            `}).join('') : `
                                <div class="text-center py-6 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                    <i class="bi bi-balloon text-2xl mb-1.5 opacity-50"></i>
                                    <p class="text-[10px] font-bold uppercase tracking-widest">Sem festas hoje</p>
                                </div>
                            `}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    `;
}

async function loadAndRenderChart(startDateObj, endDateObj) {
    const container = document.getElementById('chart-container');
    const startInput = document.getElementById('chart-start-date');
    const endInput = document.getElementById('chart-end-date');
    
    if(container) {
        // Overlay de loading leve
        const overlay = document.createElement('div');
        overlay.id = 'chart-loading-overlay';
        overlay.className = 'absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-xl';
        overlay.innerHTML = '<div class="w-8 h-8 border-[3px] border-indigo-100 border-t-indigo-500 rounded-full animate-spin"></div>';
        container.appendChild(overlay);
    }

    try {
        const startStr = getLocalDateString(startDateObj);
        const endStr = getLocalDateString(endDateObj);

        const estIds = (state.selectedEstablishments && state.selectedEstablishments.length > 0) 
            ? state.selectedEstablishments 
            : [state.establishmentId];
        const selectedEstsString = estIds.join(',');

        // Busca dados específicos para o gráfico no período selecionado
        const financialRes = await financialApi.getReceivables({ startDate: startStr, endDate: endStr, establishmentId: selectedEstsString }).catch(()=>({entries:[]}));
        
        const apptsPromises = estIds.map(estId => appointmentsApi.getAppointmentsByDateRange(estId, startStr + 'T00:00:00.000Z', endStr + 'T23:59:59.999Z', null).catch(()=>[]));
        const apptsResults = await Promise.all(apptsPromises);
        
        const appts = apptsResults.flat();
        const receivables = financialRes.entries || [];

        const labels = [];
        const revData = [];
        const apptData = [];
        
        let curr = new Date(startDateObj);
        curr.setHours(0,0,0,0);
        
        const endLimit = new Date(endDateObj);
        endLimit.setHours(23,59,59,999);

        // Agrupa dia a dia iterando sobre as datas
        while(curr <= endLimit) {
            const dStr = getLocalDateString(curr);
            labels.push(curr.toLocaleDateString('pt-BR', {day:'2-digit', month:'2-digit'}));
            
            const dayRev = receivables
                .filter(r => r.status === 'paid' && (r.paymentDate === dStr || (!r.paymentDate && r.dueDate.startsWith(dStr))))
                .reduce((sum, r) => sum + r.amount, 0);
            
            // Filtra agendamentos realizados que comecem nesse dia (verificando formato da string ISO)
            const dayAppts = appts.filter(a => a.status === 'completed' && a.startTime && a.startTime.startsWith(dStr)).length;

            revData.push(dayRev);
            apptData.push(dayAppts);
            
            curr.setDate(curr.getDate() + 1);
        }
        
        initRevenueChart(labels, revData, apptData);

        if (startInput) startInput.value = startStr;
        if (endInput) endInput.value = endStr;

    } catch (error) {
        console.error('Erro ao recarregar grafico:', error);
    } finally {
        const overlay = document.getElementById('chart-loading-overlay');
        if(overlay) overlay.remove();
    }
}

function initRevenueChart(labels, revenueData, apptsData) {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;

    if (revenueChartInstance) {
        revenueChartInstance.destroy();
    }

    const canvasContext = ctx.getContext('2d');
    const gradient = canvasContext.createLinearGradient(0, 0, 0, 240);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.2)'); 
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');

    revenueChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Receita Real (R$)',
                    data: revenueData,
                    borderColor: '#6366f1', // Indigo
                    backgroundColor: gradient,
                    borderWidth: 2,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: '#6366f1',
                    pointBorderWidth: 2,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    fill: true,
                    tension: 0.3,
                    yAxisID: 'y'
                },
                {
                    label: 'Agendamentos Feitos',
                    data: apptsData,
                    borderColor: '#10b981', // Emerald
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    pointBackgroundColor: '#10b981',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 1,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    fill: false,
                    tension: 0.3,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { 
                    display: true,
                    position: 'top',
                    align: 'end',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 6,
                        boxHeight: 6,
                        font: { family: 'Nunito, sans-serif', size: 10, weight: 'bold' },
                        color: '#64748b'
                    }
                },
                tooltip: {
                    backgroundColor: '#1e293b',
                    padding: 10,
                    cornerRadius: 8,
                    titleFont: { size: 11, family: 'Nunito, sans-serif', weight: 'normal' },
                    bodyFont: { size: 12, weight: 'bold', family: 'Nunito, sans-serif' },
                    displayColors: true,
                    usePointStyle: true,
                    callbacks: {
                        label: function(context) {
                            if (context.datasetIndex === 0) {
                                return 'Receita: ' + new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
                            }
                            return 'Concluídos: ' + context.parsed.y;
                        }
                    }
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    beginAtZero: true,
                    grid: { color: '#f8fafc', drawBorder: false },
                    border: { display: false },
                    ticks: {
                        color: '#94a3b8',
                        font: { family: 'Nunito, sans-serif', size: 9, weight: '600' },
                        maxTicksLimit: 6,
                        callback: function(value) { return 'R$ ' + value; }
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    beginAtZero: true,
                    grid: { drawOnChartArea: false }, // Evita sobreposição de linhas de fundo
                    border: { display: false },
                    ticks: {
                        color: '#10b981',
                        font: { family: 'Nunito, sans-serif', size: 9, weight: '600' },
                        stepSize: 1,
                        callback: function(value) {
                            if (Math.floor(value) === value) return value;
                        }
                    }
                },
                x: {
                    grid: { display: false, drawBorder: false },
                    border: { display: false },
                    ticks: { color: '#94a3b8', font: { family: 'Nunito, sans-serif', size: 9, weight: '600' } }
                }
            },
            interaction: { intersect: false, mode: 'index' },
        }
    });
}

function setupDashboardEvents() {
    const contentDiv = document.getElementById('content');
    
    // Delegação de eventos
    contentDiv.addEventListener('click', (e) => {
        const btnUpdateChart = e.target.closest('#btn-update-chart');
        if (btnUpdateChart) {
            const startInput = document.getElementById('chart-start-date');
            const endInput = document.getElementById('chart-end-date');
            if (startInput && endInput && startInput.value && endInput.value) {
                const sDate = new Date(startInput.value + 'T00:00:00');
                const eDate = new Date(endInput.value + 'T00:00:00');
                loadAndRenderChart(sDate, eDate);
            }
            return;
        }

        const actionBtn = e.target.closest('[data-action]');
        if (!actionBtn) return;

        const action = actionBtn.dataset.action;
        
        switch(action) {
            case 'goto-agenda':
            case 'new-appointment':
                navigateTo('agenda-section');
                break;
            case 'goto-pdv':
                navigateTo('comandas-section');
                break;
            case 'goto-clients':
                navigateTo('clientes-section');
                break;
            case 'open-link':
                const publicUrl = `${window.location.origin}/cliente.html?id=${state.establishmentId || ''}`;
                window.open(publicUrl, '_blank');
                break;
        }
    });
}