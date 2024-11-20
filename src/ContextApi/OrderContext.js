import React, { createContext, useState, useContext, useEffect } from "react";

const OrderContext = createContext();

export const useOrder = () => {
    return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
    const [orderData, setOrderData] = useState(null); // Store order data globally

    // Load order data from localStorage when the provider is initialized
    useEffect(() => {
        const storedOrder = localStorage.getItem("orderData");
        if (storedOrder) {
            setOrderData(JSON.parse(storedOrder));
        }
    }, []);

    const storeOrder = (order) => {
        setOrderData(order);

        // Save the order to localStorage
        try {
            localStorage.setItem("orderData", JSON.stringify(order));
        } catch (error) {
            console.error("Error saving order data to localStorage:", error);
        }
    };

    return (
        <OrderContext.Provider value={{ orderData, storeOrder }}>
            {children}
        </OrderContext.Provider>
    );
};
