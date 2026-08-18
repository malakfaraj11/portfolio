"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { Code2, User, Briefcase, Mail } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
    return null;
  }

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="flex items-center gap-1 md:gap-4 px-4 py-2 bg-white/70 dark:bg-[#161618]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-full shadow-lg">
        
        <Link href="/" className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black font-bold mr-2 hover:scale-105 transition-transform">
          W
        </Link>

        <div className="hidden md:flex items-center gap-6 px-4 text-sm font-medium text-slate-600 dark:text-gray-300">
          <Link href="/#about" className="hover:text-fuchsia-500 transition-colors">Accueil</Link>
          <Link href="/projects" className="hover:text-fuchsia-500 transition-colors">Projets</Link>
          <Link href="/#journey" className="hover:text-fuchsia-500 transition-colors">Parcours</Link>
          <Link href="#contact" className="hover:text-fuchsia-500 transition-colors">Contact</Link>
        </div>

        {/* Mobile Icons */}
        <div className="flex md:hidden items-center gap-4 px-2 text-slate-600 dark:text-gray-300">
          <Link href="/#about"><User className="w-5 h-5" /></Link>
          <Link href="/projects"><Code2 className="w-5 h-5" /></Link>
          <Link href="/#journey"><Briefcase className="w-5 h-5" /></Link>
        </div>

        <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-2" />

        <ThemeToggle />
        
        <Link 
          href="/cv.pdf" 
          target="_blank"
          className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full text-sm font-bold hover:bg-fuchsia-500 dark:hover:bg-fuchsia-400 hover:text-white transition-all ml-2"
        >
          Resume
        </Link>
      </nav>
    </div>
  );
}
