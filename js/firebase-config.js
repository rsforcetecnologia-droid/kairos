// js/firebase-config.js

// CORREÇÃO: Importa todos os serviços necessários (App, Auth, Firestore e Realtime Database)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

/**
 * Este arquivo é responsável por inicializar e configurar a conexão com o Firebase.
 * Exporta as instâncias de autenticação (auth), 
 * Firestore (db) e Realtime Database (database).
 */

// Suas chaves de configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAlJaPEW5-yOb-8wkB8EJZhAML2M2yI8Ao",
    authDomain: "kairos-system.firebaseapp.com",
    projectId: "kairos-system",
    storageBucket: "kairos-system.appspot.com",
    messagingSenderId: "603994960586",
    appId: "1:603994960586:web:30d2c030eed3c55eccfa33",
    measurementId: "G-SVHFXKV5EC"
};

// Inicializa o aplicativo Firebase
const app = initializeApp(firebaseConfig);

// Exporta a instância de autenticação
export const auth = getAuth(app);

// CORREÇÃO: Exporta a instância do Firestore (para main.js e outros)
export const db = getFirestore(app);

// CORREÇÃO: Exporta a instância do Realtime Database (para financial.js)
export const database = getDatabase(app);