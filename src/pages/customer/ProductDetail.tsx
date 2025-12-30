import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Zap } from 'lucide-react';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import SizeSelector from '../../components/customer/SizeSelector';
import QuantitySelector from '../../components/customer/QuantitySelector';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

    const product = products.find((p) => p.id === id);

    const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL'>('M');
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-2xl text-silver-tertiary">Product not found</p>
                    <button onClick={() => navigate('/products')} className="btn-primary mt-4">
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    const inWishlist = isInWishlist(product.id);
    const hasStock = product.sizes[selectedSize] > 0;
    const maxQuantity = product.sizes[selectedSize];

    const handleAddToCart = () => {
        if (hasStock) {
            addToCart(product, selectedSize, quantity);
            // You could show a toast notification here
        }
    };

    const handleBuyNow = () => {
        if (hasStock) {
            addToCart(product, selectedSize, quantity);
            navigate('/cart');
        }
    };

    const handleWishlistToggle = () => {
        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Product Image */}
                    <div className="aspect-square rounded-3xl overflow-hidden bg-black-secondary border border-white/5 shadow-2xl sticky top-24">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-10 py-4">
                        {/* Category & Title */}
                        <div className="space-y-4">
                            <p className="text-sm text-silver-primary font-bold uppercase tracking-[0.2em]">
                                {product.category}
                            </p>
                            <h1 className="text-5xl md:text-6xl font-black text-silver-light tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-white to-silver-tertiary">
                                {product.name}
                            </h1>
                            <div className="h-1 w-20 bg-silver-primary/30 rounded-full"></div>
                        </div>

                        {/* Price */}
                        <div>
                            <p className="text-5xl font-bold text-silver-primary metallic-text">
                                ${product.price.toFixed(2)}
                            </p>
                            <p className="text-silver-tertiary text-sm mt-2">Tax included. Free shipping worldwide.</p>
                        </div>

                        {/* Description */}
                        <div className="prose prose-invert max-w-none">
                            <h3 className="text-lg font-bold text-silver-light mb-3 uppercase tracking-wide">Description</h3>
                            <p className="text-silver-tertiary leading-relaxed text-lg font-light">
                                {product.description}
                            </p>
                        </div>

                        <div className="space-y-8 p-8 border border-white/5 rounded-2xl bg-white/[0.02]">
                            {/* Size Selector */}
                            <SizeSelector
                                sizes={product.sizes}
                                selectedSize={selectedSize}
                                onSizeChange={setSelectedSize}
                            />

                            {/* Quantity Selector */}
                            <QuantitySelector
                                quantity={quantity}
                                onQuantityChange={setQuantity}
                                max={maxQuantity}
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={!hasStock}
                                    className="flex-1 btn-primary flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    <ShoppingCart size={20} className="transition-transform group-hover:scale-110" />
                                    <span>{hasStock ? 'Add to Cart' : 'Out of Stock'}</span>
                                </button>

                                <button
                                    onClick={handleWishlistToggle}
                                    className={`px-6 rounded-full transition-all border ${inWishlist
                                        ? 'bg-silver-primary text-black-primary border-silver-primary'
                                        : 'bg-transparent border-silver-tertiary/30 text-silver-primary hover:border-silver-primary hover:bg-silver-primary/5'
                                        }`}
                                >
                                    <Heart size={24} fill={inWishlist ? 'currentColor' : 'none'} />
                                </button>
                            </div>

                            {/* Buy Now Button */}
                            {hasStock && (
                                <button
                                    onClick={handleBuyNow}
                                    className="w-full btn-secondary flex items-center justify-center gap-3 group"
                                >
                                    <Zap size={20} className="transition-transform group-hover:scale-110 group-hover:text-yellow-300" />
                                    <span>Buy Now</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
