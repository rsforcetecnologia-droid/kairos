// js/main.js

// --- 1. IMPORTAÇÕES DOS MÓDULOS ---
import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { collection, query, where, onSnapshot, doc, getDoc, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js"; // Adicionado getDocs
import { state, setGlobalState } from './state.js';
import { initializeModalClosers, showNotification, openCancellationHistoryModal } from './components/modal.js';
import { initializeNavigation } from './ui/navigation.js';
import { getEstablishmentDetails } from './api/establishments.js';
import { getProfessionals } from './api/professionals.js'; // Importa a API de profissionais

// (MODIFICADO) Importa a nova função da API de relatórios, juntamente com as existentes
import { getAnalytics, getSalesReport, getMonthlyAnalytics, getDailyTransactions, getProfessionalMonthlyDetails, getCommissionReport, getSummaryKPIs } from './api/reports.js';

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
import { loadCommissionsPage } from './ui/commissions.js';
import { loadPackagesPage } from './ui/packages.js'; 
import { loadMyProfilePage } from './ui/my-profile.js'; // <-- 1. IMPORTADO O NOVO MÓDULO

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
const myProfileLink = document.getElementById('myProfileLink'); // <-- 3. REFERÊNCIA AO NOVO LINK

const colorThemes = {
    indigo: { main: '#4f46e5', light: '#e0e7ff', text: 'white', hover: '#4338ca' },
    rose: { main: '#e11d48', light: '#ffe4e6', text: 'white', hover: '#be123c' },
    green: { main: '#16a34a', light: '#d1fae5', text: 'white', hover: '#15803d' },
    sky: { main: '#0284c7', light: '#e0f2fe', text: 'white', hover: '#0369a1' },
    amber: { main: '#d97706', light: '#fef3c7', text: '#1f2937', hover: '#b45309' },
};

let unsubscribeNotificationsListener = null;
let notifications = [];

// --- 3. MAPEAMENTO DE ROTAS (ATUALIZADO) ---
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
    'commissions-section': loadCommissionsPage,
    'packages-section': loadPackagesPage,
    'my-profile-section': loadMyProfilePage, // <-- 2. ADICIONADO AO PAGE LOADER
};

// --- 4. FUNÇÕES DE TEMA E NOTIFICAÇÕES ---

function applyTheme(themeKey) {
    const theme = colorThemes[themeKey] || colorThemes.indigo;
    const styleSheet = document.getElementById('dynamic-theme-styles');
    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
    };
    const mainRgb = hexToRgb(theme.main);
    const activeLinkTextColor = (themeKey === 'amber') ? '#1f2937' : 'white';
    styleSheet.innerHTML = `
        .sidebar-link.active { 
            background-color: ${theme.main}; 
            color: ${activeLinkTextColor}; 
        }
        .sidebar-link:not(.active):hover { 
            background-color: rgba(${mainRgb}, 0.2);
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

    // O 'my-profile' não está nos módulos de permissão, então damos acesso direto
    if (sectionId === 'my-profile-section') {
         // Apenas carrega a página
    } else {
        // Lógica de permissão padrão
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
        // Se for o 'Meu Perfil', remove o 'active' de todos os links da sidebar
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

// ####################################################################
// ### INÍCIO DA NOVA FUNÇÃO (CARREGAR KPIs DO HEADER) ###
// ####################################################################

/**
 * Busca e exibe os KPIs no cabeçalho superior, respeitando as permissões do usuário.
 * @param {object | null} userPermissions - O objeto de permissões do usuário.
 */
async function loadHeaderKPIs(userPermissions) {
    // Referências aos elementos do HEADER (e não mais da sidebar)
    const kpiAppointmentsWrapper = document.getElementById('kpi-appointments-wrapper');
    const kpiFinancialWrapper = document.getElementById('kpi-financial-wrapper');
    const kpiAppointmentsEl = document.getElementById('kpi-today-appointments');
    const kpiRevenueEl = document.getElementById('kpi-today-revenue');

    // 1. Verificar Permissões
    // Se for 'owner' (null), tem acesso a tudo.
    // Usamos a mesma lógica do 'navigation.js'
    const canViewAgenda = userPermissions === null || userPermissions['agenda-section']?.view === true;
    const canViewFinancial = userPermissions === null || userPermissions['financial-section']?.view === true;

    // 2. Controlar visibilidade dos wrappers
    // Se o elemento não existir (ex: erro de digitação no ID), não faz nada
    if (canViewAgenda && kpiAppointmentsWrapper) {
        kpiAppointmentsWrapper.classList.remove('hidden');
    }
    if (canViewFinancial && kpiFinancialWrapper) {
        kpiFinancialWrapper.classList.remove('hidden');
    }

    // 3. Se não tiver permissão para ver nenhum, não faz a chamada à API
    if (!canViewAgenda && !canViewFinancial) {
        return;
    }

    // 4. Buscar os dados da API
    try {
        const kpis = await getSummaryKPIs();
        
        // 5. Exibir os dados (apenas se tiver permissão E o elemento existir)
        if (canViewAgenda && kpiAppointmentsEl) {
            kpiAppointmentsEl.textContent = kpis.todayAppointments.toString();
        }
        if (canViewFinancial && kpiRevenueEl) {
            // Formata o valor para R$
            kpiRevenueEl.textContent = `R$ ${kpis.todayRevenue.toFixed(2).replace('.', ',')}`;
        }
        
    } catch (error) {
        console.error("Erro ao carregar KPIs do cabeçalho:", error);
        if (canViewAgenda && kpiAppointmentsEl) kpiAppointmentsEl.textContent = "Erro";
        if (canViewFinancial && kpiRevenueEl) kpiRevenueEl.textContent = "Erro";
    }
}
// ####################################################################
// ### FIM DA NOVA FUNÇÃO ###
// ####################################################################


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
    
    // --- 3. ADICIONADO LISTENER DO NOVO LINK ---
    if (myProfileLink) {
        myProfileLink.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('my-profile-section');
            // Fecha o dropdown
            profileDropdown.classList.remove('active');
            profileDropdown.classList.add('hidden');
        });
    }
    // --- FIM DA ADIÇÃO ---

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
                    
                    // ####################################################################
                    // ### INÍCIO DA CORREÇÃO (ASSOCIAR DONO/FUNCIONÁRIO) ###
                    // ####################################################################
                    
                    let userProfessionalId = null; 

                    // Unifica a lógica: Tanto 'owner' quanto 'employee' devem ter um documento na coleção 'users'.
                    // Esse documento é a fonte da verdade para o professionalId.
                    if (claims.role === 'employee' || claims.role === 'owner') {
                        const userDocRef = doc(db, 'users', user.uid);
                        const userDoc = await getDoc(userDocRef);
                        
                        if (userDoc.exists()) {
                            const userData = userDoc.data();
                            // Define as permissões (funcionário) ou mantém null (dono)
                            userPermissions = (claims.role === 'employee') ? (userData.permissions || {}) : null;
                            userName = userData.name || userName;
                            userProfessionalId = userData.professionalId || null; // <-- Pega o ID associado
                        } else if (claims.role === 'employee') {
                            // Se for um funcionário e o documento não existir, é um erro.
                            throw new Error("Dados de permissão do funcionário não encontrados.");
                        }
                        // Se for um 'owner' e o documento não existir (caso antigo),
                        // userPermissions continua null e userProfessionalId tbm.
                    }
                    
                    state.userProfessionalId = userProfessionalId; // <-- ARMAZENA NO STATE
                    
                    // ####################################################################
                    // ### FIM DA CORREÇÃO ###
                    // ####################################################################

                    const finalUserName = userName || user.email;
                    
                    // Define o estado global (com a correção do state.js aplicada)
                    setGlobalState(claims.establishmentId, establishmentDetails.name, userPermissions);

                    // Preenche o perfil do usuário
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

                    // Inicializa a navegação (que agora esconde os links)
                    initializeNavigation(navigateTo, userPermissions, state.enabledModules);
                    
                    // ####################################################################
                    // ### (MODIFICADO) Chama a função de carregar KPIs do HEADER ###
                    // ####################################################################
                    loadHeaderKPIs(userPermissions); // Passa as permissões

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
                     signOut(auth).then(() => window.location.href = '/login.html');
                });
            }
        } else {
            window.location.href = '/login.html';
        }
    });
}

initialize();