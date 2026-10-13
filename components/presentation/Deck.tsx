'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, MotionConfig, useReducedMotion, Variants } from 'framer-motion';
import { slides } from './slides';
import Backdrop from '../visualizations/Backdrop';

const L = slides.length;
const pad = (n: number) => String(n).padStart(2, '0');

export default function Deck() {
  const [[i, dir], set] = useState<[number, number]>([0, 1]);
  const rm = useReducedMotion();
  const tx = useRef(0);
  const [ready, setReady] = useState(false);
  const step = useCallback((d: number) => set(([c]) => [Math.min(Math.max(c + d, 0), L - 1), d > 0 ? 1 : -1]), []);
  const jump = (t: number) => set(([c]) => [t, t >= c ? 1 : -1]);
  const full = () => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen());
  const theme = () => {
    const r = document.documentElement;
    const t = r.dataset.theme === 'light' ? 'dark' : 'light';
    r.classList.add('theming');
    r.dataset.theme = t;
    try { localStorage.setItem('theme', t); } catch {}
    setTimeout(() => r.classList.remove('theming'), 500);
  };

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === 'INPUT' || (e.key === ' ' && t.tagName === 'BUTTON')) return;
      if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); step(e.shiftKey ? -1 : 1); }
      else if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); step(-1); }
      else if (e.key === 'Home') jump(0);
      else if (e.key === 'End') jump(L - 1);
      else if (e.key === 'f') full();
    };
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, [step]);

  // Restore the slide from the URL hash (#5) and keep it in sync.
  useEffect(() => {
    const n = parseInt(location.hash.slice(1));
    if (n >= 1 && n <= L) set([n - 1, 1]);
    setReady(true);
  }, []);
  useEffect(() => { if (ready) history.replaceState(null, '', `#${i + 1}`); }, [i, ready]);

  const blur = `blur(${rm ? 0 : 10}px)`;
  const v: Variants = {
    in: (d: number) => ({ opacity: 0, x: rm ? 0 : d * 56, filter: blur }),
    on: { opacity: 1, x: 0, filter: 'blur(0px)' },
    out: (d: number) => ({ opacity: 0, x: rm ? 0 : d * -56, filter: blur }),
  };
  const S = slides[i];

  return (
    <MotionConfig reducedMotion="user">
      <main
        className="relative h-dvh overflow-hidden"
        onTouchStart={e => (tx.current = e.touches[0].clientX)}
        onTouchEnd={e => { const d = e.changedTouches[0].clientX - tx.current; if (Math.abs(d) > 70) step(d < 0 ? 1 : -1); }}
      >
        <Backdrop />
        <div className="fixed inset-x-0 top-0 z-30 h-[3px]" aria-hidden>
          <div className="h-full bg-c3 transition-[width] duration-500" style={{ width: `${((i + 1) / L) * 100}%` }} />
        </div>
        <header className="fixed inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 md:px-10">
          <span className="text-sm text-mut">Big O notation</span>
          <div className="flex items-center gap-3">
            <span aria-live="polite" className="font-mono text-sm tabular-nums">{pad(i + 1)}<span className="text-mut"> / {pad(L)}</span></span>
            <button className="btn" onClick={theme} aria-label="Toggle light and dark theme">
              <svg className="tg size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="8" /><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" /></svg>
            </button>
            <button className="btn max-md:hidden" onClick={full} aria-label="Toggle full screen">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait" custom={dir}>
          <motion.section
            key={i} custom={dir} variants={v} initial="in" animate="on" exit="out"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            aria-roledescription="slide" aria-label={`Slide ${i + 1} of ${L}`}
            className="absolute inset-0 overflow-y-auto px-6 pb-28 pt-24 md:px-16 [@media(max-height:760px)]:pb-24 [@media(max-height:760px)]:pt-20"
          >
            <div className="mx-auto flex min-h-full max-w-6xl flex-col justify-center"><S /></div>
          </motion.section>
        </AnimatePresence>

        <nav aria-label="Slide navigation" className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-between px-6 py-5 md:px-10">
          <button className="btn" onClick={() => step(-1)} disabled={i === 0} aria-label="Previous slide">←</button>
          <div className="flex items-center">
            {slides.map((_, k) => (
              <button key={k} onClick={() => jump(k)} aria-label={`Go to slide ${k + 1}`} aria-current={k === i} className="grid h-6 place-items-center px-[3px]">
                <span className={`h-1 rounded-full transition-all duration-300 ${k === i ? 'w-6 bg-c3' : 'w-2 bg-fg/25'}`} />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-mut max-md:hidden">← → navigate, F full screen</span>
            <button className="btn" onClick={() => step(1)} disabled={i === L - 1} aria-label="Next slide">→</button>
          </div>
        </nav>
      </main>
    </MotionConfig>
  );
}
