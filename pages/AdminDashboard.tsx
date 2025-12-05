import React from 'react';
import { Map, Users, Store, Activity, AlertCircle, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white">Master Admin</h1>
          <p className="text-gray-400">System Overview • Bhavnagar Region</p>
        </div>
        <div className="flex gap-3">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition">Export Data</button>
            <button className="bg-brand-primary hover:bg-brand-primary/90 text-white px-4 py-2 rounded-lg text-sm font-bold transition">System Settings</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Active Riders" value="42" sub="Currently Online" />
        <KpiCard title="Live Orders" value="156" sub="Processing" active />
        <KpiCard title="Total Shops" value="84" sub="12 Pending Verification" />
        <KpiCard title="Today's GMV" value="₹1.2L" sub="+15% vs Yesterday" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content - Map Visualization */}
        <div className="lg:col-span-2 bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-white flex items-center gap-2">
                    <Map size={20} className="text-brand-accent" />
                    Live Delivery Heatmap
                </h3>
                <span className="flex items-center gap-2 text-xs text-brand-accent font-mono">
                    <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
                    REALTIME
                </span>
            </div>
            {/* Fake Map UI */}
            <div className="bg-gray-900 rounded-xl h-[400px] w-full relative overflow-hidden border border-gray-700/50">
                 {/* Grid Lines */}
                 <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                 
                 {/* Map Points */}
                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-brand-primary rounded-full shadow-[0_0_20px_rgba(255,94,0,0.6)] animate-pulse"></div>
                 </div>
                 <div className="absolute top-1/3 left-1/4">
                    <div className="w-3 h-3 bg-brand-accent rounded-full shadow-[0_0_15px_rgba(0,224,198,0.6)]"></div>
                 </div>
                 <div className="absolute bottom-1/4 right-1/3">
                    <div className="w-3 h-3 bg-brand-accent rounded-full shadow-[0_0_15px_rgba(0,224,198,0.6)]"></div>
                 </div>

                 {/* Route Line Simulation */}
                 <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <path d="M 200 150 Q 300 200 400 350" fill="none" stroke="rgba(0,224,198,0.4)" strokeWidth="2" strokeDasharray="5,5" />
                 </svg>

                 <div className="absolute bottom-4 left-4 bg-gray-800/90 backdrop-blur text-xs p-3 rounded-lg border border-gray-700">
                    <div className="font-bold text-white mb-1">Zone: Bhavnagar Central</div>
                    <div className="text-gray-400">High Demand Area</div>
                 </div>
            </div>
        </div>

        {/* Sidebar - Verification Queue */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h3 className="font-bold text-white flex items-center gap-2 mb-6">
                <Store size={20} className="text-yellow-500" />
                Shop Verification Queue
            </h3>
            <div className="space-y-4">
                <VerificationItem name="Patel Kirana" address="Waghawadi Rd" status="pending" />
                <VerificationItem name="Milan Shoes" address="Gogha Circle" status="pending" />
                <VerificationItem name="Royal Sweets" address="Kalanala" status="review" />
                <div className="pt-4 border-t border-gray-700">
                    <button className="w-full bg-gray-700 hover:bg-gray-600 text-white text-sm font-bold py-3 rounded-xl transition">
                        View All Requests
                    </button>
                </div>
            </div>
        </div>

        {/* System Health */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
             <HealthCard title="API Latency" value="24ms" status="healthy" />
             <HealthCard title="Order Match Rate" value="98.2%" status="healthy" />
             <HealthCard title="Error Rate" value="0.01%" status="healthy" />
        </div>
      </div>
    </div>
  );
};

const KpiCard = ({ title, value, sub, active }: any) => (
    <div className={`p-6 rounded-2xl border ${active ? 'bg-brand-primary border-brand-primary text-white' : 'bg-gray-800 border-gray-700 text-white'}`}>
        <p className={`text-sm font-medium ${active ? 'text-orange-100' : 'text-gray-400'}`}>{title}</p>
        <h2 className="text-3xl font-black mt-1 mb-1">{value}</h2>
        <p className={`text-xs ${active ? 'text-orange-100' : 'text-gray-500'}`}>{sub}</p>
    </div>
);

const VerificationItem = ({ name, address, status }: any) => (
    <div className="flex items-center justify-between bg-gray-900 p-4 rounded-xl border border-gray-700">
        <div>
            <h4 className="font-bold text-white text-sm">{name}</h4>
            <p className="text-xs text-gray-400">{address}</p>
        </div>
        <div className="flex gap-2">
            <button className="p-1.5 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition">
                <CheckCircle size={16} />
            </button>
            <button className="p-1.5 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition">
                <AlertCircle size={16} />
            </button>
        </div>
    </div>
);

const HealthCard = ({ title, value, status }: any) => (
    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex justify-between items-center">
        <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{title}</p>
            <p className="text-xl font-bold text-white">{value}</p>
        </div>
        <div className="flex items-center gap-2 bg-green-900/30 px-3 py-1 rounded-full border border-green-800">
            <Activity size={14} className="text-green-500" />
            <span className="text-xs font-bold text-green-500">Good</span>
        </div>
    </div>
);

export default AdminDashboard;
