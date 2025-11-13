// js/api/professionals.js

import { authenticatedFetch } from './apiService.js';

/**
 * Este módulo agrupa todas as funções para interagir com os endpoints
 * de profissionais (`professionals`) da API.
 */

/**
 * Busca todos os profissionais de um estabelecimento.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @returns {Promise<Array>} - Uma promessa que resolve com a lista de profissionais.
 */
export const getProfessionals = (establishmentId) => {
    return authenticatedFetch(`/api/professionals/${establishmentId}`);
};

// --- INÍCIO DA FUNÇÃO ADICIONADA ---
/**
 * Busca os detalhes de um único profissional (usado pela tela Meu Perfil).
 * @param {string} professionalId - O ID do profissional.
 * @returns {Promise<object>} Os dados do profissional.
 */
export const getProfessional = (professionalId) => {
    // Esta rota será adicionada ao routes/professionals.js
    return authenticatedFetch(`/api/professionals/details/${professionalId}`); 
};
// --- FIM DA FUNÇÃO ADICIONADA ---

/**
 * Cria um novo profissional.
 * @param {object} professionalData - Os dados do profissional a ser criado.
 * @returns {Promise<object>} - Uma promessa que resolve com o profissional criado.
 */
export const createProfessional = (professionalData) => {
    return authenticatedFetch('/api/professionals', {
        method: 'POST',
        body: JSON.stringify(professionalData),
    });
};

/**
 * Atualiza um profissional existente.
 * @param {string} professionalId - O ID do profissional.
 * @param {object} professionalData - Os novos dados do profissional.
 * @returns {Promise<object>} - Uma promessa que resolve com o profissional atualizado.
 */
export const updateProfessional = (professionalId, professionalData) => {
    return authenticatedFetch(`/api/professionals/${professionalId}`, {
        method: 'PUT',
        body: JSON.stringify(professionalData),
    });
};

/**
 * Apaga um profissional (ou marca como inativo, dependendo da regra de negócio).
 * @param {string} professionalId - O ID do profissional a ser apagado.
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação da exclusão.
 */
export const deleteProfessional = (professionalId) => {
    return authenticatedFetch(`/api/professionals/${professionalId}`, {
        method: 'DELETE',
    });
};