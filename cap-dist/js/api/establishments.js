// js/api/establishments.js

import { authenticatedFetch } from './apiService.js';
import { state } from '../state.js';

/**
 * Busca os detalhes completos de um estabelecimento.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @returns {Promise<object>} Os dados do estabelecimento.
 */
export const getEstablishmentDetails = (establishmentId) => {
    // Se o ID não for fornecido, usa o do estado (cache)
    const id = establishmentId || state.establishmentId;
    if (!id) {
        return Promise.reject(new Error("ID do estabelecimento não fornecido."));
    }
    return authenticatedFetch(`/api/establishments/${id}`);
};

/**
 * Atualiza os detalhes de um estabelecimento.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @param {object} data - Os dados a serem atualizados.
 * @returns {Promise<object>} A resposta da API.
 */
export const updateEstablishmentDetails = (establishmentId, data) => {
    const id = establishmentId || state.establishmentId;
    if (!id) {
        return Promise.reject(new Error("ID do estabelecimento não fornecido."));
    }
    return authenticatedFetch(`/api/establishments/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};


// ####################################################################
// ### INÍCIO DA NOVA FUNÇÃO ###
// ####################################################################

/**
 * (NOVO) Atualiza o status do agendamento público (ativo/inativo).
 * @param {string} establishmentId - O ID do estabelecimento.
 * @param {boolean} isEnabled - O novo estado (true para ativo, false para inativo).
 * @returns {Promise<object>} A resposta da API.
 */
export const updatePublicBookingStatus = (establishmentId, isEnabled) => {
    const id = establishmentId || state.establishmentId;
    if (!id) {
        return Promise.reject(new Error("ID do estabelecimento não fornecido."));
    }
    
    // Esta rota 'PATCH' é mais eficiente pois atualiza apenas um campo.
    return authenticatedFetch(`/api/establishments/${id}/booking-status`, {
        method: 'PATCH',
        body: JSON.stringify({ publicBookingEnabled: isEnabled }),
    });
};

// ####################################################################
// ### FIM DA NOVA FUNÇÃO ###
// ####################################################################


/**
 * (NOVO) Atualiza o e-mail de login do proprietário no banco de dados.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @param {string} newEmail - O novo e-mail.
 * @returns {Promise<object>} A resposta da API.
 */
export const updateOwnerEmail = (establishmentId, newEmail) => {
    const id = establishmentId || state.establishmentId;
    if (!id) {
        return Promise.reject(new Error("ID do estabelecimento não fornecido."));
    }
    
    return authenticatedFetch(`/api/establishments/${id}/owner-email`, {
        method: 'PATCH',
        body: JSON.stringify({ newEmail: newEmail }),
    });
};