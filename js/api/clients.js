// js/api/clients.js

import { authenticatedFetch } from './apiService.js';

// --- UTILS ---
const cleanPhone = (phone) => {
    if (!phone) return '';
    return String(phone).replace(/\D/g, ''); // Remove tudo que não for número
};

/**
 * Busca lista de clientes com suporte a filtros
 */
export const getClients = (establishmentId, search = '', limit = 20, filters = {}) => {
    const params = new URLSearchParams();

    // Parâmetros básicos
    if (search) params.append('search', search);
    if (limit) params.append('limit', limit);

    // Novos Filtros
    if (filters && filters.hasLoyalty) params.append('hasLoyalty', 'true');
    if (filters && filters.birthMonth) params.append('birthMonth', filters.birthMonth);
    if (filters && filters.inactiveDays) params.append('inactiveDays', filters.inactiveDays);

    return authenticatedFetch(`/api/clients/${establishmentId}?${params.toString()}`);
};

/**
 * Busca detalhes de um único cliente pelo ID
 */
export const getClient = (establishmentId, clientId) => {
    const safeId = encodeURIComponent(clientId);
    return authenticatedFetch(`/api/clients/details/${establishmentId}/${safeId}`);
};

/**
 * Cria ou Atualiza cliente (Função Base)
 */
export const saveClient = (clientData) => {
    const phoneField = clientData.phone || clientData.id;
    if (!phoneField) throw new Error('Telefone é obrigatório');
    
    const id = cleanPhone(phoneField);
    const payload = { ...clientData, phone: id, id: id }; 

    return authenticatedFetch(`/api/clients/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
    });
};

/**
 * ALIASES PARA COMPATIBILIDADE COM O BUILD (Resolução do Erro)
 * Agenda.js e Clients.js (UI) chamam esses nomes especificamente
 */
export const createClient = saveClient;
export const updateClient = (clientId, clientData) => saveClient({ ...clientData, id: clientId });

/**
 * Busca histórico completo
 */
export const getFullHistory = (establishmentId, clientPhone) => {
    const id = cleanPhone(clientPhone);
    return authenticatedFetch(`/api/clients/full-history/${establishmentId}?phone=${id}`);
};

/**
 * Deleta cliente
 */
export const deleteClient = (clientId) => {
    const safeId = encodeURIComponent(clientId);
    return authenticatedFetch(`/api/clients/${safeId}`, {
        method: 'DELETE'
    });
};

/**
 * Resgatar Prêmios
 */
export const redeemReward = (establishmentId, clientPhone, points, rewardName) => {
    return authenticatedFetch('/api/clients/redeem', {
        method: 'POST',
        body: JSON.stringify({
            establishmentId,
            clientPhone: cleanPhone(clientPhone),
            points,
            rewardName
        })
    });
};

/**
 * Busca cliente por telefone (Usado no fluxo de Nova Venda)
 */
export const getClientByPhone = (establishmentId, phone) => {
    return getClient(establishmentId, cleanPhone(phone));
};