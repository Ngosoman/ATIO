
import React, { useState } from 'react';

const DocumentGrid = () => {
  const [documents] = useState([
    { id: '1', title: 'Network Infrastructure 2024', category: 'Infrastructure', lastModified: '2024-03-15', size: '2.4 MB', type: 'pdf' },
    { id: '2', title: 'React Performance Guide', category: 'Frontend', lastModified: '2024-03-14', size: '156 KB', type: 'txt' },
    { id: '3', title: 'PostgreSQL Optimization', category: 'Backend', lastModified: '2024-03-12', size: '1.2 MB', type: 'code' },
    { id: '4', title: 'HR Policy Handbook', category: 'Operations', lastModified: '2024-03-10', size: '3.1 MB', type: 'doc' },
    { id: '5', title: 'Docker Compose Specs', category: 'DevOps', lastModified: '2024-03-08', size: '45 KB', type: 'code' },
    { id: '6', title: 'AWS Cost Audit Q1', category: 'Finance', lastModified: '2024-03-05', size: '4.8 MB', type: 'pdf' },
  ]);

  const getTypeColor = (type) => {
    switch(type) {
      case 'pdf': return 'bg-rose-50 text-rose-600';
      case 'code': return 'bg-amber-50 text-amber-600';
      case 'txt': return 'bg-blue-50 text-blue-600';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Knowledge Library</h2>
          <p className="text-sm text-slate-500 mt-1">Manage and organize your technical documentation.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-xl text-sm font-semibold text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            Add New Document
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-white border border-slate-200 p-5 rounded-2xl hover:border-indigo-300 hover:shadow-lg transition-all group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold uppercase text-xs ${getTypeColor(doc.type)}`}>
                {doc.type}
              </div>
              <button className="p-1.5 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
              </button>
            </div>
            <h3 className="font-semibold text-slate-800 text-sm mb-1 group-hover:text-indigo-600 transition-colors">{doc.title}</h3>
            <p className="text-xs text-slate-400 mb-4">{doc.category}</p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <span className="text-[10px] text-slate-500 font-medium">{doc.size}</span>
              <span className="text-[10px] text-slate-400">{doc.lastModified}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentGrid;
