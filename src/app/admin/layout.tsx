import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#f0f4f8] via-[#e2e8f0] to-[#d9e2ec] dark:from-[#060C21] dark:via-[#091330] dark:to-[#020510] text-slate-900 dark:text-gray-100 relative selection:bg-fuchsia-500/30 overflow-hidden">
      
      {/* Ambient Complex Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-400/30 dark:bg-blue-600/15 blur-[140px]" />
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-300/40 dark:bg-cyan-800/15 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-indigo-300/30 dark:bg-indigo-900/15 blur-[100px]" />
        
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay" 
          style={{ 
            backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" 
          }} 
        />
      </div>

      {/* Sidebar */}
      <aside className="w-64 bg-white/70 dark:bg-[#0f0f11]/80 backdrop-blur-xl border-r border-slate-200 dark:border-white/5 flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-white/5">
          <h2 className="text-xl font-black bg-gradient-to-r from-blue-600 to-fuchsia-500 bg-clip-text text-transparent uppercase tracking-wider">Portfolio Admin</h2>
        </div>
        <nav className="flex-1 mt-6 px-4 space-y-2">
          <Link
            href="/admin/projects"
            className="block px-4 py-3 rounded-lg text-sm font-bold text-slate-600 dark:text-gray-300 hover:bg-white dark:hover:bg-white/10 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors"
          >
            Projets
          </Link>
          <Link
            href="/admin/certificates"
            className="block px-4 py-3 rounded-lg text-sm font-bold text-slate-600 dark:text-gray-300 hover:bg-white dark:hover:bg-white/10 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors"
          >
            Certifications
          </Link>
        </nav>
        
        <div className="p-6 border-t border-slate-200 dark:border-white/5">
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
              className="w-full py-2 px-4 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-bold hover:bg-red-500/20 transition-colors border border-red-500/20"
            >
              Déconnexion
            </button>
          </form>
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
