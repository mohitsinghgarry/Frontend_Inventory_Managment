import React, { useContext, useState } from 'react';
import { CustomerContext } from '../ContextApi/CustomerContext';
import '../CustomerPages_css/ProductPage.scss';
import Loading from '../Login _signup_pages/Loading';
import FilterSection from '../CustomerPages/FilterSection';

const Sales = () => {
  const { products, loading, error } = useContext(CustomerContext);
  const [filteredProducts, setFilteredProducts] = useState(products); // Store filtered products

  const handleFilter = (filteredItems) => {
    setFilteredProducts(filteredItems); // Update filtered products based on filter criteria
  };

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="products-main-sec">
      <h1 style={{ textAlign: "center", color: 'black' }}>SALES</h1>

      {/* Filter Section */}
      <div className="filter-section">
        <FilterSection items={products} onFilter={handleFilter} /> {/* Pass products and filter handler */}
      </div>

      {/* Product List Table */}
      <section className="product-view-sort">
        <div className="feature-pro">
          <table>
            <thead>
              <tr>
                <th>S.No</th> {/* Serial Number Column */}
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock Quantity</th>
                <th>Product Id</th> {/* Optional, depending on if you want to show it */}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Sales;
