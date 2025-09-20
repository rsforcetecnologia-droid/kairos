import React from 'react';

export const NotificationModal = ({ isOpen, onClose, title, message }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-enter fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="modal-content-enter bg-white rounded-lg shadow-xl w-full max-w-sm m-4 p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                <p className="text-gray-600 my-4">{message}</p>
                <button onClick={onClose} className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">OK</button>
            </div>
        </div>
    );
};
