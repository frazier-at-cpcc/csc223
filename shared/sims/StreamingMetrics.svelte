<script>
  import {
    textMetrics,
    speechMetrics,
    tokensAt,
    READING_WPM,
    WORDS_PER_TOKEN,
    TEXT_PRESETS,
    SPEECH_PRESETS,
  } from './streaming-metrics.js';

  let {
    mode = 'text',
    title,
    headingLevel = 2,
    // text mode
    ttftMs = 300,
    tps = 50,
    outputTokens = 400,
    streams = 32,
    // speech mode
    ttfbMs = 150,
    speechTps = 100,
    realtimeTps = 90,
    gpuTps = 3000,
    sentenceSeconds = 2,
  } = $props();

  const uid = $props.id();
  const speech = $derived(mode === 'speech');
  const level = $derived(headingLevel === 3 ? 3 : 2);
  const heading = $derived(
    title ?? (speech ? 'Speech Streaming and Real-Time Capacity' : 'Streaming Latency and Throughput'),
  );

  // Controls start from the props; the learner owns them afterward.
  // svelte-ignore state_referenced_locally
  let c = $state({ ttftMs, tps, outputTokens, streams });
  // svelte-ignore state_referenced_locally
  let s = $state({ ttfbMs, tps: speechTps, realtimeTps, gpuTps, sentenceSeconds });

  const t = $derived(textMetrics(c));
  const sp = $derived(speechMetrics(s));

  const nf = (n, d = 0) => n.toLocaleString('en-US', { maximumFractionDigits: d, minimumFractionDigits: 0 });
  const fmtMs = (ms) => (ms < 1000 ? `${nf(ms, ms < 10 ? 1 : 0)} ms` : `${nf(ms / 1000, ms < 10000 ? 2 : 1)} s`);

  function applyText(p) {
    stop();
    c = { ttftMs: p.ttftMs, tps: p.tps, outputTokens: p.outputTokens, streams: p.streams };
  }
  function applySpeech(p) {
    s = { ttfbMs: p.ttfbMs, tps: p.tps, realtimeTps: p.realtimeTps, gpuTps: p.gpuTps, sentenceSeconds: p.sentenceSeconds };
  }

  // ---------- token stream animation (text mode) ----------
  let reduced = $state(false);
  let playing = $state(false);
  let elapsed = $state(0);
  let raf = 0;

  $effect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reduced = mq.matches;
    const on = (e) => (reduced = e.matches);
    mq.addEventListener('change', on);
    return () => {
      mq.removeEventListener('change', on);
      cancelAnimationFrame(raf);
    };
  });

  // Any change to the settings ends a playback and shows the finished response.
  $effect(() => {
    const end = t.e2eMs;
    stop();
    elapsed = end;
  });

  function stop() {
    cancelAnimationFrame(raf);
    playing = false;
  }
  function play() {
    if (playing) {
      stop();
      return;
    }
    if (reduced) {
      elapsed = t.e2eMs;
      return;
    }
    const start = performance.now();
    playing = true;
    const tick = (now) => {
      elapsed = Math.min(now - start, t.e2eMs);
      if (elapsed >= t.e2eMs) playing = false;
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  }

  const arrived = $derived(tokensAt(elapsed, c));
  const CELLS = 100;
  const perCell = $derived(Math.max(1, Math.ceil(c.outputTokens / CELLS)));
  const cellCount = $derived(Math.ceil(c.outputTokens / perCell));

  // ---------- chart helpers ----------
  const W = 420;
  const H = 230;
  const M = { l: 48, r: 14, t: 14, b: 40 };
  const PW = W - M.l - M.r;
  const PH = H - M.t - M.b;

  function ticks(max, count = 5) {
    const raw = max / count;
    const mag = 10 ** Math.floor(Math.log10(raw));
    const step = [1, 2, 5, 10].map((m) => m * mag).find((v) => v >= raw);
    const out = [];
    for (let v = 0; v <= max + 1e-9; v += step) out.push(+v.toFixed(6));
    return out;
  }

  // A reader cannot pass the newest token. When reading outpaces generation, the reader line
  // meets the generation line, where r(t - f) = 1 + g(t - f), and then follows it.
  function readPath(X, Y, f) {
    const r = t.readTps;
    const g = c.tps;
    const start = `M${X(f)},${Y(0)}`;
    const meet = r > g ? r / (r - g) : Infinity;
    if (meet >= c.outputTokens) return `${start} L${X(t.readEndMs / 1000)},${Y(c.outputTokens)}`;
    return `${start} L${X(f + meet / r)},${Y(meet)} L${X(t.e2eMs / 1000)},${Y(c.outputTokens)}`;
  }

  // Text chart: cumulative tokens against time in seconds.
  const tx = $derived.by(() => {
    // The axis ends shortly after the last token; the reading line is clipped at the edge.
    const xMax = (t.e2eMs / 1000) * 1.2;
    const yMax = c.outputTokens;
    const X = (sec) => M.l + (sec / xMax) * PW;
    const Y = (tok) => M.t + PH - (tok / yMax) * PH;
    const f = c.ttftMs / 1000;
    return {
      X,
      Y,
      xTicks: ticks(xMax),
      yTicks: ticks(yMax, 4),
      ttftX: X(f),
      gen: `M${X(0)},${Y(0)} L${X(f)},${Y(0)} L${X(f)},${Y(1)} L${X(t.e2eMs / 1000)},${Y(yMax)}`,
      read: readPath(X, Y, f),
    };
  });

  // Speech chart: seconds of audio generated and played against wall-clock seconds.
  const sx = $derived.by(() => {
    const b = s.ttfbMs / 1000;
    const xMax = Math.max(sp.ttfsMs / 1000, b + s.sentenceSeconds) * 1.4;
    const genEnd = (xMax - b) * sp.rtMultiple;
    const playEnd = xMax - b;
    const yMax = Math.max(genEnd, playEnd, s.sentenceSeconds) * 1.05;
    const X = (sec) => M.l + (sec / xMax) * PW;
    const Y = (a) => M.t + PH - (a / yMax) * PH;
    return {
      X,
      Y,
      xTicks: ticks(xMax),
      yTicks: ticks(yMax, 4),
      gen: `M${X(0)},${Y(0)} L${X(b)},${Y(0)} L${X(xMax)},${Y(genEnd)}`,
      play: `M${X(b)},${Y(0)} L${X(xMax)},${Y(playEnd)}`,
      sentY: Y(s.sentenceSeconds),
      ttfs: { x: X(sp.ttfsMs / 1000), y: Y(s.sentenceSeconds) },
      ttfbX: X(b),
    };
  });

  // Capacity bar: GPU aggregate throughput divided into real-time streams.
  const CW = 420;
  const cap = $derived.by(() => {
    const scale = (CW - 2) / s.gpuTps;
    const used = sp.maxStreams * s.realtimeTps;
    return { scale, usedW: used * scale, seg: s.realtimeTps * scale, used };
  });

  const textStatus = $derived(
    `The first token arrives ${fmtMs(c.ttftMs)} after the request. ` +
      `Each later token follows ${fmtMs(t.itlMs)} after the one before it, so one user perceives ${nf(t.perceivedTps)} tokens per second. ` +
      `The full ${nf(c.outputTokens)}-token response completes ${fmtMs(t.e2eMs)} after the request. ` +
      `Across ${nf(c.streams)} concurrent ${c.streams === 1 ? 'stream' : 'streams'}, the service generates a total of ${nf(t.totalTps)} tokens per second. ` +
      (t.readMultiple >= 1
        ? `Perceived TPS is ${nf(t.readMultiple, 1)} times a typical reading pace of ${nf(t.readTps, 1)} tokens per second.`
        : `Perceived TPS is below a typical reading pace of ${nf(t.readTps, 1)} tokens per second, so a reader waits for each new token.`),
  );

  const speechStatus = $derived(
    (sp.keepsAhead
      ? `Generation runs at ${nf(sp.rtMultiple, 2)} times the real-time rate, so it keeps ahead of playback. `
      : `Generation runs at ${nf(sp.rtMultiple, 2)} times the real-time rate, so playback outruns generation and the listener hears gaps. `) +
      `The first audio byte arrives after ${fmtMs(s.ttfbMs)}. ` +
      `The first ${nf(s.sentenceSeconds, 1)}-second sentence needs ${nf(sp.sentenceTokens)} audio tokens and is ready after ${fmtMs(sp.ttfsMs)}. ` +
      (sp.maxStreams > 0
        ? `One GPU with ${nf(s.gpuTps)} tokens per second of aggregate throughput sustains ${nf(sp.maxStreams)} concurrent real-time ${sp.maxStreams === 1 ? 'stream' : 'streams'}.`
        : sp.keepsAhead
          ? `The GPU's aggregate throughput is below the real-time rate, so it sustains no real-time streams.`
          : `A single stream cannot reach the real-time rate, so the GPU sustains no real-time streams.`),
  );
</script>

<section class="sim" aria-labelledby="{uid}-h">
  <svelte:element this={`h${level}`} id="{uid}-h">{heading}</svelte:element>

  <div class="presets" role="group" aria-label="Scenario presets">
    <span class="presets-label">Load a scenario:</span>
    {#each speech ? SPEECH_PRESETS : TEXT_PRESETS as p}
      <button type="button" onclick={() => (speech ? applySpeech(p) : applyText(p))}>{p.name}</button>
    {/each}
  </div>

  {#if !speech}
    <div class="controls">
      <div class="control">
        <div class="row">
          <label for="{uid}-ttft">Time to first token (TTFT)</label>
          <output for="{uid}-ttft">{nf(c.ttftMs)} ms</output>
        </div>
        <input id="{uid}-ttft" type="range" min="50" max="5000" step="50" bind:value={c.ttftMs} />
      </div>
      <div class="control">
        <div class="row">
          <label for="{uid}-tps">Per-stream decode speed</label>
          <output for="{uid}-tps">{nf(c.tps)} tokens/s</output>
        </div>
        <input id="{uid}-tps" type="range" min="1" max="300" step="1" bind:value={c.tps} />
      </div>
      <div class="control">
        <div class="row">
          <label for="{uid}-len">Output length</label>
          <output for="{uid}-len">{nf(c.outputTokens)} tokens</output>
        </div>
        <input id="{uid}-len" type="range" min="10" max="2000" step="10" bind:value={c.outputTokens} />
      </div>
      <div class="control">
        <div class="row">
          <label for="{uid}-con">Concurrent streams, one per user</label>
          <output for="{uid}-con">{nf(c.streams)} streams</output>
        </div>
        <input id="{uid}-con" type="range" min="1" max="512" step="1" bind:value={c.streams} />
      </div>
    </div>

    <dl class="metrics">
      <div><dt>Inter-token latency</dt><dd>{fmtMs(t.itlMs)}</dd></div>
      <div><dt>Perceived TPS, one user</dt><dd>{nf(t.perceivedTps)} tokens/s</dd></div>
      <div><dt>Total TPS, whole service</dt><dd>{nf(t.totalTps)} tokens/s</dd></div>
      <div><dt>End-to-end latency</dt><dd>{fmtMs(t.e2eMs)}</dd></div>
      <div>
        <dt>Multiple of reading pace, {nf(t.readTps, 1)} tokens/s</dt>
        <dd>{nf(t.readMultiple, 1)} ×</dd>
      </div>
    </dl>

    <p class="status" role="status">{textStatus}</p>

    <svelte:element this={`h${level + 1}`} class="sub">Token stream</svelte:element>
    <div class="stream">
      <div class="stream-bar">
        <button type="button" onclick={play}>{playing ? 'Stop' : 'Play the response'}</button>
        <span class="counter">
          {fmtMs(elapsed)} after the request: {nf(arrived)} of {nf(c.outputTokens)} tokens received{elapsed < c.ttftMs
            ? ', waiting for the first token'
            : ''}
        </span>
      </div>
      {#if reduced}
        <p class="note">Your system requests reduced motion, so Play shows the finished response without animation.</p>
      {/if}
      <div class="cells" aria-hidden="true">
        {#each { length: cellCount } as _, i}
          <span class="cell" class:on={(i + 1) * perCell <= arrived || (i * perCell < arrived && arrived === c.outputTokens)}></span>
        {/each}
      </div>
      <p class="note">Each square is {perCell === 1 ? 'one token' : `${nf(perCell)} tokens`}.</p>
    </div>

    <svg
      viewBox="0 0 {W} {H}"
      role="img"
      aria-label="Line chart of tokens received over time. The solid generation line stays at zero for the {fmtMs(c.ttftMs)} TTFT, then climbs to {nf(c.outputTokens)} tokens at {fmtMs(t.e2eMs)}. The dashed reading line climbs at {nf(t.readTps, 1)} tokens per second{t.readMultiple >= 1 ? ', below the generation line' : ' until it meets the generation line, where the reader waits for new tokens'}."
    >
      <defs>
        <pattern id="{uid}-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" class="hatch" />
        </pattern>
      
        <clipPath id="{uid}-clip"><rect x={M.l} y={M.t} width={PW} height={PH} /></clipPath>
      </defs>
      <rect x={M.l} y={M.t} width={Math.max(0, tx.ttftX - M.l)} height={PH} fill="url(#{uid}-hatch)" />
      {#each tx.xTicks as v}
        <line x1={tx.X(v)} x2={tx.X(v)} y1={M.t + PH} y2={M.t + PH + 4} class="axis" />
        <text x={tx.X(v)} y={M.t + PH + 16} text-anchor="middle">{nf(v, 2)}</text>
      {/each}
      {#each tx.yTicks as v}
        <line x1={M.l} x2={M.l + PW} y1={tx.Y(v)} y2={tx.Y(v)} class="grid" />
        <text x={M.l - 6} y={tx.Y(v) + 4} text-anchor="end">{nf(v)}</text>
      {/each}
      <line x1={M.l} x2={M.l + PW} y1={M.t + PH} y2={M.t + PH} class="axis" />
      <line x1={M.l} x2={M.l} y1={M.t} y2={M.t + PH} class="axis" />
      <text x={M.l + PW / 2} y={H - 4} text-anchor="middle">Time since request (s)</text>
      <text x="12" y={M.t + PH / 2} text-anchor="middle" transform="rotate(-90 12 {M.t + PH / 2})">Tokens</text>
      <path d={tx.read} class="line read" clip-path="url(#{uid}-clip)" />
      <path d={tx.gen} class="line gen" />
      {#if elapsed < t.e2eMs || playing}
        <line x1={tx.X(elapsed / 1000)} x2={tx.X(elapsed / 1000)} y1={M.t} y2={M.t + PH} class="playhead" />
      {/if}
    </svg>
    <ul class="legend">
      <li><svg width="28" height="10" aria-hidden="true"><line x1="0" y1="5" x2="28" y2="5" class="line gen" /></svg> Tokens generated (solid)</li>
      <li><svg width="28" height="10" aria-hidden="true"><line x1="0" y1="5" x2="28" y2="5" class="line read" /></svg> Human reading pace (dashed)</li>
      <li><svg width="16" height="12" aria-hidden="true"><rect width="16" height="12" fill="url(#{uid}-hatch)" class="swatch" /></svg> TTFT wait (hatched)</li>
    </ul>

    <details>
      <summary>How this model works</summary>
      <ul>
        <li>Inter-token latency (ITL) equals 1,000 divided by perceived TPS, as Chapter 1 defines it.</li>
        <li>TTFT here is the full wait the user sees before the first token. It therefore includes network and queue time.</li>
        <li>
          End-to-end latency equals TTFT plus (output tokens − 1) × ITL. The first token arrives at TTFT, and each
          remaining token follows one ITL later.
        </li>
        <li>
          Total TPS equals perceived TPS × concurrent streams. The model holds per-stream speed constant as concurrency
          grows. On a real GPU, larger batches raise total TPS and lower each user's perceived TPS.
        </li>
        <li>Decode speed is steady. Real ITL varies from token to token, which is why Chapter 1 reports percentiles.</li>
        <li>
          The reading reference assumes {READING_WPM} words per minute and about {WORDS_PER_TOKEN} English words per token,
          or about {nf(t.readTps, 1)} tokens per second.
        </li>
      </ul>
    </details>
  {:else}
    <div class="controls">
      <div class="control">
        <div class="row">
          <label for="{uid}-ttfb">Time to first byte (TTFB)</label>
          <output for="{uid}-ttfb">{nf(s.ttfbMs)} ms</output>
        </div>
        <input id="{uid}-ttfb" type="range" min="50" max="2000" step="10" bind:value={s.ttfbMs} />
      </div>
      <div class="control">
        <div class="row">
          <label for="{uid}-stps">Single-stream decode speed</label>
          <output for="{uid}-stps">{nf(s.tps)} tokens/s</output>
        </div>
        <input id="{uid}-stps" type="range" min="10" max="400" step="5" bind:value={s.tps} />
      </div>
      <div class="control">
        <div class="row">
          <label for="{uid}-rt">Real-time threshold of the audio codec</label>
          <output for="{uid}-rt">{nf(s.realtimeTps)} tokens/s</output>
        </div>
        <input id="{uid}-rt" type="range" min="50" max="150" step="1" bind:value={s.realtimeTps} />
      </div>
      <div class="control">
        <div class="row">
          <label for="{uid}-gpu">GPU aggregate throughput</label>
          <output for="{uid}-gpu">{nf(s.gpuTps)} tokens/s</output>
        </div>
        <input id="{uid}-gpu" type="range" min="100" max="10000" step="100" bind:value={s.gpuTps} />
      </div>
      <div class="control">
        <div class="row">
          <label for="{uid}-sent">First sentence length</label>
          <output for="{uid}-sent">{nf(s.sentenceSeconds, 1)} s of audio</output>
        </div>
        <input id="{uid}-sent" type="range" min="0.5" max="10" step="0.5" bind:value={s.sentenceSeconds} />
      </div>
    </div>

    <dl class="metrics">
      <div>
        <dt>Keeps ahead of playback</dt>
        <dd class:ok={sp.keepsAhead} class:bad={!sp.keepsAhead}>
          {sp.keepsAhead ? 'Yes' : 'No'}, {nf(sp.rtMultiple, 2)} × real time
        </dd>
      </div>
      <div><dt>Time to first byte</dt><dd>{fmtMs(s.ttfbMs)}</dd></div>
      <div><dt>Time to first sentence</dt><dd>{fmtMs(sp.ttfsMs)}</dd></div>
      <div><dt>Real-time streams per GPU</dt><dd>{nf(sp.maxStreams)}</dd></div>
    </dl>

    <p class="status" role="status">{speechStatus}</p>

    <svg
      viewBox="0 0 {W} {H}"
      role="img"
      aria-label="Line chart of audio over time. The solid generation line starts at {fmtMs(s.ttfbMs)} and adds {nf(sp.rtMultiple, 2)} seconds of audio per second. The dashed playback line adds one second of audio per second. {sp.keepsAhead
        ? 'The generation line stays above the playback line.'
        : 'The playback line rises above the generation line, which means playback runs out of audio.'} The first sentence is ready at {fmtMs(sp.ttfsMs)}."
    >
      {#each sx.xTicks as v}
        <line x1={sx.X(v)} x2={sx.X(v)} y1={M.t + PH} y2={M.t + PH + 4} class="axis" />
        <text x={sx.X(v)} y={M.t + PH + 16} text-anchor="middle">{nf(v, 2)}</text>
      {/each}
      {#each sx.yTicks as v}
        <line x1={M.l} x2={M.l + PW} y1={sx.Y(v)} y2={sx.Y(v)} class="grid" />
        <text x={M.l - 6} y={sx.Y(v) + 4} text-anchor="end">{nf(v, 1)}</text>
      {/each}
      <line x1={M.l} x2={M.l + PW} y1={M.t + PH} y2={M.t + PH} class="axis" />
      <line x1={M.l} x2={M.l} y1={M.t} y2={M.t + PH} class="axis" />
      <text x={M.l + PW / 2} y={H - 4} text-anchor="middle">Time since request (s)</text>
      <text x="12" y={M.t + PH / 2} text-anchor="middle" transform="rotate(-90 12 {M.t + PH / 2})">Audio (s)</text>
      <line x1={M.l} x2={M.l + PW} y1={sx.sentY} y2={sx.sentY} class="line sent" />
      <path d={sx.play} class="line read" />
      <path d={sx.gen} class="line gen" />
      <circle cx={sx.ttfs.x} cy={sx.ttfs.y} r="5" class="mark" />
    </svg>
    <ul class="legend">
      <li><svg width="28" height="10" aria-hidden="true"><line x1="0" y1="5" x2="28" y2="5" class="line gen" /></svg> Audio generated (solid)</li>
      <li><svg width="28" height="10" aria-hidden="true"><line x1="0" y1="5" x2="28" y2="5" class="line read" /></svg> Real-time playback (dashed)</li>
      <li><svg width="28" height="10" aria-hidden="true"><line x1="0" y1="5" x2="28" y2="5" class="line sent" /></svg> First sentence length (dotted)</li>
      <li><svg width="14" height="14" aria-hidden="true"><circle cx="7" cy="7" r="5" class="mark" /></svg> First sentence ready (circle)</li>
    </ul>

    <svelte:element this={`h${level + 1}`} class="sub">GPU capacity in real-time streams</svelte:element>
    <svg
      viewBox="0 0 {CW} 44"
      role="img"
      aria-label="Bar of {nf(s.gpuTps)} tokens per second of GPU throughput. {nf(sp.maxStreams)} blocks of {nf(s.realtimeTps)} tokens per second fill {nf(cap.used)} of it, and the hatched remainder is unused headroom."
    >
      <defs>
        <pattern id="{uid}-hatch2" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" class="hatch" />
        </pattern>
      </defs>
      <rect x="1" y="4" width={CW - 2} height="28" fill="url(#{uid}-hatch2)" class="frame" />
      <rect x="1" y="4" width={cap.usedW} height="28" class="used" />
      {#if sp.maxStreams <= 120}
        {#each { length: sp.maxStreams } as _, i}
          <line x1={1 + i * cap.seg} x2={1 + i * cap.seg} y1="4" y2="32" class="divider" />
        {/each}
      {/if}
    </svg>
    <p class="note">
      Each solid block is one stream at {nf(s.realtimeTps)} tokens per second. {nf(sp.maxStreams)}
      {sp.maxStreams === 1 ? 'stream uses' : 'streams use'}
      {nf(cap.used)} of {nf(s.gpuTps)} tokens per second.
    </p>

    <details>
      <summary>How this model works</summary>
      <ul>
        <li>
          Audio plays at a fixed speed. The real-time threshold is the audio-token rate that produces one second of audio
          each second. Chapter 6 places it at about 80 to 100 tokens per second, depending on the model and its audio codec.
        </li>
        <li>Generation keeps ahead of playback when single-stream decode speed is at or above the threshold.</li>
        <li>
          Time to first sentence equals TTFB plus (first sentence length × threshold) ÷ decode speed. The model treats TTFB
          as the start of audio and counts the first sentence's tokens after it.
        </li>
        <li>
          Real-time streams per GPU equals the whole number part of (GPU aggregate throughput ÷ threshold). Each stream
          needs the threshold rate, so aggregate throughput sets how many streams fit. A stream that cannot reach the
          threshold on its own never plays in real time, so the count is zero in that case.
        </li>
        <li>
          Decode speed above the threshold shortens the time to first sentence. It does not change what the listener hears
          after playback starts.
        </li>
        <li>The model ignores audio decoder time, network time, and the drop in per-stream speed at large batch sizes.</li>
      </ul>
    </details>
  {/if}
</section>

<style>
  .sim {
    margin: var(--tessera-spacing-lg) 0;
    padding: var(--tessera-spacing-md);
    border: 1px solid var(--tessera-border);
    border-radius: 8px;
    background: var(--tessera-bg);
    color: var(--tessera-text);
    max-width: 100%;
    box-sizing: border-box;
  }
  .sim :global(h2),
  .sim :global(h3) {
    margin-top: 0;
  }
  .sub {
    font-size: 1rem;
    margin: var(--tessera-spacing-md) 0 var(--tessera-spacing-sm);
  }
  .presets {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--tessera-spacing-sm);
    margin-bottom: var(--tessera-spacing-md);
  }
  .presets-label {
    font-weight: 600;
  }
  button {
    font: inherit;
    padding: 0.4rem 0.8rem;
    border: 1px solid var(--tessera-primary);
    border-radius: 6px;
    background: var(--tessera-bg);
    color: var(--tessera-primary);
    cursor: pointer;
    min-height: 44px;
  }
  button:hover {
    background: var(--tessera-bg-secondary);
  }
  button:focus-visible,
  input:focus-visible {
    outline: 3px solid var(--tessera-primary);
    outline-offset: 2px;
  }
  .controls {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
    gap: var(--tessera-spacing-md);
  }
  .row {
    display: flex;
    justify-content: space-between;
    gap: var(--tessera-spacing-sm);
    flex-wrap: wrap;
  }
  .row label {
    font-weight: 600;
  }
  output {
    font-variant-numeric: tabular-nums;
  }
  input[type='range'] {
    width: 100%;
    accent-color: var(--tessera-primary);
  }
  .metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 9.5rem), 1fr));
    gap: var(--tessera-spacing-sm);
    margin: var(--tessera-spacing-md) 0;
  }
  .metrics div {
    padding: var(--tessera-spacing-sm);
    border: 1px solid var(--tessera-border);
    border-radius: 6px;
    background: var(--tessera-bg-secondary);
  }
  .metrics dt {
    font-size: 0.85rem;
  }
  .metrics dd {
    margin: 0.2rem 0 0;
    font-size: 1.1rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  .metrics dd.ok {
    color: #15803d;
  }
  .metrics dd.bad {
    color: var(--tessera-error);
  }
  .status {
    padding: var(--tessera-spacing-sm) var(--tessera-spacing-md);
    border-left: 4px solid var(--tessera-primary);
    background: var(--tessera-bg-secondary);
  }
  .stream-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--tessera-spacing-sm);
  }
  .counter {
    font-variant-numeric: tabular-nums;
  }
  .cells {
    display: grid;
    grid-template-columns: repeat(20, 1fr);
    gap: 3px;
    margin-top: var(--tessera-spacing-sm);
    max-width: 30rem;
  }
  .cell {
    aspect-ratio: 1;
    border: 1px solid var(--tessera-border);
    border-radius: 2px;
  }
  .cell.on {
    background: var(--tessera-primary);
    border-color: var(--tessera-primary);
  }
  .note {
    font-size: 0.9rem;
    margin: var(--tessera-spacing-sm) 0;
  }
  svg[role='img'] {
    display: block;
    width: 100%;
    height: auto;
    margin-top: var(--tessera-spacing-md);
  }
  svg text {
    fill: var(--tessera-text);
    font-size: 12px;
  }
  .axis {
    stroke: var(--tessera-text);
  }
  .grid {
    stroke: var(--tessera-border);
  }
  .hatch {
    stroke: var(--tessera-text-light);
    stroke-width: 2;
  }
  .line {
    fill: none;
    stroke-width: 3;
  }
  .gen {
    stroke: var(--tessera-primary);
  }
  .read {
    stroke: var(--tessera-text);
    stroke-dasharray: 7 5;
  }
  .sent {
    stroke: var(--tessera-text-light);
    stroke-width: 2;
    stroke-dasharray: 2 4;
  }
  .mark {
    fill: var(--tessera-bg);
    stroke: var(--tessera-primary);
    stroke-width: 3;
  }
  .playhead {
    stroke: var(--tessera-warning);
    stroke-width: 2;
  }
  .frame {
    stroke: var(--tessera-text);
  }
  .used {
    fill: var(--tessera-primary);
  }
  .divider {
    stroke: var(--tessera-bg);
    stroke-width: 1;
  }
  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: var(--tessera-spacing-sm) var(--tessera-spacing-md);
    list-style: none;
    padding: 0;
    margin: var(--tessera-spacing-sm) 0;
    font-size: 0.9rem;
  }
  .legend li {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  .swatch {
    stroke: var(--tessera-text-light);
  }
  details {
    margin-top: var(--tessera-spacing-md);
  }
  summary {
    cursor: pointer;
    font-weight: 600;
  }
</style>
