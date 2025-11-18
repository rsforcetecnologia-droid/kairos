import { auth } from '../firebase-config.js';

/**
 * Serviço centralizado para chamadas à API, com autenticação e tratamento
 * de erros de rede e respostas não bem-sucedidas (como 404 ou 500).
 */

// --- CONFIGURAÇÃO DA URL DA API (AJUSTADO) ---
// Esta lógica deteta se está a correr localmente ou em produção.
let API_BASE_URL;

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // AMBIENTE LOCAL: Aponta para o seu PC na porta 3001
    API_BASE_URL = 'http://localhost:3001';
    console.log('🔧 Ambiente de Desenvolvimento (Localhost) detectado. API:', API_BASE_URL);
} else {
    // PRODUÇÃO: Aponta para o Cloud Run
    API_BASE_URL = 'https://kairos-service-603994960586.southamerica-east1.run.app';
}
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

    const fullUrl = `${API_BASE_URL}${endpoint}`;
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
            
            // Verifica se é o erro específico de "Índice Faltando" do Firestore
            if (errorMessage.includes('FAILED_PRECONDITION') && errorMessage.includes('requires an index')) {
                
                // Extrai apenas o URL da mensagem de erro
                const urlRegex = /(https:\/\/[^\s]+)/;
                const match = errorMessage.match(urlRegex);
                const firebaseUrl = match ? match[0] : 'URL não encontrada na mensagem de erro.';

                // Loga uma mensagem grande e clara no console para o desenvolvedor
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

            console.error(`Erro na API (${response.status}) em ${fullUrl}:`, errorMessage);
            throw new Error(errorMessage);
        }

        // Retorna a resposta já convertida para JSON.
        return response.json();

    } catch (error) {
        // Este 'catch' pega erros de rede (ex: ERR_CONNECTION_REFUSED)
        console.error(`Falha de rede ao tentar acessar ${fullUrl}:`, error.message);
        
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
             throw new Error(`Não foi possível conectar ao servidor em ${API_BASE_URL}. Verifique se o servidor está rodando (npm start) e se o endereço está correto.`);
        }
        throw error; // Lança o erro original se for outro tipo
    }
}