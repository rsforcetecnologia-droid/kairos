import { authenticatedFetch } from './apiService.js';

/**
 * Busca todos os pacotes de serviços de um estabelecimento.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @returns {Promise<Array>} - Uma promessa que resolve com a lista de pacotes.
 */
export const getPackages = (establishmentId) => {
    return authenticatedFetch(`/api/packages/${establishmentId}`);
};

/**
 * Cria um novo pacote de serviços.
 * @param {object} packageData - Os dados do pacote a ser criado.
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação da criação.
 */
export const createPackage = (packageData) => {
    return authenticatedFetch('/api/packages', {
        method: 'POST',
        body: JSON.stringify(packageData),
    });
};

/**
 * Atualiza um pacote de serviços existente.
 * @param {string} packageId - O ID do pacote a ser atualizado.
 * @param {object} packageData - Os novos dados do pacote.
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação da atualização.
 */
export const updatePackage = (packageId, packageData) => {
    return authenticatedFetch(`/api/packages/${packageId}`, {
        method: 'PUT',
        body: JSON.stringify(packageData),
    });
};

/**
 * Apaga um pacote de serviços.
 * @param {string} packageId - O ID do pacote a ser apagado.
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação da exclusão.
 */
export const deletePackage = (packageId) => {
    return authenticatedFetch(`/api/packages/${packageId}`, {
        method: 'DELETE',
    });
};

