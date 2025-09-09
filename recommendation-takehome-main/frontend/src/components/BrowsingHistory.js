import React from 'react';

// Accept a new function prop: onDeleteItem
const BrowsingHistory = ({ history, onDeleteItem }) => {
  if (history.length === 0) {
    return null; // Don't show anything if history is empty
  }

  return (
    <div className="history-container">
      <h2>Browsing History</h2>
      <ul className="history-list">
        {history.map(item => (
          <li key={item.id} className="history-item">
            <span>{item.name}</span>
            {/* This button will call the function from App.js */}
            <button 
              onClick={() => onDeleteItem(item.id)} 
              className="delete-history-btn"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrowsingHistory;
