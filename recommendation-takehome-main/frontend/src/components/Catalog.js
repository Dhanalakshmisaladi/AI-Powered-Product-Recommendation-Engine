import React from 'react';

// This component now directly receives the list of products to display.
// It no longer fetches its own data.
const Catalog = ({ products, onProductClick }) => {

  // We removed the old useState and useEffect.

  if (!products) {
    return <div className="loading">Loading products...</div>;
  }

  if (products.length === 0) {
    return <p>No products match your filter.</p>;
  }

  return (
    <div className="catalog-container">
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card" onClick={() => onProductClick(product)}>
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="price">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;

