import React, { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js'; // <-- Import Fuse.js
import Catalog from './components/Catalog';
import UserPreferences from './components/UserPreferences';
import BrowsingHistory from './components/BrowsingHistory';
import Recommendations from './components/Recommendations';
import ProductDetail from './components/ProductDetail';
import CatalogControls from './components/CatalogControls';
import './styles/App.css';

function App() {
  const [preferences, setPreferences] = useState({ category: '', price_range: '' });
  const [history, setHistory] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [productCatalog, setProductCatalog] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [filterTerm, setFilterTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5001/api/products');
        const data = await response.json();
        setProductCatalog(data);
      } catch (error) {
        console.error("Failed to fetch the product catalog:", error);
      }
    };
    fetchAllProducts();
  }, []);

  // --- THIS IS THE NEW FUSE.JS LOGIC ---
  // Create a Fuse instance. useMemo prevents it from being recreated on every render.
  const fuse = useMemo(() => new Fuse(productCatalog, {
    keys: ['name', 'category', 'tags'], // Properties to search in
    includeScore: true,
    threshold: 0.4, // Adjust for more/less fuzziness (0=exact, 1=anything)
  }), [productCatalog]);

  const handleProductClick = (product) => {
    if (!history.find(p => p.id === product.id)) {
      setHistory([...history, product]);
    }
    setSelectedProduct(product);
  };

  const handleRecommendationClick = (productId) => {
    const product = productCatalog.find(p => p.id === productId);
    setSelectedProduct(product);
  };

  const handleDeleteHistoryItem = (productIdToDelete) => {
    const updatedHistory = history.filter(item => item.id !== productIdToDelete);
    setHistory(updatedHistory);
  };

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    setRecommendations(null);
    try {
      const response = await fetch('http://127.0.0.1:5001/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          preferences: preferences,
          history: history.map(({ id, name, category }) => ({ id, name, category }))
        }),
      });
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
      setRecommendations({ error: 'Failed to connect to the server.' });
    }
    setIsLoading(false);
  };

  // The filtering logic is now handled by Fuse.js
  const filteredProducts = filterTerm
    ? fuse.search(filterTerm).map(result => result.item)
    : productCatalog;

  // The sorting logic is now applied to the filtered results
  const filteredAndSortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'price-asc') {
      return a.price - b.price;
    }
    if (sortOrder === 'price-desc') {
      return b.price - a.price;
    }
    return 0; // No sorting or default
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Product Recommender</h1>
      </header>
      <main>
        <div className="main-layout">
          <div className="left-panel">
            <UserPreferences
              preferences={preferences}
              setPreferences={setPreferences}
              onSubmit={handleGetRecommendations}
            />
            <BrowsingHistory
              history={history}
              onDeleteItem={handleDeleteHistoryItem}
            />
            {isLoading && <div className="loading">Getting recommendations...</div>}
            <Recommendations
              recommendations={recommendations}
              onProductSelect={handleRecommendationClick}
              productCatalog={productCatalog}
            />
          </div>
          <div className="right-panel">
            <CatalogControls
              filter={filterTerm}
              setFilter={setFilterTerm}
              sort={sortOrder}
              setSort={setSortOrder}
            />
            {selectedProduct ? (
              <ProductDetail
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
              />
            ) : (
              <Catalog
                products={filteredAndSortedProducts}
                onProductClick={handleProductClick}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

