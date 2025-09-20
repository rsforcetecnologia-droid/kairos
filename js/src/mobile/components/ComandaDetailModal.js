import React, { useState } from 'react';
import { AddItemModal } from './AddItemModal.js';
import { authenticatedFetch } from '../mobileApi.js';

export const ComandaDetailModal = ({ comanda, isOpen, onClose, user, showNotification, onUpdate, onReopen }) => {
    if (!isOpen) return null;

    const [isSaving, setIsSaving] = useState(false);
    const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
    const [currentComandaItems, setCurrentComandaItems] = useState(comanda.comandaItems || []);

    const allDisplayItems = [...(comanda.services || []), ...currentComandaItems];
    const total = allDisplayItems.reduce((acc, item) => acc + item.price, 0);
    
    const handleFinalize = async () => {
        setIsSaving(true);
        try {
            const paymentData = {
                payments: [{ method: 'Dinheiro', value: total }],
                totalAmount: total,
                items: allDisplayItems,
            };
            await authenticatedFetch(`/api/appointments/${comanda.id}/checkout`, {
                method: 'POST',
                body: JSON.stringify(paymentData)
            }, user);
            showNotification('Sucesso!', 'Comanda finalizada com sucesso.');
            onUpdate({ ...comanda, status: 'completed', comandaItems: currentComandaItems });
            onClose();
        } catch (error) {
            showNotification('Erro', `Não foi possível finalizar a comanda: ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };
    
    const handleAddItem = async (newItem) => {
        const newComandaItem = {
            itemId: newItem.id,
            name: newItem.name,
            price: newItem.price,
            type: newItem.type,
        };
        const updatedItems = [...currentComandaItems, newComandaItem];
        
        try {
            await authenticatedFetch(`/api/appointments/${comanda.id}/comanda`, {
                method: 'POST',
                body: JSON.stringify({ items: updatedItems }),
            }, user);
            setCurrentComandaItems(updatedItems);
            showNotification('Sucesso!', 'Item adicionado com sucesso.');
            onUpdate({ ...comanda, comandaItems: updatedItems });
        } catch (error) {
            showNotification('Erro', `Não foi possível adicionar o item: ${error.message}`);
        } finally {
            setIsAddItemModalOpen(false);
        }
    };

    return (
        <React.Fragment>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-sm m-4">
                    <div className="p-4 border-b">
                        <h3 className="text-xl font-bold text-gray-800">Detalhes da Comanda</h3>
                        <p className="text-sm text-gray-600">{comanda.clientName} com {comanda.professionalName}</p>
                    </div>
                    <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
                        {allDisplayItems.map((item, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <p className="font-semibold text-gray-800">{item.name}</p>
                                <p className="text-gray-700">R$ {item.price.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                     <div className="p-4 border-t flex justify-between items-center">
                        <span className="font-bold text-lg">Total</span>
                        <span className="font-bold text-xl text-gray-900">R$ {total.toFixed(2)}</span>
                    </div>
                    <div className="p-4 bg-gray-50 space-y-2">
                        {comanda.status !== 'completed' && (
                            <button onClick={() => setIsAddItemModalOpen(true)} className="w-full py-2 px-4 bg-blue-100 text-blue-700 font-semibold rounded-lg hover:bg-blue-200">
                                Adicionar Item
                            </button>
                        )}
                        <div className="flex gap-4">
                            <button onClick={onClose} className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300">Fechar</button>
                            {comanda.status === 'completed' ? (
                                <button onClick={() => onReopen(comanda)} disabled={isSaving} className="flex-1 py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 disabled:bg-gray-400">
                                    {isSaving ? 'Aguarde...' : 'Reabrir Comanda'}
                                </button>
                            ) : (
                                <button onClick={handleFinalize} disabled={isSaving} className="flex-1 py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400">
                                    {isSaving ? 'A finalizar...' : 'Finalizar Pagamento'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <AddItemModal 
                isOpen={isAddItemModalOpen}
                onClose={() => setIsAddItemModalOpen(false)}
                onAddItem={handleAddItem}
                user={user}
                showNotification={showNotification}
            />
        </React.Fragment>
    );
};
