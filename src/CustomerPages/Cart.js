import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../ContextApi/CartContext';
import { MdRemoveShoppingCart } from 'react-icons/md';
import '../CustomerPages_css/Cart.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../Login _signup_pages/UserContext';

const CartItem = ({ item, onRemove, onNavigate }) => {
    const { name, price, orderQuantity, imageUrls, availableQuantity, isOutOfStock } = item;
    const totalPrice = price * orderQuantity;
    const stockStatus = isOutOfStock ? "Out of Stock" : availableQuantity > 0 ? "In Stock" : "Out of Stock";

    return (
        <div
            className={`cart-item-card custom-modern-card-layout ${isOutOfStock ? 'custom-out-of-stock' : ''}`}
            onClick={() => !isOutOfStock && onNavigate(item)}
            style={{ cursor: isOutOfStock ? 'not-allowed' : 'pointer' }}
        >
            <img src={imageUrls[0]} alt={name} className="custom-cart-item-image" />
            <div className="custom-cart-item-details">
                <div className="custom-cart-item-name">{name}</div>
                <div className="custom-cart-item-price">Price: ₹{price}</div>
                <div className="custom-cart-item-quantity">Quantity: {orderQuantity}</div>
                <div className="custom-cart-item-total">Total: ₹{totalPrice}</div>
                <div className={`custom-cart-item-stock ${isOutOfStock ? 'custom-out-of-stock-text' : ''}`}>{stockStatus}</div>
            </div>
            <button
                className="custom-remove-button custom-modern-remove-button"
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove(name);
                }}
            >
                Remove
            </button>
        </div>
    );
};

const Cart = () => {
    const { cartItems, addItemToCart, removeItemFromCart, totalBill, error, updateCartItem } = useContext(CartContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { userData } = useUser();

    useEffect(() => {
        if (location.state) {
            addItemToCart(location.state);
        }
    }, [location.state]);

    useEffect(() => {
        const checkStockStatus = async () => {
            try {
                const updatedCartItems = await Promise.all(
                    cartItems.map(async (item) => {
                        try {
                            const response = await fetch(`https://backend-inventory-management-cy4h.vercel.app/newproduct/${item.productId}`);

                            if (response.ok) {
                                const productDetails = await response.json();
                                const isOutOfStock = productDetails.isOutOfStock <= 0;

                                return {
                                    ...item,
                                    isOutOfStock: productDetails.isOutOfStock,
                                };
                            } else {
                                console.warn(`Failed to fetch data for product ID ${item.productId}`);
                                return { ...item, isOutOfStock: true };
                            }
                        } catch (error) {
                            console.error(`Error fetching stock for item ${item.name}:`, error);
                            return { ...item, isOutOfStock: true };
                        }
                    })
                );

                const hasChanges = updatedCartItems.some(
                    (item, index) => item.isOutOfStock !== cartItems[index].isOutOfStock
                );

                if (hasChanges) {
                    updatedCartItems.forEach((item) => updateCartItem(item));
                }
            } catch (error) {
                console.error('Error during stock status update:', error);
            }
        };

        if (cartItems.length > 0) {
            checkStockStatus();
        }
    }, [cartItems]);

    const handleProductNavigation = (item) => {
        if (item.isOutOfStock) {
            alert("This product is out of stock and cannot be viewed.");
            return;
        }

        navigate(`/customer/${userData.id}/singleproductcart`, {
            state: { ...item },
        });
    };

    if (cartItems.length === 0) {
        return (
            <div className="custom-empty-cart-container">
                <div className="custom-empty-cart-text">No Items in Cart</div>
                <MdRemoveShoppingCart size={70} />
                <button
                    onClick={() => navigate(`/customer/${userData.id}/product`)}
                    className="custom-back-button"
                >
                    Go Back to Product
                </button>
            </div>
        );
    }

    return (
        <div className="custom-cart-container custom-modern-card-container">
            {error && <div className="custom-error-message">{error}</div>}
            <div className="custom-cart-items-grid">
                {cartItems.map((item, index) => (
                    <CartItem
                        key={index}
                        item={item}
                        onRemove={removeItemFromCart}
                        onNavigate={handleProductNavigation}
                    />
                ))}
            </div>
            <div className="custom-total-bill-section">
                Total Bill: <strong>₹{totalBill}</strong>
            </div>
            <button
                onClick={() => navigate(`/customer/${userData.id}/product`)}
                className="custom-back-to-product-button"
            >
                Go Back to Product
            </button>
        </div>
    );
};

export default Cart;
