import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AdminAuth } from '../types';

interface AdminAuthContextType {
    auth: AdminAuth;
    login: (email: string, password: string) => boolean;
    logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'admin123';

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<AdminAuth>(() => {
        const savedAuth = localStorage.getItem('doublebarrel-admin-auth');
        return savedAuth ? JSON.parse(savedAuth) : { isAuthenticated: false, email: null };
    });

    useEffect(() => {
        localStorage.setItem('doublebarrel-admin-auth', JSON.stringify(auth));
    }, [auth]);

    const login = (email: string, password: string): boolean => {
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            setAuth({ isAuthenticated: true, email });
            return true;
        }
        return false;
    };

    const logout = () => {
        setAuth({ isAuthenticated: false, email: null });
    };

    return (
        <AdminAuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => {
    const context = useContext(AdminAuthContext);
    if (!context) {
        throw new Error('useAdminAuth must be used within an AdminAuthProvider');
    }
    return context;
};
