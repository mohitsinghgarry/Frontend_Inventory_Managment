import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../App.css'; // Linking to App.css for styles
import image1 from '../images/image2.png'; // Importing the image
import { ToastContainer, toast } from 'react-toastify'; // Importing ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Importing the CSS for toast notifications

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for showing password
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Basic email and password validation
        if (!email || !password) {
            setErrorMessage('Please enter both email and password.');
            toast.error('Please enter both email and password.'); // Show error toast
            return;
        }

        try {
            // Sending a POST request to the backend API
            const response = await fetch('http://localhost:3000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), // Sending email and password as JSON
            });

            const data = await response.json(); // Parse JSON response
            if (response.ok) {
                // Show success toast before navigating
                toast.success(`Login successful: ${data.message}`, {
                    autoClose: 1000,
                    onClose: () => {
                        // Check userType and navigate accordingly
                        if (data.user.userType === 'admin') {
                            navigate(`/admin/${data.user.id}`, { state: { userData: data.user } });
                        } else if (data.user.userType === 'customer') {
                            navigate(`/customer/${data.user.id}`, { state: { userData: data.user } });
                        }
                    }
                });
            } else {
                // Show error message from the response
                setErrorMessage(data.message || 'Login failed. Please try again.');
                toast.error(data.message || 'Login failed. Please try again.'); // Show error toast
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('An error occurred. Please try again later.');
            toast.error('An error occurred. Please try again later.'); // Show error toast
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className="login-page">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="left-side">
                <h1>Inventory Management System</h1>
                <img src={image1} alt="Inventory" className="inventory-image" />
            </div>

            <div className="right-side">
                <h2>Welcome</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="password-input-group">
                        <input
                            type={showPassword ? 'text' : 'password'} // Toggle password visibility
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="checkbox"
                            id="showPassword"
                            checked={showPassword}
                            onChange={togglePasswordVisibility}
                            style={{ marginLeft: '10px' }} // Optional styling
                        />
                        <label htmlFor="showPassword">Show Password</label>
                    </div>
                    <div className="forgot-password">
                        <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
                    </div>

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
    );
}

export default Login;
