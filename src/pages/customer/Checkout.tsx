import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Checkout: React.FC = () => {
    const { cart, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderId] = useState(`ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zip: '',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setOrderPlaced(true);
        clearCart();
    };

    const total = getCartTotal();

    if (cart.length === 0 && !orderPlaced) {
        navigate('/cart');
        return null;
    }

    if (orderPlaced) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <div className="admin-card">
                        <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
                        <h2 className="text-2xl font-bold text-silver-light mb-2">Order Confirmed!</h2>
                        <p className="text-silver-tertiary mb-4">
                            Your order has been successfully placed.
                        </p>
                        <div className="bg-black-tertiary p-4 rounded-lg mb-6">
                            <p className="text-sm text-silver-tertiary mb-1">Order ID</p>
                            <p className="text-lg font-bold text-silver-primary">{orderId}</p>
                        </div>
                        <p className="text-sm text-silver-tertiary mb-6">
                            A confirmation email has been sent to <span className="text-silver-light">{formData.email}</span>
                        </p>
                        <div className="flex gap-4">
                            <button onClick={() => navigate('/orders')} className="flex-1 btn-primary">
                                Track Order
                            </button>
                            <button onClick={() => navigate('/products')} className="flex-1 btn-secondary">
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-silver-light mb-8">Checkout</h1>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Checkout Form */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Shipping Information */}
                            <div className="admin-card">
                                <h2 className="text-xl font-semibold text-silver-light mb-4">Shipping Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="md:col-span-2"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                    <textarea
                                        name="address"
                                        placeholder="Street Address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        rows={3}
                                        className="md:col-span-2"
                                    />
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="zip"
                                        placeholder="ZIP Code"
                                        value={formData.zip}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Payment Information */}
                            <div className="admin-card">
                                <h2 className="text-xl font-semibold text-silver-light mb-4">Payment Information</h2>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        placeholder="Card Number"
                                        value={formData.cardNumber}
                                        onChange={handleChange}
                                        required
                                        maxLength={16}
                                    />
                                    <input
                                        type="text"
                                        name="cardName"
                                        placeholder="Cardholder Name"
                                        value={formData.cardName}
                                        onChange={handleChange}
                                        required
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            name="expiryDate"
                                            placeholder="MM/YY"
                                            value={formData.expiryDate}
                                            onChange={handleChange}
                                            required
                                            maxLength={5}
                                        />
                                        <input
                                            type="text"
                                            name="cvv"
                                            placeholder="CVV"
                                            value={formData.cvv}
                                            onChange={handleChange}
                                            required
                                            maxLength={3}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="admin-card sticky top-24">
                                <h2 className="text-xl font-semibold text-silver-light mb-4">Order Summary</h2>

                                <div className="space-y-3 mb-6">
                                    {cart.map((item, index) => (
                                        <div key={`${item.product.id}-${item.size}-${index}`} className="flex justify-between text-sm">
                                            <span className="text-silver-tertiary">
                                                {item.product.name} ({item.size}) x{item.quantity}
                                            </span>
                                            <span className="text-silver-light">
                                                ${(item.product.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-3 border-t border-silver-tertiary/20 pt-4">
                                    <div className="flex justify-between text-silver-tertiary">
                                        <span>Subtotal</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-silver-tertiary">
                                        <span>Shipping</span>
                                        <span>FREE</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold border-t border-silver-tertiary/20 pt-3">
                                        <span className="text-silver-light">Total</span>
                                        <span className="text-silver-primary">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button type="submit" className="w-full btn-primary mt-6">
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
