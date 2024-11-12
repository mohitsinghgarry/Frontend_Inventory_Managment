import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../CustomerPages_css/SingleProductCart.scss';

const SingleProductCart = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { name = '', price = 0, orderQuantity = 1, imageUrls = [] } = location.state || {}; // Destructure and provide defaults
    console.log(location.state);
    // Handle missing product data
    if (!name || !price) {
        return <p className="no-data-message">No product data available.</p>;
    }

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const totalPrice = price * orderQuantity;

    // Image carousel logic
    useEffect(() => {
        if (imageUrls.length > 0) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
            }, 3000);
            return () => clearInterval(interval); // Clean up interval on unmount
        }
    }, [imageUrls]);

    const handleCheckout = () => {
        alert(`Proceeding to checkout for ${name}. Total: ₹${totalPrice}`);
        // Additional checkout logic here
    };

    return (
        <div className="cart-page">
            <h1 className="cart-title">Product Details</h1>
            <div className="cart-container">
                {/* Image Carousel */}
                {imageUrls.length > 0 && (
                    <div className="cart-image-carousel">
                        <img
                            src={imageUrls[currentImageIndex]}
                            alt={`${name} - Image ${currentImageIndex + 1}`}
                            className="carousel-image"
                        />
                    </div>
                )}

                <div className="cart-item">
                    <div className="cart-item-details">
                        <h3>{name}</h3>
                        <p>Quantity: {orderQuantity}</p>
                        <p>Price per item: ₹{price}</p>
                        <p className="cart-item-total">
                            Total Price: <strong>₹{totalPrice}</strong>
                        </p>
                    </div>
                </div>
                <div className="cart-summary">
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>₹{totalPrice}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className="summary-row total-row">
                        <span>Total</span>
                        <span>₹{totalPrice}</span>
                    </div>
                </div>
                <button className="checkout-button" onClick={handleCheckout}>
                    Checkout
                </button>
                <button className="back-button" onClick={() => navigate(-1)}>
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default SingleProductCart;
