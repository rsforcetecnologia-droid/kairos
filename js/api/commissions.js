// js/api/commissions.js

import { authenticatedFetch } from './apiService.js';

/**
 * Calcula a comissão de um profissional com base nos filtros fornecidos.
 * @param {object} commissionData - Os dados para o cálculo.
 * @returns {Promise<object>} - Uma promessa que resolve com o resultado do cálculo da comissão.
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
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação.
 */
export const saveCommissionReport = (reportData) => {
    return authenticatedFetch('/api/commissions/save', {
        method: 'POST',
        body: JSON.stringify(reportData),
    });
};

/**
 * Busca o histórico de relatórios de comissão de um profissional.
 * @param {string} professionalId - O ID do profissional.
 * @returns {Promise<Array>} - Uma promessa que resolve com a lista de relatórios.
 */
export const getCommissionHistory = (professionalId) => {
    return authenticatedFetch(`/api/commissions/history/${professionalId}`);
};