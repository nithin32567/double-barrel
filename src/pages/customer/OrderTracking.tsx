import React from 'react';
import { Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import OrderTimeline from '../../components/customer/OrderTimeline';
import { orders } from '../../data/orders';

const OrderTracking: React.FC = () => {
    if (orders.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center">
                    <Package size={64} className="mx-auto text-silver-tertiary mb-4" />
                    <h2 className="text-2xl font-bold text-silver-light mb-2">No orders yet</h2>
                    <p className="text-silver-tertiary mb-6">Start shopping to see your orders here</p>
                    <Link to="/products" className="btn-primary">
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-silver-light mb-8">My Orders</h1>

                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="admin-card">
                            {/* Order Header */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-silver-tertiary/20">
                                <div>
                                    <h3 className="text-xl font-semibold text-silver-light">Order #{order.id}</h3>
                                    <p className="text-sm text-silver-tertiary mt-1">
                                        Placed on {new Date(order.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                                <div className="mt-4 md:mt-0 text-right">
                                    <p className="text-2xl font-bold text-silver-primary">${order.total.toFixed(2)}</p>
                                    <p className="text-sm text-silver-tertiary">{order.items.length} items</p>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-silver-light mb-3">Items</h4>
                                <div className="space-y-3">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex items-center gap-4">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="w-16 h-16 rounded-lg object-cover bg-black-tertiary"
                                            />
                                            <div className="flex-1">
                                                <p className="text-silver-light font-medium">{item.product.name}</p>
                                                <p className="text-sm text-silver-tertiary">
                                                    Size: {item.size} • Qty: {item.quantity}
                                                </p>
                                            </div>
                                            <p className="text-silver-primary font-semibold">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="mb-6 p-4 bg-black-tertiary rounded-lg">
                                <h4 className="text-sm font-semibold text-silver-light mb-2">Shipping Address</h4>
                                <p className="text-sm text-silver-tertiary">{order.customerName}</p>
                                <p className="text-sm text-silver-tertiary">{order.customerAddress}</p>
                                <p className="text-sm text-silver-tertiary">{order.customerPhone}</p>
                            </div>

                            {/* Order Timeline */}
                            <div>
                                <h4 className="text-sm font-semibold text-silver-light mb-4">Order Status</h4>
                                <OrderTimeline currentStatus={order.status} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderTracking;
