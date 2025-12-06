// js/api/reports.js

import { authenticatedFetch } from './apiService.js';

// ============================================================================
// 🚀 NOVAS FUNÇÕES (NOVO DASHBOARD / DRE)
// ============================================================================

/**
 * Busca todos os indicadores financeiros e de agendamentos.
 */
export const getAdvancedIndicators = (startDate, endDate, professionalId = 'all', costCenterId = 'all') => {
    const params = { startDate, endDate };
    if (professionalId && professionalId !== 'all') params.professionalId = professionalId;
    if (costCenterId && costCenterId !== 'all') params.costCenterId = costCenterId;
    
    const queryParams = new URLSearchParams(params).toString();
    return authenticatedFetch(`/api/reports/indicators?${queryParams}`);
};

/**
 * Busca lista detalhada de agendamentos do dia.
 */
export const getDailyAppointments = (date, professionalId = 'all') => {
    const params = { date };
    if (professionalId && professionalId !== 'all') params.professionalId = professionalId;
    const queryParams = new URLSearchParams(params).toString();
    return authenticatedFetch(`/api/reports/appointments/list?${queryParams}`);
};

/**
 * Busca Centros de Custo (usando a rota do módulo financeiro)
 */
export const getCostCenters = () => {
    return authenticatedFetch('/api/financial/cost-centers');
};

// ============================================================================
// 📦 FUNÇÕES ORIGINAIS (RESTAURADAS PARA COMPATIBILIDADE)
// ============================================================================

/**
 * Busca os dados de analytics (KPIs e gráfico) para o painel de relatórios (dashboard).
 * (Mantido para compatibilidade, embora o ideal seja migrar para getAdvancedIndicators)
 */
export const getAnalytics = (establishmentId, startDate, endDate) => {
    return authenticatedFetch(`/api/analytics/${establishmentId}?startDate=${startDate}&endDate=${endDate}`);
};

/**
 * Busca o relatório de vendas detalhado com base nos filtros.
 * CRUCIAL PARA A TELA DE VENDAS ANTIGA (salesReport.js)
 */
export const getSalesReport = ({ establishmentId, startDate, endDate, cashierSessionId }) => {
    let endpoint = `/api/reports/sales/${establishmentId}?startDate=${startDate}&endDate=${endDate}`;
    if (cashierSessionId && cashierSessionId !== 'all') {
        endpoint += `&cashierSessionId=${cashierSessionId}`;
    }
    return authenticatedFetch(endpoint);
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
 */
export const getSummaryKPIs = () => {
    return authenticatedFetch('/api/reports/summary', {
        method: 'GET',
    });
};