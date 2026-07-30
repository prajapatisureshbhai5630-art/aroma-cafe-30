import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * A cinematic luxury loader shown on first paint. A gold coffee bean draws
 * a circular arc while the brand name fades in; it lifts away once the page
 * is ready (controlled by the `done` prop) and after a minimum dwell.
 */
export function Loader({ done }: { done: boolean }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setHidden(true), 700);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1a110d]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
        >
          <motion.div
            className="relative h-24 w-24"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* rotating arc */}
            <svg viewBox="0 0 100 100" className="h-full w-full animate-spinSlow">
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="rgba(212,175,55,0.15)"
                strokeWidth="2"
              />
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="80 220"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-3xl">
              ☕
            </div>
          </motion.div>

          <motion.h1
            className="font-heading mt-8 text-2xl tracking-[0.2em] text-white"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
          >
            AROMA <span className="text-gradient-gold">CAFE</span>
          </motion.h1>
          <motion.p
            className="font-btn mt-3 text-[0.65rem] uppercase tracking-[0.4em] text-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            Brewing your experience
          </motion.p>

          <div className="mt-6 h-px w-40 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
