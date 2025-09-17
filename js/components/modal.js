// js/components/modal.js

/**
 * Este módulo centraliza a lógica para todos os popups da aplicação,
 * incluindo modals de confirmação e notificações "toast".
 */
import * as appointmentsApi from '../api/appointments.js';
import { state } from '../state.js';


// Referência ao modal genérico para confirmações
const genericModal = document.getElementById('genericModal');
let audioContext;

// Prepara o áudio para ser tocado
async function setupAudio() {
    if (audioContext) return;
    try {
        // Cria o AudioContext após uma interação do usuário para compatibilidade com navegadores
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.error("Não foi possível inicializar o áudio:", e);
    }
}

// Toca o som de notificação
function playNotificationSound() {
    if (!audioContext) {
        console.warn("AudioContext não inicializado. O som não será tocado.");
        return;
    }
    // Garante que o áudio possa ser tocado
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // Cria um som simples de "bip" dinamicamente
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.2);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}


/**
 * Exibe uma notificação "toast" moderna que desaparece automaticamente.
 * @param {string} message - A mensagem a ser exibida.
 * @param {'success'|'error'|'info'} type - O tipo de notificação.
 * @param {boolean} playSound - Se um som deve ser tocado.
 */
export function showNotification(message, type = 'info', playSound = false) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    if (playSound) {
        playNotificationSound();
    }

    const toast = document.createElement('div');

    const typeClasses = {
        success: 'bg-green-50 border-green-400 text-green-700',
        error: 'bg-red-50 border-red-400 text-red-700',
        info: 'bg-blue-50 border-blue-400 text-blue-700'
    };

    const icons = {
        success: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
        error: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
        info: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
    };

    const progressBg = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500'
    }

    toast.className = `toast ${typeClasses[type] || typeClasses['info']}`;
    toast.innerHTML = `
        <div class="toast-icon">${icons[type] || icons['info']}</div>
        <div class="toast-content">
            <p class="text-sm font-medium">${message}</p>
        </div>
        <button class="toast-close">&times;</button>
        <div class="toast-progress-bar">
            <div class="toast-progress ${progressBg[type] || progressBg['info']}"></div>
        </div>
    `;
    container.appendChild(toast);

    toast.querySelector('.toast-close').addEventListener('click', () => toast.remove());

    setTimeout(() => {
        toast.remove();
    }, 4000); // O toast desaparece após 4 segundos
}

/**
 * Exibe um modal de confirmação moderno e compacto.
 * @param {string} title - O título da confirmação.
 * @param {string} message - A pergunta de confirmação.
 * @returns {Promise<boolean>} - Uma promessa que resolve para 'true' se o utilizador confirmar, e 'false' se cancelar.
 */
export function showConfirmation(title, message) {
    return new Promise((resolve) => {
        genericModal.innerHTML = `
            <div class="modal-content max-w-sm text-center p-6 rounded-lg shadow-xl">
                <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                    <svg class="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h3 class="text-lg leading-6 font-medium text-gray-900 mt-4">${title}</h3>
                <div class="mt-2 text-sm text-gray-500">
                    <p>${message}</p>
                </div>
                <div class="mt-5 sm:mt-6 flex justify-end gap-2">
                    <button id="genericModalCancelBtn" class="py-1 px-4 bg-white text-gray-700 font-semibold rounded-md border border-gray-300 hover:bg-gray-50 transition text-xs">Cancelar</button>
                    <button id="genericModalConfirmBtn" class="py-1 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition text-xs">Confirmar</button>
                </div>
            </div>`;

        genericModal.style.display = 'flex';

        document.getElementById('genericModalConfirmBtn').onclick = () => {
            genericModal.style.display = 'none';
            resolve(true);
        };
        document.getElementById('genericModalCancelBtn').onclick = () => {
            genericModal.style.display = 'none';
            resolve(false);
        };
    });
}

/**
 * Inicializa um listener global para lidar com o fecho de modals e a ativação do áudio.
 */
export function initializeModalClosers() {
    document.body.addEventListener('click', () => {
        // Inicializa o contexto de áudio com a primeira interação do usuário em qualquer lugar da página
        if (!audioContext) {
            setupAudio();
        }
    }, { once: true }); // O listener é executado apenas uma vez

    document.addEventListener('click', (e) => {
        const button = e.target.closest('[data-action="close-modal"]');
        if (button) {
            const targetModalId = button.dataset.target;
            if (targetModalId) {
                const targetModal = document.getElementById(targetModalId);
                if (targetModal) {
                    targetModal.style.display = 'none';
                }
            }
        }
    });
}


// --- NOVO: Lógica do Modal de Histórico de Cancelamentos ---
async function fetchAndDisplayCancellations() {
    const listContainer = document.getElementById('cancellationListContainer');
    if (!listContainer) return;
    listContainer.innerHTML = '<div class="loader mx-auto"></div>';

    const startDate = document.getElementById('cancelStartDate').value;
    const endDate = document.getElementById('cancelEndDate').value;

    try {
        const cancelledAppointments = await appointmentsApi.getCancelledAppointments(state.establishmentId, startDate, endDate);
        if (cancelledAppointments.length === 0) {
            listContainer.innerHTML = '<p class="text-center text-gray-500 py-4">Nenhum cancelamento encontrado para este período.</p>';
            return;
        }

        listContainer.innerHTML = cancelledAppointments.map(appt => `
            <div class="bg-red-50 p-3 rounded-lg border-l-4 border-red-400">
                <div class="flex justify-between items-center">
                    <div>
                        <p class="font-bold text-gray-800">${appt.clientName}</p>
                        <p class="text-sm text-gray-600">${new Date(appt.date).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })} - ${appt.serviceName}</p>
                        <p class="text-xs text-gray-500">com ${appt.professionalName}</p>
                    </div>
                </div>
            </div>
        `).join('');

    } catch (error) {
        listContainer.innerHTML = `<p class="text-red-500 text-center py-4">Erro ao carregar histórico: ${error.message}</p>`;
    }
}

export function openCancellationHistoryModal() {
    const modal = document.getElementById('genericModal'); // Reutilizando o modal genérico
    const today = new Date().toISOString().split('T')[0];
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];

    modal.innerHTML = `
        <div class="modal-content max-w-3xl">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold text-gray-800">Histórico de Cancelamentos</h2>
                <button type="button" data-action="close-modal" data-target="genericModal" class="text-2xl font-bold">&times;</button>
            </div>
            <div class="flex items-center gap-4 bg-gray-100 p-3 rounded-lg mb-4">
                <div><label for="cancelStartDate" class="text-sm font-medium">De:</label><input type="date" id="cancelStartDate" value="${thirtyDaysAgoStr}" class="p-2 border rounded-md"></div>
                <div><label for="cancelEndDate" class="text-sm font-medium">Até:</label><input type="date" id="cancelEndDate" value="${today}" class="p-2 border rounded-md"></div>
                <button id="searchCancellationsBtn" class="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Buscar</button>
            </div>
            <div id="cancellationListContainer" class="space-y-3 max-h-96 overflow-y-auto pr-2">
                <div class="loader mx-auto"></div>
            </div>
        </div>
    `;
    modal.style.display = 'flex';

    const searchBtn = modal.querySelector('#searchCancellationsBtn');
    searchBtn.addEventListener('click', fetchAndDisplayCancellations);
    
    // Carrega a busca inicial
    fetchAndDisplayCancellations();
}



