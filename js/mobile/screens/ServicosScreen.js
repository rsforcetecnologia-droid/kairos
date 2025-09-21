// js/mobile/screens/ServicosScreen.js

const { React } = window;
const { useState, useEffect, useCallback } = React;

import { authenticatedFetch } from '../services/apiService.js';
import { icons } from '../utils/icons.js';
import ItemFormModal from '../components/ItemFormModal.js';
import ConfirmationModal from '../components/ConfirmationModal.js';

const ServicosScreen = ({ user, showNotification, onBack }) => {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [serviceToEdit, setServiceToEdit] = useState(null);
    const [confirmState, setConfirmState] = useState({ isOpen: false, serviceId: null });

    const fetchServices = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await authenticatedFetch(`/api/services/${user.establishmentId}`, {}, user);
            setServices(data);
        } catch (error) {
            showNotification('Erro', 'Não foi possível carregar os serviços.');
        } finally {
            setIsLoading(false);
        }
    }, [user, showNotification]);

    useEffect(() => {
        fetchServices();
    }, [fetchServices]);

    const handleSaveService = async () => {
        // Apenas recarrega a lista após o modal ser fechado e salvo
        fetchServices();
    };

    const handleDeleteService = async (serviceId) => {
        try {
            await authenticatedFetch(`/api/services/${serviceId}`, { method: 'DELETE' }, user);
            showNotification('Sucesso!', 'Serviço apagado com sucesso.');
            fetchServices();
        } catch (error) {
            showNotification('Erro', `Não foi possível apagar: ${error.message}`);
        } finally {
            setConfirmState({ isOpen: false, serviceId: null });
        }
    };

    return (
        <div className="flex flex-col h-full">
            <header className="flex-shrink-0 bg-white p-4 flex items-center shadow-md">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 mr-2">{icons.back()}</button>
                <h2 className="text-xl font-bold text-gray-800">Gerir Serviços</h2>
            </header>
            <main className="flex-1 overflow-y-auto p-4 space-y-4">
                {isLoading ? (
                    <p className="text-center text-gray-500">A carregar...</p>
                ) : services.length > 0 ? (
                    services.map(service => (
                        <div key={service.id} className={`bg-white p-4 rounded-xl shadow-md flex items-center justify-between transition-transform duration-200 transform hover:scale-[1.01] ${service.active ? 'border-l-4 border-blue-500' : 'border-l-4 border-gray-300 opacity-70'}`}>
                            <div className="flex items-center space-x-4 flex-1 min-w-0">
                                <img src={service.photo || 'https://placehold.co/60x60'} alt="Serviço" className="w-12 h-12 rounded-md object-cover flex-shrink-0" />
                                <div className="min-w-0">
                                    <p className="font-bold text-gray-800 truncate">{service.name}</p>
                                    <p className="text-sm text-green-600 font-semibold">R$ {service.price.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                                <button onClick={() => { setServiceToEdit(service); setIsModalOpen(true); }} className="p-2 rounded-full hover:bg-blue-100 transition-colors">{icons.edit('rgb(59 130 246)')}</button>
                                <button onClick={() => setConfirmState({ isOpen: true, serviceId: service.id })} className="p-2 rounded-full hover:bg-red-100 transition-colors">{icons.trash('rgb(239 68 68)')}</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 pt-10">Nenhum serviço encontrado. Adicione um para começar.</p>
                )}
            </main>
            <footer className="p-4 bg-white border-t">
                <button onClick={() => { setServiceToEdit(null); setIsModalOpen(true); }} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors">+ Novo Serviço</button>
            </footer>
            
            <ItemFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveService}
                itemToEdit={serviceToEdit}
                itemType="service"
                user={user}
                showNotification={showNotification}
            />
            <ConfirmationModal
                isOpen={confirmState.isOpen}
                onClose={() => setConfirmState({ isOpen: false, serviceId: null })}
                onConfirm={() => handleDeleteService(confirmState.serviceId)}
                title="Apagar Serviço"
                message="Tem a certeza que deseja apagar este serviço?"
            />
        </div>
    );
};

export default ServicosScreen;