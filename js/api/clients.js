// js/api/clients.js

import { authenticatedFetch } from './apiService.js';

/**
 * Busca clientes de um estabelecimento.
 * Agora suporta um termo de pesquisa para evitar carregar a lista toda.
 * * @param {string} establishmentId - O ID do estabelecimento.
 * @param {string} [searchTerm=''] - (Opcional) Nome para pesquisar. Se vazio, retorna os últimos cadastrados.
 * @returns {Promise<Array>} - Uma promessa que resolve com a lista de clientes.
 */
export const getClients = (establishmentId, searchTerm = '') => {
    // CORREÇÃO DE CUSTO: Constrói a URL com filtro se houver pesquisa
    let endpoint = `/api/clients/${establishmentId}`;
    
    if (searchTerm && searchTerm.trim().length > 0) {
        endpoint += `?search=${encodeURIComponent(searchTerm.trim())}`;
    }
    
    return authenticatedFetch(endpoint);
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

/**
 * Atualiza um cliente existente.
 * @param {string} clientId - O ID do cliente.
 * @param {object} clientData - Os novos dados do cliente.
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação.
 */
export const updateClient = (clientId, clientData) => {
    return authenticatedFetch(`/api/clients/${clientId}`, {
        method: 'PUT',
        body: JSON.stringify(clientData),
    });
};

/**
 * Apaga um cliente.
 * @param {string} clientId - O ID do cliente a ser apagado.
 * @returns {Promise<object>} - Uma promessa que resolve com la confirmação.
 */
export const deleteClient = (clientId) => {
    return authenticatedFetch(`/api/clients/${clientId}`, {
        method: 'DELETE',
    });
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