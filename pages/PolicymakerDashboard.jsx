
import React from 'react';

export const PolicymakerDashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-earth-brown mb-2">Policy & Impact 🏛️</h1>
        <p className="text-gray-600">Decision support tools for sustainable food system transformation.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'SDG 2 Progress', value: '64%', color: 'bg-green-500' },
          { label: 'Food Security Index', value: '7.8', color: 'bg-yellow-500' },
          { label: 'Active Policy Briefs', value: '12', color: 'bg-blue-500' },
          { label: 'Investment Gap', value: '$2.4B', color: 'bg-red-500' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            <div className="w-full h-1.5 bg-gray-100 rounded-full mt-4 overflow-hidden">
              <div className={`h-full ${stat.color} w-2/3 transition-all duration-1000`}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-6">Strategic Policy Evidence</h3>
          <div className="space-y-4">
            {[
              { title: 'Incentivizing Regenerative Agriculture', type: 'Evidence Brief', date: 'Feb 2026', tags: ['Environment', 'Subsidy'] },
              { title: 'National Food Fortification Standards', type: 'Regulation Draft', date: 'Jan 2026', tags: ['Health', 'SDG 3'] },
              { title: 'Youth in Agriculture: 2025 Review', type: 'Report', date: 'Dec 2025', tags: ['Labor', 'Social'] },
            ].map((brief, idx) => (
              <div key={idx} className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer group transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-800 group-hover:text-forest-green">{brief.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{brief.type} • {brief.date}</p>
                  </div>
                  <button className="text-earth-brown opacity-0 group-hover:opacity-100 transition-opacity p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                </div>
                <div className="flex gap-2 mt-3">
                  {brief.tags.map(tag => (
                    <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-earth-brown text-white p-8 rounded-2xl shadow-xl flex flex-col">
          <h3 className="font-bold text-xl mb-6">SDG Impact Roadmap</h3>
          <div className="space-y-8 relative flex-1">
            <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-white bg-opacity-20"></div>
            {[
              { year: '2026', goal: '15% reduction in post-harvest losses' },
              { year: '2028', goal: '50% organic fertilizer usage transition' },
              { year: '2030', goal: 'Zero hunger target achievement' },
            ].map((milestone, idx) => (
              <div key={idx} className="relative pl-10">
                <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-maize-yellow text-forest-green flex items-center justify-center font-bold text-xs shadow-lg">
                  {milestone.year}
                </div>
                <p className="text-sm font-medium">{milestone.goal}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 bg-white text-earth-brown font-bold py-3 rounded-xl hover:bg-soft-cream transition-colors shadow-lg active:scale-95">
            Generate Quarterly Report
          </button>
        </div>
      </div>
    </div>
  );
};
