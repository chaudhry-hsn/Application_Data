
import React, { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, Cell, LabelList, Label } from 'recharts';
import { Stakeholder } from '../types';

interface StakeholdersViewProps {
  stakeholders: Stakeholder[];
  onRegenerate: () => void;
  isProcessing: boolean;
}

const StakeholdersView: React.FC<StakeholdersViewProps> = ({ stakeholders, onRegenerate, isProcessing }) => {
  const chartData = useMemo(() => {
    return stakeholders.map(s => ({
      x: s.interest,
      y: s.influence,
      name: s.name,
      id: s.id,
      category: s.category
    }));
  }, [stakeholders]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl border border-slate-700 text-xs">
          <p className="font-bold border-b border-slate-700 pb-1 mb-1">{data.name}</p>
          <p>Interest: {data.x}</p>
          <p>Influence: {data.y}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">STAKEHOLDER MATRIX</h2>
            <p className="text-slate-500 font-medium">Power vs. Interest Quadrants</p>
          </div>
          <button 
            onClick={onRegenerate}
            disabled={isProcessing}
            className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm"
          >
            Refine Analysis
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[500px] flex flex-col">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Engagement Grid</h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
                  <XAxis 
                    type="number" 
                    dataKey="x" 
                    name="interest" 
                    domain={[0, 11]} 
                    tickCount={11}
                    stroke="#94a3b8"
                    fontSize={10}
                  >
                    <Label value="Interest level" position="insideBottom" offset={-20} style={{ fill: '#64748b', fontWeight: 600, fontSize: 12 }} />
                  </XAxis>
                  <YAxis 
                    type="number" 
                    dataKey="y" 
                    name="influence" 
                    domain={[0, 11]} 
                    tickCount={11}
                    stroke="#94a3b8"
                    fontSize={10}
                  >
                    <Label value="Power / Influence" angle={-90} position="insideLeft" style={{ fill: '#64748b', fontWeight: 600, fontSize: 12 }} />
                  </YAxis>
                  <Tooltip content={<CustomTooltip />} />
                  <Scatter name="Stakeholders" data={chartData} fill="#8884d8">
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={
                          entry.x > 5 && entry.y > 5 ? '#ef4444' : // Manage Closely
                          entry.x > 5 && entry.y <= 5 ? '#3b82f6' : // Keep Informed
                          entry.x <= 5 && entry.y > 5 ? '#f59e0b' : // Keep Satisfied
                          '#94a3b8' // Monitor
                        } 
                      />
                    ))}
                    <LabelList dataKey="name" position="top" style={{ fontSize: '10px', fill: '#1e293b', fontWeight: 600 }} />
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="text-[10px] flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"></span> Manage Closely (H Power/H Interest)</div>
              <div className="text-[10px] flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Keep Satisfied (H Power/L Interest)</div>
              <div className="text-[10px] flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Keep Informed (L Power/H Interest)</div>
              <div className="text-[10px] flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-400"></span> Monitor (L Power/L Interest)</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col overflow-hidden">
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Strategic Engagement</h3>
             <div className="overflow-y-auto space-y-4 flex-1 pr-2">
                {stakeholders.map((s) => (
                  <div key={s.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-blue-200 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-slate-900">{s.name}</h4>
                        <p className="text-xs text-slate-500 font-medium">{s.role} • {s.category}</p>
                      </div>
                      <div className="flex gap-1">
                        <span className="px-2 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] font-bold">PWR: {s.influence}</span>
                        <span className="px-2 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] font-bold">INT: {s.interest}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 mb-2 leading-relaxed"><span className="font-bold text-slate-800 uppercase text-[9px]">Expectation:</span> {s.expectations}</p>
                    <div className="bg-blue-600 text-white p-2 rounded-lg text-[10px] font-medium leading-relaxed">
                      <span className="opacity-70 uppercase tracking-tighter">Engagement Strategy:</span> {s.strategy}
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-slate-800">Stakeholder Register Detail</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Influence</th>
                  <th className="px-6 py-4">Interest</th>
                  <th className="px-6 py-4">Quadrant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stakeholders.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">{s.name}</td>
                    <td className="px-6 py-4 text-slate-500">{s.role}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${s.category === 'Internal' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                        {s.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full" style={{ width: `${s.influence * 10}%` }}></div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full" style={{ width: `${s.interest * 10}%` }}></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold uppercase tracking-tighter">
                      {s.interest > 5 && s.influence > 5 ? 'Manage' : s.influence > 5 ? 'Satisfy' : s.interest > 5 ? 'Inform' : 'Monitor'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakeholdersView;
