// js/mobile/screens/GestaoScreen.js

const { React } = window;

const GestaoScreen = ({ user, onLogout, onNavigate }) => {
    return (
        <div className="p-4 space-y-6">
            {/* Perfil do Utilizador */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-3xl">
                    {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                </div>
                <div>
                    <h3 className="font-bold text-xl text-gray-900">{user.name || 'Utilizador'}</h3>
                    <p className="text-gray-600">{user.email}</p>
                </div>
            </div>

            {/* Menu de Gestão */}
            <div className="bg-white rounded-lg shadow-md">
                <button onClick={() => onNavigate('Servicos')} className="w-full text-left p-4 border-b text-gray-700 hover:bg-gray-50">
                    Gerir Serviços
                </button>
                <button onClick={() => onNavigate('Produtos')} className="w-full text-left p-4 border-b text-gray-700 hover:bg-gray-50">
                    Gerir Produtos
                </button>
                <button className="w-full text-left p-4 text-gray-700 hover:bg-gray-50">
                    Gerir Equipa
                </button>
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

export default GestaoScreen;