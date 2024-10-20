import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import image1 from './images/image2.png';
import './App.css'; // Import the external CSS file

const SignUp = () => {
  const navigate = useNavigate(); // Updated to useNavigate
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Network response was not ok');
      }

      console.log('Form submitted successfully:', data);
      setSuccess(true);
      setError(null);

      // Navigate to OTP verification page
      navigate('/verify-otp'); // Updated to use navigate
    } catch (error) {
      console.error('Error submitting the form:', error.message);
      setError(error.message || 'Error submitting the form. Please try again.');
      setSuccess(false);
    }
  };

  return (
    <div className="container">
      {/* Left Side: Sign-up Form */}
        <div className="leftContainer">
          <div className='container-form-image'>
            <form onSubmit={handleSubmit}>
              <h2>Sign Up For Free.</h2>
              <div className="inputGroup">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </div>
              <div className="inputGroup">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </div>
              <div className="inputGroup">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </div>
              {/* Password Instructions */}
              <div className="passwordInstructionsContainer">
                <h4>Password Requirements:</h4>
                <ul className="passwordInstructionsList">
                  <li>✔️ At least 1 uppercase letter (A-Z)</li>
                  <li>✔️ At least 1 lowercase letter (a-z)</li>
                  <li>✔️ At least 1 number (0-9)</li>
                  <li>✔️ At least 1 special character (e.g., !@#$%^&*)</li>
                  <li>✔️ Minimum length of 8 characters</li>
                </ul>
              </div>
              <button type="submit" className="submitButton">
                Sign Up
              </button>
            </form>
            {/* Right Side: Inventory Management and Image */}
            <div>
              <h2>Inventory Management System</h2>
              <div className="imageContainer">
                <img src={image1} alt="Inventory" className="image" />
              </div>
            </div>
          </div>

          {error && <p className="errorMessage">{error}</p>}
          {success && <p className="successMessage">Sign up successful! Check your email for the OTP.</p>}
          <div className="footer">
            <p>
              Already have an account?{' '}
              <a href="/" className="signInLink">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
  );
};

export default SignUp;
