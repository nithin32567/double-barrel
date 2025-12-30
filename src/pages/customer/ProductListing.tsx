import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import ProductCard from '../../components/customer/ProductCard';
import { products } from '../../data/products';
import { categories } from '../../data/categories';

const ProductListing: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const categoryFilter = searchParams.get('category') || '';

    const handleCategoryChange = (categorySlug: string) => {
        if (categorySlug) {
            setSearchParams({ category: categorySlug });
        } else {
            setSearchParams({});
        }
    };

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = !categoryFilter ||
                product.category.toLowerCase() === categories.find(c => c.slug === categoryFilter)?.name.toLowerCase();

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, categoryFilter]);

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-silver-light mb-2">All Products</h1>
                    <p className="text-silver-tertiary">Discover our complete collection</p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-silver-tertiary" size={20} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-black-secondary border border-silver-tertiary/10 rounded-lg text-silver-light placeholder-silver-tertiary focus:border-silver-tertiary"
                        />
                    </div>

                    {/* Category Filter */}
                    <select
                        value={categoryFilter}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="px-6 py-3 bg-black-secondary border border-silver-tertiary/10 rounded-lg text-silver-light focus:border-silver-tertiary"
                    >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.slug}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-silver-tertiary">
                        Showing <span className="text-silver-light font-semibold">{filteredProducts.length}</span> products
                    </p>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-2xl text-silver-tertiary">No products found</p>
                        <p className="text-silver-tertiary/70 mt-2">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductListing;
