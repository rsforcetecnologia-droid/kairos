// js/api/products.js

import { authenticatedFetch } from './apiService.js';

/**
 * Este módulo agrupa todas as funções para interagir com os endpoints
 * de produtos (`products`) da API.
 */

/**
 * Busca todos os produtos de um estabelecimento.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @returns {Promise<Array>} - Uma promessa que resolve com a lista de produtos.
 */
export const getProducts = (establishmentId) => {
    return authenticatedFetch(`/api/products/${establishmentId}`);
};

/**
 * Cria um novo produto.
 * @param {object} productData - Os dados do produto a ser criado.
 * @returns {Promise<object>} - Uma promessa que resolve com o produto criado.
 */
export const createProduct = (productData) => {
    return authenticatedFetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(productData),
    });
};

/**
 * Atualiza um produto existente.
 * @param {string} productId - O ID do produto.
 * @param {object} productData - Os novos dados do produto.
 * @returns {Promise<object>} - Uma promessa que resolve com o produto atualizado.
 */
export const updateProduct = (productId, productData) => {
    return authenticatedFetch(`/api/products/${productId}`, {
        method: 'PUT',
        body: JSON.stringify(productData),
    });
};

/**
 * Apaga um produto.
 * @param {string} productId - O ID do produto a ser apagado.
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação da exclusão.
 */
export const deleteProduct = (productId) => {
    return authenticatedFetch(`/api/products/${productId}`, {
        method: 'DELETE',
    });
};

/**
 * Ajusta o stock de um produto.
 * @param {string} productId - O ID do produto.
 * @param {object} stockData - Dados do ajuste ({ change, reason }).
 * @returns {Promise<object>} - Uma promessa que resolve com o produto atualizado.
 */
export const adjustStock = (productId, stockData) => {
    return authenticatedFetch(`/api/products/${productId}/stock`, {
        method: 'PATCH',
        body: JSON.stringify(stockData),
    });
};
