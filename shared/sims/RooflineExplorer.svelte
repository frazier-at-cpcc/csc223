<script>
  import { untrack } from 'svelte';
  import { GPUS, WORKLOADS, roofline } from './roofline.js';

  let {
    gpu = 'h100',
    workload = 'decode',
    batch = 1,
    title = 'Roofline explorer',
    headingLevel = 2,
  } = $props();

  const uid = $props.id();
  const hTag = $derived(headingLevel === 3 ? 'h3' : 'h2');

  let gpuId = $state(untrack(() => (GPUS[gpu] ? gpu : 'h100')));
  let wlId = $state(untrack(() => (WORKLOADS[workload] ? workload : 'decode')));
  let n = $state(untrack(() => clamp(batch, WORKLOADS[wlId].max)));
  let fp8 = $state(false);

  function clamp(v, max) {
    return Math.min(max, Math.max(1, Math.round(Number(v) || 1)));
  }

  const presets = [
    { label: 'Single-user decode on H100', gpu: 'h100', wl: 'decode', n: 1 },
    { label: 'Large-batch decode', gpu: 'h100', wl: 'decode', n: 512 },
    { label: 'Prefill of a long prompt', gpu: 'h100', wl: 'prefill', n: 4096 },
    { label: 'Same decode on B200', gpu: 'b200', wl: 'decode', n: 1 },
  ];
  function load(p) {
    gpuId = p.gpu;
    wlId = p.wl;
    n = p.n;
    fp8 = false;
  }

  const r = $derived(roofline(gpuId, wlId, n, fp8));
  const wl = $derived(WORKLOADS[wlId]);
  const sliderLabel = $derived(wlId === 'prefill' ? 'Tokens processed together' : 'Batch size');
  const sliderUnit = $derived((wlId === 'prefill' ? 'token' : 'sequence') + (n === 1 ? '' : 's'));

  function setWorkload(id) {
    wlId = id;
    n = clamp(n, WORKLOADS[id].max);
  }

  const fmt = (x) =>
    x >= 100
      ? x.toLocaleString('en-US', { maximumFractionDigits: 0 })
      : x.toLocaleString('en-US', { maximumSignificantDigits: 3 });
  const perByte = (x) => `${fmt(x)} ${x === 1 ? 'FLOP' : 'FLOPs'} per byte`;
  const verdict = $derived(r.bound === 'compute' ? 'compute bound' : 'memory-bandwidth bound');
  const precision = $derived(r.fp8 ? 'FP8' : 'FP16');
  const pointName = $derived(
    wlId === 'prefill' ? `Prefill, ${fmt(n)} tokens` : `${wlId === 'attention' ? 'Attention' : 'Decode'}, batch ${fmt(n)}`,
  );

  // Chart geometry: log10 axes, intensity 0.5 to 65,536 and throughput 1 to 10,000 TFLOPS.
  // A narrower viewBox on small screens keeps the chart text legible.
  let cw = $state(0);
  const W = $derived(cw && cw < 480 ? 380 : 520);
  const narrow = $derived(W === 380);
  const L = $derived(narrow ? 66 : 58);
  const H = 380, R = 12, T = 34, B = 50;
  const pw = $derived(W - L - R);
  const ph = H - T - B;
  const X0 = Math.log10(0.5), X1 = Math.log10(65536), Y0 = 0, Y1 = 4;
  const sx = (v) => L + ((Math.log10(v) - X0) / (X1 - X0)) * pw;
  const sy = (v) => T + (1 - (Math.log10(v) - Y0) / (Y1 - Y0)) * ph;
  const decades = [1, 10, 100, 1000, 10000];
  const slope = $derived((-Math.atan((ph / (Y1 - Y0)) / (pw / (X1 - X0))) * 180) / Math.PI);

  const rx = $derived(sx(r.ridge));
  const py = $derived(sy(r.peak));
  const roof = $derived(`${sx(0.5)},${sy(r.bw * 0.5)} ${rx},${py} ${sx(65536)},${py}`);
  const ptx = $derived(sx(r.intensity));
  const pty = $derived(sy(r.attainable));
  const leftLabelX = $derived(sx(Math.sqrt(0.5 * r.ridge)));
  const rightLabelX = $derived(sx(Math.sqrt(r.ridge * 65536)));
  const bwLabel = $derived({ x: sx(3), y: sy(r.bw * 3) + 30 });

  const crossText = $derived(
    r.crossover === null
      ? 'Decode attention does not cross the ridge at any batch size, because each sequence reads its own KV cache.'
      : wlId === 'prefill'
        ? `Prefill crosses the ridge at ${fmt(r.crossover)} tokens processed together. Decode crosses it at a batch size of ${fmt(r.crossover)}.`
        : `Decode crosses the ridge at a batch size of ${fmt(r.crossover)}.`,
  );
  const chartLabel = $derived(
    `Log-log roofline chart for the ${r.gpu.name} at ${precision}. The bandwidth ceiling rises at ${r.bw} TB/s until the ridge point at ${perByte(r.ridge)}. The compute ceiling then stays flat at ${fmt(r.peak)} TFLOPS. The workload point, ${pointName}, sits at ${perByte(r.intensity)} and ${fmt(r.attainable)} TFLOPS in the ${verdict} region.`,
  );
</script>

<section class="sim" aria-labelledby="{uid}-h">
  <svelte:element this={hTag} id="{uid}-h">{title}</svelte:element>
  <p>
    Choose a GPU and a workload, then change the batch size or the number of tokens. The chart shows whether
    the workload reaches the compute ceiling or stays under the memory-bandwidth ceiling.
  </p>

  <div class="presets" role="group" aria-labelledby="{uid}-presets">
    <p id="{uid}-presets" class="group-label">Scenarios</p>
    {#each presets as p (p.label)}
      <button type="button" onclick={() => load(p)}>{p.label}</button>
    {/each}
  </div>

  <div class="controls">
    <div class="field">
      <label for="{uid}-gpu">GPU</label>
      <select id="{uid}-gpu" bind:value={gpuId}>
        {#each Object.values(GPUS) as g (g.id)}
          <option value={g.id}>{g.name}</option>
        {/each}
      </select>
    </div>
    <div class="field">
      <label for="{uid}-wl">Workload</label>
      <select id="{uid}-wl" value={wlId} onchange={(e) => setWorkload(e.currentTarget.value)}>
        {#each Object.values(WORKLOADS) as w (w.id)}
          <option value={w.id}>{w.name}</option>
        {/each}
      </select>
    </div>
    <div class="field wide">
      <label for="{uid}-n">{sliderLabel}, log scale, 1 to {fmt(wl.max)} {wlId === 'prefill' ? 'tokens' : 'sequences'}</label>
      <div class="range-row">
        <input
          id="{uid}-n"
          type="range"
          min="0"
          max={Math.log2(wl.max)}
          step="0.1"
          value={Math.log2(n)}
          aria-valuetext="{fmt(n)} {sliderUnit}"
          oninput={(e) => (n = clamp(2 ** Number(e.currentTarget.value), wl.max))}
        />
        <output for="{uid}-n">{fmt(n)} {sliderUnit}</output>
      </div>
    </div>
    <div class="field wide">
      <div class="check">
        <input id="{uid}-fp8" type="checkbox" bind:checked={fp8} disabled={!r.gpu.fp8} aria-describedby="{uid}-fp8-note" />
        <label for="{uid}-fp8">Use FP8 precision</label>
      </div>
      <p id="{uid}-fp8-note" class="note">
        {#if r.gpu.fp8}
          This model assumes FP8 doubles peak compute and halves the bytes per weight or KV cache value.
        {:else}
          The A100 has no FP8 Tensor Cores, so this model keeps it at FP16.
        {/if}
      </p>
    </div>
  </div>

  <div class="chart" bind:clientWidth={cw}>
  <svg viewBox="0 0 {W} {H}" role="img" aria-label={chartLabel} class:narrow>
    {#each decades as d (d)}
      <line class="grid" x1={sx(d)} y1={T} x2={sx(d)} y2={T + ph} />
      <line class="grid" x1={L} y1={sy(d)} x2={L + pw} y2={sy(d)} />
      <text class="tick" x={sx(d)} y={T + ph + 16} text-anchor="middle">{d.toLocaleString('en-US')}</text>
      <text class="tick" x={L - 6} y={sy(d) + 4} text-anchor="end">{d.toLocaleString('en-US')}</text>
    {/each}
    <line class="axis" x1={L} y1={T + ph} x2={L + pw} y2={T + ph} />
    <line class="axis" x1={L} y1={T} x2={L} y2={T + ph} />
    <text class="axis-label" x={L + pw / 2} y={H - 8} text-anchor="middle">Arithmetic intensity (FLOPs per byte)</text>
    <text class="axis-label" transform="translate(14 {T + ph / 2}) rotate(-90)" text-anchor="middle">Attainable throughput (TFLOPS)</text>

    <line class="ridge" x1={rx} y1={T} x2={rx} y2={T + ph} />
    <text class="lbl" x={rx + 6} y={T + ph - 28}
      ><tspan x={rx + 6}>Ridge:</tspan><tspan x={rx + 6} dy="1.2em">{fmt(r.ridge)} FLOPs/byte</tspan></text
    >
    <polyline class="roof" points={roof} />
    <text class="lbl" x={L + pw - 4} y={py + 20} text-anchor="end">Peak: {fmt(r.peak)} TFLOPS</text>
    <text class="lbl" transform="translate({bwLabel.x} {bwLabel.y}) rotate({slope})">Bandwidth: {r.bw} TB/s</text>

    <text class="region" x={leftLabelX} y={T + 18} text-anchor="middle"
      ><tspan x={leftLabelX}>memory-bandwidth</tspan><tspan x={leftLabelX} dy="1.2em">bound</tspan></text
    >
    <text class="region" x={rightLabelX} y={py + 46} text-anchor="middle"
      ><tspan x={rightLabelX}>compute</tspan><tspan x={rightLabelX} dy="1.2em">bound</tspan></text
    >

    <line class="guide" x1={ptx} y1={pty} x2={ptx} y2={T + ph} />
    <circle class="point" cx={ptx} cy={pty} r="7" />
    <circle class="point" cx={L + 8} cy="14" r="7" />
    <text class="lbl strong" x={L + 22} y="19">Workload: {pointName}</text>
  </svg>
  </div>

  <div class="status" role="status">
    <p><strong>Verdict:</strong> {verdict}.</p>
    <p>
      The arithmetic intensity is {perByte(r.intensity)}. The ridge point, the ops:byte ratio of the {r.gpu.name}
      at {precision}, is {perByte(r.ridge)}.
    </p>
    <p>
      The attainable throughput is {fmt(r.attainable)} TFLOPS, which is {fmt(r.utilization * 100)} percent of the
      {fmt(r.peak)} TFLOPS peak.
    </p>
    <p>{crossText}</p>
  </div>

  <details>
    <summary>How this model works</summary>
    <p>
      The roofline sets attainable throughput to the smaller of two ceilings: peak compute, and memory bandwidth
      multiplied by arithmetic intensity. The ridge point is peak compute divided by memory bandwidth. A
      workload left of the ridge is memory-bandwidth bound. A workload at or right of the ridge is compute bound.
    </p>
    <p>
      <strong>Decode (linear layers).</strong> A batch of b sequences multiplies a b × d activation matrix by a
      d × d weight matrix. That costs 2·b·d² FLOPs and reads about 2·d² bytes of FP16 weights. The intensity is
      therefore about b FLOPs per byte. The model ignores the 2·b·d bytes of activations, which is accurate while
      b stays far below d. Every sequence in the batch shares one read of the weights, so batching raises
      intensity.
    </p>
    <p>
      <strong>Prefill (linear layers).</strong> Prefill runs the same multiplication over every prompt token at
      once. The intensity is about the number of tokens processed together. The model leaves out the attention
      cost of prefill.
    </p>
    <p>
      <strong>Decode attention.</strong> Each sequence reads its own keys and values, 2·L·d values for a context
      of L tokens, and performs about 4·L·d FLOPs on them. The intensity stays near 1 FLOP per byte in FP16 at any
      batch size, because the bytes grow with the batch as fast as the FLOPs. The model ignores grouped-query
      attention, which shares keys and values across query heads and raises the intensity by the group size.
    </p>
    <p>
      <strong>FP8.</strong> This model assumes FP8 doubles peak compute and halves the bytes per weight or KV cache
      value. The ridge doubles and the intensity doubles, so the crossover batch size stays the same. The
      attainable throughput doubles.
    </p>
    <p>
      All figures are dense Tensor Core peaks from spec sheets. Production kernels reach a fraction of these
      ceilings.
    </p>
    <ul>
      {#each Object.values(GPUS) as g (g.id)}
        <li>{g.name}: {g.source}</li>
      {/each}
    </ul>
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
  }
  .sim > :global(h2),
  .sim > :global(h3) {
    margin-top: 0;
  }
  .presets {
    display: flex;
    flex-wrap: wrap;
    gap: var(--tessera-spacing-sm);
    align-items: center;
    margin-bottom: var(--tessera-spacing-md);
  }
  .group-label {
    margin: 0;
    font-weight: 600;
    flex-basis: 100%;
  }
  button {
    font: inherit;
    font-size: 0.9rem;
    padding: 0.4rem 0.75rem;
    border: 1px solid var(--tessera-primary);
    border-radius: 6px;
    background: var(--tessera-bg);
    color: var(--tessera-primary-dark, var(--tessera-primary));
    cursor: pointer;
  }
  button:hover {
    background: var(--tessera-bg-secondary);
  }
  button:focus-visible,
  select:focus-visible,
  input:focus-visible {
    outline: 3px solid var(--tessera-primary);
    outline-offset: 2px;
  }
  .controls {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
    gap: var(--tessera-spacing-md);
    margin-bottom: var(--tessera-spacing-md);
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 0;
  }
  .wide {
    grid-column: 1 / -1;
  }
  label {
    font-weight: 600;
  }
  select {
    font: inherit;
    padding: 0.35rem;
    border: 1px solid var(--tessera-text-light);
    border-radius: 4px;
    background: var(--tessera-bg);
    color: var(--tessera-text);
    max-width: 100%;
  }
  .range-row {
    display: flex;
    gap: var(--tessera-spacing-sm);
    align-items: center;
  }
  .range-row input {
    flex: 1;
    min-width: 0;
  }
  output {
    min-width: 7.5rem;
    font-variant-numeric: tabular-nums;
  }
  .check {
    display: flex;
    gap: var(--tessera-spacing-sm);
    align-items: center;
  }
  .check input {
    width: 1.1rem;
    height: 1.1rem;
  }
  .note {
    margin: 0;
    font-size: 0.9rem;
    color: var(--tessera-text-light);
  }
  svg {
    display: block;
    width: 100%;
    height: auto;
    margin-bottom: var(--tessera-spacing-md);
  }
  .grid {
    stroke: var(--tessera-border);
    stroke-width: 1;
  }
  .axis {
    stroke: var(--tessera-text);
    stroke-width: 1.5;
  }
  .tick,
  .lbl,
  .axis-label,
  .region {
    fill: var(--tessera-text);
    font-size: 13px;
  }
  .lbl,
  .region {
    paint-order: stroke;
    stroke: var(--tessera-bg);
    stroke-width: 4px;
    stroke-linejoin: round;
  }
  .axis-label {
    font-size: 14px;
  }
  .region {
    font-size: 14px;
    font-style: italic;
  }
  .narrow .tick,
  .narrow .lbl {
    font-size: 15px;
  }
  .narrow .axis-label,
  .narrow .region {
    font-size: 16px;
  }
  .strong {
    font-weight: 700;
  }
  .ridge {
    stroke: var(--tessera-text);
    stroke-width: 1.5;
    stroke-dasharray: 5 4;
  }
  .roof {
    fill: none;
    stroke: var(--tessera-primary);
    stroke-width: 3.5;
    stroke-linejoin: round;
  }
  .guide {
    stroke: var(--tessera-text);
    stroke-width: 1;
    stroke-dasharray: 2 3;
  }
  .point {
    fill: var(--tessera-error);
    stroke: var(--tessera-bg);
    stroke-width: 2.5;
  }
  .status {
    padding: var(--tessera-spacing-sm) var(--tessera-spacing-md);
    border-left: 4px solid var(--tessera-primary);
    background: var(--tessera-bg-secondary);
    margin-bottom: var(--tessera-spacing-md);
  }
  .status p {
    margin: 0.25rem 0;
  }
  details summary {
    cursor: pointer;
    font-weight: 600;
  }
  details ul {
    padding-left: 1.25rem;
  }
</style>
