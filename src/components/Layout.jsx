
import React from 'react';
import { Leaf, Menu } from 'lucide-react';
import { THEME } from '../constants.jsx';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: THEME.background }}>
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Leaf className="w-6 h-6" style={{ color: THEME.primary }} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-none">AgriDecision</h1>
              <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mt-1">Intelligence Engine</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-green-700">Home</a>
            <a href="#" className="hover:text-green-700">Knowledge Base</a>
            <a href="#" className="hover:text-green-700">Methodology</a>
          </nav>
          <button className="p-2 rounded-md hover:bg-gray-100 md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>

      <footer className="bg-white border-t py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            Transforming innovation knowledge into context-aware action.
          </p>
          <div className="mt-4 flex justify-center gap-4 text-xs text-gray-400">
            <span>Powered by Gemini 3</span>
            <span>•</span>
            <span>FAO ATIO Alignment</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
