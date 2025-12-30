import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { products } from '../../data/products';
import { categories } from '../../data/categories';

const ProductManagement: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<string | null>(null);

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-silver-light mb-2">Product Management</h1>
                    <p className="text-silver-tertiary">Manage your product inventory</p>
                </div>
                <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
                    <Plus size={20} />
                    <span>Add Product</span>
                </button>
            </div>

            {showForm && (
                <div className="admin-card mb-8">
                    <h2 className="text-xl font-semibold text-silver-light mb-6">
                        {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" placeholder="Product Name" required />
                            <input type="number" placeholder="Price" step="0.01" required />
                            <select required>
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            <input type="url" placeholder="Image URL" required />
                        </div>
                        <textarea placeholder="Product Description" rows={3} required />

                        <div>
                            <label className="block text-sm font-medium text-silver-light mb-2">Stock by Size</label>
                            <div className="grid grid-cols-4 gap-4">
                                <input type="number" placeholder="S" min="0" required />
                                <input type="number" placeholder="M" min="0" required />
                                <input type="number" placeholder="L" min="0" required />
                                <input type="number" placeholder="XL" min="0" required />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button type="submit" className="btn-primary">
                                {editingProduct ? 'Update Product' : 'Add Product'}
                            </button>
                            <button
                                type="button"
                                onClick={() => { setShowForm(false); setEditingProduct(null); }}
                                className="btn-secondary"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Products Table */}
            <div className="admin-card">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-silver-tertiary/20">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-silver-light">Image</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-silver-light">Name</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-silver-light">Category</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-silver-light">Price</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-silver-light">Stock</th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-silver-light">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => {
                                const totalStock = Object.values(product.sizes).reduce((a, b) => a + b, 0);
                                return (
                                    <tr key={product.id} className="border-b border-silver-tertiary/10">
                                        <td className="py-3 px-4">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-12 h-12 rounded-lg object-cover"
                                            />
                                        </td>
                                        <td className="py-3 px-4 text-sm text-silver-light">{product.name}</td>
                                        <td className="py-3 px-4 text-sm text-silver-tertiary">{product.category}</td>
                                        <td className="py-3 px-4 text-sm text-silver-primary font-semibold">
                                            ${product.price.toFixed(2)}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-silver-tertiary">{totalStock} units</td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => { setEditingProduct(product.id); setShowForm(true); }}
                                                    className="p-2 text-silver-primary hover:bg-silver-primary/10 rounded-lg transition-colors"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductManagement;
