type Cx = { id: string; o: string; name: string; ex: string; v: number; ops: string; f: (n: number) => number };

// v = operations at n = 20 (used for the log-scale bars on the "classes" slide)
const raw: Cx[] = [
  { id: 'c1', o: 'O(1)', name: 'Constant', ex: 'Array index access', v: 1, ops: '1', f: () => 1 },
  { id: 'c2', o: 'O(log n)', name: 'Logarithmic', ex: 'Binary search', v: 4.32, ops: '≈ 4', f: n => Math.log2(n) },
  { id: 'c3', o: 'O(n)', name: 'Linear', ex: 'Scanning a list', v: 20, ops: '20', f: n => n },
  { id: 'c4', o: 'O(n log n)', name: 'Linearithmic', ex: 'Merge sort', v: 86.4, ops: '≈ 86', f: n => n * Math.log2(n) },
  { id: 'c5', o: 'O(n²)', name: 'Quadratic', ex: 'Nested loops', v: 400, ops: '400', f: n => n * n },
  { id: 'c6', o: 'O(2ⁿ)', name: 'Exponential', ex: 'All subsets of a set', v: 1048576, ops: '1,048,576', f: n => 2 ** n },
  { id: 'c7', o: 'O(n!)', name: 'Factorial', ex: 'Generating permutations', v: 2.43e18, ops: '2.4 × 10¹⁸', f: () => Infinity },
];

export const C = raw.map(r => ({ ...r, w: Math.max(2, (Math.log10(r.v) / 18.4) * 100) }));
