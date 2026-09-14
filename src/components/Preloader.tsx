"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isFinished, setIsFinished] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = performance.now();
    let isLoaded = document.readyState === 'complete';
    let animationFrameId: number;

    const onRealLoad = async () => {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
      isLoaded = true;
    };
    if (!isLoaded) {
      window.addEventListener('load', onRealLoad);
    } else {
      onRealLoad();
    }

    let localProgress = 0;

    const animate = (time: number) => {
      let elapsed = time - start;
      let targetProgress = 0;
      
      if (isLoaded) {
         targetProgress = localProgress + (100 - localProgress) * 0.15 + 2;
      } else {
         targetProgress = 90 * (1 - Math.exp(-elapsed / 2000));
      }

      localProgress = targetProgress;

      if (targetProgress >= 100) {
         setProgress(100);
         setTimeout(() => setIsFinished(true), 400); // Petite pause pour voir 100%
      } else {
         setProgress(targetProgress);
         animationFrameId = requestAnimationFrame(animate);
      }
    };
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('load', onRealLoad);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    if (isFinished) {
      const t = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(t);
    }
  }, [isFinished, onComplete]);

  return (
    <AnimatePresence mode="wait">
      {!isFinished && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-[#050505] overflow-hidden"
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center justify-center w-full max-w-md px-6">
            
            {/* PERSONALIZED TYPOGRAPHY */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl md:text-4xl font-black tracking-widest uppercase text-slate-900 dark:text-white mb-2">
                Malak Faraj
              </h1>
              <p className="text-xs font-medium tracking-[0.3em] uppercase text-slate-400 dark:text-gray-500">
                Portfolio Interactif
              </p>
            </motion.div>

            {/* PROGRESS BAR */}
            <div className="w-full flex items-center gap-4">
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white w-10 text-right">
                {Math.floor(progress)}%
              </span>
              
              <div className="flex-grow h-[2px] bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-slate-900 dark:bg-white rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
