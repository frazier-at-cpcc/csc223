// Pure model for AutoscalingSimulator. No DOM, no Svelte.
// Discrete minutes t = 0 .. MINUTES - 1. Every number the component shows comes from simulate().

export const MINUTES = 120;

// Demand D(t): concurrent in-flight requests during minute t. Deterministic, so runs repeat exactly.
export const PATTERNS = {
  steady: {
    label: 'Steady traffic',
    description: 'About 64 concurrent requests, with a gentle 20-minute wave of plus or minus 6.',
    demand: (t) => 64 + Math.round(6 * Math.sin((2 * Math.PI * t) / 20)),
  },
  ramp: {
    label: 'Morning ramp',
    description: 'A quiet 8 requests until minute 15, a straight climb to 120 at minute 75, then a plateau.',
    demand: (t) => (t < 15 ? 8 : t >= 75 ? 120 : Math.round(8 + ((t - 15) * 112) / 60)),
  },
  spike: {
    label: 'Sudden spikes',
    description: 'A baseline of 24 requests, with two spikes to 112 during minutes 30 to 44 and 55 to 69.',
    demand: (t) => ((t >= 30 && t < 45) || (t >= 55 && t < 70) ? 112 : 24),
  },
  burst: {
    label: 'Quiet, then bursts',
    description: 'No traffic except bursts of 32 requests during minutes 40 to 54 and 85 to 94.',
    demand: (t) => ((t >= 40 && t < 55) || (t >= 85 && t < 95) ? 32 : 0),
  },
};

export const DEFAULTS = {
  pattern: 'spike',
  minReplicas: 1,
  maxReplicas: 10,
  concurrencyTarget: 16,
  batchSize: 16,
  autoscalingWindow: 2,
  scaleDownDelay: 10,
  coldStart: 3,
};

export const PRESETS = [
  {
    name: 'Well tuned',
    settings: { pattern: 'ramp', minReplicas: 1, maxReplicas: 10, concurrencyTarget: 16, batchSize: 16, autoscalingWindow: 1, scaleDownDelay: 10, coldStart: 2 },
  },
  {
    name: 'Cold starts too slow',
    settings: { pattern: 'spike', minReplicas: 2, maxReplicas: 10, concurrencyTarget: 16, batchSize: 16, autoscalingWindow: 1, scaleDownDelay: 5, coldStart: 12 },
  },
  {
    name: 'Concurrency target above batch size',
    settings: { pattern: 'ramp', minReplicas: 1, maxReplicas: 10, concurrencyTarget: 32, batchSize: 16, autoscalingWindow: 1, scaleDownDelay: 10, coldStart: 2 },
  },
  {
    name: 'Scale to zero for a dev environment',
    settings: { pattern: 'burst', minReplicas: 0, maxReplicas: 4, concurrencyTarget: 16, batchSize: 16, autoscalingWindow: 1, scaleDownDelay: 5, coldStart: 3 },
  },
];

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/** Desired replicas = ceil(average demand over the window / concurrency target), clamped to [min, max]. */
export function desiredReplicas(avgDemand, target, min, max) {
  return clamp(Math.ceil(avgDemand / target), min, max);
}

export function simulate(p) {
  const s = { ...DEFAULTS, ...p };
  const min = s.minReplicas;
  const max = Math.max(s.maxReplicas, min); // min wins if the two conflict
  const target = s.concurrencyTarget;
  const batch = s.batchSize;
  const demandFn = (PATTERNS[s.pattern] ?? PATTERNS[DEFAULTS.pattern]).demand;

  const demand = Array.from({ length: MINUTES }, (_, t) => demandFn(t));
  const desiredLog = [];
  // The run starts warm: replicas for minute 0 are already serving.
  let ready = desiredReplicas(demand[0], target, min, max);
  let pending = []; // ready-at minute for each replica in cold start
  const rows = [];

  for (let t = 0; t < MINUTES; t++) {
    const from = Math.max(0, t - s.autoscalingWindow + 1);
    const slice = demand.slice(from, t + 1);
    const avg = slice.reduce((a, b) => a + b, 0) / slice.length;
    const desired = desiredReplicas(avg, target, min, max);
    desiredLog.push(desired);

    const total = ready + pending.length;
    if (desired > total) {
      for (let i = total; i < desired; i++) pending.push(t + s.coldStart);
    } else {
      // Scale down only to the highest desired count seen during the scale-down delay.
      const keep = Math.max(...desiredLog.slice(Math.max(0, t - s.scaleDownDelay)));
      let remove = total - keep;
      while (remove > 0 && pending.length) { pending.pop(); remove--; } // cancel starts first
      ready -= Math.max(0, remove);
    }

    ready += pending.filter((r) => r <= t).length;
    pending = pending.filter((r) => r > t);

    const capacity = ready * batch;
    const queued = Math.max(0, demand[t] - capacity);
    let cause = null;
    if (queued > 0) {
      if (target > batch && ready * target >= demand[t]) cause = 'mismatch';
      else if (ready + pending.length >= max && desired >= max) cause = 'max';
      else if (pending.length > 0) cause = 'coldstart';
      else cause = 'window';
    }
    rows.push({ t, demand: demand[t], avg, desired, ready, starting: pending.length, capacity, queued, cause });
  }

  const queueMinutes = rows.filter((r) => r.queued > 0).length;
  const peakQueue = Math.max(0, ...rows.map((r) => r.queued));
  // Replicas in cold start already hold a GPU, so they count toward cost.
  const replicaHours = rows.reduce((a, r) => a + r.ready + r.starting, 0) / 60;
  const capSum = rows.reduce((a, r) => a + r.capacity, 0);
  const idleSum = rows.reduce((a, r) => a + (r.capacity - Math.min(r.demand, r.capacity)), 0);
  const idlePercent = capSum ? (100 * idleSum) / capSum : 0;
  const causes = { mismatch: 0, max: 0, coldstart: 0, window: 0 };
  for (const r of rows) if (r.cause) causes[r.cause]++;

  return { settings: { ...s, maxReplicas: max }, maxAdjusted: max !== s.maxReplicas, rows, queueMinutes, peakQueue, replicaHours, idlePercent, causes, verdict: verdict(s, { queueMinutes, peakQueue, peakDemand: Math.max(...demand), idlePercent, causes }) };
}

export const OVER_PROVISIONED_IDLE = 40; // percent of paid capacity left idle
export const QUEUE_TOLERANCE = 5; // a peak queue at or below this percent of peak demand is a minor delay

export function verdict(s, { queueMinutes, peakQueue, peakDemand, idlePercent, causes }) {
  if (s.concurrencyTarget > s.batchSize) {
    return { problem: 'mismatch', text: `Target mismatched with batch size. The concurrency target of ${s.concurrencyTarget} is above the replica batch size of ${s.batchSize}. The autoscaler counts room that the engine does not have, so requests queue inside the replicas before any scale-up occurs. Set the concurrency target to match the batch size.` };
  }
  const minorQueue = peakQueue <= (QUEUE_TOLERANCE / 100) * peakDemand;
  if (queueMinutes > 0 && !minorQueue) {
    const main = Object.entries(causes).sort((a, b) => b[1] - a[1])[0][0];
    if (main === 'max') return { problem: 'max', text: `Under-provisioned. Demand exceeds what ${Math.max(s.maxReplicas, s.minReplicas)} replicas can serve, so requests queue even at max replicas. Raise max replicas.` };
    if (main === 'coldstart') return { problem: 'coldstart', text: `Cold starts too slow. Requests queue while new replicas spend ${s.coldStart} minutes starting up. Shorten the cold start, or raise min replicas to absorb sudden demand.${s.minReplicas === 0 ? ' With min replicas at 0, the first request after an idle period waits for a full cold start. A development environment can accept that wait. A latency-sensitive production service cannot.' : ''}` };
    return { problem: 'window', text: `Under-provisioned. The autoscaler reacts after demand has already arrived, because the ${s.autoscalingWindow}-minute window averages the rise away. Shorten the autoscaling window, or raise min replicas.` };
  }
  if (idlePercent >= OVER_PROVISIONED_IDLE) {
    return { problem: 'over', text: `Over-provisioned. ${Math.round(idlePercent)} percent of paid capacity sat idle. Lower min replicas, shorten the scale-down delay, or raise a concurrency target that sits below the batch size.` };
  }
  if (queueMinutes > 0) {
    return { problem: 'none', text: `Well matched. Short queues of at most ${peakQueue} requests formed while new replicas started. A replica cannot serve before its cold start ends, so rising traffic always waits briefly. Most paid capacity served traffic.` };
  }
  return { problem: 'none', text: 'Well matched. No request queued, and most paid capacity served traffic.' };
}
