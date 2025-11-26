// js/api/public.js

const API_BASE_URL = window.location.origin;

/**
 * Busca todos os planos de assinatura publicamente (sem token).
 * @returns {Promise<Array>} - Uma promessa que resolve com a lista de planos.
 */
export const getPublicPlans = async () => {
    const endpoint = `/api/public/subscriptions/plans`;
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    if (!response.ok) {
        // Se a API retornar um erro (ex: 500), lança um erro para o chamador
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(errorData.message || `Erro na API: ${response.status}`);
    }

    return response.json();
};

/**
 * Registra um novo estabelecimento e cria uma assinatura recorrente.
 * @param {object} data - Dados de cadastro e pagamento.
 * @returns {Promise<object>} - Promessa que resolve com a confirmação.
 */
export const registerEstablishment = async (data) => {
    const endpoint = `/api/public/register`;
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    
    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Falha ao registrar a assinatura.');
    }
    
    return result;
};