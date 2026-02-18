
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        <div className="w-12 h-12 bg-fao-teal rounded-lg flex items-center justify-center">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L12 12M12 22V12M12 12L22 12M12 12L2 12" strokeLinecap="round"/>
            <path d="M12 12C12 12 15 12 17 9C19 6 17 3 17 3S14 3 12 6M12 12C12 12 9 12 7 9C5 6 7 3 7 3S10 3 12 6" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">ATIO Knowledge Base</h1>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">FAO Agrifood Technology & Innovation Outlook</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
