import React from 'react';

const FarmerDashboard = ({ onBack }) => {
  const categories = [
    { id: 'crops', label: 'Crops', desc: 'Seeds, planting, growing', icon: '🌾' },
    { id: 'livestock', label: 'Livestock', desc: 'Animals, feed, health', icon: '🐄' },
    { id: 'water', label: 'Water', desc: 'Irrigation, storage, wells', icon: '💧' },
    { id: 'post-harvest', label: 'Post-harvest', desc: 'Storage, drying, processing', icon: '📦' },
    { id: 'climate', label: 'Climate', desc: 'Weather, drought, resilience', icon: '⛈️' },
    { id: 'selling', label: 'Selling', desc: 'Markets, prices, buyers', icon: '💰' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Green Hero Header */}
      <div className="bg-[#008D96] pt-12 pb-24 px-6 relative">
        <div className="max-w-xl mx-auto text-center">
          <div className="flex justify-between items-center mb-10">
            <button onClick={onBack} className="text-white/80 hover:text-white flex items-center gap-2 text-sm font-semibold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Change role
            </button>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">👋</span>
            <span className="text-white font-semibold">Welcome, Farmer!</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-10 leading-tight">What challenge can we help you solve?</h1>
          
          <div className="relative mb-6">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input 
              type="text" 
              placeholder="Type your farming challenge here..."
              className="w-full bg-white border-none rounded-2xl py-5 pl-16 pr-6 shadow-2xl text-lg focus:ring-4 focus:ring-white/20 transition-all outline-none"
            />
          </div>
          
          <button className="w-full bg-[#7BB58C] text-[#1A1A1A] font-bold py-5 rounded-2xl shadow-xl hover:brightness-105 transition-all text-lg">
            Search Solutions →
          </button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="flex-1 bg-white -mt-10 rounded-t-[40px] px-6 pt-12 pb-32 max-w-4xl mx-auto w-full">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Or choose a topic:</h2>
          <p className="text-gray-400 font-medium">Browse solutions by category</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map(cat => (
            <div 
              key={cat.id}
              className="bg-white border border-gray-100 rounded-[32px] p-8 flex items-center gap-6 hover:shadow-xl transition-all cursor-pointer group shadow-sm"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{cat.label}</h3>
                <p className="text-sm text-gray-400 font-medium leading-tight">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Fixed Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-4 px-10 flex justify-between items-center z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
        <button className="flex flex-col items-center gap-1 text-[#008D96] font-bold">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          <span className="text-[10px] uppercase tracking-widest">Home</span>
          <div className="w-1 h-1 bg-[#008D96] rounded-full mt-0.5"></div>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400 font-bold hover:text-[#008D96] transition-colors">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <span className="text-[10px] uppercase tracking-widest">Search</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400 font-bold hover:text-[#008D96] transition-colors">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          <span className="text-[10px] uppercase tracking-widest">Saved</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400 font-bold hover:text-[#008D96] transition-colors">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          <span className="text-[10px] uppercase tracking-widest">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default FarmerDashboard;