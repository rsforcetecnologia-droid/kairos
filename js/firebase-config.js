// js/firebase-config.js

// Importa apenas as funções necessárias do Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

/**
 * Este arquivo é responsável por inicializar e configurar a conexão com o Firebase.
 * Ele exporta as instâncias de autenticação (auth) e do Firestore (db) 
 * para que outros módulos possam usá-las.
 * Manter a configuração isolada aqui facilita a atualização das chaves da API sem
 * ter que procurar por elas em todo o código.
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

// Exporta a instância de autenticação para ser usada em toda a aplicação
export const auth = getAuth(app);

// Exporta a instância do Firestore para ser usada em toda a aplicação
export const db = getFirestore(app);
