// js/ui/navigation.js

/**
 * Módulo responsável pela interatividade da navegação (Arquitetura ERP)
 * Inclui: Busca no menu, Submenus Dinâmicos e Colapso/Fixação da Sidebar
 */

const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const mainContent = document.getElementById('mainContent');
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const menuSearchInput = document.getElementById('menu-search');

const hamburgerMenuBtn = document.getElementById('hamburger-menu-btn');
const mobileOverlay = document.getElementById('mobile-overlay');

// Variável de controle: Define se a sidebar está travada (fixada) ou solta (hover)
let isSidebarPinned = true;

// --- CONTROLO DA SIDEBAR ---

function setSidebarState(shouldCollapse) {
    if (!sidebar || !mainContent) return;

    sidebar.classList.toggle('collapsed', shouldCollapse);
    mainContent.classList.toggle('sidebar-collapsed-shift', shouldCollapse);

    const searchContainer = sidebar.querySelector('.sidebar-search-container');
    const categoryLabels = sidebar.querySelectorAll('.sidebar-category');

    if (shouldCollapse) {
        // Quando colapsado, esconde a barra de busca, os titulos e fecha os submenus
        if (searchContainer) searchContainer.style.display = 'none';
        categoryLabels.forEach(lbl => lbl.style.display = 'none');

        document.querySelectorAll('.submenu-toggle').forEach(btn => {
            const submenuId = btn.getAttribute('data-target-submenu');
            const submenu = document.getElementById(submenuId);
            const arrow = btn.querySelector('.submenu-arrow');
            if (submenu) {
                submenu.classList.add('hidden');
                submenu.classList.remove('flex');
            }
            if (arrow) arrow.classList.remove('rotate-180');
        });
    } else {
        // Restaura ao expandir
        if (searchContainer) searchContainer.style.display = 'block';
        categoryLabels.forEach(lbl => lbl.style.display = 'block');
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

// --- SUBMENUS DINÂMICOS (ACORDEÃO) ---

function toggleSubmenu(submenuId, arrowEl) {
    const submenu = document.getElementById(submenuId);
    if (!submenu) return;
    
    const isHidden = submenu.classList.contains('hidden');
    
    // Força a abertura da sidebar caso esteja minimizada e o utilizador clique no icone do submenu
    if (isHidden && window.innerWidth >= 1024 && sidebar.classList.contains('collapsed')) {
        setSidebarState(false);
    }

    if (isHidden) {
        submenu.classList.remove('hidden');
        submenu.classList.add('flex');
        if (arrowEl) arrowEl.classList.add('rotate-180');
    } else {
        submenu.classList.add('hidden');
        submenu.classList.remove('flex');
        if (arrowEl) arrowEl.classList.remove('rotate-180');
    }
}

// --- MOTOR DE PESQUISA DO MENU ---

function setupMenuSearch() {
    if (!menuSearchInput) return;

    menuSearchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const navList = document.getElementById('sidebar-nav');
        if (!navList) return;

        const allListItems = navList.querySelectorAll('li');
        const categoryLabels = navList.querySelectorAll('.sidebar-category');

        if (searchTerm === '') {
            // Restaura o menu original
            allListItems.forEach(li => li.style.display = '');
            categoryLabels.forEach(lbl => lbl.style.display = 'block');
            return;
        }

        // Esconde as categorias durante a pesquisa para ficar mais limpo
        categoryLabels.forEach(lbl => lbl.style.display = 'none');

        allListItems.forEach(li => {
            // Ignora categorias pois já as ocultámos
            if (li.classList.contains('sidebar-category')) return;

            const link = li.querySelector('.sidebar-link') || li.querySelector('.submenu-toggle');
            if (!link) return;

            const text = link.textContent.toLowerCase();
            const isMatch = text.includes(searchTerm);

            if (isMatch) {
                li.style.display = '';

                // Se encontrou um item que está DENTRO de um submenu, força a abertura do submenu pai
                const parentSubmenu = li.closest('ul[id$="-submenu"]');
                if (parentSubmenu) {
                    parentSubmenu.classList.remove('hidden');
                    parentSubmenu.classList.add('flex');
                    parentSubmenu.parentElement.style.display = ''; // Garante que o <li> do Toggle pai apareça

                    // Roda a setinha do pai
                    const toggleBtn = parentSubmenu.parentElement.querySelector('.submenu-toggle');
                    if (toggleBtn) {
                        const arrow = toggleBtn.querySelector('.submenu-arrow');
                        if (arrow) arrow.classList.add('rotate-180');
                    }
                }
            } else {
                // Se for um Submenu Toggle (ex: Cadastros) e NENHUM filho der match, oculta.
                const submenuTarget = link.getAttribute('data-target-submenu');
                if (submenuTarget) {
                    const submenu = document.getElementById(submenuTarget);
                    if (submenu) {
                        const childLinks = Array.from(submenu.querySelectorAll('.sidebar-link'));
                        const hasMatchingChild = childLinks.some(child => child.textContent.toLowerCase().includes(searchTerm));

                        if (hasMatchingChild) {
                            li.style.display = '';
                        } else {
                            li.style.display = 'none';
                        }
                    }
                } else {
                    li.style.display = 'none';
                }
            }
        });
    });
}

// --- INICIALIZAÇÃO PRINCIPAL ---

export function initializeNavigation(navigateCallback, userPermissions, enabledModules) {
    if (!sidebar || !mainContent) return;

    mainContent.classList.add('main-content-shift');

    // Configura o estado inicial responsivo e da fixação
    if (window.innerWidth >= 1024) {
        isSidebarPinned = true;
        setSidebarState(false); // Desktop: Aberto e fixado por defeito
    } else if (window.innerWidth >= 768) {
        isSidebarPinned = false;
        setSidebarState(true); // Tablet: Oculto por defeito
    } else {
        mainContent.classList.remove('main-content-shift', 'sidebar-collapsed-shift');
        closeMobileMenu();
    }

    // Botão de Minimizar / Fixar (Desktop)
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (window.innerWidth >= 768) {
                isSidebarPinned = !isSidebarPinned; // Alterna entre Fixo e Solto
                setSidebarState(!isSidebarPinned);  // Recolhe se foi solto, expande se foi fixo
                
                // Feedback visual no ícone para o utilizador
                if (isSidebarPinned) {
                    sidebarToggle.classList.add('text-indigo-400');
                    sidebarToggle.classList.remove('text-gray-400');
                } else {
                    sidebarToggle.classList.remove('text-indigo-400');
                    sidebarToggle.classList.add('text-gray-400');
                }
            } else {
                toggleSidebar(); 
            }
        });
    }

    // Hover inteligente na sidebar (Só funciona se não estiver fixada)
    sidebar.addEventListener('mouseenter', () => {
        if (window.innerWidth >= 768 && !isSidebarPinned && sidebar.classList.contains('collapsed')) {
            setSidebarState(false);
        }
    });

    sidebar.addEventListener('mouseleave', () => {
       if (window.innerWidth >= 768 && !isSidebarPinned) {
           const isHoveringToggleButton = !!document.querySelector("#sidebarToggle:hover");
           // Só volta a fechar se o input de pesquisa não estiver focado
           const isSearchFocused = document.activeElement === menuSearchInput;
           
           if (!isHoveringToggleButton && !isSearchFocused) {
               setSidebarState(true);
           }
       }
    });
    
    // Mobile Overlays
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

    // Gestos Mobile
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

    // Delegação de Submenus Dinâmicos
    document.querySelectorAll('.submenu-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const submenuId = btn.getAttribute('data-target-submenu');
            const arrow = btn.querySelector('.submenu-arrow');
            toggleSubmenu(submenuId, arrow);
        });
    });

    // Inicia o motor de busca
    setupMenuSearch();

    // Aplicação de Permissões e Clique nos Links Finais
    sidebarLinks.forEach(link => {
        const targetId = link.getAttribute('data-target');
        if (!targetId) return; 
        
        const moduleKey = targetId.replace('-section', '');
        const isModuleEnabled = enabledModules?.[moduleKey] !== false;
        const hasEmployeePermission = userPermissions === null || userPermissions[targetId]?.view === true;

        if (!isModuleEnabled || !hasEmployeePermission) {
            // Em vez de 'display: none', escondemos o pai (LI) para não quebrar a lógica de pesquisa
            if (link.parentElement && link.parentElement.tagName === 'LI') {
                link.parentElement.style.display = 'none';
            } else {
                link.style.display = 'none';
            }
            return;
        }

        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active de todos
            document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
            // Adiciona ativo ao clicado
            link.classList.add('active');

            if (targetId && typeof navigateCallback === 'function') {
                navigateCallback(targetId);
            }
            if (window.innerWidth < 768) {
                closeMobileMenu();
            }
        });
    });
}