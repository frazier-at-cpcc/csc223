<script>
  // MemoryFit: will a model deployment fit in GPU memory? All numbers come from memory-fit.js.
  import { untrack } from 'svelte';
  import { MODELS, PRECISIONS, GPUS, DEFAULT_FACTOR, MAX_GPUS, evaluate } from './memory-fit.js';

  let {
    model = 'llama-8b',
    weightPrecision = 'fp16',
    kvPrecision = 'fp16',
    context = 8192,
    sequences = 16,
    gpu = 'l40s',
    gpuCount = 1,
    planningFactor = DEFAULT_FACTOR,
    title = 'Will it fit? Sizing GPU memory',
    headingLevel = 2,
  } = $props();

  const uid = $props.id();
  const CONTEXTS = [1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072];
  const KV_PRECISIONS = ['fp16', 'fp8'];
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const ctxIndex = (c) => clamp(Math.round(Math.log2(Math.max(1, c) / 1024)), 0, CONTEXTS.length - 1);

  const init = untrack(() => ({
    model: MODELS[model] ? model : 'llama-8b',
    wp: PRECISIONS[weightPrecision] ? weightPrecision : 'fp16',
    kp: KV_PRECISIONS.includes(kvPrecision) ? kvPrecision : 'fp16',
    ci: ctxIndex(context),
    seq: clamp(Math.round(sequences), 1, 256),
    gpu: GPUS[gpu] ? gpu : 'l40s',
    n: clamp(Math.round(gpuCount), 1, MAX_GPUS),
    pf: clamp(Math.round((Number(planningFactor) || DEFAULT_FACTOR) * 10) / 10, 1.2, 2.5),
  }));

  let modelId = $state(init.model);
  let wp = $state(init.wp);
  let kp = $state(init.kp);
  let ci = $state(init.ci);
  let seq = $state(init.seq);
  let gpuId = $state(init.gpu);
  let n = $state(init.n);
  let overheadPct = $state(10);
  let pf = $state(init.pf);
  const factor = $derived(Math.round(pf * 10) / 10);
  let custom = $state({ ...MODELS.custom });

  const presets = [
    { label: 'Llama 8B on one L40S', s: ['llama-8b', 'fp16', 'fp16', 3, 16, 'l40s', 1, 1.5] },
    { label: '70B in FP16 on H100s', s: ['llama-70b', 'fp16', 'fp16', 3, 16, 'h100', 4, 1.5] },
    { label: '70B in FP8 on H100s', s: ['llama-70b', 'fp8', 'fp8', 3, 16, 'h100', 2, 1.5] },
    { label: '405B in FP8 on B200s, long context', s: ['llama-405b', 'fp8', 'fp8', 7, 16, 'b200', 8, 1.8] },
  ];
  function load(p) {
    [modelId, wp, kp, ci, seq, gpuId, n, pf] = p.s;
    overheadPct = 10;
  }

  const pos = (v, lo, hi, d) => (Number.isFinite(v) ? clamp(v, lo, hi) : d);
  const m = $derived(
    modelId === 'custom'
      ? {
          label: 'Custom',
          params: pos(custom.params, 0.1, 2000, 13),
          layers: Math.round(pos(custom.layers, 1, 256, 40)),
          kvHeads: Math.round(pos(custom.kvHeads, 1, 256, 40)),
          headDim: Math.round(pos(custom.headDim, 1, 1024, 128)),
        }
      : MODELS[modelId]
  );
  const ctx = $derived(CONTEXTS[ci]);
  const g = $derived(GPUS[gpuId]);
  const wBytes = $derived(PRECISIONS[wp].bytes);
  const kBytes = $derived(PRECISIONS[kp].bytes);
  const r = $derived(
    evaluate({
      model: m,
      weightBytes: wBytes,
      kvBytes: kBytes,
      context: ctx,
      sequences: seq,
      vram: g.vram,
      gpuCount: n,
      overheadPct,
      planningFactor: factor,
    })
  );

  const gb = (v) => `${v.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} GB`;
  const int = (v) => v.toLocaleString('en-US');
  const bytes = (b) => `${b} byte${b === 1 ? '' : 's'}`;
  const seqs = (k) => `${int(k)} concurrent sequence${k === 1 ? '' : 's'}`;
  const gpus = (k) => `${k} GPU${k === 1 ? '' : 's'}`;

  const VERDICT = {
    fits: { word: 'Fits with headroom', icon: '✓' },
    below: { word: 'Fits but below the planning factor', icon: '!' },
    nofit: { word: 'Does not fit', icon: '✕' },
  };

  const summary = $derived.by(() => {
    const parts = [];
    parts.push(
      `Each of ${gpus(n)} holds ${gb(r.weights)} of weights, ${gb(r.kv)} of KV cache, and ${gb(r.overhead)} of overhead out of ${gb(g.vram)}.`
    );
    parts.push(r.free >= 0 ? `${gb(r.free)} stays free on each GPU.` : `Each GPU is short by ${gb(-r.free)}.`);
    parts.push(
      r.minGpus
        ? `A planning factor of ${factor} needs at least ${gpus(r.minGpus)} of this type.`
        : `No count up to ${MAX_GPUS} GPUs of this type meets a planning factor of ${factor}.`
    );
    parts.push(`At ${int(ctx)} tokens, the deployment holds at most ${seqs(r.maxSequences)}.`);
    if (!r.validTP) parts.push(`${n} is not a valid tensor-parallel size for ${m.kvHeads} KV heads.`);
    return parts.join(' ');
  });

  // Chart geometry: one bar for one GPU. All GPUs in a tensor-parallel group hold the same amounts.
  const X0 = 16;
  let cw = $state(600); // chart width in px, so SVG text stays legible at every width
  const W = $derived(cw - 2 * X0);
  const scaleMax = $derived(Math.max(g.vram, r.used));
  const sx = (v) => (Math.max(0, v) / scaleMax) * W;
  const segs = $derived.by(() => {
    const list = [
      { key: 'w', name: 'Weights', v: r.weights },
      { key: 'kv', name: 'KV cache', v: r.kv },
      { key: 'oh', name: 'Overhead', v: r.overhead },
    ];
    if (r.free > 0) list.push({ key: 'free', name: 'Free', v: r.free });
    let x = X0;
    return list.map((s) => {
      const out = { ...s, x, w: sx(s.v) };
      x += out.w;
      return out;
    });
  });
  const capX = $derived(X0 + sx(g.vram));
  const ruleX = $derived(X0 + sx(r.ruleLimit));
  const chartLabel = $derived(
    `Stacked bar for one ${g.label} GPU. Weights ${gb(r.weights)}, KV cache ${gb(r.kv)}, overhead ${gb(r.overhead)}, ` +
      (r.free >= 0 ? `free ${gb(r.free)}.` : `over capacity by ${gb(-r.free)}.`) +
      ` A dashed line marks the weight limit of ${gb(r.ruleLimit)} that the planning factor of ${factor} allows.`
  );

  const H = $derived(clamp(headingLevel, 2, 3));
</script>

<section class="sim mf" aria-labelledby="{uid}-h">
  <svelte:element this={`h${H}`} id="{uid}-h">{title}</svelte:element>
  <p>
    Choose a model, a precision, a workload, and a GPU. The calculator adds up weights, KV cache, and runtime
    overhead on each GPU and checks the result against the series planning rule.
  </p>

  <div class="mf-presets" role="group" aria-label="Scenarios">
    {#each presets as p (p.label)}
      <button type="button" onclick={() => load(p)}>{p.label}</button>
    {/each}
  </div>

  <div class="mf-controls">
    <fieldset>
      <legend>Model and precision</legend>
      <label for="{uid}-model">Model</label>
      <select id="{uid}-model" bind:value={modelId}>
        {#each Object.entries(MODELS) as [id, mm] (id)}<option value={id}>{mm.label}</option>{/each}
      </select>
      {#if modelId === 'custom'}
        <div class="mf-custom">
          <label for="{uid}-params">Parameters (billions)</label>
          <input id="{uid}-params" type="number" min="0.1" max="2000" step="0.1" bind:value={custom.params} />
          <label for="{uid}-layers">Layers</label>
          <input id="{uid}-layers" type="number" min="1" max="256" step="1" bind:value={custom.layers} />
          <label for="{uid}-kvh">KV heads</label>
          <input id="{uid}-kvh" type="number" min="1" max="256" step="1" bind:value={custom.kvHeads} />
          <label for="{uid}-hd">Head dimension</label>
          <input id="{uid}-hd" type="number" min="1" max="1024" step="1" bind:value={custom.headDim} />
        </div>
      {:else}
        <p class="mf-note">{m.layers} layers, {m.kvHeads} KV heads, head dimension {m.headDim}.</p>
      {/if}
      <label for="{uid}-wp">Weight precision (bytes per parameter)</label>
      <select id="{uid}-wp" bind:value={wp}>
        {#each Object.entries(PRECISIONS) as [id, p] (id)}<option value={id}>{p.label}, {bytes(p.bytes)}</option>{/each}
      </select>
      <label for="{uid}-kp">KV cache precision (bytes per element)</label>
      <select id="{uid}-kp" bind:value={kp}>
        {#each KV_PRECISIONS as id (id)}<option value={id}>{PRECISIONS[id].label}, {bytes(PRECISIONS[id].bytes)}</option>{/each}
      </select>
    </fieldset>

    <fieldset>
      <legend>Workload</legend>
      <label for="{uid}-ctx">Context length</label>
      <div class="mf-range">
        <input id="{uid}-ctx" type="range" min="0" max={CONTEXTS.length - 1} step="1" bind:value={ci}
          aria-valuetext="{int(ctx)} tokens" />
        <output for="{uid}-ctx">{int(ctx)} tokens</output>
      </div>
      <label for="{uid}-seq">Concurrent sequences</label>
      <div class="mf-range">
        <input id="{uid}-seq" type="range" min="1" max="256" step="1" bind:value={seq} />
        <output for="{uid}-seq">{seq} sequences</output>
      </div>
    </fieldset>

    <fieldset>
      <legend>Hardware</legend>
      <label for="{uid}-gpu">GPU</label>
      <select id="{uid}-gpu" bind:value={gpuId}>
        {#each Object.entries(GPUS) as [id, gg] (id)}<option value={id}>{gg.label}</option>{/each}
      </select>
      <label for="{uid}-n">GPU count</label>
      <div class="mf-range">
        <input id="{uid}-n" type="range" min="1" max={MAX_GPUS} step="1" bind:value={n} />
        <output for="{uid}-n">{gpus(n)}</output>
      </div>
    </fieldset>

    <fieldset>
      <legend>Planning</legend>
      <label for="{uid}-pf">Planning factor (VRAM needed as a multiple of weight size)</label>
      <div class="mf-range">
        <input id="{uid}-pf" type="range" min="1.2" max="2.5" step="0.1" bind:value={pf}
          aria-valuetext="{factor.toFixed(1)} times weight size" />
        <output for="{uid}-pf">{factor.toFixed(1)} × weight size</output>
      </div>
      <label for="{uid}-oh">Runtime overhead reserve</label>
      <div class="mf-range">
        <input id="{uid}-oh" type="range" min="0" max="30" step="1" bind:value={overheadPct}
          aria-valuetext="{overheadPct} percent of VRAM" />
        <output for="{uid}-oh">{overheadPct} percent of VRAM</output>
      </div>
    </fieldset>
  </div>

  <div class="mf-status mf-{r.verdict}" role="status">
    <p class="mf-verdict"><span aria-hidden="true">{VERDICT[r.verdict].icon}</span> {VERDICT[r.verdict].word}</p>
    <p>{summary}</p>
  </div>

  <ol class="mf-steps">
    <li>
      <strong>Weight memory.</strong> {m.params.toLocaleString('en-US')} billion parameters × {bytes(wBytes)} per parameter
      = {gb(r.weightsTotal)}. One billion parameters at one byte each occupy one gigabyte.
    </li>
    <li>
      <strong>KV cache per token.</strong> 2 (K and V) × {m.layers} layers × {m.kvHeads} KV heads × {m.headDim} head
      dimension × {bytes(kBytes)} = {int(r.kvPerToken)} bytes, or {(r.kvPerToken / 1e6).toFixed(3)} MB.
    </li>
    <li>
      <strong>KV cache total.</strong> {int(r.kvPerToken)} bytes × {int(ctx)} tokens × {seq} sequences = {gb(r.kvTotalUnsplit)}.
      {#if r.kvTotal > r.kvTotalUnsplit + 1e-6}
        {n} GPUs outnumber {m.kvHeads} KV heads, so engines copy each head to more than one GPU. The group stores {gb(r.kvTotal)}.
      {/if}
    </li>
    <li>
      <strong>Split across {gpus(n)}.</strong> Each GPU holds {gb(r.weights)} of weights and {gb(r.kv)} of KV cache, plus
      a {overheadPct} percent reserve of {gb(r.overhead)}.
    </li>
    <li>
      <strong>Planning factor.</strong> {factor.toFixed(1)} × {gb(r.weightsTotal)} of weights = {gb(factor * r.weightsTotal)}
      of VRAM. The group of {gpus(n)} has {gb(n * g.vram)}, so the deployment
      {r.meetsRule ? 'meets' : 'falls below'} the planning factor. On each GPU, weights may use at most {gb(r.ruleLimit)}.
    </li>
  </ol>
  {#if !r.validTP}
    <p class="mf-warn">
      Tensor parallelism needs a GPU count that divides the KV head count or is a multiple of it. {gpus(n)} cannot
      split {m.kvHeads} KV heads evenly, so these numbers assume the busiest GPU.
    </p>
  {/if}

  <figure class="mf-chart" bind:clientWidth={cw}>
    <svg viewBox="0 0 {cw} 112" role="img" aria-label={chartLabel}>
      <defs>
        <pattern id="{uid}-pw" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="8" height="8" class="f-w" /><line x1="0" y1="0" x2="0" y2="8" class="p-line" stroke-width="3" />
        </pattern>
        <pattern id="{uid}-pkv" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" class="f-kv" /><circle cx="4" cy="4" r="1.6" class="p-dot" />
        </pattern>
        <pattern id="{uid}-poh" width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" class="f-oh" /><line x1="0" y1="3" x2="6" y2="3" class="p-line" stroke-width="1.5" />
        </pattern>
      </defs>
      <text x={X0} y="14" class="mf-axis">One GPU: {g.label}</text>
      {#each segs as s (s.key)}
        <rect x={s.x} y="24" width={s.w} height="44"
          fill={s.key === 'free' ? 'none' : `url(#${uid}-p${s.key})`}
          class={s.key === 'free' ? 'free' : 'seg'} />
        {#if s.w > 64}
          <text x={s.x + s.w / 2} y="51" text-anchor="middle" class="mf-seglabel">{s.name}</text>
        {/if}
      {/each}
      {#if r.free < 0}
        <rect x={capX} y="20" width={X0 + sx(r.used) - capX} height="52" class="over" />
        <text x={X0 + W} y="86" text-anchor="end" class="mf-axis">Over by {gb(-r.free)}</text>
      {/if}
      <line x1={ruleX} y1="18" x2={ruleX} y2="76" class="rule" />
      <text x={ruleX} y="100" text-anchor="middle" class="mf-axis">Weight limit at {factor.toFixed(1)}×</text>
      <line x1={capX} y1="18" x2={capX} y2="76" class="cap" />
      <text x={capX} y="14" text-anchor="end" class="mf-axis">{gb(g.vram)}</text>
    </svg>
    <figcaption>
      <ul class="mf-legend">
        <li><svg viewBox="0 0 16 16" aria-hidden="true"><rect width="16" height="16" fill="url(#{uid}-pw)" /></svg>Weights, diagonal stripes: {gb(r.weights)}</li>
        <li><svg viewBox="0 0 16 16" aria-hidden="true"><rect width="16" height="16" fill="url(#{uid}-pkv)" /></svg>KV cache, dots: {gb(r.kv)}</li>
        <li><svg viewBox="0 0 16 16" aria-hidden="true"><rect width="16" height="16" fill="url(#{uid}-poh)" /></svg>Overhead, horizontal lines: {gb(r.overhead)}</li>
        <li><svg viewBox="0 0 16 16" aria-hidden="true"><rect x="1" y="1" width="14" height="14" class="free" /></svg>Free, outlined: {gb(Math.max(0, r.free))}</li>
      </ul>
    </figcaption>
  </figure>

  <details class="mf-details">
    <summary>How this model works</summary>
    <p>
      <strong>Weight memory</strong> equals the parameter count times the bytes per parameter. FP16 and BF16 use 2
      bytes, FP8 uses 1 byte, and FP4 uses half a byte. The calculator treats a gigabyte as 10<sup>9</sup> bytes, so
      one billion parameters at one byte occupy one gigabyte.
    </p>
    <p>
      <strong>KV cache per token</strong> equals 2 × layers × KV heads × head dimension × bytes per element. The 2
      counts one key and one value. The KV cache total equals the per-token size times the context length times the
      number of concurrent sequences. The calculator assumes every sequence fills the whole context.
    </p>
    <p>
      The Llama 3.1 presets use the published configurations. The 8B model has 32 layers, the 70B model has 80
      layers, and the 405B model has 126 layers. All three use grouped-query attention with 8 KV heads and a head
      dimension of 128. The parameter counts are the published totals of 8.03, 70.6, and 405.9 billion.
    </p>
    <p>
      GPU capacities are the listed VRAM: A100 80 GB, H100 80 GB, H200 141 GB, and L40S 48 GB. The B200 carries
      192 GB of HBM3e, but NVIDIA lists 180 GB per GPU for eight-GPU B200 systems, and the course uses 180 GB.
    </p>
    <p>
      Tensor parallelism splits the weights evenly across GPUs and gives each GPU a share of the KV heads. When the GPU
      count exceeds the KV head count, engines copy KV heads, so each GPU still stores at least one. A valid
      tensor-parallel size divides the KV head count or is a multiple of it. The minimum GPU count reports the smallest
      valid size up to {MAX_GPUS}.
    </p>
    <p>
      The <strong>planning factor</strong> is the sizing rule for this series. Required VRAM equals the planning factor
      times the weight memory. The extra share, the factor minus 1 times the weights, is headroom for the KV cache,
      activations, and runtime overhead. A factor of 1.5 is the minimum that Chapter 3 teaches, with KV headroom of at
      least half the weight size. That minimum suits short contexts and modest concurrency. Long contexts and high
      concurrency need a larger factor. The sizing estimate in Chapter 5 uses 1.8.
    </p>
    <p>
      The calculator also runs an exact check. It adds the weights, the computed KV cache, and the runtime overhead
      reserve on each GPU and compares the sum with VRAM. The overhead reserve stands in for activations, the CUDA
      context, and engine buffers, which real engines measure at startup. The two checks never add together. The
      planning factor is a quick estimate whose headroom already covers overhead, while the exact check itemizes it.
    </p>
    <p>
      The verdict combines both checks. A deployment that fails the exact check does not fit. A deployment that passes
      the exact check but has less VRAM than the planning factor requires fits but sits below the planning factor. The
      minimum GPU count uses the planning factor alone. The maximum concurrent sequences equals the memory left after
      weights and overhead, divided by the KV cache of one full-length sequence on one GPU.
    </p>
    <p>
      The calculator ignores several effects. It does not model paged-allocation waste, prefix sharing between
      sequences, or embedding layers that some engines copy to every GPU. FP4 Tensor Core math requires Blackwell
      GPUs, but the memory arithmetic holds for any GPU that stores FP4 weights.
    </p>
  </details>
</section>

<style>
  .mf { margin: var(--tessera-spacing-lg) 0; display: grid; gap: var(--tessera-spacing-md); }
  .mf > * { margin: 0; }
  .mf-presets { display: flex; flex-wrap: wrap; gap: var(--tessera-spacing-sm); }
  .mf-presets button {
    font: inherit;
    padding: 0.4rem 0.8rem;
    border: 1px solid var(--tessera-primary);
    border-radius: 6px;
    background: var(--tessera-bg);
    color: var(--tessera-primary);
    cursor: pointer;
  }
  .mf-presets button:hover { background: var(--tessera-primary-light); }
  .mf button:focus-visible, .mf input:focus-visible, .mf select:focus-visible, .mf summary:focus-visible {
    outline: 3px solid var(--tessera-primary);
    outline-offset: 2px;
  }
  .mf-controls {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
    gap: var(--tessera-spacing-md);
  }
  fieldset {
    margin: 0;
    min-width: 0;
    display: grid;
    gap: 0.35rem;
    align-content: start;
    padding: var(--tessera-spacing-sm) var(--tessera-spacing-md) var(--tessera-spacing-md);
    border: 1px solid var(--tessera-border);
    border-radius: 6px;
  }
  legend { font-weight: 700; padding: 0 0.25rem; }
  label { font-weight: 600; margin-top: 0.35rem; }
  select, input[type='number'] {
    font: inherit;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    padding: 0.3rem;
    border: 1px solid var(--tessera-border);
    border-radius: 4px;
    background: var(--tessera-bg);
    color: var(--tessera-text);
  }
  .mf-custom { display: grid; gap: 0.35rem; }
  .mf-range { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; }
  .mf-range input { flex: 1 1 8rem; min-width: 0; accent-color: var(--tessera-primary); }
  output { font-variant-numeric: tabular-nums; min-width: 8.5rem; }
  .mf-note { margin: 0; font-size: 0.9rem; color: var(--tessera-text-light); }
  .mf-status {
    padding: var(--tessera-spacing-sm) var(--tessera-spacing-md);
    border: 2px solid var(--tessera-border);
    border-left-width: 8px;
    border-radius: 6px;
    background: var(--tessera-bg);
  }
  .mf-status p { margin: 0.25rem 0; }
  .mf-verdict { font-weight: 700; font-size: 1.1rem; }
  .mf-fits { border-color: var(--tessera-success); }
  .mf-below { border-color: var(--tessera-warning); }
  .mf-nofit { border-color: var(--tessera-error); }
  .mf-steps { padding-left: 1.4rem; display: grid; gap: 0.35rem; }
  .mf-warn {
    padding: var(--tessera-spacing-sm);
    border: 1px dashed var(--tessera-warning);
    border-radius: 6px;
  }
  .mf-chart svg[role='img'] { width: 100%; height: auto; display: block; }
  .seg { stroke: var(--tessera-text); stroke-width: 1; }
  .free { fill: var(--tessera-bg); stroke: var(--tessera-text); stroke-width: 1; stroke-dasharray: 4 3; }
  .f-w { fill: var(--tessera-primary); }
  .f-kv { fill: var(--tessera-success); }
  .f-oh { fill: var(--tessera-text-light); }
  .p-line { stroke: #fff; }
  .p-dot { fill: #fff; }
  .over { fill: none; stroke: var(--tessera-error); stroke-width: 3; stroke-dasharray: 2 2; }
  .rule { stroke: var(--tessera-text); stroke-width: 2; stroke-dasharray: 6 4; }
  .cap { stroke: var(--tessera-text); stroke-width: 3; }
  .mf-axis { font-size: 13px; fill: var(--tessera-text); }
  .mf-seglabel {
    font-size: 13px;
    font-weight: 700;
    fill: var(--tessera-text);
    paint-order: stroke;
    stroke: var(--tessera-bg);
    stroke-width: 4px;
  }
  .mf-legend {
    list-style: none;
    margin: var(--tessera-spacing-sm) 0 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem 1.2rem;
    font-size: 0.9rem;
  }
  .mf-legend li { display: flex; align-items: center; gap: 0.4rem; }
  .mf-legend svg { width: 1.1rem; height: 1.1rem; flex: none; border: 1px solid var(--tessera-text); }
  .mf-details summary { cursor: pointer; font-weight: 700; }
  .mf-details p { margin: var(--tessera-spacing-sm) 0; }
</style>
