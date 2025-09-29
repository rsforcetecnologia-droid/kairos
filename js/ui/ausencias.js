// js/ui/ausencias.js

// --- 1. IMPORTAÇÕES ---
import * as blockagesApi from '../api/blockages.js';
import * as professionalsApi from '../api/professionals.js';
import { state } from '../state.js';
import { showNotification, showConfirmation } from '../components/modal.js';
import { navigateTo } from '../main.js';

// --- 2. CONSTANTES E VARIÁVEIS DO MÓDULO ---
const contentDiv = document.getElementById('content');

// --- 3. FUNÇÕES DE LÓGICA E RENDERIZAÇÃO ---

async function fetchAndDisplayBlockages(professionalId) {
    const blockagesListDiv = document.getElementById('blockagesList');
    if (!blockagesListDiv) return;
    blockagesListDiv.innerHTML = '<div class="loader mx-auto"></div>';

    try {
        const filterStartDate = document.getElementById('filterStartDate')?.value;
        const filterEndDate = document.getElementById('filterEndDate')?.value;
        
        const blockages = await blockagesApi.getBlockagesByDateRange(
            state.establishmentId, 
            filterStartDate || new Date().toISOString().split('T')[0],
            filterEndDate || new Date().toISOString().split('T')[0],
            professionalId
        );

        const filterReason = document.getElementById('filterReason')?.value.toLowerCase();
        const filteredBlockages = filterReason ? blockages.filter(b => b.reason && b.reason.toLowerCase().includes(filterReason)) : blockages;

    // Agrupa os bloqueios por motivo
    const groupedByReason = filteredBlockages.reduce((acc, b) => {
        const reason = b.reason || 'Sem motivo';
        if (!acc[reason]) {
            acc[reason] = [];
        }
        acc[reason].push(b);
        return acc;
    }, {});


        blockagesListDiv.innerHTML = '';
        if (filteredBlockages.length === 0) {
            blockagesListDiv.innerHTML = '<p class="text-center text-gray-500">Nenhum bloqueio encontrado.</p>';
            return;
        }

        Object.entries(groupedByReason).forEach(([reason, group]) => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'bg-gray-100 rounded-lg p-3 my-2 space-y-2';
            
            let headerHTML = `<div class="flex justify-between items-center pb-2 border-b border-gray-200">
                                <h4 class="font-bold text-gray-700">${reason} (${group.length})</h4>`;
            
            if (group.length > 1) {
                const ids = JSON.stringify(group.map(b => b.id));
                headerHTML += `<button data-action="batch-delete-blockage" data-ids='${ids}' class="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1">
                                    Apagar Lote
                                </button>`;
            }

            headerHTML += '</div>';
            groupDiv.innerHTML = headerHTML;

            group.forEach(blockage => {
                const startDate = new Date(blockage.startTime);
                const endDate = new Date(blockage.endTime);
                
                const startDateString = startDate.toLocaleDateString('pt-BR');
                const endDateString = endDate.toLocaleDateString('pt-BR');
                
                const dateDisplay = (startDateString === endDateString)
                    ? `${startDateString} | ${startDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - ${endDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
                    : `De ${startDateString} às ${startDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}<br>Até ${endDateString} às ${endDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;

                const itemHTML = `
                    <div class="bg-white p-3 rounded-md flex items-center justify-between shadow-sm">
                        <div>
                            <p class="font-medium text-gray-800 text-sm">
                                ${dateDisplay}
                            </p>
                        </div>
                        <button class="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600" data-action="delete-blockage" data-id="${blockage.id}">Apagar</button>
                    </div>`;

                groupDiv.innerHTML += itemHTML;
            });

            blockagesListDiv.appendChild(groupDiv);
        });

    } catch (error) {
        blockagesListDiv.innerHTML = `<p class="text-center text-red-500">Erro: ${error.message}</p>`;
    }
}

async function handleBlockageFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const professionalId = form.querySelector('#blockageProfId').value;
    const blockageDate = form.querySelector('#blockageDate').value;
    const blockageEndDate = form.querySelector('#blockageEndDate').value || blockageDate;
    const startTime = form.querySelector('#blockageStartTime').value;
    const endTime = form.querySelector('#blockageEndTime').value;

    const blockageData = {
        establishmentId: state.establishmentId,
        professionalId,
        startTime: new Date(`${blockageDate}T${startTime}:00`).toISOString(),
        endTime: new Date(`${blockageEndDate}T${endTime}:00`).toISOString(),
        reason: form.querySelector('#blockageReason').value
    };

    try {
        await blockagesApi.createBlockage(blockageData);
        form.reset();
        showNotification('Sucesso', 'Bloqueio adicionado com sucesso!', 'success');
        fetchAndDisplayBlockages(professionalId);
    } catch (error) {
        showNotification('Erro', `Não foi possível criar o bloqueio: ${error.message}`, 'error');
    }
}

async function handleBatchBlockageFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const selectedProfIds = Array.from(form.querySelectorAll('input[name="batch-professionals"]:checked')).map(cb => cb.value);
    if (selectedProfIds.length === 0) return showNotification('Atenção', 'Selecione pelo menos um profissional.', 'error');

    const blockageDate = form.querySelector('#batchBlockageDate').value;
    const blockageEndDate = form.querySelector('#batchBlockageEndDate').value || blockageDate;
    const startTime = form.querySelector('#batchBlockageStartTime').value;
    const endTime = form.querySelector('#batchBlockageEndTime').value;
    const reason = form.querySelector('#batchBlockageReason').value;

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Aguarde...';

    const blockagePromises = selectedProfIds.map(profId => {
        const blockageData = {
            establishmentId: state.establishmentId,
            professionalId: profId,
            startTime: new Date(`${blockageDate}T${startTime}:00`).toISOString(),
            endTime: new Date(`${blockageEndDate}T${endTime}:00`).toISOString(),
            reason
        };
        return blockagesApi.createBlockage(blockageData);
    });

    try {
        await Promise.all(blockagePromises);
        showNotification('Sucesso', `${selectedProfIds.length} bloqueios foram criados com sucesso!`, 'success');
        form.reset();
        form.querySelectorAll('input[name="batch-professionals"]:checked').forEach(cb => cb.checked = false);
        const currentProfId = document.getElementById('blockageProfId').value;
        if (currentProfId) fetchAndDisplayBlockages(currentProfId);
    } catch (error) {
        showNotification('Erro', `Ocorreu um erro: ${error.message}`, 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Adicionar Bloqueio em Lote';
    }
}

// --- 4. EVENT LISTENERS E INICIALIZAÇÃO DA PÁGINA ---

function setupEventListeners(professionalId) {
    contentDiv.addEventListener('submit', e => {
        if (e.target.id === 'blockageForm') handleBlockageFormSubmit(e);
        if (e.target.id === 'batchBlockageForm') handleBatchBlockageFormSubmit(e);
    });

    contentDiv.addEventListener('input', e => {
        if (e.target.matches('#filterStartDate, #filterEndDate, #filterReason')) {
            fetchAndDisplayBlockages(professionalId);
        }
    });

    contentDiv.addEventListener('click', async e => {
        const button = e.target.closest('button[data-action]');
        if (!button) return;

        const action = button.dataset.action;
        if (action === 'back-to-professionals') {
            navigateTo('profissionais-section');
        } else if (action === 'delete-blockage') {
            const confirmed = await showConfirmation('Apagar Bloqueio', 'Tem a certeza que deseja apagar este bloqueio?');
            if (confirmed) {
                try {
                    await blockagesApi.deleteBlockage(button.dataset.id);
                    showNotification('Sucesso', 'Bloqueio removido.', 'success');
                    fetchAndDisplayBlockages(professionalId);
                } catch (error) {
                    showNotification('Erro', `Não foi possível remover o bloqueio: ${error.message}`, 'error');
                }
            }
        } else if (action === 'batch-delete-blockage') {
             const ids = JSON.parse(button.dataset.ids);
             const confirmed = await showConfirmation('Apagar Lote de Bloqueios', `Tem certeza que deseja apagar ${ids.length} bloqueios de uma vez?`);
             if (confirmed) {
                 try {
                     await blockagesApi.batchDeleteBlockages(ids);
                     showNotification('Sucesso', `${ids.length} bloqueios removidos.`, 'success');
                     fetchAndDisplayBlockages(professionalId);
                 } catch (error) {
                     showNotification('Erro', `Não foi possível apagar os bloqueios: ${error.message}`, 'error');
                 }
             }
         }
    });
}

// --- 5. FUNÇÃO PRINCIPAL EXPORTADA ---

export async function loadAusenciasPage(params) {
    const { professionalId, professionalName } = params;
    if (!professionalId || !professionalName) {
        contentDiv.innerHTML = `<p class="text-red-500 p-8">Erro: ID do profissional não fornecido.</p>`;
        return;
    }

    contentDiv.innerHTML = `
        <section>
            <div class="flex items-center mb-6">
                <button data-action="back-to-professionals" class="mr-4 p-2 rounded-full hover:bg-gray-200 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </button>
                <h2 class="text-3xl font-bold text-gray-800">Gerir Ausências</h2>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="space-y-8">
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-xl font-semibold mb-4 border-b pb-2">Bloqueio para <span class="text-indigo-600">${professionalName}</span></h3>
                        <form id="blockageForm" class="space-y-4">
                            <input type="hidden" id="blockageProfId" value="${professionalId}">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><label for="blockageDate" class="block text-sm font-medium text-gray-700">Data de Início</label><input type="date" id="blockageDate" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                                <div><label for="blockageEndDate" class="block text-sm font-medium text-gray-700">Data de Fim (opcional)</label><input type="date" id="blockageEndDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div><label for="blockageStartTime" class="block text-sm font-medium text-gray-700">Início</label><input type="time" id="blockageStartTime" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                                <div><label for="blockageEndTime" class="block text-sm font-medium text-gray-700">Fim</label><input type="time" id="blockageEndTime" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                            </div>
                            <div><label for="blockageReason" class="block text-sm font-medium text-gray-700">Motivo</label><input type="text" id="blockageReason" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Ex: Férias, Folga"></div>
                            <button type="submit" class="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">Adicionar Bloqueio</button>
                        </form>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-xl font-semibold mb-4 border-b pb-2">Lançamento em Lote</h3>
                        <form id="batchBlockageForm" class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Selecionar Profissionais</label>
                                <div id="batchProfSelectionContainer" class="mt-1 max-h-40 overflow-y-auto p-2 border rounded-md space-y-2"><div class="loader"></div></div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><label for="batchBlockageDate" class="block text-sm font-medium text-gray-700">Data de Início</label><input type="date" id="batchBlockageDate" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                                <div><label for="batchBlockageEndDate" class="block text-sm font-medium text-gray-700">Data de Fim (opcional)</label><input type="date" id="batchBlockageEndDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div><label for="batchBlockageStartTime" class="block text-sm font-medium text-gray-700">Início</label><input type="time" id="batchBlockageStartTime" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                                <div><label for="batchBlockageEndTime" class="block text-sm font-medium text-gray-700">Fim</label><input type="time" id="batchBlockageEndTime" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                            </div>
                            <div><label for="batchBlockageReason" class="block text-sm font-medium text-gray-700">Motivo</label><input type="text" id="batchBlockageReason" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Ex: Feriado, Evento"></div>
                            <button type="submit" class="w-full py-2 px-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition">Adicionar Bloqueio em Lote</button>
                        </form>
                    </div>
                </div>
                <div>
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-xl font-semibold mb-4 border-b pb-2">Bloqueios de ${professionalName}</h3>
                        <div id="blockage-filters" class="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                            <div><label for="filterStartDate" class="block text-sm font-medium text-gray-700">De</label><input type="date" id="filterStartDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                            <div><label for="filterEndDate" class="block text-sm font-medium text-gray-700">Até</label><input type="date" id="filterEndDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                            <div><label for="filterReason" class="block text-sm font-medium text-gray-700">Motivo</label><input type="text" id="filterReason" placeholder="Pesquisar motivo..." class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                        </div>
                        <div id="blockagesList" class="space-y-4 max-h-[60vh] overflow-y-auto pr-2"></div>
                    </div>
                </div>
            </div>
        </section>`;

    setupEventListeners(professionalId);
    await fetchAndDisplayBlockages(professionalId);

    // Preenche a lista de profissionais para o formulário em lote
    const batchProfContainer = document.getElementById('batchProfSelectionContainer');
    try {
        const allProfessionals = await professionalsApi.getProfessionals(state.establishmentId);
        batchProfContainer.innerHTML = allProfessionals.map(prof => `
            <div class="flex items-center">
                <input id="prof-batch-${prof.id}" value="${prof.id}" name="batch-professionals" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <label for="prof-batch-${prof.id}" class="ml-2 text-sm text-gray-700">${prof.name}</label>
            </div>`).join('');
    } catch (error) {
        batchProfContainer.innerHTML = '<p class="text-red-500">Erro ao carregar profissionais.</p>';
    }
}
