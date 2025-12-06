// js/api/commissions.js

import { authenticatedFetch } from './apiService.js';

/**
 * Calcula a comissão com base nos filtros fornecidos.
 * @param {object} commissionData - Os dados para o cálculo.
 */
export const calculateCommission = (commissionData) => {
    return authenticatedFetch('/api/commissions/calculate', { 
        method: 'POST',
        body: JSON.stringify(commissionData),
    });
};

/**
 * Salva um relatório de comissão gerado.
 * @param {object} reportData - O relatório a ser salvo.
 */
export const saveCommissionReport = (reportData) => {
    return authenticatedFetch('/api/commissions/save', {
        method: 'POST',
        body: JSON.stringify(reportData),
    });
};

/**
 * Busca estatísticas do Dashboard (Faturamento x Comissões Pagas)
 * @param {string} startDate - Data inicial (YYYY-MM-DD)
 * @param {string} endDate - Data final (YYYY-MM-DD)
 */
export const getDashboardStats = (startDate, endDate) => {
    const queryParams = new URLSearchParams({ startDate, endDate }).toString();
    return authenticatedFetch(`/api/commissions/stats?${queryParams}`);
};

/**
 * Busca o histórico de relatórios com filtros avançados.
 * @param {object} filters - Filtros (professionalId, startDate, endDate).
 */
export const getCommissionHistory = (filters = {}) => { 
    // Remove chaves vazias ou nulas antes de enviar
    Object.keys(filters).forEach(key => (filters[key] === undefined || filters[key] === null || filters[key] === '') && delete filters[key]);

    const queryParams = new URLSearchParams(filters).toString();
    const url = `/api/commissions/history${queryParams ? '?' + queryParams : ''}`;
    return authenticatedFetch(url);
};

/**
 * Exclui um relatório de comissão específico.
 * @param {string} reportId - O ID do relatório a ser excluído.
 */
export const deleteCommissionReport = (reportId) => {
    return authenticatedFetch(`/api/commissions/report/${reportId}`, {
        method: 'DELETE',
    });
};