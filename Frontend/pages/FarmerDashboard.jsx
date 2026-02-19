import React, { useState } from 'react';

const FarmerDashboard = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'crops', label: 'Crops', desc: 'Seeds, planting, growing', icon: '🌾' },
    { id: 'livestock', label: 'Livestock', desc: 'Animals, feed, health', icon: '🐄' },
    { id: 'water', label: 'Water', desc: 'Irrigation, storage, wells', icon: '💧' },
    { id: 'post-harvest', label: 'Post-harvest', desc: 'Storage, drying, processing', icon: '📦' },
    { id: 'climate', label: 'Climate', desc: 'Weather, drought, resilience', icon: '⛈️' },
    { id: 'selling', label: 'Selling', desc: 'Markets, prices, buyers', icon: '💰' }
  ];

  // Mock innovations data by category
  const innovationsByCategory = {
    crops: [
      {
        id: 1,
        title: 'Solar-Powered Drip Irrigation System',
        description: 'Low-cost solar drip irrigation reducing water use by 60% while increasing yields by 40%',
        readiness: 'Scale-up Ready (8/9)',
        impact: 'High Impact',
        region: 'East Africa'
      },
      {
        id: 2,
        title: 'Improved Crop Varieties',
        description: 'Drought-resistant seeds suited to local climate conditions',
        readiness: 'Common (7/9)',
        impact: 'High Impact',
        region: 'Sub-Saharan Africa'
      },
      {
        id: 3,
        title: 'Conservation Agriculture',
        description: 'Minimum tillage methods to maintain soil health and reduce labor',
        readiness: 'Pilot Tested (6/9)',
        impact: 'Medium Impact',
        region: 'Southern Africa'
      }
    ],
    water: [
      {
        id: 4,
        title: 'Solar-Powered Drip Irrigation System',
        description: 'Low-cost solar drip irrigation reducing water use by 60% while increasing yields by 40%',
        readiness: 'Scale-up Ready (8/9)',
        impact: 'High Impact',
        region: 'East Africa'
      },
      {
        id: 5,
        title: 'Rainwater Harvesting Systems',
        description: 'Simple, low-cost systems for capturing and storing seasonal rainfall',
        readiness: 'Common (7/9)',
        impact: 'High Impact',
        region: 'Sub-Saharan Africa'
      },
      {
        id: 6,
        title: 'Shallow Wells & Boreholes',
        description: 'Affordable groundwater access for year-round irrigation',
        readiness: 'Pilot Tested (5/9)',
        impact: 'Medium Impact',
        region: 'East Africa'
      }
    ],
    livestock: [
      {
        id: 7,
        title: 'Improved Animal Feed',
        description: 'High-nutrition feed supplements to boost animal productivity',
        readiness: 'Common (7/9)',
        impact: 'Medium Impact',
        region: 'Sub-Saharan Africa'
      },
      {
        id: 8,
        title: 'Veterinary Extension Services',
        description: 'Mobile and digital veterinary advice for disease prevention',
        readiness: 'Pilot Tested (6/9)',
        impact: 'High Impact',
        region: 'East Africa'
      }
    ],
    'post-harvest': [
      {
        id: 9,
        title: 'Solar Crop Dryers',
        description: 'Low-cost drying systems to reduce post-harvest losses',
        readiness: 'Pilot Tested (6/9)',
        impact: 'High Impact',
        region: 'East Africa'
      },
      {
        id: 10,
        title: 'Improved Storage Facilities',
        description: 'Hermetic sealed bags and storage structures preventing pest damage',
        readiness: 'Common (7/9)',
        impact: 'Medium Impact',
        region: 'Sub-Saharan Africa'
      }
    ],
    climate: [
      {
        id: 11,
        title: 'Weather Forecasting Apps',
        description: 'Mobile apps providing localized weather predictions for farm planning',
        readiness: 'Scale-up Ready (8/9)',
        impact: 'High Impact',
        region: 'Sub-Saharan Africa'
      },
      {
        id: 12,
        title: 'Drought-Resistant Varieties',
        description: 'Crop varieties designed to withstand water stress',
        readiness: 'Common (7/9)',
        impact: 'High Impact',
        region: 'East Africa'
      }
    ],
    selling: [
      {
        id: 13,
        title: 'Mobile Money Payments',
        description: 'Secure buyer payments via mobile phone for farm produce',
        readiness: 'Scale-up Ready (8/9)',
        impact: 'High Impact',
        region: 'Sub-Saharan Africa'
      },
      {
        id: 14,
        title: 'Farmer Cooperatives & Aggregation',
        description: 'Group farming for better market access and pricing power',
        readiness: 'Common (7/9)',
        impact: 'High Impact',
        region: 'East Africa'
      },
      {
        id: 15,
        title: 'Market Price Information Systems',
        description: 'Real-time commodity prices to negotiate better deals',
        readiness: 'Pilot Tested (6/9)',
        impact: 'Medium Impact',
        region: 'Sub-Saharan Africa'
      }
    ]
  };

  const selectedInnovations = selectedCategory ? innovationsByCategory[selectedCategory] : [];
  
  const filteredInnovations = selectedInnovations.filter(inn =>
    inn.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inn.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="flex-1 bg-white -mt-10 rounded-t-[40px] px-6 pt-12 pb-32 max-w-6xl mx-auto w-full">
        {!selectedCategory ? (
          <>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Or choose a topic:</h2>
              <p className="text-gray-400 font-medium">Browse solutions by category</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map(cat => (
                <div 
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="bg-white border border-gray-100 rounded-[32px] p-8 flex items-center gap-6 hover:shadow-xl hover:border-[#008D96] transition-all cursor-pointer group shadow-sm"
                >
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 group-hover:bg-[#008D96]/10 transition-transform">
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{cat.label}</h3>
                    <p className="text-sm text-gray-400 font-medium leading-tight">{cat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Back and Search */}
            <div className="mb-8">
              <button 
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchTerm('');
                }}
                className="flex items-center gap-2 text-[#008D96] font-semibold mb-6 hover:text-[#006B74] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Back to Categories
              </button>
              
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {categories.find(c => c.id === selectedCategory)?.label} Solutions
                </h2>
                <p className="text-gray-500">{filteredInnovations.length} innovative solutions found</p>
              </div>

              {/* Search in category */}
              <div className="relative mt-6 max-w-md">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search within this category..."
                  className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#008D96] focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Innovations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredInnovations.length > 0 ? (
                filteredInnovations.map(inn => (
                  <div 
                    key={inn.id}
                    className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-[#008D96] transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900 flex-1 group-hover:text-[#008D96] transition-colors">
                        {inn.title}
                      </h3>
                      <span className="ml-2 text-2xl">💡</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {inn.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-block bg-[#008D96]/10 text-[#008D96] text-xs font-semibold px-3 py-1 rounded-full">
                        {inn.readiness}
                      </span>
                      <span className="inline-block bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {inn.impact}
                      </span>
                      <span className="inline-block bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {inn.region}
                      </span>
                    </div>
                    
                    <button className="w-full bg-[#008D96] text-white font-semibold py-2 rounded-lg hover:bg-[#006B74] transition-colors text-sm">
                      Learn More →
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No innovations found for your search.</p>
                </div>
              )}
            </div>
          </>
        )}      </div>

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