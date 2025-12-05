
import React, { useState, useEffect } from 'react';
import { Navigation, Package, DollarSign, Bike, CheckCircle, Power, ChevronRight, History } from 'lucide-react';
import { DeliveryStats, OrderStatus, Order } from '../types';
import { useShop } from '../context';

const DeliveryPartnerApp = () => {
  const { getAvailableDeliveries, updateOrderStatus } = useShop();
  const [isOnline, setIsOnline] = useState(false);
  const [searching, setSearching] = useState(false);
  const [matchFound, setMatchFound] = useState<Order | null>(null);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [step, setStep] = useState(0); // 0: Pickup, 1: Drop
  
  const [stats, setStats] = useState<DeliveryStats>({
    todayEarnings: 420,
    completedTrips: 8,
    onlineHours: 3.5,
    rating: 4.8
  });

  // Poll for matching orders from the "Global Backend" (Context)
  useEffect(() => {
    let interval: any;
    if (isOnline && !activeOrder && !matchFound) {
      setSearching(true);
      interval = setInterval(() => {
        // Look for orders that are ready (PACKED)
        const available = getAvailableDeliveries();
        if (available.length > 0) {
           setMatchFound(available[0]); // Just pick the first one for demo
           setSearching(false);
        }
      }, 2000);
    } else {
        setSearching(false);
        clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isOnline, activeOrder, matchFound, getAvailableDeliveries]);

  const handleAccept = () => {
    if (!matchFound) return;
    updateOrderStatus(matchFound.id, OrderStatus.ASSIGNED);
    setActiveOrder(matchFound);
    setMatchFound(null);
    setStep(0);
  };

  const completeStep = () => {
    if (!activeOrder) return;
    
    if (step === 0) {
        updateOrderStatus(activeOrder.id, OrderStatus.OUT_FOR_DELIVERY);
        setStep(1);
    } else {
        updateOrderStatus(activeOrder.id, OrderStatus.DELIVERED);
        setStats(prev => ({
            ...prev,
            todayEarnings: prev.todayEarnings + 40, // Simulating earning
            completedTrips: prev.completedTrips + 1
        }));
        setActiveOrder(null);
    }
  };

  return (
    <div className="h-full bg-gray-900 text-white flex flex-col relative overflow-hidden">
      
      {/* HEADER */}
      <div className="p-4 bg-gray-800/50 backdrop-blur-md flex justify-between items-center z-20 border-b border-gray-700">
         <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                 <Bike size={20} />
             </div>
             <div>
                 <h2 className="font-black text-sm uppercase tracking-wider">Rider Partner</h2>
                 <p className="text-xs text-gray-400 font-mono">{isOnline ? 'ONLINE • GPS ACTIVE' : 'OFFLINE'}</p>
             </div>
         </div>
         <div className="text-right">
             <p className="text-xs text-gray-400">Today's Earnings</p>
             <p className="text-xl font-black text-green-400">₹{stats.todayEarnings}</p>
         </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 relative z-10 flex flex-col items-center justify-center p-4">
        
        {/* STATE: OFFLINE */}
        {!isOnline && (
            <div className="text-center space-y-6">
                <div className="relative">
                    <div className="absolute inset-0 bg-brand-primary blur-3xl opacity-20 rounded-full"></div>
                    <button 
                        onClick={() => setIsOnline(true)}
                        className="relative w-32 h-32 bg-gray-800 rounded-full flex flex-col items-center justify-center border-4 border-gray-700 shadow-2xl hover:scale-105 active:scale-95 transition-transform group"
                    >
                        <Power size={40} className="text-brand-primary group-hover:text-white transition-colors" />
                        <span className="text-xs font-bold mt-2 text-gray-300">GO ONLINE</span>
                    </button>
                </div>
                <p className="text-gray-400 text-sm max-w-[200px] mx-auto">Go online to start matching with routes near you.</p>
            </div>
        )}

        {/* STATE: SCANNING */}
        {isOnline && searching && (
            <div className="text-center">
                <div className="relative w-64 h-64 flex items-center justify-center">
                     <div className="absolute inset-0 border-4 border-brand-primary/30 rounded-full animate-ping"></div>
                     <div className="absolute inset-4 border-4 border-brand-primary/20 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                     <div className="w-20 h-20 bg-brand-primary/10 backdrop-blur-md rounded-full flex items-center justify-center border border-brand-primary/50">
                        <Navigation size={32} className="text-brand-primary animate-pulse" />
                     </div>
                </div>
                <h3 className="text-xl font-bold mt-8">Scanning Route...</h3>
                <p className="text-gray-400 text-sm">Looking for PACKED orders nearby...</p>
                <p className="text-xs text-gray-600 mt-2">(Tip: Login as Merchant & Pack an order to see it here)</p>
            </div>
        )}

        {/* STATE: MATCH FOUND (Tinder Card) */}
        {matchFound && (
            <div className="w-full max-w-sm bg-gray-800 rounded-3xl p-1 shadow-2xl border border-gray-700 animate-float">
                <div className="bg-gray-900 rounded-[20px] p-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-brand-accent text-gray-900 text-xs font-black px-3 py-1 rounded-bl-xl">
                        SMART MATCH
                    </div>
                    
                    <div className="text-center mb-6 mt-2">
                        <h4 className="text-3xl font-black text-white">₹45</h4>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Estimated Earning</p>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div className="flex gap-3">
                            <div className="flex flex-col items-center gap-1">
                                <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                                <div className="w-0.5 h-8 bg-gray-700"></div>
                                <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
                            </div>
                            <div className="flex-1 space-y-4">
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Pickup (+2 min)</p>
                                    <p className="font-bold text-sm text-white">{matchFound.shopName}</p>
                                    <p className="text-xs text-gray-400 truncate">{matchFound.shopAddress}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Drop (+4 min)</p>
                                    <p className="font-bold text-sm text-white">{matchFound.customerName}</p>
                                    <p className="text-xs text-gray-400 truncate">{matchFound.customerAddress}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button 
                            onClick={() => setMatchFound(null)}
                            className="bg-gray-800 text-white py-3 rounded-xl font-bold text-sm border border-gray-600 hover:bg-gray-700 transition"
                        >
                            Ignore
                        </button>
                        <button 
                            onClick={handleAccept}
                            className="bg-brand-primary text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-orange-500/30 hover:scale-105 transition transform"
                        >
                            Accept
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* STATE: ACTIVE ORDER */}
        {activeOrder && (
             <div className="w-full max-w-md space-y-4">
                 <div className="bg-gray-800 p-5 rounded-3xl border border-gray-700 shadow-xl">
                     <div className="flex justify-between items-start mb-4">
                         <div>
                             <h3 className="font-bold text-lg text-white">
                                 {step === 0 ? 'Pickup Order' : 'Deliver Order'}
                             </h3>
                             <p className="text-xs text-gray-400">Order #{activeOrder.id.slice(-4)}</p>
                         </div>
                         <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                             <Navigation size={20} className="text-brand-accent" />
                         </div>
                     </div>
                     
                     <div className="bg-gray-900/50 p-4 rounded-xl mb-4 border border-gray-700/50">
                         <p className="text-xs text-gray-500 font-bold uppercase mb-1">Target Address</p>
                         <p className="text-sm font-medium text-white">
                             {step === 0 ? activeOrder.shopAddress : activeOrder.customerAddress}
                         </p>
                     </div>

                     <div className="flex gap-2">
                         <button className="flex-1 bg-gray-700 py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2">
                             <Navigation size={14} /> Navigate
                         </button>
                         <button className="flex-1 bg-gray-700 py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2">
                             <Package size={14} /> Details
                         </button>
                     </div>
                 </div>

                 {/* Swipe to Complete Slider */}
                 <div className="bg-gray-800 p-2 rounded-full border border-gray-700 relative overflow-hidden group cursor-pointer" onClick={completeStep}>
                     <div className="absolute inset-0 bg-green-500/10 w-0 group-hover:w-full transition-all duration-700"></div>
                     <div className="flex items-center justify-between pl-2 pr-6">
                         <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg z-10">
                             <CheckCircle size={24} />
                         </div>
                         <span className="font-bold text-sm text-green-500 uppercase tracking-widest">
                             {step === 0 ? 'Confirm Pickup' : 'Confirm Delivery'}
                         </span>
                         <ChevronRight size={20} className="text-gray-600 animate-pulse" />
                     </div>
                 </div>
             </div>
        )}
      </div>
      
      {/* BOTTOM NAV */}
      <div className="h-16 bg-gray-800 border-t border-gray-700 flex justify-around items-center px-4 z-20">
          <button className="flex flex-col items-center gap-1 text-brand-primary">
              <Navigation size={20} />
              <span className="text-[10px] font-bold">Run</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition">
              <History size={20} />
              <span className="text-[10px] font-bold">History</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition">
              <DollarSign size={20} />
              <span className="text-[10px] font-bold">Earnings</span>
          </button>
      </div>

    </div>
  );
};

export default DeliveryPartnerApp;
