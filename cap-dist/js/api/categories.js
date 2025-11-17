// js/api/categories.js
import { authenticatedFetch } from './apiService.js';

/**
 * Busca categorias.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @param {string} categoryType - O tipo de categoria ('products' ou 'services').
 * @returns {Promise<Array>} - Uma promessa que resolve com a lista de categorias.
 */
export const getCategories = (establishmentId, categoryType = 'products') => {
    // ALTERAÇÃO: A URL agora é dinâmica com base no categoryType
    return authenticatedFetch(`/api/${categoryType}/categories/${establishmentId}`);
};

/**
 * Cria uma nova categoria.
 * @param {object} categoryData - Os dados da categoria ({ establishmentId, name }).
 * @param {string} categoryType - O tipo de categoria ('products' ou 'services').
 * @returns {Promise<object>} - Uma promessa que resolve com a categoria criada.
 */
export const createCategory = (categoryData, categoryType = 'products') => {
    // ALTERAÇÃO: A URL agora é dinâmica com base no categoryType
    return authenticatedFetch(`/api/${categoryType}/categories`, {
        method: 'POST',
        body: JSON.stringify(categoryData),
    });
};

/**
 * Apaga uma categoria.
 * @param {string} categoryId - O ID da categoria a ser apagada.
 * @param {string} categoryType - O tipo de categoria ('products' ou 'services').
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação da exclusão.
 */
export const deleteCategory = (categoryId, categoryType = 'products') => {
    // ALTERAÇÃO: A URL agora é dinâmica com base no categoryType
    return authenticatedFetch(`/api/${categoryType}/categories/${categoryId}`, {
        method: 'DELETE',
    });
};