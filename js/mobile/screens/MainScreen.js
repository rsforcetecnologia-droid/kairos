// js/mobile/screens/MainScreen.js

const { React } = window;
const { useState, useEffect } = React;

// ✅ CORREÇÃO: Caminhos de importação agora são absolutos a partir da raiz do site
import { icons } from '/js/mobile/utils/icons.js';
import AgendaScreen from '/js/mobile/screens/AgendaScreen.js';
import ComandasScreen from '/js/mobile/screens/ComandasScreen.js';
import RelatoriosScreen from '/js/mobile/screens/RelatoriosScreen.js';
import GestaoScreen from '/js/mobile/screens/GestaoScreen.js';
import ServicosScreen from '/js/mobile/screens/ServicosScreen.js';
import ProdutosScreen from '/js/mobile/screens/ProdutosScreen.js';

const MainScreen = ({ user, onLogout, showNotification, appData, isLoading, error, refreshData }) => {
    // Estado para controlar qual aba está ativa
    const [activeTab, setActiveTab] = useState('Agenda');
    // Estado para controlar a navegação dentro do ecrã de "Gestão"
    const [currentManagementScreen, setCurrentManagementScreen] = useState('menu');
    // Estado para passar o ID de uma comanda da agenda para o ecrã de comandas
    const [selectedComandaIdFromAgenda, setSelectedComandaIdFromAgenda] = useState(null);

    // Efeito para recarregar os dados quando o utilizador muda de aba
    useEffect(() => {
        if (activeTab === 'Agenda' || activeTab === 'Comandas') {
            refreshData();
        }
    }, [activeTab, refreshData]);

    // Função para navegar da Agenda para uma Comanda específica
    const handleNavigateToComanda = (appointmentId) => {
        setSelectedComandaIdFromAgenda(appointmentId);
        setActiveTab('Comandas');
    };
    
    // Função para limpar o ID da comanda após a navegação ter sido concluída
    const handleComandaOpened = () => {
        setSelectedComandaIdFromAgenda(null);
    };

    const tabs = [
        { name: 'Agenda', icon: 'agenda' },
        { name: 'Comandas', icon: 'comandas' },
        { name: 'Relatórios', icon: 'relatorios' },
        { name: 'Gestão', icon: 'gestao' },
    ];

    // Função para navegar entre os ecrãs dentro da aba "Gestão"
    const handleManagementNavigation = (screen) => {
        setCurrentManagementScreen(screen);
    };

    // Função que decide qual componente de ecrã renderizar com base na aba ativa
    const renderContent = () => {
        switch (activeTab) {
            case 'Agenda':
                return <AgendaScreen user={user} showNotification={showNotification} onNavigateToComanda={handleNavigateToComanda} />;
            case 'Comandas':
                return <ComandasScreen user={user} showNotification={showNotification} comandas={appData.comandas} isLoading={isLoading} error={error} refreshData={refreshData} selectedComandaId={selectedComandaIdFromAgenda} onComandaOpened={handleComandaOpened} />;
            case 'Relatórios':
                return <RelatoriosScreen user={user} showNotification={showNotification} />;
            case 'Gestão':
                switch (currentManagementScreen) {
                    case 'menu':
                        return <GestaoScreen user={user} onLogout={onLogout} onNavigate={handleManagementNavigation} />;
                    case 'Servicos':
                        return <ServicosScreen user={user} showNotification={showNotification} onBack={() => setCurrentManagementScreen('menu')} />;
                    case 'Produtos':
                        return <ProdutosScreen user={user} showNotification={showNotification} onBack={() => setCurrentManagementScreen('menu')} />;
                    default:
                        return <GestaoScreen user={user} onLogout={onLogout} onNavigate={handleManagementNavigation} />;
                }
            default:
                return null;
        }
    };

    return (
        <div className="h-screen w-full flex flex-col bg-gray-100 font-sans">
            <header className="bg-white shadow-md p-4">
                <h1 className="text-xl font-bold text-gray-900 text-center">
                    {activeTab === 'Gestão' ? (currentManagementScreen === 'menu' ? 'Gestão' : currentManagementScreen) : activeTab}
                </h1>
            </header>
            <main className="flex-1 overflow-y-auto">{renderContent()}</main>
            <nav className="bg-white border-t border-gray-200">
                <div className="flex justify-around max-w-md mx-auto">
                    {tabs.map(tab => (
                        <button key={tab.name} onClick={() => { setActiveTab(tab.name); setCurrentManagementScreen('menu'); }} className="flex-1 flex flex-col items-center justify-center py-2 transition-colors">
                            {icons[tab.icon](activeTab === tab.name ? '#3B82F6' : '#6B7280')}
                            <span className={`text-xs mt-1 ${activeTab === tab.name ? 'text-blue-600 font-bold' : 'text-gray-500'}`}>{tab.name}</span>
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default MainScreen;