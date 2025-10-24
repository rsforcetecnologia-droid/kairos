
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


// --- Ecrã da Agenda ---
const AgendaScreen = ({ user }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalState, setModalState] = useState({ isOpen: false, appointment: null });
  const [confirmState, setConfirmState] = useState({ isOpen: false, appointmentId: null });
  const [actionMenuOpenId, setActionMenuOpenId] = useState(null);

  const fetchAppointments = async () => {
    if (!user) return;
    setIsLoading(true);
    setError(null);
    try {
      const startOfDay = new Date(currentDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(currentDate);
      endOfDay.setHours(23, 59, 59, 999);
      const url = `/api/appointments/${user.establishmentId}?startDate=${startOfDay.toISOString()}&endDate=${endOfDay.toISOString()}`;
      const response = await fetch(url, { headers: { 'Authorization': `Bearer ${user.token}` } });
      if (!response.ok) {
          const err = await response.json();
          throw new Error(err.message || 'Falha ao buscar agendamentos.');
      }
      const data = await response.json();
      setAppointments(data.sort((a,b) => new Date(a.startTime) - new Date(b.startTime)));
    } catch (err) {
      setError('Falha ao carregar os dados da agenda.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [currentDate, user]);

  const handleSaveAppointment = async (appointmentData) => {
      const isEditing = !!appointmentData.id;
      const url = isEditing ? `/api/appointments/${appointmentData.id}` : '/api/appointments';
      const method = isEditing ? 'PUT' : 'POST';

      try {
          const response = await fetch(url, {
              method,
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
              body: JSON.stringify(appointmentData)
          });
          if (!response.ok) {
              const err = await response.json();
              throw new Error(err.message || 'Falha ao salvar agendamento.');
          }
          await fetchAppointments();
      } catch (err) {
          console.error("Erro ao salvar agendamento:", err);
      }
  };

  const handleDelete = async (appointmentId) => {
      try {
          const response = await fetch(`/api/appointments/${appointmentId}`, {
              method: 'DELETE',
              headers: { 'Authorization': `Bearer ${user.token}` }
          });
          if (!response.ok) {
              const err = await response.json();
              throw new Error(err.message || 'Falha ao apagar agendamento.');
          }
          await fetchAppointments();
      } catch(err) {
          console.error("Erro ao apagar agendamento:", err);
      } finally {
          setConfirmState({ isOpen: false, appointmentId: null });
      }
  };

  const changeDate = (amount) => {
      setCurrentDate(prevDate => {
          const newDate = new Date(prevDate);
          newDate.setDate(newDate.getDate() + amount);
          return newDate;
      });
  };

  const formatDate = (date) => new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).format(date);

  const renderContent = () => {
    if (isLoading) return <div className="text-center p-10 text-gray-500">A carregar agendamentos...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
    if (appointments.length === 0) return <div className="text-center p-10 text-gray-500">Nenhum agendamento para este dia.</div>;
    return appointments.map(appt => (
      <div key={appt.id} className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${appt.status === 'completed' ? 'border-green-500 opacity-70' : 'border-blue-500'}`}>
        <div className="flex items-start justify-between">
          <div>
            <span className="font-bold text-lg text-gray-800">{new Date(appt.startTime).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</span>
            <span className={`ml-2 text-xs font-semibold px-2 py-1 rounded-full ${appt.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{appt.status === 'completed' ? 'Finalizado' : 'Confirmado'}</span>
          </div>
          <div className="relative">
            <button onClick={() => setActionMenuOpenId(actionMenuOpenId === appt.id ? null : appt.id)} className="p-1 rounded-full hover:bg-gray-100">{icons.dots()}</button>
            {actionMenuOpenId === appt.id && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border z-10">
                <button onClick={() => { setModalState({ isOpen: true, appointment: appt }); setActionMenuOpenId(null); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Editar</button>
                <button onClick={() => { setConfirmState({ isOpen: true, appointmentId: appt.id }); setActionMenuOpenId(null); }} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Apagar</button>
              </div>
            )}
          </div>
        </div>
        <div className="mt-2"><p className="font-bold text-gray-900">{appt.clientName}</p><p className="text-sm text-gray-600">{appt.serviceName}</p><p className="text-sm text-gray-500 mt-1">com {appt.professionalName}</p></div>
      </div>
    ));
  };

  return (
    <div className="relative h-full">
      <div className="p-4 bg-white border-b border-gray-200"><div className="flex items-center justify-between"><button onClick={() => changeDate(-1)} className="p-2 rounded-full hover:bg-gray-100">&lt;</button><h3 className="font-semibold text-gray-800">{formatDate(currentDate)}</h3><button onClick={() => changeDate(1)} className="p-2 rounded-full hover:bg-gray-100">&gt;</button></div></div>
      <div className="p-4 space-y-4">{renderContent()}</div>
      <button onClick={() => setModalState({ isOpen: true, appointment: null })} className="absolute bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700">{icons.plus('white')}</button>
      <AppointmentModal isOpen={modalState.isOpen} onClose={() => setModalState({ isOpen: false, appointment: null })} onSave={handleSaveAppointment} appointmentToEdit={modalState.appointment} user={user} />
      <ConfirmationModal isOpen={confirmState.isOpen} onClose={() => setConfirmState({ isOpen: false, appointmentId: null })} onConfirm={() => handleDelete(confirmState.appointmentId)} title="Apagar Agendamento" message="Tem a certeza que deseja apagar este agendamento?" />
    </div>
  );
};

// --- Modal para Adicionar Itens à Comanda ---
const AddItemModal = ({ isOpen, onClose, onAddItem }) => {
    if (!isOpen) return null;
    const services = [ { name: 'Hidratação', price: 40.00, type: 'Serviço' }, { name: 'Pintura', price: 70.00, type: 'Serviço' } ];
    const products = [ { name: 'Pomada Modeladora', price: 35.00, type: 'Produto' }, { name: 'Óleo para Barba', price: 25.00, type: 'Produto' } ];
    const handleItemClick = (item) => { onAddItem(item); onClose(); };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm m-4">
                <div className="p-4 border-b flex justify-between items-center"><h3 className="text-xl font-bold text-gray-800">Adicionar Item</h3><button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button></div>
                <div className="p-4 max-h-80 overflow-y-auto"><h4 className="font-semibold text-gray-700 mb-2">Serviços</h4><div className="space-y-2">{services.map((item, i) => (<button key={`s-${i}`} onClick={() => handleItemClick(item)} className="w-full flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100"><span>{item.name}</span><span className="font-semibold">R$ {item.price.toFixed(2)}</span></button>))}</div><h4 className="font-semibold text-gray-700 mt-4 mb-2">Produtos</h4><div className="space-y-2">{products.map((item, i) => (<button key={`p-${i}`} onClick={() => handleItemClick(item)} className="w-full flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100"><span>{item.name}</span><span className="font-semibold">R$ {item.price.toFixed(2)}</span></button>))}</div></div>
            </div>
        </div>
    );
};

// --- Modal de Detalhes da Comanda ---
const ComandaDetailModal = ({ comanda, isOpen, onClose, onUpdateComanda, user }) => {
    if (!isOpen || !comanda) return null;
    const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleFinalize = async () => {
        setIsSaving(true);
        try {
            const paymentData = {
                payments: [{ method: 'Dinheiro', value: comanda.total }],
                totalAmount: comanda.total
            };
            const response = await fetch(`/api/appointments/${comanda.id}/checkout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
                body: JSON.stringify(paymentData)
            });
            if (!response.ok) throw new Error('Falha ao finalizar pagamento.');
            onUpdateComanda({ ...comanda, status: 'completed' });
        } catch (error) {
            console.error("Erro ao finalizar pagamento:", error);
        } finally {
            setIsSaving(false);
            onClose();
        }
    };

    const handleAddItem = async (newItem) => {
        const updatedItems = [...(comanda.comandaItems || comanda.services), newItem];
        try {
             const response = await fetch(`/api/appointments/${comanda.id}/comanda`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
                body: JSON.stringify({ items: updatedItems })
            });
            if (!response.ok) throw new Error('Falha ao adicionar item.');
            const updatedComanda = { ...comanda, comandaItems: updatedItems, total: (comanda.total || 0) + newItem.price };
            onUpdateComanda(updatedComanda);
        } catch (error) {
            console.error("Erro ao adicionar item:", error);
        }
    };

    const comandaItems = comanda.comandaItems || comanda.services;

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-sm m-4">
                    <div className="p-4 border-b"><h3 className="text-xl font-bold text-gray-800">Detalhes da Comanda</h3><p className="text-sm text-gray-600">{comanda.clientName} com {comanda.professionalName}</p></div>
                    <div className="p-4 space-y-2 max-h-64 overflow-y-auto">{comandaItems.map((item, index) => (<div key={index} className="flex justify-between items-center"><div><p className="font-semibold text-gray-800">{item.name}</p></div><p className="text-gray-700">R$ {item.price.toFixed(2)}</p></div>))}</div>
                    <div className="p-4 border-t flex justify-between items-center"><span className="font-bold text-lg">Total</span><span className="font-bold text-xl text-gray-900">R$ {(comanda.total || comanda.services.reduce((acc, s) => acc + s.price, 0)).toFixed(2)}</span></div>
                    <div className="p-4 bg-gray-50 space-y-2">
                        <button onClick={() => setIsAddItemModalOpen(true)} className="w-full py-2 px-4 bg-blue-100 text-blue-700 font-semibold rounded-lg hover:bg-blue-200">Adicionar Item</button>
                        <div className="flex gap-4">
                            <button onClick={onClose} className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300">Fechar</button>
                            <button onClick={handleFinalize} disabled={isSaving} className="flex-1 py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400">{isSaving ? 'A finalizar...' : 'Finalizar Pagamento'}</button>
                        </div>
                    </div>
                </div>
            </div>
            <AddItemModal isOpen={isAddItemModalOpen} onClose={() => setIsAddItemModalOpen(false)} onAddItem={handleAddItem} />
        </>
    );
};


// --- Ecrã de Comandas ---
const ComandasScreen = ({ user }) => {
    const [activeFilter, setActiveFilter] = useState('atendimento');
    const [allComandas, setAllComandas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedComanda, setSelectedComanda] = useState(null);

    const fetchComandas = async () => {
        if (!user) return;
        setIsLoading(true);
        setError(null);
        try {
            const url = `/api/comandas/${user.establishmentId}`;
            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || 'Falha ao buscar comandas.');
            }
            const data = await response.json();
            setAllComandas(data);
        } catch (err) {
            setError('Falha ao carregar as comandas.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchComandas();
    }, [user]);

    const handleUpdateComanda = (updatedComanda) => {
        setAllComandas(prev => {
            const index = prev.findIndex(c => c.id === updatedComanda.id);
            if (index > -1) {
                const newComandas = [...prev];
                newComandas[index] = updatedComanda;
                return newComandas;
            }
            return prev;
        });
        fetchComandas();
    };

    const statusMap = {
        atendimento: { label: 'Em Atendimento', statusValue: 'confirmed' },
        pagamento: { label: 'Aguardando Pagamento', statusValue: 'awaiting_payment' },
        finalizada: { label: 'Finalizadas', statusValue: 'completed' },
    };

    const renderContent = () => {
        if (isLoading) return <div className="text-center py-10"><p className="text-gray-500">A carregar comandas...</p></div>;
        if (error) return <div className="text-center py-10"><p className="text-red-500">{error}</p></div>;

        const currentStatus = statusMap[activeFilter].statusValue;
        const filteredComandas = allComandas.filter(c => c.status === currentStatus);

        if (filteredComandas.length === 0) return <div className="text-center py-10"><p className="text-gray-500">Nenhuma comanda encontrada para este filtro.</p></div>;

        return filteredComandas.map(comanda => {
            const total = (comanda.comandaItems || comanda.services || []).reduce((acc, item) => acc + item.price, 0);
            return (
                <div key={comanda.id} onClick={() => setSelectedComanda({...comanda, total})} className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${activeFilter === 'atendimento' ? 'border-blue-500' : activeFilter === 'pagamento' ? 'border-yellow-500' : 'border-green-500'} cursor-pointer`}>
                    <div className="flex justify-between items-start">
                        <div><p className="font-bold text-gray-900">{comanda.clientName}</p><p className="text-sm text-gray-500">com {comanda.professionalName}</p></div>
                        <div className="text-right"><p className="font-bold text-lg text-gray-800">R$ {total.toFixed(2)}</p><p className="text-xs text-gray-500">{new Date(comanda.startTime).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</p></div>
                    </div>
                </div>
            )
        });
    };

    return (
        <div className="h-full flex flex-col">
            <div className="p-2 bg-white border-b border-gray-200"><div className="flex bg-gray-100 rounded-lg p-1">{Object.keys(statusMap).map(key => (<button key={key} onClick={() => setActiveFilter(key)} className={`flex-1 text-sm font-semibold py-2 rounded-md transition-colors ${activeFilter === key ? 'bg-white text-blue-600 shadow' : 'text-gray-600'}`}>{statusMap[key].label}</button>))}</div></div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">{renderContent()}</div>
            <ComandaDetailModal comanda={selectedComanda} isOpen={!!selectedComanda} onClose={() => setSelectedComanda(null)} onUpdateComanda={handleUpdateComanda} user={user} />
        </div>
    );
};

// --- Ecrã de Relatórios ---
const RelatoriosScreen = ({ user }) => {
    const [kpis, setKpis] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            if (!user) return;
            setIsLoading(true);
            setError(null);
            try {
                const url = `/api/analytics/${user.establishmentId}`;
                const response = await fetch(url, {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                if (!response.ok) {
                    const err = await response.json();
                    throw new Error(err.message || 'Falha ao buscar relatórios.');
                }
                const data = await response.json();

                setKpis(data.kpis);
                setChartData({
                    labels: data.appointmentsByMonth.map(item => item.month),
                    datasets: [{
                        label: 'Agendamentos',
                        data: data.appointmentsByMonth.map(item => item.count),
                        backgroundColor: 'rgba(59, 130, 246, 0.5)',
                        borderColor: 'rgba(59, 130, 246, 1)',
                        borderWidth: 1,
                    }]
                });

            } catch (err) {
                setError('Falha ao carregar os relatórios.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchReports();
    }, [user]);

    const chartOptions = { responsive: true, plugins: { legend: { display: false }, title: { display: false }, }, scales: { y: { beginAtZero: true } } };

    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

    return (
        <div className="p-4 space-y-6 animate-pulse">
            <div className={`p-4 space-y-6 ${!isLoading && 'animate-none'}`}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-md text-center">
                        <p className="text-sm text-gray-500">Receita Total</p>
                        {isLoading ? <div className="h-8 bg-gray-200 rounded-md mt-1"></div> : <p className="text-2xl font-bold text-green-600">R$ {kpis.totalRevenue.toFixed(2)}</p>}
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md text-center">
                        <p className="text-sm text-gray-500">Atendimentos</p>
                        {isLoading ? <div className="h-8 bg-gray-200 rounded-md mt-1"></div> : <p className="text-2xl font-bold text-blue-600">{kpis.totalAppointments}</p>}
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                    <p className="text-sm text-gray-500">Serviço Mais Popular</p>
                    {isLoading ? <div className="h-7 bg-gray-200 rounded-md mt-1 w-3/4 mx-auto"></div> : <p className="text-xl font-bold text-indigo-600">{kpis.mostPopularService}</p>}
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-semibold text-gray-800 mb-4">Agendamentos por Mês</h3>
                    {isLoading ? <div className="h-48 bg-gray-200 rounded-md"></div> : <Bar options={chartOptions} data={chartData} />}
                </div>
            </div>
        </div>
    );
};

// --- NOVO: Ecrã de Gestão ---
const GestaoScreen = ({ user, onLogout, onNavigate }) => {
    return (
        <div className="p-4 space-y-6">
            {/* Perfil do Usuário */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-3xl">
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h3 className="font-bold text-xl text-gray-900">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                </div>
            </div>

            {/* Menu de Gestão */}
            <div className="bg-white rounded-lg shadow-md">
                <button onClick={() => onNavigate('Servicos')} className="w-full text-left p-4 border-b text-gray-700 hover:bg-gray-50">Gerir Serviços</button>
                <button className="w-full text-left p-4 border-b text-gray-700 hover:bg-gray-50">Gerir Produtos</button>
                <button className="w-full text-left p-4 text-gray-700 hover:bg-gray-50">Gerir Equipa</button>
            </div>

            {/* Ações */}
            <div className="pt-4">
                 <button 
                    onClick={onLogout}
                    className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-colors"
                >
                    Sair
                </button>
            </div>
        </div>
    );
};


// --- Ecrã Principal da Aplicação (Dashboard) ---
const MainScreen = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('Agenda');
  const [currentManagementScreen, setCurrentManagementScreen] = useState('menu'); // 'menu', 'Servicos', etc.

  const tabs = [
    { name: 'Agenda', icon: 'agenda' },
    { name: 'Comandas', icon: 'comandas' },
    { name: 'Relatórios', icon: 'relatorios' },
    { name: 'Gestão', icon: 'gestao' },
  ];

  const handleManagementNavigation = (screen) => {
      setCurrentManagementScreen(screen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Agenda':
        return <AgendaScreen user={user} />;
      case 'Comandas':
        return <ComandasScreen user={user} />;
      case 'Relatórios':
        return <RelatoriosScreen user={user} />;
      case 'Gestão':
        switch (currentManagementScreen) {
            case 'menu':
                return <GestaoScreen user={user} onLogout={onLogout} onNavigate={handleManagementNavigation} />;
            // Adicionar cases para outros ecrãs de gestão aqui
            // case 'Servicos':
            //     return <ServicosScreen user={user} onBack={() => setCurrentManagementScreen('menu')} />;
            default:
                return <GestaoScreen user={user} onLogout={onLogout} onNavigate={handleManagementNavigation} />;
        }
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-100 font-sans">
      <header className="bg-white shadow-md p-4">
        <h1 className="text-xl font-bold text-gray-900 text-center">
            {activeTab === 'Gestão' ? (currentManagementScreen === 'menu' ? 'Gestão' : currentManagementScreen) : activeTab}
        </h1>
      </header>

      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>

      <nav className="bg-white border-t border-gray-200">
        <div className="flex justify-around max-w-md mx-auto">
          {tabs.map(tab => (
            <button key={tab.name} onClick={() => { setActiveTab(tab.name); setCurrentManagementScreen('menu'); }} className="flex-1 flex flex-col items-center justify-center py-2 transition-colors">
              {icons[tab.icon](activeTab === tab.name ? '#3B82F6' : '#6B7280')}
              <span className={`text-xs mt-1 ${activeTab === tab.name ? 'text-blue-600 font-bold' : 'text-gray-500'}`}>
                {tab.name}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

// --- Componente Raiz da Aplicação ---
const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLoginSuccess = (userData) => {
      setLoggedInUser(userData);
  };

  const handleLogout = () => {
      signOut(auth);
      setLoggedInUser(null);
  };

  if (loggedInUser) {
    return <MainScreen user={loggedInUser} onLogout={handleLogout} />;
  } else {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }
};

export default App;
