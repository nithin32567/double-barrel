// Product Types
export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    description: string;
    sizes: {
        S: number;
        M: number;
        L: number;
        XL: number;
    };
}

// Category Types
export interface Category {
    id: string;
    name: string;
    slug: string;
}

// Cart Types
export interface CartItem {
    product: Product;
    size: 'S' | 'M' | 'L' | 'XL';
    quantity: number;
}

// Order Types
export enum OrderStatus {
    PLACED = 'Placed',
    PACKED = 'Packed',
    SHIPPED = 'Shipped',
    DELIVERED = 'Delivered',
}

export interface OrderItem {
    product: Product;
    size: 'S' | 'M' | 'L' | 'XL';
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
    items: OrderItem[];
    total: number;
    status: OrderStatus;
    date: string;
}

// Admin Types
export interface AdminAuth {
    isAuthenticated: boolean;
    email: string | null;
}

// Dashboard Stats
export interface DashboardStats {
    totalOrders: number;
    totalRevenue: number;
    totalProducts: number;
}

export interface RevenueData {
    month: string;
    revenue: number;
}
