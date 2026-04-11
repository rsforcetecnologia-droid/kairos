// Arquivo: js/admin/super-financial.js

import { db } from '../firebase-config.js'; 
import { collection, getDocs, addDoc, doc, deleteDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

export async function loadFinancial(container) {
    
    // 1. Estrutura da Tela: Cabeçalho, Formulário Oculto e Grade de Planos
    container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
            <h3 style="color: #1f2937; font-size: 1.5rem; font-weight: 600;">💳 Gestão de Planos & Assinaturas</h3>
            <button id="btn-new-plan" style="background: #10b981; color: white; border: none; padding: 10px 18px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: background 0.2s;">+ Novo Plano</button>
        </div>

        <div id="modal-new-plan" style="display: none; background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 30px; border: 1px solid #e5e7eb; border-top: 4px solid #10b981;">
            <h4 style="margin-top: 0; color: #374151; font-size: 1.1rem; margin-bottom: 15px;">Criar Novo Pacote / Plano</h4>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                    <label style="display:block; font-size: 0.85rem; font-weight: 600; color: #4b5563; margin-bottom: 5px;">Nome do Plano</label>
                    <input type="text" id="plan-name" placeholder="Ex: Plano Pro" style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box;">
                </div>
                <div>
                    <label style="display:block; font-size: 0.85rem; font-weight: 600; color: #4b5563; margin-bottom: 5px;">Preço Mensal (R$)</label>
                    <input type="number" id="plan-price" placeholder="Ex: 97.00" step="0.01" style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box;">
                </div>
                <div style="grid-column: span 2;">
                    <label style="display:block; font-size: 0.85rem; font-weight: 600; color: #4b5563; margin-bottom: 5px;">Limite Mensal de WhatsApp</label>
                    <input type="number" id="plan-wa-limit" placeholder="Ex: 1000 (Deixe em branco para Ilimitado)" style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box;">
                </div>
            </div>
            
            <div style="margin-top: 20px; display: flex; justify-content: flex-end; gap: 10px;">
                <button id="btn-cancel-plan" style="background: #f3f4f6; color: #4b5563; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 500;">Cancelar</button>
                <button id="btn-save-plan" style="background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600;">Salvar no Banco</button>
            </div>
        </div>

        <h4 style="color: #4b5563; margin-bottom: 15px; font-size: 1.1rem;">Pacotes Ativos no Sistema</h4>
        <p id="loading-plans" style="color: #6b7280; font-style: italic;">Buscando pacotes no banco de dados...</p>
        
        <div id="plans-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">
            </div>
    `;

    // 2. Chama a função que busca os planos no Firebase
    await fetchAndRenderPlans();

    // 3. Configura as ações dos botões do formulário
    setupFormEvents(container);
}

// --- Funções de Lógica ---

async function fetchAndRenderPlans() {
    const grid = document.getElementById('plans-grid');
    const loading = document.getElementById('loading-plans');
    
    try {
        // Busca na coleção 'packages' (ou mude para 'plans' se for assim no seu banco)
        const querySnapshot = await getDocs(collection(db, 'packages'));
        
        loading.style.display = 'none'; // Esconde o texto de carregando
        let htmlCards = "";

        if (querySnapshot.empty) {
            grid.innerHTML = `<p style="color: #9ca3af; grid-column: span 3;">Nenhum plano cadastrado. Crie o primeiro!</p>`;
            return;
        }

        // Loop para desenhar cada plano encontrado
        querySnapshot.forEach((docSnap) => {
            const plan = docSnap.data();
            const id = docSnap.id;
            
            // Tratamento de dados
            const priceFormated = parseFloat(plan.price || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const waLimit = plan.whatsappLimit ? `${plan.whatsappLimit} msgs/mês` : '💬 WhatsApp Ilimitado';

            htmlCards += `
                <div style="background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 25px; box-shadow: 0 2px 5px rgba(0,0,0,0.02); display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h3 style="margin: 0 0 10px 0; color: #1f2937; font-size: 1.2rem;">${plan.name || 'Plano Sem Nome'}</h3>
                        <div style="font-size: 2rem; font-weight: 700; color: #3b82f6; margin-bottom: 15px;">${priceFormated}</div>
                        <ul style="list-style: none; padding: 0; margin: 0; color: #6b7280; font-size: 0.9rem;">
                            <li style="margin-bottom: 8px;">✅ Acesso Completo ao Kairos</li>
                            <li style="margin-bottom: 8px;">✅ Suporte Prioritário</li>
                            <li style="margin-bottom: 8px; font-weight: 600; color: #10b981;">${waLimit}</li>
                        </ul>
                    </div>
                    <div style="margin-top: 25px; border-top: 1px solid #f3f4f6; padding-top: 15px; display: flex; justify-content: space-between;">
                        <span style="font-size: 0.75rem; color: #9ca3af;">ID: ${id.substring(0, 8)}...</span>
                        <button class="btn-delete-plan" data-id="${id}" style="background: transparent; color: #ef4444; border: none; font-size: 0.85rem; font-weight: 600; cursor: pointer; text-decoration: underline;">Excluir</button>
                    </div>
                </div>
            `;
        });

        grid.innerHTML = htmlCards;

        // Adiciona evento de clique aos botões de excluir
        document.querySelectorAll('.btn-delete-plan').forEach(btn => {
            btn.addEventListener('click', deletePlan);
        });

    } catch (error) {
        console.error("Erro ao buscar planos:", error);
        loading.innerText = "Erro ao buscar os planos. Verifique o console.";
        loading.style.color = "red";
    }
}

function setupFormEvents(container) {
    const modal = document.getElementById('modal-new-plan');
    const btnNew = document.getElementById('btn-new-plan');
    const btnCancel = document.getElementById('btn-cancel-plan');
    const btnSave = document.getElementById('btn-save-plan');

    // Mostra o formulário
    btnNew.addEventListener('click', () => {
        modal.style.display = 'block';
        btnNew.style.display = 'none'; // Esconde o botão de "+ Novo"
    });

    // Esconde o formulário
    btnCancel.addEventListener('click', () => {
        modal.style.display = 'none';
        btnNew.style.display = 'block';
    });

    // Salva o plano no banco de dados
    btnSave.addEventListener('click', async () => {
        const name = document.getElementById('plan-name').value;
        const price = document.getElementById('plan-price').value;
        const limit = document.getElementById('plan-wa-limit').value;

        if (!name || !price) {
            alert("Nome e Preço são obrigatórios!");
            return;
        }

        btnSave.innerText = "Salvando...";
        btnSave.disabled = true;

        try {
            // Adiciona um novo documento na coleção 'packages'
            await addDoc(collection(db, 'packages'), {
                name: name,
                price: parseFloat(price),
                whatsappLimit: limit ? parseInt(limit) : null,
                createdAt: serverTimestamp(),
                status: 'active'
            });

            // Limpa o formulário e atualiza a tela
            document.getElementById('plan-name').value = '';
            document.getElementById('plan-price').value = '';
            document.getElementById('plan-wa-limit').value = '';
            
            modal.style.display = 'none';
            btnNew.style.display = 'block';
            btnSave.innerText = "Salvar no Banco";
            btnSave.disabled = false;

            // Recarrega os cards
            document.getElementById('loading-plans').style.display = 'block';
            await fetchAndRenderPlans();

        } catch (error) {
            console.error("Erro ao criar plano:", error);
            alert("Erro ao criar plano: " + error.message);
            btnSave.innerText = "Salvar no Banco";
            btnSave.disabled = false;
        }
    });
}

// Função para deletar plano
async function deletePlan(e) {
    const planId = e.target.getAttribute('data-id');
    
    if (confirm("ATENÇÃO: Tem certeza que deseja apagar este plano? Clientes que já o possuem podem ser afetados se você não migrá-los antes.")) {
        try {
            await deleteDoc(doc(db, 'packages', planId));
            // Recarrega a grade
            document.getElementById('loading-plans').style.display = 'block';
            await fetchAndRenderPlans();
        } catch (error) {
            console.error("Erro ao deletar:", error);
            alert("Erro ao deletar o plano.");
        }
    }
}