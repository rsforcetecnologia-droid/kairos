// js/ui/navigation.js

/**
 * Este módulo é responsável por toda a interatividade da navegação principal,
 * incluindo a barra lateral (sidebar) e os links de navegação.
 */

const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const mainContent = document.getElementById('mainContent');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

function toggleSidebar() {
    sidebar.classList.toggle('collapsed');
}

/**
 * Inicializa todos os event listeners para a navegação.
 * @param {function} navigateCallback - A função a ser chamada quando um link de navegação é clicado.
 * @param {object|null} permissions - O objeto de permissões do usuário. Se for null (owner), todos os links são mostrados.
 */
export function initializeNavigation(navigateCallback, permissions) {
    sidebarToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSidebar();
    });

    mainContent.addEventListener('click', () => {
        if (window.innerWidth < 768 && !sidebar.classList.contains('collapsed')) {
             sidebar.classList.add('collapsed');
        }
    });

    sidebar.addEventListener('mouseenter', () => {
        if (window.innerWidth >= 1024 && sidebar.classList.contains('collapsed')) {
            sidebar.classList.remove('collapsed');
        }
    });

    sidebar.addEventListener('mouseleave', () => {
       if (window.innerWidth >= 1024) {
           const isHoveringToggleButton = !!document.querySelector("#sidebarToggle:hover");
           if (!isHoveringToggleButton) {
               sidebar.classList.add('collapsed');
           }
       }
    });

    sidebarLinks.forEach(link => {
        const targetId = link.getAttribute('data-target');
        const canView = permissions === null || (permissions[targetId] && permissions[targetId].view);

        if (!canView) {
            link.style.display = 'none';
            return;
        }

        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (targetId && typeof navigateCallback === 'function') {
                navigateCallback(targetId);
            }
        });
    });
}
