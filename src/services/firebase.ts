import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';

import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../config/firebase';

// Types
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



// Product Services
export const productService = {
  // Get all products
  async getAllProducts(): Promise<FirebaseProduct[]> {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FirebaseProduct[];
    } catch (error) {
      throw error;
    }
  },

  // Get product by ID
  async getProductById(id: string): Promise<FirebaseProduct | null> {
    try {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as FirebaseProduct;
      }
      return null;
    } catch (error) {
      throw error;
    }
  },

  // Add new product
  async addProduct(productData: Omit<FirebaseProduct, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'products'), {
        ...productData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      throw error;
    }
  },

  // Update product
  async updateProduct(id: string, updates: Partial<FirebaseProduct>): Promise<void> {
    try {
      const docRef = doc(db, 'products', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      throw error;
    }
  },

  // Delete product
  async deleteProduct(id: string): Promise<void> {
    try {
      const docRef = doc(db, 'products', id);
      await deleteDoc(docRef);
    } catch (error) {
      throw error;
    }
  },

  // Get products by category
  async getProductsByCategory(category: string): Promise<FirebaseProduct[]> {
    try {
      const q = query(
        collection(db, 'products'),
        where('category', '==', category),
        where('status', '==', 'active')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FirebaseProduct[];
    } catch (error) {
      throw error;
    }
  }
};

// Order Services
export const orderService = {
  // Get all orders
  async getAllOrders(): Promise<FirebaseOrder[]> {
    try {
      const querySnapshot = await getDocs(collection(db, 'orders'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FirebaseOrder[];
    } catch (error) {
      throw error;
    }
  },

  // Get orders by user ID
  async getOrdersByUserId(userId: string): Promise<FirebaseOrder[]> {
    try {
      const q = query(
        collection(db, 'orders'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FirebaseOrder[];
    } catch (error) {
      throw error;
    }
  },

  // Get order by ID
  async getOrderById(id: string): Promise<FirebaseOrder | null> {
    try {
      const docRef = doc(db, 'orders', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as FirebaseOrder;
      }
      return null;
    } catch (error) {
      throw error;
    }
  },

  // Create new order
  async createOrder(orderData: Omit<FirebaseOrder, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'orders'), {
        ...orderData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      throw error;
    }
  },

  // Update order status
  async updateOrderStatus(id: string, status: FirebaseOrder['status']): Promise<void> {
    try {
      const docRef = doc(db, 'orders', id);
      await updateDoc(docRef, {
        status,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      throw error;
    }
  }
};

// User Services
export const userService = {
  // Get all users
  async getAllUsers(): Promise<FirebaseUser[]> {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      return querySnapshot.docs.map(doc => ({
        uid: doc.data().uid,
        ...doc.data()
      })) as FirebaseUser[];
    } catch (error) {
      throw error;
    }
  },

  // Get user by ID
  async getUserById(uid: string): Promise<FirebaseUser | null> {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) return null;
      return userSnap.data() as FirebaseUser;
    } catch (error) {
      throw error;
    }
  },

  // Update user role
  async updateUserRole(uid: string, role: 'admin' | 'customer'): Promise<void> {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, { role });
    } catch (error) {
      throw error;
    }
  },


};

// Storage Services
export const storageService = {
  // Upload image
  async uploadImage(file: File, path: string): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      throw error;
    }
  },

  // Delete image
  async deleteImage(path: string): Promise<void> {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
    } catch (error) {
      throw error;
    }
  }
};

// Analytics and Dashboard Services
export const dashboardService = {
  // Get dashboard statistics
  async getDashboardStats() {
    try {
      const [products, orders, users] = await Promise.all([
        getDocs(collection(db, 'products')),
        getDocs(collection(db, 'orders')),
        getDocs(collection(db, 'users'))
      ]);

      const totalRevenue = orders.docs.reduce((sum, doc) => {
        const order = doc.data() as FirebaseOrder;
        return sum + (order.total || 0);
      }, 0);

      const lowStockProducts = products.docs.filter(doc => {
        const product = doc.data() as FirebaseProduct;
        return product.stock < 10;
      });

      return {
        totalProducts: products.size,
        totalOrders: orders.size,
        totalCustomers: users.size,
        totalRevenue,
        lowStockCount: lowStockProducts.length
      };
    } catch (error) {
      throw error;
    }
  },

  // Get recent orders
  async getRecentOrders(limitCount: number = 5): Promise<FirebaseOrder[]> {
    try {
      const q = query(
        collection(db, 'orders'),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FirebaseOrder[];
    } catch (error) {
      throw error;
    }
  }
};
