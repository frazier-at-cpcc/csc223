// Pure model for CostCrossover: per-token API versus dedicated GPU deployment, monthly.
// No DOM, no Svelte. Every number the component shows comes from here.

export const HOURS_PER_MONTH = 730; // 8,760 hours per year / 12

// Course example (Ch7 Figures 7.14 and 7.15): 1,000M input and 500M output tokens at
// $1.25 / $10 per million = $6,250; 1,600 GPU-hours at $3.50 = $5,600.
// 1,000,000 requests x 1,000 in / 500 out reproduces the token totals. The course gives
// 1,600 GPU-hours without a derivation; 124 tok/s at 70% on one GPU per replica yields
// 1,600.1 GPU-hours, which rounds to the course figure.
export const DEFAULTS = {
  priceIn: 1.25, // $ per million input tokens
  priceOut: 10, // $ per million output tokens
  inTokens: 1000, // average input tokens per request
  outTokens: 500, // average output tokens per request
  requests: 1_000_000, // requests per month
  gpuPrice: 3.5, // $ per GPU-hour
  gpusPerReplica: 1,
  throughput: 124, // replica output tokens per second at the target latency
  utilization: 70, // percent
  minReplicas: 2, // always-on replicas; 0 means scale to zero
  engCost: 0, // $ per month, engineering and operations
};

export const PRESETS = [
  { name: 'Prototype (low volume)', values: { ...DEFAULTS, requests: 20_000, minReplicas: 1, engCost: 2000 } },
  { name: 'Growing product', values: { ...DEFAULTS } },
  {
    name: 'High-volume product',
    values: {
      ...DEFAULTS,
      inTokens: 1500,
      outTokens: 400,
      requests: 200_000_000,
      gpusPerReplica: 8,
      throughput: 3000,
      minReplicas: 2,
      engCost: 40000,
    },
  },
  { name: 'Scale to zero dedicated', values: { ...DEFAULTS, requests: 100_000, minReplicas: 0, engCost: 500 } },
];

// API cost per request in dollars.
export function apiCostPerRequest(p) {
  return (p.inTokens * p.priceIn + p.outTokens * p.priceOut) / 1e6;
}

// GPU-hours consumed per request above the floor.
export function gpuHoursPerRequest(p) {
  const effective = p.throughput * 3600 * (p.utilization / 100); // useful output tokens per replica-hour
  return effective > 0 ? (p.outTokens / effective) * p.gpusPerReplica : Infinity;
}

export function floorGpuHours(p) {
  return p.minReplicas * p.gpusPerReplica * HOURS_PER_MONTH;
}

export function apiMonthly(p, requests = p.requests) {
  return requests * apiCostPerRequest(p);
}

export function dedicatedGpuHours(p, requests = p.requests) {
  const needed = requests * gpuHoursPerRequest(p);
  return Math.max(needed, floorGpuHours(p));
}

export function dedicatedMonthly(p, requests = p.requests) {
  return dedicatedGpuHours(p, requests) * p.gpuPrice + p.engCost;
}

// Request volume where the two monthly costs are equal.
// Returns { kind: 'none' } when the API is never more expensive,
// { kind: 'always' } when dedicated is never more expensive (crossover at zero),
// or { kind: 'at', requests }.
export function crossover(p) {
  const a = apiCostPerRequest(p);
  const b = gpuHoursPerRequest(p);
  const fixed = p.engCost + floorGpuHours(p) * p.gpuPrice;
  const marginal = b * p.gpuPrice; // dedicated $ per request above the floor
  if (!(a > marginal)) return { kind: 'none' }; // dedicated never catches up
  if (fixed <= 0) return { kind: 'always' };
  // Below the floor knee, dedicated is flat at `fixed`.
  const knee = b > 0 ? floorGpuHours(p) / b : Infinity;
  const r1 = fixed / a;
  if (r1 <= knee) return { kind: 'at', requests: r1 };
  return { kind: 'at', requests: p.engCost / (a - marginal) };
}

export function summarize(p) {
  const api = apiMonthly(p);
  const ded = dedicatedMonthly(p);
  const outM = (p.requests * p.outTokens) / 1e6;
  const neededHours = p.requests * gpuHoursPerRequest(p);
  return {
    api,
    dedicated: ded,
    gpuHours: dedicatedGpuHours(p),
    neededGpuHours: neededHours,
    floorHours: floorGpuHours(p),
    floorBinds: floorGpuHours(p) > neededHours,
    gpuCost: dedicatedGpuHours(p) * p.gpuPrice,
    outputMillions: outM,
    apiPerMOut: outM > 0 ? api / outM : NaN,
    dedicatedPerMOut: outM > 0 ? ded / outM : NaN,
    crossover: crossover(p),
    cheaper: api < ded ? 'api' : ded < api ? 'dedicated' : 'tie',
  };
}
