// js/api/clients.js

import { authenticatedFetch } from './apiService.js';

// --- AJUDANTE: Limpa o telefone APENAS para criação de novos registros ---
const sanitizeId = (phone) => {
    if (!phone) return '';
    return String(phone).replace(/\D/g, '');
};

/**
 * Busca clientes de um estabelecimento.
 */
export const getClients = (establishmentId, searchTerm = '', limit = null) => {
    let endpoint = `/api/clients/${establishmentId}`;
    
    const params = [];
    
    if (searchTerm && searchTerm.trim().length > 0) {
        params.push(`search=${encodeURIComponent(searchTerm.trim())}`);
    }
    
    if (limit) {
        params.push(`limit=${limit}`);
    }

    if (params.length > 0) {
        endpoint += `?${params.join('&')}`;
    }
    
    return authenticatedFetch(endpoint);
};

/**
 * Busca um único cliente pelo ID.
 * CORREÇÃO: Não sanitiza mais o ID, pois pode ser legado (alfanumérico).
 */
export const getClient = (clientId) => {
    if (!clientId) throw new Error("ID do cliente é obrigatório");
    // encodeURIComponent garante que caracteres especiais no ID não quebrem a URL
    return authenticatedFetch(`/api/clients/id/${encodeURIComponent(clientId)}`);
};

/**
 * Cria ou Atualiza um cliente.
 * AQUI mantemos o sanitizeId, pois queremos forçar que NOVOS clientes usem apenas números no ID.
 */
export const createClient = (clientData) => {
    if (!clientData.phone) {
        throw new Error("O telefone é obrigatório para criar o cliente.");
    }

    const id = sanitizeId(clientData.phone); // ID padronizado para novos (ex: 5511999999999)

    return authenticatedFetch(`/api/clients/${id}`, {
        method: 'PUT', // Upsert
        body: JSON.stringify(clientData),
    });
};

/**
 * Atualiza um cliente existente.
 * CORREÇÃO: Usa o ID original sem limpar.
 */
export const updateClient = (clientId, clientData) => {
    return authenticatedFetch(`/api/clients/${encodeURIComponent(clientId)}`, {
        method: 'PUT',
        body: JSON.stringify(clientData),
    });
};

/**
 * Apaga um cliente.
 * CORREÇÃO CRÍTICA: Removemos o sanitizeId. O ID deve ser passado exatamente como está no banco.
 */
export const deleteClient = (clientId) => {
    return authenticatedFetch(`/api/clients/${encodeURIComponent(clientId)}`, {
        method: 'DELETE',
    });
};

/**
 * Busca histórico.
 */
export const getClientHistory = (establishmentId, clientName, clientPhone) => {
    const safeName = encodeURIComponent(clientName);
    const safePhone = encodeURIComponent(clientPhone);
    const endpoint = `/api/clients/history/${establishmentId}?clientName=${safeName}&clientPhone=${safePhone}`;
    
    return authenticatedFetch(endpoint);
};

/**
 * Busca histórico de fidelidade.
 */
export const getClientLoyaltyHistory = (establishmentId, clientName, clientPhone) => {
    const safeName = encodeURIComponent(clientName);
    const safePhone = encodeURIComponent(clientPhone);
    const endpoint = `/api/clients/loyalty-history/${establishmentId}?clientName=${safeName}&clientPhone=${safePhone}`;
    
    return authenticatedFetch(endpoint);
};

/**
 * Resgata prémio.
 */
export const redeemReward = (establishmentId, clientName, clientPhone, rewardData) => {
    return authenticatedFetch(`/api/clients/redeem`, {
        method: 'POST',
        body: JSON.stringify({ 
            establishmentId, 
            clientName, 
            clientPhone, 
            rewardData 
        }),
    });
};

/**
 * Helper para verificar duplicidade (mantém sanitize aqui para comparar números puros)
 */
export const getClientByPhone = (establishmentId, phone) => {
    const id = sanitizeId(phone);
    return authenticatedFetch(`/api/clients/id/${id}`).catch(() => null); 
};