import React from 'react';
import { useLocation } from 'react-router-dom';
import '../CustomerPages_css/OrdersPage.css';

const OrdersPage = () => {
    const location = useLocation();
    const orderData = location.state || {};  // Retrieve the order data from the location state

    if (!orderData || Object.keys(orderData).length === 0) {
        return <div>No order data available.</div>;
    }

    const { name, price, orderQuantity, totalPrice, address, phoneNumber, imageUrls } = orderData;

    return (
        <div className="order-summary">
            <h1>Order Summary</h1>

            <div className="order-item">
                <div className="order-item-image">
                    {imageUrls && imageUrls.length > 0 ? (
                        <img src={imageUrls[0]} alt={name} className="order-item-img" />
                    ) : (
                        <p>No image available</p>
                    )}
                </div>
                <div className="order-item-details">
                    <h3>{name}</h3>
                    <p>Quantity: {orderQuantity}</p>
                    <p>Price per item: ₹{price}</p>
                    <p>Total Price: ₹{totalPrice}</p>
                </div>
            </div>

            <div className="order-address">
                <h4>Shipping Address:</h4>
                <p>{address?.street}, {address?.city}, {address?.state}, {address?.postalCode}, {address?.country}</p>
                <p>Phone Number: {phoneNumber}</p>
            </div>
        </div>
    );
};

export default OrdersPage;
