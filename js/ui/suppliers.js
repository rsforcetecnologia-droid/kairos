// js/ui/suppliers.js

// --- 1. IMPORTAÇÕES ---
import * as suppliersApi from '../api/suppliers.js';
import * as productsApi from '../api/products.js';
import { state } from '../state.js';
import { showNotification, showConfirmation, showGenericModal, closeModal } from '../components/modal.js';

// --- 2. VARIÁVEIS DO MÓDULO ---
const contentDiv = document.getElementById('content');
let pageEventListener = null;
let currentTab = 'list'; // 'list', 'purchases', 'history'

// Estado local para o fluxo de compras
let purchaseFlowState = {
    step: 1, // 1: Seleção/Cotação, 2: Pedidos Finais
    productsToBuy: [], 
    allSuppliers: [],
    finalOrders: {},
    isQuoteMode: false 
};

// --- 3. FUNÇÕES DE DADOS ---

async function fetchSuppliers() {
    if (currentTab === 'list') {
        renderListTab();
    } else if (currentTab === 'purchases') {
        purchaseFlowState.step = 1;
        renderPurchaseTab();
    } else if (currentTab === 'history') {
        renderHistoryTab();
    }
}

// --- Funções Auxiliares de Dados ---
async function loadListTabdata() {
    try {
        const suppliers = await suppliersApi.getAll();
        state.suppliers = suppliers || [];
        purchaseFlowState.allSuppliers = suppliers;
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

// --- AÇÕES CRUD FORNECEDORES ---

async function handleDeleteSupplier(id) {
    if (await showConfirmation("Excluir Fornecedor", "Tem a certeza? Isso removerá o vínculo com os produtos.")) {
        try {
            await suppliersApi.delete(id);
            showNotification("Sucesso", "Fornecedor excluído.", "success");
            renderListTab(); // Recarrega apenas a lista
        } catch (error) {
            showNotification("Erro", "Erro ao excluir: " + error.message, "error");
        }
    }
}

async function handleSupplierFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const id = form.querySelector('#supId').value;
    
    const data = {
        name: form.querySelector('#supName').value,
        contactName: form.querySelector('#supContact').value,
        email: form.querySelector('#supEmail').value,
        phone: form.querySelector('#supPhone').value,
        taxId: form.querySelector('#supTaxId').value
    };

    try {
        if (id) {
            await suppliersApi.update(id, data);
            showNotification("Sucesso", "Fornecedor atualizado!", "success");
        } else {
            await suppliersApi.create(data);
            showNotification("Sucesso", "Fornecedor criado!", "success");
        }
        closeModal('genericModal');
        renderListTab();
    } catch (error) {
        showNotification("Erro", "Erro ao salvar: " + error.message, "error");
    }
}

// --- 4. RENDERIZAÇÃO: ABA LISTA ---

async function renderListTab() {
    const listContainer = document.getElementById('suppliersList');
    if (!listContainer) return;
    listContainer.innerHTML = '<div class="loader mx-auto my-8"></div>';

    await loadListTabdata();

    const searchTerm = document.getElementById('supplierSearchInput')?.value.toLowerCase() || '';
    
    const filtered = state.suppliers.filter(s => 
        s.name.toLowerCase().includes(searchTerm) || 
        (s.contactName && s.contactName.toLowerCase().includes(searchTerm))
    );

    listContainer.innerHTML = '';

    if (filtered.length === 0) {
        listContainer.innerHTML = '<div class="text-center text-gray-500 py-8">Nenhum fornecedor encontrado.</div>';
        return;
    }

    listContainer.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';

    filtered.forEach(sup => {
        const card = document.createElement('div');
        card.className = 'bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow';
        const supString = JSON.stringify(sup).replace(/"/g, '&quot;');

        card.innerHTML = `
            <div>
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-bold text-gray-800 text-lg">${sup.name}</h3>
                    <span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">Fornecedor</span>
                </div>
                <div class="space-y-1 text-sm text-gray-600 mb-4">
                    <p class="flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> ${sup.contactName || 'Sem contato'}</p>
                    <p class="flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg> ${sup.phone || '-'}</p>
                    <p class="flex items-center gap-2 truncate"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> ${sup.email || '-'}</p>
                </div>
            </div>
            <div class="flex justify-end gap-2 border-t pt-3 mt-2">
                <button data-action="edit" data-supplier="${supString}" class="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded text-sm font-medium">Editar</button>
                <button data-action="delete" data-id="${sup.id}" class="text-red-600 hover:bg-red-50 px-3 py-1 rounded text-sm font-medium">Excluir</button>
            </div>
        `;
        listContainer.appendChild(card);
    });
}

// --- 5. RENDERIZAÇÃO: ABA COMPRAS (Cotação e Pedido) ---

async function renderPurchaseTab() {
    const container = document.getElementById('purchasesContainer');
    if (!container) return;

    if (purchaseFlowState.step === 1) {
        container.innerHTML = '<div class="loader mx-auto my-8"></div>';

        try {
            const [allProds, allSups] = await Promise.all([
                productsApi.getProducts(state.establishmentId),
                suppliersApi.getAll()
            ]);
            
            purchaseFlowState.allSuppliers = allSups || [];

            const toBuy = allProds.filter(p => {
                const current = parseInt(p.currentStock || 0);
                const min = parseInt(p.minStock || 0);
                const hasSuppliers = p.supplierIds && Array.isArray(p.supplierIds) && p.supplierIds.length > 0;
                return (current <= min) && hasSuppliers;
            });

            purchaseFlowState.productsToBuy = toBuy;

            if (toBuy.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-100">
                        <div class="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 class="text-lg font-bold text-gray-800">Tudo em ordem!</h3>
                        <p class="text-gray-600">Nenhum produto está abaixo do estoque mínimo com fornecedor vinculado.</p>
                        <button class="mt-4 text-indigo-600 hover:underline text-sm" onclick="window.location.reload()">Atualizar Dados</button>
                    </div>
                `;
                return;
            }

            // HTML Tabela
            let rowsHtml = toBuy.map(prod => {
                const min = parseInt(prod.minStock);
                const curr = parseInt(prod.currentStock);
                const suggestion = (min - curr) + 5; 
                const costPrice = parseFloat(prod.costPrice || 0);

                let optionsHtml = '';
                if (prod.supplierIds && prod.supplierIds.length > 0) {
                    prod.supplierIds.forEach((supId, index) => {
                        const s = purchaseFlowState.allSuppliers.find(x => x.id === supId);
                        if(s) {
                            const selected = index === 0 ? 'selected' : '';
                            optionsHtml += `<option value="${s.id}" ${selected}>${s.name}</option>`;
                        }
                    });
                } else {
                    optionsHtml = '<option value="">Sem fornecedor</option>';
                }

                return `
                    <tr class="hover:bg-gray-50 border-b border-gray-100 product-row" data-product-id="${prod.id}" data-cost="${costPrice}">
                        <td class="p-3 pl-4 text-center">
                            <input type="checkbox" class="row-select w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" checked>
                        </td>
                        <td class="p-3 font-medium text-gray-800">${prod.name}</td>
                        <td class="p-3 text-center text-xs text-gray-500">
                            <span class="bg-red-100 text-red-700 px-2 py-1 rounded">${curr}</span> / ${min}
                        </td>
                        <td class="p-3 text-center font-bold text-indigo-600">
                            <input type="number" class="qty-input w-16 p-1 border rounded text-center" value="${suggestion}" min="1">
                        </td>
                        <td class="p-3 text-right text-sm text-gray-600">R$ ${costPrice.toFixed(2)}</td>
                        <td class="p-3 text-right text-sm font-bold text-gray-800 row-subtotal">R$ ${(suggestion * costPrice).toFixed(2)}</td>
                        <td class="p-3">
                            <select class="supplier-select w-full p-2 border rounded-md bg-white text-sm">
                                ${optionsHtml}
                            </select>
                        </td>
                    </tr>
                `;
            }).join('');

            const quoteBtnClass = purchaseFlowState.isQuoteMode ? 'flex' : 'hidden';

            container.innerHTML = `
                <div class="space-y-4 animate-fade-in">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-center">
                            <div class="flex items-center gap-3">
                                <input type="checkbox" id="toggle-quote-mode" class="w-4 h-4 text-indigo-600 rounded" ${purchaseFlowState.isQuoteMode ? 'checked' : ''}>
                                <label for="toggle-quote-mode" class="text-sm font-medium text-gray-700 cursor-pointer select-none">
                                    Realizar Cotação Prévia?
                                </label>
                            </div>
                            <p class="text-xs text-gray-500 mt-1 ml-7">Se marcado, permite gerar PDF de cotação antes do pedido.</p>
                        </div>

                        <div class="bg-indigo-50 p-4 rounded-lg border border-indigo-100 shadow-sm flex items-center justify-between">
                            <div>
                                <h3 class="font-bold text-indigo-900">Impacto no Caixa</h3>
                                <p class="text-xs text-indigo-600">Custo estimado dos itens selecionados</p>
                            </div>
                            <div class="text-right">
                                <p id="total-purchase-cost" class="text-2xl font-bold text-indigo-700">R$ 0,00</p>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end gap-2">
                        <button id="btn-generate-quotes" class="${quoteBtnClass} items-center gap-2 bg-white border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 font-medium text-sm transition-all shadow-sm">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            Gerar PDFs de Cotação
                        </button>

                        <button id="btn-go-to-orders" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-medium text-sm transition-colors flex items-center gap-2 shadow-sm">
                            Gerar Pedidos de Compra
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </button>
                    </div>

                    <div class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                        <table class="w-full text-left">
                            <thead class="bg-gray-50 text-gray-500 font-semibold text-xs uppercase border-b border-gray-200">
                                <tr>
                                    <th class="p-3 pl-4 w-10 text-center"><input type="checkbox" id="check-all-rows" checked></th>
                                    <th class="p-3">Produto</th>
                                    <th class="p-3 text-center">Estoque</th>
                                    <th class="p-3 text-center">Qtd.</th>
                                    <th class="p-3 text-right">Custo Unit.</th>
                                    <th class="p-3 text-right">Subtotal</th>
                                    <th class="p-3">Fornecedor</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100" id="purchase-table-body">${rowsHtml}</tbody>
                        </table>
                    </div>
                </div>
            `;
            
            updatePurchaseTotal();

        } catch (err) {
            console.error(err);
            container.innerHTML = '<p class="text-red-500 text-center">Erro ao calcular compras.</p>';
        }

    } else if (purchaseFlowState.step === 2) {
        renderFinalOrders(container);
    }
}

// Lógica para montar a Tela de Pedidos (Passo 2)
function renderFinalOrders(container) {
    if (!purchaseFlowState.finalOrders || Object.keys(purchaseFlowState.finalOrders).length === 0) {
        purchaseFlowState.step = 1;
        renderPurchaseTab();
        return;
    }

    let cardsHtml = '';
    let grandTotal = 0;
    
    for (const [supId, data] of Object.entries(purchaseFlowState.finalOrders)) {
        let orderTotal = 0;
        let itemsHtml = data.items.map(item => {
            const itemTotal = item.qty * item.cost;
            orderTotal += itemTotal;
            return `
            <tr class="border-b last:border-0 border-gray-100">
                <td class="p-2 pl-4 text-sm text-gray-800">${item.name}</td>
                <td class="p-2 text-right text-sm text-gray-600">${item.qty} un. x R$ ${item.cost.toFixed(2)}</td>
                <td class="p-2 pr-4 text-right text-sm font-bold text-indigo-600">R$ ${itemTotal.toFixed(2)}</td>
            </tr>
        `}).join('');

        grandTotal += orderTotal;

        // Serializa dados para o botão de registar
        const orderDataStr = encodeURIComponent(JSON.stringify({
            supplierId: supId,
            supplierName: data.info.name,
            totalAmount: orderTotal,
            items: data.items
        }));

        cardsHtml += `
            <div class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm supplier-order-card" data-supplier-name="${data.info.name}">
                <div class="bg-gray-50 p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                        <h4 class="font-bold text-gray-800 text-lg">${data.info.name}</h4>
                        <div class="text-xs text-gray-500 flex gap-4 mt-1">
                            <span>${data.info.email || 'Sem email'}</span>
                            <span>${data.info.phone || 'Sem telefone'}</span>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-xs text-gray-500 uppercase">Valor do Pedido</p>
                        <p class="font-bold text-lg text-indigo-700">R$ ${orderTotal.toFixed(2)}</p>
                    </div>
                </div>
                <table class="w-full text-left">
                    <tbody class="divide-y divide-gray-50">${itemsHtml}</tbody>
                </table>
                <div class="p-3 bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
                    <button class="btn-register-order bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 text-sm flex items-center gap-2" data-order="${orderDataStr}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
                        Registrar Compra
                    </button>
                    <button class="btn-print-order bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-50 text-sm flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                        Imprimir
                    </button>
                </div>
            </div>
        `;
    }

    container.innerHTML = `
        <div class="space-y-4 animate-fade-in">
            <div class="flex flex-col sm:flex-row justify-between items-center gap-4 bg-green-50 p-4 rounded-lg border border-green-100">
                <div>
                    <h3 class="font-bold text-green-800 text-lg">Etapa 2: Pedidos Prontos</h3>
                    <p class="text-sm text-green-600">Valor Total de Compras: <strong>R$ ${grandTotal.toFixed(2)}</strong></p>
                </div>
                <button id="btn-back-step1" class="text-gray-600 hover:text-gray-900 text-sm font-medium underline">
                    Voltar / Corrigir
                </button>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                ${cardsHtml}
            </div>
        </div>
    `;
}

// --- 6. RENDERIZAÇÃO: ABA HISTÓRICO ---

async function renderHistoryTab() {
    const container = document.getElementById('historyContainer');
    if (!container) return;
    container.innerHTML = '<div class="loader mx-auto my-8"></div>';

    try {
        const history = await suppliersApi.getPurchaseHistory(state.establishmentId);

        if (history.length === 0) {
            container.innerHTML = '<div class="text-center text-gray-500 py-8">Nenhum histórico de compras encontrado.</div>';
            return;
        }

        const rows = history.map(order => `
            <tr class="hover:bg-gray-50 border-b border-gray-100">
                <td class="p-3 text-sm text-gray-600">${new Date(order.createdAt.seconds * 1000).toLocaleDateString('pt-BR')}</td>
                <td class="p-3 font-medium text-gray-800">${order.supplierName}</td>
                <td class="p-3 text-sm text-gray-600">${order.items.length} itens</td>
                <td class="p-3 text-right font-bold text-indigo-600">R$ ${parseFloat(order.totalAmount).toFixed(2)}</td>
                <td class="p-3 text-right">
                    <button class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200 btn-view-purchase" data-purchase='${JSON.stringify(order)}'>
                        Ver Detalhes
                    </button>
                </td>
            </tr>
        `).join('');

        container.innerHTML = `
            <div class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <table class="w-full text-left">
                    <thead class="bg-gray-50 text-gray-500 font-semibold text-xs uppercase border-b border-gray-200">
                        <tr>
                            <th class="p-3 pl-4">Data</th>
                            <th class="p-3">Fornecedor</th>
                            <th class="p-3">Qtd. Itens</th>
                            <th class="p-3 text-right">Total</th>
                            <th class="p-3 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">${rows}</tbody>
                </table>
            </div>
        `;

    } catch (err) {
        console.error(err);
        container.innerHTML = '<p class="text-red-500 text-center">Erro ao carregar histórico.</p>';
    }
}

// --- FUNÇÃO PARA VER DETALHES DA COMPRA (HISTÓRICO) ---
function openPurchaseDetailsModal(purchase) {
    const dateStr = new Date(purchase.createdAt.seconds * 1000).toLocaleString('pt-BR');
    
    const itemsHtml = purchase.items.map(item => `
        <li class="flex justify-between py-2 border-b border-gray-100 last:border-0">
            <div>
                <p class="font-medium text-sm text-gray-800">${item.name}</p>
                <p class="text-xs text-gray-500">${item.qty} un. x R$ ${parseFloat(item.cost).toFixed(2)}</p>
            </div>
            <p class="text-sm font-bold text-gray-700">R$ ${(item.qty * item.cost).toFixed(2)}</p>
        </li>
    `).join('');

    const contentHTML = `
        <div class="space-y-4">
            <div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <div>
                    <p class="text-xs text-gray-500">Fornecedor</p>
                    <p class="font-bold text-gray-800">${purchase.supplierName}</p>
                </div>
                <div class="text-right">
                    <p class="text-xs text-gray-500">Data</p>
                    <p class="font-medium text-gray-800">${dateStr}</p>
                </div>
            </div>
            
            <div class="border rounded-lg p-3">
                <h4 class="text-sm font-semibold text-gray-600 mb-2 border-b pb-1">Itens Comprados</h4>
                <ul class="max-h-60 overflow-y-auto">${itemsHtml}</ul>
            </div>

            <div class="flex justify-between items-center pt-2">
                <p class="text-sm text-gray-600">Total Pago:</p>
                <p class="text-xl font-bold text-green-600">R$ ${parseFloat(purchase.totalAmount).toFixed(2)}</p>
            </div>
        </div>
    `;

    showGenericModal({
        title: `Detalhes da Compra`,
        contentHTML: contentHTML,
        maxWidth: 'max-w-md'
    });
}

// --- FUNÇÃO AUXILIAR: CALCULAR TOTAL FINANCEIRO ---
function updatePurchaseTotal() {
    const rows = document.querySelectorAll('.product-row');
    let total = 0;

    rows.forEach(row => {
        const checkbox = row.querySelector('.row-select');
        const qtyInput = row.querySelector('.qty-input');
        const subtotalEl = row.querySelector('.row-subtotal');
        const cost = parseFloat(row.dataset.cost || 0);
        const qty = parseInt(qtyInput.value || 0);

        if (checkbox.checked) {
            const subtotal = cost * qty;
            total += subtotal;
            subtotalEl.textContent = `R$ ${subtotal.toFixed(2)}`;
            row.classList.remove('opacity-50', 'bg-gray-50');
        } else {
            row.classList.add('opacity-50', 'bg-gray-50');
        }
    });

    const totalEl = document.getElementById('total-purchase-cost');
    if(totalEl) totalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// --- FUNÇÃO DE GERAÇÃO DE PDF ---
async function generatePDF(title, supplierName, items, isQuote = false) {
    if (!window.jspdf) {
        alert("Erro: Biblioteca PDF não carregada.");
        return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const today = new Date().toLocaleDateString('pt-BR');

    doc.setFontSize(18);
    doc.text(title, 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Data: ${today}`, 14, 28);
    doc.setTextColor(0);
    doc.setFontSize(12);
    doc.text(`Destinatário: ${supplierName}`, 14, 38);

    if (isQuote) {
        doc.setFontSize(10);
        doc.text("Por favor, enviem a vossa melhor cotação para os itens abaixo.", 14, 45);
    }

    const tableBody = items.map(item => [item.name, item.qty.toString()]);

    doc.autoTable({
        startY: isQuote ? 50 : 45,
        head: [['Produto', 'Quantidade Solicitada']],
        body: tableBody,
        theme: 'striped',
        headStyles: { fillColor: isQuote ? [100, 116, 139] : [22, 163, 74] },
        styles: { fontSize: 10, cellPadding: 3 }
    });

    const fileName = `${isQuote ? 'Cotacao' : 'Pedido'}_${supplierName.replace(/\s+/g, '_')}_${today.replace(/\//g, '-')}.pdf`;
    doc.save(fileName);
    showNotification("Sucesso", "PDF gerado!", "success");
}

// --- 6. MODAL DE FORNECEDORES ---

function openSupplierModal(supplier = null) {
    const html = `
        <form id="supplierForm" class="space-y-4">
            <input type="hidden" id="supId" value="${supplier?.id || ''}">
            <div><label class="block text-sm font-medium text-gray-700">Nome da Empresa *</label><input type="text" id="supName" value="${supplier?.name || ''}" required class="w-full p-2 border rounded mt-1"></div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label class="block text-sm font-medium text-gray-700">Nome Contato</label><input type="text" id="supContact" value="${supplier?.contactName || ''}" class="w-full p-2 border rounded mt-1"></div>
                <div><label class="block text-sm font-medium text-gray-700">Telefone</label><input type="text" id="supPhone" value="${supplier?.phone || ''}" class="w-full p-2 border rounded mt-1"></div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label class="block text-sm font-medium text-gray-700">Email</label><input type="email" id="supEmail" value="${supplier?.email || ''}" class="w-full p-2 border rounded mt-1"></div>
                <div><label class="block text-sm font-medium text-gray-700">CNPJ / NIF</label><input type="text" id="supTaxId" value="${supplier?.taxId || ''}" class="w-full p-2 border rounded mt-1"></div>
            </div>
            <div class="flex justify-end gap-3 pt-4">
                <button type="button" onclick="document.getElementById('genericModal').style.display='none'" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancelar</button>
                <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Salvar</button>
            </div>
        </form>
    `;
    showGenericModal({ title: supplier ? 'Editar Fornecedor' : 'Novo Fornecedor', contentHTML: html, maxWidth: 'max-w-lg' });
    setTimeout(() => { document.getElementById('supplierForm').addEventListener('submit', handleSupplierFormSubmit); }, 50);
}

// --- 7. INICIALIZAÇÃO DA PÁGINA ---

export function loadSuppliersPage() {
    contentDiv.innerHTML = `
        <section class="p-4 sm:p-6 pb-24">
            <div class="bg-white rounded-lg shadow-md">
                <div class="border-b border-gray-200 flex justify-between items-center px-4 sm:px-6 overflow-x-auto">
                    <nav class="-mb-px flex space-x-6" aria-label="Tabs">
                        <button id="tab-btn-list" class="tab-btn whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-indigo-500 text-indigo-600">Lista de Fornecedores</button>
                        <button id="tab-btn-purchases" class="tab-btn whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">Gestão de Compras</button>
                        <button id="tab-btn-history" class="tab-btn whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">Histórico</button>
                    </nav>
                    <button id="btn-new-supplier" class="bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 text-sm flex items-center justify-center gap-2 my-2 flex-shrink-0">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> <span class="hidden sm:inline">Novo</span>
                    </button>
                </div>
                <div class="p-4 sm:p-6">
                    <div id="tab-content-list" class="block">
                        <div class="mb-4"><input type="text" id="supplierSearchInput" placeholder="Pesquisar fornecedor..." class="border rounded-md p-2 text-sm w-full sm:w-64"></div>
                        <div id="suppliersList"></div>
                    </div>
                    <div id="tab-content-purchases" class="hidden">
                        <div id="purchasesContainer"></div>
                    </div>
                    <div id="tab-content-history" class="hidden">
                        <div id="historyContainer"></div>
                    </div>
                </div>
            </div>
        </section>
    `;

    if (pageEventListener) {
        contentDiv.removeEventListener('click', pageEventListener);
        contentDiv.removeEventListener('input', pageEventListener);
        contentDiv.removeEventListener('change', pageEventListener);
    }

    pageEventListener = (e) => {
        // Navegação de Abas
        if (e.target.closest('#tab-btn-list')) switchTab('list');
        if (e.target.closest('#tab-btn-purchases')) switchTab('purchases');
        if (e.target.closest('#tab-btn-history')) switchTab('history');

        // Toggle Cotação
        if (e.target.id === 'toggle-quote-mode') {
            purchaseFlowState.isQuoteMode = e.target.checked;
            renderPurchaseTab(); 
        }

        // Busca
        if (e.target.id === 'supplierSearchInput') renderSuppliersList();
        if (e.target.closest('#btn-new-supplier')) openSupplierModal();

        // CRUD
        const btn = e.target.closest('button[data-action]');
        if (btn) {
            const action = btn.dataset.action;
            if (action === 'delete') handleDeleteSupplier(btn.dataset.id);
            if (action === 'edit') openSupplierModal(JSON.parse(btn.dataset.supplier));
        }

        // --- CÁLCULO DINÂMICO ---
        if (e.target.classList.contains('qty-input') || e.target.classList.contains('row-select')) {
            updatePurchaseTotal();
        }
        
        if (e.target.id === 'check-all-rows') {
            const isChecked = e.target.checked;
            document.querySelectorAll('.row-select').forEach(cb => cb.checked = isChecked);
            updatePurchaseTotal();
        }

        // --- FLUXO DE COMPRAS ---
        if (e.target.closest('#btn-generate-quotes')) {
            const rows = document.querySelectorAll('.product-row');
            const quotesMap = {}; 
            
            rows.forEach(row => {
                const checkbox = row.querySelector('.row-select');
                if (!checkbox.checked) return;

                const productName = row.querySelector('td:nth-child(2)').innerText;
                const qty = row.querySelector('.qty-input').value;
                const select = row.querySelector('.supplier-select');
                
                Array.from(select.options).forEach(opt => {
                    if(opt.value) {
                        if (!quotesMap[opt.value]) {
                            const sup = purchaseFlowState.allSuppliers.find(s => s.id === opt.value);
                            quotesMap[opt.value] = { name: sup.name, items: [] };
                        }
                        quotesMap[opt.value].items.push({ name: productName, qty });
                    }
                });
            });

            if (Object.keys(quotesMap).length === 0) {
                showNotification("Erro", "Nenhum item selecionado para cotação.", "error");
                return;
            }

            Object.values(quotesMap).forEach(quote => {
                generatePDF("Solicitação de Cotação", quote.name, quote.items, true);
            });
        }

        if (e.target.closest('#btn-go-to-orders')) {
            const rows = document.querySelectorAll('.product-row');
            const finalOrders = {};
            let hasSelection = false;

            rows.forEach(row => {
                const checkbox = row.querySelector('.row-select');
                if (!checkbox.checked) return;
                hasSelection = true;

                const productName = row.querySelector('td:nth-child(2)').innerText;
                const qty = row.querySelector('.qty-input').value;
                const cost = parseFloat(row.dataset.cost);
                const select = row.querySelector('.supplier-select');
                const supId = select.value;

                if (supId) {
                    if (!finalOrders[supId]) {
                        const sup = purchaseFlowState.allSuppliers.find(s => s.id === supId);
                        finalOrders[supId] = { info: sup, items: [] };
                    }
                    finalOrders[supId].items.push({ name: productName, qty, cost });
                }
            });

            if (!hasSelection) {
                showNotification("Atenção", "Selecione pelo menos um item para gerar o pedido.", "error");
                return;
            }

            purchaseFlowState.finalOrders = finalOrders;
            purchaseFlowState.step = 2;
            renderPurchaseTab();
        }

        if (e.target.closest('#btn-back-step1')) {
            purchaseFlowState.step = 1;
            renderPurchaseTab();
        }

        // --- REGISTRAR COMPRA (NOVO) ---
        if (e.target.closest('.btn-register-order')) {
            const btn = e.target.closest('.btn-register-order');
            const orderData = JSON.parse(decodeURIComponent(btn.dataset.order));
            
            // Adiciona establishmentId ao pedido
            orderData.establishmentId = state.establishmentId;

            // Chama API para salvar
            suppliersApi.registerPurchase(orderData).then(() => {
                showNotification("Sucesso", "Compra registrada no histórico!", "success");
                btn.disabled = true; // Desabilita para evitar duplo clique
                btn.textContent = "Registrado ✓";
                btn.classList.replace('bg-blue-600', 'bg-gray-400');
                btn.classList.replace('hover:bg-blue-700', 'hover:bg-gray-400');
            }).catch(err => {
                showNotification("Erro", "Falha ao registrar compra: " + err.message, "error");
            });
        }

        // Imprimir Pedido Final
        if (e.target.closest('.btn-print-order')) {
            const card = e.target.closest('.supplier-order-card');
            const supName = card.dataset.supplierName;
            
            const items = [];
            card.querySelectorAll('tbody tr').forEach(tr => {
                const name = tr.children[0].innerText;
                const qtyText = tr.children[1].innerText.split(' un.')[0];
                items.push({
                    name: name,
                    qty: qtyText
                });
            });

            generatePDF("Pedido de Compra", supName, items, false);
        }

        // --- AÇÕES DO HISTÓRICO (NOVO) ---
        if (e.target.closest('.btn-view-purchase')) {
            const btn = e.target.closest('.btn-view-purchase');
            const purchase = JSON.parse(btn.dataset.purchase);
            openPurchaseDetailsModal(purchase);
        }
    };

    contentDiv.addEventListener('click', pageEventListener);
    contentDiv.addEventListener('input', pageEventListener);
    contentDiv.addEventListener('change', pageEventListener);

    switchTab('list');
}

function switchTab(tab) {
    currentTab = tab;
    
    // Atualiza botões
    ['list', 'purchases', 'history'].forEach(t => {
        const btn = document.getElementById(`tab-btn-${t}`);
        const content = document.getElementById(`tab-content-${t}`);
        if (t === tab) {
            btn.classList.add('border-indigo-500', 'text-indigo-600');
            btn.classList.remove('border-transparent', 'text-gray-500');
            content.classList.remove('hidden');
        } else {
            btn.classList.remove('border-indigo-500', 'text-indigo-600');
            btn.classList.add('border-transparent', 'text-gray-500');
            content.classList.add('hidden');
        }
    });

    // Controla visibilidade do botão 'Novo'
    const btnNew = document.getElementById('btn-new-supplier');
    if (tab === 'list') {
        btnNew.classList.remove('hidden');
    } else {
        btnNew.classList.add('hidden');
    }

    fetchSuppliers();
}