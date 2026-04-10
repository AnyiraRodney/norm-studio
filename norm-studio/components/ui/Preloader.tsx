"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Keeps the preloader on screen for 1.8 seconds to allow images/fonts to load
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          exit={{ opacity: 0 }} 
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#2D2926]"
        >
          <motion.div 
            animate={{ opacity: [0.3, 1, 0.3] }} 
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-cormorant text-5xl text-[#FDF9F3] uppercase tracking-widest font-bold">Norm</span>
            <span className="font-satoshi text-[10px] text-[#FDF9F3]/50 uppercase tracking-[0.4em]">Studio</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}