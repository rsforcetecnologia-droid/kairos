// js/ui/professionals.js

// --- 1. IMPORTAÇÕES ---
import * as professionalsApi from '../api/professionals.js';
import * as servicesApi from '../api/services.js';
import { state } from '../state.js';
import { showNotification, showConfirmation } from '../components/modal.js';
import { navigateTo } from '../main.js';

// --- 2. CONSTANTES E VARIÁVEIS DO MÓDULO ---
const contentDiv = document.getElementById('content');
const daysOfWeek = { monday: 'Segunda', tuesday: 'Terça', wednesday: 'Quarta', thursday: 'Quinta', friday: 'Sexta', saturday: 'Sábado', sunday: 'Domingo' };
let professionalScheduleState = {};

// --- 3. FUNÇÕES DE RENDERIZAÇÃO (CRIAM HTML) ---

function renderProfessionalsListHTML(professionals) {
    if (professionals.length === 0) {
        return `<p class="col-span-full text-center text-gray-500">Nenhum profissional encontrado.</p>`;
    }
    return professionals.map(prof => {
        const isInactive = prof.status === 'inactive';
        const photoSrc = prof.photo || `https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(prof.name.charAt(0))}`;
        const statusBadge = isInactive
            ? `<span class="absolute top-2 right-2 text-xs bg-red-100 text-red-700 font-semibold py-1 px-2 rounded-full">Inativo</span>`
            : `<span class="absolute top-2 right-2 text-xs bg-green-100 text-green-700 font-semibold py-1 px-2 rounded-full">Ativo</span>`;
        const profDataString = JSON.stringify(prof).replace(/'/g, "&apos;");

        // --- ALTERAÇÕES PARA REDUZIR O TAMANHO DO CARD ---
        return `
            <div class="bg-white rounded-lg shadow-md p-3 text-center flex flex-col relative transition-opacity ${isInactive ? 'opacity-60' : ''}">
                ${statusBadge}
                <img src="${photoSrc}" alt="Foto de ${prof.name}" class="w-24 h-24 rounded-full mx-auto mb-2 border-4 border-gray-200 object-cover">
                <h3 class="text-md font-bold text-gray-900">${prof.name}</h3>
                <p class="text-sm text-gray-500">${prof.specialty || 'Especialidade'}</p>
                <p class="text-xs text-gray-400 mb-2">Matrícula: ${prof.registrationNumber || 'N/A'}</p>
                <div class="mt-auto flex flex-col gap-2 pt-2 border-t">
                    <button class="w-full bg-indigo-100 text-indigo-700 font-semibold py-1 px-2 rounded-lg text-xs hover:bg-indigo-200" data-action="edit-professional" data-professional='${profDataString}'>Editar Perfil</button>
                    <button class="w-full bg-red-100 text-red-700 font-semibold py-1 px-2 rounded-lg text-xs hover:bg-red-200" data-action="manage-blockages" data-prof-id="${prof.id}" data-prof-name="${prof.name}">Gerir Ausências</button>
                </div>
            </div>`;
    }).join('');
}

function renderAdvancedScheduleSelector(container, scheduleData) {
    container.innerHTML = '';
    Object.keys(daysOfWeek).forEach(dayKey => {
        const dayName = daysOfWeek[dayKey];
        const dayData = scheduleData[dayKey] || { active: true, start: '09:00', end: '18:00', breakStart: '12:00', breakEnd: '13:00' };
        const isChecked = dayData.active !== false;
        const dayElement = document.createElement('div');
        dayElement.className = `day-schedule-card p-4 rounded-lg ${isChecked ? 'bg-gray-50' : 'bg-gray-200 disabled'}`;
        dayElement.dataset.day = dayKey;
        dayElement.innerHTML = `
            <div class="flex justify-between items-center mb-3">
                <span class="font-bold text-gray-800">${dayName}</span>
                <label class="flex items-center cursor-pointer">
                    <div class="relative">
                        <input type="checkbox" data-field="active" class="sr-only" ${isChecked ? 'checked' : ''}>
                        <div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                    </div>
                </label>
            </div>
            <div class="time-inputs space-y-2">
                <div class="flex items-center gap-2"><label class="w-16 text-sm text-gray-600">Início:</label><input type="time" data-field="start" value="${dayData.start || '09:00'}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
                <div class="flex items-center gap-2"><label class="w-16 text-sm text-gray-600">Fim:</label><input type="time" data-field="end" value="${dayData.end || '18:00'}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
                <div class="flex items-center gap-2"><label class="w-16 text-sm text-gray-600">Intervalo:</label><input type="time" data-field="breakStart" value="${dayData.breakStart || '12:00'}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
                <div class="flex items-center gap-2"><label class="w-16 text-sm text-gray-600">Fim:</label><input type="time" data-field="breakEnd" value="${dayData.breakEnd || '13:00'}" class="w-full rounded-md border-gray-300 shadow-sm text-sm p-1"></div>
            </div>`;
        container.appendChild(dayElement);
    });
}

// --- 4. FUNÇÕES DE MANIPULAÇÃO DO DOM E LÓGICA ---

function filterAndRenderProfessionals() {
    const listDiv = document.getElementById('professionalsList');
    const showInactive = document.getElementById('showInactiveProfToggle').checked;
    const searchTerm = document.getElementById('profSearchInput').value.toLowerCase();

    const filtered = state.professionals.filter(p => {
        const nameMatch = p.name.toLowerCase().includes(searchTerm) || (p.registrationNumber && p.registrationNumber.includes(searchTerm));
        const statusMatch = showInactive || p.status !== 'inactive';
        return nameMatch && statusMatch;
    });
    listDiv.innerHTML = renderProfessionalsListHTML(filtered);
}

async function showProfessionalFormView(professional = null) {
    document.getElementById('professional-list-view').classList.add('hidden');
    const formView = document.getElementById('professional-form-view');
    formView.classList.remove('hidden');

    const form = formView.querySelector('#professionalForm');
    form.innerHTML = `
        <input type="hidden" id="professionalId"><input type="hidden" id="profPhotoBase64">
        <div>
            <h3 class="text-lg font-medium leading-6 text-gray-900">Dados Pessoais</h3>
            <div class="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-2">
                    <label class="block text-sm font-medium text-gray-700">Foto de Perfil</label>
                    <div class="mt-1 flex items-center">
                        <img id="profPhotoPreview" class="h-24 w-24 rounded-full object-cover" src="https://placehold.co/128x128/E2E8F0/4A5568?text=Foto" alt="Foto do Profissional">
                        <input type="file" id="profPhotoInput" class="hidden" accept="image/*">
                        <button type="button" id="profPhotoButton" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Alterar</button>
                    </div>
                </div>
                <div class="sm:col-span-4">
                    <label for="profName" class="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input type="text" id="profName" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
                    <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 mt-4">
                        <div><label for="profRegistrationNumber" class="block text-sm font-medium text-gray-700">Nº de Matrícula</label><input type="text" id="profRegistrationNumber" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                        <div><label for="profCpf" class="block text-sm font-medium text-gray-700">CPF</label><input type="text" id="profCpf" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="border-t border-gray-200 pt-6">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Situação</h3>
            <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label for="profStatus" class="block text-sm font-medium text-gray-700">Status</label>
                    <div class="mt-2"><label class="flex items-center cursor-pointer"><div class="relative"><input type="checkbox" id="profStatus" class="sr-only"><div class="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div></div><div id="profStatusLabel" class="ml-3 text-gray-700 font-semibold"></div></label></div>
                </div>
                <div id="inactivationDateContainer" class="hidden"><label for="profInactivationDate" class="block text-sm font-medium text-gray-700">Data de Inativação</label><input type="date" id="profInactivationDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></div>
            </div>
        </div>
        <div class="border-t border-gray-200 pt-6">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Especialidade e Serviços</h3>
            <div class="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-6"><label for="profSpecialty" class="block text-sm font-medium text-gray-700">Especialidade Principal</label><input type="text" id="profSpecialty" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Ex: Barbeiro, Cabeleireiro" required></div>
                <div class="sm:col-span-6"><label class="block text-sm font-medium text-gray-700">Serviços Realizados</label><div id="profServicesContainer" class="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4"></div></div>
            </div>
        </div>
        <div class="border-t border-gray-200 pt-6">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Jornada Semanal</h3>
            <div id="profScheduleContainer" class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"></div>
        </div>
        <div class="flex gap-4 pt-6 border-t border-gray-200">
            <button type="button" data-action="back-to-professionals" class="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg">Cancelar</button>
            <button type="submit" class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg">Salvar</button>
        </div>`;

    formView.querySelector('#professionalFormTitle').textContent = professional ? 'Editar Profissional' : 'Novo Profissional';

    form.querySelector('#professionalId').value = professional?.id || '';
    form.querySelector('#profName').value = professional?.name || '';
    form.querySelector('#profRegistrationNumber').value = professional?.registrationNumber || '';
    form.querySelector('#profCpf').value = professional?.cpf || '';
    form.querySelector('#profSpecialty').value = professional?.specialty || '';

    const photoPreview = form.querySelector('#profPhotoPreview');
    const photoBase64Input = form.querySelector('#profPhotoBase64');
    photoPreview.src = professional?.photo || `https://placehold.co/128x128/E2E8F0/4A5568?text=Foto`;
    photoBase64Input.value = professional?.photo || '';

    const statusToggle = form.querySelector('#profStatus');
    const isActive = professional ? professional.status !== 'inactive' : true;
    statusToggle.checked = isActive;
    form.querySelector('#profStatusLabel').textContent = isActive ? 'Ativo' : 'Inativo';
    form.querySelector('#inactivationDateContainer').classList.toggle('hidden', isActive);
    if (!isActive) form.querySelector('#profInactivationDate').value = professional.inactivationDate || '';

    const baseSchedule = {};
    Object.keys(daysOfWeek).forEach(day => {
        baseSchedule[day] = { active: true, start: '09:00', end: '18:00', breakStart: '12:00', breakEnd: '13:00' };
    });
    professionalScheduleState = professional?.workingHours ? { ...baseSchedule, ...JSON.parse(JSON.stringify(professional.workingHours)) } : baseSchedule;
    renderAdvancedScheduleSelector(form.querySelector('#profScheduleContainer'), professionalScheduleState);

    const servicesContainer = form.querySelector('#profServicesContainer');
    servicesContainer.innerHTML = '';
    if (state.services && state.services.length > 0) {
        servicesContainer.innerHTML = state.services.map(service => {
            const isChecked = professional?.services?.includes(service.id);
            return `<div class="relative flex items-start">
                        <div class="flex h-5 items-center"><input id="service-${service.id}" value="${service.id}" name="services" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" ${isChecked ? 'checked' : ''}></div>
                        <div class="ml-3 text-sm"><label for="service-${service.id}" class="font-medium text-gray-700">${service.name}</label></div>
                    </div>`;
        }).join('');
    } else {
        servicesContainer.innerHTML = '<p class="text-sm text-gray-500">Nenhum serviço cadastrado.</p>';
    }
}

async function handleProfessionalFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const professionalId = form.querySelector('#professionalId').value;
    const selectedServices = Array.from(form.querySelectorAll('input[name="services"]:checked')).map(cb => cb.value);

    const professionalData = {
        establishmentId: state.establishmentId,
        name: form.querySelector('#profName').value,
        registrationNumber: form.querySelector('#profRegistrationNumber').value,
        cpf: form.querySelector('#profCpf').value,
        specialty: form.querySelector('#profSpecialty').value,
        services: selectedServices,
        workingHours: professionalScheduleState,
        photo: form.querySelector('#profPhotoBase64').value,
        status: form.querySelector('#profStatus').checked ? 'active' : 'inactive',
        inactivationDate: form.querySelector('#profStatus').checked ? null : form.querySelector('#profInactivationDate').value
    };

    try {
        if (professionalId) {
            await professionalsApi.updateProfessional(professionalId, professionalData);
        } else {
            await professionalsApi.createProfessional(professionalData);
        }
        showNotification('Sucesso', `Profissional ${professionalId ? 'atualizado' : 'adicionado'} com sucesso!`, 'success');
        loadProfessionalsPage();
    } catch(error) {
        showNotification('Erro', error.message, 'error');
    }
}

// --- 5. FUNÇÃO PRINCIPAL EXPORTADA ---

export async function loadProfessionalsPage() {
    contentDiv.innerHTML = `
        <div id="professional-list-view">
            <section>
                <div class="flex flex-wrap justify-between items-center mb-6 gap-4">
                    <h2 class="text-3xl font-bold text-gray-800">Sua Equipe!</h2>
                    <div class="flex items-center gap-4 w-full md:w-auto">
                        <input type="search" id="profSearchInput" placeholder="Pesquisar por nome ou matrícula..." class="w-full md:w-64 p-2 border rounded-md shadow-sm">
                        <label class="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" id="showInactiveProfToggle" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                            <span class="text-sm font-medium text-gray-700">Mostrar Inativos</span>
                        </label>
                    </div>
                </div>
                <div id="professionalsList" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4"></div>
                <button data-action="new-professional" class="fixed bottom-10 right-10 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
                </button>
            </section>
        </div>
        <div id="professional-form-view" class="hidden">
            <section>
                <div class="flex justify-between items-center mb-6">
                    <h2 id="professionalFormTitle" class="text-3xl font-bold text-gray-800">Novo Profissional</h2>
                    <button data-action="back-to-professionals" class="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition">Voltar</button>
                </div>
                <form id="professionalForm" class="bg-white p-8 rounded-lg shadow-md space-y-6"></form>
            </section>
        </div>`;

    // Adiciona os listeners DEPOIS de o HTML estar na página
    document.getElementById('profSearchInput').addEventListener('input', filterAndRenderProfessionals);
    document.getElementById('showInactiveProfToggle').addEventListener('change', filterAndRenderProfessionals);
    document.getElementById('professionalForm').addEventListener('submit', handleProfessionalFormSubmit);

    contentDiv.addEventListener('click', e => {
        const button = e.target.closest('button[data-action]');
        if (button) {
            const action = button.dataset.action;
            if (action === 'new-professional') {
                showProfessionalFormView();
            } else if (action === 'back-to-professionals') {
                loadProfessionalsPage();
            } else if (action === 'edit-professional') {
                const profDataString = button.dataset.professional;
                if (profDataString) {
                    const profData = JSON.parse(profDataString);
                    showProfessionalFormView(profData);
                }
            } else if (action === 'manage-blockages') {
                navigateTo('ausencias-section', { professionalId: button.dataset.profId, professionalName: button.dataset.profName });
            }
        }

        const photoButton = e.target.closest('#profPhotoButton');
        if (photoButton) {
            const photoInput = document.getElementById('profPhotoInput');
            photoInput.click();
            photoInput.onchange = () => {
                const file = photoInput.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                        document.getElementById('profPhotoPreview').src = ev.target.result;
                        document.getElementById('profPhotoBase64').value = ev.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            };
        }
    });

    contentDiv.addEventListener('change', e => {
        const scheduleInput = e.target.closest('.day-schedule-card input');
        if (scheduleInput) {
            const dayKey = scheduleInput.closest('[data-day]').dataset.day;
            const field = scheduleInput.dataset.field;
            const value = scheduleInput.type === 'checkbox' ? scheduleInput.checked : scheduleInput.value;
            if (!professionalScheduleState[dayKey]) professionalScheduleState[dayKey] = {};
            professionalScheduleState[dayKey][field] = value;
            if (field === 'active') {
                const card = scheduleInput.closest('.day-schedule-card');
                card.classList.toggle('disabled', !value);
                card.classList.toggle('bg-gray-200', !value);
                card.classList.toggle('bg-gray-50', value);
            }
        }
    });

    // Inicia o carregamento dos dados
    const listDiv = document.getElementById('professionalsList');
    listDiv.innerHTML = '<div class="loader col-span-full mx-auto"></div>';
    try {
        const [professionals, services] = await Promise.all([
            professionalsApi.getProfessionals(state.establishmentId),
            servicesApi.getServices(state.establishmentId)
        ]);
        state.professionals = professionals;
        state.services = services;
        filterAndRenderProfessionals();
    } catch (error) {
        listDiv.innerHTML = '<p class="text-red-500 col-span-full">Erro ao carregar dados da página.</p>';
    }
}
