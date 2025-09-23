import { authenticatedFetch } from './apiService.js';

/**
 * Este módulo agrupa as funções para interagir com os endpoints
 * do módulo Financeiro da API.
 */

// --- Contas a Pagar ---
/**
 * Cria uma nova conta a pagar.
 * @param {object} payableData - Os dados da conta a pagar ({ description, amount, dueDate }).
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação.
 */
export const createPayable = (payableData) => {
    return authenticatedFetch('/api/financial/payables', {
        method: 'POST',
        body: JSON.stringify(payableData),
    });
};

/**
 * Busca todas as contas a pagar de um estabelecimento.
 * @returns {Promise<Array>} - Uma promessa que resolve com a lista de contas a pagar.
 */
export const getPayables = () => {
    return authenticatedFetch('/api/financial/payables');
};

// --- Contas a Receber ---
/**
 * Cria uma nova conta a receber.
 * @param {object} receivableData - Os dados da conta a receber ({ description, amount, dueDate }).
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação.
 */
export const createReceivable = (receivableData) => {
    return authenticatedFetch('/api/financial/receivables', {
        method: 'POST',
        body: JSON.stringify(receivableData),
    });
};

/**
 * Busca todas as contas a receber de um estabelecimento.
 * @returns {Promise<Array>} - Uma promessa que resolve com a lista de contas a receber.
 */
export const getReceivables = () => {
    return authenticatedFetch('/api/financial/receivables');
};