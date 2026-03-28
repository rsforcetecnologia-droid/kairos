// js/ui/hierarchy.js

import { getHierarchy, createEconomicGroup, createCompany, createBranch } from '../api/establishments.js';
import { state } from '../state.js';

export async function renderHierarchyScreen(container) {
    container.innerHTML = `
        <div class="flex items-center justify-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    `;

    try {
        // Busca a estrutura no backend
        const payload = await getHierarchy();
        const { group, companies, branches } = payload;

        let html = `
            <div class="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 class="text-2xl font-bold text-gray-800">Hierarquia da Rede</h2>
                    <p class="text-sm text-gray-500">Faça a gestão de empresas e filiais do seu grupo económico.</p>
                </div>
                <div class="flex gap-2">
                    ${group ? `<button id="btn-new-company" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">+ Nova Empresa</button>` : ''}
                    ${companies && companies.length > 0 ? `<button id="btn-new-branch" class="bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">+ Nova Filial</button>` : ''}
                </div>
            </div>
            <div class="space-y-6">
        `;

        // Se NÃO tiver Grupo (Nível 1), exige criar primeiro
        if (!group) {
            html += `
                <div class="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300 shadow-sm">
                    <div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">Bem-vindo à Gestão Multi-Lojas</h3>
                    <p class="text-gray-500 max-w-md mx-auto mb-6">Para começar a estruturar sua rede, crie o seu <b>Grupo Económico</b> (a marca principal ou holding que gerenciará todas as empresas e filiais).</p>
                    <button id="btn-create-group" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-bold transition-colors shadow-md">
                        Criar Meu Grupo Económico
                    </button>
                </div>
            `;
        } else {
            // Renderiza o cabeçalho do Grupo
            html += `
                <div class="bg-gray-800 rounded-xl p-4 text-white flex items-center justify-between shadow-md">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        </div>
                        <div>
                            <p class="text-xs text-gray-400 font-bold uppercase tracking-wider">Grupo Económico Principal</p>
                            <h3 class="text-lg font-bold">${group.name}</h3>
                        </div>
                    </div>
                </div>
            `;

            // Renderiza Empresas e suas Filiais
            if (companies && companies.length > 0) {
                companies.forEach(company => {
                    const companyBranches = branches.filter(b => b.companyId === company.id);

                    html += `
                        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div class="bg-gray-50 border-b border-gray-200 p-4 flex justify-between items-center">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 bg-indigo-100 text-indigo-600 rounded flex items-center justify-center font-bold text-sm">
                                        ${company.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 class="text-md font-bold text-gray-800">${company.name}</h4>
                                        <p class="text-xs text-gray-500">CNPJ: ${company.cnpj || 'Não informado'}</p>
                                    </div>
                                </div>
                                <span class="bg-white text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200 text-gray-600">${companyBranches.length} Filial(is)</span>
                            </div>
                            
                            <div class="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    `;

                    if (companyBranches.length > 0) {
                        companyBranches.forEach(branch => {
                            html += `
                                <div class="border border-gray-100 rounded-lg p-4 hover:border-indigo-300 transition-colors cursor-pointer group relative overflow-hidden">
                                    <div class="absolute top-0 left-0 w-1 h-full ${branch.status === 'active' ? 'bg-green-500' : 'bg-red-500'}"></div>
                                    <div class="flex justify-between items-start mb-2 pl-2">
                                        <h5 class="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">${branch.name}</h5>
                                    </div>
                                    <p class="text-xs text-gray-500 mb-1 flex items-center gap-1 pl-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                                        ${branch.address || 'Endereço não definido'}
                                    </p>
                                    <p class="text-xs text-gray-500 flex items-center gap-1 pl-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                        ${branch.phone || 'Sem telefone'}
                                    </p>
                                </div>
                            `;
                        });
                    } else {
                        html += `<p class="text-sm text-gray-400 italic col-span-full py-2">Nenhuma filial cadastrada nesta empresa.</p>`;
                    }

                    html += `</div></div>`;
                });
            } else {
                html += `
                    <div class="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        <h3 class="text-lg font-medium text-gray-900">Nenhuma empresa encontrada</h3>
                        <p class="mt-1 text-sm text-gray-500">Comece criando sua primeira Empresa Matriz no botão acima.</p>
                    </div>
                `;
            }
        }

        html += `</div>`; // Fecha space-y-6

        // Modais Ocultos para Cadastro
        html += `
            <div id="modal-company" class="fixed inset-0 z-[1000] hidden flex items-center justify-center bg-black bg-opacity-50">
                <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6 mx-4">
                    <h3 class="text-xl font-bold mb-4 text-gray-800">Nova Empresa</h3>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Nome Fantasia / Razão Social *</label>
                            <input type="text" id="comp-name" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">CNPJ</label>
                            <input type="text" id="comp-cnpj" placeholder="00.000.000/0000-00" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>
                    </div>
                    <div class="mt-6 flex justify-end gap-3">
                        <button id="btn-close-comp" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Cancelar</button>
                        <button id="btn-save-comp" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium">Salvar</button>
                    </div>
                </div>
            </div>

            <div id="modal-branch" class="fixed inset-0 z-[1000] hidden flex items-center justify-center bg-black bg-opacity-50">
                <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6 mx-4">
                    <h3 class="text-xl font-bold mb-4 text-gray-800">Nova Filial</h3>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Empresa Pertencente *</label>
                            <select id="branch-company" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none">
                                ${(companies || []).map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Nome da Filial *</label>
                            <input type="text" id="branch-name" placeholder="Ex: Filial Centro" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none">
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                                <input type="text" id="branch-phone" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Fuso Horário</label>
                                <select id="branch-timezone" class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none">
                                    <option value="America/Sao_Paulo">Brasília (BRT)</option>
                                    <option value="America/Manaus">Manaus (AMT)</option>
                                    <option value="Europe/Lisbon">Lisboa (WET)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="mt-6 flex justify-end gap-3">
                        <button id="btn-close-branch" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Cancelar</button>
                        <button id="btn-save-branch" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium">Criar Filial</button>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;

        // --- LÓGICA DOS EVENTOS ---
        
        // 1. Criar Grupo Económico (Se não existir)
        const btnCreateGroup = document.getElementById('btn-create-group');
        if (btnCreateGroup) {
            btnCreateGroup.onclick = async () => {
                const name = prompt("Qual o nome da sua Marca ou Grupo Principal? (Ex: Grupo Kairos)");
                if (name && name.trim() !== '') {
                    btnCreateGroup.innerText = "Criando...";
                    try {
                        await createEconomicGroup(name.trim());
                        renderHierarchyScreen(container); // Recarrega a tela, agora com o grupo criado!
                    } catch(e) {
                        alert(e.message);
                        btnCreateGroup.innerText = "Criar Meu Grupo Económico";
                    }
                }
            };
        }

        // 2. Modal Empresa
        const btnNewComp = document.getElementById('btn-new-company');
        const modalComp = document.getElementById('modal-company');
        if(btnNewComp && modalComp) {
            btnNewComp.onclick = () => { modalComp.classList.remove('hidden'); document.getElementById('comp-name').value = ''; };
            document.getElementById('btn-close-comp').onclick = () => modalComp.classList.add('hidden');
            
            document.getElementById('btn-save-comp').onclick = async () => {
                const name = document.getElementById('comp-name').value.trim();
                const cnpj = document.getElementById('comp-cnpj').value.trim();
                if(!name) return alert('O nome da empresa é obrigatório.');
                
                document.getElementById('btn-save-comp').innerText = 'Salvando...';
                try {
                    await createCompany(name, cnpj, group.id);
                    renderHierarchyScreen(container);
                } catch(e) {
                    alert(e.message);
                    document.getElementById('btn-save-comp').innerText = 'Salvar';
                }
            };
        }

        // 3. Modal Filial
        const btnNewBranch = document.getElementById('btn-new-branch');
        const modalBranch = document.getElementById('modal-branch');
        if(btnNewBranch && modalBranch) {
            btnNewBranch.onclick = () => {
                if(!companies || companies.length === 0) return alert('Crie uma empresa primeiro.');
                modalBranch.classList.remove('hidden');
                document.getElementById('branch-name').value = '';
            };
            document.getElementById('btn-close-branch').onclick = () => modalBranch.classList.add('hidden');

            document.getElementById('btn-save-branch').onclick = async () => {
                const companyId = document.getElementById('branch-company').value;
                const name = document.getElementById('branch-name').value.trim();
                const phone = document.getElementById('branch-phone').value.trim();
                const timezone = document.getElementById('branch-timezone').value;
                
                if(!name) return alert('O nome da filial é obrigatório.');

                document.getElementById('btn-save-branch').innerText = 'Criando...';
                try {
                    await createBranch({ name, companyId, groupId: group.id, phone, timezone });
                    renderHierarchyScreen(container);
                } catch(e) {
                    alert(e.message);
                    document.getElementById('btn-save-branch').innerText = 'Criar Filial';
                }
            };
        }

    } catch (error) {
        console.error(error);
        container.innerHTML = `
            <div class="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-3 border border-red-200">
                <span>Erro ao carregar hierarquia: ${error.message}</span>
            </div>
        `;
    }
}