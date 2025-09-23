import { authenticatedFetch } from './apiService.js';

// --- Funções Genéricas ---
const createEntry = (type, data) => authenticatedFetch(`/api/financial/${type}`, { method: 'POST', body: JSON.stringify(data) });
const getEntries = (type) => authenticatedFetch(`/api/financial/${type}`);
const updateEntry = (type, id, data) => authenticatedFetch(`/api/financial/${type}/${id}`, { method: 'PUT', body: JSON.stringify(data) });
const deleteEntry = (type, id) => authenticatedFetch(`/api/financial/${type}/${id}`, { method: 'DELETE' });
const markAsPaid = (type, id, paymentDate) => authenticatedFetch(`/api/financial/${type}/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status: 'paid', paymentDate }) });

// --- Contas a Pagar ---
export const createPayable = (data) => createEntry('payables', data);
export const getPayables = () => getEntries('payables');
export const updatePayable = (id, data) => updateEntry('payables', id, data);
export const deletePayable = (id) => deleteEntry('payables', id);
export const markAsPaidPayable = (id, paymentDate) => markAsPaid('payables', id, paymentDate);

// --- Contas a Receber ---
export const createReceivable = (data) => createEntry('receivables', data);
export const getReceivables = () => getEntries('receivables');
export const updateReceivable = (id, data) => updateEntry('receivables', id, data);
export const deleteReceivable = (id) => deleteEntry('receivables', id);
export const markAsPaidReceivable = (id, paymentDate) => markAsPaid('receivables', id, paymentDate);