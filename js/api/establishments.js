// js/api/establishments.js

import { authenticatedFetch } from './apiService.js';

/**
 * Este módulo agrupa as funções para interagir com os endpoints
 * de estabelecimentos (`establishments`) da API.
 */

/**
 * Busca os detalhes de um estabelecimento específico.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @returns {Promise<object>} - Uma promessa que resolve com os dados do estabelecimento.
 */
export const getEstablishmentDetails = (establishmentId) => {
    return authenticatedFetch(`/api/establishments/${establishmentId}/details`);
};

/**
 * Atualiza os detalhes de um estabelecimento.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @param {object} establishmentData - Os novos dados a serem salvos.
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação da atualização.
 */
export const updateEstablishmentDetails = (establishmentId, establishmentData) => {
    return authenticatedFetch(`/api/establishments/${establishmentId}/details`, {
        method: 'PUT',
        body: JSON.stringify(establishmentData),
    });
};

/**
 * Limpa todos os agendamentos de um estabelecimento. Ação perigosa.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação da limpeza.
 */
export const clearAllAppointments = (establishmentId) => {
    return authenticatedFetch(`/api/appointments/clear-all/${establishmentId}`, {
        method: 'POST',
    });
};

// NOVO CÓDIGO ADICIONADO AQUI
/**
 * Executa a limpeza de agendamentos inválidos (sem data).
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação da limpeza.
 */
export const cleanupInvalidAppointments = () => {
    return authenticatedFetch(`/api/appointments/cleanup-invalid`, {
        method: 'POST',
    });
};