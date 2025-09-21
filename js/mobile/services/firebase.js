// js/mobile/services/firebase.js

// Importa as funções necessárias dos módulos do Firebase que o seu HTML já carrega
const { initializeApp } = window;
const { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } = window;
const { getFirestore, collection, query, where, onSnapshot, orderBy, Timestamp } = window;

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAlJaPEW5-yOb-8wkB8EJZhAML2M2yI8Ao",
    authDomain: "kairos-system.firebaseapp.com",
    projectId: "kairos-system",
    storageBucket: "kairos-system.appspot.com",
    messagingSenderId: "603994960586",
    appId: "1:603994960586:web:30d2c030eed3c55eccfa33",
    measurementId: "G-SVHFXKV5EC"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Exporta as instâncias e funções para serem usadas em toda a aplicação
export {
    auth,
    db,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    collection,
    query,
    where,
    onSnapshot,
    orderBy,
    Timestamp
};