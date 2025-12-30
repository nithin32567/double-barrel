import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { orders } from '../../data/orders';
import { OrderStatus } from '../../types';
import OrderTimeline from '../../components/customer/OrderTimeline';

const OrderManagement: React.FC = () => {
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

    const order = orders.find((o) => o.id === selectedOrder);

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-silver-light mb-2">Order Management</h1>
                <p className="text-silver-tertiary">Track and manage customer orders</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Orders List */}
                <div className="lg:col-span-2 admin-card">
                    <h2 className="text-xl font-semibold text-silver-light mb-6">All Orders</h2>
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className={`p-4 rounded-lg border transition-all cursor-pointer ${selectedOrder === order.id
                                        ? 'border-silver-primary bg-silver-primary/5'
                                        : 'border-silver-tertiary/10 hover:border-silver-tertiary/30'
                                    }`}
                                onClick={() => setSelectedOrder(order.id)}
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-silver-light">{order.id}</h3>
                                        <p className="text-sm text-silver-tertiary mt-1">{order.customerName}</p>
                                        <p className="text-xs text-silver-tertiary mt-1">
                                            {new Date(order.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-silver-primary">${order.total.toFixed(2)}</p>
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold mt-2 ${order.status === OrderStatus.DELIVERED
                                                ? 'bg-green-900/30 text-green-400'
                                                : order.status === OrderStatus.SHIPPED
                                                    ? 'bg-blue-900/30 text-blue-400'
                                                    : order.status === OrderStatus.PACKED
                                                        ? 'bg-yellow-900/30 text-yellow-400'
                                                        : 'bg-silver-primary/20 text-silver-light'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Details */}
                <div className="lg:col-span-1">
                    {order ? (
                        <div className="admin-card sticky top-24">
                            <h2 className="text-xl font-semibold text-silver-light mb-6">Order Details</h2>

                            {/* Customer Info */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-silver-light mb-3">Customer Information</h3>
                                <div className="text-sm space-y-1">
                                    <p className="text-silver-tertiary">{order.customerName}</p>
                                    <p className="text-silver-tertiary">{order.customerEmail}</p>
                                    <p className="text-silver-tertiary">{order.customerPhone}</p>
                                    <p className="text-silver-tertiary mt-2">{order.customerAddress}</p>
                                </div>
                            </div>

                            {/* Items */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-silver-light mb-3">Items</h3>
                                <div className="space-y-3">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex gap-3">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="w-12 h-12 rounded-lg object-cover"
                                            />
                                            <div className="flex-1">
                                                <p className="text-sm text-silver-light">{item.product.name}</p>
                                                <p className="text-xs text-silver-tertiary">
                                                    Size: {item.size} • Qty: {item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Status Update */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-silver-light mb-2">
                                    Update Status
                                </label>
                                <select
                                    value={order.status}
                                    className="w-full"
                                >
                                    <option value={OrderStatus.PLACED}>Placed</option>
                                    <option value={OrderStatus.PACKED}>Packed</option>
                                    <option value={OrderStatus.SHIPPED}>Shipped</option>
                                    <option value={OrderStatus.DELIVERED}>Delivered</option>
                                </select>
                            </div>

                            {/* Timeline */}
                            <div>
                                <h3 className="text-sm font-semibold text-silver-light mb-4">Status Timeline</h3>
                                <OrderTimeline currentStatus={order.status} />
                            </div>
                        </div>
                    ) : (
                        <div className="admin-card text-center py-12">
                            <Eye size={48} className="mx-auto text-silver-tertiary mb-4" />
                            <p className="text-silver-tertiary">Select an order to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderManagement;
