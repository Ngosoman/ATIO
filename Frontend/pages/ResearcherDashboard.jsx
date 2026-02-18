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
      citations: 'ICRAF Kenya trials (2024), FAO Smallholder Irrigation Report (2023)',
      evidenceLevel: 'Strong',
      researchGap: 'Long-term sustainability studies needed',
      institutions: ['ICRAF', 'FAO', 'Wageningen University']
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
      citations: 'Bioversity International (2023), PELUM Ethiopia case studies (2024)',
      evidenceLevel: 'Very Strong',
      researchGap: 'Economic impact assessment needed',
      institutions: ['Bioversity International', 'PELUM', 'University of Nairobi']
    }
  ];

  const sdgColors = {
    2: 'bg-[#F29100]',
    6: 'bg-[#00ADEF]',
    13: 'bg-[#3F7E44]',
    15: 'bg-[#56C02B]'
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-indigo-50/30">
      {/* Research Header - Scientific/Academic */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-700 py-8 px-10 shadow-lg">
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.694.347a2 2 0 01-1.783 0l-.694-.347a6 6 0 00-3.86-.517l-2.387.477a2 2 0 00-1.022.547l-1.39 1.39a2 2 0 00-.45 2.135 11 11 0 0019.101 0 2 2 0 00-.45-2.135l-1.39-1.39z" />
                  </svg>
                </span>
                Research Workspace
              </h1>
              <p className="text-purple-100 text-sm font-medium mt-1">Discover evidence, identify gaps, and evaluate scalability</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="px-5 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition-all backdrop-blur-sm flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Collaborate
            </button>
            <button className="px-6 py-3 bg-white text-purple-700 font-bold rounded-xl hover:bg-purple-50 transition-all shadow-lg flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Compare Innovations
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex max-w-7xl mx-auto w-full px-10 py-10 gap-10">
        {/* Research Sidebar - Academic Filters */}
        <aside className="w-72 flex-shrink-0 space-y-8">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-purple-100/50">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </span>
              Research Filters
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Evidence Level</h3>
                <div className="space-y-2">
                  {['Very Strong', 'Strong', 'Moderate', 'Emerging'].map(e => (
                    <label key={e} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                      <span className="text-sm font-medium text-gray-600 group-hover:text-purple-600 transition-colors">{e}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Publication Year</h3>
                <div className="space-y-2">
                  {['2024', '2023', '2022', '2021', '2020 and earlier'].map(y => (
                    <label key={y} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                      <span className="text-sm font-medium text-gray-600 group-hover:text-purple-600">{y}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Research Institution</h3>
                <div className="space-y-2">
                  {['ICRAF', 'FAO', 'Bioversity International', 'Wageningen University', 'CGIAR'].map(i => (
                    <label key={i} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                      <span className="text-sm font-medium text-gray-600 group-hover:text-purple-600">{i}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Citation Count</h3>
                <div className="space-y-2">
                  {['100+', '50-100', '20-50', 'Under 20'].map(c => (
                    <label key={c} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                      <span className="text-sm font-medium text-gray-600 group-hover:text-purple-600">{c}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Research Quick Stats */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-6 text-white shadow-lg">
            <h3 className="font-bold text-lg mb-4">Research Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-purple-100 text-sm">Peer-reviewed Papers</span>
                <span className="font-bold text-2xl">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-100 text-sm">Case Studies</span>
                <span className="font-bold text-2xl">89</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-100 text-sm">Research Gaps</span>
                <span className="font-bold text-2xl">34</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search by innovation name, use case, research institution, or challenge..."
              className="w-full bg-white border-2 border-purple-100 rounded-2xl py-4 pl-14 pr-6 shadow-sm focus:ring-2 focus:ring-purple-400 focus:border-purple-300 outline-none text-sm font-medium transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-4">
              <button className="bg-gray-900 text-white px-6 py-2.5 rounded-2xl text-sm font-bold shadow-lg">All Results (3)</button>
              <button className="bg-white text-gray-400 px-6 py-2.5 rounded-2xl text-sm font-bold border border-gray-50 hover:bg-gray-50">Saved (0)</button>
            </div>
            <div className="flex gap-3">
              <button className="bg-white border border-purple-200 px-5 py-2.5 rounded-2xl text-sm font-bold flex items-center gap-2 text-purple-700 hover:bg-purple-50 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a2 2 0 00-2-2H5a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Export Dataset
              </button>
              <button className="bg-purple-600 text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-lg flex items-center gap-2 hover:bg-purple-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Report
              </button>
            </div>
          </div>

          {/* Research-Focused Innovation Cards */}
          <div className="space-y-8">
            {innovations.map(inn => (
              <div key={inn.id} className="bg-white rounded-[32px] p-8 border-2 border-purple-50 shadow-sm hover:shadow-xl hover:border-purple-100 transition-all relative overflow-hidden">
                {/* Evidence Level Badge */}
                <div className="absolute top-6 right-6 flex items-center gap-2">
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                    {inn.evidenceLevel} Evidence
                  </span>
                </div>

                <div className="flex gap-4 mb-4">
                  <span className="bg-gray-900 text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest">{inn.type}</span>
                  <span className="bg-purple-50 text-purple-700 text-[10px] font-bold px-4 py-2 rounded-full uppercase border border-purple-100">{inn.status}</span>
                  <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-4 py-2 rounded-full uppercase border border-indigo-100">Readiness: {inn.readiness}</span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">{inn.title}</h3>
                <p className="text-sm font-medium text-gray-400 mb-6">{inn.regions}</p>

                <p className="text-gray-700 font-medium leading-relaxed mb-8 max-w-3xl">
                  {inn.description}
                </p>

                {/* Research Institutions */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Research Institutions:</span>
                  {inn.institutions.map((inst, i) => (
                    <span key={i} className="bg-purple-50 text-purple-700 text-xs font-bold px-3 py-1.5 rounded-full border border-purple-100">
                      {inst}
                    </span>
                  ))}
                </div>

                {/* Use Cases */}
                <div className="mb-6">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Use Cases:</p>
                  <div className="flex flex-wrap gap-2">
                    {inn.useCases.map((use, i) => (
                      <span key={i} className="bg-gray-50 text-gray-600 text-xs font-medium px-4 py-2 rounded-full border border-gray-100">
                        {use}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Research Gap */}
                <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="text-sm font-bold text-amber-800">Research Gap</span>
                  </div>
                  <p className="text-sm text-amber-700">{inn.researchGap}</p>
                </div>

                {/* SDGs */}
                <div className="flex items-center gap-6 border-t border-gray-100 pt-6 mb-6">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">SDGs:</p>
                  <div className="flex gap-2">
                    {inn.sdgs.map(id => (
                      <div key={id} className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md ${sdgColors[id]}`}>
                        {id}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Citations */}
                <div className="flex items-center gap-2 text-gray-500 text-sm font-medium italic bg-gray-50 p-4 rounded-xl">
                  <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  {inn.citations}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6">
                  <button className="flex-1 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View Full Paper
                  </button>
                  <button className="px-6 py-3 border-2 border-purple-200 text-purple-700 font-bold rounded-xl hover:bg-purple-50 transition-colors">
                    Add to Comparison
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

export default ResearcherDashboard;
