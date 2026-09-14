import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[100dvh] flex flex-col md:flex-row overflow-hidden relative">
      {/* Sidebar */}
      <aside className="w-full md:w-64 h-auto md:h-full shrink-0 bg-white/70 dark:bg-[#0f0f11]/80 backdrop-blur-xl border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/5 flex flex-col z-20">
        <div className="p-4 md:p-6 border-b border-slate-200 dark:border-white/5 flex justify-between items-center">
          <h2 className="text-lg md:text-xl font-black bg-gradient-to-r from-blue-600 to-fuchsia-500 bg-clip-text text-transparent uppercase tracking-wider">Portfolio Admin</h2>
          <Link
            href="/"
            className="md:hidden text-[10px] font-mono tracking-widest text-blue-600 dark:text-blue-400 hover:text-fuchsia-500 dark:hover:text-fuchsia-400 border border-blue-500/20 px-2 py-1 rounded"
          >
            QUITTER
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-2 md:py-6 space-y-0 md:space-y-2 flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-2 md:gap-0 no-scrollbar">
          <Link
            href="/admin"
            className="whitespace-nowrap px-4 py-2 md:py-3 rounded-lg text-sm font-bold text-slate-600 dark:text-gray-300 hover:bg-white dark:hover:bg-white/10 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors"
          >
            Profil & Vision
          </Link>
          <Link
            href="/admin/certifications"
            className="whitespace-nowrap px-4 py-2 md:py-3 rounded-lg text-sm font-bold text-slate-600 dark:text-gray-300 hover:bg-white dark:hover:bg-white/10 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors"
          >
            Certifications
          </Link>
          <Link
            href="/admin/experience"
            className="whitespace-nowrap px-4 py-2 md:py-3 rounded-lg text-sm font-bold text-slate-600 dark:text-gray-300 hover:bg-white dark:hover:bg-white/10 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors"
          >
            Parcours
          </Link>
          <Link
            href="/admin/projects"
            className="whitespace-nowrap px-4 py-2 md:py-3 rounded-lg text-sm font-bold text-slate-600 dark:text-gray-300 hover:bg-white dark:hover:bg-white/10 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors"
          >
            Projets
          </Link>
          <Link
            href="/admin/messages"
            className="whitespace-nowrap px-4 py-2 md:py-3 rounded-lg text-sm font-bold text-slate-600 dark:text-gray-300 hover:bg-white dark:hover:bg-white/10 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors"
          >
            Messagerie
          </Link>
        </nav>
        
        <div className="hidden md:block p-6 border-t border-slate-200 dark:border-white/5">
          <Link
            href="/"
            className="text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 hover:text-fuchsia-500 dark:hover:text-fuchsia-400 block mb-6 transition-colors"
          >
            &larr; RETOUR PUBLIC
          </Link>
          <form action={async () => {
            'use server';
            const { logout } = await import('@/actions/auth');
            await logout();
          }}>
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
