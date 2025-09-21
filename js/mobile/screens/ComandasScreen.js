// js/mobile/screens/ComandasScreen.js

const { React } = window;
const { useState, useEffect } = React;
import { authenticatedFetch } from '../services/apiService.js';
import ComandaDetailModal from '../components/ComandaDetailModal.js';

const ComandasScreen = ({ user, showNotification, comandas, isLoading, error, refreshData, selectedComandaId, onComandaOpened }) => {
    // Estado para o filtro ativo ('atendimento', 'pagamento', 'finalizada')
    const [activeFilter, setActiveFilter] = useState('atendimento');
    // Estado para a comanda que está a ser visualizada no modal
    const [selectedComanda, setSelectedComanda] = useState(null);

    // Efeito para abrir uma comanda específica quando vindo da agenda
    useEffect(() => {
        if (selectedComandaId && comandas.length > 0) {
            const comandaToOpen = comandas.find(c => c.id === selectedComandaId);
            if (comandaToOpen) {
                setSelectedComanda(comandaToOpen);
                // Informa o componente pai que a navegação foi concluída
                onComandaOpened();
            }
        }
    }, [selectedComandaId, comandas, onComandaOpened]);

    // Função para ser chamada após uma atualização no modal (ex: finalizar pagamento)
    const handleUpdate = async () => {
        await refreshData();
        setSelectedComanda(null);
    };

    const statusMap = {
        atendimento: { label: 'Em Atendimento', statusValue: 'confirmed' },
        pagamento: { label: 'Aguardando Pagamento', statusValue: 'awaiting_payment' },
        finalizada: { label: 'Finalizadas', statusValue: 'completed' },
    };

    // Função para renderizar a lista de comandas
    const renderContent = () => {
        if (isLoading) return <div className="text-center py-10"><p className="text-gray-500">A carregar comandas...</p></div>;
        if (error) return <div className="text-center py-10"><p className="text-red-500">{error}</p></div>;

        const currentStatus = statusMap[activeFilter].statusValue;
        const filteredComandas = comandas.filter(c => c.status === currentStatus);

        if (filteredComandas.length === 0) return <div className="text-center py-10"><p className="text-gray-500">Nenhuma comanda encontrada para este filtro.</p></div>;

        return filteredComandas.map(comanda => {
            const total = [...(comanda.services || []), ...(comanda.comandaItems || [])].reduce((acc, item) => acc + (item.price || 0), 0);
            return (
                <div key={comanda.id} onClick={() => setSelectedComanda(comanda)} className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${activeFilter === 'atendimento' ? 'border-blue-500' : activeFilter === 'pagamento' ? 'border-yellow-500' : 'border-green-500'} cursor-pointer`}>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-bold text-gray-900">{comanda.clientName}</p>
                            <p className="text-sm text-gray-500">com {comanda.professionalName}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-lg text-gray-800">R$ {total.toFixed(2)}</p>
                            <p className="text-xs text-gray-500">{new Date(comanda.startTime).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</p>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="h-full flex flex-col">
            <div className="p-2 bg-white border-b border-gray-200">
                <div className="flex bg-gray-100 rounded-lg p-1">
                    {Object.keys(statusMap).map(key => (
                        <button key={key} onClick={() => setActiveFilter(key)} className={`flex-1 text-sm font-semibold py-2 rounded-md transition-colors ${activeFilter === key ? 'bg-white text-blue-600 shadow' : 'text-gray-600'}`}>
                            {statusMap[key].label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {renderContent()}
            </div>
            <ComandaDetailModal 
                comanda={selectedComanda} 
                isOpen={!!selectedComanda} 
                onClose={() => setSelectedComanda(null)} 
                onUpdate={handleUpdate} 
                user={user} 
                showNotification={showNotification} 
            />
        </div>
    );
};

export default ComandasScreen;