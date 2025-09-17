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

// Exporta a instância de autenticação para ser usada em toda a aplicação
export const auth = getAuth(app);

// Exporta a instância do Firestore para ser usada em toda a aplicação
export const db = getFirestore(app);
