import React, { ReactNode } from 'react';
import { CartItem, Product } from '../types';
interface CartState {
    items: CartItem[];
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
    currency: 'EUR' | 'USD';
    isLoading: boolean;
    error: string | null;
}
interface CartContextType extends CartState {
    addItem: (product: Product, quantity: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    updateCurrency: (currency: 'EUR' | 'USD') => void;
    clearError: () => void;
    getItemQuantity: (productId: string) => number;
    getItemTotal: (productId: string) => number;
}
interface CartProviderProps {
    children: ReactNode;
}
export declare const CartProvider: React.FC<CartProviderProps>;
export declare const useCart: () => CartContextType;
export {};
//# sourceMappingURL=CartContext.d.ts.map