
import React from 'react';
import { AppView, PMModule } from '../types';

interface SidebarProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  activeModule: PMModule;
  setActiveModule: (module: PMModule) => void;
  hasCharter: boolean;
  hasStakeholders: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeView, 
  setActiveView, 
  activeModule, 
  setActiveModule,
  hasCharter,
  hasStakeholders
}) => {
  return (
    <div className="w-72 bg-slate-900 text-white flex flex-col h-full shadow-2xl z-20">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="bg-blue-600 p-1.5 rounded-lg">PM</span>
          Launchpad Pro
        </h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">Strategic Advisor</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-8">
        <div>
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Primary Modules</h2>
          <nav className="space-y-1">
            <button
              onClick={() => { setActiveModule(PMModule.INITIATION); setActiveView(AppView.CHAT); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                activeModule === PMModule.INITIATION && activeView === AppView.CHAT
                ? 'bg-blue-600 text-white' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
              <span>Project Initiation</span>
            </button>
            <button
              onClick={() => { setActiveModule(PMModule.STAKEHOLDERS); setActiveView(AppView.CHAT); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                activeModule === PMModule.STAKEHOLDERS && activeView === AppView.CHAT
                ? 'bg-blue-600 text-white' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              <span>Stakeholder Analysis</span>
            </button>
          </nav>
        </div>

        <div>
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Deliverables</h2>
          <nav className="space-y-1">
            <button
              disabled={!hasCharter}
              onClick={() => setActiveView(AppView.CHARTER)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                !hasCharter ? 'opacity-30 cursor-not-allowed' : ''
              } ${
                activeView === AppView.CHARTER
                ? 'bg-emerald-600 text-white' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              <span>Project Charter</span>
            </button>
            <button
              disabled={!hasStakeholders}
              onClick={() => setActiveView(AppView.STAKEHOLDERS)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                !hasStakeholders ? 'opacity-30 cursor-not-allowed' : ''
              } ${
                activeView === AppView.STAKEHOLDERS
                ? 'bg-emerald-600 text-white' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"></path></svg>
              <span>Stakeholder Register</span>
            </button>
          </nav>
        </div>
      </div>

      <div className="p-4 bg-slate-950/50">
        <div className="flex items-center gap-3 p-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-xs">PM</div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium truncate text-slate-200">Senior Lead PM</p>
            <p className="text-xs text-slate-500 truncate">Consultant Mode</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
