// Pure model for SpeculationSimulator. No DOM, no Svelte.
// Expected-value math follows Leviathan, Kalman, and Matias (2023), "Fast Inference from
// Transformers via Speculative Decoding", with an i.i.d. per-token acceptance rate alpha.

export const K_MIN = 1;
export const K_MAX = 10;

const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, Number.isFinite(x) ? x : lo));
export const clampAlpha = (a) => clamp(a, 0, 1);
export const clampK = (k) => Math.round(clamp(k, K_MIN, K_MAX));

/** Mulberry32: small seeded PRNG returning floats in [0, 1). */
export function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Expected tokens per target forward pass: (1 - a^(k+1)) / (1 - a); k + 1 when a = 1. */
export function expectedTokens(alpha, k) {
  const a = clampAlpha(alpha);
  if (a >= 1) return k + 1;
  return (1 - a ** (k + 1)) / (1 - a);
}

/** Expected share of drafted tokens that are accepted: (E - 1) / k. Lower than alpha for k > 1. */
export const acceptedShare = (alpha, k) => (expectedTokens(alpha, k) - 1) / k;

/**
 * Relative cost of verifying k + 1 positions, in units of one ordinary decode step.
 * batchPressure 0: memory-bound decode, so scoring k + 1 positions costs the same as one (v = 1).
 * batchPressure 1: compute-bound decode, so every extra position costs a full step (v = k + 1).
 */
export const verifyCost = (k, batchPressure) => 1 + clamp(batchPressure, 0, 1) * k;

/** Cost of one speculation step: k draft steps plus one verification pass. */
export const stepCost = (k, draftCost, batchPressure) =>
  k * Math.max(0, draftCost) + verifyCost(k, batchPressure);

/** Speedup over plain decode = expected tokens per step / cost of the step. */
export const speedup = (alpha, k, draftCost, batchPressure) =>
  expectedTokens(alpha, k) / stepCost(k, draftCost, batchPressure);

/** One row per draft length for the chart. */
export function sweep(alpha, draftCost, batchPressure, kMax = K_MAX) {
  const rows = [];
  for (let k = K_MIN; k <= kMax; k++) {
    rows.push({ k, expected: expectedTokens(alpha, k), speedup: speedup(alpha, k, draftCost, batchPressure) });
  }
  return rows;
}

/** Draft length with the highest speedup (smallest k on ties). */
export function bestK(alpha, draftCost, batchPressure, kMax = K_MAX) {
  return sweep(alpha, draftCost, batchPressure, kMax).reduce((b, r) => (r.speedup > b.speedup + 1e-12 ? r : b));
}

// Demo text. One word stands for one token.
export const PASSAGE = (
  'the draft model proposes several tokens and the target model scores all of them in one forward pass ' +
  'so decode can emit more than one token for each trip of the weights through memory'
).split(' ');
const DISTRACTORS = ['a', 'it', 'very', 'from', 'data', 'then', 'fast', 'blue', 'over', 'with'];

const wordAt = (pos) => PASSAGE[pos % PASSAGE.length];
function wrongWord(rng, pos) {
  const right = wordAt(pos);
  let w = DISTRACTORS[Math.floor(rng() * DISTRACTORS.length)];
  if (w === right) w = DISTRACTORS[(DISTRACTORS.indexOf(w) + 1) % DISTRACTORS.length];
  return w;
}

/**
 * One speculation step starting at output position `pos`.
 * Each draft is accepted with probability alpha, left to right, until the first rejection.
 * The single target pass scores all k + 1 positions at once and contributes one token of its own:
 * the correction at the first rejection, or a bonus token when every draft is accepted.
 */
export function simulateStep(rng, alpha, k, pos = 0) {
  const a = clampAlpha(alpha);
  const drafts = [];
  let rejectedAt = -1;
  for (let i = 0; i < k; i++) {
    if (rejectedAt >= 0) {
      drafts.push({ text: wrongWord(rng, pos + i), status: 'discarded' });
    } else if (rng() < a) {
      drafts.push({ text: wordAt(pos + i), status: 'accepted' });
    } else {
      rejectedAt = i;
      drafts.push({ text: wrongWord(rng, pos + i), status: 'rejected' });
    }
  }
  const accepted = rejectedAt < 0 ? k : rejectedAt;
  // Target prediction at each of the k + 1 positions. Positions after a rejection sit on a wrong
  // prefix, so their predictions are unusable (null).
  const targets = [];
  for (let i = 0; i <= k; i++) targets.push(rejectedAt >= 0 && i > rejectedAt ? null : wordAt(pos + i));
  return {
    drafts,
    targets,
    accepted,
    extra: { text: wordAt(pos + accepted), kind: rejectedAt < 0 ? 'bonus' : 'correction', index: accepted },
    produced: accepted + 1,
  };
}
