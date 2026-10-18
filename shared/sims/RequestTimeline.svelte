<script>
  import { configure, stateAt, arrivalMs, DEFAULT_PROMPT, DEFAULT_OUTPUT } from './request-timeline.js';

  let {
    promptTokens = DEFAULT_PROMPT,
    outputTokens = DEFAULT_OUTPUT,
    prefillMs = 120,
    itlMs = 30,
    prefixCachedTokens = 0,
    title = 'One LLM request, pass by pass',
    headingLevel = 2,
  } = $props();

  const uid = `rt-${Math.random().toString(36).slice(2, 8)}`;
  const level = $derived(headingLevel === 3 ? 3 : 2);

  const presets = [
    {
      name: 'Short chat reply',
      prompt: DEFAULT_PROMPT,
      output: DEFAULT_OUTPUT,
      prefill: 120, itl: 30, cached: 0,
    },
    {
      name: 'Long prompt, short answer',
      prompt: ['Summarize', 'the', 'payment', 'terms', ':', 'The', 'buyer', 'pays', 'each', 'invoice', 'within',
        'thirty', 'days', 'of', 'receipt', 'and', 'late', 'payments', 'accrue', 'interest', 'at', 'one', 'percent', '.'],
      output: ['Thirty', 'days', 'net', '.'],
      prefill: 480, itl: 30, cached: 0,
    },
    {
      name: 'Prefix cache hit',
      prompt: ['You', 'are', 'a', 'support', 'agent', 'for', 'Acme', 'Cloud', '.', 'Refunds', 'take', 'five',
        'business', 'days', '.', 'Answer', 'in', 'one', 'sentence', '.', 'User', ':', 'When', 'will', 'my',
        'refund', 'arrive', '?'],
      output: ['Your', 'refund', 'arrives', 'within', 'five', 'business', 'days', '.'],
      prefill: 560, itl: 30, cached: 22,
    },
  ];

  // Props seed the editable state once; presets and sliders change it afterwards.
  const init = () => ({ prompt: promptTokens, output: outputTokens, prefill: prefillMs, itl: itlMs, cached: prefixCachedTokens });
  let s = $state(init());
  let step = $state(0);
  let playing = $state(false);
  let activePreset = $state('');

  const cfg = $derived(configure({
    promptTokens: s.prompt, outputTokens: s.output, prefillMs: s.prefill, itlMs: s.itl, prefixCachedTokens: s.cached,
  }));
  const st = $derived(stateAt(cfg, step));

  const ms = (v) => `${Math.round(v * 10) / 10} ms`;

  function load(p) {
    s = { prompt: p.prompt, output: p.output, prefill: p.prefill, itl: p.itl, cached: p.cached };
    activePreset = p.name;
    reset();
  }
  function next() {
    if (step < cfg.totalPasses) step += 1;
    if (step >= cfg.totalPasses) playing = false;
  }
  function reset() {
    playing = false;
    step = 0;
  }
  function togglePlay() {
    if (st.done) step = 0;
    playing = !playing;
  }

  $effect(() => {
    if (!playing) return;
    step; // re-arm after every step
    const t = setTimeout(next, 800);
    return () => clearTimeout(t);
  });

  // Keep the step in range and the cached count legal when the configuration shrinks.
  $effect(() => {
    if (step > cfg.totalPasses) step = cfg.totalPasses;
  });

  const status = $derived.by(() => {
    const totals = `Totals: ${st.passes} forward ${st.passes === 1 ? 'pass' : 'passes'}, ${st.kvEntries} KV cache entries (${st.kvPrompt} prompt, ${st.kvGenerated} generated), ${st.tokensGenerated} of ${cfg.N} output tokens, ${ms(st.elapsedMs)} elapsed.`;
    if (st.step === 0) {
      const cache = cfg.C > 0
        ? `The KV cache already holds ${cfg.C} prompt entries from the prefix cache.`
        : 'The KV cache is empty.';
      return `The request has not started. The prompt holds ${cfg.P} tokens. ${cache} ${totals}`;
    }
    const produced = cfg.output[st.tokensGenerated - 1];
    let what;
    if (st.phase === 'prefill') {
      const skip = cfg.C > 0 ? `It read ${cfg.C} prompt tokens from the prefix cache and computed the other ${cfg.P - cfg.C} in parallel.` : `It computed all ${cfg.P} prompt tokens in parallel.`;
      what = `Forward pass 1 is the prefill pass. ${skip} It wrote the keys and values of those ${cfg.P - cfg.C} tokens to the KV cache. It produced the first output token, "${produced}", at ${ms(st.elapsedMs)}, so the TTFT is ${ms(st.ttftMs)}.`;
    } else {
      const input = cfg.output[st.tokensGenerated - 2];
      what = `Forward pass ${st.passes} is decode step ${st.decodeStep}. It computed only the newest token, "${input}", and appended that token's keys and values to the KV cache. It produced "${produced}" at ${ms(st.elapsedMs)}, ${ms(cfg.itlMs)} after the previous token. That gap is the ITL.`;
    }
    const end = st.done
      ? ` The request is complete. The keys and values of the final token "${produced}" are never written, because no later pass processes it.`
      : '';
    return `${what} ${totals}${end}`;
  });

  // Timeline geometry (viewBox 400 by 110).
  const X0 = 10, W = 380;
  const span = $derived(cfg.totalMs > 0 ? cfg.totalMs : 1);
  const x = (t) => X0 + (W * t) / span;
  const svgLabel = $derived(
    `Timeline from 0 to ${ms(cfg.totalMs)}. The hatched prefill bar runs from 0 to ${ms(cfg.ttftMs)}. ` +
      `${cfg.N - 1} decode ${cfg.N - 1 === 1 ? 'step follows' : 'steps follow'}, each ${ms(cfg.itlMs)} long. ` +
      `Completed parts have solid outlines and pending parts have dashed outlines. The current time marker sits at ${ms(st.elapsedMs)}.`,
  );

  const tag = (name) => (activePreset === name ? 'true' : 'false');
</script>

<section class="sim rt" aria-labelledby="{uid}-h">
  <svelte:element this={`h${level}`} id="{uid}-h">{title}</svelte:element>
  <p>
    Step through one request to a large language model. The prefill pass reads the whole prompt at once. Each decode
    pass then reads one token and produces the next one.
  </p>

  <div class="rt-presets" role="group" aria-label="Scenarios">
    {#each presets as p (p.name)}
      <button type="button" class="rt-btn" aria-pressed={tag(p.name)} onclick={() => load(p)}>{p.name}</button>
    {/each}
  </div>

  <div class="rt-sliders">
    <div class="rt-slider">
      <label for="{uid}-pf">Prefill time for the full prompt (ms)</label>
      <input id="{uid}-pf" type="range" min="20" max="1000" step="10" bind:value={s.prefill} oninput={() => (activePreset = '')} />
      <output for="{uid}-pf">{s.prefill} ms</output>
    </div>
    <div class="rt-slider">
      <label for="{uid}-itl">Inter-token latency (ms)</label>
      <input id="{uid}-itl" type="range" min="5" max="100" step="1" bind:value={s.itl} oninput={() => (activePreset = '')} />
      <output for="{uid}-itl">{s.itl} ms</output>
    </div>
    <div class="rt-slider">
      <label for="{uid}-c">Prompt tokens already in the prefix cache (tokens)</label>
      <input id="{uid}-c" type="range" min="0" max={cfg.P - 1} step="1" value={cfg.C}
        oninput={(e) => { s.cached = Number(e.currentTarget.value); activePreset = ''; }} />
      <output for="{uid}-c">{cfg.C} of {cfg.P} tokens</output>
    </div>
  </div>

  <div class="rt-controls" role="group" aria-label="Playback">
    <button type="button" class="rt-btn rt-main" onclick={next} disabled={st.done}>Step</button>
    <button type="button" class="rt-btn rt-main" onclick={togglePlay}>{playing ? 'Pause' : 'Play'}</button>
    <button type="button" class="rt-btn rt-main" onclick={reset}>Reset</button>
  </div>

  <p class="rt-label" id="{uid}-pl">Prompt tokens</p>
  <ul class="rt-cells" aria-labelledby="{uid}-pl">
    {#each cfg.prompt as w, i (i)}
      {@const cached = i < cfg.C}
      {@const done = st.step >= 1}
      <li class="rt-cell" class:cached class:computed={!cached && done} class:pending={!cached && !done}>
        <span class="rt-word">{w}</span>
        <span class="rt-tag">{cached ? 'cached' : done ? 'computed' : 'waiting'}</span>
      </li>
    {/each}
  </ul>

  <p class="rt-label" id="{uid}-ol">Output tokens</p>
  <ul class="rt-cells" aria-labelledby="{uid}-ol">
    {#each cfg.output as w, j (j)}
      {@const made = j < st.tokensGenerated}
      {@const newest = made && j === st.tokensGenerated - 1 && !st.done}
      <li class="rt-cell gen" class:pending={!made} class:newest>
        {#if made}
          <span class="rt-word">{w}</span>
          <span class="rt-tag">{newest ? 'next input' : `${ms(arrivalMs(cfg, j + 1))}`}</span>
        {:else}
          <span class="rt-word" aria-hidden="true">{j + 1}</span>
          <span class="rt-tag">not yet</span>
        {/if}
      </li>
    {/each}
  </ul>

  <dl class="rt-counters">
    <div><dt>Forward passes</dt><dd>{st.passes} of {cfg.totalPasses}</dd></div>
    <div><dt>KV cache entries</dt><dd>{st.kvEntries}</dd></div>
    <div><dt>Elapsed</dt><dd>{ms(st.elapsedMs)}</dd></div>
    <div><dt>TTFT</dt><dd>{st.ttftMs === null ? 'not yet' : ms(st.ttftMs)}</dd></div>
    <div><dt>ITL</dt><dd>{st.itlMs === null ? 'needs 2 tokens' : ms(st.itlMs)}</dd></div>
    <div><dt>Tokens generated</dt><dd>{st.tokensGenerated} of {cfg.N}</dd></div>
  </dl>

  <p class="rt-status" role="status">{status}</p>

  <svg viewBox="0 0 400 110" role="img" aria-label={svgLabel} class="rt-svg">
    <defs>
      <pattern id="{uid}-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="8" height="8" class="rt-hatch-bg" />
        <line x1="0" y1="0" x2="0" y2="8" class="rt-hatch-line" />
      </pattern>
    </defs>
    <text x={X0} y="26" class="rt-svg-text">Prefill</text>
    <text x={X0 + W} y="26" text-anchor="end" class="rt-svg-text">Decode</text>
    <rect x={x(0)} y="36" width={Math.max(x(cfg.ttftMs) - x(0), 1)} height="32"
      fill="url(#{uid}-hatch)" class="rt-seg" class:rt-future={st.step < 1} />
    {#each Array(cfg.N - 1) as _, j (j)}
      <rect x={x(arrivalMs(cfg, j + 1))} y="36" width={Math.max(x(arrivalMs(cfg, j + 2)) - x(arrivalMs(cfg, j + 1)), 1)}
        height="32" class="rt-seg rt-dec" class:rt-future={st.step < j + 2} />
    {/each}
    {#if st.step > 0}
      <line x1={x(st.elapsedMs)} x2={x(st.elapsedMs)} y1="30" y2="74" class="rt-now" />
    {/if}
    <text x={X0} y="96" class="rt-svg-text">0 ms</text>
    <text x={X0 + W} y="96" text-anchor="end" class="rt-svg-text">{ms(cfg.totalMs)}</text>
  </svg>

  <p class="rt-label" id="{uid}-kv">KV cache: {st.kvEntries} entries, one per token whose keys and values are stored</p>
  <div class="rt-kv" aria-labelledby="{uid}-kv" role="group">
    <div class="rt-kv-group">
      <p class="rt-kv-name">Prompt entries: {st.kvPrompt}</p>
      <ul class="rt-cells">
        {#each cfg.prompt.slice(0, st.kvPrompt) as w, i (i)}
          {@const fresh = st.phase === 'prefill' && i >= cfg.C}
          <li class="rt-kv-cell" class:kv-cached={i < cfg.C} class:kv-prompt={i >= cfg.C} class:fresh>
            <span class="rt-strip" aria-hidden="true"></span>
            <span class="rt-word">{w}</span>
            <span class="rt-tag">{i < cfg.C ? 'cached' : 'prompt'}{fresh ? ', new' : ''}</span>
          </li>
        {/each}
      </ul>
    </div>
    <div class="rt-kv-group">
      <p class="rt-kv-name">Generated entries: {st.kvGenerated}</p>
      {#if st.kvGenerated > 0}
        <ul class="rt-cells">
          {#each cfg.output.slice(0, st.kvGenerated) as w, j (j)}
            {@const fresh = st.phase === 'decode' && j === st.kvGenerated - 1}
            <li class="rt-kv-cell kv-gen" class:fresh>
              <span class="rt-strip" aria-hidden="true"></span>
              <span class="rt-word">{w}</span>
              <span class="rt-tag">generated{fresh ? ', new' : ''}</span>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
  <p class="rt-legend">
    Strip patterns: solid for prompt entries, dotted for entries read from the prefix cache, and diagonal stripes for
    generated entries. A thick outline marks entries written by the latest pass.
  </p>

  <details>
    <summary>How this model works</summary>
    <ul>
      <li>Each cell is one token. Real tokenizers often split a word into several tokens.</li>
      <li>The prefill pass processes every uncached prompt token in parallel. It writes their keys and values to the KV cache and produces the first output token. Time to first token (TTFT) equals the prefill time.</li>
      <li>Each decode pass processes only the newest token. It reads the cached keys and values of every earlier token, appends the newest token's keys and values, and produces one more token.</li>
      <li>The KV cache stores key and value tensors. It does not store attention outputs.</li>
      <li>After prefill the cache holds P entries, where P is the prompt length. After decode step i it holds P + i entries, and i + 1 tokens exist.</li>
      <li>N output tokens take 1 + (N − 1) = N forward passes. Elapsed time after n tokens equals TTFT + (n − 1) × ITL.</li>
      <li>Inter-token latency (ITL) is constant here. In a real server it grows slowly as the KV cache grows and changes with batch load.</li>
      <li>A prefix cache hit shrinks TTFT in proportion to the uncached share of the prompt: TTFT = prefill time × (P − C) / P, where C is the cached count. Real prefill cost is not exactly linear, because attention cost grows with sequence length.</li>
      <li>Prefill always computes at least one prompt token. The model needs a fresh pass over the last prompt token to produce the first output token, so C is at most P − 1.</li>
      <li>The model omits tokenization, network time, queueing, and batching with other requests.</li>
    </ul>
  </details>
</section>

<style>
  .rt { margin: var(--tessera-spacing-lg) 0; padding: var(--tessera-spacing-md); border: 1px solid var(--tessera-border);
    border-radius: 8px; background: var(--tessera-bg); color: var(--tessera-text); }
  .rt-presets, .rt-controls { display: flex; flex-wrap: wrap; gap: var(--tessera-spacing-sm); margin: var(--tessera-spacing-sm) 0; }
  .rt-btn { font: inherit; padding: 0.4rem 0.8rem; border: 2px solid var(--tessera-primary); border-radius: 6px;
    background: var(--tessera-bg); color: var(--tessera-primary-dark, var(--tessera-primary)); cursor: pointer; }
  .rt-btn[aria-pressed='true'] { background: var(--tessera-primary); color: var(--tessera-bg); }
  .rt-main { min-width: 5.5rem; font-weight: 600; }
  .rt-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .rt-btn:focus-visible, .rt input:focus-visible { outline: 3px solid var(--tessera-primary); outline-offset: 2px; }
  .rt-sliders { display: grid; grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); gap: var(--tessera-spacing-sm) var(--tessera-spacing-md); margin: var(--tessera-spacing-md) 0; }
  .rt-slider { display: grid; grid-template-columns: 1fr auto; gap: 0.25rem 0.5rem; align-items: center; }
  .rt-slider label { grid-column: 1 / -1; font-size: 0.9rem; font-weight: 600; }
  .rt-slider input { width: 100%; min-width: 0; }
  .rt-slider output { font-variant-numeric: tabular-nums; font-size: 0.9rem; white-space: nowrap; }
  .rt-label { margin: var(--tessera-spacing-md) 0 0.25rem; font-weight: 600; }
  .rt-cells { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 4px; }
  .rt-cell, .rt-kv-cell { display: flex; flex-direction: column; align-items: center; min-width: 2.8rem; padding: 0.2rem 0.4rem;
    border: 2px solid var(--tessera-border); border-radius: 4px; background: var(--tessera-bg); }
  .rt-word { font-weight: 600; font-size: 0.9rem; overflow-wrap: anywhere; }
  .rt-tag { font-size: 0.72rem; color: var(--tessera-text); }
  .rt-cell.pending { border-style: dashed; color: var(--tessera-text-light); }
  .rt-cell.pending .rt-tag { color: var(--tessera-text-light); }
  .rt-cell.computed { border-color: var(--tessera-primary); }
  .rt-cell.cached { border-style: dotted; border-color: var(--tessera-success); }
  .rt-cell.gen:not(.pending) { border-color: var(--tessera-text); }
  .rt-cell.newest { border-width: 3px; border-color: var(--tessera-warning); box-shadow: 0 0 0 2px var(--tessera-bg), 0 0 0 4px var(--tessera-warning); }
  .rt-counters { display: grid; grid-template-columns: repeat(auto-fit, minmax(7.5rem, 1fr)); gap: var(--tessera-spacing-sm); margin: var(--tessera-spacing-md) 0; }
  .rt-counters div { padding: 0.4rem 0.6rem; border: 1px solid var(--tessera-border); border-radius: 6px; background: var(--tessera-bg-secondary); }
  .rt-counters dt { font-size: 0.8rem; color: var(--tessera-text); }
  .rt-counters dd { margin: 0; font-size: 1.1rem; font-weight: 700; font-variant-numeric: tabular-nums; }
  .rt-status { padding: var(--tessera-spacing-sm) var(--tessera-spacing-md); border-left: 4px solid var(--tessera-primary);
    background: var(--tessera-bg-secondary); }
  .rt-svg { display: block; width: 100%; height: auto; margin: var(--tessera-spacing-md) 0; }
  .rt-svg-text { font-size: 18px; fill: var(--tessera-text); }
  .rt-hatch-bg { fill: var(--tessera-bg); }
  .rt-hatch-line { stroke: var(--tessera-primary); stroke-width: 3; }
  .rt-seg { stroke: var(--tessera-text); stroke-width: 1.5; }
  .rt-dec { fill: color-mix(in srgb, var(--tessera-primary) 35%, var(--tessera-bg)); }
  .rt-future { stroke-dasharray: 4 3; fill-opacity: 0.25; stroke: var(--tessera-text-light); }
  .rt-now { stroke: var(--tessera-error); stroke-width: 3; }
  .rt-kv { display: grid; gap: var(--tessera-spacing-sm); padding: var(--tessera-spacing-sm); border: 1px solid var(--tessera-border); border-radius: 6px; }
  .rt-kv-name { margin: 0 0 0.25rem; font-size: 0.9rem; font-weight: 600; }
  .rt-strip { align-self: stretch; height: 8px; margin-bottom: 2px; border-radius: 2px; }
  .kv-prompt .rt-strip { background: var(--tessera-primary); }
  .kv-cached .rt-strip { background: radial-gradient(circle, var(--tessera-success) 1.6px, transparent 2px) 0 0 / 6px 6px; }
  .kv-gen .rt-strip { background: repeating-linear-gradient(45deg, var(--tessera-text) 0 2px, transparent 2px 6px); }
  .rt-kv-cell.fresh { border-width: 3px; border-color: var(--tessera-text); }
  .rt-legend { font-size: 0.85rem; color: var(--tessera-text-light); }
  details { margin-top: var(--tessera-spacing-md); }
  summary { cursor: pointer; font-weight: 600; }
  @media (prefers-reduced-motion: no-preference) {
    .rt-cell, .rt-kv-cell { transition: border-color var(--tessera-transition-fast, 150ms ease); }
  }
</style>
