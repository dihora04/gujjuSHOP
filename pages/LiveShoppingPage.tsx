
import React, { useState, useEffect } from 'react';
import { MOCK_LIVESTREAMS, MOCK_PRODUCTS, MOCK_SHOPS } from '../constants';
import { Heart, Share2, ShoppingBag, Send, Gift, MoreVertical, X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../context';

const LiveShoppingPage = () => {
  const { addToCart } = useShop();
  const activeStream = MOCK_LIVESTREAMS[0];
  const shop = MOCK_SHOPS.find(s => s.id === activeStream.shopId);
  const products = MOCK_PRODUCTS.filter(p => activeStream.products.includes(p.id));

  // --- PSYCHOLOGY: SOCIAL PROOF ---
  const [notifications, setNotifications] = useState<string[]>([]);
  const dummyNames = ['Riya', 'Amit', 'Priya', 'Jay', 'Sneha'];
  
  useEffect(() => {
    const interval = setInterval(() => {
        const name = dummyNames[Math.floor(Math.random() * dummyNames.length)];
        const action = Math.random() > 0.5 ? 'bought this item' : 'added to cart';
        const msg = `${name} just ${action}!`;
        
        setNotifications(prev => [...prev.slice(-2), msg]); // Keep last 3
        
        // Remove notification after 3s
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n !== msg));
        }, 3000);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // --- PSYCHOLOGY: DOPAMINE HEARTS ---
  const [hearts, setHearts] = useState<{id: number, left: number}[]>([]);
  const handleLike = () => {
      const id = Date.now();
      setHearts(prev => [...prev, { id, left: Math.random() * 40 + 30 }]); // Random left position
      setTimeout(() => setHearts(prev => prev.filter(h => h.id !== id)), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col md:relative md:h-[800px] md:rounded-3xl md:overflow-hidden md:border-8 md:border-black">
      
      {/* BACKGROUND VIDEO LAYER */}
      <div className="absolute inset-0">
         <img 
            src="https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?q=80&w=600&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-90" 
            alt="Live Stream"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>
      </div>

      {/* FLYING HEARTS ANIMATION */}
      {hearts.map(h => (
          <div key={h.id} className="absolute bottom-24 text-red-500 animate-float pointer-events-none z-20" style={{ left: `${h.left}%` }}>
              <Heart size={32} fill="currentColor" />
          </div>
      ))}

      {/* HEADER OVERLAY */}
      <div className="relative z-10 p-4 flex justify-between items-start pt-12 md:pt-4">
        <div className="flex items-center gap-3">
             <div className="relative">
                <img src={shop?.image} className="w-10 h-10 rounded-full border-2 border-brand-primary p-0.5" alt={shop?.name} />
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-[8px] font-black px-1.5 rounded animate-pulse">LIVE</div>
             </div>
             <div>
                 <h2 className="font-bold text-sm text-white shadow-sm leading-tight">{shop?.name}</h2>
                 <p className="text-xs text-white/80 line-clamp-1 max-w-[150px]">{activeStream.title}</p>
             </div>
             <button className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md transition border border-white/10">
                 + Follow
             </button>
        </div>
        <div className="flex items-center gap-4">
             <div className="bg-black/40 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md flex items-center gap-1 border border-white/10">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                1,240
             </div>
             <Link to="/" className="text-white hover:text-gray-300">
                <X size={24} />
             </Link>
        </div>
      </div>

      {/* MIDDLE SPACER with PURCHASE NOTIFICATIONS */}
      <div className="flex-1 flex flex-col justify-end items-start px-4 pb-4 space-y-2 pointer-events-none">
          {notifications.map((note, i) => (
              <div key={i} className="bg-black/50 backdrop-blur-md text-white text-xs px-3 py-2 rounded-lg flex items-center gap-2 animate-in slide-in-from-left fade-in duration-500 border border-white/10">
                  <div className="bg-green-500 p-1 rounded-full"><ShoppingBag size={8} /></div>
                  <span className="font-medium">{note}</span>
              </div>
          ))}
      </div>

      {/* PRODUCTS CAROUSEL (Floating) */}
      <div className="relative z-10 pl-4 mb-2">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pr-4 snap-x">
            {products.map(product => (
                <div key={product.id} className="snap-center min-w-[240px] bg-white/90 backdrop-blur-xl p-3 rounded-2xl flex gap-3 shadow-2xl transform transition hover:-translate-y-1 border border-white/40">
                    <img src={product.image} className="w-16 h-16 rounded-xl object-cover bg-gray-100" />
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <h4 className="font-bold text-sm text-gray-900 line-clamp-1">{product.name}</h4>
                            <div className="flex items-center gap-2">
                                <span className="font-black text-brand-primary">₹{product.discountPrice || product.price}</span>
                                {product.discountPrice && (
                                    <span className="text-xs text-gray-400 line-through">₹{product.price}</span>
                                )}
                            </div>
                        </div>
                        <button 
                            onClick={() => addToCart(product)}
                            className="bg-brand-primary text-white w-full py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1 active:scale-95 transition shadow-lg shadow-orange-500/30"
                        >
                            <ShoppingBag size={12} fill="white" />
                            Buy Now
                        </button>
                    </div>
                </div>
            ))}
          </div>
      </div>

      {/* BOTTOM CONTROLS */}
      <div className="relative z-10 p-4 pb-8 flex items-center gap-3">
         <div className="flex-1 bg-black/40 backdrop-blur-lg rounded-full h-12 flex items-center px-4 border border-white/10 focus-within:border-white/40 transition-colors">
            <input 
                type="text" 
                placeholder="Ask price or size..." 
                className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-white/50" 
            />
         </div>
         <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white/20">
             <Gift size={20} className="text-yellow-400" />
         </button>
         <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white/20">
             <Share2 size={20} />
         </button>
         <div className="flex flex-col gap-1 absolute right-4 bottom-24 items-center">
            <button 
                onClick={handleLike}
                className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-white/10 backdrop-blur-md border border-white/20 active:scale-75 transition-transform"
            >
                <Heart size={24} className="fill-red-500 text-red-500" />
            </button>
            <span className="text-white text-xs font-bold shadow-black drop-shadow-md">4.5k</span>
         </div>
      </div>
    </div>
  );
};

export default LiveShoppingPage;
