// js/api/schedules.js

import { authenticatedFetch } from './apiService.js';

/**
 * Bloqueia a agenda de um profissional para um determinado período.
 * Esta função chama a rota POST /api/blockages
 * @param {object} blockData - Dados do bloqueio (professionalId, startTime, endTime, reason).
 * @returns {Promise<object>} A resposta da API.
 */
export const blockProfessionalSchedule = (blockData) => {
    // O backend em routes/blockages.js espera o professionalId dentro do body
    return authenticatedFetch(`/api/blockages`, {
        method: 'POST',
        body: JSON.stringify(blockData),
    });
};

/**
 * Obtém todos os bloqueios futuros de um profissional específico.
 * Esta função chama a rota GET /api/blockages?professionalId=...
 * @param {string} professionalId - O ID do profissional.
 * @returns {Promise<Array<object>>} Uma lista de objetos de bloqueio.
 */
export const getProfessionalBlocks = (professionalId) => {
    // O backend em routes/blockages.js já suporta filtrar por professionalId via query param
    return authenticatedFetch(`/api/blockages?professionalId=${professionalId}`);
};

/**
 * Remove um bloqueio específico da agenda.
 * Esta função chama a rota DELETE /api/blockages/:blockId
 * @param {string} blockId - O ID do bloqueio a ser removido.
 * @returns {Promise<object>} A resposta da API.
 */
export const removeProfessionalBlock = (blockId) => {
    // O backend em routes/blockages.js deleta pela rota /:blockageId
    return authenticatedFetch(`/api/blockages/${blockId}`, {
        method: 'DELETE',
    });
};