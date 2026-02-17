import React, { useState } from 'react';
import { ArrowRight, Leaf } from 'lucide-react';

const Landing = ({ onSelectRole }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const personas = [
    {
      id: 'policy-makers',
      title: 'Policy Makers',
      description: 'Compare innovations and create evidence-based policy briefs',
      image: 'https://images.unsplash.com/photo-1640200330428-9fe2ab926de1?w=500&h=400&fit=crop',
      gradient: 'from-blue-600 to-blue-700',
      lightGradient: 'from-blue-50 to-blue-100',
      icon: '📋'
    },
    {
      id: 'farmers',
      title: 'Farmers',
      description: 'Find practical solutions for your farm with step-by-step guides',
      image: 'https://images.unsplash.com/photo-1666987570506-f8c3e05b6c58?w=500&h=400&fit=crop',
      gradient: 'from-green-600 to-green-700',
      lightGradient: 'from-green-50 to-green-100',
      icon: '🌾'
    },
    {
      id: 'researchers',
      title: 'Researchers',
      description: 'Identify research gaps and evaluate innovation scalability',
      image: 'https://images.unsplash.com/photo-1631556760646-50241850eb25?w=500&h=400&fit=crop',
      gradient: 'from-purple-600 to-purple-700',
      lightGradient: 'from-purple-50 to-purple-100',
      icon: '🔬'
    },
    {
      id: 'agripreneurs',
      title: 'Agripreneurs',
      description: 'Scout innovations, assess market readiness, find partnerships',
      image: 'https://images.unsplash.com/photo-1661286178389-e067299f907e?w=500&h=400&fit=crop',
      gradient: 'from-orange-600 to-orange-700',
      lightGradient: 'from-orange-50 to-orange-100',
      icon: '🚀'
    },
    {
      id: 'ngos',
      title: 'NGOs & Development',
      description: 'Find SDG-aligned innovations and share field implementations',
      image: 'https://images.unsplash.com/photo-1560220604-1985ebfe28b1?w=500&h=400&fit=crop',
      gradient: 'from-red-600 to-red-700',
      lightGradient: 'from-red-50 to-red-100',
      icon: '🤝'
    },
    {
      id: 'youth',
      title: 'Youth & Education',
      description: 'Access inspiring examples and training resources',
      image: 'https://images.unsplash.com/photo-1758612898304-1a6bb546ac44?w=500&h=400&fit=crop',
      gradient: 'from-pink-600 to-pink-700',
      lightGradient: 'from-pink-50 to-pink-100',
      icon: '📚'
    },
    {
      id: 'contributors',
      title: 'Community Contributors',
      description: 'Share your innovations and traditional knowledge',
      image: 'https://images.unsplash.com/photo-1740630267005-db9af10c0164?w=500&h=400&fit=crop',
      gradient: 'from-teal-600 to-teal-700',
      lightGradient: 'from-teal-50 to-teal-100',
      icon: '💡'
    },
    {
      id: 'data-providers',
      title: 'Data Providers',
      description: 'Connect your database to the knowledge base',
      image: 'https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?w=500&h=400&fit=crop',
      gradient: 'from-cyan-600 to-cyan-700',
      lightGradient: 'from-cyan-50 to-cyan-100',
      icon: '🗄️'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl text-gray-900">ATIO</span>
              <div className="text-[10px] text-green-600 font-semibold">Knowledge Base</div>
            </div>
          </div>
          <div className="hidden md:block text-sm text-gray-600 font-medium">
            FAO Agrifood Technology & Innovation Outlook
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100/60 backdrop-blur-sm rounded-full border border-green-200/50 text-green-700 text-xs font-bold uppercase tracking-widest">
            <Leaf className="w-4 h-4" />
            Welcome
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight">
            ATIO Knowledge<span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent"> Base</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            A comprehensive platform for discovering, sharing, and implementing agrifood technologies and innovations across Sub-Saharan Africa.
          </p>

          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Select your role below to access tailored content and tools designed for your specific needs.
          </p>
        </div>
      </section>

      {/* Personas Grid */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {personas.map((persona, idx) => (
              <div
                key={persona.id}
                className="group h-full cursor-pointer"
                onMouseEnter={() => setHoveredCard(persona.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => onSelectRole(persona.id)}
              >
                <div className="h-full bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col">
                  {/* Image Container */}
                  <div className="relative overflow-hidden h-56 bg-gradient-to-br from-slate-100 to-slate-200">
                    <img
                      src={persona.image}
                      alt={persona.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125"
                    />
                    {/* Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${persona.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                    
                    {/* Icon badge */}
                    <div className="absolute top-4 right-4 text-4xl drop-shadow-lg transform transition-transform duration-500 group-hover:scale-125">
                      {persona.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-7 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {persona.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed flex-1">
                      {persona.description}
                    </p>

                    {/* Get Started Button */}
                    <button
                      className={`w-full py-3.5 px-4 bg-gradient-to-r ${persona.gradient} text-white font-bold rounded-xl flex items-center justify-between group/btn hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95`}
                      onClick={() => onSelectRole(persona.id)}
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '8', label: 'User Roles', icon: '👥' },
              { number: '100+', label: 'Innovations', icon: '💡' },
              { number: '40+', label: 'Countries', icon: '🌍' },
              { number: '24/7', label: 'Access', icon: '⚡' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center space-y-2">
                <div className="text-3xl">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-green-400 to-green-300 bg-clip-text">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                About the ATIO Knowledge Base
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-green-600 to-green-700 rounded-full"></div>
            </div>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p className="text-xl text-gray-800">
                The ATIO Knowledge Base is a federated platform that connects diverse sources of knowledge about agrifood technologies and innovations relevant to Sub-Saharan Africa.
              </p>
              
              <p>
                Our goal is to make evidence-based information accessible to everyone—from policy makers crafting national strategies to farmers seeking practical solutions.
              </p>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-8 mt-8">
                <p className="text-center text-gray-700 italic text-base">
                  ✨ This is a prototype demonstration. All user roles are now fully functional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-green-600 to-green-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -ml-48 -mb-48"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center text-white space-y-6">
          <h2 className="text-3xl md:text-4xl font-black">Ready to Transform Your Agrifood Knowledge?</h2>
          <p className="text-lg text-green-100">Select your role above and start exploring innovations tailored to your needs.</p>
          <a 
            href="#personas"
            className="inline-flex items-center gap-2 bg-white text-green-700 font-bold py-3 px-8 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Explore All Roles <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-white">ATIO</span>
              </div>
              <p className="text-sm text-slate-500">Connecting innovations across Sub-Saharan Africa</p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#governance" className="hover:text-white transition-colors">Data Governance</a></li>
                <li><a href="#terms" className="hover:text-white transition-colors">Terms of Use</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#docs" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#support" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#twitter" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#linkedin" className="hover:text-white transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm">© 2026 FAO ATIO Knowledge Base. All rights reserved.</p>
              <div className="flex gap-6 text-sm">
                <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
                <a href="#governance" className="hover:text-white transition-colors">Governance</a>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default Landing;
