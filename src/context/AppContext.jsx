import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    //determine login state?
    const apiUrl = import.meta.env.VITE_API_URL;
    const [user, setUser] = useState();
    const [loginState, setLoginState] = useState(false);
    const [showAccountModal, setAccountModal] = useState(false);
    const toggleAccountModal = () => setAccountModal(!showAccountModal);

    return (
        <AppContext.Provider value={{
            apiUrl, user, setUser, loginState, setLoginState, showAccountModal, toggleAccountModal
        }}>
            {children}
        </AppContext.Provider>
    );
};
