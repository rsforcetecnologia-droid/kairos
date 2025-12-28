// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { 
    getAuth, 
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence 
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    getDoc, 
    updateDoc, 
    deleteDoc, 
    query, 
    where,
    setDoc 
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js";

const firebaseConfig = {
    apiKey: "AIzaSyBmeKlOJ_kMshsuintO0j8CXOvM9ywBMnk",
    authDomain: "kairos-agenda-us.firebaseapp.com",
    projectId: "kairos-agenda-us",
    storageBucket: "kairos-agenda-us.firebasestorage.app",
    messagingSenderId: "407358446276",
    appId: "1:407358446276:web:c6229ea999b56701558791"
};

// Inicializa o App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const messaging = getMessaging(app);

// Configura persistência local (funciona como backup)
setPersistence(auth, browserLocalPersistence)
    .then(() => {
        console.log("Persistência de login ativada no config.");
    })
    .catch((error) => {
        console.error("Erro ao ativar persistência:", error);
    });

// --- EXPORTAÇÕES (O ERRO ESTAVA AQUI) ---
// Agora incluímos setPersistence e browserLocalPersistence na lista
export { 
    auth, 
    db, 
    storage, 
    messaging, 
    getToken, 
    onMessage,
    onAuthStateChanged,
    setPersistence,          // <--- Adicionado
    browserLocalPersistence, // <--- Adicionado
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    setDoc,
    ref, 
    uploadBytes, 
    getDownloadURL 
};