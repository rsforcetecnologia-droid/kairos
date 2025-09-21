// js/mobile/services/apiService.js

// ✅ CORREÇÃO: O caminho para firebase.js agora é absoluto
import { auth, signOut } from '/js/mobile/services/firebase.js';

const API_BASE_URL = window.location.origin;

/**
 * Realiza uma requisição 'fetch' autenticada para um endpoint da API.
 * Garante que o token de autenticação do utilizador seja enviado em cada pedido.
 * @param {string} endpoint O caminho da API (ex: '/api/appointments/some-id').
 * @param {object} options Opções de configuração do fetch (method, body, etc.).
 * @param {object} user O objeto do utilizador logado, que contém o token.
 * @returns {Promise<any>} Uma promessa que resolve com os dados da resposta em JSON.
 */
export async function authenticatedFetch(endpoint, options = {}, user) {
    if (!user || !user.token) {
        // Se por algum motivo não houver token, desloga o utilizador por segurança.
        await signOut(auth);
        throw new Error("Utilizador não autenticado ou token inválido.");
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
        // Tenta extrair uma mensagem de erro do corpo da resposta, caso contrário, usa o status.
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(errorData.message || `Erro na API: ${response.status}`);
    }

    // Se a resposta for um 204 No Content ou tiver corpo vazio, retorna null.
    if (response.status === 204 || (response.status === 200 && response.headers.get('content-length') === '0')) {
        return null;
    }

    return response.json();
}