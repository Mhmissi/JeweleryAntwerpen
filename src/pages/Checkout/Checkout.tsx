import React from 'react';
import './Checkout.css';

const Checkout: React.FC = () => {
  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>
        
        <div className="checkout-content">
          <div className="checkout-form">
            <h3>Shipping Information</h3>
            <form>
              <div className="form-row">
                <input type="text" placeholder="First Name" required />
                <input type="text" placeholder="Last Name" required />
              </div>
              <input type="email" placeholder="Email" required />
              <input type="tel" placeholder="Phone" required />
              <input type="text" placeholder="Address" required />
              <div className="form-row">
                <input type="text" placeholder="City" required />
                <input type="text" placeholder="Postal Code" required />
              </div>
              <select required>
                <option value="">Select Country</option>
                <option value="BE">Belgium</option>
                <option value="NL">Netherlands</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
              </select>
            </form>
            
            <h3>Payment Information</h3>
            <form>
              <input type="text" placeholder="Card Number" required />
              <div className="form-row">
                <input type="text" placeholder="MM/YY" required />
                <input type="text" placeholder="CVV" required />
              </div>
              <input type="text" placeholder="Cardholder Name" required />
            </form>
          </div>
          
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-item">
              <span>Diamond Ring</span>
              <span>€2,500</span>
            </div>
            <div className="summary-item">
              <span>Subtotal</span>
              <span>€2,500</span>
            </div>
            <div className="summary-item">
              <span>Shipping</span>
              <span>€25</span>
            </div>
            <div className="summary-item">
              <span>Tax</span>
              <span>€525</span>
            </div>
            <div className="summary-item total">
              <span>Total</span>
              <span>€3,050</span>
            </div>
            <button className="place-order-btn">Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;


