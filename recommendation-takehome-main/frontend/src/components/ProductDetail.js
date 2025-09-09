import React from 'react';

const ProductDetail = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="product-detail-container">
      <button onClick={onClose} className="close-btn">&times; Back to Catalog</button>
      <img src={product.imageUrl} alt={product.name} className="product-detail-image" />
      <h2>{product.name}</h2>
      <p className="detail-brand">by {product.brand}</p>
      <p className="detail-price">${product.price}</p>
      <p className="detail-description">{product.description}</p>
      <h4>Features:</h4>
      <ul>
        {product.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDetail;