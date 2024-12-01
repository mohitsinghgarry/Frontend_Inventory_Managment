import React, { createContext, useEffect, useState } from 'react';

export const CountsContext = createContext();

export const CountsProvider = ({ children }) => {
  const [counts, setCounts] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    lowStock: 0, // Add low stock count here
    recentOrders: 0, // Add recent orders count here
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetching the counts for products, orders, customers, low stock, and recent orders
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetching counts from backend endpoints
        const productsRes = await fetch('https://backend-inventory-management-1.onrender.com/products/count');
        const ordersRes = await fetch('https://backend-inventory-management-1.onrender.com/orders/count');
        const customersRes = await fetch('https://backend-inventory-management-1.onrender.com/users/count');
        const lowStockRes = await fetch('https://backend-inventory-management-1.onrender.com/products/low-stock'); // Endpoint for low stock
        const recentOrdersRes = await fetch('https://backend-inventory-management-1.onrender.com/orders/recent-count'); // Endpoint for recent orders

        // Check if all the responses are OK
        if (!productsRes.ok || !ordersRes.ok || !customersRes.ok || !lowStockRes.ok || !recentOrdersRes.ok) {
          throw new Error('Failed to fetch counts');
        }

        // Parsing the JSON response from each endpoint
        const productsData = await productsRes.json();
        const ordersData = await ordersRes.json();
        const customersData = await customersRes.json();
        const lowStockData = await lowStockRes.json(); // Get low stock count
        const recentOrdersData = await recentOrdersRes.json(); // Get recent orders count
        // console.log(recentOrdersData)
        // Setting the fetched counts into state
        setCounts({
          totalProducts: productsData.count,
          totalOrders: ordersData.count,
          totalCustomers: customersData.totalCustomers,
          lowStock: lowStockData.count, // Set low stock count
          recentOrders: recentOrdersData.count, // Set recent orders count
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []); // Empty dependency array means this effect runs only once after initial render

  return (
    <CountsContext.Provider value={{ counts, loading, error }}>
      {children}
    </CountsContext.Provider>
  );
};
