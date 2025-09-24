const { authenticatedFetch } = require('./apiService');

const API_BASE_URL = window.location.origin;

/**
 * Módulo para gerir chamadas à API de planos de assinatura.
 */

export const getPlans = () => {
    return authenticatedFetch('/api/subscriptions/plans');
};

export const createPlan = (planData) => {
    return authenticatedFetch('/api/subscriptions/plans', {
        method: 'POST',
        body: JSON.stringify(planData)
    });
};

export const updatePlan = (planId, planData) => {
    return authenticatedFetch(`/api/subscriptions/plans/${planId}`, {
        method: 'PUT',
        body: JSON.stringify(planData)
    });
};

export const deletePlan = (planId) => {
    return authenticatedFetch(`/api/subscriptions/plans/${planId}`, {
        method: 'DELETE'
    });
};

export const assignPlan = (establishmentId, planId, expiryDate) => {
    return authenticatedFetch(`/api/subscriptions/assign/${establishmentId}`, {
        method: 'PATCH',
        body: JSON.stringify({ planId, expiryDate })
    });
};
