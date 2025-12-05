
import React, { useState } from 'react';
import { Package, Video, Users, DollarSign, Plus, X, Upload } from 'lucide-react';
import { useShop } from '../context';
import { OrderStatus } from '../types';

const MerchantDashboard = () => {
  const { currentUser, products, addProduct, getShopOrders, updateOrderStatus } = useShop();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c' });

  // Get data for this specific shop (linked to user)
  const myShopId = currentUser?.shopId || 's1';
  const myProducts = products.filter(p => p.shopId === myShopId);
  const myOrders = getShopOrders(myShopId);
  const pendingOrders = myOrders.filter(o => o.status === OrderStatus.PLACED);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      addProduct({
        shopId: myShopId,
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        image: newProduct.image,
        inStock: true
      });
      setIsModalOpen(false);
      setNewProduct({ name: '', price: '', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c' });
    }
  };

  return (
    <div className="space-y-6 relative">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back, {currentUser?.name}</p>
        </div>
        <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-bold text-green-600">Shop is Open</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
            icon={<DollarSign className="text-white" />} 
            label="Total Revenue" 
            value={`₹${myOrders.reduce((acc, o) => acc + o.totalAmount, 0)}`}
            trend="+12%" 
            color="bg-brand-primary" 
        />
        <StatCard 
            icon={<Package className="text-white" />} 
            label="Active Orders" 
            value={pendingOrders.length.toString()}
            trend={pendingOrders.length > 0 ? "Action Needed" : "All Clear"}
            color="bg-purple-500" 
        />
      </div>

      {/* Main Action Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 md:col-span-2">
            <h2 className="font-bold text-lg mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center justify-center p-6 rounded-2xl bg-red-50 border-2 border-red-100 hover:border-red-200 transition gap-2 group">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                        <Video size={24} />
                    </div>
                    <span className="font-bold text-red-900">Go Live Now</span>
                </button>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex flex-col items-center justify-center p-6 rounded-2xl bg-blue-50 border-2 border-blue-100 hover:border-blue-200 transition gap-2 group"
                >
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                        <Plus size={24} />
                    </div>
                    <span className="font-bold text-blue-900">Add Product</span>
                </button>
            </div>
        </div>

        {/* Live Orders Preview */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-full">
            <h2 className="font-bold text-lg mb-4">Incoming Orders</h2>
            <div className="space-y-3">
                {pendingOrders.length === 0 && <p className="text-sm text-gray-400">No pending orders.</p>}
                {pendingOrders.map((o) => (
                    <div key={o.id} className="p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                        <div className="flex justify-between items-start mb-2">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-gray-400 text-xs">{o.id.slice(-4)}</div>
                          <span className="text-[10px] font-bold bg-yellow-200 text-yellow-800 px-2 py-1 rounded">New</span>
                        </div>
                        <div className="mb-2">
                            <h4 className="font-bold text-sm">{o.customerName || 'Customer'}</h4>
                            <p className="text-xs text-gray-500">{o.items.length} items • ₹{o.totalAmount}</p>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => updateOrderStatus(o.id, OrderStatus.PACKED)}
                            className="flex-1 bg-green-500 text-white text-xs font-bold py-2 rounded-lg hover:bg-green-600 transition"
                          >
                            Accept & Pack
                          </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-bold text-lg">Your Inventory ({myProducts.length})</h2>
        </div>
        <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500">
                <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                </tr>
            </thead>
            <tbody>
                {myProducts.map(p => (
                    <tr key={p.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                        <td className="p-4 flex items-center gap-3">
                            <img src={p.image} className="w-10 h-10 rounded-lg object-cover" />
                            <span className="font-bold text-gray-900">{p.name}</span>
                        </td>
                        <td className="p-4">₹{p.price}</td>
                        <td className="p-4"><span className="text-green-600 font-bold text-xs bg-green-50 px-2 py-1 rounded-full">In Stock</span></td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      {/* ADD PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-3xl p-6 w-full max-w-md relative z-10 shadow-2xl animate-float">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900"><X size={24}/></button>
            <h2 className="text-2xl font-black mb-6">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
               <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Product Name</label>
                  <input 
                    type="text" 
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    placeholder="e.g., Silk Saree"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-medium outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
               </div>
               <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Price (₹)</label>
                  <input 
                    type="number" 
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    placeholder="e.g., 1500"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-medium outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
               </div>
               <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Image URL</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-medium outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                    />
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                       <img src={newProduct.image} className="w-full h-full object-cover" />
                    </div>
                  </div>
               </div>
               <button type="submit" className="w-full bg-brand-primary text-white font-bold py-4 rounded-xl mt-4 hover:shadow-lg transition">
                  Publish to Shop
               </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

const StatCard = ({ icon, label, value, trend, color }: any) => (
    <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
        <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
            {icon}
        </div>
        <h3 className="text-gray-500 text-sm font-medium">{label}</h3>
        <p className="text-2xl font-black text-gray-900 mt-1">{value}</p>
        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-2 inline-block">
            {trend}
        </span>
    </div>
);

export default MerchantDashboard;
