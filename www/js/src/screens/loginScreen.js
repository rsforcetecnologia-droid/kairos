//src\screens\login.Screen.js
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Registar os componentes do Chart.js que vamos usar
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// --- CONFIGURAÇÃO DO FIREBASE ---
const firebaseConfig = {
    apiKey: "AIzaSyAlJaPEW5-yOb-8wkB8EJZhAML2M2yI8Ao",
    authDomain: "kairos-system.firebaseapp.com",
    projectId: "kairos-system",
    storageBucket: "kairos-system.appspot.com",
    messagingSenderId: "603994960586",
    appId: "1:603994960586:web:30d2c030eed3c55eccfa33",
    measurementId: "G-SVHFXKV5EC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- Ícones para a Barra de Navegação e UI (SVG) ---
const icons = {
  agenda: (color) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  comandas: (color) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  relatorios: (color) => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  gestao: (color) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  plus: (color) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  ),
  dots: (color = 'currentColor') => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M5 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
  ),
};

// --- Ecrã de Login ---
const LoginScreen = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const idTokenResult = await user.getIdTokenResult();
        const claims = idTokenResult.claims;

        if ((claims.role === 'owner' || claims.role === 'employee') && claims.establishmentId) {
            const userData = { 
                name: user.displayName, 
                email: user.email,
                uid: user.uid,
                token: await user.getIdToken(),
                establishmentId: claims.establishmentId
            };
            onLoginSuccess(userData);
        } else {
            setErrorMessage('Acesso negado. Permissões insuficientes.');
            await signOut(auth);
        }
    } catch (error) {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
            setErrorMessage('E-mail ou senha inválidos.');
        } else {
            setErrorMessage('Ocorreu um erro ao tentar entrar.');
            console.error("Erro de login:", error);
        }
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-900 h-screen flex justify-center items-center font-sans">
      <div className="w-full max-w-md">
        <div className="text-center mb-12 px-6">
          <h1 className="text-3xl font-bold text-gray-50">Acesso ao Painel</h1>
          <p className="text-base text-gray-400 mt-2">Administre o seu estabelecimento</p>
        </div>
        <div className="px-6">
          <div className="mb-5">
            <label className="text-sm font-medium text-gray-300 mb-2 block">E-mail</label>
            <input type="email" className="bg-gray-700 text-gray-50 w-full px-4 py-3 rounded-lg text-base border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-300 mb-2 block">Senha</label>
            <input type="password" className="bg-gray-700 text-gray-50 w-full px-4 py-3 rounded-lg text-base border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {errorMessage && (<p className="text-red-400 text-center mb-4 text-sm">{errorMessage}</p>)}
          <button className={`w-full bg-blue-600 text-white font-bold py-4 rounded-lg text-base mt-4 transition-colors ${isLoading ? 'bg-blue-400' : 'hover:bg-blue-700'}`} onClick={handleLogin} disabled={isLoading}>
            {isLoading ? (
              <div className="flex justify-center items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                A entrar...
              </div>
            ) : ('Entrar')}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Modal de Novo/Editar Agendamento ---
const AppointmentModal = ({ isOpen, onClose, onSave, appointmentToEdit, user }) => {
    if (!isOpen) return null;

    const [clientName, setClientName] = useState(appointmentToEdit?.clientName || '');
    const [service, setService] = useState(appointmentToEdit?.serviceName || '');
    const [professional, setProfessional] = useState(appointmentToEdit?.professionalName || '');
    const [time, setTime] = useState(appointmentToEdit ? new Date(appointmentToEdit.startTime).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'}) : '11:00');
    const [isSaving, setIsSaving] = useState(false);

    const isFormValid = clientName && service && professional;
    const isEditing = !!appointmentToEdit;

    const handleSubmit = async () => {
        if (!isFormValid) return;
        setIsSaving(true);

        const mockService = { id: 'mock-service-id', name: service, price: 50, duration: 30 };
        const mockProfessional = { id: 'mock-prof-id', name: professional };

        const appointmentData = {
            id: isEditing ? appointmentToEdit.id : null,
            clientName,
            services: [mockService],
            professionalId: mockProfessional.id,
            startTime: new Date(`${new Date().toISOString().split('T')[0]}T${time}:00`).toISOString(),
        };

        await onSave(appointmentData);
        setIsSaving(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm m-4"><div className="p-4 border-b"><h3 className="text-xl font-bold text-gray-800">{isEditing ? 'Editar Agendamento' : 'Novo Agendamento'}</h3></div><div className="p-4 space-y-4"><div><label className="text-sm font-medium text-gray-700 mb-1 block">Nome do Cliente</label><input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" /></div><div><label className="text-sm font-medium text-gray-700 mb-1 block">Serviço</label><select value={service} onChange={(e) => setService(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md bg-white"><option value="">Selecione...</option><option value="Corte de Cabelo">Corte de Cabelo</option><option value="Barba">Barba</option><option value="Corte e Barba">Corte e Barba</option></select></div><div><label className="text-sm font-medium text-gray-700 mb-1 block">Profissional</label><select value={professional} onChange={(e) => setProfessional(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md bg-white"><option value="">Selecione...</option><option value="Ricardo">Ricardo</option><option value="Fernando">Fernando</option></select></div></div><div className="p-4 bg-gray-50 flex gap-4"><button onClick={onClose} className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300">Cancelar</button><button onClick={handleSubmit} disabled={!isFormValid || isSaving} className="flex-1 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400">{isSaving ? 'A salvar...' : (isEditing ? 'Salvar' : 'Agendar')}</button></div></div>
        </div>
    );
};

// --- Modal de Confirmação Genérico ---
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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

// --- Professional Selector Component ---
const ProfessionalSelector = ({ professionals, selectedProfessional, onSelect, canViewAll }) => {
    if (!canViewAll) {
        return null; // Don't show selector if user can't view all professionals
    }

    return (
        <div className="overflow-x-auto py-2 px-4 bg-gray-100">
            <div className="flex space-x-4">
                <button
                    onClick={() => onSelect('all')}
                    className={`flex-shrink-0 flex flex-col items-center justify-center space-y-1 p-1 rounded-lg ${selectedProfessional === 'all' ? 'bg-blue-100' : ''}`}
                >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 border-2 ${selectedProfessional === 'all' ? 'border-blue-500' : 'border-transparent'}`}>
                        <span className="text-xs font-bold">Todos</span>
                    </div>
                </button>
                {professionals.map(prof => (
                    <button
                        key={prof.id}
                        onClick={() => onSelect(prof.id)}
                        className={`flex-shrink-0 flex flex-col items-center justify-center space-y-1 p-1 rounded-lg ${selectedProfessional === prof.id ? 'bg-blue-100' : ''}`}
                    >
                        <img
                            src={prof.photo || 'https://placehold.co/128x128'}
                            alt={prof.name}
                            className={`w-12 h-12 rounded-full object-cover border-2 ${selectedProfessional === prof.id ? 'border-blue-500' : 'border-transparent'}`}
                        />
                        <span className="text-xs text-gray-600 truncate w-16 text-center">{prof.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};


// --- Ecrã da Agenda ---
const AgendaScreen = ({ user, showNotification, appointments, isLoading, error, refreshData, onNavigateToComanda }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalState, setModalState] = useState({ isOpen: false, appointment: null });
  const [confirmState, setConfirmState] = useState({ isOpen: false, appointmentId: null });
  const [actionMenuOpenId, setActionMenuOpenId] = useState(null);
  const [view, setView] = useState('list'); // 'list' ou 'week'
  const [professionals, setProfessionals] = useState([]);
  
  // LÓGICA DE ALÇADA: Permissão para ver a agenda de todos
  const canViewAll = user.role === 'owner' || user.permissions?.['agenda-section']?.view_all_prof === true;
  
  // Seleciona o professionalId do usuário se não puder ver todos
  const defaultProf = (!canViewAll && user.professionalId) ? user.professionalId : 'all';
  const [selectedProfessional, setSelectedProfessional] = useState(defaultProf);
  
  const [weekOffset, setWeekOffset] = useState(0); 
  const isEmployee = user.role === 'employee';

  const getDateToFetch = useCallback((date, offset, currentView) => {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);

      if (currentView === 'list') {
          return d;
      } else { 
          const displayDays = 3;
          
          const day = d.getDay();
          const diff = d.getDate() - day + (day === 0 ? -6 : 1); 
          d.setDate(diff);
          
          d.setDate(d.getDate() + offset * displayDays);
          return d;
      }
  }, []);

  const fetchProfessionals = useCallback(async () => {
      try {
          const data = await authenticatedFetch(`/api/professionals/${user.establishmentId}`, {}, user);
          setProfessionals(data);
      } catch (error) {
          showNotification('Erro', 'Não foi possível carregar a lista de profissionais.');
      }
  }, [user, showNotification]);

  useEffect(() => {
      if (canViewAll) {
          fetchProfessionals();
      }
  }, [canViewAll, fetchProfessionals]);
  
  useEffect(() => {
      if (refreshData) {
          const startDateToFetch = getDateToFetch(currentDate, weekOffset, view);
          refreshData(startDateToFetch, view, selectedProfessional);
      }
  }, [currentDate, view, selectedProfessional, refreshData, weekOffset, getDateToFetch]);


  const handleSaveAppointment = async (appointmentData) => {
      const isEditing = !!appointmentData.id;
      const url = isEditing ? `/api/appointments/${appointmentData.id}` : '/api/appointments';
      const method = isEditing ? 'PUT' : 'POST';
      try {
          await authenticatedFetch(url, { method, body: JSON.stringify(appointmentData) }, user);
          showNotification('Sucesso!', `Agendamento ${isEditing ? 'atualizado' : 'criado'} com sucesso.`);
          setModalState({ isOpen: false, appointment: null });
          await refreshData(getDateToFetch(currentDate, weekOffset, view), view, selectedProfessional);
      } catch (err) {
          showNotification("Erro", `Não foi possível salvar o agendamento: ${err.message}`);
      }
  };

  const handleDelete = async (appointmentId) => {
      try {
          await authenticatedFetch(`/api/appointments/${appointmentId}`, { method: 'DELETE' }, user);
          showNotification('Sucesso!', 'Agendamento apagado com sucesso.');
          await refreshData(getDateToFetch(currentDate, weekOffset, view), view, selectedProfessional);
      } catch(err) {
          showNotification("Erro", `Não foi possível apagar o agendamento: ${err.message}`);
      } finally {
          setConfirmState({ isOpen: false, appointmentId: null });
      }
  };

  const changeDate = (amount) => {
      if (view === 'list') {
          setCurrentDate(prevDate => {
              const newDate = new Date(prevDate);
              newDate.setDate(newDate.getDate() + amount);
              return newDate;
          });
      } else { 
          setWeekOffset(prevOffset => prevOffset + amount);
      }
  };

  const handleSetView = (newView) => {
      setView(newView);
      setWeekOffset(0); 
      if (newView === 'week') {
           setCurrentDate(prevDate => getDateToFetch(prevDate, 0, 'week'));
      }
  };
  
  const formatDate = (date) => new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).format(date);
  
  const getDaysToDisplay = (startOfView) => {
      const days = [];
      const numDays = view === 'list' ? 1 : 3;
      for (let i = 0; i < numDays; i++) {
          const day = new Date(startOfView);
          day.setDate(startOfView.getDate() + i);
          days.push(day);
      }
      return days;
  };
  
  const getWeekRangeString = () => {
      const startOfView = getDateToFetch(currentDate, weekOffset, view);
      const endOfView = new Date(startOfView);
      endOfView.setDate(startOfView.getDate() + 2); 
      return `${startOfView.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })} - ${endOfView.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}`;
  };
  
  // --- NOVA FUNÇÃO: Cria o link do WhatsApp ---
  const createWhatsAppLink = (appt) => {
      const phone = appt.clientPhone.replace(/\D/g, ''); // Remove caracteres não numéricos
      const date = new Date(appt.startTime).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      const time = new Date(appt.startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      const serviceName = Array.isArray(appt.services) ? appt.services.map(s => s.name).join(', ') : (appt.serviceName || 'Serviço');
      
      const professionalName = appt.professionalName || 'o profissional';

      const message = `Olá, ${appt.clientName}! Seu agendamento de ${serviceName} com ${professionalName} para ${date} às ${time} está confirmado. Podemos te esperar nesse dia e horário?.`;

      return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  
  const renderContentList = () => {
      const filteredAppointments = appointments.filter(appt => selectedProfessional === 'all' || appt.professionalId === selectedProfessional);
      if (isLoading) return <div className="text-center p-10 text-gray-500">A carregar agendamentos...</div>;
      if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
      if (filteredAppointments.length === 0) return <div className="text-center p-10 text-gray-500">Nenhum agendamento para este dia.</div>;
      
      return filteredAppointments.map(appt => {
          const serviceName = Array.isArray(appt.services) ? appt.services.map(s => s.name).join(', ') : (appt.serviceName || 'Serviço');
          const isCompleted = appt.status === 'completed';
          const whatsappLink = createWhatsAppLink(appt);
          
          return (
              <div key={appt.id} onClick={() => onNavigateToComanda(appt.id)} className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${isCompleted ? 'border-green-500 opacity-70' : 'border-blue-500'} cursor-pointer`}>
                  <div className="flex items-start justify-between">
                      <div>
                          <span className="font-bold text-lg text-gray-800">{new Date(appt.startTime).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</span>
                          <span className={`ml-2 text-xs font-semibold px-2 py-1 rounded-full ${isCompleted ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{isCompleted ? 'Finalizado' : 'Confirmado'}</span>
                      </div>
                      <div className="relative flex items-center gap-2">
                          {/* BOTÃO DO WHATSAPP */}
                          {!isCompleted && (
                              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-1 rounded-full hover:bg-green-100 transition-colors" title="Enviar Confirmação WhatsApp">
                                  {icons.whatsapp()}
                              </a>
                          )}
                      
                          <button onClick={(e) => { e.stopPropagation(); setActionMenuOpenId(actionMenuOpenId === appt.id ? null : appt.id) }} className="p-1 rounded-full hover:bg-gray-100">{icons.dots()}</button>
                          {actionMenuOpenId === appt.id && (
                              <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-md shadow-lg border z-10">
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

  const renderContentWeek = () => {
    const filteredAppointments = appointments.filter(appt => selectedProfessional === 'all' || appt.professionalId === selectedProfessional);
    if (isLoading) return <div className="text-center p-10 text-gray-500 col-span-full">A carregar agendamentos...</div>;
    if (error) return <div className="text-center p-10 text-red-500 col-span-full">{error}</div>;

    const startOfView = getDateToFetch(currentDate, weekOffset, view);
    const daysToDisplay = getDaysToDisplay(startOfView);
    const today = new Date();
    today.setHours(0,0,0,0);

    return daysToDisplay.map(day => {
        const isCurrentDay = day.toDateString() === today.toDateString();
        const dayEvents = filteredAppointments.filter(appt => new Date(appt.startTime).toDateString() === day.toDateString());
        
        return (
            <div key={day.toISOString()} className="day-column">
                <div className={`day-header ${isCurrentDay ? 'current-day text-indigo-600' : ''}`}>
                    <p className="font-bold">{day.toLocaleDateString('pt-BR', { weekday: 'short' })}</p>
                    <p className="text-sm">{day.getDate()}/{day.getMonth() + 1}</p>
                </div>
                <div className="day-content p-2 space-y-2">
                    {dayEvents.length > 0 ? dayEvents.map(appt => {
                        const serviceName = Array.isArray(appt.services) ? appt.services.map(s => s.name).join(', ') : (appt.serviceName || 'Serviço');
                        const isCompleted = appt.status === 'completed';
                        const whatsappLink = createWhatsAppLink(appt);
                        const professional = professionals.find(p => p.id === appt.professionalId);
                        
                        return (
                            <div key={appt.id} onClick={() => onNavigateToComanda(appt.id)} className={`bg-white p-2 rounded-lg shadow-sm border-l-4 ${isCompleted ? 'border-green-500 opacity-70' : 'border-blue-500'} cursor-pointer`}>
                                <div className="flex justify-between items-center">
                                    <div className="flex-1 flex items-center space-x-2">
                                        <img src={professional?.photo || 'https://placehold.co/60x60'} alt={appt.professionalName} className="w-8 h-8 rounded-full object-cover"/>
                                        <div>
                                            <p className="text-xs font-bold text-gray-800">{new Date(appt.startTime).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</p>
                                            <p className="text-xs text-gray-600">{appt.clientName}</p>
                                        </div>
                                    </div>
                                    {!isCompleted && (
                                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-1 rounded-full hover:bg-green-100 transition-colors" title="Enviar Confirmação WhatsApp">
                                            {icons.whatsapp('currentColor')}
                                        </a>
                                    )}
                                </div>
                            </div>
                        );
                    }) : <p className="text-xs text-gray-400 text-center">Nenhum evento</p>}
                </div>
            </div>
        );
    });
};


  return (
      <div className="relative h-full flex flex-col">
          <div className="flex-shrink-0 p-4 bg-white border-b border-gray-200">
              <div className="flex justify-center mb-4">
                  <div className="flex items-center gap-1 rounded-lg bg-gray-200 p-1">
                      <button onClick={() => handleSetView('list')} className={`view-btn ${view === 'list' ? 'active' : ''}`}>Dia</button>
                      <button onClick={() => handleSetView('week')} className={`view-btn ${view === 'week' ? 'active' : ''}`}>Semana</button>
                  </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                  <button onClick={() => changeDate(-1)} className="p-2 rounded-full hover:bg-gray-100">&lt;</button>
                  <h3 className="font-semibold text-gray-800">
                      {view === 'list' ? formatDate(currentDate) : getWeekRangeString()}
                  </h3>
                  <button onClick={() => changeDate(1)} className="p-2 rounded-full hover:bg-gray-100">&gt;</button>
              </div>
          </div>
          
          <ProfessionalSelector
              professionals={professionals}
              selectedProfessional={selectedProfessional}
              onSelect={setSelectedProfessional}
              canViewAll={canViewAll}
          />

          <div className="flex-1 overflow-y-auto p-4">
              {view === 'list' ? (
                  <div className="space-y-4">{renderContentList()}</div>
              ) : (
                  <div className="agenda-week-view h-full">{renderContentWeek()}</div>
              )}
          </div>
          <button onClick={() => setModalState({ isOpen: true, appointment: null })} className="fixed bottom-20 right-6 bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700">{icons.plus('white')}</button>
          <AppointmentModal isOpen={modalState.isOpen} onClose={() => setModalState({ isOpen: false, appointment: null })} onSave={handleSaveAppointment} appointmentToEdit={modalState.appointment} user={user} showNotification={showNotification} />
          <ConfirmationModal isOpen={confirmState.isOpen} onClose={() => setConfirmState({ isOpen: false, appointmentId: null })} onConfirm={() => handleDelete(confirmState.appointmentId)} title="Apagar Agendamento" message="Tem a certeza que deseja apagar este agendamento?" />
      </div>
  );
};

// ... (Rest of the file is unchanged)