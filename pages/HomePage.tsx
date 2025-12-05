
import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Star, Clock, Gift, Zap, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORIES, MOCK_LIVESTREAMS } from '../constants';
import { useShop } from '../context';

const HomePage = () => {
  const { shops } = useShop();
  const [timeLeft, setTimeLeft] = useState(3600 * 4); // 4 hours in seconds

  // Urgency Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h : ${m}m : ${s}s`;
  };

  return (
    <div className="space-y-6 pb-10">
      
      {/* 1. GAMIFICATION HEADER (The Reward Hook) */}
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-black text-gray-900 leading-none">
             Kem Cho, <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Bhavnagar?</span>
           </h1>
        </div>
        <div className="bg-gray-900 text-brand-secondary px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg shadow-brand-secondary/20 border border-gray-800 cursor-pointer hover:scale-105 transition">
           <div className="w-5 h-5 bg-brand-secondary rounded-full flex items-center justify-center text-gray-900 font-bold text-[10px]">₹</div>
           <div className="flex flex-col leading-none">
              <span className="text-[8px] text-gray-400 font-bold uppercase">Coins</span>
              <span className="text-sm font-black">450</span>
           </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-accent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative flex items-center bg-white rounded-2xl shadow-sm">
            <Search className="absolute left-4 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Find 'Gathiya' or 'Chaniya Choli'..." 
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-none bg-transparent outline-none font-medium placeholder:text-gray-400"
            />
          </div>
      </div>

      {/* 2. INSTAGRAM STYLE STORIES (Discovery Hook) */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
         {shops.map((shop, i) => (
            <Link to={`/shop/${shop.id}`} key={shop.id} className="flex flex-col items-center gap-1 min-w-[64px] group">
               <div className={`w-16 h-16 rounded-full p-[2px] ${i < 3 ? 'bg-gradient-to-tr from-brand-secondary via-brand-primary to-purple-600' : 'bg-gray-200'}`}>
                  <div className="w-full h-full bg-white rounded-full p-0.5">
                     <img src={shop.image} className="w-full h-full object-cover rounded-full" alt="story" />
                  </div>
               </div>
               <span className="text-[10px] font-bold text-gray-600 truncate w-16 text-center group-hover:text-brand-primary">{shop.name.split(' ')[0]}</span>
            </Link>
         ))}
      </div>

      {/* 3. SCARCITY BANNER (FOMO Hook) */}
      <div className="relative rounded-3xl p-6 overflow-hidden shadow-2xl shadow-orange-500/20 group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-red-600 transition-all duration-500 group-hover:scale-105"></div>
        {/* Animated pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="relative z-10 text-white">
          <div className="flex justify-between items-start mb-2">
             <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold border border-white/20 animate-pulse">
                <Zap size={10} className="fill-yellow-300 text-yellow-300" /> FLASH DEAL
             </div>
             <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold opacity-80">Ends In:</span>
                <div className="font-mono font-bold text-lg leading-none tracking-widest text-yellow-300">
                   {formatTime(timeLeft)}
                </div>
             </div>
          </div>
          
          <h2 className="text-3xl font-black mb-1 font-gujju tracking-tight">Navratri Special</h2>
          <p className="opacity-90 font-medium mb-4 text-sm max-w-[200px]">Flat 50% off on Chaniya Choli & Accessories.</p>
          
          <div className="flex items-center justify-between">
            <button className="bg-white text-red-600 font-black py-2.5 px-6 rounded-xl shadow-lg transform transition active:scale-95 text-xs flex items-center gap-1">
               Claim Now <ChevronRight size={14} />
            </button>
            <div className="text-[10px] font-bold bg-black/20 px-2 py-1 rounded">
               Only 4 left
            </div>
          </div>
        </div>
      </div>

      {/* Live Section */}
      <section className="overflow-hidden -mx-4 px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            Live Shopping
          </h3>
          <Link to="/live" className="text-brand-primary text-xs font-bold uppercase tracking-wider">View All</Link>
        </div>
        
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x">
          {MOCK_LIVESTREAMS.map(stream => {
            const shop = shops.find(s => s.id === stream.shopId);
            return (
              <Link to="/live" key={stream.id} className="snap-center min-w-[260px] h-[340px] relative rounded-[32px] overflow-hidden shadow-lg group">
                <img src={shop?.image} alt={stream.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/90"></div>
                
                {/* Live Badge */}
                <div className="absolute top-4 left-4 bg-red-600/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full border border-white/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> LIVE
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <img src={shop?.image} className="w-8 h-8 rounded-full border-2 border-white" />
                    <div>
                        <span className="text-xs font-bold block leading-none shadow-sm">{shop?.name}</span>
                        <span className="text-[10px] opacity-80">Bhavnagar</span>
                    </div>
                  </div>
                  <h4 className="font-bold text-xl leading-tight mb-2 line-clamp-2">{stream.title}</h4>
                  
                  <button className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold py-2 rounded-xl text-xs hover:bg-white hover:text-black transition">
                     Join Stream
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Categories Grid */}
      <section>
        <h3 className="font-bold text-lg text-gray-900 mb-4">What's on your mind?</h3>
        <div className="grid grid-cols-4 gap-3">
          {CATEGORIES.map(cat => (
            <div key={cat.id} className="flex flex-col items-center gap-2 group cursor-pointer active:scale-95 transition-transform">
              <div className="w-18 h-18 aspect-square w-full bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-3xl group-hover:-translate-y-1 transition-transform duration-300 group-hover:shadow-md group-hover:border-brand-accent/50">
                {cat.icon}
              </div>
              <span className="text-[10px] font-bold text-gray-600 group-hover:text-brand-primary transition-colors text-center leading-tight">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Nearby Shops */}
      <section>
        <h3 className="font-bold text-lg text-gray-900 mb-4">Trending Near You</h3>
        <div className="space-y-4">
          {shops.map((shop) => (
            <Link to={`/shop/${shop.id}`} key={shop.id} className="glass-panel p-3 rounded-2xl flex gap-4 transition hover:bg-white active:scale-[0.98] block">
              <div className="relative">
                <img src={shop.image} alt={shop.name} className="w-24 h-24 rounded-xl object-cover bg-gray-100" />
                <div className="absolute -bottom-2 -right-2 bg-white text-gray-900 text-xs font-black px-2 py-1 rounded-lg shadow-sm border border-gray-100 flex items-center gap-1">
                  <Star size={10} className="fill-brand-secondary text-brand-secondary" /> {shop.rating}
                </div>
              </div>
              <div className="flex-1 py-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-gray-900 text-lg leading-none">{shop.name}</h4>
                  {shop.isVerified && <div className="text-blue-500"><div className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[8px] font-bold">✓</div></div>}
                </div>
                <p className="text-xs text-gray-500 font-medium mb-3">{shop.category} • {shop.address}</p>
                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded-md flex items-center gap-1">
                     <Clock size={10} /> 20 min
                   </span>
                   {shop.offers && shop.offers.length > 0 && (
                     <span className="text-[10px] font-bold bg-pink-100 text-pink-600 px-2 py-1 rounded-md flex items-center gap-1">
                       <Gift size={10} /> Offer
                     </span>
                   )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tech Specs Link */}
      <div className="pt-4 text-center">
        <Link to="/specs" className="text-[10px] font-bold text-gray-300 uppercase tracking-widest hover:text-brand-primary">
          View Technical Specs & Architecture
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
