/**
 * Este arquivo centraliza o estado da aplicação. Em vez de usar múltiplas variáveis
 * globais, usamos um único objeto 'state'. Isso ajuda a rastrear os dados
 * e a evitar que diferentes partes do código modifiquem dados inesperadamente.
 *
 * Qualquer módulo pode importar este objeto para ler ou atualizar o estado da aplicação
 * de forma consistente.
 */

// O objeto principal que guarda todos os dados dinâmicos da aplicação.
export const state = {
    // Informações do utilizador e estabelecimento
    establishmentId: null,
    establishmentName: 'Meu Painel',

    // Armazena as permissões do usuário logado.
    userPermissions: null, 

    // Arrays que funcionarão como um cache local dos dados vindos da API
    appointments: [],
    professionals: [],
    products: [],
    services: [],
    categories: [],
    comandas: [],
    users: [],

    // NOVO: Flags para controlar o cache de dados
    areProductsLoaded: false,
    areServicesLoaded: false,
    areProfessionalsLoaded: false,

    // Variáveis que controlam o estado da interface do utilizador (UI)
    currentWeekStart: new Date(),
    professionalColors: new Map(),
};

/**
 * Função auxiliar para definir os dados do estabelecimento de uma só vez.
 * @param {string} id - O ID do estabelecimento.
 * @param {string} name - O nome do estabelecimento.
 * @param {object|null} permissions - O objeto de permissões do usuário.
 */
export function setGlobalState(id, name, permissions = null) {
    state.establishmentId = id;
    state.establishmentName = name || 'Meu Painel';
    state.userPermissions = permissions;
    document.getElementById('panelEstablishmentName').textContent = state.establishmentName;
}
