// js/api/professionals.js

import { authenticatedFetch } from './apiService.js';

/**
 * Busca todos os profissionais de um estabelecimento.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @returns {Promise<Array>} - Uma promessa que resolve com a lista de profissionais.
 */
export const getProfessionals = (establishmentId) => {
    return authenticatedFetch(`/api/professionals/${establishmentId}`);
};

/**
 * Busca os detalhes de um único profissional (usado pela tela Meu Perfil).
 * @param {string} professionalId - O ID do profissional.
 * @returns {Promise<object>} Os dados do profissional.
 */
export const getProfessional = (professionalId) => {
    return authenticatedFetch(`/api/professionals/details/${professionalId}`); 
};

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

// --- FIX: Função adicionada para o Onboarding ---
export const updateProfessionalServices = (professionalId, serviceIds) => {
    // Reutiliza a função de update padrão, passando apenas os serviços
    return updateProfessional(professionalId, { services: serviceIds });
};

/**
 * Apaga um profissional.
 * @param {string} professionalId - O ID do profissional a ser apagado.
 * @returns {Promise<object>} - Confirmação da exclusão.
 */
export const deleteProfessional = (professionalId) => {
    return authenticatedFetch(`/api/professionals/${professionalId}`, {
        method: 'DELETE',
    });
};

// --- FIX: Função adicionada para a UI de Profissionais (Lote) ---
export const batchDeleteProfessionals = (professionalIds) => {
    // Implementação segura: deleta um por um usando Promise.all
    // Isso garante funcionamento mesmo sem uma rota específica de "batch" no backend
    const deletePromises = professionalIds.map(id => deleteProfessional(id));
    return Promise.all(deletePromises);
};