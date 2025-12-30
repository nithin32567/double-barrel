import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, size: 'S' | 'M' | 'L' | 'XL', quantity: number) => void;
    removeFromCart: (productId: string, size: 'S' | 'M' | 'L' | 'XL') => void;
    updateQuantity: (productId: string, size: 'S' | 'M' | 'L' | 'XL', quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('doublebarrel-cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('doublebarrel-cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product, size: 'S' | 'M' | 'L' | 'XL', quantity: number) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex(
                (item) => item.product.id === product.id && item.size === size
            );

            if (existingItemIndex > -1) {
                const newCart = [...prevCart];
                newCart[existingItemIndex].quantity += quantity;
                return newCart;
            }

            return [...prevCart, { product, size, quantity }];
        });
    };

    const removeFromCart = (productId: string, size: 'S' | 'M' | 'L' | 'XL') => {
        setCart((prevCart) =>
            prevCart.filter((item) => !(item.product.id === productId && item.size === size))
        );
    };

    const updateQuantity = (productId: string, size: 'S' | 'M' | 'L' | 'XL', quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId, size);
            return;
        }

        setCart((prevCart) =>
            prevCart.map((item) =>
                item.product.id === productId && item.size === size
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    const getCartItemCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getCartTotal,
                getCartItemCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
