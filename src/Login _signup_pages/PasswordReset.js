import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function PasswordReset() {
    const { token } = useParams(); // Get token from URL params
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for showing password
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!newPassword) {
            toast.error('Please enter a new password.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/user/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(`Password reset successful: ${data.message}`, {
                    autoClose: 1000, // Auto close after 1 second
                    onClose: () => navigate(`/login`) // Navigate to /login after toast closes
                });
            } else {
                toast.error(data.message || 'Failed to reset password.');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            toast.error('An error occurred. Please try again later.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className="reset-password-page">
            <ToastContainer position="top-right" autoClose={5000} />
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="password-input-group">
                    <input
                        type={showPassword ? 'text' : 'password'} // Toggle password visibility
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
}

export default PasswordReset;
