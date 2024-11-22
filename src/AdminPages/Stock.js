import React, { useContext, useState } from 'react';
import { CustomerContext } from '../ContextApi/CustomerContext';
import { useNavigate } from 'react-router-dom';
import FilterSection from '../CustomerPages/FilterSection';
import '../AdminPages_css/Stock.css';
import { useUser } from '../Login _signup_pages/UserContext';

const Stock = () => {
  const { userData } = useUser();
  const { products, loading, error } = useContext(CustomerContext);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const navigate = useNavigate();

  const handleRestock = (productId) => {
    navigate(`/admin/${userData.id}/restock/${productId}`);
  };

  const handleFilter = (filteredItems) => {
    setFilteredProducts(filteredItems);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="stock-container">
      <h1>STOCK</h1>
      <FilterSection items={products} onFilter={handleFilter} />

      <table className="stock-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock Quantity</th>
            <th>Product Id</th>
            <th>Restock</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>₹{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.productId}</td>
              <td>
                {product.quantity < 10 ? (
                  <button className="restock-btn" onClick={() => handleRestock(product._id)}>
                    Restock
                  </button>
                ) : (
                  <span>MINIMUM STOCK AVAILABLE</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stock;