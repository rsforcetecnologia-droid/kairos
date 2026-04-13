// Arquivo: js/admin/super-establishments.js

import { db, collection, getDocs, doc, updateDoc } from '../firebase-config.js'; 

// Variáveis globais para cachear os dados e evitar consultas repetidas
let cachedEstablishments = [];
let cachedPlans = []; // NOVO: Armazenar os planos vindos do banco de dados

export async function loadEstablishments(container) {
    
    // 1. Desenhamos a estrutura básica
    container.innerHTML = `
        <style>
            .estab-table th { background-color: #f8fafc; font-weight: 600; color: #475569; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em; }
            .estab-row:hover { background-color: #f1f5f9; cursor: pointer; }
            .badge { padding: 4px 10px; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
            .badge-active { background-color: #dcfce7; color: #166534; }
            .badge-blocked { background-color: #fee2e2; color: #991b1b; }
            
            /* Slide-out Panel */
            .slide-panel-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.4); z-index: 40; display: none; opacity: 0; transition: opacity 0.3s; }
            .slide-panel { position: fixed; top: 0; right: -600px; width: 100%; max-width: 500px; height: 100vh; background: #fff; z-index: 50; box-shadow: -4px 0 15px rgba(0,0,0,0.1); transition: right 0.3s ease-in-out; display: flex; flex-direction: column; }
            .slide-panel.open { right: 0; }
            .slide-panel-header { padding: 20px 25px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; background: #f8fafc; }
            .slide-panel-content { padding: 25px; overflow-y: auto; flex: 1; }
            .slide-panel-footer { padding: 20px 25px; border-top: 1px solid #e2e8f0; background: #f8fafc; display: flex; justify-content: flex-end; gap: 10px; }
            
            /* Formulário no Panel */
            .form-group { margin-bottom: 15px; }
            .form-group label { display: block; font-size: 0.85rem; font-weight: 600; color: #475569; margin-bottom: 5px; }
            .form-control { width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.9rem; color: #1e293b; transition: border 0.2s; box-sizing: border-box;}
            .form-control:focus { border-color: #3b82f6; outline: none; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
            .form-row { display: flex; gap: 15px; }
            .form-row > div { flex: 1; }
            
            .btn-primary { background: #3b82f6; color: white; border: none; padding: 10px 18px; border-radius: 6px; cursor: pointer; font-weight: 600; transition: background 0.2s; }
            .btn-primary:hover { background: #2563eb; }
            .btn-secondary { background: #e2e8f0; color: #475569; border: none; padding: 10px 18px; border-radius: 6px; cursor: pointer; font-weight: 600; transition: background 0.2s; }
            .btn-secondary:hover { background: #cbd5e1; }
            .btn-danger { background: #fee2e2; color: #dc2626; border: 1px solid #fecaca; padding: 10px 18px; border-radius: 6px; cursor: pointer; font-weight: 600; }
            .btn-success { background: #dcfce7; color: #16a34a; border: 1px solid #bbf7d0; padding: 10px 18px; border-radius: 6px; cursor: pointer; font-weight: 600; }
            .btn-outline { background: transparent; color: #3b82f6; border: 1px solid #3b82f6; padding: 10px 18px; border-radius: 6px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 5px;}
        </style>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
            <div>
                <h3 style="color: #0f172a; font-size: 1.5rem; font-weight: 700; margin: 0;">🏢 Gestão de Estabelecimentos</h3>
                <p style="color: #64748b; font-size: 0.9rem; margin-top: 5px;">Gerencie assinaturas, acessos e detalhes dos clientes Kairos.</p>
            </div>
            <button id="btn-add-client" class="btn-primary">+ Novo Cliente</button>
        </div>

        <div style="background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); overflow: hidden;">
            <div style="padding: 20px;">
                <p id="loading-msg" style="color: #64748b; font-style: italic; text-align: center; padding: 20px;">A carregar base de dados...</p>
                
                <div style="overflow-x: auto;">
                    <table id="clients-table" class="estab-table" style="width: 100%; border-collapse: collapse; display: none;">
                        <thead>
                            <tr style="border-bottom: 2px solid #e2e8f0; text-align: left;">
                                <th style="padding: 15px;">Empresa</th>
                                <th style="padding: 15px;">Dono / Contato</th>
                                <th style="padding: 15px;">Plano</th>
                                <th style="padding: 15px;">Vencimento</th>
                                <th style="padding: 15px;">Status</th>
                                <th style="padding: 15px; text-align: right;">Ações</th>
                            </tr>
                        </thead>
                        <tbody id="clients-tbody"></tbody>
                    </table>
                </div>
            </div>
        </div>

        <div id="slide-overlay" class="slide-panel-overlay"></div>

        <div id="slide-panel" class="slide-panel">
            <div class="slide-panel-header">
                <h3 style="margin: 0; color: #0f172a; font-size: 1.2rem;">Detalhes do Estabelecimento</h3>
                <button id="btn-close-panel" style="background: none; border: none; font-size: 1.5rem; color: #64748b; cursor: pointer;">&times;</button>
            </div>
            
            <div class="slide-panel-content">
                <form id="form-estab-details">
                    <input type="hidden" id="edit-id">
                    
                    <h4 style="color: #3b82f6; margin-top: 0; margin-bottom: 15px; font-size: 0.9rem; text-transform: uppercase;">Acesso Rápido</h4>
                    <div style="display: flex; gap: 10px; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px dashed #e2e8f0;">
                        <button type="button" id="btn-impersonate-action" class="btn-outline">
                            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                            Entrar como Cliente
                        </button>
                        <button type="button" id="btn-toggle-status-action" class="btn-secondary" style="flex: 1;">Bloquear</button>
                    </div>

                    <h4 style="color: #3b82f6; margin-bottom: 15px; font-size: 0.9rem; text-transform: uppercase;">Dados da Empresa</h4>
                    <div class="form-group">
                        <label>Nome Fantasia / Empresa</label>
                        <input type="text" id="edit-name" class="form-control" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>CPF / CNPJ</label>
                            <input type="text" id="edit-cpfCnpj" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Tenant (URL Customizada)</label>
                            <input type="text" id="edit-tenant" class="form-control" placeholder="ex: barbearia-do-joao">
                        </div>
                    </div>

                    <h4 style="color: #3b82f6; margin-top: 20px; margin-bottom: 15px; font-size: 0.9rem; text-transform: uppercase;">Contato</h4>
                    <div class="form-group">
                        <label>Nome do Dono / Responsável</label>
                        <input type="text" id="edit-owner" class="form-control">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>E-mail</label>
                            <input type="email" id="edit-email" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>WhatsApp / Telefone</label>
                            <input type="text" id="edit-phone" class="form-control">
                        </div>
                    </div>

                    <h4 style="color: #3b82f6; margin-top: 20px; margin-bottom: 15px; font-size: 0.9rem; text-transform: uppercase;">Assinatura & Acesso</h4>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Plano Atual</label>
                            <select id="edit-plan" class="form-control">
                                <option value="">A carregar...</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Criado em</label>
                            <input type="text" id="edit-created" class="form-control" readonly style="background: #f1f5f9; color: #64748b;">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Vencimento da Fatura</label>
                            <input type="date" id="edit-dueDate" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Limite de Acesso</label>
                            <input type="date" id="edit-accessLimit" class="form-control">
                        </div>
                    </div>
                </form>
            </div>
            
            <div class="slide-panel-footer">
                <button type="button" id="btn-cancel-edit" class="btn-secondary">Cancelar</button>
                <button type="button" id="btn-save-edit" class="btn-primary">Salvar Alterações</button>
            </div>
        </div>
    `;

    // 2. Carrega os planos disponíveis primeiro, depois a tabela
    await fetchAvailablePlans();
    await fetchAndRenderTable();
    setupPanelEvents(container);
}

// --- Busca de Dados ---

// NOVO: Função que vai ao Firebase buscar os planos reais que criaste no "Planos & Faturas"
async function fetchAvailablePlans() {
    try {
        // Tenta ler a coleção "packages" (onde o Kairos costuma guardar os planos)
        const plansSnap = await getDocs(collection(db, 'packages')); 
        cachedPlans = [];

        if (!plansSnap.empty) {
            plansSnap.forEach(doc => {
                const planData = doc.data();
                // Tenta pegar o nome do plano (name, title ou nome)
                const planName = planData.name || planData.title || planData.nome || doc.id;
                cachedPlans.push(planName);
            });
        }

        // Fallback: Se a coleção "packages" estiver vazia, tenta "plans"
        if (cachedPlans.length === 0) {
            const plansSnap2 = await getDocs(collection(db, 'plans'));
            plansSnap2.forEach(doc => {
                const planData = doc.data();
                cachedPlans.push(planData.name || planData.title || planData.nome || doc.id);
            });
        }
    } catch (error) {
        console.warn("Aviso: Falha ao carregar planos do banco. Utilizando fallback padrão.", error);
    }
}

async function fetchAndRenderTable() {
    const tbody = document.getElementById('clients-tbody');
    const table = document.getElementById('clients-table');
    const loadingMsg = document.getElementById('loading-msg');

    try {
        const querySnapshot = await getDocs(collection(db, 'establishments'));
        cachedEstablishments = [];

        if (querySnapshot.empty) {
            loadingMsg.innerText = "Nenhum estabelecimento cadastrado.";
            return;
        }

        let rowsHTML = "";

        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            data.id = docSnap.id; 
            cachedEstablishments.push(data);

            const name = data.name || data.nomeFantasia || "Sem Nome";
            const owner = data.ownerName || data.dono || "Não informado";
            const phone = data.phone || data.whatsapp || "Sem telefone";
            const plan = data.planName || data.plano || "Sem Plano";
            const status = data.status || "active";
            const dueDate = data.dueDate ? formatDate(data.dueDate) : "Não def.";

            let statusBadge = status === 'active' 
                ? `<span class="badge badge-active">ATIVO</span>` 
                : `<span class="badge badge-blocked">BLOQUEADO</span>`;

            rowsHTML += `
                <tr class="estab-row" style="border-bottom: 1px solid #f1f5f9; transition: all 0.2s;" onclick="window.openEstablishmentDetails('${data.id}')">
                    <td style="padding: 15px;">
                        <strong style="color: #0f172a; display: block; font-size: 0.95rem;">${name}</strong>
                        <small style="color: #64748b; font-family: monospace;">ID: ${data.id.substring(0,8)}...</small>
                    </td>
                    <td style="padding: 15px; color: #475569; font-size: 0.9rem;">
                        <span style="display: block; font-weight: 500; color: #1e293b;">${owner}</span>
                        <small style="color: #64748b;">${phone}</small>
                    </td>
                    <td style="padding: 15px; color: #334155; font-weight: 500; font-size: 0.9rem;">${plan}</td>
                    <td style="padding: 15px; color: #475569; font-size: 0.9rem;">${dueDate}</td>
                    <td style="padding: 15px;">${statusBadge}</td>
                    <td style="padding: 15px; text-align: right;">
                        <button class="btn-secondary" style="padding: 6px 12px; font-size: 0.8rem;" onclick="event.stopPropagation(); window.openEstablishmentDetails('${data.id}')">Gerenciar</button>
                    </td>
                </tr>
            `;
        });

        tbody.innerHTML = rowsHTML;
        loadingMsg.style.display = 'none';
        table.style.display = 'table';

    } catch (error) {
        console.error("Erro ao carregar clientes:", error);
        loadingMsg.innerHTML = `<span style="color: #dc2626;">Erro ao carregar base de dados.</span>`;
    }
}

// --- Lógica do Painel Lateral ---

function setupPanelEvents(container) {
    const overlay = document.getElementById('slide-overlay');
    const panel = document.getElementById('slide-panel');
    const btnClose = document.getElementById('btn-close-panel');
    const btnCancel = document.getElementById('btn-cancel-edit');
    const btnSave = document.getElementById('btn-save-edit');
    const btnImpersonate = document.getElementById('btn-impersonate-action');
    const btnToggleStatus = document.getElementById('btn-toggle-status-action');

    const closePanel = () => {
        panel.classList.remove('open');
        overlay.style.opacity = '0';
        setTimeout(() => overlay.style.display = 'none', 300);
    };

    btnClose.addEventListener('click', closePanel);
    btnCancel.addEventListener('click', closePanel);
    overlay.addEventListener('click', closePanel);

    window.openEstablishmentDetails = (id) => {
        const estab = cachedEstablishments.find(e => e.id === id);
        if(!estab) return;

        document.getElementById('edit-id').value = estab.id;
        document.getElementById('edit-name').value = estab.name || estab.nomeFantasia || "";
        document.getElementById('edit-cpfCnpj').value = estab.cpfCnpj || estab.cnpj || "";
        document.getElementById('edit-tenant').value = estab.tenant || estab.slug || "";
        document.getElementById('edit-owner').value = estab.ownerName || estab.dono || "";
        document.getElementById('edit-email').value = estab.email || "";
        document.getElementById('edit-phone').value = estab.phone || estab.whatsapp || "";
        
        // --- PREENCHIMENTO DINÂMICO DO SELECT DE PLANOS ---
        const planSelect = document.getElementById('edit-plan');
        planSelect.innerHTML = ''; // Limpa as opções atuais
        
        // 1. Injeta os planos lidos da base de dados
        cachedPlans.forEach(planName => {
            planSelect.add(new Option(planName, planName));
        });

        // 2. Verifica o plano que o cliente já tem assinado
        let currentPlan = estab.planName || estab.plano || "";
        
        // 3. Se o cliente tiver um plano antigo que já não existe na base de dados, adicionamos à lista com um aviso para não perder dados
        if (currentPlan && !cachedPlans.includes(currentPlan)) {
            planSelect.add(new Option(`${currentPlan} (Descontinuado)`, currentPlan));
        }

        // Seleciona o plano no menu
        planSelect.value = currentPlan;

        // Datas
        document.getElementById('edit-created').value = estab.createdAt ? formatDate(estab.createdAt) : "Desconhecida";
        document.getElementById('edit-dueDate').value = estab.dueDate || "";
        document.getElementById('edit-accessLimit').value = estab.accessLimit || "";

        // Status Button Config
        const status = estab.status || 'active';
        if(status === 'active'){
            btnToggleStatus.className = 'btn-danger';
            btnToggleStatus.innerText = 'Suspender Acesso';
            btnToggleStatus.dataset.action = 'block';
        } else {
            btnToggleStatus.className = 'btn-success';
            btnToggleStatus.innerText = 'Restaurar Acesso';
            btnToggleStatus.dataset.action = 'unblock';
        }

        btnImpersonate.dataset.id = estab.id;
        btnImpersonate.dataset.name = estab.name || estab.nomeFantasia || "Estabelecimento";

        overlay.style.display = 'block';
        setTimeout(() => {
            overlay.style.opacity = '1';
            panel.classList.add('open');
        }, 10);
    };

    btnSave.addEventListener('click', async () => {
        const id = document.getElementById('edit-id').value;
        const btnOriginalText = btnSave.innerText;
        btnSave.innerText = 'Salvando...';
        btnSave.disabled = true;

        try {
            const estabRef = doc(db, 'establishments', id);
            await updateDoc(estabRef, {
                name: document.getElementById('edit-name').value,
                nomeFantasia: document.getElementById('edit-name').value, 
                cpfCnpj: document.getElementById('edit-cpfCnpj').value,
                tenant: document.getElementById('edit-tenant').value,
                slug: document.getElementById('edit-tenant').value, 
                ownerName: document.getElementById('edit-owner').value,
                email: document.getElementById('edit-email').value,
                phone: document.getElementById('edit-phone').value,
                planName: document.getElementById('edit-plan').value, // Salva o novo plano escolhido
                plano: document.getElementById('edit-plan').value, // Duplicado por segurança
                dueDate: document.getElementById('edit-dueDate').value,
                accessLimit: document.getElementById('edit-accessLimit').value
            });

            closePanel();
            await fetchAndRenderTable(); 
            
            const btnTitle = document.getElementById('btn-add-client');
            const originalTitleText = btnTitle.innerText;
            btnTitle.innerText = "✔ Salvo com sucesso!";
            btnTitle.style.background = "#16a34a";
            setTimeout(() => {
                btnTitle.innerText = originalTitleText;
                btnTitle.style.background = "";
            }, 3000);

        } catch (error) {
            console.error("Erro ao atualizar estabelecimento:", error);
            alert("Erro ao salvar: " + error.message);
        } finally {
            btnSave.innerText = btnOriginalText;
            btnSave.disabled = false;
        }
    });

    btnToggleStatus.addEventListener('click', async () => {
        const id = document.getElementById('edit-id').value;
        const action = btnToggleStatus.dataset.action;
        const newStatus = action === 'block' ? 'blocked' : 'active';
        
        if(!confirm(`Deseja realmente ${action === 'block' ? 'BLOQUEAR' : 'DESBLOQUEAR'} este estabelecimento?`)) return;

        try {
            btnToggleStatus.innerText = 'Aguarde...';
            const estabRef = doc(db, 'establishments', id);
            await updateDoc(estabRef, { status: newStatus });
            
            closePanel();
            await fetchAndRenderTable();
        } catch (error) {
            console.error("Erro ao alterar status:", error);
            alert("Erro: " + error.message);
            btnToggleStatus.innerText = action === 'block' ? 'Suspender Acesso' : 'Restaurar Acesso';
        }
    });

    btnImpersonate.addEventListener('click', () => {
        const estabId = btnImpersonate.dataset.id;
        const estabName = btnImpersonate.dataset.name;

        if(confirm(`Deseja entrar no ambiente do cliente "${estabName}"?\n\nIsto abrirá o sistema numa nova janela.`)) {
            localStorage.setItem('kairos_superadmin_impersonating', 'true');
            localStorage.setItem('tenantId', estabId); 
            localStorage.setItem('tenantName', estabName);
            
            window.open('/app.html', '_blank'); 
        }
    });
}

function formatDate(dateInput) {
    if(!dateInput) return "";
    let date;
    if (typeof dateInput.toDate === 'function') {
        date = dateInput.toDate();
    } else {
        date = new Date(dateInput);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    }
    if (isNaN(date.getTime())) return dateInput; 
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}