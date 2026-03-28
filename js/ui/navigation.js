// js/ui/navigation.js

/**
 * Módulo responsável pela interatividade da navegação (incluindo submenus Enterprise)
 */

const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const mainContent = document.getElementById('mainContent');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

const hamburgerMenuBtn = document.getElementById('hamburger-menu-btn');
const mobileOverlay = document.getElementById('mobile-overlay');

// Novos Elementos do Submenu Cadastros
const cadastrosBtn = document.getElementById('cadastros-menu-btn');
const cadastrosSubmenu = document.getElementById('cadastros-submenu');
const cadastrosArrow = document.getElementById('cadastros-arrow');

function setSidebarState(shouldCollapse) {
    if (!sidebar || !mainContent) return;
    sidebar.classList.toggle('collapsed', shouldCollapse);
    mainContent.classList.toggle('sidebar-collapsed-shift', shouldCollapse);
    
    // Se colapsar a sidebar, fecha o submenu de cadastros para não bugar o visual
    if (shouldCollapse && cadastrosSubmenu && !cadastrosSubmenu.classList.contains('hidden')) {
        toggleCadastrosSubmenu(true);
    }
}

function openMobileMenu() {
    if (!sidebar || !mobileOverlay) return;
    sidebar.classList.add('mobile-open');
    mobileOverlay.classList.add('visible');
}

function closeMobileMenu() {
    if (!sidebar || !mobileOverlay) return;
    sidebar.classList.remove('mobile-open');
    mobileOverlay.classList.remove('visible');
}

function toggleSidebar() {
    setSidebarState(!sidebar.classList.contains('collapsed'));
}

// Função para abrir/fechar o acordeão de Cadastros
function toggleCadastrosSubmenu(forceClose = false) {
    if (!cadastrosSubmenu || !cadastrosArrow) return;
    
    const isHidden = cadastrosSubmenu.classList.contains('hidden');
    
    if (forceClose || !isHidden) {
        cadastrosSubmenu.classList.add('hidden');
        cadastrosSubmenu.classList.remove('flex');
        cadastrosArrow.classList.remove('rotate-180');
    } else {
        // Se for abrir, garante que a sidebar está expandida (desktop)
        if (window.innerWidth >= 1024 && sidebar.classList.contains('collapsed')) {
            setSidebarState(false);
        }
        cadastrosSubmenu.classList.remove('hidden');
        cadastrosSubmenu.classList.add('flex');
        cadastrosArrow.classList.add('rotate-180');
    }
}

export function initializeNavigation(navigateCallback, userPermissions, enabledModules) {
    if (!sidebar || !mainContent) return;

    mainContent.classList.add('main-content-shift'); 
    
    if (window.innerWidth >= 768) {
        setSidebarState(sidebar.classList.contains('collapsed')); 
    } else {
        mainContent.classList.remove('main-content-shift', 'sidebar-collapsed-shift');
        closeMobileMenu();
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSidebar(); 
        });
    }

    sidebar.addEventListener('mouseenter', () => {
        if (window.innerWidth >= 1024 && sidebar.classList.contains('collapsed')) {
            setSidebarState(false);
        }
    });

    sidebar.addEventListener('mouseleave', () => {
       if (window.innerWidth >= 1024) {
           const isHoveringToggleButton = !!document.querySelector("#sidebarToggle:hover");
           if (!isHoveringToggleButton) {
               setSidebarState(true);
           }
       }
    });
    
    if (hamburgerMenuBtn) {
        hamburgerMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openMobileMenu();
        });
    }
    
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMobileMenu();
        });
    }

    let touchStartX = 0;
    sidebar.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sidebar.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            closeMobileMenu();
        }
    }, { passive: true });

    // NOVO: Clique no botão principal de Cadastros
    if (cadastrosBtn) {
        cadastrosBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleCadastrosSubmenu();
        });
    }

    sidebarLinks.forEach(link => {
        const targetId = link.getAttribute('data-target');
        if (!targetId) return; // Ignora links que não têm data-target (ex: o próprio botão de Cadastro)
        
        const moduleKey = targetId.replace('-section', '');
        const isModuleEnabled = enabledModules?.[moduleKey] !== false;
        const hasEmployeePermission = userPermissions === null || userPermissions[targetId]?.view === true;

        if (!isModuleEnabled || !hasEmployeePermission) {
            link.style.display = 'none';
            return;
        }

        link.style.display = 'flex';

        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (targetId && typeof navigateCallback === 'function') {
                navigateCallback(targetId);
            }
            if (window.innerWidth < 768) {
                closeMobileMenu();
            }
        });
    });
}