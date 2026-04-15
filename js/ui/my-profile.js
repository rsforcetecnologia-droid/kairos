// js/ui/my-profile.js

import * as professionalsApi from '../api/professionals.js';
import * as blockagesApi from '../api/blockages.js';
import { state } from '../state.js';
import { showNotification } from '../components/modal.js';
import { auth, db } from '../firebase-config.js';
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { escapeHTML, resizeAndCompressImage } from '../utils.js'; 

const contentDiv = document.getElementById('content');

export async function loadMyProfilePage() {
    const user = auth.currentUser;
    if (!user) return;

    let userData = {};
    try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
            userData = userDoc.data();
        }
    } catch (e) {
        console.error("Erro ao buscar usuário", e);
    }

    let profData = null;
    if (state.userProfessionalId) {
        try {
            profData = await professionalsApi.getProfessional(state.userProfessionalId);
        } catch (e) {
            console.error("Erro ao buscar profissional", e);
        }
    }

    const safeName = escapeHTML(userData.name || user.displayName || 'Usuário');
    const safeEmail = escapeHTML(user.email || 'E-mail não disponível');
    const safePhone = escapeHTML(userData.phone || '');
    
    // Define a imagem (Preferência para a foto do Profissional, ou fallback para Letra)
    let photoSrc = userData.photo || '';
    if (profData && profData.photo) {
        photoSrc = profData.photo;
    }
    const finalPhoto = photoSrc || `https://placehold.co/128x128/E2E8F0/4A5568?text=${encodeURIComponent(safeName.charAt(0))}`;

    contentDiv.innerHTML = `
        <div class="max-w-5xl mx-auto space-y-6 p-4 md:p-6 pb-24">
            
            <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between animate-fade-in-down">
                <h2 class="text-base md:text-xl font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <i class="bi bi-person-badge text-indigo-600 text-2xl"></i> Configurações do Meu Perfil
                </h2>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-1 space-y-6 animate-fade-in">
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center relative overflow-hidden">
                        
                        <div class="relative inline-block group cursor-pointer mb-4" id="profile-photo-wrapper">
                            <img id="profile-avatar" src="${finalPhoto}" class="w-32 h-32 rounded-full object-cover border-4 border-indigo-50 shadow-md transition-all group-hover:brightness-75">
                            <div class="absolute inset-0 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                <i class="bi bi-camera-fill text-white text-3xl"></i>
                            </div>
                            <input type="file" id="profile-photo-input" class="hidden" accept="image/*">
                        </div>
                        
                        <h3 class="text-lg font-black text-slate-800 truncate px-2" id="display-name">${safeName}</h3>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-5 truncate px-2">${safeEmail}</p>
                        
                        ${profData ? `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100 shadow-sm mb-4"><i class="bi bi-check-circle-fill"></i> Perfil Profissional Ativo</span>` : ''}

                        <form id="form-user-details" class="text-left space-y-4 border-t border-slate-100 pt-5 mt-2">
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Nome Completo</label>
                                <input type="text" id="input-name" value="${safeName}" required class="w-full p-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner transition-colors">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Telefone / WhatsApp</label>
                                <input type="tel" id="input-phone" value="${safePhone}" placeholder="(00) 00000-0000" class="w-full p-3 border border-slate-300 rounded-xl text-sm font-bold text-slate-800 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner transition-colors">
                            </div>
                            <button type="submit" class="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-wider hover:bg-indigo-700 transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2">
                                <i class="bi bi-save2"></i> Salvar Alterações
                            </button>
                        </form>
                    </div>
                </div>

                <div class="lg:col-span-2 space-y-6 animate-fade-in" id="professional-section">
                    </div>
            </div>
        </div>
    `;

    setupProfileEditing(user, userData);
    renderBlockagesSection(profData);
}

function setupProfileEditing(user, userData) {
    const photoWrapper = document.getElementById('profile-photo-wrapper');
    const photoInput = document.getElementById('profile-photo-input');
    const photoPreview = document.getElementById('profile-avatar');
    const form = document.getElementById('form-user-details');

    photoWrapper.addEventListener('click', () => photoInput.click());

    photoInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const base64 = await resizeAndCompressImage(file, 800, 800, 0.8);
            photoPreview.src = base64;
            
            // 1. Atualiza no cadastro do Usuário
            await updateDoc(doc(db, 'users', user.uid), { photo: base64 });
            
            // 2. Sincroniza com o cadastro do Profissional, se houver
            if (state.userProfessionalId) {
                await professionalsApi.updateProfessional(state.userProfessionalId, { photo: base64 });
            }

            // 3. Dispara evento global para o Topo ser atualizado simultaneamente
            window.dispatchEvent(new CustomEvent('userPhotoUpdated', { detail: base64 }));
            showNotification('Sucesso!', 'Sua foto de perfil foi atualizada.', 'success');
            
        } catch (err) {
            showNotification('Erro', 'Não foi possível salvar a imagem. Tente uma menor.', 'error');
        }
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalBtnText = btn.innerHTML;
        btn.disabled = true; btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Salvando...';

        const newName = document.getElementById('input-name').value.trim();
        const newPhone = document.getElementById('input-phone').value.trim();

        try {
            await updateDoc(doc(db, 'users', user.uid), {
                name: newName,
                phone: newPhone
            });
            
            if (state.userProfessionalId) {
                await professionalsApi.updateProfessional(state.userProfessionalId, {
                    name: newName,
                    phone: newPhone
                });
            }

            state.userName = newName;
            document.getElementById('display-name').textContent = newName;
            showNotification('Atualizado!', 'Seus dados foram salvos com sucesso.', 'success');
        } catch (err) {
            showNotification('Erro', 'Ocorreu um problema na hora de salvar.', 'error');
        } finally {
            btn.disabled = false; btn.innerHTML = originalBtnText;
        }
    });
}

function renderBlockagesSection(profData) {
    const container = document.getElementById('professional-section');
    
    if (!profData) {
        container.innerHTML = `
            <div class="bg-white p-10 rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center h-full">
                <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                    <i class="bi bi-calendar-x text-3xl text-slate-300"></i>
                </div>
                <h3 class="text-base font-black text-slate-800 mb-2">Bloqueio de Agenda Indisponível</h3>
                <p class="text-xs text-slate-500 max-w-sm">Seu usuário não está vinculado a um perfil profissional. Peça ao administrador para realizar o vínculo na aba de Usuários se você precisa gerir agendas.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200">
            <div class="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div class="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shadow-inner"><i class="bi bi-calendar-x text-xl"></i></div>
                <div>
                    <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider">Meus Bloqueios / Pausas</h3>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lance horários que não estará disponível.</p>
                </div>
            </div>

            <form id="form-my-blockage" class="bg-orange-50/40 p-4 md:p-5 rounded-2xl border border-orange-100 mb-8 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Data Início</label><input type="date" id="b-date-start" required class="w-full p-3 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 bg-white focus:ring-2 focus:ring-orange-500 outline-none shadow-inner"></div>
                    <div><label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Data Fim (Opcional)</label><input type="date" id="b-date-end" class="w-full p-3 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 bg-white focus:ring-2 focus:ring-orange-500 outline-none shadow-inner"></div>
                    <div><label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Hora Início</label><input type="time" id="b-time-start" required class="w-full p-3 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 bg-white focus:ring-2 focus:ring-orange-500 outline-none shadow-inner"></div>
                    <div><label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Hora Fim</label><input type="time" id="b-time-end" required class="w-full p-3 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 bg-white focus:ring-2 focus:ring-orange-500 outline-none shadow-inner"></div>
                </div>
                <div><label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Motivo / Descrição</label><input type="text" id="b-reason" placeholder="Ex: Férias, Consulta Médica..." class="w-full p-3 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 bg-white focus:ring-2 focus:ring-orange-500 outline-none shadow-inner"></div>
                <button type="submit" class="w-full py-3.5 mt-2 bg-orange-500 text-white rounded-xl font-black text-xs uppercase tracking-wider hover:bg-orange-600 transition-transform active:scale-95 shadow-md">Criar Bloqueio</button>
            </form>

            <div class="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-3">
                <h4 class="text-sm font-black text-slate-800 uppercase tracking-wider">Histórico da Agenda</h4>
                <select id="my-blocks-filter" class="p-2 border border-slate-200 rounded-xl text-[10px] font-bold text-slate-600 uppercase tracking-widest bg-slate-50 focus:bg-white outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm">
                    <option value="future">Somente Futuros</option>
                    <option value="history">Registos Passados</option>
                </select>
            </div>
            
            <div id="my-blocks-list" class="space-y-3 max-h-[380px] overflow-y-auto custom-scrollbar pr-2 pb-4">
                <div class="loader mx-auto mt-6"></div>
            </div>
        </div>
    `;

    const formBlock = document.getElementById('form-my-blockage');
    formBlock.addEventListener('submit', async (e) => {
        e.preventDefault();
        const blockDate = formBlock.querySelector('#b-date-start').value;
        const endDateInput = formBlock.querySelector('#b-date-end').value || blockDate;
        const blockStartTime = formBlock.querySelector('#b-time-start').value;
        const blockEndTime = formBlock.querySelector('#b-time-end').value;
        const blockReason = formBlock.querySelector('#b-reason').value;

        if (!blockDate || !blockStartTime || !blockEndTime) {
            return showNotification('Atenção', 'Preencha Data e Horários corretamente.', 'error');
        }

        const startDateTime = new Date(`${blockDate}T${blockStartTime}:00`);
        const endDateTime = new Date(`${endDateInput}T${blockEndTime}:00`);

        if (endDateTime <= startDateTime) {
            return showNotification('Atenção', 'A data e hora de fim deve ser superior ao início.', 'warning');
        }

        const saveBtn = formBlock.querySelector('button[type="submit"]');
        const origText = saveBtn.innerHTML;
        saveBtn.disabled = true; saveBtn.innerHTML = 'A bloquear...';

        try {
            await blockagesApi.createBlockage({
                establishmentId: state.establishmentId, 
                professionalId: profData.id,
                reason: blockReason || 'Indisponível',
                startTime: startDateTime.toISOString(),
                endTime: endDateTime.toISOString()
            });

            showNotification('Sucesso', 'Agenda bloqueada com êxito.', 'success');
            formBlock.reset();
            
            const currentFilter = document.getElementById('my-blocks-filter').value;
            loadMyBlocksList(profData.id, currentFilter); 
        } catch (error) {
            showNotification('Erro', `Falha ao bloquear: ${error.message}`, 'error');
        } finally {
            saveBtn.disabled = false; saveBtn.innerHTML = origText;
        }
    });

    const filterSelect = document.getElementById('my-blocks-filter');
    filterSelect.addEventListener('change', (e) => loadMyBlocksList(profData.id, e.target.value));

    loadMyBlocksList(profData.id, 'future');
}

async function loadMyBlocksList(professionalId, mode = 'future') {
    const listContainer = document.getElementById('my-blocks-list');
    listContainer.innerHTML = '<div class="loader mx-auto mt-6"></div>';

    try {
        const now = new Date();
        let startDate, endDate;

        if (mode === 'history') {
            endDate = new Date();
            startDate = new Date();
            startDate.setFullYear(startDate.getFullYear() - 1); 
        } else {
            startDate = new Date();
            endDate = new Date();
            endDate.setFullYear(endDate.getFullYear() + 1);
        }

        const blocks = await blockagesApi.getBlockagesByDateRange(state.establishmentId, startDate.toISOString(), endDate.toISOString(), professionalId);
        
        let filteredBlocks = blocks.map(b => ({
            ...b,
            startTime: new Date(b.startTime),
            endTime: new Date(b.endTime)
        }));

        if (mode === 'history') {
            filteredBlocks = filteredBlocks.filter(b => b.endTime < now).sort((a, b) => b.startTime - a.startTime);
        } else {
            filteredBlocks = filteredBlocks.filter(b => b.endTime >= now).sort((a, b) => a.startTime - b.startTime);
        }

        if (filteredBlocks.length === 0) {
            listContainer.innerHTML = `
                <div class="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <i class="bi bi-info-circle text-2xl text-slate-300 mb-2 block"></i>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nenhum registo ${mode === 'history' ? 'no passado' : 'futuro'}.</p>
                </div>
            `;
            return;
        }

        listContainer.innerHTML = filteredBlocks.map(b => {
            const isPast = b.endTime < new Date();
            const safeReason = escapeHTML(b.reason || 'Bloqueio');
            
            return `
                <div class="flex justify-between items-center p-3 ${isPast ? 'bg-slate-50 border-slate-200 opacity-80' : 'bg-white border-slate-200 hover:border-orange-200 hover:shadow-sm'} border rounded-xl transition-all">
                    <div class="flex items-center gap-3">
                        <div class="${isPast ? 'bg-slate-200 text-slate-500 border-slate-300' : 'bg-orange-50 text-orange-600 border-orange-100'} border w-12 h-12 rounded-xl flex flex-col items-center justify-center leading-none shadow-inner flex-shrink-0">
                            <span class="font-black text-base">${b.startTime.getDate().toString().padStart(2, '0')}</span>
                            <span class="text-[9px] uppercase font-bold">${b.startTime.toLocaleString('pt-BR', {month:'short'})}</span>
                        </div>
                        <div>
                            <p class="text-xs font-black text-slate-700 mb-0.5">
                               ${b.startTime.toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'})} <span class="text-slate-400 font-medium">até</span> ${b.endTime.toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'})}
                            </p>
                            ${b.startTime.getDate() !== b.endTime.getDate() ? `<p class="text-[10px] text-slate-400 font-bold mb-0.5">Termina: ${b.endTime.toLocaleDateString('pt-BR')}</p>` : ''}
                            <p class="text-[9px] font-bold ${isPast ? 'text-slate-500' : 'text-orange-500'} uppercase tracking-widest"><i class="bi bi-tag-fill mr-1"></i>${safeReason}</p>
                        </div>
                    </div>
                    <button data-block-id="${b.id}" class="remove-block-btn text-slate-400 hover:text-red-500 w-8 h-8 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center" title="Apagar bloqueio">
                        <i class="bi bi-trash3 pointer-events-none text-lg"></i>
                    </button>
                </div>
            `;
        }).join('');

        listContainer.querySelectorAll('.remove-block-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const blockId = e.currentTarget.dataset.blockId;
                if (confirm('Deletar e deixar a agenda livre neste horário?')) {
                    try {
                        await blockagesApi.deleteBlockage(blockId);
                        showNotification('Removido', 'O bloqueio foi deletado.', 'success');
                        loadMyBlocksList(professionalId, mode);
                    } catch (error) {
                        showNotification('Erro', `Não foi possível remover: ${error.message}`, 'error');
                    }
                }
            });
        });

    } catch (error) {
        listContainer.innerHTML = `<p class="text-xs text-red-500 font-bold p-3 bg-red-50 rounded-xl">Erro: ${escapeHTML(error.message)}</p>`;
    }
}