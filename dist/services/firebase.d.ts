import { Timestamp } from 'firebase/firestore';
export interface FirebaseUser {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'customer';
    createdAt: Timestamp;
    lastLogin: Timestamp;
}
export interface FirebaseProduct {
    id?: string;
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    images: string[];
    status: 'active' | 'inactive' | 'low-stock';
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
export interface FirebaseOrder {
    id?: string;
    userId: string;
    customerName: string;
    customerEmail: string;
    items: Array<{
        productId: string;
        name: string;
        price: number;
        quantity: number;
    }>;
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
export declare const productService: {
    getAllProducts(): Promise<FirebaseProduct[]>;
    getProductById(id: string): Promise<FirebaseProduct | null>;
    addProduct(productData: Omit<FirebaseProduct, 'id' | 'createdAt' | 'updatedAt'>): Promise<string>;
    updateProduct(id: string, updates: Partial<FirebaseProduct>): Promise<void>;
    deleteProduct(id: string): Promise<void>;
    getProductsByCategory(category: string): Promise<FirebaseProduct[]>;
};
export declare const orderService: {
    getAllOrders(): Promise<FirebaseOrder[]>;
    getOrdersByUserId(userId: string): Promise<FirebaseOrder[]>;
    getOrderById(id: string): Promise<FirebaseOrder | null>;
    createOrder(orderData: Omit<FirebaseOrder, 'id' | 'createdAt' | 'updatedAt'>): Promise<string>;
    updateOrderStatus(id: string, status: FirebaseOrder['status']): Promise<void>;
};
export declare const userService: {
    getAllUsers(): Promise<FirebaseUser[]>;
    getUserById(uid: string): Promise<FirebaseUser | null>;
    updateUserRole(uid: string, role: 'admin' | 'customer'): Promise<void>;
};
export declare const storageService: {
    uploadImage(file: File, path: string): Promise<string>;
    deleteImage(path: string): Promise<void>;
};
export declare const dashboardService: {
    getDashboardStats(): Promise<{
        totalProducts: number;
        totalOrders: number;
        totalCustomers: number;
        totalRevenue: number;
        lowStockCount: number;
    }>;
    getRecentOrders(limitCount?: number): Promise<FirebaseOrder[]>;
};
//# sourceMappingURL=firebase.d.ts.map