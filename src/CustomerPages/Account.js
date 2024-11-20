import React, { useState } from "react";
import { useUser } from '../Login _signup_pages/UserContext';
import "../CustomerPages_css/Account.css";

const Account = () => {
  const { userData } = useUser(); // Use user data from UserContext
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(userData?.name || "");
  const [updatedEmail, setUpdatedEmail] = useState(userData?.email || "");

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Update user data logic here (e.g., make an API call to save updated details)
    alert(`Profile updated:\nName: ${updatedName}\nEmail: ${updatedEmail}`);
    setIsEditing(false);
  };

  return (
    <div className="account-page">
      <h1>Account</h1>

      {/* User Info Card */}
      <div className="user-info-card">
        <h2>Profile Information</h2>
        <div className="card-content">
          {isEditing ? (
            <>
              <div className="input-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={updatedEmail}
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                />
              </div>
              <button className="save-button" onClick={handleSaveClick}>
                Save
              </button>
            </>
          ) : (
            <>
              <p>
                <strong>Name:</strong> {userData?.name}
              </p>
              <p>
                <strong>Email:</strong> {userData?.email}
              </p>
              <button className="update-button" onClick={handleUpdateClick}>
                Update Profile
              </button>
            </>
          )}
        </div>
      </div>

      {/* Order Status Button */}
      <button className="order-status-button">Order Status</button>
    </div>
  );
};

export default Account;
