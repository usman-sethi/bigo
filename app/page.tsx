import Deck from '../components/presentation/Deck';
import { siteUrl } from '../lib/site-url';

// Plain-text version of the deck for screen readers, search engines and no-JS visitors.
const OUTLINE = [
  ['What is Big O notation?', 'Big O describes how the time or memory an algorithm needs grows as the input size n grows.'],
  ['Why Big O matters', 'An algorithm that works for 10 items can be far too slow for 1,000,000 items.'],
  ['Terminology', 'Input size, time complexity, space complexity, growth rate, worst case and best case.'],
  ['Common complexities', 'O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ) and O(n!).'],
  ['Growth curves', 'Operations against input size for six complexity classes.'],
  ['Loops in code', 'One loop over n items is O(n). A nested loop over the same items is O(n²).'],
  ['How to find Big O', 'Count repeated operations, keep the dominant term and drop constants: 3n² + 5n + 10 is O(n²).'],
  ['Big O in the real world', 'Search engines, databases, sorting, social media and pathfinding all depend on scalable algorithms.'],
  ['Key takeaway', 'Big O describes how an algorithm’s resource use grows with input size.'],
];

export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: 'Big O Notation by Usman Sethi',
    description:
      'An interactive guide to Big O notation, algorithm time and space complexity, common growth rates, and analyzing code.',
    inLanguage: 'en',
    isAccessibleForFree: true,
    learningResourceType: 'Interactive presentation',
    teaches: ['Big O notation', 'Time complexity', 'Space complexity', 'Algorithm analysis'],
    author: {
      '@type': 'Person',
      name: 'Usman Sethi',
    },
    ...(siteUrl ? { url: siteUrl } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <Deck />
      <article className="mx-auto max-w-4xl space-y-10 px-6 py-16 md:px-10 md:py-24">
        <header className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-widest text-c3">A guide by Usman Sethi</p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Big O notation, explained
          </h2>
          <p className="max-w-3xl text-lg leading-relaxed text-mut">
            Big O notation describes how an algorithm’s time or memory use grows as its input gets
            larger. This interactive guide by Usman Sethi explains how to compare algorithms, spot
            common growth rates, and estimate how code will scale.
          </p>
        </header>

        <section aria-labelledby="complexity-heading" className="space-y-4">
          <h3 id="complexity-heading" className="text-2xl font-semibold">
            Common Big O complexity classes
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              ['O(1)', 'Constant time: the work stays the same as input grows.'],
              ['O(log n)', 'Logarithmic time: the work grows slowly, often by halving the search space.'],
              ['O(n)', 'Linear time: the work grows in proportion to the input size.'],
              ['O(n log n)', 'Linearithmic time: common in efficient comparison-based sorting.'],
              ['O(n²)', 'Quadratic time: often caused by comparing every pair in nested loops.'],
              ['O(2ⁿ) and O(n!)', 'Exponential and factorial time: growth becomes extremely rapid.'],
            ].map(([complexity, explanation]) => (
              <li key={complexity} className="rounded-xl border border-line p-4">
                <h4 className="font-mono text-c3">{complexity}</h4>
                <p className="mt-2 leading-relaxed text-mut">{explanation}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="analyze-heading" className="space-y-3">
          <h3 id="analyze-heading" className="text-2xl font-semibold">
            How to find the Big O of code
          </h3>
          <p className="leading-relaxed text-mut">
            Count how the number of operations changes with input size, keep the fastest-growing
            term, and drop constant factors. For example, 3n² + 5n + 10 simplifies to O(n²).
            A single loop through n items is usually O(n); a nested loop through those items is
            usually O(n²). Big O describes growth, not an exact runtime in seconds.
          </p>
        </section>

        <aside className="sr-only" aria-label="Text outline of the presentation">
          {OUTLINE.map(([h, p]) => (
            <section key={h}>
              <h2>{h}</h2>
              <p>{p}</p>
            </section>
          ))}
        </aside>
      </article>
    </>
  );
}
