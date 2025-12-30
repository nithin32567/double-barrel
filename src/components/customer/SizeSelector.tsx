import React from 'react';

interface SizeSelectorProps {
    sizes: { S: number; M: number; L: number; XL: number };
    selectedSize: 'S' | 'M' | 'L' | 'XL';
    onSizeChange: (size: 'S' | 'M' | 'L' | 'XL') => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ sizes, selectedSize, onSizeChange }) => {
    const sizeOptions: Array<'S' | 'M' | 'L' | 'XL'> = ['S', 'M', 'L', 'XL'];

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-silver-light">Select Size</label>
            <div className="flex gap-3">
                {sizeOptions.map((size) => {
                    const stock = sizes[size];
                    const isAvailable = stock > 0;
                    const isSelected = selectedSize === size;

                    return (
                        <button
                            key={size}
                            onClick={() => isAvailable && onSizeChange(size)}
                            disabled={!isAvailable}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all ${isSelected
                                    ? 'bg-silver-primary text-black-primary'
                                    : isAvailable
                                        ? 'bg-black-tertiary text-silver-primary hover:bg-silver-primary/20 border border-silver-tertiary/20'
                                        : 'bg-black-tertiary text-silver-tertiary/30 cursor-not-allowed line-through'
                                }`}
                        >
                            {size}
                        </button>
                    );
                })}
            </div>
            {sizes[selectedSize] > 0 && (
                <p className="text-xs text-silver-tertiary">
                    {sizes[selectedSize]} items available
                </p>
            )}
        </div>
    );
};

export default SizeSelector;
