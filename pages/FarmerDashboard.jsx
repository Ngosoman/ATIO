
import React from 'react';

export const FarmerDashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-forest-green mb-2">Welcome Back, Farmer! 🌾</h1>
        <p className="text-gray-600">Here are your current crop insights and market trends.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold text-lg">Local Weather</h3>
            <span className="text-3xl">☀️</span>
          </div>
          <div className="text-4xl font-bold text-gray-800 mb-2">28°C</div>
          <p className="text-sm text-gray-500">Perfect for planting maize today. No rain expected.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold text-lg">Market Prices</h3>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">+4%</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Maize</span>
              <span className="font-bold">$420/ton</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Wheat</span>
              <span className="font-bold">$310/ton</span>
            </div>
          </div>
        </div>

        <div className="bg-forest-green text-white p-6 rounded-2xl shadow-lg md:col-span-2 lg:col-span-1">
          <h3 className="font-semibold text-lg mb-4">Daily Tip</h3>
          <p className="text-sm italic mb-4">"Rotate your maize with legumes to naturally enrich the soil with nitrogen and reduce fertilizer costs."</p>
          <button className="bg-maize-yellow text-forest-green font-bold text-sm px-4 py-2 rounded-lg hover:brightness-110 transition-all">
            Read techniques
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-6">Your Production Timeline</h2>
        <div className="flex items-center justify-between relative px-4">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0"></div>
          {['Seedling', 'Growth', 'Tasseling', 'Maturity', 'Harvest'].map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-md ${idx < 3 ? 'bg-forest-green text-white' : 'bg-gray-200 text-gray-400'}`}>
                {idx < 2 ? '✓' : idx + 1}
              </div>
              <span className={`text-[10px] md:text-xs mt-2 font-medium ${idx < 3 ? 'text-forest-green' : 'text-gray-400'}`}>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
