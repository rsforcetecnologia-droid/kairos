// js/api/categories.js

import { authenticatedFetch } from './apiService.js';

/**
 * Este módulo lida com todas as chamadas de API relacionadas
 * às categorias de produtos.
 */

/**
 * Busca todas as categorias de um estabelecimento.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @returns {Promise<Array>} - Uma promessa que resolve com a lista de categorias.
 */
export const getCategories = (establishmentId) => {
    // CORREÇÃO: A URL foi atualizada para o novo padrão.
    return authenticatedFetch(`/api/products/categories/${establishmentId}`);
};

/**
 * Cria uma nova categoria de produto.
 * @param {object} categoryData - Os dados da categoria ({ establishmentId, name }).
 * @returns {Promise<object>} - Uma promessa que resolve com a categoria criada.
 */
export const createCategory = (categoryData) => {
    // CORREÇÃO: A URL foi atualizada para o novo padrão.
    return authenticatedFetch('/api/products/categories', {
        method: 'POST',
        body: JSON.stringify(categoryData),
    });
};

/**
 * Apaga uma categoria de produto.
 * @param {string} categoryId - O ID da categoria a ser apagada.
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação da exclusão.
 */
export const deleteCategory = (categoryId) => {
    // CORREÇÃO: A URL foi atualizada para o novo padrão.
    return authenticatedFetch(`/api/products/categories/${categoryId}`, {
        method: 'DELETE',
    });
};