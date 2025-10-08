// js/api/blockages.js

import { authenticatedFetch } from './apiService.js';

/**
 * Este módulo contém todas as funções para interagir com os endpoints
 * de bloqueios de horário (`blockages`) da API.
 */

/**
 * Busca todos os bloqueios de um profissional específico.
 * @param {string} professionalId - O ID do profissional.
 * @returns {Promise<Array>} - Uma promessa que resolve com a lista de bloqueios.
 */
export const getBlockagesByProfessional = (professionalId) => {
    return authenticatedFetch(`/api/blockages/professional/${professionalId}`);
};

/**
 * Busca bloqueios dentro de um intervalo de datas para um ou todos os profissionais.
 * @param {string} establishmentId - ID do estabelecimento.
 * @param {string} startDateISO - Data de início no formato ISO.
 * @param {string} endDateISO - Data de fim no formato ISO.
 * @param {string} [professionalId='all'] - ID do profissional ou 'all' para todos.
 * @returns {Promise<Array>} - Uma promessa que resolve com a lista de bloqueios.
 */
export const getBlockagesByDateRange = (establishmentId, startDateISO, endDateISO, professionalId = 'all') => {
    const endpoint = `/api/blockages/${establishmentId}?startDate=${startDateISO}&endDate=${endDateISO}&professionalId=${professionalId}`;
    return authenticatedFetch(endpoint);
};

/**
 * Cria um novo bloqueio de horário.
 * @param {object} blockageData - Os dados do bloqueio a ser criado.
 * @returns {Promise<object>} - Uma promessa que resolve com o bloqueio criado.
 */
export const createBlockage = (blockageData) => {
    return authenticatedFetch('/api/blockages', {
        method: 'POST',
        body: JSON.stringify(blockageData),
    });
};

/**
 * Apaga um bloqueio de horário.
 * @param {string} blockageId - O ID do bloqueio a ser apagado.
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação da exclusão.
 */
export const deleteBlockage = (blockageId) => {
    return authenticatedFetch(`/api/blockages/${blockageId}`, {
        method: 'DELETE',
    });
};

/**
 * Apaga múltiplos bloqueios de uma só vez.
 * @param {string[]} ids - Um array com os IDs dos bloqueios a serem apagados.
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação da exclusão.
 */
export const batchDeleteBlockages = (ids) => {
    return authenticatedFetch('/api/blockages/batch-delete', {
        method: 'POST',
        body: JSON.stringify({ ids }),
    });
};