import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import WishlistItem from '../../components/customer/WishlistItem';
import { useWishlist } from '../../context/WishlistContext';

const Wishlist: React.FC = () => {
    const { wishlist } = useWishlist();

    if (wishlist.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center">
                    <Heart size={64} className="mx-auto text-silver-tertiary mb-4" />
                    <h2 className="text-2xl font-bold text-silver-light mb-2">Your wishlist is empty</h2>
                    <p className="text-silver-tertiary mb-6">Save your favorite items here</p>
                    <Link to="/products" className="btn-primary">
                        Explore Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-silver-light mb-2">My Wishlist</h1>
                    <p className="text-silver-tertiary">
                        {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlist.map((product) => (
                        <WishlistItem key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
