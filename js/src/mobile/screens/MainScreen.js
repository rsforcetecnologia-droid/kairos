import { useState } from 'react';
import { AgendaScreen } from './AgendaScreen.js';
import { ComandasScreen } from './ComandasScreen.js';
import { RelatoriosScreen } from './RelatoriosScreen.js';
import { GestaoScreen } from './GestaoScreen.js';
import { ServicosScreen } from './ServicosScreen.js';
import { ProdutosScreen } from './ProdutosScreen.js';
import { icons } from '../utils/icons.js';

export const MainScreen = ({ user, onLogout, showNotification }) => {
    const [activeTab, setActiveTab] = useState('Agenda');
    const [currentManagementScreen, setCurrentManagementScreen] = useState('menu');

    const tabs = [
        { name: 'Agenda', icon: 'agenda' },
        { name: 'Comandas', icon: 'comandas' },
        { name: 'Relatórios', icon: 'relatorios' },
        { name: 'Gestão', icon: 'gestao' },
    ];

    const handleManagementNavigation = (screen) => {
        setCurrentManagementScreen(screen);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'Agenda':
                return <AgendaScreen user={user} showNotification={showNotification} />;
            case 'Comandas':
                return <ComandasScreen user={user} showNotification={showNotification} />;
            case 'Relatorios':
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
