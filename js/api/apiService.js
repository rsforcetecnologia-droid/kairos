import { auth } from '../firebase-config.js';

/**
 * de erros de rede e respostas não bem-sucedidas (como 404 ou 500).
 */

// --- CONFIGURAÇÃO DA URL DA API ---
// ATENÇÃO: Alterne entre as duas linhas abaixo dependendo do ambiente.

// 1. PARA PRODUÇÃO (quando for publicar o app)
// const API_BASE_URL = 'https://kairos-service-603994960586.southamerica-east1.run.app';

// 2. PARA TESTE LOCAL (desenvolvimento na sua rede Wi-Fi)
// Lembre-se de usar o IP correto do seu computador (onde o 'node index.js' está rodando)
const API_BASE_URL = 'https://kairos-service-603994960586.southamerica-east1.run.app';
// --- FIM DA CONFIGURAÇÃO ---


// Função privada para obter os cabeçalhos de autenticação.
async function getAuthHeaders() {
    const user = auth.currentUser;
    if (!user) {
        // Se não houver utilizador, redireciona para a página de login.
        // Em um app Capacitor, isso pode não funcionar como esperado,
        // o app principal (React/index.html) deve lidar com o estado de login.
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
 * (...)
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
            
            // --- INÍCIO DA MODIFICAÇÃO ---
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
            // --- FIM DA MODIFICAÇÃO ---

            console.error(`Erro na API (${response.status}) em ${fullUrl}:`, errorMessage);
            throw new Error(errorMessage);
        }

        // Retorna a resposta já convertida para JSON.
        return response.json();

    } catch (error) {
        // Este 'catch' pega erros de rede (ex: ERR_CONNECTION_REFUSED)
        console.error(`Falha de rede ao tentar acessar ${fullUrl}:`, error.message);
        
        // Esta é a mensagem de erro que você viu na imagem original!
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
             throw new Error(`Não foi possível conectar ao servidor em ${API_BASE_URL}. Verifique se o servidor está rodando e se o IP está correto.`);
        }
        throw error; // Lança o erro original se for outro tipo
    }
}