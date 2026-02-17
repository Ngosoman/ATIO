import React from 'react';
import { ArrowRight } from 'lucide-react';

const Landing = ({ onSelectRole }) => {
  const personas = [
    {
      id: 'policy-makers',
      title: 'Policy Makers',
      description: 'Compare innovations and create evidence-based policy briefs',
      image: 'https://images.unsplash.com/photo-1640200330428-9fe2ab926de1?w=400&h=300&fit=crop',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'farmers',
      title: 'Farmers',
      description: 'Find practical solutions for your farm with step-by-step guides',
      image: 'https://images.unsplash.com/photo-1666987570506-f8c3e05b6c58?w=400&h=300&fit=crop',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'researchers',
      title: 'Researchers',
      description: 'Identify research gaps and evaluate innovation scalability',
      image: 'https://images.unsplash.com/photo-1631556760646-50241850eb25?w=400&h=300&fit=crop',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'agripreneurs',
      title: 'Agripreneurs',
      description: 'Scout innovations, assess market readiness, find partnerships',
      image: 'https://images.unsplash.com/photo-1661286178389-e067299f907e?w=400&h=300&fit=crop',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'ngos',
      title: 'NGOs & Development',
      description: 'Find SDG-aligned innovations and share field implementations',
      image: 'https://images.unsplash.com/photo-1560220604-1985ebfe28b1?w=400&h=300&fit=crop',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'youth',
      title: 'Youth & Education',
      description: 'Access inspiring examples and training resources',
      image: 'https://images.unsplash.com/photo-1758612898304-1a6bb546ac44?w=400&h=300&fit=crop',
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 'contributors',
      title: 'Community Contributors',
      description: 'Share your innovations and traditional knowledge',
      image: 'https://images.unsplash.com/photo-1740630267005-db9af10c0164?w=400&h=300&fit=crop',
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 'data-providers',
      title: 'Data Providers',
      description: 'Connect your database to the knowledge base',
      image: 'https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?w=400&h=300&fit=crop',
      color: 'from-cyan-500 to-cyan-600'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-lg text-gray-900">ATIO</span>
          </div>
          <div className="text-sm text-gray-600">
            FAO Agrifood Technology & Innovation Outlook
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            ATIO Knowledge Base
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Welcome to the ATIO Knowledge Base
          </p>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            A comprehensive platform for discovering, sharing, and implementing agrifood technologies and innovations across Sub-Saharan Africa.
          </p>
          <p className="text-base text-gray-600 mt-6 max-w-3xl mx-auto">
            Select your role below to access tailored content and tools designed for your specific needs.
          </p>
        </div>
      </section>

      {/* Personas Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {personas.map((persona) => (
              <div
                key={persona.id}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl"
                onClick={() => onSelectRole(persona.id)}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-48 bg-gray-100">
                  <img
                    src={persona.image}
                    alt={persona.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${persona.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 min-h-[3.5rem] flex items-start">
                    {persona.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 min-h-[3rem] leading-relaxed">
                    {persona.description}
                  </p>

                  {/* Get Started Button */}
                  <button
                    className={`w-full py-3 px-4 bg-gradient-to-r ${persona.color} text-white font-semibold rounded-lg flex items-center justify-between group/btn hover:shadow-lg transition-all duration-300`}
                    onClick={() => onSelectRole(persona.id)}
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            About the ATIO Knowledge Base
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              The ATIO Knowledge Base is a federated platform that connects diverse sources of knowledge about agrifood technologies and innovations relevant to Sub-Saharan Africa.
            </p>
            <p>
              Our goal is to make evidence-based information accessible to everyone—from policy makers crafting national strategies to farmers seeking practical solutions.
            </p>
            <p className="text-center text-gray-600 text-base italic pt-4">
              This is a prototype demonstration. All user roles are now fully functional.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-white">ATIO</span>
            </div>
            <div className="flex gap-8 text-sm">
              <a href="#privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#governance" className="hover:text-white transition-colors">
                Data Governance
              </a>
              <a href="#contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2026 FAO ATIO Knowledge Base. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
