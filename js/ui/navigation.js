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
 * @param {object|null} userPermissions - O objeto de permissões do funcionário. Se for null (dono), tem acesso a tudo.
 * @param {object|null} enabledModules - O objeto de módulos habilitados para o estabelecimento.
 */
export function initializeNavigation(navigateCallback, userPermissions, enabledModules) {
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
        
        // Converte 'agenda-section' para 'agenda' para verificar no objeto de módulos
        const moduleKey = targetId.replace('-section', '');

        // Verifica se o módulo está habilitado para o estabelecimento.
        // Se a propriedade for `false`, o módulo está explicitamente desativado.
        const isModuleEnabled = enabledModules?.[moduleKey] !== false;

        // Verifica permissões específicas do funcionário. Donos (null) têm acesso a tudo.
        const hasEmployeePermission = userPermissions === null || userPermissions[targetId]?.view === true;

        // O link só será exibido se o módulo estiver habilitado E o funcionário tiver permissão.
        if (!isModuleEnabled || !hasEmployeePermission) {
            link.style.display = 'none'; // Oculta o link
            return;
        }

        // Garante que o link esteja visível caso a permissão seja válida (útil para re-logins)
        link.style.display = 'flex';

        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (targetId && typeof navigateCallback === 'function') {
                navigateCallback(targetId);
            }
        });
    });
}

