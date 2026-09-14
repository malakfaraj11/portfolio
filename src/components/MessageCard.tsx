'use client';

import { useState } from 'react';
import { Trash2, Calendar, User, AlignLeft, ChevronDown, ChevronUp } from 'lucide-react';

export default function MessageCard({ msg, onDelete }: { msg: any; onDelete: (formData: FormData) => void }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-[#161618] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
      {/* Header / Summary */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-6 cursor-pointer flex flex-col md:flex-row justify-between md:items-center gap-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
      >
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
            {msg.subject}
          </h3>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-gray-400 font-mono">
            <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {msg.name}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(msg.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-2 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-gray-300 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
          >
            {isExpanded ? (
              <>Fermer <ChevronUp className="w-4 h-4" /></>
            ) : (
              <>Voir les détails <ChevronDown className="w-4 h-4" /></>
            )}
          </button>
          
          <form action={onDelete}>
            <input type="hidden" name="id" value={msg.id} />
            <button type="submit" className="text-red-500 hover:text-white bg-red-500/10 hover:bg-red-500 p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-bold">
              <Trash2 className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
      
      {/* Expanded Content */}
      <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="p-6 pt-0 border-t border-slate-100 dark:border-white/5 mt-2 bg-slate-50/50 dark:bg-[#161618]/50">
          <div className="mb-6 flex flex-col gap-1">
            <span className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest">Informations de contact</span>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-slate-900 dark:text-white">Nom : <span className="font-normal text-slate-600 dark:text-gray-400">{msg.name}</span></span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">Email : <a href={`mailto:${msg.email}`} className="font-normal text-fuchsia-500 hover:underline">{msg.email}</a></span>
            </div>
          </div>
          
          <div>
            <span className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest mb-2 block">Message</span>
            <div className="bg-white dark:bg-[#0f0f11] p-6 rounded-xl border border-slate-200 dark:border-white/5">
              <p className="text-slate-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed flex items-start gap-3">
                <AlignLeft className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                {msg.message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
