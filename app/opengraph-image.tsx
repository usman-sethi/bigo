import { ImageResponse } from 'next/og';

export const alt = 'Big O Notation explained by Usman Sethi';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#0a0f1f', color: '#eef1fa', padding: 72, position: 'relative' }}>
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: 'absolute', left: 0, top: 0 }}>
          <path d="M420 560 C 700 560 900 500 1140 80" fill="none" stroke="#fb923c" strokeWidth="8" strokeLinecap="round" />
          <path d="M420 560 C 800 556 1000 540 1140 420" fill="none" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" />
          <path d="M420 560 L1140 535" fill="none" stroke="#22c55e" strokeWidth="8" strokeLinecap="round" />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 30, color: '#8f98b5' }}>Data Structures &amp; Algorithms</div>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 124, fontWeight: 700, lineHeight: 1, letterSpacing: -4 }}>
            <span>BIG O</span>
            <span>NOTATION</span>
          </div>
          <div style={{ fontSize: 32, color: '#8f98b5' }}>Understanding Algorithm Efficiency. Presented by Usman Sethi.</div>
        </div>
      </div>
    ),
    size,
  );
}
