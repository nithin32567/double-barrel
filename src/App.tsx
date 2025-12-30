import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AdminSidebar from './components/layout/AdminSidebar';

// Customer Pages
import Home from './pages/customer/Home';
import ProductListing from './pages/customer/ProductListing';
import ProductDetail from './pages/customer/ProductDetail';
import Cart from './pages/customer/Cart';
import Wishlist from './pages/customer/Wishlist';
import Checkout from './pages/customer/Checkout';
import OrderTracking from './pages/customer/OrderTracking';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import ProductManagement from './pages/admin/ProductManagement';
import CategoryManagement from './pages/admin/CategoryManagement';
import OrderManagement from './pages/admin/OrderManagement';

// Protected Route Component
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { auth } = useAdminAuth();
    return auth.isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

// Customer Layout
const CustomerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
            <Footer />
        </div>
    );
};

// Admin Layout
const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="flex-1 bg-black-primary">{children}</main>
        </div>
    );
};

function App() {
    return (
        <BrowserRouter>
            <AdminAuthProvider>
                <CartProvider>
                    <WishlistProvider>
                        <Routes>
                            {/* Customer Routes */}
                            <Route path="/" element={<CustomerLayout><Home /></CustomerLayout>} />
                            <Route path="/products" element={<CustomerLayout><ProductListing /></CustomerLayout>} />
                            <Route path="/products/:id" element={<CustomerLayout><ProductDetail /></CustomerLayout>} />
                            <Route path="/cart" element={<CustomerLayout><Cart /></CustomerLayout>} />
                            <Route path="/wishlist" element={<CustomerLayout><Wishlist /></CustomerLayout>} />
                            <Route path="/checkout" element={<CustomerLayout><Checkout /></CustomerLayout>} />
                            <Route path="/orders" element={<CustomerLayout><OrderTracking /></CustomerLayout>} />

                            {/* Admin Routes */}
                            <Route path="/admin/login" element={<AdminLogin />} />
                            <Route
                                path="/admin/dashboard"
                                element={
                                    <ProtectedAdminRoute>
                                        <AdminLayout><Dashboard /></AdminLayout>
                                    </ProtectedAdminRoute>
                                }
                            />
                            <Route
                                path="/admin/products"
                                element={
                                    <ProtectedAdminRoute>
                                        <AdminLayout><ProductManagement /></AdminLayout>
                                    </ProtectedAdminRoute>
                                }
                            />
                            <Route
                                path="/admin/categories"
                                element={
                                    <ProtectedAdminRoute>
                                        <AdminLayout><CategoryManagement /></AdminLayout>
                                    </ProtectedAdminRoute>
                                }
                            />
                            <Route
                                path="/admin/orders"
                                element={
                                    <ProtectedAdminRoute>
                                        <AdminLayout><OrderManagement /></AdminLayout>
                                    </ProtectedAdminRoute>
                                }
                            />

                            {/* Redirect /admin to /admin/login */}
                            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

                            {/* 404 - Redirect to home */}
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </WishlistProvider>
                </CartProvider>
            </AdminAuthProvider>
        </BrowserRouter>
    );
}

export default App;
