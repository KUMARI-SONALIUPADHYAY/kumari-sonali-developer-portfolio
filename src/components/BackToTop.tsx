import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      if (totalHeight > 0) {
        const pct = Math.min(100, Math.max(0, (scrollY / totalHeight) * 100));
        setScrollPercentage(pct);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Circular progress calculation
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercentage / 100) * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          id="back-to-top-btn"
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 z-40 p-2.5 rounded-full bg-[#080E24]/90 backdrop-blur-md border border-slate-700/80 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300 group cursor-pointer"
        >
          {/* Circular SVG Progress Ring */}
          <svg className="w-10 h-10 -rotate-90" viewBox="0 0 44 44">
            {/* Background ring */}
            <circle
              cx="22"
              cy="22"
              r={radius}
              className="text-slate-800"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Active progress meter */}
            <circle
              cx="22"
              cy="22"
              r={radius}
              className="text-cyan-400 transition-all duration-100"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          {/* Center Chevron */}
          <div className="absolute inset-0 flex items-center justify-center">
            <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
