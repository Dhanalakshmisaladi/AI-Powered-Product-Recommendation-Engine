import React from 'react';

// Accept productCatalog as a new prop
const Recommendations = ({ recommendations, onProductSelect, productCatalog }) => {
  if (!recommendations) {
    return null;
  }
  if (recommendations.error) {
    return <div className="recommendations-container error-message">Error: {recommendations.error}</div>;
  }
  if (!recommendations.recommendations || recommendations.recommendations.length === 0) {
    return (
      <div className="recommendations-container">
        <h2>AI Recommendations</h2>
        <p>No relevant products found for your request. Please try different preferences.</p>
      </div>
    );
  }

  return (
    <div className="recommendations-container">
      <h2>AI Recommendations</h2>
      {recommendations.recommendations.map((rec, index) => {
        // Find the full product details using the ID from the recommendation
        const product = productCatalog.find(p => p.id === rec.product_id);

        // If the product doesn't exist in our catalog, skip rendering it
        if (!product) {
          return null; 
        }

        // If the product exists, render the card with its real name
        return (
          <div key={index} className="rec-card clickable" onClick={() => onProductSelect(product.id)}>
            <h3>{product.name}</h3> {/* <-- Use the real product name */}
            <p>{rec.reason}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Recommendations;