// Arquivo: js/admin/super-security.js

// 1. Importamos a configuração centralizada do Firebase
import { auth } from '../firebase-config.js'; 
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// 2. Definição da Matriz de Permissões
const PERMISSIONS = {
    'super_admin': ['dashboard', 'establishments', 'whatsapp', 'financial', 'team', 'settings'],
    'support': ['establishments', 'whatsapp'],
    'financial': ['dashboard', 'establishments', 'financial'],
    'developer': ['whatsapp', 'settings']
};

export let currentUserRole = null;

// 3. Função Principal de Inicialização e Segurança
export function initializeSecurity() {
    // Esconde a página até confirmarmos a identidade e permissões
    document.body.style.display = 'none';

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                // Lê o Token do utilizador (Custom Claims)
                const idTokenResult = await user.getIdTokenResult();
                let role = idTokenResult.claims.role;

                // Normaliza o nome do cargo (converte hífen para underscore se necessário)
                if (role === 'super-admin') {
                    role = 'super_admin';
                }

                // Verifica se o cargo existe na nossa matriz de permissões
                if (role && PERMISSIONS[role]) {
                    currentUserRole = role; 
                    console.log("🛡️ Acesso Seguro Concedido! Perfil:", currentUserRole);

                    // Aplica as restrições visuais na tela
                    applyUIPermissions(currentUserRole);

                    // Revela a tela
                    document.body.style.display = 'flex';
                } else {
                    // Utilizador autenticado mas sem permissões de painel
                    console.error("🚨 Intruso detectado: Conta sem cargo de gestão.");
                    await signOut(auth); 
                    window.location.href = 'admin-login.html';
                }
            } catch (error) {
                console.error("Erro ao verificar permissões de segurança:", error);
                window.location.href = 'admin-login.html';
            }
        } else {
            // Ninguém logado, redireciona para o login
            window.location.href = 'admin-login.html';
        }
    });
}

// 4. Função que destrói elementos HTML não autorizados
function applyUIPermissions(role) {
    const allowedModules = PERMISSIONS[role] || [];
    const protectedElements = document.querySelectorAll('[data-module]');

    protectedElements.forEach(element => {
        const moduleName = element.getAttribute('data-module');
        if (!allowedModules.includes(moduleName)) {
            element.remove(); 
        }
    });
}

// 5. Função auxiliar para deslogar
export async function logoutAdmin() {
    try {
        await signOut(auth);
        window.location.href = 'admin-login.html';
    } catch (error) {
        console.error("Erro ao sair do sistema:", error);
    }
}