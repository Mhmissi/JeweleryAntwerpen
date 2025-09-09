import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h1>About Jewelery Antwerpen</h1>
        
        <div className="about-content">
          <div className="about-section">
            <h2>Our Story</h2>
            <p>
              Founded in the heart of Antwerp, Belgium, Jewelery Antwerpen has been crafting 
              exceptional jewelry pieces for over three decades. Our commitment to authentic 
              Belgian craftsmanship and premium quality materials has made us a trusted name 
              in luxury jewelry across Europe.
            </p>
          </div>
          
          <div className="about-section">
            <h2>Belgian Craftsmanship</h2>
            <p>
              Antwerp is renowned worldwide for its diamond expertise and jewelry craftsmanship. 
              Our master artisans combine traditional techniques with modern innovation to create 
              timeless pieces that tell your unique story. Every piece is carefully crafted with 
              attention to detail and the highest standards of quality.
            </p>
          </div>
          
          <div className="about-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <h3>Quality</h3>
                <p>We use only the finest materials and maintain the highest standards in every piece.</p>
              </div>
              <div className="value-item">
                <h3>Authenticity</h3>
                <p>Every piece is authentically crafted in Belgium with genuine materials.</p>
              </div>
              <div className="value-item">
                <h3>Heritage</h3>
                <p>We honor the rich tradition of Belgian jewelry making and diamond cutting.</p>
              </div>
              <div className="value-item">
                <h3>Excellence</h3>
                <p>We strive for excellence in design, craftsmanship, and customer service.</p>
              </div>
            </div>
          </div>
          
          <div className="about-section">
            <h2>Visit Our Workshop</h2>
            <p>
              Located in the historic center of Antwerp, our workshop is open to visitors 
              who want to see our craftsmen at work. Experience the magic of jewelry making 
              and learn about the fascinating world of diamonds and precious metals.
            </p>
            <div className="contact-info">
              <p><strong>Address:</strong> Diamond Street 123, 2000 Antwerp, Belgium</p>
              <p><strong>Phone:</strong> +32 3 123 45 67</p>
              <p><strong>Email:</strong> info@jeweleryantwerpen.be</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;


