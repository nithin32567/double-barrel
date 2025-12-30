import React from 'react';
import { Check } from 'lucide-react';
import { OrderStatus } from '../../types';

interface OrderTimelineProps {
    currentStatus: OrderStatus;
}

const OrderTimeline: React.FC<OrderTimelineProps> = ({ currentStatus }) => {
    const statuses = [
        { status: OrderStatus.PLACED, label: 'Order Placed' },
        { status: OrderStatus.PACKED, label: 'Packed' },
        { status: OrderStatus.SHIPPED, label: 'Shipped' },
        { status: OrderStatus.DELIVERED, label: 'Delivered' },
    ];

    const currentIndex = statuses.findIndex((s) => s.status === currentStatus);

    return (
        <div className="relative">
            <div className="flex items-center justify-between">
                {statuses.map((item, index) => {
                    const isCompleted = index <= currentIndex;
                    const isActive = index === currentIndex;

                    return (
                        <div key={item.status} className="flex-1">
                            <div className="relative flex flex-col items-center">
                                {/* Circle */}
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isCompleted
                                            ? 'bg-silver-primary text-black-primary'
                                            : 'bg-black-tertiary text-silver-tertiary border-2 border-silver-tertiary/20'
                                        }`}
                                >
                                    {isCompleted && <Check size={24} strokeWidth={3} />}
                                </div>

                                {/* Label */}
                                <p
                                    className={`mt-3 text-sm font-medium text-center ${isActive ? 'text-silver-light' : isCompleted ? 'text-silver-primary' : 'text-silver-tertiary'
                                        }`}
                                >
                                    {item.label}
                                </p>

                                {/* Connecting Line */}
                                {index < statuses.length - 1 && (
                                    <div
                                        className={`absolute top-6 left-1/2 w-full h-0.5 transition-all ${index < currentIndex ? 'bg-silver-primary' : 'bg-silver-tertiary/20'
                                            }`}
                                        style={{ transform: 'translateY(-50%)' }}
                                    />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OrderTimeline;
