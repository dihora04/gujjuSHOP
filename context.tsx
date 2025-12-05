
import React, { createContext, useContext, useState, PropsWithChildren } from 'react';
import { User, Shop, Product, Order, CartItem, OrderStatus, UserRole } from './types';
import { MOCK_SHOPS, MOCK_PRODUCTS, MOCK_USERS } from './constants';

interface ShopContextType {
  currentUser: User | null;
  login: (phone: string, role?: UserRole) => void;
  logout: () => void;
  
  shops: Shop[];
  products: Product[];
  orders: Order[];
  cart: CartItem[];
  
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  placeOrder: (deliveryType: 'STANDARD' | 'SMART_MATCH', fee: number) => void;
  
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  
  getShopOrders: (shopId: string) => Order[];
  getAvailableDeliveries: () => Order[];
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: PropsWithChildren<{}>) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [shops, setShops] = useState<Shop[]>(MOCK_SHOPS);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const login = (phone: string, role?: UserRole) => {
    // Simple mock login
    const user = MOCK_USERS.find(u => u.phone === phone) || 
                 MOCK_USERS.find(u => u.role === role) || 
                 MOCK_USERS[0];
    setCurrentUser(user);
  };

  const logout = () => setCurrentUser(null);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const placeOrder = (deliveryType: 'STANDARD' | 'SMART_MATCH', fee: number) => {
    if (!currentUser) return;
    
    // Group items by shop to create sub-orders or just one simple order for demo
    // For MVP demo, assume single shop order or mix (simplified)
    const newOrder: Order = {
      id: `ORD-${Date.now().toString().slice(-4)}`,
      customerId: currentUser.id,
      shopId: cart[0].shopId, // Simplified: assumes all items from same shop for now
      items: [...cart],
      totalAmount: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + fee,
      status: OrderStatus.PLACED,
      deliveryType,
      deliveryFee: fee,
      timestamp: new Date().toISOString(),
      customerName: currentUser.name,
      customerAddress: "Kalanala Chowk, Bhavnagar", // Mock address
      shopName: shops.find(s => s.id === cart[0].shopId)?.name || "Shop",
      shopAddress: shops.find(s => s.id === cart[0].shopId)?.address || "Bhavnagar"
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart([]); // Clear cart
  };

  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const product: Product = {
      ...newProduct,
      id: `p${Date.now()}`
    };
    setProducts(prev => [product, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const getShopOrders = (shopId: string) => {
    return orders.filter(o => o.shopId === shopId);
  };

  const getAvailableDeliveries = () => {
    // Riders see orders that are PACKED and waiting for pickup
    return orders.filter(o => o.status === OrderStatus.PACKED);
  };

  return (
    <ShopContext.Provider value={{
      currentUser, login, logout,
      shops, products, orders, cart,
      addToCart, removeFromCart, placeOrder,
      addProduct, updateOrderStatus,
      getShopOrders, getAvailableDeliveries
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used within ShopProvider");
  return context;
};
