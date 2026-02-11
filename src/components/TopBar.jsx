
import React from 'react';

const TopBar = ({ activeSection }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
      <h1 className="text-lg font-semibold text-slate-800">{activeSection}</h1>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
          <input 
            type="text" 
            placeholder="Search knowledge base..." 
            className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64 transition-all"
          />
        </div>

        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        </button>

        <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
            <img src="https://picsum.photos/32" alt="Avatar" />
          </div>
          <div className="hidden lg:block">
            <p className="text-xs font-semibold text-slate-800 leading-tight">Alex Thompson</p>
            <p className="text-[10px] text-slate-400">Senior Developer</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
