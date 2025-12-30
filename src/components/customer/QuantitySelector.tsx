import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
    quantity: number;
    onQuantityChange: (quantity: number) => void;
    min?: number;
    max?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
    quantity,
    onQuantityChange,
    min = 1,
    max = 99,
}) => {
    const handleDecrease = () => {
        if (quantity > min) {
            onQuantityChange(quantity - 1);
        }
    };

    const handleIncrease = () => {
        if (quantity < max) {
            onQuantityChange(quantity + 1);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= min && value <= max) {
            onQuantityChange(value);
        }
    };

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-silver-light">Quantity</label>
            <div className="flex items-center gap-3">
                <button
                    onClick={handleDecrease}
                    disabled={quantity <= min}
                    className="p-2 bg-black-tertiary text-silver-primary rounded-lg hover:bg-silver-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <Minus size={18} />
                </button>

                <input
                    type="number"
                    value={quantity}
                    onChange={handleInputChange}
                    min={min}
                    max={max}
                    className="w-20 text-center bg-black-tertiary text-silver-light font-semibold"
                />

                <button
                    onClick={handleIncrease}
                    disabled={quantity >= max}
                    className="p-2 bg-black-tertiary text-silver-primary rounded-lg hover:bg-silver-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <Plus size={18} />
                </button>
            </div>
        </div>
    );
};

export default QuantitySelector;
