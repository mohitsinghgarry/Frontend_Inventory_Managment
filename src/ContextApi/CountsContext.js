import React, { createContext, useEffect, useState } from 'react';

export const CountsContext = createContext();

export const CountsProvider = ({ children }) => {
  const [counts, setCounts] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0, // Add totalCustomers here
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetching the counts for products, orders, and customers
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const productsRes = await fetch('http://localhost:3000/products/count');
        const ordersRes = await fetch('http://localhost:3000/orders/count');
        const customersRes = await fetch('http://localhost:3000/users/count'); // Add endpoint for users

        if (!productsRes.ok || !ordersRes.ok || !customersRes.ok) {
          throw new Error('Failed to fetch counts');
        }

        const productsData = await productsRes.json();
        const ordersData = await ordersRes.json();
        const customersData = await customersRes.json(); // Get customer count from the response

        // Setting the fetched counts into state
        setCounts({
          totalProducts: productsData.count,
          totalOrders: ordersData.count,
          totalCustomers: customersData.totalCustomers, // Set the customer count
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <CountsContext.Provider value={{ counts, loading, error }}>
      {children}
    </CountsContext.Provider>
  );
};
