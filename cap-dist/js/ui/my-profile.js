// js/ui/my-profile.js

import * as professionalsApi from '../api/professionals.js';
import * as blockagesApi from '../api/blockages.js';
import { state } from '../state.js';
import { showNotification } from '../components/modal.js';
import { auth } from '../firebase-config.js';

const contentDiv = document.getElementById('content');

let currentUserProfessionalData = null; 

export async function loadMyProfilePage() {
    contentDiv.innerHTML = `
        <div class="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Meu Perfil
            </h2>
        </div>
        <div id="my-profile-content" class="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div class="md:col-span-1">
                <div class="p-4 md:p-6 bg-white rounded-lg shadow-md">
                    <div class="flex flex-col items-center justify-center py-6">
                        <img id="user-profile-avatar" 
                             src="https://placehold.co/128x128/E2E8F0/4A5568?text=${state.userName ? state.userName.charAt(0) : 'U'}" 
                             alt="Avatar do Usuário" 
                             class="w-32 h-32 rounded-full object-cover border-4 border-indigo-200">
                        <h3 class="text-2xl font-bold text-gray-800 mt-4">${state.userName || 'Usuário'}</h3>
                        <p class="text-md text-gray-600">${auth.currentUser.email || 'E-mail não disponível'}</p>
                    </div>
                </div>
            </div>

            <div class="md:col-span-2">
                 <div id="professional-agenda-block" class="p-4 md:p-6 bg-white rounded-lg shadow-md space-y-6">
                    <div class="flex justify-center items-center h-full"><div class="loader"></div></div>
                </div>
            </div>
        </div>
    `;

    await renderProfessionalSection();
}

async function renderProfessionalSection() {
    const professionalAgendaBlock = document.getElementById('professional-agenda-block');
    professionalAgendaBlock.innerHTML = ''; 

    try {
        const professionalId = state.userProfessionalId;

        if (professionalId) {
            const professional = await professionalsApi.getProfessional(professionalId);
            currentUserProfessionalData = professional;

            if (professional.photo) {
                document.getElementById('user-profile-avatar').src = professional.photo;
            }

            professionalAgendaBlock.innerHTML = `
                <div class="bg-indigo-50 p-4 rounded-lg flex items-center gap-4 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                        <p class="font-semibold text-indigo-800">Você está associado ao profissional: ${professional.name}</p>
                        <p class="text-sm text-indigo-700">Use esta seção para gerenciar sua própria agenda rapidamente.</p>
                    </div>
                </div>

                <div class="mt-8">
                    <h4 class="text-xl font-bold text-gray-800 mb-4">Bloquear Agenda Rapidamente</h4>
                    <p class="text-sm text-gray-600 mb-4">Selecione uma data e horário para criar um bloqueio. Isso impedirá que agendamentos sejam criados nesse intervalo.</p>
                    <form id="block-schedule-form" class="space-y-4">
                        <div>
                            <label for="blockDate" class="block text-sm font-medium text-gray-700">Data do Bloqueio</label>
                            <input type="date" id="blockDate" class="mt-1 w-full p-2 border border-gray-300 rounded-md" required>
                        </div>
                        <div class="flex gap-4">
                            <div class="flex-1">
                                <label for="blockStartTime" class="block text-sm font-medium text-gray-700">Hora Início</label>
                                <input type="time" id="blockStartTime" class="mt-1 w-full p-2 border border-gray-300 rounded-md" value="09:00" required>
                            </div>
                            <div class="flex-1">
                                <label for="blockEndTime" class="block text-sm font-medium text-gray-700">Hora Fim</label>
                                <input type="time" id="blockEndTime" class="mt-1 w-full p-2 border border-gray-300 rounded-md" value="18:00" required>
                            </div>
                        </div>
                        <div>
                            <label for="blockReason" class="block text-sm font-medium text-gray-700">Motivo (Opcional)</label>
                            <input type="text" id="blockReason" class="mt-1 w-full p-2 border border-gray-300 rounded-md" placeholder="Ex: Consulta médica, folga, etc.">
                        </div>
                        <button type="submit" class="w-full bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition">Bloquear Agenda</button>
                    </form>
                </div>

                <div class="mt-8 pt-6 border-t border-gray-200">
                    <div class="flex justify-between items-center mb-4">
                        <h4 class="text-xl font-bold text-gray-800">Meus Bloqueios</h4>
                        <select id="my-blocks-filter" class="p-2 border rounded-md text-sm bg-white">
                            <option value="future">Futuros</option>
                            <option value="history">Histórico (Passados)</option>
                        </select>
                    </div>
                    <div id="my-blocks-list" class="space-y-3">
                        <p class="text-gray-500">A carregar bloqueios...</p>
                    </div>
                </div>
            `;
            
            setupBlockForm(professional.id);
            
            // Listener do filtro
            const filterSelect = document.getElementById('my-blocks-filter');
            filterSelect.addEventListener('change', (e) => loadMyBlocks(professional.id, e.target.value));
            
            // Carregamento inicial (Futuros)
            loadMyBlocks(professional.id, 'future');

        } else {
            professionalAgendaBlock.innerHTML = `
                <div class="bg-gray-100 p-4 rounded-lg text-center text-gray-600">
                    <p>Você não possui um perfil de profissional associado a esta conta.</p>
                    <p class="text-sm mt-2">Para gerenciar sua agenda, peça ao administrador para associar seu usuário a um profissional existente na tela de "Usuários".</p>
                </div>
            `;
        }

    } catch (error) {
        console.error("Erro ao carregar seção de profissional:", error);
        professionalAgendaBlock.innerHTML = `
            <div class="bg-red-100 p-4 rounded-lg text-red-700">
                <p>Ocorreu um erro ao carregar os dados do profissional.</p>
                <p class="text-sm mt-2">${error.message}</p>
            </div>
        `;
    }
}

function setupBlockForm(professionalId) {
    const form = document.getElementById('block-schedule-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const blockDate = form.querySelector('#blockDate').value;
        const blockStartTime = form.querySelector('#blockStartTime').value;
        const blockEndTime = form.querySelector('#blockEndTime').value;
        const blockReason = form.querySelector('#blockReason').value;

        if (!blockDate || !blockStartTime || !blockEndTime) {
            showNotification('Erro', 'Por favor, preencha a data e os horários de início e fim.', 'error');
            return;
        }

        if (blockStartTime >= blockEndTime) {
            showNotification('Erro', 'A hora de início deve ser anterior à hora de fim.', 'error');
            return;
        }

        const startDateTime = new Date(`${blockDate}T${blockStartTime}:00`);
        const endDateTime = new Date(`${blockDate}T${blockEndTime}:00`);

        const saveButton = form.querySelector('button[type="submit"]');
        saveButton.disabled = true;
        saveButton.textContent = 'A bloquear...';

        try {
            await blockagesApi.createBlockage({
                establishmentId: state.establishmentId, 
                professionalId: professionalId,
                reason: blockReason || 'Bloqueado (Meu Perfil)',
                startTime: startDateTime.toISOString(),
                endTime: endDateTime.toISOString()
            });

            showNotification('Sucesso', 'Agenda bloqueada com sucesso!', 'success');
            form.reset();
            // Recarrega a lista respeitando o filtro atual
            const currentFilter = document.getElementById('my-blocks-filter').value;
            loadMyBlocks(professionalId, currentFilter); 
        } catch (error) {
            console.error("Erro ao bloquear agenda:", error);
            showNotification('Erro', `Não foi possível bloquear a agenda: ${error.message}`, 'error');
        } finally {
            saveButton.disabled = false;
            saveButton.textContent = 'Bloquear Agenda';
        }
    });
}

// NOVO: Função atualizada para aceitar o modo de visualização (future/history)
async function loadMyBlocks(professionalId, mode = 'future') {
    const blocksListContainer = document.getElementById('my-blocks-list');
    blocksListContainer.innerHTML = '<p class="text-gray-500">A carregar bloqueios...</p>';

    try {
        const now = new Date();
        let startDate, endDate;

        if (mode === 'history') {
            // Histórico: Último 1 ano até hoje
            endDate = new Date(); // Hoje
            startDate = new Date();
            startDate.setFullYear(startDate.getFullYear() - 1); // 1 ano atrás
        } else {
            // Futuro: Hoje até 1 ano à frente
            startDate = new Date();
            endDate = new Date();
            endDate.setFullYear(endDate.getFullYear() + 1);
        }

        const blocks = await blockagesApi.getBlockagesByDateRange(
            state.establishmentId,
            startDate.toISOString(),
            endDate.toISOString(),
            professionalId
        );
        
        // Processamento e Filtragem
        let filteredBlocks = blocks
            .map(block => ({
                ...block,
                startTime: new Date(block.startTime),
                endTime: new Date(block.endTime)
            }));

        if (mode === 'history') {
            // Filtra o que já acabou e ordena do mais recente para o mais antigo
            filteredBlocks = filteredBlocks
                .filter(block => block.endTime < now)
                .sort((a, b) => b.startTime - a.startTime); // Decrescente
        } else {
            // Filtra o que ainda vai acontecer (ou está acontecendo) e ordena crescente
            filteredBlocks = filteredBlocks
                .filter(block => block.endTime >= now)
                .sort((a, b) => a.startTime - b.startTime); // Crescente
        }

        if (filteredBlocks.length > 0) {
            blocksListContainer.innerHTML = filteredBlocks.map(block => {
                const formattedDate = block.startTime.toLocaleDateString('pt-BR');
                const formattedTime = `${block.startTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - ${block.endTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
                const isPast = block.endTime < new Date();
                
                return `
                    <div class="flex items-center justify-between p-3 ${isPast ? 'bg-gray-100 opacity-75' : 'bg-white border border-gray-200'} rounded-md shadow-sm">
                        <div>
                            <p class="font-semibold text-gray-800">${formattedDate} das ${formattedTime}</p>
                            <p class="text-sm text-gray-600">${block.reason || 'Sem motivo'}</p>
                        </div>
                        <button data-block-id="${block.id}" class="remove-block-btn text-red-500 hover:text-red-700 text-2xl font-bold leading-none p-1" title="Apagar bloqueio">
                            &times;
                        </button>
                    </div>
                `;
            }).join('');

            blocksListContainer.querySelectorAll('.remove-block-btn').forEach(button => {
                button.addEventListener('click', async (e) => {
                    const blockId = e.currentTarget.dataset.blockId;
                    if (confirm('Tem certeza que deseja remover este bloqueio?')) {
                        try {
                            await blockagesApi.deleteBlockage(blockId);
                            showNotification('Sucesso', 'Bloqueio removido.', 'success');
                            loadMyBlocks(professionalId, mode);
                        } catch (error) {
                            console.error("Erro ao remover bloqueio:", error);
                            showNotification('Erro', `Não foi possível remover o bloqueio: ${error.message}`, 'error');
                        }
                    }
                });
            });

        } else {
            blocksListContainer.innerHTML = `<p class="text-gray-500 py-4 text-center">Nenhum bloqueio ${mode === 'history' ? 'no histórico recente' : 'futuro agendado'}.</p>`;
        }

    } catch (error) {
        console.error("Erro ao carregar bloqueios:", error);
        blocksListContainer.innerHTML = `<p class="text-red-500">Erro ao carregar bloqueios: ${error.message}</p>`;
    }
}