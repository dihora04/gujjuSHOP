
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_SHOPS, MOCK_PRODUCTS } from '../constants';
import { MapPin, Star, Phone, Share2, Clock, CheckCircle, Navigation, Search, Plus, Copy } from 'lucide-react';
import { useShop } from '../context';
import { Product } from '../types';

const ShopProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, products, shops } = useShop();
  
  // Use data from context if available, else fallback to MOCK (for initial render stability if context is empty)
  const shop = shops.find(s => s.id === id) || MOCK_SHOPS.find(s => s.id === id);
  const shopProducts = products.filter(p => p.shopId === id);
  
  const [activeTab, setActiveTab] = useState<'products' | 'about'>('products');

  if (!shop) {
    return <div className="p-8 text-center text-gray-500">Shop not found</div>;
  }

  const handleShareProduct = async (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); // Prevent card click if we add one later
    const url = `${window.location.origin}/#/product/${product.id}`;
    
    if (navigator.share) {
        try {
            await navigator.share({
                title: product.name,
                text: `Buy ${product.name} from ${shop.name} on Gujju.Shop`,
                url: url
            });
        } catch (err) {
            console.log("Share cancelled");
        }
    } else {
        navigator.clipboard.writeText(url);
        alert(`Link copied: ${url}`);
    }
  };

  return (
    <div className="pb-10 -mt-20">
      
      {/* 1. COVER & HEADER */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-48 w-full overflow-hidden">
            <img 
                src={shop.banner} 
                className="w-full h-full object-cover" 
                alt="Shop Banner"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        {/* Profile Card Overlay */}
        <div className="px-4 relative -top-12">
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 flex flex-col gap-3">
                
                {/* Logo & Name Row */}
                <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                        <img 
                            src={shop.image} 
                            className="w-16 h-16 rounded-xl border-2 border-white shadow-md bg-white -mt-10" 
                            alt="Logo" 
                        />
                        <div className="pt-1">
                            <h1 className="font-black text-xl text-gray-900 leading-tight flex items-center gap-1">
                                {shop.name}
                                {shop.isVerified && <CheckCircle size={16} className="text-blue-500 fill-blue-500 text-white" />}
                            </h1>
                            <p className="text-xs text-gray-500 font-medium">{shop.category} • {shop.city}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg border border-green-100">
                            <span className="font-black text-sm text-green-700">{shop.rating}</span>
                            <Star size={12} className="fill-green-700 text-green-700" />
                        </div>
                        <span className="text-[10px] text-gray-400 mt-1">{shop.reviewCount} reviews</span>
                    </div>
                </div>

                {/* Info Row */}
                <div className="flex flex-col gap-2 pt-2 border-t border-gray-50">
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                        <MapPin size={16} className="text-gray-400 mt-0.5" />
                        <span className="line-clamp-2 text-xs font-medium">{shop.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={16} className="text-gray-400" />
                        {shop.isOpen ? (
                            <span className="text-xs font-bold text-green-600">Open Now • <span className="text-gray-500 font-normal">{shop.timings}</span></span>
                        ) : (
                            <span className="text-xs font-bold text-red-500">Closed • <span className="text-gray-500 font-normal">Opens {shop.timings?.split('-')[0]}</span></span>
                        )}
                    </div>
                </div>

                {/* Action Buttons (Google My Business Style) */}
                <div className="grid grid-cols-3 gap-3 mt-2">
                    <button className="flex flex-col items-center justify-center gap-1 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition active:scale-95">
                        <Phone size={18} />
                        <span className="text-[10px] font-bold">Call</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-1 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition active:scale-95">
                        <Navigation size={18} />
                        <span className="text-[10px] font-bold">Direction</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-1 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition active:scale-95">
                        <Share2 size={18} />
                        <span className="text-[10px] font-bold">Share</span>
                    </button>
                </div>
            </div>
        </div>
      </div>

      <div className="px-4 space-y-6 -mt-8">
          
          {/* 2. OFFERS CAROUSEL */}
          {shop.offers && shop.offers.length > 0 && (
             <div className="pt-2">
                 <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-3 text-lg">
                     <span className="text-brand-primary">🎉</span> Exclusive Offers
                 </h3>
                 <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x -mx-4 px-4">
                    {shop.offers.map(offer => (
                        <div key={offer.id} className={`snap-center min-w-[280px] h-[160px] p-5 rounded-3xl relative overflow-hidden shadow-lg flex flex-col justify-between group ${offer.color.split(' ')[0]} bg-opacity-20`}>
                            {/* Background Pattern */}
                            <div className={`absolute inset-0 opacity-10 ${offer.color.split(' ')[0]}`}></div>
                            <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                            
                            <div className="relative z-10">
                                <div className="flex justify-between items-start">
                                    <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center font-black text-lg shadow-sm mb-3">
                                        %
                                    </div>
                                    <div className="bg-black/5 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                                        Limited Time
                                    </div>
                                </div>
                                <h4 className="font-black text-xl text-gray-900 leading-tight w-4/5">{offer.title}</h4>
                                <p className="text-xs font-medium text-gray-700 mt-1 line-clamp-1">{offer.description}</p>
                            </div>
                            
                            <div className="relative z-10 flex justify-between items-center bg-white/60 backdrop-blur-md p-1.5 rounded-xl">
                                 <div className="px-2 font-mono font-bold text-gray-800 tracking-widest text-sm">
                                    {offer.code}
                                </div>
                                <button className="bg-gray-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1 hover:bg-black transition">
                                    <Copy size={10} /> Copy
                                </button>
                            </div>
                        </div>
                    ))}
                 </div>
             </div>
          )}

          {/* 3. TABS */}
          <div className="flex border-b border-gray-100">
              <button 
                onClick={() => setActiveTab('products')}
                className={`flex-1 pb-3 text-sm font-bold transition ${activeTab === 'products' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-gray-400'}`}
              >
                Products ({shopProducts.length})
              </button>
              <button 
                onClick={() => setActiveTab('about')}
                className={`flex-1 pb-3 text-sm font-bold transition ${activeTab === 'about' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-gray-400'}`}
              >
                About Shop
              </button>
          </div>

          {/* 4. CONTENT */}
          {activeTab === 'products' ? (
              <div className="space-y-4">
                  {/* Search bar inside shop */}
                  <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input 
                        type="text" 
                        placeholder={`Search in ${shop.name}...`}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20" 
                      />
                  </div>

                  {/* Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {shopProducts.map(product => (
                        <div key={product.id} className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between group relative overflow-hidden">
                            <div className="relative mb-2">
                                <Link to={`/product/${product.id}`}>
                                    <img src={product.image} className="w-full aspect-square object-cover rounded-xl bg-gray-50" alt={product.name} />
                                </Link>
                                
                                {product.isBestSeller && (
                                    <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-[8px] font-black px-1.5 py-0.5 rounded shadow-sm">
                                        BESTSELLER
                                    </div>
                                )}
                                {product.discountPrice && (
                                    <div className="absolute top-2 right-2 bg-green-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow-sm">
                                        OFFER
                                    </div>
                                )}
                                
                                {/* Share Button Overlay */}
                                <button 
                                    onClick={(e) => handleShareProduct(e, product)}
                                    className="absolute bottom-2 right-2 bg-white/90 backdrop-blur text-gray-900 p-1.5 rounded-lg shadow-sm hover:bg-brand-primary hover:text-white transition z-10 border border-gray-100"
                                >
                                    <Share2 size={14} />
                                </button>
                            </div>
                            
                            <div>
                                <Link to={`/product/${product.id}`}>
                                    <h4 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2 mb-1">{product.name}</h4>
                                </Link>
                                <div className="flex items-center gap-1 mb-2">
                                    <span className="font-black text-brand-primary">₹{product.discountPrice || product.price}</span>
                                    {product.discountPrice && (
                                        <span className="text-xs text-gray-400 line-through">₹{product.price}</span>
                                    )}
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => addToCart(product)}
                                className="w-full bg-gray-900 text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition hover:bg-brand-primary"
                            >
                                <Plus size={14} /> Add
                            </button>
                        </div>
                    ))}
                  </div>
              </div>
          ) : (
              <div className="space-y-4 text-gray-600 text-sm">
                  <p>{shop.description}</p>
                  <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                      <h4 className="font-bold text-gray-900">Payment Options</h4>
                      <div className="flex gap-2">
                          <span className="bg-white border px-2 py-1 rounded text-xs font-medium">UPI</span>
                          <span className="bg-white border px-2 py-1 rounded text-xs font-medium">Cash</span>
                          <span className="bg-white border px-2 py-1 rounded text-xs font-medium">Cards</span>
                      </div>
                  </div>
              </div>
          )}
      </div>
    </div>
  );
};

export default ShopProfilePage;
