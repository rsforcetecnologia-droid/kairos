// js/api/clients.js

import { authenticatedFetch } from './apiService.js';

// --- AJUDANTE: Limpa o telefone para usar como ID (apenas números) ---
const sanitizeId = (phone) => {
    if (!phone) return '';
    return String(phone).replace(/\D/g, '');
};

/**
 * Busca clientes de um estabelecimento com otimização de leitura.
 * Suporta pesquisa por nome e limite de resultados.
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
 * Busca um único cliente pelo ID (que agora é o Telefone).
 * @param {string} clientId - O ID do cliente (Telefone).
 */
export const getClient = (clientId) => {
    if (!clientId) throw new Error("ID do cliente é obrigatório");
    const id = sanitizeId(clientId);
    // Mantém a rota original, mas garante que o ID é o telefone limpo
    return authenticatedFetch(`/api/clients/id/${id}`);
};

/**
 * [MODIFICADO] Cria ou Atualiza um cliente usando o Telefone como ID.
 * Usa PUT em vez de POST para forçar o ID específico.
 * @param {object} clientData - Os dados do cliente (deve conter 'phone').
 */
export const createClient = (clientData) => {
    if (!clientData.phone) {
        throw new Error("O telefone é obrigatório para criar o cliente.");
    }

    const id = sanitizeId(clientData.phone); // O ID será o telefone (ex: 5511999999999)

    // Mudamos para PUT na rota específica do ID. 
    // Isso funciona como um "Upsert" (Criar ou Atualizar com este ID).
    return authenticatedFetch(`/api/clients/${id}`, {
        method: 'PUT',
        body: JSON.stringify(clientData),
    });
};

/**
 * Atualiza um cliente existente.
 * @param {string} clientId - O ID do cliente (Telefone).
 */
export const updateClient = (clientId, clientData) => {
    const id = sanitizeId(clientId);
    return authenticatedFetch(`/api/clients/${id}`, {
        method: 'PUT',
        body: JSON.stringify(clientData),
    });
};

/**
 * Apaga um cliente.
 * @param {string} clientId - O ID do cliente (Telefone).
 */
export const deleteClient = (clientId) => {
    const id = sanitizeId(clientId);
    return authenticatedFetch(`/api/clients/${id}`, {
        method: 'DELETE',
    });
};

/**
 * Busca histórico.
 * Nota: Como o ID agora é o telefone, clientPhone e ID são redundantes, 
 * mas mantemos a assinatura para compatibilidade com o backend.
 */
export const getClientHistory = (establishmentId, clientName, clientPhone) => {
    const safeName = encodeURIComponent(clientName);
    const safePhone = encodeURIComponent(clientPhone); // Pode mandar formatado ou limpo, backend decide
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
 * [NOVO - HELPER] Busca cliente pelo telefone (atalho para getClient).
 * Útil para a verificação de duplicidade na UI.
 */
export const getClientByPhone = (establishmentId, phone) => {
    const id = sanitizeId(phone);
    // Retorna null se der 404 (tratado no apiService ou aqui se necessário)
    return getClient(id).catch(() => null); 
};