
import React from 'react';
import { PERSONA_CONFIGS } from '../constants.js';

export const Landing = ({ onSelectPersona }) => {
  return (
    <div className="min-h-screen bg-soft-cream flex flex-col items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]">
      <div className="max-w-4xl w-full text-center space-y-12">
        <header className="space-y-4">
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-forest-green rounded-2xl shadow-xl flex items-center justify-center text-3xl">🌿</div>
            <h1 className="text-5xl font-black text-forest-green tracking-tight">ATIO</h1>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            The Future of <span className="text-forest-green">Sustainable Food Systems</span> AI
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your persona to access specialized data tools, policy briefs, and agricultural insights powered by advanced RAG AI.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PERSONA_CONFIGS.map((config) => (
            <button
              key={config.id}
              onClick={() => onSelectPersona(config.id)}
              className="group relative bg-white p-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-300 border-b-8 border-gray-100 flex flex-col items-center text-center transform hover:-translate-y-2 hover:border-forest-green"
              style={{ borderColor: `rgba(46, 125, 50, 0.1)` }}
            >
              <div 
                className="w-20 h-20 rounded-3xl mb-6 flex items-center justify-center text-4xl shadow-inner transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${config.color}15` }}
              >
                {config.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-forest-green">{config.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {config.description}
              </p>
              <div className="mt-6 font-bold text-sm text-forest-green flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Enter Platform
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        <footer className="text-gray-400 text-sm flex flex-wrap items-center justify-center gap-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Real-time FAO Data
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-maize-yellow rounded-full animate-pulse"></span>
            WCAG Compliant
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-earth-brown rounded-full animate-pulse"></span>
            ATIO Research Lab
          </div>
        </footer>
      </div>
    </div>
  );
};
