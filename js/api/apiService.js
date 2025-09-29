    // js/api/apiService.js
    
    import { auth } from '../firebase-config.js';
    
    /**
     * Este módulo centraliza toda a lógica de comunicação com a API backend.
     * A função `authenticatedFetch` é um "wrapper" em torno da função `fetch` nativa
     * do navegador. Ela garante que cada requisição enviada ao nosso servidor
     * inclua o token de autenticação do Firebase, além de padronizar o tratamento
     * de erros de rede e respostas não bem-sucedidas (como 404 ou 500).
     */
    
    const API_BASE_URL = window.location.origin;
    
    // Função privada para obter os cabeçalhos de autenticação.
    async function getAuthHeaders() {
        const user = auth.currentUser;
        if (!user) {
            // Se não houver utilizador, redireciona para a página de login.
            window.location.href = '/login';
            return null;
        }
        const token = await user.getIdToken();
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    }
    
    /**
     * Realiza uma requisição 'fetch' autenticada para um endpoint da nossa API.
     * @param {string} endpoint - O caminho da API a ser chamado (ex: '/api/products/some-id').
     * @param {object} options - Opções de configuração da requisição (mesmas do 'fetch', como method, body, etc.).
     * @returns {Promise<any>} - Uma promessa que resolve com os dados da resposta em formato JSON.
     * @throws {Error} - Lança um erro se o utilizador não estiver autenticado ou se a resposta da API for um erro.
     */
    export async function authenticatedFetch(endpoint, options = {}) {
        const headers = await getAuthHeaders();
        if (!headers) {
            throw new Error("Utilizador não autenticado. A requisição foi cancelada.");
        }
    
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                ...headers,
                ...options.headers, // Permite sobrescrever ou adicionar cabeçalhos específicos
            },
        });
    
        if (!response.ok) {
            // Tenta extrair uma mensagem de erro do corpo da resposta, senão usa o status text.
            const errorData = await response.json().catch(() => ({ message: response.statusText }));
            throw new Error(errorData.message || `Erro na API: ${response.status}`);
        }
    
        // Retorna a resposta já convertida para JSON.
        return response.json();
    }
    