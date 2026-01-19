
import React, { useState } from 'react';
import { WASTE_TREE, WASTE_DATA } from '../constants';
import { WasteCategory, WasteInfo } from '../types';

interface WasteWizardProps {
  onResult: (result: WasteInfo) => void;
}

const WasteWizard: React.FC<WasteWizardProps> = ({ onResult }) => {
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [history, setHistory] = useState<string[]>([]);

  const currentNode = WASTE_TREE[currentNodeId];

  const handleOptionClick = (option: typeof currentNode.options[0]) => {
    if (option.result) {
      onResult(WASTE_DATA[option.result]);
    } else if (option.nextId) {
      setHistory([...history, currentNodeId]);
      setCurrentNodeId(option.nextId);
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setCurrentNodeId(prev);
      setHistory(history.slice(0, -1));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Step {history.length + 1}</span>
          {history.length > 0 && (
            <button 
              onClick={handleBack}
              className="text-xs font-medium text-green-600 hover:text-green-700 transition-colors"
            >
              ← Back
            </button>
          )}
        </div>
        <h2 className="text-xl font-semibold text-slate-800 leading-tight">
          {currentNode.question}
        </h2>
      </div>

      <div className="space-y-3">
        {currentNode.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionClick(option)}
            className="w-full text-left p-4 rounded-xl border-2 border-slate-100 hover:border-green-500 hover:bg-green-50 transition-all duration-200 group flex justify-between items-center"
          >
            <span className="font-medium text-slate-700 group-hover:text-green-800">{option.label}</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-green-600">→</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WasteWizard;
