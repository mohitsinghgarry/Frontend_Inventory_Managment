import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../Login_signup_css/LandingPage.css";
import logo from "../images/image2.png";
import top from "../images/Container 4.png";
import rightimg from "../images/Image 84.png";
import leftimg from "../images/Image 85.png";
import footerimg from "../images/Container 6.png";
const LandingPage = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleSignUpClick = () => {
    navigate("/signup"); // Navigate to the sign-up page
  };
  const handlelogin = () => {
    navigate("/login");
  };

  return (
    <div className="landing-page">
      {/* Navbar Section */}
      <nav className="navbar">
        <div className="logo">
          <img src={logo} className="logo-img" alt="Logo" />
          <h1 className="title">InventoryPro</h1>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#resources">Resources</a>
          </li>
          <li>
            <a href="#about">About Us</a>
          </li>
          <li>
            <a href="#contact">Contact Us</a>
          </li>
        </ul>
        <div className="auth-buttons">
          <button className="login-btn" onClick={handlelogin}>
            Login
          </button>
          <button className="signup-btn" onClick={handleSignUpClick}>
            Sign Up
          </button>{" "}
          {/* Handle sign up click */}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-image">
          <img src={top} alt="Hero Image" className="hero-img-placeholder" />
          <button className="gettologin" onClick={handleSignUpClick}>
            Get Started
          </button>
          <div className="description">
            <center>
              <p>
                "Welcome to our app, where we strive to enhance your
                productivity and streamline your daily tasks. Discover features
                tailored to meet your needs and help you achieve your goals
                efficiently."
              </p>
            </center>
          </div>
        </div>
        <br />
      </header>
          <div className="section">
            <div className="text-container1">
              <h2>Real-Time Tracking</h2>
              <p>Monitor your inventory levels in real-time, ensuring you never run out of stock.</p>
            </div>
            <div className="image-container">
              <img src={rightimg} alt="Real-Time Tracking" className="imagelanding1" />
            </div>
          </div>

          <div className="section reverse">
            <div className="image-container">
              <img src={leftimg} alt="Automated Reports" className="imagelanding2" />
            </div>
            <div className="text-container2">
              <h2>Automated Reports</h2>
              <p>Generate automated reports to gain valuable insights into your inventory.</p>
            </div>
          </div>
            
       
          
    </div>
  );
};

export default LandingPage;
