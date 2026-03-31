import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

/** Po kolika pixelech scrollu zobrazit tlačítko */
const SHOW_AFTER_SCROLL_PX = 360;
const GAP_ABOVE_FOOTER_PX = 16;
const DEFAULT_BOTTOM_PX = 24;
const RIGHT_PX = 20;
const FOOTER_SELECTOR = '#site-footer';

/**
 * Posun „kolize“ s patičkou výš po stránce — tlačítko zůstane spíš na béžovém pozadí,
 * než aby zajíždělo do světlé vlny / bílého přechodu nad tmavou patičkou.
 */
const FOOTER_BUFFER_ABOVE_PX = 120;

export function ScrollToTopFab() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [bottomPx, setBottomPx] = useState(DEFAULT_BOTTOM_PX);
  const rafRef = useRef(0);

  const updatePosition = useCallback(() => {
    const scrollY = window.scrollY;
    setVisible(scrollY > SHOW_AFTER_SCROLL_PX);

    const footer = document.querySelector(FOOTER_SELECTOR);
    const safeB =
      typeof window !== 'undefined'
        ? Number.parseInt(
            getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-bottom)') || '0',
            10,
          ) || 0
        : 0;
    const baseBottom = DEFAULT_BOTTOM_PX + safeB;

    if (!footer) {
      setBottomPx(baseBottom);
      return;
    }

    const ih = window.innerHeight;
    const ft = footer.getBoundingClientRect().top;
    const effectiveFooterTop = ft - FOOTER_BUFFER_ABOVE_PX;

    if (effectiveFooterTop >= ih) {
      setBottomPx(baseBottom);
      return;
    }

    const liftBottom = ih - Math.max(0, effectiveFooterTop) + GAP_ABOVE_FOOTER_PX;
    setBottomPx(Math.max(baseBottom, liftBottom));
  }, []);

  const scheduleUpdate = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      updatePosition();
    });
  }, [updatePosition]);

  useEffect(() => {
    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scheduleUpdate]);

  useEffect(() => {
    scheduleUpdate();
  }, [location.pathname, location.search, scheduleUpdate]);

  const scrollToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  const animDuration = reduceMotion ? 0.08 : 0.24;
  const animEase = [0.2, 0.85, 0.24, 1] as const;
  const hiddenState = reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.88, y: 10 };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top-fab"
          type="button"
          onClick={scrollToTop}
          aria-label="Zpět nahoru"
          initial={hiddenState}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={hiddenState}
          transition={{ duration: animDuration, ease: reduceMotion ? 'linear' : animEase }}
          className="fixed z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-[var(--farm-primary)]/75 text-white shadow-lg backdrop-blur-sm transition-colors duration-200 hover:bg-[var(--farm-primary)]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--farm-primary)] motion-safe:hover:scale-105"
          style={{
            bottom: bottomPx,
            right: `max(${RIGHT_PX}px, env(safe-area-inset-right, 0px))`,
          }}
        >
          <ChevronUp className="h-6 w-6 shrink-0" strokeWidth={2.5} aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
