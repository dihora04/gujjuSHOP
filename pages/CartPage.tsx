
import React, { useState } from 'react';
import { useShop } from '../context';
import { Leaf, Clock, Truck, ChevronRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart, placeOrder } = useShop();
  const navigate = useNavigate();
  const [deliveryType, setDeliveryType] = useState<'STANDARD' | 'SMART_MATCH'>('SMART_MATCH');

  const subtotal = cart.reduce((acc, item) => acc + ((item.discountPrice || item.price) * item.quantity), 0);
  const standardFee = 40;
  const smartFee = 20;
  const finalFee = deliveryType === 'SMART_MATCH' ? smartFee : standardFee;
  const total = subtotal + finalFee;

  const handlePay = () => {
    placeOrder(deliveryType, finalFee);
    alert('Order Placed Successfully! Merchant will receive it now.');
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6 animate-blob">
          <Truck size={40} className="text-brand-primary" />
        </div>
        <h2 className="text-2xl font-black text-gray-900">Tamari theli khaali che!</h2>
        <p className="text-gray-500 mt-2 text-sm max-w-xs mx-auto">Your bag is empty. Go explore Bhavnagar's best shops!</p>
        <button onClick={() => navigate('/')} className="mt-8 bg-brand-primary text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
            Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      <h1 className="text-3xl font-black text-gray-900">Checkout</h1>

      {/* Cart Items */}
      <div className="space-y-4">
        {cart.map((item, idx) => (
          <div key={`${item.id}-${idx}`} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-center">
            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl bg-gray-100 object-cover" />
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg leading-tight">{item.name}</h3>
              <p className="text-xs text-gray-500 font-medium mt-1">Qty: {item.quantity}</p>
            </div>
            <div className="font-black text-gray-900 text-lg">₹{(item.discountPrice || item.price) * item.quantity}</div>
          </div>
        ))}
      </div>

      {/* Delivery Selection - CORE FEATURE */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-gray-900">Choose Delivery</h3>
        
        {/* Smart Delivery Option */}
        <div 
          onClick={() => setDeliveryType('SMART_MATCH')}
          className={`relative p-5 rounded-3xl border-2 cursor-pointer transition-all duration-300 overflow-hidden group ${deliveryType === 'SMART_MATCH' ? 'border-brand-accent bg-teal-50 shadow-lg shadow-teal-500/10' : 'border-gray-200 bg-white'}`}
        >
          {deliveryType === 'SMART_MATCH' && (
             <div className="absolute top-0 right-0 bg-brand-accent text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-sm z-10">
               ECO SAVER
             </div>
          )}
          <div className="flex justify-between items-center relative z-10">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${deliveryType === 'SMART_MATCH' ? 'bg-brand-accent text-white shadow-lg shadow-teal-500/30' : 'bg-gray-100 text-gray-400'}`}>
                <Leaf size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg">Smart Route Match</p>
                <p className="text-xs text-gray-500 max-w-[180px] leading-relaxed">
                  Rider is already passing by. Save money & planet!
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-2xl text-brand-accent">₹{smartFee}</p>
              <p className="text-xs text-gray-400 line-through">₹{standardFee}</p>
            </div>
          </div>
        </div>

        {/* Standard Delivery Option */}
        <div 
          onClick={() => setDeliveryType('STANDARD')}
          className={`p-5 rounded-3xl border-2 cursor-pointer transition-all ${deliveryType === 'STANDARD' ? 'border-brand-primary bg-orange-50' : 'border-gray-200 bg-white'}`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${deliveryType === 'STANDARD' ? 'bg-brand-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                <Clock size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg">Express Delivery</p>
                <p className="text-xs text-gray-500">
                  Dedicated rider. Faster but costlier.
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-2xl text-gray-900">₹{standardFee}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Payment Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-30 md:relative md:border-0 md:shadow-none md:bg-transparent md:p-0">
         <div className="max-w-md mx-auto md:max-w-full">
            <div className="flex justify-between mb-4 text-sm font-medium">
                <span className="text-gray-500">Total to Pay</span>
                <span className="font-black text-gray-900 text-xl">₹{total}</span>
            </div>
            <button 
                onClick={handlePay}
                className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl shadow-xl flex items-center justify-between px-6 hover:scale-[1.02] active:scale-95 transition-transform"
            >
                <span className="flex items-center gap-2"><Zap size={18} className="fill-brand-secondary text-brand-secondary" /> Pay via UPI</span>
                <ChevronRight size={20} />
            </button>
         </div>
      </div>
    </div>
  );
};

export default CartPage;
