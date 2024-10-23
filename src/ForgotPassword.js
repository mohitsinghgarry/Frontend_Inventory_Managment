import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!email) {
            toast.error('Please enter your email address.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/user/request-password-reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Password reset link sent to your email.');
            } else {
                toast.error(data.message || 'Failed to send reset link.');
            }
        } catch (error) {
            console.error('Error requesting password reset:', error);
            toast.error('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="forgot-password-page">
            <ToastContainer position="top-right" autoClose={5000} />
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Send Reset Link</button>
            </form>
        </div>
    );
}

export default ForgotPassword;
