import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast } from 'react-toastify'; // Import toast
import './VerifyOTP.css';
 // Importing the CSS for toast notifications

const VerifyOTP = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'otp') {
      setOtp(value);
    } else if (name === 'email') {
      setEmail(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/user/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp, email }),  // Send OTP and email as JSON
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Network response was not ok');
      }

      // console.log('OTP verified successfully:', data);
      setSuccess(true);
      setError(null);
      
      // Show success toast notification
      toast.success(`Singup successful: ${data.message}`, {
        autoClose: 1000, // Auto close after 1 second
        onClose: () => navigate(`/`) // Navigate to /login after toast closes
    });  

    } catch (error) {
      console.error('Error verifying the OTP:', error.message);
      setError(error.message || 'Error verifying the OTP. Please try again.');
      setSuccess(false);
    }
  };

  return (
    <div className="container">
      <h2>Verify Your OTP</h2>
      <p>Please enter the OTP sent to your email address to verify your account.</p>
      <form onSubmit={handleSubmit}>
        <div className="inputGroup">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="inputGroup">
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <button type="submit" className="submitButton">
          Verify OTP
        </button>
      </form>
      {error && <p className="errorMessage">{error}</p>}
      {success && <p className="successMessage">OTP verified successfully!</p>}
    </div>
  );
};

export default VerifyOTP;
