<script>
  // Figure 6.1, redrawn as a mechanism: the vision encoder turns images into visual tokens that
  // join the text tokens in one input sequence. Segment widths are proportional to token counts
  // for the worked example (200 text tokens, 3 images at about 1,000 tokens each).
  import Figure from './Figure.svelte';
  const uid = $props.id();

  const textTokens = 200;
  const visualTokens = 3000;
  const barX = 384;
  const barW = 190;
  const textW = Math.round((barW * textTokens) / (textTokens + visualTokens));

  const description =
    'Two inputs enter the model. Three high-resolution images go to a small vision encoder of about 2 billion parameters, which converts them into about 3,000 visual tokens. A 200-token text question goes to the tokenizer, which produces 200 text tokens. Both token streams join one input sequence, drawn as a bar in which the text segment is a thin sliver and the visual-token segment fills about 94 percent of the length. The full sequence flows into a much larger LLM, 673 billion parameters in Mistral Large 3, which generates the text response.';
</script>

<Figure
  number="6.1"
  caption="VLMs add image and video understanding to LLMs. A small vision encoder converts each image into visual tokens, which join the text tokens in one long input sequence for the LLM."
  {description}
>
  <svg viewBox="0 0 820 250" role="img" aria-label="Images pass through a vision encoder and text through a tokenizer; visual tokens fill most of the combined input sequence that the LLM reads">
    <defs>
      <marker id="arrow-{uid}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#0b5cad" />
      </marker>
      <pattern id="hatch-{uid}" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="8" height="8" fill="#0b5cad" />
        <line x1="0" y1="0" x2="0" y2="8" stroke="#e6f0fa" stroke-width="2" />
      </pattern>
    </defs>

    <g stroke="#0b5cad" stroke-width="1.5">
      <rect x="10" y="30" width="120" height="56" rx="6" fill="#e6f0fa" />
      <rect x="10" y="150" width="120" height="56" rx="6" fill="#e6f0fa" />
      <rect x="170" y="30" width="160" height="56" rx="6" fill="#ffffff" />
      <rect x="170" y="150" width="160" height="56" rx="6" fill="#ffffff" />
      <rect x={barX} y="98" width={barW} height="40" fill="url(#hatch-{uid})" />
      <rect x={barX} y="98" width={textW} height="40" fill="#e6f0fa" />
      <rect x="616" y="58" width="100" height="120" rx="8" fill="#e6f0fa" stroke-width="2" />
      <rect x="742" y="96" width="72" height="44" rx="6" fill="#ffffff" />
    </g>

    <text x="70" y="52" text-anchor="middle" font-size="14">3 images</text>
    <text x="70" y="70" text-anchor="middle" font-size="12">high resolution</text>
    <text x="70" y="172" text-anchor="middle" font-size="14">Text question</text>
    <text x="70" y="190" text-anchor="middle" font-size="12">200 tokens</text>

    <text x="250" y="52" text-anchor="middle" font-size="14" font-weight="700">Vision encoder</text>
    <text x="250" y="70" text-anchor="middle" font-size="12">about 2B parameters</text>
    <text x="250" y="172" text-anchor="middle" font-size="14" font-weight="700">Tokenizer</text>
    <text x="250" y="190" text-anchor="middle" font-size="12">text to token IDs</text>

    <line x1="130" y1="58" x2="166" y2="58" stroke="#0b5cad" stroke-width="1.5" marker-end="url(#arrow-{uid})" />
    <line x1="130" y1="178" x2="166" y2="178" stroke="#0b5cad" stroke-width="1.5" marker-end="url(#arrow-{uid})" />
    <polyline points="330,58 470,58 470,94" fill="none" stroke="#0b5cad" stroke-width="1.5" marker-end="url(#arrow-{uid})" />
    <polyline points="330,178 {barX + textW / 2},178 {barX + textW / 2},142" fill="none" stroke="#0b5cad" stroke-width="1.5" marker-end="url(#arrow-{uid})" />
    <text x="400" y="50" text-anchor="middle" font-size="12">about 3,000 visual tokens</text>
    <text x="336" y="196" font-size="12">200 text tokens</text>

    <text x={barX + 20} y="156" font-size="12" font-weight="700">One input sequence:</text>
    <text x={barX + 20} y="172" font-size="12">about 94 percent visual tokens</text>
    <line x1={barX + barW} y1="118" x2="612" y2="118" stroke="#0b5cad" stroke-width="1.5" marker-end="url(#arrow-{uid})" />

    <text x="666" y="108" text-anchor="middle" font-size="16" font-weight="700">LLM</text>
    <text x="666" y="128" text-anchor="middle" font-size="12">673B parameters</text>
    <text x="666" y="144" text-anchor="middle" font-size="12">(Mistral Large 3)</text>
    <line x1="716" y1="118" x2="738" y2="118" stroke="#0b5cad" stroke-width="1.5" marker-end="url(#arrow-{uid})" />
    <text x="778" y="114" text-anchor="middle" font-size="13">Text</text>
    <text x="778" y="130" text-anchor="middle" font-size="13">answer</text>
  </svg>
</Figure>
