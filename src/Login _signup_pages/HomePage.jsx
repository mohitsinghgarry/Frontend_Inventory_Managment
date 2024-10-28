
import React from "react"
import homeimage from "../images/homeimage.png"
export default function HomePage() {
    return (
        <div>
            <header className="home_header">
                <h1>INVENTORY MANAGEMENT SYSTEM</h1>
            </header>
            <main className="home_main_one">
                
                <h6>21 September 2003</h6>
            </main>
            <main className="home_main_two">
                <div className="part_one">
                    <h1><span>Welcome</span> to your <b>Inventory Management Dashboard!</b> Here you can track orders, manage stock, and view customer details.</h1>
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
                        <p class="number">144</p>
                    </div>
                    <div class="card">
                        <i class="fas fa-boxes"></i>
                        <h3>Overall Stock</h3>
                        <p class="number">2345</p>
                    </div>
                    <div class="card">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h3>Low Stocks</h3>
                        <p class="number">25</p>
                    </div>
                    <div class="card">
                        <i class="fas fa-clock"></i>
                        <h3>Recent Orders</h3>
                        <p class="number">17</p>
                        <p class="description">Last 7 hours</p>
                    </div>
                    <div class="card">
                        <i class="fas fa-users"></i>
                        <h3>Total Customer</h3>
                        <p class="number">5467</p>
                    </div>
                    <div class="card">
                        <i class="fas fa-medal"></i>
                        <h3>Top Sellings</h3>
                        <p class="number">6</p>
                    </div>
                </div>

                <button class="dashboard-btn">Dashboard</button>
            </main>


        </div>
    )
}