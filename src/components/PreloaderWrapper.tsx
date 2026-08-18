"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./Preloader";
import { ReactLenis } from '@studio-freight/react-lenis';

export default function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
  }, []);

  const handleComplete = () => {
    setIsLoading(false);
    document.body.style.overflow = "";
  };

  return (
    <ReactLenis root>
      <AnimatePresence>
        {isLoading && <Preloader onComplete={handleComplete} />}
      </AnimatePresence>
      {/* On affiche le contenu du site en dessous (caché visuellement par le preloader au début) */}
      {children as any}
    </ReactLenis>
  );
}
