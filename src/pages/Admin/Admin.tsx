import React, { useState, useEffect, ChangeEvent } from 'react';
import './Admin.css';
import { 
  FirebaseProduct,
  FirebaseOrder,
  FirebaseUser,
  productService,
  dashboardService
} from '../../services/firebase';
import { uploadToImageKit } from '../../services/imagekit';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<FirebaseProduct[]>([]);
  const [orders, setOrders] = useState<FirebaseOrder[]>([]);
  const [users, setUsers] = useState<FirebaseUser[]>([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    lowStockCount: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // Product categories
  const productCategories = [
    { value: 'rings', label: 'Rings' },
    { value: 'necklaces', label: 'Necklaces' },
    { value: 'earrings', label: 'Earrings' },
    { value: 'bracelets', label: 'Bracelets' },
    { value: 'watches', label: 'Watches' },
    { value: 'pendants', label: 'Pendants' },
    { value: 'sets', label: 'Sets' },
    { value: 'other', label: 'Other' }
  ];

  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState('rings');
  const [newPrice, setNewPrice] = useState('');
  const [newStock, setNewStock] = useState('0');
  const [newImages, setNewImages] = useState<File[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Load real data from Firebase
        const [productsData, dashboardStatsData] = await Promise.all([
          productService.getAllProducts(),
          dashboardService.getDashboardStats()
        ]);
        
        // Set real data
        setProducts(productsData);
        setDashboardStats(dashboardStatsData);
        
        // For now, keep mock orders and users until we implement those features
        const mockOrders: FirebaseOrder[] = [];
        const mockUsers: FirebaseUser[] = [];
        setOrders(mockOrders);
        setUsers(mockUsers);

      } catch (error) {
        console.error('Error loading admin data:', error);
        // Set empty data on error
        setProducts([]);
        setOrders([]);
        setUsers([]);
        setDashboardStats({
          totalProducts: 0,
          totalOrders: 0,
          totalCustomers: 0,
          totalRevenue: 0,
          lowStockCount: 0
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const resetForm = () => {
    setNewName('');
    setNewDescription('');
    setNewCategory('rings');
    setNewPrice('');
    setNewStock('0');
    setNewImages([]);
    setFormError(null);
  };

  const openAddModal = () => { resetForm(); setShowAddModal(true); };
  const closeAddModal = () => { setShowAddModal(false); };

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setNewImages(files);
  };

  const validateForm = (): string | null => {
    if (!newName.trim()) return 'Please enter a product name';
    const p = Number(newPrice);
    if (Number.isNaN(p) || p < 0) return 'Please enter a valid price';
    const s = Number(newStock);
    if (!Number.isInteger(s) || s < 0) return 'Please enter a valid stock quantity';
    return null;
  };

  const submitNewProduct = async () => {
    setFormError(null);
    const v = validateForm();
    if (v) { setFormError(v); return; }

    try {
      setIsAdding(true);
      
      // Upload images to ImageKit
      let imageUrls: string[] = [];
      if (newImages.length > 0) {
        const uploadPromises = newImages.map(file => 
          uploadToImageKit(file, '/products')
        );
        const uploadResults = await Promise.all(uploadPromises);
        imageUrls = uploadResults.map(result => result.url);
      }

      // Create new product data for Firebase
      const productData = {
        name: newName.trim(),
        description: newDescription.trim(),
        category: newCategory.trim(),
        price: Number(newPrice),
        stock: Number(newStock),
        images: imageUrls,
        status: 'active' as const
      };

      // Save to Firebase
      const productId = await productService.addProduct(productData);
      
      // Add product to local state with the real ID
      const newProduct: FirebaseProduct = {
        id: productId,
        ...productData,
        createdAt: new Date() as any,
        updatedAt: new Date() as any
      };
      
      setProducts(prev => [...prev, newProduct]);

      // Update dashboard stats
      setDashboardStats(prev => ({
        ...prev,
        totalProducts: prev.totalProducts + 1,
        lowStockCount: prev.lowStockCount + (newProduct.stock < 10 ? 1 : 0)
      }));

      // Close modal and reset form
      setShowAddModal(false);
      resetForm();
      
    } catch (e) {
      console.error('Add product failed:', e);
      setFormError(`Failed to add product: ${e instanceof Error ? e.message : 'Unknown error'}`);
    } finally {
      setIsAdding(false);
    }
  };

  const renderDashboard = () => (
    <div className="admin-dashboard">
      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-value">{dashboardStats.totalProducts}</div>
          <div className="stat-label">Total Products</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{dashboardStats.totalOrders}</div>
          <div className="stat-label">Total Orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{dashboardStats.totalCustomers}</div>
          <div className="stat-label">Total Customers</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">€{dashboardStats.totalRevenue.toFixed(2)}</div>
          <div className="stat-label">Total Revenue</div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section">
          <h3>Recent Orders</h3>
          <div className="recent-orders">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="order-item">
                <div className="order-id">#{order.id}</div>
                <div className="order-customer">{order.customerName}</div>
                <div className="order-total">€{order.total}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h3>Low Stock Alerts</h3>
          <div className="low-stock-list">
            {products.filter(p => p.stock < 10).slice(0, 5).map((product) => (
              <div key={product.id} className="low-stock-item">
                <span className="product-name">{product.name}</span>
                <span className="stock-count">{product.stock} left</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="admin-products">
      <div className="section-header">
        <h2>Product Management</h2>
        <button className="btn btn-primary" onClick={openAddModal}>
          Add New Product
        </button>
      </div>



      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>€{product.price}</td>
                <td>
                  <span className={`stock-status ${product.stock < 10 ? 'low' : 'normal'}`}>
                    {product.stock}
                  </span>
                </td>
                <td>
                  <span className={`status-badge status-${product.status}`}>
                    {product.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-sm btn-outline">Edit</button>
                    <button className="btn btn-sm btn-secondary">View</button>
                    <button className="btn btn-sm btn-ghost">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={closeAddModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Product</h3>
              <button className="modal-close" onClick={closeAddModal}>×</button>
            </div>
            {formError && <div className="admin-error" role="alert">{formError}</div>}
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-field">
                  <label>Name</label>
                  <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Gold Ring" />
                </div>
                <div className="form-field">
                  <label>Category</label>
                  <select 
                    value={newCategory} 
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="form-select"
                  >
                    {productCategories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label>Price (€)</label>
                  <input value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="99.99" />
                </div>
                <div className="form-field">
                  <label>Stock</label>
                  <input value={newStock} onChange={(e) => setNewStock(e.target.value)} placeholder="10" />
                </div>
                <div className="form-field form-span-2">
                  <label>Description</label>
                  <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Describe the product" rows={4} />
                </div>
                <div className="form-field form-span-2">
                  <label>Images</label>
                  <input type="file" accept="image/*" multiple onChange={handleImagesChange} />
                  {newImages.length > 0 && (
                    <div className="image-preview">
                      {newImages.map((file, idx) => (
                        <span className="image-chip" key={idx}>{file.name}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={closeAddModal}>Cancel</button>
              <button className="btn btn-primary" onClick={submitNewProduct} disabled={isAdding}>
                {isAdding ? 'Saving…' : 'Save Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderOrders = () => (
    <div className="admin-orders">
      <div className="section-header">
        <h2>Order Management</h2>
        <div className="order-filters">
          <select className="form-select">
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>€{order.total}</td>
                <td>
                  <span className={`status-badge status-${order.status}`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-sm btn-outline">View</button>
                    <button className="btn btn-sm btn-primary">Update Status</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="admin-users">
      <div className="section-header">
        <h2>User Management</h2>
        <button className="btn btn-primary">Add New User</button>
      </div>

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.uid}>
                <td>{user.uid}</td>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge role-${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className="status-badge status-active">
                    active
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-sm btn-outline">Edit</button>
                    <button className="btn btn-sm btn-secondary">View</button>
                    <button className="btn btn-sm btn-ghost">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="admin-analytics">
      <div className="section-header">
        <h2>Analytics & Reports</h2>
        <div className="date-filters">
          <select className="form-select">
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Sales Overview</h3>
          <div className="chart-placeholder">
            <div className="chart-content">
              <span className="chart-icon">📊</span>
              <p>Sales chart will be displayed here</p>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Top Products</h3>
          <div className="top-products">
            {products.slice(0, 5).map((product, index) => (
              <div key={product.id} className="top-product-item">
                <span className="rank">#{index + 1}</span>
                <span className="product-name">{product.name}</span>
                <span className="product-sales">€{product.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-card">
          <h3>Customer Insights</h3>
          <div className="customer-insights">
            <div className="insight-item">
              <span className="insight-label">New Customers</span>
              <span className="insight-value">+12</span>
            </div>
            <div className="insight-item">
              <span className="insight-label">Repeat Customers</span>
              <span className="insight-value">68%</span>
            </div>
            <div className="insight-item">
              <span className="insight-label">Average Order Value</span>
              <span className="insight-value">€1,245</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function renderContent() {
    if (isLoading) {
      return (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading admin data...</p>
        </div>
      );
    }

    if (activeTab === 'dashboard') return renderDashboard();
    if (activeTab === 'products') return renderProducts();
    if (activeTab === 'orders') return renderOrders();
    if (activeTab === 'users') return renderUsers();
    if (activeTab === 'analytics') return renderAnalytics();
    return null;
  }



  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage your jewelry shop operations</p>
      </div>

      <div className="admin-container">
        <nav className="admin-nav">
          <button
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            💎 Products
          </button>
          <button
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            📦 Orders
          </button>
          <button
            className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Users
          </button>
          <button
            className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            📈 Analytics
          </button>
        </nav>

        <main className="admin-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Admin;
