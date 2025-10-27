// js/ui/navigation.js

/**
 * Este módulo é responsável por toda a interatividade da navegação principal,
 * incluindo a barra lateral (sidebar) e os links de navegação.
 */

const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const mainContent = document.getElementById('mainContent');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

/**
 * Define o estado da sidebar (colapsada/expandida) e ajusta a margem do conteúdo principal.
 * Esta função substitui a lógica simples anterior de toggleSidebar().
 * @param {boolean} shouldCollapse - true para colapsar, false para expandir.
 */
function setSidebarState(shouldCollapse) {
    if (!sidebar || !mainContent) return;
    
    // 1. Alterna a classe 'collapsed' na sidebar
    sidebar.classList.toggle('collapsed', shouldCollapse);
    
    // 2. Ajusta a margem do conteúdo principal usando as classes CSS
    // O CSS 'main-content-shift' já está aplicado, então só alternamos o 'sidebar-collapsed-shift'
    mainContent.classList.toggle('sidebar-collapsed-shift', shouldCollapse);
}

/**
 * Alterna o estado atual da sidebar.
 */
function toggleSidebar() {
    setSidebarState(!sidebar.classList.contains('collapsed'));
}


/**
 * Inicializa todos os event listeners para a navegação.
 * @param {function} navigateCallback - A função a ser chamada quando um link de navegação é clicado.
 * @param {object|null} userPermissions - O objeto de permissões do funcionário. Se for null (dono), tem acesso a tudo.
 * @param {object|null} enabledModules - O objeto de módulos habilitados para o estabelecimento.
 */
export function initializeNavigation(navigateCallback, userPermissions, enabledModules) {

    if (!sidebar || !mainContent) {
        // console.error('Elementos críticos da sidebar não encontrados.');
        return;
    }

    // 0. GARANTE O SHIFT INICIAL E SINCRONIZA O ESTADO (CORREÇÃO)
    // Assumimos que a classe base 'main-content-shift' já foi adicionada ao elemento HTML ou será adicionada aqui.
    mainContent.classList.add('main-content-shift'); 
    setSidebarState(sidebar.classList.contains('collapsed')); // Sincroniza o estado inicial

    // 1. Clique no botão de toggle (Toggle Sidebar)
    sidebarToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSidebar(); 
    });

    // 2. Clique no conteúdo principal (para fechar em mobile)
    mainContent.addEventListener('click', () => {
        // A lógica do mobile foi atualizada para usar a função de estado
        if (window.innerWidth < 768 && !sidebar.classList.contains('collapsed')) {
             setSidebarState(true); // Colapsa
        }
    });

    // 3. Mouse enter (expandir em desktop)
    sidebar.addEventListener('mouseenter', () => {
        // A lógica do desktop foi atualizada para usar a função de estado
        if (window.innerWidth >= 1024 && sidebar.classList.contains('collapsed')) {
            setSidebarState(false); // Expande
        }
    });

    // 4. Mouse leave (colapsar em desktop)
    sidebar.addEventListener('mouseleave', () => {
       // A lógica do desktop foi atualizada para usar a função de estado
       if (window.innerWidth >= 1024) {
           const isHoveringToggleButton = !!document.querySelector("#sidebarToggle:hover");
           if (!isHoveringToggleButton) {
               setSidebarState(true); // Colapsa
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