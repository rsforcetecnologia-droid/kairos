// js/api/reports.js

import { authenticatedFetch } from './apiService.js';

// ============================================================================
// 🚀 NOVAS FUNÇÕES (NOVO DASHBOARD / DRE)
// ============================================================================

/**
 * Busca todos os indicadores financeiros e de agendamentos.
 * Aceita filtros de data, profissional e centro de custo.
 */
export const getAdvancedIndicators = (startDate, endDate, professionalId = 'all', costCenterId = 'all') => {
    const params = new URLSearchParams({ startDate, endDate });
    
    if (professionalId && professionalId !== 'all') params.append('professionalId', professionalId);
    if (costCenterId && costCenterId !== 'all') params.append('costCenterId', costCenterId);
    
    return authenticatedFetch(`/api/reports/indicators?${params.toString()}`);
};

/**
 * Busca lista detalhada de agendamentos do dia (Drill-down do gráfico).
 */
export const getDailyAppointments = (date, professionalId = 'all') => {
    const params = new URLSearchParams({ date });
    if (professionalId && professionalId !== 'all') params.append('professionalId', professionalId);
    
    return authenticatedFetch(`/api/reports/appointments/list?${params.toString()}`);
};

/**
 * Busca Centros de Custo (usando a rota do módulo financeiro para popular o filtro).
 * CORREÇÃO: Recebe establishmentId para evitar erro 404
 */
export const getCostCenters = (establishmentId) => {
    if (!establishmentId) return Promise.resolve([]); // Retorna array vazio se não houver ID (fallback)
    return authenticatedFetch(`/api/financial/cost-centers/${establishmentId}`);
};

// ============================================================================
// 📦 FUNÇÕES ORIGINAIS (MANTIDAS PARA COMPATIBILIDADE)
// ============================================================================

/**
 * Busca os dados de analytics (KPIs e gráfico) - Legado.
 */
export const getAnalytics = (establishmentId, startDate, endDate) => {
    const params = new URLSearchParams({ startDate, endDate });
    return authenticatedFetch(`/api/analytics/${establishmentId}?${params.toString()}`);
};

/**
 * Busca o relatório de vendas detalhado.
 * Usado na tela de Relatório de Vendas antiga.
 */
export const getSalesReport = ({ establishmentId, startDate, endDate, cashierSessionId }) => {
    const params = new URLSearchParams({ startDate, endDate });
    
    if (cashierSessionId && cashierSessionId !== 'all') {
        params.append('cashierSessionId', cashierSessionId);
    }
    
    // Passa o ID na query string ou na rota, dependendo de como o seu backend espera.
    // Assumindo rota REST padrão com query params:
    if (establishmentId) {
        params.append('establishmentId', establishmentId);
    }

    return authenticatedFetch(`/api/reports/sales?${params.toString()}`);
};

/**
 * Busca os dados detalhados de um mês específico (para drill-down antigo).
 */
export const getMonthlyAnalytics = (establishmentId, year, month) => {
    return authenticatedFetch(`/api/analytics/${establishmentId}/monthly-details?year=${year}&month=${month}`);
};

/**
 * Busca os detalhes de transações de um dia específico (para drill-down antigo).
 */
export const getDailyTransactions = (establishmentId, year, month, day) => {
    const endpoint = `/api/analytics/${establishmentId}/daily-details?year=${year}&month=${month}&day=${day}`;
    return authenticatedFetch(endpoint);
};

/**
 * Busca os detalhes de atendimentos de um profissional (para drill-down antigo).
 */
export const getProfessionalMonthlyDetails = (establishmentId, year, month, professionalId) => {
    const endpoint = `/api/analytics/${establishmentId}/professional-details?year=${year}&month=${month}&professionalId=${professionalId}`;
    return authenticatedFetch(endpoint);
};

/**
 * Busca o relatório de comissões (rota antiga).
 */
export const getCommissionReport = (establishmentId, year, month, professionalId) => {
    return authenticatedFetch(`/api/reports/commissions/${establishmentId}?year=${year}&month=${month}&professionalId=${professionalId}`);
};

/**
 * Busca os KPIs resumidos (Sidebar/Home).
 * CORREÇÃO: Função necessária para o main.js
 */
export const getSummaryKPIs = () => {
    return authenticatedFetch('/api/reports/summary', {
        method: 'GET',
    });
};