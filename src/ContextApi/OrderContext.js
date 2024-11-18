// OrderContext.js
import React, { createContext, useState, useContext } from 'react';

const OrderContext = createContext();

export const useOrder = () => {
    return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
    const [orderData, setOrderData] = useState(null); // Store order data globally

    const storeOrder = (order) => {
        setOrderData(order);
    };

    return (
        <OrderContext.Provider value={{ orderData, storeOrder }}>
            {children}
        </OrderContext.Provider>
    );
};
