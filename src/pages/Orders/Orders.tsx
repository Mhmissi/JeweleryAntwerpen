import React from 'react';
import './Orders.css';

const Orders: React.FC = () => {
  return (
    <div className="orders-page">
      <div className="container">
        <h1>My Orders</h1>
        
        <div className="orders-list">
          <div className="order-item">
            <div className="order-header">
              <h3>Order #12345</h3>
              <span className="order-date">March 15, 2024</span>
              <span className="order-status delivered">Delivered</span>
            </div>
            <div className="order-content">
              <div className="order-product">
                <div className="product-image-placeholder">
                  <span>Image</span>
                </div>
                <div className="product-info">
                  <h4>Diamond Ring</h4>
                  <p>18k White Gold, 1.5 carat</p>
                </div>
                <div className="product-price">€2,500</div>
              </div>
            </div>
            <div className="order-total">
              <span>Total: €3,050</span>
            </div>
          </div>
          
          <div className="order-item">
            <div className="order-header">
              <h3>Order #12344</h3>
              <span className="order-date">March 10, 2024</span>
              <span className="order-status processing">Processing</span>
            </div>
            <div className="order-content">
              <div className="order-product">
                <div className="product-image-placeholder">
                  <span>Image</span>
                </div>
                <div className="product-info">
                  <h4>Gold Necklace</h4>
                  <p>18k Yellow Gold</p>
                </div>
                <div className="product-price">€1,800</div>
              </div>
            </div>
            <div className="order-total">
              <span>Total: €2,350</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;


