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
    if (filters.hasLoyalty) params.append('hasLoyalty', 'true');
    if (filters.birthMonth) params.append('birthMonth', filters.birthMonth);
    if (filters.inactiveDays) params.append('inactiveDays', filters.inactiveDays);

    return authenticatedFetch(`/api/clients/${establishmentId}?${params.toString()}`);
};

/**
 * Busca detalhes de um único cliente pelo ID
 * (Esta função é essencial para abrir o modal sem erros)
 */
export const getClient = (establishmentId, clientId) => {
    // encodeURIComponent garante que IDs com caracteres especiais não quebrem a URL
    const safeId = encodeURIComponent(clientId);
    return authenticatedFetch(`/api/clients/details/${establishmentId}/${safeId}`);
};

/**
 * Cria ou Atualiza cliente
 */
export const saveClient = (clientData) => {
    if (!clientData.phone) throw new Error('Telefone é obrigatório');
    
    // Na criação/edição, mantemos o padrão de usar o telefone limpo como ID
    const id = cleanPhone(clientData.phone);
    const payload = { ...clientData, phone: id, id: id }; 

    return authenticatedFetch(`/api/clients/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
    });
};

/**
 * Busca histórico completo
 */
export const getFullHistory = (establishmentId, clientPhone) => {
    const id = cleanPhone(clientPhone);
    return authenticatedFetch(`/api/clients/full-history/${establishmentId}?phone=${id}`);
};

/**
 * Deleta cliente
 * CORREÇÃO: Aceita o ID direto sem limpar, para garantir que deleta o documento exato
 */
export const deleteClient = (clientId) => {
    // encodeURIComponent é uma boa prática para garantir que o ID chegue correto ao backend
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