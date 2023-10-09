import { useState, useEffect, useCallback } from 'react';
import useHttpClient from './useHttpClient';

export const useAuth = () => {
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { loading, sendRequest } = useHttpClient();

    // Function to perform login
    const login = async (user) => {
        try {
            const responseData = await sendRequest({ endpoint: '/login', method: 'POST', requestData: user });
            let response = { status: responseData.status, message: null };
            if (responseData.status === 'success') {
                setUser(responseData.data); //setting directly without check res
                setIsAuthenticated(true);
                responseData.data.expire = new Date().getTime() + 345600000;
                localStorage.setItem('userData', JSON.stringify({ user: responseData.data }));
                console.log('Login successful!', responseData.data);
                response.message = 'Login successful!';
            } else {
                response.message = responseData.error;
                console.error('Login failed:', responseData.error);
            }
            return response;
        } catch (error) {
            console.error('An error occurred during login:', error);
        }
    };


    // Function to perform logout, clearing tokens, cookies, or any other state
    const logout = async () => {
        console.log("logging out!!")
        sendRequest({ endpoint: `/logout/${user.username}/${user.token}`, method: 'GET' })
            .then((response) => {
                if (response.status === 'success') {
                    setIsAuthenticated(false);
                    setUser(null);
                    localStorage.clear();
                } else {
                    console.error('Logout failed:', response.error);
                }
            })
            .catch((error) => {
                console.error('An error occurred during logout:', error);
            });

    };

    const register = async (user) => {
        try {
            const responseData = await sendRequest({ endpoint: '/register', method: 'POST', requestData: user });
            let response = { status: responseData.status, message: null };
            if (responseData.status === 'success') {
                setUser(responseData.data);
                setIsAuthenticated(true);
                responseData.data.expire = new Date().getTime() + 345600000;
                localStorage.setItem('userData', JSON.stringify({ user: responseData.data }));
                response.message = 'Register successful!';
                console.log('Register successful!', responseData.data);
            } else {
                response.message = responseData.error
                console.error('Register failed:', responseData.error);
            }
            return response;
        } catch (error) {
            console.error('An error occurred during Register:', error);
        }
    };

    // Use useEffect to check authentication status on component mount
    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            // console.log(new Date(userData.user.expire))

            if (userData && new Date(userData.user.expire) > new Date()) {
                console.log("User is authenticated already!");
                setUser(userData.user);
                setIsAuthenticated(true);
            } else {
                console.log("Token has expired. User is not authenticated.");
                setIsAuthenticated(false);
                logout();
            }
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return { user, isAuthenticated, login, logout, register };
};
