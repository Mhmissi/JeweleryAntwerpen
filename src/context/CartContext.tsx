import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Cart, CartItem, Product } from '../types';

// Cart State Interface
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

// Cart Action Types
type CartAction =
  | { type: 'CART_LOADING' }
  | { type: 'CART_LOADED'; payload: Cart }
  | { type: 'CART_ERROR'; payload: string }
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'UPDATE_CURRENCY'; payload: 'EUR' | 'USD' }
  | { type: 'CLEAR_ERROR' };

// Initial State
const initialState: CartState = {
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0,
  currency: 'EUR',
  isLoading: true,
  error: null
};

// Tax rates (in a real app, this would come from backend)
const TAX_RATES = {
  BE: 0.21, // Belgium VAT
  EU: 0.20, // EU average
  US: 0.08  // US average
};

// Shipping rates (in a real app, this would come from backend)
const SHIPPING_RATES = {
  standard: { price: 15, name: 'Standard Shipping' },
  express: { price: 25, name: 'Express Shipping' },
  premium: { price: 50, name: 'Premium Shipping' }
};

// Cart Reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'CART_LOADING':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case 'CART_LOADED':
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        error: null
      };
    case 'CART_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.productId === product.id);
      
      let newItems: CartItem[];
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        newItems = [...state.items, { productId: product.id, quantity, product }];
      }

      return calculateCartTotals({ ...state, items: newItems });
    }
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.productId !== action.payload);
      return calculateCartTotals({ ...state, items: newItems });
    }
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        const newItems = state.items.filter(item => item.productId !== productId);
        return calculateCartTotals({ ...state, items: newItems });
      }
      
      const newItems = state.items.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      );
      return calculateCartTotals({ ...state, items: newItems });
    }
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        subtotal: 0,
        tax: 0,
        shipping: 0,
        total: 0
      };
    case 'UPDATE_CURRENCY':
      return {
        ...state,
        currency: action.payload
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Helper function to calculate cart totals
const calculateCartTotals = (state: CartState): CartState => {
  const subtotal = state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  // Calculate tax (simplified - in real app would use user's location)
  const taxRate = TAX_RATES.BE;
  const tax = subtotal * taxRate;
  
  // Calculate shipping (free over certain amount)
  const shipping = subtotal > 500 ? 0 : SHIPPING_RATES.standard.price;
  
  const total = subtotal + tax + shipping;
  
  return {
    ...state,
    subtotal,
    tax,
    shipping,
    total
  };
};

// Cart Context Interface
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

// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Provider Props
interface CartProviderProps {
  children: ReactNode;
}

// Cart Provider Component
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      dispatch({ type: 'CART_LOADING' });
      
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          // Validate cart data structure
          if (isValidCart(parsedCart)) {
            dispatch({ type: 'CART_LOADED', payload: parsedCart });
          } else {
            // Invalid cart data, clear it
            localStorage.removeItem('cart');
            const emptyCart: Cart = {
              id: 'empty',
              items: [],
              subtotal: 0,
              tax: 0,
              shipping: 0,
              total: 0,
              currency: 'EUR',
              updatedAt: new Date(),
              isLoading: false,
              error: null
            };
            dispatch({ type: 'CART_LOADED', payload: emptyCart });
          }
        } else {
          const emptyCart: Cart = {
            id: 'empty',
            items: [],
            subtotal: 0,
            tax: 0,
            shipping: 0,
            total: 0,
            currency: 'EUR',
            updatedAt: new Date(),
            isLoading: false,
            error: null
          };
          dispatch({ type: 'CART_LOADED', payload: emptyCart });
        }
      } catch (error) {
        console.error('Failed to load cart:', error);
        localStorage.removeItem('cart');
        dispatch({ type: 'CART_ERROR', payload: 'Failed to load cart' });
      }
    };

    loadCart();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!state.isLoading) {
      try {
        const cartToSave = {
          items: state.items,
          subtotal: state.subtotal,
          tax: state.tax,
          shipping: state.shipping,
          total: state.total,
          currency: state.currency,
          updatedAt: new Date()
        };
        localStorage.setItem('cart', JSON.stringify(cartToSave));
      } catch (error) {
        console.error('Failed to save cart:', error);
      }
    }
  }, [state.items, state.subtotal, state.tax, state.shipping, state.total, state.currency, state.isLoading]);

  // Validate cart data structure
  const isValidCart = (cart: any): cart is Cart => {
    return (
      cart &&
      Array.isArray(cart.items) &&
      typeof cart.subtotal === 'number' &&
      typeof cart.tax === 'number' &&
      typeof cart.shipping === 'number' &&
      typeof cart.total === 'number' &&
      (cart.currency === 'EUR' || cart.currency === 'USD')
    );
  };

  // Add item to cart
  const addItem = (product: Product, quantity: number): void => {
    if (quantity <= 0) return;
    
    // Security: Validate product data
    if (!product || !product.id || !product.name || typeof product.price !== 'number') {
      dispatch({ type: 'CART_ERROR', payload: 'Invalid product data' });
      return;
    }

    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  // Remove item from cart
  const removeItem = (productId: string): void => {
    if (!productId) return;
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  // Update item quantity
  const updateQuantity = (productId: string, quantity: number): void => {
    if (!productId || quantity < 0) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  // Clear cart
  const clearCart = (): void => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Update currency
  const updateCurrency = (currency: 'EUR' | 'USD'): void => {
    dispatch({ type: 'UPDATE_CURRENCY', payload: currency });
  };

  // Clear error
  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Get item quantity
  const getItemQuantity = (productId: string): number => {
    const item = state.items.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  };

  // Get item total
  const getItemTotal = (productId: string): number => {
    const item = state.items.find(item => item.productId === productId);
    return item ? item.product.price * item.quantity : 0;
  };

  const value: CartContextType = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    updateCurrency,
    clearError,
    getItemQuantity,
    getItemTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
