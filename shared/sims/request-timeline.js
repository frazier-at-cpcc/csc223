// Pure model for RequestTimeline: one LLM request stepped forward pass by forward pass.
// Step 0 is the request before any pass. Step 1 is the prefill pass. Step s >= 2 is decode step s - 1.

export const DEFAULT_PROMPT = ['Explain', 'how', 'GPUs', 'serve', 'models', '?'];
export const DEFAULT_OUTPUT = ['GPUs', 'run', 'many', 'matrix', 'multiplications', 'in', 'parallel', '.'];

const num = (v, fallback) => (Number.isFinite(Number(v)) && Number(v) >= 0 ? Number(v) : fallback);
const tokens = (v, fallback) => (Array.isArray(v) && v.length > 0 ? v.map(String) : fallback);

/** Leading prompt tokens served from the prefix cache. At least one prompt token is always
 *  computed, because the prefill pass needs a fresh hidden state to produce the first token's logits. */
export function cachedCount(promptLength, requested) {
  const r = Math.round(num(requested, 0));
  return Math.min(Math.max(r, 0), Math.max(promptLength - 1, 0));
}

/** Prefill time scales with the share of prompt tokens that prefill must compute. */
export function effectivePrefillMs(prefillMs, promptLength, cached) {
  return (prefillMs * (promptLength - cached)) / promptLength;
}

export function configure({ promptTokens, outputTokens, prefillMs = 120, itlMs = 30, prefixCachedTokens = 0 } = {}) {
  const prompt = tokens(promptTokens, DEFAULT_PROMPT);
  const output = tokens(outputTokens, DEFAULT_OUTPUT);
  const P = prompt.length;
  const N = output.length;
  const fullPrefillMs = num(prefillMs, 120);
  const itl = num(itlMs, 30);
  const C = cachedCount(P, prefixCachedTokens);
  const ttft = effectivePrefillMs(fullPrefillMs, P, C);
  return {
    prompt, output, P, N, C,
    prefillMs: fullPrefillMs,
    itlMs: itl,
    ttftMs: ttft,
    totalPasses: N, // 1 prefill pass + (N - 1) decode passes
    totalMs: ttft + (N - 1) * itl,
    perceivedTps: itl > 0 ? 1000 / itl : null,
  };
}

/** Arrival time of output token j (1-based). */
export function arrivalMs(cfg, j) {
  return cfg.ttftMs + (j - 1) * cfg.itlMs;
}

export function stateAt(cfg, step) {
  const s = Math.min(Math.max(Math.round(step), 0), cfg.totalPasses);
  if (s === 0) {
    return {
      step: 0, phase: 'idle', done: false, passes: 0,
      kvPrompt: cfg.C, kvGenerated: 0, kvEntries: cfg.C,
      tokensGenerated: 0, elapsedMs: 0, ttftMs: null, itlMs: null,
      computedThisPass: 0, decodeStep: 0,
    };
  }
  const n = s; // tokens produced so far
  const decodeStep = s - 1; // decode passes completed
  return {
    step: s,
    phase: s === 1 ? 'prefill' : 'decode',
    done: s === cfg.totalPasses,
    passes: s,
    kvPrompt: cfg.P,
    kvGenerated: decodeStep,
    kvEntries: cfg.P + decodeStep,
    tokensGenerated: n,
    elapsedMs: arrivalMs(cfg, n),
    ttftMs: cfg.ttftMs,
    itlMs: n >= 2 ? cfg.itlMs : null,
    computedThisPass: s === 1 ? cfg.P - cfg.C : 1,
    decodeStep,
  };
}
