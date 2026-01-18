// js/api/financial.js

import { authenticatedFetch } from './apiService.js';

// --- Funções para Naturezas Financeiras (Hierárquico) ---

/**
 * Busca as naturezas financeiras de um estabelecimento.
 * @param {string} establishmentId - ID do estabelecimento.
 */
export const getNatures = (establishmentId) => {
    // CORREÇÃO: Passa o ID na URL para filtrar
    return authenticatedFetch(`/api/financial/natures/${establishmentId}`);
};

export const createNature = (data) => {
    return authenticatedFetch('/api/financial/natures', { 
        method: 'POST', 
        body: JSON.stringify(data) 
    });
};

export const deleteNature = (id) => {
    return authenticatedFetch(`/api/financial/natures/${id}`, { 
        method: 'DELETE' 
    });
};

// --- Funções para Centros de Custo (Hierárquico) ---

/**
 * Busca os centros de custo de um estabelecimento.
 * @param {string} establishmentId - ID do estabelecimento.
 */
export const getCostCenters = (establishmentId) => {
    // CORREÇÃO: Passa o ID na URL para filtrar
    return authenticatedFetch(`/api/financial/cost-centers/${establishmentId}`);
};

export const createCostCenter = (data) => {
    return authenticatedFetch('/api/financial/cost-centers', { 
        method: 'POST', 
        body: JSON.stringify(data) 
    });
};

export const deleteCostCenter = (id) => {
    return authenticatedFetch(`/api/financial/cost-centers/${id}`, { 
        method: 'DELETE' 
    });
};


// --- Funções Genéricas para Lançamentos ---

const createEntry = (type, data) => {
    // Nota: O 'data' agora pode incluir o campo 'recurrenceId' gerado no front-end
    return authenticatedFetch(`/api/financial/${type}`, { 
        method: 'POST', 
        body: JSON.stringify(data) 
    });
};

// ATUALIZADO: Aceita um objeto de filtros e constrói a query string
const getEntries = (type, filters = {}) => {
    let endpoint = `/api/financial/${type}`;
    const params = new URLSearchParams();

    // CORREÇÃO CRÍTICA: Adicionar establishmentId à query string se fornecido
    if (filters.establishmentId) params.append('establishmentId', filters.establishmentId);
    
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.natureId) params.append('natureId', filters.natureId);
    if (filters.costCenterId) params.append('costCenterId', filters.costCenterId);
    if (filters.status) params.append('status', filters.status); // Útil para filtrar 'paid' vs 'pending'

    const queryString = params.toString();
    if (queryString) {
        endpoint += `?${queryString}`;
    }
    
    return authenticatedFetch(endpoint);
};

const updateEntry = (type, id, data) => {
    return authenticatedFetch(`/api/financial/${type}/${id}`, { 
        method: 'PUT', 
        body: JSON.stringify(data) 
    });
};

const deleteEntry = (type, id) => {
    return authenticatedFetch(`/api/financial/${type}/${id}`, { 
        method: 'DELETE' 
    });
};

/**
 * Exclui múltiplos itens de uma vez.
 * Como o backend pode não ter uma rota de batch delete, executamos as requisições em paralelo.
 * @param {string} type - 'payables' ou 'receivables'
 * @param {Array<string>} ids - Lista de IDs para excluir
 */
export const deleteBatch = (type, ids) => {
    const promises = ids.map(id => 
        authenticatedFetch(`/api/financial/${type}/${id}`, { method: 'DELETE' })
    );
    return Promise.all(promises);
};

const markAsPaid = (type, id, paymentDate) => {
    return authenticatedFetch(`/api/financial/${type}/${id}/status`, { 
        method: 'PATCH', 
        body: JSON.stringify({ status: 'paid', paymentDate }) 
    });
};

// --- Contas a Pagar ---
export const createPayable = (data) => createEntry('payables', data);
// ATUALIZADO: Inclui filtros (não esquecer de passar establishmentId nos filtros ao chamar)
export const getPayables = (filters) => getEntries('payables', filters);
export const updatePayable = (id, data) => updateEntry('payables', id, data);
export const deletePayable = (id) => deleteEntry('payables', id);
export const markAsPaidPayable = (id, paymentDate) => markAsPaid('payables', id, paymentDate);

// --- Contas a Receber ---
export const createReceivable = (data) => createEntry('receivables', data);
// ATUALIZADO: Inclui filtros
export const getReceivables = (filters) => getEntries('receivables', filters);
export const updateReceivable = (id, data) => updateEntry('receivables', id, data);
export const deleteReceivable = (id) => deleteEntry('receivables', id);
export const markAsPaidReceivable = (id, paymentDate) => markAsPaid('receivables', id, paymentDate);

/**
 * Busca os dados para o gráfico de fluxo de caixa.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @param {string} startDate - Data de início no formato 'YYYY-MM-DD'.
 * @param {string} endDate - Data de fim no formato 'YYYY-MM-DD'.
 * @returns {Promise<object>} - Uma promessa que resolve com os dados formatados para o gráfico.
 */
export const getCashFlowData = (establishmentId, startDate, endDate) => {
    // CORREÇÃO: Adicionado establishmentId à query
    return authenticatedFetch(`/api/financial/cash-flow?establishmentId=${establishmentId}&startDate=${startDate}&endDate=${endDate}`);
};

/**
 * Busca o resumo de contas a pagar e receber para o dia atual.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @returns {Promise<object>} - Uma promessa que resolve com os totais.
 */
export const getTodaySummary = (establishmentId) => {
    // CORREÇÃO: Endpoint agora é específico por estabelecimento
    return authenticatedFetch(`/api/financial/today-summary/${establishmentId}`);
};