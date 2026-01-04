// js/api/clients.js

import { authenticatedFetch } from './apiService.js';

// --- UTILS ---
const cleanPhone = (phone) => {
    if (!phone) return '';
    return String(phone).replace(/\D/g, ''); // Remove tudo que não for número
};

/**
 * Busca lista de clientes
 */
export const getClients = (establishmentId, search = '', limit = 20) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (limit) params.append('limit', limit);

    return authenticatedFetch(`/api/clients/${establishmentId}?${params.toString()}`);
};

/**
 * Cria ou Atualiza cliente
 */
export const saveClient = (clientData) => {
    if (!clientData.phone) throw new Error('Telefone é obrigatório');
    
    const id = cleanPhone(clientData.phone);
    const payload = { ...clientData, phone: id, id: id }; // Garante consistência

    return authenticatedFetch(`/api/clients/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
    });
};

/**
 * Busca histórico completo (Agendamentos, Vendas, Fidelidade)
 */
export const getFullHistory = (establishmentId, clientPhone) => {
    const id = cleanPhone(clientPhone);
    return authenticatedFetch(`/api/clients/full-history/${establishmentId}?phone=${id}`);
};

/**
 * Deleta cliente
 */
export const deleteClient = (clientPhone) => {
    const id = cleanPhone(clientPhone);
    return authenticatedFetch(`/api/clients/${id}`, {
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