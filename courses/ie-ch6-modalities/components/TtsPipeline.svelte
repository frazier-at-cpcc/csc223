<script>
  // Figure 6.5, redrawn as a mechanism: an LLM backbone generates audio tokens one at a time
  // (continuous batching), and a separate audio decoder converts blocks of tokens to a waveform
  // in single passes (dynamic batching).
  import Figure from './Figure.svelte';
  const uid = $props.id();

  const description =
    'Text enters an LLM backbone, such as Orpheus TTS built on Llama 3.2 3B. The backbone generates audio tokens one at a time in a decode loop, and the engine adds and removes requests from the running batch at every step, which is continuous or in-flight batching. The stream of audio tokens flows to a separate audio decoder, such as SNAC. The audio decoder converts each block of tokens into a waveform in a single forward pass. It has no token-by-token loop, so it groups blocks with dynamic batching: a batch starts when it fills or when a short timer, such as 15 milliseconds, expires. The waveform streams to the listener.';
</script>

<Figure
  number="6.5"
  caption="Text-to-speech models synthesize input text into audio. An LLM backbone generates audio tokens, and a separate audio decoder turns them into a waveform. The two stages batch work in different ways."
  {description}
>
  <svg viewBox="0 0 800 230" role="img" aria-label="TTS pipeline: text to LLM backbone with continuous batching, audio tokens to an audio decoder with dynamic batching, then waveform to the listener">
    <defs>
      <marker id="arrow-{uid}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#0b5cad" />
      </marker>
    </defs>

    <g stroke="#0b5cad" stroke-width="1.5">
      <rect x="10" y="50" width="100" height="56" rx="6" fill="#e6f0fa" />
      <rect x="150" y="34" width="200" height="88" rx="6" fill="#ffffff" stroke-width="2" />
      <rect x="470" y="34" width="190" height="88" rx="6" fill="#ffffff" stroke-width="2" />
      <rect x="696" y="50" width="96" height="56" rx="6" fill="#e6f0fa" />
    </g>
    <text x="60" y="82" text-anchor="middle" font-size="14">Text</text>

    <text x="250" y="60" text-anchor="middle" font-size="14" font-weight="700">LLM backbone</text>
    <text x="250" y="80" text-anchor="middle" font-size="12">for example Orpheus TTS</text>
    <text x="250" y="98" text-anchor="middle" font-size="12">one audio token per step</text>
    <path d="M320,122 C320,150 180,150 180,126" fill="none" stroke="#0b5cad" stroke-width="1.5" marker-end="url(#arrow-{uid})" />

    <text x="565" y="60" text-anchor="middle" font-size="14" font-weight="700">Audio decoder</text>
    <text x="565" y="80" text-anchor="middle" font-size="12">for example SNAC</text>
    <text x="565" y="98" text-anchor="middle" font-size="12">one pass per token block</text>

    <line x1="110" y1="78" x2="146" y2="78" stroke="#0b5cad" stroke-width="1.5" marker-end="url(#arrow-{uid})" />
    <line x1="350" y1="78" x2="466" y2="78" stroke="#0b5cad" stroke-width="1.5" marker-end="url(#arrow-{uid})" />
    <text x="408" y="68" text-anchor="middle" font-size="12">audio tokens</text>
    {#each [0, 1, 2, 3, 4] as i}
      <rect x={370 + i * 16} y="86" width="12" height="12" fill="#0b5cad" />
    {/each}
    <line x1="660" y1="78" x2="692" y2="78" stroke="#0b5cad" stroke-width="1.5" marker-end="url(#arrow-{uid})" />
    <text x="744" y="74" text-anchor="middle" font-size="13">Waveform</text>
    <text x="744" y="92" text-anchor="middle" font-size="12">to listener</text>

    <text x="250" y="176" text-anchor="middle" font-size="13" font-weight="700">Continuous (in-flight) batching</text>
    <text x="250" y="196" text-anchor="middle" font-size="12">requests join and leave the decode loop</text>
    <text x="250" y="212" text-anchor="middle" font-size="12">at every step</text>
    <text x="565" y="176" text-anchor="middle" font-size="13" font-weight="700">Dynamic batching</text>
    <text x="565" y="196" text-anchor="middle" font-size="12">a batch starts when it fills or when</text>
    <text x="565" y="212" text-anchor="middle" font-size="12">a short timer, such as 15 ms, expires</text>
  </svg>
</Figure>
