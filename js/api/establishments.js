// js/api/establishments.js

import { authenticatedFetch } from './apiService.js';
import { state } from '../state.js';

// ============================================================================
// 🏢 GESTÃO DA ARQUITETURA MULTI-TENANT (GRUPOS, EMPRESAS E FILIAIS)
// ============================================================================

/**
 * Cria um novo Grupo Económico (Nível 1)
 * @param {string} name - Nome do Grupo
 */
export const createEconomicGroup = (name) => {
    return authenticatedFetch(`/api/establishments/groups`, {
        method: 'POST',
        body: JSON.stringify({ name }),
    });
};

/**
 * Cria uma nova Empresa / Matriz (Nível 2)
 * @param {string} name - Nome da Empresa
 * @param {string} cnpj - CNPJ da Empresa
 * @param {string} groupId - ID do Grupo Económico ao qual pertence
 */
export const createCompany = (name, cnpj, groupId) => {
    return authenticatedFetch(`/api/establishments/companies`, {
        method: 'POST',
        body: JSON.stringify({ name, cnpj, groupId }),
    });
};

/**
 * Cria uma nova Filial (Nível 3)
 * @param {object} data - Dados da filial (name, companyId, groupId, phone, address, timezone)
 */
export const createBranch = (data) => {
    return authenticatedFetch(`/api/establishments/`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

/**
 * Busca a estrutura de hierarquia completa (Grupos > Empresas > Filiais)
 * O backend já decide se traz a árvore toda (group_admin) ou só o que o utilizador tem acesso.
 */
export const getHierarchy = () => {
    return authenticatedFetch(`/api/establishments/hierarchy`, {
        method: 'GET'
    });
};


// ============================================================================
// 📍 FUNÇÕES ESPECÍFICAS DA FILIAL (LEGADO MANTIDO)
// ============================================================================

/**
 * Busca os detalhes completos de um estabelecimento.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @returns {Promise<object>} Os dados do estabelecimento.
 */
export const getEstablishmentDetails = (establishmentId) => {
    // Se o ID não for fornecido, usa o do estado (cache)
    const id = establishmentId || state.establishmentId;
    if (!id) {
        return Promise.reject(new Error("ID do estabelecimento não fornecido."));
    }
    return authenticatedFetch(`/api/establishments/${id}`);
};

/**
 * Atualiza os detalhes de um estabelecimento.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @param {object} data - Os dados a serem atualizados.
 * @returns {Promise<object>} A resposta da API.
 */
export const updateEstablishmentDetails = (establishmentId, data) => {
    const id = establishmentId || state.establishmentId;
    if (!id) {
        return Promise.reject(new Error("ID do estabelecimento não fornecido."));
    }
    return authenticatedFetch(`/api/establishments/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};

/**
 * Atualiza o status do agendamento público (ativo/inativo).
 * @param {string} establishmentId - O ID do estabelecimento.
 * @param {boolean} isEnabled - O novo estado (true para ativo, false para inativo).
 * @returns {Promise<object>} A resposta da API.
 */
export const updatePublicBookingStatus = (establishmentId, isEnabled) => {
    const id = establishmentId || state.establishmentId;
    if (!id) {
        return Promise.reject(new Error("ID do estabelecimento não fornecido."));
    }
    
    // Esta rota 'PATCH' é mais eficiente pois atualiza apenas um campo.
    return authenticatedFetch(`/api/establishments/${id}/booking-status`, {
        method: 'PATCH',
        body: JSON.stringify({ publicBookingEnabled: isEnabled }),
    });
};

/**
 * Atualiza o e-mail de login do proprietário no banco de dados.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @param {string} newEmail - O novo e-mail.
 * @returns {Promise<object>} A resposta da API.
 */
export const updateOwnerEmail = (establishmentId, newEmail) => {
    const id = establishmentId || state.establishmentId;
    if (!id) {
        return Promise.reject(new Error("ID do estabelecimento não fornecido."));
    }
    
    return authenticatedFetch(`/api/establishments/${id}/owner-email`, {
        method: 'PATCH',
        body: JSON.stringify({ newEmail: newEmail }),
    });
};

/**
 * Salva as configurações do programa de fidelidade.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @param {object} loyaltySettings - Objeto contendo { enabled, type, pointsPerVisit, pointsPerCurrency, tiers: [] }
 * @returns {Promise<object>} A resposta da API.
 */
export const saveLoyaltyProgram = (establishmentId, loyaltySettings) => {
    const id = establishmentId || state.establishmentId;
    if (!id) {
        return Promise.reject(new Error("ID do estabelecimento não fornecido."));
    }

    return authenticatedFetch(`/api/establishments/${id}/loyalty`, {
        method: 'PUT',
        body: JSON.stringify({ loyaltyProgram: loyaltySettings })
    });
};