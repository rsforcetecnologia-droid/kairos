// js/api/appointments.js

import { authenticatedFetch } from './apiService.js';

/**
 * Este módulo agrupa todas as funções relacionadas à comunicação com os endpoints
 * de agendamentos (`appointments`) da API. Cada função aqui corresponde a uma
 * operação específica (buscar, criar, atualizar, etc.), tornando o código que
 * usa estas funções mais legível e fácil de manter.
 */

/**
 * Busca agendamentos dentro de um intervalo de datas.
 * @param {string} establishmentId - ID do estabelecimento.
 * @param {string} startDateISO - Data de início no formato ISO (new Date().toISOString()).
 * @param {string} endDateISO - Data de fim no formato ISO.
 * @returns {Promise<Array>} - Uma promessa que resolve com a lista de agendamentos.
 */
export const getAppointmentsByDateRange = (establishmentId, startDateISO, endDateISO) => {
    const endpoint = `/api/appointments/${establishmentId}?startDate=${startDateISO}&endDate=${endDateISO}`;
    return authenticatedFetch(endpoint);
};

/**
 * NOVO: Busca o histórico de agendamentos cancelados.
 * @param {string} establishmentId - ID do estabelecimento.
 * @param {string} startDateISO - Data de início no formato ISO.
 * @param {string} endDateISO - Data de fim no formato ISO.
 * @returns {Promise<Array>} - Uma promessa que resolve com a lista de agendamentos cancelados.
 */
export const getCancelledAppointments = (establishmentId, startDateISO, endDateISO) => {
    const endpoint = `/api/appointments/cancelled/${establishmentId}?startDate=${startDateISO}&endDate=${endDateISO}`;
    return authenticatedFetch(endpoint);
};


/**
 * Busca os horários disponíveis para um agendamento.
 * @param {object} params - Parâmetros da busca.
 * @param {string} params.establishmentId
 * @param {string} params.professionalId
 * @param {string[]} params.serviceIds
 * @param {string} params.date - Data no formato 'YYYY-MM-DD'.
 * @returns {Promise<Array>} - Uma promessa que resolve com a lista de horários (strings).
 */
export const getAvailability = ({ establishmentId, professionalId, serviceIds, date }) => {
    const endpoint = `/api/availability?establishmentId=${establishmentId}&professionalId=${professionalId}&serviceIds=${serviceIds.join(',')}&date=${date}`;
    return authenticatedFetch(endpoint);
};

/**
 * Cria um novo agendamento.
 * @param {object} appointmentData - Os dados do agendamento a ser criado.
 * @returns {Promise<object>} - Uma promessa que resolve com o agendamento criado.
 */
export const createAppointment = (appointmentData) => {
    return authenticatedFetch('/api/appointments', {
        method: 'POST',
        body: JSON.stringify(appointmentData),
    });
};

/**
 * Atualiza um agendamento existente.
 * @param {string} appointmentId - O ID do agendamento a ser atualizado.
 * @param {object} appointmentData - Os novos dados do agendamento.
 * @returns {Promise<object>} - Uma promessa que resolve com o agendamento atualizado.
 */
export const updateAppointment = (appointmentId, appointmentData) => {
    return authenticatedFetch(`/api/appointments/${appointmentId}`, {
        method: 'PUT',
        body: JSON.stringify(appointmentData),
    });
};

/**
 * Apaga um agendamento.
 * @param {string} appointmentId - O ID do agendamento a ser apagado.
 * @returns {Promise<object>} - Uma promessa que resolve com a confirmação da exclusão.
 */
export const deleteAppointment = (appointmentId) => {
    return authenticatedFetch(`/api/appointments/${appointmentId}`, {
        method: 'DELETE',
    });
};

/**
 * Reabre uma comanda que já foi finalizada.
 * @param {string} appointmentId - O ID do agendamento.
 * @returns {Promise<object>}
 */
export const reopenAppointment = (appointmentId) => {
    return authenticatedFetch(`/api/appointments/${appointmentId}/reopen`, {
        method: 'POST',
    });
};

/**
 * Finaliza o pagamento de um agendamento.
 * @param {string} appointmentId - O ID do agendamento.
 * @param {object} paymentData - Dados do pagamento { payments, totalAmount }.
 * @returns {Promise<object>}
 */
export const checkoutAppointment = (appointmentId, paymentData) => {
    return authenticatedFetch(`/api/appointments/${appointmentId}/checkout`, {
        method: 'POST',
        body: JSON.stringify(paymentData),
    });
};

/**
 * Define o status de uma comanda para "aguardando pagamento".
 * @param {string} appointmentId - O ID do agendamento.
 * @returns {Promise<object>}
 */
export const setAwaitingPayment = (appointmentId) => {
    return authenticatedFetch(`/api/appointments/${appointmentId}/awaiting-payment`, {
        method: 'POST',
    });
};
