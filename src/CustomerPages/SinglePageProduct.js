import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SinglePageProduct = () => {
    const { productId } = useParams(); // Get the productId from the URL
    const [product, setProduct] = useState(null); // State to store product data
    const [loading, setLoading] = useState(true); // Loading state to show while fetching product
    const [error, setError] = useState(''); // Error state to handle failed requests

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/product/${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]); // Only run this effect when productId changes

    // Loading and Error handling
    if (loading) return <p>Loading product...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="single-product">
            {product && (
                <>
                    <h1>{product.name}</h1>

                    {/* Display all images */}
                    {product.imageUrls && product.imageUrls.length > 0 && (
                        <div className="product-images">
                            {product.imageUrls.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`${product.name} image ${index + 1}`}
                                    className="product-image"
                                />
                            ))}
                        </div>
                    )}

                    <p>Category: {product.category}</p>
                    <p>Price: ₹{product.price}</p>
                    <p>Description: {product.description}</p>
                    <p>Quantity Available: {product.quantity}</p>
                </>
            )}
        </div>
    );
};

export default SinglePageProduct;
