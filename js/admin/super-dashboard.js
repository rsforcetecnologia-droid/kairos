// js/admin/super-dashboard.js

import { authenticatedFetch } from '../api/apiService.js';

// Função auxiliar para formatar moeda
const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
};

export async function loadDashboard(container) {
    
    // 1. Ecrã de carregamento moderno com Tailwind
    container.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full text-slate-400">
            <div class="loader mb-4"></div>
            <p class="font-medium text-sm animate-pulse">A carregar métricas do SaaS...</p>
        </div>
    `;

    try {
        // 2. Chamada à API segura do Backend (Onde o MRR e outras métricas são calculadas)
        // NOTA: Certifique-se de que a rota no backend foi mapeada em /api/admin/dashboard-stats no express
        const response = await authenticatedFetch('/api/admin/dashboard-stats');
        
        if (!response || !response.kpis) {
            throw new Error("Dados de KPIs não retornados pela API.");
        }

        const { kpis } = response;

        // 3. Mini-gráfico CSS embutido para Novos Assinantes (Sparkline)
        const maxSubscribers = Math.max(...kpis.newSubscribersData, 1); // Evita divisão por 0
        const sparklineHTML = kpis.newSubscribersData.map(val => {
            const heightPercentage = (val / maxSubscribers) * 100;
            return `
                <div class="group relative flex-1 flex items-end justify-center h-full">
                    <div class="w-full bg-brand-200 hover:bg-brand-500 transition-colors rounded-t-sm" style="height: ${heightPercentage}%"></div>
                    <div class="opacity-0 group-hover:opacity-100 absolute -top-8 bg-slate-800 text-white text-[10px] py-1 px-2 rounded font-bold transition-opacity whitespace-nowrap z-10 pointer-events-none">
                        ${val} novos
                    </div>
                </div>
            `;
        }).join('');

        // 4. Renderização do Layout Moderno
        container.innerHTML = `
            <div class="max-w-7xl mx-auto animate-fade-in space-y-6 pb-12">
                
                <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
                    <div>
                        <h2 class="text-2xl font-black text-slate-800 tracking-tight">Visão Executiva SaaS</h2>
                        <p class="text-sm text-slate-500 font-medium mt-1">Acompanhe a saúde financeira e o crescimento da sua plataforma.</p>
                    </div>
                    <button onclick="location.reload()" class="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 shadow-sm transition-all active:scale-95 flex items-center gap-2">
                        <i class="bi bi-arrow-clockwise text-sm"></i> Atualizar Dados
                    </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                    
                    <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-colors">
                        <div class="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <i class="bi bi-cash-stack text-9xl text-emerald-500"></i>
                        </div>
                        <div class="flex items-center gap-3 mb-3 relative z-10">
                            <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-inner">
                                <i class="bi bi-graph-up-arrow text-lg"></i>
                            </div>
                            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">Receita<br>Recorrente (MRR)</span>
                        </div>
                        <h3 class="text-3xl font-black text-slate-800 relative z-10 tracking-tight">${formatCurrency(kpis.mrr)}</h3>
                    </div>

                    <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-brand-300 transition-colors">
                        <div class="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <i class="bi bi-buildings text-9xl text-brand-500"></i>
                        </div>
                        <div class="flex items-center gap-3 mb-3 relative z-10">
                            <div class="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-100 shadow-inner">
                                <i class="bi bi-check-circle-fill text-lg"></i>
                            </div>
                            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">Assinaturas<br>Ativas</span>
                        </div>
                        <h3 class="text-3xl font-black text-slate-800 relative z-10 tracking-tight">${kpis.activeUsers}</h3>
                    </div>

                    <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-slate-300 transition-colors">
                        <div class="absolute -right-6 -top-6 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                            <i class="bi bi-hdd-network text-9xl text-slate-500"></i>
                        </div>
                        <div class="flex items-center gap-3 mb-3 relative z-10">
                            <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200 shadow-inner">
                                <i class="bi bi-database-fill text-lg"></i>
                            </div>
                            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">Total<br>Cadastrados</span>
                        </div>
                        <h3 class="text-3xl font-black text-slate-800 relative z-10 tracking-tight">${kpis.totalUsers}</h3>
                    </div>

                    <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-rose-300 transition-colors">
                        <div class="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <i class="bi bi-pie-chart-fill text-9xl text-rose-500"></i>
                        </div>
                        <div class="flex items-center gap-3 mb-3 relative z-10">
                            <div class="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 shadow-inner">
                                <i class="bi bi-exclamation-triangle-fill text-lg"></i>
                            </div>
                            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">Taxa de<br>Cancelamento</span>
                        </div>
                        <h3 class="text-3xl font-black text-rose-600 relative z-10 tracking-tight">${kpis.churnRate}%</h3>
                    </div>

                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    
                    <div class="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                        <div class="flex justify-between items-center mb-6">
                            <div>
                                <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                                    <i class="bi bi-bar-chart-fill text-brand-500"></i> Novos Assinantes
                                </h3>
                                <p class="text-xs text-slate-400 mt-1">Crescimento diário nos últimos 30 dias.</p>
                            </div>
                            <div class="bg-brand-50 text-brand-700 text-xl font-black px-4 py-2 rounded-xl shadow-inner border border-brand-100">
                                +${kpis.newSubscribersData.reduce((a, b) => a + b, 0)}
                            </div>
                        </div>
                        
                        <div class="flex-1 min-h-[160px] flex items-end gap-1 pb-2 pt-8 border-b border-slate-100">
                            ${sparklineHTML}
                        </div>
                        <div class="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-3">
                            <span>Há 30 dias</span>
                            <span>Hoje</span>
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5 flex items-center gap-2">
                            <i class="bi bi-lightning-charge-fill text-amber-400"></i> Acções Rápidas
                        </h3>
                        
                        <div class="space-y-3">
                            <a href="#establishments" class="block w-full text-left p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-brand-50 hover:border-brand-200 transition-colors group">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 rounded-lg bg-white text-brand-600 flex items-center justify-center shadow-sm border border-slate-200 group-hover:border-brand-300">
                                            <i class="bi bi-building-add"></i>
                                        </div>
                                        <span class="font-bold text-sm text-slate-700 group-hover:text-brand-700">Novo Inquilino (Rede)</span>
                                    </div>
                                    <i class="bi bi-chevron-right text-slate-400"></i>
                                </div>
                            </a>
                            
                            <a href="#financial" class="block w-full text-left p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 transition-colors group">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 rounded-lg bg-white text-emerald-600 flex items-center justify-center shadow-sm border border-slate-200 group-hover:border-emerald-300">
                                            <i class="bi bi-tags-fill"></i>
                                        </div>
                                        <span class="font-bold text-sm text-slate-700 group-hover:text-emerald-700">Gerir Planos SaaS</span>
                                    </div>
                                    <i class="bi bi-chevron-right text-slate-400"></i>
                                </div>
                            </a>

                            <div class="pt-4 mt-4 border-t border-slate-100">
                                <div class="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex gap-3">
                                    <i class="bi bi-info-circle-fill text-indigo-500 mt-0.5"></i>
                                    <div>
                                        <p class="text-xs font-bold text-indigo-900">Modo de Suporte</p>
                                        <p class="text-[10px] text-indigo-700 mt-1 font-medium leading-tight">Vá à secção "Clientes (Redes)", selecione um inquilino e clique em "Assumir Identidade" para prestar suporte.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        `;

    } catch (error) {
        console.error("Erro ao carregar os dados do Dashboard:", error);
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-slate-500 p-6">
                <i class="bi bi-exclamation-triangle text-5xl mb-4 text-rose-400"></i>
                <h3 class="font-bold text-lg text-slate-700">Falha ao Sincronizar</h3>
                <p class="font-medium text-sm mt-1 max-w-md text-center">Não foi possível carregar as métricas do SaaS. Verifique se o utilizador atual possui privilégios de Super Admin.</p>
                <button onclick="location.reload()" class="mt-6 px-6 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-700 transition-colors shadow-sm active:scale-95">Tentar Novamente</button>
            </div>
        `;
    }
}