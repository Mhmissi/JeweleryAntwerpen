import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';
import { FirebaseProduct, productService } from '../../services/firebase';

const Products: React.FC = () => {
  const [products, setProducts] = useState<FirebaseProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<FirebaseProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Product categories
  const productCategories = [
    { value: 'all', label: 'All Categories' },
    { value: 'rings', label: 'Rings' },
    { value: 'necklaces', label: 'Necklaces' },
    { value: 'earrings', label: 'Earrings' },
    { value: 'bracelets', label: 'Bracelets' },
    { value: 'watches', label: 'Watches' },
    { value: 'pendants', label: 'Pendants' },
    { value: 'sets', label: 'Sets' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const productsData = await productService.getAllProducts();
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (err) {
        console.error('Failed to load products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return new Date(b.createdAt?.toDate?.() || 0).getTime() - new Date(a.createdAt?.toDate?.() || 0).getTime();
        case 'oldest':
          return new Date(a.createdAt?.toDate?.() || 0).getTime() - new Date(b.createdAt?.toDate?.() || 0).getTime();
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSortBy('name');
  };

  if (loading) {
    return (
      <div className="products-page">
        <div className="container">
          <h1>Our Jewelry Collection</h1>
          <p>Discover our exquisite collection of authentic Belgian craftsmanship</p>
          <div className="no-products">
            <p>Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page">
        <div className="container">
          <h1>Our Jewelry Collection</h1>
          <p>Discover our exquisite collection of authentic Belgian craftsmanship</p>
          <div className="no-products">
            <p>Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="container">
        <h1>Our Jewelry Collection</h1>
        <p>Discover our exquisite collection of authentic Belgian craftsmanship</p>
        
        {/* Filters */}
        <div className="products-controls">
          <div className="filter-group">
            <label>Category</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {productCategories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Sort by</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          <div className="filter-actions">
            <button onClick={clearFilters} className="clear-filters-btn">
              Reset Filters
            </button>
          </div>
        </div>

        {/* Results Info */}
        <div className="results-info">
          <p>
            Showing {filteredProducts.length} of {products.length} products
            {(selectedCategory !== 'all' || sortBy !== 'name') && ' (filtered)'}
          </p>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <p>
              {products.length === 0 
                ? 'No products available yet. Check back soon!' 
                : 'No products match your current filters. Try adjusting your search criteria.'
              }
            </p>
            {(selectedCategory !== 'all' || sortBy !== 'name') && (
              <button onClick={clearFilters} className="btn btn-primary">
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
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
                    <span>
                      {product.images && product.images.length > 0 ? 'Image Error' : 'No Image'}
                    </span>
                  </div>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <span className="price">€{product.price.toLocaleString()}</span>
                  <div className="product-actions">
                    <Link to={`/product/${product.id}`} className="btn btn-outline product-btn">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;


