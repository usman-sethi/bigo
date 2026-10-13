'use client';
import { useEffect, useRef } from 'react';
import { C } from '../../lib/complexity';

// Faint complexity curves with a dot tracing each one, behind the slides.
export default function Backdrop() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const g = cv.getContext('2d')!;
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fs = C.slice(0, 6).map(c => c.f);
    const val = (f: (n: number) => number, u: number) => f(1 + u * 9);
    // where each curve leaves the top of the screen
    const ends = fs.map(f => { let u = 0; while (u < 1 && val(f, u) < 60) u += 0.01; return Math.min(u, 1); });
    let w = 0, h = 0, raf = 0;
    const pt = (f: (n: number) => number, u: number): [number, number] => [u * w, h * 0.9 - (Math.min(val(f, u), 60) / 60) * h * 0.8];
    const draw = (now: number) => {
      const cs = getComputedStyle(document.documentElement);
      const p = still ? 1 : (now / 12000) % 1;
      g.clearRect(0, 0, w, h);
      fs.forEach((f, i) => {
        g.strokeStyle = g.fillStyle = cs.getPropertyValue(`--c${i + 1}`).trim();
        g.lineWidth = 2;
        g.globalAlpha = 0.14;
        g.beginPath();
        for (let u = 0; u <= ends[i]; u += 0.01) { const [x, y] = pt(f, u); if (u) g.lineTo(x, y); else g.moveTo(x, y); }
        g.stroke();
        g.globalAlpha = 0.6;
        const [x, y] = pt(f, p * ends[i]);
        g.beginPath();
        g.arc(x, y, 3.5, 0, 7);
        g.fill();
      });
      if (!still) raf = requestAnimationFrame(draw);
    };
    const fit = () => {
      const d = devicePixelRatio || 1;
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * d; cv.height = h * d;
      g.setTransform(d, 0, 0, d, 0, 0);
      if (still) draw(0);
    };
    fit();
    if (!still) raf = requestAnimationFrame(draw);
    const mo = new MutationObserver(() => { if (still) draw(0); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    addEventListener('resize', fit);
    return () => { cancelAnimationFrame(raf); mo.disconnect(); removeEventListener('resize', fit); };
  }, []);
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />;
}
