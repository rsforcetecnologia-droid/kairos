// js/admin/createTenant.js

// 🛡️ NOVO: Importamos a instância do Firebase Auth para obter o Token do Admin logado
import { auth } from '../firebase-config.js'; 

document.addEventListener("DOMContentLoaded", () => {
    const formCreateTenant = document.getElementById('formCreateTenant');
    const submitBtn = document.getElementById('btnCreateTenant');
    const feedbackMsg = document.getElementById('feedbackMsg');

    if (formCreateTenant) {
        formCreateTenant.addEventListener('submit', async (event) => {
            event.preventDefault(); 
            
            submitBtn.disabled = true;
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="ph ph-circle-notch loader" style="display:inline-block"></i> Criando...';
            
            if (feedbackMsg) feedbackMsg.style.display = 'none';

            const establishmentName = document.getElementById('newTenantName').value;
            const establishmentId = document.getElementById('newTenantId').value;
            const ownerEmail = document.getElementById('newTenantEmail').value;
            const ownerPassword = document.getElementById('newTenantPassword').value;
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            const payload = {
                establishmentName: establishmentName,
                establishmentId: establishmentId,
                ownerEmail: ownerEmail,
                ownerPassword: ownerPassword,
                timezone: timezone
            };

            try {
                // 🛡️ NOVO: Capturamos o administrador logado e o seu token de acesso
                const currentUser = auth.currentUser;
                
                if (!currentUser) {
                    throw new Error("Erro: Administrador não autenticado. Por favor, faça login novamente.");
                }

                // O método getIdToken() pega o token JWT seguro do Firebase
                const token = await currentUser.getIdToken();

                const response = await fetch('/api/public/register', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        // 🛡️ NOVO: Enviamos o token no cabeçalho Authorization
                        'Authorization': `Bearer ${token}` 
                    },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || "Erro ao criar o ambiente do cliente.");
                }

                submitBtn.innerHTML = '<i class="ph ph-check"></i> Criado com Sucesso!';
                submitBtn.classList.add('success-btn'); 
                
                if (feedbackMsg) {
                    feedbackMsg.textContent = result.message || 'Ambiente criado! O dono já pode fazer login.';
                    feedbackMsg.style.color = '#10b981'; 
                    feedbackMsg.style.display = 'block';
                }

                formCreateTenant.reset();

            } catch (error) {
                console.error("Falha ao criar tenant:", error);
                
                if (feedbackMsg) {
                    feedbackMsg.textContent = error.message;
                    feedbackMsg.style.color = '#ef4444'; 
                    feedbackMsg.style.display = 'block';
                }
            } finally {
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.classList.remove('success-btn');
                }, 3000);
            }
        });
    }
});