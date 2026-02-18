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
      ]
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
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFB]">
      {/* Navbar Header */}
      <div className="bg-white border-b border-gray-100 py-5 px-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-xl font-bold text-gray-900">Policy Dashboard</h1>
        </div>
      </div>

      <div className="flex-1 flex max-w-7xl mx-auto w-full px-10 py-10 gap-12">
        {/* Left Sidebar Filters */}
        <aside className="w-64 flex-shrink-0">
          <h2 className="text-xl font-bold mb-8">Filters</h2>
          
          <div className="mb-10">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Innovation Type</h3>
            <div className="space-y-3">
              {['Technological', 'Social', 'Organizational', 'Institutional', 'Hybrid'].map(t => (
                <label key={t} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#008D96] focus:ring-[#008D96]" />
                  <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">{t}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Region</h3>
            <div className="space-y-3">
              {['East Africa', 'West Africa', 'Southern Africa', 'Central Africa', 'Sub-Saharan Africa'].map(r => (
                <label key={r} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#008D96] focus:ring-[#008D96]" />
                  <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">{r}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Feed */}
        <main className="flex-1">
          <div className="relative mb-8">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input 
              type="text" 
              placeholder="Search innovations by name, description, or theme..."
              className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-14 pr-6 shadow-sm focus:ring-2 focus:ring-[#008D96] outline-none text-sm font-medium"
            />
          </div>

          <p className="text-sm font-bold text-gray-400 mb-6">3 innovations found</p>

          <div className="space-y-8">
            {innovations.map(inn => (
              <div key={inn.id} className="bg-white rounded-[32px] p-8 border border-gray-50 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded bg-gray-900" />
                    <h3 className="text-2xl font-bold text-gray-900">{inn.title}</h3>
                  </div>
                  <div className="flex gap-2">
                    <span className="bg-[#E6F5F6] text-[#008D96] text-[10px] font-bold px-3 py-1 rounded-full uppercase border border-[#B3DEE1]">{inn.status}</span>
                    <span className="bg-[#EEF2FF] text-[#4F46E5] text-[10px] font-bold px-3 py-1 rounded-full uppercase border border-[#D1D5DB]">{inn.trend}</span>
                  </div>
                </div>

                <div className="text-sm font-medium text-gray-400 mb-6">
                  {inn.regions} • <span className="text-[#008D96]">{inn.type}</span>
                </div>

                <p className="text-[#1A1A1A] font-medium leading-relaxed mb-8 max-w-3xl">
                  {inn.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 mb-10">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Impact SDGs:</span>
                  {inn.sdgs.map(sdg => (
                    <div key={sdg.id} className="flex items-center gap-2 px-3 py-1 rounded-full text-white text-[11px] font-bold" style={{ backgroundColor: sdg.color }}>
                       <span className="opacity-60">{sdg.id}</span>
                       {sdg.label}
                    </div>
                  ))}
                </div>

                <div className="flex border-t border-gray-50 pt-8 mt-auto">
                  <div className="flex-1 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#008D96]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Readiness</p>
                      <p className="text-lg font-bold text-gray-900">{inn.readiness}</p>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center gap-4 border-l border-gray-50 pl-8">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#008D96]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Adopted in</p>
                      <p className="text-lg font-bold text-gray-900">{inn.adopted} countries</p>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center gap-4 border-l border-gray-50 pl-8">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#008D96]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Partners</p>
                      <p className="text-lg font-bold text-gray-900">{inn.partners}</p>
                    </div>
                  </div>
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