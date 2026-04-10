// js/ui/dashboard.js

import { state } from '../state.js';
import * as appointmentsApi from '../api/appointments.js';
import * as clientsApi from '../api/clients.js';
import { navigateTo } from '../main.js';
import { escapeHTML } from '../utils.js';

let revenueChartInstance = null;

export async function loadDashboardPage() {
    const contentDiv = document.getElementById('content');
    
    // Estado de carregamento suave
    contentDiv.innerHTML = `
        <div class="flex items-center justify-center h-full min-h-[60vh]">
            <div class="flex flex-col items-center">
                <div class="w-10 h-10 border-4 border-indigo-50 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
                <p class="text-slate-400 font-medium text-sm">A processar dados consolidados...</p>
            </div>
        </div>
    `;

    try {
        // --- 1. Lógica de Datas ---
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const endOfToday = new Date(today);
        endOfToday.setHours(23, 59, 59, 999);
        
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 6);

        // --- 2. Identificar Contextos Selecionados (Multiseleção) ---
        // Se a multiseleção já estiver ativa no state, usamos. Caso contrário, usamos o id único.
        const estIds = (state.selectedEstablishments && state.selectedEstablishments.length > 0) 
            ? state.selectedEstablishments 
            : [state.establishmentId];

        // --- 3. Busca de Dados Reais Agregada (Para Múltiplas Unidades) ---
        // Faz a busca em paralelo para todas as lojas selecionadas
        const fetchPromises = estIds.map(async (estId) => {
            const [appts, clients] = await Promise.all([
                appointmentsApi.getAppointmentsByDateRange(estId, firstDayOfMonth.toISOString(), endOfToday.toISOString(), null),
                clientsApi.getClients(estId)
            ]);
            return { appts: appts || [], clients: clients || [] };
        });

        const results = await Promise.all(fetchPromises);

        // Consolidação dos dados
        let apptsMonth = [];
        let allClients = [];

        results.forEach(res => {
            apptsMonth = apptsMonth.concat(res.appts);
            allClients = allClients.concat(res.clients);
        });

        // Função auxiliar para extrair o valor do agendamento
        const getPrice = (appt) => {
            return (appt.services || []).reduce((sum, srv) => sum + (Number(srv.price) || 0), 0) 
                   || Number(appt.totalPrice || 0) 
                   || Number(appt.servicePrice || 0);
        };

        // --- 4. Cálculo de Métricas ---
        const apptsToday = apptsMonth.filter(a => {
            const st = new Date(a.startTime);
            return st >= today && st <= endOfToday;
        });

        const completedToday = apptsToday.filter(a => a.status === 'completed');
        const completedMonth = apptsMonth.filter(a => a.status === 'completed');

        const receitaHoje = completedToday.reduce((sum, a) => sum + getPrice(a), 0);
        const receitaMes = completedMonth.reduce((sum, a) => sum + getPrice(a), 0);
        const agendamentosHoje = apptsToday.length;
        const ticketMedio = completedMonth.length > 0 ? (receitaMes / completedMonth.length) : 0;

        // --- 5. Dados para o Gráfico (Últimos 7 dias consolidados) ---
        const labels = [];
        const data = [];
        const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        
        for (let i = 0; i < 7; i++) {
            const d = new Date(sevenDaysAgo);
            d.setDate(sevenDaysAgo.getDate() + i);
            labels.push(dayNames[d.getDay()]);
            
            const dayStart = new Date(d).setHours(0,0,0,0);
            const dayEnd = new Date(d).setHours(23,59,59,999);
            
            const dayAppts = apptsMonth.filter(a => {
                const st = new Date(a.startTime).getTime();
                return a.status === 'completed' && st >= dayStart && st <= dayEnd;
            });
            const dayRev = dayAppts.reduce((sum, a) => sum + getPrice(a), 0);
            data.push(dayRev);
        }
        const chartData = { labels, data };

        // --- 6. Próximos Agendamentos (Hoje a partir de agora) ---
        const nextAppointments = apptsToday
            .filter(a => new Date(a.startTime).getTime() >= now.getTime() && a.status !== 'completed' && a.status !== 'cancelled')
            .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
            .slice(0, 4) // Pega apenas os 4 próximos
            .map(a => ({
                client: a.clientName || 'Desconhecido',
                service: a.serviceName || (a.services && a.services[0] ? a.services[0].name : 'Serviço'),
                time: new Date(a.startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                prof: (a.professionalName || '').split(' ')[0] || 'Profissional',
                id: a.id
            }));

        // --- 7. Aniversariantes de Hoje ---
        const todayStr = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}`;
        
        // Remove duplicados pelo telefone (caso o mesmo cliente exista em filiais diferentes)
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
                    if(parts[0].length === 4) { bMonth = parts[1]; bDay = parts[2]; } // YYYY-MM-DD
                    else { bDay = parts[0]; bMonth = parts[1]; } // DD-MM-YYYY
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

        const metrics = { receitaHoje, agendamentosHoje, receitaMes, ticketMedio };
        const isMultiView = estIds.length > 1;

        // --- 8. Renderizar ---
        renderDashboardUI(contentDiv, metrics, chartData, nextAppointments, birthdays, isMultiView);
        initRevenueChart(chartData);
        setupDashboardEvents();

    } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
        contentDiv.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full min-h-[60vh] text-slate-500">
                <i class="bi bi-exclamation-circle text-4xl mb-3 text-rose-400"></i>
                <p class="font-medium text-sm">Ocorreu um erro ao carregar os dados.</p>
                <button onclick="window.navigateTo('dashboard-section')" class="mt-4 px-5 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors">Tentar Novamente</button>
            </div>
        `;
    }
}

function renderDashboardUI(container, metrics, chartData, nextAppointments, birthdays, isMultiView) {
    const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    // Badge extra caso estejamos a ver os dados agregados
    const multiViewBadge = isMultiView 
        ? `<span class="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full ml-2 align-middle">CONSOLIDADO</span>` 
        : '';

    container.innerHTML = `
        <div class="p-5 md:p-8 max-w-7xl mx-auto space-y-6 pb-24 font-sans animate-fade-in">
            
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
                <div>
                    <h2 class="text-[1.4rem] font-semibold text-slate-700 tracking-tight">Visão Geral ${multiViewBadge}</h2>
                    <p class="text-[0.85rem] text-slate-500 font-normal mt-1">Acompanhe o desempenho em tempo real.</p>
                </div>
                <div class="text-right">
                    <p class="text-xs font-semibold text-indigo-600 bg-indigo-50/70 px-3 py-1.5 rounded-lg inline-block border border-indigo-100/50">
                        <i class="bi bi-calendar2-week me-1"></i> ${new Date().toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'long' })}
                    </p>
                </div>
            </div>

            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                
                <div class="bg-white p-5 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-slate-100 flex flex-col justify-center hover:shadow-md transition-all duration-300">
                    <div class="flex items-center gap-3 mb-2">
                        <div class="w-9 h-9 rounded-[10px] bg-emerald-50 text-emerald-500 flex items-center justify-center">
                            <i class="bi bi-cash-stack text-lg"></i>
                        </div>
                        <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Receita Hoje</span>
                    </div>
                    <h3 class="text-2xl md:text-[1.7rem] font-semibold text-slate-700 mt-1">${formatter.format(metrics.receitaHoje)}</h3>
                </div>

                <div class="bg-white p-5 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-slate-100 flex flex-col justify-center hover:shadow-md transition-all duration-300">
                    <div class="flex items-center gap-3 mb-2">
                        <div class="w-9 h-9 rounded-[10px] bg-indigo-50 text-indigo-500 flex items-center justify-center">
                            <i class="bi bi-calendar-check text-lg"></i>
                        </div>
                        <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Agendamentos</span>
                    </div>
                    <h3 class="text-2xl md:text-[1.7rem] font-semibold text-slate-700 mt-1">${metrics.agendamentosHoje}</h3>
                </div>

                <div class="bg-white p-5 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-slate-100 flex flex-col justify-center hover:shadow-md transition-all duration-300">
                    <div class="flex items-center gap-3 mb-2">
                        <div class="w-9 h-9 rounded-[10px] bg-blue-50 text-blue-500 flex items-center justify-center">
                            <i class="bi bi-graph-up-arrow text-lg"></i>
                        </div>
                        <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Receita (Mês)</span>
                    </div>
                    <h3 class="text-2xl md:text-[1.7rem] font-semibold text-slate-700 mt-1">${formatter.format(metrics.receitaMes)}</h3>
                </div>

                <div class="bg-white p-5 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-slate-100 flex flex-col justify-center hover:shadow-md transition-all duration-300">
                    <div class="flex items-center gap-3 mb-2">
                        <div class="w-9 h-9 rounded-[10px] bg-amber-50 text-amber-500 flex items-center justify-center">
                            <i class="bi bi-receipt text-lg"></i>
                        </div>
                        <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Ticket Médio</span>
                    </div>
                    <h3 class="text-2xl md:text-[1.7rem] font-semibold text-slate-700 mt-1">${formatter.format(metrics.ticketMedio)}</h3>
                </div>

            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
                
                <div class="lg:col-span-2 space-y-5 md:space-y-6">
                    
                    <div class="bg-white p-5 md:p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-slate-100">
                        <div class="flex justify-between items-center mb-5">
                            <h3 class="text-[0.95rem] font-semibold text-slate-700">Receita (Últimos 7 dias)</h3>
                            <button class="text-slate-400 hover:text-indigo-500 transition-colors"><i class="bi bi-three-dots"></i></button>
                        </div>
                        <div class="relative h-60 w-full">
                            <canvas id="revenueChart"></canvas>
                        </div>
                    </div>

                    <div class="bg-white p-5 md:p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-slate-100">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-[0.95rem] font-semibold text-slate-700 flex items-center gap-2">
                                Próximos Agendamentos
                            </h3>
                            <button data-action="goto-agenda" class="text-[11px] font-medium text-indigo-500 hover:text-indigo-700 transition-colors">Ver Agenda Completa <i class="bi bi-arrow-right"></i></button>
                        </div>
                        
                        <div class="space-y-2.5">
                            ${nextAppointments.length > 0 ? nextAppointments.map(appt => `
                                <div data-action="goto-agenda" class="flex items-center justify-between p-3.5 rounded-[14px] border border-slate-100/60 bg-slate-50/50 hover:bg-indigo-50/30 hover:border-indigo-100 transition-all cursor-pointer group">
                                    <div class="flex items-center gap-4">
                                        <div class="w-11 h-11 rounded-full bg-white border border-slate-200 flex flex-col items-center justify-center flex-shrink-0 text-indigo-600 shadow-sm">
                                            <span class="font-semibold text-sm">${appt.time.split(':')[0]}</span><span class="text-[8px] font-medium leading-none text-slate-400">${appt.time.split(':')[1]}</span>
                                        </div>
                                        <div>
                                            <p class="font-medium text-slate-700 text-sm group-hover:text-indigo-700 transition-colors">${escapeHTML(appt.client)}</p>
                                            <p class="text-[11px] text-slate-500 font-normal mt-0.5">${escapeHTML(appt.service)} <span class="mx-1 text-slate-300">•</span> ${escapeHTML(appt.prof)}</p>
                                        </div>
                                    </div>
                                    <button class="w-8 h-8 rounded-full text-slate-300 flex items-center justify-center group-hover:text-indigo-500 transition-colors">
                                        <i class="bi bi-chevron-right text-sm"></i>
                                    </button>
                                </div>
                            `).join('') : `
                                <div class="text-center py-8 text-slate-400">
                                    <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <i class="bi bi-cup-hot text-xl text-slate-300"></i>
                                    </div>
                                    <p class="text-sm font-medium text-slate-500">Agenda livre por agora.</p>
                                    <p class="text-xs font-normal mt-1">Nenhum agendamento pendente para hoje.</p>
                                </div>
                            `}
                        </div>
                    </div>

                </div>

                <div class="space-y-5 md:space-y-6">
                    
                    <div class="bg-white p-5 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-slate-100">
                        <h3 class="text-[0.95rem] font-semibold text-slate-700 mb-4">Ações Rápidas</h3>
                        <div class="grid grid-cols-2 gap-3">
                            <button data-action="new-appointment" class="flex flex-col items-center justify-center p-4 bg-indigo-50/50 rounded-2xl text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors border border-indigo-100/50 group">
                                <i class="bi bi-plus-lg text-[1.3rem] mb-2 group-hover:scale-110 transition-transform"></i>
                                <span class="text-[11px] font-medium text-center">Agendamento</span>
                            </button>
                            
                            <button data-action="goto-pdv" class="flex flex-col items-center justify-center p-4 bg-emerald-50/50 rounded-2xl text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors border border-emerald-100/50 group">
                                <i class="bi bi-cart2 text-[1.3rem] mb-2 group-hover:scale-110 transition-transform"></i>
                                <span class="text-[11px] font-medium text-center">Abrir PDV</span>
                            </button>
                            
                            <button data-action="goto-clients" class="flex flex-col items-center justify-center p-4 bg-blue-50/50 rounded-2xl text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors border border-blue-100/50 group">
                                <i class="bi bi-people text-[1.3rem] mb-2 group-hover:scale-110 transition-transform"></i>
                                <span class="text-[11px] font-medium text-center">Clientes</span>
                            </button>
                            
                            <button data-action="open-link" class="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-colors border border-slate-200/60 group">
                                <i class="bi bi-link-45deg text-[1.3rem] mb-2 group-hover:scale-110 transition-transform"></i>
                                <span class="text-[11px] font-medium text-center">O meu Link</span>
                            </button>
                        </div>
                    </div>

                    <div class="bg-white p-5 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-slate-100">
                        <h3 class="text-[0.95rem] font-semibold text-slate-700 mb-4 flex items-center gap-2">
                            <i class="bi bi-gift text-rose-400"></i> Aniversariantes Hoje
                        </h3>
                        
                        <div class="space-y-3">
                            ${birthdays.length > 0 ? birthdays.map(b => {
                                const cleanPhone = (b.phone || '').replace(/\D/g, '');
                                const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Olá ${b.name.split(' ')[0]}! A equipa deseja-lhe um Feliz Aniversário! 🎉`)}`;
                                
                                return `
                                <div class="flex items-center justify-between p-3 rounded-[12px] border border-rose-50 bg-rose-50/30">
                                    <div class="flex items-center gap-3">
                                        <div class="w-9 h-9 rounded-full bg-rose-100/70 text-rose-500 flex items-center justify-center font-semibold text-sm">
                                            ${escapeHTML(b.name).charAt(0)}
                                        </div>
                                        <div>
                                            <p class="font-medium text-slate-700 text-[0.8rem]">${escapeHTML(b.name)}</p>
                                            ${b.age ? `<p class="text-[10px] font-medium text-rose-400 mt-0.5">${b.age} anos</p>` : ''}
                                        </div>
                                    </div>
                                    <a href="${waLink}" target="_blank" class="w-8 h-8 rounded-full bg-white text-emerald-500 shadow-sm border border-emerald-50 flex items-center justify-center hover:bg-emerald-50 transition-colors" title="Enviar Parabéns pelo WhatsApp">
                                        <i class="bi bi-whatsapp text-[0.85rem]"></i>
                                    </a>
                                </div>
                            `}).join('') : `
                                <div class="text-center py-5 text-slate-400">
                                    <p class="text-xs font-normal">Sem aniversariantes hoje.</p>
                                </div>
                            `}
                        </div>
                    </div>

                </div>
            </div>
        </div>
        
        <style>
            @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        </style>
    `;
}

function initRevenueChart(chartData) {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;

    if (revenueChartInstance) {
        revenueChartInstance.destroy();
    }

    const canvasContext = ctx.getContext('2d');
    const gradient = canvasContext.createLinearGradient(0, 0, 0, 240);
    gradient.addColorStop(0, 'rgba(79, 70, 229, 0.15)'); 
    gradient.addColorStop(1, 'rgba(79, 70, 229, 0.01)');

    revenueChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: 'Receita (R$)',
                data: chartData.data,
                borderColor: '#6366f1', 
                backgroundColor: gradient,
                borderWidth: 2.5,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: '#6366f1',
                pointBorderWidth: 2,
                pointRadius: 3,
                pointHoverRadius: 5,
                fill: true,
                tension: 0.35 
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1e293b',
                    padding: 12,
                    cornerRadius: 8,
                    titleFont: { size: 12, family: 'Inter', weight: 'normal' },
                    bodyFont: { size: 13, weight: 'bold', family: 'Inter' },
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            if (context.parsed.y !== null) {
                                return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
                            }
                            return '';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#f8fafc', drawBorder: false },
                    border: { display: false },
                    ticks: {
                        color: '#94a3b8',
                        font: { family: 'Inter', size: 10 },
                        maxTicksLimit: 6,
                        callback: function(value) { return 'R$ ' + value; }
                    }
                },
                x: {
                    grid: { display: false, drawBorder: false },
                    border: { display: false },
                    ticks: { color: '#94a3b8', font: { family: 'Inter', size: 11, weight: '500' } }
                }
            },
            interaction: { intersect: false, mode: 'index' },
        }
    });
}

function setupDashboardEvents() {
    const contentDiv = document.getElementById('content');
    
    contentDiv.addEventListener('click', (e) => {
        const actionBtn = e.target.closest('[data-action]');
        if (!actionBtn) return;

        const action = actionBtn.dataset.action;
        
        switch(action) {
            case 'goto-agenda':
                navigateTo('agenda-section');
                break;
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