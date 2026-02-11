
import React from 'react';
import StatCard from './StatCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const data = [
    { name: 'Mon', count: 4, queries: 12 },
    { name: 'Tue', count: 7, queries: 18 },
    { name: 'Wed', count: 5, queries: 15 },
    { name: 'Thu', count: 12, queries: 28 },
    { name: 'Fri', count: 8, queries: 22 },
    { name: 'Sat', count: 3, queries: 10 },
    { name: 'Sun', count: 2, queries: 8 },
  ];

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back, Alex! 👋</h2>
          <p className="text-slate-500 mt-1.5 font-medium">Here's what's happening in your knowledge engine today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
            Export Report
          </button>
          <button className="px-5 py-2.5 bg-indigo-600 rounded-xl text-sm font-bold text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
            Add Insight
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Indexed Files" value="1,284" icon="📂" trend="+12.5%" trendType="up" />
        <StatCard title="AI Intelligence" value="98.2%" icon="✨" trend="+2.4%" trendType="up" />
        <StatCard title="Active Users" value="24" icon="👥" trend="-1.2%" trendType="down" />
        <StatCard title="Memory Used" value="8.4 GB" icon="🧠" trend="+0.8%" trendType="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative overflow-hidden">
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Activity Analytics</h3>
              <p className="text-xs text-slate-400 font-medium">Interaction trends across the platform</p>
            </div>
            <div className="flex bg-slate-50 p-1 rounded-xl">
              <button className="px-4 py-1.5 text-xs font-bold bg-white text-indigo-600 rounded-lg shadow-sm">Week</button>
              <button className="px-4 py-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">Month</button>
            </div>
          </div>
          <div style={{height: '288px', width: '100%'}} className="relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} 
                  dy={15} 
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    padding: '12px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="queries" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorCount)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900 text-lg">Quick Picks</h3>
            <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700">See all</button>
          </div>
          <div className="space-y-5 flex-1 overflow-y-auto custom-scrollbar pr-2">
            {[
              { name: 'Infra Design 2025.pdf', size: '2.4MB', color: 'bg-rose-100 text-rose-600', time: '2m ago' },
              { name: 'Auth Module Flow.fig', size: '14.8MB', color: 'bg-indigo-100 text-indigo-600', time: '1h ago' },
              { name: 'DB Optimization.sql', size: '84KB', color: 'bg-amber-100 text-amber-600', time: '4h ago' },
              { name: 'Team Policy.docx', size: '1.2MB', color: 'bg-blue-100 text-blue-600', time: 'Yesterday' },
              { name: 'Product Roadmap.xlsx', size: '3.5MB', color: 'bg-emerald-100 text-emerald-600', time: '2d ago' },
            ].map((doc, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer p-2 rounded-2xl hover:bg-slate-50 transition-all">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-transform group-hover:scale-105 ${doc.color}`}>
                  {doc.name.split('.').pop()?.toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-800 truncate leading-tight">{doc.name}</p>
                  <p className="text-[10px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">{doc.time} • {doc.size}</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-slate-300 hover:text-indigo-600">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
