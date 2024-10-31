import React from 'react'
import ProductList from './ProductList'
import FilterSection from './FilterSection'
const ProductPage = () => {
  return (
    <div className="products-main-sec">
    <div className="filter-section">
      <FilterSection/>
    </div>
    <section className='product-view-sort'>
      <div className="feature-pro">
        <ProductList/>
      </div>
    </section>
  </div>
  )
}

export default ProductPage