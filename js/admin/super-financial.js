// Arquivo: js/admin/super-financial.js

// 1. Importações do ficheiro central do Firebase
import { db, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from '../firebase-config.js';

// 2. Mapeamento Oficial de TODOS os Módulos do Sistema
const SYSTEM_MODULES = {
    'dashboard': 'Visão Geral (Dashboard)',
    'agenda': 'Agenda / Calendário',
    'comandas': 'Comandas / PDV',
    'relatorios': 'Relatórios (Analytics)',
    'sales-report': 'Relatório de Vendas',
    'financial': 'Financeiro',
    'servicos': 'Serviços',
    'produtos': 'Produtos',
    'suppliers': 'Fornecedores',
    'profissionais': 'Profissionais',
    'ausencias': 'Ausências e Bloqueios',
    'clientes': 'Clientes',
    'packages': 'Pacotes de Serviços',
    'commissions': 'Comissões',
    'estabelecimento': 'Configurações',
    'users': 'Usuários Internos',
    'whatsapp': 'Integração WhatsApp', // ✅ Novo módulo adicionado!
    'mobileApp': 'Acesso App Mobile'
};

// Variável para guardar os planos em memória
let allPlans = [];

export async function loadFinancial(container) {
    // 3. Estrutura HTML da Tela (Tabela + Modal Oculto)
    container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
            <h3 style="color: #1f2937; font-size: 1.5rem; font-weight: 600;">💳 Planos & Módulos</h3>
            <button id="btn-new-plan" style="background: #10b981; color: white; border: none; padding: 10px 18px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: background 0.2s;">+ Novo Plano</button>
        </div>

        <div style="background: white; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); overflow: hidden;">
            <div style="padding: 20px;">
                <p id="loading-plans" style="color: #6b7280; font-style: italic;">A carregar planos...</p>
                <div style="overflow-x: auto;">
                    <table id="plans-table" style="width: 100%; border-collapse: collapse; display: none;">
                        <thead>
                            <tr style="background-color: #f9fafb; border-bottom: 2px solid #e5e7eb; text-align: left; color: #4b5563; font-size: 0.85rem; text-transform: uppercase;">
                                <th style="padding: 15px 20px;">Nome do Plano</th>
                                <th style="padding: 15px 20px;">Preço</th>
                                <th style="padding: 15px 20px;">Limites (Prof / Users)</th>
                                <th style="padding: 15px 20px; text-align: right;">Ações</th>
                            </tr>
                        </thead>
                        <tbody id="plans-tbody"></tbody>
                    </table>
                </div>
            </div>
        </div>

        <div id="plan-modal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 100; display: none; justify-content: center; align-items: center; padding: 20px;">
            <div style="background: white; border-radius: 12px; width: 100%; max-width: 600px; max-height: 90vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);">
                <div style="padding: 20px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; background: #f8fafc;">
                    <h2 id="modal-title" style="margin: 0; font-size: 1.25rem; font-weight: 700; color: #1f2937;">Novo Plano</h2>
                    <button id="btn-close-modal" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #6b7280;">&times;</button>
                </div>
                
                <form id="plan-form" style="padding: 20px; overflow-y: auto; flex: 1;">
                    <input type="hidden" id="plan-id">
                    
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; font-weight: 600; font-size: 0.85rem; color: #374151;">Nome do Plano</label>
                        <input type="text" id="plan-name" required style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box;">
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-bottom: 25px;">
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: 600; font-size: 0.85rem; color: #374151;">Preço (R$)</label>
                            <input type="number" id="plan-price" step="0.01" required style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box;">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: 600; font-size: 0.85rem; color: #374151;">Máx. Profissionais</label>
                            <input type="number" id="plan-profs" required style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box;">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 5px; font-weight: 600; font-size: 0.85rem; color: #374151;">Máx. Usuários</label>
                            <input type="number" id="plan-users" required style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box;">
                        </div>
                    </div>

                    <h3 style="font-size: 1rem; font-weight: 700; color: #1f2937; margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Módulos Liberados no Plano</h3>
                    <p style="font-size: 0.75rem; color: #6b7280; margin-bottom: 15px;">Selecione quais telas e recursos os clientes deste plano terão acesso.</p>
                    
                    <div id="modules-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        </div>
                </form>

                <div style="padding: 15px 20px; border-top: 1px solid #e5e7eb; background: #f9fafb; display: flex; justify-content: flex-end; gap: 10px;">
                    <button id="btn-cancel-modal" style="background: white; border: 1px solid #d1d5db; padding: 8px 15px; border-radius: 6px; cursor: pointer; font-weight: 600; color: #374151;">Cancelar</button>
                    <button type="submit" form="plan-form" style="background: #10b981; color: white; border: none; padding: 8px 20px; border-radius: 6px; cursor: pointer; font-weight: 600;">Salvar Plano</button>
                </div>
            </div>
        </div>
    `;

    // 4. Iniciar Carregamento e Eventos
    await fetchPlans();
    setupEvents();
}

// --- FUNÇÕES DE LÓGICA E BANCO DE DADOS ---

async function fetchPlans() {
    try {
        const querySnapshot = await getDocs(collection(db, 'plans'));
        allPlans = [];
        querySnapshot.forEach(doc => {
            allPlans.push({ id: doc.id, ...doc.data() });
        });
        renderTable();
    } catch (error) {
        console.error("Erro ao buscar planos:", error);
        document.getElementById('loading-plans').innerText = "Erro ao carregar planos.";
    }
}

function renderTable() {
    const tbody = document.getElementById('plans-tbody');
    const table = document.getElementById('plans-table');
    const loadingMsg = document.getElementById('loading-plans');

    if (allPlans.length === 0) {
        loadingMsg.innerText = "Nenhum plano cadastrado. Clique em '+ Novo Plano' para começar.";
        table.style.display = 'none';
        return;
    }

    tbody.innerHTML = allPlans.map(plan => `
        <tr style="border-bottom: 1px solid #f3f4f6; transition: background 0.2s;" onmouseover="this.style.backgroundColor='#f9fafb'" onmouseout="this.style.backgroundColor='transparent'">
            <td style="padding: 15px 20px; font-weight: 700; color: #111827;">${plan.name}</td>
            <td style="padding: 15px 20px; color: #047857; font-weight: 600;">R$ ${parseFloat(plan.price).toFixed(2)}</td>
            <td style="padding: 15px 20px; color: #4b5563;">${plan.maxProfessionals} Profs / ${plan.maxUsers} Users</td>
            <td style="padding: 15px 20px; text-align: right;">
                <button class="btn-edit-plan" data-id="${plan.id}" style="background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 600; margin-right: 5px;">Editar</button>
                <button class="btn-delete-plan" data-id="${plan.id}" style="background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 600;">Excluir</button>
            </td>
        </tr>
    `).join('');

    loadingMsg.style.display = 'none';
    table.style.display = 'table';

    // Atrelar eventos aos botões recém-criados
    document.querySelectorAll('.btn-edit-plan').forEach(btn => {
        btn.addEventListener('click', (e) => openModal(e.target.getAttribute('data-id')));
    });
    document.querySelectorAll('.btn-delete-plan').forEach(btn => {
        btn.addEventListener('click', (e) => deletePlan(e.target.getAttribute('data-id')));
    });
}

function setupEvents() {
    const modal = document.getElementById('plan-modal');
    
    document.getElementById('btn-new-plan').addEventListener('click', () => openModal());
    document.getElementById('btn-close-modal').addEventListener('click', () => modal.style.display = 'none');
    document.getElementById('btn-cancel-modal').addEventListener('click', () => modal.style.display = 'none');
    
    document.getElementById('plan-form').addEventListener('submit', savePlan);
}

// Abre o modal para Criar (sem ID) ou Editar (com ID)
function openModal(planId = null) {
    const modal = document.getElementById('plan-modal');
    const form = document.getElementById('plan-form');
    form.reset();

    const isEditing = !!planId;
    document.getElementById('modal-title').innerText = isEditing ? "Editar Plano" : "Novo Plano";
    document.getElementById('plan-id').value = planId || '';

    // Encontrar os dados do plano se for edição
    const planData = isEditing ? allPlans.find(p => p.id === planId) : null;

    if (isEditing) {
        document.getElementById('plan-name').value = planData.name;
        document.getElementById('plan-price').value = planData.price;
        document.getElementById('plan-profs').value = planData.maxProfessionals;
        document.getElementById('plan-users').value = planData.maxUsers;
    }

    // Gerar os checkboxes dos módulos
    const modulesGrid = document.getElementById('modules-grid');
    const allowedModules = planData?.allowedModules || {};

    modulesGrid.innerHTML = Object.entries(SYSTEM_MODULES).map(([key, label]) => {
        const isChecked = allowedModules[key] ? 'checked' : '';
        return `
            <label style="display: flex; align-items: center; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.backgroundColor='#f9fafb'" onmouseout="this.style.backgroundColor='transparent'">
                <input type="checkbox" name="plan-modules" value="${key}" ${isChecked} style="margin-right: 10px; width: 16px; height: 16px; accent-color: #10b981;">
                <span style="font-size: 0.85rem; color: #374151; font-weight: 500;">${label}</span>
            </label>
        `;
    }).join('');

    modal.style.display = 'flex';
}

async function savePlan(e) {
    e.preventDefault();
    const btnSubmit = document.querySelector('button[form="plan-form"]');
    btnSubmit.innerText = "A salvar...";
    btnSubmit.disabled = true;

    const planId = document.getElementById('plan-id').value;
    
    // Mapear os módulos selecionados para um objeto { 'modulo1': true, 'modulo2': true }
    const allowedModules = {};
    document.querySelectorAll('input[name="plan-modules"]:checked').forEach(checkbox => {
        allowedModules[checkbox.value] = true;
    });

    const planData = {
        name: document.getElementById('plan-name').value,
        price: parseFloat(document.getElementById('plan-price').value),
        maxProfessionals: parseInt(document.getElementById('plan-profs').value),
        maxUsers: parseInt(document.getElementById('plan-users').value),
        allowedModules: allowedModules, // Salva os módulos vinculados ao plano
        updatedAt: new Date()
    };

    try {
        if (planId) {
            // Atualizar plano existente
            const planRef = doc(db, 'plans', planId);
            await updateDoc(planRef, planData);
        } else {
            // Criar novo plano
            planData.createdAt = new Date();
            await addDoc(collection(db, 'plans'), planData);
        }

        document.getElementById('plan-modal').style.display = 'none';
        await fetchPlans(); // Recarrega a tabela

    } catch (error) {
        console.error("Erro ao salvar plano:", error);
        alert("Erro ao salvar o plano. Verifica o consola.");
    } finally {
        btnSubmit.innerText = "Salvar Plano";
        btnSubmit.disabled = false;
    }
}

async function deletePlan(planId) {
    if (!confirm("Tem certeza que deseja excluir este plano? Esta ação não pode ser desfeita.")) return;

    try {
        await deleteDoc(doc(db, 'plans', planId));
        await fetchPlans(); // Recarrega a tabela
    } catch (error) {
        console.error("Erro ao deletar plano:", error);
        alert("Erro ao excluir o plano.");
    }
}