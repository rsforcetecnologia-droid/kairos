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

// ATUALIZADO: Aceita filtros de data e envia para a API
const getEntries = (type, startDate, endDate) => {
    let endpoint = `/api/financial/${type}`;
    if (startDate && endDate) {
        endpoint += `?startDate=${startDate}&endDate=${endDate}`;
    }
    return authenticatedFetch(endpoint);
};

const updateEntry = (type, id, data) => authenticatedFetch(`/api/financial/${type}/${id}`, { method: 'PUT', body: JSON.stringify(data) });
const deleteEntry = (type, id) => authenticatedFetch(`/api/financial/${type}/${id}`, { method: 'DELETE' });
const markAsPaid = (type, id, paymentDate) => authenticatedFetch(`/api/financial/${type}/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status: 'paid', paymentDate }) });

// --- Contas a Pagar ---
export const createPayable = (data) => createEntry('payables', data);
// ATUALIZADO: Inclui filtros de data
export const getPayables = (startDate, endDate) => getEntries('payables', startDate, endDate);
export const updatePayable = (id, data) => updateEntry('payables', id, data);
export const deletePayable = (id) => deleteEntry('payables', id);
export const markAsPaidPayable = (id, paymentDate) => markAsPaid('payables', id, paymentDate);

// --- Contas a Receber ---
export const createReceivable = (data) => createEntry('receivables', data);
// ATUALIZADO: Inclui filtros de data
export const getReceivables = (startDate, endDate) => getEntries('receivables', startDate, endDate);
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
