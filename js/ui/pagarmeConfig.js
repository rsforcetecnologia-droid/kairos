// js/ui/pagarmeConfig.js

import { authenticatedFetch } from '../api/apiService.js';
import { showNotification } from '../components/modal.js';
import { escapeHTML } from '../utils.js';

/**
 * Renderiza e gere a interface de Onboarding do Pagar.me (Marketplace)
 * @param {HTMLElement} container - A div onde a interface será injetada
 */
export async function loadPagarmeConfig(container) {
    container.innerHTML = `
        <div class="flex items-center justify-center p-8">
            <div class="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
    `;

    try {
        // 1. Verifica o status atual do Recebedor
        let recipientData = null;
        try {
            recipientData = await authenticatedFetch('/api/pagarme/recipient');
        } catch (err) {
            // Se retornar 404, significa que ainda não configurou (comportamento esperado)
            if (!err.message.includes('404')) {
                throw err;
            }
        }

        // 2. Renderiza a Tela de Sucesso (Já Configurado)
        if (recipientData && recipientData.id) {
            container.innerHTML = `
                <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center shadow-sm max-w-2xl mx-auto mt-6">
                    <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="bi bi-shield-check text-3xl"></i>
                    </div>
                    <h2 class="text-xl font-bold text-emerald-800 mb-2">Conta de Pagamentos Ativa!</h2>
                    <p class="text-emerald-600 text-sm mb-4">O seu estabelecimento já está configurado para receber pagamentos online e assinaturas.</p>
                    
                    <div class="bg-white rounded-xl p-4 inline-block text-left border border-emerald-100">
                        <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">ID do Recebedor (Pagar.me)</p>
                        <p class="text-sm font-mono font-bold text-gray-700">${escapeHTML(recipientData.id)}</p>
                    </div>
                </div>
            `;
            return;
        }

        // 3. Renderiza o Formulário de Onboarding
        container.innerHTML = `
            <div class="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mt-6">
                <div class="bg-indigo-600 p-6 text-white">
                    <h2 class="text-xl font-bold flex items-center gap-2"><i class="bi bi-bank"></i> Configurar Recebimentos</h2>
                    <p class="text-indigo-100 text-sm mt-1">Preencha os dados bancários do estabelecimento para habilitar o pagamento de assinaturas via PIX e Cartão.</p>
                </div>
                
                <form id="pagarmeOnboardingForm" class="p-6 md:p-8 space-y-6">
                    <div>
                        <h3 class="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2 mb-4">Dados da Empresa / Titular</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Tipo de Conta</label>
                                <select id="pgType" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:border-indigo-500 outline-none" required>
                                    <option value="company">Pessoa Jurídica (CNPJ)</option>
                                    <option value="individual">Pessoa Física (CPF)</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">CPF / CNPJ</label>
                                <input type="text" id="pgDocument" placeholder="Somente números" class="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:border-indigo-500 outline-none" required>
                            </div>
                            <div class="md:col-span-2">
                                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nome Completo ou Razão Social</label>
                                <input type="text" id="pgName" class="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:border-indigo-500 outline-none" required>
                            </div>
                            <div class="md:col-span-2">
                                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email de Contato</label>
                                <input type="email" id="pgEmail" class="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:border-indigo-500 outline-none" required>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2 mb-4">Conta Bancária para Repasse</h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div class="md:col-span-3">
                                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Banco (Código 3 dígitos)</label>
                                <select id="pgBankCode" class="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:border-indigo-500 outline-none" required>
                                    <option value="341">Itaú (341)</option>
                                    <option value="001">Banco do Brasil (001)</option>
                                    <option value="104">Caixa Econômica (104)</option>
                                    <option value="237">Bradesco (237)</option>
                                    <option value="033">Santander (033)</option>
                                    <option value="260">Nubank (260)</option>
                                    <option value="077">Inter (077)</option>
                                    <option value="336">C6 Bank (336)</option>
                                    <option value="000">Outro (Digitar código...)</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Agência (Sem dígito)</label>
                                <input type="text" id="pgBranch" placeholder="Ex: 0001" class="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:border-indigo-500 outline-none" required>
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Conta</label>
                                <input type="text" id="pgAccount" placeholder="Ex: 12345" class="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:border-indigo-500 outline-none" required>
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Dígito da Conta</label>
                                <input type="text" id="pgAccountDigit" placeholder="Ex: 6" class="w-full p-3 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:border-indigo-500 outline-none" required>
                            </div>
                        </div>
                        <p class="text-[10px] text-gray-400 mt-3 font-semibold">* O CPF/CNPJ da conta bancária deve ser exatamente o mesmo informado nos dados da empresa acima.</p>
                    </div>

                    <div class="pt-4 flex justify-end">
                        <button type="submit" id="btnSubmitOnboarding" class="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 active:scale-95 transition-all flex items-center gap-2">
                            <i class="bi bi-check2-circle"></i> Criar Conta Recebedor
                        </button>
                    </div>
                </form>
            </div>
        `;

        // 4. Adiciona Lógica de Envio (Submit)
        const form = document.getElementById('pagarmeOnboardingForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('btnSubmitOnboarding');
            
            const bankCodeStr = document.getElementById('pgBankCode').value;
            // Validação simples: se for '000', poderiamos abrir um input de texto (simplificado aqui para o exemplo)
            const finalBankCode = bankCodeStr === '000' ? prompt("Digite o código do banco de 3 dígitos:") : bankCodeStr;

            if (!finalBankCode) return;

            const payload = {
                name: document.getElementById('pgName').value.trim(),
                email: document.getElementById('pgEmail').value.trim(),
                document: document.getElementById('pgDocument').value.replace(/\D/g, ''),
                type: document.getElementById('pgType').value,
                bankAccount: {
                    holder_name: document.getElementById('pgName').value.trim(),
                    holder_type: document.getElementById('pgType').value,
                    holder_document: document.getElementById('pgDocument').value.replace(/\D/g, ''),
                    bank: finalBankCode,
                    branch_number: document.getElementById('pgBranch').value.trim(),
                    account_number: document.getElementById('pgAccount').value.trim(),
                    account_check_digit: document.getElementById('pgAccountDigit').value.trim()
                }
            };

            try {
                btn.disabled = true;
                btn.innerHTML = '<div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Processando...';
                
                // Chamada à API que criámos no Passo 1
                await authenticatedFetch('/api/pagarme/onboarding', {
                    method: 'POST',
                    body: JSON.stringify(payload)
                });

                showNotification('Sucesso', 'Conta de pagamentos configurada com sucesso!', 'success');
                // Recarrega o painel para mostrar a tela verde de sucesso
                loadPagarmeConfig(container);

            } catch (error) {
                btn.disabled = false;
                btn.innerHTML = '<i class="bi bi-check2-circle"></i> Criar Conta Recebedor';
                showNotification('Erro no Cadastro', error.message || 'Verifique os dados bancários e tente novamente.', 'error');
            }
        });

    } catch (error) {
        container.innerHTML = `
            <div class="text-center py-12">
                <i class="bi bi-exclamation-triangle text-rose-500 text-4xl mb-3"></i>
                <p class="text-gray-600 font-bold">Erro ao carregar configurações financeiras.</p>
            </div>
        `;
    }
}