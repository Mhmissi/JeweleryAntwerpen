import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LoadingSpinner from './components/UI/LoadingSpinner';


// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home/Home'));
const Products = React.lazy(() => import('./pages/Products/Products'));
const ProductDetail = React.lazy(() => import('./pages/ProductDetail/ProductDetail'));
const Cart = React.lazy(() => import('./pages/Cart/Cart'));
const Checkout = React.lazy(() => import('./pages/Checkout/Checkout'));

const Profile = React.lazy(() => import('./pages/Profile/Profile'));
const Orders = React.lazy(() => import('./pages/Orders/Orders'));
const Wishlist = React.lazy(() => import('./pages/Wishlist/Wishlist'));
const About = React.lazy(() => import('./pages/About/About'));
const Contact = React.lazy(() => import('./pages/Contact/Contact'));
const Admin = React.lazy(() => import('./pages/Admin/Admin'));
const NotFound = React.lazy(() => import('./pages/NotFound/NotFound'));

const App: React.FC = () => {
  return (
    <div className="app light">
      <Header />
      <main className="main-content">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:category" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/admin" element={<Admin />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;
