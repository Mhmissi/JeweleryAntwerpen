import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { Product } from '../../types';
import { FirebaseProduct, productService } from '../../services/firebase';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import './Home.css';

const Home: React.FC = () => {
  const { addItem } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState<FirebaseProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setLoading(true);
        const products = await productService.getAllProducts();
        // Show first 4 products as featured products
        setFeaturedProducts(products.slice(0, 4));
      } catch (err) {
        console.error('Failed to load featured products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  // Convert FirebaseProduct to Product for cart compatibility
  const convertToProduct = (firebaseProduct: FirebaseProduct): Product => {
    return {
      id: firebaseProduct.id || '',
      name: firebaseProduct.name,
      description: firebaseProduct.description,
      price: firebaseProduct.price,
      currency: 'EUR' as const,
      category: firebaseProduct.category as any,
      images: firebaseProduct.images,
      specifications: {
        metal: 'Unknown',
        purity: 'Unknown',
        color: 'Unknown',
        finish: 'Unknown'
      },
      inStock: firebaseProduct.stock > 0,
      stockQuantity: firebaseProduct.stock,
      sku: firebaseProduct.id || '',
      weight: 0,
      dimensions: {
        length: 0,
        width: 0,
        height: 0,
        unit: 'mm' as const
      },
      materials: ['Unknown'],
      createdAt: firebaseProduct.createdAt.toDate(),
      updatedAt: firebaseProduct.updatedAt.toDate()
    };
  };

  const handleAddToCart = (firebaseProduct: FirebaseProduct) => {
    const product = convertToProduct(firebaseProduct);
    addItem(product, 1);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-particles"></div>
          <div className="hero-gradient"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="hero-badge-icon">✨</span>
              <span>Authentic Belgian Craftsmanship</span>
            </div>
            <h1 className="hero-title">
              Premium Jewelry with
              <span className="hero-highlight"> Belgian Craftsmanship</span>
            </h1>
            <p className="hero-description">
              Discover our exclusive collection of fine jewelry, crafted with precision 
              and elegance. From engagement rings to luxury watches, each piece tells 
              a story of timeless beauty.
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-number">35+</span>
                <span className="hero-stat-label">Years Experience</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">10K+</span>
                <span className="hero-stat-label">Happy Customers</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">100%</span>
                <span className="hero-stat-label">Authentic</span>
              </div>
            </div>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary hero-btn">
                <span>Shop Collection</span>
                <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link to="/about" className="btn btn-outline hero-btn">
                <span>Learn More</span>
                <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-image-container">
              <div className="hero-image-glow"></div>
              <img 
                src="https://ik.imagekit.io/ilrj0knoeh/JeweleryAntwerpen/10001.jpg?updatedAt=1757350564549" 
                alt="Premium Jewelry Collection"
                className="hero-main-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hero-image-placeholder hidden">
                <svg className="hero-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Hero Image</span>
              </div>
              <div className="hero-image-decoration">
                <div className="decoration-circle decoration-1"></div>
                <div className="decoration-circle decoration-2"></div>
                <div className="decoration-circle decoration-3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="feature-title">Authentic Quality</h3>
              <p className="feature-description">
                Every piece is certified and guaranteed authentic, meeting the highest 
                standards of Belgian jewelry craftsmanship.
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="feature-title">Worldwide Shipping</h3>
              <p className="feature-description">
                Secure and insured shipping to anywhere in the world, with tracking 
                and signature confirmation.
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="feature-title">Lifetime Warranty</h3>
              <p className="feature-description">
                Our commitment to quality includes a lifetime warranty on all our 
                jewelry pieces and professional maintenance services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-description">
              Discover our most popular and exclusive jewelry pieces
            </p>
          </div>
          
          {loading ? (
            <div className="loading-container">
              <LoadingSpinner />
              <p>Loading featured products...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <p>Failed to load products. Please try again later.</p>
              <button 
                onClick={() => window.location.reload()} 
                className="btn btn-primary"
              >
                Retry
              </button>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="no-products">
              <p>No products available yet. Check back soon!</p>
              <Link to="/admin" className="btn btn-primary">
                Add Products (Admin)
              </Link>
            </div>
          ) : (
            <>
              <div className="products-grid">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="product-image">
                      {product.images && product.images.length > 0 ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div className={`product-image-placeholder ${product.images && product.images.length > 0 ? 'hidden' : ''}`}>
                        <svg className="product-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Product Image</span>
                      </div>
                    </div>
                    
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-description">{product.description}</p>
                      <div className="product-price">
                        €{product.price.toLocaleString()}
                      </div>
                      
                      <div className="product-actions">
                        <Link 
                          to={`/product/${product.id}`} 
                          className="btn btn-outline product-btn"
                        >
                          View Details
                        </Link>
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="btn btn-primary product-btn"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="section-footer">
                <Link to="/products" className="btn btn-primary">
                  View All Products
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="about-title">Crafting Excellence Since 1985</h2>
              <p className="about-description">
                JeweleryAntwerpen has been at the heart of Belgian jewelry craftsmanship 
                for over three decades. Our master artisans combine traditional techniques 
                with modern innovation to create pieces that are both timeless and contemporary.
              </p>
              <p className="about-description">
                Located in the historic diamond district of Antwerp, we source only the 
                finest materials and work with certified gemstones to ensure every piece 
                meets our exacting standards of quality and beauty.
              </p>
              <Link to="/about" className="btn btn-outline">
                Our Story
              </Link>
            </div>
            <div className="about-image">
              <div className="about-image-placeholder">
                <svg className="about-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>Workshop Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Find Your Perfect Piece?</h2>
            <p className="cta-description">
              Join thousands of satisfied customers who trust JeweleryAntwerpen 
              for their most precious jewelry needs.
            </p>
            <div className="cta-actions">
              <Link to="/products" className="btn btn-primary">
                Start Shopping
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

