import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { loadSidebar, setupCommonUI } from "./admin-common.js";

// --- IMPORTAÇÃO CORRETA: Traz o 'auth' configurado do arquivo central ---
import { auth } from "../firebase-config.js";

let idToken = null;
const API_BASE_URL = window.location.origin;

// Referências aos elementos do DOM
const collectionNameInput = document.getElementById('collectionName');
const docIdInput = document.getElementById('docId');
const executeQueryBtn = document.getElementById('executeQueryBtn');
const resultStatus = document.getElementById('result-status');
const resultContainer = document.getElementById('result-container');
const resultsTable = document.getElementById('resultsTable');
const editModal = document.getElementById('editModal');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const saveChangesBtn = document.getElementById('saveChangesBtn');
const editFormContainer = document.getElementById('editFormContainer');

let currentEditingDoc = null;

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

function displayResults(data) {
    resultStatus.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    resultsTable.querySelector('thead').innerHTML = '';
    resultsTable.querySelector('tbody').innerHTML = '';

    const results = Array.isArray(data.results) ? data.results : [data];
    if (results.length === 0) {
        resultStatus.textContent = 'Nenhum documento encontrado.';
        resultStatus.classList.remove('hidden');
        resultContainer.classList.add('hidden');
        return;
    }

    const headers = new Set(['id']);
    results.forEach(doc => {
        Object.keys(doc).forEach(key => headers.add(key));
    });
    headers.add('actions'); // Coluna para botões

    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.className = 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider';
        th.textContent = header;
        headerRow.appendChild(th);
    });
    resultsTable.querySelector('thead').appendChild(headerRow);

    const tbody = resultsTable.querySelector('tbody');
    results.forEach(doc => {
        const row = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.className = 'px-6 py-4 whitespace-nowrap text-sm text-gray-700';
            if (header === 'actions') {
                td.innerHTML = `
                    <button data-doc-id="${doc.id}" class="edit-btn text-indigo-600 hover:text-indigo-900">Editar</button>
                    <button data-doc-id="${doc.id}" class="delete-btn text-red-600 hover:text-red-900 ml-4">Apagar</button>
                `;
            } else {
                const value = doc[header];
                if (typeof value === 'object' && value !== null) {
                    td.textContent = JSON.stringify(value);
                } else {
                    td.textContent = value;
                }
            }
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });
}

function openEditModal(doc) {
    currentEditingDoc = doc;
    editFormContainer.innerHTML = '';
    Object.entries(doc).forEach(([key, value]) => {
        if (key === 'id') return; // Não permite editar o ID

        const fieldContainer = document.createElement('div');
        const label = document.createElement('label');
        label.className = 'block text-sm font-medium text-gray-700';
        label.textContent = key;
        
        let input;
        if (typeof value === 'boolean') {
            input = document.createElement('select');
            input.className = 'mt-1 w-full p-2 border border-gray-300 rounded-md';
            input.innerHTML = `<option value="true" ${value === true ? 'selected' : ''}>true</option><option value="false" ${value === false ? 'selected' : ''}>false</option>`;
        } else if (typeof value === 'object' && value !== null) {
            input = document.createElement('textarea');
            input.className = 'mt-1 w-full p-2 border border-gray-300 rounded-md h-24';
            input.value = JSON.stringify(value, null, 2);
        } else {
            input = document.createElement('input');
            input.type = 'text';
            input.className = 'mt-1 w-full p-2 border border-gray-300 rounded-md';
            input.value = value;
        }
        
        input.id = `edit-${key}`;
        fieldContainer.appendChild(label);
        fieldContainer.appendChild(input);
        editFormContainer.appendChild(fieldContainer);
    });
    editModal.style.display = 'flex';
}

async function handleSaveChanges() {
    const collectionName = collectionNameInput.value.trim();
    if (!currentEditingDoc || !collectionName) return;

    const updatedData = {};
    let hasError = false;

    Object.keys(currentEditingDoc).forEach(key => {
        if (key === 'id') return;
        const input = document.getElementById(`edit-${key}`);
        if (!input) return;

        let value = input.value;
        if (typeof currentEditingDoc[key] === 'boolean') {
            value = (value === 'true');
        } else if (typeof currentEditingDoc[key] === 'object' && currentEditingDoc[key] !== null) {
            try {
                value = JSON.parse(value);
            } catch (e) {
                alert(`Erro de sintaxe no JSON para o campo '${key}': ${e.message}`);
                hasError = true;
            }
        }
        updatedData[key] = value;
    });

    if (hasError) return;
    
    saveChangesBtn.disabled = true;
    saveChangesBtn.textContent = 'A salvar...';

    try {
        await apiCall('/api/dbexplorer/execute', {
            method: 'POST',
            body: JSON.stringify({
                action: 'update',
                collection: collectionName,
                docId: currentEditingDoc.id,
                data: updatedData
            })
        });
        alert('Documento atualizado com sucesso!');
        editModal.style.display = 'none';
        executeQueryBtn.click(); // Re-executa a busca para mostrar os dados atualizados
    } catch (error) {
        alert(`Erro ao salvar: ${error.message}`);
    } finally {
        saveChangesBtn.disabled = false;
        saveChangesBtn.textContent = 'Salvar Alterações';
    }
}

// Event Listeners
executeQueryBtn.addEventListener('click', async () => {
    const collectionName = collectionNameInput.value.trim();
    const docId = docIdInput.value.trim();

    if (!collectionName) {
        alert('Por favor, insira o nome da coleção.');
        return;
    }

    executeQueryBtn.disabled = true;
    executeQueryBtn.textContent = 'A buscar...';
    resultStatus.textContent = 'A carregar...';
    resultStatus.classList.remove('hidden');
    resultContainer.classList.add('hidden');

    try {
        const result = await apiCall('/api/dbexplorer/execute', {
            method: 'POST',
            body: JSON.stringify({
                action: 'get',
                collection: collectionName,
                docId: docId || null
            })
        });
        displayResults(result);
    } catch (error) {
        resultStatus.textContent = `Erro: ${error.message}`;
    } finally {
        executeQueryBtn.disabled = false;
        executeQueryBtn.textContent = 'Buscar Dados';
    }
});

resultsTable.addEventListener('click', async (e) => {
    const target = e.target;
    const collectionName = collectionNameInput.value.trim();
    if (!collectionName) return;

    if (target.classList.contains('edit-btn')) {
        const docId = target.dataset.docId;
        try {
            const doc = await apiCall('/api/dbexplorer/execute', {
                method: 'POST',
                body: JSON.stringify({ action: 'get', collection: collectionName, docId: docId })
            });
            openEditModal(doc);
        } catch (error) {
            alert(`Erro ao buscar documento para edição: ${error.message}`);
        }
    }

    if (target.classList.contains('delete-btn')) {
        const docId = target.dataset.docId;
        if (confirm(`Tem certeza que deseja apagar o documento com ID "${docId}" da coleção "${collectionName}"?`)) {
            try {
                await apiCall('/api/dbexplorer/execute', {
                    method: 'POST',
                    body: JSON.stringify({ action: 'delete', collection: collectionName, docId: docId })
                });
                alert('Documento apagado com sucesso!');
                executeQueryBtn.click(); // Atualiza a tabela
            } catch (error) {
                alert(`Erro ao apagar: ${error.message}`);
            }
        }
    }
});

cancelEditBtn.addEventListener('click', () => {
    editModal.style.display = 'none';
    currentEditingDoc = null;
});

saveChangesBtn.addEventListener('click', handleSaveChanges);