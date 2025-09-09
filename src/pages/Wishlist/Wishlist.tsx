import React from 'react';
import './Wishlist.css';

const Wishlist: React.FC = () => {
  return (
    <div className="wishlist-page">
      <div className="container">
        <h1>My Wishlist</h1>
        
        <div className="wishlist-grid">
          <div className="wishlist-item">
            <div className="product-image-placeholder">
              <span>Product Image</span>
            </div>
            <div className="product-info">
              <h3>Diamond Ring</h3>
              <p>Beautiful diamond ring with authentic Belgian craftsmanship</p>
              <span className="price">€2,500</span>
            </div>
            <div className="wishlist-actions">
              <button className="add-to-cart-btn">Add to Cart</button>
              <button className="remove-btn">Remove</button>
            </div>
          </div>
          
          <div className="wishlist-item">
            <div className="product-image-placeholder">
              <span>Product Image</span>
            </div>
            <div className="product-info">
              <h3>Gold Necklace</h3>
              <p>Elegant gold necklace with premium quality</p>
              <span className="price">€1,800</span>
            </div>
            <div className="wishlist-actions">
              <button className="add-to-cart-btn">Add to Cart</button>
              <button className="remove-btn">Remove</button>
            </div>
          </div>
          
          <div className="wishlist-item">
            <div className="product-image-placeholder">
              <span>Product Image</span>
            </div>
            <div className="product-info">
              <h3>Pearl Earrings</h3>
              <p>Classic pearl earrings for any occasion</p>
              <span className="price">€950</span>
            </div>
            <div className="wishlist-actions">
              <button className="add-to-cart-btn">Add to Cart</button>
              <button className="remove-btn">Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;


