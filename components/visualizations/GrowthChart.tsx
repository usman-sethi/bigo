'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { C } from '../../lib/complexity';

const W = 640, H = 380, L = 56, B = 48, N = 10, Y = 60;
const px = (n: number) => L + ((n - 1) / (N - 1)) * (W - L - 16);
const py = (v: number) => H - B - (Math.min(v, Y) / Y) * (H - B - 16);

// Stop drawing once a curve leaves the chart.
const curve = (f: (n: number) => number) => {
  let d = '';
  for (let n = 1; n <= N + 1e-9; n += 0.2) {
    const v = f(n);
    d += `${d ? 'L' : 'M'}${px(n).toFixed(1)} ${py(v).toFixed(1)}`;
    if (v >= Y) break;
  }
  return d;
};
const CS = C.slice(0, 6);

export default function GrowthChart() {
  const [a, setA] = useState<number | null>(null);
  const cur = a === null ? null : CS[a];
  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1.7fr_1fr]">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Operations versus input size for six complexity classes" className="w-full font-mono">
        {[0, 20, 40, 60].map(v => (
          <g key={v}>
            <line x1={L} x2={W - 16} y1={py(v)} y2={py(v)} stroke="var(--line)" />
            <text x={L - 10} y={py(v) + 4} textAnchor="end" fontSize="12" fill="var(--mut)">{v}</text>
          </g>
        ))}
        {[1, 5, 10].map(n => (
          <text key={n} x={px(n)} y={H - B + 20} textAnchor="middle" fontSize="12" fill="var(--mut)">{n}</text>
        ))}
        <path d={`M${L} 16V${H - B}H${W - 16}`} fill="none" stroke="var(--mut)" />
        <text x={W / 2} y={H - 10} textAnchor="middle" fontSize="13" fill="var(--mut)">Input size (n)</text>
        <text transform={`translate(14 ${H / 2}) rotate(-90)`} textAnchor="middle" fontSize="13" fill="var(--mut)">Operations</text>
        {CS.map((c, i) => (
          <g key={c.o}>
            <motion.path
              d={curve(c.f)} fill="none" stroke={`var(--${c.id})`} strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1, opacity: a === null || a === i ? 1 : 0.15, strokeWidth: a === i ? 5 : 3 }}
              transition={{ pathLength: { duration: 1.2, delay: i * 0.12 }, default: { duration: 0.2 } }}
            />
            <path d={curve(c.f)} fill="none" stroke="transparent" strokeWidth="20" onMouseEnter={() => setA(i)} onMouseLeave={() => setA(null)} />
          </g>
        ))}
      </svg>
      <div>
        <ul className="flex flex-wrap gap-x-6 font-mono text-lg lg:block">
          {CS.map((c, i) => (
            <li key={c.o}>
              <button
                className="flex w-full items-center gap-3 py-1.5 text-left transition-opacity"
                style={{ color: `var(--${c.id})`, opacity: a === null || a === i ? 1 : 0.35 }}
                onMouseEnter={() => setA(i)} onFocus={() => setA(i)} onMouseLeave={() => setA(null)} onBlur={() => setA(null)}
              >
                <i className="h-0.5 w-6 bg-current" />
                {c.o}
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-6 min-h-40 border-t border-line pt-4" aria-live="polite">
          {cur ? (
            <>
              <p className="text-sm text-mut">Complexity</p>
              <p className="mb-3 font-mono text-3xl" style={{ color: `var(--${cur.id})` }}>{cur.o}</p>
              <p className="text-sm text-mut">Example</p>
              <p className="mb-3 text-lg">{cur.ex}</p>
              <p className="text-sm text-mut">Growth</p>
              <p className="text-lg">{cur.name}</p>
            </>
          ) : (
            <p className="text-mut">Hover or focus a curve to see what it describes.</p>
          )}
        </div>
      </div>
    </div>
  );
}
