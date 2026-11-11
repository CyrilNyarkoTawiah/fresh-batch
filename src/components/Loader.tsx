import { motion } from 'framer-motion';

// Premium loading moment: a whisk stirring a bowl of batter under the wordmark.
export default function Loader({ done }: { done: boolean }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream"
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.4 }}
      style={{ pointerEvents: done ? 'none' : 'auto' }}
      aria-label="Loading Fresh Batch"
    >
      <div className="relative h-24 w-24">
        {/* bowl */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <path d="M22 52a28 20 0 0 0 56 0z" fill="none" stroke="#593C31" strokeWidth="3.5" strokeLinecap="round" />
          <ellipse cx="50" cy="52" rx="28" ry="6" fill="#F3D58A" opacity="0.55" />
        </svg>
        {/* whisk */}
        <svg viewBox="0 0 100 100" className="loader-bowl absolute inset-0 h-full w-full">
          <line x1="62" y1="30" x2="46" y2="52" stroke="#593C31" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M46 52c-3-4-2-9 2-11 3-1.6 6 .2 6.5 3.5.5 3.2-1.5 6-8.5 7.5z" fill="none" stroke="#593C31" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
      <motion.p
        className="font-hand mt-5 text-3xl text-cocoa"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        Fresh Batch
      </motion.p>
      <p className="mt-1 text-[0.68rem] font-medium uppercase tracking-[0.3em] text-cocoa/60">
        Freshly baked · made with love
      </p>
    </motion.div>
  );
}
