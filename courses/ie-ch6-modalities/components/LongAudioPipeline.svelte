<script>
  // Figure 6.4: two-stage pipeline for long audio file transcription.
  import Figure from './Figure.svelte';
  const uid = $props.id();
  const chunkers = [115, 225];
  const whispers = [55, 150, 245];
  const bars = [6, 14, 24, 34, 24, 14, 30, 10, 6];
  const description =
    'Two audio files arrive as request 1 and request 2. In the chunker stage, each request goes to its own chunker replica running on a CPU, labeled chunker replica 1 and chunker replica 2. Each chunker splits its audio into chunks and sends them to all three replicas in the Whisper stage. The Whisper replicas, labeled 1, 2 and 3, each run on an H100 Multi-Instance GPU slice. Because every chunker feeds every Whisper replica, chunks from one file are transcribed in parallel.';
</script>

<Figure number="6.4" caption="A two-stage pipeline for long audio file transcription parallelizes chunk transcription to improve end-to-end request time." {description}>
  <svg viewBox="0 0 760 310" role="img" aria-label="Two chunker replicas on CPUs fan audio chunks out to three Whisper replicas on H100 MIG slices">
    <defs>
      <marker id="arrow-{uid}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#0b5cad" />
      </marker>
    </defs>

    {#each chunkers as y, i}
      {#each bars as h, b}
        <rect x={10 + b * 7} y={y - h / 2} width="3" height={h} fill="#0b5cad" />
      {/each}
      <text x="128" y={y - 14} text-anchor="middle" font-size="13">Request {i + 1}</text>
      <line x1="76" y1={y} x2="238" y2={y} stroke="#0b5cad" stroke-width="1.5" marker-end="url(#arrow-{uid})" />
      <rect x="242" y={y - 36} width="130" height="72" rx="5" fill="#ffffff" stroke="#0b5cad" stroke-width="1.5" />
      <text x="307" y={y - 10} text-anchor="middle" font-size="14">Chunker</text>
      <text x="307" y={y + 8} text-anchor="middle" font-size="14">replica {i + 1}</text>
      <text x="307" y={y + 26} text-anchor="middle" font-size="12">(CPU)</text>
      {#each whispers as wy}
        <line x1="372" y1={y} x2="560" y2={wy} stroke="#0b5cad" stroke-width="1.2" marker-end="url(#arrow-{uid})" />
      {/each}
    {/each}
    <rect x="232" y="50" width="150" height="230" rx="6" fill="none" stroke="#0b5cad" stroke-width="1.5" stroke-dasharray="6 4" />
    <text x="307" y="36" text-anchor="middle" font-size="14" font-weight="700">Chunker stage</text>

    {#each whispers as y, i}
      <rect x="564" y={y - 38} width="150" height="76" rx="5" fill="#e6f0fa" stroke="#0b5cad" stroke-width="1.5" />
      <text x="639" y={y - 12} text-anchor="middle" font-size="14">Whisper</text>
      <text x="639" y={y + 6} text-anchor="middle" font-size="14">replica {i + 1}</text>
      <text x="639" y={y + 24} text-anchor="middle" font-size="12">(H100 MIG)</text>
    {/each}
    <text x="639" y="300" text-anchor="middle" font-size="14" font-weight="700">Whisper stage</text>
    <text x="462" y="68" text-anchor="middle" font-size="13" transform="rotate(-17 462 68)">Chunks</text>
  </svg>
</Figure>
