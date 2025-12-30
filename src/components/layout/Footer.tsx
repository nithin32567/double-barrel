import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-silver-tertiary/10 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Logo />
                        <p className="text-sm text-silver-tertiary">
                            Premium fashion delivered to your doorstep. Quality you can trust.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-silver-light font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/products" className="text-sm text-silver-tertiary hover:text-silver-primary transition-colors">
                                    Shop All
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart" className="text-sm text-silver-tertiary hover:text-silver-primary transition-colors">
                                    Cart
                                </Link>
                            </li>
                            <li>
                                <Link to="/wishlist" className="text-sm text-silver-tertiary hover:text-silver-primary transition-colors">
                                    Wishlist
                                </Link>
                            </li>
                            <li>
                                <Link to="/orders" className="text-sm text-silver-tertiary hover:text-silver-primary transition-colors">
                                    Track Order
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-silver-light font-semibold mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-sm text-silver-tertiary hover:text-silver-primary transition-colors">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-silver-tertiary hover:text-silver-primary transition-colors">
                                    Shipping Info
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-silver-tertiary hover:text-silver-primary transition-colors">
                                    Returns
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-silver-tertiary hover:text-silver-primary transition-colors">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="text-silver-light font-semibold mb-4">Connect With Us</h3>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="text-silver-tertiary hover:text-silver-primary transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-silver-tertiary hover:text-silver-primary transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-silver-tertiary hover:text-silver-primary transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-silver-tertiary hover:text-silver-primary transition-colors"
                                aria-label="Email"
                            >
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-silver-tertiary/10 mt-8 pt-8 text-center">
                    <p className="text-sm text-silver-tertiary">
                        © {currentYear} Double Barrel. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
