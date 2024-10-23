// User.js
import React from 'react';
import { useLocation } from 'react-router-dom';

function User() {
    const location = useLocation();
    const { userData } = location.state || {}; // Get userData from state

    if (!userData) {
        return <p>No user data available.</p>; // Fallback if no user data
    }

    return (
        <div>
            <h2>User Information</h2>
            <p><strong>ID:</strong> {userData.id}</p> {/* Displaying user ID */}
            <p><strong>Email:</strong> {userData.email}</p> {/* Displaying user email */}
            {/* You can display more user information as needed */}
        </div>
    );
}

export default User;
