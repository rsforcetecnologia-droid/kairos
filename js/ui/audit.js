// js/ui/audit.js
import * as auditApi from '../api/audit.js';
import { state } from '../state.js';
import { showNotification } from '../components/modal.js';

const contentDiv = document.getElementById('content');

export async function loadAuditPage() {
    // 1. Verificação de Segurança (Apenas Dono)
    // Assumimos que state.userPermissions == null significa Dono (conforme lógica do teu main.js)
    // Se quiseres ser mais explícito, podes verificar o token role se estiver disponível no state.
    if (state.userPermissions !== null) {
        contentDiv.innerHTML = `
            <div class="flex flex-col items-center justify-center h-96 text-center">
                <div class="bg-red-100 p-4 rounded-full mb-4">
                    <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <h2 class="text-xl font-bold text-gray-800">Acesso Restrito</h2>
                <p class="text-gray-600">Apenas o administrador principal pode visualizar a auditoria.</p>
            </div>
        `;
        return;
    }

    contentDiv.innerHTML = `
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                Auditoria do Sistema
            </h2>
            
            <div class="bg-white rounded-lg shadow overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data/Hora</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuário</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Módulo</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ação</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalhes</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200" id="auditList">
                            <tr><td colspan="5" class="px-6 py-4 text-center"><div class="loader mx-auto"></div></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    try {
        const logs = await auditApi.getAuditLogs(state.establishmentId);
        renderLogs(logs);
    } catch (error) {
        document.getElementById('auditList').innerHTML = `<tr><td colspan="5" class="px-6 py-4 text-center text-red-500">Erro ao carregar logs.</td></tr>`;
    }
}

function renderLogs(logs) {
    const tbody = document.getElementById('auditList');
    tbody.innerHTML = '';

    if (logs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="px-6 py-4 text-center text-gray-500">Nenhum registo encontrado.</td></tr>`;
        return;
    }

    logs.forEach(log => {
        const date = log.timestamp ? new Date(log.timestamp.seconds * 1000).toLocaleString('pt-BR') : '-';
        
        let actionColor = 'text-gray-800';
        if (log.action.includes('Excluiu') || log.action.includes('Delete')) actionColor = 'text-red-600 font-bold';
        if (log.action.includes('Criou') || log.action.includes('Novo')) actionColor = 'text-green-600 font-bold';
        if (log.action.includes('Editou') || log.action.includes('Update')) actionColor = 'text-blue-600 font-bold';

        const row = `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${date}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${log.userName}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                        ${log.module}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm ${actionColor}">${log.action}</td>
                <td class="px-6 py-4 text-sm text-gray-500 truncate max-w-xs" title="${log.description}">
                    ${log.description}
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}