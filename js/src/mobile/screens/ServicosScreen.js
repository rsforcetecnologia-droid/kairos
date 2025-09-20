import React, { useState, useEffect, useCallback } from 'react';
import { authenticatedFetch } from '../mobileApi.js';
import { icons } from '../utils/icons.js';

export const ServicosScreen = ({ user, showNotification, onBack }) => {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    useEffect(() => { fetchServices(); }, [fetchServices]);

    return (
        <div className="flex flex-col h-full">
            <header className="flex-shrink-0 bg-white p-4 flex items-center shadow-md">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 mr-2">{icons.back()}</button>
                <h2 className="text-xl font-bold text-gray-800">Gerir Serviços</h2>
            </header>
            <main className="flex-1 overflow-y-auto p-4 space-y-3">
                {isLoading ? <p>A carregar...</p> : services.map(service => (
                    <div key={service.id} className={`bg-white p-3 rounded-lg shadow-sm border-l-4 ${service.active ? 'border-blue-500' : 'border-gray-300 opacity-70'}`}>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-bold text-gray-800">{service.name}</p>
                                <p className="text-sm text-gray-500">{service.duration} min - R$ {service.price.toFixed(2)}</p>
                            </div>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${service.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{service.active ? 'Ativo' : 'Inativo'}</span>
                        </div>
                    </div>
                ))}
            </main>
            <footer className="p-4"><button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-blue-700">+ Novo Serviço</button></footer>
        </div>
    );
};
