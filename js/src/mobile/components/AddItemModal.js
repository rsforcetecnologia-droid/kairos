import React, { useState, useEffect, useCallback } from 'react';
import { authenticatedFetch } from '../mobileApi.js';
import { getAuth } from 'firebase/auth';

const auth = getAuth();

export const AddItemModal = ({ isOpen, onClose, onAddItem, user, showNotification }) => {
    if (!isOpen) return null;

    const [searchTerm, setSearchTerm] = useState('');
    const [items, setItems] = useState({ services: [], products: [] });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            setIsLoading(true);
            try {
                const [servicesData, productsData] = await Promise.all([
                    authenticatedFetch(`/api/services/${user.establishmentId}`, {}, user),
                    authenticatedFetch(`/api/products/${user.establishmentId}`, {}, user)
                ]);
                setItems({ services: servicesData, products: productsData });
            } catch (error) {
                showNotification('Erro', 'Não foi possível carregar o catálogo de itens.');
                onClose();
            } finally {
                setIsLoading(false);
            }
        };
        fetchItems();
    }, [user, showNotification, onClose]);

    const filteredServices = items.services.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredProducts = items.products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm m-4 flex flex-col" style={{maxHeight: '90vh'}}>
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800">Adicionar Item</h3>
                    <button onClick={onClose} className="text-2xl font-bold">&times;</button>
                </div>
                <div className="p-4 border-b">
                    <input 
                        type="text" 
                        placeholder="Pesquisar..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded-md" 
                    />
                </div>
                <div className="flex-1 p-4 overflow-y-auto">
                    {isLoading ? <p>A carregar catálogo...</p> : (
                        <React.Fragment>
                            {filteredServices.length > 0 && (
                                <React.Fragment>
                                    <h4 className="font-semibold text-gray-700 mb-2">Serviços</h4>
                                    <div className="space-y-2">
                                        {filteredServices.map(item => (
                                            <button key={item.id} onClick={() => onAddItem({ ...item, type: 'service' })} className="w-full text-left flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                                                <span>{item.name}</span>
                                                <span className="font-semibold">R$ {item.price.toFixed(2)}</span>
                                            </button>
                                        ))}
                                    </div>
                                </React.Fragment>
                            )}
                            {filteredProducts.length > 0 && (
                                <React.Fragment>
                                    <h4 className="font-semibold text-gray-700 mt-4 mb-2">Produtos</h4>
                                    <div className="space-y-2">
                                        {filteredProducts.map(item => (
                                            <button key={item.id} onClick={() => onAddItem({ ...item, type: 'product' })} className="w-full text-left flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                                                <span>{item.name}</span>
                                                <span className="font-semibold">R$ {item.price.toFixed(2)}</span>
                                            </button>
                                        ))}
                                    </div>
                                </React.Fragment>
                            )}
                            {filteredServices.length === 0 && filteredProducts.length === 0 && <p className="text-center text-gray-500">Nenhum item encontrado.</p>}
                        </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    );
};
