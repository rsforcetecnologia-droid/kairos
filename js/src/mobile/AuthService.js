import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

/**
 * Este serviço centraliza a lógica de inicialização e autenticação do Firebase,
 * tornando-o mais fácil de gerenciar e usar em toda a aplicação.
 */

// Configuração do seu projeto Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAlJaPEW5-yOb-8wkB8EJZhAML2M2yI8Ao",
    authDomain: "kairos-system.firebaseapp.com",
    projectId: "kairos-system",
    storageBucket: "kairos-system.appspot.com",
    messagingSenderId: "603994960586",
    appId: "1:603994960586:web:30d2c030eed3c55eccfa33",
    measurementId: "G-SVHFXKV5EC"
};

// Inicializa a aplicação Firebase
const app = initializeApp(firebaseConfig);

// Exporta as funções e a instância de autenticação para uso global
export const auth = getAuth(app);
export { signInWithEmailAndPassword, onAuthStateChanged, signOut };
