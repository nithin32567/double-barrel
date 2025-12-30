import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, Package, Menu, X } from 'lucide-react';
import Logo from './Logo';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { getCartItemCount } = useCart();
    const location = useLocation();
    const cartCount = getCartItemCount();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/products', label: 'Products' },
        { path: '/cart', label: 'Cart', icon: ShoppingCart, badge: cartCount },
        { path: '/wishlist', label: 'Wishlist', icon: Heart },
        { path: '/orders', label: 'Orders', icon: Package },
    ];

    return (
        <header className="sticky top-0 z-50 glass-panel border-b border-silver-tertiary/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-6">
                    {/* Logo */}
                    <Logo />

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`relative flex items-center space-x-2 text-sm font-medium transition-colors ${isActive(link.path)
                                    ? 'text-silver-light'
                                    : 'text-silver-tertiary hover:text-silver-primary'
                                    }`}
                            >
                                {link.icon && <link.icon size={18} />}
                                <span>{link.label}</span>
                                {link.badge !== undefined && link.badge > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-silver-primary text-black-primary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {link.badge}
                                    </span>
                                )}
                                {isActive(link.path) && (
                                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-silver-primary to-transparent"></div>
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-silver-primary"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-silver-tertiary/10 animate-fade-in">
                    <nav className="px-4 py-4 space-y-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`flex items-center justify-between py-2 px-4 rounded-lg transition-all ${isActive(link.path)
                                    ? 'bg-black-secondary text-silver-light'
                                    : 'text-silver-tertiary hover:bg-black-secondary hover:text-silver-primary'
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    {link.icon && <link.icon size={20} />}
                                    <span className="font-medium">{link.label}</span>
                                </div>
                                {link.badge !== undefined && link.badge > 0 && (
                                    <span className="bg-silver-primary text-black-primary text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                        {link.badge}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
