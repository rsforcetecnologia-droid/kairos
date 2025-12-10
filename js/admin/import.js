import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { loadSidebar, setupCommonUI } from "./admin-common.js";

// --- IMPORTAÇÃO CORRETA: Traz o 'auth' configurado do arquivo central ---
import { auth } from "../firebase-config.js";

let idToken = null;
const API_BASE_URL = window.location.origin;

async function apiCall(endpoint, options = {}) {
    if (!idToken) throw new Error("Usuário não autenticado.");
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}` 
        },
        ...options
    });
    const result = await response.json().catch(() => ({ message: response.statusText }));
    if (!response.ok) {
        throw new Error(result.message || 'Ocorreu um erro.');
    }
    return result;
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        idToken = await user.getIdToken();
        const idTokenResult = await user.getIdTokenResult();
        if (idTokenResult.claims.role !== 'super-admin') {
            window.location.href = '/admin-login.html';
            return;
        }
        loadSidebar('import');
        setupCommonUI(user);
        loadEstablishments();
    } else {
        window.location.href = '/admin-login.html';
    }
});

async function loadEstablishments() {
    const select = document.getElementById('establishmentSelect');
    try {
        const establishments = await apiCall('/api/admin/establishments');
        select.innerHTML = establishments
            .map(e => `<option value="${e.id}">${e.name}</option>`)
            .join('');
    } catch (error) {
        console.error("Erro ao carregar estabelecimentos:", error);
    }
}

document.getElementById('file-upload').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        document.getElementById('fileName').textContent = file.name;
    }
});

document.getElementById('submitImport').addEventListener('click', async () => {
    const establishmentId = document.getElementById('establishmentSelect').value;
    const importType = document.getElementById('importType').value;
    const fileInput = document.getElementById('file-upload');
    const file = fileInput.files[0];
    const resultDiv = document.getElementById('importResult');

    if (!file) {
        resultDiv.innerHTML = `<p class="text-red-500">Por favor, selecione um arquivo.</p>`;
        return;
    }

    const formData = new FormData();
    formData.append('dataFile', file);

    resultDiv.innerHTML = `<p class="text-blue-500">Enviando e processando... Aguarde.</p>`;

    try {
        const response = await fetch(`${API_BASE_URL}/api/import/${establishmentId}/${importType}`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${idToken}` },
            body: formData
        });

        const result = await response.json();

        if (response.ok) {
            resultDiv.innerHTML = `<p class="text-green-500">${result.message}</p>`;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        resultDiv.innerHTML = `<p class="text-red-500">Erro: ${error.message}</p>`;
    }
});