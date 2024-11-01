import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../Login _signup_pages/UserContext';
import '../AdminPages_css/UpdateProduct.css'
const UpdateProduct = () => {
    const { productId } = useParams(); // Get productId from the URL
    const { userData } = useUser(); 
    const navigate = useNavigate();
    
    const [product, setProduct] = useState({
        name: '',
        productId: '',
        price: '',
        category: '',
        quantity: '',
        imageUrl: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [imageFile, setImageFile] = useState(null); // New state for storing the selected file

    // Fetch product details when the component mounts
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
    }, [productId]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    // Handle file input changes
    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation check for all fields and image file
        if (!product.name || !product.productId || !product.price || !product.category || !product.quantity || (!imageFile && !product.imageUrl)) {
            toast.error('All fields, including the image, are mandatory', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('productId', product.productId);
            formData.append('price', product.price);
            formData.append('category', product.category);
            formData.append('quantity', product.quantity);

            // If a new image file is selected, append it to form data
            if (imageFile) {
                formData.append('image', imageFile);
            } else {
                formData.append('imageUrl', product.imageUrl); // Send existing URL if no new file is selected
            }

            const response = await fetch(`http://localhost:3000/products/${productId}`, {
                method: 'PUT',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to update product');
            }

            // Show success toast
            toast.success('Product updated successfully!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            navigate(`/admin/${userData.id}/product`); // Redirect after update
        } catch (err) {
            setError(err.message);
        }
    };

    // Render loading and error states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='form-content'>
            <h1>Update Product</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Product ID:</label>
                    <input
                        type="text"
                        name="productId"
                        value={product.productId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type="file"
                        onChange={handleFileChange} // Set the file input handler
                        required={!product.imageUrl} // Only required if no existing image is present
                    />
                    {product.imageUrl && (
                        <div>
                            <img src={product.imageUrl} alt={product.name} style={{ width: '50px', height: '50px' }} />
                            <p>Current Image</p>
                        </div>
                    )}
                </div>
                <button type="submit">Update Product</button>
            </form>
            {/* Toast Container to display notifications */}
            <ToastContainer />
        </div>
    );
};

export default UpdateProduct;
