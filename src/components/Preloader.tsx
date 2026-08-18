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
         // Si c'est chargé, on accélère fortement pour finir vite de manière dynamique
         targetProgress = localProgress + (100 - localProgress) * 0.15 + 2;
      } else {
         // Si ça charge encore, on avance vers 90%
         targetProgress = 90 * (1 - Math.exp(-elapsed / 2000));
      }

      localProgress = targetProgress;

      if (targetProgress >= 100) {
         setProgress(100);
         setTimeout(() => setIsFinished(true), 200); // Petite pause magique à 100%
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
            {/* Creative Circular Percentage */}
            <div className="relative flex flex-col items-center justify-center w-64 h-64 md:w-80 md:h-80 mb-8">
              {/* Outer Glow */}
              <div className="absolute inset-0 rounded-full bg-fuchsia-500/5 blur-[50px] animate-pulse" />
              
              <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-[0_0_15px_rgba(217,70,239,0.3)]" viewBox="0 0 100 100">
                {/* Background Circle */}
                <circle cx="50" cy="50" r="46" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" fill="none" />
                
                {/* Animated Progress Circle */}
                <motion.circle 
                  cx="50" cy="50" r="46" 
                  stroke="url(#loaderGradient)" 
                  strokeWidth="2.5" 
                  fill="none" 
                  strokeDasharray="289.02" // 2 * PI * 46
                  strokeDashoffset={289.02 - (289.02 * progress) / 100}
                  strokeLinecap="round"
                />
                
                <defs>
                  <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d946ef" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Number inside */}
              <div className="relative flex flex-col items-center">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex items-start"
                >
                  <span className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter tabular-nums">
                    {Math.floor(progress)}
                  </span>
                  <span className="text-2xl md:text-4xl text-fuchsia-500 font-black mt-2 md:mt-3">%</span>
                </motion.div>
                
                {/* Dynamic Status Text inside circle */}
                <div className="h-4 overflow-hidden mt-2">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={getMessage()}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-[9px] md:text-[10px] font-mono tracking-[0.4em] text-fuchsia-300/70 uppercase font-bold text-center"
                    >
                      {getMessage()}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
