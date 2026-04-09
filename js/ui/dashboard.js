// js/ui/dashboard.js

import { state } from '../state.js';
import * as appointmentsApi from '../api/appointments.js';
import * as salesApi from '../api/sales.js';
import * as clientsApi from '../api/clients.js';
import { navigateTo } from '../main.js';
import { escapeHTML } from '../utils.js';

let revenueChartInstance = null;

export async function loadDashboardPage() {
    const contentDiv = document.getElementById('content');
    
    // Mostra um estado de carregamento
    contentDiv.innerHTML = `
        <div class="flex items-center justify-center h-full min-h-[60vh]">
            <div class="flex flex-col items-center">
                <div class="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                <p class="text-slate-500 font-medium">A carregar o seu resumo...</p>
            </div>
        </div>
    `;

    try {
        // Buscar dados necessários (Simulação de chamadas reais)
        // Substitui pelas tuas funções reais de API depois
        const today = new Date();
        const startOfDay = new Date(today.setHours(0,0,0,0)).toISOString();
        const endOfDay = new Date(today.setHours(23,59,59,999)).toISOString();
        
        // Exemplo de chamadas em paralelo para performance
        /*
        const [todaySales, monthSales, todayAppointments, allClients] = await Promise.all([
            salesApi.getSalesByDateRange(state.establishmentId, startOfDay, endOfDay),
            salesApi.getSalesByMonth(state.establishmentId, today.getMonth(), today.getFullYear()),
            appointmentsApi.getAppointmentsByDateRange(state.establishmentId, startOfDay, endOfDay),
            clientsApi.getClients(state.establishmentId)
        ]);
        */

        // DADOS MOCKADOS PARA VISUALIZAÇÃO DA UI (Remove na integração real)
        const mockMetrics = {
            receitaHoje: 850.50,
            agendamentosHoje: 12,
            receitaMes: 15420.00,
            ticketMedio: 70.87
        };

        const mockChartData = {
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
            data: [450, 600, 300, 850, 1200, 1500, 200]
        };

        const mockNextAppointments = [
            { client: 'Ana Silva', service: 'Corte Feminino', time: '14:30', prof: 'João', status: 'pending' },
            { client: 'Carlos Santos', service: 'Barba e Cabelo', time: '15:00', prof: 'Miguel', status: 'confirmed' },
            { client: 'Beatriz Costa', service: 'Manicure', time: '15:45', prof: 'Sara', status: 'pending' }
        ];

        const mockBirthdays = [
            { name: 'Maria Fernandes', age: 34, phone: '912345678' }
        ];

        // Renderizar a UI
        renderDashboardUI(contentDiv, mockMetrics, mockChartData, mockNextAppointments, mockBirthdays);
        
        // Inicializar o Gráfico após renderizar o HTML
        initRevenueChart(mockChartData);
        
        // Configurar Eventos de Clique
        setupDashboardEvents();

    } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
        contentDiv.innerHTML = `
            <div class="p-6 text-center text-rose-500">
                <i class="bi bi-exclamation-circle text-4xl mb-2"></i>
                <p>Ocorreu um erro ao carregar os dados. Tente novamente.</p>
            </div>
        `;
    }
}

function renderDashboardUI(container, metrics, chartData, nextAppointments, birthdays) {
    const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    container.innerHTML = `
        <div class="p-4 md:p-6 max-w-7xl mx-auto space-y-6 pb-24 font-sans animate-fade-in">
            
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 class="text-2xl font-black text-slate-800 tracking-tight">Visão Geral</h2>
                    <p class="text-sm text-slate-500 font-medium">Acompanhe o desempenho do seu negócio em tempo real.</p>
                </div>
                <div class="text-right">
                    <p class="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg inline-block">
                        <i class="bi bi-calendar-event me-1"></i> ${new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                </div>
            </div>

            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center hover:shadow-md transition-shadow">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
                            <i class="bi bi-cash-stack text-xl"></i>
                        </div>
                        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Receita Hoje</span>
                    </div>
                    <h3 class="text-2xl font-black text-slate-800">${formatter.format(metrics.receitaHoje)}</h3>
                </div>

                <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center hover:shadow-md transition-shadow">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
                            <i class="bi bi-calendar-check text-xl"></i>
                        </div>
                        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Agendamentos</span>
                    </div>
                    <h3 class="text-2xl font-black text-slate-800">${metrics.agendamentosHoje}</h3>
                </div>

                <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center hover:shadow-md transition-shadow">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
                            <i class="bi bi-graph-up-arrow text-xl"></i>
                        </div>
                        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Receita (Mês)</span>
                    </div>
                    <h3 class="text-2xl font-black text-slate-800">${formatter.format(metrics.receitaMes)}</h3>
                </div>

                <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center hover:shadow-md transition-shadow">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-inner">
                            <i class="bi bi-receipt text-xl"></i>
                        </div>
                        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Ticket Médio</span>
                    </div>
                    <h3 class="text-2xl font-black text-slate-800">${formatter.format(metrics.ticketMedio)}</h3>
                </div>

            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <div class="lg:col-span-2 space-y-6">
                    
                    <div class="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="text-base font-bold text-slate-800">Receita (Últimos 7 dias)</h3>
                            <button class="text-slate-400 hover:text-indigo-600"><i class="bi bi-three-dots-vertical"></i></button>
                        </div>
                        <div class="relative h-64 w-full">
                            <canvas id="revenueChart"></canvas>
                        </div>
                    </div>

                    <div class="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-base font-bold text-slate-800 flex items-center gap-2">
                                <i class="bi bi-clock-history text-indigo-500"></i> Próximas 2 Horas
                            </h3>
                            <button data-action="goto-agenda" class="text-xs font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-wide">Ver Agenda Completa</button>
                        </div>
                        
                        <div class="space-y-3">
                            ${nextAppointments.length > 0 ? nextAppointments.map(appt => `
                                <div class="flex items-center justify-between p-3 md:p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all cursor-pointer">
                                    <div class="flex items-center gap-4">
                                        <div class="w-12 h-12 rounded-full bg-white border border-slate-200 flex flex-col items-center justify-center flex-shrink-0 text-indigo-600 font-black shadow-sm">
                                            ${appt.time.split(':')[0]}<span class="text-[9px] leading-none">${appt.time.split(':')[1]}</span>
                                        </div>
                                        <div>
                                            <p class="font-bold text-slate-800 text-sm">${escapeHTML(appt.client)}</p>
                                            <p class="text-xs text-slate-500 font-medium mt-0.5">${escapeHTML(appt.service)} · <i class="bi bi-person-badge"></i> ${escapeHTML(appt.prof)}</p>
                                        </div>
                                    </div>
                                    <button class="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors">
                                        <i class="bi bi-chevron-right"></i>
                                    </button>
                                </div>
                            `).join('') : `
                                <div class="text-center py-6 text-slate-400">
                                    <i class="bi bi-cup-hot text-3xl mb-2 block"></i>
                                    <p class="text-sm font-medium">Nenhum agendamento para as próximas 2 horas.</p>
                                </div>
                            `}
                        </div>
                    </div>

                </div>

                <div class="space-y-6">
                    
                    <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                        <h3 class="text-base font-bold text-slate-800 mb-4">Ações Rápidas</h3>
                        <div class="grid grid-cols-2 gap-3">
                            <button data-action="new-appointment" class="flex flex-col items-center justify-center p-4 bg-indigo-50 rounded-xl text-indigo-700 hover:bg-indigo-600 hover:text-white transition-all shadow-sm group">
                                <i class="bi bi-plus-circle text-2xl mb-2 group-hover:scale-110 transition-transform"></i>
                                <span class="text-xs font-bold text-center">Novo Agendamento</span>
                            </button>
                            
                            <button data-action="goto-pdv" class="flex flex-col items-center justify-center p-4 bg-emerald-50 rounded-xl text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all shadow-sm group">
                                <i class="bi bi-cart-plus text-2xl mb-2 group-hover:scale-110 transition-transform"></i>
                                <span class="text-xs font-bold text-center">Abrir Comanda / PDV</span>
                            </button>
                            
                            <button data-action="goto-clients" class="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-xl text-blue-700 hover:bg-blue-600 hover:text-white transition-all shadow-sm group">
                                <i class="bi bi-people text-2xl mb-2 group-hover:scale-110 transition-transform"></i>
                                <span class="text-xs font-bold text-center">Meus Clientes</span>
                            </button>
                            
                            <button data-action="open-link" class="flex flex-col items-center justify-center p-4 bg-slate-100 rounded-xl text-slate-700 hover:bg-slate-800 hover:text-white transition-all shadow-sm group">
                                <i class="bi bi-link-45deg text-2xl mb-2 group-hover:scale-110 transition-transform"></i>
                                <span class="text-xs font-bold text-center">Link de Agendamento</span>
                            </button>
                        </div>
                    </div>

                    <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                        <h3 class="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <i class="bi bi-gift text-rose-500"></i> Aniversariantes Hoje
                        </h3>
                        
                        <div class="space-y-3">
                            ${birthdays.length > 0 ? birthdays.map(b => `
                                <div class="flex items-center justify-between p-3 rounded-xl border border-rose-100 bg-rose-50/50">
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                                            ${escapeHTML(b.name).charAt(0)}
                                        </div>
                                        <div>
                                            <p class="font-bold text-slate-800 text-sm">${escapeHTML(b.name)}</p>
                                            <p class="text-[11px] font-bold text-rose-500 uppercase tracking-wide">${b.age} anos</p>
                                        </div>
                                    </div>
                                    <button class="w-8 h-8 rounded-full bg-white text-emerald-500 shadow-sm border border-emerald-100 flex items-center justify-center hover:bg-emerald-50 transition-colors" title="Enviar Parabéns pelo WhatsApp">
                                        <i class="bi bi-whatsapp"></i>
                                    </button>
                                </div>
                            `).join('') : `
                                <div class="text-center py-4 text-slate-400">
                                    <p class="text-sm font-medium">Sem aniversariantes hoje.</p>
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

    // Cria o gradiente para debaixo da linha
    const canvasContext = ctx.getContext('2d');
    const gradient = canvasContext.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(79, 70, 229, 0.2)'); // Indigo-600 com transparência
    gradient.addColorStop(1, 'rgba(79, 70, 229, 0)');

    revenueChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: 'Receita Diária (R$)',
                data: chartData.data,
                borderColor: '#4f46e5', // Indigo 600
                backgroundColor: gradient,
                borderWidth: 3,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: '#4f46e5',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true,
                tension: 0.4 // Suaviza a linha (curva)
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
                    titleFont: { size: 13, family: 'Inter' },
                    bodyFont: { size: 14, weight: 'bold', family: 'Inter' },
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#f1f5f9', drawBorder: false },
                    ticks: {
                        color: '#94a3b8',
                        font: { family: 'Inter', size: 11 },
                        callback: function(value) { return 'R$ ' + value; }
                    }
                },
                x: {
                    grid: { display: false, drawBorder: false },
                    ticks: { color: '#64748b', font: { family: 'Inter', size: 12, weight: '500' } }
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
                // Adicionar lógica opcional para abrir o modal direto ao chegar na agenda
                break;
            case 'goto-pdv':
                navigateTo('comandas-section');
                break;
            case 'goto-clients':
                navigateTo('clientes-section');
                break;
            case 'open-link':
                // Supondo que o link público é baseado no ID do estabelecimento
                const publicUrl = `${window.location.origin}/cliente.html?id=${state.establishmentId || ''}`;
                window.open(publicUrl, '_blank');
                break;
        }
    });
}