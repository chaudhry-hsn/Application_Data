
import React from 'react';
import { ProjectCharter } from '../types';

interface CharterViewProps {
  charter: ProjectCharter | null;
  onRegenerate: () => void;
  isProcessing: boolean;
}

const CharterView: React.FC<CharterViewProps> = ({ charter, onRegenerate, isProcessing }) => {
  if (!charter) return null;

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-end border-b-4 border-slate-900 pb-6">
          <div>
            <span className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-1 block">Project Initiation Document</span>
            <h1 className="text-4xl font-black text-slate-900 uppercase">{charter.projectName}</h1>
          </div>
          <button 
            onClick={onRegenerate}
            disabled={isProcessing}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium text-sm border-2 border-slate-200 px-4 py-2 rounded-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            Refresh Data
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-600 rounded"></span>
                Business Need & Context
              </h3>
              <p className="text-slate-600 leading-relaxed italic">{charter.businessNeed}</p>
            </section>

            <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-600 rounded"></span>
                Scope Statement
              </h3>
              <ul className="space-y-3">
                {charter.scope.map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">{i+1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-600 rounded"></span>
                High-Level Objectives
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {charter.objectives.map((obj, i) => (
                  <div key={i} className="p-4 bg-slate-50 border-l-4 border-blue-500 rounded-r-lg">
                    <p className="text-sm font-medium text-slate-700">{obj}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="bg-slate-900 text-white p-6 rounded-xl shadow-xl">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Success Criteria</h3>
              <ul className="space-y-3">
                {charter.successCriteria.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Risk Profile</h3>
              <ul className="space-y-3">
                {charter.risks.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-600">
                    <span className="text-amber-500 font-bold">!</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Assumptions</h3>
              <ul className="space-y-2">
                {charter.assumptions.map((item, i) => (
                  <li key={i} className="text-xs text-slate-500 italic">• {item}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharterView;
