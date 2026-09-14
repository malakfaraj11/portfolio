export default function Loading() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center bg-white dark:bg-[#050505]">
      <div className="flex flex-col items-center gap-6 transition-opacity duration-500">
        <div className="relative flex items-center justify-center w-12 h-12">
          {/* Subtle background ring */}
          <div className="absolute inset-0 border-2 border-slate-100 dark:border-white/5 rounded-full" />
          {/* Elegant spinning ring */}
          <div className="absolute inset-0 border-2 border-slate-900 dark:border-white border-t-transparent dark:border-t-transparent rounded-full animate-spin" />
        </div>
        
        {/* Minimalist typography */}
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-slate-400 dark:text-gray-500 animate-pulse">
          Chargement
        </p>
      </div>
    </div>
  );
}
