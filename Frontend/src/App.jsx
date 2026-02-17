import React, { useState } from 'react';
import { Persona } from '../types.js';
import { Landing } from '../pages/Landing.jsx';
import { FarmerDashboard } from '../pages/FarmerDashboard.jsx';
import { ResearcherDashboard } from '../pages/ResearcherDashboard.jsx';
import { PolicymakerDashboard } from '../pages/PolicymakerDashboard.jsx';
import { FloatingChat } from './components/chatbot/FloatingChat.jsx';
import { VoiceReadButton } from './components/chatbot/VoiceReadButton.jsx';

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
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all ${item.active
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

      { }
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <VoiceReadButton />
        <FloatingChat />
      </div>
    </div>
  );
};

export default App;
