<script>
  // Figure 6.3, redrawn as a mechanism: the encoder runs once per audio chunk, while the decoder
  // runs once per output token, which is why the decoder dominates Whisper's inference time.
  import Figure from './Figure.svelte';
  const uid = $props.id();
  const tokens = 14;
  const blockW = 26;

  const description =
    'An audio chunk of up to 30 seconds is converted into a log-Mel spectrogram, an image-like map of sound energy by frequency over time. The encoder reads the whole spectrogram in one forward pass and produces audio features. The decoder then generates the transcript one text token at a time, running one forward pass per token and feeding each new token back as input. A timeline below the models shows the encoder as a single block and the decoder as a row of fourteen blocks, one per output token, so the decoder occupies most of the inference time. The block counts are illustrative.';
</script>

<Figure
  number="6.3"
  caption="ASR models transcribe input audio into text. In Whisper, the encoder runs once per audio chunk, while the decoder runs once per output token, so the decoder takes most of the inference time."
  {description}
>
  <svg viewBox="0 0 780 270" role="img" aria-label="Whisper pipeline: spectrogram, one encoder pass, then one decoder pass per output token; a timeline shows the decoder taking most of the time">
    <defs>
      <marker id="arrow-{uid}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#0b5cad" />
      </marker>
    </defs>

    <g stroke="#0b5cad" stroke-width="1.5">
      <rect x="10" y="40" width="130" height="64" rx="6" fill="#e6f0fa" />
      <rect x="180" y="40" width="150" height="64" rx="6" fill="#ffffff" />
      <rect x="370" y="40" width="150" height="64" rx="6" fill="#ffffff" />
      <rect x="560" y="40" width="200" height="64" rx="6" fill="#e6f0fa" />
    </g>
    <text x="75" y="66" text-anchor="middle" font-size="14">Audio chunk</text>
    <text x="75" y="84" text-anchor="middle" font-size="12">up to 30 seconds</text>
    <text x="255" y="66" text-anchor="middle" font-size="14" font-weight="700">Log-Mel</text>
    <text x="255" y="84" text-anchor="middle" font-size="14" font-weight="700">spectrogram</text>
    <text x="445" y="66" text-anchor="middle" font-size="14" font-weight="700">Encoder</text>
    <text x="445" y="84" text-anchor="middle" font-size="12">one pass per chunk</text>
    <text x="660" y="66" text-anchor="middle" font-size="14" font-weight="700">Decoder</text>
    <text x="660" y="84" text-anchor="middle" font-size="12">one pass per text token</text>

    <line x1="140" y1="72" x2="176" y2="72" stroke="#0b5cad" stroke-width="1.5" marker-end="url(#arrow-{uid})" />
    <line x1="330" y1="72" x2="366" y2="72" stroke="#0b5cad" stroke-width="1.5" marker-end="url(#arrow-{uid})" />
    <line x1="520" y1="72" x2="556" y2="72" stroke="#0b5cad" stroke-width="1.5" marker-end="url(#arrow-{uid})" />
    <path d="M700,104 C700,134 620,134 620,108" fill="none" stroke="#0b5cad" stroke-width="1.5" marker-end="url(#arrow-{uid})" />
    <text x="660" y="146" text-anchor="middle" font-size="12">each new token is fed back</text>

    <text x="10" y="186" font-size="13" font-weight="700">Inference time for one chunk (illustrative)</text>
    <rect x="10" y="198" width={blockW} height="34" fill="#ffffff" stroke="#0b5cad" stroke-width="1.5" />
    <text x={10 + blockW / 2} y="250" text-anchor="middle" font-size="12">Encoder</text>
    {#each { length: tokens } as _, i}
      <rect x={10 + blockW + 6 + i * (blockW + 2)} y="198" width={blockW} height="34" fill="#0b5cad" />
    {/each}
    <text x={10 + blockW + 6 + (tokens * (blockW + 2)) / 2} y="250" text-anchor="middle" font-size="12">Decoder: one block per output token</text>
  </svg>
</Figure>
