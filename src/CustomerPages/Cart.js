import React, { useContext, useEffect } from 'react';
import CartContext from '../ContextApi/CartContext';
import { MdRemoveShoppingCart } from 'react-icons/md';
import '../CustomerPages_css/Cart.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../Login _signup_pages/UserContext';

const CartItem = ({ item, onRemove, onNavigate }) => {
    const { name, price, orderQuantity, imageUrls } = item;
    const totalPrice = price * orderQuantity;

    return (
        <div
            className="cart-item-card"
            onClick={() => onNavigate(item)}
            style={{ cursor: 'pointer' }}
        >
            <div className='combined-data'>
                <img src={imageUrls[0]} alt={name} className="cart-item-image" />
                <div className="cart-item-cell-name">{name}</div>
            </div>
            <div className="cart-item-cell-quantity">{orderQuantity}</div>
            <div className="cart-item-cell-price">INR{price}</div>
            <div className="cart-item-cell-total">INR{totalPrice}</div>
            <div className="cart-item-cell-action">
                <button
                    className="remove-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove(name);
                    }}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

const Cart = () => {
    const { cartItems, addItemToCart, removeItemFromCart, totalBill, error } = useContext(CartContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { userData } = useUser();

    useEffect(() => {
        if (location.state) {
            addItemToCart(location.state);
        }
    }, [location.state]);

    const handleProductNavigation = (item) => {
        navigate(`/customer/${userData.id}/singleproductcart`, {
            state: { ...item }
        });
    };

    if (cartItems.length === 0) {
        return (
            <div className="empty-cart-container">
                <div className="empty-cart-text">No Items in Cart</div>
                <MdRemoveShoppingCart size={70} />
                <button
                    onClick={() => navigate(`/customer/${userData.id}/product`)}
                    className="back-button"
                >
                    Go Back to Product
                </button>
            </div>
        );
    }

    return (
        <div className="cart-container">
            {error && <div className="error-message">{error}</div>}
            <div className="cart-header">
                <div className="cart-header-cell">Product Name</div>
                <div className="cart-header-cell">Quantity</div>
                <div className="cart-header-cell">Price per Item</div>
                <div className="cart-header-cell">Total Price</div>
                <div className="cart-header-cell">Actions</div>
            </div>
            {cartItems.map((item, index) => (
                <CartItem
                    key={index}
                    item={item}
                    onRemove={removeItemFromCart}
                    onNavigate={handleProductNavigation}
                />
            ))}
            <div className="total-bill-section">
                Total Bill: <strong>INR{totalBill}</strong>
            </div>
            <button
                onClick={() => navigate(`/customer/${userData.id}/product`)}
                className="back-to-product-button"
            >
                Go Back to Product
            </button>
        </div>
    );
};

export default Cart;
