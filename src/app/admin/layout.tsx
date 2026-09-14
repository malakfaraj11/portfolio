import Link from 'next/link';
import AdminNav from '@/components/AdminNav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-dvh flex flex-col md:flex-row overflow-hidden relative">
      {/* Sidebar */}
      <aside className="w-full md:w-64 shrink-0 bg-slate-50 dark:bg-[#0a0a0a] border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/10 flex flex-col z-20">
        <div className="p-4 md:p-6 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
          <h2 className="text-lg md:text-xl font-black text-slate-900 dark:text-white uppercase tracking-wider">Portfolio Admin</h2>
          <Link
            href="/"
            className="md:hidden text-[10px] font-mono tracking-widest text-blue-600 dark:text-blue-400 hover:text-fuchsia-500 dark:hover:text-fuchsia-400 border border-blue-500/20 px-2 py-1 rounded"
          >
            QUITTER
          </Link>
        </div>
        
        {/* Navigation */}
        <AdminNav />
        
        <div className="p-4 md:p-6 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-col flex-row justify-between md:justify-start items-center md:items-stretch gap-4 md:gap-0">
          <Link
            href="/"
            className="hidden md:block text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 hover:text-fuchsia-500 dark:hover:text-fuchsia-400 mb-6 transition-colors"
          >
            &larr; RETOUR PUBLIC
          </Link>
          <form action={async () => {
            'use server';
            const { logout } = await import('@/actions/auth');
            await logout();
          }} className="w-full">
            <button 
              type="submit"
              className="w-full py-2 px-4 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-bold hover:bg-red-500/20 transition-colors border border-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Déconnexion
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto pb-20 md:pb-0">
          {children}
        </div>
      </main>
    </div>
  );
}
