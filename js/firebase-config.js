// js/firebase-config.js

// Importa apenas as funções necessárias do Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

/**
 * Este arquivo conecta o frontend ao NOVO projeto nos EUA (kairos-system-us).
 */

// --- CHAVES CORRETAS DO NOVO PROJETO (US) ---
const firebaseConfig = {
  apiKey: "AIzaSyBGhRWUVgogrZFKdh0R5-FYm__pDHOdCY4",
  authDomain: "kairos-system-us.firebaseapp.com",
  projectId: "kairos-system-us",
  storageBucket: "kairos-system-us.firebasestorage.app",
  messagingSenderId: "311673440078",
  appId: "1:311673440078:web:75eb47faa87f20462bc01f"
};

// Inicializa o aplicativo Firebase
const app = initializeApp(firebaseConfig);

// Exporta a instância de autenticação
export const auth = getAuth(app);

// Exporta a instância do Firestore
export const db = getFirestore(app);