import React, { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FaHome, FaBox, FaUser, FaShoppingCart, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useUser } from './UserContext';
import '../CustomerPages_css/Customer.css';

function Customer() {
  const { userData, logout } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Update sidebar and screen size states on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 768);
      setIsSmallScreen(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout();
  };

  if (!userData) {
    return <p>No user data available.</p>;
  }

  return (
    <div className="user-portal">
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
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
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt className="icon" /> Logout
        </button>
      </aside>

      {/* Navbar for Mobile View */}
      {isSmallScreen && (
        <nav className="navbar">
          <button className="navbar-toggle-btn" onClick={toggleSidebar}>
            <FaBars className="hamburger-icon" />
          </button>
          <span className="portal-name">USER PORTAL</span>
        </nav>
      )}

      {/* Apply blur only on small screens when the sidebar is open */}
      <div className={`main-content ${isSidebarOpen && isSmallScreen ? 'content-blur' : ''}`}>
        <Outlet />
      </div>
    </div>
  );
}

export default Customer;
