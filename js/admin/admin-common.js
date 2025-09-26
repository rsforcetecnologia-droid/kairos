// js/admin/admin-common.js
import { signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

export function loadSidebar(activePage) {
    const sidebar = document.getElementById('sidebar');
    const links = {
        establishments: {
            href: '/admin',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>`,
            text: 'Estabelecimentos'
        },
        import: {
            href: '/import',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>`,
            text: 'Importação'
        },
        dbexplorer: {
            href: '/dbexplorer',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4M4 7l8 4 8-4m-8 4v8" /></svg>`,
            text: 'DB Explorer'
        }
    };

    sidebar.innerHTML = `
        <div class="p-4 flex items-center justify-between border-b border-gray-800 h-16">
             <div class="sidebar-header-text overflow-hidden transition-all duration-300 ease-in-out">
                <h1 class="text-xl font-bold text-white">KAIROS</h1>
            </div>
        </div>
        <nav class="flex-1 p-4 space-y-2">
            ${Object.entries(links).map(([key, value]) => `
                <a href="${value.href}" class="sidebar-link w-full flex items-center gap-3 py-2 px-4 rounded-lg font-semibold ${key === activePage ? 'text-white bg-gray-700' : 'text-gray-300 hover:bg-gray-700'}">
                    ${value.icon}
                    <span class="sidebar-text">${value.text}</span>
                </a>
            `).join('')}
        </nav>
    `;
}

export function setupCommonUI(user) {
    const userDisplayEmail = document.getElementById('userDisplayEmail');
    const logoutButton = document.getElementById('logoutButton');
    
    if (userDisplayEmail) userDisplayEmail.textContent = user.email;
    if (logoutButton) logoutButton.addEventListener('click', () => {
        const auth = getAuth();
        signOut(auth);
    });
}