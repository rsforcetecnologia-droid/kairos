// js/api/users.js

import { authenticatedFetch } from './apiService.js';

/**
 * Busca todos os usuários de um estabelecimento.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @returns {Promise<Array>} - Uma promessa que resolve com a lista de usuários.
 */
export const getUsers = (establishmentId) => {
    return authenticatedFetch(`/api/users/${establishmentId}`);
};

/**
 * Cria um novo usuário com permissões específicas.
 * @param {object} userData - Os dados do usuário a ser criado.
 * @returns {Promise<object>} - Uma promessa que resolve com o usuário criado.
 */
export const createUser = (userData) => {
    return authenticatedFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(userData),
    });
};

/**
 * Atualiza um usuário existente.
 * @param {string} userId - O ID do usuário a ser atualizado.
 * @param {object} userData - Os novos dados do usuário (nome e permissões).
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação da atualização.
 */
export const updateUser = (userId, userData) => {
    return authenticatedFetch(`/api/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
    });
};

/**
 * Exclui um usuário.
 * @param {string} userId - O ID do usuário a ser excluído.
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação da exclusão.
 */
export const deleteUser = (userId) => {
    return authenticatedFetch(`/api/users/${userId}`, {
        method: 'DELETE',
    });
};

/**
 * Altera a senha de um usuário.
 * @param {string} userId - O ID do usuário.
 * @param {string} newPassword - A nova senha para o usuário.
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação.
 */
export const changeUserPassword = (userId, newPassword) => {
    return authenticatedFetch(`/api/users/${userId}/password`, {
        method: 'PUT',
        body: JSON.stringify({ password: newPassword }),
    });
};

/**
 * ATUALIZADO: Atualiza o status (ativo/inativo) de um usuário.
 * @param {string} userId - O ID do usuário.
 * @param {string} status - O novo status ('active' ou 'inactive').
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação.
 */
export const updateUserStatus = (userId, status) => {
    return authenticatedFetch(`/api/users/${userId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
    });
};