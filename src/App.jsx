
// // import React, { useState } from 'react';
// // import Layout from './components/Layout.jsx';
// // import DecisionForm from './components/DecisionForm.jsx';
// // import DecisionResults from './components/DecisionResults.jsx';
// // import { generateRecommendations } from '../services/geminiService.js';
// // import { Info, Sprout, Search } from 'lucide-react';
// // import { THEME } from './constants.jsx';

// // const App = () => {
// //   const [results, setResults] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   const handleFormSubmit = async (data) => {
// //     setLoading(true);
// //     setError(null);
// //     try {
// //       const recommendations = await generateRecommendations(data);
// //       setResults(recommendations);
// //       // Smooth scroll to results
// //       setTimeout(() => {
// //         document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
// //       }, 100);
// //     } catch (err) {
// //       setError('An error occurred while generating recommendations. Please check your connection and try again.');
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <Layout>
// //       <div className="space-y-12">
// //         {/* Hero Section */}
// //         <section className="text-center space-y-6 py-12">
// //           <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-800 text-xs font-bold uppercase tracking-widest">
// //             <Sprout className="w-4 h-4" />
// //             Decision Intelligence Engine
// //           </div>
// //           <h1 className="text-4xl md:text-6xl font-black text-gray-900 max-w-4xl mx-auto leading-tight">
// //             Transform Agrifood Data into <span style={{ color: THEME.primary }}>Context-Aware Action</span>.
// //           </h1>
// //           <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
// //             Supporting policymakers, NGOs, and extension officers in making evidence-based decisions, 
// //             even with incomplete information.
// //           </p>
// //           <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-gray-400">
// //             <span className="flex items-center gap-1"><Search className="w-3 h-3" /> Context-Aware Scoping</span>
// //             <span className="flex items-center gap-1"><Info className="w-3 h-3" /> FAO ATIO Aligned</span>
// //             <span className="flex items-center gap-1">🟢 Deploy-Ready Logic</span>
// //           </div>
// //         </section>

// //         {/* Input Form Section */}
// //         <section className="max-w-4xl mx-auto">
// //           <DecisionForm onSubmit={handleFormSubmit} isLoading={loading} />
// //         </section>

// //         {/* Error State */}
// //         {error && (
// //           <div className="max-w-4xl mx-auto p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-center font-medium">
// //             {error}
// //           </div>
// //         )}

// //         {/* Results Section */}
// //         {results && (
// //           <section id="results-section" className="scroll-mt-24 max-w-5xl mx-auto">
// //             <DecisionResults results={results} />
// //           </section>
// //         )}

// //         {/* Initial Helper / Placeholder if no results */}
// //         {!results && !loading && (
// //           <section className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 opacity-60">
// //             {[
// //               { title: "Define Context", desc: "Select your persona and local geography to calibrate the engine." },
// //               { title: "Input Constraints", desc: "Specify budget, literacy, and gender focus to filter feasibility." },
// //               { title: "Get Evidence", desc: "Receive action-oriented recommendations with ACS scoring." }
// //             ].map((step, i) => (
// //               <div key={i} className="bg-white p-6 rounded-2xl border border-dashed border-gray-300">
// //                 <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-black text-gray-400 mb-4">{i + 1}</div>
// //                 <h4 className="font-bold text-gray-800 mb-2">{step.title}</h4>
// //                 <p className="text-sm text-gray-500">{step.desc}</p>
// //               </div>
// //             ))}
// //           </section>
// //         )}
// //       </div>
// //     </Layout>
// //   );
// // };

// // export default App;


// import React, { useState } from 'react';
// import Sidebar from './components/Sidebar.jsx';
// import TopBar from './components/TopBar.jsx';
// import Dashboard from './components/Dashboard.jsx';
// import DocumentGrid from './components/DocumentGrid.jsx';
// import ChatInterface from './components/ChatInterface.jsx';
// import KnowledgeGraph from './components/KnowledgeGraph.jsx';
// import Settings from './components/Settings.jsx';
// import { NavSection } from '../types.js';

// const App = () => {
//   const [activeSection, setActiveSection] = useState(NavSection.Dashboard);

//   const renderContent = () => {
//     switch (activeSection) {
//       case NavSection.Dashboard:
//         return <Dashboard />;
//       case NavSection.Documents:
//         return <DocumentGrid />;
//       case NavSection.Assistant:
//         return <ChatInterface />;
//       case NavSection.Graph:
//         return <KnowledgeGraph />;
//       case NavSection.Settings:
//         return <Settings />;
//       default:
//         return <div className="p-8 text-slate-500 font-medium">Coming soon...</div>;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-[#FDFDFE] text-slate-900 overflow-hidden font-['Inter']">
//       <Sidebar activeSection={activeSection} onNavChange={setActiveSection} />
      
//       <main className="flex-1 flex flex-col min-w-0 bg-slate-50/40 relative">
//         <TopBar activeSection={activeSection} />
        
//         <div className="flex-1 overflow-y-auto custom-scrollbar">
//           <div className="max-w-[1400px] mx-auto p-6 md:p-10 animate-in fade-in duration-500">
//             {renderContent()}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default App;


import React, { useState } from 'react';
import { Persona } from '../types.js';
import { Landing } from '../pages/Landing.jsx';
import { FarmerDashboard } from '../pages/FarmerDashboard.jsx';
import { ResearcherDashboard } from '../pages/ResearcherDashboard.jsx';
import { PolicymakerDashboard } from '../pages/PolicymakerDashboard.jsx';
import { ChatWidget } from './components/chatbot/ChatWidget.jsx';

const App = () => {
  const [persona, setPersona] = useState(Persona.GUEST);

  const handleSelectPersona = (p) => {
    setPersona(p);
  };

  const handleLogout = () => {
    setPersona(Persona.GUEST);
  };

  if (persona === Persona.GUEST) {
    return <Landing onSelectPersona={handleSelectPersona} />;
  }

  const renderDashboard = () => {
    switch (persona) {
      case Persona.FARMER: return <FarmerDashboard />;
      case Persona.RESEARCHER: return <ResearcherDashboard />;
      case Persona.POLICYMAKER: return <PolicymakerDashboard />;
      default: return <FarmerDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-soft-cream flex flex-col md:flex-row font-sans">
      <aside className="hidden md:flex w-72 bg-white border-r border-gray-100 flex-col p-6 sticky top-0 h-screen overflow-hidden">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-forest-green rounded-lg flex items-center justify-center text-xl shadow-lg">🌿</div>
          <span className="text-2xl font-black text-forest-green tracking-tighter">ATIO</span>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto pr-2">
          <div className="text-[10px] uppercase font-bold text-gray-400 mb-4 tracking-widest px-4">Navigation</div>
          {[
            { label: 'Dashboard', icon: '🏠', active: true },
            { label: 'Market Feed', icon: '📊', active: false },
            { label: 'Data Bank', icon: '📂', active: false },
            { label: 'Policy Hub', icon: '📜', active: false },
            { label: 'Notifications', icon: '🔔', active: false },
          ].map((item) => (
            <button 
              key={item.label}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                item.active 
                  ? 'bg-forest-green text-white shadow-lg' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-100 space-y-4">
          <div className="bg-soft-cream p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-maize-yellow border-2 border-white flex items-center justify-center text-lg shadow-sm">
              {persona === Persona.FARMER ? '👨🏽‍🌾' : persona === Persona.RESEARCHER ? '👩🏻‍🔬' : '👩🏾‍⚖️'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold truncate">Demo User</p>
              <p className="text-[10px] text-gray-500 capitalize">{persona}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-xs font-bold text-red-400 hover:text-red-600 transition-colors flex items-center gap-2 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      <header className="md:hidden bg-white p-4 border-b border-gray-100 flex justify-between items-center sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-forest-green rounded flex items-center justify-center text-sm shadow-md">🌿</div>
          <span className="text-xl font-black text-forest-green">ATIO</span>
        </div>
        <button onClick={handleLogout} className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">EXIT</button>
      </header>

      <main className="flex-1 p-6 md:p-10 lg:p-16 max-w-7xl mx-auto w-full">
        {renderDashboard()}
      </main>

      <ChatWidget currentPersona={persona} />
    </div>
  );
};

export default App;
