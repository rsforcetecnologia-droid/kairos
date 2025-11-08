import { authenticatedFetch } from './apiService.js';

/**
 * Busca todos os serviços de um estabelecimento.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @returns {Promise<Array>} - Uma promessa que resolve com a lista de serviços.
 */
export const getServices = (establishmentId) => {
    return authenticatedFetch(`/api/services/${establishmentId}`);
};

/**
 * Cria um novo serviço.
 * @param {object} serviceData - Os dados do serviço a ser criado.
 * @returns {Promise<object>} - Uma promessa que resolve com o serviço criado.
 */
export const createService = (serviceData) => {
    return authenticatedFetch('/api/services', {
        method: 'POST',
        body: JSON.stringify(serviceData),
    });
};

/**
 * Atualiza um serviço existente.
 * @param {string} serviceId - O ID do serviço.
 * @param {object} serviceData - Os novos dados do serviço.
 * @returns {Promise<object>} - Uma promessa que resolve com o serviço atualizado.
 */
export const updateService = (serviceId, serviceData) => {
    return authenticatedFetch(`/api/services/${serviceId}`, {
        method: 'PUT',
        body: JSON.stringify(serviceData),
    });
};

/**
 * Apaga um serviço.
 * @param {string} serviceId - O ID do serviço a ser apagado.
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação da exclusão.
 */
export const deleteService = (serviceId) => {
    return authenticatedFetch(`/api/services/${serviceId}`, {
        method: 'DELETE',
    });
};

/**
 * Atualiza o status (ativo/inativo) de um serviço.
 * @param {string} serviceId - O ID do serviço.
 * @param {boolean} active - O novo status.
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação.
 */
export const updateServiceStatus = (serviceId, active) => {
    return authenticatedFetch(`/api/services/${serviceId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ active }),
    });
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++ NOVA FUNÇÃO: BUSCA O SERVIÇO MAIS POPULAR ++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/**
 * Busca as estatísticas do serviço mais popular.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @returns {Promise<object>} - Uma promessa que resolve com { name, count }.
 */
export const getMostPopularService = (establishmentId) => {
    return authenticatedFetch(`/api/services/stats/most-popular/${establishmentId}`);
};


// --- CATEGORIAS DE SERVIÇO ---
// (Estas funções podem ser migradas para 'js/api/categories.js' no futuro,
// mas vamos mantê-las aqui por enquanto se o 'routes/services.js' as tiver)

/**
 * Busca todas as categorias de SERVIÇO.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @returns {Promise<Array>} - Uma promessa que resolve com a lista de categorias.
 */
export const getServiceCategories = (establishmentId) => {
    return authenticatedFetch(`/api/services/categories/${establishmentId}`);
};

/**
 * Cria uma nova categoria de SERVIÇO.
 * @param {object} categoryData - Os dados da categoria ({ establishmentId, name }).
 * @returns {Promise<object>} - Uma promessa que resolve com a categoria criada.
 */
export const createServiceCategory = (categoryData) => {
    return authenticatedFetch('/api/services/categories', {
        method: 'POST',
        body: JSON.stringify(categoryData),
    });
};

/**
 * Apaga uma categoria de SERVIÇO.
 * @param {string} categoryId - O ID da categoria a ser apagada.
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação da exclusão.
 */
export const deleteServiceCategory = (categoryId) => {
    return authenticatedFetch(`/api/services/categories/${categoryId}`, {
        method: 'DELETE',
    });
};