import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend }) => {
    return (
        <div className="admin-card">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-silver-tertiary uppercase tracking-wider">{title}</p>
                    <p className="text-3xl font-bold text-silver-light mt-2">{value}</p>
                    {trend && (
                        <p className="text-xs text-silver-tertiary mt-2">{trend}</p>
                    )}
                </div>
                <div className="p-3 bg-silver-primary/10 rounded-lg">
                    <Icon size={24} className="text-silver-primary" />
                </div>
            </div>
        </div>
    );
};

export default StatCard;
