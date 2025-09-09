import React from 'react';

const CatalogControls = ({ filter, setFilter, sort, setSort }) => {
  return (
    <div className="catalog-controls">
      <input
        type="text"
        placeholder="Filter by category..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="filter-input"
      />
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="sort-select"
      >
        <option value="default">Sort by</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default CatalogControls;