import React from 'react';
import { useUser } from '../Login _signup_pages/UserContext'; // Adjust the import based on your file structure
import homeImage from "../images/homeimage.png";

const cardData = [
    { icon: "fas fa-shopping-cart", title: "Total Order", number: 144 },
    { icon: "fas fa-boxes", title: "Overall Stock", number: 2345 },
    { icon: "fas fa-exclamation-triangle", title: "Low Stocks", number: 25 },
    { icon: "fas fa-clock", title: "Recent Orders", number: 17, description: "Last 7 hours" },
    { icon: "fas fa-users", title: "Total Customer", number: 5467 },
    { icon: "fas fa-medal", title: "Top Sellings", number: 6 },
];

const DashBoard = () => {
    const { userData } = useUser(); // Get user data from context

    if (!userData) {
        return <p>No user data available.</p>;
    }

    return (
        <div>
            <header className="home_header">
                <h1>INVENTORY MANAGEMENT SYSTEM</h1>
            </header>

            <main className="home_main_two">
                <div className="part_one">
                    <h1><span>Welcome {userData.name}</span> to your <b>Inventory Management Dashboard!</b></h1>
                </div>
                <div className="part_two">
                    <img src={homeImage} alt="Dashboard illustration" />
                </div>
            </main>

            <main className="dashboard-main">
                <section className="dashboard-cards">
                    {cardData.map((card, index) => (
                        <div className="card" key={index}>
                            <i className={card.icon}></i>
                            <h3>{card.title}</h3>
                            <p className="number">{card.number}</p>
                            {card.description && <p className="description">{card.description}</p>}
                        </div>
                    ))}
                </section>
            </main>
            {/* <p>Welcome, {userData.name}!</p>
            <p>Your email: {userData.email}</p>
            <p>Your ID: {userData.id}</p> */}
        </div>
    );
};

export default DashBoard;
