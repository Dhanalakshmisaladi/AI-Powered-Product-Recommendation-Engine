import React from 'react';

const UserPreferences = ({ preferences, setPreferences, onSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload on form submit
    onSubmit();
  };

  return (
    <div className="preferences-container">
      <h2>Your Preferences</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input 
            type="text" 
            id="category" 
            name="category"
            value={preferences.category}
            onChange={handleChange}
            placeholder="e.g., Electronics, Clothing"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price_range">Price Range:</label>
          <input 
            type="text" 
            id="price_range" 
            name="price_range"
            value={preferences.price_range}
            onChange={handleChange}
            placeholder="e.g., under $100"
          />
        </div>
        <button type="submit" className="submit-btn">Get Recommendations</button>
      </form>
    </div>
  );
};

export default UserPreferences;