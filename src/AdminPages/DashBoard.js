import React from 'react';
import { useUser } from '../Login _signup_pages/UserContext';
import homeImage from "../images/homeimage.png";
import '../AdminPages_css/DashBoard.css'
const cardData = [
    { icon: "fas fa-shopping-cart", title: "Total Order", number: 144 },
    { icon: "fas fa-boxes", title: "Overall Stock", number: 2345 },
    { icon: "fas fa-exclamation-triangle", title: "Low Stocks", number: 25 },
    { icon: "fas fa-clock", title: "Recent Orders", number: 17, description: "Last 7 hours" },
    { icon: "fas fa-users", title: "Total Customer", number: 5467 },
    { icon: "fas fa-medal", title: "Top Sellings", number: 6 },
];

const Dashboard = () => {
    const { userData } = useUser();

    if (!userData) {
        return <p>No user data available.</p>;
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1 className="dashboard-title">INVENTORY MANAGEMENT SYSTEM</h1>
            </header>

            <main className="dashboard-welcome">
                <div className="welcome-text">
                    <h1>
                        <span>Welcome {userData.name}</span> to your <b>Inventory Management Dashboard!</b>
                    </h1>
                </div>
                <div className="welcome-image">
                    <img src={homeImage} alt="Dashboard illustration" />
                </div>
            </main>

            <section className="dashboard-cards">
                {cardData.map((card, index) => (
                    <div className="dashboard-card" key={index}>
                        <i className={`${card.icon} card-icon`}></i>
                        <h3 className="card-title">{card.title}</h3>
                        <p className="card-number">{card.number}</p>
                        {card.description && <p className="card-description">{card.description}</p>}
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Dashboard;
