import React, { useState, useEffect, useCallback } from 'react';
import { authenticatedFetch } from '../mobileApi.js';
import { AppointmentModal } from '../components/AppointmentModal.js';
import { ConfirmationModal } from '../components/ConfirmationModal.js';
import { icons } from '../utils/icons.js';

export const AgendaScreen = ({ user, showNotification }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [appointmentToEdit, setAppointmentToEdit] = useState(null);
    const [confirmState, setConfirmState] = useState({ isOpen: false, appointmentId: null });
    const [actionMenuOpenId, setActionMenuOpenId] = useState(null);

    const fetchAppointments = useCallback(async () => {
        setIsLoading(true);
        try {
            const startOfDay = new Date(currentDate);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(currentDate);
            endOfDay.setHours(23, 59, 59, 999);
            const endpoint = `/api/appointments/${user.establishmentId}?startDate=${startOfDay.toISOString()}&endDate=${endOfDay.toISOString()}`;
            const data = await authenticatedFetch(endpoint, {}, user);
            setAppointments(data.sort((a, b) => new Date(a.startTime) - new Date(b.startTime)));
        } catch (error) {
            showNotification('Erro na Agenda', error.message);
        } finally {
            setIsLoading(false);
        }
    }, [currentDate, user, showNotification]);

    useEffect(() => { fetchAppointments(); }, [fetchAppointments]);

    const handleSaveAppointment = async (appointmentData) => {
        const isEditing = !!appointmentData.id;
        const endpoint = isEditing ? `/api/appointments/${appointmentData.id}` : '/api/appointments';
        const method = isEditing ? 'PUT' : 'POST';
        try {
            await authenticatedFetch(endpoint, { method, body: JSON.stringify(appointmentData) }, user);
            showNotification('Sucesso!', `Agendamento ${isEditing ? 'atualizado' : 'criado'} com sucesso.`);
            setIsModalOpen(false);
            setAppointmentToEdit(null);
            await fetchAppointments();
        } catch(err) {
            showNotification('Erro', err.message);
        }
    };

    const handleDelete = async (appointmentId) => {
        try {
            await authenticatedFetch(`/api/appointments/${appointmentId}`, { method: 'DELETE' }, user);
            showNotification('Sucesso!', 'Agendamento apagado com sucesso.');
            await fetchAppointments();
        } catch(err) {
            showNotification('Erro', `Não foi possível apagar: ${err.message}`);
        } finally {
            setConfirmState({ isOpen: false, appointmentId: null });
        }
    };

    const changeDate = (amount) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() + amount);
            return newDate;
        });
    };

    const formatDate = (date) => new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).format(date);

    return (
        <div className="flex flex-col h-full">
            <header className="flex-shrink-0 bg-white p-4 flex items-center justify-between shadow-md">
                <button onClick={() => changeDate(-1)} className="p-2 rounded-full hover:bg-gray-100">&lt;</button>
                <h2 className="font-semibold text-gray-800 text-center">{formatDate(currentDate)}</h2>
                <button onClick={() => changeDate(1)} className="p-2 rounded-full hover:bg-gray-100">&gt;</button>
            </header>
            <main className="flex-1 overflow-y-auto p-4 space-y-3">
                {isLoading ? <p className="text-center text-gray-500">A carregar...</p> : 
                    appointments.length > 0 ? appointments.map(appt => (
                        <div key={appt.id} className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${appt.status === 'completed' ? 'border-green-500 opacity-70' : 'border-blue-500'}`}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold text-lg text-gray-800">{new Date(appt.startTime).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</p>
                                    <p className="font-semibold text-gray-900">{appt.clientName}</p>
                                </div>
                                <div className="relative">
                                    <button onClick={() => setActionMenuOpenId(actionMenuOpenId === appt.id ? null : appt.id)} className="p-1 rounded-full hover:bg-gray-100">{icons.dots()}</button>
                                    {actionMenuOpenId === appt.id && (
                                        <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border z-10">
                                            <button onClick={() => { setAppointmentToEdit(appt); setIsModalOpen(true); setActionMenuOpenId(null); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Editar</button>
                                            <button onClick={() => { setConfirmState({ isOpen: true, appointmentId: appt.id }); setActionMenuOpenId(null); }} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Apagar</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mt-2 pt-2 border-t border-gray-100">
                                <p className="text-sm text-gray-600">{appt.serviceName}</p>
                                <p className="text-sm text-gray-500 mt-1">com {appt.professionalName}</p>
                            </div>
                        </div>
                    )) : <p className="text-center text-gray-500 pt-10">Nenhum agendamento para este dia.</p>
                }
            </main>
            <footer className="p-4">
                <button onClick={() => { setAppointmentToEdit(null); setIsModalOpen(true); }} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-blue-700">+ Novo Agendamento</button>
            </footer>
            <AppointmentModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSave={handleSaveAppointment}
                appointmentToEdit={appointmentToEdit}
                user={user}
                showNotification={showNotification}
            />
            <ConfirmationModal 
                isOpen={confirmState.isOpen} 
                onClose={() => setConfirmState({ isOpen: false, appointmentId: null })} 
                onConfirm={() => handleDelete(confirmState.appointmentId)} 
                title="Apagar Agendamento" 
                message="Tem a certeza que deseja apagar este agendamento?" 
            />
        </div>
    );
};
