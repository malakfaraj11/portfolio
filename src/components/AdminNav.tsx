'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNav() {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Tableau de bord' },
    { href: '/admin/profile', label: 'Profil & Vision' },
    { href: '/admin/certifications', label: 'Certifications' },
    { href: '/admin/experience', label: 'Parcours' },
    { href: '/admin/projects', label: 'Projets' },
    { href: '/admin/messages', label: 'Messagerie' },
  ];

  return (
    <nav className="flex-1 px-4 py-2 md:py-6 space-y-0 md:space-y-2 flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-2 md:gap-0 no-scrollbar">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`whitespace-nowrap px-4 py-2 md:py-3 rounded-lg text-sm font-bold transition-colors ${
              isActive
                ? 'bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400'
                : 'text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-fuchsia-600 dark:hover:text-fuchsia-400'
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
