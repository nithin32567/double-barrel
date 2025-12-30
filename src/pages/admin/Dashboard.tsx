import React from 'react';
import { ShoppingBag, DollarSign, Package } from 'lucide-react';
import StatCard from '../../components/admin/StatCard';
import RevenueChart from '../../components/admin/RevenueChart';
import { orders } from '../../data/orders';
import { products } from '../../data/products';

const Dashboard: React.FC = () => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalProducts = products.length;

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-silver-light mb-2">Dashboard</h1>
                <p className="text-silver-tertiary">Welcome back! Here's your business overview</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                    title="Total Orders"
                    value={totalOrders}
                    icon={ShoppingBag}
                    trend="+12% from last month"
                />
                <StatCard
                    title="Total Revenue"
                    value={`$${totalRevenue.toFixed(2)}`}
                    icon={DollarSign}
                    trend="+8% from last month"
                />
                <StatCard
                    title="Total Products"
                    value={totalProducts}
                    icon={Package}
                    trend="Active inventory"
                />
            </div>

            {/* Revenue Chart */}
            <RevenueChart />

            {/* Recent Orders */}
            <div className="admin-card mt-8">
                <h2 className="text-xl font-semibold text-silver-light mb-6">Recent Orders</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-silver-tertiary/20">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-silver-light">Order ID</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-silver-light">Customer</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-silver-light">Date</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-silver-light">Status</th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-silver-light">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.slice(0, 5).map((order) => (
                                <tr key={order.id} className="border-b border-silver-tertiary/10">
                                    <td className="py-3 px-4 text-sm text-silver-primary font-medium">{order.id}</td>
                                    <td className="py-3 px-4 text-sm text-silver-tertiary">{order.customerName}</td>
                                    <td className="py-3 px-4 text-sm text-silver-tertiary">
                                        {new Date(order.date).toLocaleDateString()}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'Delivered'
                                                ? 'bg-green-900/30 text-green-400'
                                                : order.status === 'Shipped'
                                                    ? 'bg-blue-900/30 text-blue-400'
                                                    : order.status === 'Packed'
                                                        ? 'bg-yellow-900/30 text-yellow-400'
                                                        : 'bg-silver-primary/20 text-silver-light'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-silver-light font-semibold text-right">
                                        ${order.total.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
