
import React from 'react';
import { WasteInfo } from '../types';

interface ResultCardProps {
  result: WasteInfo;
  onReset: () => void;
  aiNote?: { reason: string; tip: string };
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onReset, aiNote }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-300">
      <div 
        className="p-8 text-center"
        style={{ backgroundColor: result.colorHex + '15' }}
      >
        <div className="text-6xl mb-4">{result.icon}</div>
        <h2 className="text-2xl font-bold text-slate-800">{result.category}</h2>
        <div 
          className="inline-block mt-2 px-4 py-1 rounded-full text-white font-bold text-sm uppercase tracking-wide"
          style={{ backgroundColor: result.colorHex }}
        >
          {result.binColor}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {aiNote && (
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
             <p className="text-sm font-semibold text-blue-800 mb-1">AI Analysis</p>
             <p className="text-sm text-blue-700 mb-2">{aiNote.reason}</p>
             <div className="flex gap-2 items-start text-sm text-blue-800 italic">
               <span className="text-lg">💡</span>
               <span>{aiNote.tip}</span>
             </div>
          </div>
        )}

        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Disposal Instructions</h3>
          <ul className="space-y-3">
            {result.instructions.map((inst, idx) => (
              <li key={idx} className="flex gap-3 items-start">
                <span className="mt-1 flex-shrink-0 w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-500">
                  {idx + 1}
                </span>
                <span className="text-slate-600 text-sm">{inst}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={onReset}
          className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
        >
          Sort Another Item
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
