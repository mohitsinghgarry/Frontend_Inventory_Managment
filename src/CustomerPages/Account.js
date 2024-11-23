import React, { useState } from "react";
import { useOrder } from "../ContextApi/OrderContext";
import { useUser } from "../Login _signup_pages/UserContext"; // Importing the UserContext
import "../CustomerPages_css/Account.css";

const Account = () => {
  const { orderData } = useOrder();
  const { userData, setUserData } = useUser(); // Destructure userData and setUserData from context
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Profile State Management
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    name: userData?.name || "", // Populate with current user data if available
    email: userData?.email || "",
    profilePhoto: userData?.profilePhoto || null,
  });

  const handleOrderStatusClick = () => {
    if (orderData) {
      setShowOrderDetails(true);
    } else {
      alert("No order found. Please place an order first.");
    }
  };

  const statusStages = [
    "Order Placed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];
  const getStatusIndex = (status) => statusStages.indexOf(status);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUpdatedProfile((prev) => ({ ...prev, profilePhoto: reader.result }));
        setUserData((prev) => ({ ...prev, profilePhoto: reader.result }));
        localStorage.setItem(
          "userData",
          JSON.stringify({ ...userData, profilePhoto: reader.result })
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProfile = () => {
    setUpdatedProfile({
      name: userData?.name || "",
      email: userData?.email || "",
    });
    setIsEditingProfile(true);
  };

  const handleProfileSave = () => {
    // Update user profile logic here (e.g., update context or localStorage)
    setUserData(updatedProfile); // Update the user data in the context
    setIsEditingProfile(false);
    localStorage.setItem("userData", JSON.stringify(updatedProfile)); // Optionally store it in localStorage
  };

  return (
    <div className="account-page">
      <h1>Account</h1>

      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-photo-container">
          <label htmlFor="profilePhotoInput">
            <div className="profile-photo">
              {updatedProfile.profilePhoto ? (
                <img src={updatedProfile.profilePhoto} alt="Profile" />
              ) : (
                <span className="placeholder">+</span>
              )}
            </div>
            <input
              id="profilePhotoInput"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: "none" }}
            />
          </label>
        </div>
        <p className="profile-name">{userData?.name || "Loading..."}</p>
        <p className="profile-email">{userData?.email || "Loading..."}</p>
        <button onClick={handleEditProfile}>Update Profile</button>
      </div>

      {/* Update Profile Modal */}
      {isEditingProfile && (
        <div className="profile-modal">
          <div className="modal-content">
            <h2>Update Profile</h2>
            <label>
              Name:
              <input
                type="text"
                value={updatedProfile.name}
                onChange={(e) =>
                  setUpdatedProfile({ ...updatedProfile, name: e.target.value })
                }
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={updatedProfile.email}
                onChange={(e) =>
                  setUpdatedProfile({
                    ...updatedProfile,
                    email: e.target.value,
                  })
                }
              />
            </label>
            <button onClick={handleProfileSave}>Save</button>
            <button onClick={() => setIsEditingProfile(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Order Status Button */}
      <button onClick={handleOrderStatusClick}>Order Status</button>

      {/* Order Details Section */}
      {showOrderDetails && orderData && (
        <div className="order-summary">
          <h2>Your Last Order:</h2>
          <div className="order-item">
            <div className="order-item-image">
              {orderData.imageUrls && orderData.imageUrls.length > 0 ? (
                <img
                  src={orderData.imageUrls[0]}
                  alt={orderData.name}
                  className="order-item-img"
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <div className="order-item-details">
              <h3>{orderData.name}</h3>
              <p>Quantity: {orderData.orderQuantity}</p>
              <p>Price per item: ₹{orderData.price}</p>
              <p>Total Price: ₹{orderData.totalPrice}</p>
            </div>
          </div>

          <div className="order-address">
            <h4>Shipping Address:</h4>
            <p>
              {orderData.address?.street}, {orderData.address?.city},{" "}
              {orderData.address?.state}, {orderData.address?.postalCode},{" "}
              {orderData.address?.country}
            </p>
            <p>Phone Number: {orderData.phoneNumber}</p>
          </div>
          <div className="progress-bar-wrapper">
            <div className="progress-bar-horizontal">
              {statusStages.map((stage, index) => {
                const currentIndex = getStatusIndex(orderData.status);
                const stepClass =
                  index < currentIndex
                    ? "completed"
                    : index === currentIndex
                    ? "current"
                    : "upcoming";

                return (
                  <div key={stage} className={`progress-stage ${stepClass}`}>
                    <div className="progress-line"></div>
                    <span className="progress-label">{stage}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="progress-bar">
            {statusStages.map((stage, index) => {
              const currentIndex = getStatusIndex(orderData.status); // Index of the current stage
              const stepClass =
                index < currentIndex
                  ? "completed"
                  : index === currentIndex
                  ? "current"
                  : "upcoming";

              return (
                <div key={stage} className={`progress-step ${stepClass}`}>
                  <div className="progress-circle">{index + 1}</div>
                  <span className="progress-label">{stage}</span>
                  {index < statusStages.length - 1 && (
                    <div
                      className={`progress-line ${
                        index < currentIndex ? "completed" : ""
                      }`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
