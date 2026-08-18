import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex relative">
      {/* Sidebar */}
      <aside className="w-64 bg-white/70 dark:bg-[#0f0f11]/80 backdrop-blur-xl border-r border-slate-200 dark:border-white/5 flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-white/5">
          <h2 className="text-xl font-black bg-gradient-to-r from-blue-600 to-fuchsia-500 bg-clip-text text-transparent uppercase tracking-wider">Portfolio Admin</h2>
        </div>
        <nav className="flex-1 mt-6 px-4 space-y-2">
          <Link
            href="/admin"
            className="block px-4 py-3 rounded-lg text-sm font-bold text-slate-600 dark:text-gray-300 hover:bg-white dark:hover:bg-white/10 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors"
          >
            Profil & Vision
          </Link>
          <Link
            href="/admin/skills"
            className="block px-4 py-3 rounded-lg text-sm font-bold text-slate-600 dark:text-gray-300 hover:bg-white dark:hover:bg-white/10 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors"
          >
            Écosystème (Stack)
          </Link>
          <Link
            href="/admin/experience"
            className="block px-4 py-3 rounded-lg text-sm font-bold text-slate-600 dark:text-gray-300 hover:bg-white dark:hover:bg-white/10 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors"
          >
            Parcours
          </Link>
          <Link
            href="/admin/projects"
            className="block px-4 py-3 rounded-lg text-sm font-bold text-slate-600 dark:text-gray-300 hover:bg-white dark:hover:bg-white/10 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors"
          >
            Projets
          </Link>
        </nav>
        
        <div className="p-6 border-t border-slate-200 dark:border-white/5">
          <Link
            href="/"
            className="text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 hover:text-fuchsia-500 dark:hover:text-fuchsia-400 block mb-2 transition-colors"
          >
            &larr; RETOUR PUBLIC
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
