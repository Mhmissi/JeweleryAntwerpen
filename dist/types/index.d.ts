export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: 'EUR' | 'USD';
    category: ProductCategory;
    subcategory?: string;
    images: string[];
    specifications: ProductSpecifications;
    inStock: boolean;
    stockQuantity: number;
    sku: string;
    weight: number;
    dimensions: Dimensions;
    materials: string[];
    gemstones?: Gemstone[];
    certification?: string[];
    createdAt: Date;
    updatedAt: Date;
}
export type ProductCategory = 'rings' | 'necklaces' | 'earrings' | 'bracelets' | 'watches' | 'pendants' | 'sets' | 'other';
export interface ProductSpecifications {
    metal: string;
    purity?: string;
    color?: string;
    finish?: string;
    size?: string;
    length?: string;
    width?: string;
    height?: string;
}
export interface Dimensions {
    length: number;
    width: number;
    height: number;
    unit: 'mm' | 'cm' | 'inch';
}
export interface Gemstone {
    type: string;
    color: string;
    clarity?: string;
    cut?: string;
    carat?: number;
    origin?: string;
}
export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    dateOfBirth?: Date;
    addresses: Address[];
    preferences: UserPreferences;
    createdAt: Date;
    updatedAt: Date;
}
export interface Address {
    id: string;
    type: 'billing' | 'shipping';
    firstName: string;
    lastName: string;
    company?: string;
    street: string;
    streetNumber: string;
    apartment?: string;
    city: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
}
export interface UserPreferences {
    newsletter: boolean;
    marketing: boolean;
    currency: 'EUR' | 'USD';
    language: 'en' | 'nl' | 'fr';
    notifications: NotificationPreferences;
}
export interface NotificationPreferences {
    email: boolean;
    sms: boolean;
    push: boolean;
    orderUpdates: boolean;
    promotions: boolean;
    newProducts: boolean;
}
export interface Order {
    id: string;
    userId: string;
    orderNumber: string;
    status: OrderStatus;
    items: OrderItem[];
    subtotal: number;
    tax: number;
    shipping: number;
    discount?: number;
    total: number;
    currency: 'EUR' | 'USD';
    billingAddress: Address;
    shippingAddress: Address;
    paymentMethod: PaymentMethod;
    shippingMethod: ShippingMethod;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
    estimatedDelivery?: Date;
}
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    specifications?: ProductSpecifications;
}
export interface PaymentMethod {
    type: 'credit_card' | 'debit_card' | 'bank_transfer' | 'paypal';
    last4?: string;
    brand?: string;
    expiryMonth?: number;
    expiryYear?: number;
}
export interface ShippingMethod {
    name: string;
    description: string;
    price: number;
    estimatedDays: number;
    tracking?: boolean;
}
export interface CartItem {
    productId: string;
    quantity: number;
    product: Product;
}
export interface Cart {
    id: string;
    userId?: string;
    items: CartItem[];
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
    currency: 'EUR' | 'USD';
    updatedAt: Date;
    isLoading?: boolean;
    error?: string | null;
}
export interface Review {
    id: string;
    productId: string;
    userId: string;
    rating: number;
    title: string;
    comment: string;
    verified: boolean;
    helpful: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface WishlistItem {
    id: string;
    userId: string;
    productId: string;
    product: Product;
    addedAt: Date;
}
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}
export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
export interface ProductFilters {
    category?: ProductCategory;
    subcategory?: string;
    priceRange?: {
        min: number;
        max: number;
    };
    materials?: string[];
    gemstones?: string[];
    inStock?: boolean;
    sortBy?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'newest';
}
export interface SearchQuery {
    q: string;
    filters?: ProductFilters;
    page?: number;
    limit?: number;
}
//# sourceMappingURL=index.d.ts.map