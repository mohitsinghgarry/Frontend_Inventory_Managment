import React from "react";
import { useOrder } from "../ContextApi/OrderContext"; // Importing the OrderContext
import "../AdminPages_css/Order.css"; // Updated CSS for admin

const Order = () => {
    const { orderData } = useOrder();

    const statusStages = [
        "Order Placed",
        "Shipped",
        "Out for Delivery",
        "Delivered",
    ];
    const getStatusIndex = (status) => statusStages.indexOf(status);

    if (!orderData) {
        return <p>No orders available.</p>;
    }

    return (
        <div className="order-page">
            <h1>Order Details</h1>
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price per Item</th>
                        <th>Total Price</th>
                        <th>Shipping Address</th>
                        <th>Phone Number</th>
                        <th>Order Status</th>
                        <th>Progress</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{orderData.id || "N/A"}</td>
                        <td>{orderData.name || "N/A"}</td>
                        <td>{orderData.orderQuantity || "N/A"}</td>
                        <td>₹{orderData.price || "N/A"}</td>
                        <td>₹{orderData.totalPrice || "N/A"}</td>
                        <td>
                            {orderData.address
                                ? `${orderData.address.street}, ${orderData.address.city}, ${orderData.address.state}, ${orderData.address.postalCode}, ${orderData.address.country}`
                                : "N/A"}
                        </td>
                        <td>{orderData.phoneNumber || "N/A"}</td>
                        <td>{orderData.status || "N/A"}</td>
                        <td>
                            <div className="progress-bar">
                                {statusStages.map((stage, index) => {
                                    const currentIndex = getStatusIndex(orderData.status);
                                    const stepClass =
                                        index < currentIndex
                                            ? "completed"
                                            : index === currentIndex
                                            ? "current"
                                            : "upcoming";

                                    return (
                                        <div key={stage} className={`progress-step ${stepClass}`}>
                                            <div className="progress-circle">{index + 1}</div>
                                            <span className="progress-label">{stage}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Order;
