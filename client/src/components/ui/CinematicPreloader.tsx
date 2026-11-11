import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicPreloaderProps {
  onComplete: () => void;
}

export const CinematicPreloader: React.FC<CinematicPreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Smooth progress counter from 0 to 100 in ~1.2s for a snappy luxury feel
    const startTime = performance.now();
    const duration = 1250;

    let animationFrame: number;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));

      // Ease out curve
      const easedProgress = Math.min(100, Math.round(100 * Math.sin((rawProgress / 100) * (Math.PI / 2))));
      setProgress(easedProgress);

      if (elapsed < duration) {
        animationFrame = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsExiting(true);
        }, 180);
        setTimeout(() => {
          onComplete();
        }, 850);
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrame);
  }, [onComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 350);
  };

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.77, 0, 0.175, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0d0d0d] text-brand-ivory overflow-hidden select-none cursor-pointer"
          onClick={handleSkip}
        >
          {/* Ambient golden radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,164,92,0.18)_0%,rgba(17,17,17,0)_70%)] pointer-events-none" />

          {/* Golden light burst overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0.15, 0.35, 0.2], scale: [0.95, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-[450px] h-[450px] rounded-full bg-brand-gold/15 blur-3xl pointer-events-none"
          />

          {/* Central Official Logo & Brand Typography */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            {/* Animated Official Brand Logo */}
            <motion.div
              initial={{ scale: 0.65, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-6"
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-brand-gold/40 via-brand-gold to-brand-gold-light/60 shadow-[0_0_40px_rgba(201,164,92,0.35)]">
                <img
                  src="/happy_events_logo_crop.png"
                  alt="Happy Events Official Logo"
                  className="w-full h-full rounded-full object-cover border-2 border-brand-dark"
                />
              </div>
              {/* Delicate pulsing gold ring */}
              <div className="absolute -inset-2 rounded-full border border-brand-gold/30 animate-ping pointer-events-none opacity-25" />
            </motion.div>

            {/* Brand Title with Gold Shimmer */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <h1 className="text-3xl sm:text-5xl md:text-5xl font-serif tracking-[0.2em] font-medium text-brand-ivory uppercase">
                <span className="text-gold-gradient drop-shadow-[0_2px_15px_rgba(201,164,92,0.4)]">
                  HAPPY EVENTS
                </span>
              </h1>
            </motion.div>

            {/* Eyebrow Tagline */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: '0.15em' }}
              animate={{ opacity: 1, letterSpacing: '0.35em' }}
              transition={{ delay: 0.35, duration: 0.7, ease: 'easeOut' }}
              className="mt-2.5 text-[10px] md:text-xs text-brand-cream/80 font-sans font-light uppercase"
            >
              We Plan • We Design • We Create
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-48 sm:w-64 mt-8 space-y-2">
              <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-gold/40 via-brand-gold to-[#FFF0D0] rounded-full shadow-[0_0_10px_#C9A45C]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>

              {/* Counter Display */}
              <div className="flex justify-between items-center text-[10px] text-brand-gold/80 font-sans tracking-widest">
                <span>CURATING MOMENTS</span>
                <span className="font-mono">{progress}%</span>
              </div>
            </div>
          </div>

          {/* Quick Skip Prompt */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
            onClick={(e) => {
              e.stopPropagation();
              handleSkip();
            }}
            className="absolute bottom-8 text-[11px] uppercase tracking-widest text-brand-muted hover:text-brand-gold transition-colors font-sans py-2 px-4 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm cursor-pointer"
          >
            Click anywhere to enter →
          </motion.button>
        </motion.div>
      ) : (
        /* Cinematic Curtain Split Reveal */
        <div key="curtain" className="fixed inset-0 z-[100] pointer-events-none flex flex-col">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
            className="w-full h-1/2 bg-[#0d0d0d] border-b border-brand-gold/30 shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
          />
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: '100%' }}
            transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
            className="w-full h-1/2 bg-[#0d0d0d] border-t border-brand-gold/30 shadow-[0_-15px_30px_rgba(0,0,0,0.8)]"
          />
        </div>
      )}
    </AnimatePresence>
  );
};

export default CinematicPreloader;
