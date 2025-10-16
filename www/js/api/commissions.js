// js/api/commissions.js

import { authenticatedFetch } from './apiService.js';

/**
 * Calcula a comissão com base nos filtros fornecidos.
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
 * CORRIGIDO: Busca o histórico de TODOS os relatórios de comissão salvos para o estabelecimento.
 * @returns {Promise<Array>} - Uma promessa que resolve com a lista de relatórios.
 */
export const getCommissionHistory = () => {
    // A rota correta não precisa de um ID de profissional.
    return authenticatedFetch(`/api/commissions/history`);
};
