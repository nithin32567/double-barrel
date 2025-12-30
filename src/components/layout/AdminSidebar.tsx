import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, FolderTree, ShoppingBag, LogOut } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import Logo from './Logo';

const AdminSidebar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAdminAuth();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const navItems = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/products', label: 'Products', icon: Package },
        { path: '/admin/categories', label: 'Categories', icon: FolderTree },
        { path: '/admin/orders', label: 'Orders', icon: ShoppingBag },
    ];

    return (
        <aside className="w-64 min-h-screen bg-black-secondary border-r border-silver-tertiary/10 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-silver-tertiary/10">
                <Logo />
                <p className="text-xs text-silver-tertiary mt-2">Admin Panel</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${isActive(item.path)
                                ? 'bg-black-tertiary text-silver-light border border-silver-tertiary/20'
                                : 'text-silver-tertiary hover:bg-black-tertiary/50 hover:text-silver-primary'
                            }`}
                    >
                        <item.icon size={20} />
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-silver-tertiary/10">
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-silver-tertiary hover:bg-black-tertiary hover:text-silver-primary transition-all"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
