// js/api/comandas.js

import { authenticatedFetch } from './apiService.js';

/**
 * Busca todas as comandas (agendamentos e vendas avulsas) de um estabelecimento.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @returns {Promise<Array>} - Uma promessa que resolve com a lista de comandas.
 */
export const getComandas = (establishmentId) => {
    return authenticatedFetch(`/api/comandas/${establishmentId}`);
};

/**
 * Busca os detalhes de uma comanda específica.
 * @param {string} comandaId - O ID da comanda (pode ser de um agendamento ou venda).
 * @returns {Promise<object>} - Uma promessa que resolve com os dados da comanda.
 */
export const getComandaById = (comandaId) => {
    return authenticatedFetch(`/api/comandas/${comandaId}`);
};


/**
 * Adiciona ou atualiza a lista de itens de uma comanda de agendamento.
 * @param {string} appointmentId - O ID do agendamento.
 * @param {Array} items - A lista completa e atualizada de itens da comanda.
 * @returns {Promise<object>} - A confirmação da API.
 */
export const updateComandaItems = (appointmentId, items) => {
    return authenticatedFetch(`/api/appointments/${appointmentId}/comanda`, {
        method: 'POST',
        body: JSON.stringify({ items }),
    });
};

/**
 * Inicia o serviço para um agendamento, efetivamente criando uma comanda "Em Atendimento".
 * @param {string} appointmentId - O ID do agendamento.
 * @returns {Promise<object>} - A confirmação da API.
 */
export const startServiceForAppointment = (appointmentId) => {
    return authenticatedFetch(`/api/appointments/${appointmentId}/start-service`, {
        method: 'POST',
    });
};