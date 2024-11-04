import React, { useContext, useState } from 'react';
import { CustomerContext } from '../ContextApi/CustomerContext';
import ProductList from './ProductList';
import FilterSection from './FilterSection';
import '../CustomerPages_css/ProductPage.scss'
const ProductPage = () => {
  const { products, loading, error } = useContext(CustomerContext);
  const [filteredProducts, setFilteredProducts] = useState(products); // Store filtered products

  const handleFilter = (filteredItems) => {
    setFilteredProducts(filteredItems);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="products-main-sec">
      <div className="filter-section">
        <FilterSection items={products} onFilter={handleFilter} />
      </div>
      <section className='product-view-sort'>
        <div className="feature-pro">
          <ProductList products={filteredProducts} />
        </div>
      </section>
    </div>
  );
}

export default ProductPage;
