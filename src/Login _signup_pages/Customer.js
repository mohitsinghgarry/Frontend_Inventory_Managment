// src/UserPanel.js
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import '../Login_signup_css/User.css';
import { useUser } from './UserContext'; // Import useUser hook
import "../CustomerPages_css/Customer.css"
function Customer() {
  const { userData } = useUser(); // Get user data from context

  if (!userData) {
    return <p>No user data available.</p>;
  }

  return (
    <div className="user-portal">
      <aside className="sidebar">
        <h2 style={{ color: "white" }}>USER PORTAL</h2>
        <ul className="sidebar-menu">
          <li>
            <NavLink
              to="home"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="product"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              PRODUCTS
            </NavLink>
          </li>
          <li>
            <NavLink
              to="account"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              ACCOUNT INFO
            </NavLink>
          </li>
          <li>
            <NavLink
              to="cart"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              CART
            </NavLink>
          </li>
        </ul>
        <button className="logout-btn">Logout</button>
      </aside>

      <div className="main-content">
        <Outlet /> {/* This renders the nested route content */}
      </div>
    </div>
  );
}

export default Customer;
