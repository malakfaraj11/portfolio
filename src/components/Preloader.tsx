"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(1);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Phase 1 (Fenêtre IDE) -> Phase 2 (Typing)
    const t1 = setTimeout(() => setPhase(2), 600);
    // Phase 2 (Typing) -> Phase 3 (Plein écran)
    const t2 = setTimeout(() => setPhase(3), 2600);
    // Phase 3 (Plein écran) -> Fin (Disparition)
    const t3 = setTimeout(() => setIsFinished(true), 3400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    if (isFinished) {
      const t = setTimeout(() => {
        onComplete();
      }, 800); // Laisse le temps au fade-out
      return () => clearTimeout(t);
    }
  }, [isFinished, onComplete]);

  return (
    <AnimatePresence mode="wait">
      {!isFinished && (
        <motion.div
          key="preloader-bg"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            layout
            initial={{ scale: 0.8, opacity: 0, borderRadius: "12px", width: "90%", maxWidth: "600px", height: "auto" }}
            animate={
              phase === 3
                ? { scale: 1, opacity: 1, borderRadius: "0px", width: "100vw", height: "100vh", maxWidth: "100vw" }
                : { scale: 1, opacity: 1, borderRadius: "12px", width: "90%", maxWidth: "600px", height: "200px" }
            }
            transition={{
              duration: phase === 3 ? 0.7 : 0.5,
              ease: [0.76, 0, 0.24, 1]
            }}
            className="bg-[#0D1117] border border-gray-800 shadow-2xl shadow-blue-900/20 flex flex-col overflow-hidden"
          >
            {/* Window Header (Mac OS style) */}
            <motion.div 
              className="flex items-center gap-2 px-4 py-3 bg-[#161B22] border-b border-gray-800"
              animate={phase === 3 ? { opacity: 0, height: 0, padding: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <div className="ml-auto flex items-center text-xs text-gray-500 font-mono">
                portfolio.tsx
              </div>
            </motion.div>

            {/* Window Body (Code) */}
            <div className="flex-1 p-6 font-mono text-sm md:text-base flex items-center">
              {phase >= 2 && (
                <motion.div
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={phase === 3 ? { opacity: 0 } : { clipPath: "inset(0 0 0 0)" }}
                  transition={{ 
                    clipPath: { duration: 1.5, ease: "linear" },
                    opacity: { duration: 0.3 }
                  }}
                  className="whitespace-nowrap relative pr-2"
                >
                  <span className="text-gray-400">{'<'}</span>
                  <span className="text-blue-400 font-medium">Portfolio</span>
                  <span className="text-gray-200"> </span>
                  <span className="text-cyan-300">developer</span>
                  <span className="text-gray-400">=</span>
                  <span className="text-orange-300">"Malak"</span>
                  <span className="text-gray-200"> </span>
                  <span className="text-cyan-300">status</span>
                  <span className="text-gray-400">=</span>
                  <span className="text-orange-300">"Ready"</span>
                  <span className="text-gray-200"> </span>
                  <span className="text-gray-400">{'/>'}</span>
                  
                  {/* Cursor */}
                  {phase === 2 && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="absolute right-0 top-0 bottom-0 w-[2px] bg-blue-400"
                    />
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
