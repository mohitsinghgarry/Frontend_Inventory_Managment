// User.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import homeimage from "../images/homeimage.png"
import '../Login_signup_css/User.css'
function User() {
    const location = useLocation();
    const { userData } = location.state || {}; // Get userData from state

    if (!userData) {
        return <p>No user data available.</p>; // Fallback if no user data
    }

    return (
        <div>
            <div>
            <header className="home_header">
                <h1>INVENTORY MANAGEMENT SYSTEM</h1>
            </header>
            <main className="home_main_one">
            </main>
            <main className="home_main_two">
                <div className="part_one">
                    <h1><span>Welcome {userData.name}</span> to your <b>Inventory Management Dashboard!</b> Here you can track orders, manage stock, and view customer details.</h1>
                </div>
                <div className="part_two">
                    <img src={homeimage} />
                </div>
            </main>

            <main className="home_main_three">
                <div class="dashboard-cards">
                    <div class="card">
                        <i class="fas fa-shopping-cart"></i>
                        <h3>Total Order</h3>
                    </div>
                    <div class="card">
                        <i class="fas fa-boxes"></i>
                        <h3>Overall Stock</h3>
                    </div>
                    <div class="card">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h3>Low Stocks</h3>
                    </div>
                    <div class="card">
                        <i class="fas fa-clock"></i>
                        <h3>Recent Orders</h3>
                        <p class="description">Last 7 hours</p>
                    </div>
                    <div class="card">
                        <i class="fas fa-users"></i>
                        <h3>Total Customer</h3>
                    </div>
                    <div class="card">
                        <i class="fas fa-medal"></i>
                        <h3>Top Sellings</h3>
                    </div>
                </div>
            </main>


        </div>
        </div>
    );
}

export default User;
