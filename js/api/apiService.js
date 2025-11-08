import { auth } from '../firebase-config.js';

/**
 * Este módulo centraliza toda a lógica de comunicação com a API backend.
 * (...)
 */

// --- ALTERAÇÃO AQUI ---
// Apontando para o seu servidor local (que roda com 'npm start')
const API_BASE_URL = 'http://localhost:3001'; 
// URL original: 'https://kairos-service-603994960586.southamerica-east1.run.app'
// --- FIM DA ALTERAÇÃO ---

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
 * (...)
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
        
        // --- MELHORIA DE DEBUG ---
        // Se o erro tiver a propriedade 'detail' (como o de índice), mostra no console
        if (errorData.detail) {
            console.error("Detalhe do Erro da API (Local):", errorData.detail);
        }
        // --- FIM DA MELHORIA ---
        
        throw new Error(errorData.message || `Erro na API: ${response.status}`);
    }

    // Retorna a resposta já convertida para JSON.
    return response.json();
}