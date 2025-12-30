import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RevenueData } from '../../types';

const RevenueChart: React.FC = () => {
    const data: RevenueData[] = [
        { month: 'Jan', revenue: 4200 },
        { month: 'Feb', revenue: 5100 },
        { month: 'Mar', revenue: 4800 },
        { month: 'Apr', revenue: 6200 },
        { month: 'May', revenue: 7400 },
        { month: 'Jun', revenue: 8100 },
        { month: 'Jul', revenue: 9200 },
        { month: 'Aug', revenue: 8600 },
        { month: 'Sep', revenue: 9800 },
        { month: 'Oct', revenue: 10500 },
        { month: 'Nov', revenue: 11200 },
        { month: 'Dec', revenue: 12800 },
    ];

    return (
        <div className="admin-card">
            <h3 className="text-lg font-semibold text-silver-light mb-6">Monthly Revenue</h3>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#c0c0c0" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#c0c0c0" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                    <XAxis dataKey="month" stroke="#a8a8a8" />
                    <YAxis stroke="#a8a8a8" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1a1a1a',
                            border: '1px solid #2a2a2a',
                            borderRadius: '8px',
                            color: '#c0c0c0',
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#c0c0c0"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RevenueChart;
