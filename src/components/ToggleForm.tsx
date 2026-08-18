'use client';

import { useState } from 'react';

export default function ToggleForm({ title, children }: { title: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-[#151518] rounded-xl border border-slate-200 dark:border-white/10 mb-8 overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full p-6 text-left flex justify-between items-center hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
      >
        <h2 className="text-xl font-bold dark:text-white flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center text-sm">
            {isOpen ? '−' : '+'}
          </span>
          {title}
        </h2>
      </button>
      
      {isOpen && (
        <div className="p-6 pt-0 border-t border-slate-200 dark:border-white/5 mt-4">
          <div className="pt-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
