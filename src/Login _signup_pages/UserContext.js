import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context to hold user data
const UserContext = createContext(null);

// Custom hook to access the UserContext
const useUser = () => {
    return useContext(UserContext);
};

// UserProvider component to wrap your application
const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(() => {
        // Retrieve user data from local storage on initial load
        const savedData = localStorage.getItem('userData');
        return savedData ? JSON.parse(savedData) : null;
    });

    const saveUserData = (data) => {
        setUserData(data);
        localStorage.setItem('userData', JSON.stringify(data)); // Save user data to local storage
    };

    const clearUserData = () => {
        setUserData(null);
        localStorage.removeItem('userData'); // Remove user data from local storage
    };

    return (
        <UserContext.Provider value={{ userData, setUserData: saveUserData, clearUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, useUser };
