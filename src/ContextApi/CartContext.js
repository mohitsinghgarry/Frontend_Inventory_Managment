import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalBill, setTotalBill] = useState(0);
    const [error, setError] = useState('');
    const [products, setProducts] = useState([]); // To manage the product list

    // Load cart data and product data from localStorage or backend
    useEffect(() => {
        const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const savedTotalBill = JSON.parse(localStorage.getItem('totalBill')) || 0;
        const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
        setCartItems(savedCartItems);
        setTotalBill(savedTotalBill);
        setProducts(savedProducts); // Load products
    }, []);

    // Save cart data and product data to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('totalBill', JSON.stringify(totalBill));
        localStorage.setItem('products', JSON.stringify(products));
    }, [cartItems, totalBill, products]);

    // Sync cart items with available products
    useEffect(() => {
        const filteredCartItems = cartItems.filter(cartItem =>
            products.some(product => product.name === cartItem.name)
        );
        setCartItems(filteredCartItems);
    }, [products]);

    const addItemToCart = (newItem) => {
        setError(''); // Clear previous error
        const existingItem = cartItems.find(item => item.name === newItem.name);

        if (existingItem) {
            const updatedQuantity = existingItem.orderQuantity + newItem.orderQuantity;

            if (updatedQuantity > newItem.availableQuantity) {
                setError(`Only ${newItem.availableQuantity} of ${newItem.name} are available.`);
                return;
            }

            const updatedItems = cartItems.map(item =>
                item.name === newItem.name
                    ? { ...item, orderQuantity: updatedQuantity }
                    : item
            );
            setCartItems(updatedItems);
            setTotalBill(prevTotal => prevTotal + newItem.price * newItem.orderQuantity);
        } else {
            if (newItem.orderQuantity > newItem.availableQuantity) {
                setError(`Only ${newItem.availableQuantity} of ${newItem.name} are available.`);
                return;
            }

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

    const updateProductList = (updatedProducts) => {
        setProducts(updatedProducts);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addItemToCart,
            removeItemFromCart,
            totalBill,
            error,
            products,
            updateProductList,
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
