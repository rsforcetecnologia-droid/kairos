// api/financial.js
// Funções de integração com Firebase para Contas a Receber e Contas a Pagar

import { 
  ref, 
  child, 
  get, 
  set, 
  update, 
  remove, 
  push,
  query,
  where,
  orderByChild,
  limitToLast,
  startAt,
  endAt,
  onValue,
  off
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js';

import { database, auth } from './firebase-config.js';

const FINANCIAL_TYPES = {
  RECEBER: 'contas_receber',
  PAGAR: 'contas_pagar',
  CATEGORIES: 'categorias_despesa'
};

// ==================== CONTAS A RECEBER ====================

/**
 * Cria uma nova conta a receber
 * @param {Object} data - Dados da conta { cliente, cliente_id, descricao, valor_total, data_vencimento, ... }
 * @returns {Promise<string>} ID da conta criada
 */
export async function criarContaReceber(data, establishmentId) {
  try {
    const agora = new Date();
    const contaData = {
      cliente: data.cliente,
      cliente_id: data.cliente_id || null,
      descricao: data.descricao,
      valor_total: parseFloat(data.valor_total),
      valor_pago: 0,
      valor_pendente: parseFloat(data.valor_total),
      data_emissao: data.data_emissao || agora.getTime(),
      data_vencimento: data.data_vencimento,
      status: 'aberto',
      forma_pagamento: data.forma_pagamento || 'não_especificado',
      observacoes: data.observacoes || '',
      pagamentos: {},
      criado_em: agora.getTime(),
      criado_por: auth.currentUser?.uid || 'sistema',
      atualizado_em: agora.getTime(),
      deletado: false
    };

    const financialRef = ref(database, `financial/${establishmentId}/${FINANCIAL_TYPES.RECEBER}`);
    const newContaRef = push(financialRef);
    await set(newContaRef, contaData);
    
    return newContaRef.key;
  } catch (error) {
    console.error('Erro ao criar conta a receber:', error);
    throw error;
  }
}

/**
 * Obtém todas as contas a receber com filtros opcionais
 * @param {string} establishmentId - ID do estabelecimento
 * @param {Object} filtros - Filtros { status, cliente, dataInicio, dataFim, valorMin, valorMax }
 * @returns {Promise<Array>} Array de contas
 */
export async function obterContasReceber(establishmentId, filtros = {}) {
  try {
    const financialRef = ref(database, `financial/${establishmentId}/${FINANCIAL_TYPES.RECEBER}`);
    const snapshot = await get(financialRef);
    
    if (!snapshot.exists()) return [];

    let contas = [];
    snapshot.forEach(child => {
      if (!child.val().deletado) {
        contas.push({
          id: child.key,
          ...child.val()
        });
      }
    });

    // Aplicar filtros
    contas = aplicarFiltrosFinanceiro(contas, filtros);
    
    // Ordenar por data de vencimento (próximas primeiro)
    contas.sort((a, b) => a.data_vencimento - b.data_vencimento);

    return contas;
  } catch (error) {
    console.error('Erro ao obter contas a receber:', error);
    throw error;
  }
}

/**
 * Obtém uma conta a receber específica
 * @param {string} establishmentId
 * @param {string} contaId
 * @returns {Promise<Object>}
 */
export async function obterContaReceber(establishmentId, contaId) {
  try {
    const contaRef = ref(database, `financial/${establishmentId}/${FINANCIAL_TYPES.RECEBER}/${contaId}`);
    const snapshot = await get(contaRef);
    
    if (!snapshot.exists()) return null;
    
    return {
      id: contaId,
      ...snapshot.val()
    };
  } catch (error) {
    console.error('Erro ao obter conta a receber:', error);
    throw error;
  }
}

/**
 * Atualiza uma conta a receber
 * @param {string} establishmentId
 * @param {string} contaId
 * @param {Object} dados - Dados a atualizar
 * @returns {Promise<void>}
 */
export async function atualizarContaReceber(establishmentId, contaId, dados) {
  try {
    const atualizacoes = {
      ...dados,
      atualizado_em: new Date().getTime()
    };

    const contaRef = ref(database, `financial/${establishmentId}/${FINANCIAL_TYPES.RECEBER}/${contaId}`);
    await update(contaRef, atualizacoes);
  } catch (error) {
    console.error('Erro ao atualizar conta a receber:', error);
    throw error;
  }
}

/**
 * Registra um pagamento em uma conta a receber
 * @param {string} establishmentId
 * @param {string} contaId
 * @param {Object} pagamento - { valor, data, forma_pagamento, referencia, observacao }
 * @returns {Promise<void>}
 */
export async function registrarPagamentoReceber(establishmentId, contaId, pagamento) {
  try {
    const conta = await obterContaReceber(establishmentId, contaId);
    if (!conta) throw new Error('Conta não encontrada');

    const novoValorPago = conta.valor_pago + pagamento.valor;
    const novoValorPendente = conta.valor_total - novoValorPago;
    let novoStatus = conta.status;

    if (novoValorPago >= conta.valor_total) {
      novoStatus = 'pago';
    } else if (novoValorPago > 0) {
      novoStatus = 'parcialmente_pago';
    }

    const pagamentoData = {
      id: push(ref(database)).key,
      data: pagamento.data || new Date().getTime(),
      valor: pagamento.valor,
      forma_pagamento: pagamento.forma_pagamento,
      referencia: pagamento.referencia || '',
      observacao: pagamento.observacao || '',
      registrado_em: new Date().getTime()
    };

    const contaRef = ref(database, `financial/${establishmentId}/${FINANCIAL_TYPES.RECEBER}/${contaId}`);
    await update(contaRef, {
      valor_pago: novoValorPago,
      valor_pendente: Math.max(0, novoValorPendente),
      status: novoStatus,
      [`pagamentos/${pagamentoData.id}`]: pagamentoData,
      atualizado_em: new Date().getTime()
    });
  } catch (error) {
    console.error('Erro ao registrar pagamento:', error);
    throw error;
  }
}

/**
 * Cancela uma conta a receber
 * @param {string} establishmentId
 * @param {string} contaId
 * @param {string} motivo
 * @returns {Promise<void>}
 */
export async function cancelarContaReceber(establishmentId, contaId, motivo) {
  try {
    const contaRef = ref(database, `financial/${establishmentId}/${FINANCIAL_TYPES.RECEBER}/${contaId}`);
    await update(contaRef, {
      status: 'cancelado',
      motivo_cancelamento: motivo,
      deletado: true,
      atualizado_em: new Date().getTime()
    });
  } catch (error) {
    console.error('Erro ao cancelar conta a receber:', error);
    throw error;
  }
}

// ==================== CONTAS A PAGAR ====================

/**
 * Cria uma nova conta a pagar
 * @param {Object} data - Dados da conta
 * @param {string} establishmentId
 * @returns {Promise<string>} ID da conta criada
 */
export async function criarContaPagar(data, establishmentId) {
  try {
    const agora = new Date();
    const contaData = {
      fornecedor: data.fornecedor,
      fornecedor_id: data.fornecedor_id || null,
      descricao: data.descricao,
      valor_total: parseFloat(data.valor_total),
      valor_pago: 0,
      valor_pendente: parseFloat(data.valor_total),
      data_emissao: data.data_emissao || agora.getTime(),
      data_vencimento: data.data_vencimento,
      status: 'aberto',
      categoria: data.categoria || 'outros',
      observacoes: data.observacoes || '',
      documento_url: data.documento_url || '',
      pagamentos: {},
      criado_em: agora.getTime(),
      criado_por: auth.currentUser?.uid || 'sistema',
      atualizado_em: agora.getTime(),
      deletado: false
    };

    const financialRef = ref(database, `financial/${establishmentId}/${FINANCIAL_TYPES.PAGAR}`);
    const newContaRef = push(financialRef);
    await set(newContaRef, contaData);
    
    return newContaRef.key;
  } catch (error) {
    console.error('Erro ao criar conta a pagar:', error);
    throw error;
  }
}

/**
 * Obtém todas as contas a pagar
 * @param {string} establishmentId
 * @param {Object} filtros
 * @returns {Promise<Array>}
 */
export async function obterContasPagar(establishmentId, filtros = {}) {
  try {
    const financialRef = ref(database, `financial/${establishmentId}/${FINANCIAL_TYPES.PAGAR}`);
    const snapshot = await get(financialRef);
    
    if (!snapshot.exists()) return [];

    let contas = [];
    snapshot.forEach(child => {
      if (!child.val().deletado) {
        contas.push({
          id: child.key,
          ...child.val()
        });
      }
    });

    contas = aplicarFiltrosFinanceiro(contas, filtros);
    contas.sort((a, b) => a.data_vencimento - b.data_vencimento);

    return contas;
  } catch (error) {
    console.error('Erro ao obter contas a pagar:', error);
    throw error;
  }
}

/**
 * Obtém uma conta a pagar específica
 * @param {string} establishmentId
 * @param {string} contaId
 * @returns {Promise<Object>}
 */
export async function obterContaPagar(establishmentId, contaId) {
  try {
    const contaRef = ref(database, `financial/${establishmentId}/${FINANCIAL_TYPES.PAGAR}/${contaId}`);
    const snapshot = await get(contaRef);
    
    if (!snapshot.exists()) return null;
    
    return {
      id: contaId,
      ...snapshot.val()
    };
  } catch (error) {
    console.error('Erro ao obter conta a pagar:', error);
    throw error;
  }
}

/**
 * Atualiza uma conta a pagar
 * @param {string} establishmentId
 * @param {string} contaId
 * @param {Object} dados
 * @returns {Promise<void>}
 */
export async function atualizarContaPagar(establishmentId, contaId, dados) {
  try {
    const atualizacoes = {
      ...dados,
      atualizado_em: new Date().getTime()
    };

    const contaRef = ref(database, `financial/${establishmentId}/${FINANCIAL_TYPES.PAGAR}/${contaId}`);
    await update(contaRef, atualizacoes);
  } catch (error) {
    console.error('Erro ao atualizar conta a pagar:', error);
    throw error;
  }
}

/**
 * Registra um pagamento em uma conta a pagar
 * @param {string} establishmentId
 * @param {string} contaId
 * @param {Object} pagamento
 * @returns {Promise<void>}
 */
export async function registrarPagamentoPagar(establishmentId, contaId, pagamento) {
  try {
    const conta = await obterContaPagar(establishmentId, contaId);
    if (!conta) throw new Error('Conta não encontrada');

    const novoValorPago = conta.valor_pago + pagamento.valor;
    const novoValorPendente = conta.valor_total - novoValorPago;
    let novoStatus = conta.status;

    if (novoValorPago >= conta.valor_total) {
      novoStatus = 'pago';
    } else if (novoValorPago > 0) {
      novoStatus = 'parcialmente_pago';
    }

    const pagamentoData = {
      id: push(ref(database)).key,
      data: pagamento.data || new Date().getTime(),
      valor: pagamento.valor,
      forma_pagamento: pagamento.forma_pagamento,
      referencia: pagamento.referencia || '',
      observacao: pagamento.observacao || '',
      registrado_em: new Date().getTime()
    };

    const contaRef = ref(database, `financial/${establishmentId}/${FINANCIAL_TYPES.PAGAR}/${contaId}`);
    await update(contaRef, {
      valor_pago: novoValorPago,
      valor_pendente: Math.max(0, novoValorPendente),
      status: novoStatus,
      [`pagamentos/${pagamentoData.id}`]: pagamentoData,
      atualizado_em: new Date().getTime()
    });
  } catch (error) {
    console.error('Erro ao registrar pagamento:', error);
    throw error;
  }
}

/**
 * Cancela uma conta a pagar
 * @param {string} establishmentId
 * @param {string} contaId
 * @param {string} motivo
 * @returns {Promise<void>}
 */
export async function cancelarContaPagar(establishmentId, contaId, motivo) {
  try {
    const contaRef = ref(database, `financial/${establishmentId}/${FINANCIAL_TYPES.PAGAR}/${contaId}`);
    await update(contaRef, {
      status: 'cancelado',
      motivo_cancelamento: motivo,
      deletado: true,
      atualizado_em: new Date().getTime()
    });
  } catch (error) {
    console.error('Erro ao cancelar conta a pagar:', error);
    throw error;
  }
}

// ==================== DASHBOARD / RESUMO ====================

/**
 * Obtém resumo financeiro do estabelecimento
 * @param {string} establishmentId
 * @returns {Promise<Object>} Resumo com totais e alertas
 */
export async function obterResumoFinanceiro(establishmentId) {
  try {
    const contas_receber = await obterContasReceber(establishmentId);
    const contas_pagar = await obterContasPagar(establishmentId);
    const agora = new Date().getTime();
    const diasAfrente = 7 * 24 * 60 * 60 * 1000; // 7 dias em ms

    const resumo = {
      contas_receber: {
        total_a_receber: 0,
        total_recebido: 0,
        total_pendente: 0,
        quantidade_abertos: 0,
        quantidade_atrasados: 0,
        quantidade_pagos: 0,
        vencimentos_proximamente: []
      },
      contas_pagar: {
        total_a_pagar: 0,
        total_pagos: 0,
        total_pendente: 0,
        quantidade_abertos: 0,
        quantidade_atrasados: 0,
        quantidade_pagos: 0,
        vencimentos_proximamente: []
      },
      resumo_geral: {
        saldo_liquido: 0,
        taxa_inadimplencia: 0
      }
    };

    // Processar contas a receber
    contas_receber.forEach(conta => {
      if (conta.status !== 'cancelado') {
        resumo.contas_receber.total_a_receber += conta.valor_total;
        resumo.contas_receber.total_recebido += conta.valor_pago;
        resumo.contas_receber.total_pendente += conta.valor_pendente;

        if (conta.status === 'aberto' || conta.status === 'parcialmente_pago') {
          resumo.contas_receber.quantidade_abertos++;

          if (conta.data_vencimento < agora) {
            resumo.contas_receber.quantidade_atrasados++;
          } else if (conta.data_vencimento <= agora + diasAfrente) {
            resumo.contas_receber.vencimentos_proximamente.push({
              id: conta.id,
              cliente: conta.cliente,
              valor: conta.valor_pendente,
              vencimento: conta.data_vencimento,
              dias_faltando: Math.ceil((conta.data_vencimento - agora) / (24 * 60 * 60 * 1000))
            });
          }
        } else if (conta.status === 'pago') {
          resumo.contas_receber.quantidade_pagos++;
        }
      }
    });

    // Processar contas a pagar
    contas_pagar.forEach(conta => {
      if (conta.status !== 'cancelado') {
        resumo.contas_pagar.total_a_pagar += conta.valor_total;
        resumo.contas_pagar.total_pagos += conta.valor_pago;
        resumo.contas_pagar.total_pendente += conta.valor_pendente;

        if (conta.status === 'aberto' || conta.status === 'parcialmente_pago') {
          resumo.contas_pagar.quantidade_abertos++;

          if (conta.data_vencimento < agora) {
            resumo.contas_pagar.quantidade_atrasados++;
          } else if (conta.data_vencimento <= agora + diasAfrente) {
            resumo.contas_pagar.vencimentos_proximamente.push({
              id: conta.id,
              fornecedor: conta.fornecedor,
              valor: conta.valor_pendente,
              vencimento: conta.data_vencimento,
              dias_faltando: Math.ceil((conta.data_vencimento - agora) / (24 * 60 * 60 * 1000))
            });
          }
        } else if (conta.status === 'pago') {
          resumo.contas_pagar.quantidade_pagos++;
        }
      }
    });

    // Calcular resumo geral
    resumo.resumo_geral.saldo_liquido = 
      resumo.contas_receber.total_pendente - resumo.contas_pagar.total_pendente;

    const totalReceber = resumo.contas_receber.total_a_receber || 1;
    resumo.resumo_geral.taxa_inadimplencia = 
      (resumo.contas_receber.quantidade_atrasados / (resumo.contas_receber.quantidade_abertos || 1)) * 100;

    return resumo;
  } catch (error) {
    console.error('Erro ao obter resumo financeiro:', error);
    throw error;
  }
}

// ==================== FUNÇÕES AUXILIARES ====================

/**
 * Aplica filtros ao array de contas
 * @param {Array} contas
 * @param {Object} filtros
 * @returns {Array}
 */
function aplicarFiltrosFinanceiro(contas, filtros) {
  return contas.filter(conta => {
    // Filtro por status
    if (filtros.status && conta.status !== filtros.status) {
      return false;
    }

    // Filtro por cliente/fornecedor
    if (filtros.nome) {
      const nome = (conta.cliente || conta.fornecedor || '').toLowerCase();
      if (!nome.includes(filtros.nome.toLowerCase())) {
        return false;
      }
    }

    // Filtro por data de vencimento
    if (filtros.dataInicio && conta.data_vencimento < filtros.dataInicio) {
      return false;
    }
    if (filtros.dataFim && conta.data_vencimento > filtros.dataFim) {
      return false;
    }

    // Filtro por valor
    if (filtros.valorMin && conta.valor_total < filtros.valorMin) {
      return false;
    }
    if (filtros.valorMax && conta.valor_total > filtros.valorMax) {
      return false;
    }

    // Filtro por categoria (para contas a pagar)
    if (filtros.categoria && conta.categoria !== filtros.categoria) {
      return false;
    }

    return true;
  });
}

/**
 * Formata uma data de timestamp para string legível
 * @param {number} timestamp
 * @returns {string}
 */
export function formatarData(timestamp) {
  const data = new Date(timestamp);
  return data.toLocaleDateString('pt-BR');
}

/**
 * Formata valor em moeda
 * @param {number} valor
 * @returns {string}
 */
export function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
}

/**
 * Obtém a cor do status
 * @param {string} status
 * @returns {string} Classe CSS
 */
export function obterCorStatus(status) {
  const cores = {
    'aberto': 'status-aberto',
    'parcialmente_pago': 'status-parcial',
    'pago': 'status-pago',
    'atrasado': 'status-atrasado',
    'cancelado': 'status-cancelado'
  };
  return cores[status] || 'status-neutro';
}

/**
 * Obtém label do status em português
 * @param {string} status
 * @returns {string}
 */
export function obterLabelStatus(status) {
  const labels = {
    'aberto': 'Aberto',
    'parcialmente_pago': 'Parcialmente Pago',
    'pago': 'Pago',
    'atrasado': 'Atrasado',
    'cancelado': 'Cancelado'
  };
  return labels[status] || status;
}
