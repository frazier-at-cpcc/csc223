<script>
  import { untrack } from 'svelte';
  import { DEFAULTS, PRESETS, HOURS_PER_MONTH, summarize, apiMonthly, dedicatedMonthly, gpuHoursPerRequest } from './cost-crossover.js';

  let {
    title = 'Cost Crossover: Per-Token API Versus Dedicated GPUs',
    headingLevel = 2,
    priceIn = DEFAULTS.priceIn,
    priceOut = DEFAULTS.priceOut,
    inTokens = DEFAULTS.inTokens,
    outTokens = DEFAULTS.outTokens,
    requests = DEFAULTS.requests,
    gpuPrice = DEFAULTS.gpuPrice,
    gpusPerReplica = DEFAULTS.gpusPerReplica,
    throughput = DEFAULTS.throughput,
    utilization = DEFAULTS.utilization,
    minReplicas = DEFAULTS.minReplicas,
    engCost = DEFAULTS.engCost,
  } = $props();

  const uid = $props.id();
  let tag = $derived(headingLevel === 3 ? 'h3' : 'h2');
  let subTag = $derived(headingLevel === 3 ? 'h4' : 'h3');

  // Initial values come from props once; the learner owns the state afterwards.
  let v = $state(
    untrack(() => ({ priceIn, priceOut, inTokens, outTokens, gpuPrice, gpusPerReplica, throughput, utilization, minReplicas, engCost })),
  );
  let reqExp = $state(untrack(() => Math.log10(requests)));
  let active = $state(null);

  const MIN_EXP = 3;
  const MAX_EXP = 9;
  const roundSig = (x, n = 3) => {
    if (x <= 0) return 0;
    const f = 10 ** (Math.floor(Math.log10(x)) - n + 1);
    return Math.round(x / f) * f;
  };

  let p = $derived({ ...v, requests: roundSig(10 ** reqExp) });
  let s = $derived(summarize(p));

  const usd0 = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const usd2 = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const num0 = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
  const num1 = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 });
  const money = (x) => (Math.abs(x) < 100 ? usd2.format(x) : usd0.format(x));
  const hours = (x) => (x < 100 ? num1.format(x) : num0.format(x));

  function applyPreset(preset) {
    const { requests: r, ...rest } = preset.values;
    v = { ...rest };
    reqExp = Math.log10(r);
    active = preset.name;
  }

  const apiSliders = [
    { key: 'priceIn', label: 'Price per million input tokens', min: 0, max: 15, step: 0.05, fmt: (x) => usd2.format(x) },
    { key: 'priceOut', label: 'Price per million output tokens', min: 0, max: 75, step: 0.25, fmt: (x) => usd2.format(x) },
    { key: 'inTokens', label: 'Average input tokens per request', min: 10, max: 20000, step: 10, fmt: (x) => `${num0.format(x)} tokens` },
    { key: 'outTokens', label: 'Average output tokens per request', min: 10, max: 4000, step: 10, fmt: (x) => `${num0.format(x)} tokens` },
  ];
  const dedSliders = [
    { key: 'gpuPrice', label: 'GPU price per hour', min: 0.25, max: 12, step: 0.05, fmt: (x) => `${usd2.format(x)} per GPU-hour` },
    { key: 'gpusPerReplica', label: 'GPUs per replica', min: 1, max: 8, step: 1, fmt: (x) => `${x} ${x === 1 ? 'GPU' : 'GPUs'}` },
    { key: 'throughput', label: 'Replica output throughput at the target latency', min: 10, max: 20000, step: 1, fmt: (x) => `${num0.format(x)} tokens per second` },
    { key: 'utilization', label: 'Target utilization', min: 10, max: 100, step: 5, fmt: (x) => `${x} percent` },
    { key: 'minReplicas', label: 'Minimum always-on replicas (0 means scale to zero)', min: 0, max: 20, step: 1, fmt: (x) => `${x} ${x === 1 ? 'replica' : 'replicas'}` },
    { key: 'engCost', label: 'Monthly engineering and operations cost', min: 0, max: 60000, step: 250, fmt: (x) => usd0.format(x) },
  ];

  let crossText = $derived.by(() => {
    const c = s.crossover;
    if (c.kind === 'none') return 'The lines never cross. Each request costs less on the API than the GPU time it needs on the dedicated deployment, so the API stays cheaper at every volume.';
    if (c.kind === 'always') return 'The lines never cross. With no always-on replicas and no engineering cost, the dedicated deployment is cheaper at every volume.';
    return `The costs cross at about ${num0.format(roundSig(c.requests))} requests per month. Above that volume, the dedicated deployment is cheaper.`;
  });

  let statusText = $derived.by(() => {
    const vol = `At ${num0.format(p.requests)} requests per month, the per-token API costs ${money(s.api)} and the dedicated deployment costs ${money(s.dedicated)}.`;
    const diff = Math.abs(s.api - s.dedicated);
    const which =
      s.cheaper === 'tie'
        ? 'The two options cost the same.'
        : s.cheaper === 'api'
          ? `The per-token API is cheaper by ${money(diff)}.`
          : `The dedicated deployment is cheaper by ${money(diff)}.`;
    return `${vol} ${which} ${crossText}`;
  });

  // ---- Chart: log-log, monthly cost versus monthly requests ----
  // The viewBox follows the rendered width so chart text stays at its real size on a phone.
  let cw = $state(640);
  let narrow = $derived(cw < 480);
  let W = $derived(Math.max(300, Math.min(760, cw)));
  let H = $derived(narrow ? 300 : 360);
  let M = $derived(narrow ? { l: 46, r: 74, t: 32, b: 44 } : { l: 56, r: 92, t: 32, b: 48 });
  let iw = $derived(W - M.l - M.r);
  let ih = $derived(H - M.t - M.b);
  let xs = $derived((r) => M.l + ((Math.log10(r) - MIN_EXP) / (MAX_EXP - MIN_EXP)) * iw);
  const xTicks = [3, 4, 5, 6, 7, 8, 9];
  const xLabel = (e) => ['1K', '10K', '100K', '1M', '10M', '100M', '1B'][e - 3];
  const yLabel = (e) => {
    const n = 10 ** e;
    if (n >= 1e9) return `$${n / 1e9}B`;
    if (n >= 1e6) return `$${n / 1e6}M`;
    if (n >= 1e3) return `$${n / 1e3}K`;
    if (n >= 1) return `$${n}`;
    return `$${n}`;
  };

  let chart = $derived.by(() => {
    const knee = gpuHoursPerRequest(p) > 0 ? s.floorHours / gpuHoursPerRequest(p) : 0;
    const pts = [];
    for (let i = 0; i <= 120; i++) pts.push(10 ** (MIN_EXP + ((MAX_EXP - MIN_EXP) * i) / 120));
    if (knee > 10 ** MIN_EXP && knee < 10 ** MAX_EXP) pts.push(knee);
    pts.sort((a, b) => a - b);
    const api = pts.map((r) => [r, apiMonthly(p, r)]);
    const ded = pts.map((r) => [r, dedicatedMonthly(p, r)]);
    const all = [...api, ...ded].map((d) => d[1]).filter((y) => y > 0);
    const lo = Math.floor(Math.log10(Math.max(Math.min(...all, 1e9), 0.01)));
    const hi = Math.max(lo + 1, Math.ceil(Math.log10(Math.max(...all, 1))));
    const ys = (y) => M.t + ih - ((Math.log10(Math.max(y, 10 ** lo)) - lo) / (hi - lo)) * ih;
    const path = (arr) => arr.map(([r, y], i) => `${i ? 'L' : 'M'}${xs(r).toFixed(1)},${ys(y).toFixed(1)}`).join('');
    const yTicks = [];
    const stride = Math.ceil((hi - lo) / 7);
    for (let e = lo; e <= hi; e += stride) yTicks.push(e);
    // End labels, pushed apart when they would overlap.
    let ya = ys(api.at(-1)[1]);
    let yd = ys(ded.at(-1)[1]);
    if (Math.abs(ya - yd) < 16) {
      const mid = (ya + yd) / 2;
      const up = ya <= yd ? -1 : 1;
      ya = mid + up * 8;
      yd = mid - up * 8;
    }
    const c = s.crossover;
    const cross =
      c.kind === 'at' && c.requests >= 10 ** MIN_EXP && c.requests <= 10 ** MAX_EXP
        ? { x: xs(c.requests), y: ys(apiMonthly(p, c.requests)) }
        : null;
    return { apiPath: path(api), dedPath: path(ded), yTicks, ys, ya, yd, cross };
  });

  let curX = $derived(xs(Math.min(Math.max(p.requests, 10 ** MIN_EXP), 10 ** MAX_EXP)));

  let chartLabel = $derived(
    `Line chart of monthly cost versus monthly requests, both on logarithmic scales from 1 thousand to 1 billion requests. ` +
      `The per-token API is a solid line that rises in proportion to volume. ` +
      `The dedicated deployment is a dashed line that ${s.floorHours > 0 || p.engCost > 0 ? 'stays flat at its minimum monthly cost and then rises' : 'rises in proportion to volume'}. ` +
      (chart.cross ? `A circle marks the crossover at about ${num0.format(roundSig(s.crossover.requests))} requests. ` : 'The lines do not cross in the plotted range. ') +
      `A vertical dotted line marks the current volume of ${num0.format(p.requests)} requests.`,
  );
</script>

<section class="sim" aria-labelledby="{uid}-h">
  <svelte:element this={tag} id="{uid}-h">{title}</svelte:element>
  <p class="cc-intro">
    Compare the monthly cost of a per-token API with a dedicated GPU deployment for the same workload. Adjust the
    workload, the API prices, and the deployment settings to find the volume where the dedicated deployment becomes
    cheaper.
  </p>

  <div class="cc-presets" role="group" aria-label="Scenario presets">
    {#each PRESETS as preset (preset.name)}
      <button type="button" aria-pressed={active === preset.name} onclick={() => applyPreset(preset)}>{preset.name}</button>
    {/each}
  </div>

  <div class="cc-volume">
    <div class="cc-row">
      <label for="{uid}-req">Requests per month</label>
      <output for="{uid}-req">{num0.format(p.requests)} requests</output>
    </div>
    <input
      id="{uid}-req"
      type="range"
      min={MIN_EXP}
      max={MAX_EXP}
      step="0.05"
      bind:value={reqExp}
      oninput={() => (active = null)}
      aria-valuetext="{num0.format(p.requests)} requests per month"
    />
    <p class="cc-hint">The slider moves on a logarithmic scale from 1,000 to 1,000,000,000 requests.</p>
  </div>

  <div class="cc-controls">
    <fieldset>
      <legend>Per-token API</legend>
      {#each apiSliders as c (c.key)}
        <div class="cc-control">
          <div class="cc-row">
            <label for="{uid}-{c.key}">{c.label}</label>
            <output for="{uid}-{c.key}">{c.fmt(v[c.key])}</output>
          </div>
          <input
            id="{uid}-{c.key}"
            type="range"
            min={c.min}
            max={c.max}
            step={c.step}
            bind:value={v[c.key]}
            oninput={() => (active = null)}
            aria-valuetext={c.fmt(v[c.key])}
          />
        </div>
      {/each}
    </fieldset>
    <fieldset>
      <legend>Dedicated deployment</legend>
      {#each dedSliders as c (c.key)}
        <div class="cc-control">
          <div class="cc-row">
            <label for="{uid}-{c.key}">{c.label}</label>
            <output for="{uid}-{c.key}">{c.fmt(v[c.key])}</output>
          </div>
          <input
            id="{uid}-{c.key}"
            type="range"
            min={c.min}
            max={c.max}
            step={c.step}
            bind:value={v[c.key]}
            oninput={() => (active = null)}
            aria-valuetext={c.fmt(v[c.key])}
          />
        </div>
      {/each}
    </fieldset>
  </div>

  <p class="cc-status" role="status">{statusText}</p>

  <div class="cc-results">
    <div class="cc-card" class:win={s.cheaper === 'api'}>
      <p class="cc-card-title">Per-token API{#if s.cheaper === 'api'}<span class="cc-badge">Cheaper</span>{/if}</p>
      <dl>
        <dt>Monthly cost</dt>
        <dd>{money(s.api)}</dd>
        <dt>Cost per million output tokens</dt>
        <dd>{Number.isFinite(s.apiPerMOut) ? usd2.format(s.apiPerMOut) : 'Not defined'}</dd>
      </dl>
      <p class="cc-deriv">
        {num0.format(p.requests)} requests × ({num0.format(v.inTokens)} × {usd2.format(v.priceIn)} + {num0.format(v.outTokens)} ×
        {usd2.format(v.priceOut)}) ÷ 1,000,000 = {money(s.api)}
      </p>
    </div>
    <div class="cc-card" class:win={s.cheaper === 'dedicated'}>
      <p class="cc-card-title">Dedicated deployment{#if s.cheaper === 'dedicated'}<span class="cc-badge">Cheaper</span>{/if}</p>
      <dl>
        <dt>Monthly cost</dt>
        <dd>{money(s.dedicated)}</dd>
        <dt>Cost per million output tokens</dt>
        <dd>{Number.isFinite(s.dedicatedPerMOut) ? usd2.format(s.dedicatedPerMOut) : 'Not defined'}</dd>
      </dl>
      <ol class="cc-deriv">
        <li>
          GPU-hours needed = {num0.format(s.outputMillions * 1e6)} output tokens ÷ ({num0.format(v.throughput)} tokens per second ×
          3,600 seconds × {v.utilization / 100}) × {v.gpusPerReplica} {v.gpusPerReplica === 1 ? 'GPU' : 'GPUs'} = {hours(s.neededGpuHours)} GPU-hours
        </li>
        <li>
          Always-on floor = {v.minReplicas} {v.minReplicas === 1 ? 'replica' : 'replicas'} × {v.gpusPerReplica} {v.gpusPerReplica === 1 ? 'GPU' : 'GPUs'} × {HOURS_PER_MONTH} hours = {num0.format(s.floorHours)} GPU-hours
        </li>
        <li>
          Billed GPU-hours = the larger value = {hours(s.gpuHours)} GPU-hours{#if s.floorBinds}, set by the floor{/if}
        </li>
        <li>
          Monthly cost = {hours(s.gpuHours)} × {usd2.format(v.gpuPrice)} + {usd0.format(v.engCost)} engineering = {money(s.dedicated)}
        </li>
      </ol>
    </div>
  </div>

  <figure class="cc-figure" bind:clientWidth={cw}>
    <svg viewBox="0 0 {W} {H}" role="img" aria-label={chartLabel}>
      <g class="cc-grid">
        {#each xTicks as e (e)}
          <line x1={xs(10 ** e)} x2={xs(10 ** e)} y1={M.t} y2={M.t + ih} />
          {#if !narrow || e % 2 === 1}<text x={xs(10 ** e)} y={M.t + ih + 18} text-anchor="middle">{xLabel(e)}</text>{/if}
        {/each}
        {#each chart.yTicks as e (e)}
          <line x1={M.l} x2={M.l + iw} y1={chart.ys(10 ** e)} y2={chart.ys(10 ** e)} />
          <text x={M.l - 6} y={chart.ys(10 ** e) + 4} text-anchor="end">{yLabel(e)}</text>
        {/each}
      </g>
      <text class="cc-axis" x={M.l + iw / 2} y={H - 6} text-anchor="middle">Requests per month (log scale)</text>
      <text class="cc-axis" x="4" y="16">Monthly cost (log scale)</text>

      <line class="cc-now" x1={curX} x2={curX} y1={M.t} y2={M.t + ih} />
      <path class="cc-api" d={chart.apiPath} />
      <path class="cc-ded" d={chart.dedPath} />
      <text class="cc-end" x={M.l + iw + 6} y={chart.ya + 4}>API</text>
      <text class="cc-end" x={M.l + iw + 6} y={chart.yd + 4}>Dedicated</text>
      {#if chart.cross}
        <line class="cc-crossline" x1={chart.cross.x} x2={chart.cross.x} y1={chart.cross.y} y2={M.t + ih} />
        <circle class="cc-cross" cx={chart.cross.x} cy={chart.cross.y} r="6" />
        <text class="cc-crosslabel" x={chart.cross.x} y={chart.cross.y - 12} text-anchor={chart.cross.x > M.l + iw * 0.7 ? 'end' : 'middle'}>
          Crossover
        </text>
      {/if}
    </svg>
    <figcaption>
      <span class="cc-key"><svg viewBox="0 0 32 8" aria-hidden="true"><line class="cc-api" x1="0" y1="4" x2="32" y2="4" /></svg> Per-token API, solid line</span>
      <span class="cc-key"><svg viewBox="0 0 32 8" aria-hidden="true"><line class="cc-ded" x1="0" y1="4" x2="32" y2="4" /></svg> Dedicated deployment, dashed line</span>
      <span class="cc-key"><svg viewBox="0 0 32 8" aria-hidden="true"><line class="cc-now" x1="0" y1="4" x2="32" y2="4" /></svg> Current volume, dotted line</span>
    </figcaption>
  </figure>

  <details class="cc-details">
    <summary>How this model works</summary>
    <p>The model compares one month of cost. A month is 730 hours, which is 8,760 hours per year divided by 12.</p>
    <svelte:element this={subTag} class="cc-sub">Per-token API</svelte:element>
    <p>
      Monthly cost = requests × (input tokens × input price + output tokens × output price) ÷ 1,000,000. The prices are per
      million tokens. Cost grows linearly with volume. The model ignores cache-hit discounts, volume discounts, and rate
      limits.
    </p>
    <svelte:element this={subTag} class="cc-sub">Dedicated deployment</svelte:element>
    <p>
      GPU-hours needed = monthly output tokens ÷ (replica throughput × 3,600 × utilization) × GPUs per replica. Replica
      throughput is the number of output tokens per second that one replica produces across all of its concurrent requests
      while it still meets the latency target. A benchmark at the workload's real input and output lengths supplies this
      number. Utilization is the average share of that capacity that traffic uses. Autoscaling needs headroom for traffic
      peaks, so utilization stays below 100 percent.
    </p>
    <p>
      The always-on floor is minimum replicas × GPUs per replica × 730 hours. The deployment pays for the larger of the two
      GPU-hour figures. Monthly cost = billed GPU-hours × GPU price per hour + engineering and operations cost. That sum is
      the total cost of ownership (TCO) for the month.
    </p>
    <p>
      The model sizes GPU time by output tokens alone. Longer inputs add prefill work and lower the replica throughput. A
      change to average input tokens therefore changes the API cost here, but the dedicated cost changes only after you
      lower the throughput to match a new benchmark.
    </p>
    <p>
      Above the floor, the model assumes that autoscaling tracks traffic exactly and bills fractional replica-hours. Real
      autoscalers add replicas in whole steps and keep some extra capacity. A deployment with zero minimum replicas scales
      to zero, and the model does not count the cold-start delay that the first request after an idle period pays.
    </p>
    <svelte:element this={subTag} class="cc-sub">Outputs</svelte:element>
    <p>
      Cost per million output tokens = monthly cost ÷ millions of output tokens. On the API side this figure includes
      the input-token cost. On the dedicated side it changes with volume, so it describes only the current volume. Compare
      the total monthly costs to decide. Chapter 7 advises against judging a dedicated deployment by a per-token price
      derived from GPU spending.
    </p>
    <p>
      The crossover is the request volume where both monthly costs are equal. Below the floor, the dedicated cost is flat,
      so the crossover is (floor GPU-hours × GPU price + engineering cost) ÷ API cost per request. Above the floor, it is
      engineering cost ÷ (API cost per request − dedicated GPU cost per request). If each request costs less on the API than
      its GPU time costs on the dedicated deployment, the lines never cross.
    </p>
    <p>
      The default settings reproduce the Chapter 7 cost example. One million requests at 1,000 input and 500 output tokens
      equal 1,000 million input and 500 million output tokens, so the API costs $6,250. At 124 tokens per second and 70
      percent utilization on one GPU, those output tokens need about 1,600 GPU-hours, which cost about $5,600 at $3.50 per
      GPU-hour.
    </p>
  </details>
</section>

<style>
  .sim {
    margin: var(--tessera-spacing-lg) 0;
    padding: var(--tessera-spacing-md);
    border: 1px solid var(--tessera-border);
    border-radius: 8px;
    background: var(--tessera-bg);
    color: var(--tessera-text);
    min-width: 0;
  }
  .sim > :global(h2),
  .sim > :global(h3) {
    margin-top: 0;
  }
  .cc-intro {
    margin-top: 0;
  }
  .cc-presets {
    display: flex;
    flex-wrap: wrap;
    gap: var(--tessera-spacing-sm);
    margin-bottom: var(--tessera-spacing-md);
  }
  .cc-presets button {
    font: inherit;
    font-size: 0.9rem;
    padding: 0.4rem 0.75rem;
    border: 1px solid var(--tessera-primary);
    border-radius: 999px;
    background: var(--tessera-bg);
    color: var(--tessera-primary);
    cursor: pointer;
  }
  .cc-presets button[aria-pressed='true'] {
    background: var(--tessera-primary);
    color: var(--tessera-bg);
  }
  .cc-presets button:focus-visible,
  input[type='range']:focus-visible,
  summary:focus-visible {
    outline: 3px solid var(--tessera-primary);
    outline-offset: 2px;
  }
  .cc-volume,
  fieldset {
    border: 1px solid var(--tessera-border);
    border-radius: 6px;
    padding: var(--tessera-spacing-sm) var(--tessera-spacing-md) var(--tessera-spacing-md);
    margin: 0 0 var(--tessera-spacing-md);
    min-width: 0;
  }
  legend {
    font-weight: 700;
    padding: 0 0.25rem;
  }
  .cc-controls {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
    gap: 0 var(--tessera-spacing-md);
  }
  .cc-control + .cc-control {
    margin-top: var(--tessera-spacing-sm);
  }
  .cc-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0 var(--tessera-spacing-sm);
    font-size: 0.9rem;
  }
  .cc-row label {
    font-weight: 600;
  }
  output {
    font-variant-numeric: tabular-nums;
  }
  input[type='range'] {
    width: 100%;
    margin: 0.25rem 0 0;
    accent-color: var(--tessera-primary);
  }
  .cc-hint {
    margin: 0.25rem 0 0;
    font-size: 0.85rem;
    color: var(--tessera-text-light);
  }
  .cc-status {
    padding: var(--tessera-spacing-sm) var(--tessera-spacing-md);
    border-left: 4px solid var(--tessera-primary);
    background: var(--tessera-bg-secondary);
    margin: 0 0 var(--tessera-spacing-md);
  }
  .cc-results {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
    gap: var(--tessera-spacing-md);
  }
  .cc-card {
    border: 1px solid var(--tessera-border);
    border-radius: 6px;
    padding: var(--tessera-spacing-sm) var(--tessera-spacing-md);
    min-width: 0;
  }
  .cc-card.win {
    border: 2px solid var(--tessera-success);
  }
  .cc-card-title {
    font-weight: 700;
    margin: 0 0 0.25rem;
  }
  .cc-badge {
    margin-left: 0.5rem;
    padding: 0.05rem 0.5rem;
    border: 1px solid var(--tessera-success);
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 600;
  }
  dl {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.15rem var(--tessera-spacing-sm);
    margin: 0;
  }
  dt {
    font-size: 0.9rem;
  }
  dd {
    margin: 0;
    font-weight: 700;
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
  .cc-deriv {
    font-size: 0.85rem;
    margin: var(--tessera-spacing-sm) 0 0;
    overflow-wrap: anywhere;
  }
  ol.cc-deriv {
    padding-left: 1.25rem;
  }
  .cc-figure {
    margin: var(--tessera-spacing-md) 0;
  }
  .cc-figure svg[role='img'] {
    width: 100%;
    height: auto;
    display: block;
  }
  .cc-grid line {
    stroke: var(--tessera-border);
    stroke-width: 1;
  }
  .cc-grid text,
  .cc-axis,
  .cc-end,
  .cc-crosslabel {
    fill: var(--tessera-text);
    font-size: 13px;
  }
  .cc-end,
  .cc-crosslabel {
    font-weight: 700;
  }
  .cc-api {
    fill: none;
    stroke: var(--tessera-primary);
    stroke-width: 3;
  }
  .cc-ded {
    fill: none;
    stroke: var(--tessera-warning);
    stroke-width: 3;
    stroke-dasharray: 9 5;
  }
  .cc-now {
    stroke: var(--tessera-text);
    stroke-width: 1.5;
    stroke-dasharray: 2 4;
  }
  .cc-crossline {
    stroke: var(--tessera-text);
    stroke-width: 1;
    stroke-dasharray: 4 3;
  }
  .cc-cross {
    fill: var(--tessera-bg);
    stroke: var(--tessera-text);
    stroke-width: 2.5;
  }
  figcaption {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem var(--tessera-spacing-md);
    font-size: 0.85rem;
    margin-top: var(--tessera-spacing-sm);
  }
  .cc-key {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }
  .cc-key svg {
    width: 32px;
    height: 8px;
  }
  .cc-details {
    border-top: 1px solid var(--tessera-border);
    padding-top: var(--tessera-spacing-sm);
  }
  .cc-details summary {
    cursor: pointer;
    font-weight: 600;
  }
  .cc-sub {
    font-size: 1rem;
    margin: var(--tessera-spacing-md) 0 0.25rem;
  }
</style>
