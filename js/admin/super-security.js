// Arquivo: js/admin/super-security.js

import { auth, db } from '../firebase-config.js'; // Ajuste o caminho se necessário

// ✅ CORREÇÃO 1: Atualizado para a versão 11.6.1 para bater com o admin-login.html
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// 1. Definição da Matriz de Permissões (Quem pode acessar quais módulos)
const PERMISSIONS = {
    'super_admin': ['dashboard', 'establishments', 'whatsapp', 'financial', 'team', 'settings'],
    'support': ['establishments', 'whatsapp'],
    'financial': ['dashboard', 'establishments', 'financial'],
    'developer': ['whatsapp', 'settings']
};

// Variável global que guardará o cargo do usuário logado para usarmos em outras telas
export let currentUserRole = null;

// 2. Função Principal que inicializa a segurança da página
export function initializeSecurity() {
    // Escondemos o corpo inteiro da página até termos certeza de quem é o usuário
    document.body.style.display = 'none';

    // Fica escutando se existe alguém logado no Firebase
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // O usuário tem um login válido, mas qual é o cargo dele?
            try {
                // Buscamos o documento do usuário na coleção 'admin_users'
                const userDocRef = doc(db, 'admin_users', user.uid); 
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    // Pegamos a role. Se por algum erro não tiver, setamos como 'support' por segurança
                    currentUserRole = userData.role || 'support'; 

                    console.log("🛡️ Acesso concedido. Perfil:", currentUserRole);

                    // Executa a limpeza da interface baseada no cargo
                    applyUIPermissions(currentUserRole);

                    // Agora que a tela está limpa e segura, mostramos ela
                    document.body.style.display = 'flex';
                } else {
                    // CUIDADO: O usuário tem login, mas não está na tabela de administradores!
                    console.error("🚨 Intruso detectado: Usuário sem registro de Admin.");
                    await signOut(auth); // Desloga o intruso à força
                    
                    // ✅ CORREÇÃO 2: Removida a barra inicial para caminho relativo
                    window.location.href = 'admin-login.html';
                }
            } catch (error) {
                console.error("Erro ao verificar permissões de segurança:", error);
                window.location.href = 'admin-login.html';
            }
        } else {
            // Não há ninguém logado, redireciona para a tela de login
            window.location.href = 'admin-login.html';
        }
    });
}

// 3. Função que destrói elementos HTML não autorizados
function applyUIPermissions(role) {
    // Pega a lista de módulos que este cargo pode ver
    const allowedModules = PERMISSIONS[role] || [];

    // Busca no HTML todos os elementos que possuem o atributo "data-module"
    const protectedElements = document.querySelectorAll('[data-module]');

    protectedElements.forEach(element => {
        const moduleName = element.getAttribute('data-module');

        // Se o módulo deste elemento HTML NÃO estiver na lista de permitidos...
        if (!allowedModules.includes(moduleName)) {
            // Removemos o elemento completamente do código fonte da página
            element.remove(); 
        }
    });
}

// 4. Função auxiliar para deslogar (você usará isso no botão de Sair do menu)
export async function logoutAdmin() {
    try {
        await signOut(auth);
        window.location.href = 'admin-login.html';
    } catch (error) {
        console.error("Erro ao sair:", error);
    }
}