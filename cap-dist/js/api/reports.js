// js/api/reports.js

import { authenticatedFetch } from './apiService.js';

/**
 * Busca os dados de analytics (KPIs e gráfico) para o painel de relatórios (dashboard).
 * @param {string} establishmentId - O ID do estabelecimento.
 * @param {string} startDate - Data de início no formato 'YYYY-MM-DD'.
 * @param {string} endDate - Data de fim no formato 'YYYY-MM-DD'.
 * @returns {Promise<object>} - Uma promessa que resolve com os dados de analytics.
 */
export const getAnalytics = (establishmentId, startDate, endDate) => {
    return authenticatedFetch(`/api/analytics/${establishmentId}?startDate=${startDate}&endDate=${endDate}`);
};

/**
 * Busca o relatório de vendas detalhado com base nos filtros.
 * @param {object} params - Parâmetros do relatório.
 * @returns {Promise<object>} - Uma promessa que resolve com os dados do relatório de vendas.
 */
export const getSalesReport = ({ establishmentId, startDate, endDate, cashierSessionId }) => {
    let endpoint = `/api/reports/sales/${establishmentId}?startDate=${startDate}&endDate=${endDate}`;
    if (cashierSessionId && cashierSessionId !== 'all') {
        endpoint += `&cashierSessionId=${cashierSessionId}`;
    }
    return authenticatedFetch(endpoint);
};

/**
 * Busca os dados detalhados de um mês específico (para drill-down).
 * @param {string} establishmentId - O ID do estabelecimento.
 * @param {number} year - O ano.
 * @param {number} month - O mês (0-11).
 * @returns {Promise<object>} - Uma promessa que resolve com os dados detalhados do mês.
 */
export const getMonthlyAnalytics = (establishmentId, year, month) => {
    return authenticatedFetch(`/api/analytics/${establishmentId}/monthly-details?year=${year}&month=${month}`);
};

/**
 * NOVO: Busca os detalhes de transações de um dia específico (para drill-down).
 * @param {string} establishmentId - O ID do estabelecimento.
 * @param {number} year - O ano.
 * @param {number} month - O mês (0-11).
 * @param {number} day - O dia do mês.
 * @returns {Promise<object>} - Uma promessa que resolve com os detalhes das transações do dia.
 */
export const getDailyTransactions = (establishmentId, year, month, day) => {
    const endpoint = `/api/analytics/${establishmentId}/daily-details?year=${year}&month=${month}&day=${day}`;
    return authenticatedFetch(endpoint);
};


/**
 * Busca os detalhes de atendimentos de um profissional em um mês específico (para drill-down).
 * @param {string} establishmentId - O ID do estabelecimento.
 * @param {number} year - O ano.
 * @param {number} month - O mês (0-11).
 * @param {string} professionalId - O ID do profissional.
 * @returns {Promise<object>} - Uma promessa que resolve com os detalhes dos atendimentos.
 */
export const getProfessionalMonthlyDetails = (establishmentId, year, month, professionalId) => {
    const endpoint = `/api/analytics/${establishmentId}/professional-details?year=${year}&month=${month}&professionalId=${professionalId}`;
    return authenticatedFetch(endpoint);
};

/**
 * NOVO: Busca o relatório de comissões.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @param {string} year - O ano.
 * @param {string} month - O mês.
 * @param {string} professionalId - O ID do profissional ('all' para todos).
 * @returns {Promise<Array>} - Uma promessa que resolve com a lista de relatórios de comissão.
 */
export const getCommissionReport = (establishmentId, year, month, professionalId) => {
    return authenticatedFetch(`/api/reports/commissions/${establishmentId}?year=${year}&month=${month}&professionalId=${professionalId}`);
};

// ####################################################################
// ### INÍCIO DA NOVA FUNÇÃO (KPIs) ###
// ####################################################################

/**
 * Busca os KPIs resumidos (Agendamentos do Dia, Faturado do Dia)
 * para o painel da sidebar.
 * @returns {Promise<object>} - Um objeto com { todayAppointments, todayRevenue }
 */
export const getSummaryKPIs = () => {
    // Esta é a nova rota GET que criámos em 'routes/reports.js'
    return authenticatedFetch('/api/reports/summary', {
        method: 'GET',
    });
};
// ####################################################################
// ### FIM DA NOVA FUNÇÃO ###
// ####################################################################