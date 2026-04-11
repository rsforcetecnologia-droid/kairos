// Arquivo: js/admin/super-establishments.js

import { db } from '../firebase-config.js'; 
import { collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Função principal que renderiza a tela
export async function loadEstablishments(container) {
    
    // 1. Desenhamos a estrutura básica e a mensagem de carregamento
    container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
            <h3 style="color: #1f2937; font-size: 1.5rem; font-weight: 600;">🏢 Gestão de Estabelecimentos</h3>
            <button id="btn-add-client" style="background: #3b82f6; color: white; border: none; padding: 10px 18px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: background 0.2s;">+ Novo Cliente</button>
        </div>

        <div style="background: white; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); overflow: hidden;">
            <div style="padding: 20px;">
                <p id="loading-msg" style="color: #6b7280; font-style: italic;">Buscando clientes no banco de dados...</p>
                
                <div style="overflow-x: auto;">
                    <table id="clients-table" style="width: 100%; border-collapse: collapse; display: none;">
                        <thead>
                            <tr style="background-color: #f9fafb; border-bottom: 2px solid #e5e7eb; text-align: left; color: #4b5563; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px;">
                                <th style="padding: 15px 20px;">Empresa / Cliente</th>
                                <th style="padding: 15px 20px;">Contato</th>
                                <th style="padding: 15px 20px;">Plano Atual</th>
                                <th style="padding: 15px 20px;">Status</th>
                                <th style="padding: 15px 20px; text-align: right;">Ações</th>
                            </tr>
                        </thead>
                        <tbody id="clients-tbody">
                            </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    try {
        // 2. Busca os dados na coleção de estabelecimentos
        const querySnapshot = await getDocs(collection(db, 'establishments'));
        const tbody = document.getElementById('clients-tbody');
        const table = document.getElementById('clients-table');
        const loadingMsg = document.getElementById('loading-msg');

        if (querySnapshot.empty) {
            loadingMsg.innerText = "Nenhum estabelecimento cadastrado ainda.";
            return;
        }

        let rowsHTML = "";

        // 3. Monta cada linha da tabela
        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const id = docSnap.id;

            // Extração segura de dados (se o campo não existir, coloca um texto padrão)
            const name = data.name || data.nomeFantasia || "Sem Nome Registrado";
            const email = data.email || "Sem e-mail";
            const phone = data.phone || data.whatsapp || "Sem telefone";
            const plan = data.planName || "Plano Básico";
            const status = data.status || "active"; 

            // 4. Lógica das "Etiquetas" (Badges) de Status e Botões de Ação
            let statusBadge = "";
            let actionBtn = "";
            
            if (status === 'active') {
                statusBadge = `<span style="background: #d1fae5; color: #065f46; padding: 5px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700;">ATIVO</span>`;
                // Se está ativo, o botão mostra "Bloquear" (Vermelho)
                actionBtn = `<button class="btn-toggle-status" data-id="${id}" data-action="block" style="background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 600; margin-right: 8px;">Bloquear</button>`;
            } else {
                // Se não está ativo (bloqueado, pendente, etc)
                statusBadge = `<span style="background: #fee2e2; color: #991b1b; padding: 5px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700;">BLOQUEADO</span>`;
                // Se está bloqueado, o botão mostra "Desbloquear" (Verde)
                actionBtn = `<button class="btn-toggle-status" data-id="${id}" data-action="unblock" style="background: #d1fae5; color: #047857; border: 1px solid #6ee7b7; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 600; margin-right: 8px;">Desbloquear</button>`;
            }

            // Constrói a linha HTML
            rowsHTML += `
                <tr style="border-bottom: 1px solid #f3f4f6; transition: background 0.2s;" onmouseover="this.style.backgroundColor='#f9fafb'" onmouseout="this.style.backgroundColor='transparent'">
                    <td style="padding: 15px 20px;">
                        <strong style="color: #111827; display: block;">${name}</strong>
                        <small style="color: #9ca3af; font-family: monospace;">ID: ${id}</small>
                    </td>
                    <td style="padding: 15px 20px; color: #4b5563;">
                        <span style="display: block;">${email}</span>
                        <small style="color: #6b7280;">${phone}</small>
                    </td>
                    <td style="padding: 15px 20px; color: #374151; font-weight: 500;">${plan}</td>
                    <td style="padding: 15px 20px;">${statusBadge}</td>
                    <td style="padding: 15px 20px; text-align: right;">
                        ${actionBtn}
                        <button class="btn-impersonate" data-id="${id}" style="background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 600;">Entrar</button>
                    </td>
                </tr>
            `;
        });

        // 5. Injeta as linhas prontas na tabela e esconde o texto de "Carregando"
        tbody.innerHTML = rowsHTML;
        loadingMsg.style.display = 'none';
        table.style.display = 'table';

        // 6. Ativa a funcionalidade dos botões recém-criados
        attachButtonEvents(container);

    } catch (error) {
        console.error("Erro ao carregar clientes:", error);
        container.innerHTML = `<div style="background: #fee2e2; color: #991b1b; padding: 20px; border-radius: 8px;">Erro ao carregar lista de clientes. Verifique o console.</div>`;
    }
}

// --- Funções Auxiliares de Lógica ---

function attachButtonEvents(container) {
    // Evento de Bloquear / Desbloquear
    const toggleBtns = document.querySelectorAll('.btn-toggle-status');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const estabId = e.target.getAttribute('data-id');
            const action = e.target.getAttribute('data-action');
            await handleStatusChange(estabId, action, container);
        });
    });

    // Evento de Entrar (Impersonate)
    const impersonateBtns = document.querySelectorAll('.btn-impersonate');
    impersonateBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const estabId = e.target.getAttribute('data-id');
            alert(`Acesso Administrativo ao cliente ID: ${estabId} \n\n(A lógica de login rápido será implementada aqui!)`);
        });
    });
}

async function handleStatusChange(id, action, container) {
    const newStatus = action === 'block' ? 'blocked' : 'active';
    const confirmMsg = action === 'block' 
        ? 'Tem certeza que deseja SUSPENDER o acesso deste cliente?' 
        : 'Tem certeza que deseja RESTAURAR o acesso deste cliente?';

    // Proteção para evitar cliques acidentais
    if (!confirm(confirmMsg)) return;

    try {
        // Aponta para o documento exato do cliente no Firebase
        const estabRef = doc(db, 'establishments', id);
        
        // Atualiza apenas o campo 'status'
        await updateDoc(estabRef, {
            status: newStatus
        });
        
        // Recarrega a tela para a tabela atualizar as cores e botões
        loadEstablishments(container); 

    } catch (error) {
        console.error("Erro ao alterar status:", error);
        alert("Falha ao atualizar o banco de dados: " + error.message);
    }
}