
import React, { useState } from 'react';
import { identifyWasteViaAI } from '../services/geminiService';
import { WasteInfo, WasteCategory } from '../types';
import { WASTE_DATA } from '../constants';

interface SmartSearchProps {
  onResult: (result: WasteInfo, aiNote: { reason: string; tip: string }) => void;
}

const SmartSearch: React.FC<SmartSearchProps> = ({ onResult }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await identifyWasteViaAI(query);
      if (data && data.category) {
        const categoryKey = Object.entries(WasteCategory).find(([_, v]) => v === data.category)?.[1] as WasteCategory;
        onResult(WASTE_DATA[categoryKey || WasteCategory.DRY], {
          reason: data.reason,
          tip: data.tip
        });
      } else {
        setError("Could not classify this item. Try the wizard instead.");
      }
    } catch (err: any) {
      setError("AI Search failed. Check your connection or use the offline wizard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-100/50 p-4 rounded-2xl border border-slate-200">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type an item (e.g. 'Pizza box')"
          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 bg-white"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2 whitespace-nowrap shadow-sm"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            'AI Search'
          )}
        </button>
      </form>
      {error && <p className="mt-2 text-xs text-red-500 font-medium ml-2">{error}</p>}
      <p className="mt-2 text-[10px] text-slate-400 uppercase tracking-widest font-bold ml-1">
        ✨ Powered by Gemini AI (Requires Data)
      </p>
    </div>
  );
};

export default SmartSearch;
