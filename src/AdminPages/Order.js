import React, { useState, useEffect } from "react";
import { useOrder } from "../ContextApi/OrderContext"; // Import the context
import "../CustomerPages_css/Order.css"; // Add appropriate CSS for styling

const Order = () => {
  const { orderData, storeOrder } = useOrder(); // Use order data and the storeOrder function from the context
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from backend when component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/orders");
        if (response.ok) {
          const data = await response.json();
          storeOrder(data); // Store the fetched data in the global state
        } else {
          setError("Failed to fetch orders");
        }
      } catch (error) {
        setError("Error fetching orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [storeOrder]); // Make sure storeOrder is included in the dependencies

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="order-page">
      <h1>Your Orders</h1>

      {orderData && orderData.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Price</th>
              <th>Shipping Address</th>
              <th>Phone</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orderData?.map((order) => (
              order.cartData.map((item) => (
                <tr key={item.id}>
                  <td>{order._id}</td>
                  <td>{item.id}</td>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price ? item.price : 'Not Available'}</td> {/* Check for price */}
                  <td>₹{item.totalPrice * (item.price ? item.price : 0)}</td> {/* If price exists, calculate total */}
                  <td>
                    {order.address?.street}, {order.address?.city}, {order.address?.state}, {order.address?.postalCode}, {order.address?.country}
                  </td>
                  <td>{order.phoneNumber}</td>
                
                </tr>
              ))
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Order;
