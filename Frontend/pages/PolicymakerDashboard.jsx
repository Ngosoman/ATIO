import React from 'react';

const PolicymakerDashboard = ({ onBack }) => {
  const innovations = [
    {
      id: 1,
      title: 'Solar-Powered Drip Irrigation System',
      description: 'Low-cost solar drip irrigation reducing water use by 60% while increasing yields by 40%',
      regions: 'East Africa, Sub-Saharan Africa',
      type: 'technological',
      readiness: '8/9',
      adopted: 5,
      partners: 4,
      status: 'high evidence',
      trend: 'growing',
      sdgs: [
        { id: 2, label: 'Zero Hunger', color: '#F29100' },
        { id: 6, label: 'Clean Water', color: '#00ADEF' },
        { id: 13, label: 'Climate Action', color: '#3F7E44' }
      ],
      impact: 'High Impact',
      investment: '$2.5M needed',
      policyFit: 'Strong'
    },
    {
      id: 2,
      title: 'Community Seed Banks',
      description: 'Farmer-managed seed conservation and distribution system preserving local varieties',
      regions: 'East Africa, Southern Africa, Sub-Saharan Africa',
      type: 'social',
      readiness: '7/9',
      adopted: 6,
      partners: 5,
      status: 'high evidence',
      trend: 'common',
      sdgs: [
        { id: 2, label: 'Zero Hunger', color: '#F29100' },
        { id: 15, label: 'Life on Land', color: '#56C02B' },
        { id: 13, label: 'Climate Action', color: '#3F7E44' }
      ],
      impact: 'Medium Impact',
      investment: '$800K needed',
      policyFit: 'Very Strong'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30">
      {/* Executive Header - Warm & Professional */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-orange-700 py-8 px-10 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
<button 
              onClick={onBack} 
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors text-white backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-semibold">Back</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </span>
                Policy Workspace
              </h1>
              <p className="text-amber-100 text-sm font-medium mt-1">Evidence-based innovations for policy decisions</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="px-5 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition-all backdrop-blur-sm flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
            <button className="px-6 py-3 bg-white text-amber-700 font-bold rounded-xl hover:bg-amber-50 transition-all shadow-lg flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Create Policy Brief
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex max-w-7xl mx-auto w-full px-10 py-10 gap-10">
        {/* Executive Sidebar - Policy Focused Filters */}
        <aside className="w-72 flex-shrink-0 space-y-8">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-amber-100/50">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </span>
              Policy Filters
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Region Focus</h3>
                <div className="space-y-2">
                  {['East Africa', 'West Africa', 'Southern Africa', 'Central Africa', 'Sub-Saharan Africa'].map(r => (
                    <label key={r} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                      <span className="text-sm font-medium text-gray-600 group-hover:text-amber-600 transition-colors">{r}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">SDG Alignment</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Zero Hunger', color: '#F29100' },
                    { label: 'Clean Water', color: '#00ADEF' },
                    { label: 'Climate Action', color: '#3F7E44' },
                    { label: 'No Poverty', color: '#E5243B' }
                  ].map(sdg => (
                    <label key={sdg.label} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                      <span className="flex items-center gap-2 text-sm font-medium text-gray-600 group-hover:text-amber-600">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: sdg.color }}></span>
                        {sdg.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Readiness Level</h3>
                <div className="space-y-2">
                  {['Scale-up Ready (8-9)', 'Pilot Tested (5-7)', 'Early Stage (1-4)'].map(r => (
                    <label key={r} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                      <span className="text-sm font-medium text-gray-600 group-hover:text-amber-600">{r}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Budget Category</h3>
                <div className="space-y-2">
                  {['< $500K', '$500K - $2M', '$2M - $10M', '> $10M'].map(b => (
                    <label key={b} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                      <span className="text-sm font-medium text-gray-600 group-hover:text-amber-600">{b}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-6 text-white shadow-lg">
            <h3 className="font-bold text-lg mb-4">Quick Insights</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-amber-100 text-sm">High-Ready Innovations</span>
                <span className="font-bold text-2xl">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-amber-100 text-sm">Countries Covered</span>
                <span className="font-bold text-2xl">48</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-amber-100 text-sm">Partner Organizations</span>
                <span className="font-bold text-2xl">156</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-amber-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search innovations by policy impact, region, or SDG..."
              className="w-full bg-white border-2 border-amber-100 rounded-2xl py-4 pl-14 pr-6 shadow-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-300 outline-none text-sm font-medium transition-all"
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <p className="text-sm font-bold text-gray-500">3 innovations found matching your criteria</p>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 font-medium">Sort by:</span>
              <select className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400">
                <option>Policy Readiness</option>
                <option>Impact Level</option>
                <option>Investment Needed</option>
              </select>
            </div>
          </div>

          {/* Policy-Focused Innovation Cards */}
          <div className="space-y-6">
            {innovations.map(inn => (
              <div key={inn.id} className="bg-white rounded-[32px] p-8 border-2 border-amber-50 shadow-sm hover:shadow-xl hover:border-amber-100 transition-all relative overflow-hidden">
                {/* Policy Fit Badge */}
                <div className="absolute top-6 right-6 flex items-center gap-2">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                    {inn.policyFit} Policy Fit
                  </span>
                </div>

                <div className="flex gap-4 mb-4">
                  <span className="bg-gray-900 text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest">{inn.type}</span>
                  <span className="bg-green-50 text-green-700 text-[10px] font-bold px-4 py-2 rounded-full uppercase border border-green-100">{inn.status}</span>
                  <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-4 py-2 rounded-full uppercase border border-amber-100">{inn.trend}</span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2 pr-32">{inn.title}</h3>
                <p className="text-sm font-medium text-gray-400 mb-6">{inn.regions}</p>

                <p className="text-gray-700 font-medium leading-relaxed mb-8 max-w-3xl">
                  {inn.description}
                </p>

                {/* SDG Tags */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">SDG Alignment:</span>
                  {inn.sdgs.map(sdg => (
                    <div 
                      key={sdg.id} 
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-xs font-bold shadow-sm" 
                      style={{ backgroundColor: sdg.color }}
                    >
                      <span className="opacity-70">{sdg.id}</span>
                      {sdg.label}
                    </div>
                  ))}
                </div>

                {/* Policy Metrics Grid */}
                <div className="grid grid-cols-4 gap-4 border-t border-gray-100 pt-6">
                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-2xl">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Readiness</p>
                      <p className="text-xl font-bold text-gray-900">{inn.readiness}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Adopted In</p>
                      <p className="text-xl font-bold text-gray-900">{inn.adopted} countries</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-2xl">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Partners</p>
                      <p className="text-xl font-bold text-gray-900">{inn.partners}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-2xl">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Investment</p>
                      <p className="text-lg font-bold text-gray-900">{inn.investment}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6">
                  <button className="flex-1 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View Full Brief
                  </button>
                  <button className="px-6 py-3 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:border-amber-400 hover:text-amber-600 transition-colors">
                    Add to Brief
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PolicymakerDashboard;
