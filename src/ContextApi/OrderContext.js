import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useUser } from '../Login _signup_pages/UserContext'; // Import UserContext for user-specific data

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const { userData } = useUser(); // Get current user's data

    // Function to fetch orders
    const fetchOrders = useCallback(async () => {
        console.log('Fetching orders...');
        try {
            const token = localStorage.getItem('authToken'); // Retrieve token from local storage
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            const isAdmin = userData?.userType === 'admin'; // Assuming the user's role is in userData
            const url = isAdmin
                ? 'https://backend-inventory-management-1-fxba.onrender.com/api/getorders/all' // Admin-specific API to fetch all orders
                : 'https://backend-inventory-management-1-fxba.onrender.com/api/getorders'; // Regular API for user-specific orders

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`, // Add Authorization header
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }

            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }, [userData]);

    // Other CRUD functions
    const addOrder = (newOrder) => {
        setOrders((prevOrders) => [...prevOrders, newOrder]);
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            const response = await fetch(`https://backend-inventory-management-1-fxba.onrender.com/api/order/${orderId}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) throw new Error('Failed to update order status');

            console.log('Order status updated successfully');
            await fetchOrders(); // Fetch the updated orders list
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const deleteOrder = async (orderId) => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            const response = await fetch(`https://backend-inventory-management-1-fxba.onrender.com/api/${orderId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Failed to delete the order');

            console.log('Order deleted successfully');
            await fetchOrders(); // Fetch the updated orders list
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    // Fetch orders when `userData` or token changes
    useEffect(() => {
        if (userData && localStorage.getItem('authToken')) {
            fetchOrders();
        }
    }, [userData]);

    return (
        <OrdersContext.Provider
            value={{
                orders,
                fetchOrders,
                addOrder,
                updateOrderStatus,
                deleteOrder,
            }}
        >
            {children}
        </OrdersContext.Provider>
    );
};

export default OrdersContext;
