
// --- USER & AUTH ---
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  MERCHANT = 'MERCHANT',
  DELIVERY_PARTNER = 'DELIVERY_PARTNER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  phone: string;
  password?: string; // For demo auth
  name: string;
  role: UserRole;
  city: string;
  language: 'gu' | 'en';
  shopId?: string; // Link merchant to a shop
}

// --- SHOP & PRODUCTS ---
export interface ShopOffer {
  id: string;
  title: string;
  code: string;
  description: string;
  discountAmount?: number; // Flat off
  discountPercent?: number; // % off
  color: string;
}

export interface Shop {
  id: string;
  name: string;
  ownerId: string;
  category: string;
  address: string;
  city: string; // e.g., "Bhavnagar"
  geoLat: number;
  geoLng: number;
  rating: number;
  reviewCount?: number;
  isVerified: boolean;
  image: string; // Logo/Profile Pic
  banner?: string; // Cover Image
  phone?: string;
  description?: string;
  timings?: string; // e.g. "9:00 AM - 10:00 PM"
  isOpen?: boolean;
  offers?: ShopOffer[];
  revenue?: number;
  activeOrders?: number;
}

export interface Product {
  id: string;
  shopId: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  inStock: boolean;
  variants?: string[]; // e.g., ["500g", "1kg"]
  isBestSeller?: boolean;
}

// --- LIVE COMMERCE ---
export interface LiveStream {
  id: string;
  shopId: string;
  youtubeVideoId: string;
  title: string;
  status: 'LIVE' | 'SCHEDULED' | 'ENDED';
  viewers: number;
  products: string[]; // List of Product IDs linked to this stream
}

// --- SMART DELIVERY ---
export enum OrderStatus {
  PLACED = 'PLACED',
  ACCEPTED = 'ACCEPTED',
  PACKED = 'PACKED',
  ASSIGNED = 'ASSIGNED',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED'
}

export interface DeliveryRoute {
  id: string;
  partnerId: string;
  currentLat: number;
  currentLng: number;
  destinationLat: number;
  destinationLng: number;
  polyline: string; // Encoded route path
  bufferRadius: number; // Meters deviation allowed
}

export interface Order {
  id: string;
  customerId: string;
  shopId: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  deliveryType: 'STANDARD' | 'SMART_MATCH';
  deliveryFee: number;
  timestamp: string;
  customerName?: string;
  shopName?: string;
  shopAddress?: string;
  customerAddress?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

// --- DELIVERY STATS ---
export interface DeliveryStats {
    todayEarnings: number;
    completedTrips: number;
    onlineHours: number;
    rating: number;
}

// --- ANALYTICS (For Dashboards) ---
export interface DashboardStats {
  totalRevenue: number;
  activeOrders: number;
  pendingDeliveries: number;
  liveViewers: number;
}
