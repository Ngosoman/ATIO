
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
  { name: '2019', production: 4000, consumption: 2400 },
  { name: '2020', production: 3000, consumption: 1398 },
  { name: '2021', production: 2000, consumption: 9800 },
  { name: '2022', production: 2780, consumption: 3908 },
  { name: '2023', production: 1890, consumption: 4800 },
];

export const ResearcherDashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-teal-800 mb-2">Research Insights 🔬</h1>
          <p className="text-gray-600">Cross-analyzing global food system stability and sustainability.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50">Export CSV</button>
          <button className="bg-teal-accent text-white px-4 py-2 rounded-lg text-sm hover:bg-opacity-90">Analyze Dataset</button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-80">
          <h3 className="font-semibold mb-6">Production vs. Consumption Trends</h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="production" fill="#00695C" radius={[4, 4, 0, 0]} />
              <Bar dataKey="consumption" fill="#FBC02D" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-80">
          <h3 className="font-semibold mb-6">Nutritional Access Index</h3>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="production" stroke="#00695C" strokeWidth={3} dot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center min-w-[600px]">
          <h3 className="font-semibold">Recent FAO Dataset Access</h3>
          <span className="text-xs text-teal-600 font-medium">Viewing 1-5 of 12</span>
        </div>
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 font-medium">Dataset ID</th>
              <th className="px-6 py-3 font-medium">Indicator Name</th>
              <th className="px-6 py-3 font-medium">Region</th>
              <th className="px-6 py-3 font-medium">Last Sync</th>
              <th className="px-6 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {[
              { id: 'FAO-001', name: 'Soil Salinity', region: 'Sahara Sub-region', sync: '2 hours ago', status: 'Stable' },
              { id: 'FAO-002', name: 'Water Retention', region: 'East Africa', sync: '1 day ago', status: 'Critical' },
              { id: 'FAO-003', name: 'Crop Diversification', region: 'Global', sync: '5 mins ago', status: 'Updating' },
            ].map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{item.id}</td>
                <td className="px-6 py-4 text-gray-600">{item.name}</td>
                <td className="px-6 py-4 text-gray-600">{item.region}</td>
                <td className="px-6 py-4 text-gray-600">{item.sync}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                    item.status === 'Critical' ? 'bg-red-100 text-red-600' : 
                    item.status === 'Stable' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
