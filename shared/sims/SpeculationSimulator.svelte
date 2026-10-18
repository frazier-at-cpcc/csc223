<script>
  import {
    K_MIN, K_MAX, clampK, clampAlpha, mulberry32, expectedTokens, acceptedShare,
    verifyCost, stepCost, speedup, sweep, bestK, simulateStep,
  } from './speculation.js';

  let {
    k = 4,
    acceptance = 0.7,
    draftCost = 0.05,
    title = 'Speculative decoding simulator',
    headingLevel = 2,
  } = $props();

  const uid = `spec-${Math.random().toString(36).slice(2, 8)}`;
  const initial = () => ({
    k: clampK(k),
    a: clampAlpha(acceptance),
    c: Math.min(0.5, Math.max(0, Number(draftCost) || 0)),
  });
  const init = initial();

  let kv = $state(init.k);
  let alpha = $state(init.a);
  let cost = $state(init.c);
  let pressure = $state(0);

  const h = $derived(headingLevel === 3 ? 'h3' : 'h2');
  const hSub = $derived(headingLevel === 3 ? 'h4' : 'h3');

  // Model results.
  const E = $derived(expectedTokens(alpha, kv));
  const v = $derived(verifyCost(kv, pressure));
  const sc = $derived(stepCost(kv, cost, pressure));
  const S = $derived(speedup(alpha, kv, cost, pressure));
  const best = $derived(bestK(alpha, cost, pressure));
  const rows = $derived(sweep(alpha, cost, pressure));

  const f2 = (x) => x.toFixed(2);

  // Presets.
  const presets = [
    { name: 'Predictable text (high acceptance)', k: 5, a: 0.9, c: 0.05, p: 0 },
    { name: 'Creative text (low acceptance)', k: 4, a: 0.4, c: 0.05, p: 0 },
    { name: 'High batch size', k: 4, a: 0.8, c: 0.05, p: 0.8 },
    { name: 'Draft too long', k: 10, a: 0.6, c: 0.1, p: 0 },
  ];
  function applyPreset(p) {
    kv = p.k;
    alpha = p.a;
    cost = p.c;
    pressure = p.p;
    resetDemo();
  }

  // Step-through demo. All randomness for a step is drawn at once, so the stages only reveal it.
  let seed = $state(20231130);
  let rng = mulberry32(20231130);
  let stage = $state(0); // 0 none, 1 drafted, 2 verified, 3 accepted
  let current = $state(null);
  let passes = $state(0);
  let tokens = $state(0);
  let draftsProposed = $state(0);
  let draftsAccepted = $state(0);
  let output = $state([]);

  function resetDemo() {
    rng = mulberry32(seed);
    stage = 0;
    current = null;
    passes = 0;
    tokens = 0;
    draftsProposed = 0;
    draftsAccepted = 0;
    output = [];
  }
  function newSeed() {
    seed = Math.floor(Math.random() * 4294967296);
    resetDemo();
  }
  function commit() {
    passes += 1;
    tokens += current.produced;
    draftsProposed += kv;
    draftsAccepted += current.accepted;
    const added = current.drafts.slice(0, current.accepted).map((d) => d.text).concat(current.extra.text);
    output = [...output, ...added].slice(-24);
  }
  function begin() {
    current = simulateStep(rng, alpha, kv, tokens);
    stage = 1;
  }
  function nextStage() {
    if (stage === 0 || stage === 3) begin();
    else {
      stage += 1;
      if (stage === 3) commit();
    }
  }
  function runStep() {
    if (stage === 0 || stage === 3) begin();
    stage = 3;
    commit();
  }
  function runMany(n) {
    for (let i = 0; i < n; i++) runStep();
  }

  const perPass = $derived(passes ? tokens / passes : 0);
  const stageNames = ['', 'Stage 1 of 3: draft', 'Stage 2 of 3: verify in one target pass', 'Stage 3 of 3: accept'];
  const glyph = { accepted: '✓', rejected: '✗', discarded: '–', unverified: '?', generated: '+' };

  const demoSummary = $derived.by(() => {
    if (!current) return 'No step has run yet. Select Next stage or Run step.';
    const d = current.drafts.map((x) => x.text).join(', ');
    let s = '';
    if (stage === 1) s = `The draft model proposed ${kv} tokens, one after another: ${d}.`;
    else {
      const acc = current.accepted;
      const rej = current.drafts.find((x) => x.status === 'rejected');
      s = `The target model scored all ${kv + 1} positions in one forward pass. It accepted ${acc} of ${kv} drafts.`;
      if (rej) s += ` It rejected "${rej.text}" and discarded every draft after it.`;
      s += current.extra.kind === 'bonus'
        ? ` Every draft passed, so the pass adds a bonus token, "${current.extra.text}".`
        : ` The pass supplies its own token, "${current.extra.text}", at the rejected position.`;
      if (stage === 3) s += ` This pass produced ${current.produced} ${current.produced === 1 ? 'token' : 'tokens'}.`;
    }
    if (passes) s += ` Totals: ${passes} target ${passes === 1 ? 'pass' : 'passes'}, ${tokens} tokens, ${f2(perPass)} tokens per pass against an expected ${f2(E)}.`;
    return s;
  });

  // Chart geometry.
  const W = 360, H = 250, L = 44, R = 12, T = 18, B = 48;
  const yMax = $derived(Math.max(2, Math.ceil(Math.max(...rows.map((r) => Math.max(r.expected, r.speedup))))));
  const yStep = $derived(yMax > 6 ? 2 : 1);
  const xs = (kk) => L + ((kk - K_MIN) / (K_MAX - K_MIN)) * (W - L - R);
  const ys = (y) => H - B - (y / yMax) * (H - T - B);
  const path = (key) => rows.map((r, i) => `${i ? 'L' : 'M'}${xs(r.k).toFixed(1)},${ys(r[key]).toFixed(1)}`).join(' ');
  const yTicks = $derived(Array.from({ length: Math.floor(yMax / yStep) + 1 }, (_, i) => i * yStep));
  const chartLabel = $derived(
    `Line chart for acceptance rate ${f2(alpha)}. The solid line with circles shows expected tokens per target pass, ` +
      `rising from ${f2(rows[0].expected)} at k = 1 to ${f2(rows[rows.length - 1].expected)} at k = ${K_MAX}. ` +
      `The dashed line with squares shows estimated speedup, which peaks at ${f2(best.speedup)} times at k = ${best.k}. ` +
      `A dotted line marks 1, the rate of decode without speculation. The current setting, k = ${kv}, gives ` +
      `${f2(E)} tokens per pass and ${f2(S)} times speedup.`,
  );
</script>

<section class="sim" aria-labelledby="{uid}-title">
  <svelte:element this={h} id="{uid}-title">{title}</svelte:element>
  <p class="lead">
    A small draft model proposes k tokens. The target model then checks every draft in a single forward pass. During
    memory-bound decode, that one pass costs about the same as producing one ordinary token.
  </p>

  <div class="presets" role="group" aria-label="Scenario presets">
    {#each presets as p (p.name)}
      <button type="button" onclick={() => applyPreset(p)}>{p.name}</button>
    {/each}
  </div>

  <div class="controls">
    <div class="ctl">
      <label for="{uid}-k">Draft length, k (tokens per step)</label>
      <input id="{uid}-k" type="range" min={K_MIN} max={K_MAX} step="1" bind:value={kv} oninput={resetDemo} />
      <output for="{uid}-k">{kv} tokens</output>
    </div>
    <div class="ctl">
      <label for="{uid}-a">Acceptance rate, α (probability per draft token)</label>
      <input id="{uid}-a" type="range" min="0" max="1" step="0.01" bind:value={alpha} oninput={resetDemo} />
      <output for="{uid}-a">{f2(alpha)}</output>
    </div>
    <div class="ctl">
      <label for="{uid}-c">Draft step cost, c (fraction of one target step)</label>
      <input id="{uid}-c" type="range" min="0" max="0.5" step="0.01" bind:value={cost} />
      <output for="{uid}-c">{f2(cost)} of a target step</output>
    </div>
    <div class="ctl">
      <label for="{uid}-p">Batch pressure (0 = memory bound, 1 = compute bound)</label>
      <input id="{uid}-p" type="range" min="0" max="1" step="0.05" bind:value={pressure} />
      <output for="{uid}-p">{f2(pressure)}, verification costs {f2(v)} target steps</output>
    </div>
  </div>

  <div class="status" role="status">
    <p>
      With k = {kv} and α = {f2(alpha)}, one target pass yields {f2(E)} tokens on average, out of a maximum of
      {kv + 1}. One speculation step costs {f2(sc)} target steps: {kv} draft steps at {f2(cost)} each, plus
      verification at {f2(v)}.
    </p>
    <p>
      <strong>Estimated speedup: {f2(S)} times</strong> plain decode.
      {#if S < 1}Speculation slows decode at these settings.{/if}
      The best draft length here is k = {best.k}, at {f2(best.speedup)} times.
    </p>
  </div>

  <svelte:element this={hSub}>Step-through demo</svelte:element>
  <div class="demo-controls">
    <button type="button" onclick={nextStage}>Next stage</button>
    <button type="button" onclick={runStep}>Run step</button>
    <button type="button" onclick={() => runMany(10)}>Run 10 steps</button>
    <button type="button" class="secondary" onclick={resetDemo}>Reset</button>
    <button type="button" class="secondary" onclick={newSeed}>New random seed</button>
    <span class="seed">Seed {seed}</span>
  </div>

  <div class="stage-view">
    <p class="stage-name">{stage ? stageNames[stage] : 'Ready'}</p>

    <div class="lane">
      <p class="lane-label">Draft model: {kv} small sequential steps</p>
      <ol class="chips" aria-label="Draft tokens">
        {#if current && stage >= 1}
          {#each current.drafts as d, i (i)}
            {@const st = stage === 1 ? 'unverified' : d.status}
            <li class="chip is-{st}">
              <span class="pos">d{i + 1}</span>
              <span aria-hidden="true">{glyph[st]}</span>
              {d.text}
              <span class="sr-only">({st})</span>
            </li>
          {/each}
        {:else}
          {#each Array.from({ length: kv }) as _, i (i)}
            <li class="chip is-empty"><span class="pos">d{i + 1}</span> <span aria-hidden="true">…</span><span class="sr-only">empty</span></li>
          {/each}
        {/if}
      </ol>
    </div>

    <div class="pass" class:live={stage === 2}>
      <p class="lane-label">
        Target model: <strong>one forward pass</strong> scores all {kv + 1} positions in parallel
      </p>
      <ol class="cols" aria-label="Positions scored in one target forward pass">
        {#each Array.from({ length: kv + 1 }) as _, i (i)}
          {@const d = current?.drafts[i]}
          {@const t = current?.targets[i]}
          {@const isExtra = current && i === current.extra.index}
          <li class="col" class:extra={isExtra && stage >= 2}>
            <span class="pos">{i < kv ? `check d${i + 1}` : 'next'}</span>
            {#if current && stage >= 2}
              {#if isExtra}
                <span class="verdict">
                  {#if d}<span aria-hidden="true">✗</span> {d.text} rejected;{/if}
                  <span aria-hidden="true">+</span> target gives "{t}"
                  <span class="sr-only">({current.extra.kind} token)</span>
                </span>
              {:else if d?.status === 'accepted'}
                <span class="verdict"><span aria-hidden="true">✓</span> {d.text} matches</span>
              {:else}
                <span class="verdict muted"><span aria-hidden="true">–</span> unused</span>
              {/if}
            {:else}
              <span class="verdict muted" aria-hidden="true">·</span>
            {/if}
          </li>
        {/each}
      </ol>
      <p class="note">
        The weights travel from memory to the processor one time for this whole row. Plain decode needs one such trip
        for every token.
      </p>
    </div>

    <div class="lane">
      <p class="lane-label">
        Accepted output{#if current && stage === 3}: +{current.produced} {current.produced === 1 ? 'token' : 'tokens'} from one target pass{/if}
      </p>
      <ol class="chips" aria-label="Tokens kept from this step">
        {#if current && stage === 3}
          {#each current.drafts.slice(0, current.accepted) as d, i (i)}
            <li class="chip is-accepted"><span aria-hidden="true">✓</span> {d.text}<span class="sr-only">(accepted draft)</span></li>
          {/each}
          <li class="chip is-generated">
            <span aria-hidden="true">+</span> {current.extra.text}
            <span class="tag">{current.extra.kind}</span>
          </li>
        {:else}
          <li class="chip is-empty"><span aria-hidden="true">…</span><span class="sr-only">nothing yet</span></li>
        {/if}
      </ol>
    </div>

    <ul class="legend" aria-label="Legend">
      <li><span aria-hidden="true">?</span> Unverified draft</li>
      <li><span aria-hidden="true">✓</span> Accepted</li>
      <li><span aria-hidden="true">✗</span> Rejected</li>
      <li><span aria-hidden="true">–</span> Discarded or unused</li>
      <li><span aria-hidden="true">+</span> Token from the target model</li>
    </ul>
  </div>

  <dl class="counters">
    <div><dt>Target passes</dt><dd>{passes}</dd></div>
    <div><dt>Tokens produced</dt><dd>{tokens}</dd></div>
    <div><dt>Tokens per pass so far</dt><dd>{passes ? f2(perPass) : '–'}</dd></div>
    <div><dt>Expected tokens per pass</dt><dd>{f2(E)}</dd></div>
    <div><dt>Drafts accepted</dt><dd>{draftsAccepted} of {draftsProposed}</dd></div>
  </dl>
  <p class="output-text">
    <span class="lane-label">Output so far:</span>
    {output.length ? output.join(' ') : 'empty'}
  </p>
  <div class="status" role="status"><p>{demoSummary}</p></div>

  <svelte:element this={hSub}>Expected value across draft lengths</svelte:element>
  <svg viewBox="0 0 {W} {H}" role="img" aria-label={chartLabel}>
    {#each yTicks as y (y)}
      <line class="grid" x1={L} x2={W - R} y1={ys(y)} y2={ys(y)} />
      <text class="tick" x={L - 6} y={ys(y) + 4} text-anchor="end">{y}</text>
    {/each}
    {#each rows as r (r.k)}
      <text class="tick" x={xs(r.k)} y={H - B + 16} text-anchor="middle">{r.k}</text>
    {/each}
    <text class="axis" x={(L + W - R) / 2} y={H - 6} text-anchor="middle">Draft length k (tokens)</text>
    <text class="axis ylab" transform="translate(14 {(T + H - B) / 2}) rotate(-90)" text-anchor="middle">Tokens per pass or speedup</text>

    <line class="base" x1={L} x2={W - R} y1={ys(1)} y2={ys(1)} />
    <line class="cur" x1={xs(kv)} x2={xs(kv)} y1={T} y2={H - B} />
    <text class="axis" x={xs(kv) + (kv > 7 ? -4 : 4)} y={T + 10} text-anchor={kv > 7 ? 'end' : 'start'}>k = {kv}</text>

    <path class="l-exp" d={path('expected')} />
    <path class="l-spd" d={path('speedup')} />
    {#each rows as r (r.k)}
      <circle class="m-exp" cx={xs(r.k)} cy={ys(r.expected)} r={r.k === kv ? 5.5 : 3.5} />
      <rect class="m-spd" x={xs(r.k) - (r.k === kv ? 5 : 3.5)} y={ys(r.speedup) - (r.k === kv ? 5 : 3.5)}
        width={r.k === kv ? 10 : 7} height={r.k === kv ? 10 : 7} />
    {/each}
  </svg>
  <ul class="legend" aria-label="Chart legend">
    <li><svg class="key" viewBox="0 0 28 10" aria-hidden="true"><line class="l-exp" x1="0" x2="28" y1="5" y2="5" /><circle class="m-exp" cx="14" cy="5" r="3.5" /></svg> Expected tokens per target pass</li>
    <li><svg class="key" viewBox="0 0 28 10" aria-hidden="true"><line class="l-spd" x1="0" x2="28" y1="5" y2="5" /><rect class="m-spd" x="10.5" y="1.5" width="7" height="7" /></svg> Estimated speedup (times)</li>
    <li><svg class="key" viewBox="0 0 28 10" aria-hidden="true"><line class="base" x1="0" x2="28" y1="5" y2="5" /></svg> Decode without speculation (1)</li>
  </ul>

  <details>
    <summary>How this model works</summary>
    <ul>
      <li>
        Each draft token is accepted with the same probability α, independently of the others. Real acceptance falls
        deeper in a draft and varies with temperature and subject matter. This follows Leviathan, Kalman, and Matias
        (2023).
      </li>
      <li>
        Drafts are accepted left to right until the first rejection. Every draft after a rejection is discarded,
        because it was built on a wrong prefix.
      </li>
      <li>
        The target pass always contributes one token of its own. That token is the correction at the first rejection,
        or a bonus token when all k drafts pass. One pass therefore yields between 1 and k + 1 tokens.
      </li>
      <li>
        Expected tokens per target pass equal (1 − α<sup>k+1</sup>) / (1 − α). When α = 1, the value is k + 1.
      </li>
      <li>
        The expected share of drafts accepted equals (expected tokens − 1) / k. For these settings it is
        {f2(acceptedShare(alpha, kv))}, which sits below α because drafts after a rejection never count.
      </li>
      <li>
        Speedup equals expected tokens divided by (k × c + v). The term k × c is the cost of k draft steps. The term
        v is the cost of one verification pass, both measured in ordinary target decode steps.
      </li>
      <li>
        v equals 1 + (batch pressure × k). At zero pressure, decode is memory bound, so scoring k + 1 positions costs
        the same as one. At full pressure, decode is compute bound, so each extra position costs a full step. The
        linear blend between those limits is a simplification.
      </li>
      <li>
        The model ignores draft-model prefill, extra KV cache memory, and orchestration overhead. It also holds c
        constant as batch size grows.
      </li>
      <li>
        The demo matches drafts against a fixed sentence and treats one word as one token. With sampling, real
        verification accepts or rejects each draft by probability rather than by exact match. The seeded generator
        makes each run repeatable.
      </li>
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
    max-width: 100%;
    overflow-wrap: anywhere;
  }
  .sim > :global(h2),
  .sim > :global(h3) {
    margin-top: 0;
  }
  .lead {
    margin-top: 0;
  }
  button {
    font: inherit;
    padding: 0.4rem 0.8rem;
    border-radius: 0.375rem;
    border: 1px solid var(--tessera-primary);
    background: var(--tessera-primary);
    color: #fff;
    cursor: pointer;
  }
  button.secondary,
  .presets button {
    background: var(--tessera-bg);
    color: var(--tessera-primary-dark, var(--tessera-primary));
  }
  button:focus-visible,
  input:focus-visible,
  summary:focus-visible {
    outline: 3px solid var(--tessera-primary);
    outline-offset: 2px;
  }
  .presets,
  .demo-controls {
    display: flex;
    flex-wrap: wrap;
    gap: var(--tessera-spacing-sm);
    align-items: center;
    margin-bottom: var(--tessera-spacing-md);
  }
  .seed {
    font-size: 0.875rem;
  }
  .controls {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
    gap: var(--tessera-spacing-md);
  }
  .ctl {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .ctl label {
    font-weight: 600;
  }
  .ctl input {
    width: 100%;
  }
  .status {
    background: var(--tessera-bg-secondary);
    border-left: 4px solid var(--tessera-primary);
    padding: var(--tessera-spacing-sm) var(--tessera-spacing-md);
    margin: var(--tessera-spacing-md) 0;
  }
  .status p {
    margin: 0.25rem 0;
  }
  .stage-view {
    border: 1px solid var(--tessera-border);
    border-radius: 0.5rem;
    padding: var(--tessera-spacing-sm);
  }
  .stage-name {
    font-weight: 600;
    margin: 0 0 var(--tessera-spacing-sm);
  }
  .lane,
  .pass {
    margin-bottom: var(--tessera-spacing-sm);
  }
  .lane-label {
    font-weight: 600;
    margin: 0 0 0.25rem;
  }
  .chips,
  .cols,
  .legend {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }
  .chip {
    display: inline-flex;
    gap: 0.3rem;
    align-items: baseline;
    padding: 0.2rem 0.5rem;
    border: 2px solid var(--tessera-border);
    border-radius: 999px;
    background: var(--tessera-bg);
  }
  .pos {
    font-size: 0.75rem;
    color: var(--tessera-text);
  }
  .is-unverified {
    border-style: dashed;
    border-color: var(--tessera-text);
  }
  .is-accepted {
    border-color: var(--tessera-success);
  }
  .is-rejected {
    border-color: var(--tessera-error);
  }
  .is-discarded {
    border-style: dotted;
    text-decoration: line-through;
  }
  .is-generated {
    border-color: var(--tessera-primary);
    border-width: 3px;
    font-weight: 600;
  }
  .tag {
    font-size: 0.75rem;
    font-weight: 400;
  }
  .pass {
    border: 3px solid var(--tessera-primary);
    border-radius: 0.5rem;
    padding: var(--tessera-spacing-sm);
    background: var(--tessera-bg-secondary);
  }
  .cols {
    gap: 0;
  }
  .col {
    flex: 1 1 5.5rem;
    min-width: 5.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    padding: 0.35rem;
    border: 1px solid var(--tessera-border);
    background: var(--tessera-bg);
    font-size: 0.875rem;
  }
  .col.extra {
    outline: 3px solid var(--tessera-primary);
    outline-offset: -3px;
    font-weight: 600;
  }
  .muted {
    font-style: italic;
  }
  .note {
    font-size: 0.875rem;
    margin: 0.4rem 0 0;
  }
  .legend {
    margin-top: var(--tessera-spacing-sm);
    font-size: 0.875rem;
    gap: 0.25rem 1rem;
  }
  .legend li {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
  }
  .counters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 9rem), 1fr));
    gap: var(--tessera-spacing-sm);
    margin: var(--tessera-spacing-md) 0 0;
  }
  .counters div {
    background: var(--tessera-bg-secondary);
    border: 1px solid var(--tessera-border);
    border-radius: 0.375rem;
    padding: 0.4rem 0.6rem;
  }
  .counters dt {
    font-size: 0.8rem;
  }
  .counters dd {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
  }
  .output-text {
    font-family: ui-monospace, monospace;
    font-size: 0.875rem;
  }
  svg[role='img'] {
    width: 100%;
    max-width: 40rem;
    height: auto;
    display: block;
  }
  .grid {
    stroke: var(--tessera-border);
  }
  .tick,
  .axis {
    fill: var(--tessera-text);
    font-size: 15px;
  }
  .ylab {
    font-size: 13px;
  }
  .base {
    stroke: var(--tessera-text);
    stroke-dasharray: 2 3;
    stroke-width: 1.5;
  }
  .cur {
    stroke: var(--tessera-warning);
    stroke-width: 2;
  }
  .l-exp,
  .l-spd {
    fill: none;
    stroke-width: 2.5;
  }
  .l-exp {
    stroke: var(--tessera-primary);
  }
  .l-spd {
    stroke: var(--tessera-text);
    stroke-dasharray: 7 4;
  }
  .m-exp {
    fill: var(--tessera-primary);
  }
  .m-spd {
    fill: var(--tessera-bg);
    stroke: var(--tessera-text);
    stroke-width: 2;
  }
  .key {
    width: 28px;
    height: 10px;
  }
  details {
    margin-top: var(--tessera-spacing-md);
  }
  summary {
    cursor: pointer;
    font-weight: 600;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  @media (prefers-reduced-motion: no-preference) {
    .pass.live {
      animation: pulse 0.6s ease 1;
    }
    @keyframes pulse {
      from {
        box-shadow: 0 0 0 0 var(--tessera-primary);
      }
      to {
        box-shadow: 0 0 0 8px transparent;
      }
    }
  }
</style>
