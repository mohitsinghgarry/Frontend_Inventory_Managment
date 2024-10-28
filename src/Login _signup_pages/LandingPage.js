import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import '../Login_signup_css/LandingPage.css'
import logo from '../images/Picsart_24-10-12_14-02-47-432__1_-removebg-preview.png';
import heroImage from '../images/Hero Section@2x.png';
import riskManagementImg from '../images/WhatsApp Image 2024-10-19 at 10.42.12 PM.jpeg';
import customizedSolutionsImg from '../images/WhatsApp Image 2024-10-19 at 10.42.55 PM.jpeg';
import cardsfirstimg from '../images/pana.jpg';
import footerleft from '../images/WhatsApp Image 2024-10-19 at 10.43.44 PM.jpeg';

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleSignUpClick = () => {
    navigate('/signup'); // Navigate to the sign-up page
  };
  const handlelogin =()=>{
    navigate('/login');
  }

  return (
    <div className="landing-page">
      {/* Navbar Section */}
      <nav className="navbar">
        <div className="logo">
          <img src={logo} className="logo-img" alt="Logo" />
        </div>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#community">Community</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>
        <div className="auth-buttons">
          <button className="login-btn" onClick={handlelogin}>Login</button>
          <button className="signup-btn" onClick={handleSignUpClick}>Sign Up</button> {/* Handle sign up click */}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-image">
          <img src={heroImage} alt="Hero Image" className="hero-img-placeholder" />
        </div>
      </header>

      {/* Cards Section */}
      <div className="cards-section">
        <img src={cardsfirstimg} className="firstcard" alt="First Card" />
        <div className="card_new">
          <div className="card-image">
            <img src={riskManagementImg} alt="Risk Management" className="card-img-placeholder" />
          </div>
          <h3>Risk Management</h3>
          <p>
            We expertly handle and proactively mitigate financial risks, ensuring
            the safeguard of assets and overall stability.
          </p>
        </div>
        <div className="card_new">
          <div className="card-image">
            <img src={customizedSolutionsImg} alt="Customized Solutions" className="card-img-placeholder" />
          </div>
          <h3>Customized Solutions</h3>
          <p>
            Receive and benefit from financial solutions tailored to your unique
            financial challenges and aspirations.
          </p>
        </div>
      </div>
      
      {/* Footer Section */}
      <footer>
        <div className="footer-content">
          <div className="footer-left-image">
            <img src={footerleft} alt="Footer Image" />
          </div>
          <div className="social-media">
            <h3>Follow Us</h3>
            <p>Stay connected through our social media channels.</p>
            <a href="#facebook">Facebook</a> | <a href="#twitter">Twitter</a> | <a href="#instagram">Instagram</a>
          </div>
          <div className="explore">
            <h3>Explore More</h3>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#sitemap">Site map</a></li>
              <li><a href="#privacy">Privacy</a></li>
            </ul>
          </div>
          <div className="contact">
            <h3>Contact Details</h3>
            <p>contact@briofin.com</p>
            <p>+1 (555) 123-4567</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
