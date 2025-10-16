import { authenticatedFetch } from './apiService.js';

// --- Funções para Naturezas Financeiras (Hierárquico) ---
export const getNatures = () => authenticatedFetch('/api/financial/natures');
export const createNature = (data) => authenticatedFetch('/api/financial/natures', { method: 'POST', body: JSON.stringify(data) });
export const deleteNature = (id) => authenticatedFetch(`/api/financial/natures/${id}`, { method: 'DELETE' });

// --- Funções para Centros de Custo (Hierárquico) ---
export const getCostCenters = () => authenticatedFetch('/api/financial/cost-centers');
export const createCostCenter = (data) => authenticatedFetch('/api/financial/cost-centers', { method: 'POST', body: JSON.stringify(data) });
export const deleteCostCenter = (id) => authenticatedFetch(`/api/financial/cost-centers/${id}`, { method: 'DELETE' });


// --- Funções Genéricas para Lançamentos ---
const createEntry = (type, data) => authenticatedFetch(`/api/financial/${type}`, { method: 'POST', body: JSON.stringify(data) });

// ATUALIZADO: Aceita um objeto de filtros e constrói a query string
const getEntries = (type, filters = {}) => {
    let endpoint = `/api/financial/${type}`;
    const params = new URLSearchParams();
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.natureId) params.append('natureId', filters.natureId);
    if (filters.costCenterId) params.append('costCenterId', filters.costCenterId);

    const queryString = params.toString();
    if (queryString) {
        endpoint += `?${queryString}`;
    }
    
    return authenticatedFetch(endpoint);
};

const updateEntry = (type, id, data) => authenticatedFetch(`/api/financial/${type}/${id}`, { method: 'PUT', body: JSON.stringify(data) });
const deleteEntry = (type, id) => authenticatedFetch(`/api/financial/${type}/${id}`, { method: 'DELETE' });
const markAsPaid = (type, id, paymentDate) => authenticatedFetch(`/api/financial/${type}/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status: 'paid', paymentDate }) });

// --- Contas a Pagar ---
export const createPayable = (data) => createEntry('payables', data);
// ATUALIZADO: Inclui filtros
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
 * @param {string} startDate - Data de início no formato 'YYYY-MM-DD'.
 * @param {string} endDate - Data de fim no formato 'YYYY-MM-DD'.
 * @returns {Promise<object>} - Uma promessa que resolve com os dados formatados para o gráfico.
 */
export const getCashFlowData = (startDate, endDate) => {
    return authenticatedFetch(`/api/financial/cash-flow?startDate=${startDate}&endDate=${endDate}`);
};

/**
 * NOVO: Busca o resumo de contas a pagar e receber para o dia atual.
 * @returns {Promise<object>} - Uma promessa que resolve com os totais.
 */
export const getTodaySummary = () => {
    return authenticatedFetch('/api/financial/today-summary');
};