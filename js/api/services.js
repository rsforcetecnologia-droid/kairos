// js/api/services.js

import { authenticatedFetch } from './apiService.js';

/**
 * Este módulo agrupa todas as funções para interagir com os endpoints
 * de serviços (`services`) da API.
 */

/**
 * Busca todos os serviços de um estabelecimento.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @returns {Promise<Array>} - Uma promessa que resolve com a lista de serviços.
 */
export const getServices = (establishmentId) => {
    return authenticatedFetch(`/api/services/${establishmentId}`);
};

/**
 * Cria um novo serviço.
 * @param {object} serviceData - Os dados do serviço a ser criado.
 * @returns {Promise<object>} - Uma promessa que resolve com o serviço criado.
 */
export const createService = (serviceData) => {
    return authenticatedFetch('/api/services', {
        method: 'POST',
        body: JSON.stringify(serviceData),
    });
};

/**
 * Atualiza um serviço existente.
 * @param {string} serviceId - O ID do serviço.
 * @param {object} serviceData - Os novos dados do serviço.
 * @returns {Promise<object>} - Uma promessa que resolve com o serviço atualizado.
 */
export const updateService = (serviceId, serviceData) => {
    return authenticatedFetch(`/api/services/${serviceId}`, {
        method: 'PUT',
        body: JSON.stringify(serviceData),
    });
};

/**
 * Atualiza o status (ativo/inativo) de um serviço.
 * @param {string} serviceId - O ID do serviço.
 * @param {boolean} newStatus - O novo status (true para ativo, false para inativo).
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação da atualização.
 */
export const updateServiceStatus = (serviceId, newStatus) => {
    return authenticatedFetch(`/api/services/${serviceId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ active: newStatus }),
    });
};

/**
 * Apaga um serviço.
 * @param {string} serviceId - O ID do serviço a ser apagado.
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação da exclusão.
 */
export const deleteService = (serviceId) => {
    return authenticatedFetch(`/api/services/${serviceId}`, {
        method: 'DELETE',
    });
};
