
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context';
import { ArrowLeft, Share2, ShoppingBag, Star, CheckCircle, ShieldCheck, Truck } from 'lucide-react';

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, shops, addToCart, cart } = useShop();
  
  const product = products.find(p => p.id === id);
  const shop = product ? shops.find(s => s.id === product.shopId) : null;

  if (!product || !shop) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-xl font-bold text-gray-900">Product not found</h2>
            <button onClick={() => navigate('/')} className="mt-4 text-brand-primary font-bold">Go Home</button>
        </div>
    );
  }

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
        try {
            await navigator.share({
                title: product.name,
                text: `Check out ${product.name} from ${shop.name} on Gujju.Shop!`,
                url
            });
        } catch (err) {
            console.log("Share cancelled");
        }
    } else {
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
    }
  };

  const cartItemCount = cart.find(i => i.id === product.id)?.quantity || 0;

  return (
    <div className="bg-white min-h-screen pb-24 relative">
        {/* Navigation Header */}
        <div className="fixed top-0 left-0 right-0 z-20 flex justify-between items-center p-4 bg-gradient-to-b from-black/50 to-transparent">
            <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 active:scale-90 transition">
                <ArrowLeft size={20} />
            </button>
            <div className="flex gap-3">
                <button onClick={handleShare} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 active:scale-90 transition">
                    <Share2 size={20} />
                </button>
                <Link to="/cart" className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 active:scale-90 transition relative">
                    <ShoppingBag size={20} />
                    {cart.length > 0 && <span className="absolute top-0 right-0 w-3 h-3 bg-brand-primary rounded-full border border-white"></span>}
                </Link>
            </div>
        </div>

        {/* Product Image */}
        <div className="relative h-[45vh] bg-gray-100">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.isBestSeller && (
                <div className="absolute bottom-4 left-4 bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1 rounded-full shadow-lg animate-pulse">
                    BESTSELLER
                </div>
            )}
        </div>

        {/* Details Container */}
        <div className="relative -mt-6 bg-white rounded-t-3xl p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
            
            <div className="flex justify-between items-start mb-2">
                <h1 className="text-2xl font-black text-gray-900 leading-tight w-3/4">{product.name}</h1>
                <div className="text-right">
                    <p className="text-2xl font-black text-brand-primary">₹{product.discountPrice || product.price}</p>
                    {product.discountPrice && (
                        <p className="text-sm text-gray-400 line-through">₹{product.price}</p>
                    )}
                </div>
            </div>

            {/* Variants */}
            {product.variants && (
                <div className="flex gap-2 mb-6">
                    {product.variants.map((v, i) => (
                        <span key={i} className={`px-3 py-1 rounded-lg text-xs font-bold border ${i === 0 ? 'bg-brand-primary/10 border-brand-primary text-brand-primary' : 'border-gray-200 text-gray-500'}`}>
                            {v}
                        </span>
                    ))}
                </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 bg-green-50 p-3 rounded-xl border border-green-100">
                     <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        <ShieldCheck size={16} />
                     </div>
                     <div>
                        <p className="text-xs font-bold text-gray-900">Verified Quality</p>
                        <p className="text-[10px] text-gray-500">Sourced from local experts</p>
                     </div>
                </div>
                <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-xl border border-blue-100">
                     <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <Truck size={16} />
                     </div>
                     <div>
                        <p className="text-xs font-bold text-gray-900">Fast Delivery</p>
                        <p className="text-[10px] text-gray-500">Available in 30 mins</p>
                     </div>
                </div>
            </div>

            {/* Shop Card */}
            <Link to={`/shop/${shop.id}`} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 shadow-sm active:bg-gray-50 transition">
                <img src={shop.image} alt={shop.name} className="w-12 h-12 rounded-xl object-cover bg-gray-100" />
                <div className="flex-1">
                    <h3 className="font-bold text-gray-900 flex items-center gap-1">
                        {shop.name}
                        {shop.isVerified && <CheckCircle size={14} className="text-blue-500 fill-blue-500 text-white" />}
                    </h3>
                    <p className="text-xs text-gray-500">{shop.address}</p>
                </div>
                <div className="text-right">
                    <div className="flex items-center gap-1 text-xs font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded-lg">
                        {shop.rating} <Star size={10} className="fill-brand-primary text-brand-primary" />
                    </div>
                </div>
            </Link>

            <div className="mt-6 text-sm text-gray-500 leading-relaxed">
                <h4 className="font-bold text-gray-900 mb-2">About Product</h4>
                <p>Authentic and fresh {product.name} directly from {shop.name}. Quality checked and packed with care. Best consumed within 3 days of delivery.</p>
            </div>
        </div>

        {/* Sticky Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 flex items-center justify-between z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] md:max-w-4xl md:mx-auto">
             <div className="flex flex-col">
                 <span className="text-xs text-gray-500 font-bold uppercase">Total Price</span>
                 <span className="text-xl font-black text-gray-900">₹{product.discountPrice || product.price}</span>
             </div>
             <button 
                onClick={() => addToCart(product)}
                className="bg-gray-900 text-white font-bold py-3 px-8 rounded-xl shadow-xl hover:bg-black transition active:scale-95 flex items-center gap-2"
             >
                <ShoppingBag size={18} />
                {cartItemCount > 0 ? `Add More (${cartItemCount})` : 'Add to Cart'}
             </button>
        </div>
    </div>
  );
};

export default ProductDetailsPage;
