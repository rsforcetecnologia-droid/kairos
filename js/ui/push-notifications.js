// js/ui/push-notifications.js

import { messaging, getToken, onMessage, db, auth } from '../firebase-config.js';
import { doc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { PushNotifications } from '@capacitor/push-notifications'; // <--- IMPORTANTE

// --- CONFIGURAÇÃO ---
const VAPID_KEY = 'BDA-IaH_jjWBRwHbuFcB56I25jKHpchx34yZtv_6iIo_yV2tz_yIZYS3hfntDaN5Slf4ch8ZEJCIt4D7LIWX4mY'; 

export async function initPushNotifications() {
    const isNative = window.Capacitor && window.Capacitor.isNativePlatform();

    // ==========================================
    // 1. LÓGICA PARA ANDROID / IOS (NATIVO)
    // ==========================================
    if (isNative) {
        console.log('[Push] Inicializando Push Nativo (Capacitor)...');
        
        try {
            // Limpa ouvintes antigos para evitar duplicidade
            await PushNotifications.removeAllListeners();

            // A. Ouvinte: Registro com Sucesso (Recebe o Token)
            await PushNotifications.addListener('registration', async token => {
                console.log('[Push Nativo] Token recebido:', token.value);
                await saveTokenToFirestore(token.value);
            });

            // B. Ouvinte: Erro no Registro
            await PushNotifications.addListener('registrationError', err => {
                console.error('[Push Nativo] Erro no registro:', err.error);
            });

            // C. Ouvinte: Notificação Recebida com app aberto
            await PushNotifications.addListener('pushNotificationReceived', notification => {
                console.log('[Push Nativo] Notificação recebida:', notification);
                // Opcional: Atualizar UI ou contadores aqui
            });

            // D. Solicita Permissão e Registra
            let permStatus = await PushNotifications.checkPermissions();

            if (permStatus.receive === 'prompt') {
                permStatus = await PushNotifications.requestPermissions();
            }

            if (permStatus.receive === 'granted') {
                await PushNotifications.register(); // Isso dispara o evento 'registration' acima
            } else {
                console.warn('[Push Nativo] Permissão negada.');
            }

        } catch (e) {
            console.error('[Push Nativo] Exceção:', e);
        }
        
        return; // Sai para não executar a lógica Web abaixo
    }

    // ==========================================
    // 2. LÓGICA PARA WEB / PWA
    // ==========================================
    if (!('Notification' in window)) {
        console.warn("[Push] Navegador sem suporte a notificações.");
        return;
    }

    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            const registration = await navigator.serviceWorker.ready;
            const token = await getToken(messaging, { 
                vapidKey: VAPID_KEY,
                serviceWorkerRegistration: registration 
            });

            if (token) {
                console.log('[Push Web] Token:', token);
                await saveTokenToFirestore(token);
            }
        }
    } catch (error) {
        console.error('[Push Web] Erro:', error);
    }
}

/**
 * Salva o token FCM no documento do usuário no Firestore.
 */
async function saveTokenToFirestore(token) {
    const user = auth.currentUser;
    if (!user) {
        console.log("[Push] Usuário não logado. Token pendente.");
        return;
    }

    try {
        const userRef = doc(db, 'users', user.uid);
        const isNative = window.Capacitor && window.Capacitor.isNativePlatform();

        await updateDoc(userRef, {
            fcmTokens: arrayUnion(token),
            lastLoginAt: new Date().toISOString(),
            platform: isNative ? 'android_native' : 'pwa_web'
        });
        console.log('[Push] Token salvo no Firestore.');
    } catch (e) {
        console.error("[Push] Erro ao salvar no Firestore:", e);
    }
}