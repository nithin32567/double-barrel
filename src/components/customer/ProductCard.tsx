import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const inWishlist = isInWishlist(product.id);

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        // Find first available size
        const availableSize = Object.entries(product.sizes).find(([, stock]) => stock > 0)?.[0] as 'S' | 'M' | 'L' | 'XL';
        if (availableSize) {
            addToCart(product, availableSize, 1);
        }
    };

    const hasStock = Object.values(product.sizes).some((stock) => stock > 0);

    return (
        <Link to={`/products/${product.id}`} className="group block h-full">
            <div className="premium-card group rounded-xl overflow-hidden h-full flex flex-col relative">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-black-tertiary">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Wishlist Button */}
                    <button
                        onClick={handleWishlistToggle}
                        className={`absolute top-4 right-4 p-2.5 rounded-full transition-all duration-300 z-10 ${inWishlist
                            ? 'bg-silver-primary text-black-primary shadow-[0_0_15px_rgba(192,192,192,0.5)]'
                            : 'bg-black-primary/60 backdrop-blur-md text-silver-primary hover:bg-silver-primary hover:text-black-primary'
                            }`}
                    >
                        <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
                    </button>

                    {/* Stock Badge */}
                    {!hasStock && (
                        <div className="absolute top-4 left-4 bg-red-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                            Out of Stock
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow space-y-4">
                    <div className="flex-grow">
                        <p className="text-xs text-silver-tertiary uppercase tracking-widest mb-2 font-medium">
                            {product.category}
                        </p>
                        <h3 className="text-lg text-silver-light font-bold leading-tight group-hover:text-silver-primary transition-colors">
                            {product.name}
                        </h3>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-silver-tertiary/10">
                        <span className="text-xl font-bold text-silver-primary metallic-text">
                            ${product.price.toFixed(2)}
                        </span>

                        <button
                            onClick={handleAddToCart}
                            disabled={!hasStock}
                            className={`p-3 rounded-full transition-all duration-300 ${hasStock
                                ? 'bg-silver-primary text-black-primary opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 hover:scale-110 hover:shadow-[0_0_15px_rgba(192,192,192,0.4)]'
                                : 'bg-black-tertiary text-silver-tertiary/50 cursor-not-allowed'
                                }`}
                        >
                            <ShoppingCart size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
