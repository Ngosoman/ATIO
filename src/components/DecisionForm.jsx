
import React, { useState } from 'react';
import { UserPersona, ProblemArea, Level, DecisionGoal } from '../../types.js';
import { THEME, PERSONA_DESCRIPTIONS } from '../constants.jsx';
import { MapPin, Target, Settings, Briefcase, HelpCircle } from 'lucide-react';

const DecisionForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    persona: UserPersona.POLICY_MAKER,
    country: '',
    region: '',
    problemArea: ProblemArea.PRODUCTIVITY_GAPS,
    budget: Level.MEDIUM,
    literacy: Level.MEDIUM,
    connectivity: Level.MEDIUM,
    genderFocus: false,
    goal: DecisionGoal.PILOT,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? e.target.checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 md:p-8 space-y-8">
        {/* Section 1: User Context */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
            <Briefcase className="w-5 h-5" style={{ color: THEME.primary }} />
            <h2 className="text-lg font-bold text-gray-800">Who are you?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">User Persona</label>
              <select
                name="persona"
                value={formData.persona}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-3 bg-gray-50 border"
              >
                {Object.values(UserPersona).map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500 italic">
                {PERSONA_DESCRIPTIONS[formData.persona]}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Decision Goal</label>
              <select
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-3 bg-gray-50 border"
              >
                {Object.values(DecisionGoal).map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Geography & Problem */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
            <MapPin className="w-5 h-5" style={{ color: THEME.primary }} />
            <h2 className="text-lg font-bold text-gray-800">Geographic Context</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                type="text"
                name="country"
                required
                placeholder="e.g. Kenya"
                value={formData.country}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-3 bg-gray-50 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Region / Agro-zone</label>
              <input
                type="text"
                name="region"
                required
                placeholder="e.g. Semi-arid Rift Valley"
                value={formData.region}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-3 bg-gray-50 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Problem Area</label>
              <select
                name="problemArea"
                value={formData.problemArea}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-3 bg-gray-50 border"
              >
                {Object.values(ProblemArea).map(pa => (
                  <option key={pa} value={pa}>{pa}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Constraints */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
            <Settings className="w-5 h-5" style={{ color: THEME.primary }} />
            <h2 className="text-lg font-bold text-gray-800">Contextual Constraints</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
              <select name="budget" value={formData.budget} onChange={handleChange} className="w-full rounded-lg bg-gray-50 border px-2 py-2">
                {Object.values(Level).map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Literacy</label>
              <select name="literacy" value={formData.literacy} onChange={handleChange} className="w-full rounded-lg bg-gray-50 border px-2 py-2">
                {Object.values(Level).map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Connectivity</label>
              <select name="connectivity" value={formData.connectivity} onChange={handleChange} className="w-full rounded-lg bg-gray-50 border px-2 py-2">
                {Object.values(Level).map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="genderFocus"
                  checked={formData.genderFocus}
                  onChange={handleChange}
                  className="rounded text-green-600 focus:ring-green-500 w-5 h-5"
                />
                <span className="text-sm font-medium text-gray-700">Gender Focused?</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 border-t flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <HelpCircle className="w-4 h-4" />
          <span>Recommendations will be persona-weighted.</span>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all shadow-lg ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-700 hover:bg-green-800'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Analyzing Context...</span>
            </>
          ) : (
            <>
              <Target className="w-5 h-5" />
              <span>Generate Decision Matrix</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default DecisionForm;
