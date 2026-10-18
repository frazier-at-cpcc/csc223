import assert from 'node:assert/strict';
import {
  expectedTokens, acceptedShare, verifyCost, stepCost, speedup, bestK, sweep, simulateStep, mulberry32,
} from './speculation.js';

const near = (a, b, tol = 1e-9) => assert.ok(Math.abs(a - b) <= tol, `${a} != ${b}`);

// Expected tokens per pass, hand computed.
near(expectedTokens(0.8, 4), (1 - 0.8 ** 5) / 0.2); // 3.3616
near(expectedTokens(0.8, 4), 3.3616);
near(expectedTokens(0.5, 1), 1.5);
near(expectedTokens(0.6, 3), 2.176);
assert.equal(expectedTokens(1, 4), 5); // alpha = 1 -> k + 1
assert.equal(expectedTokens(0, 4), 1); // nothing accepted -> the target token only
near(expectedTokens(0.999999, 4), 5, 1e-4); // continuous approach to k + 1
near(acceptedShare(0.8, 4), 2.3616 / 4);

// Costs and speedup.
assert.equal(verifyCost(4, 0), 1);
assert.equal(verifyCost(4, 1), 5);
near(verifyCost(4, 0.5), 3);
near(stepCost(4, 0.05, 0), 1.2);
near(speedup(0.8, 4, 0.05, 0), 3.3616 / 1.2); // 2.8013
near(speedup(0.8, 4, 0.05, 1), 3.3616 / 5.2); // < 1: speculation slows decode
assert.ok(speedup(0.8, 4, 0.05, 1) < 1);
near(speedup(0, 1, 0, 0), 1); // free draft, nothing accepted -> break even

// Draft too long: alpha 0.6, c 0.1 -> best k = 3 (2.176 / 1.3 = 1.674), k = 10 gives 1.245.
assert.equal(bestK(0.6, 0.1, 0).k, 3);
near(speedup(0.6, 10, 0.1, 0), (1 - 0.6 ** 11) / 0.4 / 2.0);
assert.equal(sweep(0.7, 0.05, 0).length, 10);

// Step simulation: bounds, special cases, reproducibility, and convergence to the expected value.
const rng0 = mulberry32(7);
const all = simulateStep(rng0, 1, 4, 0);
assert.equal(all.produced, 5);
assert.equal(all.extra.kind, 'bonus');
assert.ok(all.drafts.every((d) => d.status === 'accepted'));
const none = simulateStep(mulberry32(7), 0, 4, 0);
assert.equal(none.produced, 1);
assert.equal(none.extra.kind, 'correction');
assert.deepEqual(none.drafts.map((d) => d.status), ['rejected', 'discarded', 'discarded', 'discarded']);
assert.ok(none.drafts[0].text !== none.extra.text);

const a = mulberry32(42), b = mulberry32(42);
for (let i = 0; i < 50; i++) assert.deepEqual(simulateStep(a, 0.7, 5, i), simulateStep(b, 0.7, 5, i));

for (const [alpha, k] of [[0.8, 4], [0.4, 4], [0.9, 8]]) {
  const rng = mulberry32(123);
  let tokens = 0;
  const n = 40000;
  for (let i = 0; i < n; i++) {
    const s = simulateStep(rng, alpha, k, tokens);
    assert.ok(s.produced >= 1 && s.produced <= k + 1);
    assert.equal(s.targets.length, k + 1);
    tokens += s.produced;
  }
  near(tokens / n, expectedTokens(alpha, k), 0.05);
}

console.log('ok');
