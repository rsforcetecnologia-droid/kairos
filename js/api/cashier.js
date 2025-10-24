// js/api/cashier.js

import { authenticatedFetch } from './apiService.js';

/**
 * Busca a sessão de caixa ativa para o dia atual.
 * @returns {Promise<object|null>} - A sessão ativa ou null se não houver.
 */
export const getActiveSession = () => {
    return authenticatedFetch(`/api/cashier/status`)
        .catch(error => {
            // Se não houver sessão ativa, retorna null ao invés de erro
            if (error.message.includes('404') || error.message.includes('não encontrada')) {
                return null;
            }
            throw error;
        });
};

/**
 * Abre uma nova sessão de caixa.
 * @param {Object} data - Dados para abertura do caixa
 * @param {string} data.establishmentId - ID do estabelecimento
 * @param {number} data.initialAmount - O valor inicial em caixa
 * @param {string} [data.notes] - Observações opcionais
 * @returns {Promise<object>} - A nova sessão de caixa criada.
 */
export const openCashier = (data) => {
    // CORREÇÃO: Garante que initialAmount seja número e payload esteja completo
    const payload = {
        establishmentId: data.establishmentId,
        initialAmount: Number(data.initialAmount), // Converte para número
        notes: data.notes || ''
    };

    console.log('Payload enviado para abrir caixa:', payload);

    return authenticatedFetch('/api/cashier/open', {
        method: 'POST',
        body: JSON.stringify(payload)
    });
};

/**
 * Fecha a sessão de caixa ativa.
 * @param {string} sessionId - O ID da sessão a ser fechada.
 * @param {number} finalAmount - O valor final contado no caixa.
 * @returns {Promise<object>} - O relatório de fechamento.
 */
export const closeCashier = (sessionId, finalAmount) => {
    // CORREÇÃO: Garante que finalAmount seja número
    const payload = {
        finalAmount: Number(finalAmount)
    };

    console.log('Payload enviado para fechar caixa:', payload);

    return authenticatedFetch(`/api/cashier/close/${sessionId}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
    });
};

/**
 * Busca o histórico de sessões de caixa fechadas.
 * @returns {Promise<Array>} - Uma lista de sessões de caixa.
 */
export const getCashierHistory = () => {
    return authenticatedFetch(`/api/cashier/history`)
        .then(response => response || [])
        .catch(error => {
            console.error('Erro ao buscar histórico:', error);
            return [];
        });
};

/**
 * Busca os dados para o relatório de fecho de caixa, antes de o fechar.
 * @param {string} sessionId - O ID da sessão de caixa atual.
 * @returns {Promise<object>} - Os dados calculados para o relatório.
 */
export const getCloseCashierReport = (sessionId) => {
    return authenticatedFetch(`/api/cashier/report/${sessionId}`);
};
