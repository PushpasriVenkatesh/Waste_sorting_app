
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
            ♻️
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">EcoSort</h1>
        </div>
        <div className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
          v1.0 Offline
        </div>
      </div>
    </header>
  );
};

export default Header;
