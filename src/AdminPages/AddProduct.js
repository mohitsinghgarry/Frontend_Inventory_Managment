import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import styles for react-toastify
import '../AdminPages_css/AddProduct.css';

const AddProduct = () => {
  const [name, setName] = useState("");
  const [productId, setProductId] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(""); // State for quantity
  const [image, setImage] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("productId", productId);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("quantity", quantity); // Include quantity in formData

    try {
      const response = await fetch("http://localhost:3000/admin/add-product", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Product added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        // Reset form fields
        setName("");
        setProductId("");
        setPrice("");
        setCategory("");
        setQuantity(""); // Reset quantity
        setImage(null);
        document.getElementById("file-input").value = null;
      } else {
        const errorData = await response.json();
        toast.error("Error: " + errorData.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Failed to add product: " + error.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="product-add">
      <ToastContainer /> {/* Toast container to display the toast */}
      <h1 style={{ fontWeight: 40 }}>ADD PRODUCT</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Product Id"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="number" // Use 'number' type for quantity
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)} // Correctly set quantity
            required
          />
        </div>

        <div>
          <input
            id="file-input"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            required
          />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
