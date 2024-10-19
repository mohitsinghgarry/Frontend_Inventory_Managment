import React, { useState } from 'react';
import './App.css'; // We're still linking to App.css for styles
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import logoImage from './logo.jpeg'; // Importing the image

function Login1() { // Changed function name to Login1
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    alert('Login successful!');
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log('Google login successful:', credentialResponse);
    alert('Login successful with Google!');
  };

  const handleGoogleFailure = () => {
    console.error('Google login failed');
    setErrorMessage('Google login failed. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId="96925210391-pk0mfmr4hlo88tacsj2uo9k3k40rkjv6.apps.googleusercontent.com">
      <div className="login-page">
        <div className="left-side">
          <h1>Inventory Management System</h1>

          {/* Image below the title */}
          <img 
            src={logoImage}  // Using the imported image
            alt="Inventory" 
            className="inventory-image"
          />
        </div>

        <div className="right-side">
          <h2>Welcome back</h2>

          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            className="google-login-button"
          />

          <p>- OR -</p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          <div className="footer">
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login1; // Changed export to Login1
