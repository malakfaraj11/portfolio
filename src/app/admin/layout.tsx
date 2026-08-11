import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Portfolio Admin</h2>
        </div>
        <nav className="mt-6">
          <Link
            href="/admin/projects"
            className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            Projets
          </Link>
          <Link
            href="/admin/certificates"
            className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            Certifications
          </Link>
          <div className="mt-8 px-6">
            <Link
              href="/"
              className="text-sm text-blue-600 hover:underline block mb-4"
            >
              &larr; Retour au site public
            </Link>
            <form action={async () => {
              'use server';
              const { logout } = await import('@/actions/auth');
              await logout();
            }}>
              <button 
                type="submit"
                className="text-sm text-red-600 hover:underline"
              >
                Déconnexion
              </button>
            </form>
          </div>
        </nav>
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
