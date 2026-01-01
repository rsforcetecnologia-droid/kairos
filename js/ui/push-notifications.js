// js/ui/push-notifications.js

import { messaging, getToken, onMessage, db, auth } from '../firebase-config.js';
import { doc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// --- CONFIGURAÇÃO ---
const VAPID_KEY = 'BDA-IaH_jjWBRwHbuFcB56I25jKHpchx34yZtv_6iIo_yV2tz_yIZYS3hfntDaN5Slf4ch8ZEJCIt4D7LIWX4mY'; 

/**
 * Inicializa o processo de notificações push.
 * Deve ser chamado apenas quando o usuário já estiver logado.
 */
export async function initPushNotifications() {
    // 0. VERIFICAÇÃO DE AMBIENTE (Proteção para App de Loja)
    // Se estiver rodando como App Nativo (Android/iOS via Loja), NÃO executa lógica de Web Push.
    const isNative = window.Capacitor && window.Capacitor.isNativePlatform();
    
    if (isNative) {
        console.log('[Push] Ambiente nativo detectado. Lógica de Web Push (PWA) ignorada para evitar conflitos.');
        return; // Sai da função para não quebrar o App da loja
    }

    // 1. Verifica se o navegador suporta notificações
    if (!('Notification' in window)) {
        console.warn("[Push] Este navegador não suporta notificações de desktop/mobile web.");
        return;
    }

    try {
        // 2. Solicita permissão ao usuário
        const permission = await Notification.requestPermission();
        
        if (permission === 'granted') {
            console.log('[Push] Permissão concedida.');
            
            // 3. OBTÉM O REGISTO DO SERVICE WORKER PRINCIPAL (CORREÇÃO)
            // Em vez de registrar um novo arquivo, usamos o que o VitePWA já criou.
            // O .ready aguarda até que o SW esteja ativo.
            const registration = await navigator.serviceWorker.ready;
            
            console.log("[Push] Usando Service Worker principal (VitePWA):", registration.scope);

            // 4. Obtém o Token de Registro do FCM
            // Vinculamos o token ao Service Worker principal
            const token = await getToken(messaging, { 
                vapidKey: VAPID_KEY,
                serviceWorkerRegistration: registration 
            });

            if (token) {
                console.log('[Push] Token FCM obtido:', token);
                // 5. Salva o token no perfil do usuário no Firestore
                await saveTokenToFirestore(token);
            } else {
                console.warn('[Push] Não foi possível obter o token de registro.');
            }

        } else {
            console.warn('[Push] Permissão negada pelo usuário.');
        }
    } catch (error) {
        console.error('[Push] Erro fatal na configuração:', error);
    }

    // 6. Configura o ouvinte para mensagens quando o app está ABERTO (Foreground)
    // Aqui tratamos a exibição visual caso o app esteja aberto, pois o SW só age no background
    onMessage(messaging, (payload) => {
        console.log('[Push] Mensagem recebida em foreground:', payload);
        
        // Extrai dados priorizando a estrutura 'data' (que configuramos no backend)
        const data = payload.data || {};
        const notification = payload.notification || {};

        const title = data.title || notification.title || 'Nova Notificação';
        const body = data.body || notification.body || '';
        
        // Exibe notificação visual do sistema mesmo com o app aberto
        if (Notification.permission === "granted") {
            try {
                // Cria a notificação visual manualmente
                new Notification(title, {
                    body: body,
                    icon: '/assets/icon.png',
                    badge: '/assets/icon.png',
                    vibrate: [200, 100, 200], // Vibração para chamar atenção
                    requireInteraction: false // Em foreground pode sumir sozinha
                });
            } catch (err) {
                console.error("Erro ao exibir notificação foreground:", err);
            }
        }
    });
}

/**
 * Salva o token FCM no documento do usuário no Firestore.
 */
async function saveTokenToFirestore(token) {
    const user = auth.currentUser;
    
    if (!user) {
        console.log("[Push] Usuário não logado. Token não salvo.");
        return;
    }

    try {
        const userRef = doc(db, 'users', user.uid);
        
        // Atualiza o documento usando arrayUnion para não apagar tokens de outros dispositivos
        await updateDoc(userRef, {
            fcmTokens: arrayUnion(token),
            lastLoginAt: new Date().toISOString(),
            platform: 'pwa_web' // Útil para depuração
        });
        
        console.log('[Push] Token vinculado ao usuário com sucesso.');
        
    } catch (e) {
        console.error("[Push] Erro ao salvar token no Firestore:", e);
    }
}