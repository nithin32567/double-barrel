import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import CartItem from '../../components/customer/CartItem';
import { useCart } from '../../context/CartContext';

const Cart: React.FC = () => {
    const { cart, getCartTotal } = useCart();
    const navigate = useNavigate();
    const total = getCartTotal();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center">
                    <ShoppingBag size={64} className="mx-auto text-silver-tertiary mb-4" />
                    <h2 className="text-2xl font-bold text-silver-light mb-2">Your cart is empty</h2>
                    <p className="text-silver-tertiary mb-6">Add some products to get started</p>
                    <Link to="/products" className="btn-primary">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-silver-light mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item, index) => (
                            <CartItem key={`${item.product.id}-${item.size}-${index}`} item={item} />
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="admin-card sticky top-24">
                            <h2 className="text-xl font-semibold text-silver-light mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-silver-tertiary">
                                    <span>Subtotal</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-silver-tertiary">
                                    <span>Shipping</span>
                                    <span>FREE</span>
                                </div>
                                <div className="border-t border-silver-tertiary/20 pt-4">
                                    <div className="flex justify-between text-lg font-bold">
                                        <span className="text-silver-light">Total</span>
                                        <span className="text-silver-primary">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full btn-primary"
                            >
                                Proceed to Checkout
                            </button>

                            <Link
                                to="/products"
                                className="block text-center text-silver-tertiary hover:text-silver-primary mt-4 transition-colors"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
