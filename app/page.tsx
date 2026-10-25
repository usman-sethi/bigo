import Deck from '../components/presentation/Deck';

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
  return (
    <>
      <Deck />
      <aside className="sr-only" aria-label="Text outline of the presentation">
        {OUTLINE.map(([h, p]) => (
          <section key={h}>
            <h2>{h}</h2>
            <p>{p}</p>
          </section>
        ))}
      </aside>
    </>
  );
}
