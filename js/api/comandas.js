import { authenticatedFetch } from './apiService.js';

/**
 * Busca a lista completa de comandas (agendamentos) de um estabelecimento.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @returns {Promise<Array>} - Uma promessa que resolve com a lista de comandas.
 */
export const getComandas = (establishmentId) => {
    // CORREÇÃO: Apontando para a nova rota dedicada /api/comandas/
    return authenticatedFetch(`/api/comandas/${establishmentId}`);
};

/**
 * Salva ou atualiza os itens de uma comanda associada a um agendamento.
 * @param {string} appointmentId - O ID do agendamento (que funciona como a comanda).
 * @param {Array<object>} items - A lista de itens a serem salvos na comanda.
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação da atualização.
 */
export const saveComandaItems = (appointmentId, items) => {
    return authenticatedFetch(`/api/appointments/${appointmentId}/comanda`, {
        method: 'POST',
        body: JSON.stringify({ items }),
    });
};