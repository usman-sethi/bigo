'use client';
import { ReactNode, useEffect, useState } from 'react';
import { animate, motion, useMotionValue, useTransform, Variants } from 'framer-motion';
import GrowthChart from '../visualizations/GrowthChart';
import { C } from '../../lib/complexity';

/* ---------- shared helpers ---------- */
const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.12 + i * 0.09, duration: 0.55, ease: 'easeOut' } }),
};
const a = (i = 0) => ({ variants: rise, custom: i, initial: 'hidden', animate: 'show' });
const R = ({ i, className, children }: { i?: number; className?: string; children: ReactNode }) => (
  <motion.div className={className} {...a(i)}>{children}</motion.div>
);
const H = ({ children }: { children: ReactNode }) => (
  <R i={1}><h2 className="text-[clamp(2.2rem,min(5.5vw,9vh),4.5rem)] font-semibold leading-[1.02] tracking-tight">{children}</h2></R>
);

function Num({ v, className }: { v: number; className?: string }) {
  const m = useMotionValue(0);
  const t = useTransform(m, x => Math.round(x).toLocaleString('en-US'));
  useEffect(() => {
    const c = animate(m, v, { duration: 0.7, ease: 'easeOut' });
    return () => c.stop();
  }, [v, m]);
  return <motion.span className={className}>{t}</motion.span>;
}

// One cell = one operation.
const Cells = ({ k, cols, c }: { k: number; cols: number; c: string }) => (
  <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols},18px)` }} aria-hidden>
    {Array.from({ length: k }, (_, j) => (
      <motion.i key={`${k}-${j}`} className="h-[18px] rounded-[3px]" style={{ background: `var(--${c})` }}
        initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: j * 0.008 }} />
    ))}
  </div>
);

/* ---------- 1. Introduction ---------- */
function S1() {
  const [n, setN] = useState(4);
  useEffect(() => {
    const t = setInterval(() => setN(v => (v >= 9 ? 3 : v + 1)), 1200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="grid items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
      <div>
        <R><p className="mb-8 text-lg text-mut">Data Structures &amp; Algorithms</p></R>
        <h1 className="text-[clamp(3.6rem,min(12vw,17vh),9.5rem)] font-semibold leading-[.88] tracking-tighter">
          {['BIG O', 'NOTATION'].map((t, j) => (
            <span key={t} className="block overflow-hidden pb-[.06em]">
              <motion.span className="block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ delay: 0.2 + j * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>{t}</motion.span>
            </span>
          ))}
        </h1>
        <R i={3}><p className="mt-8 text-xl text-mut md:text-3xl">Understanding Algorithm Efficiency</p></R>
        <R i={4}><p className="mt-10 text-lg text-mut">Presented by <span className="font-medium text-fg">Usman Sethi</span></p></R>
      </div>
      <R i={3}>
        <div className="border-l border-line pl-8">
          <div className="flex items-center gap-3 text-sm">
            <span className="border border-line px-3 py-2 font-mono">n = {n}</span><i className="h-px flex-1 bg-line" />
            <span className="bg-c3/15 px-3 py-2 text-c3">algorithm</span><i className="h-px flex-1 bg-line" />
            <span className="border border-line px-3 py-2">output</span>
          </div>
          <div className="mt-8 space-y-6">
            <div><Cells k={n} cols={n} c="c3" /><p className="mt-3 font-mono text-sm text-c3">{n} operations, O(n)</p></div>
            <div><Cells k={n * n} cols={n} c="c5" /><p className="mt-3 font-mono text-sm text-c5">{n * n} operations, O(n²)</p></div>
          </div>
        </div>
      </R>
    </div>
  );
}

/* ---------- Contents ---------- */
const CONTENTS = [
  'What is Big O?',
  'Why it matters',
  'Key terminology',
  'Common complexity classes',
  'Comparing growth rates',
  'Counting loops in code',
  'How to find Big O',
  'Key takeaway',
  'Any Questions?',
];
function SContents() {
  return (
    <>
      <H>TABLE OF CONTENTS</H>
      <ol className="mt-8 grid gap-x-12 md:grid-cols-2">
        {CONTENTS.map((title, j) => (
          <motion.li key={title} className="flex items-center gap-4 border-b border-line py-3 text-lg md:text-xl" {...a(j + 1)}>
            <span className="font-mono text-c3">{String(j + 1).padStart(2, '0')}</span>
            <span>{title}</span>
          </motion.li>
        ))}
      </ol>
    </>
  );
}

/* ---------- 2. What is Big O? ---------- */
function S2() {
  const [n, setN] = useState(5);
  return (
    <>
      <H>THE BIG O NOTATION</H>
      <R i={2}>
        <p className="mt-6 max-w-2xl text-lg text-mut md:text-xl">
          Big O describes how the <b className="font-medium text-fg">time or memory</b> an algorithm needs grows as the{' '}
          <b className="font-medium text-c3">input size n</b> grows. It measures growth rate, not seconds on one machine.
        </p>
      </R>
      <R i={3} className="mt-10 grid gap-10 md:grid-cols-2">
        {([['A', n, 'n', 'c3', 'text-c3'], ['B', n * n, 'n²', 'c5', 'text-c5']] as const).map(([name, ops, f, c, tc]) => (
          <div key={name}>
            <p className={`text-sm ${tc}`}>Algorithm {name}: n → {f} operations</p>
            <div className="mt-4"><Cells k={ops} cols={n} c={c} /></div>
            <p className="mt-4 font-mono text-4xl"><Num v={ops} className={tc} /></p>
          </div>
        ))}
      </R>
      <R i={4}>
        <label className="mt-8 flex items-center gap-4 font-mono text-sm">
          n = {n}
          <input type="range" min={1} max={12} value={n} onChange={e => setN(+e.target.value)} className="w-56 accent-c3" />
        </label>
      </R>
    </>
  );
}

/* ---------- 3. Why it matters ---------- */
const NS = [10, 100, 1000, 1000000];
const dur = (o: number) => {
  const s = o / 1e9;
  return s < 1e-6 ? `${Math.round(s * 1e9)} ns` : s < 1e-3 ? `${Math.round(s * 1e6)} µs` : s < 1 ? `${Math.round(s * 1e3)} ms` : s < 120 ? `${Math.round(s)} s` : `${Math.round(s / 60)} min`;
};
function S3() {
  const [k, setK] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setK(v => Math.min(v + 1, 3)), 1600);
    return () => clearInterval(t);
  }, []);
  const n = NS[k];
  return (
    <>
      <H>10 items is easy.<br />1,000,000 is not.</H>
      <R i={2} className="mt-8 flex flex-wrap gap-2">
        {NS.map((x, j) => (
          <button key={x} className="btn" aria-pressed={j === k} onClick={() => setK(j)}>{x.toLocaleString('en-US')} items</button>
        ))}
      </R>
      <div className="mt-10 space-y-8">
        {([['O(n)', n, 'c3'], ['O(n²)', n * n, 'c5']] as const).map(([o, ops, c]) => (
          <R i={3} key={o}>
            <p className="font-mono text-2xl" style={{ color: `var(--${c})` }}>{o}</p>
            <div className="mt-2 h-3 bg-fg/10">
              <div className="h-full transition-[width] duration-700" style={{ width: `${Math.max(1.5, (Math.log10(ops) / 12) * 100)}%`, background: `var(--${c})` }} />
            </div>
            <p className="mt-2 text-sm text-mut"><Num v={ops} className="font-mono text-fg" /> operations, about {dur(ops)} at 10⁹ operations per second</p>
          </R>
        ))}
      </div>
      <R i={4}><p className="mt-8 max-w-xl text-mut">Big O lets you compare algorithms and predict performance and scalability before the data gets large.</p></R>
    </>
  );
}

/* ---------- 4. Terminology ---------- */
const TERMS = [
  ['n', 'Input size', 'How many items the algorithm receives.', 'n = 8, for [ 3 7 1 9 4 2 8 5 ]'],
  ['T(n)', 'Time complexity', 'How the number of operations grows as n grows.', 'T(n) = 3n + 2'],
  ['S(n)', 'Space complexity', 'How the extra memory used grows as n grows.', 'Copying a list of n items: S(n) = n'],
  ['↗', 'Growth rate', 'How fast the cost rises when n gets larger.', 'Double n: O(n) doubles, O(n²) quadruples'],
  ['max', 'Worst case', 'The most work for any input of size n.', 'Linear search, target is last: n steps'],
  ['min', 'Best case', 'The least work for any input of size n.', 'Linear search, target is first: 1 step'],
];
const VISITED: Record<number, number> = { 4: 8, 5: 1 }; // cells a linear search touches
function S4() {
  const [k, setK] = useState(0);
  const [g, , def, ex] = TERMS[k];
  return (
    <>
      <H>Six terms to know</H>
      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_1.2fr]">
        <R i={2}>
          <ul className="divide-y divide-line border-y border-line">
            {TERMS.map((t, j) => (
              <li key={t[1]}>
                <button
                  onMouseEnter={() => setK(j)} onFocus={() => setK(j)} onClick={() => setK(j)}
                  className={`flex w-full items-baseline gap-4 py-3 text-left text-xl transition-colors md:text-2xl ${j === k ? 'text-fg' : 'text-mut'}`}
                >
                  <span className="w-14 font-mono text-sm text-c3">{t[0]}</span>{t[1]}
                </button>
              </li>
            ))}
          </ul>
        </R>
        <motion.div key={k} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="self-center">
          <p className="font-mono text-[clamp(3rem,8vw,6rem)] leading-none text-c3">{g}</p>
          <p className="mt-6 text-2xl">{def}</p>
          <p className="mt-4 font-mono text-sm text-c5">{ex}</p>
          {VISITED[k] && (
            <div className="mt-6 flex gap-1" aria-hidden>
              {Array.from({ length: 8 }, (_, j) => (
                <i key={j} className="size-7 rounded-[3px]" style={{ background: j < VISITED[k] ? (k === 4 ? 'var(--c5)' : 'var(--c1)') : 'color-mix(in srgb,var(--fg) 10%,transparent)' }} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}

/* ---------- 5. Common complexities ---------- */
function S5() {
  return (
    <>
      <H>Seven shapes of growth</H>
      <ol className="mt-8 divide-y divide-line border-y border-line">
        {C.map((c, j) => (
          <motion.li key={c.o} className="grid grid-cols-[7.5rem_1fr] items-center gap-x-6 gap-y-1 py-2.5 md:grid-cols-[9.5rem_13rem_1fr_8rem]" {...a(j)}>
            <span className="font-mono text-xl font-medium md:text-2xl" style={{ color: `var(--${c.id})` }}>{c.o}</span>
            <span className="text-sm md:text-base">{c.name}<span className="block text-xs text-mut md:text-sm">{c.ex}</span></span>
            <span className="col-span-2 h-2 bg-fg/10 md:col-span-1">
              <motion.span className="block h-full" style={{ background: `var(--${c.id})` }}
                initial={{ width: 0 }} animate={{ width: `${c.w}%` }} transition={{ delay: 0.4 + j * 0.1, duration: 0.8 }} />
            </span>
            <span className="hidden text-right font-mono text-sm text-mut md:block">{c.ops}</span>
          </motion.li>
        ))}
      </ol>
      <p className="mt-4 text-sm text-mut">Operations when n = 20. Bar length uses a log scale.</p>
    </>
  );
}

/* ---------- 6. Interactive graph ---------- */
function S6() {
  return (
    <>
      <H>Same input. Very different cost.</H>
      <R i={2} className="mt-8"><GrowthChart /></R>
    </>
  );
}

/* ---------- 7. Code ---------- */
const L1 = ['for (int i = 0; i < n; i++)', '{', '    cout << i;', '}'];
const L2 = ['for (int i = 0; i < n; i++)', '{', '    for (int j = 0; j < n; j++)', '    {', '        cout << i << j;', '    }', '}'];
const tok = /(\b(?:for|int)\b)|(\bcout\b)|(\b\d+\b)|(<<|\+\+|<|=)/g;
function hl(s: string) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of s.matchAll(tok)) {
    const i = m.index!;
    out.push(s.slice(last, i));
    out.push(<span key={i} style={{ color: m[1] ? 'var(--c4)' : m[2] ? 'var(--c3)' : m[3] ? 'var(--c5)' : 'var(--mut)' }}>{m[0]}</span>);
    last = i + m[0].length;
  }
  return [...out, s.slice(last)];
}
function Loop({ lines, hot, n, nested }: { lines: string[]; hot: number; n: number; nested?: boolean }) {
  const total = nested ? n * n : n;
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT(v => (v + 1) % (total + 3)), nested ? 300 : 450);
    return () => clearInterval(id);
  }, [total, nested]);
  const c = nested ? 'c5' : 'c3';
  const cur = Math.min(t, total - 1);
  return (
    <div>
      <pre className="overflow-x-auto bg-fg/5 p-4 font-mono text-[13px] leading-7 md:text-sm">
        <code>
          {lines.map((l, j) => <span key={j} className="code-line block" data-hot={j === hot && t < total}>{hl(l)}</span>)}
        </code>
      </pre>
      <div className="mt-4 grid gap-1" style={{ gridTemplateColumns: `repeat(${n},1.5rem)` }} aria-hidden>
        {Array.from({ length: total }, (_, k) => (
          <i key={k} className="h-6 rounded-[3px] transition-colors duration-200"
            style={{ background: k <= t ? `var(--${c})` : 'color-mix(in srgb,var(--fg) 10%,transparent)', opacity: k === t || t >= total ? 1 : 0.6 }} />
        ))}
      </div>
      <p className="mt-3 font-mono text-sm" style={{ color: `var(--${c})` }} aria-hidden>
        {nested ? `i = ${Math.floor(cur / n)}, j = ${cur % n}` : `i = ${cur}`}, operations so far: {Math.min(t + 1, total)}
      </p>
    </div>
  );
}
function S7() {
  return (
    <>
      <H>Count the loops</H>
      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <R i={2}>
          <Loop lines={L1} hot={2} n={6} />
          <p className="mt-4 text-lg">Runs n times: <b className="font-mono text-c3">O(n)</b></p>
        </R>
        <R i={3}>
          <Loop lines={L2} hot={4} n={4} nested />
          <p className="mt-4 text-lg">n × n = n²: <b className="font-mono text-c5">O(n²)</b></p>
        </R>
      </div>
    </>
  );
}

/* ---------- 8. How to find Big O ---------- */
const STEPS = ['Identify the input', 'Count the repeated operations', 'See how they grow with n', 'Keep the dominant term', 'Remove constants'];
function S8() {
  const [n, setN] = useState(10);
  const p = [3 * n * n, 5 * n, 10];
  const s = p[0] + p[1] + p[2];
  return (
    <>
      <H>FINDING BIG O </H>
      <div className="mt-10 grid gap-12 md:grid-cols-2">
        <ol className="space-y-3">
          {STEPS.map((t, j) => (
            <motion.li key={t} className="flex items-center gap-4 text-lg md:text-xl" {...a(j + 1)}>
              <span className="grid size-8 shrink-0 place-items-center border border-c3 font-mono text-sm text-c3">{j + 1}</span>{t}
            </motion.li>
          ))}
        </ol>
        <R i={3}>
          <p className="font-mono text-3xl md:text-4xl"><span className="text-c5">3n²</span> + <span className="text-c3">5n</span> + <span className="text-c1">10</span></p>
          <p className="mt-2 font-mono text-3xl text-c5 md:text-4xl">→ O(n²)</p>
          <div className="mt-6 flex h-3 overflow-hidden bg-fg/10">
            {p.map((v, j) => (
              <div key={j} className="transition-[width] duration-500" style={{ width: `${(v / s) * 100}%`, background: `var(--c${[5, 3, 1][j]})` }} />
            ))}
          </div>
          <p className="mt-3 text-sm text-mut">At n = {n.toLocaleString('en-US')}, the 3n² term is {((p[0] / s) * 100).toFixed(1)}% of the work.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[1, 10, 100, 1000].map(x => <button key={x} className="btn" aria-pressed={x === n} onClick={() => setN(x)}>n = {x.toLocaleString('en-US')}</button>)}
          </div>
          <p className="mt-6 text-mut">Constants and smaller terms matter less as n grows. The dominant term sets the growth rate.</p>
        </R>
      </div>
    </>
  );
}

/* ---------- 9. Key takeaway ---------- */
const SHORT = ['Constant', 'Slow growth', 'Linear', 'Efficient sorting', 'Quadratic', 'Rapid growth', 'Extremely rapid growth'];
function S9() {
  return (
    <div className="grid items-center gap-12 md:grid-cols-2">
      <div>
        <R i={1}><h2 className="text-lg text-mut">Key Takeaway</h2></R>
        <R i={2}><p className="mt-3 text-[clamp(2rem,4.8vw,4rem)] font-semibold leading-[1.05] tracking-tight">Big O describes how an algorithm’s resource use grows with input size.</p></R>
        <R i={4}><p className="mt-10 text-mut">Presented by Usman Sethi</p></R>
      </div>
      <ul className="font-mono text-lg">
        {C.map((c, j) => (
          <motion.li key={c.o} className="flex items-baseline gap-4 border-b border-line py-2" {...a(j + 2)}>
            <span className="w-32 shrink-0" style={{ color: `var(--${c.id})` }}>{c.o}</span>
            <span className="font-sans text-mut">→ {SHORT[j]}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- 10. Questions ---------- */
function S10() {
  return (
    <div className="grid items-center gap-10 md:grid-cols-2">
      <R i={1}>
        <h1 className="text-[clamp(3rem,min(9vw,14vh),7rem)] font-semibold leading-none tracking-tighter">Any Questions?</h1>
      </R>
      <R i={2}>
        <div
          role="img"
          aria-label="Placeholder for a funny image"
          className="grid aspect-video place-items-center border-2 border-dashed border-line bg-fg/[.03] p-6 text-center text-mut"
        >
          <span className="text-lg">Funny image goes here</span>
        </div>
      </R>
    </div>
  );
}

/* ---------- Final slide ---------- */
function S11() {
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center overflow-hidden">
      <video
        src="/hamster_clean_white.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover brightness-125"
      />
      <div className="absolute inset-0 bg-black/15" aria-hidden="true" />
    </div>
  );
}

export const slides = [S1, SContents, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11];
