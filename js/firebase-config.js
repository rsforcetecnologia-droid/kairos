// js/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// --- CONFIGURAÇÃO PARA O KAIROS AGENDA US ---
const firebaseConfig = {
  apiKey: "AIzaSyBmeKlOJ_kMshsuintO0j8CXOvM9ywBMnk",
  authDomain: "kairos-agenda-us.firebaseapp.com",
  projectId: "kairos-agenda-us",
  storageBucket: "kairos-agenda-us.firebasestorage.app",
  messagingSenderId: "407358446276",
  appId: "1:407358446276:web:c6229ea999b56701558791"
};

// Inicializa a Aplicação Firebase
const app = initializeApp(firebaseConfig);

// Inicializa os Serviços
const auth = getAuth(app);
const db = getFirestore(app); // <--- AQUI ESTÁ O DB

// Exporta as Instâncias
export { auth, db }; // <--- DEVE SER EXPORTADO ASSIM