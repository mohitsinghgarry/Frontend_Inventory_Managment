import React, { useContext, useEffect, useState } from 'react';
import OrdersContext from '../ContextApi/OrderContext';
import '../CustomerPages_css/Account.css';
import Loading from '../Login _signup_pages/Loading';
const Orders = () => {
    const { orders, fetchOrders, updateOrderStatus } = useContext(OrdersContext);
    const [loading, setLoading] = useState(true);

    // Fetch orders when the component loads
    useEffect(() => {
        const loadOrders = async () => {
            await fetchOrders();
            setLoading(false); // Set loading to false once the orders are fetched
        };
        loadOrders();
    }, [fetchOrders]);

    // Get appropriate CSS class for the order status
    const getOrderStatusClass = (status) => {
        switch (status) {
            case 'Dispatched':
                return 'status-dispatched';
            case 'Out for Delivery':
                return 'status-out-for-delivery';
            case 'Delivered':
                return 'status-delivered';
            case 'Canceled':
                return 'status-canceled';
            case 'Cancellation Requested':
                return 'status-cancellation-requested';
            case 'Order Placed':
            case 'Order Placed (COD)':
                return 'status-placed';
            default:
                return ''; // Default class for unhandled statuses
        }
    };

    // Handle cancellation request
    const handleCancelOrderRequest = async (orderId) => {
        try {
            const token = localStorage.getItem('authToken'); // Assuming `getToken` function retrieves the JWT from localStorage or another store
            console.log(token)
            const response = await fetch(`https://backend-inventory-management-1-fxba.onrender.com/api/orders/${orderId}/request-cancel`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Add Authorization header
                },
            });

            if (!response.ok) {
                throw new Error('Failed to request order cancellation. Please try again.');
            }

            // Update order status locally to 'Cancellation Requested'
            updateOrderStatus(orderId, 'Cancellation Requested');
            alert('Cancellation request has been sent to the admin.');
        } catch (error) {
            console.error('Error requesting cancellation:', error);
            alert('Unable to request cancellation at this time.');
        }
    };

    if (loading) {
        return <Loading/>; // Show loading state until orders are fetched
    }

    return (
        <div className="account-page">
            <h1 className="account-header">Your Orders</h1>
            {orders.length === 0 ? (
                <p className="account-no-orders">No orders placed yet.</p>
            ) : (
                <ul className="account-orders-list">
                    {orders.map((order) => (
                        <li key={order._id} className="account-order-item">
                            {order.imageUrls?.length > 0 && (
                                <img
                                    src={order.imageUrls[0]}
                                    alt={order.name}
                                    className="account-order-image"
                                />
                            )}
                            <div className="account-order-details">
                                <h3 className="account-order-name">{order.name}</h3>
                                <p className="account-order-quantity">Quantity: {order.orderQuantity}</p>
                                <p className="account-order-price">Total Price: ₹{order.totalPrice}</p>

                                {/* Check if address is available */}
                                {order.address ? (
                                    <p className="account-order-address">
                                        Address: {order.address.street}, {order.address.city}, {order.address.state}
                                    </p>
                                ) : (
                                    <p className="account-order-address">Address: Not available</p>
                                )}
                                
                                <p className="account-order-phone">Phone: {order.phoneNumber}</p>
                                <p className="account-order-date">Date: {order.date}</p>
                                <div className={`account-order-status-bubble ${getOrderStatusClass(order.status)}`}>
                                    {order.status}
                                </div>

                                {/* Show "Request Cancellation" button based on status */}
                                {order.status !== 'Delivered' &&
                                    order.status !== 'Canceled' &&
                                    order.status !== 'Cancellation Requested' && (
                                        <button
                                            className="account-cancel-button"
                                            onClick={() => handleCancelOrderRequest(order._id)}
                                        >
                                            Request Cancellation
                                        </button>
                                    )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Orders;
