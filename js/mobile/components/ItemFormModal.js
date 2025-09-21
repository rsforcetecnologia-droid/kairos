// js/mobile/components/ItemFormModal.js

const { React } = window;
const { useState, useEffect, useRef } = React;
import { authenticatedFetch } from '../services/apiService.js';

const ItemFormModal = ({ isOpen, onClose, onSave, itemToEdit, itemType, user, showNotification }) => {
    if (!isOpen) return null;

    const isEditing = !!itemToEdit;
    const isService = itemType === 'service';

    // Estados para os campos do formulário
    const [name, setName] = useState(itemToEdit?.name || '');
    const [price, setPrice] = useState(itemToEdit?.price || '');
    const [extraField, setExtraField] = useState(isEditing ? (isService ? itemToEdit.duration : itemToEdit.currentStock) : '');
    const [photo, setPhoto] = useState(itemToEdit?.photo || '');
    const [isActive, setIsActive] = useState(isEditing ? itemToEdit.active : true);
    
    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = useRef(null);
    
    const isFormValid = name && (price !== '' && !isNaN(parseFloat(price)));

    // Função para lidar com o upload da foto
    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    // Função para guardar o item (criar ou atualizar)
    const handleSave = async () => {
        if (!isFormValid) {
            showNotification('Campos Inválidos', 'Por favor, preencha o nome e o preço corretamente.');
            return;
        }
        
        setIsSaving(true);
        const itemData = {
            name,
            price: parseFloat(price),
            photo,
            establishmentId: user.establishmentId,
            active: isActive,
            ...(isService 
                ? { duration: parseInt(extraField) || 0 } 
                : { currentStock: parseInt(extraField) || 0 }
            ),
        };
        
        try {
            const endpoint = isEditing ? `/api/${itemType}s/${itemToEdit.id}` : `/api/${itemType}s`;
            const method = isEditing ? 'PUT' : 'POST';

            await authenticatedFetch(endpoint, { method, body: JSON.stringify(itemData) }, user);
            showNotification('Sucesso!', `Item ${isEditing ? 'atualizado' : 'criado'} com sucesso.`);
            onSave(); // Avisa o ecrã pai para recarregar os dados
        } catch (error) {
            showNotification('Erro', error.message);
        } finally {
            setIsSaving(false);
            onClose(); // Fecha o modal
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm m-4 flex flex-col" style={{maxHeight: '90vh'}}>
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800">{isEditing ? 'Editar' : 'Novo'} {isService ? 'Serviço' : 'Produto'}</h3>
                    <button onClick={onClose} className="text-2xl font-bold">&times;</button>
                </div>
                <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                    <div className="flex flex-col items-center">
                        <img src={photo || `https://placehold.co/100x100?text=${itemType.charAt(0).toUpperCase()}`} alt="Item" className="w-24 h-24 object-cover rounded-md border-2 border-gray-200 mb-2" />
                        <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" />
                        <button type="button" onClick={() => fileInputRef.current.click()} className="py-1 px-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 text-sm">Carregar Imagem</button>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Nome</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Preço (R$)</label>
                        <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">{isService ? 'Duração (minutos)' : 'Stock Atual'}</label>
                        <input type="number" value={extraField} onChange={e => setExtraField(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="flex items-center">
                        <label className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input type="checkbox" checked={isActive} onChange={() => setIsActive(!isActive)} className="sr-only" />
                                <div className="toggle-bg block bg-gray-300 w-10 h-6 rounded-full"></div>
                            </div>
                            <span className="ml-3 text-sm font-medium text-gray-700">{isActive ? 'Ativo' : 'Inativo'}</span>
                        </label>
                    </div>
                </div>
                <div className="p-4 bg-gray-50 flex gap-4">
                    <button type="button" onClick={onClose} className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300">Cancelar</button>
                    <button type="button" onClick={handleSave} disabled={!isFormValid || isSaving} className="flex-1 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400">
                        {isSaving ? 'A salvar...' : 'Salvar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemFormModal;