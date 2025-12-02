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

// Estado local para o fluxo de compras e cotações
let purchaseFlowState = {
    step: 1, // 1: Seleção, 2: Revisão/Envio
    productsToBuy: [], 
    allSuppliers: [],
    finalOrders: {}, // Armazena dados reais: { supId: { info: {...}, items: [...] } }
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
            await suppliersApi.deleteSupplier(id);
            showNotification("Sucesso", "Fornecedor excluído.", "success");
            closeModal('genericModal'); 
            renderListTab(); 
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
        taxId: form.querySelector('#supTaxId').value,
        category: form.querySelector('#supCategory').value
    };

    const btnSubmit = form.querySelector('button[type="submit"]');
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'A salvar...';

    try {
        if (id) {
            await suppliersApi.updateSupplier(id, data);
            showNotification("Sucesso", "Fornecedor atualizado!", "success");
        } else {
            await suppliersApi.createSupplier(data);
            showNotification("Sucesso", "Fornecedor criado!", "success");
        }
        closeModal('genericModal');
        renderListTab();
    } catch (error) {
        showNotification("Erro", "Erro ao salvar: " + error.message, "error");
    } finally {
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'Salvar';
    }
}

// --- 4. RENDERIZAÇÃO: ABA LISTA (Mobile-First Híbrido) ---

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

    // --- 1. VISUALIZAÇÃO MOBILE (LISTA COMPACTA) ---
    let mobileHtml = `<div class="flex flex-col gap-2 md:hidden">`;
    filtered.forEach(sup => {
        const supString = JSON.stringify(sup).replace(/"/g, '&quot;');
        
        mobileHtml += `
            <div class="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between active:bg-gray-50 transition-colors cursor-pointer supplier-item-mobile" data-supplier="${supString}">
                <div class="flex-1 min-w-0 pr-3">
                    <h3 class="font-bold text-gray-900 text-sm truncate">${sup.name}</h3>
                    <div class="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                        <span class="truncate bg-gray-100 px-1.5 py-0.5 rounded">${sup.category || 'Geral'}</span>
                        ${sup.contactName ? `<span class="truncate">• ${sup.contactName}</span>` : ''}
                    </div>
                </div>
                <div class="text-gray-400">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </div>
            </div>
        `;
    });
    mobileHtml += `</div>`;

    // --- 2. VISUALIZAÇÃO DESKTOP (TABELA COMPLETA) ---
    let desktopHtml = `
        <div class="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fornecedor</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contato</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
    `;
    
    filtered.forEach(sup => {
        const supString = JSON.stringify(sup).replace(/"/g, '&quot;');
        desktopHtml += `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">${sup.name}</div>
                    <div class="text-sm text-gray-500">${sup.taxId || 'Sem doc.'}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${sup.email || '-'}</div>
                    <div class="text-sm text-gray-500">${sup.phone || '-'}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        ${sup.category || 'Geral'}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button data-action="edit" data-supplier="${supString}" class="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                    <button data-action="delete" data-id="${sup.id}" class="text-red-600 hover:text-red-900">Excluir</button>
                </td>
            </tr>
        `;
    });
    desktopHtml += `</tbody></table></div>`;

    listContainer.innerHTML = mobileHtml + desktopHtml;
}

// --- FUNÇÃO PARA MOSTRAR DETALHES DO FORNECEDOR (MOBILE ACTION SHEET) ---
function openSupplierDetailsSheet(supplier) {
    const whatsappLink = supplier.phone ? `https://wa.me/${supplier.phone.replace(/\D/g,'')}` : '#';
    const telLink = supplier.phone ? `tel:${supplier.phone}` : '#';
    const mailLink = supplier.email ? `mailto:${supplier.email}` : '#';
    
    const supString = JSON.stringify(supplier).replace(/"/g, '&quot;');

    const html = `
        <div class="text-center mb-6">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-500 text-2xl font-bold uppercase">
                ${supplier.name.substring(0,2)}
            </div>
            <h3 class="text-xl font-bold text-gray-900 leading-tight mb-1">${supplier.name}</h3>
            <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                ${supplier.category || 'Fornecedor'}
            </span>
        </div>

        <div class="space-y-4 mb-8">
            ${supplier.contactName ? `
            <div class="flex justify-between items-center border-b border-gray-100 pb-2">
                <span class="text-gray-500 text-sm">Contato</span>
                <span class="font-medium text-gray-800">${supplier.contactName}</span>
            </div>` : ''}
            ${supplier.phone ? `
            <div class="flex justify-between items-center border-b border-gray-100 pb-2">
                <span class="text-gray-500 text-sm">Telefone</span>
                <span class="font-medium text-gray-800">${supplier.phone}</span>
            </div>` : ''}
        </div>

        <div class="grid grid-cols-3 gap-3 mb-6">
            <a href="${whatsappLink}" target="_blank" class="${!supplier.phone ? 'opacity-50 pointer-events-none' : ''} flex flex-col items-center justify-center p-3 bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition-colors">
                <svg class="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.897.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                <span class="text-xs font-bold">WhatsApp</span>
            </a>
            <a href="${telLink}" class="${!supplier.phone ? 'opacity-50 pointer-events-none' : ''} flex flex-col items-center justify-center p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors">
                <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <span class="text-xs font-bold">Ligar</span>
            </a>
            <a href="${mailLink}" class="${!supplier.email ? 'opacity-50 pointer-events-none' : ''} flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span class="text-xs font-bold">Email</span>
            </a>
        </div>

        <div class="flex flex-col gap-3">
            <button data-action="edit" data-supplier="${supString}" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold text-sm shadow hover:bg-indigo-700 active:scale-[0.98] transition-transform">
                Editar Informações
            </button>
            <button data-action="delete" data-id="${supplier.id}" class="w-full bg-white text-red-600 border border-red-200 py-3 rounded-lg font-bold text-sm hover:bg-red-50 active:scale-[0.98] transition-transform">
                Excluir Fornecedor
            </button>
        </div>
    `;

    showGenericModal({
        title: '', 
        contentHTML: html,
        maxWidth: 'max-w-md' 
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

            // Filtrar produtos que precisam de reposição
            const toBuy = allProds.filter(p => {
                const current = parseInt(p.currentStock || 0);
                const min = parseInt(p.minStock || 0);
                return (current <= min);
            });

            purchaseFlowState.productsToBuy = toBuy;

            if (toBuy.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-100">
                        <div class="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 class="text-lg font-bold text-gray-800">Tudo em ordem!</h3>
                        <p class="text-gray-600">Nenhum produto abaixo do estoque mínimo.</p>
                        <button class="mt-4 text-indigo-600 hover:underline text-sm" onclick="window.location.reload()">Atualizar Dados</button>
                    </div>
                `;
                return;
            }

            // GERAÇÃO DOS ITEMS DA LISTA (HÍBRIDO: CARD MOBILE / TABLE DESKTOP)
            let mobileCardsHtml = '<div class="flex flex-col gap-3 md:hidden">';
            let desktopRowsHtml = '';

            toBuy.forEach(prod => {
                const min = parseInt(prod.minStock) || 0;
                const curr = parseInt(prod.currentStock) || 0;
                
                // Sugere apenas o necessário para atingir o mínimo. Se já tiver (ex: curr=min), sugere 1.
                const suggestion = Math.max((min - curr), 1);
                
                const costPrice = parseFloat(prod.costPrice || 0);

                let optionsHtml = '<option value="">Selecione...</option>';
                if (purchaseFlowState.allSuppliers.length > 0) {
                    purchaseFlowState.allSuppliers.forEach(s => {
                        const isLinked = prod.supplierIds && prod.supplierIds.includes(s.id);
                        const selected = isLinked ? 'selected' : '';
                        optionsHtml += `<option value="${s.id}" ${selected}>${s.name}</option>`;
                    });
                } else {
                    optionsHtml = '<option value="">Sem fornecedores</option>';
                }

                // --- MOBILE CARD (COM DISPLAY DE ESTOQUE CLARO) ---
                mobileCardsHtml += `
                    <div class="product-row bg-white p-3 rounded-lg shadow-sm border border-gray-200" data-product-id="${prod.id}" data-cost="${costPrice}">
                        <div class="flex justify-between items-start mb-2">
                            <div class="flex items-center gap-2">
                                <input type="checkbox" class="row-select w-5 h-5 text-indigo-600 rounded border-gray-300" checked>
                                <div>
                                    <p class="font-bold text-gray-800 text-sm">${prod.name}</p>
                                    <p class="text-xs text-gray-500">Custo: R$ ${costPrice.toFixed(2)}</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <span class="text-[10px] text-gray-500 uppercase font-bold tracking-wide block mb-0.5">Estoque</span>
                                <div class="flex items-center justify-end gap-1 text-xs">
                                    <span class="font-bold text-red-600">${curr}</span>
                                    <span class="text-gray-400">/</span>
                                    <span class="font-medium text-gray-600">${min} (Mín)</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-3 items-center mt-2">
                            <div>
                                <label class="text-xs text-gray-500 block mb-1">Qtd. a Comprar</label>
                                <input type="number" class="qty-input w-full p-2 border border-gray-300 rounded text-center font-bold text-indigo-700 bg-indigo-50" value="${suggestion}" min="1">
                            </div>
                            <div>
                                <label class="text-xs text-gray-500 block mb-1">Fornecedor</label>
                                <select class="supplier-select w-full p-2 border border-gray-300 rounded bg-white text-xs truncate">
                                    ${optionsHtml}
                                </select>
                            </div>
                        </div>
                        <div class="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                            <span class="text-xs text-gray-500">Subtotal Previsto:</span>
                            <span class="row-subtotal font-bold text-indigo-600 text-sm">R$ ${(suggestion * costPrice).toFixed(2)}</span>
                        </div>
                    </div>
                `;

                // --- DESKTOP ROW ---
                desktopRowsHtml += `
                    <tr class="hover:bg-gray-50 border-b border-gray-100 product-row" data-product-id="${prod.id}" data-cost="${costPrice}">
                        <td class="p-3 pl-4 text-center w-10">
                            <input type="checkbox" class="row-select w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" checked>
                        </td>
                        <td class="p-3 font-medium text-gray-800">${prod.name}</td>
                        <td class="p-3 text-center text-xs text-gray-600">
                            <div class="flex flex-col items-center">
                                <span class="font-bold text-red-600">${curr} <span class="text-gray-400 font-normal">Atual</span></span>
                                <span class="border-t border-gray-200 w-12 my-0.5"></span>
                                <span class="font-medium">${min} <span class="text-gray-400 font-normal">Mínimo</span></span>
                            </div>
                        </td>
                        <td class="p-3 text-center w-24">
                            <input type="number" class="qty-input w-full p-2 border border-gray-300 rounded text-center text-lg font-bold text-indigo-700 bg-indigo-50" value="${suggestion}" min="1">
                        </td>
                        <td class="p-3 text-right text-sm text-gray-600">R$ ${costPrice.toFixed(2)}</td>
                        <td class="p-3 text-right text-sm font-bold text-gray-800 row-subtotal">R$ ${(suggestion * costPrice).toFixed(2)}</td>
                        <td class="p-3 w-48">
                            <select class="supplier-select w-full p-2 border border-gray-300 rounded-md bg-white text-sm">
                                ${optionsHtml}
                            </select>
                        </td>
                    </tr>
                `;
            });
            mobileCardsHtml += '</div>';

            // CONFIGURAÇÃO DO BOTÃO PRINCIPAL (COTAÇÃO vs PEDIDO)
            const mainButtonText = purchaseFlowState.isQuoteMode ? 'REVISAR COTAÇÕES' : 'GERAR PEDIDOS DE COMPRA';
            const mainButtonColor = purchaseFlowState.isQuoteMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-green-600 hover:bg-green-700';
            const mainButtonIcon = purchaseFlowState.isQuoteMode ? 
                '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>' : 
                '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>';

            container.innerHTML = `
                <div class="space-y-4 animate-fade-in pb-20">
                    <div class="bg-white p-3 md:p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div class="flex flex-col md:flex-row justify-between items-center gap-3">
                            <div class="flex items-center gap-3 w-full md:w-auto">
                                <input type="checkbox" id="toggle-quote-mode" class="w-5 h-5 text-indigo-600 rounded" ${purchaseFlowState.isQuoteMode ? 'checked' : ''}>
                                <label for="toggle-quote-mode" class="text-sm font-medium text-gray-700 cursor-pointer select-none">
                                    Modo Cotação (Gerar PDF e Enviar)
                                </label>
                            </div>
                            <div class="bg-indigo-50 px-3 py-2 rounded-lg border border-indigo-100 text-center w-full md:w-auto flex justify-between md:block items-center">
                                <span class="text-xs text-indigo-600 uppercase font-bold tracking-wide md:block">Total Estimado:</span>
                                <span id="total-purchase-cost" class="text-lg font-bold text-indigo-700">R$ 0,00</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col gap-3 sticky bottom-4 z-20">
                        <button id="btn-go-to-orders" class="w-full ${mainButtonColor} text-white px-4 py-3 rounded-xl font-bold text-base shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
                            ${mainButtonText}
                            ${mainButtonIcon}
                        </button>
                    </div>

                    ${mobileCardsHtml}
                    
                    <div class="hidden md:block bg-white border border-gray-200 rounded-lg overflow-x-auto shadow-sm pb-20">
                        <table class="w-full text-left">
                            <thead class="bg-gray-50 text-gray-500 font-semibold text-xs uppercase border-b border-gray-200">
                                <tr>
                                    <th class="p-3 pl-4 w-10 text-center"><input type="checkbox" id="check-all-rows" checked class="w-5 h-5"></th>
                                    <th class="p-3">Produto</th>
                                    <th class="p-3 text-center">Estoque</th>
                                    <th class="p-3 text-center">Qtd. Compra</th>
                                    <th class="p-3 text-right">Custo</th>
                                    <th class="p-3 text-right">Total</th>
                                    <th class="p-3">Fornecedor</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100" id="purchase-table-body">${desktopRowsHtml}</tbody>
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

// --- RENDERIZAÇÃO DO PASSO 2 (PEDIDOS FINAIS OU COTAÇÕES) ---
function renderFinalOrders(container) {
    if (!purchaseFlowState.finalOrders || Object.keys(purchaseFlowState.finalOrders).length === 0) {
        purchaseFlowState.step = 1;
        renderPurchaseTab();
        return;
    }

    const isQuote = purchaseFlowState.isQuoteMode;
    let cardsHtml = '';
    let grandTotal = 0;
    
    // Define cores e textos baseados no modo (Cotação vs Pedido)
    const cardBorderColor = isQuote ? 'border-indigo-100' : 'border-gray-200';
    const cardHeaderColor = isQuote ? 'bg-indigo-50 border-indigo-100' : 'bg-gray-50 border-gray-200';
    const tagColor = isQuote ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700';
    const saveButtonClass = isQuote ? 'hidden' : 'flex'; // Esconde botão de salvar se for cotação
    const pageTitle = isQuote ? 'Cotações Prontas' : 'Pedidos Prontos';
    const pageSubtitleClass = isQuote ? 'text-indigo-600' : 'text-green-600';
    const pageBgClass = isQuote ? 'bg-indigo-50 border-indigo-100' : 'bg-green-50 border-green-100';
    const pageTitleColor = isQuote ? 'text-indigo-800' : 'text-green-800';

    for (const [supId, data] of Object.entries(purchaseFlowState.finalOrders)) {
        let orderTotal = 0;
        let itemsHtml = data.items.map(item => {
            const itemTotal = item.qty * item.cost;
            orderTotal += itemTotal;
            return `
            <div class="flex justify-between py-2 border-b border-gray-50 text-sm">
                <span class="text-gray-800 font-medium">${item.name}</span>
                <div class="text-right">
                    <span class="text-gray-500 text-xs block">${item.qty} x R$ ${item.cost.toFixed(2)}</span>
                    <span class="text-indigo-600 font-bold block">R$ ${itemTotal.toFixed(2)}</span>
                </div>
            </div>
        `}).join('');

        grandTotal += orderTotal;
        const orderDataStr = encodeURIComponent(JSON.stringify({
            supplierId: supId,
            supplierName: data.info.name,
            totalAmount: orderTotal,
            items: data.items
        }));

        // Dados para envio via WhatsApp/Email
        const supplierInfoStr = encodeURIComponent(JSON.stringify({
            name: data.info.name,
            phone: data.info.phone,
            email: data.info.email
        }));
        const orderItemsStr = encodeURIComponent(JSON.stringify(data.items));

        // ADICIONADO: data-supplier-id para recuperar os dados reais sem raspar o HTML
        cardsHtml += `
            <div class="bg-white border ${cardBorderColor} rounded-xl overflow-hidden shadow-sm supplier-order-card mb-4" data-supplier-id="${supId}">
                <div class="${cardHeaderColor} p-3 border-b flex justify-between items-center">
                    <div>
                        <h4 class="font-bold text-gray-800 text-base">${data.info.name}</h4>
                        <div class="text-[10px] text-gray-500 flex flex-col">
                            <span>${data.info.email || ''}</span>
                        </div>
                    </div>
                    <div class="text-right">
                        <span class="${tagColor} text-xs font-bold px-2 py-1 rounded">R$ ${orderTotal.toFixed(2)}</span>
                    </div>
                </div>
                <div class="p-3">
                    ${itemsHtml}
                </div>
                <div class="p-3 bg-gray-50 border-t border-gray-200 grid grid-cols-3 gap-2">
                    <button class="btn-print-order bg-white border border-gray-300 text-gray-700 px-2 py-2.5 rounded-lg hover:bg-gray-50 text-xs font-bold flex items-center justify-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                        PDF
                    </button>
                    <button class="btn-send-order bg-green-500 text-white px-2 py-2.5 rounded-lg hover:bg-green-600 text-xs font-bold flex items-center justify-center gap-1 shadow-sm"
                        data-supplier-info="${supplierInfoStr}"
                        data-order-items="${orderItemsStr}"
                        data-total="${orderTotal}">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.897.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                        Enviar
                    </button>
                    <button class="btn-register-order bg-blue-600 text-white px-2 py-2.5 rounded-lg hover:bg-blue-700 text-xs font-bold items-center justify-center gap-1 shadow-sm ${saveButtonClass}" data-order="${orderDataStr}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        Salvar
                    </button>
                </div>
            </div>
        `;
    }

    container.innerHTML = `
        <div class="space-y-4 animate-fade-in pb-24">
            <div class="flex flex-col justify-between items-center gap-3 ${pageBgClass} p-4 rounded-lg border text-center">
                <div>
                    <h3 class="font-bold ${pageTitleColor} text-lg">${pageTitle}</h3>
                    <p class="text-sm ${pageSubtitleClass}">Valor Estimado: <strong class="text-lg">R$ ${grandTotal.toFixed(2)}</strong></p>
                </div>
                <button id="btn-back-step1" class="text-gray-600 hover:text-gray-900 text-sm font-medium underline py-2">
                    ← Voltar e Corrigir
                </button>
            </div>
            <div>
                ${cardsHtml}
            </div>
        </div>
    `;
}

// --- 6. RENDERIZAÇÃO: ABA HISTÓRICO (Híbrido: Cards Mobile / Table Desktop) ---

async function renderHistoryTab() {
    const container = document.getElementById('historyContainer');
    if (!container) return;
    container.innerHTML = '<div class="loader mx-auto my-8"></div>';

    try {
        const history = await suppliersApi.getPurchaseHistory(state.establishmentId);

        if (history.length === 0) {
            container.innerHTML = '<div class="text-center text-gray-500 py-8">Nenhum histórico encontrado.</div>';
            return;
        }

        // --- 1. MOBILE CARDS ---
        let mobileHtml = '<div class="flex flex-col gap-3 md:hidden">';
        history.forEach(order => {
            const dateStr = new Date(order.createdAt.seconds * 1000).toLocaleDateString('pt-BR');
            mobileHtml += `
                <div class="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center active:bg-gray-50 transition-colors">
                    <div>
                        <p class="text-xs text-gray-500 mb-0.5">${dateStr}</p>
                        <p class="font-bold text-gray-800 text-sm">${order.supplierName}</p>
                        <p class="text-xs text-gray-400 mt-0.5">${order.items.length} itens</p>
                    </div>
                    <div class="text-right">
                        <p class="text-indigo-600 font-bold text-sm mb-1">R$ ${parseFloat(order.totalAmount).toFixed(2)}</p>
                        <button class="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-200 btn-view-purchase" data-purchase='${JSON.stringify(order)}'>
                            Ver
                        </button>
                    </div>
                </div>
            `;
        });
        mobileHtml += '</div>';

        // --- 2. DESKTOP TABLE ---
        const rows = history.map(order => `
            <tr class="hover:bg-gray-50 border-b border-gray-100">
                <td class="p-3 text-sm text-gray-600 whitespace-nowrap">${new Date(order.createdAt.seconds * 1000).toLocaleDateString('pt-BR')}</td>
                <td class="p-3 font-medium text-gray-800">${order.supplierName}</td>
                <td class="p-3 text-right font-bold text-indigo-600 whitespace-nowrap">R$ ${parseFloat(order.totalAmount).toFixed(2)}</td>
                <td class="p-3 text-right">
                    <button class="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg font-bold hover:bg-indigo-100 btn-view-purchase" data-purchase='${JSON.stringify(order)}'>
                        Ver
                    </button>
                </td>
            </tr>
        `).join('');

        let desktopHtml = `
            <div class="hidden md:block bg-white border border-gray-200 rounded-lg overflow-x-auto shadow-sm">
                <table class="min-w-full text-left">
                    <thead class="bg-gray-50 text-gray-500 font-semibold text-xs uppercase border-b border-gray-200">
                        <tr>
                            <th class="p-3 pl-4">Data</th>
                            <th class="p-3">Fornecedor</th>
                            <th class="p-3 text-right">Total</th>
                            <th class="p-3 text-right">Ação</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">${rows}</tbody>
                </table>
            </div>
        `;

        container.innerHTML = mobileHtml + desktopHtml;

    } catch (err) {
        console.error(err);
        container.innerHTML = '<p class="text-red-500 text-center">Erro ao carregar histórico.</p>';
    }
}

// --- FUNÇÃO PARA VER DETALHES DA COMPRA (HISTÓRICO) ---
function openPurchaseDetailsModal(purchase) {
    const dateStr = new Date(purchase.createdAt.seconds * 1000).toLocaleString('pt-BR');
    
    const itemsHtml = purchase.items.map(item => `
        <li class="flex justify-between py-3 border-b border-gray-100 last:border-0">
            <div>
                <p class="font-medium text-sm text-gray-800">${item.name}</p>
                <p class="text-xs text-gray-500">${item.qty} un. x R$ ${parseFloat(item.cost).toFixed(2)}</p>
            </div>
            <p class="text-sm font-bold text-gray-700">R$ ${(item.qty * item.cost).toFixed(2)}</p>
        </li>
    `).join('');

    const contentHTML = `
        <div class="space-y-4">
            <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                <div>
                    <p class="text-xs text-gray-500 uppercase font-bold">Fornecedor</p>
                    <p class="font-bold text-gray-900 text-lg">${purchase.supplierName}</p>
                </div>
                <div class="text-right">
                    <p class="text-xs text-gray-500 uppercase font-bold">Data</p>
                    <p class="font-medium text-gray-800">${dateStr.split(' ')[0]}</p>
                </div>
            </div>
            
            <div class="border rounded-lg p-0 overflow-hidden">
                <div class="bg-gray-50 px-4 py-2 border-b border-gray-200">
                    <h4 class="text-xs font-bold text-gray-500 uppercase">Itens Comprados</h4>
                </div>
                <ul class="max-h-60 overflow-y-auto px-4">${itemsHtml}</ul>
            </div>

            <div class="flex justify-between items-center pt-2 px-2">
                <p class="text-base text-gray-600 font-medium">Total Pago:</p>
                <p class="text-2xl font-bold text-green-600">R$ ${parseFloat(purchase.totalAmount).toFixed(2)}</p>
            </div>
            
            <div class="flex justify-end pt-4">
                 <button type="button" class="modal-close w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 active:scale-95 transition-transform">FECHAR</button>
            </div>
        </div>
    `;

    showGenericModal({
        title: `Detalhes da Compra`,
        contentHTML: contentHTML,
        maxWidth: 'max-w-md'
    });
    
    setTimeout(() => {
        document.querySelector('#genericModal .modal-close').addEventListener('click', () => {
            closeModal('genericModal');
        });
    }, 50);
}

// --- FUNÇÃO AUXILIAR: CALCULAR TOTAL FINANCEIRO ---
function updatePurchaseTotal() {
    const rows = document.querySelectorAll('.product-row');
    let total = 0;

    rows.forEach(row => {
        // --- CORREÇÃO DE DUPLICIDADE ---
        // Se a linha estiver oculta (display: none ou dentro de um pai oculto), ignora.
        if (row.offsetParent === null) return; 

        const checkbox = row.querySelector('.row-select');
        const qtyInput = row.querySelector('.qty-input');
        const subtotalEl = row.querySelector('.row-subtotal');
        const cost = parseFloat(row.dataset.cost || 0);
        const qty = parseInt(qtyInput.value || 0);

        if (checkbox.checked) {
            const subtotal = cost * qty;
            total += subtotal;
            if (subtotalEl) subtotalEl.textContent = `R$ ${subtotal.toFixed(2)}`;
            row.classList.remove('opacity-50', 'bg-gray-50');
        } else {
            row.classList.add('opacity-50', 'bg-gray-50');
        }
    });

    const totalEl = document.getElementById('total-purchase-cost');
    if(totalEl) totalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// --- FUNÇÃO DE GERAÇÃO DE PDF (PROFISSIONAL) ---
async function generatePDF(dataObj, isQuote = false) {
    if (!window.jspdf) {
        alert("Erro: Biblioteca PDF não carregada.");
        return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const today = new Date().toLocaleDateString('pt-BR');
    
    // Configurações de cores
    const primaryColor = isQuote ? [100, 116, 139] : [22, 163, 74]; // Azul acinzentado (Quote) ou Verde (Pedido)
    
    // --- CABEÇALHO ---
    // Título Principal
    doc.setFontSize(22);
    doc.setTextColor(...primaryColor);
    doc.setFont("helvetica", "bold");
    const title = isQuote ? "SOLICITAÇÃO DE COTAÇÃO" : "PEDIDO DE COMPRA";
    doc.text(title, 14, 20);

    // Linha divisória
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.line(14, 25, 196, 25);

    // --- BLOCO DE INFORMAÇÕES (DE -> PARA) ---
    doc.setFontSize(10);
    doc.setTextColor(0);
    
    // Lado Esquerdo: "De" (Estabelecimento)
    doc.setFont("helvetica", "bold");
    doc.text("DE:", 14, 35);
    doc.setFont("helvetica", "normal");
    doc.text(state.establishmentName || "Nossa Empresa", 14, 40);
    doc.text(`Data: ${today}`, 14, 45);

    // Lado Direito: "Para" (Fornecedor)
    doc.setFont("helvetica", "bold");
    doc.text("PARA:", 110, 35);
    doc.setFont("helvetica", "normal");
    doc.text(dataObj.info.name || "Fornecedor", 110, 40);
    if(dataObj.info.email) doc.text(`Email: ${dataObj.info.email}`, 110, 45);
    if(dataObj.info.phone) doc.text(`Tel: ${dataObj.info.phone}`, 110, 50);

    // --- TEXTO INTRODUTÓRIO ---
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    const introText = isQuote 
        ? "Por favor, enviem os vossos melhores preços e condições para os itens listados abaixo." 
        : "Confirmação de pedido de compra conforme os itens e quantidades abaixo.";
    doc.text(introText, 14, 65);

    // --- TABELA DE ITENS ---
    const tableColumns = isQuote 
        ? ['Produto', 'Quantidade Solicitada'] 
        : ['Produto', 'Qtd.', 'V. Unitário', 'V. Total'];

    const tableBody = dataObj.items.map(item => {
        if(isQuote) {
            return [item.name, item.qty.toString()];
        } else {
            return [
                item.name, 
                item.qty.toString(), 
                `R$ ${item.cost.toFixed(2)}`, 
                `R$ ${(item.qty * item.cost).toFixed(2)}`
            ];
        }
    });

    doc.autoTable({
        startY: 75,
        head: [tableColumns],
        body: tableBody,
        theme: 'striped',
        headStyles: { 
            fillColor: primaryColor, 
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            halign: 'left'
        },
        styles: { 
            fontSize: 10, 
            cellPadding: 3,
            valign: 'middle'
        },
        columnStyles: isQuote ? {} : {
            1: { halign: 'center' },
            2: { halign: 'right' },
            3: { halign: 'right', fontStyle: 'bold' }
        },
        foot: !isQuote ? [
            ['', '', 'TOTAL DO PEDIDO:', { content: `R$ ${tableBody.reduce((acc, row) => acc + parseFloat(row[3].replace('R$ ','')), 0).toFixed(2)}`, styles: { halign: 'right', fontStyle: 'bold', fillColor: [240, 240, 240], textColor: [0,0,0] } }]
        ] : null
    });

    // --- RODAPÉ ---
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(`Gerado por Kairos - Página ${i} de ${pageCount}`, 196, 290, { align: 'right' });
    }

    const cleanName = dataObj.info.name.replace(/[^a-zA-Z0-9]/g, '_');
    const fileName = `${isQuote ? 'Cotacao' : 'Pedido'}_${cleanName}_${today.replace(/\//g, '-')}.pdf`;
    doc.save(fileName);
    showNotification("Sucesso", "PDF gerado com sucesso!", "success");
}

// --- 6. MODAL DE FORNECEDORES (Moderno e Responsivo) ---

function openSupplierModal(supplier = null) {
    const html = `
        <form id="supplierForm" class="space-y-4">
            <input type="hidden" id="supId" value="${supplier?.id || ''}">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="col-span-1 md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa *</label>
                    <input type="text" id="supName" value="${supplier?.name || ''}" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow" placeholder="Ex: Distribuidora Beleza">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                    <select id="supCategory" class="w-full p-3 border border-gray-300 rounded-lg outline-none bg-white">
                        <option value="Produtos" ${supplier?.category === 'Produtos' ? 'selected' : ''}>Produtos</option>
                        <option value="Equipamentos" ${supplier?.category === 'Equipamentos' ? 'selected' : ''}>Equipamentos</option>
                        <option value="Serviços" ${supplier?.category === 'Serviços' ? 'selected' : ''}>Serviços</option>
                        <option value="Outros" ${supplier?.category === 'Outros' ? 'selected' : ''}>Outros</option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nome Contato</label>
                    <input type="text" id="supContact" value="${supplier?.contactName || ''}" class="w-full p-3 border border-gray-300 rounded-lg outline-none" placeholder="Ex: João Silva">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label>
                    <input type="tel" id="supPhone" value="${supplier?.phone || ''}" class="w-full p-3 border border-gray-300 rounded-lg outline-none" placeholder="(00) 00000-0000">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" id="supEmail" value="${supplier?.email || ''}" class="w-full p-3 border border-gray-300 rounded-lg outline-none" placeholder="contato@empresa.com">
                </div>

                <div class="col-span-1 md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">CNPJ / CPF</label>
                    <input type="text" id="supTaxId" value="${supplier?.taxId || ''}" class="w-full p-3 border border-gray-300 rounded-lg outline-none">
                </div>
            </div>

            <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <button type="button" class="modal-close w-full md:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-colors">Cancelar</button>
                <button type="submit" class="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold shadow-md hover:bg-indigo-700 transition-colors">
                    ${supplier ? 'Atualizar Dados' : 'Salvar Fornecedor'}
                </button>
            </div>
        </form>
    `;
    
    showGenericModal({ 
        title: supplier ? 'Editar Fornecedor' : 'Novo Fornecedor', 
        contentHTML: html, 
        maxWidth: 'max-w-lg' 
    });
    
    setTimeout(() => { 
        document.getElementById('supplierForm').addEventListener('submit', handleSupplierFormSubmit);
        document.querySelector('#genericModal .modal-close').addEventListener('click', () => closeModal('genericModal'));
    }, 50);
}

// --- 7. INICIALIZAÇÃO DA PÁGINA ---

export function loadSuppliersPage() {
    contentDiv.innerHTML = `
        <section class="p-4 sm:p-6 pb-24">
            <div class="bg-white rounded-lg shadow-md min-h-[500px]">
                <div class="border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6">
                    <nav class="flex space-x-6 overflow-x-auto w-full sm:w-auto no-scrollbar" aria-label="Tabs">
                        <button id="tab-btn-list" class="tab-btn whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-indigo-500 text-indigo-600 transition-colors">Fornecedores</button>
                        <button id="tab-btn-purchases" class="tab-btn whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors">Compras</button>
                        <button id="tab-btn-history" class="tab-btn whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors">Histórico</button>
                    </nav>
                    <button id="btn-new-supplier" class="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm flex items-center justify-center gap-2 my-2 sm:my-3 shadow-sm transition-transform active:scale-95 font-bold">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> 
                        <span>Novo Fornecedor</span>
                    </button>
                </div>
                <div class="p-4 sm:p-6">
                    <div id="tab-content-list" class="block">
                        <div class="mb-4 relative">
                            <input type="text" id="supplierSearchInput" placeholder="Buscar..." class="border border-gray-300 rounded-lg p-3 pl-10 text-sm w-full focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow">
                            <svg class="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
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
        if (e.target.id === 'supplierSearchInput') renderListTab();
        if (e.target.closest('#btn-new-supplier')) openSupplierModal();

        // Ações de Item da Lista (Mobile)
        if (e.target.closest('.supplier-item-mobile')) {
            const item = e.target.closest('.supplier-item-mobile');
            const supplier = JSON.parse(item.dataset.supplier);
            openSupplierDetailsSheet(supplier);
        }

        // CRUD Desktop
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

        // --- FLUXO DE COMPRAS E COTAÇÕES ---
        if (e.target.closest('#btn-go-to-orders')) {
            const rows = document.querySelectorAll('.product-row');
            const finalOrders = {};
            let hasSelection = false;

            rows.forEach(row => {
                if (row.offsetParent === null) return; // Ignora linhas ocultas

                const checkbox = row.querySelector('.row-select');
                if (!checkbox.checked) return;
                hasSelection = true;

                let productName = "Produto";
                const desktopName = row.querySelector('td:nth-child(2)');
                const mobileName = row.querySelector('.font-bold');

                if (desktopName) productName = desktopName.innerText;
                else if (mobileName) productName = mobileName.innerText;
                
                const qty = parseInt(row.querySelector('.qty-input').value);
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

        // --- ENVIAR PEDIDO/COTAÇÃO ---
        if (e.target.closest('.btn-send-order')) {
            const btn = e.target.closest('.btn-send-order');
            const supplierInfo = JSON.parse(decodeURIComponent(btn.dataset.supplierInfo));
            const items = JSON.parse(decodeURIComponent(btn.dataset.orderItems));
            const total = parseFloat(btn.dataset.total);
            const isQuote = purchaseFlowState.isQuoteMode;

            // 1. Tentar WhatsApp (Prioridade Mobile)
            if (supplierInfo.phone) {
                const phone = supplierInfo.phone.replace(/\D/g, ''); 
                let message = "";
                
                if (isQuote) {
                    message = `Olá *${supplierInfo.name}*, tudo bem?\n\nGostaria de solicitar uma *cotação* para os seguintes itens:\n\n`;
                    items.forEach(item => {
                        message += `- ${item.qty}x ${item.name}\n`;
                    });
                    message += `\nAguardo o retorno. Obrigado!`;
                } else {
                    message = `Olá *${supplierInfo.name}*, gostaria de realizar o seguinte *pedido*:\n\n`;
                    message += `*ITENS:*\n`;
                    items.forEach(item => {
                        message += `- ${item.qty}x ${item.name}\n`;
                    });
                    // message += `\n*Valor Total Estimado:* R$ ${total.toFixed(2)}\n\n`; // Opcional no pedido
                    message += `\nAguardo confirmação.`;
                }

                const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                window.open(url, '_blank');
                
                showNotification("Aberto", "WhatsApp aberto.", "success");
            } 
            // 2. Fallback para Email
            else if (supplierInfo.email) {
                const subject = isQuote 
                    ? `Solicitação de Cotação - ${state.establishmentName || 'Empresa'}`
                    : `Pedido de Compra - ${state.establishmentName || 'Empresa'}`;
                
                let body = `Olá ${supplierInfo.name},\n\n`;
                
                if (isQuote) {
                    body += `Gostaria de solicitar uma cotação para os itens abaixo:\n\n`;
                } else {
                    body += `Gostaria de realizar o seguinte pedido:\n\n`;
                }

                items.forEach(item => {
                    body += `- ${item.qty}x ${item.name}\n`;
                });
                
                if (!isQuote) {
                    body += `\nValor Total Estimado: R$ ${total.toFixed(2)}`;
                }
                
                body += `\n\nAguardo retorno.`;

                const url = `mailto:${supplierInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                window.location.href = url;
            } else {
                showNotification("Erro", "Fornecedor sem telefone ou email cadastrado.", "error");
            }
        }

        // --- REGISTRAR COMPRA ---
        if (e.target.closest('.btn-register-order')) {
            const btn = e.target.closest('.btn-register-order');
            const orderData = JSON.parse(decodeURIComponent(btn.dataset.order));
            
            orderData.establishmentId = state.establishmentId;

            suppliersApi.registerPurchase(orderData).then(() => {
                showNotification("Sucesso", "Compra registrada no histórico!", "success");
                btn.disabled = true; 
                btn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Registrado`;
                btn.classList.replace('bg-blue-600', 'bg-green-600');
                btn.classList.replace('hover:bg-blue-700', 'hover:bg-green-700');
            }).catch(err => {
                showNotification("Erro", "Falha ao registrar compra: " + err.message, "error");
            });
        }

        // Imprimir Pedido/Cotação Final (CORRIGIDO PARA USAR DADOS REAIS)
        if (e.target.closest('.btn-print-order')) {
            const card = e.target.closest('.supplier-order-card');
            const supId = card.dataset.supplierId;
            const orderData = purchaseFlowState.finalOrders[supId];

            if (orderData) {
                generatePDF(orderData, purchaseFlowState.isQuoteMode);
            } else {
                showNotification("Erro", "Dados do pedido não encontrados.", "error");
            }
        }

        // --- AÇÕES DO HISTÓRICO ---
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

    const btnNew = document.getElementById('btn-new-supplier');
    if (btnNew) {
        if (tab === 'list') {
            btnNew.classList.remove('hidden');
        } else {
            btnNew.classList.add('hidden');
        }
    }

    fetchSuppliers();
}