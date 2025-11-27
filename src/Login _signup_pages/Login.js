import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from './UserContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../Login_signup_css/Login.scss';
import image1 from '../images/image2.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { setUserData } = useUser(); // Manage user state

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setErrorMessage('Please enter both email and password.');
            toast.error('Please enter both email and password.');
            return;
        }

        try {
            const response = await fetch('https://backend-inventory-management-cy4h.vercel.app/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                // Ensure token is present
                if (data.token) {
                    localStorage.setItem('authToken', data.token);
                } else {
                    throw new Error('Token not received');
                }

                toast.success(`Login successful: ${data.message}`, {
                    autoClose: 1000,
                    onClose: () => {
                        setUserData(data.user);

                        if (data.user?.userType === 'admin') {
                            navigate(`/admin/${data.user.id}/dashboard`);
                        } else if (data.user?.userType === 'customer') {
                            navigate(`/customer/${data.user.id}/home`);
                        }
                    },
                });
            } else {
                setErrorMessage(data.message || 'Login failed. Please try again.');
                toast.error(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('An error occurred. Please try again later.');
            toast.error('An error occurred. Please try again later.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className='main-login-new'>
            <div className="login-page">
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                
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
                            className="email-input"
                        />
                        
                        <div className="password-input-group">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="password-input"
                            />
                            <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        
                        <div className="forgot-password">
                            <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
                        </div>

                        <button type="submit" className="login-button">
                            Login
                        </button>
                    </form>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <div className="footer">
                        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
