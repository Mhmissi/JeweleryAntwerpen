import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import { FirebaseProduct, productService } from '../../services/firebase';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<FirebaseProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setError('Product ID not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const productData = await productService.getProductById(id);
        
        if (!productData) {
          setError('Product not found');
          navigate('/products');
          return;
        }
        
        setProduct(productData);
      } catch (err) {
        console.error('Failed to load product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="error-message">
            <h2>Product Not Found</h2>
            <p>{error || 'The product you are looking for does not exist.'}</p>
            <button 
              className="btn btn-primary" 
              onClick={() => navigate('/products')}
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="product-detail">
          <div className="product-images">
            {product.images && product.images.length > 0 ? (
              <>
                <div className="main-image">
                  <img 
                    src={product.images[selectedImageIndex]} 
                    alt={product.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzE2NS4zIDE1MCAxMzcuNSAxNzcuOCAxMzcuNSAyMTIuNUMxMzcuNSAyNDcuMiAxNjUuMyAyNzUgMjAwIDI3NUMyMzQuNyAyNzUgMjYyLjUgMjQ3LjIgMjYyLjUgMjEyLjVDMjYyLjUgMTc3LjggMjM0LjcgMTUwIDIwMCAxNTBaIiBmaWxsPSIjQ0NDQ0NDIi8+CjxwYXRoIGQ9Ik0xNzUgMjAwSDIyNVYyMjVIMTc1VjIwMFoiIGZpbGw9IiNDQ0NDQ0MiLz4KPC9zdmc+';
                    }}
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="thumbnail-images">
                    {product.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className={`thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
                        onClick={() => setSelectedImageIndex(index)}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik01MCAzN0M0MS4zIDM3IDM0LjQgNDMuOSAzNC40IDUyLjVDMzQuNCA2MS4xIDQxLjMgNjggNTAgNjhDNTguNyA2OCA2NS42IDYxLjEgNjUuNiA1Mi41QzY1LjYgNDMuOSA1OC43IDM3IDUwIDM3WiIgZmlsbD0iI0NDQ0NDQyIvPgo8cGF0aCBkPSJNNDMuOCA1MEg1Ni4yVjU2LjJINDMuOFY1MFoiIGZpbGw9IiNDQ0NDQ0MiLz4KPC9zdmc+';
                        }}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="main-image-placeholder">
                <span>No Image Available</span>
              </div>
            )}
          </div>
          
          <div className="product-info">
            <h1>{product.name}</h1>
            <p className="product-description">
              {product.description}
            </p>
            
            <div className="product-price">
              <span className="price">{formatPrice(product.price)}</span>
            </div>
            
            <div className="product-actions">
              <button className="btn btn-primary">Add to Cart</button>
              <button className="btn btn-secondary">Add to Wishlist</button>
            </div>
            
            <div className="product-details">
              <h3>Product Details</h3>
              <ul>
                <li><strong>Category:</strong> {product.category}</li>
                <li><strong>Stock:</strong> {product.stock} available</li>
                <li><strong>Status:</strong> {product.status}</li>
                <li><strong>SKU:</strong> {product.id}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;


