// js/mobile/components/AppointmentModal.js

const { React } = window;
const { useState, useEffect } = React;
import { authenticatedFetch } from '../services/apiService.js';

const AppointmentModal = ({ isOpen, onClose, onSave, appointmentToEdit, user, showNotification }) => {
    if (!isOpen) return null;

    const [clientName, setClientName] = useState(appointmentToEdit?.clientName || '');
    const [clientPhone, setClientPhone] = useState(appointmentToEdit?.clientPhone || '');
    const [selectedServices, setSelectedServices] = useState(appointmentToEdit?.services?.map(s => s.id) || []);
    const [professionalId, setProfessionalId] = useState(appointmentToEdit?.professionalId || '');
    const [date, setDate] = useState(appointmentToEdit ? new Date(appointmentToEdit.startTime).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);
    const [time, setTime] = useState(appointmentToEdit ? new Date(appointmentToEdit.startTime).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'}) : '');

    const [availableServices, setAvailableServices] = useState([]);
    const [availableProfessionals, setAvailableProfessionals] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(true);

    const [isSaving, setIsSaving] = useState(false);
    const isFormValid = clientName && clientPhone && selectedServices.length > 0 && professionalId && time;
    const isEditing = !!appointmentToEdit;

    useEffect(() => {
        const fetchData = async () => {
            setIsLoadingData(true);
            try {
                const [servicesData, professionalsData] = await Promise.all([
                    authenticatedFetch(`/api/services/public/${user.establishmentId}`, {}, user),
                    authenticatedFetch(`/api/professionals/${user.establishmentId}`, {}, user)
                ]);
                setAvailableServices(servicesData);
                setAvailableProfessionals(professionalsData);
            } catch (error) {
                showNotification('Erro', 'Não foi possível carregar os dados necessários.');
            } finally {
                setIsLoadingData(false);
            }
        };
        fetchData();
    }, [user, showNotification]);

    useEffect(() => {
        const fetchAvailability = async () => {
            if (selectedServices.length > 0 && professionalId && date) {
                setAvailableTimes([]);
                try {
                    const endpoint = `/api/availability?establishmentId=${user.establishmentId}&professionalId=${professionalId}&serviceIds=${selectedServices.join(',')}&date=${date}`;
                    const times = await authenticatedFetch(endpoint, {}, user);
                    setAvailableTimes(times);
                } catch(error) {
                    showNotification("Erro", "Não foi possível buscar horários disponíveis.");
                }
            }
        };
        fetchAvailability();
    }, [selectedServices, professionalId, date, user, showNotification]);

    const handleSubmit = async () => {
        if (!isFormValid) return;
        setIsSaving(true);

        const servicesDataForSave = selectedServices.map(id => {
            const service = availableServices.find(s => s.id === id);
            return { id: service.id, name: service.name, price: service.price, duration: service.duration };
        });

        const startTimeISO = new Date(`${date}T${time}:00`).toISOString();

        const appointmentData = {
            id: isEditing ? appointmentToEdit.id : null,
            clientName, clientPhone, services: servicesDataForSave,
            professionalId, startTime: startTimeISO,
            establishmentId: user.establishmentId,
        };

        await onSave(appointmentData);
        setIsSaving(false);
        onClose();
    };

    const handleServiceToggle = (serviceId) => {
        setSelectedServices(prev =>
            prev.includes(serviceId)
                ? prev.filter(id => id !== serviceId)
                : [...prev, serviceId]
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm m-4 flex flex-col" style={{maxHeight: '90vh'}}>
                <div className="p-4 border-b"><h3 className="text-xl font-bold text-gray-800">{isEditing ? 'Editar Agendamento' : 'Novo Agendamento'}</h3></div>
                <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                    {isLoadingData ? <p>A carregar...</p> : (
                        <>
                        <div><label className="text-sm font-medium text-gray-700 mb-1 block">Nome do Cliente</label><input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" /></div>
                        <div><label className="text-sm font-medium text-gray-700 mb-1 block">Telemóvel do Cliente</label><input type="tel" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" /></div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Serviços</label>
                            <div className="space-y-1 max-h-24 overflow-y-auto p-2 border rounded-md">
                                {availableServices.map(s => (
                                    <label key={s.id} className="flex items-center"><input type="checkbox" value={s.id} checked={selectedServices.includes(s.id)} onChange={() => handleServiceToggle(s.id)} className="mr-2" />{s.name}</label>
                                ))}
                            </div>
                        </div>
                        <div><label className="text-sm font-medium text-gray-700 mb-1 block">Profissional</label><select value={professionalId} onChange={(e) => setProfessionalId(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md bg-white"><option value="">Selecione...</option>{availableProfessionals.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
                        <div><label className="text-sm font-medium text-gray-700 mb-1 block">Data</label><input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" /></div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Horário</label>
                            <div className="grid grid-cols-4 gap-2">
                                {availableTimes.length > 0 ? availableTimes.map(t => <button key={t} onClick={() => setTime(t)} type="button" className={`p-2 rounded-md text-sm ${time === t ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>{t}</button>) : <p className="col-span-4 text-center text-sm text-gray-500">Selecione os campos acima.</p>}
                            </div>
                        </div>
                        </>
                    )}
                </div>
                <div className="p-4 bg-gray-50 flex gap-4"><button type="button" onClick={onClose} className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300">Cancelar</button><button type="button" onClick={handleSubmit} disabled={!isFormValid || isSaving} className="flex-1 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400">{isSaving ? 'A salvar...' : (isEditing ? 'Salvar' : 'Agendar')}</button></div>
            </div>
        </div>
    );
};

export default AppointmentModal;