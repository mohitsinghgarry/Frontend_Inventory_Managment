import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalBill, setTotalBill] = useState(0);
    const [error, setError] = useState('');

    // Load cart data from localStorage when the component mounts
    useEffect(() => {
        const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const savedTotalBill = JSON.parse(localStorage.getItem('totalBill')) || 0;
        setCartItems(savedCartItems);
        setTotalBill(savedTotalBill);
    }, []);

    // Save cart data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('totalBill', JSON.stringify(totalBill));
    }, [cartItems, totalBill]);

    const addItemToCart = (newItem) => {
        setError(''); // Clear previous error
        const existingItem = cartItems.find(item => item.name === newItem.name);

        // If item already exists in cart
        if (existingItem) {
            const updatedQuantity = existingItem.orderQuantity + newItem.orderQuantity;

            // Check if the updated quantity exceeds the available stock
            if (updatedQuantity > newItem.availableQuantity) {
                setError(`Only ${newItem.availableQuantity} of ${newItem.name} are available.`);
                return;
            }

            // Update the existing item's quantity
            const updatedItems = cartItems.map(item =>
                item.name === newItem.name
                    ? { ...item, orderQuantity: updatedQuantity }
                    : item
            );
            setCartItems(updatedItems);
            setTotalBill(prevTotal => prevTotal + newItem.price * newItem.orderQuantity);
        } else {
            // New item, check if it exceeds available stock
            if (newItem.orderQuantity > newItem.availableQuantity) {
                setError(`Only ${newItem.availableQuantity} of ${newItem.name} are available.`);
                return;
            }

            // Add the new item to the cart
            setCartItems(prevItems => [...prevItems, newItem]);
            setTotalBill(prevTotal => prevTotal + newItem.price * newItem.orderQuantity);
        }
    };

    const removeItemFromCart = (itemName) => {
        setCartItems(prevItems => {
            const itemToRemove = prevItems.find(item => item.name === itemName);
            if (itemToRemove) {
                setTotalBill(prevTotal => prevTotal - (itemToRemove.price * itemToRemove.orderQuantity));
                return prevItems.filter(item => item.name !== itemName);
            }
            return prevItems;
        });
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addItemToCart,
            removeItemFromCart,
            totalBill,
            error
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
