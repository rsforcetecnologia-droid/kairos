import { useState, useEffect, useCallback } from 'react';
import { LoginScreen } from './screens/LoginScreen.js';
import { MainScreen } from './screens/MainScreen.js';
import { NotificationModal } from './components/NotificationModal.js';
import { LoadingScreen } from './components/LoadingScreen.js';

const auth = getAuth();

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notification, setNotification] = useState({ isOpen: false, title: '', message: '' });

    const showNotification = useCallback((title, message) => {
        setNotification({ isOpen: true, title, message });
    }, []);

    const handleLoginSuccess = useCallback((userData) => {
        setLoggedInUser(userData);
    }, []);

    const handleLogout = useCallback(() => {
        signOut(auth);
        setLoggedInUser(null);
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const idTokenResult = await user.getIdTokenResult(true);
                    const claims = idTokenResult.claims;
                    if ((claims.role === 'owner' || claims.role === 'employee') && claims.establishmentId) {
                        const userData = { 
                            name: user.displayName, email: user.email, uid: user.uid,
                            token: idTokenResult.token, establishmentId: claims.establishmentId,
                            permissions: claims.permissions
                        };
                        setLoggedInUser(userData);
                    } else { await signOut(auth); }
                } catch (error) {
                    console.error("Auth state error:", error);
                    await signOut(auth);
                }
            } else { setLoggedInUser(null); }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (isLoading) { return <LoadingScreen /> }

    return (
        <React.Fragment>
            {loggedInUser ? 
                <MainScreen user={loggedInUser} onLogout={handleLogout} showNotification={showNotification} /> : 
                <LoginScreen onLoginSuccess={handleLoginSuccess} />
            }
            <NotificationModal 
                isOpen={notification.isOpen} 
                title={notification.title} 
                message={notification.message} 
                onClose={() => setNotification({ isOpen: false, title: '', message: '' })} 
            />
        </React.Fragment>
    );
};

export default App;
