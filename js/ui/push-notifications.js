// js/ui/push-notifications.js
// --- MODO DE DIAGNÓSTICO (CORRIGIDO) ---

import { messaging, db, auth } from '../firebase-config.js';

// [CORREÇÃO] Importando do CDN exato para garantir compatibilidade com o objeto 'db'
import { 
    doc, 
    updateDoc, 
    arrayUnion, 
    setDoc 
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

import { getToken, onMessage } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";
import { PushNotifications } from '@capacitor/push-notifications';
import { showNotification } from '../components/modal.js';

// Chave VAPID 
const VAPID_KEY = 'BDA-IaH_jjWBRwHbuFcB56I25jKHpchx34yZtv_6iIo_yV2tz_yIZYS3hfntDaN5Slf4ch8ZEJCIt4D7LIWX4mY'; 

let isMessageListenerAdded = false;

export async function initPushNotifications() {
    const isNative = window.Capacitor && window.Capacitor.isNativePlatform();

    // 1. NATIVO (Android/iOS Store)
    if (isNative) {
        try {
            await PushNotifications.removeAllListeners();
            await PushNotifications.addListener('registration', async token => {
                saveTokenToFirestore(token.value, true);
            });
            await PushNotifications.addListener('pushNotificationReceived', notification => {
               // Lógica nativa
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

    if (Notification.permission === 'granted') {
        registerWebPush(false); 
    } 
}

export async function requestWebPermission() {
    // Alerta de teste
    alert('Iniciando pedido de permissão...'); 
    
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            alert('Permissão concedida! Gerando token...');
            await registerWebPush(true);
            return true;
        } else {
            alert('Permissão negada.');
            return false;
        }
    } catch (error) {
        alert('Erro ao pedir permissão: ' + error.message);
        return false;
    }
}

async function registerWebPush(showDebugAlerts = false) {
    if ('serviceWorker' in navigator) {
        try {
            // Regista o Service Worker
            const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
            await registration.update(); 

            // Pede o token
            const token = await getToken(messaging, { 
                vapidKey: VAPID_KEY,
                serviceWorkerRegistration: registration 
            });

            if (token) {
                if(showDebugAlerts) alert('Token Gerado! Tentando salvar...');
                console.log('[Push Web] Token:', token);
                await saveTokenToFirestore(token, false, showDebugAlerts);
            } else {
                if(showDebugAlerts) alert('ERRO: Token veio vazio.');
            }
            
            if (!isMessageListenerAdded) {
                onMessage(messaging, (payload) => {
                    console.log('[Push Web] Foreground:', payload);
                    if (payload.notification) {
                        showNotification(payload.notification.title, payload.notification.body, 'info', true);
                    }
                    if (Notification.permission === 'granted' && payload.notification) {
                        try {
                            new Notification(payload.notification.title, {
                                body: payload.notification.body,
                                icon: '/icon.png',
                                data: payload.data,
                                tag: 'kairos-notification'
                            });
                        } catch(e) { console.error(e); }
                    }
                });
                isMessageListenerAdded = true;
            }

        } catch (err) {
            alert('FALHA CRÍTICA NO REGISTO: ' + err.message);
            console.error('[Push Web] Falha:', err);
        }
    } else {
        if(showDebugAlerts) alert('Navegador não suporta Service Worker.');
    }
}

async function saveTokenToFirestore(token, isNative, showDebugAlerts = false) {
    const user = auth.currentUser;
    if (!user) {
        if(showDebugAlerts) alert('ERRO: Utilizador não identificado.');
        return;
    }
    
    try {
        const userRef = doc(db, 'users', user.uid);
        
        try {
            await updateDoc(userRef, {
                fcmTokens: arrayUnion(token),
                lastLoginAt: new Date().toISOString(),
                platform: isNative ? 'android_native' : 'pwa_web'
            });
            if(showDebugAlerts) alert('SUCESSO! Token salvo no banco.');
        } catch (e) {
            // Se o documento do utilizador não existir, cria-o
            if (e.code === 'not-found') {
                await setDoc(userRef, {
                    email: user.email,
                    fcmTokens: [token],
                    platform: isNative ? 'android_native' : 'pwa_web',
                    createdAt: new Date().toISOString()
                }, { merge: true });
                if(showDebugAlerts) alert('SUCESSO (Criado novo user)! Token salvo.');
            } else {
                throw e; // Lança outros erros para o catch de baixo
            }
        }
    } catch (e) { 
        if(showDebugAlerts) alert('Erro ao gravar no Firestore: ' + e.message);
        console.error("Erro Firestore:", e); 
    }
}