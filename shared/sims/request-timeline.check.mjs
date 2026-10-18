import assert from 'node:assert/strict';
import { configure, stateAt, cachedCount, arrivalMs } from './request-timeline.js';

// Defaults: P = 6, N = 8, prefill 120 ms, ITL 30 ms.
const d = configure();
assert.equal(d.P, 6);
assert.equal(d.N, 8);
assert.equal(d.totalPasses, 8); // 1 + (8 - 1)
assert.equal(d.totalMs, 120 + 7 * 30); // 330

const s0 = stateAt(d, 0);
assert.deepEqual([s0.passes, s0.kvEntries, s0.tokensGenerated, s0.elapsedMs, s0.ttftMs], [0, 0, 0, 0, null]);

const s1 = stateAt(d, 1); // after prefill
assert.deepEqual([s1.phase, s1.passes, s1.kvEntries, s1.tokensGenerated, s1.elapsedMs, s1.ttftMs, s1.itlMs],
  ['prefill', 1, 6, 1, 120, 120, null]);
assert.equal(s1.computedThisPass, 6);

for (let i = 1; i <= 7; i++) { // after decode step i
  const s = stateAt(d, i + 1);
  assert.equal(s.kvEntries, 6 + i);
  assert.equal(s.kvGenerated, i);
  assert.equal(s.tokensGenerated, i + 1);
  assert.equal(s.passes, i + 1);
  assert.equal(s.elapsedMs, 120 + i * 30);
  assert.equal(s.itlMs, 30);
  assert.equal(s.computedThisPass, 1);
}
assert.equal(stateAt(d, 8).done, true);
assert.equal(stateAt(d, 99).step, 8); // clamped

// Prefix cache hit: 4 of 6 cached, so prefill computes 2 tokens and TTFT = 120 * 2 / 6 = 40 ms.
const c = configure({ prefixCachedTokens: 4 });
assert.equal(c.ttftMs, 40);
assert.equal(stateAt(c, 0).kvEntries, 4); // cached entries exist before prefill
assert.equal(stateAt(c, 1).kvEntries, 6);
assert.equal(stateAt(c, 1).computedThisPass, 2);
assert.equal(stateAt(c, 3).elapsedMs, 40 + 2 * 30);

// A full hit still computes one token.
assert.equal(cachedCount(6, 6), 5);
assert.equal(cachedCount(6, -3), 0);
assert.equal(configure({ prefixCachedTokens: 99 }).ttftMs, 20);

// Long prompt, short answer: 24 tokens at 480 ms, 4 output tokens at 30 ms.
const long = configure({ promptTokens: Array(24).fill('x'), outputTokens: ['a', 'b', 'c', 'd'], prefillMs: 480 });
assert.equal(long.totalMs, 480 + 3 * 30);
assert.equal(arrivalMs(long, 4), 570);
assert.equal(d.perceivedTps.toFixed(2), '33.33');

console.log('ok');
