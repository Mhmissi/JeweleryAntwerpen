import React from 'react';
import './Contact.css';

const Contact: React.FC = () => {
  return (
    <div className="contact-page">
      <div className="container">
        <h1>Contact Us</h1>
        
        <div className="contact-content">
          <div className="contact-info-section">
            <h2>Get in Touch</h2>
            <p>
              We'd love to hear from you! Whether you have questions about our jewelry, 
              want to schedule a visit to our workshop, or need assistance with an order, 
              our team is here to help.
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <h3>Visit Our Workshop</h3>
                <p><strong>Address:</strong><br />
                Diamond Street 123<br />
                2000 Antwerp, Belgium</p>
              </div>
              
              <div className="contact-item">
                <h3>Contact Information</h3>
                <p><strong>Phone:</strong> +32 3 123 45 67<br />
                <strong>Email:</strong> info@jeweleryantwerpen.be<br />
                <strong>Hours:</strong> Mon-Fri: 9:00 AM - 6:00 PM</p>
              </div>
              
              <div className="contact-item">
                <h3>Follow Us</h3>
                <p>Stay updated with our latest collections and craftsmanship stories on social media.</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form-section">
            <h2>Send us a Message</h2>
            <form className="contact-form">
              <div className="form-row">
                <input type="text" placeholder="First Name" required />
                <input type="text" placeholder="Last Name" required />
              </div>
              <input type="email" placeholder="Email" required />
              <input type="tel" placeholder="Phone" />
              <select required>
                <option value="">Select Subject</option>
                <option value="general">General Inquiry</option>
                <option value="product">Product Information</option>
                <option value="order">Order Status</option>
                <option value="workshop">Workshop Visit</option>
                <option value="other">Other</option>
              </select>
              <textarea placeholder="Your Message" rows={6} required></textarea>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;


