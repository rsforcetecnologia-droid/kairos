// js/mobile/App.js

// Importa as bibliotecas React e os componentes que vamos criar a seguir
const { React } = window;
const { useState, useEffect, useCallback } = React;

// ✅ CORREÇÃO: Caminhos de importação agora são absolutos a partir da raiz do site
import { auth, onAuthStateChanged, signOut, db, collection, query, where, onSnapshot, orderBy, Timestamp } from '/js/mobile/services/firebase.js';
import { authenticatedFetch } from '/js/mobile/services/apiService.js';
import LoginScreen from '/js/mobile/screens/LoginScreen.js';
import MainScreen from '/js/mobile/screens/MainScreen.js';
import LoadingScreen from '/js/mobile/components/LoadingScreen.js';
import NotificationModal from '/js/mobile/components/NotificationModal.js';

// Este é o componente principal que envolve toda a aplicação
function App() {
    // Estado para guardar os dados do utilizador logado
    const [loggedInUser, setLoggedInUser] = useState(null);
    // Estado para controlar o ecrã de carregamento inicial
    const [isLoading, setIsLoading] = useState(true);
    // Estado para gerir o modal de notificações
    const [notification, setNotification] = useState({ isOpen: false, title: '', message: '' });

    // Estado para guardar os dados principais da aplicação (agendamentos, comandas, etc.)
    const [appData, setAppData] = useState({ appointments: [], comandas: [] });
    // Estado para controlar o carregamento dos dados da aplicação
    const [appIsLoading, setAppIsLoading] = useState(true);
    // Estado para guardar erros de busca de dados
    const [appError, setAppError] = useState(null);

    // Função para mostrar uma notificação (passada para outros componentes)
    const showNotification = useCallback((title, message) => {
        setNotification({ isOpen: true, title, message });
    }, []);

    // Função para buscar/atualizar os dados principais da aplicação
    const refreshData = useCallback(async (date = new Date()) => {
        if (!loggedInUser) return;
        setAppIsLoading(true);
        setAppError(null);
        try {
            // Para a agenda, buscamos os dados do dia selecionado
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);

            // Realiza as chamadas à API em paralelo para mais eficiência
            const [appointmentsData, comandasData] = await Promise.all([
                authenticatedFetch(`/api/appointments/${loggedInUser.establishmentId}?startDate=${startOfDay.toISOString()}&endDate=${endOfDay.toISOString()}`, {}, loggedInUser),
                authenticatedFetch(`/api/comandas/${loggedInUser.establishmentId}`, {}, loggedInUser)
            ]);
            setAppData({ appointments: appointmentsData, comandas: comandasData });
        } catch (err) {
            setAppError('Falha ao sincronizar dados com o servidor.');
            showNotification('Erro de Sincronização', err.message);
        } finally {
            setAppIsLoading(false);
        }
    }, [loggedInUser, showNotification]);

    // Efeito para buscar os dados assim que o utilizador faz login
    useEffect(() => {
        if (loggedInUser) {
            refreshData();
        }
    }, [loggedInUser, refreshData]);

    // Efeito para escutar notificações em tempo real do Firebase
    useEffect(() => {
        if (!loggedInUser) return;

        const notificationsRef = collection(db, 'establishments', loggedInUser.establishmentId, 'notifications');
        const q = query(notificationsRef, where("timestamp", ">=", Timestamp.now()), orderBy("timestamp", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    const notificationData = change.doc.data();
                    showNotification(notificationData.title, notificationData.message);
                    refreshData(); // Atualiza os dados da app ao receber uma notificação
                }
            });
        });

        // Limpa o listener quando o componente é desmontado
        return () => unsubscribe();
    }, [loggedInUser, refreshData, showNotification]);

    // Efeito principal que verifica o estado de autenticação do utilizador
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const idTokenResult = await user.getIdTokenResult(true);
                    const claims = idTokenResult.claims;
                    if ((claims.role === 'owner' || claims.role === 'employee') && claims.establishmentId) {
                        const userData = {
                            name: user.displayName, email: user.email, uid: user.uid,
                            token: idTokenResult.token, establishmentId: claims.establishmentId,
                            permissions: claims.permissions
                        };
                        setLoggedInUser(userData);
                    } else {
                        // Se o utilizador não tiver as permissões corretas, desloga-o
                        await signOut(auth);
                    }
                } catch (error) {
                    console.error("Erro de autenticação:", error);
                    await signOut(auth);
                }
            } else {
                setLoggedInUser(null);
            }
            setIsLoading(false);
        });
        // Limpa o listener de autenticação ao desmontar
        return () => unsubscribe();
    }, []);
    
    // Função de logout
    const handleLogout = useCallback(() => {
        signOut(auth);
        setLoggedInUser(null);
        setAppData({ appointments: [], comandas: [] }); // Limpa os dados ao sair
    }, []);

    // Renderização condicional:
    // 1. Mostra LoadingScreen enquanto verifica o login.
    // 2. Se houver um utilizador logado, mostra o MainScreen.
    // 3. Caso contrário, mostra o LoginScreen.
    return (
        <React.Fragment>
            {isLoading ? <LoadingScreen /> : loggedInUser ?
                <MainScreen 
                    user={loggedInUser} 
                    onLogout={handleLogout} 
                    showNotification={showNotification}
                    appData={appData}
                    isLoading={appIsLoading}
                    error={appError}
                    refreshData={refreshData}
                /> :
                <LoginScreen onLoginSuccess={setLoggedInUser} />
            }
            <NotificationModal
                isOpen={notification.isOpen}
                title={notification.title}
                message={notification.message}
                onClose={() => setNotification({ isOpen: false, title: '', message: '' })}
            />
        </React.Fragment>
    );
};

export default App;