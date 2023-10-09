import { createContext } from 'react';

export const StateContext = createContext({
    accountModalShow: false,
    setAccountModalShow: () => { },
    sidebarOpen: false,
    setSidebarOpen: () => { },
});