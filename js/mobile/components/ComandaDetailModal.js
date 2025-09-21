// js/mobile/components/ComandaDetailModal.js

const { React } = window;
const { useState } = React;

// ✅ CORREÇÃO: Caminhos de importação agora são absolutos
import { authenticatedFetch } from '/js/mobile/services/apiService.js';
import AddItemModal from '/js/mobile/components/AddItemModal.js';
import CheckoutModal from '/js/mobile/components/CheckoutModal.js';
import ConfirmationModal from '/js/mobile/components/ConfirmationModal.js';

const ComandaDetailModal = ({ comanda, isOpen, onClose, onUpdate, user, showNotification }) => {
    if (!isOpen || !comanda) return null;

    const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [confirmationState, setConfirmationState] = useState({ isOpen: false, action: null });

    const allDisplayItems = [...(comanda.services || []), ...(comanda.comandaItems || [])];
    const total = allDisplayItems.reduce((acc, item) => acc + (item.price || 0), 0);
    
    const handleActionConfirm = async () => {
        const { action } = confirmationState;
        setIsSaving(true);
        setConfirmationState({ isOpen: false, action: null });

        try {
            if (action === 'reopen') {
                const endpoint = comanda.type === 'appointment' ? `/api/appointments/${comanda.id}/reopen` : `/api/sales/${comanda.id}/reopen`;
                await authenticatedFetch(endpoint, { method: 'POST' }, user);
                showNotification('Sucesso!', 'Comanda foi reaberta para edição.');
            } else if (action === 'awaiting_payment') {
                await authenticatedFetch(`/api/appointments/${comanda.id}/awaiting-payment`, { method: 'POST' }, user);
                showNotification('Sucesso!', 'Comanda movida para aguardar pagamento.');
            }
            onUpdate(); // Atualiza a lista de comandas
        } catch (error) {
            showNotification("Erro", `A ação falhou: ${error.message}`);
        } finally {
            setIsSaving(false);
            onClose(); // Fecha o modal de detalhes
        }
    };

    const handleAddItem = async (newItem) => {
        const updatedItems = [...(comanda.comandaItems || []), { itemId: newItem.id, name: newItem.name, price: newItem.price, type: newItem.type }];
        try {
            await authenticatedFetch(`/api/appointments/${comanda.id}/comanda`, { method: 'POST', body: JSON.stringify({ items: updatedItems }) }, user);
            setIsAddItemModalOpen(false);
            onUpdate(); // Atualiza a lista para refletir o novo item/total
        } catch (error) {
            showNotification("Erro", `Não foi possível adicionar o item: ${error.message}`);
        }
    };

    const renderFooter = () => {
        if (comanda.status === 'completed') {
            return (
                <div className="p-4 bg-gray-50 space-y-2">
                     <button onClick={() => setConfirmationState({ isOpen: true, action: 'reopen' })} disabled={isSaving} className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 disabled:bg-gray-400">
                         {isSaving ? 'Aguarde...' : 'Reabrir Comanda'}
                     </button>
                     <button onClick={onClose} className="w-full py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300">
                        Fechar
                    </button>
                </div>
            );
        }

        const commonButtons = (
            <div className="flex gap-4">
                <button onClick={onClose} className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300">Fechar</button>
                <button onClick={() => setIsCheckoutModalOpen(true)} disabled={isSaving || allDisplayItems.length === 0} className="flex-1 py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400">
                    Finalizar Pagamento
                </button>
            </div>
        );

        if (comanda.status === 'awaiting_payment') {
            return <div className="p-4 bg-gray-50 space-y-2">{commonButtons}</div>;
        }
        
        // Status 'confirmed' (Em atendimento)
        return (
            <div className="p-4 bg-gray-50 space-y-2">
                <button onClick={() => setIsAddItemModalOpen(true)} className="w-full py-2 px-4 bg-blue-100 text-blue-700 font-semibold rounded-lg hover:bg-blue-200">Adicionar Item</button>
                <button onClick={() => setConfirmationState({ isOpen: true, action: 'awaiting_payment' })} disabled={isSaving} className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600">
                    Aguardar Pagamento
                </button>
                {commonButtons}
            </div>
        );
    };

    const confirmationDetails = {
        reopen: { title: 'Reabrir Comanda', message: 'Tem a certeza que deseja reabrir esta comanda? O pagamento será revertido.' },
        awaiting_payment: { title: 'Mover Comanda', message: 'Deseja mover esta comanda para a lista de "Aguardando Pagamento"?' }
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-sm m-4">
                    <div className="p-4 border-b">
                        <h3 className="text-xl font-bold text-gray-800">{comanda.clientName}</h3>
                        <p className="text-sm text-gray-600">{new Date(comanda.startTime).toLocaleString('pt-BR', { day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit' })}</p>
                        <p className="text-sm text-gray-500">com {comanda.professionalName}</p>
                    </div>
                    <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
                        {allDisplayItems.length > 0 ? allDisplayItems.map((item, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <div><p className="font-semibold text-gray-800">{item.name}</p></div>
                                <p className="text-gray-700">R$ {(item.price || 0).toFixed(2)}</p>
                            </div>
                        )) : <p className="text-gray-500 text-center">Nenhum item na comanda.</p>}
                    </div>
                    <div className="p-4 border-t flex justify-between items-center">
                        <span className="font-bold text-lg">Total</span>
                        <span className="font-bold text-xl text-gray-900">R$ {total.toFixed(2)}</span>
                    </div>
                    {renderFooter()}
                </div>
            </div>
            <AddItemModal isOpen={isAddItemModalOpen} onClose={() => setIsAddItemModalOpen(false)} onAddItem={handleAddItem} user={user} showNotification={showNotification} />
            <CheckoutModal isOpen={isCheckoutModalOpen} onClose={() => setIsCheckoutModalOpen(false)} onSave={onUpdate} comanda={comanda} total={total} user={user} showNotification={showNotification} />
            <ConfirmationModal
                isOpen={confirmationState.isOpen}
                onClose={() => setConfirmationState({ isOpen: false, action: null })}
                onConfirm={handleActionConfirm}
                title={confirmationState.action ? confirmationDetails[confirmationState.action].title : ''}
                message={confirmationState.action ? confirmationDetails[confirmationState.action].message : ''}
            />
        </>
    );
};

export default ComandaDetailModal;