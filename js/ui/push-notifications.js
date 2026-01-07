// js/ui/push-notifications.js
// --- VERSÃO FINAL: SEM DUPLICIDADE (SILENCIOSA EM FOREGROUND) & SESSÃO ÚNICA ---

import { messaging, db, auth } from '../firebase-config.js';
import { 
    doc, 
    updateDoc, 
    arrayUnion, 
    setDoc,
    getDoc 
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getToken, onMessage } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";
import { PushNotifications } from '@capacitor/push-notifications';
// [AJUSTE] Removemos a importação do showNotification pois não vamos usá-lo aqui para evitar duplicação visual
// import { showNotification } from '../components/modal.js';

const VAPID_KEY = 'BDA-IaH_jjWBRwHbuFcB56I25jKHpchx34yZtv_6iIo_yV2tz_yIZYS3hfntDaN5Slf4ch8ZEJCIt4D7LIWX4mY'; 

let isMessageListenerAdded = false;

export async function initPushNotifications() {
    const isNative = window.Capacitor && window.Capacitor.isNativePlatform();

    // 1. NATIVO (Android/iOS via App Store)
    if (isNative) {
        try {
            await PushNotifications.removeAllListeners();
            
            await PushNotifications.addListener('registration', async token => {
                saveTokenToFirestore(token.value, true);
            });

            // Quando a notificação chega e o APP ESTÁ ABERTO
            await PushNotifications.addListener('pushNotificationReceived', notification => {
                // Não mostramos o popup aqui porque o main.js (setupRealtimeListeners) 
                // já detecta a mudança no banco de dados e mostra o alerta visual.
                console.log('[Push Nativo] Recebido em Foreground (Visual gerido pelo Firestore):', notification);
            });
            
            // Quando clica na notificação e o app abre
            await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
                const data = notification.notification.data;
                console.log('Notificação clicada (Ação):', data);
            });

            let permStatus = await PushNotifications.checkPermissions();
            if (permStatus.receive === 'prompt') {
                permStatus = await PushNotifications.requestPermissions();
            }
            if (permStatus.receive === 'granted') {
                await PushNotifications.register();
            }
        } catch (e) { console.error('[Push Nativo] Erro:', e); }
        return; 
    }

    // 2. WEB / PWA
    if (!('Notification' in window)) return;

    if (Notification.permission === 'granted') {
        registerWebPush(); 
    } 
}

export async function requestWebPermission() {
    try {
        const permission = await Notification.requestPermission();
        
        if (permission === 'granted') {
            console.log('Permissão concedida pelo utilizador.');
            await registerWebPush();
            return true;
        } else {
            console.warn('Permissão de notificações negada.');
            return false;
        }
    } catch (error) {
        console.error('Erro ao pedir permissão Web:', error);
        return false;
    }
}

async function registerWebPush() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
            await registration.update(); 

            const token = await getToken(messaging, { 
                vapidKey: VAPID_KEY,
                serviceWorkerRegistration: registration 
            });

            if (token) {
                console.log('[Push Web] Token validado.');
                await saveTokenToFirestore(token, false);
            } else {
                console.warn('[Push Web] Token veio vazio.');
            }
            
            // Configura o ouvinte para quando o App está ABERTO (Foreground)
            if (!isMessageListenerAdded) {
                onMessage(messaging, (payload) => {
                    // Log silencioso. O visual é tratado pelo Firestore listener no main.js
                    console.log('[Push Web] Recebido em Foreground (Silencioso):', payload);
                });
                isMessageListenerAdded = true;
            }

        } catch (err) {
            console.error('[Push Web] Falha no registo:', err);
        }
    } else {
        console.warn('Navegador sem suporte a Service Worker.');
    }
}

async function saveTokenToFirestore(token, isNative) {
    const user = auth.currentUser;
    if (!user) {
        console.warn('Usuário não logado. Token não salvo.');
        return;
    }
    
    const userRef = doc(db, 'users', user.uid);

    try {
        const docSnap = await getDoc(userRef);
        
        // --- ESTRATÉGIA DE SESSÃO ÚNICA (Correção de Duplicidade no Celular) ---
        // Em vez de adicionar (arrayUnion), vamos SUBSTITUIR a lista.
        // Assim, removemos tokens antigos do Chrome ou outras instalações
        // garantindo que apenas o dispositivo atual receba o push.

        if (docSnap.exists()) {
            const userData = docSnap.data();
            const existingTokens = userData.fcmTokens || [];
            
            // Otimização: Se o token atual JÁ é o único salvo, não faz nada
            if (existingTokens.length === 1 && existingTokens[0] === token) {
                console.log('Token já sincronizado e único. Nenhuma ação necessária.');
                return; 
            }
        }

        // Grava APENAS o token atual (remove os antigos)
        await updateDoc(userRef, {
            fcmTokens: [token], // [IMPORTANTE] Substitui o array em vez de arrayUnion
            lastLoginAt: new Date().toISOString(),
            platform: isNative ? 'android_native' : 'pwa_web'
        });
        console.log('Token atualizado (Sessão Única garantida).');

    } catch (e) {
        // Se o utilizador não existe no banco, cria o documento
        if (e.code === 'not-found') {
            try {
                await setDoc(userRef, {
                    email: user.email,
                    fcmTokens: [token],
                    platform: isNative ? 'android_native' : 'pwa_web',
                    createdAt: new Date().toISOString()
                }, { merge: true });
                console.log('Utilizador criado e token inicial salvo.');
            } catch (createErr) {
                console.error("Erro ao criar user:", createErr);
            }
        } else {
            console.error("Erro ao atualizar token:", e);
        }
    }
}