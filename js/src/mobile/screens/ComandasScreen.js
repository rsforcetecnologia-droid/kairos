import React, { useState, useEffect, useCallback } from 'react';
import { authenticatedFetch } from '../mobileApi.js';
import { ComandaDetailModal } from '../components/ComandaDetailModal.js';
import { ConfirmationModal } from '../components/ConfirmationModal.js';

export const ComandasScreen = ({ user, showNotification }) => {
    const [activeFilter, setActiveFilter] = useState('atendimento');
    const [allComandas, setAllComandas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedComanda, setSelectedComanda] = useState(null);
    const [confirmReopenState, setConfirmReopenState] = useState({ isOpen: false, comanda: null });
    
    const fetchComandas = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await authenticatedFetch(`/api/comandas/${user.establishmentId}`, {}, user);
            setAllComandas(data); // Assume data já é um array
        } catch (error) {
            showNotification('Erro', 'Não foi possível carregar as comandas.');
        } finally {
            setIsLoading(false);
        }
    }, [user, showNotification]);

    useEffect(() => { fetchComandas(); }, [fetchComandas]);
    
    const handleUpdateComanda = (updatedComanda) => {
        setAllComandas(prevComandas => {
            const index = prevComandas.findIndex(c => c.id === updatedComanda.id);
            if (index > -1) {
                const newComandas = [...prevComandas];
                newComandas[index] = { ...newComandas[index], ...updatedComanda };
                return newComandas;
            }
            return prevComandas;
        });
    };
    
    const handleReopenRequest = (comanda) => {
        setSelectedComanda(null);
        setConfirmReopenState({ isOpen: true, comanda });
    };

    const executeReopen = async () => {
        const { comanda } = confirmReopenState;
        if (!comanda) return;

        try {
            await authenticatedFetch(`/api/appointments/${comanda.id}/reopen`, { method: 'POST' }, user);
            showNotification('Sucesso!', 'Comanda reaberta com sucesso.');
            fetchComandas();
        } catch (error) {
            showNotification('Erro', `Não foi possível reabrir: ${error.message}`);
        } finally {
            setConfirmReopenState({ isOpen: false, comanda: null });
        }
    };

    const statusMap = {
        atendimento: { label: 'Em Atendimento', statusValue: 'confirmed' },
        pagamento: { label: 'Aguardando Pagamento', statusValue: 'awaiting_payment' },
        finalizada: { label: 'Finalizadas', statusValue: 'completed' },
    };
    
    const filteredComandas = allComandas.filter(c => c.status === statusMap[activeFilter].statusValue);
    
    return (
        <div className="h-full flex flex-col">
            <header className="p-2 bg-white border-b border-gray-200">
                <div className="flex bg-gray-100 rounded-lg p-1">
                    {Object.keys(statusMap).map(key => (<button key={key} onClick={() => setActiveFilter(key)} className={`flex-1 text-sm font-semibold py-2 rounded-md transition-colors ${activeFilter === key ? 'bg-white text-blue-600 shadow' : 'text-gray-600'}`}>{statusMap[key].label}</button>))}
                </div>
            </header>
            <main className="flex-1 overflow-y-auto p-4 space-y-3">
               {isLoading ? <p className="text-center text-gray-500">A carregar...</p> : 
                   filteredComandas.length > 0 ? filteredComandas.map(comanda => {
                       const total = (comanda.services || []).reduce((acc, s) => acc + s.price, 0) + (comanda.comandaItems || []).reduce((acc, i) => acc + i.price, 0);
                       return (
                           <div key={comanda.id} onClick={() => setSelectedComanda(comanda)} className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${activeFilter === 'atendimento' ? 'border-blue-500' : activeFilter === 'pagamento' ? 'border-yellow-500' : 'border-green-500'} cursor-pointer`}>
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
                       )
                   }) : <p className="text-center text-gray-500 pt-10">Nenhuma comanda encontrada.</p>
               }
            </main>
            <ComandaDetailModal 
                isOpen={!!selectedComanda}
                onClose={() => setSelectedComanda(null)}
                comanda={selectedComanda}
                user={user}
                showNotification={showNotification}
                onUpdate={handleUpdateComanda}
                onReopen={handleReopenRequest}
            />
            <ConfirmationModal
                isOpen={confirmReopenState.isOpen}
                onClose={() => setConfirmReopenState({ isOpen: false, comanda: null })}
                onConfirm={executeReopen}
                title="Reabrir Comanda"
                message="Tem a certeza de que deseja reabrir esta comanda? O pagamento será revertido."
            />
        </div>
    );
};
