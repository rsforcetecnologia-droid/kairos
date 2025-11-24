// js/api/sales.js

import { authenticatedFetch } from './apiService.js';

/**
 * Cria um novo registo de venda para transações que não vêm de um agendamento (walk-in).
 * @param {object} saleData - Os dados da venda.
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação da criação.
 */
export const createSale = (saleData) => {
    return authenticatedFetch('/api/sales', {
        method: 'POST',
        body: JSON.stringify(saleData),
    });
};

/**
 * CORREÇÃO: Função adicionada para buscar vendas de um único dia.
 * @param {string} establishmentId 
 * @param {string} date - Data no formato YYYY-MM-DD
 */
export const getSales = (establishmentId, date) => {
    // Chama a API passando a data específica
    return authenticatedFetch(`/api/sales/${establishmentId}?date=${date}`);
};

/**
 * Busca o histórico de vendas dentro de um intervalo de datas.
 * @param {string} establishmentId - ID do estabelecimento.
 * @param {string} startDateISO - Data de início no formato ISO.
 * @param {string} endDateISO - Data de fim no formato ISO.
 * @returns {Promise<Array>} - Uma promessa que resolve com a lista de vendas.
 */
export const getSalesByDateRange = (establishmentId, startDateISO, endDateISO) => {
    const endpoint = `/api/sales/${establishmentId}?startDate=${startDateISO}&endDate=${endDateISO}`;
    return authenticatedFetch(endpoint);
};

/**
 * NOVO: Reabre uma venda avulsa que já foi finalizada.
 * @param {string} saleId - O ID da venda.
 * @returns {Promise<object>} - Uma promessa que resolve com os dados da venda reaberta.
 */
export const reopenSale = (saleId) => {
    return authenticatedFetch(`/api/sales/${saleId}/reopen`, {
        method: 'POST',
    });
};

/**
 * NOVO: Exclui uma venda avulsa (walk-in) e reverte o estoque/financeiro.
 * @param {string} saleId - O ID da venda.
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação.
 */
export const deleteSale = (saleId) => {
    return authenticatedFetch(`/api/sales/${saleId}`, {
        method: 'DELETE',
    });
};