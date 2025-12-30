import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { categories } from '../../data/categories';

const CategoryManagement: React.FC = () => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-silver-light mb-2">Category Management</h1>
                    <p className="text-silver-tertiary">Organize your product categories</p>
                </div>
                <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
                    <Plus size={20} />
                    <span>Add Category</span>
                </button>
            </div>

            {showForm && (
                <div className="admin-card mb-8">
                    <h2 className="text-xl font-semibold text-silver-light mb-6">Add New Category</h2>
                    <form className="space-y-4">
                        <input type="text" placeholder="Category Name" required />
                        <input type="text" placeholder="Slug (e.g., t-shirts)" required />
                        <div className="flex gap-4">
                            <button type="submit" className="btn-primary">Add Category</button>
                            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <div key={category.id} className="admin-card">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-silver-light">{category.name}</h3>
                                <p className="text-sm text-silver-tertiary mt-1">/{category.slug}</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-silver-primary hover:bg-silver-primary/10 rounded-lg transition-colors">
                                    <Edit size={18} />
                                </button>
                                <button className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryManagement;
