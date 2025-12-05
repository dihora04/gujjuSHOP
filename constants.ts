
import { Shop, LiveStream, Product, User, UserRole } from './types';

export const CITIES = ['Bhavnagar', 'Ahmedabad', 'Surat', 'Rajkot'];

export const CATEGORIES = [
  { id: 'food', name: 'Nasto & Food', icon: '🍔' },
  { id: 'fashion', name: 'Fashion', icon: '👗' },
  { id: 'electronics', name: 'Electronics', icon: '📱' },
  { id: 'home', name: 'Home Needs', icon: '🏠' },
];

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Rahul Bhai', phone: '9876500001', password: 'user123', role: UserRole.CUSTOMER, city: 'Bhavnagar', language: 'gu' },
  { id: 'u2', name: 'Jay Bhavani Owner', phone: '9876500002', password: 'shop123', role: UserRole.MERCHANT, city: 'Bhavnagar', language: 'gu', shopId: 's1' },
  { id: 'u3', name: 'Vikram Rider', phone: '9876500003', password: 'rider123', role: UserRole.DELIVERY_PARTNER, city: 'Bhavnagar', language: 'gu' },
  { id: 'u4', name: 'Master Admin', phone: 'admin', password: 'admin', role: UserRole.ADMIN, city: 'Bhavnagar', language: 'en' },
];

export const MOCK_SHOPS: Shop[] = [
  {
    id: 's1',
    name: 'Jay Bhavani Farsan',
    ownerId: 'u2',
    category: 'Food',
    address: 'Waghawadi Road, Bhavnagar',
    city: 'Bhavnagar',
    geoLat: 21.7645,
    geoLng: 72.1519,
    rating: 4.8,
    reviewCount: 1240,
    isVerified: true,
    isOpen: true,
    timings: "8:00 AM - 9:00 PM",
    phone: "+91 98765 43210",
    description: "Famous for Bhavnagari Gathiya and fresh snacks since 1995. We use pure groundnut oil.",
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=300&h=300',
    banner: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200&h=400',
    offers: [
        { id: 'o1', title: 'Monsoon Special', code: 'BHJIYA20', description: '20% Off on Methi Bhajiya', color: 'bg-yellow-100 text-yellow-800' }
    ]
  },
  {
    id: 's2',
    name: 'Mehta Saree Showroom',
    ownerId: 'o2',
    category: 'Fashion',
    address: 'Gogha Circle, Bhavnagar',
    city: 'Bhavnagar',
    geoLat: 21.7600,
    geoLng: 72.1500,
    rating: 4.5,
    reviewCount: 856,
    isVerified: true,
    isOpen: true,
    timings: "10:00 AM - 9:30 PM",
    phone: "+91 98989 89898",
    description: "Premium Bandhani, Patola and Silk Sarees at wholesale rates.",
    image: 'https://images.unsplash.com/photo-1583391724648-281b6f2bdd9b?auto=format&fit=crop&q=80&w=300&h=300',
    banner: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200&h=400',
    offers: [
        { id: 'o2', title: 'Navratri Sale', code: 'GARBA50', description: 'Flat 50% Off on Chaniya Choli', color: 'bg-pink-100 text-pink-800' },
        { id: 'o3', title: 'New User', code: 'SAREE100', description: '₹100 Off on First Order', color: 'bg-blue-100 text-blue-800' }
    ]
  },
  {
    id: 's3',
    name: 'Raju Electronics',
    ownerId: 'o3',
    category: 'Electronics',
    address: 'Kalanala, Bhavnagar',
    city: 'Bhavnagar',
    geoLat: 21.7700,
    geoLng: 72.1600,
    rating: 4.2,
    reviewCount: 320,
    isVerified: false,
    isOpen: false,
    timings: "10:00 AM - 8:00 PM",
    phone: "+91 99000 00099",
    description: "All mobile accessories, repairs and second hand phones available.",
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=300&h=300',
    banner: 'https://images.unsplash.com/photo-1511384039668-7e6745371153?auto=format&fit=crop&q=80&w=1200&h=400'
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    shopId: 's1',
    name: 'Bhavnagari Gathiya',
    price: 300,
    discountPrice: 280,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=300',
    inStock: true,
    variants: ['500g', '1kg'],
    isBestSeller: true
  },
  {
    id: 'p2',
    shopId: 's1',
    name: 'Masala Peanuts',
    price: 150,
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&q=80&w=300',
    inStock: true
  },
  {
    id: 'p3',
    shopId: 's2',
    name: 'Bandhani Saree (Red)',
    price: 1500,
    discountPrice: 1200,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=300',
    inStock: true,
    isBestSeller: true
  },
  {
    id: 'p4',
    shopId: 's2',
    name: 'Cotton Dress Material',
    price: 800,
    image: 'https://images.unsplash.com/photo-1596487680218-db46819a3b2d?auto=format&fit=crop&q=80&w=300',
    inStock: true
  },
  {
     id: 'p5',
     shopId: 's2',
     name: 'Designer Chaniya Choli',
     price: 3500,
     discountPrice: 2499,
     image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80&w=300',
     inStock: true
  }
];

export const MOCK_LIVESTREAMS: LiveStream[] = [
  {
    id: 'l1',
    shopId: 's2',
    youtubeVideoId: 'jfKfPfyJRdk', // Lofi girl as placeholder
    title: 'Navratri Special Collection! 🔴 LIVE',
    status: 'LIVE',
    viewers: 1240,
    products: ['p3', 'p4', 'p5']
  }
];
