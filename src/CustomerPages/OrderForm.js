import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useOrder } from '../ContextApi/OrderContext';  // Import the context
import '../CustomerPages_css/Order.css';

const OrderForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { storeOrder } = useOrder();  // Destructure storeOrder from context

    const { name, price, orderQuantity, totalPrice, imageUrls } = location.state || {};

    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!location.state) {
            setError('No order data available. Please go back and select a product.');
        }
    }, [location.state]);

    const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
    const handleAddressChange = (e) => setAddress({ ...address, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !price || !orderQuantity || !totalPrice) {
            setError('Missing order details.');
            return;
        }

        const orderData = {
            name,
            price,
            orderQuantity,
            totalPrice,
            address,
            phoneNumber,
            imageUrls,
        };

        try {
            const response = await fetch('http://localhost:3000/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                setIsSubmitted(true);
                storeOrder(orderData); // Store the order data in the context after successful submission
                // Optionally, navigate to a confirmation page
            } else {
                setError('Failed to submit order. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="order-form">
            <h1 className="order-form-title">Order Form</h1>
            
            {isSubmitted ? (
                <div className="order-success">
                    <h2>Order successfully placed!</h2>
                    <p>Redirecting to your account...</p>
                </div>
            ) : (
                <div className="order-form-container">
                    {error && <div className="order-error">{error}</div>}

                    {name ? (
                        <>
                            <div className="order-item">
                                <div className="order-item-image">
                                    {imageUrls && imageUrls.length > 0 && (
                                        <img src={imageUrls[0]} alt={name} className="order-item-img" />
                                    )}
                                </div>
                                <div className="order-item-details">
                                    <h3>{name}</h3>
                                    <p>Quantity: {orderQuantity}</p>
                                    <p>Price per item: ₹{price}</p>
                                    <p>Total Price: <strong>₹{totalPrice}</strong></p>
                                </div>
                            </div>

                            <form className="order-form-fields" onSubmit={handleSubmit}>
                                <label htmlFor="street">Street Address:</label>
                                <input type="text" id="street" name="street" value={address.street} onChange={handleAddressChange} required />

                                <label htmlFor="city">City:</label>
                                <input type="text" id="city" name="city" value={address.city} onChange={handleAddressChange} required />

                                <label htmlFor="state">State:</label>
                                <input type="text" id="state" name="state" value={address.state} onChange={handleAddressChange} required />

                                <label htmlFor="postalCode">Postal Code:</label>
                                <input type="text" id="postalCode" name="postalCode" value={address.postalCode} onChange={handleAddressChange} required />

                                <label htmlFor="country">Country:</label>
                                <input type="text" id="country" name="country" value={address.country} onChange={handleAddressChange} required />

                                <label htmlFor="phone">Phone Number:</label>
                                <input type="tel" id="phone" name="phone" value={phoneNumber} onChange={handlePhoneNumberChange} required />

                                <button type="submit" className="order-form-submit">Place Order</button>
                            </form>
                        </>
                    ) : (
                        <div>No order data available. Please go back and select a product.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default OrderForm;
