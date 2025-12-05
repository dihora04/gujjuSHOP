import React from 'react';

const TechSpecsPage = () => {
  return (
    <div className="pb-10 space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Gujju.Shop Architecture</h1>
        <p className="text-gray-500 mt-2">Product Definition & Technical Specifications</p>
      </div>

      <Section title="1. Product Definition">
        <div className="space-y-4">
          <Card title="One-Line Pitch">
            A "ready to shop" hyperlocal marketplace for Gujarat that combines the trust of local bazaars with modern live commerce and eco-friendly smart delivery.
          </Card>
          <Card title="Core Value Props">
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li><strong>Hyper-Local:</strong> Starting in Bhavnagar, targeting Tier 2/3 cities.</li>
              <li><strong>Live Commerce:</strong> YouTube-integrated shopping for local familiarity.</li>
              <li><strong>Smart Delivery:</strong> Route-matching algorithm reduces cost by 50%.</li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section title="2. Information Architecture (Key Flows)">
        <div className="space-y-4">
          <Flow 
            title="Customer: Live Shopping Flow" 
            steps={['Home: Click "Live Now"', 'Watch Stream (YouTube Embed)', 'Overlay: View Products', 'Action: Add to Cart without leaving stream', 'Checkout']} 
          />
          <Flow 
            title="Delivery Partner: Smart Route Match" 
            steps={['App actively tracking GPS', 'System detects Partner is moving A -> B', 'Order placed from Shop (near A) to User (near B)', 'Partner gets alert: "Earn ₹20 extra for +2min detour"', 'Accept -> Pickup -> Drop']} 
          />
        </div>
      </Section>

      <Section title="3. Data Models (Schema)">
        <CodeBlock code={`
// USER
User { id, phone, role, geoHash, kycStatus }

// SHOP
Shop { id, ownerId, lat, lng, category, youtubeChannelId }

// SMART DELIVERY ROUTE
RouteSession {
  riderId: string;
  currentPolyline: string; // encoded path
  destination: { lat, lng };
  bufferZone: number; // meters
}

// MATCHING ENGINE
RouteMatch {
  orderId: string;
  riderId: string;
  detourDistance: number;
  extraTime: number;
  offeredFee: number;
}
        `} />
      </Section>

      <Section title="4. API Design (Endpoints)">
        <div className="space-y-2">
          <ApiEndpoint method="POST" path="/api/v1/delivery/match" desc="Core algorithm. Inputs: Order Pick/Drop coords. Output: List of available riders passing by." />
          <ApiEndpoint method="GET" path="/api/v1/live/active" desc="Fetches active YouTube streams linked to registered Shops." />
          <ApiEndpoint method="POST" path="/api/v1/orders/create" desc="Standard order creation." />
        </div>
      </Section>

      <Section title="5. Tech Stack Recommendation">
        <div className="grid grid-cols-2 gap-4">
          <StackItem label="Frontend" value="React (Web/PWA) + React Native (Mobile)" />
          <StackItem label="Backend" value="Node.js (NestJS) or Go (for high-throughput geo-matching)" />
          <StackItem label="Database" value="PostgreSQL (PostGIS enabled for geospatial)" />
          <StackItem label="Realtime" value="Socket.io / Redis PubSub (Tracking)" />
          <StackItem label="Maps" value="Google Maps Platform (Directions, Distance Matrix)" />
        </div>
      </Section>

      <Section title="6. MVP vs Phase 2">
         <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-bold text-sm mb-2">Phase 1 (MVP - Bhavnagar)</h4>
            <p className="text-xs text-gray-600 mb-4">Manual onboarding of shops, Basic YouTube Embed (no deep API integration), Simple Radius-based delivery matching.</p>
            
            <h4 className="font-bold text-sm mb-2">Phase 2 (Gujarat Scale)</h4>
            <p className="text-xs text-gray-600">Automated KYC, Deep YouTube Shopping API integration, Complex Polyline-matching algorithm for delivery, Regional dialects support.</p>
         </div>
      </Section>
    </div>
  );
};

// UI Helper Components for Documentation
const Section = ({ title, children }: { title: string, children?: React.ReactNode }) => (
  <section>
    <h2 className="text-xl font-bold text-gujju-teal mb-4 uppercase text-sm tracking-wider">{title}</h2>
    {children}
  </section>
);

const Card = ({ title, children }: { title: string, children?: React.ReactNode }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
    <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
    <div className="text-sm text-gray-600">{children}</div>
  </div>
);

const Flow = ({ title, steps }: { title: string, steps: string[] }) => (
  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
    <h3 className="font-bold text-sm text-gray-800 mb-3">{title}</h3>
    <div className="flex flex-col gap-2">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
          <span className="w-5 h-5 bg-gujju-orange text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">{i+1}</span>
          {step}
        </div>
      ))}
    </div>
  </div>
);

const CodeBlock = ({ code }: { code: string }) => (
  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs font-mono">
    {code}
  </pre>
);

const ApiEndpoint = ({ method, path, desc }: { method: string, path: string, desc: string }) => (
  <div className="flex gap-2 items-start bg-white p-2 rounded border border-gray-100">
    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${method === 'GET' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{method}</span>
    <div className="flex-1">
      <code className="text-xs font-bold text-gray-800 block">{path}</code>
      <p className="text-[10px] text-gray-500">{desc}</p>
    </div>
  </div>
);

const StackItem = ({ label, value }: { label: string, value: string }) => (
  <div className="bg-white p-3 rounded border border-gray-100">
    <span className="text-xs text-gray-400 block uppercase tracking-wide">{label}</span>
    <span className="text-sm font-bold text-gray-800">{value}</span>
  </div>
);

export default TechSpecsPage;