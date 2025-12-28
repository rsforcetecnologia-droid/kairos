// js/firebase-config.js

// Importa funções do Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
// 1. ADICIONADO: Imports do Messaging para Notificações Push
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";

/**
 * Este arquivo é responsável por inicializar e configurar a conexão com o Firebase.
 * Ele exporta as instâncias de autenticação (auth), do Firestore (db) e Messaging.
 */

// --- CONFIGURAÇÃO PARA O KAIROS AGENDA US ---
const firebaseConfig = {
  apiKey: "AIzaSyBmeKlOJ_kMshsuintO0j8CXOvM9ywBMnk",
  authDomain: "kairos-agenda-us.firebaseapp.com",
  projectId: "kairos-agenda-us",
  storageBucket: "kairos-agenda-us.firebasestorage.app",
  messagingSenderId: "407358446276",
  appId: "1:407358446276:web:c6229ea999b56701558791"
};

// Inicializa o aplicativo Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Auth e Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

// 2. ADICIONADO: Inicializa o Messaging
export const messaging = getMessaging(app);

// --- CONFIGURAÇÃO DE PERSISTÊNCIA (PWA) ---
// Tenta definir a persistência globalmente logo na inicialização
(async () => {
    try {
        await setPersistence(auth, browserLocalPersistence);
        console.log("Persistência de sessão configurada para LOCAL (PWA).");
    } catch (error) {
        console.error("Erro ao definir persistência:", error);
    }
})();

// 3. ADICIONADO: Exporta as funções para serem usadas em outros arquivos
export { setPersistence, browserLocalPersistence, getToken, onMessage };