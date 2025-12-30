import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProductCard from '../../components/customer/ProductCard';
import { products } from '../../data/products';
import { categories } from '../../data/categories';

const Home: React.FC = () => {
    const featuredProducts = products.slice(0, 8);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-32 flex flex-col items-center justify-center min-h-[70vh]">
                <div className="text-center z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-silver-primary/10 rounded-full mb-6 animate-fade-in">
                        <Sparkles size={16} className="text-silver-primary" />
                        <span className="text-sm text-silver-primary font-medium">Premium Collection 2024</span>
                    </div>

                    <h1 className="metallic-text font-bold mb-6 animate-fade-in">
                        Double Barrel
                    </h1>

                    <p className="text-xl text-silver-tertiary max-w-2xl mx-auto mb-8 animate-fade-in">
                        Discover premium fashion that defines your style. Quality craftsmanship meets modern design.
                    </p>

                    <Link to="/products" className="btn-primary inline-flex items-center gap-2 animate-fade-in">
                        <span>Shop Now</span>
                        <ArrowRight size={18} />
                    </Link>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-silver-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
            </section>

            {/* Featured Products */}
            <section className="py-24">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-silver-light">Featured Products</h2>
                        <p className="text-silver-tertiary mt-2">Handpicked items just for you</p>
                    </div>
                    <Link
                        to="/products"
                        className="text-silver-primary hover:text-white transition-colors flex items-center gap-2 group"
                    >
                        <span className="font-medium">View All</span>
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* Categories */}
            <section className="py-24">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-silver-light">Shop by Category</h2>
                    <p className="text-silver-tertiary mt-2">Explore our curated collections</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            to={`/products?category=${category.slug}`}
                            className="group relative aspect-square rounded-2xl overflow-hidden bg-black-secondary border border-silver-tertiary/10 hover:border-silver-primary/30 transition-all duration-500"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black-primary/90 via-black-primary/20 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-80"></div>
                            <div className="absolute inset-0 flex items-center justify-center z-20 transition-transform duration-500 group-hover:scale-105">
                                <h3 className="text-2xl font-bold text-silver-light tracking-wide">{category.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="glass-card p-12 rounded-2xl">
                        <h2 className="text-3xl font-bold text-silver-light mb-4">
                            Join the Double Barrel Experience
                        </h2>
                        <p className="text-silver-tertiary mb-8">
                            Get exclusive access to new arrivals, special offers, and style inspiration.
                        </p>
                        <Link to="/products" className="btn-primary">
                            Start Shopping
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
