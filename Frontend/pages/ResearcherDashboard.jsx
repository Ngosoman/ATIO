import React from 'react';

const ResearcherDashboard = ({ onBack }) => {
  const innovations = [
    {
      id: 1,
      title: 'Solar-Powered Drip Irrigation System',
      description: 'Low-cost solar drip irrigation reducing water use by 60% while increasing yields by 40%',
      regions: 'East Africa, Sub-Saharan Africa',
      type: 'technological',
      readiness: '8/9',
      status: 'high evidence',
      sdgs: [2, 6, 13],
      useCases: ['Vegetable production in water-scarce areas', 'Year-round irrigation for high-value crops', 'Climate adaptation for drought-prone regions'],
      citations: 'ICRAF Kenya trials (2024), FAO Smallholder Irrigation Report (2023)'
    },
    {
      id: 2,
      title: 'Community Seed Banks',
      description: 'Farmer-managed seed conservation and distribution system preserving local varieties',
      regions: 'East Africa, Southern Africa, Sub-Saharan Africa',
      type: 'social',
      readiness: '7/9',
      status: 'high evidence',
      sdgs: [2, 15, 13],
      useCases: ['Preservation of indigenous crop varieties', 'Improving seed security at community level', 'Reducing dependence on external seed suppliers'],
      citations: 'Bioversity International (2023), PELUM Ethiopia case studies (2024)'
    }
  ];

  const sdgColors = {
    2: 'bg-[#F29100]',
    6: 'bg-[#00ADEF]',
    13: 'bg-[#3F7E44]',
    15: 'bg-[#56C02B]'
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFB]">
      {/* Header Workspace Bar */}
      <div className="bg-white border-b border-gray-100 py-6 px-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-xl font-bold text-gray-900">Research Workspace</h1>
        </div>
        <button className="bg-white border border-gray-200 px-5 py-2.5 rounded-2xl text-sm font-bold flex items-center gap-2 text-gray-600 hover:bg-gray-50 shadow-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
          Saved
        </button>
      </div>

      <div className="flex-1 flex max-w-7xl mx-auto w-full px-12 py-10 gap-16">
        {/* Advanced Filter Sidebar */}
        <aside className="w-72 flex-shrink-0">
          <h2 className="text-2xl font-bold mb-10">Advanced Filters</h2>
          
          <div className="mb-12">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-5">Innovation Type</h3>
            <div className="space-y-4">
              {['Technological', 'Social', 'Organizational', 'Institutional', 'Hybrid'].map(t => (
                <label key={t} className="flex items-center gap-4 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#008D96] focus:ring-[#008D96]" />
                  <span className="text-[15px] font-medium text-gray-600">{t}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-5">Value Chain Stage</h3>
            <div className="space-y-4">
              {['Pre-production', 'Production', 'Post-harvest', 'Processing', 'Marketing'].map(s => (
                <label key={s} className="flex items-center gap-4 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#008D96] focus:ring-[#008D96]" />
                  <span className="text-[15px] font-medium text-gray-600">{s}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1">
          <div className="bg-white rounded-3xl p-5 border border-gray-100 flex items-center gap-5 shadow-sm mb-10">
            <svg className="w-6 h-6 text-gray-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              type="text" 
              placeholder="Search by innovation name, use case, theme, or challenge..."
              className="flex-1 bg-transparent border-none outline-none text-base font-medium"
            />
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-4">
               <button className="bg-gray-900 text-white px-6 py-2.5 rounded-2xl text-sm font-bold shadow-lg">All Results (3)</button>
               <button className="bg-white text-gray-400 px-6 py-2.5 rounded-2xl text-sm font-bold border border-gray-50 hover:bg-gray-50">Saved (0)</button>
            </div>
            <div className="flex gap-3">
              <button className="bg-white border border-gray-200 px-5 py-2.5 rounded-2xl text-sm font-bold flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a2 2 0 00-2-2H5a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                Export Dataset
              </button>
              <button className="bg-gray-900 text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-lg flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Download Report
              </button>
            </div>
          </div>

          <div className="space-y-10">
            {innovations.map(inn => (
              <div key={inn.id} className="bg-white rounded-[40px] p-10 border border-gray-50 shadow-sm relative hover:shadow-xl transition-all group">
                {/* Readiness Score Badge top right */}
                <div className="absolute top-10 right-10 flex flex-col items-center">
                   <button className="text-gray-200 group-hover:text-[#008D96] transition-colors mb-2">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                   </button>
                   <span className="text-3xl font-black text-[#4F46E5]">{inn.readiness}</span>
                </div>

                <div className="flex gap-4 mb-6">
                  <span className="bg-[#F8FAFB] text-gray-500 text-[10px] font-bold px-4 py-2 rounded-full border border-gray-50 uppercase tracking-widest">{inn.type}</span>
                  <span className="bg-[#E6F5F6] text-[#008D96] text-[10px] font-bold px-4 py-2 rounded-full border border-[#B3DEE1] uppercase tracking-widest">{inn.status}</span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">{inn.title}</h3>
                <p className="text-sm font-medium text-gray-400 mb-10">{inn.regions}</p>

                <p className="text-[#1A1A1A] font-medium leading-relaxed mb-10 max-w-2xl">
                  {inn.description}
                </p>

                <div className="mb-10">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Use Cases:</p>
                   <div className="flex flex-wrap gap-2">
                     {inn.useCases.map((use, i) => (
                       <span key={i} className="bg-[#F8FAFB] text-gray-600 text-[11px] font-bold px-4 py-2 rounded-full border border-gray-50">
                         {use}
                       </span>
                     ))}
                   </div>
                </div>

                <div className="flex items-center gap-6 border-t border-gray-50 pt-10">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">SDGs:</p>
                   <div className="flex gap-2">
                      {inn.sdgs.map(id => (
                        <div key={id} className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm ${sdgColors[id]}`}>
                          {id}
                        </div>
                      ))}
                   </div>
                </div>

                <div className="mt-8 flex items-center gap-2 text-gray-400 text-xs font-medium italic">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {inn.citations}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResearcherDashboard;