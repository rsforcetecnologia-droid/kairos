// js/ui/hierarchy.js

import { getHierarchy, createEstablishment } from '../api/establishments.js';

// Variável de controlo para evitar duplicar listeners de eventos
let isFormSetup = false;

/**
 * Renderiza a ecrã de Gestão da Rede (Matrizes e Filiais)
 * @param {HTMLElement} container - O contentor principal (#content)
 */
export async function renderHierarchyScreen(container) {
    if (!container) return;

    // 1. Define a estrutura base da tela
    container.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 class="text-xl font-bold text-gray-800 m-0">Gestão da Rede</h2>
                    <p class="text-sm text-gray-500">Clique numa unidade para gerir dados, módulos e identidade visual.</p>
                </div>
                <button class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center gap-2 transition-colors shadow-sm" 
                        data-bs-toggle="modal" data-bs-target="#modal-create-establishment">
                    <i class="bi bi-plus-lg"></i> Novo Estabelecimento
                </button>
            </div>
            
            <div id="hierarchy-list-container" class="space-y-6">
                <div class="text-center p-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <div class="inline-block animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mb-3" role="status"></div>
                    <p class="text-gray-500 font-medium">A carregar estrutura organizacional...</p>
                </div>
            </div>
        </div>
    `;

    const listContainer = document.getElementById('hierarchy-list-container');
    const parentSelect = document.getElementById('est-parent');

    try {
        // 2. Procura a hierarquia no Backend
        const payload = await getHierarchy();
        const matrizes = payload.matrizes || [];

        // 3. Prepara o seletor de vínculos no modal (apenas matrizes podem ser "pais")
        if (parentSelect) {
            parentSelect.innerHTML = '<option value="">Nenhuma (Criar como Matriz Independente)</option>';
        }

        if (matrizes.length === 0) {
            listContainer.innerHTML = `
                <div class="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300 shadow-sm">
                    <div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="bi bi-building-add text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">A sua rede está vazia</h3>
                    <p class="text-gray-500 max-w-md mx-auto mb-6">Comece por criar a sua primeira Matriz ou Loja principal para expandir o seu negócio.</p>
                </div>
            `;
        } else {
            let html = '';
            
            matrizes.forEach(matriz => {
                // Adiciona matrizes ao select para permitir vincular futuras filiais
                if (parentSelect && !matriz.isOrphanBranch) {
                    const option = document.createElement('option');
                    option.value = matriz.id;
                    option.textContent = matriz.name;
                    parentSelect.appendChild(option);
                }

                // Badge visual
                const badge = (matriz.isMatriz || !matriz.parentId) 
                    ? `<span class="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded ml-3 tracking-wider">🏢 MATRIZ</span>`
                    : `<span class="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded ml-3 tracking-wider">📍 UNIDADE</span>`;

                // 4. Constrói o Card da Matriz (Clicável)
                html += `
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 transition-all hover:border-indigo-400 group">
                        <div class="bg-gray-50 border-b border-gray-200 p-4 md:p-5 flex justify-between items-center cursor-pointer hover:bg-gray-100/50" 
                             onclick="window.navigateTo('estabelecimento-section', { id: '${matriz.id}' })">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-xl shadow-sm group-hover:scale-105 transition-transform">
                                    ${matriz.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h4 class="text-lg font-bold text-gray-800 flex items-center">
                                        ${matriz.name} ${badge}
                                    </h4>
                                    <p class="text-sm text-gray-500 mt-0.5">Clique para configurar esta unidade</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="text-xs text-gray-400 font-medium hidden md:block">Gerir Unidade</span>
                                <i class="bi bi-gear text-gray-400 text-xl group-hover:text-indigo-600 transition-colors"></i>
                            </div>
                        </div>
                        
                        <div class="p-4 md:p-5 bg-white border-l-4 border-l-indigo-500">
                            <h5 class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <i class="bi bi-diagram-3"></i> Unidades Vinculadas
                            </h5>
                            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                `;

                // 5. Constrói os Cards das Filiais (Clicáveis)
                if (matriz.branches && matriz.branches.length > 0) {
                    matriz.branches.forEach(branch => {
                        html += `
                            <div class="border border-gray-100 rounded-lg p-4 hover:border-indigo-300 transition-colors cursor-pointer bg-gray-50 flex justify-between items-center group/item"
                                 onclick="event.stopPropagation(); window.navigateTo('estabelecimento-section', { id: '${branch.id}' })">
                                <div class="pl-2 border-l-2 border-indigo-400">
                                    <h5 class="font-bold text-gray-800 text-sm group-hover/item:text-indigo-700 transition-colors">${branch.name}</h5>
                                    <p class="text-[11px] text-gray-500 mt-0.5 truncate max-w-[150px]">
                                        <i class="bi bi-geo-alt"></i> ${branch.address || 'Configurar morada'}
                                    </p>
                                </div>
                                <i class="bi bi-chevron-right text-gray-300 group-hover/item:text-indigo-500 transition-all"></i>
                            </div>
                        `;
                    });
                } else {
                    html += `
                        <div class="col-span-full py-4 text-center border border-dashed border-gray-100 rounded-lg bg-gray-50/30">
                            <p class="text-xs text-gray-400 italic">Nenhuma filial vinculada.</p>
                        </div>
                    `;
                }

                html += `
                            </div>
                        </div>
                    </div>
                `;
            });

            listContainer.innerHTML = html;
        }

        // 6. Ativa os eventos do formulário apenas uma vez
        if (!isFormSetup) {
            setupEstablishmentForm();
            isFormSetup = true;
        }

    } catch (error) {
        console.error("Erro na renderização da rede:", error);
        listContainer.innerHTML = `
            <div class="bg-red-50 text-red-600 p-6 rounded-lg border border-red-100 text-center">
                <i class="bi bi-exclamation-triangle text-2xl mb-2 block"></i>
                <p class="font-bold text-sm">Não foi possível carregar a estrutura organizacional.</p>
            </div>
        `;
    }
}

/**
 * Listener do Formulário de Criação (Modal no app.html)
 */
function setupEstablishmentForm() {
    const form = document.getElementById('form-create-establishment');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btnSubmit = form.querySelector('button[type="submit"]');
        const originalContent = btnSubmit.innerHTML;
        btnSubmit.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> A gravar...';
        btnSubmit.disabled = true;

        const payload = {
            name: document.getElementById('est-name').value.trim(),
            cnpj: document.getElementById('est-cnpj').value.trim(),
            parentId: document.getElementById('est-parent').value || null,
            timezone: document.getElementById('est-timezone').value
        };

        try {
            const res = await createEstablishment(payload);
            
            alert(res.message || "Sucesso!");
            form.reset();
            
            // Fecha o modal via Bootstrap
            const modalEl = document.getElementById('modal-create-establishment');
            const modalInstance = window.bootstrap?.Modal.getInstance(modalEl);
            if (modalInstance) modalInstance.hide();

            // Recarrega a tela de hierarquia para refletir a nova empresa
            await renderHierarchyScreen(document.getElementById('content'));

        } catch (error) {
            console.error("Erro ao criar estabelecimento:", error);
            alert("Erro: " + (error.message || "Falha ao gravar dados."));
        } finally {
            btnSubmit.innerHTML = originalContent;
            btnSubmit.disabled = false;
        }
    });
}

// Expõe globalmente para que cliques fora do módulo possam aceder
window.loadAndRenderHierarchy = () => renderHierarchyScreen(document.getElementById('content'));