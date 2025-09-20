const API_BASE_URL = window.location.origin;

/**
 * Realiza uma requisição 'fetch' autenticada para um endpoint da nossa API.
 * @param {string} endpoint - O caminho da API a ser chamado.
 * @param {object} options - Opções de configuração da requisição.
 * @param {object} user - O objeto do usuário autenticado.
 * @returns {Promise<any>}
 */
export async function authenticatedFetch(endpoint, options = {}, user) {
    if (!user || !user.token) {
        throw new Error("Utilizador não autenticado. A requisição foi cancelada.");
    }
    
    const headers = { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${user.token}` 
    };
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            ...headers,
            ...options.headers,
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(errorData.message || `Erro na API: ${response.status}`);
    }
    
    if (response.status === 204 || (response.status === 200 && response.headers.get('content-length') === '0')) return null;
    return response.json();
}
