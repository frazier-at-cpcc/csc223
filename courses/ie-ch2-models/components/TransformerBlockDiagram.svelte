<script>
  // Decoder-only, pre-norm transformer as used by current LLMs such as Llama and Qwen.
  // Boxes: [y, height, lines, filled]. All boxes are centered on x = 250.
  const boxes = [
    [620, 36, ['Embedding layer'], false],
    [548, 30, ['Normalization (RMSNorm)'], true],
    [476, 48, ['Masked self-attention', 'about 20% of block weights'], false],
    [392, 30, ['Normalization (RMSNorm)'], true],
    [298, 64, ['Feed-forward network', 'linear, then SiLU, then linear', 'about 80% of block weights'], false],
    [180, 30, ['Final normalization'], true],
    [120, 36, ['LMHead (linear)'], false],
  ];
  // Upward arrows along x = 250: [fromY, toY]
  const arrows = [
    [676, 658], [620, 580], [548, 526], [476, 462], [436, 424], [392, 364], [298, 276], [250, 212], [180, 158], [120, 102],
  ];
  const adds = [448, 262];
</script>

<svg viewBox="0 70 560 642" role="img" aria-labelledby="tb-title">
  <title id="tb-title">Decoder-only transformer with pre-normalization. Token IDs enter an embedding layer. A transformer block, repeated N times, applies normalization, masked self-attention, and a residual add, then normalization, a feed-forward network, and a second residual add. A final normalization and the LMHead produce one logit per vocabulary token.</title>
  <defs>
    <marker id="tb-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--tessera-text)" />
    </marker>
  </defs>

  <!-- repeated block outline -->
  <rect x="100" y="232" width="372" height="372" rx="8" fill="var(--tessera-bg-secondary)" stroke="var(--tessera-primary-dark)" stroke-width="1.5" stroke-dasharray="6 4" />
  <text class="ie-svg-label" x="480" y="404">Repeated</text>
  <text class="ie-svg-label" x="480" y="420">N times</text>

  {#each arrows as [y1, y2]}
    <line class="ie-svg-line" x1="250" y1={y1} x2="250" y2={y2} marker-end="url(#tb-arrow)" />
  {/each}

  <!-- residual (skip) connections -->
  <circle cx="250" cy="596" r="4" fill="var(--tessera-text)" />
  <path class="ie-svg-line" d="M 250 596 H 405 V 448 H 266" marker-end="url(#tb-arrow)" />
  <circle cx="250" cy="430" r="4" fill="var(--tessera-text)" />
  <path class="ie-svg-line" d="M 250 430 H 405 V 262 H 266" marker-end="url(#tb-arrow)" />
  <text class="ie-svg-text" x="412" y="520">residual</text>
  <text class="ie-svg-text" x="412" y="350">residual</text>

  {#each boxes as [y, h, lines, filled]}
    <rect class={filled ? 'ie-svg-box' : 'ie-svg-box--plain'} x="135" {y} width="230" height={h} rx="4" />
    {#each lines as line, i}
      <text class="ie-svg-text" x="250" y={y + h / 2 + 4 + (i - (lines.length - 1) / 2) * 16} text-anchor="middle">{line}</text>
    {/each}
  {/each}

  {#each adds as cy}
    <circle {cy} cx="250" r="13" class="ie-svg-box--plain" />
    <text class="ie-svg-label" x="250" y={cy + 5} text-anchor="middle">+</text>
  {/each}

  <text class="ie-svg-label" x="250" y="700" text-anchor="middle">Token IDs</text>
  <text class="ie-svg-label" x="250" y="90" text-anchor="middle">Logits, one per vocabulary token</text>
</svg>
