import { createContext } from 'react';

export const AuthContext = createContext({
    user: {},
    loginState: false,
    login: () => { },
    logout: () => { },
    register: () => { },
});