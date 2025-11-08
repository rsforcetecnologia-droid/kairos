// routes/financial.js
// Roteamento e controle de fluxo da tela de financeiro

// CORREÇÃO: Caminho de importação para a API (adicionado 'js/')
import * as FinancialAPI from '../js/api/financial.js';
// CORREÇÃO: Importação do módulo de UI (necessário para as chamadas de renderização)
import * as FinancialUI from '../js/ui/financial.js'; 

let estadoAtual = {
  tela_ativa: 'dashboard', // dashboard, receber, pagar
  contas_receber: [],
  contas_pagar: [],
  resumo: null,
  filtros_ativos: {
    tipo: 'receber', // receber ou pagar
    status: null,
    nome: '',
    dataInicio: null,
    dataFim: null,
    valorMin: null,
    valorMax: null
  },
  pagina_atual: 1,
  itens_por_pagina: 10,
  estabelecimento_id: null,
  modal_aberto: null, // novo, editar, pagamento, detalhes
  conta_selecionada: null
};

// ==================== INICIALIZAÇÃO ====================

/**
 * Inicializa o módulo de financeiro
 * @param {string} establishmentId
 */
export async function inicializarFinanceiro(establishmentId) {
  estadoAtual.estabelecimento_id = establishmentId;
  
  try {
    // Carregar dados iniciais
    await carregarResumoFinanceiro();
    await carregarContasReceber();
    await carregarContasPagar();
    
    // Renderizar tela inicial (dashboard)
    mostrarTela('dashboard');
    
    console.log('Módulo de Financeiro inicializado com sucesso');
  } catch (error) {
    console.error('Erro ao inicializar financeiro:', error);
    throw error;
  }
}

// ==================== NAVEGAÇÃO DE TELAS ====================

/**
 * Exibe uma tela específica
 * @param {string} tela - dashboard, receber, pagar
 */
export async function mostrarTela(tela) {
  estadoAtual.tela_ativa = tela;
  
  // Limpar filtros e redefinir paginação
  estadoAtual.pagina_atual = 1;
  
  try {
    switch(tela) {
      case 'dashboard':
        await carregarResumoFinanceiro();
        FinancialUI.renderizarDashboard(); // CORREÇÃO: Chama a função da UI
        break;
        
      case 'receber':
        estadoAtual.filtros_ativos.tipo = 'receber';
        await carregarContasReceber();
        FinancialUI.renderizarContasReceber(); // CORREÇÃO: Chama a função da UI
        break;
        
      case 'pagar':
        estadoAtual.filtros_ativos.tipo = 'pagar';
        await carregarContasPagar();
        FinancialUI.renderizarContasPagar(); // CORREÇÃO: Chama a função da UI
        break;
    }
  } catch (error) {
    console.error(`Erro ao mostrar tela ${tela}:`, error);
    mostrarErro(`Erro ao carregar ${tela}`);
  }
}

// ==================== CARREGAMENTO DE DADOS ====================

/**
 * Carrega o resumo financeiro
 */
async function carregarResumoFinanceiro() {
  try {
    estadoAtual.resumo = await FinancialAPI.obterResumoFinanceiro(
      estadoAtual.estabelecimento_id
    );
    console.log('Resumo carregado:', estadoAtual.resumo);
  } catch (error) {
    console.error('Erro ao carregar resumo:', error);
    throw error;
  }
}

/**
 * Carrega contas a receber
 */
async function carregarContasReceber() {
  try {
    estadoAtual.contas_receber = await FinancialAPI.obterContasReceber(
      estadoAtual.estabelecimento_id,
      estadoAtual.filtros_ativos
    );
    console.log('Contas a receber carregadas:', estadoAtual.contas_receber);
  } catch (error) {
    console.error('Erro ao carregar contas a receber:', error);
    throw error;
  }
}

/**
 * Carrega contas a pagar
 */
async function carregarContasPagar() {
  try {
    estadoAtual.contas_pagar = await FinancialAPI.obterContasPagar(
      estadoAtual.estabelecimento_id,
      estadoAtual.filtros_ativos
    );
    console.log('Contas a pagar carregadas:', estadoAtual.contas_pagar);
  } catch (error) {
    console.error('Erro ao carregar contas a pagar:', error);
    throw error;
  }
}

// ==================== FILTROS E BUSCA ====================

/**
 * Aplica filtros e atualiza a visualização
 * @param {Object} filtros
 */
export async function aplicarFiltros(filtros) {
  estadoAtual.filtros_ativos = {
    ...estadoAtual.filtros_ativos,
    ...filtros
  };
  
  estadoAtual.pagina_atual = 1;
  
  try {
    if (estadoAtual.filtros_ativos.tipo === 'receber') {
      await carregarContasReceber();
      FinancialUI.renderizarContasReceber(); // CORREÇÃO: Chama a função da UI
    } else {
      await carregarContasPagar();
      FinancialUI.renderizarContasPagar(); // CORREÇÃO: Chama a função da UI
    }
  } catch (error) {
    console.error('Erro ao aplicar filtros:', error);
    mostrarErro('Erro ao aplicar filtros');
  }
}

/**
 * Limpa todos os filtros
 */
export async function limparFiltros() {
  estadoAtual.filtros_ativos = {
    tipo: estadoAtual.filtros_ativos.tipo,
    status: null,
    nome: '',
    dataInicio: null,
    dataFim: null,
    valorMin: null,
    valorMax: null
  };
  
  try {
    if (estadoAtual.filtros_ativos.tipo === 'receber') {
      await carregarContasReceber();
      FinancialUI.renderizarContasReceber(); // CORREÇÃO: Chama a função da UI
    } else {
      await carregarContasPagar();
      FinancialUI.renderizarContasPagar(); // CORREÇÃO: Chama a função da UI
    }
  } catch (error) {
    console.error('Erro ao limpar filtros:', error);
  }
}

// ==================== OPERAÇÕES COM CONTAS ====================

/**
 * Cria uma nova conta a receber
 * @param {Object} dados
 */
export async function criarNovaContaReceber(dados) {
  try {
    const contaId = await FinancialAPI.criarContaReceber(
      dados,
      estadoAtual.estabelecimento_id
    );
    
    await carregarResumoFinanceiro();
    await carregarContasReceber();
    
    fecharModal();
    mostrarSucesso('Conta a receber criada com sucesso');
    FinancialUI.renderizarContasReceber(); // CORREÇÃO: Chama a função da UI
    
    return contaId;
  } catch (error) {
    console.error('Erro ao criar conta a receber:', error);
    mostrarErro('Erro ao criar conta a receber');
    throw error;
  }
}

/**
 * Cria uma nova conta a pagar
 * @param {Object} dados
 */
export async function criarNovaContaPagar(dados) {
  try {
    const contaId = await FinancialAPI.criarContaPagar(
      dados,
      estadoAtual.estabelecimento_id
    );
    
    await carregarResumoFinanceiro();
    await carregarContasPagar();
    
    fecharModal();
    mostrarSucesso('Conta a pagar criada com sucesso');
    FinancialUI.renderizarContasPagar(); // CORREÇÃO: Chama a função da UI
    
    return contaId;
  } catch (error) {
    console.error('Erro ao criar conta a pagar:', error);
    mostrarErro('Erro ao criar conta a pagar');
    throw error;
  }
}

/**
 * Atualiza uma conta a receber
 * @param {string} contaId
 * @param {Object} dados
 */
export async function atualizarContaReceber(contaId, dados) {
  try {
    await FinancialAPI.atualizarContaReceber(
      estadoAtual.estabelecimento_id,
      contaId,
      dados
    );
    
    await carregarResumoFinanceiro();
    await carregarContasReceber();
    
    fecharModal();
    mostrarSucesso('Conta atualizada com sucesso');
    FinancialUI.renderizarContasReceber(); // CORREÇÃO: Chama a função da UI
  } catch (error) {
    console.error('Erro ao atualizar conta:', error);
    mostrarErro('Erro ao atualizar conta');
    throw error;
  }
}

/**
 * Atualiza uma conta a pagar
 * @param {string} contaId
 * @param {Object} dados
 */
export async function atualizarContaPagar(contaId, dados) {
  try {
    await FinancialAPI.atualizarContaPagar(
      estadoAtual.estabelecimento_id,
      contaId,
      dados
    );
    
    await carregarResumoFinanceiro();
    await carregarContasPagar();
    
    fecharModal();
    mostrarSucesso('Conta atualizada com sucesso');
    FinancialUI.renderizarContasPagar(); // CORREÇÃO: Chama a função da UI
  } catch (error) {
    console.error('Erro ao atualizar conta:', error);
    mostrarErro('Erro ao atualizar conta');
    throw error;
  }
}

/**
 * Registra um pagamento em conta a receber
 * @param {string} contaId
 * @param {Object} pagamento
 */
export async function registrarPagamentoReceber(contaId, pagamento) {
  try {
    await FinancialAPI.registrarPagamentoReceber(
      estadoAtual.estabelecimento_id,
      contaId,
      pagamento
    );
    
    await carregarResumoFinanceiro();
    await carregarContasReceber();
    
    fecharModal();
    mostrarSucesso('Pagamento registrado com sucesso');
    FinancialUI.renderizarContasReceber(); // CORREÇÃO: Chama a função da UI
  } catch (error) {
    console.error('Erro ao registrar pagamento:', error);
    mostrarErro('Erro ao registrar pagamento');
    throw error;
  }
}

/**
 * Registra um pagamento em conta a pagar
 * @param {string} contaId
 * @param {Object} pagamento
 */
export async function registrarPagamentoPagar(contaId, pagamento) {
  try {
    await FinancialAPI.registrarPagamentoPagar(
      estadoAtual.estabelecimento_id,
      contaId,
      pagamento
    );
    
    await carregarResumoFinanceiro();
    await carregarContasPagar();
    
    fecharModal();
    mostrarSucesso('Pagamento registrado com sucesso');
    FinancialUI.renderizarContasPagar(); // CORREÇÃO: Chama a função da UI
  } catch (error) {
    console.error('Erro ao registrar pagamento:', error);
    mostrarErro('Erro ao registrar pagamento');
    throw error;
  }
}

/**
 * Cancela uma conta a receber
 * @param {string} contaId
 * @param {string} motivo
 */
export async function cancelarContaReceber(contaId, motivo) {
  try {
    await FinancialAPI.cancelarContaReceber(
      estadoAtual.estabelecimento_id,
      contaId,
      motivo
    );
    
    await carregarResumoFinanceiro();
    await carregarContasReceber();
    
    fecharModal();
    mostrarSucesso('Conta cancelada com sucesso');
    FinancialUI.renderizarContasReceber(); // CORREÇÃO: Chama a função da UI
  } catch (error) {
    console.error('Erro ao cancelar conta:', error);
    mostrarErro('Erro ao cancelar conta');
    throw error;
  }
}

/**
 * Cancela uma conta a pagar
 * @param {string} contaId
 * @param {string} motivo
 */
export async function cancelarContaPagar(contaId, motivo) {
  try {
    await FinancialAPI.cancelarContaPagar(
      estadoAtual.estabelecimento_id,
      contaId,
      motivo
    );
    
    await carregarResumoFinanceiro();
    await carregarContasPagar();
    
    fecharModal();
    mostrarSucesso('Conta cancelada com sucesso');
    FinancialUI.renderizarContasPagar(); // CORREÇÃO: Chama a função da UI
  } catch (error) {
    console.error('Erro ao cancelar conta:', error);
    mostrarErro('Erro ao cancelar conta');
    throw error;
  }
}

// ==================== MODAIS ====================

/**
 * Abre um modal
 * @param {string} tipo - novo, editar, pagamento, detalhes
 * @param {Object} dados - Dados da conta (se aplicável)
 */
export function abrirModal(tipo, dados = null) {
  estadoAtual.modal_aberto = tipo;
  estadoAtual.conta_selecionada = dados;
  
  // O modal é renderizado pela camada de UI
  // FinancialUI.renderizarModal(tipo, dados); // A chamada será feita na UI
}

/**
 * Fecha modal aberto
 */
export function fecharModal() {
  estadoAtual.modal_aberto = null;
  estadoAtual.conta_selecionada = null;
  
  // Fechar modal na UI
  const modalElement = document.getElementById('financial-modal');
  if (modalElement) {
    modalElement.style.display = 'none';
  }
}

// ==================== PAGINAÇÃO ====================

/**
 * Muda de página
 * @param {number} pagina
 */
export async function irParaPagina(pagina) {
  estadoAtual.pagina_atual = pagina;
  
  if (estadoAtual.filtros_ativos.tipo === 'receber') {
    FinancialUI.renderizarContasReceber(); // CORREÇÃO: Chama a função da UI
  } else {
    FinancialUI.renderizarContasPagar(); // CORREÇÃO: Chama a função da UI
  }
}

/**
 * Obtém contas da página atual
 * @returns {Array}
 */
function obterContasPaginadas() {
  const contas = estadoAtual.filtros_ativos.tipo === 'receber' 
    ? estadoAtual.contas_receber 
    : estadoAtual.contas_pagar;
  
  const inicio = (estadoAtual.pagina_atual - 1) * estadoAtual.itens_por_pagina;
  const fim = inicio + estadoAtual.itens_por_pagina;
  
  return contas.slice(inicio, fim);
}

/**
 * Obtém total de páginas
 * @returns {number}
 */
function obterTotalPaginas() {
  const contas = estadoAtual.filtros_ativos.tipo === 'receber' 
    ? estadoAtual.contas_receber 
    : estadoAtual.contas_pagar;
  
  return Math.ceil(contas.length / estadoAtual.itens_por_pagina);
}

// ==================== RENDERIZAÇÃO (Delegado para ui/financial.js) ====================

// Funções de renderização delegadas corretamente para FinancialUI.
export function renderizarDashboard() {
  FinancialUI.renderizarDashboard();
}

export function renderizarContasReceber() {
  FinancialUI.renderizarContasReceber();
}

export function renderizarContasPagar() {
  FinancialUI.renderizarContasPagar();
}

export function renderizarModal(tipo, dados) {
  // Chamada de renderização removida, pois a UI se encarrega
  console.log(`Renderizar Modal: ${tipo}`);
}

// ==================== FEEDBACK AO USUÁRIO ====================

function mostrarSucesso(mensagem) {
  // Implementação em ui/financial.js ou no sistema de notificação global
  console.log('✓ Sucesso:', mensagem);
}

function mostrarErro(mensagem) {
  // Implementação em ui/financial.js ou no sistema de notificação global
  console.error('✗ Erro:', mensagem);
}

// ==================== GETTERS E SETTERS ====================

/**
 * Obtém estado atual
 */
export function obterEstado() {
  return { ...estadoAtual };
}

/**
 * Obtém contas da página atual
 */
export function obterContasAtualPage() {
  return obterContasPaginadas();
}

/**
 * Obtém informações de paginação
 */
export function obterInfoPaginacao() {
  const contas = estadoAtual.filtros_ativos.tipo === 'receber' 
    ? estadoAtual.contas_receber 
    : estadoAtual.contas_pagar;
  
  return {
    pagina_atual: estadoAtual.pagina_atual,
    total_paginas: obterTotalPaginas(),
    total_itens: contas.length,
    itens_por_pagina: estadoAtual.itens_por_pagina
  };
}

/**
 * Obtém resumo financeiro
 */
export function obterResumo() {
  return estadoAtual.resumo;
}

/**
 * Obtém filtros ativos
 */
export function obterFiltrosAtivos() {
  return { ...estadoAtual.filtros_ativos };
}