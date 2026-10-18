<script>
  // Boxes: [cx, y, height, lines of text, filled]
  const boxes = [
    [170, 590, 40, ['Input embedding'], false],
    [410, 590, 40, ['Output embedding'], false],
    // encoder stack
    [170, 465, 40, ['Multi-head', 'attention'], false],
    [170, 432, 22, ['Add & norm'], true],
    [170, 375, 40, ['Feed', 'forward'], false],
    [170, 342, 22, ['Add & norm'], true],
    // decoder stack
    [410, 470, 40, ['Masked multi-head', 'attention'], false],
    [410, 440, 22, ['Add & norm'], true],
    [410, 380, 40, ['Multi-head', 'attention'], false],
    [410, 350, 22, ['Add & norm'], true],
    [410, 290, 40, ['Feed', 'forward'], false],
    [410, 260, 22, ['Add & norm'], true],
  ];
  // Upward arrows: [x, fromY, toY]
  const arrows = [
    [170, 650, 632], [410, 650, 632],
    [170, 590, 567], [410, 590, 567],
    [170, 545, 507], [170, 465, 456], [170, 432, 417], [170, 375, 366],
    [410, 545, 512], [410, 470, 464], [410, 440, 422], [410, 380, 374],
    [410, 350, 332], [410, 290, 284], [410, 260, 218],
    [410, 190, 168], [410, 140, 132],
  ];
</script>

<svg viewBox="0 0 600 680" role="img" aria-labelledby="tb-title">
  <title id="tb-title">Transformer architecture from Attention Is All You Need. On the left, an encoder stack repeated N times contains multi-head attention and a feed-forward network, each followed by add and norm. On the right, a decoder stack repeated N times contains masked multi-head attention, multi-head attention that also receives the encoder output, and a feed-forward network, each followed by add and norm. Input and output embeddings with positional encoding feed the stacks. The decoder output passes through a linear layer and softmax to produce output probabilities.</title>
  <defs>
    <marker id="tb-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--tessera-text-light)" />
    </marker>
  </defs>

  <!-- stack outlines -->
  <rect x="90" y="330" width="160" height="195" rx="8" fill="var(--tessera-bg-secondary)" stroke="var(--tessera-primary-dark)" stroke-width="1.5" />
  <rect x="330" y="245" width="160" height="280" rx="8" fill="var(--tessera-bg-secondary)" stroke="var(--tessera-primary-dark)" stroke-width="1.5" />
  <text class="ie-svg-label" x="72" y="432" text-anchor="end">N×</text>
  <text class="ie-svg-label" x="508" y="390">N×</text>
  <text class="ie-svg-text" x="170" y="322" text-anchor="middle">Encoder</text>
  <text class="ie-svg-text" x="500" y="240" text-anchor="end">Decoder</text>

  {#each arrows as [x, y1, y2]}
    <line class="ie-svg-line" x1={x} y1={y1} x2={x} y2={y2} marker-end="url(#tb-arrow)" />
  {/each}

  <!-- encoder output into the decoder's second attention sublayer -->
  <path class="ie-svg-line" d="M 170 342 V 300 H 310 V 430 H 380 V 422" marker-end="url(#tb-arrow)" />

  {#each boxes as [cx, y, h, lines, filled]}
    <rect class={filled ? 'ie-svg-box' : 'ie-svg-box--plain'} x={cx - 70} {y} width="140" height={h} rx="4" />
    {#each lines as line, i}
      <text class="ie-svg-text" x={cx} y={y + h / 2 + 4 + (i - (lines.length - 1) / 2) * 15} text-anchor="middle">{line}</text>
    {/each}
  {/each}

  <!-- positional encoding -->
  {#each [170, 410] as cx}
    <circle cx={cx} cy="556" r="11" class="ie-svg-box--plain" />
    <text class="ie-svg-text" x={cx} y="561" text-anchor="middle">+</text>
  {/each}
  <text class="ie-svg-text" x="150" y="552" text-anchor="end">Positional</text>
  <text class="ie-svg-text" x="150" y="567" text-anchor="end">encoding</text>
  <text class="ie-svg-text" x="430" y="552">Positional</text>
  <text class="ie-svg-text" x="430" y="567">encoding</text>

  <!-- head -->
  <rect class="ie-svg-box" x="370" y="190" width="80" height="26" rx="4" />
  <text class="ie-svg-text" x="410" y="207" text-anchor="middle">Linear</text>
  <rect class="ie-svg-box" x="370" y="140" width="80" height="26" rx="4" />
  <text class="ie-svg-text" x="410" y="157" text-anchor="middle">Softmax</text>
  <text class="ie-svg-label" x="410" y="110" text-anchor="middle">Output</text>
  <text class="ie-svg-label" x="410" y="126" text-anchor="middle">probabilities</text>

  <text class="ie-svg-label" x="170" y="668" text-anchor="middle">Inputs</text>
  <text class="ie-svg-label" x="410" y="668" text-anchor="middle">Outputs (shifted right)</text>
</svg>
