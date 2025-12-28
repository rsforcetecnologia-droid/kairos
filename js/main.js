// js/main.js

// --- 1. IMPORTAÇÕES DOS MÓDULOS ---
import { auth, db, setPersistence, browserLocalPersistence } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { collection, query, where, onSnapshot, doc, getDoc, updateDoc, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js"; 
import { state, setGlobalState } from './state.js';
import { initializeModalClosers, showNotification, openCancellationHistoryModal } from './components/modal.js';
import { initializeNavigation } from './ui/navigation.js';
import { getEstablishmentDetails } from './api/establishments.js';
import { getProfessionals } from './api/professionals.js'; 

// --- IMPORTAÇÃO DO ONBOARDING (GAMIFICAÇÃO) ---
import { checkAndStartOnboarding } from './ui/onboarding.js';

// --- IMPORTAÇÃO DAS NOTIFICAÇÕES ---
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core'; 
// FIX: Importação das notificações Web (PWA) com alias para não confundir com a nativa
import { initPushNotifications as initWebPush } from './ui/push-notifications.js';

import { getAnalytics, getSalesReport, getMonthlyAnalytics, getDailyTransactions, getProfessionalMonthlyDetails, getCommissionReport, getSummaryKPIs } from './api/reports.js';

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

// --- 2. REFERÊNCIAS AO DOM E CONSTANTES ---
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
const cancellationHistoryBtn = document.getElementById('cancellationHistoryBtn');
const myProfileLink = document.getElementById('myProfileLink'); 

// --- PALETA DE CORES EXPANDIDA ---
const colorThemes = {
    indigo: { main: '#4f46e5', hover: '#4338ca', light: '#e0e7ff', text: '#ffffff' }, // Padrão
    blue:   { main: '#2563eb', hover: '#1d4ed8', light: '#dbeafe', text: '#ffffff' },
    sky:    { main: '#0284c7', hover: '#0369a1', light: '#e0f2fe', text: '#ffffff' },
    teal:   { main: '#0d9488', hover: '#0f766e', light: '#ccfbf1', text: '#ffffff' },
    emerald:{ main: '#059669', hover: '#047857', light: '#d1fae5', text: '#ffffff' }, // Verde Escuro
    green:  { main: '#16a34a', hover: '#15803d', light: '#dcfce7', text: '#ffffff' },
    lime:   { main: '#65a30d', hover: '#4d7c0f', light: '#ecfccb', text: '#ffffff' },
    amber:  { main: '#d97706', hover: '#b45309', light: '#fef3c7', text: '#1f2937' },
    orange: { main: '#ea580c', hover: '#c2410c', light: '#ffedd5', text: '#ffffff' },
    red:    { main: '#dc2626', hover: '#b91c1c', light: '#fee2e2', text: '#ffffff' },
    rose:   { main: '#e11d48', hover: '#be123c', light: '#ffe4e6', text: '#ffffff' },
    pink:   { main: '#db2777', hover: '#be185d', light: '#fce7f3', text: '#ffffff' },
    fuchsia:{ main: '#c026d3', hover: '#a21caf', light: '#fae8ff', text: '#ffffff' },
    purple: { main: '#7c3aed', hover: '#6d28d9', light: '#ede9fe', text: '#ffffff' },
    violet: { main: '#8b5cf6', hover: '#7c3aed', light: '#ddd6fe', text: '#ffffff' },
    gray:   { main: '#4b5563', hover: '#374151', light: '#f3f4f6', text: '#ffffff' },
    black:  { main: '#111827', hover: '#000000', light: '#e5e7eb', text: '#ffffff' },
};

let unsubscribeNotificationsListener = null;
let notifications = [];

// --- 3. MAPEAMENTO DE ROTAS ---
const pageLoader = {
    'agenda-section': loadAgendaPage,
    'comandas-section': loadComandasPage,
    'relatorios-section': loadReportsPage,
    'servicos-section': loadServicesPage,
    'produtos-section': loadProductsPage,
    'suppliers-section': loadSuppliersPage,
    'profissionais-section': loadProfessionalsPage,
    'clientes-section': loadClientsPage,
    'estabelecimento-section': loadEstablishmentPage,
    'ausencias-section': loadAusenciasPage,
    'users-section': loadUsersPage,
    'sales-report-section': loadSalesReportPage,
    'financial-section': loadFinancialPage,
    'commissions-section': loadCommissionsPage,
    'packages-section': loadPackagesPage,
    'my-profile-section': loadMyProfilePage,
};

// --- 4. FUNÇÕES DE TEMA E NOTIFICAÇÕES ---

function applyTheme(themeKey) {
    const theme = colorThemes[themeKey] || colorThemes.indigo;
    
    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '79, 70, 229';
    };
    
    const mainRgb = hexToRgb(theme.main);
    
    document.body.style.setProperty('--theme-main', theme.main);

    const styleSheet = document.getElementById('dynamic-theme-styles');
    
    styleSheet.innerHTML = `
        :root {
            --theme-color-main: ${theme.main};
            --theme-color-hover: ${theme.hover};
            --theme-color-light: ${theme.light};
            --theme-rgb: ${mainRgb};
        }

        /* 1. Sidebar Links Ativos */
        .sidebar-link.active { 
            background-color: var(--theme-color-main) !important; 
            color: ${theme.text} !important; 
        }
        .sidebar-link:not(.active):hover { 
            background-color: rgba(var(--theme-rgb), 0.1) !important;
            color: var(--theme-color-main) !important;
        }

        /* 2. Sobrescrevendo Botões e Textos 'Indigo' Padrão do Tailwind */
        .bg-indigo-600 { background-color: var(--theme-color-main) !important; }
        .hover\\:bg-indigo-700:hover { background-color: var(--theme-color-hover) !important; }
        .hover\\:bg-indigo-50:hover { background-color: rgba(var(--theme-rgb), 0.1) !important; }
        
        .text-indigo-600 { color: var(--theme-color-main) !important; }
        .hover\\:text-indigo-800:hover { color: var(--theme-color-hover) !important; }
        .hover\\:text-indigo-600:hover { color: var(--theme-color-main) !important; }

        .border-indigo-600 { border-color: var(--theme-color-main) !important; }
        .focus\\:ring-indigo-500:focus { --tw-ring-color: rgba(var(--theme-rgb), 0.5) !important; }
        
        /* 3. Elementos Específicos do Sistema */
        .loading-bar-fill { background-color: var(--theme-color-main) !important; }
        .time-slot-card.selected { background-color: var(--theme-color-main) !important; border-color: var(--theme-color-main) !important; }
        
        /* Checkboxes e Toggles */
        input:checked + .toggle-bg { background-color: var(--theme-color-main) !important; }
        
        /* Badges e Tags */
        .bg-indigo-100 { background-color: var(--theme-color-light) !important; }
        .text-indigo-800 { color: var(--theme-color-hover) !important; }
    `;
}

function renderNotificationPanel() {
    const unreadCount = notifications.filter(n => !n.read).length;

    if (unreadCount > 0) {
        notificationBadge.textContent = unreadCount;
        notificationBadge.classList.remove('hidden');
    } else {
        notificationBadge.classList.add('hidden');
    }

    if (notifications.length === 0) {
        notificationList.innerHTML = '<p class="text-center text-gray-500 p-4">Nenhuma notificação.</p>';
        return;
    }

    notificationList.innerHTML = notifications.map(n => `
    <div class="notification-item ${n.read ? '' : 'unread'}">
    <p class="font-semibold">${n.title}</p>
    <p class="text-sm text-gray-600">${n.message}</p>
    <p class="text-xs text-gray-400 mt-1">${n.time}</p>
    </div>
    `).join('');
}

function setupRealtimeListeners(establishmentId) {
    if (unsubscribeNotificationsListener) {
        unsubscribeNotificationsListener();
    }
    
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
                    if (notification.type === 'cancellation' || notification.type === 'new_appointment') {
                        console.log('Atualizando agenda em tempo real...');
                        loadAgendaPage();
                    }
                }
            }
        });
    }, (error) => {
        console.error("Erro no listener de notificações em tempo real:", error);
        showNotification("Erro de Conexão", "Não foi possível receber atualizações em tempo real. Verifique as regras de segurança do Firestore.", "error");
    });
}


// --- 5. FUNÇÃO DE NAVEGAÇÃO PRINCIPAL ---
export function navigateTo(sectionId, params = {}) {
    const moduleKey = sectionId.replace('-section', '');

    if (sectionId === 'my-profile-section') {
         // Apenas carrega a página
    } else {
        const isModuleEnabled = state.enabledModules?.[moduleKey] !== false;
        const hasEmployeePermission = state.userPermissions === null || state.userPermissions[sectionId]?.view === true;
        
        if (!isModuleEnabled || !hasEmployeePermission) {
            contentDiv.innerHTML = `<div class="p-8 text-center"><h2 class="text-2xl font-bold text-red-600">Acesso Negado</h2><p class="text-gray-600">Você não tem permissão para visualizar este módulo.</p></div>`;
            document.querySelectorAll('.sidebar-link').forEach(link => link.classList.remove('active'));
            return;
        }
    }
    
    const loadPage = pageLoader[sectionId];
    if (loadPage) {
        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-target') === sectionId);
        });
        if (sectionId === 'my-profile-section') {
            document.querySelectorAll('.sidebar-link').forEach(link => link.classList.remove('active'));
        }
        
        contentDiv.innerHTML = '';
        loadPage(params);
    } else {
        contentDiv.innerHTML = `<div class="p-8 text-center"><h2 class="text-2xl font-bold">Página em Construção</h2><p class="text-gray-600">O módulo para "${sectionId}" ainda não foi implementado.</p></div>`;
        console.warn(`Nenhum carregador de página definido para: ${sectionId}`);
    }
}

// --- FUNÇÃO DE KPIs DO HEADER ---
async function loadHeaderKPIs(userPermissions) {
    const kpiAppointmentsWrapper = document.getElementById('kpi-appointments-wrapper');
    const kpiFinancialWrapper = document.getElementById('kpi-financial-wrapper');
    const kpiAppointmentsEl = document.getElementById('kpi-today-appointments');
    const kpiRevenueEl = document.getElementById('kpi-today-revenue');

    const canViewAgenda = userPermissions === null || userPermissions['agenda-section']?.view === true;
    const canViewFinancial = userPermissions === null || userPermissions['financial-section']?.view === true;

    if (canViewAgenda && kpiAppointmentsWrapper) {
        kpiAppointmentsWrapper.classList.remove('hidden');
    }
    if (canViewFinancial && kpiFinancialWrapper) {
        kpiFinancialWrapper.classList.remove('hidden');
    }

    if (!canViewAgenda && !canViewFinancial) {
        return;
    }

    try {
        const kpis = await getSummaryKPIs();
        
        if (canViewAgenda && kpiAppointmentsEl) {
            kpiAppointmentsEl.textContent = kpis.todayAppointments.toString();
        }
        if (canViewFinancial && kpiRevenueEl) {
            kpiRevenueEl.textContent = `R$ ${kpis.todayRevenue.toFixed(2).replace('.', ',')}`;
        }
        
    } catch (error) {
        console.error("Erro ao carregar KPIs do cabeçalho:", error);
        if (canViewAgenda && kpiAppointmentsEl) kpiAppointmentsEl.textContent = "Erro";
        if (canViewFinancial && kpiRevenueEl) kpiRevenueEl.textContent = "Erro";
    }
}

// ####################################################################
// ### INÍCIO DA FUNÇÃO DE PUSH NOTIFICATIONS (NATIVO) ###
// ####################################################################

async function initializePushNotifications(userUid) {
    try {
        if (Capacitor.getPlatform() === 'android') {
            await PushNotifications.createChannel({
                id: 'default', 
                name: 'Notificações Gerais',
                description: 'Alertas de agendamentos e avisos',
                importance: 5, 
                visibility: 1, 
                vibration: true
            });
            console.log('Canal de notificação Android criado com sucesso.');
        }

        let permStatus = await PushNotifications.checkPermissions();

        if (permStatus.receive === 'prompt') {
            permStatus = await PushNotifications.requestPermissions();
        }

        if (permStatus.receive !== 'granted') {
            console.warn('Permissão de notificação push foi negada pelo utilizador.');
            return;
        }

        await PushNotifications.register();

        PushNotifications.addListener('registration', async (token) => {
            console.log('Push Token gerado:', token.value);
            try {
                const userRef = doc(db, 'users', userUid);
                await updateDoc(userRef, {
                    fcmToken: token.value
                });
                console.log('Token FCM salvo no perfil do utilizador.');
            } catch (error) {
                console.error("Erro ao salvar token FCM:", error);
            }
        });

        PushNotifications.addListener('registrationError', (error) => {
             console.error('Erro no registo de push notifications:', error);
        });

        PushNotifications.addListener('pushNotificationReceived', (notification) => {
            console.log('Notificação Push recebida:', notification);
            showNotification(notification.title, notification.body, 'info', true);
        });

        PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
            console.log('Ação na notificação push:', notification);
            navigateTo('agenda-section');
        });

    } catch (e) {
        console.log('Push Notifications não suportado/inicializado:', e);
    }
}

// --- 6. INICIALIZAÇÃO DA APLICAÇÃO ---
async function initialize() {
    
    // --- FIX: DEFINIR PERSISTÊNCIA LOCAL IMEDIATAMENTE (PWA) ---
    // Isso garante que o navegador tente recuperar a sessão antes de qualquer outra coisa
    try {
        await setPersistence(auth, browserLocalPersistence);
        console.log("Persistência LOCAL configurada na inicialização.");
    } catch (e) {
        console.error("Erro ao definir persistência no main.js", e);
    }

    if (Capacitor.isNativePlatform()) {
        document.body.classList.add('is-app-native');
        console.log('Modo App Nativo detectado: Layout ajustado para Safe Areas.');
    }
    
    initializeModalClosers();

    notificationBell.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationPanel.classList.toggle('hidden');
        if (!notificationPanel.classList.contains('hidden')) {
            notifications.forEach(n => n.read = true);
            renderNotificationPanel();
        }
    });

    cancellationHistoryBtn.addEventListener('click', () => {
        openCancellationHistoryModal();
    });

    profileMenuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle('active');
        if (profileDropdown.classList.contains('active')) {
            profileDropdown.classList.remove('hidden');
        } else {
            setTimeout(() => profileDropdown.classList.add('hidden'), 200);
        }
    });
    
    if (myProfileLink) {
        myProfileLink.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('my-profile-section');
            profileDropdown.classList.remove('active');
            profileDropdown.classList.add('hidden');
        });
    }

    document.addEventListener('click', (e) => {
        if (!notificationPanel.contains(e.target) && e.target !== notificationBell) {
            notificationPanel.classList.add('hidden');
        }
        if (!profileDropdown.contains(e.target) && e.target !== profileMenuButton) {
            if (profileDropdown.classList.contains('active')) {
                 profileDropdown.classList.remove('active');
                 setTimeout(() => profileDropdown.classList.add('hidden'), 200);
            }
        }
    });

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log("Usuário detectado:", user.email);

            // --- FIX: INICIALIZA NOTIFICAÇÕES WEB PUSH (PWA) ---
            // Se estiver no navegador/PWA (não nativo), inicia o push e renova o token se necessário
            if (!Capacitor.isNativePlatform()) {
                console.log("Inicializando Web Push (PWA)...");
                initWebPush(); 
            }

            try {
                const idTokenResult = await user.getIdTokenResult(true);
                const claims = idTokenResult.claims;
                if ((claims.role === 'owner' || claims.role === 'employee') && claims.establishmentId) {
                    
                    const establishmentDetails = await getEstablishmentDetails(claims.establishmentId);
                    state.enabledModules = establishmentDetails.modules;
                    
                    // APLICA O TEMA DEFINIDO NO BANCO DE DADOS
                    applyTheme(establishmentDetails.themeColor || 'indigo');

                    let userPermissions = null;
                    let userName = user.displayName; 
                    
                    let userProfessionalId = null; 

                    if (claims.role === 'employee' || claims.role === 'owner') {
                        const userDocRef = doc(db, 'users', user.uid);
                        const userDoc = await getDoc(userDocRef);
                        
                        if (userDoc.exists()) {
                            const userData = userDoc.data();
                            userPermissions = (claims.role === 'employee') ? (userData.permissions || {}) : null;
                            userName = userData.name || userName;
                            userProfessionalId = userData.professionalId || null; 
                        } else if (claims.role === 'employee') {
                            throw new Error("Dados de permissão do funcionário não encontrados.");
                        }
                    }
                    
                    state.userProfessionalId = userProfessionalId; 
                    
                    // Inicializa notificações nativas apenas se estiver no ambiente nativo (Android/iOS via Loja)
                    if (Capacitor.isNativePlatform()) {
                        initializePushNotifications(user.uid);
                    }
                    
                    const finalUserName = userName || user.email;
                    
                    setGlobalState(claims.establishmentId, establishmentDetails.name, userPermissions);

                    profileMenuButton.textContent = finalUserName.charAt(0).toUpperCase();
                    profileName.textContent = finalUserName;
                    profileEmail.textContent = user.email;

                    const handleLogout = () => {
                        if (unsubscribeNotificationsListener) unsubscribeNotificationsListener();
                        signOut(auth).then(() => window.location.href = '/login.html');
                    };

                    logoutButton.addEventListener('click', (e) => {
                        e.preventDefault();
                        handleLogout();
                    });

                    initializeNavigation(navigateTo, userPermissions, state.enabledModules);
                    loadHeaderKPIs(userPermissions); 

                    setupRealtimeListeners(claims.establishmentId);
                    renderNotificationPanel();
                    
                    // Animação de saída do loading
                    loadingScreen.classList.add('fade-out');
                    dashboardContent.style.display = 'flex';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);

                    // --- INÍCIO DA VERIFICAÇÃO DE ONBOARDING (GAMIFICAÇÃO) ---
                    console.log("Verificando Onboarding...");
                    setTimeout(() => {
                        checkAndStartOnboarding();
                    }, 1500); // Delay para garantir carregamento da UI
                    // --------------------------------------------------------

                    navigateTo('agenda-section');
                } else {
                    throw new Error("Utilizador não tem permissão de 'owner' ou 'employee' ou 'establishmentId'.");
                }
            } catch (error) {
                console.error("Erro crítico na inicialização do painel:", error);
                
                loadingScreen.classList.add('fade-out');
                setTimeout(() => { loadingScreen.style.display = 'none'; }, 500);

                dashboardContent.innerHTML = `
                    <div class="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-4">
                        <h2 class="text-2xl font-bold text-red-600 mb-4">Erro de Acesso</h2>
                        <p class="text-gray-700 text-center mb-6">Não foi possível carregar os seus dados ou permissões. Isto pode acontecer se a sua conta foi desativada ou está configurada incorretamente.</p>
                        <p class="text-sm text-gray-500 mb-6">Detalhe do erro: ${error.message}</p>
                        <button id="errorLogoutButton" class="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700">Sair e Tentar Novamente</button>
                    </div>
                `;
                dashboardContent.style.display = 'flex'; 
                document.getElementById('errorLogoutButton').addEventListener('click', () => {
                      signOut(auth).then(() => window.location.href = '/login.html');
                });
            }
        } else {
            window.location.href = '/login.html';
        }
    });
}

initialize();