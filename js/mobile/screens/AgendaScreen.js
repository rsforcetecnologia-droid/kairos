// js/mobile/screens/AgendaScreen.js

const { React } = window;
const { useState, useEffect, useCallback } = React;

// ✅ CORREÇÃO: Caminhos de importação agora são absolutos a partir da raiz do site
import { authenticatedFetch } from '/js/mobile/services/apiService.js';
import { icons } from '/js/mobile/utils/icons.js';
import AppointmentModal from '/js/mobile/components/AppointmentModal.js';
import ConfirmationModal from '/js/mobile/components/ConfirmationModal.js';

// --- Componente Principal da Agenda ---
const AgendaScreen = ({ user, showNotification, onNavigateToComanda }) => {
    // Estado para a vista (dia ou semana)
    const [viewMode, setViewMode] = useState('day');
    // Estado para a data atualmente selecionada
    const [currentDate, setCurrentDate] = useState(new Date());
    // Estado para armazenar os agendamentos buscados
    const [appointments, setAppointments] = useState([]);
    // Estado para armazenar a lista de profissionais
    const [professionals, setProfessionals] = useState([]);
    // Estado para mapear IDs de profissionais a cores
    const [professionalColors, setProfessionalColors] = useState(new Map());
    // Estado para o filtro de profissional selecionado
    const [selectedProfessional, setSelectedProfessional] = useState('all');
    // Estado de carregamento
    const [isLoading, setIsLoading] = useState(true);
    const [modalState, setModalState] = useState({ isOpen: false, appointment: null });
    const [confirmState, setConfirmState] = useState({ isOpen: false, appointmentId: null });
    const [actionMenuOpenId, setActionMenuOpenId] = useState(null);


    // Paleta de cores para diferenciar os profissionais
    const colorPalette = [
        { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-800' },
        { bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-800' },
        { bg: 'bg-yellow-100', border: 'border-yellow-500', text: 'text-yellow-800' },
        { bg: 'bg-purple-100', border: 'border-purple-500', text: 'text-purple-800' },
        { bg: 'bg-pink-100', border: 'border-pink-500', text: 'text-pink-800' },
        { bg: 'bg-indigo-100', border: 'border-indigo-500', text: 'text-indigo-800' },
    ];

    // Função auxiliar para obter o primeiro dia da semana (Segunda-feira)
    const getStartOfWeek = (date) => {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        d.setHours(0, 0, 0, 0);
        return new Date(d.setDate(diff));
    };
    
    // Função centralizada para buscar dados da API
    const fetchData = useCallback(async () => {
        if (!user) return;
        setIsLoading(true);

        // Busca a lista de profissionais apenas se ainda não tiver sido carregada
        if (professionals.length === 0) {
            try {
                const profs = await authenticatedFetch(`/api/professionals/${user.establishmentId}`, {}, user);
                setProfessionals(profs);
                const colors = new Map();
                profs.forEach((prof, index) => {
                    colors.set(prof.id, colorPalette[index % colorPalette.length]);
                });
                setProfessionalColors(colors);
            } catch (error) {
                showNotification('Erro', 'Não foi possível carregar os profissionais.');
            }
        }

        // Define o intervalo de datas com base na vista selecionada
        let startDate, endDate;
        if (viewMode === 'day') {
            startDate = new Date(currentDate);
            startDate.setHours(0, 0, 0, 0);
            endDate = new Date(currentDate);
            endDate.setHours(23, 59, 59, 999);
        } else { // 'week'
            startDate = getStartOfWeek(currentDate);
            endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6);
            endDate.setHours(23, 59, 59, 999);
        }

        try {
            const data = await authenticatedFetch(`/api/appointments/${user.establishmentId}?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`, {}, user);
            setAppointments(data.sort((a, b) => new Date(a.startTime) - new Date(b.startTime)));
        } catch (err) {
            showNotification("Erro", "Falha ao carregar os dados da agenda.");
        } finally {
            setIsLoading(false);
        }
    }, [user, currentDate, viewMode, professionals.length, showNotification]);

    // Executa a busca de dados quando algo relevante muda
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSaveAppointment = async (appointmentData) => {
      const isEditing = !!appointmentData.id;
      const url = isEditing ? `/api/appointments/${appointmentData.id}` : '/api/appointments';
      const method = isEditing ? 'PUT' : 'POST';
      try {
          await authenticatedFetch(url, { method, body: JSON.stringify(appointmentData) }, user);
          showNotification('Sucesso!', `Agendamento ${isEditing ? 'atualizado' : 'criado'} com sucesso.`);
          setModalState({ isOpen: false, appointment: null });
          await fetchData();
      } catch (err) {
          showNotification("Erro", `Não foi possível salvar o agendamento: ${err.message}`);
      }
    };

    const handleDelete = async (appointmentId) => {
        try {
            await authenticatedFetch(`/api/appointments/${appointmentId}`, { method: 'DELETE' }, user);
            showNotification('Sucesso!', 'Agendamento apagado com sucesso.');
            await fetchData();
        } catch(err) {
            showNotification("Erro", `Não foi possível apagar o agendamento: ${err.message}`);
        } finally {
            setConfirmState({ isOpen: false, appointmentId: null });
        }
    };

    const changeDate = (amount) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            const step = viewMode === 'week' ? 7 : 1;
            newDate.setDate(newDate.getDate() + (amount * step));
            return newDate;
        });
    };
    
    // Funções de Renderização
    const renderDayView = (appts) => {
        if (appts.length === 0) return <div className="text-center p-10 text-gray-500">Nenhum agendamento para este dia.</div>;
        return appts.map(appt => {
            const colors = professionalColors.get(appt.professionalId) || { border: 'border-gray-400' };
            const serviceName = Array.isArray(appt.services) ? appt.services.map(s => s.name).join(', ') : (appt.serviceName || 'Serviço');
            return (
                <div key={appt.id} onClick={() => onNavigateToComanda(appt.id)} className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${appt.status === 'completed' ? 'border-green-500 opacity-70' : colors.border} cursor-pointer`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-bold text-lg text-gray-800">{new Date(appt.startTime).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</span>
                      <span className={`ml-2 text-xs font-semibold px-2 py-1 rounded-full ${appt.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{appt.status === 'completed' ? 'Finalizado' : 'Confirmado'}</span>
                    </div>
                    <div className="relative">
                      <button onClick={(e) => { e.stopPropagation(); setActionMenuOpenId(actionMenuOpenId === appt.id ? null : appt.id) }} className="p-1 rounded-full hover:bg-gray-100">{icons.dots()}</button>
                      {actionMenuOpenId === appt.id && (
                        <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border z-10">
                          <button onClick={(e) => { e.stopPropagation(); setModalState({ isOpen: true, appointment: appt }); setActionMenuOpenId(null); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Editar</button>
                          <button onClick={(e) => { e.stopPropagation(); setConfirmState({ isOpen: true, appointmentId: appt.id }); setActionMenuOpenId(null); }} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Apagar</button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-2"><p className="font-bold text-gray-900">{appt.clientName}</p><p className="text-sm text-gray-600">{serviceName}</p><p className="text-sm text-gray-500 mt-1">com {appt.professionalName}</p></div>
                </div>
              )
        });
    };

    const renderWeekView = (appts) => {
        const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
        const startOfWeek = getStartOfWeek(currentDate);

        return (
            <div className="grid grid-cols-7 gap-1">
                {weekDays.map((dayName, index) => {
                    const dayDate = new Date(startOfWeek);
                    dayDate.setDate(startOfWeek.getDate() + index);
                    const isToday = dayDate.toDateString() === new Date().toDateString();

                    const dayAppts = appts.filter(a => new Date(a.startTime).toDateString() === dayDate.toDateString());

                    return (
                        <div key={index} className="flex flex-col">
                            <div className={`text-center py-2 ${isToday ? 'bg-blue-100 rounded-t-lg' : ''}`}>
                                <p className="text-xs font-bold">{dayName}</p>
                                <p className={`text-lg font-bold ${isToday ? 'text-blue-600' : ''}`}>{dayDate.getDate()}</p>
                            </div>
                            <div className="space-y-2 p-1">
                                {dayAppts.map(appt => {
                                     const colors = professionalColors.get(appt.professionalId) || { bg: 'bg-gray-200', text: 'text-gray-800' };
                                     const serviceName = Array.isArray(appt.services) ? appt.services.map(s => s.name).join(', ') : (appt.serviceName || 'Serviço');
                                     return (
                                        <div key={appt.id} className={`${colors.bg} ${colors.text} p-2 rounded-md text-xs`}>
                                            <p className="font-bold truncate">{appt.clientName}</p>
                                            <p className="truncate">{serviceName}</p>
                                            <p className="text-right font-semibold">{new Date(appt.startTime).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</p>
                                        </div>
                                     );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const filteredAppointments = appointments.filter(a => selectedProfessional === 'all' || a.professionalId === selectedProfessional);

    const formatDateHeader = () => {
        if (viewMode === 'day') {
            return new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).format(currentDate);
        } else {
            const start = getStartOfWeek(currentDate);
            const end = new Date(start);
            end.setDate(start.getDate() + 6);
            return `${start.toLocaleDateString('pt-BR')} - ${end.toLocaleDateString('pt-BR')}`;
        }
    };
    
    // O JSX que desenha o ecrã
    return (
        <div className="relative h-full flex flex-col">
            <div className="p-2 bg-white border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <button onClick={() => changeDate(-1)} className="p-2 rounded-full hover:bg-gray-100">&lt;</button>
                    <h3 className="font-semibold text-gray-800 text-center">{formatDateHeader()}</h3>
                    <button onClick={() => changeDate(1)} className="p-2 rounded-full hover:bg-gray-100">&gt;</button>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                     <div className="flex bg-gray-100 rounded-lg p-1">
                        <button onClick={() => setViewMode('day')} className={`px-3 py-1 text-sm font-semibold rounded-md ${viewMode === 'day' ? 'bg-white shadow' : ''}`}>Dia</button>
                        <button onClick={() => setViewMode('week')} className={`px-3 py-1 text-sm font-semibold rounded-md ${viewMode === 'week' ? 'bg-white shadow' : ''}`}>Semana</button>
                    </div>
                    <select value={selectedProfessional} onChange={e => setSelectedProfessional(e.target.value)} className="flex-1 p-2 border border-gray-300 rounded-md bg-white text-sm">
                        <option value="all">Todos Profissionais</option>
                        {professionals.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {isLoading ? <div className="text-center p-10 text-gray-500">A carregar...</div> : (viewMode === 'day' ? renderDayView(filteredAppointments) : renderWeekView(filteredAppointments))}
            </div>
            <button onClick={() => setModalState({ isOpen: true, appointment: null })} className="absolute bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700">{icons.plus('white')}</button>
            <AppointmentModal isOpen={modalState.isOpen} onClose={() => setModalState({ isOpen: false, appointment: null })} onSave={handleSaveAppointment} appointmentToEdit={modalState.appointment} user={user} showNotification={showNotification} />
            <ConfirmationModal isOpen={confirmState.isOpen} onClose={() => setConfirmState({ isOpen: false, appointmentId: null })} onConfirm={() => handleDelete(confirmState.appointmentId)} title="Apagar Agendamento" message="Tem a certeza que deseja apagar este agendamento?" />
        </div>
    );
};

export default AgendaScreen;