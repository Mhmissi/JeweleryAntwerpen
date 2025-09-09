import React from 'react';
import './Cart.css';

const Cart: React.FC = () => {
  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            <div className="cart-item">
              <div className="item-image-placeholder">
                <span>Image</span>
              </div>
              <div className="item-details">
                <h3>Diamond Ring</h3>
                <p>18k White Gold, 1.5 carat</p>
              </div>
              <div className="item-quantity">
                <button className="qty-btn">-</button>
                <span>1</span>
                <button className="qty-btn">+</button>
              </div>
              <div className="item-price">€2,500</div>
              <button className="remove-btn">Remove</button>
            </div>
          </div>
          
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>€2,500</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>€25</span>
            </div>
            <div className="summary-row">
              <span>Tax:</span>
              <span>€525</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>€3,050</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;


