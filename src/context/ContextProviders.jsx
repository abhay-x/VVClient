import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { AuthContext } from './AuthContext';
import { StateContext } from './StateContext';

const AppProviders = ({ children }) => {
    const { user, isAuthenticated, login, logout, register } = useAuth();
    const [accountModalShow, setAccountModalShow] = useState(false);
    useEffect(() => {
        // Check if the user is authenticated, and if so, close the account modal
        if (isAuthenticated) {
            setAccountModalShow(false);
        }
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ user, loginState: isAuthenticated, login, logout, register }}>
            <StateContext.Provider value={{ accountModalShow, setAccountModalShow }}>
                {children}
            </StateContext.Provider>
        </AuthContext.Provider>
    );
};

export default AppProviders;


