<script>
  import { untrack } from 'svelte';
  import { DEFAULTS, MINUTES, PATTERNS, PRESETS, QUEUE_TOLERANCE, OVER_PROVISIONED_IDLE, simulate } from './autoscaling.js';

  let {
    pattern = DEFAULTS.pattern,
    minReplicas = DEFAULTS.minReplicas,
    maxReplicas = DEFAULTS.maxReplicas,
    concurrencyTarget = DEFAULTS.concurrencyTarget,
    batchSize = DEFAULTS.batchSize,
    autoscalingWindow = DEFAULTS.autoscalingWindow,
    scaleDownDelay = DEFAULTS.scaleDownDelay,
    coldStart = DEFAULTS.coldStart,
    title = 'Autoscaling Simulator',
    headingLevel = 2,
  } = $props();

  const uid = $props.id();
  // Props set the starting values only. The learner owns the settings after that.
  let s = $state(untrack(() => ({ pattern, minReplicas, maxReplicas, concurrencyTarget, batchSize, autoscalingWindow, scaleDownDelay, coldStart })));
  let activePreset = $state('');

  const sliders = [
    { key: 'minReplicas', label: 'Min replicas', min: 0, max: 10, unit: ['replica', 'replicas'] },
    { key: 'maxReplicas', label: 'Max replicas', min: 1, max: 20, unit: ['replica', 'replicas'] },
    { key: 'concurrencyTarget', label: 'Concurrency target', min: 1, max: 64, unit: ['request per replica', 'requests per replica'] },
    { key: 'batchSize', label: 'Replica batch size', min: 1, max: 64, unit: ['request per replica', 'requests per replica'] },
    { key: 'autoscalingWindow', label: 'Autoscaling window', min: 1, max: 15, unit: ['minute', 'minutes'] },
    { key: 'scaleDownDelay', label: 'Scale down delay', min: 0, max: 30, unit: ['minute', 'minutes'] },
    { key: 'coldStart', label: 'Cold start time', min: 0, max: 20, unit: ['minute', 'minutes'] },
  ];

  const r = $derived(simulate(s));
  const heading = $derived(headingLevel === 3 ? 'h3' : 'h2');

  function loadPreset(p) {
    Object.assign(s, p.settings);
    activePreset = p.name;
  }

  // Chart geometry. Discrete minutes are drawn as steps.
  const W = 640, H = 316, L = 52, R = 52, T = 34, B = 58;
  const PW = W - L - R, PH = H - T - B;
  const x = (t) => L + (t * PW) / MINUTES;
  // Axis tops divide into whole-number quarters, for example 40, 120, or 160.
  const niceCeil = (v) => {
    const p = 10 ** Math.floor(Math.log10(Math.max(v, 20) / 2));
    return [2, 4, 6, 8, 10, 12, 16, 20].map((m) => m * p).find((m) => m >= v);
  };
  const yMax = $derived(niceCeil(Math.max(...r.rows.map((row) => Math.max(row.demand, row.capacity)))));
  const rMax = $derived(Math.max(1, r.settings.maxReplicas));
  const y = (v) => T + PH - (v / yMax) * PH;
  const yR = (v) => T + PH - (v / rMax) * PH;
  const step = (vals, fy) => `M${x(0)},${fy(vals[0])}` + vals.slice(1).map((v, i) => ` H${x(i + 1)} V${fy(v)}`).join('') + ` H${x(MINUTES)}`;
  const demandPath = $derived(step(r.rows.map((row) => row.demand), y));
  const capPath = $derived(step(r.rows.map((row) => row.capacity), y));
  const replicaPath = $derived(step(r.rows.map((row) => row.ready + row.starting), yR));
  const yTicks = $derived([0, 0.25, 0.5, 0.75, 1].map((f) => f * yMax));
  const rTicks = $derived([...new Set([0, Math.round(rMax / 2), rMax])]);

  // Contiguous queued runs, for the labels above the plot.
  const runs = $derived.by(() => {
    const out = [];
    for (const row of r.rows) {
      if (!row.queued) continue;
      const last = out.at(-1);
      if (last && last.end === row.t) last.end = row.t + 1;
      else out.push({ start: row.t, end: row.t + 1 });
    }
    return out;
  });

  const fmt = (v, d = 0) => v.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
  const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

  const chartLabel = $derived(
    `Chart of demand and ready capacity over ${MINUTES} minutes, in concurrent requests, with the allocated replica count on a second axis. ` +
      (runs.length
        ? `Requests queue during ${plural(runs.length, 'period', 'periods')}: ${runs.map((q) => `minutes ${q.start} to ${q.end - 1}`).join(', ')}. Peak queue is ${r.peakQueue} requests.`
        : 'Ready capacity stays at or above demand for the whole run.'),
  );

  const summary = $derived(
    `${PATTERNS[r.settings.pattern].label}. Requests queued during ${plural(r.queueMinutes, 'minute', 'minutes')} of ${MINUTES}, with a peak queue of ${plural(r.peakQueue, 'request', 'requests')}. ` +
      `The run used ${fmt(r.replicaHours, 1)} GPU replica-hours, and ${fmt(r.idlePercent)} percent of ready capacity sat idle.` +
      (r.maxAdjusted ? ` Max replicas is below min replicas, so the model uses ${r.settings.maxReplicas} for both.` : ''),
  );
</script>

<section class="sim" aria-labelledby="{uid}-title">
  <svelte:element this={heading} id="{uid}-title">{title}</svelte:element>
  <p>
    Configure a traffic-based autoscaler and watch it respond to demand over {MINUTES} minutes. Each preset loads a
    scenario from the chapter.
  </p>

  <div class="presets" role="group" aria-label="Preset scenarios">
    {#each PRESETS as p (p.name)}
      <button type="button" aria-pressed={activePreset === p.name} onclick={() => loadPreset(p)}>{p.name}</button>
    {/each}
  </div>

  <div class="controls">
    <div class="control wide">
      <label for="{uid}-pattern">Traffic pattern</label>
      <select id="{uid}-pattern" bind:value={s.pattern} onchange={() => (activePreset = '')} aria-describedby="{uid}-pattern-desc">
        {#each Object.entries(PATTERNS) as [key, p] (key)}
          <option value={key}>{p.label}</option>
        {/each}
      </select>
      <p class="hint" id="{uid}-pattern-desc">{PATTERNS[s.pattern].description}</p>
    </div>
    {#each sliders as c (c.key)}
      <div class="control">
        <label for="{uid}-{c.key}">{c.label}</label>
        <div class="row">
          <input
            id="{uid}-{c.key}"
            type="range"
            min={c.min}
            max={c.max}
            step="1"
            bind:value={s[c.key]}
            oninput={() => (activePreset = '')}
          />
          <output for="{uid}-{c.key}">{plural(s[c.key], ...c.unit)}</output>
        </div>
      </div>
    {/each}
  </div>

  <figure class="chart">
    <svg viewBox="0 0 {W} {H}" role="img" aria-label={chartLabel}>
      <defs>
        <pattern id="{uid}-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="6" height="6" fill="var(--tessera-bg, #fff)" />
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--tessera-error, #dc2626)" stroke-width="2.5" />
        </pattern>
      </defs>

      {#each yTicks as v (v)}
        <line x1={L} x2={L + PW} y1={y(v)} y2={y(v)} class="grid" />
        <text x={L - 6} y={y(v) + 4} text-anchor="end">{fmt(v)}</text>
      {/each}
      {#each rTicks as v (v)}
        <text x={L + PW + 6} y={yR(v) + 4}>{v}</text>
      {/each}
      {#each [0, 20, 40, 60, 80, 100, 120] as t (t)}
        <text x={x(t)} y={T + PH + 26} text-anchor="middle">{t}</text>
      {/each}
      <text x={L + PW / 2} y={H - 6} text-anchor="middle">Minute</text>
      <text class="axis-title" x="14" y={T + PH / 2} text-anchor="middle" transform="rotate(-90 14 {T + PH / 2})">Requests</text>
      <text class="axis-title" x={W - 12} y={T + PH / 2} text-anchor="middle" transform="rotate(90 {W - 12} {T + PH / 2})">Replicas</text>

      {#each r.rows as row (row.t)}
        {#if row.queued}
          <rect x={x(row.t)} y={y(row.demand)} width={x(1) - x(0)} height={y(row.capacity) - y(row.demand)} fill="url(#{uid}-hatch)" />
        {/if}
      {/each}
      {#each runs as q, i (q.start)}
        <line x1={x(q.start)} x2={x(q.end)} y1={T - 8} y2={T - 8} class="bracket" />
        {#if i === 0 || x(q.start) - x(runs[i - 1].start) > 90}
          <text x={(x(q.start) + x(q.end)) / 2} y={T - 14} text-anchor="middle" class="qlabel">Queued</text>
        {/if}
      {/each}

      <line x1={L} x2={L} y1={T} y2={T + PH} class="axis" />
      <line x1={L + PW} x2={L + PW} y1={T} y2={T + PH} class="axis" />
      <line x1={L} x2={L + PW} y1={T + PH} y2={T + PH} class="axis" />
      <path d={demandPath} class="demand" />
      <path d={capPath} class="capacity" />
      <path d={replicaPath} class="replicas" />
    </svg>
    <figcaption>
      <ul class="legend">
        <li><svg viewBox="0 0 30 10" aria-hidden="true"><line x1="0" y1="5" x2="30" y2="5" class="demand" /></svg>Demand, solid line (left axis)</li>
        <li><svg viewBox="0 0 30 10" aria-hidden="true"><line x1="0" y1="5" x2="30" y2="5" class="capacity" /></svg>Ready capacity, dashed line (left axis)</li>
        <li><svg viewBox="0 0 30 10" aria-hidden="true"><line x1="0" y1="5" x2="30" y2="5" class="replicas" /></svg>Allocated replicas, dotted line (right axis)</li>
        <li><svg viewBox="0 0 30 10" aria-hidden="true"><rect width="30" height="10" fill="url(#{uid}-hatch)" /></svg>Queued requests, hatched</li>
      </ul>
    </figcaption>
  </figure>

  <dl class="stats">
    <div><dt>Minutes with queued requests</dt><dd>{r.queueMinutes} of {MINUTES}</dd></div>
    <div><dt>Peak queue</dt><dd>{r.peakQueue} requests</dd></div>
    <div><dt>GPU replica-hours</dt><dd>{fmt(r.replicaHours, 1)}</dd></div>
    <div><dt>Average idle capacity</dt><dd>{fmt(r.idlePercent)} percent</dd></div>
  </dl>

  <div class="status" role="status">
    <p>{summary}</p>
    <p><strong>Verdict:</strong> {r.verdict.text}</p>
  </div>

  <details>
    <summary>How this model works</summary>
    <ul>
      <li>Time runs in whole minutes from 0 to {MINUTES - 1}. Demand D(t) is the number of concurrent in-flight requests during minute t. Each traffic pattern is a fixed curve with no randomness, so every run repeats exactly.</li>
      <li>Each minute, the autoscaler averages demand over the last W minutes, where W is the autoscaling window. Desired replicas equal ceil(average demand ÷ concurrency target), clamped between min replicas and max replicas. Early in the run, the window covers only the minutes that exist.</li>
      <li>When desired replicas exceed the allocated replicas, the autoscaler starts new replicas at once. A new replica serves only after the cold start time has passed.</li>
      <li>A scale-down happens only after desired replicas stay low for the full scale down delay. The replica count falls to the highest desired count seen during that delay. Replicas still in cold start are cancelled before running replicas stop.</li>
      <li>Ready capacity equals ready replicas × replica batch size. The batch size is the number of requests the engine actually processes at once. The concurrency target only steers the autoscaler. A target above the batch size therefore leaves requests waiting inside the replicas.</li>
      <li>Queued requests equal max(0, D(t) − ready capacity). Demand already counts every in-flight request, so the queue does not carry over from one minute to the next.</li>
      <li>GPU replica-hours add up allocated replicas each minute, including replicas in cold start, and divide by 60. A replica in cold start already holds its GPU.</li>
      <li>Average idle capacity is the share of ready capacity, summed over all minutes, that served no request.</li>
      <li>The run starts warm, with enough replicas for minute 0 already serving.</li>
      <li>A queue counts as a problem when its peak exceeds {QUEUE_TOLERANCE} percent of peak demand. Smaller queues appear on any rising traffic, because no replica serves before its cold start ends. Idle capacity of {OVER_PROVISIONED_IDLE} percent or more counts as over-provisioned.</li>
      <li>The model ignores request size, routing, and GPU utilization. Every request occupies one batch slot.</li>
    </ul>
  </details>
</section>

<style>
  .sim {
    border: 1px solid var(--tessera-border);
    border-radius: 0.5rem;
    padding: var(--tessera-spacing-md);
    margin: var(--tessera-spacing-lg) 0;
    background: var(--tessera-bg);
    color: var(--tessera-text);
  }
  .sim > :global(h2),
  .sim > :global(h3) {
    margin-top: 0;
  }
  .presets {
    display: flex;
    flex-wrap: wrap;
    gap: var(--tessera-spacing-sm);
    margin-bottom: var(--tessera-spacing-md);
  }
  .presets button {
    font: inherit;
    padding: 0.4rem 0.8rem;
    border: 1px solid var(--tessera-primary);
    border-radius: 0.375rem;
    background: var(--tessera-bg);
    color: var(--tessera-primary);
    cursor: pointer;
  }
  .presets button[aria-pressed='true'] {
    background: var(--tessera-primary);
    color: var(--tessera-bg);
  }
  .presets button:focus-visible,
  select:focus-visible,
  input:focus-visible {
    outline: 3px solid var(--tessera-primary);
    outline-offset: 2px;
  }
  .controls {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
    gap: var(--tessera-spacing-sm) var(--tessera-spacing-md);
  }
  .control {
    min-width: 0;
  }
  .control.wide {
    grid-column: 1 / -1;
  }
  .control label {
    display: block;
    font-weight: 600;
  }
  .row {
    display: flex;
    align-items: center;
    gap: var(--tessera-spacing-sm);
  }
  .row input {
    flex: 1;
    min-width: 0;
  }
  .row output {
    flex: 0 0 auto;
    min-width: 6.5rem;
    font-variant-numeric: tabular-nums;
  }
  select {
    font: inherit;
    padding: 0.3rem;
    max-width: 100%;
    color: var(--tessera-text);
    background: var(--tessera-bg);
    border: 1px solid var(--tessera-text-light);
    border-radius: 0.25rem;
  }
  .hint {
    margin: 0.25rem 0 0;
    color: var(--tessera-text-light);
    font-size: 0.9rem;
  }
  .chart {
    margin: var(--tessera-spacing-md) 0;
    container-type: inline-size;
  }
  /* On a narrow screen the chart shrinks, so its text grows in viewBox units to stay legible.
     The legend names each axis, so the rotated axis titles drop out. */
  @container (max-width: 480px) {
    .chart svg text {
      font-size: 24px;
    }
    .chart .axis-title {
      display: none;
    }
  }
  .chart > svg {
    width: 100%;
    height: auto;
    display: block;
  }
  svg text {
    font-size: 13px;
    fill: var(--tessera-text);
  }
  .grid {
    stroke: var(--tessera-border);
  }
  .axis {
    stroke: var(--tessera-text-light);
  }
  .demand,
  .capacity,
  .replicas,
  .bracket {
    fill: none;
  }
  .demand {
    stroke: var(--tessera-primary);
    stroke-width: 2.5;
  }
  .capacity {
    stroke: var(--tessera-text);
    stroke-width: 2;
    stroke-dasharray: 7 4;
  }
  .replicas {
    stroke: var(--tessera-warning);
    stroke-width: 2.5;
    stroke-dasharray: 1.5 4;
    stroke-linecap: round;
  }
  .bracket {
    stroke: var(--tessera-error);
    stroke-width: 3;
  }
  .qlabel {
    font-weight: 600;
  }
  .legend {
    list-style: none;
    padding: 0;
    margin: var(--tessera-spacing-sm) 0 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem var(--tessera-spacing-md);
    font-size: 0.9rem;
  }
  .legend li {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  .legend svg {
    width: 30px;
    height: 10px;
    flex: 0 0 auto;
  }
  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 9rem), 1fr));
    gap: var(--tessera-spacing-sm);
    margin: 0 0 var(--tessera-spacing-md);
  }
  .stats div {
    background: var(--tessera-bg-secondary);
    border: 1px solid var(--tessera-border);
    border-radius: 0.375rem;
    padding: var(--tessera-spacing-sm);
  }
  .stats dt {
    font-size: 0.85rem;
    color: var(--tessera-text);
  }
  .stats dd {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  .status {
    border-left: 4px solid var(--tessera-primary);
    background: var(--tessera-bg-secondary);
    padding: var(--tessera-spacing-sm) var(--tessera-spacing-md);
  }
  .status p {
    margin: 0.25rem 0;
  }
  details {
    margin-top: var(--tessera-spacing-md);
  }
  summary {
    cursor: pointer;
    font-weight: 600;
  }
  @media (prefers-reduced-motion: reduce) {
    * {
      transition: none !important;
      animation: none !important;
    }
  }
</style>
