// ui/financial.js
// Interface e componentes visuais da tela de financeiro

// CORREÇÃO: Caminho de importação para as Rotas e API (adicionado 'js/' ou ajustado o caminho relativo)
import * as FinancialRoutes from '../../routes/financial.js'; 
import * as FinancialAPI from '../api/financial.js'; 

// ==================== ELEMENTOS DOM ====================

const SELECTORS = {
  container: '#financial-container',
  dashboard: '#dashboard-financeiro',
  contasReceber: '#contas-receber',
  contasPagar: '#contas-pagar',
  modal: '#financial-modal',
  tabelas: {
    receber: '#tabela-contas-receber',
    pagar: '#tabela-contas-pagar'
  },
  formularios: {
    novaReceber: '#form-nova-conta-receber',
    novaPagar: '#form-nova-conta-pagar',
    pagamento: '#form-pagamento'
  }
};

// ==================== INICIALIZAÇÃO ====================

/**
 * Inicializa os event listeners e componentes da UI
 */
export function inicializarUI() {
  // Botões de navegação
  document.querySelectorAll('[data-financial-nav]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tela = e.target.dataset.financialNav;
      FinancialRoutes.mostrarTela(tela);
    });
  });

  // Botões de ação
  setupEventListenersAcoes();
  
  console.log('UI de Financeiro inicializada');
}

/**
 * Setup dos event listeners para ações
 */
function setupEventListenersAcoes() {
  // Delegação de eventos para tabelas
  document.addEventListener('click', (e) => {
    // Registrar pagamento
    if (e.target.classList.contains('btn-registrar-pagamento')) {
      const contaId = e.target.dataset.contaId;
      const tipo = e.target.dataset.tipo;
      abrirModalPagamento(contaId, tipo);
    }

    // Editar conta
    if (e.target.classList.contains('btn-editar-conta')) {
      const contaId = e.target.dataset.contaId;
      const tipo = e.target.dataset.tipo;
      abrirModalEditar(contaId, tipo);
    }

    // Cancelar conta
    if (e.target.classList.contains('btn-cancelar-conta')) {
      const contaId = e.target.dataset.contaId;
      const tipo = e.target.dataset.tipo;
      abrirModalCancelar(contaId, tipo);
    }

    // Ver detalhes
    if (e.target.classList.contains('btn-detalhes-conta')) {
      const contaId = e.target.dataset.contaId;
      const tipo = e.target.dataset.tipo;
      abrirModalDetalhes(contaId, tipo);
    }
  });

  // Botões de criar nova conta
  document.getElementById('btn-nova-conta-receber')?.addEventListener('click', () => {
    abrirModalNovaConta('receber');
  });

  document.getElementById('btn-nova-conta-pagar')?.addEventListener('click', () => {
    abrirModalNovaConta('pagar');
  });

  // Formulários
  document.getElementById('form-nova-conta-receber')?.addEventListener('submit', (e) => {
    e.preventDefault();
    submitNovaContaReceber();
  });

  document.getElementById('form-nova-conta-pagar')?.addEventListener('submit', (e) => {
    e.preventDefault();
    submitNovaContaPagar();
  });

  document.getElementById('form-pagamento')?.addEventListener('submit', (e) => {
    e.preventDefault();
    submitRegistroPagamento();
  });

  document.getElementById('form-editar-conta')?.addEventListener('submit', (e) => {
    e.preventDefault();
    submitEdicaoConta();
  });

  // Fechar modal
  document.getElementById('btn-fechar-modal')?.addEventListener('click', () => {
    FinancialRoutes.fecharModal();
  });

  // Filtros
  document.getElementById('filtro-status')?.addEventListener('change', () => {
    aplicarFiltros();
  });

  document.getElementById('filtro-busca')?.addEventListener('input', () => {
    aplicarFiltros();
  });

  document.getElementById('btn-limpar-filtros')?.addEventListener('click', () => {
    FinancialRoutes.limparFiltros();
  });

  // Paginação
  document.querySelectorAll('[data-pagina]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pagina = parseInt(e.target.dataset.pagina);
      FinancialRoutes.irParaPagina(pagina);
    });
  });
}

// ==================== RENDERIZAÇÃO PRINCIPAL ====================

/**
 * Renderiza o dashboard financeiro
 */
export function renderizarDashboard() {
  const resumo = FinancialRoutes.obterResumo();
  
  if (!resumo) {
    console.warn('Resumo não disponível');
    return;
  }

  const html = `
    <div class="dashboard-financeiro">
      <h1>Dashboard Financeiro</h1>
      
      <!-- Cards de Resumo -->
      <div class="cards-resumo">
        <div class="card card-receber">
          <div class="card-header">
            <h3>A Receber</h3>
            <span class="icon">💰</span>
          </div>
          <div class="card-body">
            <div class="valor-grande">${FinancialAPI.formatarMoeda(resumo.contas_receber.total_pendente)}</div>
            <div class="card-stats">
              <p>Total: ${FinancialAPI.formatarMoeda(resumo.contas_receber.total_a_receber)}</p>
              <p>Recebido: ${FinancialAPI.formatarMoeda(resumo.contas_receber.total_recebido)}</p>
            </div>
          </div>
          <div class="card-footer">
            <span class="badge badge-abertos">${resumo.contas_receber.quantidade_abertos} abertos</span>
            <span class="badge badge-atrasados">${resumo.contas_receber.quantidade_atrasados} atrasados</span>
          </div>
        </div>

        <div class="card card-pagar">
          <div class="card-header">
            <h3>A Pagar</h3>
            <span class="icon">💳</span>
          </div>
          <div class="card-body">
            <div class="valor-grande">${FinancialAPI.formatarMoeda(resumo.contas_pagar.total_pendente)}</div>
            <div class="card-stats">
              <p>Total: ${FinancialAPI.formatarMoeda(resumo.contas_pagar.total_a_pagar)}</p>
              <p>Pagos: ${FinancialAPI.formatarMoeda(resumo.contas_pagar.total_pagos)}</p>
            </div>
          </div>
          <div class="card-footer">
            <span class="badge badge-abertos">${resumo.contas_pagar.quantidade_abertos} abertos</span>
            <span class="badge badge-atrasados">${resumo.contas_pagar.quantidade_atrasados} atrasados</span>
          </div>
        </div>

        <div class="card card-saldo">
          <div class="card-header">
            <h3>Saldo Líquido</h3>
            <span class="icon">📊</span>
          </div>
          <div class="card-body">
            <div class="valor-grande ${resumo.resumo_geral.saldo_liquido >= 0 ? 'positivo' : 'negativo'}">
              ${FinancialAPI.formatarMoeda(resumo.resumo_geral.saldo_liquido)}
            </div>
            <div class="card-stats">
              <p>Taxa de Inadimplência: ${resumo.resumo_geral.taxa_inadimplencia.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Vencimentos Próximos -->
      <div class="container-vencimentos">
        <div class="vencimentos-receber">
          <h3>Próximos Vencimentos - A Receber</h3>
          ${renderizarVencimentosProximos(resumo.contas_receber.vencimentos_proximamente, 'receber')}
        </div>

        <div class="vencimentos-pagar">
          <h3>Próximos Vencimentos - A Pagar</h3>
          ${renderizarVencimentosProximos(resumo.contas_pagar.vencimentos_proximamente, 'pagar')}
        </div>
      </div>

      <!-- Botões de Ação -->
      <div class="container-acoes">
        <button class="btn btn-primario" data-financial-nav="receber">
          Ver Contas a Receber
        </button>
        <button class="btn btn-primario" data-financial-nav="pagar">
          Ver Contas a Pagar
        </button>
      </div>
    </div>
  `;

  const container = document.querySelector(SELECTORS.container);
  if (container) {
    container.innerHTML = html;
  }
}

/**
 * Renderiza tabela de contas a receber
 */
export function renderizarContasReceber() {
  const contas = FinancialRoutes.obterContasAtualPage();
  const infoPaginacao = FinancialRoutes.obterInfoPaginacao();

  const html = `
    <div class="contas-view">
      <div class="header-view">
        <h1>Contas a Receber</h1>
        <button class="btn btn-primario" id="btn-nova-conta-receber">
          + Nova Conta
        </button>
      </div>

      <!-- Filtros -->
      ${renderizarFiltros('receber')}

      <!-- Tabela -->
      <div class="tabela-container">
        <table class="tabela-contas" id="tabela-contas-receber">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Descrição</th>
              <th>Vencimento</th>
              <th>Valor Total</th>
              <th>Pendente</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${contas.map(conta => renderizarLinhaConta(conta, 'receber')).join('')}
          </tbody>
        </table>
      </div>

      <!-- Paginação -->
      ${renderizarPaginacao(infoPaginacao)}
    </div>
  `;

  const container = document.querySelector(SELECTORS.container);
  if (container) {
    container.innerHTML = html;
    setupEventListenersAcoes();
  }
}

/**
 * Renderiza tabela de contas a pagar
 */
export function renderizarContasPagar() {
  const contas = FinancialRoutes.obterContasAtualPage();
  const infoPaginacao = FinancialRoutes.obterInfoPaginacao();

  const html = `
    <div class="contas-view">
      <div class="header-view">
        <h1>Contas a Pagar</h1>
        <button class="btn btn-primario" id="btn-nova-conta-pagar">
          + Nova Conta
        </button>
      </div>

      <!-- Filtros -->
      ${renderizarFiltros('pagar')}

      <!-- Tabela -->
      <div class="tabela-container">
        <table class="tabela-contas" id="tabela-contas-pagar">
          <thead>
            <tr>
              <th>Fornecedor</th>
              <th>Descrição</th>
              <th>Vencimento</th>
              <th>Valor Total</th>
              <th>Pendente</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${contas.map(conta => renderizarLinhaConta(conta, 'pagar')).join('')}
          </tbody>
        </table>
      </div>

      <!-- Paginação -->
      ${renderizarPaginacao(infoPaginacao)}
    </div>
  `;

  const container = document.querySelector(SELECTORS.container);
  if (container) {
    container.innerHTML = html;
    setupEventListenersAcoes();
  }
}

// ==================== COMPONENTES REUTILIZÁVEIS ====================

/**
 * Renderiza uma linha da tabela
 */
function renderizarLinhaConta(conta, tipo) {
  const dataVencimento = conta.data_vencimento;
  const hoje = new Date().getTime();
  
  // Calcula dias atrasados apenas se o status for 'atrasado'
  let diasAtraso = 0;
  if (conta.status === 'atrasado') {
      diasAtraso = Math.floor((hoje - dataVencimento) / (24 * 60 * 60 * 1000));
  }

  const statusClass = FinancialAPI.obterCorStatus(conta.status);
  const nomeParty = tipo === 'receber' ? conta.cliente : conta.fornecedor;

  return `
    <tr>
      <td class="nome-party">${nomeParty}</td>
      <td class="descricao">${conta.descricao}</td>
      <td class="data">${FinancialAPI.formatarData(dataVencimento)}</td>
      <td class="valor">${FinancialAPI.formatarMoeda(conta.valor_total)}</td>
      <td class="valor pendente">${FinancialAPI.formatarMoeda(conta.valor_pendente)}</td>
      <td>
        <span class="badge ${statusClass}">
          ${FinancialAPI.obterLabelStatus(conta.status)}
          ${diasAtraso > 0 ? ` (${diasAtraso}d)` : ''}
        </span>
      </td>
      <td class="acoes">
        <button class="btn-icone btn-detalhes-conta" data-conta-id="${conta.id}" data-tipo="${tipo}" title="Detalhes">👁️</button>
        <button class="btn-icone btn-registrar-pagamento" data-conta-id="${conta.id}" data-tipo="${tipo}" title="Registrar Pagamento">💵</button>
        <button class="btn-icone btn-editar-conta" data-conta-id="${conta.id}" data-tipo="${tipo}" title="Editar">✏️</button>
        <button class="btn-icone btn-cancelar-conta" data-conta-id="${conta.id}" data-tipo="${tipo}" title="Cancelar">🗑️</button>
      </td>
    </tr>
  `;
}

/**
 * Renderiza filtros
 */
function renderizarFiltros(tipo) {
  return `
    <div class="filtros-container">
      <div class="filtro-group">
        <input 
          type="text" 
          id="filtro-busca" 
          class="filtro-input" 
          placeholder="Buscar por ${tipo === 'receber' ? 'cliente' : 'fornecedor'}..."
        >
      </div>
      <div class="filtro-group">
        <select id="filtro-status" class="filtro-select">
          <option value="">Todos os Status</option>
          <option value="aberto">Aberto</option>
          <option value="parcialmente_pago">Parcialmente Pago</option>
          <option value="pago">Pago</option>
          <option value="atrasado">Atrasado</option>
        </select>
      </div>
      <button class="btn btn-secundario" id="btn-limpar-filtros">
        Limpar Filtros
      </button>
    </div>
  `;
}

/**
 * Renderiza paginação
 */
function renderizarPaginacao(infoPaginacao) {
  if (infoPaginacao.total_paginas <= 1) {
    return '';
  }

  let paginasHTML = '';
  for (let i = 1; i <= infoPaginacao.total_paginas; i++) {
    const ativo = i === infoPaginacao.pagina_atual ? 'ativo' : '';
    paginasHTML += `
      <button class="btn-pagina ${ativo}" data-pagina="${i}">
        ${i}
      </button>
    `;
  }

  return `
    <div class="paginacao">
      <span>Página ${infoPaginacao.pagina_atual} de ${infoPaginacao.total_paginas}</span>
      <div class="botoes-pagina">
        ${paginasHTML}
      </div>
    </div>
  `;
}

/**
 * Renderiza vencimentos próximos
 */
function renderizarVencimentosProximos(vencimentos, tipo) {
  if (vencimentos.length === 0) {
    return '<p class="info-vazio">Nenhum vencimento próximo</p>';
  }

  return `
    <ul class="lista-vencimentos">
      ${vencimentos.map(v => `
        <li class="item-vencimento">
          <span class="nome">${v[tipo === 'receber' ? 'cliente' : 'fornecedor']}</span>
          <span class="valor">${FinancialAPI.formatarMoeda(v.valor)}</span>
          <span class="dias ${v.dias_faltando <= 3 ? 'urgente' : ''}">${v.dias_faltando}d</span>
        </li>
      `).join('')}
    </ul>
  `;
}

// ==================== MODAIS ====================

/**
 * Abre modal para nova conta
 */
function abrirModalNovaConta(tipo) {
  const titulo = tipo === 'receber' ? 'Nova Conta a Receber' : 'Nova Conta a Pagar';
  const formulario = tipo === 'receber' 
    ? renderizarFormularioNovaContaReceber()
    : renderizarFormularioNovaContaPagar();

  FinancialRoutes.abrirModal('novo', { tipo: tipo }); // CORREÇÃO: Registra no estado da rota
  renderizarModal(titulo, formulario, 'novo');
}

/**
 * Abre modal para registrar pagamento
 */
async function abrirModalPagamento(contaId, tipo) {
  const conta = tipo === 'receber'
    ? await FinancialAPI.obterContaReceber(FinancialRoutes.obterEstado().estabelecimento_id, contaId)
    : await FinancialAPI.obterContaPagar(FinancialRoutes.obterEstado().estabelecimento_id, contaId);

  if (!conta) {
    mostrarErro('Conta não encontrada');
    return;
  }

  FinancialRoutes.abrirModal('pagamento', conta); // CORREÇÃO: Registra no estado da rota

  const formulario = renderizarFormularioPagamento(conta, tipo);
  renderizarModal('Registrar Pagamento', formulario, 'pagamento');
}

/**
 * Abre modal para editar conta
 */
async function abrirModalEditar(contaId, tipo) {
  const conta = tipo === 'receber'
    ? await FinancialAPI.obterContaReceber(FinancialRoutes.obterEstado().estabelecimento_id, contaId)
    : await FinancialAPI.obterContaPagar(FinancialRoutes.obterEstado().estabelecimento_id, contaId);

  if (!conta) {
    mostrarErro('Conta não encontrada');
    return;
  }

  FinancialRoutes.abrirModal('editar', conta); // CORREÇÃO: Registra no estado da rota

  const formulario = renderizarFormularioEditarConta(conta, tipo);
  renderizarModal('Editar Conta', formulario, 'editar');
}

/**
 * Abre modal para cancelar conta
 */
function abrirModalCancelar(contaId, tipo) {
  const html = `
    <div class="modal-cancelar">
      <p>Tem certeza que deseja cancelar esta conta?</p>
      <textarea 
        id="motivo-cancelamento" 
        placeholder="Motivo do cancelamento..."
        style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;"
      ></textarea>
      <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 15px;">
        <button class="btn btn-secundario" onclick="document.getElementById('financial-modal').style.display='none'">
          Cancelar
        </button>
        <button class="btn btn-perigo" id="btn-confirmar-cancelamento">
          Confirmar Cancelamento
        </button>
      </div>
    </div>
  `;

  FinancialRoutes.abrirModal('cancelar', { id: contaId, tipo: tipo }); // CORREÇÃO: Registra no estado da rota

  renderizarModal('Cancelar Conta', html, 'cancelar');

  document.getElementById('btn-confirmar-cancelamento')?.addEventListener('click', async () => {
    const motivo = document.getElementById('motivo-cancelamento')?.value || 'Não informado';
    
    try {
      if (tipo === 'receber') {
        await FinancialRoutes.cancelarContaReceber(contaId, motivo);
      } else {
        await FinancialRoutes.cancelarContaPagar(contaId, motivo);
      }
    } catch (error) {
      console.error('Erro ao cancelar conta:', error);
    }
  });
}

/**
 * Abre modal de detalhes
 */
async function abrirModalDetalhes(contaId, tipo) {
  const conta = tipo === 'receber'
    ? await FinancialAPI.obterContaReceber(FinancialRoutes.obterEstado().estabelecimento_id, contaId)
    : await FinancialAPI.obterContaPagar(FinancialRoutes.obterEstado().estabelecimento_id, contaId);

  if (!conta) {
    mostrarErro('Conta não encontrada');
    return;
  }

  FinancialRoutes.abrirModal('detalhes', conta); // CORREÇÃO: Registra no estado da rota

  const html = renderizarDetalhesCompletos(conta, tipo);
  renderizarModal('Detalhes da Conta', html, 'detalhes');
}

/**
 * Renderiza modal genérico
 */
function renderizarModal(titulo, conteudo, tipo) {
  const html = `
    <div class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h2>${titulo}</h2>
          <button id="btn-fechar-modal" class="btn-fechar">✕</button>
        </div>
        <div class="modal-body">
          ${conteudo}
        </div>
      </div>
    </div>
  `;

  let modal = document.getElementById('financial-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'financial-modal';
    document.body.appendChild(modal);
  }

  modal.innerHTML = html;
  modal.style.display = 'flex';

  // Fechar ao clicar fora
  modal.querySelector('.modal-overlay')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      FinancialRoutes.fecharModal();
    }
  });

  document.getElementById('btn-fechar-modal')?.addEventListener('click', () => {
    FinancialRoutes.fecharModal();
  });
}

// ==================== FORMULÁRIOS ====================

function renderizarFormularioNovaContaReceber() {
  return `
    <form id="form-nova-conta-receber" class="form-financeiro">
      <div class="form-group">
        <label>Cliente</label>
        <input type="text" name="cliente" required placeholder="Nome do cliente">
      </div>
      <div class="form-group">
        <label>Descrição</label>
        <input type="text" name="descricao" required placeholder="Descrição da conta">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Valor</label>
          <input type="number" name="valor_total" required step="0.01" min="0" placeholder="0.00">
        </div>
        <div class="form-group">
          <label>Forma de Pagamento</label>
          <select name="forma_pagamento">
            <option value="dinheiro">Dinheiro</option>
            <option value="cartao_credito">Cartão de Crédito</option>
            <option value="cartao_debito">Cartão de Débito</option>
            <option value="boleto">Boleto</option>
            <option value="pix">PIX</option>
            <option value="transferencia">Transferência</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Data de Emissão</label>
          <input type="date" name="data_emissao">
        </div>
        <div class="form-group">
          <label>Data de Vencimento</label>
          <input type="date" name="data_vencimento" required>
        </div>
      </div>
      <div class="form-group">
        <label>Observações</label>
        <textarea name="observacoes" placeholder="Observações adicionais..."></textarea>
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-secundario" onclick="document.getElementById('financial-modal').style.display='none'">
          Cancelar
        </button>
        <button type="submit" class="btn btn-primario">
          Criar Conta
        </button>
      </div>
    </form>
  `;
}

function renderizarFormularioNovaContaPagar() {
  return `
    <form id="form-nova-conta-pagar" class="form-financeiro">
      <div class="form-group">
        <label>Fornecedor</label>
        <input type="text" name="fornecedor" required placeholder="Nome do fornecedor">
      </div>
      <div class="form-group">
        <label>Descrição</label>
        <input type="text" name="descricao" required placeholder="Descrição da conta">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Valor</label>
          <input type="number" name="valor_total" required step="0.01" min="0" placeholder="0.00">
        </div>
        <div class="form-group">
          <label>Categoria</label>
          <select name="categoria">
            <option value="aluguel">Aluguel</option>
            <option value="servicos">Serviços</option>
            <option value="produtos">Produtos</option>
            <option value="utilidades">Utilidades</option>
            <option value="outros">Outros</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Data de Emissão</label>
          <input type="date" name="data_emissao">
        </div>
        <div class="form-group">
          <label>Data de Vencimento</label>
          <input type="date" name="data_vencimento" required>
        </div>
      </div>
      <div class="form-group">
        <label>Observações</label>
        <textarea name="observacoes" placeholder="Observações adicionais..."></textarea>
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-secundario" onclick="document.getElementById('financial-modal').style.display='none'">
          Cancelar
        </button>
        <button type="submit" class="btn btn-primario">
          Criar Conta
        </button>
      </div>
    </form>
  `;
}

function renderizarFormularioPagamento(conta, tipo) {
  return `
    <form id="form-pagamento" class="form-financeiro">
      <div class="info-conta">
        <p><strong>${tipo === 'receber' ? 'Cliente' : 'Fornecedor'}:</strong> ${tipo === 'receber' ? conta.cliente : conta.fornecedor}</p>
        <p><strong>Valor Total:</strong> ${FinancialAPI.formatarMoeda(conta.valor_total)}</p>
        <p><strong>Já Pago:</strong> ${FinancialAPI.formatarMoeda(conta.valor_pago)}</p>
        <p><strong>Pendente:</strong> ${FinancialAPI.formatarMoeda(conta.valor_pendente)}</p>
      </div>
      
      <div class="form-group">
        <label>Valor do Pagamento</label>
        <input type="number" name="valor" required step="0.01" min="0" max="${conta.valor_pendente}" placeholder="0.00" value="${conta.valor_pendente}">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Data do Pagamento</label>
          <input type="date" name="data">
        </div>
        <div class="form-group">
          <label>Forma de Pagamento</label>
          <select name="forma_pagamento">
            <option value="dinheiro">Dinheiro</option>
            <option value="cartao_credito">Cartão de Crédito</option>
            <option value="cartao_debito">Cartão de Débito</option>
            <option value="boleto">Boleto</option>
            <option value="pix">PIX</option>
            <option value="transferencia">Transferência</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>Referência (Nº de comprovante)</label>
        <input type="text" name="referencia" placeholder="Ex: TRF123456789">
      </div>
      <div class="form-group">
        <label>Observação</label>
        <textarea name="observacao" placeholder="Adicione uma observação..."></textarea>
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-secundario" onclick="document.getElementById('financial-modal').style.display='none'">
          Cancelar
        </button>
        <button type="submit" class="btn btn-primario">
          Registrar Pagamento
        </button>
      </div>
    </form>
  `;
}

function renderizarFormularioEditarConta(conta, tipo) {
  const eh_receber = tipo === 'receber';
  
  // Converte o timestamp de volta para formato YYYY-MM-DD para preencher o input type="date"
  const dataEmissaoString = conta.data_emissao ? new Date(conta.data_emissao).toISOString().split('T')[0] : '';
  const dataVencimentoString = conta.data_vencimento ? new Date(conta.data_vencimento).toISOString().split('T')[0] : '';

  return `
    <form id="form-editar-conta" class="form-financeiro">
      <div class="form-group">
        <label>${eh_receber ? 'Cliente' : 'Fornecedor'}</label>
        <input type="text" name="nome" value="${eh_receber ? conta.cliente : conta.fornecedor}" required>
      </div>
      <div class="form-group">
        <label>Descrição</label>
        <input type="text" name="descricao" value="${conta.descricao}" required>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Valor</label>
          <input type="number" name="valor_total" step="0.01" min="0" value="${conta.valor_total}" required>
        </div>
        <div class="form-group">
          <label>${eh_receber ? 'Forma de Pagamento' : 'Categoria'}</label>
          <select name="campo_adicional">
            ${eh_receber ? `
              <option value="dinheiro" ${conta.forma_pagamento === 'dinheiro' ? 'selected' : ''}>Dinheiro</option>
              <option value="cartao_credito" ${conta.forma_pagamento === 'cartao_credito' ? 'selected' : ''}>Cartão de Crédito</option>
              <option value="cartao_debito" ${conta.forma_pagamento === 'cartao_debito' ? 'selected' : ''}>Cartão de Débito</option>
              <option value="boleto" ${conta.forma_pagamento === 'boleto' ? 'selected' : ''}>Boleto</option>
              <option value="pix" ${conta.forma_pagamento === 'pix' ? 'selected' : ''}>PIX</option>
              <option value="transferencia" ${conta.forma_pagamento === 'transferencia' ? 'selected' : ''}>Transferência</option>
            ` : `
              <option value="aluguel" ${conta.categoria === 'aluguel' ? 'selected' : ''}>Aluguel</option>
              <option value="servicos" ${conta.categoria === 'servicos' ? 'selected' : ''}>Serviços</option>
              <option value="produtos" ${conta.categoria === 'produtos' ? 'selected' : ''}>Produtos</option>
              <option value="utilidades" ${conta.categoria === 'utilidades' ? 'selected' : ''}>Utilidades</option>
              <option value="outros" ${conta.categoria === 'outros' ? 'selected' : ''}>Outros</option>
            `}
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Data de Emissão</label>
          <input type="date" name="data_emissao" value="${dataEmissaoString}">
        </div>
        <div class="form-group">
          <label>Data de Vencimento</label>
          <input type="date" name="data_vencimento" value="${dataVencimentoString}" required>
        </div>
      </div>
      <div class="form-group">
        <label>Observações</label>
        <textarea name="observacoes">${conta.observacoes || ''}</textarea>
      </div>
      <input type="hidden" name="conta_id" value="${conta.id}">
      <input type="hidden" name="tipo" value="${tipo}">
      <div class="form-actions">
        <button type="button" class="btn btn-secundario" onclick="document.getElementById('financial-modal').style.display='none'">
          Cancelar
        </button>
        <button type="submit" class="btn btn-primario">
          Atualizar Conta
        </button>
      </div>
    </form>
  `;
}

function renderizarDetalhesCompletos(conta, tipo) {
  const eh_receber = tipo === 'receber';
  const dataAgora = new Date().getTime();
  let diasAtraso = 0;
  
  if (conta.status === 'atrasado') {
    diasAtraso = Math.floor((dataAgora - conta.data_vencimento) / (24 * 60 * 60 * 1000));
  }
  
  let pagamentosHTML = '';
  if (conta.pagamentos && Object.keys(conta.pagamentos).length > 0) {
    pagamentosHTML = `
      <div class="detalhes-pagamentos">
        <h4>Histórico de Pagamentos</h4>
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Valor</th>
              <th>Forma</th>
              <th>Referência</th>
            </tr>
          </thead>
          <tbody>
            ${Object.values(conta.pagamentos).map(pag => `
              <tr>
                <td>${FinancialAPI.formatarData(pag.data)}</td>
                <td>${FinancialAPI.formatarMoeda(pag.valor)}</td>
                <td>${pag.forma_pagamento}</td>
                <td>${pag.referencia || '-'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  return `
    <div class="detalhes-conta">
      <div class="detalhes-grid">
        <div class="detalhe-item">
          <label>Entidade</label>
          <p>${eh_receber ? conta.cliente : conta.fornecedor}</p>
        </div>
        <div class="detalhe-item">
          <label>Descrição</label>
          <p>${conta.descricao}</p>
        </div>
        <div class="detalhe-item">
          <label>Status</label>
          <p><span class="badge ${FinancialAPI.obterCorStatus(conta.status)}">${FinancialAPI.obterLabelStatus(conta.status)}</span></p>
        </div>
        <div class="detalhe-item">
          <label>Data de Emissão</label>
          <p>${FinancialAPI.formatarData(conta.data_emissao)}</p>
        </div>
        <div class="detalhe-item">
          <label>Data de Vencimento</label>
          <p>${FinancialAPI.formatarData(conta.data_vencimento)} ${diasAtraso > 0 ? `<span style="color: #d32f2f;">(${diasAtraso} dias atrasado)</span>` : ''}</p>
        </div>
        <div class="detalhe-item">
          <label>Valor Total</label>
          <p>${FinancialAPI.formatarMoeda(conta.valor_total)}</p>
        </div>
        <div class="detalhe-item">
          <label>Já Pago</label>
          <p>${FinancialAPI.formatarMoeda(conta.valor_pago)}</p>
        </div>
        <div class="detalhe-item">
          <label>Pendente</label>
          <p style="color: #d32f2f; font-weight: bold;">${FinancialAPI.formatarMoeda(conta.valor_pendente)}</p>
        </div>
        <div class="detalhe-item">
          <label>${eh_receber ? 'Forma de Pagamento Esperada' : 'Categoria'}</label>
          <p>${eh_receber ? conta.forma_pagamento : conta.categoria}</p>
        </div>
      </div>

      ${conta.observacoes ? `
        <div class="detalhes-observacoes">
          <h4>Observações</h4>
          <p>${conta.observacoes}</p>
        </div>
      ` : ''}

      ${pagamentosHTML}
    </div>
  `;
}

// ==================== PROCESSAMENTO DE FORMULÁRIOS ====================

async function submitNovaContaReceber() {
  const form = document.getElementById('form-nova-conta-receber');
  const formData = new FormData(form);
  
  const dados = {
    cliente: formData.get('cliente'),
    descricao: formData.get('descricao'),
    valor_total: formData.get('valor_total'),
    forma_pagamento: formData.get('forma_pagamento'),
    data_emissao: formData.get('data_emissao') ? new Date(formData.get('data_emissao')).getTime() : undefined,
    data_vencimento: new Date(formData.get('data_vencimento')).getTime(),
    observacoes: formData.get('observacoes')
  };

  try {
    await FinancialRoutes.criarNovaContaReceber(dados);
  } catch (error) {
    mostrarErro('Erro ao criar conta');
  }
}

async function submitNovaContaPagar() {
  const form = document.getElementById('form-nova-conta-pagar');
  const formData = new FormData(form);
  
  const dados = {
    fornecedor: formData.get('fornecedor'),
    descricao: formData.get('descricao'),
    valor_total: formData.get('valor_total'),
    categoria: formData.get('categoria'),
    data_emissao: formData.get('data_emissao') ? new Date(formData.get('data_emissao')).getTime() : undefined,
    data_vencimento: new Date(formData.get('data_vencimento')).getTime(),
    observacoes: formData.get('observacoes')
  };

  try {
    await FinancialRoutes.criarNovaContaPagar(dados);
  } catch (error) {
    mostrarErro('Erro ao criar conta');
  }
}

async function submitRegistroPagamento() {
  const form = document.getElementById('form-pagamento');
  const formData = new FormData(form);
  const estado = FinancialRoutes.obterEstado();
  
  // CORREÇÃO: Checagem de segurança para evitar erro fatal (conta_selecionada é nulo)
  if (!estado.conta_selecionada || !estado.conta_selecionada.id) {
      mostrarErro('Erro: Nenhuma conta selecionada para pagamento.');
      FinancialRoutes.fecharModal();
      return;
  }

  const pagamento = {
    valor: parseFloat(formData.get('valor')),
    data: formData.get('data') ? new Date(formData.get('data')).getTime() : undefined,
    forma_pagamento: formData.get('forma_pagamento'),
    referencia: formData.get('referencia'),
    observacao: formData.get('observacao')
  };

  try {
    if (estado.filtros_ativos.tipo === 'receber') {
      await FinancialRoutes.registrarPagamentoReceber(estado.conta_selecionada.id, pagamento);
    } else {
      await FinancialRoutes.registrarPagamentoPagar(estado.conta_selecionada.id, pagamento);
    }
  } catch (error) {
    mostrarErro('Erro ao registrar pagamento');
  }
}

async function submitEdicaoConta() {
  const form = document.getElementById('form-editar-conta');
  const formData = new FormData(form);
  const tipo = formData.get('tipo');
  const contaId = formData.get('conta_id');
  
  // Converte a string de data (YYYY-MM-DD) para timestamp
  const dataVencimentoTimestamp = formData.get('data_vencimento') 
    ? new Date(formData.get('data_vencimento')).getTime() 
    : undefined;
  const dataEmissaoTimestamp = formData.get('data_emissao') 
    ? new Date(formData.get('data_emissao')).getTime() 
    : undefined;

  const dados = {
    [tipo === 'receber' ? 'cliente' : 'fornecedor']: formData.get('nome'),
    descricao: formData.get('descricao'),
    valor_total: parseFloat(formData.get('valor_total')),
    data_vencimento: dataVencimentoTimestamp,
    data_emissao: dataEmissaoTimestamp,
    observacoes: formData.get('observacoes')
  };

  if (tipo === 'receber') {
    dados.forma_pagamento = formData.get('campo_adicional');
  } else {
    dados.categoria = formData.get('campo_adicional');
  }

  try {
    if (tipo === 'receber') {
      await FinancialRoutes.atualizarContaReceber(contaId, dados);
    } else {
      await FinancialRoutes.atualizarContaPagar(contaId, dados);
    }
  } catch (error) {
    mostrarErro('Erro ao atualizar conta');
  }
}

function aplicarFiltros() {
  const filtroStatus = document.getElementById('filtro-status')?.value || null;
  const filtroBusca = document.getElementById('filtro-busca')?.value || '';

  FinancialRoutes.aplicarFiltros({
    status: filtroStatus,
    nome: filtroBusca
  });
}

// ==================== NOTIFICAÇÕES ====================

function mostrarSucesso(mensagem) {
  console.log('✓', mensagem);
  // TODO: Implementar toast visual
}

function mostrarErro(mensagem) {
  console.error('✗', mensagem);
  // TODO: Implementar toast visual
}

export { mostrarErro, mostrarSucesso };