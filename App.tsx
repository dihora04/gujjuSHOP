
import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { ShoppingBag, Home, Video, User, MapPin, Settings, LogOut } from 'lucide-react';
import HomePage from './pages/HomePage';
import LiveShoppingPage from './pages/LiveShoppingPage';
import CartPage from './pages/CartPage';
import ShopProfilePage from './pages/ShopProfilePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import TechSpecsPage from './pages/TechSpecsPage';
import MerchantDashboard from './pages/MerchantDashboard';
import AdminDashboard from './pages/AdminDashboard';
import DeliveryPartnerApp from './pages/DeliveryPartnerApp';
import LoginPage from './pages/LoginPage';
import { ShopProvider, useShop } from './context';
import { UserRole } from './types';

// Wrapper to handle auth redirection
const AppContent = () => {
  const { currentUser, logout, cart } = useShop();

  if (!currentUser) {
    return <LoginPage />;
  }

  return (
    <Router>
      <div className="min-h-screen font-sans pb-20 selection:bg-brand-primary selection:text-white">
        
        {/* Global Logout for Demo */}
        <div className="fixed top-4 right-4 z-50">
          <button 
            onClick={logout}
            className="bg-black/80 backdrop-blur text-white p-2 rounded-full shadow-xl hover:bg-black transition text-xs flex items-center gap-1 px-3"
          >
            <LogOut size={14} /> <span className="hidden md:inline">Logout</span>
          </button>
        </div>

        {/* CUSTOMER LAYOUT */}
        {currentUser.role === UserRole.CUSTOMER && (
          <>
            <CustomerNavbar cartCount={cart.reduce((a, b) => a + b.quantity, 0)} />
            <main className="max-w-md mx-auto md:max-w-4xl pt-20 px-4">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop/:id" element={<ShopProfilePage />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                <Route path="/live" element={<LiveShoppingPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/specs" element={<TechSpecsPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <CustomerBottomNav />
          </>
        )}

        {/* MERCHANT LAYOUT */}
        {currentUser.role === UserRole.MERCHANT && (
          <div className="bg-gray-50 min-h-screen">
            <main className="max-w-6xl mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<MerchantDashboard />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        )}

        {/* DELIVERY PARTNER LAYOUT */}
        {currentUser.role === UserRole.DELIVERY_PARTNER && (
           <div className="bg-gray-900 min-h-screen">
              <main className="h-screen w-full">
                <Routes>
                    <Route path="/" element={<DeliveryPartnerApp />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </main>
           </div>
        )}

        {/* ADMIN LAYOUT */}
        {currentUser.role === UserRole.ADMIN && (
          <div className="bg-gray-900 min-h-screen text-white">
            <main className="max-w-7xl mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        )}
      </div>
    </Router>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}

// --- CUSTOMER COMPONENTS ---

const CustomerNavbar = ({ cartCount }: { cartCount: number }) => (
  <nav className="fixed top-0 left-0 right-0 glass-nav z-40 h-16 flex items-center justify-between px-4 max-w-md mx-auto md:max-w-full md:px-8 shadow-sm">
    <div className="flex items-center gap-2">
      <div className="w-9 h-9 bg-gradient-to-br from-brand-primary to-orange-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-500/20">G</div>
      <Link to="/" className="text-xl font-black text-gray-900 tracking-tight">Gujju<span className="text-brand-primary">.Shop</span></Link>
    </div>
    
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-1 text-sm font-medium text-gray-700 bg-gray-100/50 border border-gray-200 px-3 py-1.5 rounded-full">
        <MapPin size={14} className="text-brand-primary" />
        <span>Bhavnagar</span>
      </div>
      <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
        <ShoppingBag size={24} className="text-gray-900" />
        {cartCount > 0 && (
          <span className="absolute top-0 right-0 bg-brand-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
            {cartCount}
          </span>
        )}
      </Link>
    </div>
  </nav>
);

const CustomerBottomNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path ? 'text-brand-primary' : 'text-gray-400';

  return (
    <div className="fixed bottom-0 left-0 right-0 glass-nav h-20 flex items-center justify-around z-40 md:hidden pb-2">
      <Link to="/" className={`flex flex-col items-center gap-1 transition-all ${isActive('/')}`}>
        <Home size={24} strokeWidth={isActive('/') ? 2.5 : 2} />
        <span className="text-[10px] font-bold">Home</span>
      </Link>
      <div className="relative -top-5">
        <Link to="/live" className="w-14 h-14 bg-brand-dark rounded-full flex items-center justify-center text-white shadow-xl shadow-brand-dark/30 hover:scale-110 transition-transform border-4 border-white">
          <Video size={24} className="animate-pulse" />
        </Link>
      </div>
      <Link to="/specs" className={`flex flex-col items-center gap-1 transition-all ${isActive('/specs')}`}>
        <User size={24} strokeWidth={isActive('/specs') ? 2.5 : 2} />
        <span className="text-[10px] font-bold">Account</span>
      </Link>
    </div>
  );
};
