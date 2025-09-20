import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const auth = getAuth();

export const LoginScreen = ({ onLoginSuccess }) => {
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
