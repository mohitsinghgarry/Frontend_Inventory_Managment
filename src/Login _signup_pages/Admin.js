// src/Admin.js
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import '../Login_signup_css/User.css';
import { useUser } from './UserContext'; // Import useUser hook

function Admin() {
    const { userData } = useUser(); // Get user data from context

    if (!userData) {
        return <p>No user data available.</p>;
    }

    return (
        <div className="admin-portal">
            <aside className="sidebar">
                <h2 style={{ color: "white"}}>ADMIN PORTAL</h2>
                <ul className="sidebar-menu">
                    <li>
                        <NavLink 
                            to="dashboard" 
                            className={({ isActive }) => (isActive ? 'active' : '')} // Apply 'active' class if the route is active
                        >
                            DASHBOARD
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="product" 
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            PRODUCT
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="order" 
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            ORDER
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="stock" 
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            STOCK
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="sales" 
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            SALES
                        </NavLink>
                    </li>
                </ul>
                <button className="logout-btn">Logout</button>
            </aside>

            <div className="main-content">
                <Outlet />
            </div>
        </div>
    );
}

export default Admin;
