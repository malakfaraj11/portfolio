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

    const duration = 2500; // Minimum 2.5 seconds pour admirer le loader

    const animate = (time: number) => {
      let elapsed = time - start;
      let targetProgress = 0;
      
      if (isLoaded) {
         // Smoothly reach 100 over exactly 'duration'
         targetProgress = Math.min((elapsed / duration) * 100, 100);
      } else {
         // If not loaded, don't exceed 95%
         targetProgress = Math.min((elapsed / duration) * 100, 95);
      }

      if (targetProgress >= 100) {
         setProgress(100);
         setTimeout(() => setIsFinished(true), 400); // Petite pause magique à 100%
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
      }, 1000); // Temps pour l'animation de sortie
      return () => clearTimeout(t);
    }
  }, [isFinished, onComplete]);

  // Messages changeant selon le progrès
  const getMessage = () => {
    if (progress < 30) return "INITIALISATION...";
    if (progress < 60) return "CHARGEMENT DES RESSOURCES";
    if (progress < 90) return "PRÉPARATION DU PORTFOLIO";
    return "PRÊT";
  };

  return (
    <AnimatePresence mode="wait">
      {!isFinished && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Background subtle glowing orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-fuchsia-600/10 rounded-full blur-[100px]" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Percentage */}
            <div className="overflow-hidden mb-2">
              <motion.div 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                className="text-7xl md:text-9xl font-black text-white tracking-tighter"
              >
                {Math.floor(progress)}<span className="text-3xl md:text-5xl text-fuchsia-500 ml-2">%</span>
              </motion.div>
            </div>
            
            {/* Elegant Progress Line */}
            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              className="w-64 md:w-96 h-[2px] bg-white/10 rounded-full overflow-hidden mt-6 mb-8 relative"
            >
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-fuchsia-500 to-purple-500 shadow-[0_0_15px_rgba(217,70,239,0.6)]"
                style={{ width: `${progress}%` }}
              />
            </motion.div>

            {/* Dynamic Status Text */}
            <div className="h-6 overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={getMessage()}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-white/50 uppercase font-bold"
                >
                  {getMessage()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
