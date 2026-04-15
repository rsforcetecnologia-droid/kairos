// js/main.js

// Bloqueios de gestos nativos para evitar zoom acidental no Mobile (UX de App Nativo)
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('gesturestart', e => e.preventDefault());
    document.addEventListener('gesturechange', e => e.preventDefault());
    document.addEventListener('gestureend', e => e.preventDefault());

    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) event.preventDefault();
        lastTouchEnd = now;
    }, false);
});

// --- 1. IMPORTAÇÕES DOS MÓDULOS ---
import { auth, db, setPersistence, browserLocalPersistence } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { collection, query, where, onSnapshot, doc, getDoc, updateDoc, orderBy, arrayUnion } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js"; 
import { state, setGlobalState } from './state.js';
import { initializeModalClosers, showNotification } from './components/modal.js';
import { initializeNavigation } from './ui/navigation.js';
import { getEstablishmentDetails, getHierarchy } from './api/establishments.js'; 
import { getProfessional } from './api/professionals.js';
import { checkAndStartOnboarding } from './ui/onboarding.js';

// Notificações
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core'; 
import { App } from '@capacitor/app'; 
import { initPushNotifications as initWebPush, requestWebPermission } from './ui/push-notifications.js';
import { getSummaryKPIs } from './api/reports.js';

// Páginas (Módulos)
import { loadDashboardPage } from './ui/dashboard.js'; 
import { loadAgendaPage } from './ui/agenda.js';
import { loadComandasPage } from './ui/comandas.js';
import { loadReportsPage } from './ui/reports.js';
import { loadServicesPage } from './ui/services.js';
import { loadProductsPage } from './ui/products.js';
import { loadSuppliersPage } from './ui/suppliers.js';
import { loadProfessionalsPage } from './ui/professionals.js';
import { loadClientsPage } from './ui/clients.js';
import { loadEstablishmentPage } from './ui/establishment.js';
import { loadAusenciasPage } from './ui/ausencias.js';
import { loadUsersPage } from './ui/users.js';
import { loadSalesReportPage } from './ui/salesReport.js';
import { loadFinancialPage } from './ui/financial.js';
import { loadCommissionsPage } from './ui/commissions.js';
import { loadPackagesPage } from './ui/packages.js'; 
import { loadMyProfilePage } from './ui/my-profile.js'; 
import { renderHierarchyScreen } from './ui/hierarchy.js'; 

// --- 2. REFERÊNCIAS AO DOM ---
const loadingScreen = document.getElementById('loadingScreen');
const dashboardContent = document.getElementById('dashboardContent');
const contentDiv = document.getElementById('content');
const notificationBell = document.getElementById('notificationBell');
const notificationBadge = document.getElementById('notificationBadge');
const notificationPanel = document.getElementById('notificationPanel');
const notificationList = document.getElementById('notificationList');
const profileMenuButton = document.getElementById('profileMenuButton');
const profileDropdown = document.getElementById('profileDropdown');
const profileName = document.getElementById('profileName');
const profileEmail = document.getElementById('profileEmail');
const logoutButton = document.getElementById('logoutButton');
const myProfileLink = document.getElementById('myProfileLink'); 
const hamburgerMenuBtn = document.getElementById('hamburger-menu-btn');
const sidebar = document.getElementById('sidebar');
const mobileOverlay = document.getElementById('mobile-overlay');

// --- Referências do Dark Mode ---
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');

// Bottom nav refs
const bottomNav = document.getElementById('mobile-bottom-nav');
const navScroll = document.getElementById('nav-scroll');
const bottomNavItems = document.querySelectorAll('.bottom-nav-item');

// Scroll to selected pill on mobile
function scrollToActiveItem() {
    if (!navScroll) return;
    const activeItem = document.querySelector('.bottom-nav-item.active');
    if (!activeItem) return;
    const container = navScroll;
    const containerRect = container.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const itemCenter = itemRect.left + itemRect.width / 2 - containerRect.left;
    const centerOffset = itemCenter - containerRect.width / 2;
    container.scrollBy({ left: centerOffset, behavior: 'smooth' });
}

// --- 3. MAPEAMENTO DE ROTAS E TÍTULOS ---
const pageLoader = {
    'dashboard-section': loadDashboardPage, 
    'agenda-section': loadAgendaPage,
    'comandas-section': loadComandasPage,
    'relatorios-section': loadReportsPage,
    'servicos-section': loadServicesPage,
    'produtos-section': loadProductsPage,
    'suppliers-section': loadSuppliersPage,
    'profissionais-section': loadProfessionalsPage,
    'clientes-section': loadClientsPage,
    'estabelecimento-section': (params) => loadEstablishmentPage(params), 
    'ausencias-section': loadAusenciasPage,
    'users-section': loadUsersPage,
    'sales-report-section': loadSalesReportPage,
    'financial-section': loadFinancialPage,
    'commissions-section': loadCommissionsPage,
    'packages-section': loadPackagesPage,
    'my-profile-section': loadMyProfilePage,
    'hierarquia-section': () => renderHierarchyScreen(contentDiv),
    'establishments-section': () => renderHierarchyScreen(contentDiv),
};

const pageTitles = {
    'dashboard-section': 'Dashboard',
    'agenda-section': 'Agenda',
    'comandas-section': 'Comandas / PDV',
    'relatorios-section': 'Relatórios',
    'servicos-section': 'Serviços',
    'produtos-section': 'Estoque',
    'suppliers-section': 'Parceiros',
    'profissionais-section': 'Equipe',
    'clientes-section': 'Clientes',
    'estabelecimento-section': 'Empresa',
    'ausencias-section': 'Ausências',
    'users-section': 'Usuários',
    'sales-report-section': 'Relatório de Vendas',
    'financial-section': 'Financeiro',
    'commissions-section': 'Comissões',
    'packages-section': 'Pacotes',
    'my-profile-section': 'Meu Perfil',
    'hierarquia-section': 'Rede / Filiais',
    'establishments-section': 'Rede / Filiais'
};

// --- 4. FUNÇÕES DE TEMA (DARK / LIGHT MODE) ---
export function setTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('kairos_theme', themeName);
    
    // Troca o ícone suavemente
    if (themeIcon) {
        if (themeName === 'dark') {
            themeIcon.className = 'bi bi-sun-fill text-lg sm:text-xl text-amber-400';
        } else {
            themeIcon.className = 'bi bi-moon-fill text-lg sm:text-xl text-slate-500';
        }
    }
}

export function initTheme() {
    const savedTheme = localStorage.getItem('kairos_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDark) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
}

// --- 5. NOTIFICAÇÕES EM TEMPO REAL ---
let unsubscribeNotificationsListener = null;
let notifications = [];

function renderNotificationPanel() {
    if (!notificationBadge || !notificationList) return;
    const unreadCount = notifications.filter(n => !n.read).length;
    if (unreadCount > 0) {
        notificationBadge.textContent = unreadCount;
        notificationBadge.classList.remove('hidden');
    } else {
        notificationBadge.classList.add('hidden');
    }
    if (notifications.length === 0) {
        notificationList.innerHTML = '<p class="text-center text-slate-500 p-4 text-sm">Nenhuma notificação.</p>';
        return;
    }
    notificationList.innerHTML = notifications.map(n => `
    <div class="notification-item ${n.read ? '' : 'unread'}">
        <p class="font-semibold text-sm text-slate-800">${n.title}</p>
        <p class="text-xs text-slate-600 mt-0.5">${n.message}</p>
        <p class="text-[10px] text-slate-400 mt-1"><i class="bi bi-clock mr-1"></i>${n.time}</p>
    </div>
    `).join('');
}

function setupRealtimeListeners(establishmentId) {
    if (unsubscribeNotificationsListener) unsubscribeNotificationsListener();
    const notificationsRef = collection(db, 'establishments', establishmentId, 'notifications');
    const q = query(notificationsRef, where("timestamp", ">=", new Date()), orderBy("timestamp", "desc"));

    unsubscribeNotificationsListener = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                const notification = change.doc.data();
                notifications.unshift({
                    title: notification.title,
                    message: notification.message,
                    time: notification.timestamp.toDate().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                    read: false
                });
                showNotification(notification.title, notification.message, 'info', true);
                renderNotificationPanel();
                const activeLink = document.querySelector('.sidebar-link.active');
                if (activeLink && activeLink.dataset.target === 'agenda-section') {
                    loadAgendaPage();
                }
            }
        });
    }, (error) => {
        console.error("Erro no listener de notificações:", error);
    });
}

// --- 6. SWITCHER DE CONTEXTO (MÚLTIPLAS LOJAS) ---
async function setupContextSwitcher(baseEstablishmentId) {
    const container = document.getElementById('multi-context-container');
    const btn = document.getElementById('multi-context-btn');
    const label = document.getElementById('multi-context-label');
    const countEl = document.getElementById('multi-context-count');
    const list = document.getElementById('multi-context-list');
    const applyBtn = document.getElementById('multi-context-apply');
    const dropdown = document.getElementById('multi-context-dropdown');
    const arrow = document.getElementById('multi-context-arrow');

    if (!container || !list) return;

    try {
        const payload = await getHierarchy();
        const matrizes = payload.matrizes || [];

        let itemsHtml = '';
        let count = 0;
        
        matrizes.forEach(matriz => {
            itemsHtml += `
                <label class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors mb-1">
                    <input type="checkbox" value="${matriz.id}" class="context-checkbox" data-name="${escapeHTML(matriz.name)}">
                    <span class="text-[13px] sm:text-sm font-bold text-slate-700 truncate">🏢 ${escapeHTML(matriz.name)}</span>
                </label>
            `;
            count++;
            if (matriz.branches && matriz.branches.length > 0) {
                matriz.branches.forEach(branch => {
                    itemsHtml += `
                        <label class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors ml-4 mb-1 border-l-2 border-slate-100 pl-3">
                            <input type="checkbox" value="${branch.id}" class="context-checkbox" data-name="${escapeHTML(branch.name)}">
                            <span class="text-[12px] sm:text-[13px] font-medium text-slate-600 truncate">📍 ${escapeHTML(branch.name)}</span>
                        </label>
                    `;
                    count++;
                });
            }
        });

        if (count > 0) { 
            list.innerHTML = itemsHtml;
            container.style.display = 'block'; 
            
            if (!state.selectedEstablishments || state.selectedEstablishments.length === 0) {
                state.selectedEstablishments = [baseEstablishmentId];
            }

            const checkboxes = Array.from(list.querySelectorAll('input[type="checkbox"]'));

            const updateUI = () => {
                const checked = checkboxes.filter(cb => cb.checked);
                countEl.textContent = checked.length;

                if (checked.length === 0) label.textContent = "Nenhuma selecionada";
                else if (checked.length === 1) label.textContent = checked[0].dataset.name;
                else label.textContent = `${checked.length} Unidades`;
            };

            let defaultFound = false;
            checkboxes.forEach(cb => {
                if (state.selectedEstablishments.includes(cb.value)) { cb.checked = true; defaultFound = true; }
            });
            
            if (!defaultFound && checkboxes.length > 0) {
                checkboxes[0].checked = true;
                state.selectedEstablishments = [checkboxes[0].value];
                state.establishmentId = checkboxes[0].value;
            }
            updateUI();

            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('hidden');
                arrow.style.transform = dropdown.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
            });

            document.addEventListener('click', (e) => {
                if (!container.contains(e.target) && !dropdown.classList.contains('hidden')) {
                    dropdown.classList.add('hidden');
                    arrow.style.transform = 'rotate(0deg)';
                    checkboxes.forEach(cb => { cb.checked = state.selectedEstablishments.includes(cb.value); });
                    updateUI();
                }
            });

            checkboxes.forEach(cb => cb.addEventListener('change', updateUI));

            applyBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                if (loadingScreen) { loadingScreen.classList.remove('hidden', 'fade-out'); loadingScreen.style.display = 'flex'; }

                const checked = checkboxes.filter(cb => cb.checked);
                if (checked.length === 0) {
                    if (loadingScreen) { loadingScreen.classList.add('fade-out'); setTimeout(() => { loadingScreen.style.display = 'none'; }, 500); }
                    showNotification('Atenção', 'Selecione pelo menos uma unidade.', 'warning');
                    return;
                }

                state.selectedEstablishments = checked.map(cb => cb.value);
                const primaryId = state.selectedEstablishments[0]; 

                try {
                    const estDetails = await getEstablishmentDetails(primaryId);
                    state.establishmentId = primaryId;
                    state.establishmentName = estDetails.name;
                    state.enabledModules = estDetails.modules;
                    state.currentViewContext = { id: primaryId, name: estDetails.name, type: estDetails.parentId ? 'BRANCH' : 'GROUP' };

                    setupRealtimeListeners(primaryId);
                    loadHeaderKPIs(state.userPermissions);

                    dropdown.classList.add('hidden');
                    arrow.style.transform = 'rotate(0deg)';

                    showNotification('Ambiente Atualizado', `Exibindo dados consolidados.`, 'success');
                    
                    const activeLink = document.querySelector('.sidebar-link.active');
                    const currentSection = activeLink ? activeLink.getAttribute('data-target') : 'dashboard-section';
                    navigateTo(currentSection);

                } catch (err) {
                    showNotification('Erro', 'Problema ao trocar a visualização.', 'error');
                } finally {
                    if (loadingScreen) { loadingScreen.classList.add('fade-out'); setTimeout(() => { loadingScreen.style.display = 'none'; }, 500); }
                }
            });

            try {
                const estDetails = await getEstablishmentDetails(state.establishmentId);
                state.establishmentName = estDetails.name;
                state.enabledModules = estDetails.modules;
                state.currentViewContext = { id: state.establishmentId, name: estDetails.name, type: estDetails.parentId ? 'BRANCH' : 'GROUP' };
                setupRealtimeListeners(state.establishmentId);
                loadHeaderKPIs(state.userPermissions);
            } catch(e) {}

        } else container.style.display = 'none';
    } catch (error) { container.style.display = 'none'; }
}

// --- 7. SISTEMA DE NAVEGAÇÃO ---
export function navigateTo(sectionId, params = {}) {
    const moduleKey = sectionId.replace('-section', '');
    if (sectionId !== 'my-profile-section') {
        const isHierarchyOrConfig = ['hierarquia-section', 'establishments-section', 'estabelecimento-section', 'dashboard-section'].includes(sectionId);
        const isModuleEnabled = state.enabledModules?.[moduleKey] !== false;
        const hasEmployeePermission = state.userPermissions === null || state.userPermissions[sectionId]?.view === true;
        
        if (!isHierarchyOrConfig && (!isModuleEnabled || !hasEmployeePermission)) {
            if (contentDiv) contentDiv.innerHTML = `<div class="p-8 text-center mt-10"><i class="bi bi-shield-lock text-5xl text-rose-500 mb-4 block"></i><h2 class="text-2xl font-bold text-slate-800">Acesso Negado</h2><p class="text-slate-500 mt-2">Você não possui permissão para visualizar esta tela.</p></div>`;
            document.querySelectorAll('.sidebar-link').forEach(link => link.classList.remove('active'));
            if (sidebar && sidebar.classList.contains('absolute')) { 
                 sidebar.classList.add('hidden');
                 if(mobileOverlay) mobileOverlay.classList.add('hidden');
            }
            return;
        }
    }
    
    const loadPage = pageLoader[sectionId];
    if (loadPage && contentDiv) {
        const headerTitleEl = document.getElementById('header-page-title');
        if (headerTitleEl) headerTitleEl.textContent = pageTitles[sectionId] || 'Painel';

        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-target') === sectionId);
        });

        if (bottomNav) {
            bottomNavItems.forEach(item => {
                item.classList.toggle('active', item.getAttribute('data-target') === sectionId);
            });
            setTimeout(scrollToActiveItem, 50);
        }

        if (sectionId === 'my-profile-section') {
            document.querySelectorAll('.sidebar-link').forEach(link => link.classList.remove('active'));
        }
        contentDiv.innerHTML = '';
        
        if (window.innerWidth < 768 && sidebar) { 
            sidebar.classList.add('hidden');
            if(mobileOverlay) mobileOverlay.classList.add('hidden');
        }
        loadPage(params);
    }
}
window.navigateTo = navigateTo;

async function loadHeaderKPIs(userPermissions) {
    const kpiAppointmentsWrapper = document.getElementById('kpi-appointments-wrapper');
    const kpiFinancialWrapper = document.getElementById('kpi-financial-wrapper');
    const kpiAppointmentsEl = document.getElementById('kpi-today-appointments');
    const kpiRevenueEl = document.getElementById('kpi-today-revenue');

    const canViewAgenda = userPermissions === null || userPermissions['agenda-section']?.view === true;
    const canViewFinancial = userPermissions === null || userPermissions['financial-section']?.view === true;

    if (canViewAgenda && kpiAppointmentsWrapper) { kpiAppointmentsWrapper.classList.remove('hidden'); kpiAppointmentsWrapper.classList.add('inline-flex'); }
    if (canViewFinancial && kpiFinancialWrapper) { kpiFinancialWrapper.classList.remove('hidden'); kpiFinancialWrapper.classList.add('inline-flex'); }
    if (!canViewAgenda && !canViewFinancial) return;

    try {
        const kpis = await getSummaryKPIs();
        if (canViewAgenda && kpiAppointmentsEl) kpiAppointmentsEl.textContent = kpis.todayAppointments.toString();
        if (canViewFinancial && kpiRevenueEl) kpiRevenueEl.textContent = `R$ ${kpis.todayRevenue.toFixed(2).replace('.', ',')}`;
    } catch (error) {}
}

async function initializePushNotifications(userUid) {
    try {
        if (Capacitor.getPlatform() === 'android') {
            await PushNotifications.createChannel({
                id: 'default', name: 'Notificações', description: 'Alertas',
                importance: 5, visibility: 1, vibration: true
            });
        }
        let permStatus = await PushNotifications.checkPermissions();
        if (permStatus.receive === 'prompt') permStatus = await PushNotifications.requestPermissions();
        if (permStatus.receive !== 'granted') return;
        
        await PushNotifications.register();
        PushNotifications.addListener('registration', async (token) => {
            try {
                const userRef = doc(db, 'users', userUid);
                await updateDoc(userRef, { fcmTokens: arrayUnion(token.value), platform: 'native_mobile' });
            } catch (error) {}
        });
        PushNotifications.addListener('pushNotificationReceived', (notification) => showNotification(notification.title, notification.body, 'info', true));
        PushNotifications.addListener('pushNotificationActionPerformed', () => navigateTo('agenda-section'));
    } catch (e) {}
}

function setupBackButtonHandling() {
    const exitModal = document.getElementById('exitConfirmationModal');
    const btnCancel = document.getElementById('btn-cancel-exit');
    const btnConfirm = document.getElementById('btn-confirm-exit');
    const showModal = () => exitModal && (exitModal.style.display = 'block');
    const hideModal = () => exitModal && (exitModal.style.display = 'none');
    const isModalVisible = () => exitModal && exitModal.style.display === 'block';

    if (!exitModal) return;

    btnCancel.addEventListener('click', () => {
        hideModal();
        if (!Capacitor.isNativePlatform()) history.pushState(null, document.title, location.href);
    });

    btnConfirm.addEventListener('click', () => {
        hideModal();
        if (Capacitor.isNativePlatform()) App.exitApp(); else history.back(); 
    });

    if (Capacitor.isNativePlatform()) {
        App.addListener('backButton', () => {
            if (isModalVisible()) { hideModal(); } 
            else {
                const openModals = document.querySelectorAll('.modal[style*="display: block"]');
                const activeModals = Array.from(openModals).filter(m => m.id !== 'exitConfirmationModal');
                if (activeModals.length > 0) { activeModals.forEach(m => m.style.display = 'none'); return; }
                
                if (sidebar && !sidebar.classList.contains('hidden') && window.innerWidth < 768) {
                    sidebar.classList.add('hidden');
                    if (mobileOverlay) mobileOverlay.classList.add('hidden');
                    return;
                }

                const activeLink = document.querySelector('.sidebar-link.active');
                if (activeLink && activeLink.getAttribute('data-target') === 'dashboard-section') showModal();
                else navigateTo('dashboard-section'); 
            }
        });
    } else {
        history.pushState(null, document.title, location.href);
        window.addEventListener('popstate', () => {
            if (isModalVisible()) { hideModal(); history.pushState(null, document.title, location.href); return; }
            
            const openModals = document.querySelectorAll('.modal[style*="display: block"], .modal[style*="display: flex"]');
            const otherModals = Array.from(openModals).filter(m => m.id !== 'exitConfirmationModal');
            if (otherModals.length > 0) { otherModals.forEach(m => m.style.display = 'none'); history.pushState(null, document.title, location.href); return; }

            const activeLink = document.querySelector('.sidebar-link.active');
            if (activeLink && activeLink.getAttribute('data-target') === 'dashboard-section') showModal();
            else { navigateTo('dashboard-section'); history.pushState(null, document.title, location.href); }
        });
    }
}

function escapeHTML(str) {
    if (!str) return '';
    return str.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// --- 8. INICIALIZAÇÃO GERAL ---
async function initialize() {
    try { await setPersistence(auth, browserLocalPersistence); } catch (e) {}

    if (Capacitor.isNativePlatform()) document.body.classList.add('is-app-native');
    
    initializeModalClosers();
    setupBackButtonHandling(); 
    initTheme(); // Inicia o Dark Mode caso tenha salvo

    // Ouvinte do Botão de Troca de Tema (Sol/Lua)
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }

    if (hamburgerMenuBtn) {
        hamburgerMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if(sidebar) { sidebar.classList.remove('hidden'); sidebar.classList.add('absolute', 'inset-y-0', 'left-0', 'z-40', 'shadow-xl'); }
            if(mobileOverlay) mobileOverlay.classList.remove('hidden');
        });
    }

    if (bottomNav) {
        bottomNav.addEventListener('click', (e) => {
            const item = e.target.closest('.bottom-nav-item');
            if (!item) return;
            e.preventDefault();
            const target = item.getAttribute('data-target');
            navigateTo(target);
        });
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', () => {
            if(sidebar) { sidebar.classList.add('hidden'); sidebar.classList.remove('absolute', 'inset-y-0', 'left-0', 'z-40', 'shadow-xl'); }
            mobileOverlay.classList.add('hidden');
        });
    }

    if (notificationBell) {
        notificationBell.addEventListener('click', (e) => {
            e.stopPropagation();
            if (notificationPanel) {
                notificationPanel.classList.toggle('hidden');
                if (!notificationPanel.classList.contains('hidden')) {
                    notifications.forEach(n => n.read = true);
                    renderNotificationPanel();
                }
            }
        });
    }

    if (profileMenuButton) {
        profileMenuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            if (profileDropdown) {
                profileDropdown.classList.toggle('active');
                if (profileDropdown.classList.contains('active')) profileDropdown.classList.remove('hidden');
                else setTimeout(() => profileDropdown.classList.add('hidden'), 200);
            }
        });
    }
    
    if (myProfileLink) {
        myProfileLink.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('my-profile-section');
            if (profileDropdown) { profileDropdown.classList.remove('active'); profileDropdown.classList.add('hidden'); }
        });
    }

    window.addEventListener('userPhotoUpdated', (e) => {
        const photoUrl = e.detail;
        if (profileMenuButton && photoUrl) {
            profileMenuButton.innerHTML = `<img src="${photoUrl}" alt="Avatar" class="w-full h-full rounded-full object-cover">`;
        }
    });

    document.addEventListener('click', (e) => {
        if (notificationPanel && !notificationPanel.contains(e.target) && e.target !== notificationBell) notificationPanel.classList.add('hidden');
        if (profileDropdown && !profileDropdown.contains(e.target) && e.target !== profileMenuButton) {
            if (profileDropdown.classList.contains('active')) {
                 profileDropdown.classList.remove('active');
                 setTimeout(() => profileDropdown.classList.add('hidden'), 200);
            }
        }
    });

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            if (!Capacitor.isNativePlatform()) {
                initWebPush(); 
                if ('Notification' in window && Notification.permission === 'default') {
                    const toast = document.getElementById('toast-notification-request');
                    const btnEnable = document.getElementById('btn-enable-toast');
                    if (toast) setTimeout(() => { toast.style.display = 'block'; }, 3500);
                    if (btnEnable) btnEnable.addEventListener('click', async () => { const granted = await requestWebPermission(); if (granted && toast) toast.style.display = 'none'; });
                    const closeAction = () => { if (toast) toast.style.display = 'none'; };
                    const btnDeny = document.getElementById('btn-deny-toast');
                    const btnClose = document.getElementById('btn-close-toast');
                    if (btnDeny) btnDeny.addEventListener('click', closeAction);
                    if (btnClose) btnClose.addEventListener('click', closeAction);
                }
            }

            try {
                const idTokenResult = await user.getIdTokenResult(true);
                const claims = idTokenResult.claims;
                
                if ((claims.role === 'owner' || claims.role === 'admin' || claims.role === 'employee') && claims.establishmentId) {
                    
                    let userPermissions = null;
                    let userName = user.displayName; 
                    let userProfessionalId = null; 
                    let userPhoto = null;

                    const userDocRef = doc(db, 'users', user.uid);
                    const userDoc = await getDoc(userDocRef);
                    
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        userPermissions = (claims.role === 'employee') ? (userData.permissions || {}) : null;
                        userName = userData.name || userName;
                        userProfessionalId = userData.professionalId || null; 
                        userPhoto = userData.photo || null;
                    }
                    
                    state.userProfessionalId = userProfessionalId; 

                    if (userProfessionalId && !userPhoto) {
                        try {
                            const prof = await getProfessional(userProfessionalId);
                            if (prof && prof.photo) {
                                userPhoto = prof.photo;
                            }
                        } catch(e) {}
                    }

                    if (Capacitor.isNativePlatform()) initializePushNotifications(user.uid);
                    
                    const finalUserName = userName || user.email;
                    setGlobalState(claims.establishmentId, "Carregando...", userPermissions);

                    if (userPhoto) {
                        if (profileMenuButton) profileMenuButton.innerHTML = `<img src="${userPhoto}" class="w-full h-full rounded-full object-cover">`;
                    } else {
                        if (profileMenuButton) profileMenuButton.textContent = finalUserName.charAt(0).toUpperCase();
                    }

                    if (profileName) profileName.textContent = finalUserName;
                    if (profileEmail) profileEmail.textContent = user.email;

                    if (logoutButton) {
                        logoutButton.addEventListener('click', (e) => {
                            e.preventDefault();
                            if (unsubscribeNotificationsListener) unsubscribeNotificationsListener();
                            signOut(auth).then(() => window.location.href = '/login.html');
                        });
                    }

                    await setupContextSwitcher(claims.establishmentId);
                    initializeNavigation(navigateTo, userPermissions, state.enabledModules);
                    
                    if (loadingScreen) {
                        loadingScreen.classList.add('fade-out');
                        setTimeout(() => { loadingScreen.style.display = 'none'; }, 500);
                    }
                    if (dashboardContent) dashboardContent.style.display = 'flex';

                    setTimeout(() => { checkAndStartOnboarding(); }, 1500); 
                    navigateTo('dashboard-section');

                } else throw new Error("Permissão ou estabelecimento não configurado.");
            } catch (error) {
                if (loadingScreen) loadingScreen.style.display = 'none';
                if (dashboardContent) {
                    dashboardContent.innerHTML = `<div class="w-full h-full flex flex-col items-center justify-center p-4 text-center"><i class="bi bi-x-circle text-5xl text-rose-500 mb-4"></i><h2 class="text-xl font-bold">Erro de Acesso</h2><p class="text-slate-500 mt-2">${error.message}</p></div>`;
                    dashboardContent.style.display = 'flex'; 
                }
            }
        } else window.location.href = '/login.html';
    });
}

initialize();