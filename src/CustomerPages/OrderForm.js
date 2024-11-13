import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../CustomerPages_css/Order.css';

const OrderForm = () => {
    const location = useLocation();
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

    const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
    const handleAddressChange = (e) => setAddress({ ...address, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        const orderData = {
            name,
            price,
            orderQuantity,
            totalPrice,
            address,
            phoneNumber,
        };

        // Simulating order submission (e.g., send to backend)
        console.log('Order Submitted:', orderData);
        setIsSubmitted(true);
    };

    return (
        <div className="order-form">
            <h1 className="order-form-title">Order Form</h1>

            {isSubmitted ? (
                <div className="order-success">
                    <h2>Order Submitted Successfully!</h2>
                    <p>Your order has been placed. We will contact you shortly.</p>
                </div>
            ) : (
                <div className="order-form-container">
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
                            <p className="order-item-total">
                                Total Price: <strong>₹{totalPrice}</strong>
                            </p>
                        </div>
                    </div>

                    <form className="order-form-fields" onSubmit={handleSubmit}>
                        <label htmlFor="street">Street Address:</label>
                        <input
                            type="text"
                            id="street"
                            name="street"
                            value={address.street}
                            onChange={handleAddressChange}
                            required
                        />

                        <label htmlFor="city">City:</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={address.city}
                            onChange={handleAddressChange}
                            required
                        />

                        <label htmlFor="state">State:</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={address.state}
                            onChange={handleAddressChange}
                            required
                        />

                        <label htmlFor="postalCode">Postal Code:</label>
                        <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            value={address.postalCode}
                            onChange={handleAddressChange}
                            required
                        />

                        <label htmlFor="country">Country:</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            value={address.country}
                            onChange={handleAddressChange}
                            required
                        />

                        <label htmlFor="phone">Phone Number:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            required
                        />

                        <label htmlFor="payment">Payment Method:</label>
                        <select id="payment" name="payment" required>
                            <option value="credit">Credit Card</option>
                            <option value="debit">Debit Card</option>
                            <option value="paypal">PayPal</option>
                        </select>

                        <button type="submit" className="order-form-submit">Place Order</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default OrderForm;
