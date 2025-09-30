// --- 1. IMPORTAÇÕES DOS MÓDULOS ---
import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { collection, query, where, onSnapshot, doc, getDoc, orderBy } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { state, setGlobalState } from './state.js';
import { initializeModalClosers, showNotification, openCancellationHistoryModal } from './components/modal.js';
import { initializeNavigation } from './ui/navigation.js';
import { getEstablishmentDetails } from './api/establishments.js';

// Importa as funções que carregam cada página da aplicação
import { loadAgendaPage } from './ui/agenda.js';
import { loadComandasPage } from './ui/comandas.js';
import { loadReportsPage } from './ui/reports.js';
import { loadServicesPage } from './ui/services.js';
import { loadProductsPage } from './ui/products.js';
import { loadProfessionalsPage } from './ui/professionals.js';
import { loadClientsPage } from './ui/clients.js';
import { loadEstablishmentPage } from './ui/establishment.js';
import { loadAusenciasPage } from './ui/ausencias.js';
import { loadUsersPage } from './ui/users.js';
import { loadSalesReportPage } from './ui/salesReport.js';
import { loadFinancialPage } from './ui/financial.js';
import { loadCommissionsPage } from './ui/commissions.js'; // NOVO

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

const colorThemes = {
    indigo: { main: '#4f46e5', light: '#e0e7ff', text: 'white', hover: '#4338ca' },
    rose: { main: '#e11d48', light: '#ffe4e6', text: 'white', hover: '#be123c' },
    green: { main: '#16a34a', light: '#d1fae5', text: 'white', hover: '#15803d' },
    sky: { main: '#0284c7', light: '#e0f2fe', text: 'white', hover: '#0369a1' },
    amber: { main: '#d97706', light: '#fef3c7', text: '#1f2937', hover: '#b45309' },
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
    'profissionais-section': loadProfessionalsPage,
    'clientes-section': loadClientsPage,
    'estabelecimento-section': loadEstablishmentPage,
    'ausencias-section': loadAusenciasPage,
    'users-section': loadUsersPage,
    'sales-report-section': loadSalesReportPage,
    'financial-section': loadFinancialPage,
    'commissions-section': loadCommissionsPage, // NOVO
};

// --- 4. FUNÇÕES DE TEMA E NOTIFICAÇÕES ---

// ### FUNÇÃO ATUALIZADA E CORRIGIDA ###
function applyTheme(themeKey) {
    const theme = colorThemes[themeKey] || colorThemes.indigo;
    const styleSheet = document.getElementById('dynamic-theme-styles');
    
    // Converte a cor principal para RGBA para usar com transparência
    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
    };

    const mainRgb = hexToRgb(theme.main);

    // Garante que a cor do texto no link ativo seja legível
    const activeLinkTextColor = (themeKey === 'amber') ? '#1f2937' : 'white';

    // Gera o novo CSS com um estilo mais subtil
    styleSheet.innerHTML = `
        .sidebar-link.active { 
            background-color: ${theme.main}; 
            color: ${activeLinkTextColor}; 
        }
        .sidebar-link:not(.active):hover { 
            background-color: rgba(${mainRgb}, 0.2); /* Cor principal com 20% de opacidade */
        }
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

                showNotification(notification.message, 'info', true);
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

    const isModuleEnabled = state.enabledModules?.[moduleKey] !== false;
    const hasEmployeePermission = state.userPermissions === null || state.userPermissions[sectionId]?.view === true;
    
    if (!isModuleEnabled || !hasEmployeePermission) {
        contentDiv.innerHTML = `<div class="p-8 text-center"><h2 class="text-2xl font-bold text-red-600">Acesso Negado</h2><p class="text-gray-600">Você não tem permissão para visualizar este módulo.</p></div>`;
        document.querySelectorAll('.sidebar-link').forEach(link => link.classList.remove('active'));
        return;
    }
    
    const loadPage = pageLoader[sectionId];
    if (loadPage) {
        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-target') === sectionId);
        });
        contentDiv.innerHTML = '';
        loadPage(params);
    } else {
        contentDiv.innerHTML = `<div class="p-8 text-center"><h2 class="text-2xl font-bold">Página em Construção</h2><p class="text-gray-600">O módulo para "${sectionId}" ainda não foi implementado.</p></div>`;
        console.warn(`Nenhum carregador de página definido para: ${sectionId}`);
    }
}

// --- 6. INICIALIZAÇÃO DA APLICAÇÃO ---
function initialize() {
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
            try {
                const idTokenResult = await user.getIdTokenResult(true);
                const claims = idTokenResult.claims;
                if ((claims.role === 'owner' || claims.role === 'employee') && claims.establishmentId) {
                    
                    const establishmentDetails = await getEstablishmentDetails(claims.establishmentId);
                    state.enabledModules = establishmentDetails.modules;
                    
                    applyTheme(establishmentDetails.themeColor);

                    let userPermissions = null;
                    let userName = user.displayName; 

                    if (claims.role === 'employee') {
                        const userDocRef = doc(db, 'users', user.uid);
                        const userDoc = await getDoc(userDocRef);
                        if (userDoc.exists()) {
                            const userData = userDoc.data();
                            userPermissions = userData.permissions;
                            userName = userData.name;
                        } else {
                            throw new Error("Dados de permissão do funcionário não encontrados.");
                        }
                    }
                    
                    const finalUserName = userName || user.email;
                    setGlobalState(claims.establishmentId, finalUserName, userPermissions);

                    try {
                        const nameEl = document.getElementById('panelEstablishmentName');
                        const logoEl = document.getElementById('panelEstablishmentLogo');
                        const logoContainer = document.getElementById('panelLogoContainer');
                        nameEl.innerHTML = `<span class="truncate">${establishmentDetails.name || finalUserName || 'Meu Painel'}</span>`;
                        if (establishmentDetails.logo) {
                            logoContainer.classList.remove('bg-gray-700', 'animate-pulse');
                            logoEl.src = establishmentDetails.logo;
                            logoEl.classList.remove('opacity-0');
                        } else {
                            logoContainer.classList.remove('animate-pulse');
                        }
                    } catch (e) {
                          console.error("Não foi possível carregar detalhes do estabelecimento para o cabeçalho:", e);
                    }

                    profileMenuButton.textContent = finalUserName.charAt(0).toUpperCase();
                    profileName.textContent = finalUserName;
                    profileEmail.textContent = user.email;

                    const handleLogout = () => {
                        if (unsubscribeNotificationsListener) unsubscribeNotificationsListener();
                        signOut(auth).then(() => window.location.href = '/login');
                    };

                    logoutButton.addEventListener('click', (e) => {
                        e.preventDefault();
                        handleLogout();
                    });

                    initializeNavigation(navigateTo, userPermissions, state.enabledModules);
                    setupRealtimeListeners(claims.establishmentId);
                    renderNotificationPanel();
                    loadingScreen.style.display = 'none';
                    dashboardContent.style.display = 'flex';
                    navigateTo('agenda-section');
                } else {
                    throw new Error("Utilizador não tem permissão de 'owner' ou 'employee' ou 'establishmentId'.");
                }
            } catch (error) {
                console.error("Erro crítico na inicialização do painel:", error);
                loadingScreen.style.display = 'none';
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
                      signOut(auth).then(() => window.location.href = '/login');
                });
            }
        } else {
            window.location.href = '/login';
        }
    });
}

initialize();