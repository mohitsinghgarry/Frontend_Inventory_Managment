import React, { useState } from 'react';
import { useOrder } from '../ContextApi/OrderContext'; // Assuming you have this to get order data
import '../CustomerPages_css/Account.css';

const Account = () => {
    const { orderData } = useOrder();  // Get order data from context
    const [showOrderDetails, setShowOrderDetails] = useState(false);

    const handleOrderStatusClick = () => {
        if (orderData) {
            setShowOrderDetails(true);  // Display order details when button is clicked
        } else {
            alert('No order found. Please place an order first.');
        }
    };

    const getProgressPercentage = (status) => {
        const statusStages = ['Order Placed', 'Shipped', 'Out for Delivery', 'Delivered'];
        const currentStageIndex = statusStages.indexOf(status);
        return (currentStageIndex / (statusStages.length - 1)) * 100;
    };

    return (
        <div className="account-page">
            <h1>Account</h1>
            <button onClick={handleOrderStatusClick}>Order Status</button>

            {showOrderDetails && orderData && (
                <div className="order-summary">
                    <h2>Your Last Order:</h2>
                    <div className="order-item">
                        <div className="order-item-image">
                            {orderData.imageUrls && orderData.imageUrls.length > 0 ? (
                                <img src={orderData.imageUrls[0]} alt={orderData.name} className="order-item-img" />
                            ) : (
                                <p>No image available</p>
                            )}
                        </div>
                        <div className="order-item-details">
                            <h3>{orderData.name}</h3>
                            <p>Quantity: {orderData.orderQuantity}</p>
                            <p>Price per item: ₹{orderData.price}</p>
                            <p>Total Price: ₹{orderData.totalPrice}</p>
                        </div>
                    </div>

                    <div className="order-address">
                        <h4>Shipping Address:</h4>
                        <p>{orderData.address?.street}, {orderData.address?.city}, {orderData.address?.state}, {orderData.address?.postalCode}, {orderData.address?.country}</p>
                        <p>Phone Number: {orderData.phoneNumber}</p>
                    </div>

                    {/* Progress Bar for Delivery Status */}
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${getProgressPercentage(orderData.status)}%` }}></div>
                    </div>

                    {/* Delivery Status Text */}
                    <div className="status-steps">
                        <div className={`status-step ${orderData.status === 'Order Placed' ? 'active' : ''}`}>Order Placed</div>
                        <div className={`status-step ${orderData.status === 'Shipped' ? 'active' : ''}`}>Shipped</div>
                        <div className={`status-step ${orderData.status === 'Out for Delivery' ? 'active' : ''}`}>Out for Delivery</div>
                        <div className={`status-step ${orderData.status === 'Delivered' ? 'active' : ''}`}>Delivered</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Account;
