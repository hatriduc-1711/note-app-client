import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = auth.onIdTokenChanged((user) => {
            if (user?.uid) {
                setUser(user);
                localStorage.setItem('accessToken', user.accessToken);
                return;
            }

            setUser({});
            localStorage.clear();
            navigate('/login');
        });

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
