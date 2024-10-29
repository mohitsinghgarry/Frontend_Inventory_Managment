import React, { useEffect, useState } from 'react';
// import { fetchProducts } from '../api';
import '../AdminPages_css/Stock.css'

function Stock() {
  const [data, setData] = useState([]);

//   useEffect(() => {
//     fetchProducts()
//       .then((res) => {
//         // Filter to only include products with 'uncompleted' status
//         const uncompletedProducts = res.data.filter((product) => product.status === 'uncompleted');
//         setData(uncompletedProducts);
//       })
//       .catch((err) => console.error(err));
//   }, []);

  return (
    <div className="container-main">
        <div className='newcontainer'>
        <h1 className="h1">Stocks</h1>
      <table className="stock-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Items</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.date}</td>
              <td>{product.customer}</td>
              <td>{product.productName}</td>
              <td>{product.price}</td>
              <td>{product.items}</td>
              <td>{product.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    </div>
  );
}

export default Stock;
