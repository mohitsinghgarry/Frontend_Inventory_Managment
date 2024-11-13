// src/UserPanel.js
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FaHome, FaBox, FaUser, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import { useUser } from './UserContext'; // Import useUser hook
import '../CustomerPages_css/Customer.css'; // Include CSS file for styles

function Customer() {
  const { userData } = useUser(); // Get user data from context

  if (!userData) {
    return <p>No user data available.</p>;
  }

  return (
    <div className="user-portal">
      <aside className="sidebar">
        <h2 className="sidebar-title">USER PORTAL</h2>
        <ul className="sidebar-menu">
          <li className="menu-item">
            <NavLink to="home" className={({ isActive }) => (isActive ? 'active' : 'link')}>
              <FaHome className="icon" /> HOME
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="product" className={({ isActive }) => (isActive ? 'active' : 'link')}>
              <FaBox className="icon" /> PRODUCTS
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="account" className={({ isActive }) => (isActive ? 'active' : 'link')}>
              <FaUser className="icon" /> ACCOUNT INFO
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="cart" className={({ isActive }) => (isActive ? 'active' : 'link')}>
              <FaShoppingCart className="icon" /> CART
            </NavLink>
          </li>
        </ul>
        <button className="logout-btn">
          <FaSignOutAlt className="icon" /> Logout
        </button>
      </aside>

      <div className="main-content">
        <Outlet /> {/* This renders the nested route content */}
      </div>
    </div>
  );
}

export default Customer;
