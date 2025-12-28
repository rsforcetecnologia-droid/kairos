// js/ui/push-notifications.js

import { messaging, getToken, onMessage, db, auth } from '../firebase-config.js';
import { doc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// --- CONFIGURAÇÃO ---
// Você precisa gerar essa chave no Console do Firebase -> Configurações -> Cloud Messaging -> Web Configuration
// Se ainda não gerou, siga o passo 0 da explicação anterior.
const VAPID_KEY = 'BEvQyGIb-iov8EWUJPLpbBKxNKYWhnsvvginIvgiyeQsNV9mjfiiE17EeQ0d3DlwYKZmWH-xkbyoeMmDEcCJrPs'; 

/**
 * Inicializa o processo de notificações push.
 * Deve ser chamado apenas quando o usuário já estiver logado.
 */
export async function initPushNotifications() {
    // 1. Verifica se o navegador suporta notificações
    if (!('Notification' in window)) {
        console.warn("Este navegador não suporta notificações de desktop.");
        return;
    }

    try {
        // 2. Solicita permissão ao usuário
        // O navegador vai mostrar aquele popup: "Kairos deseja enviar notificações"
        const permission = await Notification.requestPermission();
        
        if (permission === 'granted') {
            console.log('Permissão de notificação concedida.');
            
            // 3. Obtém o Token de Registro do FCM
            const token = await getToken(messaging, { 
                vapidKey: VAPID_KEY 
            });

            if (token) {
                console.log('Token FCM obtido com sucesso:', token);
                // 4. Salva o token no perfil do usuário no Firestore
                await saveTokenToFirestore(token);
            } else {
                console.log('Não foi possível obter o token de registro. Verifique a chave VAPID.');
            }

        } else {
            console.warn('Permissão de notificação negada pelo usuário.');
        }
    } catch (error) {
        console.error('Erro ao configurar notificações:', error);
    }

    // 5. Configura o ouvinte para mensagens quando o app está ABERTO (Foreground)
    // Quando o app está fechado/minimizado, o Service Worker (firebase-messaging-sw.js) assume.
    onMessage(messaging, (payload) => {
        console.log('Mensagem recebida com o app aberto:', payload);
        
        const title = payload.notification?.title || 'Nova Mensagem';
        const options = {
            body: payload.notification?.body || '',
            icon: '/assets/icon.png', // Caminho para o ícone
            badge: '/assets/icon.png' // Ícone pequeno para a barra de status (Android)
        };

        // Mostra a notificação nativa do sistema mesmo com o app aberto
        // (Opcional: Você poderia mostrar um modal/toast dentro do app em vez disso)
        new Notification(title, options);
    });
}

/**
 * Salva o token FCM no documento do usuário no Firestore.
 * Usa arrayUnion para não sobrescrever tokens de outros dispositivos (ex: PC e Celular).
 */
async function saveTokenToFirestore(token) {
    const user = auth.currentUser;
    
    if (!user) {
        console.log("Usuário não logado. Impossível salvar token.");
        return;
    }

    try {
        const userRef = doc(db, 'users', user.uid);
        
        // Atualiza o documento do usuário adicionando o novo token à lista 'fcmTokens'
        await updateDoc(userRef, {
            fcmTokens: arrayUnion(token),
            lastLoginAt: new Date().toISOString() // Útil para saber se o usuário está ativo
        });
        
        console.log('Token salvo no perfil do usuário no Firestore.');
        
    } catch (e) {
        console.error("Erro ao salvar token no Firestore:", e);
        // Se o erro for de permissão ou documento não existente, trate aqui
    }
}