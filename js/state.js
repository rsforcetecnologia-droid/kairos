// js/state.js (Otimizado para Arquitetura Multi-Tenant Enterprise - 3 Níveis)

import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// Estado global da aplicação
export const state = {
    // =========================================================
    // 1. DADOS DO UTILIZADOR LOGADO
    // =========================================================
    userName: null, 
    userProfessionalId: null, 
    userPermissions: null, 
    userRole: null, // Ex: 'group_admin', 'company_admin', 'branch_manager', 'professional'
    
    // =========================================================
    // 2. HIERARQUIA MULTI-EMPRESA (NOVO: 3 Níveis)
    // =========================================================
    groupId: null, // ID do Grupo Económico (Holding)
    groupName: null,
    accessibleCompanies: [], // Ex: [{ id: 'empresa-1', name: 'Barbearia Matriz (CNPJ 1)' }]
    accessibleEstablishments: [], // Ex: [{ id: 'filial-1', companyId: 'empresa-1', name: 'Filial Shopping' }]
    
    // =========================================================
    // 3. CONTEXTO ATUAL DE VISUALIZAÇÃO
    // =========================================================
    // Define exatamente o que o sistema deve buscar na base de dados agora.
    currentViewContext: {
        type: null, // Pode ser: 'GROUP', 'COMPANY' ou 'BRANCH'
        id: null,   // O ID correspondente ao type acima
        name: null  // Nome para exibição no Seletor da Interface
    },

    // =========================================================
    // 4. RETROCOMPATIBILIDADE (CÓDIGO ANTIGO)
    // =========================================================
    // Mantemos estas variáveis para que o código antigo não parta de imediato.
    // Quando o contexto for 'GROUP' ou 'COMPANY', establishmentId será 'ALL'.
    establishmentId: null,
    establishmentName: null, 
    establishmentSettings: null, 

    // =========================================================
    // 5. CACHE E MÓDULOS
    // =========================================================
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
    },
    
    professionals: [],
    services: [],
    professionalColors: new Map(),
    allEvents: [] 
};

/**
 * Inicializa o estado global no momento do Login, montando a árvore de acessos.
 * @param {object} userData - Dados do utilizador (nome, id, permissões, role)
 * @param {object} hierarchyData - Os dados das empresas e filiais que ele tem acesso
 */
export function initEnterpriseState(userData, hierarchyData) {
    state.userName = userData.name || null;
    state.userProfessionalId = userData.professionalId || null;
    state.userPermissions = userData.permissions || null;
    state.userRole = userData.role || 'professional'; // Padrão seguro

    state.groupId = hierarchyData.groupId || null;
    state.groupName = hierarchyData.groupName || 'O Meu Grupo';
    state.accessibleCompanies = hierarchyData.accessibleCompanies || [];
    state.accessibleEstablishments = hierarchyData.accessibleEstablishments || [];

    // Define automaticamente o contexto mais amplo que o utilizador tem direito a ver
    if (state.userRole === 'group_admin' && state.groupId) {
        setContext('GROUP', state.groupId, state.groupName);
    } else if (state.userRole === 'company_admin' && state.accessibleCompanies.length > 0) {
        setContext('COMPANY', state.accessibleCompanies[0].id, state.accessibleCompanies[0].name);
    } else if (state.accessibleEstablishments.length > 0) {
        setContext('BRANCH', state.accessibleEstablishments[0].id, state.accessibleEstablishments[0].name);
    }
}

/**
 * Função Mágica: Muda o contexto de visualização de todo o sistema.
 * Ao ser chamada (ex: no menu dropdown), limpa os caches antigos e manda a UI recarregar.
 * * @param {string} type - 'GROUP', 'COMPANY' ou 'BRANCH'
 * @param {string} id - O ID da rede, empresa ou filial
 * @param {string} name - O nome para mostrar na Navbar
 */
export function setContext(type, id, name) {
    state.currentViewContext = { type, id, name };
    
    // Suporte ao código legado
    if (type === 'BRANCH') {
        state.establishmentId = id;
        state.establishmentName = name;
    } else {
        state.establishmentId = 'ALL'; // Informa as APIs antigas que devem procurar num array
        state.establishmentName = name;
    }

    // Sempre que mudamos de filial/empresa, apagamos a cache antiga
    clearCaches();
    
    console.log(`[Kairos Enterprise] Contexto alterado para: [${type}] ${name} (ID: ${id})`);
    
    // Dispara um evento global no browser. 
    // Os seus ficheiros (agenda, dashboard) podem "escutar" isto e recarregar os dados na hora!
    window.dispatchEvent(new CustomEvent('kairos:contextChanged', { 
        detail: state.currentViewContext 
    }));
}

/**
 * Limpa os dados em memória para evitar mistura de informações entre filiais.
 */
function clearCaches() {
    state.professionals = [];
    state.services = [];
    state.professionalColors.clear();
    state.allEvents = [];
    state.establishmentSettings = null;
}

/**
 * FUNÇÃO LEGADA: Define o ID do estabelecimento, o nome e as permissões.
 * Mantida intacta para compatibilidade com o ficheiro loginScreen.js atual,
 * até fazermos a transição completa para a função initEnterpriseState().
 */
export function setGlobalState(establishmentId, establishmentName, permissions) {
    state.establishmentId = establishmentId;
    state.establishmentName = establishmentName; 
    state.userPermissions = permissions;
    
    // Atualiza também o contexto novo por segurança
    state.currentViewContext = {
        type: 'BRANCH',
        id: establishmentId,
        name: establishmentName
    };
}

/**
 * Obtém o token de autenticação do utilizador logado.
 * @returns {Promise<string|null>} O token JWT ou null se não estiver logado.
 */
export async function getAuthToken() {
    const auth = getAuth();
    if (auth.currentUser) {
        try {
            return await auth.currentUser.getIdToken(true); // Força a atualização do token
        } catch (error) {
            console.error("Erro ao obter token:", error);
            // Tratar erros de token, ex: deslogar o utilizador
            if (error.code === 'auth/user-token-expired' || error.code === 'auth/invalid-user-token') {
                await auth.signOut();
                window.location.href = '/login';
            }
            return null;
        }
    }
    return null;
}