"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Eviter le mismatch côté serveur (hydration)
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="fixed bottom-8 right-8 z-50 w-12 h-12 opacity-0" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed bottom-8 right-8 z-[100] p-3 rounded-full bg-white dark:bg-gray-800 text-slate-900 dark:text-gray-100 shadow-xl border border-gray-200 dark:border-gray-700 hover:scale-110 hover:shadow-2xl transition-all duration-300 backdrop-blur-md"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-6 h-6" />
      ) : (
        <Moon className="w-6 h-6" />
      )}
    </button>
  );
}
