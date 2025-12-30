import React from 'react';
import { Minus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
    item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();

    const handleQuantityChange = (newQuantity: number) => {
        updateQuantity(item.product.id, item.size, newQuantity);
    };

    const handleRemove = () => {
        removeFromCart(item.product.id, item.size);
    };

    const subtotal = item.product.price * item.quantity;

    return (
        <div className="flex gap-4 p-4 bg-black-secondary border border-silver-tertiary/10 rounded-lg">
            {/* Image */}
            <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-black-tertiary">
                <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-silver-light font-semibold">{item.product.name}</h3>
                        <p className="text-sm text-silver-tertiary mt-1">
                            Size: <span className="font-medium">{item.size}</span>
                        </p>
                        <p className="text-sm text-silver-tertiary">
                            ${item.product.price.toFixed(2)} each
                        </p>
                    </div>

                    <button
                        onClick={handleRemove}
                        className="text-silver-tertiary hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>

                <div className="flex items-center justify-between mt-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleQuantityChange(item.quantity - 1)}
                            className="p-1.5 bg-black-tertiary text-silver-primary rounded hover:bg-silver-primary/20 transition-all"
                            aria-label="Decrease quantity"
                        >
                            <Minus size={14} />
                        </button>

                        <span className="text-silver-light font-semibold w-8 text-center">
                            {item.quantity}
                        </span>

                        <button
                            onClick={() => handleQuantityChange(item.quantity + 1)}
                            className="p-1.5 bg-black-tertiary text-silver-primary rounded hover:bg-silver-primary/20 transition-all"
                            aria-label="Increase quantity"
                        >
                            <Minus size={14} className="rotate-180" />
                        </button>
                    </div>

                    {/* Subtotal */}
                    <p className="text-lg font-bold text-silver-primary">
                        ${subtotal.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
