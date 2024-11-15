import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import '../Login_signup_css/User.css';
import { useUser } from './UserContext';

function Admin() {
    const { userData } = useUser();
    const [isSidebarOpen, setSidebarOpen] = useState(false); // Track the sidebar state

    if (!userData) {
        return <p>No user data available.</p>;
    }

    // Toggle the sidebar visibility
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="admin-portal">
            {/* Sidebar */}
            <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <h2 className="admin-sidebar-title">ADMIN PORTAL</h2>
                <ul className="admin-sidebar-menu">
                    <li className="admin-menu-item">
                        <NavLink
                            to="dashboard"
                            className={({ isActive }) => (isActive ? 'admin-active-link' : 'admin-link')}
                        >
                            DASHBOARD
                        </NavLink>
                    </li>
                    <li className="admin-menu-item">
                        <NavLink
                            to="product"
                            className={({ isActive }) => (isActive ? 'admin-active-link' : 'admin-link')}
                        >
                            PRODUCT
                        </NavLink>
                    </li>
                    <li className="admin-menu-item">
                        <NavLink
                            to="order"
                            className={({ isActive }) => (isActive ? 'admin-active-link' : 'admin-link')}
                        >
                            ORDER
                        </NavLink>
                    </li>
                    <li className="admin-menu-item">
                        <NavLink
                            to="stock"
                            className={({ isActive }) => (isActive ? 'admin-active-link' : 'admin-link')}
                        >
                            STOCK
                        </NavLink>
                    </li>
                    <li className="admin-menu-item">
                        <NavLink
                            to="sales"
                            className={({ isActive }) => (isActive ? 'admin-active-link' : 'admin-link')}
                        >
                            SALES
                        </NavLink>
                    </li>
                </ul>
                <button className="admin-logout-btn">Logout</button>
            </aside>

            {/* Top Navbar for Small Screens */}
            <nav className={`admin-navbar ${isSidebarOpen ? 'open' : ''}`}>
                <button className="navbar-toggle-btn" onClick={toggleSidebar}>
                    <span className="hamburger-icon"></span>
                </button>
                <h2 className="admin-navbar-title">ADMIN PORTAL</h2>
            </nav>

            {/* Main Content */}
            <div className={`admin-main-content ${isSidebarOpen ? 'content-blur' : ''}`}>
                <Outlet />
            </div>
        </div>
    );
}

export default Admin;
