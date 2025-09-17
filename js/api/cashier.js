// js/api/cashier.js

// CORREÇÃO: O caminho para apiService.js foi corrigido
import { authenticatedFetch } from './apiService.js';

/**
 * Busca a sessão de caixa ativa para o dia atual.
 * @returns {Promise<object|null>} - A sessão ativa ou null se não houver.
 */
export const getActiveSession = () => {
    return authenticatedFetch(`/api/cashier/status`);
};

/**
 * Abre uma nova sessão de caixa.
 * @param {number} initialAmount - O valor inicial em caixa.
 * @returns {Promise<object>} - A nova sessão de caixa criada.
 */
export const openCashier = (initialAmount) => {
    return authenticatedFetch('/api/cashier/open', {
        method: 'POST',
        body: JSON.stringify({ initialAmount })
    });
};

/**
 * Fecha a sessão de caixa ativa.
 * @param {string} sessionId - O ID da sessão a ser fechada.
 * @param {number} finalAmount - O valor final contado no caixa.
 * @returns {Promise<object>} - O relatório de fechamento.
 */
export const closeCashier = (sessionId, finalAmount) => {
    return authenticatedFetch(`/api/cashier/close/${sessionId}`, {
        method: 'PUT',
        body: JSON.stringify({ finalAmount })
    });
};

/**
 * Busca o histórico de sessões de caixa fechadas.
 * @returns {Promise<Array>} - Uma lista de sessões de caixa.
 */
export const getCashierHistory = () => {
    return authenticatedFetch(`/api/cashier/history`);
};


/**
 * NOVO: Busca os dados para o relatório de fecho de caixa, antes de o fechar.
 * @param {string} sessionId - O ID da sessão de caixa atual.
 * @returns {Promise<object>} - Os dados calculados para o relatório.
 */
export const getCloseCashierReport = (sessionId) => {
    return authenticatedFetch(`/api/cashier/report/${sessionId}`);
};

