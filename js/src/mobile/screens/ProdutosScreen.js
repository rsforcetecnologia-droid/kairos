import React, { useState, useEffect, useCallback } from 'react';
import { authenticatedFetch } from '../mobileApi.js';
import { icons } from '../utils/icons.js';

export const ProdutosScreen = ({ user, showNotification, onBack }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await authenticatedFetch(`/api/products/${user.establishmentId}`, {}, user);
            setProducts(data);
        } catch (error) {
            showNotification('Erro', 'Não foi possível carregar os produtos.');
        } finally {
            setIsLoading(false);
        }
    }, [user, showNotification]);

    useEffect(() => { fetchProducts(); }, [fetchProducts]);

    return (
         <div className="flex flex-col h-full">
            <header className="flex-shrink-0 bg-white p-4 flex items-center shadow-md">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 mr-2">{icons.back()}</button>
                <h2 className="text-xl font-bold text-gray-800">Gerir Produtos</h2>
            </header>
            <main className="flex-1 overflow-y-auto p-4 space-y-3">
                {isLoading ? <p>A carregar...</p> : products.map(product => {
                     const stockLevel = (product.maxStock > 0) ? (product.currentStock / product.maxStock) * 100 : 0;
                     let stockColor = 'bg-green-500';
                     if (stockLevel < 50) stockColor = 'bg-yellow-500';
                     if (stockLevel < 20) stockColor = 'bg-red-500';

                     return (
                        <div key={product.id} className="bg-white p-3 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-bold text-gray-800">{product.name}</p>
                                    <p className="text-sm text-gray-500">R$ {product.price.toFixed(2)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-lg">{product.currentStock}</p>
                                    <p className="text-xs text-gray-500">em stock</p>
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                <div className={`${stockColor} h-1.5 rounded-full`} style={{ width: `${stockLevel}%` }}></div>
                            </div>
                        </div>
                    );
                })}
            </main>
            <footer className="p-4"><button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-blue-700">+ Novo Produto</button></footer>
        </div>
    );
};
