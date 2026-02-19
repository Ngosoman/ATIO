import React, { useState } from 'react';
import DataSources from './DataSources.jsx';

const ROLES = [
  {
    id: 'policy',
    title: 'Policy Makers',
    description: 'Compare innovations and create evidence-based policy for your region.',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    imageUrl: 'https://images.unsplash.com/photo-1577017040065-650ee4d43339?auto=format&fit=crop&q=80&w=800',
    color: 'bg-blue-600',
    active: true
  },
  {
    id: 'farmer',
    title: 'Farmers',
    description: 'Find practical solutions for your farm with simple step-by-step guides.',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
    color: 'bg-green-600',
    active: true
  },
  {
    id: 'researchers',
    title: 'Researchers',
    description: 'Identify research gaps and evaluate innovation scalability.',
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.694.347a2 2 0 01-1.783 0l-.694-.347a6 6 0 00-3.86-.517l-2.387.477a2 2 0 00-1.022.547l-1.39 1.39a2 2 0 00-.45 2.135 11 11 0 0019.101 0 2 2 0 00-.45-2.135l-1.39-1.39z',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
    color: 'bg-purple-600',
    active: true
  },
  {
    id: 'agripreneurs',
    title: 'Agripreneurs',
    description: 'Scout innovations, assess market readiness and find partners.',
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    color: 'bg-orange-600',
    active: true
  },
  {
    id: 'ngos',
    title: 'NGOs & Development',
    description: 'Find SDG-aligned innovations and share field implementations.',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
    color: 'bg-teal-600',
    active: true
  },
  {
    id: 'youth',
    title: 'Youth & Education',
    description: 'Access inspiring examples and training resources.',
    icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
    color: 'bg-pink-600',
    active: true
  },
  {
    id: 'community_contributor',
    title: 'Community Contributors',
    description: 'Share your innovations and traditional knowledge.',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
    color: 'bg-amber-600',
    active: true
  },
  {
    id: 'data_provider',
    title: 'Data Providers',
    description: 'Connect your database to the knowledge base.',
    icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    color: 'bg-indigo-600',
    active: true
  }
];

const Home = ({ onSelectRole }) => {
  const [showDataSources, setShowDataSources] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header with Logo */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center text-white text-lg font-bold shadow-md">
            🌿
          </div>
          <span className="text-2xl font-black text-green-700 tracking-tight">ATIO</span>
          <span className="text-xs text-gray-500 ml-auto">Knowledge Base</span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-12 pb-32">
      {/* Hero Section */}
      <div className="text-center mb-16 animate-fade-in">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Welcome to the ATIO Knowledge Base</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          A comprehensive platform for discovering, sharing, and implementing agrifood technologies and innovations across Sub-Saharan Africa.
        </p>
        <p className="mt-4 text-gray-500 font-medium italic">Select your role below to access tailored content and tools designed for your specific needs.</p>
      </div>

      {/* Role Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {ROLES.map((role) => (
          <div 
            key={role.id}
            className="glass-card rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full group"
          >
            {/* Image Header */}
            <div className="relative h-52 w-full overflow-hidden persona-image">
              <img src={role.imageUrl} alt={role.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40" />
              
              {/* Active Badge */}
              {role.active && (
                <div className="absolute top-5 right-5 bg-white/85 backdrop-blur-sm px-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#008D96] animate-pulse" />
                   <span className="text-[10px] font-bold text-gray-800 uppercase tracking-[1px]">Active</span>
                </div>
              )}

              {/* Circular Icon */}
              <div className="absolute bottom-5 left-8 w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl border-4 border-white z-10 persona-icon">
                <div className={`w-12 h-12 rounded-full ${role.color} flex items-center justify-center text-white`}> 
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={role.icon} />
                  </svg>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 pt-20 flex flex-col flex-1 relative">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{role.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-8 flex-1 font-medium mt-2">{role.description}</p>
              <button 
                onClick={() => onSelectRole(role.id)}
                className="w-full bg-gray-950 text-white font-bold py-4 rounded-2xl hover:bg-[#008D96] transition-colors text-sm shadow-lg active:scale-95 duration-200"
              >
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* About Section */}
      <div className="bg-white rounded-[48px] border border-gray-100 p-12 shadow-sm animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-extrabold text-gray-900 mb-8">About the ATIO Knowledge Base</h3>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            The ATIO Knowledge Base is a federated platform that connects diverse sources of knowledge about agrifood technologies and innovations relevant to Sub-Saharan Africa.
          </p>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            Our goal is to make evidence-based information accessible to everyone—from policy makers crafting national strategies to farmers seeking practical solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            {/* <button className="bg-gray-50 border border-gray-100 py-4 px-8 rounded-2xl font-bold text-gray-700 hover:bg-[#008D96] hover:text-white transition-all flex items-center justify-center gap-3">
              📊 Data Integration Demo
            </button> */}
            <button onClick={() => setShowDataSources(true)} className="bg-gray-50 border border-gray-100 py-4 px-8 rounded-2xl font-bold text-gray-700 hover:bg-[#008D96] hover:text-white transition-all flex items-center justify-center gap-3">
              📁 Browse Data Sources
            </button>
          </div>
        </div>
      </div>
      <DataSources open={showDataSources} onClose={() => setShowDataSources(false)} />
      </div>
    </div>
  );
};

export default Home;