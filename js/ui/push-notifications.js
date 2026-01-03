// js/ui/push-notifications.js

import { messaging, db, auth } from '../firebase-config.js';
import { doc, updateDoc, arrayUnion, setDoc } from "firebase/firestore"; 
import { getToken, onMessage } from "firebase/messaging";
import { PushNotifications } from '@capacitor/push-notifications';
import { showNotification } from '../components/modal.js';

const VAPID_KEY = 'BDA-IaH_jjWBRwHbuFcB56I25jKHpchx34yZtv_6iIo_yV2tz_yIZYS3hfntDaN5Slf4ch8ZEJCIt4D7LIWX4mY'; 

// Variável para controlar se o listener já foi adicionado
let isMessageListenerAdded = false;

export async function initPushNotifications() {
    const isNative = window.Capacitor && window.Capacitor.isNativePlatform();

    // 1. NATIVO (Android/iOS App Store) - Mantém igual
    if (isNative) {
        // ... (seu código nativo existente) ...
        try {
            await PushNotifications.removeAllListeners();
            await PushNotifications.addListener('registration', async token => {
                saveTokenToFirestore(token.value, true);
            });
            await PushNotifications.addListener('pushNotificationReceived', notification => {
               // Lógica nativa opcional
            });
            let permStatus = await PushNotifications.checkPermissions();
            if (permStatus.receive === 'prompt') {
                permStatus = await PushNotifications.requestPermissions();
            }
            if (permStatus.receive === 'granted') {
                await PushNotifications.register();
            }
        } catch (e) { console.error(e); }
        return; 
    }

    // 2. WEB / PWA
    if (!('Notification' in window)) return;

    // Se já tiver permissão, inicia direto. Se não, espera o clique do botão.
    if (Notification.permission === 'granted') {
        registerWebPush();
    } else if (Notification.permission === 'default') {
        console.log('[Push Web] Aguardando interação do utilizador para pedir permissão (iOS Requirement).');
        // Aqui não fazemos nada, o main.js vai mostrar o botão de "Ativar"
    }
}

// --- NOVA FUNÇÃO PARA O BOTÃO ---
export async function requestWebPermission() {
    console.log('[Push Web] Pedindo permissão via clique...');
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            await registerWebPush();
            return true;
        } else {
            alert('Você bloqueou as notificações. Ative nas definições do navegador.');
            return false;
        }
    } catch (error) {
        console.error('[Push Web] Erro ao pedir permissão:', error);
        return false;
    }
}

// Lógica interna de registo (separada para ser reutilizada)
async function registerWebPush() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
            const token = await getToken(messaging, { 
                vapidKey: VAPID_KEY,
                serviceWorkerRegistration: registration 
            });

            if (token) {
                console.log('[Push Web] Token:', token);
                await saveTokenToFirestore(token, false);
            }
            
            // Adiciona o ouvinte de mensagens apenas uma vez
            if (!isMessageListenerAdded) {
                onMessage(messaging, (payload) => {
                    console.log('[Push Web] Foreground:', payload);
                    if (payload.notification) {
                        showNotification(payload.notification.title, payload.notification.body, 'info', true);
                    }
                });
                isMessageListenerAdded = true;
            }

        } catch (err) {
            console.error('[Push Web] Falha no registo:', err);
        }
    }
}

async function saveTokenToFirestore(token, isNative) {
    const user = auth.currentUser;
    if (!user) return;
    try {
        const userRef = doc(db, 'users', user.uid);
        try {
            await updateDoc(userRef, {
                fcmTokens: arrayUnion(token),
                lastLoginAt: new Date().toISOString(),
                platform: isNative ? 'android_native' : 'pwa_web'
            });
        } catch (e) {
            if (e.code === 'not-found') {
                await setDoc(userRef, {
                    email: user.email,
                    fcmTokens: [token],
                    platform: isNative ? 'android_native' : 'pwa_web'
                }, { merge: true });
            }
        }
    } catch (e) { console.error(e); }
}