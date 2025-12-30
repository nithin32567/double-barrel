import React from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

interface WishlistItemProps {
    product: Product;
}

const WishlistItem: React.FC<WishlistItemProps> = ({ product }) => {
    const { removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        // Find first available size
        const availableSize = Object.entries(product.sizes).find(([, stock]) => stock > 0)?.[0] as 'S' | 'M' | 'L' | 'XL';
        if (availableSize) {
            addToCart(product, availableSize, 1);
            removeFromWishlist(product.id);
        }
    };

    const handleRemove = () => {
        removeFromWishlist(product.id);
    };

    const hasStock = Object.values(product.sizes).some((stock) => stock > 0);

    return (
        <div className="bg-black-secondary border border-silver-tertiary/10 rounded-lg overflow-hidden group">
            {/* Image */}
            <div className="relative aspect-square overflow-hidden bg-black-tertiary">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Remove Button */}
                <button
                    onClick={handleRemove}
                    className="absolute top-3 right-3 p-2 bg-black-primary/70 text-silver-primary rounded-full hover:bg-red-600 hover:text-white transition-all"
                    aria-label="Remove from wishlist"
                >
                    <X size={18} />
                </button>

                {/* Stock Badge */}
                {!hasStock && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Out of Stock
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                <div>
                    <p className="text-xs text-silver-tertiary uppercase tracking-wider">
                        {product.category}
                    </p>
                    <h3 className="text-silver-light font-semibold mt-1 line-clamp-1">
                        {product.name}
                    </h3>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-silver-primary">
                        ${product.price.toFixed(2)}
                    </span>
                </div>

                <button
                    onClick={handleAddToCart}
                    disabled={!hasStock}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all ${hasStock
                            ? 'bg-silver-primary text-black-primary hover:bg-silver-secondary'
                            : 'bg-black-tertiary text-silver-tertiary/50 cursor-not-allowed'
                        }`}
                >
                    <ShoppingCart size={18} />
                    <span>{hasStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
            </div>
        </div>
    );
};

export default WishlistItem;
