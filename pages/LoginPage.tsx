
import React from 'react';
import { useShop } from '../context';
import { UserRole, User } from '../types';
import { MOCK_USERS } from '../constants';
import { User as UserIcon, Store, Truck, Shield } from 'lucide-react';

const LoginPage = () => {
  const { login } = useShop();

  const handleLogin = (user: User) => {
    login(user.phone);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary opacity-20 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-accent opacity-20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="text-center mb-10 z-10">
        <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
          Gujju<span className="text-brand-primary">.Shop</span>
        </h1>
        <p className="text-gray-400">Select a role to login & test the ecosystem</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl z-10">
        
        {/* CUSTOMER CARD */}
        <LoginCard 
          user={MOCK_USERS.find(u => u.role === UserRole.CUSTOMER)!}
          icon={<UserIcon size={24} />}
          color="bg-blue-600"
          title="Customer App"
          desc="Browse shops, watch live, place orders"
          onClick={handleLogin}
        />

        {/* MERCHANT CARD */}
        <LoginCard 
          user={MOCK_USERS.find(u => u.role === UserRole.MERCHANT)!}
          icon={<Store size={24} />}
          color="bg-brand-primary"
          title="Merchant Dashboard"
          desc="Manage products, go live, accept orders"
          onClick={handleLogin}
        />

        {/* RIDER CARD */}
        <LoginCard 
          user={MOCK_USERS.find(u => u.role === UserRole.DELIVERY_PARTNER)!}
          icon={<Truck size={24} />}
          color="bg-green-600"
          title="Delivery Partner"
          desc="Smart route matching, accept deliveries"
          onClick={handleLogin}
        />

        {/* ADMIN CARD */}
        <LoginCard 
          user={MOCK_USERS.find(u => u.role === UserRole.ADMIN)!}
          icon={<Shield size={24} />}
          color="bg-purple-600"
          title="Master Admin"
          desc="System overview, map tracking"
          onClick={handleLogin}
        />

      </div>
      
      <p className="mt-8 text-xs text-gray-500 font-mono">
        credentials auto-filled for demo
      </p>
    </div>
  );
};

const LoginCard = ({ user, icon, color, title, desc, onClick }: any) => (
  <button 
    onClick={() => onClick(user)}
    className="bg-gray-800 hover:bg-gray-700 border border-gray-700 p-4 rounded-2xl flex items-center gap-4 text-left transition-all hover:scale-[1.02] group"
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg ${color}`}>
      {icon}
    </div>
    <div>
      <h3 className="text-white font-bold text-lg">{title}</h3>
      <p className="text-gray-400 text-xs">{desc}</p>
      <div className="mt-2 text-[10px] bg-gray-900 inline-block px-2 py-1 rounded text-gray-500 font-mono">
        ID: {user.phone}
      </div>
    </div>
  </button>
);

export default LoginPage;
