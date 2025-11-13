// js/api/schedules.js

import { authenticatedFetch } from './apiService.js';
// --- INÍCIO DA CORREÇÃO ---
// Importa o 'state' global para termos acesso ao ID do estabelecimento
import { state } from '../state.js';
// --- FIM DA CORREÇÃO ---

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
 * Esta função chama a rota GET /api/blockages/:establishmentId?professionalId=...
 * @param {string} professionalId - O ID do profissional.
 * @returns {Promise<Array<object>>} Uma lista de objetos de bloqueio.
 */
export const getProfessionalBlocks = (professionalId) => {
    // --- INÍCIO DA CORREÇÃO ---
    const establishmentId = state.establishmentId; // Pega o ID do estado global
    if (!establishmentId) {
        return Promise.reject(new Error("ID do Estabelecimento não encontrado no estado global."));
    }
    
    // A rota correta (definida em routes/blockages.js) é /:establishmentId com um query param
    const endpoint = `/api/blockages/${establishmentId}?professionalId=${professionalId}`;
    // --- FIM DA CORREÇÃO ---
    
    return authenticatedFetch(endpoint);
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