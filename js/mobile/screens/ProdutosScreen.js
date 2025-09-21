// js/mobile/screens/ProdutosScreen.js

const { React } = window;
const { useState, useEffect, useCallback } = React;

import { authenticatedFetch } from '../services/apiService.js';
import { icons } from '../utils/icons.js';
import ItemFormModal from '../components/ItemFormModal.js';
import ConfirmationModal from '../components/ConfirmationModal.js';

const ProdutosScreen = ({ user, showNotification, onBack }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const [confirmState, setConfirmState] = useState({ isOpen: false, productId: null });

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

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleSaveProduct = async () => {
        fetchProducts();
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await authenticatedFetch(`/api/products/${productId}`, { method: 'DELETE' }, user);
            showNotification('Sucesso!', 'Produto apagado com sucesso.');
            fetchProducts();
        } catch (error) {
            showNotification('Erro', `Não foi possível apagar: ${error.message}`);
        } finally {
            setConfirmState({ isOpen: false, productId: null });
        }
    };

    return (
        <div className="flex flex-col h-full">
            <header className="flex-shrink-0 bg-white p-4 flex items-center shadow-md">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 mr-2">{icons.back()}</button>
                <h2 className="text-xl font-bold text-gray-800">Gerir Produtos</h2>
            </header>
            <main className="flex-1 overflow-y-auto p-4 space-y-4">
                {isLoading ? (
                    <p className="text-center text-gray-500">A carregar...</p>
                ) : products.length > 0 ? (
                    products.map(product => {
                        const stockLevel = (product.maxStock > 0) ? (product.currentStock / product.maxStock) * 100 : 0;
                        let stockColor = 'bg-green-500';
                        if (stockLevel < 50) stockColor = 'bg-yellow-500';
                        if (stockLevel < 20 || product.currentStock <= product.minStock) stockColor = 'bg-red-500';

                        return (
                            <div key={product.id} className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between transition-transform duration-200 transform hover:scale-[1.01]">
                                <div className="flex items-center space-x-4 flex-1 min-w-0">
                                    <img src={product.photo || 'https://placehold.co/60x60'} alt="Produto" className="w-12 h-12 rounded-md object-cover flex-shrink-0" />
                                    <div className="min-w-0">
                                        <p className="font-bold text-gray-800 truncate">{product.name}</p>
                                        <p className="text-sm text-gray-600 mt-1">R$ {product.price.toFixed(2)}</p>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                            <div className={`${stockColor} h-1.5 rounded-full`} style={{ width: `${stockLevel}%` }}></div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">{product.currentStock} em stock</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                                    <button onClick={() => { setProductToEdit(product); setIsModalOpen(true); }} className="p-2 rounded-full hover:bg-blue-100 transition-colors">{icons.edit('rgb(59 130 246)')}</button>
                                    <button onClick={() => setConfirmState({ isOpen: true, productId: product.id })} className="p-2 rounded-full hover:bg-red-100 transition-colors">{icons.trash('rgb(239 68 68)')}</button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center text-gray-500 pt-10">Nenhum produto encontrado. Adicione um para começar.</p>
                )}
            </main>
            <footer className="p-4 bg-white border-t">
                <button onClick={() => { setProductToEdit(null); setIsModalOpen(true); }} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors">+ Novo Produto</button>
            </footer>

            <ItemFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveProduct}
                itemToEdit={productToEdit}
                itemType="product"
                user={user}
                showNotification={showNotification}
            />
            <ConfirmationModal
                isOpen={confirmState.isOpen}
                onClose={() => setConfirmState({ isOpen: false, productId: null })}
                onConfirm={() => handleDeleteProduct(confirmState.productId)}
                title="Apagar Produto"
                message="Tem a certeza que deseja apagar este produto?"
            />
        </div>
    );
};

export default ProdutosScreen;