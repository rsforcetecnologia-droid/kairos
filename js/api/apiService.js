// js/api/apiService.js
import { auth } from '../firebase-config.js';

/**
 * Serviço centralizado para chamadas à API, com autenticação e tratamento
 * de erros de rede e respostas não bem-sucedidas (como 404 ou 500).
 */

// --- CONFIGURAÇÃO DA URL DA API (DINÂMICA) ---

// Verifica se o hostname atual é localhost ou IP de loopback
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Se for local, usa a porta 8080. Se não, usa a URL de produção do Cloud Run.
const API_BASE_URL = isLocalhost 
    ? 'http://localhost:8080' 
    : 'https://kairos-app-407358446276.us-central1.run.app';

console.log(`🚀 API configurada para modo: ${isLocalhost ? 'LOCAL (Dev)' : 'PRODUÇÃO (Cloud)'}`);
console.log('📡 URL Base:', API_BASE_URL);

// --- FIM DA CONFIGURAÇÃO ---


// Função privada para obter os cabeçalhos de autenticação.
async function getAuthHeaders() {
    const user = auth.currentUser;
    if (!user) {
        // Se não houver utilizador, redireciona para a página de login.
        console.warn("Usuário não logado, tentando redirecionar para /login");
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
 */
export async function authenticatedFetch(endpoint, options = {}) {
    const headers = await getAuthHeaders();
    if (!headers) {
        throw new Error("Utilizador não autenticado. A requisição foi cancelada.");
    }

    // --- CORREÇÃO DE URL: REMOÇÃO DE BARRA DUPLA ---
    // Remove a barra final da URL base, se existir
    const cleanBaseUrl = API_BASE_URL.replace(/\/$/, '');
    
    // Garante que o endpoint comece com uma barra
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    
    // Concatena de forma segura
    const fullUrl = `${cleanBaseUrl}${cleanEndpoint}`;
    // ----------------------------------------------
    
    console.log(`AuthenticatedFetch: ${options.method || 'GET'} ${fullUrl}`); // Log para debug

    try {
        const response = await fetch(fullUrl, {
            ...options,
            headers: {
                ...headers,
                ...options.headers, // Permite sobrescrever ou adicionar cabeçalhos específicos
            },
        });

        if (!response.ok) {
            // Tenta extrair uma mensagem de erro do corpo da resposta, senão usa o status text.
            const errorData = await response.json().catch(() => ({ message: response.statusText }));
            
            const errorMessage = errorData.message || `Erro na API: ${response.status}`;
            
            // --- DETECTOR DE FALTA DE ÍNDICE (FEATURE NOVA) ---
            if (errorMessage.includes('FAILED_PRECONDITION') && errorMessage.includes('requires an index')) {
                
                const urlRegex = /(https:\/\/[^\s]+)/;
                const match = errorMessage.match(urlRegex);
                const firebaseUrl = match ? match[0] : 'URL não encontrada na mensagem de erro.';

                console.warn(
                    `%c AVISO IMPORTANTE (FIREBASE): ÍNDICE NECESSÁRIO! %c
                    
Sua consulta em '${endpoint}' falhou porque um índice composto do Firestore é necessário.
Para corrigir isso, clique no link abaixo (com o Firebase logado) e crie o índice:
                    
%c${firebaseUrl}%c
                    
--------------------------------------------------------------------`,
                    "background-color: #ffc; color: #663300; font-size: 14px; font-weight: bold; padding: 5px;",
                    "color: #663300; font-size: 12px;",
                    "color: #0000ff; font-size: 12px; font-weight: bold; text-decoration: underline;",
                    "color: #663300; font-size: 12px;"
                );
            }
            // ----------------------------------------------------

            console.error(`Erro na API (${response.status}) em ${fullUrl}:`, errorMessage);
            throw new Error(errorMessage);
        }

        // Retorna a resposta já convertida para JSON.
        return response.json();

    } catch (error) {
        // Este 'catch' pega erros de rede (ex: ERR_CONNECTION_REFUSED)
        console.error(`Falha de rede ao tentar acessar ${fullUrl}:`, error.message);
        
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
             throw new Error(`Não foi possível conectar ao servidor em ${API_BASE_URL}. Verifique se o servidor backend está rodando.`);
        }
        throw error; // Lança o erro original se for outro tipo
    }
}