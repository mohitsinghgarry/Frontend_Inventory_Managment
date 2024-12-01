import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserContext = createContext(null);

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(() => {
        const savedData = localStorage.getItem('userData');
        return savedData ? JSON.parse(savedData) : null;
    });

    const saveUserData = (data) => {
        setUserData(data);
        localStorage.setItem('userData', JSON.stringify(data));
    };

    const clearUserData = () => {
        setUserData(null);
        localStorage.removeItem('userData');
        localStorage.removeItem('authToken'); // Ensure token is cleared
    };

    const logout = () => {
        console.log('Logout triggered');
        clearUserData();
        toast.success('You have successfully logged out!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <UserContext.Provider value={{ userData, setUserData: saveUserData, clearUserData, logout }}>
            {children}
        </UserContext.Provider>
    );
};
