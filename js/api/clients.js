// js/api/clients.js

import { authenticatedFetch } from './apiService.js';

/**
 * Busca a lista completa de clientes de um estabelecimento, incluindo dados de fidelidade.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @returns {Promise<Array>} - Uma promessa que resolve com a lista de clientes.
 */
export const getClients = (establishmentId) => {
    return authenticatedFetch(`/api/clients/${establishmentId}`);
};

/**
 * Busca os detalhes de fidelidade de um cliente específico.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @param {string} clientName - O nome do cliente.
 * @param {string} clientPhone - O telemóvel do cliente.
 * @returns {Promise<object>} - Uma promessa que resolve com os dados de fidelidade do cliente.
 */
export const getClientDetails = (establishmentId, clientName, clientPhone) => {
    const endpoint = `/api/client-details/${establishmentId}?clientName=${encodeURIComponent(clientName)}&clientPhone=${encodeURIComponent(clientPhone)}`;
    return authenticatedFetch(endpoint);
};

/**
 * Busca o histórico de agendamentos de um cliente específico.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @param {string} clientName - O nome do cliente.
 * @param {string} clientPhone - O telemóvel do cliente.
 * @returns {Promise<Array>} - Uma promessa que resolve com o histórico de visitas do cliente.
 */
export const getClientHistory = (establishmentId, clientName, clientPhone) => {
    const endpoint = `/api/clients/history/${establishmentId}?clientName=${encodeURIComponent(clientName)}&clientPhone=${encodeURIComponent(clientPhone)}`;
    return authenticatedFetch(endpoint);
};

/**
 * Busca o histórico de fidelidade (pontos ganhos/resgatados) de um cliente.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @param {string} clientName - O nome do cliente.
 * @param {string} clientPhone - O telemóvel do cliente.
 * @returns {Promise<Array>} - Uma promessa que resolve com o histórico de fidelidade.
 */
export const getClientLoyaltyHistory = (establishmentId, clientName, clientPhone) => {
    const endpoint = `/api/clients/loyalty-history/${establishmentId}?clientName=${encodeURIComponent(clientName)}&clientPhone=${encodeURIComponent(clientPhone)}`;
    return authenticatedFetch(endpoint);
};

/**
 * Resgata um prémio para um cliente.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @param {string} clientName - O nome do cliente.
 * @param {string} clientPhone - O telemóvel do cliente.
 * @param {object} rewardData - Dados do prémio { points, reward }.
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação.
 */
export const redeemReward = (establishmentId, clientName, clientPhone, rewardData) => {
    return authenticatedFetch(`/api/clients/redeem`, {
        method: 'POST',
        body: JSON.stringify({ establishmentId, clientName, clientPhone, rewardData }),
    });
};

/**
 * Cria um novo cliente.
 * @param {object} clientData - Os dados do cliente a ser criado.
 * @returns {Promise<object>} - Uma promessa que resolve com o cliente criado.
 */
export const createClient = (clientData) => {
    return authenticatedFetch('/api/clients', {
        method: 'POST',
        body: JSON.stringify(clientData),
    });
};

