
import React, { useState } from 'react';
import { THEME } from '../constants.jsx';
import RadarChartComponent from './RadarChartComponent.jsx';
import { CheckCircle2, AlertTriangle, ArrowRight, User, Database, ChevronDown, ChevronUp, FileText } from 'lucide-react';

const DecisionResults = ({ results }) => {
  const [expandedId, setExpandedId] = useState(null);

  const getConfidenceColor = (level) => {
    switch (level.toLowerCase()) {
      case 'high': return THEME.success;
      case 'medium': return THEME.warning;
      case 'low': return THEME.danger;
      default: return '#999';
    }
  };

  const getConfidenceLabel = (level) => {
    switch (level.toLowerCase()) {
      case 'high': return 'Deploy / Scale';
      case 'medium': return 'Pilot / Validate';
      case 'low': return 'Policy Support Needed';
      default: return level;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Recommended Innovations</h2>
        <div className="text-sm font-medium text-gray-500">
          Found {results.length} Evidence-Based Actions
        </div>
      </div>

      <div className="grid gap-6">
        {results.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Visual Section */}
                <div className="w-full md:w-1/3 flex flex-col items-center">
                  <div className="relative mb-4">
                    <RadarChartComponent scores={item.scores} />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center bg-white/80 backdrop-blur-sm p-2 rounded-full border shadow-sm">
                        <span className="text-2xl font-black" style={{ color: getConfidenceColor(item.confidenceLevel) }}>
                          {item.acs}
                        </span>
                        <p className="text-[8px] uppercase font-bold text-gray-500">ACS Score</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full px-4 py-2 rounded-lg text-center font-bold text-sm" style={{ backgroundColor: `${getConfidenceColor(item.confidenceLevel)}20`, color: getConfidenceColor(item.confidenceLevel) }}>
                    {getConfidenceLabel(item.confidenceLevel)}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        Key Drivers
                      </div>
                      <ul className="space-y-1">
                        {item.reasons.map((r, i) => (
                          <li key={i} className="text-sm text-gray-700 flex gap-2">
                            <span className="text-green-500 font-bold">•</span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                        <Database className="w-4 h-4 text-orange-500" />
                        Uncertainty & Data Gaps
                      </div>
                      <ul className="space-y-1">
                        {item.dataGaps.map((g, i) => (
                          <li key={i} className="text-sm text-gray-700 flex gap-2 italic">
                            <span className="text-orange-400 font-bold">!</span>
                            {g}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500">Beneficiaries:</span>
                      {item.beneficiaries.map(b => (
                        <span key={b} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="bg-gray-50 p-4 px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400">Recommended Next Step</p>
                  <p className="text-sm font-bold text-gray-800">{item.nextAction}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setExpandedId(expandedId === idx ? null : idx)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  FAO ATIO Use Case
                  {expandedId === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* FAO Use Case Detail */}
            {expandedId === idx && (
              <div className="p-8 bg-green-50 border-t border-green-100 space-y-6 animate-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-1 bg-green-600 rounded"></div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-green-800">FAO ATIO Specification</h4>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-xs font-bold text-green-700 uppercase mb-2">Preconditions</h5>
                      <ul className="list-disc pl-4 text-sm text-gray-700 space-y-1">
                        {item.faoUseCase.preconditions.map((p, i) => <li key={i}>{p}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-green-700 uppercase mb-2">Basic Flow</h5>
                      <ol className="list-decimal pl-4 text-sm text-gray-700 space-y-1">
                        {item.faoUseCase.basicFlow.map((f, i) => <li key={i}>{f}</li>)}
                      </ol>
                    </div>
                  </div>
                  <div className="space-y-4">
                     <div>
                      <h5 className="text-xs font-bold text-green-700 uppercase mb-2">Alternative Flows</h5>
                      <ul className="list-disc pl-4 text-sm text-gray-700 space-y-1">
                        {item.faoUseCase.alternativeFlows.map((f, i) => <li key={i}>{f}</li>)}
                      </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-lg border border-green-200">
                        <h5 className="text-[10px] font-bold text-green-600 uppercase mb-1">Success Scenario</h5>
                        <p className="text-xs text-gray-600 leading-tight">{item.faoUseCase.successScenario}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-red-200">
                        <h5 className="text-[10px] font-bold text-red-600 uppercase mb-1">Failure Scenario</h5>
                        <p className="text-xs text-gray-600 leading-tight">{item.faoUseCase.failureScenario}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4">
        <div className="p-2 bg-blue-500 text-white rounded-lg h-fit">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-blue-900 text-sm">Human-in-the-loop Advisory</h4>
          <p className="text-sm text-blue-800 leading-relaxed mt-1">
            This AI engine supports evidence-based decision making but does not replace expert consultation. 
            All confidence scores are relative to the input context and available innovation data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DecisionResults;
