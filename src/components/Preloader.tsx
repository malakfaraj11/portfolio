"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { CodeXml } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(1);

  useEffect(() => {
    // Phase 1 (Marquee) -> Phase 2 (Grid)
    const t1 = setTimeout(() => setPhase(2), 1200);
    // Phase 2 (Grid) -> Phase 3 (Circle Reveal)
    const t2 = setTimeout(() => setPhase(3), 2000);
    // Fin du preloader
    const t3 = setTimeout(() => onComplete(), 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950 text-white overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <AnimatePresence mode="wait">
        {/* PHASE 1: Marquee */}
        {phase === 1 && (
          <motion.div
            key="phase1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center w-full"
          >
            <div className="flex gap-4 text-5xl md:text-7xl font-black tracking-tighter whitespace-nowrap overflow-hidden">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="flex gap-8"
              >
                <span>FRONTEND • UI/UX • CREATIVE • FRONTEND • UI/UX • CREATIVE •</span>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* PHASE 2: Bento Grid Skeleton */}
        {phase === 2 && (
          <motion.div
            key="phase2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-3 grid-rows-3 gap-2 w-64 h-64 md:w-80 md:h-80"
          >
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.2] }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={cn(
                  "border border-white/20 rounded-lg",
                  i === 4 ? "bg-white/20" : "" // Highlight center cell
                )}
              />
            ))}
          </motion.div>
        )}

        {/* PHASE 3: Code Tag to Massive Reveal */}
        {phase === 3 && (
          <motion.div
            key="phase3"
            className="relative flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180, borderRadius: "20%" }}
              animate={{ 
                scale: [0, 1, 1, 50], 
                rotate: 0, 
                borderRadius: ["20%", "50%", "50%", "50%"] 
              }}
              transition={{ 
                duration: 1, 
                ease: "easeInOut", 
                times: [0, 0.4, 0.6, 1] 
              }}
              className="absolute w-24 h-24 bg-white flex items-center justify-center"
            >
              <motion.div
                 initial={{ opacity: 1 }}
                 animate={{ opacity: 0 }}
                 transition={{ delay: 0.5 }}
              >
                <CodeXml className="w-10 h-10 text-gray-950" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
