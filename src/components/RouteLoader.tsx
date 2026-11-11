import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Branded batter-stir overlay shown briefly on every page switch, so the
// transition always feels intentional (and covers image prefetch time).
export default function RouteLoader({ duration = 320 }: { duration?: number }) {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const t = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(t);
  }, [pathname, duration]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[96] flex flex-col items-center justify-center bg-cream"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          aria-label="Loading page"
        >
          <div className="relative h-20 w-20">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              <path d="M22 52a28 20 0 0 0 56 0z" fill="none" stroke="#593C31" strokeWidth="3.5" strokeLinecap="round" />
              <ellipse cx="50" cy="52" rx="28" ry="6" fill="#F3D58A" opacity="0.55" />
            </svg>
            <svg viewBox="0 0 100 100" className="loader-bowl absolute inset-0 h-full w-full">
              <line x1="62" y1="30" x2="46" y2="52" stroke="#593C31" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M46 52c-3-4-2-9 2-11 3-1.6 6 .2 6.5 3.5.5 3.2-1.5 6-8.5 7.5z" fill="none" stroke="#593C31" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <p className="font-hand mt-4 text-2xl text-cocoa">Fresh Batch</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
