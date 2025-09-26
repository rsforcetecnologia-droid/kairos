import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { loadSidebar, setupCommonUI } from "./admin-common.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAlJaPEW5-yOb-8wkB8EJZhAML2M2yI8Ao",
    authDomain: "kairos-system.firebaseapp.com",
    projectId: "kairos-system",
    storageBucket: "kairos-system.firebasestorage.app",
    messagingSenderId: "603994960586",
    appId: "1:603994960586:web:30d2c030eed3c55eccfa33",
    measurementId: "G-SVHFXKV5EC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let idToken = null;

const API_BASE_URL = window.location.origin;
const queryEditor = document.getElementById('queryEditor');
const queryResult = document.getElementById('queryResult');
const executeQueryBtn = document.getElementById('executeQueryBtn');

// Função para fazer chamadas à API
async function apiCall(endpoint, options = {}) {
    if (!idToken) throw new Error("Usuário não autenticado.");
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}` 
        },
        ...options
    });
    const result = await response.json().catch(() => ({ message: response.statusText, status: response.status }));
    if (!response.ok) {
        throw new Error(result.message || 'Ocorreu um erro.');
    }
    return result;
}

// Verifica a autenticação do usuário
onAuthStateChanged(auth, async (user) => {
    if (user) {
        idToken = await user.getIdToken();
        const idTokenResult = await user.getIdTokenResult();
        if (idTokenResult.claims.role !== 'super-admin') {
            window.location.href = '/admin-login.html';
            return;
        }
        loadSidebar('dbexplorer');
        setupCommonUI(user);
    } else {
        window.location.href = '/admin-login.html';
    }
});

// Event listener para o botão de execução
executeQueryBtn.addEventListener('click', async () => {
    let command;
    try {
        command = JSON.parse(queryEditor.value);
    } catch (error) {
        queryResult.textContent = `Erro de sintaxe no JSON: ${error.message}`;
        queryResult.classList.remove('text-green-400');
        queryResult.classList.add('text-red-400');
        return;
    }

    executeQueryBtn.disabled = true;
    executeQueryBtn.textContent = 'Executando...';
    queryResult.textContent = 'Aguarde...';

    try {
        const result = await apiCall('/api/dbexplorer/execute', {
            method: 'POST',
            body: JSON.stringify(command)
        });
        
        queryResult.textContent = JSON.stringify(result, null, 2);
        queryResult.classList.remove('text-red-400');
        queryResult.classList.add('text-green-400');

    } catch (error) {
        queryResult.textContent = `Erro na execução: ${error.message}`;
        queryResult.classList.remove('text-green-400');
        queryResult.classList.add('text-red-400');
    } finally {
        executeQueryBtn.disabled = false;
        executeQueryBtn.textContent = 'Executar Comando';
    }
});