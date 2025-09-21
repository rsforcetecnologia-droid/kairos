// js/mobile/components/ConfirmationModal.js

const { React } = window;

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm m-4 p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                <p className="text-gray-600 my-4">{message}</p>
                <div className="flex gap-4">
                    <button onClick={onClose} className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300">Cancelar</button>
                    <button onClick={onConfirm} className="flex-1 py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700">Confirmar</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;