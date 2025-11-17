// js/api/commissions.js

import { authenticatedFetch } from './apiService.js';

/**
 * Calcula a comissão com base nos filtros fornecidos.
 * @param {object} commissionData - Os dados para o cálculo.
 * @returns {Promise<object>} - Uma promessa que resolve com o resultado do cálculo da comissão.
 */
export const calculateCommission = (commissionData) => {
    // CORREÇÃO: O caminho DEVE começar com /api, pois o apiService.js não o inclui.
    return authenticatedFetch('/api/commissions/calculate', { 
        method: 'POST',
        body: JSON.stringify(commissionData),
    });
};

/**
 * Salva um relatório de comissão gerado.
 * @param {object} reportData - O relatório a ser salvo.
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação.
 */
export const saveCommissionReport = (reportData) => {
    // CORREÇÃO: O caminho DEVE começar com /api.
    return authenticatedFetch('/api/commissions/save', {
        method: 'POST',
        body: JSON.stringify(reportData),
    });
};

/**
 * Busca o histórico de TODOS os relatórios de comissão salvos para o estabelecimento, com filtros opcionais.
 * @param {object} filters - Filtros como professionalId e period (formato YYYY-MM).
 * @returns {Promise<Array>} - Uma promessa que resolve com a lista de relatórios.
 */
export const getCommissionHistory = (filters = {}) => { 
    const queryParams = new URLSearchParams(filters).toString();
    // CORREÇÃO: O caminho DEVE começar com /api.
    const url = `/api/commissions/history${queryParams ? '?' + queryParams : ''}`;
    return authenticatedFetch(url);
};

/**
 * NOVO: Exclui um relatório de comissão específico.
 * @param {string} reportId - O ID do relatório a ser excluído.
 * @returns {Promise<null>} - Uma promessa que resolve em caso de sucesso (204 No Content).
 */
export const deleteCommissionReport = (reportId) => {
    // CORREÇÃO: O caminho DEVE começar com /api.
    // Esta era a versão original do ficheiro, que estava correta.
    return authenticatedFetch(`/api/commissions/report/${reportId}`, {
        method: 'DELETE',
    });
};