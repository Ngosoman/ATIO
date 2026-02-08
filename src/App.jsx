
import React, { useState } from 'react';
import Layout from './components/Layout.jsx';
import DecisionForm from './components/DecisionForm.jsx';
import DecisionResults from './components/DecisionResults.jsx';
import { generateRecommendations } from './services/geminiService.js';
import { Info, Sprout, Search } from 'lucide-react';
import { THEME } from './constants.jsx';

const App = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const recommendations = await generateRecommendations(data);
      setResults(recommendations);
      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError('An error occurred while generating recommendations. Please check your connection and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-800 text-xs font-bold uppercase tracking-widest">
            <Sprout className="w-4 h-4" />
            Decision Intelligence Engine
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 max-w-4xl mx-auto leading-tight">
            Transform Agrifood Data into <span style={{ color: THEME.primary }}>Context-Aware Action</span>.
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Supporting policymakers, NGOs, and extension officers in making evidence-based decisions, 
            even with incomplete information.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-gray-400">
            <span className="flex items-center gap-1"><Search className="w-3 h-3" /> Context-Aware Scoping</span>
            <span className="flex items-center gap-1"><Info className="w-3 h-3" /> FAO ATIO Aligned</span>
            <span className="flex items-center gap-1">🟢 Deploy-Ready Logic</span>
          </div>
        </section>

        {/* Input Form Section */}
        <section className="max-w-4xl mx-auto">
          <DecisionForm onSubmit={handleFormSubmit} isLoading={loading} />
        </section>

        {/* Error State */}
        {error && (
          <div className="max-w-4xl mx-auto p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-center font-medium">
            {error}
          </div>
        )}

        {/* Results Section */}
        {results && (
          <section id="results-section" className="scroll-mt-24 max-w-5xl mx-auto">
            <DecisionResults results={results} />
          </section>
        )}

        {/* Initial Helper / Placeholder if no results */}
        {!results && !loading && (
          <section className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 opacity-60">
            {[
              { title: "Define Context", desc: "Select your persona and local geography to calibrate the engine." },
              { title: "Input Constraints", desc: "Specify budget, literacy, and gender focus to filter feasibility." },
              { title: "Get Evidence", desc: "Receive action-oriented recommendations with ACS scoring." }
            ].map((step, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-dashed border-gray-300">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-black text-gray-400 mb-4">{i + 1}</div>
                <h4 className="font-bold text-gray-800 mb-2">{step.title}</h4>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </Layout>
  );
};

export default App;
