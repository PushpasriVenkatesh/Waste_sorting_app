
import React, { useState } from 'react';
import Header from './components/Header';
import WasteWizard from './components/WasteWizard';
import ResultCard from './components/ResultCard';
import SmartSearch from './components/SmartSearch';
import { WasteInfo } from './types';

const App: React.FC = () => {
  const [result, setResult] = useState<WasteInfo | null>(null);
  const [aiNote, setAiNote] = useState<{ reason: string; tip: string } | undefined>(undefined);
  const [mode, setMode] = useState<'wizard' | 'search'>('wizard');

  const handleResult = (info: WasteInfo, note?: { reason: string; tip: string }) => {
    setResult(info);
    setAiNote(note);
  };

  const handleReset = () => {
    setResult(null);
    setAiNote(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-md mx-auto w-full px-4 py-8">
        {!result ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Sorting made <span className="text-green-600">simple</span>.
              </h2>
              <p className="text-slate-500 leading-relaxed">
                Choose a method to identify your waste and dispose of it responsibly.
              </p>
            </div>

            <div className="flex p-1 bg-slate-200 rounded-xl">
              <button
                onClick={() => setMode('wizard')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${
                  mode === 'wizard' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'
                }`}
              >
                Offline Wizard
              </button>
              <button
                onClick={() => setMode('search')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${
                  mode === 'search' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'
                }`}
              >
                Smart Search
              </button>
            </div>

            {mode === 'wizard' ? (
              <WasteWizard onResult={handleResult} />
            ) : (
              <SmartSearch onResult={handleResult} />
            )}

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
                <div className="text-2xl mb-1">🌿</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Impact</div>
                <div className="text-lg font-bold text-slate-800">12kg Saved</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center">
                <div className="text-2xl mb-1">⭐</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Level</div>
                <div className="text-lg font-bold text-slate-800">Pro Sorter</div>
              </div>
            </div>
          </div>
        ) : (
          <ResultCard result={result} onReset={handleReset} aiNote={aiNote} />
        )}
      </main>

      <footer className="py-8 border-t border-slate-100">
        <div className="max-w-md mx-auto px-4 text-center space-y-2">
          <p className="text-xs text-slate-400 font-medium">
            &copy; 2024 Smart Waste Sorting Assistant
          </p>
          <p className="text-[10px] text-slate-400 leading-relaxed px-8">
            Privacy First: No camera required. Your data never leaves this device unless using the experimental AI search.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
