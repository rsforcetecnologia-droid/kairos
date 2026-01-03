// js/state.js

import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// Estado global da aplicação
export const state = {
    establishmentId: null,
    establishmentName: null, 
    userName: null, 
    userProfessionalId: null, 
    userPermissions: null, // Armazena as permissões do usuário
    
    // --- NOVO: Cache de Configurações Gerais (inclui Programa de Fidelidade) ---
    establishmentSettings: null, 

    enabledModules: {
        agenda: true,
        comandas: true,
        relatorios: true,
        commissions: true,
        packages: true,
        financial: true,
        servicos: true,
        produtos: true,
        profissionais: true,
        clientes: true,
        users: true,
        estabelecimento: true,
    }, // Módulos habilitados
    
    // Cache de dados (preenchido no login/carregamento)
    professionals: [],
    services: [],
    
    // Cache de cores (para consistência na agenda)
    professionalColors: new Map(),

    // Armazena a lista de eventos (agendamentos + bloqueios)
    allEvents: [] 
};

/**
 * Define o ID do estabelecimento, o nome e as permissões do usuário no estado global.
 * @param {string} establishmentId - O ID do estabelecimento.
 * @param {string} establishmentName - O nome do estabelecimento.
 * @param {object | null} permissions - O objeto de permissões do usuário (ou null se for 'owner').
 */
export function setGlobalState(establishmentId, establishmentName, permissions) {
    state.establishmentId = establishmentId;
    state.establishmentName = establishmentName; 
    state.userPermissions = permissions;
    
    // ####################################################################
    // ### CORREÇÃO APLICADA AQUI ###
    // A linha abaixo foi REMOVIDA, pois o ID 'panelEstablishmentName'
    // não existe mais no 'index.html'.
    //
    // document.getElementById('panelEstablishmentName').textContent = establishmentName; 
    //
    // ####################################################################
}

/**
 * Obtém o token de autenticação do usuário logado.
 * @returns {Promise<string|null>} O token JWT ou null se não estiver logado.
 */
export async function getAuthToken() {
    const auth = getAuth();
    if (auth.currentUser) {
        try {
            return await auth.currentUser.getIdToken(true); // Força a atualização do token
        } catch (error) {
            console.error("Erro ao obter token:", error);
            // Tratar erros de token, ex: deslogar o usuário
            if (error.code === 'auth/user-token-expired' || error.code === 'auth/invalid-user-token') {
                await auth.signOut();
                window.location.href = '/login';
            }
            return null;
        }
    }
    return null;
}