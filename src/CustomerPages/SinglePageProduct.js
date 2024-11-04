// SinglePageProduct.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SinglePageProduct = () => {
    const { productId } = useParams(); // Get the productId from the URL
    const [product, setProduct] = useState(null); // State to store product data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    // const {
    //     name,
    //     price,
    //     description,
    //     category,
    //     quantity,
    //     imageUrl } = product;
    console.log(product)
    return (
        <div className="single-product">
            {product && (
                <>
                    <h1>{product.name}</h1>
                    <img src={product.imageUrl} alt={product.name} />
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
